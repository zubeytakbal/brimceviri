import { describe, expect, it } from "vitest";
import {
  areaBreakdown,
  ESKI_DONUM_M2,
  quadrilateralArea,
  rectangleArea,
  triangleArea,
} from "../app/converter/tarlaAlanFormulas";

describe("tarla alanı", () => {
  it("dikdörtgen ve üçgen", () => {
    expect(rectangleArea(50, 40)).toBe(2000);
    expect(triangleArea(3, 4, 5)).toBeCloseTo(6, 10);
    expect(triangleArea(1, 2, 10)).toBeNull();
    expect(rectangleArea(0, 40)).toBeNull();
  });

  it("köşegenli dörtgen: kare 100x100, köşegen 141.42", () => {
    expect(quadrilateralArea(100, 100, 100, 100, 100 * Math.SQRT2)).toBeCloseTo(10000, 3);
    expect(quadrilateralArea(100, 100, 100, 100, 250)).toBeNull();
  });

  it("dönüm karşılıkları", () => {
    const result = areaBreakdown(10000);
    expect(result.donum).toBe(10);
    expect(result.hektar).toBe(1);
    expect(result.ar).toBe(100);
    expect(ESKI_DONUM_M2).toBeCloseTo(919.3, 1);
    expect(result.eskiDonum).toBeCloseTo(10.878, 2);
  });
});
