import type { Metadata } from "next";
import Link from "next/link";
import EnglishElasticElongationCalculator from "../../../components/EnglishElasticElongationCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/calculators/elastic-elongation";
const faqItems: FaqItem[] = [
  { question: "How is elastic elongation calculated?", answer: "First calculate stress with σ = F / A. In the linear-elastic range, strain is ε = σ / E, then elongation is ΔL = ε × L₀." },
  { question: "What is Young's modulus?", answer: "Young's modulus, E, describes a material's stiffness in the elastic range. A higher value means less strain at the same stress." },
  { question: "Does the calculator check whether the part will fail?", answer: "No. It reports a linear-elastic estimate only. Yield, ultimate strength, buckling, fatigue, connections and code-required safety factors need separate checks." },
];

export const metadata: Metadata = {
  title: "Elastic Elongation Calculator (Hooke's Law)",
  description: "Calculate axial stress and linear-elastic elongation from force, cross-sectional area, length and Young's modulus in metric or Imperial units.",
  alternates: { canonical: pagePath, languages: { tr: "/elastik-uzama-hesaplama", en: pagePath, "x-default": "/elastik-uzama-hesaplama" } },
  openGraph: { title: "Elastic Elongation Calculator (Hooke's Law)", description: "Estimate axial stress and elastic elongation for a uniform member.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function EnglishElasticElongationPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Engineering Calculators", item: buildSiteUrl("/en/engineering-calculators") }, { "@type": "ListItem", position: 3, name: "Elastic Elongation Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><span>Elastic Elongation Calculator</span></nav><header className="all-conversions-header"><h1>Elastic Elongation Calculator</h1><p>Estimate axial stress and the elastic length change of a uniform member using Hooke&apos;s law. The calculator accepts common metric and Imperial input units.</p></header><EnglishElasticElongationCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Formulas:</strong> σ = F / A; ε = σ / E; ΔL = ε × L₀.</p><ul><li><strong>F</strong> — axial force</li><li><strong>A</strong> — cross-sectional area</li><li><strong>E</strong> — Young&apos;s modulus</li><li><strong>L₀</strong> — original length</li><li><strong>ΔL</strong> — predicted elastic change in length</li></ul><h2>Worked example</h2><p>A 1 m steel bar with a 100 mm² area, loaded axially with 10 kN, has a stress of 100 MPa. Using E = 200 GPa, its strain is 0.0005 and its elastic elongation is 0.5 mm.</p><h2>When to use it</h2><p>Use this for a first-pass, straight-member calculation when the load is axial, the cross-section is uniform and the material remains in its linear-elastic range.</p><h2>Important limits</h2><p>This tool does not evaluate yielding, plastic deformation, stress concentrations, bending, shear, buckling, fatigue, creep, temperature effects or structural code requirements. It is not a final design or safety check.</p><h2>References</h2><ul><li><a href="https://openstax.org/books/physics/pages/12-4-elasticity-and-plasticity" target="_blank" rel="noreferrer">OpenStax: Elasticity and Plasticity</a></li><li><a href="https://www.nist.gov/pml/special-publication-811" target="_blank" rel="noreferrer">NIST Guide for the Use of the International System of Units</a></li></ul><h2>Related tools</h2><p><Link href="/en/calculators/thermal-expansion">Thermal Expansion Calculator</Link> · <Link href="/en/calculators/pressure-force-area">Pressure, Force and Area Calculator</Link> · <Link href="/en/engineering-calculators">Engineering Calculators</Link></p></article></div></main>;
}
