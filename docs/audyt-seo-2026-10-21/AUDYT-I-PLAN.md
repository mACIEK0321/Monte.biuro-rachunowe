# MonTe — audyt SEO i plan zwiększenia widoczności

**Data:** 21 października 2026 r. • **Domena:** https://www.montebiuro.pl/ • **Zakres:** audyt i plan, bez wdrażania zmian na stronie.

Największy potencjał w obecnym zakresie mają: naprawa pustej mapy strony, uporządkowanie adresów i wersji językowych, poprawa szybkości na telefonach oraz rozwój Profilu Firmy w Google. Równolegle trzeba naprawić pomiar: test wykazał, że akceptacja cookies nie uruchamia prawidłowo zgody w GA4. To utrudnia ocenę, skąd przychodzą potencjalni klienci.

**Teksty widoczne na stronie, układ, zdjęcia i ich kadrowanie pozostają bez zmian.** Plan obejmuje kod techniczny, metadane, konfigurację pomiaru oraz działania poza witryną. Nie zakłada nowych podstron usługowych, przepisywania artykułów ani dodawania sekcji. Meta title może zmienić napis na karcie przeglądarki i w wynikach wyszukiwania; nie zmienia nagłówka na stronie.

## 1. Co zostało sprawdzone i gdzie są ograniczenia

Wykonano:

- przegląd kodu aplikacji Next.js w `monte-nextjs/` i schematu wpisów Sanity;
- 48 odczytów HTTP: strony PL/EN, 26 adresów artykułów, polityki, warianty domeny, mapa, robots, grafika OG i adresy kontrolne;
- dodatkowe sprawdzenie 26 celów `hreflang` artykułów;
- testy Chrome: nowa wizyta, akceptacja cookies, przeładowanie, odmowa, powrót z zapisaną zgodą, nawigacja do bloga, angielska przeglądarka otwierająca polski artykuł;
- diagnostyczne wywołanie standardowego `gtag` wyłącznie w odizolowanej sesji przeglądarki;
- po jednym pomiarze Lighthouse 13.5.0 dla telefonu i komputera;
- przegląd publicznych wyników wyszukiwania i aktualnej dokumentacji Google/Microsoft.

To audyt publicznej strony i dostępnego kodu. **Nie uzyskano dostępu do GA4, Search Console, Profilu Firmy, panelu Vercel ani DNS.** Nie można więc potwierdzić liczby odwiedzin, wyświetleń, klientów, indeksacji każdego adresu, konfiguracji filtrów GA, właściciela strumienia ani stanu weryfikacji firmy. Brak kodu weryfikacyjnego Search Console w HTML nie oznacza braku weryfikacji — może być wykonana przez DNS.

Nie wykonano audytu merytorycznej poprawności porad podatkowych ani pełnej analizy prawnej dokumentów cookies. Obserwacje o zgodach dotyczą działania technicznego. Nie wyliczono wolumenów słów kluczowych ani kompletnego profilu linków. Dane te trzeba uzupełnić z kont i narzędzi opisanych w planie.

W testach automatycznych Chrome żądania zbierające dane GA/Clarity przechwytywano lokalnie i odpowiadano kodem 204. Pozwala to obserwować zachowanie strony bez przesyłania zdarzeń testowych do tych usług. **Nie jest to potwierdzenie odbioru danych przez GA4.** Pomiary Lighthouse były osobnymi testami laboratoryjnymi; nie należy traktować ich jako pomiaru rzeczywistych użytkowników.

Dowody: [HTTP](http-evidence.json), [cele hreflang](hreflang-targets.json), [testy cookies i GA](browser-evidence.json), [Lighthouse mobile](lighthouse-mobile.json), [Lighthouse desktop](lighthouse-desktop.json). Skrypty odczytowe: [crawl.py](crawl.py), [browser-audit.cjs](browser-audit.cjs).

[Inwentarz 36 stron HTML w CSV](inwentarz-url.csv) zawiera tytuły, opisy, canonical, język HTML, liczbę H1 i uwagi per URL. W 29 z tych 36 stron canonical różnił się od końcowego adresu. CSV jest zapisany w UTF-8 z separatorem średnikowym do otwarcia w arkuszu kalkulacyjnym.

## 2. Najważniejsze ustalenia

Priorytety: **P0** — naprawić na początku; **P1** — istotne dla widoczności lub pozyskiwania kontaktów; **P2** — porządki i optymalizacja. Wpływ jest oceną jakościową, nie prognozą pozycji.

