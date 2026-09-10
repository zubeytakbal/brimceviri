// Standart ICAO/NOAA barometrik basinc formulu (troposfer, ~11 km'ye
// kadar gecerli -- tum 8.000+ zirveler bu araligin icinde). Deniz
// seviyesi standart basinci 1013,25 hPa kabul edilir; oksijen orani
// (hacimce %20,9) irtifayla degismez, degisen kismi basinctir -- bu
// yuzden "deniz seviyesine gore basinc/oksijen yuzdesi" ayni orandir.
const SEA_LEVEL_PRESSURE_HPA = 1013.25;

export type AltitudeEffectResult = {
  pressureHpa: number;
  percentOfSeaLevel: number;
};

export function calculateAltitudeEffect(
  elevationM: number
): AltitudeEffectResult | null {
  if (!Number.isFinite(elevationM) || elevationM < 0) {
    return null;
  }

  const pressureHpa =
    SEA_LEVEL_PRESSURE_HPA * Math.pow(1 - 0.0000225577 * elevationM, 5.25588);
  const percentOfSeaLevel = (pressureHpa / SEA_LEVEL_PRESSURE_HPA) * 100;

  return { pressureHpa, percentOfSeaLevel };
}
