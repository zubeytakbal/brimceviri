// Metrik vida (ISO 261/262/724), geçiş deliği (ISO 273), anahtar ağzı (ISO 4032/4014, DIN 934/931),
// alyan (ISO 4762), cıvata mukavemet sınıfları (ISO 898-1) ve boru dişleri (ISO 228-1/ISO 7-1, ASME B1.20.1).
// Çaplar ISO 724 temel profil formüllerinden hesaplanır; tablo değerleri standartlardaki karşılıklarıdır.

/** ISO 261 kaba diş adımları (mm). */
const COARSE: Array<[number, number]> = [
  [1, 0.25], [1.2, 0.25], [1.4, 0.3], [1.6, 0.35], [2, 0.4], [2.5, 0.45], [3, 0.5], [4, 0.7], [5, 0.8], [6, 1], [8, 1.25],
  [10, 1.5], [12, 1.75], [14, 2], [16, 2], [18, 2.5], [20, 2.5], [22, 2.5], [24, 3], [27, 3], [30, 3.5], [33, 3.5], [36, 4],
  [39, 4], [42, 4.5], [45, 4.5], [48, 5], [52, 5], [56, 5.5], [60, 5.5], [64, 6],
];

/** ISO 261'de sık kullanılan ince diş adımları (mm). */
const FINE: Array<[number, number]> = [
  [5, 0.5], [6, 0.75], [8, 1], [10, 1.25], [10, 1], [12, 1.5], [12, 1.25], [14, 1.5], [16, 1.5], [18, 1.5], [18, 2], [20, 1.5], [20, 2],
  [22, 1.5], [22, 2], [24, 1.5], [24, 2], [27, 2], [30, 2], [33, 2], [36, 2], [36, 3], [39, 3], [42, 3], [48, 3], [56, 4], [64, 4],
];

/** ISO 273 geçiş delikleri: ince, orta, kaba (mm). */
const CLEARANCE: Record<number, [number, number, number]> = {
  1.6: [1.7, 1.8, 2], 2: [2.2, 2.4, 2.6], 2.5: [2.7, 2.9, 3.1], 3: [3.2, 3.4, 3.6], 4: [4.3, 4.5, 4.8], 5: [5.3, 5.5, 5.8],
  6: [6.4, 6.6, 7], 8: [8.4, 9, 10], 10: [10.5, 11, 12], 12: [13, 13.5, 14.5], 14: [15, 15.5, 16.5], 16: [17, 17.5, 18.5],
  18: [19, 20, 21], 20: [21, 22, 24], 22: [23, 24, 26], 24: [25, 26, 28], 27: [28, 30, 32], 30: [31, 33, 35], 33: [34, 36, 38],
  36: [37, 39, 42], 39: [40, 42, 45], 42: [43, 45, 48], 45: [46, 48, 52], 48: [50, 52, 56], 52: [54, 56, 62], 56: [58, 62, 66],
  60: [62, 66, 70], 64: [66, 70, 74],
};

/** Altıgen anahtar ağzı (mm): ISO 4032/4014; DIN 934/931 farklıysa ikinci değer. */
const HEX: Record<number, [number, number?]> = {
  1.6: [3.2], 2: [4], 2.5: [5], 3: [5.5], 4: [7], 5: [8], 6: [10], 8: [13], 10: [16, 17], 12: [18, 19], 14: [21, 22], 16: [24],
  18: [27], 20: [30], 22: [34, 32], 24: [36], 27: [41], 30: [46], 33: [50], 36: [55], 39: [60], 42: [65], 45: [70], 48: [75],
  52: [80], 56: [85], 60: [90], 64: [95],
};

/** DIN 336 kılavuz matkap çapları, kaba diş (mm). */
const TAP_COARSE: Record<number, number> = {
  1: 0.75, 1.2: 0.95, 1.4: 1.1, 1.6: 1.25, 2: 1.6, 2.5: 2.05, 3: 2.5, 4: 3.3, 5: 4.2, 6: 5, 8: 6.8, 10: 8.5, 12: 10.2, 14: 12, 16: 14,
  18: 15.5, 20: 17.5, 22: 19.5, 24: 21, 27: 24, 30: 26.5, 33: 29.5, 36: 32, 39: 35, 42: 37.5, 45: 40.5, 48: 43, 52: 47, 56: 50.5,
  60: 54.5, 64: 58,
};
/** İnce dişte d − P ondalığı standart matkaba denk gelmediğinde kullanılan çaplar. */
const TAP_FINE: Record<string, number> = { "6x0.75": 5.2, "10x1.25": 8.8, "12x1.25": 10.8 };

