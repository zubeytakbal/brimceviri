import { describe, expect, it } from "vitest";
import {
  addHijriMonthsTo,
  ayyamAqiqa,
  hawlZakat,
  hukmQasr,
  iddatAshhur,
  iddatQuru,
  iddatWafat,
} from "../app/converter/arabicFiqh";
import { gregorianToHijri, hijriToGregorian } from "../app/converter/time/calendars";
import { diffDays } from "../app/converter/time/dateMath";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("العدة", () => {
  it("عدة الوفاة: أربعة أشهر هجرية وعشرة أيام", () => {
    const mawt = hijriToGregorian({ year: 1448, month: 1, day: 1 })!;
    const r = iddatWafat(mawt);
    expect(gregorianToHijri(r.bilAhilla)).toEqual({ year: 1448, month: 5, day: 11 });
    expect(diffDays(mawt, r.bilAyyam)).toBe(130);
    // بالأهلة بين 128 و 130 يومًا
    const n = diffDays(mawt, r.bilAhilla);
    expect(n).toBeGreaterThanOrEqual(126);
    expect(n).toBeLessThanOrEqual(130);
  });

  it("الأشهر الهجرية تعبر السنة وتثبّت اليوم 30", () => {
    const start = hijriToGregorian({ year: 1447, month: 11, day: 15 })!;
    expect(gregorianToHijri(addHijriMonthsTo(start, 3))).toEqual({ year: 1448, month: 2, day: 15 });
    expect(diffDays(start, iddatAshhur(start).bilAyyam)).toBe(90);
  });

  it("ثلاثة قروء: الحيض أطول من الطهر بمدة الحيضة", () => {
    // آخر حيض 1 يناير، دورة 28 ومدة 6؛ الطلاق 10 يناير (في الطهر)
    const hayd = iddatQuru(d(2026, 1, 10), d(2026, 1, 1), 28, 6, "hayd")!;
    const tuhr = iddatQuru(d(2026, 1, 10), d(2026, 1, 1), 28, 6, "tuhr")!;
    expect(hayd.fiHayd).toBe(false);
    // الحيضات بعد الطلاق: 29 يناير، 26 فبراير، 26 مارس
    expect(tuhr.nihaya).toEqual(d(2026, 3, 26));
    expect(hayd.nihaya).toEqual(d(2026, 4, 1));
  });

  it("الطلاق في الحيض: القرء طهرًا يحتاج بداية الحيضة الرابعة", () => {
    const r = iddatQuru(d(2026, 1, 3), d(2026, 1, 1), 28, 6, "tuhr")!;
    expect(r.fiHayd).toBe(true);
    expect(r.nihaya).toEqual(d(2026, 4, 23));
    const h = iddatQuru(d(2026, 1, 3), d(2026, 1, 1), 28, 6, "hayd")!;
    expect(h.nihaya).toEqual(d(2026, 4, 1));
  });

  it("يرفض المدخلات غير المعقولة", () => {
    expect(iddatQuru(d(2026, 1, 3), d(2026, 1, 10), 28, 6, "hayd")).toBeNull();
    expect(iddatQuru(d(2026, 1, 3), d(2026, 1, 1), 10, 6, "hayd")).toBeNull();
    expect(iddatQuru(d(2026, 1, 3), d(2026, 1, 1), 28, 0, "hayd")).toBeNull();
  });
});

describe("العقيقة", () => {
  it("الجمهور: يوم الولادة يُعدّ، فالسابع قبل يوم الولادة من الأسبوع بيوم", () => {
    // الجمعة 2 أكتوبر 2026 → الخميس 8 أكتوبر
    const r = ayyamAqiqa(d(2026, 10, 2), true);
    expect(r.map((x) => x.tarikh)).toEqual([d(2026, 10, 8), d(2026, 10, 15), d(2026, 10, 22)]);
  });
  it("المالكية: من وُلد بعد الفجر لا يُعدّ يوم ولادته", () => {
    expect(ayyamAqiqa(d(2026, 10, 2), false)[0].tarikh).toEqual(d(2026, 10, 9));
  });
});

describe("قصر الصلاة", () => {
  it("المسافة والإقامة", () => {
    expect(hukmQasr(120, 3, "jumhur")!.yaqsur).toBe(true);
    expect(hukmQasr(120, 4, "jumhur")!.yaqsur).toBe(true);
    expect(hukmQasr(120, 5, "jumhur")!.yaqsur).toBe(false);
    expect(hukmQasr(120, 14, "hanafi")!.yaqsur).toBe(true);
    expect(hukmQasr(120, 15, "hanafi")!.yaqsur).toBe(false);
    expect(hukmQasr(60, 1, "jumhur")!.yaqsur).toBe(false);
    expect(hukmQasr(120, null, "jumhur")!.yaqsur).toBe(true);
    expect(hukmQasr(-1, 1, "jumhur")).toBeNull();
  });
});

describe("حول الزكاة", () => {
  it("سنة هجرية وربع العشر", () => {
    const bulugh = hijriToGregorian({ year: 1447, month: 9, day: 1 })!;
    const r = hawlZakat(bulugh, 100_000, 400, "dhahab", false)!;
    expect(gregorianToHijri(r.hawl)).toEqual({ year: 1448, month: 9, day: 1 });
    expect(r.nisab).toBe(34_000);
    expect(r.zakat).toBe(2_500);
  });
  it("السنة الميلادية بنسبة 2.577%", () => {
    const r = hawlZakat(d(2026, 3, 1), 100_000, 400, "dhahab", true)!;
    expect(r.hawl).toEqual(d(2027, 3, 1));
    expect(r.zakat).toBeCloseTo(2_577, 6);
  });
  it("دون النصاب لا زكاة", () => {
    const r = hawlZakat(d(2026, 3, 1), 10_000, 400, "dhahab", false)!;
    expect(r.balagha).toBe(false);
    expect(r.zakat).toBe(0);
    expect(hawlZakat(d(2026, 3, 1), 10_000, 0, "fidda", false)).toBeNull();
  });
});
