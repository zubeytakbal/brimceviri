import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "A short privacy overview for calculation inputs and page usage on BirimCeviri.app.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      tr: "/gizlilik",
      en: "/en/privacy",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Privacy | ${SITE_NAME}`,
    description:
      "A short privacy overview for calculation inputs and page usage on BirimCeviri.app.",
    url: `${SITE_URL}/en/privacy`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishPrivacyPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Privacy" },
      ]}
      title="Privacy"
      description="This page summarizes the basic privacy approach for calculator inputs and page usage on the site."
      sections={[
        {
          heading: "Calculator inputs",
          content: (
            <>
              <p>
                Values entered into calculators are processed in the
                browser for the calculation flows available on this
                site.
              </p>
              <p>
                We do not claim server-side logging, advertising or
                analytics behavior that has not been verified in code.
              </p>
            </>
          ),
        },
        {
          heading: "Content and external links",
          content: (
            <>
              <p>
                Unit guides and technical pages are informational.
                External sites may operate under their own privacy
                practices.
              </p>
              <p>
                When you leave this site, review the target site&apos;s
                terms and privacy policy separately.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
