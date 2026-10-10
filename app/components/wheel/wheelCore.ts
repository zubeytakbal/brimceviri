// Cark cevir araci: liste ayrisma, agirlikli secim, dilim acilari ve cizim.
// Tum rastgelelik crypto.getRandomValues ile uretilir (Math.random kullanilmaz).

export type WheelEntry = { label: string; weight: number };

export const TAU = Math.PI * 2;
export const MAX_ENTRIES = 500;

export const mod = (a: number, m: number) => ((a % m) + m) % m;

/** [0, 1) araliginda kriptografik rastgele sayi. */
export function secureRandom() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] / 2 ** 32;
}

/** Her satir bir girdi; satir sonundaki "*3" o girdiye 3 kat agirlik verir (1–99). */
export function parseEntries(text: string): WheelEntry[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, MAX_ENTRIES)
    .map((l) => {
      const m = l.match(/^(.*?)\s*\*\s*(\d{1,2})$/);
      return m && m[1] ? { label: m[1], weight: Math.max(1, Math.min(99, Number(m[2]))) } : { label: l, weight: 1 };
    });
}

/** Her dilimin [baslangic, bitis) acisi; dilim genisligi agirlikla orantilidir. */
export function sliceArcs(entries: WheelEntry[]): Array<[number, number]> {
  const total = entries.reduce((s, e) => s + e.weight, 0) || 1;
  let acc = 0;
  return entries.map((e) => {
    const a0 = acc;
    acc += (e.weight / total) * TAU;
    return [a0, acc];
  });
}

/** Ibre sagda (aci 0). Cark rot kadar donmusse ibrenin altindaki dilim. */
export function indexAtPointer(entries: WheelEntry[], rot: number) {
  const th = mod(-rot, TAU);
  const arcs = sliceArcs(entries);
  for (let i = 0; i < arcs.length; i++) if (th >= arcs[i][0] && th < arcs[i][1]) return i;
  return arcs.length - 1;
}

export function pickWeighted(entries: WheelEntry[], random = secureRandom) {
  const total = entries.reduce((s, e) => s + e.weight, 0);
  let x = random() * total;
  for (let i = 0; i < entries.length; i++) {
    x -= entries[i].weight;
    if (x < 0) return i;
  }
  return entries.length - 1;
}

/** Kazanan dilimin icinde (kenarlardan uzak) bir noktaya duracak son aci. */
export function landingRotation(entries: WheelEntry[], winner: number, rot: number, turns: number, random = secureRandom) {
  const [a0, a1] = sliceArcs(entries)[winner];
  const land = a0 + (0.15 + random() * 0.7) * (a1 - a0);
  const delta = mod(mod(-land, TAU) - mod(rot, TAU), TAU);
  return rot + delta + turns * TAU;
}

/** Fisher–Yates karistirma (yeni dizi dondurur). */
export function shuffled<T>(list: readonly T[], random = secureRandom): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Listeyi rastgele ve olabildigince esit takimlara boler. */
export function splitTeams<T>(list: readonly T[], count: number, random = secureRandom): T[][] {
  const teams = Array.from({ length: count }, () => [] as T[]);
  shuffled(list, random).forEach((item, i) => teams[i % count].push(item));
  return teams;
}

export type DrawOptions = { unique: boolean; stripAt: boolean; exclude: string; locale: string };

/** Yorum listesinden katilimci adlari: her satirin ilk kelimesi, hariç tutulanlar ve tekrarlar ayiklanir. */
export function drawParticipants(text: string, o: DrawOptions) {
  const key = (s: string) => s.replace(/^@/, "").toLocaleLowerCase(o.locale);
  const ex = new Set(o.exclude.split(/[,\n]/).map((s) => key(s.trim())).filter(Boolean));
  let people = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const first = l.split(/\s+/)[0];
      return o.stripAt ? first.replace(/^@+/, "") : first;
    })
    .filter((n) => n && !ex.has(key(n)));
  if (o.unique) {
    const seen = new Set<string>();
    people = people.filter((n) => {
      const k = key(n);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }
  return people;
}

/** Katilimci listesinin SHA-256 ozetinin ilk 6 baytı, "4716 4E75 0353" biçiminde. */
export async function listFingerprint(people: readonly string[], locale: string) {
  const sorted = people.slice().sort((a, b) => a.localeCompare(b, locale));
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sorted.join("\n")));
  return Array.from(new Uint8Array(buf))
    .slice(0, 6)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export const WHEEL_THEMES = {
  turkuaz: ["#168f8c", "#f0b429", "#1f4f66", "#3fa7a7", "#e4572e", "#0f6f6c", "#f6d365", "#9ad8d3"],
  seker: ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"],
  klasik: ["#d62828", "#f77f00", "#fcbf49", "#2a9d8f", "#264653", "#4361ee", "#8338ec", "#06d6a0"],
  gece: ["#1b1f3b", "#53354a", "#903749", "#e84545", "#2b2e4a", "#3f72af", "#112d4e", "#f9a826"],
} as const;

