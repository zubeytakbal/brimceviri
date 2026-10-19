// Hızlı çeviri kartlarının hesabı (istemcide çalışır; birim kayıt dosyasını yüklemez). Sonuç convert() ile aynıdır.
import type { HizliBirim, HizliKategori } from "./hizliCevirmeVeri";
import { temperatureFromCelsius, temperatureToCelsius } from "./temperature";

export function birimCevir(k: HizliKategori, v: number, from: HizliBirim, to: HizliBirim) {
  if (k.sicaklik) return temperatureFromCelsius(temperatureToCelsius(v, from.s), to.s);
  const taban = from.inv ? from.f / v : v * from.f;
  return to.inv ? to.f / taban : taban / to.f;
}

/** Beton hacmi (m³): en × boy × kalınlık, fire payı eklenmiş. */
export const betonHacmi = (enM: number, boyM: number, kalinlikCm: number, firePct: number) => enM * boyM * (kalinlikCm / 100) * (1 + firePct / 100);

/** Akım (A): tek faz I = P / (V × cos φ), üç faz I = P / (√3 × V × cos φ). */
export const kwAmper = (kw: number, volt: number, ucFaz: boolean, cosPhi: number) => (kw * 1000) / ((ucFaz ? Math.sqrt(3) : 1) * volt * cosPhi);

/** Aktif güç (kW) = görünür güç (kVA) × cos φ. */
export const kvaKw = (kva: number, cosPhi: number) => kva * cosPhi;

/** İnşaat demiri ağırlığı (kg): π/4 × d² × 7850 / 10⁶ × uzunluk × adet (d mm, uzunluk m). */
export const demirKg = (dMm: number, uzunlukM: number, adet: number) => ((Math.PI / 4) * dMm * dMm * 7850) / 1e6 * uzunlukM * adet;

/** En büyük ortak bölen ve en küçük ortak kat (pozitif tam sayılar). */
export function ebobEkok(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return { ebob: x, ekok: x ? Math.abs(a * b) / x : 0 };
}
