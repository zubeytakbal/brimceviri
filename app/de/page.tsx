import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const turkishHomeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");
const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "Einheiten umrechnen – Einheitenrechner",
  description:
    "Durchsuchen Sie Umrechnungsseiten f\u00FCr L\u00E4nge, Masse und Druck auf Deutsch und \u00F6ffnen Sie die passende Umrechnung direkt.",
  alternates: {
    canonical: germanHomeUrl,
    ...buildFullLanguageAlternates("/de"),
  },
  openGraph: {
    title: "Einheiten umrechnen – Einheitenrechner | BirimCeviri.app",
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
