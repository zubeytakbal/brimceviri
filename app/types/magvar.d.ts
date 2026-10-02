// magvar (WMM2025, MIT) tip tanımı: yalnızca kullandığımız fonksiyon.
declare module "magvar" {
  /** Manyetik sapma (derece, doğuya pozitif). altitude km; when ondalık yıl ya da Date. */
  export function magvar(latitude: number, longitude: number, altitude?: number, when?: number | Date): number;
}
