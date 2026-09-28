import { describe, expect, it } from "vitest";
import { cropViewBox, currencyNameTr, distanceFromAnkara, timeDiffWithTurkey } from "../app/converter/geo/worldGeo";
import { findCountry, worldCountries } from "../app/converter/geo/worldCountries";

describe("world countries", () => {
  it("has unique slugs and properly capitalised Turkish names", () => {
    expect(worldCountries.length).toBe(196);
    expect(new Set(worldCountries.map((c) => c.id)).size).toBe(worldCountries.length);
    for (const c of worldCountries) expect(c.nameTr[0]).toBe(c.nameTr[0].toLocaleUpperCase("tr-TR"));
  });

  it("follows Turkish usage for Cyprus", () => {
    expect(findCountry("kuzey-kibris-turk-cumhuriyeti")?.capital).toBe("Lefkoşa");
    expect(findCountry("guney-kibris-rum-yonetimi")).not.toBeNull();
  });

  it("computes time differences and distances", () => {
    const summer = new Date(Date.UTC(2026, 6, 1, 12));
    const winter = new Date(Date.UTC(2026, 0, 15, 12));
    expect(timeDiffWithTurkey(findCountry("almanya")!, summer)).toBe(-60);
    expect(timeDiffWithTurkey(findCountry("almanya")!, winter)).toBe(-120);
    expect(timeDiffWithTurkey(findCountry("iran")!, winter)).toBe(30);
    expect(timeDiffWithTurkey(findCountry("kirgizistan")!, winter)).toBe(180);
    const berlin = distanceFromAnkara(findCountry("almanya")!);
    expect(berlin).toBeGreaterThan(1950);
    expect(berlin).toBeLessThan(2100);
  });

  it("names currencies in Turkish and crops maps", () => {
    expect(currencyNameTr("EUR")).toMatch(/Euro/i);
    expect(cropViewBox([findCountry("almanya")!]).split(" ")).toHaveLength(4);
  });
});

describe("English country data", () => {
  it("has a unique English URL, capital and region for every country", async () => {
    const { worldCountriesEn } = await import("../app/converter/geo/worldCountriesEn");
    const { findCountryEn, countryPathEn } = await import("../app/converter/geo/worldGeoEn");
    const ids = new Set<string>();
    for (const c of worldCountries) {
      const e = worldCountriesEn[c.iso3];
      expect(e, c.iso3).toBeTruthy();
      expect(e.capital.length).toBeGreaterThan(1);
      expect(["Africa", "Americas", "Asia", "Europe", "Oceania"]).toContain(e.region);
      expect(ids.has(e.id)).toBe(false);
      ids.add(e.id);
      expect(findCountryEn(e.id)?.iso3).toBe(c.iso3);
    }
    expect(countryPathEn(worldCountries.find((c) => c.iso3 === "USA")!)).toBe("/en/countries/united-states");
  });

  it("reads English-style numbers on the map scale calculator", async () => {
    const { parseEnNumber, parseTrNumber } = await import("../app/components/geo/MapScaleCalculator");
    expect(parseEnNumber("24,000")).toBe(24000);
    expect(parseEnNumber("1:63,360")).toBe(63360);
    expect(parseEnNumber("2.5")).toBe(2.5);
    expect(parseTrNumber("25.000")).toBe(25000);
  });
});
