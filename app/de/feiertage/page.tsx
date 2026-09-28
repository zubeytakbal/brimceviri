import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatDeShort, todayBerlin, weekdayDeShort } from "../../converter/time/germanDates";
import { GERMAN_STATES, germanHolidaysCached, stateHolidays, type GermanHoliday } from "../../converter/time/germanHolidays";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/feiertage";

export function generateMetadata(): Metadata {
  const year = todayBerlin().year;
  const title = `Feiertage ${year} in Deutschland: alle Bundesländer`;
  const description = `Alle gesetzlichen Feiertage ${year} und ${year + 1} in Deutschland mit Datum, Wochentag und Geltung je Bundesland – von Neujahr bis Weihnachten, inklusive regionaler Feiertage.`;
  return {
    title: seoTitle(title, `Feiertage ${year} Deutschland`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

function statesText(h: GermanHoliday) {
  if (h.states.length === 16) return "bundesweit";
  const full = h.states.map((c) => GERMAN_STATES.find((s) => s.code === c)!.short).join(", ");
  const partial = (h.partialStates ?? []).map((c) => GERMAN_STATES.find((s) => s.code === c)!.short).join(", ");
  if (!full) return `nur regional (${partial})`;
  return partial ? `${full}; teilweise ${partial}` : full;
}

function HolidayTable({ year }: { year: number }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Feiertag</th>
            <th scope="col">Gilt in</th>
          </tr>
        </thead>
        <tbody>
          {germanHolidaysCached(year).map((h) => (
            <tr key={h.id}>
              <td>
                {weekdayDeShort(h.date)} {formatDeShort(h.date)}
              </td>
              <td>{h.name}</td>
              <td>{statesText(h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FeiertagePage() {
  const year = todayBerlin().year;
  const counts = GERMAN_STATES.map((s) => ({ s, n: stateHolidays(s.code, year).length })).sort((a, b) => b.n - a.n);

  const faqItems: FaqItem[] = [
    { question: `Wie viele Feiertage hat Deutschland ${year}?`, answer: `Bundesweit gibt es 9 gesetzliche Feiertage. Je nach Bundesland kommen weitere hinzu: ${year} hat ${counts[0].s.name} mit ${counts[0].n} die meisten, mehrere Länder haben nur 10.` },
    { question: "Welches Bundesland hat die meisten Feiertage?", answer: "Bayern mit 12 landesweiten Feiertagen; in Gemeinden mit überwiegend katholischer Bevölkerung kommt Mariä Himmelfahrt (15. August) hinzu, in Augsburg außerdem das Hohe Friedensfest am 8. August." },
    { question: "Welche Feiertage gelten bundesweit?", answer: "Neujahr, Karfreitag, Ostermontag, Tag der Arbeit (1. Mai), Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit (3. Oktober) sowie der 1. und 2. Weihnachtstag." },
    { question: "Sind Heiligabend und Silvester Feiertage?", answer: "Nein. Der 24. und 31. Dezember sind keine gesetzlichen Feiertage; viele Arbeitgeber geben aber frei oder einen halben Tag frei." },
    { question: "Was passiert, wenn ein Feiertag auf ein Wochenende fällt?", answer: "Anders als in manchen Ländern wird er in Deutschland nicht auf einen Werktag nachgeholt. Fällt ein Feiertag auf einen Samstag oder Sonntag, gibt es keinen zusätzlichen freien Tag." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Feiertage" },
        ]}
        crumbLabel="Brotkrumen"
        title={`Feiertage ${year} in Deutschland`}
        intro={`Alle gesetzlichen Feiertage ${year} und ${year + 1} mit Datum, Wochentag und Bundesländern. Wählen Sie Ihr Bundesland für die vollständige Liste mit Brückentagen und Arbeitstagen.`}
        tool={
          <div className="country-region-nav">
            {GERMAN_STATES.map((s) => (
              <Link key={s.code} href={`${path}/${s.slug}`} className="time-tool-button is-secondary" prefetch={false}>
                {s.name}
              </Link>
            ))}
          </div>
        }
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "jahr", label: `Feiertage ${year}` },
          { id: "anzahl", label: "Feiertage je Bundesland" },
          { id: "naechstes", label: `Feiertage ${year + 1}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="jahr">Gesetzliche Feiertage {year}</h2>
        <HolidayTable year={year} />
        <p>
          <small>
            Abkürzungen: BW Baden-Württemberg, BY Bayern, BE Berlin, BB Brandenburg, HB Bremen, HH Hamburg, HE Hessen, MV Mecklenburg-Vorpommern, NI
            Niedersachsen, NW Nordrhein-Westfalen, RP Rheinland-Pfalz, SL Saarland, SN Sachsen, ST Sachsen-Anhalt, SH Schleswig-Holstein, TH Thüringen.
            Ostersonntag und Pfingstsonntag sind nur in Brandenburg ausdrücklich gesetzliche Feiertage.
          </small>
        </p>

        <h2 id="anzahl">Anzahl der Feiertage je Bundesland {year}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Bundesland</th>
                <th scope="col">Feiertage</th>
              </tr>
            </thead>
            <tbody>
              {counts.map(({ s, n }) => (
                <tr key={s.code}>
                  <td>
                    <Link href={`${path}/${s.slug}`} prefetch={false}>
                      {s.name}
                    </Link>
                  </td>
                  <td>
                    {n}
                    {s.code === "by" ? " (+ Mariä Himmelfahrt in vielen Gemeinden)" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Gezählt sind landesweite Feiertage ohne die Sonntage Ostern und Pfingsten. Wie viele davon auf Werktage fallen und wie viele Arbeitstage sich
          ergeben, zeigt der <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link>.
        </p>

        <h2 id="naechstes">Gesetzliche Feiertage {year + 1}</h2>
        <HolidayTable year={year + 1} />
        <p>
          <small>
            Quellen: Feiertagsgesetze der Länder, DGB-Übersicht der gesetzlichen Feiertage, Bayerisches Landesamt für Statistik (Mariä Himmelfahrt nach
            Zensus 2022). Bewegliche Feiertage sind aus dem Osterdatum berechnet. Angaben ohne Gewähr.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
