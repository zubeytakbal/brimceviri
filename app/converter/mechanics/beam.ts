// Tek açıklıklı kirişlerde kesit tesirleri ve sehim (doğrusal elastik, küçük sehim, Euler–Bernoulli).
// Birimler SI: N, m, Pa, m⁴. Sehim aşağı yönde pozitif; moment alt lifi çeken (sarkan) yönde pozitif.
// Kaynak formüller: Gere & Goodno, Mechanics of Materials, Ek H (kiriş sehim ve eğim tabloları).

export type Support = "simple" | "cantilever" | "fixed";
export type BeamLoad = { kind: "point"; P: number; a: number } | { kind: "udl"; w: number };

export type BeamCase = { support: Support; L: number; EI: number; loads: BeamLoad[] };

type Fn = (x: number) => number;
type Single = { R1: number; R2: number; M1: number; M2: number; M: Fn; v: Fn };

/** Tek bir yük için mesnet tepkileri, uç momentleri, moment ve sehim fonksiyonları. */
function single(support: Support, L: number, EI: number, load: BeamLoad): Single {
  if (load.kind === "udl") {
    const w = load.w;
    if (support === "simple") {
      return { R1: (w * L) / 2, R2: (w * L) / 2, M1: 0, M2: 0, M: (x) => (w * x * (L - x)) / 2, v: (x) => (w * x * (L ** 3 - 2 * L * x * x + x ** 3)) / (24 * EI) };
    }
    if (support === "cantilever") {
      // x = 0 ankastre, x = L serbest uç.
      return { R1: w * L, R2: 0, M1: -(w * L * L) / 2, M2: 0, M: (x) => -(w * (L - x) ** 2) / 2, v: (x) => (w * x * x * (6 * L * L - 4 * L * x + x * x)) / (24 * EI) };
    }
    return { R1: (w * L) / 2, R2: (w * L) / 2, M1: -(w * L * L) / 12, M2: -(w * L * L) / 12, M: (x) => (w * (6 * L * x - 6 * x * x - L * L)) / 12, v: (x) => (w * x * x * (L - x) ** 2) / (24 * EI) };
  }

  const { P, a } = load;
  const b = L - a;
  if (support === "simple") {
    const R1 = (P * b) / L;
    const R2 = (P * a) / L;
    return {
      R1,
      R2,
      M1: 0,
      M2: 0,
      M: (x) => (x <= a ? R1 * x : R1 * x - P * (x - a)),
      v: (x) => (x <= a ? (P * b * x * (L * L - b * b - x * x)) / (6 * L * EI) : (P * a * (L - x) * (L * L - a * a - (L - x) ** 2)) / (6 * L * EI)),
    };
  }
  if (support === "cantilever") {
    return {
      R1: P,
      R2: 0,
      M1: -P * a,
      M2: 0,
      M: (x) => (x <= a ? -P * (a - x) : 0),
      v: (x) => (x <= a ? (P * x * x * (3 * a - x)) / (6 * EI) : (P * a * a * (3 * x - a)) / (6 * EI)),
    };
  }
  const R1 = (P * b * b * (3 * a + b)) / L ** 3;
  const R2 = (P * a * a * (a + 3 * b)) / L ** 3;
  const M1 = -(P * a * b * b) / (L * L);
  const M2 = -(P * a * a * b) / (L * L);
  return {
    R1,
    R2,
    M1,
    M2,
    M: (x) => M1 + R1 * x - (x > a ? P * (x - a) : 0),
    v: (x) => (x <= a ? (P * b * b * x * x * (3 * a * L - 3 * a * x - b * x)) / (6 * L ** 3 * EI) : (P * a * a * (L - x) ** 2 * (3 * b * L - 3 * b * (L - x) - a * (L - x))) / (6 * L ** 3 * EI)),
  };
}

export type BeamResult = {
  R1: number;
  R2: number;
  /** Ankastre uçlardaki moment (basit mesnette 0). */
  M1: number;
  M2: number;
  maxMoment: number;
  maxMomentAt: number;
  maxDeflection: number;
  maxDeflectionAt: number;
  M: Fn;
  v: Fn;
};

/** Yüklerin süperpozisyonu; en büyük moment ve sehim 2001 noktada aranır. */
export function solveBeam({ support, L, EI, loads }: BeamCase): BeamResult {
  const parts = loads.map((load) => single(support, L, EI, load));
  const M: Fn = (x) => parts.reduce((s, p) => s + p.M(x), 0);
  const v: Fn = (x) => parts.reduce((s, p) => s + p.v(x), 0);
  let maxMoment = 0;
  let maxMomentAt = 0;
  let maxDeflection = 0;
  let maxDeflectionAt = 0;
  const N = 2000;
  for (let i = 0; i <= N; i++) {
    const x = (L * i) / N;
    const m = M(x);
    const d = v(x);
    if (Math.abs(m) > Math.abs(maxMoment)) {
      maxMoment = m;
      maxMomentAt = x;
    }
    if (Math.abs(d) > Math.abs(maxDeflection)) {
      maxDeflection = d;
      maxDeflectionAt = x;
    }
  }
  // Tekil yükün tam altındaki tepe değeri ızgaraya düşmeyebilir.
  for (const load of loads) {
    if (load.kind === "point") {
      const m = M(load.a);
      if (Math.abs(m) > Math.abs(maxMoment)) {
        maxMoment = m;
        maxMomentAt = load.a;
      }
    }
  }
  return {
    R1: parts.reduce((s, p) => s + p.R1, 0),
    R2: parts.reduce((s, p) => s + p.R2, 0),
    M1: parts.reduce((s, p) => s + p.M1, 0),
    M2: parts.reduce((s, p) => s + p.M2, 0),
    maxMoment,
    maxMomentAt,
    maxDeflection,
    maxDeflectionAt,
    M,
    v,
  };
}

/** Yapı çeliği elastisite modülü, EN 1993-1-1 §3.2.6 (Pa). */
export const E_STEEL = 210e9;
/** Yapı çeliği kayma modülü, EN 1993-1-1 §3.2.6 (Pa). */
export const G_STEEL = 81e9;
/** Alüminyum alaşımları elastisite modülü, EN 1999-1-1 §3.2.5 (Pa). */
export const E_ALUMINIUM = 70e9;
export const GRAVITY = 9.80665;
