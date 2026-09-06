// Isi/entalpi hesaplama -- kalorimetri temel bagintisi: q = m x c x deltaT.
// Sabit basincta q, entalpi degisimine (deltaH) esittir.

export type EnthalpyTarget = "isi" | "kutle" | "ozgulIsi" | "sicaklikDegisimi";

export type EnthalpyCalculationInput = {
  target: EnthalpyTarget;
  isiJoule: number;
  kutleGram: number;
  ozgulIsi: number;
  sicaklikDegisimi: number;
};

export type EnthalpyCalculationResult = {
  isiJoule: number;
  kutleGram: number;
  ozgulIsi: number;
  sicaklikDegisimi: number;
};

export function calculateEnthalpy(
  input: EnthalpyCalculationInput
): EnthalpyCalculationResult | null {
  const { target, isiJoule, kutleGram, ozgulIsi, sicaklikDegisimi } = input;

  if (target === "isi") {
    if (!Number.isFinite(kutleGram) || kutleGram <= 0) {
      return null;
    }

    if (!Number.isFinite(ozgulIsi) || ozgulIsi <= 0) {
      return null;
    }

    if (!Number.isFinite(sicaklikDegisimi)) {
      return null;
    }

    return {
      isiJoule: kutleGram * ozgulIsi * sicaklikDegisimi,
      kutleGram,
      ozgulIsi,
      sicaklikDegisimi,
    };
  }

  if (target === "kutle") {
    if (!Number.isFinite(isiJoule)) {
      return null;
    }

    if (!Number.isFinite(ozgulIsi) || ozgulIsi <= 0) {
      return null;
    }

    if (!Number.isFinite(sicaklikDegisimi) || sicaklikDegisimi === 0) {
      return null;
    }

    return {
      isiJoule,
      kutleGram: isiJoule / (ozgulIsi * sicaklikDegisimi),
      ozgulIsi,
      sicaklikDegisimi,
    };
  }

  if (target === "ozgulIsi") {
    if (!Number.isFinite(isiJoule)) {
      return null;
    }

    if (!Number.isFinite(kutleGram) || kutleGram <= 0) {
      return null;
    }

    if (!Number.isFinite(sicaklikDegisimi) || sicaklikDegisimi === 0) {
      return null;
    }

    return {
      isiJoule,
      kutleGram,
      ozgulIsi: isiJoule / (kutleGram * sicaklikDegisimi),
      sicaklikDegisimi,
    };
  }

  if (!Number.isFinite(isiJoule)) {
    return null;
  }

  if (!Number.isFinite(kutleGram) || kutleGram <= 0) {
    return null;
  }

  if (!Number.isFinite(ozgulIsi) || ozgulIsi <= 0) {
    return null;
  }

  return {
    isiJoule,
    kutleGram,
    ozgulIsi,
    sicaklikDegisimi: isiJoule / (kutleGram * ozgulIsi),
  };
}
