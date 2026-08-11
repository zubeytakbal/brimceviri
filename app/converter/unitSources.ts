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

  return [siBrochure, nistConversions];
}
