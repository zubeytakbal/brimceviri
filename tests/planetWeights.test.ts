import { describe, expect, it } from "vitest";
import { bodyWeights, MAIN_BODIES, OTHER_BODIES, sunWeight } from "../app/converter/planetWeights";

describe("gezegenlerde ağırlık", () => {
  const rows = bodyWeights(70, MAIN_BODIES);
  const kg = (id: string) => rows.find((r) => r.id === id)!.kg;

  it("tüm gök cisimleri veritabanında var ve Dünya'da ağırlık değişmez", () => {
    expect(bodyWeights(70, [...MAIN_BODIES, ...OTHER_BODIES]).every((r) => r.kg > 0)).toBe(true);
    expect(kg("dunya")).toBe(70);
  });

  it("70 kg: Ay'da ~11,6, Mars'ta ~26,4, Jüpiter'de ~165 kg", () => {
    expect(kg("ay")).toBeCloseTo(11.59, 1);
    expect(kg("mars")).toBeCloseTo(26.43, 1);
    expect(kg("jupiter")).toBeCloseTo(165, 0);
  });

  it("Güneş'te yaklaşık 28 kat", () => {
    expect(sunWeight(70) / 70).toBeCloseTo(28, 0);
  });
});
