export type PrandtlCalculationMode = "properties" | "diffusivities";

export type PrandtlInput = {
  mode: PrandtlCalculationMode;
  dynamicViscosityPaS?: number;
  specificHeatJKgK?: number;
  thermalConductivityWMK?: number;
  kinematicViscosityM2S?: number;
  thermalDiffusivityM2S?: number;
};

export type PrandtlResult = {
  prandtlNumber: number;
  method: "Pr = μCp / k" | "Pr = ν / α";
};

export function calculatePrandtlNumber(input: PrandtlInput): PrandtlResult | null {
  if (input.mode === "properties") {
    const { dynamicViscosityPaS, specificHeatJKgK, thermalConductivityWMK } = input;
    if (![dynamicViscosityPaS, specificHeatJKgK, thermalConductivityWMK].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    return { prandtlNumber: (dynamicViscosityPaS! * specificHeatJKgK!) / thermalConductivityWMK!, method: "Pr = μCp / k" };
  }

  const { kinematicViscosityM2S, thermalDiffusivityM2S } = input;
  if (![kinematicViscosityM2S, thermalDiffusivityM2S].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
  return { prandtlNumber: kinematicViscosityM2S! / thermalDiffusivityM2S!, method: "Pr = ν / α" };
}

export type BiotInput = {
  convectionCoefficientWM2K: number;
  characteristicLengthM: number;
  solidConductivityWMK: number;
};

export function calculateBiotNumber(input: BiotInput): number | null {
  const { convectionCoefficientWM2K, characteristicLengthM, solidConductivityWMK } = input;
  if (![convectionCoefficientWM2K, characteristicLengthM, solidConductivityWMK].every((value) => Number.isFinite(value) && value > 0)) return null;
  return (convectionCoefficientWM2K * characteristicLengthM) / solidConductivityWMK;
}

export type FourierInput = {
  thermalDiffusivityM2S: number;
  timeS: number;
  characteristicLengthM: number;
};

export function calculateFourierNumber(input: FourierInput): number | null {
  const { thermalDiffusivityM2S, timeS, characteristicLengthM } = input;
  if (![thermalDiffusivityM2S, timeS, characteristicLengthM].every((value) => Number.isFinite(value) && value > 0)) return null;
  return (thermalDiffusivityM2S * timeS) / (characteristicLengthM * characteristicLengthM);
}

export type NusseltDefinitionInput = {
  target: "nusselt" | "coefficient";
  nusseltNumber?: number;
  convectionCoefficientWM2K?: number;
  characteristicLengthM: number;
  fluidConductivityWMK: number;
};

export function calculateNusseltDefinition(input: NusseltDefinitionInput): { nusseltNumber: number; convectionCoefficientWM2K: number } | null {
  const { target, nusseltNumber, convectionCoefficientWM2K, characteristicLengthM, fluidConductivityWMK } = input;
  if (![characteristicLengthM, fluidConductivityWMK].every((value) => Number.isFinite(value) && value > 0)) return null;
  if (target === "nusselt") {
    if (!Number.isFinite(convectionCoefficientWM2K) || convectionCoefficientWM2K! <= 0) return null;
    return { nusseltNumber: (convectionCoefficientWM2K! * characteristicLengthM) / fluidConductivityWMK, convectionCoefficientWM2K: convectionCoefficientWM2K! };
  }
  if (!Number.isFinite(nusseltNumber) || nusseltNumber! <= 0) return null;
  return { nusseltNumber: nusseltNumber!, convectionCoefficientWM2K: (nusseltNumber! * fluidConductivityWMK) / characteristicLengthM };
}

export type DittusBoelterInput = {
  reynoldsNumber: number;
  prandtlNumber: number;
  fluidConductivityWMK: number;
  hydraulicDiameterM: number;
  heatedLengthM: number;
  condition: "heating" | "cooling";
};

export function calculateDittusBoelter(input: DittusBoelterInput): { nusseltNumber: number; convectionCoefficientWM2K: number; exponent: number; isWithinRecommendedRange: boolean } | null {
  const { reynoldsNumber, prandtlNumber, fluidConductivityWMK, hydraulicDiameterM, heatedLengthM, condition } = input;
  if (![reynoldsNumber, prandtlNumber, fluidConductivityWMK, hydraulicDiameterM, heatedLengthM].every((value) => Number.isFinite(value) && value > 0)) return null;
  const exponent = condition === "heating" ? 0.4 : 0.3;
  const nusseltNumber = 0.023 * Math.pow(reynoldsNumber, 0.8) * Math.pow(prandtlNumber, exponent);
  return { nusseltNumber, convectionCoefficientWM2K: (nusseltNumber * fluidConductivityWMK) / hydraulicDiameterM, exponent, isWithinRecommendedRange: reynoldsNumber >= 10000 && prandtlNumber >= 0.6 && prandtlNumber <= 160 && heatedLengthM / hydraulicDiameterM >= 10 };
}

export type MachCalculationMode = "known-sound-speed" | "ideal-gas";

export type MachInput = {
  mode: MachCalculationMode;
  velocityMS: number;
  soundSpeedMS?: number;
  staticTemperatureK?: number;
  heatCapacityRatio?: number;
  specificGasConstantJKgK?: number;
};

export type MachRegime = "Low subsonic" | "Subsonic" | "Transonic" | "Supersonic" | "Hypersonic";

export function calculateMachNumber(input: MachInput): { machNumber: number; soundSpeedMS: number; regime: MachRegime } | null {
  if (!Number.isFinite(input.velocityMS) || input.velocityMS < 0) return null;
  let soundSpeedMS: number;

  if (input.mode === "known-sound-speed") {
    if (!Number.isFinite(input.soundSpeedMS) || input.soundSpeedMS! <= 0) return null;
    soundSpeedMS = input.soundSpeedMS!;
  } else {
    const { staticTemperatureK, heatCapacityRatio, specificGasConstantJKgK } = input;
    if (![staticTemperatureK, heatCapacityRatio, specificGasConstantJKgK].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    soundSpeedMS = Math.sqrt(heatCapacityRatio! * specificGasConstantJKgK! * staticTemperatureK!);
  }

  const machNumber = input.velocityMS / soundSpeedMS;
  const regime: MachRegime = machNumber < 0.3 ? "Low subsonic" : machNumber < 0.8 ? "Subsonic" : machNumber < 1.2 ? "Transonic" : machNumber < 5 ? "Supersonic" : "Hypersonic";
  return { machNumber, soundSpeedMS, regime };
}

export type FroudeCalculationTarget = "froude" | "velocity" | "hydraulic-depth";

export type FroudeInput = {
  target: FroudeCalculationTarget;
  froudeNumber?: number;
  velocityMS?: number;
  hydraulicDepthM?: number;
  gravityMS2: number;
};

export type OpenChannelRegime = "Subcritical" | "Critical" | "Supercritical";

export function calculateFroudeNumber(input: FroudeInput): { froudeNumber: number; velocityMS: number; hydraulicDepthM: number; regime: OpenChannelRegime } | null {
  if (!Number.isFinite(input.gravityMS2) || input.gravityMS2 <= 0) return null;
  const { target, froudeNumber, velocityMS, hydraulicDepthM, gravityMS2 } = input;
  let resolvedFroude: number;
  let resolvedVelocity: number;
  let resolvedDepth: number;
  if (target === "froude") {
    if (![velocityMS, hydraulicDepthM].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    resolvedVelocity = velocityMS!; resolvedDepth = hydraulicDepthM!; resolvedFroude = resolvedVelocity / Math.sqrt(gravityMS2 * resolvedDepth);
  } else if (target === "velocity") {
    if (![froudeNumber, hydraulicDepthM].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    resolvedFroude = froudeNumber!; resolvedDepth = hydraulicDepthM!; resolvedVelocity = resolvedFroude * Math.sqrt(gravityMS2 * resolvedDepth);
  } else {
    if (![froudeNumber, velocityMS].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    resolvedFroude = froudeNumber!; resolvedVelocity = velocityMS!; resolvedDepth = (resolvedVelocity / resolvedFroude) ** 2 / gravityMS2;
  }
  const regime: OpenChannelRegime = Math.abs(resolvedFroude - 1) < 0.001 ? "Critical" : resolvedFroude < 1 ? "Subcritical" : "Supercritical";
  return { froudeNumber: resolvedFroude, velocityMS: resolvedVelocity, hydraulicDepthM: resolvedDepth, regime };
}

export type GrashofInput = {
  gravityMS2: number;
  volumetricExpansionCoefficientPerK: number;
  temperatureDifferenceK: number;
  characteristicLengthM: number;
  kinematicViscosityM2S: number;
};

export function calculateGrashofNumber(input: GrashofInput): number | null {
  const { gravityMS2, volumetricExpansionCoefficientPerK, temperatureDifferenceK, characteristicLengthM, kinematicViscosityM2S } = input;
  if (![gravityMS2, volumetricExpansionCoefficientPerK, temperatureDifferenceK, characteristicLengthM, kinematicViscosityM2S].every((value) => Number.isFinite(value) && value > 0)) return null;
  return gravityMS2 * volumetricExpansionCoefficientPerK * temperatureDifferenceK * characteristicLengthM ** 3 / kinematicViscosityM2S ** 2;
}

export type RayleighInput = {
  mode: "grashof-prandtl" | "properties";
  grashofNumber?: number;
  prandtlNumber?: number;
  gravityMS2?: number;
  volumetricExpansionCoefficientPerK?: number;
  temperatureDifferenceK?: number;
  characteristicLengthM?: number;
  kinematicViscosityM2S?: number;
  thermalDiffusivityM2S?: number;
};

export function calculateRayleighNumber(input: RayleighInput): { rayleighNumber: number; grashofNumber: number; prandtlNumber: number } | null {
  if (input.mode === "grashof-prandtl") {
    if (![input.grashofNumber, input.prandtlNumber].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
    return { rayleighNumber: input.grashofNumber! * input.prandtlNumber!, grashofNumber: input.grashofNumber!, prandtlNumber: input.prandtlNumber! };
  }
  const { gravityMS2, volumetricExpansionCoefficientPerK, temperatureDifferenceK, characteristicLengthM, kinematicViscosityM2S, thermalDiffusivityM2S } = input;
  if (![gravityMS2, volumetricExpansionCoefficientPerK, temperatureDifferenceK, characteristicLengthM, kinematicViscosityM2S, thermalDiffusivityM2S].every((value) => value !== undefined && Number.isFinite(value) && value > 0)) return null;
  const grashofNumber = gravityMS2! * volumetricExpansionCoefficientPerK! * temperatureDifferenceK! * characteristicLengthM! ** 3 / kinematicViscosityM2S! ** 2;
  const prandtlNumber = kinematicViscosityM2S! / thermalDiffusivityM2S!;
  return { rayleighNumber: grashofNumber * prandtlNumber, grashofNumber, prandtlNumber };
}
