import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GoldPurityCalculator from "../../components/GoldPurityCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alloy, GOLD_GRADES, pureGold } from "../../converter/goldPurity";
import { GOLD_CALCULATOR_PATHS, goldCalculatorAlternates } from "../../i18n/goldCalculatorPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = GOLD_CALCULATOR_PATHS.en;
const title = "Gold Karat Calculator: Purity, Pure Gold & 14k to 18k";
const description =
  "How much pure gold is in 10k, 14k, 18k or 22k gold? Karat to purity and hallmark (417, 585, 750), how much gold to add to turn 14k into 18k, and melt value at your price.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: goldCalculatorAlternates() },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const up = alloy(10, 14 / 24, 18 / 24);
const add = up && up.direction === "up" ? up.addPureGold : 0;

const faqItems: FaqItem[] = [
  {
    question: "What is the difference between 14k and 18k gold?",
    answer:
      "14k gold is 14 parts pure gold out of 24 (58.3%, stamped 585); 18k gold is 18 parts out of 24 (75%, stamped 750). 18k has a richer yellow color and more gold per gram; 14k contains more alloy metals, so it is harder, more scratch-resistant and cheaper.",
  },
  {
    question: "How much pure gold is in 14k gold?",
    answer: `58.33% by the karat definition, so a 10 g 14k chain contains ${f(pureGold(10, 14 / 24), 2)} g of pure gold. Using the 585 hallmark it is ${f(pureGold(10, 0.585), 2)} g.`,
  },
  {
    question: "How do you convert 14k gold to 18k?",
    answer: `By alloying up with pure gold: to turn 10 g of 14k into 18k you add ${f(add, 2)} g of 24k gold, which gives ${f(10 + add, 2)} g of 18k. The formula is weight × (target purity − current purity) ÷ (1 − target purity).`,
  },
  {
    question: "What do 417, 585, 750 and 916 mean on gold?",
    answer: `They are hallmarks: parts of pure gold per 1,000. ${GOLD_GRADES.filter((g) => g.karat !== 24)
      .map((g) => `${g.hallmark} = ${g.karat}k`)
      .join(", ")}, and 999 is pure (24k) gold.`,
  },
  {
    question: "Is 10k gold real gold?",
    answer: "Yes. 10k is 41.7% pure gold (hallmark 417) and is the lowest karat that may be sold as gold in the United States. In the UK the lowest common standard is 9ct (375).",
  },
];

export default function GoldKaratCalculatorPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/categories/gold-karat", label: "Gold Karat" },
        { href: path, label: "Gold Karat Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Gold Karat Calculator"
      intro="Enter the weight and karat of your gold: see how much pure gold it contains, the same amount of gold in another karat, how much pure gold or alloy to add to change the karat, and the melt value at the price you enter."
      tool={<GoldPurityCalculator lang="en" defaultBasis="karat" />}
      related={{
        title: "Related gold tools",
        links: [
          { href: "/en/14k-gold-to-18k-gold", label: "14K to 18K gold (same pure gold)" },
          { href: "/en/22k-gold-to-24k-gold", label: "22K to 24K gold" },
          { href: "/en/carats-to-grams", label: "Gemstone carats to grams" },
          { href: "/en/categories/gold-karat", label: "All gold karat conversions" },
        ],
      }}
      tocTitle="Contents"
      tocItems={[
        { id: "chart", label: "Gold karat chart" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="chart">Gold karat chart</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Karat</th>
              <th scope="col">Hallmark</th>
              <th scope="col">Pure gold</th>
              <th scope="col">Pure gold in 10 g</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_GRADES.map((g) => (
              <tr key={g.karat}>
                <td>{g.karat}k</td>
                <td>{g.hallmark}</td>
                <td>{f((g.karat / 24) * 100, 1)}%</td>
                <td>{f(pureGold(10, g.karat / 24), 2)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Karat measures purity, not weight: pure gold is 24 karat, and each karat is one twenty-fourth. The hallmark gives the same purity in parts per
        thousand and is usually rounded down slightly (14k = 58.33% but is stamped 585). The calculator uses karat ÷ 24 by default, the arithmetic
        jewellers use for alloying; switch to the hallmark basis to match a buyer who weighs by the stamp. Gemstone carats are a different unit of
        weight, see <Link href="/en/carats-to-grams">carats to grams</Link>. The chart includes 10k and 9ct, the most common
        karats in US and UK jewelry.
      </p>
    </TimeToolPage>
  );
}
