const MAX_N = 1000;

function factorialBigInt(n: number): bigint {
  let value = BigInt(1);
  for (let i = 2; i <= n; i += 1) {
    value *= BigInt(i);
  }
  return value;
}

export interface PermutationResult {
  n: number;
  r: number;
  value: bigint;
}

export type PermutationOutcome =
  | { success: true; result: PermutationResult }
  | { success: false; message: string };

/** nPr = n! / (n-r)! -- r < n arasindaki carpim zinciri olarak dogrudan
 * hesaplanir, n! gibi gereksiz yere devasa bir ara deger uretilmez. */
export function calculatePermutation(n: number, r: number): PermutationOutcome {
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    return { success: false, message: "n ve r tam sayı olmalı." };
  }
  if (n < 0 || r < 0) {
    return { success: false, message: "n ve r negatif olmayan bir tam sayı olmalı." };
  }
  if (r > n) {
    return { success: false, message: "r, n'den büyük olamaz." };
  }
  if (n > MAX_N) {
    return { success: false, message: `n en fazla ${MAX_N} olabilir.` };
  }

  let value = BigInt(1);
  for (let i = n; i > n - r; i -= 1) {
    value *= BigInt(i);
  }

  return { success: true, result: { n, r, value } };
}

export interface CombinationResult {
  n: number;
  r: number;
  value: bigint;
}

export type CombinationOutcome =
  | { success: true; result: CombinationResult }
  | { success: false; message: string };

/** nCr = n! / (r!(n-r)!) -- r yerine min(r, n-r) kullanilarak hesaplanir,
 * bu ikisi matematiksel olarak esdegerdir ve daha az carpim gerektirir. */
export function calculateCombination(n: number, r: number): CombinationOutcome {
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    return { success: false, message: "n ve r tam sayı olmalı." };
  }
  if (n < 0 || r < 0) {
    return { success: false, message: "n ve r negatif olmayan bir tam sayı olmalı." };
  }
  if (r > n) {
    return { success: false, message: "r, n'den büyük olamaz." };
  }
  if (n > MAX_N) {
    return { success: false, message: `n en fazla ${MAX_N} olabilir.` };
  }

  const effectiveR = Math.min(r, n - r);
  let numerator = BigInt(1);
  for (let i = 0; i < effectiveR; i += 1) {
    numerator *= BigInt(n - i);
  }
  const value = numerator / factorialBigInt(effectiveR);

  return { success: true, result: { n, r, value } };
}

export interface ProbabilityResult {
  favorable: number;
  total: number;
  probability: number;
  percentage: number;
}

export type ProbabilityOutcome =
  | { success: true; result: ProbabilityResult }
  | { success: false; message: string };

export function calculateProbability(favorable: number, total: number): ProbabilityOutcome {
  if (!Number.isFinite(favorable) || !Number.isFinite(total)) {
    return { success: false, message: "Geçerli sayılar gir." };
  }
  if (total <= 0) {
    return { success: false, message: "Toplam durum sayısı 0'dan büyük olmalı." };
  }
  if (favorable < 0) {
    return { success: false, message: "İstenen durum sayısı negatif olamaz." };
  }
  if (favorable > total) {
    return { success: false, message: "İstenen durum sayısı, toplam durum sayısından büyük olamaz." };
  }

  const probability = favorable / total;
  return {
    success: true,
    result: { favorable, total, probability, percentage: probability * 100 },
  };
}
