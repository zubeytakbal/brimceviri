import {
  categoryLabels,
  slugifyElementName,
  type ElementCategory,
  type PeriodicElement,
} from "../converter/periodicTableData";
import {
  elementCategoryLabelsDe,
  elementNamesDeBySymbol,
  slugifyElementNameDe,
} from "../converter/periodicTableDataDe";
import type { ContentLocale } from "./contentLocale";

// Periyodik tablo bilesenlerinin dile gore degisen parcalari: element adi,
// kategori etiketi ve sayfa adresleri.

export function getElementName(element: PeriodicElement, locale: ContentLocale): string {
  return locale === "de"
    ? elementNamesDeBySymbol[element.symbol] ?? element.symbol
    : element.nameTr;
}

export const elementCategoryLabels: Record<ContentLocale, Record<ElementCategory, string>> = {
  tr: categoryLabels,
  de: elementCategoryLabelsDe,
};

export const periodicTablePaths: Record<ContentLocale, string> = {
  tr: "/bilim-hesaplayicilari/kimya/periyodik-tablo",
  de: "/de/periodensystem",
};

export function getElementPath(element: PeriodicElement, locale: ContentLocale): string {
  const slug =
    locale === "de"
      ? slugifyElementNameDe(getElementName(element, "de"))
      : slugifyElementName(element.nameTr);
  return `${periodicTablePaths[locale]}/${slug}`;
}
