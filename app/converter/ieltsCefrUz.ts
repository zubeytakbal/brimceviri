// IELTS bali va CEFR (Yevropa til darajalari umumiy tizimi) darajasi
// orasidagi taxminiy mos kelish. IELTS.org, British Council va
// Cambridge English rasmiy manbalari bu ikkisi orasida qat'iy bir
// martali moslik yo'qligini alohida ta'kidlaydi -- IELTS 9 balli
// uzluksiz shkala, CEFR esa kенг darajalar tizimi bo'lgani uchun
// chegara ballar "borderline" (chegara oldi) hisoblanadi. Shu sababli
// bu jadval oraliqlar shaklida berilgan, aniq bitta ball emas.

export type IeltsCefrRow = {
  cefrLevel: string;
  cefrLabel: string;
  ieltsRange: string;
  minBand: number;
  maxBand: number;
};

export const ieltsCefrTable: IeltsCefrRow[] = [
  { cefrLevel: "C2", cefrLabel: "Yuqori daraja (Mastery)", ieltsRange: "8.0 - 9.0", minBand: 8.0, maxBand: 9.0 },
  { cefrLevel: "C1", cefrLabel: "Ilg'or daraja (Advanced)", ieltsRange: "7.0 - 7.5", minBand: 7.0, maxBand: 7.5 },
  { cefrLevel: "B2", cefrLabel: "Yuqori o'rta daraja (Upper-Intermediate)", ieltsRange: "5.5 - 6.5", minBand: 5.5, maxBand: 6.5 },
  { cefrLevel: "B1", cefrLabel: "O'rta daraja (Intermediate)", ieltsRange: "4.0 - 5.0", minBand: 4.0, maxBand: 5.0 },
  { cefrLevel: "A2", cefrLabel: "Boshlang'ich daraja (Elementary)", ieltsRange: "3.0 - 3.5", minBand: 3.0, maxBand: 3.5 },
];

export function findCefrByIeltsBand(band: number): IeltsCefrRow | null {
  if (!Number.isFinite(band) || band < 0 || band > 9) {
    return null;
  }

  const match = ieltsCefrTable.find(
    (row) => band >= row.minBand && band <= row.maxBand
  );

  if (match) {
    return match;
  }

  if (band < 3.0) {
    return { cefrLevel: "A1 yoki undan past", cefrLabel: "Boshlang'ich daraja", ieltsRange: "< 3.0", minBand: 0, maxBand: 2.5 };
  }

  return null;
}
