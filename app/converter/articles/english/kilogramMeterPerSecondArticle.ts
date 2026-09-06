import type { UnitArticle } from "../../unitArticles";

export const kilogramMeterPerSecondArticle: UnitArticle = {
  slug: "kilogram-meter-per-second",

  introduction: [
    "Kilogram-meter per second (kg·m/s) is the SI derived unit of momentum. It is defined as the product of an object's mass and its velocity: p = m × v.",
    "Momentum sits at the center of one of classical mechanics' fundamental conservation laws — the conservation of momentum — and has a wide range of applications, from collision analysis to rocket-thrust calculations.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "kg·m/s",
    },
    {
      label: "Physical quantity",
      value: "Momentum",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "1 kg·m/s",
      value: "1 N·s (impulse-momentum equivalence)",
    },
    {
      label: "Formula",
      value: "p = m × v",
    },
  ],

  sections: [
    {
      title: "What is momentum?",
      paragraphs: [
        "Momentum measures the \"amount\" of motion an object has, and is calculated as the product of mass and the velocity vector. It is a vector quantity, having both magnitude and direction — so the direction of motion must always be taken into account in momentum calculations.",
        "A heavy, fast-moving object has far greater momentum than a light, slow-moving one. For example, a slow-moving truck can have much more momentum than a fast-moving bicycle.",
        "Since kilogram-meter per second is derived directly from the SI base units — kilogram, meter and second — momentum requires no separate physical standard of its own.",
      ],
    },
    {
      title: "The conservation of momentum",
      paragraphs: [
        "One of the most fundamental conservation laws in physics states that the total momentum of a system remains constant as long as no net external force acts on it. This principle underlies all collision analysis.",
        "When two objects collide, the total momentum before the collision equals the total momentum after it. This principle is used in countless fields, from analyzing vehicle accidents to describing the motion of billiard balls.",
        "Rocket propulsion also relies on the conservation of momentum: a rocket gains momentum in the opposite direction by expelling its fuel backward at high speed.",
      ],
    },
    {
      title: "The relationship between momentum and impulse",
      paragraphs: [
        "Impulse is the effect produced when a force acts over a specific period of time, and is expressed in newton-seconds (N·s). The impulse-momentum theorem states that the impulse applied to an object equals the change in that object's momentum.",
        "Dimensionally, N·s and kg·m/s are equal (1 N·s = 1 kg·m/s), because the newton itself is defined as kg·m/s², and multiplying by seconds gives kg·m/s. This is why momentum and impulse can be expressed with the same unit.",
        "This equivalence has practical importance in safety engineering applications such as airbag design: extending the duration of a collision reduces the force required for the same change in momentum.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton's second law",
      description:
        "Isaac Newton defined force as the rate of change of momentum with respect to time, laying the foundation for the concept of momentum in modern physics.",
    },
    {
      year: "19th century",
      title: "The conservation of momentum becomes generalized",
      description:
        "With the development of classical mechanics, the conservation of momentum became a fundamental tool for solving collision and interaction problems.",
    },
  ],

  questions: [
    {
      question: "What is the formula for momentum?",
      answer:
        "Momentum (p) is calculated as mass (m) multiplied by velocity (v): p = m × v. In SI units, the result is expressed in kilogram-meters per second (kg·m/s).",
    },
    {
      question: "How many N·s is 1 kg·m/s?",
      answer:
        "1 kg·m/s is exactly equal to 1 N·s. The two units are dimensionally identical because the newton is defined as kg·m/s², which becomes kg·m/s when multiplied by seconds.",
    },
    {
      question: "Why is momentum a vector quantity?",
      answer:
        "Momentum has both magnitude and direction because velocity is a vector quantity. This means the direction of motion must always be taken into account in momentum calculations.",
    },
    {
      question: "What does conservation of momentum mean?",
      answer:
        "As long as no net external force acts on it, the total momentum of a closed system remains constant. This principle is a fundamental tool for solving collision and interaction problems.",
    },
  ],
};
