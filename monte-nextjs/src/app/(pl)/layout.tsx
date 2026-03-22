import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';
import SchemaOrg from '@/components/SchemaOrg';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: {
    default: 'Biuro Rachunkowe Kraków – Pełna Księgowość | MonTe',
    template: '%s | MonTe Biuro Rachunkowe Kraków',
  },
  description:
    'MonTe – certyfikowane biuro rachunkowe w Krakowie. Pełna księgowość, kadry, podatki i doradztwo dla JDG, spółek z o.o. i firm międzynarodowych. Certyfikat MF nr 36393/2020. Obsługa online.',
  keywords: [
    'biuro rachunkowe kraków',
    'pełna księgowość kraków',
    'biuro rachunkowe dla spółek z o.o.',
    'księgowość dla firm międzynarodowych',
    'certyfikowane biuro rachunkowe',
    'pełna księgowość audyt',
    'księgowość online kraków',
    'biuro rachunkowe JDG kraków',
    'księgowa z certyfikatem ministerstwa finansów',
    'obsługa księgowa spółek',
    'kadry i płace kraków',
    'doradztwo podatkowe kraków',
    'księgowość US GAAP',
    'biuro rachunkowe dla korporacji',
    'sprawozdania finansowe kraków',
    'KPiR ryczałt VAT kraków',
  ],
  authors: [{ name: 'MonTe Biuro Rachunkowe' }],
  openGraph: {
    title: 'Biuro Rachunkowe Kraków – Pełna Księgowość | MonTe',
    description:
      'Certyfikowane biuro rachunkowe w Krakowie z 20+ latami doświadczenia. Pełna księgowość, audyty, obsługa spółek i firm międzynarodowych. Certyfikat Ministerstwa Finansów.',
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: ['en_GB'],
    siteName: 'MonTe Biuro Rachunkowe',
    url: 'https://www.montebiuro.pl/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MonTe Biuro Rachunkowe Kraków',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biuro Rachunkowe Kraków – Pełna Księgowość | MonTe',
    description:
      'Certyfikowane biuro rachunkowe w Krakowie. Pełna księgowość, audyty, obsługa spółek z o.o. i firm międzynarodowych.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.montebiuro.pl/',
    languages: {
      'x-default': 'https://www.montebiuro.pl/',
      pl: 'https://www.montebiuro.pl/',
      en: 'https://www.montebiuro.pl/en/',
    },
  },
};

export default function PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider lang="pl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AccountingService',
            name: 'MonTe Biuro Rachunkowe',
            url: 'https://www.montebiuro.pl',
            logo: 'https://www.montebiuro.pl/logo/monte.svg',
            image: 'https://www.montebiuro.pl/images/team/team.jpg',
            telephone: ['+48661444882', '+48577161434'],
            email: 'kontakt@montebiuro.pl',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ul. Myśliwska 8',
              addressLocality: 'Kraków',
              postalCode: '30-718',
              addressCountry: 'PL',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 50.0647,
              longitude: 19.945,
            },
            openingHours: 'Mo-Fr 08:00-16:00',
            priceRange: '$$',
            areaServed: 'PL',
            inLanguage: 'pl',
            description:
              'Certyfikowane biuro rachunkowe w Krakowie. Pełna księgowość, kadry, podatki i doradztwo dla JDG, spółek z o.o. i firm międzynarodowych.',
            sameAs: ['https://www.instagram.com/montebiuro'],
          }),
        }}
      />
      <SchemaOrg />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollAnimations />
      <CookieConsent />
    </LanguageProvider>
  );
}
