export const powerUnitNamesUz: Record<string, { name: string; use: string }> = {
  Watt: { name: "Vatt", use: "Asosiy SI issiqlik o'tish tezligi birligi" },
  Kilowatt: { name: "Kilovatt", use: "Kattaroq issiqlik yuklari" },
  Megawatt: { name: "Megavatt", use: "Juda katta issiqlik o'tishlari" },
  "Kilocalorie per hour": {
    name: "Kilokaloriya/soat",
    use: "Eski issiqlik yuki va jarayon hisoblari",
  },
  "Btu per hour": {
    name: "Btu/soat",
    use: "HVAC va Anglo-Amerika issiqlik yuklari",
  },
};

export const thermalConductivityUnitNamesUz: Record<
  string,
  { name: string; use: string }
> = {
  "Watt per meter-kelvin": {
    name: "Vatt/metr-kelvin",
    use: "Asosiy SI issiqlik o'tkazuvchanlik birligi",
  },
  "Watt per meter-degree Celsius": {
    name: "Vatt/metr-selsiy darajasi",
    use: "ΔT ifodasi °C bo'lgan amaliy ifoda",
  },
  "Milliwatt per meter-kelvin": {
    name: "Milliwatt/metr-kelvin",
    use: "Past o'tkazuvchanlikdagi materiallar",
  },
  "Btu per hour-foot-degree Fahrenheit": {
    name: "Btu/soat-fut-Farengeyt darajasi",
    use: "Anglo-Amerika issiqlik o'tkazuvchanlik jadvallari",
  },
};

export const calculatorAreaUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Square millimeter": { name: "Kvadrat millimetr", use: "Kichik kesim va yuzalar" },
  "Square centimeter": { name: "Kvadrat santimetr", use: "O'rta miqyosdagi tajriba yuzalari" },
  "Square meter": { name: "Kvadrat metr", use: "Asosiy SI maydon birligi" },
  "Square kilometer": { name: "Kvadrat kilometr", use: "Juda katta yuzalar" },
  "Square inch": { name: "Kvadrat dyuym", use: "Anglo-Amerika kichik yuza maydonlari" },
  "Square foot": { name: "Kvadrat fut", use: "Anglo-Amerika yuza maydonlari" },
};

export const calculatorLengthUnitNamesUz: Record<string, { name: string; use: string }> = {
  Millimeter: { name: "Millimetr", use: "Yupqa qatlamlar va kichik diametrlar" },
  Centimeter: { name: "Santimetr", use: "Qisqa o'lchamlar" },
  Meter: { name: "Metr", use: "Asosiy SI uzunlik birligi" },
  Kilometer: { name: "Kilometr", use: "Juda katta masofalar va uzun qatlamlar" },
  Inch: { name: "Dyuym", use: "Anglo-Amerika qalinlik o'lchovlari" },
  Foot: { name: "Fut", use: "Anglo-Amerika uzunlik o'lchovlari" },
};
