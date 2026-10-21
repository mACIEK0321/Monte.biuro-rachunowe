'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import {
  hasTrackedPageView,
  isAnalyticsEnabled,
  subscribeAnalytics,
  trackEvent,
  trackPageView,
  type AnalyticsEventName,
} from '@/lib/analytics';

// Route metadata may update document.title after the pathname changes,
// so the page_view waits until the title has been stable for a moment.
const TITLE_SETTLE_MS = 300;
const TITLE_MAX_WAIT_MS = 2000;

const PRICING_THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

// Business numbers only, mapped to static ids so no phone number is sent.
const PHONE_CTA_IDS: Record<string, string> = {
  '+48661444882': 'phone_1',
  '+48577161434': 'phone_2',
};
const OFFICE_EMAIL = 'kontakt@montebiuro.pl';
const PRICING_CARD_IDS = ['pricing_start', 'pricing_business', 'pricing_individual'];

interface ClickMatch {
  name: AnalyticsEventName;
  component: string;
  ctaId: string;
}

function getComponent(el: Element): string {
  if (el.closest('#site-header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('.hero')) return 'hero';
  if (el.closest('#cennik')) return 'pricing';
  if (el.closest('#kontakt')) return 'contact';
  return 'page';
}

// Consultation CTAs only; menu and footer links to #kontakt are ordinary navigation.
function getConsultationLinkId(link: HTMLAnchorElement): string | null {
  if (link.hash !== '#kontakt') return null;
  if (link.matches('#site-header a.cta')) return 'header_cta';
  if (link.matches('.hero a.btn-secondary')) return 'hero_cta';
  if (link.closest('#cennik')) return 'pricing_individual_quote';
  return null;
}

function classifyClick(target: Element): ClickMatch | null {
  const link = target.closest('a[href]');
  if (link instanceof HTMLAnchorElement) {
    const href = link.getAttribute('href') ?? '';
    if (/^tel:/i.test(href)) {
      const number = href.slice(4).replace(/[^\d+]/g, '');
      return { name: 'click_phone', component: getComponent(link), ctaId: PHONE_CTA_IDS[number] ?? 'phone_other' };
    }
    if (/^mailto:/i.test(href)) {
      const address = href.slice(7).split('?')[0].trim().toLowerCase();
      return {
        name: 'click_email',
        component: getComponent(link),
        ctaId: address === OFFICE_EMAIL ? 'email_office' : 'email_other',
      };
    }
    const ctaId = getConsultationLinkId(link);
    return ctaId ? { name: 'click_consultation', component: getComponent(link), ctaId } : null;
  }

  const button = target.closest('button');
  if (button && button.matches('#cennik .pricing-btn:not(.pricing-details-toggle)')) {
    const cards = Array.from(document.querySelectorAll('#cennik .pricing-card'));
    const card = button.closest('.pricing-card');
    const index = card ? cards.indexOf(card) : -1;
    return { name: 'click_consultation', component: 'pricing', ctaId: PRICING_CARD_IDS[index] ?? 'pricing_other' };
  }
  return null;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Analytics() {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(subscribeAnalytics, isAnalyticsEnabled, getServerSnapshot);

  // One page_view per visit of a pathname (hash and query changes do not count).
  useEffect(() => {
    if (!enabled || !pathname || hasTrackedPageView(pathname)) return;

    const href = window.location.href;
    let title = document.title;
    let sent = false;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;
    let maxTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: MutationObserver | undefined;

    const send = () => {
      if (sent) return;
      sent = true;
      clearTimeout(quietTimer);
      clearTimeout(maxTimer);
      observer?.disconnect();
      trackPageView({ path: pathname, href, title });
    };
    const settle = () => {
      clearTimeout(quietTimer);
      quietTimer = setTimeout(() => {
        title = document.title;
        send();
      }, TITLE_SETTLE_MS);
    };

    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(settle);
      observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    }
    settle();
    maxTimer = setTimeout(() => {
      title = document.title;
      send();
    }, TITLE_MAX_WAIT_MS);

    // Leaving the route before the title settled still records the visit (no-op after withdrawal).
    return send;
  }, [enabled, pathname]);

  // Delegated listener for existing phone/e-mail links and consultation CTAs.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const match = classifyClick(event.target);
      if (match) trackEvent(match.name, { component: match.component, cta_id: match.ctaId });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [enabled]);

  // view_pricing once per pathname visit, re-armed on every route change.
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;

    let fired = false;
    let intersectionObserver: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    const watch = (section: Element) => {
      intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (fired || !entry.isIntersecting) continue;
          // Tall section on mobile: half of the section or half of the viewport, whichever is smaller.
          const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
          const required = Math.min(entry.boundingClientRect.height / 2, viewportHeight / 2);
          if (required > 0 && entry.intersectionRect.height >= required) {
            fired = true;
            intersectionObserver?.disconnect();
            trackEvent('view_pricing', { component: 'pricing', cta_id: 'pricing_section' });
          }
        }
      }, { threshold: PRICING_THRESHOLDS });
      intersectionObserver.observe(section);
    };

    const section = document.getElementById('cennik');
    if (section) {
      watch(section);
    } else if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        const found = document.getElementById('cennik');
        if (!found) return;
        mutationObserver?.disconnect();
        mutationObserver = undefined;
        watch(found);
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [enabled, pathname]);

  return null;
}
