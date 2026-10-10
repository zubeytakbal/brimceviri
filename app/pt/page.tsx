import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import PortugueseHomeDirectory from "../components/PortugueseHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de Unidades Online: Comprimento, Peso e Temperatura",
  description:
    "Conversor de unidades online e grátis: comprimento, peso, temperatura, pressão e outras unidades físicas, com fórmulas e tabelas precisas.",
  alternates: {
    canonical: "/pt",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Conversor de Unidades Online: Comprimento, Peso e Temperatura",
    description:
      "Conversor de unidades grátis: comprimento, peso, temperatura e mais, com fórmulas precisas.",
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
