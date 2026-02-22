import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>MonTe - nowoczesne biuro rachunkowe dla JDG, małych i średnich firm, także międzynarodowych.</h1>
          <p className="tagline">
            Certyfikowane biuro rachunkowe online, członek Stowarzyszenia Księgowych w Polsce. Obsługujemy JDG, spółki osobowe oraz spółki prawa handlowego, polskie i zagraniczne, z dedykowanym opiekunem i elektronicznym obiegiem dokumentów.
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
              alt="Monte.biuro - Biuro rachunkowe"
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
