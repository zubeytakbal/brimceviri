// English gold karat pair pages (24K→22K, 22K→24K, 18K↔22K, 14K→18K). They were merged into the gold karat
// calculator in October 2026 but had the clicks in Search Console, so each came back with its own question:
// making 22K from pure gold, the pure gold in 22K jewellery, upgrading 18K, alloying 22K down for stone settings
// and 14K versus 18K. Numbers come from goldPurity.ts (karat ÷ 24); hallmarks are mentioned where buyers use them.
import { alloy, equivalentWeight, pureGold } from "./goldPurity";

export type KaratPair = {
  slug: string;
  from: number;
  to: number;
  title: string;
  /** Shorter title when the long one does not fit in 60 characters with the site suffix. */
  shortTitle: string;
  description: string;
  h1: string;
  intro: string;
  /** Weights used in the table (grams). */
  weights: number[];
  sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
};

const p = (k: number) => k / 24;
const f = (n: number, d = 2) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

const down = (w: number, from: number, to: number) => {
  const r = alloy(w, p(from), p(to));
  return r && r.direction === "down" ? r : null;
};
const up = (w: number, from: number, to: number) => {
  const r = alloy(w, p(from), p(to));
  return r && r.direction === "up" ? r : null;
};

const ten24to22 = down(10, 24, 22)!;
const ten22to18 = down(10, 22, 18)!;
const ten18to22 = up(10, 18, 22)!;
const ten14to18 = up(10, 14, 18)!;

const CALC = { href: "/en/gold-karat-calculator", label: "Gold karat calculator (all karats)" };
const INDIA = { href: "/en/gold-price-calculator-india", label: "Gold price calculator (India, making charges and GST)" };

