// Raqamni o'zbekcha so'zga aylantirish -- toifadagi hujjatlar (shartnoma,
// chek, faktura) uchun summani yozuv bilan ifodalash uchun ishlatiladi.
// Grammatika qoidalari: "yuz" va "ming" old qo'shimchasiz ishlatiladi
// (100 = "yuz", 1000 = "ming"), lekin xalqaro qarz so'zlar bo'lgan
// "million"/"milliard"/"trillion" uchun bittalik holatda "bir" old
// qo'shimchasi ishlatiladi (1 000 000 = "bir million") -- bu Vikipediya
// va keng tarqalgan foydalanish namunalari (masalan, "Bir million
// o'zbek dasturchilari") bilan tasdiqlangan.

const DIGIT_WORDS = [
  "",
  "bir",
  "ikki",
  "uch",
  "to'rt",
  "besh",
  "olti",
  "yetti",
  "sakkiz",
  "to'qqiz",
];

const TENS_WORDS = [
  "",
  "o'n",
  "yigirma",
  "o'ttiz",
  "qirq",
  "ellik",
  "oltmish",
  "yetmish",
  "sakson",
  "to'qson",
];

const SCALE_WORDS = ["", "ming", "million", "milliard", "trillion"];

function convertThreeDigitGroup(value: number): string {
  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;
  const tens = Math.floor(remainder / 10);
  const ones = remainder % 10;

  const parts: string[] = [];

  if (hundreds > 0) {
    if (hundreds > 1) {
      parts.push(DIGIT_WORDS[hundreds]);
    }
    parts.push("yuz");
  }

  if (tens > 0) {
    parts.push(TENS_WORDS[tens]);
  }

  if (ones > 0) {
    parts.push(DIGIT_WORDS[ones]);
  }

  return parts.join(" ");
}

export function convertIntegerToUzbekWords(value: number): string | null {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    return null;
  }

  if (value === 0) {
    return "nol";
  }

  const isNegative = value < 0;
  let remaining = Math.abs(value);

  if (remaining >= 10 ** 15) {
    return null;
  }

  const groups: number[] = [];
  while (remaining > 0) {
    groups.push(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const phrases: string[] = [];

  for (let scaleIndex = groups.length - 1; scaleIndex >= 0; scaleIndex -= 1) {
    const groupValue = groups[scaleIndex];

    if (groupValue === 0) {
      continue;
    }

    const scaleWord = SCALE_WORDS[scaleIndex];
    const groupWords = convertThreeDigitGroup(groupValue);

    if (!scaleWord) {
      phrases.push(groupWords);
    } else if (scaleIndex === 1) {
      // "ming" (thousand) never takes a leading "bir" for a bare 1.
      phrases.push(groupValue === 1 ? scaleWord : `${groupWords} ${scaleWord}`);
    } else {
      // "million"/"milliard"/"trillion" take a leading "bir" for a bare 1.
      phrases.push(groupValue === 1 ? `bir ${scaleWord}` : `${groupWords} ${scaleWord}`);
    }
  }

  const result = phrases.join(" ");

  return isNegative ? `minus ${result}` : result;
}

export function convertAmountToUzbekWords(
  value: number,
  currencyLabel?: string
): string | null {
  const words = convertIntegerToUzbekWords(Math.trunc(value));

  if (words === null) {
    return null;
  }

  return currencyLabel ? `${words} ${currencyLabel}` : words;
}
