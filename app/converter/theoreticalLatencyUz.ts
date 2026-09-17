import { calculateGreatCircle } from "./greatCircleCalculator";
import { FIBER_SPEED_KM_PER_S, type TheoreticalLatencyResult } from "./theoreticalLatency";

export interface CityLocationUz {
  id: string;
  nameUz: string;
  latDeg: number;
  lonDeg: number;
}

// Xuddi shu shahar/data markazi koordinatalari TR versiyasidagi kabi,
// Toshkent O'zbekiston auditoriyasi uchun qo'shimcha standart joylashuv
// sifatida qo'shildi.
export const cityLocationsUz: CityLocationUz[] = [
  { id: "toshkent", nameUz: "Toshkent", latDeg: 41.2995, lonDeg: 69.2401 },
  { id: "istanbul", nameUz: "Istanbul", latDeg: 41.0082, lonDeg: 28.9784 },
  { id: "ankara", nameUz: "Ankara", latDeg: 39.9334, lonDeg: 32.8597 },
  { id: "izmir", nameUz: "Izmir", latDeg: 38.4237, lonDeg: 27.1428 },
  { id: "frankfurt", nameUz: "Frankfurt", latDeg: 50.1109, lonDeg: 8.6821 },
  { id: "amsterdam", nameUz: "Amsterdam", latDeg: 52.3676, lonDeg: 4.9041 },
  { id: "londra", nameUz: "London", latDeg: 51.5072, lonDeg: -0.1276 },
  { id: "paris", nameUz: "Parij", latDeg: 48.8566, lonDeg: 2.3522 },
  { id: "varsova", nameUz: "Varshava", latDeg: 52.2297, lonDeg: 21.0122 },
  { id: "moskova", nameUz: "Moskva", latDeg: 55.7558, lonDeg: 37.6173 },
  { id: "new-york", nameUz: "Nyu-York", latDeg: 40.7128, lonDeg: -74.006 },
  { id: "los-angeles", nameUz: "Los-Anjeles", latDeg: 34.0522, lonDeg: -118.2437 },
  { id: "chicago", nameUz: "Chikago", latDeg: 41.8781, lonDeg: -87.6298 },
  { id: "sao-paulo", nameUz: "San-Paulu", latDeg: -23.5505, lonDeg: -46.6333 },
  { id: "dubai", nameUz: "Dubay", latDeg: 25.2048, lonDeg: 55.2708 },
  { id: "mumbai", nameUz: "Mumbay", latDeg: 19.076, lonDeg: 72.8777 },
  { id: "singapur", nameUz: "Singapur", latDeg: 1.3521, lonDeg: 103.8198 },
  { id: "tokyo", nameUz: "Tokio", latDeg: 35.6762, lonDeg: 139.6503 },
  { id: "sidney", nameUz: "Sidney", latDeg: -33.8688, lonDeg: 151.2093 },
  { id: "johannesburg", nameUz: "Yoxannesburg", latDeg: -26.2041, lonDeg: 28.0473 },
];

export function calculateTheoreticalLatencyUz(
  fromId: string,
  toId: string,
): TheoreticalLatencyResult | null {
  const from = cityLocationsUz.find((city) => city.id === fromId);
  const to = cityLocationsUz.find((city) => city.id === toId);

  if (!from || !to) return null;

  const greatCircle = calculateGreatCircle({
    lat1Deg: from.latDeg,
    lon1Deg: from.lonDeg,
    lat2Deg: to.latDeg,
    lon2Deg: to.lonDeg,
  });

  if (!greatCircle) return null;

  const oneWayMs = (greatCircle.distanceKm / FIBER_SPEED_KM_PER_S) * 1000;
  const theoreticalRttMs = oneWayMs * 2;
  const realisticRttLowMs = theoreticalRttMs * 1.5;
  const realisticRttHighMs = theoreticalRttMs * 3;

  return {
    distanceKm: greatCircle.distanceKm,
    oneWayMs,
    theoreticalRttMs,
    realisticRttLowMs,
    realisticRttHighMs,
  };
}
