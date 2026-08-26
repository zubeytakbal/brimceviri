// Kosu pace (tempo) hesaplama -- mesafe, sure ve tempo (dakika/km)
// arasinda ucgen iliski: tempo = sure / mesafe. Bilinen iki degerden
// ucuncusu hesaplanir, ayrica standart yaris mesafeleri (5K, 10K,
// yari maraton, maraton) icin tahmini bitis suresi uretilir.

export type PaceCalculationMode = "pace" | "duration" | "distance";

export type RaceEstimate = {
  label: string;
  distanceKm: number;
  durationSeconds: number;
};

export type PaceCalculatorResult = {
  distanceKm: number;
  durationSeconds: number;
  paceSecondsPerKm: number;
  speedKmh: number;
  raceEstimates: RaceEstimate[];
};

const RACE_DISTANCES: Array<{ label: string; km: number }> = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Yarı Maraton", km: 21.0975 },
  { label: "Maraton", km: 42.195 },
];

function buildResult(
  distanceKm: number,
  durationSeconds: number,
  paceSecondsPerKm: number
): PaceCalculatorResult {
  return {
    distanceKm,
    durationSeconds,
    paceSecondsPerKm,
    speedKmh: 3600 / paceSecondsPerKm,
    raceEstimates: RACE_DISTANCES.map((race) => ({
      label: race.label,
      distanceKm: race.km,
      durationSeconds: race.km * paceSecondsPerKm,
    })),
  };
}

export function calculatePaceFromDistanceDuration(
  distanceKm: number,
  durationSeconds: number
): PaceCalculatorResult | null {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    return null;
  }

  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return null;
  }

  return buildResult(distanceKm, durationSeconds, durationSeconds / distanceKm);
}

export function calculateDurationFromDistancePace(
  distanceKm: number,
  paceSecondsPerKm: number
): PaceCalculatorResult | null {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    return null;
  }

  if (!Number.isFinite(paceSecondsPerKm) || paceSecondsPerKm <= 0) {
    return null;
  }

  return buildResult(distanceKm, distanceKm * paceSecondsPerKm, paceSecondsPerKm);
}

export function calculateDistanceFromDurationPace(
  durationSeconds: number,
  paceSecondsPerKm: number
): PaceCalculatorResult | null {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return null;
  }

  if (!Number.isFinite(paceSecondsPerKm) || paceSecondsPerKm <= 0) {
    return null;
  }

  return buildResult(
    durationSeconds / paceSecondsPerKm,
    durationSeconds,
    paceSecondsPerKm
  );
}
