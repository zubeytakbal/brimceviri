import { describe, expect, it } from "vitest";
import { ENGINEERING_TOPICS } from "../app/converter/engineeringTopics";
import { readFileSync } from "node:fs";

describe("Türkçe mühendislik konu sistemi", () => {
  it("konu ve alt konu kimlikleri benzersizdir", () => {
    const topicIds = ENGINEERING_TOPICS.map((t) => t.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);
    for (const topic of ENGINEERING_TOPICS) {
      const ids = topic.subtopics.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.length).toBeGreaterThan(0);
    }
  });

  it("her mevcut hub grubu bir konuya bağlıdır ve bağlantılar geçerlidir", () => {
    const source = readFileSync("app/components/EngineeringHubPage.tsx", "utf8");
    const trBlock = source.slice(source.indexOf("\n  tr: {\n"), source.indexOf("\n  en: {\n"));
    const groupIds = [...trBlock.matchAll(/^ {8}id: "([^"]+)"/gm)].map((m) => m[1]);
    expect(groupIds.length).toBeGreaterThan(0);
    const mapped = ENGINEERING_TOPICS.map((t) => t.hubGroupId).filter(Boolean);
    expect(mapped.filter((id) => !groupIds.includes(id!))).toEqual([]);
    expect(groupIds.filter((id) => !mapped.includes(id))).toEqual([]);
  });
});
