import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findUzbekConversionPage,
  uzbekConversionPages,
  type LocalizedUzbekConversionPage,
} from "../../converter/localizedUzbekConversionPages";
import { findUzbekUnitPage } from "../../converter/localizedUzbekUnitPages";
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

  return Number(value.toPrecision(12)).toLocaleString("uz-UZ", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return uzbekConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findUzbekConversionPage(slug);

  if (!page) {
    return {
      title: "O'zgartirish topilmadi",
      robots: { index: false, follow: false },
    };
  }

  const title = `${page.fromName} — ${page.toName} O'zgartirgich`;
  const description = `${page.fromName} qancha ${page.toName}? Formula, o'zgartirish jadvali va tayyor natijani bepul ko'ring.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/uz/${page.slug}`,
      ...buildFullLanguageAlternates(`/uz/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "website",
    },
  };
}

export default async function UzbekConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findUzbekConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const reversePage = findUzbekConversionPage(page.reverseSlug);
  const fromUnitInfo = findUzbekUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findUzbekUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = uzbekConversionPages
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
    <main className="conversion-page" lang="uz">
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
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
              {page.fromName} — {page.toName} O'zgartirgich
            </h1>

            <p className="conversion-hero-description">
              Natijani darhol va bepul hisoblash uchun qiymat kiriting.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="uz"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>O'zgartirish xulosasi</h2>

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
                <dt>Turkum</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Birliklar</dt>
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
            {page.fromName.toLowerCase()}ni {page.toName.toLowerCase()}ga
            qanday o'zgartiriladi?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>O'zgartirish formulasi</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {page.fromName} — {page.toName} o'zgartirish jadvali
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
            <h2>{fromUnitInfo.name} nima?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/uz/birliklar/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name} birligi haqida to'liq ma'lumot
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{toUnitInfo.name} nima?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/uz/birliklar/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name} birligi haqida to'liq ma'lumot
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Teskari o'zgartirish</h2>

            <Link className="text-link" href={`/uz/${reversePage.slug}`}>
              {reversePage.fromName} — {reversePage.toName} o'zgartirgich
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Bog'liq o'zgartirishlar</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/uz/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Manbalar</h2>

            <p>
              Ushbu sahifadagi ta'rif va o'zgartirish munosabatlari
              e'tirof etilgan metrologik manbalarga asoslangan.
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
          <h2>Boshqa tillar</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Turkcha versiyani ochish
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
