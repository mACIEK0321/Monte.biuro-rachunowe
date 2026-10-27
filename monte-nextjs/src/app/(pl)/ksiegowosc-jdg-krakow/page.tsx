import type { Metadata } from 'next';
import Link from 'next/link';
import Contact from '@/components/Contact';
import { jsonLd as serializeJsonLd } from '@/lib/seo';

const URL = 'https://www.montebiuro.pl/ksiegowosc-jdg-krakow/';

export const metadata: Metadata = {
  title: { absolute: 'Księgowość JDG Kraków – KPiR i ryczałt od 299 zł | MonTe' },
  description:
    'Księgowość dla jednoosobowej działalności w Krakowie: KPiR, ryczałt, ZUS, VAT i KSeF. Pakiety od 299 zł netto, dedykowana księgowa, darmowe założenie firmy.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image', title: 'Księgowość JDG Kraków | MonTe', images: ['https://www.montebiuro.pl/og-image.jpg'] },
  openGraph: {
    url: URL,
    title: 'Księgowość JDG w Krakowie od 299 zł netto | MonTe',
    description: 'KPiR lub ryczałt, ZUS, deklaracje i przypomnienia o terminach. Dedykowana księgowa i księgowość online.',
    locale: 'pl_PL',
    type: 'website',
    images: [{url: 'https://www.montebiuro.pl/og-image.jpg', alt: 'MonTe Biuro Rachunkowe'}],
  },
};

