import type { Metadata } from "next";
import BrueckentagePage from "../../components/de/BrueckentagePage";
import { planungsjahr } from "../../i18n/germanBrueckentage";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

// Ab September wird das Folgejahr vorausgewählt.
export const revalidate = 86400;

const path = "/de/brueckentage";
const title = "Brückentage-Rechner: Urlaubsplaner mit Feiertagen";
const description =
  "Urlaub optimal planen: Der Brückentage-Rechner verteilt Ihre Urlaubstage auf die Feiertage Ihres Bundeslands – auch für Teilzeit, mit Kalender-Export (.ics).";

export const metadata: Metadata = {
  title: seoTitle(title),
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function BrueckentageHub() {
  return <BrueckentagePage year={planungsjahr()} hub />;
}
