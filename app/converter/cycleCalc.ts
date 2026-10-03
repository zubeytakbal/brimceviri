// Adet döngüsü ve yumurtlama (ovülasyon) tahmini: takvim yöntemi.
// Yumurtlama bir sonraki adetten ~14 gün önce (luteal faz), doğurgan pencere
// yumurtlamadan 5 gün önce başlar ve 1 gün sonra biter. Tahmindir; doğum kontrolü
// için kullanılamaz.
import type { YMD } from "./time/calendars";
import { addDaysYmd, diffDays } from "./time/dateMath";

export const CYCLE_MIN = 21;
export const CYCLE_MAX = 45;
export const PERIOD_MIN = 2;
export const PERIOD_MAX = 10;
export const LUTEAL_DAYS = 14;

export type CycleDay = "period" | "fertile" | "ovulation" | "none";

export type Cycle = {
  start: YMD;
  periodEnd: YMD;
  ovulation: YMD;
  fertileStart: YMD;
  fertileEnd: YMD;
  /** Sonraki adetin beklenen ilk günü = gebelik testi için en erken güvenilir gün. */
  next: YMD;
};

export function validCycle(cycle: number, period: number) {
  return Number.isInteger(cycle) && Number.isInteger(period) && cycle >= CYCLE_MIN && cycle <= CYCLE_MAX && period >= PERIOD_MIN && period <= PERIOD_MAX && period < cycle - LUTEAL_DAYS;
}

function cycleFrom(start: YMD, cycle: number, period: number): Cycle {
  const next = addDaysYmd(start, cycle);
  const ovulation = addDaysYmd(next, -LUTEAL_DAYS);
  return {
    start,
    periodEnd: addDaysYmd(start, period - 1),
    ovulation,
    fertileStart: addDaysYmd(ovulation, -5),
    fertileEnd: addDaysYmd(ovulation, 1),
    next,
  };
}

/** Son adetin ilk gününden başlayarak `count` döngü. */
export function cycles(lmp: YMD, cycle: number, period: number, count = 3): Cycle[] | null {
  if (!validCycle(cycle, period)) return null;
  return Array.from({ length: count }, (_, i) => cycleFrom(addDaysYmd(lmp, i * cycle), cycle, period));
}

/** Verilen günü içeren döngü (son adetten önceki günler için null). */
export function cycleOn(lmp: YMD, cycle: number, period: number, day: YMD) {
  if (!validCycle(cycle, period)) return null;
  const d = diffDays(lmp, day);
  if (d < 0) return null;
  const k = Math.floor(d / cycle);
  const c = cycleFrom(addDaysYmd(lmp, k * cycle), cycle, period);
  const cycleDay = d - k * cycle + 1;
  let kind: CycleDay = "none";
  if (diffDays(day, c.periodEnd) >= 0) kind = "period";
  else if (diffDays(day, c.ovulation) === 0) kind = "ovulation";
  else if (diffDays(c.fertileStart, day) >= 0 && diffDays(day, c.fertileEnd) >= 0) kind = "fertile";
  return { cycle: c, cycleDay, kind, daysToNext: diffDays(day, c.next) };
}

/** Gebelik olursa tahmini doğum tarihi: Naegele kuralı, döngü uzunluğuna göre düzeltilmiş. */
export function dueDate(lmp: YMD, cycle: number) {
  return addDaysYmd(lmp, 280 + (cycle - 28));
}

