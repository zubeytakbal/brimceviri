import type { YMD } from "./calendars";
import { addDaysYmd, isoWeekStart, ymdToMs } from "./dateMath";

/** ISO haftasının tarih aralığı, dile göre: "5 Ekim – 11 Ekim 2026". */
export function weekRangeText(intlLocale: string, year: number, week: number) {
  const start = isoWeekStart(year, week);
  const end = addDaysYmd(start, 6);
  const fmt = (d: YMD, withYear: boolean) =>
    new Intl.DateTimeFormat(intlLocale, { timeZone: "UTC", day: "numeric", month: "long", ...(withYear ? { year: "numeric" } : {}) }).format(new Date(ymdToMs(d)));
  return `${fmt(start, start.year !== end.year)} – ${fmt(end, true)}`;
}
