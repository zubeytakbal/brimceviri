// Sıcaklık birimleri arası çeviri (santigrat üzerinden). Birim kayıt dosyasını yüklemeden istemcide de kullanılabilir.
export function temperatureToCelsius(value: number, unit: string): number {
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  if (unit === "R") return (value * 5) / 9 - 273.15;
  if (unit === "Re") return (value * 5) / 4;
  return value;
}

export function temperatureFromCelsius(celsius: number, unit: string): number {
  if (unit === "F") return (celsius * 9) / 5 + 32;
  if (unit === "K") return celsius + 273.15;
  if (unit === "R") return (celsius + 273.15) * (9 / 5);
  if (unit === "Re") return (celsius * 4) / 5;
  return celsius;
}
