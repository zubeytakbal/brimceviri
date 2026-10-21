import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { countDays, daysInMonth, diffDays } from "../../../converter/time/dateMath";
import { formatDe, formatDeShort, todayBerlin, weekdayDe, weekdayDeShort } from "../../../converter/time/germanDates";
import { findGermanState, GERMAN_STATES, germanHolidayLookup, germanHolidaysCached, stateHolidays } from "../../../converter/time/germanHolidays";
import { brueckentage, calendarRelated } from "../../../i18n/germanCalendarTools";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return GERMAN_STATES.map((s) => ({ bundesland: s.slug }));
}

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

export async function generateMetadata({ params }: { params: Promise<{ bundesland: string }> }): Promise<Metadata> {
  const s = findGermanState((await params).bundesland);
  if (!s) return {};
  const year = todayBerlin().year;
  const n = stateHolidays(s.code, year).length;
  const title = `Feiertage ${s.name} ${year} und ${year + 1}`;
  const description = `Alle ${n} gesetzlichen Feiertage ${year} in ${s.name} mit Datum und Wochentag, dazu ${year + 1}, Brückentage und Arbeitstage pro Monat.`;
  const path = `/de/feiertage/${s.slug}`;
  return {
    title: seoTitle(title, `Feiertage ${s.name} ${year}`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function StateHolidaysPage({ params }: { params: Promise<{ bundesland: string }> }) {
  const s = findGermanState((await params).bundesland);
  if (!s) notFound();
  const today = todayBerlin();
  const year = today.year;
  const path = `/de/feiertage/${s.slug}`;
  const list = stateHolidays(s.code, year);
  const next = list.find((h) => diffDays(today, h.date) >= 0) ?? stateHolidays(s.code, year + 1)[0];
  const regional = germanHolidaysCached(year).filter((h) => h.partialStates?.includes(s.code) || (h.sunday && h.states.includes(s.code)));
  const bridges = brueckentage(s.code, year);
  const lookup = germanHolidayLookup(s.code, year, year);
  const months = MONTHS.map((name, i) => {
    const c = countDays({ year, month: i + 1, day: 1 }, { year, month: i + 1, day: daysInMonth(year, i + 1) }, lookup);
    return { name, work: c.work, holiday: c.holiday };
  });
  const yearWork = months.reduce((a, m) => a + m.work, 0);
  const nextYear = stateHolidays(s.code, year + 1);
  const onWeekend = list.filter((h) => [0, 6].includes(new Date(Date.UTC(h.date.year, h.date.month - 1, h.date.day)).getUTCDay()));

  const faqItems: FaqItem[] = [
    { question: `Wie viele Feiertage hat ${s.name} ${year}?`, answer: `${s.name} hat ${year} ${list.length} landesweite gesetzliche Feiertage${onWeekend.length ? `; davon fallen ${onWeekend.length} auf ein Wochenende` : ""}.${regional.some((h) => h.partialStates?.includes(s.code)) ? " Hinzu kommen regionale Feiertage, die nur in einem Teil der Gemeinden gelten." : ""}` },
    { question: `Wann ist der nächste Feiertag in ${s.name}?`, answer: `${next.name} am ${weekdayDe(next.date)}, ${formatDeShort(next.date)}.` },
    { question: `Wie viele Arbeitstage hat ${year} in ${s.name}?`, answer: `Bei einer Fünf-Tage-Woche (Montag bis Freitag) sind es ${yearWork} Arbeitstage.` },
    ...(bridges.length
      ? [{ question: `Welche Brückentage gibt es ${year} in ${s.name}?`, answer: bridges.map((b) => `${weekdayDe(b.bridge)}, ${formatDeShort(b.bridge)} (${b.holiday})`).join("; ") + ". Mit einem Urlaubstag ergeben sich jeweils vier freie Tage am Stück." }]
      : []),
  ];

  const table = (y: number) => (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Wochentag</th>
            <th scope="col">Feiertag</th>
          </tr>
        </thead>
        <tbody>
          {stateHolidays(s.code, y).map((h) => (
            <tr key={h.id}>
              <td>{formatDeShort(h.date)}</td>
              <td>{weekdayDe(h.date)}</td>
              <td>{h.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/feiertage", label: "Feiertage" },
          { href: path, label: s.name },
        ]}
        crumbLabel="Brotkrumen"
        title={`Feiertage ${s.name} ${year}`}
        intro={`Alle gesetzlichen Feiertage in ${s.name} für ${year} und ${year + 1}, mit Brückentagen und der Zahl der Arbeitstage pro Monat.`}
        tool={
          <div className="holiday-stats">
            <div>
              <strong>{list.length}</strong>
              <span>Feiertage {year}</span>
            </div>
            <div>
              <strong>{formatDe(next.date, { day: "2-digit", month: "2-digit" }).replace(/\.?$/, ".")}</strong>
              <span>nächster: {next.name}</span>
            </div>
            <div>
              <strong>{yearWork}</strong>
              <span>Arbeitstage {year} (Mo–Fr)</span>
            </div>
            <div>
              <strong>{bridges.length}</strong>
              <span>Brückentage {year}</span>
            </div>
          </div>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [{ href: `/de/arbeitstage-rechner?land=${s.slug}`, label: `Arbeitstage ${s.name} berechnen` }, ...calendarRelated("/de/feiertage/x")],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "jahr", label: `Feiertage ${year}` },
          ...(bridges.length ? [{ id: "brueckentage", label: `Brückentage ${year}` }] : []),
          { id: "arbeitstage", label: `Arbeitstage ${year} pro Monat` },
          { id: "naechstes", label: `Feiertage ${year + 1}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="jahr">Gesetzliche Feiertage {year} in {s.name}</h2>
        {table(year)}
        {regional.length > 0 && (
          <ul>
            {regional.map((h) => (
              <li key={h.id}>
                <strong>{h.name}</strong> ({weekdayDeShort(h.date)} {formatDeShort(h.date)}):{" "}
                {h.sunday ? `in ${s.name} gesetzlicher Feiertag, fällt aber immer auf einen Sonntag.` : h.note}
              </li>
            ))}
          </ul>
        )}

        {bridges.length > 0 && (
          <>
            <h2 id="brueckentage">Brückentage {year}</h2>
            <p>Fällt ein Feiertag auf einen Dienstag oder Donnerstag, reicht ein Urlaubstag für ein verlängertes Wochenende von vier Tagen:</p>
            <ul>
              {bridges.map((b) => (
                <li key={b.holiday}>
                  {b.holiday} ({weekdayDe(b.holidayDate)}, {formatDeShort(b.holidayDate)}): Brückentag am {weekdayDe(b.bridge)}, {formatDeShort(b.bridge)}
                </li>
              ))}
            </ul>
            <p>
              Längere Kombinationen und einen persönlichen Urlaubsplan mit Kalender-Export liefert der{" "}
              <Link href={`/de/brueckentage?land=${s.code}`}>Brückentage-Rechner</Link>.
            </p>
          </>
        )}

        <h2 id="arbeitstage">Arbeitstage {year} in {s.name} pro Monat</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Monat</th>
                <th scope="col">Arbeitstage</th>
                <th scope="col">Feiertage an Werktagen</th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td>{m.work}</td>
                  <td>{m.holiday}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Gesamt</strong>
                </td>
                <td>
                  <strong>{yearWork}</strong>
                </td>
                <td>
                  <strong>{months.reduce((a, m) => a + m.holiday, 0)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Fünf-Tage-Woche von Montag bis Freitag, ohne regionale Feiertage. Für einen eigenen Zeitraum, mit Samstagen oder regionalen Feiertagen nutzen Sie
          den <Link href={`/de/arbeitstage-rechner?land=${s.slug}`}>Arbeitstage-Rechner für {s.name}</Link>.
        </p>

        <h2 id="naechstes">Feiertage {year + 1} in {s.name}</h2>
        <p>
          {nextYear.length} Feiertage:{" "}
          {nextYear.map((h, i) => (
            <span key={h.id}>
              {i > 0 ? "; " : ""}
              {h.name} {weekdayDeShort(h.date)} {formatDeShort(h.date)}
            </span>
          ))}
          . Andere Bundesländer im Vergleich: <Link href="/de/feiertage">Feiertage in Deutschland</Link>. Quelle: Feiertagsgesetz {s.name}.
        </p>
      </TimeToolPage>
    </div>
  );
}
