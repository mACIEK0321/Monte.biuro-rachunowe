# Podstrony usług — wdrożenie razem ze slugami

Dodane trasy: `/pelna-ksiegowosc-krakow/` i `/ksiegowosc-jdg-krakow/`.
Treść pochodzi z dostarczonych plików. Pełna księgowość ma wyłącznie wycenę indywidualną, bez cen i ofert w JSON-LD. JDG zachowuje pakiety 299/599 zł netto.

Podgląd Vercel (27.10.2026): `https://monte-biuro-rachunowe-fih1swtg6-macieks-projects-1cc74cf3.vercel.app` — wdrożenie `dpl_91eNwhd2D1TAkQUL2uhZde7txCX6`, status Ready, obie podstrony HTTP 200. Podgląd jest chroniony logowaniem Vercel. Produkcja i CMS czekają na potwierdzenie przeglądu FAQ wskazanego w dostarczonej instrukcji.

## Integracja

- Jeden `main` zapewnia istniejący layout. Podstrony używają `Contact`, z identyfikatorami `service_pelna` i `service_jdg` w zdarzeniu `generate_lead`.
- Linki „Więcej o usłudze” są w rozwijanych kartach PL, bez zmiany przycisku „Szczegóły”. Dwie pozycje dodano do polskiej stopki. Nie utworzono nieistniejących odpowiedników EN ani hreflang do strony głównej EN.
- Sitemap zawiera dwie nowe strony i datę wydania z `SEO_MIGRATION_DATE` / `seo-slugs.json`, a nie przykładową datę listopadową.
- Dane firmy zawierają `legalName`, Kraków i dostarczony profil `https://share.google/356Vi23Gv4iIhKFWR`.
- Osiem zdań do artykułów jest zdefiniowanych w `service-links.cjs`. Nowa wersja strony wyświetla je przed istniejącym CTA, gdy taki blok jest dostępny, a w pozostałych artykułach na końcu treści. Migracja utrwala te same bloki w CMS bez duplikatów.

## FAQ do przeczytania przed publikacją

W dostarczonej instrukcji wskazano przeczytanie dwóch odpowiedzi przez Monikę lub Teresę przed publikacją. Poprawiono:

- **Kto musi prowadzić pełną księgowość?** Próg zmieniono z 2 mln na **co najmniej 2,5 mln euro**, z odwołaniem do przychodów ustalanych według ustawy o rachunkowości. [Ministerstwo Finansów](https://redakcja.www.gov.pl/web/finanse/ustawa-csrd).
- **KPiR czy ryczałt?** Rozróżniono ewidencję KPiR od formy opodatkowania oraz podano termin wyboru liniowego/ryczałtu: co do zasady 20. dzień miesiąca po pierwszym przychodzie w roku, a przy pierwszym przychodzie w grudniu — koniec roku. [Portal podatki.gov.pl](https://podatki.gov.pl/poradniki-i-informatory/rozpoczecie-dzialalnosci-gospodarczej).

## Wdrożenie i CMS

Wdróż cały bieżący `monte-nextjs`, łącznie z regułami slugów. Po sprawdzeniu publicznych stron i przekierowań wykonaj w tym katalogu:

```powershell
npm run check:redirects
npm run check:indexing
npm run migrate:seo-slugs -- --dry-run --use-sanity-login --with-service-links
npm run migrate:seo-slugs -- --apply --use-sanity-login --with-service-links
```

Próba z zalogowaną sesją Sanity sprawdziła 27 dokumentów: 14 slugów oraz dopiski w dokładnie 8 artykułach. Zapis jest atomowy, z kopią i kontrolą rewizji. Skrypt odmówi zapisu, jeśli nowe strony usług nie są publicznie dostępne jako 200 z właściwym canonical albo stare slugi nie przekierowują przez 301.

Nie cofaj strony do wersji sprzed migracji slugów po zapisaniu zmian CMS. Pozostałe wskazówki dotyczące Vercel i Sanity Studio są w `SEO-MIGRATION.md`.

## Ustawienia w panelach

1. **GA4:** Administracja → Definicje niestandardowe → nowy wymiar `component`, zakres „Zdarzenie”, parametr `component`. Sprawdź `generate_lead` po udanym formularzu na obu podstronach; nie importuj nowego zdarzenia o nazwie `service_jdg` — to wartość parametru istniejącego zdarzenia.
2. **Search Console:** ponownie prześlij sitemap i poproś o indeksowanie obu nowych adresów po publikacji.
3. **Profil Firmy:** adres witryny `https://www.montebiuro.pl/?utm_source=google&utm_medium=organic&utm_campaign=profil_firmy`.
4. **Usługi w Profilu Firmy:** „Pełna księgowość” — „Prowadzenie ksiąg rachunkowych spółek i firm, rozliczenia CIT, VAT i JPK oraz sprawozdania finansowe. Dedykowana księgowa, obsługa online i wycena indywidualna.”; „Księgowość dla JDG” — „KPiR lub ewidencja ryczałtu, podatki, ZUS i księgowość online. Pakiety od 299 zł netto miesięcznie oraz pomoc przy założeniu działalności.”

Nie wysyłano wiadomości do klientów ani próśb o opinie.

## Walidacja

Sprawdzono build, 38 URL-i sitemap, 17 przekierowań, FAQ bez JavaScriptu, zgodność pytań i odpowiedzi z JSON-LD, jeden `main`/H1/formularz, linki do artykułów i obu usług, formularze przy 390/1440 px oraz brak duplikatów dopisków CMS. Formularze i żądania Google były przechwytywane w testach; nie wysłano prawdziwych zapytań klientów.

`Service` i `FAQPage` pozostają poprawnymi opisami schema.org, ale nie należy oczekiwać trzech rozszerzonych wyników w teście Google. Google wycofało wyniki rozszerzone FAQ w maju 2026; `Service` nie jest osobnym obsługiwanym wynikiem rozszerzonym. `BreadcrumbList` można sprawdzić w Rich Results Test po publikacji. [Aktualizacje Google](https://developers.google.com/search/updates), [obsługiwane raporty](https://support.google.com/webmasters/answer/7552505).

Test przeglądarkowy: `node scripts/check-service-pages.cjs <ścieżka-do-playwright> http://localhost:3102` przy uruchomionej wersji produkcyjnej lokalnie.
