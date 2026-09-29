import { describe, expect, it } from "vitest";
import {
  AAM_1448,
  adadAyyam,
  ahdath,
  ijazaQadima,
  nihayatFasl1,
  yawmDirasi,
} from "../app/converter/calendar/saMadrasi";
import { gregorianToHijri } from "../app/converter/time/calendars";
import { ymdKey } from "../app/converter/time/dateMath";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("التقويم الدراسي 1448", () => {
  it("matches the Hijri dates announced by the ministry", () => {
    expect(gregorianToHijri(AAM_1448.bidaya)).toEqual({
      year: 1448,
      month: 3,
      day: 10,
    });
    expect(gregorianToHijri(AAM_1448.fasl2)).toEqual({
      year: 1448,
      month: 8,
      day: 9,
    });
    expect(gregorianToHijri(AAM_1448.nihaya)).toEqual({
      year: 1449,
      month: 1,
      day: 19,
    });
  });

  it("marks school days", () => {
    expect(yawmDirasi(AAM_1448, d("2026-08-23"))).toBe(true);
    expect(yawmDirasi(AAM_1448, d("2026-08-23"), true)).toBe(false);
    expect(yawmDirasi(AAM_1448, d("2026-09-23"))).toBe(false);
    expect(yawmDirasi(AAM_1448, d("2026-09-27"))).toBe(true);
    expect(yawmDirasi(AAM_1448, d("2026-09-25"))).toBe(false);
    expect(ymdKey(nihayatFasl1(AAM_1448))).toBe("2027-01-07");
    expect(adadAyyam(AAM_1448, d("2026-09-20"), d("2026-09-26"))).toBe(3);
  });

  it("computes return days and the next holiday", () => {
    const h = Object.fromEntries(ahdath(AAM_1448).map((x) => [x.id, x]));
    expect(ymdKey(h["eid-al-fitr"].awda!)).toBe("2027-03-14");
    expect(ymdKey(h["eid-al-adha"].awda!)).toBe("2027-05-23");
    expect(ymdKey(h["founding-day"].awda!)).toBe("2027-02-23");
    expect(ymdKey(h.summer.min)).toBe("2027-06-25");
    expect(ijazaQadima(AAM_1448, d("2026-09-29"))?.id).toBe("autumn");
    expect(ijazaQadima(AAM_1448, d("2026-11-22"))?.id).toBe("autumn");
  });
});
