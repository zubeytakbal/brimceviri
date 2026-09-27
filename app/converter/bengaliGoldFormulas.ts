// Bangladesh kuyumcu hesabi: agirlik ভরি-আনা-রতি-পয়েন্ট ile yazilir,
// fiyat BAJUS'un ilan ettigi "ভরি basina" fiyattir; uzerine iscilik
// (মজুরি) ve KDV (ভ্যাট) eklenir.
//
// 1 ভরি = 11.664 g (BAJUS), 1 ভরি = 16 আনা, 1 আনা = 6 রতি,
// 1 রতি = 10 পয়েন্ট  ->  1 ভরি = 96 রতি = 960 পয়েন্ট.

export const VORI_GRAMS = 11.664;
export const ANA_PER_VORI = 16;
export const RATI_PER_ANA = 6;
export const POINT_PER_RATI = 10;
export const POINTS_PER_VORI = ANA_PER_VORI * RATI_PER_ANA * POINT_PER_RATI;

export type BdGoldKarat = "22K" | "21K" | "18K" | "traditional";

// Sanatan (geleneksel) altinin ayari sabit degildir: saflik hesabi yapilmaz.
export const BD_GOLD_PURITY: Record<BdGoldKarat, number | null> = {
  "22K": 0.916,
  "21K": 0.875,
  "18K": 0.75,
  traditional: null,
};

export type VoriWeight = {
  vori: number;
  ana: number;
  rati: number;
  point: number;
};

export function voriWeightToVori(weight: VoriWeight) {
  return (
    weight.vori +
    weight.ana / ANA_PER_VORI +
    weight.rati / (ANA_PER_VORI * RATI_PER_ANA) +
    weight.point / POINTS_PER_VORI
  );
}

// Gram -> ভরি/আনা/রতি/পয়েন্ট (pointler 0.1 hassasiyetle yuvarlanir).
export function gramsToVoriWeight(grams: number): VoriWeight {
  const totalPoints = Math.round((grams / VORI_GRAMS) * POINTS_PER_VORI * 10) / 10;
  const vori = Math.floor(totalPoints / POINTS_PER_VORI);
  let rest = totalPoints - vori * POINTS_PER_VORI;
  const pointsPerAna = RATI_PER_ANA * POINT_PER_RATI;
  const ana = Math.floor(rest / pointsPerAna + 1e-9);
  rest -= ana * pointsPerAna;
  const rati = Math.floor(rest / POINT_PER_RATI + 1e-9);
  rest -= rati * POINT_PER_RATI;
  return { vori, ana, rati, point: Math.round(rest * 10) / 10 };
}

export type BdGoldPriceInput = {
  weightVori: number;
  pricePerVori: number;
  makingPercent: number;
  vatPercent: number;
  karat: BdGoldKarat;
};

// KDV, altin bedeli + iscilik toplamina uygulanir (dukkan fisindeki
// yaygin uygulama).
export function bdGoldJewelleryPrice(input: BdGoldPriceInput) {
  const goldValue = input.weightVori * input.pricePerVori;
  const making = (goldValue * input.makingPercent) / 100;
  const vat = ((goldValue + making) * input.vatPercent) / 100;
  const purity = BD_GOLD_PURITY[input.karat];
  const grams = input.weightVori * VORI_GRAMS;

  return {
    grams,
    goldValue,
    making,
    vat,
    total: goldValue + making + vat,
    pureGoldGrams: purity === null ? null : grams * purity,
  };
}

// Bengalce/Arapca rakamlari, bosluklari ve binlik virgullerini kabul eder:
// "১,৩৫,০০০" -> 135000. Nokta ondalik ayiricidir.
export function parseBengaliNumber(raw: string): number | null {
  const ascii = raw
    .replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - 0x09e6))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\s,]/g, "");

  if (!ascii) {
    return null;
  }

  if (!/^\d*\.?\d+$|^\d+\.$/.test(ascii)) {
    return null;
  }

  const value = Number(ascii);
  return Number.isFinite(value) ? value : null;
}
