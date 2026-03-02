export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/** Detect browser language – returns 'en' for en-US/en-GB, otherwise 'pl' */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language || (navigator as any).userLanguage || '';
  if (/^en(-|$)/i.test(lang)) return 'en';
  return 'pl';
}
