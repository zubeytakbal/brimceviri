import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import BengaliHomeDirectory from "../components/BengaliHomeDirectory";
import { getSiteNotifications } from "../converter/siteNotifications";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "আপনার প্রয়োজনীয় একক রূপান্তর খুঁজুন",
  description:
    "দৈর্ঘ্য, ভর, তাপমাত্রা এবং অন্যান্য ভৌত একক বিনামূল্যে ও দ্রুত রূপান্তর করুন। ১২+ বিভাগ, নির্ভুল সূত্রসহ।",
  alternates: {
    canonical: "/bn",
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "আপনার প্রয়োজনীয় একক রূপান্তর খুঁজুন",
    description:
      "দৈর্ঘ্য, ভর, তাপমাত্রা এবং অন্যান্য ভৌত একক বিনামূল্যে ও দ্রুত রূপান্তর করুন।",
    url: buildSiteUrl("/bn"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default async function BengaliHomePage() {
  const notifications = await getSiteNotifications("bn");

  return <BengaliHomeDirectory notifications={notifications} />;
}
