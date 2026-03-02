import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? 'vliwcdomgo';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.montebiuro.pl'),
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
    // suppressHydrationWarning allows EN layout to set lang="en" client-side
    <html lang="pl" suppressHydrationWarning>
      <body>
        {children}

        {/* Google Analytics 4 — consent-aware (CookieConsent sets default before this fires) */}
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

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
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

