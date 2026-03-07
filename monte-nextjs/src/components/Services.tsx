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
    description: 'We support entrepreneurs at every stage: from business registration to ongoing administrative and tax formalities.',
    items: [
      { icon: 'invoice', text: 'Business and company registration' },
      { icon: 'calculator', text: 'Selecting the optimal tax regime' },
      { icon: 'people', text: 'Ongoing administrative and organisational support' },
    ],
    detailLead: 'We provide a structured process for starting a business and ongoing administrative support, helping you make informed tax decisions.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Registration of sole proprietorships and companies' },
      { icon: 'calculator', text: 'Analysis and recommendation of tax model' },
      { icon: 'people', text: 'Preparation of required documents and filings' },
      { icon: 'people', text: 'Advisory consultations during ongoing operations' },
    ],
  },
  {
    title: 'Modern Online Accounting',
    description: 'We use an advanced accounting system enabling seamless collaboration, automated processes and real-time access to your financial data.',
    items: [
      { icon: 'invoice', text: 'Online accounting system access' },
      { icon: 'invoice', text: 'Paperless electronic document workflow' },
      { icon: 'zus', text: 'Integration with KSeF and public institutions' },
      { icon: 'cash', text: 'Automated settlements and reporting' },
    ],
    detailLead: 'The system supports day-to-day client collaboration, organises documents and enables real-time monitoring of taxes, liabilities and financial results.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Bookkeeping within an integrated accounting system' },
      { icon: 'invoice', text: 'Invoice handling via KSeF' },
      { icon: 'invoice', text: 'Secure document transmission and archiving' },
      { icon: 'zus', text: 'Live overview of settlements, taxes and liabilities' },
      { icon: 'cash', text: 'Automated payment deadline reminders' },
      { icon: 'people', text: 'Online access to reports and financial data' },
    ],
  },
  {
    title: 'Simplified Accounting (Sole Proprietorships)',
    description: 'Accounting for sole proprietorships and small businesses ensuring full control over settlements and tax compliance.',
    items: [
      { icon: 'book', text: 'Settlement method tailored to your tax regime' },
      { icon: 'calculator', text: 'Ongoing monitoring of taxes and liabilities' },
      { icon: 'book', text: 'Support in day-to-day business decisions' },
      { icon: 'cash', text: 'Clear financial information about your business' },
    ],
    detailLead: 'We ensure straightforward, transparent settlements, so you can be confident all obligations are met on time and in compliance.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'book', text: 'Revenue & expense ledger (KPiR) or flat-rate records' },
      { icon: 'calculator', text: 'Tax settlements and preparation of declarations' },
      { icon: 'book', text: 'Fixed asset and equipment records' },
      { icon: 'cash', text: 'Business cost accounting' },
      { icon: 'invoice', text: 'Tax payment schedules and deadline notifications' },
      { icon: 'people', text: 'Ongoing accounting support' },
    ],
  },
  {
    title: 'Full-Cycle Accounting',
    description: 'Comprehensive financial and accounting services for companies, ensuring regulatory compliance and reliable management information.',
    items: [
      { icon: 'book', text: 'Maintenance of full accounting records' },
      { icon: 'calculator', text: 'Financial and management reporting' },
      { icon: 'book', text: 'Regulatory and standards compliance' },
      { icon: 'invoice', text: 'Finance support for management' },
    ],
    detailLead: 'We provide accurate bookkeeping and timely reporting, delivering transparent financial information to management and owners.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'book', text: 'Accounting records under the Polish Accounting Act' },
      { icon: 'calculator', text: 'Balance sheet, P&L and financial statements' },
      { icon: 'book', text: 'Accounting policy and chart of accounts preparation' },
      { icon: 'invoice', text: 'Financial reports for management and owners' },
      { icon: 'shield', text: 'Supervision of period closes and posting accuracy' },
      { icon: 'people', text: 'Liaison with auditors and regulatory bodies' },
    ],
  },
  {
    title: 'Tax Filings & Declarations',
    description: 'Comprehensive tax and social insurance (ZUS) settlements with ongoing liability monitoring and deadline management.',
    items: [
      { icon: 'invoice', text: 'VAT sales and purchase records' },
      { icon: 'invoice', text: 'VAT returns and tax filings' },
      { icon: 'cash', text: 'Tax payment schedules' },
      { icon: 'invoice', text: 'Payment order preparation for authorities' },
    ],
    detailLead: 'We ensure timely preparation of all tax declarations and full control over tax liabilities, so you always know what to pay and when.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'VAT records maintenance in compliance with regulations' },
      { icon: 'invoice', text: 'VAT returns and EC Sales Lists preparation and filing' },
      { icon: 'cash', text: 'Tax and social insurance payment schedules' },
      { icon: 'zus', text: 'ZUS (social insurance) settlements for proprietors' },
      { icon: 'invoice', text: 'Annual tax returns for businesses and individuals' },
      { icon: 'cash', text: 'Tax advisory and explanations' },
    ],
  },
  {
    title: 'HR, Payroll & Health & Safety',
    description: 'Comprehensive employee and employer obligation management – from hiring to ongoing payroll and documentation.',
    items: [
      { icon: 'people', text: 'Employment and HR documentation management' },
      { icon: 'zus', text: 'Payroll calculation and ZUS settlements' },
      { icon: 'shield', text: 'Employer compliance support' },
      { icon: 'people', text: 'Medical examination and training deadline monitoring' },
    ],
    detailLead: 'We provide accurate, compliant HR and payroll services, ensuring all employer obligations towards employees and authorities are met on time.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'people', text: 'Employee personal file maintenance' },
      { icon: 'cash', text: 'Payroll lists and remuneration settlements' },
      { icon: 'zus', text: 'ZUS registrations and declarations' },
      { icon: 'invoice', text: 'Employment-related document preparation' },
      { icon: 'shield', text: 'Medical and H&S training deadline notifications' },
      { icon: 'people', text: 'Ongoing HR and employment support' },
    ],
  },
  {
    title: 'Financial Advisory & Specialist Services',
    description: 'Support for owners and management in financial decision-making, tax planning and business development.',
    items: [
      { icon: 'calculator', text: 'Financial advisory for owners and management' },
      { icon: 'invoice', text: 'Analyses and reports supporting business decisions' },
      { icon: 'cash', text: 'Tax and structural planning' },
      { icon: 'people', text: 'Support in business development and restructuring' },
    ],
    detailLead: 'We deliver analyses, recommendations and practical solutions to support stable, well-structured business growth.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'calculator', text: 'Financial analysis and performance interpretation' },
      { icon: 'invoice', text: 'Tax planning and optimisation support' },
      { icon: 'cash', text: 'Data and reports for banks or investors' },
      { icon: 'people', text: 'Advisory on business structure changes' },
      { icon: 'book', text: 'Financial consultations for management' },
      { icon: 'book', text: 'Financial process organisation and improvement' },
    ],
  },
  {
    title: 'Reporting, Audits & Authority Controls',
    description: 'Reporting support and safe representation of your company during audits and authority inspections.',
    items: [
      { icon: 'invoice', text: 'Preparation of required financial reports' },
      { icon: 'shield', text: 'Support during audits and tax inspections' },
      { icon: 'people', text: 'Representation before regulatory bodies' },
      { icon: 'book', text: 'Documentation review and organisation' },
    ],
    detailLead: 'We ensure your security in dealings with authorities, preparing all necessary documents and supporting you through every stage of an audit.',
    detailTitle: 'Scope of Services',
    detailItems: [
      { icon: 'invoice', text: 'Financial statements and regulatory reports' },
      { icon: 'invoice', text: 'Central Statistical Office (GUS) reports' },
      { icon: 'shield', text: 'Support during tax office and ZUS inspections' },
      { icon: 'people', text: 'Document and explanation preparation for authorities' },
      { icon: 'book', text: 'Collaboration with statutory auditors' },
      { icon: 'people', text: 'Representation in ongoing authority contacts' },
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
