// Morse Dusme Olcegi (Morse Fall Scale) hesaplama -- hastanede dusme
// riskini degerlendiren, hemsirelik pratiginde yaygin kullanilan 6
// kriterlik klasik bir risk skorudur. Bu bir risk taramasidir, bakim
// plani onerisi yapmaz.

export type AmbulatoryAid = "none" | "crutchesCaneWalker" | "furniture";
export type Gait = "normal" | "weak" | "impaired";

export type MorseFallScaleInput = {
  historyOfFalling: boolean;
  secondaryDiagnosis: boolean;
  ambulatoryAid: AmbulatoryAid;
  ivOrHeparinLock: boolean;
  gait: Gait;
  forgetsLimitations: boolean;
};

export type MorseRiskCategory = "dusuk" | "orta" | "yuksek";

export type MorseFallScaleResult = {
  total: number;
  category: MorseRiskCategory;
};

const ambulatoryAidPoints: Record<AmbulatoryAid, number> = {
  none: 0,
  crutchesCaneWalker: 15,
  furniture: 30,
};

const gaitPoints: Record<Gait, number> = {
  normal: 0,
  weak: 10,
  impaired: 20,
};

export function calculateMorseFallScale(
  input: MorseFallScaleInput
): MorseFallScaleResult {
  const {
    historyOfFalling,
    secondaryDiagnosis,
    ambulatoryAid,
    ivOrHeparinLock,
    gait,
    forgetsLimitations,
  } = input;

  const total =
    (historyOfFalling ? 25 : 0) +
    (secondaryDiagnosis ? 15 : 0) +
    ambulatoryAidPoints[ambulatoryAid] +
    (ivOrHeparinLock ? 20 : 0) +
    gaitPoints[gait] +
    (forgetsLimitations ? 15 : 0);

  let category: MorseRiskCategory = "dusuk";
  if (total >= 45) {
    category = "yuksek";
  } else if (total >= 25) {
    category = "orta";
  }

  return { total, category };
}
