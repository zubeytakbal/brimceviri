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
export const LUTEAL_MIN = 10;
export const LUTEAL_MAX = 16;

export type CycleDay = "period" | "fertile" | "ovulation" | "none";

export type Cycle = {
  start: YMD;
  periodEnd: YMD;
  ovulation: YMD;
  fertileStart: YMD;
  fertileEnd: YMD;
  /** Sonraki adetin beklenen ilk günü = gebelik testi için en güvenilir gün. */
  next: YMD;
  /** Tutunma (implantasyon) aralığı: yumurtlamadan 6–12 gün sonra. */
  implantStart: YMD;
  implantEnd: YMD;
};

export function validCycle(cycle: number, period: number, luteal = LUTEAL_DAYS) {
  return (
    [cycle, period, luteal].every(Number.isInteger) &&
    cycle >= CYCLE_MIN &&
    cycle <= CYCLE_MAX &&
    period >= PERIOD_MIN &&
    period <= PERIOD_MAX &&
    luteal >= LUTEAL_MIN &&
    luteal <= LUTEAL_MAX &&
    period < cycle - luteal
  );
}

function cycleFrom(start: YMD, cycle: number, period: number, luteal: number): Cycle {
  const next = addDaysYmd(start, cycle);
  const ovulation = addDaysYmd(next, -luteal);
  return {
    start,
    periodEnd: addDaysYmd(start, period - 1),
    ovulation,
    fertileStart: addDaysYmd(ovulation, -5),
    fertileEnd: addDaysYmd(ovulation, 1),
    next,
    implantStart: addDaysYmd(ovulation, 6),
    implantEnd: addDaysYmd(ovulation, 12),
  };
}

/** Son adetin ilk gününden başlayarak `count` döngü. */
export function cycles(lmp: YMD, cycle: number, period: number, count = 3, luteal = LUTEAL_DAYS): Cycle[] | null {
  if (!validCycle(cycle, period, luteal)) return null;
  return Array.from({ length: count }, (_, i) => cycleFrom(addDaysYmd(lmp, i * cycle), cycle, period, luteal));
}

/** Verilen günü içeren döngü (son adetten önceki günler için null). */
export function cycleOn(lmp: YMD, cycle: number, period: number, day: YMD, luteal = LUTEAL_DAYS) {
  if (!validCycle(cycle, period, luteal)) return null;
  const d = diffDays(lmp, day);
  if (d < 0) return null;
  const k = Math.floor(d / cycle);
  const c = cycleFrom(addDaysYmd(lmp, k * cycle), cycle, period, luteal);
  const cycleDay = d - k * cycle + 1;
  let kind: CycleDay = "none";
  if (diffDays(day, c.periodEnd) >= 0) kind = "period";
  else if (diffDays(day, c.ovulation) === 0) kind = "ovulation";
  else if (diffDays(c.fertileStart, day) >= 0 && diffDays(day, c.fertileEnd) >= 0) kind = "fertile";
  // Yumurtlamadan sonraki gün sayısı (forumlarda "ES+7", "7 DPO")
  const dpo = diffDays(c.ovulation, day);
  return { cycle: c, cycleDay, kind, daysToNext: diffDays(day, c.next), dpo: dpo > 0 ? dpo : null };
}

/** Gebelik olursa tahmini doğum tarihi: Naegele kuralı, döngü uzunluğuna göre düzeltilmiş. */
export function dueDate(lmp: YMD, cycle: number) {
  return addDaysYmd(lmp, 280 + (cycle - 28));
}

