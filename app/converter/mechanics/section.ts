// Basit kesitlerin geometrik özellikleri (mm biriminde). y: güçlü eksen (yükseklik yönünde eğilme), z: zayıf eksen.
// Kutu ve I kesitte köşe yuvarlaklıkları ihmal edilir; hazır profiller için katalog değerleri kullanılmalıdır.

export type SectionShape =
  | { kind: "rectangle"; b: number; h: number }
  | { kind: "circle"; d: number }
  | { kind: "tube"; D: number; t: number }
  | { kind: "box"; B: number; H: number; t: number }
  | { kind: "i"; b: number; h: number; tw: number; tf: number };

export type SectionProps = {
  A: number; // mm²
  Iy: number; // mm⁴
  Iz: number; // mm⁴
  Wy: number; // mm³
  Wz: number; // mm³
  iy: number; // mm
  iz: number; // mm
  /** Burulma için polar atalet momenti (yalnız dairesel kesitlerde tam değer). */
  J?: number; // mm⁴
};

function finish(A: number, Iy: number, Iz: number, ymax: number, zmax: number, J?: number): SectionProps {
  return { A, Iy, Iz, Wy: Iy / ymax, Wz: Iz / zmax, iy: Math.sqrt(Iy / A), iz: Math.sqrt(Iz / A), J };
}

export function isValidShape(s: SectionShape): boolean {
  const pos = (...v: number[]) => v.every((x) => Number.isFinite(x) && x > 0);
  switch (s.kind) {
    case "rectangle":
      return pos(s.b, s.h);
    case "circle":
      return pos(s.d);
    case "tube":
      return pos(s.D, s.t) && 2 * s.t < s.D;
    case "box":
      return pos(s.B, s.H, s.t) && 2 * s.t < Math.min(s.B, s.H);
    case "i":
      return pos(s.b, s.h, s.tw, s.tf) && 2 * s.tf < s.h && s.tw < s.b;
  }
}

export function sectionProps(s: SectionShape): SectionProps {
  switch (s.kind) {
    case "rectangle":
      return finish(s.b * s.h, (s.b * s.h ** 3) / 12, (s.h * s.b ** 3) / 12, s.h / 2, s.b / 2);
    case "circle": {
      const I = (Math.PI * s.d ** 4) / 64;
      return finish((Math.PI * s.d ** 2) / 4, I, I, s.d / 2, s.d / 2, 2 * I);
    }
    case "tube": {
      const d = s.D - 2 * s.t;
      const I = (Math.PI * (s.D ** 4 - d ** 4)) / 64;
      return finish((Math.PI * (s.D ** 2 - d ** 2)) / 4, I, I, s.D / 2, s.D / 2, 2 * I);
    }
    case "box": {
      const bi = s.B - 2 * s.t;
      const hi = s.H - 2 * s.t;
      return finish(s.B * s.H - bi * hi, (s.B * s.H ** 3 - bi * hi ** 3) / 12, (s.H * s.B ** 3 - hi * bi ** 3) / 12, s.H / 2, s.B / 2);
    }
    case "i": {
      const hw = s.h - 2 * s.tf;
      return finish(2 * s.b * s.tf + hw * s.tw, (s.b * s.h ** 3 - (s.b - s.tw) * hw ** 3) / 12, (2 * s.tf * s.b ** 3 + hw * s.tw ** 3) / 12, s.h / 2, s.b / 2);
    }
  }
}

/* ---------------- Euler burkulma ---------------- */

export type EndCondition = "pinned-pinned" | "fixed-free" | "fixed-pinned" | "fixed-fixed";

/** Teorik burkulma boyu katsayıları (K). */
export const BUCKLING_K: Record<EndCondition, number> = {
  "pinned-pinned": 1,
  "fixed-free": 2,
  "fixed-pinned": 0.7,
  "fixed-fixed": 0.5,
};

/** Euler kritik yükü (N). E Pa, I m⁴, L m. */
export function eulerLoad(E: number, I: number, L: number, K: number) {
  return (Math.PI ** 2 * E * I) / (K * L) ** 2;
}

/* ---------------- Mil burulması ---------------- */

/** Güç (W) ve devirden (dev/dk) tork (N·m): T = P / ω. */
export function torqueFromPower(powerW: number, rpm: number) {
  return powerW / ((2 * Math.PI * rpm) / 60);
}

/** Dairesel (dolu veya boru) milde en büyük kayma gerilmesi (Pa). T N·m, D ve d m. */
export function shaftShearStress(T: number, D: number, d = 0) {
  const J = (Math.PI * (D ** 4 - d ** 4)) / 32;
  return (T * (D / 2)) / J;
}

/** Burulma açısı (rad): θ = T·L / (G·J). */
export function shaftTwist(T: number, L: number, G: number, D: number, d = 0) {
  const J = (Math.PI * (D ** 4 - d ** 4)) / 32;
  return (T * L) / (G * J);
}

/** Dolu mil için izin verilen kayma gerilmesine göre gereken çap (m): d = (16T / (π τ))^(1/3). */
export function requiredSolidDiameter(T: number, tauAllow: number) {
  return Math.cbrt((16 * T) / (Math.PI * tauAllow));
}
