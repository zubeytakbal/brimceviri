import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "About",
  description:
    "A short overview of the purpose, scope and technical direction of BirimCeviri.app.",
  alternates: {
    canonical: "/en/about",
    languages: {
      tr: "/hakkimizda",
      en: "/en/about",
      "x-default": "/hakkimizda",
    },
  },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "A short overview of the purpose, scope and technical direction of BirimCeviri.app.",
    url: `${SITE_URL}/en/about`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `About | ${SITE_NAME}`,
    description:
      "A short overview of the purpose, scope and technical direction of BirimCeviri.app.",
  },
};

export default function EnglishAboutPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "About" },
      ]}
      title="About"
      description="BirimCeviri.app is a technical platform that brings together unit conversions, engineering calculators and scientific unit guides in one place."
      sections={[
        {
          heading: "Purpose",
          content: (
            <>
              <p>
                The goal is to provide clear, fast tools that support
                both everyday conversion needs and technical reference
                work.
              </p>
              <p>
                The site is designed not only as a converter, but also
                as a compact reference layer with formulas, calculators
                and unit explanations.
              </p>
            </>
          ),
        },
        {
          heading: "Scope",
          content: (
            <>
              <p>
                Current content focuses especially on length, mass,
                pressure and engineering-oriented calculations.
              </p>
              <p>
                Additional unit guides, conversion pairs and technical
                calculators may be added over time.
              </p>
            </>
          ),
        },
        {
          heading: "Important use note",
          content: (
            <>
              <p>
                The calculators and guide pages are provided for
                information and preliminary reference.
              </p>
              <p>
                For critical engineering, health or safety decisions,
                verify values with project standards, professional review
                and authoritative sources.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/hakkimizda",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
