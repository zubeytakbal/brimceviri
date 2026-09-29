// Mutterschutzrechner nach dem Mutterschutzgesetz (MuSchG, Stand 1. Juni 2025).
// § 3 MuSchG: 6 Wochen vor dem errechneten Termin, 8 Wochen nach der Entbindung (12 Wochen bei Früh- und
// Mehrlingsgeburten sowie auf Antrag bei Behinderung des Kindes); bei vorzeitiger Entbindung verlaengert sich
// die Frist danach um die nicht genutzten Tage. Fehlgeburt ab der 13. SSW: gestaffelt 2, 6 oder 8 Wochen.
// §§ 19, 20 MuSchG: Mutterschaftsgeld der Krankenkasse hoechstens 13 € je Kalendertag, Arbeitgeberzuschuss bis
// zum durchschnittlichen kalendertaeglichen Nettoentgelt der letzten drei Monate.
import type { YMD } from "./time/calendars";
import { addDaysYmd, diffDays } from "./time/dateMath";

export const MUTTERSCHAFTSGELD_TAG = 13;
export const MUTTERSCHAFTSGELD_BAS = 210;

export type Besonderheit =
  | "keine"
  | "fruehgeburt"
  | "mehrlinge"
  | "behinderung";

export type MutterschutzEingabe = {
  /** Errechneter Entbindungstermin */
  termin: YMD;
  /** Tatsaechlicher Geburtstag, falls schon bekannt */
  geburt?: YMD | null;
  besonderheit: Besonderheit;
};

export type MutterschutzErgebnis = {
  beginn: YMD;
  /** Letzter Tag vor der Geburt bzw. der Termin, solange die Geburt nicht bekannt ist */
  entbindung: YMD;
  ende: YMD;
  wochenNach: 8 | 12;
  /** Tage, die wegen vorzeitiger Geburt nach der Geburt angehaengt werden */
  verlaengerung: number;
  /** Gesamtdauer in Kalendertagen einschliesslich Entbindungstag */
  tage: number;
  /** Kuendigungsschutz bis einschliesslich (4 Monate nach der Entbindung) */
  kuendigungsschutzBis: YMD;
  /** Fruehester Beginn der Elternzeit der Mutter (Tag nach Ende des Mutterschutzes) */
  elternzeitAb: YMD;
  /** Spaetester Tag fuer die Anmeldung der Elternzeit ab diesem Datum (7 Wochen vorher) */
  elternzeitAnmeldenBis: YMD;
};

export function naegele(letztePeriode: YMD, zyklus = 28): YMD {
  return addDaysYmd(letztePeriode, 280 + (zyklus - 28));
}

function plusMonate(d: YMD, monate: number): YMD {
  const m = d.month - 1 + monate;
  const year = d.year + Math.floor(m / 12);
  const month = (m % 12) + 1;
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return { year, month, day: Math.min(d.day, last) };
}

export function mutterschutz(e: MutterschutzEingabe): MutterschutzErgebnis {
  const beginn = addDaysYmd(e.termin, -42);
  const entbindung = e.geburt ?? e.termin;
  const wochenNach: 8 | 12 = e.besonderheit === "keine" ? 8 : 12;
  const verlaengerung = e.geburt
    ? Math.max(0, diffDays(e.geburt, e.termin))
    : 0;
  const ende = addDaysYmd(entbindung, wochenNach * 7 + verlaengerung);
  const elternzeitAb = addDaysYmd(ende, 1);
  return {
    beginn,
    entbindung,
    ende,
    wochenNach,
    verlaengerung,
    tage: diffDays(beginn, ende) + 1,
    kuendigungsschutzBis: plusMonate(entbindung, 4),
    elternzeitAb,
    elternzeitAnmeldenBis: addDaysYmd(elternzeitAb, -49),
  };
}

/** Schutzfrist nach einer Fehlgeburt ab der 13. Schwangerschaftswoche (§ 3 Abs. 5 MuSchG). */
export function schutzfristFehlgeburt(ssw: number) {
  if (ssw >= 20) return 8;
  if (ssw >= 17) return 6;
  if (ssw >= 13) return 2;
  return 0;
}

/**
 * Mutterschaftsgeld und Arbeitgeberzuschuss fuer die ganze Schutzfrist.
 * nettoDreiMonate: Nettoentgelt der letzten drei abgerechneten Monate zusammen (bei festem Gehalt 3 × Monatsnetto).
 */
export function mutterschaftsgeld(
  nettoDreiMonate: number,
  tage: number,
  versicherung: "gesetzlich" | "privat-familie",
) {
  const tagesnetto = nettoDreiMonate / 90;
  const kasseTag =
    versicherung === "gesetzlich"
      ? Math.min(MUTTERSCHAFTSGELD_TAG, tagesnetto)
      : 0;
  const zuschussTag = Math.max(0, tagesnetto - MUTTERSCHAFTSGELD_TAG);
  const kasse =
    versicherung === "gesetzlich" ? kasseTag * tage : MUTTERSCHAFTSGELD_BAS;
  const zuschuss = zuschussTag * tage;
  return {
    tagesnetto,
    kasseTag,
    zuschussTag,
    kasse,
    zuschuss,
    gesamt: kasse + zuschuss,
  };
}

/** Schwangerschaftswoche (vollendete Wochen + Tage) an einem Datum, bezogen auf den Termin (40+0). */
export function sswAm(termin: YMD, datum: YMD) {
  const tage = 280 - diffDays(datum, termin);
  return { wochen: Math.floor(tage / 7), tage: ((tage % 7) + 7) % 7 };
}
