export type CodonEntry = {
  codon: string;
  aminoAcidId: string | null;
  threeLetterCode: string | null;
  nameTr: string;
  isStart: boolean;
};

// Standart evrensel genetik kod tablosu (mRNA kodonlari, 64 kombinasyon).
// Her biyokimya/moleküler biyoloji kaynagiyla ayni -- sabit bilimsel
// standart, uydurma veri yok. "Stop" kodonlari (UAA, UAG, UGA) hicbir
// amino asidi kodlamaz, protein sentezini sonlandirir.
export const codonTable: CodonEntry[] = [
  { codon: "UUU", aminoAcidId: "fenilalanin", threeLetterCode: "Phe", nameTr: "Fenilalanin", isStart: false },
  { codon: "UUC", aminoAcidId: "fenilalanin", threeLetterCode: "Phe", nameTr: "Fenilalanin", isStart: false },
  { codon: "UUA", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "UUG", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "UCU", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "UCC", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "UCA", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "UCG", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "UAU", aminoAcidId: "tirozin", threeLetterCode: "Tyr", nameTr: "Tirozin", isStart: false },
  { codon: "UAC", aminoAcidId: "tirozin", threeLetterCode: "Tyr", nameTr: "Tirozin", isStart: false },
  { codon: "UAA", aminoAcidId: null, threeLetterCode: null, nameTr: "Dur Kodonu (Stop)", isStart: false },
  { codon: "UAG", aminoAcidId: null, threeLetterCode: null, nameTr: "Dur Kodonu (Stop)", isStart: false },
  { codon: "UGU", aminoAcidId: "sistein", threeLetterCode: "Cys", nameTr: "Sistein", isStart: false },
  { codon: "UGC", aminoAcidId: "sistein", threeLetterCode: "Cys", nameTr: "Sistein", isStart: false },
  { codon: "UGA", aminoAcidId: null, threeLetterCode: null, nameTr: "Dur Kodonu (Stop)", isStart: false },
  { codon: "UGG", aminoAcidId: "triptofan", threeLetterCode: "Trp", nameTr: "Triptofan", isStart: false },

  { codon: "CUU", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "CUC", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "CUA", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "CUG", aminoAcidId: "losin", threeLetterCode: "Leu", nameTr: "Lösin", isStart: false },
  { codon: "CCU", aminoAcidId: "prolin", threeLetterCode: "Pro", nameTr: "Prolin", isStart: false },
  { codon: "CCC", aminoAcidId: "prolin", threeLetterCode: "Pro", nameTr: "Prolin", isStart: false },
  { codon: "CCA", aminoAcidId: "prolin", threeLetterCode: "Pro", nameTr: "Prolin", isStart: false },
  { codon: "CCG", aminoAcidId: "prolin", threeLetterCode: "Pro", nameTr: "Prolin", isStart: false },
  { codon: "CAU", aminoAcidId: "histidin", threeLetterCode: "His", nameTr: "Histidin", isStart: false },
  { codon: "CAC", aminoAcidId: "histidin", threeLetterCode: "His", nameTr: "Histidin", isStart: false },
  { codon: "CAA", aminoAcidId: "glutamin", threeLetterCode: "Gln", nameTr: "Glutamin", isStart: false },
  { codon: "CAG", aminoAcidId: "glutamin", threeLetterCode: "Gln", nameTr: "Glutamin", isStart: false },
  { codon: "CGU", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },
  { codon: "CGC", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },
  { codon: "CGA", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },
  { codon: "CGG", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },

  { codon: "AUU", aminoAcidId: "izolosin", threeLetterCode: "Ile", nameTr: "İzolösin", isStart: false },
  { codon: "AUC", aminoAcidId: "izolosin", threeLetterCode: "Ile", nameTr: "İzolösin", isStart: false },
  { codon: "AUA", aminoAcidId: "izolosin", threeLetterCode: "Ile", nameTr: "İzolösin", isStart: false },
  { codon: "AUG", aminoAcidId: "metionin", threeLetterCode: "Met", nameTr: "Metionin", isStart: true },
  { codon: "ACU", aminoAcidId: "treonin", threeLetterCode: "Thr", nameTr: "Treonin", isStart: false },
  { codon: "ACC", aminoAcidId: "treonin", threeLetterCode: "Thr", nameTr: "Treonin", isStart: false },
  { codon: "ACA", aminoAcidId: "treonin", threeLetterCode: "Thr", nameTr: "Treonin", isStart: false },
  { codon: "ACG", aminoAcidId: "treonin", threeLetterCode: "Thr", nameTr: "Treonin", isStart: false },
  { codon: "AAU", aminoAcidId: "asparagin", threeLetterCode: "Asn", nameTr: "Asparagin", isStart: false },
  { codon: "AAC", aminoAcidId: "asparagin", threeLetterCode: "Asn", nameTr: "Asparagin", isStart: false },
  { codon: "AAA", aminoAcidId: "lizin", threeLetterCode: "Lys", nameTr: "Lizin", isStart: false },
  { codon: "AAG", aminoAcidId: "lizin", threeLetterCode: "Lys", nameTr: "Lizin", isStart: false },
  { codon: "AGU", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "AGC", aminoAcidId: "serin", threeLetterCode: "Ser", nameTr: "Serin", isStart: false },
  { codon: "AGA", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },
  { codon: "AGG", aminoAcidId: "arginin", threeLetterCode: "Arg", nameTr: "Arginin", isStart: false },

  { codon: "GUU", aminoAcidId: "valin", threeLetterCode: "Val", nameTr: "Valin", isStart: false },
  { codon: "GUC", aminoAcidId: "valin", threeLetterCode: "Val", nameTr: "Valin", isStart: false },
  { codon: "GUA", aminoAcidId: "valin", threeLetterCode: "Val", nameTr: "Valin", isStart: false },
  { codon: "GUG", aminoAcidId: "valin", threeLetterCode: "Val", nameTr: "Valin", isStart: false },
  { codon: "GCU", aminoAcidId: "alanin", threeLetterCode: "Ala", nameTr: "Alanin", isStart: false },
  { codon: "GCC", aminoAcidId: "alanin", threeLetterCode: "Ala", nameTr: "Alanin", isStart: false },
  { codon: "GCA", aminoAcidId: "alanin", threeLetterCode: "Ala", nameTr: "Alanin", isStart: false },
  { codon: "GCG", aminoAcidId: "alanin", threeLetterCode: "Ala", nameTr: "Alanin", isStart: false },
  { codon: "GAU", aminoAcidId: "aspartik-asit", threeLetterCode: "Asp", nameTr: "Aspartik Asit", isStart: false },
  { codon: "GAC", aminoAcidId: "aspartik-asit", threeLetterCode: "Asp", nameTr: "Aspartik Asit", isStart: false },
  { codon: "GAA", aminoAcidId: "glutamik-asit", threeLetterCode: "Glu", nameTr: "Glutamik Asit", isStart: false },
  { codon: "GAG", aminoAcidId: "glutamik-asit", threeLetterCode: "Glu", nameTr: "Glutamik Asit", isStart: false },
  { codon: "GGU", aminoAcidId: "glisin", threeLetterCode: "Gly", nameTr: "Glisin", isStart: false },
  { codon: "GGC", aminoAcidId: "glisin", threeLetterCode: "Gly", nameTr: "Glisin", isStart: false },
  { codon: "GGA", aminoAcidId: "glisin", threeLetterCode: "Gly", nameTr: "Glisin", isStart: false },
  { codon: "GGG", aminoAcidId: "glisin", threeLetterCode: "Gly", nameTr: "Glisin", isStart: false },
];

export function findCodon(codon: string): CodonEntry | undefined {
  return codonTable.find((entry) => entry.codon === codon.toUpperCase());
}
