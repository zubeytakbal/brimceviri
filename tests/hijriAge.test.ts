import { describe, expect, it } from "vitest";
import {
  hisabUmr,
  hijriShahrTul,
  miladMiladiQadim,
} from "../app/converter/time/hijriAge";
import { ymdKey } from "../app/converter/time/dateMath";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("حساب العمر بالهجري", () => {
  it("computes Hijri and Gregorian age", () => {
    const r = hisabUmr(d("2000-01-01"), d("2026-09-29"))!;
    expect(r.miladHijri).toEqual({ year: 1420, month: 9, day: 24 });
    expect(r.hijri).toEqual({ years: 27, months: 6, days: 23 });
    expect(r.miladi).toEqual({ years: 26, months: 8, days: 28 });
    expect(r.ayyam).toBe(9768);
  });

  it("finds the next birthdays", () => {
    const r = hisabUmr(d("2000-01-01"), d("2026-09-29"))!;
    // 24 رمضان 1448 = 3 مارس 2027
    expect(ymdKey(r.qadimHijri.tarikh)).toBe("2027-03-03");
    expect(r.qadimHijri.umr).toBe(28);
    expect(ymdKey(r.qadimMiladi.tarikh)).toBe("2027-01-01");
    expect(
      ymdKey(miladMiladiQadim(d("2004-02-29"), d("2027-01-10")).tarikh),
    ).toBe("2027-02-28");
  });

  it("handles month lengths and invalid input", () => {
    expect(hijriShahrTul(1448, 3)).toBe(29);
    expect(hijriShahrTul(1448, 4)).toBe(30);
    expect(hisabUmr(d("2027-01-01"), d("2026-01-01"))).toBeNull();
    expect(hisabUmr(d("2026-09-29"), d("2026-09-29"))!.hijri).toEqual({
      years: 0,
      months: 0,
      days: 0,
    });
  });
});

describe("adadAr", () => {
  it("uses correct Arabic number agreement", async () => {
    const { adadAr } = await import("../app/converter/calendar/saTaqwim");
    expect(adadAr(1, "sana")).toBe("سنة واحدة");
    expect(adadAr(2, "shahr")).toBe("شهران");
    expect(adadAr(6, "shahr")).toBe("6 أشهر");
    expect(adadAr(23, "yawm")).toBe("23 يومًا");
    expect(adadAr(0, "yawm")).toBe("0 يوم");
    expect(adadAr(103, "yawm")).toBe("103 أيام");
    expect(adadAr(9768, "yawm")).toBe("9,768 يومًا");
  });
});
