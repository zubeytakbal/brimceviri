// CHA2DS2-VASc skoru hesaplama -- atriyal fibrilasyonu olan hastalarda
// inme/tromboemboli riskini puanlayan, klinikte yaygin kullanilan bir
// risk degerlendirme araci. 2024 ESC kilavuzunda cinsiyet faktoru
// kaldirilarak CHA2DS2-VA olarak revize edilmistir; bu arac hem klasik
// hem revize skoru birlikte gosterir. Bu bir risk skorudur, tedavi
// onerisi yapmaz.

export type Cha2ds2Input = {
  congestiveHeartFailure: boolean;
  hypertension: boolean;
  ageBand: "under65" | "65to74" | "75plus";
  diabetes: boolean;
  strokeOrTia: boolean;
  vascularDisease: boolean;
  isFemale: boolean;
};

export type Cha2ds2Result = {
  classicTotal: number;
  revisedTotal: number;
};

export function calculateCha2ds2(input: Cha2ds2Input): Cha2ds2Result {
  const {
    congestiveHeartFailure,
    hypertension,
    ageBand,
    diabetes,
    strokeOrTia,
    vascularDisease,
    isFemale,
  } = input;

  const agePoints = ageBand === "75plus" ? 2 : ageBand === "65to74" ? 1 : 0;

  const baseTotal =
    (congestiveHeartFailure ? 1 : 0) +
    (hypertension ? 1 : 0) +
    agePoints +
    (diabetes ? 1 : 0) +
    (strokeOrTia ? 2 : 0) +
    (vascularDisease ? 1 : 0);

  return {
    revisedTotal: baseTotal,
    classicTotal: baseTotal + (isFemale ? 1 : 0),
  };
}
