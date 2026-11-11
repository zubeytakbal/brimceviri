// Şablon sayfaların ana araç sayfalarına birleştirilmesiyle kaldırılan adresler (301).
import { aminoAcidsDatabase } from "./converter/aminoAcidsDatabase";
import { unitGuideRedirects } from "./converter/unitGlossary";
import { ALTIN_SAYFALARI, AYRI_ALTIN_SAYFALARI } from "./converter/turkishAltinPages";
import { cgpaUniversities } from "./converter/india/cgpaUniversities";
import { TASINAN_CIFTLER } from "./converter/tasinanCiftler.generated";
import { yeniYapiKategorileri } from "./converter/siteYapisi";
import { KALDIRILAN_SAYFALAR } from "./kaldirilanSayfalar";
import { kasimYonlendirmeleri } from "./kasimTemizligi";

export type MergedRedirect = { source: string; destination: string; permanent: true };

const r = (source: string, destination: string): MergedRedirect => ({ source, destination, permanent: true });

/** Latin Amerika İspanyolcası sayfaları es sayfalarının ondalık ayırıcı dışında aynısıydı. */
function es419Redirects(): MergedRedirect[] {
  return [r("/es-419/:path*", "/es/:path*")];
}

/** Türkçe sayı bölümü (Ekim 2026) tamamen kaldırıldı: ana sayfa ve tek tek sayılar Matematik kategorisine yönlenir.
 * Özbekçe sayı sayfaları da tek hesaplayıcıda: tek kalıp kural (?n= seçimi korur). */
function numberRedirects(): MergedRedirect[] {
  const base = "/bilim-hesaplayicilari/matematik/sayilar";
  return [r(base, "/bilim-hesaplayicilari/matematik"), r(`${base}/:n`, "/bilim-hesaplayicilari/matematik")];
}

/** Amino asit bölümü (Ekim 2026) tamamen kaldırıldı: ana sayfa ve tek tek amino asitler kodon tablosuna yönlenir (Biyoloji bölüm sayfası da 25 Ekim 2026'da kaldırıldı). */
function aminoAcidRedirects(): MergedRedirect[] {
  const base = "/bilim-hesaplayicilari/biyoloji/amino-asitler";
  return [r(base, "/bilim-hesaplayicilari/biyoloji/kodon-tablosu"), ...aminoAcidsDatabase.map((a) => r(`${base}/${a.id}`, "/bilim-hesaplayicilari/biyoloji/kodon-tablosu"))];
}

/** Altın türü sayfaları altın hesaplama tablosunda; çeyrek ve Cumhuriyet altınının kendi sayfası var. */
function altinRedirects(): MergedRedirect[] {
  return ALTIN_SAYFALARI.filter((id) => !AYRI_ALTIN_SAYFALARI.includes(id)).map((id) => r(`/altin-hesaplama/${id}`, `/altin-hesaplama?tur=${id}`));
}

/** Altın ayar çifti sayfaları (24↔22, 22↔18, 18↔14) rakamlar dışında aynıydı. Tıklama alanlar (TR 24↔22, EN 24k↔22k,
 * 18k↔22k, 14k→18k) Ekim 2026'da özgün içerikle geri açıldı (app/24-ayar-altin-22-ayar-altin, app/converter/goldKaratPairs.ts);
 * kalanlar her dilde altın hesaplayıcısına ya da altın ayar kategorisindeki çeviriciye yönlenir. */
