// Brutto-Netto-Rechner 2026 (Arbeitnehmer, gesetzlich oder privat krankenversichert).
// Lohnsteuer und Solidaritaetszuschlag: amtlicher Programmablaufplan 2026 des BMF (Paket lohnsteuerrechner, MIT).
// Sozialversicherung: Rechengroessen 2026 (SVBezGrV 2026), durchschnittlicher Zusatzbeitrag 2,9 %, Uebergangsbereich nach § 20 Abs. 2a SGB IV.
import { calculate } from "lohnsteuerrechner";
import type { StateCode } from "./time/germanHolidays";

export const BN_JAHR = 2026;
export const BBG_KV_MONAT = 5812.5;
export const BBG_RV_MONAT = 8450;
export const MINIJOB_GRENZE = 603;
export const MIDIJOB_OBERGRENZE = 2000;
export const ZUSATZBEITRAG_DURCHSCHNITT = 2.9;
export const KV_SATZ = 14.6;
export const RV_SATZ = 18.6;
export const AV_SATZ = 2.6;
export const PV_SATZ = 3.6;
export const PV_ZUSCHLAG_KINDERLOS = 0.6;
export const PV_ABSCHLAG_JE_KIND = 0.25;
export const MINIJOB_RV_AN = 3.6;

export type Steuerklasse = 1 | 2 | 3 | 4 | 5 | 6;

export type BruttoNettoEingabe = {
  /** Monatliches Bruttogehalt in Euro */
  brutto: number;
  steuerklasse: Steuerklasse;
  /** Zahl der Kinderfreibetraege laut ELStAM (0; 0,5; 1; ...) */
  kinderfreibetraege: number;
  kirchensteuer: boolean;
  bundesland: StateCode;
  /** Kinder fuer die Pflegeversicherung (Elterneigenschaft); Abschlag nur fuer Kinder unter 25 */
  kinder: number;
  /** Unter 23 Jahre: kein Kinderlosenzuschlag */
  unter23: boolean;
  krankenversicherung: "gesetzlich" | "privat";
  zusatzbeitrag: number;
  /** Monatsbeitrag PKV inkl. Pflegepflichtversicherung */
  pkvBeitrag: number;
  /** Minijob: Befreiung von der Rentenversicherungspflicht */
  minijobRvBefreit: boolean;
};

export type BruttoNettoErgebnis = {
  art: "minijob" | "midijob" | "regulaer";
  brutto: number;
  lohnsteuer: number;
  soli: number;
  kirchensteuer: number;
  kv: number;
  pv: number;
  rv: number;
  av: number;
  /** PKV: Beitrag abzueglich Arbeitgeberzuschuss */
  pkvNetto: number;
  steuern: number;
  sozialabgaben: number;
  netto: number;
  /** Arbeitgeberanteile zur Sozialversicherung (ohne Umlagen U1/U2 und Insolvenzgeldumlage); null im Uebergangsbereich */
  arbeitgeber: number | null;
  pvSatzAn: number;
  kvSatzAn: number;
};

export const DEFAULT_EINGABE: BruttoNettoEingabe = {
  brutto: 3500,
  steuerklasse: 1,
  kinderfreibetraege: 0,
  kirchensteuer: false,
  bundesland: "nw",
  kinder: 0,
  unter23: false,
  krankenversicherung: "gesetzlich",
  zusatzbeitrag: ZUSATZBEITRAG_DURCHSCHNITT,
  pkvBeitrag: 600,
  minijobRvBefreit: true,
};

const r2 = (v: number) => Math.round(v * 100) / 100;

export function kirchensteuerSatz(land: StateCode) {
  return land === "by" || land === "bw" ? 8 : 9;
}

/** Arbeitnehmeranteil zur Pflegeversicherung in Prozent. */
export function pvSatzArbeitnehmer(
  e: Pick<BruttoNettoEingabe, "bundesland" | "kinder" | "unter23">,
) {
  let satz = e.bundesland === "sn" ? 2.3 : 1.8;
  if (e.kinder === 0) {
    if (!e.unter23) satz += PV_ZUSCHLAG_KINDERLOS;
  } else {
    satz -= Math.min(Math.max(e.kinder - 1, 0), 4) * PV_ABSCHLAG_JE_KIND;
  }
  return r2(satz);
}

/** Beitragspflichtige Einnahme fuer den Arbeitnehmeranteil im Uebergangsbereich. */
export function midijobBasisAn(brutto: number) {
  return (
    (MIDIJOB_OBERGRENZE / (MIDIJOB_OBERGRENZE - MINIJOB_GRENZE)) *
    (brutto - MINIJOB_GRENZE)
  );
}

/** Hoechstzuschuss des Arbeitgebers zur privaten Kranken- und Pflegeversicherung je Monat. */
export function pkvHoechstzuschuss(zusatzbeitrag: number, land: StateCode) {
  return (
    r2((BBG_KV_MONAT * (KV_SATZ / 2 + zusatzbeitrag / 2)) / 100) +
    r2((BBG_KV_MONAT * (land === "sn" ? 1.3 : 1.8)) / 100)
  );
}

