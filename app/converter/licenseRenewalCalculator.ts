import { licenseClasses, type LicenseClassId } from "./licenseClassFinder";

// Kaynak: Karayollari Trafik Yonetmeligi + birden fazla bagimsiz kaynaktan
// (sozcu.com.tr, karar.com, ehliyyet.com.tr, dijipol.com, cumhuriyet.com.tr)
// capraz dogrulanan sureler. Standart yenileme suresi sinifa gore sabit
// (B/B1/BE/M/A1/A2/A = 10 yil, C/C1/C1E/CE/D1/D1E/D/DE = 5 yil,
// licenseClassFinder.ts'teki validityYears alaniyla ayni). 65/80 yas
// esikleri ICIN KESIN BIR HESAPLAMA YAPILMAZ -- kaynaklar bunun sabit bir
// yasa maddesi degil, doktorun duzenledigi saglik raporunun gecerlilik
// suresine (genellikle 65+ icin ~3 yil, 80+ icin ~2 yil, ama kisiye gore
// degisebilir) bagli oldugunu acikca belirtiyor. Bu yuzden yas esigine
// giren kullanicilara net bir tarih yerine bir uyari notu gosterilir --
// materyal hub'daki variabilityNote yaklasimiyla ayni prensip: riskli/
// degisken bir degeri kesinmis gibi sunmamak.

export type LicenseRenewalInput = {
  licenseClassId: LicenseClassId;
  issueDate: string; // ISO tarih (YYYY-MM-DD)
  birthDate: string; // ISO tarih (YYYY-MM-DD)
};

export type AgeCaution = "none" | "65-plus" | "80-plus";

export type LicenseRenewalResult = {
  expiryDate: string; // ISO tarih
  daysRemaining: number;
  isExpired: boolean;
  ageAtExpiry: number;
  ageCaution: AgeCaution;
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

// toISOString() UTC'ye cevirir; negatif UTC ofsetli saat dilimlerinde
// (orn. GMT-07:00) yerel gece yarisi bir onceki gune kayar. Yerel
// tarih bilesenlerini dogrudan okuyup formatlayarak bu kaymayi onler.
function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateAgeAt(birthDate: Date, atDate: Date): number {
  let age = atDate.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    atDate.getMonth() > birthDate.getMonth() ||
    (atDate.getMonth() === birthDate.getMonth() && atDate.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }
  return age;
}

export function calculateLicenseRenewal(
  input: LicenseRenewalInput,
): LicenseRenewalResult | null {
  const issueDate = parseIsoDate(input.issueDate);
  const birthDate = parseIsoDate(input.birthDate);

  if (!issueDate || !birthDate) {
    return null;
  }

  const licenseClass = licenseClasses[input.licenseClassId];
  if (!licenseClass) {
    return null;
  }

  const expiryDate = addYears(issueDate, licenseClass.validityYears);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysRemaining = Math.round((expiryDate.getTime() - today.getTime()) / msPerDay);
  const ageAtExpiry = calculateAgeAt(birthDate, expiryDate);

  let ageCaution: AgeCaution = "none";
  if (ageAtExpiry >= 80) {
    ageCaution = "80-plus";
  } else if (ageAtExpiry >= 65) {
    ageCaution = "65-plus";
  }

  return {
    expiryDate: formatIsoDate(expiryDate),
    daysRemaining,
    isExpired: daysRemaining < 0,
    ageAtExpiry,
    ageCaution,
  };
}
