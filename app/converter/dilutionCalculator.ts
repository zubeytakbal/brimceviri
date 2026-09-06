// Seyreltme hesaplama -- stok cozeltiden seyreltilmis cozelti hazirlama
// bagintisi: C1*V1 = C2*V2 (derisim korunumu).

export type DilutionTarget = "c1" | "v1" | "c2" | "v2";

export type DilutionInput = {
  target: DilutionTarget;
  c1: number;
  v1: number;
  c2: number;
  v2: number;
};

export type DilutionResult = {
  c1: number;
  v1: number;
  c2: number;
  v2: number;
};

export function calculateDilution(input: DilutionInput): DilutionResult | null {
  const { target, c1, v1, c2, v2 } = input;

  if (target === "c1") {
    if (!Number.isFinite(v1) || v1 <= 0) {
      return null;
    }

    if (!Number.isFinite(c2) || c2 < 0) {
      return null;
    }

    if (!Number.isFinite(v2) || v2 < 0) {
      return null;
    }

    return { c1: (c2 * v2) / v1, v1, c2, v2 };
  }

  if (target === "v1") {
    if (!Number.isFinite(c1) || c1 <= 0) {
      return null;
    }

    if (!Number.isFinite(c2) || c2 < 0) {
      return null;
    }

    if (!Number.isFinite(v2) || v2 < 0) {
      return null;
    }

    return { c1, v1: (c2 * v2) / c1, c2, v2 };
  }

  if (target === "c2") {
    if (!Number.isFinite(c1) || c1 < 0) {
      return null;
    }

    if (!Number.isFinite(v1) || v1 < 0) {
      return null;
    }

    if (!Number.isFinite(v2) || v2 <= 0) {
      return null;
    }

    return { c1, v1, c2: (c1 * v1) / v2, v2 };
  }

  if (!Number.isFinite(c1) || c1 < 0) {
    return null;
  }

  if (!Number.isFinite(v1) || v1 < 0) {
    return null;
  }

  if (!Number.isFinite(c2) || c2 <= 0) {
    return null;
  }

  return { c1, v1, c2, v2: (c1 * v1) / c2 };
}
