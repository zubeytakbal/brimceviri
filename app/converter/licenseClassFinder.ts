// Ehliyet sinifi bulma -- kullanicinin aracinin ozelliklerinden (koltuk
// sayisi, azami yuklu agirlik, romork) veya motosikletinin motor
// hacmi/gucunden Karayollari Trafik Yonetmeligi'ne gore gereken surucu
// belgesi sinifini hesaplar. Otomobil/kamyon/otobus (B, B1, BE, C1,
// C1E, C, CE, D1, D1E, D, DE) ve motosiklet/moped (M, A1, A2, A)
// sinifi kapsanir; ozel makine/traktor (F/G/H) sinifi bu surumde yok.

export type LicenseClassId =
  | "M"
  | "A1"
  | "A2"
  | "A"
  | "B1"
  | "B"
  | "BE"
  | "C1"
  | "C1E"
  | "C"
  | "CE"
  | "D1"
  | "D1E"
  | "D"
  | "DE";

export type LicenseClassInfo = {
  id: LicenseClassId;
  label: string;
  minAge: number;
  validityYears: number;
  description: string;
  exampleVehicles: string;
};

// Kaynak: Karayollari Trafik Yonetmeligi (2918 sayili Kanun'a dayanir,
// mevzuat.gov.tr) + birden fazla surucu kursu/sigorta kaynagindan
// (arabam.com, cetas.com.tr, otokocikinciel.com, sigortam.net,
// turkiyesigorta.com.tr) capraz dogrulanan yas/agirlik/koltuk
// degerleri -- hepsi ayni rakamlarda birlesiyor.
export const licenseClasses: Record<LicenseClassId, LicenseClassInfo> = {
  M: {
    id: "M",
    label: "M",
    minAge: 15,
    validityYears: 10,
    description:
      "Silindir hacmi 50 cm³'ü, tasarım hızı 45 km/saati geçmeyen moped ve hafif iki/üç tekerlekli motorlu araçlar.",
    exampleVehicles: "Mopedler, 50cc altı benzinli/elektrikli scooterlar.",
  },
  A1: {
    id: "A1",
    label: "A1",
    minAge: 16,
    validityYears: 10,
    description:
      "Motor hacmi 125 cm³'ü, gücü 11 kW'ı ve güç/ağırlık oranı 0,1 kW/kg'ı geçmeyen motosikletler (M sınıfı mopedleri kullanma yetkisini de kapsar).",
    exampleVehicles: "125cc'ye kadar motosikletler (örn. Honda CB125F, Yamaha YBR125).",
  },
  A2: {
    id: "A2",
    label: "A2",
    minAge: 18,
    validityYears: 10,
    description:
      "Motor gücü 35 kW'ı ve güç/ağırlık oranı 0,2 kW/kg'ı geçmeyen motosikletler.",
    exampleVehicles: "Orta güçlü motosikletler (örn. Kawasaki Ninja 400, Honda CB500F).",
  },
  A: {
    id: "A",
    label: "A",
    minAge: 20,
    validityYears: 10,
    description:
      "Motor hacmi ve gücü sınırlaması olmayan tüm iki tekerlekli motosikletler. 20 yaşında en az 2 yıllık A2 deneyimiyle, 24 yaşında ise deneyim şartı aranmadan doğrudan alınabilir.",
    exampleVehicles: "Yüksek hacimli/güçlü motosikletler (örn. büyük turing ve süper spor modeller).",
  },
  B1: {
    id: "B1",
    label: "B1",
    minAge: 16,
    validityYears: 10,
    description:
      "Motor gücü 15 kW'ı aşmayan, boş ağırlığı 400 kg'ı (yük taşıma tipinde 550 kg'ı) geçmeyen hafif dört tekerlekli motorlu araçlar (quadricycle).",
    exampleVehicles: "Hafif dört tekerlekli araçlar (quadricycle) — örn. Renault Twizy, Citroën Ami tipi mikro elektrikli araçlar.",
  },
  B: {
    id: "B",
    label: "B",
    minAge: 18,
    validityYears: 10,
    description:
      "Azami yüklü ağırlığı 3.500 kg'ı, sürücü dahil koltuk sayısı 9'u (8 yolcu) geçmeyen otomobil, kamyonet ve karavan tipi araçlar.",
    exampleVehicles: "Sedan/hatchback otomobiller, SUV'lar, küçük kamyonetler (örn. Fiat Doblo, Renault Kangoo) ve küçük karavanlar.",
  },
  BE: {
    id: "BE",
    label: "BE",
    minAge: 18,
    validityYears: 10,
    description:
      "B sınıfı bir araca, yüklü ağırlığı 750 kg'ın üzerinde (ve tek başına 3.500 kg'ı geçmeyen) bir römork/yarı römork bağlanmış birleşik araçlar.",
    exampleVehicles: "Bir binek otomobile bağlı ağır tekne/karavan römorku veya at römorku.",
  },
  C1: {
    id: "C1",
    label: "C1",
    minAge: 18,
    validityYears: 5,
    description: "Azami yüklü ağırlığı 3.500-7.500 kg arasında olan kamyon ve çekiciler.",
    exampleVehicles: "Küçük/orta boy kamyonlar (örn. kasalı şasi üstü ticari kamyonlar).",
  },
  C1E: {
    id: "C1E",
    label: "C1E",
    minAge: 18,
    validityYears: 5,
    description:
      "C1 sınıfı bir araca 750 kg üzeri römork bağlanmış, birleşik azami yüklü ağırlığı genellikle 12.000 kg'a kadar olan araçlar.",
    exampleVehicles: "Orta boy kamyon + ağır römork/dorse kombinasyonu.",
  },
  C: {
    id: "C",
    label: "C",
    minAge: 21,
    validityYears: 5,
    description: "Azami yüklü ağırlığı 7.500 kg'ın üzerinde olan kamyon ve çekiciler.",
    exampleVehicles: "Büyük kamyonlar ve TIR çekicileri (römorksuz).",
  },
  CE: {
    id: "CE",
    label: "CE",
    minAge: 21,
    validityYears: 5,
    description: "C sınıfı bir araca 750 kg üzeri römork bağlanmış birleşik araçlar.",
    exampleVehicles: "TIR (büyük kamyon çekicisi + dorse/römork).",
  },
  D1: {
    id: "D1",
    label: "D1",
    minAge: 21,
    validityYears: 5,
    description: "Sürücü dahil koltuk sayısı 17'yi (16 yolcu) geçmeyen minibüsler.",
    exampleVehicles: "Okul servisi, personel taşıma minibüsleri (örn. Ford Transit, Mercedes Sprinter minibüs).",
  },
  D1E: {
    id: "D1E",
    label: "D1E",
    minAge: 21,
    validityYears: 5,
    description: "D1 sınıfı bir araca 750 kg üzeri römork bağlanmış birleşik araçlar.",
    exampleVehicles: "Minibüs + bagaj/eşya römorku kombinasyonu.",
  },
  D: {
    id: "D",
    label: "D",
    minAge: 24,
    validityYears: 5,
    description: "Sürücü dahil koltuk sayısı 17'den fazla olan otobüsler.",
    exampleVehicles: "Şehir içi ve şehirlerarası yolcu otobüsleri.",
  },
  DE: {
    id: "DE",
    label: "DE",
    minAge: 24,
    validityYears: 5,
    description: "D sınıfı bir araca 750 kg üzeri römork bağlanmış birleşik araçlar.",
    exampleVehicles: "Otobüs + römork kombinasyonu (nadir görülen bir kullanım).",
  },
};