| ID | Priorytet | Ustalenie i dowód | Wpływ | Docelowa poprawka |
|---|---|---|---|---|
| S01 | P0 | Publiczny `/sitemap.xml` zwraca 200, ale zawiera pusty `urlset`, 0 adresów. W kodzie istnieją równolegle `app/sitemap.ts` z `return []` i `app/sitemap.xml/route.ts`. | Utrudnione odkrywanie i monitorowanie podstron; nie oznacza całkowitej blokady indeksacji. | Jeden generator, pełne poprawne URL-e PL/EN, zgłoszenie w GSC. |
| A01 | P0 | `CookieConsent.tsx:17` wkłada zwykłą tablicę do `dataLayer`; po akceptacji brak cookies GA. Standardowy `window.gtag` w teście tworzy `_ga` i `_ga_2GL77N6KWP`. | Pomiar użytkowników po zgodzie działa nieprawidłowo. | Wspólna funkcja zgodna z interfejsem `gtag`, poprawna inicjalizacja i obsługa zgód. |
| A02 | P0 | Przy powrocie z `all` kolejka zawiera `consent update` przed `consent default`. Skrypt startuje w `app/layout.tsx` jako `afterInteractive`. | Kolejność zależy od hydratacji i czasu ładowania. | Ustalić domyślny stan przed tagami i zastosować zapisany wybór przed konfiguracją GA. |
| S02 | P1 | `/blog/` i wszystkie 26 sprawdzonych artykułów wskazują canonical bez `www` i bez końcowego `/`, choć publiczne strony działają pod `www` z `/`. | Niespójne sygnały adresu docelowego. | Jeden standard `https://www.montebiuro.pl/.../` w canonical, sitemap, OG, JSON-LD i linkach. |
| S03 | P1 | PL polityka prywatności i cookies mają canonical strony głównej oraz jej alternatywy językowe. | Różne dokumenty są przedstawiane jako odpowiedniki strony głównej. | Canonical własnego dokumentu, rzeczywiste pary PL/EN. |
| S04 | P1 | Artykuły EN budują alternatywę PL z angielskiego sluga. 13 takich adresów zwróciło 200, tytuł „Artykuł nie znaleziony” i `noindex`. | Alternatywy językowe prowadzą do braku artykułu; ryzyko soft 404. | Jawne powiązania tłumaczeń, wzajemny hreflang, brak fikcyjnych odpowiedników. |
| S05 | P1 | Test przeglądarki `en-GB` otwierającej polski artykuł zakończył się na `/en/`. | Użytkownik traci artykuł, który wybrał; możliwe utrudnienie renderowania przez roboty. | Usunąć automatyczne przekierowanie według języka przeglądarki. Zachować istniejący przełącznik. |
| S06 | P1 | Przełącznik języka dokumentów PL tworzy m.in. `/en/polityka-prywatnosci/`, `/en/polityka-cookies/`, `/en/regulamin/`; te adresy zwracają 404. | Niedziałająca nawigacja i linki. | Mapowanie tras dokumentów PL/EN, zmiana wyłącznie `href`. |
| S07 | P1 | Na stronie są równocześnie `AccountingService`, `ProfessionalService`, `LocalBusiness`; współrzędne to zarówno `50.0647,19.945`, jak i `50.033,19.960`. | Niejednoznaczny opis lokalizacji i firmy. | Jeden spójny podmiot `AccountingService` z trwałym `@id` i potwierdzonym adresem/pinem. |
| A03 | P1 | Clarity uruchamia się niezależnie od banera; żądania `/collect` pojawiły się przed decyzją i przy odmowie. Baner opisuje GA4. | Konfiguracja dodatkowego pomiaru wykracza poza przedstawiony zakres analityki. | Przy utrzymaniu obecnych tekstów rekomendowane wyłączenie Clarity. |
| A04 | P1 | `Contact.tsx` nie emituje zdarzenia po udanej odpowiedzi API. Brak własnego pomiaru kliknięć telefonów. | Nie wiadomo, które źródła ruchu przynoszą kontakty. | Zdarzenia kontaktowe i kluczowe zdarzenie `generate_lead` po sukcesie formularza. |
| S08 | P1 | Laboratoryjny mobile: LCP 6,3 s, Performance 61/100. Globalnie `images.unoptimized: true`. | Wolniejsze pierwsze wrażenie na telefonach. | Responsywne obrazy, odpowiedni format, ograniczenie skryptów i hydratacji. |
| S09 | P2 | HTTPS bez `www` przekierowuje 307; HTTP bez `www` ma łańcuch 308 → 307. | Sygnał czasowej zamiast stałej migracji hosta i dodatkowy skok. | Stałe 301/308 do końcowego hosta; sprawdzić konfigurację Vercel, nie tylko Next.js. |
| S10 | P2 | Surowy HTML `/en/` i dokumentów EN ma `lang="pl"`; dopiero JS zmienia go na `en`. | Nieprawidłowa deklaracja języka dla klientów bez JS i narzędzi dostępności. | Prawidłowy `lang` już na serwerze, bez zmiany publicznych tras. |
| S11 | P2 | Globalny `SchemaOrg` umieszcza polski FAQ i jednopoziomowe breadcrumbs także na blogu, dokumentach i stronach EN. | Oznaczenia nie odpowiadają konkretnej stronie. | Usunąć nieadekwatny FAQ; breadcrumbs artykułów zgodne z widoczną nawigacją. |
| S12 | P2 | Podstrony dziedziczą OG strony głównej; lista bloga PL nie deklaruje własnej grafiki OG. Długie tytuły artykułów otrzymują dodatkowo rozbudowany suffix. | Słabsza kontrola podglądów i tytułów w wynikach. | Metadane per URL, krótszy suffix, osobne pola SEO wpisów. |
| S13 | P2 | Trzy sprawdzone artykuły mają wiele H1, w tym 17 i 18 nagłówków. | Niespójna struktura semantyczna; nie jest to dowód „kary Google”. | Zmienić poziomy znaczników, zachowując tekst i wygląd CSS. |
| S14 | P2 | Lighthouse wskazuje brak programowego powiązania etykiety pola wiadomości oraz nierozróżnialne linki w stopce. | Dostępność i wygoda kontaktu. | `id`/`htmlFor` bez zmiany wyglądu. Poprawki koloru/podkreślenia wyłączyć z obecnego zakresu wizualnego. |
| S15 | P2 | Blog korzysta z `force-dynamic`; obsługa błędu CMS może renderować komunikat jako zwykłą stronę. Listy mają limity 100 PL i 20 EN. | Ryzyko wolniejszego TTFB, soft 404 i osierocenia starszych treści po przekroczeniu limitu. | Właściwy cache, rozdzielenie 404 od awarii, monitoring i kontrola kompletności linków. |

**Co działa:** strona główna ma title, description, canonical i hreflang; treści są obecne w odpowiedzi HTML; `robots.txt` nie blokuje strony i wskazuje sitemap; HTTPS działa; grafika `/og-image.jpg` zwraca 200; zwykły nieistniejący adres zwraca 404; w badaniu nie było błędów JS strony. Jedna sekcja H1 na stronie głównej nie wymaga zmiany tekstu.

