import { describe, expect, it } from "vitest";
import {
  mutterschaftsgeld,
  mutterschutz,
  naegele,
  schutzfristFehlgeburt,
  sswAm,
} from "../app/converter/germanMutterschutz";
import { ymdKey } from "../app/converter/time/dateMath";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("Mutterschutz", () => {
  it("starts 6 weeks before and ends 8 weeks after the due date", () => {
    const r = mutterschutz({ termin: d("2026-06-30"), besonderheit: "keine" });
    expect(ymdKey(r.beginn)).toBe("2026-05-19");
    expect(ymdKey(r.ende)).toBe("2026-08-25");
    expect(r.tage).toBe(99);
    expect(sswAm(d("2026-06-30"), r.beginn)).toEqual({ wochen: 34, tage: 0 });
  });

  it("appends the days lost through an early birth", () => {
    const r = mutterschutz({
      termin: d("2026-06-30"),
      geburt: d("2026-06-20"),
      besonderheit: "keine",
    });
    expect(r.verlaengerung).toBe(10);
    expect(ymdKey(r.ende)).toBe("2026-08-25");
    const f = mutterschutz({
      termin: d("2026-06-30"),
      geburt: d("2026-06-20"),
      besonderheit: "fruehgeburt",
    });
    expect(ymdKey(f.ende)).toBe("2026-09-22");
  });

  it("keeps 8 weeks after a late birth", () => {
    const r = mutterschutz({
      termin: d("2026-06-30"),
      geburt: d("2026-07-05"),
      besonderheit: "keine",
    });
    expect(ymdKey(r.ende)).toBe("2026-08-30");
    expect(r.tage).toBe(104);
  });

  it("computes Kündigungsschutz and Elternzeit deadlines", () => {
    const r = mutterschutz({ termin: d("2026-06-30"), besonderheit: "keine" });
    expect(ymdKey(r.kuendigungsschutzBis)).toBe("2026-10-30");
    expect(ymdKey(r.elternzeitAb)).toBe("2026-08-26");
    expect(ymdKey(r.elternzeitAnmeldenBis)).toBe("2026-07-08");
  });

  it("uses Naegele's rule and the staggered miscarriage periods", () => {
    expect(ymdKey(naegele(d("2026-01-01")))).toBe("2026-10-08");
    expect(ymdKey(naegele(d("2026-01-01"), 30))).toBe("2026-10-10");
    expect([12, 13, 16, 17, 19, 20, 23].map(schutzfristFehlgeburt)).toEqual([
      0, 2, 2, 6, 6, 8, 8,
    ]);
  });

  it("splits Mutterschaftsgeld between Krankenkasse and employer", () => {
    const g = mutterschaftsgeld(6600, 99, "gesetzlich");
    expect(g.tagesnetto).toBeCloseTo(73.33, 2);
    expect(g.kasse).toBe(13 * 99);
    expect(g.zuschuss).toBeCloseTo(60.333 * 99, 0);
    expect(mutterschaftsgeld(6600, 99, "privat-familie").kasse).toBe(210);
    expect(mutterschaftsgeld(900, 99, "gesetzlich").zuschuss).toBe(0);
  });
});
