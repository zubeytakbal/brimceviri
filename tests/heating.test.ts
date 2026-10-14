import { describe, expect, it } from "vitest";
import { dhwFlowLpm, dhwPowerKw, DT_NOMINAL, panelLength, radiatorDeltaT, radiatorFactor, roomHeatLoss, sectionsNeeded } from "../app/converter/plumbing/heating";

describe("EN 442 radyatör düzeltmesi", () => {
  it("75/65/20 anma farkı 49,83 K ve çarpan 1", () => {
    expect(DT_NOMINAL).toBeCloseTo(49.83, 2);
    expect(radiatorFactor(75, 65, 20)!.factor).toBeCloseTo(1, 9);
  });
  it("55/45/20'de güç yaklaşık yarıya iner (n = 1,3)", () => {
    const r = radiatorFactor(55, 45, 20)!;
    expect(r.dT).toBeCloseTo(29.72, 1);
    expect(r.factor).toBeCloseTo(Math.pow(29.72 / 49.83, 1.3), 3);
    expect(r.factor).toBeLessThan(0.55);
  });
  it("geçersiz sıcaklıklarda null", () => {
    expect(radiatorDeltaT(40, 50, 20)).toBeNull();
    expect(radiatorDeltaT(30, 18, 20)).toBeNull();
  });
});

describe("oda ısı kaybı", () => {
  it("iletim + havalandırma", () => {
    const r = roomHeatLoss({ wallArea: 12, wallU: 0.6, windowArea: 2, windowU: 2.8, volume: 40, airChange: 0.5, tIn: 20, tOut: -5 });
    expect(r.wall).toBeCloseTo(0.6 * 10 * 25, 9);
    expect(r.window).toBeCloseTo(2.8 * 2 * 25, 9);
    expect(r.ventilation).toBeCloseTo(0.34 * 0.5 * 40 * 25, 9);
    expect(r.total).toBeCloseTo(150 + 140 + 170, 9);
  });
  it("dilim ve panel boyu", () => {
    expect(sectionsNeeded(1000, 120, 1)).toBe(9);
    expect(panelLength(1000, 1800, 1).standard).toBe(0.6);
  });
});

describe("kullanma sıcak suyu", () => {
  it("24 kW, ΔT 25 K ile ≈ 13,8 L/dk", () => {
    expect(dhwFlowLpm(24, 25)).toBeCloseTo(13.76, 1);
    expect(dhwPowerKw(10, 30)).toBeCloseTo(20.93, 2);
  });
});
