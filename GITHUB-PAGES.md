# Jak opublikować stronę na GitHubie (tylko dla osób z linkiem)

## Jak to działa

- **GitHub Pages (darmowe)** udostępnia stronę pod adresem typu:  
  `https://TWOJA-NAZWA.github.io/nazwa-repo/`
- Strona **nie jest** automatycznie wpisywana do Google ani nigdzie reklamowana.
- **W praktyce**: tylko osoby, którym wyślesz link, będą wiedzieć, że strona istnieje – o ile sam nie dodasz jej do wyszukiwarek ani nie wkleisz linku publicznie.
- **Uwaga**: każdy, kto **ma** ten adres URL, może wejść na stronę. Nie ma tu logowania ani hasła – to po prostu „strona pod linkiem”.

Jeśli chcesz **prawdziwej** blokady (np. hasło, tylko zalogowani), trzeba innego hostingu (np. Netlify z hasłem) albo płatnego GitHub Pro i prywatnych GitHub Pages.

---

## Kroki: publikacja przez GitHub Pages

### 1. Wypchnij kod na GitHub

W folderze projektu (PowerShell lub Git Bash):

```bash
git add .
git commit -m "Strona gotowa do publikacji"
git push origin main
```

Jeśli repo jeszcze nie jest podłączone, najpierw utwórz repozytorium na GitHubie (np. `strona-ksiegowosc`), potem:

```bash
git remote add origin https://github.com/TWOJA-NAZWA/strona-ksiegowosc.git
git branch -M main
git push -u origin main
```

### 2. Włącz GitHub Pages

1. Wejdź na **GitHub.com** → Twoje repozytorium.
2. **Settings** (Ustawienia) → w menu po lewej: **Pages**.
3. W sekcji **Source** (Źródło):
   - wybierz **Deploy from a branch**,
   - w **Branch** wybierz `main` (lub `master`, jeśli tak masz),
   - folder: **/ (root)**,
   - zapisz (**Save**).

### 3. Adres strony

Po kilku minutach strona będzie dostępna pod:

- **https://TWOJA-NAZWA.github.io/nazwa-repo/**

Np. jeśli użytkownik to `janek`, a repo to `strona-ksiegowosc`:

- **https://janek.github.io/strona-ksiegowosc/**

Ten link możesz wysyłać tylko wybranym osobom – wtedy w praktyce tylko one będą mogły zobaczyć stronę.

---

## Żeby strona była „tylko dla osób z linka”

- **Nie** dodawaj strony do Google Search Console ani innych wyszukiwarek.
- **Nie** wstawiaj linku na publicznych stronach / social media (chyba że chcesz, żeby był publiczny).
- **Wysyłaj link** tylko mailem / messengerm / SMS do konkretnych osób.

Dzięki temu strona pozostanie w praktyce „tylko dla osób, którym wyślesz link”.

---

## Opcjonalnie: własna domena

W **Settings → Pages** możesz ustawić własną domenę (np. `monte.biuro.pl`). GitHub podpowie, jakie rekordy DNS dodać u rejestratora domeny.
