// Same Islamic tool in different languages (hreflang groups). Each country
// version applies the rules used there (e.g. Bangladesh: silver nisab in ভরি,
// 48-mile qasr distance; Turkey: Diyanet's 80.18 g gold nisab and 90 km).
export const ISLAMIC_TOOL_PATHS = {
  zakat: { tr: "/zekat-hesaplama" },
  kaza: { tr: "/kaza-namazi-hesaplama" },
  khatam: { tr: "/hatim-hesaplama" },
} as const;


/** Yalnız Arapça olan dini araçlar. */

export function islamicAlternates(tool: keyof typeof ISLAMIC_TOOL_PATHS) {
  const paths: Record<string, string> = { ...ISLAMIC_TOOL_PATHS[tool] };
  return { ...paths, "x-default": paths.tr };
}

