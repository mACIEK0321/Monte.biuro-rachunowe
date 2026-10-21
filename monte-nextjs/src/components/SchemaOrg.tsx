import { absoluteUrl, jsonLd, ORGANIZATION_ID, SITE_URL } from '@/lib/seo';

export default function SchemaOrg() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AccountingService', '@id': ORGANIZATION_ID,
        name: 'MonTe Biuro Rachunkowe', url: absoluteUrl('/'),
        logo: `${SITE_URL}/logo/monte.svg`, image: `${SITE_URL}/images/team/team.jpg`,
        telephone: ['+48661444882', '+48577161434'], email: 'kontakt@montebiuro.pl',
        address: {'@type': 'PostalAddress', streetAddress: 'ul. Myśliwska 8', addressLocality: 'Kraków', postalCode: '30-718', addressCountry: 'PL'},
        openingHours: 'Mo-Fr 08:00-16:00',
        sameAs: ['https://www.instagram.com/montebiuro'],
        // Conflicting coordinates and unverified credentials are deliberately omitted.
      },
      {'@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: absoluteUrl('/'), name: 'MonTe Biuro Rachunkowe', publisher: {'@id': ORGANIZATION_ID}, inLanguage: ['pl', 'en']},
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd(graph)}} />;
}
