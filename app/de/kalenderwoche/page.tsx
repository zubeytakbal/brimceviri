import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { KalenderwocheTool } from "../../components/dates/GermanDateTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { addDaysYmd, isoWeeksInYear } from "../../converter/time/dateMath";
import { formatDeLong, formatDeShort, kalenderwoche, todayBerlin, weekRangeDe, ymdInput } from "../../converter/time/germanDates";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

// Die aktuelle Woche ändert sich täglich.
export const revalidate = 21600;

const path = "/de/kalenderwoche";

export function generateMetadata(): Metadata {
  const today = todayBerlin();
  const kw = kalenderwoche(today);
  const title = `Aktuelle Kalenderwoche: KW ${kw.week} (${weekRangeDe(kw.monday, kw.sunday)})`;
  const description = `Heute ist ${formatDeLong(today)}, wir haben KW ${kw.week}. Kalenderwoche für jedes Datum berechnen, alle Kalenderwochen ${kw.year} mit Datum und die Regeln nach ISO 8601.`;
  return {
    title: seoTitle(title, `Aktuelle Kalenderwoche: KW ${kw.week} ${kw.year}`),
    description,
    alternates: { canonical: path, ...timeToolAlternates("weekNumber") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default function KalenderwochePage() {
  const today = todayBerlin();
  const kw = kalenderwoche(today);
  const year = kw.year;
  const weeks = isoWeeksInYear(year);
  const firstMonday = kalenderwoche({ year, month: 1, day: 4 }).monday;
  const rows = Array.from({ length: weeks }, (_, i) => {
    const monday = addDaysYmd(firstMonday, i * 7);
    return { week: i + 1, monday, sunday: addDaysYmd(monday, 6) };
  });
  const nextYear = year + 1;
  const nextKw1 = kalenderwoche({ year: nextYear, month: 1, day: 4 }).monday;
  const weeksNext = isoWeeksInYear(nextYear);

  const faqItems: FaqItem[] = [
    { question: "Welche Kalenderwoche haben wir?", answer: `Heute (${formatDeLong(today)}) ist KW ${kw.week}. Sie dauert von Montag, ${formatDeShort(kw.monday)}, bis Sonntag, ${formatDeShort(kw.sunday)}.` },
    { question: `Wie viele Kalenderwochen hat ${year}?`, answer: `${year} hat ${weeks} Kalenderwochen. ${weeks === 53 ? "Das passiert, wenn das Jahr an einem Donnerstag beginnt oder als Schaltjahr an einem Mittwoch." : "Ein Jahr hat nur dann 53 Kalenderwochen, wenn es an einem Donnerstag beginnt oder als Schaltjahr an einem Mittwoch."}` },
    { question: `Wann beginnt KW 1 ${nextYear}?`, answer: `KW 1 ${nextYear} beginnt am Montag, ${formatDeShort(nextKw1)}. ${nextYear} hat ${weeksNext} Kalenderwochen.` },
    { question: "Wie wird die Kalenderwoche berechnet?", answer: "Nach ISO 8601 (in Deutschland früher DIN 1355) beginnt jede Woche am Montag. KW 1 ist die Woche, die den ersten Donnerstag des Jahres enthält, also immer die Woche mit dem 4. Januar." },
    { question: "Warum zeigt mein amerikanischer Kalender eine andere Woche?", answer: "In den USA beginnt die Woche am Sonntag und Woche 1 ist die Woche mit dem 1. Januar. Deshalb weicht die Wochennummer dort oft um eins ab." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Kalenderwoche" },
        ]}
        crumbLabel="Brotkrumen"
        title={`Aktuelle Kalenderwoche: KW ${kw.week}`}
        intro={`Heute ist ${formatDeLong(today)}. Wir befinden uns in Kalenderwoche ${kw.week} (${weekRangeDe(kw.monday, kw.sunday)}). Berechnen Sie die KW für jedes Datum oder finden Sie heraus, in welchem Zeitraum eine bestimmte Kalenderwoche liegt.`}
        tool={<KalenderwocheTool today={ymdInput(today)} />}
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "liste", label: `Alle Kalenderwochen ${year}` },
          { id: "regeln", label: "So werden Kalenderwochen gezählt" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="liste">Alle Kalenderwochen {year}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">KW</th>
                <th scope="col">Montag</th>
                <th scope="col">Sonntag</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.week} className={r.week === kw.week && kw.year === year ? "is-current" : undefined}>
                  <td>{r.week === kw.week ? <strong>KW {r.week} (aktuell)</strong> : `KW ${r.week}`}</td>
                  <td>{formatDeShort(r.monday)}</td>
                  <td>{formatDeShort(r.sunday)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="regeln">So werden Kalenderwochen gezählt</h2>
        <p>
          In Deutschland, Österreich, der Schweiz und den meisten europäischen Ländern gilt die Norm ISO 8601 (früher DIN 1355): Eine Woche beginnt am
          Montag und endet am Sonntag. Die erste Kalenderwoche eines Jahres ist die Woche, in die der erste Donnerstag fällt – gleichbedeutend mit der
          Woche, die den 4. Januar enthält. Die Tage vom 1. bis 3. Januar können deshalb noch zur letzten Kalenderwoche des Vorjahres gehören, und der 29.
          bis 31. Dezember schon zu KW 1 des Folgejahres.
        </p>
        <p>
          Die meisten Jahre haben 52 Kalenderwochen. 53 Wochen hat ein Jahr, das an einem Donnerstag beginnt, sowie ein Schaltjahr, das an einem
          Mittwoch beginnt. Wenn Sie Termine über Wochen planen, hilft der <Link href="/de/tagerechner">Tagerechner</Link>; Arbeitstage mit Feiertagen je
          Bundesland zählt der <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
