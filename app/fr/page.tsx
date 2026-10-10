import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import FrenchHomeDirectory from "../components/FrenchHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur d'Unités en Ligne : Longueur, Poids, Température",
  description:
    "Convertisseur d’unités en ligne et gratuit : longueur, poids, température, pression et autres unités physiques, avec formules et tableaux précis.",
  alternates: {
    canonical: "/fr",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Convertisseur d'Unités en Ligne : Longueur, Poids, Température",
    description:
      "Convertisseur d’unités gratuit : longueur, poids, température et plus, avec formules précises.",
    url: buildSiteUrl("/fr"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function FrenchHomePage() {
  const notifications = await getSiteNotifications("fr");

  return <FrenchHomeDirectory notifications={notifications} />;
}
