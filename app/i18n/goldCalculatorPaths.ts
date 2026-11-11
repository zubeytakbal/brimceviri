// The international gold purity calculator in each language (hreflang group).
export const GOLD_CALCULATOR_PATHS = {
  en: "/en/gold-karat-calculator",
  de: "/de/goldrechner",
} as const;

export const goldCalculatorAlternates = () => ({ ...GOLD_CALCULATOR_PATHS, "x-default": GOLD_CALCULATOR_PATHS.en });
