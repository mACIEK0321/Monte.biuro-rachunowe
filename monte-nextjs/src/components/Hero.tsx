'use client';

import Image from 'next/image';
import { useLang } from './LanguageProvider';

export default function Hero() {
  const { dict } = useLang();
  const h = dict.hero;

  return (
    <section className="hero" aria-label="Biuro rachunkowe - MonTe" style={{ position: 'relative' }}>
      <Image
        src="/images/team/team.jpg"
        alt="Zespół MonTe Biuro Rachunkowe"
        fill
        className="hero-bg-image"
        style={{ objectFit: 'contain', objectPosition: 'center top', opacity: 0.25, zIndex: 0 }}
        priority
        sizes="100vw"
      />
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h1>{h.title}</h1>
          <p className="tagline">{h.subtitle}</p>
          <div className="hero-buttons">
            <a href="#cennik" className="btn-primary">{h.cta1}</a>
            <a href="#kontakt" className="btn-secondary">{h.cta2}</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-logo-container">
            <Image
              src="/logo/monte.svg"
              alt="MonTe Biuro Rachunkowe - certyfikowane biuro księgowe"
              className="hero-logo"
              width={340}
              height={204}
              priority
            />
          </div>
        </div>
      </div>
      <div className="hero-team-mobile">
        <Image
          src="/images/team/team.jpg"
          alt="Zespół MonTe Biuro Rachunkowe"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </section>
  );
}
