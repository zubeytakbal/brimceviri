// APGAR skoru hesaplama -- yenidoganin dogumdan sonraki 1., 5. (ve
// gerekirse 10.) dakikadaki durumunu 5 kriter uzerinden (her biri 0-2
// puan) degerlendiren, Virginia Apgar tarafindan 1952'de gelistirilmis
// klasik bir puanlama sistemidir. Bu bir degerlendirme skorudur,
// tedavi onerisi yapmaz.

export type CriterionScore = 0 | 1 | 2;

export type ApgarInput = {
  appearance: CriterionScore;
  pulse: CriterionScore;
  grimace: CriterionScore;
  activity: CriterionScore;
  respiration: CriterionScore;
};

export type ApgarCategory = "normal" | "orta-depresyon" | "ciddi-depresyon";

export type ApgarResult = {
  total: number;
  category: ApgarCategory;
};

export function calculateApgar(input: ApgarInput): ApgarResult | null {
  const values = Object.values(input);

  if (values.some((value) => ![0, 1, 2].includes(value))) {
    return null;
  }

  const total = values.reduce<number>((sum, value) => sum + value, 0);

  let category: ApgarCategory = "ciddi-depresyon";
  if (total >= 7) {
    category = "normal";
  } else if (total >= 4) {
    category = "orta-depresyon";
  }

  return { total, category };
}
