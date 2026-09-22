// Páginas de categoría en español latinoamericano — integradas en el sistema i18n.
// Archivo independiente (no modifica los archivos existentes de
// tr/en/de/ar/uz/bn/fr).
//
// Alcance limitado deliberadamente a los 17 elementos que forman la
// identidad del sitio (13 categorías fundamentales + 4 herramientas
// universales en la página de inicio), sin calculadoras científicas
// ni cotidianas. Contenido traducido con la misma profundidad que los
// artículos fuente en TR (app/converter/categoryArticles.ts y
// app/converter/articles/*/Article.ts).

export type LocalizedSpanishCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedSpanishCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedSpanishCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedSpanishCategoryPage = {
  locale: "es";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedSpanishCategoryFact[];
  sections: LocalizedSpanishCategorySection[];
  unitTable: LocalizedSpanishCategoryUnitRow[];
};

export const es419CategoryPages: LocalizedSpanishCategoryPage[] = [
  {
    locale: "es",
    slug: "longitud",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversión de unidades de longitud",
    description:
      "Convierte metros, kilómetros, centímetros, millas y pies; consulta fórmulas y tablas de referencia.",
    introduction: [
      "La longitud es una magnitud física fundamental que describe altura, ancho, grosor o distancia entre dos puntos. Un mismo objeto puede tener varias longitudes según la dirección medida.",
      "En física se representa con el símbolo dimensional L. De ella se derivan magnitudes como superficie, volumen, velocidad, aceleración, presión y densidad.",
      "La unidad básica del Sistema Internacional de Unidades (SI) es el metro (m). Según la escala se usan nanómetro, micrómetro, milímetro, centímetro, metro o kilómetro. Pulgada, pie, yarda y milla siguen siendo habituales en Estados Unidos y el Reino Unido.",
    ],
    facts: [
      { label: "Unidad básica del SI", value: "Metro" },
      { label: "Símbolo de la unidad SI", value: "m" },
      { label: "Magnitud física", value: "Longitud" },
      { label: "Símbolo dimensional", value: "L" },
      { label: "Definición actual del metro", value: "Distancia recorrida por la luz en el vacío durante 1/299.792.458 de segundo" },
    ],
    sections: [
      {
        title: "¿Qué es la longitud?",
        paragraphs: [
          "La longitud describe altura, ancho, profundidad o distancia entre dos puntos. Es una de las magnitudes físicas fundamentales y un mismo objeto puede tener valores diferentes según la dirección medida.",
          "En física se representa con L. Superficie, volumen, velocidad, aceleración, presión y densidad son magnitudes que se definen a partir de esta dimensión.",
        ],
      },
      {
        title: "La unidad del SI para la longitud",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad básica de longitud es el metro, con símbolo m. Sirve de referencia para las demás unidades de longitud.",
          "Kilómetro, centímetro, milímetro, micrómetro y nanómetro se relacionan con el metro mediante múltiplos y submúltiplos decimales. Esto permite convertirlas con potencias de diez.",
        ],
      },
      {
        title: "La definición científica del metro",
        paragraphs: [
          "En el pasado, el metro se definía a partir de dimensiones de la Tierra y patrones físicos. Los avances de medición exigieron una definición estable y reproducible en cualquier lugar.",
          "Hoy, un metro es la longitud que recorre la luz en el vacío durante 1/299.792.458 de segundo. La definición fija exactamente la velocidad de la luz en 299.792.458 metros por segundo.",
        ],
      },
      {
        title: "Las unidades métricas de longitud",
        paragraphs: [
          "En el sistema métrico, las unidades se relacionan con el metro mediante potencias de diez. Un kilómetro equivale a 1.000 metros, un centímetro a 0,01 metros y un milímetro a 0,001 metros.",
          "Para longitudes muy pequeñas se usan micrómetro, nanómetro y picómetro. Las células suelen medirse en micrómetros, las longitudes de onda en nanómetros y algunas distancias atómicas en picómetros.",
        ],
      },
      {
        title: "Unidades de longitud fuera del sistema métrico",
        paragraphs: [
          "Pulgada, pie, yarda y milla terrestre son unidades anglosajonas usadas sobre todo en Estados Unidos y en ciertos contextos británicos.",
          "Una pulgada equivale exactamente a 2,54 centímetros; un pie, a 12 pulgadas; una yarda, a 3 pies; y una milla terrestre, a 1.609,344 metros.",
        ],
      },
      {
        title: "Longitud en navegación marítima y aérea",
        paragraphs: [
          "En navegación marítima y aérea, las distancias se expresan normalmente en millas náuticas. Una milla náutica equivale exactamente a 1.852 metros.",
          "La milla náutica se relaciona históricamente con las coordenadas geográficas. Un nudo es una milla náutica por hora.",
        ],
      },
      {
        title: "¿Cómo se mide la longitud?",
        paragraphs: [
          "En mediciones cotidianas se usan regla, cinta métrica, calibrador y micrómetro. El instrumento depende del tamaño del objeto y de la precisión requerida.",
          "En ingeniería e investigación se emplean telémetros láser, máquinas de medición por coordenadas, interferómetros y sistemas ópticos.",
        ],
      },
      {
        title: "Precisión de medición e incertidumbre",
        paragraphs: [
          "Ninguna medición física es perfecta. Su incertidumbre depende de resolución, calibración, ambiente y método.",
          "En resultados científicos conviene informar valor, unidad e incertidumbre. En ingeniería de precisión, incluso la temperatura puede alterar la longitud de un material.",
        ],
      },
      {
        title: "¿Cómo se convierten las unidades de longitud?",
        paragraphs: [
          "Dentro del sistema métrico se usan factores de diez: para pasar de metros a kilómetros se divide entre 1.000; para la conversión inversa se multiplica por 1.000.",
          "Entre unidades métricas y anglosajonas deben usarse factores definidos. Para pasar de pulgadas a centímetros se multiplica por 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanómetro", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/métrico", commonUse: "Longitud de onda y nanotecnología" },
      { name: "Micrómetro", symbol: "µm", referenceValue: "0,000001 m", system: "SI/métrico", commonUse: "Células, partículas y fabricación de precisión" },
      { name: "Milímetro", symbol: "mm", referenceValue: "0,001 m", system: "SI/métrico", commonUse: "Dibujo técnico y medidas pequeñas" },
      { name: "Centímetro", symbol: "cm", referenceValue: "0,01 m", system: "SI/métrico", commonUse: "Medición de objetos cotidianos" },
      { name: "Decímetro", symbol: "dm", referenceValue: "0,1 m", system: "SI/métrico", commonUse: "Educación y relaciones de volumen" },
      { name: "Metro", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Mediciones básicas de longitud" },
      { name: "Kilómetro", symbol: "km", referenceValue: "1.000 m", system: "SI/métrico", commonUse: "Distancias viales y geográficas" },
      { name: "Pulgada", symbol: "in", referenceValue: "0,0254 m", system: "Británico/estadounidense", commonUse: "Pantallas, tuberías y medidas técnicas" },
      { name: "Pie", symbol: "ft", referenceValue: "0,3048 m", system: "Británico/estadounidense", commonUse: "Altura, construcción y aviación" },
      { name: "Yarda", symbol: "yd", referenceValue: "0,9144 m", system: "Británico/estadounidense", commonUse: "Campos deportivos y distancias" },
      { name: "Milla", symbol: "mi", referenceValue: "1.609,344 m", system: "Británico/estadounidense", commonUse: "Distancias por carretera" },
      { name: "Milla náutica", symbol: "nmi", referenceValue: "1.852 m", system: "Navegación marítima", commonUse: "Navegación marítima y aérea" },
    ],
  },
  {
    locale: "es",
    slug: "superficie",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversión de unidades de superficie",
    description:
      "Convierte metros cuadrados, hectáreas y pies cuadrados; compara unidades para terrenos, edificios y construcción.",
    introduction: [
      "La superficie es una magnitud física derivada que expresa la extensión de una región bidimensional. Su dimensión es longitud al cuadrado: L².",
      "La unidad derivada del SI es el metro cuadrado (m²). En terrenos se usa mucho la hectárea; en el sistema anglosajón, el pie cuadrado y el acre. Algunas regiones también conservan unidades locales.",
    ],
    facts: [
      { label: "Magnitud física", value: "Superficie" },
      { label: "Símbolo dimensional", value: "[L²]" },
      { label: "Unidad derivada del SI", value: "Metro cuadrado" },
      { label: "Símbolo de la unidad SI", value: "m²" },
      { label: "Fórmula básica (rectángulo)", value: "Superficie = longitud × ancho" },
    ],
    sections: [
      {
        title: "¿Qué es la superficie?",
        paragraphs: [
          "La superficie expresa la extensión de una región plana o proyectada. El tamaño de un terreno, el piso de una habitación o una hoja de papel se miden como superficie.",
          "Es una magnitud derivada: se obtiene al multiplicar una longitud por sí misma. Por eso su dimensión en el SI es L² y se expresa como una magnitud escalar positiva.",
        ],
      },
      {
        title: "La unidad del SI: el metro cuadrado",
        paragraphs: [
          "En el Sistema Internacional, el metro cuadrado (m²) es la unidad derivada de superficie: corresponde a un cuadrado de un metro de lado.",
          "No es una unidad básica independiente, sino el metro elevado al cuadrado. Las demás unidades métricas de superficie se relacionan con él mediante potencias de diez.",
        ],
      },
      {
        title: "¿Por qué las unidades de superficie se convierten con una razón cuadrática?",
        paragraphs: [
          "La relación de longitud debe elevarse al cuadrado al convertir superficies. Un kilómetro equivale a 1.000 metros, pero un kilómetro cuadrado equivale a 1.000² metros cuadrados: 1.000.000 m².",
          "Esto ocurre porque cambian a la vez longitud y anchura. Olvidar esta relación cuadrática es un error frecuente: 1 km² no equivale a 1.000 m².",
        ],
      },
      {
        title: "Las unidades métricas de superficie",
        paragraphs: [
          "Milímetro cuadrado y centímetro cuadrado sirven para áreas pequeñas; metro cuadrado, para usos cotidianos; y kilómetro cuadrado, para extensiones grandes. Un cm² equivale a 0,0001 m² y un km² a 1.000.000 m².",
          "Para terrenos se emplean el área (100 m²) y la hectárea (10.000 m²). La hectárea es una referencia habitual para tierras agrícolas.",
        ],
      },
      {
        title: "Unidades tradicionales de terreno en Turquía",
        paragraphs: [
          "En Turquía, dönüm y dekar se usan para tierras agrícolas y hoy equivalen a 1.000 m². El dekar es el nombre técnico; dönüm, el tradicional.",
          "El valor histórico del dönüm variaba según la región. Su valor actual estandarizado es 1.000 m², por lo que los documentos antiguos requieren contexto adicional.",
        ],
      },
      {
        title: "Unidades de superficie anglosajonas",
        paragraphs: [
          "Pie cuadrado y pulgada cuadrada se usan para áreas pequeñas; el acre, para parcelas grandes en Estados Unidos y otros contextos anglosajones. Un acre equivale exactamente a 4.046,8564224 m².",
          "El acre tiene origen histórico agrícola y sigue siendo común en anuncios inmobiliarios de Estados Unidos, Reino Unido y algunos países de la Commonwealth.",
        ],
      },
      {
        title: "Unidades de terreno del sur de Asia",
        paragraphs: [
          "En India, Bangladesh, Pakistán y Nepal se usan unidades locales como bigha, katha, killa, kanal, marla, guntha, biswa y decimal. Sus valores pueden cambiar mucho de una región a otra.",
          "Un bigha, por ejemplo, puede tener distintos equivalentes según el estado o región. En una transacción debe confirmarse el estándar local y su valor en metros cuadrados.",
        ],
      },
      {
        title: "¿Cómo se calcula una superficie?",
        paragraphs: [
          "Para un rectángulo, superficie = longitud × ancho. Para un triángulo, superficie = (base × altura) / 2; para un círculo, superficie = π × radio².",
          "En terrenos irregulares se divide la forma en figuras más simples y se suman sus superficies. En mediciones catastrales se emplean también métodos basados en coordenadas.",
        ],
      },
      {
        title: "Aspectos a considerar al medir superficies",
        paragraphs: [
          "La superficie de un anuncio o escritura debe leerse junto con su unidad y estándar regional: m², dönüm, acre o bigha no son intercambiables por nombre.",
          "En transacciones internacionales conviene comprobar el equivalente exacto en metros cuadrados. Esta herramienta compara las unidades mediante una referencia común en m².",
        ],
      },
    ],
    unitTable: [
      { name: "Milímetro cuadrado", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/métrico", commonUse: "Dibujo técnico y superficies pequeñas" },
      { name: "Centímetro cuadrado", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/métrico", commonUse: "Superficie de objetos pequeños" },
      { name: "Metro cuadrado", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Superficie de vivienda, oficina y terreno" },
      { name: "Área", symbol: "a", referenceValue: "100 m²", system: "Métrico", commonUse: "Parcelas pequeñas" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1.000 m²", system: "Turquía (métrico)", commonUse: "Tierras agrícolas" },
      { name: "Hectárea", symbol: "ha", referenceValue: "10.000 m²", system: "Métrico", commonUse: "Tierras agrícolas y forestales" },
      { name: "Kilómetro cuadrado", symbol: "km²", referenceValue: "1.000.000 m²", system: "SI/métrico", commonUse: "Ciudades, países y zonas geográficas" },
      { name: "Pie cuadrado", symbol: "ft²", referenceValue: "0,092903 m²", system: "Británico/estadounidense", commonUse: "Superficie de vivienda (US/UK)" },
      { name: "Yarda cuadrada", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Británico/estadounidense", commonUse: "Campos deportivos y textiles" },
      { name: "Acre", symbol: "ac", referenceValue: "4.046,8564224 m²", system: "Británico/estadounidense", commonUse: "Grandes parcelas de terreno" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1.337,8 m² (variable según la región)", system: "Sur de Asia", commonUse: "Tierras agrícolas en India y Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japón", commonUse: "Medición de vivienda y terreno en Japón" },
    ],
  },
  {
    locale: "es",
    slug: "volumen",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversión de unidades de volumen",
    description:
      "Convierte volúmenes entre litros, mililitros y metros cúbicos; compara unidades para líquidos y recipientes.",
    introduction: [
      "El volumen expresa el espacio que ocupa un objeto o que puede contener un recipiente tridimensional. Como se obtiene al multiplicar largo, ancho y alto, su dimensión es L³ (longitud al cubo).",
      "La unidad derivada del Sistema Internacional es el metro cúbico (m³), aunque en el uso diario predominan el litro y el mililitro. En cocina se usan taza, cucharada y cucharadita; también aparecen galón, cuarto, pinta y onza líquida en sistemas anglosajones.",
    ],
    facts: [
      { label: "Magnitud física", value: "Volumen" },
      { label: "Símbolo dimensional", value: "[L³]" },
      { label: "Unidad derivada del SI", value: "Metro cúbico" },
      { label: "Símbolo de la unidad SI", value: "m³" },
      { label: "Unidad más habitual en el uso diario", value: "Litro (L)" },
    ],
    sections: [
      {
        title: "¿Qué es el volumen?",
        paragraphs: [
          "El volumen es la extensión tridimensional ocupada por un objeto o la capacidad de un recipiente. En un sólido describe su tamaño espacial; en un recipiente, la cantidad de líquido o gas que puede contener.",
          "Es una magnitud derivada: se obtiene al multiplicar una longitud en tres dimensiones —ancho, alto y profundidad—. Por eso su dimensión en el SI es L³.",
        ],
      },
      {
        title: "La unidad del SI para el volumen: el metro cúbico",
        paragraphs: [
          "En el Sistema Internacional de Unidades, el metro cúbico (m³) es la unidad derivada de volumen: el volumen de un cubo de un metro de lado.",
          "Se usa para volúmenes grandes, como depósitos de agua, concreto u hormigón y contenedores. Para cantidades cotidianas se usa más el litro. Un m³ equivale exactamente a 1.000 litros.",
        ],
      },
      {
        title: "La relación entre el litro y el metro cúbico",
        paragraphs: [
          "El litro es una unidad aceptada para su uso con el SI. Equivale a 1.000 centímetros cúbicos: el volumen de un cubo de 10 centímetros de lado.",
          "Decilitro, centilitro y mililitro se usan en alimentos, medicamentos y laboratorio. Un mililitro equivale exactamente a un centímetro cúbico (1 mL = 1 cm³).",
        ],
      },
      {
        title: "¿Por qué las unidades de volumen se convierten con una razón cúbica?",
        paragraphs: [
          "Las longitudes usan una razón lineal y las superficies una razón cuadrática; los volúmenes usan una razón cúbica. Un metro equivale a 100 centímetros, pero un metro cúbico equivale a 100³ cm³: 1.000.000 cm³.",
          "El volumen cambia a la vez en tres dimensiones. Olvidar el cubo es un error común, especialmente al convertir entre unidades métricas y galones o pies cúbicos.",
        ],
      },
      {
        title: "Las medidas de cocina",
        paragraphs: [
          "Cucharada y cucharadita se toman habitualmente como 15 mL y 5 mL. La taza varía según el país y la receta: puede ser de 200 ml, 240 ml o 250 ml.",
          "Para preparaciones sensibles, especialmente repostería, conviene seguir la equivalencia indicada por la receta o pesar los ingredientes con una balanza.",
        ],
      },
      {
        title: "Unidades de volumen líquido estadounidenses y británicas",
        paragraphs: [
          "Estados Unidos y Reino Unido usan galón, cuarto, pinta y onza líquida, pero sus valores no siempre coinciden. El galón estadounidense equivale a 3,78541 L; el galón imperial británico, a 4,54609 L: cerca de un 20 % más.",
          "Antes de convertir una receta, un envase o una especificación, verifica si el galón o la onza líquida pertenecen al sistema estadounidense o al imperial británico.",
        ],
      },
      {
        title: "Unidades agrícolas e históricas de volumen",
        paragraphs: [
          "Bushel y peck son unidades usadas históricamente para productos secos, como cereales, frutas y verduras. Todavía aparecen en algunos mercados agrícolas, sobre todo en Estados Unidos.",
          "En el Imperio otomano, kile y şinik eran unidades tradicionales para cereales; 1 kile equivalía a 20 şinik. Sus valores podían variar por región, por lo que hoy se usan principalmente para interpretar documentos históricos.",
        ],
      },
      {
        title: "¿Cómo se calcula un volumen?",
        paragraphs: [
          "Para un prisma rectangular se usa volumen = longitud × ancho × altura. Para un cilindro, volumen = π × radio² × altura; para una esfera, volumen = (4/3) × π × radio³.",
          "El volumen de sólidos irregulares puede determinarse mediante desplazamiento de agua: se sumerge el objeto y se mide el volumen de líquido desplazado.",
        ],
      },
      {
        title: "Medición de volumen en petróleo e industria",
        paragraphs: [
          "En la industria petrolera se usa el barril (bbl): 1 barril equivale a 158,987 L, o 42 galones estadounidenses. La unidad procede de prácticas históricas de transporte y comercialización del petróleo.",
          "Los procesos industriales suelen expresar volúmenes grandes en metros cúbicos y las mediciones de laboratorio en mililitros. La unidad adecuada depende de la escala y del contexto técnico.",
        ],
      },
    ],
    unitTable: [
      { name: "Mililitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/métrico", commonUse: "Dosis médicas y mediciones pequeñas" },
      { name: "Cucharadita", symbol: "cdta", referenceValue: "0,000005 m³ (≈5 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Cucharada", symbol: "cda", referenceValue: "0,000015 m³ (≈15 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Taza", symbol: "taza", referenceValue: "0,00024 m³ (≈240 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Métrico", commonUse: "Bebidas, combustible y uso diario" },
      { name: "Onza líquida (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Estados Unidos", commonUse: "Bebidas y envases cosméticos" },
      { name: "Pinta (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Estados Unidos", commonUse: "Cerveza y leche" },
      { name: "Galón (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Estados Unidos", commonUse: "Combustible y grandes volúmenes líquidos" },
      { name: "Galón imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Británico (imperial)", commonUse: "Combustible y líquidos en Reino Unido" },
      { name: "Pie cúbico", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Británico/estadounidense", commonUse: "Construcción y caudal de aire" },
      { name: "Barril (petróleo)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industria petrolera", commonUse: "Medición de petróleo crudo" },
      { name: "Metro cúbico", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Depósitos de agua, concreto y grandes volúmenes" },
    ],
  },
  {
    locale: "es",
    slug: "masa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversión de unidades de masa",
    description:
      "Convierte entre kilogramos, gramos, miligramos, toneladas y libras de forma rápida.",
    introduction: [
      "La masa es una magnitud física fundamental relacionada con la cantidad de materia y la inercia de un objeto. En el Sistema Internacional de Unidades, su unidad básica es el kilogramo (kg).",
      "En el lenguaje cotidiano, masa y peso suelen usarse como sinónimos, pero son magnitudes distintas: la masa se expresa en kilogramos y el peso, que es una fuerza, en newtons.",
    ],
    facts: [
      { label: "Magnitud física", value: "Masa" },
      { label: "Símbolo dimensional", value: "[M]" },
      { label: "Unidad básica del SI", value: "Kilogramo" },
      { label: "Símbolo de la unidad SI", value: "kg" },
      { label: "Ámbito de la metrología", value: "Metrología de masa" },
    ],
    sections: [
      {
        title: "¿Qué es la masa?",
        paragraphs: [
          "La masa mide la resistencia de un objeto a cambiar su movimiento, es decir, su inercia. En mecánica clásica, la relación entre fuerza neta y aceleración se expresa como F = m·a.",
          "Si se aplica la misma fuerza, un objeto con mayor masa acelera menos. Por eso la masa es importante tanto para describir la cantidad de materia como para calcular el movimiento.",
          "Es una magnitud escalar: no tiene dirección. Su símbolo dimensional en el SI es M.",
        ],
      },
      {
        title: "Diferencia entre masa y peso",
        paragraphs: [
          "La masa es una propiedad del objeto y se expresa en kilogramos. El peso es la fuerza que actúa sobre ese objeto por efecto de la gravedad y se mide en newtons.",
          "De forma simplificada, el peso se calcula como W = m·g, donde W es la fuerza de peso, m la masa y g la aceleración local de la gravedad.",
          "La masa es prácticamente igual en la Tierra y en la Luna, pero el peso cambia porque la gravedad es distinta. Por eso el kilogramo es una unidad de masa, no de fuerza.",
          "Las básculas de uso cotidiano muestran kilogramos, aunque detectan el efecto de una fuerza y están calibradas para informar una masa equivalente.",
        ],
      },
      {
        title: "¿Por qué el kilogramo es la unidad básica del SI?",
        paragraphs: [
          "El kilogramo es la unidad básica de masa del Sistema Internacional y la única unidad básica cuyo nombre ya contiene un prefijo.",
          "El gramo tuvo un papel central en las primeras definiciones del sistema métrico, pero el kilogramo se consolidó como referencia práctica de la masa.",
          "Desde 2019, el kilogramo se define fijando el valor numérico de la constante de Planck. Esta definición permite realizarlo con instrumentos como la balanza de Kibble, sin depender de un cilindro patrón físico.",
        ],
      },
      {
        title: "Unidades métricas de masa",
        paragraphs: [
          "Las unidades métricas usan el kilogramo, el gramo y los prefijos del SI. Un gramo equivale a 0,001 kg; un miligramo, a 0,001 g; y un microgramo, a 0,001 mg.",
          "Para masas grandes se utiliza la tonelada métrica: 1 t equivale exactamente a 1.000 kg. Su símbolo aceptado para uso con el SI es t.",
          "La unidad depende de la escala: una persona o un producto suele expresarse en kilogramos, un alimento en gramos, un medicamento en miligramos o microgramos y la carga de un vehículo en toneladas.",
        ],
      },
      {
        title: "Relación entre libra, onza y kilogramo",
        paragraphs: [
          "La libra y la onza son unidades tradicionales del sistema británico y estadounidense. La libra avoirdupois internacional equivale exactamente a 0,45359237 kg.",
          "Una libra avoirdupois contiene 16 onzas; una onza equivale exactamente a 28,349523125 g.",
          "La libra de masa y la libra-fuerza (pound-force) son magnitudes distintas. En cálculos técnicos no deben confundirse los símbolos lb y lbf.",
        ],
      },
      {
        title: "¿Cómo se mide la masa?",
        paragraphs: [
          "La masa se mide con balanzas de platillos, básculas electrónicas, balanzas analíticas, celdas de carga y sistemas de pesaje industrial.",
          "Las balanzas comparativas cotejan una masa desconocida con masas patrón trazables. En las básculas electrónicas, las celdas de carga convierten la fuerza aplicada en una señal eléctrica.",
          "En mediciones de alta precisión influyen el empuje del aire, la gravedad local, la temperatura, la humedad, las vibraciones, los efectos electrostáticos y la densidad del patrón.",
          "La trazabilidad metrológica conecta los patrones de masa con referencias nacionales e internacionales y permite comparar mediciones entre laboratorios y empresas.",
        ],
      },
      {
        title: "Relación entre densidad, volumen y masa",
        paragraphs: [
          "Masa, densidad y volumen se relacionan mediante m = ρ·V, donde m es la masa, ρ la densidad y V el volumen.",
          "A igual volumen, dos materiales pueden tener masas diferentes porque su densidad no es la misma. Por ejemplo, un volumen de acero tiene mayor masa que el mismo volumen de agua.",
          "En el SI, la densidad se expresa en kilogramos por metro cúbico. En laboratorio también son habituales el gramo por centímetro cúbico y el gramo por mililitro.",
        ],
      },
      {
        title: "Incertidumbre en la medición de masa",
        paragraphs: [
          "Toda medición tiene cierta incertidumbre. Que una báscula muestre muchas cifras no significa que todas tengan la misma precisión.",
          "La resolución, repetibilidad, linealidad, calibración, condiciones ambientales y procedimiento de uso influyen en la incertidumbre.",
          "En trabajos científicos e industriales, el resultado debe incluir una unidad adecuada, cifras significativas coherentes e información sobre su incertidumbre cuando corresponda.",
        ],
      },
      {
        title: "¿Cómo elegir la unidad de masa adecuada?",
        paragraphs: [
          "Elegir una unidad proporcional a la magnitud mejora la lectura: una persona puede expresarse en kilogramos, el principio activo de una tableta en miligramos y la carga de un camión en toneladas.",
          "Para masas muy pequeñas se usan microgramos, nanogramos o picogramos. A escala atómica y molecular, la unidad de masa atómica unificada puede resultar más práctica.",
          "Al convertir, verifica tanto el valor numérico como el tipo de magnitud: una unidad puede expresar masa o fuerza.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogramo", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Cantidades muy pequeñas de materia" },
      { name: "Microgramo", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Mediciones médicas y de laboratorio" },
      { name: "Miligramo", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Medicamentos y sustancias químicas" },
      { name: "Gramo", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentos y objetos pequeños" },
      { name: "Kilogramo", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Mediciones básicas de masa" },
      { name: "Tonelada", symbol: "t", referenceValue: "1.000 kg", system: "Métrico", commonUse: "Transporte, carga e industria" },
      { name: "Onza", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Británico/estadounidense", commonUse: "Alimentos y masas pequeñas" },
      { name: "Libra", symbol: "lb", referenceValue: "0,45359237 kg", system: "Británico/estadounidense", commonUse: "Masa corporal y productos" },
    ],
  },
  {
    locale: "es",
    slug: "temperatura",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversión de unidades de temperatura",
    description:
      "Convierte temperaturas entre Celsius, Fahrenheit y kelvin; consulta fórmulas y valores de referencia.",
    introduction: [
      "La temperatura es una magnitud física relacionada con la energía cinética media de las partículas de una sustancia; indica cuán caliente o fría está. En el Sistema Internacional, su unidad básica es el kelvin.",
      "Celsius y Fahrenheit son las escalas más habituales en la vida diaria; kelvin se utiliza en ciencia, Rankine en algunos cálculos de ingeniería y Réaumur aparece en textos históricos. A diferencia de otras magnitudes, estas escalas requieren multiplicar y también sumar o restar al convertirlas.",
    ],
    facts: [
      { label: "Magnitud física", value: "Temperatura termodinámica" },
      { label: "Símbolo dimensional", value: "[Θ]" },
      { label: "Unidad básica del SI", value: "Kelvin" },
      { label: "Símbolo de la unidad SI", value: "K" },
      { label: "Cero absoluto", value: "0 K = −273,15 °C = −459,67 °F" },
    ],
    sections: [
      {
        title: "¿Qué es la temperatura?",
        paragraphs: [
          "La temperatura se relaciona con la energía cinética media de los átomos y moléculas de una sustancia. En términos generales, cuanto más rápido se mueven las partículas, mayor es su temperatura.",
          "Es una de las siete magnitudes básicas del SI y la temperatura termodinámica se representa con Θ. No es directamente aditiva: al poner dos cuerpos en contacto, intercambian energía hasta acercarse al equilibrio térmico.",
        ],
      },
      {
        title: "La unidad del SI: el kelvin",
        paragraphs: [
          "El kelvin es la unidad básica del SI y se escribe K, sin signo de grado. La escala Kelvin parte del cero absoluto, que corresponde a 0 K.",
          "Desde la revisión del SI de 2019, el kelvin se define fijando el valor numérico de la constante de Boltzmann. Así, la unidad se basa en una constante universal y no en una sustancia de referencia.",
        ],
      },
      {
        title: "¿Por qué convertir temperatura no es solo multiplicar?",
        paragraphs: [
          "Longitud y masa se convierten mediante un factor multiplicativo. Celsius, Fahrenheit y kelvin tienen puntos cero distintos, por lo que sus conversiones requieren multiplicar y también sumar o restar.",
          "Por ejemplo, para pasar de Celsius a Fahrenheit se usa °F = (°C × 9/5) + 32. Esta es una relación afín: es lineal, pero no pasa por el origen.",
        ],
      },
      {
        title: "Escala Celsius",
        paragraphs: [
          "La escala Celsius se asocia con Anders Celsius y fija, a presión atmosférica estándar, el congelamiento del agua en 0 °C y su ebullición en 100 °C.",
          "Es la escala más utilizada en la información meteorológica y en la vida cotidiana de la mayoría de los países latinoamericanos, además de ser común en ciencia.",
        ],
      },
      {
        title: "Escala Fahrenheit",
        paragraphs: [
          "La escala Fahrenheit fue desarrollada por Daniel Gabriel Fahrenheit. A presión atmosférica estándar, el agua congela a 32 °F y hierve a 212 °F, un intervalo de 180 grados.",
          "Se usa principalmente en Estados Unidos para temperaturas cotidianas; en ciencia predominan Celsius y kelvin.",
        ],
      },
      {
        title: "Rankine y Réaumur: escalas menos frecuentes",
        paragraphs: [
          "Rankine es una escala absoluta cuyas unidades tienen el mismo tamaño que el grado Fahrenheit y cuyo cero es el cero absoluto. Puede encontrarse en algunos cálculos de ingeniería termodinámica en Estados Unidos.",
          "La escala Réaumur, desarrollada en el siglo XVIII, sitúa el congelamiento del agua en 0 °Ré y su ebullición en 80 °Ré. Hoy es poco frecuente y aparece sobre todo en referencias históricas.",
        ],
      },
      {
        title: "¿Qué significa el cero absoluto?",
        paragraphs: [
          "El cero absoluto (0 K, −273,15 °C, −459,67 °F) es el límite inferior de la escala termodinámica. En el modelo clásico corresponde a la menor energía cinética posible de las partículas.",
          "La mecánica cuántica describe una energía residual incluso cerca de ese límite. Se han logrado temperaturas extremadamente próximas al cero absoluto, pero no alcanzarlo exactamente mediante un número finito de procesos.",
        ],
      },
      {
        title: "¿Cómo se mide la temperatura?",
        paragraphs: [
          "Se usan termómetros de líquido, digitales, termopares, termómetros de resistencia (RTD) e infrarrojos sin contacto. Cada tecnología se adapta a un rango y una precisión diferentes.",
          "Los termopares son comunes en industria porque cubren rangos amplios. Estiman la temperatura a partir de la diferencia de voltaje generada por la unión de dos metales distintos.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unidad básica", system: "SI", commonUse: "Cálculos científicos y termodinámicos" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Métrico (uso cotidiano)", commonUse: "Meteorología, vida cotidiana y ciencia" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Estados Unidos", commonUse: "Temperatura cotidiana en Estados Unidos" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Estados Unidos (ingeniería)", commonUse: "Ingeniería termodinámica" },
      { name: "Réaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Histórico (Europa)", commonUse: "Textos históricos y recetas tradicionales" },
    ],
  },
  {
    locale: "es",
    slug: "tiempo",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversión de unidades de tiempo",
    description:
      "Convierte entre segundos, minutos, horas y días; consulta relaciones y conceptos básicos de tiempo.",
    introduction: [
      "El tiempo ordena los sucesos y expresa la duración entre ellos. En el Sistema Internacional, su unidad básica es el segundo; minuto, hora y día se usan de forma habitual en la vida diaria.",
      "La medición del tiempo es una de las prácticas más antiguas. La división sexagesimal de horas, minutos y segundos procede de tradiciones históricas y sigue vigente por su utilidad práctica.",
    ],
    facts: [
      { label: "Magnitud física", value: "Tiempo" },
      { label: "Símbolo dimensional", value: "[T]" },
      { label: "Unidad básica del SI", value: "Segundo" },
      { label: "Símbolo de la unidad SI", value: "s" },
      { label: "Definición del segundo", value: "9.192.631.770 períodos del cesio-133" },
    ],
    sections: [
      {
        title: "¿Qué es el tiempo?",
        paragraphs: [
          "El tiempo es una magnitud fundamental que describe el orden de los sucesos y la duración transcurrida entre ellos. En física se representa con T y participa en magnitudes derivadas como velocidad, aceleración y frecuencia.",
          "La física clásica lo trataba como una magnitud absoluta. La relatividad mostró que el transcurso del tiempo depende de la velocidad del observador y del campo gravitatorio.",
        ],
      },
      {
        title: "La unidad del SI: el segundo",
        paragraphs: [
          "El segundo, cuyo símbolo es s, es la unidad básica del SI. Históricamente se definía como 1/86.400 de un día.",
          "Desde 1967 se define mediante exactamente 9.192.631.770 períodos de una radiación asociada a una transición del átomo de cesio-133. Esta referencia permite relojes atómicos comparables en todo el mundo.",
        ],
      },
      {
        title: "Origen sexagesimal de hora, minuto y segundo",
        paragraphs: [
          "La división de una hora en 60 minutos y de un minuto en 60 segundos se relaciona con el sistema sexagesimal usado en la antigua Babilonia, que también influyó en la división angular.",
          "El número 60 es divisible entre muchos números, lo que facilita repartir una hora en partes iguales sin recurrir a fracciones complejas.",
        ],
      },
      {
        title: "División del día en 24 horas",
        paragraphs: [
          "La división del día en 24 horas se asocia con el Antiguo Egipto, donde se contaban doce partes de día y doce de noche mediante observaciones solares y estelares.",
          "El uso del doce pudo relacionarse con formas prácticas de conteo y con los ciclos lunares aproximados de un año.",
        ],
      },
      {
        title: "Relación entre unidades de tiempo",
        paragraphs: [
          "Milisegundo, microsegundo y nanosegundo sirven para sucesos muy breves, como operaciones de computadoras, cronometraje deportivo y experimentos científicos.",
          "Minuto (60 s), hora (3.600 s) y día (86.400 s) son referencias cotidianas. Sus conversiones usan factores multiplicativos porque comparten un mismo origen.",
        ],
      },
      {
        title: "¿Qué es un segundo intercalar?",
        paragraphs: [
          "La rotación de la Tierra presenta pequeñas irregularidades, por lo que su duración no coincide exactamente con el tiempo medido por relojes atómicos.",
          "Los segundos intercalares se han usado para mantener UTC próximo al tiempo de rotación terrestre. No se incorporan siguiendo un ciclo fijo: su aplicación depende de las decisiones y normas internacionales de cronometraje.",
        ],
      },
      {
        title: "Husos horarios y UTC",
        paragraphs: [
          "Los husos horarios expresan diferencias respecto a UTC porque la hora solar cambia con la longitud. Los desfases concretos pueden cambiar por decisiones locales y horario estacional, por lo que conviene consultar la zona horaria vigente al planificar una fecha u hora.",
          "UTC es el estándar de referencia mantenido con relojes atómicos. GMT se sigue usando como nombre horario en algunos contextos, pero no debe sustituirse de forma automática por la zona local de cada país.",
        ],
      },
      {
        title: "¿Cómo se mide el tiempo?",
        paragraphs: [
          "En la vida cotidiana se usan relojes mecánicos y digitales; la ciencia, las telecomunicaciones y la navegación satelital usan relojes atómicos de alta precisión basados en frecuencias atómicas estables.",
          "La navegación satelital necesita una sincronización muy precisa: una diferencia mínima de tiempo se traduce en un error al calcular la posición.",
        ],
      },
    ],
    unitTable: [
      { name: "Milisegundo", symbol: "ms", referenceValue: "0,001 s", system: "SI/métrico", commonUse: "Computación y cronometraje deportivo" },
      { name: "Segundo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Medición básica de tiempo" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Aceptado para uso con el SI", commonUse: "Control del tiempo cotidiano" },
      { name: "Hora", symbol: "h", referenceValue: "3.600 s", system: "Aceptado para uso con el SI", commonUse: "Trabajo y viajes" },
      { name: "Día", symbol: "d", referenceValue: "86.400 s", system: "Aceptado para uso con el SI", commonUse: "Calendario y duraciones" },
    ],
  },
  {
    locale: "es",
    slug: "velocidad",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversión de unidades de velocidad",
    description:
      "Convierte velocidades entre km/h, m/s y mph; consulta usos cotidianos, científicos y de navegación.",
    introduction: [
      "La velocidad expresa la distancia recorrida por unidad de tiempo. Se obtiene al dividir longitud entre tiempo, por lo que su dimensión es L/T.",
      "Kilómetro por hora, milla por hora y metro por segundo son unidades frecuentes. El nudo se usa en navegación marítima y aérea; la velocidad de la luz es una constante física de referencia.",
    ],
    facts: [
      { label: "Magnitud física", value: "Velocidad" },
      { label: "Símbolo dimensional", value: "[L/T]" },
      { label: "Unidad derivada del SI", value: "Metro por segundo" },
      { label: "Símbolo de la unidad SI", value: "m/s" },
      { label: "Velocidad de la luz en el vacío", value: "299.792.458 m/s" },
    ],
    sections: [
      {
        title: "¿Qué es la velocidad?",
        paragraphs: [
          "La rapidez se calcula como distancia dividida entre tiempo. En física, velocidad incorpora además una dirección, mientras que rapidez es escalar; en el uso cotidiano ambos términos suelen intercambiarse.",
          "Es una magnitud derivada obtenida al dividir longitud entre tiempo. Su dimensión es L/T o L¹T⁻¹.",
        ],
      },
      {
        title: "La unidad del SI: metro por segundo",
        paragraphs: [
          "El metro por segundo (m/s) expresa que un objeto recorre un metro cada segundo y es la unidad de referencia en cálculos científicos y fórmulas físicas.",
          "En tránsito se usa más km/h porque resulta práctico para distancias viales. Un metro por segundo equivale exactamente a 3,6 km/h.",
        ],
      },
      {
        title: "Kilómetro por hora y milla por hora",
        paragraphs: [
          "El km/h es la unidad vial habitual en América Latina y en los países que usan el sistema métrico. La milla por hora (mph) es común en Estados Unidos y Reino Unido.",
          "Una mph equivale aproximadamente a 1,60934 km/h. Conviene comprobar la unidad de un velocímetro o de una señal vial al conducir en otro país.",
        ],
      },
      {
        title: "El nudo en navegación marítima y aérea",
        paragraphs: [
          "El nudo equivale a una milla náutica por hora: exactamente 1.852 metros por hora. Es la unidad habitual en navegación marítima y aérea.",
          "Su nombre procede del método histórico de estimar la velocidad de un barco con una cuerda marcada por nudos.",
        ],
      },
      {
        title: "Velocidad de la luz",
        paragraphs: [
          "En el vacío, la velocidad de la luz se define exactamente como 299.792.458 m/s. En relatividad especial, es el límite de propagación de la información y ninguna partícula con masa puede alcanzarla.",
          "El metro se define a partir de esta constante: es la distancia que recorre la luz en el vacío durante 1/299.792.458 de segundo.",
        ],
      },
      {
        title: "Número de Mach y velocidad del sonido",
        paragraphs: [
          "El número de Mach relaciona la velocidad de un objeto con la velocidad del sonido en el medio. Mach 1 corresponde a la velocidad del sonido, que cambia con condiciones como temperatura y densidad del aire.",
          "Por ello, un mismo número de Mach puede equivaler a valores distintos en km/h o m/s según la altitud y las condiciones atmosféricas.",
        ],
      },
      {
        title: "Velocidad media e instantánea",
        paragraphs: [
          "La velocidad media es distancia total dividida entre tiempo total. La velocidad instantánea describe el movimiento en un momento concreto y puede cambiar continuamente.",
          "El velocímetro muestra velocidad instantánea; la media de un trayecto se calcula con su distancia y duración completas. Ambas solo coinciden si la velocidad se mantiene constante.",
        ],
      },
    ],
    unitTable: [
      { name: "Centímetro por segundo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/métrico", commonUse: "Laboratorio y movimiento lento" },
      { name: "Metro por minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/métrico", commonUse: "Cintas transportadoras" },
      { name: "Metro por segundo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Cálculos científicos y físicos" },
      { name: "Kilómetro por hora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Métrico", commonUse: "Vehículos y límites viales" },
      { name: "Milla por hora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Británico/estadounidense", commonUse: "Vehículos en Estados Unidos y Reino Unido" },
      { name: "Nudo", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navegación marítima/aérea", commonUse: "Barcos y aviones" },
      { name: "Kilómetro por minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Métrico", commonUse: "Distancias cortas" },
      { name: "Kilómetro por segundo", symbol: "km/s", referenceValue: "1.000 m/s", system: "Métrico", commonUse: "Naves espaciales y cuerpos celestes" },
      { name: "Velocidad de la luz", symbol: "c", referenceValue: "299.792.458 m/s", system: "Constante universal", commonUse: "Física y astronomía" },
    ],
  },
  {
    locale: "es",
    slug: "presion",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversión de unidades de presión",
    description:
      "Convierte presión entre pascal, kilopascal, bar y psi; consulta fórmulas y aplicaciones de ingeniería.",
    introduction: [
      "La presión relaciona una fuerza perpendicular con la superficie sobre la que actúa. Aparece en fluidos, contacto entre sólidos, atmósfera, vacío y sistemas industriales.",
      "La unidad derivada del Sistema Internacional es el pascal (Pa): un newton distribuido sobre un metro cuadrado. Presión, fuerza y superficie están por tanto directamente relacionadas.",
      "En la práctica también se usan kPa, bar, psi, atm y milibar. Al convertir, no basta con la unidad: es esencial distinguir presión absoluta, manométrica y diferencial.",
    ],
    facts: [
      { label: "Magnitud física", value: "Presión" },
      { label: "Unidad derivada del SI", value: "Pascal" },
      { label: "Símbolo SI", value: "Pa" },
      { label: "Relación básica", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Fórmula dimensional", value: "M L⁻¹ T⁻²" },
      { label: "Atmósfera estándar", value: "101.325 Pa" },
      { label: "Referencia absoluta", value: "Vacío total" },
    ],
    sections: [
      {
        title: "¿Qué es la presión?",
        paragraphs: [
          "La presión depende de la fuerza y de la superficie. Con la misma fuerza, una superficie menor genera una presión mayor; por eso un borde afilado concentra mejor la fuerza que una base ancha.",
          "En mecánica de fluidos, es el esfuerzo normal que el fluido ejerce sobre su entorno. En un fluido en reposo se transmite en todas las direcciones, principio que sustenta prensas hidráulicas y sistemas de frenado.",
          "También existe presión en superficies de contacto, pero en ingeniería el término suele referirse a tuberías, depósitos, compresores, conductos, vacío y atmósfera.",
        ],
      },
      {
        title: "La fórmula de presión: P = F / A",
        paragraphs: [
          "P = F / A, donde P es presión, F la fuerza perpendicular y A la superficie. Newton por metro cuadrado equivale a un pascal.",
          "La fórmula expresa presión media si la fuerza se distribuye de manera uniforme. En contactos reales y flujos complejos puede ser necesario estudiar la distribución local de presión.",
          "En un pistón, por ejemplo, debe usarse la superficie efectiva expuesta a presión. Elegir una geometría o una referencia incorrecta provoca errores de cálculo.",
        ],
      },
      {
        title: "¿Por qué el pascal es la unidad del SI?",
        paragraphs: [
          "El pascal combina el newton, unidad de fuerza, y el metro cuadrado, unidad de superficie. Por eso 1 Pa = 1 N/m² y no se necesita una unidad básica independiente.",
          "Esta coherencia permite relacionar presión con esfuerzo, energía por volumen y ecuaciones de mecánica de fluidos usando las unidades del SI.",
          "Como un pascal es pequeño para muchos usos, se emplean kPa, MPa o bar. Todas estas unidades pueden vincularse al pascal.",
        ],
      },
      {
        title: "Torricelli y el barómetro",
        paragraphs: [
          "En 1643, Evangelista Torricelli desarrolló el barómetro de mercurio. Observó una columna de mercurio que quedaba sostenida dentro de un tubo y un espacio de vacío sobre ella.",
          "Propuso que el peso del aire exterior equilibraba la columna, una demostración clave de que la atmósfera ejerce una presión medible.",
          "Experimentos posteriores a distintas altitudes confirmaron que la presión atmosférica disminuye al subir. Estos trabajos sentaron las bases de la medición moderna de presión.",
        ],
      },
      {
        title: "Presión absoluta, manométrica y diferencial",
        paragraphs: [
          "La presión absoluta se mide respecto al vacío total. Se usa en leyes de gases, termodinámica y otros cálculos que requieren una referencia física común.",
          "La presión manométrica o relativa se mide respecto a la atmósfera. Muchos manómetros muestran esta referencia: Pabs = Pman + Patm.",
          "La presión diferencial es la diferencia entre dos puntos. Sirve, por ejemplo, para vigilar filtros, medir caudal o controlar la presurización de un recinto.",
        ],
      },
      {
        title: "Presión atmosférica",
        paragraphs: [
          "La presión atmosférica es el efecto del peso de la columna de aire sobre la Tierra. La atmósfera estándar es 101.325 Pa, pero la presión real cambia con altitud y condiciones meteorológicas.",
          "Se mide con barómetros; los sensores electrónicos son comunes en aplicaciones modernas. La referencia atmosférica importa en meteorología, vacío, combustión y conversiones entre presión manométrica y absoluta.",
          "Una misma presión manométrica no representa necesariamente la misma presión absoluta en lugares con distinta presión atmosférica. Esta diferencia es relevante en compresión, densidad de gases y procesos térmicos.",
        ],
      },
      {
        title: "Presión hidrostática: P = ρgh",
        paragraphs: [
          "En un fluido en reposo, la presión aumenta con la profundidad. Si la densidad es constante, la presión hidrostática manométrica se aproxima con P = ρgh, donde ρ es densidad, g gravedad y h profundidad vertical.",
          "La relación se usa en depósitos, tanques abiertos, presas, medición de nivel y manómetros de columna líquida. La forma del recipiente no cambia el resultado: importan la densidad y la profundidad.",
          "La presión absoluta incluye además la presión en la superficie libre. En un recipiente abierto, suele ser la presión atmosférica.",
        ],
      },
      {
        title: "Presión estática, dinámica y total",
        paragraphs: [
          "La presión estática describe el estado local del fluido y es la que miden la mayoría de transmisores instalados en tuberías, depósitos y conductos.",
          "La presión dinámica refleja el efecto cinético del flujo y, en una aproximación, se expresa como q = ½ρv². Se usa, por ejemplo, con tubos de Pitot.",
          "En flujo ideal, la presión total combina la estática y la dinámica. Fricción, turbulencia, compresibilidad y pérdidas locales exigen prudencia al aplicar esta simplificación a sistemas reales.",
        ],
      },
      {
        title: "Altura de presión y altura manométrica",
        paragraphs: [
          "La altura de presión expresa una presión como altura equivalente de una columna de fluido: h = P / (ρg). La misma presión equivale a alturas diferentes según la densidad del fluido.",
          "En bombeo se usan metros de columna de fluido porque la bomba debe vencer altura, pérdidas por fricción y componentes de velocidad, no solo generar una presión aislada.",
          "La altura de presión no es igual a la altura geométrica. Para seleccionar una bomba se deben considerar pérdidas de carga, velocidad y resistencias locales, además de la densidad del fluido.",
        ],
      },
      {
        title: "¿Por qué existen distintas unidades de presión?",
        paragraphs: [
          "Las unidades de presión responden a usos históricos y sectoriales: Pa en el SI, bar en industria, mmHg en medicina, milibar en meteorología y psi en equipos anglosajones.",
          "Una unidad puede ser más cómoda para el rango de trabajo: psi o kPa en neumáticos y bar en procesos, por ejemplo. La elección también depende del instrumento y de la documentación técnica.",
          "Todas representan la misma magnitud, pero hay que aplicar factores correctos y conservar la referencia de presión —absoluta, manométrica o diferencial—.",
        ],
      },
      {
        title: "¿Cómo se mide la presión?",
        paragraphs: [
          "Antes de medir, define si necesitas presión absoluta, manométrica o diferencial. Después considera rango, fluido, temperatura, compatibilidad química, vibración y precisión requerida.",
          "Hay transmisores diferenciales para diferencias pequeñas, sensores piezorresistivos o de galga para procesos y sensores absolutos para vacío. Los manómetros de columna ayudan a ilustrar el principio; en industria predominan los equipos electrónicos.",
          "La posición de montaje, líneas de impulso, ajuste de cero y temperatura afectan el resultado. La instalación es tan importante como elegir el sensor adecuado.",
        ],
      },
      {
        title: "Sensores de presión y manómetros",
        paragraphs: [
          "Los manómetros mecánicos, como los de tubo Bourdon, convierten la presión en el movimiento de una aguja. Son robustos y sencillos; los sensores electrónicos aportan más opciones de precisión y registro.",
          "Los sensores electrónicos pueden ser piezorresistivos, capacitivos, extensométricos o resonantes. Convierten la presión en una señal para sistemas de control, alarmas y análisis de tendencias.",
          "Un instrumento diferencial compara dos puntos; uno absoluto usa el vacío total como referencia y uno manométrico usa la atmósfera. La ficha técnica debe indicar siempre la referencia.",
        ],
      },
      {
        title: "Aplicaciones de presión en ingeniería",
        paragraphs: [
          "La presión es una variable central en tuberías, climatización, hidráulica, neumática, procesos, agua, automoción y aviación. Interviene en el diseño de depósitos, válvulas, compresores y filtros.",
          "En procesos se vigilan límites de presión para operar con seguridad reactores, calderas, intercambiadores y separadores. Válvulas de alivio, discos de ruptura y controles son elementos críticos.",
          "También permite medir indirectamente caudal y nivel, y es relevante en análisis mecánico, equipos biomédicos, meteorología y tecnologías de vacío.",
        ],
      },
      {
        title: "Temperatura, altitud e incertidumbre",
        paragraphs: [
          "La temperatura afecta propiedades del fluido y respuesta del sensor. En gases, modifica densidad y la relación entre presión, volumen y temperatura; por eso las fichas técnicas especifican derivas térmicas.",
          "La presión atmosférica suele disminuir con la altitud, lo que modifica la relación entre presión manométrica y absoluta.",
          "La calibración, resolución, histéresis, temperatura, montaje, vibración y deriva contribuyen a la incertidumbre. En aplicaciones críticas se debe considerar el desempeño completo del sistema de medición.",
        ],
      },
      {
        title: "Relación entre presión y esfuerzo",
        paragraphs: [
          "Presión y esfuerzo pueden expresarse en pascales porque ambos relacionan fuerza y superficie, pero no son físicamente idénticos.",
          "La presión de un fluido en reposo es normal e igual en todas las direcciones en un punto. El esfuerzo de un sólido puede incluir componentes normales y cortantes, y depende de la dirección.",
          "Esta diferencia es importante al analizar paredes de depósitos, juntas y resistencia de materiales: la presión interna genera esfuerzos en el material, pero no es el mismo campo físico.",
        ],
      },
      {
        title: "Errores frecuentes al calcular presión",
        paragraphs: [
          "El error más común es confundir presión manométrica con absoluta. Leyes de gases, vacío y densidad normalmente requieren presión absoluta.",
          "También hay que usar factores de conversión y redondeos acordes con la precisión necesaria. La etiqueta de unidad por sí sola no indica la referencia de medición.",
          "Efectos hidrostáticos, altura de montaje y temperatura pueden alterar una lectura. En líneas con líquido, depósitos cerrados y mediciones diferenciales, los detalles de instalación son decisivos.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Cálculos científicos y de ingeniería" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1.000 Pa", system: "SI", commonUse: "Instalaciones, neumáticos y procesos" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Métrico, fuera del SI", commonUse: "Industria y compresores" },
      { name: "Milibar", symbol: "mbar", referenceValue: "100 Pa", system: "Métrico, fuera del SI", commonUse: "Meteorología" },
      { name: "Atmósfera estándar", symbol: "atm", referenceValue: "101.325 Pa", system: "Fuera del SI", commonUse: "Condiciones de referencia" },
      { name: "Psi", symbol: "psi", referenceValue: "≈6.894,757293 Pa", system: "Británico/estadounidense", commonUse: "Neumáticos e hidráulica" },
      { name: "Atmósfera técnica", symbol: "at", referenceValue: "98.066,5 Pa", system: "Fuera del SI", commonUse: "Aplicaciones técnicas antiguas" },
      { name: "Milímetro de mercurio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fuera del SI", commonUse: "Medicina y vacío" },
      { name: "Milímetro de columna de agua", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fuera del SI", commonUse: "Baja presión y ventilación" },
      { name: "Kilogramo-fuerza por centímetro cuadrado", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Métrico, fuera del SI", commonUse: "Manómetros antiguos" },
    ],
  },
  {
    locale: "es",
    slug: "energia",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversión de unidades de energía",
    description:
      "Compara conversiones de energía basadas en julio, kilovatio-hora, caloría y BTU.",
    introduction: [
      "La energía expresa la capacidad de un sistema para realizar trabajo o producir cambios. La unidad derivada del Sistema Internacional es el julio, relacionado con fuerza y desplazamiento.",
      "En la vida diaria se usa kWh para electricidad y kcal en nutrición. BTU aparece en climatización, therm en gas natural y electronvoltio en física atómica y de partículas.",
    ],
    facts: [
      { label: "Magnitud física", value: "Energía y trabajo" },
      { label: "Símbolo dimensional", value: "[ML²T⁻²]" },
      { label: "Unidad derivada del SI", value: "Julio" },
      { label: "Símbolo de la unidad SI", value: "J" },
      { label: "Definición del julio", value: "1 J = 1 N·m" },
    ],
    sections: [
      {
        title: "¿Qué es la energía?",
        paragraphs: [
          "La energía puede ser cinética, potencial, térmica, química o eléctrica. En un sistema aislado puede transformarse entre formas, pero su cantidad total se conserva.",
          "Como trabajo, se expresa como fuerza por desplazamiento. Su dimensión en el SI es ML²T⁻².",
        ],
      },
      {
        title: "La unidad del SI: el julio",
        paragraphs: [
          "El julio (J) es la unidad derivada del SI para energía y recibe su nombre de James Prescott Joule. Un julio equivale al trabajo de una fuerza de un newton a lo largo de un metro.",
          "Para cantidades mayores se usan kilojulios (kJ) y megajulios (MJ): 1 kJ son 1.000 J y 1 MJ, 1.000.000 J.",
        ],
      },
      {
        title: "Kilovatio-hora en la factura eléctrica",
        paragraphs: [
          "Un kilovatio-hora (kWh) es la energía que consume una potencia de un kilovatio durante una hora. Equivale exactamente a 3.600.000 J, o 3,6 MJ.",
          "El consumo se calcula multiplicando potencia por tiempo. Un equipo de 2.000 W que funciona tres horas consume 6 kWh.",
        ],
      },
      {
        title: "Caloría y kilocaloría en nutrición",
        paragraphs: [
          "La caloría se definió históricamente como la energía para elevar en 1 °C la temperatura de un gramo de agua. En esta conversión, 1 cal equivale a 4,184 J.",
          "En etiquetas alimentarias, “calorías” suele significar kilocalorías (kcal). Así, un alimento de 200 calorías normalmente indica 200 kcal, no 200 cal.",
        ],
      },
      {
        title: "BTU y therm en climatización y gas",
        paragraphs: [
          "El BTU (British thermal unit) es una unidad tradicional usada para expresar capacidad de calefacción y aire acondicionado. Un BTU equivale aproximadamente a 1.055,06 J.",
          "El therm es una unidad grande usada en algunas facturas de gas natural y equivale a 100.000 BTU. La unidad de facturación depende del mercado y del proveedor.",
        ],
      },
      {
        title: "Electronvoltio en física subatómica",
        paragraphs: [
          "Un electronvoltio (eV) es la energía asociada al paso de una carga elemental por una diferencia de potencial de un voltio. Equivale exactamente a 1,602176634 × 10⁻¹⁹ J.",
          "Física atómica y de partículas usa eV, keV, MeV y GeV porque el julio daría números muy pequeños en esa escala.",
        ],
      },
      {
        title: "Principio de conservación de la energía",
        paragraphs: [
          "El principio de conservación establece que la energía no se crea ni se destruye: se transforma. En un sistema aislado, la energía total se mantiene constante.",
          "En un motor, la energía química del combustible pasa a energía térmica y mecánica. Parte termina como calor, pero no desaparece.",
        ],
      },
      {
        title: "¿Por qué convertir unidades de energía?",
        paragraphs: [
          "Electricidad, nutrición, climatización y gas usan unidades distintas. Convertirlas permite comparar consumo, eficiencia y costos con una referencia común.",
          "Por ejemplo, para comparar una bomba de calor y una caldera conviene expresar el consumo energético de ambos sistemas en kWh o julios.",
        ],
      },
    ],
    unitTable: [
      { name: "Julio", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Cálculos científicos y físicos" },
      { name: "Kilojulio", symbol: "kJ", referenceValue: "1.000 J", system: "SI/métrico", commonUse: "Energía alimentaria en algunos países" },
      { name: "Megajulio", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/métrico", commonUse: "Combustibles y grandes consumos" },
      { name: "Caloría", symbol: "cal", referenceValue: "4,184 J", system: "Métrico tradicional", commonUse: "Nutrición y química" },
      { name: "Kilocaloría", symbol: "kcal", referenceValue: "4.184 J", system: "Métrico tradicional", commonUse: "Etiquetas alimentarias" },
      { name: "Vatio-hora", symbol: "Wh", referenceValue: "3.600 J", system: "Electricidad", commonUse: "Aparatos pequeños" },
      { name: "Kilovatio-hora", symbol: "kWh", referenceValue: "3.600.000 J", system: "Electricidad", commonUse: "Facturación eléctrica" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1.055,06 J", system: "Británico/estadounidense", commonUse: "Climatización y calefacción" },
      { name: "Therm", symbol: "th", referenceValue: "≈105.506.000 J", system: "Británico/estadounidense", commonUse: "Facturación de gas natural" },
      { name: "Electronvoltio", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Física atómica y de partículas", commonUse: "Energía atómica y nuclear" },
    ],
  },
  {
    locale: "es",
    slug: "almacenamiento-de-datos",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversión de unidades de almacenamiento de datos",
    description:
      "Convierte entre bytes, kilobytes, megabytes, gigabytes y terabytes; compara bases 1.000 y 1.024.",
    introduction: [
      "Las unidades de datos describen información almacenada o procesada en un sistema digital. El bit es la unidad elemental; ocho bits forman un byte.",
      "El almacenamiento combina prefijos decimales —KB, MB, GB, TB, basados en 1.000— y binarios —KiB, MiB, GiB, TiB, basados en 1.024—. Distinguirlos evita confusiones al comparar capacidades.",
    ],
    facts: [
      { label: "Unidad más pequeña", value: "Bit (0 o 1)" },
      { label: "Unidad básica", value: "Byte = 8 bits" },
      { label: "Sistema decimal", value: "1 KB = 1.000 bytes; 1 MB = 1.000 KB" },
      { label: "Sistema binario IEC", value: "1 KiB = 1.024 bytes; 1 MiB = 1.024 KiB" },
      { label: "GB frente a GiB", value: "1 GB es ≈7,4 % menor que 1 GiB" },
    ],
    sections: [
      {
        title: "¿Qué son el bit y el byte?",
        paragraphs: [
          "El bit es un dígito binario que puede tomar 0 o 1. Ocho bits forman un byte, capaz de representar 256 valores distintos. La cantidad de bytes necesaria para un carácter depende de la codificación usada.",
          "Bit se abrevia con b minúscula y byte con B mayúscula. Mbps significa megabits por segundo, mientras MB indica megabytes: una conexión de 100 Mbps tiene un máximo teórico de 12,5 MB/s antes de considerar otras limitaciones.",
        ],
      },
      {
        title: "¿Por qué existen dos sistemas de unidades?",
        paragraphs: [
          "La memoria digital se organiza de forma natural en potencias de dos, como 1.024 o 1.048.576. Por eso históricamente muchos programas llamaron “kilobyte” a 1.024 bytes.",
          "Los fabricantes suelen expresar capacidad con prefijos decimales: 1 TB son exactamente 1.000.000.000.000 bytes. Si el sistema muestra ese total con una escala binaria, aparecerá cerca de 931 GiB; no faltan bytes, cambia la unidad mostrada.",
        ],
      },
      {
        title: "Estándar IEC: KiB, MiB y GiB",
        paragraphs: [
          "La Comisión Electrotécnica Internacional (IEC) definió kibibyte, mebibyte, gibibyte y tebibyte, con símbolos KiB, MiB, GiB y TiB, para las unidades binarias.",
          "Con esta convención, KB, MB y GB son decimales; KiB, MiB y GiB son binarios. Algunas aplicaciones aún usan los nombres de manera inconsistente, por lo que conviene revisar el símbolo.",
        ],
      },
      {
        title: "¿Por qué aumenta la diferencia?",
        paragraphs: [
          "La diferencia se multiplica en cada nivel: 1.000 frente a 1.024 es una diferencia pequeña, pero entre GB y GiB es de alrededor de 7,4 %, y entre TB y TiB ronda el 10 %.",
          "En capacidades grandes, la diferencia es visible. Un dispositivo de 1 TB decimal equivale aproximadamente a 0,91 TiB.",
        ],
      },
      {
        title: "Kilobit, megabit y gigabit por segundo",
        paragraphs: [
          "Los servicios de internet suelen anunciar velocidad en bits por segundo: kbps, Mbps o Gbps. Es la convención habitual de redes.",
          "Las descargas de archivos suelen mostrarse en bytes por segundo. Divide la cifra de Mbps entre ocho para obtener el máximo teórico en MB/s; la velocidad real puede ser menor por protocolo, red y servidor.",
        ],
      },
      {
        title: "Tamaños de datos cotidianos",
        paragraphs: [
          "Un documento de texto suele ocupar pocos KB; una foto comprimida, varios MB. El tamaño real depende del contenido, resolución, formato y compresión.",
          "El video puede requerir desde cientos de MB hasta decenas de GB. Resolución, duración, códec y tasa de bits cambian el resultado de forma considerable.",
        ],
      },
      {
        title: "Evolución del almacenamiento de datos",
        paragraphs: [
          "El IBM RAMAC 305, presentado en 1956, almacenaba unos 3,75 MB y ocupaba una gran instalación. Hoy, medios compactos pueden almacenar muchos millones de veces más.",
          "El crecimiento se debe a avances en discos magnéticos, memoria flash y otras tecnologías, junto con la reducción sostenida del costo por unidad de almacenamiento.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 bytes", system: "Binario", commonUse: "Velocidad de red" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bits)", system: "Unidad básica", commonUse: "Tamaño de archivos" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1.000 bytes", system: "Decimal", commonUse: "Documentos de texto" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1.024 bytes", system: "Binario IEC", commonUse: "Memoria del sistema" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 bytes", system: "Decimal", commonUse: "Fotos y música" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 bytes", system: "Binario IEC", commonUse: "Memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 bytes", system: "Decimal", commonUse: "Capacidad de disco" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 bytes", system: "Binario IEC", commonUse: "Capacidad mostrada en sistemas" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 bytes", system: "Decimal", commonUse: "Almacenamiento masivo" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1.000.000.000.000.000 bytes", system: "Decimal", commonUse: "Centros de datos y nube" },
    ],
  },
  {
    locale: "es",
    slug: "electricidad",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversión de unidades eléctricas",
    description:
      "Convierte voltio, kilovoltio, amperio y miliamperio; consulta los conceptos eléctricos básicos.",
    introduction: [
      "La electricidad reúne magnitudes relacionadas pero distintas, como tensión —diferencia de potencial— y corriente —flujo de carga—. Esta categoría incluye voltio y amperio, las más habituales en circuitos básicos.",
      "Tensión y corriente no se convierten directamente entre sí. Su relación depende de la resistencia, según la ley de Ohm: V = I × R. Esta página convierte cada magnitud dentro de su propia familia.",
    ],
    facts: [
      { label: "Unidad de tensión", value: "Voltio (V), por Alessandro Volta" },
      { label: "Unidad de corriente", value: "Amperio (A), por André-Marie Ampère" },
      { label: "Unidad básica del SI", value: "Amperio (A)" },
      { label: "Relación tensión-corriente-resistencia", value: "Ley de Ohm: V = I × R" },
      { label: "Red eléctrica regional", value: "La tensión, frecuencia y enchufe varían según país y zona" },
    ],
    sections: [
      {
        title: "¿Qué es la tensión (voltio)?",
        paragraphs: [
          "La tensión o voltaje expresa la diferencia de potencial eléctrico entre dos puntos de un circuito. Su unidad es el voltio (V).",
          "El voltio recibe su nombre de Alessandro Volta. Valores como 1,5 V o 9 V en una pila indican la diferencia de potencial nominal que puede suministrar.",
        ],
      },
      {
        title: "¿Qué es la corriente (amperio)?",
        paragraphs: [
          "La corriente eléctrica describe la carga que atraviesa un conductor por unidad de tiempo. Su unidad básica del SI es el amperio (A).",
          "El amperio recibe su nombre de André-Marie Ampère. Desde la revisión del SI de 2019, se define fijando el valor de la carga elemental.",
        ],
      },
      {
        title: "¿Por qué tensión y corriente no se convierten entre sí?",
        paragraphs: [
          "Tensión y corriente son magnitudes diferentes. Preguntar cuántos amperios equivalen a cierto voltaje no tiene respuesta sin conocer las características del circuito.",
          "La ley de Ohm las relaciona mediante V = I × R. Por ejemplo, 12 V sobre una resistencia de 4 Ω generan 3 A; con otra resistencia, los mismos 12 V generan otra corriente.",
        ],
      },
      {
        title: "Relación entre potencia, tensión y corriente",
        paragraphs: [
          "La potencia eléctrica se calcula como P = V × I. Para una misma potencia, elevar la tensión reduce la corriente necesaria.",
          "Las redes de transmisión usan alta tensión para transportar energía con menor corriente y reducir pérdidas resistivas en las líneas.",
        ],
      },
      {
        title: "Tensión de red en América Latina",
        paragraphs: [
          "América Latina no comparte un único estándar de tensión, frecuencia o enchufe. Estas condiciones pueden variar entre países y, en algunos casos, dentro de un mismo país.",
          "Antes de conectar un equipo traído de otra región, revisa la placa del fabricante, la tensión y frecuencia de la red local, y el tipo de enchufe. Un adaptador físico no siempre convierte voltaje.",
        ],
      },
      {
        title: "Corriente continua (CC) y alterna (CA)",
        paragraphs: [
          "En corriente continua, la carga circula en una sola dirección; pilas y paneles solares son ejemplos. En corriente alterna, la dirección se invierte periódicamente; la red eléctrica suele usar CA.",
          "La CA permite modificar la tensión mediante transformadores, lo que facilita la transmisión y distribución de electricidad.",
        ],
      },
      {
        title: "Seguridad frente a la corriente eléctrica",
        paragraphs: [
          "Una descarga eléctrica puede ser peligrosa según la tensión, la corriente disponible, la trayectoria por el cuerpo, el tiempo de contacto, la humedad y otros factores. No existe un umbral doméstico que pueda considerarse seguro en todas las situaciones.",
          "No manipules instalaciones energizadas ni equipos dañados. Ante una descarga o una instalación insegura, corta la energía solo si puede hacerse sin riesgo, busca ayuda de emergencia cuando corresponda y consulta a un profesional calificado.",
        ],
      },
    ],
    unitTable: [
      { name: "Milivoltio", symbol: "mV", referenceValue: "0,001 V", system: "SI/métrico", commonUse: "Sensores y señales bioeléctricas" },
      { name: "Voltio", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pilas y circuitos" },
      { name: "Kilovoltio", symbol: "kV", referenceValue: "1.000 V", system: "SI/métrico", commonUse: "Líneas de alta tensión" },
      { name: "Miliamperio", symbol: "mA", referenceValue: "0,001 A", system: "SI/métrico", commonUse: "Circuitos electrónicos" },
      { name: "Amperio", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Instalaciones y aparatos" },
      { name: "Kiloamperio", symbol: "kA", referenceValue: "1.000 A", system: "SI/métrico", commonUse: "Cortocircuitos e industria" },
    ],
  },
  {
    locale: "es",
    slug: "quilate-de-oro",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversión de quilates de oro",
    description:
      "Compara oro de 24, 22, 18 y 14 quilates según su proporción de oro fino.",
    introduction: [
      "El oro para joyería suele alearse con otros metales para mejorar dureza, color o resistencia. El quilate indica la proporción de oro fino de esa aleación.",
      "La escala se basa en 24 partes: 18 K equivale a 18/24, o 75 %, de oro fino nominal. Esta herramienta compara contenido de oro; no sustituye el contraste, el sello ni la tasación profesional de una pieza.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Estándar de pureza en joyería" },
      { label: "Referencia", value: "24 K = 24/24 de oro fino nominal" },
      { label: "Equivalencia de 18 K", value: "75 % de oro fino nominal" },
      { label: "Uso habitual", value: "La elección de quilataje depende del mercado y la pieza" },
      { label: "Cálculo de contenido fino", value: "Peso × (quilates / 24)" },
    ],
    sections: [
      {
        title: "¿Qué mide el quilate?",
        paragraphs: [
          "El quilate indica qué parte de la masa de una aleación corresponde a oro fino. Por ejemplo, 18 K representa 18 partes de oro por cada 24 partes totales, es decir, 75 % nominal.",
          "Las aleaciones de menor quilataje contienen más metales adicionales y pueden ofrecer mayor dureza. La composición concreta y el uso preferido varían según diseño, mercado y normativa.",
        ],
      },
      {
        title: "¿Cómo se calcula el contenido de oro fino?",
        paragraphs: [
          "Una pieza de 10 g y 22 K contiene nominalmente 10 × 22/24 = 9,17 g de oro fino. El resto corresponde a los demás metales de la aleación.",
          "Si se parte de 9,17 g de oro fino para obtener una aleación de 18 K, el peso total nominal sería 9,17 ÷ (18/24) = 12,22 g, tras añadir los metales de aleación adecuados.",
        ],
      },
      {
        title: "Usos de distintos quilatajes",
        paragraphs: [
          "Las aleaciones cercanas a 24 K se usan con frecuencia en lingotes y productos de inversión, aunque el sello y la finura declarada son los datos que deben verificarse.",
          "18 K y 14 K son habituales en joyería de uso diario. El quilataje disponible y la composición de la aleación dependen de la práctica comercial y normativa local.",
        ],
      },
    ],
    unitTable: [
      { name: "Oro de 24 quilates", symbol: "24K", referenceValue: "24/24 de oro fino nominal", system: "Joyería", commonUse: "Lingotes y productos de inversión" },
      { name: "Oro de 22 quilates", symbol: "22K", referenceValue: "91,7 % de oro fino nominal", system: "Joyería", commonUse: "Joyería y piezas tradicionales" },
      { name: "Oro de 18 quilates", symbol: "18K", referenceValue: "75 % de oro fino nominal", system: "Joyería", commonUse: "Anillos, collares y joyería diaria" },
      { name: "Oro de 14 quilates", symbol: "14K", referenceValue: "58,3 % de oro fino nominal", system: "Joyería", commonUse: "Joyería de uso diario" },
    ],
  },
  {
    locale: "es",
    slug: "ley-de-la-plata",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversión de leyes de plata",
    description:
      "Compara las leyes 999, 925, 900 y 800 según su contenido de plata fina.",
    introduction: [
      "La plata para joyería y objetos suele alearse con otros metales para mejorar su resistencia. La ley en milésimas indica qué proporción de la aleación corresponde a plata fina.",
      "A diferencia del quilataje del oro, la pureza de plata se expresa sobre 1.000 partes: 999 equivale a 99,9 % nominal y 925 es la conocida plata esterlina.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Milésimas" },
      { label: "Referencia", value: "999 = 99,9 % de plata fina nominal" },
      { label: "Ley común en joyería", value: "925 (plata esterlina)" },
      { label: "Plata para inversión", value: "La ley declarada debe verificarse en el sello" },
      { label: "Cálculo de contenido fino", value: "Peso × (ley / 1.000)" },
    ],
    sections: [
      {
        title: "¿Qué mide la ley de plata?",
        paragraphs: [
          "La pureza de la plata se expresa en milésimas, sobre una base de 1.000. Una ley 999 indica 999 partes de plata fina por cada 1.000 partes de aleación.",
          "La ley 925 indica 92,5 % de plata fina. El resto puede incluir cobre u otros metales de aleación que aportan resistencia; la composición exacta depende de la pieza.",
        ],
      },
      {
        title: "Plata esterlina 925",
        paragraphs: [
          "La ley 925 se consolidó históricamente como un estándar ampliamente reconocido para joyería, cubertería y objetos decorativos.",
          "Frente a la plata de mayor pureza, una aleación 925 suele ofrecer mejor resistencia para el uso cotidiano sin perder el aspecto característico de la plata.",
        ],
      },
      {
        title: "Diferencias entre leyes 999, 900 y 800",
        paragraphs: [
          "La ley 999 se usa con frecuencia en lingotes y productos donde interesa una alta proporción de plata fina. Su menor dureza limita ciertos usos cotidianos.",
          "La ley 900 aparece en monedas históricas de distintos países. La ley 800 se encuentra en algunos objetos y tradiciones europeas; sello, época y normativa son necesarios para identificar una pieza.",
        ],
      },
      {
        title: "¿Cómo se calcula la plata fina?",
        paragraphs: [
          "Un anillo de 10 g con ley 925 contiene nominalmente 10 × 925/1.000 = 9,25 g de plata fina. El resto corresponde a los metales de aleación.",
          "Para comparar pesos entre leyes, primero calcula el contenido fino y después divide por la proporción de la ley de destino. El resultado es una equivalencia teórica de masa, no una valoración comercial.",
        ],
      },
      {
        title: "Deslustre y pureza de la plata",
        paragraphs: [
          "El deslustre es un cambio superficial que puede aparecer al reaccionar la plata y los metales de la aleación con compuestos presentes en el ambiente. Pureza, composición, uso y almacenamiento influyen en él.",
          "Algunas aleaciones se diseñan para mejorar la resistencia al deslustre. El cuidado debe seguir las indicaciones del fabricante y evitar métodos que dañen piedras, baños o acabados.",
        ],
      },
    ],
    unitTable: [
      { name: "Plata 999", symbol: "999", referenceValue: "99,9 % de plata fina nominal", system: "Joyería y metales preciosos", commonUse: "Lingotes y productos de inversión" },
      { name: "Plata 925", symbol: "925", referenceValue: "92,5 % de plata fina nominal", system: "Joyería", commonUse: "Joyería y cubertería" },
      { name: "Plata 900", symbol: "900", referenceValue: "90 % de plata fina nominal", system: "Joyería y numismática", commonUse: "Monedas históricas" },
      { name: "Plata 800", symbol: "800", referenceValue: "80 % de plata fina nominal", system: "Joyería", commonUse: "Objetos y joyería europeos" },
    ],
  },
];

export function findEs419CategoryPage(slug: string) {
  return es419CategoryPages.find((page) => page.slug === slug);
}

export function findEs419CategoryPageByTurkishSlug(sourceSlug: string) {
  return es419CategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
