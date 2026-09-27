import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import WorldClockHub from "../../components/world/WorldClockHub";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const title = "World Clock: Live Time in 97 Cities";
const description =
  "Live local time in 97 cities on one screen — New York, London, Dubai, Tokyo and more. Time differences, UTC offsets and daylight saving dates; search and save favorites.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("world-clock"),
  appleWebApp: { capable: true, title: findInstallableApp("world-clock")!.shortName },
  alternates: { canonical: "/en/world-clock", ...timeToolAlternates("worldClock") },
  openGraph: { title, description, url: buildSiteUrl("/en/world-clock"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishWorldClockPage() {
  return <WorldClockHub lang="en" />;
}
