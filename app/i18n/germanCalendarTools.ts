// Deutsche Kalender-Werkzeuge: gemeinsame Links und Brückentage.
import type { YMD } from "../converter/time/calendars";
import { addDaysYmd, weekdayOf } from "../converter/time/dateMath";
import { stateHolidays, type StateCode } from "../converter/time/germanHolidays";

export const germanCalendarLinks = [
  { href: "/de/kalenderwoche", label: "Aktuelle Kalenderwoche" },
  { href: "/de/feiertage", label: "Feiertage nach Bundesland" },
  { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" },
  { href: "/de/tagerechner", label: "Tagerechner" },
  { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
  { href: "/de/weltuhr", label: "Weltuhr" },
  { href: "/de/altersrechner", label: "Altersrechner" },
  { href: "/de/schwangerschaftswochen-rechner", label: "Schwangerschaftswochen-Rechner" },
];

export function calendarRelated(exclude: string) {
  return germanCalendarLinks.filter((l) => l.href !== exclude);
}

export type Brueckentag = { holiday: string; holidayDate: YMD; bridge: YMD; freeDays: number };

/** Feiertage am Dienstag oder Donnerstag: ein Urlaubstag ergibt vier freie Tage am Stück. */
export function brueckentage(state: StateCode, year: number): Brueckentag[] {
  const result: Brueckentag[] = [];
  for (const h of stateHolidays(state, year)) {
    const w = weekdayOf(h.date);
    if (w === 2) result.push({ holiday: h.name, holidayDate: h.date, bridge: addDaysYmd(h.date, -1), freeDays: 4 });
    if (w === 4) result.push({ holiday: h.name, holidayDate: h.date, bridge: addDaysYmd(h.date, 1), freeDays: 4 });
  }
  return result;
}
