
import Link from "@/app/components/SiteLink";
import { italianCategoryPages } from "../converter/localizedItalianCategoryPages";
import { italianConversionPages } from "../converter/localizedItalianConversionPages";
import { italianUnitPages } from "../converter/localizedItalianUnitPages";
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

function normalizeSearchTextIt(value: string) {
  return value
    .toLocaleLowerCase("it")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const primaryCategoryPages = homeCategoryOrder
  .map((categoryId) => italianCategoryPages.find((page) => page.category === categoryId))
  .filter((page): page is (typeof italianCategoryPages)[number] => Boolean(page));

const primaryCategoryCardsFromCategories = primaryCategoryPages.map((page) => ({
  id: page.category,
  href: `/it/categorie/${page.slug}`,
  title: page.title,
  description: page.description,
  iconName: getCategoryIconName(page.category) as SiteIconName,
}));

// I 4 "universali" (identita a 17 elementi del TR: 13 categorie + 4
// convertitori) -- non sono calcolatrici, sono parte dell'identita del sito.
const nicheCards: Array<{
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
}> = [
  {
    id: "shoe-size",
    href: "/it/convertitore-taglie-scarpe",
    title: "Convertitore di numeri di scarpe",
    description: "Confronta le numerazioni italiana/europea, americana e britannica per marca.",
    iconName: "shoeSize",
  },
  {
    id: "kitchen-measures",
    href: "/it/convertitore-misure-cucina",
    title: "Misure di cucina",
    description: "Converti tazze, cucchiai e grammi in base all'ingrediente.",
    iconName: "kitchenMeasures",
  },
  {
    id: "recipe-converter",
    href: "/it/convertitore-ricette",
    title: "Convertitore di ricette",
    description: "Incolla una ricetta e adatta le quantità con un moltiplicatore.",
    iconName: "recipe",
  },
  {
    id: "historical-units",
    href: "/it/unita-storiche",
    title: "Unità storiche",
    description: "Converti arşın, okka, dirhem e unità bizantine in unità moderne.",
    iconName: "historical",
  },
];

const primaryCategoryCards = [...primaryCategoryCardsFromCategories, ...nicheCards];

const secondaryCategoryCards = italianCategoryPages
  .filter((page) => !(homeCategoryOrder as readonly string[]).includes(page.category))
  .map((page) => ({
    id: page.category,
    href: `/it/categorie/${page.slug}`,
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
  .map((sourceSlug) => italianConversionPages.find((page) => page.sourceSlug === sourceSlug))
  .filter((page): page is (typeof italianConversionPages)[number] => Boolean(page));

const popularConversions = [
  ...preferredConversions,
  ...italianConversionPages.filter(
    (page) => !preferredConversions.some((preferred) => preferred.slug === page.slug)
  ),
]
  .slice(0, 6)
  .map((page) => ({
    id: page.slug,
    href: `/it/${page.slug}`,
    label: `${page.fromName} → ${page.toName}`,
    description: `${page.fromUnit} → ${page.toUnit}`,
  }));

const preferredUnitSourceSlugs = ["miliamper", "bar", "miligram", "yarda", "fahrenhayt"];

const popularUnits = preferredUnitSourceSlugs
  .map((sourceSlug) => {
    const unitPage = italianUnitPages.find((page) => page.sourceSlug === sourceSlug);

    if (!unitPage) {
      return null;
    }

    return {
      id: unitPage.slug,
      href: unitGlossaryHref("it", unitPage),
      label: unitPage.name,
      categoryLabel: unitPage.categoryName,
    };
  })
  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const searchables = italianConversionPages.map((page) => ({
  id: page.slug,
  href: `/it/${page.slug}`,
  label: `${page.fromName} → ${page.toName}`,
  description: `${page.fromUnit} → ${page.toUnit}`,
  categoryLabel: page.categoryName,
  searchText: normalizeSearchTextIt(
    [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug, page.categoryName].join(" ")
  ),
}));

const stats = {
  categories: primaryCategoryCards.length + secondaryCategoryCards.length,
  conversions: italianConversionPages.length,
};

/** Ana sayfa arama dizini; /arama-dizini/it.json olarak ayri yayinlanir (bkz. HomeSearch). */
export function homeSearchIndex() {
  return searchables;
}

export default function ItalianHomeDirectory({
  notifications = [],
}: {
  notifications?: SiteNotification[];
}) {

  return (
    <main className="directory-home" lang="it">
      <NotificationBell notifications={notifications} locale="it" />

      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Convertitore di unità in italiano</p>
            <h1>Trova subito la pagina di conversione giusta</h1>
            <p className="directory-lead">
              Converti lunghezza, massa, pressione e molte altre unità
              completamente in italiano, con guide alle unità chiare.
            </p>
          </div>

          <div className="directory-hero-panel">
            <HomeSearch
              locale="it"
              strings={{
                searchLabel: "Cerca una conversione",
                searchPlaceholder: "Es.: metri in piedi",
                searchHint: "Digita il nome di un'unità in italiano o inglese e premi Invio per aprire il primo risultato.",
                searchResultsLabel: "Risultati della ricerca",
                searchEmpty: "Nessun risultato trovato.",
                searchEnterHint: "Premi Invio per aprire",
                searchCategoryPrefix: "Categoria",
                openLabel: "Apri",
              }}
            />

            <dl className="directory-stats">
              <div>
                <dt>Categorie attive</dt>
                <dd>{stats.categories}</dd>
              </div>
              <div>
                <dt>Pagine di conversione</dt>
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
              <h2>Conversione di unità</h2>
              <p>Scegli una categoria per vedere tutte le unità e le pagine di conversione.</p>
            </div>

            <Link className="directory-section-link" href="/it/categorie">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Tutte le categorie
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
              <h3>Altre categorie di conversione</h3>
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
            <Link className="directory-section-link" href="/it/categorie">
              <DecorativeIcon className="directory-link-icon" name="allConversions" size={18} />
              Vedi tutte le categorie e le conversioni
            </Link>
          </div>
        </section>

        {popularConversions.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>Conversioni popolari</h2>
                <p>Accesso diretto alle conversioni più cercate.</p>
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
                <h2>Unità popolari</h2>
                <p>Guide dettagliate in italiano per le unità più cercate.</p>
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
