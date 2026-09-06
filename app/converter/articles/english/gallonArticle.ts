import type { UnitArticle } from "../../unitArticles";

export const gallonArticle: UnitArticle = {
  slug: "gallon",

  introduction: [
    "The gallon is a traditional unit used to measure liquid volume, especially in the United States. One US liquid gallon is exactly equal to 3.78541 liters, and this is generally the value meant when people simply say \"gallon\".",
    "The gallon appears in many US-originated products and technical documents, from fuel consumption (miles per gallon) to liquid product labels; since Turkey uses the metric system, converting gallon values to liters is a frequently needed operation.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "gal",
    },
    {
      label: "1 US gallon",
      value: "3.78541 liters",
    },
    {
      label: "1 liter",
      value: "≈ 0.264172 gallons",
    },
    {
      label: "Unit system",
      value: "US customary system (US liquid gallon)",
    },
    {
      label: "Imperial gallon",
      value: "4.54609 liters (different from the US gallon)",
    },
  ],

  sections: [
    {
      title: "What is a gallon?",
      paragraphs: [
        "The gallon is a volume unit used to express a quantity of liquid. In the United States, \"gallon\" almost always refers to the US liquid gallon, exactly equal to 3.78541178 liters.",
        "The gallon is a standard volume measure used across many areas of daily life in the US, from gas stations to milk and beverage packaging. In countries that use the metric system, gallon values are usually converted to liters to be more easily understood.",
        "The gallon also has smaller subunits: 1 gallon equals 4 quarts, 8 pints or 16 cups. This internal division is a system frequently encountered in US kitchen measurements and recipe books.",
      ],
    },
    {
      title: "Why is the gallon still used?",
      paragraphs: [
        "The United States is one of the few countries in the world that has not officially adopted the metric system. Because of this, the gallon, as part of the imperial measurement tradition, continues to be widely used in everyday life and industry.",
        "In the automotive sector, fuel economy in the US is expressed in miles per gallon (MPG), which is why consumers examining US-originated vehicle data often need to convert between gallons and liters.",
        "In the oil industry, the gallon is used alongside the barrel; 1 barrel equals 42 US gallons, a figure that appears frequently in global oil market reports.",
      ],
    },
    {
      title: "The difference between the US gallon and the imperial gallon",
      paragraphs: [
        "The word \"gallon\" does not refer to a single standard value; the US gallon (3.78541 L) and the British imperial gallon (4.54609 L) are different, with a difference of about 20% between them.",
        "This difference stems historically from the fact that, while the United Kingdom standardized the imperial gallon in 1824, the United States retained an older English wine-gallon definition (the Queen Anne gallon).",
        "Which type of gallon is meant matters when converting; the conversions on this site are calculated using the US liquid gallon, since it is the definition most widely used in international trade and technical documentation.",
      ],
    },
    {
      title: "The gallon and other volume units",
      paragraphs: [
        "1 US gallon equals 3.78541 liters, approximately 0.133681 cubic feet and 231 cubic inches. These values show the gallon's exact relationship to other volume units in the US measurement system.",
        "In kitchen measurements, the gallon is divided into smaller units such as the quart, pint and cup. 1 gallon equals 4 quarts, 1 quart equals 2 pints, and 1 pint equals 2 cups — this nested system is standard in US recipes.",
        "Thought of in liters, 1 gallon corresponds to approximately 3.79 liters — a handy rounding point for anyone wanting a quick everyday estimate.",
      ],
    },
  ],

  timeline: [
    {
      year: "1707",
      title: "The Queen Anne gallon",
      description:
        "The gallon definition used for the wine trade in England (the Queen Anne gallon) was standardized; this definition later formed the basis of the US gallon.",
    },
    {
      year: "1824",
      title: "The British imperial gallon",
      description:
        "The United Kingdom formalized its own gallon definition (the imperial gallon, 4.54609 L), separating it from the US gallon.",
    },
    {
      year: "1893",
      title: "The exact definition of the US gallon",
      description:
        "Under the Mendenhall Order, the US gallon was fixed exactly at 3.785411784 liters based on the metric system.",
    },
  ],

  questions: [
    {
      question: "How many liters is 1 gallon?",
      answer:
        "1 US liquid gallon equals 3.78541 liters. To convert gallons to liters, multiply the value by 3.78541.",
    },
    {
      question: "How many gallons is 1 liter?",
      answer:
        "1 liter is approximately equal to 0.264172 US gallons. To convert liters to gallons, divide the value by 3.78541.",
    },
    {
      question: "Are the US gallon and the imperial gallon the same?",
      answer:
        "No. The US liquid gallon is 3.78541 liters, while the British (imperial) gallon is 4.54609 liters — a difference of about 20%.",
    },
    {
      question: "How many quarts, pints or cups is 1 gallon?",
      answer:
        "1 gallon equals 4 quarts, 8 pints or 16 cups. These units are defined as multiples of one another in the US kitchen measurement system.",
    },
  ],
};
