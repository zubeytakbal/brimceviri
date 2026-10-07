import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { ArbeitstageRechner } from "../../components/dates/GermanDateTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { countDays } from "../../converter/time/dateMath";
import { todayBerlin, ymdInput } from "../../converter/time/germanDates";
import { GERMAN_STATES, germanHolidayLookup } from "../../converter/time/germanHolidays";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/arbeitstage-rechner";

export function generateMetadata(): Metadata {
  const year = todayBerlin().year;
  const title = `Arbeitstage-Rechner ${year}: Arbeitstage nach Bundesland`;
  const description = `Arbeitstage und Werktage zwischen zwei Daten berechnen, mit den Feiertagen aller 16 Bundesländer. Dazu die Arbeitstage ${year} und ${year + 1} je Bundesland im Überblick.`;
  return {
    title: seoTitle(title, `Arbeitstage-Rechner ${year}`),
    description,
    alternates: { canonical: path, ...timeToolAlternates("businessDays") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

function yearCount(code: (typeof GERMAN_STATES)[number]["code"], year: number) {
  return countDays({ year, month: 1, day: 1 }, { year, month: 12, day: 31 }, germanHolidayLookup(code, year, year));
}

export default function ArbeitstagePage() {
  const today = todayBerlin();
  const year = today.year;
  const rows = GERMAN_STATES.map((s) => ({ s, a: yearCount(s.code, year), b: yearCount(s.code, year + 1) }));
  const min = rows.reduce((m, r) => (r.a.work < m.a.work ? r : m));
  const max = rows.reduce((m, r) => (r.a.work > m.a.work ? r : m));

  const faqItems: FaqItem[] = [
    { question: `Wie viele Arbeitstage hat ${year}?`, answer: `Je nach Bundesland zwischen ${min.a.work} (${min.s.name}) und ${max.a.work} (${max.s.name}) Arbeitstage bei einer Fünf-Tage-Woche.` },
    { question: "Was ist der Unterschied zwischen Arbeitstagen und Werktagen?", answer: "Arbeitstage sind in der Regel Montag bis Freitag ohne Feiertage. Werktage sind nach dem Bundesurlaubsgesetz alle Tage außer Sonn- und gesetzlichen Feiertagen, also auch der Samstag. Aktivieren Sie im Rechner „Samstag mitzählen“, um Werktage zu erhalten." },
    { question: "Wie viele Arbeitstage setzt das Finanzamt für die Pendlerpauschale an?", answer: "Es gibt keinen festen Wert; angegeben werden die tatsächlichen Tage an der ersten Tätigkeitsstätte. Bei einer Fünf-Tage-Woche mit 30 Urlaubstagen sind es meist rund 220 Tage; Homeoffice-, Krankheits- und Urlaubstage zählen nicht." },
    { question: "Werden Feiertage am Wochenende abgezogen?", answer: "Nein. Fällt ein Feiertag auf einen Samstag oder Sonntag, ändert sich die Zahl der Arbeitstage nicht; in Deutschland gibt es keinen Ersatzfeiertag." },
    { question: "Warum hat Bayern weniger Arbeitstage?", answer: "Bayern hat mit Heilige Drei Könige, Fronleichnam und Allerheiligen die meisten landesweiten Feiertage; in katholisch geprägten Gemeinden kommt Mariä Himmelfahrt hinzu. Dieser Tag lässt sich im Rechner über „Regionale Feiertage einbeziehen“ berücksichtigen." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Arbeitstage-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Arbeitstage-Rechner"
        intro="Wie viele Arbeitstage liegen zwischen zwei Daten? Wählen Sie Zeitraum und Bundesland; der Rechner zieht Wochenenden und die gesetzlichen Feiertage des Landes ab und listet die Feiertage im Zeitraum auf."
        tool={<ArbeitstageRechner today={ymdInput(today)} />}
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "laender", label: `Arbeitstage ${year} und ${year + 1} je Bundesland` },
          { id: "berechnung", label: "So wird gerechnet" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="laender">
          Arbeitstage {year} und {year + 1} je Bundesland
        </h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Bundesland</th>
                <th scope="col">Arbeitstage {year}</th>
                <th scope="col">Arbeitstage {year + 1}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ s, a, b }) => (
                <tr key={s.code}>
                  <td>
                    <Link href={`/de/feiertage?land=${s.slug}`} prefetch={false}>
                      {s.name}
                    </Link>
                  </td>
                  <td>{a.work}</td>
                  <td>{b.work}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>Fünf-Tage-Woche (Montag bis Freitag), landesweite gesetzliche Feiertage; regionale Feiertage wie Mariä Himmelfahrt in Bayern sind nicht abgezogen.</small>
        </p>

        <h2 id="berechnung">So wird gerechnet</h2>
        <p>
          Arbeitstage = Kalendertage im Zeitraum − Samstage und Sonntage − gesetzliche Feiertage, die auf Montag bis Freitag fallen. Start- und Enddatum
          zählen beide mit. Beispiel: Der Mai 2026 hat 21 Wochentage; in Nordrhein-Westfalen fallen der Tag der Arbeit (Freitag, 1. Mai), Christi
          Himmelfahrt (14. Mai) und Pfingstmontag (25. Mai) darauf, es bleiben 18 Arbeitstage.
        </p>
        <p>
          Bewegliche Feiertage wie Ostern, Christi Himmelfahrt, Pfingsten und Fronleichnam hängen vom Osterdatum ab und verschieben die Zahl der
          Arbeitstage von Jahr zu Jahr. Die Feiertage je Land finden Sie unter <Link href="/de/feiertage">Feiertage nach Bundesland</Link>; die Zahl der
          Kalendertage zwischen zwei Daten liefert der <Link href="/de/tagerechner">Tagerechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
