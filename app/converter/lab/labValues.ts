// Tahlil sonuçlarında geleneksel birim (ABD ve Türkiye laboratuvarları: mg/dL, g/dL, µg/dL…) ile SI birimi (mmol/L, µmol/L,
// g/L…) arasındaki çevirme katsayıları. Katsayılar maddenin mol kütlesinden gelir ve uluslararası SI dönüşüm tablolarındaki
// standart değerlerdir (ör. kolesterol 386,65 g/mol → mg/dL × 0,02586 = mmol/L).

export type LabTest = {
  id: string;
  name: string;
  /** Geleneksel birim (Türkiye'deki raporların çoğu). */
  conventional: string;
  si: string;
  /** conventional × factor = SI */
  factor: number;
  note?: string;
};

export const LAB_TESTS: LabTest[] = [
  { id: "kolesterol", name: "Kolesterol (total, LDL, HDL)", conventional: "mg/dL", si: "mmol/L", factor: 0.02586, note: "Total, LDL ve HDL kolesterol için aynı katsayı kullanılır." },
  { id: "trigliserid", name: "Trigliserid", conventional: "mg/dL", si: "mmol/L", factor: 0.01129 },
  { id: "glukoz", name: "Glukoz (kan şekeri)", conventional: "mg/dL", si: "mmol/L", factor: 1 / 18.016 },
  { id: "kreatinin", name: "Kreatinin", conventional: "mg/dL", si: "µmol/L", factor: 88.4 },
  { id: "ure", name: "Üre", conventional: "mg/dL", si: "mmol/L", factor: 0.1665, note: "Türkiye'deki raporlarda çoğunlukla üre verilir; BUN = üre ÷ 2,14." },
  { id: "bun", name: "Kan üre azotu (BUN)", conventional: "mg/dL", si: "mmol/L", factor: 0.357 },
  { id: "urik-asit", name: "Ürik asit", conventional: "mg/dL", si: "µmol/L", factor: 59.48 },
  { id: "kalsiyum", name: "Kalsiyum", conventional: "mg/dL", si: "mmol/L", factor: 0.2495 },
  { id: "magnezyum", name: "Magnezyum", conventional: "mg/dL", si: "mmol/L", factor: 0.4114 },
  { id: "fosfor", name: "Fosfor (inorganik)", conventional: "mg/dL", si: "mmol/L", factor: 0.3229 },
  { id: "bilirubin", name: "Bilirubin (total, direkt)", conventional: "mg/dL", si: "µmol/L", factor: 17.1 },
  { id: "albumin", name: "Albümin", conventional: "g/dL", si: "g/L", factor: 10 },
  { id: "total-protein", name: "Total protein", conventional: "g/dL", si: "g/L", factor: 10 },
  { id: "hemoglobin", name: "Hemoglobin", conventional: "g/dL", si: "g/L", factor: 10, note: "Bazı Avrupa raporlarında mmol/L kullanılır: g/dL × 0,6206 = mmol/L." },
  { id: "demir", name: "Demir (serum)", conventional: "µg/dL", si: "µmol/L", factor: 0.1791 },
  { id: "b12", name: "B12 vitamini", conventional: "pg/mL", si: "pmol/L", factor: 0.7378 },
  { id: "folat", name: "Folat (folik asit)", conventional: "ng/mL", si: "nmol/L", factor: 2.266 },
  { id: "d-vitamini", name: "D vitamini (25-OH)", conventional: "ng/mL", si: "nmol/L", factor: 2.496 },
];

export const toSi = (test: LabTest, value: number) => value * test.factor;
export const toConventional = (test: LabTest, value: number) => value / test.factor;

/** HbA1c: NGSP yüzdesi ↔ IFCC mmol/mol (ana denklem: IFCC = (NGSP − 2,152) × 10,929). */
export const hba1cToIfcc = (percent: number) => (percent - 2.152) * 10.929;
export const ifccToHba1c = (mmolMol: number) => mmolMol / 10.929 + 2.152;
/** Tahmini ortalama glukoz (ADAG çalışması): eAG (mg/dL) = 28,7 × HbA1c − 46,7. */
export const estimatedAverageGlucose = (percent: number) => 28.7 * percent - 46.7;
