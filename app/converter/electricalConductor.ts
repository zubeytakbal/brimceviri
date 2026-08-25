export type ConductorMaterial = "copper" | "aluminum";

export type ElectricalSystemType = "single-phase" | "three-phase" | "dc";

export const CONDUCTOR_RESISTIVITY: Record<ConductorMaterial, number> = {
  copper: 0.0175,
  aluminum: 0.028,
};

export function getPhaseFactor(systemType: ElectricalSystemType) {
  return systemType === "three-phase" ? Math.sqrt(3) : 2;
}

export const STANDARD_CROSS_SECTIONS_MM2 = [
  1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300,
] as const;

export function roundUpToStandardCrossSection(valueInMm2: number) {
  return (
    STANDARD_CROSS_SECTIONS_MM2.find((size) => size >= valueInMm2) ?? null
  );
}
