// Gesetzliche Feiertage in Österreich (§ 7 Abs. 2 Arbeitsruhegesetz) und die Tage der Landespatrone.
// Die Landespatrone sind keine gesetzlichen Feiertage: kein Anspruch auf Arbeitsruhe, oft aber
// schulfrei und im Landesdienst frei. Bewegliche Feiertage folgen aus dem Osterdatum.
import type { YMD } from "./calendars";
import { addDaysYmd, weekdayOf } from "./dateMath";
import { easterSunday } from "./germanHolidays";

export type AustrianHoliday = { id: string; name: string; date: YMD };

export function austrianHolidays(year: number): AustrianHoliday[] {
  const easter = easterSunday(year);
  const d = (month: number, day: number): YMD => ({ year, month, day });
  return [
    { id: "neujahr", name: "Neujahr", date: d(1, 1) },
    { id: "heilige-drei-koenige", name: "Heilige Drei Könige", date: d(1, 6) },
    { id: "ostermontag", name: "Ostermontag", date: addDaysYmd(easter, 1) },
    { id: "staatsfeiertag", name: "Staatsfeiertag", date: d(5, 1) },
    { id: "christi-himmelfahrt", name: "Christi Himmelfahrt", date: addDaysYmd(easter, 39) },
    { id: "pfingstmontag", name: "Pfingstmontag", date: addDaysYmd(easter, 50) },
    { id: "fronleichnam", name: "Fronleichnam", date: addDaysYmd(easter, 60) },
    { id: "mariae-himmelfahrt", name: "Mariä Himmelfahrt", date: d(8, 15) },
    { id: "nationalfeiertag", name: "Nationalfeiertag", date: d(10, 26) },
    { id: "allerheiligen", name: "Allerheiligen", date: d(11, 1) },
    { id: "mariae-empfaengnis", name: "Mariä Empfängnis", date: d(12, 8) },
    { id: "christtag", name: "Christtag", date: d(12, 25) },
    { id: "stefanitag", name: "Stefanitag", date: d(12, 26) },
  ].sort((a, b) => a.date.month - b.date.month || a.date.day - b.date.day);
}

export type Landespatron = { id: string; name: string; month: number; day: number; states: string[] };

export const LANDESPATRONE: Landespatron[] = [
  { id: "josef", name: "Hl. Josef", month: 3, day: 19, states: ["Kärnten", "Steiermark", "Tirol", "Vorarlberg"] },
  { id: "florian", name: "Hl. Florian", month: 5, day: 4, states: ["Oberösterreich"] },
  { id: "rupert", name: "Hl. Rupert", month: 9, day: 24, states: ["Salzburg"] },
  { id: "volksabstimmung", name: "Tag der Volksabstimmung", month: 10, day: 10, states: ["Kärnten"] },
  { id: "martin", name: "Hl. Martin", month: 11, day: 11, states: ["Burgenland"] },
  { id: "leopold", name: "Hl. Leopold", month: 11, day: 15, states: ["Wien", "Niederösterreich"] },
];

export type Fenstertag = { holiday: string; holidayDate: YMD; bridge: YMD };

/** Feiertage am Dienstag oder Donnerstag: der Tag dazwischen ist ein Fenstertag. */
export function fenstertage(year: number): Fenstertag[] {
  const result: Fenstertag[] = [];
  for (const h of austrianHolidays(year)) {
    const w = weekdayOf(h.date);
    if (w === 2) result.push({ holiday: h.name, holidayDate: h.date, bridge: addDaysYmd(h.date, -1) });
    if (w === 4) result.push({ holiday: h.name, holidayDate: h.date, bridge: addDaysYmd(h.date, 1) });
  }
  return result;
}

/** Feiertage, die auf Montag bis Freitag fallen. */
export function weekdayHolidayCount(year: number) {
  return austrianHolidays(year).filter((h) => {
    const w = weekdayOf(h.date);
    return w >= 1 && w <= 5;
  }).length;
}
