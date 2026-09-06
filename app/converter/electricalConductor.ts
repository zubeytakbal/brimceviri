export type ConductorMaterial = "copper" | "aluminum";

export type ElectricalSystemType = "single-phase" | "three-phase" | "dc";

export const CONDUCTOR_RESISTIVITY: Record<ConductorMaterial, number> = {
  copper: 0.0175,
  aluminum: 0.028,
};

export type ResistivityReferenceRow = {
  id: string;
  label: string;
  resistivity: number;
  selectable: boolean;
};

// 20 C civarinda, yaygin kabul goren ozdirenc degerleri (Omega*mm2/m).
// Bakir ve aluminyum bu hesaplayicida secilebilir; gumus ve demir yalnizca
// karsilastirma referansi icin eklenmistir (pratikte kablo iletkeni olarak
// kullanilmazlar).
export const resistivityReferenceTable: Record<
  "tr" | "en" | "de" | "ar",
  ResistivityReferenceRow[]
> = {
  tr: [
    { id: "silver", label: "Gumus", resistivity: 0.0159, selectable: false },
    { id: "copper", label: "Bakir", resistivity: 0.0175, selectable: true },
    { id: "aluminum", label: "Aluminyum", resistivity: 0.028, selectable: true },
    { id: "iron", label: "Demir", resistivity: 0.1, selectable: false },
  ],
  en: [
    { id: "silver", label: "Silver", resistivity: 0.0159, selectable: false },
    { id: "copper", label: "Copper", resistivity: 0.0175, selectable: true },
    { id: "aluminum", label: "Aluminum", resistivity: 0.028, selectable: true },
    { id: "iron", label: "Iron", resistivity: 0.1, selectable: false },
  ],
  de: [
    { id: "silver", label: "Silber", resistivity: 0.0159, selectable: false },
    { id: "copper", label: "Kupfer", resistivity: 0.0175, selectable: true },
    { id: "aluminum", label: "Aluminium", resistivity: 0.028, selectable: true },
    { id: "iron", label: "Eisen", resistivity: 0.1, selectable: false },
  ],
  ar: [
    { id: "silver", label: "الفضة", resistivity: 0.0159, selectable: false },
    { id: "copper", label: "النحاس", resistivity: 0.0175, selectable: true },
    { id: "aluminum", label: "الألمنيوم", resistivity: 0.028, selectable: true },
    { id: "iron", label: "الحديد", resistivity: 0.1, selectable: false },
  ],
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
