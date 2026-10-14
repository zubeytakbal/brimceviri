// Ilgili araclar: arama dizinindeki (bkz. HomeSearch) kayitlardan, bulunulan sayfayla ayni
// kategorideki diger sayfalari secer. Saf fonksiyonlar; istemcide dizin indirildikten sonra calisir.

export type RelatedIndexItem = {
  id: string;
  href: string;
  label: string;
  categoryLabel: string;
};

export const SEARCH_INDEX_LOCALES = ["tr", "en", "uz", "de", "ar", "bn", "da", "es", "fr", "it", "no", "pt", "sv"] as const;
export type SearchIndexLocale = (typeof SEARCH_INDEX_LOCALES)[number];

export function localeFromPathname(pathname: string): SearchIndexLocale {
  const first = pathname.split("/")[1] ?? "";
  return (SEARCH_INDEX_LOCALES as readonly string[]).includes(first) && first !== "tr"
    ? (first as SearchIndexLocale)
    : "tr";
}

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function findRelatedTools<T extends RelatedIndexItem>(items: T[], pathname: string, limit = 6): T[] {
  const current = normalizePath(pathname);
  const self = items.find((item) => normalizePath(item.href) === current);
  if (!self) return [];
  const seen = new Set<string>([current]);
  const related: T[] = [];
  for (const item of items) {
    const href = normalizePath(item.href);
    if (item.categoryLabel !== self.categoryLabel || seen.has(href)) continue;
    seen.add(href);
    related.push(item);
    if (related.length >= limit) break;
  }
  return related;
}
