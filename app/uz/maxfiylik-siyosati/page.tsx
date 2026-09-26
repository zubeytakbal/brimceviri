import type { Metadata } from "next";
import { buildPrivacySections } from "../../components/privacyPolicySections";
import { privacyPolicyCopy } from "../../i18n/privacyPolicyCopy";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Maxfiylik",
  description:
    "BirimCeviri.app maxfiylik siyosati: kalkulyator qiymatlari, brauzerda saqlanadigan sozlamalar, Google Analytics, Google AdSense reklamalari va cookie fayllari.",
  alternates: {
    canonical: "/uz/maxfiylik-siyosati",
    languages: {
      tr: "/gizlilik",
      "uz-UZ": "/uz/maxfiylik-siyosati",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Maxfiylik | ${SITE_NAME}`,
    description:
      "BirimCeviri.app maxfiylik siyosati: kalkulyator qiymatlari, brauzerda saqlanadigan sozlamalar, Google Analytics, Google AdSense reklamalari va cookie fayllari.",
    url: `${SITE_URL}/uz/maxfiylik-siyosati`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekPrivacyPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Maxfiylik" },
      ]}
      title="Maxfiylik"
      description="Qaysi ma'lumotlar qayta ishlanishi, cookie fayllari va reklama sozlamalarini qanday boshqarish haqida."
      sections={buildPrivacySections(privacyPolicyCopy.uz)}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
