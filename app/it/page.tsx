import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import ItalianHomeDirectory from "../components/ItalianHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertitore di Unità Online: Lunghezza, Peso e Temperatura",
  description:
    "Convertitore di unità online e gratuito: lunghezza, peso, temperatura, pressione e altre unità fisiche, con formule e tabelle precise.",
  alternates: {
    canonical: "/it",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Convertitore di Unità Online: Lunghezza, Peso e Temperatura",
    description:
      "Convertitore di unità gratuito: lunghezza, peso, temperatura e altro, con formule precise.",
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
