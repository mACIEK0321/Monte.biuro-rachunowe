export default function SchemaOrg() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://montebiuro.pl/#biuro-rachunkowe',
    name: 'MonTe Biuro Rachunkowe',
    alternateName: 'Monte.biuro',
    url: 'https://montebiuro.pl',
    logo: 'https://montebiuro.pl/logo/monte.svg',
    image: 'https://montebiuro.pl/logo/monte.svg',
    description:
      'Certyfikowane biuro rachunkowe w Krakowie z ponad 20-letnim doświadczeniem. Pełna księgowość, audyty, obsługa spółek z o.o. i firm międzynarodowych. Certyfikat Ministerstwa Finansów nr 36393/2020.',
    telephone: ['+48661444882', '+48577161434'],
    email: 'kontakt@montebiuro.pl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Myśliwska 8',
      addressLocality: 'Kraków',
      postalCode: '30-718',
      addressCountry: 'PL',
      addressRegion: 'małopolskie',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0330,
      longitude: 19.9600,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Kraków',
      },
      {
        '@type': 'Country',
        name: 'Polska',
      },
    ],
    serviceType: [
      'Pełna księgowość',
      'Księgowość uproszczona (KPiR, ryczałt)',
      'Obsługa spółek z o.o.',
      'Księgowość dla firm międzynarodowych',
      'Audyty i sprawozdania finansowe',
      'Kadry i płace',
      'Doradztwo podatkowe',
      'Rozliczenia VAT i ZUS',
      'Księgowość US GAAP',
      'Zakładanie działalności i spółek',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pakiety księgowe',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Pakiet Start – księgowość dla JDG',
          description:
            'Księgowość uproszczona dla jednoosobowej działalności gospodarczej, do 5 zapisów księgowych miesięcznie.',
          price: '299',
          priceCurrency: 'PLN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '299',
            priceCurrency: 'PLN',
            billingDuration: 'P1M',
            unitText: 'netto/miesiąc',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pakiet Business – księgowość dla firm',
          description:
            'Rozbudowana obsługa księgowa dla JDG i małych firm, do 30 dokumentów miesięcznie.',
          price: '599',
          priceCurrency: 'PLN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '599',
            priceCurrency: 'PLN',
            billingDuration: 'P1M',
            unitText: 'netto/miesiąc',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pakiet Indywidualny – pełna księgowość spółek',
          description:
            'Kompleksowa pełna księgowość dla spółek prawa handlowego. Wycena indywidualna.',
        },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: 'od 299 PLN netto/msc',
    paymentAccepted: 'Przelew bankowy',
    currenciesAccepted: 'PLN',
    knowsAbout: [
      'Rachunkowość',
      'Podatki',
      'US GAAP',
      'Polska ustawa o rachunkowości',
      'Sprawozdawczość finansowa',
      'Kadry i płace',
      'ZUS',
      'VAT',
      'KSeF',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certyfikat Ministerstwa Finansów',
        name: 'Certyfikat uprawniający do usługowego prowadzenia ksiąg rachunkowych nr 36393/2020',
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Ministerstwo Finansów Rzeczypospolitej Polskiej',
        },
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Stowarzyszenie Księgowych w Polsce',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Monika Kołakowska',
        jobTitle: 'Partner Zarządzający',
        description:
          'Menedżer finansowy z ponad 16-letnim doświadczeniem w finansach i księgowości. Certyfikat Dyrektora Finansowego (II stopień) Krajowej Izby Księgowych.',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Uniwersytet Ekonomiczny w Krakowie',
        },
        knowsAbout: [
          'Pełna księgowość',
          'US GAAP',
          'Sprawozdawczość finansowa',
          'Controlling',
          'Budżetowanie',
        ],
      },
      {
        '@type': 'Person',
        name: 'Teresa Kućmierczyk',
        jobTitle: 'Partner Zarządzający',
        description:
          'Ekspert z ponad 25-letnim doświadczeniem. 13 lat jako Główna Księgowa w IBM. Certyfikat Księgowy MF nr 36393/2020.',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Uniwersytet Ekonomiczny w Krakowie',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certyfikat Księgowy nr 36393/2020',
          recognizedBy: {
            '@type': 'GovernmentOrganization',
            name: 'Ministerstwo Finansów RP',
          },
        },
        worksFor: [
          {
            '@type': 'Organization',
            name: 'MonTe Biuro Rachunkowe',
          },
        ],
        knowsAbout: [
          'Pełne księgi rachunkowe',
          'US GAAP',
          'Sprawozdawczość międzynarodowa',
          'Księgowość korporacyjna',
        ],
      },
    ],
    sameAs: [],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://montebiuro.pl/#local-business',
    name: 'MonTe Biuro Rachunkowe',
    url: 'https://montebiuro.pl',
    telephone: '+48661444882',
    email: 'kontakt@montebiuro.pl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Myśliwska 8',
      addressLocality: 'Kraków',
      postalCode: '30-718',
      addressCountry: 'PL',
      addressRegion: 'małopolskie',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0330,
      longitude: 19.9600,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: 'od 299 PLN netto/msc',
    image: 'https://montebiuro.pl/logo/monte.svg',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ile kosztuje księgowość w biurze rachunkowym MonTe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Koszt zależy od liczby dokumentów i formy rozliczeń. Dla JDG oferujemy pakiety od 299 zł/msc netto. Dla spółek - od 599 zł/msc. Dla spółek prawa handlowego przygotowujemy wycenę indywidualną. Skontaktuj się z nami, a przedstawimy wycenę dopasowaną do Twojej działalności.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak nawiązać współpracę z biurem rachunkowym MonTe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wypełnij formularz na stronie - oddzwonimy i odpowiemy na pytania. Przy decyzji o współpracy otrzymasz wzór umowy i ankietę. Umowę można podpisać online (profil zaufany) lub tradycyjnie - kurierem na nasz koszt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Czy MonTe pomaga w założeniu działalności lub spółki?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tak. Wspieramy klientów w procesie zakładania działalności gospodarczej, przygotowując niezbędne zgłoszenia do urzędów skarbowych oraz ZUS. Usługa jest bezpłatna dla osób rozpoczynających z nami współpracę. W przypadku spółek z o.o. współpracujemy z zaufaną kancelarią prawną.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak przekazać dokumenty do zaksięgowania?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Przez panel klienta online: logujesz się, wybierasz „Prześlij dokumenty" i wgrywasz skany lub zdjęcia faktur. Można też korzystać z aplikacji mobilnej i robić zdjęcia dokumentów telefonem. System wspiera elektroniczny obieg dokumentów i integrację z KSeF.',
        },
      },
      {
        '@type': 'Question',
        name: 'Czy biuro rachunkowe przypomni o zapłaceniu podatków i ZUS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tak. Co miesiąc wysyłamy powiadomienie z przypomnieniem o płatnościach podatkowych i składkach ZUS, informując o kwotach i terminach.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: 'https://montebiuro.pl',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
