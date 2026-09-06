export function calculateOneRepMax(weight: number, reps: number): number | null {
  if (
    !Number.isFinite(weight) ||
    weight <= 0 ||
    !Number.isFinite(reps) ||
    reps <= 0 ||
    reps > 15
  ) {
    return null;
  }

  if (reps === 1) {
    return weight;
  }

  // Epley formula -- accurate roughly up to 10-12 reps.
  return weight * (1 + reps / 30);
}

export type TrainingPercentageRow = {
  percentage: number;
  weight: number;
};

const trainingPercentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

export function calculateTrainingPercentages(
  oneRepMax: number
): TrainingPercentageRow[] | null {
  if (!Number.isFinite(oneRepMax) || oneRepMax <= 0) {
    return null;
  }

  return trainingPercentages.map((percentage) => ({
    percentage,
    weight: oneRepMax * (percentage / 100),
  }));
}
