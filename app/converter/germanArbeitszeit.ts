// Arbeitszeitrechner nach dem Arbeitszeitgesetz (ArbZG, Stand 2026) und dem Jugendarbeitsschutzgesetz (JArbSchG).
// Eine Reform (woechentliche statt taeglicher Hoechstarbeitszeit) ist geplant; die Regeln stehen deshalb gesammelt in REGELN.
// Pausen (§ 4 ArbZG): mehr als 6 Std. Arbeit → 30 Min., mehr als 9 Std. → 45 Min., Abschnitte von mindestens 15 Min.
// Ruhezeit (§ 5 ArbZG): 11 Std. nach Arbeitsende. Hoechstarbeitszeit (§ 3 ArbZG): 8 Std. je Werktag, bis 10 Std. mit Ausgleich.
// Jugendliche (§§ 8, 11, 13 JArbSchG): mehr als 4,5 Std. → 30 Min., mehr als 6 Std. → 60 Min., hoechstens 8 Std., 12 Std. Ruhezeit.

export type Regeln = {
  pausen: Array<{ abMinuten: number; pause: number }>;
  maxTag: number;
  maxTagAusnahme: number;
  ruhezeit: number;
  maxWoche: number;
};

export const REGELN: Record<"erwachsen" | "jugendlich", Regeln> = {
  erwachsen: {
    pausen: [
      { abMinuten: 9 * 60, pause: 45 },
      { abMinuten: 6 * 60, pause: 30 },
    ],
    maxTag: 8 * 60,
    maxTagAusnahme: 10 * 60,
    ruhezeit: 11 * 60,
    maxWoche: 48 * 60,
  },
  jugendlich: {
    pausen: [
      { abMinuten: 6 * 60, pause: 60 },
      { abMinuten: 4.5 * 60, pause: 30 },
    ],
    maxTag: 8 * 60,
    maxTagAusnahme: 8.5 * 60,
    ruhezeit: 12 * 60,
    maxWoche: 40 * 60,
  },
};

export const MIN_PAUSENABSCHNITT = 15;

/** "7:30", "07.30", "730", "7" → Minuten seit Mitternacht; null bei ungueltiger Eingabe. */
export function parseZeit(raw: string): number | null {
  const s = raw.trim().replace(/\s*uhr$/i, "");
  let m = /^(\d{1,2})[:.,h](\d{2})$/.exec(s);
  if (!m && /^\d{3,4}$/.test(s)) m = /^(\d{1,2})(\d{2})$/.exec(s);
  if (m) {
    const h = Number(m[1]);
    const min = Number(m[2]);
    return h <= 24 && min < 60 && h * 60 + min <= 1440 ? h * 60 + min : null;
  }
  if (/^\d{1,2}$/.test(s) && Number(s) <= 24) return Number(s) * 60;
  return null;
}

/** Dauer in Minuten ("0:30", "30", "1,5" Std. nicht erlaubt – nur Minuten oder h:mm). */
export function parseDauer(raw: string): number | null {
  const s = raw.trim();
  if (!s) return 0;
  const hm = /^(\d{1,2}):(\d{2})$/.exec(s);
  if (hm) return Number(hm[1]) * 60 + Number(hm[2]);
  return /^\d{1,3}$/.test(s) ? Number(s) : null;
}

export const hhmm = (min: number) => {
  const neg = min < 0;
  const a = Math.abs(Math.round(min));
  return `${neg ? "−" : ""}${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
};

export const uhrzeit = (min: number) => {
  const n = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
};

/** Dezimalstunden (Industriezeit), z. B. 7:45 → 7,75. */
export const dezimal = (min: number) => Math.round((min / 60) * 100) / 100;

/** Pflichtpause fuer eine Netto-Arbeitszeit. */
export function pflichtpause(arbeitMin: number, r: Regeln) {
  return r.pausen.find((p) => arbeitMin > p.abMinuten)?.pause ?? 0;
}

/**
 * Kleinste zulaessige Pause fuer eine Anwesenheitszeit: Pausenabschnitte zaehlen erst ab 15 Minuten,
 * und nach Abzug der Pause darf keine laengere Pause mehr noetig sein (6:20 Anwesenheit → 20 Min. reichen).
 */
export function mindestpause(anwesenheit: number, r: Regeln) {
  const max = r.pausen[0].pause;
  for (let p = 0; p <= max; p += 1) {
    if (p > 0 && p < MIN_PAUSENABSCHNITT) continue;
    if (pflichtpause(anwesenheit - p, r) <= p) return p;
  }
  return max;
}

export type Tag = { beginn: number; ende: number; pause: number };

export function anwesenheit(t: Pick<Tag, "beginn" | "ende">) {
  return t.ende > t.beginn ? t.ende - t.beginn : t.ende + 1440 - t.beginn;
}

export function tagAuswerten(t: Tag, r: Regeln) {
  const anw = anwesenheit(t);
  const netto = Math.max(0, anw - t.pause);
  const mindest = mindestpause(anw, r);
  const pauseZuKurz = t.pause < mindest;
  const abschnittZuKurz = t.pause > 0 && t.pause < MIN_PAUSENABSCHNITT;
  // Wird die Pflichtpause nicht genommen, zaehlt sie trotzdem nicht als Arbeitszeit.
  const nettoGesetzlich = Math.max(0, anw - Math.max(t.pause, mindest));
  return {
    anwesenheit: anw,
    netto,
    mindest,
    pauseZuKurz,
    abschnittZuKurz,
    nettoGesetzlich,
    ueberMax: nettoGesetzlich > r.maxTag,
    ueberAusnahme: nettoGesetzlich > r.maxTagAusnahme,
    ueberNacht: t.ende <= t.beginn,
  };
}

/** Feierabend: Beginn + Sollzeit + Pause (mindestens die Pflichtpause fuer die Sollzeit). */
export function feierabend(
  beginn: number,
  soll: number,
  pause: number,
  r: Regeln,
) {
  const p = Math.max(pause, pflichtpause(soll, r));
  return {
    ende: beginn + soll + p,
    pause: p,
    spaetestens: beginn + r.maxTagAusnahme + pflichtpause(r.maxTagAusnahme, r),
  };
}

/** Wochenauswertung: Summe, Ueberstunden und Ruhezeit zwischen aufeinanderfolgenden Arbeitstagen. */
export function woche(tage: Array<Tag | null>, sollWoche: number, r: Regeln) {
  const ausgewertet = tage.map((t) => (t ? tagAuswerten(t, r) : null));
  const summe = ausgewertet.reduce((s, a) => s + (a?.nettoGesetzlich ?? 0), 0);
  const ruhezeiten = tage.map((t, i) => {
    const prev = i > 0 ? tage[i - 1] : null;
    if (!t || !prev) return null;
    const prevEnde = prev.ende > prev.beginn ? prev.ende : prev.ende + 1440;
    return t.beginn + 1440 - prevEnde;
  });
  return {
    ausgewertet,
    summe,
    ueberstunden: summe - sollWoche,
    ruhezeiten,
    ruheVerstoesse: ruhezeiten.filter((z) => z !== null && z < r.ruhezeit)
      .length,
    ueberWochenmax: summe > r.maxWoche,
  };
}
