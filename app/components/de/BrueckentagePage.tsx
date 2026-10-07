import Link from "@/app/components/SiteLink";
import BrueckentagePlaner from "./BrueckentagePlaner";
import TimeToolPage from "../time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatDe } from "../../converter/time/germanDates";
import { germanHolidaysCached } from "../../converter/time/germanHolidays";
import { weekdayOf } from "../../converter/time/dateMath";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import {
  BRUECKENTAGE_JAHRE,
  brueckentagePfad,
  brueckenUebersicht,
  laenderUebersicht,
  PLANER_JAHRE,
} from "../../i18n/germanBrueckentage";

const kurzDatum = (d: { year: number; month: number; day: number }) =>
  formatDe(d, { day: "2-digit", month: "2-digit" });
const tag = (d: { year: number; month: number; day: number }) =>
  formatDe(d, { weekday: "short", day: "2-digit", month: "2-digit" });

/** Bundesweite Feiertage des Jahres, die auf ein Wochenende fallen. */
export function bundesweitAmWochenende(year: number) {
  return germanHolidaysCached(year).filter(
    (h) =>
      h.states.length === 16 && !h.sunday && [0, 6].includes(weekdayOf(h.date)),
  );
}

export function brueckentageFaq(year: number): FaqItem[] {
  const we = bundesweitAmWochenende(year);
  const laender = laenderUebersicht(year);
  const top = [...laender].sort((a, b) => b.plan30 - a.plan30);
  return [
    {
      question: `Welche Brückentage gibt es ${year}?`,
      answer: `Klassische Brückentage entstehen, wenn ein Feiertag auf einen Dienstag oder Donnerstag fällt: Ein Urlaubstag ergibt dann vier freie Tage. ${year} gibt es davon je nach Bundesland ${Math.min(...laender.map((l) => l.bruecken.length))} bis ${Math.max(...laender.map((l) => l.bruecken.length))}. Die Tabelle unten zeigt alle Brücken mit der jeweils besten Kombination.`,
    },
    {
      question: `Ist ${year} ein gutes Brückentage-Jahr?`,
      answer: we.length
        ? `${we.length} bundesweite Feiertage fallen ${year} auf ein Wochenende: ${we.map((h) => `${h.name} (${formatDe(h.date, { weekday: "long" })})`).join(", ")}. Diese Tage bringen Arbeitnehmern mit Montag-bis-Freitag-Woche keinen zusätzlichen freien Tag.`
        : `Kein bundesweiter Feiertag fällt ${year} auf ein Wochenende – ein gutes Jahr für Brückentage.`,
    },
    {
      question: `In welchem Bundesland kann man ${year} die meisten freien Tage herausholen?`,
      answer: `Mit 30 Urlaubstagen und einer Fünf-Tage-Woche kommt man ${year} in ${top[0].state.name} auf ${top[0].plan30} freie Tage in Brückenzeiträumen, in ${top[top.length - 1].state.name} auf ${top[top.length - 1].plan30}. Den Unterschied machen Feiertage wie Fronleichnam, Allerheiligen oder der Reformationstag.`,
    },
    {
      question: "Muss der Arbeitgeber Urlaub an Brückentagen genehmigen?",
      answer:
        "Urlaubswünsche sind nach § 7 Bundesurlaubsgesetz zu berücksichtigen, es sei denn, dringende betriebliche Belange oder Wünsche anderer Beschäftigter mit Vorrang stehen entgegen. Manche Betriebe legen Brückentage per Betriebsvereinbarung als Betriebsferien fest – dann werden sie vom Urlaub abgezogen.",
    },
    {
      question: "Zählen Heiligabend und Silvester als Urlaubstag?",
      answer:
        "Der 24. und 31. Dezember sind keine gesetzlichen Feiertage. Viele Tarif- und Arbeitsverträge machen sie aber ganz oder halb arbeitsfrei. Im Planer lassen sie sich deshalb als arbeitsfrei markieren.",
    },
  ];
}

