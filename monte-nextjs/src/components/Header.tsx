'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="site-header" id="site-header" ref={headerRef}>
      <div className="container">
        <Link href="/" className="logo" aria-label="Monte.biuro - Strona główna">
          <Image
            src="/logo/monte.svg"
            alt="Monte.biuro - Biuro rachunkowe"
            className="logo-img"
            width={180}
            height={72}
            priority
          />
        </Link>
        <nav id="main-nav" className={isMenuOpen ? 'is-open' : ''}>
          <a href="/#uslugi" onClick={handleNavClick}>Usługi</a>
          <a href="/#cennik" onClick={handleNavClick}>Cennik</a>
          <a href="/#proces" onClick={handleNavClick}>Jak działamy</a>
          <a href="/#o-nas" onClick={handleNavClick}>O nas</a>
          <Link href="/blog" onClick={handleNavClick}>Blog</Link>
          <a href="/#faq" onClick={handleNavClick}>FAQ</a>
          <a href="/#kontakt" onClick={handleNavClick}>Kontakt</a>
        </nav>
        <a href="/#kontakt" className="cta">Bezpłatna konsultacja</a>
        <button
          type="button"
          className="menu-toggle"
          id="menu-toggle"
          aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
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
