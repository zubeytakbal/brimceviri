import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeanCalculator, PercentageCalculator, QuadraticRootsCalculator } from "../../../components/EnglishScienceCalculators";
import { StemLimitations, StemMethods, StemWorkedExamples } from "../../../components/StemMethodNotes";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const tools = getEnglishScienceToolsBySubject("mathematics");
const calculators = { percentage: PercentageCalculator, mean: MeanCalculator, quadratic: QuadraticRootsCalculator } as const;
type MathematicsToolId = keyof typeof calculators;
type PageProps = { params: Promise<{ tool: string }> };

export function generateStaticParams() { return tools.map((tool) => ({ tool: tool.id === "quadratic" ? "quadratic-roots" : tool.id })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = tools.find((item) => (item.id === "quadratic" ? "quadratic-roots" : item.id) === slug);
  if (!tool) return {};
  return { title: `${tool.title} | ${SITE_NAME}`, description: tool.description, alternates: { canonical: tool.href, languages: { en: tool.href } }, openGraph: { title: tool.title, description: tool.description, url: buildSiteUrl(tool.href), siteName: SITE_NAME, locale: "en_US", type: "website" } };
}

export default async function MathematicsToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = tools.find((item) => (item.id === "quadratic" ? "quadratic-roots" : item.id) === slug);
  const calculatorId = slug === "quadratic-roots" ? "quadratic" : slug;
  const Calculator = calculators[calculatorId as MathematicsToolId];
  if (!tool || !Calculator) notFound();
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { href: "/en/mathematics-calculators", label: "Mathematics Calculators" }, { label: tool.title }]} title={tool.title} description={tool.description} sections={[{ heading: "Calculator", content: <Calculator /> }, { heading: "Method and variables", content: <StemMethods tools={[tool]} /> }, { heading: "Worked example", content: <StemWorkedExamples tools={[tool]} /> }, { heading: "Important limits", content: <StemLimitations tools={[tool]} /> }]} />;
}
