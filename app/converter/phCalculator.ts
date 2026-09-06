// pH hesaplama -- pH, pOH, [H+] ve [OH-] arasindaki iliskilere dayanir.
// pH = -log10[H+], pOH = -log10[OH-], pH + pOH = 14 (25 degrede, Kw = 1e-14).

export type PhInputMode = "ph" | "hConcentration" | "poh" | "ohConcentration";

export type PhCalculationInput = {
  mode: PhInputMode;
  value: number;
};

export type PhClassification = "asidik" | "notr" | "bazik";

export type PhCalculationResult = {
  ph: number;
  poh: number;
  hConcentration: number;
  ohConcentration: number;
  classification: PhClassification;
};

export function calculatePh(
  input: PhCalculationInput
): PhCalculationResult | null {
  const { mode, value } = input;

  if (!Number.isFinite(value)) {
    return null;
  }

  let ph: number;
  let poh: number;
  let hConcentration: number;
  let ohConcentration: number;

  if (mode === "ph") {
    ph = value;
    hConcentration = Math.pow(10, -ph);
    poh = 14 - ph;
    ohConcentration = Math.pow(10, -poh);
  } else if (mode === "hConcentration") {
    if (value <= 0) {
      return null;
    }

    hConcentration = value;
    ph = -Math.log10(hConcentration);
    poh = 14 - ph;
    ohConcentration = Math.pow(10, -poh);
  } else if (mode === "poh") {
    poh = value;
    ohConcentration = Math.pow(10, -poh);
    ph = 14 - poh;
    hConcentration = Math.pow(10, -ph);
  } else {
    if (value <= 0) {
      return null;
    }

    ohConcentration = value;
    poh = -Math.log10(ohConcentration);
    ph = 14 - poh;
    hConcentration = Math.pow(10, -ph);
  }

  const classification: PhClassification =
    ph < 7 ? "asidik" : ph > 7 ? "bazik" : "notr";

  return { ph, poh, hConcentration, ohConcentration, classification };
}
