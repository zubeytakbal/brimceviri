import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnglishBusinessMetricCalculator from "../../../components/EnglishBusinessMetricCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishBusinessTools, findEnglishBusinessTool } from "../../../i18n/englishBusinessToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

type PageProps = { params: Promise<{ tool: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return englishBusinessTools.map((tool) => ({ tool: tool.id })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = findEnglishBusinessTool(slug);
  if (!tool) return {};
  return { title: `${tool.title}`, description: tool.description, alternates: { canonical: tool.href, languages: { en: tool.href } }, openGraph: { title: tool.title, description: tool.description, url: buildSiteUrl(tool.href), siteName: SITE_NAME, locale: "en_US", type: "website" } };
}

export default async function BusinessToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = findEnglishBusinessTool(slug);
  if (!tool) notFound();
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/business-calculators", label: "Business Calculators" }, { label: tool.title }]} title={tool.title} description={tool.description} sections={[{ heading: "Calculator", content: <EnglishBusinessMetricCalculator metric={tool.id} /> }, { heading: "Method and inputs", content: <div className="category-article-content"><p><strong>Formula:</strong> {tool.formula}</p><p><strong>Inputs:</strong> {tool.inputs}</p></div> }, { heading: "Worked example", content: <p>{tool.workedExample}</p> }, { heading: "Important limits", content: <p>{tool.limitations}</p> }]} />;
}
