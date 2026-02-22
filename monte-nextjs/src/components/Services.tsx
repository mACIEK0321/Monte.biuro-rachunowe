'use client';

import { useState, useRef } from 'react';

interface ServiceItem {
  title: string;
  description: string;
  items: Array<{ icon: string; text: string }>;
  detailLead: string;
  detailTitle: string;
  detailItems: Array<{ icon: string; text: string }>;
  svgPath: string;
}

const services: ServiceItem[] = [
  {
    title: 'Start i obsĹ‚uga firmy',
    description: 'Wspieramy przedsiÄ™biorcĂłw na kaĹĽdym etapie: od rejestracji firmy po codziennÄ… obsĹ‚ugÄ™ formalnÄ… i podatkowÄ…. Zapewniamy praktyczne doradztwo oraz sprawny start dziaĹ‚alnoĹ›ci.',
    items: [
      { icon: 'invoice', text: 'ZakĹ‚adanie dziaĹ‚alnoĹ›ci i spĂłĹ‚ek' },
      { icon: 'calculator', text: 'WybĂłr optymalnej formy opodatkowania' },
      { icon: 'people', text: 'StaĹ‚e wsparcie formalne i organizacyjne' },
    ],
    detailLead: 'Zapewniamy uporzÄ…dkowany proces rozpoczÄ™cia dziaĹ‚alnoĹ›ci oraz bieĹĽÄ…ce wsparcie w obowiÄ…zkach administracyjnych. Pomagamy podejmowaÄ‡ decyzje podatkowe z uwzglÄ™dnieniem specyfiki branĹĽy, planĂłw rozwoju i bezpieczeĹ„stwa rozliczeĹ„.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'invoice', text: 'Rejestracja dziaĹ‚alnoĹ›ci i spĂłĹ‚ek w odpowiednich rejestrach' },
      { icon: 'calculator', text: 'Analiza i rekomendacja modelu opodatkowania' },
      { icon: 'people', text: 'Przygotowanie dokumentĂłw i zgĹ‚oszeĹ„' },
      { icon: 'people', text: 'Konsultacje w trakcie prowadzenia dziaĹ‚alnoĹ›ci' },
    ],
    svgPath: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
  },
  {
    title: 'Nowoczesna ksiÄ™gowoĹ›Ä‡ online',
    description: 'Korzystamy z zaawansowanego systemu ksiÄ™gowego, ktĂłry umoĹĽliwia wygodnÄ… wspĂłĹ‚pracÄ™ z biurem rachunkowym, automatyzuje procesy i zapewnia staĹ‚y dostÄ™p do danych finansowych firmy.',
    items: [
      { icon: 'invoice', text: 'DostÄ™p do systemu ksiÄ™gowego online' },
      { icon: 'invoice', text: 'Elektroniczny obieg dokumentĂłw' },
      { icon: 'zus', text: 'Integracja z KSeF i instytucjami publicznymi' },
      { icon: 'cash', text: 'Automatyzacja rozliczeĹ„ i raportĂłw' },
    ],
    detailLead: 'System wspiera codziennÄ… wspĂłĹ‚pracÄ™ z klientem, porzÄ…dkuje dokumenty oraz umoĹĽliwia bieĹĽÄ…cÄ… kontrolÄ™ podatkĂłw, zobowiÄ…zaĹ„ i wynikĂłw finansowych w jednym miejscu.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'invoice', text: 'Prowadzenie ksiÄ™gowoĹ›ci w zintegrowanym systemie' },
      { icon: 'invoice', text: 'ObsĹ‚uga faktur w KSeF' },
      { icon: 'invoice', text: 'Bezpieczne przesyĹ‚anie i archiwizacja dokumentĂłw' },
      { icon: 'zus', text: 'PodglÄ…d rozliczeĹ„, podatkĂłw i zobowiÄ…zaĹ„' },
      { icon: 'cash', text: 'Automatyczne przypomnienia o terminach' },
      { icon: 'people', text: 'DostÄ™p do raportĂłw i danych finansowych online' },
    ],
    svgPath: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  },
  {
    title: 'KsiÄ™gowoĹ›Ä‡ uproszczona',
    description: 'KsiÄ™gowoĹ›Ä‡ dla JDG i maĹ‚ych firm, ktĂłra zapewnia peĹ‚nÄ… kontrolÄ™ nad rozliczeniami, terminowoĹ›Ä‡ oraz jasne informacje o podatkach i kosztach prowadzenia dziaĹ‚alnoĹ›ci.',
    items: [
      { icon: 'book', text: 'Rozliczenia dopasowane do formy opodatkowania' },
      { icon: 'calculator', text: 'StaĹ‚a kontrola podatkĂłw i zobowiÄ…zaĹ„' },
      { icon: 'book', text: 'Wsparcie w bieĹĽÄ…cych decyzjach biznesowych' },
      { icon: 'cash', text: 'Przejrzyste informacje o finansach firmy' },
    ],
    detailLead: 'Dbamy o to, aby rozliczenia byĹ‚y proste i zrozumiaĹ‚e, a przedsiÄ™biorca miaĹ‚ pewnoĹ›Ä‡, ĹĽe wszystkie obowiÄ…zki sÄ… realizowane na czas i zgodnie z przepisami.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie KPIR lub ewidencji ryczaĹ‚tu' },
      { icon: 'calculator', text: 'Rozliczenia podatkowe i przygotowanie deklaracji' },
      { icon: 'book', text: 'Ewidencja Ĺ›rodkĂłw trwaĹ‚ych i wyposaĹĽenia' },
      { icon: 'cash', text: 'Rozliczanie kosztĂłw dziaĹ‚alnoĹ›ci' },
      { icon: 'invoice', text: 'Informacje o podatkach do zapĹ‚aty i terminach' },
      { icon: 'people', text: 'BieĹĽÄ…ce wsparcie w sprawach ksiÄ™gowych' },
    ],
    svgPath: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  },
  {
    title: 'PeĹ‚na ksiÄ™gowoĹ›Ä‡',
    description: 'Kompleksowa obsĹ‚uga finansowo-ksiÄ™gowa spĂłĹ‚ek oraz podmiotĂłw prowadzÄ…cych peĹ‚ne ksiÄ™gi rachunkowe, zapewniajÄ…ca zgodnoĹ›Ä‡ z przepisami i rzetelnÄ… informacjÄ™ zarzÄ…dczÄ….',
    items: [
      { icon: 'book', text: 'Prowadzenie peĹ‚nych ksiÄ…g rachunkowych' },
      { icon: 'calculator', text: 'Raportowanie finansowe i zarzÄ…dcze' },
      { icon: 'book', text: 'ZgodnoĹ›Ä‡ z przepisami i standardami' },
      { icon: 'invoice', text: 'Wsparcie zarzÄ…du w obszarze finansĂłw' },
    ],
    detailLead: 'Zapewniamy rzetelne prowadzenie ksiÄ…g oraz terminowe raportowanie, dostarczajÄ…c zarzÄ…dom i wĹ‚aĹ›cicielom przejrzyste informacje o sytuacji finansowej i wynikach dziaĹ‚alnoĹ›ci.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie ksiÄ…g rachunkowych zgodnie z ustawÄ… o rachunkowoĹ›ci' },
      { icon: 'calculator', text: 'SporzÄ…dzanie bilansu, rachunku zyskĂłw i strat oraz sprawozdaĹ„ finansowych' },
      { icon: 'book', text: 'Przygotowanie polityki rachunkowoĹ›ci i planu kont' },
      { icon: 'invoice', text: 'Raporty finansowe na potrzeby zarzÄ…du i wĹ‚aĹ›cicieli' },
      { icon: 'shield', text: 'NadzĂłr nad poprawnoĹ›ciÄ… ksiÄ™gowaĹ„ i zamkniÄ™Ä‡ okresĂłw' },
      { icon: 'people', text: 'Wsparcie w kontaktach z audytorami i instytucjami' },
    ],
    svgPath: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
  {
    title: 'Podatki i deklaracje',
    description: 'Kompleksowa obsĹ‚uga rozliczeĹ„ podatkowych i ZUS z bieĹĽÄ…cÄ… kontrolÄ… zobowiÄ…zaĹ„ oraz terminĂłw pĹ‚atnoĹ›ci.',
    items: [
      { icon: 'invoice', text: 'Ewidencja VAT sprzedaĹĽy i zakupĂłw' },
      { icon: 'invoice', text: 'Deklaracje VAT i rozliczenia podatkowe' },
      { icon: 'cash', text: 'Informacja o podatkach do zapĹ‚aty' },
      { icon: 'invoice', text: 'Przygotowanie przelewĂłw do urzÄ™dĂłw' },
    ],
    detailLead: 'Zapewniamy terminowe przygotowanie deklaracji oraz peĹ‚nÄ… kontrolÄ™ nad zobowiÄ…zaniami podatkowymi, dziÄ™ki czemu klient zawsze wie, jakie podatki i kiedy naleĹĽy opĹ‚aciÄ‡.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'invoice', text: 'Prowadzenie ewidencji VAT zgodnie z przepisami' },
      { icon: 'invoice', text: 'SporzÄ…dzanie i skĹ‚adanie deklaracji VAT oraz informacji podsumowujÄ…cych' },
      { icon: 'cash', text: 'Przygotowanie zestawienia podatkĂłw i skĹ‚adek do zapĹ‚aty' },
      { icon: 'zus', text: 'ObsĹ‚uga rozliczeĹ„ ZUS przedsiÄ™biorcy' },
      { icon: 'invoice', text: 'Roczne rozliczenia podatkowe przedsiÄ™biorcĂłw i osĂłb fizycznych' },
      { icon: 'cash', text: 'Wsparcie w bieĹĽÄ…cych rozliczeniach i wyjaĹ›nieniach podatkowych' },
    ],
    svgPath: 'm9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
  },
  {
    title: 'Kadry, pĹ‚ace i BHP',
    description: 'Kompleksowa obsĹ‚uga pracownikĂłw i obowiÄ…zkĂłw pracodawcy â€” od zatrudnienia po bieĹĽÄ…ce rozliczenia i dokumentacjÄ™.',
    items: [
      { icon: 'people', text: 'ObsĹ‚uga zatrudnienia i dokumentacji pracowniczej' },
      { icon: 'zus', text: 'Naliczanie wynagrodzeĹ„ i rozliczenia ZUS' },
      { icon: 'shield', text: 'Wsparcie w obowiÄ…zkach pracodawcy' },
      { icon: 'people', text: 'Kontrola terminĂłw badaĹ„ i szkoleĹ„' },
    ],
    detailLead: 'Zapewniamy sprawnÄ… i zgodnÄ… z przepisami obsĹ‚ugÄ™ kadrowo-pĹ‚acowÄ…, dziÄ™ki czemu pracodawca ma pewnoĹ›Ä‡, ĹĽe wszystkie obowiÄ…zki wobec pracownikĂłw i instytucji sÄ… realizowane prawidĹ‚owo i na czas.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'people', text: 'Prowadzenie akt osobowych pracownikĂłw' },
      { icon: 'cash', text: 'SporzÄ…dzanie list pĹ‚ac i rozliczeĹ„ wynagrodzeĹ„' },
      { icon: 'zus', text: 'ZgĹ‚oszenia i deklaracje do ZUS' },
      { icon: 'invoice', text: 'Przygotowanie dokumentĂłw zwiÄ…zanych z zatrudnieniem' },
      { icon: 'shield', text: 'Informowanie o terminach badaĹ„ lekarskich i szkoleĹ„ BHP' },
      { icon: 'people', text: 'Wsparcie w bieĹĽÄ…cych sprawach kadrowych i pracowniczych' },
    ],
    svgPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
  },
  {
    title: 'Doradztwo i usĹ‚ugi specjalistyczne',
    description: 'Wsparcie wĹ‚aĹ›cicieli i zarzÄ…dĂłw w podejmowaniu decyzji finansowych, planowaniu rozwoju oraz porzÄ…dkowaniu procesĂłw w firmie.',
    items: [
      { icon: 'calculator', text: 'Doradztwo finansowe dla wĹ‚aĹ›cicieli i zarzÄ…dĂłw' },
      { icon: 'invoice', text: 'Analizy i raporty wspierajÄ…ce decyzje biznesowe' },
      { icon: 'cash', text: 'Planowanie podatkowe i strukturalne' },
      { icon: 'people', text: 'Wsparcie w rozwoju i zmianach w firmie' },
    ],
    detailLead: 'Pomagamy spojrzeÄ‡ na finanse firmy szerzej niĹĽ tylko przez pryzmat rozliczeĹ„ â€” dostarczamy analizy, rekomendacje i praktyczne rozwiÄ…zania wspierajÄ…ce stabilny rozwĂłj biznesu.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'calculator', text: 'Analizy finansowe i interpretacja wynikĂłw' },
      { icon: 'invoice', text: 'Wsparcie w planowaniu podatkowym i optymalizacji' },
      { icon: 'cash', text: 'Przygotowanie danych i raportĂłw dla bankĂłw lub inwestorĂłw' },
      { icon: 'people', text: 'Doradztwo przy zmianach struktury dziaĹ‚alnoĹ›ci' },
      { icon: 'book', text: 'Konsultacje finansowe dla zarzÄ…du i wĹ‚aĹ›cicieli' },
      { icon: 'book', text: 'UporzÄ…dkowanie procesĂłw finansowych i raportowych' },
    ],
    svgPath: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
  {
    title: 'SprawozdawczoĹ›Ä‡, audyty i kontrole',
    description: 'Wsparcie w raportowaniu oraz bezpieczna reprezentacja firmy w kontaktach z instytucjami i podczas kontroli.',
    items: [
      { icon: 'invoice', text: 'Przygotowanie wymaganych sprawozdaĹ„ i raportĂłw' },
      { icon: 'shield', text: 'Wsparcie w trakcie kontroli i audytĂłw' },
      { icon: 'people', text: 'Reprezentacja w kontaktach z instytucjami' },
      { icon: 'book', text: 'PorzÄ…dkowanie dokumentacji i danych' },
    ],
    detailLead: 'Zapewniamy klientom spokĂłj i bezpieczeĹ„stwo w relacjach z urzÄ™dami oraz instytucjami, przygotowujÄ…c niezbÄ™dne dokumenty i wspierajÄ…c na kaĹĽdym etapie kontroli lub audytu.',
    detailTitle: 'Zakres usĹ‚ug',
    detailItems: [
      { icon: 'invoice', text: 'SporzÄ…dzanie sprawozdaĹ„ finansowych i raportĂłw wymaganych przepisami' },
      { icon: 'invoice', text: 'Przygotowanie sprawozdaĹ„ statystycznych GUS' },
      { icon: 'shield', text: 'Wsparcie w trakcie kontroli podatkowych i ZUS' },
      { icon: 'people', text: 'Przygotowanie dokumentĂłw i wyjaĹ›nieĹ„ dla instytucji' },
      { icon: 'book', text: 'WspĂłĹ‚praca z audytorami i biegĹ‚ymi rewidentami' },
      { icon: 'people', text: 'Reprezentacja i wsparcie w bieĹĽÄ…cych kontaktach z urzÄ™dami' },
    ],
    svgPath: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75',
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleCard = (index: number) => {
    const isExpanding = expandedIndex !== index;
    setExpandedIndex(isExpanding ? index : null);

    if (isExpanding) {
      setTimeout(() => {
        document.getElementById(`service-card-${index}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
    }
  };

  return (
    <section className="section" id="uslugi">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Nasze usĹ‚ugi</div>
          <h2 className="section-title">UsĹ‚ugi ksiÄ™gowe i kadrowe</h2>
          <p className="section-subtitle">
            UsĹ‚ugi ksiÄ™gowe, rozliczenia ZUS, kadry i BHP â€“ biuro rachunkowe
            online w jednym miejscu
          </p>
        </div>
        <div className="carousel-wrapper">
          <div className="services-grid" ref={scrollRef}>
            {services.map((service, index) => (
              <article
                key={index}
                id={`service-card-${index}`}
                className={`service-card fade-in-scroll ${expandedIndex === index ? 'is-expanded' : ''}`}
                data-service-card=""
              >
                <div className="minimal-icon" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={service.svgPath}
                    />
                  </svg>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item, i) => (
                    <li key={i} data-icon={item.icon}>
                      {item.text}
                    </li>
                  ))}
                </ul>

                {/* Grid-template-rows: 0frâ†’1fr â€” animacja bez layout shift */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: expandedIndex === index ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                    willChange: expandedIndex === index ? 'grid-template-rows' : 'auto',
                  }}
                >
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div className="service-card-details">
                      <p className="service-card-lead">{service.detailLead}</p>
                      <h4>{service.detailTitle}</h4>
                      <ul>
                        {service.detailItems.map((item, i) => (
                          <li key={i} data-icon={item.icon}>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary service-details-toggle"
                  aria-expanded={expandedIndex === index}
                  onClick={() => toggleCard(index)}
                >
                  {expandedIndex === index ? 'ZwiĹ„' : 'SzczegĂłĹ‚y'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
