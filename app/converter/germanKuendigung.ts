// Kuendigungsfristen: Arbeitsvertrag (§ 622 BGB) und Wohnungsmietvertrag (§ 573c BGB).
// Fristberechnung nach §§ 187 Abs. 1, 188 Abs. 2 und 3 BGB: Der Tag des Zugangs zaehlt nicht; eine Wochenfrist endet am
// gleichnamigen Wochentag, eine Monatsfrist am gleichen Kalendertag (fehlt er, am Monatsletzten). § 193 BGB gilt fuer
// Kuendigungsfristen nicht – das Ende darf auf einen Sonn- oder Feiertag fallen.
// Miete: Werktage sind Montag bis Samstag ohne gesetzliche Feiertage (BGH VIII ZR 206/04).
import type { YMD } from "./time/calendars";
import { addDaysYmd, daysInMonth, weekdayOf, ymdKey } from "./time/dateMath";
import { stateHolidays, type StateCode } from "./time/germanHolidays";

export type Termin =
  | "15-oder-monatsende"
  | "monatsende"
  | "quartalsende"
  | "beliebig";
export type Frist = {
  menge: number;
  einheit: "wochen" | "monate";
  termin: Termin;
};

export const GRUNDKUENDIGUNGSFRIST: Frist = {
  menge: 4,
  einheit: "wochen",
  termin: "15-oder-monatsende",
};
export const PROBEZEIT_FRIST: Frist = {
  menge: 2,
  einheit: "wochen",
  termin: "beliebig",
};

/** Verlaengerte Fristen fuer Kuendigungen durch den Arbeitgeber (§ 622 Abs. 2 BGB). */
export const ARBEITGEBER_STAFFEL = [
  { jahre: 20, monate: 7 },
  { jahre: 15, monate: 6 },
  { jahre: 12, monate: 5 },
  { jahre: 10, monate: 4 },
  { jahre: 8, monate: 3 },
  { jahre: 5, monate: 2 },
  { jahre: 2, monate: 1 },
];

export function arbeitgeberFrist(jahre: number): Frist {
  const s = ARBEITGEBER_STAFFEL.find((x) => jahre >= x.jahre);
  return s
    ? { menge: s.monate, einheit: "monate", termin: "monatsende" }
    : GRUNDKUENDIGUNGSFRIST;
}

const cmp = (a: YMD, b: YMD) => ymdKey(a).localeCompare(ymdKey(b));
const letzter = (year: number, month: number): YMD => ({
  year,
  month,
  day: daysInMonth(year, month),
});

/** Monatsfrist nach § 188 Abs. 2 und 3 BGB. */
export function plusMonate(d: YMD, n: number): YMD {
  const m = d.month - 1 + n;
  const year = d.year + Math.floor(m / 12);
  const month = (((m % 12) + 12) % 12) + 1;
  return { year, month, day: Math.min(d.day, daysInMonth(year, month)) };
}

/** Rechnerisches Fristende ohne Termin. */
export function fristablauf(zugang: YMD, f: Frist): YMD {
  return f.einheit === "wochen"
    ? addDaysYmd(zugang, f.menge * 7)
    : plusMonate(zugang, f.menge);
}

function istTermin(d: YMD, t: Termin) {
  const ultimo = d.day === daysInMonth(d.year, d.month);
  if (t === "beliebig") return true;
  if (t === "monatsende") return ultimo;
  if (t === "quartalsende") return ultimo && d.month % 3 === 0;
  return ultimo || d.day === 15;
}

/** Fruehester Kuendigungstermin bei Zugang an einem Tag. */
export function kuendigungsEnde(zugang: YMD, f: Frist): YMD {
  let d = fristablauf(zugang, f);
  while (!istTermin(d, f.termin)) d = addDaysYmd(d, 1);
  return d;
}

/** Spaetester Zugang fuer ein gewuenschtes Ende (das selbst ein zulaessiger Termin sein muss). */
export function spaetesterZugang(ende: YMD, f: Frist): YMD | null {
  if (!istTermin(ende, f.termin)) return null;
  let d = addDaysYmd(ende, -1);
  for (let i = 0; i < 800; i += 1) {
    if (cmp(fristablauf(d, f), ende) <= 0) return d;
    d = addDaysYmd(d, -1);
  }
  return null;
}

/** Die naechsten zulaessigen Termine ab einem Datum mit dem jeweils spaetesten Zugang. */
export function naechsteTermine(ab: YMD, f: Frist, anzahl = 6) {
  const out: Array<{ ende: YMD; zugangBis: YMD }> = [];
  let d = kuendigungsEnde(ab, f);
  while (out.length < anzahl) {
    const zugangBis = spaetesterZugang(d, f);
    if (zugangBis) out.push({ ende: d, zugangBis });
    d = addDaysYmd(d, 1);
    while (!istTermin(d, f.termin)) d = addDaysYmd(d, 1);
  }
  return out;
}

/* ---------------- Mietvertrag ---------------- */

export type MietPartei = "mieter" | "vermieter";

/** Zusaetzliche Monate fuer den Vermieter nach Wohndauer (§ 573c Abs. 1 Satz 2 BGB). */
export function vermieterZusatz(jahre: number) {
  return jahre >= 8 ? 6 : jahre >= 5 ? 3 : 0;
}

/** Dritter Werktag eines Monats: Montag bis Samstag, ohne gesetzliche Feiertage des Bundeslands. */
export function dritterWerktag(
  year: number,
  month: number,
  land: StateCode,
): YMD {
  const feiertage = new Set(
    stateHolidays(land, year).map((h) => ymdKey(h.date)),
  );
  let count = 0;
  for (let day = 1; ; day += 1) {
    const d = { year, month, day };
    if (weekdayOf(d) !== 0 && !feiertage.has(ymdKey(d))) count += 1;
    if (count === 3) return d;
  }
}

export function mietEnde(
  zugang: YMD,
  land: StateCode,
  partei: MietPartei,
  wohnjahre = 0,
) {
  const w3 = dritterWerktag(zugang.year, zugang.month, land);
  const monate = 2 + (partei === "vermieter" ? vermieterZusatz(wohnjahre) : 0);
  const start =
    cmp(zugang, w3) <= 0 ? zugang : plusMonate({ ...zugang, day: 1 }, 1);
  const zielMonat = plusMonate(
    { year: start.year, month: start.month, day: 1 },
    monate,
  );
  return {
    ende: letzter(zielMonat.year, zielMonat.month),
    dritterWerktag: w3,
    rechtzeitig: cmp(zugang, w3) <= 0,
    fristMonate: monate + 1,
  };
}

/** Naechste Mietende-Termine mit dem jeweils spaetesten Zugang (dritter Werktag des Startmonats). */
export function naechsteMietTermine(
  ab: YMD,
  land: StateCode,
  partei: MietPartei,
  wohnjahre = 0,
  anzahl = 6,
) {
  const out: Array<{ ende: YMD; zugangBis: YMD }> = [];
  let monat = { year: ab.year, month: ab.month, day: 1 };
  if (cmp(ab, dritterWerktag(ab.year, ab.month, land)) > 0)
    monat = plusMonate(monat, 1);
  const zusatz = 2 + (partei === "vermieter" ? vermieterZusatz(wohnjahre) : 0);
  for (let i = 0; i < anzahl; i += 1) {
    const m = plusMonate(monat, i);
    const ziel = plusMonate(m, zusatz);
    out.push({
      ende: letzter(ziel.year, ziel.month),
      zugangBis: dritterWerktag(m.year, m.month, land),
    });
  }
  return out;
}
