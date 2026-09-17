export type EnglishCategoryRelatedTool = {
  href: string;
  label: string;
};

/**
 * Contextual links for English unit-category pages.
 *
 * This is intentionally smaller than the Turkish profession catalogue: every
 * target here is a live English page and the connection is useful without
 * relying on a Turkey-specific occupation or regulation.
 */
export const englishCategoryRelatedTools: Record<
  string,
  readonly EnglishCategoryRelatedTool[]
> = {
  alan: [
    { href: "/en/paint-calculator", label: "Paint Calculator" },
    { href: "/en/tile-calculator", label: "Tile Calculator" },
    { href: "/en/brick-calculator", label: "Brick Calculator" },
    {
      href: "/en/laminate-flooring-calculator",
      label: "Laminate Flooring Calculator",
    },
    { href: "/en/wallpaper-calculator", label: "Wallpaper Calculator" },
  ],
  hacim: [
    {
      href: "/en/kitchen-measurement-converter",
      label: "Kitchen Measurement Converter",
    },
    { href: "/en/recipe-converter", label: "Recipe Converter" },
    { href: "/en/moving-box-calculator", label: "Moving Box Calculator" },
  ],
  uzunluk: [
    { href: "/en/length-comparison", label: "Length Comparison Tool" },
    { href: "/en/ring-size-converter", label: "Ring Size Converter" },
    { href: "/en/shoe-size-converter", label: "Shoe Size Converter" },
  ],
  kutle: [
    { href: "/en/bmi-calculator", label: "BMI Calculator" },
    { href: "/en/weight-comparison", label: "Weight Comparison Tool" },
  ],
  sicaklik: [
    { href: "/en/ac-btu-calculator", label: "AC BTU Calculator" },
    {
      href: "/en/engineering-calculators",
      label: "Engineering Calculators",
    },
  ],
  zaman: [
    { href: "/en/age-calculator", label: "Age Calculator" },
    {
      href: "/en/pregnancy-week-calculator",
      label: "Pregnancy Week Calculator",
    },
    { href: "/en/sleep-calculator", label: "Sleep Calculator" },
  ],
  hiz: [
    { href: "/en/running-pace-calculator", label: "Running Pace Calculator" },
    {
      href: "/en/fuel-consumption-calculator",
      label: "Fuel Consumption Calculator",
    },
  ],
  basinc: [
    {
      href: "/en/calculators/pressure-force-area",
      label: "Pressure, Force and Area Calculator",
    },
    {
      href: "/en/calculators/hydrostatic-pressure",
      label: "Hydrostatic Pressure Calculator",
    },
    {
      href: "/en/engineering-calculators",
      label: "Engineering Calculators",
    },
  ],
  enerji: [
    {
      href: "/en/electricity-consumption-calculator",
      label: "Electricity Consumption Calculator",
    },
    {
      href: "/en/natural-gas-cost-calculator",
      label: "Natural Gas Cost Calculator",
    },
    { href: "/en/ev-charging-calculator", label: "EV Charging Calculator" },
  ],
  guc: [
    {
      href: "/en/electricity-consumption-calculator",
      label: "Electricity Consumption Calculator",
    },
    { href: "/en/ev-charging-calculator", label: "EV Charging Calculator" },
  ],
  elektrik: [
    {
      href: "/en/engineering-calculators/electrical-calculators",
      label: "Electrical Calculators",
    },
    {
      href: "/en/electricity-consumption-calculator",
      label: "Electricity Consumption Calculator",
    },
  ],
  elektrik_direnc: [
    { href: "/en/calculators/ohms-law", label: "Ohm's Law Calculator" },
    {
      href: "/en/engineering-calculators/electrical-calculators",
      label: "Electrical Calculators",
    },
  ],
  kuvvet: [
    {
      href: "/en/calculators/pressure-force-area",
      label: "Pressure, Force and Area Calculator",
    },
  ],
  debi: [
    {
      href: "/en/calculators/reynolds-number",
      label: "Reynolds Number Calculator",
    },
  ],
  viskozite_dinamik: [
    {
      href: "/en/calculators/reynolds-number",
      label: "Reynolds Number Calculator",
    },
  ],
};
