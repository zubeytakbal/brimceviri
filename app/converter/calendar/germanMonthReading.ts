// Monatsseite: Wochentage und Arbeitstage aus demselben Kalender wie die Tabelle.
import { DE_MONATE } from "./deKalender";
import { countDays, daysInMonth, dayOfYear, isLeapYear, isWeekend, weekdayOf } from "../time/dateMath";
import type { YMD } from "../time/calendars";
import { weekdayDe } from "../time/germanDates";
import { GERMAN_STATES, germanHolidayLookup, type StateCode } from "../time/germanHolidays";

const WEEKDAYS = [1, 2, 3, 4, 5, 6, 0] as const;

const PLURAL: Record<number, [string, string]> = {
  0: ["Sonntag", "Sonntage"],
  1: ["Montag", "Montage"],
  2: ["Dienstag", "Dienstage"],
  3: ["Mittwoch", "Mittwoche"],
  4: ["Donnerstag", "Donnerstage"],
  5: ["Freitag", "Freitage"],
  6: ["Samstag", "Samstage"],
};

function arbeitstage(year: number, month: number, land: StateCode) {
  const lookup = germanHolidayLookup(land, year, year);
  return countDays(
    { year, month, day: 1 },
    { year, month, day: daysInMonth(year, month) },
    lookup,
  ).work;
}

function daysOf(year: number, month: number, weekday: number) {
  const out: number[] = [];
  for (let day = 1; day <= daysInMonth(year, month); day++) {
    if (weekdayOf({ year, month, day }) === weekday) out.push(day);
  }
  return out;
}

function joinDays(days: number[]) {
  const text = days.map((day) => `${day}.`);
  if (text.length <= 1) return text.join("");
  return `${text.slice(0, -1).join(", ")} und ${text[text.length - 1]}`;
}

export type GermanMonthReading = {
  heading: string;
  paragraphs: string[];
  rows: { label: string; value: string }[];
};

export function buildGermanMonthReading(year: number, month: number): GermanMonthReading {
  const name = DE_MONATE[month - 1];
  const stamp = `${name} ${year}`;
  const days = daysInMonth(year, month);
  const first: YMD = { year, month, day: 1 };
  const last: YMD = { year, month, day: days };
  const weekends = Array.from({ length: days }, (_, i) => i + 1).filter((day) =>
    isWeekend({ year, month, day }),
  ).length;
  const yearDays = isLeapYear(year) ? 366 : 365;
  const firstDoy = dayOfYear(first);
  const lastDoy = dayOfYear(last);

  const weekdayLines = WEEKDAYS.map((weekday) => {
    const dates = daysOf(year, month, weekday);
    const [one, many] = PLURAL[weekday];
    const single = dates.length === 1;
    const label = single ? one : many;
    return `${single ? "Der" : "Die"} ${label} im ${stamp} ${single ? "ist" : "sind"} der ${joinDays(dates)}`;
  });

  return {
    heading: `${stamp} in Zahlen`,
    paragraphs: [
      `${stamp} hat ${days} Tage, beginnt an einem ${weekdayDe(first)} und endet an einem ${weekdayDe(last)}. Der 1. ${name} ${year} ist der ${firstDoy}. Tag, der ${days}. ${name} der ${lastDoy}. von ${yearDays}.`,
      `${stamp} hat ${weekends} Samstage und Sonntage. ${weekdayLines.join(". ")}.`,
    ],
    rows: GERMAN_STATES.map((state) => ({
      label: state.name,
      value: `${arbeitstage(year, month, state.code)} Arbeitstage im ${stamp}`,
    })),
  };
}

export function germanMonthReadingPlain(year: number, month: number) {
  const reading = buildGermanMonthReading(year, month);
  return [reading.heading, ...reading.paragraphs, ...reading.rows.flatMap((row) => [row.label, row.value])].join(" ");
}
