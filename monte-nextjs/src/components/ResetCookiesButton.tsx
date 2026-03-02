'use client';

export default function ResetCookiesButton() {
  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface-secondary, #f8f9fa)', borderRadius: '0.5rem' }}>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Zmiana ustawień cookies:</strong> Kliknij poniższy przycisk, aby ponownie
        wyświetlić baner cookies i zmienić swoje preferencje.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          try { localStorage.removeItem('montebiuro-cookie-consent'); } catch {}
          // Use global function exposed by CookieConsent component if available
          if (typeof window !== 'undefined' && window.showCookieBanner) {
            window.showCookieBanner();
          } else {
            window.location.reload();
          }
        }}
      >
        Zmień ustawienia cookies
      </button>
    </div>
  );
}
