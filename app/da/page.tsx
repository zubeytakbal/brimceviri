import type { Metadata } from "next";
import DanishHomeDirectory from "../components/DanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Find den enhedsomregning du har brug for",
  description:
    "Omregn gratis og direkte længde, masse, temperatur og andre fysiske enheder. Over 12 kategorier, med nøjagtige formler.",
  alternates: {
    canonical: "/da",
    languages: {
      tr: "/",
      en: "/en",
      de: "/de",
      ar: "/ar",
      uz: "/uz",
      bn: "/bn",
      fr: "/fr",
      es: "/es",
      "es-419": "/es-419",
      pt: "/pt",
      it: "/it",
      nl: "/nl",
      sv: "/sv",
      no: "/no",
      da: "/da",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Find den enhedsomregning du har brug for",
    description:
      "Omregn gratis og direkte længde, masse, temperatur og andre fysiske enheder.",
    url: buildSiteUrl("/da"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

export default async function DanishHomePage() {
  const notifications = await getSiteNotifications("da");

  return <DanishHomeDirectory notifications={notifications} />;
}
