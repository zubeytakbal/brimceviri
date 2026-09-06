// Amortisman hesaplama -- sabit kiymetlerin maliyetini faydali omru
// boyunca dagitan iki standart yontem: normal (esit tutarli/dogrusal)
// ve azalan bakiyeler usulu. Faydali omur ve oran, VUK'un binlerce
// kalemlik faydali omur listesine gore degistigi ve zamanla
// guncellendigi icin kullanici tarafindan girilir; bu araç sabit bir
// omur/oran tablosu varsaymaz, sadece girilen degerlerle standart
// muhasebe formulunu uygular. Azalan bakiyeler usulunde VUK mukerrer
// 315'e gore oran, normal oranin 2 katidir (ust sinir %50).

export type AmortismanMethod = "normal" | "azalan-bakiyeler";

export type AmortismanInput = {
  cost: number;
  usefulLifeYears: number;
  salvageValue: number;
  method: AmortismanMethod;
};

export type AmortismanYearRow = {
  year: number;
  beginningValue: number;
  depreciationAmount: number;
  accumulatedDepreciation: number;
  endingValue: number;
};

export type AmortismanResult = {
  annualRatePercent: number;
  rows: AmortismanYearRow[];
};

export function calculateAmortisman(
  input: AmortismanInput
): AmortismanResult | null {
  const { cost, usefulLifeYears, salvageValue, method } = input;

  if (!Number.isFinite(cost) || cost <= 0) {
    return null;
  }

  if (
    !Number.isFinite(usefulLifeYears) ||
    !Number.isInteger(usefulLifeYears) ||
    usefulLifeYears <= 0
  ) {
    return null;
  }

  if (
    !Number.isFinite(salvageValue) ||
    salvageValue < 0 ||
    salvageValue >= cost
  ) {
    return null;
  }

  if (method === "normal") {
    const annualAmount = (cost - salvageValue) / usefulLifeYears;
    const rows: AmortismanYearRow[] = [];
    let accumulated = 0;

    for (let year = 1; year <= usefulLifeYears; year += 1) {
      const beginningValue = cost - accumulated;
      accumulated += annualAmount;
      rows.push({
        year,
        beginningValue,
        depreciationAmount: annualAmount,
        accumulatedDepreciation: accumulated,
        endingValue: cost - accumulated,
      });
    }

    return { annualRatePercent: (1 / usefulLifeYears) * 100, rows };
  }

  const rate = Math.min(2 / usefulLifeYears, 0.5);
  const rows: AmortismanYearRow[] = [];
  let accumulated = 0;
  let bookValue = cost;

  for (let year = 1; year <= usefulLifeYears; year += 1) {
    const beginningValue = bookValue;
    let depreciationAmount = beginningValue * rate;

    if (
      year === usefulLifeYears ||
      beginningValue - depreciationAmount < salvageValue
    ) {
      depreciationAmount = beginningValue - salvageValue;
    }

    accumulated += depreciationAmount;
    bookValue = beginningValue - depreciationAmount;

    rows.push({
      year,
      beginningValue,
      depreciationAmount,
      accumulatedDepreciation: accumulated,
      endingValue: bookValue,
    });
  }

  return { annualRatePercent: rate * 100, rows };
}
