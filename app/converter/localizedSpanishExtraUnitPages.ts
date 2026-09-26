// Paginas de unidad adicionales en espanol (es y es-419).
// Amplian las 13 categorias existentes con las unidades que ya tienen
// paginas de conversion en turco, para que esas conversiones existan
// tambien en espanol. Las unidades otomanas, bizantinas y de tierra del
// sur de Asia se dejan fuera a proposito: nadie las busca en espanol.
// El simbolo y el id de la unidad salen del registro (unitRegistry).
import { unitRegistry } from "./unitRegistry";

type ExtraUnit = {
  sourceSlug: string;
  slug: string;
  name: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
  // Simbolo mostrado cuando el del registro es turco (yk, çk).
  displaySymbol?: string;
};

export const spanishCategoryNamesForUnits: Record<string, string> = {
  uzunluk: "Longitud",
  alan: "Superficie",
  hacim: "Volumen",
  kutle: "Masa",
  sicaklik: "Temperatura",
  zaman: "Tiempo",
  hiz: "Velocidad",
  basinc: "Presión",
  enerji: "Energía",
  veri: "Almacenamiento de datos",
  elektrik: "Electricidad",
  altin_ayar: "Quilate de oro",
  gumus_ayar: "Ley de la plata",
};

const METRIC = "Sistema Internacional (submúltiplo del SI)";
const METRIC_MULTIPLE = "Sistema Internacional (múltiplo del SI)";
const US = "Sistema consuetudinario de EE. UU.";
const IMPERIAL = "Sistema imperial británico";
const DECIMAL_DATA = "Informática decimal (prefijos SI)";
const BINARY_DATA = "Informática binaria (prefijos IEC)";

