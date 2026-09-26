import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import Es419HomeDirectory from "../components/Es419HomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de unidades y medidas",
  description:
    "Convierte gratis longitud, masa, temperatura y otras unidades físicas. Incluye 13 categorías y 4 herramientas prácticas de conversión.",
  alternates: {
    canonical: "/es-419",
    ...buildFullLanguageAlternates("/es-419"),
  },
  openGraph: {
    title: "Conversor de unidades y medidas",
    description:
      "Convierte gratis longitud, masa, temperatura y otras unidades físicas con 13 categorías y 4 herramientas prácticas.",
    url: buildSiteUrl("/es-419"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default async function Es419HomePage() {
  const notifications = await getSiteNotifications("es-419");

  return <Es419HomeDirectory notifications={notifications} />;
}
