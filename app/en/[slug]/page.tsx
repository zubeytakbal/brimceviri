import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import {
  englishConversionPages,
  findEnglishConversionPage,
} from "../../converter/localizedConversionPages";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 ||
      Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return englishConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findEnglishConversionPage(slug);

  if (!page) {
    return {
      title: "Conversion not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${page.fromName} to ${page.toName} Converter`;

  const description =
    `Convert ${page.fromName.toLowerCase()} to ` +
    `${page.toName.toLowerCase()}. View the conversion formula, ` +
    `conversion table and instant calculation result.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/en/${page.slug}`,
      languages: {
        tr: `/${page.sourceSlug}`,
        en: `/en/${page.slug}`,
        "x-default": `/${page.sourceSlug}`,
      },
    },

    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/en/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function EnglishConversionPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const page = findEnglishConversionPage(slug);

  if (!page) {
    notFound();
  }

  const reversePage = findEnglishConversionPage(
    page.reverseSlug
  );

  const relatedConversions = englishConversionPages
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
    result: convert(
      page.category,
      value,
      page.fromUnit,
      page.toUnit
    ),
  }));

  const oneUnitResult = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );

  const formattedOneUnitResult = formatNumber(
    oneUnitResult
  );

  return (
    <main className="conversion-page" lang="en">
      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>

          <span aria-hidden="true">›</span>

          <span>{page.categoryName}</span>

          <span aria-hidden="true">›</span>

          <span>
            {page.fromName} to {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {page.fromName} to {page.toName} Converter
            </h1>

            <p className="conversion-hero-description">
              Enter a value to calculate the result instantly
              and free of charge.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="en"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Conversion summary</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formula</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Category</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Units</dt>
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
            How do you convert {page.fromName.toLowerCase()}{" "}
            to {page.toName.toLowerCase()}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Conversion formula</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {page.fromName} to {page.toName} conversion
            table
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
                      {formatNumber(row.input)}{" "}
                      {page.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)}{" "}
                      {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            How many {page.toName.toLowerCase()} are in one{" "}
            {page.fromName.toLowerCase()}?
          </h2>

          <p className="direct-answer">
            1 {page.fromUnit} ={" "}
            <strong>
              {formattedOneUnitResult} {page.toUnit}
            </strong>
          </p>
        </section>

        <section className="conversion-section">
          <h2>About this conversion</h2>

          <p>
            This calculator converts {page.fromName.toLowerCase()}{" "}
            ({page.fromUnit}) to{" "}
            {page.toName.toLowerCase()} ({page.toUnit}).
            Enter any numeric value in the calculator to receive
            the converted result immediately.
          </p>

          <p>
            The result is calculated using the defined
            conversion relationship between the two units.
            Values may be displayed in scientific notation when
            they are extremely large or extremely small.
          </p>
        </section>

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Reverse conversion</h2>

            <Link
              className="text-link"
              href={`/en/${reversePage.slug}`}
            >
              {reversePage.fromName} to{" "}
              {reversePage.toName} converter
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Related conversions</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/en/${relatedPage.slug}`}>
                    {relatedPage.fromName} to{" "}
                    {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section language-alternatives">
          <h2>Other languages</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Türkçe sürümü görüntüle
          </Link>
        </section>
      </article>
    </main>
  );
}
