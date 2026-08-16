"use client";

import Link from "next/link";
import {
  Barbell,
  Clock,
  Cylinder,
  Gauge,
  Lightning,
  Plug,
  Ruler,
  Square,
  Thermometer,
  Waves,
} from "@phosphor-icons/react";
import { useDeferredValue, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { DecorativeIcon } from "./siteIcons";
import { germanCalculatorPages } from "../converter/localizedGermanCalculatorPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";
import { germanStaticPaths } from "../i18n/germanRoutes";

type IconName =
  | "uzunluk"
  | "alan"
  | "hacim"
  | "kutle"
  | "sicaklik"
  | "zaman"
  | "hiz"
  | "basinc"
  | "enerji"
  | "debi"
  | "elektrik";

const categoryMeta: Record<
  string,
  { name: string; description: string; icon: IconName }
> = {
  uzunluk: {
    name: "Länge",
    description:
      "Öffnen Sie Umrechnungen für Meter, Kilometer, Zentimeter, Zoll und Fuß.",
    icon: "uzunluk",
  },
  alan: {
    name: "Fläche",
    description:
      "Vergleichen Sie Quadratmeter, Hektar und Quadratfuß auf einer Kategorieseite.",
    icon: "alan",
  },
  hacim: {
    name: "Volumen",
    description:
      "Öffnen Sie Umrechnungen für Liter, Milliliter und Kubikmeter.",
    icon: "hacim",
  },
  kutle: {
    name: "Masse",
    description:
      "Springen Sie zu Kilogramm-, Gramm-, Tonne-, Pfund- und Unzen-Umrechnungen.",
    icon: "kutle",
  },
  sicaklik: {
    name: "Temperatur",
    description:
      "Öffnen Sie Celsius-, Fahrenheit- und Kelvin-Umrechnungen.",
    icon: "sicaklik",
  },
  zaman: {
    name: "Zeit",
    description:
      "Rechnen Sie Sekunden, Minuten und Stunden gegeneinander um.",
    icon: "zaman",
  },
  hiz: {
    name: "Geschwindigkeit",
    description:
      "Vergleichen Sie km/h, m/s und mph in echten Umrechnungsseiten.",
    icon: "hiz",
  },
  basinc: {
    name: "Druck",
    description:
      "Öffnen Sie Pascal-, bar-, psi- und andere Druckumrechnungen.",
    icon: "basinc",
  },
  enerji: {
    name: "Energie und Leistung",
    description:
      "Vergleichen Sie Joule, Kilowattstunde, Watt und Kilowatt.",
    icon: "enerji",
  },
  debi: {
    name: "Durchfluss",
    description:
      "Öffnen Sie Volumenstrom-Umrechnungen für m³/h und L/min.",
    icon: "debi",
  },
  elektrik: {
    name: "Elektrizität",
    description:
      "Öffnen Sie grundlegende Umrechnungen für Spannung und Stromstärke.",
    icon: "elektrik",
  },
};

const categoryOrder = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "debi",
  "elektrik",
] as const;

const preferredSourceSlugs = [
  "metre-kilometre",
  "metre-santimetre",
  "kilogram-gram",
  "kilogram-pound",
  "psi-bar",
  "kilopascal-bar",
] as const;

function HomeCategoryIcon({ kind }: { kind: IconName }) {
  const Icon =
    kind === "uzunluk"
      ? Ruler
      : kind === "alan"
        ? Square
        : kind === "hacim"
          ? Cylinder
          : kind === "kutle"
            ? Barbell
            : kind === "sicaklik"
              ? Thermometer
              : kind === "zaman"
                ? Clock
                : kind === "hiz"
                  ? Gauge
                  : kind === "basinc"
                    ? Gauge
                    : kind === "enerji"
                      ? Lightning
                      : kind === "debi"
                        ? Waves
                        : Plug;

  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <Icon className="home-category-icon-svg" size={42} weight="regular" />
    </span>
  );
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortByPreference<T extends { sourceSlug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = preferredSourceSlugs.indexOf(
      left.sourceSlug as (typeof preferredSourceSlugs)[number]
    );
    const rightIndex = preferredSourceSlugs.indexOf(
      right.sourceSlug as (typeof preferredSourceSlugs)[number]
    );

    const safeLeft =
      leftIndex === -1 ? preferredSourceSlugs.length : leftIndex;
    const safeRight =
      rightIndex === -1 ? preferredSourceSlugs.length : rightIndex;

    return safeLeft - safeRight;
  });
}

