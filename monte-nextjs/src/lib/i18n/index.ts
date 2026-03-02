import type { Locale } from './config';
import pl from './pl';
import en from './en';

export type Dictionary = typeof pl;

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.pl;
}

export { pl, en };
