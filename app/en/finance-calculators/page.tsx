import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { englishFinanceTools } from "../../i18n/englishFinanceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/finance-calculators";
export const metadata: Metadata = { title: `Finance Calculators`, description: "Focused mortgage, amortization and compound-interest estimates with transparent assumptions.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Finance Calculators", description: "Focused personal-finance estimates with transparent assumptions.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function FinanceCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Finance Calculators", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: englishFinanceTools.length, itemListElement: englishFinanceTools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Finance Calculators" }]} title="Finance Calculators" description="Explore financial estimates with their formulas, inputs and practical limits visible." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{englishFinanceTools.map((tool) => <li key={tool.id}><Link href={tool.href}>{tool.title}</Link><span> - {tool.description}</span></li>)}</ul> }, { heading: "Important financial limits", content: <p>These are planning estimates, not lending, tax, legal or investment advice. Compare the result against official lender disclosures, account terms and your own professional advice where needed.</p> }]} /></>;
}
