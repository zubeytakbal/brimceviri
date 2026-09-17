import type { Metadata } from "next";
import OhmsLawPageUz from "../../components/calculators/OhmsLawPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/om-qonuni-hisoblash";

export const metadata: Metadata = {
  title: "Om Qonuni Hisoblash (V = I × R)",
  description:
    "Kuchlanishni, tokni yoki qarshilikni V = I × R bog'lanishi orqali hisoblang; natijani SI ekvivalenti va o'rniga qo'yilgan formula bilan birga ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hesaplayicilar/ohm-yasasi",
      "uz-UZ": pagePath,
      "x-default": "/hesaplayicilar/ohm-yasasi",
    },
  },
  openGraph: {
    title: "Om Qonuni Hisoblash (V = I × R)",
    description: "Kuchlanishni, tokni yoki qarshilikni Om qonuni bilan hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekOhmsLawCalculatorRoute() {
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
        name: "Om Qonuni Hisoblagichi",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <OhmsLawPageUz
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
