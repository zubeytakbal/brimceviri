// Dosya Araçları panelindeki araçların tek kayıt listesi. Yalnızca yayında olan araçlar eklenir.
import { GORSEL_CIFTLER } from "./ciftler";
import type { GorselFormat } from "./formatlar";

export type DosyaKategori =
  | "donustur"
  | "kucult"
  | "boyut"
  | "duzenle"
  | "pdf"
  | "metin"
  | "resmi"
  | "gizlilik";

export const DOSYA_KATEGORILER: Array<{ id: DosyaKategori; ad: string }> = [
  { id: "donustur", ad: "Dönüştür" },
  { id: "kucult", ad: "Küçült" },
  { id: "boyut", ad: "Boyutlandır" },
  { id: "duzenle", ad: "Düzenle" },
  { id: "pdf", ad: "PDF" },
  { id: "metin", ad: "Metin tanıma" },
  { id: "resmi", ad: "Resmi belge fotoğrafları" },
  { id: "gizlilik", ad: "Gizlilik" },
];

export type AracIkon =
  | {
      tip: "cift";
      kaynak: GorselFormat | "tum" | "heic" | "pdf";
      hedef: GorselFormat | "tum" | "pdf";
    }
  | {
      tip: "pdf";
      islem:
        | "birlestir"
        | "bol"
        | "duzenle"
        | "numara"
        | "metin"
        | "sikistir"
        | "filigran"
        | "imza";
    }
  | { tip: "kucult" }
  | { tip: "boyut" }
  | { tip: "vesikalik" }
  | { tip: "konum" }
  | { tip: "kirp" }
  | { tip: "filigran" }
  | { tip: "bulanik" }
  | { tip: "ocr" };

export type DosyaAraci = {
  href: string;
  baslik: string;
  aciklama: string;
  kategoriler: DosyaKategori[];
  ikon: AracIkon;
  yeni?: boolean;
};

const KART: Record<string, string> = {
  "png-jpg-cevirme":
    "PNG'leri JPG'ye çevirin; saydam alanlar istediğiniz renkle dolar.",
  "jpg-png-cevirme":
    "Fotoğrafları kayıpsız PNG olarak kaydedin, düzenlemeye hazırlayın.",
  "webp-jpg-cevirme":
    "İnternetten inen WebP görselleri her programda açılan JPG yapın.",
  "jpg-webp-cevirme":
    "Web siteniz için fotoğrafları daha küçük WebP dosyalarına çevirin.",
  "webp-png-cevirme":
    "Saydam WebP logo ve çıkartmaları saydamlığı koruyarak PNG yapın.",
  "png-webp-cevirme":
    "Saydam PNG'leri daha küçük WebP'ye çevirip sayfanızı hızlandırın.",
};

export const DOSYA_ARACLARI_YOLU = "/dosya-araclari";

