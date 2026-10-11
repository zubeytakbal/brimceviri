// "Uhrzeit und Datum" – Startseite des Zeit-Bereichs (Deutsch): Live-Uhr, Infos
// zum heutigen Tag, nächste Termine und alle Uhr- und Kalenderwerkzeuge.
import Link from "@/app/components/SiteLink";
import { DE_KATEGORIE, DE_TAGE, deBesondererTagPfad, deNaechster, deTagInfo } from "../../converter/calendar/deKalender";
import type { FaqItem } from "../../converter/faqSchema";
import { germanCities } from "../../converter/geo/germanCities";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, weekdayOf, ymdKey } from "../../converter/time/dateMath";
import { formatDeLong, todayBerlin } from "../../converter/time/germanDates";
import { germanHolidays } from "../../converter/time/germanHolidays";
import { cityNameDe, cityPathDe } from "../../converter/time/germanWorld";
import { worldCities } from "../../converter/time/worldCities";
import { DecorativeIcon, type SiteIconName } from "../siteIcons";
import TimeToolPage from "../time/TimeToolPage";
import TimeHubHero, { type HubHeroCopy } from "./TimeHubHero";

export const DE_TIME_HUB_PATH = "/de/uhrzeit-und-datum";

const HERO_COPY: HubHeroCopy = {
  ariaLabel: "Aktuelle Uhrzeit",
  zoneLabel: "Uhrzeit in Deutschland",
  dateLine: "{date} · KW {week} · {doy}. Tag des Jahres",
  deviceTime: "Uhrzeit auf Ihrem Gerät: {time} ({zone})",
  sun: "Sonne",
  placeLabel: "Stadt wählen",
  dayLength: "{h} Std. {m} Min. Tageslicht",
  same: "gleiche Zeit",
  hourAbbr: "Std.",
};

const STRIP = ["new-york", "london", "istanbul", "moscow", "dubai", "beijing", "tokyo", "sydney", "los-angeles"];

type Group = { id: string; title: string; icon: SiteIconName; links: Array<{ href: string; label: string; note: string }> };

