import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isClosedPath } from "../app/indexPolicy";
import { BIRLESEN_SAYFALAR, KAPALI_TR_SAYFALAR, SILINEN_SAYFALAR, kasimYonlendirmeleri } from "../app/kasimTemizligi";
import { conversionPages } from "../app/converter/conversionPages";
import { ciftYayinda } from "../app/converter/mergedPairs";
import { YONLENDIRILEN_CIFTLER } from "../app/converter/yonlendirilenCiftler";

describe("Kasım 2026 temizliği", () => {
  it("silinen ve birleşen sayfaların klasörü yok", () => {
    for (const yol of [...SILINEN_SAYFALAR, ...Object.keys(BIRLESEN_SAYFALAR)]) {
      if (yol.startsWith("/muhendislik-hesaplayicilari/")) continue; // dinamik rota; generateStaticParams'tan düşer
      expect(existsSync(`app${yol}/page.tsx`), yol).toBe(false);
    }
  });

  it("birleşme hedefleri silinmemiş ve kendisi yönlenmiyor", () => {
    for (const hedef of Object.values(BIRLESEN_SAYFALAR)) {
      expect(SILINEN_SAYFALAR.has(hedef), hedef).toBe(false);
      expect(Object.hasOwn(BIRLESEN_SAYFALAR, hedef), hedef).toBe(false);
    }
  });

  it("yönlendirilen çiftler gerçek çiftler ve artık yayında değil", () => {
    const slugs = new Set(conversionPages.map((p) => p.slug));
    for (const [slug] of YONLENDIRILEN_CIFTLER) {
      expect(slugs.has(slug), slug).toBe(true);
      expect(ciftYayinda(slug), slug).toBe(false);
    }
  });

  it("yönlendirmelerin hedefi başka bir yönlendirmenin kaynağı değil (zincir yok)", () => {
    const satirlar = kasimYonlendirmeleri();
    const kaynaklar = new Set(satirlar.map(([k]) => k));
    for (const [, hedef] of satirlar) expect(kaynaklar.has(hedef), hedef).toBe(false);
  });

  it("kapalı, silinen ve yönlenen adresler dizine kapalı; çekirdek sayfalar açık", () => {
    for (const yol of KAPALI_TR_SAYFALAR) expect(isClosedPath(yol), yol).toBe(true);
    for (const yol of SILINEN_SAYFALAR) expect(isClosedPath(yol), yol).toBe(true);
    // Tıklama alsa da bilerek kapatılan klinik hesap
    expect(isClosedPath("/wells-skoru-hesaplama")).toBe(true);
    for (const yol of ["/", "/uzunluk", "/alan", "/kdv-hesaplama", "/altin-hesaplama", "/yas-hesaplama"]) {
      expect(isClosedPath(yol), yol).toBe(false);
    }
  });
});
