/**
 * Stable measurement-system metadata for the global English experience.
 *
 * This is intentionally separate from `unitRegistry`: it does not change a
 * conversion factor, a unit name, a route, or the units shown by a converter.
 * It only records the system identity of units where that identity matters to
 * a future system selector or regional guide.
 *
 * A missing entry means "not yet classified". We never guess that a unit is
 * Metric, US Customary, or Imperial merely because it can be converted.
 */
export const measurementSystemCatalog = {
  metric_si: {
    label: "Metric and SI",
    description: "International metric and SI-based units.",
  },
  shared_anglo_american: {
    label: "Shared Anglo-American units",
    description:
      "Units with the same defined value in common US and British use.",
  },
  us_customary: {
    label: "US Customary",
    description:
      "US customary units, especially volume units whose values differ from Imperial units.",
  },
  british_imperial: {
    label: "British Imperial",
    description:
      "Imperial units, especially volume units whose values differ from US customary units.",
  },
  ottoman_historical: {
    label: "Ottoman historical",
    description: "Historical units used in the Ottoman context.",
  },
  byzantine_historical: {
    label: "Byzantine historical",
    description: "Historical units used in the Byzantine context.",
  },
  old_turkic_historical: {
    label: "Old Turkic historical",
    description: "Historical units documented for Old Turkic contexts.",
  },
} as const;

export type MeasurementSystemId = keyof typeof measurementSystemCatalog;

/**
 * Only reviewed, system-defining unit IDs belong here. The values are the
 * immutable IDs from `unitRegistry`, not localized slugs, so later language
 * interfaces can reuse the same classification safely.
 */
const unitSystemIds: Readonly<Record<string, readonly MeasurementSystemId[]>> = {
  // Reviewed Metric/SI core used by the main conversion categories.
  metre: ["metric_si"],
  kilometre: ["metric_si"],
  santimetre: ["metric_si"],
  milimetre: ["metric_si"],
  kilogram: ["metric_si"],
  gram: ["metric_si"],
  miligram: ["metric_si"],
  metrekare: ["metric_si"],
  hektar: ["metric_si"],
  litre: ["metric_si"],
  metrekup: ["metric_si"],
  mililitre: ["metric_si"],
  "metre-saniye": ["metric_si"],
  "kilometre-saat": ["metric_si"],
  "m3-s": ["metric_si"],
  pascal: ["metric_si"],
  kilopascal: ["metric_si"],

  // Shared values in present-day US and British usage.
  mil: ["shared_anglo_american"],
  fit: ["shared_anglo_american"],
  inc: ["shared_anglo_american"],
  yarda: ["shared_anglo_american"],
  pound: ["shared_anglo_american"],
  ons: ["shared_anglo_american"],
  fitkare: ["shared_anglo_american"],
  incare: ["shared_anglo_american"],
  yardakare: ["shared_anglo_american"],
  akre: ["shared_anglo_american"],
  "mil-saat": ["shared_anglo_american"],

  // These have US liquid/dry values and must never be merged with Imperial.
  galon: ["us_customary"],
  pint: ["us_customary"],
  quart: ["us_customary"],
  "sivi-ons": ["us_customary"],
  peck: ["us_customary"],
  bushel: ["us_customary"],
  gpm: ["us_customary"],

  // Explicit Imperial volume entries already present in the converter.
  "ingiliz-galonu": ["british_imperial"],
  "ingiliz-pint": ["british_imperial"],
  "ingiliz-quart": ["british_imperial"],
  "ingiliz-sivi-ons": ["british_imperial"],
  stone: ["british_imperial"],

  // The differentiated historical collection.
  arsin: ["ottoman_historical"],
  endaze: ["ottoman_historical"],
  okka: ["ottoman_historical"],
  dirhem: ["ottoman_historical"],
  pous: ["byzantine_historical"],
  orgyia: ["byzantine_historical"],
  litra: ["byzantine_historical"],
  ounkia: ["byzantine_historical"],
  cig: ["old_turkic_historical"],
};

/** Returns reviewed system identities for a registry unit ID. */
export function getMeasurementSystemsForUnit(
  unitId: string
): readonly MeasurementSystemId[] {
  return unitSystemIds[unitId] ?? [];
}

/** Returns all reviewed unit IDs that belong to a selected measurement system. */
export function getUnitIdsForMeasurementSystem(
  system: MeasurementSystemId
): string[] {
  return Object.entries(unitSystemIds)
    .filter(([, systems]) => systems.includes(system))
    .map(([unitId]) => unitId);
}
