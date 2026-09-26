import { describe, expect, it } from "vitest";
import {
  BIGHA_REGIONS,
  convertNumberUnits,
  formatIndianGrouping,
  goldJewelleryPrice,
  landFromSqFt,
  landToSqFt,
  rateFromFineness,
} from "../app/converter/indiaFormulas";

const region = (id: string) => BIGHA_REGIONS.find((entry) => entry.id === id)!;

describe("land", () => {
  it("1 West Bengal bigha = 20 katha = 14,400 sq ft = 0.3306 acre", () => {
    const sqFt = landToSqFt(1, { kind: "bigha" }, region("west-bengal"))!;
    expect(sqFt).toBe(14400);
    const out = landFromSqFt(sqFt, region("west-bengal"));
    expect(out.subunit).toEqual({ name: "katha", value: 20 });
    expect(out.fixed.acre).toBeCloseTo(0.33058, 5);
    expect(out.fixed.sqm).toBeCloseTo(1337.8038, 4);
  });
  it("Assam katha is a fifth of a bigha", () => {
    expect(landToSqFt(1, { kind: "subunit" }, region("assam"))).toBe(2880);
  });
  it("1 acre = 40 guntha = 100 cent = 4,840 gaj", () => {
    const out = landFromSqFt(landToSqFt(1, { kind: "fixed", unit: "acre" }, region("gujarat"))!, region("gujarat"));
    expect(out.fixed.guntha).toBeCloseTo(40, 10);
    expect(out.fixed.cent).toBeCloseTo(100, 10);
    expect(out.fixed.gaj).toBeCloseTo(4840, 10);
  });
  it("Gujarat bigha = 16 guntha", () => {
    expect(landFromSqFt(17424, region("gujarat")).fixed.guntha).toBeCloseTo(16, 10);
  });
  it("1 kanal = 20 marla", () => {
    expect(landFromSqFt(5445, region("punjab-haryana")).fixed.marla).toBeCloseTo(20, 10);
  });
});

describe("gold", () => {
  it("22K rate from a 24K rate uses 916/999 fineness", () => {
    expect(rateFromFineness(7500, "22")).toBeCloseTo(6876.88, 2);
  });
  it("10 g of 22K at ₹6,900/g with 12% making and 3% GST", () => {
    const r = goldJewelleryPrice({ ratePerGram: 6900, weightGrams: 10, makingMode: "percent", makingValue: 12, gstPercent: 3 })!;
    expect(r.goldValue).toBe(69000);
    expect(r.making).toBeCloseTo(8280, 6);
    expect(r.gst).toBeCloseTo(2318.4, 6);
    expect(r.total).toBeCloseTo(79598.4, 6);
  });
  it("making charge per gram", () => {
    const r = goldJewelleryPrice({ ratePerGram: 6900, weightGrams: 10, makingMode: "perGram", makingValue: 500, gstPercent: 3 })!;
    expect(r.making).toBe(5000);
    expect(r.total).toBeCloseTo(76220, 6);
  });
});

describe("lakh and crore", () => {
  it("converts between Indian and international units", () => {
    const r = convertNumberUnits(1, "crore")!;
    expect(r.raw).toBe(10000000);
    expect(r.inUnits.million).toBe(10);
    expect(r.inUnits.lakh).toBe(100);
    expect(convertNumberUnits(5, "million")!.inUnits.lakh).toBe(50);
    expect(convertNumberUnits(1, "billion")!.inUnits.crore).toBe(100);
  });
  it("formats with Indian grouping", () => {
    expect(formatIndianGrouping(12345678.9)).toBe("1,23,45,678.9");
  });
});
