// Hesap motorlari: Ingilizce pazar icin eklenen gunluk araclar
// (boy cevirici, ABD not hesaplayici, kalori/TDEE, ideal kilo formulleri,
// yakit tuketimi birimleri). Arayuzden bagimsiz, test edilebilir.

// ---- Boy (height) ----
export const CM_PER_INCH = 2.54;

export function cmToFeetInches(cm: number) {
  if (!Number.isFinite(cm) || cm <= 0) return null;
  const totalInches = cm / CM_PER_INCH;
  let feet = Math.floor(totalInches / 12);
  let inches = totalInches - feet * 12;
  // 5 ft 11.99 in yerine 6 ft 0 in gostermek icin yuvarlama tasmasini duzelt.
  if (Math.round(inches * 10) / 10 >= 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches, totalInches };
}

export function feetInchesToCm(feet: number, inches: number) {
  if (![feet, inches].every((value) => Number.isFinite(value) && value >= 0)) return null;
  const totalInches = feet * 12 + inches;
  if (totalInches <= 0) return null;
  return totalInches * CM_PER_INCH;
}

// ---- Grade (US) ----
export type GradeItem = { score: number; weight: number };

// Yaygin ABD okul olcegi; okullar farkli esikler kullanabilir.
export const usLetterGradeScale = [
  { letter: "A+", min: 97 },
  { letter: "A", min: 93 },
  { letter: "A-", min: 90 },
  { letter: "B+", min: 87 },
  { letter: "B", min: 83 },
  { letter: "B-", min: 80 },
  { letter: "C+", min: 77 },
  { letter: "C", min: 73 },
  { letter: "C-", min: 70 },
  { letter: "D+", min: 67 },
  { letter: "D", min: 63 },
  { letter: "D-", min: 60 },
  { letter: "F", min: 0 },
] as const;

export function usLetterGrade(percent: number) {
  if (!Number.isFinite(percent)) return null;
  return usLetterGradeScale.find((row) => percent >= row.min)?.letter ?? "F";
}

/** Weighted average of the entered grades; weights do not need to add up to 100. */
export function weightedGrade(items: GradeItem[]) {
  const valid = items.filter(
    (item) => Number.isFinite(item.score) && Number.isFinite(item.weight) && item.weight > 0 && item.score >= 0
  );
  const totalWeight = valid.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) return null;
  const percent = valid.reduce((sum, item) => sum + item.score * item.weight, 0) / totalWeight;
  return { percent, totalWeight, letter: usLetterGrade(percent) };
}

/** Score needed on the final exam to reach the target course grade. */
export function finalExamScoreNeeded(currentPercent: number, targetPercent: number, finalWeightPercent: number) {
  if (![currentPercent, targetPercent, finalWeightPercent].every(Number.isFinite)) return null;
  if (finalWeightPercent <= 0 || finalWeightPercent >= 100) return null;
  const w = finalWeightPercent / 100;
  return (targetPercent - currentPercent * (1 - w)) / w;
}

// ---- Calories / TDEE (Mifflin-St Jeor) ----
export type Sex = "male" | "female";

export const tdeeActivityLevels = [
  { id: "sedentary", label: "Sedentary (little or no exercise)", factor: 1.2 },
  { id: "light", label: "Light (exercise 1–3 days/week)", factor: 1.375 },
  { id: "moderate", label: "Moderate (exercise 3–5 days/week)", factor: 1.55 },
  { id: "active", label: "Active (exercise 6–7 days/week)", factor: 1.725 },
  { id: "very-active", label: "Very active (hard exercise or physical job)", factor: 1.9 },
] as const;

export type TdeeActivityId = (typeof tdeeActivityLevels)[number]["id"];

export function mifflinStJeorBmr(sex: Sex, weightKg: number, heightCm: number, age: number) {
  if (![weightKg, heightCm, age].every((value) => Number.isFinite(value) && value > 0)) return null;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
}

