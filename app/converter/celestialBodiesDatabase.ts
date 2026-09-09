// Kaynak: NASA NSSDCA Planetary Fact Sheet (nssdc.gsfc.nasa.gov/planetary/factsheet).
// Uydu sayilari (moonCount) siklikla degisen bir veri -- yeni kucuk
// uydular teleskop taramalariyla surekli kesfediliyor (orn. Satürn
// 2026 basinda +11, Jupiter +4 uydu kazandi). Bu alan icin ayrica bir
// "son dogrulama" notu gosterilir, diger fiziksel sabitler (kutle,
// yogunluk, yercekimi) kalicidir ve degismez.
export type CelestialBodyCategory = "gezegen";

export type CelestialBodyEntry = {
  id: string;
  nameTr: string;
  category: CelestialBodyCategory;
  massKg: number; // kg
  diameterKm: number; // km
  densityKgM3: number; // kg/m3
  gravityMs2: number; // yuzey yercekimi ivmesi, m/s2
  escapeVelocityKms: number; // km/s
  distanceFromSunMillionKm: number; // ortalama, 10^6 km
  orbitalPeriodDays: number; // "yil" uzunlugu
  rotationPeriodHours: number; // "gun" uzunlugu (negatif = ters yonde donus)
  meanTemperatureC: number;
  moonCount: number;
};

export const celestialBodiesDatabase: CelestialBodyEntry[] = [
  {
    id: "merkur",
    nameTr: "Merkür",
    category: "gezegen",
    massKg: 0.33e24,
    diameterKm: 4879,
    densityKgM3: 5427,
    gravityMs2: 3.7,
    escapeVelocityKms: 4.3,
    distanceFromSunMillionKm: 57.9,
    orbitalPeriodDays: 88.0,
    rotationPeriodHours: 1407.6,
    meanTemperatureC: 167,
    moonCount: 0,
  },
  {
    id: "venus",
    nameTr: "Venüs",
    category: "gezegen",
    massKg: 4.87e24,
    diameterKm: 12104,
    densityKgM3: 5243,
    gravityMs2: 8.9,
    escapeVelocityKms: 10.4,
    distanceFromSunMillionKm: 108.2,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5,
    meanTemperatureC: 464,
    moonCount: 0,
  },
  {
    id: "dunya",
    nameTr: "Dünya",
    category: "gezegen",
    massKg: 5.97e24,
    diameterKm: 12756,
    densityKgM3: 5515,
    gravityMs2: 9.8,
    escapeVelocityKms: 11.2,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodDays: 365.2,
    rotationPeriodHours: 23.9,
    meanTemperatureC: 15,
    moonCount: 1,
  },
  {
    id: "mars",
    nameTr: "Mars",
    category: "gezegen",
    massKg: 0.642e24,
    diameterKm: 6794,
    densityKgM3: 3933,
    gravityMs2: 3.7,
    escapeVelocityKms: 5.0,
    distanceFromSunMillionKm: 227.9,
    orbitalPeriodDays: 687.0,
    rotationPeriodHours: 24.6,
    meanTemperatureC: -65,
    moonCount: 2,
  },
  {
    id: "jupiter",
    nameTr: "Jüpiter",
    category: "gezegen",
    massKg: 1899e24,
    diameterKm: 142984,
    densityKgM3: 1326,
    gravityMs2: 23.1,
    escapeVelocityKms: 59.5,
    distanceFromSunMillionKm: 778.6,
    orbitalPeriodDays: 4331,
    rotationPeriodHours: 9.9,
    meanTemperatureC: -110,
    moonCount: 101,
  },
  {
    id: "saturn",
    nameTr: "Satürn",
    category: "gezegen",
    massKg: 568e24,
    diameterKm: 120536,
    densityKgM3: 687,
    gravityMs2: 9.0,
    escapeVelocityKms: 35.5,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 10747,
    rotationPeriodHours: 10.7,
    meanTemperatureC: -140,
    moonCount: 292,
  },
  {
    id: "uranus",
    nameTr: "Uranüs",
    category: "gezegen",
    massKg: 86.8e24,
    diameterKm: 51118,
    densityKgM3: 1270,
    gravityMs2: 8.7,
    escapeVelocityKms: 21.3,
    distanceFromSunMillionKm: 2872.5,
    orbitalPeriodDays: 30589,
    rotationPeriodHours: -17.2,
    meanTemperatureC: -195,
    moonCount: 29,
  },
  {
    id: "neptun",
    nameTr: "Neptün",
    category: "gezegen",
    massKg: 102e24,
    diameterKm: 49528,
    densityKgM3: 1638,
    gravityMs2: 11.0,
    escapeVelocityKms: 23.5,
    distanceFromSunMillionKm: 4495.1,
    orbitalPeriodDays: 59800,
    rotationPeriodHours: 16.1,
    meanTemperatureC: -200,
    moonCount: 18,
  },
];
