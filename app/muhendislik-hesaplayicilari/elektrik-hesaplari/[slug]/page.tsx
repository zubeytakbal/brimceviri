import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KwToAmpPage from "../../../components/calculators/KwToAmpPage";
import AmpToKwCalculator from "../../../components/calculators/AmpToKwCalculator";
import MotorCurrentCalculator from "../../../components/calculators/MotorCurrentCalculator";
import AmpToKwPage from "../../../components/calculators/AmpToKwPage";
import VoltageDropPage from "../../../components/calculators/VoltageDropPage";
import CableSizePage from "../../../components/calculators/CableSizePage";
import MotorCurrentPage from "../../../components/calculators/MotorCurrentPage";
import PlannedElectricalCalculatorPage from "../../../components/PlannedElectricalCalculatorPage";
import {
  getElectricalCalculatorByLocalizedSlug,
  getElectricalCalculatorPath,
  getElectricalStaticParams,
  isLiveElectricalCalculator,
} from "../../../converter/engineeringHubs";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";
import { hesapSayfasiKalkti } from "../../../kaldirilanHesapSayfalari";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

// Kasim 2026: amper -> kW ve motor akimi, kW -> amper sayfasina birlestirildi (app/kasimTemizligi.ts).
const BIRLESEN = new Set(["amper-to-kw-hesaplama", "motor-akimi-hesaplama"]);

export function generateStaticParams() {
  // Kasim 2026: tik almayan kablo kesiti sayfasi kaldirildi (app/kaldirilanHesapSayfalari.ts).
  return getElectricalStaticParams("tr").filter(
    (p) => !BIRLESEN.has(p.slug) && !hesapSayfasiKalkti(`/muhendislik-hesaplayicilari/elektrik-hesaplari/${p.slug}`),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("tr", slug);

  if (!item) {
    return {
      title: "Sayfa bulunamadı",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${item.titles.tr}`,
    description: item.descriptions.tr,
    robots: {
      index: isLiveElectricalCalculator(item.sourceSlug),
      follow: true,
    },
    alternates: {
      canonical: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
      languages: {
        tr: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
        en: getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
        de: getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
      },
    },
    openGraph: {
      title: item.titles.tr,
      description: item.descriptions.tr,
      url: buildSiteUrl(
        getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
      ),
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function TurkishPlannedElectricalCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("tr", slug);

  if (!item) {
    notFound();
  }

  if (item.sourceSlug === "kw-to-amper-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesapları",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <KwToAmpPage
        locale="tr"
        ekBolum={
          <>
            <AmpToKwCalculator
              locale="tr"
              eyebrow="Ters yön"
              title="Amperden kW hesaplama"
              description="Akım, gerilim ve güç faktörü biliniyorsa çekilen gücü kW olarak bulun."
              resultHeading="Güç"
            />
            <MotorCurrentCalculator
              locale="tr"
              eyebrow="Motorlar için"
              title="Motor akımı hesaplama"
              description="Motor etiketindeki güç, verim ve güç faktöründen şebekeden çekilen akımı hesaplayın."
              resultHeading="Motor akımı"
            />
          </>
        }
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  if (item.sourceSlug === "amper-to-kw-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesapları",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <AmpToKwPage
        locale="tr"
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  if (
    item.sourceSlug === "gerilim-dusumu-hesaplama" ||
    item.sourceSlug === "kablo-kesiti-hesaplama"
  ) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesapları",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };
    const structuredData = (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    );

    return item.sourceSlug === "gerilim-dusumu-hesaplama" ? (
      <VoltageDropPage locale="tr" structuredData={structuredData} />
    ) : (
      <CableSizePage locale="tr" structuredData={structuredData} />
    );
  }

  if (item.sourceSlug === "motor-akimi-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesapları",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <MotorCurrentPage
        locale="tr"
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  return (
    <PlannedElectricalCalculatorPage
      locale="tr"
      sourceSlug={item.sourceSlug}
    />
  );
}
