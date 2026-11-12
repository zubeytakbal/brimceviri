// Yeni duzen ceviricilerinde etiket sutunu 100px; bosluk, "/" ya da "·" ile bolunemeyen uzun bir parca
// ("Mikrosiemens/santimetre" kirma noktasi eklenmeden once) kutunun altinda kesik kalir.
import { describe, expect, it } from "vitest";
import { getCategoryUnitOptions } from "../app/components/categoryUnitOptions";
import { birlesikIcerikleri, kategoriIcerikleri } from "../app/components/yeni/icerik";
import { categoryPages } from "../app/converter/categoryPages";

const SINIR = 14;

function etiketler(kategoriSlug: string, gruplar: { birimler: string[] }[]) {
  const secenekler = getCategoryUnitOptions(categoryPages.find((c) => c.slug === kategoriSlug)!.category, "tr");
  return gruplar.flatMap((g) => g.birimler.map((b) => secenekler.find((o) => o.value === b)?.label ?? `YOK:${b}`));
}

describe("cevirici etiketleri", () => {
  const hepsi = [
    ...Object.entries(kategoriIcerikleri).flatMap(([slug, i]) => etiketler(slug, i.cevirici.gruplar)),
    ...Object.values(birlesikIcerikleri).flatMap((i) => i.parcalar.flatMap((p) => etiketler(p.kategori, p.cevirici.gruplar))),
  ];

  it("gruplardaki her birim kategoride var", () => {
    expect(hepsi.filter((l) => l.startsWith("YOK:"))).toEqual([]);
  });

  it("bolunemeyen etiket parcasi sutuna sigar", () => {
    expect(hepsi.filter((l) => Math.max(...l.split(/[ /·]/).map((p) => p.length)) > SINIR)).toEqual([]);
  });
});
