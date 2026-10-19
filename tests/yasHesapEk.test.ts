import { describe, expect, it } from "vitest";
import { burc, canliSure, gunlukOlma, sonrakiYuvarlakGun } from "../app/converter/yasHesap";

describe("yaş hesaplama ekleri", () => {
  it("burçlar: sınır günleri", () => {
    expect(burc({ year: 2000, month: 1, day: 1 })).toBe("Oğlak");
    expect(burc({ year: 2000, month: 1, day: 20 })).toBe("Kova");
    expect(burc({ year: 2000, month: 3, day: 20 })).toBe("Balık");
    expect(burc({ year: 2000, month: 3, day: 21 })).toBe("Koç");
    expect(burc({ year: 2000, month: 8, day: 23 })).toBe("Başak");
    expect(burc({ year: 2000, month: 12, day: 21 })).toBe("Yay");
    expect(burc({ year: 2000, month: 12, day: 22 })).toBe("Oğlak");
  });

  it("10.000 günlük olma tarihi: 1 Ocak 2000 doğumlu → 19 Mayıs 2027", () => {
    expect(gunlukOlma({ year: 2000, month: 1, day: 1 }, 10000, { year: 2026, month: 10, day: 19 })).toEqual({ tarih: { year: 2027, month: 5, day: 19 }, kalan: 212 });
    expect(sonrakiYuvarlakGun({ year: 2000, month: 1, day: 1 }, { year: 2026, month: 10, day: 19 }).n).toBe(10000);
  });

  it("canlı süre Türkiye saatiyle: doğumdan 1 gün sonra 86.400 saniye", () => {
    const simdi = Date.UTC(2000, 0, 2, 9, 30) - 3 * 3600000;
    expect(canliSure({ year: 2000, month: 1, day: 1 }, 9, 30, simdi)).toEqual({ saniye: 86400, dakika: 1440, saat: 24 });
  });
});
