// Rechenlogik für die deutschen Mathe-Rechner mit Rechenweg (Brüche, ggT/kgV,
// Primfaktoren, Wurzeln, quadratische Gleichungen, römische Zahlen, Statistik).

import { fmtDe } from "./germanMath";

/* ---------------- Teiler ---------------- */

export function ggT(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export const kgV = (a: number, b: number) => (a === 0 || b === 0 ? 0 : Math.abs(a * b) / ggT(a, b));

/** Euklidischer Algorithmus mit allen Schritten: a = q · b + r */
export function euklidSchritte(a: number, b: number) {
  const steps: Array<{ a: number; b: number; q: number; r: number }> = [];
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const q = Math.floor(a / b);
    const r = a % b;
    steps.push({ a, b, q, r });
    [a, b] = [b, r];
  }
  return steps;
}

/** Primfaktorzerlegung als Liste [Primzahl, Exponent]. */
export function primfaktoren(n: number): Array<[number, number]> {
  const result: Array<[number, number]> = [];
  let rest = Math.abs(Math.trunc(n));
  if (rest < 2) return result;
  for (let p = 2; p * p <= rest; p += p === 2 ? 1 : 2) {
    let e = 0;
    while (rest % p === 0) {
      rest /= p;
      e++;
    }
    if (e) result.push([p, e]);
  }
  if (rest > 1) result.push([rest, 1]);
  return result;
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const hoch = (e: number) => String(e).replace(/\d/g, (d) => SUP[Number(d)]);

/** "2³ · 3 · 5" */
export function primfaktorText(f: Array<[number, number]>) {
  return f.map(([p, e]) => (e > 1 ? `${p}${hoch(e)}` : `${p}`)).join(" · ");
}

/** Anzahl der Teiler aus der Primfaktorzerlegung. */
export const teilerAnzahl = (f: Array<[number, number]>) => f.reduce((acc, [, e]) => acc * (e + 1), 1);

export function teiler(n: number) {
  const list: number[] = [];
  const m = Math.abs(Math.trunc(n));
  for (let d = 1; d * d <= m; d++) {
    if (m % d === 0) {
      list.push(d);
      if (d * d !== m) list.push(m / d);
    }
  }
  return list.sort((x, y) => x - y);
}

export const istPrimzahl = (n: number) => Number.isInteger(n) && n >= 2 && primfaktoren(n).length === 1 && primfaktoren(n)[0][1] === 1;

/* ---------------- Brüche ---------------- */

export type Bruch = { z: number; n: number };

export function kuerzen(b: Bruch): Bruch {
  if (b.n === 0) return b;
  const g = ggT(b.z, b.n) || 1;
  const sign = b.n < 0 ? -1 : 1;
  return { z: (sign * b.z) / g, n: (sign * b.n) / g };
}

export const bruchText = (b: Bruch) => (b.n === 1 ? `${b.z}` : `${b.z}/${b.n}`);

/** Gemischte Zahl: 7/3 → "2 1/3" */
export function gemischt(b: Bruch) {
  const k = kuerzen(b);
  if (Math.abs(k.z) < k.n || k.n === 1) return null;
  const ganz = Math.trunc(k.z / k.n);
  const rest = Math.abs(k.z % k.n);
  return rest ? `${ganz} ${rest}/${k.n}` : `${ganz}`;
}

/** Eingabe "3/4", "-2", "1 1/2", "0,75" → Bruch. */
export function parseBruch(raw: string): Bruch | null {
  const s = raw.trim().replace(/\s+/g, " ");
  if (!s) return null;
  let m = s.match(/^(-)?(\d+) (\d+)\/(\d+)$/);
  if (m) {
    const n = Number(m[4]);
    if (!n) return null;
    const z = Number(m[2]) * n + Number(m[3]);
    return { z: m[1] ? -z : z, n };
  }
  m = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (m) {
    const n = Number(m[2]);
    return n ? { z: Number(m[1]), n } : null;
  }
  m = s.match(/^(-?\d+)(?:[.,](\d+))?$/);
  if (m) {
    const dec = m[2] ?? "";
    const n = 10 ** dec.length;
    const z = Number(m[1].replace("-", "")) * n + (dec ? Number(dec) : 0);
    return kuerzen({ z: m[1].startsWith("-") ? -z : z, n });
  }
  return null;
}

export type BruchOp = "+" | "−" | "·" | ":";

export function bruchRechnen(a: Bruch, op: BruchOp, b: Bruch) {
  const steps: string[] = [];
  let roh: Bruch;
  if (op === "+" || op === "−") {
    const hn = kgV(a.n, b.n);
    const fa = hn / a.n;
    const fb = hn / b.n;
    steps.push(`Hauptnenner: kgV(${a.n}, ${b.n}) = ${hn}`);
    if (fa !== 1 || fb !== 1) steps.push(`Erweitern: ${a.z}/${a.n} = ${a.z * fa}/${hn} und ${b.z}/${b.n} = ${b.z * fb}/${hn}`);
    const z = op === "+" ? a.z * fa + b.z * fb : a.z * fa - b.z * fb;
    steps.push(`Zähler ${op === "+" ? "addieren" : "subtrahieren"}: ${a.z * fa} ${op === "+" ? "+" : "−"} ${b.z * fb} = ${z}`);
    roh = { z, n: hn };
  } else if (op === "·") {
    roh = { z: a.z * b.z, n: a.n * b.n };
    steps.push(`Zähler mal Zähler, Nenner mal Nenner: (${a.z} · ${b.z}) / (${a.n} · ${b.n}) = ${roh.z}/${roh.n}`);
  } else {
    if (b.z === 0) return null;
    steps.push(`Durch einen Bruch teilen heißt mit dem Kehrwert malnehmen: ${bruchText(a)} · ${b.n}/${b.z}`);
    roh = { z: a.z * b.n, n: a.n * b.z };
    steps.push(`= ${roh.z}/${roh.n}`);
  }
  const erg = kuerzen(roh);
  const g = ggT(roh.z, roh.n);
  if (g > 1) steps.push(`Kürzen mit ${g}: ${roh.z}/${roh.n} = ${bruchText(erg)}`);
  return { ergebnis: erg, steps, dezimal: erg.z / erg.n, gemischt: gemischt(erg) };
}

/* ---------------- Wurzeln ---------------- */

/** Teilweises Wurzelziehen: √72 = 6√2. Gibt Faktor vor und Rest unter der Wurzel zurück. */
export function wurzelVereinfachen(n: number, k = 2) {
  if (!Number.isInteger(n) || n < 0) return null;
  let aussen = 1;
  let innen = 1;
  for (const [p, e] of primfaktoren(n)) {
    aussen *= p ** Math.floor(e / k);
    innen *= p ** (e % k);
  }
  if (n === 0) return { aussen: 0, innen: 1 };
  return { aussen, innen };
}

/* ---------------- Quadratische Gleichungen ---------------- */

export type QuadLoesung = {
  diskriminante: number;
  loesungen: number[];
  scheitel: { x: number; y: number };
  pq: { p: number; q: number } | null;
};

/** ax² + bx + c = 0 */
export function quadratisch(a: number, b: number, c: number): QuadLoesung | null {
  if (!a || ![a, b, c].every(Number.isFinite)) return null;
  const d = b * b - 4 * a * c;
  const loesungen = d < 0 ? [] : d === 0 ? [-b / (2 * a)] : [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)].sort((x, y) => x - y);
  const sx = -b / (2 * a);
  return { diskriminante: d, loesungen, scheitel: { x: sx, y: a * sx * sx + b * sx + c }, pq: { p: b / a, q: c / a } };
}

