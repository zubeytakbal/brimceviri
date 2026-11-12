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
    kategoriler: ["elektrik"],
  },
  {
    id: "isik-ve-radyasyon",
    ad: "Işık ve radyasyon",
    kategoriler: [
      "aydinlatma-siddeti",
      "radyasyon",
    ],
  },
  {
    id: "saglik-ve-kimya",
    ad: "Sağlık ve kimya",
    kategoriler: ["konsantrasyon", "alkol-derecesi", "tempo"],
  },
  {
    id: "tarim-ve-arazi",
    ad: "Tarım ve arazi",
    kategoriler: ["tarim"],
  },
  {
    id: "kuyumculuk-ve-tekstil",
    ad: "Kuyumculuk ve tekstil",
    kategoriler: ["altin-ayar", "gumus-ayar", "tekstil"],
  },
];

/**
 * Yeni yapiya tasinmis kategoriler. Bunlarin kategori sayfasi /<kategori>, cift sayfalari
 * /<kategori>/<cift> adresindedir; eski /kategoriler/<kategori> ve /<cift> adresleri
 * 301 ile yonlenir (app/mergedPageRedirects.ts).
 */
export const yeniYapiKategorileri: ReadonlySet<string> = new Set(["uzunluk", "alan", "hacim", "kutle"]);

/**
 * Birlesik kategori sayfalari: birbirine cevrilemeyen ama ayni konudaki kucuk kategoriler tek sayfada
 * (/radyasyon), her biri kendi ceviricisiyle. Eski /kategoriler/<kategori> adresleri 301 ile bu sayfaya gider
 * (app/kasimTemizligi.ts). Gruplarda (birimGruplari) uye kategoriler yerine birlesik sayfanin slug'i yer alir.
 */
