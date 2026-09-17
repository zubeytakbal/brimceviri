import { findAminoAcidProfileByThreeLetterCode } from "./aminoAcidsHub";

const WATER_MOLAR_MASS = 18.015;

export type PeptideResidue = {
  code: string;
  nameTr: string;
  molarMass: number;
};

export type PeptideCalculationResult = {
  residues: PeptideResidue[];
  sumOfFreeAminoAcids: number;
  peptideBondCount: number;
  waterLost: number;
  peptideMolarMass: number;
};

export type PeptideCalculationError = {
  error: "empty" | "unknown-code";
  unknownCode?: string;
};

// Peptit bagi olusurken her bag basina 1 su molekulu (18.015 g/mol)
// kaybedilir (dehidrasyon/kondansasyon reaksiyonu) -- bu yuzden peptit
// molar kutlesi, serbest amino asitlerin toplamindan kucuktur.
export function calculatePeptideMolarMass(
  codes: string[],
): PeptideCalculationResult | PeptideCalculationError {
  const trimmedCodes = codes.map((code) => code.trim()).filter(Boolean);

  if (trimmedCodes.length === 0) {
    return { error: "empty" };
  }

  const residues: PeptideResidue[] = [];

  for (const code of trimmedCodes) {
    const profile = findAminoAcidProfileByThreeLetterCode(code);
    if (!profile) {
      return { error: "unknown-code", unknownCode: code };
    }
    residues.push({
      code: profile.threeLetterCode,
      nameTr: profile.nameTr,
      molarMass: profile.molarMass,
    });
  }

  const sumOfFreeAminoAcids = residues.reduce((sum, r) => sum + r.molarMass, 0);
  const peptideBondCount = residues.length - 1;
  const waterLost = peptideBondCount * WATER_MOLAR_MASS;
  const peptideMolarMass = sumOfFreeAminoAcids - waterLost;

  return {
    residues,
    sumOfFreeAminoAcids,
    peptideBondCount,
    waterLost,
    peptideMolarMass,
  };
}

export function isPeptideCalculationError(
  result: PeptideCalculationResult | PeptideCalculationError,
): result is PeptideCalculationError {
  return "error" in result;
}
