// Dogalgaz tuketimi hesaplama -- m3 cinsinden tuketim ve birim fiyattan
// toplam maliyeti hesaplar. Ayrica yaklasik kWh karsiligini gosterir
// (Turkiye'de dogalgazin ortalama alt isil degeri ~9,x-11 kWh/m3 arasi
// degisir, faturadaki gercek katsayi dagitim bolgesine ve gaz
// bilesimine gore farklilik gosterebilir -- bu yuzden yaklasik/ortalama
// bir katsayi kullanildigi acikca belirtilir).

export type NaturalGasCalculatorInput = {
  consumptionM3: number;
  pricePerM3: number;
};

export type NaturalGasCalculatorResult = {
  totalCost: number;
  approximateKwh: number;
};

// Turkiye'de yaygin kullanilan yaklasik ortalama deger.
const APPROXIMATE_KWH_PER_M3 = 10.55;

export function calculateNaturalGasCost(
  input: NaturalGasCalculatorInput
): NaturalGasCalculatorResult | null {
  const { consumptionM3, pricePerM3 } = input;

  if (
    !Number.isFinite(consumptionM3) ||
    consumptionM3 <= 0 ||
    !Number.isFinite(pricePerM3) ||
    pricePerM3 <= 0
  ) {
    return null;
  }

  return {
    totalCost: consumptionM3 * pricePerM3,
    approximateKwh: consumptionM3 * APPROXIMATE_KWH_PER_M3,
  };
}
