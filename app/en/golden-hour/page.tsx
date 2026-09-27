import type { Metadata } from "next";
import GoldenHourPage from "../../components/sun/GoldenHourPage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const title = "Golden Hour Calculator: Golden & Blue Hour Times";
const description =
  "When is golden hour today? Morning and evening golden hour and blue hour for your location or any of 97 cities, with sunrise, sunset and a day-light timeline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/golden-hour", ...buildLanguageAlternates({ tr: "/altin-saat", en: "/en/golden-hour" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/en/golden-hour"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishGoldenHourRoute() {
  return <GoldenHourPage lang="en" />;
}
