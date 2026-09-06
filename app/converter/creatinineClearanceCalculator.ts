// Kreatinin klirensi hesaplama -- Cockcroft-Gault formulu (1976).
// Bobrek fonksiyonunu tahmin eder, ozellikle bobrek yoluyla atilan
// ilaclarin doz ayarlamasinda klinik referans olarak kullanilir. Bu
// arac yalnizca tahmini klirens degerini hesaplar; doz onerisi yapmaz.

export type Gender = "male" | "female";

export type CreatinineClearanceInput = {
  age: number;
  weightKg: number;
  serumCreatinineMgDl: number;
  gender: Gender;
};

export function calculateCreatinineClearance(
  input: CreatinineClearanceInput
): number | null {
  const { age, weightKg, serumCreatinineMgDl, gender } = input;

  if (
    !Number.isFinite(age) ||
    age <= 0 ||
    !Number.isFinite(weightKg) ||
    weightKg <= 0 ||
    !Number.isFinite(serumCreatinineMgDl) ||
    serumCreatinineMgDl <= 0 ||
    (gender !== "male" && gender !== "female")
  ) {
    return null;
  }

  const genderFactor = gender === "female" ? 0.85 : 1;

  return (
    ((140 - age) * weightKg * genderFactor) / (72 * serumCreatinineMgDl)
  );
}
