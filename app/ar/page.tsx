import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import ArabicHomeDirectory from "../components/ArabicHomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "اعثر على أداة التحويل المناسبة",
  description:
    "استعرض الأدوات والحاسبات المتاحة بالعربية وافتح الصفحة المناسبة مباشرة من القسم العربي.",
  alternates: {
    canonical: arabicHomeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "اعثر على أداة التحويل المناسبة | BirimCeviri.app",
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
