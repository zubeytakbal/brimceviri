// Kutlece yuzde derisim hesaplama -- % = cozunen kutlesi / cozelti kutlesi x 100
// (cozelti kutlesi = cozunen + cozucu kutlesi).

export type MassPercentTarget = "yuzde" | "cozunen" | "cozucu";

export type MassPercentInput = {
  target: MassPercentTarget;
  yuzde: number;
  cozunenKutlesi: number;
  cozucuKutlesi: number;
};

export type MassPercentResult = {
  yuzde: number;
  cozunenKutlesi: number;
  cozucuKutlesi: number;
  cozeltiKutlesi: number;
};

export function calculateMassPercent(
  input: MassPercentInput
): MassPercentResult | null {
  const { target, yuzde, cozunenKutlesi, cozucuKutlesi } = input;

  if (target === "yuzde") {
    if (!Number.isFinite(cozunenKutlesi) || cozunenKutlesi < 0) {
      return null;
    }

    if (!Number.isFinite(cozucuKutlesi) || cozucuKutlesi < 0) {
      return null;
    }

    const cozeltiKutlesi = cozunenKutlesi + cozucuKutlesi;

    if (cozeltiKutlesi <= 0) {
      return null;
    }

    return {
      yuzde: (cozunenKutlesi / cozeltiKutlesi) * 100,
      cozunenKutlesi,
      cozucuKutlesi,
      cozeltiKutlesi,
    };
  }

  if (target === "cozunen") {
    if (!Number.isFinite(yuzde) || yuzde < 0 || yuzde >= 100) {
      return null;
    }

    if (!Number.isFinite(cozucuKutlesi) || cozucuKutlesi < 0) {
      return null;
    }

    const cozunen = (yuzde * cozucuKutlesi) / (100 - yuzde);

    return {
      yuzde,
      cozunenKutlesi: cozunen,
      cozucuKutlesi,
      cozeltiKutlesi: cozunen + cozucuKutlesi,
    };
  }

  if (!Number.isFinite(yuzde) || yuzde <= 0 || yuzde > 100) {
    return null;
  }

  if (!Number.isFinite(cozunenKutlesi) || cozunenKutlesi < 0) {
    return null;
  }

  const cozucu = (cozunenKutlesi * (100 - yuzde)) / yuzde;

  return {
    yuzde,
    cozunenKutlesi,
    cozucuKutlesi: cozucu,
    cozeltiKutlesi: cozunenKutlesi + cozucu,
  };
}
