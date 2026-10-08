import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
        {
          heading: "What you can write to us about",
          content: (
            <>
              <p>
                Typical messages include a conversion factor that looks wrong, a
                calculator that returns an unexpected result, a broken link, a
                translation mistake or a suggestion for a unit or tool that is
                missing from the site.
              </p>
              <p>
                Messages about advertising, partnerships or reuse of the embeddable
                tools can also be sent to the same address.
              </p>
            </>
          ),
        },
        {
          heading: "When reporting an error",
          content: (
            <ul>
              <li>the full address of the page,</li>
              <li>the values you entered and the result you saw,</li>
              <li>the result you expected and, if possible, its source,</li>
              <li>your browser and device, if the problem looks technical.</li>
            </ul>
          ),
        },
        {
          heading: "Privacy",
          content: (
            <p>
              Your email address is used only to reply to your message and is not
              shared with third parties. How data is processed on the site is
              explained in the <Link href="/en/privacy">Privacy Policy</Link>.
            </p>
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
