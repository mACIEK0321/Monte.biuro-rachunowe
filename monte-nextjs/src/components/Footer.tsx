'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function Footer() {
  const { lang, dict } = useLang();
  const f = dict.footer;
  const isEN = lang === 'en';
  const base = isEN ? '/en' : '';

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={isEN ? '/en' : '/'} className="logo" aria-label="Monte.biuro">
              <Image
                src="/logo/monte.svg"
                alt="Monte.biuro - Biuro rachunkowe"
                className="logo-img"
                width={150}
                height={60}
              />
            </Link>
            <p>{f.description}</p>
          </div>
          <div className="footer-col">
            <h4>{f.servicesCol}</h4>
            <ul>
              <li><a href={`${base}/#uslugi`}>{f.allServices}</a></li>
              <li><a href={`${base}/#cennik`}>{dict.pricing.tag}</a></li>
              <li><a href={`${base}/#kontakt`}>{dict.nav.contact}</a></li>
              <li><a href={`${base}/#faq`}>{dict.nav.faq}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{f.companyCol}</h4>
            <ul>
              <li><a href={`${base}/#o-nas`}>{dict.nav.about}</a></li>
              <li><a href={`${base}/#cennik`}>{dict.nav.pricing}</a></li>
              <li><a href={`${base}/#proces`}>{dict.nav.process}</a></li>
              <li><Link href={isEN ? '/en/blog' : '/blog'}>{dict.nav.blog}</Link></li>
              <li><a href={`${base}/#kontakt`}>{dict.nav.contact}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{f.contactCol}</h4>
            <ul>
              <li style={{ whiteSpace: 'nowrap' }}>Monika Kołakowska: <a href="tel:+48661444882">+48 661 444 882</a></li>
              <li style={{ whiteSpace: 'nowrap' }}>Teresa Kućmierczyk: <a href="tel:+48577161434">+48 577 161 434</a></li>
              <li><a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a></li>
              <li>ul. Myśliwska 8<br />30-718 Kraków</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Monte.biuro. {f.allRights}
            {' | '}
            <Link href={isEN ? '/en/privacy-policy' : '/polityka-prywatnosci'}>
              {f.privacyPolicy}
            </Link>
            {' | '}
            <Link href={isEN ? '/en/cookie-policy' : '/polityka-cookies'}>
              {f.cookiePolicy}
            </Link>
            {' | '}
            <Link href={isEN ? '/en/terms-and-conditions' : '/regulamin'}>
              {f.termsAndConditions}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
