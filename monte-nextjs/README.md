# Monte Biuro Rachunkowe - Strona Next.js

Profesjonalna strona internetowa biura rachunkowego zbudowana w Next.js 14 (App Router) z integracją WordPress Headless CMS.

## 🚀 Szybki start

### Wymagania
- Node.js 18.17 lub nowszy
- npm lub yarn

### Instalacja

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom serwer deweloperski
npm run dev

# 3. Otwórz http://localhost:3000
```

## 📁 Struktura projektu

```
monte-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout z SEO
│   │   ├── page.tsx            # Strona główna
│   │   ├── globals.css         # Style globalne (wszystkie CSS scalone)
│   │   └── blog/
│   │       ├── page.tsx        # Lista artykułów
│   │       └── [slug]/page.tsx # Dynamiczne strony artykułów (SSG)
│   ├── components/
│   │   ├── Header.tsx          # Nawigacja z mobile menu
│   │   ├── Footer.tsx          # Stopka
│   │   ├── Hero.tsx            # Sekcja hero
│   │   ├── Services.tsx        # 8 usług z accordion ✅ NAPRAWIONE
│   │   ├── Pricing.tsx         # 3 pakiety cenowe ✅ NAPRAWIONE
│   │   ├── Process.tsx         # 4 kroki współpracy
│   │   ├── AboutUs.tsx         # O nas, zespół, trust badges
│   │   ├── FAQ.tsx             # 5 pytań z accordion ✅ NAPRAWIONE
│   │   ├── Contact.tsx         # Formularz kontaktowy
│   │   ├── BlogSection.tsx     # Sekcja blog (mock data) ✅ NOWY
│   │   ├── ScrollAnimations.tsx # Animacje scroll
│   │   └── CookieConsent.tsx   # Cookie consent
│   └── lib/
│       └── wordpress.ts        # WordPress API client
├── public/
│   ├── logo/                   # 5 wersji logo SVG
│   └── images/
│       ├── blog/               # Obrazy blogowe (mock placeholders) ✅
│       └── team/               # Zdjęcia zespołu
├── package.json
├── next.config.js              # output: 'export' dla home.pl
├── tailwind.config.ts
└── tsconfig.json
```

## ✅ Co zostało naprawione

### 1. Problem z przyciskami "Szczegóły" (Layout Shift)
**Problem:** Sekcje znikały po kliknięciu, pojawiały się dopiero po scroll.

**Rozwiązanie:**
- Dodano `useRef` i `useEffect` do dynamicznego obliczania wysokości
- Wykorzystano `scrollHeight` zamiast sztywnego `max-height: 800px`
- Komponenty: `Services.tsx`, `Pricing.tsx`, `FAQ.tsx`

```tsx
// Przed:
<div className="service-card-details">

// Po:
const detailsRefs = useRef<(HTMLDivElement | null)[]>([]);

useEffect(() => {
  detailsRefs.current.forEach((ref, idx) => {
    if (ref) {
      if (idx === expandedIndex) {
        ref.style.maxHeight = ref.scrollHeight + 'px'; // ✅ Dynamiczna wysokość
      } else {
        ref.style.maxHeight = '0px';
      }
    }
  });
}, [expandedIndex]);

<div ref={(el) => (detailsRefs.current[index] = el)} className="service-card-details">
```

### 2. Sekcja Blog z Mock Data
**Problem:** Blog był pusty, brak wizualizacji.

**Rozwiązanie:**
- Zmieniono `BlogSection.tsx` na Client Component (`'use client'`)
- Dodano 3 przykładowe artykuły (mock data)
- Użyto `next/image` z `unoptimized` dla home.pl hosting
- Dodano loading skeleton podczas ładowania
- Przygotowano funkcję `fetchPosts()` gotową na WordPress API

**Mock Data:**
1. **KPiR 2026** - Przewodnik księgowy
2. **Zmiany VAT 2026** - Nowe regulacje
3. **Formy opodatkowania** - Poradnik wyboru

**Funkcje:**
- ✅ Automatyczne próbowanie pobrania z WordPress
- ✅ Fallback do mock data przy błędzie
- ✅ Loading state z skeleton
- ✅ Profesjonalny design 1:1 z resztą strony
- ✅ Dark mode ready (kolory Monte: `#42312b`)

## 🎨 Design System

### Kolory
```css
--accent: #42312b;           /* Chocolate brown - główny akcent */
--white: #FFFBF7;            /* Cream white */
--light-bg: #FDF5E6;         /* Beige background */
--navy: #1a1a1a;             /* Dark text */
--gray: #666666;             /* Secondary text */
--border: #e5e5e5;           /* Borders */
```

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** 700 weight
- **Body:** 400-600 weight

### Components
- **Cards:** `border-radius: 16px`, hover effect `translateY(-4px)`
- **Buttons:** `border-radius: 50px`, transition `0.3s`
- **Animations:** `fade-in-scroll` z IntersectionObserver

## 🔌 Konfiguracja WordPress (opcjonalna)

Blog może działać w dwóch trybach:

### 1. Mock Data (domyślnie)
Wystarczy uruchomić projekt - blog wyświetli 3 przykładowe artykuły.

### 2. WordPress API
Skopiuj `.env.local.example` → `.env.local` i ustaw:

```env
NEXT_PUBLIC_WP_API_URL=https://twoja-domena-wordpress.pl
```

**Wymagania WordPress:**
- WordPress REST API włączone
- Endpoint: `/wp-json/wp/v2/posts?_embed`
- Zalecane: ACF Pro dla custom fields

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build (Static Export dla home.pl)
```bash
npm run build
```

To wygeneruje folder `out/` ze statycznymi plikami HTML gotowymi do wrzucenia na home.pl.

### Deploy na home.pl
1. `npm run build`
2. Upload zawartości folderu `out/` na serwer
3. Upewnij się, że `index.html` jest w root directory

## 🛠️ Główne Technologie

- **Next.js 14.2** - React framework (App Router)
- **TypeScript 5.4** - Type safety
- **Tailwind CSS 3.4** - Utility CSS (+ custom CSS preserved)
- **React 18.3** - UI library

## 📝 Skrypty npm

```bash
npm run dev       # Serwer deweloperski (port 3000)
npm run build     # Build produkcyjny (static export)
npm run start     # Serwer produkcyjny (nie działa z export)
npm run lint      # ESLint check
```

## 🎯 Roadmap

- [x] Migracja z HTML/CSS do Next.js
- [x] Naprawa przycisków "Szczegóły" (layout shift)
- [x] Blog z mock data + next/image
- [x] WordPress API integration (gotowe)
- [ ] Dodanie prawdziwych zdjęć blogowych
- [ ] Integracja z prawdziwym WordPress
- [ ] Google Analytics
- [ ] Testy E2E (Playwright)

## 📞 Wsparcie

W przypadku pytań:
- Email: kontakt@monte.biuro.pl
- Tel: +48 123 456 789

---

**Monte Biuro Rachunkowe** © 2026 | Profesjonalna księgowość, kadry i podatki
