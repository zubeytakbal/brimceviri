import Link from "next/link";
import StaticPageLayout from "./StaticPageLayout";
import { DecorativeIcon } from "./siteIcons";
import {
  getElectricalHubCopy,
  getEngineeringHubPath,
  getLiveElectricalCalculatorItems,
  getPlannedElectricalCalculatorItems,
  type EngineeringLocale,
} from "../converter/engineeringHubs";

export default function ElectricalEngineeringHubPage({
  locale,
}: {
  locale: EngineeringLocale;
}) {
  const copy = getElectricalHubCopy(locale);
  const liveItems = getLiveElectricalCalculatorItems(locale);
  const plannedItems = getPlannedElectricalCalculatorItems(locale);
  const engineeringHubPath = getEngineeringHubPath(locale);

  const homeHref =
    locale === "en" ? "/en" : locale === "de" ? "/de" : "/";

  const liveTool =
    locale === "en"
      ? {
          href: "/en/calculators/ohms-law",
          title: "Ohm's Law Calculator",
          description:
            "Live calculator for voltage, current and resistance checks built around V = I x R.",
          formula: "V = I x R",
        }
      : locale === "de"
        ? {
            href: "/de/rechner/ohms-law",
            title: "Ohmsches-Gesetz-Rechner",
            description:
              "Live-Rechner fur Spannungs-, Strom- und Widerstandsprufungen auf Basis von V = I x R.",
            formula: "V = I x R",
          }
        : {
            href: "/hesaplayicilar/ohm-yasasi",
            title: "Ohm Yasasi Hesaplayicisi",
            description:
              "V = I x R iliskisiyle gerilim, akim ve direnc kontrolu yapan canli elektrik araci.",
            formula: "V = I x R",
          };

  return (
    <StaticPageLayout
      locale={locale}
      breadcrumbAriaLabel={
        locale === "en" || locale === "de"
          ? "Breadcrumb"
          : "Sayfa yolu"
      }
      breadcrumbs={[
        {
          href: homeHref,
          label:
            locale === "en"
              ? "Home"
              : locale === "de"
                ? "Startseite"
                : "Ana Sayfa",
        },
        {
          href: engineeringHubPath,
          label:
            locale === "en"
              ? "Engineering Calculators"
              : locale === "de"
                ? "Ingenieurrechner"
                : "Muhendislik Hesaplayicilari",
        },
        { label: copy.title },
      ]}
      title={copy.title}
      description={copy.description}
      sections={[
        {
          heading: copy.overviewTitle,
          content: <p>{copy.overviewBody}</p>,
        },
        {
          heading: copy.liveToolsTitle,
          content: (
            <ul className="category-calculator-list engineering-hub-list">
              <li>
                <Link className="category-calculator-card" href={liveTool.href}>
                  <span className="engineering-hub-card-header">
                    <DecorativeIcon name="energy" size={28} />
                    <span className="category-tool-title">
                      <strong>{liveTool.title}</strong>
                    </span>
                  </span>
                  <span className="engineering-status-pill is-live">
                    {copy.liveStatus}
                  </span>
                  <span className="category-tool-formula">
                    {liveTool.formula}
                  </span>
                  <span>{liveTool.description}</span>
                </Link>
              </li>
              {liveItems.map((item) => (
                <li key={item.href}>
                  <Link className="category-calculator-card" href={item.href}>
                    <span className="engineering-hub-card-header">
                      <DecorativeIcon name="energy" size={28} />
                      <span className="category-tool-title">
                        <strong>{item.title}</strong>
                      </span>
                    </span>
                    <span className="engineering-status-pill is-live">
                      {copy.liveStatus}
                    </span>
                    <span className="category-tool-formula">
                      {item.formula}
                    </span>
                    <span>{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: copy.plannedToolsTitle,
          content: (
            <>
              <p>{copy.plannedToolsBody}</p>
              <ul className="category-calculator-list engineering-hub-list">
                {plannedItems.map((item) => (
                  <li key={item.href}>
                    <Link className="category-calculator-card" href={item.href}>
                      <span className="engineering-hub-card-header">
                        <DecorativeIcon name="energy" size={28} />
                        <span className="category-tool-title">
                          <strong>{item.title}</strong>
                        </span>
                      </span>
                      <span className="engineering-status-pill">
                        {copy.plannedStatus}
                      </span>
                      <span className="category-tool-formula">
                        {item.formula}
                      </span>
                      <span>{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          heading: copy.processTitle,
          content: (
            <ol className="engineering-hub-steps">
              {copy.processSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ),
        },
        {
          heading: copy.relatedTitle,
          content: (
            <ul className="related-conversion-list engineering-hub-guides">
              <li>
                <Link href={engineeringHubPath}>{copy.relatedLinkLabel}</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