export type WheelThemeId = keyof typeof WHEEL_THEMES;

function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

/** Iki renk arasindaki kaba fark (RGB uzakligi). */
function colorGap(a: string, b: string) {
  const [r1, g1, b1] = rgb(a);
  const [r2, g2, b2] = rgb(b);
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

function inkFor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#172033" : "#ffffff";
}

/** Carki tuvale cizer: kenar, dilimler, yazilar, civiler, ic golge ve sabit parlaklik. */
export function drawWheel(canvas: HTMLCanvasElement, entries: WheelEntry[], rot: number, theme: WheelThemeId, font: string) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  if (!ctx || !w) return;
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) / 2;
  const rim = R * 0.07;
  const r = R - rim;
  const pal = WHEEL_THEMES[theme];
  ctx.clearRect(0, 0, w, h);

  const rg = ctx.createLinearGradient(0, 0, 0, h);
  rg.addColorStop(0, "#f7fafb");
  rg.addColorStop(1, "#93a9b2");
  ctx.beginPath();
  ctx.arc(cx, cy, R - 1, 0, TAU);
  ctx.fillStyle = rg;
  ctx.fill();

  const arcs = sliceArcs(entries);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  if (!entries.length) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, TAU);
    ctx.fillStyle = "#f8fbfc";
    ctx.fill();
  }
  arcs.forEach(([a0, a1], i) => {
    let col: string = pal[i % pal.length];
    // Son dilim, iki komsusu olan ilk ve sondan onceki dilime benzemesin.
    if (i === arcs.length - 1 && arcs.length > 2) {
      const prev = pal[(i - 1) % pal.length];
      if (colorGap(col, pal[0]) < 90 || colorGap(col, prev) < 90) {
        col = pal.find((c) => colorGap(c, pal[0]) >= 90 && colorGap(c, prev) >= 90) ?? col;
      }
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, a0, a1);
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.5)";
    ctx.lineWidth = Math.max(1, R * 0.005);
    ctx.stroke();

    const span = a1 - a0;
    ctx.save();
    ctx.rotate(a0 + span / 2);
    const fs = Math.max(R * 0.04, Math.min(R * 0.12, span * r * 0.55, (R * 1.1) / Math.max(6, entries[i].label.length + 2)));
    ctx.font = `700 ${fs}px ${font}`;
    ctx.fillStyle = inkFor(col);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    let label = entries[i].label;
    const maxW = r * 0.72;
    while (ctx.measureText(label).width > maxW && label.length > 2) label = label.slice(0, -2) + "…";
    ctx.fillText(label, r - R * 0.05, fs * 0.06);
    ctx.restore();
  });
  arcs.forEach(([a0]) => {
    const pr = r + rim * 0.48;
    ctx.beginPath();
    ctx.arc(Math.cos(a0) * pr, Math.sin(a0) * pr, Math.max(2, rim * 0.2), 0, TAU);
    ctx.fillStyle = "#fffaf0";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  ctx.restore();

  const sh = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r);
  sh.addColorStop(0, "rgba(0,0,0,0)");
  sh.addColorStop(1, "rgba(0,0,0,.24)");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.fillStyle = sh;
  ctx.fill();
  const gl = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.45, r * 0.05, cx - r * 0.2, cy - r * 0.3, r);
  gl.addColorStop(0, "rgba(255,255,255,.34)");
  gl.addColorStop(0.5, "rgba(255,255,255,.06)");
  gl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.fillStyle = gl;
  ctx.fill();
}