/* ---------------- Römische Zahlen ---------------- */

const ROM: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function inRoemisch(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let out = "";
  const teile: string[] = [];
  for (const [v, s] of ROM) {
    while (n >= v) {
      out += s;
      teile.push(`${s} = ${v}`);
      n -= v;
    }
  }
  return { text: out, teile };
}

const ROM_WERT: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

/** Römisch → Zahl; nur gültige Standardschreibweise (Gegenprobe über inRoemisch). */
export function ausRoemisch(raw: string) {
  const s = raw.trim().toUpperCase();
  if (!/^[IVXLCDM]+$/.test(s)) return null;
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const v = ROM_WERT[s[i]];
    const next = ROM_WERT[s[i + 1]] ?? 0;
    sum += v < next ? -v : v;
  }
  const check = inRoemisch(sum);
  return check && check.text === s ? sum : null;
}

/* ---------------- Statistik ---------------- */

/** "3,5; 4; 7", "3,5 4 7" oder "1, 2, 3": Semikolon und Leerzeichen trennen, "3,5" ist ein Dezimalkomma. */
export function parseZahlenliste(raw: string) {
  const out: number[] = [];
  for (const token of raw.split(/[;\s]+/)) {
    if (!token) continue;
    const pieces = /^-?\d+,\d+$/.test(token) ? [token] : token.split(",");
    for (const piece of pieces) {
      if (!piece) continue;
      const v = Number(piece.replace(",", "."));
      if (Number.isFinite(v)) out.push(v);
    }
  }
  return out;
}

export function statistik(values: number[]) {
  const n = values.length;
  if (!n) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mittel = sum / n;
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const maxCount = Math.max(...counts.values());
  const modus = maxCount > 1 ? [...counts.entries()].filter(([, c]) => c === maxCount).map(([v]) => v).sort((a, b) => a - b) : [];
  const sq = values.reduce((acc, v) => acc + (v - mittel) ** 2, 0);
  const varianzPop = sq / n;
  const varianzStich = n > 1 ? sq / (n - 1) : NaN;
  return {
    n,
    sum,
    mittel,
    median,
    modus,
    min: sorted[0],
    max: sorted[n - 1],
    spannweite: sorted[n - 1] - sorted[0],
    varianzPop,
    varianzStich,
    sdPop: Math.sqrt(varianzPop),
    sdStich: Math.sqrt(varianzStich),
    sorted,
  };
}

/* ---------------- Kombinatorik ---------------- */

/** Binomialkoeffizient „n über k“ (exakt bis etwa n = 60 über BigInt). */
export function nUeberK(n: number, k: number) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0 || n < 0 || k > n) return null;
  let r = BigInt(1);
  const kk = Math.min(k, n - k);
  for (let i = 1; i <= kk; i++) r = (r * BigInt(n - kk + i)) / BigInt(i);
  return r;
}

export function fakultaet(n: number) {
  if (!Number.isInteger(n) || n < 0 || n > 170) return null;
  let r = BigInt(1);
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
}

export const bigDe = (v: bigint) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export { fmtDe };
