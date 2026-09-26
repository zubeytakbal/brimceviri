import { unitPages } from "./unitPages";

export const russianCategoryPages = [
  { sourceSlug: "uzunluk", slug: "dlina", category: "uzunluk", title: "Перевод длины", description: "Переводите метры, сантиметры, километры, мили и дюймы." },
  { sourceSlug: "kutle", slug: "massa", category: "kutle", title: "Перевод массы", description: "Переводите килограммы в граммы и обратно." },
  { sourceSlug: "hacim", slug: "obyom", category: "hacim", title: "Перевод объёма", description: "Переводите литры в миллилитры и обратно." },
  { sourceSlug: "sicaklik", slug: "temperatura", category: "sicaklik", title: "Перевод температуры", description: "Переводите градусы Цельсия в градусы Фаренгейта и обратно." },
] as const;

const units = [
  { sourceSlug: "metre", slug: "metr", name: "метр", description: "Метр — основная единица длины в СИ. 1 метр = 100 сантиметров." },
  { sourceSlug: "santimetre", slug: "santimetr", name: "сантиметр", description: "Сантиметр составляет одну сотую метра. 1 сантиметр = 0,01 метра." },
  { sourceSlug: "kilometre", slug: "kilometr", name: "километр", description: "Километр используют для измерения больших расстояний. 1 километр = 1000 метров." },
  { sourceSlug: "mil", slug: "milya", name: "миля", description: "Миля — единица длины. 1 миля = 1,609344 километра." },
  { sourceSlug: "inc", slug: "dyuym", name: "дюйм", description: "Дюйм — единица длины. 1 дюйм = 2,54 сантиметра." },
  { sourceSlug: "kilogram", slug: "kilogramm", name: "килограмм", description: "Килограмм — основная единица массы в СИ. 1 килограмм = 1000 граммов." },
  { sourceSlug: "gram", slug: "gramm", name: "грамм", description: "Грамм — единица массы. 1 грамм = 0,001 килограмма." },
  { sourceSlug: "litre", slug: "litr", name: "литр", description: "Литр измеряет объём. 1 литр = 1000 миллилитров." },
  { sourceSlug: "mililitre", slug: "millilitr", name: "миллилитр", description: "Миллилитр — небольшая единица объёма. 1 миллилитр = 0,001 литра." },
  { sourceSlug: "santigrat", slug: "celsiy", name: "градус Цельсия", description: "Шкала Цельсия служит для измерения температуры. 0 °C = 32 °F; 100 °C = 212 °F." },
  { sourceSlug: "fahrenhayt", slug: "farengeyt", name: "градус Фаренгейта", description: "Шкала Фаренгейта служит для измерения температуры. 32 °F = 0 °C; 212 °F = 100 °C." },
] as const;

export const russianUnitPages = units.map((unit) => {
  const source = unitPages.find((page) => page.slug === unit.sourceSlug);
  if (!source) throw new Error(`Unknown Russian unit source: ${unit.sourceSlug}`);
  return { ...unit, category: source.category, symbol: source.symbol, unit: source.unit };
});
