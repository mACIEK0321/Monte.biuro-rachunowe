'use client';

import { useState, useRef } from 'react';
import { useLang } from './LanguageProvider';

const startFeaturesPL = [
  'Dedykowany księgowy i stałe wsparcie',
  'Prowadzenie KPIR lub ryczałtu',
  'Rozliczenia podatków i składek ZUS',
  'Przygotowanie i wysyłka deklaracji',
  'Informacje o podatkach do zapłaty i terminach',
  'Reprezentacja przed urzędami i ZUS',
  'Księgowość online i elektroniczny obieg dokumentów',
  'Dostęp do systemu: fakturowanie, KSeF, CRM i dokumenty',
  'Kontakt mailowy i telefoniczny na bieżąco',
  'Bezpłatne założenie działalności',
];

const startFeaturesEN = [
  'Dedicated accountant and ongoing support',
  'Maintenance of revenue & expense ledger or lump-sum tax records',
  'Tax and ZUS (social insurance) settlements',
  'Preparation and submission of declarations',
  'Information on taxes due and deadlines',
  'Representation before tax authorities and ZUS',
  'Online accounting and electronic document workflow',
  'System access: invoicing, KSeF, CRM and documents',
  'Ongoing e-mail and phone contact',
  'Free business registration',
];

const businessFeaturesPL = [
  'Dedykowany księgowy i stałe wsparcie',
  'Prowadzenie KPIR lub ryczałtu',
  'Rozliczenia podatków i składek ZUS',
  'Przygotowanie i wysyłka deklaracji',
  'Informacje o podatkach do zapłaty i terminach',
  'Reprezentacja przed urzędami i ZUS',
  'Księgowość online i elektroniczny obieg dokumentów',
  'Bieżące konsultacje księgowe',
  'Roczne rozliczenie PIT',
  'Wsparcie w kontaktach z urzędami',
  'Priorytetowa obsługa',
  'Pełny dostęp do systemu (fakturowanie, KSeF, CRM, obieg dokumentów)',
];

const businessFeaturesEN = [
  'Dedicated accountant and ongoing support',
  'Maintenance of revenue & expense ledger or lump-sum tax records',
  'Tax and ZUS (social insurance) settlements',
  'Preparation and submission of declarations',
  'Information on taxes due and deadlines',
  'Representation before tax authorities and ZUS',
  'Online accounting and electronic document workflow',
  'Ongoing accounting consultations',
  'Annual PIT (personal income tax) filing',
  'Support in contacts with authorities',
  'Priority service',
  'Full system access (invoicing, KSeF, CRM, document workflow)',
];

const individualFactorsPL = [
  'liczby i rodzaju dokumentów księgowych',
  'zakresu prowadzonych prac księgowych i sprawozdawczych',
  'poziomu bieżącego wsparcia doradczego',
  'specyfiki działalności oraz struktury spółki',
];

const individualFactorsEN = [
  'the number and type of accounting documents',
  'the scope of bookkeeping and reporting work',
  'the level of ongoing advisory support required',
  'the nature of the business and company structure',
];

const individualScopesPL = [
  'prowadzenie pełnej księgowości',
  'rozliczenia CIT, VAT, JPK',
  'przygotowanie sprawozdań finansowych',
  'bieżące konsultacje księgowe i podatkowe',
  'reprezentacja przed US i ZUS',
  'współpraca z doradcą podatkowym',
  'wsparcie przy kontrolach, audytach i raportowaniu',
];

const individualScopesEN = [
  'full accounting records maintenance',
  'CIT, VAT, JPK settlements',
  'preparation of financial statements',
  'ongoing accounting and tax consultations',
  'representation before tax office and ZUS',
  'collaboration with a certified tax advisor',
  'support with audits, inspections and financial reporting',
];