const GROUPS: Group[] = [
  {
    id: "uhr",
    title: "Uhr und Timer",
    icon: "time",
    links: [
      { href: "/de/online-uhr", label: "Online-Uhr", note: "Live-Uhr, Vollbild" },
      { href: "/de/wecker", label: "Online-Wecker", note: "Weckton im Browser" },
      { href: "/de/timer", label: "Timer", note: "Countdown mit Signal" },
      { href: "/de/stoppuhr", label: "Stoppuhr", note: "Mit Rundenzeiten" },
      { href: "/de/eieruhr", label: "Eieruhr", note: "Weich, wachsweich, hart" },
      { href: "/de/pomodoro-timer", label: "Pomodoro-Timer", note: "25 + 5 Minuten" },
      { href: "/de/intervall-timer", label: "Intervall-Timer", note: "Tabata und HIIT" },
    ],
  },
  {
    id: "kalender",
    title: "Kalender und Feiertage",
    icon: "dateCalculator",
    links: [
      { href: "/de/kalender", label: "Kalender", note: "Mit Feiertagen und KW" },
      { href: "/de/kalenderwoche", label: "Kalenderwoche", note: "Welche KW ist heute?" },
      { href: "/de/feiertage", label: "Feiertage", note: "Nach Bundesland" },
      { href: "/de/brueckentage", label: "Brückentage", note: "Urlaub clever planen" },
      { href: "/de/besondere-tage", label: "Besondere Tage", note: "Feste und Gedenktage" },
      { href: "/de/feiertage-oesterreich", label: "Feiertage Österreich", note: "Alle 13 Feiertage" },
      { href: "/de/countdown", label: "Countdown", note: "Wie lange noch?" },
    ],
  },
  {
    id: "rechnen",
    title: "Datum berechnen",
    icon: "weekNumber",
    links: [
      { href: "/de/tagerechner", label: "Tagerechner", note: "Tage zwischen zwei Daten" },
      { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner", note: "Ohne Feiertage" },
      { href: "/de/altersrechner", label: "Altersrechner", note: "Alter auf den Tag" },
      { href: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner", note: "Stunden und Pausen" },
      { href: "/de/urlaubsrechner", label: "Urlaubsrechner", note: "Anspruch nach BUrlG" },
    ],
  },
  {
    id: "welt",
    title: "Weltzeit",
    icon: "greatCircleCalculator",
    links: [
      { href: "/de/weltuhr", label: "Weltuhr", note: "Uhrzeit in 97 Städten" },
      { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner", note: "Termine umrechnen" },
      { href: "/de/zeitumstellung", label: "Zeitumstellung", note: "Sommer- und Winterzeit" },
    ],
  },
  {
    id: "himmel",
    title: "Mond und Natur",
    icon: "sleepCalculator",
    links: [
      { href: "/de/vollmond", label: "Vollmond-Kalender", note: "Alle Vollmonde des Jahres" },
      { href: "/de/bauernregeln", label: "Bauernregeln", note: "Lostage im Jahreslauf" },
    ],
  },
];

/** Letzter Sonntag eines Monats. */
function lastSunday(year: number, month: number): YMD {
  let d: YMD = { year, month: month + 1 > 12 ? 1 : month + 1, day: 1 };
  if (month === 12) d = { year: year + 1, month: 1, day: 1 };
  d = addDaysYmd(d, -1);
  while (weekdayOf(d) !== 0) d = addDaysYmd(d, -1);
  return d;
}

/** Nächste Zeitumstellung nach EU-Regel: letzter Sonntag im März (MESZ) bzw. Oktober (MEZ). */
function nextClockChange(today: YMD) {
  for (const year of [today.year, today.year + 1]) {
    for (const [month, toSummer] of [
      [3, true],
      [10, false],
    ] as const) {
      const date = lastSunday(year, month);
      if (diffDays(today, date) >= 0) return { date, toSummer };
    }
  }
  return null;
}

function upcoming(today: YMD, count: number) {
  return DE_TAGE.map((t) => deNaechster(t, today))
    .filter((t) => t !== null)
    .map((t) => ({ t, days: diffDays(today, t.datum) }))
    .filter((x) => x.days >= 0)
    .sort((a, b) => a.days - b.days || a.t.tag.name.localeCompare(b.t.tag.name, "de"))
    .slice(0, count);
}

function DeHero() {
  const strip = STRIP.map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: cityNameDe(c), timeZone: c.timeZone, href: cityPathDe(c) }));
  return (
    <TimeHubHero
      intlLocale="de-DE"
      timeZone="Europe/Berlin"
      copy={HERO_COPY}
      places={germanCities.map((c) => ({ id: c.id, name: c.name, lat: c.lat, lon: c.lon }))
        .sort((a, b) => a.name.localeCompare(b.name, "de"))}
      defaultPlace="berlin"
      storageKey="uhrzeit-und-datum-stadt"
      strip={strip}
    />
  );
}

