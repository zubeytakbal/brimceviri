import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Kurzüberblick darüber, wie BirimCeviri.app Eingaben verarbeitet und welche Datenschutzgrundsätze für die Website gelten.",
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
      "Datenschutzhinweise für BirimCeviri.app.",
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
      description="Diese Kurzfassung erklärt, wie BirimCeviri.app mit Eingaben und allgemeinen Website-Daten umgeht."
      sections={[
        {
          heading: "Rechner-Eingaben",
          content: (
            <>
              <p>
                Berechnungen auf der Website werden in der Regel direkt im Browser
                ausgeführt, damit Werte sofort verarbeitet werden können.
              </p>
              <p>
                Eingegebene Zahlen dienen ausschließlich dem jeweiligen
                Rechenablauf und sind nicht als persönliche Beratung zu verstehen.
              </p>
            </>
          ),
        },
        {
          heading: "Allgemeine Nutzung der Website",
          content: (
            <>
              <p>
                Wie bei vielen Websites können beim Aufruf technische
                Verbindungsdaten an Server oder Hosting-Infrastruktur übermittelt
                werden, etwa zur Auslieferung der Seite und zur Stabilität.
              </p>
              <p>
                Prüfen Sie bei produktiver Nutzung zusätzlich die jeweils
                eingesetzte Hosting- und Analyseumgebung, falls darüber separate
                Datenschutzanforderungen gelten.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/privacy",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
