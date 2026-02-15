# 📝 Instrukcja Tworzenia Wpisów w WordPress dla Next.js

Twoja strona automatycznie pobiera wpisy z WordPressa i układa je w piękny design. Musisz tylko wpisać tekst i dodać zdjęcia!

---

## ✨ **Automatyczny Layout - Co Działa?**

Szablon automatycznie układa każdy wpis według schematu:

1. **Na samej górze:** Duży Obrazek Wyróżniający (full-width, 500px wysokości)
2. **Poniżej:** Tytuł (duża czcionka H1)
3. **Pod Tytułem:** Data publikacji + Autor
4. **Następnie:** Cała treść z WordPressa

### 🎨 **Automatyczne Style dla Treści WordPress:**

Wszystko co dodasz w edytorze WordPressa automatycznie dostanie piękne style:

✅ **Obrazki** - automatycznie responsive (dopasowują się do szerokości)  
✅ **Galerie** - siatka zdjęć  
✅ **Tabele** - ładnie sformatowane  
✅ **Cytaty** - kolorowe bloki z lewą kreską  
✅ **YouTube/Vimeo** - responsive embeds  
✅ **Przyciski** - zaokrąglone, z efektem hover  
✅ **Kod** - podświetlony background  
✅ **Listy** - z odstępami  
✅ **Nagłówki H2/H3** - hierarchy z odpowiednimi rozmiarami

---

## 📸 **Jak Dodać Obrazek Wyróżniający (Featured Image)?**

**To jest KLUCZOWE** - Featured Image pojawi się na samej górze artykułu jako duży baner.

### W Edytorze WordPress:

1. Utwórz nowy wpis lub edytuj istniejący
2. Po prawej stronie znajdź panel **"Obrazek wyróżniający"** (Featured Image)
3. Kliknij **"Ustaw obrazek wyróżniający"**
4. Wybierz zdjęcie z biblioteki lub wgraj nowe
5. **Zalecane wymiary:** minimum 1200x500px (proporcje 2.4:1)
6. Kliknij **"Ustaw obrazek wyróżniający"**

**Gotowe!** Obrazek automatycznie pojawi się na górze artykułu.

---

## 🖼️ **Jak Dodawać Zdjęcia w Treści?**

### Pojedyncze Zdjęcie:

1. W edytorze kliknij **"+"** (dodaj blok)
2. Wybierz **"Obrazek"** (Image)
3. Wgraj zdjęcie lub wybierz z biblioteki
4. Dodaj **Alt Text** (opis dla SEO)
5. Opcjonalnie: Dodaj **Caption** (podpis pod zdjęciem)

**Automatycznie otrzyma:**
- Dopasowanie do szerokości kontenera (max 800px)
- Zaokrąglone rogi
- Odstępy góra/dół
- Podpis wyśrodkowany pod zdjęciem (jeśli dodasz)

### Galeria Zdjęć:

1. Kliknij **"+"** → **"Galeria"**
2. Wgraj wiele zdjęć naraz
3. Ustaw kolumny (np. 3)

**Automatycznie otrzyma:**
- Siatkę responsywną (na mobile 1 kolumna)
- Jednolitą wysokość zdjęć (200px)
- Odstępy między zdjęciami

---

## 📄 **Jak Formatować Tekst?**

### Nagłówki:

```
H1 - ZAREZERWOWANY dla tytułu wpisu (nie używaj w treści!)
H2 - Główne sekcje artykułu
H3 - Podsekcje
```

**W edytorze:** Zaznacz tekst → Wybierz "Nagłówek 2" lub "Nagłówek 3"

### Cytaty:

1. Kliknij **"+"** → **"Cytat"**
2. Wpisz tekst cytatu

**Automatycznie otrzyma:**
- Kolorowy pasek z lewej strony
- Jasne tło
- Italikę

### Listy:

1. Kliknij **"+"** → **"Lista"** (numerowana lub punktowana)
2. Wpisz elementy

**Automatycznie otrzyma:**
- Odpowiednie wcięcia
- Odstępy między punktami

---

## 📊 **Jak Dodać Tabelę?**

1. Kliknij **"+"** → **"Tabela"**
2. Wybierz liczbę kolumn i wierszy
3. Wypełnij komórki

**Automatycznie otrzyma:**
- Responsywność (scroll poziomy na mobile)
- Obramowanie komórek
- Kolorowy header
- Dopasowanie do kontenera

---

## 🎬 **Jak Wstawić YouTube/Vimeo?**

1. Skopiuj link do filmu (np. `https://www.youtube.com/watch?v=VIDEO_ID`)
2. W edytorze po prostu **wklej link** w nowej linii
3. WordPress automatycznie zamieni go na embed

**Automatycznie otrzyma:**
- Responsive (dopasuje się do szerokości)
- Proporcje 16:9
- Zaokrąglone rogi

---

## 🔘 **Jak Dodać Przycisk?**

1. Kliknij **"+"** → **"Przycisk"**
2. Wpisz tekst przycisku
3. Dodaj link (URL)

