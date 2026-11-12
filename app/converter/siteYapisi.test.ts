import { describe, expect, it } from "vitest";
import { categoryPages } from "./categoryPages";
import { BIRLESIK_KATEGORILER, birimGruplari, ustMenuKategorileri } from "./siteYapisi";

describe("siteYapisi", () => {
  // Birlesik sayfa (/radyasyon) grupta uye kategorilerinin yerini tutar.
  const gruptakiler = birimGruplari.flatMap((g) => g.kategoriler.flatMap((k) => BIRLESIK_KATEGORILER[k]?.kategoriler ?? [k]));
  const kategoriler = categoryPages.map((c) => c.slug);

  it("her kategori tam olarak bir grupta", () => {
    expect([...gruptakiler].sort()).toEqual([...kategoriler].sort());
    expect(new Set(gruptakiler).size).toBe(gruptakiler.length);
  });

  it("ust menu kategorileri gercek kategoriler", () => {
    for (const k of ustMenuKategorileri) expect(kategoriler).toContain(k);
  });
});
