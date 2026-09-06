export type ElementThermalRow = {
  id: string;
  label: string;
  meltingPointC: number;
  boilingPointC: number;
};

// Standart basincta (101.325 kPa) erime/kaynama noktalari (Celsius).
// Wikipedia'nin "Melting/Boiling points of the elements" veri
// sayfalarindan alinmistir (CRC Handbook of Chemistry and Physics
// kaynakli). Karbon, normal basincta erimek yerine subulme
// (sublimasyon) gosterdigi icin bu tabloya dahil edilmemistir.
export const elementThermalTable: ElementThermalRow[] = [
  { id: "hydrogen", label: "Hidrojen (H)", meltingPointC: -259.16, boilingPointC: -252.879 },
  { id: "helium", label: "Helyum (He)", meltingPointC: -273.15, boilingPointC: -268.928 },
  { id: "nitrogen", label: "Azot (N)", meltingPointC: -210.0, boilingPointC: -195.795 },
  { id: "oxygen", label: "Oksijen (O)", meltingPointC: -218.79, boilingPointC: -182.962 },
  { id: "fluorine", label: "Flor (F)", meltingPointC: -219.67, boilingPointC: -188.11 },
  { id: "neon", label: "Neon (Ne)", meltingPointC: -248.59, boilingPointC: -246.046 },
  { id: "sodium", label: "Sodyum (Na)", meltingPointC: 97.794, boilingPointC: 882.94 },
  { id: "aluminum", label: "Alüminyum (Al)", meltingPointC: 660.32, boilingPointC: 2519 },
  { id: "silicon", label: "Silisyum (Si)", meltingPointC: 1414, boilingPointC: 3265 },
  { id: "sulfur", label: "Kükürt (S)", meltingPointC: 115.21, boilingPointC: 444.6 },
  { id: "chlorine", label: "Klor (Cl)", meltingPointC: -101.5, boilingPointC: -34.04 },
  { id: "argon", label: "Argon (Ar)", meltingPointC: -189.34, boilingPointC: -185.848 },
  { id: "potassium", label: "Potasyum (K)", meltingPointC: 63.5, boilingPointC: 759 },
  { id: "calcium", label: "Kalsiyum (Ca)", meltingPointC: 842, boilingPointC: 1484 },
  { id: "iron", label: "Demir (Fe)", meltingPointC: 1538, boilingPointC: 2861 },
  { id: "nickel", label: "Nikel (Ni)", meltingPointC: 1455, boilingPointC: 2913 },
  { id: "copper", label: "Bakır (Cu)", meltingPointC: 1084.62, boilingPointC: 2562 },
  { id: "zinc", label: "Çinko (Zn)", meltingPointC: 419.53, boilingPointC: 907 },
  { id: "silver", label: "Gümüş (Ag)", meltingPointC: 961.78, boilingPointC: 2162 },
  { id: "tin", label: "Kalay (Sn)", meltingPointC: 231.93, boilingPointC: 2602 },
  { id: "iodine", label: "İyot (I)", meltingPointC: 113.7, boilingPointC: 184.4 },
  { id: "tungsten", label: "Tungsten (W)", meltingPointC: 3422, boilingPointC: 5555 },
  { id: "platinum", label: "Platin (Pt)", meltingPointC: 1768.3, boilingPointC: 3825 },
  { id: "gold", label: "Altın (Au)", meltingPointC: 1064.18, boilingPointC: 2856 },
  { id: "mercury", label: "Cıva (Hg)", meltingPointC: -38.83, boilingPointC: 356.73 },
  { id: "lead", label: "Kurşun (Pb)", meltingPointC: 327.46, boilingPointC: 1749 },
  { id: "uranium", label: "Uranyum (U)", meltingPointC: 1132.2, boilingPointC: 4131 },
];

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15;
}
