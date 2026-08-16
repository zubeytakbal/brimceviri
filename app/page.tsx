import type { Metadata } from "next";
import HomeDirectory from "./components/HomeDirectory";
import { buildSiteUrl } from "./siteConfig";

const homeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");

export const metadata: Metadata = {
  title: "İhtiyacınız olan birim dönüşümünü bulun",
  description:
    "Uzunluk, kütle ve basınç dönüşümlerini kategori bazında tarayın; ilgili hesaplayıcıyı, birim rehberini ve bilgi sayfasını doğrudan açın.",
  alternates: {
    canonical: homeUrl,
    languages: {
      tr: homeUrl,
      en: englishHomeUrl,
      de: germanHomeUrl,
      "x-default": homeUrl,
    },
  },
  openGraph: {
    title: "İhtiyacınız olan birim dönüşümünü bulun | BirimCeviri.app",
    description:
      "Kategori kartları, popüler hesaplayıcılar ve birim rehberleriyle doğru dönüşüm sayfasına hızlıca ulaşın.",
    url: homeUrl,
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function Page() {
  return <HomeDirectory locale="tr" />;
}
