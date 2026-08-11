import type { UnitArticle } from "../../unitArticles";

export const kilometerArticle: UnitArticle = {
  slug: "kilometer",

  introduction: [
    "The kilometer is a unit of length equal to exactly 1,000 meters and is represented by the symbol km. It is commonly used for road distances, geographical measurements, transportation data and distances between cities.",
    "The kilometer is not an independent SI base unit. It is a decimal multiple of the meter formed with the SI prefix kilo. Because kilo represents a factor of 10³, one kilometer is exactly equal to 1,000 meters.",
  ],

  keyFacts: [
    {
      label: "Unit name",
      value: "Kilometer",
    },
    {
      label: "Symbol",
      value: "km",
    },
    {
      label: "Physical quantity",
      value: "Length",
    },
    {
      label: "Measurement system",
      value: "International System of Units",
    },
    {
      label: "SI prefix",
      value: "kilo (10³)",
    },
    {
      label: "Meter equivalent",
      value: "1 km = 1,000 m",
    },
    {
      label: "Mile equivalent",
      value: "1 km ≈ 0.621371 mi",
    },
    {
      label: "Nautical mile equivalent",
      value: "1 km ≈ 0.539957 nmi",
    },
  ],

  sections: [
    {
      title: "What is a kilometer?",
      paragraphs: [
        "The kilometer is a length unit used to express long distances with more readable numerical values. A road length of 250,000 meters is generally easier to understand when written as 250 kilometers.",
        "Its symbol is km. The lowercase k represents the SI prefix kilo, while the lowercase m represents the meter. Forms such as KM or Km do not follow SI symbol conventions.",
        "Kilometers are most useful for horizontal and geographical distances. Meters, centimeters or millimeters are generally more appropriate for buildings, rooms and small objects.",
      ],
    },
    {
      title: "What does the kilo prefix mean?",
      paragraphs: [
        "Kilo is an SI prefix representing a factor of 10³, or 1,000. Placing kilo before a unit indicates one thousand times that unit. One kilometer equals 1,000 meters, one kilogram equals 1,000 grams and one kilowatt equals 1,000 watts.",
        "The symbol for the prefix kilo is the lowercase letter k. The uppercase letter K is the SI symbol for the kelvin, so capitalization is important in technical writing.",
        "In the International System of Units, kilo always represents exactly 1,000. Binary prefixes such as kibi are used when a power of 1,024 must be expressed.",
      ],
    },
    {
      title: "Why is one kilometer equal to 1,000 meters?",
      paragraphs: [
        "The metric system is organized around decimal relationships. By definition, the prefix kilo represents a factor of 1,000. The relationship between kilometers and meters is therefore exact rather than experimental or approximate.",
        "To convert kilometers to meters, multiply by 1,000. To convert meters to kilometers, divide by 1,000. For example, 5 kilometers equals 5,000 meters and 750 meters equals 0.75 kilometers.",
        "This decimal relationship is simpler than many traditional unit relationships. An international mile, for example, contains 1,760 yards, while one yard contains 3 feet.",
      ],
    },
    {
      title: "History of the kilometer",
      paragraphs: [
        "The kilometer developed as part of the decimal metric system introduced during the late eighteenth century. The system was intended to replace inconsistent local measurements with a common and systematic standard.",
        "The meter became the primary unit of length. Decimal prefixes were then applied to express larger and smaller quantities. Adding the kilo prefix produced a unit equal to one thousand meters.",
        "As the metric system was adopted internationally, the kilometer became widely used in road transport, railways, surveying, cartography and geography.",
        "Some countries continue to use miles for road distances. Kilometer-to-mile conversion therefore remains common in international travel, navigation, mapping and automotive applications.",
      ],
    },
    {
      title: "Where are kilometers used?",
      paragraphs: [
        "Road distance is the most familiar application of the kilometer. Traffic signs may show the remaining distance to a city, junction, service area or destination in kilometers.",
        "Maps use kilometers to represent distances between cities, regions and geographical features. River length, coastline length, national width and road network size may also be reported in kilometers.",
        "Running, cycling, walking and motorsport events frequently describe course lengths in kilometers. Five-kilometer and ten-kilometer races are common examples.",
        "Kilometers may also be used for atmospheric altitude and regional geological measurements. Astronomical distances can be stated in kilometers, although astronomical units and light-years are often more practical.",
      ],
    },
    {
      title: "What is a kilometer marker?",
      paragraphs: [
        "A kilometer marker indicates a location along a road or the distance from an officially selected starting point. Traditional markers were made from stone or concrete, while modern systems may use signs and electronic location records.",
        "Road kilometer references are useful for maintenance, emergency response, traffic reports and location descriptions. Reporting that an event occurred at a specific kilometer point can help responders locate it quickly.",
        "The zero point does not always correspond to a city center. It may be a junction, administrative boundary or another reference selected by the responsible transportation authority.",
      ],
    },
    {
      title: "How do vehicles measure kilometers?",
      paragraphs: [
        "An odometer records the total distance traveled by a vehicle. Mechanical systems historically counted wheel or transmission rotations and calculated distance using a known circumference.",
        "Modern vehicles may use wheel-speed sensors, transmission information and electronic control systems. Tire diameter, pressure, wear and slipping can produce small differences between calculated and actual road distance.",
        "Navigation devices and mobile applications may calculate distance from successive GNSS positions. Satellite geometry, signal loss, sampling frequency and route-processing methods can influence the result.",
        "Vehicles commonly include both a total odometer and a resettable trip meter. Depending on the market and settings, these may display kilometers or miles.",
      ],
    },
    {
      title: "Straight-line distance and road distance",
      paragraphs: [
        "Distance between two locations can be calculated in several ways. Straight-line distance represents the shortest geometrical separation, while road distance follows a usable transportation route and is generally longer.",
        "Because Earth is not flat, spherical or ellipsoidal models are required for long geographical distances. Plane geometry may be adequate over short ranges but becomes less accurate over continental scales.",
        "Navigation systems also consider road networks, turn restrictions, bridges, one-way streets and transportation modes. Walking, driving and air distances between the same locations may therefore differ.",
      ],
    },
    {
      title: "Kilometer, mile and nautical mile",
      paragraphs: [
        "A kilometer is a metric unit equal to exactly 1,000 meters. One international mile is exactly 1,609.344 meters, while one international nautical mile is exactly 1,852 meters.",
        "Miles are used for road distances in several countries. Nautical miles are commonly used in marine and aviation navigation because of their historical relationship with geographic coordinates.",
        "One kilometer is approximately 0.621371 international miles and approximately 0.539957 nautical miles. One international mile is exactly 1.609344 kilometers.",
      ],
    },
    {
      title: "Difference between km, km² and km/h",
      paragraphs: [
        "The symbol km represents a unit of length. The symbol km² represents an area equal to that of a square with sides one kilometer long. One square kilometer equals one million square meters.",
        "The symbol km/h represents speed and states how many kilometers are traveled in one hour. A speed of 90 km/h means that 90 kilometers would be covered in one hour if the speed remained constant.",
        "These expressions represent different physical quantities and cannot be directly interchanged. Kilometer measures length, square kilometer measures area and kilometer per hour measures speed.",
      ],
    },
    {
      title: "How should the kilometer symbol be written?",
      paragraphs: [
        "The correct international symbol is km, with both letters lowercase. A space should normally be placed between the numerical value and the symbol, as in 25 km.",
        "Unit symbols do not take plural endings. Both one kilometer and fifty kilometers are represented with the same km symbol.",
        "Square kilometer is written km², cubic kilometer is written km³ and kilometer per hour is written km/h. These symbols represent derived quantities rather than ordinary length.",
      ],
    },
    {
      title: "Kilometer measurement uncertainty",
      paragraphs: [
        "A kilometer is exactly 1,000 meters, but a measured road or geographical distance may still have uncertainty. The uncertainty comes from the measurement method rather than from the unit relationship.",
        "Wheel circumference, route selection, map resolution, satellite positioning and the model used for Earth's shape can affect a measured distance.",
        "Technical reports should state whether a value represents straight-line distance, route distance, surveyed distance or an approximate geographical measurement.",
      ],
    },
  ],

  timeline: [
    {
      year: "Late 18th century",
      title: "Development of the metric system",
      description:
        "The meter and its decimal multiples were developed as part of a common measurement system.",
    },
    {
      year: "19th century",
      title: "International expansion",
      description:
        "The kilometer became increasingly common in roads, railways, geography and cartography.",
    },
    {
      year: "1875",
      title: "Metre Convention",
      description:
        "International cooperation in measurement standards was placed on a stronger institutional foundation.",
    },
    {
      year: "1959",
      title: "International mile standardized",
      description:
        "The international mile was defined as exactly 1,609.344 meters, establishing an exact kilometer-to-mile relationship.",
    },
    {
      year: "Present",
      title: "Global use",
      description:
        "The kilometer is one of the principal units for road and geographical distances throughout most of the world.",
    },
  ],

  questions: [
    {
      question: "How many meters are in one kilometer?",
      answer:
        "One kilometer is exactly equal to 1,000 meters. Multiply a kilometer value by 1,000 to convert it to meters.",
    },
    {
      question: "How many centimeters are in one kilometer?",
      answer:
        "One kilometer is equal to 100,000 centimeters because one kilometer contains 1,000 meters and one meter contains 100 centimeters.",
    },
    {
      question: "How many miles are in one kilometer?",
      answer:
        "One kilometer is approximately equal to 0.621371 international miles.",
    },
    {
      question: "How many kilometers are in one mile?",
      answer:
        "One international mile is exactly equal to 1.609344 kilometers.",
    },
    {
      question: "Why is a kilometer 1,000 meters?",
      answer:
        "The SI prefix kilo represents a factor of 10³, or 1,000. A kilometer is therefore exactly 1,000 meters.",
    },
    {
      question: "What is the symbol for kilometer?",
      answer:
        "The international unit symbol for the kilometer is km, with both letters written in lowercase.",
    },
    {
      question: "Is the kilometer an SI base unit?",
      answer:
        "No. The meter is the SI base unit of length. The kilometer is a decimal multiple of the meter formed with the kilo prefix.",
    },
    {
      question: "Are kilometers and square kilometers the same?",
      answer:
        "No. A kilometer measures length, while a square kilometer measures area. One square kilometer equals 1,000,000 square meters.",
    },
  ],
};