import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'Terms and Conditions of MonTe Biuro Rachunkowe s.c. – rules for the provision of accounting services, obligations of both parties and payment terms.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.montebiuro.pl/en/terms-and-conditions',
    languages: {
      pl: 'https://www.montebiuro.pl/regulamin',
      en: 'https://www.montebiuro.pl/en/terms-and-conditions',
    },
  },
};

export default function TermsAndConditionsEN() {
  return (
    <section
      className="legal-page"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}
    >
      <h1>Terms and Conditions for the Provision of Accounting Services</h1>
      <p className="legal-subtitle">
        <strong>MonTe Biuro Rachunkowe s.c.</strong> — Effective date: 1&nbsp;March 2026
      </p>

      {/* § 1 */}
      <h2>§&nbsp;1. General Provisions</h2>
      <ol>
        <li>
          These Terms and Conditions govern the provision of accounting, tax advisory and
          payroll services by MonTe Biuro Rachunkowe s.c., hereinafter referred to as the
          &ldquo;Service Provider&rdquo;.
        </li>
        <li>
          The Service Provider operates on the basis of its registration in the Central
          Register and Information on Business Activity (CEIDG) and holds the Ministry of
          Finance Certificate No.&nbsp;36393/2020, authorising it to maintain accounting
          records as a professional service.
        </li>
        <li>
          The Service Provider delivers services exclusively on the basis of a written
          contract concluded with the Client.
        </li>
        <li>
          These Terms and Conditions form an integral part of the service contract,
          unless the contract provides otherwise.
        </li>
      </ol>

      {/* § 2 */}
      <h2>§&nbsp;2. Definitions</h2>
      <p>For the purposes of these Terms and Conditions, the following definitions apply:</p>
      <ol>
        <li>
          <strong>Service Provider</strong> – MonTe Biuro Rachunkowe s.c.,
          ul.&nbsp;Myśliwska&nbsp;8, 30-718 Kraków, Poland.
        </li>
        <li>
          <strong>Client</strong> – an individual conducting business activity, a legal
          person or an organisational unit without legal personality that has concluded a
          service contract with the Service Provider.
        </li>
        <li>
          <strong>Contract</strong> – the written agreement for the provision of
          accounting services concluded between the Service Provider and the Client.
        </li>
        <li>
          <strong>Source Documents</strong> – invoices, receipts, bank statements, payroll
          records and other financial and accounting documents provided by the Client to the
          Service Provider.
        </li>
        <li>
          <strong>Client Portal</strong> – the IT system (wFirma or equivalent) enabling
          electronic submission of documents, access to settlements and communication
          between the parties.
        </li>
      </ol>

      {/* § 3 */}
      <h2>§&nbsp;3. Scope of Services</h2>
      <ol>
        <li>
          The Service Provider delivers services as defined in the Contract, in particular:
          <ul>
            <li>maintenance of full accounting records or a Revenue and Expense Ledger (KPiR),</li>
            <li>flat-rate income tax records,</li>
            <li>personal and corporate income tax settlements (PIT, CIT),</li>
            <li>VAT settlements and preparation of Standard Audit Files (JPK),</li>
            <li>payroll, HR administration and social insurance (ZUS) settlements,</li>
            <li>preparation of financial statements,</li>
            <li>representation of the Client before tax authorities and ZUS,</li>
            <li>ongoing accounting and tax advisory within the agreed scope.</li>
          </ul>
        </li>
        <li>
          The detailed scope of services and the fee are set out in the Contract or its
          schedule.
        </li>
        <li>
          Services outside the agreed scope are carried out on the basis of a separate
          order and are subject to an additional quotation.
        </li>
      </ol>

      {/* § 4 */}
      <h2>§&nbsp;4. Conclusion of the Contract</h2>
      <ol>
        <li>
          The Contract is concluded in written or electronic form (qualified electronic
          signature or trusted profile).
        </li>
        <li>
          A precondition for concluding the Contract is the Client&apos;s provision of
          complete data necessary for its performance, including business registration
          documents.
        </li>
        <li>
          The Contract is concluded for an indefinite or fixed term, as set out in its
          provisions.
        </li>
        <li>
          The Service Provider reserves the right to decline to conclude the Contract
          without stating a reason.
        </li>
      </ol>

      {/* § 5 */}
      <h2>§&nbsp;5. Obligations of the Service Provider</h2>
      <ol>
        <li>
          The Service Provider undertakes to:
          <ul>
            <li>maintain books and settlements in accordance with applicable law,</li>
            <li>exercise due diligence in the performance of contracted services,</li>
            <li>
              keep the Client informed of significant changes in tax and accounting
              regulations affecting the Client&apos;s business,
            </li>
            <li>maintain the confidentiality of all information obtained from the Client,</li>
            <li>assign a dedicated account manager responsible for the Client&apos;s servicing,</li>
            <li>
              file tax returns and reports on time, provided that the Client has delivered
              complete Source Documents by the agreed deadline.
            </li>
          </ul>
        </li>
        <li>
          The Service Provider shall not be liable for consequences arising from delays or
          errors caused by the Client&apos;s acts or omissions.
        </li>
      </ol>

      {/* § 6 */}
      <h2>§&nbsp;6. Obligations of the Client</h2>
      <ol>
        <li>
          The Client undertakes to:
          <ul>
            <li>
              deliver complete Source Documents in a timely manner, no later than
              the 5th&nbsp;business day of the month following the month to which the
              documents relate (or by any other deadline specified in the Contract),
            </li>
            <li>
              promptly notify the Service Provider of any events that may affect tax
              and accounting settlements (e.g.&nbsp;change of taxation form, hiring of
              employees, opening of new branches),
            </li>
            <li>pay the Service Provider&apos;s fees on time,</li>
            <li>retain documentation in accordance with applicable law,</li>
            <li>
              cooperate with data migrations and the transfer of archives from
              previous accounting firms.
            </li>
          </ul>
        </li>
        <li>
          The Client bears sole responsibility for the accuracy and completeness of
          any documents and information provided.
        </li>
      </ol>

      {/* § 7 */}
      <h2>§&nbsp;7. Fees and Payment Terms</h2>
      <ol>
        <li>
          The Service Provider&apos;s fee is set out in the Contract as a net amount,
          to which VAT is added at the rate applicable on the date of invoicing.
        </li>
        <li>
          Fees are payable in advance, by the last business day of the month preceding
          the month of service delivery, or by any other deadline specified in the
          Contract.
        </li>
        <li>
          An invoice is issued at the beginning of each billing period and delivered
          electronically.
        </li>
        <li>
          In the event of late payment, the Service Provider is entitled to charge
          statutory interest for late payment in commercial transactions.
        </li>
        <li>
          The Service Provider reserves the right to revise the fee with one
          month&apos;s written notice.
        </li>
      </ol>

      {/* § 8 */}
      <h2>§&nbsp;8. Document Submission</h2>
      <ol>
        <li>
          Documents are submitted exclusively by electronic means via the Client Portal,
          unless the parties agree otherwise.
        </li>
        <li>
          The Client is responsible for the legibility, completeness and quality of
          scanned or photographed documents.
        </li>
        <li>The Service Provider confirms receipt of documents within the Client Portal.</li>
        <li>
          Original documents are retained by the Client or transferred to the Service
          Provider under separate arrangements.
        </li>
      </ol>

      {/* § 9 */}
      <h2>§&nbsp;9. Personal Data Protection and Confidentiality</h2>
      <ol>
        <li>
          The Service Provider processes the personal data of the Client and the
          Client&apos;s employees solely for the purpose of performing the Contract.
        </li>
        <li>
          Detailed rules on personal data processing are set out in the{' '}
          <a href="/en/privacy-policy">Privacy Policy</a>.
        </li>
        <li>
          Both parties undertake to keep confidential all confidential information
          obtained in connection with the performance of the Contract, both during and
          after the term of the Contract, without time limit.
        </li>
        <li>
          The confidentiality obligation does not apply to information whose disclosure
          is required by law or by a competent authority.
        </li>
      </ol>

      {/* § 10 */}
      <h2>§&nbsp;10. Liability</h2>
      <ol>
        <li>
          The Service Provider is liable for damages caused to the Client through the
          Service Provider&apos;s fault, arising directly from the performance of services,
          up to a maximum of twelve times the monthly net fee set out in the Contract,
          unless the damage resulted from gross negligence or wilful misconduct.
        </li>
        <li>
          The Service Provider shall not be liable for:
          <ul>
            <li>
              consequences arising from the Client&apos;s submission of incomplete,
              inaccurate or late documents,
            </li>
            <li>
              decisions taken by the Client without prior consultation with the Service
              Provider,
            </li>
            <li>changes in law taking effect after the service has been performed,</li>
            <li>
              force majeure events, including IT system failures beyond the Service
              Provider&apos;s control.
            </li>
          </ul>
        </li>
        <li>
          The Service Provider holds professional indemnity (civil liability) insurance.
        </li>
      </ol>

      {/* § 11 */}
      <h2>§&nbsp;11. Termination of Contract</h2>
      <ol>
        <li>
          Either party may terminate an open-ended Contract with one month&apos;s notice,
          effective at the end of a calendar month.
        </li>
        <li>
          The Service Provider may terminate the Contract with immediate effect in the
          event that:
          <ul>
            <li>the Client&apos;s payments are overdue by more than 30&nbsp;days,</li>
            <li>the Client submits false documents or information,</li>
            <li>the Client materially breaches any other provision of the Contract.</li>
          </ul>
        </li>
        <li>
          Upon termination of the Contract, the Service Provider will return all
          documentation and data archives to the Client within 30&nbsp;days, provided all
          outstanding fees have been settled.
        </li>
      </ol>

      {/* § 12 */}
      <h2>§&nbsp;12. Complaints</h2>
      <ol>
        <li>
          The Client may submit complaints in writing or electronically to:{' '}
          <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>.
        </li>
        <li>
          A complaint should include: a description of the subject matter, the
          circumstances in which it arose, and the Client&apos;s expected resolution.
        </li>
        <li>
          The Service Provider will respond to the complaint within 14&nbsp;business days
          of receipt.
        </li>
      </ol>

      {/* § 13 */}
      <h2>§&nbsp;13. Final Provisions</h2>
      <ol>
        <li>
          Matters not regulated by these Terms and Conditions are governed by the
          provisions of the Polish Civil Code, the Accounting Act and other applicable
          legislation.
        </li>
        <li>
          The parties shall endeavour to resolve any disputes arising from the Contract
          amicably. In the absence of agreement, the court of jurisdiction shall be the
          court competent for the Service Provider&apos;s registered seat.
        </li>
        <li>
          The Service Provider reserves the right to amend these Terms and Conditions.
          The Client will be notified of any amendments at least 14&nbsp;days in advance
          by electronic means.
        </li>
        <li>These Terms and Conditions enter into force on 1&nbsp;March 2026.</li>
      </ol>

      <p
        style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb',
          fontSize: '0.9rem',
          color: '#666',
        }}
      >
        <strong>MonTe Biuro Rachunkowe s.c.</strong>
        <br />
        ul.&nbsp;Myśliwska&nbsp;8, 30-718 Kraków, Poland
        <br />
        <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>
      </p>
    </section>
  );
}
