# Wdrożenie poprawek indeksowania

Zmiany są przygotowane w kodzie. Mapa 13 nowych slugów PL, jednego EN i 3 dodatkowych aliasów znajduje się w `seo-slugs.json`. Pozostałe adresy EN pozostają bez zmian. Istniejące przekierowania HTML i domeny zostały zachowane.

## Kolejność wdrożenia

1. Wdróż `monte-nextjs` na istniejący projekt Vercel. Jeśli wdrażasz po 27.10.2026, ustaw `SEO_MIGRATION_DATE` na rzeczywistą datę wdrożenia w formacie `YYYY-MM-DD` przed buildem. Nie zmieniaj jej przy każdym kolejnym buildzie.
2. W Vercel → Settings → Domains ustaw przekierowanie `montebiuro.pl` → `www.montebiuro.pl` jako stałe **308**. Obecna konfiguracja domeny zwracała 307 i ma pierwszeństwo przed regułą Next.js.
3. W katalogu `monte-nextjs` wykonaj:

   ```powershell
   npm run check:redirects
   npm run check:indexing
   ```

   Na Windows z lokalnym magazynem certyfikatów można wcześniej ustawić `$env:NODE_OPTIONS='--use-system-ca'`.
   Alternatywa dla pierwszego testu w Git Bash: `bash check-redirects.sh https://www.montebiuro.pl`.

4. Po udanych testach zmień slugi w Sanity. Na tym komputerze jest zapisana sesja Sanity CLI; skrypt może jej użyć bez kopiowania tokenu:

   ```powershell
   npm run migrate:seo-slugs -- --dry-run --use-sanity-login
   npm run migrate:seo-slugs -- --apply --use-sanity-login
   ```

   Jeśli sesja wygasła, zaloguj się przez `npx sanity login` w `monte-sanity-studio` albo ustaw lokalnie `SANITY_API_TOKEN` i pomiń `--use-sanity-login`. Nie zapisuj tokenu w repozytorium.

   Skrypt sprawdza kolizje, opublikowane wpisy i szkice; aktualizuje slugi oraz znane linki w treści. Przed zapisem sprawdza publiczne przekierowania 301 i strony docelowe 200 z właściwym canonical. Zapisuje kopię w ignorowanym katalogu `.seo-migration-backups`, a zmiany wykonuje atomowo z kontrolą wersji dokumentów. Ponowne uruchomienie jest bezpieczne. Powiązania tłumaczeń po ID pozostają bez zmian.

   Nowa strona obsługuje stare i nowe wartości w CMS, więc może działać przed migracją. Po migracji Sanity automatycznie aktualizuje `_updatedAt`; strona odświeża dane co około 5 minut. Nie cofaj frontendu do wersji sprzed tej poprawki po migracji CMS.

5. Wdróż używany panel Sanity z poprawionym generatorem slugów (`npm run deploy` w `monte-sanity-studio`, wybierając istniejący panel). Poprawiona jest również druga kopia schematu w `monte-nextjs/sanity`. Ręczna edycja slugów pozostaje dostępna.

## Search Console po wdrożeniu

- Ponownie prześlij `https://www.montebiuro.pl/sitemap.xml`.
- Sprawdź i poproś o indeksowanie:
  - `https://www.montebiuro.pl/blog/co-mozna-kupic-przed-zalozeniem-firmy/`
  - `https://www.montebiuro.pl/blog/ulga-na-zle-dlugi-w-vat/`
  - `https://www.montebiuro.pl/blog/fundacja-rodzinna-czym-jest-i-jak-dziala/`
- Uruchom weryfikację poprawki dla błędnych adresów z raportu, które teraz przekierowują. Nie usuwaj starych URL-i narzędziem „Usunięcia”. Przekierowania zachowaj na stałe. Poprawne wykluczenie przekierowanego adresu nie jest błędem nowej strony.

## GA4 i Google Ads

Baner ma oddzielne zgody na analitykę i marketing. Obie są domyślnie wyłączone. Dotychczasowe zgody v2 nie uprawniają do marketingu — użytkownik otrzyma nowy wybór. Marketing steruje trzema sygnałami `ad_storage`, `ad_user_data`, `ad_personalization`. Dopiero z tą zgodą wysyłamy `gclid`, `gbraid`, `wbraid`; `utm_medium=cpc` jest dopuszczony. Polityki cookies PL i EN opisują te zasady.

W GA4 → Administracja → Połączenia z usługami → Połączenia z Google Ads połącz właściwe konto i sprawdź automatyczne tagowanie. Następnie utwórz konwersje Google Ads z `generate_lead` i `click_phone` (GA4 → Reklamy → Zarządzanie konwersjami). Kliknięcie telefonu oznacza kliknięcie linku, nie potwierdzoną rozmowę. Unikaj zdublowania tych samych konwersji, jeśli już istnieją. [Łączenie kont](https://support.google.com/analytics/answer/9379420?hl=pl), [import konwersji](https://support.google.com/google-ads/answer/10632359?hl=pl).

Zachowaj wcześniejsze ustawienia strumienia GA4: automatyczne pomiary zmian historii strony i interakcji formularzy powinny być wyłączone, ponieważ aplikacja wysyła własne zdarzenia.

## Sprawdzone lokalnie

- Produkcyjny build Next.js i build Sanity Studio.
- 36 URL-i w sitemap: HTTP 200, canonical, wzajemny hreflang, język HTML, brak noindex, H1, linkowanie wewnętrzne i lastmod.
- 17 przekierowań 301 do stron 200; stare aliasy HTML, domena i nieistniejące strony 404.
- `npm run check:logic`: transliteracja obu generatorów, zgodność przed/po migracji CMS, błędy CMS, mapowania, lastmod i cztery kombinacje zgód.
- Próba migracji z zalogowaną sesją: 27 dokumentów, 14 zmian, brak kolizji.
- Testy Chrome PL/EN przy 390 i 1440 px: przełączniki, marketing bez analityki, formularz, telefon, cofanie zgody i synchronizacja kart. Dodatkowo regresja z rzeczywistym gtag, blokadą pamięci i adblockiem; kolekcja Google i formularz były przechwytywane lokalnie.

Test przeglądarkowy: `node scripts/check-consent-browser.cjs <ścieżka-do-pakietu-playwright> http://localhost:3102`. Wymaga działającego `npm run start -- -p 3102` po buildzie. Żaden test nie potwierdza odbioru konwersji na koncie Google Ads — to wymaga konfiguracji paneli po wdrożeniu.
