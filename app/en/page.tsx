import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";

export const metadata: Metadata = {
  title: "Find the unit conversion you need",
  description:
    "Browse live conversion pages by category, search by unit name or symbol and open the right calculator or unit guide without leaving the homepage.",

  alternates: {
    canonical: "https://birimceviri.app/en",
    languages: {
      tr: "https://birimceviri.app",
      en: "https://birimceviri.app/en",
      "x-default": "https://birimceviri.app",
    },
  },

  openGraph: {
    title: "Find the unit conversion you need | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
    url: "https://birimceviri.app/en",
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <HomeDirectory locale="en" />;
}
