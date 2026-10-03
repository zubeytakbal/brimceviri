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

/* ---------------- Bible reading plan ---------------- */

export type ReadingScope = "bible" | "old" | "new" | "gospels" | "psalms-proverbs";

export const READING_SCOPES: Array<{ id: ReadingScope; label: string }> = [
  { id: "bible", label: "Whole Bible" },
  { id: "old", label: "Old Testament" },
  { id: "new", label: "New Testament" },
  { id: "gospels", label: "The four Gospels" },
  { id: "psalms-proverbs", label: "Psalms and Proverbs" },
];

export type ChapterRef = { book: BibleBook; chapter: number };

export function scopeBooks(scope: ReadingScope) {
  return BIBLE_BOOKS.filter((b) =>
    scope === "bible"
      ? true
      : scope === "old"
        ? b.testament === "Old"
        : scope === "new"
          ? b.testament === "New"
          : scope === "gospels"
            ? b.section === "Gospels"
            : b.slug === "psalms" || b.slug === "proverbs",
  );
}

export function scopeChapters(scope: ReadingScope): ChapterRef[] {
  return scopeBooks(scope).flatMap((book) => Array.from({ length: book.chapters }, (_, i) => ({ book, chapter: i + 1 })));
}

export type PlanDay = { day: number; from: ChapterRef; to: ChapterRef; chapters: number };

/**
 * Splits the chapters as evenly as possible over `days` days (the first days
 * get one chapter more when it does not divide exactly).
 */
export function readingSchedule(chapters: ChapterRef[], days: number): PlanDay[] {
  const n = Math.round(days);
  if (!(n >= 1) || chapters.length === 0) return [];
  // More days than chapters: one chapter a day, finishing early.
  const d = Math.min(n, chapters.length);
  const base = Math.floor(chapters.length / d);
  const extra = chapters.length % d;
  const out: PlanDay[] = [];
  let i = 0;
  for (let day = 1; day <= d; day++) {
    const count = base + (day <= extra ? 1 : 0);
    out.push({ day, from: chapters[i], to: chapters[i + count - 1], chapters: count });
    i += count;
  }
  return out;
}

export function formatChapterRange(from: ChapterRef, to: ChapterRef) {
  const ref = (c: ChapterRef) => `${c.book.slug === "psalms" ? "Psalm" : c.book.name} ${c.chapter}`;
  if (from.book === to.book) {
    return from.chapter === to.chapter ? ref(from) : `${from.book.name} ${from.chapter}–${to.chapter}`;
  }
  return `${ref(from)} – ${ref(to)}`;
}

export type CatchUp = {
  total: number;
  read: number;
  remaining: number;
  daysLeft: number;
  /** Chapters per day planned originally. */
  planPace: number;
  /** Chapters that should have been read by today. */
  expected: number;
  behind: number;
  newPace: number;
};

/**
 * Catch-up for a plan of `planDays` days started `daysElapsed` days ago
 * (today counts as a reading day still to come).
 */
export function catchUp(total: number, read: number, planDays: number, daysElapsed: number): CatchUp | null {
  if (!(total > 0) || !(read >= 0) || read > total || !(planDays >= 1) || !(daysElapsed >= 0)) return null;
  const daysLeft = Math.max(0, Math.round(planDays) - Math.round(daysElapsed));
  const remaining = total - read;
  const planPace = total / planDays;
  const expected = Math.min(total, Math.round(planPace * daysElapsed));
  return {
    total,
    read,
    remaining,
    daysLeft,
    planPace,
    expected,
    behind: Math.max(0, expected - read),
    newPace: daysLeft > 0 ? remaining / daysLeft : Number.POSITIVE_INFINITY,
  };
}

/* ---------------- Novenas ---------------- */

export type NovenaFeast = { id: string; name: string; rule: { month: number; day: number } | { easterOffset: number } };

