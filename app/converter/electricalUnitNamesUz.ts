export const voltageUnitNamesUz: Record<string, { name: string; use: string }> = {
  Millivolt: { name: "Milivolt", use: "Sensor va past darajali signallar" },
  Volt: { name: "Volt", use: "Asosiy SI kuchlanish birligi" },
  Kilovolt: { name: "Kilovolt", use: "Yuqori kuchlanishli uzatish liniyalari" },
};

export const currentUnitNamesUz: Record<string, { name: string; use: string }> = {
  Milliampere: { name: "Miliamper", use: "Elektron sxema toklari" },
  Ampere: { name: "Amper", use: "Asosiy SI tok birligi" },
  Kiloampere: { name: "Kiloamper", use: "Sanoat energetika tizimlari" },
};
