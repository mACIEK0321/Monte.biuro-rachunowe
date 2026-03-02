'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary, type Dictionary } from '@/lib/i18n';

interface LanguageContextValue {
  lang: Locale;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'pl',
  dict: getDictionary('pl'),
});

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  const dict = getDictionary(lang);
  return (
    <LanguageContext.Provider value={{ lang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}
