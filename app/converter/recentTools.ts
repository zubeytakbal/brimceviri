// "Son baktiklarin" ozelligi -- backend/hesap gerektirmeden, ziyaretcinin
// tarayicisinda (localStorage) son gezdigi sayfalari saklar. Sunucu
// tarafinda calismaz (typeof window kontrolu), ozel gezinme veya
// localStorage engelli tarayicilarda sessizce hicbir sey yapmaz.

export type RecentToolEntry = {
  href: string;
  title: string;
  visitedAt: number;
};

const STORAGE_KEY = "birimceviri:recent-tools";
const MAX_ENTRIES = 6;
const EMPTY_SNAPSHOT: RecentToolEntry[] = [];
// "storage" olayi sadece BASKA sekmelerde tetiklenir, ayni sekmede
// degil -- kayit/temizleme sonrasi ayni sekmedeki widget'in da haberdar
// olmasi icin ek bir custom event kullanilir.
const UPDATE_EVENT = "birimceviri:recent-tools-updated";

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

function parseEntries(raw: string | null): RecentToolEntry[] {
  if (!raw) {
    return EMPTY_SNAPSHOT;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return EMPTY_SNAPSHOT;
    }

    return parsed.filter(
      (item): item is RecentToolEntry =>
        typeof item?.href === "string" &&
        typeof item?.title === "string" &&
        typeof item?.visitedAt === "number"
    );
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

export function getRecentTools(): RecentToolEntry[] {
  if (typeof window === "undefined") {
    return EMPTY_SNAPSHOT;
  }

  try {
    return parseEntries(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

// useSyncExternalStore uyumlu okuma: ayni ham deger icin ayni referansi
// dondurur (Object.is karsilastirmasi gereksiz render dongusune girmesin).
let cachedRaw: string | null = null;
let cachedSnapshot: RecentToolEntry[] = EMPTY_SNAPSHOT;

export function getRecentToolsSnapshot(): RecentToolEntry[] {
  if (typeof window === "undefined") {
    return EMPTY_SNAPSHOT;
  }

  let raw: string | null;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_SNAPSHOT;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = parseEntries(raw);
  }

  return cachedSnapshot;
}

export function getRecentToolsServerSnapshot(): RecentToolEntry[] {
  return EMPTY_SNAPSHOT;
}

export function subscribeToRecentTools(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export function recordRecentTool(entry: { href: string; title: string }) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = getRecentTools().filter(
      (item) => item.href !== entry.href
    );
    const updated = [
      { ...entry, visitedAt: Date.now() },
      ...existing,
    ].slice(0, MAX_ENTRIES);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyUpdate();
  } catch {
    // localStorage kullanilamiyor (gizli sekme, engellenmis vb.) -- sessizce yoksay
  }
}

export function clearRecentTools() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    notifyUpdate();
  } catch {
    // localStorage kullanilamiyor -- sessizce yoksay
  }
}
