import { describe, expect, it } from "vitest";
import {
  boxAreaRoundedMm2,
  boxAreaSharpMm2,
  boxOuterCornerRadius,
  kgPerMeter,
  METALS,
  parseTr,
  pipeAreaMm2,
  pipeKgPerMeter,
  plateKgPerM2,
  plateMassKg,
  rebarKgPerMeter,
  rebarKgPerMeterRuleOfThumb,
  rebarMetersForMass,
} from "../app/converter/metal/metalWeight";

describe("inşaat demiri", () => {
  // Yayımlanmış teorik ağırlık tablosu (kg/m, 3 basamak).
  const published: Array<[number, number]> = [
    [8, 0.395],
    [10, 0.617],
    [12, 0.888],
    [14, 1.208],
    [16, 1.578],
    [20, 2.466],
    [25, 3.853],
    [32, 6.313],
  ];
  it.each(published)("Ø%i yayımlanmış değerle uyuşur", (d, kg) => {
    expect(rebarKgPerMeter(d)).toBeCloseTo(kg, 3);
  });

  it("d²/162 yaklaşımı %0,2 içinde kalır", () => {
    for (const d of [8, 12, 20, 40]) {
      expect(Math.abs(rebarKgPerMeterRuleOfThumb(d) / rebarKgPerMeter(d) - 1)).toBeLessThan(0.002);
    }
  });

  it("1 ton Ø12 yaklaşık 1126 m eder", () => {
    expect(rebarMetersForMass(12, 1000)).toBeCloseTo(1126.1, 0);
  });
});

describe("sac", () => {
  it("1 mm çelik sac 7,85 kg/m²", () => {
    expect(plateKgPerM2(1)).toBeCloseTo(7.85, 6);
  });
  it("1000×2000×2 mm çelik sac 31,4 kg", () => {
    expect(plateMassKg(2000, 1000, 2)).toBeCloseTo(31.4, 6);
  });
});

describe("boru", () => {
  it("π(D−t)t, π/4(D²−d²) ile aynıdır", () => {
    const D = 60.3;
    const t = 3.6;
    const d = D - 2 * t;
    expect(pipeAreaMm2(D, t)).toBeCloseTo((Math.PI / 4) * (D * D - d * d), 9);
  });
  it("yoğunluk ölçeklenir", () => {
    const steel = pipeKgPerMeter(48.3, 3);
    expect(pipeKgPerMeter(48.3, 3, 2700) / steel).toBeCloseTo(2700 / 7850, 9);
  });
});

describe("kutu profil", () => {
  it("köşe yarıçapı EN 10219-2 aralıklarının ortası", () => {
    expect(boxOuterCornerRadius(3)).toBe(6);
    expect(boxOuterCornerRadius(8)).toBe(20);
    expect(boxOuterCornerRadius(12)).toBe(36);
  });

  it("40×40×3: üretici tabloları keskin ve yuvarlak köşe hesabıyla uyuşur", () => {
    const sharp = kgPerMeter(boxAreaSharpMm2(40, 40, 3));
    const rounded = kgPerMeter(boxAreaRoundedMm2(40, 40, 3));
    // Öztürk Boru tablosu 3,46 kg/m (keskin köşeye yakın), Yakup Yılmaz Boru 3,33 kg/m (yuvarlak köşeye yakın).
    expect(Math.abs(sharp / 3.46 - 1)).toBeLessThan(0.01);
    expect(Math.abs(rounded / 3.33 - 1)).toBeLessThan(0.01);
    expect(rounded).toBeLessThan(sharp);
  });
});

describe("yardımcılar", () => {
  it("metal yoğunlukları malzeme tablosundan okunur", () => {
    expect(METALS.find((m) => m.id === "steel")?.density).toBe(7850);
    expect(METALS.find((m) => m.id === "aluminum")?.density).toBe(2700);
  });
  it("Türkçe sayı girişi", () => {
    expect(parseTr("12,5")).toBe(12.5);
    expect(parseTr("12.5")).toBe(12.5);
    expect(parseTr("1.000")).toBe(1000);
    expect(parseTr("1.250,75")).toBe(1250.75);
    expect(parseTr("0")).toBeNull();
    expect(parseTr("abc")).toBeNull();
  });
});
