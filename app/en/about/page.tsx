import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "About BirimCeviri.app",
  description:
    "What BirimCeviri.app is, how its unit conversions are calculated, and who runs it: free, no sign-up, formulas shown for every result.",
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
      "What BirimCeviri.app is, how its unit conversions are calculated, and who runs it: free, no sign-up, formulas shown for every result.",
    url: `${SITE_URL}/en/about`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `About | ${SITE_NAME}`,
    description:
      "What BirimCeviri.app is, how its unit conversions are calculated, and who runs it: free, no sign-up, formulas shown for every result.",
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
      title="About BirimCeviri.app"
      description="BirimCeviri.app is a free unit converter and calculator site. It works in your browser, needs no account and shows the formula behind every result."
      sections={[
        {
          heading: "What it is",
          content: (
            <>
              <p>
                BirimCeviri.app brings together everyday and technical unit conversions, calculators and plain-language unit guides. In English
                it covers more than 500 conversion pages across length, weight, volume, temperature, pressure, energy, electricity and other
                quantities, plus engineering, finance, fitness, chemistry and date-and-time tools such as a world clock, timer and time zone
                converter.
              </p>
              <p>
                <em>Birim çeviri</em> is Turkish for &ldquo;unit conversion&rdquo;. The project started as a Turkish converter and now publishes
                its tools in several languages, adapting units and formats to each audience — on the English pages, US customary units and US cups and spoons.
              </p>
            </>
          ),
        },
        {
          heading: "How results are calculated",
          content: (
            <>
              <p>
                Conversion factors follow the definitions in the BIPM SI Brochure and NIST Special Publication 811. Where a unit is defined
                exactly (1 inch = 25.4 mm, 1 pound = 0.45359237 kg, 1 US gallon = 231 cubic inches) the exact value is used, and each
                conversion page shows the formula so you can check the arithmetic yourself.
              </p>
              <p>
                Calculations run in your browser rather than on a server, so results appear instantly and the values you type are not
                stored by us. The code is covered by more than 600 automated tests that compare results with reference values.
              </p>
            </>
          ),
        },
        {
          heading: "Free, no sign-up",
          content: (
            <>
              <p>
                All tools are free and work without an account or installation. The site may show ads to cover its running costs; see the{" "}
                <Link href="/en/privacy">privacy policy</Link> for how analytics and ad cookies are used and how to manage them.
              </p>
            </>
          ),
        },
        {
          heading: "Who runs it",
          content: (
            <>
              <p>
                BirimCeviri.app is an independent project built and maintained in Türkiye. It is not affiliated with any standards body or
                manufacturer. Corrections and suggestions are welcome through the <Link href="/en/contact">contact page</Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Important use note",
          content: (
            <>
              <p>
                Calculators and guides are provided for information and preliminary reference. For critical engineering, health or safety
                decisions, verify values against project standards, professional review and authoritative sources.
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
