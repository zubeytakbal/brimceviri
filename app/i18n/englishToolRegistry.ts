import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { getLiveElectricalCalculatorItems } from "../converter/engineeringHubs";
import { englishChemistryHubPath, englishChemistryTools } from "./englishChemistryToolCatalog";
import { englishDecisionSavingsHubPath, englishDecisionSavingsTools } from "./englishDecisionSavingsTools";
import { englishBusinessTools } from "./englishBusinessToolCatalog";
import { englishEverydayHubPath } from "./englishEverydayCalculatorGroups";
import { englishFinanceTools } from "./englishFinanceToolCatalog";
import { englishStandaloneTools } from "./englishStandaloneTools";
import { englishScienceTools } from "./englishScienceToolCatalog";

export type EnglishToolDomainId =
  | "engineering"
  | "everyday"
  | "decision-savings"
  | "business"
  | "finance"
  | "data-computing"
  | "fitness"
  | "chemistry"
  | "science";

export type EnglishToolScope = "universal" | "user-input-localized";
export type EnglishToolReviewLevel = "standard" | "elevated";

export type EnglishToolRecord = {
  id: string;
  domain: EnglishToolDomainId;
  href: string;
  title: string;
  description: string;
  scope: EnglishToolScope;
  reviewLevel: EnglishToolReviewLevel;
  searchTerms: string;
};

