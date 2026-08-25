export type RingSizeRow = {
  diameterMm: number;
  circumferenceMm: number;
  us: number;
  uk: string;
};

// Yuzuk beden tablosu -- ayakkabinin aksine burada marka farki yok,
// kuyumculuk sektorunde kuresel olarak standart bir tablo kullaniliyor
// (ic cap/cevre fiziksel olarak birbirinden turetilir, sadece US/UK
// numaralandirmasi endustri standardidir). Turkiye'de "TR bedeni"
// dogrudan ic cap (mm) olarak ifade edilir.
//
// Kaynak: uluslararasi kuyumculuk siteleri (Angara, 25karats,
// ANTOANETTA gibi) arasinda ortak olan standart mm/US/UK tablosu.
export const ringSizeRows: RingSizeRow[] = [
  { diameterMm: 14.0, circumferenceMm: 44.0, us: 3, uk: "F" },
  { diameterMm: 14.4, circumferenceMm: 45.5, us: 3.5, uk: "G" },
  { diameterMm: 14.9, circumferenceMm: 46.8, us: 4, uk: "H" },
  { diameterMm: 15.3, circumferenceMm: 48.0, us: 4.5, uk: "I" },
  { diameterMm: 15.7, circumferenceMm: 49.3, us: 5, uk: "J" },
  { diameterMm: 16.1, circumferenceMm: 50.6, us: 5.5, uk: "K" },
  { diameterMm: 16.5, circumferenceMm: 51.8, us: 6, uk: "L" },
  { diameterMm: 16.9, circumferenceMm: 53.1, us: 6.5, uk: "M" },
  { diameterMm: 17.3, circumferenceMm: 54.4, us: 7, uk: "N" },
  { diameterMm: 17.7, circumferenceMm: 55.7, us: 7.5, uk: "O" },
  { diameterMm: 18.2, circumferenceMm: 57.0, us: 8, uk: "P" },
  { diameterMm: 18.6, circumferenceMm: 58.3, us: 8.5, uk: "Q" },
  { diameterMm: 19.0, circumferenceMm: 59.5, us: 9, uk: "R" },
  { diameterMm: 19.4, circumferenceMm: 60.8, us: 9.5, uk: "S" },
  { diameterMm: 19.8, circumferenceMm: 62.1, us: 10, uk: "T" },
  { diameterMm: 20.2, circumferenceMm: 63.4, us: 10.5, uk: "U" },
  { diameterMm: 20.6, circumferenceMm: 64.6, us: 11, uk: "V" },
  { diameterMm: 21.0, circumferenceMm: 65.9, us: 11.5, uk: "W" },
  { diameterMm: 21.4, circumferenceMm: 67.2, us: 12, uk: "X" },
];

export type RingSizeSystem = "diameterMm" | "circumferenceMm" | "us" | "uk";

export function findRingSizeRowByNumber(
  system: "diameterMm" | "circumferenceMm" | "us",
  value: number
): RingSizeRow {
  return ringSizeRows.reduce((closest, row) =>
    Math.abs(row[system] - value) < Math.abs(closest[system] - value)
      ? row
      : closest
  );
}

export function findRingSizeRowByUk(uk: string): RingSizeRow {
  return ringSizeRows.find((row) => row.uk === uk) ?? ringSizeRows[0];
}
