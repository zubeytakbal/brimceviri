export type ProportionTarget = "a" | "b" | "c" | "d";

export interface ProportionInput {
  target: ProportionTarget;
  a: number;
  b: number;
  c: number;
  d: number;
}

export interface ProportionResult {
  a: number;
  b: number;
  c: number;
  d: number;
  target: ProportionTarget;
}

export function calculateProportion(
  input: ProportionInput
): ProportionResult | null {
  const { target, a, b, c, d } = input;

  const known = { a, b, c, d };
  const knownValues = Object.entries(known).filter(([key]) => key !== target);

  if (knownValues.some(([, value]) => !Number.isFinite(value))) {
    return null;
  }

  let resultA = a;
  let resultB = b;
  let resultC = c;
  let resultD = d;

  switch (target) {
    case "a":
      resultA = (b * c) / d;
      break;
    case "b":
      resultB = (a * d) / c;
      break;
    case "c":
      resultC = (a * d) / b;
      break;
    case "d":
      resultD = (b * c) / a;
      break;
  }

  if (
    ![resultA, resultB, resultC, resultD].every((value) =>
      Number.isFinite(value)
    )
  ) {
    return null;
  }

  return { a: resultA, b: resultB, c: resultC, d: resultD, target };
}
