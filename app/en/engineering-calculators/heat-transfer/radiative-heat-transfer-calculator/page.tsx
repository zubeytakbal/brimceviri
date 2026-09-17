import type { Metadata } from "next";
import Link from "next/link";
import EnglishRadiativeHeatTransferCalculator from "../../../../components/EnglishRadiativeHeatTransferCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/radiative-heat-transfer-calculator";

export const metadata: Metadata = {
  title: "Radiative Heat Transfer Calculator",
  description: "Calculate net radiative heat transfer between a surface and large uniform surroundings from temperature, area and emissivity.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Radiative Heat Transfer Calculator", description: "Calculate Stefan-Boltzmann radiation heat transfer for a stated surface and surroundings.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

export default function RadiativeHeatTransferCalculatorPage() {
  return <main className="all-conversions-page"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Radiative Heat Transfer Calculator</span></nav><header className="all-conversions-header"><h1>Radiative Heat Transfer Calculator</h1><p>Estimate net thermal radiation exchanged between one surface and large, uniform surroundings.</p></header><EnglishRadiativeHeatTransferCalculator /><article className="category-article-content"><h2>Method</h2><p>For a surface that views a large isothermal enclosure, Q = εσA(T<sub>s</sub><sup>4</sup> − T<sub>sur</sub><sup>4</sup>). Temperatures must be converted to absolute temperature before applying the fourth-power relation.</p><h2>Worked example</h2><p>A 1 m² surface at 80 °C with ε = 0.9 facing 20 °C surroundings emits roughly 417 W of net thermal radiation under this simplified model.</p><h2>Important limits</h2><p>This calculator assumes a view factor of 1 and does not account for geometry, multiple surfaces, reflected radiation, participating gases, convection or conductive heat paths. Use a radiation-network method for an enclosure with more than two effective surfaces.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/heat-loss-calculator">Heat Loss Calculator</Link> · <Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
