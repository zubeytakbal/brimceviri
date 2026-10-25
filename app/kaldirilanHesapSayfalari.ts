// 25 Ekim 2026: Hesaplamalar bölümünde en az 7 haftalık, kısa (350 kelimeden az) ve Search Console'un son 3 ayında
// (24 Temmuz – 24 Ekim 2026) 60'tan az gösterim alan sayfalar kaldırıldı. Aynı aracın biçim biçim kopyası olan görsel
// çevirme sayfaları, üç biçimi de yapan Görsel Dönüştürücü'de birleşti (JPG → PNG tık aldığı için kaldı). Her adres
// kalıcı (301) olarak yanındaki sayfaya yönlenir. Bu listeden bir satırı silmek o sayfayı geri getirir (sayfa dosyası da
// git geçmişinden geri alınmalı).
export const KALDIRILAN_HESAP_SAYFALARI: Readonly<Record<string, string>> = {
  "/agirlik-karsilastirma": "/kategoriler/kutle",
  "/apgar-skoru-hesaplama": "/hesaplayicilar",
  "/mantolama-hesaplama": "/yalitim-amortisman-hesaplama",
  "/jpg-webp-cevirme": "/gorsel-donusturucu",
  "/png-jpg-cevirme": "/gorsel-donusturucu",
  "/png-webp-cevirme": "/gorsel-donusturucu",
  "/webp-jpg-cevirme": "/gorsel-donusturucu",
  "/webp-png-cevirme": "/gorsel-donusturucu",
};

export const hesapSayfasiKalkti = (path: string) => Object.hasOwn(KALDIRILAN_HESAP_SAYFALARI, path);
