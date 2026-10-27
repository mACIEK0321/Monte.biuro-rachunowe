/**
 * Google Analytics 4 (gtag.js) in Basic Consent Mode.
 *
 * - gtag.js is not loaded and nothing is sent before an explicit, valid consent.
 * - All commands go through one standard `gtag()` that pushes `arguments` objects
 *   (gtag.js ignores plain arrays) and the denied default is always queued first.
 * - Analytics and marketing are separate, opt-in purposes. Marketing-only consent
 *   permits conversion events without granting analytics cookie storage.
 * - Withdrawal sets `ga-disable-<ID>` before the consent update, clears queued
 *   commands that were not processed yet, removes the script tag and GA/Clarity cookies.
 *
 * Code cannot switch off server-side GA4 Enhanced Measurement. "Page changes based on
 * browser history events" and "Form interactions" must be disabled in the GA4 web stream
 * settings, otherwise page views and form events are duplicated.
 */

export const GA_MEASUREMENT_ID = 'G-2GL77N6KWP';
const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
const GA_DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}` as const;

export const CONSENT_STORAGE_KEY = 'montebiuro-cookie-consent';

/** Version of the consent record. Legacy plain `all`/`necessary` values (v1) are not migrated: the banner asks again. */
export const CONSENT_VERSION = 3;

/**
 * Days after which the banner asks again. Conservative operational default
 * pending confirmation by the site owner's cookie policy.
 */
export const CONSENT_MAX_AGE_DAYS = 180;
const CONSENT_MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
const CLOCK_SKEW_MS = 5 * 60 * 1000;

/** GA cookie lifetime: 426 days (~14 months), not refreshed on later hits (`cookie_update: false`). */
export const GA_COOKIE_EXPIRES_DAYS = 426;
export const GA_COOKIE_EXPIRES_SECONDS = GA_COOKIE_EXPIRES_DAYS * 24 * 60 * 60;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    showCookieBanner?: () => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export type AnalyticsConsent = 'granted' | 'denied';

export interface ConsentRecord {
  v: typeof CONSENT_VERSION;
  analytics: AnalyticsConsent;
  marketing: AnalyticsConsent;
  /** ISO date of the decision. */
  decidedAt: string;
}

const DENIED_CONSENT = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const;

const GA_CONFIG = {
  send_page_view: false,
  cookie_expires: GA_COOKIE_EXPIRES_SECONDS,
  cookie_update: false,
  allow_google_signals: false,
} as const;

// GA4, Google Ads conversion linker and Microsoft Clarity first-party cookies.
const ANALYTICS_COOKIE = /^(_ga(_.+)?|_gid|_gat(_.+)?|_clck|_clsk)$/;
const MARKETING_COOKIE = /^(_gcl_.+|_gac_.+|_dc_gtm_.+|__gads|__gpi)$/;

// ─── Consent storage ────────────────────────────────────────────────────────

// Session-memory fallback when localStorage is unavailable.
// undefined = use localStorage, null = no choice in this tab.
let memoryRecord: ConsentRecord | null | undefined;

function toConsentRecord(value: unknown): ConsentRecord | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Partial<ConsentRecord>;
  if (record.v !== CONSENT_VERSION) return null;
  if (record.analytics !== 'granted' && record.analytics !== 'denied') return null;
  if (record.marketing !== 'granted' && record.marketing !== 'denied') return null;
  if (typeof record.decidedAt !== 'string') return null;
  return { v: CONSENT_VERSION, analytics: record.analytics, marketing: record.marketing, decidedAt: record.decidedAt };
}

export function getConsentExpiry(record: ConsentRecord): number {
  return Date.parse(record.decidedAt) + CONSENT_MAX_AGE_MS;
}

function isConsentCurrent(record: ConsentRecord, now: number): boolean {
  const decidedAt = Date.parse(record.decidedAt);
  return Number.isFinite(decidedAt) && decidedAt <= now + CLOCK_SKEW_MS && now < getConsentExpiry(record);
}

/** Returns the current valid choice, or null when it is missing, legacy, malformed or expired. */
export function readConsent(now = Date.now()): ConsentRecord | null {
  let candidate: unknown = null;
  if (memoryRecord !== undefined) {
    candidate = memoryRecord;
  } else {
    try {
      const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      candidate = raw ? JSON.parse(raw) : null;
    } catch {
      candidate = null;
    }
  }
  const record = toConsentRecord(candidate);
  return record && isConsentCurrent(record, now) ? record : null;
}

export function saveConsent(analytics: AnalyticsConsent, marketing: AnalyticsConsent = 'denied'): ConsentRecord {
  const record: ConsentRecord = { v: CONSENT_VERSION, analytics, marketing, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    memoryRecord = undefined;
  } catch {
    memoryRecord = record;
  }
  return record;
}

/** Persists a reset (no choice). Falls back to a stored denial, then to session memory. */
function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    memoryRecord = undefined;
    return;
  } catch {
    /* blocked */
  }
  memoryRecord = null;
  try {
    const denial: ConsentRecord = { v: CONSENT_VERSION, analytics: 'denied', marketing: 'denied', decidedAt: new Date().toISOString() };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(denial));
  } catch {
    /* session memory only */
  }
}

/** Called when another tab changed the stored choice, so localStorage becomes authoritative again. */
export function dropConsentMemory(): void {
  memoryRecord = undefined;
}

// ─── gtag lifecycle ─────────────────────────────────────────────────────────

let analyticsEnabled = false;
let marketingEnabled = false;
let defaultConsentQueued = false;
let jsCommandQueued = false;
let scriptState: 'idle' | 'loading' | 'loaded' | 'failed' = 'idle';
let lastPageViewPath: string | null = null;
let lastPageLocation: string | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer = window.dataLayer || []).push(arguments);
    };
  }
  if (!defaultConsentQueued) {
    window.gtag('consent', 'default', DENIED_CONSENT);
    defaultConsentQueued = true;
  }
  return window.gtag;
}

// gtag.js replaces dataLayer.push once it has processed the queue.
function isLibraryActive(): boolean {
  const dataLayer = window.dataLayer;
  return !!dataLayer && dataLayer.push !== Array.prototype.push;
}

function loadLibrary(): void {
  // A removed script that is still downloading executes anyway and picks up the queue.
  if (isLibraryActive() || scriptState === 'loading') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = GA_SCRIPT_SRC;
  script.addEventListener('load', () => { scriptState = 'loaded'; });
  script.addEventListener('error', () => {
    scriptState = 'failed';
    script.remove();
  });
  scriptState = 'loading';
  document.head.appendChild(script);
}

export function isAnalyticsEnabled(): boolean {
  return analyticsEnabled;
}

/** A stable snapshot that changes when either purpose changes. */
export function getMeasurementState(): number {
  return (analyticsEnabled ? 1 : 0) | (marketingEnabled ? 2 : 0);
}

export function subscribeAnalytics(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Applies both purposes without generating duplicate page views on marketing changes. */
export function applyConsent(record: Pick<ConsentRecord, 'analytics' | 'marketing'> | null): void {
  if (typeof window === 'undefined') return;
  const analytics = record?.analytics === 'granted';
  const marketing = record?.marketing === 'granted';
  if (!analytics && !marketing) {
    disableAnalytics();
    return;
  }
  if (analyticsEnabled === analytics && marketingEnabled === marketing) return;
  const revokedAnalytics = analyticsEnabled && !analytics;
  const revokedMarketing = marketingEnabled && !marketing;
  try {
    // Do not let a slow-loading tag replay a choice or event that was withdrawn.
    if ((revokedAnalytics || revokedMarketing) && window.dataLayer && !isLibraryActive()) {
      window.dataLayer.length = 0;
      defaultConsentQueued = false;
      jsCommandQueued = false;
    }
    const gtag = ensureGtag();
    window[GA_DISABLE_KEY] = false;
    gtag('set', {
      page_location: sanitizePageLocation(window.location.href, marketing),
      page_referrer: sanitizeReferrer(document.referrer),
      ads_data_redaction: !marketing,
      url_passthrough: false,
      allow_ad_personalization_signals: marketing,
    });
    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    });
    if (!jsCommandQueued) {
      gtag('js', new Date());
      jsCommandQueued = true;
    }
    gtag('config', GA_MEASUREMENT_ID, {...GA_CONFIG, allow_ad_personalization_signals: marketing});
    analyticsEnabled = analytics;
    marketingEnabled = marketing;
    if (!analytics) {
      lastPageViewPath = null;
      lastPageLocation = null;
      deleteCookies(ANALYTICS_COOKIE);
    }
    if (!marketing) deleteCookies(MARKETING_COOKIE);
    loadLibrary();
  } catch {
    disableAnalytics();
    return;
  }
  notify();
}

export function enableAnalytics(): void {
  applyConsent({analytics: 'granted', marketing: 'denied'});
}

/**
 * Stops GA and removes analytics cookies. Used for denial, missing/expired choice and withdrawal.
 * Safe to call repeatedly; nothing is queued unless GA was running.
 */
export function disableAnalytics(): void {
  if (typeof window === 'undefined') return;
  const wasEnabled = analyticsEnabled || marketingEnabled;
  analyticsEnabled = false;
  marketingEnabled = false;
  lastPageViewPath = null;
  lastPageLocation = null;
  try {
    // Must be set before the consent update so no further hit leaves the page.
    window[GA_DISABLE_KEY] = true;
    if (wasEnabled && window.dataLayer) {
      if (!isLibraryActive()) {
        // Drop config/events that gtag.js has not processed yet.
        window.dataLayer.length = 0;
        defaultConsentQueued = false;
        jsCommandQueued = false;
      }
      const gtag = ensureGtag();
      gtag('set', {
        page_location: sanitizePageLocation(window.location.href, false),
        ads_data_redaction: true,
        allow_ad_personalization_signals: false,
      });
      gtag('consent', 'update', DENIED_CONSENT);
    }
    document
      .querySelectorAll('script[src^="https://www.googletagmanager.com/gtag/js"]')
      .forEach((script) => script.remove());
  } catch {
    /* never break the page */
  }
  deleteAnalyticsCookies();
  if (wasEnabled) notify();
}

/** Withdrawal from the cookie policy page: stop GA first, then persist the reset. */
export function withdrawConsent(): void {
  disableAnalytics();
  clearConsent();
}

function cookieDomains(hostname: string): string[] {
  if (!hostname || /^[\d.]+$/.test(hostname) || hostname.includes(':')) return [];
  const labels = hostname.split('.');
  const domains: string[] = [];
  for (let i = 0; i <= labels.length - 2; i++) {
    const domain = labels.slice(i).join('.');
    domains.push(domain, `.${domain}`);
  }
  return domains;
}

/** Deletes GA/Clarity cookies on the current host and its parent domains. */
export function deleteAnalyticsCookies(): void {
  deleteCookies(ANALYTICS_COOKIE);
  deleteCookies(MARKETING_COOKIE);
}

function deleteCookies(pattern: RegExp): void {
  if (typeof document === 'undefined') return;
  try {
    const names = document.cookie
      .split(';')
      .map((cookie) => cookie.split('=')[0].trim())
      .filter((name) => pattern.test(name));
    if (names.length === 0) return;
    const domains = cookieDomains(window.location.hostname);
    for (const name of names) {
      const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/`;
      document.cookie = expired;
      for (const domain of domains) {
        document.cookie = `${expired}; domain=${domain}`;
      }
    }
  } catch {
    /* cookies blocked */
  }
}

