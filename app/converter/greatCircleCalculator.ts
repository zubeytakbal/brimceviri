// Buyuk daire (great circle) mesafe ve rota hesaplama -- iki nokta
// arasindaki en kisa kure-uzeri mesafeyi (Haversine formulu) ve
// baslangic rotasini (initial bearing) hesaplar. Bu, uzun okyanus
// gecislerinde ve uzun menzilli ucus planlamasinda kullanilan, tam
// kure geometrisine dayanan kesin bir formuldur (yaklasik degil).

export type GreatCircleInput = {
  lat1Deg: number;
  lon1Deg: number;
  lat2Deg: number;
  lon2Deg: number;
};

export type GreatCircleResult = {
  distanceNm: number;
  distanceKm: number;
  initialBearingDeg: number;
};

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

export function calculateGreatCircle(
  input: GreatCircleInput
): GreatCircleResult | null {
  const { lat1Deg, lon1Deg, lat2Deg, lon2Deg } = input;

  if (
    !Number.isFinite(lat1Deg) ||
    !Number.isFinite(lon1Deg) ||
    !Number.isFinite(lat2Deg) ||
    !Number.isFinite(lon2Deg) ||
    Math.abs(lat1Deg) > 90 ||
    Math.abs(lat2Deg) > 90 ||
    Math.abs(lon1Deg) > 180 ||
    Math.abs(lon2Deg) > 180
  ) {
    return null;
  }

  const phi1 = toRadians(lat1Deg);
  const phi2 = toRadians(lat2Deg);
  const deltaPhi = toRadians(lat2Deg - lat1Deg);
  const deltaLambda = toRadians(lon2Deg - lon1Deg);

  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 1 yay dakikasi = tanim geregi tam olarak 1 deniz mili
  const distanceNm = toDegrees(c) * 60;
  const distanceKm = distanceNm * 1.852;

  const bearingRad = Math.atan2(
    Math.sin(deltaLambda) * Math.cos(phi2),
    Math.cos(phi1) * Math.sin(phi2) -
      Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda)
  );
  const initialBearingDeg = (toDegrees(bearingRad) + 360) % 360;

  return { distanceNm, distanceKm, initialBearingDeg };
}
