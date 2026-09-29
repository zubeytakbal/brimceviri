// مكافأة نهاية الخدمة وفق نظام العمل السعودي (المواد 84، 85، 87، 80، 81).
import type { YMD } from "./time/calendars";
import { diffDays, diffYmd } from "./time/dateMath";

export type SababInhaa =
  | "inhaa" // انتهاء العقد أو إنهاؤه من صاحب العمل (م 84)
  | "istiqala" // استقالة العامل (م 85)
  | "mada81" // ترك العمل بسبب إخلال صاحب العمل (م 81)
  | "mada87" // قوة قاهرة أو العاملة بعد الزواج/الوضع (م 87)
  | "mada80"; // فصل وفق المادة 80

export const ASBAB: Array<{ id: SababInhaa; ism: string; sharh: string }> = [
  {
    id: "inhaa",
    ism: "انتهاء العقد أو إنهاؤه من صاحب العمل",
    sharh: "المكافأة كاملة (المادة 84).",
  },
  {
    id: "istiqala",
    ism: "استقالة العامل",
    sharh:
      "أقل من سنتين: لا شيء؛ من سنتين إلى 5 سنوات: الثلث؛ أكثر من 5 وأقل من 10: الثلثان؛ 10 سنوات فأكثر: كاملة (المادة 85).",
  },
  {
    id: "mada81",
    ism: "ترك العمل بسبب إخلال صاحب العمل بالتزاماته",
    sharh: "المكافأة كاملة (المادة 81).",
  },
  {
    id: "mada87",
    ism: "قوة قاهرة، أو إنهاء العاملة خلال 6 أشهر من الزواج أو 3 أشهر من الوضع",
    sharh: "المكافأة كاملة حتى لو كان الإنهاء استقالة (المادة 87).",
  },
  {
    id: "mada80",
    ism: "الفصل وفق المادة 80 (دون مكافأة)",
    sharh: "لا يستحق العامل مكافأة في حالات المادة 80.",
  },
];

/** نسبة المكافأة المستحقة حسب سبب الإنهاء ومدة الخدمة بالسنوات. */
export function nisbatIstihqaq(sabab: SababInhaa, sanawat: number) {
  if (sabab === "mada80") return 0;
  if (sabab !== "istiqala") return 1;
  if (sanawat < 2) return 0;
  if (sanawat <= 5) return 1 / 3;
  if (sanawat < 10) return 2 / 3;
  return 1;
}

export type NatijatMukafaa = {
  mudda: { years: number; months: number; days: number };
  ayyam: number;
  sanawat: number;
  ajr: number;
  /** المكافأة الكاملة قبل تطبيق نسبة الاستقالة. */
  kamila: number;
  shariha1: number;
  shariha2: number;
  nisba: number;
  mustahaqq: number;
};

/**
 * تُحسب أجزاء السنة بنسبة ما قضاه العامل: عدد أيام الخدمة ÷ 365.
 * الأجر = آخر أجر فعلي شهري (الأساسي + البدلات الثابتة كالسكن والنقل).
 */
export function hisabMukafaa(
  bidaya: YMD,
  nihaya: YMD,
  ajr: number,
  sabab: SababInhaa,
): NatijatMukafaa | null {
  if (!(ajr >= 0) || diffDays(bidaya, nihaya) < 0) return null;
  const ayyam = diffDays(bidaya, nihaya);
  const sanawat = ayyam / 365;
  const s1 = Math.min(sanawat, 5);
  const s2 = Math.max(sanawat - 5, 0);
  const shariha1 = s1 * (ajr / 2);
  const shariha2 = s2 * ajr;
  const kamila = shariha1 + shariha2;
  const nisba = nisbatIstihqaq(sabab, sanawat);
  const m = diffYmd(bidaya, nihaya);
  return {
    mudda: { years: m.years, months: m.months, days: m.days },
    ayyam,
    sanawat,
    ajr,
    kamila,
    shariha1,
    shariha2,
    nisba,
    mustahaqq: kamila * nisba,
  };
}
