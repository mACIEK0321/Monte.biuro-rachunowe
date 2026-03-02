import type { Locale } from './config';
import pl from './pl';
import en from './en';

/* ------------------------------------------------------------------ */
/*  Recursive helper – preserves the nested key structure of `pl`     */
/*  but widens every leaf string literal to `string` so that `en`     */
/*  (which has different text values) is assignable to the same type. */
/*  readonly modifiers are kept so `as const` objects remain valid.   */
/* ------------------------------------------------------------------ */
type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Dictionary = DeepString<typeof pl>;

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.pl;
}

export { pl, en };
