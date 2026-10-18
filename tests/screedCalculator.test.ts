import { describe, expect, it } from "vitest";
import { calculateScreedVolume } from "../app/converter/screedCalculator";

describe("şap hacmi", () => {
  it("alan ve mm kalınlığından hacmi, fire eklemeden hesaplar", () => {
    expect(calculateScreedVolume({ areaM2: 40, thicknessMm: 50, wastePercent: 0 })).toEqual({
      netVolumeM3: 2,
      volumeWithWasteM3: 2,
      volumeWithWasteL: 2000,
    });
  });

  it("isteğe bağlı fire payını sonuca ekler", () => {
    const result = calculateScreedVolume({ areaM2: 40, thicknessMm: 50, wastePercent: 5 });
    expect(result?.netVolumeM3).toBe(2);
    expect(result?.volumeWithWasteM3).toBe(2.1);
    expect(result?.volumeWithWasteL).toBe(2100);
  });

  it("geçersiz veya taşan girdilerde null döndürür", () => {
    expect(calculateScreedVolume({ areaM2: 0, thicknessMm: 50, wastePercent: 5 })).toBeNull();
    expect(calculateScreedVolume({ areaM2: 40, thicknessMm: -1, wastePercent: 5 })).toBeNull();
    expect(calculateScreedVolume({ areaM2: 40, thicknessMm: 50, wastePercent: -1 })).toBeNull();
    expect(calculateScreedVolume({ areaM2: Number.MAX_VALUE, thicknessMm: Number.MAX_VALUE, wastePercent: 5 })).toBeNull();
  });
});