function goldKaratPairRedirects(): MergedRedirect[] {
  const pairs: Record<string, { to: string; slugs: string[] }> = {
    "": { to: "/kategoriler/altin-ayar", slugs: ["14-ayar-altin-18-ayar-altin", "18-ayar-altin-14-ayar-altin", "18-ayar-altin-22-ayar-altin", "22-ayar-altin-18-ayar-altin"] },
    en: { to: "/en/gold-karat-calculator", slugs: ["18k-gold-to-14k-gold"] },
    ar: { to: "/ar/categories/gold-karat", slugs: ["14k-gold-to-18k-gold", "18k-gold-to-14k-gold", "18k-gold-to-22k-gold", "22k-gold-to-18k-gold", "22k-gold-to-24k-gold", "24k-gold-to-22k-gold"] },
    de: { to: "/de/goldrechner", slugs: ["14-karat-gold-18-karat-gold", "18-karat-gold-14-karat-gold", "18-karat-gold-22-karat-gold", "22-karat-gold-18-karat-gold", "22-karat-gold-24-karat-gold", "24-karat-gold-22-karat-gold"] },
    es: { to: "/es/calculadora-de-oro", slugs: ["oro-14-quilates-oro-18-quilates", "oro-18-quilates-oro-14-quilates", "oro-18-quilates-oro-22-quilates", "oro-22-quilates-oro-18-quilates", "oro-22-quilates-oro-24-quilates", "oro-24-quilates-oro-22-quilates"] },
    pt: { to: "/pt/calculadora-de-ouro", slugs: ["ouro-18-quilates-ouro-22-quilates", "ouro-22-quilates-ouro-18-quilates", "ouro-22-quilates-ouro-24-quilates", "ouro-24-quilates-ouro-22-quilates"] },
    bn: { to: "/bn/categories/sonar-ayar", slugs: ["14-carat-gold-18-carat-gold", "18-carat-gold-14-carat-gold", "18-carat-gold-22-carat-gold", "22-carat-gold-18-carat-gold", "22-carat-gold-24-carat-gold", "24-carat-gold-22-carat-gold"] },
    fr: { to: "/fr/categories/carat-or", slugs: ["or-18-carats-or-22-carats", "or-22-carats-or-18-carats", "or-22-carats-or-24-carats", "or-24-carats-or-22-carats"] },
    it: { to: "/it/categorie/caratura-oro", slugs: ["oro-18-carati-oro-22-carati", "oro-22-carati-oro-18-carati", "oro-22-carati-oro-24-carati", "oro-24-carati-oro-22-carati"] },
    nl: { to: "/nl/categorieen/goudkaraat", slugs: ["18-karaat-goud-22-karaat-goud", "22-karaat-goud-18-karaat-goud", "22-karaat-goud-24-karaat-goud", "24-karaat-goud-22-karaat-goud"] },
  };
  return Object.entries(pairs).flatMap(([locale, { to, slugs }]) => slugs.map((slug) => r(`${locale ? `/${locale}` : ""}/${slug}`, to)));
}

/** Üniversite başına CGPA sayfaları; formül, kaynak ve kapsam ana sayfada. */
function cgpaRedirects(): MergedRedirect[] {
  return cgpaUniversities.map((u) => r(`/en/cgpa-to-percentage/${u.slug}`, `/en/cgpa-to-percentage?university=${u.slug}`));
}

/** Almanca ve Özbekçe malzeme/karşılaştırma ile Almanca bileşik sayfaları tek seçicili sayfada (?m= malzeme, ?v= karşılaştırma). */
function materialRedirects(): MergedRedirect[] {
  return [
    r("/de/werkstoffeigenschaften/:slug", "/de/werkstoffeigenschaften?m=:slug"),
    r("/de/werkstoffvergleich", "/de/werkstoffeigenschaften"),
    r("/de/werkstoffvergleich/:slug", "/de/werkstoffeigenschaften?v=:slug"),
    r("/malzeme-karsilastirma", "/malzeme-ozellikleri"),
    r("/malzeme-karsilastirma/:slug", "/malzeme-ozellikleri?v=:slug"),
    r("/bn/traditional-weight/:slug", "/bn/traditional-weight?pair=:slug"),
    r("/en/science-calculators/physics", "/en/physics-calculators"),
    r("/en/science-calculators/mathematics", "/en/mathematics-calculators"),
    r("/en/science-calculators/biology", "/en/biology-calculators/dna-sequence-helper"),
    r("/en/biology-calculators", "/en/biology-calculators/dna-sequence-helper"),
    r("/de/chemische-verbindungen/:slug", "/de/chemische-verbindungen?v=:slug"),
  ];
}


