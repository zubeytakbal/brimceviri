import { describe, expect, it } from "vitest";
import { boyaKilo, dosemeBeton, fayansKutu, kmMaliyet } from "../app/converter/evHesaplari";

describe("boya kilo", () => {
  it("alan × kat ÷ sarfiyat, kutu dağılımı yukarı yuvarlanır", () => {
    const r = boyaKilo(350, 2, 12)!;
    expect(r.kg).toBeCloseTo(58.33, 2);
    expect(r.kutular).toEqual([
      { kg: 15, adet: 3 },
      { kg: 7.5, adet: 1 },
      { kg: 2.5, adet: 3 },
    ]);
    expect(r.alinan).toBe(60);
    expect(boyaKilo(0, 2, 10)).toBeNull();
  });
  it("tam kutu", () => {
    expect(boyaKilo(75, 2, 10)!.kutular).toEqual([{ kg: 15, adet: 1 }]);
  });
});

describe("fayans kutu", () => {
  it("60x60, 4'lü kutu, %10 fire", () => {
    const r = fayansKutu(20, 60, 60, 4, 10)!;
    expect(r.kutuM2).toBeCloseTo(1.44);
    expect(r.adet).toBe(62);
    expect(r.kutu).toBe(16);
  });
});

describe("döşeme betonu ve yakıt", () => {
  it("beton", () => {
    expect(dosemeBeton(100, 15, 8)).toEqual({ m3: 15, litre: 15000, ton: 36, mikser: 2 });
  });
  it("km maliyet", () => {
    const r = kmMaliyet(7, 50)!;
    expect(r.tlKm).toBe(3.5);
    expect(r.kurusKm).toBe(350);
    expect(r.tl100km).toBe(350);
  });
});

describe("kitchen spoons follow the cup standard", () => {
  it("US cup = 16 tbsp = 48 tsp; Turkish 200 ml = 13.3 tbsp", async () => {
    const { convertKitchenValue } = await import("../app/converter/kitchenMeasures");
    const us = convertKitchenValue("un", "bardak", 1, "us");
    expect(us.yemekKasigi).toBeCloseTo(16, 6);
    expect(us.cayKasigi).toBeCloseTo(48, 6);
    expect(convertKitchenValue("un", "bardak", 1, "turkish").yemekKasigi).toBeCloseTo(13.333, 2);
    expect(convertKitchenValue("un", "yemekKasigi", 16, "us").bardak).toBeCloseTo(1, 6);
  });
});
