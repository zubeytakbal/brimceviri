// Kimyasal bilesik veritabani -- her bilesigin molar kutlesi ve atomik
// kompozisyonu, formulunden molecularFormulaParser.ts araciligiyla
// OTOMATIK hesaplanir (periyodik tablo atom kutlelerinden). Bu yuzden
// burada sadece isim, formul ve kategori tutulur -- molar kutle icin
// disaridan veri aramaya gerek yoktur, saf aritmetiktir.

export type CompoundCategory =
  | "asit"
  | "baz"
  | "tuz"
  | "oksit"
  | "organik"
  | "gaz";

export const compoundCategoryLabels: Record<CompoundCategory, string> = {
  asit: "Asitler",
  baz: "Bazlar",
  tuz: "Tuzlar",
  oksit: "Oksitler",
  organik: "Organik Bileşikler",
  gaz: "Elementel Gazlar",
};

export type CompoundEntry = {
  id: string;
  nameTr: string;
  formula: string;
  category: CompoundCategory;
};

export const compoundsDatabase: CompoundEntry[] = [
  { id: "su", nameTr: "Su", formula: "H2O", category: "oksit" },
  { id: "sofra-tuzu", nameTr: "Sofra Tuzu (Sodyum Klorür)", formula: "NaCl", category: "tuz" },
  { id: "karbondioksit", nameTr: "Karbondioksit", formula: "CO2", category: "oksit" },
  { id: "oksijen-gazi", nameTr: "Oksijen Gazı", formula: "O2", category: "gaz" },
  { id: "sodyum-hidroksit", nameTr: "Sodyum Hidroksit", formula: "NaOH", category: "baz" },
  { id: "hidroklorik-asit", nameTr: "Hidroklorik Asit", formula: "HCl", category: "asit" },
  { id: "glikoz", nameTr: "Glikoz", formula: "C6H12O6", category: "organik" },
  { id: "amonyak", nameTr: "Amonyak", formula: "NH3", category: "baz" },
  { id: "sulfurik-asit", nameTr: "Sülfürik Asit", formula: "H2SO4", category: "asit" },
  { id: "kalsiyum-karbonat", nameTr: "Kalsiyum Karbonat", formula: "CaCO3", category: "tuz" },
  { id: "etanol", nameTr: "Etanol", formula: "C2H6O", category: "organik" },
  { id: "hidrojen-peroksit", nameTr: "Hidrojen Peroksit", formula: "H2O2", category: "oksit" },
  { id: "metan", nameTr: "Metan", formula: "CH4", category: "organik" },
  { id: "potasyum-nitrat", nameTr: "Potasyum Nitrat", formula: "KNO3", category: "tuz" },
  { id: "aluminyum-oksit", nameTr: "Alüminyum Oksit", formula: "Al2O3", category: "oksit" },
  { id: "kalsiyum-hidroksit", nameTr: "Kalsiyum Hidroksit", formula: "Ca(OH)2", category: "baz" },
  { id: "nitrik-asit", nameTr: "Nitrik Asit", formula: "HNO3", category: "asit" },
  { id: "fosforik-asit", nameTr: "Fosforik Asit", formula: "H3PO4", category: "asit" },
  { id: "asetik-asit", nameTr: "Asetik Asit (Sirke Asidi)", formula: "CH3COOH", category: "asit" },
  { id: "potasyum-hidroksit", nameTr: "Potasyum Hidroksit", formula: "KOH", category: "baz" },
  { id: "kalsiyum-klorur", nameTr: "Kalsiyum Klorür", formula: "CaCl2", category: "tuz" },
  { id: "sodyum-bikarbonat", nameTr: "Sodyum Bikarbonat (Karbonat)", formula: "NaHCO3", category: "tuz" },
  { id: "sodyum-karbonat", nameTr: "Sodyum Karbonat", formula: "Na2CO3", category: "tuz" },
  { id: "gumus-nitrat", nameTr: "Gümüş Nitrat", formula: "AgNO3", category: "tuz" },
  { id: "bakir-sulfat", nameTr: "Bakır(II) Sülfat", formula: "CuSO4", category: "tuz" },
  { id: "potasyum-klorur", nameTr: "Potasyum Klorür", formula: "KCl", category: "tuz" },
  { id: "kalsiyum-sulfat", nameTr: "Kalsiyum Sülfat (Alçı Taşı)", formula: "CaSO4", category: "tuz" },
  { id: "kukurt-dioksit", nameTr: "Kükürt Dioksit", formula: "SO2", category: "oksit" },
  { id: "azot-dioksit", nameTr: "Azot Dioksit", formula: "NO2", category: "oksit" },
  { id: "demir-oksit", nameTr: "Demir(III) Oksit (Pas)", formula: "Fe2O3", category: "oksit" },
  { id: "magnezyum-oksit", nameTr: "Magnezyum Oksit", formula: "MgO", category: "oksit" },
  { id: "silisyum-dioksit", nameTr: "Silisyum Dioksit (Kuvars)", formula: "SiO2", category: "oksit" },
  { id: "kalsiyum-oksit", nameTr: "Kalsiyum Oksit (Sönmemiş Kireç)", formula: "CaO", category: "oksit" },
  { id: "sukroz", nameTr: "Sükroz (Sofra Şekeri)", formula: "C12H22O11", category: "organik" },
  { id: "etilen", nameTr: "Etilen", formula: "C2H4", category: "organik" },
  { id: "benzen", nameTr: "Benzen", formula: "C6H6", category: "organik" },
  { id: "metanol", nameTr: "Metanol", formula: "CH3OH", category: "organik" },
  { id: "azot-gazi", nameTr: "Azot Gazı", formula: "N2", category: "gaz" },
  { id: "hidrojen-gazi", nameTr: "Hidrojen Gazı", formula: "H2", category: "gaz" },
  { id: "klor-gazi", nameTr: "Klor Gazı", formula: "Cl2", category: "gaz" },
  { id: "karbonik-asit", nameTr: "Karbonik Asit", formula: "H2CO3", category: "asit" },
  { id: "hidroflorik-asit", nameTr: "Hidroflorik Asit", formula: "HF", category: "asit" },
  { id: "hidrojen-sulfur", nameTr: "Hidrojen Sülfür", formula: "H2S", category: "asit" },
  { id: "baryum-hidroksit", nameTr: "Baryum Hidroksit", formula: "Ba(OH)2", category: "baz" },
  { id: "aluminyum-hidroksit", nameTr: "Alüminyum Hidroksit", formula: "Al(OH)3", category: "baz" },
  { id: "magnezyum-klorur", nameTr: "Magnezyum Klorür", formula: "MgCl2", category: "tuz" },
  { id: "demir-klorur", nameTr: "Demir(III) Klorür", formula: "FeCl3", category: "tuz" },
  { id: "sodyum-sulfat", nameTr: "Sodyum Sülfat", formula: "Na2SO4", category: "tuz" },
  { id: "amonyum-nitrat", nameTr: "Amonyum Nitrat", formula: "NH4NO3", category: "tuz" },
  { id: "potasyum-permanganat", nameTr: "Potasyum Permanganat", formula: "KMnO4", category: "tuz" },
  { id: "sodyum-hipoklorit", nameTr: "Sodyum Hipoklorit (Çamaşır Suyu)", formula: "NaOCl", category: "tuz" },
  { id: "kalsiyum-florur", nameTr: "Kalsiyum Florür (Florit)", formula: "CaF2", category: "tuz" },
  { id: "gumus-klorur", nameTr: "Gümüş Klorür", formula: "AgCl", category: "tuz" },
  { id: "baryum-sulfat", nameTr: "Baryum Sülfat", formula: "BaSO4", category: "tuz" },
  { id: "sodyum-fosfat", nameTr: "Sodyum Fosfat", formula: "Na3PO4", category: "tuz" },
  { id: "diazot-monoksit", nameTr: "Diazot Monoksit (Güldürücü Gaz)", formula: "N2O", category: "oksit" },
  { id: "azot-monoksit", nameTr: "Azot Monoksit", formula: "NO", category: "oksit" },
  { id: "bakir-oksit", nameTr: "Bakır(II) Oksit", formula: "CuO", category: "oksit" },
  { id: "mangan-dioksit", nameTr: "Mangan Dioksit", formula: "MnO2", category: "oksit" },
  { id: "titanyum-dioksit", nameTr: "Titanyum Dioksit", formula: "TiO2", category: "oksit" },
  { id: "difosfor-pentoksit", nameTr: "Difosfor Pentoksit", formula: "P2O5", category: "oksit" },
  { id: "aseton", nameTr: "Aseton", formula: "C3H6O", category: "organik" },
  { id: "formaldehit", nameTr: "Formaldehit", formula: "CH2O", category: "organik" },
  { id: "asetilen", nameTr: "Asetilen", formula: "C2H2", category: "organik" },
  { id: "ure", nameTr: "Üre", formula: "CO(NH2)2", category: "organik" },
  { id: "fenol", nameTr: "Fenol", formula: "C6H5OH", category: "organik" },
  { id: "kloroform", nameTr: "Kloroform", formula: "CHCl3", category: "organik" },
  { id: "gliserin", nameTr: "Gliserin", formula: "C3H8O3", category: "organik" },
  { id: "aspirin", nameTr: "Aspirin (Asetilsalisilik Asit)", formula: "C9H8O4", category: "organik" },
  { id: "parasetamol", nameTr: "Parasetamol", formula: "C8H9NO2", category: "organik" },
  { id: "flor-gazi", nameTr: "Flor Gazı", formula: "F2", category: "gaz" },
  { id: "argon-gazi", nameTr: "Argon", formula: "Ar", category: "gaz" },
  { id: "sitrik-asit", nameTr: "Sitrik Asit (Limon Asidi)", formula: "C6H8O7", category: "asit" },
  { id: "laktik-asit", nameTr: "Laktik Asit", formula: "C3H6O3", category: "asit" },
  { id: "hidrobromik-asit", nameTr: "Hidrobromik Asit", formula: "HBr", category: "asit" },
  { id: "lityum-hidroksit", nameTr: "Lityum Hidroksit", formula: "LiOH", category: "baz" },
  { id: "magnezyum-sulfat", nameTr: "Magnezyum Sülfat (Epsom Tuzu)", formula: "MgSO4", category: "tuz" },
  { id: "sodyum-florur", nameTr: "Sodyum Florür", formula: "NaF", category: "tuz" },
  { id: "potasyum-iyodur", nameTr: "Potasyum İyodür", formula: "KI", category: "tuz" },
  { id: "sodyum-tiyosulfat", nameTr: "Sodyum Tiyosülfat", formula: "Na2S2O3", category: "tuz" },
  { id: "potasyum-dikromat", nameTr: "Potasyum Dikromat", formula: "K2Cr2O7", category: "tuz" },
  { id: "demir-ii-klorur", nameTr: "Demir(II) Klorür", formula: "FeCl2", category: "tuz" },
  { id: "cinko-klorur", nameTr: "Çinko Klorür", formula: "ZnCl2", category: "tuz" },
  { id: "cinko-sulfat", nameTr: "Çinko Sülfat", formula: "ZnSO4", category: "tuz" },
  { id: "potasyum-sulfat", nameTr: "Potasyum Sülfat", formula: "K2SO4", category: "tuz" },
  { id: "magnezyum-karbonat", nameTr: "Magnezyum Karbonat", formula: "MgCO3", category: "tuz" },
  { id: "baryum-karbonat", nameTr: "Baryum Karbonat", formula: "BaCO3", category: "tuz" },
  { id: "bakir-ii-klorur", nameTr: "Bakır(II) Klorür", formula: "CuCl2", category: "tuz" },
  { id: "kursun-ii-nitrat", nameTr: "Kurşun(II) Nitrat", formula: "Pb(NO3)2", category: "tuz" },
  { id: "sodyum-sulfur", nameTr: "Sodyum Sülfür", formula: "Na2S", category: "tuz" },
  { id: "kalsiyum-karbur", nameTr: "Kalsiyum Karbür", formula: "CaC2", category: "tuz" },
  { id: "sodyum-bromur", nameTr: "Sodyum Bromür", formula: "NaBr", category: "tuz" },
  { id: "sodyum-oksit", nameTr: "Sodyum Oksit", formula: "Na2O", category: "oksit" },
  { id: "potasyum-oksit", nameTr: "Potasyum Oksit", formula: "K2O", category: "oksit" },
  { id: "baryum-oksit", nameTr: "Baryum Oksit", formula: "BaO", category: "oksit" },
  { id: "krom-oksit", nameTr: "Krom(III) Oksit", formula: "Cr2O3", category: "oksit" },
  { id: "kursun-ii-oksit", nameTr: "Kurşun(II) Oksit", formula: "PbO", category: "oksit" },
  { id: "kafein", nameTr: "Kafein", formula: "C8H10N4O2", category: "organik" },
  { id: "toluen", nameTr: "Toluen", formula: "C7H8", category: "organik" },
  { id: "karbon-tetraklorur", nameTr: "Karbon Tetraklorür", formula: "CCl4", category: "organik" },
  { id: "oktan", nameTr: "Oktan", formula: "C8H18", category: "organik" },
  { id: "sikloheksan", nameTr: "Sikloheksan", formula: "C6H12", category: "organik" },
  { id: "vanilin", nameTr: "Vanilin", formula: "C8H8O3", category: "organik" },
  { id: "ozon", nameTr: "Ozon", formula: "O3", category: "gaz" },
  { id: "kripton", nameTr: "Kripton", formula: "Kr", category: "gaz" },
  { id: "ksenon", nameTr: "Ksenon", formula: "Xe", category: "gaz" },
];

export function findCompoundById(id: string): CompoundEntry | undefined {
  return compoundsDatabase.find((compound) => compound.id === id);
}
