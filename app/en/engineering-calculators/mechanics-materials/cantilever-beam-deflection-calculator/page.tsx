import type { Metadata } from "next";
import Link from "next/link";
import EnglishCantileverBeamCalculator from "../../../../components/EnglishCantileverBeamCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath =
  "/en/engineering-calculators/mechanics-materials/cantilever-beam-deflection-calculator";

export const metadata: Metadata = {
  title: "Cantilever Beam Deflection Calculator",
  description:
    "Calculate tip deflection, bending stress and free-end rotation for a rectangular cantilever with a point load at its free end.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: "Cantilever Beam Deflection Calculator",
    description:
      "Calculate a small-deflection cantilever response for a stated rectangular section and tip load.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "article",
  },
};

export default function CantileverBeamCalculatorPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link><span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators">Engineering Calculators</Link>
          <span aria-hidden="true">›</span>
          <Link href="/en/engineering-calculators/mechanics-materials">Mechanics &amp; Materials</Link>
          <span aria-hidden="true">›</span><span>Cantilever Beam Deflection Calculator</span>
        </nav>
        <header className="all-conversions-header">
          <h1>Cantilever Beam Deflection Calculator</h1>
          <p>Estimate tip deflection, bending stress and end rotation for a rectangular cantilever under one free-end point load.</p>
        </header>
        <EnglishCantileverBeamCalculator />
        <article className="category-article-content">
          <h2>Method</h2>
          <p>For a prismatic rectangular cantilever with a tip load, I = bh<sup>3</sup>/12, δ = PL<sup>3</sup>/(3EI), σ<sub>max</sub> = PL(h/2)/I and θ = PL<sup>2</sup>/(2EI).</p>
          <h2>Worked example</h2>
          <p>A 1 kN load on a 1 m steel cantilever with a 50 mm × 100 mm section gives about 0.4 mm tip deflection and 12 MPa maximum bending stress under this idealized model.</p>
          <h2>Important limits</h2>
          <p>This is not a beam-design or code-compliance check. It applies only to a fixed-free beam with a single tip load and small elastic deflection. Assess strength, stability, connections, shear and serviceability under the applicable standard separately.</p>
          <h2>References</h2>
          <ul>
            <li><a href="https://ocw.mit.edu/courses/3-032-mechanical-behavior-of-materials-fall-2007/resources/lec3/" target="_blank" rel="noreferrer">MIT OpenCourseWare: deformation, bending and end-loaded cantilevers</a></li>
            <li><a href="https://www.nist.gov/pml/special-publication-811" target="_blank" rel="noreferrer">NIST Guide for the Use of the International System of Units</a></li>
          </ul>
          <h2>Related tools</h2>
          <p><Link href="/en/engineering-calculators/mechanics-materials/stress-strain-calculator">Stress &amp; Strain Calculator</Link> · <Link href="/en/calculators/elastic-elongation">Elastic Elongation Calculator</Link> · <Link href="/en/engineering-calculators/mechanics-materials">Mechanics &amp; Materials Calculators</Link></p>
        </article>
      </div>
    </main>
  );
}
