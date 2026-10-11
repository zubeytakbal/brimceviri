// "Time and Date" – English section home: live local clock, today's facts, US
// holidays and clock changes, upcoming days and every clock and calendar tool.
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import { countdownEvents, countdownPath, upcomingOccurrences } from "../../converter/time/countdownEvents";
import { addDaysYmd, dayOfYear, diffDays, formatYmdParts, isoWeek, usWeek, weekdayOf } from "../../converter/time/dateMath";
import { usFederalHolidays } from "../../converter/time/holidays";
import { moonState, phaseName, type PhaseName } from "../../converter/time/moon";
import { worldCities } from "../../converter/time/worldCities";
import { DecorativeIcon, type SiteIconName } from "../siteIcons";
import TimeToolPage from "../time/TimeToolPage";
import DayNightMap from "./DayNightMap";
import TimeHubHero, { type HubHeroCopy } from "./TimeHubHero";
import { TIME_HUB_PATHS } from "./timeHubPaths";

export const EN_TIME_HUB_PATH = TIME_HUB_PATHS.en;

const HERO_COPY: HubHeroCopy = {
  ariaLabel: "Current time",
  zoneLabel: "Your local time",
  dateLine: "{date} · ISO week {week} · day {doy} of the year",
  deviceTime: "Your device: {time} ({zone})",
  sun: "Sun",
  placeLabel: "Choose a city",
  dayLength: "{h} h {m} min of daylight",
  same: "same time",
  hourAbbr: "h",
  polarDay: "Midnight sun – the sun does not set",
  polarNight: "Polar night – the sun does not rise",
};

const STRIP = ["new-york", "los-angeles", "london", "paris", "dubai", "new-delhi", "singapore", "tokyo", "sydney"];
const MAP = ["new-york", "los-angeles", "sao-paulo", "london", "lagos", "cairo", "moscow", "dubai", "new-delhi", "beijing", "tokyo", "sydney"];

const MOON: Record<PhaseName, string> = {
  new: "New moon",
  "waxing-crescent": "Waxing crescent",
  first: "First quarter",
  "waxing-gibbous": "Waxing gibbous",
  full: "Full moon",
  "waning-gibbous": "Waning gibbous",
  last: "Last quarter",
  "waning-crescent": "Waning crescent",
};

type Group = { id: string; title: string; icon: SiteIconName; links: Array<{ href: string; label: string; note: string }> };

const GROUPS: Group[] = [
  {
    id: "clock",
    title: "Clocks and timers",
    icon: "time",
    links: [
      { href: "/en/online-clock", label: "Online Clock", note: "34 clock faces, full screen" },
      { href: "/en/alarm-clock", label: "Alarm Clock", note: "Rings in your browser" },
      { href: "/en/timer", label: "Timer", note: "Countdown with a sound" },
      { href: "/en/stopwatch", label: "Stopwatch", note: "Laps and CSV export" },
      { href: "/en/pomodoro-timer", label: "Pomodoro Timer", note: "25 + 5 minute cycles" },
      { href: "/en/interval-timer", label: "Interval Timer", note: "Tabata and HIIT" },
    ],
  },
  {
    id: "calendar",
    title: "Calendar and holidays",
    icon: "dateCalculator",
    links: [
      { href: "/en/week-number", label: "Week Number", note: "What week is it?" },
      { href: "/en/federal-holidays", label: "US Federal Holidays", note: "With observed dates" },
      { href: "/en/countdown", label: "Countdown", note: "Days until Christmas and more" },
      { href: "/en/easter-date-calculator", label: "Easter Date", note: "Western and Orthodox" },
    ],
  },
  {
    id: "calculate",
    title: "Date calculators",
    icon: "weekNumber",
    links: [
      { href: "/en/days-between-dates", label: "Days Between Dates", note: "Days, weeks, months" },
      { href: "/en/date-calculator", label: "Date Calculator", note: "Add or subtract days" },
      { href: "/en/business-day-calculator", label: "Business Days", note: "Skips US holidays" },
      { href: "/en/age-calculator", label: "Age Calculator", note: "Your age to the day" },
      { href: "/en/sleep-calculator", label: "Sleep Calculator", note: "When to go to bed" },
    ],
  },
  {
    id: "world",
    title: "World time",
    icon: "greatCircleCalculator",
    links: [
      { href: "/en/world-clock", label: "World Clock", note: "Time in 97 cities" },
      { href: "/en/time-zone-converter", label: "Time Zone Converter", note: "And meeting planner" },
      { href: "/en/unix-timestamp-converter", label: "Unix Timestamp", note: "For developers" },
    ],
  },
  {
    id: "sky",
    title: "Sun and moon",
    icon: "sleepCalculator",
    links: [
      { href: "/en/moon-phases", label: "Moon Phases", note: "Full and new moon times" },
      { href: "/en/golden-hour", label: "Golden Hour", note: "Best light for photos" },
    ],
  },
  {
    id: "faith",
    title: "Religious calendars",
    icon: "hijriCalendarCalculator",
    links: [
      { href: "/en/hijri-date-converter", label: "Hijri Date Converter", note: "Islamic calendar" },
      { href: "/en/liturgical-calendar", label: "Liturgical Calendar", note: "Church seasons" },
      { href: "/en/julian-calendar-converter", label: "Julian Calendar", note: "Old and new style" },
    ],
  },
];

