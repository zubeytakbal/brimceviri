import { describe, expect, it } from "vitest";
import { brixFromSg, sugarFrom } from "../app/converter/scales/sugar";

describe("şeker dereceleri", () => {
  it("ASBC denklemi: SG 1,040 ≈ 10 °P", () => {
    expect(brixFromSg(1.04)).toBeCloseTo(10, 1);
    expect(brixFromSg(1)).toBeCloseTo(0, 1);
  });
  it("Brix → SG → Brix gidiş dönüş", () => {
    for (const b of [0, 5, 12, 24, 50, 68, 80]) expect(sugarFrom("sg", sugarFrom("brix", b)!.sg)!.brix).toBeCloseTo(b, 4);
  });
  it("Baumé ve Öchsle", () => {
    const s = sugarFrom("sg", 1.1)!;
    expect(s.baume).toBeCloseTo(13.1818, 3);
    expect(s.oechsle).toBeCloseTo(100, 6);
    expect(sugarFrom("baume", 13.1818)!.sg).toBeCloseTo(1.1, 4);
    expect(sugarFrom("oechsle", 90)!.sg).toBeCloseTo(1.09, 6);
  });
  it("aralık dışı", () => {
    expect(sugarFrom("brix", 90)).toBeNull();
    expect(sugarFrom("sg", 0.9)).toBeNull();
  });
});
