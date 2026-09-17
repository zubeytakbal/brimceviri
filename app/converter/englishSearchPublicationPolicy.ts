/**
 * Editorial gate for future English search pages.
 *
 * This file does not create routes or alter robots directives. It records
 * which units and pairs are worth considering when a new English search page
 * is prepared. A candidate still needs verified facts and a useful page before
 * it is published.
 */

export type EnglishSearchCandidateReason =
  | "global-core"
  | "system-distinction"
  | "historical-reference";

export type EnglishUnitGuideCandidate = {
  unitId: string;
  reason: EnglishSearchCandidateReason;
};

export type EnglishConversionPairCandidate = {
  fromUnitId: string;
  toUnitId: string;
  reason: EnglishSearchCandidateReason;
};

/**
 * A unit guide answers definition-led queries such as "what is an okka?".
 * These are a curated starting set, not permission to generate a guide for
 * every registry entry automatically.
 */
export const englishUnitGuideCandidates: readonly EnglishUnitGuideCandidate[] = [
  { unitId: "metre", reason: "global-core" },
  { unitId: "kilogram", reason: "global-core" },
  { unitId: "litre", reason: "global-core" },
  { unitId: "galon", reason: "system-distinction" },
  { unitId: "ingiliz-galonu", reason: "system-distinction" },
  { unitId: "pint", reason: "system-distinction" },
  { unitId: "ingiliz-pint", reason: "system-distinction" },
  { unitId: "quart", reason: "system-distinction" },
  { unitId: "ingiliz-quart", reason: "system-distinction" },
  { unitId: "sivi-ons", reason: "system-distinction" },
  { unitId: "ingiliz-sivi-ons", reason: "system-distinction" },
  { unitId: "arsin", reason: "historical-reference" },
  { unitId: "endaze", reason: "historical-reference" },
  { unitId: "okka", reason: "historical-reference" },
  { unitId: "dirhem", reason: "historical-reference" },
  { unitId: "pous", reason: "historical-reference" },
  { unitId: "orgyia", reason: "historical-reference" },
  { unitId: "litra", reason: "historical-reference" },
  { unitId: "ounkia", reason: "historical-reference" },
  { unitId: "cig", reason: "historical-reference" },
];

/**
 * A pair page answers action-led queries such as "US gallon to liter". New
 * pairs are added here only after search-demand research or clear product
 * evidence; the converter itself remains free to support every valid pair.
 */
export const englishConversionPairCandidates: readonly EnglishConversionPairCandidate[] = [
  { fromUnitId: "metre", toUnitId: "kilometre", reason: "global-core" },
  { fromUnitId: "kilogram", toUnitId: "pound", reason: "global-core" },
  { fromUnitId: "galon", toUnitId: "litre", reason: "system-distinction" },
  {
    fromUnitId: "ingiliz-galonu",
    toUnitId: "litre",
    reason: "system-distinction",
  },
  { fromUnitId: "pint", toUnitId: "mililitre", reason: "system-distinction" },
  {
    fromUnitId: "ingiliz-pint",
    toUnitId: "mililitre",
    reason: "system-distinction",
  },
  { fromUnitId: "quart", toUnitId: "litre", reason: "system-distinction" },
  {
    fromUnitId: "ingiliz-quart",
    toUnitId: "litre",
    reason: "system-distinction",
  },
  { fromUnitId: "sivi-ons", toUnitId: "mililitre", reason: "system-distinction" },
  {
    fromUnitId: "ingiliz-sivi-ons",
    toUnitId: "mililitre",
    reason: "system-distinction",
  },
  { fromUnitId: "arsin", toUnitId: "metre", reason: "historical-reference" },
  { fromUnitId: "endaze", toUnitId: "metre", reason: "historical-reference" },
  { fromUnitId: "okka", toUnitId: "kilogram", reason: "historical-reference" },
  { fromUnitId: "dirhem", toUnitId: "gram", reason: "historical-reference" },
  { fromUnitId: "pous", toUnitId: "metre", reason: "historical-reference" },
  { fromUnitId: "orgyia", toUnitId: "metre", reason: "historical-reference" },
  { fromUnitId: "litra", toUnitId: "gram", reason: "historical-reference" },
  { fromUnitId: "ounkia", toUnitId: "gram", reason: "historical-reference" },
  { fromUnitId: "cig", toUnitId: "metre", reason: "historical-reference" },
];

export function isEnglishUnitGuideCandidate(unitId: string): boolean {
  return englishUnitGuideCandidates.some(
    (candidate) => candidate.unitId === unitId
  );
}

export function isEnglishConversionPairCandidate(
  fromUnitId: string,
  toUnitId: string
): boolean {
  return englishConversionPairCandidates.some(
    (candidate) =>
      candidate.fromUnitId === fromUnitId &&
      candidate.toUnitId === toUnitId
  );
}
