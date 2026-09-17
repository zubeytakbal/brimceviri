import type { Metadata } from "next";
import Link from "next/link";
import EnglishHeatLossCalculator from "../../../../components/EnglishHeatLossCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/heat-loss-calculator";

export const metadata: Metadata = {
  title: "Heat Loss Calculator (U × A × ΔT)",
  description: "Estimate steady heat loss through a stated surface and energy over a chosen duration from U-value, area and temperature difference.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Heat Loss Calculator", description: "Estimate conductive heat loss from U-value, area, temperature difference and duration.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

export default function HeatLossCalculatorPage() {
  return <main className="all-conversions-page"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Heat Loss Calculator</span></nav><header className="all-conversions-header"><h1>Heat Loss Calculator</h1><p>Estimate heat loss through one stated building element from its U-value, area and temperature difference.</p></header><EnglishHeatLossCalculator /><article className="category-article-content"><h2>Method</h2><p>The steady heat-loss rate is Q̇ = U × A × ΔT. Multiply the rate by a stated duration to estimate the associated thermal energy.</p><h2>Worked example</h2><p>A 100 m² wall with U = 0.30 W/(m²·K) and a 20 K temperature difference loses 0.30 × 100 × 20 = 600 W. Over 24 hours at those constant conditions, that is 14.4 kWh of heat.</p><h2>Important limits</h2><p>This is a surface-conduction estimate, not a whole-building heating-load or energy-use calculation. Air infiltration, thermal bridges, solar gains, weather variation, occupancy and plant efficiency can materially change actual energy demand.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/thermal-resistance-calculator">Thermal Resistance &amp; U-value Calculator</Link> · <Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
