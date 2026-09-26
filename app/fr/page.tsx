import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import FrenchHomeDirectory from "../components/FrenchHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Trouvez la conversion d'unité dont vous avez besoin",
  description:
    "Convertissez gratuitement et rapidement la longueur, la masse, la température et d’autres unités physiques. Treize catégories, avec des formules précises.",
  alternates: {
    canonical: "/fr",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Trouvez la conversion d'unité dont vous avez besoin",
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
