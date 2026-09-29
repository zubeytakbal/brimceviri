// Pendlerpauschale (Entfernungspauschale, § 9 Abs. 1 Nr. 4 EStG) und Urlaubsanspruch (BUrlG).
// Stand: Steueränderungsgesetz 2025 – ab 2026 einheitlich 0,38 € ab dem ersten Kilometer.

export type Steuerjahr = 2025 | 2026;

export const ARBEITNEHMER_PAUSCHBETRAG = 1230;
export const HOMEOFFICE_PRO_TAG = 6;
export const HOMEOFFICE_MAX_TAGE = 210;
export const HOECHSTBETRAG_OHNE_AUTO = 4500;

/** Entfernungspauschale pro Arbeitstag für die einfache Entfernung in vollen Kilometern. */
export function pauschaleProTag(km: number, jahr: Steuerjahr) {
  const voll = Math.floor(km);
  if (!(voll > 0)) return 0;
  if (jahr >= 2026) return voll * 0.38;
  return Math.min(voll, 20) * 0.3 + Math.max(voll - 20, 0) * 0.38;
}

export type PendlerInput = {
  km: number;
  tage: number;
  jahr: Steuerjahr;
  /** Eigenes Auto oder Dienstwagen: keine Deckelung auf 4.500 €. */
  auto: boolean;
  homeofficeTage: number;
  sonstige: number;
  grenzsteuersatz: number;
};

export function pendlerpauschale(input: PendlerInput) {
  const roh = pauschaleProTag(input.km, input.jahr) * Math.max(0, Math.floor(input.tage));
  const gedeckelt = !input.auto && roh > HOECHSTBETRAG_OHNE_AUTO;
  const entfernung = gedeckelt ? HOECHSTBETRAG_OHNE_AUTO : roh;
  const hoTage = Math.min(Math.max(0, Math.floor(input.homeofficeTage)), HOMEOFFICE_MAX_TAGE);
  const homeoffice = hoTage * HOMEOFFICE_PRO_TAG;
  const sonstige = Math.max(0, input.sonstige || 0);
  const werbungskosten = entfernung + homeoffice + sonstige;
  const ueberPauschbetrag = Math.max(0, werbungskosten - ARBEITNEHMER_PAUSCHBETRAG);
  const ersparnis = (ueberPauschbetrag * Math.max(0, Math.min(45, input.grenzsteuersatz || 0))) / 100;
  return { entfernung, gedeckelt, homeoffice, hoTage, sonstige, werbungskosten, ueberPauschbetrag, ersparnis };
}

/* ---------------- Urlaub ---------------- */

/** Gesetzlicher Mindesturlaub: 24 Werktage bei 6 Tagen, umgerechnet auf die eigene Arbeitswoche (4 Wochen). */
export const mindesturlaub = (tageProWoche: number) => (24 * tageProWoche) / 6;

/** Urlaub bei anderer Zahl von Arbeitstagen: Urlaub × eigene Tage ÷ Tage der Vergleichswoche. */
export const urlaubUmrechnen = (urlaub: number, basisTage: number, eigeneTage: number) => (basisTage > 0 ? (urlaub * eigeneTage) / basisTage : Number.NaN);

/** Zusatzurlaub bei Schwerbehinderung (§ 208 SGB IX): eine Arbeitswoche. */
export const schwerbehindertenZusatz = (tageProWoche: number) => tageProWoche;

/** § 5 Abs. 2 BUrlG: Bruchteile ab einem halben Tag werden aufgerundet, kleinere bleiben stehen. */
export function rundenBUrlG(tage: number) {
  const frac = tage - Math.floor(tage);
  return frac >= 0.5 - 1e-9 ? Math.ceil(tage) : Math.round(tage * 100) / 100;
}

/** Teilurlaub: ein Zwölftel pro vollem Beschäftigungsmonat. */
export const teilurlaub = (jahresurlaub: number, volleMonate: number) => (jahresurlaub * Math.max(0, Math.min(12, Math.floor(volleMonate)))) / 12;
