// Vucut yuzey alani (BSA) hesaplama -- Mosteller formulu. Ilac
// dozlamasinda (mg/kg yerine mg/m2), organ fonksiyonu indekslemede ve
// yanik tedavisinde referans deger olarak kullanilir. Bu arac yalnizca
// BSA degerini hesaplar; ilac dozu onermez.

export type BsaInput = {
  heightCm: number;
  weightKg: number;
};

export function calculateBsa(input: BsaInput): number | null {
  const { heightCm, weightKg } = input;

  if (
    !Number.isFinite(heightCm) ||
    heightCm <= 0 ||
    !Number.isFinite(weightKg) ||
    weightKg <= 0
  ) {
    return null;
  }

  return Math.sqrt((heightCm * weightKg) / 3600);
}
