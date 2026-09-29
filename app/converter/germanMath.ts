// Rechenlogik für die deutschen Rechner: Prozentrechnung, Dreisatz und Noten.

/** Deutsche Zahleneingabe: "1.234,5" oder "1234.5" → 1234.5. Leere oder ungültige Eingabe → NaN. */
export function parseDe(raw: string) {
  let s = raw.trim().replace(/\s/g, "").replace(/%$/, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

export function fmtDe(n: number, maxDigits = 4, minDigits = 0) {
  if (!Number.isFinite(n)) return "—";
  return Number(n.toPrecision(12)).toLocaleString("de-DE", { maximumFractionDigits: maxDigits, minimumFractionDigits: minDigits });
}

/* ---------------- Prozentrechnung ---------------- */

/** Prozentwert W = G × p / 100 */
export const prozentwert = (p: number, g: number) => (g * p) / 100;
/** Prozentsatz p = W / G × 100 */
export const prozentsatz = (w: number, g: number) => (g === 0 ? Number.NaN : (w / g) * 100);
/** Grundwert G = W / p × 100 */
export const grundwert = (w: number, p: number) => (p === 0 ? Number.NaN : (w / p) * 100);
/** Prozentuale Veränderung von a auf b */
export const veraenderung = (a: number, b: number) => (a === 0 ? Number.NaN : ((b - a) / Math.abs(a)) * 100);
/** Wert nach Aufschlag (+p) oder Abzug (−p) */
export const mitProzent = (g: number, p: number) => g * (1 + p / 100);
/** Ursprungswert vor einer Änderung um p % */
export const vorProzent = (endwert: number, p: number) => (p === -100 ? Number.NaN : endwert / (1 + p / 100));

/* ---------------- Dreisatz ---------------- */

/** Proportional: a entspricht b, also entspricht c … b × c / a. */
export const dreisatzProportional = (a: number, b: number, c: number) => (a === 0 ? Number.NaN : (b / a) * c);
/** Antiproportional: a entspricht b, also entspricht c … a × b / c. */
export const dreisatzAntiproportional = (a: number, b: number, c: number) => (c === 0 ? Number.NaN : (a * b) / c);

/* ---------------- Noten ---------------- */

export const NOTEN_NAMEN = ["sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"] as const;

export function notenName(note: number) {
  const i = Math.min(6, Math.max(1, Math.round(note))) - 1;
  return NOTEN_NAMEN[i];
}

/** Gewichteter Durchschnitt; ungültige Zeilen werden übersprungen. */
export function notenDurchschnitt(rows: Array<{ note: number; gewicht: number }>) {
  let sum = 0;
  let w = 0;
  for (const r of rows) {
    if (!Number.isFinite(r.note) || !Number.isFinite(r.gewicht) || r.gewicht <= 0 || r.note < 1 || r.note > 6) continue;
    sum += r.note * r.gewicht;
    w += r.gewicht;
  }
  return w === 0 ? Number.NaN : sum / w;
}

/** IHK-Punkteschlüssel (100-Punkte-Skala) → Note 1 bis 6. */
export const IHK_SCHLUESSEL: Array<{ min: number; note: number }> = [
  { min: 92, note: 1 },
  { min: 81, note: 2 },
  { min: 67, note: 3 },
  { min: 50, note: 4 },
  { min: 30, note: 5 },
  { min: 0, note: 6 },
];

/** Note nach IHK-Schlüssel; Punkte werden auf 100 umgerechnet und kaufmännisch gerundet. */
export function ihkNote(punkte: number, maxPunkte = 100) {
  if (!Number.isFinite(punkte) || !Number.isFinite(maxPunkte) || maxPunkte <= 0 || punkte < 0 || punkte > maxPunkte) return null;
  const hundert = Math.round((punkte / maxPunkte) * 100);
  return { hundert, note: IHK_SCHLUESSEL.find((s) => hundert >= s.min)!.note };
}

/** Oberstufe: Punkte 0–15 → Note mit Tendenz (15 = 1+, 0 = 6). */
export function punkteZuNote(punkte: number) {
  if (!Number.isInteger(punkte) || punkte < 0 || punkte > 15) return null;
  if (punkte === 0) return "6";
  const note = 6 - Math.ceil(punkte / 3);
  const tendenz = punkte % 3 === 0 ? "+" : punkte % 3 === 1 ? "−" : "";
  return `${note}${tendenz}`;
}

/** Abiturnote aus der Gesamtpunktzahl (300–900) nach KMK: N = 17/3 − E/180, auf eine Nachkommastelle abgeschnitten. */
export function abiturNote(e: number) {
  if (!Number.isFinite(e) || e < 300 || e > 900) return null;
  const n = 17 / 3 - e / 180;
  // Abschneiden statt Runden; kleine Toleranz gegen Gleitkommafehler.
  const truncated = Math.floor(n * 10 + 1e-9) / 10;
  return Math.max(1, truncated);
}