export const BIRLESIK_KATEGORILER: Readonly<Record<string, { ad: string; kategoriler: readonly string[] }>> = {
  elektrik: {
    ad: "Elektrik",
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
  konsantrasyon: {
    ad: "Konsantrasyon",
    kategoriler: ["konsantrasyon", "kan-sekeri", "vitamin-d", "su-sertligi"],
  },
  // iplik-numarasi sayfada gosterilmez (Kasim 2026, arama almiyordu); uye kalir ki eski adresi /tekstil'e yonlensin.
  tekstil: {
    ad: "Tekstil",
    kategoriler: ["iplik-numarasi", "gramaj", "hali-dugum-sikligi"],
  },
  tarim: {
    ad: "Tarım ve arazi",
    kategoriler: ["dekar-basina-verim", "dekar-basina-doz", "yagis-miktari", "alana-gore-fiyat"],
  },
  radyasyon: {
    ad: "Radyasyon",
    kategoriler: ["radyasyon-dozu", "sogurulan-doz", "doz-hizi", "radyoaktivite", "isinlama"],
  },
};

/** Kategori bir birlesik sayfaya katildiysa o sayfanin slug'i. */
export function birlesikHedef(kategoriSlug: string): string | undefined {
  for (const [hedef, b] of Object.entries(BIRLESIK_KATEGORILER)) if (b.kategoriler.includes(kategoriSlug)) return hedef;
  return undefined;
}

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

/** Yeni arac sayfasi duzenine (AracSayfasi) gecmis Turkce araclar ve iceriklerinin son degistigi gun (git gecmisi).
 * TimeToolPage kullanan sayfalar bu listeye eklenince yeni duzenle cizilir. */
export const YENI_ARACLAR: Readonly<Record<string, string>> = {
  "/22-ayar-altin-24-ayar-altin": "2026-11-05",
  "/24-ayar-altin-22-ayar-altin": "2026-11-05",
  "/altin-hesaplama": "2026-11-05",
  "/altin-hesaplama/ceyrek-altin": "2026-11-05",
  "/altin-hesaplama/cumhuriyet-altini": "2026-11-05",
  "/ceyrek-bilezik-hesaplama": "2026-11-05",
  "/dekara-fidan-sayisi-hesaplama": "2026-11-05",
  "/dogdugum-gun-hangi-gun": "2026-11-07",
  "/egim-cevirme": "2026-11-09",
  "/hafizlik-hesaplama": "2026-11-07",
  "/harita-olcegi-hesaplama": "2026-11-09",
  "/hatim-hesaplama": "2026-11-07",
  "/hayiz-hesaplama": "2026-11-07",
  "/hicri-yas-hesaplama": "2026-11-07",
  "/ilaclama-hesaplama": "2026-11-05",
  "/inek-dogum-hesaplama": "2026-11-05",
  "/kaza-namazi-hesaplama": "2026-11-07",
  "/kaza-orucu-hesaplama": "2026-11-07",
  "/kible-yonu-hesaplama": "2026-11-07",
  "/kirk-mevlidi-hesaplama": "2026-11-07",
  "/koordinat-donusturucu": "2026-11-09",
  "/kredi-hesaplama": "2026-11-07",
  "/roma-rakamlari-cevirme": "2026-11-09",
  "/trafik-cezasi-erken-odeme-hesaplama": "2026-11-05",
  "/yas-hesaplama": "2026-11-07",
  "/yerel-saat-hesaplama": "2026-11-07",
  "/yillik-izin-hesaplama": "2026-11-07",
  "/zekat-hesaplama": "2026-11-07",
  "/dogalgaz-tuketimi-hesaplama": "2026-11-09",
  "/yakit-tuketimi-hesaplama": "2026-11-02",
  "/ehliyet-yenileme-suresi-hesaplama": "2026-11-10",
  "/lastik-ebati-hesaplama": "2026-11-10",
  "/seyir-suresi-hesaplama": "2026-11-09",
  "/devamsizlik-hesaplama": "2026-11-10",
  "/harf-notu-hesaplama": "2026-11-10",
  "/beton-hesaplama": "2026-11-10",
  "/merdiven-hesaplama": "2026-11-10",
  "/kereste-hesaplama": "2026-11-10",
  "/emsal-kaks-hesaplama": "2026-11-10",
  "/hafriyat-hesaplama": "2026-11-02",
  "/malzeme-agirligi-hesaplama": "2026-11-02",
  "/boya-hesaplama": "2026-11-02",
  "/fayans-hesaplama": "2026-11-02",
  "/parke-hesaplama": "2026-11-02",
  "/duvar-kagidi-hesaplama": "2026-11-02",
  "/awg-mm2-cevirici": "2026-11-02",
  "/psu-guc-hesaplama": "2026-11-02",
  "/anten-uzunlugu-hesaplama": "2026-11-02",
  "/kesme-hizi-devir-hesaplama": "2026-11-02",
  "/civata-torku-hesaplama": "2026-11-02",
  "/isil-genlesme-hesaplama": "2026-11-02",
  "/kaynak-isi-girdisi-hesaplama": "2026-11-09",
  "/malzeme-ozellikleri": "2026-11-10",
  "/yan-ruzgar-hesaplama": "2026-11-09",
  "/boru-capi-donusum-hesaplama": "2026-11-02",
  "/boru-capi-hesaplama": "2026-11-02",
  "/basinc-kaybi-hesaplama": "2026-11-02",
  "/alkol-seyreltme-hesaplama": "2026-11-02",
  "/klor-dozaji-hesaplama": "2026-11-02",
  "/tarla-donum-hesaplama": "2026-11-02",
  "/tohum-miktari-hesaplama": "2026-11-02",
  "/gubre-ihtiyaci-hesaplama": "2026-11-02",
  "/veteriner-ilac-dozu-hesaplama": "2026-11-02",
  "/bilim-hesaplayicilari/biyoloji/kodon-tablosu": "2026-11-02",
  "/elektrik-tuketimi-hesaplama": "2026-11-09",
  "/kokteyl-olcusu-cevirici": "2026-11-02",
  "/abv-standart-icki-hesaplama": "2026-11-02",
  "/uzunluk-karsilastirma": "2026-11-02",
  "/kosu-pace-hesaplama": "2026-11-02",
};
export const YENI_ARAC_YOLLARI: ReadonlySet<string> = new Set(Object.keys(YENI_ARACLAR));

/** 400px'lik hesap kutusuna sigmayan araclar (genis tablo, pusula, yan yana sonuclar): hesap iki sutunu birden kaplar. */
export const GENIS_ARACLAR: ReadonlySet<string> = new Set([
  "/kible-yonu-hesaplama",
  "/koordinat-donusturucu",
  "/kredi-hesaplama",
  "/kirk-mevlidi-hesaplama",
  "/harita-olcegi-hesaplama",
]);

/** Yeni kabugun (ust menu, yan panel, alt bilgi) cizilecegi Turkce yollar. */
export function isYeniYapiYolu(pathname: string) {
  if (pathname === "/" || YENI_ARAC_YOLLARI.has(pathname)) return true;
  const ilk = pathname.split("/")[1] ?? "";
  if (yeniYapiKategorileri.has(ilk) || KURUMSAL_YOLLAR.has(ilk) || (ilk in BIRLESIK_KATEGORILER && !pathname.split("/")[2])) return true;
  // Grup sayfalari: /hesaplayicilar/<grup> (ayni adres altindaki eski araclar haric)
  const [, bolum, grup, fazla] = pathname.split("/");
  if (fazla !== undefined || !grup) return false;
  return bolum === "hesaplayicilar" && HESAP_GRUP_SLUGLARI.has(grup);
}

/** Turkce kategori sayfasinin adresi (tasinmis kategoride yeni, digerlerinde eski adres). */
export function turkceKategoriYolu(kategoriSlug: string) {
  if (kategoriSlug in BIRLESIK_KATEGORILER) return `/${kategoriSlug}`;
  const hedef = birlesikHedef(kategoriSlug);
  if (hedef) return `/${hedef}`;
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
  const slug = birlesikHedef(kategoriSlug) ?? kategoriSlug;
  return birimGruplari.find((g) => g.kategoriler.includes(slug));
}
