import { describe, expect, it } from "vitest";
import { boilingPointC, interpolateRow, interpolateSat, isaPressureKpa } from "../app/converter/thermal/fluidProps";
import { AIR_1ATM, SAT_STEAM_P, SAT_STEAM_T, WATER_1ATM } from "../app/converter/thermal/fluidTables";

// Referans: standart buhar tablosu değerleri (IAPWS); üretim betiği ayrıca canlı NIST WebBook karşılaştırması yapar.
describe("NIST referans noktaları", () => {
  it("doymuş su 100 °C: p = 1,0142 bar, hfg = 2256,4 kJ/kg", () => {
    const r = SAT_STEAM_T.find((x) => x.t === 100)!;
    expect(r.p).toBeCloseTo(1.0142, 3);
    expect(r.hfg).toBeCloseTo(2256.4, 0);
  });
  it("10 bar doymuş: Tsat ≈ 179,88 °C, hg ≈ 2777,1 kJ/kg", () => {
    const r = SAT_STEAM_P.find((x) => x.p === 10)!;
    expect(r.t).toBeCloseTo(179.88, 1);
    expect(r.hg).toBeCloseTo(2777.1, 0);
  });
  it("su 20 °C: ρ ≈ 998,2 kg/m³, μ ≈ 1,0016 mPa·s", () => {
    const r = WATER_1ATM.find((x) => x.t === 20)!;
    expect(r.rho).toBeCloseTo(998.2, 0);
    expect(r.mu / 1000).toBeCloseTo(1.0016, 3);
  });
  it("hava 20 °C, 1 atm: ρ ≈ 1,204 kg/m³", () => {
    expect(AIR_1ATM.find((x) => x.t === 20)!.rho).toBeCloseTo(1.204, 2);
  });
});

describe("yardımcılar", () => {
  it("1 atm'de kaynama ≈ 99,97 °C", () => {
    expect(boilingPointC(101.325)!).toBeCloseTo(99.97, 1);
  });
  it("ISA: deniz seviyesi 101,325 kPa; 2000 m ≈ 79,5 kPa", () => {
    expect(isaPressureKpa(0)).toBeCloseTo(101.325, 6);
    expect(isaPressureKpa(2000)).toBeCloseTo(79.5, 1);
  });
  it("Everest (8849 m) suyu yaklaşık 70 °C'de kaynar", () => {
    const t = boilingPointC(isaPressureKpa(8849))!;
    expect(t).toBeGreaterThan(69);
    expect(t).toBeLessThan(72);
  });
  it("ara değer tablo noktasında tablo değerini verir", () => {
    const r = interpolateRow(WATER_1ATM, "t", 40)!;
    expect(r.rho).toBeCloseTo(WATER_1ATM.find((x) => x.t === 40)!.rho, 9);
  });
});

describe("doymuş buhar ara değeri (CoolProp IAPWS-95 ile)", () => {
  const near = (a: number, b: number, rel: number) => expect(Math.abs(a - b) / b).toBeLessThan(rel);
  it("sıcaklıkla: 105 °C ve 365 °C", () => {
    const a = interpolateSat(SAT_STEAM_T, "t", 105)!;
    near(a.p, 1.20903, 0.003);
    near(a.hfg, 2243.12, 0.001);
    const b = interpolateSat(SAT_STEAM_T, "t", 365)!;
    near(b.p, 198.214, 0.002);
    near(b.hfg, 605.18, 0.02);
  });
  it("basınçla: 3,5 bar ve 110 bar", () => {
    const a = interpolateSat(SAT_STEAM_P, "p", 3.5)!;
    expect(a.t).toBeCloseTo(138.86, 0);
    near(a.vg, 0.52418, 0.002);
    const b = interpolateSat(SAT_STEAM_P, "p", 110)!;
    expect(b.t).toBeCloseTo(318.08, 0);
    near(b.hg, 2706.35, 0.002);
  });
  it("tablo dışı değerde null döner", () => {
    expect(interpolateSat(SAT_STEAM_T, "t", 400)).toBeNull();
    expect(interpolateSat(SAT_STEAM_P, "p", 0)).toBeNull();
  });
});
