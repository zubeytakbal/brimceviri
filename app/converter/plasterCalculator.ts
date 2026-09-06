export type PlasterType = "alci" | "cimento";

export interface PlasterInput {
  plasterType: PlasterType;
  area: number;
  thicknessCm: number;
  kgPerM2PerCm: number;
  bagWeightKg: number;
  wasteFactor: number;
}

export interface PlasterResult {
  plasterType: PlasterType;
  totalKg: number;
  totalKgWithWaste: number;
  bagCount: number;
}

export type PlasterOutcome =
  | { success: true; result: PlasterResult }
  | { success: false; message: string };

export function calculatePlaster(input: PlasterInput): PlasterOutcome {
  const { plasterType, area, thicknessCm, kgPerM2PerCm, bagWeightKg, wasteFactor } = input;

  if (!(area > 0)) {
    return { success: false, message: "Alan 0'dan büyük olmalı." };
  }
  if (!(thicknessCm > 0)) {
    return { success: false, message: "Kalınlık 0'dan büyük olmalı." };
  }
  if (!(kgPerM2PerCm > 0)) {
    return { success: false, message: "m² başına kg değeri 0'dan büyük olmalı." };
  }
  if (!(bagWeightKg > 0)) {
    return { success: false, message: "Torba ağırlığı 0'dan büyük olmalı." };
  }
  if (!(wasteFactor >= 0)) {
    return { success: false, message: "Fire payı 0 veya daha büyük olmalı." };
  }

  const totalKg = area * thicknessCm * kgPerM2PerCm;
  const totalKgWithWaste = totalKg * (1 + wasteFactor / 100);
  const bagCount = Math.ceil(totalKgWithWaste / bagWeightKg);

  return {
    success: true,
    result: {
      plasterType,
      totalKg,
      totalKgWithWaste,
      bagCount,
    },
  };
}
