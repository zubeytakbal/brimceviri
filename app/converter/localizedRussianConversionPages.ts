import { conversionPages, type ConversionPage } from "./conversionPages";

type RussianPair = {
  sourceSlug: string;
  slug: string;
  fromName: string;
  toName: string;
  categoryName: string;
};

const pairs: RussianPair[] = [
  { sourceSlug: "kilogram-gram", slug: "kilogramm-v-grammy", fromName: "килограмм", toName: "грамм", categoryName: "Масса" },
  { sourceSlug: "gram-kilogram", slug: "grammy-v-kilogrammy", fromName: "грамм", toName: "килограмм", categoryName: "Масса" },
  { sourceSlug: "kilometre-mil", slug: "kilometry-v-mili", fromName: "километр", toName: "миля", categoryName: "Длина" },
  { sourceSlug: "mil-kilometre", slug: "mili-v-kilometry", fromName: "миля", toName: "километр", categoryName: "Длина" },
  { sourceSlug: "santimetre-inc", slug: "santimetry-v-dyuymy", fromName: "сантиметр", toName: "дюйм", categoryName: "Длина" },
  { sourceSlug: "inc-santimetre", slug: "dyuymy-v-santimetry", fromName: "дюйм", toName: "сантиметр", categoryName: "Длина" },
  { sourceSlug: "metre-santimetre", slug: "metry-v-santimetry", fromName: "метр", toName: "сантиметр", categoryName: "Длина" },
  { sourceSlug: "santimetre-metre", slug: "santimetry-v-metry", fromName: "сантиметр", toName: "метр", categoryName: "Длина" },
  { sourceSlug: "litre-mililitre", slug: "litry-v-millilitry", fromName: "литр", toName: "миллилитр", categoryName: "Объём" },
  { sourceSlug: "mililitre-litre", slug: "millilitry-v-litry", fromName: "миллилитр", toName: "литр", categoryName: "Объём" },
  { sourceSlug: "santigrat-fahrenhayt", slug: "celsius-v-fahrenheit", fromName: "градус Цельсия", toName: "градус Фаренгейта", categoryName: "Температура" },
  { sourceSlug: "fahrenhayt-santigrat", slug: "fahrenheit-v-celsius", fromName: "градус Фаренгейта", toName: "градус Цельсия", categoryName: "Температура" },
];

export type RussianConversionPage = RussianPair & { source: ConversionPage };

export const russianConversionPages: RussianConversionPage[] = pairs.map((pair) => {
  const source = conversionPages.find((page) => page.slug === pair.sourceSlug);
  if (!source) throw new Error(`Unknown Russian conversion source: ${pair.sourceSlug}`);
  return { ...pair, source };
});

export function findRussianConversionPage(slug: string) {
  return russianConversionPages.find((page) => page.slug === slug);
}
