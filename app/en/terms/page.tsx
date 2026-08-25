import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Basic usage terms for the tools and technical content published on BirimCeviri.app.",
  alternates: {
    canonical: "/en/terms",
    languages: {
      tr: "/kullanim-kosullari",
      en: "/en/terms",
      "x-default": "/kullanim-kosullari",
    },
  },
  openGraph: {
    title: `Terms | ${SITE_NAME}`,
    description:
      "Basic usage terms for the tools and technical content published on BirimCeviri.app.",
    url: `${SITE_URL}/en/terms`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Terms | ${SITE_NAME}`,
    description:
      "Basic usage terms for the tools and technical content published on BirimCeviri.app.",
  },
};

export default function EnglishTermsPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Terms" },
      ]}
      title="Terms"
      description="The tools and content on this site are provided for information and technical reference under the following basic conditions."
      sections={[
        {
          heading: "Informational use",
          content: (
            <>
              <p>
                The converters, calculators and guide content on this
                site are intended for reference and preliminary review.
              </p>
              <p>
                Their output should not be treated as the sole basis for
                critical engineering, health or safety decisions.
              </p>
            </>
          ),
        },
        {
          heading: "Responsibility",
          content: (
            <>
              <p>
                Users remain responsible for obtaining independent
                verification, checking project standards and consulting
                qualified professionals when required.
              </p>
              <p>
                Real operating conditions may differ from simplified
                calculator inputs and assumptions.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/kullanim-kosullari",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