/** İmbus (alyan) başlı cıvata ISO 4762 anahtar ölçüsü (mm). */
const SOCKET: Record<number, number> = {
  1.6: 1.5, 2: 1.5, 2.5: 2, 3: 2.5, 4: 3, 5: 4, 6: 5, 8: 6, 10: 8, 12: 10, 14: 12, 16: 14, 20: 17, 24: 19, 30: 22, 36: 27, 42: 32, 48: 36,
};

export type MetricThread = {
  id: string; // "M8" ya da "M8x1"
  d: number; // anma çapı
  P: number; // adım
  fine: boolean;
  d2: number; // böğür çapı
  d3: number; // cıvata diş dibi çapı
  D1: number; // somun diş dibi (iç) çapı
  As: number; // gerilme kesit alanı mm²
  tapDrill: number; // kılavuz matkap çapı
  clearance?: [number, number, number];
  hex?: [number, number?];
  socket?: number;
};

const r3 = (v: number) => Math.round(v * 1000) / 1000;
const label = (d: number) => String(d).replace(".", ",");

function build(d: number, P: number, fine: boolean): MetricThread {
  const d2 = d - 0.649519 * P;
  const d3 = d - 1.226869 * P;
  const D1 = d - 1.082532 * P;
  const As = (Math.PI / 4) * ((d2 + d3) / 2) ** 2;
  return {
    id: fine ? `M${label(d)}x${label(P)}` : `M${label(d)}`,
    d,
    P,
    fine,
    d2: r3(d2),
    d3: r3(d3),
    D1: r3(D1),
    As: Math.round(As * 10) / 10,
    // DIN 336; ince dişte kural anma çapı − adım.
    tapDrill: fine ? (TAP_FINE[`${d}x${P}`] ?? Math.round((d - P) * 100) / 100) : TAP_COARSE[d],
    clearance: CLEARANCE[d],
    hex: HEX[d],
    socket: fine ? undefined : SOCKET[d],
  };
}

export const COARSE_THREADS: MetricThread[] = COARSE.map(([d, P]) => build(d, P, false));
export const FINE_THREADS: MetricThread[] = FINE.map(([d, P]) => build(d, P, true));
export const ALL_THREADS: MetricThread[] = [...COARSE_THREADS, ...FINE_THREADS].sort((a, b) => a.d - b.d || Number(a.fine) - Number(b.fine) || b.P - a.P);

export const threadById = (id: string) => ALL_THREADS.find((t) => t.id === id);

/** Ölçülen dış çap ve (varsa) adıma göre en yakın metrik vidalar. */
export function identifyThread(measuredD: number, pitch?: number) {
  return ALL_THREADS.filter((t) => Math.abs(t.d - measuredD) <= Math.max(0.3, t.d * 0.04) && (pitch === undefined || Math.abs(t.P - pitch) < 0.03)).sort(
    (a, b) => Math.abs(a.d - measuredD) - Math.abs(b.d - measuredD) || Number(a.fine) - Number(b.fine),
  );
}

/* ---------------- ISO 898-1 cıvata mukavemet sınıfları ---------------- */

export type PropertyClass = {
  id: string;
  /** Anma ve en az çekme dayanımı (MPa); 8.8 için d ≤ 16 / d > 16 ayrı. */
  rm: number;
  rmMin: number;
  rmMinLarge?: number;
  /** En az akma (ReL) ya da %0,2 uzama gerilmesi (MPa). */
  re: number;
  reMin: number;
  reMinLarge?: number;
  /** Deneme (proof) gerilmesi Sp (MPa). */
  sp: number;
  spLarge?: number;
  note?: string;
};

export const PROPERTY_CLASSES: PropertyClass[] = [
  { id: "4.6", rm: 400, rmMin: 400, re: 240, reMin: 240, sp: 225 },
  { id: "4.8", rm: 400, rmMin: 420, re: 320, reMin: 340, sp: 310 },
  { id: "5.6", rm: 500, rmMin: 500, re: 300, reMin: 300, sp: 280 },
  { id: "5.8", rm: 500, rmMin: 520, re: 400, reMin: 420, sp: 380 },
  { id: "6.8", rm: 600, rmMin: 600, re: 480, reMin: 480, sp: 440 },
  { id: "8.8", rm: 800, rmMin: 800, rmMinLarge: 830, re: 640, reMin: 640, reMinLarge: 660, sp: 580, spLarge: 600, note: "M16'ya kadar ve M16'dan büyük için ayrı değerler" },
  { id: "9.8", rm: 900, rmMin: 900, re: 720, reMin: 720, sp: 650, note: "Yalnız M16'ya kadar" },
  { id: "10.9", rm: 1000, rmMin: 1040, re: 900, reMin: 940, sp: 830 },
  { id: "12.9", rm: 1200, rmMin: 1220, re: 1080, reMin: 1100, sp: 970 },
];

