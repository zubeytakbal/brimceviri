import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { Tagerechner } from "../../components/dates/GermanDateTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { addDaysYmd, diffDays } from "../../converter/time/dateMath";
import { formatDeShort, todayBerlin, weekdayDe, ymdInput } from "../../converter/time/germanDates";
import { easterSunday } from "../../converter/time/germanHolidays";
import type { YMD } from "../../converter/time/calendars";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const path = "/de/tagerechner";

export const metadata: Metadata = {
  title: seoTitle("Tagerechner: Tage zwischen zwei Daten berechnen"),
  description:
    "Wie viele Tage liegen zwischen zwei Daten? Tage, Wochen, Monate und Jahre zählen oder ein Datum plus oder minus Tage berechnen. Mit Tagen bis Weihnachten und Silvester.",
  alternates: { canonical: path, ...timeToolAlternates("dateDiff") },
  openGraph: {
    title: "Tagerechner: Tage zwischen zwei Daten berechnen",
    description: "Tage, Wochen und Monate zwischen zwei Daten zählen oder Tage zu einem Datum addieren.",
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

function nextOccurrence(today: YMD, month: number, day: number): YMD {
  const thisYear = { year: today.year, month, day };
  return diffDays(today, thisYear) >= 0 ? thisYear : { year: today.year + 1, month, day };
}

export default function TagerechnerPage() {
  const today = todayBerlin();
  const easter = diffDays(today, easterSunday(today.year)) >= 0 ? easterSunday(today.year) : easterSunday(today.year + 1);
  const targets = [
    { name: "Heiligabend", date: nextOccurrence(today, 12, 24) },
    { name: "Silvester", date: nextOccurrence(today, 12, 31) },
    { name: "Neujahr", date: nextOccurrence(today, 1, 1) },
    { name: "Ostersonntag", date: easter },
    { name: "Tag der Deutschen Einheit", date: nextOccurrence(today, 10, 3) },
  ]
    .map((t) => ({ ...t, days: diffDays(today, t.date) }))
    .sort((a, b) => a.days - b.days);
  const plus = [7, 14, 30, 60, 90, 100, 180, 365].map((n) => ({ n, date: addDaysYmd(today, n) }));
  const xmas = targets.find((t) => t.name === "Heiligabend")!;

  const faqItems: FaqItem[] = [
    { question: "Wie berechne ich die Tage zwischen zwei Daten?", answer: "Ziehen Sie das frühere Datum vom späteren ab; der Rechner berücksichtigt Monatslängen und Schaltjahre. Standardmäßig zählt nur einer der beiden Tage mit (vom 1. bis 2. Januar = 1 Tag). Soll das Enddatum mitzählen, setzen Sie das Häkchen." },
    { question: "Wie viele Tage sind es noch bis Weihnachten?", answer: `Bis Heiligabend (${formatDeShort(xmas.date)}) sind es ab heute noch ${xmas.days} Tage.` },
    { question: "Welches Datum ist in 90 Tagen?", answer: `Ab heute (${formatDeShort(today)}) ist es der ${weekdayDe(plus[4].date)}, ${formatDeShort(plus[4].date)}.` },
    { question: "Zählen Fristen in Deutschland den ersten Tag mit?", answer: "Bei gesetzlichen Fristen nach § 187 BGB zählt der Tag des Ereignisses meist nicht mit; die Frist beginnt am Folgetag. Für verbindliche Fristen im Zweifel rechtlichen Rat einholen." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Tagerechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Tagerechner"
        intro="Zählen Sie die Tage zwischen zwei Daten – als Tage, Wochen sowie Jahre, Monate und Tage – oder berechnen Sie, welches Datum in oder vor einer bestimmten Anzahl von Tagen liegt."
        tool={<Tagerechner today={ymdInput(today)} />}
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "countdown", label: "Wie viele Tage noch bis …?" },
          { id: "plus", label: "Datum in X Tagen" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="countdown">Wie viele Tage noch bis …?</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Anlass</th>
                <th scope="col">Datum</th>
                <th scope="col">Tage ab heute</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>
                    {weekdayDe(t.date)}, {formatDeShort(t.date)}
                  </td>
                  <td>{t.days === 0 ? "heute" : t.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="plus">Datum in X Tagen (ab {formatDeShort(today)})</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">In</th>
                <th scope="col">Datum</th>
              </tr>
            </thead>
            <tbody>
              {plus.map((p) => (
                <tr key={p.n}>
                  <td>{p.n} Tagen</td>
                  <td>
                    {weekdayDe(p.date)}, {formatDeShort(p.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Arbeitstage statt Kalendertage zählt der <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link> mit den Feiertagen Ihres Bundeslands;
          Ihr genaues Alter in Jahren, Monaten und Tagen zeigt der <Link href="/de/altersrechner">Altersrechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
