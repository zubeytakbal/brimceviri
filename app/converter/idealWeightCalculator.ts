// Ideal kilo hesaplama -- Devine formulu (1974). Klinik ortamda ilac
// dozlamasi gibi hesaplamalarda hala yaygin kullanilan, boya dayali
// basit bir ideal vucut agirligi tahmini sunar. 152,4 cm (60 inc)
// altindaki boylar icin formul tanimli degildir.

export type Gender = "male" | "female";

export type IdealWeightInput = {
  heightCm: number;
  gender: Gender;
};

export function calculateIdealWeight(
  input: IdealWeightInput
): number | null {
  const { heightCm, gender } = input;

  if (
    !Number.isFinite(heightCm) ||
    heightCm <= 152.4 ||
    (gender !== "male" && gender !== "female")
  ) {
    return null;
  }

  const heightInches = heightCm / 2.54;
  const inchesOverBase = heightInches - 60;

  return gender === "male"
    ? 50 + 2.3 * inchesOverBase
    : 45.5 + 2.3 * inchesOverBase;
}
