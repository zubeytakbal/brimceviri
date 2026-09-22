import Link from "next/link";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";

type UnitPage = {
  category: string;
  categoryName: string;
  slug: string;
  name: string;
  symbol: string;
};

type CategoryPage = {
  category: string;
  slug: string;
  title: string;
};

type Props = {
  locale: string;
  homeHref: string;
  homeLabel: string;
  categoryPrefix: string;
  unitPrefix: string;
  units: UnitPage[];
  categories: CategoryPage[];
  breadcrumbLabel: string;
  title: string;
  description: string;
  overviewTitle: string;
  overviewText: string;
  categoryLinkLabel: string;
};

const primaryCategoryOrder = new Map<string, number>(
  homeCategoryOrder.map((category, index) => [category, index])
);

export default function LocalizedUnitGuideIndex({
  locale,
  homeHref,
  homeLabel,
  categoryPrefix,
  unitPrefix,
  units,
  categories,
  breadcrumbLabel,
  title,
  description,
  overviewTitle,
  overviewText,
  categoryLinkLabel,
}: Props) {
  const categoryById = new Map(categories.map((category) => [category.category, category]));
  const groups = Array.from(new Set(units.map((unit) => unit.category)))
    .map((category) => ({
      category,
      categoryPage: categoryById.get(category),
      units: units.filter((unit) => unit.category === category),
    }))
    .sort((left, right) => {
      const leftOrder = primaryCategoryOrder.get(left.category) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = primaryCategoryOrder.get(right.category) ?? Number.MAX_SAFE_INTEGER;
      const leftTitle = left.categoryPage?.title ?? left.units[0]?.categoryName ?? left.category;
      const rightTitle = right.categoryPage?.title ?? right.units[0]?.categoryName ?? right.category;

      return leftOrder - rightOrder || leftTitle.localeCompare(rightTitle, locale);
    });

  return (
    <main className="unit-information-page" lang={locale}>
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label={breadcrumbLabel}>
          <Link href={homeHref}>{homeLabel}</Link>
          <span aria-hidden="true">›</span>
          <span>{title}</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">SI</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>{overviewTitle}</h2>
            <p>{overviewText}</p>
          </section>

          {groups.map((group) => {
            const groupTitle = group.categoryPage?.title ?? group.units[0]?.categoryName ?? group.category;
            const categoryHref = group.categoryPage
              ? `${categoryPrefix}${group.categoryPage.slug}`
              : undefined;

            return (
              <section className="conversion-section related-conversions" key={group.category}>
                <h2>{categoryHref ? <Link href={categoryHref}>{groupTitle}</Link> : groupTitle}</h2>
                {categoryHref && (
                  <p>
                    <Link className="text-link" href={categoryHref}>
                      {categoryLinkLabel}
                    </Link>
                  </p>
                )}
                <ul className="related-conversion-list">
                  {group.units.map((unit) => (
                    <li key={unit.slug}>
                      <Link href={`${unitPrefix}${unit.slug}`}>
                        <strong>{unit.name}</strong>
                        {" — "}
                        {unit.symbol}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}
