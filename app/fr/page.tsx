import type { Metadata } from "next";
import FrenchHomeDirectory from "../components/FrenchHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur d'unites — Francais",
  description:
    "Convertissez gratuitement et rapidement la longueur, la masse, la temperature et d'autres unites physiques. Plus de 12 categories, avec des formules precises.",
  alternates: {
    canonical: "/fr",
    languages: {
      tr: "/",
      en: "/en",
      de: "/de",
      ar: "/ar",
      uz: "/uz",
      bn: "/bn",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Convertisseur d'unites — Francais",
    description:
      "Convertissez gratuitement et rapidement la longueur, la masse, la temperature et d'autres unites physiques.",
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
