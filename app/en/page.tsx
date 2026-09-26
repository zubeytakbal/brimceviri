import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const homeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");
const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "Unit Converter and Unit Conversions",
  description:
    "Browse live conversion pages by category, search by unit name or symbol and open the right calculator or unit guide without leaving the homepage.",

  alternates: {
    canonical: englishHomeUrl,
    ...buildFullLanguageAlternates("/en"),
  },

  openGraph: {
    title: "Unit Converter and Unit Conversions | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
    url: englishHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Converter and Unit Conversions | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
  },
};

export default async function EnglishHomePage() {
  const notifications = await getSiteNotifications("en");
  return <HomeDirectory locale="en" notifications={notifications} />;
}
