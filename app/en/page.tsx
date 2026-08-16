import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";

const homeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");

export const metadata: Metadata = {
  title: "Find the unit conversion you need",
  description:
    "Browse live conversion pages by category, search by unit name or symbol and open the right calculator or unit guide without leaving the homepage.",

  alternates: {
    canonical: englishHomeUrl,
    languages: {
      tr: homeUrl,
      en: englishHomeUrl,
      de: germanHomeUrl,
      "x-default": homeUrl,
    },
  },

  openGraph: {
    title: "Find the unit conversion you need | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
    url: englishHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <HomeDirectory locale="en" />;
}
