# MonTe — wykonanie planu i odbiór techniczny

Data: 21 października 2026 r. Zakres: repozytorium aplikacji i przygotowanie do publikacji. **Nie opublikowano produkcji, nie zmieniono ustawień kont ani dokumentów w Sanity.**

Teksty widoczne, fotografie, kadry, kolory i układ pozostają takie same. Zmieniono metadane dla wyszukiwarek i podglądów, semantykę HTML, zachowanie adresów i analitykę. Dodatkowe H1 w treści artykułów są teraz H2 ze stylem odtwarzającym poprzedni wygląd.

Instrukcja działań na kontach: [INSTRUKCJA-DLA-WLASCICIELA.md](INSTRUKCJA-DLA-WLASCICIELA.md). Propozycje do weryfikacji w CMS: [26 metadanych](propozycje-metadanych.csv) i [13 par tłumaczeń](PARY-TLUMACZEN.md).

## Realizacja punktów audytu

| Punkty | Zmiana w kodzie | Pozostało poza repozytorium |
|---|---|---|
| S01 | Jeden generator `app/sitemap.ts`; 10 stron stałych + 26 artykułów PL/EN; rzeczywiste daty CMS, kodowanie slugów, brak cichego pomijania CMS podczas awarii. | Publikacja i zgłoszenie mapy w GSC; alerty hostingu. |
| A01–A03 | Basic Consent Mode, standardowy `gtag(arguments)`, wersja i data decyzji, ponowne pytanie o stare zgody, wycofanie/wygaśnięcie, synchronizacja kart, usuwanie cookies; wyłączenie Clarity. | Potwierdzić identyfikator, ustawienia GA, retencję i przyjęte okresy zgód/cookies. |
| A04 | Własne odsłony tras, zdarzenia telefonu/e-maila/CTA/cennika; `generate_lead` tylko po `response.ok && data.ok`; blokada podwójnego wysłania; oczyszczone URL-e i statyczne identyfikatory. | Wyłączyć kolidujący automatyczny pomiar w GA4, sprawdzić rzeczywisty odbiór i oznaczyć kluczowe zdarzenie. |
| S02–S03 | Canonical, OG, schema i linki ze standardem `https://www.montebiuro.pl/.../`; osobne metadane dokumentów. | Sprawdzenie publicznego HTML po wdrożeniu. |
| S04 | Odczyt jawnych relacji istniejącej wtyczki Sanity i opcjonalnego pola `translation`; tylko jednoznaczne, wzajemne, opublikowane pary. | Potwierdzić i zapisać brakujące relacje w Studio. Dwie pary są już kompletne; jedna historyczna relacja wskazuje nieopublikowane/brakujące dokumenty. |
| S05–S06 | Usunięcie automatycznego przekierowania według języka przeglądarki; poprawne przełączniki dokumentów i artykułów. | Brak pary artykułu oznacza przejście do listy w drugim języku, bez fałszywego hreflang. |
| S07, S11 | Jeden `AccountingService` ze stałym `@id`, `WebSite`, właściwe `WebPage`/`BlogPosting` i okruszki artykułów. Usunięte sprzeczne współrzędne, globalne FAQ, zduplikowane podmioty i niepotwierdzone deklaracje. | Potwierdzenie danych firmy i pinu; nie dodano wymyślonego autora, ocen ani współrzędnych. |
| S08 | Włączona optymalizacja obrazów WebP/AVIF, `sizes`, priorytet obrazu hero na mobile i Sharp; GA dopiero po zgodzie, Clarity wyłączone. Efekty animacji i wygląd zachowane. | Pomiar na rzeczywistym hostingu oraz CrUX/GSC. Brak gwarancji docelowych Core Web Vitals na podstawie lokalnego testu. |
| S09 | Trwałe 308 hosta do adresu z końcowym `/`; osobna reguła strony głównej. | Vercel/DNS może przekierować wcześniej — trzeba sprawdzić panel i łańcuch HTTP/HTTPS. |
| S10 | Osobne root layouty PL i EN, prawidłowy `html lang` już w odpowiedzi serwera. | Przejście między PL/EN jest pełnym ładowaniem dokumentu; adresy publiczne pozostają takie same. |
| S12 | Krótki suffix, metadane i podglądy per URL, pola `seoTitle`/`seoDescription` w obu schematach Studio; bez edycji `title`/`body`/`excerpt`. | Ustalić aktywne Studio, wdrożyć schemat, sprawdzić i opublikować propozycje SEO. |
| S13–S14 | Jeden H1 artykułu, dotychczasowy wygląd nagłówków w body; etykiety formularza połączone przez `id`/`htmlFor`. | Zmiana wyróżnienia linków/koloru pozostaje poza zakresem zachowania wyglądu. |
| S15 | ISR 300 s; usunięcie `force-dynamic`, pełne listy bez limitów 100/20; błędy CMS propagowane. Ekran ładowania PL ograniczony do listy, aby nie powodował soft 404 artykułów. | Monitoring publikacji/wycofania, błędów i cache na produkcji. |

## Udział Claude Code

Użyto lokalnego Claude Code **2.1.304** z rozszerzenia VS Code, model **`claude-opus-5-5`**. Dostępność modelu została sprawdzona rzeczywistym wywołaniem. Claude zaimplementował `analytics.ts`, `Analytics.tsx`, logikę `CookieConsent`, wycofanie w `ResetCookiesButton` oraz pomiar/etykiety w `Contact`.

Implementacja została następnie przejrzana, zintegrowana i przetestowana. Dodatkowo ustawiono oczyszczony URL przed konfiguracją GA i ograniczono UTM do jawnej listy dopuszczonych wartości. Claude nie otrzymał zadania publikacji ani modyfikowania CMS.

