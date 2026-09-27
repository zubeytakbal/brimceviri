import { describe, expect, it } from "vitest";
import {
  bdGoldJewelleryPrice,
  gramsToVoriWeight,
  parseBengaliNumber,
  VORI_GRAMS,
  voriWeightToVori,
} from "../app/converter/bengaliGoldFormulas";

describe("ভরি-আনা-রতি-পয়েন্ট", () => {
  it("combines the parts", () => {
    expect(voriWeightToVori({ vori: 1, ana: 8, rati: 0, point: 0 })).toBe(1.5);
    expect(voriWeightToVori({ vori: 0, ana: 0, rati: 96, point: 0 })).toBe(1);
    expect(voriWeightToVori({ vori: 0, ana: 0, rati: 0, point: 960 })).toBeCloseTo(1, 10);
  });

  it("splits grams back", () => {
    expect(gramsToVoriWeight(VORI_GRAMS)).toEqual({ vori: 1, ana: 0, rati: 0, point: 0 });
    expect(gramsToVoriWeight(VORI_GRAMS * 1.5)).toEqual({ vori: 1, ana: 8, rati: 0, point: 0 });
    // 1 আনা 2 রতি 5 পয়েন্ট = 60 + 20 + 5 = 85 পয়েন্ট
    expect(gramsToVoriWeight((85 / 960) * VORI_GRAMS)).toEqual({ vori: 0, ana: 1, rati: 2, point: 5 });
  });
});

describe("gold jewellery price", () => {
  it("adds making on gold and VAT on gold + making", () => {
    const result = bdGoldJewelleryPrice({
      weightVori: 2,
      pricePerVori: 100000,
      makingPercent: 6,
      vatPercent: 5,
      karat: "22K",
    });
    expect(result.goldValue).toBe(200000);
    expect(result.making).toBe(12000);
    expect(result.vat).toBeCloseTo(10600, 6);
    expect(result.total).toBeCloseTo(222600, 6);
    expect(result.pureGoldGrams).toBeCloseTo(2 * 11.664 * 0.916, 6);
  });

  it("has no purity for traditional gold", () => {
    expect(
      bdGoldJewelleryPrice({ weightVori: 1, pricePerVori: 1, makingPercent: 0, vatPercent: 0, karat: "traditional" })
        .pureGoldGrams
    ).toBeNull();
  });
});

describe("parseBengaliNumber", () => {
  it("reads Bengali digits and lakh grouping", () => {
    expect(parseBengaliNumber("১,৩৫,০০০")).toBe(135000);
    expect(parseBengaliNumber("২.৫")).toBe(2.5);
    expect(parseBengaliNumber("abc")).toBeNull();
    expect(parseBengaliNumber("")).toBeNull();
  });
});
