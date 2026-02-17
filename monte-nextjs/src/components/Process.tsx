'use client';

export default function Process() {
  const steps = [
    {
      number: 1,
      title: 'Bezpłatna konsultacja',
      description:
        'Poznajemy Twoje potrzeby i dobieramy optymalny pakiet. Bez zobowiązań, całkowicie za darmo.',
    },
    {
      number: 2,
      title: 'Konfiguracja systemu',
      description:
        'Zakładamy konto, ustawiamy obieg dokumentów i dostęp do platformy online.',
    },
    {
      number: 3,
      title: 'Migracja danych',
      description:
        'Bezpiecznie przenosimy dokumenty z poprzedniego biura. Zajmiemy się wszystkim.',
    },
    {
      number: 4,
      title: 'Bieżąca obsługa',
      description:
        'Dedykowany opiekun, stały kontakt i rozliczenia zawsze na czas. Spokój głowy gwarantowany.',
    },
  ];

  return (
    <section className="process-section" id="proces">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Jak działamy</div>
          <h2 className="section-title">
            Jak działamy – współpraca w 4 krokach
          </h2>
          <p className="section-subtitle">
            Od pierwszego kontaktu do pełnej obsługi księgowej
          </p>
        </div>
        <div className="carousel-wrapper">
          <div className="process-steps">
            {steps.map((step) => (
              <div key={step.number} className="process-step fade-in-scroll">
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
