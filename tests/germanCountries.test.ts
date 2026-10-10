import { describe, expect, it } from "vitest";
import { countryByIso3 } from "../app/converter/geo/worldCountries";
import {
  aehnlichesBundesland,
  countriesDe,
  countryPathDe,
  deOf,
  EUROZONE,
  EU_MEMBERS,
  findCountryDe,
  groessenvergleich,
  hauptstadtKm,
  GERMANY,
  SCHENGEN,
  steckdosenHinweis,
  zeitverschiebung,
  zeitverschiebungText,
} from "../app/converter/geo/worldGeoDe";

const c = (iso3: string) => countryByIso3(iso3)!;

describe("German country data", () => {
  it("covers 195 states with unique German slugs", () => {
    expect(countriesDe.length).toBe(195);
    expect(new Set(countriesDe.map((x) => deOf(x).id)).size).toBe(195);
    expect(countryPathDe(c("CYN"))).toBeNull();
    expect(findCountryDe("oesterreich")?.iso3).toBe("AUT");
    expect(findCountryDe("vereinigte-staaten")?.iso3).toBe("USA");
  });
  it("uses German capital names", () => {
    expect(deOf(c("CHN")).capital).toBe("Peking");
    expect(deOf(c("ITA")).capital).toBe("Rom");
    expect(deOf(c("UKR")).capital).toBe("Kyjiw");
    expect(deOf(c("ISL")).capital).not.toContain("­");
    expect(deOf(c("CHE")).note).toContain("Bundesstadt");
  });
  it("has current EU, euro and Schengen memberships", () => {
    expect(EU_MEMBERS.length).toBe(27);
    expect(EUROZONE.length).toBe(21);
    expect(SCHENGEN.length).toBe(29);
    for (const iso of EUROZONE) expect(c(iso).currencies).toContain("EUR");
    expect(GERMANY.borders.length).toBe(9);
  });
});

describe("Germany comparisons", () => {
  it("computes distance, size and time difference", () => {
    const paris = hauptstadtKm(GERMANY, c("FRA"));
    expect(paris).toBeGreaterThan(870);
    expect(paris).toBeLessThan(890);
    expect(groessenvergleich(c("FRA"))).toMatch(/mal so groß/);
    expect(groessenvergleich(c("VAT"))).toMatch(/0,0001/);
    expect(groessenvergleich(c("VAT"))).not.toMatch(/0,00 %/);
    expect(aehnlichesBundesland(c("CHE").area)?.name).toBe("Baden-Württemberg");
    expect(aehnlichesBundesland(c("FRA").area)).toBeNull();
    const winter = new Date(Date.UTC(2026, 0, 15, 12));
    expect(zeitverschiebung(c("GBR"), winter)).toBe(-60);
    expect(zeitverschiebung(c("JPN"), winter)).toBe(8 * 60);
    expect(zeitverschiebungText(-60)).toBe(
      "1 Stunde früher als in Deutschland",
    );
  });
  it("explains plug compatibility", () => {
    expect(steckdosenHinweis(["C", "F"], [230, 230])).toMatch(/nicht nötig/);
    expect(steckdosenHinweis(["G"], [230, 230])).toMatch(
      /Reiseadapter für Typ G/,
    );
    expect(steckdosenHinweis(["A", "B"], [120, 120])).toMatch(
      /Spannungswandler/,
    );
  });
});