// ─── Sanitised tracking ─────────────────────────────────────────────────────

// Only pre-approved campaign values survive. Arbitrary URL text can contain
// names or other personal data even if it looks like an ASCII token.
const CAMPAIGN_VALUES: Record<string, readonly string[]> = {
  utm_source: ['google', 'bing', 'instagram', 'facebook'],
  utm_medium: ['organic', 'social', 'referral', 'cpc'],
  utm_campaign: ['profil_firmy'],
};
const SAFE_TOKEN = /^[a-z0-9_]{1,40}$/;

export function getLangFromPath(path: string): 'pl' | 'en' {
  return /^\/en(\/|$)/.test(path) ? 'en' : 'pl';
}

/** Allowlisted campaigns and, only with marketing consent, Google Ads click IDs. */
export function sanitizePageLocation(href: string, includeAdClickIds = marketingEnabled): string {
  try {
    const url = new URL(href, window.location.origin);
    const clean = new URL(url.origin + url.pathname);
    for (const key of Object.keys(CAMPAIGN_VALUES)) {
      const value = url.searchParams.get(key);
      if (value && CAMPAIGN_VALUES[key].includes(value)) {
        clean.searchParams.set(key, value);
      }
    }
    if (includeAdClickIds) {
      for (const key of ['gclid', 'gbraid', 'wbraid']) {
        const value = url.searchParams.get(key);
        if (value) clean.searchParams.set(key, value);
      }
    }
    return clean.toString();
  } catch {
    return `${window.location.origin}/`;
  }
}

