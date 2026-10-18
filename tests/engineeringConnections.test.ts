import { describe, expect, it } from "vitest";
import { engineeringConnectionsTr } from "../app/converter/engineeringConnections";
import { categoryPages } from "../app/converter/categoryPages";
import { readFileSync } from "node:fs";

describe("mühendislik bağlantı haritası", () => {
  it("her konu mevcut bir hub grubuna bağlanır", () => {
    const source = readFileSync("app/components/EngineeringHubPage.tsx", "utf8");
    const ids = [...source.matchAll(/^ {8}id: "([^"]+)",/gm)].map((m) => m[1]);
    for (const c of engineeringConnectionsTr) expect(ids).toContain(c.groupId);
  });

  it("kategori bağlantıları mevcut kategori sayfalarını gösterir", () => {
    const slugs = new Set(categoryPages.map((p) => p.slug));
    for (const c of engineeringConnectionsTr)
      for (const l of c.conversions)
        if (l.href.startsWith("/kategoriler/")) expect(slugs).toContain(l.href.split("/")[2]);
  });
});
