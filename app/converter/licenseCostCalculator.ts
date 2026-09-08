// Ehliyet maliyeti hesaplama -- kullanicinin kendi aldigi teklife
// dayanir (kurs ucreti, sinav harci, ekstra ders), sabit bir bolgesel
// ortalama degil. Boylece kisisel girdi ilkesini korur.

export interface LicenseCostInput {
  courseFeeTl: number;
  examFeeTl: number;
  extraLessonCount: number;
  extraLessonFeeTl: number;
}

export interface LicenseCostResult {
  totalCostTl: number;
}

export function calculateLicenseCost(
  input: LicenseCostInput,
): LicenseCostResult | null {
  const { courseFeeTl, examFeeTl, extraLessonCount, extraLessonFeeTl } = input;

  if (
    !Number.isFinite(courseFeeTl) ||
    courseFeeTl < 0 ||
    !Number.isFinite(examFeeTl) ||
    examFeeTl < 0 ||
    !Number.isFinite(extraLessonCount) ||
    extraLessonCount < 0 ||
    !Number.isFinite(extraLessonFeeTl) ||
    extraLessonFeeTl < 0
  ) {
    return null;
  }

  const totalCostTl =
    courseFeeTl + examFeeTl + extraLessonCount * extraLessonFeeTl;

  return { totalCostTl };
}
