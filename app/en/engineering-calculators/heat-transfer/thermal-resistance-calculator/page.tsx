import type { Metadata } from "next";
import Link from "next/link";
import EnglishThermalResistanceCalculator from "../../../../components/EnglishThermalResistanceCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/thermal-resistance-calculator";
const faqItems: FaqItem[] = [
  { question: "How are thermal resistance and U-value calculated?", answer: "For each homogeneous layer, R = L / k. Layer resistances are added, and layer-only U-value is 1 divided by that total resistance." },
  { question: "Can I include inside and outside surface-film resistance?", answer: "Yes. Enter the Rsi and Rse values specified by your project method or standard. They are optional and default to zero, so the layer-only and supplied-film results remain distinct." },
  { question: "Can this calculator give a code-compliance U-value?", answer: "No. It is a transparent layer calculation. A code or energy-model assessment may also require thermal bridges, repeating framing, cavities, fasteners, junctions, moisture effects and the prescribed surface-resistance method." },
];

export const metadata: Metadata = {
  title: "Thermal Resistance & U-value Calculator",
  description: "Calculate layered thermal resistance, layer-only U-value and a U-value with user-supplied surface-film resistance for a stated assembly.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Thermal Resistance & U-value Calculator", description: "Calculate R-value and U-value for a stated construction assembly with optional supplied surface films.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function ThermalResistanceCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "Thermal Resistance & U-value Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Thermal Resistance &amp; U-value Calculator</span></nav><header className="all-conversions-header"><h1>Thermal Resistance &amp; U-value Calculator</h1><p>Build a layered assembly, inspect the resistance of every layer, and optionally add the surface-film values prescribed for your calculation method.</p></header><EnglishThermalResistanceCalculator /><article className="category-article-content"><h2>Method</h2><p>For each homogeneous layer, R = L / k. The total layer resistance is the sum of each layer&apos;s R-value, and U = 1 / R<sub>total</sub>. If you supply inside and outside surface-film resistances, they are added separately and the calculator reports a second U-value.</p><h2>Worked example</h2><p>A 100 mm mineral-wool layer with k = 0.037 W/(m·K) has R = 0.100 / 0.037 = 2.70 m²·K/W. Its layer-only U-value is about 0.37 W/(m²·K). Add surface-film values only when your project method specifies them.</p><h2>Important limits</h2><p>This is not a whole-assembly or code-compliance calculation. The material presets are reference values, not product certification. Thermal bridges, framing, gaps, moisture effects, air movement, cavities, fasteners and junction details require their own treatment.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/heat-loss-calculator">Heat Loss Calculator</Link> · <Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
