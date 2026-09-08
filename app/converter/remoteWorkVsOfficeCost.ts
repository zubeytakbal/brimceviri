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

export function calculateRemoteWorkVsOfficeCost(
  input: RemoteWorkComparisonInput,
): RemoteWorkComparisonResult | null {
  const {
    annualWorkDays,
    remoteDaysPerWeek,
    dailyCommuteCostTl,
    dailyLunchDifferenceTl,
    monthlyExtraHomeCostTl,
  } = input;

  if (
    !Number.isFinite(annualWorkDays) ||
    annualWorkDays <= 0 ||
    !Number.isFinite(remoteDaysPerWeek) ||
    remoteDaysPerWeek < 0 ||
    remoteDaysPerWeek > 5 ||
    !Number.isFinite(dailyCommuteCostTl) ||
    dailyCommuteCostTl < 0 ||
    !Number.isFinite(dailyLunchDifferenceTl) ||
    !Number.isFinite(monthlyExtraHomeCostTl) ||
    monthlyExtraHomeCostTl < 0
  ) {
    return null;
  }

  const annualRemoteDays = annualWorkDays * (remoteDaysPerWeek / 5);

  const annualCommuteSavingsTl = annualRemoteDays * dailyCommuteCostTl;
  const annualLunchSavingsTl = annualRemoteDays * dailyLunchDifferenceTl;
  const annualExtraHomeCostTl = monthlyExtraHomeCostTl * 12;

  const annualNetSavingsTl =
    annualCommuteSavingsTl + annualLunchSavingsTl - annualExtraHomeCostTl;

  return {
    annualRemoteDays,
    annualCommuteSavingsTl,
    annualLunchSavingsTl,
    annualExtraHomeCostTl,
    annualNetSavingsTl,
  };
}
