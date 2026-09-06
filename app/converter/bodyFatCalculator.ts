// Vucut yag orani hesaplama -- ABD Deniz Kuvvetleri (US Navy) yontemi.
// Bel, boyun (ve kadinlarda kalca) cevresi olculeriyle, mayo tartisi
// veya kaliper gerekmeden vucut yag yuzdesini tahmin eder. Formul,
// askeri fitness standartlarinda ve fitness endustrisinde yaygin
// kullanilan, iyi belgelenmis bir tahmin yontemidir (log10 tabanli).

export type Gender = "male" | "female";

export type BodyFatInput = {
  gender: Gender;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm: number;
};

export type BodyFatCategory =
  | "essential"
  | "athletes"
  | "fitness"
  | "average"
  | "obese";

export type BodyFatResult = {
  bodyFatPercent: number;
  category: BodyFatCategory;
};

const categoryRangesByGender: Record<
  Gender,
  { max: number; category: BodyFatCategory }[]
> = {
  male: [
    { max: 5, category: "essential" },
    { max: 13, category: "athletes" },
    { max: 17, category: "fitness" },
    { max: 24, category: "average" },
    { max: Infinity, category: "obese" },
  ],
  female: [
    { max: 13, category: "essential" },
    { max: 20, category: "athletes" },
    { max: 24, category: "fitness" },
    { max: 31, category: "average" },
    { max: Infinity, category: "obese" },
  ],
};

function getBodyFatCategory(
  percent: number,
  gender: Gender
): BodyFatCategory {
  const ranges = categoryRangesByGender[gender];
  const match = ranges.find((range) => percent <= range.max);

  return match ? match.category : "obese";
}

export function calculateBodyFat(
  input: BodyFatInput
): BodyFatResult | null {
  const { gender, heightCm, neckCm, waistCm, hipCm } = input;

  if (gender !== "male" && gender !== "female") {
    return null;
  }

  const baseValid = [heightCm, neckCm, waistCm].every(
    (value) => Number.isFinite(value) && value > 0
  );

  if (!baseValid) {
    return null;
  }

  if (gender === "male") {
    if (waistCm <= neckCm) {
      return null;
    }

    const bodyFatPercent =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450;

    return {
      bodyFatPercent,
      category: getBodyFatCategory(bodyFatPercent, gender),
    };
  }

  if (!Number.isFinite(hipCm) || hipCm <= 0 || waistCm + hipCm <= neckCm) {
    return null;
  }

  const bodyFatPercent =
    495 /
      (1.29579 -
        0.35004 * Math.log10(waistCm + hipCm - neckCm) +
        0.221 * Math.log10(heightCm)) -
    450;

  return {
    bodyFatPercent,
    category: getBodyFatCategory(bodyFatPercent, gender),
  };
}
