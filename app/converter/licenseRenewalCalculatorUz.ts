// O'zbekistonda barcha haydovchilik guvohnomasi toifalari (A1, A, B, BE,
// C, CE, D, DE) bir xil 10 yillik amal qilish muddatiga ega -- Turkiyadagi
// kabi tijorat/og'ir transport uchun qisqartirilgan (5 yillik) alohida
// muddat yo'q (kun.uz va boshqa mustaqil manbalardan tekshirilgan).
// Yoshga bog'liq qisqartirilgan muddat (Turkiyadagi 65/80 yosh chegarasi
// kabi) uchun O'zbekistonda aniq, sobit bir qonun moddasi topilmadi --
// shuning uchun bu funksiyada bunday taxmin qilinmaydi.

const UZ_LICENSE_VALIDITY_YEARS = 10;

export type UzLicenseRenewalInput = {
  issueDate: string; // ISO sana (YYYY-MM-DD)
};

export type UzLicenseRenewalResult = {
  expiryDate: string; // ISO sana
  daysRemaining: number;
  isExpired: boolean;
};

function parseIsoDate(value: string): Date | null {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateUzLicenseRenewal(
  input: UzLicenseRenewalInput,
): UzLicenseRenewalResult | null {
  const issueDate = parseIsoDate(input.issueDate);

  if (!issueDate) {
    return null;
  }

  const expiryDate = addYears(issueDate, UZ_LICENSE_VALIDITY_YEARS);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysRemaining = Math.round((expiryDate.getTime() - today.getTime()) / msPerDay);

  return {
    expiryDate: formatIsoDate(expiryDate),
    daysRemaining,
    isExpired: daysRemaining < 0,
  };
}
