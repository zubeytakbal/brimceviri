import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForceCalculator, KineticEnergyCalculator, SpeedCalculator } from "../../../components/EnglishScienceCalculators";
import { StemLimitations, StemMethods, StemWorkedExamples } from "../../../components/StemMethodNotes";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const tools = getEnglishScienceToolsBySubject("physics");
const calculators = { speed: SpeedCalculator, force: ForceCalculator, "kinetic-energy": KineticEnergyCalculator } as const;
type PhysicsToolId = keyof typeof calculators;
type PageProps = { params: Promise<{ tool: string }> };

export function generateStaticParams() { return tools.map((tool) => ({ tool: tool.id })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: id } = await params;
  const tool = tools.find((item) => item.id === id);
  if (!tool) return {};
  return { title: `${tool.title} | ${SITE_NAME}`, description: tool.description, alternates: { canonical: tool.href, languages: { en: tool.href } }, openGraph: { title: tool.title, description: tool.description, url: buildSiteUrl(tool.href), siteName: SITE_NAME, locale: "en_US", type: "website" } };
}

export default async function PhysicsToolPage({ params }: PageProps) {
  const { tool: id } = await params;
  const tool = tools.find((item) => item.id === id);
  const Calculator = calculators[id as PhysicsToolId];
  if (!tool || !Calculator) notFound();
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { href: "/en/physics-calculators", label: "Physics Calculators" }, { label: tool.title }]} title={tool.title} description={tool.description} sections={[{ heading: "Calculator", content: <Calculator /> }, { heading: "Method, variables and units", content: <StemMethods tools={[tool]} /> }, { heading: "Worked example", content: <StemWorkedExamples tools={[tool]} /> }, { heading: "Important limits", content: <StemLimitations tools={[tool]} /> }]} />;
}
