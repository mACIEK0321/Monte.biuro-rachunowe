import type { Metadata } from 'next';
import Link from 'next/link';
import Contact from '@/components/Contact';
import { jsonLd as serializeJsonLd } from '@/lib/seo';

const URL = 'https://www.montebiuro.pl/pelna-ksiegowosc-krakow/';

export const metadata: Metadata = {
  title: { absolute: 'Pełna księgowość dla firm Kraków – spółki z o.o. | MonTe' },
  description:
    'Pełna księgowość spółek z o.o. i firm w Krakowie: księgi rachunkowe, CIT, VAT, JPK, sprawozdania finansowe. Dedykowana księgowa, bezpłatna konsultacja.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image', title: 'Pełna księgowość Kraków | MonTe', images: ['https://www.montebiuro.pl/og-image.jpg'] },
  openGraph: {
    url: URL,
    title: 'Pełna księgowość dla firm w Krakowie | MonTe',
    description: 'Księgi rachunkowe, CIT, VAT, JPK i sprawozdania finansowe dla spółek z o.o. Doświadczenie z IBM i międzynarodowych korporacji.',
    locale: 'pl_PL',
    type: 'website',
    images: [{url: 'https://www.montebiuro.pl/og-image.jpg', alt: 'MonTe Biuro Rachunkowe'}],
  },
};

