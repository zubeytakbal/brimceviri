import type { Metadata } from "next";
import DeTimeHubPage, { DE_TIME_HUB_PATH } from "../../components/timehub/DeTimeHubPage";
import { timeHubAlternates } from "../../components/timehub/timeHubPaths";
import { buildSiteUrl } from "../../siteConfig";

// "Heute" und "Demnächst" ändern sich täglich; die Seite wird jede Nacht neu gebaut.
export const revalidate = 21600;

const title = "Wie spät ist es? Uhrzeit in Deutschland, Datum und Kalenderwoche";
const description =
  "Aktuelle Uhrzeit in Deutschland live, heutiges Datum, Kalenderwoche, Sonnenaufgang und -untergang, Mondphase, nächster Feiertag und Zeitumstellung sowie alle Uhr- und Kalenderwerkzeuge.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: DE_TIME_HUB_PATH, ...timeHubAlternates() },
  openGraph: { title, description, url: buildSiteUrl(DE_TIME_HUB_PATH), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

export default function UhrzeitUndDatumRoute() {
  return <DeTimeHubPage />;
}
