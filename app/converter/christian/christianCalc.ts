// Christian calendar and Bible calculations for the English tools.
// Fixed rules only: Easter computus (Gregorian and Julian), the feasts that
// follow from it, Lent counting, and KJV book data. No dates are hardcoded.
import type { YMD } from "../time/calendars";
import { addDaysYmd, diffDays, weekdayOf } from "../time/dateMath";
import { easterSunday } from "../time/germanHolidays";
import { BIBLE_ROWS } from "./bibleData";

/** The Gregorian computus is defined from 1583; the Julian/Gregorian offset formula holds to 4099. */
export const EASTER_MIN_YEAR = 1583;
export const EASTER_MAX_YEAR = 4099;

export const isEasterYear = (year: number) => Number.isInteger(year) && year >= EASTER_MIN_YEAR && year <= EASTER_MAX_YEAR;

/** Western (Catholic and Protestant) Easter Sunday, Gregorian calendar. */
export function westernEaster(year: number): YMD | null {
  return isEasterYear(year) ? easterSunday(year) : null;
}

/**
 * Orthodox Easter (Pascha): Meeus' Julian computus, then converted to the
 * Gregorian calendar (13 days in 1900–2099).
 */
export function orthodoxEaster(year: number): YMD | null {
  if (!isEasterYear(year)) return null;
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  return addDaysYmd({ year, month, day }, julianOffset(year));
}

/** Days the Julian calendar lags the Gregorian one (valid from March of `year`). */
export function julianOffset(year: number) {
  return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}

export type Feast = { id: string; name: string; date: YMD; note?: string };

const WESTERN_OFFSETS: Array<[string, string, number, string?]> = [
  ["shrove-tuesday", "Shrove Tuesday (Pancake Day)", -47],
  ["ash-wednesday", "Ash Wednesday", -46, "Lent begins"],
  ["palm-sunday", "Palm Sunday", -7, "Holy Week begins"],
  ["maundy-thursday", "Maundy Thursday", -3],
  ["good-friday", "Good Friday", -2],
  ["holy-saturday", "Holy Saturday", -1],
  ["easter", "Easter Sunday", 0],
  ["easter-monday", "Easter Monday", 1],
  ["divine-mercy", "Divine Mercy Sunday", 7],
  ["ascension", "Ascension Day", 39, "Thursday, 40th day of Easter"],
  ["pentecost", "Pentecost (Whitsunday)", 49],
  ["trinity", "Trinity Sunday", 56],
  ["corpus-christi", "Corpus Christi", 60, "Thursday; moved to the following Sunday in some countries"],
];

const ORTHODOX_OFFSETS: Array<[string, string, number, string?]> = [
  ["clean-monday", "Clean Monday", -48, "Great Lent begins"],
  ["lazarus-saturday", "Lazarus Saturday", -8],
  ["palm-sunday", "Palm Sunday", -7],
  ["holy-friday", "Holy Friday", -2],
  ["pascha", "Pascha (Orthodox Easter)", 0],
  ["bright-monday", "Bright Monday", 1],
  ["ascension", "Ascension", 39],
  ["pentecost", "Pentecost", 49],
];

const feasts = (easter: YMD, table: typeof WESTERN_OFFSETS): Feast[] =>
  table.map(([id, name, offset, note]) => ({ id, name, date: addDaysYmd(easter, offset), ...(note ? { note } : {}) }));

/** First Sunday of Advent: the fourth Sunday before Christmas (27 November – 3 December). */
export function adventSunday(year: number): YMD {
  const christmas = { year, month: 12, day: 25 };
  const back = weekdayOf(christmas) || 7;
  return addDaysYmd(christmas, -back - 21);
}

export function westernFeasts(year: number): Feast[] | null {
  const easter = westernEaster(year);
  if (!easter) return null;
  return [...feasts(easter, WESTERN_OFFSETS), { id: "advent", name: "First Sunday of Advent", date: adventSunday(year) }];
}

export function orthodoxFeasts(year: number): Feast[] | null {
  const easter = orthodoxEaster(year);
  return easter ? feasts(easter, ORTHODOX_OFFSETS) : null;
}

/* ---------------- Lent ---------------- */

export type LentStatus =
  | { phase: "before"; daysUntil: number; start: YMD; easter: YMD }
  | { phase: "lent"; day: number; isSunday: boolean; daysLeftAfterToday: number; daysToEaster: number; start: YMD; easter: YMD }
  | { phase: "after"; start: YMD; easter: YMD };

