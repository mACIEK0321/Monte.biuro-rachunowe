'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { usePathname } from 'next/navigation';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, dict } = useLang();
  const nav = dict.nav;
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header?.classList.add('is-scrolled');
      } else {
        header?.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isEN = lang === 'en';
  const homeHref = isEN ? '/en' : '/';
  const servicesHref = isEN ? '/en#uslugi' : '/#uslugi';
  const pricingHref = isEN ? '/en#cennik' : '/#cennik';
  const processHref = isEN ? '/en#proces' : '/#proces';
  const aboutHref = isEN ? '/en#o-nas' : '/#o-nas';
  const blogHref = isEN ? '/en/blog' : '/blog';
  const faqHref = isEN ? '/en#faq' : '/#faq';
  const contactHref = isEN ? '/en#kontakt' : '/#kontakt';

  // Build alternate language URL for switcher
  let alternateLangHref: string;
  if (isEN) {
    // Switch to PL
    if (pathname === '/en' || pathname === '/en/') alternateLangHref = '/';
    else if (pathname === '/en/blog' || pathname === '/en/blog/') alternateLangHref = '/blog';
    else if (pathname.startsWith('/en/blog/')) alternateLangHref = '/blog';
    else alternateLangHref = pathname.replace(/^\/en(\/|$)/, '/') || '/';
    if (!alternateLangHref.startsWith('/')) alternateLangHref = '/' + alternateLangHref;
  } else {
    // Switch to EN
    if (pathname === '/') alternateLangHref = '/en';
    else if (pathname === '/blog' || pathname === '/blog/') alternateLangHref = '/en/blog';
    else if (pathname.startsWith('/blog/')) alternateLangHref = '/en/blog';
    else alternateLangHref = '/en' + pathname;
  }

  return (
    <header className="site-header" id="site-header" ref={headerRef}>
      <div className="container">
        <Link href={homeHref} className="logo" aria-label={`Monte.biuro - ${nav.home}`}>
          <Image
            src="/logo/monte.svg"
            alt="Monte.biuro - Biuro rachunkowe"
            className="logo-img"
            width={220}
            height={88}
            priority
          />
        </Link>
        <nav id="main-nav" className={isMenuOpen ? 'is-open' : ''}>
          <a href={servicesHref} onClick={handleNavClick}>{nav.services}</a>
          <a href={pricingHref} onClick={handleNavClick}>{nav.pricing}</a>
          <a href={processHref} onClick={handleNavClick}>{nav.process}</a>
          <a href={aboutHref} onClick={handleNavClick}>{nav.about}</a>
          <Link href={blogHref} onClick={handleNavClick}>{nav.blog}</Link>
          <a href={faqHref} onClick={handleNavClick}>{nav.faq}</a>
          <a href={contactHref} onClick={handleNavClick}>{nav.contact}</a>
          {/* Language Switcher */}
          <Link
            href={alternateLangHref}
            onClick={handleNavClick}
            className="lang-switcher"
            aria-label={isEN ? 'Przełącz na Polski' : 'Switch to English'}
            style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              padding: '0.2rem 0.5rem',
              border: '1px solid currentColor',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {isEN ? '🇵🇱 PL' : '🇬🇧 EN'}
          </Link>
        </nav>
        <a href={contactHref} className="cta">{nav.cta}</a>
        <button
          type="button"
          className="menu-toggle"
          id="menu-toggle"
          aria-label={isMenuOpen ? nav.closeMenu : nav.openMenu}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