export type LicenseClassInput = {
  totalSeats: number;
  maxLoadedWeightKg: number;
  hasTrailer: boolean;
  trailerWeightKg: number;
  isLightQuadricycle: boolean;
};

export function findRequiredLicenseClass(
  input: LicenseClassInput,
): LicenseClassInfo | null {
  const { totalSeats, maxLoadedWeightKg, hasTrailer, trailerWeightKg, isLightQuadricycle } =
    input;

  if (isLightQuadricycle) {
    return licenseClasses.B1;
  }

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

  // Otobus/minibus dali (yolcu tasima aracligi)
  if (totalSeats > 17) {
    return needsHeavyTrailerUpgrade ? licenseClasses.DE : licenseClasses.D;
  }

  if (totalSeats > 9) {
    return needsHeavyTrailerUpgrade ? licenseClasses.D1E : licenseClasses.D1;
  }

  // Yuk tasima / binek dali (agirliga gore)
  if (maxLoadedWeightKg > 7500) {
    return needsHeavyTrailerUpgrade ? licenseClasses.CE : licenseClasses.C;
  }

  if (maxLoadedWeightKg > 3500) {
    return needsHeavyTrailerUpgrade ? licenseClasses.C1E : licenseClasses.C1;
  }

  return needsHeavyTrailerUpgrade ? licenseClasses.BE : licenseClasses.B;
}

export type MotorcycleLicenseClassInput = {
  isMoped: boolean;
  engineCc: number;
  powerKw: number;
};

export function findRequiredMotorcycleLicenseClass(
  input: MotorcycleLicenseClassInput,
): LicenseClassInfo | null {
  const { isMoped, engineCc, powerKw } = input;

  if (isMoped) {
    return licenseClasses.M;
  }

  if (
    !Number.isFinite(engineCc) ||
    engineCc <= 0 ||
    !Number.isFinite(powerKw) ||
    powerKw <= 0
  ) {
    return null;
  }

  if (engineCc <= 125 && powerKw <= 11) {
    return licenseClasses.A1;
  }

  if (powerKw <= 35) {
    return licenseClasses.A2;
  }

  return licenseClasses.A;
}
