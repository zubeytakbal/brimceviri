// Uzaktan calisma vs ofis maliyeti karsilastirmasi -- kullanicinin
// kendi yol masrafi, ogle yemegi farki ve evden calisirken olusan
// ekstra ev gideriyle, haftada kac gun evden calistiginda yillik ne
// kadar tasarruf ettigini (veya kaybettigini) hesaplar. Tum degerler
// kisisel girdi, sabit bir makro rakam yok.

export interface RemoteWorkComparisonInput {
  annualWorkDays: number;
  remoteDaysPerWeek: number;
  dailyCommuteCostTl: number;
  dailyLunchDifferenceTl: number;
  monthlyExtraHomeCostTl: number;
}

export interface RemoteWorkComparisonResult {
  annualRemoteDays: number;
  annualCommuteSavingsTl: number;
  annualLunchSavingsTl: number;
  annualExtraHomeCostTl: number;
  annualNetSavingsTl: number;
}

export interface RemoteWorkCostComparisonInput {
  annualWorkDays: number;
  remoteDaysPerWeek: number;
  dailyCommuteCost: number;
  dailyLunchDifference: number;
  monthlyExtraHomeCost: number;
}

export interface RemoteWorkCostComparisonResult {
  annualRemoteDays: number;
  annualCommuteSaving: number;
  annualLunchSaving: number;
  annualExtraHomeCost: number;
  annualNetSaving: number;
}

export function calculateRemoteWorkCostComparison(
  input: RemoteWorkCostComparisonInput,
): RemoteWorkCostComparisonResult | null {
  const {
    annualWorkDays,
    remoteDaysPerWeek,
    dailyCommuteCost,
    dailyLunchDifference,
    monthlyExtraHomeCost,
  } = input;

  if (
    !Number.isFinite(annualWorkDays) ||
    annualWorkDays <= 0 ||
    !Number.isFinite(remoteDaysPerWeek) ||
    remoteDaysPerWeek < 0 ||
    remoteDaysPerWeek > 5 ||
    !Number.isFinite(dailyCommuteCost) ||
    dailyCommuteCost < 0 ||
    !Number.isFinite(dailyLunchDifference) ||
    !Number.isFinite(monthlyExtraHomeCost) ||
    monthlyExtraHomeCost < 0
  ) {
    return null;
  }

  const annualRemoteDays = annualWorkDays * (remoteDaysPerWeek / 5);
  const annualCommuteSaving = annualRemoteDays * dailyCommuteCost;
  const annualLunchSaving = annualRemoteDays * dailyLunchDifference;
  const annualExtraHomeCost = monthlyExtraHomeCost * 12;

  return {
    annualRemoteDays,
    annualCommuteSaving,
    annualLunchSaving,
    annualExtraHomeCost,
    annualNetSaving:
      annualCommuteSaving + annualLunchSaving - annualExtraHomeCost,
  };
}

export function calculateRemoteWorkVsOfficeCost(
  input: RemoteWorkComparisonInput,
): RemoteWorkComparisonResult | null {
  const result = calculateRemoteWorkCostComparison({
    annualWorkDays: input.annualWorkDays,
    remoteDaysPerWeek: input.remoteDaysPerWeek,
    dailyCommuteCost: input.dailyCommuteCostTl,
    dailyLunchDifference: input.dailyLunchDifferenceTl,
    monthlyExtraHomeCost: input.monthlyExtraHomeCostTl,
  });

  if (!result) return null;

  return {
    annualRemoteDays: result.annualRemoteDays,
    annualCommuteSavingsTl: result.annualCommuteSaving,
    annualLunchSavingsTl: result.annualLunchSaving,
    annualExtraHomeCostTl: result.annualExtraHomeCost,
    annualNetSavingsTl: result.annualNetSaving,
  };
}
