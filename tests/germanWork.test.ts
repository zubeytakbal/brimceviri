import { describe, expect, it } from "vitest";
import { mindesturlaub, pauschaleProTag, pendlerpauschale, rundenBUrlG, teilurlaub, urlaubUmrechnen } from "../app/converter/germanWork";

const base = { km: 25, tage: 220, jahr: 2026 as const, auto: true, homeofficeTage: 0, sonstige: 0, grenzsteuersatz: 30 };

describe("Pendlerpauschale", () => {
  it("uses 0.38 from the first km in 2026 and the split rate in 2025", () => {
    expect(pauschaleProTag(25, 2026)).toBeCloseTo(9.5, 10);
    expect(pauschaleProTag(25, 2025)).toBeCloseTo(7.9, 10);
    expect(pauschaleProTag(20.9, 2025)).toBeCloseTo(6, 10);
    expect(pauschaleProTag(0, 2026)).toBe(0);
  });
  it("computes the yearly amount, cap and savings", () => {
    const r = pendlerpauschale(base);
    expect(r.entfernung).toBeCloseTo(2090, 6);
    expect(r.ueberPauschbetrag).toBeCloseTo(860, 6);
    expect(r.ersparnis).toBeCloseTo(258, 6);
    expect(pendlerpauschale({ ...base, jahr: 2025 }).entfernung).toBeCloseTo(1738, 6);
    const bahn = pendlerpauschale({ ...base, km: 80, auto: false });
    expect(bahn.gedeckelt).toBe(true);
    expect(bahn.entfernung).toBe(4500);
    expect(pendlerpauschale({ ...base, km: 80 }).entfernung).toBeCloseTo(6688, 6);
    expect(pendlerpauschale({ ...base, km: 0, homeofficeTage: 250 }).homeoffice).toBe(1260);
    expect(pendlerpauschale({ ...base, km: 15 }).entfernung).toBeCloseTo(1254, 6);
  });
});

describe("Urlaub", () => {
  it("converts part time and minimum leave", () => {
    expect(urlaubUmrechnen(30, 5, 3)).toBe(18);
    expect(mindesturlaub(6)).toBe(24);
    expect(mindesturlaub(5)).toBe(20);
    expect(mindesturlaub(3)).toBe(12);
  });
  it("prorates and rounds per § 5 BUrlG", () => {
    expect(teilurlaub(30, 7)).toBe(17.5);
    expect(rundenBUrlG(17.5)).toBe(18);
    expect(rundenBUrlG(teilurlaub(28, 5))).toBe(12);
    expect(rundenBUrlG(teilurlaub(26, 1))).toBe(2.17);
  });
});
