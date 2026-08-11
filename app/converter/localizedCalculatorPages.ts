import type { CalculatorPage } from "./calculatorPages";

export type LocalizedCalculatorPage = CalculatorPage & {
  locale: "en";
  sourceSlug: string;
  slug: string;
  categoryName: string;
};

export const englishCalculatorPages: LocalizedCalculatorPage[] = [
  {
    locale: "en",
    sourceSlug: "basinc-kuvvet-alan",
    slug: "pressure-force-area",
    category: "basinc",
    categoryName: "Pressure",
    title: "Pressure, Force and Area Calculator",
    shortTitle: "Pressure, Force and Area",
    formula: "P = F / A",
    description:
      "Calculate pressure, force or area through SI base units and display the result in Pa, bar, psi, N, kN, lbf, m², cm², mm² or in².",
  },
  {
    locale: "en",
    sourceSlug: "hidrostatik-basinc",
    slug: "hydrostatic-pressure",
    category: "basinc",
    categoryName: "Pressure",
    title: "Hydrostatic Pressure Calculator",
    shortTitle: "Hydrostatic Pressure",
    formula: "ΔP = ρgh",
    description:
      "Calculate hydrostatic pressure difference, density, depth or gravitational acceleration through SI base units and show the result in a readable engineering scale.",
  },
];

export function findEnglishCalculatorPage(slug: string) {
  return englishCalculatorPages.find((page) => page.slug === slug);
}

export function findEnglishCalculatorPageByTurkishSlug(
  sourceSlug: string
) {
  return englishCalculatorPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
