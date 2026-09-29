import { describe, expect, it } from "vitest";
import { dersGunu, OKUL_YILLARI, okulTatiliMi, siradakiOkulOlaylari } from "../app/converter/calendar/okulTakvimi";

describe("MEB okul takvimi 2026-2027", () => {
  const y = OKUL_YILLARI[0];
  it("counts school days without weekends, public holidays and breaks", () => {
    // 95 hafta içi − 29 Ekim − 1 Ocak − 5 gün ara tatil
    expect(dersGunu(y.acilis, y.karne1, y)).toBe(88);
    // 100 hafta içi − 5 gün ara tatil (Ramazan Bayramı içinde) − 23 Nisan − 17-19 Mayıs Kurban/19 Mayıs
    expect(dersGunu(y.ikinciDonem, y.kapanis, y)).toBe(91);
  });
  it("finds the next event and breaks", () => {
    expect(siradakiOkulOlaylari({ year: 2026, month: 9, day: 29 })[0].id).toBe("ara1");
    expect(siradakiOkulOlaylari({ year: 2026, month: 11, day: 18 })[0].id).toBe("ara1");
    expect(okulTatiliMi({ year: 2027, month: 1, day: 30 })).toBe(true);
    expect(okulTatiliMi({ year: 2027, month: 2, day: 8 })).toBe(false);
  });
});
