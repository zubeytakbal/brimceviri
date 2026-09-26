import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import NorwegianHomeDirectory from "../components/NorwegianHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Enhetsomregner – omregn måleenheter",
  description:
    "Regn gratis og direkte om lengde, masse, temperatur og andre fysiske enheter. Over 12 kategorier, med noyaktige formler.",
  alternates: {
    canonical: "/no",
    ...buildFullLanguageAlternates("/no"),
  },
  openGraph: {
    title: "Enhetsomregner – omregn måleenheter",
    description:
      "Regn gratis og direkte om lengde, masse, temperatur og andre fysiske enheter.",
    url: buildSiteUrl("/no"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

export default async function NorwegianHomePage() {
  const notifications = await getSiteNotifications("no");

  return <NorwegianHomeDirectory notifications={notifications} />;
}
