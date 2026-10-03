// Roman Catholic liturgical calendar (General Roman Calendar, universal dates).
// Language-independent: season ids, colours and cycles; pages translate them.
// Saints' memorials have their own colours and are not modelled; solemnities
// and feasts that fall on fixed rules are.
import type { YMD } from "../time/calendars";
import { addDaysYmd, diffDays, weekdayOf } from "../time/dateMath";
import { adventSunday, EASTER_MAX_YEAR, EASTER_MIN_YEAR, westernEaster } from "./christianCalc";

export type LiturgicalSeason = "advent" | "christmas" | "ordinary" | "lent" | "triduum" | "easter";
export type LiturgicalColor = "violet" | "rose" | "white" | "green" | "red";
export type CelebrationId =
  | "christmas"
  | "mary-mother-of-god"
  | "epiphany"
  | "baptism"
  | "ash-wednesday"
  | "joseph"
  | "annunciation"
  | "palm-sunday"
  | "holy-thursday"
  | "good-friday"
  | "holy-saturday"
  | "easter"
  | "divine-mercy"
  | "ascension"
  | "pentecost"
  | "trinity"
  | "corpus-christi"
  | "sacred-heart"
  | "peter-paul"
  | "assumption"
  | "all-saints"
  | "all-souls"
  | "christ-the-king"
  | "immaculate-conception"
  | "gaudete"
  | "laetare";

export type LiturgicalDay = {
  season: LiturgicalSeason;
  color: LiturgicalColor;
  /** Week of the season (Ordinary Time: 1–34; Advent 1–4; Lent 1–5; Easter 2–7). */
  week: number | null;
  celebration: CelebrationId | null;
  /** Sunday lectionary cycle of the liturgical year. */
  sundayCycle: "A" | "B" | "C";
  /** Weekday lectionary cycle (Ordinary Time). */
  weekdayCycle: "I" | "II";
  /** Civil year in which this liturgical year began (First Sunday of Advent). */
  liturgicalYearStart: number;
};

/** Baptism of the Lord: the Sunday after 6 January (universal calendar). */
export function baptismOfTheLord(year: number): YMD {
  const jan6 = { year, month: 1, day: 6 };
  return addDaysYmd(jan6, 7 - weekdayOf(jan6) || 7);
}

const sundayOnOrBefore = (d: YMD) => addDaysYmd(d, -weekdayOf(d));

export function liturgicalDay(date: YMD): LiturgicalDay | null {
  const { year } = date;
  if (!(year > EASTER_MIN_YEAR && year < EASTER_MAX_YEAR)) return null;
  const advent = adventSunday(year);
  const startYear = diffDays(advent, date) >= 0 ? year : year - 1;
  const endYear = startYear + 1;
  const sundayCycle = (["C", "A", "B"] as const)[endYear % 3];
  const weekdayCycle = endYear % 2 === 1 ? "I" : "II";
  const base = { sundayCycle, weekdayCycle, liturgicalYearStart: startYear } as const;

  const easter = westernEaster(year)!;
  const e = (n: number) => addDaysYmd(easter, n);
  const on = (d: YMD) => diffDays(d, date) === 0;
  const between = (a: YMD, b: YMD) => diffDays(a, date) >= 0 && diffDays(date, b) >= 0;
  const fixed = (m: number, d: number) => ({ year, month: m, day: d });
  const isSunday = weekdayOf(date) === 0;
  const day = (season: LiturgicalSeason, color: LiturgicalColor, week: number | null, celebration: CelebrationId | null = null): LiturgicalDay => ({
    season,
    color,
    week,
    celebration,
    ...base,
  });

  // Christmas season: 25 December – Baptism of the Lord.
  const baptism = baptismOfTheLord(year);
  if (diffDays(date, baptism) >= 0 && date.month === 1) {
    const c: CelebrationId | null = on(fixed(1, 1)) ? "mary-mother-of-god" : on(fixed(1, 6)) ? "epiphany" : on(baptism) ? "baptism" : null;
    return day("christmas", "white", null, c);
  }
  if (diffDays(fixed(12, 25), date) >= 0) return day("christmas", "white", null, on(fixed(12, 25)) ? "christmas" : null);

  // Advent
  if (diffDays(advent, date) >= 0) {
    const week = Math.floor(diffDays(advent, date) / 7) + 1;
    if (on(fixed(12, 8)) && !isSunday) return day("advent", "white", week, "immaculate-conception");
    if (week === 3 && isSunday) return day("advent", "rose", week, "gaudete");
    return day("advent", "violet", week);
  }

  // Lent, Holy Week and Triduum
  const ash = e(-46);
  if (between(ash, e(-4))) {
    const week = diffDays(ash, date) < 4 ? 0 : Math.floor((diffDays(e(-42), date)) / 7) + 1;
    if (on(ash)) return day("lent", "violet", 0, "ash-wednesday");
    if (on(e(-7))) return day("lent", "red", 6, "palm-sunday");
    if (on(e(-21))) return day("lent", "rose", 4, "laetare");
    if (on(fixed(3, 19)) && !isSunday && diffDays(date, e(-7)) > 0) return day("lent", "white", week, "joseph");
    if (on(fixed(3, 25)) && !isSunday && diffDays(date, e(-7)) > 0) return day("lent", "white", week, "annunciation");
    return day("lent", "violet", week <= 5 ? week : 6);
  }
  if (on(e(-3))) return day("triduum", "white", null, "holy-thursday");
  if (on(e(-2))) return day("triduum", "red", null, "good-friday");
  if (on(e(-1))) return day("triduum", "white", null, "holy-saturday");

  // Easter season: Easter Sunday – Pentecost
  if (between(easter, e(49))) {
    const week = Math.floor(diffDays(easter, date) / 7) + 1;
    const c: CelebrationId | null = on(easter) ? "easter" : on(e(7)) ? "divine-mercy" : on(e(39)) ? "ascension" : on(e(49)) ? "pentecost" : null;
    return day("easter", on(e(49)) ? "red" : "white", week, c);
  }

  // Ordinary Time
  const christKing = addDaysYmd(advent, -7);
  const sunday = sundayOnOrBefore(date);
  const inFirstPart = diffDays(date, ash) > 0;
  const week = inFirstPart ? diffDays(baptism, sunday) / 7 + 1 : 34 - diffDays(sunday, christKing) / 7;
  const solemnity: Array<[YMD, CelebrationId, LiturgicalColor]> = [
    [e(56), "trinity", "white"],
    [e(60), "corpus-christi", "white"],
    [e(68), "sacred-heart", "white"],
    [fixed(6, 29), "peter-paul", "red"],
    [fixed(8, 15), "assumption", "white"],
    [fixed(11, 1), "all-saints", "white"],
    [fixed(11, 2), "all-souls", "violet"],
    [christKing, "christ-the-king", "white"],
    [fixed(3, 19), "joseph", "white"],
    [fixed(3, 25), "annunciation", "white"],
  ];
  for (const [d, id, color] of solemnity) if (on(d)) return day("ordinary", color, week, id);
  return day("ordinary", "green", week);
}
