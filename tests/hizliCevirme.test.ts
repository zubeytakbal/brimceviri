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
