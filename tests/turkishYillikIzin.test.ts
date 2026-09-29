import { describe, expect, it } from "vitest";
import {
  izinDonus,
  izinHakki,
  izinSuresi,
  izinUcreti,
  tamYil,
} from "../app/converter/turkishYillikIzin";
import { ymdKey } from "../app/converter/time/dateMath";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("Yıllık izin süresi (İş Kanunu md. 53)", () => {
  it("uses 14/20/26 days by seniority", () => {
    expect(izinSuresi(0, 30)).toBe(0);
    expect(izinSuresi(1, 30)).toBe(14);
    expect(izinSuresi(5, 30)).toBe(14);
    expect(izinSuresi(6, 30)).toBe(20);
    expect(izinSuresi(14, 30)).toBe(20);
    expect(izinSuresi(15, 30)).toBe(26);
  });
  it("gives at least 20 days to 18 and younger / 50 and older, +4 underground", () => {
    expect(izinSuresi(1, 18)).toBe(20);
    expect(izinSuresi(2, 50)).toBe(20);
    expect(izinSuresi(20, 55)).toBe(26);
    expect(izinSuresi(1, 30, true)).toBe(18);
  });
  it("counts full years and entitlement dates", () => {
    expect(tamYil(d("2020-09-30"), d("2026-09-29"))).toBe(5);
    const h = izinHakki(d("2020-09-30"), d("2026-09-29"), d("1990-01-01"));
    expect(h.kidem).toBe(5);
    expect(h.gun).toBe(14);
    expect(ymdKey(h.sonraki)).toBe("2026-09-30");
    expect(h.sonrakiGun).toBe(20);
    expect(h.toplam).toBe(70);
    expect(izinHakki(d("2026-01-15"), d("2026-09-29"), null).gun).toBe(0);
  });
});

describe("İzin dönüş tarihi", () => {
  it("skips Sundays and public holidays, counts Saturdays by default", () => {
    // 2026-10-26 Pazartesi, 14 gün: 28 Ekim arefe yarım, 29 Ekim tatil
    const r = izinDonus(d("2026-10-26"), 14);
    expect(r.sayilmayan.map((g) => g.tur)).toContain("tatil");
    expect(r.yarimlar).toHaveLength(1);
    expect(ymdKey(r.son)).toBe("2026-11-12");
    expect(ymdKey(r.donus)).toBe("2026-11-13");
  });
  it("can exclude Saturdays", () => {
    const r = izinDonus(d("2026-11-02"), 5, false);
    expect(ymdKey(r.son)).toBe("2026-11-06");
    expect(ymdKey(r.donus)).toBe("2026-11-09");
  });
  it("computes unused leave pay", () => {
    expect(izinUcreti(60000, 14)).toBe(28000);
  });
});
