import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ENGINEERING_ROADMAP_TR } from "../app/converter/engineeringRoadmapTr";

describe("Türkçe mühendislik yol haritası", () => {
  const source = readFileSync("app/components/EngineeringHubPage.tsx", "utf8");
  const trSource = source.slice(source.indexOf("const contentByLocale"), source.indexOf("\n  en: {", source.indexOf("const contentByLocale")));
  const groupIds = new Set([...trSource.matchAll(/^ {8}id: "([^"]+)"/gm)].map((match) => match[1]));

  it("her kayıt mevcut bir mühendislik bölümüne bağlanır", () => {
    for (const item of ENGINEERING_ROADMAP_TR) expect(groupIds.has(item.groupId)).toBe(true);
  });

  it("bölüm başına tek kayıt ve en az bir planlı araç vardır", () => {
    const ids = ENGINEERING_ROADMAP_TR.map((item) => item.groupId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of ENGINEERING_ROADMAP_TR) expect(item.plannedTools.length).toBeGreaterThan(0);
  });
});
