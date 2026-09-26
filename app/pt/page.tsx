import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import PortugueseHomeDirectory from "../components/PortugueseHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Encontre a conversão de unidades que você precisa",
  description:
    "Converta grátis e instantaneamente comprimento, massa, temperatura e outras unidades físicas. Mais de 12 categorias, com fórmulas precisas.",
  alternates: {
    canonical: "/pt",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Encontre a conversão de unidades que você precisa",
    description:
      "Converta grátis e instantaneamente comprimento, massa, temperatura e outras unidades físicas.",
    url: buildSiteUrl("/pt"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function PortugueseHomePage() {
  const notifications = await getSiteNotifications("pt");

  return <PortugueseHomeDirectory notifications={notifications} />;
}
