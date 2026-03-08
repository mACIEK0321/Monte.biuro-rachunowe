'use client';

import { useState, useRef } from 'react';
import { useLang } from './LanguageProvider';

interface ServiceItem {
  title: string;
  description: string;
  items: Array<{ icon: string; text: string }>;
  detailLead: string;
  detailTitle: string;
  detailItems: Array<{ icon: string; text: string }>;
  svgPath: string;
}

const servicesSvgPaths = [
  'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
  'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  'm9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
  'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
  'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75',
];

const servicesDataPL: Omit<ServiceItem, 'svgPath'>[] = [
  {
    title: 'Start i obsługa firmy',
    description: 'Wspieramy przedsiębiorców na każdym etapie: od rejestracji firmy po codzienną obsługę formalną i podatkową.',
    items: [
      { icon: 'invoice', text: 'Zakładanie działalności i spółek' },
      { icon: 'calculator', text: 'Wybór optymalnej formy opodatkowania' },
      { icon: 'people', text: 'Stałe wsparcie formalne i organizacyjne' },
    ],
    detailLead: 'Zapewniamy uporządkowany proces rozpoczęcia działalności oraz bieżące wsparcie w obowiązkach administracyjnych. Pomagamy podejmować decyzje podatkowe z uwzględnieniem specyfiki branży, planów rozwoju i bezpieczeństwa rozliczeń.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Rejestracja działalności i spółek' },
      { icon: 'calculator', text: 'Analiza i rekomendacja modelu opodatkowania' },
      { icon: 'people', text: 'Przygotowanie dokumentów i zgłoszeń' },
      { icon: 'people', text: 'Konsultacje w trakcie prowadzenia działalności' },
    ],
  },
  {
    title: 'Nowoczesna księgowość online',
    description: 'Korzystamy z zaawansowanego systemu księgowego, który umożliwia wygodną współpracę z biurem rachunkowym, automatyzuje procesy i zapewnia stały dostęp do danych finansowych firmy.',
    items: [
      { icon: 'invoice', text: 'Dostęp do systemu księgowego online' },
      { icon: 'invoice', text: 'Elektroniczny obieg dokumentów' },
      { icon: 'zus', text: 'Integracja z KSeF i instytucjami publicznymi' },
      { icon: 'cash', text: 'Automatyzacja rozliczeń i raportów' },
    ],
    detailLead: 'System wspiera codzienną współpracę z klientem, porządkuje dokumenty oraz umożliwia bieżącą kontrolę podatków, zobowiązań i wyników finansowych w jednym miejscu.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Prowadzenie księgowości w zintegrowanym systemie' },
      { icon: 'invoice', text: 'Obsługa faktur w KseF' },
      { icon: 'invoice', text: 'Bezpieczne przesyłanie i archiwizacja dokumentów' },
      { icon: 'zus', text: 'Podgląd rozliczeń, podatków i zobowiązań' },
      { icon: 'cash', text: 'Automatyczne przypomnienia o terminach' },
      { icon: 'people', text: 'Dostęp do raportów i danych finansowych online' },
    ],
  },
  {
    title: 'Księgowość uproszczona',
    description: 'Księgowość dla JDG i małych firm, która zapewnia pełną kontrolę nad rozliczeniami, terminowość oraz jasne informacje o podatkach i kosztach prowadzenia działalności.',
    items: [
      { icon: 'book', text: 'Rozliczenia dopasowane do formy opodatkowania' },
      { icon: 'calculator', text: 'Stała kontrola podatków i zobowiązań' },
      { icon: 'book', text: 'Wsparcie w bieżących decyzjach biznesowych' },
      { icon: 'cash', text: 'Przejrzyste informacje o finansach firmy' },
    ],
    detailLead: 'Dbamy o to, aby rozliczenia były proste i zrozumiałe, a przedsiębiorca miał pewność, że wszystkie obowiązki są realizowane na czas i zgodnie z przepisami.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie KPIR lub ewidencji ryczałtu' },
      { icon: 'calculator', text: 'Rozliczenia podatkowe i przygotowanie deklaracji' },
      { icon: 'book', text: 'Ewidencja środków trwałych i wyposażenia' },
      { icon: 'cash', text: 'Rozliczanie kosztów działalności' },
      { icon: 'invoice', text: 'Informacje o podatkach do zapłaty i terminach' },
      { icon: 'people', text: 'Bieżące wsparcie w sprawach księgowych' },
    ],
  },
  {
    title: 'Pełna księgowość',
    description: 'Kompleksowa obsługa finansowo-księgowa spółek oraz podmiotów prowadzących pełne księgi rachunkowe, zapewniająca zgodność z przepisami i rzetelna informację zarządzczą.',
    items: [
      { icon: 'book', text: 'Prowadzenie pełnych ksiąg rachunkowych' },
      { icon: 'calculator', text: 'Raportowanie finansowe i zarządcze' },
      { icon: 'book', text: 'Zgodność z przepisami i standardami' },
      { icon: 'invoice', text: 'Wsparcie zarządu w obszarze finansów' },
    ],
    detailLead: 'Zapewniamy rzetelne prowadzenie ksiąg oraz terminowe raportowanie, dostarczając zarządom i właścicielom przejrzyste informacje o sytuacji finansowej i wynikach działalności.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'book', text: 'Prowadzenie ksiąg rachunkowych zgodnie z ustawą o rachunkowości' },
      { icon: 'calculator', text: 'Sporządzanie bilansu, rachunku zysków i strat oraz sprawozdań finansowych' },
      { icon: 'book', text: 'Przygotowanie polityki rachunkowości i planu kont' },
      { icon: 'invoice', text: 'Raporty finansowe na potrzeby zarządu i właścicieli' },
      { icon: 'shield', text: 'Nadzór nad poprawnością księgowań i zamknięć okresów' },
      { icon: 'people', text: 'Wsparcie w kontaktach z audytorami i instytucjami' },
    ],
  },
  {
    title: 'Podatki i deklaracje',
    description: 'Kompleksowa obsługa rozliczeń podatkowych i ZUS z bieżącą kontrolą zobowiązań oraz terminów płatności.',
    items: [
      { icon: 'invoice', text: 'Ewidencja VAT sprzedaży i zakupów' },
      { icon: 'invoice', text: 'Deklaracje VAT i rozliczenia podatkowe' },
      { icon: 'cash', text: 'Informacja o podatkach do zapłaty' },
      { icon: 'invoice', text: 'Przygotowanie przelewów do urzędów' },
    ],
    detailLead: 'Zapewniamy terminowe przygotowanie deklaracji oraz pełną kontrolę nad zobowiązaniami podatkowymi, dzięki czemu klient zawsze wie, jakie podatki i kiedy należy opłacić.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Prowadzenie ewidencji VAT zgodnie z przepisami' },
      { icon: 'invoice', text: 'Sporządzanie i składanie deklaracji VAT oraz informacji podsumowujących' },
      { icon: 'cash', text: 'Przygotowanie zestawienia podatków i składek do zapłaty' },
      { icon: 'zus', text: 'Obsługa rozliczeń ZUS przedsiębiorcy' },
      { icon: 'invoice', text: 'Roczne rozliczenia podatkowe przedsiębiorców i osób fizycznych' },
      { icon: 'cash', text: 'Wsparcie w bieżących rozliczeniach i wyjaśnieniach podatkowych' },
    ],
  },
  {
    title: 'Kadry, płace i BHP',
    description: 'Kompleksowa obsługa pracowników i obowiązków pracodawcy — od zatrudnienia po bieżące rozliczenia i dokumentację.',
    items: [
      { icon: 'people', text: 'Obsługa zatrudnienia i dokumentacji pracowniczej' },
      { icon: 'zus', text: 'Naliczanie wynagrodzeń i rozliczenia ZUS' },
      { icon: 'shield', text: 'Wsparcie w obowiązkach pracodawcy' },
      { icon: 'people', text: 'Kontrola terminów badań i szkoleń' },
    ],
    detailLead: 'Zapewniamy sprawnie i zgodną z przepisami obsługę kadrowo-płacową, dzięki czemu pracodawca ma pewność, że wszystkie obowiązki wobec pracowników i instytucji są realizowane prawidowo i na czas.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'people', text: 'Prowadzenie akt osobowych pracowników' },
      { icon: 'cash', text: 'Sporządzanie list płac i rozliczeń wynagrodzeń' },
      { icon: 'zus', text: 'Zgłoszenia i deklaracje do ZUS' },
      { icon: 'invoice', text: 'Przygotowanie dokumentów związanych z zatrudnieniem' },
      { icon: 'shield', text: 'Informowanie o terminach badań lekarskich i szkoleniach BHP' },
      { icon: 'people', text: 'Wsparcie w bieżących sprawach kadrowych i pracowniczych' },
    ],
  },
  {
    title: 'Doradztwo i usługi specjalistyczne',
    description: 'Wsparcie właścicieli i zarządów w podejmowaniu decyzji finansowych, planowaniu rozwoju oraz porządkowaniu procesów w firmie.',
    items: [
      { icon: 'calculator', text: 'Doradztwo finansowe dla właścicieli i zarządów' },
      { icon: 'invoice', text: 'Analizy i raporty wspierające decyzje biznesowe' },
      { icon: 'cash', text: 'Planowanie podatkowe i strukturalne' },
      { icon: 'people', text: 'Wsparcie w rozwoju i zmianach w firmie' },
    ],
    detailLead: 'Pomagamy spojrzeć na finanse firmy szerszej niż tylko przez pryzmat rozliczeń — dostarczamy analizy, rekomendacje i praktyczne rozwiązania wspierające stabilny rozwój biznesu.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'calculator', text: 'Analizy finansowe i interpretacja wyników' },
      { icon: 'invoice', text: 'Wsparcie w planowaniu podatkowym i optymalizacji' },
      { icon: 'cash', text: 'Przygotowanie danych i raportów dla banków lub inwestorów' },
      { icon: 'people', text: 'Doradztwo przy zmianach struktury działalności' },
      { icon: 'book', text: 'Konsultacje finansowe dla zarządu i właścicieli' },
      { icon: 'book', text: 'Uporządkowanie procesów finansowych i raportowych' },
    ],
  },
  {
    title: 'Sprawozdawczość, audyty i kontrole',
    description: 'Wsparcie w raportowaniu oraz bezpieczna reprezentacja firmy w kontaktach z instytucjami i podczas kontroli.',
    items: [
      { icon: 'invoice', text: 'Przygotowanie wymaganych sprawozdań i raportów' },
      { icon: 'shield', text: 'Wsparcie w trakcie kontroli i audytów' },
      { icon: 'people', text: 'Reprezentacja w kontaktach z instytucjami' },
      { icon: 'book', text: 'Porządkowanie dokumentacji i danych' },
    ],
    detailLead: 'Zapewniamy klientom spokój i bezpieczeństwo w relacjach z urzędami oraz instytucjami, przygotowując niezbędne dokumenty i wspierając na każdym etapie kontroli lub audytu.',
    detailTitle: 'Zakres usług',
    detailItems: [
      { icon: 'invoice', text: 'Sporządzanie sprawozdań finansowych i raportów wymaganych przepisami' },
      { icon: 'invoice', text: 'Sprawozdania statystyczne GUS' },
      { icon: 'shield', text: 'Wsparcie w trakcie kontroli podatkowych i ZUS' },
      { icon: 'people', text: 'Przygotowanie dokumentów i wyjaśnień dla instytucji' },
      { icon: 'book', text: 'Współpraca z audytorami i biegłymi rewidentami' },
      { icon: 'people', text: 'Reprezentacja i wsparcie w bieżących kontaktach z urzędami' },
    ],
  },
];

