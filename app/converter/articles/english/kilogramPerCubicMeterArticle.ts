import type { UnitArticle } from "../../unitArticles";

export const kilogramPerCubicMeterArticle: UnitArticle = {
  slug: "kilogram-per-cubic-meter",

  introduction: [
    "Kilogram per cubic meter (kg/m³) is the SI derived unit of density, expressing the mass of a substance contained in a unit of volume. Since it is formed directly from the combination of the mass unit (kg) and the volume unit (m³), it rests on the ratio of two SI base units rather than on a separate definition of its own.",
    "Density is the fundamental physical quantity used to determine whether a material is light or heavy, whether it will float in water, and how much load a structural element can carry. kg/m³ is the standard unit for expressing this quantity, from scientific publications to engineering calculations.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "kg/m³",
    },
    {
      label: "Physical quantity",
      value: "Density (mass/volume)",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "Density of water",
      value: "≈ 1,000 kg/m³ (at 4°C)",
    },
    {
      label: "1 kg/m³",
      value: "0.001 g/cm³",
    },
  ],

  sections: [
    {
      title: "What is kilogram per cubic meter?",
      paragraphs: [
        "Kilogram per cubic meter expresses how many kilograms of a substance are contained in a volume of one cubic meter. Its formula is ρ = m/V, where m is mass (kg), V is volume (m³) and ρ (rho) represents density.",
        "kg/m³ requires no separate unit system; it is derived directly from two SI base units, the kilogram and the meter. This is why it is treated as the default unit for density in scientific papers and engineering standards.",
        "For example, air has a density of about 1.2 kg/m³, water about 1,000 kg/m³ and steel about 7,850 kg/m³. This wide numerical range is what allows kg/m³ to compare an enormous variety of materials on the same scale.",
      ],
    },
    {
      title: "Why does density matter?",
      paragraphs: [
        "Density is the key factor determining whether an object floats in water: materials with a density lower than water float, while denser ones sink. This principle is used across many engineering fields, from ship design to diving equipment.",
        "In construction and materials engineering, density directly affects the load a material can bear, the weight of structural elements and foundation design. The density difference between materials such as concrete, steel and wood means elements of the same volume can have very different weights.",
        "In fluid mechanics, density is one of the fundamental parameters determining pressure, buoyant force and flow behavior. Calculations such as hydrostatic pressure and the Reynolds number depend directly on a fluid's density value.",
      ],
    },
    {
      title: "kg/m³ and other density units",
      paragraphs: [
        "1 kg/m³ is exactly equal to 0.001 g/cm³; converting between the two units is simply a matter of multiplying or dividing by 1,000. Laboratories often prefer g/cm³ for small samples, while industrial and engineering calculations tend to use kg/m³.",
        "The unit kg/L is also common and is numerically identical to g/cm³ (1 kg/L = 1 g/cm³ = 1,000 kg/m³). In the oil, fuel and food industries, density is often labeled in kg/L.",
        "Imperial and US customary systems use units such as lb/ft³ and lb/gal. 1 kg/m³ is approximately equal to 0.062428 lb/ft³ — units that appear especially in US-originated engineering documents.",
      ],
    },
    {
      title: "The density of common materials",
      paragraphs: [
        "As a reference, some approximate material densities are: air 1.2 kg/m³, pure water (at 4°C) 1,000 kg/m³, seawater about 1,025 kg/m³, aluminum 2,700 kg/m³, steel 7,850 kg/m³ and lead about 11,340 kg/m³.",
        "Water's density changes with temperature and reaches its maximum (about 1,000 kg/m³) at 4°C; water that is either colder or warmer than this has a slightly lower density. This is also the fundamental reason ice floats on water.",
        "Comparing material densities is a frequently used reference in engineering practice for choosing the right material, calculating transport costs and structural design.",
      ],
    },
  ],

  timeline: [
    {
      year: "3rd century BC",
      title: "Archimedes' principle of density",
      description:
        "Archimedes discovered that the buoyant force on an object in a liquid equals the weight of the displaced liquid, laying the scientific foundation for the concept of density.",
    },
    {
      year: "1795",
      title: "The metric system is adopted",
      description:
        "With the standardization of the kilogram and the meter, the concept of kg/m³, derived from these two units, became conceptually possible.",
    },
    {
      year: "1960",
      title: "The SI system is formalized",
      description:
        "The International System of Units, adopted at the 11th CGPM, defined kg/m³ as the official derived unit for density.",
    },
  ],

  questions: [
    {
      question: "How many g/cm³ is 1 kg/m³?",
      answer:
        "1 kg/m³ is exactly equal to 0.001 g/cm³. To convert kg/m³ to g/cm³, divide the value by 1,000.",
    },
    {
      question: "What is the density of water in kg/m³?",
      answer:
        "The density of pure water at 4°C is approximately 1,000 kg/m³. This value decreases slightly as the temperature changes.",
    },
    {
      question: "What is the formula for density?",
      answer:
        "Density (ρ) is calculated by dividing mass (m) by volume (V): ρ = m/V. In SI units, the result is expressed in kg/m³.",
    },
    {
      question: "What is the difference between kg/m³ and kg/L?",
      answer:
        "1 kg/L equals 1,000 kg/m³. The kg/L unit is commonly used for fuels and liquid products, while kg/m³ is preferred in scientific and engineering calculations.",
    },
  ],
};
