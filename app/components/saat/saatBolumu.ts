// "Saat" bölümü: sitenin içinde kendi menüsü, yazı tipleri ve düzeni olan ayrı görünümlü bölüm. Adresler
// değişmez; bu sayfalarda sitenin genel üst menüsü ve alt bilgisi yerine bölümün kendi üst menüsü ve alt bilgisi çizilir.

export type SaatGrubu = { baslik: string; linkler: Array<{ href: string; label: string }> };

/** Bölümün araçları, menüde ve alt bilgide bu gruplarla gösterilir. */
export const SAAT_GRUPLARI: SaatGrubu[] = [
  {
    baslik: "Saat",
    linkler: [
      { href: "/saat-ve-tarih", label: "Saat ve tarih" },
      { href: "/dunya-saatleri", label: "Dünya saatleri" },
      { href: "/online-saat", label: "Online saat" },
      { href: "/saat-dilimi-cevirici", label: "Saat dilimi çevirici" },
      { href: "/yaz-saati", label: "Yaz saati (saatler ne zaman değişiyor)" },
      { href: "/saat-hesaplama", label: "Saat hesaplama (iki saat arası, mesai)" },
      { href: "/yerel-saat-hesaplama", label: "Yerel saat farkı" },
      { href: "/ezani-saat-cevirme", label: "Ezani saat çevirme" },
      { href: "/unix-zaman-damgasi-cevirici", label: "Unix zaman damgası" },
    ],
  },
  {
    baslik: "Zamanlayıcılar",
    linkler: [
      { href: "/online-alarm-kur", label: "Alarm kur" },
      { href: "/uyku-hesaplama", label: "Uyku hesaplama" },
      { href: "/zamanlayici", label: "Zamanlayıcı" },
      { href: "/kronometre", label: "Kronometre" },
      { href: "/pomodoro", label: "Pomodoro" },
      { href: "/tabata-zamanlayici", label: "Tabata / HIIT" },
    ],
  },
  {
    baslik: "Tarih hesapları",
    linkler: [
      { href: "/yas-hesaplama", label: "Yaş hesaplama" },
      { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki tarih arası gün" },
      { href: "/tarihe-gun-ekleme", label: "Tarihe gün ekleme" },
      { href: "/is-gunu-hesaplama", label: "İş günü hesaplama" },
      { href: "/kacinci-hafta", label: "Kaçıncı hafta" },
      { href: "/hangi-gun", label: "Tarih hangi gün?" },
      { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum gün hangi gün" },
      { href: "/yillik-izin-hesaplama", label: "Yıllık izin hesaplama" },
      { href: "/hicri-yas-hesaplama", label: "Hicri yaş hesaplama" },
      { href: "/kirk-mevlidi-hesaplama", label: "40 mevlidi ve 52. gece" },
    ],
  },
  {
    baslik: "Takvim ve geri sayım",
    linkler: [
      { href: "/geri-sayim", label: "Geri sayım (kaç gün kaldı)" },
      { href: "/takvim", label: "Türkiye takvimi" },
      { href: "/resmi-tatiller", label: "Resmî tatiller" },
      { href: "/okul-takvimi", label: "Okul takvimi" },
      { href: "/ozel-gunler", label: "Özel günler" },
      { href: "/firtina-takvimi", label: "Fırtına takvimi" },
      { href: "/hicri-takvim", label: "Hicri takvim" },
      { href: "/tarih-cevirici", label: "Hicri, Rumi, Miladi çevirici" },
      { href: "/paskalya-ne-zaman", label: "Paskalya ne zaman?" },
      { href: "/kutsal-kitap-okuma-plani", label: "Kutsal Kitap okuma planı" },
    ],
  },
  {
    baslik: "Gökyüzü",
    linkler: [
      { href: "/ay-evreleri", label: "Ay evreleri" },
      { href: "/gunes-dogusu-ve-batisi", label: "Gün doğumu ve batımı" },
      { href: "/altin-saat", label: "Altın saat" },
      { href: "/gokyuzu-olaylari-takvimi", label: "Gökyüzü olayları" },
      { href: "/bu-gece-gezegenler", label: "Bu gece gezegenler" },
      { href: "/ay-gozlem-cizelgesi", label: "Ay gözlem çizelgesi" },
      { href: "/en-uzun-gun-ve-en-kisa-gun", label: "En uzun ve en kısa gün" },
      { href: "/gunes-acisi-ve-golge-boyu-hesaplama", label: "Güneş açısı ve gölge boyu" },
      { href: "/gezegenlerde-yas-hesaplama", label: "Gezegenlerde yaş" },
    ],
  },
];

/** Düz liste (alt bilgi ve arama için). */
export const SAAT_MENUSU = SAAT_GRUPLARI.flatMap((g) => g.linkler);

const ARAC_YOLLARI = new Set(SAAT_MENUSU.map((l) => l.href));

const yol = (pathname: string) => (pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname);

/** Kendi tam kabuğunu (SaatKabugu) çizen sayfalar: şehir ve ülke saatleri, ay evreleri, alarm, uyku hesaplama,
 * yaz saati ve etkinlik geri sayımları. */
export function isSaatBolumu(pathname: string) {
  return /^\/(dunya-saatleri|geri-sayim)\/[^/]+\/?$/.test(pathname) || /^\/(ay-evreleri|online-alarm-kur|uyku-hesaplama|yaz-saati|saat-hesaplama|hangi-gun)\/?$/.test(pathname);
}

/** Sitenin ortak araç düzenini kullanan, ama saat bölümünün üst menüsü ve alt bilgisiyle çizilen sayfalar: menüdeki
 * araçlar ile takvimin yıl, ay ve gün sayfaları, tek tek özel gün sayfaları, yıllara göre resmî tatiller ve hazır
 * zamanlayıcı süreleri ile alarm saatleri. */
export function isSaatAraci(pathname: string) {
  const p = yol(pathname);
  return !isSaatBolumu(p) && (ARAC_YOLLARI.has(p) || /^\/(takvim|ozel-gunler|resmi-tatiller|zamanlayici|online-alarm-kur)(\/[^/]+){1,3}$/.test(p));
}
