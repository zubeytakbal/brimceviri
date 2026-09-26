// Doviz bilesenlerinin ortak yardimcilari. Etiketler sunucudan duz veri
// olarak gelir (istemci bilesenlerine fonksiyon aktarilamaz); "{t}" gibi
// yer tutucular burada doldurulur.

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

// "1.234,56" (tr/de), "1,234.56" (en) ve "1234.56" girislerini kabul eder.
// Bengalce (০-৯) ve Arapca-Hint (٠-٩ / ۰-۹) rakamlari da kabul edilir.
const NATIVE_DIGIT_ZEROS = [0x09e6, 0x0660, 0x06f0];

function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯٠-٩۰-۹]/g, (char) => {
    const code = char.charCodeAt(0);
    const zero = NATIVE_DIGIT_ZEROS.find((start) => code >= start && code <= start + 9) ?? code;
    return String(code - zero);
  });
}

export function parseAmountInput(raw: string): number | null {
  const value = toAsciiDigits(raw).replace(/[\s  ']/g, "").replace(/٫/g, ".").replace(/٬/g, ",");
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
