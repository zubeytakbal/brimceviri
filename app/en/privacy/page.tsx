import type { Metadata } from "next";
import { buildPrivacySections } from "../../components/privacyPolicySections";
import { privacyPolicyCopy } from "../../i18n/privacyPolicyCopy";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "BirimCeviri.app privacy policy: calculator inputs, preferences stored in your browser, Google Analytics, Google AdSense ads and cookies.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      tr: "/gizlilik",
      en: "/en/privacy",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Privacy | ${SITE_NAME}`,
    description:
      "BirimCeviri.app privacy policy: calculator inputs, preferences stored in your browser, Google Analytics, Google AdSense ads and cookies.",
    url: `${SITE_URL}/en/privacy`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Privacy | ${SITE_NAME}`,
    description:
      "BirimCeviri.app privacy policy: calculator inputs, preferences stored in your browser, Google Analytics, Google AdSense ads and cookies.",
  },
};

export default function EnglishPrivacyPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Privacy" },
      ]}
      title="Privacy"
      description="What information is processed, which cookies are used and how you can manage advertising preferences."
      sections={buildPrivacySections(privacyPolicyCopy.en)}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
