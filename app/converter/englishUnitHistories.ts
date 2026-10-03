// Short, verifiable English history notes for unit pages. Units without an entry here and
// without a hand-written history show no "Short history" section rather than filler text.
// Regional land and trade units whose size varies by place (bigha, katha, arshin, batman…)
// are intentionally left out.

const SI_PREFIX: Record<string, string> = {
  centi: "The prefix centi- (one hundredth, from Latin centum) was part of the original French metric system of 1795",
  deci: "The prefix deci- (one tenth, from Latin decimus) was part of the original French metric system of 1795",
  milli: "The prefix milli- (one thousandth, from Latin mille) was part of the original French metric system of 1795",
  hecto: "The prefix hecto- (one hundred, from Greek hekaton) was part of the original French metric system of 1795",
  kilo: "The prefix kilo- (one thousand, from Greek chilioi) was part of the original French metric system of 1795",
  mega: "The prefix mega- (one million, from Greek megas, great) was formally adopted with the SI in 1960",
  micro: "The prefix micro- (one millionth, from Greek mikros, small) was formally adopted with the SI in 1960",
  nano: "The prefix nano- (one billionth, from Greek nanos, dwarf) was adopted with the SI in 1960",
  pico: "The prefix pico- (one trillionth) was adopted with the SI in 1960",
};

const prefixed = (prefix: keyof typeof SI_PREFIX, base: string, extra: string) =>
  `${SI_PREFIX[prefix]}; the ${base} ${extra.replace(/\.$/, "")}.`;

const BINARY_PREFIX =
  "Binary prefixes such as kibi- (1,024), mebi- and gibi- were introduced by the IEC in 1998 so that powers of two would no longer be confused with the decimal SI prefixes kilo-, mega- and giga-.";
const DECIMAL_DATA =
  "It uses a decimal SI prefix (kilo = 1,000, mega = 1,000,000). Storage makers and network speeds use these decimal values, while some operating systems report sizes in binary units (KiB, MiB), which is why a drive can look smaller than its label.";

