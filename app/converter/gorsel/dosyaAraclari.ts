// Dosya Araçları panelindeki araçların tek kayıt listesi. Yalnızca yayında olan araçlar eklenir.
import { GORSEL_CIFTLER } from "./ciftler";
import { SES_CIFTLERI, type SesKaynak } from "../ses/sesCiftler";
import { KAYNAK_CIFTLER, type KaynakFormat } from "./kaynakCiftler";
import type { GorselFormat } from "./formatlar";

export type DosyaKategori =
  | "donustur"
  | "kucult"
  | "boyut"
  | "duzenle"
  | "pdf"
  | "ses"
  | "veri"
  | "metin"
  | "resmi"
  | "gizlilik";

export const DOSYA_KATEGORILER: Array<{ id: DosyaKategori; ad: string }> = [
  { id: "donustur", ad: "Dönüştür" },
  { id: "kucult", ad: "Küçült" },
  { id: "boyut", ad: "Boyutlandır" },
  { id: "duzenle", ad: "Düzenle" },
  { id: "pdf", ad: "PDF" },
  { id: "ses", ad: "Ses ve video" },
  { id: "veri", ad: "Excel, veri ve ZIP" },
  { id: "metin", ad: "Metin tanıma" },
  { id: "resmi", ad: "Resmi belge fotoğrafları" },
  { id: "gizlilik", ad: "Gizlilik" },
];

