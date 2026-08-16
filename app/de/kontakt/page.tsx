import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

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
      ]}
      alternateLink={{
        href: "/en/contact",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
