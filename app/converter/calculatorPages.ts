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
    slug: "isi-enerjisi",
    category: "enerji",
    title: "Isı Enerjisi Hesaplayıcısı",
    shortTitle: "Isı Enerjisi",
    formula: "Q = m × c × ΔT",
    description:
      "Isı enerjisini, kütleyi, özgül ısıyı veya sıcaklık farkını gerçek birim dönüşümleriyle hesaplayın ve sonucu SI eşdeğeriyle birlikte görüntüleyin.",
  },
  {
    slug: "isi-iletimi",
    category: "enerji",
    title: "Isı İletimi Hesaplayıcısı",
    shortTitle: "Isı İletimi",
    formula: "Q̇ = k × A × ΔT / L",
    description:
      "Isı geçiş hızını, ısıl iletkenliği, alanı, sıcaklık farkını veya kalınlığı hesaplayın; malzeme ön ayarları ve SI tabanlı dönüşümlerle sonucu karşılaştırın.",
  },
  {
    slug: "reynolds-sayisi",
    category: "viskozite_dinamik",
    title: "Reynolds Sayısı Hesaplayıcısı",
    shortTitle: "Reynolds Sayısı",
    formula: "Re = ρ × v × D / μ",
    description:
      "Reynolds sayısını, akış hızını veya karakteristik çapı yoğunluk ve dinamik viskozite üzerinden hesaplayın ve boru içi akış için yaklaşık rejim yorumunu görün.",
  },
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
  {
    slug: "ohm-yasasi",
    category: "elektrik_direnc",
    title: "Ohm Yasası Hesaplayıcısı",
    shortTitle: "Ohm Yasası",
    formula: "V = I × R",
    description:
      "Gerilimi, akımı veya direnci V = I × R bağıntısıyla hesaplayın ve sonucu SI eşdeğeriyle birlikte görüntüleyin.",
  },
];

export function findCalculatorPage(slug: string) {
  return calculatorPages.find((page) => page.slug === slug);
}
