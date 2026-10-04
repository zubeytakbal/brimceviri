import { describe, expect, it } from "vitest";
import { calculateEnthalpy, type EnthalpyCalculationInput } from "../app/converter/enthalpyCalculator";

const base: EnthalpyCalculationInput = {
  target: "isi", isiJoule: 2090, kutleGram: 500, ozgulIsi: 4.18, sicaklikDegisimi: 1,
};

describe("kalorimetri fiziksel sonuç kontrolü", () => {
  it("suyun ısı hesabını ve ters hesaplarını doğrular", () => {
    expect(calculateEnthalpy(base)?.isiJoule).toBeCloseTo(2090);
    expect(calculateEnthalpy({ ...base, target: "kutle" })?.kutleGram).toBeCloseTo(500);
    expect(calculateEnthalpy({ ...base, target: "ozgulIsi" })?.ozgulIsi).toBeCloseTo(4.18);
    expect(calculateEnthalpy({ ...base, target: "sicaklikDegisimi" })?.sicaklikDegisimi).toBeCloseTo(1);
  });
  it("soğumada negatif ısıya izin verir", () => {
    expect(calculateEnthalpy({ ...base, sicaklikDegisimi: -1 })?.isiJoule).toBeCloseTo(-2090);
    expect(calculateEnthalpy({ ...base, target: "kutle", isiJoule: -2090, sicaklikDegisimi: -1 })?.kutleGram).toBeCloseTo(500);
  });
  it("negatif kütle ve özgül ısı üreten ters hesapları reddeder", () => {
    for (const target of ["kutle", "ozgulIsi"] as const) {
      expect(calculateEnthalpy({ ...base, target, isiJoule: -2090 })).toBeNull();
      expect(calculateEnthalpy({ ...base, target, isiJoule: 0 })).toBeNull();
    }
  });
  it("sıfıra bölmeyi ve sonlu girdilerin taşmasını reddeder", () => {
    expect(calculateEnthalpy({ ...base, target: "kutle", sicaklikDegisimi: 0 })).toBeNull();
    expect(calculateEnthalpy({ ...base, kutleGram: 1e308, ozgulIsi: 1e308 })).toBeNull();
  });
});
