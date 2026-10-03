import { describe, expect, it } from "vitest";
import { alloy, equivalentWeight, findGrade, fineness, GOLD_GRADES, meltValue, pureGold, TROY_OUNCE_G } from "../app/converter/goldPurity";

describe("gold purity", () => {
  it("karat and hallmark fineness", () => {
    expect(fineness(findGrade(14)!, "karat")).toBeCloseTo(0.58333, 5);
    expect(fineness(findGrade(14)!, "hallmark")).toBe(0.585);
    expect(fineness(findGrade(18)!, "hallmark")).toBe(0.75);
    // Hallmark is never below karat ÷ 24 by more than a rounding step.
    for (const g of GOLD_GRADES) expect(Math.abs(g.hallmark / 1000 - g.karat / 24)).toBeLessThan(0.0045);
  });

  it("pure gold: 15 g of 585 gold contains 8.775 g (gold.de example)", () => {
    expect(pureGold(15, 0.585)).toBeCloseTo(8.775, 10);
    expect(pureGold(10, 14 / 24)).toBeCloseTo(5.8333, 4);
  });

  it("alloying up 10 g 14K to 18K needs 6.67 g pure gold (jeweller's table)", () => {
    const r = alloy(10, 14 / 24, 18 / 24)!;
    expect(r.direction).toBe("up");
    if (r.direction === "up") {
      expect(r.addPureGold).toBeCloseTo(6.6667, 4);
      // The result really is 18K.
      expect((10 * (14 / 24) + r.addPureGold) / r.finalWeight).toBeCloseTo(0.75, 12);
    }
    const down = alloy(10, 18 / 24, 14 / 24)!;
    expect(down.direction).toBe("down");
    if (down.direction === "down") expect((10 * 0.75) / down.finalWeight).toBeCloseTo(14 / 24, 12);
    expect(alloy(10, 0.75, 1)).toBeNull();
    expect(alloy(10, 0.75, 0.999)).toBeNull();
  });

  it("equivalent weight matches the Turkish converter (1 g 14K = 0.7778 g 18K)", () => {
    expect(equivalentWeight(1, 14 / 24, 18 / 24)).toBeCloseTo(0.777778, 6);
  });

  it("melt value with a typed price", () => {
    expect(meltValue(10, 0.75, 100)).toBeCloseTo(750, 10);
    expect(meltValue(10, 0.75, 0)).toBeNaN();
    expect(TROY_OUNCE_G).toBeCloseTo(31.1035, 4);
  });
});
