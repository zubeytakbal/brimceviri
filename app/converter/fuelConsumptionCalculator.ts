// Yakit tuketimi hesaplama -- km/lt ve lt/100km ters orantili bir
// iliski oldugu icin (basit dogrusal birim cevirisi degil) bu ayri
// bir hesaplayici olarak kuruldu, unitRegistry/convert() kullanmiyor.

export type FuelConsumptionResult = {
  kmPerLiter: number;
  litersPer100Km: number;
  mpgUs: number;
  mpgUk: number;
};

const KM_PER_MILE = 1.609344;
const LITERS_PER_US_GALLON = 3.785411784;
const LITERS_PER_UK_GALLON = 4.54609;

function buildResult(kmPerLiter: number): FuelConsumptionResult {
  return {
    kmPerLiter,
    litersPer100Km: 100 / kmPerLiter,
    mpgUs: (kmPerLiter * LITERS_PER_US_GALLON) / KM_PER_MILE,
    mpgUk: (kmPerLiter * LITERS_PER_UK_GALLON) / KM_PER_MILE,
  };
}

export function calculateFromKmPerLiter(
  kmPerLiter: number
): FuelConsumptionResult | null {
  if (!Number.isFinite(kmPerLiter) || kmPerLiter <= 0) {
    return null;
  }

  return buildResult(kmPerLiter);
}

export function calculateFromLitersPer100Km(
  litersPer100Km: number
): FuelConsumptionResult | null {
  if (!Number.isFinite(litersPer100Km) || litersPer100Km <= 0) {
    return null;
  }

  return buildResult(100 / litersPer100Km);
}

export type TripCostInput = {
  distanceKm: number;
  litersPer100Km: number;
  pricePerLiter: number;
};

export type TripCostResult = {
  litersNeeded: number;
  totalCost: number;
};

export function calculateTripCost(
  input: TripCostInput
): TripCostResult | null {
  const { distanceKm, litersPer100Km, pricePerLiter } = input;

  if (
    !Number.isFinite(distanceKm) ||
    distanceKm <= 0 ||
    !Number.isFinite(litersPer100Km) ||
    litersPer100Km <= 0 ||
    !Number.isFinite(pricePerLiter) ||
    pricePerLiter <= 0
  ) {
    return null;
  }

  const litersNeeded = (distanceKm / 100) * litersPer100Km;

  return {
    litersNeeded,
    totalCost: litersNeeded * pricePerLiter,
  };
}
