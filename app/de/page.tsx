import type { Metadata } from "next";
import GermanHomeDirectory from "../components/GermanHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

const turkishHomeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");

export const metadata: Metadata = {
  title: "Die passende Umrechnung finden",
  description:
    "Durchsuchen Sie Umrechnungsseiten f\u00FCr L\u00E4nge, Masse und Druck auf Deutsch und \u00F6ffnen Sie die passende Umrechnung direkt.",
  alternates: {
    canonical: germanHomeUrl,
    languages: {
      tr: turkishHomeUrl,
      en: englishHomeUrl,
      de: germanHomeUrl,
      "x-default": turkishHomeUrl,
    },
  },
  openGraph: {
    title: "Die passende Umrechnung finden | BirimCeviri.app",
    description:
      "Suchen Sie deutsche Umrechnungsseiten f\u00FCr L\u00E4nge, Masse und Druck und \u00F6ffnen Sie die passende Seite direkt.",
    url: germanHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanHomePage() {
  return <GermanHomeDirectory />;
}
