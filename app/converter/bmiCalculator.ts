// BMI (vucut kitle indeksi) ve gunluk kalori ihtiyaci hesaplama.
// Kalori icin Mifflin-St Jeor formulu kullanilir (Harris-Benedict'in
// guncel, daha dogru kabul edilen versiyonu); aktivite katsayisiyla
// carpilarak toplam gunluk enerji ihtiyaci (TDEE) bulunur.

export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active";

export const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
};

export type BmiCalculatorInput = {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
};

export type BmiCategory =
  | "underweight"
  | "normal"
  | "overweight"
  | "obese";

export type BmiCalculatorResult = {
  bmi: number;
  category: BmiCategory;
  basalMetabolicRate: number;
  dailyCalorieNeed: number;
};

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) {
    return "underweight";
  }

  if (bmi < 25) {
    return "normal";
  }

  if (bmi < 30) {
    return "overweight";
  }

  return "obese";
}

export function calculateBmi(
  input: BmiCalculatorInput
): BmiCalculatorResult | null {
  const { heightCm, weightKg, age, gender, activityLevel } = input;

  const valid =
    [heightCm, weightKg, age].every(
      (value) => Number.isFinite(value) && value > 0
    ) &&
    (gender === "male" || gender === "female");

  if (!valid) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  const basalMetabolicRate =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const dailyCalorieNeed = basalMetabolicRate * activityMultipliers[activityLevel];

  return {
    bmi,
    category: getBmiCategory(bmi),
    basalMetabolicRate,
    dailyCalorieNeed,
  };
}
