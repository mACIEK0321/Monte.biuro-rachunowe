# Instrukcja Wdrożenia na home.pl

## ✅ Naprawione Problemy

### 1. **"Znikający boks" - Szczegóły w ofertach**
**Root Cause:** Tailwind class `overflow-hidden` na wrapper divie ukrywał treść podczas animacji grid-template-rows.

**Rozwiązanie:** Zastąpienie Tailwind classes czystymi inline styles z:
- `display: 'grid'` zamiast `className="grid"`
- `overflow: 'hidden'` tylko na inner divie (gdzie jest bezpieczne)
- `willChange: 'grid-template-rows'` dla lepszej wydajności animacji
- Transparentna animacja bez layout shift

**Pliki:** [Services.tsx](src/components/Services.tsx), [Pricing.tsx](src/components/Pricing.tsx), [FAQ.tsx](src/components/FAQ.tsx)

### 2. **Formularz kontaktowy - endpoint API**
**Problem:** Static export Next.js nie może używać `/api/` routes.

**Rozwiązanie:** Formularz wysyła dane do PHP endpoint `../api/contact.php`

**Plik:** [Contact.tsx](src/components/Contact.tsx)

---

## 📁 Struktura na Serwerze home.pl

```
/public_html/ (lub Twój root)
  │
  ├── /strona/              ← Output z monte-nextjs/out/ (Next.js static)
  │   ├── index.html
  │   ├── _next/
  │   ├── /blog/            ← Next.js blog pages (statyczne)
  │   │   ├── index.html
  │   │   ├── przewodnik-po-kpir-2026/
  │   │   └── ...
  │   └── (pozostałe pliki Next.js)
  │
  ├── /blog/                ← WordPress (instalacja)
  │   ├── wp-admin/
  │   ├── wp-content/
  │   └── wp-config.php
  │
  └── /api/                 ← PHP endpoints
      ├── contact.php
      └── config.php
```

---

## 🚀 Kroki Wdrożenia

### Krok 1: Build Next.js

```bash
cd monte-nextjs
npm run build
```

To wygeneruje folder `out/` z plikami statycznymi.

### Krok 2: Upload plików na serwer

#### A) Zawartość `monte-nextjs/out/` → `/strona/`
Prześlij **CAŁĄ zawartość** folderu `out/` do `/strona/`:
- `index.html`
- `_next/` (cały folder)
- `blog/` (folder ze statycznymi stronami bloga)
- Wszystkie inne pliki/foldery

#### B) Folder `api/` → `/api/`
Skopiuj folder `api/` (z workspace root) na poziom **wyżej** niż `/strona/`:
```
/api/contact.php
/api/config.php
/api/mail-debug.log (zostanie utworzony automatycznie)
```

**Alternatywnie:** Jeśli wolisz mieć API w `/strona/api/`, zmień w [Contact.tsx](src/components/Contact.tsx) linię 18:
```typescript
const response = await fetch('./api/contact.php', {  // zmiana z '../' na './'
```

#### C) WordPress (jeśli już nie działa)
WordPress powinien pozostać w `/strona/blog/` lub w `/blog/` zgodnie z Twoją obecną konfiguracją.

### Krok 3: Konfiguracja API

#### a) Skopiuj `config.php.example` → `config.php`
```bash
cp api/config.php.example api/config.php
```

#### b) Edytuj `api/config.php` i ustaw:
```php
<?php
return [
    'smtp' => [
        'host'     => 'smtp.home.pl',        // Lub Twój SMTP
        'port'     => 587,
        'secure'   => 'tls',
        'username' => 'biuro@montebiuro.pl',
        'password' => 'TWOJE_HASŁO_SMTP',
    ],
    'mail' => [
        'from_email' => 'biuro@montebiuro.pl',
        'from_name'  => 'Monte Biuro',
        'to_email'   => 'biuro@montebiuro.pl',  // Gdzie trafiają zgłoszenia
    ],
    'debug' => false,  // true tylko do testów
];
```

#### c) Uprawnienia dla PHPMailer
Upewnij się że folder `lib/phpmailer/` jest dostępny:
```
/lib/phpmailer/src/PHPMailer.php
/lib/phpmailer/src/SMTP.php
/lib/phpmailer/src/Exception.php
```

### Krok 4: Konfiguracja WordPress API (opcjonalnie)

Jeśli chcesz używać prawdziwych postów z WordPress zamiast mock data:

#### a) W WordPress zainstaluj plugin "Application Passwords" lub użyj WordPress 5.6+

