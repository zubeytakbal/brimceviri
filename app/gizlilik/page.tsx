import type { Metadata } from "next";
import { buildPrivacySections } from "../components/privacyPolicySections";
import { privacyPolicyCopy } from "../i18n/privacyPolicyCopy";
import StaticPageLayout from "../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Gizlilik",
  description:
    "BirimCeviri.app gizlilik politikası: hesaplama girdileri, tarayıcıda saklanan tercihler, Google Analytics, Google AdSense reklamları ve çerezler.",
  alternates: {
    canonical: "/gizlilik",
    languages: {
      tr: "/gizlilik",
      en: "/en/privacy",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Gizlilik | ${SITE_NAME}`,
    description:
      "BirimCeviri.app gizlilik politikası: hesaplama girdileri, tarayıcıda saklanan tercihler, Google Analytics, Google AdSense reklamları ve çerezler.",
    url: `${SITE_URL}/gizlilik`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Gizlilik" },
      ]}
      title="Gizlilik"
      description="Hangi bilgilerin işlendiğini, çerezleri ve reklam tercihlerinizi nasıl yönetebileceğinizi anlatır."
      sections={buildPrivacySections(privacyPolicyCopy.tr)}
      alternateLink={{
        href: "/en/privacy",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
