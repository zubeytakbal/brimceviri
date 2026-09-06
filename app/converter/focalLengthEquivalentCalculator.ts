export type SensorFormat = {
  id: string;
  label: string;
  cropFactor: number;
};

export const sensorFormats: SensorFormat[] = [
  { id: "full-frame", label: "Tam Kare (Full Frame, 35mm)", cropFactor: 1 },
  { id: "aps-h", label: "APS-H", cropFactor: 1.3 },
  { id: "aps-c-nikon", label: "APS-C (Nikon / Sony / Fujifilm)", cropFactor: 1.5 },
  { id: "aps-c-canon", label: "APS-C (Canon)", cropFactor: 1.6 },
  { id: "micro-four-thirds", label: "Micro Four Thirds (M4/3)", cropFactor: 2 },
  { id: "1-inch", label: "1 İnç Sensör", cropFactor: 2.7 },
  { id: "medium-format-645", label: "Orta Format (645)", cropFactor: 0.79 },
];

export function calculateEquivalentFocalLength(
  focalLengthMm: number,
  cropFactor: number
): number | null {
  if (
    !Number.isFinite(focalLengthMm) ||
    focalLengthMm <= 0 ||
    !Number.isFinite(cropFactor) ||
    cropFactor <= 0
  ) {
    return null;
  }

  return focalLengthMm * cropFactor;
}