/**
 * Western Lent: Ash Wednesday to Holy Saturday is 46 days; Sundays are not
 * counted, which leaves the 40 days of Lent. `day` is the Lent day number
 * (Sundays keep the number of the day before).
 */
export function westernLent(date: YMD): LentStatus | null {
  const easter = westernEaster(date.year);
  if (!easter) return null;
  const start = addDaysYmd(easter, -46);
  const fromStart = diffDays(start, date);
  if (fromStart < 0) return { phase: "before", daysUntil: -fromStart, start, easter };
  const daysToEaster = diffDays(date, easter);
  if (daysToEaster <= 0) return { phase: "after", start, easter };
  // Ash Wednesday is day 1; one Sunday falls in every full week after it.
  const sundaysSoFar = Math.floor((fromStart + 3) / 7);
  const isSunday = weekdayOf(date) === 0;
  const day = fromStart + 1 - sundaysSoFar;
  return { phase: "lent", day, isSunday, daysLeftAfterToday: 40 - day, daysToEaster, start, easter };
}

/** Orthodox Great Lent: Clean Monday to the Friday before Lazarus Saturday (40 days), then Holy Week. */
export function orthodoxLent(year: number) {
  const easter = orthodoxEaster(year);
  if (!easter) return null;
  return { start: addDaysYmd(easter, -48), end: addDaysYmd(easter, -9), holyWeek: addDaysYmd(easter, -7), easter };
}

/* ---------------- Bible books ---------------- */

export type BibleSection =
  | "Law"
  | "History"
  | "Poetry and Wisdom"
  | "Major Prophets"
  | "Minor Prophets"
  | "Gospels"
  | "Pauline Epistles"
  | "General Epistles"
  | "Prophecy";

const sectionOf = (order: number): BibleSection =>
  order <= 5
    ? "Law"
    : order <= 17
      ? "History"
      : order <= 22
        ? "Poetry and Wisdom"
        : order <= 27
          ? "Major Prophets"
          : order <= 39
            ? "Minor Prophets"
            : order <= 43
              ? "Gospels"
              : order === 44
                ? "History"
                : order <= 57
                  ? "Pauline Epistles"
                  : order <= 65
                    ? "General Epistles"
                    : "Prophecy";

/** Average silent reading speed used for estimates (words per minute). */
export const READING_WPM = 200;

export type BibleBook = {
  order: number;
  id: string;
  name: string;
  slug: string;
  testament: "Old" | "New";
  section: BibleSection;
  chapters: number;
  verses: number;
  versesPerChapter: number[];
  words: number;
  /** Minutes at READING_WPM. */
  readingMinutes: number;
};

export const BIBLE_BOOKS: BibleBook[] = BIBLE_ROWS.map(([id, name, slug, words, versesPerChapter], i) => ({
  order: i + 1,
  id,
  name,
  slug,
  testament: i < 39 ? "Old" : "New",
  section: sectionOf(i + 1),
  chapters: versesPerChapter.length,
  verses: versesPerChapter.reduce((t, v) => t + v, 0),
  versesPerChapter,
  words,
  readingMinutes: words / READING_WPM,
}));

export const BIBLE_TOTALS = {
  books: BIBLE_BOOKS.length,
  chapters: BIBLE_BOOKS.reduce((t, b) => t + b.chapters, 0),
  verses: BIBLE_BOOKS.reduce((t, b) => t + b.verses, 0),
  words: BIBLE_BOOKS.reduce((t, b) => t + b.words, 0),
};

export const findBibleBook = (slug: string) => BIBLE_BOOKS.find((b) => b.slug === slug);

export function testamentTotals(testament: "Old" | "New") {
  const books = BIBLE_BOOKS.filter((b) => b.testament === testament);
  return {
    books: books.length,
    chapters: books.reduce((t, b) => t + b.chapters, 0),
    verses: books.reduce((t, b) => t + b.verses, 0),
    words: books.reduce((t, b) => t + b.words, 0),
  };
}

/* ---------------- Formatting ---------------- */

export const formatLongDate = (d: YMD) =>
  new Date(Date.UTC(d.year, d.month - 1, d.day)).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric" });

export const formatShortDate = (d: YMD) =>
  new Date(Date.UTC(d.year, d.month - 1, d.day)).toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" });

export function formatMinutes(minutes: number) {
  const m = Math.round(minutes);
  if (m < 60) return `${Math.max(1, m)} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}
