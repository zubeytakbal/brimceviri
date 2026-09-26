import type { Metadata } from "next";
import SwedishHomeDirectory from "../components/SwedishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Hitta den enhetsomvandling du behöver",
  description:
    "Omvandla gratis och direkt längd, massa, temperatur och andra fysiska enheter. Över 12 kategorier, med exakta formler.",
  alternates: {
    canonical: "/sv",
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
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Hitta den enhetsomvandling du behöver",
    description:
      "Omvandla gratis och direkt längd, massa, temperatur och andra fysiska enheter.",
    url: buildSiteUrl("/sv"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

export default async function SwedishHomePage() {
  const notifications = await getSiteNotifications("sv");

  return <SwedishHomeDirectory notifications={notifications} />;
}
