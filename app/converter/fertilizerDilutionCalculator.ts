// Bitki gubresi seyreltme hesaplama -- kullanicinin kendi urununun
// etiketindeki oran/doz bilgisi ve hazirlamak istedigi su miktariyla,
// eklemesi gereken gubre miktarini (ml) hesaplar. Etiketler genelde
// iki formatta yazilir: "1:200" (1 birim gubreye N birim su) veya
// "5 ml/litre" (litre basina dogrudan doz). Her iki format da
// pratikte "N litre su hazirla, icine X ml gubre ekle" anlamina
// gelir -- gubre hacmi ihmal edilebilir kucuk kabul edilir, bu
// bahcivanlikta yaygin kabul goren bir basitlestirmedir.

export type FertilizerDilutionFormat = "ratio" | "dosePerLiter";

export interface FertilizerDilutionInput {
  format: FertilizerDilutionFormat;
  ratioPart: number;
  dosePerLiterMl: number;
  totalWaterLiters: number;
}

export interface FertilizerDilutionResult {
  fertilizerNeededMl: number;
  totalWaterLiters: number;
}

export function calculateFertilizerDilution(
  input: FertilizerDilutionInput,
): FertilizerDilutionResult | null {
  const { format, ratioPart, dosePerLiterMl, totalWaterLiters } = input;

  if (!Number.isFinite(totalWaterLiters) || totalWaterLiters <= 0) {
    return null;
  }

  if (format === "ratio") {
    if (!Number.isFinite(ratioPart) || ratioPart <= 0) return null;
    const fertilizerNeededMl = (totalWaterLiters * 1000) / ratioPart;
    return { fertilizerNeededMl, totalWaterLiters };
  }

  if (!Number.isFinite(dosePerLiterMl) || dosePerLiterMl <= 0) return null;
  const fertilizerNeededMl = dosePerLiterMl * totalWaterLiters;
  return { fertilizerNeededMl, totalWaterLiters };
}
