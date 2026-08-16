import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Kurzüberblick über Ziel, Umfang und technische Ausrichtung von BirimCeviri.app.",
  alternates: {
    canonical: germanStaticPaths.about,
    languages: {
      tr: "/hakkimizda",
      en: "/en/about",
      de: germanStaticPaths.about,
      "x-default": "/hakkimizda",
    },
  },
  openGraph: {
    title: `Über uns | ${SITE_NAME}`,
    description:
      "Kurzüberblick über Ziel, Umfang und technische Ausrichtung von BirimCeviri.app.",
    url: `${SITE_URL}${germanStaticPaths.about}`,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanAboutPage() {
  return (
    <StaticPageLayout
      locale="de"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/de", label: "Startseite" },
        { label: "Über uns" },
      ]}
      title="Über uns"
      description="BirimCeviri.app ist eine technische Plattform, die Einheitenumrechnungen, Ingenieurrechner und kompakte Einheitenleitfäden an einem Ort bündelt."
      sections={[
        {
          heading: "Ziel des Projekts",
          content: (
            <>
              <p>
                Ziel ist es, schnelle und verständliche Werkzeuge für alltägliche
                Umrechnungen ebenso wie für technische Vorprüfungen bereitzustellen.
              </p>
              <p>
                Die Seite versteht sich nicht nur als Konverter, sondern auch als
                kompakte Referenz mit Formeln, Rechnern und Einheitenwissen.
              </p>
            </>
          ),
        },
        {
          heading: "Thematischer Umfang",
          content: (
            <>
              <p>
                Aktuell liegt der Schwerpunkt vor allem auf Länge, Masse, Druck
                sowie ausgewählten ingenieurwissenschaftlichen Berechnungen.
              </p>
              <p>
                Weitere Einheitenleitfäden, Umrechnungspaare und technische
                Werkzeuge können schrittweise ergänzt werden.
              </p>
            </>
          ),
        },
        {
          heading: "Wichtiger Nutzungshinweis",
          content: (
            <>
              <p>
                Rechner und Informationsseiten dienen als Orientierung und erste
                technische Einordnung.
              </p>
              <p>
                Für kritische Entscheidungen in Technik, Gesundheit oder Sicherheit
                sollten Werte immer zusätzlich mit Normen, Fachquellen und
                professioneller Prüfung abgeglichen werden.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/about",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
