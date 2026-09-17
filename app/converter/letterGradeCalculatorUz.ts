export type LetterGradeRow = {
  minScore: number;
  letter: string;
  gpa: number;
};

// O'zbekiston oliy ta'lim tizimida asosan 100 balli reyting tizimi
// ishlatiladi, Turkiyadagi kabi yagona standart harf-baho jadvali yo'q
// (uz.wikipedia.org "Baholash tizimi (GPA)" va NUU manbalari). Shu
// sababli bu yerda xalqaro miqyosda GPA hisob-kitobida keng
// qo'llaniladigan oddiy A-F / 4,0 balli jadval ishlatiladi -- bu
// O'zbekistonning rasmiy tizimi emas, chet elga o'qishga kirish yoki
// diplom ekvivalentligi kabi hollarda foydali umumiy mos yozuv.
export const letterGradeScale: LetterGradeRow[] = [
  { minScore: 90, letter: "A", gpa: 4.0 },
  { minScore: 80, letter: "B", gpa: 3.0 },
  { minScore: 70, letter: "C", gpa: 2.0 },
  { minScore: 60, letter: "D", gpa: 1.0 },
  { minScore: 0, letter: "F", gpa: 0.0 },
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
