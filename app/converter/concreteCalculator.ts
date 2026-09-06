export type ConcreteShape = "dikdortgen" | "silindir";

export interface ConcreteInput {
  shape: ConcreteShape;
  length: number;
  width: number;
  thickness: number;
  diameter: number;
  height: number;
  wasteFactor: number;
}

export interface ConcreteResult {
  shape: ConcreteShape;
  volumeM3: number;
  volumeWithWasteM3: number;
  bagCount25kg: number;
  cementKg: number;
  sandM3: number;
  gravelM3: number;
  waterL: number;
}

export type ConcreteOutcome =
  | { success: true; result: ConcreteResult }
  | { success: false; message: string };

// Standart C25 beton icin yaklasik 1 m3 karisim orani (hazir beton
// santrallerinin yayinladigi tipik degerlere dayanir): ~350 kg cimento,
// ~0,5 m3 kum, ~0,8 m3 cakil, ~175 L su (su/cimento orani ~0,5).
const CEMENT_KG_PER_M3 = 350;
const SAND_M3_PER_M3 = 0.5;
const GRAVEL_M3_PER_M3 = 0.8;
const WATER_L_PER_M3 = 175;
const CEMENT_BAG_KG = 25;

export function calculateConcrete(input: ConcreteInput): ConcreteOutcome {
  const { shape, wasteFactor } = input;

  if (!Number.isFinite(wasteFactor) || wasteFactor < 0) {
    return { success: false, message: "Fire payı 0 veya daha büyük bir sayı olmalı." };
  }

  let volumeM3: number;

  if (shape === "dikdortgen") {
    const { length, width, thickness } = input;
    if (!(length > 0) || !(width > 0) || !(thickness > 0)) {
      return { success: false, message: "Uzunluk, genişlik ve kalınlık 0'dan büyük olmalı." };
    }
    volumeM3 = length * width * thickness;
  } else {
    const { diameter, height } = input;
    if (!(diameter > 0) || !(height > 0)) {
      return { success: false, message: "Çap ve yükseklik 0'dan büyük olmalı." };
    }
    const radius = diameter / 2;
    volumeM3 = Math.PI * radius * radius * height;
  }

  const volumeWithWasteM3 = volumeM3 * (1 + wasteFactor / 100);

  return {
    success: true,
    result: {
      shape,
      volumeM3,
      volumeWithWasteM3,
      bagCount25kg: Math.ceil(
        (volumeWithWasteM3 * CEMENT_KG_PER_M3) / CEMENT_BAG_KG
      ),
      cementKg: volumeWithWasteM3 * CEMENT_KG_PER_M3,
      sandM3: volumeWithWasteM3 * SAND_M3_PER_M3,
      gravelM3: volumeWithWasteM3 * GRAVEL_M3_PER_M3,
      waterL: volumeWithWasteM3 * WATER_L_PER_M3,
    },
  };
}
