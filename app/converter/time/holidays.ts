// Resmi tatil takvimleri: Turkiye (2429 sayili Kanun) ve ABD federal tatilleri (5 U.S.C. 6103),
// ayrica koprü gunu / uzun hafta sonu onerileri.
import { gregorianToHijri, type YMD } from "./calendars";
import { addDaysYmd, diffDays, isWeekend, nthWeekdayYmd, weekdayOf, ymdKey } from "./dateMath";

export type HolidayLang = "tr" | "en";

export type Holiday = {
  date: YMD;
  /** Tatil grubu (ayni bayramin gunleri ayni id'yi paylasir). */
  id: string;
  name: string;
  kind: "full" | "half";
  /** Bayram gunu sirasi (1., 2. ...); arefe icin 0. */
  dayIndex?: number;
  /** ABD: hafta sonuna denk gelen tatilin kaydirildigi gun. */
  observedFor?: YMD;
  /** Dini bayramlarda Diyanet takvimi henuz yayimlanmamis yillar. */
  estimated?: boolean;
};

/** Diyanet'in ilan ettigi takvimle Umm al-Qura hesabinin dogrulandigi son yil (tests/holidays.test.ts). */
export const DIYANET_VERIFIED_UNTIL = 2028;

export const HOLIDAY_YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const;

/** Verilen miladi aralikta Hicri ay/gunun denk geldigi tum tarihler. */
function hijriDatesBetween(start: YMD, days: number, hijriMonth: number, hijriDay: number) {
  const result: YMD[] = [];
  for (let i = 0; i < days; i += 1) {
    const date = addDaysYmd(start, i);
    const h = gregorianToHijri(date);
    if (h.month === hijriMonth && h.day === hijriDay) result.push(date);
  }
  return result;
}

