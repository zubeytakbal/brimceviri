import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BiologyCoreCalculator, MathematicsCoreCalculator, PhysicsCoreCalculator } from "../../../components/EnglishScienceCalculators";
import { StemLimitations, StemMethods, StemWorkedExamples } from "../../../components/StemMethodNotes";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject, type EnglishScienceSubject } from "../../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const subjects = {
  mathematics: { title: "Mathematics Calculators", description: "Calculate percentages, arithmetic means and real roots of quadratic equations.", component: MathematicsCoreCalculator },
  physics: { title: "Physics Calculators", description: "Calculate speed, force and kinetic energy with basic SI relationships.", component: PhysicsCoreCalculator },
  biology: { title: "Biology Calculators", description: "Find complementary DNA, reverse complement, complementary RNA and GC content from a DNA sequence.", component: BiologyCoreCalculator },
} as const;

type Subject = keyof typeof subjects;
type PageProps = { params: Promise<{ subject: string }> };

export function generateStaticParams() { return Object.keys(subjects).map((subject) => ({ subject })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  const item = subjects[subject as Subject];
  if (!item) return {};
  const path = `/en/science-calculators/${subject}`;
  return { title: `${item.title}`, description: item.description, alternates: { canonical: path, languages: { en: path } }, openGraph: { title: item.title, description: item.description, url: buildSiteUrl(path), siteName: SITE_NAME, locale: "en_US", type: "website" } };
}

export default async function ScienceSubjectPage({ params }: PageProps) {
  const { subject } = await params;
  if (subject === "physics") redirect("/en/physics-calculators");
  if (subject === "mathematics") redirect("/en/mathematics-calculators");
  if (subject === "biology") redirect("/en/biology-calculators");
  const item = subjects[subject as Subject];
  if (!item) notFound();
  const Calculator = item.component;
  const tools = getEnglishScienceToolsBySubject(subject as EnglishScienceSubject);

  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/science-calculators", label: "Science Calculators" }, { label: item.title }]} title={item.title} description={item.description} sections={[
    { heading: "Calculator", content: <Calculator /> },
    { heading: "Methods, variables and units", content: <StemMethods tools={tools} /> },
    { heading: "Worked examples", content: <StemWorkedExamples tools={tools} /> },
    { heading: "Important limits", content: <StemLimitations tools={tools} /> },
    { heading: "Related science calculators", content: <p>Return to <Link href="/en/science-calculators">Science Calculators</Link> or open the full <Link href="/en/chemistry-calculators">Chemistry Calculators</Link> collection.</p> },
  ]} />;
}
