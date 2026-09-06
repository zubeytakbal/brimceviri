// Wells Skoru (Pulmoner Emboli) hesaplama -- klinik kriterlere gore
// PE olasiligini puanlayan, klinikte yaygin kullanilan klasik bir
// risk skorlama aracidir. Bu bir olasilik skorudur, tani/tedavi
// onerisi yapmaz.

export type WellsScoreInput = {
  dvtSigns: boolean;
  peIsTopDiagnosis: boolean;
  heartRateOver100: boolean;
  immobilizationOrSurgery: boolean;
  previousDvtOrPe: boolean;
  hemoptysis: boolean;
  malignancy: boolean;
};

export type WellsProbability = "dusuk" | "orta" | "yuksek";

export type WellsScoreResult = {
  total: number;
  threeTierProbability: WellsProbability;
  twoTierLikely: boolean;
};

export function calculateWellsScore(input: WellsScoreInput): WellsScoreResult {
  const {
    dvtSigns,
    peIsTopDiagnosis,
    heartRateOver100,
    immobilizationOrSurgery,
    previousDvtOrPe,
    hemoptysis,
    malignancy,
  } = input;

  const total =
    (dvtSigns ? 3 : 0) +
    (peIsTopDiagnosis ? 3 : 0) +
    (heartRateOver100 ? 1.5 : 0) +
    (immobilizationOrSurgery ? 1.5 : 0) +
    (previousDvtOrPe ? 1.5 : 0) +
    (hemoptysis ? 1 : 0) +
    (malignancy ? 1 : 0);

  let threeTierProbability: WellsProbability = "dusuk";
  if (total > 6) {
    threeTierProbability = "yuksek";
  } else if (total >= 2) {
    threeTierProbability = "orta";
  }

  return {
    total,
    threeTierProbability,
    twoTierLikely: total > 4,
  };
}
