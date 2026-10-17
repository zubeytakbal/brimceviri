// Ana sayfa arama sonuclarini siralar: baslik eslesmesi aciklama/kategori eslesmesinden once gelir.
// Saf fonksiyon; statik export'u etkilemez ve istemcide dizin indirildikten sonra calisir.

export type RankableSearchItem = {
  label: string;
  searchText: string;
};

function foldLabel(label: string) {
  return label
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function scoreSearchItem(item: RankableSearchItem, normalizedQuery: string): number {
  const label = foldLabel(item.label);
  if (label === normalizedQuery) return 0;
  if (label.startsWith(normalizedQuery)) return 1;
  if (label.split(" ").some((word) => word.startsWith(normalizedQuery))) return 2;
  if (label.includes(normalizedQuery)) return 3;
  return 4;
}

export function rankSearchResults<T extends RankableSearchItem>(
  items: T[],
  normalizedQuery: string,
  isMatch: (searchText: string, query: string) => boolean,
  limit: number
): T[] {
  return items
    .filter((item) => isMatch(item.searchText, normalizedQuery))
    .map((item, index) => ({ item, index, score: scoreSearchItem(item, normalizedQuery) }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.item);
}
