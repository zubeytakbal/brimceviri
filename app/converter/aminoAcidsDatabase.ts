export type AminoAcidEntry = {
  id: string;
  nameTr: string;
  formula: string;
  threeLetterCode: string;
  oneLetterCode: string;
  essential: boolean;
};

// Standart 20 amino asidin serbest (peptit zincirine baglanmamis) haldeki
// kimyasal formulleri -- her biyokimya kaynagiyla ayni, uydurma veri yok.
// Molar kutle ve atomik kompozisyon molecularFormulaParser ile otomatik
// hesaplaniyor (aminoAcidsHub.ts), tipki bilesikler sistemindeki gibi.
export const aminoAcidsDatabase: AminoAcidEntry[] = [
  { id: "glisin", nameTr: "Glisin", formula: "C2H5NO2", threeLetterCode: "Gly", oneLetterCode: "G", essential: false },
  { id: "alanin", nameTr: "Alanin", formula: "C3H7NO2", threeLetterCode: "Ala", oneLetterCode: "A", essential: false },
  { id: "valin", nameTr: "Valin", formula: "C5H11NO2", threeLetterCode: "Val", oneLetterCode: "V", essential: true },
  { id: "losin", nameTr: "Lösin", formula: "C6H13NO2", threeLetterCode: "Leu", oneLetterCode: "L", essential: true },
  { id: "izolosin", nameTr: "İzolösin", formula: "C6H13NO2", threeLetterCode: "Ile", oneLetterCode: "I", essential: true },
  { id: "prolin", nameTr: "Prolin", formula: "C5H9NO2", threeLetterCode: "Pro", oneLetterCode: "P", essential: false },
  { id: "fenilalanin", nameTr: "Fenilalanin", formula: "C9H11NO2", threeLetterCode: "Phe", oneLetterCode: "F", essential: true },
  { id: "triptofan", nameTr: "Triptofan", formula: "C11H12N2O2", threeLetterCode: "Trp", oneLetterCode: "W", essential: true },
  { id: "metionin", nameTr: "Metionin", formula: "C5H11NO2S", threeLetterCode: "Met", oneLetterCode: "M", essential: true },
  { id: "serin", nameTr: "Serin", formula: "C3H7NO3", threeLetterCode: "Ser", oneLetterCode: "S", essential: false },
  { id: "treonin", nameTr: "Treonin", formula: "C4H9NO3", threeLetterCode: "Thr", oneLetterCode: "T", essential: true },
  { id: "sistein", nameTr: "Sistein", formula: "C3H7NO2S", threeLetterCode: "Cys", oneLetterCode: "C", essential: false },
  { id: "tirozin", nameTr: "Tirozin", formula: "C9H11NO3", threeLetterCode: "Tyr", oneLetterCode: "Y", essential: false },
  { id: "asparagin", nameTr: "Asparagin", formula: "C4H8N2O3", threeLetterCode: "Asn", oneLetterCode: "N", essential: false },
  { id: "glutamin", nameTr: "Glutamin", formula: "C5H10N2O3", threeLetterCode: "Gln", oneLetterCode: "Q", essential: false },
  { id: "aspartik-asit", nameTr: "Aspartik Asit", formula: "C4H7NO4", threeLetterCode: "Asp", oneLetterCode: "D", essential: false },
  { id: "glutamik-asit", nameTr: "Glutamik Asit", formula: "C5H9NO4", threeLetterCode: "Glu", oneLetterCode: "E", essential: false },
  { id: "lizin", nameTr: "Lizin", formula: "C6H14N2O2", threeLetterCode: "Lys", oneLetterCode: "K", essential: true },
  { id: "arginin", nameTr: "Arginin", formula: "C6H14N4O2", threeLetterCode: "Arg", oneLetterCode: "R", essential: false },
  { id: "histidin", nameTr: "Histidin", formula: "C6H9N3O2", threeLetterCode: "His", oneLetterCode: "H", essential: true },
];
