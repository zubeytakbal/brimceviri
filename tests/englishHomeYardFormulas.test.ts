// ABD ev ve bahce araclarinin hesap motorlari -- bilinen referans degerler.
import { describe, expect, it } from "vitest";
import { boardFeet, cubicYards, feetAndInches, mulchNeeded, totalBoardFeet, totalSquareFeet } from "../app/converter/englishHomeYardFormulas";

describe("square footage", () => {
  it("12 x 15 oda + 10 ft capli daire", () => {
    const result = totalSquareFeet([{ shape: "rectangle", a: 12, b: 15 }, { shape: "circle", a: 10, b: 0 }])!;
    expect(result.sqFt).toBeCloseTo(180 + Math.PI * 25, 9);
  });
  it("ucgen ve fire payi", () => {
    const result = totalSquareFeet([{ shape: "triangle", a: 10, b: 8 }], 10)!;
    expect(result.sqFt).toBe(40);
    expect(result.withWaste).toBeCloseTo(44, 9);
  });
  it("1 akre = 43,560 sq ft; 100 sq ft = 9.29 m2", () => {
    expect(totalSquareFeet([{ shape: "rectangle", a: 43560, b: 1 }])!.acres).toBeCloseTo(1, 9);
    expect(totalSquareFeet([{ shape: "rectangle", a: 10, b: 10 }])!.sqM).toBeCloseTo(9.2903, 4);
  });
  it("12 ft 6 in = 12.5 ft", () => expect(feetAndInches(12, 6)).toBe(12.5));
});

describe("cubic yards", () => {
  it("10 x 10 ft, 4 in derinlik = 1.2346 yd3", () => expect(cubicYards("rectangle", 10, 10, 4)!.cubicYards).toBeCloseTo(1.2346, 4));
  it("27 ft3 = 1 yd3 = 0.7646 m3", () => {
    const result = cubicYards("rectangle", 3, 3, 36)!;
    expect(result.cubicYards).toBeCloseTo(1, 9);
    expect(result.cubicMeters).toBeCloseTo(0.764555, 6);
  });
});

describe("mulch", () => {
  it("324 sq ft, 1 in = 1 yd3", () => expect(mulchNeeded(324, 1)!.cubicYards).toBeCloseTo(1, 9));
  it("200 sq ft, 3 in = 50 ft3 = 25 adet 2 ft3 torba", () => {
    const result = mulchNeeded(200, 3)!;
    expect(result.cubicFeet).toBeCloseTo(50, 9);
    expect(result.bags.find((bag) => bag.cubicFeet === 2)!.count).toBe(25);
    expect(result.bags.find((bag) => bag.cubicFeet === 3)!.count).toBe(17);
  });
});

describe("board feet", () => {
  it("2x4, 8 ft = 5.333 bf", () => expect(boardFeet({ thicknessIn: 2, widthIn: 4, lengthFt: 8, quantity: 1 })).toBeCloseTo(5.3333, 4));
  it("1x12x12 in = 1 bf = 144 in3", () => {
    const result = totalBoardFeet([{ thicknessIn: 1, widthIn: 12, lengthFt: 1, quantity: 1 }])!;
    expect(result.boardFeet).toBe(1);
    expect(result.cubicMeters).toBeCloseTo((144 * 2.54 ** 3) / 1e6, 12);
  });
  it("10 adet 2x6x10", () => expect(totalBoardFeet([{ thicknessIn: 2, widthIn: 6, lengthFt: 10, quantity: 10 }])!.boardFeet).toBe(100));
});

describe("sayfa metinlerindeki ornekler", () => {
  it("SSS rakamlari", () => {
    expect(totalSquareFeet([{ shape: "rectangle", a: 12, b: 12 }])!.sqFt).toBe(144);
    expect(totalSquareFeet([{ shape: "rectangle", a: 20, b: 10 }])!.sqM).toBeCloseTo(18.58, 2);
    expect(totalSquareFeet([{ shape: "rectangle", a: 12, b: 15 }, { shape: "rectangle", a: 6, b: 8 }])!.sqFt).toBe(228);
    const bed = mulchNeeded(100, 3)!;
    expect(bed.cubicFeet).toBe(25);
    expect(bed.cubicYards).toBeCloseTo(0.93, 2);
    expect(bed.bags.find((bag) => bag.cubicFeet === 2)!.count).toBe(13);
    expect(mulchNeeded(81, 4)!.cubicYards).toBeCloseTo(1, 9);
    expect(boardFeet({ thicknessIn: 2, widthIn: 6, lengthFt: 10, quantity: 1 })).toBe(10);
    expect(cubicYards("rectangle", 10, 10, 4)!.cubicYards).toBeCloseTo(1.23, 2);
  });
});
