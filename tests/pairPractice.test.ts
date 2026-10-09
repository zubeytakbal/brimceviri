import { describe, expect, it } from "vitest";
import { buildPairPractice, pairPracticePlain, type PairLocale } from "../app/converter/pairPractice";
import { danishConversionPages } from "../app/converter/localizedDanishConversionPages";
import { frenchConversionPages } from "../app/converter/localizedFrenchConversionPages";
import { italianConversionPages } from "../app/converter/localizedItalianConversionPages";
import { nederlandsConversionPages } from "../app/converter/localizedNederlandsConversionPages";
import { norwegianConversionPages } from "../app/converter/localizedNorwegianConversionPages";
import { portugueseConversionPages } from "../app/converter/localizedPortugueseConversionPages";
import { swedishConversionPages } from "../app/converter/localizedSwedishConversionPages";
import { nordicCityDistance } from "../app/converter/time/nordicCityDistance";
import { worldCities } from "../app/converter/time/worldCities";

const K = 6;

function uniqueChars(texts: string[], limit: number) {
  const words = texts.map((text) => text.toLowerCase().split(/\s+/).filter(Boolean));
  const freq = new Map<string, number>();
  for (const page of words) {
    const seen = new Set<string>();
    for (let i = 0; i + K <= page.length; i++) seen.add(page.slice(i, i + K).join(" "));
    for (const gram of seen) freq.set(gram, (freq.get(gram) ?? 0) + 1);
  }
  return words.map((page) => {
    const own = new Uint8Array(page.length).fill(1);
    for (let i = 0; i + K <= page.length; i++) {
      if ((freq.get(page.slice(i, i + K).join(" ")) ?? 0) >= limit) own.fill(0, i, i + K);
    }
    return page.reduce((sum, word, index) => sum + (own[index] ? word.length + 1 : 0), 0);
  });
}

const locales: Array<{ locale: PairLocale; pages: Array<{ category: string; fromUnit: string; toUnit: string; fromName: string; toName: string }> }> = [
  { locale: "sv", pages: swedishConversionPages },
  { locale: "no", pages: norwegianConversionPages },
  { locale: "da", pages: danishConversionPages },
  { locale: "fr", pages: frenchConversionPages },
  { locale: "it", pages: italianConversionPages },
  { locale: "nl", pages: nederlandsConversionPages },
  { locale: "pt", pages: portugueseConversionPages },
];

describe("pairPractice", () => {
  it("keeps at least 1200 page-specific characters on every conversion page", () => {
    for (const { locale, pages } of locales) {
      const texts = pages.map((page) => pairPracticePlain(buildPairPractice(locale, page)));
      const scores = uniqueChars(texts, 3);
      const worst = Math.min(...scores);
      expect(worst, locale).toBeGreaterThanOrEqual(1200);
    }
  });

  it("round-trips a sample and states the Celsius–Fahrenheit identities", () => {
    const page = swedishConversionPages.find((item) => item.fromUnit === "C" && item.toUnit === "F");
    expect(page).toBeTruthy();
    const guide = buildPairPractice("sv", page!);
    expect(guide.intro).toContain("32");
    expect(guide.intro).toContain("212");
    expect(guide.note).toContain("Minus 40");
    expect(guide.check).toMatch(/0(\D|$)/);
  });

  it("describes gold as purity, not as a change of mass", () => {
    const page = frenchConversionPages.find((item) => item.category === "altin_ayar");
    expect(page).toBeTruthy();
    const guide = buildPairPractice("fr", page!);
    expect(guide.note).toContain("teneur en or");
    expect(guide.note).toContain("pas le poids");
  });
});

describe("nordicCityDistance", () => {
  const stockholm = worldCities.find((city) => city.en === "stockholm")!;
  const tokyo = worldCities.find((city) => city.en === "tokyo")!;
  const sydney = worldCities.find((city) => city.en === "sydney")!;
  const newYork = worldCities.find((city) => city.en === "new-york")!;

  function note(city: typeof tokyo) {
    return nordicCityDistance({
      locale: "sv",
      name: city.nameEn,
      country: city.countryEn,
      lat: city.lat,
      lon: city.lon,
      timeZone: city.timeZone,
      countryWide: city.countryWide,
      utcLabel: "UTC+9",
      zoneName: "testzon",
      homeName: "Stockholm",
      homeLat: stockholm.lat,
      homeLon: stockholm.lon,
      diffMinutes: 420,
      winterMinutes: 480,
      summerMinutes: 420,
      atNine: "16:00",
      atEighteen: "01:00 (nästa dag)",
    }).paragraphs.join(" ");
  }

  it("gives Tokyo a long flight and the southern/western hemispheres the right names", () => {
    expect(note(tokyo)).toMatch(/8\s?1\d\d kilometer|81\d\d kilometer/);
    expect(note(sydney)).toContain("syd");
    expect(note(newYork)).toContain("väst");
    expect(note(newYork)).not.toContain("öst,");
  });
});
