import { buildHomeLanguageAlternates } from "./i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "./components/HomeDirectory";
import { buildSiteUrl } from "./siteConfig";
import { getSiteNotifications } from "./converter/siteNotifications";
import { getFxLatest } from "./converter/fx/fxData";
import { hizliCevirmeVerisi } from "./converter/hizliCevirmeVeri";
import { materialsDatabase } from "./converter/materialsDatabase";
import { countdownEvents, startMs, upcomingOccurrences } from "./converter/time/countdownEvents";
import { bodyWeights, MAIN_BODIES } from "./converter/planetWeights";
import { KATEGORI_ADI, takvimGunPath, yilEtkinlikleri } from "./converter/calendar/trTakvim";
import type { KartYaklasan } from "./components/ZamanKartlari";

// "Litre kaç kilo" kartı: sıvılar ve gıdalar, ada göre sıralı.
const KART_MALZEMELERI = materialsDatabase
  .filter((m) => m.category === "sivi" || m.category === "gida")
  .map((m) => ({ id: m.id, ad: m.nameTr, yogunluk: m.densityKgM3 }))
  .sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

// "Gezegenlerde kaç kilo" kartı: Dünya'ya göre yerçekimi oranları (Dünya hariç).
const KART_GEZEGENLERI = bodyWeights(1, MAIN_BODIES)
  .filter((b) => b.id !== "dunya")
  .map((b) => ({ id: b.id, ad: b.name, oran: b.ratio }));

export const revalidate = 3600;

const homeUrl = buildSiteUrl("/");

export const metadata: Metadata = {
  title: "Birim Çevirici: Birim Çevirme ve Hesaplama",
  description:
    "Metre, kilogram, litre, dönüm, bar ve santigrat dahil 38 kategoride birim çevirme (1 inç = 2,54 cm, 1 dönüm = 1.000 m²); mühendislik, takvim ve günlük hesaplayıcılar.",
  alternates: {
    canonical: homeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Birim Çevirici: Birim Çevirme ve Hesaplama | BirimCeviri.app",
    description:
      "Kategori kartları, popüler hesaplayıcılar ve birim rehberleriyle doğru dönüşüm sayfasına hızlıca ulaşın.",
    url: homeUrl,
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default async function Page() {
  const [notifications, fx] = await Promise.all([getSiteNotifications(), getFxLatest()]);
  // Zaman kartındaki geri sayımlar: her etkinliğin sıradaki iki tarihi (tarayıcı geçmiş olanı atlar).
  const now = new Date();
  const geriSayimlar = countdownEvents
    .filter((e) => e.lang === "tr")
    .map((e) => ({ slug: e.slug, ad: e.name, anlar: upcomingOccurrences(e, now, 2).map((o) => startMs(o, e.zone)) }))
    .filter((g) => g.anlar.length > 0);
  // "Yaklaşan günler" şeridi: takvimdeki sıradaki günler (site her gün derlenir; tarayıcı geçmiş olanları atlar).
  const trGece = (d: { year: number; month: number; day: number }) => Date.UTC(d.year, d.month - 1, d.day) - 3 * 3600000;
  const yil = new Date(now.getTime() + 3 * 3600000).getUTCFullYear();
  const yaklasan: KartYaklasan[] = [...yilEtkinlikleri(yil), ...yilEtkinlikleri(yil + 1)]
    .filter((t) => trGece(t.bitis ?? t.tarih) + 86400000 > now.getTime())
    .slice(0, 14)
    .map((t) => ({
      ad: t.not ? `${t.etkinlik.ad} (${t.not})` : t.etkinlik.ad,
      kategori: t.etkinlik.kategori,
      katAd: KATEGORI_ADI[t.etkinlik.kategori],
      bas: trGece(t.tarih),
      bit: trGece(t.bitis ?? t.tarih) + 86400000,
      href: t.etkinlik.geriSayim ? `/geri-sayim/${t.etkinlik.geriSayim}` : takvimGunPath(t.tarih),
      tatil: t.etkinlik.tatil !== "yok",
      tahmini: Boolean(t.tahmini),
    }));
  return <HomeDirectory locale="tr" notifications={notifications} hizli={hizliCevirmeVerisi(fx)} malzemeler={KART_MALZEMELERI} gezegenler={KART_GEZEGENLERI} geriSayimlar={geriSayimlar} yaklasan={yaklasan} olusturma={now.getTime()} />;
}
