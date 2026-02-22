'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'Ile kosztuje księgowość?',
    answer:
      'Koszt zależy od liczby dokumentów i formy rozliczeń. Dla JDG oferujemy pakiety od 299 zł/msc netto. Dla spółek – od 599 zł/msc. Skontaktuj się z nami, a przedstawimy wycenę dopasowaną do Twojej działalności.',
  },
  {
    question: 'Jak nawiązać współpracę? Jak podpisać umowę?',
    answer:
      'Wypełnij formularz – oddzwonimy i odpowiemy na pytania. Przy decyzji o współpracy otrzymasz wzór umowy i ankietę. Umowę można podpisać online (profil zaufany) lub tradycyjnie – kurierem na nasz koszt.',
  },
  {
    question: 'Czy pomagacie w założeniu działalności lub spółki?',
    answer:
      'Tak. Wspieramy klientów w procesie zakładania działalności gospodarczej, przygotowując niezbędne zgłoszenia do urzędów skarbowych oraz ZUS. Usługa jest bezpłatna dla osób rozpoczynających z nami współpracę. W przypadku spółek z o.o. współpracujemy z zaufaną kancelarią prawną, zapewniając kompleksową obsługę procesu rejestracji.',
  },
  {
    question: 'Jak przekazać dokumenty do zaksięgowania?',
    answer:
      'Przez panel klienta: logujesz się, wybierasz „Prześlij dokumenty" i wgrywasz skany lub zdjęcia faktur. Można też korzystać z aplikacji mobilnej i robić zdjęcia dokumentów telefonem.',
  },
  {
    question: 'Czy księgowy przypomni o zapłaceniu podatków i ZUS?',
    answer:
      'Tak. Co miesiąc wysyłamy SMS lub e-mail z przypomnieniem o płatnościach, żebyś miał pewność, że nic nie umknie w gąszczu spraw.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    const isExpanding = openIndex !== index;
    setOpenIndex(isExpanding ? index : null);

    if (isExpanding) {
      setTimeout(() => {
        document.getElementById(`faq-item-${index}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">FAQ – pytania o księgowość</h2>
        </div>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              id={`faq-item-${index}`}
              className={`faq-item fade-in-scroll ${openIndex === index ? 'is-open' : ''}`}
              data-faq=""
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() => toggle(index)}
              >
                {item.question}
              </button>

              {/* Grid-template-rows: 0fr→1fr — animacja bez layout shift */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: openIndex === index ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s ease',
                  willChange: openIndex === index ? 'grid-template-rows' : 'auto',
                }}
              >
                <div style={{ minHeight: 0, overflow: 'hidden' }}>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{item.answer}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
