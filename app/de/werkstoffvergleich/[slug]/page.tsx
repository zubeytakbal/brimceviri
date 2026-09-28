import { materialPathDe, comparisonPathDe, comparisonIdFromDeSlug, comparisonSlugDe } from "../../../converter/germanScienceSlugs";
import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
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

function formatMass(kg: number) {
  if (kg >= 1000) return `${(kg / 1000).toLocaleString("de-DE", { maximumFractionDigits: 2 })} t`;
  if (kg >= 1) return `${kg.toLocaleString("de-DE", { maximumFractionDigits: 2 })} kg`;
  return `${(kg * 1000).toLocaleString("de-DE", { maximumFractionDigits: 2 })} g`;
}

function formatVolume(m3: number) {
  if (m3 >= 1) return `${m3.toLocaleString("de-DE", { maximumFractionDigits: 3 })} m³`;
  if (m3 >= 0.001) return `${(m3 * 1000).toLocaleString("de-DE", { maximumFractionDigits: 2 })} Liter`;
  return `${(m3 * 1e6).toLocaleString("de-DE", { maximumFractionDigits: 1 })} cm³`;
}

const SOLID_CATEGORIES = new Set(["metal", "plastik", "ahsap", "yapi-malzemesi"]);

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialComparisons().map((comparison) => ({
    slug: comparisonSlugDe(comparison.slug),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: urlSlug } = await params;
  const slug = comparisonIdFromDeSlug(urlSlug) ?? "";
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
    title: seoTitle(title, `${firstDe} oder ${secondDe}: Was ist schwerer?`, `${firstDe.match(/\(([^)]+)\)\s*$/)?.[1] ?? firstDe} oder ${secondDe.match(/\(([^)]+)\)\s*$/)?.[1] ?? secondDe}: Was ist schwerer?`),
    description,
    alternates: {
      canonical: comparisonPathDe(slug),
      languages: {
        tr: `/malzeme-karsilastirma/${slug}`,
        de: comparisonPathDe(slug),
        "x-default": `/malzeme-karsilastirma/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(comparisonPathDe(slug)),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanMaterialComparisonPage({
  params,
}: PageProps) {
  const { slug: urlSlug } = await params;
  const slug = comparisonIdFromDeSlug(urlSlug) ?? "";
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    notFound();
  }

  const { first, second, densityRatio, denserId } = comparison;
  const firstDe = materialNamesDe[first.id] ?? first.nameTr;
  const secondDe = materialNamesDe[second.id] ?? second.nameTr;
  const contextDe = materialComparisonContextDe[slug] ?? "";
  const denserNameDe = denserId === first.id ? firstDe : secondDe;
  const lighterNameDe = denserId === first.id ? secondDe : firstDe;
  const pageUrl = buildSiteUrl(comparisonPathDe(slug));
  const volumes: Array<[string, number]> = [
    ["1 cm³", 1e-6],
    ["1 Liter (1 dm³)", 0.001],
    ["10 Liter", 0.01],
    ["1 m³", 1],
  ];
  const bothSolid = SOLID_CATEGORIES.has(first.category) && SOLID_CATEGORIES.has(second.category);
  const involved = new Set([first.id, second.id]);
  const all = getAllMaterialComparisons().filter((c) => c.slug !== slug);
  const otherComparisons = [
    ...all.filter((c) => involved.has(c.first.id) || involved.has(c.second.id)),
    ...all.filter((c) => !(involved.has(c.first.id) || involved.has(c.second.id))),
  ].slice(0, 8);

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
    {
      question: `Wie viel wiegt 1 Liter ${firstDe} im Vergleich zu ${secondDe}?`,
      answer: `1 Liter ${firstDe} wiegt etwa ${formatMass(first.densityKgM3 / 1000)}, 1 Liter ${secondDe} etwa ${formatMass(second.densityKgM3 / 1000)}. Der Unterschied beträgt ${formatMass(Math.abs(first.densityKgM3 - second.densityKgM3) / 1000)} pro Liter.`,
    },
    {
      question: `Wie viel Volumen nimmt 1 kg ${firstDe} und 1 kg ${secondDe} ein?`,
      answer: `1 kg ${firstDe} nimmt etwa ${formatVolume(1 / first.densityKgM3)} ein, 1 kg ${secondDe} etwa ${formatVolume(1 / second.densityKgM3)}.`,
    },
    {
      question: "Zeigt dieser Vergleich direkt das Gewicht eines Bauteils?",
      answer: "Nein. Die Tabelle vergleicht Werkstoffe gleicher Größe anhand ihrer Dichte. Das tatsächliche Bauteilgewicht hängt zusätzlich von Volumen, Werkstoffgüte, Temperatur und Feuchte ab.",
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
                    <Link href={materialPathDe(first.id)}>
                      {firstDe}
                    </Link>
                  </td>
                  <td>{formatDensity(first.densityKgM3)}</td>
                  <td>{formatDensity(first.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabelsDe[first.category]}</td>
                </tr>
                <tr>
                  <td>
                    <Link href={materialPathDe(second.id)}>
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
          <h2>So ist dieser Vergleich zu lesen</h2>
          <p>
            Die Tabelle vergleicht zwei Werkstoffe bei gleichem Volumen: 1 Liter {firstDe} wiegt etwa {formatDensity(first.densityKgM3 / 1000)} kg,
            1 Liter {secondDe} etwa {formatDensity(second.densityKgM3 / 1000)} kg.
          </p>
          <p>
            Diese Angaben sind nominale Referenzwerte für eine erste Rechnung. Das tatsächliche Bauteilgewicht ändert sich mit dem Volumen; bei Gasen, Flüssigkeiten, Holz, Lebensmitteln und Baustoffen sind außerdem Temperatur, Druck, Feuchte oder Zusammensetzung relevant.
          </p>
        </section>

        <section className="category-article-content">
          <h2>Gewicht bei gleichem Volumen</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Volumen</th>
                  <th>{firstDe}</th>
                  <th>{secondDe}</th>
                </tr>
              </thead>
              <tbody>
                {volumes.map(([label, m3]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{formatMass(first.densityKgM3 * m3)}</td>
                    <td>{formatMass(second.densityKgM3 * m3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Volumen bei gleichem Gewicht</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Masse</th>
                  <th>{firstDe}</th>
                  <th>{secondDe}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 10, 100].map((kg) => (
                  <tr key={kg}>
                    <td>{kg} kg</td>
                    <td>{formatVolume(kg / first.densityKgM3)}</td>
                    <td>{formatVolume(kg / second.densityKgM3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bothSolid && (
            <p>
              Beispiel Platte: Eine Platte von 1 m × 1 m und 1 cm Stärke (10 Liter) wiegt aus {firstDe} etwa {formatMass(first.densityKgM3 * 0.01)}, aus{" "}
              {secondDe} etwa {formatMass(second.densityKgM3 * 0.01)}. Eigene Maße rechnet der{" "}
              <Link href="/de/materialgewicht-berechnen">Materialgewicht-Rechner</Link> aus.
            </p>
          )}
        </section>

        <section className="category-article-content">
          <h2>
            Mehr über {firstDe} und {secondDe}
          </h2>
          <ul>
            <li>
              <Link href={materialPathDe(first.id)}>
                {firstDe}: Dichte, Eigenschaften und Einheitenumrechner
              </Link>
            </li>
            <li>
              <Link href={materialPathDe(second.id)}>
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

        {otherComparisons.length > 0 && (
          <section className="category-article-content">
            <h2>Weitere Dichtevergleiche</h2>
            <ul>
              {otherComparisons.map((c) => (
                <li key={c.slug}>
                  <Link href={comparisonPathDe(c.slug)}>
                    {materialNamesDe[c.first.id] ?? c.first.nameTr} oder {materialNamesDe[c.second.id] ?? c.second.nameTr}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Häufig gestellte Fragen</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>

        <section className="category-article-content unit-sources">
          <h2>Quelle und Anwendungshinweis</h2>
          <p>
            Die Dichtewerte dieses Vergleichs sind nominale Referenzwerte aus
            der{" "}
            <a
              href="https://densitycalculator.net/density-table"
              target="_blank"
              rel="noreferrer"
            >
              Dichtetabelle mit 232 Materialien
            </a>
            . Sie eignen sich zum Vergleich gleicher Volumina; für das
            tatsächliche Bauteilgewicht müssen Werkstoffgüte, Temperatur,
            Feuchte und Hohlräume berücksichtigt werden.
          </p>
        </section>
      </div>
    </main>
  );
}
