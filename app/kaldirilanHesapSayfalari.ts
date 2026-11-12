// 25 Ekim 2026: Hesaplamalar bölümünde en az 7 haftalık, kısa (350 kelimeden az) ve Search Console'un son 3 ayında
// (24 Temmuz – 24 Ekim 2026) 60'tan az gösterim alan sayfalar kaldırıldı. Aynı aracın biçim biçim kopyası olan görsel
// çevirme sayfaları, üç biçimi de yapan Görsel Dönüştürücü'de birleşti (JPG → PNG tık aldığı için kaldı). Her adres
// kalıcı (301) olarak yanındaki sayfaya yönlenir. Bu listeden bir satırı silmek o sayfayı geri getirir (sayfa dosyası da
// git geçmişinden geri alınmalı).
export const KALDIRILAN_HESAP_SAYFALARI: Readonly<Record<string, string>> = {
  "/agirlik-karsilastirma": "/kategoriler/kutle",
  "/apgar-skoru-hesaplama": "/hesaplayicilar",
  "/mantolama-hesaplama": "/u-degeri-hesaplama",
  // 12 Kasım 2026: Search Console'un 10 Ağustos – 9 Kasım 2026 dökümünde ilk 1000 sayfaya girmeyen (3'ten az tık), en az
  // 6 haftalık araçlar kaldırıldı. Birim dönüşümü sayfaları bu kurala dahil değil.
  "/bmi-hesaplama": "/hesaplayicilar/saglik",
  "/ideal-kilo-hesaplama": "/hesaplayicilar/saglik",
  "/gebelik-haftasi-hesaplama": "/hesaplayicilar/saglik",
  "/kdv-hesaplama": "/hesaplayicilar/finans",
  "/brutten-nete-maas-hesaplama": "/hesaplayicilar/finans",
  "/kidem-tazminati-hesaplama": "/yillik-izin-hesaplama",
  "/tugla-hesaplama": "/hesaplayicilar/insaat",
  "/klima-btu-hesaplama": "/kombi-kac-kw-hesaplama",
  "/cbm-hesaplama": "/hacim",
  "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama": "/muhendislik-hesaplayicilari/elektrik-hesaplari",
  "/yuzuk-olcusu-cevirici": "/beden-olcusu-cevirici",
  "/has-hesaplama": "/altin-hesaplama",
  "/sayi-tabani-cevirici": "/hesaplayicilar/matematik",
  "/bilim-hesaplayicilari/matematik/karekok-hesaplama": "/hesaplayicilar/matematik",
  "/bilim-hesaplayicilari/matematik/ortalama-hesaplama": "/hesaplayicilar/matematik",
  "/bilim-hesaplayicilari/matematik/yuzde-hesaplama": "/hesaplayicilar/matematik",
};

export const hesapSayfasiKalkti = (path: string) => Object.hasOwn(KALDIRILAN_HESAP_SAYFALARI, path);
