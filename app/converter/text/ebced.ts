// Ebced (ebced-i kebir) hesabı: Arap alfabesindeki 28 harfin "ebced, hevvez, huttî, kelemen, sa'fes, karaşet, sehaz, dazığ"
// sırasına göre aldığı sayı değerleri. Osmanlı Türkçesine eklenen پ چ ژ گ ڭ harfleri benzer harfin (ب ج ز ك) değerini alır.
// Hareke ve şedde sayılmaz; şeddeli harf yazıldığı gibi bir kez sayılır.

export type EbcedLetter = { char: string; name: string; value: number };

/** Ebced sırasıyla 28 harf. */
export const EBCED_LETTERS: EbcedLetter[] = [
  { char: "ا", name: "elif", value: 1 },
  { char: "ب", name: "be", value: 2 },
  { char: "ج", name: "cim", value: 3 },
  { char: "د", name: "dal", value: 4 },
  { char: "ه", name: "he", value: 5 },
  { char: "و", name: "vav", value: 6 },
  { char: "ز", name: "ze", value: 7 },
  { char: "ح", name: "ha", value: 8 },
  { char: "ط", name: "tı", value: 9 },
  { char: "ي", name: "ye", value: 10 },
  { char: "ك", name: "kef", value: 20 },
  { char: "ل", name: "lam", value: 30 },
  { char: "م", name: "mim", value: 40 },
  { char: "ن", name: "nun", value: 50 },
  { char: "س", name: "sin", value: 60 },
  { char: "ع", name: "ayın", value: 70 },
  { char: "ف", name: "fe", value: 80 },
  { char: "ص", name: "sad", value: 90 },
  { char: "ق", name: "kaf", value: 100 },
  { char: "ر", name: "re", value: 200 },
  { char: "ش", name: "şın", value: 300 },
  { char: "ت", name: "te", value: 400 },
  { char: "ث", name: "se", value: 500 },
  { char: "خ", name: "hı", value: 600 },
  { char: "ذ", name: "zel", value: 700 },
  { char: "ض", name: "dad", value: 800 },
  { char: "ظ", name: "zı", value: 900 },
  { char: "غ", name: "gayın", value: 1000 },
];

/** Yazımda kullanılan diğer biçimler ve Osmanlı harfleri → değerini aldığı harf. */
const VARIANTS: Record<string, string> = {
  "آ": "ا", "أ": "ا", "إ": "ا", "ٱ": "ا", "ء": "ا",
  "ؤ": "و", "ئ": "ي", "ى": "ي", "ی": "ي", "ک": "ك", "ھ": "ه", "ە": "ه",
  "پ": "ب", "چ": "ج", "ژ": "ز", "گ": "ك", "ڭ": "ك",
};

const VALUE = new Map(EBCED_LETTERS.map((l) => [l.char, l]));

export type TaMarbuta = "te" | "he";
export type EbcedPart = { char: string; as: string; name: string; value: number };

/** Metnin ebced değeri. Yuvarlak te (ة) tarih düşürmelerde çoğunlukla te (400), bazı hesaplarda he (5) sayılır. */
export function ebcedValue(text: string, taMarbuta: TaMarbuta = "te") {
  const parts: EbcedPart[] = [];
  let unknown = 0;
  for (const ch of text.normalize("NFC")) {
    if (/[\sً-ٰٟـ.,;:!?()'"«»\-–—،؛؟]/u.test(ch)) continue;
    const base = ch === "ة" ? (taMarbuta === "te" ? "ت" : "ه") : (VARIANTS[ch] ?? ch);
    const letter = VALUE.get(base);
    if (letter) parts.push({ char: ch, as: letter.char, name: letter.name, value: letter.value });
    else unknown++;
  }
  return { total: parts.reduce((s, p) => s + p.value, 0), parts, unknown };
}

const ONES = ["", "ا", "ب", "ج", "د", "ه", "و", "ز", "ح", "ط"];
const TENS = ["", "ي", "ك", "ل", "م", "ن", "س", "ع", "ف", "ص"];
const HUNDREDS = ["", "ق", "ر", "ش", "ت", "ث", "خ", "ذ", "ض", "ظ"];

/** Sayıyı ebced harfleriyle yazar (1–9999): büyük basamak önce. 1453 → غتنج. Binler ön ekle yazılır: 2000 → بغ. */
export function numberToEbced(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 9999) return null;
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  const thousands = th === 0 ? "" : th === 1 ? "غ" : ONES[th] + "غ";
  return thousands + HUNDREDS[Math.floor(rest / 100)] + TENS[Math.floor((rest % 100) / 10)] + ONES[rest % 10];
}
