export type LocalizedCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedCategoryPage = {
  locale: "en";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedCategoryFact[];
  sections: LocalizedCategorySection[];
};

export const englishCategoryPages: LocalizedCategoryPage[] = [
  {
    locale: "en",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Area Units and Conversions",
    description:
      "Convert between square meters, square feet and hectares and learn how area units are used in land measurement, buildings and engineering.",
    introduction: [
      "Area measures the size of a surface. It appears in floor plans, land records, pressure calculations, heat transfer and many other technical contexts.",
      "The square meter is the SI derived unit of area, while units such as the square foot and hectare are still common in practical work.",
    ],
    facts: [
      { label: "Physical quantity", value: "Area" },
      { label: "SI unit", value: "Square meter" },
      { label: "SI symbol", value: "m²" },
      { label: "Dimension symbol", value: "L²" },
      { label: "Typical use", value: "Land, floor area and section sizing" },
    ],
    sections: [
      {
        title: "What is area?",
        paragraphs: [
          "Area describes two-dimensional extent. It is used for rooms, plots, panels, cross-sections and any measurable surface.",
          "Because area is derived from length multiplied by length, conversion factors must also be squared when changing units.",
        ],
      },
      {
        title: "Square meters, hectares and square feet",
        paragraphs: [
          "The square meter is the main SI area unit. The hectare is a larger metric unit widely used in agriculture and land management.",
          "The square foot is common in architectural and construction practice in imperial and US customary systems.",
        ],
      },
      {
        title: "How are area units converted?",
        paragraphs: [
          "Area conversions preserve the same physical surface while expressing it in another unit.",
          "For example, one hectare equals 10,000 square meters, and one square meter equals about 10.7639 square feet.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Volume Units and Conversions",
    description:
      "Convert between liters, milliliters and cubic meters and review the basic relationships used in science, storage and fluid handling.",
    introduction: [
      "Volume describes how much three-dimensional space a substance or object occupies.",
      "The cubic meter is the SI derived unit of volume, while the liter and milliliter are widely used in daily practice, laboratory work and tank calculations.",
    ],
    facts: [
      { label: "Physical quantity", value: "Volume" },
      { label: "SI unit", value: "Cubic meter" },
      { label: "Common metric unit", value: "Liter" },
      { label: "Dimension symbol", value: "L³" },
      { label: "Typical use", value: "Containers, process volumes and liquids" },
    ],
    sections: [
      {
        title: "What is volume?",
        paragraphs: [
          "Volume is the three-dimensional measure of capacity or occupied space.",
          "It is used for tanks, bottles, rooms, channels, process vessels and material balances.",
        ],
      },
      {
        title: "Cubic meter, liter and milliliter",
        paragraphs: [
          "One cubic meter is the SI derived unit of volume. One liter equals 0.001 cubic meters, and one milliliter equals one thousandth of a liter.",
          "These decimal relationships make common metric volume conversions straightforward.",
        ],
      },
      {
        title: "How are volume units converted?",
        paragraphs: [
          "Volume conversions use fixed relationships between the source and target units.",
          "For example, one liter equals 1,000 milliliters and also equals 0.001 cubic meters.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "length",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Length Units and Conversions",
    description:
      "Learn about metric and imperial length units and convert between meters, kilometers, centimeters, millimeters, inches, yards, miles and feet.",

    introduction: [
      "Length is a physical quantity used to describe the distance between two points or the size of an object along a particular direction. It is one of the fundamental quantities used in science, engineering and everyday measurement.",
      "The meter is the base unit of length in the International System of Units. Other metric length units are connected to the meter through decimal prefixes, while imperial and United States customary units use separately defined conversion relationships.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Length",
      },
      {
        label: "SI base unit",
        value: "Meter",
      },
      {
        label: "SI symbol",
        value: "m",
      },
      {
        label: "Dimension symbol",
        value: "L",
      },
      {
        label: "Modern definition",
        value:
          "Distance traveled by light in vacuum during 1/299,792,458 of a second",
      },
    ],

    sections: [
      {
        title: "What is length?",
        paragraphs: [
          "Length describes a one-dimensional extent. Depending on the direction being measured, it may represent distance, height, width, depth, thickness or diameter.",
          "In dimensional analysis, length is represented by the symbol L. Many derived physical quantities, including area, volume, speed, acceleration and pressure, contain a length dimension.",
        ],
      },
      {
        title: "The meter as the SI base unit",
        paragraphs: [
          "The meter is one of the seven base units of the International System of Units. It provides the reference from which metric length units and many derived units are constructed.",
          "The modern meter is linked to the fixed value of the speed of light in vacuum. This makes the definition reproducible without depending on a physical measuring bar or a particular location on Earth.",
        ],
      },
      {
        title: "Metric length units",
        paragraphs: [
          "Metric length units use prefixes that represent powers of ten. One kilometer equals 1,000 meters, one centimeter equals 0.01 meters and one millimeter equals 0.001 meters.",
          "For extremely small measurements, units such as the micrometer and nanometer are used. Large geographical and road distances are commonly expressed in kilometers.",
        ],
      },
      {
        title: "Imperial and US customary length units",
        paragraphs: [
          "The foot, mile, inch and yard are widely recognized non-metric length units. They are used primarily in the United States and in selected applications in the United Kingdom and other countries.",
          "One international foot is exactly 0.3048 meters, while one international mile is exactly 1,609.344 meters. These exact definitions provide reliable conversion factors.",
        ],
      },
      {
        title: "How are length units converted?",
        paragraphs: [
          "A length conversion changes the numerical value and unit while preserving the physical distance being represented. The original value is multiplied by the conversion factor between the two units.",
          "Metric conversions often involve powers of ten. Conversions between metric and imperial systems require defined factors such as 2.54 centimeters per inch or 1,609.344 meters per mile.",
        ],
      },
      {
        title: "Length measurement and uncertainty",
        paragraphs: [
          "Length may be measured using rulers, tape measures, calipers, micrometers, laser distance meters and optical instruments. The appropriate instrument depends on the size of the object and the required precision.",
          "Every physical measurement has uncertainty. Instrument resolution, calibration, temperature, measurement technique and environmental conditions can all affect the reported value.",
        ],
      },
    ],
  },

  {
    locale: "en",
    slug: "mass",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Mass Units and Conversions",
    description:
      "Learn about mass units and convert between kilograms, grams, milligrams, tonnes, pounds and ounces with formulas and conversion tools.",

    introduction: [
      "Mass is a physical quantity associated with the amount of matter and the inertia of an object. The kilogram is the base unit of mass in the International System of Units.",
      "Mass units are used in science, engineering, commerce, medicine, manufacturing and everyday measurements. Metric units use decimal relationships, while units such as the pound belong to imperial and United States customary systems.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Mass",
      },
      {
        label: "SI base unit",
        value: "Kilogram",
      },
      {
        label: "SI symbol",
        value: "kg",
      },
      {
        label: "Dimension symbol",
        value: "M",
      },
      {
        label: "Modern definition",
        value:
          "Defined by fixing the numerical value of the Planck constant",
      },
    ],

    sections: [
      {
        title: "What is mass?",
        paragraphs: [
          "Mass is a fundamental physical quantity related to an object's resistance to acceleration. It also acts as a source of gravitational interaction.",
          "In dimensional analysis, mass is represented by M. It appears in derived quantities such as density, momentum, force, pressure and energy.",
        ],
      },
      {
        title: "Mass and weight are not the same",
        paragraphs: [
          "Mass describes an intrinsic property of an object, while weight is the gravitational force acting on that mass. The mass of an object remains the same when its location changes, but its weight can vary with gravitational acceleration.",
          "In the International System of Units, mass is measured in kilograms and force is measured in newtons. Everyday language often uses the word weight when technically referring to mass.",
        ],
      },
      {
        title: "The kilogram as the SI base unit",
        paragraphs: [
          "The kilogram is the SI base unit of mass. Unlike the names of most base units, its name already contains the metric prefix kilo.",
          "Since 2019, the kilogram has been defined by fixing the numerical value of the Planck constant. This replaced the earlier definition based on a physical metal prototype.",
        ],
      },
      {
        title: "Metric mass units",
        paragraphs: [
          "One kilogram equals 1,000 grams. One gram equals 1,000 milligrams, so one kilogram equals one million milligrams.",
          "Grams are commonly used for food and laboratory materials, while milligrams are suitable for medicines, chemicals and other small quantities.",
        ],
      },
      {
        title: "The pound and other non-metric units",
        paragraphs: [
          "The pound is used in the imperial and United States customary measurement systems. One international avoirdupois pound is exactly 0.45359237 kilograms.",
          "The lb symbol originates from the Latin word libra. Because several historical pound definitions existed, modern calculations should use the standardized international pound.",
        ],
      },
      {
        title: "How are mass units converted?",
        paragraphs: [
          "A mass conversion preserves the physical mass while expressing it with another unit. The numerical value is multiplied by the defined relationship between the source and target units.",
          "Metric mass conversions use decimal factors. Converting between kilograms and pounds requires the exact relationship of one pound to 0.45359237 kilograms.",
        ],
      },
      {
        title: "Measuring mass accurately",
        paragraphs: [
          "Mass is measured with balances and scales designed for different capacities and precision levels. Laboratory balances may detect milligram or microgram differences, while industrial scales measure much larger loads.",
          "Reliable measurements require appropriate calibration, stable environmental conditions and correct handling of the measured material.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "temperature",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Temperature Units and Conversions",
    description:
      "Convert between Celsius, Fahrenheit and Kelvin and review the offset-based formulas used for temperature scales.",
    introduction: [
      "Temperature indicates thermal state and is one of the most widely used measured quantities in engineering, science and everyday life.",
      "Unlike purely proportional unit families, temperature conversions may include an offset as well as a scale factor.",
    ],
    facts: [
      { label: "Physical quantity", value: "Temperature" },
      { label: "SI base unit", value: "Kelvin" },
      { label: "Common engineering scale", value: "Celsius" },
      { label: "Typical offset example", value: "0 °C = 273.15 K" },
      { label: "Typical use", value: "Weather, process control and thermodynamics" },
    ],
    sections: [
      {
        title: "What is temperature?",
        paragraphs: [
          "Temperature represents the thermal condition of a body or environment.",
          "It is used in weather data, materials, energy systems, fluid properties and laboratory work.",
        ],
      },
      {
        title: "Celsius, Fahrenheit and Kelvin",
        paragraphs: [
          "Celsius is widely used in daily and engineering practice. Fahrenheit remains common in some countries, while Kelvin is the SI base unit used in science and thermodynamics.",
          "Kelvin and Celsius share the same interval size, but Kelvin starts from absolute zero.",
        ],
      },
      {
        title: "Why are temperature conversions special?",
        paragraphs: [
          "Temperature scales do not always share the same zero point, so some conversions require both multiplication and addition or subtraction.",
          "This is why Celsius-to-Fahrenheit and Celsius-to-Kelvin formulas differ from simple proportional conversions such as length or mass.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "time",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Time Units and Conversions",
    description:
      "Convert between seconds, minutes and hours and review the standard base relationships used in schedules, motion and data logging.",
    introduction: [
      "Time is one of the SI base quantities and is essential in physics, engineering, navigation and ordinary planning.",
      "Seconds, minutes and hours are used together in many practical calculations, especially for rates, speed and process duration.",
    ],
    facts: [
      { label: "Physical quantity", value: "Time" },
      { label: "SI base unit", value: "Second" },
      { label: "SI symbol", value: "s" },
      { label: "Dimension symbol", value: "T" },
      { label: "Typical use", value: "Durations, rates and schedules" },
    ],
    sections: [
      {
        title: "What is time?",
        paragraphs: [
          "Time describes duration and the ordering of events.",
          "It appears in speed, acceleration, frequency, energy use, production cycles and many measured rates.",
        ],
      },
      {
        title: "Seconds, minutes and hours",
        paragraphs: [
          "The second is the SI base unit of time. Minutes and hours remain standard practical units built on exact relationships.",
          "One minute equals 60 seconds and one hour equals 3,600 seconds.",
        ],
      },
      {
        title: "How are time units converted?",
        paragraphs: [
          "Time conversions rely on exact multiplication or division by 60 or 3,600.",
          "These exact factors make time conversion reliable for schedules, experiments and rate calculations.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "speed",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Speed Units and Conversions",
    description:
      "Convert between kilometers per hour, meters per second and miles per hour and compare the units used in transport and engineering.",
    introduction: [
      "Speed describes how fast a distance is covered over time.",
      "Different industries and countries use different units, so reliable conversion is important for traffic, testing, fluid flow and machinery.",
    ],
    facts: [
      { label: "Physical quantity", value: "Speed" },
      { label: "Common SI-based unit", value: "Meter per second" },
      { label: "Road unit", value: "Kilometer per hour" },
      { label: "Imperial unit", value: "Mile per hour" },
      { label: "Typical use", value: "Transport, flow and equipment motion" },
    ],
    sections: [
      {
        title: "What is speed?",
        paragraphs: [
          "Speed is the ratio of distance traveled to elapsed time.",
          "It is used for vehicles, conveyors, fluids, rotating systems and motion analysis.",
        ],
      },
      {
        title: "Meters per second, kilometers per hour and mph",
        paragraphs: [
          "Meters per second are common in physics and engineering. Kilometers per hour are common in road transport, while mph is still used in countries that rely on imperial road units.",
          "All three units can be converted exactly through their definitions in meters and seconds.",
        ],
      },
      {
        title: "How are speed units converted?",
        paragraphs: [
          "Speed conversions preserve the same physical motion while changing the numerical representation.",
          "For example, 1 km/h equals about 0.27778 m/s, and 1 mph equals 1.609344 km/h.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "pressure",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Pressure Conversions",
    description:
      "Learn how pressure conversions work and convert between pascal, kilopascal, bar, PSI, atmospheres, mmHg and kgf/cm² with practical formulas and reference relationships.",

    introduction: [
      "Pressure describes how much force is distributed over a given area. It is a central quantity in fluid mechanics, thermodynamics, structural engineering, meteorology and many industrial processes.",
      "The SI derived unit of pressure is the pascal, but practical work often also uses kilopascal, bar and PSI. Understanding the relationships between these units makes it easier to compare readings from scientific instruments, industrial equipment and automotive gauges.",
    ],

    facts: [
      {
        label: "Physical quantity",
        value: "Pressure",
      },
      {
        label: "SI derived unit",
        value: "Pascal",
      },
      {
        label: "SI symbol",
        value: "Pa",
      },
      {
        label: "Dimension formula",
        value: "M L⁻¹ T⁻²",
      },
      {
        label: "Definition of 1 pascal",
        value: "1 newton per square meter",
      },
    ],

    sections: [
      {
        title: "What is pressure?",
        paragraphs: [
          "Pressure is the amount of force applied per unit area. When the same force acts on a smaller area, the pressure increases; when it is spread over a larger area, the pressure decreases.",
          "In physics and engineering, pressure appears in gases, liquids, hydraulic systems, weather measurements, material loading and many other applications where forces act across surfaces.",
        ],
      },
      {
        title: "The pascal as the SI pressure unit",
        paragraphs: [
          "The pascal is the SI derived unit of pressure and is defined as one newton per square meter. This definition connects pressure directly to the SI units of force and area.",
          "Because the pascal is a relatively small unit, larger multiples such as the kilopascal are often used in practical measurement and engineering documents.",
        ],
      },
      {
        title: "Kilopascal, bar and PSI",
        paragraphs: [
          "One kilopascal equals 1,000 pascals, making it convenient for building loads, atmospheric values and many engineering measurements. One bar equals 100,000 pascals and is widely used in compressors, hydraulics and industrial pressure systems.",
          "PSI, or pound-force per square inch, belongs to Anglo-American engineering usage and remains common for tire pressure, hydraulic equipment and service manuals. These units coexist in practice, so accurate conversions are essential.",
        ],
      },
      {
        title: "The history of pressure measurement: Torricelli and the barometer",
        paragraphs: [
          "Systematic pressure measurement began in 1643 when the Italian scientist Evangelista Torricelli built the first mercury barometer. He filled a glass tube closed at one end with mercury and inverted it into a dish of mercury, observing that the mercury column settled at a fixed height, leaving a vacuum above it.",
          "Torricelli proposed that the height of the mercury column was balanced by the weight of the surrounding air, giving the first experimental evidence that air itself has measurable weight and therefore exerts pressure. This insight marked the beginning of pressure as a scientific quantity.",
          "In 1648, Florin Périer carried a barometer up the Puy-de-Dôme mountain at Blaise Pascal's suggestion and showed that atmospheric pressure decreases with altitude. Later milestones built on this foundation, including the 1875 Metre Convention that coordinated measurement units internationally, the exact 1954 definition of the standard atmosphere, and the 1971 adoption of the pascal as the SI pressure unit.",
        ],
      },
      {
        title: "Absolute, gauge and differential pressure",
        paragraphs: [
          "Absolute pressure is measured against a perfect vacuum, which represents true zero pressure. Gas laws, thermodynamic calculations and several density-related relationships require absolute pressure to give correct results.",
          "Gauge pressure is measured relative to the surrounding atmospheric pressure. Most field pressure gauges are zeroed against the local atmosphere, so the value read on a dial is almost always a gauge pressure. Absolute and gauge pressure are related by: absolute pressure = gauge pressure + atmospheric pressure.",
          "Differential pressure is the difference between two points, such as across a filter, an orifice plate or the two sides of a heat exchanger. It is referenced to neither a vacuum nor the atmosphere, but directly to another pressure point, which makes it especially useful for flow measurement and monitoring equipment condition.",
        ],
      },
      {
        title: "How are pressure units converted?",
        paragraphs: [
          "A pressure conversion preserves the same physical pressure while expressing it with another unit. The numerical value changes according to the defined factor between the two units.",
          "For example, one bar equals 100 kilopascals, and one PSI equals 6,894.757293168 pascals. Using exact factors helps avoid cumulative error in engineering calculations and reporting.",
        ],
      },
      {
        title: "Where are pressure units used?",
        paragraphs: [
          "Pressure units are used in weather observations, gas cylinders, pumps, boilers, hydraulic circuits, pneumatic systems, process engineering and automotive maintenance. The preferred unit often depends on industry standards and local practice.",
          "Scientific and regulatory documents often prefer pascals or kilopascals, while equipment labels and gauges may use bar or PSI. This is why a clear reference table and reliable converter are useful.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "energy",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Energy and Power Conversions",
    description:
      "Convert between joules and kilowatt-hours, compare watts and kilowatts and review the difference between stored energy and power rate units.",
    introduction: [
      "Energy and power are closely related but not identical. Energy represents an amount, while power represents the rate at which energy is transferred or used.",
      "This category groups a small set of practical energy and power conversions often needed in building systems, electricity use and equipment ratings.",
    ],
    facts: [
      { label: "Physical quantity", value: "Energy and power" },
      { label: "SI energy unit", value: "Joule" },
      { label: "SI power unit", value: "Watt" },
      { label: "Common billing unit", value: "Kilowatt-hour" },
      { label: "Typical use", value: "Electrical consumption and equipment rating" },
    ],
    sections: [
      {
        title: "Energy versus power",
        paragraphs: [
          "Energy measures an amount of work or heat. Power measures how quickly that energy is transferred or consumed.",
          "A kilowatt-hour is an energy unit, while a kilowatt is a power unit.",
        ],
      },
      {
        title: "Joules, kilowatt-hours, watts and kilowatts",
        paragraphs: [
          "The joule is the SI unit of energy and the watt is the SI unit of power.",
          "Kilowatt-hours are widely used on electricity bills, while kilowatts are used for equipment rating and demand.",
        ],
      },
      {
        title: "Why group them together?",
        paragraphs: [
          "In technical practice, energy and power are often discussed side by side because system sizing and consumption analysis use both.",
          "Grouping them helps users reach the correct conversion page more quickly without separating closely related topics.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "flow-rate",
    sourceSlug: "debi",
    category: "debi",
    title: "Flow Rate Conversions",
    description:
      "Convert between cubic meters per hour and liters per minute and review the units commonly used in pumps, water systems and basic process flow.",
    introduction: [
      "Flow rate describes how much fluid passes through a section over a given time.",
      "Cubic meters per hour and liters per minute are practical volumetric flow units used in water, HVAC and utility systems.",
    ],
    facts: [
      { label: "Physical quantity", value: "Volumetric flow rate" },
      { label: "SI form", value: "Cubic meter per second" },
      { label: "Common practical unit", value: "Cubic meter per hour" },
      { label: "Small-system unit", value: "Liter per minute" },
      { label: "Typical use", value: "Pumps, circulation loops and supply systems" },
    ],
    sections: [
      {
        title: "What is flow rate?",
        paragraphs: [
          "Flow rate measures the quantity of fluid transported per unit time.",
          "It is essential for pump selection, pipe sizing and process balancing.",
        ],
      },
      {
        title: "m³/h and L/min",
        paragraphs: [
          "Cubic meters per hour are convenient for larger systems, while liters per minute are often easier to read in smaller installations.",
          "Both can be converted through their exact relationship to cubic meters and seconds.",
        ],
      },
      {
        title: "How are flow units converted?",
        paragraphs: [
          "The conversion is based on the relationship between cubic meters and liters together with the relationship between hours and minutes.",
          "One cubic meter per hour equals about 16.6667 liters per minute.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "electricity",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Electrical Unit Conversions",
    description:
      "Convert between volts and kilovolts or amperes and milliamperes and review the base relationships used in electrical measurements.",
    introduction: [
      "Electrical calculations rely on several distinct physical quantities, including voltage and current.",
      "This category begins with two fundamental conversion pairs that are frequently needed in electronics, power systems and instrumentation.",
    ],
    facts: [
      { label: "Physical quantity group", value: "Electricity" },
      { label: "Voltage unit", value: "Volt" },
      { label: "Current unit", value: "Ampere" },
      { label: "Typical prefixes", value: "kilo and milli" },
      { label: "Typical use", value: "Power systems, devices and instrumentation" },
    ],
    sections: [
      {
        title: "Voltage and current",
        paragraphs: [
          "Voltage represents electric potential difference, while current represents the rate of electric charge flow.",
          "They are different physical quantities, but both rely heavily on metric prefixes in practical work.",
        ],
      },
      {
        title: "Volts, kilovolts, amperes and milliamperes",
        paragraphs: [
          "The volt and ampere are standard SI electrical units. Their prefixed forms are used to express much larger or smaller values more clearly.",
          "One kilovolt equals 1,000 volts, and one ampere equals 1,000 milliamperes.",
        ],
      },
      {
        title: "How are electrical units converted?",
        paragraphs: [
          "The conversion factors here are purely decimal prefix relationships.",
          "These exact ratios make the tools useful for equipment ratings, test values and quick sanity checks.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "density",
    sourceSlug: "yogunluk",
    category: "yogunluk",
    title: "Density Conversions",
    description:
      "Convert between kilograms per cubic meter and grams per cubic centimeter, and see how density is used in engineering, fluid mechanics and material science.",
    introduction: [
      "Density describes how much mass is packed into a given volume. It determines whether an object floats or sinks and is a key input for hydrostatic pressure and fluid-flow calculations.",
      "Kilogram per cubic meter is the SI derived unit of density, while gram per cubic centimeter is common in laboratory and chemistry contexts.",
    ],
    facts: [
      { label: "Physical quantity", value: "Density (mass per volume)" },
      { label: "SI unit", value: "Kilogram per cubic meter" },
      { label: "SI symbol", value: "kg/m³" },
      { label: "Water density", value: "≈ 1000 kg/m³ (at 4 °C)" },
      { label: "Typical use", value: "Materials, fluids and hydrostatic calculations" },
    ],
    sections: [
      {
        title: "What is density?",
        paragraphs: [
          "Density is mass divided by volume: ρ = m / V. It tells you how heavy a substance is relative to how much space it occupies.",
          "A large numerical range separates common materials: air is about 1.2 kg/m³, water about 1000 kg/m³, and steel about 7850 kg/m³.",
        ],
      },
      {
        title: "kg/m³ and g/cm³",
        paragraphs: [
          "One kilogram per cubic meter equals exactly 0.001 grams per cubic centimeter, since the two units differ by a factor of 1000.",
          "Laboratories often use g/cm³ for small samples, while engineering and scientific work generally defaults to kg/m³.",
        ],
      },
      {
        title: "How is density used in engineering?",
        paragraphs: [
          "Density is a direct input to the hydrostatic pressure formula (ΔP = ρgh) and to the Reynolds number, which determines whether a fluid flow is laminar or turbulent.",
          "Comparing the densities of materials also guides selection in construction, shipping and manufacturing, where weight per unit volume affects cost and performance.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "force",
    sourceSlug: "kuvvet",
    category: "kuvvet",
    title: "Force Conversions",
    description:
      "Convert between newtons and kilogram-force, and review how force relates to mass, acceleration and pressure in mechanics.",
    introduction: [
      "Force describes a push or pull that can change an object's motion. It is central to mechanics, structural engineering and everyday physics.",
      "The newton is the SI derived unit of force, while kilogram-force is an older gravity-based unit still found in legacy technical documents and some measuring tools.",
    ],
    facts: [
      { label: "Physical quantity", value: "Force" },
      { label: "SI unit", value: "Newton" },
      { label: "SI symbol", value: "N" },
      { label: "Formula", value: "F = m × a" },
      { label: "Typical use", value: "Mechanics, structural loads and material testing" },
    ],
    sections: [
      {
        title: "What is force?",
        paragraphs: [
          "Force is defined by Newton's second law: F = m × a. One newton is the force needed to accelerate a 1-kilogram mass at 1 meter per second squared.",
          "Force plays a central role in structural design, motion analysis and any calculation involving pushes, pulls or weight.",
        ],
      },
      {
        title: "Newton and kilogram-force",
        paragraphs: [
          "One newton equals about 0.101972 kilogram-force. One kilogram-force equals exactly 9.80665 newtons, based on standard gravitational acceleration.",
          "Kilogram-force predates the newton in engineering practice and still appears in older technical documents, torque wrenches and some measuring instruments.",
        ],
      },
      {
        title: "Force, mass and pressure",
        paragraphs: [
          "Force divided by area gives pressure (N/m² = Pa), and force multiplied by distance gives energy (N·m = J) — the newton is the building block for both.",
          "Mass and weight (force) are often confused in everyday language, but mass stays constant while weight depends on local gravitational acceleration.",
        ],
      },
    ],
  },
];

export function findEnglishCategoryPage(slug: string) {
  return englishCategoryPages.find(
    (categoryPage) => categoryPage.slug === slug
  );
}

export function findEnglishCategoryPageByTurkishSlug(
  sourceSlug: string
) {
  return englishCategoryPages.find(
    (categoryPage) =>
      categoryPage.sourceSlug === sourceSlug
  );
}