const faq = [
  {
    q: 'Kto musi prowadzić pełną księgowość?',
    a: 'Pełne księgi rachunkowe prowadzą m.in. spółki z o.o., spółki akcyjne i spółki komandytowe. Osoby fizyczne prowadzące działalność oraz spółki cywilne i jawne osób fizycznych mają taki obowiązek także wtedy, gdy przychody za poprzedni rok obrotowy, ustalone zgodnie z ustawą o rachunkowości, wyniosły co najmniej równowartość 2,5 mln euro. Na bezpłatnej konsultacji sprawdzimy, czy obowiązek dotyczy Twojej firmy.',
  },
  {
    q: 'Ile kosztuje pełna księgowość spółki z o.o. w Krakowie?',
    a: 'Cenę ustalamy indywidualnie po bezpłatnej konsultacji. Zależy od liczby i rodzaju dokumentów, zakresu prac księgowych i sprawozdawczych, potrzebnego wsparcia doradczego oraz specyfiki i struktury spółki. Wycenę dostajesz przed podpisaniem umowy.',
  },
  {
    q: 'Czy mogę zmienić biuro rachunkowe w trakcie roku?',
    a: 'Tak. Przejmujemy dokumentację od poprzedniego biura i zajmujemy się migracją danych, a Ty dostajesz dedykowaną księgową od pierwszego miesiąca współpracy. Umowę można podpisać elektronicznie albo tradycyjnie, kurierem na nasz koszt.',
  },
  {
    q: 'Czy przygotujecie sprawozdanie finansowe i rozliczenie CIT?',
    a: 'Tak. Sporządzamy bilans, rachunek zysków i strat oraz sprawozdanie finansowe, rozliczamy CIT, VAT i JPK, a także przygotowujemy sprawozdania statystyczne GUS. Współpracujemy też z doradcą podatkowym przy bardziej złożonych zagadnieniach.',
  },
  {
    q: 'Czy obsługujecie spółki z kapitałem zagranicznym?',
    a: 'Tak. Nasz zespół pracował w międzynarodowych korporacjach, w tym 13 lat w IBM, i zna zarówno polską ustawę o rachunkowości, jak i US GAAP. Pomagamy spółkom, które raportują do zagranicznej centrali, i obsługujemy klientów w języku angielskim.',
  },
  {
    q: 'Jak przekazuje się dokumenty do księgowości?',
    a: 'W pełni online, przez system wFirma. Dodajesz faktury i pozostałe dokumenty w formie PDF lub skanów, a my mamy do nich natychmiastowy dostęp. System jest zintegrowany z KSeF, a dokumenty są bezpiecznie archiwizowane.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: 'Pełna księgowość dla firm',
      serviceType: 'Pełna księgowość',
      description: 'Prowadzenie ksiąg rachunkowych, rozliczenia CIT, VAT i JPK, sprawozdania finansowe dla spółek z o.o. i firm w Krakowie.',
      provider: { '@id': 'https://www.montebiuro.pl/#organization' },
      areaServed: [{ '@type': 'City', name: 'Kraków' }, { '@type': 'Country', name: 'Polska' }],
      url: URL,
    },
    {
      '@type': 'FAQPage',
      '@id': `${URL}#faq`,
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://www.montebiuro.pl/' },
        { '@type': 'ListItem', position: 2, name: 'Pełna księgowość', item: URL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className="service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="section page-hero">
        <div className="container">
          <nav aria-label="Ścieżka" className="breadcrumbs">
            <Link href="/">Strona główna</Link> › <span>Pełna księgowość</span>
          </nav>
          <h1>Pełna księgowość dla spółek i firm w Krakowie</h1>
          <p className="section-subtitle">
            Prowadzimy pełne księgi rachunkowe spółek z o.o. i innych firm, które muszą lub chcą je prowadzić. Rozliczamy CIT, VAT i JPK,
            przygotowujemy sprawozdania finansowe i dajemy zarządowi czytelne raporty. Pracujesz z jedną, dedykowaną księgową, bez infolinii
            i automatycznych odpowiedzi.
          </p>
          <a href="#kontakt" className="btn btn-primary">Bezpłatna konsultacja</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Dla kogo jest nasza pełna księgowość</h2>
          <p>
            Najczęściej obsługujemy spółki z ograniczoną odpowiedzialnością: od nowo założonych spółek właścicieli, którzy dotąd prowadzili
            JDG, po spółki z kapitałem zagranicznym, które raportują do centrali za granicą. Pomagamy też firmom, które przekroczyły limit
            przychodów i muszą przejść z KPiR na pełne księgi.
          </p>
          <p>
            Biuro mieści się w Krakowie przy ul. Myśliwskiej 8, ale dzięki księgowości online obsługujemy spółki z całej Polski. Spotkać możemy
            się w biurze albo zdalnie.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Co obejmuje usługa</h2>
          <ul className="service-scope">
            <li><strong>Księgi rachunkowe zgodnie z ustawą o rachunkowości.</strong> Bieżące księgowanie, nadzór nad poprawnością zapisów i terminowe zamknięcia miesięcy.</li>
            <li><strong>Polityka rachunkowości i plan kont.</strong> Przygotowujemy je na start albo porządkujemy dokumentację po poprzednim biurze.</li>
            <li><strong>CIT, VAT i JPK.</strong> Ewidencje VAT, pliki JPK, deklaracje i zaliczki na CIT oraz informacja, ile i kiedy zapłacić.</li>
            <li><strong>Sprawozdanie finansowe.</strong> Bilans, rachunek zysków i strat oraz pozostałe elementy sprawozdania rocznego.</li>
            <li><strong>Raporty dla zarządu i właścicieli.</strong> Czytelne zestawienia wyników, które pomagają podejmować decyzje, a nie tylko spełniać obowiązki.</li>
            <li><strong>Kontrole, audyty i urzędy.</strong> Przygotowujemy wyjaśnienia, współpracujemy z biegłymi rewidentami i reprezentujemy spółkę przed US i ZUS.</li>
            <li><strong>Sprawozdania GUS.</strong> Wypełniamy obowiązkowe sprawozdania statystyczne.</li>
            <li><strong>Kadry i płace.</strong> Jeśli spółka zatrudnia pracowników, prowadzimy też listy płac, akta osobowe i rozliczenia ZUS.</li>
          </ul>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Ile kosztuje pełna księgowość</h2>
          <p>
            Każda spółka jest inna, dlatego cenę ustalamy indywidualnie, po bezpłatnej konsultacji. Wycenę dostajesz przed podpisaniem umowy. Na cenę wpływają przede wszystkim:
          </p>
          <ul>
            <li>liczba i rodzaj dokumentów księgowych w miesiącu,</li>
            <li>zakres prac księgowych i sprawozdawczych,</li>
            <li>potrzebny poziom bieżącego wsparcia doradczego,</li>
            <li>specyfika działalności i struktura spółki, np. transakcje zagraniczne albo raportowanie do centrali.</li>
          </ul>
          <a href="#kontakt" className="btn btn-primary">Zapytaj o wycenę</a>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">Jak przejmujemy księgowość spółki</h2>
          <ol className="service-process-steps">
            <li><strong>Bezpłatna konsultacja.</strong> Poznajemy spółkę, jej dokumenty i potrzeby zarządu. Ustalamy zakres i przygotowujemy wycenę.</li>
            <li><strong>Umowa i konfiguracja systemu.</strong> Podpisujesz umowę elektronicznie lub kurierem, a my zakładamy konto w systemie i ustawiamy obieg dokumentów.</li>
            <li><strong>Przejęcie ksiąg.</strong> Odbieramy dokumentację od poprzedniego biura, sprawdzamy bilans otwarcia i plan kont. Zmiana jest możliwa także w trakcie roku.</li>
            <li><strong>Bieżąca obsługa.</strong> Masz stałą księgową, comiesięczne informacje o podatkach do zapłaty i raporty dla zarządu.</li>
          </ol>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <h2 className="section-title">Kto prowadzi księgi Twojej spółki</h2>
          <p>
            <strong>Monika Kołakowska</strong>, partner zarządzający, od ponad 16 lat prowadzi pełne księgi rachunkowe i nadzoruje procesy finansowe
            firm. Pracuje według polskiej ustawy o rachunkowości i US GAAP. Ma certyfikat Dyrektora Finansowego Krajowej Izby Księgowych.
          </p>
          <p>
            <strong>Teresa Kućmierczyk</strong>, partner zarządzający, ma ponad 25 lat doświadczenia, w tym 13 lat jako Główna Księgowa w IBM.
            Posiada Certyfikat Księgowy Ministra Finansów nr 36393/2020.
          </p>
          <p>
            Biuro ma ubezpieczenie OC i należy do Stowarzyszenia Księgowych w Polsce. Przy złożonych zagadnieniach podatkowych współpracujemy z
            doradcą podatkowym.
          </p>
          <p>
            <Link href="/#o-nas">Poznaj cały zespół</Link>
          </p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Pytania o pełną księgowość</h2>
          <div className="faq-list">
            {faq.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-answer"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Przydatne artykuły dla spółek</h2>
          <ul>
            <li><Link href="/blog/jak-dokapitalizowac-spolke-z-oo/">Jak dokapitalizować spółkę z o.o.? Kapitał zakładowy, pożyczka czy dopłaty</Link></li>
            <li><Link href="/blog/obowiazkowy-ksef-kogo-dotyczy/">Obowiązkowy KSeF – kogo dotyczy i jakie są wyjątki</Link></li>
            <li><Link href="/blog/limity-platnosci-gotowkowych-b2b/">Limity płatności gotówkowych B2B – na co uważać</Link></li>
            <li><Link href="/blog/fundacja-rodzinna-czym-jest-i-jak-dziala/">Fundacja rodzinna – czym jest i jak działa</Link></li>
          </ul>
        </div>
      </section>

      {/* id="kontakt" musi zostać, bo prowadzą do niego przyciski na tej stronie */}
      <Contact component="service_pelna" />
    </div>
  );
}