**Automatycznie otrzyma:**
- Zaokrąglone rogi (pill shape)
- Kolor marki (accent)
- Efekt hover (podniesienie + ciemniejszy kolor)

---

## 💻 **Jak Dodać Kod?**

### Inline Code (w tekście):

Zaznacz tekst → **Format** → **Kod**

**Przykład:** `npm install` będzie miało szare tło

### Code Block (duży blok kodu):

1. Kliknij **"+"** → **"Kod"**
2. Wklej kod

**Automatycznie otrzyma:**
- Ciemne tło
- Monospace font
- Scroll poziomy dla długich linii

---

## ✍️ **Pełny Przykład Wpisu WordPress**

```
TYTUŁ WPISU: Jak założyć firmę w 2026 roku

OBRAZEK WYRÓŻNIAJĄCY: [Wgraj zdjęcie biznesowe 1200x500px]

TREŚĆ:

## Wprowadzenie

Założenie firmy to ważny krok. W tym artykule pokażę Ci, jak to zrobić krok po kroku.

[ZDJĘCIE: Wgraj zdjęcie biurka z laptopem]

## Krok 1: Wybór formy prawnej

Najpopularniejsze formy to:
- Jednoosobowa działalność gospodarcza (JDG)
- Spółka z o.o.
- Spółka cywilna

### Jednoosobowa działalność

To najprostsza forma. Wystarczy wypełnić formularz CEIDG...

[TABELA: Porównanie form prawnych]

## Krok 2: Rejestracja w US

> Rejestrację można wykonać online przez portal CEIDG. Zajmuje to około 15 minut.

[YOUTUBE: Link do tutorialu]

## Podsumowanie

Załączam przydatne linki:
[PRZYCISK: "Załóż firmę online"]

Powodzenia!
```

---

## 🎯 **Tips & Best Practices**

### ✅ DO:
- **Zawsze dodawaj Featured Image** (pojawi się na górze + w podglądach social media)
- **Używaj Alt Text** dla zdjęć (SEO + accessibility)
- **Strukturuj treść nagłówkami H2/H3** (czytelność)
- **Dodawaj podpisy pod zdjęciami** (Caption) jeśli potrzebne
- **Używaj list** zamiast długich paragrafów
- **Testuj na mobile** (Podgląd → Urządzenia mobilne)

### ❌ DON'T:
- **NIE używaj H1** w treści (jest zarezerwowany dla tytułu)
- **NIE dodawaj inline CSS/HTML** (style są automatyczne)
- **NIE używaj bardzo małych zdjęć** (minimum 800px szerokości)
- **NIE dodawaj Fixed Width** dla obrazków (niech będą responsive)

---

## 📱 **Jak Wygląda na Mobile?**

Szablon jest w pełni responsywny:

- **Hero Image:** 300px wysokości (zamiast 500px)
- **Tytuł:** Mniejsza czcionka, ale czytelna
- **Galerie:** 1 kolumna (zamiast siatki)
- **Tabele:** Scroll poziomy
- **Wszystkie obrazki:** Dopasowane do szerokości ekranu

---

## 🚀 **Jak Opublikować Wpis?**

1. Sprawdź czy masz:
   - ✅ Tytuł
   - ✅ Featured Image
   - ✅ Treść sformatowana
   - ✅ Alt Text dla zdjęć

2. Ustaw **Kategorię** (np. "Poradniki księgowe")

3. Dodaj **Tagi** (np. "KPiR", "VAT", "ZUS")

4. Kliknij **"Opublikuj"**

**Po 5-10 minutach** wpis pojawi się na stronie Next.js!

### 🔄 Aktualizacja Wpisu:

1. Edytuj wpis w WordPress
2. Kliknij **"Aktualizuj"**
3. Next.js pobierze zmiany przy kolejnym buildzie lub przy odwiedzeniu strony

---

## 🎨 **Przykładowe Obrazy do Użycia**

### Featured Images (1200x500px):
- Zdjęcia biurowe (biuro, laptop, kalkulator)
- Zdjęcia biznesowe (handshake, spotkanie)
- Grafiki z tekstem (np. "Przewodnik KPiR 2026")

### W Treści (800px+):
- Screenshoty (instrukcje, formularze)
- Infografiki (schematy, diagramy)
- Zdjęcia ilustracyjne (dokumenty, teczki)

**Gdzie szukać?**
- Unsplash.com (darmowe zdjęcia biznesowe)
- Pexels.com
- Twoje własne zdjęcia/screenshots

---

## 📞 **Potrzebujesz Pomocy?**

Jeśli coś nie działa:
1. Sprawdź czy Featured Image jest ustawiony
2. Sprawdź czy wpis jest **OPUBLIKOWANY** (nie Draft)
3. Sprawdź czy WordPress jest dostępny pod: `https://montebiuro.pl/blog/wp-json/wp/v2/posts`
4. Wyczyść cache przeglądarki

---

**Gotowe! Teraz wystarczy pisać treść w WordPressie, a strona sama ułoży to w piękny design! 🎉**
