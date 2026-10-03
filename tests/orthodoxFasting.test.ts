import { describe, expect, it } from "vitest";
import {
  apostlesFastDays,
  churchDate,
  fastDaysInYear,
  fastingDay,
  fastingPeriods,
  gregorianToJulian,
  julianToGregorian,
  nextFast,
} from "../app/converter/christian/orthodoxFasting";

const ymd = (year: number, month: number, day: number) => ({ year, month, day });

describe("Orthodox fasting calendar", () => {
  it("Apostles' Fast 2026: 34 days on the old calendar (8 June – 11 July), 21 on the new", () => {
    const old = fastingPeriods(2026, "old")!.find((p) => p.id === "apostles")!;
    expect(old.start).toEqual(ymd(2026, 6, 8));
    expect(old.end).toEqual(ymd(2026, 7, 11));
    expect(old.days).toBe(34);
    expect(apostlesFastDays(2026, "new")).toBe(21);
  });

  it("with a late Pascha the new-calendar Apostles' Fast disappears", () => {
    // Pascha 5 May 2024: the fast would start on 1 July, after 28 June.
    expect(apostlesFastDays(2024, "new")).toBe(0);
    expect(apostlesFastDays(2024, "old")).toBeGreaterThan(0);
  });

  it("fixed fasts move 13 days on the old calendar", () => {
    expect(churchDate(2026, 12, 25, "old")).toEqual(ymd(2027, 1, 7));
    const nat = fastingPeriods(2026, "old")!.find((p) => p.id === "nativity")!;
    expect(nat.start).toEqual(ymd(2026, 11, 28));
    expect(nat.end).toEqual(ymd(2027, 1, 6));
    expect(nat.days).toBe(40);
    expect(fastingPeriods(2026, "new")!.find((p) => p.id === "dormition")!.days).toBe(14);
  });

  it("day status follows the priorities", () => {
    // Clean Monday 2026 (Pascha 12 April) and Holy Friday.
    expect(fastingDay(ymd(2026, 2, 23), "old")).toMatchObject({ kind: "great-lent", period: "great-lent" });
    expect(fastingDay(ymd(2026, 4, 10), "new")).toMatchObject({ kind: "strict", period: "holy-week" });
    // Bright Friday is fast-free; an ordinary Friday is a fast day.
    expect(fastingDay(ymd(2026, 4, 17), "old")!.kind).toBe("fast-free");
    expect(fastingDay(ymd(2026, 10, 2), "old")!.kind).toBe("wednesday-friday");
    expect(fastingDay(ymd(2026, 10, 3), "old")!.kind).toBe("none");
    // Christmas: 7 January (old) and 1 January (new) are fast-free; 6 January is still the Nativity Fast on the old calendar.
    expect(fastingDay(ymd(2027, 1, 7), "old")!.kind).toBe("fast-free");
    expect(fastingDay(ymd(2027, 1, 6), "old")!.kind).toBe("nativity");
    expect(fastingDay(ymd(2027, 1, 1), "new")!.kind).toBe("fast-free");
    expect(fastingDay(ymd(2027, 1, 5), "new")).toMatchObject({ kind: "strict", period: "theophany-eve" });
    expect(fastingDay(ymd(2027, 1, 18), "old")).toMatchObject({ kind: "strict", period: "theophany-eve" });
  });

  it("next fast and yearly total", () => {
    expect(nextFast(ymd(2026, 10, 3), "new")).toMatchObject({ id: "nativity", start: ymd(2026, 11, 15) });
    expect(nextFast(ymd(2026, 10, 3), "old")).toMatchObject({ id: "nativity", start: ymd(2026, 11, 28) });
    const n = fastDaysInYear(2026, "old");
    expect(n).toBeGreaterThan(170);
    expect(n).toBeLessThan(220);
  });

  it("Julian ↔ Gregorian", () => {
    expect(julianToGregorian(ymd(2026, 12, 25))).toEqual(ymd(2027, 1, 7));
    expect(gregorianToJulian(ymd(2026, 10, 3))).toEqual(ymd(2026, 9, 20));
  });
});
