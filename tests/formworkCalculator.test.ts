import { describe, expect, it } from "vitest";
import { calculateFormworkArea } from "../app/converter/formworkCalculator";

describe("beton kalıp alanı", () => {
  it("döşemenin alt yüzey alanını hesaplar", () => {
    expect(calculateFormworkArea({
      element: "doseme",
      lengthM: 5,
      widthM: 4,
      heightM: 0,
      quantity: 1,
    })).toEqual({ areaPerElementM2: 20, totalAreaM2: 20, quantity: 1 });
  });

  it("kolonun dört yan yüzünü ve adet çarpanını hesaplar", () => {
    expect(calculateFormworkArea({
      element: "kolon",
      lengthM: 0.4,
      widthM: 0.5,
      heightM: 3,
      quantity: 4,
    })).toEqual({ areaPerElementM2: 5.4, totalAreaM2: 21.6, quantity: 4 });
  });

  it("kirişte alt ve iki yan yüzü hesaplar", () => {
    const result = calculateFormworkArea({
      element: "kiris",
      lengthM: 6,
      widthM: 0.3,
      heightM: 0.5,
      quantity: 1,
    });
    expect(result?.areaPerElementM2).toBeCloseTo(7.8);
    expect(result?.totalAreaM2).toBeCloseTo(7.8);
    expect(result?.quantity).toBe(1);
  });

  it("tekil temel için tüm yan yüzleri hesaplar", () => {
    expect(calculateFormworkArea({
      element: "tekil-temel",
      lengthM: 1.5,
      widthM: 1.5,
      heightM: 0.5,
      quantity: 2,
    })).toEqual({ areaPerElementM2: 3, totalAreaM2: 6, quantity: 2 });
  });

  it("geçersiz ölçü, adet veya taşan sonuç için null döndürür", () => {
    const valid = { element: "doseme" as const, lengthM: 5, widthM: 4, heightM: 0, quantity: 1 };
    expect(calculateFormworkArea({ ...valid, lengthM: 0 })).toBeNull();
    expect(calculateFormworkArea({ ...valid, quantity: 1.5 })).toBeNull();
    expect(calculateFormworkArea({ ...valid, lengthM: Number.MAX_VALUE, widthM: Number.MAX_VALUE })).toBeNull();
  });
});
