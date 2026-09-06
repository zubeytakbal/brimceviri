export type PythagoreanTarget = "kenar-a" | "kenar-b" | "hipotenus";

export interface PythagoreanInput {
  target: PythagoreanTarget;
  a: number;
  b: number;
  c: number;
}

export interface PythagoreanResult {
  target: PythagoreanTarget;
  a: number;
  b: number;
  c: number;
}

/** c² = a² + b² (Pisagor bağıntısı) -- verilen ikisinden ucuncusunu cozer. */
export function calculatePythagorean(input: PythagoreanInput): PythagoreanResult | null {
  const { target, a, b, c } = input;

  if (target === "hipotenus") {
    if (!(a > 0) || !(b > 0)) {
      return null;
    }
    return { target, a, b, c: Math.sqrt(a * a + b * b) };
  }

  if (target === "kenar-a") {
    if (!(c > 0) || !(b > 0) || c <= b) {
      return null;
    }
    return { target, a: Math.sqrt(c * c - b * b), b, c };
  }

  if (!(c > 0) || !(a > 0) || c <= a) {
    return null;
  }
  return { target, a, b: Math.sqrt(c * c - a * a), c };
}
