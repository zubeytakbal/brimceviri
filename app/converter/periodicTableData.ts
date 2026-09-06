// Periyodik tablo -- 118 elementin temel verisi. Atom numarası, sembol,
// standart atom kütlesi (IUPAC) ve kategori bilgileri. Konum (row/col),
// gerçek periyodik tablo düzenine (18 sütun, lantanit/aktinit ayrı satır)
// birebir karşılık gelecek şekilde elle atanmıştır.

export type ElementCategory =
  | "alkali-metal"
  | "toprak-alkali-metal"
  | "gecis-metali"
  | "post-gecis-metali"
  | "yari-metal"
  | "ametal"
  | "halojen"
  | "soy-gaz"
  | "lantanit"
  | "aktinit";

export type PeriodicElement = {
  atomicNumber: number;
  symbol: string;
  nameTr: string;
  atomicMass: number;
  category: ElementCategory;
  period: number;
  group: number | null;
  row: number;
  col: number;
};

export const categoryLabels: Record<ElementCategory, string> = {
  "alkali-metal": "Alkali metal",
  "toprak-alkali-metal": "Toprak alkali metal",
  "gecis-metali": "Geçiş metali",
  "post-gecis-metali": "Diğer metal",
  "yari-metal": "Yarı metal (metaloid)",
  ametal: "Ametal",
  halojen: "Halojen",
  "soy-gaz": "Soy gaz",
  lantanit: "Lantanit",
  aktinit: "Aktinit",
};

