// Paginas de categoria en espanol para las categorias tecnicas y
// cientificas (potencia, fuerza, densidad, angulo, frecuencia...).
// La tabla de unidades se genera a partir de las guias de unidades en
// espanol, para que ambas fuentes no se contradigan.
import { spanishExtraUnits } from "./localizedSpanishExtraUnitPages";
import type {
  LocalizedSpanishCategoryFact,
  LocalizedSpanishCategoryPage,
  LocalizedSpanishCategorySection,
} from "./localizedSpanishCategoryPages";
import { unitRegistry } from "./unitRegistry";

type ScienceCategoryContent = {
  slug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedSpanishCategoryFact[];
  sections: LocalizedSpanishCategorySection[];
};

const scienceCategories: ScienceCategoryContent[] = [
  {
    slug: "potencia",
    category: "guc",
    title: "Conversión de unidades de potencia",
    description: "Convierte vatios, kilovatios, caballos de vapor (CV), caballos de fuerza (hp) y BTU/h con fórmulas y tablas.",
    introduction: [
      "La potencia indica la rapidez con la que se transfiere o se transforma la energía. Un aparato de mayor potencia hace el mismo trabajo en menos tiempo o consume más energía por hora.",
      "La unidad del SI es el vatio (W). En la vida diaria conviven el kilovatio de las facturas y fichas técnicas, el caballo de vapor de los coches y la BTU por hora de los aires acondicionados.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Vatio (W) = 1 J/s" },
      { label: "Caballo de vapor", value: "1 CV = 735,49875 W" },
      { label: "Caballo de fuerza mecánico", value: "1 hp ≈ 745,7 W" },
      { label: "Aire acondicionado", value: "12.000 BTU/h ≈ 3,52 kW" },
    ],
    sections: [
      {
        title: "CV y hp no son lo mismo",
        paragraphs: [
          "El caballo de vapor métrico (CV, en alemán PS) y el caballo de fuerza anglosajón (hp) se parecen, pero no son idénticos: 1 hp equivale a unos 1,014 CV. En un motor de 300 CV la diferencia supera los 4 caballos.",
          "Las fichas oficiales de vehículos en Europa indican la potencia en kW; el CV se mantiene por costumbre en la publicidad y en la conversación diaria.",
        ],
      },
      {
        title: "Potencia y energía",
        paragraphs: [
          "No hay que confundir potencia (kW) con energía (kWh). Un radiador de 2 kW encendido durante 3 horas consume 6 kWh, que es lo que se paga en la factura.",
          "En climatización se habla de frigorías o de BTU/h. Un equipo de 3.000 frigorías/h tiene unos 3,5 kW de capacidad de frío, lo mismo que 12.000 BTU/h.",
        ],
      },
    ],
  },
  {
    slug: "fuerza",
    category: "kuvvet",
    title: "Conversión de unidades de fuerza",
    description: "Convierte newtons, kilonewtons, kilogramos-fuerza, libras-fuerza y dinas.",
    introduction: [
      "La fuerza es la acción capaz de cambiar el movimiento de un cuerpo o deformarlo. Según la segunda ley de Newton, fuerza es igual a masa por aceleración.",
      "La unidad del SI es el newton (N). En la industria y en el lenguaje cotidiano sigue apareciendo el kilogramo-fuerza, y en los países anglosajones la libra-fuerza.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Newton (N) = 1 kg·m/s²" },
      { label: "Kilogramo-fuerza", value: "1 kgf = 9,80665 N" },
      { label: "Libra-fuerza", value: "1 lbf ≈ 4,448 N" },
      { label: "Referencia práctica", value: "Una manzana de 100 g pesa aproximadamente 1 N" },
    ],
    sections: [
      {
        title: "Masa y peso",
        paragraphs: [
          "La masa se mide en kilogramos y no cambia de un lugar a otro; el peso es la fuerza con la que la gravedad atrae esa masa y se mide en newtons.",
          "Por eso una persona de 70 kg pesa unos 686 N en la Tierra, pero solo unos 114 N en la Luna.",
        ],
      },
      {
        title: "¿Dónde se usa el kilonewton?",
        paragraphs: [
          "En escalada, la resistencia de mosquetones y cintas se indica en kN: 22 kN equivalen a unos 2.240 kgf.",
          "En ingeniería civil las cargas sobre vigas, pilares y cimentaciones se calculan en kilonewtons.",
        ],
      },
    ],
  },
  {
    slug: "densidad",
    category: "yogunluk",
    title: "Conversión de unidades de densidad",
    description: "Convierte kg/m³, g/cm³, g/mL, kg/L, lb/ft³ y otras unidades de densidad.",
    introduction: [
      "La densidad relaciona la masa de un material con el volumen que ocupa. Permite saber cuánto pesa un volumen dado o qué volumen ocupa una masa.",
      "La unidad del SI es el kilogramo por metro cúbico (kg/m³). En química y en la vida diaria es más cómodo usar g/cm³ o kg/L, que son numéricamente iguales.",
    ],
    facts: [
      { label: "Unidad del SI", value: "kg/m³" },
      { label: "Agua a 4 °C", value: "≈ 1.000 kg/m³ = 1 g/cm³" },
      { label: "Equivalencia útil", value: "1 g/cm³ = 1 g/mL = 1 kg/L" },
      { label: "Acero", value: "≈ 7.850 kg/m³" },
    ],
    sections: [
      {
        title: "Por qué flotan los objetos",
        paragraphs: [
          "Un objeto flota en un líquido si su densidad media es menor que la del líquido. El hielo, con unos 917 kg/m³, flota en el agua.",
          "El aceite de oliva, con unos 910 kg/m³, queda por encima del agua cuando se mezclan.",
        ],
      },
      {
        title: "Densidad y concentración",
        paragraphs: [
          "Unidades como g/L o mg/L se usan también para concentraciones: indican cuánta sustancia hay disuelta en un litro de líquido.",
          "En los análisis de agua potable, 1 mg/L equivale aproximadamente a una parte por millón (ppm).",
        ],
      },
    ],
  },
  {
    slug: "aceleracion",
    category: "ivme",
    title: "Conversión de unidades de aceleración",
    description: "Convierte m/s², g (gravedad estándar), ft/s², gal y otras unidades de aceleración.",
    introduction: [
      "La aceleración mide cuánto cambia la velocidad por unidad de tiempo. Un coche que pasa de 0 a 100 km/h en 10 segundos acelera unos 2,8 m/s².",
      "La unidad del SI es el metro por segundo al cuadrado. En aviación y deportes de motor es habitual expresar la aceleración en «g».",
    ],
    facts: [
      { label: "Unidad del SI", value: "m/s²" },
      { label: "Gravedad estándar", value: "1 g = 9,80665 m/s²" },
      { label: "Gal (geofísica)", value: "1 Gal = 1 cm/s²" },
    ],
    sections: [
      {
        title: "Las fuerzas g",
        paragraphs: [
          "Cuando se dice que un piloto soporta 5 g, significa que su aceleración es cinco veces la gravedad terrestre. Una persona sin entrenamiento puede perder la consciencia por encima de 4 o 5 g sostenidos.",
          "Los acelerómetros de los móviles miden la aceleración en m/s² y así detectan la orientación de la pantalla y los pasos.",
        ],
      },
      {
        title: "Aceleración en geofísica",
        paragraphs: [
          "Los geofísicos usan el gal y el miligal para medir pequeñas variaciones de la gravedad, útiles para encontrar minerales o estudiar el subsuelo.",
          "En sismología, la aceleración máxima del suelo durante un terremoto se expresa a menudo como fracción de g.",
        ],
      },
    ],
  },
  {
    slug: "velocidad-angular",
    category: "acisal_hiz",
    title: "Conversión de unidades de velocidad angular",
    description: "Convierte rpm, rad/s, grados por segundo y revoluciones por segundo.",
    introduction: [
      "La velocidad angular indica lo rápido que gira un objeto. Se usa para motores, ruedas, discos, turbinas y cualquier eje en rotación.",
      "La unidad del SI es el radián por segundo, pero en la práctica la más conocida son las revoluciones por minuto (rpm).",
    ],
    facts: [
      { label: "Unidad del SI", value: "rad/s" },
      { label: "Equivalencia clave", value: "1 rpm = 2π/60 rad/s ≈ 0,1047 rad/s" },
      { label: "Una vuelta", value: "2π rad = 360°" },
    ],
    sections: [
      {
        title: "De rpm a rad/s",
        paragraphs: [
          "Para pasar de rpm a rad/s se multiplica por 2π y se divide entre 60. Un motor a 3.000 rpm gira a unos 314 rad/s.",
          "Esta conversión es necesaria para calcular la potencia de un eje: potencia = par × velocidad angular en rad/s.",
        ],
      },
      {
        title: "Ejemplos cotidianos",
        paragraphs: [
          "Un disco de vinilo gira a 33⅓ rpm, una lavadora centrifuga entre 800 y 1.600 rpm y un disco duro a 5.400 o 7.200 rpm.",
          "Los giroscopios de móviles y drones miden la rotación en grados por segundo.",
        ],
      },
    ],
  },
  {
    slug: "angulo",
    category: "aci",
    title: "Conversión de unidades de ángulo",
    description: "Convierte grados, radianes, gradianes y vueltas completas.",
    introduction: [
      "Los ángulos miden la abertura entre dos rectas o la cantidad de giro. Son básicos en geometría, trigonometría, topografía y navegación.",
      "El grado es la unidad más conocida, mientras que el radián es la unidad del SI y la que usan las fórmulas matemáticas y la programación.",
    ],
    facts: [
      { label: "Vuelta completa", value: "360° = 2π rad = 400 gon" },
      { label: "Radián", value: "1 rad ≈ 57,2958°" },
      { label: "Ángulo recto", value: "90° = π/2 rad = 100 gon" },
    ],
    sections: [
      {
        title: "Grados o radianes en la calculadora",
        paragraphs: [
          "Un error frecuente es calcular el seno de 30 con la calculadora en radianes: el resultado no es 0,5. Conviene comprobar el modo DEG o RAD antes de calcular.",
          "La mayoría de los lenguajes de programación trabajan en radianes en sus funciones trigonométricas.",
        ],
      },
      {
        title: "Gradianes en topografía",
        paragraphs: [
          "El gradián divide el ángulo recto en 100 partes y facilita los cálculos decimales. Muchos teodolitos y estaciones totales permiten trabajar en gon.",
          "Para convertir de gon a grados basta con multiplicar por 0,9.",
        ],
      },
    ],
  },
  {
    slug: "frecuencia",
    category: "frekans",
    title: "Conversión de unidades de frecuencia",
    description: "Convierte hercios, kilohercios, megahercios y gigahercios.",
    introduction: [
      "La frecuencia indica cuántas veces se repite un fenómeno por segundo: vibraciones, ondas de sonido, señales de radio o ciclos de la corriente eléctrica.",
      "La unidad del SI es el hercio (Hz), un ciclo por segundo. Sus múltiplos kHz, MHz y GHz aparecen en radio, electrónica e informática.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Hercio (Hz) = 1/s" },
      { label: "Red eléctrica", value: "50 Hz en Europa, 60 Hz en gran parte de América" },
      { label: "Oído humano", value: "≈ 20 Hz a 20 kHz" },
    ],
    sections: [
      {
        title: "Frecuencia y periodo",
        paragraphs: [
          "El periodo es el tiempo que dura un ciclo y es el inverso de la frecuencia. Una señal de 50 Hz tiene un periodo de 20 milisegundos.",
          "En la radio, cuanto mayor es la frecuencia, menor es la longitud de onda: la FM usa ondas de unos 3 metros.",
        ],
      },
      {
        title: "Gigahercios en informática",
        paragraphs: [
          "La velocidad de reloj de un procesador se mide en GHz: un procesador a 3 GHz realiza 3.000 millones de ciclos por segundo.",
          "El wifi funciona en las bandas de 2,4 GHz y 5 GHz, y las redes 5G usan también frecuencias de varios GHz.",
        ],
      },
    ],
  },
  {
    slug: "par-de-torsion",
    category: "tork",
    title: "Conversión de unidades de par de torsión",
    description: "Convierte newton metro, kilogramo-fuerza metro, libra pie y kilonewton metro.",
    introduction: [
      "El par o momento de torsión mide la capacidad de una fuerza para hacer girar un objeto alrededor de un eje. Es el producto de la fuerza por la distancia al eje.",
      "La unidad del SI es el newton metro (N·m). Es la cifra que aparece en las fichas de motores y en las llaves dinamométricas.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Newton metro (N·m)" },
      { label: "Kilogramo-fuerza metro", value: "1 kgf·m = 9,80665 N·m" },
      { label: "Libra pie", value: "1 lb·ft ≈ 1,3558 N·m" },
    ],
    sections: [
      {
        title: "Par y potencia en un motor",
        paragraphs: [
          "El par indica la fuerza de giro y la potencia, la rapidez con la que se entrega. Están relacionados: potencia (W) = par (N·m) × velocidad angular (rad/s).",
          "Los motores diésel suelen tener mucho par a bajas revoluciones; los de gasolina alcanzan su potencia máxima a más rpm.",
        ],
      },
      {
        title: "Apriete de tornillos",
        paragraphs: [
          "Los manuales de taller indican el par de apriete de ruedas y tornillos, por ejemplo 110 N·m para las tuercas de una rueda.",
          "Una llave dinamométrica permite aplicar ese par con precisión y evitar tornillos flojos o pasados de rosca.",
        ],
      },
    ],
  },
  {
    slug: "momento-lineal",
    category: "momentum",
    title: "Conversión de unidades de momento lineal",
    description: "Convierte kg·m/s, newton segundo y libra pie por segundo.",
    introduction: [
      "El momento lineal o cantidad de movimiento es el producto de la masa de un cuerpo por su velocidad. Describe lo difícil que es detenerlo.",
      "Su unidad del SI es el kg·m/s, que equivale exactamente al newton segundo (N·s), la unidad del impulso.",
    ],
    facts: [
      { label: "Unidad del SI", value: "kg·m/s = N·s" },
      { label: "Fórmula", value: "p = m × v" },
      { label: "Principio clave", value: "Se conserva en los choques" },
    ],
    sections: [
      {
        title: "Conservación del momento",
        paragraphs: [
          "En un sistema aislado, el momento lineal total se mantiene constante. Por eso un rifle retrocede al disparar y los cohetes avanzan expulsando gases.",
          "El principio se usa para reconstruir accidentes de tráfico y estudiar colisiones de partículas.",
        ],
      },
      {
        title: "Impulso",
        paragraphs: [
          "El impulso es la fuerza multiplicada por el tiempo que actúa y es igual al cambio de momento. Los airbags alargan el tiempo del impacto para reducir la fuerza.",
        ],
      },
    ],
  },
  {
    slug: "viscosidad-dinamica",
    category: "viskozite_dinamik",
    title: "Conversión de unidades de viscosidad dinámica",
    description: "Convierte pascal segundo, milipascal segundo, poise y centipoise.",
    introduction: [
      "La viscosidad dinámica mide la resistencia de un fluido a fluir. La miel es mucho más viscosa que el agua.",
      "La unidad del SI es el pascal segundo (Pa·s). En la práctica se usan el milipascal segundo y el centipoise, que son iguales.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Pa·s" },
      { label: "Equivalencia clave", value: "1 cP = 1 mPa·s" },
      { label: "Agua a 20 °C", value: "≈ 1 mPa·s" },
    ],
    sections: [
      {
        title: "La viscosidad cambia con la temperatura",
        paragraphs: [
          "En los líquidos la viscosidad baja al calentarse: el aceite frío fluye con dificultad y se vuelve más fluido a temperatura de servicio.",
          "Por eso cualquier valor de viscosidad debe ir acompañado de la temperatura a la que se midió.",
        ],
      },
      {
        title: "Dinámica o cinemática",
        paragraphs: [
          "La viscosidad cinemática es la dinámica dividida por la densidad. Los aceites de motor se clasifican con viscosidad cinemática (mm²/s) y la escala SAE.",
        ],
      },
    ],
  },
  {
    slug: "viscosidad-cinematica",
    category: "viskozite_kinematik",
    title: "Conversión de unidades de viscosidad cinemática",
    description: "Convierte m²/s, mm²/s y centistokes.",
    introduction: [
      "La viscosidad cinemática relaciona la viscosidad dinámica de un fluido con su densidad. Indica cómo fluye un líquido bajo su propio peso.",
      "La unidad del SI es el m²/s, pero en la práctica se usa el mm²/s, idéntico al centistokes (cSt).",
    ],
    facts: [
      { label: "Unidad del SI", value: "m²/s" },
      { label: "Equivalencia clave", value: "1 cSt = 1 mm²/s" },
      { label: "Agua a 20 °C", value: "≈ 1 cSt" },
    ],
    sections: [
      {
        title: "Grados ISO VG",
        paragraphs: [
          "Los aceites industriales se clasifican por grados ISO VG, que corresponden a su viscosidad cinemática en mm²/s a 40 °C. Un aceite ISO VG 46 tiene unos 46 cSt.",
          "Los combustibles y los aceites hidráulicos también se especifican en centistokes.",
        ],
      },
      {
        title: "Número de Reynolds",
        paragraphs: [
          "La viscosidad cinemática aparece en el número de Reynolds, que indica si un flujo será laminar o turbulento dentro de una tubería.",
        ],
      },
    ],
  },
  {
    slug: "caudal",
    category: "debi",
    title: "Conversión de unidades de caudal",
    description: "Convierte metros cúbicos por hora y litros por minuto para bombas, grifos e instalaciones.",
    introduction: [
      "El caudal indica la cantidad de fluido que pasa por un punto en un tiempo determinado. Es la cifra clave al elegir una bomba o dimensionar una tubería.",
      "En instalaciones domésticas se habla de litros por minuto; en bombas, ventilación y piscinas, de metros cúbicos por hora.",
    ],
    facts: [
      { label: "Equivalencia clave", value: "1 m³/h ≈ 16,67 L/min" },
      { label: "Ducha típica", value: "≈ 8 a 12 L/min" },
    ],
    sections: [
      {
        title: "Elegir una bomba",
        paragraphs: [
          "Las bombas se describen con curvas de caudal (m³/h) frente a altura. Para una piscina se suele buscar un caudal que renueve todo el volumen en unas 4 a 6 horas.",
          "Si una piscina tiene 50 m³, necesitará una bomba de unos 8 a 12 m³/h.",
        ],
      },
      {
        title: "Ahorro de agua",
        paragraphs: [
          "Los perlizadores y cabezales eficientes reducen el caudal de grifos y duchas a 6 u 8 L/min sin perder comodidad.",
        ],
      },
    ],
  },
  {
    slug: "caudal-volumetrico",
    category: "debi_hacimsel",
    title: "Conversión de unidades de caudal volumétrico",
    description: "Convierte m³/s, L/s, m³/h, L/min, CFM y GPM.",
    introduction: [
      "El caudal volumétrico mide el volumen de fluido que atraviesa una sección por unidad de tiempo. Se usa en hidráulica, climatización e industria.",
      "La unidad del SI es el m³/s. En EE. UU. se utilizan los pies cúbicos por minuto (CFM) para el aire y los galones por minuto (GPM) para el agua.",
    ],
    facts: [
      { label: "Unidad del SI", value: "m³/s" },
      { label: "Aire", value: "1 CFM ≈ 1,699 m³/h" },
      { label: "Agua", value: "1 GPM ≈ 3,785 L/min" },
    ],
    sections: [
      {
        title: "Ventilación y climatización",
        paragraphs: [
          "Los extractores, campanas y equipos de aire se comparan por su caudal de aire. Un equipo de 400 CFM mueve unos 680 m³/h.",
          "Las normas de ventilación suelen exigir un número de renovaciones de aire por hora según el uso del local.",
        ],
      },
      {
        title: "Caudal, velocidad y sección",
        paragraphs: [
          "El caudal es igual a la velocidad del fluido por el área de la sección. A igual caudal, una tubería más estrecha obliga al fluido a ir más rápido.",
        ],
      },
    ],
  },
  {
    slug: "caudal-masico",
    category: "debi_kutlesel",
    title: "Conversión de unidades de caudal másico",
    description: "Convierte kg/s, kg/h, g/s y g/h.",
    introduction: [
      "El caudal másico indica la masa de fluido que pasa por una sección en un tiempo dado. A diferencia del volumétrico, no cambia con la temperatura ni la presión.",
      "La unidad del SI es el kilogramo por segundo (kg/s). En procesos industriales es habitual el kg/h.",
    ],
    facts: [
      { label: "Unidad del SI", value: "kg/s" },
      { label: "Relación", value: "Caudal másico = densidad × caudal volumétrico" },
      { label: "Equivalencia", value: "1 kg/s = 3.600 kg/h" },
    ],
    sections: [
      {
        title: "Por qué se prefiere en la industria",
        paragraphs: [
          "Los gases cambian de volumen con la temperatura y la presión, pero su masa no. Por eso los caudalímetros másicos (Coriolis o térmicos) son la referencia en procesos.",
          "El sensor MAF de un coche mide el aire que entra al motor en g/s para calcular la cantidad de combustible.",
        ],
      },
    ],
  },
  {
    slug: "resistencia-electrica",
    category: "elektrik_direnc",
    title: "Conversión de unidades de resistencia eléctrica",
    description: "Convierte ohmios, kiloohmios y megaohmios.",
    introduction: [
      "La resistencia eléctrica indica cuánto se opone un material al paso de la corriente. Según la ley de Ohm, V = I × R.",
      "La unidad del SI es el ohmio (Ω). En electrónica son habituales los kiloohmios y, en pruebas de aislamiento, los megaohmios.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Ohmio (Ω) = V/A" },
      { label: "Ley de Ohm", value: "V = I × R" },
      { label: "Múltiplos", value: "1 kΩ = 1.000 Ω; 1 MΩ = 1.000.000 Ω" },
    ],
    sections: [
      {
        title: "Código de colores de las resistencias",
        paragraphs: [
          "Las resistencias electrónicas llevan bandas de colores que indican su valor. Una resistencia marrón-negro-rojo vale 1.000 Ω, es decir, 1 kΩ.",
        ],
      },
      {
        title: "Resistencia de aislamiento",
        paragraphs: [
          "En instalaciones eléctricas se comprueba que el aislamiento de los cables tenga una resistencia muy alta, del orden de megaohmios, con un medidor de aislamiento.",
        ],
      },
    ],
  },
  {
    slug: "capacitancia",
    category: "kapasitans",
    title: "Conversión de unidades de capacitancia",
    description: "Convierte faradios, milifaradios, microfaradios, nanofaradios y picofaradios.",
    introduction: [
      "La capacitancia o capacidad eléctrica indica cuánta carga puede almacenar un condensador por cada voltio aplicado.",
      "La unidad del SI es el faradio (F), una cantidad muy grande. En la práctica se usan microfaradios, nanofaradios y picofaradios.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Faradio (F) = C/V" },
      { label: "Escala", value: "1 µF = 1.000 nF = 1.000.000 pF" },
      { label: "Código «104»", value: "100.000 pF = 100 nF = 0,1 µF" },
    ],
    sections: [
      {
        title: "Leer el valor de un condensador",
        paragraphs: [
          "Los condensadores cerámicos suelen marcarse con tres cifras: las dos primeras son el valor y la tercera el número de ceros en picofaradios. «104» significa 100.000 pF.",
          "Los condensadores de arranque de motores y aires acondicionados indican su valor directamente en µF.",
        ],
      },
    ],
  },
  {
    slug: "inductancia",
    category: "enduktans",
    title: "Conversión de unidades de inductancia",
    description: "Convierte henrios, milihenrios y microhenrios.",
    introduction: [
      "La inductancia es la propiedad de una bobina de oponerse a los cambios de la corriente que la atraviesa, almacenando energía en su campo magnético.",
      "La unidad del SI es el henrio (H). En electrónica son habituales los milihenrios y los microhenrios.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Henrio (H) = V·s/A" },
      { label: "Escala", value: "1 mH = 1.000 µH" },
    ],
    sections: [
      {
        title: "Dónde se usan las bobinas",
        paragraphs: [
          "Las bobinas aparecen en filtros de audio, fuentes de alimentación conmutadas, transformadores y circuitos de radio.",
          "Junto con los condensadores forman circuitos resonantes que seleccionan una frecuencia, como en la sintonía de una radio.",
        ],
      },
    ],
  },
  {
    slug: "carga-electrica",
    category: "elektrik_yuk",
    title: "Conversión de unidades de carga eléctrica",
    description: "Convierte culombios, miliculombios, microculombios y nanoculombios.",
    introduction: [
      "La carga eléctrica es la propiedad de la materia que produce fuerzas eléctricas. La transportan los electrones y los protones.",
      "La unidad del SI es el culombio (C): la carga que transporta una corriente de un amperio durante un segundo.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Culombio (C) = A·s" },
      { label: "Carga del electrón", value: "≈ 1,602 × 10⁻¹⁹ C" },
      { label: "Batería", value: "1 mAh = 3,6 C" },
    ],
    sections: [
      {
        title: "Culombios y mAh",
        paragraphs: [
          "La capacidad de las baterías se indica en miliamperios hora (mAh), que también es una unidad de carga. Una batería de 5.000 mAh almacena 18.000 C.",
        ],
      },
    ],
  },
  {
    slug: "campo-magnetico",
    category: "manyetik_alan",
    title: "Conversión de unidades de campo magnético",
    description: "Convierte amperios por metro, kiloamperios por metro y oersted.",
    introduction: [
      "La intensidad de campo magnético (H) describe el campo creado por las corrientes eléctricas, con independencia del material.",
      "La unidad del SI es el amperio por metro (A/m). En materiales magnéticos todavía se usa mucho el oersted del sistema CGS.",
    ],
    facts: [
      { label: "Unidad del SI", value: "A/m" },
      { label: "Oersted", value: "1 Oe ≈ 79,58 A/m" },
    ],
    sections: [
      {
        title: "H y B no son lo mismo",
        paragraphs: [
          "La intensidad de campo H se mide en A/m, mientras que la densidad de flujo magnético B se mide en teslas. En el vacío están relacionadas por la permeabilidad magnética.",
          "Las fichas de imanes indican la coercitividad en kA/m o en kOe.",
        ],
      },
    ],
  },
  {
    slug: "flujo-magnetico",
    category: "manyetik_aki",
    title: "Conversión de unidades de flujo magnético",
    description: "Convierte weber, miliweber, microweber y nanoweber.",
    introduction: [
      "El flujo magnético mide la cantidad de campo magnético que atraviesa una superficie.",
      "La unidad del SI es el weber (Wb). Un tesla equivale a un weber por metro cuadrado.",
    ],
    facts: [
      { label: "Unidad del SI", value: "Weber (Wb) = V·s" },
      { label: "Relación con el tesla", value: "1 T = 1 Wb/m²" },
    ],
    sections: [
      {
        title: "Ley de Faraday",
        paragraphs: [
          "Cuando el flujo magnético que atraviesa una bobina cambia, se induce una tensión. Este principio hace funcionar generadores, transformadores y cargadores inalámbricos.",
        ],
      },
    ],
  },
  {
    slug: "conductividad-termica",
    category: "isil_iletkenlik",
    title: "Conversión de unidades de conductividad térmica",
    description: "Convierte W/(m·K), W/(cm·K), kW/(m·K) y BTU/(h·ft·°F).",
    introduction: [
      "La conductividad térmica indica la facilidad con la que un material deja pasar el calor. Los metales conducen bien; los aislantes, muy poco.",
      "La unidad del SI es el vatio por metro kelvin. El valor λ de los aislantes de construcción se expresa en esta unidad.",
    ],
    facts: [
      { label: "Unidad del SI", value: "W/(m·K)" },
      { label: "Cobre", value: "≈ 400 W/(m·K)" },
      { label: "Lana mineral", value: "≈ 0,035 W/(m·K)" },
    ],
    sections: [
      {
        title: "Aislamiento de edificios",
        paragraphs: [
          "Cuanto menor es la conductividad (λ) de un aislante, menos grosor hace falta para conseguir el mismo aislamiento.",
          "La resistencia térmica de una capa se calcula dividiendo su espesor entre su conductividad.",
        ],
      },
    ],
  },
  {
    slug: "flujo-termico",
    category: "isi_akisi",
    title: "Conversión de unidades de flujo térmico",
    description: "Convierte W/m², kW/m² y cal/(cm²·s).",
    introduction: [
      "El flujo térmico o densidad de flujo de calor indica cuánta potencia térmica atraviesa cada metro cuadrado de superficie.",
      "La unidad del SI es el vatio por metro cuadrado (W/m²), la misma que se usa para la radiación solar.",
    ],
    facts: [
      { label: "Unidad del SI", value: "W/m²" },
      { label: "Sol al mediodía", value: "≈ 1.000 W/m²" },
    ],
    sections: [
      {
        title: "Energía solar",
        paragraphs: [
          "Los paneles solares se prueban con una irradiancia estándar de 1.000 W/m². Un panel de 400 W con un 20 % de eficiencia ocupa unos 2 m².",
        ],
      },
    ],
  },
  {
    slug: "calor-especifico",
    category: "ozgul_isi",
    title: "Conversión de unidades de calor específico",
    description: "Convierte J/(kg·K), kJ/(kg·K), cal/(g·K) y BTU/(lb·°F).",
    introduction: [
      "El calor específico indica la energía necesaria para elevar un grado la temperatura de un kilogramo de sustancia.",
      "La unidad del SI es el julio por kilogramo kelvin. El agua tiene un calor específico muy alto, unos 4.186 J/(kg·K).",
    ],
    facts: [
      { label: "Unidad del SI", value: "J/(kg·K)" },
      { label: "Agua", value: "≈ 4,186 kJ/(kg·K) = 1 cal/(g·K)" },
      { label: "Aluminio", value: "≈ 900 J/(kg·K)" },
    ],
    sections: [
      {
        title: "Calcular la energía para calentar agua",
        paragraphs: [
          "La energía necesaria es masa × calor específico × diferencia de temperatura. Calentar 100 litros de agua de 15 a 60 °C requiere unos 18,8 MJ, es decir, unos 5,2 kWh.",
        ],
      },
    ],
  },
  {
    slug: "glucemia",
    category: "kan_sekeri",
    title: "Conversión de unidades de glucosa en sangre",
    description: "Convierte la glucemia entre mg/dL y mmol/L.",
    introduction: [
      "La glucosa en sangre se expresa en mg/dL en España, Latinoamérica y EE. UU., y en mmol/L en el Reino Unido, Canadá y muchos países europeos.",
      "La conversión es sencilla: se multiplica mmol/L por unos 18 para obtener mg/dL. Esta herramienta solo convierte unidades y no sustituye la opinión médica.",
    ],
    facts: [
      { label: "Conversión", value: "1 mmol/L ≈ 18,016 mg/dL" },
      { label: "Ejemplo", value: "5,5 mmol/L ≈ 99 mg/dL" },
    ],
    sections: [
      {
        title: "Viajar con un glucómetro",
        paragraphs: [
          "Si viajas o lees un informe de otro país, comprueba la unidad: 7 mmol/L son unos 126 mg/dL. Algunos glucómetros permiten cambiar la unidad en la configuración.",
          "Consulta siempre con tu médico la interpretación de tus valores.",
        ],
      },
    ],
  },
  {
    slug: "vitamina-d",
    category: "vitamin_d",
    title: "Conversión de unidades de vitamina D",
    description: "Convierte la vitamina D (25-OH) entre ng/mL y nmol/L.",
    introduction: [
      "Los análisis de vitamina D miden la 25-hidroxivitamina D en sangre. Según el laboratorio, el resultado aparece en ng/mL o en nmol/L.",
      "Para convertir se multiplica ng/mL por 2,496 para obtener nmol/L. Esta herramienta solo convierte unidades y no sustituye la opinión médica.",
    ],
    facts: [
      { label: "Conversión", value: "1 ng/mL ≈ 2,496 nmol/L" },
      { label: "Ejemplo", value: "30 ng/mL ≈ 75 nmol/L" },
    ],
    sections: [
      {
        title: "Comparar resultados de distintos laboratorios",
        paragraphs: [
          "Si un análisis dice 50 nmol/L y otro 20 ng/mL, los valores son casi iguales. Convertir a la misma unidad permite seguir la evolución.",
          "Los rangos de referencia pueden variar según el laboratorio y las guías clínicas; tu médico interpretará el resultado.",
        ],
      },
    ],
  },
];