## Walidacja

- **Next.js:** `npm run build` — poprawna kompilacja, kontrola typów i generowanie wszystkich stron; `npm run lint` — bez błędów i ostrzeżeń ESLint. Znane ostrzeżenia narzędzi dotyczą starej bazy Browserslist i przestarzałego eksportu biblioteki Sanity, nie błędów wdrożenia.
- **Studio:** build `monte-sanity-studio` zakończony poprawnie; `sanity schema validate` dla `monte-nextjs/sanity` — 0 błędów, 0 ostrzeżeń schematu. Nie wykonano `sanity deploy`. Wygenerowane pliki buildów Studio nie wchodzą do zmiany.
- **SEO:** [36 adresów](validation/seo.json): HTTP 200, własny canonical/OG URL, poprawny język serwerowy, jedna sekcja H1, poprawny JSON-LD, wzajemny hreflang; osobno 404 brakującego artykułu PL/EN i zwykłej strony, robots, ikony, OG image i przekierowanie 308.
- **Analityka:** [macierz przeglądarkowa](validation/analytics.json): nowa wizyta, odmowa/powrót, stary/nieaktualny zapis, zgoda, pojedyncze odsłony SPA, kotwice, cennik, telefon/CTA, sukces i błąd formularza, szybkie podwójne wysłanie, powrót ze zgodą, wycofanie/ponowna zgoda, druga karta, blokada localStorage, adblocker, przeglądarka EN otwierająca artykuł PL. Brak błędów JS w tych scenariuszach.
- **Przypadki brzegowe:** [test dodatkowy](validation/browser-edges.json): wycofanie podczas pobierania skryptu GA, ponowna zgoda po tym wycofaniu, wygaśnięcie przy powrocie do karty i poprawne cele wszystkich istniejących przełączników języka.
- **Awaria CMS:** [kontrolowany test](validation/cms-failure.json) wykonuje rzeczywiste funkcje z odrzucającym klientem CMS; potwierdza propagowanie błędu i brak częściowej mapy udającej sukces. Nie wywoływano awarii produkcyjnego CMS ani nie symulowano długiej awarii infrastruktury Vercel.
- **Wygląd:** [15 porównań](validation/visual-comparison.json): PL/EN home oraz 3 artykuły, w tym artykuły z 17/18 pierwotnymi H1, przy 390/768/1440 px. Identyczny widoczny tekst, typografia, kolory, ustawienia kadru i geometria zmierzonych elementów; brak poziomego przepełnienia. Animacje zamrożono wyłącznie w przeglądarce pomiarowej. Zrzuty przed/po pozostają lokalnie w `validation/before` i `validation/after`.
- **Obrazy:** [test HTTP](validation/images.json): oryginał `team.jpg` 155 931 B; wariant AVIF 640 px 11 927 B; wariant 1080 px 22 952 B. Te same pliki źródłowe i style, bez zmiany fotografii lub kadrowania. Inne urządzenia mogą pobierać inny wariant.
- **Lighthouse lokalny, mobile:** Performance 90, Accessibility 96, SEO 100, LCP 2,83 s, FCP 1,77 s, TBT 223,5 ms, CLS 0. Jeden test na lokalnym buildzie, podczas innych zadań, z ostrzeżeniem o obciążeniu/wolniejszym CPU. **Nie jest porównywalnym pomiarem produkcji ani potwierdzeniem osiągnięcia LCP ≤ 2,5 s.** Szczegóły: [podsumowanie](validation/performance-summary.json); pełny JSON pozostaje lokalnie.

Testy analityki pobierały rzeczywisty skrypt GA, ale wszystkie żądania zbierające GA/Clarity były przechwytywane i otrzymywały lokalną odpowiedź 204. API formularza zastąpiono kontrolowaną odpowiedzią. Nie wysłano testowych wiadomości ani testowych zdarzeń do rzeczywistej usługi. Odbiór w GA4 musi sprawdzić właściciel.

Nie zmieniono fontów: w testowanej przeglądarce deklaracja CSS to `Inter, system-ui, sans-serif`, a zbiór załadowanych fontów internetowych był pusty. Wymuszenie pobrania Inter mogłoby zmienić wygląd względem obecnego fallbacku.

## Odtworzenie testów

W katalogu `monte-nextjs`: `npm ci`, `npm run build`, `npm run start -- --port 3101`. Wymagany Node.js ≥ 20.9. W osobnym katalogu narzędzi zainstaluj Playwright; skrypty korzystają z lokalnego Chrome i nie dodają zależności testowych do aplikacji produkcyjnej.

Z katalogu repozytorium:

```powershell
node docs/audyt-seo-2026-10-21/verify-seo.cjs 'PELNA_SCIEZKA_DO/node_modules/playwright'
node docs/audyt-seo-2026-10-21/verify-analytics.cjs 'PELNA_SCIEZKA_DO/node_modules/playwright'
node docs/audyt-seo-2026-10-21/verify-browser-edges.cjs 'PELNA_SCIEZKA_DO/node_modules/playwright'
node docs/audyt-seo-2026-10-21/verify-cms-failure.cjs
```

`verify-seo` porównuje kompletność ze snapshotem CMS z dnia wdrożenia. Jeśli później dodasz/usuniesz artykuły, zaktualizuj snapshot przed oceną liczby URL-i. Skrypt `visual-check.cjs` przyjmuje ścieżkę Playwright, bazowy URL i nazwę `before`/`after`; porównanie wykonuje `compare-visual.cjs`.

Po publikacji powtórz kontrole publicznego hosta i wykonaj konfigurację z instrukcji właściciela. Lokalny commit i zielony build nie zastępują tych czynności.
