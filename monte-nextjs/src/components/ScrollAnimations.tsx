'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
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
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.fade-in-scroll').forEach((el) => {
      scrollObserver.observe(el);
    });

    return () => {
      document.removeEventListener('click', handleAnchorClicks);
      scrollObserver.disconnect();
    };
  }, []);

  return null;
}
