export type ElectrodeCoating = "ince" | "kalin" | "demir-tozu";

export type CurrentRange = {
  min: number;
  max: number;
};

export const electrodeCoatingLabels: Record<ElectrodeCoating, string> = {
  ince: "İnce Örtülü",
  kalin: "Kalın Örtülü",
  "demir-tozu": "Demir Tozlu Kalın Örtülü",
};

const coefficientsByCoating: Record<ElectrodeCoating, CurrentRange> = {
  ince: { min: 40, max: 45 },
  kalin: { min: 45, max: 50 },
  "demir-tozu": { min: 50, max: 60 },
};

export function calculateWeldingCurrent(
  diameterMm: number,
  coating: ElectrodeCoating
): CurrentRange | null {
  if (!Number.isFinite(diameterMm) || diameterMm <= 0) {
    return null;
  }

  const coefficient = coefficientsByCoating[coating];

  return {
    min: diameterMm * coefficient.min,
    max: diameterMm * coefficient.max,
  };
}

export function calculateHeatInput(
  voltage: number,
  current: number,
  travelSpeedMmPerMin: number
): number | null {
  if (
    !Number.isFinite(voltage) ||
    voltage <= 0 ||
    !Number.isFinite(current) ||
    current <= 0 ||
    !Number.isFinite(travelSpeedMmPerMin) ||
    travelSpeedMmPerMin <= 0
  ) {
    return null;
  }

  return (voltage * current * 60) / (travelSpeedMmPerMin * 1000);
}
