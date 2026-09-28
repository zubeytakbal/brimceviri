import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const germanHomeUrl = buildSiteUrl("/de");

export const metadata: Metadata = {
  title: "Einheitenumrechner und Online-Rechner",
  description:
    "Einheiten umrechnen (Länge, Gewicht, Temperatur, Druck und mehr), Prozent- und Dreisatzrechner, Feiertage, Kalenderwoche, Weltuhr und Euro-Währungsrechner – kostenlos und ohne Anmeldung.",
  alternates: {
    canonical: germanHomeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Einheitenumrechner und Online-Rechner | BirimCeviri.app",
    description:
      "Einheiten umrechnen, Prozent- und Dreisatzrechner, Feiertage, Kalenderwoche und Euro-Währungsrechner – kostenlos.",
    url: germanHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default async function GermanHomePage() {
  const notifications = await getSiteNotifications("de");
  return <HomeDirectory locale="de" notifications={notifications} />;
}