/** Common novenas: fixed feasts of the General Roman Calendar and Easter-based ones. */
export const NOVENA_FEASTS: NovenaFeast[] = [
  { id: "lourdes", name: "Our Lady of Lourdes", rule: { month: 2, day: 11 } },
  { id: "patrick", name: "St. Patrick", rule: { month: 3, day: 17 } },
  { id: "joseph", name: "St. Joseph", rule: { month: 3, day: 19 } },
  { id: "annunciation", name: "The Annunciation", rule: { month: 3, day: 25 } },
  { id: "divine-mercy", name: "Divine Mercy Sunday", rule: { easterOffset: 7 } },
  { id: "fatima", name: "Our Lady of Fatima", rule: { month: 5, day: 13 } },
  { id: "rita", name: "St. Rita of Cascia", rule: { month: 5, day: 22 } },
  { id: "pentecost", name: "Pentecost (Novena to the Holy Spirit)", rule: { easterOffset: 49 } },
  { id: "anthony", name: "St. Anthony of Padua", rule: { month: 6, day: 13 } },
  { id: "sacred-heart", name: "The Sacred Heart of Jesus", rule: { easterOffset: 68 } },
  { id: "mount-carmel", name: "Our Lady of Mount Carmel", rule: { month: 7, day: 16 } },
  { id: "assumption", name: "The Assumption of Mary", rule: { month: 8, day: 15 } },
  { id: "padre-pio", name: "St. Padre Pio", rule: { month: 9, day: 23 } },
  { id: "michael", name: "St. Michael the Archangel", rule: { month: 9, day: 29 } },
  { id: "therese", name: "St. Thérèse of Lisieux", rule: { month: 10, day: 1 } },
  { id: "francis", name: "St. Francis of Assisi", rule: { month: 10, day: 4 } },
  { id: "rosary", name: "Our Lady of the Rosary", rule: { month: 10, day: 7 } },
  { id: "aparecida", name: "Our Lady of Aparecida", rule: { month: 10, day: 12 } },
  { id: "jude", name: "St. Jude", rule: { month: 10, day: 28 } },
  { id: "all-souls", name: "All Souls (for the Holy Souls)", rule: { month: 11, day: 2 } },
  { id: "immaculate-conception", name: "The Immaculate Conception", rule: { month: 12, day: 8 } },
  { id: "guadalupe", name: "Our Lady of Guadalupe", rule: { month: 12, day: 12 } },
  { id: "christmas", name: "Christmas", rule: { month: 12, day: 25 } },
];

export const NOVENA_DAYS = 9;

export function feastDate(feast: NovenaFeast, year: number): YMD | null {
  if ("easterOffset" in feast.rule) {
    const easter = westernEaster(year);
    return easter ? addDaysYmd(easter, feast.rule.easterOffset) : null;
  }
  return { year, month: feast.rule.month, day: feast.rule.day };
}

/**
 * A novena is prayed on the nine days before the feast: it starts nine days
 * before and its last day is the eve of the feast. (The Divine Mercy novena
 * starts on Good Friday, which is the same nine days.)
 */
export function novenaFor(feastDay: YMD) {
  return { start: addDaysYmd(feastDay, -NOVENA_DAYS), end: addDaysYmd(feastDay, -1), feastDay };
}

/** Novenas whose last day is today or later, from `from` on, sorted by start date. */
export function upcomingNovenas(from: YMD, count: number) {
  const list = [from.year, from.year + 1].flatMap((year) =>
    NOVENA_FEASTS.map((feast) => {
      const day = feastDate(feast, year);
      return day ? { feast, ...novenaFor(day) } : null;
    }),
  );
  return list
    .filter((x): x is NonNullable<typeof x> => x !== null && diffDays(from, x.end) >= 0)
    .sort((a, b) => diffDays(b.start, a.start))
    .slice(0, count);
}

/* ---------------- Rosary ---------------- */

export type MysterySet = "joyful" | "sorrowful" | "glorious" | "luminous";

export const MYSTERIES: Record<MysterySet, { name: string; items: string[] }> = {
  joyful: { name: "Joyful Mysteries", items: ["The Annunciation", "The Visitation", "The Nativity", "The Presentation in the Temple", "The Finding in the Temple"] },
  sorrowful: {
    name: "Sorrowful Mysteries",
    items: ["The Agony in the Garden", "The Scourging at the Pillar", "The Crowning with Thorns", "The Carrying of the Cross", "The Crucifixion"],
  },
  glorious: {
    name: "Glorious Mysteries",
    items: ["The Resurrection", "The Ascension", "The Descent of the Holy Spirit", "The Assumption of Mary", "The Coronation of Mary"],
  },
  luminous: {
    name: "Luminous Mysteries",
    items: [
      "The Baptism of Jesus",
      "The Wedding at Cana",
      "The Proclamation of the Kingdom",
      "The Transfiguration",
      "The Institution of the Eucharist",
    ],
  },
};

