import { describe, expect, it } from "vitest";
import { dogumYilinaGoreYas, duzeltilmisYas, sonrakiDogumGunu, yasBilgisi, yasFarki } from "../app/converter/yasHesap";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("yaş", () => {
  it("yıl, ay, gün ve sonraki doğum günü", () => {
    const r = yasBilgisi(d(2000, 5, 15), d(2026, 10, 3))!;
    expect([r.yil, r.ay, r.gun]).toEqual([26, 4, 18]);
    expect(r.sonrakiDogumGunu).toEqual(d(2027, 5, 15));
    expect(r.yeniYas).toBe(27);
    expect(r.kalanGun).toBe(224);
    expect(r.toplamGun).toBe(9637);
    expect(yasBilgisi(d(2027, 1, 1), d(2026, 1, 1))).toBeNull();
  });
  it("doğum günü bugünse kalan 0", () => {
    const r = yasBilgisi(d(1990, 10, 3), d(2026, 10, 3))!;
    expect(r.yil).toBe(36);
    expect(r.kalanGun).toBe(0);
    expect(r.yeniYas).toBe(36);
  });
  it("29 Şubat doğumlu artık olmayan yılda 28 Şubat'ta yaş alır", () => {
    expect(sonrakiDogumGunu(d(2004, 2, 29), d(2026, 1, 10)).gun).toEqual(d(2026, 2, 28));
    expect(sonrakiDogumGunu(d(2004, 2, 29), d(2027, 3, 1)).gun).toEqual(d(2028, 2, 29));
  });
  it("yaş farkı", () => {
    const r = yasFarki(d(1995, 3, 10), d(1998, 7, 20));
    expect([r.yil, r.ay, r.gun, r.buyuk]).toEqual([3, 4, 10, "a"]);
    expect(yasFarki(d(1998, 7, 20), d(1995, 3, 10)).buyuk).toBe("b");
  });
  it("düzeltilmiş yaş", () => {
    const r = duzeltilmisYas(d(2026, 1, 1), 32, d(2026, 7, 1))!;
    expect(r.dusulenHafta).toBe(8);
    expect(r.tahminiDogum).toEqual(d(2026, 2, 26));
    expect(r.duzeltilmis).toEqual({ years: 0, months: 4, days: 5, totalMonths: 4 });
    expect(duzeltilmisYas(d(2026, 1, 1), 20, d(2026, 7, 1))).toBeNull();
  });
  it("doğum yılına göre", () => {
    expect(dogumYilinaGoreYas(2000, 2026)).toEqual({ geldiyse: 26, gelmediyse: 25 });
  });
});
