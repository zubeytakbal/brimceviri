import { describe, expect, it } from "vitest";
import { brickEstimate, flooringEstimate, gallonsToPurchase, paintEstimate, tileEstimate, wallpaperEstimate } from "../app/converter/englishHomeProjectFormulas";

describe("tile", () => {
  it("120 sq ft of 12x24 tile with 1/8 in grout and 10% waste needs 65 tiles", () => {
    const r = tileEstimate({ area: 120, tileWidth: 12, tileLength: 24, grout: 0.125, wastePercent: 10, tilesPerBox: 8, system: "us" })!;
    expect(r.tileCoverage).toBeCloseTo(2.0314, 4);
    expect(r.tiles).toBe(65);
    expect(r.boxes).toBe(9);
  });
  it("metric: 10 m2 of 30x60 cm tile, no grout, no waste = 56 tiles", () => {
    expect(tileEstimate({ area: 10, tileWidth: 30, tileLength: 60, grout: 0, wastePercent: 0, system: "metric" })!.tiles).toBe(56);
  });
  it("rejects bad input", () => {
    expect(tileEstimate({ area: 0, tileWidth: 12, tileLength: 12, grout: 0, wastePercent: 10, system: "us" })).toBeNull();
  });
});

describe("brick", () => {
  it("modular brick with 3/8 in joints is about 6.86 per sq ft", () => {
    const r = brickEstimate({ wallArea: 200, openingsArea: 0, brickLength: 7.625, brickHeight: 2.25, joint: 0.375, wastePercent: 5, system: "us" })!;
    expect(r.bricksPerUnitArea).toBeCloseTo(6.857, 3);
    expect(r.bricks).toBe(1440);
  });
  it("subtracts openings", () => {
    const r = brickEstimate({ wallArea: 200, openingsArea: 40, brickLength: 7.625, brickHeight: 2.25, joint: 0.375, wastePercent: 0, system: "us" })!;
    expect(r.netArea).toBe(160);
    expect(r.bricks).toBe(1098);
  });
});

describe("flooring", () => {
  it("180 sq ft, 22.5 sq ft boxes, 10% waste = 9 boxes", () => {
    const r = flooringEstimate({ area: 180, coveragePerBox: 22.5, wastePercent: 10, pricePerBox: 45 })!;
    expect(r.boxes).toBe(9);
    expect(r.purchasedArea).toBeCloseTo(202.5, 6);
    expect(r.leftover).toBeCloseTo(22.5, 6);
    expect(r.cost).toBe(405);
  });
});

describe("paint", () => {
  it("12x14 ft room, 8 ft walls, 1 door, 1 window, 2 coats, 350 sq ft/gal", () => {
    const r = paintEstimate({ length: 12, width: 14, height: 8, doors: 1, windows: 1, coats: 2, coverage: 350, includeCeiling: false, system: "us" })!;
    expect(r.grossWall).toBe(416);
    expect(r.netWall).toBe(380);
    expect(r.paint).toBeCloseTo(2.1714, 4);
    expect(r.purchase).toEqual({ gallons: 2, quarts: 1 });
  });
  it("rounds 3+ extra quarts up to a gallon", () => {
    expect(gallonsToPurchase(2.8)).toEqual({ gallons: 3, quarts: 0 });
    expect(gallonsToPurchase(2)).toEqual({ gallons: 2, quarts: 0 });
    expect(gallonsToPurchase(0.4)).toEqual({ gallons: 0, quarts: 2 });
  });
});

describe("wallpaper", () => {
  it("12x14 ft room, 8 ft walls, 6 ft of openings, US double roll = 7 rolls", () => {
    const r = wallpaperEstimate({ length: 12, width: 14, height: 8, openingsWidth: 6, rollWidth: 20.5, rollLength: 33, patternRepeat: 0, system: "us" })!;
    expect(r.strips).toBe(27);
    expect(r.stripsPerRoll).toBe(4);
    expect(r.rolls).toBe(7);
  });
  it("a 21 in pattern repeat cuts strips per roll to 3", () => {
    const r = wallpaperEstimate({ length: 12, width: 14, height: 8, openingsWidth: 6, rollWidth: 20.5, rollLength: 33, patternRepeat: 21, system: "us" })!;
    expect(r.stripsPerRoll).toBe(3);
    expect(r.rolls).toBe(9);
  });
  it("metric euro roll", () => {
    const r = wallpaperEstimate({ length: 4, width: 3.5, height: 2.5, openingsWidth: 1.8, rollWidth: 53, rollLength: 10.05, patternRepeat: 0, system: "metric" })!;
    expect(r.strips).toBe(25);
    expect(r.stripsPerRoll).toBe(4);
    expect(r.rolls).toBe(7);
  });
});
