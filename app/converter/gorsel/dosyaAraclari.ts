// Dosya Araçları panelindeki araçların tek kayıt listesi. Yalnızca yayında olan araçlar eklenir.
import { GORSEL_CIFTLER } from "./ciftler";
import type { GorselFormat } from "./formatlar";

export type DosyaKategori =
  | "donustur"
  | "kucult"
  | "boyut"
  | "resmi"
  | "gizlilik";

export const DOSYA_KATEGORILER: Array<{ id: DosyaKategori; ad: string }> = [
  { id: "donustur", ad: "Dönüştür" },
  { id: "kucult", ad: "Küçült" },
  { id: "boyut", ad: "Boyutlandır" },
  { id: "resmi", ad: "Resmi belge fotoğrafları" },
  { id: "gizlilik", ad: "Gizlilik" },
];

export type AracIkon =
  | { tip: "cift"; kaynak: GorselFormat | "tum"; hedef: GorselFormat | "tum" }
  | { tip: "kucult" }
  | { tip: "boyut" }
  | { tip: "vesikalik" }
  | { tip: "konum" }
  | { tip: "kirp" };

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
