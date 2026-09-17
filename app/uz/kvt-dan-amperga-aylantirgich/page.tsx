import type { Metadata } from "next";
import KwToAmpPageUz from "../../components/calculators/KwToAmpPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kvt-dan-amperga-aylantirgich";

export const metadata: Metadata = {
  title: "kVt dan Amperga Aylantirgich",
  description:
    "Quvvatni bir fazali, uch fazali va DC tizimlar uchun amperga aylantiring; natijani kuchlanish, quvvat koeffitsienti va samaradorlik asosida ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
    },
  },
  openGraph: {
    title: "kVt dan Amperga Aylantirgich",
    description: "Quvvatni bir fazali, uch fazali va DC tizimlar uchun amperga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekKwToAmpCalculatorPage() {
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
        name: "kVt dan Amperga Aylantirgich",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <KwToAmpPageUz
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
