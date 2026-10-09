import type { ReactNode } from "react";

// Extra guidance for the English chemistry calculators: a second worked example, a reference
// table and the slips that most often produce wrong answers. Values computed where possible.

const n = (v: number, d = 3) => v.toLocaleString("en-US", { maximumFractionDigits: d });

function Table({ head, rows }: { head: string[]; rows: Array<Array<string | number>> }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SOLUTES: Array<[string, string, number]> = [
  ["Sodium chloride", "NaCl", 58.44],
  ["Potassium chloride", "KCl", 74.55],
  ["Sodium hydroxide", "NaOH", 40.0],
  ["Glucose", "C₆H₁₂O₆", 180.16],
  ["Copper(II) sulfate pentahydrate", "CuSO₄·5H₂O", 249.69],
];

const POTENTIALS: Array<[string, number]> = [
  ["Ag⁺ + e⁻ → Ag", 0.8],
  ["Cu²⁺ + 2e⁻ → Cu", 0.34],
  ["2H⁺ + 2e⁻ → H₂", 0],
  ["Fe²⁺ + 2e⁻ → Fe", -0.44],
  ["Zn²⁺ + 2e⁻ → Zn", -0.76],
  ["Li⁺ + e⁻ → Li", -3.04],
];

export const ENGLISH_CHEMISTRY_GUIDES: Record<string, { heading: string; content: ReactNode }> = {
  molarity: {
    heading: "Grams needed for common solutions",
    content: (
      <>
        <Table head={["Solute", "Formula", "Molar mass (g/mol)", "Mass for 250 mL of 0.5 M"]} rows={SOLUTES.map(([a, f, m]) => [a, f, n(m, 2), `${n(m * 0.5 * 0.25, 2)} g`])} />
        <p>
          Mass = molarity × volume (L) × molar mass. Dissolve the solid in less than the final volume, then make up to the mark in a
          volumetric flask: adding 250 mL of water to the solid gives a slightly larger volume and a lower concentration. For hydrates
          such as copper sulfate pentahydrate, use the molar mass of the hydrate you weigh, including the water.
        </p>
      </>
    ),
  },
  ph: {
    heading: "pH, [H⁺] and familiar liquids",
    content: (
      <>
        <Table head={["[H⁺] (mol/L)", "pH", "pOH at 25 °C"]} rows={[1e-1, 1e-2, 1e-3, 1e-7, 1e-11, 1e-13].map((h) => [h.toExponential(0), n(-Math.log10(h), 1), n(14 + Math.log10(h), 1)])} />
        <p>
          Each pH unit is a tenfold change in hydrogen-ion concentration, so pH 3 is ten times more acidic than pH 4. A 0.01 M solution
          of a strong acid such as HCl dissociates completely and has pH 2; a weak acid at the same concentration has a higher pH
          because only part of it dissociates. Approximate values: lemon juice about 2, pure water 7 at 25 °C, seawater about 8, household
          ammonia about 11. The relationship pH + pOH = 14 holds at 25 °C; at other temperatures the sum changes slightly.
        </p>
      </>
    ),
  },
  dilution: {
    heading: "Single and serial dilutions",
    content: (
      <>
        <p>
          To make 100 mL of 0.1 M solution from a 1 M stock, V₁ = 0.1 × 100 / 1 = 10 mL. Measure 10 mL of stock and add solvent{" "}
          <strong>up to</strong> 100 mL total, which means about 90 mL of solvent, not 100 mL.
        </p>
        <Table head={["Step", "Transfer", "Dilution factor", "Concentration from 1 M"]} rows={[1, 2, 3, 4].map((k) => [k, "1 mL into 9 mL", `1 : ${n(10 ** k, 0)}`, `${n(10 ** -k, 4)} M`])} />
        <p>Serial dilutions keep each pipetting volume practical when the overall factor is large; the total factor is the product of the individual steps.</p>
      </>
    ),
  },
  mole: {
    heading: "From grams to particles",
    content: (
      <>
        <Table
          head={["Sample", "Molar mass", "Moles", "Particles"]}
          rows={[
            ["18.0 g water", "18.015 g/mol", n(18 / 18.015), `${(18 / 18.015 * 6.02214076e23).toExponential(3)} molecules`],
            ["10.0 g sodium chloride", "58.44 g/mol", n(10 / 58.44), `${(10 / 58.44 * 6.02214076e23).toExponential(3)} formula units`],
            ["1.00 g carbon", "12.011 g/mol", n(1 / 12.011), `${(1 / 12.011 * 6.02214076e23).toExponential(3)} atoms`],
          ]}
        />
        <p>
          The Avogadro constant is exactly 6.02214076 × 10²³ per mole since the 2019 SI redefinition. Use the molar mass of the whole
          formula: oxygen gas is O₂ at 32.00 g/mol, not O at 16.00 g/mol, so 32 g of oxygen gas is one mole of molecules but two moles of atoms.
        </p>
      </>
    ),
  },
  molality: {
    heading: "Molality versus molarity",
    content: (
      <>
        <p>
          Dissolving 10.0 g of glucose (180.16 g/mol, {n(10 / 180.16, 4)} mol) in 200 g of water gives a molality of {n(10 / 180.16 / 0.2, 3)} mol/kg.
          Molality divides by the mass of <em>solvent</em>; molarity divides by the volume of <em>solution</em>. Because mass does not change
          with temperature, molality is used for boiling-point elevation and freezing-point depression.
        </p>
        <Table
          head={["", "Molarity (M)", "Molality (m)"]}
          rows={[
            ["Divides by", "litres of solution", "kilograms of solvent"],
            ["Changes with temperature", "yes (volume expands)", "no"],
            ["Typical use", "titrations, lab solutions", "colligative properties"],
          ]}
        />
        <p>For dilute aqueous solutions near room temperature the two values are close, because 1 L of water has a mass of about 1 kg.</p>
      </>
    ),
  },
  ppm: {
    heading: "ppm, percent and mg/L",
    content: (
      <>
        <Table head={["ppm", "Percent", "mg per kg"]} rows={[1, 10, 100, 1000, 10000].map((p) => [n(p, 0), `${n(p / 10000, 4)}%`, `${n(p, 0)} mg/kg`])} />
        <p>
          ppm on this page is mass-based: 1 ppm is 1 mg of solute per kilogram of mixture. In dilute water solutions 1 L has a mass of
          about 1 kg, so 1 mg/L ≈ 1 ppm; 0.5 mg of chlorine in 2 L of water is about 0.25 ppm. For gases, ppm usually means parts per
          million by volume (ppmv), which is a different quantity.
        </p>
      </>
    ),
  },
  "percent-yield": {
    heading: "Why yields fall short of 100%",
    content: (
      <>
        <p>
          A reaction with a theoretical yield of 12.5 g gives 10.2 g of dry product: percent yield = 10.2 / 12.5 × 100 = {n((10.2 / 12.5) * 100, 1)}%.
          Losses come from incomplete reactions, side reactions, transfers between vessels and product left in solution during
          recrystallisation.
        </p>
        <p>
          A yield above 100% almost always means the product is not pure or not dry: trapped solvent or water adds mass. Always calculate
          the theoretical yield from the limiting reagent, not from whichever reactant is easiest to weigh.
        </p>
      </>
    ),
  },
  "half-life": {
    heading: "Fraction remaining after each half-life",
    content: (
      <>
        <Table head={["Half-lives elapsed", "Fraction remaining", "Percent remaining"]} rows={[1, 2, 3, 4, 5, 10].map((k) => [k, `1/${2 ** k}`, `${n(100 / 2 ** k, 3)}%`])} />
        <p>
          Iodine-131, used in medicine, has a half-life of about 8 days: after 24 days (three half-lives) about 12.5% remains. Carbon-14 has
          a half-life of about 5,700 years, so a sample with a quarter of its original carbon-14 is roughly 11,400 years old. Decay never
          reaches exactly zero; after ten half-lives just under 0.1% remains.
        </p>
      </>
    ),
  },
  "cell-potential": {
    heading: "Standard reduction potentials (25 °C)",
    content: (
      <>
        <Table head={["Half-reaction", "E° (V)"]} rows={POTENTIALS.map(([r, e]) => [r, n(e, 2)])} />
        <p>
          In the Daniell cell copper is the cathode and zinc the anode: E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V. Use both
          values as reduction potentials; do not flip the sign of the anode value and then subtract it again. A positive E°cell means the
          reaction is spontaneous under standard conditions; real cells give less under load and at non-standard concentrations.
        </p>
      </>
    ),
  },
  stoichiometry: {
    heading: "Worked example: burning hydrogen",
    content: (
      <p>
        In 2H₂ + O₂ → 2H₂O the mole ratio of hydrogen to water is 2 : 2. Burning 4.00 g of hydrogen ({n(4 / 2.016)} mol at 2.016 g/mol) can
        give at most {n(4 / 2.016)} mol of water, or {n((4 / 2.016) * 18.015, 1)} g. That needs {n(4 / 2.016 / 2)} mol ({n((4 / 2.016 / 2) * 32, 1)} g) of oxygen; with less
        oxygen than that, oxygen becomes the limiting reagent and sets the yield instead. Balance the equation before using its
        coefficients.
      </p>
    ),
  },
  titration: {
    heading: "Worked example and mole ratios",
    content: (
      <p>
        25.0 mL of hydrochloric acid needs 20.0 mL of 0.100 M sodium hydroxide to reach the end point. Moles of NaOH = 0.100 × 0.0200 =
        0.00200 mol; HCl reacts 1 : 1, so the acid concentration is 0.00200 / 0.0250 = 0.0800 M. With sulfuric acid, H₂SO₄ + 2NaOH, the
        ratio is 1 : 2 and the same titre would mean 0.0400 M acid. Convert millilitres to litres before multiplying.
      </p>
    ),
  },
  kc: {
    heading: "Writing the Kc expression",
    content: (
      <p>
        For N₂ + 3H₂ ⇌ 2NH₃, Kc = [NH₃]² / ([N₂][H₂]³): each concentration is raised to its coefficient in the balanced equation.
        With [N₂] = 0.50 M, [H₂] = 1.50 M and [NH₃] = 0.30 M, Kc = 0.09 / (0.50 × 3.375) ≈ {n(0.09 / (0.5 * 3.375), 4)}. Pure solids and liquids
        are left out of the expression, and Kc applies only at the temperature it was measured at.
      </p>
    ),
  },
};
