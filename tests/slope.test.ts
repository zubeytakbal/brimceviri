import { describe, expect, it } from "vitest";
import { riseOver, slopeFrom, slopeLength } from "../app/converter/scales/slope";

describe("eğim", () => {
  it("yüzde 100 = 45°", () => {
    expect(slopeFrom("percent", 100)!.degree).toBeCloseTo(45, 10);
    expect(slopeFrom("degree", 45)!.percent).toBeCloseTo(100, 10);
  });
  it("yüzde, binde ve oran", () => {
    const s = slopeFrom("percent", 8)!;
    expect(s.permille).toBeCloseTo(80, 10);
    expect(s.ratio).toBeCloseTo(12.5, 10);
    expect(s.degree).toBeCloseTo(4.573921, 5);
    expect(slopeFrom("ratio", 12)!.percent).toBeCloseTo(8.333333, 5);
    expect(slopeFrom("degree", 30)!.percent).toBeCloseTo(57.735027, 5);
  });
  it("sınırlar", () => {
    expect(slopeFrom("degree", 90)).toBeNull();
    expect(slopeFrom("ratio", 0)).toBeNull();
    expect(slopeFrom("percent", -1)).toBeNull();
    expect(slopeFrom("percent", 0)!.ratio).toBeNull();
  });
  it("yükseklik ve eğik uzunluk", () => {
    const s = slopeFrom("percent", 2)!;
    expect(riseOver(s, 500)).toBeCloseTo(10, 10);
    expect(slopeLength(slopeFrom("percent", 75)!, 4)).toBeCloseTo(5, 10);
  });
});
