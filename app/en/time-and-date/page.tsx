import type { Metadata } from "next";
import EnTimeHubPage, { EN_TIME_HUB_PATH } from "../../components/timehub/EnTimeHubPage";
import { timeHubAlternates } from "../../components/timehub/timeHubPaths";
import { buildSiteUrl } from "../../siteConfig";

// "Today" and "Coming up" change daily; the site is rebuilt every night.
export const revalidate = 21600;

const title = "What Time Is It? Local Time, Date and Week Number";
const description =
  "Your local time live, today's date and week number, sunrise and sunset for 97 cities, the moon phase, the next US clock change and federal holiday, and every clock and calendar tool.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EN_TIME_HUB_PATH, ...timeHubAlternates() },
  openGraph: { title, description, url: buildSiteUrl(EN_TIME_HUB_PATH), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function TimeAndDateRoute() {
  return <EnTimeHubPage />;
}
