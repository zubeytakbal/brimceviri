import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import { GermanCountdownHub } from "../../components/countdown/GermanCountdownPages";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 3600;

const title = "Countdown: Wie viele Tage bis Weihnachten & Co.?";
const description =
  "Live-Countdowns bis Weihnachten, Silvester, Ostern, Rosenmontag, Muttertag, Oktoberfest, 1. Advent und mehr. Dazu ein eigener Countdown für jedes Datum, per Link teilbar.";

export const metadata: Metadata = {
  title: seoTitle(title, "Countdown: Wie viele Tage noch?"),
  description,
  alternates: { canonical: "/de/countdown", ...timeToolAlternates("countdown") },
  openGraph: { title, description, url: buildSiteUrl("/de/countdown"), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

export default function GermanCountdownPage() {
  return <GermanCountdownHub />;
}
