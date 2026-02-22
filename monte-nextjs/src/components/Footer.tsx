import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="Monte.biuro - Strona główna">
              <Image
                src="/logo/monte.svg"
                alt="Monte.biuro - Biuro rachunkowe"
                className="logo-img"
                width={150}
                height={60}
              />
            </Link>
            <p>
              Certyfikowane biuro rachunkowe w Krakowie. Pełna księgowość, kadry, podatki
              i doradztwo dla JDG, spółek z&nbsp;o.o. i&nbsp;firm międzynarodowych.
              Certyfikat Ministerstwa Finansów &bull; Członek SKwP.
            </p>
          </div>
          <div className="footer-col">
            <h4>Usługi</h4>
            <ul>
              <li><a href="/#uslugi">Wszystkie usługi</a></li>
              <li><a href="/#cennik">Cennik</a></li>
              <li><a href="/#kontakt">Kontakt</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Firma</h4>
            <ul>
              <li><a href="/#o-nas">O nas</a></li>
              <li><a href="/#cennik">Cennik</a></li>
              <li><a href="/#proces">Jak działamy</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="/#kontakt">Kontakt</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <ul>
              <li>Monika Kołakowska: <a href="tel:+48661444882">+48 661 444 882</a></li>
              <li>Teresa Kućmierczyk: <a href="tel:+48577161434">+48 577 161 434</a></li>
              <li><a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a></li>
              <li>ul. Myśliwska 8<br />30-718 Kraków</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Monte.biuro. Wszelkie prawa zastrzeżone.
            {' | '}
            <a href="#">Polityka prywatności</a>
            {' | '}
            <a href="#">Regulamin</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
