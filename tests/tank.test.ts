import { describe, expect, it } from "vitest";
import { dipChart, filledVolume, heightForVolume, tankVolume, type TankShape } from "../app/converter/plumbing/tank";

describe("tank hacmi", () => {
  const hz: TankShape = { kind: "horizontal", D: 1, L: 2, heads: "flat" };
  it("yatay silindir: tam hacim πr²L, yarı dolu hacmin yarısı", () => {
    expect(tankVolume(hz)).toBeCloseTo(Math.PI * 0.25 * 2, 9);
    expect(filledVolume(hz, 0.5)).toBeCloseTo(tankVolume(hz) / 2, 9);
  });
  it("yatay silindir çeyrek yükseklik: kesim alanı (π/3 − √3/4)·r²·... (h = r/2)", () => {
    // h = r/2 için daire kesimi alanı r²(π/3 − √3/4)
    const r = 0.5;
    expect(filledVolume(hz, 0.25)).toBeCloseTo(r * r * (Math.PI / 3 - Math.sqrt(3) / 4) * 2, 9);
  });
  it("yarım küre başlı: tam hacim = silindir + küre", () => {
    const k: TankShape = { kind: "horizontal", D: 1, L: 2, heads: "hemi" };
    expect(tankVolume(k)).toBeCloseTo(Math.PI * 0.25 * 2 + (4 / 3) * Math.PI * 0.125, 9);
    expect(filledVolume(k, 0.5)).toBeCloseTo(tankVolume(k) / 2, 9);
  });
  it("dikey silindir ve dikdörtgen doğrusal", () => {
    expect(filledVolume({ kind: "vertical", D: 2, H: 3 }, 1.5)).toBeCloseTo(Math.PI * 1.5, 9);
    expect(filledVolume({ kind: "box", W: 1, L: 2, H: 1 }, 0.4)).toBeCloseTo(0.8, 9);
  });
  it("hacimden yükseklik tersine çözülür", () => {
    const v = filledVolume(hz, 0.37);
    expect(heightForVolume(hz, v)).toBeCloseTo(0.37, 6);
  });
  it("ölçü çubuğu tablosu tam hacimle biter", () => {
    const c = dipChart(hz, 0.1);
    expect(c[0].liters).toBe(0);
    expect(c[c.length - 1].liters).toBeCloseTo(tankVolume(hz) * 1000, 6);
  });
});
