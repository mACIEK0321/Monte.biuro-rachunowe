# Monte.biuro rachunkowe – strona internetowa

Strona prezentująca usługi biura rachunkowego Monte.biuro. Wersja szkieletowa z treścią przykładową – do konsultacji z wytycznymi szefów.

**Repo GitHub:** [https://github.com/mACIEK0321/Monte.biuro-rachunowe](https://github.com/mACIEK0321/Monte.biuro-rachunowe)

## Połączenie z GitHubem

Projekt jest już podłączony do zdalnego repozytorium (`origin`). Aby wysłać kod na GitHub:

1. Otwórz **PowerShell** lub **Git Bash** w folderze projektu.
2. Wykonaj:
   ```bash
   git add .
   git commit -m "Initial commit: strona Monte.biuro"
   git branch -M main
   git push -u origin main
   ```
3. Jeśli repozytorium na GitHubie ma już commity (np. README z „Create repo”), najpierw zrób:
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
   Rozwiąż ewentualne konflikty, potem:
   ```bash
   git push -u origin main
   ```

Alternatywnie uruchom skrypt: `.\polacz-z-github.ps1` (w PowerShell w tym folderze).

## Jak uruchomić

1. Otwórz folder projektu w przeglądarce plików i kliknij `index.html`, **albo**
2. Uruchom lokalny serwer w katalogu projektu, np.:
   - Python: `python -m http.server 8000` → http://localhost:8000
   - Node: `npx serve` → podany w konsoli adres

## Gdzie co edytować

| Element | Plik |
|--------|------|
| Strona główna (hero, O nas, karty usług) | `index.html` |
| Lista usług (siatka 8 kart) | `uslugi.html` |
| Podstrony poszczególnych usług | `uslugi/*.html` |
| Kontakt (dane, formularz) | `kontakt.html` |
| Header i footer (wspólne) | Każdy plik HTML – po zmianie skopiuj do pozostałych lub użyj szablonu |
| Style globalne (kolory, fonty) | `css/style.css` |
| Layout (header, footer, sekcje) | `css/layout.css` |
| Karty, przyciski, formularz | `css/components.css` |

## Placeholdery do zatwierdzenia

- **index.html:** Slogan w hero, sekcja „O nas”, wezwanie do kontaktu.
- **uslugi.html:** Wstęp nad siatką usług.
- **Wszystkie strony:** Stopka – adres, e-mail, telefon; link „Polityka prywatności” (na start placeholder).

Treści opisów usług i list „Zakres usług” pochodzą z wytycznych – można je dopracować słownictwem po konsultacji z szefami.

## Dalszy rozwój

- Podłączenie formularza kontaktowego (np. Formspree, Netlify Forms).
- Strona Polityki prywatności.
- Unikalne `title` i `meta description` dla SEO.
- Logo w `images/logo.svg` lub `images/logo.png`.
