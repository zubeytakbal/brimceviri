import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import SpanishHomeDirectory from "../components/SpanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de unidades y medidas",
  description:
    "Convierte longitud, masa, temperatura y otras unidades físicas. 13 categorías principales, 4 herramientas de conversión y guías claras en español.",
  alternates: {
    canonical: "/es",
    ...buildFullLanguageAlternates("/es"),
  },
  openGraph: {
    title: "Conversor de unidades y medidas",
    description:
      "Convierte longitud, masa, temperatura y otras unidades físicas con guías claras en español.",
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
