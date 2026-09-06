// Basinc kaybi (yuk kaybi) hesaplama -- Hazen-Williams formuluyle
// basincli su/siv hatlarinda surtunme kaynakli yuk kaybini hesaplar.
// hf = 10.67 * L * Q^1.852 / (C^1.852 * D^4.87), SI birimlerinde
// (L, D metre; Q m3/s; hf metre su sutunu). C katsayisi boru
// malzemesine gore degisen, uzun sureli standart bir puruzluluk
// sabitidir (kullanici kendi malzemesine gore secer veya ozel deger
// girer). Bu formul turbulent akista su icin gecerlidir; gaz veya
// yuksek viskoziteli sivilar icin kullanilmaz.

export type PressureLossInput = {
  lengthM: number;
  diameterMm: number;
  flowLps: number;
  hazenWilliamsC: number;
};

export type PressureLossResult = {
  headLossM: number;
  headLossPerKm: number;
  pressureLossBar: number;
};

// 1 metre su sutunu ~= 0,0980665 bar (P = rho*g*h, rho=1000 kg/m3,
// g=9,80665 m/s2, Pa -> bar icin /100000).
const BAR_PER_METER_WATER_HEAD = 0.0980665;

export function calculatePressureLoss(
  input: PressureLossInput
): PressureLossResult | null {
  const { lengthM, diameterMm, flowLps, hazenWilliamsC } = input;

  if (
    !(lengthM > 0) ||
    !(diameterMm > 0) ||
    !(flowLps > 0) ||
    !(hazenWilliamsC > 0)
  ) {
    return null;
  }

  const diameterM = diameterMm / 1000;
  const flowM3s = flowLps / 1000;

  const headLossM =
    (10.67 * lengthM * Math.pow(flowM3s, 1.852)) /
    (Math.pow(hazenWilliamsC, 1.852) * Math.pow(diameterM, 4.87));

  return {
    headLossM,
    headLossPerKm: (headLossM / lengthM) * 1000,
    pressureLossBar: headLossM * BAR_PER_METER_WATER_HEAD,
  };
}
