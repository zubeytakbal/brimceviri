import type { Metadata } from "next";
import Link from "next/link";
import EnglishThermalResistanceCalculator from "../../../../components/EnglishThermalResistanceCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/thermal-resistance-calculator";

export const metadata: Metadata = {
  title: "Thermal Resistance & U-value Calculator",
  description: "Calculate layer-only thermal resistance and U-value for a wall, roof or floor assembly from material thickness and conductivity.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: "Thermal Resistance & U-value Calculator",
    description: "Calculate layer-only R-value and U-value for a stated construction assembly.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
};

export default function ThermalResistanceCalculatorPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link><span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span>
          <span>Thermal Resistance &amp; U-value Calculator</span>
        </nav>
        <header className="all-conversions-header">
          <h1>Thermal Resistance &amp; U-value Calculator</h1>
          <p>Build a simple layered assembly and calculate its material-only R-value and U-value.</p>
        </header>
        <EnglishThermalResistanceCalculator />
        <article className="category-article-content">
          <h2>Method</h2>
          <p>For each homogeneous layer, R = L / k. The total layer resistance is the sum of each layer&apos;s R-value, and U = 1 / R<sub>total</sub>.</p>
          <h2>Worked example</h2>
          <p>A 100 mm mineral-wool layer with k = 0.037 W/(m·K) has R = 0.100 / 0.037 = 2.70 m²·K/W. Its layer-only U-value is about 0.37 W/(m²·K).</p>
          <h2>Important limits</h2>
          <p>This is not a whole-assembly or code-compliance calculation. It excludes surface films, thermal bridges, framing, gaps, moisture effects, air movement and junction details unless you model their effects separately.</p>
          <h2>Related tools</h2>
          <p><Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link> · <Link href="/en/engineering-calculators/dimensionless-numbers/biot-number-calculator">Biot Number Calculator</Link></p>
        </article>
      </div>
    </main>
  );
}
