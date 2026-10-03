// Same Islamic tool in different languages (hreflang groups). Each country
// version applies the rules used there (e.g. Bangladesh: silver nisab in ভরি,
// 48-mile qasr distance; Turkey: Diyanet's 80.18 g gold nisab and 90 km).
export const ISLAMIC_TOOL_PATHS = {
  zakat: { tr: "/zekat-hesaplama", ar: "/ar/zakat-calculator", bn: "/bn/zakat-calculator" },
  kaza: { tr: "/kaza-namazi-hesaplama", bn: "/bn/kaza-namaz-calculator", uz: "/uz/qazo-namoz-hisoblash" },
  khatam: { tr: "/hatim-hesaplama", bn: "/bn/quran-khatam-planner", uz: "/uz/quron-xatm-rejasi" },
  qasr: { tr: "/seferi-mesafe-hesaplama", ar: "/ar/qasr-prayer-calculator", bn: "/bn/qasr-distance-calculator" },
} as const;

export const BENGALI_ISLAMIC_HUB = "/bn/islamic-tools";
export const ARABIC_ISLAMIC_HUB = "/ar/islamic-tools";

/** Dini araç merkez sayfaları birbirinin dil sürümü. */
export const ISLAMIC_HUB_ALTERNATES = { tr: "/dini-araclar", ar: ARABIC_ISLAMIC_HUB, bn: BENGALI_ISLAMIC_HUB, "x-default": "/dini-araclar" };

/** Yalnız Arapça olan dini araçlar. */
export const ARABIC_ISLAMIC_PATHS = {
  iddah: "/ar/iddah-calculator",
  aqiqah: "/ar/aqiqah-calculator",
} as const;

export function islamicAlternates(tool: keyof typeof ISLAMIC_TOOL_PATHS) {
  const paths: Record<string, string> = { ...ISLAMIC_TOOL_PATHS[tool] };
  // Uzbek pages use the uz-UZ hreflang code like the rest of the Uzbek site.
  if (paths.uz) {
    paths["uz-UZ"] = paths.uz;
    delete paths.uz;
  }
  return { ...paths, "x-default": paths.tr };
}

export const UZBEK_ISLAMIC_PATHS = {
  qazo: "/uz/qazo-namoz-hisoblash",
  xatm: "/uz/quron-xatm-rejasi",
} as const;
