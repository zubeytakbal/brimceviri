// Standart ICAO/NOAA barometrik basinc formulu (troposfer, ~11 km'ye
// kadar gecerli -- tum 8.000+ zirveler bu araligin icinde). Deniz
// seviyesi standart basinci 1013,25 hPa kabul edilir; oksijen orani
// (hacimce %20,9) irtifayla degismez, degisen kismi basinctir -- bu
// yuzden "deniz seviyesine gore basinc/oksijen yuzdesi" ayni orandir.
const SEA_LEVEL_PRESSURE_HPA = 1013.25;

export type AltitudeEffectResult = {
  pressureHpa: number;
  percentOfSeaLevel: number;
  waterBoilingPointC: number;
};

// Clausius-Clapeyron denklemi ile suyun kaynama noktasi -- kaynama,
// buhar basincinin dis basinca esitlendigi sicaklikta gerceklesir.
// R = evrensel gaz sabiti, L = suyun buharlasma gizli isisi (ortalama
// deger, sicaklik araligina gore hafifce degisir ama bu yaklaşıklık
// bilinen referans degerlerle (Everest ~70C, Kilimanjaro ~80C) test
// edilip dogrulanmistir.
const GAS_CONSTANT = 8.314; // J/(mol*K)
const WATER_LATENT_HEAT = 40660; // J/mol
const SEA_LEVEL_BOILING_POINT_K = 373.15; // 100 C

function calculateBoilingPointC(pressureHpa: number): number {
  const inverseTemp =
    1 / SEA_LEVEL_BOILING_POINT_K -
    (GAS_CONSTANT / WATER_LATENT_HEAT) * Math.log(pressureHpa / SEA_LEVEL_PRESSURE_HPA);
  return 1 / inverseTemp - 273.15;
}

export function calculateAltitudeEffect(
  elevationM: number
): AltitudeEffectResult | null {
  if (!Number.isFinite(elevationM) || elevationM < 0) {
    return null;
  }

  const pressureHpa =
    SEA_LEVEL_PRESSURE_HPA * Math.pow(1 - 0.0000225577 * elevationM, 5.25588);
  const percentOfSeaLevel = (pressureHpa / SEA_LEVEL_PRESSURE_HPA) * 100;
  const waterBoilingPointC = calculateBoilingPointC(pressureHpa);

  return { pressureHpa, percentOfSeaLevel, waterBoilingPointC };
}
