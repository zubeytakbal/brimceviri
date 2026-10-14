// "Favoriler" ozelligi -- recentTools ile ayni mantik: hesap/backend yok, tarayicinin
// localStorage'inda saklanir; sunucuda calismaz ve localStorage engelliyse sessizce yoksayar.

export type FavoriteToolEntry = {
  href: string;
  title: string;
};

const STORAGE_KEY = "birimceviri:favorite-tools";
export const MAX_FAVORITES = 12;
const EMPTY_SNAPSHOT: FavoriteToolEntry[] = [];
const UPDATE_EVENT = "birimceviri:favorite-tools-updated";

export function parseFavorites(raw: string | null): FavoriteToolEntry[] {
  if (!raw) return EMPTY_SNAPSHOT;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_SNAPSHOT;
    return parsed.filter(
      (item): item is FavoriteToolEntry => typeof item?.href === "string" && typeof item?.title === "string"
    );
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

/** Saf fonksiyon: varsa cikarir, yoksa basa ekler; MAX_FAVORITES'i asmaz. */
export function toggleFavoriteEntry(list: FavoriteToolEntry[], entry: FavoriteToolEntry): FavoriteToolEntry[] {
  if (list.some((item) => item.href === entry.href)) {
    return list.filter((item) => item.href !== entry.href);
  }
  return [entry, ...list].slice(0, MAX_FAVORITES);
}

let cachedRaw: string | null = null;
let cachedSnapshot: FavoriteToolEntry[] = EMPTY_SNAPSHOT;

export function getFavoritesSnapshot(): FavoriteToolEntry[] {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_SNAPSHOT;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = parseFavorites(raw);
  }
  return cachedSnapshot;
}

export function getFavoritesServerSnapshot(): FavoriteToolEntry[] {
  return EMPTY_SNAPSHOT;
}

export function subscribeToFavorites(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export function toggleFavorite(entry: FavoriteToolEntry) {
  if (typeof window === "undefined") return;
  try {
    const updated = toggleFavoriteEntry(getFavoritesSnapshot(), entry);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(UPDATE_EVENT));
  } catch {
    // localStorage kullanilamiyor -- sessizce yoksay
  }
}
