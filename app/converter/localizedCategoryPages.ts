export type LocalizedCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
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
  unitTable?: LocalizedCategoryUnitRow[];
};

const baseEnglishCategoryPages: LocalizedCategoryPage[] = [
  {
    locale: "en",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Area Units and Conversions",
    description:
      "Convert between square meters, hectares, square feet, acres and regional land measures, with practical context for buildings, land and engineering.",
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
          "Because area is derived from length multiplied by length, conversion factors must also be squared when changing units. For example, 1 meter equals 100 centimeters, but 1 square meter equals 10,000 square centimeters.",
        ],
      },
      {
        title: "Square meters, hectares and square feet",
        paragraphs: [
          "The square meter is the main SI area unit. The hectare is a larger metric unit widely used in agriculture and land management.",
          "One hectare is exactly 10,000 square meters, which can be pictured as a square 100 meters on each side. The square foot is common in architectural and construction practice in imperial and US customary systems.",
        ],
      },
      {
        title: "Acres and Anglo-American area units",
        paragraphs: [
          "Square feet and square yards are useful for buildings, interiors and construction drawings. Acres are commonly used for larger land parcels in Anglo-American contexts; one acre contains exactly 43,560 square feet and equals about 0.404686 hectare.",
          "An acre measures area, not a fixed shape. A one-acre property does not have to be square or rectangular, so its side lengths cannot be determined from acreage alone.",
        ],
      },
      {
        title: "Regional and historical land measures",
        paragraphs: [
          "The converter also includes land measures such as donum, decare, marla, guntha, katha, bigha and tsubo. These can be useful when reading property records, historical documents or regional listings.",
          "Some traditional land-unit names have varied by country, period or locality. Treat the named regional context as part of the measurement and confirm the source's definition before using a converted value in a legal, surveying or financial decision.",
        ],
      },
      {
        title: "How are area units converted?",
        paragraphs: [
          "Area conversions preserve the same physical surface while expressing it in another unit.",
          "For example, one hectare equals 10,000 square meters, and one square meter equals about 10.7639 square feet. The converter uses squared conversion relationships rather than applying a linear length factor only once.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Square millimeter",
        symbol: "mm²",
        referenceValue: "0.000001 m²",
        system: "SI/metric",
        commonUse: "Small parts and material sections",
      },
      {
        name: "Square centimeter",
        symbol: "cm²",
        referenceValue: "0.0001 m²",
        system: "SI/metric",
        commonUse: "Small surfaces and product dimensions",
      },
      {
        name: "Square meter",
        symbol: "m²",
        referenceValue: "1 m²",
        system: "SI/metric",
        commonUse: "Rooms, plans and general area measurement",
      },
      {
        name: "Square kilometer",
        symbol: "km²",
        referenceValue: "1,000,000 m²",
        system: "SI/metric",
        commonUse: "Cities, regions and large land areas",
      },
      {
        name: "Are",
        symbol: "a",
        referenceValue: "100 m²",
        system: "Metric land measure",
        commonUse: "Land records and property measurement",
      },
      {
        name: "Hectare",
        symbol: "ha",
        referenceValue: "10,000 m²",
        system: "Metric land measure",
        commonUse: "Agriculture and large land parcels",
      },
      {
        name: "Square foot",
        symbol: "ft²",
        referenceValue: "0.09290304 m²",
        system: "Shared Anglo-American",
        commonUse: "Buildings, interiors and construction",
      },
      {
        name: "Square yard",
        symbol: "yd²",
        referenceValue: "0.83612736 m²",
        system: "Shared Anglo-American",
        commonUse: "Flooring, fabric and land references",
      },
      {
        name: "Acre",
        symbol: "ac",
        referenceValue: "4,046.8564224 m²",
        system: "Anglo-American land measure",
        commonUse: "Land and property listings",
      },
      {
        name: "Tsubo",
        symbol: "tsubo",
        referenceValue: "3.305785 m²",
        system: "Japanese traditional",
        commonUse: "Japanese property and building references",
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
      "Convert between liters, cubic meters, US customary and British imperial volume units, and avoid confusing US and imperial gallons, pints, quarts and fluid ounces.",
    introduction: [
      "Volume describes how much three-dimensional space a substance or object occupies.",
      "The cubic meter is the SI derived unit of volume, while the liter and milliliter are widely used in daily practice, laboratory work and tank calculations. English-language volume measurements also require care: US customary and British imperial gallons, pints, quarts and fluid ounces do not have the same value.",
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
        title: "US customary and British imperial volume units",
        paragraphs: [
          "A gallon, pint, quart or fluid ounce is not automatically a single universal value. A US liquid gallon is about 3.785 liters, while a British imperial gallon is 4.54609 liters. The same distinction continues through the related quart, pint and fluid-ounce units.",
          "The United States commonly uses US customary liquid measures. British imperial measures remain important in historical material and some present-day contexts. When a source says only gallon, pint, quart or fl oz, check the country or standard before converting.",
        ],
      },
      {
        title: "Cubic units and container capacity",
        paragraphs: [
          "Cubic meters, cubic feet and cubic inches describe geometric volume. Liters, gallons and fluid ounces are capacity measures commonly used for liquids and containers. They represent the same physical dimension and can be converted reliably when the named standard is clear.",
          "For example, one cubic meter equals 1,000 liters. Cubic feet are common in construction, ventilation and shipping, while liters and milliliters are common for packaging, laboratory work and everyday liquids.",
        ],
      },
      {
        title: "How are volume units converted?",
        paragraphs: [
          "Volume conversions use fixed relationships between the source and target units.",
          "For example, one liter equals 1,000 milliliters and also equals 0.001 cubic meters. For US and imperial measures, choose the explicitly labelled version in the converter instead of treating similarly named units as interchangeable.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Cubic meter",
        symbol: "m³",
        referenceValue: "1,000 L",
        system: "SI/metric",
        commonUse: "Tanks, rooms, shipping and engineering",
      },
      {
        name: "Liter",
        symbol: "L",
        referenceValue: "1 dm³ exactly",
        system: "Metric",
        commonUse: "Bottles, fuel and everyday liquid capacity",
      },
      {
        name: "Milliliter",
        symbol: "mL",
        referenceValue: "0.001 L exactly",
        system: "Metric",
        commonUse: "Medicine, cooking and laboratory volumes",
      },
      {
        name: "Cubic foot",
        symbol: "ft³",
        referenceValue: "28.3168 L",
        system: "Shared Anglo-American",
        commonUse: "Construction, ventilation and shipping",
      },
      {
        name: "Cubic inch",
        symbol: "in³",
        referenceValue: "16.3871 mL",
        system: "Shared Anglo-American",
        commonUse: "Engine displacement and small containers",
      },
      {
        name: "US liquid gallon",
        symbol: "US gal",
        referenceValue: "3.78541 L",
        system: "US customary",
        commonUse: "US fuel and liquid capacity",
      },
      {
        name: "Imperial gallon",
        symbol: "imp gal",
        referenceValue: "4.54609 L",
        system: "British imperial",
        commonUse: "UK historical and imperial references",
      },
      {
        name: "US pint",
        symbol: "US pt",
        referenceValue: "0.473176 L",
        system: "US customary",
        commonUse: "US food and beverage measures",
      },
      {
        name: "Imperial pint",
        symbol: "imp pt",
        referenceValue: "0.568261 L",
        system: "British imperial",
        commonUse: "Imperial beverage and historical references",
      },
      {
        name: "US fluid ounce",
        symbol: "US fl oz",
        referenceValue: "29.5735 mL",
        system: "US customary",
        commonUse: "US recipe and package measures",
      },
      {
        name: "Imperial fluid ounce",
        symbol: "imp fl oz",
        referenceValue: "28.4131 mL",
        system: "British imperial",
        commonUse: "Imperial recipe and historical references",
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
        title: "Nautical and aviation length units",
        paragraphs: [
          "Distances at sea and in the air are usually expressed in nautical miles rather than kilometers or statute miles. One nautical mile is defined as exactly 1,852 meters.",
          "The nautical mile developed from a historical link between distance and the Earth's geographic coordinates: one minute of latitude corresponds to approximately one nautical mile. The unit of speed called the knot means one nautical mile per hour.",
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

    unitTable: [
      {
        name: "Nanometer",
        symbol: "nm",
        referenceValue: "0.000000001 m",
        system: "SI/metric",
        commonUse: "Light wavelength and nanotechnology",
      },
      {
        name: "Micrometer",
        symbol: "µm",
        referenceValue: "0.000001 m",
        system: "SI/metric",
        commonUse: "Cells, particles and precision manufacturing",
      },
      {
        name: "Millimeter",
        symbol: "mm",
        referenceValue: "0.001 m",
        system: "SI/metric",
        commonUse: "Technical drawings and small measurements",
      },
      {
        name: "Centimeter",
        symbol: "cm",
        referenceValue: "0.01 m",
        system: "SI/metric",
        commonUse: "Everyday object measurements",
      },
      {
        name: "Decimeter",
        symbol: "dm",
        referenceValue: "0.1 m",
        system: "SI/metric",
        commonUse: "Education and some volume relationships",
      },
      {
        name: "Meter",
        symbol: "m",
        referenceValue: "1 m",
        system: "SI",
        commonUse: "Base length measurements",
      },
      {
        name: "Kilometer",
        symbol: "km",
        referenceValue: "1,000 m",
        system: "SI/metric",
        commonUse: "Road and geographic distances",
      },
      {
        name: "Inch",
        symbol: "in",
        referenceValue: "0.0254 m",
        system: "Imperial/US",
        commonUse: "Screens, pipes and technical measurements",
      },
      {
        name: "Foot",
        symbol: "ft",
        referenceValue: "0.3048 m",
        system: "Imperial/US",
        commonUse: "Height, construction and aviation",
      },
      {
        name: "Yard",
        symbol: "yd",
        referenceValue: "0.9144 m",
        system: "Imperial/US",
        commonUse: "Sports fields and distance measurements",
      },
      {
        name: "Mile",
        symbol: "mi",
        referenceValue: "1,609.344 m",
        system: "Imperial/US",
        commonUse: "Road distances",
      },
      {
        name: "Nautical mile",
        symbol: "nmi",
        referenceValue: "1,852 m",
        system: "Nautical",
        commonUse: "Maritime and aviation navigation",
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
      {
        title: "Density, volume and mass",
        paragraphs: [
          "Mass, density and volume are related through m = ρ·V, where m is mass, ρ (rho) is density and V is volume.",
          "Two objects with the same volume can have very different masses depending on their density — equal volumes of steel and water do not weigh the same. In the SI system, density is typically expressed in kilograms per cubic meter.",
        ],
      },
      {
        title: "Choosing the right mass unit",
        paragraphs: [
          "Choosing a unit that matches the size of the object being measured keeps a result easy to read. A person's mass is naturally expressed in kilograms, an active drug ingredient in milligrams and a truckload in tonnes.",
          "For extremely small masses, SI-prefixed units such as microgram, nanogram and picogram are used. When converting, it is also important to confirm whether a unit expresses mass or force — the pound (mass) and pound-force are not the same thing.",
        ],
      },
    ],

    unitTable: [
      {
        name: "Nanogram",
        symbol: "ng",
        referenceValue: "10⁻¹² kg",
        system: "SI",
        commonUse: "Extremely small quantities of matter",
      },
      {
        name: "Microgram",
        symbol: "µg",
        referenceValue: "10⁻⁹ kg",
        system: "SI",
        commonUse: "Pharmaceutical and laboratory measurements",
      },
      {
        name: "Milligram",
        symbol: "mg",
        referenceValue: "10⁻⁶ kg",
        system: "SI",
        commonUse: "Drug dosages and chemical substances",
      },
      {
        name: "Gram",
        symbol: "g",
        referenceValue: "0.001 kg",
        system: "SI",
        commonUse: "Food and small objects",
      },
      {
        name: "Kilogram",
        symbol: "kg",
        referenceValue: "1 kg",
        system: "SI",
        commonUse: "Base mass measurements",
      },
      {
        name: "Tonne",
        symbol: "t",
        referenceValue: "1,000 kg",
        system: "Metric",
        commonUse: "Vehicles, freight and industry",
      },
      {
        name: "Ounce",
        symbol: "oz",
        referenceValue: "0.028349523125 kg",
        system: "Imperial/US",
        commonUse: "Food and small masses",
      },
      {
        name: "Pound",
        symbol: "lb",
        referenceValue: "0.45359237 kg",
        system: "Imperial/US",
        commonUse: "Body and product mass",
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
      "Convert between Celsius, Fahrenheit, Kelvin, Rankine and Réaumur, with the formulas and scale differences needed for weather, cooking, science and engineering.",
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
          "Kelvin and Celsius share the same interval size, but Kelvin starts from absolute zero. A temperature of 0 °C is exactly 273.15 K, while water freezes at 32 °F on the Fahrenheit scale.",
        ],
      },
      {
        title: "Temperature conversion formulas",
        paragraphs: [
          "To convert Celsius to Fahrenheit, multiply by 1.8 and add 32: °F = (°C × 1.8) + 32. To convert Fahrenheit to Celsius, subtract 32 and divide by 1.8: °C = (°F − 32) ÷ 1.8.",
          "Kelvin uses an absolute zero point: K = °C + 273.15 and °C = K − 273.15. The converter applies these offsets automatically, so the result is not limited to simple multiplication.",
        ],
      },
      {
        title: "Why are temperature conversions special?",
        paragraphs: [
          "Temperature scales do not always share the same zero point, so some conversions require both multiplication and addition or subtraction.",
          "This is why Celsius-to-Fahrenheit and Celsius-to-Kelvin formulas differ from simple proportional conversions such as length or mass. For example, 20 °C is not twice as warm as 10 °C in an absolute physical sense because Celsius has an offset zero point.",
        ],
      },
      {
        title: "Temperature values and temperature differences",
        paragraphs: [
          "A temperature value identifies a point on a scale, so the offset between Celsius, Fahrenheit and Kelvin matters. A temperature difference is an interval, such as a rise of 10 degrees during heating.",
          "A difference of 1 °C has the same size as a difference of 1 K. A difference of 1 °F is smaller: it equals 5/9 of a Celsius or kelvin interval. This distinction matters in heat-transfer, material and engineering calculations.",
        ],
      },
      {
        title: "Rankine and Réaumur",
        paragraphs: [
          "Rankine is an absolute temperature scale with degree steps the same size as Fahrenheit degrees. It is encountered in some US and imperial engineering contexts; 0 °R is absolute zero.",
          "Réaumur is a historical scale that set water's freezing point to 0 °Ré and its boiling point to 80 °Ré. It is uncommon in modern work, but it can appear in older scientific, industrial and culinary sources.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Celsius",
        symbol: "°C",
        referenceValue: "0 °C = 273.15 K",
        system: "Metric/international",
        commonUse: "Weather, cooking and engineering",
      },
      {
        name: "Fahrenheit",
        symbol: "°F",
        referenceValue: "32 °F = 0 °C",
        system: "US customary use",
        commonUse: "US weather, cooking and household settings",
      },
      {
        name: "Kelvin",
        symbol: "K",
        referenceValue: "0 K = absolute zero",
        system: "SI base unit",
        commonUse: "Science, thermodynamics and absolute temperature",
      },
      {
        name: "Rankine",
        symbol: "°R",
        referenceValue: "0 °R = absolute zero",
        system: "Fahrenheit-based absolute scale",
        commonUse: "US and imperial engineering references",
      },
      {
        name: "Réaumur",
        symbol: "°Ré",
        referenceValue: "0 °Ré = 0 °C; 80 °Ré = 100 °C",
        system: "Historical scale",
        commonUse: "Older scientific, industrial and culinary sources",
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
      "Convert between milliseconds, seconds, minutes, hours and days, with the exact relationships used in schedules, rates and data logging.",
    introduction: [
      "Time is one of the SI base quantities and is essential in physics, engineering, navigation and ordinary planning.",
      "Seconds, minutes, hours and days appear together in practical calculations for rates, speed, energy use, process duration and schedules. This converter is for duration, not for time-zone or calendar-date conversion.",
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
          "It appears in speed, acceleration, frequency, energy use, production cycles and many measured rates. When a quantity is expressed 'per second' or 'per hour', time is part of its unit.",
        ],
      },
      {
        title: "Seconds, minutes, hours and days",
        paragraphs: [
          "The second is the SI base unit of time. Minutes and hours remain standard practical units built on exact relationships.",
          "One minute equals exactly 60 seconds, one hour equals exactly 3,600 seconds, and one day equals exactly 86,400 seconds in this duration conversion. Milliseconds are useful for short events, instrumentation and digital timing.",
        ],
      },
      {
        title: "Duration is not always a calendar period",
        paragraphs: [
          "A fixed duration can be converted reliably with multiplication or division by exact factors such as 60, 3,600 and 86,400. That makes seconds, minutes, hours and days appropriate for experiments, schedules and rate calculations.",
          "Months and years are not included as fixed duration units because calendar months have different lengths and leap years change the length of a calendar year. For deadlines and dates, use a calendar-aware tool rather than assuming every month has the same number of days.",
        ],
      },
      {
        title: "Time in rate and energy calculations",
        paragraphs: [
          "Speed is distance divided by time, and power is energy divided by time. Keep the time basis visible when comparing values: a per-second rate and a per-hour rate are not directly comparable until one is converted.",
          "For example, a device rated at 1 kW uses 1 kWh only after operating for one hour at that rate. Converting the duration first helps prevent mixing power with energy.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Millisecond",
        symbol: "ms",
        referenceValue: "0.001 s",
        system: "SI/metric prefix",
        commonUse: "Digital timing, instruments and short events",
      },
      {
        name: "Second",
        symbol: "s",
        referenceValue: "1 s",
        system: "SI base unit",
        commonUse: "Science, timing and general duration measurement",
      },
      {
        name: "Minute",
        symbol: "min",
        referenceValue: "60 s exactly",
        system: "Accepted with SI",
        commonUse: "Schedules, media and everyday duration",
      },
      {
        name: "Hour",
        symbol: "h",
        referenceValue: "3,600 s exactly",
        system: "Accepted with SI",
        commonUse: "Work, travel, energy use and planning",
      },
      {
        name: "Day",
        symbol: "day",
        referenceValue: "86,400 s exactly",
        system: "Calendar-based practical unit",
        commonUse: "Daily duration, forecasts and schedules",
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
      "Convert between kilometers per hour, meters per second, miles per hour, knots and engineering speed units, with clear road, aviation and maritime context.",
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
          "One meter per second equals 3.6 kilometers per hour. One mile per hour equals exactly 1.609344 kilometers per hour, which makes the relationship reliable for vehicle, testing and distance calculations.",
        ],
      },
      {
        title: "Knots, nautical miles and aviation",
        paragraphs: [
          "A knot is a unit of speed equal to one nautical mile per hour. The international nautical mile is exactly 1,852 meters, so one knot equals exactly 1.852 km/h or about 0.514444 m/s.",
          "Knots are used at sea and in aviation because nautical miles fit naturally with latitude and longitude on navigation charts. A knot is a speed; a nautical mile is a distance, so the two terms should not be used interchangeably.",
        ],
      },
      {
        title: "Engineering and scientific speed units",
        paragraphs: [
          "Meters per second provide the SI-based form used in equations for motion, flow and machinery. Foot per second, meter per minute and centimeter per second are useful when a drawing, sensor or machine specification uses those scales directly.",
          "The speed of light is included as a scientific reference. Its exact value in vacuum is 299,792,458 meters per second and it is not a practical transport-speed unit.",
        ],
      },
      {
        title: "Speed and velocity are different",
        paragraphs: [
          "Speed tells how fast an object moves. Velocity also includes direction, so two vehicles can have the same speed but different velocities when they travel in different directions.",
          "This converter changes the magnitude of a speed. It does not alter direction, acceleration or travel time.",
        ],
      },
      {
        title: "How are speed units converted?",
        paragraphs: [
          "Speed conversions preserve the same physical motion while changing the numerical representation.",
          "For example, divide km/h by 3.6 to get m/s, multiply m/s by 3.6 to get km/h, and multiply mph by 1.609344 to get km/h. The converter handles these relationships without manual rounding.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Meter per second",
        symbol: "m/s",
        referenceValue: "3.6 km/h",
        system: "SI-based",
        commonUse: "Physics, engineering and flow calculations",
      },
      {
        name: "Kilometer per hour",
        symbol: "km/h",
        referenceValue: "0.277778 m/s",
        system: "Metric road use",
        commonUse: "Road transport and vehicle displays",
      },
      {
        name: "Mile per hour",
        symbol: "mph",
        referenceValue: "1.609344 km/h",
        system: "Anglo-American road use",
        commonUse: "Road speed and vehicle displays",
      },
      {
        name: "Knot",
        symbol: "kn",
        referenceValue: "1.852 km/h",
        system: "International navigation",
        commonUse: "Maritime and aviation navigation",
      },
      {
        name: "Foot per second",
        symbol: "ft/s",
        referenceValue: "0.3048 m/s",
        system: "Anglo-American engineering",
        commonUse: "Technical and mechanical specifications",
      },
      {
        name: "Meter per minute",
        symbol: "m/min",
        referenceValue: "0.0166667 m/s",
        system: "Metric engineering",
        commonUse: "Conveyors and process equipment",
      },
      {
        name: "Centimeter per second",
        symbol: "cm/s",
        referenceValue: "0.01 m/s",
        system: "Metric",
        commonUse: "Small-scale motion and laboratory work",
      },
      {
        name: "Speed of light in vacuum",
        symbol: "c",
        referenceValue: "299,792,458 m/s exactly",
        system: "Physical constant",
        commonUse: "Physics and astronomy reference",
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
        title: "The pressure formula: P = F / A",
        paragraphs: [
          "The basic definition of pressure is given by P = F / A, where P is pressure, F is the force acting perpendicular to a surface and A is the area over which that force is distributed. Working through the units gives newtons per square meter, which is exactly the pascal.",
          "This relationship gives the average pressure under a uniform force distribution. In real contact problems or complex flow fields, pressure can vary across the surface, so a single average value is not always enough — local pressure distribution and boundary conditions may need to be considered.",
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
      {
        title: "Hydrostatic pressure and P = ρgh",
        paragraphs: [
          "Pressure increases with depth in a still fluid. Assuming constant density, hydrostatic gauge pressure is given approximately by P = ρgh, where ρ is density, g is gravitational acceleration and h is the height of the fluid column above the point being measured.",
          "This relationship is used for water tanks, open basins, dams, level measurement and liquid-column manometers. At the same depth in the same fluid, pressure is considered equal regardless of the shape of the container — what matters is the fluid density and the vertical depth below the free surface.",
        ],
      },
      {
        title: "Atmospheric pressure",
        paragraphs: [
          "Atmospheric pressure is the pressure exerted on surfaces by the weight of the column of air in Earth's atmosphere. Under standard conditions near sea level it is taken as about 101,325 Pa, or 1 atm — but this value is not fixed, and varies with altitude, weather and temperature.",
          "Barometers are used to measure atmospheric pressure. Mercury barometers were historically the reference instrument, while electronic pressure sensors are now widespread. Atmospheric pressure matters not only for meteorology, but also for vacuum technology, combustion systems and converting between gauge and absolute pressure.",
        ],
      },
      {
        title: "How is pressure measured?",
        paragraphs: [
          "Measuring pressure starts with identifying which type is needed — absolute, gauge or differential — followed by considering the measurement range, fluid type, temperature, chemical compatibility, vibration and required accuracy. A single sensor is not suitable for every application.",
          "Diaphragm-based differential transmitters are common for low pressures and small differences, strain-gauge or piezoresistive elements for higher process pressures, and dedicated absolute sensors for vacuum work. Liquid-column manometers remain useful for teaching the basic principle, though electronic instruments dominate modern industry.",
        ],
      },
      {
        title: "Pressure sensors and gauges",
        paragraphs: [
          "Mechanical gauges, such as Bourdon-tube instruments, convert pressure into the deformation of an elastic element, which moves a needle on a dial. Their durability, simplicity and lack of power requirement have kept them in wide industrial use for a long time.",
          "Electronic pressure sensors may be piezoresistive, capacitive, strain-gauge or resonance-based. They convert a pressure change into an electrical signal that can feed PLCs, SCADA systems or data loggers, enabling alarms, control loops and trend analysis rather than just an instantaneous reading.",
        ],
      },
      {
        title: "Common pressure calculation mistakes",
        paragraphs: [
          "The most frequent mistake is confusing gauge pressure with absolute pressure — gas-law calculations, density estimates and vacuum work require absolute pressure, but a gauge reading is often used directly by mistake, producing a systematic error.",
          "Another common error is rounding conversion factors or using the wrong unit reference when converting between PSI, bar, atm, mmHg and kPa. Ignoring hydrostatic effects, sensor mounting height or temperature influence can also change a measurement result more than it might first appear.",
        ],
      },
    ],

    unitTable: [
      {
        name: "Pascal",
        symbol: "Pa",
        referenceValue: "1 Pa",
        system: "SI",
        commonUse: "Scientific and engineering calculations",
      },
      {
        name: "Kilopascal",
        symbol: "kPa",
        referenceValue: "1,000 Pa",
        system: "SI",
        commonUse: "Building services, tires and process pressures",
      },
      {
        name: "Bar",
        symbol: "bar",
        referenceValue: "100,000 Pa",
        system: "Metric, non-SI",
        commonUse: "Industry, compressors and process systems",
      },
      {
        name: "Millibar",
        symbol: "mbar",
        referenceValue: "100 Pa",
        system: "Metric, non-SI",
        commonUse: "Meteorology and atmospheric measurements",
      },
      {
        name: "Standard atmosphere",
        symbol: "atm",
        referenceValue: "101,325 Pa",
        system: "Non-SI",
        commonUse: "Atmospheric and reference conditions",
      },
      {
        name: "PSI",
        symbol: "psi",
        referenceValue: "≈ 6,894.757293 Pa",
        system: "Imperial/US",
        commonUse: "Tires, hydraulic and pneumatic systems",
      },
      {
        name: "Technical atmosphere",
        symbol: "at",
        referenceValue: "98,066.5 Pa",
        system: "Non-SI",
        commonUse: "Older technical and engineering usage",
      },
      {
        name: "Millimeter of mercury",
        symbol: "mmHg",
        referenceValue: "≈ 133.322 Pa",
        system: "Non-SI",
        commonUse: "Medicine, vacuum and pressure measurement",
      },
      {
        name: "Millimeter of water",
        symbol: "mmH₂O",
        referenceValue: "≈ 9.80665 Pa",
        system: "Non-SI",
        commonUse: "Low-pressure and ventilation measurements",
      },
      {
        name: "Kilogram-force per square centimeter",
        symbol: "kgf/cm²",
        referenceValue: "98,066.5 Pa",
        system: "Metric, non-SI",
        commonUse: "Older pump and boiler gauges, service manuals",
      },
    ],
  },
  {
    locale: "en",
    slug: "energy",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Energy Conversions",
    description:
      "Convert between joules, kilowatt-hours, calories, Btu and electronvolts, with context for electricity, heat, nutrition and science.",
    introduction: [
      "Energy measures an amount of work or heat, distinct from power, which measures the rate energy is transferred (see the separate Power category).",
      "This category brings together practical energy conversions used in electricity billing, heating, food labels, building systems and science. The number can be converted directly; its real-world meaning still depends on the context in which it was measured.",
    ],
    facts: [
      { label: "Physical quantity", value: "Energy" },
      { label: "SI unit", value: "Joule" },
      { label: "Common billing unit", value: "Kilowatt-hour" },
      { label: "Typical use", value: "Electrical consumption and heat content" },
    ],
    sections: [
      {
        title: "What is energy?",
        paragraphs: [
          "Energy measures an amount of work or heat stored or transferred, not the rate at which it happens.",
          "A kilowatt-hour is an energy unit; the related power unit (kilowatt) has its own conversion category. A 2 kW appliance operating at that power for 3 hours uses 6 kWh of energy.",
        ],
      },
      {
        title: "Joules and metric energy units",
        paragraphs: [
          "The joule (J) is the SI unit of energy. Kilojoules and megajoules use the usual metric prefixes: 1 kJ is 1,000 J and 1 MJ is 1,000,000 J.",
          "Joules are common in physics and engineering because they connect directly to work, heat and electrical energy calculations. They provide a neutral reference when comparing units from different systems.",
        ],
      },
      {
        title: "Watt-hours and electricity bills",
        paragraphs: [
          "A watt-hour is the energy delivered by one watt of power for one hour. It equals 3,600 J, so 1 kWh equals 3.6 MJ. Electricity meters and utility bills normally use kWh because household consumption is much larger than one watt-hour.",
          "Do not read kW and kWh as interchangeable. Kilowatts describe a device's power rating at an instant; kilowatt-hours describe accumulated energy over time. For a cost estimate, multiply power, running time and the applicable electricity tariff.",
        ],
      },
      {
        title: "Calories in food and heat calculations",
        paragraphs: [
          "The small calorie (cal) and kilocalorie (kcal) are energy units. In nutrition, a label's capitalized Calorie commonly means one kilocalorie, not one small calorie. Check the label convention and country before comparing it with a recipe or health record.",
          "Calories and kilocalories also appear in older heat calculations. In international scientific and technical work, joules and kilojoules are generally the clearer reference units.",
        ],
      },
      {
        title: "Btu, therms and electronvolts",
        paragraphs: [
          "Btu (British thermal unit) is widely encountered in heating and cooling equipment, fuel content and building-services specifications. A therm is a much larger fuel-energy unit, often used in gas billing. The exact Btu convention should be stated in formal technical or contractual work.",
          "The electronvolt (eV) is a very small energy unit used in atomic, particle and semiconductor physics. It is not a household energy unit, but makes values at microscopic scales easier to read than a long decimal number of joules.",
        ],
      },
      {
        title: "Energy versus power, capacity and heat rate",
        paragraphs: [
          "Energy is an accumulated quantity. Power is the rate of energy transfer, so 1 W equals 1 J per second. A battery's energy capacity may be given in Wh or kWh, while its charger or inverter is rated in W or kW.",
          "Likewise, Btu is energy whereas Btu per hour is a heat rate (power). Before converting, make sure both sides describe the same physical quantity; this converter converts energy only.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Joule",
        symbol: "J",
        referenceValue: "1 J",
        system: "SI",
        commonUse: "Physics, engineering and general energy calculations",
      },
      {
        name: "Kilojoule",
        symbol: "kJ",
        referenceValue: "1,000 J",
        system: "SI/metric",
        commonUse: "Food labels, heat and technical reporting",
      },
      {
        name: "Megajoule",
        symbol: "MJ",
        referenceValue: "1,000,000 J",
        system: "SI/metric",
        commonUse: "Fuel, heating and larger energy totals",
      },
      {
        name: "Watt-hour",
        symbol: "Wh",
        referenceValue: "3,600 J",
        system: "Practical electrical unit",
        commonUse: "Small batteries and device energy capacity",
      },
      {
        name: "Kilowatt-hour",
        symbol: "kWh",
        referenceValue: "3,600,000 J (3.6 MJ)",
        system: "Practical electrical unit",
        commonUse: "Electricity meters, bills and battery capacity",
      },
      {
        name: "Calorie",
        symbol: "cal",
        referenceValue: "4.184 J",
        system: "Non-SI",
        commonUse: "Older heat calculations",
      },
      {
        name: "Kilocalorie",
        symbol: "kcal",
        referenceValue: "4,184 J",
        system: "Non-SI",
        commonUse: "Food energy and nutrition labels",
      },
      {
        name: "British thermal unit",
        symbol: "Btu",
        referenceValue: "1,055.056 J",
        system: "US customary / non-SI",
        commonUse: "Heating, cooling and fuel specifications",
      },
      {
        name: "Therm",
        symbol: "th",
        referenceValue: "105.506 MJ",
        system: "Gas-energy unit",
        commonUse: "Natural-gas billing and fuel totals",
      },
      {
        name: "Electronvolt",
        symbol: "eV",
        referenceValue: "1.602176634 × 10⁻¹⁹ J",
        system: "Physics",
        commonUse: "Atomic, particle and semiconductor physics",
      },
    ],
  },
  {
    locale: "en",
    slug: "angle",
    sourceSlug: "aci",
    category: "aci",
    title: "Angle Conversions",
    description:
      "Convert between degrees, radians and gradians and review units used for trigonometry, engineering drawing and navigation.",
    introduction: [
      "Angle measures the amount of rotation between two rays sharing a common endpoint.",
      "The radian is the SI unit of angle, while the degree is the most common practical unit for everyday and navigational use.",
    ],
    facts: [
      { label: "Physical quantity", value: "Angle" },
      { label: "SI unit", value: "Radian" },
      { label: "Common practical unit", value: "Degree" },
      { label: "Typical use", value: "Trigonometry, navigation and engineering drawing" },
    ],
    sections: [
      {
        title: "What is angle?",
        paragraphs: [
          "Angle is the amount of rotation between two rays sharing a common endpoint, measured in degrees, radians or gradians.",
          "It is used in trigonometry, geometry, navigation and engineering.",
        ],
      },
      {
        title: "Degrees, radians and gradians",
        paragraphs: [
          "A full circle is 360 degrees, 2π radians, or 400 gradians. The degree traces back to ancient Babylonian base-60 mathematics, while the radian is the natural SI unit for mathematical calculations.",
        ],
      },
      {
        title: "Choosing an angle unit",
        paragraphs: [
          "Degrees are common in everyday measurement, surveying and navigation. Radians are normally used in trigonometry, calculus and many engineering formulas because they relate an angle directly to an arc length and radius.",
          "Gradians divide a full turn into 400 parts and appear in some surveying and technical contexts. A full turn is useful when rotations are counted rather than expressed as a partial circle.",
        ],
      },
      {
        title: "How angle units are converted",
        paragraphs: [
          "Angle conversions preserve the same rotation. Use a fixed full-circle relationship: 360 degrees equals 2π radians, 400 gradians and one full turn.",
          "Keep the unit explicit when entering values into calculators or engineering software, because trigonometric functions may expect radians by default.",
        ],
      },
    ],
    unitTable: [
      { name: "Radian", symbol: "rad", referenceValue: "2π rad = 1 full turn", system: "SI coherent derived unit", commonUse: "Mathematics, physics and engineering" },
      { name: "Degree", symbol: "°", referenceValue: "360° = 1 full turn", system: "Practical angular measure", commonUse: "Navigation, geometry and daily measurement" },
      { name: "Gradian", symbol: "gon", referenceValue: "400 gon = 1 full turn", system: "Metric angular measure", commonUse: "Surveying and technical drawing" },
      { name: "Full Turn", symbol: "turn", referenceValue: "1 turn = 360°", system: "Rotation count", commonUse: "Rotating machinery and motion" },
    ],
  },
  {
    locale: "en",
    slug: "frequency",
    sourceSlug: "frekans",
    category: "frekans",
    title: "Frequency Conversions",
    description:
      "Convert between hertz, kilohertz, megahertz and gigahertz and review units used for electronics, sound and radio waves.",
    introduction: [
      "Frequency measures how many times an event repeats per second.",
      "Hertz is the SI unit, and its multiples (kHz, MHz, GHz) are standard across electronics, radio and computing.",
    ],
    facts: [
      { label: "Physical quantity", value: "Frequency" },
      { label: "SI unit", value: "Hertz" },
      { label: "SI symbol", value: "Hz" },
      { label: "Typical use", value: "Electronics, radio and computing" },
    ],
    sections: [
      {
        title: "What is frequency?",
        paragraphs: [
          "Frequency is the number of occurrences of a repeating event per unit of time, named after physicist Heinrich Hertz.",
          "It is used for sound waves, electrical current frequency, processor speed and radio waves.",
        ],
      },
      {
        title: "Hertz and SI prefixes",
        paragraphs: [
          "One hertz represents one cycle per second. SI prefixes scale the unit by powers of one thousand: kilohertz, megahertz and gigahertz are used when a plain hertz value would be inconveniently large.",
          "Frequency values appear in radio tuning, display refresh rates, processors, audio, oscillators and alternating-current systems.",
        ],
      },
      {
        title: "How frequency units are converted",
        paragraphs: [
          "Frequency conversions use decimal SI prefixes. One kilohertz is 1,000 hertz, one megahertz is 1,000 kilohertz, and one gigahertz is 1,000 megahertz.",
          "Frequency is not the same as data-transfer rate: a clock or carrier frequency in hertz does not by itself state how much data a system transfers per second.",
        ],
      },
    ],
    unitTable: [
      { name: "Hertz", symbol: "Hz", referenceValue: "1 Hz = 1 s⁻¹", system: "SI derived unit", commonUse: "AC power, sound and periodic signals" },
      { name: "Kilohertz", symbol: "kHz", referenceValue: "1 kHz = 1,000 Hz", system: "SI prefix", commonUse: "Audio and radio frequencies" },
      { name: "Megahertz", symbol: "MHz", referenceValue: "1 MHz = 1,000,000 Hz", system: "SI prefix", commonUse: "Broadcasting and electronics" },
      { name: "Gigahertz", symbol: "GHz", referenceValue: "1 GHz = 1,000,000,000 Hz", system: "SI prefix", commonUse: "Processors, Wi-Fi and microwave systems" },
    ],
  },
  {
    locale: "en",
    slug: "volumetric-flow-rate",
    sourceSlug: "hacimsel-debi",
    category: "debi_hacimsel",
    title: "Volumetric Flow Rate Conversions",
    description:
      "Convert between cubic meters per second, CFM and GPM and review units used for ventilation and pump capacity calculations.",
    introduction: [
      "Volumetric flow rate measures how much fluid volume passes through a section per unit of time.",
      "CFM (cubic feet per minute) and GPM (gallons per minute) are the standard practical units in US HVAC and pump industries.",
    ],
    facts: [
      { label: "Physical quantity", value: "Volumetric flow rate" },
      { label: "SI unit", value: "Cubic meter per second" },
      { label: "Common practical units", value: "CFM, GPM" },
      { label: "Typical use", value: "Ventilation and pump capacity" },
    ],
    sections: [
      {
        title: "What is volumetric flow rate?",
        paragraphs: [
          "Volumetric flow rate describes the volume of fluid passing a point per unit of time.",
          "It is used for fan and ventilation capacity (CFM) and pump/irrigation flow (GPM).",
        ],
      },
      {
        title: "CFM, GPM and cubic meters per second",
        paragraphs: [
          "Cubic meters per second is the SI form used in scientific and engineering calculations. Cubic feet per minute (CFM) is widely used for air movement and ventilation, while gallons per minute (GPM) is common for pumps and water systems.",
          "The gallon standard matters: a US gallon and an imperial gallon have different volumes. Select the explicitly labelled unit when converting specifications from another region.",
        ],
      },
      {
        title: "Using flow-rate conversions",
        paragraphs: [
          "Use the same time basis on both sides of a comparison. A pump rating in gallons per minute cannot be compared directly with a requirement in cubic meters per hour until the volume and time units have both been converted.",
          "Flow rate describes how much passes through a system, not pressure. Pipe size, resistance and pressure conditions still affect the flow a real installation can deliver.",
        ],
      },
    ],
    unitTable: [
      { name: "Cubic Meter per Second", symbol: "m³/s", referenceValue: "SI reference unit", system: "SI", commonUse: "Engineering and large process systems" },
      { name: "Cubic Feet per Minute", symbol: "CFM", referenceValue: "≈ 0.000471947 m³/s", system: "US customary", commonUse: "HVAC, fans and ventilation" },
      { name: "US Gallons per Minute", symbol: "GPM", referenceValue: "≈ 0.0000630902 m³/s", system: "US customary", commonUse: "Pumps, plumbing and irrigation" },
    ],
  },
  {
    locale: "en",
    slug: "mass-flow-rate",
    sourceSlug: "kutlesel-debi",
    category: "debi_kutlesel",
    title: "Mass Flow Rate Conversions",
    description:
      "Convert between kilograms per second and kilograms per hour and review units used for industrial process flow calculations.",
    introduction: [
      "Mass flow rate measures how much mass of a substance passes through a section per unit of time.",
      "It is fundamental to mass balance calculations in industrial process engineering.",
    ],
    facts: [
      { label: "Physical quantity", value: "Mass flow rate" },
      { label: "SI unit", value: "Kilogram per second" },
      { label: "Typical use", value: "Industrial process and mass balance" },
    ],
    sections: [
      {
        title: "What is mass flow rate?",
        paragraphs: [
          "Mass flow rate is the mass of a substance moving through a system per unit of time.",
          "It is used in industrial process design, fuel and material flow calculations.",
        ],
      },
      {
        title: "Mass flow versus volumetric flow",
        paragraphs: [
          "Mass flow rate describes the amount of material by mass, such as kilograms per second. Volumetric flow rate describes occupied volume, such as liters per minute or cubic meters per hour.",
          "For gases and liquids, density links the two quantities. A volume flow rate alone does not establish mass flow unless the fluid density and conditions are known.",
        ],
      },
      {
        title: "Using mass-flow conversions",
        paragraphs: [
          "Keep the mass unit and time unit explicit in a specification. Converting kilograms per hour to kilograms per second changes only the time basis, while converting to another mass unit changes the mass basis as well.",
          "Mass-flow values are used in material balances, fuel delivery, chemical processing and thermal-system calculations.",
        ],
      },
    ],
    unitTable: [
      { name: "Kilogram per Second", symbol: "kg/s", referenceValue: "SI reference unit", system: "SI", commonUse: "Process engineering and mass balances" },
      { name: "Kilogram per Hour", symbol: "kg/h", referenceValue: "1 kg/h = 1/3,600 kg/s", system: "Practical time-based unit", commonUse: "Industrial equipment and material handling" },
    ],
  },
  {
    locale: "en",
    slug: "magnetic-field",
    sourceSlug: "manyetik-alan",
    category: "manyetik_alan",
    title: "Magnetic Field Conversions",
    description:
      "Convert between amperes per meter and oersted and review units used for electromagnetic field strength calculations.",
    introduction: [
      "Magnetic field strength expresses the magnetizing force generated by a current relative to length.",
      "Ampere per meter is the SI derived unit, while oersted remains common in the magnetic materials industry.",
    ],
    facts: [
      { label: "Physical quantity", value: "Magnetic field strength" },
      { label: "SI unit", value: "Ampere per meter" },
      { label: "Typical use", value: "Electromagnetic field and coil design" },
    ],
    sections: [
      {
        title: "What is magnetic field strength?",
        paragraphs: [
          "Magnetic field strength measures the magnetizing force in a region, derived from current and length.",
          "It is used in coil, electromagnet and magnetic material engineering.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "magnetic-flux",
    sourceSlug: "manyetik-aki",
    category: "manyetik_aki",
    title: "Magnetic Flux Conversions",
    description:
      "Convert between weber and milliweber and review units used for transformer and electromagnetic induction calculations.",
    introduction: [
      "Magnetic flux measures the total magnetic field passing through a given surface.",
      "The weber is the SI derived unit, fundamental to transformer and induction calculations.",
    ],
    facts: [
      { label: "Physical quantity", value: "Magnetic flux" },
      { label: "SI unit", value: "Weber" },
      { label: "Typical use", value: "Transformer and induction engineering" },
    ],
    sections: [
      {
        title: "What is magnetic flux?",
        paragraphs: [
          "Magnetic flux quantifies the total magnetic field passing through a surface area.",
          "It is central to transformer design, electromagnetic induction and electric motor engineering.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "kinematic-viscosity",
    sourceSlug: "kinematik-viskozite",
    category: "viskozite_kinematik",
    title: "Kinematic Viscosity Conversions",
    description:
      "Convert between square meters per second and centistokes and review units used for engine oil and fluid classification.",
    introduction: [
      "Kinematic viscosity measures a fluid's resistance to flow under gravity, defined as dynamic viscosity divided by density.",
      "The square meter per second is the SI derived unit, while the centistoke is the standard practical unit in the oil and lubricant industry.",
    ],
    facts: [
      { label: "Physical quantity", value: "Kinematic viscosity" },
      { label: "SI unit", value: "Square meter per second" },
      { label: "Common practical unit", value: "Centistoke (cSt)" },
      { label: "Typical use", value: "Fluid mechanics and lubricant classification" },
    ],
    sections: [
      {
        title: "What is kinematic viscosity?",
        paragraphs: [
          "Kinematic viscosity is the ratio of a fluid's dynamic viscosity to its density.",
          "It is central to fluid mechanics calculations such as the Reynolds number and pipe flow analysis.",
        ],
      },
      {
        title: "Square meters per second and centistokes",
        paragraphs: [
          "The centistoke (cSt), equal to 1 mm²/s, is the most common practical unit used in the oil and lubricant industry for engine oil grading.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "thermal-conductivity",
    sourceSlug: "isil-iletkenlik",
    category: "isil_iletkenlik",
    title: "Thermal Conductivity Conversions",
    description:
      "Convert between watts per meter-Kelvin and BTU per hour-foot-°F and review units used for insulation and heat transfer calculations.",
    introduction: [
      "Thermal conductivity measures how well a material conducts heat.",
      "Watt per meter-Kelvin is the SI derived unit, widely used in material science and building insulation ratings.",
    ],
    facts: [
      { label: "Physical quantity", value: "Thermal conductivity" },
      { label: "SI unit", value: "Watt per meter-Kelvin" },
      { label: "Typical use", value: "Insulation and heat transfer engineering" },
    ],
    sections: [
      {
        title: "What is thermal conductivity?",
        paragraphs: [
          "Thermal conductivity describes a material's ability to conduct heat, derived from Fourier's law of heat conduction.",
          "It is used to compare insulation materials and calculate building heat loss.",
        ],
      },
      {
        title: "Interpreting thermal conductivity",
        paragraphs: [
          "A lower thermal-conductivity value generally means a material transfers heat less readily, which is why low-conductivity materials are used for insulation. A higher value is useful where heat must move efficiently, such as heat exchangers and cookware.",
          "Published values can vary with temperature, moisture, density, direction within the material and test method. Compare specifications measured under similar conditions.",
        ],
      },
      {
        title: "SI and imperial conductivity units",
        paragraphs: [
          "Watt per meter-Kelvin, written W/(m·K), is the common SI-form unit. BTU per hour-foot-degree Fahrenheit is still found in North American building and HVAC material specifications.",
          "The temperature interval in the denominator is part of the unit. Convert the complete conductivity unit rather than only the watt or BTU component.",
        ],
      },
    ],
    unitTable: [
      { name: "Watt per Meter-Kelvin", symbol: "W/(m·K)", referenceValue: "SI reference unit", system: "SI", commonUse: "Material science and building specifications" },
      { name: "BTU per Hour-Foot-°F", symbol: "Btu/(h·ft·°F)", referenceValue: "≈ 1.730735 W/(m·K)", system: "US customary", commonUse: "North American insulation and HVAC data" },
    ],
  },
  {
    locale: "en",
    slug: "heat-flux",
    sourceSlug: "isi-akisi",
    category: "isi_akisi",
    title: "Heat Flux Conversions",
    description:
      "Convert between watts per square meter and kilowatts per square meter and review units used for surface heat transfer.",
    introduction: [
      "Heat flux measures the rate of heat energy transfer through a given surface area.",
      "Watt per square meter is the SI derived unit, used in building heat loss and solar radiation calculations.",
    ],
    facts: [
      { label: "Physical quantity", value: "Heat flux" },
      { label: "SI unit", value: "Watt per square meter" },
      { label: "Typical use", value: "Surface heat transfer and solar radiation" },
    ],
    sections: [
      {
        title: "What is heat flux?",
        paragraphs: [
          "Heat flux is the rate of heat energy transferred through a unit surface area.",
          "It is used for building heat loss calculations and solar panel radiation analysis.",
        ],
      },
      {
        title: "Heat flux and total heat transfer",
        paragraphs: [
          "Heat flux is a density of heat-transfer rate over area, not the total heat-transfer rate. Multiplying heat flux by the relevant area gives a total power value when the flux is uniform.",
          "This distinction matters when comparing a small component with a large wall or roof: the same flux over a larger area produces a larger total heat transfer.",
        ],
      },
      {
        title: "Using heat-flux units",
        paragraphs: [
          "Watts per square meter is the standard SI-form unit. Kilowatts per square meter is useful when the value is large, such as high-intensity thermal or solar applications.",
          "Specify whether a value represents incoming, outgoing or net heat flux, and keep surface area and boundary conditions consistent when comparing results.",
        ],
      },
    ],
    unitTable: [
      { name: "Watt per Square Meter", symbol: "W/m²", referenceValue: "SI reference unit", system: "SI", commonUse: "Building physics and surface heat transfer" },
      { name: "Kilowatt per Square Meter", symbol: "kW/m²", referenceValue: "1 kW/m² = 1,000 W/m²", system: "SI prefix", commonUse: "High-intensity thermal and solar analysis" },
    ],
  },
  {
    locale: "en",
    slug: "specific-heat",
    sourceSlug: "ozgul-isi",
    category: "ozgul_isi",
    title: "Specific Heat Conversions",
    description:
      "Convert between joules per kilogram-Kelvin and calories per gram-Kelvin and review units used for material heating capacity.",
    introduction: [
      "Specific heat measures the energy required to raise the temperature of a substance by one degree.",
      "Joule per kilogram-Kelvin is the SI derived unit, while calorie per gram-Kelvin remains common in chemistry.",
    ],
    facts: [
      { label: "Physical quantity", value: "Specific heat" },
      { label: "SI unit", value: "Joule per kilogram-Kelvin" },
      { label: "Typical use", value: "Material science and thermodynamics" },
    ],
    sections: [
      {
        title: "What is specific heat?",
        paragraphs: [
          "Specific heat is the amount of energy needed to raise one unit of mass by one degree of temperature.",
          "It is used in material science, thermodynamics and heating/cooling system design.",
        ],
      },
      {
        title: "Why specific heat matters",
        paragraphs: [
          "Materials with a higher specific heat require more energy for the same mass and temperature change. This property is important when estimating thermal storage, heating time and cooling behavior.",
          "Specific heat is different from total heat capacity. Heat capacity applies to an entire object, while specific heat is normalized by mass.",
        ],
      },
      {
        title: "Specific-heat units",
        paragraphs: [
          "Joules per kilogram-Kelvin is the SI-form unit. Calories per gram-Kelvin is also found in chemistry and educational material.",
          "The temperature interval is part of the unit. For a temperature difference, one Kelvin and one degree Celsius have the same size, but the mass basis must also be converted correctly.",
        ],
      },
    ],
    unitTable: [
      { name: "Joule per Kilogram-Kelvin", symbol: "J/(kg·K)", referenceValue: "SI reference unit", system: "SI", commonUse: "Thermodynamics and material data" },
      { name: "Calorie per Gram-Kelvin", symbol: "cal/(g·K)", referenceValue: "1 cal/(g·K) = 4,184 J/(kg·K)", system: "Calorie-based unit", commonUse: "Chemistry and educational references" },
    ],
  },
  {
    locale: "en",
    slug: "acceleration",
    sourceSlug: "ivme",
    category: "ivme",
    title: "Acceleration Conversions",
    description:
      "Convert between meters per second squared, feet per second squared and standard gravity (g) and review units used in vehicle performance and physics.",
    introduction: [
      "Acceleration measures how quickly velocity changes over time.",
      "The meter per second squared is the SI derived unit, while standard gravity (g) is a common reference for g-force in vehicles and aerospace.",
    ],
    facts: [
      { label: "Physical quantity", value: "Acceleration" },
      { label: "SI unit", value: "Meter per second squared" },
      { label: "SI symbol", value: "m/s²" },
      { label: "Typical use", value: "Vehicle performance and physics" },
    ],
    sections: [
      {
        title: "What is acceleration?",
        paragraphs: [
          "Acceleration is the rate of change of velocity with respect to time.",
          "It is used to describe vehicle performance, free fall, g-forces and mechanical motion.",
        ],
      },
      {
        title: "Standard gravity as a reference",
        paragraphs: [
          "Standard gravity (g = 9.80665 m/s²) is widely used as a reference unit for expressing acceleration relative to Earth's gravitational pull, especially in aerospace and vehicle testing.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "angular-velocity",
    sourceSlug: "acisal-hiz",
    category: "acisal_hiz",
    title: "Angular Velocity Conversions",
    description:
      "Convert between RPM, radians per second and degrees per second and review units used for engine speed and rotational motion.",
    introduction: [
      "Angular velocity measures how fast an object rotates or revolves, expressed as an angle per unit of time.",
      "RPM (revolutions per minute) is the most common practical unit, while radians per second is the SI derived unit used in engineering calculations.",
    ],
    facts: [
      { label: "Physical quantity", value: "Angular velocity" },
      { label: "SI unit", value: "Radian per second" },
      { label: "Common practical unit", value: "RPM" },
      { label: "Typical use", value: "Engine speed and rotational motion" },
    ],
    sections: [
      {
        title: "What is angular velocity?",
        paragraphs: [
          "Angular velocity describes the rate of rotation of an object around an axis.",
          "It is used for engine and motor speeds, turbines, hard drives and rotational dynamics.",
        ],
      },
      {
        title: "RPM, radians and degrees per second",
        paragraphs: [
          "RPM expresses rotation as full revolutions per minute, a practical unit for engines and machinery.",
          "Radians per second is the SI unit preferred in physics and engineering formulas.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "power",
    sourceSlug: "guc",
    category: "guc",
    title: "Power Conversions",
    description:
      "Convert between watts, kilowatts, megawatts and horsepower and review the units used for engine, generator and appliance power ratings.",
    introduction: [
      "Power measures the rate at which energy is transferred or used, distinct from energy itself (see the separate Energy category).",
      "This category groups practical power conversions for engines, electrical equipment and generation capacity.",
    ],
    facts: [
      { label: "Physical quantity", value: "Power" },
      { label: "SI unit", value: "Watt" },
      { label: "SI symbol", value: "W" },
      { label: "Common non-SI unit", value: "Horsepower" },
      { label: "Typical use", value: "Engine and equipment power rating" },
    ],
    sections: [
      {
        title: "What is power?",
        paragraphs: [
          "Power is the rate at which energy is transferred or converted, expressed as energy per unit of time.",
          "It is used to rate engines, motors, generators, electrical devices and power plants.",
        ],
      },
      {
        title: "Watts, kilowatts, megawatts and horsepower",
        paragraphs: [
          "The watt is the SI unit of power. Kilowatts and megawatts scale it up for equipment and power plant capacity.",
          "Horsepower is a traditional non-SI unit still common in the automotive industry; metric horsepower (PS/CV) and mechanical horsepower (HP) differ slightly in value.",
        ],
      },
      {
        title: "Power versus energy",
        paragraphs: [
          "Power is a rate, while energy is an accumulated quantity. A device rated in watts describes how quickly it uses or delivers energy; energy bills and battery capacities are commonly expressed in kilowatt-hours.",
          "For example, the same appliance can use different total energy amounts depending on how long it runs, even though its power rating stays the same.",
        ],
      },
      {
        title: "Power units in equipment ratings",
        paragraphs: [
          "Watts and kilowatts are common for electrical appliances, motors and solar equipment. Horsepower remains common for vehicle engines, pumps and some mechanical equipment.",
          "Cooling equipment may use tons of refrigeration, while heating and HVAC specifications can use BTU per hour. Check whether a specification means electrical input power, mechanical output power or thermal capacity before comparing equipment.",
        ],
      },
    ],
    unitTable: [
      { name: "Watt", symbol: "W", referenceValue: "1 W = 1 J/s", system: "SI derived unit", commonUse: "Appliance and electronic power ratings" },
      { name: "Kilowatt", symbol: "kW", referenceValue: "1 kW = 1,000 W", system: "SI prefix", commonUse: "Motors, heating and solar equipment" },
      { name: "Megawatt", symbol: "MW", referenceValue: "1 MW = 1,000,000 W", system: "SI prefix", commonUse: "Power plants and utility-scale generation" },
      { name: "Mechanical Horsepower", symbol: "hp", referenceValue: "≈ 745.7 W", system: "Customary power unit", commonUse: "Engines and mechanical equipment" },
      { name: "Ton of Refrigeration", symbol: "TR", referenceValue: "≈ 3,516.85 W", system: "HVAC capacity unit", commonUse: "Air-conditioning and refrigeration" },
      { name: "BTU per Hour", symbol: "BTU/h", referenceValue: "≈ 0.293071 W", system: "Thermal power unit", commonUse: "Heating and HVAC specifications" },
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
      "Convert voltage and electric-current units within their own families, with clear context for volts, amperes and SI prefixes.",
    introduction: [
      "Electrical calculations rely on several distinct physical quantities, including voltage and current.",
      "This converter keeps the two fundamental families separate: voltage units convert to voltage units, and current units convert to current units. A circuit equation is needed to relate one family to the other.",
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
          "They are different physical quantities, even though both rely heavily on metric prefixes in practical work. A value in volts cannot be directly converted into amperes without information about the circuit, such as resistance, impedance or power.",
        ],
      },
      {
        title: "Volts, kilovolts, amperes and milliamperes",
        paragraphs: [
          "The volt and ampere are standard SI electrical units. Their prefixed forms are used to express much larger or smaller values more clearly.",
          "One kilovolt equals 1,000 volts, one volt equals 1,000 millivolts, and one ampere equals 1,000 milliamperes. The prefix changes the scale, not the physical quantity being measured.",
        ],
      },
      {
        title: "When voltage and current can be related",
        paragraphs: [
          "Ohm's law relates voltage, current and resistance in appropriate circuits: V = I × R. Electrical power also relates voltage and current in simple cases: P = V × I. These are calculations with additional inputs, not direct unit conversions.",
          "Use a dedicated electrical calculator when you know the relevant circuit conditions. For a label reading such as 500 mA or 12 V, this converter is designed for the exact decimal-prefix conversion only.",
        ],
      },
      {
        title: "Reading equipment labels safely",
        paragraphs: [
          "A voltage rating, current rating and power rating describe different things. A USB supply marked 5 V and 2 A is not the same as a fixed 10 W load in every operating condition; equipment and power-delivery standards can set their own limits.",
          "For mains electricity, battery packs, chargers or high-current systems, follow the manufacturer's specification and applicable safety guidance. A numerical unit conversion does not verify electrical compatibility or safety.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Millivolt",
        symbol: "mV",
        referenceValue: "0.001 V",
        system: "SI-prefixed voltage unit",
        commonUse: "Sensors, small signals and electronics",
      },
      {
        name: "Volt",
        symbol: "V",
        referenceValue: "1 V",
        system: "SI derived unit",
        commonUse: "Device, battery and circuit voltage",
      },
      {
        name: "Kilovolt",
        symbol: "kV",
        referenceValue: "1,000 V",
        system: "SI-prefixed voltage unit",
        commonUse: "Power transmission and high-voltage equipment",
      },
      {
        name: "Milliampere",
        symbol: "mA",
        referenceValue: "0.001 A",
        system: "SI-prefixed current unit",
        commonUse: "Electronics, sensors and small devices",
      },
      {
        name: "Ampere",
        symbol: "A",
        referenceValue: "1 A",
        system: "SI base unit",
        commonUse: "Circuit current and electrical equipment ratings",
      },
      {
        name: "Kiloampere",
        symbol: "kA",
        referenceValue: "1,000 A",
        system: "SI-prefixed current unit",
        commonUse: "Large power systems and fault-current ratings",
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
  {
    locale: "en",
    slug: "torque",
    sourceSlug: "tork",
    category: "tork",
    title: "Torque Conversions",
    description:
      "Convert between newton-meters and pound-feet, and see how torque is used in engine specs, torque wrenches and bolt-tightening values.",
    introduction: [
      "Torque measures the twisting or rotational effect of a force applied at a distance from a pivot point. It is expressed as τ = F × r.",
      "The newton-meter is the SI derived unit of torque, while pound-foot is common in US-sourced automotive and engineering documents.",
    ],
    facts: [
      { label: "Physical quantity", value: "Torque (moment of force)" },
      { label: "SI unit", value: "Newton-meter" },
      { label: "SI symbol", value: "N·m" },
      { label: "Formula", value: "τ = F × r" },
      { label: "Typical use", value: "Engine torque, torque wrenches and bolt specifications" },
    ],
    sections: [
      {
        title: "What is torque?",
        paragraphs: [
          "Torque is the rotational equivalent of force: it measures how much a force applied at a distance from a pivot tends to rotate an object.",
          "One newton-meter is the torque produced by a 1-newton force applied perpendicular to a 1-meter lever arm.",
        ],
      },
      {
        title: "Newton-meter and pound-foot",
        paragraphs: [
          "One newton-meter equals about 0.737562 pound-feet. One pound-foot equals exactly 1.355818 newton-meters.",
          "Vehicle engine specifications and torque wrench settings often quote both units, since US-sourced documents typically use pound-feet.",
        ],
      },
      {
        title: "Torque versus energy",
        paragraphs: [
          "Newton-meter is dimensionally identical to the joule (kg·m²/s²), but the two express different physical quantities: joule is energy (scalar), newton-meter is torque (a vector effect).",
          "To avoid confusion, convention reserves the joule symbol for energy and newton-meter for torque — they are never used interchangeably.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "momentum",
    sourceSlug: "momentum",
    category: "momentum",
    title: "Momentum Conversions",
    description:
      "Convert between kilogram-meter per second and newton-second, and see how momentum and impulse relate in collision and propulsion analysis.",
    introduction: [
      "Momentum measures the 'quantity of motion' of an object and is calculated as mass times velocity: p = m × v.",
      "Kilogram-meter per second is the SI unit of momentum, and newton-second — the unit of impulse — is dimensionally identical to it.",
    ],
    facts: [
      { label: "Physical quantity", value: "Momentum" },
      { label: "SI unit", value: "Kilogram-meter per second" },
      { label: "SI symbol", value: "kg·m/s" },
      { label: "Formula", value: "p = m × v" },
      { label: "Typical use", value: "Collision analysis, propulsion and impact calculations" },
    ],
    sections: [
      {
        title: "What is momentum?",
        paragraphs: [
          "Momentum is a vector quantity that combines an object's mass and velocity, describing how much 'motion' it carries.",
          "A heavy, fast-moving object has more momentum than a light, slow one — this underlies collision and impact analysis.",
        ],
      },
      {
        title: "Conservation of momentum",
        paragraphs: [
          "In a closed system with no external net force, total momentum before and after a collision is equal — the foundation of collision analysis.",
          "This principle also explains rocket propulsion: expelling mass at high speed in one direction gives the rocket momentum in the other.",
        ],
      },
      {
        title: "Momentum and impulse",
        paragraphs: [
          "Impulse is the effect of a force applied over time and is measured in newton-seconds; the impulse-momentum theorem states that impulse equals the change in momentum.",
          "Because a newton equals 1 kg·m/s², one newton-second is dimensionally identical to one kilogram-meter per second, so the two units convert one-to-one.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "viscosity",
    sourceSlug: "viskozite",
    category: "viskozite_dinamik",
    title: "Viscosity Conversions",
    description:
      "Convert between pascal-seconds and centipoise, and see how dynamic viscosity is used in Reynolds number and fluid mechanics calculations.",
    introduction: [
      "Dynamic viscosity describes a fluid's internal resistance to flow — its 'thickness.' It is a key input for the Reynolds number and fluid-flow calculations.",
      "The pascal-second is the SI unit of dynamic viscosity, while centipoise is the practical unit most often used in industry.",
    ],
    facts: [
      { label: "Physical quantity", value: "Dynamic viscosity" },
      { label: "SI unit", value: "Pascal-second" },
      { label: "SI symbol", value: "Pa·s" },
      { label: "Water viscosity", value: "≈ 0.001 Pa·s (1 cP) at 20 °C" },
      { label: "Typical use", value: "Reynolds number, lubricants and process fluids" },
    ],
    sections: [
      {
        title: "What is dynamic viscosity?",
        paragraphs: [
          "Dynamic viscosity measures a fluid's resistance to shear, i.e. how hard it is to slide one layer of fluid past another.",
          "High-viscosity fluids like honey flow slowly; low-viscosity fluids like water flow easily.",
        ],
      },
      {
        title: "Pascal-second and centipoise",
        paragraphs: [
          "One pascal-second equals exactly 1,000 centipoise. Centipoise is preferred in industry because common liquids produce more readable numbers in that scale.",
          "Water at 20 °C has a viscosity of about 1 centipoise (0.001 Pa·s), which is often used as a practical reference point.",
        ],
      },
      {
        title: "Viscosity in the Reynolds number",
        paragraphs: [
          "The Reynolds number (Re = ρvD/μ) uses dynamic viscosity directly and determines whether a flow is laminar or turbulent — critical for pipe design and aerodynamics.",
          "Dynamic viscosity should not be confused with kinematic viscosity (ν = μ/ρ), which factors in the fluid's density as well.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "data-storage",
    sourceSlug: "veri",
    category: "veri",
    title: "Data Storage Conversions",
    description:
      "Convert between bits, bytes, decimal KB/MB/GB/TB and binary KiB/MiB/GiB/TiB, and understand the difference between storage and transfer figures.",
    introduction: [
      "Data storage units describe how much digital information can be stored or transmitted. They are used in software, hardware, networking and consumer devices.",
      "Storage values can be expressed with decimal prefixes such as kilobyte and gigabyte, or with binary prefixes such as kibibyte and gibibyte when exact powers of two matter.",
    ],
    facts: [
      { label: "Physical quantity group", value: "Digital information storage" },
      { label: "Base unit", value: "Byte" },
      { label: "Binary building block", value: "Bit" },
      { label: "Common prefixes", value: "kilo, mega, giga, tera and binary IEC forms" },
      { label: "Typical use", value: "Files, memory, storage devices and data transfer" },
    ],
    sections: [
      {
        title: "Bits and bytes",
        paragraphs: [
          "A bit is the smallest binary unit and can represent one of two states. A byte is the standard practical storage unit and contains exactly eight bits.",
          "The capitalization matters: b means bit and B means byte. A network speed of 100 Mb/s is 100 megabits per second, not 100 megabytes per second; before allowing for network overhead, divide by eight to express it as 12.5 MB/s.",
        ],
      },
      {
        title: "Decimal and binary prefixes",
        paragraphs: [
          "Decimal storage units scale by powers of 1,000: 1 kilobyte equals 1,000 bytes, 1 megabyte equals 1,000,000 bytes and 1 gigabyte equals 1,000,000,000 bytes.",
          "Binary IEC units scale by powers of 1,024: 1 kibibyte equals 1,024 bytes, 1 mebibyte equals 1,048,576 bytes and 1 gibibyte equals 1,073,741,824 bytes. The letter i identifies the binary form: KiB, MiB, GiB and TiB.",
        ],
      },
      {
        title: "Why a drive can appear smaller than its label",
        paragraphs: [
          "Storage manufacturers commonly label capacity with decimal units, so a 1 TB drive contains 1,000,000,000,000 bytes. Software that displays the same byte count in binary units will show about 0.909 TiB instead.",
          "This is usually a difference in the unit label rather than missing capacity. Formatting, file systems and recovery partitions can also consume usable space, so the visible amount may be lower for more than one reason.",
        ],
      },
      {
        title: "Storage size and transfer speed",
        paragraphs: [
          "Storage capacity describes how much information fits on a device. Transfer speed describes how much information can move in a given time, usually written with a slash such as MB/s or Mb/s.",
          "Use the data converter for the size itself. When estimating download time, confirm both the unit case and whether the rate is stated in bits per second or bytes per second.",
        ],
      },
      {
        title: "Where storage conversions are used",
        paragraphs: [
          "These conversions are useful when comparing disk sizes, memory specifications, file sizes, cloud quotas and network transfer totals.",
          "They help explain why software downloads, SSD labels and RAM values can appear under different figures even when the underlying byte count is the same.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Bit",
        symbol: "bit",
        referenceValue: "1 bit",
        system: "Binary information",
        commonUse: "Network rates and digital signals",
      },
      {
        name: "Byte",
        symbol: "B",
        referenceValue: "8 bit",
        system: "Digital storage",
        commonUse: "Files, memory and storage capacity",
      },
      {
        name: "Kilobyte",
        symbol: "KB",
        referenceValue: "1,000 B",
        system: "Decimal",
        commonUse: "Storage-device and file-size labels",
      },
      {
        name: "Kibibyte",
        symbol: "KiB",
        referenceValue: "1,024 B",
        system: "Binary IEC",
        commonUse: "Operating systems and technical memory values",
      },
      {
        name: "Megabyte",
        symbol: "MB",
        referenceValue: "1,000,000 B",
        system: "Decimal",
        commonUse: "Files, media and storage-device labels",
      },
      {
        name: "Mebibyte",
        symbol: "MiB",
        referenceValue: "1,048,576 B",
        system: "Binary IEC",
        commonUse: "Software and memory reporting",
      },
      {
        name: "Gigabyte",
        symbol: "GB",
        referenceValue: "1,000,000,000 B",
        system: "Decimal",
        commonUse: "Drives, cloud storage and data plans",
      },
      {
        name: "Gibibyte",
        symbol: "GiB",
        referenceValue: "1,073,741,824 B",
        system: "Binary IEC",
        commonUse: "Operating-system and memory reporting",
      },
      {
        name: "Terabyte",
        symbol: "TB",
        referenceValue: "1,000,000,000,000 B",
        system: "Decimal",
        commonUse: "Drive and cloud-storage capacity",
      },
      {
        name: "Tebibyte",
        symbol: "TiB",
        referenceValue: "1,099,511,627,776 B",
        system: "Binary IEC",
        commonUse: "Large technical storage values",
      },
    ],
  },
  {
    locale: "en",
    slug: "resistance",
    sourceSlug: "direnc",
    category: "elektrik_direnc",
    title: "Resistance Conversions",
    description:
      "Convert between ohms, kiloohms and megaohms, and review how resistance is used in circuit design and Ohm's law calculations.",
    introduction: [
      "Electrical resistance describes how strongly a material or component opposes current flow. It is a core quantity in circuit analysis.",
      "The ohm is the SI derived unit of resistance, while kiloohm and megaohm are widely used to express practical component values more clearly.",
    ],
    facts: [
      { label: "Physical quantity", value: "Electrical resistance" },
      { label: "SI unit", value: "Ohm" },
      { label: "SI symbol", value: "Ω" },
      { label: "Core relationship", value: "R = V / I" },
      { label: "Typical use", value: "Circuit design, resistor values and electrical checks" },
    ],
    sections: [
      {
        title: "What is electrical resistance?",
        paragraphs: [
          "Resistance measures how much a component limits the movement of electric charge. Higher resistance means less current for the same applied voltage.",
          "Resistors, sensors, heating elements and many semiconductor circuits depend on resistance values for proper operation.",
        ],
      },
      {
        title: "Ohms, kiloohms and megaohms",
        paragraphs: [
          "One kiloohm equals 1000 ohms, and one megaohm equals 1,000,000 ohms. These decimal prefixes make resistor and insulation values easier to read.",
          "Small signal circuits often use kiloohms, while leakage paths and insulation measurements may be discussed in megaohms.",
        ],
      },
      {
        title: "Resistance in circuit work",
        paragraphs: [
          "Resistance appears directly in Ohm's law, which links voltage, current and resistance in a simple linear circuit model.",
          "Converting resistance units helps when comparing component labels, reading schematics and checking whether a circuit is in a practical operating range.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "capacitance",
    sourceSlug: "kapasitans",
    category: "kapasitans",
    title: "Capacitance Conversions",
    description:
      "Convert between farads, millifarads, microfarads, nanofarads and picofarads, and review how capacitance is used in electronic circuits.",
    introduction: [
      "Capacitance describes the ability of a component to store electric charge and energy in an electric field. Capacitors use this property in almost every branch of electronics.",
      "The farad is the SI unit of capacitance, but real circuits often use much smaller prefixed units such as microfarads, nanofarads and picofarads.",
    ],
    facts: [
      { label: "Physical quantity", value: "Capacitance" },
      { label: "SI unit", value: "Farad" },
      { label: "SI symbol", value: "F" },
      { label: "Common practical units", value: "µF, nF and pF" },
      { label: "Typical use", value: "Filters, timing circuits, power smoothing and signal coupling" },
    ],
    sections: [
      {
        title: "What is capacitance?",
        paragraphs: [
          "Capacitance tells you how much charge is stored per unit of voltage: C = Q / V. A higher capacitance stores more charge at the same voltage.",
          "Capacitors are used to smooth supply rails, block DC, pass AC signals and create timing or resonance behavior in circuits.",
        ],
      },
      {
        title: "Farads and prefixed capacitor values",
        paragraphs: [
          "One farad is a very large unit in most electronic contexts. That is why microfarads, nanofarads and picofarads are much more common in design work.",
          "For example, electrolytic capacitors are often rated in microfarads, while small ceramic capacitors may be specified in nanofarads or picofarads.",
        ],
      },
      {
        title: "Why capacitance conversions matter",
        paragraphs: [
          "Reading component codes, comparing schematics and substituting parts often requires quick movement between capacitor units.",
          "Accurate conversion is especially helpful in filter design, signal conditioning and any circuit where timing or frequency response depends on capacitance.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "inductance",
    sourceSlug: "enduktans",
    category: "enduktans",
    title: "Inductance Conversions",
    description:
      "Convert between henries, millihenries and microhenries, and review how inductance is used in coils, filters and power electronics.",
    introduction: [
      "Inductance describes how strongly a conductor or coil resists changes in current by generating a magnetic field. It is a fundamental quantity in electromagnetics and circuit design.",
      "The henry is the SI derived unit of inductance, while millihenries and microhenries are common in practical electronics and power applications.",
    ],
    facts: [
      { label: "Physical quantity", value: "Inductance" },
      { label: "SI unit", value: "Henry" },
      { label: "SI symbol", value: "H" },
      { label: "Associated effect", value: "Magnetic energy storage and current-change resistance" },
      { label: "Typical use", value: "Coils, transformers, filters and switching circuits" },
    ],
    sections: [
      {
        title: "What is inductance?",
        paragraphs: [
          "Inductance measures how much voltage is induced when current changes over time. A larger inductance produces a stronger opposition to rapid current change.",
          "This effect is central to coils, chokes, transformers and many energy-conversion circuits.",
        ],
      },
      {
        title: "Henries, millihenries and microhenries",
        paragraphs: [
          "One millihenry equals 0.001 henry, and one microhenry equals 0.000001 henry. These scaled units are far more practical for most real inductors.",
          "Small signal and RF inductors often use microhenries, while larger coils and some filters may be expressed in millihenries.",
        ],
      },
      {
        title: "Inductance in engineering practice",
        paragraphs: [
          "Inductance values are important in filter design, switching regulators, motor drives and transformer calculations.",
          "Quick unit conversion helps when comparing datasheets, choosing replacement components and checking whether a design is using the intended order of magnitude.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "electric-charge",
    sourceSlug: "elektrik-yuku",
    category: "elektrik_yuk",
    title: "Electric Charge Conversions",
    description:
      "Convert between coulombs, millicoulombs, microcoulombs and nanocoulombs, and see how electric charge is used in batteries, capacitors and electrostatics.",
    introduction: [
      "Electric charge is one of the basic quantities in electromagnetism. It describes the amount of charge carried by particles, stored in capacitors or transferred in circuits.",
      "The coulomb is the SI unit of electric charge, while smaller prefixed forms are common in instrumentation, capacitor calculations and electrostatic examples.",
    ],
    facts: [
      { label: "Physical quantity", value: "Electric charge" },
      { label: "SI unit", value: "Coulomb" },
      { label: "SI symbol", value: "C" },
      { label: "Core relationship", value: "Q = I × t" },
      { label: "Typical use", value: "Capacitors, electrostatics and transient current calculations" },
    ],
    sections: [
      {
        title: "What is electric charge?",
        paragraphs: [
          "Electric charge is the property that causes electromagnetic interaction. In circuits, it can be treated as the quantity moved by current over time.",
          "The total transferred charge depends on both the current level and how long that current flows.",
        ],
      },
      {
        title: "Coulombs and smaller charge units",
        paragraphs: [
          "One coulomb is a large practical unit for many low-energy electronic situations, so millicoulombs, microcoulombs and nanocoulombs are often easier to use.",
          "These smaller units appear naturally in capacitor problems, sensor interfaces and electrostatic examples where absolute charge values are modest.",
        ],
      },
      {
        title: "Where charge conversions are useful",
        paragraphs: [
          "Charge conversions help when interpreting capacitor behavior, integrating current over time and comparing transient electrical effects.",
          "They also provide a bridge between current-based circuit measurements and stored-energy or pulse-based calculations.",
        ],
      },
    ],
  },
  {
    locale: "en",
    slug: "gold-karat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Gold Karat Conversions",
    description:
      "Convert between 24K, 22K, 18K and 14K gold by pure-gold content, and review how karat values are used in jewelry and material valuation.",
    introduction: [
      "Gold karat values describe the purity of a gold alloy. Higher karat means a higher proportion of pure gold in the final material.",
      "Converting between karat systems is useful when comparing jewelry, estimating pure-gold content and understanding how alloy composition affects color, strength and value.",
    ],
    facts: [
      { label: "Physical quantity group", value: "Gold purity by karat" },
      { label: "Reference purity", value: "24K = pure gold basis" },
      { label: "Purity expression", value: "Karat fraction out of 24 parts" },
      { label: "Typical use", value: "Jewelry, valuation and alloy comparison" },
      { label: "Common values", value: "24K, 22K, 18K and 14K" },
    ],
    sections: [
      {
        title: "What does karat mean?",
        paragraphs: [
          "Karat expresses how many of 24 parts are pure gold. For example, 18K means 18 parts pure gold and 6 parts alloying metals.",
          "This ratio affects not only price, but also hardness, wear resistance and visual appearance.",
        ],
      },
      {
        title: "Comparing 24K, 22K, 18K and 14K",
        paragraphs: [
          "24K represents the pure-gold reference, while 22K remains very high in gold content but includes a small alloy fraction for improved handling.",
          "18K and 14K contain less pure gold, but they are often preferred for everyday jewelry because they can be more durable and better suited to different finishes and colors.",
        ],
      },
      {
        title: "Why karat conversions matter",
        paragraphs: [
          "When a known mass is converted from one karat grade to another, the pure-gold portion stays conceptually central while the alloy proportion changes.",
          "These conversions are useful for pricing, comparing jewelry specifications and understanding what a labeled karat value means in physical gold content.",
        ],
      },
    ],

    unitTable: [
      {
        name: "24K Gold",
        symbol: "24K",
        referenceValue: "100% pure gold",
        system: "Jewelry standard",
        commonUse: "Bullion, investment gold",
      },
      {
        name: "22K Gold",
        symbol: "22K",
        referenceValue: "91.6% pure gold (22/24)",
        system: "Jewelry standard",
        commonUse: "Bangles, traditional jewelry",
      },
      {
        name: "18K Gold",
        symbol: "18K",
        referenceValue: "75% pure gold (18/24)",
        system: "Jewelry standard",
        commonUse: "Rings, necklaces, everyday jewelry",
      },
      {
        name: "14K Gold",
        symbol: "14K",
        referenceValue: "58.3% pure gold (14/24)",
        system: "Jewelry standard",
        commonUse: "Budget jewelry, US/European market",
      },
    ],
  },
  {
    locale: "en",
    slug: "silver-purity",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Silver Purity Conversions",
    description:
      "Convert between 999, 925 (sterling), 900 and 800 silver by pure-silver content, and review how millesimal fineness values are used in jewelry and silverware.",
    introduction: [
      "Silver purity is expressed as millesimal fineness: parts per thousand that are pure silver. A value of 925 means 925 out of 1000 parts are pure silver, with the remainder made up of other metals, usually copper.",
      "Converting between fineness grades is useful when comparing jewelry, estimating pure-silver content and understanding how alloy composition affects durability and value.",
    ],
    facts: [
      { label: "Physical quantity group", value: "Silver purity by millesimal fineness" },
      { label: "Reference purity", value: "999 = fine (pure) silver basis" },
      { label: "Purity expression", value: "Parts per thousand (‰)" },
      { label: "Typical use", value: "Jewelry, silverware and alloy comparison" },
      { label: "Common values", value: "999, 925, 900 and 800" },
    ],
    sections: [
      {
        title: "What does silver fineness mean?",
        paragraphs: [
          "Fineness expresses how many of 1000 parts are pure silver. For example, 925 means 925 parts pure silver and 75 parts alloying metal, almost always copper.",
          "This ratio affects hardness, tarnish resistance and how the piece is priced relative to its pure-silver content.",
        ],
      },
      {
        title: "Comparing 999, 925, 900 and 800",
        paragraphs: [
          "999 (fine silver) is the pure-silver reference and is very soft, so it is mostly used for bullion and investment pieces rather than everyday jewelry.",
          "925 (sterling silver) is the standard used worldwide for jewelry and silverware because the small copper addition makes it far more durable. 900 (coin silver) and 800 silver contain progressively less pure silver and were historically common in coinage and older European and Ottoman-era silverware.",
        ],
      },
      {
        title: "Why fineness conversions matter",
        paragraphs: [
          "When a known mass is converted from one fineness grade to another, the pure-silver portion stays conceptually central while the alloy proportion changes.",
          "These conversions are useful for pricing, comparing jewelry specifications and understanding what a stamped fineness mark means in physical silver content.",
        ],
      },
    ],

    unitTable: [
      {
        name: "Fine Silver (999)",
        symbol: "999",
        referenceValue: "99.9% pure silver",
        system: "Jewelry/bullion standard",
        commonUse: "Bullion, investment silver",
      },
      {
        name: "Sterling Silver (925)",
        symbol: "925",
        referenceValue: "92.5% pure silver",
        system: "Jewelry standard",
        commonUse: "Jewelry, rings, silverware",
      },
      {
        name: "Coin Silver (900)",
        symbol: "900",
        referenceValue: "90% pure silver",
        system: "Historical coinage standard",
        commonUse: "Pre-1965 coins, some traditional silverware",
      },
      {
        name: "800 Silver",
        symbol: "800",
        referenceValue: "80% pure silver",
        system: "European jewelry standard",
        commonUse: "Antique and traditional silver items",
      },
    ],
  },
  {
    locale: "en",
    slug: "blood-glucose",
    sourceSlug: "kan-sekeri",
    category: "kan_sekeri",
    title: "Blood Glucose Unit Conversion",
    description:
      "Convert blood glucose measurements between milligrams per deciliter (mg/dL) and millimoles per liter (mmol/L), the reporting units commonly used on laboratory and personal health records.",
    introduction: [
      "Blood glucose results may be reported in milligrams per deciliter (mg/dL) or millimoles per liter (mmol/L), depending on the laboratory, country or device.",
      "This converter changes the unit expression only. A laboratory result should be interpreted with the reference range, test context and guidance supplied by a qualified healthcare professional.",
    ],
    facts: [
      { label: "Measurement", value: "Blood glucose concentration" },
      { label: "Common conventional unit", value: "mg/dL" },
      { label: "Common SI unit", value: "mmol/L" },
      { label: "Typical source", value: "Laboratory reports and glucose meters" },
    ],
    sections: [
      {
        title: "mg/dL and mmol/L",
        paragraphs: [
          "Both units describe the same glucose concentration. Milligrams per deciliter expresses mass per volume, while millimoles per liter expresses amount of substance per volume.",
          "Use the unit printed on the report or device and convert only when a comparison requires the other reporting convention.",
        ],
      },
      {
        title: "Using a converted result safely",
        paragraphs: [
          "A unit conversion does not diagnose a condition or establish a treatment target. Timing, test method, individual history and the laboratory reference range all affect how a result is interpreted.",
          "For medical decisions or an unexpected result, follow the advice on the report and consult a qualified healthcare professional.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Milligrams per Deciliter",
        symbol: "mg/dL",
        referenceValue: "Conventional reporting unit",
        system: "Mass concentration",
        commonUse: "United States laboratory and meter reporting",
      },
      {
        name: "Millimoles per Liter",
        symbol: "mmol/L",
        referenceValue: "SI-style reporting unit",
        system: "Amount-of-substance concentration",
        commonUse: "Laboratory reporting in many countries",
      },
    ],
  },
  {
    locale: "en",
    slug: "vitamin-d",
    sourceSlug: "vitamin-d",
    category: "vitamin_d",
    title: "Vitamin D Unit Conversion",
    description:
      "Convert 25-hydroxyvitamin D measurements between nanograms per milliliter (ng/mL) and nanomoles per liter (nmol/L), the units commonly used on vitamin D laboratory reports.",
    introduction: [
      "Vitamin D laboratory reports commonly express 25-hydroxyvitamin D as nanograms per milliliter (ng/mL) or nanomoles per liter (nmol/L).",
      "This tool converts the unit only. Test method, analyte and the laboratory's reference information remain important when reading a result.",
    ],
    facts: [
      { label: "Measurement", value: "25-hydroxyvitamin D concentration" },
      { label: "Common conventional unit", value: "ng/mL" },
      { label: "Common SI unit", value: "nmol/L" },
      { label: "Typical source", value: "Vitamin D laboratory reports" },
    ],
    sections: [
      {
        title: "ng/mL and nmol/L",
        paragraphs: [
          "The two units express the same laboratory measurement using different concentration conventions. The converter applies the relationship defined for the 25-hydroxyvitamin D measurement in this tool.",
          "Keep the analyte and unit shown by the laboratory together when comparing results from different reports.",
        ],
      },
      {
        title: "Reading laboratory results",
        paragraphs: [
          "A converted number is not a diagnosis and should not be used by itself to change supplements or treatment. Laboratories can use different methods and reference information.",
          "Discuss a result or a treatment decision with a qualified healthcare professional, especially when comparing reports from different laboratories.",
        ],
      },
    ],
    unitTable: [
      {
        name: "Nanograms per Milliliter",
        symbol: "ng/mL",
        referenceValue: "Conventional reporting unit",
        system: "Mass concentration",
        commonUse: "Vitamin D laboratory reports, especially in the United States",
      },
      {
        name: "Nanomoles per Liter",
        symbol: "nmol/L",
        referenceValue: "SI-style reporting unit",
        system: "Amount-of-substance concentration",
        commonUse: "Vitamin D laboratory reporting in many countries",
      },
    ],
  },
];

type CategoryEnhancement = Pick<
  LocalizedCategoryPage,
  "unitTable"
> & {
  sections?: LocalizedCategorySection[];
};

const categoryEnhancements: Record<string, CategoryEnhancement> = {
  manyetik_alan: {
    sections: [
      { title: "Magnetic field strength and flux density", paragraphs: ["Magnetic field strength is expressed in amperes per meter, while magnetic flux density is commonly expressed in tesla. They are related but describe different quantities, so do not substitute one for the other without the material relationship that connects them.", "Field-strength units appear in electromagnet design, magnetic materials and some legacy technical documentation."] },
      { title: "Using magnetic field units", paragraphs: ["Ampere per meter is the SI-form unit for magnetic field strength. The oersted remains common in older and specialized magnetic material data.", "Check whether a specification refers to field strength, flux density or magnetization before comparing values."] },
    ],
    unitTable: [
      { name: "Ampere per Meter", symbol: "A/m", referenceValue: "SI reference unit", system: "SI", commonUse: "Magnetic field strength and electromagnets" },
      { name: "Oersted", symbol: "Oe", referenceValue: "≈ 79.5775 A/m", system: "CGS/legacy", commonUse: "Magnetic material and legacy specifications" },
    ],
  },
  manyetik_aki: {
    sections: [
      { title: "What magnetic flux measures", paragraphs: ["Magnetic flux describes the amount of magnetic field passing through a surface. It depends on field strength, surface area and the surface orientation relative to the field.", "It is used in transformers, generators, inductors and electromagnetic induction calculations."] },
      { title: "Webers and milliwebers", paragraphs: ["The weber is the SI unit of magnetic flux and is equivalent to a volt-second. Milliwebers are convenient for smaller magnetic circuits and instrument readings.", "Use the stated area and field conditions when interpreting a flux value; flux is not the same as magnetic field strength or flux density."] },
    ],
    unitTable: [
      { name: "Weber", symbol: "Wb", referenceValue: "1 Wb = 1 V·s", system: "SI derived unit", commonUse: "Transformers, generators and magnetic circuits" },
      { name: "Milliweber", symbol: "mWb", referenceValue: "1 mWb = 0.001 Wb", system: "SI prefix", commonUse: "Small magnetic circuits and instruments" },
    ],
  },
  viskozite_kinematik: {
    sections: [
      { title: "Kinematic and dynamic viscosity", paragraphs: ["Kinematic viscosity describes how readily a fluid flows under gravity and is dynamic viscosity divided by density. Dynamic viscosity measures resistance to shear directly.", "The distinction matters because the same fluid can have different density at different temperatures, changing its kinematic viscosity."] },
    ],
    unitTable: [
      { name: "Square Meter per Second", symbol: "m²/s", referenceValue: "SI reference unit", system: "SI", commonUse: "Fluid mechanics and engineering analysis" },
      { name: "Centistoke", symbol: "cSt", referenceValue: "1 cSt = 1 mm²/s", system: "Practical viscosity unit", commonUse: "Lubricants, oils and fluid specifications" },
    ],
  },
  ivme: {
    sections: [
      { title: "Acceleration units in practice", paragraphs: ["Meters per second squared is the SI unit for acceleration. Feet per second squared appears in customary engineering work, while standard gravity expresses acceleration relative to a defined reference value.", "Use g only when the context clearly means standard gravity rather than local gravitational acceleration."] },
    ],
    unitTable: [
      { name: "Meter per Second Squared", symbol: "m/s²", referenceValue: "SI reference unit", system: "SI", commonUse: "Physics, motion and engineering" },
      { name: "Foot per Second Squared", symbol: "ft/s²", referenceValue: "1 ft/s² = 0.3048 m/s²", system: "US customary", commonUse: "US engineering and motion analysis" },
      { name: "Standard Gravity", symbol: "g₀", referenceValue: "1 g = 9.80665 m/s²", system: "Defined reference", commonUse: "Aerospace and vehicle testing" },
    ],
  },
  acisal_hiz: {
    sections: [
      { title: "RPM, radians per second and degrees per second", paragraphs: ["RPM counts complete rotations over a minute and is common for motors and engines. Radians per second is the SI-form unit used in mechanics, while degrees per second is useful for orientation and motion displays.", "Convert the time basis as well as the angle basis: one revolution per minute is not the same magnitude as one revolution per second."] },
    ],
    unitTable: [
      { name: "Revolutions per Minute", symbol: "rpm", referenceValue: "≈ 0.10472 rad/s", system: "Rotational speed unit", commonUse: "Motors, engines and machinery" },
      { name: "Radian per Second", symbol: "rad/s", referenceValue: "SI reference unit", system: "SI", commonUse: "Mechanics and control systems" },
      { name: "Degree per Second", symbol: "°/s", referenceValue: "≈ 0.01745 rad/s", system: "Angular-rate unit", commonUse: "Sensors and orientation systems" },
    ],
  },
  debi: {
    unitTable: [
      { name: "Cubic Meter per Hour", symbol: "m³/h", referenceValue: "≈ 0.000277778 m³/s", system: "Metric", commonUse: "Water, HVAC and utility systems" },
      { name: "Liter per Minute", symbol: "L/min", referenceValue: "≈ 0.0000166667 m³/s", system: "Metric", commonUse: "Pumps and small circulation systems" },
    ],
  },
  yogunluk: {
    unitTable: [
      { name: "Kilogram per Cubic Meter", symbol: "kg/m³", referenceValue: "SI reference unit", system: "SI", commonUse: "Materials, fluids and engineering" },
      { name: "Gram per Cubic Centimeter", symbol: "g/cm³", referenceValue: "1 g/cm³ = 1,000 kg/m³", system: "Metric", commonUse: "Laboratory and material-property data" },
    ],
  },
  kuvvet: {
    unitTable: [
      { name: "Newton", symbol: "N", referenceValue: "1 N = 1 kg·m/s²", system: "SI derived unit", commonUse: "Mechanics and engineering" },
      { name: "Kilogram-Force", symbol: "kgf", referenceValue: "1 kgf = 9.80665 N", system: "Gravitational metric unit", commonUse: "Legacy equipment and load ratings" },
    ],
  },
  tork: {
    unitTable: [
      { name: "Newton-Meter", symbol: "N·m", referenceValue: "SI reference unit", system: "SI", commonUse: "Fasteners, motors and mechanical design" },
      { name: "Pound-Foot", symbol: "lb·ft", referenceValue: "≈ 1.355818 N·m", system: "US customary", commonUse: "Automotive and mechanical specifications" },
      { name: "Kilogram-Force Meter", symbol: "kgf·m", referenceValue: "≈ 9.80665 N·m", system: "Gravitational metric unit", commonUse: "Legacy torque specifications" },
    ],
  },
  momentum: {
    unitTable: [
      { name: "Kilogram-Meter per Second", symbol: "kg·m/s", referenceValue: "SI reference unit", system: "SI", commonUse: "Mechanics and collision analysis" },
      { name: "Newton-Second", symbol: "N·s", referenceValue: "1 N·s = 1 kg·m/s", system: "Equivalent SI expression", commonUse: "Impulse and force-time analysis" },
    ],
  },
  viskozite_dinamik: {
    unitTable: [
      { name: "Pascal-Second", symbol: "Pa·s", referenceValue: "SI reference unit", system: "SI", commonUse: "Fluid mechanics and rheology" },
      { name: "Centipoise", symbol: "cP", referenceValue: "1 cP = 0.001 Pa·s", system: "Practical viscosity unit", commonUse: "Oils, coatings and laboratory data" },
    ],
  },
  elektrik_direnc: {
    unitTable: [
      { name: "Ohm", symbol: "Ω", referenceValue: "SI reference unit", system: "SI", commonUse: "Resistors and circuit calculations" },
      { name: "Kiloohm", symbol: "kΩ", referenceValue: "1 kΩ = 1,000 Ω", system: "SI prefix", commonUse: "Electronic components" },
      { name: "Megaohm", symbol: "MΩ", referenceValue: "1 MΩ = 1,000,000 Ω", system: "SI prefix", commonUse: "High-resistance circuits and insulation tests" },
    ],
  },
  kapasitans: {
    unitTable: [
      { name: "Farad", symbol: "F", referenceValue: "SI reference unit", system: "SI", commonUse: "Capacitors and energy storage" },
      { name: "Microfarad", symbol: "µF", referenceValue: "1 µF = 0.000001 F", system: "SI prefix", commonUse: "Filters and power supplies" },
      { name: "Nanofarad", symbol: "nF", referenceValue: "1 nF = 0.000000001 F", system: "SI prefix", commonUse: "Signal and timing circuits" },
      { name: "Picofarad", symbol: "pF", referenceValue: "1 pF = 0.000000000001 F", system: "SI prefix", commonUse: "RF circuits and parasitic capacitance" },
    ],
  },
  enduktans: {
    unitTable: [
      { name: "Henry", symbol: "H", referenceValue: "SI reference unit", system: "SI", commonUse: "Inductors and magnetic circuits" },
      { name: "Millihenry", symbol: "mH", referenceValue: "1 mH = 0.001 H", system: "SI prefix", commonUse: "Power electronics and filters" },
      { name: "Microhenry", symbol: "µH", referenceValue: "1 µH = 0.000001 H", system: "SI prefix", commonUse: "RF and switching circuits" },
    ],
  },
  elektrik_yuk: {
    unitTable: [
      { name: "Coulomb", symbol: "C", referenceValue: "SI reference unit", system: "SI", commonUse: "Electrostatics and capacitor calculations" },
      { name: "Millicoulomb", symbol: "mC", referenceValue: "1 mC = 0.001 C", system: "SI prefix", commonUse: "Circuit and charge calculations" },
      { name: "Microcoulomb", symbol: "µC", referenceValue: "1 µC = 0.000001 C", system: "SI prefix", commonUse: "Electronics and electrostatics" },
      { name: "Nanocoulomb", symbol: "nC", referenceValue: "1 nC = 0.000000001 C", system: "SI prefix", commonUse: "Small charge measurements" },
    ],
  },
  kan_sekeri: {
    sections: [
      { title: "Comparing reports with different units", paragraphs: ["When comparing records, convert the value and retain the original unit, laboratory and test context. A change in unit display does not make results from different methods directly interchangeable.", "Use the converter for unit expression only and rely on a qualified healthcare professional for interpretation or treatment decisions."] },
    ],
    unitTable: [
      { name: "Milligrams per Deciliter", symbol: "mg/dL", referenceValue: "Conventional reporting unit", system: "Mass concentration", commonUse: "Laboratory and meter reports" },
      { name: "Millimoles per Liter", symbol: "mmol/L", referenceValue: "SI-style reporting unit", system: "Amount-of-substance concentration", commonUse: "Laboratory reports in many countries" },
    ],
  },
  vitamin_d: {
    sections: [
      { title: "Comparing reports with different units", paragraphs: ["When comparing results, retain the original unit, assay context and laboratory information. Converting the number does not change the test method or reference information that accompanied it.", "Use the converter for unit expression only and discuss a result or any treatment decision with a qualified healthcare professional."] },
    ],
    unitTable: [
      { name: "Nanograms per Milliliter", symbol: "ng/mL", referenceValue: "Conventional reporting unit", system: "Mass concentration", commonUse: "Vitamin D laboratory reports" },
      { name: "Nanomoles per Liter", symbol: "nmol/L", referenceValue: "SI-style reporting unit", system: "Amount-of-substance concentration", commonUse: "Vitamin D laboratory reports" },
    ],
  },
};

export const englishCategoryPages: LocalizedCategoryPage[] =
  baseEnglishCategoryPages.map((categoryPage) => {
    const enhancement = categoryEnhancements[categoryPage.category];

    if (!enhancement) {
      return categoryPage;
    }

    return {
      ...categoryPage,
      sections: enhancement.sections
        ? [...categoryPage.sections, ...enhancement.sections]
        : categoryPage.sections,
      unitTable: enhancement.unitTable ?? categoryPage.unitTable,
    };
  });

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

export function findEnglishCategoryPageByCategory(
  category: string
) {
  return englishCategoryPages.find(
    (categoryPage) => categoryPage.category === category
  );
}

export function getEnglishCategoryPathByCategory(
  category: string
) {
  const categoryPage =
    findEnglishCategoryPageByCategory(category);

  return categoryPage
    ? `/en/categories/${categoryPage.slug}`
    : `/en/categories/${category}`;
}
