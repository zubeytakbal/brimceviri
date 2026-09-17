export interface ArithmeticSequenceResult {
  firstTerm: number;
  commonDifference: number;
  termNumber: number;
  nthTerm: number;
  sumOfTerms: number;
  terms: number[];
}

const MAX_TERM_NUMBER = 100000;

export function calculateArithmeticSequence(
  firstTerm: number,
  commonDifference: number,
  termNumber: number,
): ArithmeticSequenceResult | null {
  if (
    !Number.isFinite(firstTerm) ||
    !Number.isFinite(commonDifference) ||
    !Number.isInteger(termNumber) ||
    termNumber < 1 ||
    termNumber > MAX_TERM_NUMBER
  ) {
    return null;
  }

  const nthTerm = firstTerm + (termNumber - 1) * commonDifference;
  const sumOfTerms = (termNumber / 2) * (firstTerm + nthTerm);

  const previewCount = Math.min(termNumber, 10);
  const terms = Array.from(
    { length: previewCount },
    (_, index) => firstTerm + index * commonDifference,
  );

  return {
    firstTerm,
    commonDifference,
    termNumber,
    nthTerm,
    sumOfTerms,
    terms,
  };
}