function unitTableFor(category: string) {
  return spanishExtraUnits.flatMap((unit) => {
    const entry = unitRegistry.find((candidate) => candidate.tr?.slug === unit.sourceSlug);
    if (!entry || entry.category !== category) return [];
    return [{
      name: unit.name,
      symbol: unit.displaySymbol ?? entry.displaySymbol ?? entry.symbol,
      referenceValue: unit.siEquivalent,
      system: unit.measurementSystem,
      commonUse: unit.commonUses,
    }];
  });
}

const latamReplacements: Array<[RegExp, string]> = [
  [/\bcoches\b/g, "autos"],
  [/\bcoche\b/g, "auto"],
  [/\bmóviles\b/g, "celulares"],
];

function toLatam(text: string) {
  return latamReplacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

export function buildSpanishScienceCategoryPages(variant: "es" | "es-419"): LocalizedSpanishCategoryPage[] {
  const text = variant === "es-419" ? toLatam : (value: string) => value;
  return scienceCategories.map((page) => ({
    locale: "es" as const,
    slug: page.slug,
    sourceSlug: page.category,
    category: page.category,
    title: page.title,
    description: text(page.description),
    introduction: page.introduction.map(text),
    facts: page.facts.map((fact) => ({ label: fact.label, value: text(fact.value) })),
    sections: page.sections.map((section) => ({ title: text(section.title), paragraphs: section.paragraphs.map(text) })),
    unitTable: unitTableFor(page.category).map((row) => ({ ...row, commonUse: text(row.commonUse) })),
  }));
}
