export type AdMetricsInput = {
  costTl: number;
  impressions: number;
  clicks: number;
};

export type AdMetricsResult = {
  cpm: number;
  ctr: number;
  cpc: number | null;
};

export function calculateAdMetrics(input: AdMetricsInput): AdMetricsResult | null {
  const { costTl, impressions, clicks } = input;

  if (!Number.isFinite(costTl) || costTl <= 0) {
    return null;
  }

  if (!Number.isFinite(impressions) || impressions <= 0) {
    return null;
  }

  if (!Number.isFinite(clicks) || clicks < 0 || clicks > impressions) {
    return null;
  }

  return {
    cpm: (costTl / impressions) * 1000,
    ctr: (clicks / impressions) * 100,
    cpc: clicks > 0 ? costTl / clicks : null,
  };
}

export function calculateRoi(costTl: number, revenueTl: number): number | null {
  if (!Number.isFinite(costTl) || costTl <= 0) {
    return null;
  }

  if (!Number.isFinite(revenueTl) || revenueTl < 0) {
    return null;
  }

  return ((revenueTl - costTl) / costTl) * 100;
}
