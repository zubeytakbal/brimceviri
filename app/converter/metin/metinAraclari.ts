// Metin Araçları panelinin kayıt listesi. Hepsi tarayıcıda çalışır.
import type { AracIkon } from "../gorsel/dosyaAraclari";

export const METIN_ARACLARI_YOLU = "/metin-araclari";

export type MetinKategori = "turkce" | "dogrulama" | "diger";

export const METIN_KATEGORILER: Array<{ id: MetinKategori; ad: string }> = [
  { id: "turkce", ad: "Türkçe yazım" },
  { id: "dogrulama", ad: "Numara doğrulama" },
  { id: "diger", ad: "Diğer metin araçları" },
];

export type MetinAraci = {
  href: string;
  baslik: string;
  aciklama: string;
  kategoriler: MetinKategori[];
  ikon: AracIkon;
  yeni?: boolean;
};

export const METIN_ARACLARI: MetinAraci[] = [
  {
    href: "/turkce-karakter-duzeltme",
    baslik: "Türkçe Karakter Düzeltme",
    aciklama:
      '"turkce karakter" yazısını "Türkçe karakter" yapın; düzeltilen harfler işaretli.',
    kategoriler: ["turkce"],
    ikon: { tip: "ag", simge: "karakter" },
    yeni: true,
  },
  {
    href: "/turkce-karakter-kaldirma",
    baslik: "Türkçe Karakter Kaldırma",
    aciklama:
      "ç, ğ, ı, ö, ş, ü harflerini c, g, i, o, s, u yapın; web adresi (URL) üretin.",
    kategoriler: ["turkce"],
    ikon: { tip: "ag", simge: "karakter" },
    yeni: true,
  },
  {
    href: "/buyuk-kucuk-harf-donusturme",
    baslik: "Büyük Küçük Harf Dönüştürme",
    aciklama: "BÜYÜK, küçük, Her Kelime Büyük, cümle düzeni; İ ve ı doğru.",
    kategoriler: ["turkce"],
    ikon: { tip: "ag", simge: "harf" },
    yeni: true,
  },
  {
    href: "/sayiyi-yaziya-cevirme",
    baslik: "Sayıyı Yazıya Çevirme",
    aciklama: "Tutarı yazıyla yazın: çek, senet ve fatura için TL ve kuruşlu.",
    kategoriler: ["turkce"],
    ikon: { tip: "ag", simge: "sayi" },
    yeni: true,
  },
  {
    href: "/hece-ayirma",
    baslik: "Hece Ayırma",
    aciklama:
      "Kelimeleri hecelerine ayırın; şiirde her dizenin hece sayısını bulun.",
    kategoriler: ["turkce"],
    ikon: { tip: "ag", simge: "hece" },
    yeni: true,
  },
  {
    href: "/tc-kimlik-no-dogrulama",
    baslik: "TC Kimlik No Doğrulama",
    aciklama:
      "TC kimlik numarasının geçerli olup olmadığını kontrol edin; toplu liste.",
    kategoriler: ["dogrulama"],
    ikon: { tip: "ag", simge: "tckn" },
    yeni: true,
  },
  {
    href: "/vergi-no-dogrulama",
    baslik: "Vergi No Doğrulama",
    aciklama:
      "10 haneli vergi kimlik numarasını (VKN) kontrol hanesiyle doğrulayın.",
    kategoriler: ["dogrulama"],
    ikon: { tip: "ag", simge: "vkn" },
    yeni: true,
  },
  {
    href: "/iban-dogrulama",
    baslik: "IBAN Doğrulama",
    aciklama:
      "IBAN'da yazım hatası var mı? Kontrol numarası, banka kodu ve hesap no.",
    kategoriler: ["dogrulama"],
    ikon: { tip: "ag", simge: "iban" },
    yeni: true,
  },
  {
    href: "/metin-karsilastirma",
    baslik: "Metin Karşılaştırma",
    aciklama: "İki metin arasındaki farkları kelime kelime görün.",
    kategoriler: ["diger"],
    ikon: { tip: "fark" },
  },
  {
    href: "/sifre-olusturucu",
    baslik: "Şifre Oluşturucu",
    aciklama: "Güçlü ve rastgele şifreler üretin; kırılma süresini görün.",
    kategoriler: ["diger"],
    ikon: { tip: "sifre" },
  },
];
