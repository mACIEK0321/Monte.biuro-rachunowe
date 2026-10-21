import { absoluteUrl, jsonLd, ORGANIZATION_ID, SITE_URL, type SiteLanguage } from '@/lib/seo';

export default function PageSchema({path, title, lang}: {path: string; title: string; lang: SiteLanguage}) {
  const url = absoluteUrl(path);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`,
    url, name: title, inLanguage: lang, isPartOf: {'@id': `${SITE_URL}/#website`}, about: {'@id': ORGANIZATION_ID},
  })}} />;
}
