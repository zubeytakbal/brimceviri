import Link from "next/link";
import StaticPageLayout from "./StaticPageLayout";
import {
  getElectricalHubPath,
  getPlannedElectricalPreviewCopy,
  type EngineeringLocale,
} from "../converter/engineeringHubs";

export default function PlannedElectricalCalculatorPage({
  locale,
  sourceSlug,
}: {
  locale: EngineeringLocale;
  sourceSlug: string;
}) {
  const copy = getPlannedElectricalPreviewCopy(locale, sourceSlug);

  if (!copy) {
    return null;
  }

  const homeHref =
    locale === "en" ? "/en" : locale === "de" ? "/de" : "/";
  const engineeringHubHref =
    locale === "en"
      ? "/en/engineering-calculators"
      : locale === "de"
        ? "/de/ingenieurrechner"
        : "/muhendislik-hesaplayicilari";
  const electricalHubHref = getElectricalHubPath(locale);

  return (
    <StaticPageLayout
      locale={locale}
      breadcrumbAriaLabel={copy.breadcrumbLabel}
      breadcrumbs={[
        { href: homeHref, label: copy.homeLabel },
        { href: engineeringHubHref, label: copy.hubLabel },
        { href: electricalHubHref, label: copy.electricalHubLabel },
        { label: copy.title },
      ]}
      title={copy.title}
      description={copy.description}
      sections={[
        {
          heading: copy.scopeTitle,
          content: (
            <>
              <p>{copy.planningNote}</p>
              <div className="engineering-note-box">
                <strong>{copy.formula}</strong>
                <p>{copy.description}</p>
              </div>
            </>
          ),
        },
        {
          heading: copy.inputsTitle,
          content: (
            <ul className="calculator-bullet-list">
              {copy.plannedInputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        },
        {
          heading: copy.useCasesTitle,
          content: (
            <ul className="calculator-bullet-list">
              {copy.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        },
        {
          heading: copy.nextTitle,
          content: <p>{copy.nextBody}</p>,
        },
        {
          heading: copy.relatedTitle,
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href={electricalHubHref}>{copy.electricalHubLink}</Link>
              </li>
              <li>
                <Link href={copy.liveToolHref}>{copy.liveToolLink}</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
