import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer";

const tools = [
  {
    href: "/en/engineering-calculators/heat-transfer/sensible-heat-rate-calculator",
    title: "Sensible Heat Rate Calculator",
    description: "Calculate fluid heating or cooling rate from mass flow, specific heat and temperature change.",
  },
  {
    href: "/en/engineering-calculators/heat-transfer/convective-heat-transfer-calculator",
    title: "Convective Heat Transfer Calculator",
    description: "Calculate Q = h A ΔT from a stated convection coefficient, area and surface-to-fluid temperature difference.",
  },
  {
    href: "/en/engineering-calculators/heat-transfer/radiative-heat-transfer-calculator",
    title: "Radiative Heat Transfer Calculator",
    description: "Estimate net Stefan-Boltzmann radiation between a surface and large uniform surroundings.",
  },
  {
    href: "/en/engineering-calculators/heat-transfer/heat-loss-calculator",
    title: "Heat Loss Calculator",
    description: "Estimate conductive heat loss and period energy from a U-value, surface area and temperature difference.",
  },
  {
    href: "/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator",
    title: "LMTD Heat Exchanger Calculator",
    description: "Calculate log mean temperature difference and Q = U A ΔTlm for a stated parallel-flow or counterflow profile.",
  },
  {
    href: "/en/engineering-calculators/heat-transfer/thermal-resistance-calculator",
    title: "Thermal Resistance & U-value Calculator",
    description: "Build a material-layer stack and calculate its layer-only R-value and U-value.",
  },
  {
    href: "/en/calculators/heat-energy",
    title: "Heat Energy Calculator",
    description: "Solve sensible heat, mass, specific heat or temperature change using Q = m x c x ΔT.",
  },
  {
    href: "/en/calculators/heat-conduction",
    title: "Heat Conduction Calculator",
    description: "Estimate steady one-dimensional conduction rate through a stated material and thickness.",
  },
  {
    href: "/en/calculators/thermal-expansion",
    title: "Thermal Expansion Calculator",
    description: "Estimate free linear length change caused by a temperature change.",
  },
  {
    href: "/en/calculators/elastic-elongation",
    title: "Elastic Elongation Calculator",
    description: "Estimate axial stress, strain and elastic length change from a stated load and material modulus.",
  },
  {
    href: "/en/engineering-calculators/dimensionless-numbers/biot-number-calculator",
    title: "Biot Number Calculator",
    description: "Screen internal versus surface thermal resistance before using a lumped transient model.",
  },
  {
    href: "/en/engineering-calculators/dimensionless-numbers/fourier-number-calculator",
    title: "Fourier Number Calculator",
    description: "Calculate dimensionless time for transient-conduction screening.",
  },
  {
    href: "/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator",
    title: "Nusselt Number Calculator",
    description: "Relate convection coefficient, characteristic length and thermal conductivity.",
  },
];

export const metadata: Metadata = {
  title: "Heat Transfer Calculators",
  description:
    "Engineering calculators for sensible heat, conduction, thermal expansion and dimensionless heat-transfer checks.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: "Heat Transfer Calculators",
    description:
      "A focused engineering hub for thermal energy, conduction, expansion and heat-transfer screening.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatTransferHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Heat Transfer Calculators",
    description:
      "Engineering calculators for sensible heat, conduction, thermal expansion and dimensionless heat-transfer checks.",
    url: buildSiteUrl(pagePath),
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: buildSiteUrl(tool.href),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <StaticPageLayout
        locale="en"
        breadcrumbAriaLabel="Breadcrumb"
        breadcrumbs={[
          { href: "/en", label: "Home" },
          { href: "/en/engineering-calculators", label: "Engineering Calculators" },
          { label: "Heat Transfer" },
        ]}
        title="Heat Transfer Calculators"
        description="A focused engineering cluster for moving from stored thermal energy to conduction, expansion and transient heat-transfer checks."
        sections={[
          {
            heading: "Start with the physical question",
            content: (
              <ol className="engineering-hub-steps">
                <li>Use Heat Energy when a material changes temperature without a phase change.</li>
                <li>Use Heat Conduction for a steady one-dimensional estimate through a known area, material and thickness.</li>
                <li>Use Thermal Expansion when the design concern is free change in length caused by temperature.</li>
                <li>Use the dimensionless tools before selecting a transient or convection correlation.</li>
              </ol>
            ),
          },
          {
            heading: "Live calculators",
            content: (
              <ul className="category-calculator-list">
                {tools.map((tool) => (
                  <li key={tool.href}>
                    <Link className="category-calculator-card" href={tool.href}>
                      <strong>{tool.title}</strong>
                      <span>{tool.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            heading: "Important limits",
            content: (
              <p>
                These tools are first-pass calculations. They do not replace a full thermal model with radiation, changing properties, contact resistance, phase change, multidimensional geometry, thermal stress or code-required safety margins. State the material condition, temperature range and boundary conditions before using a result for design.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
