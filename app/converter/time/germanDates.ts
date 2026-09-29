// Deutsche Datumsformatierung und Hilfen für die Kalender-Werkzeuge.
import type { YMD } from "./calendars";
import { isoWeek, isoWeekStart, addDaysYmd, ymdToMs } from "./dateMath";

const fmtCache = new Map<string, Intl.DateTimeFormat>();

export function formatDe(date: YMD, options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }) {
  const key = JSON.stringify(options);
  let f = fmtCache.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat("de-DE", { ...options, timeZone: "UTC" });
    fmtCache.set(key, f);
  }
  return f.format(new Date(ymdToMs(date)));
}

export const formatDeLong = (date: YMD) => formatDe(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const formatDeShort = (date: YMD) => formatDe(date, { day: "2-digit", month: "2-digit", year: "numeric" });
export const weekdayDe = (date: YMD) => formatDe(date, { weekday: "long" });
export const weekdayDeShort = (date: YMD) => formatDe(date, { weekday: "short" });

/** Heutiges Datum in Deutschland (Europe/Berlin). */
export function todayBerlin(now = new Date()): YMD {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const [year, month, day] = parts.split("-").map(Number);
  return { year, month, day };
}

/** Kalenderwoche nach ISO 8601 mit Montag und Sonntag der Woche. */
export function kalenderwoche(date: YMD) {
  const w = isoWeek(date);
  const monday = isoWeekStart(w.year, w.week);
  return { ...w, monday, sunday: addDaysYmd(monday, 6) };
}

/** "28.09.–04.10.2026" */
export function weekRangeDe(monday: YMD, sunday: YMD) {
  // de-DE liefert "28.09." bereits mit Schlusspunkt.
  const a = formatDe(monday, { day: "2-digit", month: "2-digit" }).replace(/\.?$/, ".");
  return `${a}–${formatDeShort(sunday)}`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const ymdInput = (d: YMD) => `${d.year}-${pad2(d.month)}-${pad2(d.day)}`;
