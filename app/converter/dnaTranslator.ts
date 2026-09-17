import { findCodon, type CodonEntry } from "./codonTable";
import { aminoAcidsDatabase } from "./aminoAcidsDatabase";

function findOneLetterCode(aminoAcidId: string | null): string {
  if (!aminoAcidId) return "";
  return aminoAcidsDatabase.find((a) => a.id === aminoAcidId)?.oneLetterCode ?? "?";
}

export type TranslatedCodon = {
  position: number;
  codon: string;
  entry: CodonEntry;
};

export type TranslationResult = {
  normalizedSequence: string;
  wasDna: boolean;
  codons: TranslatedCodon[];
  proteinThreeLetter: string;
  proteinOneLetterCode: string;
  stoppedEarly: boolean;
  trailingBaseCount: number;
};

export type TranslationError = {
  error: "empty" | "invalid-characters" | "too-short";
  invalidCharacter?: string;
};

// Girilen diziyi normalize eder: bosluk/tire temizler, buyuk harfe cevirir,
// DNA (T iceren) ise RNA'ya (U) transkribe eder. Sadece A/U/G/C/T
// karakterlerine izin verir.
function normalizeSequence(raw: string): { sequence: string; wasDna: boolean } | null {
  const cleaned = raw.toUpperCase().replace(/[\s-]/g, "");
  if (!cleaned) return null;

  const hasT = cleaned.includes("T");
  const hasU = cleaned.includes("U");

  if (hasT && hasU) return null; // karisik/gecersiz: hem T hem U

  const validChars = hasT ? /^[ATGC]+$/ : /^[AUGC]+$/;
  if (!validChars.test(cleaned)) return null;

  const sequence = hasT ? cleaned.replace(/T/g, "U") : cleaned;
  return { sequence, wasDna: hasT };
}

// Verilen diziyi (baslangic noktasindan itibaren, verilen okuma cercevesiyle)
// kodon kodon amino asit dizisine cevirir. Bir "dur" kodonuna rastlarsa
// cevirimi orada sonlandirir (gercek protein sentezi mantigi).
export function translateSequence(raw: string): TranslationResult | TranslationError {
  const normalized = normalizeSequence(raw);
  if (!normalized) {
    if (!raw.trim()) return { error: "empty" };
    return { error: "invalid-characters" };
  }

  const { sequence, wasDna } = normalized;
  if (sequence.length < 3) {
    return { error: "too-short" };
  }

  const codons: TranslatedCodon[] = [];
  let stoppedEarly = false;
  let position = 0;

  while (position + 3 <= sequence.length) {
    const codonText = sequence.slice(position, position + 3);
    const entry = findCodon(codonText);
    if (!entry) break; // teorik olarak imkansiz (tum 64 kombinasyon tabloda var)

    codons.push({ position: position / 3 + 1, codon: codonText, entry });
    position += 3;

    if (entry.aminoAcidId === null) {
      stoppedEarly = true;
      break;
    }
  }

  const proteinThreeLetter = codons
    .filter((c) => c.entry.threeLetterCode !== null)
    .map((c) => c.entry.threeLetterCode)
    .join("-");

  const proteinOneLetterCode = codons
    .filter((c) => c.entry.aminoAcidId !== null)
    .map((c) => findOneLetterCode(c.entry.aminoAcidId))
    .join("");

  return {
    normalizedSequence: sequence,
    wasDna,
    codons,
    proteinThreeLetter,
    proteinOneLetterCode,
    stoppedEarly,
    trailingBaseCount: sequence.length - position,
  };
}

export function isTranslationError(
  result: TranslationResult | TranslationError,
): result is TranslationError {
  return "error" in result;
}
