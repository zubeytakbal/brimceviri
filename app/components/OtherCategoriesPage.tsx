"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";

type SearchableConversion = {
  id: string;
  href: string;
  label: string;
  description: string;
  searchText: string;
};

type SecondaryCategory = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
};

type OtherTool = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
  group?: string;
};

type Locale = "tr" | "en" | "de" | "ar";

type AlternateLink = {
  href: string;
  hrefLang: string;
  label: string;
};

const pageCopy = {
  tr: {
    homeHref: "/",
    homeLabel: "Ana Sayfa",
    breadcrumbAriaLabel: "Sayfa yolu",
    title: "Diger Donusumler",
    description:
      "Ana sayfada yer almayan, daha az bilinen ancak muhendislik ve bilim alanlarinda gercekten kullanilan birim kategorilerini burada bulabilirsiniz.",
    searchLabel: "Donusum ara",
    searchPlaceholder:
      "Ornek: newton, viskozite, beygirgucu, tork",
    searchButton: "Ac",
    searchHint:
      "Birim adi, sembol veya donusum cifti yazarak ilgili sayfayi bulun.",
    searchResultsTitle: "Arama sonuclari",
    searchResultsHint:
      "Ilk sonucu acmak icin Enter kullanabilirsiniz.",
    searchEmpty: "Eslesen donusum bulunamadi.",
    toolsTitle: "Araclar",
    categoriesTitle: "Kategoriler",
    otherLanguagesTitle: "Diger diller",
  },
  en: {
    homeHref: "/en",
    homeLabel: "Home",
    breadcrumbAriaLabel: "Breadcrumb",
    title: "Other Conversions",
    description:
      "Explore less prominent but still practical engineering and scientific conversion categories that do not appear on the homepage.",
    searchLabel: "Search conversions",
    searchPlaceholder:
      "Example: newton, viscosity, horsepower, torque",
    searchButton: "Open",
    searchHint:
      "Search by unit name, symbol or conversion pair to jump to the right page.",
    searchResultsTitle: "Search results",
    searchResultsHint:
      "Press Enter to open the first matching result.",
    searchEmpty: "No matching conversion was found.",
    toolsTitle: "Tools",
    categoriesTitle: "Categories",
    otherLanguagesTitle: "Other languages",
  },
  de: {
    homeHref: "/de",
    homeLabel: "Startseite",
    breadcrumbAriaLabel: "Brotkrumen",
    title: "Weitere Umrechnungen",
    description:
      "Entdecken Sie technische und wissenschaftliche Umrechnungskategorien, die nicht im Hauptverzeichnis der Startseite erscheinen.",
    searchLabel: "Umrechnungen suchen",
    searchPlaceholder:
      "Beispiel: newton, viskositaet, drehmoment",
    searchButton: "Oeffnen",
    searchHint:
      "Suchen Sie per Einheitenname, Symbol oder Umrechnungspaar nach der passenden Seite.",
    searchResultsTitle: "Suchergebnisse",
    searchResultsHint:
      "Mit Enter oeffnen Sie den ersten Treffer.",
    searchEmpty: "Keine passende Umrechnung gefunden.",
    toolsTitle: "Werkzeuge",
    categoriesTitle: "Kategorien",
    otherLanguagesTitle: "Weitere Sprachen",
  },
  ar: {
    homeHref: "/ar",
    homeLabel: "الرئيسية",
    breadcrumbAriaLabel: "مسار الصفحة",
    title: "أدوات إضافية",
    description:
      "اكتشف مجموعة من الحاسبات العملية التي بدأنا إطلاقها بالعربية بشكل تدريجي ومنظم.",
    searchLabel: "ابحث في الأدوات",
    searchPlaceholder: "مثال: ضريبة، نوم، طلاء، جري",
    searchButton: "افتح",
    searchHint:
      "ابحث باسم الأداة أو نوع الاستخدام للوصول بسرعة إلى الصفحة المناسبة.",
    searchResultsTitle: "نتائج البحث",
    searchResultsHint: "اضغط Enter لفتح أول نتيجة.",
    searchEmpty: "لم يتم العثور على نتيجة مطابقة.",
    toolsTitle: "الأدوات",
    categoriesTitle: "الفئات",
    otherLanguagesTitle: "لغات أخرى",
  },
} as const;

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon
        name={name}
        size={48}
        className="home-category-icon-svg"
      />
    </span>
  );
}

