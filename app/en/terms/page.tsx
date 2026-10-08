import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
        {
          heading: "Use of the service",
          content: (
            <>
              <p>
                The site is free to use and does not require registration. Values
                you type into calculators are processed in your browser.
              </p>
              <p>
                Automated mass requests that overload the site, or attempts to
                disrupt its operation, are not permitted.
              </p>
            </>
          ),
        },
        {
          heading: "Content rights and embeddable tools",
          content: (
            <p>
              Texts, tables and tool designs on the site belong to {SITE_NAME}.
              Short quotations with a link to the source page are welcome; copying
              whole pages is not permitted. Tools offered with an embed code may be
              used on other sites as provided.
            </p>
          ),
        },
        {
          heading: "External links and advertising",
          content: (
            <p>
              Pages may contain links to external sites and advertisements served
              by Google AdSense. We are not responsible for the content of external
              sites. Details about cookies are in the{" "}
              <Link href="/en/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: "Changes",
          content: (
            <p>
              These terms may be updated as the site develops. The current version
              is always published on this page.
            </p>
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
