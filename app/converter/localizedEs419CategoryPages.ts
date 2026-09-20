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
    title: "Conversion de unidades de longitud",
    description:
      "Convierte gratis y al instante entre metros, kilometros, centimetros, millas y pies; consulta formulas y tablas.",
    introduction: [
      "La longitud es una de las magnitudes fisicas fundamentales que se usa para describir la altura, el ancho o el grosor de un objeto, o la distancia entre dos puntos. Segun la direccion medida, un mismo objeto puede tener varios valores de longitud.",
      "En fisica, la longitud se representa normalmente con el simbolo dimensional L. Muchas magnitudes derivadas, como el area, el volumen, la velocidad, la aceleracion, la presion y la densidad, se definen a partir de la dimension de longitud.",
      "En el Sistema Internacional de Unidades (SI), la unidad basica de la longitud es el metro (m). Segun la magnitud de la distancia medida se usan el nanometro, el micrometro, el milimetro, el centimetro, el metro o el kilometro. Fuera del sistema metrico, la pulgada, el pie, la yarda y la milla se siguen usando, especialmente en Estados Unidos y el Reino Unido.",
    ],
    facts: [
      { label: "Unidad basica del SI", value: "Metro" },
      { label: "Simbolo de la unidad SI", value: "m" },
      { label: "Magnitud fisica", value: "Longitud" },
      { label: "Simbolo dimensional", value: "L" },
      { label: "Definicion actual del metro", value: "Distancia recorrida por la luz en el vacio en 1/299 792 458 de segundo" },
    ],
    sections: [
      {
        title: "¿Que es la longitud?",
        paragraphs: [
          "La longitud sirve para describir la altura, el ancho, la profundidad de un objeto o la distancia entre dos puntos; es una de las magnitudes fisicas fundamentales. Segun la direccion medida, un mismo objeto puede presentar varios valores de longitud.",
          "En fisica, la longitud se representa generalmente con el simbolo dimensional L. Numerosas magnitudes derivadas, como el area, el volumen, la velocidad, la aceleracion, la presion y la densidad, se definen a partir de la dimension de longitud.",
        ],
      },
      {
        title: "La unidad SI de la longitud",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad basica de la longitud es el metro, simbolizado por m. El metro sirve como referencia fundamental para definir todas las demas unidades de longitud.",
          "Las unidades metricas como el kilometro, el centimetro, el milimetro, el micrometro y el nanometro estan relacionadas con el metro mediante multiplos y submultiplos decimales. Esta estructura permite realizar las conversiones entre unidades metricas usando potencias de diez.",
        ],
      },
      {
        title: "La definicion cientifica del metro",
        paragraphs: [
          "En el pasado, el metro se definia a partir de las dimensiones de la Tierra y de patrones fisicos. Con el avance de la tecnologia de medicion se hizo necesaria una definicion mas estable y reproducible en cualquier lugar del mundo.",
          "Actualmente, un metro se define como la longitud del trayecto recorrido por la luz en el vacio durante un intervalo de 1/299 792 458 de segundo. Esta definicion se basa en que la velocidad de la luz en el vacio se fija exactamente en 299 792 458 metros por segundo.",
        ],
      },
      {
        title: "Las unidades metricas de longitud",
        paragraphs: [
          "En el sistema metrico, las unidades se relacionan con el metro mediante potencias positivas o negativas de 10. Un kilometro equivale a 1000 metros, un centimetro a 0,01 metros y un milimetro a 0,001 metros.",
          "Para longitudes muy pequenas se usan el micrometro, el nanometro y el picometro. Las celulas suelen medirse en micrometros, las longitudes de onda de la luz en nanometros y algunas distancias a escala atomica en picometros.",
        ],
      },
      {
        title: "Las unidades de longitud fuera del sistema metrico",
        paragraphs: [
          "La pulgada, el pie, la yarda y la milla terrestre son unidades de longitud comunes fuera del sistema metrico. Se usan especialmente en el sistema de medidas estadounidense y en algunas aplicaciones ligadas a la tradicion britanica.",
          "Una pulgada equivale exactamente a 2,54 centimetros, un pie a 12 pulgadas y una yarda a 3 pies. Una milla terrestre se define exactamente como 1609,344 metros.",
        ],
      },
      {
        title: "La longitud en la navegacion maritima y aerea",
        paragraphs: [
          "En la navegacion maritima y aerea, las distancias se expresan generalmente en millas nauticas. Una milla nautica equivale exactamente a 1852 metros.",
          "La milla nautica se desarrollo a partir de un enfoque de medicion historico relacionado con las coordenadas geograficas de la Tierra. La unidad de velocidad llamada nudo tambien significa una milla nautica por hora.",
        ],
      },
      {
        title: "¿Como se mide la longitud?",
        paragraphs: [
          "En las mediciones cotidianas se usan herramientas como la regla, la cinta metrica, el calibre y el micrometro. La precision del instrumento elegido depende del tamano del objeto a medir y del nivel de precision requerido.",
          "En ingenieria e investigacion cientifica pueden usarse telemetros laser, maquinas de medicion por coordenadas, interferometros y diversos sistemas de medicion optica.",
        ],
      },
      {
        title: "Precision de medicion e incertidumbre",
        paragraphs: [
          "Ninguna medicion fisica es absolutamente perfecta. El resultado de una medicion siempre conlleva cierta incertidumbre debido a la resolucion del instrumento utilizado, su calibracion, las condiciones ambientales y el metodo aplicado.",
          "Por eso, en los resultados cientificos conviene indicar no solo el valor medido, sino tambien la incertidumbre de la medicion y la unidad utilizada. Especialmente en trabajos de ingenieria de precision, incluso una variacion de temperatura puede afectar la longitud de un material.",
        ],
      },
      {
        title: "¿Como se convierten las unidades de longitud?",
        paragraphs: [
          "En las conversiones dentro de un mismo sistema de medida se usa la razon entre las unidades. Por ejemplo, para convertir metros en kilometros se divide el valor entre 1000; para convertir kilometros en metros se multiplica el valor por 1000.",
          "En las conversiones entre el sistema metrico y las unidades britanicas o estadounidenses hay que usar los coeficientes de conversion exactos definidos. Por ejemplo, para convertir pulgadas en centimetros se multiplica el valor por 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometro", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrico", commonUse: "Longitud de onda de la luz y nanotecnologia" },
      { name: "Micrometro", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrico", commonUse: "Celulas, particulas y fabricacion de precision" },
      { name: "Milimetro", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrico", commonUse: "Dibujo tecnico y medidas pequenas" },
      { name: "Centimetro", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrico", commonUse: "Medicion de objetos cotidianos" },
      { name: "Decimetro", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrico", commonUse: "Educacion y algunas relaciones de volumen" },
      { name: "Metro", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Mediciones de longitud basicas" },
      { name: "Kilometro", symbol: "km", referenceValue: "1000 m", system: "SI/metrico", commonUse: "Distancias viales y geograficas" },
      { name: "Pulgada", symbol: "in", referenceValue: "0,0254 m", system: "Britanico/estadounidense", commonUse: "Pantallas, tuberias y medidas tecnicas" },
      { name: "Pie", symbol: "ft", referenceValue: "0,3048 m", system: "Britanico/estadounidense", commonUse: "Altura, construccion y aviacion" },
      { name: "Yarda", symbol: "yd", referenceValue: "0,9144 m", system: "Britanico/estadounidense", commonUse: "Campos deportivos y medicion de distancias" },
      { name: "Milla", symbol: "mi", referenceValue: "1609,344 m", system: "Britanico/estadounidense", commonUse: "Distancias por carretera" },
      { name: "Milla nautica", symbol: "nmi", referenceValue: "1852 m", system: "Navegacion maritima", commonUse: "Navegacion maritima y aerea" },
    ],
  },
  {
    locale: "es",
    slug: "superficie",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversion de unidades de superficie",
    description:
      "Convierte superficies entre metros cuadrados, hectareas y pies cuadrados; para calculos de terrenos, edificios y construccion.",
    introduction: [
      "La superficie es una magnitud fisica derivada que expresa la extension de una region bidimensional. Como resulta del producto de una longitud por una longitud de la misma unidad, la dimension de la superficie es siempre 'longitud al cuadrado' (L²).",
      "En el Sistema Internacional de Unidades, la unidad derivada de la superficie es el metro cuadrado (m²). En agricultura y terrenos se usan mucho la hectarea y unidades locales; en el sistema britanico/estadounidense, el pie cuadrado y el acre; en el sur de Asia, unidades locales como el bigha y el katha tambien son habituales.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Superficie" },
      { label: "Simbolo dimensional", value: "[L²]" },
      { label: "Unidad derivada del SI", value: "Metro cuadrado" },
      { label: "Simbolo de la unidad SI", value: "m²" },
      { label: "Formula basica (rectangulo)", value: "Superficie = Longitud × Anchura" },
    ],
    sections: [
      {
        title: "¿Que es la superficie?",
        paragraphs: [
          "La superficie expresa la extension de una region plana o proyectada. La extension de un terreno, el suelo de una habitacion o una hoja de papel se miden en superficie.",
          "La superficie es una magnitud derivada: se obtiene multiplicando una unidad de longitud basica por si misma. Por eso la dimension SI de la superficie es L² (longitud al cuadrado), y la superficie es siempre una magnitud escalar positiva.",
        ],
      },
      {
        title: "La unidad SI de la superficie: el metro cuadrado",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada de la superficie es el metro cuadrado (m²), que representa la superficie ocupada por un cuadrado cuyo lado mide exactamente 1 metro.",
          "El metro cuadrado no es una unidad basica independiente, sino una unidad derivada obtenida al elevar al cuadrado la unidad de longitud (el metro). Todas las demas unidades metricas de superficie (centimetro cuadrado, kilometro cuadrado, etc.) se relacionan con el metro cuadrado mediante potencias decimales.",
        ],
      },
      {
        title: "¿Por que las unidades de superficie se convierten con una razon cuadratica?",
        paragraphs: [
          "Al convertir entre unidades de longitud, la razon utilizada debe elevarse al cuadrado para las unidades de superficie. Por ejemplo, 1 kilometro equivale a 1000 metros, pero 1 kilometro cuadrado no equivale a 1000 metros cuadrados, sino a 1000² es decir 1 000 000 metros cuadrados.",
          "Esto ocurre porque, en una superficie, ambas dimensiones (longitud y anchura) aumentan o disminuyen en la misma proporcion. Pasar por alto esta relacion cuadratica es el error de calculo mas frecuente en las conversiones de superficie -- creer que '1 km² = 1000 m²' es una confusion habitual.",
        ],
      },
      {
        title: "Las unidades metricas de superficie",
        paragraphs: [
          "En el sistema metrico se usan el milimetro cuadrado y el centimetro cuadrado para superficies pequenas, el metro cuadrado para mediciones cotidianas y el kilometro cuadrado para grandes superficies. Un centimetro cuadrado equivale a 0,0001 metros cuadrados, y un kilometro cuadrado a 1 000 000 metros cuadrados.",
          "Para medir terrenos se usan la area (100 m²) y su multiplo, 100 veces mayor, la hectarea (10 000 m²). La hectarea es la unidad metrica de terreno mas usada en el mundo para expresar la superficie de tierras agricolas.",
        ],
      },
      {
        title: "Unidades tradicionales de terreno en Turquia",
        paragraphs: [
          "En Turquia, las unidades mas usadas para medir tierras agricolas son el dönüm y el dekar; ambas equivalen hoy a 1000 metros cuadrados y son intercambiables. El dekar es el nombre oficial usado en la legislacion de pesos y medidas, mientras que el dönüm es el equivalente tradicional del lenguaje cotidiano.",
          "En la epoca otomana, el tamano del dönüm variaba segun la region entre 900 y 1600 m². Con la ley de pesos y medidas de 1931, el dönüm se alineo con el dekar y se estandarizo exactamente en 1000 m².",
        ],
      },
      {
        title: "Las unidades de superficie del sistema britanico/estadounidense",
        paragraphs: [
          "El pie cuadrado (ft²) y la pulgada cuadrada (in²) se usan para superficies pequenas, mientras que el acre se usa para grandes parcelas de terreno en el sistema de medidas britanico/estadounidense. Un acre equivale exactamente a 4046,8564224 metros cuadrados.",
          "El origen historico del acre se remonta a la superficie de terreno que una yunta de bueyes podia arar en un dia. Todavia hoy se usa ampliamente en anuncios inmobiliarios en Estados Unidos, el Reino Unido y algunos paises de la Commonwealth.",
        ],
      },
      {
        title: "Las unidades de terreno del sur de Asia",
        paragraphs: [
          "En paises como India, Bangladesh, Pakistan y Nepal se siguen usando ampliamente unidades locales de terreno como el bigha, el katha, el killa, el kanal, el marla, el guntha, el biswa y el decimal. El tamano de estas unidades puede variar considerablemente de una region a otra, incluso con el mismo nombre.",
          "Por ejemplo, un bigha equivale a unos 1338 m² en Bengala Occidental, pero puede corresponder a un valor distinto en otro estado. Por eso, en las transacciones inmobiliarias con estas unidades, es importante confirmar que estandar regional se esta utilizando.",
        ],
      },
      {
        title: "¿Como se calcula una superficie?",
        paragraphs: [
          "Para una superficie rectangular, la formula es Superficie = Longitud × Anchura. Para un triangulo se usa Superficie = (Base × Altura) / 2, y para un circulo, Superficie = π × Radio².",
          "En terrenos de forma irregular, la superficie se calcula dividiendo la forma en rectangulos o triangulos mas pequenos, calculando la superficie de cada parte por separado y sumandolas (o, en mediciones catastrales, mediante formulas de superficie de poligonos basadas en coordenadas).",
        ],
      },
      {
        title: "Aspectos a tener en cuenta al medir superficies",
        paragraphs: [
          "El valor de superficie indicado en un anuncio inmobiliario o en una escritura debe interpretarse segun la unidad utilizada (m², dönüm, acre, bigha, etc.) y segun el estandar regional con el que esa unidad esta definida.",
          "Especialmente en transacciones inmobiliarias internacionales, fijarse en el equivalente exacto en metros cuadrados en lugar de en la simple similitud del nombre de la unidad evita malentendidos; la herramienta de conversion de esta pagina compara todas las unidades a partir de una referencia comun en metros cuadrados.",
        ],
      },
    ],
    unitTable: [
      { name: "Milimetro cuadrado", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrico", commonUse: "Dibujo tecnico y superficies pequenas" },
      { name: "Centimetro cuadrado", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrico", commonUse: "Superficie de objetos pequenos" },
      { name: "Metro cuadrado", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Superficie de vivienda, oficina y terreno" },
      { name: "Area", symbol: "a", referenceValue: "100 m²", system: "Metrico", commonUse: "Parcelas de terreno pequenas" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turquia (metrico)", commonUse: "Medicion de tierras agricolas" },
      { name: "Hectarea", symbol: "ha", referenceValue: "10 000 m²", system: "Metrico", commonUse: "Grandes tierras agricolas y forestales" },
      { name: "Kilometro cuadrado", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrico", commonUse: "Ciudades, paises y zonas geograficas" },
      { name: "Pie cuadrado", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britanico/estadounidense", commonUse: "Superficie de vivienda (US/UK)" },
      { name: "Yarda cuadrada", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britanico/estadounidense", commonUse: "Campos deportivos y textil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britanico/estadounidense", commonUse: "Grandes parcelas de terreno" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (variable segun la region)", system: "Sur de Asia", commonUse: "Tierras agricolas en India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japon", commonUse: "Medicion de vivienda y terreno en Japon" },
    ],
  },
  {
    locale: "es",
    slug: "volumen",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversion de unidades de volumen",
    description:
      "Convierte volumenes entre litros, mililitros y metros cubicos; compara las unidades habituales para liquidos y recipientes.",
    introduction: [
      "El volumen es una magnitud fisica derivada que expresa el espacio ocupado o contenido por un objeto o recipiente tridimensional. Como resulta del producto de una unidad de longitud en las tres dimensiones (largo × ancho × alto), la dimension del volumen es L³ (longitud al cubo).",
      "En el Sistema Internacional de Unidades, la unidad derivada del volumen es el metro cubico (m³); en la vida cotidiana se usan mucho mas el litro y el mililitro. En la cocina son habituales la taza, la cucharada y la cucharadita, y en el sistema estadounidense/britanico, el galon, el cuarto, la pinta y la onza liquida.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Volumen" },
      { label: "Simbolo dimensional", value: "[L³]" },
      { label: "Unidad derivada del SI", value: "Metro cubico" },
      { label: "Simbolo de la unidad SI", value: "m³" },
      { label: "Unidad mas habitual en el uso diario", value: "Litro (L)" },
    ],
    sections: [
      {
        title: "¿Que es el volumen?",
        paragraphs: [
          "El volumen es la extension del espacio tridimensional ocupado por un objeto o que puede contener un recipiente. El volumen de un objeto solido expresa su magnitud fisica, mientras que el volumen de un recipiente expresa la cantidad de liquido o gas que puede contener.",
          "El volumen es una magnitud derivada, obtenida al multiplicar una unidad de longitud en las tres dimensiones (ancho, alto, profundidad). Por eso su dimension SI es L³.",
        ],
      },
      {
        title: "La unidad SI del volumen: el metro cubico",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada del volumen es el metro cubico (m³), que representa el volumen interior de un cubo cuyo lado mide exactamente 1 metro.",
          "El metro cubico se usa para grandes volumenes (depositos de agua, vertido de hormigon, volumen de contenedores), mientras que en la vida cotidiana se prefiere el litro, mucho mas pequeno. Un metro cubico equivale exactamente a 1000 litros.",
        ],
      },
      {
        title: "La relacion entre el litro y el metro cubico",
        paragraphs: [
          "El litro es una unidad de volumen practica, cuyo uso junto al SI esta aceptado, aunque no es oficialmente una unidad del SI. Un litro equivale al volumen de un cubo de 10 centimetros de lado (1000 centimetros cubicos).",
          "Los submultiplos del litro -- decilitro, centilitro y mililitro -- se usan ampliamente en mediciones de alimentos, medicamentos y laboratorio. Un mililitro equivale exactamente a un centimetro cubico (1 mL = 1 cm³).",
        ],
      },
      {
        title: "¿Por que las unidades de volumen se convierten con una razon cubica?",
        paragraphs: [
          "Mientras que las unidades de longitud se convierten con una razon lineal y las de superficie con una razon cuadratica, las unidades de volumen se convierten con una razon cubica. Por ejemplo, 1 metro equivale a 100 centimetros, pero 1 metro cubico no equivale a 100 centimetros cubicos, sino a 100³, es decir 1 000 000 centimetros cubicos.",
          "Esta relacion cubica surge porque el volumen varia simultaneamente en tres dimensiones y es el error conceptual mas frecuente en las conversiones de volumen -- exige un calculo especialmente cuidadoso al pasar a unidades no metricas como el galon o el pie cubico.",
        ],
      },
      {
        title: "Las medidas de cocina",
        paragraphs: [
          "Las medidas usadas en las recetas, como la cucharada, la cucharadita y la taza, son unidades de volumen estandarizadas que permiten obtener resultados coherentes en distintas cocinas. Equivalencias generalmente aceptadas: 1 cucharada ≈ 15 mL, 1 cucharadita ≈ 5 mL, 1 taza ≈ 240 mL.",
          "Estas medidas no son estandares cientificos exactos, sino valores aproximados ampliamente aceptados en la practica culinaria; en recetas que requieren precision (especialmente reposteria), usar una bascula de cocina digital es mas fiable.",
        ],
      },
      {
        title: "Las unidades de volumen liquido estadounidenses y britanicas",
        paragraphs: [
          "Los sistemas estadounidense y britanico usan unidades como el galon, el cuarto, la pinta y la onza liquida; pero el tamano de estas unidades difiere entre ambos sistemas. Un galon estadounidense equivale a 3,78541 litros, mientras que un galon imperial britanico equivale a 4,54609 litros -- alrededor de un 20% mas.",
          "Esta diferencia se debe a que los dos paises adoptaron historicamente galones de referencia distintos (el galon de vino en Estados Unidos, el galon imperial en el Reino Unido). Siempre conviene verificar a que sistema pertenece el valor de 'galon' u 'onza' indicado en una receta o en la etiqueta de un producto.",
        ],
      },
      {
        title: "Las unidades de volumen agricolas e historicas",
        paragraphs: [
          "El bushel y el peck son unidades de volumen usadas historicamente para medir productos secos como cereales, frutas y verduras; hoy en dia siguen usandose en algunos mercados agricolas, especialmente en Estados Unidos.",
          "En la epoca otomana, el kile y el şinik eran unidades de volumen tradicionales usadas para medir cereales; 1 kile equivalia a 20 şinik. Aunque estas unidades presentan pequenas variaciones regionales, hoy sirven como referencia para interpretar textos y registros historicos.",
        ],
      },
      {
        title: "¿Como se calcula un volumen?",
        paragraphs: [
          "Para un prisma rectangular (caja) se usa la formula Volumen = Longitud × Anchura × Altura. Para un cilindro se aplica Volumen = π × Radio² × Altura, y para una esfera, Volumen = (4/3) × π × Radio³.",
          "El volumen de solidos de forma irregular suele determinarse mediante el metodo del desplazamiento (principio de Arquimedes) -- sumergiendo el objeto en un recipiente lleno de agua y midiendo el volumen de agua desplazado.",
        ],
      },
      {
        title: "Medicion del volumen en el petroleo y la industria",
        paragraphs: [
          "En la industria petrolera, el volumen se expresa generalmente en barriles (bbl); 1 barril equivale exactamente a 158,987 litros (42 galones estadounidenses). Esta unidad es una tradicion que se remonta al siglo XIX, cuando el petroleo se transportaba en barriles de madera originalmente destinados al vino.",
          "En los procesos industriales, los grandes volumenes suelen expresarse en metros cubicos, y las mediciones pequenas de laboratorio en mililitros; la unidad adecuada se elige segun la magnitud del volumen medido.",
        ],
      },
    ],
    unitTable: [
      { name: "Mililitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrico", commonUse: "Dosis medicas y mediciones pequenas" },
      { name: "Cucharadita", symbol: "cdta", referenceValue: "0,000005 m³ (≈5 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Cucharada", symbol: "cda", referenceValue: "0,000015 m³ (≈15 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Taza", symbol: "taza", referenceValue: "0,00024 m³ (≈240 mL)", system: "Medida de cocina", commonUse: "Recetas de cocina" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Metrico", commonUse: "Bebidas, combustible y volumen diario" },
      { name: "Onza liquida (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Estados Unidos", commonUse: "Bebidas y envases cosmeticos" },
      { name: "Pinta (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Estados Unidos", commonUse: "Medicion de cerveza y leche" },
      { name: "Galon (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Estados Unidos", commonUse: "Combustible y grandes volumenes liquidos" },
      { name: "Galon imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britanico (imperial)", commonUse: "Combustible y medicion de liquidos en el Reino Unido" },
      { name: "Pie cubico", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britanico/estadounidense", commonUse: "Construccion y caudal de aire en climatizacion" },
      { name: "Barril (petroleo)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industria petrolera", commonUse: "Medicion de petroleo crudo" },
      { name: "Metro cubico", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Depositos de agua, hormigon y grandes volumenes" },
    ],
  },
  {
    locale: "es",
    slug: "masa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversion de unidades de masa",
    description:
      "Convierte rapido y gratis entre kilogramos, gramos, miligramos, toneladas y libras.",
    introduction: [
      "La masa es una magnitud fisica fundamental relacionada con la cantidad de materia de un objeto y su propiedad de inercia. En el Sistema Internacional de Unidades, la unidad basica de la masa es el kilogramo, simbolizado por kg.",
      "Aunque en el lenguaje cotidiano masa y peso se usan a menudo como sinonimos, son magnitudes fisicamente distintas. La masa se mide en kilogramos, mientras que el peso, al ser una fuerza, se mide en newtons.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Masa" },
      { label: "Simbolo dimensional", value: "[M]" },
      { label: "Unidad basica del SI", value: "Kilogramo" },
      { label: "Simbolo de la unidad SI", value: "kg" },
      { label: "Ambito de la metrologia", value: "Metrologia de la masa" },
    ],
    sections: [
      {
        title: "¿Que es la masa?",
        paragraphs: [
          "La masa es la magnitud fisica relacionada con la resistencia que ofrece un objeto al cambio de su estado de movimiento, es decir, con la inercia. En la mecanica clasica, la relacion entre la fuerza neta aplicada a un objeto y la aceleracion producida se expresa mediante la igualdad F = m·a.",
          "Al aplicar la misma fuerza, un objeto con mayor masa adquiere una aceleracion menor. Por eso la masa no solo expresa, en sentido cotidiano, la cantidad de materia contenida en un objeto, sino que desempena un papel fundamental en las ecuaciones del movimiento.",
          "La masa es una magnitud escalar. No tiene direccion y su simbolo dimensional basico en el sistema SI es la letra M.",
        ],
      },
      {
        title: "La diferencia entre masa y peso",
        paragraphs: [
          "La masa y el peso no son la misma magnitud fisica. La masa es una propiedad del objeto y se expresa en kilogramos. El peso, en cambio, es la fuerza que sufre el objeto en un campo gravitatorio y se mide en newtons.",
          "La relacion simplificada del peso se escribe W = m·g, donde W representa la fuerza de peso, m la masa y g la aceleracion de la gravedad local.",
          "La masa de un objeto permanece aproximadamente igual en la Tierra y en la Luna; sin embargo, su peso varia porque la aceleracion de la gravedad local es diferente. Por eso, en el uso cientifico, el kilogramo es una unidad de masa y no de peso.",
          "En el lenguaje cotidiano, como el resultado de pesar algo se expresa en kilogramos, las palabras 'peso' y 'masa' se usan a menudo indistintamente. El instrumento de medicion en realidad detecta el efecto de una fuerza, pero esta calibrado para mostrar el resultado en unidad de masa.",
        ],
      },
      {
        title: "¿Por que el kilogramo es la unidad basica del SI para la masa?",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad basica de la masa es el kilogramo. Entre las unidades basicas del SI, el kilogramo es la unica cuyo nombre incluye un prefijo.",
          "La palabra gramo desempeno historicamente un papel importante en las primeras definiciones de masa del sistema metrico. Pero al establecerse los patrones practicos, el kilogramo se convirtio en la referencia fundamental.",
          "Actualmente, el kilogramo ya no se define por la masa de un cilindro metalico fisico, sino a partir del valor numerico fijado de la constante de Planck. La relacion de esta definicion con la balanza de Kibble y las mediciones electricas se examina en detalle en la pagina de informacion dedicada al kilogramo.",
        ],
      },
      {
        title: "Las unidades metricas de masa",
        paragraphs: [
          "Las unidades metricas de masa se construyen a partir del kilogramo, el gramo y los prefijos del SI que se les anaden. Un gramo equivale a 0,001 kilogramos, un miligramo a 0,001 gramos y un microgramo a 0,001 miligramos.",
          "Para masas grandes se usa la tonelada. Una tonelada metrica equivale exactamente a 1000 kilogramos. El simbolo de la tonelada, cuyo uso junto al SI esta aceptado, es la letra minuscula t.",
          "La unidad adecuada se elige segun la magnitud de la masa medida. La masa de una persona o de un producto puede expresarse en kilogramos, el contenido de un alimento en gramos, el principio activo de un medicamento en miligramos o microgramos, y la carga de un vehiculo en toneladas.",
        ],
      },
      {
        title: "La relacion entre la libra, la onza y el kilogramo",
        paragraphs: [
          "La libra y la onza son unidades de masa usadas en los sistemas de medida tradicionales britanico y estadounidense. La libra avoirdupois internacional equivale exactamente a 0,45359237 kilogramos.",
          "Una libra avoirdupois se divide en 16 onzas. Por tanto, una onza equivale exactamente a 0,028349523125 kilogramos, o 28,349523125 gramos.",
          "La libra usada para la masa y la libra-fuerza (pound-force), una unidad de fuerza, son magnitudes diferentes. La libra expresa una masa, y la libra-fuerza, una fuerza. En calculos tecnicos no deben confundirse los simbolos lb y lbf.",
        ],
      },
      {
        title: "¿Como se mide la masa?",
        paragraphs: [
          "Para medir la masa pueden usarse balanzas de dos platillos, basculas electronicas, balanzas analiticas, celulas de carga y diversos sistemas de pesaje industrial de distintas capacidades.",
          "Las balanzas comparativas comparan la masa desconocida con masas patron trazables. En las basculas electronicas, las celulas de carga convierten la fuerza aplicada en una senal electrica.",
          "En mediciones de alta precision pueden tenerse en cuenta factores como el empuje del aire, la aceleracion de la gravedad local, la temperatura, la humedad, las vibraciones, los efectos electrostaticos y la densidad de la masa patron.",
          "La vinculacion de los patrones de masa con los sistemas de medicion nacionales e internacionales se denomina trazabilidad metrologica. La cadena de calibracion permite comparar las mediciones realizadas en distintos laboratorios y empresas.",
        ],
      },
      {
        title: "La relacion entre densidad, volumen y masa",
        paragraphs: [
          "Entre la masa, la densidad y el volumen existe la relacion m = ρ·V. Aqui, m representa la masa, ρ la densidad y V el volumen.",
          "Para un mismo volumen, la masa de dos materiales distintos puede diferir segun su densidad. Por ejemplo, para el mismo volumen, el acero y el agua no tienen la misma masa.",
          "En el sistema SI, la unidad derivada basica de la densidad es el kilogramo por metro cubico. En aplicaciones de laboratorio tambien se usan habitualmente unidades como el gramo por centimetro cubico o el gramo por mililitro.",
        ],
      },
      {
        title: "La incertidumbre en la medicion de la masa",
        paragraphs: [
          "Toda medicion real conlleva cierta incertidumbre. Que una bascula muestre muchas cifras en la pantalla no significa que todas esas cifras se conozcan con la misma precision.",
          "La resolucion del instrumento, la repetibilidad, la no linealidad, el patron de calibracion, las condiciones ambientales y el metodo del usuario pueden contribuir a la incertidumbre de la medicion de masa.",
          "En trabajos cientificos e industriales, el resultado de una medicion debe evaluarse junto con la unidad adecuada, el numero de cifras significativas y la informacion sobre la incertidumbre.",
        ],
      },
      {
        title: "¿Como elegir la unidad de masa adecuada?",
        paragraphs: [
          "Elegir una unidad acorde a la magnitud del objeto medido hace que el resultado sea mas legible. La masa de una persona puede expresarse en kilogramos, el principio activo de una pastilla en miligramos, y la carga de un camion en toneladas.",
          "Para masas muy pequenas pueden usarse unidades con prefijo del SI como el microgramo, el nanogramo y el picogramo. A escala atomica y molecular, unidades especificas como la unidad de masa atomica unificada pueden ser mas practicas.",
          "Al realizar una conversion de unidades hay que comprobar no solo el valor numerico, sino tambien si la unidad utilizada expresa masa o fuerza.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogramo", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Cantidades de materia muy pequenas" },
      { name: "Microgramo", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Mediciones medicas y de laboratorio" },
      { name: "Miligramo", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Dosis de medicamentos y sustancias quimicas" },
      { name: "Gramo", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentos y objetos pequenos" },
      { name: "Kilogramo", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Mediciones de masa basicas" },
      { name: "Tonelada", symbol: "t", referenceValue: "1000 kg", system: "Metrico", commonUse: "Transporte, carga e industria" },
      { name: "Onza", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britanico/estadounidense", commonUse: "Alimentos y masas pequenas" },
      { name: "Libra", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britanico/estadounidense", commonUse: "Masa corporal y de productos" },
    ],
  },
  {
    locale: "es",
    slug: "temperatura",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversion de unidades de temperatura",
    description:
      "Convierte temperaturas entre Celsius, Fahrenheit y Kelvin; consulta formulas y valores de ejemplo.",
    introduction: [
      "La temperatura es una magnitud fisica fundamental relacionada con la energia cinetica media de las particulas de una materia, que expresa cuan 'caliente' o 'fria' esta esa materia. En el Sistema Internacional de Unidades, la unidad basica de la temperatura es el kelvin.",
      "En la vida cotidiana, las escalas Celsius y Fahrenheit son las mas usadas; en trabajos cientificos se usa el kelvin, en algunos calculos de ingenieria el Rankine, y en textos historicos puede aparecer el Reaumur. A diferencia de muchas otras magnitudes fisicas, la conversion de temperatura entre unidades requiere no solo multiplicacion, sino tambien suma o resta.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Temperatura (temperatura termodinamica)" },
      { label: "Simbolo dimensional", value: "[Θ]" },
      { label: "Unidad basica del SI", value: "Kelvin" },
      { label: "Simbolo de la unidad SI", value: "K" },
      { label: "Cero absoluto", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "¿Que es la temperatura?",
        paragraphs: [
          "La temperatura es una magnitud directamente relacionada con la energia cinetica (de movimiento) media de los atomos y moleculas que componen una materia. Cuanto mas rapido se mueven las particulas, mas 'caliente' se considera la materia.",
          "La temperatura es una de las siete magnitudes basicas del Sistema Internacional de Unidades y, como temperatura termodinamica, se representa con el simbolo Θ (theta). A diferencia de muchas otras magnitudes (como la longitud o la masa), no es una magnitud directamente aditiva -- poner en contacto dos cuerpos no suma sus temperaturas, sino que los conduce hacia un equilibrio.",
        ],
      },
      {
        title: "La unidad SI de la temperatura: el kelvin",
        paragraphs: [
          "El kelvin es la unidad basica del SI para la temperatura y se representa con el simbolo K (sin el signo de grado, se escribe simplemente 'K'). La escala Kelvin toma el cero absoluto (la temperatura mas baja teoricamente posible) como punto de partida (0 K).",
          "Desde la revision del SI de 2019, el kelvin ya no se define a partir del punto triple del agua, sino a partir del valor numerico fijado de la constante de Boltzmann (k). Esto garantiza que la unidad de temperatura se base en una constante universal y no en una sustancia de referencia fisica.",
        ],
      },
      {
        title: "¿Por que la conversion de temperatura no es una simple multiplicacion?",
        paragraphs: [
          "En magnitudes como la longitud o la masa, la conversion de unidades se realiza solo con un factor multiplicativo (por ejemplo, metro-centimetro). En la temperatura, como las escalas Celsius, Fahrenheit y Kelvin tienen 'puntos cero' distintos, la conversion requiere tanto multiplicacion como suma o resta.",
          "Por ejemplo, para pasar de Celsius a Fahrenheit, el valor se multiplica primero por 9/5 y luego se le suma 32: °F = (°C × 9/5) + 32. Por eso la temperatura es, matematicamente, la unica magnitud fisica comun con una relacion de conversion 'afin' (lineal, pero que no pasa por el origen).",
        ],
      },
      {
        title: "La escala Celsius",
        paragraphs: [
          "La escala Celsius fue desarrollada en 1742 por el astronomo sueco Anders Celsius y define el punto de congelacion del agua en 0 °C y su punto de ebullicion (a una atmosfera de presion) en 100 °C. Es un sistema de referencia practico que facilita la comprension de la escala en la vida cotidiana.",
          "El Celsius es la escala de temperatura mas usada en el mundo tanto en trabajos cientificos como en la informacion meteorologica diaria de la mayoria de los paises; un pequeno numero de paises, como Estados Unidos, sigue prefiriendo el Fahrenheit en el uso diario.",
        ],
      },
      {
        title: "La escala Fahrenheit",
        paragraphs: [
          "La escala Fahrenheit fue desarrollada en 1724 por el fisico aleman Daniel Gabriel Fahrenheit. En esta escala, el punto de congelacion del agua es 32 °F y el punto de ebullicion 212 °F -- un intervalo exacto de 180 grados entre la congelacion y la ebullicion.",
          "El Fahrenheit se sigue usando hoy para las mediciones de temperatura cotidianas en un pequeno numero de paises, principalmente Estados Unidos; en los trabajos cientificos a nivel mundial ha cedido en gran medida su lugar al Celsius y al Kelvin.",
        ],
      },
      {
        title: "Rankine y Reaumur: escalas menos conocidas",
        paragraphs: [
          "El Rankine es una escala de temperatura absoluta que usa unidades del mismo tamano que el grado Fahrenheit, pero toma el cero absoluto como 0 °R; el punto de congelacion del agua es 491,67 °R. Se prefiere especialmente al Kelvin en algunos calculos de ingenieria termodinamica en Estados Unidos.",
          "La escala Reaumur fue desarrollada en el siglo XVIII por el cientifico frances Rene Reaumur; fija el punto de congelacion del agua en 0 °Ré y el de ebullicion en 80 °Ré. Aunque hoy practicamente no se usa, todavia puede encontrarse como referencia historica en algunos paises europeos (especialmente en algunas recetas tradicionales de Rusia).",
        ],
      },
      {
        title: "¿Que significa el cero absoluto?",
        paragraphs: [
          "El cero absoluto (0 kelvin, -273,15 °C, -459,67 °F) es la temperatura teorica en la que las particulas poseen, en sentido clasico, la menor energia cinetica posible. Segun la mecanica cuantica, las particulas no permanecen completamente inmoviles ni siquiera en el cero absoluto (energia del punto cero), pero en sentido clasico no puede definirse una temperatura mas baja.",
          "En laboratorio se han alcanzado temperaturas extremadamente cercanas al cero absoluto (del orden del microkelvin, incluso del nanokelvin), pero segun el tercer principio de la termodinamica es imposible alcanzar exactamente el cero absoluto en un numero finito de pasos.",
        ],
      },
      {
        title: "¿Como se mide la temperatura?",
        paragraphs: [
          "Para medir la temperatura se usan distintas tecnologias: termometros de mercurio o alcohol, termometros digitales, termopares, termometros de resistencia (RTD) y termometros infrarrojos (sin contacto). Cada uno es adecuado para un rango de temperatura y un nivel de precision diferentes.",
          "Los termopares se usan ampliamente en entornos industriales porque pueden funcionar en un rango de temperatura muy amplio (a veces de -200 °C a +2000 °C); calculan la temperatura a partir de la diferencia de tension generada en la union de dos metales distintos.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unidad basica", system: "SI", commonUse: "Calculos cientificos y termodinamicos" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrico (uso cotidiano)", commonUse: "Meteorologia, vida cotidiana, ciencia" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Estados Unidos", commonUse: "Meteorologia diaria en Estados Unidos" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Estados Unidos (ingenieria)", commonUse: "Calculos de ingenieria termodinamica" },
      { name: "Reaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Historico (Europa)", commonUse: "Textos historicos, recetas tradicionales" },
    ],
  },
  {
    locale: "es",
    slug: "tiempo",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversion de unidades de tiempo",
    description:
      "Usa en una sola pagina las conversiones de tiempo esenciales entre segundos, minutos y horas.",
    introduction: [
      "El tiempo es una magnitud fisica fundamental que expresa el orden en que ocurren los sucesos y la duracion que los separa. En el Sistema Internacional de Unidades, la unidad basica del tiempo es el segundo, usado junto con unidades derivadas como el minuto, la hora y el dia en la vida cotidiana.",
      "A diferencia de magnitudes como la longitud o la masa, el tiempo es uno de los conceptos de medicion mas antiguos de la historia humana; la estructura sexagesimal (base 60) de la hora, el minuto y el segundo se remonta a miles de anos, hasta la antigua civilizacion babilonica.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Tiempo" },
      { label: "Simbolo dimensional", value: "[T]" },
      { label: "Unidad basica del SI", value: "Segundo" },
      { label: "Simbolo de la unidad SI", value: "s" },
      { label: "Definicion actual del segundo", value: "9 192 631 770 periodos de oscilacion del atomo de cesio-133" },
    ],
    sections: [
      {
        title: "¿Que es el tiempo?",
        paragraphs: [
          "El tiempo es una magnitud fundamental que expresa el orden en que ocurren los sucesos y la duracion transcurrida entre dos sucesos. En fisica se representa con el simbolo dimensional T e interviene en la definicion de numerosas magnitudes derivadas, como la velocidad, la aceleracion y la frecuencia.",
          "En la fisica clasica, el tiempo se consideraba una magnitud absoluta que transcurria igual para todos los observadores; con la teoria de la relatividad de Einstein se comprendio que el tiempo puede transcurrir de forma distinta segun la velocidad del observador y el campo gravitatorio (dilatacion del tiempo).",
        ],
      },
      {
        title: "La unidad SI del tiempo: el segundo",
        paragraphs: [
          "El segundo es la unidad basica del SI para el tiempo, simbolizada por s. Historicamente, el segundo se definia como 1/86 400 de un dia (24 horas × 60 minutos × 60 segundos).",
          "Al resultar esta definicion insuficientemente estable debido a pequenas irregularidades en la velocidad de rotacion de la Tierra, en 1967 el segundo se redefinio como exactamente 9 192 631 770 periodos de la radiacion asociada a la transicion entre dos niveles de energia fundamentales del atomo de cesio-133. Esta definicion permite que los relojes atomicos funcionen con la misma precision en cualquier lugar del mundo.",
        ],
      },
      {
        title: "El origen sexagesimal de la hora, el minuto y el segundo",
        paragraphs: [
          "La division de una hora en 60 minutos y de un minuto en 60 segundos se remonta al sistema numerico sexagesimal (base 60) usado por la antigua civilizacion babilonica. Los babilonios dividian tanto el angulo (360 grados) como el tiempo segun este sistema.",
          "El numero 60 se eligio porque es divisible exactamente entre muchos numeros -- 2, 3, 4, 5, 6, 10, 12, 15, 20 y 30 -- lo que facilita repartos practicos en calculos cotidianos (por ejemplo, dividir una hora en tres o cuatro partes) sin necesidad de numeros fraccionarios.",
        ],
      },
      {
        title: "La division del dia en 24 horas",
        paragraphs: [
          "La division del dia en 24 horas se remonta al Antiguo Egipto; los egipcios dividian el dia en 12 partes iguales y la noche en otras 12, siguiendo el tiempo mediante relojes de sol y observaciones estelares.",
          "Esta division en 12 probablemente se inspiro en el conteo de las falanges de los dedos (tres falanges en cada uno de los cuatro dedos sin contar el pulgar, 12 en total) o en el numero de ciclos lunares de un ano (unas 12 lunas llenas).",
        ],
      },
      {
        title: "La relacion entre las unidades metricas de tiempo",
        paragraphs: [
          "Los submultiplos del segundo -- el milisegundo (0,001 segundos), el microsegundo y el nanosegundo -- se usan para medir sucesos muy breves, como las operaciones de los procesadores informaticos, el cronometraje deportivo y los experimentos cientificos.",
          "Sus multiplos -- el minuto (60 segundos), la hora (3600 segundos) y el dia (86 400 segundos) -- son las unidades basicas usadas a diario para llevar la cuenta del tiempo. La conversion entre estas unidades se hace, a diferencia de la temperatura, solo mediante multiplicacion/division, porque todas comparten un punto cero (origen) comun.",
        ],
      },
      {
        title: "¿Que es un segundo intercalar?",
        paragraphs: [
          "La velocidad de rotacion de la Tierra sobre su eje presenta, con el tiempo, pequenas irregularidades debidas a los efectos de las mareas y a cambios en su estructura interna; esto crea un pequeno desfase entre el tiempo 'preciso' medido por los relojes atomicos y la duracion del dia basada en la rotacion real de la Tierra.",
          "Para compensar este desfase, desde 1972 se anade un 'segundo intercalar' al Tiempo Universal Coordinado (UTC) cuando es necesario. Es un mecanismo de correccion similar al dia adicional de los anos bisiestos (29 de febrero), pero como la irregularidad de la rotacion terrestre es impredecible, los segundos intercalares no se anaden en un ciclo fijo como el calendario, sino segun se necesite.",
        ],
      },
      {
        title: "Los husos horarios y el UTC",
        paragraphs: [
          "La Tierra esta dividida en unos 24 husos horarios, porque el Sol alcanza su punto mas alto a horas distintas segun la longitud. Todos los husos horarios usan el Tiempo Universal Coordinado (UTC) como punto de referencia y se expresan mediante una diferencia horaria respecto a esta referencia segun su region (por ejemplo, Mexico central es UTC-6 y Argentina es UTC-3).",
          "El UTC es un estandar de tiempo moderno que sustituyo al antiguo Tiempo Medio de Greenwich (GMT) y se mantiene mediante relojes atomicos; el GMT hoy se usa sobre todo como nombre del huso horario correspondiente al horario de invierno en el Reino Unido.",
        ],
      },
      {
        title: "¿Como se mide el tiempo?",
        paragraphs: [
          "En la vida cotidiana se usan relojes mecanicos y digitales, mientras que en aplicaciones cientificas y tecnologicas (satelites GPS, redes de telecomunicaciones) se usan relojes atomicos. Los relojes atomicos funcionan con una precision extremadamente alta, basada en la frecuencia de oscilacion estable de atomos de cesio o rubidio.",
          "Para que el sistema GPS pueda determinar una posicion precisa, los relojes atomicos de los satelites deben estar sincronizados con precision de nanosegundos; incluso un pequeno desfase en estos relojes puede provocar grandes errores en el calculo de la posicion en tierra.",
        ],
      },
    ],
    unitTable: [
      { name: "Milisegundo", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrico", commonUse: "Operaciones informaticas y cronometraje deportivo" },
      { name: "Segundo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Medicion de tiempo basica" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Aceptado junto al SI", commonUse: "Control del tiempo cotidiano" },
      { name: "Hora", symbol: "h", referenceValue: "3600 s", system: "Aceptado junto al SI", commonUse: "Tiempo de trabajo, tiempo de viaje" },
      { name: "Dia", symbol: "dia", referenceValue: "86 400 s", system: "Aceptado junto al SI", commonUse: "Calendario y calculos de duracion" },
    ],
  },
  {
    locale: "es",
    slug: "velocidad",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversion de unidades de velocidad",
    description:
      "Convierte la velocidad entre km/h, m/s y mph; consulta ejemplos de ingenieria y de uso cotidiano.",
    introduction: [
      "La velocidad es una magnitud fisica derivada que expresa la distancia recorrida por un objeto por unidad de tiempo. Como se obtiene al dividir una longitud entre un tiempo, la dimension de la velocidad es L/T (longitud dividida entre tiempo).",
      "En la vida cotidiana, el kilometro por hora (km/h) y la milla por hora (mph) son las unidades de velocidad mas usadas; el metro por segundo (m/s) se prefiere en trabajos cientificos, y el nudo en la navegacion maritima y aerea. La velocidad de la luz ocupa un lugar especial entre las unidades de velocidad, como limite superior absoluto alcanzable en el universo.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Velocidad" },
      { label: "Simbolo dimensional", value: "[L/T]" },
      { label: "Unidad derivada del SI", value: "Metro por segundo" },
      { label: "Simbolo de la unidad SI", value: "m/s" },
      { label: "Limite de velocidad universal", value: "Velocidad de la luz ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "¿Que es la velocidad?",
        paragraphs: [
          "La velocidad expresa la distancia recorrida por un objeto por unidad de tiempo y se calcula con la formula Velocidad = Distancia / Tiempo. Aunque la fisica distingue tecnicamente entre 'rapidez' (escalar, sin direccion) y 'velocidad' (vectorial, con direccion), en el lenguaje cotidiano ambos terminos suelen usarse indistintamente.",
          "La velocidad es una magnitud derivada, obtenida al dividir una unidad de longitud entre una unidad de tiempo. Por eso su dimension SI se denota L/T (o L¹T⁻¹).",
        ],
      },
      {
        title: "La unidad SI de la velocidad: el metro por segundo",
        paragraphs: [
          "En el Sistema Internacional de Unidades, la unidad derivada de la velocidad es el metro por segundo (m/s), que expresa que un objeto recorre un metro cada segundo. Esta unidad se usa como estandar en calculos cientificos y formulas de fisica.",
          "En la vida cotidiana se prefiere el kilometro por hora (km/h) al metro por segundo, porque las velocidades de los vehiculos y las distancias por carretera se expresan asi con numeros mas intuitivos a esa escala. 1 m/s equivale exactamente a 3,6 km/h.",
        ],
      },
      {
        title: "El kilometro por hora y la milla por hora",
        paragraphs: [
          "El kilometro por hora (km/h) es la unidad estandar de velocidad vial en los paises que usan el sistema metrico, entre ellos todos los paises de America Latina. La milla por hora (mph) se prefiere en paises que usan el sistema de medidas britanico, como Estados Unidos y el Reino Unido.",
          "1 mph equivale a unos 1,60934 km/h. Esta diferencia es una fuente practica de confusion que puede llevar a interpretar mal los velocimetros de vehiculos importados o los limites de velocidad al alquilar un coche en el extranjero.",
        ],
      },
      {
        title: "El nudo: la velocidad en la navegacion maritima y aerea",
        paragraphs: [
          "El nudo (milla nautica por hora) es la unidad de velocidad estandar en la navegacion maritima y aerea; 1 nudo significa exactamente recorrer una milla nautica (1852 metros) en una hora.",
          "El nombre de la unidad 'nudo' proviene historicamente del metodo usado para medir la velocidad de los barcos: se arrojaba al agua una cuerda marcada con nudos y se contaba cuantos nudos pasaban en un tiempo determinado. Este metodo se uso durante siglos antes de la aparicion de los instrumentos modernos de medicion de velocidad.",
        ],
      },
      {
        title: "La velocidad de la luz: el limite de velocidad del universo",
        paragraphs: [
          "La velocidad de la luz en el vacio se define exactamente como 299 792 458 m/s y constituye, segun la teoria de la relatividad especial de Einstein, el limite superior absoluto que puede alcanzar la informacion o un objeto con masa en el universo.",
          "El hecho de que la velocidad de la luz este definida como un numero exacto (y ya se considerara constante antes de la revision del SI de 2019) permite que la definicion actual del metro tambien se apoye en esta constante -- el metro se define como la distancia recorrida por la luz en 1/299 792 458 de segundo.",
        ],
      },
      {
        title: "El numero de Mach: una relacion con la velocidad del sonido",
        paragraphs: [
          "En aviacion, las velocidades altas suelen expresarse mediante el numero de Mach, que representa la relacion entre la velocidad de un objeto y la velocidad del sonido en ese medio (Mach 1 = velocidad del sonido). La velocidad del sonido no es un valor fijo; varia segun la temperatura y la densidad del aire (unos 343 m/s, o 1235 km/h, al nivel del mar).",
          "Por eso, un mismo numero de Mach puede corresponder a velocidades reales distintas (en km/h o m/s) segun la altitud y la temperatura -- la velocidad Mach 0,85 de un avion varia en su valor real con la altitud.",
        ],
      },
      {
        title: "La diferencia entre velocidad media y velocidad instantanea",
        paragraphs: [
          "La velocidad media se obtiene dividiendo la distancia total recorrida entre el tiempo total transcurrido y ofrece un unico valor para todo un trayecto. La velocidad instantanea es la velocidad de un objeto en un momento concreto y puede variar continuamente (aceleracion, desaceleracion, parada, etc.).",
          "Mientras que el velocimetro de un vehiculo muestra la velocidad instantanea, la velocidad media de un trayecto suele calcularse a posteriori a partir de la distancia total y la duracion total -- ambos valores difieren mientras la velocidad no se haya mantenido constante durante el trayecto.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimetro por segundo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrico", commonUse: "Laboratorio y medicion de movimiento lento" },
      { name: "Metro por minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrico", commonUse: "Velocidad de cintas transportadoras industriales" },
      { name: "Metro por segundo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Calculos cientificos y fisicos" },
      { name: "Kilometro por hora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metrico", commonUse: "Velocidad de vehiculos y limites viales" },
      { name: "Milla por hora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britanico/estadounidense", commonUse: "Velocidad de vehiculos en Estados Unidos y el Reino Unido" },
      { name: "Nudo", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navegacion maritima/aerea", commonUse: "Velocidad de barcos y aviones" },
      { name: "Kilometro por minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrico", commonUse: "Calculos de velocidad en distancias cortas" },
      { name: "Kilometro por segundo", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrico", commonUse: "Velocidad de naves espaciales y cuerpos celestes" },
      { name: "Velocidad de la luz", symbol: "c", referenceValue: "299 792 458 m/s", system: "Constante universal", commonUse: "Calculos de fisica y astronomia" },
    ],
  },
  {
    locale: "es",
    slug: "presion",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversion de unidades de presion",
    description:
      "Convierte la presion entre pascal, kilopascal, bar y PSI; consulta formulas y usos en ingenieria.",
    introduction: [
      "La presion es la magnitud fisica que expresa la cantidad de fuerza que actua perpendicularmente sobre una superficie, en relacion con esa superficie. Su campo de aplicacion es muy amplio, desde las tensiones de contacto entre solidos hasta el fluido en una tuberia, desde la atmosfera hasta los sistemas de vacio. En ingenieria, la presion no es solo un valor numerico: es una variable de diseno fundamental para la seguridad, la estanqueidad, la resistencia estructural, la conversion de energia y el control de procesos.",
      "En el Sistema Internacional de Unidades, la unidad derivada de la presion es el pascal, simbolizado por Pa. Un pascal corresponde a la presion ejercida por una fuerza de un newton repartida uniformemente sobre una superficie de un metro cuadrado. Por eso la presion esta directamente ligada a los conceptos de fuerza y superficie; comparte la misma estructura dimensional con el esfuerzo mecanico de los materiales, aunque el contexto fisico no siempre es el mismo.",
      "En la vida cotidiana y en la industria, la presion se expresa la mayoria de las veces en unidades mas practicas que el pascal. El kilopascal y el PSI se usan mucho para la presion de los neumaticos, el bar en sistemas de proceso, el atm en condiciones atmosfericas y el milibar en meteorologia. El hecho de que distintos sectores hayan adoptado historicamente unidades diferentes hace especialmente importante entender bien las conversiones de presion y no confundir los tipos de presion absoluta, relativa o diferencial.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Presion" },
      { label: "Unidad derivada del SI", value: "Pascal" },
      { label: "Simbolo SI", value: "Pa" },
      { label: "Relacion basica", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Formula dimensional", value: "M L⁻¹ T⁻²" },
      { label: "Atmosfera estandar", value: "101 325 Pa" },
      { label: "Referencia del cero absoluto", value: "Vacio total" },
    ],
    sections: [
      {
        title: "¿Que es la presion?",
        paragraphs: [
          "La presion no depende solo de la magnitud de la fuerza aplicada sobre una superficie, sino tambien de la superficie sobre la que se reparte esa fuerza. Si se aplica la misma fuerza sobre una superficie mas pequena, la presion aumenta; si se reparte sobre una superficie mayor, disminuye. Por eso un cuchillo bien afilado puede cortar con poca fuerza, mientras que la misma fuerza sobre una base ancha produce un efecto superficial mucho menor.",
          "En mecanica de fluidos, la presion se considera la componente de esfuerzo normal que un fluido en reposo o en movimiento ejerce sobre su entorno. En un fluido en reposo, la presion se transmite en todas las direcciones y esta relacionada con el principio de Pascal en recipientes cerrados. Esta propiedad es la base de las prensas hidraulicas, los sistemas de frenado y numerosos actuadores industriales.",
          "El concepto de presion no se limita a liquidos y gases. El efecto de la fuerza normal media en las superficies de contacto tambien crea una distribucion similar a la presion. Pero en ingenieria, al hablar de presion se suele pensar principalmente en sistemas fluidos como tuberias, depositos, compresores, conductos de aire, camaras de vacio y el entorno atmosferico.",
        ],
      },
      {
        title: "La formula de la presion: P = F / A",
        paragraphs: [
          "La definicion basica de la presion viene dada por la relacion P = F / A. Aqui, P representa la presion, F la componente de fuerza perpendicular a la superficie, y A la superficie sobre la que se reparte esa fuerza. El analisis dimensional da newton dividido entre metro cuadrado, lo que equivale a la unidad pascal.",
          "Esta relacion, suponiendo una distribucion uniforme de la fuerza, da la presion media. En problemas de contacto reales o en campos complejos dentro de un fluido, la presion puede variar a lo largo de la superficie. En ese caso, en lugar de un unico valor medio, se tiene en cuenta la distribucion local de presion, ecuaciones diferenciales y condiciones de contorno.",
          "Un error frecuente en la practica es elegir mal la direccion de la fuerza y la superficie efectiva. Por ejemplo, al calcular la fuerza de un piston solo debe usarse la superficie de seccion efectiva sometida a la presion. Ignorar detalles geometricos como la junta, el perno o la superficie de apoyo puede provocar errores de diseno.",
        ],
      },
      {
        title: "¿Por que el pascal es la unidad SI de presion?",
        paragraphs: [
          "El pascal surge de forma natural de la combinacion del newton, unidad SI de fuerza, y del metro cuadrado, unidad SI de superficie. La igualdad 1 Pa = 1 N/m² no es solo una definicion, sino tambien una expresion dimensional que muestra el origen mecanico de la presion. Por eso no es necesario definir una unidad basica independiente para la presion.",
          "El sistema SI busca relacionar de forma coherente las magnitudes derivadas con las unidades basicas. Expresar la presion en pascales proporciona un marco compatible con la densidad de energia, el esfuerzo, el modulo de elasticidad y las ecuaciones de mecanica de fluidos. Que una misma unidad pueda usarse en distintos campos reduce los errores de conversion en los calculos.",
          "A escala cotidiana, el pascal suele ser una unidad muy pequena. Por eso la ingenieria prefiere escalas mas practicas como el kilopascal, el megapascal o el bar. Aun asi, todas ellas acaban vinculadas al pascal y, por tanto, a la base del SI.",
        ],
      },
      {
        title: "La historia de la medicion de la presion: Torricelli y el barometro",
        paragraphs: [
          "La medicion sistematica de la presion comenzo en 1643 con el desarrollo del barometro de mercurio por el cientifico italiano Evangelista Torricelli. Torricelli observo que, al sumergir un tubo de vidrio cerrado por un extremo y lleno de mercurio, con el extremo abierto en un recipiente de mercurio, el mercurio del tubo se detenia a una cierta altura dejando un vacio encima.",
          "Torricelli propuso que la altura de la columna de mercurio estaba equilibrada por el peso del aire exterior. Esta idea sento la base experimental de la nocion de que el aire tiene un peso medible y, por tanto, una presion, y se considera el punto de partida del estudio de la presion como magnitud cientifica.",
          "En 1648, por sugerencia de Blaise Pascal, Florin Perier midio un barometro a distintas alturas en el Puy de Dome y demostro que la presion atmosferica disminuye con la altitud. Los trabajos posteriores basados en estos fundamentos trajeron la coordinacion internacional de las unidades de medida con la Convencion del Metro de 1875, la definicion precisa de la atmosfera estandar en 1954 y la adopcion del pascal en el SI en 1971.",
        ],
      },
      {
        title: "Presion absoluta, relativa y diferencial",
        paragraphs: [
          "La presion absoluta se mide respecto al vacio total. Esta referencia es la situacion en la que la presion es teoricamente nula, y la presion absoluta nunca puede ser negativa. Las leyes de los gases, los calculos termodinamicos y algunas relaciones ligadas a la densidad funcionan con presion absoluta.",
          "La presion relativa (o manometrica) se mide respecto a la presion atmosferica. La mayoria de los manometros de campo toman la atmosfera circundante como referencia cero; por eso el valor que se lee en pantalla suele ser presion relativa. La relacion entre presion absoluta y relativa se expresa como P_abs = P_rel + P_atm.",
          "La presion diferencial es la diferencia de presion entre dos puntos. En aplicaciones como la obstruccion de un filtro, la medicion de caudal mediante una placa de orificio, la presurizacion de una sala o el rendimiento de un intercambiador de calor, se sigue directamente la diferencia de presion entre dos lineas o dos volumenes distintos. Esta magnitud no se define ni respecto al vacio total ni respecto a la sola atmosfera; es directamente la diferencia entre dos puntos.",
        ],
      },
      {
        title: "La presion atmosferica",
        paragraphs: [
          "La presion atmosferica es la presion que ejerce sobre las superficies el peso de la columna de aire de la atmosfera terrestre. En condiciones estandar cercanas al nivel del mar se considera de unos 101 325 Pa, es decir, 1 atm. Sin embargo, este valor no es constante; varia con la altitud, las condiciones meteorologicas y la temperatura.",
          "Los barometros se usan para medir la presion atmosferica. Los barometros de mercurio han sido historicamente instrumentos de referencia, mientras que los sensores de presion electronicos se han generalizado en las aplicaciones modernas. La presion atmosferica es importante no solo para la meteorologia, sino tambien para la tecnologia del vacio, los sistemas de combustion y las conversiones entre presion relativa y absoluta.",
          "En los sistemas que funcionan con presion relativa, las variaciones de la presion atmosferica pueden afectar la interpretacion de la medicion. Por ejemplo, una presion relativa de 2 bares al nivel del mar y una presion relativa de 2 bares a gran altitud no dan el mismo valor absoluto. Esta distincion puede ser determinante, especialmente en calculos de compresion, densidad de gases y punto de ebullicion.",
        ],
      },
      {
        title: "La presion hidrostatica y la relacion P = ρgh",
        paragraphs: [
          "En un fluido en reposo, la presion aumenta con la profundidad. Suponiendo densidad constante, la presion relativa hidrostatica se expresa aproximadamente mediante la relacion P = ρgh. Aqui, ρ representa la densidad, g la aceleracion de la gravedad y h la altura de la columna de fluido.",
          "Esta relacion resulta especialmente util para depositos de agua, tanques abiertos, presas, medicion de nivel y manometros de columna liquida. A la misma altura y en el mismo fluido, la presion se considera igual; la forma del recipiente no cambia el resultado. Lo determinante es la densidad del fluido y la profundidad vertical respecto a la superficie libre.",
          "La presion hidrostatica absoluta incluye no solo el incremento ρgh, sino tambien la presion inicial en la superficie libre. En un recipiente abierto, este valor inicial suele ser la presion atmosferica. Por tanto, al calcular la presion absoluta debe sumarse no solo el incremento debido a la columna de liquido, sino tambien la presion exterior sobre la superficie.",
        ],
      },
      {
        title: "Presion estatica, dinamica y total",
        paragraphs: [
          "La presion estatica es la componente de presion que representa el estado termodinamico local del flujo, desde el punto de vista de un observador que se mueve con el fluido. La mayoria de los puntos de medicion en tuberias, depositos y conductos siguen fundamentalmente la presion estatica. La mayoria de los transmisores de presion estan disenados para medir esta magnitud.",
          "La presion dinamica expresa el efecto cinetico debido a la velocidad del flujo y su formula aproximada habitual es q = 1/2 ρv². Este termino desempena un papel importante en el enfoque de Bernoulli y se usa en metodos de medicion de velocidad como el tubo de Pitot. Cuanto mayor es la velocidad, mayor es la presion dinamica.",
          "En el enfoque de flujo ideal, la presion total se interpreta como la suma de la presion estatica y la dinamica. En sistemas reales, esta distincion debe usarse con cuidado debido a la friccion, la turbulencia, la compresibilidad y las perdidas locales. Aun asi, la distincion estatica-total-dinamica sigue siendo un lenguaje de ingenieria fundamental en ventilacion, aerodinamica y mediciones de proceso.",
        ],
      },
      {
        title: "La altura de presion y la altura manometrica de una bomba",
        paragraphs: [
          "La altura de presion expresa una presion determinada en terminos de la altura equivalente de una columna de fluido. La relacion basica se escribe h = P / (ρg). Asi, una misma presion corresponde a una altura distinta segun la densidad del fluido.",
          "En los sistemas de bombeo, la presion se interpreta la mayoria de las veces no directamente en pascales o bares, sino en metros de columna de fluido. Esto se debe a que la funcion de la bomba no es solo dar presion al fluido, sino tambien aportarle la energia necesaria para vencer una determinada altura, las perdidas por friccion y una componente de velocidad. Por eso el concepto de altura manometrica es muy practico desde el punto de vista de la ingenieria de campo.",
          "La altura de presion y la altura geometrica no son el mismo concepto. Fiarse solo de la lectura de un manometro sin tener en cuenta las perdidas de carga en las tuberias, la carga de velocidad y las resistencias locales puede dar lugar a resultados erroneos en la seleccion de bombas y el equilibrado del sistema. Especialmente en el agua, el aceite y los fluidos de proceso, las diferencias de densidad exigen una conversion realizada con cuidado.",
        ],
      },
      {
        title: "¿Por que son diferentes las unidades de presion?",
        paragraphs: [
          "La diversidad de unidades de presion se explica en gran parte por razones historicas y sectoriales. Mientras el sistema SI toma el pascal como referencia, la industria sigue usando el bar, la medicina el mmHg, la meteorologia el milibar, la automocion el PSI, y algunos documentos tecnicos antiguos la atmosfera tecnica. Esta situacion se debe a que los distintos ambitos mantienen sus propios habitos de uso.",
          "Algunas unidades resultan mas intuitivas para el usuario. Por ejemplo, la presion de un neumatico puede parecer mas legible expresada en unos 35 psi que en 240 kPa, y la presion de un proceso en 3,5 bar en lugar de 350 000 Pa. La eleccion de la unidad no depende solo de la precision, sino tambien de la cultura de los informes, el escalado de los aparatos y los habitos de campo.",
          "Sin embargo, como distintas unidades expresan la misma magnitud fisica, en los calculos conjuntos es imprescindible una conversion cuidadosa. Confundir coeficientes aproximados con coeficientes definidos exactamente, pasar por alto la distincion relativa-absoluta, y leer mal los simbolos son fuentes de error importantes.",
        ],
      },
      {
        title: "¿Como se mide la presion?",
        paragraphs: [
          "Para medir la presion primero hay que determinar el tipo de presion requerido: absoluta, relativa o diferencial. Despues se evalua el rango de medicion, el tipo de fluido, la temperatura, la compatibilidad quimica, las vibraciones y el nivel de precision requerido. Un mismo sensor puede no ser adecuado para todas las aplicaciones.",
          "Para mediciones de baja presion y diferencia pueden usarse transmisores diferenciales de diafragma; para altas presiones de proceso, elementos de galga extensometrica o piezorresistivos; y para aplicaciones de vacio, sensores absolutos especificos. Los manometros de columna liquida son muy utiles para ensenar el principio basico; pero en la industria moderna son mas habituales los equipos electronicos.",
          "Para una medicion precisa hay que tener en cuenta la ubicacion de las lineas de impulso, la posicion de montaje del sensor, el ajuste de cero y los efectos de la temperatura. En lineas de gas y liquido, una diferencia de densidad o una condensacion puede crear una carga hidrostatica adicional sobre el sensor. Por eso los detalles de instalacion determinan el resultado tanto como la eleccion del equipo.",
        ],
      },
      {
        title: "Sensores de presion y manometros",
        paragraphs: [
          "Los manometros mecanicos, como los indicadores de tubo de Bourdon, convierten la presion en un movimiento de aguja legible mediante la deformacion de un elemento elastico. Robustos, sencillos y sin necesidad de energia, se usan desde hace mucho tiempo en la industria. Sin embargo, en aplicaciones que requieren precision y registro de datos, los sensores electronicos son mas flexibles.",
          "Los sensores de presion electronicos pueden ser piezorresistivos, capacitivos, de galga extensometrica o basados en resonancia. Estos sensores convierten la variacion de presion en una senal electrica, que se transmite a sistemas PLC, SCADA o de adquisicion de datos. Esto permite no solo una lectura instantanea, sino tambien alarmas, control y analisis de tendencias.",
          "Los manometros diferenciales dan la diferencia de presion entre dos puntos, los sensores absolutos la presion respecto al vacio total, y los aparatos manometricos la presion respecto a la atmosfera. Fiarse solo del valor numerico sin comprobar el tipo de referencia en la ficha tecnica de un equipo puede llevar a errores graves de interpretacion.",
        ],
      },
      {
        title: "Ambitos de uso de la presion en ingenieria",
        paragraphs: [
          "La presion es una variable de diseno fundamental en numerosos ambitos de la ingenieria: tuberias, climatizacion, hidraulica, neumatica, procesos quimicos, centrales energeticas, sistemas de distribucion de agua, automocion y aeronautica. Desde el espesor de la pared de un deposito hasta la seleccion de valvulas, desde las condiciones de salida de un compresor hasta el rendimiento de un filtro, muchas decisiones se basan en la informacion de presion.",
          "En ingenieria de procesos se vigilan los limites de presion para la operacion segura de reactores, calderas, intercambiadores y separadores. Las valvulas de seguridad de presion, los discos de ruptura y los bucles de control son, por tanto, equipos criticos. La presion tambien se usa para la medicion indirecta de otras variables de proceso, como el caudal y el nivel.",
          "En ingenieria mecanica y de la construccion, la presion se combina con las superficies de contacto y las fuerzas de los fluidos en analisis de esfuerzos. En medicina y dispositivos biomedicos destacan la presion arterial, las presiones de ventilacion y las aplicaciones de vacio; en medio ambiente y meteorologia, las mediciones de presion atmosferica y diferencial.",
        ],
      },
      {
        title: "Temperatura, altitud e incertidumbre en la medicion de presion",
        paragraphs: [
          "La temperatura puede afectar tanto a las propiedades del fluido medido como al comportamiento del elemento sensor. Especialmente en los gases, como la temperatura modifica la densidad, hay que reevaluar la relacion presion-volumen-temperatura. Por eso en las fichas tecnicas de los sensores aparecen parametros como la deriva de cero y la deriva de span dependientes de la temperatura.",
          "La presion atmosferica suele disminuir con la altitud. Esta situacion modifica la relacion entre la presion relativa y la absoluta, y tambien puede afectar el comportamiento de referencia de algunos equipos de campo. Una misma condicion de proceso puede dar resultados de presion absoluta distintos a diferentes altitudes.",
          "Toda medicion conlleva una incertidumbre. El patron de calibracion, la resolucion, la histeresis, el efecto de la temperatura, la orientacion de montaje, las vibraciones y la deriva a largo plazo contribuyen todos a la incertidumbre total. En aplicaciones criticas, la decision de diseno debe incorporar no solo el valor nominal de presion, sino tambien la clase del equipo y la fiabilidad de la medicion.",
        ],
      },
      {
        title: "La relacion y la diferencia entre presion y esfuerzo",
        paragraphs: [
          "La presion y el esfuerzo comparten la misma estructura dimensional y ambos pueden expresarse en pascales. Esta similitud se debe a que ambos representan un efecto de fuerza por unidad de superficie. Pero esto no significa que fisicamente sean la misma magnitud.",
          "La presion se concibe generalmente como un esfuerzo normal isotropo ejercido por los fluidos; es decir, en un fluido en reposo, la presion en un mismo punto es identica en todas las direcciones. El esfuerzo en la mecanica de solidos, en cambio, puede tener componentes normales y de cizalla, depender de la direccion y tener una estructura tensorial.",
          "Pasar por alto esta distincion puede provocar interpretaciones erroneas, especialmente en calculos de pared de deposito, superficie de junta o resistencia de materiales. La presion interna de un fluido crea esfuerzos circunferenciales y axiales sobre el deposito; pero el campo de esfuerzos en el material del deposito no es identico a la presion del fluido en si.",
        ],
      },
      {
        title: "Errores frecuentes en los calculos de presion",
        paragraphs: [
          "El error mas frecuente es confundir la presion relativa con la absoluta. Especialmente en las leyes de los gases, los calculos de densidad y las aplicaciones de vacio se requiere presion absoluta, pero a veces se usa directamente el valor relativo leido en un manometro. Esto crea un error sistematico en el resultado.",
          "Otro error consiste en redondear los coeficientes de conversion o usar una referencia de unidad incorrecta. Al convertir entre PSI, bar, atm, mmHg y kPa hay que decidir que nivel de precision es suficiente para los valores aproximados. Si la calibracion del equipo exige alta precision, usar un numero insuficiente de decimales puede causar problemas.",
          "Tambien son frecuentes ignorar los efectos hidrostaticos, pasar por alto la altura de montaje del sensor y no tener en cuenta el efecto de la temperatura. Especialmente en lineas de impulso llenas de liquido, depositos cerrados y aplicaciones de presion diferencial, detalles de instalacion aparentemente menores pueden modificar de forma significativa el resultado de la medicion.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Calculos cientificos y de ingenieria" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Instalaciones, neumaticos y presion de proceso" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Metrico, fuera del SI", commonUse: "Industria, compresores y sistemas de proceso" },
      { name: "Milibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrico, fuera del SI", commonUse: "Meteorologia y mediciones atmosfericas" },
      { name: "Atmosfera estandar", symbol: "atm", referenceValue: "101 325 Pa", system: "Fuera del SI", commonUse: "Atmosfera y condiciones de referencia" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Britanico/estadounidense", commonUse: "Neumaticos, sistemas hidraulicos y neumaticos" },
      { name: "Atmosfera tecnica", symbol: "at", referenceValue: "98 066,5 Pa", system: "Fuera del SI", commonUse: "Aplicaciones tecnicas antiguas" },
      { name: "Milimetro de mercurio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fuera del SI", commonUse: "Medicina, vacio y mediciones de presion" },
      { name: "Milimetro de columna de agua", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fuera del SI", commonUse: "Mediciones de baja presion y ventilacion" },
      { name: "Kilogramo-fuerza por centimetro cuadrado", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Metrico, fuera del SI", commonUse: "Antiguos manometros de bombas y calderas" },
    ],
  },
  {
    locale: "es",
    slug: "energia",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversion de unidades de energia",
    description:
      "Compara en una sola categoria las conversiones de energia basadas en el julio, el kilovatio-hora, la caloria y el BTU.",
    introduction: [
      "La energia es la magnitud fisica fundamental que expresa la capacidad de un sistema para realizar trabajo. En el Sistema Internacional de Unidades, la unidad derivada de la energia es el julio, obtenido a partir del producto de una fuerza y un desplazamiento.",
      "En la vida cotidiana se usan el kilovatio-hora (kWh) para las facturas electricas, la caloria/kilocaloria en nutricion, el BTU en sistemas de climatizacion, el therm en la facturacion de gas natural, y el electronvoltio en fisica de particulas subatomicas.",
    ],
    facts: [
      { label: "Magnitud fisica", value: "Energia (trabajo)" },
      { label: "Simbolo dimensional", value: "[ML²T⁻²]" },
      { label: "Unidad derivada del SI", value: "Julio" },
      { label: "Simbolo de la unidad SI", value: "J" },
      { label: "Definicion del julio", value: "1 J = desplazamiento de 1 metro bajo una fuerza de 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "¿Que es la energia?",
        paragraphs: [
          "La energia es la capacidad de un objeto o sistema para realizar trabajo. Puede existir en muchas formas -- energia cinetica (movimiento), energia potencial (posicion), energia termica, energia quimica y energia electrica -- y, segun el principio de conservacion de la energia, puede transformarse de una forma a otra sin que su cantidad total se cree ni desaparezca.",
          "La energia es una magnitud derivada, obtenida mediante el producto de una fuerza y un desplazamiento (trabajo), y su dimension SI se denota ML²T⁻² (masa × longitud al cuadrado / tiempo al cuadrado).",
        ],
      },
      {
        title: "La unidad SI de la energia: el julio",
        paragraphs: [
          "El julio es la unidad derivada del SI para la energia, simbolizado por J; recibe su nombre en honor al fisico britanico del siglo XIX James Prescott Joule. Un julio equivale a la energia necesaria para desplazar un objeto 1 metro bajo el efecto de una fuerza de 1 newton.",
          "Como el julio sigue siendo una unidad muy pequena para expresar muchas cantidades de energia cotidianas, en ingenieria y en el uso diario se prefieren sus multiplos: el kilojulio (mil julios) y el megajulio (un millon de julios).",
        ],
      },
      {
        title: "El kilovatio-hora: la unidad de las facturas electricas",
        paragraphs: [
          "El kilovatio-hora (kWh) es la cantidad de energia consumida por una potencia de un kilovatio usada durante una hora, y constituye la unidad estandar de la facturacion electrica en todo el mundo. 1 kWh equivale exactamente a 3 600 000 julios (3,6 megajulios).",
          "Para calcular el consumo de energia de un aparato electrico basta con multiplicar su potencia (en vatios) por su tiempo de funcionamiento (en horas); por ejemplo, un aparato de 2000 vatios que funciona 3 horas consume 6 kWh de energia.",
        ],
      },
      {
        title: "La caloria y la kilocaloria: la energia en la nutricion",
        paragraphs: [
          "La caloria se definio originalmente como la cantidad de energia necesaria para elevar en 1 °C la temperatura de un gramo de agua, y 1 caloria equivale exactamente a 4,184 julios.",
          "El valor de 'calorias' que aparece en las etiquetas de los alimentos es en realidad, en sentido cientifico, kilocalorias (1000 calorias) -- esta convencion de nomenclatura en nutricion suele generar confusion; cuando se dice que un alimento tiene '200 calorias', en realidad se habla de 200 kilocalorias (200 000 calorias).",
        ],
      },
      {
        title: "El BTU y el therm: la energia de la climatizacion y el gas natural",
        paragraphs: [
          "El BTU (British Thermal Unit) es la cantidad de energia necesaria para elevar en 1 °F la temperatura de una libra de agua; es una unidad de origen estadounidense, pero ampliamente usada en el mundo para expresar la capacidad de los sistemas de calefaccion y aire acondicionado. 1 BTU equivale a unos 1055,06 julios.",
          "El therm es una gran unidad de energia usada en la facturacion del gas natural y equivale exactamente a 100 000 BTU. En algunos paises, el consumo de gas natural se factura directamente en therms en lugar de en metros cubicos.",
        ],
      },
      {
        title: "El electronvoltio: la unidad del mundo subatomico",
        paragraphs: [
          "El electronvoltio (eV) expresa la energia cinetica que adquiere un electron al atravesar una diferencia de potencial de un voltio; es una unidad de energia extremadamente pequena (1 eV ≈ 1,602176634 × 10⁻¹⁹ julios).",
          "En fisica de particulas y fisica atomica, las energias suelen expresarse en electronvoltios (y sus multiplos keV, MeV, GeV) en lugar de en julios, porque a esa escala el julio da lugar a numeros extremadamente pequenos y poco practicos.",
        ],
      },
      {
        title: "El principio de conservacion de la energia",
        paragraphs: [
          "Segun el principio de conservacion de la energia, tambien conocido como el primer principio de la termodinamica, la energia total de un sistema cerrado permanece constante; la energia no se crea ni se destruye, solo se transforma de una forma a otra.",
          "Por ejemplo, en el motor de un coche, la energia quimica (combustible) se transforma primero en energia termica y luego en energia mecanica (movimiento); aunque en este proceso parte de la energia se convierte en calor no aprovechable por friccion y escape, la cantidad total de energia no cambia.",
        ],
      },
      {
        title: "¿Por que es importante la conversion entre unidades de energia?",
        paragraphs: [
          "Distintos sectores prefieren tradicionalmente unidades de energia diferentes: la ingenieria electrica el kilovatio-hora, la ciencia de la nutricion la kilocaloria, el sector de climatizacion el BTU, y el sector del gas natural el therm. Poder convertir correctamente entre estas distintas unidades es esencial para comparar la eficiencia energetica y calcular costes.",
          "Por ejemplo, para comparar la eficiencia de una bomba de calor con la de una caldera de gas natural hay que convertir el consumo de energia de ambos sistemas a una unidad comun (generalmente kWh o julios).",
        ],
      },
    ],
    unitTable: [
      { name: "Julio", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Calculos cientificos y fisicos de energia" },
      { name: "Kilojulio", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrico", commonUse: "Energia alimentaria (en algunos paises)" },
      { name: "Megajulio", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrico", commonUse: "Combustible y grandes cantidades de energia" },
      { name: "Caloria", symbol: "cal", referenceValue: "4,184 J", system: "Metrico (tradicional)", commonUse: "Nutricion y quimica" },
      { name: "Kilocaloria", symbol: "kcal", referenceValue: "4184 J", system: "Metrico (tradicional)", commonUse: "Etiquetas de alimentos ('calorias')" },
      { name: "Vatio-hora", symbol: "Wh", referenceValue: "3600 J", system: "Metrico (electricidad)", commonUse: "Consumo de pequenos aparatos" },
      { name: "Kilovatio-hora", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrico (electricidad)", commonUse: "Facturacion electrica" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britanico/estadounidense", commonUse: "Capacidad de climatizacion y calefaccion" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britanico/estadounidense", commonUse: "Facturacion de gas natural" },
      { name: "Electronvoltio", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Fisica atomica/de particulas", commonUse: "Medicion de energia atomica y nuclear" },
    ],
  },
  {
    locale: "es",
    slug: "almacenamiento-de-datos",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversion de unidades de almacenamiento de datos",
    description:
      "Convierte entre bytes, kilobytes, megabytes, gigabytes y terabytes; compara los calculos basados en 1000 y 1024.",
    introduction: [
      "La unidad de almacenamiento de datos (informacion) expresa la cantidad de informacion almacenada o procesada en un sistema informatico. La unidad mas basica es el bit; ocho bits juntos forman un byte.",
      "Al hablar de almacenamiento y velocidad de internet aparecen tanto unidades decimales (base 1000) como el kilobyte, el megabyte, el gigabyte y el terabyte, como unidades binarias (base 1024) como el kibibyte, el mebibyte y el gibibyte usadas por los sistemas operativos -- la diferencia entre estos dos sistemas es la razon principal por la que un disco comprado parece tener 'menos' espacio.",
    ],
    facts: [
      { label: "Unidad mas pequena", value: "Bit (0 o 1)" },
      { label: "Unidad basica", value: "Byte = 8 bits" },
      { label: "Sistema decimal (SI)", value: "1 KB = 1000 bytes, 1 MB = 1000 KB" },
      { label: "Sistema binario (IEC)", value: "1 KiB = 1024 bytes, 1 MiB = 1024 KiB" },
      { label: "Diferencia entre 1000 y 1024", value: "≈7,4% de diferencia entre 1 GB (decimal) y 1 GiB (binario)" },
    ],
    sections: [
      {
        title: "¿Que son el bit y el byte?",
        paragraphs: [
          "El bit (digito binario) es la unidad de informacion mas pequena que puede procesar una computadora y solo puede tomar dos valores: 0 o 1. Ocho bits juntos forman un byte; un byte puede representar 256 (2⁸) valores distintos -- suficiente, por ejemplo, para codificar un caracter de texto.",
          "El bit se abrevia generalmente con una 'b' minuscula y el byte con una 'B' mayuscula; esta distincion puede generar confusion, especialmente entre las velocidades de internet (Mbps = megabits por segundo) y el tamano de los archivos (MB = megabytes) -- una conexion a internet de 100 Mbps corresponde teoricamente a una velocidad de descarga de unos 12,5 MB por segundo (100 ÷ 8).",
        ],
      },
      {
        title: "¿Por que existen dos sistemas de unidades diferentes?",
        paragraphs: [
          "Como las computadoras funcionan en sistema binario, el direccionamiento de memoria esta naturalmente ligado a potencias de 2 (como 1024, 1 048 576). Por eso el mundo del software ha entendido historicamente por 'kilobyte' 1024 bytes.",
          "Los fabricantes de discos prefieren, por razones de marketing y de facilidad de calculo, el prefijo decimal del SI (base 1000) -- un disco anunciado como de '1 TB' por un fabricante contiene en realidad exactamente 1 000 000 000 000 bytes, pero como el sistema operativo lo calcula en base 1024, muestra en pantalla un numero menor, como '931 GB'.",
        ],
      },
      {
        title: "El estandar IEC: KiB, MiB, GiB",
        paragraphs: [
          "Para resolver esta confusion, en 1998 la Comision Electrotecnica Internacional (IEC) estandarizo nombres distintos (kibibyte, mebibyte, gibibyte, tebibyte) y simbolos (KiB, MiB, GiB, TiB) para las unidades en base binaria.",
          "Segun este estandar, los prefijos tradicionales como KB/MB/GB deberian usarse solo en sentido decimal (base 1000), y para los valores en base 1024 se preferirian prefijos 'binarios' como KiB/MiB/GiB. Sin embargo, en el uso cotidiano y en muchos programas esta distincion todavia no se aplica de forma coherente.",
        ],
      },
      {
        title: "¿Por que crece la diferencia entre 1000 y 1024?",
        paragraphs: [
          "Mientras que a nivel de kilobyte (1000 frente a 1024) la diferencia es de solo un 2,4%, esta diferencia aumenta en cada unidad superior: a nivel de megabyte es de ≈4,9%, a nivel de gigabyte de ≈7,4%, y a nivel de terabyte llega a ≈10%.",
          "Por eso, en grandes capacidades de almacenamiento (como un disco de 1 TB), la diferencia entre el calculo decimal y el binario se vuelve lo bastante grande como para dar al usuario la impresion visible de tener 'menos espacio' (una diferencia de unos 90 GB).",
        ],
      },
      {
        title: "Unidades de almacenamiento basadas en el bit: kilobit, megabit, gigabit",
        paragraphs: [
          "Los proveedores de servicios de internet suelen expresar la velocidad de conexion en unidades basadas en el bit (kilobits por segundo, megabits por segundo, gigabits por segundo); es una tradicion historica de la ingenieria de redes.",
          "Como los usuarios suelen esperar la velocidad de descarga de un archivo en bytes (MB por segundo), no saber que una conexion de '100 Mbps' tiene una velocidad de descarga real de unos 12,5 MB por segundo puede dar lugar a la falsa impresion de que la conexion es 'lenta'.",
        ],
      },
      {
        title: "Los tamanos de datos en la vida cotidiana",
        paragraphs: [
          "Un documento de texto (una pagina) suele ocupar unos pocos kilobytes, una foto comprimida (JPEG) unos pocos megabytes, y un archivo de musica comprimido (MP3) una media de 3 a 5 megabytes.",
          "Una pelicula en definicion estandar (HD) puede ocupar entre 1 y 4 gigabytes, y una pelicula en resolucion 4K entre 15 y 25 gigabytes aproximadamente; estas diferencias varian segun la resolucion y el metodo de compresion.",
        ],
      },
      {
        title: "La historia de la unidad de almacenamiento de datos",
        paragraphs: [
          "El primer disco duro presentado por IBM en 1956 (el RAMAC 305) tenia una capacidad de unos 3,75 megabytes y ocupaba el tamano de una habitacion entera. Hoy, una tarjeta microSD puede contener millones de veces esa capacidad en el tamano de la palma de una mano.",
          "Este enorme aumento de capacidad esta estrechamente relacionado no solo con los avances de la tecnologia de almacenamiento (como el paso de los discos magneticos a la memoria flash), sino tambien con la constante reduccion del coste por unidad.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 bytes", system: "Binario", commonUse: "Velocidad de red (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bits)", system: "Unidad basica", commonUse: "Unidad basica del tamano de archivos" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 bytes", system: "Decimal (SI)", commonUse: "Documentos de texto" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 bytes", system: "Binario (IEC)", commonUse: "Visualizacion de memoria del sistema operativo" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 bytes", system: "Decimal (SI)", commonUse: "Archivos de fotos y musica" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 bytes", system: "Binario (IEC)", commonUse: "Capacidad de memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 bytes", system: "Decimal (SI)", commonUse: "Capacidad de disco (etiqueta del fabricante)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 bytes", system: "Binario (IEC)", commonUse: "Visualizacion de disco del sistema operativo" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1 000 000 000 000 bytes", system: "Decimal (SI)", commonUse: "Almacenamiento de gran volumen" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1 000 000 000 000 000 bytes", system: "Decimal (SI)", commonUse: "Centros de datos y almacenamiento en la nube" },
    ],
  },
  {
    locale: "es",
    slug: "electricidad",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversion de unidades electricas",
    description:
      "Convierte las magnitudes electricas basicas entre voltio, kilovoltio, amperio y miliamperio; consulta valores de ejemplo.",
    introduction: [
      "La electricidad es un campo amplio compuesto por magnitudes fisicas relacionadas pero distintas, como la tension (diferencia de potencial) y la corriente (flujo de carga). Esta categoria reune las dos magnitudes basicas mas frecuentes en el trabajo electrico cotidiano: el voltio (tension) y el amperio (corriente).",
      "La tension y la corriente no son la misma magnitud fisica y no pueden convertirse directamente una en otra; su relacion se establece mediante la ley de Ohm (V = I × R), en funcion de la resistencia del circuito. Las conversiones de esta pagina tratan cada magnitud por separado (voltio-kilovoltio, amperio-miliamperio, etc.).",
    ],
    facts: [
      { label: "Nombre de la unidad de tension", value: "Voltio (en honor a Alessandro Volta)" },
      { label: "Nombre de la unidad de corriente", value: "Amperio (en honor a Andre-Marie Ampere)" },
      { label: "Unidad basica del SI (corriente)", value: "Amperio (A) -- una de las 7 unidades basicas del SI" },
      { label: "Relacion tension-corriente-resistencia", value: "Ley de Ohm: V = I × R" },
      { label: "Tension de red en America Latina", value: "110-127 V a 60 Hz (Mexico, Colombia, gran parte de Centroamerica) o 220 V a 50 Hz (Argentina, Chile, Uruguay, Paraguay)" },
    ],
    sections: [
      {
        title: "¿Que es la tension (voltio)?",
        paragraphs: [
          "La tension (voltaje) expresa la diferencia de potencial electrico entre dos puntos de un circuito electrico y puede considerarse la 'fuerza motriz' que hace que los electrones fluyan de un punto a otro. Su unidad SI es el voltio (V).",
          "La unidad voltio recibe su nombre en honor al fisico italiano Alessandro Volta, inventor de la pila electrica. Valores como '1,5 V' o '9 V' indicados en una pila expresan la diferencia de potencial que esa pila puede suministrar.",
        ],
      },
      {
        title: "¿Que es la corriente (amperio)?",
        paragraphs: [
          "La corriente electrica expresa la cantidad de carga electrica que pasa por un conductor por unidad de tiempo, y su unidad SI es el amperio (A). Un amperio corresponde al paso de unos 6,242 × 10¹⁸ electrones por un punto en cada segundo.",
          "La unidad amperio recibe su nombre en honor al fisico frances Andre-Marie Ampere, uno de los fundadores del electromagnetismo. El amperio era, antes de la revision del SI de 2019, una de las unidades basicas del SI; hoy sigue considerandose una magnitud fundamental, pero ahora se define a partir de la constante de carga elemental (e).",
        ],
      },
      {
        title: "¿Por que no pueden convertirse la tension y la corriente entre si?",
        paragraphs: [
          "La tension (V) y la corriente (A) son magnitudes fisicas diferentes -- una expresa una diferencia de potencial, la otra la velocidad de un flujo de carga. Por eso la pregunta 'cuantos amperios son X voltios' no tiene respuesta por si sola sin conocer la resistencia (o la potencia) del circuito.",
          "La relacion entre ambas se establece mediante la ley de Ohm: V = I × R (Tension = Corriente × Resistencia). Por ejemplo, una tension de 12 voltios que atraviesa una resistencia de 4 ohmios produce una corriente de 3 amperios; pero esos mismos 12 voltios aplicados a una resistencia distinta producen un valor de corriente totalmente diferente.",
        ],
      },
      {
        title: "La relacion entre potencia, tension y corriente",
        paragraphs: [
          "La potencia electrica (vatio) es igual al producto de la tension y la corriente: P = V × I. Esta formula muestra que un aparato de la misma potencia consumira menos corriente con alta tension y mas corriente con baja tension.",
          "Esta relacion explica por que las redes de distribucion electrica funcionan a alta tension: transportar la misma potencia con una corriente menor reduce considerablemente las perdidas de energia debidas a la resistencia de las lineas de transmision (calentamiento por efecto Joule).",
        ],
      },
      {
        title: "La tension de red en America Latina y en el mundo",
        paragraphs: [
          "America Latina no tiene un unico estandar de tension de red: Mexico, Colombia, Ecuador, Peru y gran parte de Centroamerica usan 110-127 voltios a 60 Hz (similar a Estados Unidos), mientras que Argentina, Chile, Uruguay, Paraguay y Bolivia usan 220 voltios a 50 Hz (similar a Europa). Brasil es un caso mixto, con 127 V y 220 V segun el estado.",
          "Esta diversidad es la razon principal por la que los aparatos electricos traidos de otro pais de la region a veces no pueden usarse directamente sin un convertidor de voltaje, incluso viajando dentro de America Latina.",
        ],
      },
      {
        title: "Corriente continua (CC) y corriente alterna (CA)",
        paragraphs: [
          "En la corriente continua (CC), los electrones fluyen de forma constante en una sola direccion -- las pilas y los paneles solares producen CC. En la corriente alterna (CA), la direccion de la corriente se invierte con una frecuencia determinada cada segundo (50 o 60 veces por segundo, segun el pais) -- la electricidad de la red es CA.",
          "La razon principal por la que se prefiere la CA en la distribucion en red es que permite elevar o reducir facilmente la tension mediante transformadores; esto hace posible transportar la electricidad a largas distancias con bajas perdidas.",
        ],
      },
      {
        title: "El efecto de la corriente electrica en el cuerpo humano",
        paragraphs: [
          "La intensidad de la corriente que atraviesa el cuerpo humano determina el efecto percibido: alrededor de 1 miliamperio apenas se percibe, entre 10 y 20 miliamperios puede provocar contraccion muscular (incapacidad para soltar), y mas de 100 miliamperios puede causar arritmia cardiaca (fibrilacion) y la muerte.",
          "Por eso, en la seguridad electrica, no solo importa la tension, sino tambien la intensidad de corriente que puede formarse en el circuito -- incluso en un entorno de baja tension pero de baja resistencia (por ejemplo, humedo), puede formarse una corriente peligrosa.",
        ],
      },
    ],
    unitTable: [
      { name: "Milivoltio", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrico", commonUse: "Sensores y senales bioelectricas" },
      { name: "Voltio", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pilas, tension de red y de circuito" },
      { name: "Kilovoltio", symbol: "kV", referenceValue: "1000 V", system: "SI/metrico", commonUse: "Lineas de transporte de alta tension" },
      { name: "Miliamperio", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrico", commonUse: "Corrientes de circuitos electronicos" },
      { name: "Amperio", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Instalaciones domesticas y corriente de aparatos" },
      { name: "Kiloamperio", symbol: "kA", referenceValue: "1000 A", system: "SI/metrico", commonUse: "Corrientes de cortocircuito e industriales" },
    ],
  },
  {
    locale: "es",
    slug: "quilate-de-oro",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversion de quilates de oro",
    description:
      "Convierte entre oro de 24, 22, 18 y 14 quilates segun la cantidad de oro puro; conoce la pureza y los usos de cada quilate.",
    introduction: [
      "Al igual que la plata, el oro casi nunca se usa puro en la fabricacion de joyas, ya que es un metal muy blando y se raya facilmente -- por eso se alea con otros metales como la plata o el cobre. El quilate es la medida que indica la proporcion de oro puro en esa aleacion.",
      "La escala funciona sobre una base de 24: 24 quilates significa oro totalmente puro (100%), 18 quilates significa que 18/24 de la aleacion (alrededor del 75%) es oro puro. La conversion aqui no consiste en 'expresar la misma magnitud fisica en una unidad diferente', sino en 'encontrar el equivalente en gramos de la misma aleacion con un grado de pureza distinto'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Estandar de pureza de la joyeria (quilate)" },
      { label: "Referencia basica", value: "24 quilates = 100% de oro puro" },
      { label: "Quilate mas comun en Turquia", value: "22 quilates (pulsera, joyeria tradicional)" },
      { label: "Uso cotidiano internacional", value: "18 quilates (anillo, collar)" },
      { label: "Logica de calculo", value: "Gramos × (quilate de origen / 24) ÷ (quilate de destino / 24)" },
    ],
    sections: [
      {
        title: "¿Que mide exactamente el quilate?",
        paragraphs: [
          "El quilate indica que parte del peso de una pieza de oro es realmente oro. 24 quilates es oro puro; 18 y 14 quilates son formas de oro mezcladas con plata o cobre, respectivamente, y por tanto mas duras y menos puras.",
          "Por eso puede decirse que una pulsera de 22 quilates tiene un contenido de oro puro ligeramente 'inferior' al de 24 quilates, pero es mas resistente -- por eso los joyeros suelen preferir 22 quilates para pulseras y 18 quilates para anillos y collares.",
        ],
      },
      {
        title: "¿Como se calcula el contenido de oro puro?",
        paragraphs: [
          "Para averiguar la cantidad de oro puro que contiene una pulsera de 10 gramos de 22 quilates: 10 × (22 / 24) = 9,17 gramos de oro puro (equivalente a 24 quilates). Los 0,83 gramos restantes son otros metales anadidos para dar resistencia.",
          "A la inversa, si un joyero fundiera esos 9,17 gramos de oro puro para rehacerlos en 18 quilates: 9,17 ÷ (18 / 24) = 12,22 gramos de aleacion total se obtendrian -- porque al ser menor la proporcion de oro puro en 18 quilates, la misma cantidad de oro puro se reparte en un peso total mayor.",
        ],
      },
      {
        title: "¿Para que se usa cada quilate?",
        paragraphs: [
          "Debido a su blandura, el oro de 24 quilates practicamente no se usa en joyeria cotidiana; se prefiere para lingotes y productos de inversion. El de 22 quilates es el estandar de pulseras y joyeria tradicional en Turquia y Oriente Medio.",
          "El de 18 quilates, por su alta resistencia, es habitual en todo el mundo para joyas de uso diario como anillos y collares con diamantes. El de 14 quilates, mas economico y aun mas resistente, es frecuente especialmente en los mercados de Estados Unidos y Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "Oro de 24 quilates", symbol: "24K", referenceValue: "100% de oro puro", system: "Estandar de joyeria", commonUse: "Lingotes, oro de inversion" },
      { name: "Oro de 22 quilates", symbol: "22K", referenceValue: "91,6% de oro puro (22/24)", system: "Estandar de joyeria", commonUse: "Pulsera, joyeria tradicional" },
      { name: "Oro de 18 quilates", symbol: "18K", referenceValue: "75% de oro puro (18/24)", system: "Estandar de joyeria", commonUse: "Anillo, collar, joyeria diaria" },
      { name: "Oro de 14 quilates", symbol: "14K", referenceValue: "58,3% de oro puro (14/24)", system: "Estandar de joyeria", commonUse: "Joyeria economica, mercado EE. UU./Europa" },
    ],
  },
  {
    locale: "es",
    slug: "ley-de-la-plata",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversion de leyes de la plata",
    description:
      "Convierte a gramos de plata pura las leyes 999, 925 (esterlina), 900 y 800; conoce el sistema de milesimas y sus usos en joyeria.",
    introduction: [
      "Al igual que el oro, la plata casi nunca se usa pura para fabricar joyas u objetos, ya que es un metal blando que se alea con otros metales como el cobre. La milesima es la medida que indica la proporcion de plata pura en esa aleacion.",
      "A diferencia del quilataje del oro, expresado sobre una base de 24, la pureza de la plata se expresa sobre una base de 1000 (milesima): 999 corresponde a una plata casi pura, mientras que 925 es la ley mas extendida del mundo, conocida como 'plata esterlina'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Sistema de milesimas" },
      { label: "Referencia principal", value: "999 = 99,9% de plata pura" },
      { label: "Ley de joyeria mas extendida", value: "925 (plata esterlina)" },
      { label: "Plata de inversion/lingote", value: "Ley 999 (plata fina)" },
      { label: "Regla de calculo", value: "Gramos × (milesima de origen / 1000) ÷ (milesima de destino / 1000)" },
    ],
    sections: [
      {
        title: "¿Que mide realmente la ley de la plata (milesima)?",
        paragraphs: [
          "A diferencia del oro, la pureza de la plata no se expresa sobre 24 unidades, sino en milesimas (base 1000). Una ley de 999 significa 999 partes por mil (es decir, un 99,9%) de plata pura en la aleacion; la milesima restante suele corresponder a pequenos rastros de otros elementos.",
          "La ley 925 (plata esterlina) significa que la aleacion contiene un 92,5% de plata pura, siendo el resto (7,5%) generalmente cobre. Esta pequena cantidad de cobre aporta solidez a la plata pura, que por naturaleza es muy blanda y facil de deformar.",
        ],
      },
      {
        title: "¿Por que la plata esterlina (925) es el estandar mundial?",
        paragraphs: [
          "La historia del estandar de la plata esterlina (925) se remonta a la Inglaterra del siglo XII, y con el tiempo se convirtio en el estandar mas ampliamente aceptado del mundo para joyeria, cuberteria y objetos de plata.",
          "La plata pura (999) es demasiado blanda para objetos de uso cotidiano y se raya facilmente; anadir un 7,5% de cobre le da a la plata la dureza suficiente, conservando en gran medida su brillo y color caracteristicos.",
        ],
      },
      {
        title: "Diferencias entre las leyes 999, 900 y 800",
        paragraphs: [
          "La ley 999 (plata fina/pura) se prefiere para lingotes y productos de inversion porque el grado de pureza es el criterio mas importante para los inversores; pero su blandura hace que rara vez se use en joyeria cotidiana.",
          "La ley 900 (plata de moneda) se ha usado historicamente en las monedas de plata de muchos paises. La ley 800, comun especialmente en Europa (Alemania, Austria), es un estandar de joyeria menos puro que la plata esterlina, pero aun asi resistente.",
        ],
      },
      {
        title: "¿Como se calcula la cantidad de plata pura?",
        paragraphs: [
          "Para determinar la cantidad de plata pura de un anillo de plata de 10 gramos con ley 925: 10 × (925 / 1000) = 9,25 gramos de plata pura. Los 0,75 gramos restantes son cobre u otros metales anadidos para dar solidez.",
          "Se aplica la misma logica para convertir entre distintas leyes: por ejemplo, si se conoce la cantidad de plata pura de una aleacion de ley 925, su equivalente en ley 999 se obtiene dividiendo esa cantidad entre 999/1000.",
        ],
      },
      {
        title: "La relacion entre el deslustre de la plata y su pureza",
        paragraphs: [
          "El deslustre (oscurecimiento) de una joya de plata con el tiempo no se debe a la plata en si, sino a la reaccion del cobre de la aleacion con los compuestos de azufre del aire. Por eso, una plata de mayor pureza (como la de ley 999) tiende a deslustrarse menos.",
          "Algunos fabricantes han desarrollado aleaciones de plata esterlina 'resistentes al deslustre' para mejorar esta propiedad, usando elementos distintos, como el germanio, en lugar de cobre.",
        ],
      },
    ],
    unitTable: [
      { name: "Plata 999", symbol: "999", referenceValue: "99,9% de plata pura", system: "Estandar de joyeria", commonUse: "Lingotes, plata de inversion" },
      { name: "Plata 925", symbol: "925", referenceValue: "92,5% de plata pura (esterlina)", system: "Estandar de joyeria", commonUse: "Joyeria y cuberteria (estandar mundial)" },
      { name: "Plata 900", symbol: "900", referenceValue: "90% de plata pura", system: "Estandar de joyeria", commonUse: "Monedas de plata historicas" },
      { name: "Plata 800", symbol: "800", referenceValue: "80% de plata pura", system: "Estandar de joyeria (Europa)", commonUse: "Estandar de joyeria europeo" },
    ],
  },
];

export function findEs419CategoryPage(slug: string) {
  return es419CategoryPages.find((page) => page.slug === slug);
}

export function findEs419CategoryPageByTurkishSlug(sourceSlug: string) {
  return es419CategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
