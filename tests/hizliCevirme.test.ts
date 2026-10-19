import { describe, expect, it } from "vitest";
import { birimCevir } from "../app/converter/hizliCevir";
import { convert } from "../app/converter/convert";
import { hizliCevirmeVerisi } from "../app/converter/hizliCevirmeVeri";

describe("hızlı çeviri kartları", () => {
  const veri = hizliCevirmeVerisi(null);

  it("her kategoride sonuç sitenin ana çeviri hesabıyla aynı", () => {
    for (const k of veri.kategoriler) {
      const [a, b] = [k.birimler[0], k.birimler[k.birimler.length - 1]];
      for (const v of [1, 37.5]) {
        const beklenen = convert(k.key, v, a.s, b.s);
        expect(birimCevir(k, v, a, b)).toBeCloseTo(beklenen, 9 - Math.max(0, Math.round(Math.log10(Math.abs(beklenen) || 1))));
      }
    }
  });

  it("örnekler: 1 inç = 2,54 cm, 30 °C = 86 °F", () => {
    const uz = veri.kategoriler.find((k) => k.key === "uzunluk")!;
    const s = veri.kategoriler.find((k) => k.key === "sicaklik")!;
    const b = (k: typeof uz, x: string) => k.birimler.find((u) => u.s === x)!;
    expect(birimCevir(uz, 1, b(uz, "in"), b(uz, "cm"))).toBeCloseTo(2.54, 10);
    expect(birimCevir(s, 30, b(s, "C"), b(s, "F"))).toBeCloseTo(86, 10);
  });

  it("kur verisi yoksa döviz kartı olmaz", () => {
    expect(veri.doviz).toBeNull();
  });
});

import { betonHacmi, kwAmper } from "../app/converter/hizliCevir";

describe("mühendislik kartları", () => {
  it("beton: 5 × 4 m, 15 cm, %5 fire = 3,15 m³", () => {
    expect(betonHacmi(5, 4, 15, 5)).toBeCloseTo(3.15, 10);
  });
  it("kW → amper: tam sayfadaki örneklerle aynı", () => {
    // 2 kW, 230 V tek faz, cos φ 0,95 → 9,15 A; 5,5 kW 400 V üç faz cos φ 0,9 (verim %100) → 8,82 A
    expect(kwAmper(2, 230, false, 0.95)).toBeCloseTo(9.153, 2);
    expect(kwAmper(5.5, 400, true, 0.9)).toBeCloseTo(8.821, 2);
  });
});
