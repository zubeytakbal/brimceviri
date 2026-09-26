import { unitPages } from "./unitPages";

export const hindiCategoryPages = [
  { sourceSlug: "uzunluk", slug: "lambai", category: "uzunluk", title: "लंबाई रूपांतरण", description: "मीटर, सेंटीमीटर, किलोमीटर, मील और इंच के बीच लंबाई बदलें।" },
  { sourceSlug: "kutle", slug: "dravyaman", category: "kutle", title: "द्रव्यमान रूपांतरण", description: "किलोग्राम और ग्राम के बीच द्रव्यमान बदलें।" },
  { sourceSlug: "hacim", slug: "aayatan", category: "hacim", title: "आयतन रूपांतरण", description: "लीटर और मिलीलीटर के बीच आयतन बदलें।" },
  { sourceSlug: "sicaklik", slug: "taapmaan", category: "sicaklik", title: "तापमान रूपांतरण", description: "सेल्सियस और फ़ारेनहाइट के बीच तापमान बदलें।" },
] as const;

const units = [
  { sourceSlug: "metre", slug: "meter", name: "मीटर", description: "मीटर लंबाई की SI मूल इकाई है। 1 मीटर = 100 सेंटीमीटर।" },
  { sourceSlug: "santimetre", slug: "centimeter", name: "सेंटीमीटर", description: "सेंटीमीटर मीटर का सौवाँ भाग है। 1 सेंटीमीटर = 0.01 मीटर।" },
  { sourceSlug: "kilometre", slug: "kilometer", name: "किलोमीटर", description: "किलोमीटर लंबी दूरी मापने के काम आता है। 1 किलोमीटर = 1000 मीटर।" },
  { sourceSlug: "mil", slug: "mile", name: "मील", description: "मील लंबाई की इकाई है। 1 मील = 1.609344 किलोमीटर।" },
  { sourceSlug: "inc", slug: "inch", name: "इंच", description: "इंच लंबाई की इकाई है। 1 इंच = 2.54 सेंटीमीटर।" },
  { sourceSlug: "kilogram", slug: "kilogram", name: "किलोग्राम", description: "किलोग्राम द्रव्यमान की SI मूल इकाई है। 1 किलोग्राम = 1000 ग्राम।" },
  { sourceSlug: "gram", slug: "gram", name: "ग्राम", description: "ग्राम द्रव्यमान की इकाई है। 1 ग्राम = 0.001 किलोग्राम।" },
  { sourceSlug: "litre", slug: "liter", name: "लीटर", description: "लीटर आयतन मापने के काम आता है। 1 लीटर = 1000 मिलीलीटर।" },
  { sourceSlug: "mililitre", slug: "milliliter", name: "मिलीलीटर", description: "मिलीलीटर आयतन की छोटी इकाई है। 1 मिलीलीटर = 0.001 लीटर।" },
  { sourceSlug: "santigrat", slug: "celsius", name: "डिग्री सेल्सियस", description: "सेल्सियस तापमान का पैमाना है। 0 °C = 32 °F और 100 °C = 212 °F।" },
  { sourceSlug: "fahrenhayt", slug: "fahrenheit", name: "डिग्री फ़ारेनहाइट", description: "फ़ारेनहाइट तापमान का पैमाना है। 32 °F = 0 °C और 212 °F = 100 °C।" },
] as const;

export const hindiUnitPages = units.map((unit) => {
  const source = unitPages.find((page) => page.slug === unit.sourceSlug);
  if (!source) throw new Error(`Unknown Hindi unit source: ${unit.sourceSlug}`);
  return { ...unit, category: source.category, symbol: source.symbol, unit: source.unit };
});
