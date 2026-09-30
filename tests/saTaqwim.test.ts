import { describe, expect, it } from "vitest";
import {
  findMunasaba,
  hijriNass,
  kharitatSana,
  mawaid,
  mawidRatib,
  shahrHijri,
  tahwilIjaza,
} from "../app/converter/calendar/saTaqwim";
import { ymdKey } from "../app/converter/time/dateMath";

const k = (id: string, y: number) =>
  mawaid(findMunasaba(id)!, y).map((t) => ymdKey(t.tarikh));

describe("التقويم السعودي", () => {
  it("uses Umm al-Qura for Ramadan and Eid 1448", () => {
    expect(k("ramadan", 2027)).toEqual(["2027-02-08"]);
    expect(k("eid-al-fitr", 2027)).toEqual(["2027-03-09"]);
    expect(k("day-of-arafah", 2027)).toEqual(["2027-05-15"]);
    expect(k("eid-al-adha", 2027)).toEqual(["2027-05-16"]);
    expect(shahrHijri(1448, 9).bidaya).toEqual({
      year: 2027,
      month: 2,
      day: 8,
    });
  });

  it("applies private-sector Eid holiday rules", () => {
    const adha = mawaid(findMunasaba("eid-al-adha")!, 2027)[0];
    expect(ymdKey(adha.ijazaMin!)).toBe("2027-05-15");
    expect(ymdKey(adha.ijazaIla!)).toBe("2027-05-18");
    const fitr = mawaid(findMunasaba("eid-al-fitr")!, 2027)[0];
    // اليوم التالي لـ 29 رمضان
    const r29 = { year: 2027, month: 3, day: 8 };
    expect(ymdKey(fitr.ijazaMin!)).toBe(ymdKey({ ...r29, day: 9 }));
    expect(kharitatSana(2027).ijazat.has("2027-03-12")).toBe(true);
  });

  it("moves national holidays off Friday/Saturday", () => {
    expect(tahwilIjaza({ year: 2028, month: 9, day: 23 })).toEqual({
      year: 2028,
      month: 9,
      day: 24,
    });
    expect(tahwilIjaza({ year: 2030, month: 2, day: 22 })).toEqual({
      year: 2030,
      month: 2,
      day: 21,
    });
    expect(k("founding-day", 2021)).toEqual([]);
  });

  it("computes government salary dates", () => {
    expect(mawidRatib(2026, 9)).toEqual({ year: 2026, month: 9, day: 27 });
    expect(mawidRatib(2026, 11)).toEqual({ year: 2026, month: 11, day: 26 });
    expect(mawidRatib(2027, 2)).toEqual({ year: 2027, month: 2, day: 28 });
    expect(hijriNass({ year: 2026, month: 9, day: 29 })).toBe(
      "18 ربيع الآخر 1448هـ",
    );
  });
});
