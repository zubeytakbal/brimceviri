import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findBengaliConversionPage,
  bengaliConversionPages,
  type LocalizedBengaliConversionPage,
} from "../../converter/localizedBengaliConversionPages";
import { findBengaliUnitPage } from "../../converter/localizedBengaliUnitPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("bn-BD", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return bengaliConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findBengaliConversionPage(slug);

  if (!page) {
    return {
      title: "রূপান্তর পাওয়া যায়নি",
      robots: { index: false, follow: false },
    };
  }

  const title = `${page.fromName} — ${page.toName} রূপান্তরকারী`;
  const description = `${page.fromName} কত ${page.toName}? সূত্র, রূপান্তর টেবিল এবং তাৎক্ষণিক ফলাফল বিনামূল্যে দেখুন।`;

  return {
    title,
    description,
    alternates: {
      canonical: `/bn/${page.slug}`,
      ...buildFullLanguageAlternates(`/bn/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/bn/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "bn_BD",
      type: "website",
    },
  };
}

export default async function BengaliConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findBengaliConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const reversePage = findBengaliConversionPage(page.reverseSlug);
  const fromUnitInfo = findBengaliUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findBengaliUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = bengaliConversionPages
    .filter(
      (relatedPage) =>
        relatedPage.slug !== page.slug &&
        relatedPage.slug !== page.reverseSlug &&
        relatedPage.category === page.category &&
        (relatedPage.fromUnit === page.fromUnit ||
          relatedPage.toUnit === page.fromUnit ||
          relatedPage.fromUnit === page.toUnit ||
          relatedPage.toUnit === page.toUnit)
    )
    .slice(0, 8);

  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page" lang="bn">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{page.categoryName}</span>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {page.fromName} — {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromName} — {page.toName} রূপান্তরকারী
            </h1>

            <p className="conversion-hero-description">
              তাৎক্ষণিক ও বিনামূল্যে ফলাফল পেতে একটি মান লিখুন।
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="bn"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>রূপান্তর সারসংক্ষেপ</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>সূত্র</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>বিভাগ</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>একক</dt>
                <dd>
                  {page.fromUnit} → {page.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            {page.fromName} কে {page.toName} এ কীভাবে রূপান্তর করবেন?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>রূপান্তর সূত্র</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {page.fromName} — {page.toName} রূপান্তর টেবিল
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{page.fromName}</th>
                  <th>{page.toName}</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)} {page.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)} {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{fromUnitInfo.name} কী?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/bn/unit-guides/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name} একক গাইড দেখুন
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{toUnitInfo.name} কী?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/bn/unit-guides/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name} একক গাইড দেখুন
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>বিপরীত রূপান্তর</h2>

            <Link className="text-link" href={`/bn/${reversePage.slug}`}>
              {reversePage.fromName} — {reversePage.toName} রূপান্তরকারী
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>সম্পর্কিত রূপান্তর</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/bn/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>সূত্রসমূহ</h2>

            <p>
              এই পৃষ্ঠার সংজ্ঞা ও রূপান্তর সম্পর্ক স্বীকৃত পরিমাপবিজ্ঞান
              সূত্রের সাথে সামঞ্জস্যপূর্ণ।
            </p>

            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.organization}: {source.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="conversion-section language-alternatives">
          <h2>অন্যান্য ভাষা</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Türkçe versiyonu aç
          </Link>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              View the English version
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}
