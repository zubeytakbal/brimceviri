import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uzbekUnitPages } from "../../../converter/localizedUzbekUnitPages";
import { uzbekCategoryPages } from "../../../converter/localizedUzbekCategoryPages";
import { uzbekConversionPages } from "../../../converter/localizedUzbekConversionPages";
import { findEnglishUnitPageByTurkishSlug } from "../../../converter/localizedUnitPages";
import { getUnitSources } from "../../../converter/unitSources";
import CategoryUnitConverter from "../../../components/CategoryUnitConverter";
import {
  getCategoryUnitOptions,
  hasUzbekUnitLabels,
} from "../../../components/categoryUnitOptions";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findBySlug(slug: string) {
  return uzbekUnitPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return uzbekUnitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    return {
      title: "Birlik topilmadi",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${unitPage.name} — ${unitPage.categoryName}`,
    description: unitPage.shortDescription,
    alternates: {
      canonical: `/uz/birliklar/${unitPage.slug}`,
      ...buildFullLanguageAlternates(`/uz/birliklar/${unitPage.slug}`),
    },
    openGraph: {
      title: `${unitPage.name} — ${unitPage.categoryName}`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/uz/birliklar/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const unitPage = findBySlug(slug);

  if (!unitPage) {
    notFound();
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(unitPage.sourceSlug);
  const categoryPage = uzbekCategoryPages.find(
    (category) => category.category === unitPage.category
  );

  const relatedConversions = uzbekConversionPages.filter(
    (page) =>
      page.category === unitPage.category &&
      (page.fromUnit === unitPage.unit || page.toUnit === unitPage.unit)
  );
  const sources = getUnitSources(unitPage.category);
  const categoryUnitOptions = getCategoryUnitOptions(unitPage.category, "uz");
  const focusedUnitOptions = [...categoryUnitOptions].sort(
    (left, right) =>
      Number(right.value === unitPage.unit) - Number(left.value === unitPage.unit)
  );
  const showLiveConverter =
    hasUzbekUnitLabels(unitPage.category) &&
    focusedUnitOptions.length > 1 &&
    focusedUnitOptions[0]?.value === unitPage.unit;

  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          {categoryPage && (
            <>
              <Link href={`/uz/turkumlar/${categoryPage.slug}`}>
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

        {showLiveConverter && (
          <section className="conversion-section unit-long-section">
            <h2>{unitPage.name} bilan tez aylantirish</h2>
            <p>
              Quyidagi vositada {unitPage.name.toLowerCase()} boshlang&apos;ich
              birlik sifatida tanlangan. Qiymatni kiriting, so&apos;ng natijani
              kerakli birlikda ko&apos;ring.
            </p>
            <CategoryUnitConverter
              category={unitPage.category}
              locale="uz"
              unitOptions={focusedUnitOptions}
            />
          </section>
        )}

        <section className="category-article-content">
          <dl className="category-facts">
            <div>
              <dt>Belgi</dt>
              <dd>{unitPage.symbol}</dd>
            </div>
            <div>
              <dt>O&apos;lchov tizimi</dt>
              <dd>{unitPage.measurementSystem}</dd>
            </div>
            <div>
              <dt>SI ekvivalenti</dt>
              <dd>{unitPage.siEquivalent}</dd>
            </div>
          </dl>

          <section className="conversion-section unit-long-section">
            <h2>Tarixi</h2>
            <p>{unitPage.historySummary}</p>
          </section>

          <section className="conversion-section unit-long-section">
            <h2>Qo&apos;llanilishi</h2>
            <p>{unitPage.commonUses}</p>
          </section>

          {categoryPage && (
            <section className="conversion-section">
              <p>
                <Link
                  className="text-link"
                  href={`/uz/turkumlar/${categoryPage.slug}`}
                >
                  {categoryPage.title} turkumidagi boshqa birliklarni ko&apos;rish
                </Link>
              </p>
            </section>
          )}

          {relatedConversions.length > 0 && (
            <section className="conversion-section" id="aylantirish-vositalari">
              <h2>{unitPage.name} aylantirish vositalari</h2>

              <ul className="related-conversion-list">
                {relatedConversions.map((conversion) => (
                  <li key={conversion.slug}>
                    <Link href={`/uz/${conversion.slug}`}>
                      {conversion.fromName} → {conversion.toName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sources.length > 0 && (
            <section className="conversion-section unit-sources" id="sources">
              <h2>Manbalar</h2>
              <p>
                Ushbu sahifadagi birlik ta'riflari va aylantirish munosabatlari tan olingan metrologiya hamda SI manbalariga asoslanadi.
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

          {(unitPage.sourceSlug || englishPage) && (
          <section className="conversion-section language-alternatives">
            <h2>Boshqa tillar</h2>
            {unitPage.sourceSlug && (
              <Link
                className="text-link"
                href={`/birimler/${unitPage.sourceSlug}`}
                hrefLang="tr"
              >
                Turkcha versiyani ochish
              </Link>
            )}
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/units/${englishPage.slug}`}
                hrefLang="en"
              >
                Inglizcha versiyasini ochish
              </Link>
            )}
          </section>
          )}
        </section>
      </div>
    </main>
  );
}
