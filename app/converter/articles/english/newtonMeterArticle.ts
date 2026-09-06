import type { UnitArticle } from "../../unitArticles";

export const newtonMeterArticle: UnitArticle = {
  slug: "newton-meter",

  introduction: [
    "The newton-meter (N·m) is the SI derived unit of torque (turning moment). It expresses the turning effect produced by a force of 1 newton applied perpendicular to a lever arm 1 meter long.",
    "The newton-meter is the standard unit used everywhere turning force is expressed — from engine power to torque wrenches, from bolt-tightening specifications to mechanical design calculations.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "N·m",
    },
    {
      label: "Physical quantity",
      value: "Torque (turning moment)",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "1 newton-meter",
      value: "1 N × 1 m",
    },
    {
      label: "1 newton-meter",
      value: "≈ 0.737562 lb-ft",
    },
  ],

  sections: [
    {
      title: "What is a newton-meter?",
      paragraphs: [
        "Torque measures the effect of a force trying to rotate an object about an axis. The newton-meter is defined as the product of the applied force (newtons) and its perpendicular distance from the axis of rotation (meters): τ = F × r.",
        "Dimensionally, the newton-meter is identical to the energy unit joule (both are kg·m²/s²), but conceptually the two are different: the joule expresses work or energy, while the newton-meter expresses a turning effect. For this reason, torque is always expressed as newton-meter, never as joule.",
        "Tightening a bolt to a specified N·m value with a torque wrench ensures it is fastened at the tension the manufacturer intended — critical for both safety and mechanical performance.",
      ],
    },
    {
      title: "Where is the newton-meter used?",
      paragraphs: [
        "In the automotive industry, engine torque shows how much \"pulling power\" a vehicle delivers at low RPM and is typically listed in N·m on technical datasheets. High torque is felt especially during acceleration from a stop and when climbing hills.",
        "In mechanical assembly, torque wrenches are used to tighten bolts and nuts to the N·m value specified by the manufacturer. Under-tightening can lead to loosening, while over-tightening can damage the material.",
        "In mechanical engineering, shaft design, gear systems and motor selection are based directly on torque calculations; a motor's power (watts) is related to the product of rotational speed and torque (P = τ × ω).",
      ],
    },
    {
      title: "The newton-meter and other torque units",
      paragraphs: [
        "1 newton-meter is approximately equal to 0.737562 pound-feet (lb-ft), a unit widely used especially in US-originated vehicle and engineering documentation. In the other direction, 1 lb-ft is exactly equal to 1.355818 N·m.",
        "For larger values, the kilonewton-meter (kN·m) is preferred — for example, the torque of large industrial motors or wind turbines is often expressed in kN·m.",
        "The kilogram-force-meter (kgf·m) is another unit found in some older technical documents; 1 kgf·m is approximately equal to 9.80665 N·m, derived from the product of kilogram-force and a one-meter lever arm.",
      ],
    },
    {
      title: "The difference between torque and energy",
      paragraphs: [
        "The newton-meter uses the same dimensional combination (kg·m²/s²) for both torque and energy (joule), but the two quantities are physically different. Energy is a scalar quantity; torque is a vector quantity with a direction.",
        "To avoid this confusion, international convention recommends using the symbol J for energy and the notation N·m for torque — the two should never be used interchangeably.",
        "This distinction matters in practice: an engine producing 300 N·m of torque does not mean it is expending 300 joules of energy; torque expresses an instantaneous force effect about a rotation axis, while energy expresses total work done.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "The origin of the torque concept",
      description:
        "Isaac Newton's laws of motion established the mathematical foundation of force and moment, providing the physical basis for torque calculations.",
    },
    {
      year: "1948",
      title: "The newton's adoption into the SI",
      description:
        "With the official adoption of the newton in the SI, the newton-meter — the product of force and length — also became the standard derived unit for torque.",
    },
  ],

  questions: [
    {
      question: "How many pound-feet is 1 newton-meter?",
      answer:
        "1 newton-meter is approximately equal to 0.737562 pound-feet (lb-ft). To convert newton-meter to pound-feet, divide the value by approximately 1.355818.",
    },
    {
      question: "How many newton-meters is 1 pound-foot?",
      answer:
        "1 pound-foot is exactly equal to 1.355818 newton-meters, derived from the product of the exact SI equivalents of pound-force and the foot.",
    },
    {
      question: "Are the newton-meter and the joule the same unit?",
      answer:
        "Although they share the same dimensional combination (kg·m²/s²), they express different quantities: the joule expresses energy, the newton-meter expresses torque. Their symbols are therefore never used interchangeably.",
    },
    {
      question: "Why does engine torque matter?",
      answer:
        "Engine torque determines a vehicle's pulling power at low RPM. Higher torque delivers stronger performance especially when accelerating from a stop, climbing hills and carrying loads.",
    },
  ],
};
