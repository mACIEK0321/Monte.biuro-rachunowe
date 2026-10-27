'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { usePathname } from 'next/navigation';
import { canonicalPath, staticAlternate } from '@/lib/seo';

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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isEN = lang === 'en';
  const homeHref = isEN ? '/en/' : '/';
  const servicesHref = isEN ? '/en/#uslugi' : '/#uslugi';
  const pricingHref = isEN ? '/en/#cennik' : '/#cennik';
  const processHref = isEN ? '/en/#proces' : '/#proces';
  const aboutHref = isEN ? '/en/#o-nas' : '/#o-nas';
  const blogHref = isEN ? '/en/blog/' : '/blog/';
  const faqHref = isEN ? '/en/#faq' : '/#faq';
  const isServicePage = ['/ksiegowosc-jdg-krakow/', '/pelna-ksiegowosc-krakow/'].includes(canonicalPath(pathname));
  const contactHref = isServicePage ? '#kontakt' : isEN ? '/en/#kontakt' : '/#kontakt';

  const fallbackAlternate = staticAlternate(pathname) || (isServicePage ? '/en/' : isEN ? '/blog/' : '/en/blog/');
  const [articleAlternate, setArticleAlternate] = useState<{path: string; href: string} | null>(null);
  useEffect(() => {
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${isEN ? 'pl' : 'en'}"]`);
    setArticleAlternate(alternate ? {path: pathname, href: new URL(alternate.href).pathname} : null);
  }, [pathname, isEN]);
  const alternateLangHref = articleAlternate?.path === pathname ? articleAlternate.href : fallbackAlternate;

  return (
    <header className="site-header" id="site-header" ref={headerRef}>
      <div className="container">
        <Link href={homeHref} className="logo" aria-label={`Monte.biuro - ${nav.home}`}>
          <Image
            src="/logo/monte.svg"
            alt={isEN ? 'MonTe - Accounting Firm Kraków' : 'Monte.biuro - Biuro rachunkowe'}
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
            href={canonicalPath(alternateLangHref)}
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
