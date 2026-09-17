export const reynoldsDensityUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Kilogram per cubic meter": { name: "Kilogram/kub metr", use: "Asosiy SI zichlik birligi" },
  "Gram per cubic centimeter": {
    name: "Gramm/kub santimetr",
    use: "Suyuqliklar uchun amaliy zichlik ifodasi",
  },
  "Gram per liter": { name: "Gramm/litr", use: "Gazlar va suyultirilgan aralashmalar" },
  "Pound per cubic foot": { name: "Funt/kub fut", use: "Anglo-Amerika zichlik jadvallari" },
  "Pound per cubic inch": {
    name: "Funt/kub dyuym",
    use: "Juda zich materiallar uchun Anglo-Amerika ifodasi",
  },
};

export const speedUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Millimeter per second": { name: "Millimetr/soniya", use: "Juda past oqim tezliklari" },
  "Centimeter per second": {
    name: "Santimetr/soniya",
    use: "Past tezliklar va laboratoriya qurilmalari",
  },
  "Meter per second": { name: "Metr/soniya", use: "Asosiy SI tezlik birligi" },
  "Kilometer per hour": { name: "Kilometr/soat", use: "Amaliy oqim va dala tezliklari" },
  "Foot per second": { name: "Fut/soniya", use: "Anglo-Amerika oqim hisoblari" },
  "Mile per hour": { name: "Mil/soat", use: "Anglo-Amerika dala tezliklari" },
};

export const diameterUnitNamesUz: Record<string, { name: string; use: string }> = {
  Micrometer: {
    name: "Mikrometr",
    use: "Mikrokanallar va juda kichik xarakterli uzunliklar",
  },
  Millimeter: { name: "Millimetr", use: "Kichik quvur va kanal diametrlari" },
  Centimeter: { name: "Santimetr", use: "O'rta miqyosdagi quvur diametrlari" },
  Meter: { name: "Metr", use: "Asosiy SI xarakterli uzunlik birligi" },
  Inch: { name: "Dyuym", use: "Anglo-Amerika quvur o'lchamlari" },
  Foot: { name: "Fut", use: "Anglo-Amerika katta kanal o'lchamlari" },
};

export const viscosityUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Pascal-second": { name: "Paskal-soniya", use: "Asosiy SI dinamik yopishqoqlik birligi" },
  "Millipascal-second": {
    name: "Millipaskal-soniya",
    use: "Suyuqliklar uchun amaliy muhandislik qo'llanmasi",
  },
  Poise: { name: "Puaz", use: "CGS asosidagi suyuqlik ma'lumotlari" },
  Centipoise: { name: "Santipuaz", use: "Laboratoriya va suyuqlik xossalari jadvallari" },
};
