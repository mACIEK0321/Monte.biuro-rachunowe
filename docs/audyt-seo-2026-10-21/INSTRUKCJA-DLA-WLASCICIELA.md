# Wdrożenie SEO MonTe — czynności właściciela

Data: 21 października 2026 r.

Kod został przygotowany lokalnie. Publikacja strony, konfiguracja kont Google/Vercel i zapis danych w produkcyjnym Sanity wymagają opisanych poniżej czynności. Nie zmieniono tekstów widocznych na stronie, zdjęć ani projektu graficznego. Zmieniły się metadane, kod techniczny i pomiar. Nie zmieniaj pól `title`, `body`, `excerpt` ani slugów przy wykonywaniu tej instrukcji.

Zacznij od punktów 1–3. Punkt 4 wykonaj po opublikowaniu kodu. Weryfikacja Profilu Firmy i porządkowanie CMS mogą odbywać się równolegle.

## 1. GA4 — ustawienia przed publikacją

1. Otwórz [Google Analytics](https://analytics.google.com/) i zaloguj się kontem właściciela.
2. Wybierz właściwą usługę MonTe. Wejdź w **Administracja → Zbieranie i modyfikowanie danych → Strumienie danych → strumień WWW**.
3. Sprawdź domenę `www.montebiuro.pl` i identyfikator pomiaru **`G-2GL77N6KWP`**. Tego identyfikatora używa kod. Jeśli nie jest Twój lub dotyczy innej usługi, zatrzymaj publikację i przekaż właściwy identyfikator programiście. Nie zakładaj drugiej usługi tylko dlatego, że jeszcze nie widać danych.
4. W strumieniu znajdź **Pomiar zaawansowany**. Dla przygotowanego sposobu pomiaru wyłącz ten przełącznik. Własny kod wysyła odsłony i zdarzenia kontaktowe; automatyczne pomiary historii przeglądarki i formularzy mogłyby je dublować lub zbierać dodatkowe dane. Jeżeli potrzebujesz innych automatycznych zdarzeń, pozostaw je dopiero po indywidualnej weryfikacji, a w szczególności wyłącz **Wyświetlenia strony → zmiany strony na podstawie zdarzeń historii przeglądarki** oraz **Interakcje z formularzem**.
5. Sprawdź w ustawieniach usługi strefę czasową **Polska / Europe/Warsaw** i walutę **PLN**.
6. W **Przechowywanie danych** sprawdź retencję i uzgodnij ją z przyjętymi zasadami firmy. To osobne ustawienie od czasu życia cookies.
7. Sprawdź **Filtry danych**. Nowy filtr ruchu wewnętrznego najpierw ustaw w trybie testowym; nie wykluczaj przypadkiem ruchu klientów. Podczas późniejszego testu uwzględnij filtr ruchu deweloperskiego.
8. Nie włączaj Google Signals ani personalizacji reklam na potrzeby tego wdrożenia. Kod pozostawia zgody reklamowe jako odmowę.

Przyjęte w kodzie parametry do potwierdzenia przez właściciela: ponowne pytanie o zgodę po **180 dniach**, cookies GA maksymalnie **426 dni**, bez odnawiania terminu przy kolejnych odsłonach. Stare zapisy `all` i `necessary` powodują ponowne wyświetlenie istniejącego banera. Brak zgody oznacza brak ładowania GA. Clarity jest wyłączone.

Źródła: [ustawienia pomiaru zaawansowanego](https://support.google.com/analytics/answer/9216061?hl=pl), [ręczny pomiar odsłon](https://developers.google.com/analytics/devguides/collection/ga4/views), [inicjalizacja zgód](https://developers.google.com/tag-platform/security/guides/consent).

## 2. Vercel — domena i publikacja

1. Otwórz [Vercel](https://vercel.com/) i projekt obsługujący `www.montebiuro.pl`.
2. Sprawdź **Settings → Git**: repozytorium powinno być `mACIEK0321/Monte.biuro-rachunowe`. Zanotuj gałąź produkcyjną i aktualny działający deployment, aby można było do niego wrócić.
3. Sprawdź **Settings → Build and Deployment**: katalog aplikacji to **`monte-nextjs`**, framework Next.js, build `npm run build`, Node.js co najmniej **20.9** (wymaganie dodanego optymalizatora obrazów Sharp). Kod wymaga działania Next.js na hostingu; nie używaj statycznego eksportu HTML ani starego `index.html` w katalogu głównym repozytorium.
4. W **Settings → Domains** pozostaw `www.montebiuro.pl` jako domenę obsługującą stronę. Dla `montebiuro.pl` ustaw przekierowanie do `www.montebiuro.pl` ze statusem **308** (ewentualnie 301), z zachowaniem ścieżki i parametrów. Panel może mieć osobny wybór typu przekierowania. Nie zmieniaj rekordów poczty MX/SPF/DKIM przy tej operacji.
5. Gdy ustawienia GA4 z punktu 1 są gotowe, wyślij przygotowany commit do właściwej gałęzi. Sam lokalny commit nie publikuje strony. W PowerShell w katalogu repozytorium sprawdź `git status` i `git branch --show-current`, a następnie użyj `git push origin NAZWA_GALEZI` z rzeczywistą nazwą gałęzi. Jeśli nie jest to gałąź produkcyjna, najpierw użyj podglądu Vercel i swojego zwykłego sposobu zatwierdzania zmian.
6. Poczekaj na **Ready** w Vercel i sprawdź, czy deployment wskazuje hash przygotowanego commita. Samo odświeżenie starego deploymentu nie publikuje nowego kodu.
7. Otwórz stronę w nowym oknie prywatnym. Sprawdź stronę PL, EN, blog, artykuł, menu mobilne, baner i formularz. Nie wysyłaj seryjnych formularzy testowych na produkcyjną skrzynkę.
8. Otwórz `https://www.montebiuro.pl/sitemap.xml`: powinny pojawić się pełne adresy obu języków. Przy obecnej zawartości CMS jest ich **36**; późniejsza publikacja/wycofanie artykułu zmienia tę liczbę. Rewalidacja treści i mapy ma interwał **300 sekund**; pierwszy odczyt po tym czasie może uruchomić odświeżenie w tle, więc sprawdź ponownie po jego zakończeniu.
9. Sprawdź w terminalu, podstawiając także adres istniejącego artykułu:

   ```powershell
   curl.exe -I 'https://montebiuro.pl/blog/?utm_source=google'
   curl.exe -I 'http://montebiuro.pl/blog/'
   curl.exe -I 'https://www.montebiuro.pl/blog/nieistniejacy-wpis-testowy/'
   ```

   Wariant bez `www` powinien prowadzić trwale do końcowego adresu z `/`. Nieistniejący artykuł powinien zwracać **404**, a nie 200. Przekierowanie HTTP może być obsługiwane przez Vercel przed kodem aplikacji; sprawdź cały łańcuch opcją `-L`.
10. Jeżeli produkcja wykazuje regresję, wybierz wcześniejszy działający deployment i użyj funkcji rollback/promowania go do produkcji. Zanotuj przyczynę. Nie usuwaj projektu ani domeny.

Źródło: [przekierowania domen w Vercel](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

## 3. Potwierdzenie danych firmy i dokumentów

1. Sprawdź nazwę firmy, adres **ul. Myśliwska 8, 30-718 Kraków**, telefony **661 444 882** i **577 161 434**, godziny **pon.–pt. 08:00–16:00** oraz profil Instagram `montebiuro`.
2. Otwórz dokładną lokalizację biura w Google Maps. Sprawdź wejście do budynku i ustawienie pinu. Przekaż programiście potwierdzony link do miejsca oraz współrzędne. W kodzie były dwa sprzeczne punkty; oba usunięto z danych strukturalnych. Żaden nowy pin nie został zgadnięty.
3. Jeśli chcesz dodawać do danych strukturalnych certyfikaty, członkostwa lub autorów artykułów, potwierdź najpierw ich prawidłowość. Obecny kod nie publikuje tych niezweryfikowanych deklaracji ani fikcyjnych ocen.
4. Zleć osobie odpowiedzialnej za dokumenty sprawdzenie, czy ich opisy odpowiadają aktualnej konfiguracji. W polskiej polityce prywatności nadal znajduje się odniesienie do **`ukad.pl`**. Nie zostało zmienione, ponieważ polecenie zabrania zmian treści. Sprawdź też opis zapisów cookies, terminów i dostawców. Ewentualne poprawki treści wymagają odrębnej decyzji właściciela.

## 4. GA4 — sprawdzenie odbioru po publikacji

1. Otwórz [Tag Assistant](https://tagassistant.google.com/) i połącz go z `https://www.montebiuro.pl/`. Równolegle otwórz **DebugView** właściwej usługi GA4.
2. W świeżej sesji przed decyzją nie powinno być ładowania `gtag/js`, zdarzeń GA ani cookies `_ga`. Kliknij **Tylko niezbędne** i odśwież stronę: stan ma pozostać taki sam.
3. W nowej sesji kliknij **Akceptuj wszystkie**. Sprawdź, czy GA otrzymuje odsłonę; zgody reklamowe nadal mają być odmową. Jeśli DebugView nie widzi sesji, sprawdź połączenie Tag Assistant, blokadę reklam i filtr ruchu deweloperskiego.
4. Przejdź ze strony głównej do bloga i artykułu. Każda rzeczywista zmiana trasy ma dawać jedną odsłonę z właściwym tytułem. Kliknięcie kotwicy cennika/kontaktu nie może dodawać odsłony. Dwie odsłony za jedno przejście oznaczają konieczność ponownego sprawdzenia punktu 1.4 lub drugiej instalacji GA/GTM.
5. Kliknij telefon i przycisk konsultacji, a także przewiń do cennika. Oczekiwane zdarzenia: `click_phone`, `click_consultation`, `view_pricing`. `click_email` jest wysyłane tylko dla rzeczywistego linku `mailto:`; zwykły tekst adresu e-mail nie jest takim linkiem.
6. Formularz przetestuj na podglądzie z kontrolowaną skrzynką, albo uzgodnij jedną oznaczoną wiadomość testową. **`generate_lead` ma wystąpić dopiero po udanym przyjęciu formularza przez API.** Błąd formularza/API nie powinien go generować. Kod był testowany lokalnie ze stubem API, bez wysłania wiadomości.
7. Otwórz politykę cookies i kliknij **Zmień ustawienia cookies**. Pomiar powinien się zatrzymać, cookies GA zniknąć, a baner pojawić ponownie. Sprawdź też zmianę w drugiej otwartej karcie.
8. W **Administracja → Zdarzenia / Kluczowe zdarzenia** oznacz **`generate_lead`** jako kluczowe zdarzenie. Jeśli nazwy jeszcze nie ma, najpierw poczekaj na jej zarejestrowanie albo użyj dostępnej opcji dodania kluczowego zdarzenia o tej dokładnej nazwie. Nie oznaczaj samego kliknięcia „Wyślij” jako pozyskania kontaktu.
9. Ruch sprawdź także w **Czas rzeczywisty**. Raporty standardowe oceń po przetworzeniu danych. Wynik lokalnego testu technicznego nie potwierdza odbioru przez Twoją usługę GA4.

Źródło: [zdarzenia w GA4](https://support.google.com/analytics/answer/9322688?hl=pl).

## 5. Search Console — własność, mapa i pomiar bazowy

1. Otwórz [Search Console](https://search.google.com/search-console/). Najpierw sprawdź, czy masz już usługę domenową **`montebiuro.pl`** lub usługę adresową `https://www.montebiuro.pl/`.
2. Jeżeli domena istnieje u innego administratora, poproś go o dostęp. Jeżeli trzeba ją dodać, wybierz typ **Domena**, wpisz `montebiuro.pl` bez `https://` i skopiuj pokazany rekord TXT.
3. W panelu operatora DNS dodaj dokładnie ten rekord TXT dla domeny głównej. Pole host/nazwa zwykle ma wartość `@` lub jest puste — zastosuj wymagany format operatora. Nie zastępuj istniejących rekordów TXT. Wróć do GSC i kliknij **Zweryfikuj**; propagacja może wymagać czasu. Pozostaw rekord po weryfikacji.
4. Przed porównywaniem efektów wyeksportuj z **Skuteczność → Wyniki wyszukiwania** dostępne 3–6 miesięcy: zapytania, strony, kraje i urządzenia. Zapisz eksport z datą. Oddziel później markę MonTe od zapytań o usługę.
5. Po publikacji poprawionej strony otwórz **Mapy witryn**. Zgłoś `https://www.montebiuro.pl/sitemap.xml` lub `sitemap.xml`, zależnie od formatu pola. Nie zgłaszaj pustej starej mapy przed wdrożeniem.
6. W **Inspekcja adresu URL** sprawdź `/`, `/en/`, `/blog/`, `/en/blog/` oraz po 2 istniejące artykuły w każdym języku. Uruchom test aktywnego URL i porównaj canonical deklarowany przez stronę z wybranym przez Google.
7. Dla najważniejszych poprawionych adresów użyj prośby o indeksowanie. Nie wysyłaj masowo wszystkich dokumentów prawnych; zgłoszenie nie jest gwarancją indeksacji.
8. Sprawdź raporty **Indeksowanie stron**, **Ręczne działania**, **Problemy dotyczące bezpieczeństwa** i **Podstawowe wskaźniki internetowe**. Zapisz istniejące problemy, aby odróżnić je od nowych.
9. W GA4 wybierz **Administracja → Połączenia z usługami → Search Console** i połącz właściwą usługę GSC ze strumieniem WWW, jeśli nie była już połączona.

Źródła: [weryfikacja własności](https://support.google.com/webmasters/answer/9008080?hl=pl), [mapy witryn Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## 6. Sanity — relacje tłumaczeń i pola SEO

1. Otwórz Studio, w którym faktycznie publikujesz artykuły. Potwierdź projekt **`mlkhfxw8`**, dataset **`production`**, adres Studio oraz osobę, która je wdraża.
2. W repozytorium są dwa katalogi Studio: `monte-sanity-studio` i `monte-nextjs/sanity`. Przygotowano zgodne pola SEO w obu, ale **nie opublikowano żadnego Studio**. Właściwy katalog ustal na podstawie dotychczasowego procesu wdrożenia/adresu Studio. Sam projekt/dataset nie rozróżnia tych dwóch aplikacji.
3. W potwierdzonym katalogu Studio uruchom `npm ci`, następnie `npx sanity build`. Sprawdź lokalny podgląd. Jeśli Studio jest hostowane przez Sanity, opublikuj je przez `npx sanity deploy`, wybierając **dotychczasowy** adres Studio. Jeżeli korzystasz z innego hostingu, zastosuj istniejący pipeline zamiast zakładać nowe Studio.
4. Po wdrożeniu w artykule powinny być pola **SEO title**, **SEO description** i **Potwierdzone tłumaczenie**. Pole SEO title wpisuj bez `| MonTe`; strona dodaje suffix raz. Puste pola bezpiecznie korzystają z dotychczasowych wartości.
5. Otwórz [propozycje metadanych](propozycje-metadanych.csv) w Excelu jako UTF-8 z separatorem średnikowym. Przygotowano 26 propozycji. Przeczytaj dany artykuł i sprawdź, czy opis dokładnie mu odpowiada. Przenieś zatwierdzone wartości **wyłącznie do `seoTitle` i `seoDescription`**, a następnie opublikuj dokument. Nie zmieniaj pól widocznych ani sluga.
6. Otwórz [listę par tłumaczeń](PARY-TLUMACZEN.md). Porównaj treści PL i EN. Dla potwierdzonej pary użyj istniejącego powiązania we wtyczce tłumaczeń albo wybierz istniejący drugi dokument w polu **Potwierdzone tłumaczenie**. Powiąż oba kierunki konsekwentnie; nie łącz jednego wpisu z kilkoma różnymi odpowiednikami i nie twórz nowych kopii.
7. Dwie kompletne pary są już odczytywane z istniejących relacji CMS: JPK VAT oraz ulga na złe długi. Trzecia relacja wskazuje dokumenty, których nie ma w zbiorze opublikowanych artykułów; kod jej nie publikuje jako hreflang. Sprawdź w Studio, czy są to porzucone szkice/stare dokumenty. Nie usuwaj ich bez ustalenia historii.
8. Po publikacji i odświeżeniu cache otwórz oba artykuły. W źródle HTML sprawdź canonical i `hreflang`, a w nagłówku kliknij przełącznik języka. Gdy brak potwierdzonej pary, przełącznik prowadzi do listy bloga w drugim języku, a kod nie dodaje fikcyjnego hreflang.
9. Sprawdź, czy nowy wpis pojawia się na liście bloga i w sitemap, a wycofany znika po rewalidacji. Listy nie mają już limitów 100 PL / 20 EN. Przy awarii CMS kod nie zastępuje poprawnej mapy „udaną” mapą bez wpisów; zachowuje poprawny cache albo zwraca błąd.

## 7. Profil Firmy w Google

1. W [Google Maps](https://maps.google.com/) wyszukaj firmę po nazwie, adresie i telefonie. Odszukaj istniejący profil i ewentualne duplikaty; nie zakładaj od razu nowego.
2. Zaloguj się kontem właściciela. Jeśli profil jest nieprzejęty, wybierz dostępną opcję przejęcia/zarządzania. Jeśli ma już administratora, poproś o dostęp. Przejdź metodę weryfikacji wskazaną przez Google.
3. W edycji profilu wpisz rzeczywistą nazwę firmy bez dodatkowych fraz. Wybierz najtrafniejszą dostępną kategorię odpowiadającą usługom księgowym. Kategorie dodatkowe powinny dotyczyć usług rzeczywiście świadczonych.
4. Sprawdź adres, dokładny pin, telefony, godziny oraz zasady wizyt klientów. Nie twórz fikcyjnych oddziałów w dzielnicach Krakowa.
5. Ustaw link strony:

   `https://www.montebiuro.pl/?utm_source=google&utm_medium=organic&utm_campaign=profil_firmy`

   Te wartości kampanii są zachowywane w oczyszczonym pomiarze. Inne, dowolne parametry URL są usuwane z danych przekazywanych do GA. Nowe kampanie wymagają świadomego rozszerzenia listy dozwolonych wartości w kodzie.
6. Uzupełnij rzeczywiste usługi JDG/spółki/kadry i płace, obsługę w języku angielskim, zdjęcia biura i zespołu oraz godziny świąteczne. Korzystaj tylko z dostępnych w Twoim profilu pól.
7. Pobierz z profilu link do wystawienia opinii. Przekazuj go rzeczywistym klientom w zwykłym procesie obsługi, bez nagród i bez selekcjonowania wyłącznie zadowolonych osób. Odpowiadaj bez ujawniania danych rozliczeniowych klientów.
8. Raz w miesiącu zapisuj dostępne statystyki profilu: kliknięcia strony, połączenia i inne działania. Kliknięcie telefonu nie potwierdza odbycia rozmowy.

Źródło: [lokalna widoczność firmy według Google](https://support.google.com/business/answer/7091?hl=pl).

## 8. Monitoring i rzeczywiste profile firmy

1. Zapisz dzień faktycznej publikacji kodu i zmian w GA4, GSC, Profilu Firmy oraz CMS. Data audytu nie jest automatycznie datą wdrożenia.
2. W pierwszym tygodniu sprawdzaj sitemap, błędy 404/5xx, formularz i odbiór zdarzeń. W Vercel użyj logów/Observability oraz dostępnych alertów błędów. Jeżeli masz zewnętrzny monitoring, dodaj kontrolę statusu mapy i obecności adresów `/blog/` oraz `/en/blog/`; samo HTTP 200 nie wykryje pustej mapy.
3. Po 28 dniach porównaj GSC z poprzednim równym okresem: kliknięcia i wyświetlenia zapytań bez marki, CTR, strony wejścia i urządzenia. Dla małej liczby danych nie wyciągaj wniosków z pojedynczych dni.
4. Sprawdź liczbę `generate_lead` z ruchu organicznego i porównaj z faktycznymi zgłoszeniami. Wzrost GA po naprawie może wynikać z lepszego pomiaru. Sprawdzaj równolegle kliknięcia w GSC.
5. Oceń jakość kontaktów i podpisane umowy we własnym rejestrze biznesowym. Nie wysyłaj do GA nazwisk, e-maili, telefonów ani treści zgłoszeń.
6. Co miesiąc sprawdzaj spójność prawdziwych profili firmy i danych kontaktowych. Nie łącz profili odrębnych działalności wspólniczek bez potwierdzenia właściwego podmiotu. Wzmianki pozyskuj od rzeczywistych partnerów i organizacji; nie kupuj masowych linków ani opinii.
7. Opcjonalnie po naprawie mapy dodaj witrynę w [Bing Webmaster Tools](https://www.bing.com/webmasters/) i zgłoś tę samą sitemap. To uzupełnienie GSC.
8. Po 60–90 dniach oceń trendy, kontakty i dane mobilne CrUX/GSC. Lokalny Lighthouse jest pomiarem pomocniczym, a nie dowodem poprawy doświadczenia wszystkich użytkowników.

## Krótka lista odbioru

- [ ] Właściwy strumień GA4 potwierdzony, automatyczne dublowanie pomiaru wyłączone.
- [ ] Parametry zapisów zgód/cookies i opis dokumentów sprawdzone przez właściciela.
- [ ] Kod opublikowany z właściwego commita; `/sitemap.xml` nie jest pusta.
- [ ] Brakujący artykuł daje 404; domena bez `www` przekierowuje trwale.
- [ ] DebugView/Realtime potwierdza odbiór, a `generate_lead` jest kluczowym zdarzeniem.
- [ ] GSC zweryfikowane, mapa przyjęta, eksport bazowy zapisany.
- [ ] Dane firmy i pin potwierdzone; Profil Firmy uporządkowany.
- [ ] Aktywne Studio ustalone; zatwierdzone metadane i pary tłumaczeń opublikowane.
- [ ] Monitoring błędów oraz termin porównania po 28 dniach zapisany.

## Dodatkowe ustalenie podczas kontroli repozytorium

W istniejącym głównym `.gitignore` jest wpis wyglądający na hasło SMTP (`EMAIL_PASSWORD`). `.gitignore` jest zwykłym plikiem repozytorium, a nie magazynem sekretów. Wartość nie jest kopiowana do tej instrukcji. Jeżeli to aktywne hasło, zmień je u operatora poczty, zaktualizuj właściwą zmienną środowiskową `EMAIL_PASS` w Vercel i w lokalnym `.env.local`, a następnie usuń sekret z `.gitignore`. Samo usunięcie go w nowym commicie nie usuwa wcześniejszej historii i nie zastępuje zmiany hasła. Nie zmieniono konfiguracji poczty w ramach wdrożenia SEO.
