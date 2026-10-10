import { describe, expect, it } from "vitest";
import { countryByIso3 } from "../app/converter/geo/worldCountries";
import {
  buildGermanCountryReading,
  formatGermanArea,
  germanCountryReadingPlain,
} from "../app/converter/geo/germanCountryReading";
import { countriesDe, deOf, GERMANY, hauptstadtKm } from "../app/converter/geo/worldGeoDe";

const winter = new Date(Date.UTC(2026, 0, 15, 12));
const country = (iso3: string) => countryByIso3(iso3)!;

function uniqueChars(texts: string[], limit: number) {
  const pages = texts.map((text) => text.toLowerCase().split(/\s+/).filter(Boolean));
  const freq = new Map<string, number>();
  for (const words of pages) {
    const set = new Set<string>();
    for (let i = 0; i + 6 <= words.length; i++) set.add(words.slice(i, i + 6).join(" "));
    for (const gram of set) freq.set(gram, (freq.get(gram) ?? 0) + 1);
  }
  return pages.map((words) => {
    const own = new Uint8Array(words.length).fill(1);
    for (let i = 0; i + 6 <= words.length; i++) {
      if ((freq.get(words.slice(i, i + 6).join(" ")) ?? 0) >= limit) own.fill(0, i, i + 6);
    }
    let chars = 0;
    words.forEach((word, index) => {
      if (own[index]) chars += word.length + 1;
    });
    return chars;
  });
}

describe("German country reading", () => {
  it("keeps small areas visible", () => {
    expect(formatGermanArea(0.44)).toBe("0,44");
    expect(formatGermanArea(357114)).toBe("357.114");
  });

  it("computes France against Berlin and Germany", () => {
    const france = country("FRA");
    const text = germanCountryReadingPlain(france, winter);
    const km = Math.round(hauptstadtKm(GERMANY, france));
    expect(km).toBeGreaterThan(870);
    expect(km).toBeLessThan(890);
    expect(text).toContain(`Berlin–Paris, Frankreich`);
    expect(text).toContain(`${km.toLocaleString("de-DE")} km Berlin–Paris`);
    expect(text).toContain("Frankreich, 551.695 km², Hauptstadt Paris.");
    expect(text).toContain("1,54-mal Deutschland, Frankreich");
    expect(text).toContain("Paris um 12:00: Berlin 12:00 Uhr");
    expect(text).toContain("kein Flugplan");
    expect(text).toContain("nicht die Landesgrenze");
  });

  it("does not invent a Berlin–Berlin route", () => {
    const text = germanCountryReadingPlain(GERMANY, winter);
    expect(text).not.toContain("Berlin–Berlin");
    expect(text).toContain("Berlin um 12:00: New York");
    expect(text).not.toContain("Berlin um 12:00: Berlin");
  });

  it("shows Japan eight hours ahead of Berlin in January", () => {
    const text = germanCountryReadingPlain(country("JPN"), winter);
    expect(text).toContain("Tokio um 12:00: Berlin 04:00 Uhr");
  });

  it("shows the Vatican area instead of zero", () => {
    const text = germanCountryReadingPlain(country("VAT"), winter);
    expect(text).toContain("0,44");
    expect(text).not.toMatch(/Platz 0/);
  });

  it("stays specific on every country page", () => {
    const texts = countriesDe.map((item) => germanCountryReadingPlain(item, winter));
    const limit = Math.max(3, Math.ceil(texts.length * 0.02));
    const scores = uniqueChars(texts, limit);
    const worst = Math.min(...scores);
    expect(worst).toBeGreaterThan(900);
    const france = buildGermanCountryReading(country("FRA"), winter);
    expect(france.rows.length).toBeGreaterThan(8);
    expect(new Set(texts).size).toBe(countriesDe.length);
    expect(deOf(country("VAT")).name).toBe("Vatikanstadt");
  });
});
