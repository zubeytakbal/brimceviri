import { unitRegistry } from "../../converter/unitRegistry";

export type ApiUnitInfo = {
  symbol: string;
  id: string;
  name: string;
};

export type ApiCategoryInfo = {
  category: string;
  units: ApiUnitInfo[];
};

// unitRegistry tek kaynak -- burada elle bakim gerektiren ayri bir
// birim listesi tutulmuyor, API'nin gordugu kategoriler/birimler
// otomatik olarak unitRegistry ile senkron kalir.
const categoryList: ApiCategoryInfo[] = (() => {
  const byCategory = new Map<string, ApiUnitInfo[]>();

  for (const entry of unitRegistry) {
    if (entry.siFactor === undefined && entry.category !== "sicaklik") {
      continue;
    }

    const list = byCategory.get(entry.category) ?? [];
    list.push({
      symbol: entry.symbol,
      id: entry.id,
      name: entry.tr?.name ?? entry.id,
    });
    byCategory.set(entry.category, list);
  }

  return Array.from(byCategory.entries()).map(([category, units]) => ({
    category,
    units,
  }));
})();

const categorySymbols = new Map<string, Set<string>>(
  categoryList.map((entry) => [
    entry.category,
    new Set(entry.units.map((unit) => unit.symbol)),
  ])
);

export function getApiCategories(): ApiCategoryInfo[] {
  return categoryList;
}

export function isValidCategory(category: string): boolean {
  return categorySymbols.has(category);
}

export function isValidUnit(category: string, symbol: string): boolean {
  return categorySymbols.get(category)?.has(symbol) ?? false;
}
