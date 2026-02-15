# Quick Test Guide - Test Lokalny Przed Wdrożeniem

## 🧪 Test Lokalny z Dev Server

### 1. Uruchom serwer deweloperski
```bash
cd monte-nextjs
npm run dev
```

Otwórz: http://localhost:3000

### 2. Test animacji "Szczegóły"

#### Usługi (Services)
1. Przejdź do sekcji **Usługi** lub: http://localhost:3000/#uslugi
2. Kliknij przycisk **"Szczegóły"** na dowolnej karcie
3. ✅ **Oczekiwany rezultat:** Boks płynnie się rozwija bez znikania
4. ❌ **Błąd (naprawiony):** Boks znika i pojawia się dopiero po scrollowaniu

#### Cennik (Pricing)
1. Przejdź do sekcji **Cennik** lub: http://localhost:3000/#cennik
2. Kliknij **"Szczegóły"** na karcie "Pakiet indywidualny"
3. ✅ Boks rozwija się płynnie

#### FAQ
1. Przejdź do sekcji **FAQ** lub: http://localhost:3000/#faq
2. Kliknij dowolne pytanie
3. ✅ Odpowiedź rozwija się płynnie

### 3. Test Static Export (jak na produkcji)

```bash
# Build static export
npm run build

# Podgląd buildu lokalnie
npx serve out
```

Otwórz: http://localhost:3000 (lub port wskazany przez serve)

Przetestuj wszystkie animacje jak wyżej.

---

## 📧 Test Formularza Lokalnie (opcjonalnie)

**Uwaga:** Formularz wymaga PHP + PHPMailer, więc nie zadziała z `npm run dev`. Musisz użyć lokalnego serwera PHP.

### Opcja A: XAMPP/WAMP/MAMP
1. Skopiuj zawartość `monte-nextjs/out/` do `htdocs/strona/`
2. Skopiuj `api/` do `htdocs/api/`
3. Skonfiguruj `api/config.php` (użyj SMTP lub mail() local)
4. Otwórz: http://localhost/strona/
5. Testuj formularz w sekcji Kontakt

### Opcja B: PHP Built-in Server
```bash
# W katalogu workspace root (nie monte-nextjs)
php -S localhost:8000

# Otwórz:
http://localhost:8000/monte-nextjs/out/
```

**Uwaga:** `fetch('../api/contact.php')` może nie zadziałać z PHP built-in server. W tym przypadku po prostu zweryfikuj animacje, a formularz testuj dopiero na produkcji.

---

## 🐛 Co sprawdzić przed wdrożeniem?

### Checklist Testów Lokalnych
- [ ] **Animacje "Szczegóły"** - rozwijają się bez znikania
- [ ] **FAQ** - pytania rozwijają się płynnie
- [ ] **Cennik** - "Pakiet indywidualny" rozwija szczegóły
- [ ] **Blog** - lista postów renderuje się (mock data lub WP API)
- [ ] **Blog Single** - otwieranie pojedynczego posta działa
- [ ] **Nawigacja** - wszystkie linki prowadzą do właściwych sekcji
- [ ] **Dark Mode** - przełącznik działa poprawnie
- [ ] **Responsive** - strona wygląda dobrze na mobile (DevTools → Toggle device toolbar)

### Sprawdź DevTools Console
Podczas testów trzymaj otwarte **DevTools** (F12) → **Console**:
- ❌ **0 błędów** - idealnie!
- ⚠️ **Warningi** - zazwyczaj OK (np. `next/image` warnings)
- ❌ **Errors** - muszą być naprawione przed wdrożeniem

---

## 📦 Build Verification

### Sprawdź czy out/ zawiera:
```bash
monte-nextjs/out/
  ├── index.html              ✅ Strona główna
  ├── _next/                  ✅ Assets (CSS, JS, images)
  ├── blog/                   ✅ Blog pages
  │   ├── index.html
  │   └── przewodnik-po-kpir-2026/
  ├── images/                 ✅ Public images (jeśli są)
  └── 404.html               ✅ Error page
```

### Sprawdź rozmiar buildu
```bash
# Windows PowerShell
Get-ChildItem -Path monte-nextjs/out -Recurse | Measure-Object -Property Length -Sum

# Linux/Mac
du -sh monte-nextjs/out
```

**Typowy rozmiar:** 5-20 MB (w zależności od obrazków)

---

## 🚀 Gotowe do Wdrożenia?

Jeśli wszystkie testy przeszły ✅, możesz przejść do [DEPLOY-INSTRUCTIONS.md](DEPLOY-INSTRUCTIONS.md) i wdrożyć na home.pl.

---

**Powodzenia! 🎉**