export const KARAT_PAIRS: KaratPair[] = [
  {
    slug: "24k-gold-to-22k-gold",
    from: 24,
    to: 22,
    title: "24K to 22K Gold: How Many Grams and How Much Alloy",
    shortTitle: "24K to 22K Gold Converter",
    description:
      "How many grams of 22K gold does 24K gold make? Table from 1 g to 100 g, the copper or silver alloy a goldsmith adds, and the 22K rate worked out from the 24K rate.",
    h1: "24K to 22K gold",
    intro:
      "Pure 24K gold becomes 22K when alloy metal is added: the gold stays the same, the weight goes up. Enter a weight to see how much 22K it makes and how much alloy goes in.",
    weights: [1, 5, 8, 10, 20, 50, 100],
    sections: [
      {
        id: "formula",
        heading: "The formula",
        paragraphs: [
          `22K gold is 22 parts gold in 24, so the same pure gold weighs 24 ÷ 22 times as much once it is 22K: 22K weight = 24K weight × 24 ÷ 22. Ten grams of 24K therefore makes ${f(ten24to22.finalWeight)} g of 22K, and the extra ${f(ten24to22.addAlloy)} g is the alloy metal.`,
          "The 8 g row in the table is one sovereign (pavan), the unit many South Indian families use for gold coins and jewellery.",
        ],
      },
      {
        id: "rate",
        heading: "Working out the 22K rate from the 24K rate",
        paragraphs: [
          "Because 22K contains 22/24 (91.67%) of the gold, its metal value is 91.67% of the 24K price per gram. BIS-hallmarked 22K jewellery is stamped 916 (91.6%), so a buyer who prices by the hallmark uses 0.916 instead.",
          "Published 22K rates in shops are close to this but not identical, and jewellery adds making charges and tax on top. To price a piece with making charges and GST, use the gold price calculator.",
        ],
      },
      {
        id: "why",
        heading: "Why jewellery is made in 22K, not 24K",
        paragraphs: [
          "Pure gold is soft and scratches and bends easily. Alloying it with copper, silver or zinc makes it harder while keeping most of the gold, which is why 22K is the standard for bangles, chains and wedding jewellery in India and the Gulf, while bars and coins stay 24K.",
        ],
      },
    ],
    faq: [
      {
        question: "How many grams of 22K gold can I make from 10 grams of 24K?",
        answer: `${f(ten24to22.finalWeight)} grams. The goldsmith adds ${f(ten24to22.addAlloy)} g of alloy (10 × 24 ÷ 22 − 10); the pure gold content stays 10 g.`,
      },
      {
        question: "Is 22K gold the same as 916 gold?",
        answer: "Yes. 916 is the hallmark for 22K: 916 parts of pure gold per 1,000. By the karat definition 22K is 91.67%; the hallmark rounds it down to 91.6%.",
      },
      {
        question: "What metals are mixed with gold to make 22K?",
        answer: "Mostly copper and silver, sometimes a little zinc. Copper gives a warmer, redder tone and silver a paler one; the gold content (22/24) is the same either way.",
      },
      {
        question: "Does 24K gold lose weight when it is made into 22K jewellery?",
        answer: "The alloy makes the piece heavier, not lighter. Melting, casting and polishing can lose a small amount of metal, which jewellers usually cover through wastage or making charges rather than in the purity.",
      },
    ],
    related: [{ href: "/en/22k-gold-to-24k-gold", label: "22K to 24K gold (pure gold in 22K)" }, INDIA, CALC],
  },
  {
    slug: "22k-gold-to-24k-gold",
    from: 22,
    to: 24,
    title: "22K to 24K Gold: Pure Gold in 22K Jewellery",
    shortTitle: "22K to 24K Gold Converter",
    description:
      "How much 24K (pure) gold is in 22K jewellery? Grams of pure gold from 1 g to 100 g of 22K, what a buyer pays for when you sell or exchange it, and why 22K costs less per gram.",
    h1: "22K to 24K gold",
    intro:
      "22K gold is 91.67% gold. Enter the weight of your 22K jewellery to see how much pure 24K gold it contains, which is what it is worth when sold or exchanged.",
    weights: [1, 5, 8, 10, 20, 50, 100],
    sections: [
      {
        id: "formula",
        heading: "How much pure gold is in 22K",
        paragraphs: [
          `Multiply by 22 ÷ 24: pure gold = 22K weight × 0.9167. A 10 g chain contains ${f(pureGold(10, p(22)))} g of 24K gold and ${f(10 - pureGold(10, p(22)))} g of alloy. If the buyer uses the 916 hallmark instead, the same chain counts as ${f(pureGold(10, 0.916))} g.`,
        ],
      },
      {
        id: "selling",
        heading: "Selling or exchanging 22K jewellery",
        paragraphs: [
          "A jeweller or buyer tests the actual purity (with an XRF machine or a touchstone) and pays for the pure gold it contains, usually after a deduction. Making charges you paid when buying are not returned, so old jewellery is worth roughly its pure gold content at the day's 24K rate, minus that deduction.",
          "Ask what purity the test shows and how much is deducted before you agree to an exchange. A hallmarked 916 piece should test at or above 91.6%.",
        ],
      },
      {
        id: "refining",
        heading: "Can 22K gold be turned into 24K?",
        paragraphs: [
          "Not by a goldsmith at the counter. Removing the copper and silver needs refining (chemical or electrolytic), which refiners do in bulk. In practice 22K is never upgraded; it is sold or exchanged by its pure gold content, which is the number this page calculates.",
        ],
      },
    ],
    faq: [
      {
        question: "How much 24K gold is in 10 grams of 22K?",
        answer: `${f(pureGold(10, p(22)))} grams by the karat definition (10 × 22 ÷ 24), or ${f(pureGold(10, 0.916))} grams using the 916 hallmark.`,
      },
      {
        question: "Why is 22K gold cheaper than 24K per gram?",
        answer: "Because 8.33% of every gram is copper or silver, which is worth very little compared with gold. The 22K price is about 91.67% of the 24K price before making charges.",
      },
      {
        question: "Is 22K gold good for investment?",
        answer: "For investment, 24K coins and bars are cheaper to buy and easier to sell because they carry little or no making charge. 22K jewellery is bought for wear; its making charges are lost when it is sold.",
      },
    ],
    related: [{ href: "/en/24k-gold-to-22k-gold", label: "24K to 22K gold (alloy to add)" }, { href: "/en/22k-gold-to-18k-gold", label: "22K to 18K gold" }, INDIA, CALC],
  },
  {
    slug: "18k-gold-to-22k-gold",
    from: 18,
    to: 22,
    title: "18K to 22K Gold: Pure Gold to Add and Value",
    shortTitle: "18K to 22K Gold Converter",
    description:
      "Turning 18K gold into 22K needs pure gold, not alloy. How much 24K to add for 1 g to 100 g of 18K, how many grams of 22K your 18K is worth, and when an exchange makes more sense.",
    h1: "18K to 22K gold",
    intro:
      "18K gold (75%) has less gold than 22K (91.67%). Enter a weight to see how much pure gold must be added to raise it to 22K, and how many grams of 22K the same gold would make.",
    weights: [1, 5, 10, 20, 50, 100],
    sections: [
      {
        id: "formula",
        heading: "Raising 18K to 22K",
        paragraphs: [
          `To raise purity you add 24K gold: added gold = weight × (0.9167 − 0.75) ÷ (1 − 0.9167). That is two grams of pure gold for every gram of 18K: 10 g of 18K needs ${f(ten18to22.addPureGold)} g of 24K and ends up as ${f(ten18to22.finalWeight)} g of 22K.`,
          "Because so much gold has to be added, goldsmiths rarely upgrade 18K. The usual route is to exchange the 18K piece for its value and buy 22K.",
        ],
      },
      {
        id: "value",
        heading: "How much 22K is your 18K worth?",
        paragraphs: [
          `By gold content, 18K is worth 18 ÷ 22 of the same weight of 22K: 10 g of 18K contains as much gold as ${f(equivalentWeight(10, p(18), p(22)))} g of 22K. An exchange offer close to that, minus the deduction, is a fair one.`,
        ],
      },
      {
        id: "why18",
        heading: "Why some jewellery is 18K",
        paragraphs: [
          "18K (hallmark 750) is harder than 22K, so it holds diamonds and other stones more securely and is used for most stone-set, white gold and rose gold pieces. A lower gold content per gram is the trade-off.",
        ],
      },
    ],
    faq: [
      {
        question: "How much pure gold do I add to 10 g of 18K to make 22K?",
        answer: `${f(ten18to22.addPureGold)} g of 24K gold, giving ${f(ten18to22.finalWeight)} g of 22K. The formula is weight × (22/24 − 18/24) ÷ (1 − 22/24).`,
      },
      {
        question: "How many grams of 22K is 10 grams of 18K?",
        answer: `${f(equivalentWeight(10, p(18), p(22)))} g by gold content (10 × 18 ÷ 22).`,
      },
      {
        question: "Is 18K gold real gold?",
        answer: "Yes. 18K is 75% pure gold (hallmark 750); the remaining 25% is alloy such as silver, copper, palladium or nickel, which also sets its colour.",
      },
    ],
    related: [{ href: "/en/22k-gold-to-18k-gold", label: "22K to 18K gold" }, { href: "/en/14k-gold-to-18k-gold", label: "14K to 18K gold" }, CALC],
  },
  {
    slug: "22k-gold-to-18k-gold",
    from: 22,
    to: 18,
    title: "22K to 18K Gold: Alloy to Add and Weight Table",
    shortTitle: "22K to 18K Gold Converter",
    description:
      "How much 18K gold does 22K gold make, and how much alloy goes in? Table from 1 g to 100 g, why stone-set and white gold jewellery is 18K, and how the value per gram compares.",
    h1: "22K to 18K gold",
    intro:
      "Lowering 22K to 18K means adding alloy metal. Enter a weight to see how much 18K gold it makes and how much alloy the goldsmith adds; the pure gold stays the same.",
    weights: [1, 5, 10, 20, 50, 100],
    sections: [
      {
        id: "formula",
        heading: "The formula",
        paragraphs: [
          `18K weight = 22K weight × 22 ÷ 18. Ten grams of 22K becomes ${f(ten22to18.finalWeight)} g of 18K with ${f(ten22to18.addAlloy)} g of alloy added.`,
        ],
      },
      {
        id: "settings",
        heading: "Why jewellers make stone settings in 18K",
        paragraphs: [
          "Prongs and bezels that hold diamonds need a harder metal than 22K. At 75% gold, 18K is strong enough for settings yet still rich in colour, so old 22K gold is sometimes alloyed down to 18K when it is remade into a ring with stones.",
          "The alloy also decides the colour: more copper gives rose gold, while white gold uses palladium or nickel and is usually plated with rhodium.",
        ],
      },
      {
        id: "value",
        heading: "Value per gram",
        paragraphs: [
          `A gram of 18K contains 0.75 g of gold against 0.9167 g in 22K, so 18K is worth about ${f((18 / 22) * 100, 1)}% of the 22K price per gram by metal content.`,
        ],
      },
    ],
    faq: [
      {
        question: "How much 18K gold do I get from 10 grams of 22K?",
        answer: `${f(ten22to18.finalWeight)} grams, after adding ${f(ten22to18.addAlloy)} g of alloy.`,
      },
      {
        question: "Which is better, 18K or 22K?",
        answer: "22K has more gold and a deeper yellow colour, so it holds more value per gram. 18K is harder and keeps stones more securely. Plain bangles and chains are usually 22K; diamond and gemstone jewellery is usually 18K.",
      },
      {
        question: "What hallmark does 18K gold have?",
        answer: "750, meaning 750 parts of pure gold per 1,000.",
      },
    ],
    related: [{ href: "/en/18k-gold-to-22k-gold", label: "18K to 22K gold" }, { href: "/en/22k-gold-to-24k-gold", label: "22K to 24K gold" }, CALC],
  },
  {
    slug: "14k-gold-to-18k-gold",
    from: 14,
    to: 18,
    title: "14K to 18K Gold: Pure Gold to Add and Comparison",
    shortTitle: "14K to 18K Gold Converter",
    description:
      "How much pure gold turns 14K into 18K? Table from 1 g to 100 g, how much more gold 18K contains, and how 14K (585) and 18K (750) differ in hardness, colour and price.",
    h1: "14K to 18K gold",
    intro:
      "14K gold is 58.33% gold and 18K is 75%. Enter a weight to see how much pure gold must be added to raise 14K to 18K, and how much gold each contains.",
    weights: [1, 2, 5, 10, 20, 50, 100],
    sections: [
      {
        id: "formula",
        heading: "Raising 14K to 18K",
        paragraphs: [
          `Added 24K gold = weight × (0.75 − 0.5833) ÷ (1 − 0.75). Ten grams of 14K needs ${f(ten14to18.addPureGold)} g of pure gold and becomes ${f(ten14to18.finalWeight)} g of 18K.`,
        ],
      },
      {
        id: "compare",
        heading: "14K and 18K compared",
        paragraphs: [
          `A 10 g piece of 14K contains ${f(pureGold(10, p(14)))} g of gold; the same piece in 18K contains ${f(pureGold(10, p(18)))} g, about ${f((18 / 14 - 1) * 100, 0)}% more. That is why 18K costs more for the same design.`,
          "14K (hallmark 585) is the most common karat in American jewellery: it is harder and more scratch-resistant, and its paler colour suits everyday rings. 18K (750) is softer, more yellow and standard for fine jewellery in Europe.",
        ],
      },
    ],
    faq: [
      {
        question: "How much gold do I add to 10 g of 14K to make 18K?",
        answer: `${f(ten14to18.addPureGold)} g of pure gold, giving ${f(ten14to18.finalWeight)} g of 18K.`,
      },
      {
        question: "Is 14K or 18K better for an engagement ring?",
        answer: "14K is harder and wears better on a ring worn every day; 18K has more gold, a richer colour and is less likely to cause reactions in people sensitive to nickel or copper. Both are real gold.",
      },
      {
        question: "Why is 14K stamped 585 and not 583?",
        answer: "By definition 14K is 58.33%, but the international hallmark standard is 585, set slightly above 14/24 so that a stamped piece is never under-karat.",
      },
    ],
    related: [{ href: "/en/18k-gold-to-22k-gold", label: "18K to 22K gold" }, CALC],
  },
];

export const findKaratPair = (slug: string) => KARAT_PAIRS.find((x) => x.slug === slug);

/** One row of the weight table: same gold in the target karat, alloy or pure gold added. */
export function karatPairRow(pair: KaratPair, w: number) {
  const pure = pureGold(w, p(pair.from));
  const same = equivalentWeight(w, p(pair.from), p(pair.to));
  const a = alloy(w, p(pair.from), p(pair.to));
  return {
    pure,
    same,
    addAlloy: a && a.direction === "down" ? a.addAlloy : null,
    addGold: a && a.direction === "up" ? a.addPureGold : null,
  };
}
