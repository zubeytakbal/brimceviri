// Ana sayfa ve grup sayfalarinin ortak grup listeleri (sunucu tarafi).
import { categoryPages } from "../../converter/categoryPages";
import { birimGruplari, turkceKategoriYolu } from "../../converter/siteYapisi";
import { HESAPLAYICI_GRUPLARI, type AnaSayfaGrubu } from "./anaSayfaVerisi";

const tr = (s: string) => s.toLocaleLowerCase("tr-TR");

/** "Aydınlatma Şiddeti" -> "Aydınlatma şiddeti"; parantez ici ve tek harfli sozcukler ("Vitamin D") korunur. */
function cumleBicimi(ad: string) {
  const [bas, ...kalan] = ad.split(" ");
  return [bas, ...kalan.map((s) => (s.startsWith("(") || s.length === 1 ? s : tr(s)))].join(" ");
}

export function kategoriAdi(slug: string) {
  if (slug === "kutle") return "Ağırlık (kütle)";
  const sayfa = categoryPages.find((c) => c.slug === slug);
  return cumleBicimi((sayfa?.title ?? slug).replace(/ (Dönüşümleri|Birimi?)\b.*$/, ""));
}

export const BIRIM_GRUPLARI: readonly AnaSayfaGrubu[] = birimGruplari.map((g) => ({
  slug: g.id,
  ad: g.ad,
  linkler: g.kategoriler.map((k) => ({ href: turkceKategoriYolu(k), ad: kategoriAdi(k) })),
}));

export { HESAPLAYICI_GRUPLARI };
