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
    description: "Plan decorating, flooring, moving and household energy tasks with practical estimates.",
    tools: ["paintCalculator", "tileCalculator", "brickCalculator", "laminateCalculator", "wallpaperCalculator", "movingBoxCalculator", "acCapacityCalculator", "electricityConsumptionCalculator", "naturalGasCalculator"],
  },
  {
    id: "health-and-routines",
    title: "Health and daily routines",
    description: "Use personal planning tools for dates, sleep, activity and general body measurements.",
    tools: ["dateCalculator", "bmiCalculator", "pregnancyCalculator", "sleepCalculator", "paceCalculator"],
  },
  {
    id: "transport-and-cost",
    title: "Transport, cost and comparison tools",
    description: "Estimate travel energy use, tax, charging needs and familiar real-world comparisons.",
    tools: ["fuelConsumptionCalculator", "evChargingCalculator", "vatCalculator", "lengthComparison", "weightComparison"],
  },
];

export const englishEverydayHubPath = "/en/everyday-calculators";
