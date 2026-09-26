import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const germanHomeUrl = buildSiteUrl("/de");

export const metadata: Metadata = {
  title: "Die passende Umrechnung finden",
  description:
    "Durchsuchen Sie Umrechnungsseiten f\u00FCr L\u00E4nge, Masse und Druck auf Deutsch und \u00F6ffnen Sie die passende Umrechnung direkt.",
  alternates: {
    canonical: germanHomeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Die passende Umrechnung finden | BirimCeviri.app",
    description:
      "Suchen Sie deutsche Umrechnungsseiten f\u00FCr L\u00E4nge, Masse und Druck und \u00F6ffnen Sie die passende Seite direkt.",
    url: germanHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default async function GermanHomePage() {
  const notifications = await getSiteNotifications("de");
  return <HomeDirectory locale="de" notifications={notifications} />;
}
