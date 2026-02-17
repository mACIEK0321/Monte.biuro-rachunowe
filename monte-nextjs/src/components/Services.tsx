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
    title: 'Start i obsługa firmy',
    description: 'Kompleksowe wsparcie od pierwszego dnia działalności.',
    items: [
      { icon: 'invoice', text: 'Zakładanie działalności i spółek' },
      { icon: 'calculator', text: 'Dobór formy opodatkowania' },
      { icon: 'people', text: 'Bieżące wsparcie formalne' },
    ],
    detailLead: 'Pomagamy bezpiecznie rozpocząć i prowadzić działalność gospodarczą – od rejestracji firmy po bieżącą obsługę formalną. Doradzamy w wyborze optymalnej formy opodatkowania, uwzględniając aspekty gospodarcze i fiskalne.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Zakładanie działalności gospodarczej i spółek' },
      { icon: 'calculator', text: 'Dobór najkorzystniejszej formy opodatkowania' },
      { icon: 'people', text: 'Bieżące wsparcie formalne przedsiębiorcy' },
    ],
    svgPath: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
  },
  {
    title: 'Nowoczesna księgowość online',
    description: 'Biuro rachunkowe online – pełna kontrola finansów, rozliczenia ZUS i podatki z każdego miejsca.',
    items: [
      { icon: 'invoice', text: 'Wirtualny sejf na dokumenty' },
      { icon: 'invoice', text: 'Aplikacja webowa i mobilna' },
      { icon: 'zus', text: 'Podgląd podatków i ZUS' },
      { icon: 'cash', text: 'Przypomnienia o terminach' },
    ],
    detailLead: 'Zapewniamy dostęp do nowoczesnych narzędzi online, które usprawniają komunikację i obieg dokumentów oraz dają pełną przejrzystość finansową.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Wirtualny sejf na dokumenty księgowe' },
      { icon: 'invoice', text: 'Przesyłanie dokumentów przez aplikację webową i mobilną' },
      { icon: 'zus', text: 'Stały podgląd podatków i składek ZUS do zapłaty' },
      { icon: 'cash', text: 'Automatyczne przypomnienia o terminach płatności' },
      { icon: 'people', text: 'Kontakt z księgowym online lub telefonicznie' },
    ],
    svgPath: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  },
  {
    title: 'Księgowość uproszczona',
    description: 'Księgowość JDG dla małych firm – KPiR, ryczałt, Karta Podatkowa. Usługi księgowe online.',
    items: [
      { icon: 'book', text: 'KPiR i ewidencja ryczałtu' },
      { icon: 'calculator', text: 'Karta Podatkowa' },
      { icon: 'book', text: 'Ewidencja środków trwałych' },
      { icon: 'cash', text: 'Przebieg pojazdów i koszty' },
    ],
    detailLead: 'Obsługujemy przedsiębiorców rozliczających się w formach uproszczonych, dbając o zgodność z przepisami i terminowość rozliczeń.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie podatkowej księgi przychodów i rozchodów (KPiR)' },
      { icon: 'book', text: 'Prowadzenie ewidencji ryczałtu' },
      { icon: 'calculator', text: 'Prowadzenie Karty Podatkowej' },
      { icon: 'book', text: 'Ewidencja środków trwałych i wyposażenia' },
      { icon: 'cash', text: 'Ewidencja przebiegu pojazdów i kosztów eksploatacyjnych' },
    ],
    svgPath: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  },
  {
    title: 'Pełna księgowość',
    description: 'Kompleksowa obsługa spółek i większych podmiotów.',
    items: [
      { icon: 'book', text: 'Księgi rachunkowe' },
      { icon: 'calculator', text: 'Bilans i RZiS' },
      { icon: 'book', text: 'Polityka rachunkowości' },
      { icon: 'invoice', text: 'Sprawozdania finansowe' },
    ],
    detailLead: 'Prowadzimy pełne księgi rachunkowe zgodnie z krajowymi i międzynarodowymi standardami rachunkowości, zapewniając najwyższą jakość i bezpieczeństwo danych finansowych.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie ksiąg rachunkowych' },
      { icon: 'calculator', text: 'Bilans oraz rachunek zysków i strat (RZiS)' },
      { icon: 'book', text: 'Przygotowanie polityki rachunkowości' },
      { icon: 'invoice', text: 'Sporządzanie sprawozdań finansowych' },
      { icon: 'shield', text: 'Nadzór księgowy i standaryzacja księgowości' },
    ],
    svgPath: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
  {
    title: 'Podatki i deklaracje',
    description: 'Rozliczenia ZUS, VAT i PIT – usługi księgowe w zakresie podatków i deklaracji.',
    items: [
      { icon: 'invoice', text: 'Ewidencja VAT' },
      { icon: 'invoice', text: 'Deklaracje VAT-7, VAT-UE' },
      { icon: 'cash', text: 'Przelewy podatkowe' },
      { icon: 'invoice', text: 'Roczne rozliczenia, VAT-REF' },
    ],
    detailLead: 'Sporządzamy i składamy wszystkie wymagane deklaracje oraz prowadzimy niezbędne ewidencje podatkowe zgodnie z obowiązującymi przepisami.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Ewidencja sprzedaży i zakupów VAT' },
      { icon: 'invoice', text: 'Sporządzanie deklaracji VAT-7, VAT-UE' },
      { icon: 'invoice', text: 'Wysyłka deklaracji do urzędów skarbowych' },
      { icon: 'cash', text: 'Przygotowanie przelewów podatkowych' },
      { icon: 'invoice', text: 'Roczne rozliczenia osób fizycznych i przedsiębiorców' },
      { icon: 'cash', text: 'Wnioski VAT-REF (zwrot VAT z UE)' },
    ],
    svgPath: 'm9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
  },
  {
    title: 'Kadry, płace i BHP',
    description: 'Kadry, płace, rozliczenia ZUS – pełna obsługa pracowników i obowiązków pracodawcy.',
    items: [
      { icon: 'people', text: 'Akta osobowe i listy płac' },
      { icon: 'zus', text: 'Deklaracje ZUS i prawo pracy' },
      { icon: 'shield', text: 'Szkolenia i dokumentacja BHP' },
    ],
    detailLead: 'Zapewniamy kompleksowe wsparcie kadrowo-płacowe oraz organizację obowiązkowych szkoleń i dokumentacji BHP.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'people', text: 'Zakładanie i prowadzenie akt osobowych' },
      { icon: 'cash', text: 'Sporządzanie list płac' },
      { icon: 'zus', text: 'Deklaracje ZUS i dokumenty z zakresu prawa pracy' },
      { icon: 'shield', text: 'Informowanie o badaniach lekarskich i szkoleniach BHP' },
      { icon: 'shield', text: 'Organizacja szkoleń BHP i kompletowanie dokumentacji' },
    ],
    svgPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
  },
  {
    title: 'Doradztwo i usługi specjalistyczne',
    description: 'Wsparcie strategiczne i finansowe dla biznesu.',
    items: [
      { icon: 'calculator', text: 'Doradztwo podatkowe' },
      { icon: 'invoice', text: 'Biznesplany dla banków' },
      { icon: 'cash', text: 'Ceny transferowe' },
      { icon: 'people', text: 'Przekształcenia spółek' },
    ],
    detailLead: 'Pomagamy w podejmowaniu kluczowych decyzji biznesowych oraz realizacji bardziej złożonych obowiązków finansowo-prawnych.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'calculator', text: 'Doradztwo finansowe i podatkowe' },
      { icon: 'invoice', text: 'Biznesplany i analizy finansowe dla banków' },
      { icon: 'cash', text: 'Dokumentacja cen transferowych' },
      { icon: 'people', text: 'Przekształcenia spółek' },
      { icon: 'book', text: 'Specjalistyczne usługi rachunkowe' },
    ],
    svgPath: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
  {
    title: 'Sprawozdawczość, audyty i kontrole',
    description: 'Bezpieczeństwo w kontaktach z instytucjami.',
    items: [
      { icon: 'invoice', text: 'Sprawozdania GUS' },
      { icon: 'shield', text: 'Obsługa audytów i kontroli' },
      { icon: 'people', text: 'Wsparcie w kontaktach z urzędami' },
    ],
    detailLead: 'Reprezentujemy i wspieramy klientów w trakcie kontroli oraz przygotowujemy wymagane sprawozdania i raporty.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Sprawozdania GUS' },
      { icon: 'shield', text: 'Obsługa audytów i kontroli' },
      { icon: 'people', text: 'Wsparcie w kontaktach z urzędami i instytucjami' },
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
          <div className="section-tag">Nasze usługi</div>
          <h2 className="section-title">Usługi księgowe i kadrowe</h2>
          <p className="section-subtitle">
            Usługi księgowe, rozliczenia ZUS, kadry i BHP – biuro rachunkowe
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

                {/* Grid-template-rows: 0fr→1fr — animacja bez layout shift */}
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
                  {expandedIndex === index ? 'Zwiń' : 'Szczegóły'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