export const englishToolDomains: Array<{
  id: EnglishToolDomainId;
  href: string;
  label: string;
  description: string;
}> = [
  { id: "engineering", href: "/en/engineering-calculators", label: "Engineering Calculators", description: "Electrical, fluids and piping, heat-transfer, mechanics and materials, and dimensionless-number tools." },
  { id: "everyday", href: englishEverydayHubPath, label: "Everyday Calculators", description: "Home projects, routines, transport and personal planning." },
  { id: "decision-savings", href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators", description: "Cost comparisons and payback estimates based on your own inputs." },
  { id: "business", href: "/en/business-calculators", label: "Business Calculators", description: "Break-even, gross-margin, markup and ROAS calculations using your own figures." },
  { id: "finance", href: "/en/finance-calculators", label: "Finance Calculators", description: "Mortgage, loan-amortization and compound-interest planning estimates." },
  { id: "data-computing", href: "/en/data-computing-calculators", label: "Data & Computing Calculators", description: "Number bases, image dimensions, video bitrate and data-storage tools." },
  { id: "fitness", href: "/en/fitness-calculators", label: "Fitness Calculators", description: "One-rep-max and running-pace training estimates." },
  { id: "chemistry", href: englishChemistryHubPath, label: "Chemistry Calculators", description: "Solution chemistry, reaction calculations, equilibrium and electrochemistry." },
  { id: "science", href: "/en/science-calculators", label: "Science Calculators", description: "Mathematics, physics, biology and chemistry learning tools." },
];

const elevatedEverydayComponents = new Set(["bmiCalculator", "pregnancyCalculator", "calorieCalculator", "bodyFatCalculator", "idealWeightCalculator"]);
const dataComputingComponents = new Set(["numberBaseCalculator", "pixelCalculator", "videoBitrateCalculator"]);
const fitnessComponents = new Set(["oneRepMaxCalculator", "paceCalculator", "calorieCalculator", "bodyFatCalculator", "idealWeightCalculator"]);

export const englishToolRegistry: EnglishToolRecord[] = [
  ...englishCalculatorPages.map((tool) => ({
    id: `engineering:${tool.slug}`,
    domain: "engineering" as const,
    href: `/en/calculators/${tool.slug}`,
    title: tool.title,
    description: tool.description,
    scope: "universal" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.shortTitle} ${tool.categoryName} ${tool.formula}`,
  })),
  ...getLiveElectricalCalculatorItems("en").map((tool) => ({
    id: `engineering:${tool.slug}`,
    domain: "engineering" as const,
    href: tool.href,
    title: tool.title,
    description: tool.description,
    scope: "universal" as const,
    reviewLevel: "elevated" as const,
    searchTerms: `${tool.title} ${tool.description} ${tool.formula} cable voltage current power motor electrical`,
  })),
  {
    id: "engineering:thermal-expansion",
    domain: "engineering",
    href: "/en/calculators/thermal-expansion",
    title: "Thermal Expansion Calculator",
    description: "Estimate a material's linear length change from its original length and a temperature change.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "thermal expansion linear expansion temperature length material coefficient alpha delta l engineering",
  },
  {
    id: "engineering:elastic-elongation",
    domain: "engineering",
    href: "/en/calculators/elastic-elongation",
    title: "Elastic Elongation Calculator",
    description: "Estimate axial stress and linear-elastic length change from force, area, length and Young's modulus.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "elastic elongation hookes law youngs modulus axial stress strain force area engineering",
  },
  {
    id: "engineering:thermal-resistance-u-value",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/thermal-resistance-calculator",
    title: "Thermal Resistance & U-value Calculator",
    description: "Calculate layer-only thermal resistance and U-value from material thickness and conductivity.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "thermal resistance r value u value insulation wall roof floor assembly conductivity thickness heat transfer engineering",
  },
  {
    id: "engineering:lmtd-heat-exchanger",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator",
    title: "LMTD Heat Exchanger Calculator",
    description: "Calculate log mean temperature difference and a first-pass heat-transfer rate for parallel-flow or counterflow exchangers.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "lmtd heat exchanger log mean temperature difference counterflow parallel flow overall heat transfer coefficient u value area q ua delta t engineering",
  },
  {
    id: "engineering:heat-loss",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/heat-loss-calculator",
    title: "Heat Loss Calculator",
    description: "Estimate conductive heat loss and thermal energy from U-value, area, temperature difference and duration.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "heat loss heat gain u value thermal transmittance wall roof floor area temperature difference heating cooling load insulation building engineering",
  },
  {
    id: "engineering:radiative-heat-transfer",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/radiative-heat-transfer-calculator",
    title: "Radiative Heat Transfer Calculator",
    description: "Calculate net Stefan-Boltzmann radiation between a stated surface and large uniform surroundings.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "radiative heat transfer thermal radiation stefan boltzmann emissivity blackbody surface temperature heat flux engineering",
  },
  {
    id: "engineering:convective-heat-transfer",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/convective-heat-transfer-calculator",
    title: "Convective Heat Transfer Calculator",
    description: "Calculate Q = h A ΔT from a stated coefficient, area and surface-to-fluid temperature difference.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "convective heat transfer convection coefficient h heat flux surface area fluid temperature difference engineering",
  },
  {
    id: "engineering:sensible-heat-rate",
    domain: "engineering",
    href: "/en/engineering-calculators/heat-transfer/sensible-heat-rate-calculator",
    title: "Sensible Heat Rate Calculator",
    description: "Calculate fluid heating or cooling rate from mass flow, specific heat and temperature change.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "sensible heat heat rate mass flow specific heat heat capacity rate mcp temperature change fluid heating cooling engineering",
  },
  {
    id: "engineering:stress-strain",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/stress-strain-calculator",
    title: "Stress & Strain Calculator",
    description: "Calculate engineering stress, strain and a secant modulus from axial force, area and measured extension.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "stress strain engineering stress engineering strain axial force cross sectional area extension youngs modulus materials mechanics",
  },
  {
    id: "engineering:cantilever-beam-deflection",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/cantilever-beam-deflection-calculator",
    title: "Cantilever Beam Deflection Calculator",
    description: "Estimate tip deflection, bending stress and end rotation for a rectangular cantilever with a free-end point load.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "cantilever beam deflection bending stress tip load rectangular section moment of inertia elastic modulus mechanics engineering",
  },
  {
    id: "engineering:shaft-torsion",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/shaft-torsion-calculator",
    title: "Shaft Torsion Calculator",
    description: "Calculate maximum shear stress and angle of twist for a uniform solid circular shaft under one torque.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "shaft torsion torque shear stress twist angle polar moment solid circular shaft shear modulus mechanics engineering",
  },
  {
    id: "engineering:euler-buckling",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/euler-buckling-calculator",
    title: "Euler Buckling Calculator",
    description: "Calculate ideal elastic critical load for a slender column from its end condition, length, modulus and second moment of area.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "euler buckling column critical load effective length factor slender column second moment of area elastic stability mechanics engineering",
  },
  {
    id: "engineering:section-properties",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/section-properties-calculator",
    title: "Section Properties Calculator",
    description: "Calculate area, second moment of area, section modulus and polar moment for an ideal solid rectangle or circle.",
    scope: "universal",
    reviewLevel: "standard",
    searchTerms: "section properties area second moment of area moment of inertia section modulus polar moment rectangle circle mechanics engineering",
  },
  {
    id: "engineering:thin-wall-cylinder-stress",
    domain: "engineering",
    href: "/en/engineering-calculators/mechanics-materials/thin-wall-cylinder-stress-calculator",
    title: "Thin-Wall Cylinder Stress Calculator",
    description: "Estimate ideal hoop and longitudinal stress for a thin-walled cylinder under internal pressure.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "thin wall cylinder hoop stress longitudinal stress pressure vessel pipe internal pressure wall thickness mechanics engineering",
  },
  {
    id: "engineering:pipe-flow",
    domain: "engineering",
    href: "/en/engineering-calculators/fluids-piping/pipe-flow-calculator",
    title: "Pipe Flow Rate & Velocity Calculator",
    description: "Calculate volumetric flow rate, mean velocity or internal diameter for a circular pipe.",
    scope: "universal",
    reviewLevel: "standard",
    searchTerms: "pipe flow rate velocity diameter continuity equation q a v gpm cfm piping fluids engineering",
  },
  {
    id: "engineering:pressure-drop",
    domain: "engineering",
    href: "/en/engineering-calculators/fluids-piping/pressure-drop-calculator",
    title: "Pressure Drop Calculator",
    description: "Estimate major and minor pipe pressure losses with Darcy–Weisbach using your fluid properties and pipe data.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "pressure drop darcy weisbach friction loss head loss pipe reynolds roughness fitting k factor fluids engineering",
  },
  {
    id: "engineering:pump-power",
    domain: "engineering",
    href: "/en/engineering-calculators/fluids-piping/pump-power-calculator",
    title: "Pump Power Calculator",
    description: "Estimate hydraulic, shaft and electrical pump power at a stated flow and total dynamic head.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "pump power hydraulic shaft electrical total dynamic head flow rate density efficiency hp kw piping fluids engineering",
  },
  {
    id: "engineering:prandtl-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/prandtl-number-calculator",
    title: "Prandtl Number Calculator",
    description: "Calculate the dimensionless Prandtl number from fluid properties or momentum and thermal diffusivities.",
    scope: "universal",
    reviewLevel: "standard",
    searchTerms: "prandtl number dimensionless fluid viscosity specific heat thermal conductivity diffusivity heat transfer engineering",
  },
  {
    id: "engineering:biot-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/biot-number-calculator",
    title: "Biot Number Calculator",
    description: "Calculate Biot number to screen internal and surface thermal resistance in transient heat transfer.",
    scope: "universal",
    reviewLevel: "standard",
    searchTerms: "biot number dimensionless convection coefficient characteristic length solid thermal conductivity lumped capacitance heat transfer engineering",
  },
  {
    id: "engineering:fourier-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/fourier-number-calculator",
    title: "Fourier Number Calculator",
    description: "Calculate dimensionless time from thermal diffusivity, elapsed time and characteristic length.",
    scope: "universal",
    reviewLevel: "standard",
    searchTerms: "fourier number dimensionless thermal diffusivity transient conduction time characteristic length heat transfer engineering",
  },
  {
    id: "engineering:nusselt-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator",
    title: "Nusselt Number Calculator",
    description: "Solve Nusselt number or convection coefficient, with a scope-checked Dittus–Boelter mode for turbulent pipe flow.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "nusselt number convection coefficient dittus boelter reynolds prandtl heat transfer turbulent pipe engineering",
  },
  {
    id: "engineering:mach-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/mach-number-calculator",
    title: "Mach Number Calculator",
    description: "Calculate Mach number from a known local speed of sound or an ideal-gas static-temperature estimate.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "mach number speed of sound compressibility ideal gas gamma specific gas constant static temperature aerospace fluid mechanics engineering",
  },
  {
    id: "engineering:froude-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/froude-number-calculator",
    title: "Froude Number Calculator",
    description: "Calculate Froude number, velocity or hydraulic depth for a scoped open-channel flow screening calculation.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "froude number open channel shallow water hydraulic depth critical subcritical supercritical velocity gravity fluid mechanics civil engineering",
  },
  {
    id: "engineering:grashof-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/grashof-number-calculator",
    title: "Grashof Number Calculator",
    description: "Calculate the buoyancy-to-viscosity ratio for a natural-convection screening problem.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "grashof number natural convection buoyancy viscosity thermal expansion coefficient beta film temperature heat transfer engineering",
  },
  {
    id: "engineering:rayleigh-number",
    domain: "engineering",
    href: "/en/engineering-calculators/dimensionless-numbers/rayleigh-number-calculator",
    title: "Rayleigh Number Calculator",
    description: "Calculate Rayleigh number from Grashof and Prandtl groups or natural-convection fluid properties.",
    scope: "universal",
    reviewLevel: "elevated",
    searchTerms: "rayleigh number natural convection grashof prandtl thermal diffusivity buoyancy heat transfer engineering",
  },
  ...englishStandaloneTools.map((tool) => ({
    id: `${dataComputingComponents.has(tool.component) ? "data-computing" : fitnessComponents.has(tool.component) ? "fitness" : "everyday"}:${tool.slug}`,
    domain: dataComputingComponents.has(tool.component) ? "data-computing" as const : fitnessComponents.has(tool.component) ? "fitness" as const : "everyday" as const,
    href: tool.englishPath,
    title: tool.title,
    description: tool.cardDescription,
    scope: "universal" as const,
    reviewLevel: elevatedEverydayComponents.has(tool.component) ? "elevated" as const : "standard" as const,
    searchTerms: `${tool.title} ${tool.description} ${tool.cardDescription}`,
  })),
  ...englishDecisionSavingsTools.map((tool) => ({
    id: `decision-savings:${tool.slug}`,
    domain: "decision-savings" as const,
    href: tool.href,
    title: tool.title,
    description: tool.description,
    scope: "user-input-localized" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.description}`,
  })),
  ...englishBusinessTools.map((tool) => ({
    id: `business:${tool.id}`,
    domain: "business" as const,
    href: tool.href,
    title: tool.title,
    description: tool.description,
    scope: "user-input-localized" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.description} ${tool.formula} break even gross margin markup roas business`,
  })),
  ...englishFinanceTools.map((tool) => ({
    id: `finance:${tool.id}`,
    domain: "finance" as const,
    href: tool.href,
    title: tool.title,
    description: tool.description,
    scope: "user-input-localized" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.description} ${tool.formula} mortgage loan amortization compound interest finance`,
  })),
  ...englishChemistryTools.map((tool) => ({
    id: `chemistry:${tool.slug}`,
    domain: "chemistry" as const,
    href: `${englishChemistryHubPath}/${tool.slug}`,
    title: tool.title,
    description: tool.description,
    scope: "universal" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.description} chemistry`,
  })),
  ...englishScienceTools.map((tool) => ({
    id: `science:${tool.id}`,
    domain: "science" as const,
    href: tool.href,
    title: tool.title,
    description: tool.description,
    scope: "universal" as const,
    reviewLevel: "standard" as const,
    searchTerms: `${tool.title} ${tool.description} mathematics physics biology science`,
  })),
];

export function getEnglishToolsByDomain(domain: EnglishToolDomainId) {
  return englishToolRegistry.filter((tool) => tool.domain === domain);
}

export function getEnglishToolDomain(domain: EnglishToolDomainId) {
  return englishToolDomains.find((item) => item.id === domain);
}

export const englishLiveCalculatorCount = englishToolRegistry.length;
export const englishAppliedStemCalculatorCount = englishToolRegistry.filter(
  (tool) => tool.domain === "engineering" || tool.domain === "chemistry" || tool.domain === "science",
).length;

// New English tools must be added only after satisfying these rules. Keeping
// the policy beside the live registry makes a translation-only expansion
// visible during code review instead of silently becoming the default.
export const englishToolPublicationRules = [
  "A real English-language user intent and a globally meaningful use case are required.",
  "Any location-sensitive price, tariff, regulation or rate must be a user input or an explicitly supported locale data source.",
  "The page must have English-specific labels, examples, units and decision context; literal translation alone is not a publishable variant.",
  "Elevated-review tools need an appropriate source, limitation notice and manual review before release.",
] as const;
