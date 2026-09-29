import { describe, expect, it } from "vitest";
import { ymdKey } from "../app/converter/time/dateMath";
import { bussUndBettag, easterSunday, GERMAN_STATES, germanHolidayLookup, stateHolidays } from "../app/converter/time/germanHolidays";
import { countDays } from "../app/converter/time/dateMath";

describe("German public holidays", () => {
  it("computes Easter Sunday", () => {
    expect([2025, 2026, 2027, 2028, 2029, 2030].map((y) => ymdKey(easterSunday(y)))).toEqual([
      "2025-04-20",
      "2026-04-05",
      "2027-03-28",
      "2028-04-16",
      "2029-04-01",
      "2030-04-21",
    ]);
  });

  it("computes Buß- und Bettag and Fronleichnam", () => {
    expect(ymdKey(bussUndBettag(2025))).toBe("2025-11-19");
    expect(ymdKey(bussUndBettag(2026))).toBe("2026-11-18");
    expect(ymdKey(bussUndBettag(2027))).toBe("2027-11-17");
    const fron = stateHolidays("by", 2026).find((h) => h.id === "fronleichnam")!;
    expect(ymdKey(fron.date)).toBe("2026-06-04");
  });

  it("has the right number of statewide weekday-relevant holidays in 2026", () => {
    const count = (code: string, partial = false) => stateHolidays(code as never, 2026, { includePartial: partial }).length;
    expect(count("by")).toBe(12);
    expect(count("by", true)).toBe(14); // + Mariä Himmelfahrt (Gemeinden) + Augsburger Friedensfest
    expect(count("bw")).toBe(12);
    expect(count("sl")).toBe(12);
    expect(count("nw")).toBe(11);
    expect(count("rp")).toBe(11);
    expect(count("sn")).toBe(11);
    expect(count("st")).toBe(11);
    expect(count("th")).toBe(11);
    expect(count("mv")).toBe(11);
    expect(count("he")).toBe(10);
    expect(count("be")).toBe(10);
    expect(count("bb")).toBe(10);
    for (const code of ["hb", "hh", "ni", "sh"]) expect(count(code)).toBe(10);
    expect(GERMAN_STATES).toHaveLength(16);
  });

  it("includes Berlin's one-off holiday only in 2025", () => {
    expect(stateHolidays("be", 2025).some((h) => h.id === "tag-der-befreiung")).toBe(true);
    expect(stateHolidays("be", 2026).some((h) => h.id === "tag-der-befreiung")).toBe(false);
  });

  it("counts working days", () => {
    // Mai 2026 in NRW: 21 Wochentage minus 1.5., Christi Himmelfahrt (14.5.) und Pfingstmontag (25.5.) = 18.
    const nw = countDays({ year: 2026, month: 5, day: 1 }, { year: 2026, month: 5, day: 31 }, germanHolidayLookup("nw", 2026, 2026));
    expect(nw.work).toBe(18);
    expect(nw.holiday).toBe(3);
  });
});
