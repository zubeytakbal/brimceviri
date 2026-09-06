import type { UnitArticle } from "../../unitArticles";

export const horsepowerArticle: UnitArticle = {
  slug: "horsepower",

  introduction: [
    "Horsepower (hp) is a traditional unit used especially to express the power of motor vehicles and engines. Metric horsepower is exactly equal to 735.49875 watts, and is the standard used in the automotive industry across Europe, including Turkey.",
    "Although the SI unit of power is the watt, horsepower remains one of the most commonly used expressions of power on vehicle datasheets, sales brochures and in everyday language, due to historical habit and industry tradition.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "hp (PS, CV)",
    },
    {
      label: "1 horsepower (metric)",
      value: "735.49875 W",
    },
    {
      label: "1 horsepower",
      value: "≈ 0.73550 kW",
    },
    {
      label: "1 kilowatt",
      value: "≈ 1.35962 horsepower",
    },
    {
      label: "Unit system",
      value: "Metric horsepower family (PS/CV, non-SI)",
    },
  ],

  sections: [
    {
      title: "What is horsepower?",
      paragraphs: [
        "Horsepower is a unit expressing the amount of work an engine or machine does per unit of time — that is, its power. In European vehicle catalogs it is also abbreviated PS (German Pferdestärke) or CV (French cheval-vapeur) — all three express the same metric value (735.49875 W).",
        "US-originated \"mechanical horsepower\" (imperial hp) corresponds to a slightly different value, 745.7 watts. Though these two horsepower types are very close, they are not identical; in Turkey and Europe, vehicle technical data almost always uses metric horsepower.",
        "The horsepower figure on a vehicle's label expresses the engine's maximum output power at a particular RPM range, and gives a general sense of the vehicle's acceleration performance.",
      ],
    },
    {
      title: "Why was horsepower created?",
      paragraphs: [
        "The concept of horsepower was developed in the late 18th century by the Scottish engineer James Watt. Watt wanted to offer his customers an understandable reference by comparing the performance of steam engines to draft horses, the most familiar power source of the time.",
        "Watt defined horsepower by measuring the amount of work a horse could do in a given period. This unit quickly spread as a practical marketing and engineering tool to show how much more efficient steam engines were compared to horse power.",
        "Over time, horsepower moved beyond steam engines to become the standard expression of power for internal combustion engines, electric motors, and especially the automotive industry.",
      ],
    },
    {
      title: "The relationship between horsepower and kilowatt",
      paragraphs: [
        "1 metric horsepower is exactly equal to 735.49875 watts, or 0.73549875 kilowatts. This value is defined as the work done by 75 kilogram-force over 1 meter in 1 second, and is an exact conversion factor.",
        "In the other direction, 1 kilowatt is approximately equal to 1.35962 horsepower. Under European Union regulations, a vehicle's official power figure must be given in kilowatts; the horsepower value is usually added in parentheses as supplementary information.",
        "For example, a 110 kW engine corresponds to about 150 horsepower, and a 184 kW engine to about 250 horsepower.",
      ],
    },
    {
      title: "Differences between types of horsepower",
      paragraphs: [
        "Metric horsepower (hp, PS, CV) equals 735.49875 W and is the standard used in Europe, including Turkey. Mechanical or imperial horsepower (HP), on the other hand, appears in documents originating from the United States and the United Kingdom, and equals 745.7 W.",
        "The difference between these two values is about 1.4% — small enough to be ignored in everyday use, but important to specify in precise engineering calculations.",
        "For electric motors, it is more common to use watts or kilowatts directly rather than horsepower; the concept of horsepower has become especially associated with internal combustion engines and the automotive industry.",
      ],
    },
  ],

  timeline: [
    {
      year: "1782",
      title: "James Watt's definition of horsepower",
      description:
        "James Watt introduced the concept of horsepower to market the power of steam engines, using the work a horse could do as the reference.",
    },
    {
      year: "19th century",
      title: "Metric horsepower spreads",
      description:
        "With the adoption of the metric system in Europe, horsepower was standardized at 735.49875 watts, defined through the kilogram-force and meter units.",
    },
    {
      year: "20th century",
      title: "Standardization in the automotive industry",
      description:
        "Horsepower became the most widely used unit worldwide for labeling the power of internal combustion engines and automobiles.",
    },
  ],

  questions: [
    {
      question: "How many kilowatts is 1 horsepower?",
      answer:
        "1 metric horsepower is approximately equal to 0.73550 kilowatts. To convert horsepower to kilowatts, multiply the value by 0.73549875.",
    },
    {
      question: "How many horsepower is 1 kilowatt?",
      answer:
        "1 kilowatt is approximately equal to 1.35962 horsepower. To convert kilowatts to horsepower, divide the value by 0.73549875.",
    },
    {
      question: "Is horsepower the same as HP (mechanical horsepower)?",
      answer:
        "Not exactly. Metric horsepower equals 735.49875 watts, while mechanical (imperial) horsepower equals 745.7 watts — a difference of about 1.4%.",
    },
    {
      question: "Why are both kW and hp shown on vehicle datasheets?",
      answer:
        "European Union regulations require the official power figure to be given in kilowatts; the horsepower value is included as additional information because it remains a more familiar reference for consumers.",
    },
  ],
};
