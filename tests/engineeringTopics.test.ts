import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { ENGINEERING_TOPICS } from "../app/converter/engineeringTopics";

describe("mühendislik konu → dönüştürücü haritası", () => {
  const paths = new Set(sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "")));

  it("konu kimlikleri benzersizdir ve her konunun dönüştürücüsü vardır", () => {
    const ids = ENGINEERING_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of ENGINEERING_TOPICS) expect(t.converters.length).toBeGreaterThan(0);
  });

  it("tüm bağlantılar mevcut sayfalara gider", () => {
    const missing = ENGINEERING_TOPICS.flatMap((t) =>
      t.converters.filter((c) => !paths.has(c.href)).map((c) => `${t.id} -> ${c.href}`),
    );
    expect(missing).toEqual([]);
  });
});
