import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import DanishHomeDirectory from "../components/DanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Enhedsomregner – omregn måleenheder",
  description:
    "Omregn gratis og direkte laengde, masse, temperatur og andre fysiske enheder. Over 12 kategorier, med noejagtige formler.",
  alternates: {
    canonical: "/da",
    ...buildFullLanguageAlternates("/da"),
  },
  openGraph: {
    title: "Enhedsomregner – omregn måleenheder",
    description:
      "Omregn gratis og direkte laengde, masse, temperatur og andre fysiske enheder.",
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
