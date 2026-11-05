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
