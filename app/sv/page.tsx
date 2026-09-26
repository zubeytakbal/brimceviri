import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import SwedishHomeDirectory from "../components/SwedishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Enhetsomvandlare – omvandla måttenheter",
  description:
    "Omvandla gratis och direkt langd, massa, temperatur och andra fysiska enheter. Over 12 kategorier, med exakta formler.",
  alternates: {
    canonical: "/sv",
    ...buildFullLanguageAlternates("/sv"),
  },
  openGraph: {
    title: "Enhetsomvandlare – omvandla måttenheter",
    description:
      "Omvandla gratis och direkt langd, massa, temperatur och andra fysiska enheter.",
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
