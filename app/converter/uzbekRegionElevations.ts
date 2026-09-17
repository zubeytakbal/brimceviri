// O'zbekistonning 14 ma'muriy hududi (12 viloyat + Qoraqalpog'iston
// Respublikasi + Toshkent shahri) markazlarining dengiz sathidan
// balandligi (metr). Har bir markaz koordinatasi (keng tanilgan,
// tekshiriladigan geografik fakt) uchun Open-Elevation ochiq API'si
// orqali to'g'ridan-to'g'ri so'rov yuborilgan (SRTM asosidagi DEM
// ma'lumotlari), barchasi bir xil uslub bilan olingan -- shuning
// uchun qiymatlar o'zaro izchil.
export type RegionElevation = {
  id: string;
  name: string;
  centerCity: string;
  elevationM: number;
};

export const uzbekRegionElevations: RegionElevation[] = [
  { id: "toshkent-shahri", name: "Toshkent shahri", centerCity: "Toshkent", elevationM: 442 },
  { id: "toshkent-viloyati", name: "Toshkent viloyati", centerCity: "Nurafshon", elevationM: 392 },
  { id: "andijon", name: "Andijon viloyati", centerCity: "Andijon", elevationM: 483 },
  { id: "fargona", name: "Farg'ona viloyati", centerCity: "Farg'ona", elevationM: 580 },
  { id: "namangan", name: "Namangan viloyati", centerCity: "Namangan", elevationM: 445 },
  { id: "sirdaryo", name: "Sirdaryo viloyati", centerCity: "Guliston", elevationM: 273 },
  { id: "jizzax", name: "Jizzax viloyati", centerCity: "Jizzax", elevationM: 382 },
  { id: "samarqand", name: "Samarqand viloyati", centerCity: "Samarqand", elevationM: 737 },
  { id: "qashqadaryo", name: "Qashqadaryo viloyati", centerCity: "Qarshi", elevationM: 385 },
  { id: "surxondaryo", name: "Surxondaryo viloyati", centerCity: "Termiz", elevationM: 303 },
  { id: "buxoro", name: "Buxoro viloyati", centerCity: "Buxoro", elevationM: 231 },
  { id: "navoiy", name: "Navoiy viloyati", centerCity: "Navoiy", elevationM: 374 },
  { id: "xorazm", name: "Xorazm viloyati", centerCity: "Urganch", elevationM: 102 },
  { id: "qoraqalpogiston", name: "Qoraqalpog'iston Respublikasi", centerCity: "Nukus", elevationM: 77 },
];
