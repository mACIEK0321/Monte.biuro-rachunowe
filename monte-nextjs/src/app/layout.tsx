import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';
import SchemaOrg from '@/components/SchemaOrg';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? 'vliwcdomgo';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.montebiuro.pl'),
  title: {
    default: 'Biuro Rachunkowe Kraków – Pełna Księgowość | MonTe',
    template: '%s | MonTe Biuro Rachunkowe Kraków',
  },
  description:
    'Certyfikowane biuro rachunkowe w Krakowie. Pełna księgowość, audyty i obsługa spółek z o.o. oraz firm międzynarodowych. Certyfikat MF, 20+ lat doświadczenia, w tym IBM.',
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
    siteName: 'MonTe Biuro Rachunkowe',
    url: 'https://www.montebiuro.pl',
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
    canonical: 'https://www.montebiuro.pl',
  },
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
  verification: {
    // Dodaj po weryfikacji w Google Search Console:
    // google: 'TWÓJ_KOD_WERYFIKACYJNY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AccountingService',
              name: 'MonTe Biuro Rachunkowe',
              url: 'https://www.montebiuro.pl',
              telephone: '+48-661-444-882',
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
              openingHours: 'Mo-Fr 08:00-17:00',
              priceRange: '$$',
              description:
                'Certyfikowane biuro rachunkowe w Krakowie z 20+ latami doświadczenia. Certyfikat Ministerstwa Finansów.',
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

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2GL77N6KWP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2GL77N6KWP');
          `}
        </Script>

        {/* Microsoft Clarity — analytics heatmaps & session recording */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      </body>
    </html>
  );
}