const servicesDataEN: Omit<ServiceItem, 'svgPath'>[] = [
  {
    title: 'Company Registration & Setup',
    description: 'We support entrepreneurs at every stage of their journey - from company registration to day-to-day administrative and tax support.',
    items: [
      { icon: 'invoice', text: 'Company and partnership registration' },
      { icon: 'calculator', text: 'Selection of the most suitable tax structure' },
      { icon: 'people', text: 'Ongoing administrative and organizational support' },
    ],
    detailLead: 'We ensure a structured process when starting a business and provide continuous assistance with administrative obligations. We also advise clients on tax decisions, taking into account the specifics of their industry, growth plans, and compliance requirements.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Business and company registration' },
      { icon: 'calculator', text: 'Analysis and recommendation of the optimal tax model' },
      { icon: 'people', text: 'Preparation of documentation and official filings' },
      { icon: 'people', text: 'Ongoing advisory during business operations' },
    ],
  },
  {
    title: 'Modern Online Accounting',
    description: 'We use an advanced accounting system that enables seamless cooperation with our accounting firm, automates key processes, and provides continuous access to your company\'s financial data.',
    items: [
      { icon: 'invoice', text: 'Online access to the accounting system' },
      { icon: 'invoice', text: 'Electronic document workflow' },
      { icon: 'zus', text: 'Integration with KSeF and public institutions' },
      { icon: 'cash', text: 'Automation of settlements and reporting' },
    ],
    detailLead: 'The system supports day-to-day collaboration with clients, keeps documents well organized, and provides ongoing visibility into taxes, liabilities, and financial performance - all in one place.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Accounting maintained within an integrated system' },
      { icon: 'invoice', text: 'Processing of invoices through KSeF' },
      { icon: 'invoice', text: 'Secure document transfer and archiving' },
      { icon: 'zus', text: 'Access to settlements, taxes, and liabilities' },
      { icon: 'cash', text: 'Automatic reminders for important deadlines' },
      { icon: 'people', text: 'Online access to financial reports and company data' },
    ],
  },
  {
    title: 'Simplified Accounting',
    description: 'Accounting services for sole proprietors and small businesses, providing full control over settlements, timely compliance, and clear insight into taxes and the costs of running a business.',
    items: [
      { icon: 'book', text: 'Accounting aligned with the selected tax regime' },
      { icon: 'calculator', text: 'Ongoing monitoring of taxes and liabilities' },
      { icon: 'book', text: 'Support with day-to-day business decisions' },
      { icon: 'cash', text: 'Clear and transparent financial information' },
    ],
    detailLead: 'We ensure that accounting remains simple and easy to understand, while giving business owners confidence that all obligations are fulfilled on time and in accordance with applicable regulations.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'book', text: 'Maintaining the KPiR or lump-sum tax records' },
      { icon: 'calculator', text: 'Tax settlements and preparation of tax returns' },
      { icon: 'book', text: 'Fixed assets and equipment register' },
      { icon: 'cash', text: 'Recording and settlement of business expenses' },
      { icon: 'invoice', text: 'Information on taxes due and payment deadlines' },
      { icon: 'people', text: 'Ongoing accounting support' },
    ],
  },
  {
    title: 'Full Accounting',
    description: 'Comprehensive financial and accounting services for companies and entities required to maintain full accounting records, ensuring regulatory compliance and reliable management information.',
    items: [
      { icon: 'book', text: 'Maintenance of full accounting books' },
      { icon: 'calculator', text: 'Financial and management reporting' },
      { icon: 'book', text: 'Compliance with applicable regulations and accounting standards' },
      { icon: 'invoice', text: 'Financial support for management and company executives' },
    ],
    detailLead: 'We ensure accurate bookkeeping and timely reporting, providing management boards and business owners with clear insight into the company\'s financial position and operating results.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'book', text: 'Maintaining accounting books in accordance with the Polish Accounting Act' },
      { icon: 'calculator', text: 'Preparation of the balance sheet, profit and loss statement, and financial statements' },
      { icon: 'book', text: 'Preparation of accounting policies and chart of accounts' },
      { icon: 'invoice', text: 'Financial reports for management and business owners' },
      { icon: 'shield', text: 'Supervision of accounting accuracy and period-end closing processes' },
      { icon: 'people', text: 'Support in cooperation with auditors and institutions' },
    ],
  },
  {
    title: 'Taxes and Filings',
    description: 'Comprehensive support with tax settlements and social security contributions, including ongoing monitoring of liabilities and payment deadlines.',
    items: [
      { icon: 'invoice', text: 'Recording of VAT sales and purchase transactions' },
      { icon: 'invoice', text: 'Preparation of VAT returns and tax settlements' },
      { icon: 'cash', text: 'Information on taxes due' },
      { icon: 'invoice', text: 'Preparation of payment instructions for tax authorities' },
    ],
    detailLead: 'We ensure that all tax returns are prepared and submitted on time while maintaining full control over tax liabilities, so clients always know what taxes are due and when they must be paid.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Maintaining VAT records in accordance with applicable regulations' },
      { icon: 'invoice', text: 'Preparation and submission of VAT returns and summary statements' },
      { icon: 'cash', text: 'Preparation of tax and contribution payment summaries' },
      { icon: 'zus', text: 'Handling social security settlements with Zakład Ubezpieczeń Społecznych' },
      { icon: 'invoice', text: 'Annual tax filings for entrepreneurs and individuals' },
      { icon: 'cash', text: 'Ongoing support with tax settlements and clarifications' },
    ],
  },
  {
    title: 'HR, Payroll and Occupational Health & Safety',
    description: 'Comprehensive support for employee administration and employer obligations - from hiring to ongoing payroll, settlements, and documentation.',
    items: [
      { icon: 'people', text: 'Employee onboarding and personnel documentation' },
      { icon: 'zus', text: 'Payroll calculation and social security settlements' },
      { icon: 'shield', text: 'Support with employer obligations' },
      { icon: 'people', text: 'Monitoring deadlines for medical examinations and mandatory training' },
    ],
    detailLead: 'We ensure efficient and compliant HR and payroll administration, giving employers confidence that all obligations toward employees and institutions are handled properly and on time.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'people', text: 'Maintaining employee personnel files' },
      { icon: 'cash', text: 'Preparation of payroll lists and salary settlements' },
      { icon: 'zus', text: 'Registrations and declarations to Zakład Ubezpieczeń Społecznych' },
      { icon: 'invoice', text: 'Preparation of employment-related documentation' },
      { icon: 'shield', text: 'Notifications regarding deadlines for medical examinations and occupational health and safety training' },
      { icon: 'people', text: 'Ongoing support in HR and employee matters' },
    ],
  },
  {
    title: 'Advisory and Specialized Services',
    description: 'We support business owners and management boards in financial decision-making, growth planning, and streamlining company processes.',
    items: [
      { icon: 'calculator', text: 'Financial advisory for owners and management' },
      { icon: 'invoice', text: 'Analyses and reports to support business decisions' },
      { icon: 'cash', text: 'Tax and structural planning' },
      { icon: 'people', text: 'Support with business development and organizational changes' },
    ],
    detailLead: 'We help clients view their company\'s finances beyond day-to-day accounting - providing analyses, recommendations, and practical solutions that promote stable business growth.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'calculator', text: 'Financial analysis and interpretation of results' },
      { icon: 'invoice', text: 'Support in tax planning and optimization' },
      { icon: 'cash', text: 'Preparation of data and reports for banks or investors' },
      { icon: 'people', text: 'Advisory on changes in business structure' },
      { icon: 'book', text: 'Financial consulting for management boards and owners' },
      { icon: 'book', text: 'Streamlining financial and reporting processes' },
    ],
  },
  {
    title: 'Reporting, Audits, and Inspections',
    description: 'We provide support in reporting and ensure secure representation of your company in dealings with institutions and during inspections.',
    items: [
      { icon: 'invoice', text: 'Preparation of required reports and statements' },
      { icon: 'shield', text: 'Support during audits and inspections' },
      { icon: 'people', text: 'Representation in communications with authorities' },
      { icon: 'book', text: 'Organization of documentation and data' },
    ],
    detailLead: 'We give clients peace of mind and security in interactions with government offices and institutions by preparing all necessary documents and supporting them at every stage of audits or inspections.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Preparation of financial statements and reports required by law' },
      { icon: 'invoice', text: 'Statistical reports for the Central Statistical Office' },
      { icon: 'invoice', text: 'Reporting to the National Bank of Poland' },
      { icon: 'shield', text: 'Support during tax and social security (ZUS) audits' },
      { icon: 'people', text: 'Preparation of documents and explanations for institutions' },
      { icon: 'book', text: 'Collaboration with auditors and certified public accountants' },
      { icon: 'people', text: 'Representation and ongoing support in communications with authorities' },
    ],
  },
];

