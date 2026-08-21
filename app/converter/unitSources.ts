export type UnitSource = {
  title: string;
  organization: string;
  url: string;
};

const siBrochure: UnitSource = {
  title: "The International System of Units (SI Brochure)",
  organization: "BIPM",
  url: "https://www.bipm.org/en/publications/si-brochure",
};

const nistLength: UnitSource = {
  title: "SI Units – Length",
  organization: "NIST",
  url: "https://www.nist.gov/pml/owm/si-units-length",
};

const nistMass: UnitSource = {
  title: "SI Units – Mass",
  organization: "NIST",
  url: "https://www.nist.gov/pml/owm/si-units-mass",
};

const nistConversions: UnitSource = {
  title: "Guide for the Use of the International System of Units",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811",
};

const lengthSources: UnitSource[] = [
  siBrochure,
  nistLength,
  nistConversions,
];

const massSources: UnitSource[] = [
  siBrochure,
  nistMass,
  nistConversions,
];

const nistPressureConversions: UnitSource = {
  title: "Pressure and Gas Flow Unit Conversions",
  organization: "NIST",
  url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions",
};

const nistSiConversionFactors: UnitSource = {
  title: "Guide to the SI — Conversion Factors",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8",
};

const pressureSources: UnitSource[] = [
  siBrochure,
  nistPressureConversions,
  nistSiConversionFactors,
];

const nistMassDensityConversions: UnitSource = {
  title:
    "NIST Guide to the SI — Appendix B.9: Mass Divided by Volume " +
    "(Mass Density and Mass Concentration)",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

const densitySources: UnitSource[] = [
  siBrochure,
  nistMassDensityConversions,
  nistSiConversionFactors,
];

const nistPowerEnergyConversions: UnitSource = {
  title:
    "NIST Guide to the SI — Appendix B.8: Factors for Units Listed " +
    "Alphabetically (horsepower, watt-hour dahil)",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8",
};

const energySources: UnitSource[] = [
  siBrochure,
  nistPowerEnergyConversions,
  nistSiConversionFactors,
];

const nistForceConversions: UnitSource = {
  title:
    "NIST Guide to the SI — Appendix B.9: Force (newton, " +
    "kilogram-force, pound-force)",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

const forceSources: UnitSource[] = [
  siBrochure,
  nistForceConversions,
  nistSiConversionFactors,
];

const nistTorqueConversions: UnitSource = {
  title:
    "NIST Guide to the SI — Appendix B.9: Moment of Force or Torque " +
    "(newton-metre, pound-force foot)",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

const torqueSources: UnitSource[] = [
  siBrochure,
  nistTorqueConversions,
  nistSiConversionFactors,
];

const nistViscosityConversions: UnitSource = {
  title:
    "NIST Guide to the SI — Appendix B.9: Viscosity, Dynamic " +
    "(pascal-second, poise, centipoise)",
  organization: "NIST",
  url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
};

const viscositySources: UnitSource[] = [
  siBrochure,
  nistViscosityConversions,
  nistSiConversionFactors,
];

const nistBinaryPrefixes: UnitSource = {
  title: "Definitions of the SI Units: The Binary Prefixes",
  organization: "NIST",
  url: "https://physics.nist.gov/cuu/Units/binary.html",
};

const dataSources: UnitSource[] = [
  siBrochure,
  nistBinaryPrefixes,
  nistSiConversionFactors,
];

export function getUnitSources(category: string): UnitSource[] {
  if (category === "uzunluk") {
    return lengthSources;
  }

  if (category === "kutle") {
    return massSources;
  }

  if (category === "basinc") {
    return pressureSources;
  }

  if (category === "yogunluk") {
    return densitySources;
  }

  if (category === "enerji") {
    return energySources;
  }

  if (category === "kuvvet") {
    return forceSources;
  }

  if (category === "tork") {
    return torqueSources;
  }

  if (category === "viskozite_dinamik") {
    return viscositySources;
  }

  if (category === "veri") {
    return dataSources;
  }

  return [siBrochure, nistConversions];
}
