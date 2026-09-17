// O'zbekiston haydovchilik guvohnomasi toifalarini aniqlash -- O'zbekiston
// Respublikasining haydovchilik guvohnomasi toifalari tizimi Turkiyanikidan
// farq qiladi: og'irlikka qarab bo'lingan qo'shimcha toifalar (C1/C1E/D1/D1E)
// yo'q, mototsikl tizimi bosqichli emas (A1/A2/A o'rniga faqat A1-moped va
// A-mototsikl), va barcha toifalar bir xil 10 yillik amal qilish muddatiga ega.
//
// Manba: gov.uz rasmiy "Haydovchilik guvohnomasi toifalari" sahifasi
// (gov.uz/oz/advice/73/document/137) toifa ta'riflari uchun; yosh chegaralari
// va amal qilish muddati bir nechta mustaqil manbadan (osonprava.uz, kun.uz,
// wikiprocedure.com) o'zaro tekshirilgan -- barchasi bir xil raqamlarda
// birlashadi. A1 (moped/skuter) toifasi 2026-yil 1-yanvardan joriy etiladi.

export type UzLicenseClassId = "A1" | "A" | "B" | "BE" | "C" | "CE" | "D" | "DE";

export type UzLicenseClassInfo = {
  id: UzLicenseClassId;
  label: string;
  minAge: number;
  validityYears: number;
  description: string;
  exampleVehicles: string;
};

export const uzLicenseClasses: Record<UzLicenseClassId, UzLicenseClassInfo> = {
  A1: {
    id: "A1",
    label: "A1",
    minAge: 16,
    validityYears: 10,
    description:
      "Dvigateli hajmi 50 sm³ gacha (yoki elektr dvigateli quvvati 4 kVt gacha), tezligi 50 km/soatdan oshmaydigan moped va skuterlar. 2026-yil 1-yanvardan joriy etiladi; avtomaktabga qatnash shart emas.",
    exampleVehicles: "Mopedlar, 50cc gacha benzinli/elektr skuterlar.",
  },
  A: {
    id: "A",
    label: "A",
    minAge: 16,
    validityYears: 10,
    description: "Mototsikllar va ularga tenglashtirilgan mototransport vositalari.",
    exampleVehicles: "Barcha hajm va quvvatdagi mototsikllar.",
  },
  B: {
    id: "B",
    label: "B",
    minAge: 18,
    validityYears: 10,
    description:
      "To'la vazni 3 500 kg dan oshmaydigan, haydovchidan tashqari o'rindiqlari soni 8 tadan ko'p bo'lmagan avtomobillar; tirkamasining to'la vazni 750 kg dan oshmaydi.",
    exampleVehicles: "Yengil avtomobillar, kichik yuk mashinalari (furgon).",
  },
  BE: {
    id: "BE",
    label: "BE",
    minAge: 18,
    validityYears: 10,
    description:
      "«B» toifadagi avtomobilga tirkamasining to'la vazni 750 kg dan ortiq bo'lgan tirkama ulangan qo'shma avtotransport vositalari.",
    exampleVehicles: "Yengil avtomobilga ulangan og'ir treyler yoki karavan tirkamasi.",
  },
  C: {
    id: "C",
    label: "C",
    minAge: 21,
    validityYears: 10,
    description:
      "To'la vazni 3 500 kg dan ortiq bo'lgan avtotransport vositalari; tirkamasining to'la vazni 750 kg dan oshmaydi.",
    exampleVehicles: "Yuk mashinalari va tortqichlar.",
  },
  CE: {
    id: "CE",
    label: "CE",
    minAge: 21,
    validityYears: 10,
    description:
      "«C» toifadagi avtotransport vositasiga tirkamasining to'la vazni 750 kg dan ortiq bo'lgan tirkama ulangan qo'shma avtotransport vositalari.",
    exampleVehicles: "Katta yuk mashinasi (tortqich) + og'ir tirkama/pritsep birikmasi.",
  },
  D: {
    id: "D",
    label: "D",
    minAge: 21,
    validityYears: 10,
    description:
      "Haydovchidan tashqari o'rindiqlari soni 8 tadan ko'p bo'lgan yo'lovchi tashish uchun mo'ljallangan avtotransport vositalari; tirkamasining to'la vazni 750 kg dan oshmaydi.",
    exampleVehicles: "Shahar ichi va shaharlararo yo'lovchi avtobuslari, mikroavtobuslar.",
  },
  DE: {
    id: "DE",
    label: "DE",
    minAge: 21,
    validityYears: 10,
    description:
      "«D» toifadagi avtotransport vositasiga tirkamasining to'la vazni 750 kg dan ortiq bo'lgan tirkama ulangan qo'shma avtotransport vositalari hamda bo'g'imli avtobuslar.",
    exampleVehicles: "Avtobus + tirkama birikmasi, bo'g'imli (garmoshkali) avtobuslar.",
  },
};

export type UzLicenseClassInput = {
  totalSeats: number;
  maxLoadedWeightKg: number;
  hasTrailer: boolean;
  trailerWeightKg: number;
};

export function findRequiredUzLicenseClass(
  input: UzLicenseClassInput,
): UzLicenseClassInfo | null {
  const { totalSeats, maxLoadedWeightKg, hasTrailer, trailerWeightKg } = input;

  if (
    !Number.isFinite(totalSeats) ||
    totalSeats <= 0 ||
    !Number.isFinite(maxLoadedWeightKg) ||
    maxLoadedWeightKg <= 0
  ) {
    return null;
  }

  if (hasTrailer && (!Number.isFinite(trailerWeightKg) || trailerWeightKg < 0)) {
    return null;
  }

  const needsHeavyTrailerUpgrade = hasTrailer && trailerWeightKg > 750;

  if (totalSeats > 9) {
    return needsHeavyTrailerUpgrade ? uzLicenseClasses.DE : uzLicenseClasses.D;
  }

  if (maxLoadedWeightKg > 3500) {
    return needsHeavyTrailerUpgrade ? uzLicenseClasses.CE : uzLicenseClasses.C;
  }

  return needsHeavyTrailerUpgrade ? uzLicenseClasses.BE : uzLicenseClasses.B;
}

export type UzMotorcycleLicenseClassInput = {
  isMoped: boolean;
};

export function findRequiredUzMotorcycleLicenseClass(
  input: UzMotorcycleLicenseClassInput,
): UzLicenseClassInfo {
  return input.isMoped ? uzLicenseClasses.A1 : uzLicenseClasses.A;
}
