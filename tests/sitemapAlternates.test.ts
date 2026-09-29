import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { SITE_URL } from "../app/siteConfig";

describe("sitemap", () => {
  it("uses absolute URLs everywhere, including hreflang alternates", () => {
    const entries = sitemap();
    const bad: string[] = [];
    for (const e of entries) {
      if (!e.url.startsWith(SITE_URL)) bad.push(e.url);
      for (const href of Object.values(e.alternates?.languages ?? {})) {
        if (typeof href !== "string" || !href.startsWith("https://"))
          bad.push(`${e.url} -> ${String(href)}`);
      }
    }
    expect(bad.slice(0, 10)).toEqual([]);
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});
