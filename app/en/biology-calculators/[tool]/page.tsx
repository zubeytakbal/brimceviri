import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BiologyCoreCalculator } from "../../../components/EnglishScienceCalculators";
import { StemLimitations, StemMethods, StemWorkedExamples } from "../../../components/StemMethodNotes";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const tools = getEnglishScienceToolsBySubject("biology");
type PageProps = { params: Promise<{ tool: string }> };

export function generateStaticParams() { return [{ tool: "dna-sequence-helper" }]; }
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = slug === "dna-sequence-helper" ? tools[0] : undefined;
  if (!tool) return {};
  return { title: `${tool.title} | ${SITE_NAME}`, description: tool.description, alternates: { canonical: tool.href, languages: { en: tool.href } }, openGraph: { title: tool.title, description: tool.description, url: buildSiteUrl(tool.href), siteName: SITE_NAME, locale: "en_US", type: "website" } };
}

export default async function BiologyToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = slug === "dna-sequence-helper" ? tools[0] : undefined;
  if (!tool) notFound();
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { href: "/en/biology-calculators", label: "Biology Calculators" }, { label: tool.title }]} title={tool.title} description={tool.description} sections={[{ heading: "Calculator", content: <BiologyCoreCalculator /> }, { heading: "Method and input format", content: <StemMethods tools={[tool]} /> }, { heading: "Worked example", content: <StemWorkedExamples tools={[tool]} /> }, { heading: "Important limits", content: <StemLimitations tools={[tool]} /> }]} />;
}
