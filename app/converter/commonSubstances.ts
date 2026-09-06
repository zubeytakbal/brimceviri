// Mol/molarite hesaplayicilarinda kullanilan ortak madde/element on
// ayarlari -- hem sik kullanilan bilesikleri hem de periyodik tablodaki
// 118 elementi molar kutleleriyle birlikte listeler.

import { periodicTable } from "./periodicTableData";

export const commonCompounds = [
  { id: "h2o", label: "Su (H₂O)", molarMass: "18.02" },
  { id: "co2", label: "Karbondioksit (CO₂)", molarMass: "44.01" },
  { id: "nacl", label: "Sodyum klorür (NaCl)", molarMass: "58.44" },
  { id: "o2", label: "Oksijen gazı (O₂)", molarMass: "32.00" },
  { id: "naoh", label: "Sodyum hidroksit (NaOH)", molarMass: "40.00" },
  { id: "hcl", label: "Hidroklorik asit (HCl)", molarMass: "36.46" },
  { id: "c6h12o6", label: "Glikoz (C₆H₁₂O₆)", molarMass: "180.16" },
];

export const elementSubstances = periodicTable
  .slice()
  .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"))
  .map((element) => ({
    id: `element-${element.atomicNumber}`,
    label: `${element.nameTr} (${element.symbol})`,
    molarMass: element.atomicMass.toString(),
  }));

export const commonSubstances = [
  { id: "custom", label: "Özel değer", molarMass: "" },
  ...commonCompounds,
  ...elementSubstances,
];
