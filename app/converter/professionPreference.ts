// "Mesleğim" özelliği -- backend/hesap gerektirmeden, ziyaretçinin
// tarayıcısında (localStorage) hangi meslek grubunu seçtiğini saklar.
// recentTools.ts ile aynı desen: sunucu tarafında çalışmaz, özel
// gezinme veya localStorage engelli tarayıcılarda sessizce hiçbir şey
// yapmaz.

const STORAGE_KEY = "birimceviri:profession-preference";
// "storage" olayı sadece BAŞKA sekmelerde tetiklenir, aynı sekmede
// değil -- kayıt/temizleme sonrası aynı sekmedeki widget'ın da haberdar
// olması için ek bir custom event kullanılır.
const UPDATE_EVENT = "birimceviri:profession-preference-updated";

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

export function getProfessionPreference(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// useSyncExternalStore uyumlu okuma: ayni ham deger icin ayni referansi
// dondurur (Object.is karsilastirmasi gereksiz render dongusune girmesin).
let cachedValue: string | null = null;
let hasCached = false;

export function getProfessionPreferenceSnapshot(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  let raw: string | null;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (!hasCached || raw !== cachedValue) {
    cachedValue = raw;
    hasCached = true;
  }

  return cachedValue;
}

export function getProfessionPreferenceServerSnapshot(): string | null {
  return null;
}

export function subscribeToProfessionPreference(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export function setProfessionPreference(professionId: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, professionId);
    notifyUpdate();
  } catch {
    // localStorage kullanilamiyor (gizli sekme, engellenmis vb.) -- sessizce yoksay
  }
}

export function clearProfessionPreference() {
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
