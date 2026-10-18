import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { SITE_URL } from "../app/siteConfig";
import { shouldIndexPath } from "../app/seo/indexPolicy";

describe("AdSense index policy", () => {
  it("keeps hubs, tools and curated conversions", () => {
    expect(shouldIndexPath("/")).toBe(true);
    expect(shouldIndexPath("/en")).toBe(true);
    expect(shouldIndexPath("/de")).toBe(true);
    expect(shouldIndexPath("/ar")).toBe(true);
    expect(shouldIndexPath("/hakkimizda")).toBe(true);
    expect(shouldIndexPath("/beton-hesaplama")).toBe(true);
    expect(shouldIndexPath("/kilogram-gram")).toBe(true);
    expect(shouldIndexPath("/inc-santimetre")).toBe(true);
    expect(shouldIndexPath("/kategoriler")).toBe(true);
    expect(shouldIndexPath("/ulkeler")).toBe(true);
    expect(shouldIndexPath("/dunya-saatleri")).toBe(true);
    expect(shouldIndexPath("/en/bmi-calculator")).toBe(true);
    expect(shouldIndexPath("/de/brutto-netto-rechner")).toBe(true);
  });

  it("drops thin locales, factory children and template conversions", () => {
    expect(shouldIndexPath("/sv")).toBe(false);
    expect(shouldIndexPath("/sv/meter-kilometer")).toBe(false);
    expect(shouldIndexPath("/uz/megaom-dan-omga")).toBe(false);
    expect(shouldIndexPath("/fr")).toBe(false);
    expect(shouldIndexPath("/ulkeler/almanya")).toBe(false);
    expect(shouldIndexPath("/en/countries/germany")).toBe(false);
    expect(shouldIndexPath("/dunya-saatleri/istanbul")).toBe(false);
    expect(shouldIndexPath("/birimler/metre")).toBe(false);
    expect(shouldIndexPath("/en/units/meter")).toBe(false);
    expect(shouldIndexPath("/iller-arasi-mesafe/ankara/kocaeli")).toBe(false);
    expect(shouldIndexPath("/embed/kilogram-gram")).toBe(false);
    expect(shouldIndexPath("/bn/kilogram-gram")).toBe(false);
  });

  it("writes only indexable URLs to the sitemap", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(400);
    expect(entries.length).toBeLessThan(3500);
    for (const entry of entries) {
      const path = new URL(entry.url).pathname;
      expect(shouldIndexPath(path)).toBe(true);
      expect(entry.url.startsWith(SITE_URL)).toBe(true);
    }
  });
});
