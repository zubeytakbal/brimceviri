import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { unitRegistry } from "../app/converter/unitRegistry";

describe("convert - bilinen degerler", () => {
  it.each([
    ["uzunluk", 1, "km", "m", 1000],
    ["uzunluk", 1, "mi", "km", 1.609344],
    ["uzunluk", 1, "ft", "in", 12],
    ["uzunluk", 1, "in", "m", 0.0254],
    ["kutle", 1, "lb", "kg", 0.45359237],
    ["kutle", 16, "oz", "lb", 1],
    ["hacim", 1, "gal", "L", 3.785411784],
    ["hacim", 1, "bbl", "gal", 42],
    ["hacim", 1, "ft³", "in³", 1728],
    ["hacim", 1, "gal", "in³", 231],
    ["alan", 1, "ft²", "in²", 144],
    ["alan", 1, "ac", "ft²", 43560],
    ["kuvvet", 1, "lbf", "N", 4.4482216152605],
    ["guc", 1, "HP", "W", 745.69987158227022],
  ])("%s: %d %s -> %s = %d", (category, value, from, to, expected) => {
    expect(convert(category, value, from, to)).toBeCloseTo(expected, 6);
  });
});

describe("convert - sicaklik", () => {
  it.each([
    [0, "C", "F", 32],
    [100, "C", "F", 212],
    [-40, "C", "F", -40],
    [0, "C", "K", 273.15],
    [0, "K", "C", -273.15],
    [0, "C", "R", 491.67],
    [100, "C", "Re", 80],
    [212, "F", "K", 373.15],
  ])("%d %s -> %s = %d", (value, from, to, expected) => {
    expect(convert("sicaklik", value, from, to)).toBeCloseTo(expected, 6);
  });
});

describe("convert - guvenlik", () => {
  it("sonlu olmayan girdi icin NaN dondurur", () => {
    expect(convert("uzunluk", NaN, "m", "km")).toBeNaN();
    expect(convert("uzunluk", Infinity, "m", "km")).toBeNaN();
  });

  it("volt ile amperi birbirine cevirmez", () => {
    expect(convert("elektrik", 1, "V", "A")).toBeNaN();
    expect(convert("elektrik", 1, "kV", "V")).toBeCloseTo(1000, 6);
  });
});

describe("unitRegistry - veri butunlugu", () => {
  it("her birim id'si benzersiz", () => {
    const seen = new Set<string>();
    const duplicates = unitRegistry
      .map((entry) => entry.id)
      .filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
    expect(duplicates).toEqual([]);
  });

  it("ayni kategoride ayni sembol iki kez kullanilmaz", () => {
    const seen = new Set<string>();
    const duplicates = unitRegistry
      .map((entry) => `${entry.category}:${entry.symbol}`)
      .filter((key) => (seen.has(key) ? true : (seen.add(key), false)));
    expect(duplicates).toEqual([]);
  });

  it("tum carpanlar pozitif ve sonlu", () => {
    const invalid = unitRegistry
      .filter((entry) => entry.siFactor !== undefined)
      .filter((entry) => !(Number.isFinite(entry.siFactor) && entry.siFactor! > 0))
      .map((entry) => entry.id);
    expect(invalid).toEqual([]);
  });

  it("her birim gidis-donus cevriminde ayni degeri verir", () => {
    const broken: string[] = [];
    for (const entry of unitRegistry) {
      const peers = unitRegistry.filter((other) => other.category === entry.category);
      for (const peer of peers) {
        const back = convert(
          entry.category,
          convert(entry.category, 123.456, entry.symbol, peer.symbol),
          peer.symbol,
          entry.symbol
        );
        if (!Number.isNaN(back) && Math.abs(back - 123.456) > 1e-6) {
          broken.push(`${entry.category}: ${entry.symbol} <-> ${peer.symbol}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });
});