export const periodicTable: PeriodicElement[] = [
  { atomicNumber: 1, symbol: "H", nameTr: "Hidrojen", atomicMass: 1.008, category: "ametal", period: 1, group: 1, row: 1, col: 1 },
  { atomicNumber: 2, symbol: "He", nameTr: "Helyum", atomicMass: 4.003, category: "soy-gaz", period: 1, group: 18, row: 1, col: 18 },

  { atomicNumber: 3, symbol: "Li", nameTr: "Lityum", atomicMass: 6.94, category: "alkali-metal", period: 2, group: 1, row: 2, col: 1 },
  { atomicNumber: 4, symbol: "Be", nameTr: "Berilyum", atomicMass: 9.012, category: "toprak-alkali-metal", period: 2, group: 2, row: 2, col: 2 },
  { atomicNumber: 5, symbol: "B", nameTr: "Bor", atomicMass: 10.81, category: "yari-metal", period: 2, group: 13, row: 2, col: 13 },
  { atomicNumber: 6, symbol: "C", nameTr: "Karbon", atomicMass: 12.011, category: "ametal", period: 2, group: 14, row: 2, col: 14 },
  { atomicNumber: 7, symbol: "N", nameTr: "Azot", atomicMass: 14.007, category: "ametal", period: 2, group: 15, row: 2, col: 15 },
  { atomicNumber: 8, symbol: "O", nameTr: "Oksijen", atomicMass: 15.999, category: "ametal", period: 2, group: 16, row: 2, col: 16 },
  { atomicNumber: 9, symbol: "F", nameTr: "Flor", atomicMass: 18.998, category: "halojen", period: 2, group: 17, row: 2, col: 17 },
  { atomicNumber: 10, symbol: "Ne", nameTr: "Neon", atomicMass: 20.18, category: "soy-gaz", period: 2, group: 18, row: 2, col: 18 },

  { atomicNumber: 11, symbol: "Na", nameTr: "Sodyum", atomicMass: 22.99, category: "alkali-metal", period: 3, group: 1, row: 3, col: 1 },
  { atomicNumber: 12, symbol: "Mg", nameTr: "Magnezyum", atomicMass: 24.305, category: "toprak-alkali-metal", period: 3, group: 2, row: 3, col: 2 },
  { atomicNumber: 13, symbol: "Al", nameTr: "Alüminyum", atomicMass: 26.982, category: "post-gecis-metali", period: 3, group: 13, row: 3, col: 13 },
  { atomicNumber: 14, symbol: "Si", nameTr: "Silisyum", atomicMass: 28.085, category: "yari-metal", period: 3, group: 14, row: 3, col: 14 },
  { atomicNumber: 15, symbol: "P", nameTr: "Fosfor", atomicMass: 30.974, category: "ametal", period: 3, group: 15, row: 3, col: 15 },
  { atomicNumber: 16, symbol: "S", nameTr: "Kükürt", atomicMass: 32.06, category: "ametal", period: 3, group: 16, row: 3, col: 16 },
  { atomicNumber: 17, symbol: "Cl", nameTr: "Klor", atomicMass: 35.45, category: "halojen", period: 3, group: 17, row: 3, col: 17 },
  { atomicNumber: 18, symbol: "Ar", nameTr: "Argon", atomicMass: 39.948, category: "soy-gaz", period: 3, group: 18, row: 3, col: 18 },

  { atomicNumber: 19, symbol: "K", nameTr: "Potasyum", atomicMass: 39.098, category: "alkali-metal", period: 4, group: 1, row: 4, col: 1 },
  { atomicNumber: 20, symbol: "Ca", nameTr: "Kalsiyum", atomicMass: 40.078, category: "toprak-alkali-metal", period: 4, group: 2, row: 4, col: 2 },
  { atomicNumber: 21, symbol: "Sc", nameTr: "Skandiyum", atomicMass: 44.956, category: "gecis-metali", period: 4, group: 3, row: 4, col: 3 },
  { atomicNumber: 22, symbol: "Ti", nameTr: "Titanyum", atomicMass: 47.867, category: "gecis-metali", period: 4, group: 4, row: 4, col: 4 },
  { atomicNumber: 23, symbol: "V", nameTr: "Vanadyum", atomicMass: 50.942, category: "gecis-metali", period: 4, group: 5, row: 4, col: 5 },
  { atomicNumber: 24, symbol: "Cr", nameTr: "Krom", atomicMass: 51.996, category: "gecis-metali", period: 4, group: 6, row: 4, col: 6 },
  { atomicNumber: 25, symbol: "Mn", nameTr: "Mangan", atomicMass: 54.938, category: "gecis-metali", period: 4, group: 7, row: 4, col: 7 },
  { atomicNumber: 26, symbol: "Fe", nameTr: "Demir", atomicMass: 55.845, category: "gecis-metali", period: 4, group: 8, row: 4, col: 8 },
  { atomicNumber: 27, symbol: "Co", nameTr: "Kobalt", atomicMass: 58.933, category: "gecis-metali", period: 4, group: 9, row: 4, col: 9 },
  { atomicNumber: 28, symbol: "Ni", nameTr: "Nikel", atomicMass: 58.693, category: "gecis-metali", period: 4, group: 10, row: 4, col: 10 },
  { atomicNumber: 29, symbol: "Cu", nameTr: "Bakır", atomicMass: 63.546, category: "gecis-metali", period: 4, group: 11, row: 4, col: 11 },
  { atomicNumber: 30, symbol: "Zn", nameTr: "Çinko", atomicMass: 65.38, category: "gecis-metali", period: 4, group: 12, row: 4, col: 12 },
  { atomicNumber: 31, symbol: "Ga", nameTr: "Galyum", atomicMass: 69.723, category: "post-gecis-metali", period: 4, group: 13, row: 4, col: 13 },
  { atomicNumber: 32, symbol: "Ge", nameTr: "Germanyum", atomicMass: 72.63, category: "yari-metal", period: 4, group: 14, row: 4, col: 14 },
  { atomicNumber: 33, symbol: "As", nameTr: "Arsenik", atomicMass: 74.922, category: "yari-metal", period: 4, group: 15, row: 4, col: 15 },
  { atomicNumber: 34, symbol: "Se", nameTr: "Selenyum", atomicMass: 78.971, category: "ametal", period: 4, group: 16, row: 4, col: 16 },
  { atomicNumber: 35, symbol: "Br", nameTr: "Brom", atomicMass: 79.904, category: "halojen", period: 4, group: 17, row: 4, col: 17 },
  { atomicNumber: 36, symbol: "Kr", nameTr: "Kripton", atomicMass: 83.798, category: "soy-gaz", period: 4, group: 18, row: 4, col: 18 },

  { atomicNumber: 37, symbol: "Rb", nameTr: "Rubidyum", atomicMass: 85.468, category: "alkali-metal", period: 5, group: 1, row: 5, col: 1 },
  { atomicNumber: 38, symbol: "Sr", nameTr: "Stronsiyum", atomicMass: 87.62, category: "toprak-alkali-metal", period: 5, group: 2, row: 5, col: 2 },
  { atomicNumber: 39, symbol: "Y", nameTr: "İtriyum", atomicMass: 88.906, category: "gecis-metali", period: 5, group: 3, row: 5, col: 3 },
  { atomicNumber: 40, symbol: "Zr", nameTr: "Zirkonyum", atomicMass: 91.224, category: "gecis-metali", period: 5, group: 4, row: 5, col: 4 },
  { atomicNumber: 41, symbol: "Nb", nameTr: "Niyobyum", atomicMass: 92.906, category: "gecis-metali", period: 5, group: 5, row: 5, col: 5 },
  { atomicNumber: 42, symbol: "Mo", nameTr: "Molibden", atomicMass: 95.95, category: "gecis-metali", period: 5, group: 6, row: 5, col: 6 },
  { atomicNumber: 43, symbol: "Tc", nameTr: "Teknesyum", atomicMass: 98, category: "gecis-metali", period: 5, group: 7, row: 5, col: 7 },
  { atomicNumber: 44, symbol: "Ru", nameTr: "Rutenyum", atomicMass: 101.07, category: "gecis-metali", period: 5, group: 8, row: 5, col: 8 },
  { atomicNumber: 45, symbol: "Rh", nameTr: "Rodyum", atomicMass: 102.906, category: "gecis-metali", period: 5, group: 9, row: 5, col: 9 },
  { atomicNumber: 46, symbol: "Pd", nameTr: "Paladyum", atomicMass: 106.42, category: "gecis-metali", period: 5, group: 10, row: 5, col: 10 },
  { atomicNumber: 47, symbol: "Ag", nameTr: "Gümüş", atomicMass: 107.868, category: "gecis-metali", period: 5, group: 11, row: 5, col: 11 },
  { atomicNumber: 48, symbol: "Cd", nameTr: "Kadmiyum", atomicMass: 112.414, category: "gecis-metali", period: 5, group: 12, row: 5, col: 12 },
  { atomicNumber: 49, symbol: "In", nameTr: "İndiyum", atomicMass: 114.818, category: "post-gecis-metali", period: 5, group: 13, row: 5, col: 13 },
  { atomicNumber: 50, symbol: "Sn", nameTr: "Kalay", atomicMass: 118.71, category: "post-gecis-metali", period: 5, group: 14, row: 5, col: 14 },
  { atomicNumber: 51, symbol: "Sb", nameTr: "Antimon", atomicMass: 121.76, category: "yari-metal", period: 5, group: 15, row: 5, col: 15 },
  { atomicNumber: 52, symbol: "Te", nameTr: "Tellür", atomicMass: 127.6, category: "yari-metal", period: 5, group: 16, row: 5, col: 16 },
  { atomicNumber: 53, symbol: "I", nameTr: "İyot", atomicMass: 126.904, category: "halojen", period: 5, group: 17, row: 5, col: 17 },
  { atomicNumber: 54, symbol: "Xe", nameTr: "Ksenon", atomicMass: 131.293, category: "soy-gaz", period: 5, group: 18, row: 5, col: 18 },

  { atomicNumber: 55, symbol: "Cs", nameTr: "Sezyum", atomicMass: 132.905, category: "alkali-metal", period: 6, group: 1, row: 6, col: 1 },
  { atomicNumber: 56, symbol: "Ba", nameTr: "Baryum", atomicMass: 137.327, category: "toprak-alkali-metal", period: 6, group: 2, row: 6, col: 2 },
  { atomicNumber: 72, symbol: "Hf", nameTr: "Hafniyum", atomicMass: 178.49, category: "gecis-metali", period: 6, group: 4, row: 6, col: 4 },
  { atomicNumber: 73, symbol: "Ta", nameTr: "Tantal", atomicMass: 180.948, category: "gecis-metali", period: 6, group: 5, row: 6, col: 5 },
  { atomicNumber: 74, symbol: "W", nameTr: "Volfram", atomicMass: 183.84, category: "gecis-metali", period: 6, group: 6, row: 6, col: 6 },
  { atomicNumber: 75, symbol: "Re", nameTr: "Renyum", atomicMass: 186.207, category: "gecis-metali", period: 6, group: 7, row: 6, col: 7 },
  { atomicNumber: 76, symbol: "Os", nameTr: "Osmiyum", atomicMass: 190.23, category: "gecis-metali", period: 6, group: 8, row: 6, col: 8 },
  { atomicNumber: 77, symbol: "Ir", nameTr: "İridyum", atomicMass: 192.217, category: "gecis-metali", period: 6, group: 9, row: 6, col: 9 },
  { atomicNumber: 78, symbol: "Pt", nameTr: "Platin", atomicMass: 195.085, category: "gecis-metali", period: 6, group: 10, row: 6, col: 10 },
  { atomicNumber: 79, symbol: "Au", nameTr: "Altın", atomicMass: 196.967, category: "gecis-metali", period: 6, group: 11, row: 6, col: 11 },
  { atomicNumber: 80, symbol: "Hg", nameTr: "Cıva", atomicMass: 200.592, category: "gecis-metali", period: 6, group: 12, row: 6, col: 12 },
  { atomicNumber: 81, symbol: "Tl", nameTr: "Talyum", atomicMass: 204.38, category: "post-gecis-metali", period: 6, group: 13, row: 6, col: 13 },
  { atomicNumber: 82, symbol: "Pb", nameTr: "Kurşun", atomicMass: 207.2, category: "post-gecis-metali", period: 6, group: 14, row: 6, col: 14 },
  { atomicNumber: 83, symbol: "Bi", nameTr: "Bizmut", atomicMass: 208.98, category: "post-gecis-metali", period: 6, group: 15, row: 6, col: 15 },
  { atomicNumber: 84, symbol: "Po", nameTr: "Polonyum", atomicMass: 209, category: "yari-metal", period: 6, group: 16, row: 6, col: 16 },
  { atomicNumber: 85, symbol: "At", nameTr: "Astatin", atomicMass: 210, category: "halojen", period: 6, group: 17, row: 6, col: 17 },
  { atomicNumber: 86, symbol: "Rn", nameTr: "Radon", atomicMass: 222, category: "soy-gaz", period: 6, group: 18, row: 6, col: 18 },

  { atomicNumber: 87, symbol: "Fr", nameTr: "Fransiyum", atomicMass: 223, category: "alkali-metal", period: 7, group: 1, row: 7, col: 1 },
  { atomicNumber: 88, symbol: "Ra", nameTr: "Radyum", atomicMass: 226, category: "toprak-alkali-metal", period: 7, group: 2, row: 7, col: 2 },
  { atomicNumber: 104, symbol: "Rf", nameTr: "Rutherfordyum", atomicMass: 267, category: "gecis-metali", period: 7, group: 4, row: 7, col: 4 },
  { atomicNumber: 105, symbol: "Db", nameTr: "Dubniyum", atomicMass: 268, category: "gecis-metali", period: 7, group: 5, row: 7, col: 5 },
  { atomicNumber: 106, symbol: "Sg", nameTr: "Seaborgiyum", atomicMass: 269, category: "gecis-metali", period: 7, group: 6, row: 7, col: 6 },
  { atomicNumber: 107, symbol: "Bh", nameTr: "Bohriyum", atomicMass: 270, category: "gecis-metali", period: 7, group: 7, row: 7, col: 7 },
  { atomicNumber: 108, symbol: "Hs", nameTr: "Hassiyum", atomicMass: 269, category: "gecis-metali", period: 7, group: 8, row: 7, col: 8 },
  { atomicNumber: 109, symbol: "Mt", nameTr: "Meitneryum", atomicMass: 278, category: "gecis-metali", period: 7, group: 9, row: 7, col: 9 },
  { atomicNumber: 110, symbol: "Ds", nameTr: "Darmstadtiyum", atomicMass: 281, category: "gecis-metali", period: 7, group: 10, row: 7, col: 10 },
  { atomicNumber: 111, symbol: "Rg", nameTr: "Röntgenyum", atomicMass: 282, category: "gecis-metali", period: 7, group: 11, row: 7, col: 11 },
  { atomicNumber: 112, symbol: "Cn", nameTr: "Kopernikyum", atomicMass: 285, category: "gecis-metali", period: 7, group: 12, row: 7, col: 12 },
  { atomicNumber: 113, symbol: "Nh", nameTr: "Nihonyum", atomicMass: 286, category: "post-gecis-metali", period: 7, group: 13, row: 7, col: 13 },
  { atomicNumber: 114, symbol: "Fl", nameTr: "Flerovyum", atomicMass: 289, category: "post-gecis-metali", period: 7, group: 14, row: 7, col: 14 },
  { atomicNumber: 115, symbol: "Mc", nameTr: "Moskovyum", atomicMass: 290, category: "post-gecis-metali", period: 7, group: 15, row: 7, col: 15 },
  { atomicNumber: 116, symbol: "Lv", nameTr: "Livermoryum", atomicMass: 293, category: "post-gecis-metali", period: 7, group: 16, row: 7, col: 16 },
  { atomicNumber: 117, symbol: "Ts", nameTr: "Tennessin", atomicMass: 294, category: "halojen", period: 7, group: 17, row: 7, col: 17 },
  { atomicNumber: 118, symbol: "Og", nameTr: "Oganesson", atomicMass: 294, category: "soy-gaz", period: 7, group: 18, row: 7, col: 18 },

  { atomicNumber: 57, symbol: "La", nameTr: "Lantan", atomicMass: 138.905, category: "lantanit", period: 6, group: null, row: 9, col: 4 },
  { atomicNumber: 58, symbol: "Ce", nameTr: "Seryum", atomicMass: 140.116, category: "lantanit", period: 6, group: null, row: 9, col: 5 },
  { atomicNumber: 59, symbol: "Pr", nameTr: "Praseodim", atomicMass: 140.908, category: "lantanit", period: 6, group: null, row: 9, col: 6 },
  { atomicNumber: 60, symbol: "Nd", nameTr: "Neodim", atomicMass: 144.242, category: "lantanit", period: 6, group: null, row: 9, col: 7 },
  { atomicNumber: 61, symbol: "Pm", nameTr: "Prometyum", atomicMass: 145, category: "lantanit", period: 6, group: null, row: 9, col: 8 },
  { atomicNumber: 62, symbol: "Sm", nameTr: "Samaryum", atomicMass: 150.36, category: "lantanit", period: 6, group: null, row: 9, col: 9 },
  { atomicNumber: 63, symbol: "Eu", nameTr: "Evropiyum", atomicMass: 151.964, category: "lantanit", period: 6, group: null, row: 9, col: 10 },
  { atomicNumber: 64, symbol: "Gd", nameTr: "Gadolinyum", atomicMass: 157.25, category: "lantanit", period: 6, group: null, row: 9, col: 11 },
  { atomicNumber: 65, symbol: "Tb", nameTr: "Terbiyum", atomicMass: 158.925, category: "lantanit", period: 6, group: null, row: 9, col: 12 },
  { atomicNumber: 66, symbol: "Dy", nameTr: "Disprozyum", atomicMass: 162.5, category: "lantanit", period: 6, group: null, row: 9, col: 13 },
  { atomicNumber: 67, symbol: "Ho", nameTr: "Holmiyum", atomicMass: 164.93, category: "lantanit", period: 6, group: null, row: 9, col: 14 },
  { atomicNumber: 68, symbol: "Er", nameTr: "Erbiyum", atomicMass: 167.259, category: "lantanit", period: 6, group: null, row: 9, col: 15 },
  { atomicNumber: 69, symbol: "Tm", nameTr: "Tulyum", atomicMass: 168.934, category: "lantanit", period: 6, group: null, row: 9, col: 16 },
  { atomicNumber: 70, symbol: "Yb", nameTr: "İterbiyum", atomicMass: 173.045, category: "lantanit", period: 6, group: null, row: 9, col: 17 },
  { atomicNumber: 71, symbol: "Lu", nameTr: "Lutesyum", atomicMass: 174.967, category: "lantanit", period: 6, group: null, row: 9, col: 18 },

  { atomicNumber: 89, symbol: "Ac", nameTr: "Aktinyum", atomicMass: 227, category: "aktinit", period: 7, group: null, row: 10, col: 4 },
  { atomicNumber: 90, symbol: "Th", nameTr: "Toryum", atomicMass: 232.038, category: "aktinit", period: 7, group: null, row: 10, col: 5 },
  { atomicNumber: 91, symbol: "Pa", nameTr: "Protaktinyum", atomicMass: 231.036, category: "aktinit", period: 7, group: null, row: 10, col: 6 },
  { atomicNumber: 92, symbol: "U", nameTr: "Uranyum", atomicMass: 238.029, category: "aktinit", period: 7, group: null, row: 10, col: 7 },
  { atomicNumber: 93, symbol: "Np", nameTr: "Neptünyum", atomicMass: 237, category: "aktinit", period: 7, group: null, row: 10, col: 8 },
  { atomicNumber: 94, symbol: "Pu", nameTr: "Plütonyum", atomicMass: 244, category: "aktinit", period: 7, group: null, row: 10, col: 9 },
  { atomicNumber: 95, symbol: "Am", nameTr: "Amerikyum", atomicMass: 243, category: "aktinit", period: 7, group: null, row: 10, col: 10 },
  { atomicNumber: 96, symbol: "Cm", nameTr: "Küriyum", atomicMass: 247, category: "aktinit", period: 7, group: null, row: 10, col: 11 },
  { atomicNumber: 97, symbol: "Bk", nameTr: "Berkelyum", atomicMass: 247, category: "aktinit", period: 7, group: null, row: 10, col: 12 },
  { atomicNumber: 98, symbol: "Cf", nameTr: "Kaliforniyum", atomicMass: 251, category: "aktinit", period: 7, group: null, row: 10, col: 13 },
  { atomicNumber: 99, symbol: "Es", nameTr: "Aynştaynyum", atomicMass: 252, category: "aktinit", period: 7, group: null, row: 10, col: 14 },
  { atomicNumber: 100, symbol: "Fm", nameTr: "Fermiyum", atomicMass: 257, category: "aktinit", period: 7, group: null, row: 10, col: 15 },
  { atomicNumber: 101, symbol: "Md", nameTr: "Mendelevyum", atomicMass: 258, category: "aktinit", period: 7, group: null, row: 10, col: 16 },
  { atomicNumber: 102, symbol: "No", nameTr: "Nobelyum", atomicMass: 259, category: "aktinit", period: 7, group: null, row: 10, col: 17 },
  { atomicNumber: 103, symbol: "Lr", nameTr: "Lavrensiyum", atomicMass: 266, category: "aktinit", period: 7, group: null, row: 10, col: 18 },
];

const slugOverrides: Record<string, string> = {
  İtriyum: "itriyum",
  İyot: "iyot",
  İridyum: "iridyum",
  İndiyum: "indiyum",
  İterbiyum: "iterbiyum",
};

export function slugifyElementName(nameTr: string) {
  if (slugOverrides[nameTr]) {
    return slugOverrides[nameTr];
  }

  return nameTr
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findElementBySlug(slug: string) {
  return periodicTable.find(
    (element) => slugifyElementName(element.nameTr) === slug
  );
}
