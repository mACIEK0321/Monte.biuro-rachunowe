'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'montebiuro-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'true') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage may be blocked
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Informacja o plikach cookie"
    >
      <div className="cookie-banner-inner">
        <p>
          Używamy plików cookie, aby poprawić jakość przeglądania i analizować
          ruch na stronie. Szczegóły w{' '}
          <a href="#">Polityce prywatności</a>.
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="btn btn-accept" onClick={accept}>
            Akceptuj
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={accept}
          >
            Zarządzaj
          </button>
        </div>
      </div>
    </div>
  );
}
