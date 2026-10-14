import { describe, expect, it } from "vitest";
import { drainCapacity, partialSection, slopeForFlow } from "../app/converter/plumbing/drainage";

describe("kısmi dolu boru akışı", () => {
  it("yarı dolu borunun hidrolik yarıçapı tam dolu ile aynı (d/4)", () => {
    const d = 0.1;
    expect(partialSection(d, 0.5).R).toBeCloseTo(d / 4, 9);
    expect(partialSection(d, 1).R).toBeCloseTo(d / 4, 9);
    expect(partialSection(d, 0.5).A).toBeCloseTo((Math.PI * d * d) / 8, 9);
  });
  it("EN 12056 temelli üretici tablosu: Ø98 mm, %1, h/d 0,7 → ≈ 4,2 L/s, 0,8 m/s (fark < %6)", () => {
    const r = drainCapacity(0.098, 0.01, 0.7)!;
    expect(Math.abs(r.Q * 1000 - 4.2) / 4.2).toBeLessThan(0.06);
    expect(r.v).toBeCloseTo(0.8, 1);
  });
  it("eğim arttıkça kapasite artar; ters hesap tutarlı", () => {
    const a = drainCapacity(0.1, 0.01)!.Q;
    const b = drainCapacity(0.1, 0.02)!.Q;
    expect(b).toBeGreaterThan(a);
    expect(slopeForFlow(0.1, a)!).toBeCloseTo(0.01, 4);
  });
});
