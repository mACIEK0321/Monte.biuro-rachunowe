import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności',
  description:
    'Polityka prywatności MonTe Biuro Rachunkowe s.c. – zasady przetwarzania danych osobowych zgodnie z RODO.',
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosci() {
  return (
    <section className="legal-page" style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1>Polityka Prywatności</h1>
      <p className="legal-subtitle">Ochrona i przetwarzanie danych osobowych</p>

      <p>
        W związku z obowiązywaniem Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
        z dnia 27 kwietnia 2016&nbsp;r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
        danych osobowych oraz w sprawie swobodnego przepływu takich danych (RODO), MonTe Biuro
        Rachunkowe s.c. informuje o zasadach przetwarzania danych osobowych oraz o przysługujących
        prawach.
      </p>

      {/* 1. Administrator danych */}
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Państwa danych osobowych jest<br />
        <strong>MonTe Biuro Rachunkowe s.c.</strong><br />
        ul. Myśliwska 8, 30-718 Kraków<br />
        dalej zwane &bdquo;Administratorem&rdquo;.
      </p>

      {/* 2. Kontakt */}
      <h2>2. Kontakt w sprawach danych osobowych</h2>
      <p>
        W sprawach związanych z przetwarzaniem danych osobowych można skontaktować się
        z Administratorem:<br />
        drogą elektroniczną: <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>
      </p>

      {/* 3. Cele */}
      <h2>3. Cele przetwarzania danych osobowych</h2>
      <p>Państwa dane osobowe przetwarzane są w następujących celach:</p>
      <ul>
        <li>
          zawarcia i realizacji umów o świadczenie usług księgowych, podatkowych oraz
          kadrowo-płacowych — <em>art. 6 ust. 1 lit. b RODO</em>
        </li>
        <li>
          prowadzenia dokumentacji księgowej i rozliczeń finansowych — <em>art. 6 ust. 1 lit. b
          oraz c RODO</em>
        </li>
        <li>
          wypełnienia obowiązków prawnych wynikających z przepisów prawa podatkowego,
          rachunkowego i ubezpieczeniowego — <em>art. 6 ust. 1 lit. c RODO</em>
        </li>
        <li>
          kontaktu z klientami oraz obsługi zapytań — <em>art. 6 ust. 1 lit. f RODO</em>
        </li>
        <li>
          marketingu własnych usług Administratora — <em>art. 6 ust. 1 lit. f RODO</em> lub{' '}
          <em>art. 6 ust. 1 lit. a RODO</em> (zgoda, gdy wymagana)
        </li>
        <li>
          ustalenia, dochodzenia lub obrony roszczeń — <em>art. 6 ust. 1 lit. f RODO</em>
        </li>
        <li>
          prowadzenia statystyk i analizy korzystania ze strony internetowej —{' '}
          <em>art. 6 ust. 1 lit. a RODO</em> (zgoda poprzez baner cookies)
        </li>
      </ul>

      {/* 4. Zakres */}
      <h2>4. Zakres przetwarzanych danych</h2>
      <p>Administrator może przetwarzać w szczególności:</p>
      <ul>
        <li>dane identyfikacyjne i kontaktowe,</li>
        <li>dane finansowe i podatkowe,</li>
        <li>dane pracowników klientów w zakresie obsługi kadrowo-płacowej,</li>
        <li>dane zawarte w dokumentach księgowych,</li>
        <li>dane dotyczące korzystania ze strony internetowej (np. identyfikatory internetowe).</li>
      </ul>

      {/* 5. Odbiorcy */}
      <h2>5. Odbiorcy danych</h2>
      <p>
        Odbiorcami danych osobowych mogą być podmioty współpracujące z Administratorem,
        w szczególności:
      </p>
      <ul>
        <li>dostawcy systemów księgowych i informatycznych,</li>
        <li>dostawcy usług hostingowych i poczty elektronicznej,</li>
        <li>podmioty świadczące obsługę prawną lub doradczą,</li>
        <li>banki i operatorzy płatności,</li>
        <li>operatorzy pocztowi i firmy kurierskie,</li>
        <li>organy publiczne — w zakresie wynikającym z przepisów prawa,</li>
        <li>dostawcy narzędzi analitycznych (Google Ireland Limited).</li>
      </ul>

      {/* 6. Przekazywanie poza EOG */}
      <h2>6. Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
      <p>
        W związku z korzystaniem z narzędzi Google Analytics dane mogą być przekazywane poza
        Europejski Obszar Gospodarczy.
      </p>
      <p>
        Przekazywanie odbywa się zgodnie z przepisami RODO, w szczególności na podstawie
        standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.
      </p>

      {/* 7. Okres przechowywania */}
      <h2>7. Okres przechowywania danych</h2>
      <p>Dane osobowe będą przechowywane przez okres:</p>
      <ul>
        <li>trwania umowy i realizacji usług,</li>
        <li>wymagany przepisami prawa, w szczególności podatkowymi i rachunkowymi,</li>
        <li>do czasu przedawnienia roszczeń,</li>
        <li>do momentu wycofania zgody — w przypadku danych przetwarzanych na jej podstawie,</li>
        <li>do czasu wniesienia sprzeciwu wobec przetwarzania danych w celach marketingowych.</li>
      </ul>

      {/* 8. Profilowanie */}
      <h2>8. Profilowanie</h2>
      <p>
        Dane mogą być przetwarzane w sposób zautomatyzowany w celach statystycznych (Google
        Analytics). Nie są podejmowane decyzje wywołujące wobec Państwa skutki prawne ani
        w istotny sposób na Państwa wpływające.
      </p>

      {/* 9. Prawa */}
      <h2>9. Prawa osób, których dane dotyczą</h2>
      <p>Przysługuje Państwu prawo do:</p>
      <ul>
        <li>dostępu do danych,</li>
        <li>sprostowania danych,</li>
        <li>usunięcia danych,</li>
        <li>ograniczenia przetwarzania,</li>
        <li>sprzeciwu wobec przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>wycofania zgody w dowolnym momencie,</li>
        <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
      </ul>

      {/* 10. Dobrowolność */}
      <h2>10. Dobrowolność podania danych</h2>
      <p>
        Podanie danych jest dobrowolne, jednak niezbędne do zawarcia umowy oraz realizacji
        usług. Brak podania danych uniemożliwi realizację usług.
      </p>

      {/* 11. Cookies */}
      <h2>11. Pliki cookies</h2>
      <p>
        Strona internetowa wykorzystuje pliki cookies zgodnie z{' '}
        <a href="/polityka-cookies">Polityką cookies</a>.
      </p>
      <p>
        Administrator korzysta z narzędzia Google Analytics 4 w celu prowadzenia statystyk
        i analizy ruchu na stronie. Szczegółowe informacje dotyczące zasad działania cookies
        znajdują się w odrębnej <a href="/polityka-cookies">Polityce cookies</a>.
      </p>
    </section>
  );
}
