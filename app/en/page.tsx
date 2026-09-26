import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";
import { getSiteNotifications } from "../converter/siteNotifications";

const englishHomeUrl = buildSiteUrl("/en");

export const metadata: Metadata = {
  title: "Unit Converter – cm to in, kg to lb, °C to °F",
  description:
    "Free online unit converter for length, weight, temperature, volume, area, speed and 30+ more categories. Instant results with formulas and conversion tables.",

  alternates: {
    canonical: englishHomeUrl,
    ...buildHomeLanguageAlternates(),
  },

  openGraph: {
    title: "Unit Converter – cm to in, kg to lb, °C to °F | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
    url: englishHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Converter – cm to in, kg to lb, °C to °F | BirimCeviri.app",
    description:
      "Search conversion pages, compare category directories and jump into the exact unit converter you need.",
  },
};

// WebSite + Organization: Google'in sitenin adini ve kimligini dogru
// gostermesi icin ana sayfada tanimlanir.
const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${englishHomeUrl}#website`,
      url: englishHomeUrl,
      name: "BirimCeviri.app",
      alternateName: "BirimCeviri Unit Converter",
      inLanguage: "en",
      publisher: { "@id": `${buildSiteUrl("/")}#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${buildSiteUrl("/")}#organization`,
      name: "BirimCeviri.app",
      url: buildSiteUrl("/"),
    },
  ],
};

export default async function EnglishHomePage() {
  const notifications = await getSiteNotifications("en");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c") }}
      />
      <HomeDirectory locale="en" notifications={notifications} />
    </>
  );
}
