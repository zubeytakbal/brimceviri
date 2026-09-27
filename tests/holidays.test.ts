import { describe, expect, it } from "vitest";
import {
  addBusinessDays,
  addMonthsYmd,
  countDays,
  diffYmd,
  isoWeek,
  isoWeeksInYear,
  nthWeekdayYmd,
  parseYmd,
  usWeek,
  ymdKey,
} from "../app/converter/time/dateMath";
import { bridgePlans, holidayLookup, turkeyHolidays, usFederalHolidays } from "../app/converter/time/holidays";

const d = (s: string) => parseYmd(s)!;
const keys = (list: { date: { year: number; month: number; day: number } }[]) => list.map((h) => ymdKey(h.date));

describe("dateMath", () => {
  it("adds months with month-end clamping", () => {
    expect(addMonthsYmd(d("2026-01-31"), 1)).toEqual(d("2026-02-28"));
    expect(addMonthsYmd(d("2028-01-31"), 1)).toEqual(d("2028-02-29"));
    expect(addMonthsYmd(d("2024-02-29"), 12)).toEqual(d("2025-02-28"));
    expect(addMonthsYmd(d("2026-03-15"), -3)).toEqual(d("2025-12-15"));
  });

  it("splits a range into years, months and days", () => {
    expect(diffYmd(d("2000-05-20"), d("2026-09-27"))).toMatchObject({ years: 26, months: 4, days: 7 });
    expect(diffYmd(d("2026-01-31"), d("2026-03-01"))).toMatchObject({ years: 0, months: 1, days: 1 });
  });

  it("computes ISO and US week numbers", () => {
    expect(isoWeek(d("2026-09-27"))).toEqual({ year: 2026, week: 39 });
    expect(isoWeek(d("2027-01-01"))).toEqual({ year: 2026, week: 53 });
    expect(isoWeek(d("2024-12-30"))).toEqual({ year: 2025, week: 1 });
    expect(isoWeeksInYear(2026)).toBe(53);
    expect(isoWeeksInYear(2027)).toBe(52);
    expect(usWeek(d("2026-01-03"))).toBe(1);
    expect(usWeek(d("2026-01-04"))).toBe(2);
  });

  it("finds nth and last weekdays", () => {
    expect(nthWeekdayYmd(2026, 5, 1, -1)).toEqual(d("2026-05-25"));
    expect(nthWeekdayYmd(2026, 11, 4, 4)).toEqual(d("2026-11-26"));
  });
});

describe("Turkish public holidays", () => {
  it("matches the official 2026 calendar", () => {
    expect(keys(turkeyHolidays(2026))).toEqual([
      "2026-01-01",
      "2026-03-19",
      "2026-03-20",
      "2026-03-21",
      "2026-03-22",
      "2026-04-23",
      "2026-05-01",
      "2026-05-19",
      "2026-05-26",
      "2026-05-27",
      "2026-05-28",
      "2026-05-29",
      "2026-05-30",
      "2026-07-15",
      "2026-08-30",
      "2026-10-28",
      "2026-10-29",
    ]);
  });

  it("marks arefe and 28 October as half days", () => {
    const half = turkeyHolidays(2027).filter((h) => h.kind === "half");
    expect(keys(half)).toEqual(["2027-03-08", "2027-05-15", "2027-10-28"]);
  });

  it("counts business days without weekends and holidays", () => {
    const lookup = holidayLookup("tr", 2025, 2027);
    // Mayis 2026: 21 hafta ici; 1, 19, 27, 28, 29 Mayis tatil; 26 Mayis yarim gun.
    const may = countDays(d("2026-05-01"), d("2026-05-31"), lookup);
    expect(may).toMatchObject({ total: 31, work: 16, half: 1, holiday: 5, weekend: 10 });
    const six = countDays(d("2026-05-01"), d("2026-05-31"), lookup, { saturdayWork: true });
    // 4 cumartesi eklenir (30 Mayis bayramin 4. gunu).
    expect(six.work).toBe(20);
  });

  it("adds business days across a bayram", () => {
    const lookup = holidayLookup("tr", 2025, 2027);
    const res = addBusinessDays(d("2026-05-22"), 3, lookup);
    // 25 Pzt, 26 Sal (arefe, yarim gun) -> 2 gun; 27-29 tatil; 1 Haziran Pzt 3. gun
    expect(ymdKey(res.date)).toBe("2026-06-01");
    expect(res.skippedHolidays.map(ymdKey)).toEqual(["2026-05-27", "2026-05-28", "2026-05-29"]);
  });

  it("suggests the Kurban Bayrami 2026 bridge", () => {
    const plan = bridgePlans("tr", 2026).find((p) => ymdKey(p.start) === "2026-05-23" && ymdKey(p.end) === "2026-05-31");
    expect(plan).toMatchObject({ totalDays: 9, leaveCost: 1.5 });
  });
});

describe("US federal holidays", () => {
  it("uses observed dates", () => {
    expect(keys(usFederalHolidays(2026))).toEqual([
      "2026-01-01",
      "2026-01-19",
      "2026-02-16",
      "2026-05-25",
      "2026-06-19",
      "2026-07-03",
      "2026-09-07",
      "2026-10-12",
      "2026-11-11",
      "2026-11-26",
      "2026-12-25",
    ]);
  });

  it("moves New Year's Day to the previous year when it falls on a Saturday", () => {
    const list2027 = usFederalHolidays(2027);
    expect(keys(list2027)).toContain("2027-12-31");
    expect(list2027).toHaveLength(12);
    expect(keys(usFederalHolidays(2028))).not.toContain("2028-01-01");
  });
});
