import type { Metadata } from "next";
import ArabicHomeDirectory from "../components/ArabicHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

const turkishHomeUrl = buildSiteUrl("/");
const englishHomeUrl = buildSiteUrl("/en");
const germanHomeUrl = buildSiteUrl("/de");
const arabicHomeUrl = buildSiteUrl("/ar");

export const metadata: Metadata = {
  title: "اعثر على أداة التحويل المناسبة",
  description:
    "استعرض الأدوات والحاسبات المتاحة بالعربية وافتح الصفحة المناسبة مباشرة من القسم العربي.",
  alternates: {
    canonical: arabicHomeUrl,
    languages: {
      tr: turkishHomeUrl,
      en: englishHomeUrl,
      de: germanHomeUrl,
      ar: arabicHomeUrl,
      "x-default": turkishHomeUrl,
    },
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

export default function ArabicHomePage() {
  return <ArabicHomeDirectory />;
}
