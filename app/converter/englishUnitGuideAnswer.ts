// Birim rehberi basligi icin kisa cevap: "1 MPa = 10 bar", "1 q = 100 kg".
// Kategori icin tanidik bir referans birim secilir; katsayi yuvarlak
// degilse (0.000277...) cevap uretilmez ve eski baslik kalir.
import { convert } from "./convert";
import { englishDisplaySymbol, formatEnglishShort, isRoundFactor } from "./englishUnitDisplay";

const referenceUnits: Record<string, string[]> = {
  uzunluk: ["m", "cm", "km", "mm", "nm", "µm"],
  alan: ["m²", "ha"],
  hacim: ["L", "mL", "m³"],
  kutle: ["kg", "g"],
  hiz: ["km/h", "m/s"],
  basinc: ["bar", "Pa", "kPa"],
  enerji: ["J", "kJ", "Wh"],
  guc: ["W", "kW"],
  zaman: ["s", "min"],
  frekans: ["Hz"],
  elektrik_yuk: ["C"],
  elektrik_direnc: ["Ω"],
  kapasitans: ["F", "µF"],
  enduktans: ["H"],
  debi_kutlesel: ["kg/s", "kg/h"],
  veri: ["B", "bit"],
  tork: ["N·m"],
  kuvvet: ["N"],
};

export function englishUnitGuideAnswer(
  category: string,
  unit: string,
  displaySymbol: string
) {
  for (const reference of referenceUnits[category] ?? []) {
    if (reference === unit) {
      continue;
    }

    const factor = convert(category, 1, unit, reference);

    if (!Number.isFinite(factor) || factor <= 0) {
      continue;
    }

    const formatted = formatEnglishShort(factor);

    if (isRoundFactor(formatted)) {
      return `1 ${displaySymbol} = ${formatted} ${englishDisplaySymbol(category, reference)}`;
    }
  }

  return null;
}
