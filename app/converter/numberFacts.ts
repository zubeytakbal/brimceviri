export type NumberFactsLocale = "tr" | "uz";

export interface NumberFacts {
  value: number;
  square: number;
  cube: number;
  squareRoot: number;
  isPerfectSquare: boolean;
  cubeRoot: number;
  isPerfectCube: boolean;
  isPrime: boolean;
  primeReason: string;
  divisors: number[];
  divisorCount: number;
  sumOfDivisors: number;
  isPerfectNumber: boolean;
  factorial: string | null;
  romanNumeral: string | null;
}

// Statik olarak on-cede uretilen (SEO) sayfa araligi -- generateStaticParams
// bu araligi kullanir. Canli motor (kullanicinin sayfada baska bir sayi
// girebildigi hesaplayici) ise cok daha genis bir aralikta calisir, MAX_LIVE_NUMBER'a kadar.
export const MIN_NUMBER = 1;
export const MAX_NUMBER = 100;

// Sitemap'e eklenen ve sayfa ici onceki/sonraki gezinmesinde kullanilan
// aralik -- bu sayilar build aninda statik uretilmez (yalnizca 1-100
// uretilir), ilk istekte on-demand render edilip cache'lenir.
export const MAX_LINKABLE_NUMBER = 10_000;

export const MIN_LIVE_NUMBER = 1;
export const MAX_LIVE_NUMBER = 1_000_000;

const MAX_FACTORIAL_N = 20;
const MAX_ROMAN_NUMERAL_N = 3999;

function computeIsPrime(
  n: number,
  locale: NumberFactsLocale
): { isPrime: boolean; reason: string } {
  if (locale === "uz") {
    if (n < 2) {
      return { isPrime: false, reason: `${n}, 1'dan katta va faqat 1 va o'ziga bo'linadigan son bo'lmagani uchun tub son emas.` };
    }
    if (n === 2) {
      return { isPrime: true, reason: "2, faqat 1 ga va o'ziga to'liq bo'linganligi uchun tub sondir (va yagona juft tub sondir)." };
    }
    if (n % 2 === 0) {
      return { isPrime: false, reason: `${n}, 2 ga to'liq bo'linganligi uchun tub son emas.` };
    }

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        return { isPrime: false, reason: `${n}, ${i} ga to'liq bo'linganligi uchun tub son emas.` };
      }
    }

    return { isPrime: true, reason: `${n}, 1 va o'zidan boshqa hech qanday songa to'liq bo'linmaganligi uchun tub sondir.` };
  }

  if (n < 2) {
    return { isPrime: false, reason: `${n}, 1'den büyük ve yalnızca 1 ve kendisine bölünebilen bir sayı olmadığı için asal sayı değildir.` };
  }
  if (n === 2) {
    return { isPrime: true, reason: "2, yalnızca 1'e ve kendisine tam bölündüğü için asal sayıdır (ve tek çift asal sayıdır)." };
  }
  if (n % 2 === 0) {
    return { isPrime: false, reason: `${n}, 2'ye tam bölündüğü için asal sayı değildir.` };
  }

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return { isPrime: false, reason: `${n}, ${i}'e tam bölündüğü için asal sayı değildir.` };
    }
  }

  return { isPrime: true, reason: `${n}, 1 ve kendisi dışında hiçbir sayıya tam bölünmediği için asal sayıdır.` };
}

// O(sqrt(n)) karmasikliginda bolen bulma -- buyuk sayilarda bile (canli motor
// icin) hizli calismasi icin bolen ciftlerini (d, n/d) esleyerek bulur.
function computeDivisors(n: number): number[] {
  const smallDivisors: number[] = [];
  const largeDivisors: number[] = [];

  for (let i = 1; i * i <= n; i += 1) {
    if (n % i === 0) {
      smallDivisors.push(i);
      const pair = n / i;
      if (pair !== i) {
        largeDivisors.push(pair);
      }
    }
  }

  return [...smallDivisors, ...largeDivisors.reverse()];
}

function computeFactorial(n: number, locale: NumberFactsLocale): string | null {
  if (n < 0 || n > MAX_FACTORIAL_N) {
    return null;
  }
  let value = BigInt(1);
  for (let i = 2; i <= n; i += 1) {
    value *= BigInt(i);
  }
  return value.toLocaleString(locale === "uz" ? "uz-UZ" : "tr-TR");
}

const ROMAN_VALUES: Array<[number, string]> = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function computeRomanNumeral(n: number): string | null {
  if (n < 1 || n > MAX_ROMAN_NUMERAL_N) {
    return null;
  }

  let remaining = n;
  let result = "";
  for (const [value, symbol] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function getNumberFacts(
  n: number,
  locale: NumberFactsLocale = "tr"
): NumberFacts | null {
  if (!Number.isInteger(n) || n < MIN_LIVE_NUMBER || n > MAX_LIVE_NUMBER) {
    return null;
  }

  const square = n * n;
  const cube = n * n * n;
  const squareRoot = Math.sqrt(n);
  const isPerfectSquare = Number.isInteger(squareRoot);
  const cubeRoot = Math.cbrt(n);
  const isPerfectCube = Number.isInteger(Math.round(cubeRoot * 1e6) / 1e6);
  const { isPrime, reason } = computeIsPrime(n, locale);
  const divisors = computeDivisors(n);
  const sumOfDivisors = divisors.reduce((sum, d) => sum + d, 0);
  const isPerfectNumber = sumOfDivisors - n === n && n > 1;

  return {
    value: n,
    square,
    cube,
    squareRoot,
    isPerfectSquare,
    cubeRoot,
    isPerfectCube,
    isPrime,
    primeReason: reason,
    divisors,
    divisorCount: divisors.length,
    sumOfDivisors,
    isPerfectNumber,
    factorial: computeFactorial(n, locale),
    romanNumeral: computeRomanNumeral(n),
  };
}

export function getAllNumberFactsRange(): number[] {
  return Array.from({ length: MAX_NUMBER - MIN_NUMBER + 1 }, (_, i) => i + MIN_NUMBER);
}

export function getAllLinkableNumbers(): number[] {
  return Array.from({ length: MAX_LINKABLE_NUMBER - MIN_NUMBER + 1 }, (_, i) => i + MIN_NUMBER);
}
