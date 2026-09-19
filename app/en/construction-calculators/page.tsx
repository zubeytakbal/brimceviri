import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/construction-calculators";

export const metadata: Metadata = {
  title: `Construction Calculators | ${SITE_NAME}`,
  description:
    "Plan concrete, paint, tile, brick, flooring and wallpaper quantities with practical construction and home-project calculators.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: `Construction Calculators | ${SITE_NAME}`,
    description:
      "Practical construction and home-project calculators for material quantities and planning estimates.",
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const materialTools = [
  {
    href: "/en/concrete-calculator",
    title: "Concrete Calculator",
    description:
      "Estimate slab, footing or column volume in cubic yards or cubic meters with a waste allowance.",
  },
  {
    href: "/en/brick-calculator",
    title: "Brick Calculator",
    description:
      "Estimate brick quantities from wall dimensions, mortar joints and waste.",
  },
  {
    href: "/en/tile-calculator",
    title: "Tile Calculator",
    description:
      "Estimate tile counts from area, tile dimensions and waste.",
  },
  {
    href: "/en/stair-calculator",
    title: "Stair Calculator",
    description:
      "Estimate riser count, tread depth and total run for a straight stair during early planning.",
  },
  {
    href: "/en/gravel-soil-calculator",
    title: "Gravel & Soil Calculator",
    description:
      "Estimate aggregate volume and order weight with an editable bulk-density assumption.",
  },
  {
    href: "/en/roofing-calculator",
    title: "Roofing Calculator",
    description:
      "Estimate gable-roof area, roofing squares and bundles from pitch and product coverage.",
  },
];

const finishTools = [
  {
    href: "/en/paint-calculator",
    title: "Paint Calculator",
    description:
      "Estimate paintable wall and ceiling area, accounting for openings and coats.",
  },
  {
    href: "/en/laminate-flooring-calculator",
    title: "Laminate Flooring Calculator",
    description:
      "Estimate flooring packages from area and a chosen waste allowance.",
  },
  {
    href: "/en/wallpaper-calculator",
    title: "Wallpaper Calculator",
    description:
      "Estimate wallpaper rolls from wall dimensions, roll size and waste.",
  },
];

function ToolList({
  tools,
}: {
  tools: Array<{ href: string; title: string; description: string }>;
}) {
  return (
    <ul className="related-conversion-list">
      {tools.map((tool) => (
        <li key={tool.href}>
          <Link href={tool.href}>{tool.title}</Link>
          <span> — {tool.description}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ConstructionCalculatorsPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Construction Calculators" },
      ]}
      title="Construction Calculators"
      description="Plan material quantities for concrete pours, masonry, flooring and interior finishes with clear unit choices and waste allowances."
      sections={[
        {
          id: "materials",
          heading: "Concrete, masonry and tile",
          content: <ToolList tools={materialTools} />,
        },
        {
          id: "finishes",
          heading: "Interior finishes",
          content: <ToolList tools={finishTools} />,
        },
        {
          id: "planning-note",
          heading: "Use estimates responsibly",
          content: (
            <p>
              These tools help with early material planning. Confirm final
              quantities, product coverage, structural requirements and local
              code obligations with the supplier or qualified project team.
            </p>
          ),
        },
      ]}
    />
  );
}
