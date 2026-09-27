"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// "Ekrani acik tut": sayfa acikken telefonun ekrani kararip tarayiciyi
// uyutmasin (Screen Wake Lock API). Desteklenmeyen tarayicida supported=false.
type WakeLockSentinelLike = { release: () => Promise<void>; addEventListener: (type: "release", cb: () => void) => void };

const noopSubscribe = () => () => {};

export function useWakeLock() {
  const [enabled, setEnabled] = useState(false);
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => "wakeLock" in navigator,
    () => false,
  );
  const sentinel = useRef<WakeLockSentinelLike | null>(null);

  const request = useCallback(async () => {
    const nav = navigator as Navigator & { wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> } };
    if (!nav.wakeLock) return false;
    try {
      sentinel.current = await nav.wakeLock.request("screen");
      sentinel.current.addEventListener("release", () => {
        sentinel.current = null;
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  // Sekme tekrar gorunur olunca kilidi yeniden al (tarayici gizlenince birakir).
  useEffect(() => {
    if (!enabled) return;
    const onVisible = () => {
      if (document.visibilityState === "visible" && !sentinel.current) void request();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [enabled, request]);

  useEffect(
    () => () => {
      void sentinel.current?.release();
    },
    []
  );

  const toggle = useCallback(async () => {
    if (enabled) {
      await sentinel.current?.release().catch(() => undefined);
      sentinel.current = null;
      setEnabled(false);
    } else {
      setEnabled(await request());
    }
  }, [enabled, request]);

  return { enabled, supported, toggle };
}
