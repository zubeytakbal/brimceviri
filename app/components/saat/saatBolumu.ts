// "Saat" bölümü: sitenin içinde kendi menüsü, yazı tipleri ve düzeni olan ayrı görünümlü bölüm. Adresler
// değişmez; bu sayfalarda sitenin genel üst menüsü ve alt bilgisi yerine bölümün kendi üst menüsü ve alt bilgisi çizilir.

export type SaatGrubu = { baslik: string; linkler: Array<{ href: string; label: string }> };

/** Bölümün araçları, menüde ve alt bilgide bu gruplarla gösterilir. */
export const SAAT_GRUPLARI: SaatGrubu[] = [
  {
    baslik: "Saat",
    linkler: [
      { href: "/saat-dilimi-cevirici", label: "Saat dilimi çevirici" },
      { href: "/saat-hesaplama", label: "Saat hesaplama (iki saat arası, mesai)" },
      { href: "/yerel-saat-hesaplama", label: "Yerel saat farkı" },
    ],
  },
  {
    baslik: "Uyku",
    linkler: [
      { href: "/uyku-hesaplama", label: "Uyku hesaplama" },
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
      { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum gün hangi gün" },
      { href: "/yillik-izin-hesaplama", label: "Yıllık izin hesaplama" },
      { href: "/hicri-yas-hesaplama", label: "Hicri yaş hesaplama" },
      { href: "/kirk-mevlidi-hesaplama", label: "40 mevlidi ve 52. gece" },
    ],
  },
  {
    baslik: "Takvim çevirme",
    linkler: [
      { href: "/tarih-cevirici", label: "Hicri, Rumi, Miladi çevirici" },
    ],
  },
  {
    baslik: "Gökyüzü",
    linkler: [
    ],
  },
];

/** Düz liste (alt bilgi ve arama için). */
export const SAAT_MENUSU = SAAT_GRUPLARI.flatMap((g) => g.linkler);

const ARAC_YOLLARI = new Set(SAAT_MENUSU.map((l) => l.href));

const yol = (pathname: string) => (pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname);

/** Kendi tam kabuğunu (SaatKabugu) çizen sayfalar: uyku hesaplama ve saat hesaplama. */
export function isSaatBolumu(pathname: string) {
  return /^\/(uyku-hesaplama|saat-hesaplama)\/?$/.test(pathname);
}

/** Sitenin ortak araç düzenini kullanan, ama saat bölümünün üst menüsü ve alt bilgisiyle çizilen sayfalar (menüdeki araçlar). */
export function isSaatAraci(pathname: string) {
  const p = yol(pathname);
  return !isSaatBolumu(p) && ARAC_YOLLARI.has(p);
}
