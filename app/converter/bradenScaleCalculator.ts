// Braden Skalasi hesaplama -- basi yarasi (dekubitus) gelisme riskini
// degerlendiren, hemsirelik pratiginde yaygin kullanilan 6 alt
// olcekli klasik bir risk skorudur. Dusuk toplam puan, yuksek riski
// gosterir. Bu bir risk taramasidir, bakim plani onerisi yapmaz.

export type BradenSubScore1to4 = 1 | 2 | 3 | 4;
export type FrictionShearScore = 1 | 2 | 3;

export type BradenScaleInput = {
  sensoryPerception: BradenSubScore1to4;
  moisture: BradenSubScore1to4;
  activity: BradenSubScore1to4;
  mobility: BradenSubScore1to4;
  nutrition: BradenSubScore1to4;
  frictionShear: FrictionShearScore;
};

export type BradenRiskCategory =
  | "cok-yuksek"
  | "yuksek"
  | "orta"
  | "hafif"
  | "risk-yok";

export type BradenScaleResult = {
  total: number;
  category: BradenRiskCategory;
};

export function calculateBradenScale(
  input: BradenScaleInput
): BradenScaleResult {
  const {
    sensoryPerception,
    moisture,
    activity,
    mobility,
    nutrition,
    frictionShear,
  } = input;

  const total =
    sensoryPerception + moisture + activity + mobility + nutrition +
    frictionShear;

  let category: BradenRiskCategory = "risk-yok";
  if (total <= 9) {
    category = "cok-yuksek";
  } else if (total <= 12) {
    category = "yuksek";
  } else if (total <= 14) {
    category = "orta";
  } else if (total <= 18) {
    category = "hafif";
  }

  return { total, category };
}
