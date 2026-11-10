// Same Islamic tool in different languages (hreflang groups). Each country
// version applies the rules used there (e.g. Bangladesh: silver nisab in ভরি,
// 48-mile qasr distance; Turkey: Diyanet's 80.18 g gold nisab and 90 km).
export const ISLAMIC_TOOL_PATHS = {
  zakat: { tr: "/zekat-hesaplama", ar: "/ar/zakat-calculator", bn: "/bn/zakat-calculator" },
  kaza: { tr: "/kaza-namazi-hesaplama", bn: "/bn/kaza-namaz-calculator" },
  khatam: { tr: "/hatim-hesaplama", bn: "/bn/quran-khatam-planner" },
} as const;


/** Yalnız Arapça olan dini araçlar. */
export const ARABIC_ISLAMIC_PATHS = {
  iddah: "/ar/iddah-calculator",
  aqiqah: "/ar/aqiqah-calculator",
} as const;

export function islamicAlternates(tool: keyof typeof ISLAMIC_TOOL_PATHS) {
  const paths: Record<string, string> = { ...ISLAMIC_TOOL_PATHS[tool] };
  return { ...paths, "x-default": paths.tr };
}

