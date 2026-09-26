import type { EnglishStandaloneToolComponentKey } from "./englishStandaloneTools";

export const englishEverydayCalculatorGroups: Array<{
  id: string;
  title: string;
  description: string;
  tools: EnglishStandaloneToolComponentKey[];
}> = [
  {
    id: "home-and-diy",
    title: "Home and DIY calculators",
    description: "Plan concrete, decorating, flooring, moving and household energy tasks with practical estimates.",
    tools: ["concreteCalculator", "aggregateCalculator", "stairCalculator", "roofingCalculator", "paintCalculator", "tileCalculator", "brickCalculator", "laminateCalculator", "wallpaperCalculator", "movingBoxCalculator", "acCapacityCalculator", "electricityConsumptionCalculator", "naturalGasCalculator"],
  },
  {
    id: "health-and-routines",
    title: "Health and daily routines",
    description: "Use personal planning tools for dates, sleep, activity and general body measurements.",
    tools: ["calorieCalculator", "bmiCalculator", "bodyFatCalculator", "idealWeightCalculator", "heightConverter", "dateCalculator", "pregnancyCalculator", "sleepCalculator", "paceCalculator"],
  },
  {
    id: "school-and-study",
    title: "School and study",
    description: "Work out weighted class grades, letter grades and the score you need on a final exam.",
    tools: ["gradeCalculator"],
  },
  {
    id: "transport-and-cost",
    title: "Transport, cost and comparison tools",
    description: "Estimate travel energy use, tax, charging needs and familiar real-world comparisons.",
    tools: ["fuelConsumptionCalculator", "fuelEconomyConverter", "tireSizeCalculator", "evChargingCalculator", "vatCalculator", "lengthComparison", "weightComparison"],
  },
];

export const englishEverydayHubPath = "/en/everyday-calculators";
