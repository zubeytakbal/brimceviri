import type { Metadata } from "next";
import { TimeZoneConverterHub } from "../../components/world/TimeZoneConverterPages";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const title = "Time Zone Converter & Meeting Planner";
const description =
  "Convert a time across several time zones at once — ET, PT, GMT, IST, CET and 97 cities. Daylight saving applied automatically; meeting planner finds shared hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/time-zone-converter", ...timeToolAlternates("timeZoneConverter") },
  openGraph: { title, description, url: buildSiteUrl("/en/time-zone-converter"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishTimeZoneConverterPage() {
  return <TimeZoneConverterHub lang="en" />;
}
