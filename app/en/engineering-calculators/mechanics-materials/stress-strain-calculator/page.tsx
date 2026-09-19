import type { Metadata } from "next";
import Link from "next/link";
import EnglishStressStrainCalculator from "../../../../components/EnglishStressStrainCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath =
  "/en/engineering-calculators/mechanics-materials/stress-strain-calculator";

export const metadata: Metadata = {
  title: "Stress & Strain Calculator",
  description:
    "Calculate engineering stress, strain and a secant modulus from axial force, cross-sectional area, original length and extension.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: "Stress & Strain Calculator",
    description:
      "Calculate engineering stress and strain for a stated uniform axial member.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
};

export default function StressStrainCalculatorPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators">
            Engineering Calculators
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators/mechanics-materials">
            Mechanics &amp; Materials
          </Link>
          <span aria-hidden="true">›</span>
          <span>Stress &amp; Strain Calculator</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Stress &amp; Strain Calculator</h1>
          <p>
            Calculate engineering stress, strain and an implied secant modulus
            for a uniform member under axial load.
          </p>
        </header>

        <EnglishStressStrainCalculator />

        <article className="category-article-content">
          <h2>Method</h2>
          <p>
            Engineering stress is σ = F / A and engineering strain is ε = ΔL /
            L<sub>0</sub>. Dividing stress by strain gives a secant modulus for
            the stated measurements.
          </p>

          <h2>Worked example</h2>
          <p>
            A 10 kN force on a 100 mm² bar gives 100 MPa stress. If a 1,000 mm
            gauge length extends 0.5 mm, strain is 0.0005 (0.05%) and the
            implied secant modulus is 200 GPa.
          </p>

          <h2>Important limits</h2>
          <p>
            This is not a structural-design check. It assumes uniform axial
            loading and uses engineering, rather than true, stress and strain.
            Verify material data, yield, buckling, fatigue, connections and the
            applicable design code separately.
          </p>

          <h2>References</h2>
          <ul>
            <li>
              <a
                href="https://www.nist.gov/publications/understanding-deformation-behavior-uniaxial-tensile-tests-steel-specimens-varying"
                target="_blank"
                rel="noreferrer"
              >
                NIST: deformation behavior in uniaxial tensile tests
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/pml/special-publication-811"
                target="_blank"
                rel="noreferrer"
              >
                NIST Guide for the Use of the International System of Units
              </a>
            </li>
          </ul>

          <h2>Related tools</h2>
          <p>
            <Link href="/en/calculators/elastic-elongation">
              Elastic Elongation Calculator
            </Link>{" "}
            ·{" "}
            <Link href="/en/calculators/thermal-expansion">
              Thermal Expansion Calculator
            </Link>{" "}
            ·{" "}
            <Link href="/en/engineering-calculators/mechanics-materials">
              Mechanics &amp; Materials Calculators
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}
