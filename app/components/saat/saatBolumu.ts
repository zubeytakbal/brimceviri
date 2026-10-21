// "Saat" bölümü: sitenin içinde kendi menüsü, yazı tipleri ve düzeni olan ayrı görünümlü bölüm. Adresler
// değişmez; bu sayfalarda sitenin genel üst menüsü ve alt bilgisi yerine bölümün kendi kabuğu çizilir.

/** Bölümün kabuğunu kullanan Türkçe sayfalar: şehir saatleri, ay evreleri ve alarm. */
export function isSaatBolumu(pathname: string) {
  return /^\/dunya-saatleri\/[^/]+\/?$/.test(pathname) || /^\/(ay-evreleri|online-alarm-kur)\/?$/.test(pathname);
}

export const SAAT_MENUSU: Array<{ href: string; label: string }> = [
  { href: "/dunya-saatleri", label: "Dünya saatleri" },
  { href: "/saat-dilimi-cevirici", label: "Saat dilimi çevirici" },
  { href: "/online-saat", label: "Online saat" },
  { href: "/online-alarm-kur", label: "Alarm" },
  { href: "/uyku-hesaplama", label: "Uyku hesaplama" },
  { href: "/zamanlayici", label: "Zamanlayıcı" },
  { href: "/kronometre", label: "Kronometre" },
  { href: "/geri-sayim", label: "Geri sayım" },
  { href: "/takvim", label: "Takvim" },
  { href: "/kacinci-hafta", label: "Kaçıncı hafta" },
  { href: "/gunes-dogusu-ve-batisi", label: "Gün doğumu ve batımı" },
  { href: "/ay-evreleri", label: "Ay evreleri" },
  { href: "/unix-zaman-damgasi-cevirici", label: "Unix zaman damgası" },
];
