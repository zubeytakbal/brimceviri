import {
  compoundsDatabase,
  type CompoundEntry,
} from "./compoundsDatabase";
import {
  parseMolecularFormula,
  type FormulaComposition,
} from "./molecularFormulaParser";

export interface CompoundProfile extends CompoundEntry {
  molarMass: number;
  composition: FormulaComposition[];
}

function buildProfile(compound: CompoundEntry): CompoundProfile | null {
  const parsed = parseMolecularFormula(compound.formula);
  if (!parsed) return null;

  return {
    ...compound,
    molarMass: parsed.molarMass,
    composition: parsed.composition,
  };
}

export function getAllCompoundProfiles(): CompoundProfile[] {
  return compoundsDatabase
    .map((compound) => buildProfile(compound))
    .filter((profile): profile is CompoundProfile => profile !== null);
}

export function findCompoundProfileById(
  id: string,
): CompoundProfile | undefined {
  const compound = compoundsDatabase.find((item) => item.id === id);
  if (!compound) return undefined;

  const profile = buildProfile(compound);
  return profile ?? undefined;
}

export interface SimilarCompound {
  id: string;
  nameTr: string;
  formula: string;
  molarMass: number;
}

// Molar kutlesi en yakin olan diger bilesikleri bulur -- log-oran
// farkina gore siralama (materialsHub.ts'deki ayni teknik).
export function findSimilarMolarMassCompounds(
  id: string,
  count = 5,
): SimilarCompound[] {
  const all = getAllCompoundProfiles();
  const target = all.find((compound) => compound.id === id);
  if (!target) return [];

  return all
    .filter((compound) => compound.id !== id)
    .map((compound) => ({
      ...compound,
      logDistance: Math.abs(
        Math.log(compound.molarMass / target.molarMass),
      ),
    }))
    .sort((a, b) => a.logDistance - b.logDistance)
    .slice(0, count)
    .map(({ id: compoundId, nameTr, formula, molarMass }) => ({
      id: compoundId,
      nameTr,
      formula,
      molarMass,
    }));
}
