import { describe, expect, it } from "vitest";
import {
  ASGARI_BRUT,
  bordroAy,
  nettenBrute,
  SGK_TAVAN,
  yillikBordro,
} from "../app/converter/turkishMaas";

const std = { emekli: false, tesvikPuan: 0 as const };

describe("Brütten nete maaş 2026", () => {
  it("gives the official minimum wage net and employer cost", () => {
    const y = yillikBordro(ASGARI_BRUT, std);
    for (const a of y.aylar) {
      expect(a.net).toBeCloseTo(28075.5, 2);
      expect(a.gelirVergisi).toBeCloseTo(0, 6);
      expect(a.damga).toBe(0);
    }
    expect(bordroAy(1, ASGARI_BRUT, 0, std).isverenMaliyeti).toBeCloseTo(
      40874.63,
      2,
    );
    expect(
      bordroAy(1, ASGARI_BRUT, 0, { emekli: false, tesvikPuan: 2 })
        .isverenMaliyeti,
    ).toBeCloseTo(40214.03, 2);
    expect(
      bordroAy(1, ASGARI_BRUT, 0, { emekli: false, tesvikPuan: 5 })
        .isverenMaliyeti,
    ).toBeCloseTo(39223.13, 2);
  });

  it("matches the reference case of 50.000 TL gross in January", () => {
    const a = bordroAy(1, 50000, 0, std);
    expect(a.sgk).toBeCloseTo(7000, 6);
    expect(a.issizlik).toBeCloseTo(500, 6);
    expect(a.gelirVergisi).toBeCloseTo(2163.68, 1);
    expect(a.net).toBeCloseTo(40207.52, 1);
  });

  it("net falls when the cumulative base reaches a higher bracket", () => {
    const y = yillikBordro(50000, std);
    expect(y.aylar[11].net).toBeLessThan(y.aylar[0].net);
    // 42.500 × 5 = 212.500 > 190.000 → Mayıs'ta %20 dilimine geçiş
    expect(y.aylar[4].net).toBeLessThan(y.aylar[3].net);
  });

  it("caps SGK at 9 × minimum wage", () => {
    expect(SGK_TAVAN).toBe(297270);
    expect(bordroAy(1, 400000, 0, std).sgk).toBeCloseTo(297270 * 0.14, 6);
  });

  it("handles retirees (SGDP) and net-to-gross", () => {
    const e = bordroAy(1, 50000, 0, { emekli: true, tesvikPuan: 0 });
    expect(e.sgk).toBeCloseTo(3750, 6);
    expect(e.issizlik).toBe(0);
    const r = nettenBrute(40207.52, std);
    expect(r.aylar[0].brut).toBeCloseTo(50000, 0);
    for (const a of r.aylar) expect(a.net).toBeCloseTo(40207.52, 1);
    expect(r.aylar[11].brut).toBeGreaterThan(r.aylar[0].brut);
  });
});
