// Sik kullanilan, dogrulanmis kimyasal tepkimeler -- stokiyometri
// hesaplayicisinda "Hazir Tepkime Sec" listesi icin. Her tepkime elle
// dengelenmis ve molar kutleleri hesaplanmistir (bkz. proje notlari).

export type PresetReactionCompound = {
  formula: string;
  coefficient: number;
  molarMass: number;
};

export type PresetReaction = {
  id: string;
  label: string;
  reactants: PresetReactionCompound[];
  products: PresetReactionCompound[];
};

export const presetReactions: PresetReaction[] = [
  {
    id: "water-synthesis",
    label: "Su sentezi: 2H₂ + O₂ → 2H₂O",
    reactants: [
      { formula: "H2", coefficient: 2, molarMass: 2.016 },
      { formula: "O2", coefficient: 1, molarMass: 32.0 },
    ],
    products: [{ formula: "H2O", coefficient: 2, molarMass: 18.02 }],
  },
  {
    id: "methane-combustion",
    label: "Metan yanması: CH₄ + 2O₂ → CO₂ + 2H₂O",
    reactants: [
      { formula: "CH4", coefficient: 1, molarMass: 16.04 },
      { formula: "O2", coefficient: 2, molarMass: 32.0 },
    ],
    products: [
      { formula: "CO2", coefficient: 1, molarMass: 44.01 },
      { formula: "H2O", coefficient: 2, molarMass: 18.02 },
    ],
  },
  {
    id: "ammonia-synthesis",
    label: "Amonyak sentezi (Haber-Bosch): N₂ + 3H₂ → 2NH₃",
    reactants: [
      { formula: "N2", coefficient: 1, molarMass: 28.01 },
      { formula: "H2", coefficient: 3, molarMass: 2.016 },
    ],
    products: [{ formula: "NH3", coefficient: 2, molarMass: 17.03 }],
  },
  {
    id: "calcium-carbonate-decomposition",
    label: "Kalsiyum karbonat ayrışması: CaCO₃ → CaO + CO₂",
    reactants: [{ formula: "CaCO3", coefficient: 1, molarMass: 100.09 }],
    products: [
      { formula: "CaO", coefficient: 1, molarMass: 56.08 },
      { formula: "CO2", coefficient: 1, molarMass: 44.01 },
    ],
  },
  {
    id: "hydrogen-peroxide-decomposition",
    label: "Hidrojen peroksit ayrışması: 2H₂O₂ → 2H₂O + O₂",
    reactants: [{ formula: "H2O2", coefficient: 2, molarMass: 34.02 }],
    products: [
      { formula: "H2O", coefficient: 2, molarMass: 18.02 },
      { formula: "O2", coefficient: 1, molarMass: 32.0 },
    ],
  },
  {
    id: "neutralization-hcl-naoh",
    label: "Nötrleşme: HCl + NaOH → NaCl + H₂O",
    reactants: [
      { formula: "HCl", coefficient: 1, molarMass: 36.46 },
      { formula: "NaOH", coefficient: 1, molarMass: 40.0 },
    ],
    products: [
      { formula: "NaCl", coefficient: 1, molarMass: 58.44 },
      { formula: "H2O", coefficient: 1, molarMass: 18.02 },
    ],
  },
  {
    id: "sodium-water",
    label: "Sodyum-su tepkimesi: 2Na + 2H₂O → 2NaOH + H₂",
    reactants: [
      { formula: "Na", coefficient: 2, molarMass: 22.99 },
      { formula: "H2O", coefficient: 2, molarMass: 18.02 },
    ],
    products: [
      { formula: "NaOH", coefficient: 2, molarMass: 40.0 },
      { formula: "H2", coefficient: 1, molarMass: 2.016 },
    ],
  },
  {
    id: "thermite",
    label: "Termit tepkimesi: Fe₂O₃ + 2Al → Al₂O₃ + 2Fe",
    reactants: [
      { formula: "Fe2O3", coefficient: 1, molarMass: 159.69 },
      { formula: "Al", coefficient: 2, molarMass: 26.98 },
    ],
    products: [
      { formula: "Al2O3", coefficient: 1, molarMass: 101.96 },
      { formula: "Fe", coefficient: 2, molarMass: 55.85 },
    ],
  },
  {
    id: "magnesium-combustion",
    label: "Magnezyum yanması: 2Mg + O₂ → 2MgO",
    reactants: [
      { formula: "Mg", coefficient: 2, molarMass: 24.31 },
      { formula: "O2", coefficient: 1, molarMass: 32.0 },
    ],
    products: [{ formula: "MgO", coefficient: 2, molarMass: 40.3 }],
  },
  {
    id: "lime-slaking",
    label: "Kireç söndürme: CaO + H₂O → Ca(OH)₂",
    reactants: [
      { formula: "CaO", coefficient: 1, molarMass: 56.08 },
      { formula: "H2O", coefficient: 1, molarMass: 18.02 },
    ],
    products: [{ formula: "Ca(OH)2", coefficient: 1, molarMass: 74.09 }],
  },
  {
    id: "propane-combustion",
    label: "Propan yanması: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    reactants: [
      { formula: "C3H8", coefficient: 1, molarMass: 44.1 },
      { formula: "O2", coefficient: 5, molarMass: 32.0 },
    ],
    products: [
      { formula: "CO2", coefficient: 3, molarMass: 44.01 },
      { formula: "H2O", coefficient: 4, molarMass: 18.02 },
    ],
  },
  {
    id: "iron-rusting",
    label: "Demir paslanması: 4Fe + 3O₂ → 2Fe₂O₃",
    reactants: [
      { formula: "Fe", coefficient: 4, molarMass: 55.85 },
      { formula: "O2", coefficient: 3, molarMass: 32.0 },
    ],
    products: [{ formula: "Fe2O3", coefficient: 2, molarMass: 159.69 }],
  },
  {
    id: "sulfuric-acid-naoh",
    label: "Nötrleşme: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    reactants: [
      { formula: "H2SO4", coefficient: 1, molarMass: 98.08 },
      { formula: "NaOH", coefficient: 2, molarMass: 40.0 },
    ],
    products: [
      { formula: "Na2SO4", coefficient: 1, molarMass: 142.04 },
      { formula: "H2O", coefficient: 2, molarMass: 18.02 },
    ],
  },
  {
    id: "zinc-hcl",
    label: "Çinko-hidroklorik asit: Zn + 2HCl → ZnCl₂ + H₂",
    reactants: [
      { formula: "Zn", coefficient: 1, molarMass: 65.38 },
      { formula: "HCl", coefficient: 2, molarMass: 36.46 },
    ],
    products: [
      { formula: "ZnCl2", coefficient: 1, molarMass: 136.28 },
      { formula: "H2", coefficient: 1, molarMass: 2.016 },
    ],
  },
];
