import type { Metadata } from "next";
import ItalianHomeDirectory from "../components/ItalianHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Trova la conversione di unità di cui hai bisogno",
  description:
    "Converti gratis e all'istante lunghezza, massa, temperatura e altre unità fisiche. Oltre 12 categorie, con formule precise.",
  alternates: {
    canonical: "/it",
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
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Trova la conversione di unità di cui hai bisogno",
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
