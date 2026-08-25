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
    sourceSlug: "isi-enerjisi",
    slug: "heat-energy",
    category: "enerji",
    categoryName: "Energy",
    title: "Heat Energy Calculator",
    shortTitle: "Heat Energy",
    formula: "Q = m × c × ΔT",
    description:
      "Calculate heat energy, mass, specific heat or temperature difference with real unit conversions and show the SI equivalent alongside the main result.",
  },
  {
    locale: "en",
    sourceSlug: "isi-iletimi",
    slug: "heat-conduction",
    category: "enerji",
    categoryName: "Energy",
    title: "Heat Conduction Calculator",
    shortTitle: "Heat Conduction",
    formula: "Q̇ = k × A × ΔT / L",
    description:
      "Calculate heat-transfer rate, thermal conductivity, area, temperature difference or thickness with material presets and SI-based unit conversions.",
  },
  {
    locale: "en",
    sourceSlug: "reynolds-sayisi",
    slug: "reynolds-number",
    category: "viskozite_dinamik",
    categoryName: "Viscosity",
    title: "Reynolds Number Calculator",
    shortTitle: "Reynolds Number",
    formula: "Re = ρ × v × D / μ",
    description:
      "Calculate Reynolds number, flow velocity or characteristic diameter from density and dynamic viscosity, with an approximate internal pipe flow interpretation.",
  },
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
  {
    locale: "en",
    sourceSlug: "ohm-yasasi",
    slug: "ohms-law",
    category: "elektrik_direnc",
    categoryName: "Electricity",
    title: "Ohm's Law Calculator",
    shortTitle: "Ohm's Law",
    formula: "V = I × R",
    description:
      "Calculate voltage, current or resistance with Ohm's law and show the result with its SI equivalent and substituted formula.",
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
