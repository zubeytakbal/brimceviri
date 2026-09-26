import { conversionPages, type ConversionPage } from "./conversionPages";

type HindiPair = {
  sourceSlug: string;
  slug: string;
  fromName: string;
  toName: string;
  categoryName: string;
};

const pairs: HindiPair[] = [
  { sourceSlug: "kilogram-gram", slug: "kilogram-se-gram", fromName: "किलोग्राम", toName: "ग्राम", categoryName: "द्रव्यमान" },
  { sourceSlug: "gram-kilogram", slug: "gram-se-kilogram", fromName: "ग्राम", toName: "किलोग्राम", categoryName: "द्रव्यमान" },
  { sourceSlug: "kilometre-mil", slug: "kilometer-se-mile", fromName: "किलोमीटर", toName: "मील", categoryName: "लंबाई" },
  { sourceSlug: "mil-kilometre", slug: "mile-se-kilometer", fromName: "मील", toName: "किलोमीटर", categoryName: "लंबाई" },
  { sourceSlug: "santimetre-inc", slug: "centimeter-se-inch", fromName: "सेंटीमीटर", toName: "इंच", categoryName: "लंबाई" },
  { sourceSlug: "inc-santimetre", slug: "inch-se-centimeter", fromName: "इंच", toName: "सेंटीमीटर", categoryName: "लंबाई" },
  { sourceSlug: "metre-santimetre", slug: "meter-se-centimeter", fromName: "मीटर", toName: "सेंटीमीटर", categoryName: "लंबाई" },
  { sourceSlug: "santimetre-metre", slug: "centimeter-se-meter", fromName: "सेंटीमीटर", toName: "मीटर", categoryName: "लंबाई" },
  { sourceSlug: "litre-mililitre", slug: "liter-se-milliliter", fromName: "लीटर", toName: "मिलीलीटर", categoryName: "आयतन" },
  { sourceSlug: "mililitre-litre", slug: "milliliter-se-liter", fromName: "मिलीलीटर", toName: "लीटर", categoryName: "आयतन" },
  { sourceSlug: "santigrat-fahrenhayt", slug: "celsius-se-fahrenheit", fromName: "डिग्री सेल्सियस", toName: "डिग्री फ़ारेनहाइट", categoryName: "तापमान" },
  { sourceSlug: "fahrenhayt-santigrat", slug: "fahrenheit-se-celsius", fromName: "डिग्री फ़ारेनहाइट", toName: "डिग्री सेल्सियस", categoryName: "तापमान" },
];

export type HindiConversionPage = HindiPair & { source: ConversionPage };
export const hindiConversionPages: HindiConversionPage[] = pairs.map((pair) => {
  const source = conversionPages.find((page) => page.slug === pair.sourceSlug);
  if (!source) throw new Error(`Unknown Hindi conversion source: ${pair.sourceSlug}`);
  return { ...pair, source };
});

export function findHindiConversionPage(slug: string) {
  return hindiConversionPages.find((page) => page.slug === slug);
}
