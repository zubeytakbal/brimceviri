// Stromkostenrechner (ev elektrik faturası). Tüm fiyatları kullanıcı girer:
// Arbeitspreis ct/kWh (faturada böyle yazılır), Grundpreis €/ay. Yasal bir
// oran ya da güncellenmesi gereken bir fiyat yoktur.

export type Tarif = {
  /** Arbeitspreis in Cent pro kWh */
  arbeitspreisCt: number;
  /** Grundpreis in Euro pro Monat */
  grundpreisMonat: number;
};

export function gueltigerTarif(tarif: Tarif) {
  return tarif.arbeitspreisCt >= 0 && tarif.arbeitspreisCt <= 500 && tarif.grundpreisMonat >= 0 && tarif.grundpreisMonat <= 500;
}

/** Yıllık maliyet (€): kWh × ct ÷ 100 + 12 × Grundpreis. */
export function jahreskosten(verbrauchKwh: number, tarif: Tarif) {
  if (!(verbrauchKwh >= 0) || !gueltigerTarif(tarif)) return Number.NaN;
  return (verbrauchKwh * tarif.arbeitspreisCt) / 100 + 12 * tarif.grundpreisMonat;
}

/** Aylık ödeme (Abschlag), kuruşa yuvarlanmadan. */
export const monatsabschlag = (verbrauchKwh: number, tarif: Tarif) => jahreskosten(verbrauchKwh, tarif) / 12;

/** Grundpreis dahil gerçek kWh başı fiyat (ct). */
export function durchschnittspreisCt(verbrauchKwh: number, tarif: Tarif) {
  if (!(verbrauchKwh > 0)) return Number.NaN;
  return (jahreskosten(verbrauchKwh, tarif) / verbrauchKwh) * 100;
}

const TAG_MS = 24 * 60 * 60 * 1000;

/** "YYYY-MM-DD" → UTC gün sayısı; geçersizse NaN. */
function tagIndex(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return Number.NaN;
  const t = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(t);
  if (d.getUTCMonth() !== Number(m[2]) - 1 || d.getUTCDate() !== Number(m[3])) return Number.NaN;
  return t / TAG_MS;
}

export type Zaehlerergebnis = {
  verbrauch: number;
  tage: number;
  proTag: number;
  hochrechnungJahr: number;
};

/** İki sayaç okumasından tüketim ve 365 güne yıllık tahmin. */
export function zaehlerstand(altStand: number, neuStand: number, altDatum: string, neuDatum: string): Zaehlerergebnis | null {
  const tage = tagIndex(neuDatum) - tagIndex(altDatum);
  if (!Number.isFinite(tage) || tage < 1) return null;
  if (!(altStand >= 0) || !(neuStand >= altStand)) return null;
  const verbrauch = neuStand - altStand;
  const proTag = verbrauch / tage;
  return { verbrauch, tage, proTag, hochrechnungJahr: proTag * 365 };
}

/**
 * İki tarifenin maliyetlerinin eşit olduğu yıllık tüketim (kWh). Bu
 * değerin üstünde Arbeitspreis'i düşük olan tarife ucuzdur. Arbeitspreis'ler
 * eşitse ya da kesişim negatifse NaN.
 */
export function breakEvenKwh(a: Tarif, b: Tarif) {
  const arbeitDiff = a.arbeitspreisCt - b.arbeitspreisCt;
  if (arbeitDiff === 0) return Number.NaN;
  const kwh = ((b.grundpreisMonat - a.grundpreisMonat) * 12 * 100) / arbeitDiff;
  return kwh > 0 ? kwh : Number.NaN;
}
