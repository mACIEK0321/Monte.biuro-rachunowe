import { pageMetadata } from '@/lib/seo';
import PageSchema from '@/components/PageSchema';
import ResetCookiesButton from '@/components/ResetCookiesButton';

export const metadata = pageMetadata({title: 'Polityka Cookies', description: 'Polityka cookies strony montebiuro.pl – informacje o plikach cookies, Google Analytics i zarządzaniu zgodami.', path: '/polityka-cookies/', lang: 'pl'});

export default function PolitykaCookies() {
  return (
    <section className="legal-page" style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <PageSchema path="/polityka-cookies/" title={'Polityka Cookies'} lang="pl" />
      <h1>Polityka Cookies</h1>

      {/* 1 */}
      <h2>1. Informacje ogólne</h2>
      <p>Niniejsza Polityka cookies dotyczy strony internetowej prowadzonej przez</p>
      <p>
        <strong>MonTe Biuro Rachunkowe s.c.</strong><br />
        ul. Myśliwska 8, 30-718 Kraków
      </p>
      <p>
        Strona wykorzystuje pliki cookies zgodnie z przepisami prawa, w szczególności RODO
        oraz ustawą Prawo komunikacji elektronicznej.
      </p>

      {/* 2 */}
      <h2>2. Czym są pliki cookies</h2>
      <p>
        Pliki cookies to niewielkie informacje tekstowe zapisywane na urządzeniu użytkownika
        podczas korzystania ze strony internetowej. Pozwalają one na prawidłowe działanie
        strony oraz analizę sposobu korzystania z niej.
      </p>

      {/* 3 */}
      <h2>3. Jakie cookies są stosowane</h2>

      <h3>Cookies niezbędne</h3>
      <p>
        Służą do zapamiętania ustawień. Wybór jest przechowywany lokalnie w przeglądarce
        pod kluczem montebiuro-cookie-consent przez 180 dni, po czym prosimy o ponowną decyzję.
      </p>

      <h3>Cookies analityczne – Google Analytics</h3>
      <p>Strona korzysta z narzędzia Google Analytics 4, którego dostawcą jest:</p>
      <p>
        <strong>Google Ireland Limited</strong><br />
        Gordon House, Barrow Street<br />
        Dublin 4, Irlandia
      </p>
      <p>W ramach tego narzędzia zapisywane są m.in. pliki:</p>
      <ul>
        <li><code>_ga</code></li>
        <li><code>_ga_*</code></li>
      </ul>
      <p>Cookies te służą do:</p>
      <ul>
        <li>analizy ruchu na stronie,</li>
        <li>pomiaru liczby użytkowników,</li>
        <li>tworzenia statystyk dotyczących korzystania ze strony.</li>
      </ul>
      <p>
        Dane mają charakter statystyczny i nie pozwalają Administratorowi na bezpośrednią
        identyfikację użytkownika.
      </p>
      <p>Okres przechowywania: do 426 dni (około 14 miesięcy), bez przedłużania przy kolejnych odwiedzinach.</p>

      <h3>Marketing – Google Ads</h3>
      <p>
        Osobna, dobrowolna zgoda na marketing pozwala mierzyć skuteczność reklam oraz
        personalizować reklamy Google. Dostawcą jest Google Ireland Limited, wskazany powyżej.
        Po jej udzieleniu do Google mogą być przekazywane identyfikatory kliknięć reklam
        (gclid, gbraid, wbraid) oraz informacje o wysłaniu formularza i kliknięciu numeru telefonu.
        Nie przekazujemy treści formularza w tych zdarzeniach.
      </p>
      <p>
        Zgody na analitykę i marketing wybiera się niezależnie. Zgoda na marketing bez analityki
        pozwala mierzyć te konwersje bez zgody na zapisywanie cookies analitycznych.
        Odrzucenie obu kategorii blokuje ładowanie tagu Google.
      </p>

      {/* 4 */}
      <h2>4. Zgody na analitykę i marketing</h2>
      <p>
        Obie kategorie są domyślnie wyłączone. W szczegółach banera możesz włączyć każdą
        z nich osobno i zapisać wybór. „Akceptuj wszystkie” włącza obie, a „Tylko niezbędne”
        odrzuca obie. Zgoda na analitykę nie oznacza zgody na marketing.
      </p>
      <p>
        Podstawą prawną jest <em>art. 6 ust. 1 lit. a RODO</em> (zgoda).
      </p>

      {/* 5 */}
      <h2>5. Przekazywanie danych poza EOG</h2>
      <p>
        W związku z korzystaniem z usług Google dane mogą być przekazywane poza Europejski
        Obszar Gospodarczy. Przekazanie odbywa się zgodnie z obowiązującymi przepisami prawa,
        w szczególności na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję
        Europejską.
      </p>

      {/* 6 */}
      <h2>6. Zarządzanie cookies</h2>
      <p>Użytkownik może w każdej chwili:</p>
      <ul>
        <li>zmienić ustawienia cookies w przeglądarce,</li>
        <li>usunąć zapisane pliki cookies,</li>
        <li>wycofać zgodę poprzez ustawienia banera cookies.</li>
      </ul>
      <p>Odmowa zgody na analitykę lub marketing nie blokuje korzystania ze strony ani formularza kontaktowego.</p>

      <ResetCookiesButton />
    </section>
  );
}
