// SOFA (Sequential Organ Failure Assessment) hesaplama -- 6 organ
// sisteminin (solunum, koagulasyon, karaciger, kardiyovaskuler, SSS,
// bobrek) her biri icin 0-4 puan uzerinden yogun bakimda organ
// yetmezligi ciddiyetini olcen klinik bir skordur. Her alt puan,
// kullanicinin secim yaptigi standart kriter araliklarindan gelir --
// bu arac hesap yapmaz, secilen puanlari toplar.

export type SofaSubScore = 0 | 1 | 2 | 3 | 4;

export type SofaInput = {
  respiratory: SofaSubScore;
  coagulation: SofaSubScore;
  liver: SofaSubScore;
  cardiovascular: SofaSubScore;
  cns: SofaSubScore;
  renal: SofaSubScore;
};

export function calculateSofa(input: SofaInput): number {
  const { respiratory, coagulation, liver, cardiovascular, cns, renal } =
    input;

  return respiratory + coagulation + liver + cardiovascular + cns + renal;
}
