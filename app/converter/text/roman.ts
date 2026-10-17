// Roma rakamları: standart (çıkarmalı) yazım 1–3999. Daha büyük sayılar için üst çizgi (vinculum) binle çarpar: V̅ = 5000.
// Okumada standart dışı ama görülen yazımlar (IIII, VV, IC) de toplanır; sonuç standart yazımla karşılaştırılarak uyarı verilir.

const PAIRS: Array<[number, string]> = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];
const VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const BAR = "̅";

function basic(n: number) {
  let out = "";
  for (const [v, s] of PAIRS) while (n >= v) { out += s; n -= v; }
  return out;
}

/** Sayıyı Roma rakamına çevirir. 1–3999 standart; 4000–3 999 999 arası binler üst çizgiyle yazılır. */
export function toRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3_999_999) return null;
  if (n < 4000) return basic(n);
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  const barred = Array.from(basic(th)).map((c) => c + BAR).join("");
  return barred + basic(rest);
}

export type RomanParse = { value: number; canonical: string; standard: boolean };

/** Roma rakamını sayıya çevirir. Geçersiz harf varsa null. Üst çizgili harfler binle çarpılır. */
export function fromRoman(input: string): RomanParse | null {
  const text = input.normalize("NFD").toUpperCase().replace(/\s+/g, "");
  if (!text) return null;
  const symbols: number[] = [];
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const v = VALUE[chars[i]];
    if (v === undefined) return null;
    const barred = chars[i + 1] === BAR;
    if (barred) i++;
    symbols.push(barred ? v * 1000 : v);
  }
  let value = 0;
  for (let i = 0; i < symbols.length; i++) value += symbols[i] < (symbols[i + 1] ?? 0) ? -symbols[i] : symbols[i];
  if (value < 1) return null;
  const canonical = toRoman(value) ?? "";
  const plain = chars.join("").normalize("NFC");
  return { value, canonical, standard: canonical.normalize("NFC") === plain };
}