export default function GermanHomeDirectory() {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(deferredQuery);

  const searchResults = normalizedQuery
    ? germanConversionPages
        .filter((conversion) =>
          normalizeSearchText(
            [
              conversion.fromName,
              conversion.toName,
              conversion.fromUnit,
              conversion.toUnit,
              conversion.slug,
              conversion.categoryName,
            ].join(" ")
          ).includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  const categoryCards = categoryOrder.flatMap((category) => {
    const categoryPage = germanCategoryPages.find(
      (page) => page.category === category
    );
    const meta = categoryMeta[category];

    if (!categoryPage || !meta) {
      return [];
    }

    const links = sortByPreference(
      germanConversionPages.filter((page) => page.category === category)
    ).slice(0, 2);

    if (links.length === 0) {
      return [];
    }

    return [
      {
        ...meta,
        id: category,
        href: `/de/kategorien/${categoryPage.slug}`,
        links: links.map((conversion) => ({
          id: conversion.slug,
          href: `/de/${conversion.slug}`,
          label: `${conversion.fromName} → ${conversion.toName}`,
        })),
      },
    ];
  });

  const popularConversions = [
    ...preferredSourceSlugs.flatMap((sourceSlug) => {
      const page = germanConversionPages.find(
        (item) => item.sourceSlug === sourceSlug
      );
      return page ? [page] : [];
    }),
    ...germanConversionPages.filter(
      (page) =>
        !preferredSourceSlugs.includes(
          page.sourceSlug as (typeof preferredSourceSlugs)[number]
        )
    ),
  ].slice(0, 6);

  const engineeringCalculators = [
    "basinc-kuvvet-alan",
    "hidrostatik-basinc",
    "isi-enerjisi",
    "isi-iletimi",
    "reynolds-sayisi",
  ].flatMap((sourceSlug) => {
    const page = germanCalculatorPages.find(
      (item) => item.sourceSlug === sourceSlug
    );
    return page ? [page] : [];
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(`/de/${searchResults[0].slug}`);
    }
  }

  return (
    <main className="directory-home" lang="de">
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Technische Einheitenumrechnungen</p>
            <h1>Die passende Umrechnung schnell finden</h1>
            <p className="directory-lead">
              Suchen Sie direkt nach einer Umrechnungsseite oder wählen Sie die passende physikalische Größe.
            </p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>Umrechnung suchen</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder="Beispiel: meter kilometer, kg pfund, psi bar"
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
                  Öffnen
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                Suchen Sie nach Einheitenname, Symbol oder Umrechnungspaar, um die passende Seite direkt zu öffnen.
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>Suchergebnisse</strong>
                    <span>Drücken Sie Enter, um das erste Ergebnis zu öffnen.</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.slug}>
                          <Link href={`/de/${result.slug}`}>
                            <span>
                              {result.fromName} → {result.toName}
                            </span>
                            <small>
                              Kategorie: {result.categoryName} · {result.fromUnit} →{" "}
                              {result.toUnit}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">
                      Keine passende Umrechnungsseite gefunden.
                    </p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>Kategorien</dt>
                <dd>{categoryCards.length}</dd>
              </div>
              <div>
                <dt>Umrechnungsseiten</dt>
                <dd>{germanConversionPages.length}</dd>
              </div>
              <div>
                <dt>Rechner</dt>
                <dd>{engineeringCalculators.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>Einheitenumrechnungen</h2>
              <p>
                Jede Karte öffnet eine echte Kategorieseite und zeigt direkte Beispiele aus dieser Einheitengruppe.
              </p>
            </div>

            <Link className="directory-section-link" href={germanStaticPaths.allConversions}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              Alle Umrechnungen
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {categoryCards.map((category) => (
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.name} öffnen`}
                />

                <div className="directory-card-body">
                  <div className="directory-card-top">
                    <span className="directory-card-badge" aria-hidden="true">
                      <HomeCategoryIcon kind={category.icon} />
                    </span>
                    <div>
                      <h3 className="home-category-title">{category.name}</h3>
                    </div>
                  </div>

                  <p className="directory-card-description">{category.description}</p>

                  <ul className="directory-card-links">
                    {category.links.map((link) => (
                      <li key={link.id}>
                        <Link className="directory-inline-link" href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="directory-card-footer">
                    <Link className="directory-category-guide" href={category.href}>
                      Kategorieseite öffnen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>Beliebte Umrechnungen</h2>
              <p>Direkte Einstiege zu häufig verwendeten deutschen Umrechnungsseiten.</p>
            </div>

            <Link className="directory-section-link" href={germanStaticPaths.allConversions}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              Alle Umrechnungen
            </Link>
          </header>

          <ul className="directory-popular-list">
            {popularConversions.map((conversion) => (
              <li key={conversion.slug}>
                <Link href={`/de/${conversion.slug}`}>
                  <span className="directory-conversion-title">
                    {conversion.fromName} → {conversion.toName}
                  </span>
                  <small>
                    {conversion.fromUnit} → {conversion.toUnit}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="directory-section" id="engineering-calculators">
          <header className="directory-section-header">
            <div>
              <h2>Ingenieurrechner</h2>
              <p>
                Technische Werkzeuge für Druck, Strömung und Wärmeübertragung.
              </p>
            </div>

            <Link className="directory-section-link" href={germanStaticPaths.engineeringHub}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              Alle Ingenieurrechner
            </Link>
          </header>

          <div className="directory-tool-grid">
            {engineeringCalculators.map((calculator) => (
              <article className="directory-home-card directory-tool-card" key={calculator.slug}>
                <Link
                  className="directory-card-stretch"
                  href={`/de/rechner/${calculator.slug}`}
                  aria-label={calculator.shortTitle}
                />

                <div className="directory-card-body">
                  <div className="directory-tool-copy">
                    <p className="directory-card-formula">{calculator.formula}</p>
                    <h3 className="home-category-title">{calculator.shortTitle}</h3>
                    <p className="directory-card-description">
                      {calculator.description}
                    </p>
                  </div>

                  <div className="directory-card-footer">
                    <Link
                      className="directory-category-guide"
                      href={`/de/rechner/${calculator.slug}`}
                    >
                      Öffnen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
