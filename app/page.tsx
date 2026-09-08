import type { Metadata } from "next";
import HomeDirectory from "./components/HomeDirectory";
import { buildSiteUrl } from "./siteConfig";
import { getSiteNotifications } from "./converter/siteNotifications";

export const revalidate = 3600;

const homeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");
const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "Birim Çevirici — İhtiyacınız Olan Birim Dönüşümünü Bulun",
  description:
    "Uzunluk, kütle ve basınç birimlerini çevirin; kategori bazında tarayın, ilgili hesaplayıcıyı, birim rehberini ve bilgi sayfasını doğrudan açın.",
  alternates: {
    canonical: homeUrl,
    languages: {
      tr: homeUrl,
      en: englishHomeUrl,
      de: germanHomeUrl,
      ar: arabicHomeUrl,
      "x-default": homeUrl,
    },
  },
  openGraph: {
    title: "Birim Çevirici — İhtiyacınız Olan Birim Dönüşümünü Bulun | BirimCeviri.app",
    description:
      "Kategori kartları, popüler hesaplayıcılar ve birim rehberleriyle doğru dönüşüm sayfasına hızlıca ulaşın.",
    url: homeUrl,
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default async function Page() {
  const notifications = await getSiteNotifications();
  return <HomeDirectory locale="tr" notifications={notifications} />;
}
