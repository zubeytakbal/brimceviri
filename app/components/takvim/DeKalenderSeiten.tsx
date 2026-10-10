import Link from "@/app/components/SiteLink";
import {
  DE_JAHRE,
  DE_KATEGORIE,
  DE_MONATE,
  DE_TAGE,
  deBesondererTagPfad,
  deJahresTermine,
  deJahrPfad,
  deMonatPfad,
  deNaechster,
  deTagesKarte,
  deTagInfo,
  deTagPfad,
  deTermine,
  type DeKategorie,
  type DeTermin,
} from "../../converter/calendar/deKalender";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import {
  addDaysYmd,
  countDays,
  daysInMonth,
  diffDays,
  ymdKey,
} from "../../converter/time/dateMath";
import {
  formatDe,
  formatDeLong,
  kalenderwoche,
  todayBerlin,
} from "../../converter/time/germanDates";
import {
  GERMAN_STATES,
  germanHolidayLookup,
  type StateCode,
} from "../../converter/time/germanHolidays";
import { moonPhasesBetween } from "../../converter/time/moon";
import { buildSiteUrl } from "../../siteConfig";
import HolidayIcsButton from "../dates/HolidayIcsButton";
import TimeToolPage from "../time/TimeToolPage";
import DeKalenderNavigator from "./DeKalenderNavigator";
import { DeLegende, DeMonatsGitter } from "./DeMonatsGitter";
import TakvimGorsel from "./TakvimGorsel";
import ScrollToQuery from "../ScrollToQuery";

const T = {
  crumb: "Brotkrumen",
  related: "Das könnte Sie auch interessieren",
  toc: "Inhalt",
  faq: "Häufige Fragen",
};
const START = { href: "/de", label: "Startseite" };
const HUB = { href: "/de/kalender", label: "Kalender" };

