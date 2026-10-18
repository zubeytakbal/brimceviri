import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categoryPages } from "../app/converter/categoryPages";
import { engineeringTopicMap } from "../app/converter/engineeringTopicMap";
import { unitPages } from "../app/converter/unitPages";

describe("muhendislik konu haritasi", () => {
  it("her bolum kimligi benzersizdir", () => {
    const ids = engineeringTopicMap.map((topic) => topic.groupId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(engineeringTopicMap.map((topic) => [topic.groupId, topic] as const))(
    "%s mevcut sayfalara baglanir",
    (_id, topic) => {
      expect(topic.categorySlugs.length).toBeGreaterThan(0);
      for (const slug of topic.categorySlugs) {
        expect(categoryPages.some((page) => page.slug === slug)).toBe(true);
      }
      for (const slug of topic.unitSlugs) {
        expect(unitPages.some((page) => page.slug === slug)).toBe(true);
      }
      for (const { slug } of topic.converterSlugs) {
        expect(existsSync(path.join(__dirname, "../app", slug, "page.tsx"))).toBe(true);
      }
    },
  );
});
