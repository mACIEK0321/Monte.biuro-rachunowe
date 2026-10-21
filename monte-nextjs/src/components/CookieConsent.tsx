'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import {
  CONSENT_STORAGE_KEY,
  disableAnalytics,
  dropConsentMemory,
  enableAnalytics,
  getConsentExpiry,
  readConsent,
  saveConsent,
  type AnalyticsConsent,
} from '@/lib/analytics';

// setTimeout overflows above ~24.8 days, so a long consent lifetime is re-checked in steps.
const MAX_EXPIRY_TIMER_MS = 24 * 60 * 60 * 1000;

export default function CookieConsent() {
  const { lang, dict } = useLang();
  const c = dict.cookie;

  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const syncConsentRef = useRef<() => void>();

  const showBanner = useCallback(() => {
    setVisible(true);
    setShowDetails(false);
  }, []);

  useEffect(() => {
    window.showCookieBanner = showBanner;

    let expiryTimer: ReturnType<typeof setTimeout> | undefined;

    // A missing, legacy, malformed or expired choice keeps analytics off
    // (and removes old GA/Clarity cookies) until the visitor decides again.
    const syncConsent = () => {
      clearTimeout(expiryTimer);
      const record = readConsent();
      if (record?.analytics === 'granted') {
        enableAnalytics();
      } else {
        disableAnalytics();
      }
      setVisible(record === null);
      if (record) {
        const remaining = Math.max(getConsentExpiry(record) - Date.now(), 0);
        expiryTimer = setTimeout(syncConsent, Math.min(remaining + 1000, MAX_EXPIRY_TIMER_MS));
      }
    };
    syncConsentRef.current = syncConsent;

    // Choice changed or withdrawn in another tab.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
      dropConsentMemory();
      syncConsent();
    };

    // Timers are throttled in background tabs; re-check expiry when the tab is shown again.
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncConsent();
    };

    syncConsent();
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(expiryTimer);
      syncConsentRef.current = undefined;
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      delete window.showCookieBanner;
    };
  }, [showBanner]);

  const applyChoice = useCallback((choice: AnalyticsConsent) => {
    // Falls back to session memory when localStorage is blocked.
    saveConsent(choice);
    if (choice === 'granted') {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
    setVisible(false);
    // Schedules the expiry re-check for the new record.
    syncConsentRef.current?.();
  }, []);

  const handleAcceptAll = useCallback(() => applyChoice('granted'), [applyChoice]);

  const handleAcceptNecessary = useCallback(() => applyChoice('denied'), [applyChoice]);

  const privacyHref = lang === 'en' ? '/en/privacy-policy/' : '/polityka-prywatnosci/';
  const cookieHref = lang === 'en' ? '/en/cookie-policy/' : '/polityka-cookies/';

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label={c.bannerLabel}
      aria-modal="false"
    >
      <div className="cookie-banner-inner">
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: c.mainText }}
          />
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
            <Link href={privacyHref} style={{ textDecoration: 'underline' }}>
              {lang === 'en' ? 'Privacy Policy' : 'Polityka prywatności'}
            </Link>
            {' | '}
            <Link href={cookieHref} style={{ textDecoration: 'underline' }}>
              {lang === 'en' ? 'Cookie Policy' : 'Polityka cookies'}
            </Link>
          </p>
          {showDetails && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.85 }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>{c.necessaryTitle}</strong> — {c.necessaryDesc}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>{c.analyticsTitle}</strong> — {c.analyticsDesc}
              </p>
              <p>
                {c.adminInfo} {c.detailsLabel}{' '}
                <Link href={privacyHref}>{lang === 'en' ? 'Privacy Policy' : 'Polityka prywatności'}</Link>
                {' | '}
                <Link href={cookieHref}>{lang === 'en' ? 'Cookie Policy' : 'Polityka cookies'}</Link>.
              </p>
            </div>
          )}
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="btn btn-accept" onClick={handleAcceptAll}>
            {c.acceptAll}
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={handleAcceptNecessary}
          >
            {c.necessaryOnly}
          </button>
          <button
            type="button"
            className="btn btn-outline cookie-manage"
            onClick={() => setShowDetails((v) => !v)}
            style={{ fontSize: '0.85rem' }}
          >
            {showDetails ? c.hideDetails : c.showDetails}
          </button>
        </div>
      </div>
    </div>
  );
}
