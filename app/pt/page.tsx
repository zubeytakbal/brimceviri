import type { Metadata } from "next";
import PortugueseHomeDirectory from "../components/PortugueseHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de unidades — Português",
  description:
    "Converta grátis e instantaneamente comprimento, massa, temperatura e outras unidades físicas. Mais de 12 categorias, com fórmulas precisas.",
  alternates: {
    canonical: "/pt",
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
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Conversor de unidades — Português",
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
