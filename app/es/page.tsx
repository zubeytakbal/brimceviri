import type { Metadata } from "next";
import SpanishHomeDirectory from "../components/SpanishHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Convertidor de unidades — Español",
  description:
    "Convierte longitud, masa, temperatura y otras unidades físicas. 13 categorías principales, 4 herramientas de conversión y guías claras en español.",
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
      "es-419": "/es-419",
      pt: "/pt",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Convertidor de unidades — Español",
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
