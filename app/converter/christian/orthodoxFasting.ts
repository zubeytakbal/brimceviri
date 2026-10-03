// Orthodox fasting calendar simulation. Language-independent: labels are ids,
// pages translate them. Fixed rules of the Typikon only; which foods are
// allowed on a given day differs between local churches and is not modelled.
import type { YMD } from "../time/calendars";
import { addDaysYmd, diffDays, weekdayOf } from "../time/dateMath";
import { orthodoxEaster } from "./christianCalc";

/**
 * Old calendar (Julian): Russia, Serbia, Georgia, Jerusalem, Mount Athos.
 * New calendar (Revised Julian): Constantinople, Greece, Romania, Bulgaria,
 * Cyprus, Antioch, Alexandria, OCA. Both keep the same (Julian) Pascha.
 */
export type ChurchCalendar = "old" | "new";

/** The Julian lag is 13 days between 1 March 1900 and 28 February 2100. */
export const FASTING_MIN_YEAR = 1901;
export const FASTING_MAX_YEAR = 2099;
const JULIAN_LAG = 13;

export type FastKind =
  | "fast-free" // no fasting, Wednesday and Friday included
  | "cheesefare" // meat is not eaten, Wednesday and Friday relaxed
  | "strict" // single strict fast days and Holy Week
  | "great-lent"
  | "apostles"
  | "dormition"
  | "nativity"
  | "wednesday-friday"
  | "none";

export type FastPeriodId =
  | "svyatki"
  | "theophany-eve"
  | "publican-pharisee"
  | "cheesefare"
  | "great-lent"
  | "holy-week"
  | "bright-week"
  | "trinity-week"
  | "apostles"
  | "dormition"
  | "beheading"
  | "elevation"
  | "nativity";

export type FastPeriod = { id: FastPeriodId; kind: FastKind; start: YMD; end: YMD; days: number };

/** Gregorian date of a fixed church date in the given calendar. */
export function churchDate(year: number, month: number, day: number, calendar: ChurchCalendar): YMD {
  const d = { year, month, day };
  return calendar === "old" ? addDaysYmd(d, JULIAN_LAG) : d;
}

const period = (id: FastPeriodId, kind: FastKind, start: YMD, end: YMD): FastPeriod => ({ id, kind, start, end, days: diffDays(start, end) + 1 });

/** All fasts and fast-free periods of the church year that contains Pascha of `year`. */
export function fastingPeriods(year: number, calendar: ChurchCalendar): FastPeriod[] | null {
  if (!(Number.isInteger(year) && year >= FASTING_MIN_YEAR && year <= FASTING_MAX_YEAR)) return null;
  const p = orthodoxEaster(year)!;
  const at = (offset: number) => addDaysYmd(p, offset);
  const fixed = (m: number, d: number) => churchDate(year, m, d, calendar);
  const list: FastPeriod[] = [
    period("svyatki", "fast-free", fixed(1, 1), fixed(1, 4)),
    period("theophany-eve", "strict", fixed(1, 5), fixed(1, 5)),
    period("publican-pharisee", "fast-free", at(-69), at(-64)),
    period("cheesefare", "cheesefare", at(-55), at(-49)),
    period("great-lent", "great-lent", at(-48), at(-7)),
    period("holy-week", "strict", at(-6), at(-1)),
    period("bright-week", "fast-free", at(1), at(6)),
    period("trinity-week", "fast-free", at(50), at(55)),
  ];
  // Apostles' Fast: Monday after All Saints' Sunday to the eve of Sts Peter and Paul (29 June).
  const apostlesEnd = fixed(6, 28);
  if (diffDays(at(57), apostlesEnd) >= 0) list.push(period("apostles", "apostles", at(57), apostlesEnd));
  list.push(
    period("dormition", "dormition", fixed(8, 1), fixed(8, 14)),
    period("beheading", "strict", fixed(8, 29), fixed(8, 29)),
    period("elevation", "strict", fixed(9, 14), fixed(9, 14)),
    period("nativity", "nativity", fixed(11, 15), fixed(12, 24)),
    period("svyatki", "fast-free", fixed(12, 25), fixed(12, 31)),
  );
  return list;
}

/** Length of the Apostles' Fast in days (0 when Pascha is so late that it disappears). */
export function apostlesFastDays(year: number, calendar: ChurchCalendar) {
  return fastingPeriods(year, calendar)?.find((x) => x.id === "apostles")?.days ?? 0;
}

const PRIORITY: FastKind[] = ["fast-free", "cheesefare", "strict", "great-lent", "apostles", "dormition", "nativity"];

export type DayStatus = { kind: FastKind; period: FastPeriodId | null; weekday: number };

/** Fasting status of a Gregorian date. */
export function fastingDay(date: YMD, calendar: ChurchCalendar): DayStatus | null {
  const lists = [date.year - 1, date.year, date.year + 1].map((y) => (y >= FASTING_MIN_YEAR && y <= FASTING_MAX_YEAR ? fastingPeriods(y, calendar) : []));
  if (!lists[1]) return null;
  const hits = lists.flatMap((l) => l ?? []).filter((x) => diffDays(x.start, date) >= 0 && diffDays(date, x.end) >= 0);
  const weekday = weekdayOf(date);
  hits.sort((a, b) => PRIORITY.indexOf(a.kind) - PRIORITY.indexOf(b.kind));
  if (hits.length) return { kind: hits[0].kind, period: hits[0].id, weekday };
  if (weekday === 3 || weekday === 5) return { kind: "wednesday-friday", period: null, weekday };
  return { kind: "none", period: null, weekday };
}

const MULTI_DAY: FastPeriodId[] = ["great-lent", "apostles", "dormition", "nativity"];

/** The next multi-day fast that starts after `date`. */
export function nextFast(date: YMD, calendar: ChurchCalendar) {
  const all = [date.year, date.year + 1]
    .filter((y) => y <= FASTING_MAX_YEAR)
    .flatMap((y) => fastingPeriods(y, calendar) ?? [])
    .filter((x) => MULTI_DAY.includes(x.id) && diffDays(date, x.start) > 0)
    .sort((a, b) => diffDays(b.start, a.start));
  return all[0] ?? null;
}

/** Count of fast days (any kind except fast-free, cheesefare and none) in a Gregorian year. */
export function fastDaysInYear(year: number, calendar: ChurchCalendar) {
  let n = 0;
  for (let d = { year, month: 1, day: 1 }; d.year === year; d = addDaysYmd(d, 1)) {
    const s = fastingDay(d, calendar);
    if (s && s.kind !== "fast-free" && s.kind !== "cheesefare" && s.kind !== "none") n++;
  }
  return n;
}

/* ---------------- Julian ↔ Gregorian ---------------- */

/** Julian date → Gregorian (valid for any date in FASTING range). */
export function julianToGregorian(j: YMD): YMD {
  return addDaysYmd(j, JULIAN_LAG);
}

export function gregorianToJulian(g: YMD): YMD {
  return addDaysYmd(g, -JULIAN_LAG);
}
