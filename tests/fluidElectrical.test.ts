import { describe, expect, it } from "vitest";
import { annulusArea, cylinderForce, freeAirVolume, pistonArea, pistonSpeed, requiredFlow, requiredPressure, strokeVolume } from "../app/converter/fluidpower/cylinder";
import { capacitanceForVar, capacitancePerPhase, compensationVar, currentFromApparent, decodeBands, encodeValue, powerTriangle, slipPercent, synchronousSpeed } from "../app/converter/electrical/power";

describe("silindir", () => {
  it("Ø100 piston 100 bar ≈ 78,5 kN itme", () => {
    expect(cylinderForce(100, pistonArea(100))).toBeCloseTo(78539.8, 0);
  });
  it("çekme alanı rot kadar azalır", () => {
    expect(annulusArea(100, 56)).toBeCloseTo(pistonArea(100) - pistonArea(56), 9);
  });
  it("basınç ↔ kuvvet tersinir", () => {
    const A = pistonArea(63);
    expect(requiredPressure(cylinderForce(160, A), A)).toBeCloseTo(160, 9);
  });
  it("hız ↔ debi tersinir; Ø50, 10 L/dk ≈ 0,0849 m/s", () => {
    const A = pistonArea(50);
    expect(pistonSpeed(10, A)).toBeCloseTo(0.08488, 4);
    expect(requiredFlow(pistonSpeed(10, A), A)).toBeCloseTo(10, 9);
  });
  it("Ø50 × 100 mm strok hacmi 0,196 L; 6 bar'da serbest hava ≈ 6,92 kat", () => {
    const V = strokeVolume(pistonArea(50), 100);
    expect(V).toBeCloseTo(0.19635, 4);
    expect(freeAirVolume(V, 6) / V).toBeCloseTo(6.9216, 3);
  });
});

describe("elektrik", () => {
  it("100 kVA, 400 V üç faz ≈ 144,3 A", () => {
    expect(currentFromApparent(100e3, 400, "three")).toBeCloseTo(144.34, 2);
  });
  it("güç üçgeni: S² = P² + Q²", () => {
    const t = powerTriangle(100, 0.8);
    expect(t.P).toBeCloseTo(80, 9);
    expect(t.Q).toBeCloseTo(60, 9);
  });
  it("kompanzasyon: 100 kW, cosφ 0,8 → 0,95 ≈ 42,13 kVAr", () => {
    expect(compensationVar(100e3, 0.8, 0.95) / 1000).toBeCloseTo(42.13, 2);
  });
  it("kapasite: 1 kVAr, 230 V, 50 Hz ≈ 60,2 µF", () => {
    expect(capacitanceForVar(1000, 230, 50) * 1e6).toBeCloseTo(60.17, 2);
  });
  it("üçgen bağlı bankta faz kapasitesi yıldızın 1/3'ü", () => {
    expect(capacitancePerPhase(30e3, 400, 50, "delta") * 3).toBeCloseTo(capacitancePerPhase(30e3, 400, 50, "star"), 12);
  });
  it("50 Hz 4 kutup = 1500 dev/dk; 1450'de %3,33 kayma", () => {
    expect(synchronousSpeed(50, 4)).toBe(1500);
    expect(slipPercent(1500, 1450)).toBeCloseTo(3.333, 3);
  });
  it("renk kodu: kahverengi-siyah-kırmızı-altın = 1 kΩ ±%5", () => {
    expect(decodeBands(["brown", "black", "red", "gold"])).toMatchObject({ ohms: 1000, tolerance: 5 });
    expect(decodeBands(["yellow", "violet", "orange", "gold"])!.ohms).toBe(47000);
    expect(decodeBands(["brown", "black", "black", "brown", "brown"])).toMatchObject({ ohms: 1000, tolerance: 1 });
    expect(decodeBands(["red", "red", "gold", "gold"])!.ohms).toBeCloseTo(2.2, 9);
  });
  it("değerden renk: 4,7 kΩ ve 220 Ω", () => {
    expect(encodeValue(4700, 4)).toEqual(["yellow", "violet", "red"]);
    expect(encodeValue(220, 5)).toEqual(["red", "red", "black", "black"]);
    expect(encodeValue(2.2, 4)).toEqual(["red", "red", "gold"]);
  });
});
