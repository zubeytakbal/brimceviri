import type { Metadata } from "next";
import Link from "next/link";
import EnglishThermalExpansionCalculator from "../../../components/EnglishThermalExpansionCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/calculators/thermal-expansion";

const faqItems: FaqItem[] = [
  { question: "How is linear thermal expansion calculated?", answer: "The calculator uses ΔL = L₀ × α × ΔT. L₀ is the original length, α is the material's linear expansion coefficient, and ΔT is the temperature change." },
  { question: "Can I use Fahrenheit for a temperature change?", answer: "Yes. A temperature difference of 1 °F equals 5/9 K or °C, so the calculator converts a Fahrenheit difference before applying the formula." },
  { question: "Is this suitable for final engineering design?", answer: "It is a first-pass linear estimate. Final design needs the exact material grade, operating range, constraints, joints and the applicable engineering standard." },
];

export const metadata: Metadata = {
  title: "Thermal Expansion Calculator (ΔL = L₀ × α × ΔT)",
  description: "Calculate linear thermal expansion from material, original length and temperature change, with metric and Imperial input options.",
  alternates: { canonical: pagePath, languages: { tr: "/isil-genlesme-hesaplama", en: pagePath, "x-default": "/isil-genlesme-hesaplama" } },
  openGraph: { title: "Thermal Expansion Calculator", description: "Estimate a material's linear length change from temperature change.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishThermalExpansionPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") },
    { "@type": "ListItem", position: 2, name: "Engineering Calculators", item: buildSiteUrl("/en/engineering-calculators") },
    { "@type": "ListItem", position: 3, name: "Thermal Expansion Calculator", item: buildSiteUrl(pagePath) },
  ] };

  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><span>Thermal Expansion Calculator</span></nav><header className="all-conversions-header"><h1>Thermal Expansion Calculator</h1><p>Estimate the linear length change of a material caused by heating or cooling. Select a material, enter its original length and enter the temperature change in metric or Imperial units.</p></header><EnglishThermalExpansionCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Formula:</strong> ΔL = L₀ × α × ΔT.</p><ul><li><strong>ΔL</strong> — change in length</li><li><strong>L₀</strong> — original unconstrained length</li><li><strong>α</strong> — linear thermal-expansion coefficient</li><li><strong>ΔT</strong> — temperature change, not the absolute temperature</li></ul><h2>Worked example</h2><p>A 10 m aluminum member with α = 22 × 10⁻⁶/K heated by 40 °C changes length by 10 × 22 × 10⁻⁶ × 40 = 0.0088 m, or 8.8 mm.</p><h2>When this estimate applies</h2><p>This is a linear, free-expansion estimate. It is useful for early checks of rails, pipe runs, frames and long members where a temperature swing may matter.</p><h2>Important limits</h2><p>It does not calculate thermal stress in a restrained member, nonlinear behavior over wide temperature ranges, gradients through a part, phase changes or connection and joint movement. Use the relevant material data and applicable code for final design.</p><h2>References</h2><ul><li><a href="https://openstax.org/books/college-physics/pages/13-3-thermal-expansion" target="_blank" rel="noreferrer">OpenStax: Thermal Expansion</a></li><li><a href="https://www.nist.gov/pml/special-publication-811" target="_blank" rel="noreferrer">NIST Guide for the Use of the International System of Units</a></li></ul><h2>Related tools</h2><p><Link href="/en/calculators/heat-energy">Heat Energy Calculator</Link> · <Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators">Engineering Calculators</Link></p></article></div></main>;
}
