// Paginas de categoria en espanol -- integradas en el nuevo sistema i18n
// Archivo independiente y nuevo (no modifica los archivos existentes de
// tr/en/de/ar/uz/bn/fr).
//
// Alcance limitado deliberadamente a los 17 elementos que forman la
// identidad del sitio (13 categorias fundamentales + 4 herramientas
// universales en la pagina de inicio) -- sin calculadoras cientificas
// ni cotidianas. Contenido traducido con la misma profundidad que los
// articulos fuente en TR (app/converter/categoryArticles.ts y
// app/converter/articles/*/Article.ts).

import { buildSpanishScienceCategoryPages } from "./localizedSpanishScienceCategoryPages";

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

export const spanishCategoryPages: LocalizedSpanishCategoryPage[] = [
  {
    locale: "es",
    slug: "longitud",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversión de unidades de longitud",
    description:
      "Convierte gratis y al instante metros, kilómetros, centímetros, millas y pies; consulta fórmulas y tablas.",
    introduction: [
      "La longitud es una de las magnitudes físicas fundamentales. Sirve para describir la altura, el ancho o el grosor de un objeto, así como la distancia entre dos puntos. Según la dirección medida, un mismo objeto puede tener varias longitudes.",
      "En física, la longitud se representa normalmente con el símbolo dimensional L. De ella se derivan muchas magnitudes, como el área, el volumen, la velocidad, la aceleración, la presión y la densidad.",
      "En el Sistema Internacional de Unidades (SI), la unidad básica de longitud es el metro (m). Según la escala se emplean nanómetros, micrómetros, milímetros, centímetros o kilómetros. Fuera del sistema métrico, la pulgada, el pie, la yarda y la milla se siguen usando, especialmente en Estados Unidos y el Reino Unido.",
    ],
    facts: [
      { label: "Unidad básica del SI", value: "Metro" },
      { label: "Símbolo de la unidad SI", value: "m" },
      { label: "Magnitud física", value: "Longitud" },
      { label: "Símbolo dimensional", value: "L" },
      { label: "Definición actual del metro", value: "Distancia recorrida por la luz en el vacío en 1/299 792 458 de segundo" },
    ],
    sections: [
      {
        title: "¿Qué es la longitud?",
        paragraphs: [
          "La longitud describe la altura, el ancho o la profundidad de un objeto, así como la distancia entre dos puntos; es una de las magnitudes físicas fundamentales. Según la dirección medida, un mismo objeto puede presentar varias longitudes.",
          "En física, la longitud se representa con el símbolo dimensional L. Numerosas magnitudes derivadas, como el área, el volumen, la velocidad, la aceleración, la presión y la densidad, se definen a partir de esta dimensión.",
        ],
      },
      {
        title: "La unidad SI de longitud",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad básica de longitud es el metro, simbolizado por m. El metro sirve como referencia para definir todas las demás unidades de longitud.",
          "Las unidades métricas, como el kilómetro, el centímetro, el milímetro, el micrómetro y el nanómetro, se relacionan con el metro mediante múltiplos y submúltiplos decimales. Esta estructura permite convertirlas con potencias de diez.",
        ],
      },
      {
        title: "La definición científica del metro",
        paragraphs: [
          "En el pasado, el metro se definía a partir de las dimensiones de la Tierra y de patrones físicos. El avance de la tecnología de medición hizo necesaria una definición más estable y reproducible en cualquier lugar del mundo.",
          "Hoy, un metro se define como la longitud recorrida por la luz en el vacío durante 1/299 792 458 de segundo. Esta definición se basa en que la velocidad de la luz en el vacío está fijada exactamente en 299 792 458 metros por segundo.",
        ],
      },
      {
        title: "Las unidades métricas de longitud",
        paragraphs: [
          "En el sistema métrico, las unidades se relacionan con el metro mediante potencias positivas o negativas de diez. Un kilómetro equivale a 1 000 metros, un centímetro a 0,01 metros y un milímetro a 0,001 metros.",
          "Para longitudes muy pequeñas se usan el micrómetro, el nanómetro y el picómetro. Las células suelen medirse en micrómetros, las longitudes de onda en nanómetros y algunas distancias atómicas en picómetros.",
        ],
      },
      {
        title: "Las unidades de longitud fuera del sistema métrico",
        paragraphs: [
          "La pulgada, el pie, la yarda y la milla terrestre son unidades comunes fuera del sistema métrico. Se emplean especialmente en Estados Unidos y en aplicaciones ligadas a la tradición británica.",
          "Una pulgada equivale exactamente a 2,54 centímetros, un pie a 12 pulgadas y una yarda a 3 pies. Una milla terrestre se define exactamente como 1 609,344 metros.",
        ],
      },
      {
        title: "La longitud en la navegación marítima y aérea",
        paragraphs: [
          "En navegación marítima y aérea, las distancias suelen expresarse en millas náuticas. Una milla náutica equivale exactamente a 1 852 metros.",
          "La milla náutica se desarrolló a partir de una referencia histórica vinculada a las coordenadas geográficas de la Tierra. El nudo, una unidad de velocidad, equivale a una milla náutica por hora.",
        ],
      },
      {
        title: "¿Cómo se mide la longitud?",
        paragraphs: [
          "En las mediciones cotidianas se usan herramientas como la regla, la cinta métrica, el calibre y el micrómetro. La precisión elegida depende del tamaño del objeto y del nivel de exactitud necesario.",
          "En ingeniería e investigación científica se emplean telémetros láser, máquinas de medición por coordenadas, interferómetros y otros sistemas de medición óptica.",
        ],
      },
      {
        title: "Precisión de medición e incertidumbre",
        paragraphs: [
          "Ninguna medición física es absolutamente perfecta. Su resultado siempre incluye cierta incertidumbre, relacionada con la resolución y calibración del instrumento, las condiciones ambientales y el método aplicado.",
          "Por ello, los resultados científicos deben indicar el valor medido, su incertidumbre y la unidad empleada. En ingeniería de precisión, incluso una variación de temperatura puede afectar a la longitud de un material.",
        ],
      },
      {
        title: "¿Cómo se convierten las unidades de longitud?",
        paragraphs: [
          "Para convertir dentro de un mismo sistema de medida se usa la relación entre unidades. Para pasar de metros a kilómetros, se divide entre 1 000; para pasar de kilómetros a metros, se multiplica por 1 000.",
          "Entre el sistema métrico y las unidades británicas o estadounidenses se aplican coeficientes exactos. Por ejemplo, para convertir pulgadas a centímetros se multiplica por 2,54.",
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
      { name: "Kilómetro", symbol: "km", referenceValue: "1 000 m", system: "SI/métrico", commonUse: "Distancias viales y geográficas" },
      { name: "Pulgada", symbol: "in", referenceValue: "0,0254 m", system: "Británico/estadounidense", commonUse: "Pantallas, tuberías y medidas técnicas" },
      { name: "Pie", symbol: "ft", referenceValue: "0,3048 m", system: "Británico/estadounidense", commonUse: "Altura, construcción y aviación" },
      { name: "Yarda", symbol: "yd", referenceValue: "0,9144 m", system: "Británico/estadounidense", commonUse: "Campos deportivos y medición de distancias" },
      { name: "Milla", symbol: "mi", referenceValue: "1 609,344 m", system: "Británico/estadounidense", commonUse: "Distancias por carretera" },
      { name: "Milla náutica", symbol: "nmi", referenceValue: "1 852 m", system: "Navegación marítima", commonUse: "Navegación marítima y aérea" },
    ],
  },
  {
    locale: "es",
    slug: "superficie",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversión de unidades de superficie",
    description:
      "Convierte superficies entre metros cuadrados, hectáreas y pies cuadrados; útil para terrenos, edificios y construcción.",
    introduction: [
      "La superficie es una magnitud física derivada que expresa la extensión de una región bidimensional. Como resulta del producto de una longitud por sí misma, su dimensión es longitud al cuadrado (L²).",
      "En el Sistema Internacional de Unidades, la unidad derivada de superficie es el metro cuadrado (m²). En agricultura se usan la hectárea y unidades locales; en el sistema británico y estadounidense, el pie cuadrado y el acre. En el sur de Asia siguen siendo habituales unidades como el bigha y el katha.",
    ],
    facts: [
      { label: "Magnitud física", value: "Superficie" },
      { label: "Símbolo dimensional", value: "[L²]" },
      { label: "Unidad derivada del SI", value: "Metro cuadrado" },
      { label: "Símbolo de la unidad SI", value: "m²" },
      { label: "Fórmula básica (rectángulo)", value: "Superficie = longitud × anchura" },
    ],
    sections: [
      {
        title: "¿Qué es la superficie?",
        paragraphs: [
          "La superficie expresa la extensión de una región plana. El tamaño de un terreno, el suelo de una habitación o una hoja de papel se mide en unidades de superficie.",
          "Es una magnitud derivada: se obtiene multiplicando una unidad de longitud por sí misma. Por eso su dimensión SI es L² y se trata siempre de una magnitud escalar positiva.",
        ],
      },
      {
        title: "La unidad SI de la superficie: el metro cuadrado",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada de superficie es el metro cuadrado (m²): la superficie de un cuadrado cuyo lado mide exactamente un metro.",
          "No es una unidad básica independiente, sino una unidad derivada de elevar el metro al cuadrado. Las demás unidades métricas de superficie se relacionan con ella mediante potencias de diez.",
        ],
      },
      {
        title: "¿Por qué las unidades de superficie se convierten con una razón cuadrática?",
        paragraphs: [
          "En una conversión de superficie, la relación de longitud debe elevarse al cuadrado. Un kilómetro equivale a 1 000 metros, pero un kilómetro cuadrado equivale a 1 000² metros cuadrados, es decir, 1 000 000 m².",
          "Esto ocurre porque longitud y anchura cambian en la misma proporción. Olvidar la relación cuadrática es el error más frecuente: 1 km² no equivale a 1 000 m².",
        ],
      },
      {
        title: "Las unidades métricas de superficie",
        paragraphs: [
          "En el sistema métrico se usan el milímetro cuadrado y el centímetro cuadrado para superficies pequeñas, el metro cuadrado en las mediciones cotidianas y el kilómetro cuadrado para grandes extensiones. Un centímetro cuadrado equivale a 0,0001 m² y un kilómetro cuadrado a 1 000 000 m².",
          "Para los terrenos se usan el área, de 100 m², y la hectárea, de 10 000 m². La hectárea es la unidad métrica más habitual para expresar la superficie de tierras agrícolas.",
        ],
      },
      {
        title: "Unidades tradicionales de terreno en Turquía",
        paragraphs: [
          "En Turquía, el dönüm y el dekar son unidades habituales para las tierras agrícolas. Actualmente ambos equivalen a 1 000 m²; dekar es el término oficial y dönüm el tradicional de uso cotidiano.",
          "En época otomana, el valor del dönüm variaba por región entre 900 y 1 600 m². La ley de pesos y medidas de 1931 lo alineó con el dekar y lo fijó en exactamente 1 000 m².",
        ],
      },
      {
        title: "Las unidades de superficie británicas y estadounidenses",
        paragraphs: [
          "El pie cuadrado (ft²) y la pulgada cuadrada (in²) se usan para superficies pequeñas, mientras que el acre se emplea para grandes parcelas en los sistemas británico y estadounidense. Un acre equivale exactamente a 4 046,856 422 4 m².",
          "El origen histórico del acre se relaciona con la superficie que una yunta de bueyes podía arar en un día. Sigue siendo muy habitual en anuncios inmobiliarios de Estados Unidos, el Reino Unido y países de la Commonwealth.",
        ],
      },
      {
        title: "Las unidades de terreno del sur de Asia",
        paragraphs: [
          "En India, Bangladesh, Pakistán y Nepal se siguen usando unidades locales como bigha, katha, killa, kanal, marla, guntha, biswa y decimal. Su valor puede variar mucho entre regiones, incluso cuando comparten el mismo nombre.",
          "Por ejemplo, un bigha equivale a unos 1 338 m² en Bengala Occidental, pero puede tener otro valor en otra región. En una transacción inmobiliaria es esencial confirmar el estándar regional aplicado.",
        ],
      },
      {
        title: "¿Cómo se calcula una superficie?",
        paragraphs: [
          "Para un rectángulo, la fórmula es superficie = longitud × anchura. Para un triángulo, superficie = (base × altura) / 2; para un círculo, superficie = π × radio².",
          "En terrenos irregulares, se puede dividir la forma en rectángulos o triángulos más pequeños, calcular cada parte y sumarlas. Las mediciones catastrales también emplean fórmulas de polígonos basadas en coordenadas.",
        ],
      },
      {
        title: "Aspectos a tener en cuenta al medir superficies",
        paragraphs: [
          "La superficie de un anuncio inmobiliario o de una escritura debe leerse junto con su unidad —m², dönüm, acre, bigha— y el estándar regional que la define.",
          "En transacciones internacionales, usar el equivalente exacto en metros cuadrados evita malentendidos. La herramienta de esta página compara todas las unidades a partir de una referencia común en metros cuadrados.",
        ],
      },
    ],
    unitTable: [
      { name: "Milímetro cuadrado", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/métrico", commonUse: "Dibujo técnico y superficies pequeñas" },
      { name: "Centímetro cuadrado", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/métrico", commonUse: "Superficies de objetos pequeños" },
      { name: "Metro cuadrado", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Vivienda, oficina y terreno" },
      { name: "Área", symbol: "a", referenceValue: "100 m²", system: "Métrico", commonUse: "Parcelas pequeñas" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1 000 m²", system: "Turquía (métrico)", commonUse: "Tierras agrícolas" },
      { name: "Hectárea", symbol: "ha", referenceValue: "10 000 m²", system: "Métrico", commonUse: "Grandes tierras agrícolas y forestales" },
      { name: "Kilómetro cuadrado", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/métrico", commonUse: "Ciudades, países y zonas geográficas" },
      { name: "Pie cuadrado", symbol: "ft²", referenceValue: "0,092903 m²", system: "Británico/estadounidense", commonUse: "Superficie de vivienda (US/UK)" },
      { name: "Yarda cuadrada", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Británico/estadounidense", commonUse: "Campos deportivos y textil" },
      { name: "Acre", symbol: "ac", referenceValue: "4 046,856 422 4 m²", system: "Británico/estadounidense", commonUse: "Grandes parcelas" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1 337,8 m² (variable según la región)", system: "Sur de Asia", commonUse: "Tierras agrícolas en India y Bangladés" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japón", commonUse: "Vivienda y terreno en Japón" },
    ],
  },
  {
    locale: "es",
    slug: "volumen",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversión de unidades de volumen",
    description:
      "Convierte volúmenes entre litros, mililitros y metros cúbicos; compara las unidades habituales para líquidos y recipientes.",
    introduction: [
      "El volumen es una magnitud física derivada que expresa el espacio ocupado por un objeto o contenido en un recipiente tridimensional. Surge del producto de una longitud en tres dimensiones —largo × ancho × alto—, por lo que su dimensión es L³ (longitud al cubo).",
      "En el Sistema Internacional de Unidades, la unidad derivada de volumen es el metro cúbico (m³). En la vida cotidiana son más habituales el litro y el mililitro. En cocina se usan la taza, la cucharada y la cucharadita; los sistemas estadounidense y británico emplean también el galón, el cuarto, la pinta y la onza líquida.",
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
          "El volumen es la extensión del espacio tridimensional que ocupa un objeto o que puede contener un recipiente. En un sólido describe el espacio que ocupa; en un recipiente, la cantidad de líquido o gas que puede albergar.",
          "Es una magnitud derivada: se obtiene al multiplicar una unidad de longitud en tres dimensiones —anchura, altura y profundidad—. Por eso su dimensión en el SI es L³.",
        ],
      },
      {
        title: "La unidad del SI para el volumen: el metro cúbico",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada de volumen es el metro cúbico (m³): el volumen de un cubo con un metro de lado.",
          "El metro cúbico se utiliza para volúmenes grandes, como depósitos de agua, hormigón vertido o contenedores. Para cantidades cotidianas suele emplearse el litro. Un metro cúbico equivale exactamente a 1.000 litros.",
        ],
      },
      {
        title: "La relación entre el litro y el metro cúbico",
        paragraphs: [
          "El litro es una unidad de volumen aceptada para su uso con el SI, aunque no forma parte de sus unidades. Equivale al volumen de un cubo de 10 centímetros de lado: 1.000 centímetros cúbicos.",
          "Los submúltiplos del litro —decilitro, centilitro y mililitro— se usan en alimentos, medicamentos y laboratorio. Un mililitro equivale exactamente a un centímetro cúbico (1 mL = 1 cm³).",
        ],
      },
      {
        title: "¿Por qué las unidades de volumen se convierten con una razón cúbica?",
        paragraphs: [
          "Mientras que las longitudes se convierten con una razón lineal y las superficies con una razón cuadrática, los volúmenes se convierten con una razón cúbica. Por ejemplo, 1 metro equivale a 100 centímetros, pero 1 metro cúbico equivale a 100³ centímetros cúbicos: 1.000.000 cm³.",
          "La razón es que el volumen cambia a la vez en tres dimensiones. Olvidar este cubo es un error frecuente, especialmente al convertir entre unidades métricas y unidades como el galón o el pie cúbico.",
        ],
      },
      {
        title: "Las medidas de cocina",
        paragraphs: [
          "Las medidas de receta, como la cucharada, la cucharadita y la taza, son unidades de volumen prácticas. En muchas recetas se toma 1 cucharada ≈ 15 mL, 1 cucharadita ≈ 5 mL y 1 taza ≈ 240 mL.",
          "No todas las tazas tienen la misma capacidad según el país o la fuente. En elaboraciones que exigen precisión, especialmente en repostería, conviene seguir la equivalencia indicada en la receta o pesar los ingredientes con una báscula digital.",
        ],
      },
      {
        title: "Las unidades de volumen líquido estadounidenses y británicas",
        paragraphs: [
          "Los sistemas estadounidense y británico usan unidades como el galón, el cuarto, la pinta y la onza líquida, pero sus valores no siempre coinciden. Un galón estadounidense equivale a 3,78541 litros; un galón imperial británico, a 4,54609 litros: cerca de un 20 % más.",
          "La diferencia procede de que ambos países adoptaron históricamente galones de referencia distintos. Antes de convertir una receta o una etiqueta, hay que comprobar si el galón o la onza líquida pertenecen al sistema estadounidense o al imperial británico.",
        ],
      },
      {
        title: "Las unidades de volumen agrícolas e históricas",
        paragraphs: [
          "El bushel y el peck son unidades de volumen empleadas históricamente para productos secos, como cereales, frutas y verduras. Aún se utilizan en determinados mercados agrícolas, especialmente en Estados Unidos.",
          "En época otomana, el kile y el şinik eran unidades tradicionales para medir cereales; 1 kile equivalía a 20 şinik. Sus valores podían variar según la región, por lo que hoy se consultan sobre todo para interpretar textos y registros históricos.",
        ],
      },
      {
        title: "¿Cómo se calcula un volumen?",
        paragraphs: [
          "Para un prisma rectangular se usa la fórmula volumen = longitud × anchura × altura. Para un cilindro, volumen = π × radio² × altura; para una esfera, volumen = (4/3) × π × radio³.",
          "El volumen de sólidos irregulares puede determinarse por desplazamiento de líquido: se sumerge el objeto y se mide el aumento de volumen. Este procedimiento se basa en el principio de Arquímedes.",
        ],
      },
      {
        title: "Medición del volumen en el petróleo y la industria",
        paragraphs: [
          "En la industria petrolera, el volumen suele expresarse en barriles (bbl): 1 barril equivale exactamente a 158,987 litros, o 42 galones estadounidenses. La unidad procede de una convención histórica del transporte de petróleo.",
          "En los procesos industriales, los volúmenes grandes suelen expresarse en metros cúbicos y las mediciones pequeñas de laboratorio en mililitros. La unidad adecuada depende de la escala y del contexto de la medición.",
        ],
      },
    ],
    unitTable: [
      { name: "Mililitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/métrico", commonUse: "Dosis médicas y mediciones pequeñas" },
      { name: "Cucharadita", symbol: "cdta", referenceValue: "0,000005 m³ (≈5 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Cucharada", symbol: "cda", referenceValue: "0,000015 m³ (≈15 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Taza", symbol: "taza", referenceValue: "0,00024 m³ (≈240 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Métrico", commonUse: "Bebidas, combustible y volumen cotidiano" },
      { name: "Onza líquida (EE. UU.)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Estados Unidos", commonUse: "Bebidas y envases cosméticos" },
      { name: "Pinta (EE. UU.)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Estados Unidos", commonUse: "Medición de cerveza y leche" },
      { name: "Galón (EE. UU.)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Estados Unidos", commonUse: "Combustible y grandes volúmenes líquidos" },
      { name: "Galón imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Británico (imperial)", commonUse: "Combustible y medición de líquidos en el Reino Unido" },
      { name: "Pie cúbico", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Británico/estadounidense", commonUse: "Construcción y caudal de aire en climatización" },
      { name: "Barril de petróleo", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industria petrolera", commonUse: "Medición de petróleo crudo" },
      { name: "Metro cúbico", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Depósitos de agua, hormigón y grandes volúmenes" },
    ],
  },
  {
    locale: "es",
    slug: "masa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversión de unidades de masa",
    description:
      "Convierte rápidamente entre kilogramos, gramos, miligramos, toneladas y libras.",
    introduction: [
      "La masa es una magnitud física fundamental relacionada con la cantidad de materia de un objeto y con su inercia. En el Sistema Internacional de Unidades, su unidad básica es el kilogramo (kg).",
      "En el lenguaje cotidiano, masa y peso se usan a menudo como sinónimos, pero son magnitudes distintas. La masa se expresa en kilogramos; el peso es una fuerza y se mide en newtons.",
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
          "La masa expresa la resistencia de un objeto a cambiar su estado de movimiento, es decir, su inercia. En mecánica clásica, la relación entre fuerza neta y aceleración se resume en F = m·a.",
          "Con la misma fuerza, un objeto de mayor masa adquiere una aceleración menor. La masa no solo describe, en sentido cotidiano, la cantidad de materia: también es esencial para las ecuaciones del movimiento.",
          "Es una magnitud escalar, sin dirección. Su símbolo dimensional en el SI es M.",
        ],
      },
      {
        title: "La diferencia entre masa y peso",
        paragraphs: [
          "La masa y el peso no son la misma magnitud. La masa es una propiedad del objeto y se expresa en kilogramos. El peso es la fuerza gravitatoria que actúa sobre él y se mide en newtons.",
          "De forma simplificada, el peso se expresa como W = m·g, donde W es la fuerza peso, m la masa y g la aceleración de la gravedad local.",
          "La masa de un objeto es prácticamente la misma en la Tierra y en la Luna; su peso cambia porque la gravedad local es diferente. Por eso el kilogramo es, científicamente, una unidad de masa y no de peso.",
          "Como una báscula doméstica muestra el resultado en kilogramos, en el uso diario se confunden ambas palabras. El instrumento detecta una fuerza, pero está calibrado para presentar una masa equivalente.",
        ],
      },
      {
        title: "¿Por qué el kilogramo es la unidad básica del SI para la masa?",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad básica de masa es el kilogramo. Es la única unidad básica del SI cuyo nombre ya incorpora un prefijo.",
          "El gramo tuvo un papel central en las primeras definiciones de masa del sistema métrico. Al establecerse los patrones prácticos, el kilogramo pasó a ser la referencia fundamental.",
          "Desde 2019, el kilogramo ya no se define por un cilindro metálico físico, sino por un valor fijo de la constante de Planck. Esta definición permite reproducir la unidad mediante mediciones físicas trazables.",
        ],
      },
      {
        title: "Las unidades métricas de masa",
        paragraphs: [
          "Las unidades métricas de masa se expresan mediante el kilogramo, el gramo y los prefijos del SI. Un gramo equivale a 0,001 kg; un miligramo, a 0,001 g; y un microgramo, a 0,001 mg.",
          "Para masas grandes se emplea la tonelada métrica, equivalente exactamente a 1.000 kilogramos. Su símbolo, aceptado para su uso con el SI, es t.",
          "La unidad se elige según la escala: una persona o un producto se expresan en kilogramos, un alimento en gramos, el principio activo de un medicamento en miligramos o microgramos y la carga de un vehículo en toneladas.",
        ],
      },
      {
        title: "La relación entre la libra, la onza y el kilogramo",
        paragraphs: [
          "La libra y la onza son unidades de masa tradicionales en los sistemas británico y estadounidense. La libra internacional avoirdupois equivale exactamente a 0,45359237 kilogramos.",
          "Una libra avoirdupois se divide en 16 onzas. Una onza equivale exactamente a 28,349523125 gramos.",
          "La libra de masa y la libra-fuerza (pound-force) son magnitudes distintas. En cálculos técnicos no deben confundirse los símbolos lb y lbf.",
        ],
      },
      {
        title: "¿Cómo se mide la masa?",
        paragraphs: [
          "La masa se mide con balanzas de dos platillos, básculas electrónicas, balanzas analíticas, células de carga y sistemas industriales de pesaje.",
          "Las balanzas comparativas contrastan una masa desconocida con masas patrón trazables. En las básculas electrónicas, las células de carga convierten la fuerza aplicada en una señal eléctrica.",
          "En mediciones de alta precisión influyen el empuje del aire, la gravedad local, la temperatura, la humedad, las vibraciones, los efectos electrostáticos y la densidad de las masas patrón.",
          "La conexión de los patrones con los sistemas nacionales e internacionales se denomina trazabilidad metrológica. La cadena de calibración permite comparar resultados entre laboratorios y empresas.",
        ],
      },
      {
        title: "La relación entre densidad, volumen y masa",
        paragraphs: [
          "La masa, la densidad y el volumen se relacionan mediante m = ρ·V, donde m es la masa, ρ la densidad y V el volumen.",
          "A igual volumen, dos materiales pueden tener masas diferentes por su distinta densidad. El acero y el agua, por ejemplo, no tienen la misma masa para un mismo volumen.",
          "La unidad derivada de densidad en el SI es el kilogramo por metro cúbico. En laboratorio también son frecuentes el gramo por centímetro cúbico y el gramo por mililitro.",
        ],
      },
      {
        title: "La incertidumbre en la medición de masa",
        paragraphs: [
          "Toda medición real tiene incertidumbre. Que una báscula muestre muchas cifras no significa que todas se conozcan con la misma precisión.",
          "La resolución, repetibilidad, no linealidad, patrón de calibración, condiciones ambientales y método de uso pueden contribuir a la incertidumbre de una medición de masa.",
          "En trabajos científicos e industriales, un resultado debe presentarse con la unidad adecuada, cifras significativas coherentes e información sobre su incertidumbre.",
        ],
      },
      {
        title: "¿Cómo elegir la unidad de masa adecuada?",
        paragraphs: [
          "Elegir una unidad acorde con la escala hace el resultado más legible: una persona se expresa en kilogramos, el principio activo de una pastilla en miligramos y la carga de un camión en toneladas.",
          "Para masas muy pequeñas se usan prefijos como micro-, nano- y pico-. A escala atómica y molecular, la unidad de masa atómica unificada puede resultar más práctica.",
          "Al convertir, hay que comprobar tanto el valor numérico como si la unidad expresa masa o fuerza.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogramo", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Cantidades de materia muy pequeñas" },
      { name: "Microgramo", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Mediciones médicas y de laboratorio" },
      { name: "Miligramo", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Dosis de medicamentos y sustancias químicas" },
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
      "La temperatura es una magnitud física fundamental que describe el estado térmico de un sistema. Está relacionada con la energía microscópica de sus partículas; en el Sistema Internacional de Unidades, su unidad básica es el kelvin.",
      "En la vida cotidiana se usan sobre todo las escalas Celsius y Fahrenheit; en ciencia se emplea el kelvin y, en algunos cálculos de ingeniería, el Rankine. A diferencia de otras magnitudes, convertir entre estas escalas requiere a menudo sumar o restar, además de multiplicar.",
    ],
    facts: [
      { label: "Magnitud física", value: "Temperatura termodinámica" },
      { label: "Símbolo dimensional", value: "[Θ]" },
      { label: "Unidad básica del SI", value: "Kelvin" },
      { label: "Símbolo de la unidad SI", value: "K" },
      { label: "Cero absoluto", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "¿Qué es la temperatura?",
        paragraphs: [
          "La temperatura está relacionada con la energía de movimiento de los átomos y moléculas de un sistema. En términos sencillos, una mayor agitación térmica suele corresponder a una temperatura más alta.",
          "Es una de las siete magnitudes básicas del Sistema Internacional de Unidades y se representa como temperatura termodinámica con el símbolo Θ. No es directamente aditiva: al poner en contacto dos cuerpos no se suman sus temperaturas, sino que intercambian energía hasta aproximarse al equilibrio térmico.",
        ],
      },
      {
        title: "La unidad del SI para la temperatura: el kelvin",
        paragraphs: [
          "El kelvin es la unidad básica del SI para la temperatura y su símbolo es K, sin signo de grado. La escala Kelvin parte del cero absoluto: 0 K.",
          "Desde la revisión del SI de 2019, el kelvin se define a partir de un valor fijo de la constante de Boltzmann (k), no del punto triple del agua. Así, la unidad se basa en una constante universal y no en una sustancia de referencia.",
        ],
      },
      {
        title: "¿Por qué la conversión de temperatura no es una simple multiplicación?",
        paragraphs: [
          "En magnitudes como longitud o masa basta un factor multiplicativo. Las escalas Celsius, Fahrenheit y Kelvin tienen orígenes distintos, por lo que la conversión entre ellas puede requerir multiplicar y también sumar o restar.",
          "Para pasar de Celsius a Fahrenheit, por ejemplo, se multiplica por 9/5 y se suma 32: °F = (°C × 9/5) + 32. Esta es una relación afín: lineal, pero no pasa por el origen.",
        ],
      },
      {
        title: "La escala Celsius",
        paragraphs: [
          "La escala Celsius se asocia al astrónomo sueco Anders Celsius. En condiciones de presión estándar, sitúa la congelación del agua en 0 °C y su ebullición en 100 °C, referencias prácticas para la vida cotidiana.",
          "Celsius es la escala de uso habitual en la mayor parte del mundo y en mucha información científica y meteorológica. Estados Unidos mantiene principalmente Fahrenheit en el uso diario.",
        ],
      },
      {
        title: "La escala Fahrenheit",
        paragraphs: [
          "La escala Fahrenheit fue desarrollada por el físico Daniel Gabriel Fahrenheit. A presión estándar, el agua se congela a 32 °F y hierve a 212 °F, una separación de 180 grados.",
          "Fahrenheit sigue utilizándose para temperaturas cotidianas sobre todo en Estados Unidos. En el trabajo científico internacional predominan Celsius y kelvin.",
        ],
      },
      {
        title: "Rankine y Réaumur: escalas menos conocidas",
        paragraphs: [
          "Rankine es una escala absoluta que conserva el tamaño del grado Fahrenheit y toma el cero absoluto como 0 °R. El agua se congela a 491,67 °R; la escala aparece en determinados cálculos termodinámicos de ingeniería en Estados Unidos.",
          "La escala Réaumur, creada en el siglo XVIII por René Réaumur, sitúa la congelación del agua en 0 °Ré y la ebullición en 80 °Ré. Hoy es poco habitual, pero puede aparecer en fuentes históricas y recetas tradicionales.",
        ],
      },
      {
        title: "¿Qué significa el cero absoluto?",
        paragraphs: [
          "El cero absoluto (0 K, −273,15 °C y −459,67 °F) es el límite inferior de la escala termodinámica. En la descripción clásica corresponde a la menor energía cinética posible de las partículas.",
          "La mecánica cuántica establece que permanece energía de punto cero; además, el tercer principio de la termodinámica impide alcanzar exactamente el cero absoluto mediante un número finito de procesos. En laboratorio se consiguen temperaturas extremadamente próximas.",
        ],
      },
      {
        title: "¿Cómo se mide la temperatura?",
        paragraphs: [
          "La temperatura se mide con termómetros de líquido, digitales, termopares, termómetros de resistencia (RTD) e infrarrojos sin contacto. Cada tecnología tiene un intervalo, precisión y uso adecuados.",
          "Los termopares son habituales en industria por su amplio rango de trabajo. Estiman la temperatura a partir de la tensión que aparece en la unión de dos metales distintos.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unidad básica", system: "SI", commonUse: "Cálculos científicos y termodinámicos" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Métrico (uso cotidiano)", commonUse: "Meteorología, vida cotidiana y ciencia" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Estados Unidos", commonUse: "Meteorología diaria en Estados Unidos" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Estados Unidos (ingeniería)", commonUse: "Cálculos de ingeniería termodinámica" },
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
      "Convierte en una sola página las unidades de tiempo esenciales entre segundos, minutos y horas.",
    introduction: [
      "El tiempo es una magnitud física fundamental que ordena los sucesos y expresa la duración que los separa. En el Sistema Internacional de Unidades, la unidad básica es el segundo; en la vida cotidiana se emplean también el minuto, la hora y el día.",
      "La medición del tiempo es una de las prácticas más antiguas de la humanidad. La estructura sexagesimal —base 60— de la hora, el minuto y el segundo procede de tradiciones matemáticas de la antigua Mesopotamia.",
    ],
    facts: [
      { label: "Magnitud física", value: "Tiempo" },
      { label: "Símbolo dimensional", value: "[T]" },
      { label: "Unidad básica del SI", value: "Segundo" },
      { label: "Símbolo de la unidad SI", value: "s" },
      { label: "Definición actual del segundo", value: "9.192.631.770 períodos de oscilación del átomo de cesio-133" },
    ],
    sections: [
      {
        title: "¿Qué es el tiempo?",
        paragraphs: [
          "El tiempo expresa el orden de los sucesos y la duración transcurrida entre ellos. En física se representa con T e interviene en magnitudes derivadas como la velocidad, la aceleración y la frecuencia.",
          "En la física clásica se consideraba que el tiempo transcurría igual para todos los observadores. La relatividad de Einstein mostró que puede transcurrir de forma diferente según la velocidad y el campo gravitatorio: es la dilatación del tiempo.",
        ],
      },
      {
        title: "La unidad del SI para el tiempo: el segundo",
        paragraphs: [
          "El segundo es la unidad básica del SI para el tiempo y se simboliza con s. Históricamente se definía como 1/86.400 de un día: 24 horas × 60 minutos × 60 segundos.",
          "Como la rotación terrestre no es perfectamente regular, desde 1967 el segundo se define por 9.192.631.770 períodos de la radiación asociada a una transición del átomo de cesio-133. Esta referencia permite mantener relojes atómicos comparables en todo el mundo.",
        ],
      },
      {
        title: "El origen sexagesimal de la hora, el minuto y el segundo",
        paragraphs: [
          "La división de una hora en 60 minutos y de un minuto en 60 segundos se relaciona con el sistema sexagesimal usado en la antigua Mesopotamia. Ese sistema también influyó en la división del ángulo en 360 grados.",
          "El número 60 resulta práctico porque tiene muchos divisores —2, 3, 4, 5, 6, 10, 12, 15, 20 y 30—. Así es fácil dividir una hora en partes iguales sin recurrir a fracciones incómodas.",
        ],
      },
      {
        title: "La división del día en 24 horas",
        paragraphs: [
          "La división del día en 24 horas se remonta al Antiguo Egipto. El periodo de luz se dividía en 12 partes y la noche en otras 12, mediante relojes de sol y observación de las estrellas.",
          "La elección del 12 se ha relacionado con el recuento de falanges de los dedos y con los ciclos lunares anuales. Es una explicación histórica plausible, no una única causa demostrada.",
        ],
      },
      {
        title: "La relación entre las unidades de tiempo",
        paragraphs: [
          "Los submúltiplos del segundo —milisegundo, microsegundo y nanosegundo— se usan para sucesos muy breves, como operaciones informáticas, cronometraje deportivo y experimentos científicos.",
          "El minuto equivale a 60 segundos, la hora a 3.600 segundos y el día a 86.400 segundos. A diferencia de la temperatura, estas conversiones se resuelven solo multiplicando o dividiendo, porque comparten el mismo origen temporal.",
        ],
      },
      {
        title: "¿Qué es un segundo intercalar?",
        paragraphs: [
          "La rotación de la Tierra presenta pequeñas variaciones por efectos de las mareas y cambios internos. Esto crea una diferencia entre el tiempo atómico y la duración basada en la rotación terrestre.",
          "Desde 1972 se han introducido segundos intercalares en UTC cuando ha sido necesario para limitar esa diferencia. No siguen un ciclo fijo: su aplicación depende de la diferencia observada entre el tiempo atómico y la rotación terrestre.",
        ],
      },
      {
        title: "Los husos horarios y el UTC",
        paragraphs: [
          "La Tierra se organiza en torno a unos 24 husos horarios porque la posición aparente del Sol cambia con la longitud. UTC sirve como referencia; cada zona se expresa mediante su diferencia con UTC. España peninsular, por ejemplo, usa UTC+1 en invierno.",
          "UTC se mantiene con relojes atómicos y sustituyó como patrón al antiguo Tiempo Medio de Greenwich (GMT). GMT se usa hoy sobre todo como nombre del horario de invierno del Reino Unido.",
        ],
      },
      {
        title: "¿Cómo se mide el tiempo?",
        paragraphs: [
          "En la vida diaria se usan relojes mecánicos y digitales; en GPS, telecomunicaciones y ciencia se emplean relojes atómicos. Estos se basan en frecuencias muy estables de átomos como el cesio o el rubidio.",
          "Para calcular posiciones precisas, los relojes de los satélites GPS deben sincronizarse con precisión de nanosegundos. Un desfase mínimo puede producir un error considerable en la posición calculada en tierra.",
        ],
      },
    ],
    unitTable: [
      { name: "Milisegundo", symbol: "ms", referenceValue: "0,001 s", system: "SI/métrico", commonUse: "Operaciones informáticas y cronometraje deportivo" },
      { name: "Segundo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Medición básica de tiempo" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Aceptado junto al SI", commonUse: "Control del tiempo cotidiano" },
      { name: "Hora", symbol: "h", referenceValue: "3.600 s", system: "Aceptado para su uso con el SI", commonUse: "Tiempo de trabajo y de viaje" },
      { name: "Día", symbol: "d", referenceValue: "86.400 s", system: "Aceptado para su uso con el SI", commonUse: "Calendario y cálculos de duración" },
    ],
  },
  {
    locale: "es",
    slug: "velocidad",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversión de unidades de velocidad",
    description:
      "Convierte velocidades entre km/h, m/s y mph; consulta ejemplos de ingeniería y uso cotidiano.",
    introduction: [
      "La velocidad es una magnitud física derivada que relaciona una distancia con el tiempo empleado. Al dividir una longitud entre un tiempo, su dimensión es L/T.",
      "En la vida cotidiana se usan principalmente el kilómetro por hora (km/h) y la milla por hora (mph); el metro por segundo (m/s) es frecuente en ciencia, y el nudo en navegación marítima y aérea. La velocidad de la luz tiene un papel especial como límite de transmisión de información en el vacío.",
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
          "En el uso cotidiano, la velocidad se calcula como distancia dividida entre tiempo. En física, la rapidez es escalar —no incluye dirección—, mientras que la velocidad es vectorial e incluye dirección y sentido; ambos términos se confunden a menudo en lenguaje común.",
          "Es una magnitud derivada obtenida al dividir una unidad de longitud entre una unidad de tiempo. Por eso su dimensión en el SI se expresa como L/T o L¹T⁻¹.",
        ],
      },
      {
        title: "La unidad del SI para la velocidad: el metro por segundo",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada de velocidad es el metro por segundo (m/s): un metro recorrido en un segundo. Es la unidad habitual en cálculos científicos y fórmulas de física.",
          "Para circulación se prefiere el kilómetro por hora, porque las distancias y velocidades de carretera resultan más intuitivas a esa escala. 1 m/s equivale exactamente a 3,6 km/h.",
        ],
      },
      {
        title: "El kilómetro por hora y la milla por hora",
        paragraphs: [
          "El kilómetro por hora es la unidad habitual de velocidad vial en los países métricos, incluida España. La milla por hora se usa, entre otros lugares, en Estados Unidos y el Reino Unido.",
          "1 mph equivale a aproximadamente 1,60934 km/h. Conviene comprobar la unidad del velocímetro y de las señales cuando se conduce un vehículo importado o se viaja al extranjero.",
        ],
      },
      {
        title: "El nudo: velocidad marítima y aérea",
        paragraphs: [
          "El nudo es una milla náutica por hora y es la unidad estándar en navegación marítima y aérea. Un nudo equivale exactamente a 1.852 metros por hora.",
          "Su nombre procede de un método histórico: se lanzaba al agua una cuerda marcada con nudos y se contaban los que pasaban durante un intervalo de tiempo. El método precedió a los instrumentos modernos de medición.",
        ],
      },
      {
        title: "La velocidad de la luz: un límite físico fundamental",
        paragraphs: [
          "La velocidad de la luz en el vacío se fija exactamente en 299.792.458 m/s. Según la relatividad especial, ninguna información ni objeto con masa puede alcanzar o superar esa velocidad en el vacío.",
          "Esta constante también fundamenta la definición del metro: un metro es la distancia que recorre la luz en el vacío durante 1/299.792.458 de segundo.",
        ],
      },
      {
        title: "El número de Mach: relación con la velocidad del sonido",
        paragraphs: [
          "En aviación, las velocidades altas se expresan a menudo con el número de Mach: la relación entre la velocidad de un objeto y la del sonido en el medio. Mach 1 equivale a la velocidad del sonido.",
          "La velocidad del sonido depende de las condiciones del medio, especialmente de la temperatura. Por eso un mismo número de Mach puede representar valores distintos en km/h o m/s según la altitud y las condiciones atmosféricas.",
        ],
      },
      {
        title: "La diferencia entre velocidad media e instantánea",
        paragraphs: [
          "La velocidad media resulta de dividir la distancia total entre el tiempo total. La velocidad instantánea describe el movimiento en un momento concreto y puede cambiar por aceleración, frenada o parada.",
          "El velocímetro de un vehículo muestra una velocidad instantánea. La media de un trayecto se calcula con la distancia y duración totales; solo coinciden si la velocidad se mantiene constante.",
        ],
      },
    ],
    unitTable: [
      { name: "Centímetro por segundo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/métrico", commonUse: "Laboratorio y movimiento lento" },
      { name: "Metro por minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/métrico", commonUse: "Cintas transportadoras industriales" },
      { name: "Metro por segundo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Cálculos científicos y físicos" },
      { name: "Kilómetro por hora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Métrico", commonUse: "Vehículos y límites de velocidad" },
      { name: "Milla por hora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Británico/estadounidense", commonUse: "Vehículos en Estados Unidos y el Reino Unido" },
      { name: "Nudo", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navegación marítima/aérea", commonUse: "Barcos y aeronaves" },
      { name: "Kilómetro por minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Métrico", commonUse: "Cálculos de distancias cortas" },
      { name: "Kilómetro por segundo", symbol: "km/s", referenceValue: "1.000 m/s", system: "Métrico", commonUse: "Naves espaciales y cuerpos celestes" },
      { name: "Velocidad de la luz", symbol: "c", referenceValue: "299.792.458 m/s", system: "Constante universal", commonUse: "Cálculos de física y astronomía" },
    ],
  },
  {
    locale: "es",
    slug: "presion",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversión de unidades de presión",
    description:
      "Convierte presión entre pascal, kilopascal, bar y psi; consulta fórmulas y usos de ingeniería.",
    introduction: [
      "La presión expresa la fuerza perpendicular aplicada sobre una superficie en relación con su área. Es relevante desde el contacto entre sólidos hasta tuberías, atmósfera y sistemas de vacío; en ingeniería afecta a seguridad, estanqueidad y control de procesos.",
      "La unidad derivada del Sistema Internacional es el pascal (Pa). Un pascal equivale a un newton distribuido uniformemente sobre un metro cuadrado: 1 Pa = 1 N/m². Por ello, la presión está ligada a fuerza y superficie.",
      "En la práctica se usan unidades más cómodas: kPa y psi para neumáticos, bar en procesos, atm como referencia atmosférica y milibar en meteorología. Para convertir correctamente también hay que distinguir presión absoluta, manométrica y diferencial.",
    ],
    facts: [
      { label: "Magnitud física", value: "Presión" },
      { label: "Unidad derivada del SI", value: "Pascal" },
      { label: "Símbolo SI", value: "Pa" },
      { label: "Relación básica", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Fórmula dimensional", value: "M L⁻¹ T⁻²" },
      { label: "Atmósfera estándar", value: "101.325 Pa" },
      { label: "Referencia de presión absoluta", value: "Vacío total" },
    ],
    sections: [
      {
        title: "¿Qué es la presión?",
        paragraphs: [
          "La presión depende tanto de la fuerza como del área sobre la que se reparte. Con la misma fuerza, una superficie menor produce mayor presión; por eso un cuchillo afilado corta mejor que una base ancha.",
          "En mecánica de fluidos, la presión es el esfuerzo normal que un fluido ejerce sobre su entorno. En un fluido en reposo se transmite en todas las direcciones, principio que aprovechan prensas hidráulicas, frenos y actuadores.",
          "También puede hablarse de presión en contactos entre sólidos, pero en ingeniería suele referirse a sistemas de fluidos: tuberías, depósitos, compresores, conductos, vacío y atmósfera.",
        ],
      },
      {
        title: "La fórmula de la presión: P = F / A",
        paragraphs: [
          "La definición básica es P = F / A: P es la presión, F la componente de fuerza perpendicular y A el área sobre la que se distribuye. Newton por metro cuadrado equivale a pascal.",
          "Esta fórmula describe la presión media cuando la fuerza se reparte uniformemente. En contactos reales o flujos complejos puede variar de un punto a otro, por lo que se analiza su distribución local.",
          "Un error habitual es elegir una dirección de fuerza o un área efectiva incorrectas. En un pistón, por ejemplo, debe usarse la sección realmente sometida a presión.",
        ],
      },
      {
        title: "¿Por qué el pascal es la unidad del SI para la presión?",
        paragraphs: [
          "El pascal deriva directamente del newton y el metro cuadrado: 1 Pa = 1 N/m². Esta relación muestra el origen mecánico de la presión y evita definir una unidad básica independiente.",
          "Expresarla en pascales mantiene coherencia con el esfuerzo, el módulo de elasticidad y las ecuaciones de fluidos. Usar una referencia común reduce errores de conversión.",
          "El pascal es muy pequeño para muchos casos cotidianos; por eso se utilizan kPa, MPa o bar. Todas esas unidades se relacionan finalmente con el pascal.",
        ],
      },
      {
        title: "Historia de la medición: Torricelli y el barómetro",
        paragraphs: [
          "En 1643, Evangelista Torricelli construyó un barómetro de mercurio. Observó que la columna de mercurio se detenía a cierta altura y dejaba un vacío sobre ella.",
          "Interpretó que el peso del aire exterior equilibraba esa columna. El experimento mostró que el aire tiene peso medible y, por tanto, ejerce presión.",
          "En 1648, Florín Périer verificó en el Puy de Dôme, siguiendo una propuesta de Blaise Pascal, que la presión atmosférica disminuye con la altitud. Estos trabajos fueron decisivos para la metrología de la presión.",
        ],
      },
      {
        title: "Presión absoluta, manométrica y diferencial",
        paragraphs: [
          "La presión absoluta se mide respecto al vacío total y no puede ser negativa. Se usa, por ejemplo, en leyes de los gases, cálculos termodinámicos y aplicaciones de vacío.",
          "La presión manométrica o relativa se mide respecto a la atmósfera. Muchos manómetros toman el aire ambiente como cero; la relación es P_abs = P_man + P_atm.",
          "La presión diferencial es la diferencia entre dos puntos. Se emplea para seguir filtros, medir caudal con placas de orificio, controlar salas presurizadas o evaluar intercambiadores de calor.",
        ],
      },
      {
        title: "La presión atmosférica",
        paragraphs: [
          "La presión atmosférica procede del peso de la columna de aire sobre la superficie terrestre. La atmósfera estándar equivale a 101.325 Pa, pero el valor real cambia con altitud, meteorología y temperatura.",
          "Se mide con barómetros. Los de mercurio fueron instrumentos de referencia; hoy predominan sensores electrónicos. Es importante en meteorología, vacío, combustión y conversiones entre presión manométrica y absoluta.",
          "Con la misma lectura manométrica, la presión absoluta cambia si cambia la presión atmosférica. Esta diferencia importa en compresión, densidad de gases y punto de ebullición.",
        ],
      },
      {
        title: "Presión hidrostática y relación P = ρgh",
        paragraphs: [
          "En un fluido en reposo, la presión aumenta con la profundidad. Si la densidad es constante, el incremento hidrostático se aproxima mediante P = ρgh, donde ρ es densidad, g gravedad y h profundidad vertical.",
          "La relación se usa en depósitos, tanques abiertos, presas, medición de nivel y manómetros de columna. En el mismo fluido, importa la profundidad respecto a la superficie libre, no la forma del recipiente.",
          "La presión absoluta incluye el incremento ρgh y la presión inicial en la superficie. En un recipiente abierto, esa presión inicial suele ser la atmosférica.",
        ],
      },
      {
        title: "Presión estática, dinámica y total",
        paragraphs: [
          "La presión estática describe el estado termodinámico local del fluido. Es la que se mide normalmente en tuberías, depósitos y conductos con los transmisores de presión habituales.",
          "La presión dinámica representa el efecto de la velocidad del flujo y se aproxima con q = ½ρv². Es importante en el enfoque de Bernoulli y en métodos de velocidad como el tubo de Pitot.",
          "En un flujo ideal, la presión total se interpreta como suma de presión estática y dinámica. En sistemas reales influyen fricción, turbulencia, compresibilidad y pérdidas locales, pero esta distinción sigue siendo fundamental en ventilación y aerodinámica.",
        ],
      },
      {
        title: "Altura de presión y altura manométrica de una bomba",
        paragraphs: [
          "La altura de presión expresa una presión como altura equivalente de una columna de fluido: h = P / (ρg). La misma presión representa alturas diferentes según la densidad del fluido.",
          "En bombeo se usan con frecuencia metros de columna de fluido, no solo pascales o bares. La bomba aporta energía para vencer altura, pérdidas por fricción y cambios de velocidad; por ello, la altura manométrica es una referencia muy útil.",
          "La altura de presión no equivale a la altura geométrica. Para seleccionar una bomba hay que considerar pérdidas de carga, velocidad y resistencias locales, además de la densidad del fluido.",
        ],
      },
      {
        title: "¿Por qué existen distintas unidades de presión?",
        paragraphs: [
          "La variedad de unidades responde a razones históricas y sectoriales. El SI usa pascales; industria emplea bar, medicina mmHg, meteorología milibar y automoción psi.",
          "Algunas unidades son más cómodas a determinada escala: 35 psi puede resultar más legible para un neumático que 240 kPa, y 3,5 bar más que 350.000 Pa para un proceso.",
          "Todas describen la misma magnitud. En cálculos conjuntos es esencial convertir con cuidado, comprobar si la referencia es absoluta o manométrica y no confundir los símbolos.",
        ],
      },
      {
        title: "¿Cómo se mide la presión?",
        paragraphs: [
          "Antes de medir hay que definir si se necesita presión absoluta, manométrica o diferencial. Después se eligen rango, material compatible con el fluido, temperatura, vibraciones y precisión necesarios.",
          "Los transmisores diferenciales de diafragma son útiles a baja presión; los sensores piezorresistivos o de galgas, para presiones de proceso; y los absolutos, para vacío. Los manómetros de columna muestran bien el principio, aunque en industria predominan los equipos electrónicos.",
          "La exactitud también depende de la instalación: líneas de impulso, posición de montaje, ajuste de cero y temperatura. En líneas de gas o líquido, condensación y diferencias de densidad pueden añadir carga hidrostática al sensor.",
        ],
      },
      {
        title: "Sensores de presión y manómetros",
        paragraphs: [
          "Los manómetros mecánicos, como los de tubo de Bourdon, transforman la presión en un movimiento de aguja. Son robustos y no necesitan alimentación, pero los sensores electrónicos ofrecen más opciones de precisión y registro.",
          "Los sensores electrónicos pueden ser piezorresistivos, capacitivos, de galgas extensométricas o resonantes. Convierten la variación de presión en una señal para PLC, SCADA o sistemas de adquisición de datos, lo que permite alarmas y análisis de tendencias.",
          "Los instrumentos diferenciales comparan dos puntos; los absolutos se refieren al vacío y los manométricos a la atmósfera. La ficha técnica debe indicar siempre la referencia, no basta con leer el valor numérico.",
        ],
      },
      {
        title: "Ámbitos de uso de la presión en ingeniería",
        paragraphs: [
          "La presión es una variable de diseño esencial en tuberías, climatización, hidráulica, neumática, procesos químicos, energía, distribución de agua, automoción y aeronáutica. Influye, por ejemplo, en el espesor de depósitos, válvulas, compresores y filtros.",
          "En procesos se vigilan límites de presión para operar con seguridad reactores, calderas, intercambiadores y separadores. Válvulas de seguridad, discos de ruptura y bucles de control son equipos críticos; la presión también permite estimar caudal o nivel.",
          "También interviene en análisis mecánicos, presión arterial, ventilación, vacío, meteorología y control ambiental.",
        ],
      },
      {
        title: "Temperatura, altitud e incertidumbre de medición",
        paragraphs: [
          "La temperatura afecta tanto al fluido como al sensor. En gases puede cambiar la densidad y la relación presión-volumen-temperatura; por eso las fichas técnicas especifican derivas de cero y de escala con la temperatura.",
          "La presión atmosférica suele disminuir con la altitud. Esto altera la relación entre presión manométrica y absoluta, de modo que una misma condición de proceso puede tener valores absolutos distintos a diferente altura.",
          "Toda medición tiene incertidumbre. Patrón de calibración, resolución, histéresis, temperatura, montaje, vibraciones y deriva a largo plazo deben considerarse en aplicaciones críticas.",
        ],
      },
      {
        title: "Relación y diferencia entre presión y esfuerzo",
        paragraphs: [
          "Presión y esfuerzo comparten dimensión y pueden expresarse en pascales, porque ambos relacionan fuerza y superficie. No son, sin embargo, la misma magnitud física.",
          "La presión es un esfuerzo normal isotrópico de los fluidos: en reposo es igual en todas las direcciones de un punto. El esfuerzo en sólidos puede incluir componentes normales y cortantes, depender de la dirección y tener carácter tensorial.",
          "La distinción es importante en paredes de depósitos, juntas y resistencia de materiales. La presión interna crea esfuerzos en el depósito, pero no es idéntica al campo de esfuerzos del material.",
        ],
      },
      {
        title: "Errores frecuentes en cálculos de presión",
        paragraphs: [
          "El error más frecuente es confundir presión manométrica y absoluta. Las leyes de los gases, cálculos de densidad y aplicaciones de vacío requieren habitualmente presión absoluta.",
          "También hay que usar factores de conversión adecuados y una precisión coherente. Al pasar entre psi, bar, atm, mmHg y kPa, los decimales necesarios dependen de la exactitud exigida por el cálculo o la calibración.",
          "Ignorar efectos hidrostáticos, altura de montaje o temperatura puede alterar significativamente el resultado, sobre todo en líneas con líquido, depósitos cerrados y medidas diferenciales.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Cálculos científicos y de ingeniería" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1.000 Pa", system: "SI", commonUse: "Instalaciones, neumáticos y presión de proceso" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Métrico, fuera del SI", commonUse: "Industria, compresores y procesos" },
      { name: "Milibar", symbol: "mbar", referenceValue: "100 Pa", system: "Métrico, fuera del SI", commonUse: "Meteorología y presión atmosférica" },
      { name: "Atmósfera estándar", symbol: "atm", referenceValue: "101.325 Pa", system: "Fuera del SI", commonUse: "Atmósfera y condiciones de referencia" },
      { name: "Libra por pulgada cuadrada", symbol: "psi", referenceValue: "≈6.894,757293 Pa", system: "Británico/estadounidense", commonUse: "Neumáticos y sistemas hidráulicos" },
      { name: "Atmósfera técnica", symbol: "at", referenceValue: "98.066,5 Pa", system: "Fuera del SI", commonUse: "Aplicaciones técnicas antiguas" },
      { name: "Milímetro de mercurio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fuera del SI", commonUse: "Medicina, vacío y presión" },
      { name: "Milímetro de columna de agua", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fuera del SI", commonUse: "Baja presión y ventilación" },
      { name: "Kilogramo-fuerza por centímetro cuadrado", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Métrico, fuera del SI", commonUse: "Manómetros antiguos de bombas y calderas" },
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
      "La energía expresa la capacidad de un sistema para realizar trabajo o producir un cambio. En el Sistema Internacional, su unidad derivada es el julio, relacionado con una fuerza y un desplazamiento.",
      "En la vida cotidiana se usa el kilovatio-hora (kWh) en facturas eléctricas y la caloría o kilocaloría en nutrición. BTU y therm aparecen en climatización y gas natural; el electronvoltio se usa en física atómica y de partículas.",
    ],
    facts: [
      { label: "Magnitud física", value: "Energía" },
      { label: "Símbolo dimensional", value: "[ML²T⁻²]" },
      { label: "Unidad derivada del SI", value: "Julio" },
      { label: "Símbolo de la unidad SI", value: "J" },
      { label: "Definición del julio", value: "1 J = 1 N·m" },
    ],
    sections: [
      {
        title: "¿Qué es la energía?",
        paragraphs: [
          "La energía puede presentarse como energía cinética, potencial, térmica, química o eléctrica. Según el principio de conservación, se transforma de una forma a otra, sin crearse ni destruirse en un sistema aislado.",
          "Es una magnitud derivada. En el SI, su dimensión es ML²T⁻², equivalente a masa por longitud al cuadrado dividida por tiempo al cuadrado.",
        ],
      },
      {
        title: "La unidad del SI para la energía: el julio",
        paragraphs: [
          "El julio (J) es la unidad derivada del SI y recibe su nombre de James Prescott Joule. Equivale a la energía transferida cuando una fuerza de un newton desplaza un objeto un metro en su dirección.",
          "Para cantidades mayores se usan el kilojulio (1.000 J) y el megajulio (1.000.000 J).",
        ],
      },
      {
        title: "El kilovatio-hora: la unidad de las facturas eléctricas",
        paragraphs: [
          "Un kilovatio-hora es la energía consumida por una potencia de un kilovatio durante una hora. Es la unidad habitual de facturación eléctrica; 1 kWh equivale exactamente a 3.600.000 J, o 3,6 MJ.",
          "El consumo se obtiene multiplicando potencia por tiempo. Por ejemplo, un aparato de 2.000 W que funciona tres horas consume 6 kWh. El vatio expresa potencia; el kWh, energía acumulada.",
        ],
      },
      {
        title: "La caloría y la kilocaloría en nutrición",
        paragraphs: [
          "La caloría se definió como la energía necesaria para elevar un grado Celsius la temperatura de un gramo de agua. La caloría termoquímica equivale exactamente a 4,184 J.",
          "En nutrición, la palabra “calorías” suele referirse a kilocalorías. Por tanto, una etiqueta con 200 calorías normalmente indica 200 kcal, es decir, 200.000 cal.",
        ],
      },
      {
        title: "BTU y therm: energía para climatización y gas natural",
        paragraphs: [
          "El BTU (British thermal unit) se usa sobre todo para expresar capacidades de calefacción y aire acondicionado. Según la definición adoptada, su valor puede variar ligeramente; el BTU internacional equivale aproximadamente a 1.055,06 J.",
          "El therm se utiliza en algunas facturas de gas natural y equivale a 100.000 BTU. En otros lugares el consumo se factura por volumen o por energía en kWh.",
        ],
      },
      {
        title: "El electronvoltio: una unidad del mundo subatómico",
        paragraphs: [
          "Un electronvoltio (eV) es la energía que adquiere un electrón al atravesar una diferencia de potencial de un voltio. Es una unidad muy pequeña: 1 eV equivale exactamente a 1,602176634 × 10⁻¹⁹ J.",
          "La física atómica y de partículas usa eV, keV, MeV y GeV porque los julios producirían números demasiado pequeños para esas escalas.",
        ],
      },
      {
        title: "El principio de conservación de la energía",
        paragraphs: [
          "El principio de conservación establece que la energía no se crea ni se destruye, sino que se transforma. En termodinámica, los cambios de energía se relacionan con calor y trabajo intercambiados por el sistema.",
          "En un motor, la energía química del combustible se transforma en energía térmica y mecánica. Parte termina como calor no aprovechable, pero la energía total se conserva.",
        ],
      },
      {
        title: "¿Por qué es importante convertir unidades de energía?",
        paragraphs: [
          "Cada sector usa unidades distintas: kWh en electricidad, kcal en nutrición, BTU en climatización y therm en gas. Convertirlas bien permite comparar consumo, eficiencia y costes.",
          "Para comparar una bomba de calor con una caldera de gas, por ejemplo, ambos consumos deben expresarse primero en una unidad común, normalmente kWh o julios.",
        ],
      },
    ],
    unitTable: [
      { name: "Julio", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Cálculos científicos y físicos" },
      { name: "Kilojulio", symbol: "kJ", referenceValue: "1.000 J", system: "SI/métrico", commonUse: "Energía alimentaria en algunos países" },
      { name: "Megajulio", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/métrico", commonUse: "Combustibles y grandes cantidades" },
      { name: "Caloría", symbol: "cal", referenceValue: "4,184 J", system: "Métrico tradicional", commonUse: "Nutrición y química" },
      { name: "Kilocaloría", symbol: "kcal", referenceValue: "4.184 J", system: "Métrico tradicional", commonUse: "Etiquetas nutricionales" },
      { name: "Vatio-hora", symbol: "Wh", referenceValue: "3.600 J", system: "Electricidad", commonUse: "Consumo de aparatos pequeños" },
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
      "Convierte bytes, kilobytes, megabytes, gigabytes y terabytes; compara los sistemas basados en 1.000 y 1.024.",
    introduction: [
      "Las unidades de almacenamiento expresan la cantidad de información que un sistema puede guardar o procesar. La unidad elemental es el bit; ocho bits forman un byte.",
      "En almacenamiento y redes conviven prefijos decimales, basados en 1.000 —KB, MB, GB y TB—, y binarios, basados en 1.024 —KiB, MiB, GiB y TiB—. La diferencia explica por qué la capacidad mostrada puede no coincidir con la cifra comercial del disco.",
    ],
    facts: [
      { label: "Unidad más pequeña", value: "Bit (0 o 1)" },
      { label: "Unidad básica", value: "Byte = 8 bits" },
      { label: "Sistema decimal (SI)", value: "1 KB = 1000 bytes, 1 MB = 1000 KB" },
      { label: "Sistema binario (IEC)", value: "1 KiB = 1024 bytes, 1 MiB = 1024 KiB" },
      { label: "Diferencia entre 1.000 y 1.024", value: "≈7,4 % entre 1 GB y 1 GiB" },
    ],
    sections: [
      {
        title: "¿Qué son el bit y el byte?",
        paragraphs: [
          "Un bit, o dígito binario, puede tomar los valores 0 o 1. Ocho bits forman un byte; un byte puede representar 256 valores distintos, suficiente para una unidad básica de datos.",
          "El bit se abrevia con b minúscula y el byte con B mayúscula. La distinción importa: 100 Mbps son, como máximo teórico, 12,5 MB/s antes de considerar sobrecarga de protocolo, Wi‑Fi, servidor y otros límites.",
        ],
      },
      {
        title: "¿Por qué existen dos sistemas de unidades?",
        paragraphs: [
          "La memoria informática se organiza naturalmente en potencias de dos, como 1.024 o 1.048.576. Por ello, durante años se usó “kilobyte” de forma ambigua para 1.024 bytes.",
          "Los fabricantes de discos utilizan prefijos decimales: 1 TB son exactamente 1.000.000.000.000 bytes. Esa misma cantidad equivale a unos 931 GiB. Algunos sistemas muestran GiB correctamente y otros usan GB para valores calculados en base 1.024.",
        ],
      },
      {
        title: "El estándar IEC: KiB, MiB y GiB",
        paragraphs: [
          "Para evitar la ambigüedad, la Comisión Electrotécnica Internacional (IEC) definió en 1998 los nombres kibibyte, mebibyte, gibibyte y tebibyte, con los símbolos KiB, MiB, GiB y TiB.",
          "KB, MB y GB corresponden al sistema decimal; KiB, MiB y GiB, al binario. No todos los programas aplican esta distinción de forma coherente, por lo que conviene comprobar el símbolo y el número de bytes.",
        ],
      },
      {
        title: "¿Por qué crece la diferencia entre 1.000 y 1.024?",
        paragraphs: [
          "La diferencia se eleva con cada prefijo: entre 1 KB y 1 KiB es aproximadamente 2,4 %, entre GB y GiB alrededor de 7,4 % y entre TB y TiB cerca de 10 %.",
          "Por eso un disco de 1 TB puede aparecer como unos 931 GiB. No falta espacio: se está expresando el mismo número de bytes con otra unidad.",
        ],
      },
      {
        title: "Unidades basadas en bits: kilobit, megabit y gigabit",
        paragraphs: [
          "Los proveedores de internet suelen indicar velocidad en bits por segundo: kbps, Mbps o Gbps. Es la convención habitual de redes.",
          "Los archivos se muestran normalmente en bytes. Por ello, 100 Mbps equivalen a un máximo teórico de 12,5 MB/s, no a 100 MB/s. La velocidad real puede ser inferior por diversos factores de red.",
        ],
      },
      {
        title: "Tamaños de datos en la vida cotidiana",
        paragraphs: [
          "Un documento de texto suele ocupar pocos KB; una foto JPEG, varios MB; y una canción MP3, unos pocos MB. El tamaño depende del contenido, formato y compresión.",
          "Los vídeos pueden variar mucho: una película HD puede ocupar varios GB y una en 4K, decenas de GB, según duración, tasa de bits, códec y resolución.",
        ],
      },
      {
        title: "Historia del almacenamiento de datos",
        paragraphs: [
          "El IBM RAMAC 305, presentado en 1956, almacenaba alrededor de 3,75 MB y ocupaba una sala. Una tarjeta microSD actual puede multiplicar esa capacidad millones de veces en el tamaño de una uña.",
          "El avance se debe a mejoras en discos magnéticos, memoria flash, densidad de almacenamiento y coste por byte.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 bytes", system: "Binario", commonUse: "Velocidad de red" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bits)", system: "Unidad básica", commonUse: "Tamaño de archivos" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1.000 bytes", system: "Decimal", commonUse: "Documentos de texto" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1.024 bytes", system: "Binario (IEC)", commonUse: "Memoria y software" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 bytes", system: "Decimal", commonUse: "Fotos y música" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 bytes", system: "Binario (IEC)", commonUse: "Memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 bytes", system: "Decimal", commonUse: "Capacidad comercial de disco" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 bytes", system: "Binario (IEC)", commonUse: "Capacidad mostrada en software" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 bytes", system: "Decimal", commonUse: "Almacenamiento de gran volumen" },
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
      "Convierte voltios, kilovoltios, amperios y miliamperios; consulta valores de referencia.",
    introduction: [
      "La electricidad incluye magnitudes relacionadas, pero distintas, como tensión —diferencia de potencial— y corriente —flujo de carga—. Esta categoría reúne las conversiones más habituales de voltios y amperios.",
      "Tensión y corriente no se convierten directamente entre sí. Su relación depende del circuito, por ejemplo mediante la ley de Ohm: V = I × R. Esta página convierte cada magnitud dentro de su propia familia.",
    ],
    facts: [
      { label: "Unidad de tensión", value: "Voltio (Alessandro Volta)" },
      { label: "Unidad de corriente", value: "Amperio (André-Marie Ampère)" },
      { label: "Unidad básica del SI para corriente", value: "Amperio (A)" },
      { label: "Relación tensión-corriente-resistencia", value: "Ley de Ohm: V = I × R" },
      { label: "Tensión de red en España", value: "230 V monofásica; 400 V trifásica" },
    ],
    sections: [
      {
        title: "¿Qué es la tensión (voltio)?",
        paragraphs: [
          "La tensión o voltaje expresa la diferencia de potencial eléctrico entre dos puntos de un circuito. Puede entenderse como la energía disponible por unidad de carga; su unidad es el voltio (V).",
          "El voltio recibe su nombre de Alessandro Volta. Valores como 1,5 V o 9 V en una pila indican la diferencia de potencial nominal que puede suministrar.",
        ],
      },
      {
        title: "¿Qué es la corriente (amperio)?",
        paragraphs: [
          "La corriente eléctrica es la carga que atraviesa una sección de un conductor por unidad de tiempo. Su unidad básica del SI es el amperio (A), equivalente a un culombio por segundo.",
          "El amperio recibe su nombre de André-Marie Ampère. Desde la revisión del SI de 2019 se define fijando el valor de la carga elemental, pero sigue siendo una de las siete unidades básicas del SI.",
        ],
      },
      {
        title: "¿Por qué no pueden convertirse tensión y corriente entre sí?",
        paragraphs: [
          "Tensión y corriente son magnitudes diferentes: una expresa diferencia de potencial y la otra flujo de carga. Por eso no puede responderse cuántos amperios son determinados voltios sin conocer las características del circuito.",
          "La ley de Ohm establece V = I × R. Así, 12 V aplicados a una resistencia de 4 Ω producen 3 A; con otra resistencia, la corriente cambia.",
        ],
      },
      {
        title: "Relación entre potencia, tensión y corriente",
        paragraphs: [
          "En condiciones adecuadas, la potencia eléctrica se expresa como P = V × I. Para la misma potencia, una tensión mayor implica una corriente menor.",
          "Por ello, las redes de transporte usan tensiones elevadas: reducir la corriente disminuye las pérdidas por calentamiento resistivo en las líneas.",
        ],
      },
      {
        title: "La tensión de red en España y en el mundo",
        paragraphs: [
          "En España, la red residencial es normalmente de 230 V monofásicos y 50 Hz. Las instalaciones trifásicas usan habitualmente 400 V entre fases.",
          "La tensión de red varía según el país. Antes de usar un aparato importado deben comprobarse tensión, frecuencia, enchufe y compatibilidad indicada por el fabricante; no todos requieren ni admiten un convertidor.",
        ],
      },
      {
        title: "Corriente continua (CC) y corriente alterna (CA)",
        paragraphs: [
          "En corriente continua, la carga circula de forma sostenida en un sentido; las pilas y los paneles solares la producen. En corriente alterna, el sentido cambia periódicamente; en España la red opera a 50 Hz.",
          "La CA facilita modificar la tensión con transformadores, lo que permite transportar energía a largas distancias con menores pérdidas.",
        ],
      },
      {
        title: "Seguridad frente a la corriente eléctrica",
        paragraphs: [
          "El riesgo eléctrico depende de la corriente que atraviesa el cuerpo, el recorrido, la duración, la tensión, la humedad y las condiciones de contacto. Una descarga puede causar lesiones graves o ser mortal.",
          "No debe trabajarse sobre instalaciones energizadas. Para cualquier intervención, corta la alimentación, verifica la ausencia de tensión y recurre a un profesional cualificado cuando sea necesario.",
        ],
      },
    ],
    unitTable: [
      { name: "Milivoltio", symbol: "mV", referenceValue: "0,001 V", system: "SI/métrico", commonUse: "Sensores y señales bioeléctricas" },
      { name: "Voltio", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pilas, red y circuitos" },
      { name: "Kilovoltio", symbol: "kV", referenceValue: "1.000 V", system: "SI/métrico", commonUse: "Transporte de alta tensión" },
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
      "Calcula el equivalente entre oro de 24, 22, 18 y 14 quilates según su contenido de oro fino.",
    introduction: [
      "El oro se alea habitualmente para joyería porque en alta pureza es blando. El quilate indica la proporción de oro fino dentro de la aleación; los demás metales determinan, entre otras cosas, color y dureza.",
      "La escala se divide en 24 partes: 18 quilates representan 18/24 de oro fino, aproximadamente un 75 %. El cálculo no convierte una unidad física: conserva una misma cantidad de oro fino al expresar una aleación con otra ley.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Escala de pureza en quilates" },
      { label: "Referencia básica", value: "24 partes por 24 de oro fino" },
      { label: "Ejemplo habitual en Turquía", value: "22K en joyería tradicional" },
      { label: "Uso internacional frecuente", value: "18K en anillos y collares" },
      { label: "Lógica de cálculo", value: "Gramos × (K origen / 24) ÷ (K destino / 24)" },
    ],
    sections: [
      {
        title: "¿Qué mide exactamente el quilate?",
        paragraphs: [
          "El quilate indica qué parte de la masa de una pieza corresponde a oro fino. Una aleación de 24K representa la referencia máxima de la escala; 18K y 14K contienen 18/24 y 14/24 de oro, respectivamente.",
          "Los metales de aleación pueden incluir plata, cobre, paladio u otros elementos. Por ello, una pieza de menor quilataje suele ser más resistente al uso, aunque contiene menos oro fino.",
        ],
      },
      {
        title: "¿Cómo se calcula el contenido de oro fino?",
        paragraphs: [
          "Una pieza de 10 g y 22K contiene 10 × (22 / 24) = 9,17 g de oro fino. Los 0,83 g restantes corresponden a los metales de la aleación.",
          "Si esos 9,17 g de oro fino se rehacen como una aleación de 18K, el peso final teórico es 9,17 ÷ (18 / 24) = 12,22 g. Para fabricar la pieza deben añadirse metales de aleación; el resultado real también depende de pérdidas y del proceso del joyero.",
        ],
      },
      {
        title: "¿Para qué se usa cada quilate?",
        paragraphs: [
          "El oro de 24K se destina principalmente a lingotes y productos de inversión; por su blandura es menos habitual en joyería de uso diario. El 22K es común en joyería tradicional de Turquía y Oriente Medio.",
          "El 18K es frecuente en anillos y collares de uso diario. El 14K contiene menos oro fino y suele ofrecer mayor resistencia; es habitual en ciertos mercados de Estados Unidos y Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "Oro de 24 quilates", symbol: "24K", referenceValue: "24/24 de oro fino", system: "Pureza en joyería", commonUse: "Lingotes e inversión" },
      { name: "Oro de 22 quilates", symbol: "22K", referenceValue: "91,7 % de oro fino (22/24)", system: "Pureza en joyería", commonUse: "Joyería tradicional" },
      { name: "Oro de 18 quilates", symbol: "18K", referenceValue: "75 % de oro fino (18/24)", system: "Pureza en joyería", commonUse: "Anillos y collares" },
      { name: "Oro de 14 quilates", symbol: "14K", referenceValue: "58,3 % de oro fino (14/24)", system: "Pureza en joyería", commonUse: "Joyería de uso diario" },
    ],
  },
  {
    locale: "es",
    slug: "ley-de-la-plata",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversión de leyes de la plata",
    description:
      "Calcula gramos de plata fina para las leyes 999, 925, 900 y 800; conoce el sistema de milésimas.",
    introduction: [
      "La plata se alea con otros metales para fabricar joyas y objetos más resistentes. La milésima indica la proporción de plata fina dentro de esa aleación.",
      "A diferencia del oro, cuya pureza suele expresarse en quilates, la plata usa una escala sobre 1.000. La ley 999 equivale a 999 partes de plata por mil; la 925 se conoce como plata de ley o plata esterlina.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Sistema de milésimas" },
      { label: "Referencia principal", value: "999 = 99,9 % de plata fina" },
      { label: "Ley de joyería frecuente", value: "925 (plata esterlina)" },
      { label: "Lingotes e inversión", value: "Ley 999 (plata fina)" },
      { label: "Regla de cálculo", value: "Gramos × (ley origen / 1.000) ÷ (ley destino / 1.000)" },
    ],
    sections: [
      {
        title: "¿Qué mide la ley de la plata?",
        paragraphs: [
          "La ley se expresa en milésimas, sobre una base de 1.000. Una marca 999 indica 999 partes por mil de plata fina, es decir, un 99,9 % de pureza nominal.",
          "La ley 925 contiene un 92,5 % de plata fina. El 7,5 % restante suele ser cobre u otros metales de aleación, que aumentan la resistencia de la plata pura.",
        ],
      },
      {
        title: "¿Por qué la plata esterlina 925 es tan habitual?",
        paragraphs: [
          "La plata esterlina 925 se consolidó históricamente en Inglaterra y hoy es una de las leyes más reconocidas para joyería, cubertería y objetos decorativos.",
          "La plata 999 es blanda para muchas piezas de uso diario. Añadir una pequeña proporción de otros metales mejora su dureza sin perder en gran medida el aspecto característico de la plata.",
        ],
      },
      {
        title: "Diferencias entre las leyes 999, 900 y 800",
        paragraphs: [
          "La ley 999 se emplea habitualmente en lingotes y productos de inversión, donde la pureza es determinante. Por su blandura es menos común en joyería cotidiana.",
          "La ley 900 se ha usado en monedas históricas de diversos países. La 800 aparece con frecuencia en piezas europeas antiguas; contiene menos plata fina que la 925, pero ofrece mayor resistencia.",
        ],
      },
      {
        title: "¿Cómo se calcula la cantidad de plata fina?",
        paragraphs: [
          "Un anillo de 10 g con ley 925 contiene 10 × (925 / 1.000) = 9,25 g de plata fina. Los 0,75 g restantes son los metales de la aleación.",
          "Para calcular un equivalente entre leyes se conserva la cantidad de plata fina. Para expresar una cantidad de plata fina como ley 999, se divide entre 999/1.000; el resultado es teórico y no contempla mermas de fabricación.",
        ],
      },
      {
        title: "Deslustre de la plata y pureza",
        paragraphs: [
          "El deslustre es el oscurecimiento superficial que puede aparecer por reacción de la plata y de los metales de aleación con compuestos presentes en el aire, especialmente compuestos de azufre. Humedad, cosméticos y almacenamiento también influyen.",
          "Las aleaciones con mayor pureza o composiciones especiales pueden comportarse de manera distinta, pero ninguna garantía de pureza sustituye el cuidado y almacenamiento adecuados.",
        ],
      },
    ],
    unitTable: [
      { name: "Plata 999", symbol: "999", referenceValue: "99,9 % de plata fina", system: "Ley de plata", commonUse: "Lingotes e inversión" },
      { name: "Plata 925", symbol: "925", referenceValue: "92,5 % de plata fina", system: "Ley de plata", commonUse: "Joyería y cubertería" },
      { name: "Plata 900", symbol: "900", referenceValue: "90 % de plata fina", system: "Ley de plata", commonUse: "Monedas históricas" },
      { name: "Plata 800", symbol: "800", referenceValue: "80 % de plata fina", system: "Ley de plata", commonUse: "Piezas europeas antiguas" },
    ],
  },
  ...buildSpanishScienceCategoryPages("es"),
];

export function findSpanishCategoryPage(slug: string) {
  return spanishCategoryPages.find((page) => page.slug === slug);
}

export function findSpanishCategoryPageByTurkishSlug(sourceSlug: string) {
  return spanishCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
