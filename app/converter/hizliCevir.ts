// Hızlı çeviri kartlarının hesabı (istemcide çalışır; birim kayıt dosyasını yüklemez). Sonuç convert() ile aynıdır.
import type { HizliBirim, HizliKategori } from "./hizliCevirmeVeri";
import { temperatureFromCelsius, temperatureToCelsius } from "./temperature";

export function birimCevir(k: HizliKategori, v: number, from: HizliBirim, to: HizliBirim) {
  if (k.sicaklik) return temperatureFromCelsius(temperatureToCelsius(v, from.s), to.s);
  const taban = from.inv ? from.f / v : v * from.f;
  return to.inv ? to.f / taban : taban / to.f;
}
