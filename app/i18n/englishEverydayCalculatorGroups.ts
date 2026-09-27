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
    tools: ["squareFootageCalculator", "cubicYardCalculator", "mulchCalculator", "boardFootCalculator", "concreteCalculator", "aggregateCalculator", "stairCalculator", "roofingCalculator", "paintCalculator", "tileCalculator", "brickCalculator", "laminateCalculator", "wallpaperCalculator", "movingBoxCalculator", "poolVolumeCalculator", "poolChlorineCalculator", "acCapacityCalculator", "electricityConsumptionCalculator", "naturalGasCalculator"],
  },
  {
    id: "health-and-routines",
    title: "Health and daily routines",
    description: "Use personal planning tools for dates, sleep, activity and general body measurements.",
    tools: ["calorieCalculator", "bmiCalculator", "bodyFatCalculator", "idealWeightCalculator", "heightConverter", "standardDrinkCalculator", "ivDripRateCalculator", "dateCalculator", "pregnancyCalculator", "sleepCalculator", "paceCalculator"],
  },
  {
    id: "india",
    title: "India: land, gold, construction, GST and loans",
    description: "Convert bigha, katha, gaj and guntha by state, tola and ratti, price gold jewellery, estimate steel and concrete for building work, work out GST and loan EMIs, and switch between lakh and crore.",
    tools: ["indiaLandConverter", "goldPriceCalculatorIndia", "indianWeightConverter", "steelWeightCalculator", "concreteMixCalculator", "gstCalculatorIndia", "emiCalculator", "lakhCroreConverter"],
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
