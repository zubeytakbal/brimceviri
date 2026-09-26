// Ingilizceye tasinan araclarin ABD surum motorlari -- bilinen referanslar.
import { describe, expect, it } from "vitest";
import { chlorineDose, depreciationSchedule, poolVolume, standardDrinks } from "../app/converter/englishToolFormulas";

describe("havuz", () => {
  it("16 x 32 ft, 3-8 ft derinlik ~ 21,062 galon", () => {
    expect(poolVolume("rectangle", 32, 16, 3, 8)!.gallons).toBeCloseTo(32 * 16 * 5.5 * 7.48051948, 6);
  });
  it("24 ft yuvarlak, 4 ft ~ 13,536 galon", () => expect(poolVolume("round", 24, 0, 4, 0)!.gallons).toBeCloseTo(13536.4, 0));
});

describe("klor", () => {
  it("10,000 gal, +1 ppm = ~12.8 fl oz %10 sivi klor", () => {
    const result = chlorineDose(10000, 0, 1, "liquid-10")!;
    expect(result.kind === "liquid" && result.flOz).toBeCloseTo(12.8, 1);
  });
  it("10,000 gal, +1 ppm = ~2.05 oz cal-hypo %65", () => {
    const result = chlorineDose(10000, 1, 2, "cal-hypo-65")!;
    expect(result.kind === "granular" && result.oz).toBeCloseTo(2.05, 2);
  });
  it("hedefteyse doz yok", () => expect(chlorineDose(10000, 3, 2, "liquid-10")!.alreadyAtTarget).toBe(true));
});

describe("standart icki", () => {
  it("12 fl oz %5 bira = 1 ABD standart icki", () => expect(standardDrinks(12 * 29.5735295625, 5)!.usDrinks).toBeCloseTo(1, 1));
  it("568 mL %4 bira (UK pint) = 2.27 UK unit", () => expect(standardDrinks(568, 4)!.ukUnits).toBeCloseTo(2.27, 2));
});

describe("amortisman", () => {
  it("dogrusal: 10,000 - 1,000, 5 yil = 1,800/yil", () => {
    const rows = depreciationSchedule(10000, 1000, 5, "straight-line")!;
    expect(rows[0].depreciation).toBe(1800);
    expect(rows[4].bookValue).toBeCloseTo(1000, 9);
  });
  it("azalan bakiye: ilk yil %40, son deger hurda degerine iner", () => {
    const rows = depreciationSchedule(10000, 1000, 5, "double-declining")!;
    expect(rows[0].depreciation).toBe(4000);
    expect(rows[1].depreciation).toBe(2400);
    expect(rows[4].bookValue).toBeCloseTo(1000, 9);
  });
  it("yillar toplami: ilk yil 5/15", () => {
    const rows = depreciationSchedule(10000, 1000, 5, "sum-of-years")!;
    expect(rows[0].depreciation).toBeCloseTo(3000, 9);
    expect(rows[4].accumulated).toBeCloseTo(9000, 9);
  });
});

import { hexToRgb, rgbToHsl } from "../app/converter/colorCodeCalculator";
import { areaMm2ToAwg, awgToAreaMm2, awgToDiameterMm } from "../app/converter/awgConverter";
import { calculatePsuWattage } from "../app/converter/psuCalculator";
import { calculateIvDripRate } from "../app/converter/ivDripRateCalculator";

describe("sayfa metinlerindeki ornekler (tasinan araclar)", () => {
  it("renk", () => {
    const rgb = hexToRgb("#FF5733")!;
    expect(rgb).toEqual({ r: 255, g: 87, b: 51 });
    expect(rgbToHsl(rgb)).toEqual({ h: 11, s: 100, l: 60 });
  });
  it("unix", () => expect(new Date(1700000000 * 1000).toISOString()).toBe("2023-11-14T22:13:20.000Z"));
  it("havuz ve klor", () => {
    expect(Math.round(poolVolume("rectangle", 32, 16, 5.5, 0)!.gallons)).toBe(21065);
    const liquid = chlorineDose(10000, 0, 1, "liquid-12.5")!;
    expect(liquid.kind === "liquid" && liquid.flOz).toBeCloseTo(10.2, 1);
  });
  it("standart icki", () => {
    const wine = standardDrinks(750, 13)!;
    expect(wine.alcoholGrams).toBeCloseTo(77, 0);
    expect(wine.usDrinks).toBeCloseTo(5.5, 1);
    expect(wine.ukUnits).toBeCloseTo(9.75, 2);
    expect(standardDrinks(16 * 29.5735295625, 7)!.usDrinks).toBeCloseTo(1.9, 1);
    expect(standardDrinks(568, 5)!.ukUnits).toBeCloseTo(2.84, 2);
  });
  it("AWG", () => {
    expect(awgToAreaMm2(12)).toBeCloseTo(3.31, 2);
    expect(awgToDiameterMm(12)).toBeCloseTo(2.05, 2);
    expect(awgToAreaMm2(14)).toBeCloseTo(2.08, 2);
    expect(awgToAreaMm2(10)).toBeCloseTo(5.26, 2);
    expect(areaMm2ToAwg(2.5)).toBeCloseTo(13.2, 1);
  });
  it("PSU ve IV", () => {
    expect(calculatePsuWattage({ cpuWatt: 125, gpuWatt: 285, otherWatt: 75, headroomPercent: 30 })).toBeCloseTo(630.5, 6);
    const iv = calculateIvDripRate({ volumeMl: 1000, timeMinutes: 480, dropFactorGttPerMl: 15 })!;
    expect(iv.dropsPerMinute).toBeCloseTo(31.25, 6);
    expect(iv.mlPerHour).toBeCloseTo(125, 9);
  });
  it("amortisman ornekleri", () => {
    expect(depreciationSchedule(30000, 5000, 5, "straight-line")![0].depreciation).toBe(5000);
    expect(depreciationSchedule(30000, 5000, 5, "double-declining")![0].depreciation).toBe(12000);
  });
});
