import { describe, expect, it } from "vitest";
import {
  barWeightPerMeter,
  barWeightRuleOfThumb,
  concreteMaterials,
  steelWeight,
} from "../app/converter/civilIndiaFormulas";

describe("steel bar weight", () => {
  it("matches the D²/162 rule closely", () => {
    expect(barWeightPerMeter(12)).toBeCloseTo(0.888, 3);
    expect(barWeightRuleOfThumb(12)).toBeCloseTo(0.8889, 4);
    expect(barWeightPerMeter(16)).toBeCloseTo(1.578, 3);
    expect(barWeightPerMeter(8)).toBeCloseTo(0.395, 3);
  });

  it("totals bars", () => {
    const result = steelWeight({ diameterMm: 12, bars: 10, lengthM: 12 });
    expect(result?.totalLengthM).toBe(120);
    expect(result?.totalKg).toBeCloseTo(106.56, 1);
    expect(steelWeight({ diameterMm: 12, bars: 0, lengthM: 12 })).toBeNull();
  });
});

describe("nominal mix concrete", () => {
  it("gives about 8 bags of cement per m³ of M20", () => {
    const result = concreteMaterials({ wetVolumeM3: 1, grade: "M20", waterCementRatio: 0.5 })!;
    expect(result.dryVolume).toBeCloseTo(1.54, 6);
    expect(result.cementBags).toBeCloseTo(8.064, 3);
    expect(result.sandM3).toBeCloseTo(0.42, 6);
    expect(result.aggregateM3).toBeCloseTo(0.84, 6);
    expect(result.sandCft).toBeCloseTo(14.83, 2);
    expect(result.waterLitres).toBeCloseTo(201.6, 1);
  });

  it("rejects an empty volume", () => {
    expect(concreteMaterials({ wetVolumeM3: 0, grade: "M15", waterCementRatio: 0.5 })).toBeNull();
  });
});
