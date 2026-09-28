// Gesetzliche Feiertage in Deutschland nach Bundesland (Stand 2026, geprüft mit DGB-Übersicht,
// Landesgesetzen und dem Bayerischen Landesamt für Statistik). Bewegliche Feiertage werden über
// das Osterdatum (Gaußsche Osterformel, gregorianisch) berechnet.
import type { YMD } from "./calendars";
import { addDaysYmd, weekdayOf, ymdKey, type HolidayLookup } from "./dateMath";

export type StateCode = "bw" | "by" | "be" | "bb" | "hb" | "hh" | "he" | "mv" | "ni" | "nw" | "rp" | "sl" | "sn" | "st" | "sh" | "th";

export type GermanState = { code: StateCode; slug: string; name: string; short: string };

export const GERMAN_STATES: GermanState[] = [
  { code: "bw", slug: "baden-wuerttemberg", name: "Baden-Württemberg", short: "BW" },
  { code: "by", slug: "bayern", name: "Bayern", short: "BY" },
  { code: "be", slug: "berlin", name: "Berlin", short: "BE" },
  { code: "bb", slug: "brandenburg", name: "Brandenburg", short: "BB" },
  { code: "hb", slug: "bremen", name: "Bremen", short: "HB" },
  { code: "hh", slug: "hamburg", name: "Hamburg", short: "HH" },
  { code: "he", slug: "hessen", name: "Hessen", short: "HE" },
  { code: "mv", slug: "mecklenburg-vorpommern", name: "Mecklenburg-Vorpommern", short: "MV" },
  { code: "ni", slug: "niedersachsen", name: "Niedersachsen", short: "NI" },
  { code: "nw", slug: "nordrhein-westfalen", name: "Nordrhein-Westfalen", short: "NW" },
  { code: "rp", slug: "rheinland-pfalz", name: "Rheinland-Pfalz", short: "RP" },
  { code: "sl", slug: "saarland", name: "Saarland", short: "SL" },
  { code: "sn", slug: "sachsen", name: "Sachsen", short: "SN" },
  { code: "st", slug: "sachsen-anhalt", name: "Sachsen-Anhalt", short: "ST" },
  { code: "sh", slug: "schleswig-holstein", name: "Schleswig-Holstein", short: "SH" },
  { code: "th", slug: "thueringen", name: "Thüringen", short: "TH" },
];

export const ALL_STATES = GERMAN_STATES.map((s) => s.code);

export function findGermanState(slug: string) {
  return GERMAN_STATES.find((s) => s.slug === slug) ?? null;
}

export type GermanHoliday = {
  date: YMD;
  id: string;
  name: string;
  /** Bundesländer, in denen der Tag landesweit gesetzlicher Feiertag ist. */
  states: StateCode[];
  /** Bundesländer, in denen er nur in einem Teil der Gemeinden gilt. */
  partialStates?: StateCode[];
  /** Hinweis zur regionalen Geltung. */
  note?: string;
  /** Fällt immer auf einen Sonntag (nur statistisch relevant). */
  sunday?: boolean;
};

/** Ostersonntag (anonyme gregorianische Osterformel). */
export function easterSunday(year: number): YMD {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { year, month, day };
}

/** Buß- und Bettag: Mittwoch vor dem 23. November. */
export function bussUndBettag(year: number): YMD {
  const nov22 = { year, month: 11, day: 22 };
  const back = (weekdayOf(nov22) - 3 + 7) % 7;
  return addDaysYmd(nov22, -back);
}

const d = (year: number, month: number, day: number): YMD => ({ year, month, day });

