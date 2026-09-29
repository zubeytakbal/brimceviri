import Link from "@/app/components/SiteLink";
import {
  DE_MONATE,
  deBesondererTagPfad,
  deMonatPfad,
  deTermine,
  findDeTag,
  DE_JAHRE,
} from "../../converter/calendar/deKalender";
import { LOSTAGE, naechsteLostage } from "../../converter/calendar/deLostage";
import type { FaqItem } from "../../converter/faqSchema";

import { diffDays } from "../../converter/time/dateMath";
import {
  formatDe,
  formatDeLong,
  todayBerlin,
} from "../../converter/time/germanDates";
import {
  moonPhasesBetween,
  moonState,
  phaseName,
} from "../../converter/time/moon";
import TimeToolPage from "../time/TimeToolPage";
import TakvimGorsel from "./TakvimGorsel";
import { DE_KALENDER_LINKS } from "./DeKalenderSeiten";
import { DE_MONDPHASE } from "../../converter/calendar/deKalender";

const START = { href: "/de", label: "Startseite" };
const HUB = { href: "/de/kalender", label: "Kalender" };
const T = {
  crumb: "Brotkrumen",
  related: "Das könnte Sie auch interessieren",
  toc: "Inhalt",
  faq: "Häufige Fragen",
};

const berlin = (d: Date, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("de-DE", { ...o, timeZone: "Europe/Berlin" }).format(
    d,
  );
const tzName = (d: Date) =>
  berlin(d, { timeZoneName: "short" }).includes("MESZ") ? "MESZ" : "MEZ";

/* /de/zeitumstellung ------------------------------------------------------ */

const JAHRE_ZU = Array.from({ length: 10 }, (_, i) => 2026 + i);

export function ZeitumstellungSeite() {
  const heute = todayBerlin();
  const sommer = findDeTag("sommerzeit")!;
  const winter = findDeTag("winterzeit")!;
  const termine = JAHRE_ZU.map((y) => ({
    y,
    s: deTermine(sommer, y)[0].datum,
    w: deTermine(winter, y)[0].datum,
  }));
  const alle = termine.flatMap((t) => [
    { art: "sommer" as const, d: t.s },
    { art: "winter" as const, d: t.w },
  ]);
  const naechste = alle.find((x) => diffDays(heute, x.d) >= 0)!;
  const rest = diffDays(heute, naechste.d);
  const jetztSommerzeit =
    diffDays(termine.find((t) => t.y === heute.year)!.s, heute) >= 0 &&
    diffDays(heute, termine.find((t) => t.y === heute.year)!.w) > 0;
  const faq: FaqItem[] = [
    {
      question: `Wann ist die nächste Zeitumstellung?`,
      answer: `Die nächste Zeitumstellung ist am ${formatDeLong(naechste.d)}: ${naechste.art === "sommer" ? "Um 2 Uhr werden die Uhren auf 3 Uhr vorgestellt (Beginn der Sommerzeit)." : "Um 3 Uhr werden die Uhren auf 2 Uhr zurückgestellt (Ende der Sommerzeit)."}`,
    },
    {
      question: "Wird die Uhr vor- oder zurückgestellt?",
      answer:
        "Im Frühjahr (letzter Sonntag im März) wird die Uhr eine Stunde vorgestellt, im Herbst (letzter Sonntag im Oktober) eine Stunde zurück. Eselsbrücke: Im Frühling stellt man die Gartenmöbel vor das Haus, im Herbst zurück in den Schuppen.",
    },
    {
      question: "Wann schlafe ich eine Stunde länger?",
      answer:
        "In der Nacht zum letzten Sonntag im Oktober: Die Uhr springt von 3 auf 2 Uhr zurück, die Nacht ist 25 Stunden lang. Im März ist die Nacht eine Stunde kürzer.",
    },
    {
      question: "Wird die Zeitumstellung abgeschafft?",
      answer:
        "Das Europäische Parlament stimmte 2019 für ein Ende der Zeitumstellung; die Mitgliedstaaten haben sich aber bis heute nicht auf eine gemeinsame Zeit geeinigt. Deshalb gilt weiter die Richtlinie 2000/84/EG mit Sommerzeit von Ende März bis Ende Oktober.",
    },
    {
      question: "Seit wann gibt es die Sommerzeit in Deutschland?",
      answer:
        "Die heutige Sommerzeit gilt in der Bundesrepublik seit 1980. Seit 1996 endet sie EU-weit einheitlich am letzten Sonntag im Oktober.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, HUB, { label: "Zeitumstellung" }]}
        crumbLabel={T.crumb}
        title={`Zeitumstellung ${heute.year} und ${heute.year + 1}`}
        intro="Wann werden die Uhren umgestellt, vor oder zurück? Die nächste Zeitumstellung mit Countdown, alle Termine bis 2035 und die Regeln der Sommer- und Winterzeit."
        tool={
          <div className="date-calc">
            <article className="takvim-kart">
              <TakvimGorsel gorsel="uhr" size={112} title="Zeitumstellung" />
              <div>
                <span className="takvim-kat de-kat-natur">
                  Nächste Zeitumstellung
                </span>
                <h2>{formatDeLong(naechste.d)}</h2>
                <p>
                  {naechste.art === "sommer"
                    ? "Uhr eine Stunde vor: 2:00 → 3:00 Uhr (Sommerzeit, MESZ)."
                    : "Uhr eine Stunde zurück: 3:00 → 2:00 Uhr (Winterzeit, MEZ)."}{" "}
                  {rest === 0 ? "Heute Nacht." : `Noch ${rest} Tage.`}
                </p>
                <p className="takvim-kart-alt">
                  <span className="takvim-etiket">
                    Aktuell gilt die{" "}
                    {jetztSommerzeit
                      ? "Sommerzeit (MESZ, UTC+2)"
                      : "Winterzeit (MEZ, UTC+1)"}
                  </span>
                </p>
              </div>
            </article>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Jahr</th>
                    <th scope="col">Sommerzeit (Uhr vor)</th>
                    <th scope="col">Winterzeit (Uhr zurück)</th>
                  </tr>
                </thead>
                <tbody>
                  {termine.map((t) => (
                    <tr
                      key={t.y}
                      className={t.y === heute.year ? "is-half" : undefined}
                    >
                      <td>{t.y}</td>
                      <td>
                        {formatDe(t.s, {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                        })}
                      </td>
                      <td>
                        {formatDe(t.w, {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
        related={{
          title: T.related,
          links: [
            {
              href: deBesondererTagPfad("sommerzeit"),
              label: "Beginn der Sommerzeit",
            },
            {
              href: deBesondererTagPfad("winterzeit"),
              label: "Beginn der Winterzeit",
            },
            { href: "/de/weltuhr", label: "Weltuhr" },
            { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
            ...DE_KALENDER_LINKS,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "regeln", label: "So funktioniert die Zeitumstellung" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="regeln">So funktioniert die Zeitumstellung</h2>
        <p>
          In Deutschland und der ganzen EU beginnt die Sommerzeit am letzten
          Sonntag im März um 2 Uhr MEZ: Die Uhren springen auf 3 Uhr, die Nacht
          ist eine Stunde kürzer. Am letzten Sonntag im Oktober endet sie um 3
          Uhr MESZ; die Uhren werden auf 2 Uhr zurückgestellt, und die Stunde
          von 2 bis 3 Uhr gibt es zweimal. Funkuhren und Smartphones stellen
          sich automatisch um; Backofen-, Auto- und Wanduhren müssen meist von
          Hand angepasst werden.
        </p>
        <p>
          Weil die Umstellung immer auf einen Sonntag fällt, verschiebt sich das
          Datum jedes Jahr zwischen dem 25. und 31. des Monats. Die Zeiten
          anderer Länder vergleicht der{" "}
          <Link href="/de/zeitzonenrechner">Zeitzonenrechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /de/vollmond ------------------------------------------------------------ */

function phasenJahr(year: number) {
  return moonPhasesBetween(
    new Date(Date.UTC(year, 0, 1, -1)),
    new Date(Date.UTC(year + 1, 0, 1, -1)),
  ).filter((p) => p.kind === "full" || p.kind === "new");
}

export function VollmondSeite() {
  const heute = todayBerlin();
  const jetzt = new Date();
  const mond = moonState(jetzt);
  const jahre = [heute.year, heute.year + 1];
  const alle = jahre.flatMap(phasenJahr);
  const naechsterVoll = alle.find(
    (p) => p.kind === "full" && p.date.getTime() > jetzt.getTime(),
  );
  const naechsterNeu = alle.find(
    (p) => p.kind === "new" && p.date.getTime() > jetzt.getTime(),
  );
  const tageBis = (d: Date) =>
    Math.ceil((d.getTime() - jetzt.getTime()) / 86400000);
  const fmt = (d: Date) =>
    `${berlin(d, { weekday: "short", day: "numeric", month: "long" })}, ${berlin(d, { hour: "2-digit", minute: "2-digit" })} Uhr ${tzName(d)}`;
  const faq: FaqItem[] = [
    naechsterVoll
      ? {
          question: "Wann ist der nächste Vollmond?",
          answer: `Der nächste Vollmond ist am ${fmt(naechsterVoll.date)} (in ${tageBis(naechsterVoll.date)} Tagen).`,
        }
      : null,
    {
      question: `Wie viele Vollmonde gibt es ${heute.year + 1}?`,
      answer: `${heute.year + 1} gibt es ${phasenJahr(heute.year + 1).filter((p) => p.kind === "full").length} Vollmonde. Ein Mondzyklus (synodischer Monat) dauert im Mittel 29,53 Tage, daher fällt in manchen Jahren ein 13. Vollmond an („Blue Moon“).`,
    },
    {
      question: "Warum sind die Uhrzeiten so genau?",
      answer:
        "Vollmond ist der Moment, in dem Sonne, Erde und Mond in einer Linie stehen. Die Zeiten werden nach astronomischen Formeln (Jean Meeus) berechnet und in deutscher Zeit (MEZ bzw. MESZ) angegeben; sie weichen um höchstens wenige Minuten von Sternwarten-Angaben ab.",
    },
  ].filter((x): x is FaqItem => Boolean(x));
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, HUB, { label: "Vollmond" }]}
        crumbLabel={T.crumb}
        title={`Vollmond ${heute.year} und ${heute.year + 1}: alle Termine`}
        intro="Wann ist der nächste Vollmond? Alle Vollmond- und Neumond-Termine mit Uhrzeit in deutscher Zeit, die aktuelle Mondphase und die Tage bis zum nächsten Vollmond."
        tool={
          <div className="date-calc">
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Nächster Vollmond</span>
                <strong>{naechsterVoll ? fmt(naechsterVoll.date) : "—"}</strong>
                <em>
                  {naechsterVoll
                    ? `in ${tageBis(naechsterVoll.date)} Tagen`
                    : ""}
                </em>
              </div>
              <div className="date-calc-stat">
                <span>Mondphase heute</span>
                <strong>{DE_MONDPHASE[phaseName(mond.age)]}</strong>
                <em>{Math.round(mond.illumination * 100)} % beleuchtet</em>
              </div>
              <div className="date-calc-stat">
                <span>Nächster Neumond</span>
                <strong>
                  {naechsterNeu
                    ? berlin(naechsterNeu.date, {
                        day: "numeric",
                        month: "long",
                      })
                    : "—"}
                </strong>
                <em>
                  {naechsterNeu
                    ? `${berlin(naechsterNeu.date, { hour: "2-digit", minute: "2-digit" })} Uhr`
                    : ""}
                </em>
              </div>
            </div>
            {jahre.map((y) => {
              const liste = phasenJahr(y);
              const voll = liste.filter((p) => p.kind === "full");
              return (
                <div key={y}>
                  <h2 id={`vollmond-${y}`}>Vollmond {y}</h2>
                  <div className="holiday-table-wrap">
                    <table className="holiday-table">
                      <thead>
                        <tr>
                          <th scope="col">Monat</th>
                          <th scope="col">🌕 Vollmond</th>
                          <th scope="col">🌑 Neumond</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DE_MONATE.map((m, i) => {
                          const imMonat = (k: "full" | "new") =>
                            liste.filter(
                              (p) =>
                                p.kind === k &&
                                Number(berlin(p.date, { month: "numeric" })) ===
                                  i + 1,
                            );
                          return (
                            <tr key={m}>
                              <td>
                                {DE_JAHRE.includes(y) ? (
                                  <Link
                                    href={deMonatPfad(y, i + 1)}
                                    prefetch={false}
                                  >
                                    {m}
                                  </Link>
                                ) : (
                                  m
                                )}
                              </td>
                              <td>
                                {imMonat("full").map((p) => (
                                  <div key={p.date.toISOString()}>
                                    {berlin(p.date, {
                                      weekday: "short",
                                      day: "numeric",
                                      month: "short",
                                    })}{" "}
                                    ·{" "}
                                    {berlin(p.date, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    Uhr
                                  </div>
                                ))}
                              </td>
                              <td>
                                {imMonat("new").map((p) => (
                                  <div key={p.date.toISOString()}>
                                    {berlin(p.date, {
                                      weekday: "short",
                                      day: "numeric",
                                      month: "short",
                                    })}{" "}
                                    ·{" "}
                                    {berlin(p.date, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    Uhr
                                  </div>
                                ))}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="date-calc-note">
                    {y}: {voll.length} Vollmonde. Zeiten in MEZ bzw. MESZ
                    (Sommerzeit).
                  </p>
                </div>
              );
            })}
          </div>
        }
        related={{
          title: T.related,
          links: [
            { href: "/de/kalender", label: "Kalender mit Mondphasen" },
            { href: "/de/bauernregeln", label: "Bauernregeln und Lostage" },
            ...DE_KALENDER_LINKS,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          ...jahre.map((y) => ({
            id: `vollmond-${y}`,
            label: `Vollmond ${y}`,
          })),
          { id: "mondphasen", label: "Die Mondphasen" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="mondphasen">Die Mondphasen</h2>
        <p>
          Der Mond umrundet die Erde in rund 29,5 Tagen von Neumond zu Neumond.
          Nach dem Neumond wächst die beleuchtete Sichel über das erste Viertel
          zum Vollmond; danach nimmt der Mond über das letzte Viertel wieder ab.
          Bei Vollmond steht der Mond der Sonne gegenüber und geht etwa zum
          Sonnenuntergang auf.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /de/bauernregeln -------------------------------------------------------- */

export function BauernregelnSeite() {
  const heute = todayBerlin();
  const next = naechsteLostage(heute, 4);
  const [erster, ...weitere] = next;
  const faq: FaqItem[] = [
    {
      question: "Was sind Lostage?",
      answer:
        "Lostage sind feste Tage im Bauernjahr, meist Namenstage von Heiligen, an denen man nach alter Überlieferung das Wetter der kommenden Wochen „losen“, also vorhersagen konnte. Viele Bauernregeln beziehen sich auf sie.",
    },
    {
      question: "Stimmen Bauernregeln?",
      answer:
        "Einige Regeln beschreiben typische Wetterlagen recht gut, etwa die Schafskälte oder die oft stabile Wetterlage um den Siebenschläfer. Wegen der Kalenderreform von 1582 liegen die gemeinten Zeitpunkte heute teils rund zehn Tage später. Eine Wettervorhersage ersetzen sie nicht.",
    },
    {
      question: "Was sind die Eisheiligen?",
      answer:
        "Die Eisheiligen vom 11. bis 15. Mai (Mamertus, Pankratius, Servatius, Bonifatius und die kalte Sophie) markieren nach der Bauernregel die letzten Frostnächte; danach werden frostempfindliche Pflanzen ins Freie gesetzt.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, HUB, { label: "Bauernregeln" }]}
        crumbLabel={T.crumb}
        title="Bauernregeln und Lostage im Jahreslauf"
        intro="Der heutige oder nächste Lostag mit seiner Bauernregel und alle wichtigen Lostage von Dreikönig bis Weihnachten – mit Eisheiligen, Schafskälte, Siebenschläfer und Hundstagen."
        tool={
          <div className="date-calc">
            {erster ? (
              <article className="takvim-kart">
                <TakvimGorsel
                  gorsel={
                    erster.datum.month >= 11 || erster.datum.month <= 2
                      ? "kis"
                      : erster.datum.month <= 5
                        ? "ilkbahar"
                        : erster.datum.month <= 8
                          ? "yaz"
                          : "sonbahar"
                  }
                  size={112}
                  title={erster.l.name}
                />
                <div>
                  <span className="takvim-kat de-kat-lostag">
                    {erster.rest === 0
                      ? "Heute ist Lostag"
                      : `Nächster Lostag in ${erster.rest} Tagen`}
                  </span>
                  <h2>
                    {erster.l.name} ·{" "}
                    {formatDe(erster.datum, { day: "numeric", month: "long" })}
                  </h2>
                  <p>
                    <em>„{erster.l.regel}“</em>
                  </p>
                  <p className="takvim-kart-alt">
                    {weitere.map((x) => (
                      <span key={x.l.name} className="takvim-etiket">
                        {formatDe(x.datum, { day: "numeric", month: "short" })}:{" "}
                        {x.l.name}
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ) : null}
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Datum</th>
                    <th scope="col">Lostag</th>
                    <th scope="col">Bauernregel</th>
                  </tr>
                </thead>
                <tbody>
                  {LOSTAGE.map((l) => (
                    <tr
                      key={l.name}
                      className={l.m === heute.month ? "is-half" : undefined}
                    >
                      <td>
                        {l.t}. {DE_MONATE[l.m - 1]}
                      </td>
                      <td>
                        {l.besondererTag ? (
                          <Link
                            href={deBesondererTagPfad(l.besondererTag)}
                            prefetch={false}
                          >
                            {l.name}
                          </Link>
                        ) : (
                          l.name
                        )}
                      </td>
                      <td>
                        <em>{l.regel}</em>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="date-calc-note">
              Die Sprüche sind überliefert; ihr Wortlaut unterscheidet sich von
              Region zu Region. Sie sind keine Wettervorhersage.
            </p>
          </div>
        }
        related={{
          title: T.related,
          links: [
            { href: deBesondererTagPfad("eisheiligen"), label: "Eisheiligen" },
            {
              href: deBesondererTagPfad("siebenschlaefer"),
              label: "Siebenschläfertag",
            },
            { href: deBesondererTagPfad("hundstage"), label: "Hundstage" },
            { href: "/de/vollmond", label: "Vollmond-Termine" },
            ...DE_KALENDER_LINKS,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "herkunft", label: "Woher kommen Bauernregeln?" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="herkunft">Woher kommen Bauernregeln?</h2>
        <p>
          Bauernregeln sind über Jahrhunderte weitergegebene Beobachtungen von
          Wetter, Natur und Ernte. Da die Landwirtschaft vom Wetter abhing,
          merkte man sich Zusammenhänge in kurzen, gereimten Sprüchen. Viele
          knüpfen an Heiligentage des Kirchenjahres an, die im Kalender jedes
          Jahr auf dasselbe Datum fallen.
        </p>
        <p>
          Die gregorianische Kalenderreform von 1582 hat die Daten um zehn Tage
          verschoben. Regeln wie die zum Siebenschläfer (27. Juni) beziehen sich
          deshalb eigentlich auf Anfang Juli – und treffen dann statistisch
          erstaunlich oft zu. Alle Lostage und Feiertage im Monatsüberblick
          zeigt der <Link href="/de/kalender">Kalender</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
