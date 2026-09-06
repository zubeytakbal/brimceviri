// Genel denklem stokiyometrisi -- dengelenmis bir kimyasal denklemdeki
// TUM bilesikler (reaktan + urun) arasindaki mol oranini kullanarak,
// bilinen tek bir bilesigin miktarindan digerlerinin hepsini ayni anda
// hesaplar. n(X)/katsayiX = n(bilinen)/katsayi_bilinen tum bilesikler
// icin gecerlidir.

export type EquationCompoundInput = {
  id: number;
  coefficient: number;
  molarMass: number;
};

export type EquationCompoundResult = {
  id: number;
  moles: number;
  massGrams: number;
};

export function calculateEquationStoichiometry(
  compounds: EquationCompoundInput[],
  knownId: number,
  knownMoles: number
): EquationCompoundResult[] | null {
  if (compounds.length === 0) {
    return null;
  }

  if (!Number.isFinite(knownMoles) || knownMoles < 0) {
    return null;
  }

  const known = compounds.find((compound) => compound.id === knownId);

  if (!known || !Number.isFinite(known.coefficient) || known.coefficient <= 0) {
    return null;
  }

  const results: EquationCompoundResult[] = [];

  for (const compound of compounds) {
    if (
      !Number.isFinite(compound.coefficient) ||
      compound.coefficient <= 0 ||
      !Number.isFinite(compound.molarMass) ||
      compound.molarMass <= 0
    ) {
      return null;
    }

    const moles = knownMoles * (compound.coefficient / known.coefficient);

    results.push({
      id: compound.id,
      moles,
      massGrams: moles * compound.molarMass,
    });
  }

  return results;
}
