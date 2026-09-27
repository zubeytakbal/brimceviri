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

describe("Indian weights", async () => {
  const { convertIndianWeight } = await import("../app/converter/indiaFormulas");
  it("1 tola = 12 masha = 96 ratti = 11.6638 g", () => {
    const r = convertIndianWeight(1, "tola")!;
    expect(r.gram).toBeCloseTo(11.6638, 4);
    expect(r.masha).toBeCloseTo(12, 10);
    expect(r.rattiSunari).toBeCloseTo(96, 10);
  });
  it("1 pakki ratti ≈ 0.91 carat; 1 sunari ratti = 0.1215 g", () => {
    expect(convertIndianWeight(1, "rattiPakki")!.carat).toBeCloseTo(0.9112, 4);
    expect(convertIndianWeight(1, "rattiSunari")!.gram).toBeCloseTo(0.1215, 4);
  });
  it("1 maund = 40 seer ≈ 37.32 kg; 1 quintal = 100 kg", () => {
    const r = convertIndianWeight(1, "maund")!;
    expect(r.seer).toBeCloseTo(40, 10);
    expect(r.kilogram).toBeCloseTo(37.3242, 4);
    expect(convertIndianWeight(1, "quintal")!.kilogram).toBe(100);
  });
});

describe("GST", async () => {
  const { gstCalculation } = await import("../app/converter/indiaFormulas");
  it("adds 18% GST split into CGST and SGST", () => {
    expect(gstCalculation({ amount: 10000, ratePercent: 18, mode: "add", supply: "intra" })).toEqual({ net: 10000, gst: 1800, total: 11800, cgst: 900, sgst: 900, igst: 0 });
  });
  it("removes 18% GST from an inclusive price (IGST)", () => {
    const r = gstCalculation({ amount: 11800, ratePercent: 18, mode: "remove", supply: "inter" })!;
    expect(r.net).toBeCloseTo(10000, 6);
    expect(r.igst).toBeCloseTo(1800, 6);
  });
});

describe("EMI", async () => {
  const { loanEmi } = await import("../app/converter/indiaFormulas");
  it("₹30 lakh at 8.5% for 20 years ≈ ₹26,035 per month", () => {
    const r = loanEmi({ principal: 3000000, annualRatePercent: 8.5, months: 240 })!;
    expect(r.emi).toBeCloseTo(26034.70, 1);
    expect(r.totalInterest).toBeCloseTo(3248327.28, 1);
    expect(r.years).toHaveLength(20);
    expect(r.years[19].balance).toBeCloseTo(0, 2);
  });
  it("zero interest divides evenly", () => {
    expect(loanEmi({ principal: 120000, annualRatePercent: 0, months: 12 })!.emi).toBe(10000);
  });
});
