// Site bildirimleri icin "gorulду" durumu -- backend/hesap gerektirmeden,
// ziyaretcinin tarayicisinda (localStorage) hangi bildirimleri kapattigini
// saklar. recentTools.ts ile ayni desen: sunucu tarafinda calismaz,
// localStorage engelli/gizli sekmede sessizce hicbir sey yapmaz.

const STORAGE_KEY = "birimceviri:seen-notifications";
const EMPTY_SNAPSHOT: string[] = [];
// "storage" olayi sadece BASKA sekmelerde tetiklenir, ayni sekmede
// degil -- ayni sekmedeki bildirim kutusunun da haberdar olmasi icin
// ek bir custom event kullanilir.
const UPDATE_EVENT = "birimceviri:seen-notifications-updated";

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

function parseIds(raw: string | null): string[] {
  if (!raw) {
    return EMPTY_SNAPSHOT;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY_SNAPSHOT;
    }
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function readIds(): string[] {
  if (typeof window === "undefined") {
    return EMPTY_SNAPSHOT;
  }

  try {
    return parseIds(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

// useSyncExternalStore uyumlu okuma: ayni ham deger icin ayni referansi
// dondurur (Object.is karsilastirmasi gereksiz render dongusune girmesin).
let cachedRaw: string | null = null;
let cachedSnapshot: string[] = EMPTY_SNAPSHOT;

export function getSeenNotificationIdsSnapshot(): string[] {
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
    cachedSnapshot = parseIds(raw);
  }

  return cachedSnapshot;
}

export function getSeenNotificationIdsServerSnapshot(): string[] {
  return EMPTY_SNAPSHOT;
}

export function subscribeToSeenNotifications(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export function markNotificationSeen(id: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = readIds();
    if (existing.includes(id)) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, id]));
    notifyUpdate();
  } catch {
    // localStorage kullanilamiyor (gizli sekme, engellenmis vb.) -- sessizce yoksay
  }
}
