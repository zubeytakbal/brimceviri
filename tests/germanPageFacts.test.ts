import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { findGermanConversionPage } from "../app/converter/localizedGermanConversionPages";
import { flaeche, inRoemisch, koerper, primfaktoren, primfaktorText, teilerAnzahl } from "../app/converter/germanSchoolMath";
import { fmtDe } from "../app/converter/germanMath";
import { germanPair } from "../app/converter/germanConversionSeo";
import { ringSizeRows } from "../app/converter/ringSizeTable";
import { lengthReferenceObjects } from "../app/converter/lengthComparison";
import { weightReferenceObjects } from "../app/converter/weightComparison";
import { SITE_CONTACT_EMAIL } from "../app/siteConfig";
import {
  germanAboutParagraphs,
  germanAreaFact,
  germanContactParagraphs,
  germanConversionExamples,
  germanLengthFact,
  germanPanRatio,
  germanPrimeFact,
  germanRecipeAmount,
  germanRecipeFact,
  germanRingFact,
  germanRomanFact,
  germanShoeFact,
  germanVolumeFact,
  germanWeightFact,
} from "../app/converter/germanPageFacts";

describe("German leftover page facts", () => {
  it("adds a slug-bound worked line to the short conversion pairs", () => {
    for (const slug of ["mikrohenry-millihenry", "millihenry-mikrohenry", "stunde-minute", "tag-stunde"]) {
      const page = findGermanConversionPage(slug);
      expect(page, slug).toBeTruthy();
      const lines = germanConversionExamples(page!);
      expect(lines.length).toBe(2);
      expect(lines[0]?.startsWith(`${slug}:`)).toBe(true);
      expect(lines.join(" ")).toContain(germanPair(page!, 7));
    }
    const micro = findGermanConversionPage("mikrohenry-millihenry")!;
    expect(germanPair(micro, 7)).toBe(
      `7 µH = ${fmtDe(convert("enduktans", 7, "µH", "mH"))} mH`,
    );
    const hour = findGermanConversionPage("stunde-minute")!;
    expect(convert("zaman", 7, "h", "min")).toBe(420);
    expect(germanConversionExamples(hour).join(" ")).toContain("420");
  });

  it("computes area, volume, primes and roman numerals from the math module", () => {
    const room = flaeche("rechteck", { a: 4.5, b: 3.2 })!;
    expect(germanAreaFact().paragraphs.join(" ")).toContain(`${fmtDe(room.A)} m²`);
    const cube = koerper("wuerfel", { a: 4 })!;
    expect(germanVolumeFact().paragraphs.join(" ")).toContain(`${fmtDe(cube.V)} cm³`);
    const factors = primfaktoren(84);
    expect(primfaktorText(factors)).toBe("2² · 3 · 7");
    expect(teilerAnzahl(factors)).toBe(12);
    expect(germanPrimeFact().paragraphs.join(" ")).toContain("84: 2² · 3 · 7");
    expect(germanPrimeFact().paragraphs.join(" ")).toContain("360: 2³ · 3² · 5");
    expect(inRoemisch(2026)?.text).toBe("MMXXVI");
    expect(inRoemisch(3999)?.text).toBe("MMMCMXCIX");
    expect(germanRomanFact().paragraphs.join(" ")).toContain("2026 = MMXXVI");
    expect(germanRomanFact().paragraphs.join(" ")).toContain("3999 = MMMCMXCIX");
  });

  it("reads length, weight, ring and shoe rows from the stored tables", () => {
    const field = lengthReferenceObjects.find((row) => row.id === "futbol-sahasi")!;
    expect(field.meters).toBe(105);
    expect(germanLengthFact().paragraphs.join(" ")).toContain(`Fußballfeld ${fmtDe(105)} m`);
    const cat = weightReferenceObjects.find((row) => row.id === "kedi")!;
    expect(cat.kg).toBe(4);
    expect(germanWeightFact().paragraphs.join(" ")).toContain(`Hauskatze ${fmtDe(4)} kg`);
    const ring = ringSizeRows[0];
    expect(germanRingFact().paragraphs.join(" ")).toContain(
      `Innendurchmesser ${fmtDe(ring.diameterMm)} mm`,
    );
    expect(germanRingFact().paragraphs.join(" ")).toContain(`UK ${ring.uk}`);
    expect(germanShoeFact().paragraphs.join(" ")).toContain("Standard Herren");
    expect(germanShoeFact().paragraphs.join(" ")).toContain("Nike Herren");
  });

  it("scales the cake from the six-person base and the pan from 20 cm", () => {
    expect(germanRecipeAmount(300, 4)).toBe(200);
    expect(germanRecipeAmount(3, 2)).toBe(1);
    expect(germanPanRatio(26)).toBeCloseTo(1.69, 5);
    const text = germanRecipeFact().paragraphs.join(" ");
    expect(text).toContain("Mehl 100 g");
    expect(text).toContain("für 2 statt 6");
    expect(text).toContain(fmtDe(germanPanRatio(26)));
  });

  it("builds about and contact text from counts, convert() and the contact address", () => {
    const about = germanAboutParagraphs().join(" ");
    expect(about).toContain("Über uns auf BirimCeviri");
    expect(about).toContain("Elemente im Periodensystem");
    expect(about).not.toMatch(/\+49|Straße|Musterweg/);
    const contact = germanContactParagraphs().join(" ");
    expect(contact).toContain(SITE_CONTACT_EMAIL);
    expect(contact).toContain("/de/meter-zentimeter");
    expect(contact).toContain("1 m = 100 cm");
    expect(contact).not.toMatch(/\+49|Telefon|Musterstraße/);
    expect(germanContactParagraphs().length).toBeGreaterThanOrEqual(6);
  });
});
