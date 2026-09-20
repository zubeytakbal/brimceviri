import type { Metadata } from "next";
import Es419HomeDirectory from "../components/Es419HomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertidor de unidades — Espanol (Latinoamerica)",
  description:
    "Convierte gratis y al instante longitud, masa, temperatura y otras unidades fisicas. Mas de 12 categorias, con formulas precisas.",
  alternates: {
    canonical: "/es-419",
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
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Convertidor de unidades — Espanol (Latinoamerica)",
    description:
      "Convierte gratis y al instante longitud, masa, temperatura y otras unidades fisicas.",
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
