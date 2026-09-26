import type { Metadata } from "next";
import { buildPrivacySections } from "../../components/privacyPolicySections";
import { privacyPolicyCopy } from "../../i18n/privacyPolicyCopy";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von BirimCeviri.app: Eingaben in Rechnern, im Browser gespeicherte Einstellungen, Google Analytics, Google AdSense und Cookies.",
  alternates: {
    canonical: germanStaticPaths.privacy,
    languages: {
      tr: "/gizlilik",
      en: "/en/privacy",
      de: germanStaticPaths.privacy,
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Datenschutz | ${SITE_NAME}`,
    description:
      "Datenschutzerklärung von BirimCeviri.app: Eingaben in Rechnern, im Browser gespeicherte Einstellungen, Google Analytics, Google AdSense und Cookies.",
    url: `${SITE_URL}${germanStaticPaths.privacy}`,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanPrivacyPage() {
  return (
    <StaticPageLayout
      locale="de"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/de", label: "Startseite" },
        { label: "Datenschutz" },
      ]}
      title="Datenschutz"
      description="Welche Informationen verarbeitet werden, welche Cookies zum Einsatz kommen und wie Sie Ihre Werbeeinstellungen verwalten."
      sections={buildPrivacySections(privacyPolicyCopy.de)}
      alternateLink={{
        href: "/en/privacy",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
