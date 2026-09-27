import type { Metadata } from "next";
import SleepGuide from "../../components/SleepGuide";
import { sleepGuideContent } from "../../i18n/sleepGuideContent";
import { sleepGuideAlternates } from "../../i18n/sleepGuidePaths";
import { buildSiteUrl } from "../../siteConfig";

const content = sleepGuideContent["it"];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: {
    canonical: content.path,
    ...sleepGuideAlternates(),
  },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: buildSiteUrl(content.path),
    siteName: "BirimCeviri.app",
    locale: content.ogLocale,
    type: "website",
  },
};

export default function SleepPageIT() {
  return <SleepGuide content={content} />;
}
