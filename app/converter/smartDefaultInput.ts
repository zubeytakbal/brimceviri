import { convert } from "./convert";

// 1 kaynak birim hedefte 0,01'den kucuk kaliyorsa (1 m² = 0,001 donum gibi)
// cevirici okunur bir sonucla acilsin: 1000 m² = 1 donum. Sicaklik gibi
// dogrusal olmayan donusumlerde ve normal oranlarda 1 kalir.
export function smartDefaultInput(
  category: string,
  fromUnit: string,
  toUnit: string
) {
  if (category === "sicaklik") {
    return 1;
  }

  const factor = Math.abs(convert(category, 1, fromUnit, toUnit));

  if (!Number.isFinite(factor) || factor === 0 || factor >= 0.01) {
    return 1;
  }

  const exponent = Math.ceil(-Math.log10(factor) - 1e-9);

  return exponent > 9 ? 1 : 10 ** exponent;
}
