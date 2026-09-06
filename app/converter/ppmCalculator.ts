// Ppm (milyonda parca) hesaplama -- kutlece yuzdenin cok kucuk
// derisimler icin olceklendirilmis hali. ppm = (cozunen / cozelti) x 1e6.

export type PpmTarget = "ppm" | "cozunen" | "cozucu";

export type PpmCalculationInput = {
  target: PpmTarget;
  ppm: number;
  cozunenKutlesi: number;
  cozucuKutlesi: number;
};

export type PpmCalculationResult = {
  ppm: number;
  cozunenKutlesi: number;
  cozucuKutlesi: number;
  cozeltiKutlesi: number;
};

export function calculatePpm(
  input: PpmCalculationInput
): PpmCalculationResult | null {
  const { target, ppm, cozunenKutlesi, cozucuKutlesi } = input;

  if (target === "ppm") {
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
      ppm: (cozunenKutlesi / cozeltiKutlesi) * 1e6,
      cozunenKutlesi,
      cozucuKutlesi,
      cozeltiKutlesi,
    };
  }

  if (target === "cozunen") {
    if (!Number.isFinite(ppm) || ppm < 0 || ppm >= 1e6) {
      return null;
    }

    if (!Number.isFinite(cozucuKutlesi) || cozucuKutlesi < 0) {
      return null;
    }

    const cozunen = (ppm * cozucuKutlesi) / (1e6 - ppm);

    return {
      ppm,
      cozunenKutlesi: cozunen,
      cozucuKutlesi,
      cozeltiKutlesi: cozunen + cozucuKutlesi,
    };
  }

  if (!Number.isFinite(ppm) || ppm <= 0 || ppm > 1e6) {
    return null;
  }

  if (!Number.isFinite(cozunenKutlesi) || cozunenKutlesi < 0) {
    return null;
  }

  const cozucu = (cozunenKutlesi * (1e6 - ppm)) / ppm;

  return {
    ppm,
    cozunenKutlesi,
    cozucuKutlesi: cozucu,
    cozeltiKutlesi: cozunenKutlesi + cozucu,
  };
}
