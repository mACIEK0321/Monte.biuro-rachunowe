import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';
import SchemaOrg from '@/components/SchemaOrg';
import { LanguageProvider } from '@/components/LanguageProvider';
import { LangSetter } from '@/components/LangSetter';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.montebiuro.pl'),
  title: {
    default: 'Accounting Firm in Kraków for International Companies | MonTe',
    template: '%s | MonTe Certified Accounting Office Kraków',
  },
  description:
    'MonTe is a certified accounting firm in Kraków offering full-cycle bookkeeping, payroll, and tax advisory for sole traders, LLCs, and international businesses. Ministry of Finance certified. English-speaking team.',
  keywords: [
    'accounting office kraków',
    'certified accounting office poland',
    'full-cycle accounting kraków',
    'accounting for LLCs poland',
    'accounting for international companies',
    'certified accountant kraków',
    'tax compliance poland',
    'payroll services kraków',
    'US GAAP accounting poland',
    'accounting for corporations',
    'financial statements kraków',
    'bookkeeping services poland',
  ],
  authors: [{ name: 'MonTe Certified Accounting Office' }],
  openGraph: {
    title: 'MonTe Accounting Firm Kraków – English-Speaking Accountants',
    description:
      'Certified accounting office in Kraków. Full bookkeeping, VAT, payroll and tax advisory for foreign companies and expats. US GAAP experience. Online service across Poland.',
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['pl_PL'],
    siteName: 'MonTe Biuro Rachunkowe',
    url: 'https://www.montebiuro.pl/en/',
    images: [
      {
        url: 'https://www.montebiuro.pl/images/team/team.jpg',
        width: 1200,
        height: 630,
        alt: 'MonTe Accounting Firm Kraków',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Firm in Kraków for International Companies | MonTe',
    description:
      'Certified accounting office in Kraków. Full bookkeeping, VAT, payroll and tax advisory for foreign companies and expats.',
    images: ['/images/team/team.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.montebiuro.pl/en/',
    languages: {
      'x-default': 'https://www.montebiuro.pl/',
      pl: 'https://www.montebiuro.pl/',
      en: 'https://www.montebiuro.pl/en/',
    },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider lang="en">
      {/* Sets document.documentElement.lang="en" on the client for screen readers */}
      <LangSetter lang="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AccountingService',
            name: 'MonTe Biuro Rachunkowe',
            url: 'https://www.montebiuro.pl/en',
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
            inLanguage: 'en',
            description:
              'Certified accounting firm in Kraków. Full bookkeeping, VAT, payroll and tax advisory for foreign companies and expats.',
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
