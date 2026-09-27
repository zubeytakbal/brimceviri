"use client";

import { useCallback, useEffect, useState } from "react";
import { setCustomSoundUrl } from "./timeSounds";

// Kullanicinin sectigi ses dosyasi IndexedDB'de (yalnizca bu tarayicida) saklanir;
// sunucuya gonderilmez. Tum alarm ve zamanlayicilar ayni dosyayi kullanir.
const DB = "birimceviri-sounds";
const STORE = "files";
const KEY = "custom";
const MAX_BYTES = 15 * 1024 * 1024;

type Stored = { name: string; blob: Blob };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = run(db.transaction(STORE, mode).objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function useCustomSound() {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<"too-large" | "not-audio" | "storage" | null>(null);

  const activate = useCallback((stored: Stored | undefined) => {
    if (!stored) {
      setCustomSoundUrl(null);
      setName(null);
      return;
    }
    setCustomSoundUrl(URL.createObjectURL(stored.blob));
    setName(stored.name);
  }, []);

  useEffect(() => {
    if (typeof indexedDB === "undefined") return;
    withStore<Stored | undefined>("readonly", (store) => store.get(KEY) as IDBRequest<Stored | undefined>)
      .then(activate)
      .catch(() => {
        // Gizli sekme vb.: kendi ses secenegi bu ziyarette calisir ama saklanmaz.
      });
  }, [activate]);

  const choose = useCallback(
    async (file: File) => {
      setError(null);
      if (!file.type.startsWith("audio/")) return setError("not-audio");
      if (file.size > MAX_BYTES) return setError("too-large");
      const stored = { name: file.name, blob: file };
      activate(stored);
      try {
        await withStore("readwrite", (store) => store.put(stored, KEY));
      } catch {
        setError("storage");
      }
    },
    [activate]
  );

  const clear = useCallback(async () => {
    activate(undefined);
    try {
      await withStore("readwrite", (store) => store.delete(KEY));
    } catch {
      // Silinemezse bir sonraki yuklemede tekrar denenir.
    }
  }, [activate]);

  return { name, error, choose, clear };
}
