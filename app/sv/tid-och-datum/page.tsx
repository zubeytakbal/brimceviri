import type { Metadata } from "next";
import NordicTimeHubPage, { NORDIC_TIME_HUB_COPY, NORDIC_TIME_HUB_PATHS } from "../../components/timehub/NordicTimeHubPage";
import { timeHubAlternates } from "../../components/timehub/timeHubPaths";
import { NORDIC_TIME_UI } from "../../components/time/nordicTimeCopy";
import { buildSiteUrl } from "../../siteConfig";

// "I dag" och kommande dagar ändras dagligen; sidan byggs om varje natt.
export const revalidate = 21600;

const t = NORDIC_TIME_HUB_COPY.sv;
const path = NORDIC_TIME_HUB_PATHS.sv;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.description,
  alternates: { canonical: path, ...timeHubAlternates() },
  openGraph: { title: t.metaTitle, description: t.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI.sv.ogLocale, type: "website" },
};

export default function Route() {
  return <NordicTimeHubPage locale="sv" />;
}
