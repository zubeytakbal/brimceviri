// Stokiyometri hesaplama -- dengelenmis bir kimyasal denklemdeki mol
// oranini kullanarak bilinen bir maddenin miktarindan (kutle veya mol)
// hedef maddenin miktarini hesaplar. n(A)/katsayiA = n(B)/katsayiB.

export type StoichiometryInputMode = "mass" | "moles";

export type StoichiometryInput = {
  inputMode: StoichiometryInputMode;
  knownMassGrams: number;
  knownMoles: number;
  knownMolarMass: number;
  knownCoefficient: number;
  targetMolarMass: number;
  targetCoefficient: number;
};

export type StoichiometryResult = {
  knownMoles: number;
  targetMoles: number;
  targetMassGrams: number;
};

export function calculateStoichiometry(
  input: StoichiometryInput
): StoichiometryResult | null {
  const {
    inputMode,
    knownMassGrams,
    knownMoles,
    knownMolarMass,
    knownCoefficient,
    targetMolarMass,
    targetCoefficient,
  } = input;

  if (!Number.isFinite(knownCoefficient) || knownCoefficient <= 0) {
    return null;
  }

  if (!Number.isFinite(targetCoefficient) || targetCoefficient <= 0) {
    return null;
  }

  if (!Number.isFinite(targetMolarMass) || targetMolarMass <= 0) {
    return null;
  }

  let resolvedKnownMoles: number;

  if (inputMode === "mass") {
    if (!Number.isFinite(knownMolarMass) || knownMolarMass <= 0) {
      return null;
    }

    if (!Number.isFinite(knownMassGrams) || knownMassGrams < 0) {
      return null;
    }

    resolvedKnownMoles = knownMassGrams / knownMolarMass;
  } else {
    if (!Number.isFinite(knownMoles) || knownMoles < 0) {
      return null;
    }

    resolvedKnownMoles = knownMoles;
  }

  const targetMoles =
    resolvedKnownMoles * (targetCoefficient / knownCoefficient);

  return {
    knownMoles: resolvedKnownMoles,
    targetMoles,
    targetMassGrams: targetMoles * targetMolarMass,
  };
}
