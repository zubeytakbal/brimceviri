
import Link from "@/app/components/SiteLink";
import { norwegianCategoryPages } from "../converter/localizedNorwegianCategoryPages";
import { norwegianConversionPages } from "../converter/localizedNorwegianConversionPages";
import { norwegianUnitPages } from "../converter/localizedNorwegianUnitPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import type { SiteNotification } from "../converter/siteNotifications";
import { DecorativeIcon, getCategoryIconName, type SiteIconName } from "./siteIcons";
import NotificationBell from "./NotificationBell";
import NordicToolsSection from "./NordicToolsSection";

import HomeSearch from "./HomeSearch";
import { unitGlossaryHref } from "../converter/unitGlossary";
function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon className="home-category-icon-svg" name={name} size={44} />
    </span>
  );
}

function normalizeSearchTextNo(value: string) {
  return value
    .toLocaleLowerCase("no")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => norwegianCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof norwegianCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/no/kategorier/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// De 4 "universelle" verktoyene (TRs 17-elements-identitet: 13 kategorier +
// 4 omregnere) -- de er ikke kalkulatorer, men en del av sidens identitet.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/no/skostorrelser",
    title: "Skostørrelseomregner",
    description: "Sammenlign EU-, US- og UK-skostørrelser per merke.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/no/kjokkenmal-omregner",
    title: "Kjøkkenmål",
    description: "Regn om kopper, spiseskjeer og gram ut fra ingrediens.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/no/oppskriftomregner",
    title: "Oppskriftomregner",
    description: "Lim inn en oppskrift og skaler mengdene med en multiplikator.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/no/historiske-enheter",
    title: "Historiske enheter",
    description: "Regn om arşın, okka, dirhem og bysantinske enheter til moderne enheter.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = norwegianCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/no/kategorier/${page.slug}`,
    title: page.title,
    iconName: getCategoryIconName(page.category) as SiteIconName,
  }));

const preferredConversionSourceSlugs = [
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "metre-fit",
  "kilogram-gram",
  "kilogram-pound",
  "psi-bar",
];

const preferredConversions = preferredConversionSourceSlugs
  .map((sourceSlug) => norwegianConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof norwegianConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...norwegianConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/no/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = norwegianUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: unitGlossaryHref("no", unitPage),
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = norwegianConversionPages.map((page) => ({
  id: page.slug,
  href: `/no/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextNo(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: norwegianConversionPages.length,
};

/** Ana sayfa arama dizini; /arama-dizini/no.json olarak ayri yayinlanir (bkz. HomeSearch). */
export function homeSearchIndex() {
  return searchables;
}

export default function NorwegianHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {

  return (
    <main className="directory-home" lang="nb">
      <NotificationBell notifications={notifications} locale="no" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Enhetsomregner på norsk</p>
            <h1>Finn enhetsomregningen du trenger</h1>
            <p className="directory-lead">
              Regn om lengde, masse, trykk og mange andre enheter helt på
              norsk, med tydelige enhetsguider.
            </p>
          </div>

          <div className="directory-hero-panel">
            <HomeSearch
              locale="no"
              strings={{
                searchLabel: "Søk en omregning",
                searchPlaceholder: "F.eks.: meter fot",
                searchHint: "Skriv navnet på en enhet på norsk eller engelsk og trykk Enter for å åpne det første resultatet.",
                searchResultsLabel: "Søkeresultater",
                searchEmpty: "Ingen treff funnet.",
                searchEnterHint: "Trykk Enter for å åpne",
                searchCategoryPrefix: "Kategori",
                openLabel: "Åpne",
              }}
            />

            <dl className="directory-stats">
              <div>
                <dt>Aktive kategorier</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Omregningssider</dt>
                <dd>{stats.conversions}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>Enhetsomregning</h2>
              <p>Velg en kategori for å se alle enheter og omregningssider.</p>
            </div>

            <Link className="directory-section-link" href="/no/kategorier">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Alle kategorier
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {primaryCategoryCards.map((category) => (
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.title} - ${category.description}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={category.iconName} />
                  <h3 className="home-category-title">{category.title}</h3>
                </div>
              </article>
            ))}
          </div>

          {secondaryCategoryCards.length > 0 && (
            <div className="directory-secondary-categories">
              <h3>Flere omregningskategorier</h3>
              <div className="directory-home-category-grid">
                {secondaryCategoryCards.slice(0, 8).map((category) => (
                  <article className="directory-home-card" key={category.id}>
                    <Link
                      className="directory-card-stretch"
                      href={category.href}
                      aria-label={category.title}
                    />

                    <div className="directory-card-body directory-card-body-icon">
                      <CardIcon name={category.iconName} />
                      <h3 className="home-category-title">{category.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="directory-section-footer">
            <Link className="directory-section-link" href="/no/kategorier">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Se alle kategorier og omregninger
            </Link>
          </div>
        </section>

        <NordicToolsSection locale="no" />

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Populære omregninger</h2>
                <p>Direkte tilgang til de mest søkte omregningene.</p>
              </div>
            </header>

            <ul className="directory-popular-list">
              {popularConversions.map((conversion) => (
                <li key={conversion.id}>
                  <Link href={conversion.href}>
                    <span className="directory-conversion-title">{conversion.label}</span>
                    <small>{conversion.description}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {popularUnits.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Populære enheter</h2>
                <p>Detaljerte guider på norsk for de mest søkte enhetene.</p>
              </div>
            </header>

            <ul className="directory-popular-list">
              {popularUnits.map((unit) => (
                <li key={unit.id}>
                  <Link href={unit.href}>
                    <span className="directory-conversion-title">{unit.label}</span>
                    <small>{unit.categoryLabel}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
