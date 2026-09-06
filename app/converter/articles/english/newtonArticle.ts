import type { UnitArticle } from "../../unitArticles";

export const newtonArticle: UnitArticle = {
  slug: "newton",

  introduction: [
    "The newton (N) is the SI derived unit of force. It is defined as the force required to accelerate a mass of 1 kilogram at 1 meter per second squared, and it is named after the English physicist Isaac Newton.",
    "The newton is the standard unit used across nearly every scientific and technical field where force is expressed — from mechanics to structural engineering, from material testing to everyday physics calculations.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "N",
    },
    {
      label: "Physical quantity",
      value: "Force",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "1 newton",
      value: "1 kg·m/s²",
    },
    {
      label: "1 newton",
      value: "≈ 0.101972 kgf",
    },
  ],

  sections: [
    {
      title: "What is a newton?",
      paragraphs: [
        "The newton is derived directly from Newton's second law of motion (F = m × a): the force required to accelerate a mass of 1 kilogram at 1 meter per second squared is, by definition, 1 newton.",
        "Because the newton is derived from the SI base units — the kilogram, the meter and the second — it does not need a separate physical standard; its definition rests directly on those units of mass, length and time.",
        "In everyday terms, 1 newton is a fairly small force — close to the weight a 102-gram apple exerts on Earth. This is why the kilonewton (kN) is often preferred in engineering applications.",
      ],
    },
    {
      title: "Why does the newton matter?",
      paragraphs: [
        "Force is one of the most fundamental quantities in physics, playing a central role in analyzing motion, equilibrium and stress. The load a structure must carry, the acceleration of an object, or a material's breaking strength are all expressed in newtons.",
        "Many derived quantities, such as pressure, torque and energy, are defined directly through the newton: pressure is force divided by area (N/m² = Pa), while energy is force multiplied by distance (N·m = J).",
        "In structural engineering, wind loads, seismic forces and static loads are calculated in kilonewtons; in automotive and materials testing, tensile and compressive forces are typically reported in newtons or kilonewtons.",
      ],
    },
    {
      title: "The newton and other force units",
      paragraphs: [
        "1 newton is approximately equal to 0.101972 kilogram-force (kgf), a traditional unit based on gravitational acceleration that was widely used in pre-SI engineering practice. In the other direction, 1 kgf is exactly equal to 9.80665 newtons.",
        "In the CGS system, the unit of force is the dyne, and 1 newton is exactly equal to 100,000 dynes. In the imperial system, force is expressed in pound-force (lbf); 1 newton corresponds to approximately 0.224809 lbf.",
        "When converting between these different units, it is important to distinguish which unit expresses mass (kg, lb) and which expresses force (N, kgf, lbf) — the two are frequently confused in everyday language.",
      ],
    },
    {
      title: "The newton and the mass-force confusion",
      paragraphs: [
        "In everyday language, \"kilogram\" is sometimes used to mean both mass and weight (force), which is scientifically incorrect. Mass describes the amount of matter in an object and is measured in kilograms (kg); weight is the force gravity exerts on that mass and is expressed in newtons (N).",
        "An object's weight equals its mass multiplied by gravitational acceleration (about 9.80665 m/s²). For example, a 1-kilogram object weighs approximately 9.80665 newtons on Earth.",
        "This distinction is especially critical in aerospace engineering and physics calculations, since an object's mass stays the same everywhere, while its weight (a force) changes according to the local gravitational field.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton's laws of motion",
      description:
        "Isaac Newton published the laws of motion defining the relationship between force, mass and acceleration in his work Philosophiæ Naturalis Principia Mathematica.",
    },
    {
      year: "1946",
      title: "The newton unit is proposed",
      description:
        "The International Committee for Weights and Measures (CIPM) proposed naming the force unit of the MKS (meter-kilogram-second) system \"newton\".",
    },
    {
      year: "1948",
      title: "Adopted as an official SI unit",
      description:
        "The 9th General Conference on Weights and Measures (CGPM) adopted the newton as the official derived SI unit of force.",
    },
  ],

  questions: [
    {
      question: "How many kilogram-force is 1 newton?",
      answer:
        "1 newton is approximately equal to 0.101972 kilogram-force (kgf). To convert newton to kgf, divide the value by 9.80665.",
    },
    {
      question: "How many newtons is 1 kilogram-force?",
      answer:
        "1 kilogram-force is exactly equal to 9.80665 newtons. This value is derived directly from the standard gravitational acceleration (9.80665 m/s²).",
    },
    {
      question: "Are the newton and the kilogram the same thing?",
      answer:
        "No. The kilogram is a unit of mass, while the newton is a unit of force (weight). An object's weight equals its mass multiplied by gravitational acceleration, and is expressed in newtons.",
    },
    {
      question: "What formula defines the newton?",
      answer:
        "The newton is defined by the formula F = m × a. 1 newton is the force that gives a mass of 1 kilogram an acceleration of 1 meter per second squared (1 N = 1 kg·m/s²).",
    },
  ],
};
