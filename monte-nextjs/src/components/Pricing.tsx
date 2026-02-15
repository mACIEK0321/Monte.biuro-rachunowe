'use client';

import { useState } from 'react';

export default function Pricing() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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
          <div className="section-tag">Cennik</div>
          <h2 className="section-title">Cennik – pakiety księgowe</h2>
          <p className="section-subtitle">
            Usługi księgowe dla JDG i spółek – pakiety księgowości online.
            Rozliczenia ZUS w cenie. Wycena po konsultacji.
          </p>
        </div>
        <div className="pricing-grid">
          {/* Start */}
          <div className="pricing-card fade-in-scroll">
            <div className="pricing-card-content">
              <h3>Start</h3>
              <div className="price">
                299 zł<span> netto/msc</span>
              </div>
              <div className="period">do 5 zapisów księgowych</div>
              <ul className="pricing-features">
                <li>Dedykowany księgowy i stałe wsparcie</li>
                <li>Kompleksowa obsługa podatków i ZUS</li>
                <li>Reprezentacja przed US i ZUS</li>
                <li>Zgłoszenie adresu biura do kontroli skarbowej</li>
                <li>Przygotowanie i wysyłka JPK_VAT oraz VAT-UE</li>
                <li>Księgowość 100% online + fakturowanie</li>
                <li>Wygodna wymiana dokumentów bez papierów</li>
                <li>Księgowość prowadzona w pełni online</li>
                <li>Roczne rozliczenie składki zdrowotnej</li>
                <li>Prowadzenie KPiR lub ryczałtu</li>
                <li>Wyliczenie zaliczek PIT i VAT</li>
                <li>Pełne rozliczenia ZUS</li>
                <li>Bezpłatne założenie działalności</li>
              </ul>
            </div>
            <button
              type="button"
              className="pricing-btn"
              onClick={() => scrollToContact('Start')}
            >
              Wybieram Start
            </button>
          </div>

          {/* Business */}
          <div className="pricing-card featured fade-in-scroll">
            <div className="pricing-badge">Najpopularniejszy</div>
            <div className="pricing-card-content">
              <h3>Business</h3>
              <div className="price">
                599 zł<span> netto/msc</span>
              </div>
              <div className="period">do 30 dokumentów</div>
              <ul className="pricing-features">
                <li>Dedykowany księgowy i stałe wsparcie</li>
                <li>Kompleksowa obsługa podatków i ZUS</li>
                <li>Reprezentacja przed US i ZUS</li>
                <li>Zgłoszenie adresu biura do kontroli skarbowej</li>
                <li>Przygotowanie i wysyłka JPK_VAT oraz VAT-UE</li>
                <li>Księgowość 100% online + fakturowanie</li>
                <li>Wygodna wymiana dokumentów bez papierów</li>
                <li>Księgowość prowadzona w pełni online</li>
                <li>Roczne rozliczenie składki zdrowotnej</li>
                <li>Prowadzenie KPiR lub ryczałtu</li>
                <li>Wyliczenie zaliczek PIT i VAT</li>
                <li>Pełne rozliczenia ZUS</li>
                <li>Bezpłatne założenie działalności</li>
                <li>PIT roczny</li>
              </ul>
            </div>
            <button
              type="button"
              className="pricing-btn"
              onClick={() => scrollToContact('Business')}
            >
              Wybieram Business
            </button>
          </div>

          {/* Indywidualny */}
          <div
            id="pricing-individual-card"
            className={`pricing-card fade-in-scroll ${expandedCard === 'individual' ? 'is-expanded' : ''}`}
            data-pricing-card=""
          >
            <div className="pricing-card-content">
              <h3 style={{ marginBottom: '0.75rem' }}>Pakiet indywidualny</h3>
              <div className="period" style={{ marginBottom: '1.25rem' }}>
                dla spółek prawa handlowego
              </div>
              <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.4rem', color: 'var(--dark-gray)', fontWeight: 600 }}>
                Wycena indywidualna – co na nią wpływa?
              </h4>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--gray)' }}>
                Zakres usług oraz wynagrodzenie ustalane są indywidualnie, z uwzględnieniem:
              </p>
              <ul className="pricing-features" style={{ marginBottom: '0.8rem' }}>
                <li>liczby i rodzaju dokumentów księgowych</li>
                <li>zakresu prowadzonych prac księgowych i sprawozdawczych</li>
                <li>poziomu bieżącego wsparcia doradczego</li>
                <li>specyfiki działalności oraz struktury spółki</li>
              </ul>
              <h4 style={{ fontSize: '0.95rem', margin: '0.5rem 0 0.4rem', color: 'var(--dark-gray)', fontWeight: 600 }}>
                Zakres możliwych usług
              </h4>
              <ul className="pricing-features">
                <li>prowadzenie pełnej księgowości</li>
                <li>rozliczenia CIT, VAT, JPK</li>
                <li>przygotowanie sprawozdań finansowych</li>
                <li>bieżące konsultacje księgowe i podatkowe</li>
                <li>reprezentacja przed US i ZUS</li>
                <li>współpraca z doradcą podatkowym</li>
                <li>wsparcie przy kontrolach, audytach i raportowaniu</li>
              </ul>

              {/* Grid-template-rows: 0fr→1fr — animacja bez layout shift */}
              <div
                className="grid overflow-hidden"
                style={{
                  gridTemplateRows: expandedCard === 'individual' ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s ease',
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pricing-card-details">
                    <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--dark-gray)' }}>
                      Obsługujemy spółki prawa handlowego, w szczególności spółki z ograniczoną
                      odpowiedzialnością, zapewniając pełną księgowość, bezpieczeństwo rozliczeń
                      oraz bieżące wsparcie merytoryczne.
                    </p>
                    <p style={{ lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--dark-gray)' }}>
                      Współpracę opieramy na jasnych zasadach, odpowiedzialności i realnym
                      kontakcie z księgowym – bez infolinii i automatycznych odpowiedzi.
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
                      Zapytaj o wycenę
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
              {expandedCard === 'individual' ? 'Zwiń' : 'Szczegóły'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
