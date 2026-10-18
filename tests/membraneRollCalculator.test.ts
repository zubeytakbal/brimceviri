import { describe, expect, it } from "vitest";
import { calculateMembraneRolls } from "../app/converter/membraneRollCalculator";

describe("su yalıtımı membran rulo metrajı", () => {
  it("bindirme ve fire sonrası rulo sayısını yukarı yuvarlar", () => {
    expect(calculateMembraneRolls({
      areaM2: 60,
      rollWidthM: 1,
      rollLengthM: 10,
      sideLapCm: 10,
      endLapCm: 15,
      wastePercent: 10,
    })).toEqual({
      effectiveCoveragePerRollM2: 8.415,
      areaWithWasteM2: 66,
      rollCount: 8,
    });
  });

  it("sıfır bindirme ve fire değerine izin verir", () => {
    const result = calculateMembraneRolls({
      areaM2: 20,
      rollWidthM: 1,
      rollLengthM: 10,
      sideLapCm: 0,
      endLapCm: 0,
      wastePercent: 0,
    });
    expect(result).toEqual({
      effectiveCoveragePerRollM2: 10,
      areaWithWasteM2: 20,
      rollCount: 2,
    });
  });

  it("geçersiz ölçüleri, bindirmeleri ve taşan sonuçları reddeder", () => {
    const valid = {
      areaM2: 20,
      rollWidthM: 1,
      rollLengthM: 10,
      sideLapCm: 10,
      endLapCm: 15,
      wastePercent: 10,
    };
    expect(calculateMembraneRolls({ ...valid, areaM2: 0 })).toBeNull();
    expect(calculateMembraneRolls({ ...valid, sideLapCm: 100 })).toBeNull();
    expect(calculateMembraneRolls({ ...valid, endLapCm: 1000 })).toBeNull();
    expect(calculateMembraneRolls({ ...valid, wastePercent: -1 })).toBeNull();
    expect(calculateMembraneRolls({ ...valid, areaM2: Number.MAX_VALUE })).toBeNull();
  });
});
