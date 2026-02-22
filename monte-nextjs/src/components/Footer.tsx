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
              Profesjonalna księgowość, kadry i podatki dla JDG i firm. Pomagamy
              przedsiębiorcom rozwijać biznes, zajmując się formalnościami.
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
              <li><a href="tel:+48123456789">+48 123 456 789</a></li>
              <li><a href="mailto:kontakt@monte.biuro.pl">kontakt@monte.biuro.pl</a></li>
              <li>ul. Przykładowa 15<br />00-001 Warszawa</li>
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