export function calorieTargets(sex: Sex, weightKg: number, heightCm: number, age: number, activity: TdeeActivityId) {
  const bmr = mifflinStJeorBmr(sex, weightKg, heightCm, age);
  const level = tdeeActivityLevels.find((candidate) => candidate.id === activity);
  if (bmr === null || !level) return null;
  const tdee = bmr * level.factor;
  // 1 lb (~0.45 kg) of body fat is roughly 3,500 kcal -> 500 kcal/day ~ 1 lb/week.
  const floor = sex === "male" ? 1500 : 1200;
  return {
    bmr,
    tdee,
    goals: [
      { id: "extreme-loss", label: "Lose 2 lb (0.9 kg) per week", calories: Math.max(tdee - 1000, floor) },
      { id: "loss", label: "Lose 1 lb (0.45 kg) per week", calories: Math.max(tdee - 500, floor) },
      { id: "mild-loss", label: "Lose 0.5 lb (0.23 kg) per week", calories: Math.max(tdee - 250, floor) },
      { id: "maintain", label: "Maintain weight", calories: tdee },
      { id: "mild-gain", label: "Gain 0.5 lb (0.23 kg) per week", calories: tdee + 250 },
      { id: "gain", label: "Gain 1 lb (0.45 kg) per week", calories: tdee + 500 },
    ],
    minimumCalories: floor,
  };
}

// ---- Ideal weight ----
// Formuller 5 ft (152,4 cm) ustundeki her inc icin eklenen kg'dir.
export const idealWeightFormulas = [
  { id: "robinson", name: "Robinson (1983)", male: [52, 1.9], female: [49, 1.7] },
  { id: "miller", name: "Miller (1983)", male: [56.2, 1.41], female: [53.1, 1.36] },
  { id: "devine", name: "Devine (1974)", male: [50, 2.3], female: [45.5, 2.3] },
  { id: "hamwi", name: "Hamwi (1964)", male: [48, 2.7], female: [45.5, 2.2] },
] as const;

export function idealWeights(sex: Sex, heightCm: number) {
  if (!Number.isFinite(heightCm) || heightCm <= 0) return null;
  const inchesOverFiveFeet = Math.max(0, heightCm / CM_PER_INCH - 60);
  const heightM = heightCm / 100;
  return {
    formulas: idealWeightFormulas.map((formula) => {
      const [base, perInch] = formula[sex];
      return { id: formula.id, name: formula.name, kg: base + perInch * inchesOverFiveFeet };
    }),
    // WHO saglikli BMI araligi 18,5-24,9.
    healthyBmiRangeKg: [18.5 * heightM * heightM, 24.9 * heightM * heightM] as const,
    belowFiveFeet: heightCm < 152.4,
  };
}

// ---- Fuel economy ----
export const LITERS_PER_US_GALLON = 3.785411784;
export const LITERS_PER_IMPERIAL_GALLON = 4.54609;
export const KM_PER_MILE = 1.609344;

export type FuelEconomyUnit = "mpg-us" | "mpg-uk" | "l-100km" | "km-l";

export const fuelEconomyUnits: Array<{ id: FuelEconomyUnit; label: string; short: string }> = [
  { id: "mpg-us", label: "Miles per gallon (US)", short: "mpg (US)" },
  { id: "mpg-uk", label: "Miles per gallon (UK, imperial)", short: "mpg (UK)" },
  { id: "l-100km", label: "Liters per 100 km", short: "L/100 km" },
  { id: "km-l", label: "Kilometers per liter", short: "km/L" },
];

/** Converts any fuel economy value to all four units. The relation is inverse, not linear. */
export function convertFuelEconomy(value: number, from: FuelEconomyUnit) {
  if (!Number.isFinite(value) || value <= 0) return null;
  const kmPerLiter =
    from === "km-l"
      ? value
      : from === "l-100km"
        ? 100 / value
        : from === "mpg-us"
          ? (value * KM_PER_MILE) / LITERS_PER_US_GALLON
          : (value * KM_PER_MILE) / LITERS_PER_IMPERIAL_GALLON;
  return {
    "km-l": kmPerLiter,
    "l-100km": 100 / kmPerLiter,
    "mpg-us": (kmPerLiter * LITERS_PER_US_GALLON) / KM_PER_MILE,
    "mpg-uk": (kmPerLiter * LITERS_PER_IMPERIAL_GALLON) / KM_PER_MILE,
  } satisfies Record<FuelEconomyUnit, number>;
}
