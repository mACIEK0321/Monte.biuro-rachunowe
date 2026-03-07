import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin',
  description:
    'Regulamin świadczenia usług księgowych MonTe Biuro Rachunkowe s.c. – zasady współpracy, obowiązki stron i warunki płatności.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.montebiuro.pl/regulamin',
    languages: {
      pl: 'https://www.montebiuro.pl/regulamin',
      en: 'https://www.montebiuro.pl/en/terms-and-conditions',
    },
  },
};

export default function Regulamin() {
  return (
    <section
      className="legal-page"
      style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 1.5rem' }}
    >
      <h1>Regulamin świadczenia usług księgowych</h1>
      <p className="legal-subtitle">
        <strong>MonTe Biuro Rachunkowe s.c.</strong> — Data wejścia w życie: 1 marca 2026&nbsp;r.
      </p>

      {/* § 1 */}
      <h2>§&nbsp;1. Postanowienia ogólne</h2>
      <ol>
        <li>
          Niniejszy Regulamin określa zasady świadczenia usług księgowych, podatkowych
          i kadrowo-płacowych przez MonTe Biuro Rachunkowe s.c., zwaną dalej
          „Usługodawcą".
        </li>
        <li>
          Usługodawca działa na podstawie wpisu do Centralnej Ewidencji i Informacji
          o Działalności Gospodarczej (CEIDG) oraz posiada certyfikat Ministerstwa
          Finansów uprawniający do usługowego prowadzenia ksiąg rachunkowych,
          nr&nbsp;36393/2020.
        </li>
        <li>
          Usługodawca świadczy usługi wyłącznie na podstawie pisemnej umowy zawartej
          z Klientem.
        </li>
        <li>
          Regulamin stanowi integralną część umowy o świadczenie usług, chyba że umowa
          stanowi inaczej.
        </li>
      </ol>

      {/* § 2 */}
      <h2>§&nbsp;2. Definicje</h2>
      <p>Na potrzeby niniejszego Regulaminu przyjmuje się następujące definicje:</p>
      <ol>
        <li>
          <strong>Usługodawca</strong> – MonTe Biuro Rachunkowe s.c.,
          ul.&nbsp;Myśliwska&nbsp;8, 30-718 Kraków.
        </li>
        <li>
          <strong>Klient</strong> – osoba fizyczna prowadząca działalność gospodarczą,
          osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej,
          która zawarła z Usługodawcą umowę o świadczenie usług.
        </li>
        <li>
          <strong>Umowa</strong> – pisemna umowa o świadczenie usług księgowych zawarta
          pomiędzy Usługodawcą a Klientem.
        </li>
        <li>
          <strong>Dokumenty źródłowe</strong> – faktury, rachunki, wyciągi bankowe,
          listy płac i inne dokumenty finansowo-księgowe przekazywane przez Klienta
          Usługodawcy.
        </li>
        <li>
          <strong>Panel klienta</strong> – system informatyczny (wFirma lub analogiczny)
          umożliwiający elektroniczne przekazywanie dokumentów, dostęp do rozliczeń
          i komunikację między stronami.
        </li>
      </ol>

      {/* § 3 */}
      <h2>§&nbsp;3. Zakres świadczonych usług</h2>
      <ol>
        <li>
          Usługodawca świadczy usługi w zakresie określonym w Umowie, w szczególności:
          <ul>
            <li>prowadzenia ksiąg rachunkowych lub KPiR,</li>
            <li>ewidencji ryczałtu od przychodów ewidencjonowanych,</li>
            <li>rozliczeń podatku dochodowego (PIT, CIT),</li>
            <li>rozliczeń VAT oraz sporządzania plików JPK,</li>
            <li>obsługi kadrowo-płacowej i rozliczeń ZUS,</li>
            <li>sporządzania sprawozdań finansowych,</li>
            <li>reprezentacji Klienta przed organami podatkowymi i ZUS,</li>
            <li>bieżącego doradztwa księgowego i podatkowego.</li>
          </ul>
        </li>
        <li>
          Szczegółowy zakres usług oraz wynagrodzenie określa Umowa lub jej załącznik.
        </li>
        <li>
          Usługi poza uzgodnionym zakresem realizowane są na podstawie odrębnego
          zlecenia i podlegają osobnej wycenie.
        </li>
      </ol>

      {/* § 4 */}
      <h2>§&nbsp;4. Zawarcie umowy</h2>
      <ol>
        <li>
          Umowa zawierana jest w formie pisemnej lub elektronicznej (podpis
          kwalifikowany, profil zaufany).
        </li>
        <li>
          Warunkiem zawarcia Umowy jest dostarczenie przez Klienta kompletnych danych
          niezbędnych do jej realizacji, w tym dokumentów rejestrowych działalności.
        </li>
        <li>
          Umowa zawierana jest na czas nieokreślony lub określony, zgodnie z jej treścią.
        </li>
        <li>
          Usługodawca zastrzega sobie prawo do odmowy zawarcia Umowy bez podania
          przyczyny.
        </li>
      </ol>

      {/* § 5 */}
      <h2>§&nbsp;5. Obowiązki Usługodawcy</h2>
      <ol>
        <li>
          Usługodawca zobowiązuje się do:
          <ul>
            <li>prowadzenia ksiąg i rozliczeń zgodnie z obowiązującymi przepisami prawa,</li>
            <li>dochowania należytej staranności przy realizacji zleconych usług,</li>
            <li>
              informowania Klienta o istotnych zmianach w przepisach podatkowych
              i rachunkowych mających wpływ na jego działalność,
            </li>
            <li>zachowania poufności wszelkich informacji uzyskanych od Klienta,</li>
            <li>wyznaczenia opiekuna odpowiedzialnego za obsługę Klienta,</li>
            <li>
              terminowego składania deklaracji i sprawozdań, pod warunkiem terminowego
              dostarczenia przez Klienta kompletnych dokumentów źródłowych.
            </li>
          </ul>
        </li>
        <li>
          Usługodawca nie ponosi odpowiedzialności za skutki wynikające z opóźnień
          lub nieprawidłowości spowodowanych działaniami lub zaniechaniami Klienta.
        </li>
      </ol>

      {/* § 6 */}
      <h2>§&nbsp;6. Obowiązki Klienta</h2>
      <ol>
        <li>
          Klient zobowiązuje się do:
          <ul>
            <li>
              terminowego przekazywania kompletnych dokumentów źródłowych, nie później
              niż do 5. dnia roboczego miesiąca następującego po miesiącu, którego
              dokumenty dotyczą,
            </li>
            <li>
              niezwłocznego informowania Usługodawcy o zdarzeniach mogących mieć wpływ
              na rozliczenia (m.in. zmiana formy opodatkowania, zatrudnienie
              pracowników),
            </li>
            <li>terminowego regulowania wynagrodzenia należnego Usługodawcy,</li>
            <li>przechowywania dokumentacji zgodnie z obowiązującymi przepisami,</li>
            <li>współpracy przy migracjach danych z poprzednich biur rachunkowych.</li>
          </ul>
        </li>
        <li>
          Klient ponosi wyłączną odpowiedzialność za rzetelność i kompletność
          przekazywanych dokumentów i informacji.
        </li>
      </ol>

      {/* § 7 */}
      <h2>§&nbsp;7. Wynagrodzenie i warunki płatności</h2>
      <ol>
        <li>
          Wynagrodzenie określone jest w Umowie w kwocie netto, powiększanej o VAT
          według stawki obowiązującej w dniu wystawienia faktury.
        </li>
        <li>
          Wynagrodzenie płatne jest z góry, do ostatniego dnia roboczego miesiąca
          poprzedzającego miesiąc świadczenia usług, lub w innym terminie wskazanym
          w Umowie.
        </li>
        <li>
          Faktura wystawiana jest na początku każdego okresu rozliczeniowego
          i dostarczana drogą elektroniczną.
        </li>
        <li>
          W przypadku opóźnienia w płatności Usługodawca uprawniony jest do naliczenia
          odsetek ustawowych za opóźnienie w transakcjach handlowych.
        </li>
        <li>
          Usługodawca zastrzega sobie prawo do zmiany wynagrodzenia z zachowaniem
          jednomiesięcznego okresu wypowiedzenia w tej części.
        </li>
      </ol>

      {/* § 8 */}
      <h2>§&nbsp;8. Przekazywanie dokumentów</h2>
      <ol>
        <li>
          Dokumenty przekazywane są wyłącznie drogą elektroniczną za pośrednictwem
          Panelu klienta, chyba że strony postanowią inaczej.
        </li>
        <li>
          Klient odpowiada za czytelność, kompletność i jakość skanów lub zdjęć
          przekazywanych dokumentów.
        </li>
        <li>Usługodawca potwierdza odbiór dokumentów w Panelu klienta.</li>
        <li>
          Oryginały dokumentów przechowywane są przez Klienta lub przekazywane
          Usługodawcy na podstawie odrębnych ustaleń.
        </li>
      </ol>

      {/* § 9 */}
      <h2>§&nbsp;9. Ochrona danych osobowych i poufność</h2>
      <ol>
        <li>
          Usługodawca przetwarza dane osobowe Klienta i jego pracowników wyłącznie
          w celu realizacji Umowy.
        </li>
        <li>
          Szczegółowe zasady przetwarzania danych osobowych określa{' '}
          <a href="/polityka-prywatnosci">Polityka prywatności</a>.
        </li>
        <li>
          Strony zobowiązują się do zachowania w tajemnicy wszelkich informacji
          poufnych uzyskanych w związku z realizacją Umowy, zarówno w trakcie jej
          obowiązywania, jak i po jej rozwiązaniu, bezterminowo.
        </li>
        <li>
          Obowiązek poufności nie dotyczy informacji, których ujawnienie wymagane
          jest przez przepisy prawa lub na żądanie uprawnionych organów.
        </li>
      </ol>

      {/* § 10 */}
      <h2>§&nbsp;10. Odpowiedzialność</h2>
      <ol>
        <li>
          Usługodawca odpowiada za szkody wyrządzone Klientowi z winy Usługodawcy,
          bezpośrednio wynikające z realizacji usług, do wysokości dwunastokrotności
          miesięcznego wynagrodzenia netto określonego w Umowie, chyba że szkoda
          wynikła z rażącego niedbalstwa lub umyślnego działania.
        </li>
        <li>
          Usługodawca nie ponosi odpowiedzialności za:
          <ul>
            <li>
              skutki przekazania niekompletnych, nierzetelnych lub spóźnionych
              dokumentów przez Klienta,
            </li>
            <li>
              decyzje podejmowane przez Klienta bez uprzedniej konsultacji
              z Usługodawcą,
            </li>
            <li>zmiany przepisów wchodzące w życie po wykonaniu usługi,</li>
            <li>siłę wyższą, w tym awarie systemów niezależne od Usługodawcy.</li>
          </ul>
        </li>
        <li>Usługodawca posiada ubezpieczenie odpowiedzialności cywilnej.</li>
      </ol>

      {/* § 11 */}
      <h2>§&nbsp;11. Rozwiązanie umowy</h2>
      <ol>
        <li>
          Każda ze stron może wypowiedzieć Umowę zawartą na czas nieokreślony
          z zachowaniem jednomiesięcznego okresu wypowiedzenia, ze skutkiem na koniec
          miesiąca kalendarzowego.
        </li>
        <li>
          Usługodawca może wypowiedzieć Umowę ze skutkiem natychmiastowym w przypadku:
          <ul>
            <li>zalegania przez Klienta z płatnościami przez okres dłuższy niż 30 dni,</li>
            <li>przekazywania dokumentów lub informacji niezgodnych z prawdą,</li>
            <li>naruszenia innych istotnych postanowień Umowy.</li>
          </ul>
        </li>
        <li>
          Po rozwiązaniu Umowy Usługodawca przekaże Klientowi dokumentację
          i archiwum danych w terminie do 30 dni, po uregulowaniu wszelkich zobowiązań
          finansowych.
        </li>
      </ol>

      {/* § 12 */}
      <h2>§&nbsp;12. Reklamacje</h2>
      <ol>
        <li>
          Klient może zgłaszać reklamacje w formie pisemnej lub elektronicznej na adres:{' '}
          <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>.
        </li>
        <li>
          Reklamacja powinna zawierać: opis przedmiotu reklamacji, okoliczności jej
          powstania oraz oczekiwany sposób rozpatrzenia.
        </li>
        <li>
          Usługodawca rozpatruje reklamację w terminie 14 dni roboczych od jej
          otrzymania.
        </li>
      </ol>

      {/* § 13 */}
      <h2>§&nbsp;13. Postanowienia końcowe</h2>
      <ol>
        <li>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy
          polskiego Kodeksu cywilnego, ustawy o rachunkowości oraz innych właściwych
          aktów prawnych.
        </li>
        <li>
          Wszelkie spory wynikające z Umowy strony będą starały się rozwiązać
          polubownie. W przypadku braku porozumienia sądem właściwym jest sąd właściwy
          dla siedziby Usługodawcy.
        </li>
        <li>
          Usługodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu.
          O zmianach Klient zostanie poinformowany z co najmniej 14-dniowym
          wyprzedzeniem drogą elektroniczną.
        </li>
        <li>Regulamin wchodzi w życie z dniem 1 marca 2026&nbsp;r.</li>
      </ol>

      <p style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', fontSize: '0.9rem', color: '#666' }}>
        <strong>MonTe Biuro Rachunkowe s.c.</strong><br />
        ul.&nbsp;Myśliwska&nbsp;8, 30-718 Kraków<br />
        <a href="mailto:kontakt@montebiuro.pl">kontakt@montebiuro.pl</a>
      </p>
    </section>
  );
}
