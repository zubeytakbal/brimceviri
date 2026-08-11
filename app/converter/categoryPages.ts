export type CategoryPage = {
  slug: string;
  category: string;
  title: string;
  description: string;
};

export const categoryPages: CategoryPage[] = [
  {
    slug: "uzunluk",
    category: "uzunluk",
    title: "Uzunluk Dönüşümleri",
    description:
      "Metre, kilometre, santimetre, milimetre, mil, fit, inç ve yarda birimleri arasında hızlı ve ücretsiz dönüşüm yapın.",
  },
  {
    slug: "kutle",
    category: "kutle",
    title: "Kütle Dönüşümleri",
    description:
      "Kilogram, gram, miligram, ton, pound ve ons birimleri arasında hızlı ve ücretsiz dönüşüm yapın.",
  },
  {
    slug: "basinc",
    category: "basinc",
    title: "Basınç Dönüşümleri ve Hesaplamaları",
    description:
      "Pascal, kilopascal, bar, PSI, mmHg, atmosfer ve kgf/cm² başta olmak üzere basınç birimlerini dönüştürün; basınç türlerini, formüllerini ve mühendislik uygulamalarını inceleyin.",
  },
];