const TR_FIXED: Array<{ month: number; day: number; id: string; name: string; kind: "full" | "half" }> = [
  { month: 1, day: 1, id: "yilbasi", name: "Yılbaşı", kind: "full" },
  { month: 4, day: 23, id: "23-nisan", name: "Ulusal Egemenlik ve Çocuk Bayramı", kind: "full" },
  { month: 5, day: 1, id: "1-mayis", name: "Emek ve Dayanışma Günü", kind: "full" },
  { month: 5, day: 19, id: "19-mayis", name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", kind: "full" },
  { month: 7, day: 15, id: "15-temmuz", name: "Demokrasi ve Millî Birlik Günü", kind: "full" },
  { month: 8, day: 30, id: "30-agustos", name: "Zafer Bayramı", kind: "full" },
  { month: 10, day: 28, id: "29-ekim", name: "Cumhuriyet Bayramı Arefesi", kind: "half" },
  { month: 10, day: 29, id: "29-ekim", name: "Cumhuriyet Bayramı", kind: "full" },
];

export function turkeyHolidays(year: number): Holiday[] {
  const list: Holiday[] = TR_FIXED.map((h) => ({
    date: { year, month: h.month, day: h.day },
    id: h.id,
    name: h.name,
    kind: h.kind,
    ...(h.id === "29-ekim" ? { dayIndex: h.kind === "half" ? 0 : 1 } : {}),
  }));
  // Bayramin arefesi ya da gunleri bir onceki yilin sonuna tasabilecegi icin aralik genis tutulur.
  const scanStart = { year: year - 1, month: 12, day: 25 };
  const scanDays = diffDays(scanStart, { year, month: 12, day: 31 }) + 2;
  const estimated = year > DIYANET_VERIFIED_UNTIL;
  const bayrams = [
    { id: "ramazan-bayrami", name: "Ramazan Bayramı", hijriMonth: 10, hijriDay: 1, days: 3 },
    { id: "kurban-bayrami", name: "Kurban Bayramı", hijriMonth: 12, hijriDay: 10, days: 4 },
  ];
  for (const bayram of bayrams) {
    for (const first of hijriDatesBetween(scanStart, scanDays, bayram.hijriMonth, bayram.hijriDay)) {
      list.push({ date: addDaysYmd(first, -1), id: bayram.id, name: `${bayram.name} Arefesi`, kind: "half", dayIndex: 0, ...(estimated ? { estimated } : {}) });
      for (let d = 0; d < bayram.days; d += 1) {
        list.push({ date: addDaysYmd(first, d), id: bayram.id, name: `${bayram.name} ${d + 1}. Gün`, kind: "full", dayIndex: d + 1, ...(estimated ? { estimated } : {}) });
      }
    }
  }
  return sortHolidays(list.filter((h) => h.date.year === year));
}

const US_RULES: Array<{ id: string; name: string; rule: { month: number; day: number } | { month: number; weekday: number; nth: number } }> = [
  { id: "new-years-day", name: "New Year's Day", rule: { month: 1, day: 1 } },
  { id: "mlk-day", name: "Martin Luther King Jr. Day", rule: { month: 1, weekday: 1, nth: 3 } },
  { id: "presidents-day", name: "Washington's Birthday (Presidents' Day)", rule: { month: 2, weekday: 1, nth: 3 } },
  { id: "memorial-day", name: "Memorial Day", rule: { month: 5, weekday: 1, nth: -1 } },
  { id: "juneteenth", name: "Juneteenth National Independence Day", rule: { month: 6, day: 19 } },
  { id: "independence-day", name: "Independence Day", rule: { month: 7, day: 4 } },
  { id: "labor-day", name: "Labor Day", rule: { month: 9, weekday: 1, nth: 1 } },
  { id: "columbus-day", name: "Columbus Day", rule: { month: 10, weekday: 1, nth: 2 } },
  { id: "veterans-day", name: "Veterans Day", rule: { month: 11, day: 11 } },
  { id: "thanksgiving", name: "Thanksgiving Day", rule: { month: 11, weekday: 4, nth: 4 } },
  { id: "christmas", name: "Christmas Day", rule: { month: 12, day: 25 } },
];

function usActualDate(year: number, rule: (typeof US_RULES)[number]["rule"]): YMD {
  return "day" in rule ? { year, month: rule.month, day: rule.day } : nthWeekdayYmd(year, rule.month, rule.weekday, rule.nth);
}

/** Sabit tarihli tatil cumartesiye denk gelirse cuma, pazara denk gelirse pazartesi tatil edilir. */
function usObserved(date: YMD): YMD {
  const w = weekdayOf(date);
  if (w === 6) return addDaysYmd(date, -1);
  if (w === 0) return addDaysYmd(date, 1);
  return date;
}

/** ABD federal tatilleri; date = calisanlarin tatil yaptigi (observed) gun. Yil disina tasan observed gunler o yila yazilir. */
export function usFederalHolidays(year: number): Holiday[] {
  const list: Holiday[] = [];
  for (const y of [year, year + 1]) {
    for (const h of US_RULES) {
      const actual = usActualDate(y, h.rule);
      const observed = "day" in h.rule ? usObserved(actual) : actual;
      if (observed.year !== year) continue;
      const shifted = ymdKey(observed) !== ymdKey(actual);
      list.push({ date: observed, id: h.id, name: h.name, kind: "full", ...(shifted ? { observedFor: actual } : {}) });
    }
  }
  return sortHolidays(list);
}

function sortHolidays(list: Holiday[]) {
  return list.sort((a, b) => ymdKey(a.date).localeCompare(ymdKey(b.date)));
}

/** Bugunku tatil listesinin gecerli oldugu ilk yil (TR: 15 Temmuz 2017; ABD: Juneteenth 2021). */
export const HOLIDAY_FIRST_YEAR: Record<HolidayLang, number> = { tr: 2017, en: 2021 };

const cache = new Map<string, Holiday[]>();

export function holidaysFor(lang: HolidayLang, year: number) {
  if (year < HOLIDAY_FIRST_YEAR[lang] || year > 2100) return [];
  const key = `${lang}-${year}`;
  let list = cache.get(key);
  if (!list) {
    list = lang === "tr" ? turkeyHolidays(year) : usFederalHolidays(year);
    cache.set(key, list);
  }
  return list;
}

/** Yil araliklarini kapsayan hizli arama (hesaplayicilar icin). */
export function holidayLookup(lang: HolidayLang, fromYear: number, toYear: number) {
  const map = new Map<string, Holiday>();
  for (let y = fromYear; y <= toYear; y += 1) {
    for (const h of holidaysFor(lang, y)) {
      const existing = map.get(ymdKey(h.date));
      // Ayni gune iki kayit duserse tam gun olan kazanir.
      if (!existing || (existing.kind === "half" && h.kind === "full")) map.set(ymdKey(h.date), h);
    }
  }
  return (date: YMD) => map.get(ymdKey(date));
}

export type BridgePlan = {
  start: YMD;
  end: YMD;
  totalDays: number;
  /** Izin alinacak is gunleri (yarim gunler dahil). */
  leaveDays: YMD[];
  /** Yarim gunler 0,5 sayilir. */
  leaveCost: number;
  holidayIds: string[];
};

/**
 * Koprü gunu onerileri: tatil iceren kesintisiz bos gun bloklari arasindaki 1-4 is gununu
 * izinle doldurunca olusan uzun tatiller. Verim (toplam gun / izin) dusuk olanlar elenir.
 */
export function bridgePlans(lang: HolidayLang, year: number): BridgePlan[] {
  const lookup = holidayLookup(lang, year - 1, year + 1);
  const start = { year, month: 1, day: 1 };
  const span = diffDays(start, { year, month: 12, day: 31 }) + 1;
  type Day = { date: YMD; off: boolean; half: boolean; holidayId?: string };
  const days: Day[] = [];
  for (let i = -10; i < span + 10; i += 1) {
    const date = addDaysYmd(start, i);
    const h = lookup(date);
    const weekend = isWeekend(date);
    days.push({ date, off: weekend || h?.kind === "full", half: !weekend && h?.kind === "half", holidayId: h?.id });
  }
  // Bos gun bloklari
  type Run = { from: number; to: number; holidayIds: string[] };
  const runs: Run[] = [];
  for (let i = 0; i < days.length; i += 1) {
    if (!days[i].off) continue;
    const from = i;
    const ids = new Set<string>();
    while (i < days.length && days[i].off) {
      if (days[i].holidayId) ids.add(days[i].holidayId!);
      i += 1;
    }
    runs.push({ from, to: i - 1, holidayIds: [...ids] });
  }
  const plans: BridgePlan[] = [];
  for (let a = 0; a < runs.length; a += 1) {
    for (let b = a + 1; b <= a + 2 && b < runs.length; b += 1) {
      // Iki bosluklu planda aradaki blok da dahil: aradaki tum is gunleri izin.
      const leave = days.slice(runs[a].to + 1, runs[b].from).filter((d) => !d.off);
      const cost = leave.reduce((sum, d) => sum + (d.half ? 0.5 : 1), 0);
      const total = runs[b].to - runs[a].from + 1;
      const ids = [...new Set(runs.slice(a, b + 1).flatMap((r) => r.holidayIds))];
      // Tatil icermeyen gunlerle gelen yarim gunler (arefe) de tatil sayilir.
      const halfIds = [...new Set(leave.filter((d) => d.half && d.holidayId).map((d) => d.holidayId!))];
      const allIds = [...new Set([...ids, ...halfIds])];
      if (!allIds.length || cost === 0 || cost > 4 || leave.length > 5) continue;
      if (total / cost < (b === a + 1 ? 2.5 : 2.25)) continue;
      const first = days[runs[a].from].date;
      const last = days[runs[b].to].date;
      if (first.year > year || last.year < year) continue;
      // Yalnizca yil icindeki bir tatile dayanan planlar
      if (!leave.some((d) => d.date.year === year)) continue;
      plans.push({ start: first, end: last, totalDays: total, leaveDays: leave.map((d) => d.date), leaveCost: cost, holidayIds: allIds });
    }
  }
  // Ayni izin gunlerini kapsayan daha kisa planlari ele; bir izin kumesinin ust kumesi olan ama verimi dusuk planlari tut (secenek).
  const unique = new Map<string, BridgePlan>();
  for (const p of plans) {
    const key = p.leaveDays.map(ymdKey).join(",");
    const existing = unique.get(key);
    if (!existing || p.totalDays > existing.totalDays) unique.set(key, p);
  }
  return [...unique.values()].sort((x, y) => ymdKey(x.start).localeCompare(ymdKey(y.start)) || x.leaveCost - y.leaveCost);
}

/** Hafta sonuna denk gelen tam gun tatiller (TR'de telafi edilmez). */
export function weekendHolidays(list: Holiday[]) {
  return list.filter((h) => h.kind === "full" && isWeekend(h.date));
}
