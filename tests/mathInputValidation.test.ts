import { describe, expect, it } from "vitest";
import { calculateStatistics } from "../app/converter/statisticsCalculator";
import { calculateFraction, simplifyFraction } from "../app/converter/fractionCalculator";

describe("istatistik veri bütünlüğü", () => {
  it("geçersiz öğeleri ve sonsuz değerleri sessizce atmaz", () => {
    for (const raw of ["10; yanlış; 20", "10,NaN,20", "10; 1e309; 20"]) {
      expect(calculateStatistics(raw).success).toBe(false);
    }
  });
  it("Türkçe ondalıkları ve mevcut örnek listeleri korur", () => {
    const decimal = calculateStatistics("1,5; 2,5; 3,5");
    expect(decimal.success).toBe(true);
    if (decimal.success) expect(decimal.result.mean).toBe(2.5);
    const grades = calculateStatistics("65, 70, 70, 80, 85, 90, 95");
    expect(grades.success).toBe(true);
    if (grades.success) { expect(grades.result.count).toBe(7); expect(grades.result.median).toBe(80); }
  });
  it("örneklem ve anakütle varyansını ayırır", () => {
    const outcome = calculateStatistics("1; 2; 3");
    if (!outcome.success) throw new Error(outcome.message);
    expect(outcome.result.populationVariance).toBeCloseTo(2 / 3);
    expect(outcome.result.sampleVariance).toBe(1);
    expect(calculateStatistics("1e308; 1e308").success).toBe(false);
  });
});

describe("kesirlerde tam sayı doğruluğu", () => {
  it("dört işlemi ve negatif payda sadeleştirmesini korur", () => {
    for (const [operation, numerator, denominator] of [
      ["toplama", 5, 6], ["cikarma", 1, 6], ["carpma", 1, 6], ["bolme", 3, 2],
    ] as const) {
      const result = calculateFraction({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }, operation);
      expect(result?.simplifiedNumerator).toBe(numerator);
      expect(result?.simplifiedDenominator).toBe(denominator);
    }
    expect(simplifyFraction({ numerator: 6, denominator: -8 })).toMatchObject({ numerator: -3, denominator: 4 });
  });
  it("sıfıra bölmeyi ve güvenle temsil edilemeyen girdileri reddeder", () => {
    expect(calculateFraction({ numerator: 1, denominator: 2 }, { numerator: 0, denominator: 1 }, "bolme")).toBeNull();
    expect(simplifyFraction({ numerator: 1e20, denominator: 3 })).toBeNull();
  });
  it("çarpımları yuvarlayarak yanlış sonuç üretmez", () => {
    expect(calculateFraction({ numerator: Number.MAX_SAFE_INTEGER, denominator: 1 }, { numerator: 2, denominator: 1 }, "carpma")).toBeNull();
    const result = calculateFraction({ numerator: Number.MAX_SAFE_INTEGER, denominator: 1 }, { numerator: Number.MAX_SAFE_INTEGER, denominator: 1 }, "cikarma");
    expect(result?.simplifiedNumerator).toBe(0);
  });
});
