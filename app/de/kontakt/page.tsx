import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";
import { germanContactParagraphs } from "../../converter/germanPageFacts";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktinformationen für Rückfragen, Korrekturhinweise und allgemeine Anmerkungen zu BirimCeviri.app.",
  alternates: {
    canonical: germanStaticPaths.contact,
    languages: {
      tr: "/iletisim",
      en: "/en/contact",
      de: germanStaticPaths.contact,
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    title: `Kontakt | ${SITE_NAME}`,
    description:
      "Kontaktinformationen für Rückfragen und Hinweise zu BirimCeviri.app.",
    url: `${SITE_URL}${germanStaticPaths.contact}`,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanContactPage() {
  const examples = germanContactParagraphs();
  return (
    <StaticPageLayout
      locale="de"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/de", label: "Startseite" },
        { label: "Kontakt" },
      ]}
      title="Kontakt"
      description="Für Hinweise zu Inhalten, Korrekturen oder allgemeine Rückfragen können Sie BirimCeviri.app direkt per E-Mail erreichen."
      sections={[
        {
          heading: "E-Mail",
          content: (
            <p>
              Kontaktadresse: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
            </p>
          ),
        },
        {
          heading: "Wofür eignet sich der Kontakt?",
          content: (
            <>
              <p>
                Sie können sich bei fachlichen Korrekturen, Hinweisen auf fehlerhafte
                Umrechnungen, defekten Links oder allgemeinen Fragen zum Projekt melden.
              </p>
              <p>
                Wenn möglich, geben Sie die betroffene Seite oder Formel direkt an,
                damit Rückfragen schneller geprüft werden können.
              </p>
            </>
          ),
        },
        {
          heading: "Bei einer Fehlermeldung",
          content: (
            <ul>
              <li>die vollständige Adresse der Seite,</li>
              <li>die eingegebenen Werte und das angezeigte Ergebnis,</li>
              <li>das erwartete Ergebnis und, wenn möglich, dessen Quelle,</li>
              <li>Browser und Gerät, falls das Problem technisch wirkt.</li>
            </ul>
          ),
        },
        {
          heading: "Weitere Anliegen",
          content: (
            <p>
              Vorschläge für fehlende Einheiten oder Rechner, Hinweise auf
              Übersetzungsfehler sowie Anfragen zur Einbindung der Rechner auf
              anderen Websites können ebenfalls an diese Adresse gesendet werden.
            </p>
          ),
        },
        {
          heading: "So prüfen Sie eine Umrechnung",
          content: (
            <>
              {examples.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </>
          ),
        },
        {
          heading: "Datenschutz",
          content: (
            <p>
              Ihre E-Mail-Adresse wird nur zur Beantwortung Ihrer Nachricht
              verwendet und nicht an Dritte weitergegeben. Einzelheiten finden Sie
              in der <Link href="/de/datenschutz">Datenschutzerklärung</Link>.
            </p>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/contact",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
