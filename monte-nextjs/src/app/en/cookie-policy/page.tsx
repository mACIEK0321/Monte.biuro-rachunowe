import { pageMetadata } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
import ResetCookiesButton from '@/components/ResetCookiesButton';

export const metadata = pageMetadata({title: 'Cookie Policy', description: 'Cookie Policy of montebiuro.pl – information about cookies, Google Analytics and consent management.', path: '/en/cookie-policy/', lang: 'en'});

export default function CookiePolicyEN() {
  return (
    <section
      className="legal-page"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}
    >
      <PageSchema path="/en/cookie-policy/" title={'Cookie Policy'} lang="en" />
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
        Electronic Communications Law.
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
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>180 days</td>
          </tr>
        </tbody>
      </table>

      <h3>Analytical Cookies – Google Analytics 4</h3>
      <p>
        This website uses Google Analytics 4, a web analytics service provided by:
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
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Up to 426 days</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}><code>_ga_*</code></td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Maintains session state for GA4</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Up to 426 days</td>
          </tr>
        </tbody>
      </table>
      <p>These cookies are used to:</p>
      <ul>
        <li>analyse website traffic,</li>
        <li>measure the number of unique users,</li>
        <li>generate statistics on website usage.</li>
      </ul>
      <p>
        The data are of a statistical nature and do not allow the Controller to directly
        identify individual users. <strong>IP anonymisation</strong> is enabled.
      </p>

      <h3>Marketing – Google Ads</h3>
      <p>
        A separate, optional marketing choice allows advertising measurement and personalised
        Google ads. The provider is Google Ireland Limited, identified above. With this consent,
        Google may receive advertising click identifiers (gclid, gbraid, wbraid) and events for
        submitting the contact form and clicking a phone number. These events do not include
        the content of your form.
      </p>
      <p>
        Analytics and marketing are independent choices. Marketing consent without analytics
        allows these conversions to be measured without granting analytics cookie storage.
        Analytics cookie expiry is not extended on subsequent visits.
      </p>

      {/* 4 */}
      <h2>4. Analytics and Marketing Consent</h2>
      <p>
        Both optional categories are off by default. In Details, you can choose each separately
        and save your preferences. Accept All enables both; Essential Only declines both.
      </p>
      <p>
        The legal basis for processing is{' '}
        <strong>Art. 6(1)(a) GDPR (consent)</strong>. You may withdraw your consent at any
        time by clicking the button below or by adjusting your browser settings.
      </p>

      {/* 5 */}
      <h2>5. International Transfers of Personal Data</h2>
      <p>
        Due to the use of Google services, personal data may be transferred outside the
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
        updated separately for each purpose after an explicit choice. Analytics consent enables
        analytics storage. Marketing consent enables advertising storage, advertising user data
        and advertising personalisation. The Google tag is not loaded when both purposes are declined.
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
        Declining analytics or marketing does not block the website or the contact form.
      </p>

      <ResetCookiesButton />
    </section>
  );
}