export default function BrueckentagePage({
  year,
  hub,
}: {
  year: number;
  hub?: boolean;
}) {
  const laender = hub ? [] : laenderUebersicht(year);
  const bruecken = hub ? [] : brueckenUebersicht(year);
  const we = bundesweitAmWochenende(year);
  const path = hub ? "/de/brueckentage" : brueckentagePfad(year);
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/brueckentage", label: "Brückentage" },
          ...(hub ? [] : [{ href: path, label: String(year) }]),
        ]}
        crumbLabel="Brotkrumen"
        title={
          hub
            ? "Brückentage-Rechner und Urlaubsplaner"
            : `Brückentage ${year}: Urlaub optimal planen`
        }
        intro={
          hub
            ? `Geben Sie Bundesland und Urlaubstage ein: Der Planer verteilt Ihren Urlaub so auf die Feiertage, dass möglichst viele freie Tage am Stück entstehen – auch für Teilzeit mit eigenen Arbeitstagen. Den Plan übernehmen Sie mit einem Klick in Ihren Kalender.`
            : `Alle Brückentage ${year} für jedes Bundesland und ein Urlaubsplaner, der Ihre Urlaubstage optimal auf die Feiertage verteilt.${we.length ? ` ${year} fallen ${we.map((h) => h.name).join(", ")} auf ein Wochenende.` : ""}`
        }
        tool={<BrueckentagePlaner years={PLANER_JAHRE} initialYear={year} />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            ...BRUECKENTAGE_JAHRE.filter((y) => hub || y !== year).map((y) => ({
              href: brueckentagePfad(y),
              label: `Brückentage ${y}`,
            })),
            { href: "/de/urlaubsrechner", label: "Urlaubsanspruch berechnen" },
            ...calendarRelated("/de/brueckentage"),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          ...(hub
            ? [{ id: "jahre", label: "Brückentage nach Jahr" }]
            : [
                { id: "bruecken", label: `Brückentage ${year} im Überblick` },
                { id: "laender", label: `Brückentage ${year} nach Bundesland` },
              ]),
          { id: "tipps", label: "So funktioniert der Planer" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={hub ? brueckentageFaq(year).slice(3) : brueckentageFaq(year)}
      >
        {hub ? (
          <>
            <h2 id="jahre">Brückentage nach Jahr</h2>
            <p>
              Alle Brückentage mit der besten Kombination je Feiertag und eine
              Übersicht aller 16 Bundesländer:
            </p>
            <div className="time-tool-chips">
              {BRUECKENTAGE_JAHRE.map((y) => (
                <Link key={y} href={brueckentagePfad(y)}>
                  Brückentage {y}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 id="bruecken">Brückentage {year} im Überblick</h2>
            <p>
              Die effizienteste Kombination je Feiertag (bis vier Urlaubstage,
              Montag bis Freitag):
            </p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Feiertag</th>
                    <th scope="col">Urlaub</th>
                    <th scope="col">Frei</th>
                    <th scope="col">Bundesländer</th>
                  </tr>
                </thead>
                <tbody>
                  {bruecken.map((b) => (
                    <tr key={`${b.feiertag}-${b.urlaub}-${b.tage}`}>
                      <td>
                        {b.feiertag}
                        <br />
                        <small>{tag(b.datum)}</small>
                      </td>
                      <td>
                        {b.urlaub} {b.urlaub === 1 ? "Tag" : "Tage"}
                      </td>
                      <td>
                        <strong>{b.tage} Tage</strong>
                        <br />
                        <small>
                          {kurzDatum(b.von)} – {kurzDatum(b.bis)}
                        </small>
                      </td>
                      <td>
                        {b.laender.length === 16
                          ? "alle"
                          : b.laender.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="laender">Brückentage {year} nach Bundesland</h2>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Bundesland</th>
                    <th scope="col">Feiertage Mo–Fr</th>
                    <th scope="col">1 Tag → 4 frei</th>
                    <th scope="col">Mit 30 Urlaubstagen</th>
                  </tr>
                </thead>
                <tbody>
                  {laender.map((l) => (
                    <tr key={l.state.code}>
                      <td>
                        <Link
                          href={`/de/feiertage?land=${l.state.slug}`}
                          prefetch={false}
                        >
                          {l.state.name}
                        </Link>
                      </td>
                      <td>
                        {l.werktags} von {l.feiertage}
                      </td>
                      <td>
                        {l.bruecken.length
                          ? l.bruecken
                              .map(
                                (b) =>
                                  `${formatDe(b.bridge, { weekday: "short", day: "2-digit", month: "2-digit" })}`,
                              )
                              .join(", ")
                          : "–"}
                      </td>
                      <td>{l.plan30} Tage frei</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              „Mit 30 Urlaubstagen“: freie Tage in den Zeiträumen, die der
              Planer aus 30 Urlaubstagen rund um die Feiertage bildet (höchstens
              10 Urlaubstage am Stück). Regionale Feiertage wie Mariä
              Himmelfahrt in katholischen Gemeinden Bayerns sind hier nicht
              eingerechnet, lassen sich im Planer aber zuschalten.
            </p>
          </>
        )}

        <h2 id="tipps">So funktioniert der Planer</h2>
        <ul>
          <li>
            Er prüft jede Kombination aus Urlaubstagen zwischen Wochenenden und
            Feiertagen und wählt die, die zusammen die meisten freien Tage
            ergibt.
          </li>
          <li>
            Teilzeit: Wählen Sie Ihre Arbeitstage – wer montags nicht arbeitet,
            bekommt andere Brücken als bei einer Fünf-Tage-Woche.
          </li>
          <li>
            Freie Tage direkt vor Neujahr oder nach Silvester zählen mit, Urlaub
            wird aber nur im gewählten Jahr verplant.
          </li>
          <li>
            Mit „Urlaubstage in den Kalender übernehmen“ laden Sie eine
            .ics-Datei für Outlook, Google Kalender oder Apple Kalender
            herunter. Wie viel Urlaub Ihnen zusteht, berechnet der{" "}
            <Link href="/de/urlaubsrechner">Urlaubsrechner</Link>.
          </li>
        </ul>
        <p>
          <small>
            Feiertage nach den Feiertagsgesetzen der Länder; Schulferien sind
            nicht berücksichtigt.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
