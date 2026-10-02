import { describe, expect, it } from "vitest";
import {
  adventSunday,
  BIBLE_BOOKS,
  BIBLE_TOTALS,
  findBibleBook,
  orthodoxEaster,
  orthodoxLent,
  testamentTotals,
  westernEaster,
  westernFeasts,
  westernLent,
} from "../app/converter/christian/christianCalc";
import { diffDays } from "../app/converter/time/dateMath";

const ymd = (year: number, month: number, day: number) => ({ year, month, day });

describe("Easter", () => {
  it("Western Easter matches published dates", () => {
    expect(westernEaster(2024)).toEqual(ymd(2024, 3, 31));
    expect(westernEaster(2025)).toEqual(ymd(2025, 4, 20));
    expect(westernEaster(2026)).toEqual(ymd(2026, 4, 5));
    expect(westernEaster(2027)).toEqual(ymd(2027, 3, 28));
    expect(westernEaster(2038)).toEqual(ymd(2038, 4, 25)); // latest possible date
    expect(westernEaster(2285)).toEqual(ymd(2285, 3, 22)); // earliest possible date
    expect(westernEaster(1582)).toBeNull();
  });

  it("Orthodox Easter matches published dates", () => {
    expect(orthodoxEaster(2024)).toEqual(ymd(2024, 5, 5));
    expect(orthodoxEaster(2025)).toEqual(ymd(2025, 4, 20));
    expect(orthodoxEaster(2026)).toEqual(ymd(2026, 4, 12));
    expect(orthodoxEaster(2027)).toEqual(ymd(2027, 5, 2));
    expect(orthodoxEaster(2023)).toEqual(ymd(2023, 4, 16));
  });

  it("both Easters always fall on a Sunday in their ranges", () => {
    for (let y = 1900; y <= 2200; y++) {
      const w = westernEaster(y)!;
      const o = orthodoxEaster(y)!;
      expect(new Date(Date.UTC(w.year, w.month - 1, w.day)).getUTCDay()).toBe(0);
      expect(new Date(Date.UTC(o.year, o.month - 1, o.day)).getUTCDay()).toBe(0);
      expect(diffDays(w, o)).toBeGreaterThanOrEqual(0);
    }
  });

  it("moveable feasts follow Easter", () => {
    const f = westernFeasts(2026)!;
    const at = (id: string) => f.find((x) => x.id === id)!.date;
    expect(at("ash-wednesday")).toEqual(ymd(2026, 2, 18));
    expect(at("good-friday")).toEqual(ymd(2026, 4, 3));
    expect(at("ascension")).toEqual(ymd(2026, 5, 14));
    expect(at("pentecost")).toEqual(ymd(2026, 5, 24));
    expect(adventSunday(2026)).toEqual(ymd(2026, 11, 29));
    expect(adventSunday(2022)).toEqual(ymd(2022, 11, 27));
    expect(adventSunday(2023)).toEqual(ymd(2023, 12, 3));
  });
});

describe("Lent", () => {
  it("Ash Wednesday is day 1, Holy Saturday day 40, Sundays not counted", () => {
    expect(westernLent(ymd(2026, 2, 18))).toMatchObject({ phase: "lent", day: 1, daysLeftAfterToday: 39 });
    expect(westernLent(ymd(2026, 2, 22))).toMatchObject({ day: 4, isSunday: true });
    expect(westernLent(ymd(2026, 2, 23))).toMatchObject({ day: 5, isSunday: false });
    expect(westernLent(ymd(2026, 4, 4))).toMatchObject({ day: 40, daysLeftAfterToday: 0, daysToEaster: 1 });
    expect(westernLent(ymd(2026, 2, 1))).toMatchObject({ phase: "before", daysUntil: 17 });
    expect(westernLent(ymd(2026, 4, 5))!.phase).toBe("after");
  });

  it("Orthodox Great Lent is 40 days from Clean Monday", () => {
    const l = orthodoxLent(2026)!;
    expect(l.start).toEqual(ymd(2026, 2, 23));
    expect(diffDays(l.start, l.end) + 1).toBe(40);
  });
});

describe("Bible books (KJV)", () => {
  it("66 books, 1,189 chapters, 31,102 verses", () => {
    expect(BIBLE_TOTALS).toMatchObject({ books: 66, chapters: 1189, verses: 31102 });
    expect(testamentTotals("Old")).toMatchObject({ books: 39, chapters: 929, verses: 23145 });
    expect(testamentTotals("New")).toMatchObject({ books: 27, chapters: 260, verses: 7957 });
  });

  it("well-known counts", () => {
    expect(findBibleBook("genesis")).toMatchObject({ chapters: 50, verses: 1533 });
    expect(findBibleBook("psalms")).toMatchObject({ chapters: 150, verses: 2461 });
    expect(findBibleBook("psalms")!.versesPerChapter[118]).toBe(176);
    expect(findBibleBook("psalms")!.versesPerChapter[116]).toBe(2);
    expect(findBibleBook("john")!.versesPerChapter[10]).toBe(57);
    expect(findBibleBook("3-john")!.verses).toBe(14);
    expect(new Set(BIBLE_BOOKS.map((b) => b.slug)).size).toBe(66);
    for (const b of BIBLE_BOOKS) expect(b.slug).toMatch(/^[a-z0-9-]+$/);
  });
});
