import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import NorwegianHomeDirectory from "../components/NorwegianHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Finn enhetsomregningen du trenger",
  description:
    "Regn gratis og direkte om lengde, masse, temperatur og andre fysiske enheter. Over 12 kategorier, med nøyaktige formler.",
  alternates: {
    canonical: "/no",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Finn enhetsomregningen du trenger",
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
