import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  getAllMaterialComparisons,
  getMaterialComparison,
} from "../../../converter/materialComparisons";
import { materialComparisonContextUz } from "../../../converter/materialComparisonsUz";
import { materialCategoryLabelsUz, materialNamesUz } from "../../../converter/materialsDatabaseUz";
import { litresPerKg, sharedShapes } from "../../../converter/materialPractical";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 4 });
}

const uz = (value: number, digits: number) => value.toLocaleString("uz-UZ", { maximumFractionDigits: digits });

function formatMass(kg: number) {
  if (kg >= 1000) return `${uz(kg / 1000, 2)} t`;
  if (kg >= 1) return `${uz(kg, 2)} kg`;
  if (kg >= 0.001) return `${uz(kg * 1000, 1)} g`;
  return `${uz(kg * 1e6, 1)} mg`;
}

function formatTonVolume(m3: number) {
  return m3 >= 1 ? `${uz(m3, 2)} m³` : `${uz(m3 * 1000, 0)} litr`;
}

function formatRatio(value: number) {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 });
}

function nameUz(id: string, fallback: string) {
  return materialNamesUz[id] ?? fallback;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    return {
      title: "Solishtirish topilmadi",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, densityRatio, denserId } = comparison;
  const firstName = nameUz(first.id, first.nameTr);
  const secondName = nameUz(second.id, second.nameTr);
  const denserName = denserId === first.id ? firstName : secondName;

  const title = `${firstName} yoki ${secondName} Qaysi Biri Og'irroq? Zichlik Solishtirishi`;
  const description = `${firstName} zichligi ${formatDensity(
    first.densityKgM3
  )} kg/m³, ${secondName} zichligi ${formatDensity(
    second.densityKgM3
  )} kg/m³. ${denserName} boshqasidan ${formatRatio(
    densityRatio
  )} marta zichroq. Batafsil solishtirish va muhandislik xususiyatlari.`;

  return {
    title: seoTitle(title, `${firstName} yoki ${secondName}: Qaysi Biri Og'irroq?`, `${firstName.match(/\(([^)]+)\)\s*$/)?.[1] ?? firstName} yoki ${secondName.match(/\(([^)]+)\)\s*$/)?.[1] ?? secondName}: Qaysi Biri Og'irroq?`),
    description,
    alternates: {
      canonical: `/uz/material-solishtirish/${slug}`,
      languages: {
        tr: `/malzeme-karsilastirma/${slug}`,
        "uz-UZ": `/uz/material-solishtirish/${slug}`,
        "x-default": `/malzeme-karsilastirma/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/material-solishtirish/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekMaterialComparisonPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    notFound();
  }

  const { first, second, densityRatio, denserId } = comparison;
  const firstName = nameUz(first.id, first.nameTr);
  const secondName = nameUz(second.id, second.nameTr);
  const contextUz = materialComparisonContextUz[slug] ?? comparison.context;
  const denserName = denserId === first.id ? firstName : secondName;
  const lighterName = denserId === first.id ? secondName : firstName;
  const pageUrl = buildSiteUrl(`/uz/material-solishtirish/${slug}`);
  const shapes = sharedShapes(first, second, "uz");

  const faqItems: FaqItem[] = [
    {
      question: `${firstName} yoki ${secondName} qaysi biri og'irroq?`,
      answer:
        denserId === "esit"
          ? `${firstName} va ${secondName} taxminan bir xil zichlikka ega.`
          : `${denserName} ${lighterName}dan taxminan ${formatRatio(
              densityRatio
            )} marta zichroq (og'irroq).`,
    },
    {
      question: `${firstName} zichligi necha kg/m³?`,
      answer: `${firstName} zichligi taxminan ${formatDensity(
        first.densityKgM3
      )} kg/m³ (${formatDensity(first.densityKgM3 / 1000)} g/sm³) qiymatidadir.`,
    },
    {
      question: `${secondName} zichligi necha kg/m³?`,
      answer: `${secondName} zichligi taxminan ${formatDensity(
        second.densityKgM3
      )} kg/m³ (${formatDensity(second.densityKgM3 / 1000)} g/sm³) qiymatidadir.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Material Xususiyatlari",
        item: buildSiteUrl("/uz/material-xossalari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${firstName} – ${secondName} Solishtirishi`,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/material-xossalari">Material Xususiyatlari</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {firstName} – {secondName}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>
            {firstName} yoki {secondName} Qaysi Biri Og&apos;irroq? Zichlik
            Solishtirishi
          </h1>
          <p>
            {denserId === "esit"
              ? `${firstName} va ${secondName} taxminan bir xil zichlikka ega.`
              : `${denserName} ${lighterName}dan taxminan ${formatRatio(
                  densityRatio
                )} marta zichroq.`}
          </p>
        </header>

        <section className="category-article-content">
          <h2>Zichlik Solishtirish Jadvali</h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Zichlik (kg/m³)</th>
                  <th>Zichlik (g/sm³)</th>
                  <th>Kategoriya</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link href={`/uz/material-xossalari/${first.id}`}>
                      {firstName}
                    </Link>
                  </td>
                  <td>{formatDensity(first.densityKgM3)}</td>
                  <td>{formatDensity(first.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabelsUz[first.category]}</td>
                </tr>
                <tr>
                  <td>
                    <Link href={`/uz/material-xossalari/${second.id}`}>
                      {secondName}
                    </Link>
                  </td>
                  <td>{formatDensity(second.densityKgM3)}</td>
                  <td>{formatDensity(second.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabelsUz[second.category]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="flagship-sector-note">{contextUz}</p>
        </section>

        <section className="category-article-content">
          <h2>Bir xil o&apos;lchamda qaysi biri qancha keladi?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">O&apos;lcham</th>
                  <th scope="col">{firstName}</th>
                  <th scope="col">{secondName}</th>
                  <th scope="col">Farq</th>
                </tr>
              </thead>
              <tbody>
                {shapes.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{formatMass(row.firstKg)}</td>
                    <td>{formatMass(row.secondKg)}</td>
                    <td>{formatMass(Math.abs(row.firstKg - row.secondKg))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Teskari tomondan: 1 tonna {firstName} {formatTonVolume(litresPerKg(first))}, 1 tonna {secondName} esa{" "}
            {formatTonVolume(litresPerKg(second))} joy egallaydi.
          </p>
        </section>

        <section className="category-article-content">
          <h2>
            {firstName} va {secondName} Haqida Ko&apos;proq Ma&apos;lumot
          </h2>
          <ul>
            <li>
              <Link href={`/uz/material-xossalari/${first.id}`}>
                {firstName} zichligi, xususiyatlari va birlik aylantirgich
              </Link>
            </li>
            <li>
              <Link href={`/uz/material-xossalari/${second.id}`}>
                {secondName} zichligi, xususiyatlari va birlik aylantirgich
              </Link>
            </li>
            <li>
              <Link href="/uz/material-xossalari">
                Barcha material xususiyatlari sahifasiga qaytish
              </Link>
            </li>
          </ul>
        </section>

        <section className="category-article-content">
          <p>
            Zichliklar{" "}
            <a href="https://densitycalculator.net/density-table" target="_blank" rel="noreferrer">
              zichlik jadvalidan
            </a>{" "}
            olingan xona haroratidagi ma&apos;lumotnoma qiymatlari.
          </p>
        </section>
      </div>
    </main>
  );
}
