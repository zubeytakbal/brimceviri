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
