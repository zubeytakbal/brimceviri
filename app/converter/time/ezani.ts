// Ezani (alaturka) saat: gün, güneşin battığı anda başlar ve batış anı saat 12:00 kabul edilir.
// Sonraki 24 saat iki 12'lik dilimde sayılır (akşamdan sabaha 1–12, sabahtan akşama 1–12).
// Osmanlı'da resmî saat buydu; 26 Aralık 1925 tarihli 697 sayılı Kanun'la 1 Ocak 1926'dan itibaren
// bugünkü (vasati/alafranga) saate geçildi. Batış anı solar.ts ile hesaplanır (güneşin üst kenarı ufukta, kırılma dahil).
import { sunTimes } from "./solar";

const TR_OFFSET_MS = 3 * 3600000;
const DAY = 86400000;

/** Türkiye saatiyle verilen günün gün batımı (UTC ms). */
export function sunsetMs(year: number, month: number, day: number, lat: number, lon: number): number | null {
  const s = sunTimes(year, month, day, lat, lon);
  return s.kind === "normal" ? s.sunset.getTime() : null;
}

function trParts(ms: number) {
  const d = new Date(ms + TR_OFFSET_MS);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

export type EzaniTime = {
  /** Son gün batımından bu yana geçen süre (dakika, 0–1440). */
  elapsedMinutes: number;
  /** 12'lik kadranda gösterilen saat ve dakika (12:00 = gün batımı ya da 12 saat sonrası). */
  hour12: number;
  minute: number;
  /** Akşamdan sabaha ilk 12 saat mi, sabahtan akşama ikinci 12 saat mi. */
  half: "gece" | "gunduz";
  sunsetUsed: number;
};

/** Türkiye saatiyle verilen anı ezani saate çevirir. */
export function toEzani(instantMs: number, lat: number, lon: number): EzaniTime | null {
  const p = trParts(instantMs);
  const todaySunset = sunsetMs(p.y, p.m, p.d, lat, lon);
  if (todaySunset === null) return null;
  let base = todaySunset;
  if (instantMs < todaySunset) {
    const prev = trParts(instantMs - DAY);
    const y = sunsetMs(prev.y, prev.m, prev.d, lat, lon);
    if (y === null) return null;
    base = y;
  }
  const elapsedMinutes = Math.floor((instantMs - base) / 60000);
  const h24 = Math.floor(elapsedMinutes / 60);
  const minute = elapsedMinutes % 60;
  const h = h24 % 12;
  return { elapsedMinutes, hour12: h === 0 ? 12 : h, minute, half: h24 < 12 ? "gece" : "gunduz", sunsetUsed: base };
}

/**
 * Ezani saati Türkiye saatine çevirir. `year-month-day` akşamındaki gün batımı ezani 12:00'dır;
 * `half` = "gece" o akşamdan sonraki ilk 12 saat, "gunduz" ertesi sabahtan akşama kadar olan 12 saattir.
 */
export function fromEzani(year: number, month: number, day: number, hour12: number, minute: number, half: "gece" | "gunduz", lat: number, lon: number): number | null {
  const base = sunsetMs(year, month, day, lat, lon);
  if (base === null || hour12 < 1 || hour12 > 12 || minute < 0 || minute > 59) return null;
  const h = (hour12 % 12) + (half === "gunduz" ? 12 : 0);
  return base + (h * 60 + minute) * 60000;
}