export function germanHolidays(year: number): GermanHoliday[] {
  const easter = easterSunday(year);
  const e = (offset: number) => addDaysYmd(easter, offset);
  const list: GermanHoliday[] = [
    { date: d(year, 1, 1), id: "neujahr", name: "Neujahr", states: ALL_STATES },
    { date: d(year, 1, 6), id: "heilige-drei-koenige", name: "Heilige Drei Könige", states: ["bw", "by", "st"] },
    { date: e(-2), id: "karfreitag", name: "Karfreitag", states: ALL_STATES },
    { date: easter, id: "ostersonntag", name: "Ostersonntag", states: ["bb"], sunday: true },
    { date: e(1), id: "ostermontag", name: "Ostermontag", states: ALL_STATES },
    { date: d(year, 5, 1), id: "tag-der-arbeit", name: "Tag der Arbeit", states: ALL_STATES },
    { date: e(39), id: "christi-himmelfahrt", name: "Christi Himmelfahrt", states: ALL_STATES },
    { date: e(49), id: "pfingstsonntag", name: "Pfingstsonntag", states: ["bb"], sunday: true },
    { date: e(50), id: "pfingstmontag", name: "Pfingstmontag", states: ALL_STATES },
    {
      date: e(60),
      id: "fronleichnam",
      name: "Fronleichnam",
      states: ["bw", "by", "he", "nw", "rp", "sl"],
      partialStates: ["sn", "th"],
      note: "In Sachsen und Thüringen nur in einzelnen katholisch geprägten Gemeinden (etwa im sorbischen Siedlungsgebiet und im Eichsfeld).",
    },
    {
      date: d(year, 8, 15),
      id: "mariae-himmelfahrt",
      name: "Mariä Himmelfahrt",
      states: ["sl"],
      partialStates: ["by"],
      note: "In Bayern nur in Gemeinden mit überwiegend katholischer Bevölkerung (1.708 von 2.056 Gemeinden, Zensus 2022).",
    },
    { date: d(year, 10, 3), id: "tag-der-deutschen-einheit", name: "Tag der Deutschen Einheit", states: ALL_STATES },
    {
      date: d(year, 10, 31),
      id: "reformationstag",
      name: "Reformationstag",
      states: ["bb", "hb", "hh", "mv", "ni", "sn", "st", "sh", "th"],
    },
    { date: d(year, 11, 1), id: "allerheiligen", name: "Allerheiligen", states: ["bw", "by", "nw", "rp", "sl"] },
    { date: bussUndBettag(year), id: "buss-und-bettag", name: "Buß- und Bettag", states: ["sn"] },
    { date: d(year, 12, 25), id: "erster-weihnachtstag", name: "1. Weihnachtstag", states: ALL_STATES },
    { date: d(year, 12, 26), id: "zweiter-weihnachtstag", name: "2. Weihnachtstag", states: ALL_STATES },
  ];
  // Internationaler Frauentag: Berlin seit 2019, Mecklenburg-Vorpommern seit 2023.
  const frauentag: StateCode[] = [...(year >= 2019 ? (["be"] as StateCode[]) : []), ...(year >= 2023 ? (["mv"] as StateCode[]) : [])];
  if (frauentag.length) list.push({ date: d(year, 3, 8), id: "frauentag", name: "Internationaler Frauentag", states: frauentag });
  // Weltkindertag in Thüringen seit 2019.
  if (year >= 2019) list.push({ date: d(year, 9, 20), id: "weltkindertag", name: "Weltkindertag", states: ["th"] });
  // Einmaliger Feiertag in Berlin zum 80. Jahrestag des Kriegsendes.
  if (year === 2025) list.push({ date: d(2025, 5, 8), id: "tag-der-befreiung", name: "Tag der Befreiung (einmalig)", states: ["be"] });
  // Augsburger Hohes Friedensfest: nur im Stadtgebiet Augsburg.
  list.push({
    date: d(year, 8, 8),
    id: "augsburger-friedensfest",
    name: "Augsburger Hohes Friedensfest",
    states: [],
    partialStates: ["by"],
    note: "Gesetzlicher Feiertag nur im Stadtgebiet Augsburg.",
  });
  return list.sort((a, b) => ymdKey(a.date).localeCompare(ymdKey(b.date)));
}

const cache = new Map<number, GermanHoliday[]>();
export function germanHolidaysCached(year: number) {
  let list = cache.get(year);
  if (!list) {
    list = germanHolidays(year);
    cache.set(year, list);
  }
  return list;
}

/** Feiertage eines Bundeslands (ohne reine Sonntagsfeiertage, optional mit regional geltenden). */
export function stateHolidays(state: StateCode, year: number, options: { includePartial?: boolean; includeSundays?: boolean } = {}) {
  return germanHolidaysCached(year).filter(
    (h) =>
      (h.states.includes(state) || (options.includePartial && h.partialStates?.includes(state))) &&
      (options.includeSundays || !h.sunday)
  );
}

/** Lookup für die Arbeitstage-Berechnung (dateMath.countDays). */
export function germanHolidayLookup(state: StateCode, fromYear: number, toYear: number, includePartial = false): HolidayLookup {
  const map = new Map<string, string>();
  for (let y = fromYear; y <= toYear; y += 1) {
    for (const h of stateHolidays(state, y, { includePartial })) map.set(ymdKey(h.date), h.name);
  }
  return (date: YMD) => {
    const name = map.get(ymdKey(date));
    return name ? { kind: "full" as const, name } : undefined;
  };
}

export const GERMAN_HOLIDAY_YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const;
