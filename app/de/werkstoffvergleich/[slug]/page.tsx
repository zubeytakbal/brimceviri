import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  getAllMaterialComparisons,
  getMaterialComparison,
} from "../../../converter/materialComparisons";
import { materialComparisonContextDe } from "../../../converter/materialComparisonsDe";
import { materialCategoryLabelsDe, materialNamesDe } from "../../../converter/materialsDatabaseDe";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 4 });
}

function formatRatio(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
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
      title: "Vergleich nicht gefunden",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, densityRatio, denserId } = comparison;
  const firstDe = materialNamesDe[first.id] ?? first.nameTr;
  const secondDe = materialNamesDe[second.id] ?? second.nameTr;
  const denserNameDe = denserId === first.id ? firstDe : secondDe;

  const title = `${firstDe} oder ${secondDe}: Was ist schwerer? Dichtevergleich`;
  const description = `${firstDe} hat eine Dichte von ${formatDensity(
    first.densityKgM3
  )} kg/m³, ${secondDe} von ${formatDensity(
    second.densityKgM3
  )} kg/m³. ${denserNameDe} ist etwa ${formatRatio(
    densityRatio
  )}-mal dichter als das andere. Ausführlicher Vergleich mit technischen Eigenschaften.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/de/werkstoffvergleich/${slug}`,
      languages: {
        tr: `/malzeme-karsilastirma/${slug}`,
        de: `/de/werkstoffvergleich/${slug}`,
        "x-default": `/malzeme-karsilastirma/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/werkstoffvergleich/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanMaterialComparisonPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    notFound();
  }

  const { first, second, densityRatio, denserId } = comparison;
  const firstDe = materialNamesDe[first.id] ?? first.nameTr;
  const secondDe = materialNamesDe[second.id] ?? second.nameTr;
  const contextDe = materialComparisonContextDe[slug] ?? "";
  const denserMaterial = denserId === first.id ? first : second;
  const lighterMaterial = denserId === first.id ? second : first;
  const denserNameDe = denserId === first.id ? firstDe : secondDe;
  const lighterNameDe = denserId === first.id ? secondDe : firstDe;
  const pageUrl = buildSiteUrl(`/de/werkstoffvergleich/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `Was ist schwerer, ${firstDe} oder ${secondDe}?`,
      answer:
        denserId === "esit"
          ? `${firstDe} und ${secondDe} haben etwa die gleiche Dichte.`
          : `${denserNameDe} ist etwa ${formatRatio(
              densityRatio
            )}-mal dichter (schwerer) als ${lighterNameDe}.`,
    },
    {
      question: `Wie hoch ist die Dichte von ${firstDe}?`,
      answer: `${firstDe} hat eine Dichte von etwa ${formatDensity(
        first.densityKgM3
      )} kg/m³ (${formatDensity(first.densityKgM3 / 1000)} g/cm³).`,
    },
    {
      question: `Wie hoch ist die Dichte von ${secondDe}?`,
      answer: `${secondDe} hat eine Dichte von etwa ${formatDensity(
        second.densityKgM3
      )} kg/m³ (${formatDensity(second.densityKgM3 / 1000)} g/cm³).`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Werkstoffeigenschaften",
        item: buildSiteUrl("/de/werkstoffeigenschaften"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${firstDe} – ${secondDe} Vergleich`,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page">
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
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/de/werkstoffeigenschaften">Werkstoffeigenschaften</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {firstDe} – {secondDe}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>
            {firstDe} oder {secondDe}: Was ist schwerer? Dichtevergleich
          </h1>
          <p>
            {denserId === "esit"
              ? `${firstDe} und ${secondDe} haben etwa die gleiche Dichte.`
              : `${denserNameDe} ist etwa ${formatRatio(
                  densityRatio
                )}-mal dichter als ${lighterNameDe}.`}
          </p>
        </header>

        <section className="category-article-content">
          <h2>Dichtevergleich-Tabelle</h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Dichte (kg/m³)</th>
                  <th>Dichte (g/cm³)</th>
                  <th>Kategorie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link href={`/de/werkstoffeigenschaften/${first.id}`}>
                      {firstDe}
                    </Link>
                  </td>
                  <td>{formatDensity(first.densityKgM3)}</td>
                  <td>{formatDensity(first.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabelsDe[first.category]}</td>
                </tr>
                <tr>
                  <td>
                    <Link href={`/de/werkstoffeigenschaften/${second.id}`}>
                      {secondDe}
                    </Link>
                  </td>
                  <td>{formatDensity(second.densityKgM3)}</td>
                  <td>{formatDensity(second.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabelsDe[second.category]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {contextDe && <p className="flagship-sector-note">{contextDe}</p>}
        </section>

        <section className="category-article-content">
          <h2>
            Mehr über {firstDe} und {secondDe}
          </h2>
          <ul>
            <li>
              <Link href={`/de/werkstoffeigenschaften/${first.id}`}>
                {firstDe}: Dichte, Eigenschaften und Einheitenumrechner
              </Link>
            </li>
            <li>
              <Link href={`/de/werkstoffeigenschaften/${second.id}`}>
                {secondDe}: Dichte, Eigenschaften und Einheitenumrechner
              </Link>
            </li>
            <li>
              <Link href="/de/werkstoffeigenschaften">
                Zurück zur Übersicht Werkstoffeigenschaften
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
