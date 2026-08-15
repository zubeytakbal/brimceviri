import Link from "next/link";
import type { ReactNode } from "react";
import type { ConversionCard } from "./categoryPageUtils";
import {
  DecorativeIcon,
  getCalculatorIconName,
} from "./siteIcons";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type UnitGuideLink = {
  href: string;
  label: string;
  symbol: string;
};

type CalculatorLink = {
  slug: string;
  href: string;
  label: string;
  formula: string;
};

type FooterLink = {
  href: string;
  label: string;
};

type CategoryPageLayoutProps = {
  locale: "tr" | "en";
  structuredData?: ReactNode;
  breadcrumbAriaLabel: string;
  breadcrumbs: BreadcrumbItem[];
  kickerLabel: string;
  title: string;
  description: string;
  allUnitsSection?: {
    heading: string;
    content: ReactNode;
  };
  conversionHeading: string;
  conversionCountLabel: string;
  conversionCards: ConversionCard[];
  calculatorSection?: {
    heading: string;
    countLabel: string;
    calculators: CalculatorLink[];
  };
  unitGuidesHeading: string;
  unitGuidesCountLabel: string;
  unitGuides: UnitGuideLink[];
  detailHeading: string;
  detailContent: ReactNode;
  footerLink?: FooterLink;
};

export default function CategoryPageLayout({
  locale,
  structuredData,
  breadcrumbAriaLabel,
  breadcrumbs,
  kickerLabel,
  title,
  description,
  allUnitsSection,
  conversionHeading,
  conversionCountLabel,
  conversionCards,
  calculatorSection,
  unitGuidesHeading,
  unitGuidesCountLabel,
  unitGuides,
  detailHeading,
  detailContent,
  footerLink,
}: CategoryPageLayoutProps) {
  return (
    <main className="category-page" lang={locale}>
      {structuredData}

      <div className="category-page-shell category-page-breadcrumb-shell">
        <nav
          className="breadcrumbs"
          aria-label={breadcrumbAriaLabel}
        >
          {breadcrumbs.map((breadcrumb, index) => (
            <span
              className="category-breadcrumb-item"
              key={`${breadcrumb.label}-${index}`}
            >
              {index > 0 && (
                <span aria-hidden="true">›</span>
              )}

              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>
                  {breadcrumb.label}
                </Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <section className="category-page-hero">
        <div
          className={`category-page-hero-grid${
            allUnitsSection
              ? " has-converter"
              : ""
          }`}
        >
          <header className="category-page-header">
            <p className="category-page-kicker">{kickerLabel}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>

          {allUnitsSection && (
            <div className="category-page-hero-panel">
              <div className="category-page-hero-panel-heading">
                <h2>{allUnitsSection.heading}</h2>
              </div>
              {allUnitsSection.content}
            </div>
          )}
        </div>
      </section>

      <div className="category-page-shell category-page-content-shell">
        <section className="category-page-section">
          <div className="category-section-heading">
            <h2>{conversionHeading}</h2>
            <span>{conversionCountLabel}</span>
          </div>

          <ul className="category-conversion-list">
            {conversionCards.map((conversionCard) => (
              <li key={conversionCard.key}>
                <article className="category-conversion-card">
                  <div className="category-conversion-copy">
                    <h3 className="category-conversion-title">
                      <DecorativeIcon
                        className="category-link-icon"
                        name="allConversions"
                        size={18}
                      />
                      {conversionCard.title}
                    </h3>
                    <p>{conversionCard.symbol}</p>
                  </div>

                  <div className="category-conversion-actions">
                    {conversionCard.links.map((link) => (
                      <Link href={link.href} key={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="category-page-section">
          <div className="category-section-heading">
            <h2>{unitGuidesHeading}</h2>
            <span>{unitGuidesCountLabel}</span>
          </div>

          <ul className="category-unit-list">
            {unitGuides.map((unitGuide) => (
              <li key={unitGuide.href}>
                <Link href={unitGuide.href}>
                  <DecorativeIcon
                    className="category-link-icon"
                    name="unitGuide"
                    size={18}
                  />
                  <span>
                    {unitGuide.label}
                    <small>{unitGuide.symbol}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {calculatorSection &&
          calculatorSection.calculators.length > 0 && (
            <section className="category-page-section">
              <div className="category-section-heading">
                <h2>{calculatorSection.heading}</h2>
                <span>{calculatorSection.countLabel}</span>
              </div>

              <ul className="category-calculator-list">
                {calculatorSection.calculators.map((calculator) => (
                  <li key={calculator.href}>
                    <Link
                      className="category-calculator-card"
                      href={calculator.href}
                    >
                      <span className="category-tool-title">
                        <DecorativeIcon
                          className="category-card-icon"
                          name={getCalculatorIconName(calculator.slug)}
                          size={28}
                        />
                        <strong>{calculator.label}</strong>
                      </span>
                      <span className="category-tool-formula">
                        {calculator.formula}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

        <section className="category-page-section">
          <div className="category-section-heading">
            <h2>{detailHeading}</h2>
          </div>
          {detailContent}
        </section>

        {footerLink && (
          <div className="category-page-footer-link">
            <Link href={footerLink.href}>
              <DecorativeIcon
                className="category-link-icon"
                name="allConversions"
                size={18}
              />
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
