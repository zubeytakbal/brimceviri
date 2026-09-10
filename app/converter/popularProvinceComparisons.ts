export type PopularComparison = {
  slug: string;
  provinceIdA: string;
  provinceIdB: string;
};

export const popularProvinceComparisons: PopularComparison[] = [
  { slug: "istanbul-erzurum", provinceIdA: "istanbul", provinceIdB: "erzurum" },
  { slug: "istanbul-ankara", provinceIdA: "istanbul", provinceIdB: "ankara" },
  { slug: "ankara-van", provinceIdA: "ankara", provinceIdB: "van" },
  { slug: "izmir-erzurum", provinceIdA: "izmir", provinceIdB: "erzurum" },
];

export function findPopularComparisonBySlug(slug: string): PopularComparison | undefined {
  return popularProvinceComparisons.find((comparison) => comparison.slug === slug);
}
