// Piksel / cm (veya inc) / DPI hesaplama -- baski ve dijital tasarimda
// fiziksel boyut, piksel sayisi ve cozunurluk (DPI/PPI) arasindaki
// iliskiyi hesaplar. Formul: piksel = (inc) x DPI, inc = cm / 2,54.
// Kullanici uc degerden ikisini girer, ucuncusu hesaplanir.

export type PixelSolveFor = "pixels" | "size" | "dpi";
export type SizeUnit = "cm" | "inch";

export type PixelCalculatorInput = {
  solveFor: PixelSolveFor;
  pixels: number;
  sizeValue: number;
  sizeUnit: SizeUnit;
  dpi: number;
};

export type PixelCalculatorResult = {
  pixels: number;
  sizeCm: number;
  sizeInch: number;
  dpi: number;
};

function toInches(value: number, unit: SizeUnit): number {
  return unit === "cm" ? value / 2.54 : value;
}

function buildResult(
  pixels: number,
  sizeInch: number,
  dpi: number
): PixelCalculatorResult {
  return {
    pixels,
    sizeCm: sizeInch * 2.54,
    sizeInch,
    dpi,
  };
}

export function calculatePixelSize(
  input: PixelCalculatorInput
): PixelCalculatorResult | null {
  const { solveFor, pixels, sizeValue, sizeUnit, dpi } = input;

  if (solveFor === "pixels") {
    const sizeInch = toInches(sizeValue, sizeUnit);
    if (!(sizeInch > 0) || !(dpi > 0)) {
      return null;
    }
    return buildResult(sizeInch * dpi, sizeInch, dpi);
  }

  if (solveFor === "size") {
    if (!(pixels > 0) || !(dpi > 0)) {
      return null;
    }
    const sizeInch = pixels / dpi;
    return buildResult(pixels, sizeInch, dpi);
  }

  if (solveFor === "dpi") {
    const sizeInch = toInches(sizeValue, sizeUnit);
    if (!(pixels > 0) || !(sizeInch > 0)) {
      return null;
    }
    return buildResult(pixels, sizeInch, pixels / sizeInch);
  }

  return null;
}
