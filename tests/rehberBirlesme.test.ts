import { describe, expect, it } from "vitest";
import { kasimYonlendirmeleri, rehberBirlesti } from "../app/kasimTemizligi";
import { isClosedPath } from "../app/indexPolicy";
import { REHBERI_BIRLESEN_KATEGORILER, turkishUnitHref, unitPages } from "../app/converter/unitPages";
import { turkceKategoriYolu } from "../app/converter/siteYapisi";
import { getCategoryUnitOptions } from "../app/components/categoryUnitOptions";

describe("birim rehberlerinin kategori sayfasina katilmasi", () => {
  const birlesen = unitPages.filter((u) => REHBERI_BIRLESEN_KATEGORILER.has(u.category));
  const yonlendirmeler = new Map(kasimYonlendirmeleri());

  it("birlesen her rehber kendi kategori sayfasina 301 ile gider, dizinden ve baglantilardan cikar", () => {
    expect(birlesen.length).toBeGreaterThan(0);
    for (const u of birlesen) {
      expect(yonlendirmeler.get(`/birimler/${u.slug}`), u.slug).toBe(turkceKategoriYolu(u.category));
      expect(rehberBirlesti(u.slug), u.slug).toBe(true);
      expect(isClosedPath(`/birimler/${u.slug}`), u.slug).toBe(true);
      expect(turkishUnitHref(u.slug), u.slug).toBeNull();
    }
  });

  it("birlesen rehberin birimi kategori sayfasinin birim listesinde var (tanimi orada gorunur)", () => {
    for (const u of birlesen) {
      const birimler = new Set(getCategoryUnitOptions(u.category, "tr").map((b: { value: string }) => b.value));
      expect(birimler.has(u.unit), `${u.category}/${u.unit}`).toBe(true);
    }
  });

  it("butun Turkce rehberler birlesti; rehber dizini /tum-birimler'e gider", () => {
    expect(unitPages.every((u) => REHBERI_BIRLESEN_KATEGORILER.has(u.category))).toBe(true);
    expect(yonlendirmeler.get("/birimler")).toBe("/tum-birimler");
  });
});
