"use client";

import { useEffect, useState } from "react";

// Saat gostergeleri icin canli zaman. Sunucu ciktisinda null doner ki
// hidrasyon uyusmazligi olmasin; istemcide requestAnimationFrame ile akar.
export function useNow(active = true) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const tick = () => {
      setNow(new Date());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return now;
}

export const pad2 = (value: number) => String(value).padStart(2, "0");

export function formatClock(date: Date, withSeconds = true) {
  const base = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  return withSeconds ? `${base}:${pad2(date.getSeconds())}` : base;
}

export function formatDuration(ms: number, withHundredths = false) {
  const safe = Math.max(0, ms);
  const totalSeconds = Math.floor(safe / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const main = hours > 0 ? `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}` : `${pad2(minutes)}:${pad2(seconds)}`;
  if (!withHundredths) return main;
  return `${main}.${pad2(Math.floor((safe % 1000) / 10))}`;
}

// Olay isleyicilerinde kullanilir (render disi); lint'in saf render kuralini korur.
export function nowMs() {
  return Date.now();
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
