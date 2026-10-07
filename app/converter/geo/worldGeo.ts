// Ulke sayfalari ve dunya haritasi icin yardimci hesaplar.
import { fxPairsTr } from "../fx/fxPairsTr";
import { countryPowerData } from "../travelPlugVoltage";
import { airKm } from "./provinceDistances";
import { countryByIso3, worldCountries, type WorldCountry } from "./worldCountries";
import { WORLD_MAP_OTHER, WORLD_MAP_PATHS, WORLD_MAP_SIZE } from "./worldMapPaths";

export const TURKEY = countryByIso3("TUR")!;

/** Iki saat dilimi arasindaki fark (dakika): hedef - Turkiye. */
export function offsetMinutes(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(date);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(name);
  if (!m) return 0;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0));
}

export function timeDiffWithTurkey(country: WorldCountry, date: Date) {
  return offsetMinutes(country.tz, date) - offsetMinutes(TURKEY.tz, date);
}

export function timeDiffText(minutes: number) {
  if (minutes === 0) return "Türkiye ile aynı saat";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const amount = h ? (m ? `${h} saat ${m} dakika` : `${h} saat`) : `${m} dakika`;
  return `${amount} ${minutes > 0 ? "ileri" : "geri"}`;
}

export function distanceFromAnkara(country: WorldCountry) {
  return airKm({ lat: TURKEY.capLat, lon: TURKEY.capLon }, { lat: country.capLat, lon: country.capLon });
}

let currencyNames: Intl.DisplayNames | null = null;

export function currencyNameTr(code: string) {
  if (code === "TRY") return "Türk lirası";
  try {
    currencyNames ??= new Intl.DisplayNames(["tr"], { type: "currency" });
    return currencyNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function fxPairFor(code: string) {
  return fxPairsTr.find((p) => p.from === code && p.to === "TRY") ?? null;
}

export function powerFor(country: WorldCountry) {
  return countryPowerData.find((p) => p.nameTr.toLocaleLowerCase("tr-TR") === country.nameTr.toLocaleLowerCase("tr-TR")) ?? null;
}

export function neighborsOf(country: WorldCountry) {
  return country.borders.map((b) => countryByIso3(b)).filter((c): c is WorldCountry => Boolean(c));
}

/** Kara komsusu olmayanlar dahil, baskentleri en yakin ulkeler (komsular haric). */
export function nearestCountries(country: WorldCountry, count = 5) {
  const skip = new Set([country.iso3, ...country.borders]);
  return worldCountries
    .filter((c) => !skip.has(c.iso3))
    .map((c) => ({ country: c, km: airKm({ lat: country.capLat, lon: country.capLon }, { lat: c.capLat, lon: c.capLon }) }))
    .sort((x, y) => x.km - y.km)
    .slice(0, count);
}

export function areaRank(country: WorldCountry) {
  const sorted = [...worldCountries].sort((a, b) => b.area - a.area);
  return sorted.findIndex((c) => c.iso3 === country.iso3) + 1;
}

/* ---------- Harita kirpma ---------- */

let bboxCache: Map<string, [number, number, number, number]> | null = null;

export function pathBbox(d: string): [number, number, number, number] {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const m of d.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)) {
    const x = Number(m[1]);
    const y = Number(m[2]);
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

/** Bir ulkenin harita uzerindeki sinir kutusu (cizimi yoksa baskent noktasi etrafi). */
export function countryBbox(country: WorldCountry): [number, number, number, number] {
  bboxCache ??= new Map();
  const cached = bboxCache.get(country.iso3);
  if (cached) return cached;
  const d = WORLD_MAP_PATHS[country.iso3];
  let box: [number, number, number, number];
  if (d) {
    // Cok parcali ulkelerde (ABD, Rusya, Fransa) uzak adalar kutuyu buyutmesin diye baskente en yakin parcayi one al.
    const parts = d.split("M").filter(Boolean).map((p) => pathBbox(`M${p}`));
    const areaOf = (b: number[]) => (b[2] - b[0]) * (b[3] - b[1]);
    const main = parts.reduce((best, b) => (areaOf(b) > areaOf(best) ? b : best), parts[0]);
    box = main;
    // Ana parcaya yakin (kendi boyutunun yarisi mesafesindeki) parcalari da ekle
    const [mx0, my0, mx1, my1] = main;
    const reach = Math.max(mx1 - mx0, my1 - my0) * 0.6;
    for (const b of parts) {
      if (b[0] > mx1 + reach || b[2] < mx0 - reach || b[1] > my1 + reach || b[3] < my0 - reach) continue;
      box = [Math.min(box[0], b[0]), Math.min(box[1], b[1]), Math.max(box[2], b[2]), Math.max(box[3], b[3])];
    }
  } else {
    box = [country.capX - 2, country.capY - 2, country.capX + 2, country.capY + 2];
  }
  bboxCache.set(country.iso3, box);
  return box;
}

/** Ulkeler grubunu cevreleyen, en boy orani ~2:1 olan viewBox. */
export function cropViewBox(countries: WorldCountry[], minWidth = 90) {
  const boxes = countries.map(countryBbox);
  let x0 = Math.min(...boxes.map((b) => b[0]));
  let y0 = Math.min(...boxes.map((b) => b[1]));
  let x1 = Math.max(...boxes.map((b) => b[2]));
  let y1 = Math.max(...boxes.map((b) => b[3]));
  const pad = Math.max(x1 - x0, y1 - y0) * 0.15 + 6;
  x0 -= pad;
  y0 -= pad;
  x1 += pad;
  y1 += pad;
  let w = Math.max(x1 - x0, minWidth);
  let h = Math.max(y1 - y0, minWidth / 2);
  if (w < h * 1.6) w = h * 1.6;
  else if (h < w / 2.2) h = w / 2.2;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const vx = Math.max(0, Math.min(WORLD_MAP_SIZE.width - w, cx - w / 2));
  const vy = Math.max(0, Math.min(WORLD_MAP_SIZE.height - h, cy - h / 2));
  return `${vx.toFixed(1)} ${vy.toFixed(1)} ${Math.min(w, WORLD_MAP_SIZE.width).toFixed(1)} ${Math.min(h, WORLD_MAP_SIZE.height).toFixed(1)}`;
}

export const WORLD_REGION_COLORS: Record<string, string> = {
  Avrupa: "#7fb3d5",
  Asya: "#e8a87c",
  Afrika: "#f6c26b",
  Amerika: "#8fc98a",
  Okyanusya: "#b8a1d9",
};

export { WORLD_MAP_OTHER, WORLD_MAP_PATHS, WORLD_MAP_SIZE };
