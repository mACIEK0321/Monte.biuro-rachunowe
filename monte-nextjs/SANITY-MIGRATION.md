# Instrukcja migracji z WordPress na Sanity CMS

## Co zostało wykonane w tej sesji:

### 1. ✅ Instalacja pakietów Sanity
```bash
npm install @sanity/client @sanity/image-url next-sanity --legacy-peer-deps
npm install -D @sanity/cli --legacy-peer-deps
npm install @portabletext/react --legacy-peer-deps
```

### 2. ✅ Utworzenie struktury folderów Sanity

Utworzono folder `/sanity` z plikami:
- **`/sanity/schemas/blogPost.js`** - Schemat dla postów blogowych z polami:
  - `title` (string, required)
  - `slug` (slug, source: title, required)
  - `mainImage` (image z hotspot)
  - `publishedAt` (datetime, required)
  - `body` (array of block content i images)

- **`/sanity/schemas/index.js`** - Eksport wszystkich schematów
- **`/sanity/sanity.config.js`** - Konfiguracja Sanity Studio
  - Project ID: `mlkhfxw8`
  - Dataset: `production`
  - Pluginy: deskTool, visionTool
  
- **`/sanity/sanity.cli.js`** - Konfiguracja CLI
- **`/sanity/package.json`** - Skrypty: dev, build, deploy

### 3. ✅ Klient Sanity w Next.js

Utworzono **`/src/lib/sanity.ts`** z:
- Klientem Sanity skonfigurowanym dla projektu `mlkhfxw8`
- Funkcją `urlFor()` do generowania URL obrazków
- Funkcją `getSanityPosts()` do pobierania listy postów
- Funkcją `getSanityPost()` do pobierania pojedynczego posta
- TypeScript interfaces dla typów Sanity

### 4. ✅ Komponenty React/Next.js

Utworzono **alternatywne komponenty** które używają Sanity zamiast WordPress:

- **`/src/components/BlogSectionSanity.tsx`** - Sekcja bloga na stronie głównej
- **`/src/app/blog/page.sanity.tsx`** - Strona z listą wszystkich postów
- **`/src/app/blog/[slug]/page.sanity.tsx`** - Strona pojedynczego posta z PortableText

### 5. ✅ Zmienne środowiskowe

Dodano do **`.env.local`**:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=mlkhfxw8
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Jak uruchomić Sanity Studio:

```bash
cd sanity
npm run dev
```

Studio będzie dostępne pod adresem: `http://localhost:3333`

---

## Jak przełączyć się z WordPress na Sanity:

### Krok 1: Zamień komponenty w głównej stronie

W pliku `/src/app/page.tsx`:

```tsx
// Zamiast:
import BlogSection from '@/components/BlogSection'

// Użyj:
import BlogSection from '@/components/BlogSectionSanity'
```

### Krok 2: Zamień strony blogowe

**Opcja A: Usuń stare i zmień nazwę nowych**
```bash
# W folderze /src/app/blog/
rm page.tsx
mv page.sanity.tsx page.tsx

# W folderze /src/app/blog/[slug]/
rm page.tsx
mv page.sanity.tsx page.tsx
```

**Opcja B: Podmień zawartość plików**
- Skopiuj zawartość z `page.sanity.tsx` do `page.tsx`
- Skopiuj zawartość z `[slug]/page.sanity.tsx` do `[slug]/page.tsx`

### Krok 3: Przetestuj

```bash
npm run dev
```

Przejdź do `http://localhost:3000` i sprawdź sekcję bloga.

---

## Struktura danych Sanity vs WordPress:

| WordPress | Sanity |
|-----------|--------|
| `post.title.rendered` | `post.title` |
| `post.slug` | `post.slug.current` |
| `post.excerpt.rendered` | `post.body[0]...` (pierwszy blok tekstu) |
| `post.date` | `post.publishedAt` |
| `post._embedded['wp:featuredmedia']` | `post.mainImage` |
| `post.content.rendered` (HTML) | `post.body` (Portable Text) |

---

## Następne kroki:

1. **Dodaj pierwsze posty** w Sanity Studio
2. **Przetestuj** wyświetlanie postów na stronie
3. **Opcjonalnie**: Migruj stare posty z WordPress do Sanity
4. **Usuń** zależność od WordPress (`/src/lib/wordpress.ts`)

---

## Pomocne komendy Sanity:

```bash
# Uruchom Studio lokalnie
cd sanity
npm run dev

# Zbuduj Studio
npm run build

# Wdroż Studio na Sanity.io
npm run deploy

# Zarządzaj projektem
npx sanity manage
```

---

## Ważne linki:

- Sanity Studio: https://montebiuro.sanity.studio (po wdrożeniu)
- Sanity Management: https://sanity.io/manage
- Dokumentacja Sanity: https://www.sanity.io/docs
- Portable Text: https://github.com/portabletext/react-portabletext

---

## Rozwiązywanie problemów:

### Problem: "Cannot find module '@sanity/client'"
**Rozwiązanie:** Upewnij się, że pakiety zostały zainstalowane:
```bash
npm install @sanity/client @sanity/image-url next-sanity --legacy-peer-deps
```

### Problem: Błąd CORS w Sanity
**Rozwiązanie:** Dodaj domenę w ustawieniach projektu Sanity:
1. Przejdź do https://sanity.io/manage
2. Wybierz projekt `mlkhfxw8`
3. Settings → API → CORS Origins
4. Dodaj `http://localhost:3000` i `https://montebiuro.pl`

### Problem: Obrazki się nie ładują
**Rozwiązanie:** Sprawdź czy `mainImage` jest poprawnie ustawiony w Sanity Studio i czy używasz `urlFor()` do generowania URL.

---

## Status migracji:

- ✅ Instalacja pakietów
- ✅ Konfiguracja Sanity
- ✅ Schemat blogPost
- ✅ Klient Sanity w Next.js
- ✅ Komponenty alternatywne
- ⏳ Podmiana komponentów WordPress → Sanity (do wykonania)
- ⏳ Dodanie pierwszych postów w Sanity Studio (do wykonania)
- ⏳ Migracja starych postów (opcjonalne)

---

**Data wykonania:** ${new Date().toLocaleDateString('pl-PL')}
