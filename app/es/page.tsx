import type { Metadata } from "next";
import SpanishHomeDirectory from "../components/SpanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertidor de unidades — Espanol",
  description:
    "Convierte gratis y al instante longitud, masa, temperatura y otras unidades fisicas. Mas de 12 categorias, con formulas precisas.",
  alternates: {
    canonical: "/es",
    languages: {
      tr: "/",
      en: "/en",
      de: "/de",
      ar: "/ar",
      uz: "/uz",
      bn: "/bn",
      fr: "/fr",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Convertidor de unidades — Espanol",
    description:
      "Convierte gratis y al instante longitud, masa, temperatura y otras unidades fisicas.",
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
