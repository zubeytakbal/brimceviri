import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "../../siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact details for general feedback, corrections and technical issues related to BirimCeviri.app.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      tr: "/iletisim",
      en: "/en/contact",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Contact details for general feedback, corrections and technical issues related to BirimCeviri.app.",
    url: `${SITE_URL}/en/contact`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Contact | ${SITE_NAME}`,
    description:
      "Contact details for general feedback, corrections and technical issues related to BirimCeviri.app.",
  },
};

export default function EnglishContactPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Contact" },
      ]}
      title="Contact"
      description="Use the address below for feedback, corrections and general communication."
      sections={[
        {
          heading: "Email",
          content: (
            <>
              <p>
                Contact:
                {" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
              <p>
                For technical bug reports, including the page URL and a
                sample input usually helps speed up review.
              </p>
            </>
          ),
        },
        {
          heading: "Scope",
          content: (
            <>
              <p>
                This contact channel is intended for content
                corrections, technical issues and general feedback.
              </p>
              <p>
                It is not a channel for formal engineering approval,
                consulting or urgent safety validation.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/iletisim",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
