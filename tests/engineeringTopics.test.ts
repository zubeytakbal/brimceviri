import { describe, expect, it } from "vitest";
import { categoryPages } from "../app/converter/categoryPages";
import { unitPages } from "../app/converter/unitPages";
import { engineeringTopics } from "../app/converter/engineeringTopics";

describe("Türkçe mühendislik konu haritası", () => {
  it("konu kimlikleri benzersizdir", () => {
    const ids = engineeringTopics.map((topic) => topic.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tüm kategori bağlantıları mevcut /kategoriler sayfalarına gider", () => {
    const slugs = new Set(categoryPages.map((page) => page.slug));
    for (const topic of engineeringTopics) {
      for (const slug of topic.categorySlugs) expect(slugs.has(slug), `${topic.id}: ${slug}`).toBe(true);
    }
  });

  it("tüm birim bağlantıları mevcut /birimler sayfalarına gider", () => {
    const slugs = new Set(unitPages.map((page) => page.slug));
    for (const topic of engineeringTopics) {
      for (const slug of topic.unitSlugs) expect(slugs.has(slug), `${topic.id}: ${slug}`).toBe(true);
    }
  });
});
