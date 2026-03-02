'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { usePathname, useRouter } from 'next/navigation';

const STORAGE_KEY = 'montebiuro-cookie-consent';
const LANG_KEY = 'montebiuro-lang';

type ConsentChoice = 'all' | 'necessary' | null;

function updateGoogleConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  if (choice === null) return;

  const granted = choice === 'all' ? 'granted' : 'denied';

  gtag('consent', 'update', {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
    functionality_storage: 'granted',
    personalization_storage: granted,
    security_storage: 'granted',
  });

  if (choice === 'necessary') {
    deleteGACookies();
  }
}

function deleteGACookies() {
  if (typeof document === 'undefined') return;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_')) {
      const domain = window.location.hostname;
      const topDomain = domain.split('.').slice(-2).join('.');
      for (const d of [domain, '.' + domain, '.' + topDomain]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

declare global {
  interface Window {
    dataLayer: unknown[];
    showCookieBanner?: () => void;
  }
}

export default function CookieConsent() {
  const { lang, dict } = useLang();
  const c = dict.cookie;
  const pathname = usePathname();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const showBanner = useCallback(() => {
    setVisible(true);
    setShowDetails(false);
  }, []);

  useEffect(() => {
    window.showCookieBanner = showBanner;

    // ── Auto-redirect to /en if browser language is English ──
    // Only do this once (store the redirect decision in sessionStorage)
    try {
      const alreadyRedirected = sessionStorage.getItem('montebiuro-lang-redirected');
      const savedLang = localStorage.getItem(LANG_KEY);
      
      if (!alreadyRedirected && !savedLang) {
        const browserLang = navigator.language || '';
        const isEnglish = /^en(-|$)/i.test(browserLang);
        
        if (isEnglish && !pathname.startsWith('/en')) {
          sessionStorage.setItem('montebiuro-lang-redirected', '1');
          localStorage.setItem(LANG_KEY, 'en');
          router.push('/en');
          return;
        }
      }
    } catch {
      // localStorage/sessionStorage blocked
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'all' || stored === 'necessary') {
        updateGoogleConsent(stored as ConsentChoice);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    return () => {
      delete window.showCookieBanner;
    };
  }, [showBanner, pathname, router]);

  const handleAcceptAll = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, 'all'); } catch { /* blocked */ }
    updateGoogleConsent('all');
    setVisible(false);
  }, []);

  const handleAcceptNecessary = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, 'necessary'); } catch { /* blocked */ }
    updateGoogleConsent('necessary');
    setVisible(false);
  }, []);

  const privacyHref = lang === 'en' ? '/en/privacy-policy' : '/polityka-prywatnosci';
  const cookieHref = lang === 'en' ? '/en/cookie-policy' : '/polityka-cookies';

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label={c.bannerLabel}
      aria-modal="false"
    >
      <div className="cookie-banner-inner">
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: c.mainText }}
          />
          {showDetails && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.85 }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>{c.necessaryTitle}</strong> — {c.necessaryDesc}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>{c.analyticsTitle}</strong> — {c.analyticsDesc}
              </p>
              <p>
                {c.adminInfo} {c.detailsLabel}{' '}
                <Link href={privacyHref}>{lang === 'en' ? 'Privacy Policy' : 'Polityka prywatności'}</Link>
                {' | '}
                <Link href={cookieHref}>{lang === 'en' ? 'Cookie Policy' : 'Polityka cookies'}</Link>.
              </p>
            </div>
          )}
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="btn btn-accept" onClick={handleAcceptAll}>
            {c.acceptAll}
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={handleAcceptNecessary}
          >
            {c.necessaryOnly}
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={() => setShowDetails((v) => !v)}
            style={{ fontSize: '0.85rem' }}
          >
            {showDetails ? c.hideDetails : c.showDetails}
          </button>
        </div>
      </div>
    </div>
  );
}
