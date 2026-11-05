// Turkce cift sayfasi adresinin tek kaynagi. Sunucu tarafinda kullanilir (conversionPages
// buyuk bir modul; istemci bilesenlerine aktarmayin).
import { categoryPages } from "./categoryPages";
import { conversionPages } from "./conversionPages";
import { yeniYapiKategorileri } from "./siteYapisi";

const kategoriSlugu = new Map(categoryPages.map((c) => [c.category, c.slug]));
const ciftKategorisi = new Map(conversionPages.map((p) => [p.slug, kategoriSlugu.get(p.category)]));

/** Cift slug'inin kategori slug'i (ör. "santimetre-inc" -> "uzunluk"). */
export function ciftinKategoriSlugu(ciftSlug: string) {
  return ciftKategorisi.get(ciftSlug);
}

/** Cift yeni yapiya tasinmis kategorideyse true. */
export function ciftTasindiMi(ciftSlug: string) {
  const kategori = ciftKategorisi.get(ciftSlug);
  return kategori !== undefined && yeniYapiKategorileri.has(kategori);
}

/** "/santimetre-inc" veya tasinmissa "/uzunluk/santimetre-inc". Hash/sorgu korunur. */
export function turkceCiftYolu(ciftSlug: string) {
  const kategori = ciftKategorisi.get(ciftSlug);
  return kategori && yeniYapiKategorileri.has(kategori) ? `/${kategori}/${ciftSlug}` : `/${ciftSlug}`;
}

/** Bir Turkce href'i (ör. "/santimetre-inc#tablo") yeni adrese cevirir; cift degilse aynen dondurur. */
export function turkceHref(href: string) {
  const m = /^\/([a-z0-9-]+)([?#].*)?$/.exec(href);
  if (!m || !ciftKategorisi.has(m[1])) return href;
  return turkceCiftYolu(m[1]) + (m[2] ?? "");
}
