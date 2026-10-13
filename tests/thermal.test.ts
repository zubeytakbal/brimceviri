import { describe, expect, it } from "vitest";
import { AIR, exchangerArea, headFromPressure, heatLoss, hydraulicPower, lmtd, sensibleHeat, terminalDifferences, uValue, WATER } from "../app/converter/thermal/thermal";

describe("U değeri", () => {
  it("tek katman: R = Rsi + d/λ + Rse", () => {
    const r = uValue([{ thicknessM: 0.2, lambda: 1.4 }]);
    expect(r.R).toBeCloseTo(0.13 + 0.2 / 1.4 + 0.04, 12);
    expect(r.U).toBeCloseTo(1 / r.R, 12);
  });
  it("yalıtım eklemek U'yu düşürür ve katmanlar toplanır", () => {
    const bare = uValue([{ thicknessM: 0.19, lambda: 0.45 }]);
    const ins = uValue([{ thicknessM: 0.19, lambda: 0.45 }, { thicknessM: 0.05, lambda: 0.035 }]);
    expect(ins.U).toBeLessThan(bare.U);
    expect(ins.R - bare.R).toBeCloseTo(0.05 / 0.035, 12);
  });
  it("Q = U·A·ΔT", () => {
    expect(heatLoss(0.5, 10, 20)).toBe(100);
  });
});

describe("LMTD", () => {
  it("karşı akış örneği", () => {
    const [a, b] = terminalDifferences(90, 60, 20, 50, "counter");
    expect([a, b]).toEqual([40, 40]);
    expect(lmtd(a, b)).toBe(40);
  });
  it("bilinen değer: ΔT1 = 60, ΔT2 = 20 → 36,41", () => {
    expect(lmtd(60, 20)).toBeCloseTo(40 / Math.log(3), 9);
    expect(lmtd(60, 20)).toBeCloseTo(36.41, 2);
  });
  it("simetrik ve limitte aritmetik ortalamaya yakınsar", () => {
    expect(lmtd(20, 60)).toBeCloseTo(lmtd(60, 20)!, 12);
    expect(lmtd(30, 30.000001)).toBeCloseTo(30, 5);
  });
  it("sıcaklık geçişi (çapraz) geçersiz", () => {
    expect(lmtd(-5, 10)).toBeNull();
  });
  it("alan A = Q/(U·LMTD)", () => {
    expect(exchangerArea(100000, 1000, 40)).toBeCloseTo(2.5, 12);
  });
});

describe("debiden ısı yükü", () => {
  it("1000 m³/h hava, 10 K ≈ 3,35 kW", () => {
    const q = sensibleHeat((1000 / 3600) * AIR.rho, AIR.cp, 10);
    expect(q / 1000).toBeCloseTo(3.35, 2);
  });
  it("su: 1 m³/h, 20 K ≈ 23,2 kW", () => {
    expect(sensibleHeat((1 / 3600) * WATER.rho, WATER.cp, 20) / 1000).toBeCloseTo(23.22, 2);
  });
});

describe("pompa", () => {
  it("10 m³/h, 30 m su ≈ 817 W hidrolik güç", () => {
    expect(hydraulicPower(1000, 10 / 3600, 30)).toBeCloseTo(817.2, 1);
  });
  it("1 bar ≈ 10,2 m su sütunu", () => {
    expect(headFromPressure(1e5, 1000)).toBeCloseTo(10.197, 3);
  });
});
