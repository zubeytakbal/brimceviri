import { englishToolRegistry, englishToolDomains } from "./englishToolRegistry";

export const englishCalculatorHubs = englishToolDomains;

export const englishCalculatorMenuLinks = englishCalculatorHubs.map(({ href, label }) => ({ href, label }));
export const englishEverydayCalculatorCount = englishToolRegistry.filter((tool) => tool.domain === "everyday").length;
export const englishChemistryCalculatorCount = englishToolRegistry.filter((tool) => tool.domain === "chemistry").length;
export const englishDecisionSavingsCalculatorCount = englishToolRegistry.filter((tool) => tool.domain === "decision-savings").length;