export const DE_KALENDER_LINKS = [
  { href: "/de/feiertage", label: "Feiertage nach Bundesland" },
  { href: "/de/brueckentage", label: "Brückentage-Planer" },
  { href: "/de/kalenderwoche", label: "Aktuelle Kalenderwoche" },
  { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" },
  { href: "/de/tagerechner", label: "Tagerechner" },
  { href: "/de/countdown", label: "Countdown" },
  { href: "/de/besondere-tage", label: "Besondere Tage" },
  { href: "/de/zeitumstellung", label: "Zeitumstellung" },
  { href: "/de/vollmond", label: "Vollmond-Termine" },
  { href: "/de/bauernregeln", label: "Bauernregeln und Lostage" },
];

const kurz = (d: YMD) => formatDe(d, { day: "numeric", month: "long" });
const zeitDe = (d: Date) =>
  new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(d);
const spanne = (t: DeTermin) => {
  const bis =
    t.bis ?? (t.tag.dauer ? addDaysYmd(t.datum, t.tag.dauer - 1) : undefined);
  return bis && ymdKey(bis) !== ymdKey(t.datum)
    ? `${kurz(t.datum)} – ${kurz(bis)}`
    : kurz(t.datum);
};
const hatSeite = (d: YMD) =>
  DE_JAHRE.includes(d.year) && deTagesKarte(d.year).has(ymdKey(d));
const laenderText = (t: DeTermin) => {
  if (!t.laender) return null;
  if (t.laender.length === 16) return "bundesweit";
  const namen = GERMAN_STATES.filter((s) => t.laender!.includes(s.code)).map(
    (s) => s.name,
  );
  const teil = GERMAN_STATES.filter((s) => t.teilweise?.includes(s.code)).map(
    (s) => s.name,
  );
  return [namen.join(", "), teil.length ? `regional in ${teil.join(", ")}` : ""]
    .filter(Boolean)
    .join("; ");
};

function Liste({ list, bild = true, tagAnker = false }: { list: DeTermin[]; bild?: boolean; tagAnker?: boolean }) {
  const verankert = new Set<number>();
  return (
    <ul className="takvim-liste">
      {list.map((t) => (
        <li
          key={t.tag.id + ymdKey(t.datum)}
          id={tagAnker && !verankert.has(t.datum.day) && verankert.add(t.datum.day) ? `tag-${t.datum.day}` : undefined}
        >
          {bild ? <TakvimGorsel gorsel={t.tag.bild} size={44} /> : null}
          <div>
            <Link
              href={
                hatSeite(t.datum)
                  ? deTagPfad(t.datum)
                  : deBesondererTagPfad(t.tag.id)
              }
              prefetch={false}
            >
              <strong>{spanne(t)}</strong>
            </Link>{" "}
            <span className="takvim-gun-adi">
              {formatDe(t.datum, { weekday: "long" })}
            </span>
            <br />
            <Link href={deBesondererTagPfad(t.tag.id)} prefetch={false}>
              {t.tag.name}
            </Link>
            {t.zeit ? <small> · {zeitDe(t.zeit)} Uhr</small> : null}
            {t.laender && t.laender.length < 16 ? (
              <small> · {laenderText(t)}</small>
            ) : null}
          </div>
          <span className={`takvim-kat de-kat-${t.tag.kategorie}`}>
            {DE_KATEGORIE[t.tag.kategorie]}
          </span>
        </li>
      ))}
    </ul>
  );
}

function icsEintraege(year: number) {
  return deJahresTermine(year).flatMap((t) => {
    const bis = t.bis ?? t.datum;
    const out: Array<{ date: string; name: string }> = [];
    for (let d = t.datum; diffDays(d, bis) >= 0; d = addDaysYmd(d, 1))
      out.push({ date: ymdKey(d), name: t.tag.name });
    return out;
  });
}

function Ics({ year }: { year: number }) {
  return (
    <div className="takvim-ics">
      <HolidayIcsButton
        items={icsEintraege(year)}
        fileName={`kalender-${year}.ics`}
        label={`Kalender ${year} herunterladen (.ics)`}
        calendarName={`Kalender Deutschland ${year}`}
      />
      <a
        className="time-tool-button is-secondary"
        href={buildSiteUrl("/de/kalender.ics").replace(/^https?:/, "webcal:")}
      >
        🔔 Kalender abonnieren (aktualisiert sich selbst)
      </a>
    </div>
  );
}

/* /de/kalender ---------------------------------------------------------- */

export function DeKalenderHub() {
  const heute = todayBerlin();
  const info = deTagInfo(heute);
  const naechste = [
    ...deJahresTermine(heute.year),
    ...deJahresTermine(heute.year + 1),
  ]
    .filter((t) => ymdKey(t.bis ?? t.datum) >= ymdKey(heute))
    .slice(0, 10);
  const faq: FaqItem[] = [
    {
      question: "Welches Datum ist heute?",
      answer: `Heute ist ${formatDeLong(heute)}. Wir haben Kalenderwoche ${info.kw}; es ist der ${info.tagImJahr}. Tag des Jahres, bis Jahresende sind es noch ${info.restTage} Tage.`,
    },
    {
      question: "Welche Tage zeigt dieser Kalender?",
      answer:
        "Alle gesetzlichen Feiertage nach Bundesland, kirchliche Feste und Brauchtum wie Karneval, Advent und Sankt Martin, Aktionstage wie Muttertag, Gedenktage, Lostage aus den Bauernregeln, den Beginn der Jahreszeiten und die Zeitumstellung.",
    },
    {
      question: "Wie werden die Kalenderwochen gezählt?",
      answer:
        "In Deutschland gilt die ISO-Norm 8601 (DIN 1355): Die Woche beginnt am Montag, und KW 1 ist die Woche mit dem ersten Donnerstag des Jahres. Ein Jahr hat deshalb 52 oder 53 Kalenderwochen.",
    },
    {
      question: "Kann ich den Kalender auf dem Handy abonnieren?",
      answer:
        "Ja. Über „Kalender abonnieren“ lassen sich Feiertage und besondere Tage in iPhone-, Android- oder Outlook-Kalender einbinden; neue Jahre kommen automatisch hinzu.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, { label: "Kalender" }]}
        crumbLabel={T.crumb}
        title={`Kalender ${heute.year} mit Feiertagen und KW`}
        intro="Das heutige Datum mit Kalenderwoche, alle Feiertage für jedes Bundesland, Karneval, Advent, Zeitumstellung, Bauernregeln und besondere Tage in einem Kalender. Jeder Monat von 1900 bis 2100 lässt sich aufrufen."
        tool={
          <div className="date-calc">
            <div className="takvim-bugun">
              <div>
                <span>Heute</span>
                <strong>{formatDeLong(heute)}</strong>
                <em>
                  {info.termine.length
                    ? info.termine.map((t) => t.tag.name).join(" · ")
                    : `KW ${info.kw}`}
                </em>
              </div>
              <dl>
                <div>
                  <dt>Kalenderwoche</dt>
                  <dd>KW {info.kw}</dd>
                </div>
                <div>
                  <dt>Tag im Jahr</dt>
                  <dd>{info.tagImJahr}.</dd>
                </div>
                <div>
                  <dt>Bis Jahresende</dt>
                  <dd>{info.restTage} Tage</dd>
                </div>
                <div>
                  <dt>Mondphase</dt>
                  <dd>{info.mond}</dd>
                </div>
              </dl>
            </div>
            <DeKalenderNavigator heute={heute} />
            <div className="time-tool-chips takvim-yillar">
              {DE_JAHRE.map((y) => (
                <Link key={y} href={deJahrPfad(y)} prefetch={false}>
                  Kalender {y}
                </Link>
              ))}
              <Link href="/de/besondere-tage" prefetch={false}>
                Besondere Tage
              </Link>
            </div>
          </div>
        }
        related={{ title: T.related, links: DE_KALENDER_LINKS }}
        tocTitle={T.toc}
        tocItems={[
          { id: "naechste", label: "Die nächsten besonderen Tage" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="naechste">Die nächsten besonderen Tage</h2>
        <Liste list={naechste} />
        <Ics year={heute.year} />
      </TimeToolPage>
    </div>
  );
}

/* /de/kalender/[jahr] ---------------------------------------------------- */

export function deJahrMeta(y: number) {
  return {
    title: `Kalender ${y} mit Feiertagen, KW und besonderen Tagen`,
    short: `Kalender ${y} mit Feiertagen`,
    description: `Kalender ${y} für Deutschland: alle Kalenderwochen, gesetzliche Feiertage nach Bundesland, Ostern, Pfingsten, Karneval, Advent, Zeitumstellung und besondere Tage – zum Abonnieren.`,
  };
}

export function DeJahrSeite({ year }: { year: number }) {
  const list = deJahresTermine(year);
  const ostern = list.find((t) => t.tag.id === "ostersonntag");
  const kws = kalenderwoche({ year, month: 12, day: 28 }).week;
  const faq: FaqItem[] = [
    {
      question: `Wie viele Kalenderwochen hat ${year}?`,
      answer: `${year} hat ${kws} Kalenderwochen nach ISO 8601. KW 1 beginnt am ${formatDeLong(kalenderwoche({ year, month: 1, day: 4 }).monday)}.`,
    },
    ostern
      ? {
          question: `Wann ist Ostern ${year}?`,
          answer: `Ostersonntag ist ${year} am ${kurz(ostern.datum)}. Karfreitag fällt auf den ${kurz(addDaysYmd(ostern.datum, -2))}, Ostermontag auf den ${kurz(addDaysYmd(ostern.datum, 1))}.`,
        }
      : null,
    {
      question: `Wie viele Feiertage gibt es ${year}?`,
      answer: `Bundesweit gelten neun gesetzliche Feiertage; je nach Bundesland kommen bis zu fünf weitere hinzu. Wie viele davon ${year} auf einen Werktag fallen, zeigt die Übersicht der Feiertage nach Bundesland.`,
    },
    {
      question: `Ist ${year} ein Schaltjahr?`,
      answer: `${year} ist ${diffDays({ year, month: 1, day: 1 }, { year: year + 1, month: 1, day: 1 }) === 366 ? "ein Schaltjahr mit 366 Tagen" : "kein Schaltjahr und hat 365 Tage"}; es beginnt an einem ${formatDe({ year, month: 1, day: 1 }, { weekday: "long" })}.`,
    },
  ].filter((x): x is FaqItem => Boolean(x));
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, HUB, { label: String(year) }]}
        crumbLabel={T.crumb}
        title={`Kalender ${year}`}
        intro={`Jahreskalender ${year} mit Kalenderwochen, bundesweiten und regionalen Feiertagen sowie Karneval, Ostern, Advent, Zeitumstellung und weiteren besonderen Tagen. Markierte Tage führen zur Tagesseite.`}
        tool={
          <div className="date-calc">
            <div className="holiday-calendar takvim-yil">
              {DE_MONATE.map((m, i) => (
                <div className="holiday-month" key={m}>
                  <h3>
                    <Link href={deMonatPfad(year, i + 1)} prefetch={false}>
                      {m}
                    </Link>
                  </h3>
                  <DeMonatsGitter year={year} month={i + 1} land={null} />
                </div>
              ))}
            </div>
            <DeLegende land={false} />
            <Ics year={year} />
          </div>
        }
        related={{
          title: T.related,
          links: [
            ...DE_JAHRE.filter((y) => y !== year).map((y) => ({
              href: deJahrPfad(y),
              label: `Kalender ${y}`,
            })),
            ...DE_KALENDER_LINKS,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "tage", label: `Besondere Tage ${year}` },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="tage">Feiertage und besondere Tage {year}</h2>
        {DE_MONATE.map((m, i) => {
          const monat = list.filter((t) => t.datum.month === i + 1);
          if (!monat.length) return null;
          return (
            <section key={m}>
              <h3>
                <Link href={deMonatPfad(year, i + 1)} prefetch={false}>
                  {m} {year}
                </Link>
              </h3>
              <Liste list={monat} bild={false} />
            </section>
          );
        })}
      </TimeToolPage>
    </div>
  );
}

/* /de/kalender/[jahr]/[monat] -------------------------------------------- */

export function deMonatMeta(y: number, m: number) {
  const name = DE_MONATE[m - 1];
  return {
    title: `Kalender ${name} ${y}: Feiertage, KW und Arbeitstage`,
    short: `Kalender ${name} ${y}`,
    description: `${name} ${y}: Kalender mit Kalenderwochen, Feiertagen nach Bundesland, Arbeitstagen je Bundesland, Vollmond und Neumond sowie besonderen Tagen.`,
  };
}

function arbeitstage(year: number, month: number, land: StateCode) {
  const lookup = germanHolidayLookup(land, year, year);
  return countDays(
    { year, month, day: 1 },
    { year, month, day: daysInMonth(year, month) },
    lookup,
  ).work;
}

export function DeMonatSeite({ year, month }: { year: number; month: number }) {
  const name = DE_MONATE[month - 1];
  const list = deJahresTermine(year).filter((t) => t.datum.month === month);
  const vor = month === 1 ? { y: year - 1, m: 12 } : { y: year, m: month - 1 };
  const nach = month === 12 ? { y: year + 1, m: 1 } : { y: year, m: month + 1 };
  const phasen = moonPhasesBetween(
    new Date(Date.UTC(year, month - 1, 1, -1)),
    new Date(Date.UTC(year, month, 1, -1)),
  ).filter((p) => p.kind === "full" || p.kind === "new");
  const at = GERMAN_STATES.map((s) => ({
    s,
    n: arbeitstage(year, month, s.code),
  }));
  const min = Math.min(...at.map((x) => x.n));
  const max = Math.max(...at.map((x) => x.n));
  const kwVon = kalenderwoche({ year, month, day: 1 }).week;
  const kwBis = kalenderwoche({
    year,
    month,
    day: daysInMonth(year, month),
  }).week;
  const faq: FaqItem[] = [
    {
      question: `Wie viele Arbeitstage hat der ${name} ${year}?`,
      answer:
        min === max
          ? `Der ${name} ${year} hat in allen Bundesländern ${min} Arbeitstage (Montag bis Freitag ohne Feiertage).`
          : `Je nach Bundesland hat der ${name} ${year} ${min} bis ${max} Arbeitstage (Montag bis Freitag ohne gesetzliche Feiertage).`,
    },
    {
      question: `Welche Kalenderwochen hat der ${name} ${year}?`,
      answer: `Der ${name} ${year} umfasst die Kalenderwochen ${kwVon} bis ${kwBis}.`,
    },
    {
      question: `Welche Feiertage gibt es im ${name} ${year}?`,
      answer: list.filter((t) => t.tag.kategorie === "feiertag").length
        ? list
            .filter((t) => t.tag.kategorie === "feiertag")
            .map((t) => `${t.tag.name} (${spanne(t)}, ${laenderText(t)})`)
            .join("; ") + "."
        : `Im ${name} ${year} gibt es keinen gesetzlichen Feiertag.`,
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          START,
          HUB,
          { href: deJahrPfad(year), label: String(year) },
          { label: name },
        ]}
        crumbLabel={T.crumb}
        title={`Kalender ${name} ${year}`}
        intro={`${name} ${year} mit Kalenderwochen, Feiertagen, Arbeitstagen je Bundesland, Mondphasen und besonderen Tagen.`}
        tool={
          <div className="date-calc">
            <div className="takvim-ay-baslik">
              {DE_JAHRE.includes(vor.y) ? (
                <Link href={deMonatPfad(vor.y, vor.m)} prefetch={false}>
                  ‹ {DE_MONATE[vor.m - 1]}
                </Link>
              ) : (
                <span />
              )}
              <h2>
                {name} {year}
              </h2>
              {DE_JAHRE.includes(nach.y) ? (
                <Link href={deMonatPfad(nach.y, nach.m)} prefetch={false}>
                  {DE_MONATE[nach.m - 1]} ›
                </Link>
              ) : (
                <span />
              )}
            </div>
            <DeMonatsGitter year={year} month={month} land={null} gross />
            <DeLegende land={false} />
            <div className="date-calc-results">
              <div className="date-calc-stat">
                <span>Arbeitstage</span>
                <strong>
                  {min === max ? `${min} Tage` : `${min}–${max} Tage`}
                </strong>
                <em>Mo–Fr ohne Feiertage, je nach Bundesland</em>
              </div>
              <div className="date-calc-stat">
                <span>Kalenderwochen</span>
                <strong>
                  KW {kwVon} – {kwBis}
                </strong>
                <em>nach ISO 8601</em>
              </div>
              <div className="date-calc-stat">
                <span>Mondphasen</span>
                <strong>
                  {phasen
                    .map(
                      (p) =>
                        `${p.kind === "full" ? "🌕" : "🌑"} ${new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short", timeZone: "Europe/Berlin" }).format(p.date)}`,
                    )
                    .join("  ")}
                </strong>
                <em>Vollmond und Neumond</em>
              </div>
            </div>
          </div>
        }
        related={{
          title: T.related,
          links: [
            { href: deJahrPfad(year), label: `Kalender ${year}` },
            ...DE_KALENDER_LINKS,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "tage", label: `Besondere Tage im ${name}` },
          { id: "arbeitstage", label: "Arbeitstage nach Bundesland" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="tage">
          Besondere Tage im {name} {year}
        </h2>
        {list.length ? (
          <Liste list={list} tagAnker />
        ) : (
          <p>
            In diesem Monat gibt es keinen der besonderen Tage aus unserem
            Kalender.
          </p>
        )}
        <h2 id="arbeitstage">
          Arbeitstage im {name} {year} nach Bundesland
        </h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Bundesland</th>
                <th scope="col">Arbeitstage</th>
              </tr>
            </thead>
            <tbody>
              {at.map(({ s, n }) => (
                <tr key={s.code}>
                  <td>
                    <Link href={`/de/feiertage?land=${s.slug}`} prefetch={false}>
                      {s.name}
                    </Link>
                  </td>
                  <td>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Gezählt werden Montag bis Freitag ohne landesweite gesetzliche
          Feiertage. Für eigene Zeiträume und Teilzeit nutzen Sie den{" "}
          <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /de/besondere-tage ------------------------------------------------------ */

const REIHENFOLGE: DeKategorie[] = [
  "feiertag",
  "brauch",
  "aktion",
  "gedenk",
  "lostag",
  "natur",
];

export function DeBesondereTageHub() {
  const heute = todayBerlin();
  const faq: FaqItem[] = [
    {
      question: "Wie viele gesetzliche Feiertage gibt es in Deutschland?",
      answer:
        "Bundesweit gelten neun Feiertage: Neujahr, Karfreitag, Ostermontag, Tag der Arbeit, Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit sowie der 1. und 2. Weihnachtstag. Je nach Bundesland kommen weitere hinzu – die meisten hat Bayern.",
    },
    {
      question: "Warum ändern sich Ostern und Pfingsten jedes Jahr?",
      answer:
        "Ostern fällt auf den ersten Sonntag nach dem ersten Frühlingsvollmond. Karneval, Christi Himmelfahrt, Pfingsten und Fronleichnam haben einen festen Abstand zu Ostern und wandern deshalb mit.",
    },
    {
      question: "Sind Heiligabend und Silvester Feiertage?",
      answer:
        "Nein. Heiligabend und Silvester sind keine gesetzlichen Feiertage; Geschäfte schließen aber um 14 Uhr, und viele Beschäftigte haben durch Tarif- oder Arbeitsvertrag frei.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[START, HUB, { label: "Besondere Tage" }]}
        crumbLabel={T.crumb}
        title="Besondere Tage und Feiertage in Deutschland"
        intro="Wann ist Ostern, Rosenmontag oder der erste Advent? Alle gesetzlichen Feiertage, kirchlichen Feste, Aktions- und Gedenktage, Lostage und Jahreszeiten mit dem nächsten Termin und den Tagen bis dahin."
        tool={
          <div className="takvim-hub">
            {REIHENFOLGE.map((k) => (
              <section key={k}>
                <h2 id={`kat-${k}`}>{DE_KATEGORIE[k]}</h2>
                <ul className="takvim-hub-liste">
                  {DE_TAGE.filter((t) => t.kategorie === k).map((t) => {
                    const n = deNaechster(t, heute);
                    const rest = n ? diffDays(heute, n.datum) : null;
                    return (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>
                          <TakvimGorsel gorsel={t.bild} size={56} />
                          <span>
                            <strong>{t.name}</strong>
                            {n ? (
                              <em>
                                {formatDeLong(n.datum)}
                                {rest !== null
                                  ? rest > 0
                                    ? ` · noch ${rest} Tage`
                                    : rest < 0 && n.bis
                                      ? ` · läuft noch bis ${kurz(n.bis)}`
                                      : " · heute"
                                  : ""}
                              </em>
                            ) : null}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        }
        related={{ title: T.related, links: [HUB, ...DE_KALENDER_LINKS] }}
        tocTitle={T.toc}
        tocItems={[
          ...REIHENFOLGE.map((k) => ({
            id: `kat-${k}`,
            label: DE_KATEGORIE[k],
          })),
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <ScrollToQuery param="tag" />
        {REIHENFOLGE.map((k) =>
          DE_TAGE.filter((t) => t.kategorie === k).map((t) => {
            const n = deNaechster(t, heute);
            const rest = n ? diffDays(heute, n.datum) : null;
            const zeilen = DE_JAHRE.flatMap((y) => deTermine(t, y));
            const erste = zeilen[0];
            return (
              <section key={t.id} id={t.id}>
                <h2>Wann ist {t.name}?</h2>
                <p>
                  <strong>
                    {n
                      ? `${formatDeLong(n.datum)}${n.zeit ? `, ${zeitDe(n.zeit)} Uhr` : ""} (KW ${kalenderwoche(n.datum).week}${
                          rest !== null ? (rest > 0 ? `, noch ${rest} Tage` : rest < 0 && n.bis ? `, bis ${kurz(n.bis)}` : ", heute") : ""
                        })`
                      : ""}
                  </strong>{" "}
                  {erste?.laender ? `Feiertag: ${laenderText(erste)}.` : "Kein gesetzlicher Feiertag."}
                </p>
                <p>{t.info}</p>
                <p>
                  {zeilen.map((x, i) => (
                    <span key={ymdKey(x.datum)}>
                      {i > 0 ? " · " : ""}
                      {x.datum.year}: {spanne(x)} ({formatDe(x.datum, { weekday: "short" })})
                    </span>
                  ))}
                </p>
                {t.countdown ? (
                  <p>
                    <Link href={`/de/countdown/${t.countdown}`} prefetch={false}>
                      Countdown bis {t.name}
                    </Link>
                  </p>
                ) : null}
              </section>
            );
          }),
        )}
        <p>
          Ostern fällt auf den ersten Sonntag nach dem ersten Frühlingsvollmond; Karneval, Christi Himmelfahrt, Pfingsten
          und Fronleichnam wandern mit. Muttertag, Erntedank und Advent hängen an einem bestimmten Sonntag, Jahreszeiten
          werden astronomisch bestimmt.
        </p>
        <p>
          Alle Tage im Monatsüberblick zeigt der{" "}
          <Link href="/de/kalender">Kalender</Link>; Urlaub rund um die
          Feiertage plant der{" "}
          <Link href="/de/brueckentage">Brückentage-Planer</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}

