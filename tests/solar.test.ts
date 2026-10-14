import { describe, expect, it } from "vitest";
import { seasons, sunPosition, sunTimes, twilight } from "../app/converter/time/solar";

// Referans değerler PyEphem 4.2 (VSOP87) ile üretildi: güneş merkezi ufkun 50′ altında (34′ kırılma +
// 16′ yarıçap), sivil alacakaranlık −6°. Konumlar NREL SPA (pvlib 0.16, 1013,25 hPa, 12 °C) ile.
const RISE_SET = [
  ["istanbul", 41.0082, 28.9784, 2026, 3, 20, "2026-03-20T04:07:49Z", "2026-03-20T16:15:57Z", "2026-03-20T03:40:25Z", "2026-03-20T16:43:24Z"],
  ["istanbul", 41.0082, 28.9784, 2026, 6, 21, "2026-06-21T02:32:01Z", "2026-06-21T17:39:44Z", "2026-06-21T01:58:21Z", "2026-06-21T18:13:24Z"],
  ["istanbul", 41.0082, 28.9784, 2026, 12, 21, "2026-12-21T05:25:25Z", "2026-12-21T14:38:47Z", "2026-12-21T04:54:15Z", "2026-12-21T15:09:57Z"],
  ["ankara", 39.9199, 32.8543, 2026, 6, 21, "2026-06-21T02:20:08Z", "2026-06-21T17:20:36Z", "2026-06-21T01:47:19Z", "2026-06-21T17:53:26Z"],
  ["ankara", 39.9199, 32.8543, 2026, 1, 5, "2026-01-05T05:10:25Z", "2026-01-05T14:37:37Z", "2026-01-05T04:40:11Z", "2026-01-05T15:07:51Z"],
  ["van", 38.4946, 43.38, 2026, 9, 23, "2026-09-23T02:54:53Z", "2026-09-23T15:02:16Z", "2026-09-23T02:28:25Z", "2026-09-23T15:28:41Z"],
  ["van", 38.4946, 43.38, 2026, 12, 21, "2026-12-21T04:20:08Z", "2026-12-21T13:48:49Z", "2026-12-21T03:50:20Z", "2026-12-21T14:18:37Z"],
  ["sinop", 42.0231, 35.1531, 2026, 6, 21, "2026-06-21T02:03:48Z", "2026-06-21T17:18:33Z", "2026-06-21T01:29:17Z", "2026-06-21T17:53:04Z"],
  ["hatay", 36.2021, 36.1603, 2026, 12, 21, "2026-12-21T04:42:33Z", "2026-12-21T14:24:11Z", "2026-12-21T04:13:50Z", "2026-12-21T14:52:53Z"],
] as const;

const SEASONS = [
  [2026, "2026-03-20T14:45:53Z", "2026-06-21T08:24:31Z", "2026-09-23T00:05:09Z", "2026-12-21T20:49:59Z"],
  [2030, "2030-03-20T13:51:46Z", "2030-06-21T07:31:17Z", "2030-09-22T23:26:50Z", "2030-12-21T20:09:18Z"],
] as const;

const POSITIONS = [
  [39.9199, 32.8543, "2026-06-21T09:30:00Z", 72.97, 163.853],
  [41.0082, 28.9784, "2026-12-21T07:00:00Z", 13.024, 137.806],
  [38.4946, 43.38, "2026-03-20T13:45:00Z", 17.259, 255.718],
] as const;

const diffSeconds = (a: Date, iso: string) => Math.abs(a.getTime() - Date.parse(iso)) / 1000;

describe("güneş doğuşu, batışı ve alacakaranlık (PyEphem ile)", () => {
  for (const [id, lat, lon, y, m, d, rise, set, dawn, dusk] of RISE_SET) {
    it(`${id} ${d}.${m}.${y}: fark 20 saniyeden az`, () => {
      const s = sunTimes(y, m, d, lat, lon);
      expect(s.kind).toBe("normal");
      if (s.kind !== "normal") return;
      expect(diffSeconds(s.sunrise, rise)).toBeLessThan(20);
      expect(diffSeconds(s.sunset, set)).toBeLessThan(20);
      const c = twilight(y, m, d, lat, lon).civil!;
      expect(diffSeconds(c[0], dawn)).toBeLessThan(20);
      expect(diffSeconds(c[1], dusk)).toBeLessThan(20);
    });
  }
});

describe("gündönümü ve ekinoks anları (PyEphem ile)", () => {
  for (const [y, march, june, september, december] of SEASONS) {
    it(`${y}: fark 90 saniyeden az`, () => {
      const s = seasons(y);
      expect(diffSeconds(s.march, march)).toBeLessThan(90);
      expect(diffSeconds(s.june, june)).toBeLessThan(90);
      expect(diffSeconds(s.september, september)).toBeLessThan(90);
      expect(diffSeconds(s.december, december)).toBeLessThan(90);
    });
  }
});

describe("güneşin konumu (NREL SPA ile)", () => {
  for (const [lat, lon, iso, el, az] of POSITIONS) {
    it(`${lat}, ${lon} ${iso}: 0,05°'den az fark`, () => {
      const p = sunPosition(new Date(iso), lat, lon);
      expect(Math.abs(p.elevation - el)).toBeLessThan(0.05);
      expect(Math.abs(p.azimuth - az)).toBeLessThan(0.05);
    });
  }
});

describe("kutup bölgeleri", () => {
  it("Tromsø'da haziran kutup gündüzü, aralık kutup gecesi", () => {
    expect(sunTimes(2026, 6, 21, 69.65, 18.96).kind).toBe("polar-day");
    expect(sunTimes(2026, 12, 21, 69.65, 18.96).kind).toBe("polar-night");
  });
});

describe("Türkiye yıllık güneş yardımcıları", () => {
  it("saat ekleri okunuşa göre", async () => {
    const { atClock, toClock } = await import("../app/converter/time/sunYear");
    const at = (h: number, m: number) => new Date(Date.UTC(2026, 0, 1, h - 3, m));
    expect(atClock(at(5, 20))).toBe("05:20'de");
    expect(atClock(at(17, 40))).toBe("17:40'ta");
    expect(atClock(at(6, 30))).toBe("06:30'da");
    expect(atClock(at(6, 0))).toBe("06:00'da");
    expect(toClock(at(18, 13))).toBe("18:13'e");
  });
  it("Ankara: en erken gün batımı aralık başında, en geç doğuş ocak başında", async () => {
    const { sunExtremes } = await import("../app/converter/time/sunYear");
    const e = sunExtremes(2026, 39.9199, 32.8543);
    expect(e.earliestSunset.month).toBe(12);
    expect(e.earliestSunset.day).toBeLessThan(15);
    expect(e.latestSunrise.month).toBe(1);
    expect(e.longest.month).toBe(6);
    expect(e.shortest.month).toBe(12);
  });
});