export default function DeTimeHubPage() {
  const today = todayBerlin();
  const info = deTagInfo(today);
  const nextHoliday = [...germanHolidays(today.year), ...germanHolidays(today.year + 1)].find((h) => h.states.length === 16 && diffDays(today, h.date) > 0);
  const change = nextClockChange(today);
  const soon = upcoming(today, 8);

  const faq: FaqItem[] = [
    {
      question: "Welche Zeitzone gilt in Deutschland?",
      answer:
        "Im Winter gilt die Mitteleuropäische Zeit (MEZ, UTC+1), im Sommer die Mitteleuropäische Sommerzeit (MESZ, UTC+2). Umgestellt wird am letzten Sonntag im März und am letzten Sonntag im Oktober.",
    },
    {
      question: "Wie wird die Kalenderwoche gezählt?",
      answer: `In Deutschland gilt DIN ISO 8601: Die Woche beginnt am Montag, und KW 1 ist die Woche mit dem ersten Donnerstag des Jahres. Heute ist KW ${info.kw}.`,
    },
    {
      question: "Wie genau ist die Uhr auf dieser Seite?",
      answer:
        "Die Uhr zeigt die Systemzeit Ihres Geräts in deutscher Zeit. Computer und Smartphones gleichen ihre Uhr automatisch über das Internet ab und gehen deshalb meist auf Bruchteile einer Sekunde genau.",
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[{ href: "/de", label: "Startseite" }, { label: "Uhrzeit und Datum" }]}
        crumbLabel="Navigationspfad"
        title="Uhrzeit und Datum"
        intro="Wie spät ist es in Deutschland, welche Kalenderwoche haben wir und wann ist der nächste Feiertag? Live-Uhr, Sonnenauf- und -untergang für über 80 Städte, Mondphase, die nächsten besonderen Tage und alle Uhr- und Kalenderwerkzeuge auf einen Blick."
        tool={<DeHero />}
        tocTitle="Inhalt"
        tocItems={[
          { id: "heute", label: "Heute" },
          { id: "demnaechst", label: "Demnächst" },
          { id: "werkzeuge", label: "Alle Werkzeuge" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faq}
      >
        <h2 id="heute">Heute: {formatDeLong(today)}</h2>
        <div className="timehub-today">
          <div className="timehub-today-item">
            <span>Kalenderwoche</span>
            <strong>KW {info.kw}</strong>
          </div>
          <div className="timehub-today-item">
            <span>Jahr</span>
            <strong>{info.tagImJahr}. Tag</strong>
            <em>noch {info.restTage} Tage bis Silvester</em>
          </div>
          <div className="timehub-today-item">
            <span>Mond</span>
            <strong>{info.mond}</strong>
            <em>{Math.round(info.mondHell * 100)} % beleuchtet</em>
          </div>
          {change ? (
            <div className="timehub-today-item">
              <span>Zeitumstellung</span>
              <strong>{change.toSummer ? "Sommerzeit (MESZ)" : "Winterzeit (MEZ)"}</strong>
              <em>
                {formatDeLong(change.date)} · {change.toSummer ? "Uhren um 2 Uhr auf 3 Uhr vorstellen" : "Uhren um 3 Uhr auf 2 Uhr zurückstellen"}
              </em>
            </div>
          ) : null}
          {nextHoliday ? (
            <div className="timehub-today-item is-accent">
              <span>Nächster bundesweiter Feiertag</span>
              <strong>{nextHoliday.name}</strong>
              <em>
                {formatDeLong(nextHoliday.date)} · noch {diffDays(today, nextHoliday.date)} Tage
              </em>
            </div>
          ) : null}
        </div>
        {info.termine.length ? (
          <p>
            Heute:{" "}
            {info.termine.map((t, i) => (
              <span key={`${t.tag.id}-${i}`}>
                {i ? ", " : ""}
                <Link href={deBesondererTagPfad(t.tag.id)}>{t.tag.name}</Link>
              </span>
            ))}
            .
          </p>
        ) : null}

        <h2 id="demnaechst">Demnächst</h2>
        <ul className="timehub-upcoming">
          {soon.map(({ t, days }) => (
            <li key={`${t.tag.id}-${ymdKey(t.datum)}`}>
              <Link href={deBesondererTagPfad(t.tag.id)}>
                <strong>{t.tag.name}</strong>
                <span>{formatDeLong(t.datum)}</span>
                <em>
                  {days === 0 ? "heute" : days === 1 ? "morgen" : `in ${days} Tagen`} · {DE_KATEGORIE[t.tag.kategorie]}
                </em>
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/de/besondere-tage">Alle besonderen Tage</Link> · <Link href="/de/feiertage">Feiertage nach Bundesland</Link> ·{" "}
          <Link href="/de/brueckentage">Brückentage</Link>
        </p>

        <h2 id="werkzeuge">Alle Uhr- und Kalenderwerkzeuge</h2>
        <div className="timehub-groups">
          {GROUPS.map((group) => (
            <section className="timehub-group" key={group.id} aria-labelledby={`gruppe-${group.id}`}>
              <h3 id={`gruppe-${group.id}`}>
                <span className="home-category-icon-box" aria-hidden="true">
                  <DecorativeIcon className="home-category-icon-svg" name={group.icon} size={28} />
                </span>
                {group.title}
              </h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <strong>{link.label}</strong>
                      <span>{link.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </TimeToolPage>
    </div>
  );
}
