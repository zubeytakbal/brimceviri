import { buildHomeLanguageAlternates } from "./i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "./components/HomeDirectory";
import { buildSiteUrl } from "./siteConfig";
import { getSiteNotifications } from "./converter/siteNotifications";
import { getFxLatest } from "./converter/fx/fxData";
import { hizliCevirmeVerisi } from "./converter/hizliCevirmeVeri";
import { materialsDatabase } from "./converter/materialsDatabase";

// "Litre kaç kilo" kartı: sıvılar ve gıdalar, ada göre sıralı.
const KART_MALZEMELERI = materialsDatabase
  .filter((m) => m.category === "sivi" || m.category === "gida")
  .map((m) => ({ id: m.id, ad: m.nameTr, yogunluk: m.densityKgM3 }))
  .sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

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
  return <HomeDirectory locale="tr" notifications={notifications} hizli={hizliCevirmeVerisi(fx)} malzemeler={KART_MALZEMELERI} />;
}