/** nth weekday of a month (weekday 0 = Sunday). */
function nthSunday(year: number, month: number, nth: number): YMD {
  let d: YMD = { year, month, day: 1 };
  while (weekdayOf(d) !== 0) d = addDaysYmd(d, 1);
  return addDaysYmd(d, 7 * (nth - 1));
}

/** Next US clock change: second Sunday in March, first Sunday in November (Energy Policy Act of 2005). */
function nextUsClockChange(today: YMD) {
  for (const year of [today.year, today.year + 1])
    for (const [month, nth, forward] of [
      [3, 2, true],
      [11, 1, false],
    ] as const) {
      const date = nthSunday(year, month, nth);
      if (diffDays(today, date) >= 0) return { date, forward };
    }
  return null;
}

const fmt = (d: YMD) => formatYmdParts(d, "en", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export default function EnTimeHubPage() {
  const now = new Date();
  const today: YMD = { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate() };
  const moon = moonState(now);
  const week = isoWeek(today).week;
  const yearDays = diffDays({ year: today.year, month: 1, day: 1 }, { year: today.year + 1, month: 1, day: 1 });
  const doy = dayOfYear(today);
  const holiday = [...usFederalHolidays(today.year), ...usFederalHolidays(today.year + 1)].find((h) => diffDays(today, h.date) > 0);
  const change = nextUsClockChange(today);
  const soon = countdownEvents
    .filter((e) => e.lang === "en")
    .map((e) => ({ e, date: upcomingOccurrences(e, now, 1)[0] }))
    .filter((x) => x.date !== undefined)
    .map((x) => ({ ...x, days: diffDays(today, x.date) }))
    .sort((a, b) => a.days - b.days)
    .slice(0, 8);

  const strip = STRIP.map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: c.nameEn, timeZone: c.timeZone, href: `/en/world-clock/${c.en}` }));
  const mapCities = MAP.map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: c.nameEn, lat: c.lat, lon: c.lon, timeZone: c.timeZone }));
  const places = [...worldCities].sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en")).map((c) => ({ id: c.en, name: c.nameEn, lat: c.lat, lon: c.lon, timeZone: c.timeZone }));

  const faq: FaqItem[] = [
    {
      question: "Why does this page show my own time?",
      answer: "The large clock uses your device's time zone, so it shows the local time wherever you are. Your computer or phone syncs its clock over the internet and is usually accurate to a fraction of a second.",
    },
    {
      question: "When do the clocks change in the US and in Europe?",
      answer:
        "In most of the US, clocks go forward one hour on the second Sunday in March and back on the first Sunday in November, at 2 a.m. local time. The EU and the UK change on the last Sunday in March and the last Sunday in October, so for a few weeks a year the time difference across the Atlantic is one hour shorter than usual.",
    },
    {
      question: "ISO week or US week number?",
      answer: `ISO weeks start on Monday and week 1 contains the year's first Thursday; today is ISO week ${week}. US calendars often start the week on Sunday and count the week containing January 1 as week 1, which gives week ${usWeek(today)} today.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[{ href: "/en", label: "Home" }, { label: "Time and Date" }]}
      crumbLabel="Breadcrumb"
      title="Time and Date"
      intro="What time is it, what week is it, and when is the next holiday? A live clock in your own time zone, sunrise and sunset for 97 cities, the moon phase, US clock changes and every clock and calendar tool on one page."
      tool={<TimeHubHero intlLocale="en-US" timeZone="" hourCycle="h12" copy={HERO_COPY} places={places} defaultPlace="new-york" storageKey="time-and-date-city" strip={strip} />}
      tocTitle="Contents"
      tocItems={[
        { id: "today", label: "Today" },
        { id: "day-night", label: "Day and night map" },
        { id: "coming-up", label: "Coming up" },
        { id: "tools", label: "All time and date tools" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faq}
    >
      <h2 id="today">Today: {fmt(today)}</h2>
      <div className="timehub-today">
        <div className="timehub-today-item">
          <span>Week</span>
          <strong>ISO week {week}</strong>
          <em>US week {usWeek(today)}</em>
        </div>
        <div className="timehub-today-item">
          <span>Year</span>
          <strong>Day {doy}</strong>
          <em>{yearDays - doy} days left in the year</em>
        </div>
        <div className="timehub-today-item">
          <span>Moon</span>
          <strong>{MOON[phaseName(moon.age)]}</strong>
          <em>{Math.round(moon.illumination * 100)}% illuminated</em>
        </div>
        {change ? (
          <div className="timehub-today-item">
            <span>Next US clock change</span>
            <strong>{change.forward ? "Clocks go forward" : "Clocks go back"}</strong>
            <em>
              {fmt(change.date)} · {change.forward ? "2 a.m. becomes 3 a.m." : "2 a.m. becomes 1 a.m."}
            </em>
          </div>
        ) : null}
        {holiday ? (
          <div className="timehub-today-item is-accent">
            <span>Next US federal holiday</span>
            <strong>{holiday.name}</strong>
            <em>
              {fmt(holiday.date)} · {diffDays(today, holiday.date) === 1 ? "tomorrow" : `in ${diffDays(today, holiday.date)} days`}
            </em>
          </div>
        ) : null}
      </div>

      <h2 id="day-night">Where is it day and where is it night right now?</h2>
      <p>
        The dark area shows where it is night right now, and the yellow dot marks the place where the sun is directly overhead. The map updates
        every minute. The line between day and night tilts with the seasons: between the September equinox (22–23 September) and the March
        equinox (20–21 March), nights are longer than days in the Northern Hemisphere.
      </p>
      <DayNightMap ariaLabel="World map of day and night" lang="en" intlLocale="en-US" cities={mapCities} dayLabel="day" nightLabel="night" />

      <h2 id="coming-up">Coming up</h2>
      <ul className="timehub-upcoming">
        {soon.map(({ e, date, days }) => (
          <li key={e.id}>
            <Link href={countdownPath(e)}>
              <strong>{e.name}</strong>
              <span>{fmt(date)}</span>
              <em>{days <= 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`}</em>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/en/countdown">All countdowns</Link> · <Link href="/en/federal-holidays">US federal holidays</Link>
      </p>

      <h2 id="tools">All time and date tools</h2>
      <div className="timehub-groups">
        {GROUPS.map((group) => (
          <section className="timehub-group" key={group.id} aria-labelledby={`group-${group.id}`}>
            <h3 id={`group-${group.id}`}>
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
  );
}
