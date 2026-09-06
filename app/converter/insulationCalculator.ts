// Yalitim (mantolama) malzemesi hesaplama -- kaplanacak dis cephe
// alanindan, secilen levha ebadina gore (kesim firesi dahil) gereken
// yalitim levhasi adedini hesaplar. Fayans hesaplamayla ayni mantik,
// farkli tipik ebat ve fire varsayimlarina sahip.

export type InsulationCalculatorInput = {
  area: number;
  boardWidthCm: number;
  boardHeightCm: number;
  wastePercent: number;
};

export type InsulationCalculatorResult = {
  boardAreaM2: number;
  requiredAreaWithWaste: number;
  requiredBoardCount: number;
};

export function calculateInsulationNeeds(
  input: InsulationCalculatorInput
): InsulationCalculatorResult | null {
  const { area, boardWidthCm, boardHeightCm, wastePercent } = input;

  const dimensionsValid = [area, boardWidthCm, boardHeightCm].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const wasteValid = Number.isFinite(wastePercent) && wastePercent >= 0;

  if (!dimensionsValid || !wasteValid) {
    return null;
  }

  const boardAreaM2 = (boardWidthCm / 100) * (boardHeightCm / 100);
  const requiredAreaWithWaste = area * (1 + wastePercent / 100);
  const requiredBoardCount = Math.ceil(
    requiredAreaWithWaste / boardAreaM2
  );

  return { boardAreaM2, requiredAreaWithWaste, requiredBoardCount };
}
