import { describe, expect, it } from "vitest";
import { hasat, ON_AYARLI, URUNLER } from "../app/converter/ekimNormu";
import { calculateSeedRate } from "../app/converter/seedRateCalculator";

describe("ekim normu", () => {
  it("ön ayarlar (çimlenme %90, saflık %98) tablodaki tohum aralığına düşer", () => {
    for (const u of ON_AYARLI) {
      const r = calculateSeedRate({ targetPlantsPerM2: u.bitki!, thousandGrainWeightG: u.bdA!, germinationPercent: 90, purityPercent: 98, areaDa: 1 })!;
      expect(r.seedKgPerDa, u.ad).toBeGreaterThanOrEqual(u.tohum[0] * 0.98);
      expect(r.seedKgPerDa, u.ad).toBeLessThanOrEqual(u.tohum[1] * 1.02);
    }
  });
  it("aralıklar tutarlı, destek tavanı tohum üst sınırının altında kalmaz", () => {
    for (const u of URUNLER) {
      expect(u.tohum[0]).toBeLessThan(u.tohum[1]);
      expect(u.verim[0]).toBeLessThan(u.verim[1]);
      if (u.destek !== null) expect(u.destek, u.ad).toBeGreaterThanOrEqual(u.tohum[0]);
    }
    expect(new Set(URUNLER.map((u) => u.id)).size).toBe(URUNLER.length);
  });
  it("hasat", () => {
    expect(hasat(400, 25)).toEqual({ toplam: 10000, ton: 10, cuval: 200 });
    expect(hasat(0, 1)).toBeNull();
  });
});
