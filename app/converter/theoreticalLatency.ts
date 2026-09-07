import { calculateGreatCircle } from "./greatCircleCalculator";

// Fiber optik kablolarda isik, camin kirilma indisi (~1,5) nedeniyle
// bosluktaki isik hizinin (299.792 km/s) yaklasik ucte ikisi kadar
// hizla ilerler, yani ~200.000 km/s. Bu, hicbir yonlendirme/anahtarlama
// gecikmesi olmadan FIZIKSEL OLARAK mumkun olan EN DUSUK gecikmeyi
// temsil eder -- gercek internet gecikmesi her zaman bundan yuksektir,
// cunku veri duz bir hatta degil gercek kablo guzergahindan (genelde
// buyuk daire mesafesinden daha uzun) ve birden fazla yonlendirici/
// anahtardan gecer. Kaynak: fiber optik gecikme hesaplama uzerine
// yaygin kabul goren muhendislik kurali (5 ms / 1000 km tek yon).
export const FIBER_SPEED_KM_PER_S = 200000;

export interface CityLocation {
  id: string;
  nameTr: string;
  latDeg: number;
  lonDeg: number;
}

// Koordinatlar, oyun sunuculari ve internet trafiginde yaygin kabul
// goren buyuk sehir/veri merkezi hub'larini temsil eder.
export const cityLocations: CityLocation[] = [
  { id: "istanbul", nameTr: "İstanbul", latDeg: 41.0082, lonDeg: 28.9784 },
  { id: "ankara", nameTr: "Ankara", latDeg: 39.9334, lonDeg: 32.8597 },
  { id: "izmir", nameTr: "İzmir", latDeg: 38.4237, lonDeg: 27.1428 },
  { id: "frankfurt", nameTr: "Frankfurt", latDeg: 50.1109, lonDeg: 8.6821 },
  { id: "amsterdam", nameTr: "Amsterdam", latDeg: 52.3676, lonDeg: 4.9041 },
  { id: "londra", nameTr: "Londra", latDeg: 51.5072, lonDeg: -0.1276 },
  { id: "paris", nameTr: "Paris", latDeg: 48.8566, lonDeg: 2.3522 },
  { id: "varsova", nameTr: "Varşova", latDeg: 52.2297, lonDeg: 21.0122 },
  { id: "moskova", nameTr: "Moskova", latDeg: 55.7558, lonDeg: 37.6173 },
  { id: "new-york", nameTr: "New York", latDeg: 40.7128, lonDeg: -74.006 },
  { id: "los-angeles", nameTr: "Los Angeles", latDeg: 34.0522, lonDeg: -118.2437 },
  { id: "chicago", nameTr: "Chicago", latDeg: 41.8781, lonDeg: -87.6298 },
  { id: "sao-paulo", nameTr: "São Paulo", latDeg: -23.5505, lonDeg: -46.6333 },
  { id: "dubai", nameTr: "Dubai", latDeg: 25.2048, lonDeg: 55.2708 },
  { id: "mumbai", nameTr: "Mumbai", latDeg: 19.076, lonDeg: 72.8777 },
  { id: "singapur", nameTr: "Singapur", latDeg: 1.3521, lonDeg: 103.8198 },
  { id: "tokyo", nameTr: "Tokyo", latDeg: 35.6762, lonDeg: 139.6503 },
  { id: "sidney", nameTr: "Sidney", latDeg: -33.8688, lonDeg: 151.2093 },
  { id: "johannesburg", nameTr: "Johannesburg", latDeg: -26.2041, lonDeg: 28.0473 },
];

export interface TheoreticalLatencyResult {
  distanceKm: number;
  oneWayMs: number;
  theoreticalRttMs: number;
  realisticRttLowMs: number;
  realisticRttHighMs: number;
}

export function calculateTheoreticalLatency(
  fromId: string,
  toId: string,
): TheoreticalLatencyResult | null {
  const from = cityLocations.find((city) => city.id === fromId);
  const to = cityLocations.find((city) => city.id === toId);

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

  // Gercek dunya olcumlerine gore (ornegin Londra-New York hattinda
  // teorik ~32ms'e karsi olculen ~70-80ms), gercek RTT yonlendirme/
  // anahtarlama/kuyruklama gecikmeleri nedeniyle teorik degerin
  // yaklasik 1,5-3 kati arasinda cikar -- bu bir kesinlik degil,
  // deneyimsel bir araliktir.
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
