import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import ArabicHomeDirectory from "../components/ArabicHomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const turkishHomeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");
const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "محول الوحدات وتحويل وحدات القياس",
  description:
    "استعرض الأدوات والحاسبات المتاحة بالعربية وافتح الصفحة المناسبة مباشرة من القسم العربي.",
  alternates: {
    canonical: arabicHomeUrl,
    ...buildFullLanguageAlternates("/ar"),
  },
  openGraph: {
    title: "محول الوحدات وتحويل وحدات القياس | BirimCeviri.app",
    description:
      "ابدأ من الصفحة العربية الرئيسية للوصول إلى الأدوات المعربة الجاهزة حاليا.",
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
