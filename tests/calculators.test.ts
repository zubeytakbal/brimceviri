import { describe, expect, it } from "vitest";
import { calculateBmi } from "../app/converter/bmiCalculator";
import { calculateEbobEkok, primeFactorize } from "../app/converter/ebobEkokCalculator";
import {
  calculateSpeedometerDeviation,
  calculateTireSize,
} from "../app/converter/tireSizeCalculator";

describe("calculateBmi", () => {
  it("VKI ve Mifflin-St Jeor bazal metabolizmasini hesaplar", () => {
    const result = calculateBmi({
      heightCm: 180,
      weightKg: 81,
      age: 30,
      gender: "male",
      activityLevel: "sedentary",
    });
    expect(result?.bmi).toBeCloseTo(25, 6);
    expect(result?.category).toBe("overweight");
    expect(result?.basalMetabolicRate).toBeCloseTo(10 * 81 + 6.25 * 180 - 5 * 30 + 5, 6);
  });

  it("kategori sinirlarini dogru uygular", () => {
    const bmiFor = (weightKg: number) =>
      calculateBmi({ heightCm: 100, weightKg, age: 30, gender: "female", activityLevel: "sedentary" })?.category;
    expect(bmiFor(18.4)).toBe("underweight");
    expect(bmiFor(18.5)).toBe("normal");
    expect(bmiFor(29.9)).toBe("overweight");
    expect(bmiFor(30)).toBe("obese");
  });

  it("gecersiz girdide null dondurur", () => {
    expect(
      calculateBmi({ heightCm: 0, weightKg: 70, age: 30, gender: "male", activityLevel: "sedentary" })
    ).toBeNull();
  });
});

describe("ebob / ekok", () => {
  it("asal carpanlara ayirir", () => {
    expect(primeFactorize(360)).toEqual([
      { prime: 2, exponent: 3 },
      { prime: 3, exponent: 2 },
      { prime: 5, exponent: 1 },
    ]);
  });

  it("ebob ve ekok hesaplar", () => {
    const result = calculateEbobEkok([12, 18, 30]);
    expect(result?.ebob).toBe(6);
    expect(result?.ekok).toBe(180);
  });

  it("gecersiz girdide null dondurur", () => {
    expect(calculateEbobEkok([12])).toBeNull();
    expect(calculateEbobEkok([12, 0])).toBeNull();
    expect(calculateEbobEkok([12, 2.5])).toBeNull();
  });
});

describe("lastik ebati", () => {
  it("205/55 R16 olculerini hesaplar", () => {
    const result = calculateTireSize({ widthMm: 205, aspectRatioPercent: 55, rimDiameterInch: 16 });
    expect(result?.sidewallHeightMm).toBeCloseTo(112.75, 6);
    expect(result?.outerDiameterMm).toBeCloseTo(631.9, 6);
  });

  it("ayni ebatta sapma sifirdir", () => {
    const size = { widthMm: 205, aspectRatioPercent: 55, rimDiameterInch: 16 };
    const result = calculateSpeedometerDeviation(size, size);
    expect(result?.deviationPercent).toBeCloseTo(0, 9);
    expect(result?.actualSpeedAt100).toBeCloseTo(100, 9);
  });
});
