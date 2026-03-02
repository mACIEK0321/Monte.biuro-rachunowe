import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy of MonTe Biuro Rachunkowe s.c. – rules for the processing of personal data in accordance with the GDPR.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.montebiuro.pl/en/privacy-policy',
    languages: {
      pl: 'https://www.montebiuro.pl/polityka-prywatnosci',
      en: 'https://www.montebiuro.pl/en/privacy-policy',
    },
  },
};

export default function PrivacyPolicyEN() {
  return (
    <section
      className="legal-page"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}
    >
      <h1>Privacy Policy</h1>
      <p className="legal-subtitle">Protection and Processing of Personal Data</p>

      <p>
        In compliance with Regulation (EU) 2016/679 of the European Parliament and of the
        Council of 27\u00a0April 2016 on the protection of natural persons with regard to the
        processing of personal data and on the free movement of such data (the\u00a0
        <strong>General Data Protection Regulation – GDPR</strong>), MonTe Biuro
        Rachunkowe s.c. provides the following information on the rules for processing
        personal data and on the rights available to data subjects.
      </p>

      {/* 1 */}
      <h2>1. Data Controller</h2>
      <p>
        The Data Controller of your personal data is:
        <br />
        <strong>MonTe Biuro Rachunkowe s.c.</strong>
        <br />
        ul. Myśliwska 8, 30-718 Kraków, Poland
        <br />
        (hereinafter referred to as the &ldquo;Controller&rdquo;).
      </p>

      {/* 2 */}
      <h2>2. Contact for Data Protection Matters</h2>
      <p>
        For any matters related to the processing of personal data, please contact the
        Controller:
        <br />
        by email:{' '}
        <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>
      </p>

      {/* 3 */}
      <h2>3. Purposes and Legal Bases for Processing</h2>
      <p>Your personal data are processed for the following purposes:</p>
      <ul>
        <li>
          <strong>Entering into and performing contracts</strong> for accounting, tax
          advisory and payroll services —{' '}
          <em>Art.\u00a06(1)(b) GDPR (performance of a contract)</em>
        </li>
        <li>
          <strong>Maintaining accounting records and financial settlements</strong> —{' '}
          <em>Art.\u00a06(1)(b) and (c) GDPR (contract performance and legal obligation)</em>
        </li>
        <li>
          <strong>Fulfilling legal obligations</strong> arising from tax, accounting and
          social insurance law —{' '}
          <em>Art.\u00a06(1)(c) GDPR (legal obligation)</em>
        </li>
        <li>
          <strong>Responding to client enquiries and correspondence</strong> —{' '}
          <em>Art.\u00a06(1)(f) GDPR (legitimate interest of the Controller)</em>
        </li>
        <li>
          <strong>Marketing of the Controller&apos;s own services</strong> —{' '}
          <em>Art.\u00a06(1)(f) GDPR (legitimate interest)</em> or{' '}
          <em>Art.\u00a06(1)(a) GDPR (consent, where required by applicable law)</em>
        </li>
        <li>
          <strong>Establishing, asserting or defending legal claims</strong> —{' '}
          <em>Art.\u00a06(1)(f) GDPR (legitimate interest)</em>
        </li>
        <li>
          <strong>Website analytics and statistical analysis</strong> —{' '}
          <em>Art.\u00a06(1)(a) GDPR (consent via the cookie consent banner)</em>
        </li>
      </ul>

      {/* 4 */}
      <h2>4. Categories of Personal Data Processed</h2>
      <p>The Controller may process in particular:</p>
      <ul>
        <li>identification and contact data (name, address, email, phone number),</li>
        <li>financial and tax data,</li>
        <li>
          employee data of clients, in the scope required for payroll and HR
          administration,
        </li>
        <li>data contained in accounting documents,</li>
        <li>online identifiers (e.g.\u00a0IP address, cookie identifiers).</li>
      </ul>

      {/* 5 */}
      <h2>5. Recipients of Personal Data</h2>
      <p>
        Recipients of personal data may include entities cooperating with the Controller,
        in particular:
      </p>
      <ul>
        <li>providers of accounting and IT systems,</li>
        <li>hosting and email service providers,</li>
        <li>legal and advisory service providers,</li>
        <li>banks and payment operators,</li>
        <li>postal operators and courier companies,</li>
        <li>public authorities – to the extent required by applicable law,</li>
        <li>analytics tool providers (Google Ireland Limited).</li>
      </ul>

      {/* 6 */}
      <h2>6. International Transfers of Personal Data</h2>
      <p>
        The use of Google Analytics may involve the transfer of personal data outside the
        European Economic Area (EEA).
      </p>
      <p>
        Such transfers are carried out in accordance with the GDPR, in particular on the basis
        of{' '}
        <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European
        Commission, which provide appropriate safeguards for the protection of personal data.
      </p>

      {/* 7 */}
      <h2>7. Retention Periods</h2>
      <p>Personal data will be retained for the period:</p>
      <ul>
        <li>necessary for the performance of the contract and delivery of services,</li>
        <li>
          required by applicable law, in particular tax and accounting regulations (generally
          5\u00a0years from the end of the tax year),
        </li>
        <li>until the statute of limitations for claims has expired,</li>
        <li>
          until withdrawal of consent – for data processed on the basis of consent,
        </li>
        <li>
          until a valid objection is raised – for data processed on the basis of legitimate
          interest for marketing purposes.
        </li>
      </ul>

      {/* 8 */}
      <h2>8. Automated Processing and Profiling</h2>
      <p>
        Data may be processed in an automated manner for statistical purposes (Google
        Analytics). No decisions producing legal effects or similarly significantly affecting
        data subjects are made solely by automated means.
      </p>

      {/* 9 */}
      <h2>9. Rights of Data Subjects</h2>
      <p>
        Under the GDPR, you have the following rights regarding your personal data:
      </p>
      <ul>
        <li>
          <strong>Right of access</strong> – to obtain confirmation of whether the Controller
          processes your data and to receive a copy,
        </li>
        <li>
          <strong>Right to rectification</strong> – to have inaccurate or incomplete data
          corrected,
        </li>
        <li>
          <strong>Right to erasure</strong> (&ldquo;right to be forgotten&rdquo;) – to request
          deletion of data in circumstances provided by law,
        </li>
        <li>
          <strong>Right to restriction of processing</strong> – to request that processing be
          limited in certain circumstances,
        </li>
        <li>
          <strong>Right to object</strong> – to object to processing based on legitimate
          interest or for direct marketing,
        </li>
        <li>
          <strong>Right to data portability</strong> – to receive your data in a structured,
          machine-readable format and transfer it to another controller,
        </li>
        <li>
          <strong>Right to withdraw consent</strong> at any time, without affecting the
          lawfulness of processing carried out before withdrawal,
        </li>
        <li>
          <strong>Right to lodge a complaint</strong> with the President of the Polish Personal
          Data Protection Office (UODO) at ul.\u00a0Stawki\u00a02, 00-193 Warszawa, Poland, or with
          the supervisory authority in your country of residence.
        </li>
      </ul>

      {/* 10 */}
      <h2>10. Voluntary Provision of Data</h2>
      <p>
        The provision of personal data is voluntary; however, it is necessary for concluding
        a contract and delivering services. Failure to provide the required data will prevent
        the Controller from performing the services.
      </p>

      {/* 11 */}
      <h2>11. Cookies</h2>
      <p>
        This website uses cookies as described in the{' '}
        <a href="/en/cookie-policy">Cookie Policy</a>.
      </p>
      <p>
        The Controller uses Google Analytics\u00a04 for website analytics and traffic measurement.
        Detailed information on how cookies operate is available in the separate{' '}
        <a href="/en/cookie-policy">Cookie Policy</a>.
      </p>
    </section>
  );
}
