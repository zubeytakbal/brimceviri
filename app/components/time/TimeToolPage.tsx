import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import TableOfContents from "../TableOfContents";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

type Crumb = { href?: string; label: string };

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Zaman araci sayfalarinin ortak iskeleti: breadcrumb, baslik, arac, icindekiler, rehber, SSS.
export default function TimeToolPage({
  crumbs,
  crumbLabel,
  title,
  intro,
  tool,
  tocTitle,
  tocItems,
  faqTitle,
  faqItems,
  related,
  children,
}: {
  crumbs: Crumb[];
  crumbLabel: string;
  title: string;
  intro: ReactNode;
  tool: ReactNode;
  tocTitle: string;
  tocItems: Array<{ id: string; label: string }>;
  faqTitle: string;
  faqItems: FaqItem[];
  related?: { title: string; links: Array<{ href: string; label: string }> };
  children: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: buildSiteUrl(crumb.href) } : {}),
    })),
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label={crumbLabel}>
          {crumbs.map((crumb, index) => (
            <span key={crumb.label} className="breadcrumbs-item">
              {index > 0 ? <span aria-hidden="true">&rsaquo; </span> : null}
              {crumb.href && index < crumbs.length - 1 ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            </span>
          ))}
        </nav>

        <header className="all-conversions-header">
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>

        {tool}

        {related ? (
          <nav className="time-tool-related" aria-label={related.title}>
            <h2>{related.title}</h2>
            <ul>
              {related.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <TableOfContents title={tocTitle} items={tocItems} />

        <section className="category-article-content">
          {children}

          <h2 id="faq">{faqTitle}</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
