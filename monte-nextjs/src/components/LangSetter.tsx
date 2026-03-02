'use client';
import { useEffect } from 'react';

/**
 * Sets document.documentElement.lang on the client.
 * Used by non-root layouts (EN) so screen readers and
 * browser tools get the correct language attribute.
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'pl'; // restore default on unmount
    };
  }, [lang]);
  return null;
}
