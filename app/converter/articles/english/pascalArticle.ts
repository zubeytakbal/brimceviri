import type { UnitArticle } from "../../unitArticles";

export const pascalArticle: UnitArticle = {
  slug: "pascal",

  introduction: [
    "The pascal is the SI derived unit of pressure and mechanical stress, represented by the symbol Pa. It has an extremely wide range of use, from meteorology to mechanical engineering, from medical devices to materials science.",
    "The pascal is equal to the pressure produced when a force of one newton is distributed evenly over an area of one square meter: 1 Pa = 1 N/m². Because a pascal is usually a small quantity on an everyday scale, engineering commonly uses its multiples — kilopascal, megapascal and gigapascal — while meteorology prefers the hectopascal.",
  ],

  keyFacts: [
    {
      label: "Unit name",
      value: "Pascal",
    },
    {
      label: "Symbol",
      value: "Pa",
    },
    {
      label: "Physical quantity",
      value: "Pressure and mechanical stress",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, derived unit)",
    },
    {
      label: "1 pascal",
      value: "1 N/m²",
    },
    {
      label: "1 bar",
      value: "100,000 Pa",
    },
    {
      label: "1 standard atmosphere",
      value: "101,325 Pa",
    },
  ],

  sections: [
    {
      title: "What is the pascal?",
      paragraphs: [
        "The pascal is the SI unit expressing the pressure obtained by dividing a force acting perpendicular to a surface by the area of that surface. The smaller the area a given force is spread over, the greater the pressure in pascals under that same force.",
        "The pascal is used not only for fluid pressure, but also for mechanical stress inside solid materials. This means fields that appear quite different — material strength, elastic modulus and fluid mechanics — share a common unit language.",
        "Because the pascal is a small unit, everyday engineering values are usually expressed in kilopascals (kPa), megapascals (MPa) or gigapascals (GPa). For example, standard atmospheric pressure is about 101.325 kPa, while the elastic modulus of steel is on the order of 200 GPa.",
      ],
    },
    {
      title: "Why was the pascal created?",
      paragraphs: [
        "Before 1971, the SI had no special unit name for pressure; the quantity was expressed as the compound unit newton per square meter (N/m²). In practice, however, many different, historically rooted units were used side by side: atmosphere, bar, millimeter of mercury, PSI and technical atmosphere among them.",
        "Some of these units were tied to a specific measuring instrument, such as the mercury barometer, while others were tied to a specific engineering tradition, such as PSI, based on the force unit pound-force and the area unit square inch. Expressing the same physical quantity through so many different units increased the risk of conversion errors in scientific and technical communication.",
        "The SI's general approach of giving short, recognizable special names to derived units was applied to pressure as well, and the expression newton per square meter was given the name pascal. This step tied pressure to a single common reference, consistent with the rest of the SI units.",
      ],
    },
    {
      title: "Who was Blaise Pascal?",
      paragraphs: [
        "Blaise Pascal was a French mathematician, physicist, inventor and philosopher, born on 19 June 1623 in Clermont-Ferrand and died on 19 August 1662 in Paris. He made significant contributions to mathematics and geometry at a young age and helped lay the foundations of probability theory.",
        "One of Pascal's most lasting contributions to physics was his work on fluid statics. He systematically studied how pressure is transmitted within a fluid and how the weight of the atmosphere could be measured.",
        "Pascal's work on pressure and hydrostatics led, three centuries later, to the SI pressure unit being named after him. The 14th General Conference on Weights and Measures (CGPM) formally gave this unit the name pascal in 1971.",
      ],
    },
    {
      title: "The Puy-de-Dôme experiment and atmospheric pressure",
      paragraphs: [
        "In 1647, Blaise Pascal proposed an experiment to test the idea that air has weight, and that this weight balances the mercury column in a barometer: if a Torricelli-style mercury barometer were carried to different altitudes, the height of the mercury column should change.",
        "This experiment was carried out on 19 September 1648 by Pascal's brother-in-law, Florin Périer, on the Puy-de-Dôme mountain in France. Périer measured the height of the mercury column at the base of the mountain, then measured it again at the summit, and observed that the column had noticeably shortened.",
        "The result clearly showed that atmospheric pressure is not constant and decreases with altitude. This experiment is considered one of the strong early pieces of evidence supporting the view that atmospheric pressure arises from the weight of the column of air above.",
      ],
    },
    {
      title: "Pascal's principle and hydraulic systems",
      paragraphs: [
        "Pascal established that pressure applied to a still fluid inside a closed container is transmitted with equal intensity to every point of the fluid and to the container's inner surface. This principle is known today as Pascal's principle, or Pascal's law.",
        "Pascal's findings on hydrostatics were collected in his work \"Traité de l'équilibre des liqueurs\" (Treatise on the Equilibrium of Liquids). It was written around 1653, but published posthumously in 1663, after Pascal's death.",
        "Pascal's principle underlies the working logic of hydraulic presses, brake systems and many industrial actuators, which use a small force over a small area to produce a much larger force over a larger area.",
      ],
    },
    {
      title: "The pascal's adoption into the SI",
      paragraphs: [
        "The 14th General Conference on Weights and Measures (CGPM) gave the special name \"pascal\" to the SI unit newton per square meter (N/m²) in 1971. This decision is recorded in the official records of the International Bureau of Weights and Measures (BIPM).",
        "Giving the unit a special name does not change the mathematical definition of pressure — it simply gives the expression N/m² a short, recognizable name. This brought pressure in line with the same naming logic used for other derived SI units, such as the joule, the watt and the newton.",
        "Even after the pascal was adopted, non-SI units such as bar, atmosphere, PSI and mmHg have continued to be used across many industries — but all of them can now be tied together through the common, precisely defined pascal.",
      ],
    },
    {
      title: "How is the pascal symbol written?",
      paragraphs: [
        "The symbol for the pascal is written with a capital P: Pa. Under SI convention, the symbol for a unit named after a person begins with a capital letter, while the full unit name is written in lowercase when spelled out: \"five pascals\" uses a lowercase unit name, while the symbol form is written as \"5 Pa\" with a capital P.",
        "A space is recommended between the numerical value and the unit symbol: 100 Pa is a correct example of usage. The symbol does not take a plural ending; one hundred pascals is written 100 Pa, not \"100 Pas\".",
        "Standard SI prefixes are used to form multiples: kilopascal is written kPa, megapascal MPa, and gigapascal GPa. The hectopascal, common in meteorology, is written hPa, and 1 hPa is exactly equal to 100 Pa.",
      ],
    },
    {
      title: "Where is the pascal used?",
      paragraphs: [
        "In meteorology, atmospheric pressure is traditionally reported in hectopascals (hPa), a value numerically identical to the older millibar unit. Pressure centers and frontal systems on weather maps are usually shown in hPa.",
        "In engineering, the pascal and its multiples are used across a wide range of calculations — hydraulic system pressures, pipeline design, compressor and vacuum equipment, and material stress and elastic modulus. Material strength is typically expressed in megapascals or gigapascals.",
        "In medicine and biomedical engineering, blood pressure is traditionally expressed in mmHg, but respiratory gas pressures, ventilator settings and some laboratory measurements also use kilopascal values. In industrial process control, most pressure sensors produce a pascal-based output directly.",
      ],
    },
    {
      title: "The pascal and other pressure units",
      paragraphs: [
        "1 bar is exactly equal to 100,000 Pa, and 1 standard atmosphere is exactly equal to 101,325 Pa. Both of these units are tied to the pascal through exact, defined values — not approximate, measurement-based ones.",
        "1 PSI (pound-force per square inch) is approximately equal to 6,894.757293168 Pa, and 1 mmHg (millimeter of mercury) is approximately equal to 133.322387415 Pa. Because these values are derived from the exact definitions of the force and length units involved, they are known to high precision.",
        "When converting, it is important to note whether a unit expresses absolute or gauge pressure. For example, a reading of \"2 bar\" on a gauge usually indicates gauge pressure relative to the atmosphere; converting it to absolute pressure in pascals may require adding atmospheric pressure separately.",
      ],
    },
  ],

  timeline: [
    {
      year: "1623",
      title: "Blaise Pascal is born",
      description:
        "Blaise Pascal was born on 19 June 1623 in Clermont-Ferrand.",
    },
    {
      year: "1647",
      title: "The atmospheric-pressure hypothesis",
      description:
        "Pascal proposed a mountain experiment to test the effect of air's weight on a barometer.",
    },
    {
      year: "1648",
      title: "The Puy-de-Dôme experiment",
      description:
        "At Pascal's suggestion, Florin Périer carried out the barometer experiment on the Puy-de-Dôme mountain, showing that atmospheric pressure decreases with altitude.",
    },
    {
      year: "1653",
      title: "Treatise on the Equilibrium of Liquids",
      description:
        "Pascal wrote his work on hydrostatic principles and the transmission of pressure within a fluid; it was published posthumously in 1663.",
    },
    {
      year: "1662",
      title: "Blaise Pascal dies",
      description: "Blaise Pascal died on 19 August 1662 in Paris.",
    },
    {
      year: "1954",
      title: "The standard atmosphere is defined",
      description:
        "The 10th CGPM defined the standard atmosphere as exactly 101,325 Pa.",
    },
    {
      year: "1971",
      title: "The pascal is adopted into the SI",
      description:
        "The 14th CGPM gave the special name \"pascal\" to the unit newton per square meter.",
    },
  ],

  questions: [
    {
      question: "How many bar is 1 pascal?",
      answer:
        "1 pascal is equal to 0.00001 bar (10 microbar). To convert pascal to bar, divide the value by 100,000.",
    },
    {
      question: "How many pascals is 1 bar?",
      answer:
        "1 bar is exactly equal to 100,000 Pa. To convert bar to pascal, multiply the value by 100,000.",
    },
    {
      question: "Who is the pascal unit named after?",
      answer:
        "The pascal is named after the French mathematician and physicist Blaise Pascal (1623-1662), known for his work on fluid statics and pressure.",
    },
    {
      question: "How many pascals is 1 atmosphere?",
      answer:
        "1 standard atmosphere is exactly equal to 101,325 Pa. This is an internationally defined exact value, not a measured one.",
    },
    {
      question: "When did the pascal become an SI unit?",
      answer:
        "The pascal was adopted in 1971 by the 14th General Conference on Weights and Measures (CGPM) as the special name for the unit newton per square meter.",
    },
    {
      question: "Why is the pascal symbol written with a capital P?",
      answer:
        "Under SI convention, the symbol for a unit derived from a scientist's name is written with a capital letter. The full unit name is written in lowercase within a sentence: pascal, symbol Pa.",
    },
  ],
};
