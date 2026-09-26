import { describe, expect, it } from "vitest";
import { gasBill, roomAcSize, suggestTruck } from "../app/converter/englishEnergyHomeFormulas";

describe("room AC sizing (ENERGY STAR chart)", () => {
  it("a 12 x 16 ft (192 sq ft) bedroom needs 6,000 BTU", () => {
    expect(roomAcSize({ sqFt: 192, sun: "normal", people: 2, isKitchen: false })).toMatchObject({ base: 6000, total: 6000 });
  });
  it("very sunny adds 10%, each person over two adds 600, a kitchen adds 4,000", () => {
    const r = roomAcSize({ sqFt: 400, sun: "sunny", people: 4, isKitchen: true });
    expect(r).toMatchObject({ base: 9000, sunAdjustment: 900, peopleAdjustment: 1200, kitchenAdjustment: 4000, total: 15100 });
  });
  it("shaded rooms reduce by 10%", () => {
    expect(roomAcSize({ sqFt: 500, sun: "shaded", people: 1, isKitchen: false })).toMatchObject({ base: 12000, total: 10800 });
  });
  it("flags rooms beyond the chart", () => {
    expect(roomAcSize({ sqFt: 3000, sun: "normal", people: 2, isKitchen: false })).toMatchObject({ outOfRange: true });
  });
});

describe("natural gas bill", () => {
  it("60 therms at $1.40", () => {
    const r = gasBill({ usage: 60, unit: "therm", pricePerUnit: 1.4, thermsPerCcf: 1.037 })!;
    expect(r.cost).toBeCloseTo(84, 6);
    expect(r.kwh).toBeCloseTo(1758.426, 3);
  });
  it("58 CCF with a 1.037 factor is about 60.1 therms", () => {
    const r = gasBill({ usage: 58, unit: "ccf", pricePerUnit: 1.45, thermsPerCcf: 1.037 })!;
    expect(r.therms).toBeCloseTo(60.146, 3);
    expect(r.cost).toBeCloseTo(84.1, 6);
    expect(r.costPerTherm).toBeCloseTo(1.3983, 4);
  });
  it("cubic meters go through cubic feet", () => {
    expect(gasBill({ usage: 100, unit: "m3", pricePerUnit: NaN, thermsPerCcf: 1.037 })!.therms).toBeCloseTo(36.621, 3);
  });
});

describe("truck size", () => {
  it("maps volume to the smallest truck that fits", () => {
    expect(suggestTruck(283)!.label).toBe("10 ft truck");
    expect(suggestTruck(636)!.label).toBe("15 ft truck");
    expect(suggestTruck(848)!.label).toBe("20 ft truck");
    expect(suggestTruck(1413)!.label).toBe("26 ft truck");
    expect(suggestTruck(2000)!.label).toMatch(/26 ft truck or/);
  });
});

describe("electricity consumption", async () => {
  const { calculateElectricityConsumption } = await import("../app/converter/electricityConsumptionCalculator");
  it("1,500 W for 4 h/day, 30 days/month at $0.17/kWh", () => {
    const r = calculateElectricityConsumption({ powerWatt: 1500, hoursPerDay: 4, daysPerMonth: 30, kwhPrice: 0.17 })!;
    expect(r.monthlyKwh).toBe(180);
    expect(r.yearlyKwh).toBe(2160);
    expect(r.monthlyCost).toBeCloseTo(30.6, 6);
    expect(r.yearlyCost).toBeCloseTo(367.2, 6);
  });
  it("yearly use follows the days per month", () => {
    expect(calculateElectricityConsumption({ powerWatt: 1000, hoursPerDay: 1, daysPerMonth: 20, kwhPrice: null })!.yearlyKwh).toBe(240);
  });
});
