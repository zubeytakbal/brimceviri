export type LogarithmTarget = "sonuc" | "sayi" | "taban";

export interface LogarithmInput {
  target: LogarithmTarget;
  taban: number;
  sayi: number;
  sonuc: number;
}

export interface LogarithmResult {
  target: LogarithmTarget;
  taban: number;
  sayi: number;
  sonuc: number;
}

export function calculateLogarithm(
  input: LogarithmInput
): LogarithmResult | null {
  const { target } = input;
  let { taban, sayi, sonuc } = input;

  switch (target) {
    case "sonuc":
      if (!(taban > 0) || taban === 1 || !(sayi > 0)) {
        return null;
      }
      sonuc = Math.log(sayi) / Math.log(taban);
      break;
    case "sayi":
      if (!(taban > 0) || taban === 1 || !Number.isFinite(sonuc)) {
        return null;
      }
      sayi = Math.pow(taban, sonuc);
      break;
    case "taban":
      if (!(sayi > 0) || sonuc === 0 || !Number.isFinite(sonuc)) {
        return null;
      }
      taban = Math.pow(sayi, 1 / sonuc);
      break;
  }

  if (
    ![taban, sayi, sonuc].every((value) => Number.isFinite(value)) ||
    taban <= 0 ||
    taban === 1 ||
    sayi <= 0
  ) {
    return null;
  }

  return { target, taban, sayi, sonuc };
}
