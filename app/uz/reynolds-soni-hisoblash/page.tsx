import type { Metadata } from "next";
import ReynoldsNumberPageUz from "../../components/calculators/ReynoldsNumberPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/reynolds-soni-hisoblash";

export const metadata: Metadata = {
  title: "Reynolds Soni Hisoblash (Re = ρvD/μ)",
  description:
    "Reynolds sonini, tezlikni yoki xarakterli diametrni Re = ρ × v × D / μ bilan hisoblang; natijani SI ekvivalenti va oqim rejimi talqini bilan birga ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/reynolds-sayisi",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/reynolds-sayisi",
    },
  },
  openGraph: {
    title: "Reynolds Soni Hisoblash (Re = ρvD/μ)",
    description: "Reynolds sonini, tezlikni yoki xarakterli diametrni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekReynoldsNumberCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: buildSiteUrl("/uz"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reynolds Soni Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <ReynoldsNumberPageUz
      structuredData={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(breadcrumbSchema),
          }}
        />
      }
    />
  );
}
