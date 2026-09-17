export type EnglishScienceSubject = "mathematics" | "physics" | "biology";

export type EnglishScienceTool = {
  id: string;
  subject: EnglishScienceSubject;
  href: string;
  title: string;
  description: string;
  formula: string;
  variables: Array<{ symbol: string; label: string; unit?: string }>;
  assumptions: string;
  workedExample: string;
  limitations: string;
};

export const englishScienceTools: EnglishScienceTool[] = [
  { id: "percentage", subject: "mathematics", href: "/en/mathematics-calculators/percentage", title: "Percentage Calculator", description: "Find what percentage one number is of another.", formula: "percentage = (part / whole) x 100", variables: [{ symbol: "part", label: "portion being compared" }, { symbol: "whole", label: "reference total" }], assumptions: "The whole must not be zero, and both values must use the same basis.", workedExample: "15 out of 60 is (15 / 60) x 100 = 25%.", limitations: "A percentage describes a ratio; it does not by itself show the size or importance of the underlying values." },
  { id: "mean", subject: "mathematics", href: "/en/mathematics-calculators/mean", title: "Arithmetic Mean Calculator", description: "Calculate the average of a list of values.", formula: "mean = sum of values / number of values", variables: [{ symbol: "x", label: "each numeric value" }, { symbol: "n", label: "number of values" }], assumptions: "Each value is treated with equal weight.", workedExample: "The mean of 4, 7, 9 and 10 is 30 / 4 = 7.5.", limitations: "The arithmetic mean can be misleading for strongly skewed data or values with different weights." },
  { id: "quadratic", subject: "mathematics", href: "/en/mathematics-calculators/quadratic-roots", title: "Quadratic Roots Calculator", description: "Find the real roots of a quadratic equation.", formula: "x = (-b +/- sqrt(b^2 - 4ac)) / 2a", variables: [{ symbol: "a, b, c", label: "coefficients in ax^2 + bx + c = 0" }], assumptions: "The coefficient a cannot be zero.", workedExample: "For x^2 - 5x + 6 = 0, the roots are 2 and 3.", limitations: "The current tool reports real roots only; a negative discriminant has complex roots." },
  { id: "speed", subject: "physics", href: "/en/physics-calculators/speed", title: "Speed Calculator", description: "Calculate speed from distance and time in SI units.", formula: "v = d / t", variables: [{ symbol: "v", label: "speed", unit: "m/s" }, { symbol: "d", label: "distance", unit: "m" }, { symbol: "t", label: "time", unit: "s" }], assumptions: "Distance and time describe the same interval, and time is greater than zero.", workedExample: "100 m in 9.58 s is 10.44 m/s, or 37.46 km/h.", limitations: "This is average speed; it does not describe changing velocity or direction." },
  { id: "force", subject: "physics", href: "/en/physics-calculators/force", title: "Force Calculator", description: "Calculate force from mass and acceleration.", formula: "F = m x a", variables: [{ symbol: "F", label: "force", unit: "N" }, { symbol: "m", label: "mass", unit: "kg" }, { symbol: "a", label: "acceleration", unit: "m/s^2" }], assumptions: "The calculation uses Newton's second law for net force in an inertial frame.", workedExample: "A 10 kg object accelerating at 9.81 m/s^2 has a net force of 98.1 N.", limitations: "It does not separately model friction, drag, gravity or multiple force vectors." },
  { id: "kinetic-energy", subject: "physics", href: "/en/physics-calculators/kinetic-energy", title: "Kinetic Energy Calculator", description: "Calculate kinetic energy from mass and velocity.", formula: "E_k = 1/2 m v^2", variables: [{ symbol: "E_k", label: "kinetic energy", unit: "J" }, { symbol: "m", label: "mass", unit: "kg" }, { symbol: "v", label: "speed", unit: "m/s" }], assumptions: "The calculation uses classical mechanics.", workedExample: "A 10 kg object moving at 5 m/s has 125 J of kinetic energy.", limitations: "At speeds close to the speed of light, relativistic effects must be used instead." },
  { id: "dna-sequence", subject: "biology", href: "/en/biology-calculators/dna-sequence-helper", title: "DNA Sequence Helper", description: "Find a DNA complement, reverse complement, RNA complement and GC content.", formula: "A pairs with T; C pairs with G; GC% = (G + C) / total bases x 100", variables: [{ symbol: "DNA sequence", label: "bases A, C, G and T in 5' to 3' order" }], assumptions: "The entered sequence is DNA and contains only the standard bases A, C, G and T.", workedExample: "For 5'-ATGC-3', the complementary strand is 3'-TACG-5' and the reverse complement is 5'-GCAT-3'.", limitations: "This helper does not validate genes, predict biological function or replace sequence-analysis software." },
];

export function getEnglishScienceToolsBySubject(subject: EnglishScienceSubject) {
  return englishScienceTools.filter((tool) => tool.subject === subject);
}