#### b) Ustaw zmienną środowiskową w `.env.local`:
```env
NEXT_PUBLIC_WP_API_URL=https://montebiuro.pl/blog
```

#### c) Przebuduj projekt:
```bash
npm run build
```

---

## 🔍 Weryfikacja

### Test animacji "Szczegóły"
1. Otwórz stronę: `https://montebiuro.pl/#uslugi`
2. Kliknij przycisk **"Szczegóły"** na dowolnej karcie oferty
3. **Oczekiwany rezultat:** Boks płynnie się rozwija bez znikania
4. **Jeśli nie działa:** Wyczyść cache przeglądarki (Ctrl+Shift+Del)

### Test formularza kontaktowego
1. Otwórz: `https://montebiuro.pl/#kontakt`
2. Wypełnij formularz i wyślij
3. **Oczekiwany rezultat:** 
   - Alert: "Dziękujemy! Wiadomość została wysłana..."
   - Email powinien dotrzeć na adres z `config.php`
4. **Jeśli nie działa:**
   - Sprawdź `/api/mail-debug.log` (jeśli debug=true w config.php)
   - Zweryfikuj uprawnienia plików (644 dla PHP, 755 dla folderów)
   - Sprawdź czy PHPMailer jest dostępny

### Test bloga
1. Otwórz: `https://montebiuro.pl/blog`
2. Kliknij w dowolny post z listy
3. **Oczekiwany rezultat:** Otwiera się strona posta (statyczna lub z WordPress API)

---

## 🐛 Rozwiązywanie Problemów

### Problem: Boks nadal znika po kliknięciu
**Przyczyna:** Cache CSS

**Rozwiązanie:**
1. W przeglądarce: `Ctrl+Shift+Delete` → Wyczyść cache
2. W panelu home.pl: Wyczyść cache serwera (jeśli dostępne)
3. Sprawdź czy poprawnie wrzuciłeś pliki z `out/` (nie z `monte-nextjs/.next/`)

### Problem: Formularz nie wysyła (błąd 404)
**Przyczyna:** Zła ścieżka do `contact.php`

**Rozwiązanie:**
1. Sprawdź czy `contact.php` jest w `/api/contact.php`
2. Jeśli skopiowałeś API do `/strona/api/`, edytuj Contact.tsx:
   ```typescript
   fetch('./api/contact.php', {  // zmień z '../' na './'
   ```
3. Przebuduj: `npm run build` i wgraj ponownie

### Problem: Formularz wysyła, ale nie przychodzi email
**Przyczyna:** Błąd konfiguracji SMTP lub PHPMailer

**Rozwiązanie:**
1. W `api/config.php` ustaw `'debug' => true`
2. Wyślij testowy formularz
3. Sprawdź `/api/mail-debug.log`
4. Zweryfikuj dane SMTP (host, port, username, password)
5. Upewnij się że `lib/phpmailer/` jest dostępny na serwerze

### Problem: Blog pokazuje tylko mock posty
**Przyczyna:** WordPress API niedostępne lub błędny URL

**Rozwiązanie:**
1. Sprawdź czy WordPress jest dostępny: `https://montebiuro.pl/blog/wp-json/wp/v2/posts`
2. Ustaw `NEXT_PUBLIC_WP_API_URL` (np. w `.env.local`)
3. Przebuduj i wgraj ponownie

---

## 📝 Checklist przed wdrożeniem

- [ ] `npm run build` wykonany bez błędów
- [ ] Zawartość `out/` wgrana do `/strona/`
- [ ] Folder `api/` skopiowany na serwer
- [ ] `api/config.php` utworzony i skonfigurowany (SMTP)
- [ ] `lib/phpmailer/` dostępny na serwerze
- [ ] WordPress działa w `/strona/blog/` lub `/blog/`
- [ ] Test animacji "Szczegóły" (działa bez znikania)
- [ ] Test formularza kontaktowego (wysyła email)
- [ ] Test bloga (listuje posty, otwiera pojedyncze posty)
- [ ] Cache przeglądarki wyczyszczony

---

## 📞 Wsparcie

Jeśli coś nie działa:
1. Sprawdź logi serwera home.pl (panel → Logi błędów)
2. Sprawdź `/api/mail-debug.log` (jeśli debug=true)
3. Otwórz DevTools w przeglądarce (F12) → Console → szukaj błędów JavaScript
4. Sprawdź Network tab → czy requesty do API zwracają 200

---

**Powodzenia! 🚀**