export const DOSYA_ARACLARI: DosyaAraci[] = [
  {
    href: "/pdf-birlestirme",
    baslik: "PDF Birleştirme",
    aciklama: "PDF dosyalarını istediğiniz sırayla tek PDF'te birleştirin.",
    kategoriler: ["pdf"],
    ikon: { tip: "pdf", islem: "birlestir" },
    yeni: true,
  },
  {
    href: "/pdf-sikistirma",
    baslik: "PDF Sıkıştırma",
    aciklama:
      "PDF boyutunu küçültün; yazılar keskin kalır, yalnız görseller sıkıştırılır.",
    kategoriler: ["pdf", "kucult"],
    ikon: { tip: "pdf", islem: "sikistir" },
    yeni: true,
  },
  {
    href: "/pdf-bolme",
    baslik: "PDF Bölme",
    aciklama:
      "Sayfalara ayırın, aralıklarla bölün veya istediğiniz sayfaları çıkarın.",
    kategoriler: ["pdf"],
    ikon: { tip: "pdf", islem: "bol" },
    yeni: true,
  },
  {
    href: "/jpg-pdf-cevirme",
    baslik: "JPG PDF Çevirme",
    aciklama: "Fotoğrafları ve taranmış belgeleri A4 PDF'e çevirin.",
    kategoriler: ["pdf", "donustur"],
    ikon: { tip: "cift", kaynak: "jpg", hedef: "pdf" },
    yeni: true,
  },
  {
    href: "/pdf-jpg-cevirme",
    baslik: "PDF JPG Çevirme",
    aciklama:
      "PDF sayfalarını 300 DPI'ya kadar JPG veya PNG resimlere çevirin.",
    kategoriler: ["pdf", "donustur"],
    ikon: { tip: "cift", kaynak: "pdf", hedef: "jpg" },
    yeni: true,
  },
  {
    href: "/pdf-sayfa-duzenleme",
    baslik: "PDF Sayfa Silme ve Döndürme",
    aciklama: "Önizlemeli sayfa silme, döndürme ve sürükleyerek sıralama.",
    kategoriler: ["pdf", "duzenle"],
    ikon: { tip: "pdf", islem: "duzenle" },
    yeni: true,
  },
  {
    href: "/pdf-sayfa-numarasi-ekleme",
    baslik: "PDF Sayfa Numarası Ekleme",
    aciklama: "Tez ve raporlara 6 konumda, kapak atlamalı sayfa numarası.",
    kategoriler: ["pdf"],
    ikon: { tip: "pdf", islem: "numara" },
    yeni: true,
  },
  {
    href: "/pdf-metin-cikarma",
    baslik: "PDF'ten Metin Çıkarma",
    aciklama: "PDF'i yazıya çevirin; taranmış sayfalar Türkçe OCR ile okunur.",
    kategoriler: ["pdf", "metin"],
    ikon: { tip: "pdf", islem: "metin" },
    yeni: true,
  },
  {
    href: "/pdf-imzalama",
    baslik: "PDF İmzalama",
    aciklama:
      "İmzanızı çizin, yazın veya yükleyin; sayfaya sürükleyip yerleştirin.",
    kategoriler: ["pdf", "duzenle"],
    ikon: { tip: "pdf", islem: "imza" },
    yeni: true,
  },
  {
    href: "/pdf-filigran-ekleme",
    baslik: "PDF Filigran Ekleme",
    aciklama: "Sayfalara GİZLİ, TASLAK gibi yazı ya da logo filigranı ekleyin.",
    kategoriler: ["pdf", "gizlilik"],
    ikon: { tip: "pdf", islem: "filigran" },
    yeni: true,
  },
  {
    href: "/resimden-yaziya-cevirme",
    baslik: "Resimden Yazıya Çevirme",
    aciklama:
      "Fotoğraf ve ekran görüntüsündeki yazıyı Türkçe karakterlerle metne çevirin.",
    kategoriler: ["metin"],
    ikon: { tip: "ocr" },
    yeni: true,
  },
  {
    href: "/fotograf-bulaniklastirma",
    baslik: "Fotoğraf Bulanıklaştırma",
    aciklama:
      "Yüzleri, plakaları ve yazıları bulanık, mozaik ya da siyah kutuyla gizleyin.",
    kategoriler: ["duzenle", "gizlilik"],
    ikon: { tip: "bulanik" },
    yeni: true,
  },
  {
    href: "/fotografa-filigran-ekleme",
    baslik: "Filigran Ekleme",
    aciklama:
      "Yazı veya logo filigranı; köşeye ya da tüm görsele döşeyin. Kimlik fotokopisi hazır.",
    kategoriler: ["duzenle", "gizlilik"],
    ikon: { tip: "filigran" },
    yeni: true,
  },
  {
    href: "/biyometrik-fotograf",
    baslik: "Biyometrik Fotoğraf (50×60)",
    aciklama:
      "Kimlik, pasaport ve ehliyet için 50×60 mm; 10×15 baskı sayfasında 4 adet.",
    kategoriler: ["resmi"],
    ikon: { tip: "vesikalik" },
    yeni: true,
  },
  {
    href: "/fotograf-kirpma",
    baslik: "Fotoğraf Kırpma ve Döndürme",
    aciklama: "1:1, 4:5, 16:9 gibi oranlarla kırpın; 90° döndürün, çevirin.",
    kategoriler: ["boyut"],
    ikon: { tip: "kirp" },
    yeni: true,
  },
  {
    href: "/fotograf-konum-bilgisi-silme",
    baslik: "Konum Bilgisi (EXIF) Silme",
    aciklama:
      "Fotoğraftaki konumu, cihazı ve tarihi görün; kalite kaybı olmadan silin.",
    kategoriler: ["gizlilik"],
    ikon: { tip: "konum" },
    yeni: true,
  },
  {
    href: "/resim-boyutlandirma",
    baslik: "Resim Boyutlandırma",
    aciklama:
      "Piksel, yüzde veya santimetre ile boyutlandırın; sosyal medya ölçüleri hazır.",
    kategoriler: ["boyut"],
    ikon: { tip: "boyut" },
    yeni: true,
  },
  {
    href: "/e-okul-fotograf-kucultme",
    baslik: "e-Okul Fotoğraf Küçültme",
    aciklama:
      "Öğrenci fotoğraflarını 133×171 piksel, 20–150 KB yapın; bütün sınıf tek seferde.",
    kategoriler: ["resmi"],
    ikon: { tip: "vesikalik" },
    yeni: true,
  },
  {
    href: "/fotograf-boyutu-kucultme",
    baslik: "Fotoğraf Boyutu Küçültme",
    aciklama:
      "Fotoğrafı 20, 50, 100, 200 KB veya istediğiniz sınırın altına düşürün.",
    kategoriler: ["kucult"],
    ikon: { tip: "kucult" },
    yeni: true,
  },
  {
    href: "/gorsel-donusturucu",
    baslik: "Görsel Dönüştürücü",
    aciklama:
      "JPG, PNG ve WebP'yi birbirine çevirin; kalite ve genişliği ayarlayın.",
    kategoriler: ["donustur"],
    ikon: { tip: "cift", kaynak: "tum", hedef: "tum" },
  },
  {
    href: "/heic-jpg-cevirme",
    baslik: "HEIC JPG Çevirme",
    aciklama:
      "iPhone fotoğraflarını Windows'ta ve her yerde açılan JPG'ye çevirin.",
    kategoriler: ["donustur"],
    ikon: { tip: "cift", kaynak: "heic", hedef: "jpg" },
    yeni: true,
  },
  ...GORSEL_CIFTLER.map(
    (c): DosyaAraci => ({
      href: `/${c.slug}`,
      baslik: c.baslik,
      aciklama: KART[c.slug] ?? c.kisa,
      kategoriler: ["donustur"],
      ikon: { tip: "cift", kaynak: c.kaynak, hedef: c.hedef },
    }),
  ),
];