/** Search Console 404 listesinden: eski sürümlerde kalan, artık hiçbir sayfanın bağlamadığı adresler. */
function legacyRedirects(): MergedRedirect[] {
  return [
    // Cark Cevir araci kaldirildi (Ekim 2026); kisa sure yayinda kaldigi icin hesaplayicilar sayfasina yonlenir.
    r("/cark-cevir", "/hesaplayicilar"),
    // Arama talebi olmayan iki araç kaldırıldı (Ekim 2026).
    r("/reklam-metrikleri-hesaplama", "/hesaplayicilar"),
    r("/uzaktan-calisma-ofis-maliyeti-karsilastirma", "/hesaplayicilar"),
    r("/gubre-seyreltme-hesaplama", "/gubre-ihtiyaci-hesaplama"),
    r("/embed/uzaktan-calisma-ofis-maliyeti-karsilastirma", "/hesaplayicilar"),
    r("/de/kategorien/aci", "/de/kategorien/winkel"),
    r("/de/kategorien/acisal_hiz", "/de/kategorien/winkelgeschwindigkeit"),
    r("/de/kategorien/elektrik", "/de/kategorien/elektrizitaet"),
    r("/de/kategorien/frekans", "/de/kategorien/frequenz"),
    r("/de/kategorien/guc", "/de/kategorien/leistung"),
    r("/de/kategorien/hiz", "/de/kategorien/geschwindigkeit"),
    r("/de/kategorien/isi_akisi", "/de/kategorien/waermestromdichte"),
    r("/de/kategorien/isil_iletkenlik", "/de/kategorien/waermeleitfaehigkeit"),
    r("/de/kategorien/ivme", "/de/kategorien/beschleunigung"),
    r("/de/kategorien/manyetik_aki", "/de/kategorien/magnetischer-fluss"),
    r("/de/kategorien/ozgul_isi", "/de/kategorien/spezifische-waermekapazitaet"),
    r("/de/kategorien/sicaklik", "/de/kategorien/temperatur"),
    r("/de/kategorien/zaman", "/de/kategorien/zeit"),
    r("/de/kategorien/undefined", "/de/alle-umrechnungen"),
    r("/en/categories/kuvvet", "/en/categories/force"),
    r("/en/categories/viskozite_dinamik", "/en/categories/viscosity"),
    r("/en/categories/yogunluk", "/en/categories/density"),
    r("/kategoriler/altin_ayar", "/kategoriler/altin-ayar"),
    r("/kategoriler/elektrik_direnc", "/kategoriler/direnc"),
    r("/kategoriler/elektrik_yuk", "/kategoriler/elektrik-yuku"),
    r("/kategoriler/gumus_ayar", "/kategoriler/gumus-ayar"),
    r("/kategoriler/viskozite_dinamik", "/kategoriler/viskozite"),
    r("/kategoriler/vitamin_d", "/kategoriler/vitamin-d"),
    r("/birimler/desilitre", "/kategoriler/hacim"),
    r("/birimler/santilitre", "/kategoriler/hacim"),
    r("/birimler/mmh2o", "/kategoriler/basinc"),
    r("/en/kiloohms-to-ohms", "/en/categories/resistance"),
    r("/en/ohms-to-kiloohms", "/en/categories/resistance"),
    r("/ru/categories", "/en/all-conversions"),
  ];
}

/** Yeni yapıya taşınan kategorilerin ve çiftlerin eski adresleri. */
function tasimaYonlendirmeleri(): MergedRedirect[] {
  return [
    ...[...yeniYapiKategorileri].map((k) => r(`/kategoriler/${k}`, `/${k}`)),
    ...Object.entries(TASINAN_CIFTLER).map(([cift, k]) => r(`/${cift}`, `/${k}/${cift}`)),
  ];
}

export function mergedPageRedirects(): MergedRedirect[] {
  // Kasım 2026 temizliği ile kaldırılan sayfalar önce gelir; aynı adres için sonraki kurallar yazılmaz.
  const kurallar = [
    ...kasimYonlendirmeleri().map(([kaynak, hedef]) => r(kaynak, hedef)),
    ...tasimaYonlendirmeleri(),
    ...Object.entries(KALDIRILAN_SAYFALAR).map(([kaynak, hedef]) => r(kaynak, hedef)),
    ...es419Redirects(), ...numberRedirects(), ...aminoAcidRedirects(), ...unitGuideRedirects().map((x) => r(x.source, x.destination)), ...altinRedirects(), ...goldKaratPairRedirects(), ...cgpaRedirects(), ...materialRedirects(), ...legacyRedirects(),
  ];
  const gorulen = new Set<string>();
  return kurallar.filter((k) => !gorulen.has(k.source) && gorulen.add(k.source));
}
