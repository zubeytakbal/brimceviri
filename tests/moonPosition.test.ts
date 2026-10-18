import { describe, expect, it } from "vitest";
import { moonPositionJde, moonSign, signIndex, signIngresses } from "../app/converter/time/moonPosition";

describe("Ay konumu (Meeus bölüm 47)", () => {
  it("örnek 47.a: 1992 Nisan 12, 0h TD", () => {
    const p = moonPositionJde(2448724.5);
    expect(p.longitude).toBeCloseTo(133.162655, 4);
    expect(p.distance).toBeCloseTo(368409.7, 0);
  });
  it("burç dilimleri", () => {
    expect(signIndex(0)).toBe(0);
    expect(signIndex(359.9)).toBe(11);
    expect(signIndex(133.16)).toBe(4);
  });
  it("burç geçişi bir sonraki burcun sınırında", () => {
    const s = moonSign(new Date(Date.UTC(2026, 9, 18, 12)));
    expect(s.ingress.getTime()).toBeGreaterThan(Date.UTC(2026, 9, 18, 12));
    expect(s.ingress.getTime() - Date.UTC(2026, 9, 18, 12)).toBeLessThan(3.5 * 86400000);
    const list = signIngresses(new Date(Date.UTC(2026, 9, 1)), new Date(Date.UTC(2026, 10, 1)));
    expect(list.length).toBeGreaterThanOrEqual(13);
    expect(list.length).toBeLessThanOrEqual(14);
    for (let i = 1; i < list.length; i++) expect(list[i].sign).toBe((list[i - 1].sign + 1) % 12);
  });
});
