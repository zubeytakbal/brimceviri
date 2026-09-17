import type { Metadata } from "next";
import AmpToKwPageUz from "../../components/calculators/AmpToKwPageUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/amperdan-kvt-ga-aylantirgich";

export const metadata: Metadata = {
  title: "Amperdan kVt ga Aylantirgich",
  description:
    "Hat tokini bir fazali, uch fazali va DC tizimlar uchun taxminiy quvvatga aylantiring; natijani kuchlanish, quvvat koeffitsienti va samaradorlik asosida ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
    },
  },
  openGraph: {
    title: "Amperdan kVt ga Aylantirgich",
    description: "Hat tokini bir fazali, uch fazali va DC tizimlar uchun taxminiy quvvatga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "article",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAmpToKwCalculatorPage() {
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
        name: "Amperdan kVt ga Aylantirgich",
        item: buildSiteUrl(pagePath),
      },
    ],
  };

  return (
    <AmpToKwPageUz
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
