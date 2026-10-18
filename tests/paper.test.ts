import { describe, expect, it } from "vitest";
import { A_SERIES, B_SERIES, C_SERIES, pixels, sheetWeight } from "../app/converter/scales/paper";

const get = (s: typeof A_SERIES, id: string) => s.find((p) => p.id === id)!;

describe("kâğıt boyutları", () => {
  it("ISO 216 A serisi", () => {
    expect(get(A_SERIES, "A4")).toEqual({ id: "A4", w: 210, h: 297 });
    expect(get(A_SERIES, "A3")).toEqual({ id: "A3", w: 297, h: 420 });
    expect(get(A_SERIES, "A5")).toEqual({ id: "A5", w: 148, h: 210 });
    expect(get(A_SERIES, "A10")).toEqual({ id: "A10", w: 26, h: 37 });
  });
  it("B ve C serileri", () => {
    expect(get(B_SERIES, "B5")).toEqual({ id: "B5", w: 176, h: 250 });
    expect(get(C_SERIES, "C4")).toEqual({ id: "C4", w: 229, h: 324 });
    expect(get(C_SERIES, "C6")).toEqual({ id: "C6", w: 114, h: 162 });
  });
  it("piksel ve yaprak ağırlığı", () => {
    expect(pixels(210, 300)).toBe(2480);
    expect(pixels(297, 300)).toBe(3508);
    expect(sheetWeight(get(A_SERIES, "A4"), 80)).toBeCloseTo(4.9896, 4);
  });
});
