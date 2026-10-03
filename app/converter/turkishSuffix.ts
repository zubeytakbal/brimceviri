// Turkce ek uyumu yardimcilari: ozel isim ve sayilara kesme isaretiyle hal eki ekler.

const VOWELS = "aeıioöuü";
const HARD = "fstkçşhp";

/** Sayinin okunusundaki son kelime ("6" -> "altı", "40" -> "kırk", "100" -> "yüz"). */
function numberLastWord(n: number): string {
  const ones = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  const tens = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
  n = Math.abs(Math.trunc(n));
  if (n === 0) return "sıfır";
  if (n % 10) return ones[n % 10];
  if (n % 100) return tens[(n % 100) / 10];
  if (n % 1000) return "yüz";
  if (n % 1e6) return "bin";
  if (n % 1e9) return "milyon";
  return "milyar";
}

/** Ekin uyumunu belirleyecek "okunus": sondaki sayi okunusa cevrilir (K2 -> "iki"). */
function spoken(word: string) {
  const trimmed = word.trim().replace(/[)\]"'’]+$/, "");
  const digits = /(\d[\d.,]*)$/.exec(trimmed);
  if (digits) {
    const n = Number(digits[1].replace(/[.,](?=\d{3}\b)/g, "").replace(",", "."));
    // Ondalikli sayilar icin ondalik kismin son rakami okunur ("2,5" -> "beş").
    const decimals = /[.,](\d+)$/.exec(digits[1]);
    return numberLastWord(decimals && decimals[1].length < 3 ? Number(decimals[1]) : n);
  }
  return trimmed.toLocaleLowerCase("tr-TR");
}

function info(word: string) {
  const s = spoken(word);
  const vowels = [...s].filter((c) => VOWELS.includes(c));
  const lastVowel = vowels[vowels.length - 1] ?? "e";
  const lastChar = s[s.length - 1] ?? "";
  return {
    back: "aıou".includes(lastVowel),
    round: "ouöü".includes(lastVowel),
    endsWithVowel: VOWELS.includes(lastChar),
    hard: HARD.includes(lastChar),
  };
}

/** Dar unlu (ı/i/u/ü) */
function narrow(word: string) {
  const i = info(word);
  return i.back ? (i.round ? "u" : "ı") : i.round ? "ü" : "i";
}

/** Genis unlu (a/e) */
function wide(word: string) {
  return info(word).back ? "a" : "e";
}

/** Soru eki: "Mars mı", "Jüpiter mi", "Plüton mu", "Merkür mü". */
export function trQuestionParticle(value: string | number) {
  const word = String(value);
  return `m${narrow(word)}`;
}

/** "Mars mı Ay mı" */
export function trEitherQuestion(a: string, b: string) {
  return `${a} ${trQuestionParticle(a)} ${b} ${trQuestionParticle(b)}`;
}

/** Ilgi hali: Ankara'nın, Mars'ın, 6'nın, İzmir'in */
export function trGenitive(value: string | number) {
  const word = String(value);
  return `${word}'${info(word).endsWithVowel ? "n" : ""}${narrow(word)}n`;
}

/**
 * Tamlama ile biten adlar (Amerika Birleşik Devletleri, Orta Afrika Cumhuriyeti) iyelik eki taşır;
 * hal eki "n" kaynaştırmasıyla gelir: Devletleri'nde, Cumhuriyeti'nden, Emirlikleri'ne.
 */
const IYELIKLI = /\s\S*(Cumhuriyeti|Devletleri|Emirlikleri|Adaları|Yönetimi|Ginesi|Sahili|Krallığı|Federasyonu|Birliği|Topluluğu)$/;
const iyelikli = (word: string) => IYELIKLI.test(word.trim());

/** Ayrilma hali: Ay'dan, Mars'tan, Dünya'dan, 3'ten */
export function trAblative(value: string | number) {
  const word = String(value);
  if (iyelikli(word)) return `${word}'nd${wide(word)}n`;
  return `${word}'${info(word).hard ? "t" : "d"}${wide(word)}n`;
}

/** Bulunma hali: Ankara'da, Mars'ta, İzmir'de */
export function trLocative(value: string | number) {
  const word = String(value);
  if (iyelikli(word)) return `${word}'nd${wide(word)}`;
  return `${word}'${info(word).hard ? "t" : "d"}${wide(word)}`;
}

/** Yonelme hali: Everest'e, Ankara'ya, 6'ya, 3'e */
export function trDative(value: string | number) {
  const word = String(value);
  if (iyelikli(word)) return `${word}'n${wide(word)}`;
  return `${word}'${info(word).endsWithVowel ? "y" : ""}${wide(word)}`;
}
