import { homeCategoryOrder } from "../converter/homeCategoryOrder";

type SharedHomeCategory =
  | (typeof homeCategoryOrder)[number]
  | "yogunluk"
  | "kuvvet"
  | "debi"
  | "tork"
  | "momentum"
  | "viskozite_dinamik";

type EnglishCategoryPresentation = {
  category: SharedHomeCategory;
  homePriority: number;
  menuPriority: number;
  searchIntent: string;
  pageContext: {
    heading: string;
    paragraphs: string[];
  };
  homeCard?: { name: string; symbol: string; description: string };
};

// Turkish taxonomy remains the source of truth. This layer only decides which
// live categories are foregrounded for English-language visitors and why.
export const englishCategoryPresentation: EnglishCategoryPresentation[] = [
  { category: "uzunluk", homePriority: 1, menuPriority: 1, searchIntent: "metric and imperial length", pageContext: { heading: "Metric and imperial length in practice", paragraphs: ["Metric units are standard in most countries, while inches, feet, yards and miles remain common in US and UK-facing drawings, road distances and product specifications.", "For construction, manufacturing or fit-critical work, convert the stated unit rather than assuming that an unlabelled value is metric."] } },
  { category: "kutle", homePriority: 2, menuPriority: 2, searchIntent: "kilograms, pounds and ounces", pageContext: { heading: "Mass, pounds and everyday labels", paragraphs: ["Kilograms and grams describe mass in the metric system. Pounds and ounces are widely used in consumer, cooking and shipping contexts in the United States and elsewhere.", "In ordinary conversation, weight often means mass. In a physics calculation, distinguish mass from force and use the stated units carefully."] } },
  { category: "hacim", homePriority: 3, menuPriority: 3, searchIntent: "liters, gallons and cooking volume", pageContext: { heading: "US customary and Imperial volume", paragraphs: ["A US gallon is not an Imperial gallon, and US and Imperial pints, quarts and fluid ounces also differ. Always identify the system before converting a recipe, fuel figure or container size.", "Liters and milliliters are the clearest shared reference when comparing products across countries."] } },
  { category: "sicaklik", homePriority: 4, menuPriority: 4, searchIntent: "Celsius, Fahrenheit and Kelvin", pageContext: { heading: "Temperature scale context", paragraphs: ["Celsius is used for weather and everyday temperatures in most countries, while Fahrenheit is common in the United States. Kelvin is the absolute scale used in scientific work.", "Temperature intervals are not converted with the same offset as absolute temperatures. Use a dedicated temperature converter rather than applying a simple ratio."] } },
  { category: "zaman", homePriority: 5, menuPriority: 5, searchIntent: "seconds, minutes, hours and days", pageContext: { heading: "Durations, dates and clock time", paragraphs: ["Seconds, minutes, hours and days describe durations. Calendar dates, time zones and daylight-saving changes are separate problems and should not be inferred from a plain duration conversion.", "Use a consistent time unit before calculating a rate, pace, frequency or data-logging interval. The related tools handle age, pregnancy-week and sleep-planning contexts separately."] } },
  { category: "alan", homePriority: 6, menuPriority: 6, searchIntent: "floor area, land and square units", pageContext: { heading: "Floor area and land measurements", paragraphs: ["Square feet are common in US real estate and construction; square meters are the international metric reference. Acres and hectares are more useful for larger land areas.", "Area conversion factors are squared. Converting a length correctly and then treating it as an area will produce an incorrect result."] } },
  { category: "hiz", homePriority: 7, menuPriority: 7, searchIntent: "mph, km/h and speed", pageContext: { heading: "Road, aviation and activity speed", paragraphs: ["Miles per hour and kilometers per hour are both common road-speed units. Metres per second is often used in physics and engineering, while knots are used in aviation and marine navigation.", "Check whether a source gives speed, pace or velocity; running pace, for example, is normally expressed as time per distance rather than distance per time."] } },
  { category: "veri", homePriority: 8, menuPriority: 8, searchIntent: "data storage and file sizes", pageContext: { heading: "Decimal and binary data units", paragraphs: ["Storage manufacturers commonly use decimal prefixes: 1 GB = 1,000 MB. Operating systems and technical contexts may use binary prefixes, where 1 GiB = 1,024 MiB.", "Confirm whether a value means bit or byte as well. One byte contains eight bits, so network speeds and file sizes cannot be compared directly without conversion."] } },
  { category: "elektrik", homePriority: 9, menuPriority: 9, searchIntent: "voltage, current and electrical units", pageContext: { heading: "Electrical units and safe interpretation", paragraphs: ["Voltage, current, resistance, power and energy describe different quantities. Converting the unit does not make an electrical installation safe or determine whether a component is suitable.", "Use the calculator for estimates and unit checks. For live circuits, mains work or protection-device sizing, follow the applicable code and use a qualified professional."] } },
  { category: "basinc", homePriority: 10, menuPriority: 10, searchIntent: "psi, bar, pascal, atm and mmHg", pageContext: { heading: "Pressure units in technical work", paragraphs: ["Psi is common for tyres, HVAC equipment and US specifications; bar is widely used in industrial and European contexts; pascal is the SI unit; and mmHg remains common for blood pressure and vacuum discussions.", "A unit conversion does not tell you whether a value is gauge pressure, absolute pressure or differential pressure. Confirm the reference condition before comparing readings, selecting equipment or making a safety decision."] } },
  { category: "enerji", homePriority: 11, menuPriority: 11, searchIntent: "kWh, joules, calories, watts and kilowatts", pageContext: { heading: "Energy, power and billing units", paragraphs: ["Energy is an amount of work or heat, commonly shown in joules or kilowatt-hours. Power is the rate at which energy is used or produced, commonly shown in watts or kilowatts.", "A 2 kW appliance does not use 2 kWh unless it runs for one hour. Check the time period and tariff separately when estimating an energy bill, charging cost or fuel equivalent."] } },
  { category: "yogunluk", homePriority: 12, menuPriority: 12, searchIntent: "density, kilograms per cubic meter and grams per milliliter", homeCard: { name: "Density", symbol: "kg/m³", description: "Convert density units for materials, fluids and technical specifications." }, pageContext: { heading: "Density, mass and volume", paragraphs: ["Density relates mass to volume. Kilograms per cubic metre is the SI unit, while grams per millilitre and pounds per cubic foot are common in laboratory, material and US customary contexts.", "A material's density can change with temperature, pressure and composition. Use the stated test conditions when comparing a specification or estimating mass from volume."] } },
  { category: "kuvvet", homePriority: 13, menuPriority: 13, searchIntent: "newtons, pound-force and kilogram-force", homeCard: { name: "Force", symbol: "N", description: "Convert newtons, pound-force and other force units." }, pageContext: { heading: "Force is not mass", paragraphs: ["The newton is the SI unit of force. Pound-force and kilogram-force are force units, even though their names are often confused with units of mass in everyday language.", "Use mass and acceleration when calculating force. A force conversion alone does not account for leverage, friction, dynamic loading or a safety factor."] } },
  { category: "debi", homePriority: 14, menuPriority: 14, searchIntent: "flow rate, gallons per minute and liters per minute", homeCard: { name: "Flow Rate", symbol: "L/min", description: "Convert volumetric flow rates for pipes, pumps and process systems." }, pageContext: { heading: "Volumetric flow and operating conditions", paragraphs: ["Flow rate expresses volume per unit time, such as litres per minute or gallons per minute. It is different from mass flow rate, which also depends on density.", "For gas flow, state whether the value is measured at actual or standard conditions. Temperature and pressure can change the volume substantially."] } },
  { category: "tork", homePriority: 15, menuPriority: 15, searchIntent: "torque, newton metres and foot pounds", homeCard: { name: "Torque", symbol: "N·m", description: "Convert torque units for fasteners, motors and rotating systems." }, pageContext: { heading: "Torque, energy and fastening", paragraphs: ["Torque is a turning effect, commonly expressed in newton metres or foot-pounds. Although torque and energy can share equivalent dimensions, they describe different physical concepts.", "A specified tightening torque does not by itself guarantee bolt preload. Thread condition, lubrication, tool calibration and the manufacturer procedure all affect the result."] } },
  { category: "momentum", homePriority: 16, menuPriority: 16, searchIntent: "momentum, kilogram metre per second and impulse", homeCard: { name: "Momentum", symbol: "kg·m/s", description: "Convert linear momentum and impulse units for mechanics." }, pageContext: { heading: "Momentum and impulse", paragraphs: ["Linear momentum is mass multiplied by velocity. Impulse changes momentum and is commonly expressed in newton seconds, which is dimensionally equivalent to kilogram metres per second.", "Direction matters in momentum problems. This unit converter changes units only; it does not add vectors or determine a collision outcome."] } },
  { category: "viskozite_dinamik", homePriority: 17, menuPriority: 17, searchIntent: "dynamic viscosity, pascal seconds and centipoise", homeCard: { name: "Dynamic Viscosity", symbol: "Pa·s", description: "Convert dynamic viscosity units for fluids, oils and process work." }, pageContext: { heading: "Viscosity depends on conditions", paragraphs: ["Dynamic viscosity measures a fluid's resistance to shear. Pascal-seconds is the SI unit; poise and centipoise remain common in laboratory and industry references.", "Viscosity can vary strongly with temperature and fluid composition. Do not compare values unless their temperature and the viscosity type—dynamic or kinematic—are stated."] } },
];

function orderedCategories(key: "homePriority" | "menuPriority") {
  return englishCategoryPresentation
    .slice()
    .sort((left, right) => left[key] - right[key])
    .map((item) => item.category);
}

export const englishHomeCategoryOrder = orderedCategories("homePriority");
export const englishConversionMenuCategoryOrder = orderedCategories("menuPriority");

export function getEnglishCategoryPresentation(category: string) {
  return englishCategoryPresentation.find((item) => item.category === category);
}
