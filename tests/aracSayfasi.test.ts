import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { YENI_ARACLAR, isYeniYapiYolu } from "../app/converter/siteYapisi";

describe("yeni arac sayfasi duzeni", () => {
  const yollar = Object.keys(YENI_ARACLAR);

  it("her aracin icerik tarihi gecerli", () => {
    for (const y of yollar) expect(YENI_ARACLAR[y], y).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("yeni duzendeki araclar yeni ust ve alt menuyle cizilir", () => {
    for (const y of yollar) expect(isYeniYapiYolu(y), y).toBe(true);
  });

  // TimeToolPage yeni duzeni son kirintinin adresine bakarak secer; adres yazilmazsa menu yeni, sayfa eski kalir.
  it("TimeToolPage kullanan araclarin son kirintisi kendi adresi", () => {
    for (const y of yollar) {
      const dosya = `app${y}/page.tsx`;
      if (!existsSync(dosya)) continue; // dinamik rota ([tur], [slug]); kirinti adresi koddan uretilir
      const kod = readFileSync(dosya, "utf8");
      if (!kod.includes("<TimeToolPage")) continue;
      expect(kod.includes(`href: "${y}"`) || /href: (path|PATH|yol|YOL)\b/.test(kod), y).toBe(true);
    }
  });
});
