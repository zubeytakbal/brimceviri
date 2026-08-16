import type { UnitPage } from "./unitPages";

export type LocalizedGermanUnitPage = UnitPage & {
  locale: "de";
  sourceSlug: string;
  categoryName: string;
};

export const germanUnitPages: LocalizedGermanUnitPage[] = [
  {
    locale: "de",
    sourceSlug: "metre",
    slug: "meter",
    category: "uzunluk",
    categoryName: "L\u00E4nge",
    unit: "m",
    name: "Meter",
    symbol: "m",
    shortDescription:
      "Der Meter ist die SI-Basiseinheit der L\u00E4nge. Er wird in Technik, Wissenschaft und Alltag als wichtigste Referenz f\u00FCr Entfernungen und Abmessungen verwendet.",
    historySummary:
      "Der Meter entstand im Zuge der metrischen Standardisierung des 18. Jahrhunderts. Heute ist er \u00FCber die Lichtgeschwindigkeit im Vakuum definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    siEquivalent: "SI-Basiseinheit der L\u00E4nge",
    commonUses:
      "Bauwesen, Geometrie, Wissenschaft, Vermessung und allgemeine Messungen",
  },
  {
    locale: "de",
    sourceSlug: "kilometre",
    slug: "kilometer",
    category: "uzunluk",
    categoryName: "L\u00E4nge",
    unit: "km",
    name: "Kilometer",
    symbol: "km",
    shortDescription:
      "Der Kilometer ist eine L\u00E4ngeneinheit von 1000 Metern. Er wird vor allem f\u00FCr Stra\u00DFen-, Reise- und geographische Entfernungen verwendet.",
    historySummary:
      "Als dezimales Vielfaches des Meters wurde der Kilometer zu einer praktischen Einheit f\u00FCr gro\u00DFe Distanzen auf Karten, Stra\u00DFen und Infrastrukturnetzen.",
    measurementSystem:
      "Internationales Einheitensystem (SI, Vielfacheinheit)",
    siEquivalent: "1 km = 1000 m",
    commonUses:
      "Stra\u00DFenentfernungen, Geographie, Kartographie und Infrastruktur",
  },
  {
    locale: "de",
    sourceSlug: "kilogram",
    slug: "kilogramm",
    category: "kutle",
    categoryName: "Masse",
    unit: "kg",
    name: "Kilogramm",
    symbol: "kg",
    shortDescription:
      "Das Kilogramm ist die SI-Basiseinheit der Masse. Es wird in Handel, Industrie, Labor und Technik als zentrale Masseneinheit verwendet.",
    historySummary:
      "Das Kilogramm war fr\u00FCher an einen Prototyp gebunden und ist heute \u00FCber den festgelegten Zahlenwert der Planck-Konstanten definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    siEquivalent: "SI-Basiseinheit der Masse",
    commonUses:
      "Handel, Logistik, Laborarbeit, Produktion und technische Berechnungen",
  },
  {
    locale: "de",
    sourceSlug: "gram",
    slug: "gramm",
    category: "kutle",
    categoryName: "Masse",
    unit: "g",
    name: "Gramm",
    symbol: "g",
    shortDescription:
      "Das Gramm ist ein Tausendstel Kilogramm. Es eignet sich f\u00FCr kleinere Stoffmengen, Lebensmittel, Laborproben und pr\u00E4zise W\u00E4gungen.",
    historySummary:
      "Als metrische Untereinheit des Kilogramms wurde das Gramm zu einer alltagstauglichen und wissenschaftlich gut nutzbaren Masseneinheit.",
    measurementSystem:
      "Internationales Einheitensystem (SI, Untereinheit)",
    siEquivalent: "1 g = 0.001 kg",
    commonUses:
      "Lebensmittel, Chemie, Pharmazie und Feinw\u00E4gungen",
  },
  {
    locale: "de",
    sourceSlug: "pascal",
    slug: "pascal",
    category: "basinc",
    categoryName: "Druck",
    unit: "Pa",
    name: "Pascal",
    symbol: "Pa",
    shortDescription:
      "Das Pascal ist die SI-Einheit des Drucks. Es ist direkt \u00FCber die Beziehung 1 Pa = 1 N/m\u00B2 definiert.",
    historySummary:
      "Benannt nach Blaise Pascal wurde die Einheit zum wissenschaftlichen und technischen Standard f\u00FCr Druckangaben im SI.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    siEquivalent: "SI-Druckeinheit, 1 Pa = 1 N/m\u00B2",
    commonUses:
      "Wissenschaftliche Berechnungen, Werkstofftechnik und Referenzumrechnungen",
  },
  {
    locale: "de",
    sourceSlug: "bar",
    slug: "bar",
    category: "basinc",
    categoryName: "Druck",
    unit: "bar",
    name: "Bar",
    symbol: "bar",
    shortDescription:
      "Bar ist eine praktische Druckeinheit mit 100000 Pascal. Sie ist in Industrie, Hydraulik, Pneumatik und Servicetechnik weit verbreitet.",
    historySummary:
      "Das Bar wurde popul\u00E4r, weil es viele technische Druckbereiche kompakt darstellt. Trotz fehlendem SI-Status bleibt es in der Praxis sehr gebr\u00E4uchlich.",
    measurementSystem: "Nicht-SI-Ma\u00DFeinheit in der Technik",
    siEquivalent: "1 bar = 100000 Pa",
    commonUses:
      "Kompressoren, Hydraulik, Pneumatik und Manometer",
  },
];

export function findGermanUnitPage(
  category: string,
  unit: string
) {
  return germanUnitPages.find(
    (page) => page.category === category && page.unit === unit
  );
}

export function findGermanUnitPageBySlug(slug: string) {
  return germanUnitPages.find((page) => page.slug === slug);
}

export function findGermanUnitPageByTurkishSlug(
  sourceSlug: string
) {
  return germanUnitPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