export const spanishExtraUnits: ExtraUnit[] = [
  // Longitud
  {
    sourceSlug: "desimetre", slug: "decimetro", name: "Decímetro",
    shortDescription: "El decímetro es la décima parte de un metro, es decir, 10 centímetros.",
    historySummary: "Forma parte del sistema métrico decimal desde su creación en Francia a finales del siglo XVIII y se usa mucho en la enseñanza.",
    measurementSystem: METRIC, siEquivalent: "1 dm = 0,1 m = 10 cm",
    commonUses: "Enseñanza escolar, reglas y cálculo de volúmenes (1 dm³ = 1 litro)",
  },
  {
    sourceSlug: "mikrometre", slug: "micrometro", name: "Micrómetro",
    shortDescription: "El micrómetro, también llamado micra, es la millonésima parte de un metro.",
    historySummary: "El término «micra» se usó durante décadas; en 1967 el SI adoptó oficialmente el nombre micrómetro (µm).",
    measurementSystem: METRIC, siEquivalent: "1 µm = 0,000001 m = 0,001 mm",
    commonUses: "Biología celular, espesor de recubrimientos, tolerancias de mecanizado y filtros",
  },
  {
    sourceSlug: "nanometre", slug: "nanometro", name: "Nanómetro",
    shortDescription: "El nanómetro equivale a una milmillonésima parte de un metro.",
    historySummary: "Se popularizó con la nanotecnología y la fabricación de chips, donde los procesos se nombran en nanómetros.",
    measurementSystem: METRIC, siEquivalent: "1 nm = 10⁻⁹ m",
    commonUses: "Longitud de onda de la luz, semiconductores y nanotecnología",
  },
  {
    sourceSlug: "pikometre", slug: "picometro", name: "Picómetro",
    shortDescription: "El picómetro es una billonésima parte de un metro (10⁻¹² m).",
    historySummary: "Es útil a escala atómica: el radio de la mayoría de los átomos se sitúa entre 30 y 300 picómetros.",
    measurementSystem: METRIC, siEquivalent: "1 pm = 10⁻¹² m",
    commonUses: "Radios atómicos, longitudes de enlace químico y cristalografía",
  },
  {
    sourceSlug: "angstrom", slug: "angstrom", name: "Ángstrom",
    shortDescription: "El ángstrom equivale a 10⁻¹⁰ metros, una décima de nanómetro.",
    historySummary: "Lleva el nombre del físico sueco Anders Jonas Ångström, que lo usó en el siglo XIX para medir longitudes de onda de la luz.",
    measurementSystem: "Unidad fuera del SI, aceptada en ciencia", siEquivalent: "1 Å = 10⁻¹⁰ m = 0,1 nm",
    commonUses: "Cristalografía, química estructural y espectroscopía",
  },
  {
    sourceSlug: "furlong", slug: "furlong", name: "Furlong",
    shortDescription: "El furlong es una unidad anglosajona de longitud equivalente a 220 yardas.",
    historySummary: "Su nombre viene de la longitud de un surco en un campo arado. Hoy sobrevive sobre todo en las carreras de caballos.",
    measurementSystem: IMPERIAL, siEquivalent: "1 furlong = 201,168 m",
    commonUses: "Carreras de caballos en el Reino Unido, Irlanda y EE. UU.",
  },
  {
    sourceSlug: "fathom", slug: "braza", name: "Braza",
    shortDescription: "La braza (fathom) es una unidad náutica de profundidad igual a 6 pies.",
    historySummary: "Procede de la distancia entre las puntas de los dedos con los brazos extendidos, usada tradicionalmente por los marineros.",
    measurementSystem: IMPERIAL, siEquivalent: "1 braza = 1,8288 m",
    commonUses: "Profundidad del agua en cartas náuticas antiguas y pesca",
  },
  {
    sourceSlug: "deniz-mili", slug: "milla-nautica", name: "Milla náutica",
    shortDescription: "La milla náutica mide exactamente 1.852 metros y se usa en navegación marítima y aérea.",
    historySummary: "Se basa en un minuto de arco de latitud terrestre; su valor de 1.852 m se fijó internacionalmente en 1929.",
    measurementSystem: "Unidad fuera del SI, aceptada para navegación", siEquivalent: "1 milla náutica = 1.852 m",
    commonUses: "Navegación, aviación y límites de aguas territoriales",
  },
  {
    sourceSlug: "astronomik-birim", slug: "unidad-astronomica", name: "Unidad astronómica",
    shortDescription: "La unidad astronómica es aproximadamente la distancia media entre la Tierra y el Sol.",
    historySummary: "En 2012 la Unión Astronómica Internacional la fijó en exactamente 149.597.870.700 metros.",
    measurementSystem: "Unidad astronómica aceptada con el SI", siEquivalent: "1 ua = 149.597.870.700 m",
    commonUses: "Distancias dentro del sistema solar",
  },
  {
    sourceSlug: "isik-yili", slug: "ano-luz", name: "Año luz",
    shortDescription: "El año luz es la distancia que recorre la luz en el vacío durante un año juliano.",
    historySummary: "A pesar de su nombre no es una unidad de tiempo; se calcula con 365,25 días y la velocidad de la luz.",
    measurementSystem: "Unidad astronómica fuera del SI", siEquivalent: "1 año luz ≈ 9,4607 × 10¹⁵ m",
    commonUses: "Distancias a estrellas y galaxias en divulgación científica",
  },
  {
    sourceSlug: "parsek", slug: "parsec", name: "Pársec",
    shortDescription: "El pársec equivale a unos 3,26 años luz y es la unidad preferida por los astrónomos.",
    historySummary: "Su nombre combina «paralaje» y «segundo»: es la distancia a la que 1 ua subtiende un segundo de arco.",
    measurementSystem: "Unidad astronómica fuera del SI", siEquivalent: "1 pc ≈ 3,0857 × 10¹⁶ m",
    commonUses: "Astronomía profesional y distancias estelares",
  },

  // Masa
  {
    sourceSlug: "grain", slug: "grano", name: "Grano",
    shortDescription: "El grano es la unidad de masa más pequeña del sistema anglosajón, 1/7.000 de libra.",
    historySummary: "Se basaba originalmente en el peso de un grano de cereal y se mantiene en farmacia, balística y tiro.",
    measurementSystem: "Sistema anglosajón (avoirdupois y troy)", siEquivalent: "1 grano = 64,79891 mg",
    commonUses: "Peso de balas y pólvora, algunas dosis farmacéuticas",
  },
  {
    sourceSlug: "karat", slug: "quilate-metrico", name: "Quilate (masa)",
    shortDescription: "El quilate métrico es la unidad de masa de las piedras preciosas y equivale a 200 mg.",
    historySummary: "Su nombre procede de la semilla del algarrobo; se estandarizó en 200 mg a principios del siglo XX.",
    measurementSystem: "Unidad métrica de joyería", siEquivalent: "1 ct = 0,2 g",
    commonUses: "Diamantes, esmeraldas y otras gemas (no confundir con el quilate del oro)",
  },
  {
    sourceSlug: "troy-ons", slug: "onza-troy", name: "Onza troy",
    shortDescription: "La onza troy es la unidad estándar para cotizar el oro, la plata y otros metales preciosos.",
    historySummary: "Procede de la ciudad francesa de Troyes y sigue siendo la referencia de los mercados de metales preciosos.",
    measurementSystem: "Sistema troy", siEquivalent: "1 oz t = 31,1034768 g",
    commonUses: "Precio del oro y la plata, lingotes y monedas de inversión",
  },
  {
    sourceSlug: "stone", slug: "stone", name: "Stone",
    shortDescription: "El stone es una unidad británica de masa igual a 14 libras.",
    historySummary: "Se usó durante siglos en el comercio inglés; hoy se emplea sobre todo para expresar el peso corporal en el Reino Unido.",
    measurementSystem: IMPERIAL, siEquivalent: "1 st = 6,35029318 kg",
    commonUses: "Peso corporal en el Reino Unido e Irlanda",
  },
  {
    sourceSlug: "kental", slug: "quintal-metrico", name: "Quintal métrico",
    shortDescription: "El quintal métrico equivale a 100 kilogramos.",
    historySummary: "El quintal tradicional variaba según la región; el quintal métrico lo fijó en 100 kg con el sistema métrico.",
    measurementSystem: "Unidad métrica tradicional", siEquivalent: "1 q = 100 kg",
    commonUses: "Producción agrícola, cereales y comercio de granos",
  },
  {
    sourceSlug: "dalton", slug: "dalton", name: "Dalton",
    shortDescription: "El dalton (unidad de masa atómica) es la doceava parte de la masa de un átomo de carbono-12.",
    historySummary: "Lleva el nombre de John Dalton, pionero de la teoría atómica. También se conoce como uma o u.",
    measurementSystem: "Unidad aceptada con el SI", siEquivalent: "1 Da ≈ 1,66054 × 10⁻²⁷ kg",
    commonUses: "Masa de átomos, moléculas y proteínas",
  },

  // Volumen
  {
    sourceSlug: "santimetrekup", slug: "centimetro-cubico", name: "Centímetro cúbico",
    shortDescription: "El centímetro cúbico es el volumen de un cubo de 1 cm de lado y equivale a 1 mililitro.",
    historySummary: "Su abreviatura «cc» es muy común en medicina y en la cilindrada de los motores.",
    measurementSystem: METRIC, siEquivalent: "1 cm³ = 1 mL = 10⁻⁶ m³",
    commonUses: "Cilindrada de motos y coches, jeringas y dosis médicas",
  },
  {
    sourceSlug: "inckup", slug: "pulgada-cubica", name: "Pulgada cúbica",
    shortDescription: "La pulgada cúbica es el volumen de un cubo de una pulgada de lado.",
    historySummary: "En EE. UU. se usó tradicionalmente para indicar la cilindrada de los motores (por ejemplo, un V8 de 350 in³).",
    measurementSystem: US, siEquivalent: "1 in³ = 16,387064 cm³",
    commonUses: "Cilindrada de motores estadounidenses y volúmenes pequeños",
  },
  {
    sourceSlug: "fitkup", slug: "pie-cubico", name: "Pie cúbico",
    shortDescription: "El pie cúbico es el volumen de un cubo de un pie de lado, unos 28,3 litros.",
    historySummary: "Es habitual en EE. UU. para expresar la capacidad de frigoríficos, el gas natural y el caudal de aire (CFM).",
    measurementSystem: US, siEquivalent: "1 ft³ = 28,316846592 L",
    commonUses: "Capacidad de refrigeradores, gas natural y ventilación",
  },
  {
    sourceSlug: "varil", slug: "barril-de-petroleo", name: "Barril de petróleo",
    shortDescription: "El barril de petróleo equivale a 42 galones estadounidenses, unos 159 litros.",
    historySummary: "Se estandarizó en Pensilvania en la década de 1860 y hoy es la unidad de referencia del mercado petrolero mundial.",
    measurementSystem: US, siEquivalent: "1 bbl = 158,987294928 L",
    commonUses: "Producción y precio del petróleo crudo",
  },
  {
    sourceSlug: "ingiliz-galonu", slug: "galon-imperial", name: "Galón imperial",
    shortDescription: "El galón imperial británico equivale a 4,54609 litros, más que el galón estadounidense.",
    historySummary: "Se definió en 1824 en el Reino Unido como el volumen de 10 libras de agua a una temperatura determinada.",
    measurementSystem: IMPERIAL, siEquivalent: "1 gal imp = 4,54609 L",
    commonUses: "Consumo de combustible en el Reino Unido y recetas británicas",
  },
  {
    sourceSlug: "quart", slug: "cuarto-de-galon", name: "Cuarto de galón (US)",
    shortDescription: "El cuarto de galón estadounidense (quart) es la cuarta parte de un galón, casi un litro.",
    historySummary: "Su nombre en inglés, quart, significa literalmente «cuarto». Es común en envases de leche y aceite en EE. UU.",
    measurementSystem: US, siEquivalent: "1 qt = 0,946352946 L",
    commonUses: "Leche, aceite de motor y recetas estadounidenses",
  },
  {
    sourceSlug: "ingiliz-quart", slug: "cuarto-de-galon-imperial", name: "Cuarto de galón imperial",
    shortDescription: "El cuarto de galón imperial es la cuarta parte del galón británico, unos 1,14 litros.",
    historySummary: "Es mayor que el cuarto estadounidense porque procede del galón imperial de 1824.",
    measurementSystem: IMPERIAL, siEquivalent: "1 qt imp = 1,1365225 L",
    commonUses: "Recetas y envases británicos antiguos",
  },
  {
    sourceSlug: "pint", slug: "pinta", name: "Pinta (US)",
    shortDescription: "La pinta estadounidense equivale a 16 onzas líquidas, unos 473 mililitros.",
    historySummary: "Es la mitad de un cuarto de galón. En EE. UU. se usa para bebidas, helados y recetas.",
    measurementSystem: US, siEquivalent: "1 pt = 473,176473 mL",
    commonUses: "Cerveza, helado y recetas estadounidenses",
  },
  {
    sourceSlug: "ingiliz-pint", slug: "pinta-imperial", name: "Pinta imperial",
    shortDescription: "La pinta imperial británica equivale a 20 onzas líquidas imperiales, unos 568 mililitros.",
    historySummary: "Es la medida legal de la cerveza de barril en los pubs del Reino Unido.",
    measurementSystem: IMPERIAL, siEquivalent: "1 pt imp = 568,26125 mL",
    commonUses: "Cerveza en pubs británicos y leche en el Reino Unido",
  },
  {
    sourceSlug: "sivi-ons", slug: "onza-liquida", name: "Onza líquida (US)",
    shortDescription: "La onza líquida estadounidense es una unidad de volumen de unos 29,57 mililitros.",
    historySummary: "No debe confundirse con la onza de masa. Aparece en etiquetas de bebidas y cosméticos de EE. UU.",
    measurementSystem: US, siEquivalent: "1 fl oz = 29,5735295625 mL",
    commonUses: "Etiquetas de bebidas, biberones, perfumes y cosméticos",
  },
  {
    sourceSlug: "ingiliz-sivi-ons", slug: "onza-liquida-imperial", name: "Onza líquida imperial",
    shortDescription: "La onza líquida imperial británica equivale a unos 28,41 mililitros.",
    historySummary: "Es un poco menor que la onza líquida estadounidense; 20 de ellas forman una pinta imperial.",
    measurementSystem: IMPERIAL, siEquivalent: "1 fl oz imp = 28,4130625 mL",
    commonUses: "Recetas británicas y medidas de bar",
  },
  {
    sourceSlug: "bushel", slug: "bushel", name: "Bushel (US)",
    shortDescription: "El bushel estadounidense es una unidad de volumen para granos, de unos 35,2 litros.",
    historySummary: "Los precios de cereales como el trigo, el maíz y la soja se cotizan en bushels en la bolsa de Chicago.",
    measurementSystem: US, siEquivalent: "1 bu = 35,23907016688 L",
    commonUses: "Comercio de granos y precios agrícolas internacionales",
  },
  {
    sourceSlug: "peck", slug: "peck", name: "Peck (US)",
    shortDescription: "El peck estadounidense es la cuarta parte de un bushel, unos 8,8 litros.",
    historySummary: "Se usaba para vender frutas y verduras a granel y sobrevive en mercados agrícolas de EE. UU.",
    measurementSystem: US, siEquivalent: "1 pk = 8,809767994375 L",
    commonUses: "Venta de manzanas, tomates y productos agrícolas",
  },
  {
    sourceSlug: "yemek-kasigi", slug: "cucharada", name: "Cucharada", displaySymbol: "cda",
    shortDescription: "La cucharada es una medida de cocina; aquí se toma como 15 mililitros.",
    historySummary: "La cucharada métrica de 15 mL es la referencia más habitual en recetas en español.",
    measurementSystem: "Medida de cocina (métrica)", siEquivalent: "1 cucharada = 15 mL",
    commonUses: "Recetas de cocina y repostería",
  },
  {
    sourceSlug: "cay-kasigi", slug: "cucharadita", name: "Cucharadita", displaySymbol: "cdta",
    shortDescription: "La cucharadita es una medida de cocina de 5 mililitros, un tercio de cucharada.",
    historySummary: "Se usa para cantidades pequeñas de sal, levadura, especias o medicamentos líquidos.",
    measurementSystem: "Medida de cocina (métrica)", siEquivalent: "1 cucharadita = 5 mL",
    commonUses: "Especias, levadura y dosis de jarabes",
  },

  // Superficie
  {
    sourceSlug: "milimetrekare", slug: "milimetro-cuadrado", name: "Milímetro cuadrado",
    shortDescription: "El milímetro cuadrado es la superficie de un cuadrado de 1 mm de lado.",
    historySummary: "Es la unidad con la que se indica la sección de los cables eléctricos (por ejemplo, 2,5 mm²).",
    measurementSystem: METRIC, siEquivalent: "1 mm² = 10⁻⁶ m²",
    commonUses: "Sección de cables, piezas pequeñas y sensores de cámara",
  },
  {
    sourceSlug: "santimetrekare", slug: "centimetro-cuadrado", name: "Centímetro cuadrado",
    shortDescription: "El centímetro cuadrado es la superficie de un cuadrado de 1 cm de lado.",
    historySummary: "Resulta práctico para superficies pequeñas, como una etiqueta o la pantalla de un reloj.",
    measurementSystem: METRIC, siEquivalent: "1 cm² = 0,0001 m²",
    commonUses: "Superficies pequeñas, dibujo técnico y papelería",
  },
  {
    sourceSlug: "kilometrekare", slug: "kilometro-cuadrado", name: "Kilómetro cuadrado",
    shortDescription: "El kilómetro cuadrado es la superficie de un cuadrado de 1 km de lado, igual a 100 hectáreas.",
    historySummary: "Es la unidad habitual para expresar la superficie de países, provincias y ciudades.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 km² = 1.000.000 m² = 100 ha",
    commonUses: "Superficie de países, ciudades, lagos y parques naturales",
  },
  {
    sourceSlug: "ar", slug: "area", name: "Área",
    shortDescription: "El área es una unidad métrica de superficie igual a 100 metros cuadrados.",
    historySummary: "Fue la unidad base de superficie del sistema métrico original; la hectárea es su múltiplo más usado.",
    measurementSystem: "Unidad métrica aceptada con el SI", siEquivalent: "1 a = 100 m²",
    commonUses: "Catastro, parcelas pequeñas y huertos",
  },
  {
    sourceSlug: "incare", slug: "pulgada-cuadrada", name: "Pulgada cuadrada",
    shortDescription: "La pulgada cuadrada es la superficie de un cuadrado de una pulgada de lado.",
    historySummary: "Aparece en la unidad de presión psi (libras por pulgada cuadrada) y en planos estadounidenses.",
    measurementSystem: US, siEquivalent: "1 in² = 6,4516 cm²",
    commonUses: "Planos técnicos estadounidenses y piezas pequeñas",
  },
  {
    sourceSlug: "fitkare", slug: "pie-cuadrado", name: "Pie cuadrado",
    shortDescription: "El pie cuadrado es la superficie de un cuadrado de un pie de lado, unos 0,093 m².",
    historySummary: "Es la unidad estándar del mercado inmobiliario en EE. UU. y aparece en anuncios de viviendas.",
    measurementSystem: US, siEquivalent: "1 ft² = 0,09290304 m²",
    commonUses: "Superficie de viviendas y oficinas en EE. UU.",
  },
  {
    sourceSlug: "yardakare", slug: "yarda-cuadrada", name: "Yarda cuadrada",
    shortDescription: "La yarda cuadrada es la superficie de un cuadrado de una yarda de lado, unos 0,84 m².",
    historySummary: "Se utiliza en EE. UU. y el Reino Unido para alfombras, césped artificial y telas.",
    measurementSystem: US, siEquivalent: "1 yd² = 0,83612736 m²",
    commonUses: "Alfombras, moquetas, césped y textiles",
  },

  // Presion
  {
    sourceSlug: "hektopascal", slug: "hectopascal", name: "Hectopascal",
    shortDescription: "El hectopascal equivale a 100 pascales y es la unidad de la presión atmosférica en meteorología.",
    historySummary: "Sustituyó al milibar en los partes meteorológicos; ambos tienen exactamente el mismo valor.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 hPa = 100 Pa = 1 mbar",
    commonUses: "Mapas del tiempo, barómetros y aviación",
  },
  {
    sourceSlug: "milibar", slug: "milibar", name: "Milibar",
    shortDescription: "El milibar es la milésima parte de un bar y equivale a un hectopascal.",
    historySummary: "Fue la unidad clásica de la meteorología durante el siglo XX, antes de generalizarse el hectopascal.",
    measurementSystem: "Unidad métrica fuera del SI", siEquivalent: "1 mbar = 100 Pa",
    commonUses: "Meteorología, sensores de presión y buceo",
  },
  {
    sourceSlug: "kilopascal", slug: "kilopascal", name: "Kilopascal",
    shortDescription: "El kilopascal equivale a 1.000 pascales.",
    historySummary: "Es un múltiplo práctico del pascal y aparece en neumáticos, climatización e ingeniería.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 kPa = 1.000 Pa",
    commonUses: "Presión de neumáticos, climatización y resistencia de materiales",
  },
  {
    sourceSlug: "megapascal", slug: "megapascal", name: "Megapascal",
    shortDescription: "El megapascal equivale a un millón de pascales y se usa para presiones y tensiones altas.",
    historySummary: "En ingeniería, 1 MPa equivale a 1 N/mm², por lo que se usa para la resistencia del hormigón y el acero.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 MPa = 1.000.000 Pa = 10 bar",
    commonUses: "Resistencia del hormigón, hidráulica y ensayos de materiales",
  },
  {
    sourceSlug: "milimetre-civa", slug: "milimetro-de-mercurio", name: "Milímetro de mercurio",
    shortDescription: "El milímetro de mercurio (mmHg) es la presión que ejerce una columna de mercurio de 1 mm.",
    historySummary: "Nació con el barómetro de Torricelli en el siglo XVII y sigue siendo la unidad de la tensión arterial.",
    measurementSystem: "Unidad fuera del SI, aceptada en medicina", siEquivalent: "1 mmHg ≈ 133,322 Pa",
    commonUses: "Tensión arterial, medicina y vacío en laboratorio",
  },
  {
    sourceSlug: "torr", slug: "torr", name: "Torr",
    shortDescription: "El torr es 1/760 de una atmósfera estándar, prácticamente igual a un mmHg.",
    historySummary: "Recibe su nombre de Evangelista Torricelli, inventor del barómetro de mercurio.",
    measurementSystem: "Unidad fuera del SI", siEquivalent: "1 Torr ≈ 133,322 Pa",
    commonUses: "Tecnología de vacío y física de laboratorio",
  },
  {
    sourceSlug: "milimetre-su-sutunu", slug: "milimetro-de-columna-de-agua", name: "Milímetro de columna de agua",
    shortDescription: "El milímetro de columna de agua (mmH₂O) mide presiones muy pequeñas.",
    historySummary: "Se basa en la altura de una columna de agua y es habitual en ventilación y medidas de tiro de chimeneas.",
    measurementSystem: "Unidad técnica fuera del SI", siEquivalent: "1 mmH₂O = 9,80665 Pa",
    commonUses: "Ventilación, filtros, conductos de aire y calderas",
  },
  {
    sourceSlug: "kilogram-kuvvet-santimetrekare", slug: "kilogramo-fuerza-por-centimetro-cuadrado", name: "Kilogramo-fuerza por centímetro cuadrado",
    shortDescription: "El kgf/cm² es una unidad técnica de presión casi igual a un bar.",
    historySummary: "Muy usada en la industria y en manómetros antiguos, en muchos talleres se sigue llamando simplemente «kilos».",
    measurementSystem: "Sistema técnico de unidades", siEquivalent: "1 kgf/cm² = 98.066,5 Pa",
    commonUses: "Manómetros industriales, compresores e hidráulica",
  },
  {
    sourceSlug: "teknik-atmosfer", slug: "atmosfera-tecnica", name: "Atmósfera técnica",
    shortDescription: "La atmósfera técnica (at) equivale a 1 kgf/cm², algo menos que la atmósfera estándar.",
    historySummary: "Se usó en Europa continental en calderas y máquinas de vapor antes de la adopción del SI.",
    measurementSystem: "Sistema técnico de unidades", siEquivalent: "1 at = 98.066,5 Pa",
    commonUses: "Documentación técnica antigua y calderas",
  },

  // Energia
  {
    sourceSlug: "kilojoule", slug: "kilojulio", name: "Kilojulio",
    shortDescription: "El kilojulio equivale a 1.000 julios.",
    historySummary: "En las etiquetas nutricionales europeas la energía se indica en kJ junto a las kilocalorías.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 kJ = 1.000 J",
    commonUses: "Etiquetas nutricionales, física y termodinámica",
  },
  {
    sourceSlug: "megajoule", slug: "megajulio", name: "Megajulio",
    shortDescription: "El megajulio equivale a un millón de julios.",
    historySummary: "Es cómodo para expresar el poder calorífico de combustibles y la energía de procesos industriales.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 MJ = 1.000.000 J ≈ 0,2778 kWh",
    commonUses: "Poder calorífico de combustibles e industria",
  },
  {
    sourceSlug: "kilokalori", slug: "kilocaloria", name: "Kilocaloría",
    shortDescription: "La kilocaloría equivale a 1.000 calorías; es la «caloría» de las dietas y los alimentos.",
    historySummary: "En nutrición se escribe a menudo «Caloría» con mayúscula para referirse a la kilocaloría.",
    measurementSystem: "Unidad fuera del SI", siEquivalent: "1 kcal = 4.184 J",
    commonUses: "Etiquetas de alimentos, dietas y gasto energético",
  },
  {
    sourceSlug: "watt-saat", slug: "vatio-hora", name: "Vatio-hora",
    shortDescription: "El vatio-hora es la energía que consume un aparato de 1 vatio durante una hora.",
    historySummary: "Se usa para expresar la capacidad de baterías de móviles, portátiles y bicicletas eléctricas.",
    measurementSystem: "Unidad aceptada con el SI", siEquivalent: "1 Wh = 3.600 J",
    commonUses: "Baterías, powerbanks y pequeños consumos eléctricos",
  },
  {
    sourceSlug: "therm", slug: "therm", name: "Therm",
    shortDescription: "El therm equivale a 100.000 BTU y se usa para facturar gas natural.",
    historySummary: "Es habitual en las facturas de gas de EE. UU. y del Reino Unido.",
    measurementSystem: US, siEquivalent: "1 therm ≈ 105,506 MJ",
    commonUses: "Facturas de gas natural en EE. UU. y Reino Unido",
  },
  {
    sourceSlug: "elektronvolt", slug: "electronvoltio", name: "Electronvoltio",
    shortDescription: "El electronvoltio es la energía que gana un electrón al atravesar una diferencia de potencial de 1 voltio.",
    historySummary: "Es la unidad natural de la física atómica y de partículas; los aceleradores se miden en GeV y TeV.",
    measurementSystem: "Unidad aceptada con el SI", siEquivalent: "1 eV = 1,602176634 × 10⁻¹⁹ J",
    commonUses: "Física de partículas, química cuántica y semiconductores",
  },

  // Velocidad
  {
    sourceSlug: "santimetre-saniye", slug: "centimetro-por-segundo", name: "Centímetro por segundo",
    shortDescription: "El centímetro por segundo mide velocidades lentas.",
    historySummary: "Fue la unidad de velocidad del antiguo sistema CGS, usado en física hasta mediados del siglo XX.",
    measurementSystem: "Sistema CGS", siEquivalent: "1 cm/s = 0,01 m/s",
    commonUses: "Laboratorio, flujos lentos y movimientos biológicos",
  },
  {
    sourceSlug: "metre-dakika", slug: "metro-por-minuto", name: "Metro por minuto",
    shortDescription: "El metro por minuto indica cuántos metros se recorren en un minuto.",
    historySummary: "Es práctico para cintas transportadoras, ascensores y velocidades de corte en máquinas.",
    measurementSystem: "Unidad derivada del SI", siEquivalent: "1 m/min ≈ 0,016667 m/s",
    commonUses: "Cintas transportadoras, ascensores y mecanizado",
  },
  {
    sourceSlug: "kilometre-dakika", slug: "kilometro-por-minuto", name: "Kilómetro por minuto",
    shortDescription: "El kilómetro por minuto indica cuántos kilómetros se recorren en un minuto.",
    historySummary: "Se usa para velocidades altas, como las de aviones o trenes, cuando conviene una escala en minutos.",
    measurementSystem: "Unidad derivada del SI", siEquivalent: "1 km/min ≈ 16,667 m/s = 60 km/h",
    commonUses: "Aviación y comparaciones de velocidad",
  },
  {
    sourceSlug: "kilometre-saniye", slug: "kilometro-por-segundo", name: "Kilómetro por segundo",
    shortDescription: "El kilómetro por segundo se usa para velocidades muy altas, como las de naves espaciales.",
    historySummary: "La Tierra orbita el Sol a unos 30 km/s; la velocidad de escape terrestre es de unos 11,2 km/s.",
    measurementSystem: "Unidad derivada del SI", siEquivalent: "1 km/s = 1.000 m/s",
    commonUses: "Astronomía, satélites y cohetes",
  },
  {
    sourceSlug: "fit-saniye", slug: "pie-por-segundo", name: "Pie por segundo",
    shortDescription: "El pie por segundo es una unidad anglosajona de velocidad.",
    historySummary: "Es habitual en ingeniería estadounidense y en balística para la velocidad de salida de los proyectiles.",
    measurementSystem: US, siEquivalent: "1 ft/s = 0,3048 m/s",
    commonUses: "Balística, hidráulica e ingeniería en EE. UU.",
  },
  {
    sourceSlug: "isik-hizi", slug: "velocidad-de-la-luz", name: "Velocidad de la luz",
    shortDescription: "La velocidad de la luz en el vacío (c) es la máxima velocidad posible en el universo.",
    historySummary: "Su valor es exacto por definición desde 1983 y sirve de base para definir el metro.",
    measurementSystem: "Constante física", siEquivalent: "c = 299.792.458 m/s",
    commonUses: "Física, astronomía y relatividad",
  },

  // Tiempo
  {
    sourceSlug: "milisaniye", slug: "milisegundo", name: "Milisegundo",
    shortDescription: "El milisegundo es la milésima parte de un segundo.",
    historySummary: "Es la escala de la latencia de red, los tiempos de reacción y la cronometría deportiva.",
    measurementSystem: METRIC, siEquivalent: "1 ms = 0,001 s",
    commonUses: "Latencia de internet, videojuegos, audio y cronometraje",
  },

  // Almacenamiento de datos
  {
    sourceSlug: "bit", slug: "bit", name: "Bit",
    shortDescription: "El bit es la unidad mínima de información: un 0 o un 1.",
    historySummary: "El término, contracción de «binary digit», lo popularizó Claude Shannon en 1948.",
    measurementSystem: "Unidad básica de información", siEquivalent: "1 bit = 1/8 byte",
    commonUses: "Velocidad de conexión, criptografía y teoría de la información",
  },
  {
    sourceSlug: "kilobit", slug: "kilobit", name: "Kilobit",
    shortDescription: "El kilobit equivale a 1.000 bits.",
    historySummary: "Se usó mucho en la época de los módems, con velocidades de 56 kbit/s.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 kbit = 1.000 bits = 125 bytes",
    commonUses: "Velocidad de audio digital y conexiones lentas",
  },
  {
    sourceSlug: "megabit", slug: "megabit", name: "Megabit",
    shortDescription: "El megabit equivale a un millón de bits y es la unidad de la velocidad de internet (Mbps).",
    historySummary: "Una conexión de 100 Mbps descarga como máximo unos 12,5 megabytes por segundo, porque 1 byte = 8 bits.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 Mbit = 1.000.000 bits = 125.000 bytes",
    commonUses: "Velocidad de fibra, ADSL y datos móviles",
  },
  {
    sourceSlug: "gigabit", slug: "gigabit", name: "Gigabit",
    shortDescription: "El gigabit equivale a mil millones de bits.",
    historySummary: "Las conexiones de fibra de 1 Gbps y las redes Ethernet gigabit lo han convertido en una unidad cotidiana.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 Gbit = 10⁹ bits = 125 MB",
    commonUses: "Fibra óptica, redes locales y centros de datos",
  },
  {
    sourceSlug: "terabit", slug: "terabit", name: "Terabit",
    shortDescription: "El terabit equivale a un billón (10¹²) de bits.",
    historySummary: "Se usa para la capacidad de los cables submarinos y de las redes troncales de internet.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 Tbit = 10¹² bits = 125 GB",
    commonUses: "Redes troncales y cables submarinos",
  },
  {
    sourceSlug: "kibibit", slug: "kibibit", name: "Kibibit",
    shortDescription: "El kibibit equivale a 1.024 bits (prefijo binario).",
    historySummary: "La norma IEC creó en 1998 los prefijos binarios (kibi, mebi, gibi) para evitar la confusión con los decimales.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 Kibit = 1.024 bits",
    commonUses: "Documentación técnica y memoria",
  },
  {
    sourceSlug: "mebibit", slug: "mebibit", name: "Mebibit",
    shortDescription: "El mebibit equivale a 1.048.576 bits (2²⁰).",
    historySummary: "Es la versión binaria del megabit y aparece en especificaciones de chips de memoria.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 Mibit = 1.048.576 bits",
    commonUses: "Chips de memoria y documentación técnica",
  },
  {
    sourceSlug: "gibibit", slug: "gibibit", name: "Gibibit",
    shortDescription: "El gibibit equivale a 2³⁰ bits, unos 1.074 millones.",
    historySummary: "Es la versión binaria del gigabit, usada en memorias DRAM.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 Gibit = 1.073.741.824 bits",
    commonUses: "Módulos de memoria y especificaciones de hardware",
  },
  {
    sourceSlug: "tebibit", slug: "tebibit", name: "Tebibit",
    shortDescription: "El tebibit equivale a 2⁴⁰ bits.",
    historySummary: "Completa la serie de prefijos binarios de la IEC para grandes cantidades de datos.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 Tibit = 1.099.511.627.776 bits",
    commonUses: "Documentación técnica de redes y almacenamiento",
  },
  {
    sourceSlug: "kilobayt", slug: "kilobyte", name: "Kilobyte",
    shortDescription: "El kilobyte equivale a 1.000 bytes.",
    historySummary: "Durante años se usó también con el valor de 1.024 bytes; hoy ese valor se llama kibibyte (KiB).",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 KB = 1.000 bytes",
    commonUses: "Documentos de texto, correos y archivos pequeños",
  },
  {
    sourceSlug: "terabayt", slug: "terabyte", name: "Terabyte",
    shortDescription: "El terabyte equivale a un billón (10¹²) de bytes, es decir, 1.000 gigabytes.",
    historySummary: "Los discos duros domésticos superaron el terabyte en 2007 y hoy es la capacidad habitual de discos y SSD.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 TB = 1.000 GB = 10¹² bytes",
    commonUses: "Discos duros, SSD, copias de seguridad y nube",
  },
  {
    sourceSlug: "petabayt", slug: "petabyte", name: "Petabyte",
    shortDescription: "El petabyte equivale a 1.000 terabytes.",
    historySummary: "Es la escala de los grandes centros de datos, archivos científicos y plataformas de vídeo.",
    measurementSystem: DECIMAL_DATA, siEquivalent: "1 PB = 1.000 TB = 10¹⁵ bytes",
    commonUses: "Centros de datos, big data y archivos científicos",
  },
  {
    sourceSlug: "kibibayt", slug: "kibibyte", name: "Kibibyte",
    shortDescription: "El kibibyte equivale a 1.024 bytes.",
    historySummary: "Es el valor que muchos sistemas operativos siguen mostrando como «KB».",
    measurementSystem: BINARY_DATA, siEquivalent: "1 KiB = 1.024 bytes",
    commonUses: "Tamaño de archivos en sistemas operativos y memoria",
  },
  {
    sourceSlug: "mebibayt", slug: "mebibyte", name: "Mebibyte",
    shortDescription: "El mebibyte equivale a 1.048.576 bytes (1.024 KiB).",
    historySummary: "Explica por qué un archivo de «100 MB» puede aparecer con un tamaño algo menor en algunos sistemas.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 MiB = 1.048.576 bytes",
    commonUses: "Memoria RAM, sistemas operativos y programación",
  },
  {
    sourceSlug: "gibibayt", slug: "gibibyte", name: "Gibibyte",
    shortDescription: "El gibibyte equivale a 1.073.741.824 bytes (1.024 MiB).",
    historySummary: "Un disco vendido como 500 GB aparece como unos 465 GiB en el sistema operativo por esta diferencia.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 GiB = 1.073.741.824 bytes",
    commonUses: "Memoria RAM, capacidad real de discos y máquinas virtuales",
  },
  {
    sourceSlug: "tebibayt", slug: "tebibyte", name: "Tebibyte",
    shortDescription: "El tebibyte equivale a 2⁴⁰ bytes, unos 1,1 billones de bytes.",
    historySummary: "Un disco de 1 TB muestra aproximadamente 0,91 TiB en el sistema operativo.",
    measurementSystem: BINARY_DATA, siEquivalent: "1 TiB = 1.099.511.627.776 bytes",
    commonUses: "Servidores, almacenamiento en red y discos grandes",
  },

  // Electricidad
  {
    sourceSlug: "milivolt", slug: "milivoltio", name: "Milivoltio",
    shortDescription: "El milivoltio es la milésima parte de un voltio.",
    historySummary: "Es la escala de las señales de sensores, termopares y de la actividad eléctrica del corazón.",
    measurementSystem: METRIC, siEquivalent: "1 mV = 0,001 V",
    commonUses: "Sensores, electrocardiogramas y electrónica",
  },
  {
    sourceSlug: "kilovolt", slug: "kilovoltio", name: "Kilovoltio",
    shortDescription: "El kilovoltio equivale a 1.000 voltios.",
    historySummary: "Las redes de distribución eléctrica funcionan a decenas de kV y las de transporte a cientos de kV.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 kV = 1.000 V",
    commonUses: "Líneas de alta tensión, subestaciones y rayos X",
  },
  {
    sourceSlug: "kiloamper", slug: "kiloamperio", name: "Kiloamperio",
    shortDescription: "El kiloamperio equivale a 1.000 amperios.",
    historySummary: "Se usa para corrientes muy altas, como las de cortocircuito o las de un rayo.",
    measurementSystem: METRIC_MULTIPLE, siEquivalent: "1 kA = 1.000 A",
    commonUses: "Corrientes de cortocircuito, soldadura industrial y rayos",
  },

  // Quilate de oro y ley de la plata
  {
    sourceSlug: "14-ayar-altin", slug: "oro-14-quilates", name: "Oro de 14 quilates",
    shortDescription: "El oro de 14 quilates contiene 14 partes de oro puro de 24, es decir, un 58,3 %.",
    historySummary: "Es muy común en joyería estadounidense; se marca también como 585.",
    measurementSystem: "Sistema de quilates", siEquivalent: "58,3 % de oro fino",
    commonUses: "Anillos, cadenas y joyería de uso diario",
  },
  {
    sourceSlug: "900-ayar-gumus", slug: "plata-900", name: "Plata 900",
    shortDescription: "La plata 900 contiene un 90 % de plata pura.",
    historySummary: "Fue la ley habitual de muchas monedas de plata de los siglos XIX y XX.",
    measurementSystem: "Ley en milésimas", siEquivalent: "90 % de plata fina",
    commonUses: "Monedas antiguas y joyería",
  },
  {
    sourceSlug: "800-ayar-gumus", slug: "plata-800", name: "Plata 800",
    shortDescription: "La plata 800 contiene un 80 % de plata pura.",
    historySummary: "Fue común en la cubertería y la platería europea, sobre todo en Alemania e Italia.",
    measurementSystem: "Ley en milésimas", siEquivalent: "80 % de plata fina",
    commonUses: "Cubertería, objetos decorativos y joyería antigua",
  },

  // Temperatura
  {
    sourceSlug: "rankine", slug: "rankine", name: "Rankine",
    shortDescription: "La escala Rankine es una escala absoluta con grados del mismo tamaño que los Fahrenheit.",
    historySummary: "La propuso el ingeniero escocés William Rankine en 1859; 0 °R es el cero absoluto.",
    measurementSystem: "Escala termodinámica anglosajona", siEquivalent: "T(°R) = T(K) × 9/5",
    commonUses: "Termodinámica e ingeniería en EE. UU.",
  },
  {
    sourceSlug: "reaumur", slug: "reaumur", name: "Réaumur",
    shortDescription: "En la escala Réaumur el agua se congela a 0 °Ré y hierve a 80 °Ré.",
    historySummary: "La creó René-Antoine Ferchault de Réaumur en 1730 y se usó en Europa hasta el siglo XIX.",
    measurementSystem: "Escala histórica", siEquivalent: "T(°Ré) = T(°C) × 4/5",
    commonUses: "Textos históricos y elaboración tradicional de queso",
  },
];

