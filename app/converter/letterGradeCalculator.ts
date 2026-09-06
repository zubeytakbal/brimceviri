export type LetterGradeRow = {
  minScore: number;
  letter: string;
  gpa: number;
};

// Turkiye'de bircok universitede yaygin kullanilan 100'luk -> harf notu -> 4'luk
// donusum tablosu. Kesin esik degerleri kuruma gore degisebilir; bu tablo
// genel bir referanstir, kurumun kendi yonetmeligi esas alinmalidir.
export const letterGradeScale: LetterGradeRow[] = [
  { minScore: 90, letter: "AA", gpa: 4.0 },
  { minScore: 85, letter: "BA", gpa: 3.5 },
  { minScore: 80, letter: "BB", gpa: 3.0 },
  { minScore: 75, letter: "CB", gpa: 2.5 },
  { minScore: 70, letter: "CC", gpa: 2.0 },
  { minScore: 65, letter: "DC", gpa: 1.5 },
  { minScore: 60, letter: "DD", gpa: 1.0 },
  { minScore: 50, letter: "FD", gpa: 0.5 },
  { minScore: 0, letter: "FF", gpa: 0.0 },
];

export function getLetterGrade(score: number): LetterGradeRow | null {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return null;
  }

  return (
    letterGradeScale.find((row) => score >= row.minScore) ??
    letterGradeScale[letterGradeScale.length - 1]
  );
}
