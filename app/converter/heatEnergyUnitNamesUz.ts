export const heatEnergyUnitNamesUz: Record<string, { name: string; use: string }> = {
  Joule: { name: "Joul", use: "Asosiy SI energiya birligi" },
  Kilojoule: { name: "Kilojoul", use: "Muhandislik issiqlik hisoblari" },
  Megajoule: { name: "Megajoul", use: "Katta energiya uzatishlari" },
  Gigajoule: { name: "Gigajoul", use: "Juda katta energiya byudjetlari" },
  "Watt-hour": { name: "Vatt-soat", use: "Kichik elektr energiyasi miqdorlari" },
  "Kilowatt-hour": {
    name: "Kilovatt-soat",
    use: "Elektr sarfi va saqlash sig'imi",
  },
  Calorie: { name: "Kaloriya", use: "Eski issiqlik va laboratoriya hisoblari" },
  Kilocalorie: { name: "Kilokaloriya", use: "Amaliy issiqlik energiyasi ifodasi" },
  "British thermal unit": {
    name: "Britaniya termal birligi",
    use: "HVAC va Anglo-Amerika issiqlik hisoblari",
  },
};

export const calculatorMassUnitNamesUz: Record<string, { name: string; use: string }> = {
  Milligram: { name: "Milligramm", use: "Juda kichik namuna massalari" },
  Gram: { name: "Gramm", use: "Kichik namuna massalari" },
  Kilogram: { name: "Kilogramm", use: "Asosiy SI massa birligi" },
  Tonne: { name: "Tonna", use: "Katta massalar va ommaviy materiallar" },
  Ounce: { name: "Unsiya", use: "Anglo-Amerika kichik massa o'lchovlari" },
  Pound: { name: "Funt", use: "Anglo-Amerika massa o'lchovlari" },
};

export const specificHeatUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Joule per kilogram-kelvin": {
    name: "Joul/kilogramm-kelvin",
    use: "Asosiy SI solishtirma issiqlik birligi",
  },
  "Joule per gram-degree Celsius": {
    name: "Joul/gramm-selsiy darajasi",
    use: "Laboratoriya va material jadvallari",
  },
  "Kilojoule per kilogram-kelvin": {
    name: "Kilojoul/kilogramm-kelvin",
    use: "Amaliy muhandislik hisobotlari",
  },
  "Kilojoule per kilogram-degree Celsius": {
    name: "Kilojoul/kilogramm-selsiy darajasi",
    use: "Harorat farqi °C bilan berilgan hisobotlar",
  },
  "Calorie per gram-degree Celsius": {
    name: "Kaloriya/gramm-selsiy darajasi",
    use: "Eski termal xususiyat jadvallari",
  },
  "Btu per pound-degree Fahrenheit": {
    name: "Btu/funt-Farengeyt darajasi",
    use: "Anglo-Amerika termal xususiyat jadvallari",
  },
};

export const temperatureDifferenceUnitNamesUz: Record<
  string,
  { name: string; use: string }
> = {
  "Kelvin difference": { name: "Kelvin farqi", use: "SI harorat farqi" },
  "Degree Celsius difference": {
    name: "Selsiy darajasi farqi",
    use: "Amaliy harorat farqi ifodasi",
  },
  "Degree Fahrenheit difference": {
    name: "Farengeyt darajasi farqi",
    use: "Anglo-Amerika harorat farqi ifodasi",
  },
};
