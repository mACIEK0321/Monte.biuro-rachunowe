import type { Metadata } from 'next';
import ResetCookiesButton from '@/components/ResetCookiesButton';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie Policy of montebiuro.pl – information about cookies, Google Analytics and consent management.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.montebiuro.pl/en/cookie-policy',
    languages: {
      pl: 'https://www.montebiuro.pl/polityka-cookies',
      en: 'https://www.montebiuro.pl/en/cookie-policy',
    },
  },
};

export default function CookiePolicyEN() {
  return (
    <section
      className="legal-page"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}
    >
      <h1>Cookie Policy</h1>

      {/* 1 */}
      <h2>1. General Information</h2>
      <p>This Cookie Policy applies to the website operated by:</p>
      <p>
        <strong>MonTe Biuro Rachunkowe s.c.</strong>
        <br />
        ul. Myśliwska 8, 30-718 Kraków, Poland
      </p>
      <p>
        This website uses cookies in accordance with applicable law, in particular the{' '}
        <strong>General Data Protection Regulation (GDPR)</strong> and the Polish
        Telecommunications Act implementing the ePrivacy Directive.
      </p>

      {/* 2 */}
      <h2>2. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They
        allow the website to function correctly and enable analysis of how it is used.
      </p>

      {/* 3 */}
      <h2>3. Types of Cookies Used</h2>

      <h3>Essential Cookies</h3>
      <p>
        These cookies are strictly necessary for the website to function properly. They do
        not require the user&apos;s consent and cannot be disabled without affecting the
        availability of the service.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--light-gray, #f5f5f5)' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Cookie Name</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Purpose</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}><code>montebiuro-cookie-consent</code></td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Stores the user&apos;s cookie preference (localStorage)</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Persistent</td>
          </tr>
        </tbody>
      </table>

      <h3>Analytical Cookies – Google Analytics 4</h3>
      <p>
        This website uses Google Analytics\u00a04, a web analytics service provided by:
      </p>
      <p>
        <strong>Google Ireland Limited</strong>
        <br />
        Gordon House, Barrow Street
        <br />
        Dublin 4, Ireland
      </p>
      <p>The following files are stored within this service:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--light-gray, #f5f5f5)' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Cookie Name</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Purpose</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}><code>_ga</code></td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Distinguishes users for Google Analytics</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>13 months</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}><code>_ga_*</code></td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Maintains session state for GA4</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>13 months</td>
          </tr>
        </tbody>
      </table>
      <p>These cookies are used to:</p>
      <ul>
        <li>analyse website traffic,</li>
        <li>measure the number of unique users,</li>
        <li>generate anonymised statistics on website usage.</li>
      </ul>
      <p>
        The data are of a statistical nature and do not allow the Controller to directly
        identify individual users. <strong>IP anonymisation</strong> is enabled.
      </p>

      {/* 4 */}
      <h2>4. Legal Basis for Analytical Cookies</h2>
      <p>
        Analytical cookies are set <strong>only after the user has given consent</strong> via
        the cookie consent banner displayed upon the first visit.
      </p>
      <p>
        The legal basis for processing is{' '}
        <strong>Art.\u00a06(1)(a) GDPR (consent)</strong>. You may withdraw your consent at any
        time by clicking the button below or by adjusting your browser settings.
      </p>

      {/* 5 */}
      <h2>5. International Transfers of Personal Data</h2>
      <p>
        Due to the use of Google Analytics, personal data may be transferred outside the
        European Economic Area (EEA). Such transfers are made in accordance with applicable
        law, in particular on the basis of{' '}
        <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European
        Commission. For further information, see{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s Privacy Policy
        </a>
        .
      </p>

      {/* 6 */}
      <h2>6. Google Consent Mode v2</h2>
      <p>
        This website implements <strong>Google Consent Mode v2</strong>. By default, all
        advertising and analytics consent signals are set to &ldquo;denied&rdquo;. Consent is
        only updated to &ldquo;granted&rdquo; after the user explicitly accepts analytical cookies
        via the banner. This ensures compliance with applicable data protection legislation.
      </p>

      {/* 7 */}
      <h2>7. Managing Your Cookie Preferences</h2>
      <p>You can manage your cookie preferences at any time by:</p>
      <ul>
        <li>changing cookie settings in your browser,</li>
        <li>deleting stored cookies via your browser settings,</li>
        <li>withdrawing consent using the button below.</li>
      </ul>
      <p>
        Restricting the use of cookies may affect the availability or functionality of
        certain website features.
      </p>

      <ResetCookiesButton />
    </section>
  );
}
