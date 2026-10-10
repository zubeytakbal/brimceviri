import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import ArabicHomeDirectory from "../components/ArabicHomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "تحويل الوحدات أونلاين: الطول والوزن ودرجة الحرارة",
  description:
    "تحويل الوحدات مجانًا وبالعربية: الطول والوزن ودرجة الحرارة والضغط، مع حاسبات للبناء والصحة والزكاة والتقويم الهجري.",
  alternates: {
    canonical: arabicHomeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "تحويل الوحدات أونلاين: الطول والوزن ودرجة الحرارة | BirimCeviri.app",
    description:
      "تحويل الوحدات مجانًا بالعربية مع حاسبات عملية وشرح للمعادلات.",
    url: arabicHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "ar_AR",
    type: "website",
  },
};

export default async function ArabicHomePage() {
  const notifications = await getSiteNotifications("ar");
  return <ArabicHomeDirectory notifications={notifications} />;
}
