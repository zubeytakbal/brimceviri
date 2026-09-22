import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  getAllMaterialComparisons,
  getMaterialComparison,
} from "../../../converter/materialComparisons";
import { materialComparisonContextUz } from "../../../converter/materialComparisonsUz";
import { materialCategoryLabelsUz, materialNamesUz } from "../../../converter/materialsDatabaseUz";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 4 });
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
    title,
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
    {
      question: "Bu solishtirish haqiqiy qism og'irligini bevosita ko'rsatadimi?",
      answer: "Yo'q. Jadval zichlik orqali bir xil hajmdagi materiallarni solishtiradi. Haqiqiy qism og'irligi hajm, material sinfi, harorat va namlikka ham bog'liq.",
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
          <h2>Bu solishtirishni qanday o'qish kerak?</h2>
          <p>
            Jadval ikki materialni teng hajmda solishtiradi: 1 litr {firstName} taxminan {formatDensity(first.densityKgM3 / 1000)} kg,
            1 litr {secondName} esa taxminan {formatDensity(second.densityKgM3 / 1000)} kg keladi.
          </p>
          <p>
            Bu qiymatlar dastlabki hisoblar uchun nominal ma'lumotnomadir. Haqiqiy qism og'irligi hajm bilan o'zgaradi; gaz, suyuqlik, yog'och, oziq-ovqat va qurilish materiallarida harorat, bosim, namlik yoki tarkib ham muhimdir.
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

        <section className="category-article-content unit-sources">
          <h2>Manba va foydalanish izohi</h2>
          <p>
            Ushbu solishtirishdagi zichlik qiymatlari{" "}
            <a
              href="https://densitycalculator.net/density-table"
              target="_blank"
              rel="noreferrer"
            >
              232 materialdan iborat zichlik jadvalidan
            </a>{" "}
            olingan nominal ma&apos;lumotnoma qiymatlaridir. Ular bir xil
            hajmdagi materiallarni solishtirish uchun mos; haqiqiy bo&apos;lak
            og&apos;irligida material sinfi, harorat, namlik va bo&apos;shliqlar
            ham hisobga olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
