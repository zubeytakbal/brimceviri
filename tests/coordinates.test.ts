import { describe, expect, it } from "vitest";
import { formatDms, latLonToTm3, latLonToUtm, parseCoordinate, tm3ToLatLon, utmToLatLon } from "../app/converter/geo/coordinates";

describe("UTM", () => {
  it("matches published values", () => {
    // CN Tower: 43.642567 N, 79.387139 W -> 17T 630084 4833439
    const u = latLonToUtm({ lat: 43.642567, lon: -79.387139 })!;
    expect(u.zone).toBe(17);
    expect(u.band).toBe("T");
    expect(u.easting).toBeCloseTo(630084, -0.5);
    expect(u.northing).toBeCloseTo(4833439, -0.5);
  });
  it("is exact on the central meridian at the equator", () => {
    const u = latLonToUtm({ lat: 0, lon: 3 })!;
    expect(u.easting).toBeCloseTo(500000, 3);
    expect(u.northing).toBeCloseTo(0, 3);
  });
  it("round-trips across Turkey", () => {
    for (const p of [{ lat: 41.0082, lon: 28.9784 }, { lat: 39.9208, lon: 32.8541 }, { lat: 38.5012, lon: 43.3729 }, { lat: -33.86, lon: 151.21 }]) {
      const u = latLonToUtm(p)!;
      const back = utmToLatLon(u.zone, u.hemisphere, u.easting, u.northing);
      expect(back.lat).toBeCloseTo(p.lat, 8);
      expect(back.lon).toBeCloseTo(p.lon, 8);
    }
  });
  it("uses zones 35-37 in Turkey", () => {
    expect(latLonToUtm({ lat: 41.0082, lon: 28.9784 })!.zone).toBe(35);
    expect(latLonToUtm({ lat: 39.9208, lon: 32.8541 })!.zone).toBe(36);
    expect(latLonToUtm({ lat: 39.9, lon: 41.27 })!.zone).toBe(37);
  });
});

describe("3-degree TM", () => {
  it("picks the nearest meridian and round-trips", () => {
    const p = { lat: 39.9208, lon: 32.8541 };
    const t = latLonToTm3(p);
    expect(t.meridian).toBe(33);
    const back = tm3ToLatLon(t.meridian, t.easting, t.northing);
    expect(back.lat).toBeCloseTo(p.lat, 8);
    expect(back.lon).toBeCloseTo(p.lon, 8);
  });
});

describe("parsing and formatting", () => {
  it("parses common formats", () => {
    expect(parseCoordinate("39.9208, 32.8541")).toEqual({ lat: 39.9208, lon: 32.8541 });
    expect(parseCoordinate("39,9208, 32,8541")).toEqual({ lat: 39.9208, lon: 32.8541 });
    const dms = parseCoordinate(`39°55'15" K 32°51'15" D`)!;
    expect(dms.lat).toBeCloseTo(39.920833, 5);
    expect(dms.lon).toBeCloseTo(32.854167, 5);
    const west = parseCoordinate(`40 42 46 N 74 0 22 W`)!;
    expect(west.lon).toBeCloseTo(-74.00611, 4);
    expect(parseCoordinate("-33.86 151.21")).toEqual({ lat: -33.86, lon: 151.21 });
  });
  it("formats DMS", () => {
    expect(formatDms(39.920833, "lat")).toBe("39°55′15.00″ K");
    expect(formatDms(-74.006111, "lon", "en")).toBe("74°00′22.00″ W");
  });
});
