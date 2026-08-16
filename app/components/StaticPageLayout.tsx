import Link from "next/link";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type StaticPageSection = {
  heading: string;
  content: ReactNode;
};

type StaticPageLayoutProps = {
  locale: "tr" | "en" | "de";
  breadcrumbAriaLabel: string;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  sections: StaticPageSection[];
  alternateLink?: {
    href: string;
    hrefLang: string;
    label: string;
  };
};

export default function StaticPageLayout({
  locale,
  breadcrumbAriaLabel,
  breadcrumbs,
  title,
  description,
  sections,
  alternateLink,
}: StaticPageLayoutProps) {
  return (
    <main className="unit-information-page" lang={locale}>
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label={breadcrumbAriaLabel}>
          {breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 && <span aria-hidden="true"> › </span>}
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </span>
          ))}
        </nav>

        <header className="unit-page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className="unit-page-content">
          {sections.map((section) => (
            <section className="conversion-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.content}
            </section>
          ))}

          {alternateLink && (
            <section className="conversion-section language-alternatives">
              <h2>
                {locale === "en"
                  ? "Other languages"
                  : locale === "de"
                    ? "Weitere Sprachen"
                    : "Diğer diller"}
              </h2>
              <Link
                className="text-link"
                href={alternateLink.href}
                hrefLang={alternateLink.hrefLang}
              >
                {alternateLink.label}
              </Link>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
