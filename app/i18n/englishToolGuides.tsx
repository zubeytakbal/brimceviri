import type { ReactNode } from "react";

// Extra, tool-specific guidance for English calculator pages: reference tables computed
// from the same formulas as the calculators, a second worked example and common mistakes.

const n = (v: number, d = 2) => v.toLocaleString("en-US", { maximumFractionDigits: d });

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

const SPEEDS: Array<[string, number]> = [
  ["Walking pace", 1.4],
  ["Recreational cycling", 5],
  ["100 m world record (Bolt, 2009)", 100 / 9.58],
  ["Car on a 50 km/h street", 50 / 3.6],
  ["Motorway at 120 km/h", 120 / 3.6],
  ["Speed of sound in air at 20 °C", 343],
];

const ENERGY: Array<[string, number, number]> = [
  ["Tennis ball serve", 0.058, 50],
  ["Sprinter (80 kg)", 80, 10],
  ["Cyclist with bike (90 kg)", 90, 8],
  ["Car (1,500 kg) at 50 km/h", 1500, 50 / 3.6],
  ["Car (1,500 kg) at 100 km/h", 1500, 100 / 3.6],
];

export const ENGLISH_TOOL_GUIDES: Record<string, { heading: string; content: ReactNode }> = {
  "compound-interest": {
    heading: "Growth of $10,000 at 5% a year",
    content: (
      <>
        <Table
          head={["Years", "Compounded yearly", "Compounded monthly", "Simple interest"]}
          rows={[5, 10, 20, 30].map((y) => [y, `$${n(10000 * 1.05 ** y)}`, `$${n(10000 * (1 + 0.05 / 12) ** (12 * y))}`, `$${n(10000 * (1 + 0.05 * y))}`])}
        />
        <p>
          The gap between the compound and simple columns is interest earned on interest, and it widens with time. The rule of 72 gives
          a quick doubling estimate: 72 / 5 = 14.4 years, close to the exact {n(Math.log(2) / Math.log(1.05), 1)} years. Inflation works the
          same way in reverse; at 3% a year prices double in about 24 years.
        </p>
      </>
    ),
  },
  "loan-amortization": {
    heading: "Where the first payments go",
    content: (
      <>
        <p>
          A $20,000 loan at 7% over 5 years has a fixed payment of ${n((20000 * (0.07 / 12)) / (1 - (1 + 0.07 / 12) ** -60))} a month. Early
          payments are mostly interest because interest is charged on the outstanding balance:
        </p>
        <Table
          head={["Month", "Interest", "Principal", "Balance after"]}
          rows={(() => {
            const pay = (20000 * (0.07 / 12)) / (1 - (1 + 0.07 / 12) ** -60);
            let bal = 20000;
            const out: Array<Array<string | number>> = [];
            for (let k = 1; k <= 60; k += 1) {
              const i = bal * (0.07 / 12);
              bal -= pay - i;
              if (k <= 3 || k === 30 || k === 60) out.push([k, `$${n(i)}`, `$${n(pay - i)}`, `$${n(Math.max(bal, 0))}`]);
            }
            return out;
          })()}
        />
        <p>
          Total interest over the loan is about ${n(((20000 * (0.07 / 12)) / (1 - (1 + 0.07 / 12) ** -60)) * 60 - 20000, 0)}. Extra payments made early reduce the
          balance on which every later month&apos;s interest is calculated, so they save more than the same amount paid near the end.
        </p>
      </>
    ),
  },
  mortgage: {
    heading: "How the interest rate changes the payment",
    content: (
      <>
        <Table
          head={["Rate", "Monthly principal and interest ($320,000, 30 years)", "Total interest"]}
          rows={[0.05, 0.055, 0.06, 0.065, 0.07].map((r) => {
            const m = (320000 * (r / 12)) / (1 - (1 + r / 12) ** -360);
            return [`${n(r * 100, 1)}%`, `$${n(m)}`, `$${n(m * 360 - 320000, 0)}`];
          })}
        />
        <p>Each half-point of rate changes the payment by roughly $100 a month on this loan, and the total interest by tens of thousands of dollars over 30 years.</p>
      </>
    ),
  },
  "ratio-proportion": {
    heading: "Proportions in everyday problems",
    content: (
      <>
        <Table
          head={["Problem", "Proportion", "Answer"]}
          rows={[
            ["A recipe for 4 needs 300 g flour; how much for 6?", "300 / 4 = x / 6", `${n((300 * 6) / 4, 0)} g`],
            ["A map scale is 1 : 25,000; 4 cm on the map is?", "1 / 25,000 = 4 / x", `${n(4 * 25000, 0)} cm = 1 km`],
            ["5 workers finish in 12 days; 6 workers (inverse)?", "5 × 12 = 6 × x", `${n((5 * 12) / 6, 0)} days`],
            ["Mix concrete 1 : 2 : 3 for 0.6 m³", "total parts = 6", "0.1 / 0.2 / 0.3 m³"],
          ]}
        />
        <p>
          Check whether the relationship is direct or inverse before setting up the proportion. In a direct proportion both values
          grow together (more people, more flour); in an inverse proportion one falls as the other rises (more workers, fewer days),
          so the products, not the ratios, are equal.
        </p>
      </>
    ),
  },
  "linear-equation": {
    heading: "Setting up a linear equation from a word problem",
    content: (
      <>
        <p>
          A phone plan costs a $12 base fee plus $0.05 per minute. How many minutes fit into a $20 budget? Let x be the minutes:
          0.05x + 12 = 20. Subtract 12 to get 0.05x = 8, then divide by 0.05: x = 160 minutes. Check by substituting: 0.05 × 160 + 12 = 20.
        </p>
        <Table
          head={["Equation", "Step 1: subtract b", "Step 2: divide by a", "x"]}
          rows={[
            ["2x + 3 = 11", "2x = 8", "8 / 2", "4"],
            ["5x − 7 = 18", "5x = 25", "25 / 5", "5"],
            ["−3x + 4 = 19", "−3x = 15", "15 / −3", "−5"],
            ["0.05x + 12 = 20", "0.05x = 8", "8 / 0.05", "160"],
          ]}
        />
        <p>If a equals zero there is no unique solution: 0x + 3 = 3 holds for every x, while 0x + 3 = 5 has none.</p>
      </>
    ),
  },
  fractions: {
    heading: "Fractions, decimals and percentages",
    content: (
      <>
        <Table head={["Fraction", "Decimal", "Percent"]} rows={[[1, 2], [1, 3], [1, 4], [3, 8], [2, 3], [5, 6], [7, 8]].map(([a, b]) => [`${a}/${b}`, n(a / b, 4), `${n((a / b) * 100, 2)}%`])} />
        <p>
          To add fractions with different denominators, use the least common denominator rather than the product: 1/4 + 1/6 uses 12,
          giving 3/12 + 2/12 = 5/12, which is already in lowest terms. Using 24 also works (6/24 + 4/24 = 10/24) but must then be
          simplified. Dividing by a fraction is multiplying by its reciprocal: 3/4 ÷ 1/2 = 3/4 × 2/1 = 3/2.
        </p>
      </>
    ),
  },
  "descriptive-statistics": {
    heading: "Population or sample standard deviation?",
    content: (
      <>
        <p>
          For the data 4, 7, 9, 10, 10 the mean is 8 and the squared deviations sum to 16 + 1 + 1 + 4 + 4 = 26. Dividing by n = 5 gives
          the population variance 5.2 and standard deviation √5.2 ≈ {n(Math.sqrt(5.2))}. If the five values are a sample from a larger
          group, divide by n − 1 = 4 instead: variance 6.5 and standard deviation √6.5 ≈ {n(Math.sqrt(6.5))}.
        </p>
        <Table
          head={["Measure", "Value", "What it tells you"]}
          rows={[
            ["Mean", "8", "the balance point of the data"],
            ["Median", "9", "the middle value once sorted"],
            ["Mode", "10", "the most frequent value"],
            ["Range", "6", "largest minus smallest"],
            ["Population SD", n(Math.sqrt(5.2)), "typical distance from the mean"],
          ]}
        />
        <p>Use the sample formula when you want to estimate the spread of the whole population from a sample, as in most surveys and experiments.</p>
      </>
    ),
  },
  "dna-sequence": {
    heading: "Reading DNA sequence results",
    content: (
      <>
        <Table
          head={["Sequence (5'→3')", "Reverse complement", "GC content"]}
          rows={[
            ["ATGC", "GCAT", "50%"],
            ["GGCCTA", "TAGGCC", `${n((4 / 6) * 100, 1)}%`],
            ["ATATAT", "ATATAT", "0%"],
            ["GAATTC (EcoRI site)", "GAATTC", `${n((2 / 6) * 100, 1)}%`],
          ]}
        />
        <p>
          A sequence that equals its own reverse complement, such as GAATTC, is palindromic; many restriction enzymes recognise sites
          like this. GC content matters because G–C pairs are held by three hydrogen bonds and A–T pairs by two, so GC-rich stretches
          generally melt at higher temperatures. PCR primers are commonly designed with a GC content of roughly 40-60%.
        </p>
      </>
    ),
  },
  speed: {
    heading: "Everyday speeds compared",
    content: (
      <>
        <Table head={["Example", "m/s", "km/h", "mph"]} rows={SPEEDS.map(([l, v]) => [l, n(v), n(v * 3.6, 1), n(v / 0.44704, 1)])} />
        <p>
          To convert, multiply m/s by 3.6 for km/h, or divide by 0.44704 for mph (1 mile per hour is exactly 0.44704 m/s). Average speed
          over a trip with stops is total distance divided by total time: a 120 km journey that takes 1 h 30 min including a 15-minute
          break averages 120 / 1.5 = 80 km/h, even if the car never drove at exactly that speed.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Averaging two speeds directly: driving 60 km/h one way and 40 km/h back over the same distance averages 48 km/h, not 50 km/h, because more time is spent at the slower speed.</li>
          <li>Mixing units: distance in kilometres with time in seconds gives km/s, not km/h.</li>
          <li>Treating speed as velocity: speed has no direction, so a round trip back to the start has an average velocity of zero but a non-zero average speed.</li>
        </ul>
      </>
    ),
  },
  force: {
    heading: "Force in everyday situations",
    content: (
      <>
        <Table
          head={["Situation", "Mass", "Acceleration", "Net force"]}
          rows={[
            ["Weight of a 1 kg bag on Earth", "1 kg", "9.81 m/s²", `${n(9.81)} N`],
            ["Weight of a 70 kg person", "70 kg", "9.81 m/s²", `${n(70 * 9.81, 0)} N`],
            ["Same person on the Moon", "70 kg", "1.62 m/s²", `${n(70 * 1.62, 0)} N`],
            ["Car braking hard (1,500 kg)", "1,500 kg", "8 m/s²", `${n(1500 * 8, 0)} N`],
            ["Lift starting upwards (500 kg cabin)", "500 kg", "1 m/s²", `${n(500, 0)} N (plus weight)`],
          ]}
        />
        <p>
          One newton is the force that accelerates 1 kg by 1 m/s². A kilogram-force (kgf), still used on some scales and gauges, is the
          weight of 1 kg in standard gravity: 1 kgf = 9.80665 N. A car of 1,500 kg that stops from 100 km/h (27.8 m/s) in 3.5 seconds
          decelerates at about 27.8 / 3.5 ≈ 7.9 m/s², so the tyres must supply a net braking force of roughly 1,500 × 7.9 ≈ 11,900 N.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Using weight in kilograms as force: bathroom scales show mass; the force on the floor is mass × 9.81 N.</li>
          <li>Forgetting that F = m × a gives the net force; when gravity, friction or drag also act, the applied force must be larger.</li>
          <li>Using grams instead of kilograms: 500 g is 0.5 kg in the formula.</li>
        </ul>
      </>
    ),
  },
  "kinetic-energy": {
    heading: "Kinetic energy of everyday objects",
    content: (
      <>
        <Table head={["Object", "Mass (kg)", "Speed (m/s)", "Kinetic energy"]} rows={ENERGY.map(([l, m, v]) => [l, n(m, 3), n(v, 1), `${n(0.5 * m * v * v, 0)} J`])} />
        <p>
          Because speed is squared, doubling speed multiplies kinetic energy by four. The same car carries about {n((0.5 * 1500 * (100 / 3.6) ** 2) / 1000, 0)} kJ at
          100 km/h but only {n((0.5 * 1500 * (50 / 3.6) ** 2) / 1000, 0)} kJ at 50 km/h. That energy has to be removed by the brakes as heat, which is why stopping
          distance grows much faster than speed. For comparison, 1 kWh is 3.6 million joules.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Entering speed in km/h: convert to m/s first by dividing by 3.6, otherwise the answer is 12.96 times too large.</li>
          <li>Forgetting the ½: E = m × v² is twice the kinetic energy.</li>
          <li>Adding energies of objects moving in different directions as vectors: energy is a scalar and simply adds.</li>
        </ul>
      </>
    ),
  },
  percentage: {
    heading: "Three percentage questions",
    content: (
      <>
        <Table
          head={["Question", "Formula", "Example", "Answer"]}
          rows={[
            ["What % is A of B?", "A / B × 100", "18 of 72", `${n((18 / 72) * 100)}%`],
            ["What is P% of B?", "B × P / 100", "15% of 240", n(240 * 0.15)],
            ["Percentage change from A to B", "(B − A) / A × 100", "80 → 92", `${n(((92 - 80) / 80) * 100)}%`],
            ["Original value before a P% rise", "B / (1 + P/100)", "120 after a 20% rise", n(120 / 1.2)],
          ]}
        />
        <p>
          Percentage points and percent are different: an interest rate rising from 4% to 5% has gone up by one percentage point, which
          is a 25% increase relative to the starting rate. Likewise, a 20% discount followed by a 20% price rise does not return to the
          original price: 100 × 0.8 × 1.2 = 96.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Dividing by the wrong base: percentage change always divides by the starting value.</li>
          <li>Removing a percentage by subtracting it: to remove 20% VAT from 120, divide by 1.2 (= 100), do not subtract 20% of 120 (= 96).</li>
        </ul>
      </>
    ),
  },
  mean: {
    heading: "Mean, median and weighted mean",
    content: (
      <>
        <p>
          Take the monthly incomes 2,100, 2,300, 2,400, 2,600 and 9,600. The arithmetic mean is 19,000 / 5 = 3,800, but four of the five
          values are below it. The median, the middle value once sorted, is 2,400 and describes the typical value better. When one or two
          extreme values pull the mean away from the rest, report the median alongside it.
        </p>
        <Table
          head={["Measure", "How it is found", "Value for the example"]}
          rows={[
            ["Arithmetic mean", "sum / count", "3,800"],
            ["Median", "middle value after sorting", "2,400"],
            ["Mean without the outlier", "9,400 / 4", "2,350"],
          ]}
        />
        <p>
          A weighted mean is needed when values count differently. Exam marks of 70 (weight 30%) and 85 (weight 70%) average to 70 × 0.3
          + 85 × 0.7 = 80.5, not the simple mean of 77.5.
        </p>
      </>
    ),
  },
  quadratic: {
    heading: "What the discriminant tells you",
    content: (
      <>
        <Table
          head={["Equation", "a, b, c", "Discriminant b² − 4ac", "Roots"]}
          rows={[
            ["x² − 5x + 6 = 0", "1, −5, 6", "1", "2 and 3"],
            ["x² − 6x + 9 = 0", "1, −6, 9", "0", "3 (double root)"],
            ["2x² + 3x − 2 = 0", "2, 3, −2", "25", "0.5 and −2"],
            ["x² + 2x + 5 = 0", "1, 2, 5", "−16", "no real roots (−1 ± 2i)"],
          ]}
        />
        <p>
          A positive discriminant gives two real roots, zero gives one repeated root and a negative value gives two complex roots. You
          can check any answer by substituting it back: for 2x² + 3x − 2 with x = 0.5, 2 × 0.25 + 1.5 − 2 = 0. When b is very large compared
          with a and c, the formula can lose precision on a calculator; computing one root as c / (a × other root) avoids that.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Dropping the sign of b: in x² − 5x + 6, b is −5, so −b is +5.</li>
          <li>Dividing only the square-root term by 2a: the whole numerator, −b ± √(b² − 4ac), is divided by 2a.</li>
        </ul>
      </>
    ),
  },
  roas: {
    heading: "Break-even ROAS by gross margin",
    content: (
      <>
        <p>
          ROAS says how much revenue each unit of ad spend brought in, but revenue is not profit. A campaign only pays for itself when the
          gross profit on the attributed sales covers the ad spend, so the minimum ROAS is 1 divided by the gross margin.
        </p>
        <Table head={["Gross margin", "Break-even ROAS", "As a percentage"]} rows={[0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map((m) => [`${n(m * 100, 0)}%`, `${n(1 / m)} : 1`, `${n(100 / m, 0)}%`])} />
        <p>
          Example: a shop with a 40% gross margin spends $2,000 and records $6,000 of attributed sales, a ROAS of 3 : 1. Gross profit is
          $6,000 × 0.4 = $2,400, leaving $400 after ad spend, before shipping, returns and payment fees. At a 30% margin the same ROAS would
          lose $200.
        </p>
      </>
    ),
  },
  "profit-margin": {
    heading: "Margin and markup side by side",
    content: (
      <>
        <Table head={["Markup on cost", "Gross margin on price", "Price for a $60 cost"]} rows={[0.25, 0.5, 0.6667, 1, 1.5, 2].map((k) => [`${n(k * 100, 0)}%`, `${n((k / (1 + k)) * 100, 1)}%`, `$${n(60 * (1 + k))}`])} />
        <p>
          Margin = markup / (1 + markup) and markup = margin / (1 − margin). A 50% markup is only a 33.3% margin, and a 100% markup (doubling
          the cost) is a 50% margin. To hit a target margin, divide cost by (1 − margin): a $60 item needs a $100 price for a 40% margin,
          not $84, which is a 40% markup.
        </p>
        <h3>Common mistakes</h3>
        <ul>
          <li>Quoting markup when a buyer or investor asks for margin; the markup figure always looks larger.</li>
          <li>Including VAT or sales tax in the price but not in the cost, which overstates margin.</li>
        </ul>
      </>
    ),
  },
  "break-even": {
    heading: "How price changes move the break-even point",
    content: (
      <>
        <p>Using the worked example ($5,000 fixed costs, $20 variable cost per unit), small price changes shift break-even sharply because they change the contribution per unit.</p>
        <Table head={["Price per unit", "Contribution per unit", "Break-even units", "Break-even sales"]} rows={[40, 45, 50, 55, 60, 70].map((p) => [`$${p}`, `$${p - 20}`, n(Math.ceil(5000 / (p - 20)), 0), `$${n(Math.ceil(5000 / (p - 20)) * p, 0)}`])} />
        <p>
          Round break-even units up: you cannot sell two-thirds of a unit, so 166.67 units means 167 sales. The margin of safety, (expected
          sales − break-even sales) / expected sales, shows how far sales can fall before the business makes a loss.
        </p>
      </>
    ),
  },
  "ad-performance": {
    heading: "Reading the metrics together",
    content: (
      <>
        <p>
          Each metric answers a different question: CPM is the price of attention, CTR how compelling the ad is, CPC the price of a visit,
          conversion rate how well the landing page sells and CPA the cost of a customer. Because CPA = CPC / conversion rate, a campaign
          with an expensive click can still win if it converts better.
        </p>
        <Table
          head={["Campaign", "CPC", "Conversion rate", "CPA"]}
          rows={[
            ["A", "$0.80", "2%", `$${n(0.8 / 0.02)}`],
            ["B", "$1.50", "5%", `$${n(1.5 / 0.05)}`],
            ["C", "$0.40", "0.8%", `$${n(0.4 / 0.008)}`],
          ]}
        />
        <p>Campaign B has the most expensive clicks but the cheapest customers. Compare campaigns on CPA or ROAS over the same date range and attribution window, not on CTR alone.</p>
      </>
    ),
  },
};
