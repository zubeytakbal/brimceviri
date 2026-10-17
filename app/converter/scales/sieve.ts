// Standart elek (mesh) numaraları ve açıklıkları: ASTM E11 (ABD standart elek serisi), açıklıklar ISO 565 R 20/3 değerleriyle aynıdır.
// "Mesh" numarası bir inçteki tel sayısına yakındır; açıklık tel kalınlığına da bağlı olduğundan aradaki ilişki formülle değil, tabloyla verilir.

export type Sieve = { mesh: number; micron: number };

export const ASTM_E11: Sieve[] = [
  { mesh: 4, micron: 4750 },
  { mesh: 5, micron: 4000 },
  { mesh: 6, micron: 3350 },
  { mesh: 7, micron: 2800 },
  { mesh: 8, micron: 2360 },
  { mesh: 10, micron: 2000 },
  { mesh: 12, micron: 1700 },
  { mesh: 14, micron: 1400 },
  { mesh: 16, micron: 1180 },
  { mesh: 18, micron: 1000 },
  { mesh: 20, micron: 850 },
  { mesh: 25, micron: 710 },
  { mesh: 30, micron: 600 },
  { mesh: 35, micron: 500 },
  { mesh: 40, micron: 425 },
  { mesh: 45, micron: 355 },
  { mesh: 50, micron: 300 },
  { mesh: 60, micron: 250 },
  { mesh: 70, micron: 212 },
  { mesh: 80, micron: 180 },
  { mesh: 100, micron: 150 },
  { mesh: 120, micron: 125 },
  { mesh: 140, micron: 106 },
  { mesh: 170, micron: 90 },
  { mesh: 200, micron: 75 },
  { mesh: 230, micron: 63 },
  { mesh: 270, micron: 53 },
  { mesh: 325, micron: 45 },
  { mesh: 400, micron: 38 },
  { mesh: 450, micron: 32 },
  { mesh: 500, micron: 25 },
  { mesh: 635, micron: 20 },
];

/** Mikron değerine en yakın standart elek (logaritmik uzaklık). */
export function nearestSieveByMicron(micron: number): Sieve | null {
  if (!Number.isFinite(micron) || micron <= 0) return null;
  return ASTM_E11.reduce((best, s) => (Math.abs(Math.log(s.micron / micron)) < Math.abs(Math.log(best.micron / micron)) ? s : best));
}

/** Verilen tanecik boyutunun geçtiği en büyük numaralı (en ince) elek: açıklığı tanecikten büyük ya da eşit olan son elek. */
export function finestPassingSieve(micron: number): Sieve | null {
  if (!Number.isFinite(micron) || micron <= 0) return null;
  const passing = ASTM_E11.filter((s) => s.micron >= micron);
  return passing.length ? passing[passing.length - 1] : null;
}
