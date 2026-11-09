import { describe, expect, it } from "vitest";
import { cityNameDe, citySlugDe, findCityDe } from "../app/converter/time/germanWorld";
import { worldCities } from "../app/converter/time/worldCities";

describe("German city pages", () => {
  it("has a unique German slug for every city that resolves back to it", () => {
    const slugs = worldCities.map(citySlugDe);
    expect(new Set(slugs).size).toBe(worldCities.length);
    for (const city of worldCities) expect(findCityDe(citySlugDe(city))?.en).toBe(city.en);
  });

  it("uses German names and slugs where they differ", () => {
    const byEn = (en: string) => worldCities.find((c) => c.en === en)!;
    expect(cityNameDe(byEn("tokyo"))).toBe("Tokio");
  });
});
