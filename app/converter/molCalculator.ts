// Mol hesaplama -- kutle, molar kutle, mol sayisi ve parcacik sayisi
// arasindaki iliskileri hesaplar. n = m / M formulune ve Avogadro
// sabitine (6.02214076 x 10^23) dayanir.

export const AVOGADRO_CONSTANT = 6.02214076e23;

export type MolTarget = "moles" | "mass";

export type MolCalculationInput = {
  target: MolTarget;
  massGrams: number;
  molarMass: number;
  moles: number;
};

export type MolCalculationResult = {
  moles: number;
  massGrams: number;
  molarMass: number;
  particleCount: number;
};

export function calculateMol(
  input: MolCalculationInput
): MolCalculationResult | null {
  const { target, molarMass } = input;

  if (!Number.isFinite(molarMass) || molarMass <= 0) {
    return null;
  }

  if (target === "moles") {
    if (!Number.isFinite(input.massGrams) || input.massGrams < 0) {
      return null;
    }

    const moles = input.massGrams / molarMass;

    return {
      moles,
      massGrams: input.massGrams,
      molarMass,
      particleCount: moles * AVOGADRO_CONSTANT,
    };
  }

  if (!Number.isFinite(input.moles) || input.moles < 0) {
    return null;
  }

  const massGrams = input.moles * molarMass;

  return {
    moles: input.moles,
    massGrams,
    molarMass,
    particleCount: input.moles * AVOGADRO_CONSTANT,
  };
}
