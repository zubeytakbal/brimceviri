import type { Metadata } from "next";
import CountdownHub from "../../components/countdown/CountdownHub";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 3600;

const title = "Countdown: How Many Days Until Christmas & More";
const description =
  "Live countdowns to Christmas, New Year, Halloween, Thanksgiving, Easter and more. Create your own countdown for any date and share it with a link.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/countdown", ...timeToolAlternates("countdown") },
  openGraph: { title, description, url: buildSiteUrl("/en/countdown"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishCountdownPage() {
  return <CountdownHub lang="en" />;
}
