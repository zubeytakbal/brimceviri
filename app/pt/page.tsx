import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import PortugueseHomeDirectory from "../components/PortugueseHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de unidades de medida",
  description:
    "Converta grátis e instantaneamente comprimento, massa, temperatura e outras unidades físicas. Mais de 12 categorias, com fórmulas precisas.",
  alternates: {
    canonical: "/pt",
    ...buildFullLanguageAlternates("/pt"),
  },
  openGraph: {
    title: "Conversor de unidades de medida",
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