export type SpanishExtraUnitPage = {
  // Las paginas es-419 tambien usan locale "es" (igual que las existentes).
  locale: "es";
  sourceSlug: string;
  slug: string;
  category: string;
  categoryName: string;
  unit: string;
  name: string;
  symbol: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

// Vocabulario latinoamericano donde difiere del de Espana.
const latamReplacements: Array<[RegExp, string]> = [
  [/\bcoches\b/g, "autos"],
  [/\bcoche\b/g, "auto"],
  [/\bmóviles\b/g, "celulares"],
  [/\bmóvil\b/g, "celular"],
  [/\bordenadores\b/g, "computadoras"],
  [/\bordenador\b/g, "computadora"],
  [/\bfrigoríficos\b/g, "refrigeradores"],
  [/\bportátiles\b/g, "laptops"],
  [/\bmoquetas\b/g, "tapetes"],
];

function toLatam(text: string) {
  return latamReplacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

export function buildSpanishExtraUnitPages(variant: "es" | "es-419"): SpanishExtraUnitPage[] {
  return spanishExtraUnits.flatMap((unit) => {
    const entry = unitRegistry.find((candidate) => candidate.tr?.slug === unit.sourceSlug);
    if (!entry) return [];
    const text = variant === "es-419" ? toLatam : (value: string) => value;
    return [{
      locale: "es" as const,
      sourceSlug: unit.sourceSlug,
      slug: unit.slug,
      category: entry.category,
      categoryName: spanishCategoryNamesForUnits[entry.category] ?? entry.category,
      unit: entry.symbol,
      name: unit.name,
      symbol: unit.displaySymbol ?? entry.displaySymbol ?? entry.symbol,
      shortDescription: text(unit.shortDescription),
      historySummary: text(unit.historySummary),
      measurementSystem: unit.measurementSystem,
      siEquivalent: unit.siEquivalent,
      commonUses: text(unit.commonUses),
    }];
  });
}
