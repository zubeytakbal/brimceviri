import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath, englishDecisionSavingsTools } from "../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: `Decision & Savings Calculators`,
  description: "Free calculators for comparing recurring costs, savings and practical purchase decisions.",
  alternates: { canonical: englishDecisionSavingsHubPath, languages: { en: englishDecisionSavingsHubPath } },
  openGraph: { title: "Decision & Savings Calculators", description: "Free calculators for comparing recurring costs, savings and practical purchase decisions.", url: buildSiteUrl(englishDecisionSavingsHubPath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function DecisionSavingsCalculatorsPage() {
  const pageUrl = buildSiteUrl(englishDecisionSavingsHubPath);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Decision & Savings Calculators",
    description: "Free calculators for comparing recurring costs, savings and practical purchase decisions.",
    url: pageUrl,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: englishDecisionSavingsTools.length,
      itemListElement: englishDecisionSavingsTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: buildSiteUrl(tool.href),
      })),
    },
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Decision & Savings Calculators" }]} title="Decision & Savings Calculators" description="Compare recurring costs using your own prices and assumptions before you make a practical decision." sections={[{ heading: "Available calculators", content: <ul className="related-conversion-list">{englishDecisionSavingsTools.map((tool) => <li key={tool.slug}><Link href={tool.href}>{tool.title}</Link><span> — {tool.description}</span></li>)}</ul> }, { heading: "A careful approach to savings estimates", content: <p>Prices, tariffs, property conditions and personal habits vary by place. These tools show their assumptions in the inputs, so you can replace every cost with your own figure.</p> }]} /></>;
}
