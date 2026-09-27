import type { Metadata } from "next";
import MoonPhasesPage from "../../components/moon/MoonPhasesPage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const title = "Moon Phases Today & Full Moon Calendar";
const description =
  "What phase is the moon today and when is the next full moon? Live moon view, illumination, this month's moon calendar and upcoming full and new moon times.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/moon-phases", ...buildLanguageAlternates({ tr: "/ay-evreleri", en: "/en/moon-phases" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/en/moon-phases"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishMoonPhasesRoute() {
  return <MoonPhasesPage lang="en" />;
}
