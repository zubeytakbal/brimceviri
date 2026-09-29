// Grunderwerbsteuer und Kaufnebenkosten beim Immobilienkauf (Stand 2026).
// Steuersaetze nach den Landesgesetzen (Art. 105 Abs. 2a GG); zuletzt geaendert: Bremen 5,5 % seit 1. Juli 2025,
// Thueringen 5,0 % seit 1. Januar 2024, Hamburg und Sachsen 5,5 % seit 1. Januar 2023.
// Steuerfrei (§ 3 GrEStG): Kaufpreis bis 2.500 €, Erwerb vom Ehe-/Lebenspartner und von Verwandten in gerader Linie.
// Mitverkauftes Inventar (z. B. Einbaukueche) gehoert nicht zur Bemessungsgrundlage.
import type { StateCode } from "./time/germanHolidays";

export const GREST_STAND = 2026;

export const GRUNDERWERBSTEUER: Record<StateCode, number> = {
  bw: 5.0,
  by: 3.5,
  be: 6.0,
  bb: 6.5,
  hb: 5.5,
  hh: 5.5,
  he: 6.0,
  mv: 6.0,
  ni: 5.0,
  nw: 6.5,
  rp: 5.0,
  sl: 6.5,
  sn: 5.5,
  st: 5.0,
  sh: 6.5,
  th: 5.0,
};

export const FREIGRENZE = 2500;
export const NOTAR_PROZENT = 1.5;
export const GRUNDBUCH_PROZENT = 0.5;
/** Kaeuferanteil bei Teilung der Provision (§ 656c BGB), inkl. 19 % USt: 3 % + USt = 3,57 % */
export const MAKLER_PROZENT = 3.57;

export type KaufEingabe = {
  kaufpreis: number;
  bundesland: StateCode;
  inventar: number;
  notarProzent: number;
  grundbuchProzent: number;
  maklerProzent: number;
  familie: boolean;
};

export function kaufnebenkosten(e: KaufEingabe) {
  const satz = GRUNDERWERBSTEUER[e.bundesland];
  const bemessung = Math.max(0, e.kaufpreis - Math.max(0, e.inventar));
  const steuerfrei = e.familie || bemessung <= FREIGRENZE;
  // Die Steuer wird auf volle Euro abgerundet festgesetzt (§ 11 Abs. 2 GrEStG).
  const grunderwerbsteuer = steuerfrei
    ? 0
    : Math.floor((bemessung * satz) / 100);
  const notar = (e.kaufpreis * e.notarProzent) / 100;
  const grundbuch = (e.kaufpreis * e.grundbuchProzent) / 100;
  const makler = (e.kaufpreis * e.maklerProzent) / 100;
  const summe = grunderwerbsteuer + notar + grundbuch + makler;
  return {
    satz,
    bemessung,
    steuerfrei,
    grunderwerbsteuer,
    notar,
    grundbuch,
    makler,
    summe,
    prozent: e.kaufpreis > 0 ? (summe / e.kaufpreis) * 100 : 0,
    gesamt: e.kaufpreis + summe,
    /** Ersparnis durch das herausgerechnete Inventar */
    inventarErsparnis: steuerfrei
      ? 0
      : Math.floor((e.kaufpreis * satz) / 100) - grunderwerbsteuer,
  };
}
