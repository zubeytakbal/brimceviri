import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
        {
          heading: "Nutzung des Angebots",
          content: (
            <p>
              Die Website ist kostenlos und ohne Registrierung nutzbar. Eingaben in
              den Rechnern werden im Browser verarbeitet. Automatisierte
              Massenabfragen, die den Betrieb stören, sind nicht gestattet.
            </p>
          ),
        },
        {
          heading: "Rechte an Inhalten",
          content: (
            <p>
              Texte, Tabellen und Rechner gehören zu {SITE_NAME}. Kurze Zitate mit
              Link auf die Quellseite sind willkommen; das vollständige Kopieren
              ganzer Seiten ist nicht gestattet.
            </p>
          ),
        },
        {
          heading: "Externe Links und Werbung",
          content: (
            <p>
              Seiten können Links zu externen Websites sowie Anzeigen von Google
              AdSense enthalten. Für Inhalte externer Websites übernehmen wir keine
              Verantwortung. Hinweise zu Cookies stehen in der{" "}
              <Link href="/de/datenschutz">Datenschutzerklärung</Link>.
            </p>
          ),
        },
        {
          heading: "Änderungen",
          content: (
            <p>
              Diese Bedingungen können mit der Weiterentwicklung der Website
              angepasst werden. Es gilt die jeweils auf dieser Seite
              veröffentlichte Fassung.
            </p>
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
