import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { englishStandaloneTools } from "../../i18n/englishStandaloneTools";
import { englishEverydayCalculatorGroups } from "../../i18n/englishEverydayCalculatorGroups";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/everyday-calculators";

const calculatorGroups = englishEverydayCalculatorGroups;

export const metadata: Metadata = {
  title: `Everyday Calculators | ${SITE_NAME}`,
  description:
    "Free everyday calculators for home projects, health routines, transport, energy use and personal planning.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: {
    title: `Everyday Calculators | ${SITE_NAME}`,
    description:
      "Free everyday calculators for home projects, health routines, transport, energy use and personal planning.",
    url: buildSiteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function EverydayCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const tools = calculatorGroups.flatMap((group) =>
    group.tools.map((component) => {
      const tool = englishStandaloneTools.find(
        (candidate) => candidate.component === component,
      );

      if (!tool) {
        throw new Error(`Missing English standalone tool: ${component}`);
      }

      return tool;
    }),
  );
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Everyday Calculators",
    description: metadata.description,
    url: pageUrl,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: buildSiteUrl(tool.englishPath),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <StaticPageLayout
        locale="en"
        breadcrumbAriaLabel="Breadcrumb"
        breadcrumbs={[
          { href: "/en", label: "Home" },
          { label: "Everyday Calculators" },
        ]}
        title="Everyday Calculators"
        description="Practical, free calculators for common home, routine, transport and planning tasks."
        sections={calculatorGroups.map((group) => ({
          id: group.id,
          heading: group.title,
          content: (
            <>
              <p>{group.description}</p>
              <ul className="related-conversion-list">
                {group.tools.map((component) => {
                  const tool = englishStandaloneTools.find(
                    (candidate) => candidate.component === component,
                  );

                  return tool ? (
                    <li key={tool.slug}>
                      <Link href={tool.englishPath}>{tool.title}</Link>
                      <span> — {tool.cardDescription}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </>
          ),
        }))}
      />
    </>
  );
}
