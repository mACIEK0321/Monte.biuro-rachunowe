'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Smooth scrolling
    const handleAnchorClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const nav = document.getElementById('main-nav');
        if (nav?.classList.contains('is-open')) {
          nav.classList.remove('is-open');
        }
      }
    };

    document.addEventListener('click', handleAnchorClicks);

    // Intersection Observer for fade-in
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.fade-in-scroll:not([data-visible])').forEach((el) => {
        scrollObserver.observe(el);
      });
    };

    observeAll();

    // Watch for new .fade-in-scroll elements added to the DOM (e.g. after navigation)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('click', handleAnchorClicks);
      scrollObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
