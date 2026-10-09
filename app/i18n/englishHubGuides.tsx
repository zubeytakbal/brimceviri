import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";

// Hub-specific reference sections for English category pages: a worked example that ties
// the hub's tools together and a quick-reference table, computed from the same formulas.

const n = (v: number, d = 2) => v.toLocaleString("en-US", { maximumFractionDigits: d });

function Table({ head, rows }: { head: string[]; rows: Array<Array<ReactNode>> }) {
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

const payment = (p: number, rate: number, years: number) => {
  const r = rate / 12;
  const k = years * 12;
  return (p * r * (1 + r) ** k) / ((1 + r) ** k - 1);
};

// 0-100 km/h example shared by the physics hub.
const CAR = { m: 1200, v: 100 / 3.6, t: 10 };

export const ENGLISH_HUB_GUIDES: Record<string, Array<{ heading: string; content: ReactNode }>> = {
  "/en/physics-calculators": [
    {
      heading: "One example, three calculators",
      content: (
        <>
          <p>
            A {n(CAR.m, 0)} kg car accelerates from rest to 100 km/h ({n(CAR.v)} m/s) in {CAR.t} seconds. The three tools on this page
            describe the same event from different angles:
          </p>
          <Table
            head={["Quantity", "Formula", "Result"]}
            rows={[
              ["Average speed during the run", "v = d / t (here (0 + v) / 2)", `${n(CAR.v / 2)} m/s, covering ${n((CAR.v / 2) * CAR.t, 0)} m`],
              ["Average acceleration", "a = Δv / t", `${n(CAR.v / CAR.t)} m/s²`],
              ["Net force needed", "F = m × a", `${n((CAR.m * CAR.v) / CAR.t, 0)} N`],
              ["Kinetic energy at 100 km/h", "E = ½ m v²", `${n((0.5 * CAR.m * CAR.v ** 2) / 1000, 1)} kJ`],
            ]}
          />
          <p>
            Every calculator works in SI units: metres, kilograms and seconds. Convert km/h to m/s by dividing by 3.6 and grams to
            kilograms by dividing by 1,000 before entering values; for other units use the <Link href="/en/categories/speed">speed</Link>{" "}
            and <Link href="/en/categories/energy">energy</Link> converters.
          </p>
        </>
      ),
    },
  ],
  "/en/science-calculators": [
    {
      heading: "Which calculator do I need?",
      content: (
        <Table
          head={["Your question", "Use"]}
          rows={[
            ["How many grams of NaCl make 250 mL of a 0.5 M solution?", <Link key="m" href="/en/chemistry-calculators/molarity">Molarity calculator</Link>],
            ["How do I dilute a stock solution to a lower concentration?", <Link key="d" href="/en/chemistry-calculators/dilution">Dilution (C₁V₁ = C₂V₂)</Link>],
            ["What is the pH of a 0.01 M strong acid?", <Link key="p" href="/en/chemistry-calculators/ph">pH calculator</Link>],
            ["What fraction of a sample is left after three half-lives?", <Link key="h" href="/en/chemistry-calculators/half-life">Half-life calculator</Link>],
            ["What are the roots of 2x² + 3x − 2 = 0?", <Link key="q" href="/en/mathematics-calculators/quadratic-roots">Quadratic roots</Link>],
            ["What is the force needed to accelerate 10 kg at 2 m/s²?", <Link key="f" href="/en/physics-calculators/force">Force calculator</Link>],
            ["What is the GC content of a DNA sequence?", <Link key="g" href="/en/biology-calculators/dna-sequence-helper">DNA sequence helper</Link>],
          ]}
        />
      ),
    },
    {
      heading: "How results are presented",
      content: (
        <p>
          Each calculator shows the formula it uses, the units it expects and a worked example you can check by hand. They are intended
          for learning, homework checking and quick laboratory planning. Results are rounded for display; keep full precision in
          intermediate steps of your own work and apply the significant-figure rules your course or laboratory uses.
        </p>
      ),
    },
  ],
  "/en/finance-calculators": [
    {
      heading: "How the loan term changes the cost",
      content: (
        <>
          <p>For a $320,000 loan at a 6% fixed rate, a shorter term raises the monthly payment but cuts the total interest sharply:</p>
          <Table
            head={["Term", "Monthly principal and interest", "Total interest paid"]}
            rows={[10, 15, 20, 30].map((y) => {
              const m = payment(320000, 0.06, y);
              return [`${y} years`, `$${n(m)}`, `$${n(m * y * 12 - 320000, 0)}`];
            })}
          />
          <p>
            The monthly figure uses the standard amortization formula shown on the mortgage calculator. Taxes, insurance, fees and rate
            changes are not included; compare these figures with the official loan estimate from a lender before deciding.
          </p>
        </>
      ),
    },
  ],
  "/en/business-calculators": [
    {
      heading: "Which metric answers which question?",
      content: (
        <Table
          head={["Question", "Metric", "Formula"]}
          rows={[
            ["How many units must I sell to stop losing money?", "Break-even point", "fixed costs / (price − variable cost)"],
            ["How much of each sale is gross profit?", "Gross margin", "(price − cost) / price"],
            ["How much did I add on top of cost?", "Markup", "(price − cost) / cost"],
            ["How much revenue did each ad dollar bring?", "ROAS", "attributed revenue / ad spend"],
            ["What does one customer cost me in ads?", "CPA", "ad spend / conversions"],
          ]}
        />
      ),
    },
    {
      heading: "Putting them together",
      content: (
        <p>
          A product sells for $50 and costs $30 to make and ship, a 40% gross margin. The break-even ROAS for advertising it is therefore
          1 / 0.40 = 2.5 : 1, and the highest CPA that still breaks even is the $20 gross profit per order. If a campaign delivers
          customers at $15 CPA, each order adds $5 towards fixed costs; at $25 CPA, each order loses $5 before overheads.
        </p>
      ),
    },
  ],
  "/en/automotive-calculators": [
    {
      heading: "Quick reference",
      content: (
        <>
          <Table
            head={["Calculation", "Formula", "Example"]}
            rows={[
              ["Tire diameter (metric size)", "rim × 25.4 + 2 × width × aspect ratio", `205/55 R16: ${n(16 * 25.4 + 2 * 205 * 0.55, 1)} mm`],
              ["L/100 km to US mpg", "235.215 / (L/100 km)", `6.5 L/100 km = ${n(235.215 / 6.5, 1)} mpg (US)`],
              ["L/100 km to UK mpg", "282.481 / (L/100 km)", `6.5 L/100 km = ${n(282.481 / 6.5, 1)} mpg (UK)`],
              ["Trip fuel cost", "distance × L/100 km / 100 × price", `450 km × 6.5 / 100 × $1.80 = $${n(450 * 0.065 * 1.8)}`],
              ["EV charging time (estimate)", "energy needed / charger power", `40 kWh / 11 kW ≈ ${n(40 / 11, 1)} h before losses`],
            ]}
          />
          <p>
            US and UK miles per gallon differ because the gallons differ (3.785 L and 4.546 L), so always check which one a figure uses.
            Real charging takes longer than the simple estimate: some energy is lost as heat, and fast chargers slow down as the battery
            fills.
          </p>
        </>
      ),
    },
  ],
  "/en/fitness-calculators": [
    {
      heading: "Quick reference",
      content: (
        <>
          <Table
            head={["Calculation", "Formula", "Example"]}
            rows={[
              ["BMI", "weight (kg) / height (m)²", `70 kg, 1.75 m: ${n(70 / 1.75 ** 2, 1)}`],
              ["One-rep max (Epley)", "weight × (1 + reps / 30)", `100 kg × 5 reps: ${n(100 * (1 + 5 / 30), 1)} kg`],
              ["Pace to speed", "60 / pace (min per km)", "5:00 min/km = 12 km/h"],
              ["Marathon finish time", "42.195 km × pace", `5:00 min/km: ${Math.floor((42.195 * 5) / 60)} h ${n((42.195 * 5) % 60, 0)} min`],
            ]}
          />
          <p>
            These figures are population-level estimates. BMI does not distinguish muscle from fat, one-rep-max formulas are least
            accurate above about ten repetitions, and calorie estimates can differ from measured energy use by several hundred calories
            a day. Use them to track change over time rather than as a diagnosis, and talk to a health professional for medical advice.
          </p>
        </>
      ),
    },
  ],
  "/en/data-computing-calculators": [
    {
      heading: "Quick reference",
      content: (
        <Table
          head={["Calculation", "Formula", "Example"]}
          rows={[
            ["Print size to pixels", "inches × DPI", "A4 (8.27 × 11.69 in) at 300 DPI ≈ 2480 × 3508 px"],
            ["Video file size", "bitrate (Mbps) × seconds / 8", `8 Mbps for 10 min = ${n((8 * 600) / 8, 0)} MB`],
            ["Megabit to megabyte", "Mb / 8", "100 Mbps link = 12.5 MB/s at most"],
            ["Unix timestamp", "seconds since 1970-01-01 00:00 UTC", "2,147,483,647 = 2038-01-19 03:14:07 UTC"],
            ["Hex colour to RGB", "pairs of base-16 digits", "#367DA5 = rgb(54, 125, 165)"],
            ["AWG to mm²", "standard wire table", "12 AWG ≈ 3.31 mm², 14 AWG ≈ 2.08 mm²"],
          ]}
        />
      ),
    },
  ],
  "/en/decision-savings-calculators": [
    {
      heading: "How payback is worked out",
      content: (
        <>
          <p>
            Every tool here compares an upfront cost with a yearly saving. Simple payback = upfront cost / annual saving. Replacing a
            60 W incandescent bulb with a 9 W LED that runs 3 hours a day saves 51 W × 3 h × 365 = {n((51 * 3 * 365) / 1000, 1)} kWh a year,
            or ${n(((51 * 3 * 365) / 1000) * 0.15)} at $0.15 per kWh; a $3 bulb pays for itself in under five months.
          </p>
          <Table
            head={["Upfront cost", "Annual saving", "Simple payback"]}
            rows={[
              ["$3", `$${n(((51 * 3 * 365) / 1000) * 0.15)}`, `${n(3 / (((51 * 3 * 365) / 1000) * 0.15), 1)} years`],
              ["$2,500", "$400", `${n(2500 / 400, 1)} years`],
              ["$9,000", "$900", `${n(9000 / 900, 1)} years`],
            ]}
          />
          <p>
            Simple payback ignores energy-price changes, maintenance, financing and the value of money over time. Use your own local
            prices: the result is only as good as the price and usage figures you enter.
          </p>
        </>
      ),
    },
  ],
};

const D = "/en/decision-savings-calculators";
const kwh = (w: number, h: number) => (w * h * 365) / 1000;

// Example inputs used on the savings pages; every figure is labelled as an example.
export const ENGLISH_PAGE_GUIDES: Record<string, Array<{ heading: string; content: ReactNode }>> = {
  [`${D}/led-savings-calculator`]: [
    {
      heading: "Choosing an LED by brightness",
      content: (
        <>
          <Table
            head={["Old incandescent", "Light output", "Typical LED", "Yearly cost, old (3 h/day, $0.15/kWh)", "Yearly cost, LED"]}
            rows={[
              [40, 450, 6],
              [60, 800, 9],
              [75, 1100, 12],
              [100, 1600, 15],
            ].map(([w, lm, led]) => [`${w} W`, `${lm} lm`, `${led} W`, `$${n(kwh(w, 3) * 0.15)}`, `$${n(kwh(led, 3) * 0.15)}`])}
          />
          <p>
            Compare bulbs by lumens, the amount of light, rather than watts. The lumen figures are the usual equivalents printed on LED
            packaging; LED wattages vary by model, so read the box. Savings are largest for lamps that are on for many hours a day.
          </p>
        </>
      ),
    },
  ],
  [`${D}/ev-vs-gas-running-cost`]: [
    {
      heading: "Cost per 100 km with example prices",
      content: (
        <>
          <Table
            head={["Vehicle", "Consumption", "Example price", "Cost per 100 km", "Cost for 15,000 km"]}
            rows={[
              ["Petrol car", "7 L/100 km", "$1.60/L", `$${n(7 * 1.6)}`, `$${n(7 * 1.6 * 150, 0)}`],
              ["EV, home charging", "17 kWh/100 km", "$0.15/kWh", `$${n(17 * 0.15)}`, `$${n(17 * 0.15 * 150, 0)}`],
              ["EV, public fast charging", "17 kWh/100 km", "$0.50/kWh", `$${n(17 * 0.5)}`, `$${n(17 * 0.5 * 150, 0)}`],
            ]}
          />
          <p>
            The result depends almost entirely on where the EV is charged: with these example prices home charging costs less than a
            quarter of petrol per kilometre, while frequent fast charging narrows the gap. Add around 10% to the EV energy figure for
            charging losses, and use winter consumption if most driving happens in the cold.
          </p>
        </>
      ),
    },
  ],
  [`${D}/heat-pump-vs-boiler-cost`]: [
    {
      heading: "Cost of one kilowatt-hour of heat",
      content: (
        <>
          <p>
            A heat pump moves heat rather than making it, so one kilowatt-hour of electricity can deliver several kilowatt-hours of heat.
            The ratio is the coefficient of performance (COP), or the seasonal average (SCOP) over a winter. A gas boiler turns at most
            about 90% of the gas energy into useful heat.
          </p>
          <Table
            head={["System", "Efficiency", "Example energy price", "Cost per kWh of heat"]}
            rows={[
              ["Gas boiler", "90%", "$0.08 per kWh of gas", `$${n(0.08 / 0.9, 3)}`],
              ["Heat pump", "SCOP 3.0", "$0.25 per kWh of electricity", `$${n(0.25 / 3, 3)}`],
              ["Heat pump", "SCOP 2.5", "$0.25 per kWh of electricity", `$${n(0.25 / 2.5, 3)}`],
              ["Electric heater", "100%", "$0.25 per kWh of electricity", "$0.25"],
            ]}
          />
          <p>The break-even point is when electricity price / SCOP equals gas price / boiler efficiency; enter your own tariffs, because the ratio between gas and electricity prices differs widely between countries.</p>
        </>
      ),
    },
  ],
  [`${D}/insulation-payback-calculator`]: [
    {
      heading: "How U-values turn into kilowatt-hours",
      content: (
        <>
          <p>
            Heat loss through a wall is U-value × area × temperature difference. Over a heating season this is usually estimated with
            heating degree-days (HDD): annual kWh ≈ U × A × HDD × 24 / 1000. For 50 m² of wall in a climate with 2,500 degree-days:
          </p>
          <Table
            head={["Wall", "U-value (W/m²K)", "Annual heat loss"]}
            rows={[
              ["Uninsulated solid wall", "1.5", `${n((1.5 * 50 * 2500 * 24) / 1000, 0)} kWh`],
              ["After insulation", "0.3", `${n((0.3 * 50 * 2500 * 24) / 1000, 0)} kWh`],
              ["Saving", "", `${n(((1.5 - 0.3) * 50 * 2500 * 24) / 1000, 0)} kWh`],
            ]}
          />
          <p>
            The money saved is that heat divided by the heating system&apos;s efficiency, multiplied by the fuel price. Degree-days for your
            location are published by national weather services; the U-values above are typical illustrations, not measurements of a
            particular wall.
          </p>
        </>
      ),
    },
  ],
  [`${D}/solar-payback-calculator`]: [
    {
      heading: "Example: a 4 kW rooftop system",
      content: (
        <>
          <p>
            Annual output = system size × specific yield. A 4 kW system with an example yield of 1,100 kWh per kW per year produces about
            4,400 kWh. Electricity used in the home is worth the full retail price; electricity exported is usually paid at a lower rate.
          </p>
          <Table
            head={["Share used at home", "Value at $0.25 used / $0.08 exported", "Payback on $7,000"]}
            rows={[0.3, 0.5, 0.7].map((share) => {
              const v = 4400 * share * 0.25 + 4400 * (1 - share) * 0.08;
              return [`${n(share * 100, 0)}%`, `$${n(v, 0)} a year`, `${n(7000 / v, 1)} years`];
            })}
          />
          <p>Using more of the output at home, for example by running appliances in daytime, shortens payback more than a small change in system price. Specific yield depends on location, roof angle and shading; check a local estimate before relying on the result.</p>
        </>
      ),
    },
  ],
  [`${D}/remote-work-vs-office-cost`]: [
    {
      heading: "Where the money goes",
      content: (
        <>
          <p>An example commute of 20 km each way by car, 7 L/100 km, $1.60 per litre and 220 working days:</p>
          <Table
            head={["Item", "Calculation", "Yearly cost"]}
            rows={[
              ["Commuting fuel", "40 km × 220 days × 7 / 100 × $1.60", `$${n(40 * 220 * 0.07 * 1.6, 0)}`],
              ["Extra home electricity (laptop, monitor, light: 150 W, 8 h)", "0.15 kW × 8 h × 220 days × $0.15", `$${n(0.15 * 8 * 220 * 0.15, 0)}`],
              ["Extra home heating", "depends on climate and season", "enter your own estimate"],
            ]}
          />
          <p>Commuting usually dominates, but heating a home all day in winter can be significant in cold climates. Parking, public-transport passes, lunches and time spent travelling are worth adding as your own line items.</p>
        </>
      ),
    },
  ],
};