const faq = [
  {
    q: 'Ile kosztuje księgowość jednoosobowej działalności?',
    a: 'Pakiet Start kosztuje 299 zł netto miesięcznie i obejmuje do 5 zapisów księgowych. Pakiet Business to 599 zł netto miesięcznie do 30 dokumentów. Rozliczenia ZUS są wliczone w cenę. Przy większej liczbie dokumentów przygotujemy wycenę indywidualną.',
  },
  {
    q: 'Czym różni się pakiet Start od Business?',
    a: 'Oba pakiety obejmują dedykowaną księgową, KPiR lub ryczałt, rozliczenia podatków i ZUS, deklaracje oraz księgowość online. Business dodaje bieżące konsultacje księgowe, roczne rozliczenie PIT, wsparcie w kontaktach z urzędami, priorytetową obsługę i pełny dostęp do systemu z fakturowaniem, KSeF i CRM.',
  },
  {
    q: 'KPiR czy ryczałt – co wybrać?',
    a: 'KPiR to sposób ewidencji przychodów i kosztów przy skali podatkowej lub podatku liniowym. Przy ryczałcie podatek zależy od przychodu, bez odliczania kosztów. Wybór zależy od branży i sytuacji firmy. Na bezpłatnej konsultacji porównamy dostępne możliwości. Wybór podatku liniowego lub ryczałtu zgłasza się co do zasady do 20. dnia miesiąca po miesiącu uzyskania pierwszego przychodu w roku; jeśli pierwszy przychód przypada w grudniu, termin upływa z końcem roku.',
  },
  {
    q: 'Czy pomożecie założyć działalność gospodarczą?',
    a: 'Tak, a dla nowych klientów jest to bezpłatne. Przygotujemy zgłoszenia do urzędu skarbowego i ZUS oraz pomożemy wybrać formę opodatkowania jeszcze przed rejestracją firmy.',
  },
  {
    q: 'Czy przypominacie o terminach płatności podatków i ZUS?',
    a: 'Tak. Po zamknięciu miesiąca dostajesz od nas e-mail lub SMS z kwotami i terminami płatności. Dane do przelewów są też dostępne w systemie wFirma.',
  },
  {
    q: 'Czy mogę przenieść księgowość od innego biura?',
    a: 'Tak. Przejmujemy dokumenty od poprzedniego biura i zajmujemy się migracją danych. Umowę można podpisać elektronicznie przez profil zaufany lub e-podpis albo tradycyjnie, kurierem na nasz koszt.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: 'Księgowość dla jednoosobowej działalności gospodarczej',
      serviceType: 'Księgowość uproszczona (KPiR, ryczałt)',
      description: 'Prowadzenie KPiR lub ewidencji ryczałtu, rozliczenia podatków i ZUS, deklaracje i księgowość online dla JDG w Krakowie.',
      provider: { '@id': 'https://www.montebiuro.pl/#organization' },
      areaServed: [{ '@type': 'City', name: 'Kraków' }, { '@type': 'Country', name: 'Polska' }],
      url: URL,
      offers: [
        { '@type': 'Offer', name: 'Pakiet Start', price: '299', priceCurrency: 'PLN', description: 'Do 5 zapisów księgowych miesięcznie, cena netto' },
        { '@type': 'Offer', name: 'Pakiet Business', price: '599', priceCurrency: 'PLN', description: 'Do 30 dokumentów miesięcznie, cena netto' },
      ],
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
        { '@type': 'ListItem', position: 2, name: 'Księgowość JDG', item: URL },
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
            <Link href="/">Strona główna</Link> › <span>Księgowość JDG</span>
          </nav>
          <h1>Księgowość dla jednoosobowej działalności w Krakowie</h1>
          <p className="section-subtitle">
            Prowadzimy KPiR lub ewidencję ryczałtu, rozliczamy podatki i ZUS, a po każdym miesiącu wysyłamy Ci kwoty i terminy płatności. Masz
            jedną, dedykowaną księgową i wszystkie dokumenty online. Pakiety od 299 zł netto miesięcznie, ZUS w cenie.
          </p>
          <a href="#kontakt" className="btn btn-primary">Bezpłatna konsultacja</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Dla kogo jest ta usługa</h2>
          <p>
            Dla osób, które prowadzą jednoosobową działalność gospodarczą albo dopiero ją zakładają: freelancerów, specjalistów IT na B2B,
            konsultantów, rzemieślników i małych firm usługowych. Obsługujemy zarówno ryczałt, jak i KPiR na skali podatkowej lub podatku
            liniowym.
          </p>
          <p>
            Biuro mieści się w Krakowie przy ul. Myśliwskiej 8, ale dokumenty przekazujesz online, więc nie musisz przyjeżdżać do biura. Pomagamy
            też cudzoziemcom prowadzącym firmę w Polsce, także po angielsku.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Co obejmuje usługa</h2>
          <ul className="service-scope">
            <li><strong>KPiR lub ewidencja ryczałtu.</strong> Księgujemy przychody i koszty zgodnie z wybraną formą opodatkowania.</li>
            <li><strong>Podatki i deklaracje.</strong> Wyliczamy zaliczki na PIT, rozliczamy VAT, przygotowujemy i wysyłamy deklaracje oraz pliki JPK.</li>
            <li><strong>ZUS w cenie.</strong> Rozliczamy Twoje składki i przygotowujemy dokumenty do ZUS.</li>
            <li><strong>Środki trwałe i wyposażenie.</strong> Prowadzimy ewidencję i amortyzację sprzętu, samochodu czy wyposażenia biura.</li>
            <li><strong>Przypomnienia o terminach.</strong> Po zamknięciu miesiąca dostajesz e-mail lub SMS z kwotami podatków i składek do zapłaty.</li>
            <li><strong>Księgowość online i KSeF.</strong> Faktury i dokumenty dodajesz w systemie wFirma, zintegrowanym z KSeF.</li>
            <li><strong>Reprezentacja przed urzędami.</strong> Kontaktujemy się w Twoim imieniu z urzędem skarbowym i ZUS.</li>
            <li><strong>Bieżące wsparcie.</strong> Pytasz księgową mailowo lub telefonicznie, zanim podejmiesz decyzję, a nie po fakcie.</li>
          </ul>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Cennik księgowości JDG</h2>
          <p>
            <strong>Start – 299 zł netto miesięcznie</strong>, do 5 zapisów księgowych. Dedykowana księgowa, KPiR lub ryczałt, rozliczenia podatków
            i ZUS, deklaracje, reprezentacja przed urzędami, księgowość online i bezpłatne założenie działalności.
          </p>
          <p>
            <strong>Business – 599 zł netto miesięcznie</strong>, do 30 dokumentów. Wszystko z pakietu Start oraz bieżące konsultacje księgowe,
            roczne rozliczenie PIT, wsparcie w kontaktach z urzędami, priorytetowa obsługa i pełny dostęp do systemu (fakturowanie, KSeF, CRM,
            obieg dokumentów).
          </p>
          <p>Masz więcej dokumentów albo zatrudniasz pracowników? Przygotujemy wycenę indywidualną.</p>
          <Link href="/#cennik" className="btn btn-primary">Porównaj pakiety</Link>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">Jak zacząć współpracę</h2>
          <ol className="service-process-steps">
            <li><strong>Bezpłatna konsultacja.</strong> Rozmawiamy o Twojej działalności i dobieramy pakiet oraz formę opodatkowania.</li>
            <li><strong>Umowa i konto w systemie.</strong> Podpisujesz umowę elektronicznie lub kurierem, a my zakładamy konto i ustawiamy obieg dokumentów.</li>
            <li><strong>Przeniesienie dokumentów.</strong> Jeśli zmieniasz biuro, przejmujemy dokumentację od poprzedniej księgowej. Zakładasz firmę? Przygotujemy zgłoszenia do US i ZUS.</li>
            <li><strong>Bieżąca obsługa.</strong> Dodajesz dokumenty online, a co miesiąc dostajesz informację, ile i do kiedy zapłacić.</li>
          </ol>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <h2 className="section-title">Kto prowadzi Twoją księgowość</h2>
          <p>
            Biurem kierują <strong>Monika Kołakowska</strong> (ponad 16 lat w finansach i rachunkowości, certyfikat Dyrektora Finansowego Krajowej
            Izby Księgowych) i <strong>Teresa Kućmierczyk</strong> (ponad 25 lat doświadczenia, w tym 13 lat jako Główna Księgowa w IBM, Certyfikat
            Księgowy Ministra Finansów nr 36393/2020).
          </p>
          <p>
            Biuro ma ubezpieczenie OC i należy do Stowarzyszenia Księgowych w Polsce. Doświadczenie z dużych firm przekładamy na prostą,
            terminową obsługę małych działalności. <Link href="/#o-nas">Poznaj zespół</Link>
          </p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Pytania o księgowość JDG</h2>
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
          <h2 className="section-title">Przydatne artykuły dla przedsiębiorców</h2>
          <ul>
            <li><Link href="/blog/jak-zalozyc-dzialalnosc-gospodarcza/">Jak założyć działalność gospodarczą krok po kroku</Link></li>
            <li><Link href="/blog/co-mozna-kupic-przed-zalozeniem-firmy/">Co można kupić przed założeniem firmy i wrzucić w koszty?</Link></li>
            <li><Link href="/blog/wybor-formy-opodatkowania/">Wybór formy opodatkowania działalności gospodarczej</Link></li>
            <li><Link href="/blog/dzialalnosc-nierejestrowana/">Działalność nierejestrowana – jak legalnie dorabiać bez firmy</Link></li>
          </ul>
        </div>
      </section>

      {/* id="kontakt" musi zostać, bo prowadzą do niego przyciski na tej stronie */}
      <Contact component="service_jdg" />
    </div>
  );
}