## 3. Indeksowanie, adresy i języki — specyfikacja naprawy

### Mapa strony

Pozostawić jeden mechanizm generujący `/sitemap.xml`. Pusty wynik publiczny jest potwierdzony; podwójna definicja trasy jest prawdopodobną przyczyną w kodzie. W panelu wdrożenia trzeba dodatkowo potwierdzić aktywny commit i cache.

Mapa ma zawierać końcowe, indeksowalne URL-e zwracające 200: stronę PL, EN, listy bloga, opublikowane artykuły obu języków oraz dokumenty przy pozostawieniu ich indeksowalnych. Bez przekierowań, parametrów kampanii, kotwic `#`, błędów i `noindex`. Obecny alternatywny handler uwzględnia tylko wpisy PL i nie obejmuje wszystkich tras EN.

`lastmod` ma oznaczać rzeczywistą modyfikację treści, a nie godzinę odczytu mapy. Użyć wiarygodnej daty CMS, a przy jej braku pominąć pole. Uwzględnić publikację i wycofanie wpisu, odrzucać brakujące slugi, kodować URL-e i poprawnie escapować XML. Awaria Sanity nie powinna po cichu zastępować pełnej mapy okrojoną wersją; zachować ostatni poprawny wynik lub zwrócić kontrolowany błąd i alert. `priority` i `changefreq` nie są dźwignią pozycji Google. [Dokumentacja map Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### Canonical i przekierowania

Docelowy adres przykładowego wpisu: `https://www.montebiuro.pl/blog/wybr-formy-opodatkowania-dziaalnoci-gospodarczej/`. Zachować obecne slugi, nawet jeśli transliteracja nie jest idealna. Masowa zmiana slugów dla estetyki nie ma uzasadnienia w tym zadaniu.

Każda odrębna strona ma wskazywać siebie, a nie stronę główną. Ujednolicić URL-e w HTML, sitemap, JSON-LD, OG i linkach. Warianty hosta i protokołu przekierować trwale z zachowaniem ścieżki oraz parametrów. Nie przekierowywać wszystkich 404 na stronę główną. Dla historycznego `/index.html` dodać przekierowanie tylko, jeśli stare linki lub GSC potwierdzą jego wcześniejsze użycie. [Canonical w Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### Wersje PL/EN

Zbudować w CMS mapę relacji tłumaczeń, zamiast zgadywać angielski lub polski slug. Przykład istniejącej pary do potwierdzenia redakcyjnego: polski wpis `wybr-formy-opodatkowania-dziaalnoci-gospodarczej` i angielski `choice-of-the-form-of-taxation`. Każda para deklaruje siebie i odpowiednik w obu kierunkach. Jeżeli tłumaczenia nie ma, nie dodawać alternatywy. `x-default` stosować tylko tam, gdzie ma sens, np. dla strony głównej.

Usunąć językowy redirect z komponentu cookies. Nie zmieniać wyboru użytkownika dokonanego poprzez konkretny adres. Dla dokumentów zastosować mapę: `polityka-prywatnosci ↔ en/privacy-policy`, `polityka-cookies ↔ en/cookie-policy`, `regulamin ↔ en/terms-and-conditions`. Ustawić język HTML na serwerze. Google rozpoznaje język przede wszystkim z treści — sam `lang` nie da awansu pozycji. [Witryny wielojęzyczne](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

Dla nieistniejących artykułów sprawdzić odpowiedź przed rozpoczęciem streamowania. Preferowany status 404/410 dla braku dokumentu; `noindex` z obecnego `notFound()` już ogranicza indeksację, ale nie naprawia błędnego hreflang. Błąd CMS powinien mieć obsługę awarii lub poprawny cache, bez indeksowania komunikatu jako artykułu.

## 4. Gotowy kierunek metadanych — bez zmiany tekstu strony

Strona główna już ma sensowny tytuł. Jego zmiana ma niższy priorytet niż błędy techniczne. Poniższe propozycje są punktem wyjścia do porównania CTR w Search Console.

| URL | Proponowany końcowy title | Proponowany meta description |
|---|---|---|
| `/` | Biuro rachunkowe Kraków – księgowość firm i JDG \| MonTe | Biuro rachunkowe MonTe w Krakowie. Księgowość JDG i spółek, kadry i płace oraz obsługa online. Umów bezpłatną konsultację i poznaj ofertę. |
| `/en/` | Accounting Firm Kraków – English-Speaking Accountants \| MonTe | Accounting for sole traders and companies in Kraków and across Poland. Bookkeeping, payroll and online support in English. Book a free consultation. |
| `/blog/` | Blog księgowy – podatki, ZUS i prowadzenie firmy \| MonTe | Artykuły MonTe o księgowości, podatkach, ZUS i prowadzeniu firmy. Poznaj praktyczne informacje dla przedsiębiorców i spółek. |
| `/en/blog/` | Accounting & Tax in Poland – Blog \| MonTe | MonTe articles on accounting, taxes, social insurance and running a business in Poland. Practical information for entrepreneurs and companies. |
| PL artykuł o formie opodatkowania | Wybór formy opodatkowania działalności \| MonTe | Jak wybrać formę opodatkowania działalności gospodarczej? Poznaj zagadnienia opisane w poradniku MonTe dla przedsiębiorców. |

Pozostałe dokumenty: zachować rzeczowy tytuł dokumentu z krótkim `| MonTe`, ustawić własny description, canonical i OG. Nie upychać fraz usługowych w politykach. Dla każdego istniejącego artykułu przygotować osobny `seoTitle` i `seoDescription` w CMS — **nie edytować pola `title`, `body` ani `excerpt`, ponieważ są widoczne na stronie**. Fallback może używać dotychczasowych wartości. Krótszy suffix nie może być następnie ponownie rozszerzany przez layout.

Metadane mają odzwierciedlać ofertę i treść danego URL-a. Nie dodawać niepotwierdzonych certyfikatów, superlatywów ani usług. Orientacyjnie dążyć do zwięzłych tytułów i opisów; długość w znakach nie jest sztywnym limitem Google. Tytuł i opis wyników mogą być przepisane przez wyszukiwarkę. [Tytuły wyników](https://developers.google.com/search/docs/appearance/title-link), [opisy wyników](https://developers.google.com/search/docs/appearance/snippet).

Uzupełnić `og:title`, `og:description`, `og:url`, `og:image`, locale oraz Twitter Card dla każdej klasy stron. Sprawdzić dostępność obrazka i jego rzeczywiste proporcje; dla artykułów użyć istniejącego odpowiedniego obrazu lub firmowego fallbacku. To poprawia jakość udostępniania, ale nie jest samodzielnym czynnikiem awansu. Zweryfikować favicon w HTML i HTTP; obecność konwencji `icon.png` w projekcie jest dobrym punktem wyjścia.

Nie inwestować czasu w rozbudowę `meta keywords`: Google nie używa go do indeksowania i rankingu. [Obsługiwane metatagi](https://developers.google.com/search/docs/crawling-indexing/special-tags).

## 5. GA4 i cookies — diagnoza oraz docelowy model

### Potwierdzony przebieg

W kodzie i przeglądarce widoczny jest identyfikator `G-2GL77N6KWP`. Sam skrypt GA ładuje się. Przy pierwszej wizycie próbuje wysłać `page_view` ze stanem `gcs=G100` i nie zapisuje cookies GA. Po „Akceptuj wszystkie” zapis lokalny zmienia się na `all`, ale w testowanej sesji nadal brak cookies GA. Po przeładowaniu tag ponownie wysyła sygnał odmowy.

Źródło aktualizacji w banerze:

```js
const gtag = (...args) => {
  window.dataLayer.push(args); // zwykła Array
};
```

Kod startowy używa standardowego `function gtag(){ dataLayer.push(arguments); }`. W audycie wywołanie tego standardowego `window.gtag('consent', 'update', ...)` spowodowało utworzenie `_ga` i `_ga_2GL77N6KWP`. To mocna przesłanka, że własny wrapper banera jest bezpośrednim źródłem problemu. Dodatkowo trzeba naprawić kolejność inicjalizacji, a następnie sprawdzić odbiór w rzeczywistym koncie GA4. [Integracja Consent Mode](https://developers.google.com/tag-platform/security/guides/consent).

### Zalecana konfiguracja

1. Zachować wygląd i napisy istniejącego banera. Wspólna inicjalizacja `dataLayer`/`gtag` ma istnieć przed użyciem przez komponenty.
2. Przyjąć **Basic Consent Mode**: nie ładować GA ani nie wysyłać żądań analitycznych przed zgodą. Po „Tylko niezbędne” analityka pozostaje wyłączona. Obecny wariant przypomina Advanced Mode z pingami bez cookies; sam taki ping nie dowodzi naruszenia prawa, ale Basic daje prostszy, jednoznaczny model dla obecnego banera. [Tryby zgody Google](https://developers.google.com/tag-platform/security/concepts/consent-mode).
3. Domyślnie ustawić odmowę. Odczytać zapisany wybór i dopiero po ważnej zgodzie uruchomić tag oraz konfigurację. Nie pozwolić, by późniejszy `default` kolidował z aktualizacją.
4. Po zgodzie zmieniać wyłącznie potrzebne ustawienia analityczne. `ad_storage`, `ad_user_data` i `ad_personalization` pozostawić `denied`, dopóki nie ma osobnego zakresu reklamowego. Obecny kod niepotrzebnie nadaje im `granted`.
5. Zapis zgody powinien zawierać wersję zasad i datę decyzji. Zaplanować okres ponownego pytania zgodny z przyjętą polityką. Stary zapis samego `all`/`necessary` obsłużyć przez migrację lub ponowne pytanie. Brak dostępu do localStorage nie może powodować błędu strony.
6. Wycofanie zgody przez istniejący przycisk w polityce cookies ma aktualizować stan, zatrzymywać pomiar i usuwać cookies analityczne. Samo usunięcie localStorage nie zatrzymuje aktywnych tagów. Sprawdzić również zmianę w drugiej karcie.
7. Rekomendowane **wyłączenie Clarity w tym zakresie**: użytkownik wymaga utrzymania tekstów, a baner przedstawia GA4. Test wykazał również cookies `_clck`/`_clsk` po diagnostycznym udzieleniu standardowej zgody Google. Nie zakładać, że naprawa GA pozostawi Clarity bez zmian. Ewentualny powrót do Clarity wymaga osobnego przeglądu jego ujawnienia i obsługi zgód. [Consent Mode Clarity](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode).
8. Sprawdzić czas życia cookies GA oraz retencję danych osobno — zapis „około 14 miesięcy” w obecnym dokumencie nie jest dowodem zgodnej konfiguracji. Ustawić parametry adekwatne do przyjętych zasad; gdy treść dokumentów nie opisuje faktycznego działania, oznaczyć to jako nierozwiązane ograniczenie obecnego zakresu. Nie obiecywać „pełnej zgodności RODO” na podstawie samego Consent Mode.

Nie potrzeba dodatkowej wtyczki ani Google Tag Managera tylko po to, by naprawić obecne `gtag`. Jeden sposób instalacji zmniejsza ryzyko podwójnych odsłon. Rozbudowana platforma zgód ma sens dopiero, gdy zakres narzędzi i kategorii rzeczywiście tego wymaga.

### Kontrola w panelu Google

Potwierdzić z właścicielem konta, że `G-2GL77N6KWP` odpowiada właściwej usłudze i strumieniowi www. Zweryfikować domenę, strefę `Europe/Warsaw`, uprawnienia, filtry ruchu wewnętrznego i developerskiego, wykluczenia, okres raportu i ustawienia zbierania danych. Sprawdzić Tag Assistant, DebugView i Realtime po zgodzie. Raporty standardowe oceniać po przetworzeniu danych, nie bezpośrednio po kliknięciu.

Połączyć Search Console z właściwą usługą GA4. Nie tworzyć drugiego konta ani nowego identyfikatora, jeśli obecne jest poprawne. Nie włączać funkcji reklamowych tylko w celu uzyskania raportów organicznych. Przejrzeć udostępnianie danych konta. [Ustawienia udostępniania GA](https://support.google.com/analytics/answer/1011397).

### Zdarzenia, które pokażą wartość ruchu

| Zdarzenie | Wyzwalacz | Zastosowanie |
|---|---|---|
| `page_view` | Pierwsza odsłona po zgodzie oraz każda rzeczywista zmiana trasy | Skuteczność stron wejścia PL/EN. |
| `generate_lead` | Wyłącznie `response.ok && data.ok` po formularzu | Główne kluczowe zdarzenie; nie kliknięcie „Wyślij”. |
| `click_phone` | Kliknięcie istniejącego linku `tel:` | Zamiar kontaktu; nie dowód odbycia rozmowy. |
| `click_email` | Kliknięcie linku `mailto:`, jeśli występuje | Zamiar kontaktu; nie dowód wysłania e-maila. Zwykłego tekstu e-mail nie liczyć jako linku. |
| `click_consultation` | Kliknięcie istniejącego CTA konsultacji | Pomocniczy etap ścieżki. |
| `view_pricing` | Jednokrotne osiągnięcie ustalonego progu widoczności cennika | Pomocnicza miara zainteresowania ofertą. |

Dopuszczalne parametry: język, oczyszczona ścieżka, nazwa komponentu, identyfikator CTA. Nie wysyłać imion, e-maili, numerów telefonów użytkowników, treści wiadomości ani wolnego tekstu tematu. Nie przekazywać parametrów URL zawierających takie dane.

Wybrać jedną metodę obsługi SPA: automatyczną zmianę historii albo własny listener tras. Własny pomiar wymaga wyłączenia kolidującego automatycznego `page_view`; każda odsłona ma wystąpić raz. W wykonanym teście przejścia do bloga po odmowie nie zarejestrowano nowego żądania GA w oknie obserwacji — pełny test po naprawie zgody jest nadal potrzebny. Kotwice `#kontakt`/`#cennik` nie powinny generować fikcyjnych odsłon stron. [Pomiar odsłon](https://developers.google.com/analytics/devguides/collection/ga4/views).

Test sukcesu formularza przeprowadzić na środowisku testowym z kontrolowaną skrzynką albo przez stub API. W audycie nie wysyłano wiadomości.

## 6. Dane strukturalne

Wspólny graf powinien wskazywać jeden podmiot `AccountingService` z `@id`, np. `https://www.montebiuro.pl/#organization`, oraz powiązane `WebSite` i właściwą `WebPage`. Typ księgowy jest szczegółowym opisem firmy; nie trzeba przedstawiać tej samej siedziby jako kilku niezależnych biznesów.

Zweryfikować: nazwę działalności, adres, oba telefony, godziny, współrzędne rzeczywistej lokalizacji, logo i autentyczne profile w `sameAs`. Nie wybierać jednego z dwóch pinów z kodu na chybił trafił. Ceny, certyfikaty, doświadczenie i członkostwa w schema muszą być zgodne z treścią oraz stanem faktycznym. Nie dopisywać ocen lub opinii, których strona nie pokazuje. [Dane lokalnej firmy](https://developers.google.com/search/docs/appearance/structured-data/local-business).

`BlogPosting`: prawidłowy URL, `mainEntityOfPage`, język, rzeczywista data publikacji/modyfikacji, wydawca powiązany z firmą i istniejący obraz. Autora dodać dopiero po potwierdzeniu, kto odpowiada za artykuł; samo pole w CMS nie jest dowodem autorstwa. Nie tworzyć fikcyjnych autorów w JSON-LD.

Breadcrumbs artykułu: strona główna → blog → artykuł, zgodnie z obecną widoczną nawigacją. Nie wprowadzać nowych widocznych okruszków. Globalne FAQ usunąć z podstron, na których tych pytań nie ma, i z EN, gdzie nie odpowiada językowi treści. Nie traktować FAQ schema jako sposobu na dodatkowe wyniki Google: według aktualizacji Google funkcja FAQ rich results nie pojawia się od 7 maja 2026 r. [Aktualizacje Google Search](https://developers.google.com/search/updates).

Walidacja: poprawny JSON, zgodność z treścią, Schema Markup Validator i Rich Results Test dla obsługiwanych typów. Poprawny test nie gwarantuje wyświetlenia rozszerzenia w wynikach.

## 7. Szybkość i dostępność bez przeprojektowania

| Pomiar laboratoryjny strony głównej | Telefon | Komputer |
|---|---:|---:|
| Lighthouse Performance | 61/100 | 100/100 |
| LCP | 6,3 s | 0,6 s |
| FCP | 2,8 s | 0,4 s |
| TBT | 450 ms | 20 ms |
| CLS | 0 | 0 |
| Accessibility | 91/100 | 91/100 |
| SEO | 100/100 | 100/100 |

To pojedyncze odczyty ze sztucznym profilem urządzenia i sieci; wynik zależy od warunków, cache i obciążenia komputera. **SEO 100/100 nie wykryło pustej mapy ani błędnych relacji językowych.** Nie oznacza pełnego zdrowia SEO. TBT nie zastępuje INP.

Plan optymalizacji:

1. Włączyć responsywne warianty zdjęć i WebP/AVIF przez obsługiwany mechanizm hostingu/Next.js. Zachować te same fotografie, kadry i style. `team.jpg` ma 155 931 B; Lighthouse szacuje około 141 KiB możliwej oszczędności dla obrazu na telefonie. Zweryfikować jakość wzrokowo i nie traktować szacunku jako gwarancji.
2. Zdjęcia zespołu niżej na stronie pozostawić lazy; priorytet dla rzeczywistego elementu LCP. Sprawdzić oba warianty zdjęcia w hero, prawidłowe `sizes`, wymiary i proporcje. Nie zmieniać rezerwowanego miejsca ani kadrowania.
3. Ograniczyć uruchamianie GA do zgody oraz wyłączyć Clarity w obecnym zakresie. Lighthouse wykazał około 71 KiB niewykorzystanego JS w tagu Google w tym przebiegu. Nie preconnectować usług analitycznych przed zgodą tylko dla punktacji.
4. Przejrzeć zakres komponentów klienckich i animacji, koszt nasłuchów, bundle i renderowanie. Optymalizować zachowując te same efekty, kolejność i układ.
5. Sprawdzić rzeczywiście pobierany krój pisma. Kod zawiera Google Fonts `@import`, ale nie wolno zakładać, że jest stosowany. Ewentualne lokalne fonty mają odtworzyć aktualny wygląd, a nie niechcący zmienić fallback na inny krój.
6. Sprawdzić cache i TTFB artykułów: `force-dynamic` kontra zamierzona rewalidacja. Wykorzystać kontrolowaną rewalidację CMS i zachować poprawną treść podczas krótkich awarii. Nie cache'ować błędów jako poprawnych artykułów.
7. Poprawić semantykę pól formularza i nagłówków bez zmiany tekstu, rozmiaru, odstępów i koloru. Ostrzeżenia wymagające widocznych zmian, np. wyróżnienie linków, zapisać jako poza zakresem.

Cel dla rzeczywistych użytkowników: LCP ≤ 2,5 s, INP ≤ 200 ms i CLS ≤ 0,1 w 75. percentylu, osobno mobile/desktop. Po wdrożeniu zbadać dane CrUX/Search Console, jeżeli ruch wystarcza do raportowania. Brak danych terenowych nie jest błędem witryny. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## 8. Jak docierać do osób szukających księgowości

### Frazy i intencje

Poniższa mapa służy wyborowi metadanych i monitoringu; nie przedstawia zmierzonych wolumenów ani obietnicy pozycji.

| Grupa | Przykładowe zapytania | Obecny cel |
|---|---|---|
| Lokalny wybór biura | biuro rachunkowe Kraków, księgowa Kraków, księgowość Kraków | `/` i Profil Firmy |
| Blisko siedziby | biuro rachunkowe Płaszów, księgowa Podgórze, biuro rachunkowe Myśliwska | Profil Firmy, prawdziwy adres i obszar obsługi; bez fikcyjnych lokalizacji |
| JDG | księgowość JDG Kraków, biuro rachunkowe dla jednoosobowej działalności | `/`, obecne usługi i cennik |
| Spółki | pełna księgowość Kraków, księgowość spółki z o.o. Kraków | `/`, istniejąca oferta |
| Kadry | kadry i płace Kraków, obsługa kadrowo-płacowa | `/`, istniejąca oferta |
| Obsługa EN | English-speaking accountant Krakow, accounting firm Krakow, bookkeeping Poland | `/en/` |
| Pytania przedsiębiorców | forma opodatkowania, zakładanie JDG, tematy VAT i KSeF | Właściwy istniejący artykuł PL/EN |

Sekcja `/#uslugi` nie jest osobną stroną z własnym meta title. Przy jednej stronie usługowej kilka intencji konkuruje o ten sam dokument. To ograniczenie przyjętego zakresu; nie da się go obejść niewidocznym tekstem ani mnożeniem słów w metatagach. Istniejący blog daje dodatkowe wejścia informacyjne, ale należy mierzyć, czy prowadzą do kontaktu.

Publiczne wyszukiwanie ujawniło m.in. [Krakowskie Biuro Rachunkowe](https://br-krakow.pl/), [APIS](https://www.biurorachunkowe-apis.pl/index_en.html) i [Tax & Money](https://taxm.pl/en/). Ich prezentacja obejmuje podobne intencje lokalne i anglojęzyczne. To próbka rynku, nie ranking Google z ustalonej lokalizacji. Rekomendacja: monitorować te grupy zapytań z Krakowa i oddzielać wyniki map od organicznych. Nie ma podstaw do przypisania MonTe konkretnej pozycji na podstawie takiej próbki.

### Profil Firmy w Google — wysoki priorytet poza stroną

Nie potwierdzono dostępu ani stanu profilu. Najpierw odszukać istniejącą wizytówkę, sprawdzić właściciela i ewentualne duplikaty; nie zakładać kolejnej automatycznie.

- Zweryfikować firmę i dobrać najtrafniejszą dostępną kategorię główną odpowiadającą biuru rachunkowemu. Kategorie dodatkowe tylko dla realnie świadczonych usług.
- Ujednolicić nazwę, adres, telefony, godziny i adres strony. Nazwa profilu ma być rzeczywistą nazwą firmy, bez dopisywania list fraz.
- Ustawić dokładny pin i zasady odwiedzin zgodnie z rzeczywistą obsługą klientów. Nie tworzyć oddziałów tylko dla pozycji w dzielnicach.
- Uzupełnić usługi JDG/spółki/kadry oraz język obsługi, jeżeli odpowiednie pola są dostępne. Dodać autentyczne zdjęcia biura i zespołu, godziny świąteczne i aktualizacje oferty w profilu.
- Zbierać uczciwe opinie od rzeczywistych klientów; bez kupowania, wynagrodzeń, selekcjonowania wyłącznie zadowolonych osób lub narzuconej treści. Odpowiadać bez ujawniania informacji o rozliczeniach klientów.
- Link strony oznaczyć np. `?utm_source=google&utm_medium=organic&utm_campaign=profil_firmy`; canonical pozostawić czysty. Oddzielnie śledzić kliknięcia strony i połączenia raportowane przez Profil Firmy.

Google opisuje lokalne wyniki przez trafność, odległość i rozpoznawalność. Kompletność profilu, poprawne dane i opinie mogą pomagać; odległości od wyszukującego nie da się naprawić metatagiem. [Wskazówki Google dla lokalnych firm](https://support.google.com/business/answer/7091?hl=pl).

### Rozpoznawalność i linki

Zweryfikować spójność nazwy/adresu/telefonu w prawdziwych profilach społecznościowych, lokalnych katalogach i organizacjach branżowych, do których firma rzeczywiście należy. Publiczne katalogi mogą opisywać osobne działalności wspólniczek; nie scalać ich bez potwierdzenia właściwego podmiotu. W stronie widoczna jest spółka cywilna, więc aktualność informacji trzeba oceniać świadomie.

Pozyskiwać naturalne wzmianki od rzeczywistych partnerów, lokalnych organizacji przedsiębiorców i wydarzeń. Nie kupować masowych pakietów linków. Po dostępie do GSC przejrzeć raport linków i najważniejsze utracone/stare adresy. Bing Webmaster Tools można dodać jako drugi kanał monitorowania po uporządkowaniu sitemap; nie zastępuje działań Google.

## 9. Search Console i pomiar efektów

1. Zweryfikować usługę domenową przez DNS lub wykorzystać istniejącą. Sprawdzić również, czy historyczne dane nie są w innej usłudze adresowej.
2. Wyeksportować ostatnie 3–6 miesięcy: zapytania, strony, kraje i urządzenia; jeżeli historia jest krótsza, użyć dostępnego okresu. Oddzielić markę MonTe od zapytań o usługę.
3. Sprawdzić indeksowanie, mapy, działania ręczne, bezpieczeństwo oraz wybrane przez Google adresy kanoniczne. Zbadać `/`, `/en/`, listy bloga i reprezentatywne artykuły obu języków przez Inspekcję URL.
4. Po naprawie przesłać mapę i poprosić o ponowne sprawdzenie kluczowych adresów. Nie traktować zgłoszenia jako gwarancji indeksacji.
5. Zarejestrować datę każdego wdrożenia. W pierwszych dniach badać błędy techniczne; trendy organiczne porównywać w oknach 28 dni i, gdy dostępne, rok do roku.

Search Console pokazuje wyświetlenia i kliknięcia w wyszukiwarce niezależnie od zgód GA. GA mierzy zachowania po wejściu w zakresie jego konfiguracji i zgód. Te liczby nie muszą być równe. [Zakres Search Console](https://support.google.com/webmasters/answer/9128668).

| KPI | Źródło | Jak oceniać |
|---|---|---|
| Kliknięcia i wyświetlenia zapytań usługowych bez marki | GSC | PL/EN, urządzenie, strona; porównywalne okresy 28 dni |
| CTR strony głównej i artykułów | GSC | Razem ze zmianą pozycji i zestawu zapytań, nie sam procent |
| Poprawnie zindeksowane docelowe URL-e | GSC + mapa | Usunąć niezamierzone wykluczenia; nie wymagać indeksacji każdego dokumentu prawnego |
| Zapytania formularzem z ruchu organicznego | GA4 + rzeczywiste zgłoszenia | `generate_lead`, bez podwójnych zdarzeń i danych osobowych |
| Zamiar kontaktu telefonicznego | GA4 / Profil Firmy | Kliknięcia telefonu osobno od potwierdzonych rozmów |
| Jakość kontaktów | Rejestr biznesowy właściciela | Zapytania pasujące do oferty i zawarte umowy, bez przesyłania szczegółów do GA |
| LCP/INP/CLS | GSC/CrUX, pomocniczo Lighthouse | W pierwszej kolejności telefon |

Cel liczbowy wzrostu ustalić po uzyskaniu danych bazowych. Wzrost liczby użytkowników w GA tuż po naprawie może wynikać z lepszego pomiaru, a nie z większego ruchu. Rozpoznawać to przez równoległe kliknięcia GSC. Samo zainstalowanie Analytics, cookies lub GTM nie podnosi pozycji.

## 10. Kolejność wdrożenia i szacowany nakład

Szacunki obejmują wykonanie i podstawowe testy, nie czas oczekiwania na Google ani pozyskiwanie opinii. Są orientacyjne; panel hostingu i konfiguracja kont mogą zmienić zakres.

| Etap | Zadanie | Właściciel | Nakład | Kryterium odbioru |
|---|---|---|---:|---|
| Dni 1–3 | S01: jeden generator sitemap | Programista | 2–4 h | Mapa z pełnym zestawem poprawnych URL-i; żadnych przekierowań/noindex; awaria CMS nie daje pozornego sukcesu. |
| Dni 1–3 | A01–A03: GA, kolejność zgód, wyłączenie Clarity | Programista + administrator GA | 5–8 h | Macierz zgód przechodzi; zdarzenia po zgodzie widoczne w DebugView; odmowa nie uruchamia analityki. |
| Dni 2–5 | S02–S06, S09–S10: URL-e, języki i linki | Programista | 5–9 h | Canonical i hreflang spójne, właściwe języki, brak utraty artykułu i błędnych przełączników. |
| Dni 4–7 | A04: zdarzenia kontaktowe | Programista + administrator GA | 3–5 h | Jeden `generate_lead` po sukcesie; zero danych osobowych; pojedyncze odsłony SPA. |
| Dni 4–10 | S07, S11–S12: schema i metadane | Programista + osoba potwierdzająca dane firmy | 4–7 h | Jeden podmiot, poprawne dane, metadane per URL, brak zmian widocznych pól CMS. |
| Dni 7–14 | S08, S13–S15: wydajność i semantyka | Programista | 5–9 h | Porównanie mobilne przed/po, poprawne etykiety i nagłówki, brak regresji wyglądu. |
| Dni 1–14 | GSC, GA i Profil Firmy | Właściciel kont / osoba SEO | 3–5 h | Dostępy i pomiar bazowy, poprawna mapa, zweryfikowany profil lub uruchomiona procedura weryfikacji. |
| Dni 15–30 | Indeksacja, CTR, lokalne dane i linki | Osoba SEO + właściciel | 2–4 h/tydzień | Raport błędów, monitoring zapytań, uporządkowane rzeczywiste profile. |
| Dni 31–90 | Ocena skuteczności | Osoba SEO + właściciel | 1–2 h/tydzień | Porównanie GSC i kontaktów; dalsze korekty metadanych tylko z uzasadnieniem w danych. |

Pierwsze wdrożenie techniczne i konfiguracja: orientacyjnie **27–47 godzin**, rozłożone na około dwa tygodnie przy dostępnych kontach i informacjach. Zakresy mogą się częściowo pokrywać. Nie jest to wycena ani obietnica terminu indeksacji.

### Pliki przewidziane do zmian

- `monte-nextjs/src/app/sitemap.ts`, `src/app/sitemap.xml/route.ts`, `src/lib/sanity.ts`: jedno źródło mapy, kompletność i daty.
- `src/app/layout.tsx`, `src/components/CookieConsent.tsx`, `ResetCookiesButton.tsx`: wspólna inicjalizacja, zgody, wycofanie, wyłączenie Clarity.
- layouty `(pl)` i `en`, strony bloga i `[slug]`, strony dokumentów: canonical, hreflang, OG, title i język HTML.
- `src/components/Header.tsx`: poprawne cele istniejącego przełącznika języka.
- `src/components/SchemaOrg.tsx`: spójny graf i oznaczenia zależne od strony.
- `src/components/Contact.tsx` oraz istniejące linki i CTA: pomiar zdarzeń, poprawne etykiety formularza.
- `next.config.js`, komponenty obrazów i ewentualnie konfiguracja hostingu: optymalizacja i przekierowania.
- aktywny schemat Sanity: osobne `seoTitle`, `seoDescription`, relacja tłumaczeń; w repo są różne katalogi Studio, więc przed wdrożeniem ustalić, który jest produkcyjny.

### Macierz odbioru

| Scenariusz | Wymagany rezultat |
|---|---|
| Nowa wizyta bez decyzji | Baner widoczny; przy wybranym Basic Mode brak GA i jego cookies. |
| „Tylko niezbędne” i ponowne wejście | Odmowa zapamiętana; brak analityki, strona działa normalnie. |
| „Akceptuj wszystkie” i ponowne wejście | Analityka startuje raz, zgoda działa również po odświeżeniu; reklamy pozostają wyłączone. |
| Zmiana zgody | Odmowa zatrzymuje dalszy pomiar i usuwa cookies GA; brak ponownego uruchomienia przy nawigacji. |
| Brak localStorage / adblocker | Brak awarii formularza lub strony; brak danych nie jest błędnie interpretowany jako brak odwiedzin. |
| Przejście `/` → blog → artykuł | Po zgodzie jedna odsłona na trasę; poprawny URL i tytuł; bez odsłon za samo kliknięcie kotwicy. |
| Formularz: sukces, błąd, ponowne kliknięcie | Tylko rzeczywisty sukces daje jedno zdarzenie kontaktowe. |
| Przeglądarka EN otwierająca artykuł PL | Pozostaje na wybranym adresie do świadomej zmiany języka. |
| Każdy hreflang | Rzeczywisty odpowiednik, 200, indeksowalny, własny canonical, wzajemny link. |
| Nieistniejący wpis / awaria CMS | Brak fikcyjnej strony 200 z artykułem; kontrolowany błąd albo poprawny cache. |
| Porównanie wyglądu | Te same teksty i układ przy 390, 768 i 1440 px; brak zmian w kadrach, odstępach i menu. |

Przed produkcją: porównać teksty widoczne przed/po, wykonać zrzuty i przetestować stany banera; uruchomić build/lint właściwej aplikacji. Nie publikować metadanych, których nie potwierdzono. Zachować możliwość wycofania wdrożenia; sprawdzić cache i publiczny HTML po publikacji.

## 11. Czego ten plan nie obiecuje

Nie ma rzetelnej podstawy do gwarantowania pierwszego miejsca ani konkretnego procentu wzrostu. Ten plan usuwa stwierdzone przeszkody, poprawia pomiar i wykorzystuje obecne treści. Zasięg tematyczny jednej strony usługowej pozostanie ograniczeniem, jeśli w przyszłości celem będzie osobna widoczność dla wielu usług i lokalizacji.

Poza obecnym zakresem pozostają: nowe podstrony, przeredagowanie artykułów, zmiany nagłówków widocznych, dodatkowe sekcje, redesign i płatne kampanie. Nie stosować ukrytych słów kluczowych, fikcyjnych lokalizacji, kupowanych opinii ani sztucznego schema ocen. `meta keywords`, mnożenie schema czy plik `llms.txt` nie zastąpią poprawnej indeksacji i realnej rozpoznawalności.

**Do wykonania planu potrzebne będą:** dostęp do właściwej usługi GA4 i Search Console, istniejącego Profilu Firmy, konfiguracji domeny/Vercel oraz aktywnego Studio; potwierdzenie danych firmy i rzeczywistego pinu. Audyt i niniejszy plan są gotowe niezależnie od tych dostępów. Kod aplikacji, treści i konfiguracja produkcji nie zostały zmienione.
