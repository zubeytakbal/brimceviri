"use client";

import { useSyncExternalStore } from "react";

// Sayfadaki cevirici (CategoryUnitConverter / PairConverter) ile
// "Tum birimler" paneli arasinda kucuk bir paylasilan durum. Anahtar
// genellikle kategori adidir; sunucu ciktisinda panel varsayilan
// degerlerle cizilir, istemcide cevirici degistikce guncellenir.

export type ConverterSyncState = {
  value: number | null;
  unit: string;
};

const states = new Map<string, ConverterSyncState>();
const listeners = new Map<string, Set<() => void>>();

export function publishConverterState(
  key: string,
  state: ConverterSyncState
) {
  const previous = states.get(key);

  if (
    previous &&
    previous.unit === state.unit &&
    Object.is(previous.value, state.value)
  ) {
    return;
  }

  states.set(key, state);
  listeners.get(key)?.forEach((listener) => listener());
}

export function useConverterState(key: string) {
  return useSyncExternalStore(
    (listener) => {
      const keyListeners = listeners.get(key) ?? new Set();
      keyListeners.add(listener);
      listeners.set(key, keyListeners);

      return () => {
        keyListeners.delete(listener);
      };
    },
    () => states.get(key) ?? null,
    () => null
  );
}