const services: ServiceItem[] = servicesDataPL.map((s, i) => ({ ...s, svgPath: servicesSvgPaths[i] }));
const servicesEN: ServiceItem[] = servicesDataEN.map((s, i) => ({ ...s, svgPath: servicesSvgPaths[i] }));

export default function Services() {
  const { dict, lang } = useLang();
  const s = dict.services;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayedServices = lang === 'en' ? servicesEN : services;

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
          <div className="section-tag">{s.tag}</div>
          <h2 className="section-title">{s.title}</h2>
          <p className="section-subtitle">{s.subtitle}</p>
        </div>
        <div className="carousel-wrapper">
          <div className="services-grid" ref={scrollRef}>
            {displayedServices.map((service, index) => (
              <article
                key={index}
                id={`service-card-${index}`}
                className={`service-card fade-in-scroll ${expandedIndex === index ? 'is-expanded' : ''}`}
                data-service-card=""
              >
                <div className="minimal-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.svgPath} />
                  </svg>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item, i) => (
                    <li key={i} data-icon={item.icon}>{item.text}</li>
                  ))}
                </ul>
                <div style={{ display: 'grid', gridTemplateRows: expandedIndex === index ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease', willChange: expandedIndex === index ? 'grid-template-rows' : 'auto' }}>
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div className="service-card-details">
                      <p className="service-card-lead">{service.detailLead}</p>
                      <h4>{service.detailTitle}</h4>
                      <ul>
                        {service.detailItems.map((item, i) => (
                          <li key={i} data-icon={item.icon}>{item.text}</li>
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
                  {expandedIndex === index ? dict.pricing.collapse : dict.pricing.details}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
