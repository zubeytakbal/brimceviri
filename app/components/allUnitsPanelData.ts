// "Tum birimler" panelindeki satirlarin cift sayfalarina baglanmasi icin
// sunucuda hazirlanan "kaynak|hedef" -> href haritasi.
export function buildPairHrefs(
  conversions: Array<{ fromUnit: string; toUnit: string; slug: string }>,
  hrefForSlug: (slug: string) => string
) {
  const hrefs: Record<string, string> = {};

  for (const conversion of conversions) {
    hrefs[`${conversion.fromUnit}|${conversion.toUnit}`] ??= hrefForSlug(
      conversion.slug
    );
  }

  return hrefs;
}
