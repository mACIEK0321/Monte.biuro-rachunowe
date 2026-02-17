import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Monte – Biuro rachunkowe online dla JDG i małych firm</h1>
          <p className="tagline">
            Księgowość bez stresu, zdalnie i na czas. Obsługa JDG i spółek –
            elektroniczny obieg dokumentów, dedykowany opiekun i rozliczenia
            zawsze na czas.
          </p>
          <div className="hero-buttons">
            <a href="#cennik" className="btn-primary">Zobacz pakiety</a>
            <a href="#kontakt" className="btn-secondary">Skontaktuj się</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-logo-container">
            <Image
              src="/logo/monte.svg"
              alt="Monte.biuro – Biuro rachunkowe"
              className="hero-logo"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
