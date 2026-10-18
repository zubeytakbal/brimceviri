import { describe, expect, it } from "vitest";
import { angles, degreeInSign, localSiderealTime, localToUtc, natalChart, risingDurations, sunLongitude } from "../app/converter/time/natalChart";

const rad = Math.PI / 180;

describe("doğum haritası", () => {
  it("Türkiye'nin geçmiş saat dilimleri (2016 öncesi kışın UTC+2)", () => {
    expect(localToUtc(1985, 1, 15, 12, 0).toISOString()).toBe("1985-01-15T10:00:00.000Z");
    expect(localToUtc(2000, 7, 1, 12, 0).toISOString()).toBe("2000-07-01T09:00:00.000Z");
    expect(localToUtc(2017, 1, 15, 12, 0).toISOString()).toBe("2017-01-15T09:00:00.000Z");
  });

  it("astronomy-engine ile karşılaştırılan değerler", () => {
    const d = new Date("1990-05-15T07:30:00Z");
    expect(angles(d, 41.01, 28.98).asc).toBeCloseTo(120.54, 1);
    expect(sunLongitude(d)).toBeCloseTo(54.215, 1);
    expect(angles(new Date("2005-11-03T18:10:00Z"), 39.93, 32.86).asc).toBeCloseTo(98.67, 1);
  });

  it("yükselen nokta doğu ufkunda (yükseklik 0)", () => {
    const d = new Date("2012-03-08T04:20:00Z");
    const lat = 38.42;
    const lon = 27.14;
    const { asc } = angles(d, lat, lon);
    const eps = 23.4393 * rad;
    const ra = Math.atan2(Math.sin(asc * rad) * Math.cos(eps), Math.cos(asc * rad));
    const dec = Math.asin(Math.sin(asc * rad) * Math.sin(eps));
    const H = localSiderealTime(d, lon) * rad - ra;
    const alt = Math.asin(Math.sin(lat * rad) * Math.sin(dec) + Math.cos(lat * rad) * Math.cos(dec) * Math.cos(H)) / rad;
    expect(Math.abs(alt)).toBeLessThan(0.05);
    expect(Math.sin(H)).toBeLessThan(0); // doğu yarısı
  });

  it("burç derecesi ve yükselme süreleri", () => {
    expect(degreeInSign(254.5)).toEqual({ sign: 8, deg: 14, min: 30 });
    const r = risingDurations(new Date("2026-10-18T00:00:00Z"), 41.01, 28.98);
    expect(r.reduce((a, b) => a + b, 0)).toBe(1436);
    const n = natalChart(new Date("1990-05-15T07:30:00Z"), 41.01, 28.98);
    expect(n.ascRange[0]).toBe(4);
  });
});
