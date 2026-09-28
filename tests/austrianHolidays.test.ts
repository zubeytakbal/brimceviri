import { describe, expect, it } from "vitest";
import { austrianHolidays, fenstertage, weekdayHolidayCount } from "../app/converter/time/austrianHolidays";

const key = (d: { year: number; month: number; day: number }) => `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;

describe("austrianHolidays", () => {
  it("lists 13 statutory holidays with the 2026 movable dates", () => {
    const list = austrianHolidays(2026);
    expect(list).toHaveLength(13);
    const byId = Object.fromEntries(list.map((h) => [h.id, key(h.date)]));
    expect(byId.ostermontag).toBe("2026-04-06");
    expect(byId["christi-himmelfahrt"]).toBe("2026-05-14");
    expect(byId.pfingstmontag).toBe("2026-05-25");
    expect(byId.fronleichnam).toBe("2026-06-04");
    expect(list.some((h) => h.id === "karfreitag")).toBe(false);
  });

  it("matches the 2027 movable dates", () => {
    const byId = Object.fromEntries(austrianHolidays(2027).map((h) => [h.id, key(h.date)]));
    expect(byId.ostermontag).toBe("2027-03-29");
    expect(byId["christi-himmelfahrt"]).toBe("2027-05-06");
    expect(byId.pfingstmontag).toBe("2027-05-17");
    expect(byId.fronleichnam).toBe("2027-05-27");
  });

  it("finds Fenstertage next to Tuesday and Thursday holidays", () => {
    // 2026: Neujahr Do 1.1., Heilige Drei Könige Di 6.1., Christi Himmelfahrt Do 14.5., Fronleichnam Do 4.6., Mariä Himmelfahrt Sa, Allerheiligen So, 8.12. Di
    const bridges = fenstertage(2026).map((f) => key(f.bridge));
    expect(bridges).toEqual(["2026-01-02", "2026-01-05", "2026-05-15", "2026-06-05", "2026-12-07"]);
    expect(weekdayHolidayCount(2026)).toBe(10);
  });
});
