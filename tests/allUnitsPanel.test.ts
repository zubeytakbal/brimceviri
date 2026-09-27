import { describe, expect, it } from "vitest";
import { smartDefaultInput } from "../app/converter/smartDefaultInput";
import { getUnitSystemGroup } from "../app/converter/unitSystemGroups";
import { formatReadableNumber } from "../app/components/readableNumber";

describe("smartDefaultInput", () => {
  it("opens tiny ratios with a readable amount", () => {
    expect(smartDefaultInput("alan", "m²", "dönüm")).toBe(1000);
    expect(smartDefaultInput("kutle", "g", "kg")).toBe(1000);
  });

  it("keeps 1 for normal ratios and temperature", () => {
    expect(smartDefaultInput("kutle", "kg", "g")).toBe(1);
    expect(smartDefaultInput("alan", "m²", "ft²")).toBe(1);
    expect(smartDefaultInput("sicaklik", "C", "F")).toBe(1);
  });
});

describe("unit system groups", () => {
  it("groups area units", () => {
    expect(getUnitSystemGroup("alan", "m²")).toBe("metric");
    expect(getUnitSystemGroup("alan", "ac")).toBe("imperial");
    expect(getUnitSystemGroup("alan", "dönüm")).toBe("traditional");
    expect(getUnitSystemGroup("hiz", "mph")).toBe("metric");
  });
});

describe("formatReadableNumber", () => {
  it("avoids scientific notation for everyday values", () => {
    expect(formatReadableNumber(0.000001, "tr")).toBe("0,000001");
    expect(formatReadableNumber(1_000_000_000, "tr")).toBe("1.000.000.000");
    expect(formatReadableNumber(1234.5, "uz")).toBe("1 234,5");
  });
});
