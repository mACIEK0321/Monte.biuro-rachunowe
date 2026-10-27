import type { Metadata } from 'next';
import { canonicalSlug } from '../../seo-urls.cjs';

export const SITE_URL = 'https://www.montebiuro.pl';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export type SiteLanguage = 'pl' | 'en';

export const routePairs = [
  ['/', '/en/'],
  ['/blog/', '/en/blog/'],
  ['/polityka-prywatnosci/', '/en/privacy-policy/'],
  ['/polityka-cookies/', '/en/cookie-policy/'],
  ['/regulamin/', '/en/terms-and-conditions/'],
] as const;

export function canonicalPath(path: string): string {
  const clean = path.split(/[?#]/)[0];
  return `/${clean.split('/').filter(Boolean).join('/')}${clean.split('/').filter(Boolean).length ? '/' : ''}`;
}

export const absoluteUrl = (path: string) => SITE_URL + canonicalPath(path);
export const postPath = (slug: string, lang: SiteLanguage) => `${lang === 'en' ? '/en' : ''}/blog/${encodeURIComponent(canonicalSlug(slug, lang))}/`;

export function staticAlternate(path: string): string | undefined {
  const normalized = canonicalPath(path);
  const pair = routePairs.find(p => p.includes(normalized as never));
  return pair?.find(p => p !== normalized);
}

export function pageMetadata({title, description, path, lang, alternate, image, article}: {
  title: string; description: string; path: string; lang: SiteLanguage;
  alternate?: string; image?: string; article?: {published?: string; modified?: string};
}): Metadata {
  const url = absoluteUrl(path);
  const other = alternate ?? staticAlternate(path);
  const fullTitle = `${title.replace(/\s*\|\s*MonTe$/i, '')} | MonTe`;
  const images = [{url: image || `${SITE_URL}/og-image.jpg`, alt: title}];
  return {
    title: {absolute: fullTitle}, description,
    alternates: {
      canonical: url,
      languages: other ? {
        [lang]: url,
        [lang === 'pl' ? 'en' : 'pl']: absoluteUrl(other),
        ...(['/', '/en/'].includes(canonicalPath(path)) ? {'x-default': absoluteUrl('/')} : {}),
      } : {},
    },
    openGraph: {
      title: fullTitle, description, url, siteName: 'MonTe Biuro Rachunkowe',
      locale: lang === 'en' ? 'en_GB' : 'pl_PL',
      ...(other ? {alternateLocale: [lang === 'en' ? 'pl_PL' : 'en_GB']} : {}),
      images, type: article ? 'article' : 'website',
      ...(article ? {publishedTime: article.published, modifiedTime: article.modified} : {}),
    },
    twitter: {card: 'summary_large_image', title: fullTitle, description, images},
    robots: {index: true, follow: true, 'max-image-preview': 'large'},
  };
}

export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
