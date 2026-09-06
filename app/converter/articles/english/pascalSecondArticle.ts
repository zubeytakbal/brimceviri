import type { UnitArticle } from "../../unitArticles";

export const pascalSecondArticle: UnitArticle = {
  slug: "pascal-second",

  introduction: [
    "The pascal-second (Pa·s) is the SI derived unit of dynamic viscosity. It scientifically expresses a fluid's internal resistance to flowing — its \"thickness\".",
    "Dynamic viscosity is one of the fundamental quantities in fluid mechanics, with applications ranging from Reynolds number calculations to pipeline design, from engine oil selection to food production.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "Pa·s",
    },
    {
      label: "Physical quantity",
      value: "Dynamic viscosity",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "1 Pa·s",
      value: "1,000 centipoise (cP)",
    },
    {
      label: "Viscosity of water (20°C)",
      value: "≈ 0.001 Pa·s (1 cP)",
    },
  ],

  sections: [
    {
      title: "What is dynamic viscosity?",
      paragraphs: [
        "Viscosity expresses the internal friction between layers of a fluid — its resistance to flow. High-viscosity fluids (such as honey or engine oil) flow slowly; low-viscosity fluids (such as water or gasoline) flow much more easily.",
        "Dynamic viscosity, denoted by the symbol μ, is the ratio between the shear stress needed to move a layer of fluid and the velocity gradient that motion produces. The pascal-second expresses this ratio directly in SI units.",
        "The pascal-second is equal to the combination N·s/m², which makes it a quantity derived directly from the units of pressure (pascal) and time (second).",
      ],
    },
    {
      title: "Why does dynamic viscosity matter?",
      paragraphs: [
        "Dynamic viscosity appears directly in the Reynolds number formula (Re = ρ × v × D / μ) and is one of the critical parameters determining whether a flow will be laminar or turbulent. This calculation is used in many engineering problems, from pipe design to aircraft-wing analysis.",
        "Engine oil selection relies directly on dynamic viscosity through viscosity classifications such as SAE 5W-30; the right viscosity maintains an adequate lubricating film between engine parts while avoiding unnecessary friction losses.",
        "In the food, cosmetics and paint industries, measuring viscosity is a routine quality-control step for controlling product consistency, standardizing quality and designing production lines.",
      ],
    },
    {
      title: "The relationship between pascal-second and centipoise",
      paragraphs: [
        "1 pascal-second is exactly equal to 1,000 centipoise (cP). The centipoise, one-thousandth of the poise unit from the CGS (centimeter-gram-second) system, is used far more often than Pa·s in industry, because the viscosity of most everyday liquids is expressed with more readable numbers in cP.",
        "For example, water's viscosity at 20°C is about 1 cP (0.001 Pa·s); olive oil is about 80 cP, and honey can range from 2,000 to 10,000 cP. Written in Pa·s, these values become much smaller and harder-to-read decimals.",
        "This is why Pa·s is preferred in scientific publications and the SI standard, while cP remains common on industrial datasheets and product labels.",
      ],
    },
    {
      title: "The difference between dynamic and kinematic viscosity",
      paragraphs: [
        "Dynamic viscosity (μ) and kinematic viscosity (ν) are often confused, but they are different quantities. Kinematic viscosity is obtained by dividing dynamic viscosity by the fluid's density: ν = μ / ρ.",
        "The SI unit of kinematic viscosity is square meters per second (m²/s); the centistoke (cSt) is the practical unit widely used in industry. The difference between the two quantities is whether density is factored in.",
        "The classic form of the Reynolds number (Re = ρvD/μ) uses dynamic viscosity, while an alternative form written in terms of kinematic viscosity (Re = vD/ν) is also used in some engineering calculations; the two are mathematically equivalent.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton's law of viscosity",
      description:
        "Isaac Newton proposed that the shear stress between fluid layers is proportional to the velocity gradient, laying the foundation for the concept of Newtonian fluids.",
    },
    {
      year: "1948",
      title: "The pascal's adoption into the SI",
      description:
        "Following the adoption of the pascal unit in the SI system, the pascal-second was adopted as the official derived SI unit of dynamic viscosity.",
    },
  ],

  questions: [
    {
      question: "How many centipoise is 1 Pa·s?",
      answer:
        "1 pascal-second is exactly equal to 1,000 centipoise (cP). To convert Pa·s to cP, multiply the value by 1,000.",
    },
    {
      question: "How many Pa·s is 1 centipoise?",
      answer:
        "1 centipoise is exactly equal to 0.001 Pa·s. To convert cP to Pa·s, divide the value by 1,000.",
    },
    {
      question: "What is the viscosity of water in Pa·s?",
      answer:
        "The dynamic viscosity of water at 20°C is approximately 0.001 Pa·s, or 1 centipoise. This value decreases as temperature rises.",
    },
    {
      question:
        "What is the difference between dynamic viscosity and kinematic viscosity?",
      answer:
        "Dynamic viscosity (Pa·s) directly measures a fluid's internal friction. Kinematic viscosity (m²/s) is obtained by dividing dynamic viscosity by the fluid's density: ν = μ/ρ.",
    },
  ],
};
