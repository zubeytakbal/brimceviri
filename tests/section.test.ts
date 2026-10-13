import { describe, expect, it } from "vitest";
import { STEEL_SECTIONS } from "../app/converter/metal/steelSections";
import { BUCKLING_K, eulerLoad, requiredSolidDiameter, sectionProps, shaftShearStress, shaftTwist, torqueFromPower } from "../app/converter/mechanics/section";

const rel = (a: number, b: number) => Math.abs(a / b - 1);

describe("kesit özellikleri", () => {
  it("dikdörtgen 50×100", () => {
    const p = sectionProps({ kind: "rectangle", b: 50, h: 100 });
    expect(p.A).toBe(5000);
    expect(p.Iy).toBeCloseTo((50 * 100 ** 3) / 12, 6);
    expect(p.Wy).toBeCloseTo((50 * 100 ** 2) / 6, 6);
    expect(p.iy).toBeCloseTo(100 / Math.sqrt(12), 9);
  });
  it("boru, ince cidar yaklaşımına yakınsar", () => {
    const D = 1000;
    const t = 1;
    const p = sectionProps({ kind: "tube", D, t });
    const thin = Math.PI * ((D - t) / 2) ** 3 * t;
    expect(rel(p.Iy, thin)).toBeLessThan(1e-3);
    expect(p.J).toBeCloseTo(2 * p.Iy, 3);
  });
  it("kutu, I kesitin özel hali ile tutarlı (iki gövde)", () => {
    const box = sectionProps({ kind: "box", B: 100, H: 200, t: 5 });
    const i = sectionProps({ kind: "i", b: 100, h: 200, tw: 10, tf: 5 });
    expect(box.Iy).toBeCloseTo(i.Iy, 6);
    expect(box.A).toBeCloseTo(i.A, 9);
  });
  it("I kesit formülü köşesiz IPE değerine %5 içinde yaklaşır (köşe dolguları ihmal)", () => {
    const ipe = STEEL_SECTIONS.IPE.find((s) => s.size === 300)!;
    const p = sectionProps({ kind: "i", b: ipe.b, h: ipe.h, tw: ipe.tw, tf: ipe.tf });
    expect(p.Iy / 1e4).toBeLessThan(ipe.Iy);
    expect(rel(p.Iy / 1e4, ipe.Iy)).toBeLessThan(0.05);
  });
});

describe("Euler burkulma", () => {
  it("iki ucu mafsallı: π²EI/L²", () => {
    expect(eulerLoad(210e9, 1e-6, 3, BUCKLING_K["pinned-pinned"])).toBeCloseTo((Math.PI ** 2 * 210e9 * 1e-6) / 9, 3);
  });
  it("konsol (K = 2) yükü 4'te birine düşürür", () => {
    const a = eulerLoad(210e9, 1e-6, 3, 1);
    expect(eulerLoad(210e9, 1e-6, 3, BUCKLING_K["fixed-free"])).toBeCloseTo(a / 4, 6);
  });
});

describe("mil burulması", () => {
  it("1 kW, 1000 dev/dk ≈ 9,549 N·m", () => {
    expect(torqueFromPower(1000, 1000)).toBeCloseTo(9.5493, 3);
  });
  it("dolu mil: τ = 16T/(πd³) ve gereken çap tersini verir", () => {
    const T = 500;
    const d = 0.04;
    const tau = shaftShearStress(T, d);
    expect(tau).toBeCloseTo((16 * T) / (Math.PI * d ** 3), 3);
    expect(requiredSolidDiameter(T, tau)).toBeCloseTo(d, 9);
  });
  it("burulma açısı θ = TL/(GJ)", () => {
    const J = (Math.PI * 0.04 ** 4) / 32;
    expect(shaftTwist(500, 1, 81e9, 0.04)).toBeCloseTo(500 / (81e9 * J), 12);
  });
});