export type AracIkon =
  | {
      tip: "cift";
      kaynak:
        | GorselFormat
        | KaynakFormat
        | SesKaynak
        | "tum"
        | "heic"
        | "pdf"
        | "ses"
        | "mov"
        | "xlsx"
        | "csv"
        | "json"
        | "zip";
      hedef:
        | GorselFormat
        | "tum"
        | "pdf"
        | "ico"
        | "b64"
        | "mp3"
        | "wav"
        | "mp4"
        | "gif"
        | "xlsx"
        | "csv"
        | "json"
        | "zip";
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
  | { tip: "ocr" }
  | { tip: "seskes" }
  | { tip: "video"; islem: "sikistir" | "kes" | "dondur" | "sessiz" };

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
    href: "/excel-csv-cevirme",
    baslik: "Excel CSV Çevirme",
    aciklama:
      "XLSX sayfalarını ; veya , ayırıcılı, Türkçe karakterli CSV yapın.",
    kategoriler: ["veri", "donustur"],
    ikon: { tip: "cift", kaynak: "xlsx", hedef: "csv" },
    yeni: true,
  },
  {
    href: "/csv-excel-cevirme",
    baslik: "CSV Excel Çevirme",
    aciklama: "CSV'yi bozuk karakter ve tek sütun sorunu olmadan XLSX yapın.",
    kategoriler: ["veri", "donustur"],
    ikon: { tip: "cift", kaynak: "csv", hedef: "xlsx" },
    yeni: true,
  },
  {
    href: "/csv-json-cevirme",
    baslik: "CSV JSON Çevirme",
    aciklama: "Tabloyu sayı ve iç içe alan tanıyarak JSON dizisine çevirin.",
    kategoriler: ["veri", "donustur"],
    ikon: { tip: "cift", kaynak: "csv", hedef: "json" },
    yeni: true,
  },
  {
    href: "/json-csv-cevirme",
    baslik: "JSON CSV Çevirme",
    aciklama:
      "JSON'u Excel'de açılan tabloya çevirin; iç içe alanlar sütun olur.",
    kategoriler: ["veri", "donustur"],
    ikon: { tip: "cift", kaynak: "json", hedef: "csv" },
    yeni: true,
  },
  {
    href: "/json-duzenleyici",
    baslik: "JSON Düzenleyici",
    aciklama: "JSON'u biçimlendirin, hatayı satırıyla bulun, küçültün.",
    kategoriler: ["veri", "metin"],
    ikon: { tip: "cift", kaynak: "json", hedef: "json" },
    yeni: true,
  },
  {
    href: "/zip-olusturma",
    baslik: "ZIP Oluşturma",
    aciklama: "Dosya ve klasörleri sıkıştırılmış tek ZIP yapın.",
    kategoriler: ["veri", "kucult"],
    ikon: { tip: "cift", kaynak: "tum", hedef: "zip" },
    yeni: true,
  },
  {
    href: "/zip-acma",
    baslik: "ZIP Açma",
    aciklama: "Programsız ZIP açın, dosyaları önizleyip indirin.",
    kategoriler: ["veri"],
    ikon: { tip: "cift", kaynak: "zip", hedef: "tum" },
    yeni: true,
  },
  {
    href: "/video-sikistirma",
    baslik: "Video Sıkıştırma",
    aciklama:
      "Videoyu 25 MB, 10 MB gibi hedef boyuta küçültün; kalite ve çözünürlük seçin.",
    kategoriler: ["ses", "kucult"],
    ikon: { tip: "video", islem: "sikistir" },
    yeni: true,
  },
  {
    href: "/mov-mp4-cevirme",
    baslik: "MOV MP4 Çevirme",
    aciklama: "iPhone MOV videolarını her yerde açılan MP4'e çevirin.",
    kategoriler: ["ses", "donustur"],
    ikon: { tip: "cift", kaynak: "mov", hedef: "mp4" },
    yeni: true,
  },
  {
    href: "/video-kesme",
    baslik: "Video Kesme",
    aciklama: "Videonun başını, sonunu veya bir bölümünü kesin.",
    kategoriler: ["ses", "duzenle"],
    ikon: { tip: "video", islem: "kes" },
    yeni: true,
  },
  {
    href: "/video-dondurme",
    baslik: "Video Döndürme",
    aciklama: "Yan veya ters çekilmiş videoyu döndürün, aynalayın.",
    kategoriler: ["ses", "duzenle"],
    ikon: { tip: "video", islem: "dondur" },
    yeni: true,
  },
  {
    href: "/videodan-sesi-kaldirma",
    baslik: "Videodan Sesi Kaldırma",
    aciklama: "Videonun sesini silin; görüntü kalitesi değişmez.",
    kategoriler: ["ses", "duzenle", "gizlilik"],
    ikon: { tip: "video", islem: "sessiz" },
    yeni: true,
  },
  {
    href: "/video-gif-cevirme",
    baslik: "Video GIF Çevirme",
    aciklama: "Videodan bölüm seçip hareketli GIF yapın.",
    kategoriler: ["ses", "donustur"],
    ikon: { tip: "cift", kaynak: "mp4", hedef: "gif" },
    yeni: true,
  },
  {
    href: "/gif-mp4-cevirme",
    baslik: "GIF MP4 Çevirme",
    aciklama: "GIF'leri çok daha küçük MP4 videoya çevirin.",
    kategoriler: ["ses", "donustur"],
    ikon: { tip: "cift", kaynak: "gif", hedef: "mp4" },
    yeni: true,
  },
  {
    href: "/mp4-mp3-cevirme",
    baslik: "MP4 MP3 Çevirme",
    aciklama: SES_CIFTLERI[0].kart,
    kategoriler: ["ses", "donustur"],
    ikon: { tip: "cift", kaynak: "mp4", hedef: "mp3" },
    yeni: true,
  },
  {
    href: "/ses-kesme",
    baslik: "Ses Kesme (MP3 Kesici)",
    aciklama:
      "Dalga formunda bölüm seçin, yumuşak giriş/çıkış ekleyin, zil sesi yapın.",
    kategoriler: ["ses", "duzenle"],
    ikon: { tip: "seskes" },
    yeni: true,
  },
  {
    href: "/ses-donusturucu",
    baslik: "Ses Dönüştürücü",
    aciklama: "Her türlü ses ve videoyu MP3 veya WAV'a toplu çevirin.",
    kategoriler: ["ses", "donustur"],
    ikon: { tip: "cift", kaynak: "ses", hedef: "mp3" },
    yeni: true,
  },
  ...SES_CIFTLERI.slice(1).map(
    (c): DosyaAraci => ({
      href: `/${c.slug}`,
      baslik: c.baslik.replace(/ \(.*\)$/, ""),
      aciklama: c.kart,
      kategoriler: ["ses", "donustur"],
      ikon: { tip: "cift", kaynak: c.kaynak, hedef: c.hedef },
      yeni: true,
    }),
  ),
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
  {
    href: "/favicon-olusturucu",
    baslik: "Favicon Oluşturucu",
    aciklama:
      "Logodan favicon.ico, Apple ve Android simgeleri; HTML kodu hazır.",
    kategoriler: ["donustur", "boyut"],
    ikon: { tip: "cift", kaynak: "png", hedef: "ico" },
    yeni: true,
  },
  {
    href: "/resim-base64-cevirme",
    baslik: "Resim Base64 Çevirme",
    aciklama: "Görseli Base64 / data URI'ye, Base64 metnini resme çevirin.",
    kategoriler: ["donustur"],
    ikon: { tip: "cift", kaynak: "tum", hedef: "b64" },
    yeni: true,
  },
  ...KAYNAK_CIFTLER.map(
    (c): DosyaAraci => ({
      href: `/${c.slug}`,
      baslik: c.baslik,
      aciklama: c.kart,
      kategoriler: ["donustur"],
      ikon: { tip: "cift", kaynak: c.kaynak, hedef: c.hedef },
      yeni: true,
    }),
  ),
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