/** Same-origin referrers keep their path; external referrers are reduced to the origin. */
function sanitizeReferrer(referrer: string): string {
  if (!referrer) return '';
  try {
    const url = new URL(referrer);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.origin === window.location.origin ? url.origin + url.pathname : `${url.origin}/`;
  } catch {
    return '';
  }
}

export function hasTrackedPageView(path: string): boolean {
  return lastPageViewPath === path;
}

export interface PageViewInput {
  /** Route pathname used to send exactly one page_view per visit of a path. */
  path: string;
  /** window.location.href captured when the route was entered. */
  href: string;
  title: string;
}

export function trackPageView({ path, href, title }: PageViewInput): boolean {
  if (!analyticsEnabled || lastPageViewPath === path || typeof window.gtag !== 'function') return false;
  try {
    const pageLocation = sanitizePageLocation(href);
    const fields = {
      page_location: pageLocation,
      page_referrer: lastPageLocation ?? sanitizeReferrer(document.referrer),
      page_title: title.slice(0, 300),
      lang: getLangFromPath(path),
    };
    // `set` also covers automatically collected events, so the raw URL is never used.
    window.gtag('set', fields);
    window.gtag('event', 'page_view', fields);
    lastPageViewPath = path;
    lastPageLocation = sanitizeReferrer(pageLocation);
    return true;
  } catch {
    return false;
  }
}

export type AnalyticsEventName =
  | 'click_phone'
  | 'click_email'
  | 'click_consultation'
  | 'view_pricing'
  | 'generate_lead';

/** Static identifiers only (lowercase, digits, underscore). Never user input. */
export interface AnalyticsEventParams {
  component: string;
  cta_id?: string;
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams): void {
  const marketingConversion = marketingEnabled && (name === 'generate_lead' || name === 'click_phone');
  if ((!analyticsEnabled && !marketingConversion) || typeof window.gtag !== 'function') return;
  try {
    const path = window.location.pathname;
    const payload: Record<string, string> = {
      lang: getLangFromPath(path), page_path: path,
      page_location: sanitizePageLocation(window.location.href),
    };
    if (SAFE_TOKEN.test(params.component)) payload.component = params.component;
    if (params.cta_id && SAFE_TOKEN.test(params.cta_id)) payload.cta_id = params.cta_id;
    window.gtag('event', name, payload);
  } catch {
    /* tracking must never break the page */
  }
}
