// Glasgow Koma Skalasi (GKS) hesaplama -- goz acma, sozel yanit ve
// motor yanit puanlarinin toplamindan (3-15 arasi) bilinc duzeyini
// siniflandirir. 1974'te Teasdale ve Jennett tarafindan gelistirilmis,
// uluslararasi kabul gormus bir klinik degerlendirme olcegidir. Bu bir
// puanlama sistemidir, tedavi/doz onerisi yapmaz.

export type EyeOpeningScore = 1 | 2 | 3 | 4;
export type VerbalResponseScore = 1 | 2 | 3 | 4 | 5;
export type MotorResponseScore = 1 | 2 | 3 | 4 | 5 | 6;

export type GcsCategory = "hafif" | "orta" | "siddetli";

export type GcsResult = {
  total: number;
  category: GcsCategory;
};

export function calculateGcs(
  eyeOpening: EyeOpeningScore,
  verbalResponse: VerbalResponseScore,
  motorResponse: MotorResponseScore
): GcsResult | null {
  if (
    ![1, 2, 3, 4].includes(eyeOpening) ||
    ![1, 2, 3, 4, 5].includes(verbalResponse) ||
    ![1, 2, 3, 4, 5, 6].includes(motorResponse)
  ) {
    return null;
  }

  const total = eyeOpening + verbalResponse + motorResponse;

  let category: GcsCategory = "siddetli";
  if (total >= 14) {
    category = "hafif";
  } else if (total >= 9) {
    category = "orta";
  }

  return { total, category };
}
