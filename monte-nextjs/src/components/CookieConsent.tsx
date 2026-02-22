'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'montebiuro-cookie-consent';

type ConsentChoice = 'all' | 'necessary' | null;

/**
 * Aktualizuje Google Consent Mode v2 (gtag).
 * Jeśli gtag nie jest załadowany, ustawia domyślny dataLayer.
 */
function updateGoogleConsent(choice: ConsentChoice) {
  const granted = choice === 'all' ? 'granted' : 'denied';

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];

    const gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };

    if (choice === null) {
      // Domyślny stan — przed wyborem użytkownika
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted',
        wait_for_update: 500,
      });
    } else {
      // Aktualizacja po wyborze użytkownika
      gtag('consent', 'update', {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
        functionality_storage: 'granted',
        personalization_storage: granted,
        security_storage: 'granted',
      });
    }
  }
}

// Rozszerzenie typu Window o dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'all' || stored === 'necessary') {
        updateGoogleConsent(stored as ConsentChoice);
        setVisible(false);
      } else {
        // Ustaw domyślny consent — denied do czasu wyboru
        updateGoogleConsent(null);
        setVisible(true);
      }
    } catch {
      updateGoogleConsent(null);
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'all');
    } catch {
      // localStorage zablokowany
    }
    updateGoogleConsent('all');
    setVisible(false);
  }, []);

  const handleAcceptNecessary = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'necessary');
    } catch {
      // localStorage zablokowany
    }
    updateGoogleConsent('necessary');
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Zgoda na pliki cookie"
      aria-modal="false"
    >
      <div className="cookie-banner-inner">
        <div>
          <p>
            Strona montebiuro.pl wykorzystuje pliki cookie. <strong>Niezbędne cookies</strong> zapewniają
            prawidłowe działanie serwisu. <strong>Analityczne cookies</strong> (Google Analytics) pomagają
            nam ulepszać stronę - wymagają Twojej zgody zgodnie z RODO (art.&nbsp;6 ust.&nbsp;1 lit.&nbsp;a).
          </p>
          {showDetails && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.85 }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Cookies niezbędne</strong> - przechowują Twój wybór dotyczący cookies i zapewniają bezpieczeństwo sesji. Nie wymagają zgody.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Cookies analityczne</strong> - zbierają zanonimizowane dane o ruchu na stronie (Google Analytics). Pomagają nam rozumieć, jak użytkownicy korzystają z serwisu.
              </p>
              <p>
                Administratorem danych jest MonTe Biuro Rachunkowe, ul.&nbsp;Myśliwska&nbsp;8, 30-718 Kraków. 
                Możesz wycofać zgodę w dowolnym momencie. Szczegóły w{' '}
                <a href="/polityka-prywatnosci">Polityce prywatności</a>.
              </p>
            </div>
          )}
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="btn btn-accept" onClick={handleAcceptAll}>
            Akceptuj wszystkie
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={handleAcceptNecessary}
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={() => setShowDetails((v) => !v)}
            style={{ fontSize: '0.85rem' }}
          >
            {showDetails ? 'Zwiń szczegóły' : 'Szczegóły'}
          </button>
        </div>
      </div>
    </div>
  );
}
