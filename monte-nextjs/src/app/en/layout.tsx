import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';
import SchemaOrg from '@/components/SchemaOrg';
import { LanguageProvider } from '@/components/LanguageProvider';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.montebiuro.pl'),
  title: {default: 'MonTe Biuro Rachunkowe', template: '%s | MonTe'},
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider lang="en">
          <SchemaOrg />
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollAnimations />
          <CookieConsent />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
