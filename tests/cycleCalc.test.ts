import { describe, expect, it } from "vitest";
import { cycleOn, cycles, dueDate, validCycle } from "../app/converter/cycleCalc";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("adet ve yumurtlama", () => {
  it("28 günlük döngü: yumurtlama 14. gün, doğurgan pencere 9–15. gün", () => {
    const [c] = cycles(d(2026, 1, 1), 28, 5)!;
    expect(c.periodEnd).toEqual(d(2026, 1, 5));
    expect(c.ovulation).toEqual(d(2026, 1, 15));
    expect(c.fertileStart).toEqual(d(2026, 1, 10));
    expect(c.fertileEnd).toEqual(d(2026, 1, 16));
    expect(c.next).toEqual(d(2026, 1, 29));
  });

  it("uzun döngüde yumurtlama sonraki adetten 14 gün önce", () => {
    const [c, c2] = cycles(d(2026, 1, 1), 35, 5)!;
    expect(c.ovulation).toEqual(d(2026, 1, 22));
    expect(c2.start).toEqual(d(2026, 2, 5));
  });

  it("bugünün evresi", () => {
    expect(cycleOn(d(2026, 1, 1), 28, 5, d(2026, 1, 3))!.kind).toBe("period");
    expect(cycleOn(d(2026, 1, 1), 28, 5, d(2026, 1, 12))!.kind).toBe("fertile");
    expect(cycleOn(d(2026, 1, 1), 28, 5, d(2026, 1, 15))!.kind).toBe("ovulation");
    const r = cycleOn(d(2026, 1, 1), 28, 5, d(2026, 1, 20))!;
    expect(r.kind).toBe("none");
    expect(r.cycleDay).toBe(20);
    expect(r.daysToNext).toBe(9);
    // sonraki döngüye geçiş
    const r2 = cycleOn(d(2026, 1, 1), 28, 5, d(2026, 1, 30))!;
    expect(r2.cycleDay).toBe(2);
    expect(r2.kind).toBe("period");
    expect(cycleOn(d(2026, 1, 1), 28, 5, d(2025, 12, 30))).toBeNull();
  });

  it("doğum tarihi ve geçersiz girdiler", () => {
    expect(dueDate(d(2026, 1, 1), 28)).toEqual(d(2026, 10, 8));
    expect(dueDate(d(2026, 1, 1), 32)).toEqual(d(2026, 10, 12));
    expect(validCycle(20, 5)).toBe(false);
    expect(validCycle(28, 0)).toBe(false);
    expect(validCycle(21, 7)).toBe(false);
    expect(cycles(d(2026, 1, 1), 50, 5)).toBeNull();
  });
});
