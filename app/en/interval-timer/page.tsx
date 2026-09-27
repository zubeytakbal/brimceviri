import type { Metadata } from "next";
import { IntervalPage } from "../../components/time/FocusPages";
import { timeToolAlternates, timeToolPaths } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "Interval Timer for Tabata & HIIT Workouts";
const description = "Free interval timer for Tabata 20/10, HIIT 30/30 and 40/20, EMOM, boxing rounds or your own plan — voice cues, 3-second beeps, full screen.";
const path = timeToolPaths.interval.en!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("interval") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function IntervalRoute() {
  return <IntervalPage lang="en" />;
}
