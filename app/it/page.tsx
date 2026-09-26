import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import ItalianHomeDirectory from "../components/ItalianHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertitore di unità di misura",
  description:
    "Converti gratis e all'istante lunghezza, massa, temperatura e altre unità fisiche. Oltre 12 categorie, con formule precise.",
  alternates: {
    canonical: "/it",
    ...buildFullLanguageAlternates("/it"),
  },
  openGraph: {
    title: "Convertitore di unità di misura",
    description:
      "Converti gratis e all'istante lunghezza, massa, temperatura e altre unità fisiche.",
    url: buildSiteUrl("/it"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

export default async function ItalianHomePage() {
  const notifications = await getSiteNotifications("it");

  return <ItalianHomeDirectory notifications={notifications} />;
}
