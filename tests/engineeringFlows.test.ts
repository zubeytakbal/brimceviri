import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { ENGINEERING_FLOWS, STEEL_TABLE_FLOW } from "../app/converter/engineeringFlows";
import { KAPALI_TR_SAYFALAR } from "../app/kasimTemizligi";

describe("mühendislik sonraki adım bağlantıları", () => {
  // Site haritasindakiler ve yeniden yazilana kadar Google'a kapali (ama yayinda) Turkce sayfalar.
  const paths = new Set([...sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "")), ...KAPALI_TR_SAYFALAR]);

  it("her kaynak ve hedef sayfa yayında", () => {
    const missing: string[] = [];
    for (const [from, links] of Object.entries(ENGINEERING_FLOWS)) {
      if (!paths.has(from)) missing.push(`kaynak ${from}`);
      for (const link of links) if (!paths.has(link.href)) missing.push(`${from} -> ${link.href}`);
    }
    for (const link of STEEL_TABLE_FLOW) if (!paths.has(link.href)) missing.push(`çelik -> ${link.href}`);
    expect(missing).toEqual([]);
  });

  it("bir sayfa kendine bağlanmaz ve açıklama boş değildir", () => {
    for (const [from, links] of Object.entries(ENGINEERING_FLOWS)) {
      for (const link of links) {
        expect(link.href).not.toBe(from);
        expect(link.why.length).toBeGreaterThan(20);
      }
    }
  });
});
