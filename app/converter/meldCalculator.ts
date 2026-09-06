// MELD Skoru (Model for End-Stage Liver Disease) hesaplama -- kronik
// karaciger hastaliginin ciddiyetini puanlayan, karaciger nakli
// bekleme listesinde hasta onceliklendirmesi icin kullanilan
// uluslararasi standart bir skordur. Bu bir siddet skorudur, tedavi
// onerisi yapmaz.

export type MeldInput = {
  bilirubinMgDl: number;
  inr: number;
  creatinineMgDl: number;
  onDialysis: boolean;
};

export function calculateMeld(input: MeldInput): number | null {
  const { bilirubinMgDl, inr, creatinineMgDl, onDialysis } = input;

  if (
    !Number.isFinite(bilirubinMgDl) ||
    bilirubinMgDl <= 0 ||
    !Number.isFinite(inr) ||
    inr <= 0 ||
    !Number.isFinite(creatinineMgDl) ||
    creatinineMgDl <= 0
  ) {
    return null;
  }

  // MELD formulunun standart sinir kurallari: her deger en az 1.0
  // kabul edilir; diyalizdeki hastalarda veya kreatinin 4.0'i
  // asiyorsa kreatinin 4.0 olarak sinirlandirilir.
  const boundedBilirubin = Math.max(bilirubinMgDl, 1);
  const boundedInr = Math.max(inr, 1);
  const boundedCreatinine = onDialysis
    ? 4
    : Math.min(Math.max(creatinineMgDl, 1), 4);

  const rawScore =
    3.78 * Math.log(boundedBilirubin) +
    11.2 * Math.log(boundedInr) +
    9.57 * Math.log(boundedCreatinine) +
    6.43;

  const rounded = Math.round(rawScore);

  return Math.min(Math.max(rounded, 6), 40);
}
