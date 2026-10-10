import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import SpanishHomeDirectory from "../components/SpanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de Unidades Online: Longitud, Peso y Temperatura",
  description:
    "Conversor de unidades online y gratuito: convierte longitud, peso, temperatura, presión y otras unidades físicas con fórmulas y tablas claras en español.",
  alternates: {
    canonical: "/es",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Conversor de Unidades Online: Longitud, Peso y Temperatura",
    description:
      "Conversor de unidades gratuito: longitud, peso, temperatura y más, con fórmulas claras.",
    url: buildSiteUrl("/es"),
    siteName: "BirimCeviri.app",
    locale: "es_ES",
    type: "website",
  },
};

export default async function SpanishHomePage() {
  const notifications = await getSiteNotifications("es");

  return <SpanishHomeDirectory notifications={notifications} />;
}
