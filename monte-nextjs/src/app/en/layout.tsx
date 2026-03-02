import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';
import SchemaOrg from '@/components/SchemaOrg';
import { LanguageProvider } from '@/components/LanguageProvider';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? 'vliwcdomgo';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.montebiuro.pl'),
  title: {
    default: 'Certified Accounting Office Kraków – Full-Cycle Accounting | MonTe',
    template: '%s | MonTe Certified Accounting Office Kraków',
  },
  description:
    'Certified Accounting Office in Kraków, Poland. Full-cycle accounting, audits and LLC servicing for international companies. Ministry of Finance license, 20+ years of experience including IBM.',
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
    title: 'Certified Accounting Office Kraków – Full-Cycle Accounting | MonTe',
    description:
      'Certified Accounting Office in Kraków with 20+ years of experience. Full-cycle accounting, audits, LLC and international company servicing. Ministry of Finance license.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'MonTe Certified Accounting Office',
    url: 'https://www.montebiuro.pl/en',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MonTe Certified Accounting Office Kraków',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certified Accounting Office Kraków – Full-Cycle Accounting | MonTe',
    description:
      'Certified Accounting Office in Kraków. Full-cycle accounting, audits, LLC and international company servicing.',
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
    canonical: 'https://www.montebiuro.pl/en',
    languages: {
      'pl': 'https://www.montebiuro.pl',
      'en': 'https://www.montebiuro.pl/en',
    },
  },
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider lang="en">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AccountingService',
              name: 'MonTe Certified Accounting Office',
              url: 'https://www.montebiuro.pl/en',
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
                'Certified Accounting Office in Kraków with 20+ years of experience. Ministry of Finance license.',
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2GL77N6KWP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('js', new Date());
            gtag('config', 'G-2GL77N6KWP', { anonymize_ip: true });
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
        </LanguageProvider>
      </body>
    </html>
  );
}
