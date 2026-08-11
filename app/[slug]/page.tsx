import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConversionSeo from "../components/ConversionSeo";
import PairConverter from "../converter/PairConverter";
import { convert } from "../converter/convert";
import { conversionPages } from "../converter/conversionPages";
import { findEnglishPageByTurkishSlug } from "../converter/localizedConversionPages";
import { findUnitPage } from "../converter/unitPages";
import { buildSiteUrl } from "../siteConfig";

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

  return Number(value.toPrecision(12)).toLocaleString("tr-TR", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return conversionPages.map((conversionPage) => ({
    slug: conversionPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const conversionPage = conversionPages.find(
    (page) => page.slug === slug
  );

  if (!conversionPage) {
    return {
      title: "Dönüşüm bulunamadı",
    };
  }

  const englishPage = findEnglishPageByTurkishSlug(
    conversionPage.slug
  );

  return {
    title:
      `${conversionPage.fromName} – ` +
      `${conversionPage.toName} Çevirici`,
    description:
      `${conversionPage.fromName} değerini ` +
      `${conversionPage.toName} birimine dönüştürün. ` +
      `Formülü, hazır dönüşüm tablosunu ve birim bilgilerini inceleyin.`,
    alternates: {
      canonical: `/${conversionPage.slug}`,
      languages: englishPage
        ? {
            tr: `/${conversionPage.slug}`,
            en: `/en/${englishPage.slug}`,
            "x-default": `/${conversionPage.slug}`,
          }
        : undefined,
    },
    openGraph: {
      title:
        `${conversionPage.fromName} – ` +
        `${conversionPage.toName} Çevirici`,
      description:
        `${conversionPage.fromName} değerini ` +
        `${conversionPage.toName} birimine ücretsiz dönüştürün.`,
      url: buildSiteUrl(`/${conversionPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function ConversionPage({ params }: PageProps) {
  const { slug } = await params;

  const conversionPage = conversionPages.find(
    (page) => page.slug === slug
  );

  if (!conversionPage) {
    notFound();
  }

  const reversePage = conversionPages.find(
    (page) => page.slug === conversionPage.reverseSlug
  );

  const relatedConversions = conversionPages
    .filter(
      (page) =>
        page.slug !== conversionPage.slug &&
        page.slug !== conversionPage.reverseSlug &&
        page.category === conversionPage.category &&
        (page.fromUnit === conversionPage.fromUnit ||
          page.toUnit === conversionPage.fromUnit ||
          page.fromUnit === conversionPage.toUnit ||
          page.toUnit === conversionPage.toUnit)
    )
    .slice(0, 8);

  const fromUnitInfo = findUnitPage(
    conversionPage.category,
    conversionPage.fromUnit
  );

  const toUnitInfo = findUnitPage(
    conversionPage.category,
    conversionPage.toUnit
  );

  const tableRows = conversionPage.exampleValues.map((value) => ({
    input: value,
    result: convert(
      conversionPage.category,
      value,
      conversionPage.fromUnit,
      conversionPage.toUnit
    ),
  }));

  const oneUnitResult = convert(
    conversionPage.category,
    1,
    conversionPage.fromUnit,
    conversionPage.toUnit
  );

  const formattedOneUnitResult = formatNumber(oneUnitResult);

  return (
    <main className="conversion-page">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>

          <Link
            href={`/kategoriler/${conversionPage.category}`}
          >
            {conversionPage.category}
          </Link>

          <span aria-hidden="true">›</span>

          <span>
            {conversionPage.fromName} –{" "}
            {conversionPage.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {conversionPage.fromName} –{" "}
              {conversionPage.toName} Çevirici
            </h1>

            <p className="conversion-hero-description">
              Değeri girin, sonucu anında ve ücretsiz olarak hesaplayın.
            </p>

            <PairConverter
              category={conversionPage.category}
              fromUnit={conversionPage.fromUnit}
              toUnit={conversionPage.toUnit}
              fromName={conversionPage.fromName}
              toName={conversionPage.toName}
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Dönüşüm özeti</h2>

            <p>
              1 {conversionPage.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult}{" "}
                {conversionPage.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Dönüşüm</dt>
                <dd>{conversionPage.formula}</dd>
              </div>

              <div>
                <dt>Kategori</dt>
                <dd>{conversionPage.category}</dd>
              </div>

              <div>
                <dt>Birimler</dt>
                <dd>
                  {conversionPage.fromUnit} →{" "}
                  {conversionPage.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            {conversionPage.fromName},{" "}
            {conversionPage.toName} birimine nasıl çevrilir?
          </h2>

          <p>{conversionPage.explanation}</p>

          <div className="conversion-formula">
            <strong>Dönüşüm formülü</strong>
            <p>{conversionPage.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {conversionPage.fromName} –{" "}
            {conversionPage.toName} dönüşüm tablosu
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{conversionPage.fromName}</th>
                  <th>{conversionPage.toName}</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)}{" "}
                      {conversionPage.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)}{" "}
                      {conversionPage.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            1 {conversionPage.fromName} kaç{" "}
            {conversionPage.toName} eder?
          </h2>

          <p className="direct-answer">
            1 {conversionPage.fromUnit} ={" "}
            <strong>
              {formattedOneUnitResult}{" "}
              {conversionPage.toUnit}
            </strong>
          </p>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{fromUnitInfo.name} nedir?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <h3>{fromUnitInfo.name} biriminin kısa tarihçesi</h3>

            <p>{fromUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/birimler/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name} hakkında ayrıntılı bilgi
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{toUnitInfo.name} nedir?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <h3>{toUnitInfo.name} biriminin kısa tarihçesi</h3>

            <p>{toUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/birimler/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name} hakkında ayrıntılı bilgi
            </Link>
          </section>
        )}

        <ConversionSeo
          conversionPage={conversionPage}
          formattedOneUnitResult={formattedOneUnitResult}
        />

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Ters dönüşüm</h2>

            <Link
              className="text-link"
              href={`/${reversePage.slug}`}
            >
              {reversePage.fromName} →{" "}
              {reversePage.toName} çevirici
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>İlgili dönüşümler</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/${relatedPage.slug}`}>
                    {relatedPage.fromName} →{" "}
                    {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
