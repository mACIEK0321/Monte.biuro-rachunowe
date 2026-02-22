import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://montebiuro.pl'),
  title: {
    default: 'Monte - Biuro rachunkowe online dla JDG i małych firm',
    template: '%s | Monte Biuro Rachunkowe',
  },
  description:
    'Biuro rachunkowe online dla JDG i małych firm. Księgowość, rozliczenia ZUS, usługi księgowe dla B2B. Prosto, zdalnie, bezpiecznie.',
  keywords: [
    'biuro rachunkowe',
    'księgowość online',
    'JDG',
    'rozliczenia ZUS',
    'usługi księgowe',
    'księgowość dla firm',
    'biuro rachunkowe online',
    'KPiR',
    'ryczałt',
    'VAT',
    'kadry i płace',
  ],
  authors: [{ name: 'Monte Biuro Rachunkowe' }],
  openGraph: {
    title: 'Monte - Biuro rachunkowe online dla JDG i małych firm',
    description:
      'Biuro rachunkowe online dla JDG i małych firm. Księgowość, rozliczenia ZUS, usługi księgowe dla B2B.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Monte Biuro Rachunkowe',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg',
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
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollAnimations />
        <CookieConsent />
      </body>
    </html>
  );
}
