// Tarih hesaplari: gun farki, gun/ay ekleme, ISO hafta, is gunu. Tum hesaplar UTC takvim gunu uzerinden.
import type { YMD } from "./calendars";

const DAY = 86400000;

export function ymdToMs({ year, month, day }: YMD) {
  const date = new Date(Date.UTC(2000, month - 1, day));
  date.setUTCFullYear(year);
  return date.getTime();
}

export function msToYmd(ms: number): YMD {
  const date = new Date(ms);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

export function ymdKey({ year, month, day }: YMD) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseYmd(value: string): YMD | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  return ymdKey(msToYmd(ymdToMs(date))) === value ? date : null;
}

export function addDaysYmd(date: YMD, days: number): YMD {
  return msToYmd(ymdToMs(date) + days * DAY);
}

export function diffDays(a: YMD, b: YMD) {
  return Math.round((ymdToMs(b) - ymdToMs(a)) / DAY);
}

/** 0 = pazar ... 6 = cumartesi */
export function weekdayOf(date: YMD) {
  return new Date(ymdToMs(date)).getUTCDay();
}

export function isWeekend(date: YMD) {
  const w = weekdayOf(date);
  return w === 0 || w === 6;
}

export function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Ay/yil ekleme: ayin son gunu tasarsa ayin son gunune sabitlenir (31 Ocak + 1 ay = 28/29 Subat). */
export function addMonthsYmd(date: YMD, months: number): YMD {
  const total = date.year * 12 + (date.month - 1) + months;
  const year = Math.floor(total / 12);
  const month = (total % 12) + 1;
  return { year, month, day: Math.min(date.day, daysInMonth(year, month)) };
}

/** Iki tarih arasi yil/ay/gun (a <= b varsayilir; degilse yer degistirir). */
export function diffYmd(a: YMD, b: YMD) {
  const [from, to] = ymdToMs(a) <= ymdToMs(b) ? [a, b] : [b, a];
  let months = (to.year - from.year) * 12 + (to.month - from.month);
  if (ymdToMs(addMonthsYmd(from, months)) > ymdToMs(to)) months -= 1;
  // Ay sonu sabitlemesi nedeniyle bir ay daha geriye gitmek gerekebilir.
  while (months > 0 && ymdToMs(addMonthsYmd(from, months)) > ymdToMs(to)) months -= 1;
  const days = diffDays(addMonthsYmd(from, months), to);
  return { years: Math.floor(months / 12), months: months % 12, days, totalMonths: months };
}

export function dayOfYear(date: YMD) {
  return diffDays({ year: date.year, month: 1, day: 1 }, date) + 1;
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** ISO 8601 hafta numarasi (pazartesi baslar; yilin ilk persembesini iceren hafta 1. haftadir). */
export function isoWeek(date: YMD) {
  const weekday = (weekdayOf(date) + 6) % 7; // 0 = pazartesi
  const thursday = addDaysYmd(date, 3 - weekday);
  const week = Math.floor((dayOfYear(thursday) - 1) / 7) + 1;
  return { year: thursday.year, week };
}

export function isoWeekStart(year: number, week: number): YMD {
  const jan4 = { year, month: 1, day: 4 };
  const monday = addDaysYmd(jan4, -((weekdayOf(jan4) + 6) % 7));
  return addDaysYmd(monday, (week - 1) * 7);
}

export function isoWeeksInYear(year: number) {
  return isoWeek({ year, month: 12, day: 28 }).week;
}

/** ABD usulu hafta: pazar baslar, 1 Ocak'i iceren hafta 1. haftadir. */
export function usWeek(date: YMD) {
  const jan1 = { year: date.year, month: 1, day: 1 };
  return Math.floor((dayOfYear(date) - 1 + weekdayOf(jan1)) / 7) + 1;
}

export type DayStatus = "work" | "weekend" | "holiday" | "half";

export type HolidayLookup = (date: YMD) => { kind: "full" | "half"; name: string } | undefined;

/** saturdayWork: cumartesi calisilan isyerleri (yalnizca pazar hafta sonu). */
export type WorkWeek = { saturdayWork?: boolean };

export function dayStatus(date: YMD, lookup: HolidayLookup, week: WorkWeek = {}): DayStatus {
  const w = weekdayOf(date);
  if (w === 0 || (w === 6 && !week.saturdayWork)) return "weekend";
  const holiday = lookup(date);
  if (!holiday) return "work";
  return holiday.kind === "full" ? "holiday" : "half";
}

/** [start, end] araligindaki gunleri sayar (ikisi dahil). start > end ise bos. */
export function countDays(start: YMD, end: YMD, lookup: HolidayLookup, week: WorkWeek = {}) {
  const result = { total: 0, work: 0, half: 0, weekend: 0, holiday: 0 };
  const days = diffDays(start, end);
  for (let i = 0; i <= days; i += 1) {
    const status = dayStatus(addDaysYmd(start, i), lookup, week);
    result.total += 1;
    if (status === "work") result.work += 1;
    else if (status === "half") {
      result.work += 1;
      result.half += 1;
    } else if (status === "weekend") result.weekend += 1;
    else result.holiday += 1;
  }
  return result;
}

/** Baslangictan sonraki n. is gunu (n < 0 ise geriye). Yarim gunler is gunu sayilir. */
export function addBusinessDays(start: YMD, n: number, lookup: HolidayLookup, week: WorkWeek = {}) {
  const step = n < 0 ? -1 : 1;
  let remaining = Math.abs(n);
  let current = start;
  const skipped: YMD[] = [];
  while (remaining > 0) {
    current = addDaysYmd(current, step);
    const status = dayStatus(current, lookup, week);
    if (status === "work" || status === "half") remaining -= 1;
    else if (status === "holiday") skipped.push(current);
  }
  return { date: current, skippedHolidays: skipped };
}

/** Ayin n. X gunu (weekday: 0 = pazar); nth = -1 ayin son X gunu. */
export function nthWeekdayYmd(year: number, month: number, weekday: number, nth: number): YMD {
  if (nth < 0) {
    const last = { year, month, day: daysInMonth(year, month) };
    return addDaysYmd(last, -((weekdayOf(last) - weekday + 7) % 7));
  }
  const first = weekdayOf({ year, month, day: 1 });
  return { year, month, day: 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7 };
}

const DATE_LOCALES = { tr: "tr-TR", en: "en-US" } as const;

export function formatYmd(date: YMD, lang: "tr" | "en", withWeekday = true) {
  return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withWeekday ? { weekday: "long" } : {}),
    timeZone: "UTC",
  }).format(new Date(ymdToMs(date)));
}

export function formatYmdParts(date: YMD, lang: "tr" | "en", options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(DATE_LOCALES[lang], { ...options, timeZone: "UTC" }).format(new Date(ymdToMs(date)));
}
