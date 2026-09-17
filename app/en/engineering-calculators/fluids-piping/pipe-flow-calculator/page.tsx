import type { Metadata } from "next";
import Link from "next/link";
import EnglishPipeFlowCalculator from "../../../../components/EnglishPipeFlowCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/fluids-piping/pipe-flow-calculator";
const faqItems: FaqItem[] = [
  { question: "How do you calculate flow velocity in a pipe?", answer: "Use v = Q / A, where Q is volumetric flow rate and A is the internal cross-sectional area. For a circular pipe, A = πD²/4." },
  { question: "Should I enter nominal or internal pipe diameter?", answer: "Enter the actual internal diameter. Nominal sizes and wall thicknesses differ by material, schedule and standard, so they cannot be substituted automatically." },
  { question: "Does this calculate pressure loss?", answer: "No. Continuity relates flow, area and velocity. Pressure loss additionally depends on fluid properties, length, roughness, fittings and flow regime." },
];

export const metadata: Metadata = {
  title: "Pipe Flow Rate & Velocity Calculator (Q = A × v)",
  description: "Calculate pipe flow rate, mean velocity or internal diameter using the continuity equation with metric and Imperial units.",
  alternates: { canonical: pagePath, languages: { tr: "/boru-capi-hesaplama", en: pagePath, "x-default": "/boru-capi-hesaplama" } },
  openGraph: { title: "Pipe Flow Rate & Velocity Calculator", description: "Solve flow rate, velocity or internal diameter for a circular pipe.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function EnglishPipeFlowPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Fluids & Piping", item: buildSiteUrl("/en/engineering-calculators/fluids-piping") }, { "@type": "ListItem", position: 3, name: "Pipe Flow Rate & Velocity Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping</Link><span aria-hidden="true">›</span><span>Pipe Flow Rate &amp; Velocity Calculator</span></nav><header className="all-conversions-header"><h1>Pipe Flow Rate &amp; Velocity Calculator</h1><p>Calculate the missing flow rate, mean velocity or internal diameter for a circular pipe. Use metric or common US/Imperial engineering units.</p></header><EnglishPipeFlowCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Continuity equation:</strong> Q = A × v. For a circular pipe, A = πD² / 4.</p><ul><li><strong>Q</strong> — volumetric flow rate</li><li><strong>A</strong> — internal cross-sectional area</li><li><strong>v</strong> — mean flow velocity</li><li><strong>D</strong> — actual internal diameter</li></ul><h2>Worked example</h2><p>For 1.5 L/s through a 50 mm internal diameter, the area is 0.001963 m². The mean velocity is 0.0015 / 0.001963 = 0.764 m/s.</p><h2>What this is for</h2><p>Use it for early pipe and duct checks, comparing diameter options, and preparing inputs for a more complete pressure-loss calculation.</p><h2>Important limits</h2><p>The tool assumes a full circular flow path and reports mean velocity only. It does not account for pressure loss, pipe roughness, fittings, elevation, pump curves, two-phase flow, non-circular ducts or gas compressibility.</p><h2>References</h2><ul><li><a href="https://openstax.org/books/college-physics/pages/12-1-flow-rate-and-its-relation-to-velocity" target="_blank" rel="noreferrer">OpenStax: Flow Rate and Its Relation to Velocity</a></li><li><a href="https://www.nist.gov/pml/special-publication-811" target="_blank" rel="noreferrer">NIST Guide for the Use of the International System of Units</a></li></ul><h2>Related tools</h2><p><Link href="/en/calculators/reynolds-number">Reynolds Number Calculator</Link> · <Link href="/en/calculators/hydrostatic-pressure">Hydrostatic Pressure Calculator</Link> · <Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping Calculators</Link></p></article></div></main>;
}
