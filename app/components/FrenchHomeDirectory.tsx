
import Link from "@/app/components/SiteLink";
import { frenchCategoryPages } from "../converter/localizedFrenchCategoryPages";
import { frenchConversionPages } from "../converter/localizedFrenchConversionPages";
import { frenchUnitPages } from "../converter/localizedFrenchUnitPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import type { SiteNotification } from "../converter/siteNotifications";
import { DecorativeIcon, getCategoryIconName, type SiteIconName } from "./siteIcons";
import NotificationBell from "./NotificationBell";

import HomeSearch from "./HomeSearch";
import { unitGlossaryHref } from "../converter/unitGlossary";
function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon className="home-category-icon-svg" name={name} size={44} />
    </span>
  );
}

function normalizeSearchTextFr(value: string) {
  return value
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => frenchCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof frenchCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/fr/categories/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// TR/BN ana sayfasindaki gibi, salt birim-kategorisi olmayan ama kendi
// donusturucusu olan 4 "evrensel" arac ana kart gridine eklenir (13+4=17) --
// bunlar hesap makinesi degil, TR'nin 17 kartlik kimligine ait donusturucu.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/fr/convertisseur-de-pointures",
    title: "Convertisseur de pointures",
    description: "Comparez les pointures européennes, américaines et britanniques par marque.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/fr/convertisseur-mesures-cuisine",
    title: "Mesures de cuisine",
    description: "Convertissez tasses, cuillères et grammes selon l’ingrédient.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/fr/convertisseur-de-recettes",
    title: "Convertisseur de recettes",
    description: "Collez une recette et adaptez les quantités avec un multiplicateur.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/fr/unites-historiques",
    title: "Unités historiques",
    description: "Convertissez arşın, okka, dirhem et unités byzantines en unités modernes.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = frenchCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/fr/categories/${page.slug}`,
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
  .map((sourceSlug) => frenchConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof frenchConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...frenchConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/fr/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = frenchUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: unitGlossaryHref("fr", unitPage),
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = frenchConversionPages.map((page) => ({
  id: page.slug,
  href: `/fr/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextFr(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: frenchConversionPages.length,
};

/** Ana sayfa arama dizini; /arama-dizini/fr.json olarak ayri yayinlanir (bkz. HomeSearch). */
export function homeSearchIndex() {
  return searchables;
}

export default function FrenchHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {

  return (
    <main className="directory-home" lang="fr">
      <NotificationBell notifications={notifications} locale="fr" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Convertisseur d’unités en français</p>
            <h1>Trouvez rapidement la bonne page de conversion</h1>
            <p className="directory-lead">
              Convertissez la longueur, la masse, la pression et bien d’autres
              unités entièrement en français, avec des guides d’unités clairs.
            </p>
          </div>

          <div className="directory-hero-panel">
            <HomeSearch
              locale="fr"
              strings={{
                searchLabel: "Rechercher une conversion",
                searchPlaceholder: "Ex. : mètre pied",
                searchHint: "Écrivez le nom d’une unité en français ou en anglais, puis appuyez sur Entrée pour ouvrir le premier résultat.",
                searchResultsLabel: "Résultats de recherche",
                searchEmpty: "Aucun résultat trouvé.",
                searchEnterHint: "Appuyez sur Entrée pour ouvrir",
                searchCategoryPrefix: "Catégorie ",
                openLabel: "Ouvrir",
              }}
            />

            <dl className="directory-stats">
              <div>
                <dt>Catégories actives</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Pages de conversion</dt>
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
              <h2>Conversion d’unités</h2>
              <p>Choisissez une catégorie pour voir toutes ses unités et pages de conversion.</p>
            </div>

            <Link className="directory-section-link" href="/fr/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Toutes les catégories
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
              <h3>Autres catégories de conversion</h3>
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
            <Link className="directory-section-link" href="/fr/categories">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Voir toutes les catégories et conversions
            </Link>
          </div>
        </section>

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Conversions populaires</h2>
                <p>Accès direct aux conversions les plus recherchées.</p>
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
                <h2>Unités populaires</h2>
                <p>Guides détaillés en français pour les unités les plus recherchées.</p>
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
