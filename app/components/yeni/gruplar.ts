// Ana sayfa ve grup sayfalarinin ortak grup listeleri (sunucu tarafi).
import { categoryPages } from "../../converter/categoryPages";
import { BIRLESIK_KATEGORILER, birimGruplari, turkceKategoriYolu } from "../../converter/siteYapisi";
import { HESAPLAYICI_GRUPLARI, type AnaSayfaGrubu } from "./anaSayfaVerisi";

const tr = (s: string) => s.toLocaleLowerCase("tr-TR");

/** "Aydınlatma Şiddeti" -> "Aydınlatma şiddeti"; parantez ici ve tek harfli sozcukler ("Vitamin D") korunur. */
function cumleBicimi(ad: string) {
  const [bas, ...kalan] = ad.split(" ");
  return [bas, ...kalan.map((s) => (s.startsWith("(") || s.length === 1 ? s : tr(s)))].join(" ");
}

export function kategoriAdi(slug: string) {
  if (slug === "kutle") return "Ağırlık (kütle)";
  if (BIRLESIK_KATEGORILER[slug]) return BIRLESIK_KATEGORILER[slug].ad;
  const sayfa = categoryPages.find((c) => c.slug === slug);
  return cumleBicimi((sayfa?.title ?? slug).replace(/ (Dönüşümleri|Birimi?)\b.*$/, ""));
}

/** Donusum grubu: butun birim ceviricileri. Grup sayfasinda eski birim gruplari (Temel, Muhendislik...) alt baslik olur. */
export const DONUSUM_GRUBU: AnaSayfaGrubu = {
  slug: "donusum",
  ad: "Dönüşüm",
  linkler: birimGruplari.flatMap((g) => g.kategoriler.map((k) => ({ href: turkceKategoriYolu(k), ad: kategoriAdi(k) }))),
};

export const DONUSUM_ALT_GRUPLARI = birimGruplari.map((g) => ({
  ad: g.ad,
  hrefler: g.kategoriler.map((k) => turkceKategoriYolu(k)),
}));

/** Ana sayfa kartlari ve grup sayfalari: once Donusum, sonra hesaplama gruplari. */
export const TUM_GRUPLAR: readonly AnaSayfaGrubu[] = [DONUSUM_GRUBU, ...HESAPLAYICI_GRUPLARI];

export { HESAPLAYICI_GRUPLARI };
