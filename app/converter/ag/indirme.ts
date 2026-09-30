// İndirme / yükleme süresi: dosya boyutu ve bağlantı hızından süre, ya da süreden gereken hız.

export type BoyutBirimi =
  | "KB"
  | "MB"
  | "GB"
  | "TB"
  | "KiB"
  | "MiB"
  | "GiB"
  | "TiB";
export type HizBirimi = "kbps" | "Mbps" | "Gbps" | "KB/s" | "MB/s";

/** Bayt karşılıkları: KB/MB/GB ondalık (1000), KiB/MiB/GiB ikili (1024). */
export const BOYUT_BAYT: Record<BoyutBirimi, number> = {
  KB: 1e3,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
  TiB: 1024 ** 4,
};

/** Saniyede bit karşılıkları (hız birimleri her zaman ondalıktır). */
export const HIZ_BIT: Record<HizBirimi, number> = {
  kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
  "KB/s": 8e3,
  "MB/s": 8e6,
};

/** Süre (saniye). `verim` 0–1: protokol ek yükü ve dalgalanma payı. */
export function indirmeSuresi(
  boyut: number,
  boyutBirimi: BoyutBirimi,
  hiz: number,
  hizBirimi: HizBirimi,
  verim = 1,
): number | null {
  if (!(boyut > 0) || !(hiz > 0) || !(verim > 0)) return null;
  return (
    (boyut * BOYUT_BAYT[boyutBirimi] * 8) / (hiz * HIZ_BIT[hizBirimi] * verim)
  );
}

/** Belirli sürede indirmek için gereken hız (Mbps). */
export function gerekenHiz(
  boyut: number,
  boyutBirimi: BoyutBirimi,
  saniye: number,
): number | null {
  if (!(boyut > 0) || !(saniye > 0)) return null;
  return (boyut * BOYUT_BAYT[boyutBirimi] * 8) / saniye / 1e6;
}

/** Mbps → MB/s (ondalık megabayt) */
export const mbpsMBs = (mbps: number) => mbps / 8;

/** Saniyeyi "2 sa 5 dk 30 sn" biçiminde yazar. */
export function sureMetni(sn: number): string {
  if (!Number.isFinite(sn)) return "—";
  if (sn < 1)
    return `${Math.max(0.01, Math.round(sn * 100) / 100).toLocaleString("tr-TR")} sn`;
  const s = Math.round(sn);
  const g = Math.floor(s / 86400);
  const sa = Math.floor((s % 86400) / 3600);
  const dk = Math.floor((s % 3600) / 60);
  const kalan = s % 60;
  const p: string[] = [];
  if (g) p.push(`${g} gün`);
  if (sa) p.push(`${sa} sa`);
  if (dk) p.push(`${dk} dk`);
  if (kalan && !g) p.push(`${kalan} sn`);
  return p.join(" ") || "0 sn";
}