export function bruttoNetto(e: BruttoNettoEingabe): BruttoNettoErgebnis {
  const brutto = Math.max(0, e.brutto);
  const kvSatzAn = KV_SATZ / 2 + e.zusatzbeitrag / 2;
  const pvSatzAn = pvSatzArbeitnehmer(e);
  const pvSatzAg = e.bundesland === "sn" ? 1.3 : 1.8;
  const privat = e.krankenversicherung === "privat";

  if (brutto <= MINIJOB_GRENZE) {
    const rv = e.minijobRvBefreit ? 0 : r2((brutto * MINIJOB_RV_AN) / 100);
    return {
      art: "minijob",
      brutto,
      lohnsteuer: 0,
      soli: 0,
      kirchensteuer: 0,
      kv: 0,
      pv: 0,
      rv,
      av: 0,
      pkvNetto: 0,
      steuern: 0,
      sozialabgaben: rv,
      netto: r2(brutto - rv),
      arbeitgeber: null,
      pvSatzAn,
      kvSatzAn,
    };
  }

  const midijob = brutto <= MIDIJOB_OBERGRENZE;
  const basisKv = midijob
    ? midijobBasisAn(brutto)
    : Math.min(brutto, BBG_KV_MONAT);
  const basisRv = midijob
    ? midijobBasisAn(brutto)
    : Math.min(brutto, BBG_RV_MONAT);

  const rv = r2((basisRv * RV_SATZ) / 2 / 100);
  const av = r2((basisRv * AV_SATZ) / 2 / 100);
  let kv = 0;
  let pv = 0;
  let pkvNetto = 0;
  let zuschuss = 0;
  if (privat) {
    zuschuss = Math.min(
      e.pkvBeitrag / 2,
      pkvHoechstzuschuss(e.zusatzbeitrag, e.bundesland),
    );
    pkvNetto = r2(e.pkvBeitrag - zuschuss);
  } else {
    kv = r2((basisKv * kvSatzAn) / 100);
    pv = r2((basisKv * pvSatzAn) / 100);
  }

  const out = calculate(BN_JAHR, {
    LZZ: 2,
    RE4: Math.round(brutto * 100),
    STKL: e.steuerklasse,
    ZKF: e.steuerklasse >= 5 ? 0 : e.kinderfreibetraege,
    R: e.kirchensteuer ? 1 : 0,
    KVZ: e.zusatzbeitrag,
    PKV: privat ? 1 : 0,
    PKPV: privat ? Math.round(e.pkvBeitrag * 100) : 0,
    PKPVAGZ: privat ? Math.round(zuschuss * 100) : 0,
    PVS: e.bundesland === "sn" ? 1 : 0,
    PVZ: e.kinder === 0 && !e.unter23 ? 1 : 0,
    PVA: Math.min(Math.max(e.kinder - 1, 0), 4),
  });
  const lohnsteuer = out.LSTLZZ / 100;
  const soli = out.SOLZLZZ / 100;
  const kirchensteuer = e.kirchensteuer
    ? Math.floor((out.BK * kirchensteuerSatz(e.bundesland)) / 100) / 100
    : 0;
  const steuern = r2(lohnsteuer + soli + kirchensteuer);
  const sozialabgaben = r2(kv + pv + rv + av + pkvNetto);
  const arbeitgeber = midijob
    ? null
    : r2(
        (Math.min(brutto, BBG_RV_MONAT) * (RV_SATZ / 2 + AV_SATZ / 2)) / 100 +
          (privat
            ? zuschuss
            : (Math.min(brutto, BBG_KV_MONAT) *
                (KV_SATZ / 2 + e.zusatzbeitrag / 2 + pvSatzAg)) /
              100),
      );
  return {
    art: midijob ? "midijob" : "regulaer",
    brutto,
    lohnsteuer,
    soli,
    kirchensteuer,
    kv,
    pv,
    rv,
    av,
    pkvNetto,
    steuern,
    sozialabgaben,
    netto: r2(brutto - steuern - sozialabgaben),
    arbeitgeber,
    pvSatzAn,
    kvSatzAn,
  };
}

/** Netto fuer alle Steuerklassen bei gleichem Brutto (uebrige Angaben wie eingegeben). */
export function nettoJeSteuerklasse(e: BruttoNettoEingabe) {
  return ([1, 2, 3, 4, 5, 6] as Steuerklasse[]).map((stkl) => ({
    stkl,
    // Steuerklasse II setzt ein Kind voraus (Entlastungsbetrag für Alleinerziehende).
    ergebnis: bruttoNetto(
      stkl === 2
        ? {
            ...e,
            steuerklasse: 2,
            kinderfreibetraege: Math.max(e.kinderfreibetraege, 0.5),
            kinder: Math.max(e.kinder, 1),
          }
        : { ...e, steuerklasse: stkl },
    ),
  }));
}

export const euro = (v: number) =>
  v.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + "\u00A0€";

/** Eurobetrag lesen: "3.500", "3.500,50", "3500,5" und "3500.50" sind erlaubt. */
export function parseBetrag(raw: string) {
  let s = raw.replace(/[\s€]/g, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}
