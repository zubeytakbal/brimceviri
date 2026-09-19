// Pages d'unite francaises -- integrees au nouveau systeme i18n
// Fichier independant et nouveau (ne touche pas aux fichiers tr/en/de/ar/uz/bn existants).
// Commence avec les unites les plus importantes de chaque categorie ;
// l'extension complete est une etape suivante.

export type LocalizedFrenchUnitPage = {
  locale: "fr";
  sourceSlug: string;
  slug: string;
  category: string;
  categoryName: string;
  unit: string;
  name: string;
  symbol: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

export const frenchUnitPages: LocalizedFrenchUnitPage[] = [];

export function findFrenchUnitPageBySourceSlug(sourceSlug: string) {
  return frenchUnitPages.find((page) => page.sourceSlug === sourceSlug);
}

export function findFrenchUnitPage(category: string, unit: string) {
  return frenchUnitPages.find(
    (page) => page.category === category && page.unit === unit
  );
}