function normalizeSearchText(value: string, locale: Locale) {
  const localeName =
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : locale === "ar"
          ? "ar"
        : "en-US";

  return value
    .toLocaleLowerCase(localeName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export default function OtherCategoriesPage({
  conversions,
  categories,
  tools,
  locale = "tr",
  alternateLink,
}: {
  conversions: SearchableConversion[];
  categories: SecondaryCategory[];
  tools?: OtherTool[];
  locale?: Locale;
  alternateLink?: AlternateLink;
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const copy = pageCopy[locale];

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(
    deferredQuery,
    locale
  );

  const searchResults = normalizedQuery
    ? conversions
        .filter((conversion) =>
          conversion.searchText.includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  // Gruplu araclari (ust baslikli) siraya gore topla; group belirtilmeyen
  // araclar varsayilan "Araclar" baslığı altinda kalir -- bu, group hic
  // kullanilmayan diger diller (en/de/ar) icin mevcut davranisi korur.
  const toolGroups: { name: string; items: OtherTool[] }[] = [];
  if (tools) {
    const groupIndexByName = new Map<string, number>();
    for (const tool of tools) {
      const groupName = tool.group ?? copy.toolsTitle;
      let index = groupIndexByName.get(groupName);
      if (index === undefined) {
        index = toolGroups.length;
        groupIndexByName.set(groupName, index);
        toolGroups.push({ name: groupName, items: [] });
      }
      toolGroups[index].items.push(tool);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
    }
  }

  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav
          className="breadcrumbs"
          aria-label={copy.breadcrumbAriaLabel}
        >
          <Link href={copy.homeHref}>{copy.homeLabel}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{copy.title}</span>
        </nav>

        <header className="other-categories-header">
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        {conversions.length > 0 ? (
          <form
            className="directory-search other-categories-search"
            onSubmit={handleSubmit}
            role="search"
          >
          <label htmlFor={inputId}>{copy.searchLabel}</label>

          <div className="directory-search-field">
            <input
              id={inputId}
              type="search"
              value={query}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${inputId}-hint`}
              aria-controls={resultsId}
              onChange={(event) => setQuery(event.target.value)}
            />

            <button type="submit">
              <DecorativeIcon
                className="directory-button-icon"
                name="search"
                size={18}
              />
              {copy.searchButton}
            </button>
          </div>

          <p className="directory-search-hint" id={`${inputId}-hint`}>
            {copy.searchHint}
          </p>

          {query.trim() ? (
            <div className="directory-search-results-wrap">
              <div className="directory-search-results-head">
                <strong>{copy.searchResultsTitle}</strong>
                <span>{copy.searchResultsHint}</span>
              </div>

              {searchResults.length > 0 ? (
                <ul className="directory-search-results" id={resultsId}>
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link href={result.href}>
                        <span>{result.label}</span>
                        <small>{result.description}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="directory-search-empty">
                  {copy.searchEmpty}
                </p>
              )}
            </div>
          ) : null}
          </form>
        ) : null}

        {toolGroups.map((group) => (
          <section className="other-categories-section" key={group.name}>
            <h2>{group.name}</h2>
            <div className="directory-home-category-grid">
              {group.items.map((tool) => (
                <Link
                  className="directory-home-card"
                  href={tool.href}
                  key={tool.id}
                  aria-label={`${tool.title} - ${tool.description}`}
                >
                  <div className="directory-card-body directory-card-body-icon">
                    <CardIcon name={tool.iconName} />
                    <h3 className="home-category-title">{tool.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="other-categories-section">
          <h2>{copy.categoriesTitle}</h2>
          <div className="directory-home-category-grid">
            {categories.map((category) => (
              <Link
                className="directory-home-card"
                href={category.href}
                key={category.id}
                aria-label={`${category.title} - ${category.description}`}
              >
                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={category.iconName} />
                  <h3 className="home-category-title">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {alternateLink ? (
          <section className="conversion-section language-alternatives">
            <h2>{copy.otherLanguagesTitle}</h2>
            <Link
              className="text-link"
              href={alternateLink.href}
              hrefLang={alternateLink.hrefLang}
            >
              {alternateLink.label}
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}
