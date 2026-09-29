// حساب العمر بالتقويم الهجري (أم القرى) والميلادي.
import { gregorianToHijri, hijriToGregorian, type YMD } from "./calendars";
import { daysInMonth, diffDays, diffYmd } from "./dateMath";

/** عدد أيام شهر هجري (29 أو 30) حسب أم القرى. */
export function hijriShahrTul(hy: number, hm: number) {
  return hijriToGregorian({ year: hy, month: hm, day: 30 }) ? 30 : 29;
}

/** تاريخ هجري → ميلادي، مع تثبيت اليوم 30 على آخر الشهر إن كان الشهر 29 يومًا. */
function hijriThabit(h: YMD): YMD {
  const day = Math.min(h.day, hijriShahrTul(h.year, h.month));
  return hijriToGregorian({ ...h, day })!;
}

function addHijriMonths(h: YMD, n: number): YMD {
  const total = h.year * 12 + (h.month - 1) + n;
  const year = Math.floor(total / 12);
  const month = (total % 12) + 1;
  return { year, month, day: Math.min(h.day, hijriShahrTul(year, month)) };
}

/** العمر الهجري بين تاريخ ميلاد وتاريخ (كلاهما ميلادي). */
export function umrHijri(milad: YMD, ila: YMD) {
  const a = gregorianToHijri(milad);
  const b = gregorianToHijri(ila);
  let months = (b.year - a.year) * 12 + (b.month - a.month);
  while (
    months > 0 &&
    diffDays(hijriThabit(addHijriMonths(a, months)), ila) < 0
  )
    months -= 1;
  const days = diffDays(hijriThabit(addHijriMonths(a, months)), ila);
  return { years: Math.floor(months / 12), months: months % 12, days };
}

/** عيد الميلاد الهجري القادم (أو اليوم) والعمر الذي سيبلغه. */
export function miladHijriQadim(milad: YMD, min: YMD) {
  const h = gregorianToHijri(milad);
  let y = gregorianToHijri(min).year;
  let d = hijriThabit({ year: y, month: h.month, day: h.day });
  if (diffDays(min, d) < 0) {
    y += 1;
    d = hijriThabit({ year: y, month: h.month, day: h.day });
  }
  return { tarikh: d, umr: y - h.year };
}

/** عيد الميلاد الميلادي القادم (29 فبراير ← 28 فبراير في السنوات البسيطة). */
export function miladMiladiQadim(milad: YMD, min: YMD) {
  const at = (year: number): YMD => ({
    year,
    month: milad.month,
    day: Math.min(milad.day, daysInMonth(year, milad.month)),
  });
  let y = min.year;
  if (diffDays(min, at(y)) < 0) y += 1;
  return { tarikh: at(y), umr: y - milad.year };
}

export type NatijatUmr = {
  hijri: { years: number; months: number; days: number };
  miladi: { years: number; months: number; days: number };
  ayyam: number;
  miladHijri: YMD;
  qadimHijri: { tarikh: YMD; umr: number };
  qadimMiladi: { tarikh: YMD; umr: number };
};

export function hisabUmr(milad: YMD, ila: YMD): NatijatUmr | null {
  if (diffDays(milad, ila) < 0) return null;
  const m = diffYmd(milad, ila);
  return {
    hijri: umrHijri(milad, ila),
    miladi: { years: m.years, months: m.months, days: m.days },
    ayyam: diffDays(milad, ila),
    miladHijri: gregorianToHijri(milad),
    qadimHijri: miladHijriQadim(milad, ila),
    qadimMiladi: miladMiladiQadim(milad, ila),
  };
}
