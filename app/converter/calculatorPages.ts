export type CalculatorPage = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  formula: string;
  description: string;
};

export const calculatorPages: CalculatorPage[] = [
  {
    slug: "basinc-kuvvet-alan",
    category: "basinc",
    title: "Basınç, Kuvvet ve Alan Hesaplayıcısı",
    shortTitle: "Basınç, Kuvvet ve Alan",
    formula: "P = F / A",
    description:
      "Basıncı, kuvveti veya alanı SI taban birimleri üzerinden hesaplayın ve sonucu Pa, bar, psi, N, kN, lbf, m², cm², mm² veya in² cinsinden görüntüleyin.",
  },
  {
    slug: "hidrostatik-basinc",
    category: "basinc",
    title: "Hidrostatik Basınç Hesaplayıcısı",
    shortTitle: "Hidrostatik Basınç",
    formula: "ΔP = ρgh",
    description:
      "Hidrostatik basınç farkını, yoğunluğu, derinliği veya yerçekimi ivmesini SI taban birimleri üzerinden hesaplayın ve sonucu okunabilir mühendislik ölçeğinde görüntüleyin.",
  },
];

export function findCalculatorPage(slug: string) {
  return calculatorPages.find((page) => page.slug === slug);
}
