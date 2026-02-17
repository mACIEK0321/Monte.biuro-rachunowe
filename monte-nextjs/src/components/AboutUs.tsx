'use client';

export default function AboutUs() {
  const checkmarkSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  return (
    <section className="why-section" id="o-nas">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">O nas</div>
          <h2 className="section-title">Monte – biuro rachunkowe</h2>
        </div>

        {/* Company Description - 2 columns */}
        <div className="about-content-wrapper">
          <div className="about-intro">
            <p className="about-lead">
              <strong>Monte to biuro rachunkowe</strong> stworzone z myślą o
              przedsiębiorcach, którzy chcą skupić się na prowadzeniu biznesu, a
              kwestie księgowe powierzyć doświadczonym specjalistom.
            </p>
            <p>
              Posiadamy{' '}
              <strong>
                certyfikat Ministerstwa Finansów uprawniający do usługowego
                prowadzenia ksiąg rachunkowych
              </strong>
              , co jest gwarancją rzetelności, zgodności z przepisami oraz
              najwyższych standardów zawodowych.
            </p>
            <p>
              Nasz zespół to{' '}
              <strong>ponad 20 lat doświadczenia w księgowości</strong>,
              zdobywanego zarówno w spółkach z ograniczoną odpowiedzialnością,
              międzynarodowych korporacjach, jak i w obsłudze jednoosobowych
              działalności gospodarczych.
            </p>
          </div>

          <div className="about-details">
            <p>
              Współpracujemy z{' '}
              <strong>dedykowanym doradcą podatkowym</strong>, co pozwala nam
              zapewnić kompleksowe wsparcie nie tylko w zakresie rachunkowości,
              ale również prawa podatkowego i interpretacji przepisów.
            </p>
            <p>
              Stale się rozwijamy i nieustannie podnosimy kwalifikacje, śledząc
              zmiany w przepisach oraz najlepsze praktyki rynkowe. Księgowość
              traktujemy nie jako schemat, lecz jako{' '}
              <strong>realne wsparcie w prowadzeniu firmy</strong>.
            </p>
            <p className="about-highlight">
              Monte to księgowość, na której możesz polegać.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="about-team-section">
          <div className="section-header">
            <div className="section-tag">Nasz zespół</div>
            <h2 className="section-title">
              Poznaj ludzi, którzy zadbają o Twoją księgowość
            </h2>
            <p className="section-subtitle">
              Doświadczenie korporacyjne połączone z praktycznym podejściem do
              codziennych wyzwań przedsiębiorców
            </p>
          </div>

          <div className="team-grid">
            {/* Person 1 */}
            <article className="team-card fade-in-scroll">
              <div className="team-card-inner">
                <div className="team-photo-wrapper">
                  <div className="team-photo-placeholder" style={{ display: 'flex' }}>AK</div>
                </div>
                <div className="team-content">
                  <h3 className="team-name">Anna Kowalska</h3>
                  <p className="team-role">Partner zarządzający</p>
                  <p className="team-bio">
                    Ponad 20 lat doświadczenia w finansach i rachunkowości.
                    Odpowiada za standardy pracy zespołu, bezpieczeństwo
                    rozliczeń i nadzór nad kluczowymi klientami.
                  </p>
                  <ul className="team-expertise">
                    <li>
                      {checkmarkSvg}
                      Certyfikat Ministerstwa Finansów
                    </li>
                    <li>
                      {checkmarkSvg}
                      Doświadczenie w obsłudze spółek i grup kapitałowych
                    </li>
                    <li>
                      {checkmarkSvg}
                      Specjalizacja: procesy księgowe i standaryzacja
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Person 2 */}
            <article className="team-card fade-in-scroll">
              <div className="team-card-inner">
                <div className="team-photo-wrapper">
                  <div className="team-photo-placeholder" style={{ display: 'flex' }}>KN</div>
                </div>
                <div className="team-content">
                  <h3 className="team-name">Katarzyna Nowak</h3>
                  <p className="team-role">Partner ds. doradztwa</p>
                  <p className="team-bio">
                    Wspiera klientów w planowaniu podatkowym i decyzjach
                    finansowych. Prowadzi konsultacje dla JDG, e-commerce i
                    spółek prawa handlowego.
                  </p>
                  <ul className="team-expertise">
                    <li>
                      {checkmarkSvg}
                      Wieloletnia praktyka w doradztwie podatkowym
                    </li>
                    <li>
                      {checkmarkSvg}
                      Specjalizacja: VAT, PIT, CIT i rozliczenia międzynarodowe
                    </li>
                    <li>
                      {checkmarkSvg}
                      Wsparcie przy kontrolach i audytach
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges-section fade-in-scroll">
          <h3 className="trust-badges-title">Nasza wiarygodność</h3>
          <div className="trust-badges-grid">
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <p className="trust-badge-text">
                Certyfikat MF do usługowego prowadzenia ksiąg
              </p>
            </div>

            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <p className="trust-badge-text">
                Ponad 20 lat doświadczenia zespołu
              </p>
            </div>

            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <p className="trust-badge-text">
                Stała współpraca z doradcą podatkowym
              </p>
            </div>

            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <p className="trust-badge-text">
                Praca zgodna z aktualnymi przepisami
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us - Horizontal Scroll */}
        <div
          className="section-header"
          style={{ marginTop: '5rem', marginBottom: '3rem' }}
        >
          <h2 className="section-title">Dlaczego klienci wybierają Monte</h2>
        </div>

        {/* DESKTOP: Grid 4 columns x 2 rows */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Ty prowadzisz firmę. My prowadzimy księgowość.',
              desc: 'Zajmujemy się wszystkimi rozliczeniami, podatkami i documentami. Ty skupiasz się na pracy i klientach.',
            },
            {
              title: 'Dedykowany opiekun Twojej firmy',
              desc: 'Masz jedną osobę, która zna Twoją działalność i sytuację podatkową. Bez infolinii i bez chatbotów.',
            },
            {
              title: 'Kontakt z urzędami po naszej stronie',
              desc: 'US, ZUS, pisma, wyjaśnienia i korekty – wszystko robimy w Twoim imieniu. Oszczędzasz czas i unikasz stresu.',
            },
            {
              title: 'Pilnujemy terminów i zobowiązań',
              desc: 'Informujemy Cię, ile i do kiedy zapłacić. Nie musisz pamiętać o podatkach ani składkach.',
            },
            {
              title: 'Bezpieczne rozliczenia i odpowiedzialność biura',
              desc: 'Pracujemy zgodnie z przepisami i bierzemy odpowiedzialność za księgowość. Twoje dane i dokumenty są chronione.',
            },
            {
              title: 'Panel online 24/7',
              desc: 'Przesyłasz dokumenty, masz dostęp do rozliczeń i faktur w jednym miejscu. Bez papierów i bez chaosu.',
            },
            {
              title: 'Na bieżąco informujemy o zmianach',
              desc: 'Zmiany w przepisach? Informujemy i wdrażamy je za Ciebie. Nie musisz śledzić prawa ani interpretacji.',
            },
            {
              title: 'Księgowość bez stresu i niedomówień',
              desc: 'Jasne zasady, stała współpraca i realne wsparcie. Wiesz, na czym stoisz – przez cały rok.',
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="feature-item fade-in-scroll"
            >
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE: Horizontal scroll without arrows */}
        <div
          className="md:hidden flex gap-6 overflow-x-auto scroll-smooth pb-6 
                     snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {[
            {
              title: 'Ty prowadzisz firmę. My prowadzimy księgowość.',
              desc: 'Zajmujemy się wszystkimi rozliczeniami, podatkami i dokumentami. Ty skupiasz się na pracy i klientach.',
            },
            {
              title: 'Dedykowany opiekun Twojej firmy',
              desc: 'Masz jedną osobę, która zna Twoją działalność i sytuację podatkową. Bez infolinii i bez chatbotów.',
            },
            {
              title: 'Kontakt z urzędami po naszej stronie',
              desc: 'US, ZUS, pisma, wyjaśnienia i korekty – wszystko robimy w Twoim imieniu. Oszczędzasz czas i unikasz stresu.',
            },
            {
              title: 'Pilnujemy terminów i zobowiązań',
              desc: 'Informujemy Cię, ile i do kiedy zapłacić. Nie musisz pamiętać o podatkach ani składkach.',
            },
            {
              title: 'Bezpieczne rozliczenia i odpowiedzialność biura',
              desc: 'Pracujemy zgodnie z przepisami i bierzemy odpowiedzialność za księgowość. Twoje dane i dokumenty są chronione.',
            },
            {
              title: 'Panel online 24/7',
              desc: 'Przesyłasz dokumenty, masz dostęp do rozliczeń i faktur w jednym miejscu. Bez papierów i bez chaosu.',
            },
            {
              title: 'Na bieżąco informujemy o zmianach',
              desc: 'Zmiany w przepisach? Informujemy i wdrażamy je za Ciebie. Nie musisz śledzić prawa ani interpretacji.',
            },
            {
              title: 'Księgowość bez stresu i niedomówień',
              desc: 'Jasne zasady, stała współpraca i realne wsparcie. Wiesz, na czym stoisz – przez cały rok.',
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="feature-item fade-in-scroll snap-start"
              style={{
                flexShrink: 0,
                width: '280px',
              }}
            >
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
