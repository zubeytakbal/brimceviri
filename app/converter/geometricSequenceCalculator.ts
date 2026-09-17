export interface GeometricSequenceResult {
  firstTerm: number;
  commonRatio: number;
  termNumber: number;
  nthTerm: number;
  sumOfTerms: number;
  terms: number[];
}

const MAX_TERM_NUMBER = 1000;

export function calculateGeometricSequence(
  firstTerm: number,
  commonRatio: number,
  termNumber: number,
): GeometricSequenceResult | null {
  if (
    !Number.isFinite(firstTerm) ||
    !Number.isFinite(commonRatio) ||
    commonRatio === 0 ||
    !Number.isInteger(termNumber) ||
    termNumber < 1 ||
    termNumber > MAX_TERM_NUMBER
  ) {
    return null;
  }

  const nthTerm = firstTerm * Math.pow(commonRatio, termNumber - 1);

  const sumOfTerms =
    commonRatio === 1
      ? firstTerm * termNumber
      : (firstTerm * (Math.pow(commonRatio, termNumber) - 1)) / (commonRatio - 1);

  if (!Number.isFinite(nthTerm) || !Number.isFinite(sumOfTerms)) {
    return null;
  }

  const previewCount = Math.min(termNumber, 10);
  const terms = Array.from(
    { length: previewCount },
    (_, index) => firstTerm * Math.pow(commonRatio, index),
  );

  return {
    firstTerm,
    commonRatio,
    termNumber,
    nthTerm,
    sumOfTerms,
    terms,
  };
}
