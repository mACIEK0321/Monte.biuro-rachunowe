'use client';

import { withdrawConsent } from '@/lib/analytics';
import { useLang } from './LanguageProvider';

export default function ResetCookiesButton() {
  const { lang } = useLang();
  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface-secondary, #f8f9fa)', borderRadius: '0.5rem' }}>
      <p style={{ marginBottom: '1rem' }}>
        {lang === 'en'
          ? 'Withdraw analytics and marketing consent and choose your preferences again.'
          : 'Wycofaj zgody na analitykę i marketing, a następnie ponownie wybierz swoje preferencje.'}
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          // Stops GA and removes its cookies before persisting the reset
          withdrawConsent();
          // Use global function exposed by CookieConsent component if available
          if (window.showCookieBanner) {
            window.showCookieBanner();
          } else {
            window.location.reload();
          }
        }}
      >
        {lang === 'en' ? 'Change Cookie Settings' : 'Zmień ustawienia cookies'}
      </button>
    </div>
  );
}
