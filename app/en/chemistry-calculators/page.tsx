import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/chemistry-calculators";
const tools = [
  { href: "/en/chemistry-calculators/molarity", title: "Molarity Calculator", description: "Solve M = n / V for molarity, amount of solute or solution volume." },
  { href: "/en/chemistry-calculators/ph", title: "pH Calculator", description: "Find pH, pOH, hydrogen-ion or hydroxide-ion concentration." },
  { href: "/en/chemistry-calculators/dilution", title: "Dilution Calculator", description: "Solve the C₁V₁ = C₂V₂ dilution equation for one missing value." },
  { href: "/en/chemistry-calculators/mole", title: "Mole Calculator", description: "Calculate moles, mass and particle count from a molar mass." },
  { href: "/en/chemistry-calculators/molality", title: "Molality Calculator", description: "Solve molality, solute amount or solvent mass." },
  { href: "/en/chemistry-calculators/ppm", title: "PPM Calculator", description: "Calculate mass-based parts per million concentration." },
  { href: "/en/chemistry-calculators/stoichiometry", title: "Stoichiometry Calculator", description: "Use a balanced-equation mole ratio to find theoretical product amount." },
  { href: "/en/chemistry-calculators/percent-yield", title: "Percent Yield Calculator", description: "Calculate percent, actual or theoretical reaction yield." },
  { href: "/en/chemistry-calculators/titration", title: "Titration Calculator", description: "Solve a simple acid-base equivalence relationship." },
  { href: "/en/chemistry-calculators/half-life", title: "Half-Life Calculator", description: "Calculate quantities and time for exponential radioactive decay." },
  { href: "/en/chemistry-calculators/kc", title: "Equilibrium Constant (Kc) Calculator", description: "Calculate Kc from concentrations at equilibrium." },
  { href: "/en/chemistry-calculators/cell-potential", title: "Cell Potential Calculator", description: "Calculate standard cell potential from reduction potentials." },
];

export const metadata: Metadata = {
  title: `Chemistry Calculators`,
  description: "Free chemistry calculators for solutions, stoichiometry, equilibrium, electrochemistry and radioactive decay.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: `Chemistry Calculators | ${SITE_NAME}`, description: "Free chemistry calculators for solutions, stoichiometry, equilibrium, electrochemistry and radioactive decay.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function ChemistryCalculatorsPage() {
  const url = buildSiteUrl(pagePath);
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Chemistry Calculators", description: metadata.description, url, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Chemistry Calculators" }]} title="Chemistry Calculators" description="Twelve practical tools for solution chemistry, reaction calculations, equilibrium, electrochemistry and decay." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.href}><Link href={tool.href}>{tool.title}</Link><span> — {tool.description}</span></li>)}</ul> }, { heading: "How to use these tools", content: <p>Enter values with consistent units, choose the unknown quantity, and check the displayed result before using it in laboratory work. These tools support learning and calculation checks; they do not replace a laboratory protocol, safety procedure or calibrated measurement.</p> }, { heading: "Chemistry references", content: <p>The calculators use standard relationships. See the <a href="https://goldbook.iupac.org/terms/view/A00295">IUPAC definition of amount concentration</a> and <a href="https://openstax.org/books/chemistry-2e/pages/3-3-molarity">OpenStax guidance on molarity and dilution</a>.</p> }]} /></>;
}
