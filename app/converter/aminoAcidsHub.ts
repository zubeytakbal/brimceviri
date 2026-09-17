import { aminoAcidsDatabase, type AminoAcidEntry } from "./aminoAcidsDatabase";
import {
  parseMolecularFormula,
  type FormulaComposition,
} from "./molecularFormulaParser";

export interface AminoAcidProfile extends AminoAcidEntry {
  molarMass: number;
  composition: FormulaComposition[];
}

function buildProfile(aminoAcid: AminoAcidEntry): AminoAcidProfile | null {
  const parsed = parseMolecularFormula(aminoAcid.formula);
  if (!parsed) return null;

  return {
    ...aminoAcid,
    molarMass: parsed.molarMass,
    composition: parsed.composition,
  };
}

export function getAllAminoAcidProfiles(): AminoAcidProfile[] {
  return aminoAcidsDatabase
    .map((aminoAcid) => buildProfile(aminoAcid))
    .filter((profile): profile is AminoAcidProfile => profile !== null);
}

export function findAminoAcidProfileById(
  id: string,
): AminoAcidProfile | undefined {
  const aminoAcid = aminoAcidsDatabase.find((item) => item.id === id);
  if (!aminoAcid) return undefined;

  const profile = buildProfile(aminoAcid);
  return profile ?? undefined;
}

export function findAminoAcidProfileByThreeLetterCode(
  code: string,
): AminoAcidProfile | undefined {
  const normalized = code.trim().toLowerCase();
  const aminoAcid = aminoAcidsDatabase.find(
    (item) => item.threeLetterCode.toLowerCase() === normalized,
  );
  if (!aminoAcid) return undefined;

  return buildProfile(aminoAcid) ?? undefined;
}
