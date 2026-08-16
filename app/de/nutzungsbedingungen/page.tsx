import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description:
    "Kurz gefasste Hinweise zur Nutzung der Inhalte, Rechner und Informationsseiten von BirimCeviri.app.",
  alternates: {
    canonical: germanStaticPaths.terms,
    languages: {
      tr: "/kullanim-kosullari",
      en: "/en/terms",
      de: germanStaticPaths.terms,
      "x-default": "/kullanim-kosullari",
    },
  },
  openGraph: {
    title: `Nutzungsbedingungen | ${SITE_NAME}`,
    description:
      "Hinweise zur Nutzung der Inhalte und Rechner von BirimCeviri.app.",
    url: `${SITE_URL}${germanStaticPaths.terms}`,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanTermsPage() {
  return (
    <StaticPageLayout
      locale="de"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/de", label: "Startseite" },
        { label: "Nutzungsbedingungen" },
      ]}
      title="Nutzungsbedingungen"
      description="Die Inhalte, Umrechnungen und Rechner auf BirimCeviri.app dienen der allgemeinen Information und technischen Orientierung."
      sections={[
        {
          heading: "Informationscharakter",
          content: (
            <>
              <p>
                Die bereitgestellten Inhalte unterstützen bei Umrechnungen,
                Vorabschätzungen und technischem Nachschlagen.
              </p>
              <p>
                Sie ersetzen keine projektspezifische Fachprüfung, keine Normen
                und keine qualifizierte Ingenieur- oder Sicherheitsfreigabe.
              </p>
            </>
          ),
        },
        {
          heading: "Eigenverantwortliche Prüfung",
          content: (
            <>
              <p>
                Prüfen Sie kritische Ergebnisse immer zusätzlich mit verlässlichen
                Fachquellen, Herstellerunterlagen, Normen oder professioneller
                Beurteilung.
              </p>
              <p>
                Dies gilt besonders für Anwendungen mit Auswirkungen auf Technik,
                Gesundheit, Betriebssicherheit oder Recht.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/terms",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