export default function Pricing() {
  const { dict, lang } = useLang();
  const p = dict.pricing;
  const isEN = lang === 'en';

  const startFeatures = isEN ? startFeaturesEN : startFeaturesPL;
  const businessFeatures = isEN ? businessFeaturesEN : businessFeaturesPL;
  const individualFactors = isEN ? individualFactorsEN : individualFactorsPL;
  const individualScopes = isEN ? individualScopesEN : individualScopesPL;

  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToContact = (packageName: string) => {
    const contact = document.getElementById('kontakt');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleDetails = () => {
    const isExpanding = expandedCard !== 'individual';
    setExpandedCard(isExpanding ? 'individual' : null);

    if (isExpanding) {
      setTimeout(() => {
        document.getElementById('pricing-individual-card')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
    }
  };

  return (
    <section className="pricing-section" id="cennik">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{p.tag}</div>
          <h2 className="section-title">{p.title}</h2>
          <p className="section-subtitle">{p.subtitle}</p>
        </div>
        <div className="carousel-wrapper">
          <div className="pricing-grid" ref={scrollRef}>
            {/* Start */}
            <div className="pricing-card fade-in-scroll">
              <div className="pricing-card-content">
                <h3>{p.start}</h3>
                <div className="price">
                  299 zł<span> {p.perMonth}</span>
                </div>
                <div className="period">{isEN ? 'up to 5 accounting entries' : 'do 5 zapisów księgowych'}</div>
                <ul className="pricing-features">
                  {startFeatures.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <button
                type="button"
                className="pricing-btn"
                onClick={() => scrollToContact('Start')}
              >
                {p.chooseStart}
              </button>
            </div>

            {/* Business */}
            <div className="pricing-card featured fade-in-scroll">
              <div className="pricing-badge">{p.popular}</div>
              <div className="pricing-card-content">
                <h3>{p.business}</h3>
                <div className="price">
                  599 zł<span> {p.perMonth}</span>
                </div>
                <div className="period">{isEN ? 'up to 30 documents' : 'do 30 dokumentów'}</div>
                <ul className="pricing-features">
                  {businessFeatures.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <button
                type="button"
                className="pricing-btn"
                onClick={() => scrollToContact('Business')}
              >
                {p.chooseBusiness}
              </button>
            </div>

            {/* Indywidualny */}
            <div
              id="pricing-individual-card"
              className={`pricing-card fade-in-scroll ${expandedCard === 'individual' ? 'is-expanded' : ''}`}
              data-pricing-card=""
            >
              <div className="pricing-card-content">
                <h3 style={{ marginBottom: '0.75rem' }}>{p.individual}</h3>
                <div className="period" style={{ marginBottom: '1.25rem' }}>
                  {isEN ? 'for commercial law companies' : 'dla spółek prawa handlowego'}
                </div>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.4rem', color: 'var(--dark-gray)', fontWeight: 600 }}>
                  {isEN ? 'Custom Quote – What factors affect it?' : 'Wycena indywidualna - co na nią wpływa?'}
                </h4>
                <p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--gray)' }}>
                  {isEN
                    ? 'The scope of services and fees are agreed individually, taking into account:'
                    : 'Zakres usług oraz wynagrodzenie ustalane są indywidualnie, z uwzględnieniem:'}
                </p>
                <ul className="pricing-features" style={{ marginBottom: '0.8rem' }}>
                  {individualFactors.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <h4 style={{ fontSize: '0.95rem', margin: '0.5rem 0 0.4rem', color: 'var(--dark-gray)', fontWeight: 600 }}>
                  {isEN ? 'Possible service scope' : 'Zakres możliwych usług'}
                </h4>
                <ul className="pricing-features">
                  {individualScopes.map((f, i) => <li key={i}>{f}</li>)}
                </ul>

                {/* Grid-template-rows: 0fr→1fr — animacja bez layout shift */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: expandedCard === 'individual' ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                    willChange: expandedCard === 'individual' ? 'grid-template-rows' : 'auto',
                  }}
                >
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div className="pricing-card-details">
                      <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--dark-gray)' }}>
                        {isEN
                          ? 'We service commercial law companies, in particular limited liability companies (Sp. z o.o.), providing full-cycle accounting, secure settlements and ongoing substantive support.'
                          : 'Obsługujemy spółki prawa handlowego, w szczególności spółki z ograniczoną odpowiedzialnością, zapewniając pełną księgowość, bezpieczeństwo rozliczeń oraz bieżące wsparcie merytoryczne.'}
                      </p>
                      <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--dark-gray)' }}>
                        {isEN
                          ? 'We build our partnerships on clear principles, accountability and real contact with your accountant – no call centres, no automated responses.'
                          : 'Współpracę opieramy na jasnych zasadach, odpowiedzialności i realnym kontakcie z księgowym - bez infolinii i automatycznych odpowiedzi.'}
                      </p>
                      <a
                        href="#kontakt"
                        className="btn-primary"
                        style={{
                          display: 'inline-block',
                          padding: '0.75rem 2rem',
                          background: 'var(--accent)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '50px',
                          fontWeight: 600,
                          transition: 'all 0.3s',
                          textAlign: 'center',
                        }}
                      >
                        {p.askForQuote}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="pricing-btn pricing-details-toggle"
                aria-expanded={expandedCard === 'individual'}
                onClick={toggleDetails}
              >
                {expandedCard === 'individual' ? p.collapse : p.details}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
