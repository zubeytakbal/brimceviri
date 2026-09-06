import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bengaliUnitPages } from "../../../converter/localizedBengaliUnitPages";
import { bengaliCategoryPages } from "../../../converter/localizedBengaliCategoryPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
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

          <section className="conversion-section language-alternatives">
            <h2>অন্যান্য ভাষা</h2>
            <Link
              className="text-link"
              href={`/birimler/${unitPage.sourceSlug}`}
              hrefLang="tr"
            >
              Türkçe versiyonu aç
            </Link>
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/units/${englishPage.slug}`}
                hrefLang="en"
              >
                View the English version
              </Link>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
