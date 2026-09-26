// Doviz bilesenlerinin ortak yardimcilari. Etiketler sunucudan duz veri
// olarak gelir (istemci bilesenlerine fonksiyon aktarilamaz); "{t}" gibi
// yer tutucular burada doldurulur.

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

// "1.234,56" (tr/de), "1,234.56" (en) ve "1234.56" girislerini kabul eder.
export function parseAmountInput(raw: string): number | null {
  const value = raw.replace(/[\s ']/g, "");
  if (!value) return null;
  let normalized = value;
  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");
  if (lastComma > -1 && lastDot > -1) {
    normalized = lastComma > lastDot ? value.replace(/\./g, "").replace(",", ".") : value.replace(/,/g, "");
  } else if (lastComma > -1) {
    normalized = value.replace(",", ".");
  }
  if (!/^\d*\.?\d+$|^\d+\.$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
