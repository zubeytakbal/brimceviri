import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../../converter/PairConverter";
import { bengaliUnitPages } from "../../../converter/localizedBengaliUnitPages";
import { bengaliCategoryPages } from "../../../converter/localizedBengaliCategoryPages";
import { bengaliConversionPages } from "../../../converter/localizedBengaliConversionPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ConverterData = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
};

function findBySlug(slug: string) {
  return bengaliUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return bengaliUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "একক পাওয়া যায়নি",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/bn/unit-guides/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/bn/unit-guides/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/bn/unit-guides/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "bn_BD",
      type: "article",
    },
  };
}

export default async function BengaliUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const categoryPage = bengaliCategoryPages.find(
    (category) => category.category === unitPage.category
  );
  const relatedConversions = bengaliConversionPages.filter(
    (page) =>
      page.category === unitPage.category &&
      (page.fromUnit === unitPage.unit || page.toUnit === unitPage.unit)
  );
  const directConversion = relatedConversions.find(
    (page) => page.fromUnit === unitPage.unit
  );
  const incomingConversion = relatedConversions.find(
    (page) => page.toUnit === unitPage.unit
  );
  const converterData: ConverterData | null = directConversion
    ? {
        category: directConversion.category,
        fromUnit: directConversion.fromUnit,
        toUnit: directConversion.toUnit,
        fromName: directConversion.fromName,
        toName: directConversion.toName,
      }
    : incomingConversion
      ? {
          category: incomingConversion.category,
          fromUnit: incomingConversion.toUnit,
          toUnit: incomingConversion.fromUnit,
          fromName: incomingConversion.toName,
          toName: incomingConversion.fromName,
        }
      : null;
  const sources = getUnitSources(unitPage.category);

  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/bn/categories/${categoryPage.slug}`}>
                {categoryPage.title}
              </Link>
              <span aria-hidden="true">&rsaquo;</span>
            </>
          )}
          <span>{unitPage.name}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{unitPage.name}</h1>
          <p>{unitPage.shortDescription}</p>
        </header>

        {converterData && (
          <section className="conversion-section unit-long-section">
            <h2>{unitPage.name} দ্রুত রূপান্তর</h2>
            <p>
              নিচের টুলে একটি মান লিখে তাৎক্ষণিকভাবে সম্পর্কিত এককে ফলাফল দেখুন।
            </p>
            <PairConverter
              category={converterData.category}
              fromUnit={converterData.fromUnit}
              toUnit={converterData.toUnit}
              fromName={converterData.fromName}
              toName={converterData.toName}
              locale="bn"
            />
          </section>
        )}

        <section className="category-article-content">
          <dl className="category-facts">
            <div>
              <dt>প্রতীক</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>পরিমাপ পদ্ধতি</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>SI সমতুল্য</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>ইতিহাস</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>ব্যবহার</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/bn/categories/${categoryPage.slug}`}
                >
                  {categoryPage.title} বিভাগের অন্যান্য একক দেখুন
                </Link>
              </p>
            </section>
          )}

          {relatedConversions.length > 0 && (
            <section className="conversion-section" id="conversion-tools">
              <h2>সম্পর্কিত রূপান্তর</h2>
              <ul className="related-conversion-list">
                {relatedConversions.map((conversion) => (
                  <li key={conversion.slug}>
                    <Link href={`/bn/${conversion.slug}`}>
                      {conversion.fromName} → {conversion.toName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>উৎস</h2>
              <p>
                এই পাতার একক সংজ্ঞা ও রূপান্তর সম্পর্ক স্বীকৃত পরিমাপবিজ্ঞান এবং SI উৎসের উপর ভিত্তি করে দেওয়া হয়েছে।
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
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              তুর্কি সংস্করণ খুলুন
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/units/${englishPage.slug}`}
                hrefLang="en"
              >
                ইংরেজি সংস্করণ খুলুন
              </Link>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