export const classById = (id: string) => PROPERTY_CLASSES.find((c) => c.id === id);

/** Verilen sınıf ve çap için en az değerler (MPa); 8.8'de d > 16 için büyük çap değerleri. */
export function classValues(c: PropertyClass, d: number) {
  const large = d > 16;
  return {
    rmMin: large && c.rmMinLarge ? c.rmMinLarge : c.rmMin,
    reMin: large && c.reMinLarge ? c.reMinLarge : c.reMin,
    sp: large && c.spLarge ? c.spLarge : c.sp,
  };
}

/** En az kopma yükü, akma yükü ve deneme yükü (N) = gerilme alanı × gerilme. */
export function boltLoads(t: MetricThread, c: PropertyClass) {
  const v = classValues(c, t.d);
  return { breaking: t.As * v.rmMin, yield: t.As * v.reMin, proof: t.As * v.sp, ...v };
}

/** "8.8" gibi bir sınıf kodunu çözer: ilk sayı × 100 = Rm, Rm × ikinci sayı / 10 = Re. */
export function decodeClass(code: string) {
  const m = /^(\d{1,2})[.,](\d)$/.exec(code.trim());
  if (!m) return null;
  const rm = Number(m[1]) * 100;
  return { rm, re: (rm * Number(m[2])) / 10, ratio: Number(m[2]) / 10 };
}

/** Paslanmaz cıvatalar (ISO 3506-1), en az değerler (MPa). */
export const STAINLESS_CLASSES = [
  { id: "A2-50 / A4-50", rm: 500, re: 210 },
  { id: "A2-70 / A4-70", rm: 700, re: 450 },
  { id: "A2-80 / A4-80", rm: 800, re: 600 },
];

/* ---------------- Boru dişleri ---------------- */

export type PipeThread = {
  size: string; // inç anma ölçüsü
  dn: number;
  bspTpi: number; // ISO 228-1 / ISO 7-1, inç başına diş
  bspMajor: number; // mm, dış çap (ISO 228-1)
  bspMinor: number; // mm, diş dibi çapı (Whitworth profili)
  npTpi: number; // ASME B1.20.1
  npOd: number; // mm, borunun dış çapı (NPT)
};

const PIPE: Array<[string, number, number, number, number, number]> = [
  ["1/8", 6, 28, 9.728, 27, 10.287],
  ["1/4", 8, 19, 13.157, 18, 13.716],
  ["3/8", 10, 19, 16.662, 18, 17.145],
  ["1/2", 15, 14, 20.955, 14, 21.336],
  ["3/4", 20, 14, 26.441, 14, 26.67],
  ["1", 25, 11, 33.249, 11.5, 33.401],
  ["1 1/4", 32, 11, 41.91, 11.5, 42.164],
  ["1 1/2", 40, 11, 47.803, 11.5, 48.26],
  ["2", 50, 11, 59.614, 11.5, 60.325],
  ["2 1/2", 65, 11, 75.184, 8, 73.025],
  ["3", 80, 11, 87.884, 8, 88.9],
  ["4", 100, 11, 113.03, 8, 114.3],
];

export const PIPE_THREADS: PipeThread[] = PIPE.map(([size, dn, bspTpi, bspMajor, npTpi, npOd]) => ({
  size,
  dn,
  bspTpi,
  bspMajor,
  // Whitworth profili: diş yüksekliği 0,640327·P, diş dibi = D − 1,280654·P
  bspMinor: r3(bspMajor - 1.280654 * (25.4 / bspTpi)),
  npTpi,
  npOd,
}));

/** Kumpasla ölçülen dış çapa en yakın boru dişleri (BSP ve NPT ayrı ayrı). */
export function identifyPipeThread(measured: number) {
  const near = (key: "bspMajor" | "npOd") => [...PIPE_THREADS].sort((a, b) => Math.abs(a[key] - measured) - Math.abs(b[key] - measured))[0];
  return { bsp: near("bspMajor"), npt: near("npOd") };
}
