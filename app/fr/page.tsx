import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import FrenchHomeDirectory from "../components/FrenchHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur d’unités et conversion de mesures",
  description:
    "Convertissez gratuitement et rapidement la longueur, la masse, la température et d’autres unités physiques. Treize catégories, avec des formules précises.",
  alternates: {
    canonical: "/fr",
    ...buildFullLanguageAlternates("/fr"),
  },
  openGraph: {
    title: "Convertisseur d’unités et conversion de mesures",
    description:
      "Convertissez gratuitement et rapidement la longueur, la masse, la température et d’autres unités physiques.",
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
