import { describe, expect, it } from "vitest";
import {
  gregorianToHijri,
  gregorianToRumi,
  hijriToGregorian,
  jdnToJulian,
  gregorianToJdn,
  rumiToGregorian,
} from "../app/converter/time/calendars";

describe("Rumi calendar", () => {
  it("matches well-known Republic-era dates", () => {
    expect(gregorianToRumi({ year: 1919, month: 5, day: 19 })).toEqual({ year: 1335, month: 5, day: 19 });
    expect(gregorianToRumi({ year: 1920, month: 4, day: 23 })).toEqual({ year: 1336, month: 4, day: 23 });
    expect(gregorianToRumi({ year: 1923, month: 10, day: 29 })).toEqual({ year: 1339, month: 10, day: 29 });
  });

  it("uses the Julian calendar with a March new year before 1917", () => {
    // 1 Mart 1256 = 13 Mart 1840
    expect(gregorianToRumi({ year: 1840, month: 3, day: 13 })).toEqual({ year: 1256, month: 3, day: 1 });
    // 1 Ocak 1900 (Miladi) = 20 Aralik 1899 (Julyen) = 20 Kanunuevvel 1315
    expect(gregorianToRumi({ year: 1900, month: 1, day: 1 })).toEqual({ year: 1315, month: 12, day: 20 });
    // Son Julyen gun 15 Subat 1332 = 28 Subat 1917; 16 Subat 1332 "1 Mart 1333" sayildi
    expect(gregorianToRumi({ year: 1917, month: 2, day: 28 })).toEqual({ year: 1332, month: 2, day: 15 });
    expect(gregorianToRumi({ year: 1917, month: 3, day: 1 })).toEqual({ year: 1333, month: 3, day: 1 });
  });

  it("converts back and rejects skipped or out-of-range days", () => {
    expect(rumiToGregorian({ year: 1339, month: 10, day: 29 })).toEqual({ year: 1923, month: 10, day: 29 });
    expect(rumiToGregorian({ year: 1315, month: 12, day: 20 })).toEqual({ year: 1900, month: 1, day: 1 });
    expect(rumiToGregorian({ year: 1332, month: 2, day: 20 })).toBeNull();
    expect(rumiToGregorian({ year: 1332, month: 2, day: 15 })).toEqual({ year: 1917, month: 2, day: 28 });
    expect(rumiToGregorian({ year: 1250, month: 1, day: 1 })).toBeNull();
    expect(gregorianToRumi({ year: 1930, month: 1, day: 1 })).toBeNull();
  });

  it("round-trips every day in range", () => {
    for (let jdn = gregorianToJdn({ year: 1840, month: 3, day: 13 }); jdn <= gregorianToJdn({ year: 1925, month: 12, day: 31 }); jdn += 7) {
      const julian = jdnToJulian(jdn);
      expect(julian.day).toBeGreaterThan(0);
    }
  });
});

describe("Hijri calendar", () => {
  it("converts both ways", () => {
    // 1 Sevval 1448 = 9 Mart 2027 (Ramazan Bayrami)
    expect(gregorianToHijri({ year: 2027, month: 3, day: 9 })).toEqual({ year: 1448, month: 10, day: 1 });
    expect(hijriToGregorian({ year: 1448, month: 10, day: 1 })).toEqual({ year: 2027, month: 3, day: 9 });
    // 1 Muharrem 1 = 16 Temmuz 622 (Julyen) -> tablo takvimi
    expect(hijriToGregorian({ year: 1448, month: 12, day: 10 })).toEqual({ year: 2027, month: 5, day: 16 });
  });
});

describe("historic milestones", () => {
  it("II. Mesrutiyet = 10 Temmuz 1324", () => {
    expect(gregorianToRumi({ year: 1908, month: 7, day: 23 })).toEqual({ year: 1324, month: 7, day: 10 });
  });
});