export const ENGLISH_UNIT_HISTORY: Record<string, string> = {
  // Length
  centimeter: prefixed("centi", "centimeter", "is one hundredth of a meter."),
  decimeter: prefixed("deci", "decimeter", "is one tenth of a meter; a cubic decimeter is exactly one liter."),
  micrometer: prefixed("micro", "micrometer", "(often called a micron) is used for cell sizes, fiber diameters and machining tolerances."),
  nanometer: prefixed("nano", "nanometer", "is the usual unit for light wavelengths and semiconductor feature sizes."),
  picometer: prefixed("pico", "picometer", "is used for atomic radii and bond lengths."),
  furlong:
    "Furlong comes from Old English furh lang, the length of a furrow in a common field. It was standardized as 220 yards, one-eighth of a mile, and today survives mainly in horse racing.",
  "nautical-mile":
    "The nautical mile was originally one minute of arc of latitude, which made it convenient for navigation with charts. The International Hydrographic Conference fixed it at exactly 1,852 meters in 1929.",
  "astronomical-unit":
    "The astronomical unit began as the mean Earth–Sun distance used to scale the solar system. In 2012 the International Astronomical Union fixed it at exactly 149,597,870,700 meters.",
  "light-year":
    "The light-year — the distance light travels in vacuum in one Julian year of 365.25 days — came into use in the 19th century to express the distances to stars. It is about 9.46 trillion kilometers.",
  parsec:
    "Parsec is short for 'parallax of one arcsecond', a term coined by astronomer Herbert Hall Turner in 1913. It is the distance at which one astronomical unit spans one arcsecond, about 3.26 light-years.",
  angstrom:
    "Named after Swedish physicist Anders Jonas Ångström, who used 10⁻¹⁰ meters to tabulate the wavelengths of sunlight in the 1860s. It is not an SI unit but remains common in crystallography and spectroscopy.",
  fathom:
    "The fathom originally measured the span of a person's outstretched arms. Fixed at 6 feet (1.8288 m), it has long been used for water depth on nautical charts.",
  // Area
  "square-centimeter": prefixed("centi", "square centimeter", "is the area of a square 1 cm on each side."),
  "square-millimeter": prefixed("milli", "square millimeter", "is the usual unit for wire and cable cross-sections."),
  "square-kilometer": prefixed("kilo", "square kilometer", "is the usual unit for the area of cities, regions and countries."),
  are: "The are (100 m²) was one of the original units of the French metric system of 1795. Today it is used mostly through its multiple, the hectare.",
  hectare:
    "The hectare (100 ares, 10,000 m²) dates from the French metric system of 1795. It is not an SI unit but is accepted for use with the SI and is the standard unit for farmland and land area in most countries.",
  decare:
    "The decare (10 ares, 1,000 m²) is used for farmland in Türkiye, the Balkans and parts of the Middle East, where it matches the modern dönüm.",
  donum:
    "The dönüm (dunam) comes from the Ottoman land measure, originally the area that could be ploughed in a day, so its size once varied by region. Today it is 1,000 m² in Türkiye, Israel, Palestine and Jordan.",
  acre: "The acre was originally the area a team of oxen could plough in a day. It was standardized as 4,840 square yards; since the 1959 international yard agreement one acre is 4,046.8564224 m².",
  "square-inch": "The square inch follows from the international inch of exactly 25.4 mm (1959), so 1 in² is exactly 6.4516 cm².",
  "square-yard": "The square yard follows from the international yard of exactly 0.9144 m (1959), so 1 yd² is exactly 0.83612736 m².",
  tsubo: "The tsubo is a traditional Japanese area unit equal to two tatami mats, about 3.306 m². It is still widely used for real estate and floor space in Japan.",
  feddan: "The feddan is the traditional land unit of Egypt and Sudan, about 4,200 m² (1.04 acres). It is divided into 24 qirat.",
  "qirat-land": "In Egyptian land measurement one qirat is 1/24 of a feddan, about 175 m².",
  "sahm-land": "In Egyptian land measurement one sahm is 1/24 of a qirat, or 1/576 of a feddan.",
  guntha: "In Maharashtra, Karnataka and neighboring Indian states one guntha is 1/40 of an acre, about 101.17 m², and is common in land records.",
  "cent-land": "In South India one cent is 1/100 of an acre, about 40.47 m², and is the usual unit for house plots in Kerala and Tamil Nadu.",
  "decimal-land": "In Bangladesh and West Bengal one decimal (shatak) is 1/100 of an acre, about 40.47 m², and is widely used in land deeds.",
  ground: "The ground is a land unit used in Chennai and parts of Tamil Nadu, equal to 2,400 square feet (about 223 m²).",
  // Volume
  liter:
    "The liter was introduced in France in 1795 as one cubic decimeter. From 1901 to 1964 it was defined by the mass of water, which made it slightly larger; since 1964 it is again exactly one cubic decimeter.",
  deciliter: prefixed("deci", "deciliter", "is common in European recipes and medical test results."),
  centiliter: prefixed("centi", "centiliter", "is used for drinks and bottle sizes in Europe."),
  "cubic-centimeter": prefixed("centi", "cubic centimeter", "equals one milliliter and is the usual unit for engine displacement (cc)."),
  "cubic-foot": "The cubic foot follows from the international foot of exactly 0.3048 m (1959), so 1 ft³ is about 28.317 liters.",
  "cubic-inch": "The cubic inch follows from the international inch of exactly 25.4 mm (1959), so 1 in³ is exactly 16.387064 cm³. The US gallon is defined as exactly 231 cubic inches.",
  gallon:
    "The US liquid gallon descends from the English wine gallon of 231 cubic inches, which the United States kept after Britain introduced the larger imperial gallon in 1824. It equals 3.785411784 liters.",
  quart: "The US quart is one quarter of a US gallon, 57.75 cubic inches or about 946 ml.",
  pint: "The US pint is one eighth of a US gallon, about 473 ml, and is divided into 16 US fluid ounces.",
  "fluid-ounce": "The US fluid ounce is 1/128 of a US gallon, about 29.57 ml; it is the usual unit for drinks and nutrition labels in the United States.",
  "imperial-gallon":
    "The imperial gallon was introduced by the British Weights and Measures Act of 1824, originally defined as the volume of 10 pounds of water. Today it is exactly 4.54609 liters.",
  "imperial-quart": "The imperial quart is one quarter of an imperial gallon, about 1.137 liters.",
  "imperial-pint": "The imperial pint is one eighth of an imperial gallon, about 568 ml. It is still the legal measure for draught beer and cider in the UK and Ireland.",
  "imperial-fluid-ounce": "The imperial fluid ounce is 1/160 of an imperial gallon, about 28.41 ml — slightly smaller than the US fluid ounce.",
  bushel:
    "The US bushel is the Winchester bushel of 2,150.42 cubic inches, an English grain measure dating back to the 15th century. It is used for grain and produce, often converted to weight per crop.",
  peck: "The peck is one quarter of a bushel, 537.6 cubic inches in the US system, historically used for dry goods such as apples and potatoes.",
  barrel:
    "The 42-US-gallon oil barrel was adopted by Pennsylvania oil producers in the 1860s and became the standard unit of the petroleum industry. It equals about 158.99 liters.",
  tablespoon:
    "Metric spoons of 15 ml and 5 ml are used in the UK, Europe, Canada and on nutrition labels. US customary spoons are slightly smaller: 14.79 ml for a tablespoon and 4.93 ml for a teaspoon.",
  teaspoon:
    "Metric spoons of 15 ml and 5 ml are used in the UK, Europe, Canada and on nutrition labels. US customary spoons are slightly smaller: 14.79 ml for a tablespoon and 4.93 ml for a teaspoon.",
  "turkish-water-glass": "The Turkish su bardağı (water glass) is the standard cup measure in Turkish recipes and is taken as 200 ml.",
  // Mass
  tonne: "The tonne of 1,000 kilograms comes from the French metric system and is accepted for use with the SI. In the United States it is called the metric ton.",
  quintal: "In its metric form the quintal is 100 kg. It is still used for grain and other agricultural produce in parts of Europe and Latin America.",
  stone: "The stone of 14 pounds (6.35 kg) was standardized in Britain in the 19th century and is still used in the UK and Ireland for body weight.",
  grain:
    "The grain originated as the mass of a single cereal seed. It is the one unit shared by the avoirdupois, troy and apothecaries' systems and is defined as exactly 64.79891 mg; it is still used for bullets, arrows and medicines.",
  dalton:
    "Named after chemist John Dalton, the dalton (unified atomic mass unit) is one twelfth of the mass of a carbon-12 atom, about 1.66 × 10⁻²⁷ kg. It is the standard unit for atomic and molecular masses.",
  "troy-ounce": "The troy ounce of 31.1034768 g, named after the medieval market town of Troyes in France, is the standard unit for pricing gold, silver and platinum.",
  carat: "The carat takes its name from the carob seed once used to weigh gems. The metric carat of exactly 200 mg was adopted internationally in 1907.",
  // Time, pressure, energy, power, temperature
  millisecond: prefixed("milli", "millisecond", "is used for reaction times, network latency and audio timing."),
  megapascal: prefixed("mega", "megapascal", "is the usual unit for material strength and hydraulic pressure."),
  hectopascal:
    "The hectopascal equals the millibar. Meteorology adopted it in the late 20th century because it keeps weather-map values unchanged: standard sea-level pressure is 1013.25 hPa.",
  millibar: "The millibar, one thousandth of a bar, was the standard unit on weather maps for most of the 20th century. One millibar equals one hectopascal.",
  atmosphere: "The standard atmosphere was defined by the General Conference on Weights and Measures in 1954 as exactly 101,325 Pa, close to average air pressure at sea level.",
  "technical-atmosphere": "The technical atmosphere is one kilogram-force per square centimeter (98.0665 kPa), a pre-SI engineering unit once common on European pressure gauges.",
  "millimeter-of-water": "A millimeter of water is the pressure of a 1 mm column of water. It is used for small pressures in ventilation, chimneys and gas installations.",
  torr: "Named after Evangelista Torricelli, who invented the mercury barometer in 1643, the torr is defined as 1/760 of a standard atmosphere. It is common in vacuum technology.",
  megajoule: prefixed("mega", "megajoule", "is used for fuel energy content and large-scale energy balances."),
  "ton-of-refrigeration":
    "The ton of refrigeration is based on the heat absorbed when one short ton of ice melts in 24 hours, about 3.517 kW. It is still used to rate air-conditioning systems in the United States and Asia.",
  therm: "The therm is 100,000 BTU. Gas utilities in the United States and the UK have long used it to bill natural gas.",
  "quad-btu": "A quad is one quadrillion (10¹⁵) BTU. The US Energy Information Administration uses it for national and world energy statistics.",
  electronvolt:
    "The electronvolt is the energy an electron gains when it crosses a potential difference of one volt, about 1.602 × 10⁻¹⁹ joules. It is the everyday unit of atomic, nuclear and particle physics.",
  "btu-per-hour": "BTU per hour is the usual rating for heaters and air conditioners in North America; 12,000 BTU/h equals one ton of refrigeration.",
  rankine:
    "The Rankine scale was proposed by Scottish engineer William Rankine in 1859. It is an absolute scale with Fahrenheit-sized degrees, so 0 °R is absolute zero; it is still used in some US engineering work.",
  reaumur:
    "The Réaumur scale was introduced by French scientist René Antoine Ferchault de Réaumur in 1730, with water freezing at 0° and boiling at 80°. Once common in Europe, it is now rarely used outside some cheese and sugar making.",
  // Electricity
  ohm: "The ohm is named after German physicist Georg Simon Ohm, who published the law relating voltage, current and resistance in 1827.",
  kiloohm: prefixed("kilo", "kiloohm", "is the usual unit on resistor color codes and data sheets."),
  megaohm: prefixed("mega", "megaohm", "is used for insulation resistance tests and high-value resistors."),
  farad: "The farad is named after English scientist Michael Faraday, whose experiments in the 1830s laid the groundwork for capacitors and electromagnetism.",
  millifarad: prefixed("milli", "millifarad", "appears on large electrolytic capacitors and supercapacitors."),
  microfarad: prefixed("micro", "microfarad", "is the most common unit on electrolytic and film capacitors (marked µF or uF)."),
  nanofarad: prefixed("nano", "nanofarad", "is common on ceramic and film capacitors."),
  picofarad: prefixed("pico", "picofarad", "is used for small ceramic capacitors in radio and high-frequency circuits."),
  henry: "The henry is named after American physicist Joseph Henry, who discovered self-inductance in the early 1830s.",
  millihenry: prefixed("milli", "millihenry", "is typical for chokes and filter inductors."),
  microhenry: prefixed("micro", "microhenry", "is typical for small inductors in switching power supplies and radio circuits."),
  coulomb: "The coulomb is named after French physicist Charles-Augustin de Coulomb, who formulated the law of electrostatic force in 1785.",
  millicoulomb: prefixed("milli", "millicoulomb", "is used for small charges in electrostatics and battery testing."),
  microcoulomb: prefixed("micro", "microcoulomb", "is used for charges in electrostatics problems and sensors."),
  nanocoulomb: prefixed("nano", "nanocoulomb", "is used for very small electrostatic charges."),
  // Data
  bit: "Bit is short for binary digit. The word was popularized by Claude Shannon's 1948 paper on information theory, which credited statistician John Tukey with coining it.",
  byte: "The term byte was coined by Werner Buchholz in 1956 while designing IBM's Stretch computer. The 8-bit byte became standard with the IBM System/360 in 1964.",
  kibibit: BINARY_PREFIX,
  mebibit: BINARY_PREFIX,
  gibibit: BINARY_PREFIX,
  tebibit: BINARY_PREFIX,
  kibibyte: BINARY_PREFIX,
  mebibyte: BINARY_PREFIX,
  gibibyte: BINARY_PREFIX,
  tebibyte: BINARY_PREFIX,
  kilobit: DECIMAL_DATA,
  megabit: DECIMAL_DATA,
  gigabit: DECIMAL_DATA,
  terabit: DECIMAL_DATA,
  kilobyte: DECIMAL_DATA,
  megabyte: DECIMAL_DATA,
  gigabyte: DECIMAL_DATA,
  terabyte: DECIMAL_DATA,
  petabyte: DECIMAL_DATA,
  // Silver
  "fine-silver": "Fine silver is 99.9% pure and stamped 999. It is mainly used for bullion bars and coins because it is too soft for most jewelry.",
  "sterling-silver": "Sterling silver is 92.5% silver, stamped 925. It has been the British standard for silver for centuries and is the most common alloy for jewelry and silverware.",
  "coin-silver": "Coin silver is 90% silver, stamped 900. The United States used it for dimes, quarters and half dollars until 1964.",
  "800-silver": "800 silver (80% silver) was widely used for silverware and jewelry in Germany, Italy and other parts of continental Europe.",
  // Medical units
  "millimoles-per-liter": "Millimoles per liter is the SI unit for blood glucose used in most of the world; 1 mmol/L of glucose equals about 18 mg/dL.",
  "milligrams-per-deciliter": "Milligrams per deciliter is the traditional unit for blood glucose, still standard in the United States and several other countries; 18 mg/dL equals about 1 mmol/L.",
  "nanomoles-per-liter": "Nanomoles per liter is the SI unit for vitamin D (25-hydroxyvitamin D) results used in the UK, Europe and Australia; 2.5 nmol/L equals 1 ng/mL.",
  "nanograms-per-milliliter": "Nanograms per milliliter is the unit for vitamin D results in the United States and many other countries; 1 ng/mL equals 2.5 nmol/L.",
};

const FILLER =
  /became (established as )?a practical|became widely used as digital|became standard as electrical|became common through the growth|belongs to the millesimal fineness system/;

/** Curated history if available; otherwise the existing text unless it is generic filler. */
export function englishUnitHistory(slug: string, current: string): string {
  return ENGLISH_UNIT_HISTORY[slug] ?? (FILLER.test(current) ? "" : current);
}
