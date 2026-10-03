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

import {
  catchUp,
  feastDate,
  formatChapterRange,
  MYSTERY_BY_WEEKDAY,
  NOVENA_FEASTS,
  novenaFor,
  readingSchedule,
  rosarySteps,
  scopeChapters,
  tithe,
  upcomingNovenas,
} from "../app/converter/christian/christianCalc";

describe("Reading plan", () => {
  it("whole Bible in 365 days: 1,189 chapters, 94 days of 4 and 271 of 3", () => {
    const ch = scopeChapters("bible");
    expect(ch).toHaveLength(1189);
    const plan = readingSchedule(ch, 365);
    expect(plan).toHaveLength(365);
    expect(plan.reduce((t, d) => t + d.chapters, 0)).toBe(1189);
    expect(plan.filter((d) => d.chapters === 4)).toHaveLength(1189 % 365);
    expect(formatChapterRange(plan[0].from, plan[0].to)).toBe("Genesis 1–4");
    expect(plan[364].to).toMatchObject({ chapter: 22 });
    expect(plan[364].to.book.slug).toBe("revelation");
    expect(scopeChapters("new")).toHaveLength(260);
    expect(scopeChapters("gospels")).toHaveLength(89);
    expect(readingSchedule(scopeChapters("gospels"), 200)).toHaveLength(89);
  });

  it("catch-up pace", () => {
    const c = catchUp(1189, 200, 365, 100)!;
    expect(c.expected).toBe(Math.round((1189 / 365) * 100));
    expect(c.behind).toBe(c.expected - 200);
    expect(c.daysLeft).toBe(265);
    expect(c.newPace).toBeCloseTo(989 / 265, 10);
    expect(catchUp(1189, 1200, 365, 1)).toBeNull();
  });
});

describe("Novena", () => {
  it("starts nine days before the feast and ends on its eve", () => {
    expect(novenaFor({ year: 2026, month: 9, day: 29 })).toMatchObject({ start: { year: 2026, month: 9, day: 20 }, end: { year: 2026, month: 9, day: 28 } });
    expect(novenaFor({ year: 2026, month: 12, day: 25 }).start).toEqual({ year: 2026, month: 12, day: 16 });
    // Divine Mercy novena begins on Good Friday.
    const dm = feastDate(NOVENA_FEASTS.find((f) => f.id === "divine-mercy")!, 2026)!;
    expect(novenaFor(dm).start).toEqual({ year: 2026, month: 4, day: 3 });
    const up = upcomingNovenas({ year: 2026, month: 10, day: 3 }, 3);
    expect(up.map((n) => n.feast.id)).toEqual(["francis", "jude", "all-souls"]);
  });
});

describe("Rosary", () => {
  it("weekday mysteries and 5 decades of 10 Hail Marys", () => {
    expect(MYSTERY_BY_WEEKDAY[4]).toBe("luminous");
    expect(MYSTERY_BY_WEEKDAY[1]).toBe("joyful");
    expect(MYSTERY_BY_WEEKDAY[5]).toBe("sorrowful");
    const steps = rosarySteps("joyful", true);
    expect(steps.filter((s) => s.prayer === "Hail Mary")).toHaveLength(50);
    expect(steps.filter((s) => s.bead === "small")).toHaveLength(53);
    expect(steps.filter((s) => s.bead === "large")).toHaveLength(6);
  });
});

describe("Tithe", () => {
  it("10% per period and per year", () => {
    expect(tithe(2000, "biweekly")).toEqual({ perPeriod: 200, annual: 5200, monthly: 5200 / 12, weekly: 100 });
    expect(tithe(5000, "monthly", 5)!.annual).toBe(3000);
    expect(tithe(100, "monthly", 0)).toBeNull();
  });
});
