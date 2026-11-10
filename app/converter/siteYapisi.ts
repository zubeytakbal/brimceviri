// Yeni site yapisinin tek dogruluk kaynagi (Turkce).
//
// Hiyerarsi: Ana sayfa -> Grup -> Kategori ceviricisi (/uzunluk) -> Cift sayfasi (/uzunluk/santimetre-inc).
// Yan panel, ust menu, breadcrumb ve URL'ler buradan uretilir. Bir kategori yalnizca
// bir gruba aittir; listede olmayan kategori derlemede hata verir (siteYapisi.test.ts).

export type BirimGrubu = {
  id: string;
  ad: string;
  /** categoryPages slug'lari, panelde bu sirayla gosterilir. */
  kategoriler: string[];
};

export const birimGruplari: BirimGrubu[] = [
  {
    id: "temel",
    ad: "Temel",
    kategoriler: ["uzunluk", "kutle", "alan", "hacim", "sicaklik", "zaman", "hiz", "aci", "veri"],
  },
  {
    id: "muhendislik",
    ad: "Mühendislik",
    kategoriler: [
      "basinc",
      "kuvvet",
      "tork",
      "enerji",
      "guc",
      "yogunluk",
      "ivme",
      "acisal-hiz",
      "momentum",
      "frekans",
      "vida-hatvesi",
    ],
  },
  {
    id: "isi-ve-akiskan",
    ad: "Isı ve akışkan",
    kategoriler: [
      "debi",
      "hacimsel-debi",
      "kutlesel-debi",
      "viskozite",
      "kinematik-viskozite",
      "isil-iletkenlik",
      "isi-akisi",
      "ozgul-isi",
      "yakit-verimliligi",
    ],
  },
  {
    id: "elektrik",
    ad: "Elektrik ve manyetizma",
    kategoriler: [
      "elektrik",
      "direnc",
      "kapasitans",
      "enduktans",
      "elektrik-yuku",
      "elektrik-iletkenligi",
      "manyetik-alan",
      "manyetik-aki",
    ],
  },
  {
    id: "isik-ve-radyasyon",
    ad: "Işık ve radyasyon",
    kategoriler: [
      "aydinlatma-siddeti",
      "radyasyon-dozu",
      "sogurulan-doz",
      "doz-hizi",
      "radyoaktivite",
      "isinlama",
    ],
  },
  {
    id: "saglik-ve-kimya",
    ad: "Sağlık ve kimya",
    kategoriler: ["kan-sekeri", "vitamin-d", "konsantrasyon", "alkol-derecesi", "su-sertligi", "tempo"],
  },
  {
    id: "tarim-ve-arazi",
    ad: "Tarım ve arazi",
    kategoriler: ["dekar-basina-verim", "dekar-basina-doz", "alana-gore-fiyat", "yagis-miktari"],
  },
  {
    id: "kuyumculuk-ve-tekstil",
    ad: "Kuyumculuk ve tekstil",
    kategoriler: ["altin-ayar", "gumus-ayar", "gramaj", "iplik-numarasi", "hali-dugum-sikligi"],
  },
];

/**
 * Yeni yapiya tasinmis kategoriler. Bunlarin kategori sayfasi /<kategori>, cift sayfalari
 * /<kategori>/<cift> adresindedir; eski /kategoriler/<kategori> ve /<cift> adresleri
 * 301 ile yonlenir (app/mergedPageRedirects.ts).
 */
export const yeniYapiKategorileri: ReadonlySet<string> = new Set(["uzunluk", "alan"]);

// app/components/yeni/anaSayfaVerisi.ts icindeki HESAPLAYICI_GRUPLARI ile ayni (tests/anaSayfa.test.ts).
export const HESAP_GRUP_SLUGLARI: ReadonlySet<string> = new Set([
  "donusum",
  "finans",
  "gunluk-yasam",
  "insaat",
  "saglik",
  "matematik",
  "fizik",
  "kimya",
  "biyoloji",
  "ekoloji",
  "yiyecek",
  "diger",
]);

const KURUMSAL_YOLLAR: ReadonlySet<string> = new Set([
  "hakkimizda",
  "iletisim",
  "gizlilik",
  "kullanim-kosullari",
  "editoryal-politika",
  "yazar",
]);

/** Yeni arac sayfasi duzenine (AracSayfasi) gecmis Turkce araclar. */
export const YENI_ARAC_YOLLARI: ReadonlySet<string> = new Set(["/kdv-hesaplama"]);

/** Yeni kabugun (ust menu, yan panel, alt bilgi) cizilecegi Turkce yollar. */
export function isYeniYapiYolu(pathname: string) {
  if (pathname === "/" || YENI_ARAC_YOLLARI.has(pathname)) return true;
  const ilk = pathname.split("/")[1] ?? "";
  if (yeniYapiKategorileri.has(ilk) || KURUMSAL_YOLLAR.has(ilk)) return true;
  // Grup sayfalari: /hesaplayicilar/<grup> (ayni adres altindaki eski araclar haric)
  const [, bolum, grup, fazla] = pathname.split("/");
  if (fazla !== undefined || !grup) return false;
  return bolum === "hesaplayicilar" && HESAP_GRUP_SLUGLARI.has(grup);
}

/** Turkce kategori sayfasinin adresi (tasinmis kategoride yeni, digerlerinde eski adres). */
export function turkceKategoriYolu(kategoriSlug: string) {
  return yeniYapiKategorileri.has(kategoriSlug) ? `/${kategoriSlug}` : `/kategoriler/${kategoriSlug}`;
}

/** Ust menude sekme olarak gorunen kategoriler (referanstaki gibi az ve sik kullanilan). */
export const ustMenuKategorileri = ["uzunluk", "kutle", "alan", "hacim", "sicaklik", "zaman", "hiz", "basinc"];

export function kategoriYolu(kategoriSlug: string) {
  return `/${kategoriSlug}`;
}

export function ciftYolu(kategoriSlug: string, ciftSlug: string) {
  return `/${kategoriSlug}/${ciftSlug}`;
}

export function kategorininGrubu(kategoriSlug: string): BirimGrubu | undefined {
  return birimGruplari.find((g) => g.kategoriler.includes(kategoriSlug));
}
