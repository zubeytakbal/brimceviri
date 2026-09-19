import type { Metadata } from "next";
import Link from "next/link";
import EnglishRadiativeHeatTransferCalculator from "../../../../components/EnglishRadiativeHeatTransferCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/radiative-heat-transfer-calculator";
const faqItems: FaqItem[] = [
  { question: "What radiation equation does this calculator use?", answer: "It uses Q̇ = ε × F × σ × A × (Ts⁴ − Tsur⁴), where ε is emissivity, F is the effective view factor and σ is the Stefan-Boltzmann constant. Temperatures are converted to kelvin before the equation is applied." },
  { question: "When should the effective view factor be 1?", answer: "Use 1 when the whole emitting surface effectively sees the stated large uniform enclosure. For smaller targets or several facing surfaces, use a radiation-network method rather than treating the view factor as a complete geometry model." },
  { question: "Why can the result be negative?", answer: "A negative result means the surface is cooler than the stated surroundings, so it absorbs more thermal radiation than it emits. It does not mean the calculation has failed." },
];

export const metadata: Metadata = {
  title: "Radiative Heat Transfer Calculator",
  description: "Calculate net thermal radiation, heat flux and stated-period energy from surface temperature, surroundings, emissivity, area and view factor.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Radiative Heat Transfer Calculator", description: "Calculate Stefan-Boltzmann radiation heat transfer for a stated surface, surroundings and effective view factor.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RadiativeHeatTransferCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "Radiative Heat Transfer Calculator", item: buildSiteUrl(pagePath) }] };

  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Radiative Heat Transfer Calculator</span></nav><header className="all-conversions-header"><h1>Radiative Heat Transfer Calculator</h1><p>Estimate net thermal radiation, heat flux and a constant-condition energy total for one surface and its surroundings.</p></header><EnglishRadiativeHeatTransferCalculator /><article className="category-article-content"><h2>Method</h2><p>For a surface that effectively views uniform surroundings, Q̇ = ε × F × σ × A × (T<sub>s</sub><sup>4</sup> − T<sub>sur</sub><sup>4</sup>). Temperatures must be absolute temperatures, so the calculator converts °C and °F to kelvin before applying the fourth-power relation.</p><h2>Worked example</h2><p>A 1 m² surface at 80 °C with ε = 0.9 and F = 1 facing 20 °C surroundings emits roughly 417 W of net thermal radiation under this simplified model. At the same conditions for one hour, that is about 0.417 kWh.</p><h2>Important limits</h2><p>This calculator is a first-pass enclosure model. It does not account for multiple surfaces, reflected radiation, participating gases, convection or conductive heat paths. Use a radiation-network method for an enclosure with several effective surfaces or a detailed view-factor analysis.</p><h2>Frequently asked questions</h2>{faqItems.map((item) => <section key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}<h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/convective-heat-transfer-calculator">Convective Heat Transfer Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer/heat-loss-calculator">Heat Loss Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