/** Weekday schedule since Rosarium Virginis Mariae (2002). Index 0 = Sunday. */
export const MYSTERY_BY_WEEKDAY: MysterySet[] = ["glorious", "joyful", "sorrowful", "glorious", "luminous", "sorrowful", "joyful"];

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type RosaryStep = { prayer: string; bead: "cross" | "large" | "small" | "none"; decade: number | null; count?: string };

export type RosaryStepKind = "creed" | "our-father" | "hail-mary" | "glory" | "closing";
export type RosaryStepData = { kind: RosaryStepKind; decade: number | null; index?: number; of?: number; fatima?: boolean };

/** Language-independent steps of a five-decade Rosary (pages supply the prayer names). */
export function rosaryStepData(fatimaPrayer: boolean): RosaryStepData[] {
  const steps: RosaryStepData[] = [{ kind: "creed", decade: null }, { kind: "our-father", decade: null }];
  for (let i = 1; i <= 3; i++) steps.push({ kind: "hail-mary", decade: null, index: i, of: 3 });
  steps.push({ kind: "glory", decade: null });
  for (let d = 1; d <= 5; d++) {
    steps.push({ kind: "our-father", decade: d });
    for (let i = 1; i <= 10; i++) steps.push({ kind: "hail-mary", decade: d, index: i, of: 10 });
    steps.push({ kind: "glory", decade: d, fatima: fatimaPrayer });
  }
  steps.push({ kind: "closing", decade: null });
  return steps;
}

/** The steps of a five-decade Rosary, in order. */
export function rosarySteps(set: MysterySet, fatimaPrayer: boolean): RosaryStep[] {
  const steps: RosaryStep[] = [
    { prayer: "Sign of the Cross and the Apostles' Creed", bead: "cross", decade: null },
    { prayer: "Our Father", bead: "large", decade: null },
    ...[1, 2, 3].map((i) => ({ prayer: "Hail Mary (for faith, hope and charity)", bead: "small" as const, decade: null, count: `${i} of 3` })),
    { prayer: "Glory Be", bead: "none", decade: null },
  ];
  MYSTERIES[set].items.forEach((mystery, d) => {
    steps.push({ prayer: `${d + 1}${["st", "nd", "rd", "th", "th"][d]} mystery: ${mystery} – Our Father`, bead: "large", decade: d + 1 });
    for (let i = 1; i <= 10; i++) steps.push({ prayer: "Hail Mary", bead: "small", decade: d + 1, count: `${i} of 10` });
    steps.push({ prayer: fatimaPrayer ? "Glory Be and the Fatima Prayer" : "Glory Be", bead: "none", decade: d + 1 });
  });
  steps.push({ prayer: "Hail, Holy Queen and the closing prayer", bead: "none", decade: null });
  return steps;
}

/* ---------------- Tithe ---------------- */

export const PAY_PERIODS = [
  { id: "weekly", label: "Weekly", perYear: 52 },
  { id: "biweekly", label: "Every two weeks", perYear: 26 },
  { id: "semimonthly", label: "Twice a month", perYear: 24 },
  { id: "monthly", label: "Monthly", perYear: 12 },
  { id: "annual", label: "Yearly", perYear: 1 },
] as const;

export type PayPeriod = (typeof PAY_PERIODS)[number]["id"];

/** Tithe per period and per year on an income given for one pay period. */
export function tithe(incomePerPeriod: number, period: PayPeriod, percent = 10) {
  const p = PAY_PERIODS.find((x) => x.id === period);
  if (!p || !(incomePerPeriod >= 0) || !(percent > 0 && percent <= 100)) return null;
  const annual = incomePerPeriod * p.perYear * (percent / 100);
  return { perPeriod: incomePerPeriod * (percent / 100), annual, monthly: annual / 12, weekly: annual / 52 };
}
