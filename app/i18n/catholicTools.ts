// Catholic tools in English, Spanish and Portuguese: paths, names and the
// labels the language-independent engines need (christianCalc, liturgicalCalendar).
import type { MysterySet, RosaryStepKind } from "../converter/christian/christianCalc";
import type { CelebrationId, LiturgicalColor, LiturgicalSeason } from "../converter/christian/liturgicalCalendar";

export type CatholicLang = "en" | "es" | "pt";

export const CATHOLIC_PATHS: Record<CatholicLang, { hub: string; rosary: string; novena: string; liturgical: string; easter: string }> = {
  en: {
    hub: "/en/christian-tools",
    rosary: "/en/rosary",
    novena: "/en/novena-calculator",
    liturgical: "/en/liturgical-calendar",
    easter: "/en/easter-date-calculator",
  },
  es: {
    hub: "/es/herramientas-catolicas",
    rosary: "/es/misterios-del-rosario-de-hoy",
    novena: "/es/calculadora-de-novenas",
    liturgical: "/es/calendario-liturgico",
    easter: "/es/cuando-es-semana-santa",
  },
  pt: {
    hub: "/pt/ferramentas-catolicas",
    rosary: "/pt/misterios-do-terco-de-hoje",
    novena: "/pt/calculadora-de-novenas",
    liturgical: "/pt/calendario-liturgico",
    easter: "/pt/quando-e-a-pascoa",
  },
};

/** hreflang alternates for one tool across the three languages. */
export function catholicAlternates(tool: keyof (typeof CATHOLIC_PATHS)["en"]) {
  return {
    en: CATHOLIC_PATHS.en[tool],
    es: CATHOLIC_PATHS.es[tool],
    pt: CATHOLIC_PATHS.pt[tool],
    "x-default": CATHOLIC_PATHS.en[tool],
  };
}

export const DATE_LOCALE: Record<CatholicLang, string> = { en: "en-US", es: "es-ES", pt: "pt-BR" };

const utc = (d: { year: number; month: number; day: number }) => new Date(Date.UTC(d.year, d.month - 1, d.day));

export function longDate(lang: CatholicLang, d: { year: number; month: number; day: number }) {
  return utc(d).toLocaleDateString(DATE_LOCALE[lang], { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export function shortDate(lang: CatholicLang, d: { year: number; month: number; day: number }) {
  return utc(d).toLocaleDateString(DATE_LOCALE[lang], { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
}

export function weekdayName(lang: CatholicLang, weekday: number) {
  // 4 January 1970 was a Sunday.
  return new Date(Date.UTC(1970, 0, 4 + weekday)).toLocaleDateString(DATE_LOCALE[lang], { timeZone: "UTC", weekday: "long" });
}

type Dict = {
  mysteries: Record<MysterySet, { name: string; items: string[] }>;
  prayers: Record<RosaryStepKind, string> & { fatima: string };
  feasts: Record<string, string>;
  seasons: Record<LiturgicalSeason, string>;
  colors: Record<LiturgicalColor, string>;
  celebrations: Record<CelebrationId, string>;
};

export const CATHOLIC_DICT: Record<"es" | "pt" | "en", Dict> = {
  es: {
    mysteries: {
      joyful: {
        name: "Misterios Gozosos",
        items: ["La Anunciación", "La Visitación", "El Nacimiento de Jesús", "La Presentación en el Templo", "El Niño Jesús perdido y hallado en el Templo"],
      },
      sorrowful: {
        name: "Misterios Dolorosos",
        items: ["La Oración en el Huerto", "La Flagelación del Señor", "La Coronación de espinas", "Jesús con la Cruz a cuestas", "La Crucifixión y muerte de Jesús"],
      },
      glorious: {
        name: "Misterios Gloriosos",
        items: ["La Resurrección", "La Ascensión", "La Venida del Espíritu Santo", "La Asunción de María", "La Coronación de María"],
      },
      luminous: {
        name: "Misterios Luminosos",
        items: ["El Bautismo en el Jordán", "Las Bodas de Caná", "El Anuncio del Reino de Dios", "La Transfiguración", "La Institución de la Eucaristía"],
      },
    },
    prayers: {
      creed: "Señal de la Cruz y Credo",
      "our-father": "Padre Nuestro",
      "hail-mary": "Ave María",
      glory: "Gloria",
      closing: "Salve y oración final",
      fatima: "Gloria y Oración de Fátima («Oh Jesús mío»)",
    },
    feasts: {
      lourdes: "Nuestra Señora de Lourdes",
      patrick: "San Patricio",
      joseph: "San José",
      annunciation: "La Anunciación",
      "divine-mercy": "Divina Misericordia",
      fatima: "Nuestra Señora de Fátima",
      rita: "Santa Rita de Casia",
      pentecost: "Pentecostés (Novena al Espíritu Santo)",
      anthony: "San Antonio de Padua",
      "sacred-heart": "Sagrado Corazón de Jesús",
      "mount-carmel": "Virgen del Carmen",
      assumption: "La Asunción de la Virgen",
      "padre-pio": "San Pío de Pietrelcina (Padre Pío)",
      michael: "San Miguel Arcángel",
      therese: "Santa Teresita del Niño Jesús",
      francis: "San Francisco de Asís",
      rosary: "Nuestra Señora del Rosario",
      aparecida: "Nuestra Señora Aparecida",
      jude: "San Judas Tadeo",
      "all-souls": "Fieles Difuntos (por las ánimas)",
      "immaculate-conception": "La Inmaculada Concepción",
      guadalupe: "Virgen de Guadalupe",
      christmas: "Navidad (Novena de Aguinaldos)",
    },
    seasons: {
      advent: "Adviento",
      christmas: "Tiempo de Navidad",
      ordinary: "Tiempo Ordinario",
      lent: "Cuaresma",
      triduum: "Triduo Pascual",
      easter: "Tiempo de Pascua",
    },
    colors: { violet: "Morado", rose: "Rosa", white: "Blanco", green: "Verde", red: "Rojo" },
    celebrations: {
      christmas: "Natividad del Señor",
      "mary-mother-of-god": "Santa María, Madre de Dios",
      epiphany: "Epifanía del Señor",
      baptism: "Bautismo del Señor",
      "ash-wednesday": "Miércoles de Ceniza",
      joseph: "San José, esposo de la Virgen María",
      annunciation: "Anunciación del Señor",
      "palm-sunday": "Domingo de Ramos",
      "holy-thursday": "Jueves Santo",
      "good-friday": "Viernes Santo",
      "holy-saturday": "Sábado Santo y Vigilia Pascual",
      easter: "Domingo de Resurrección",
      "divine-mercy": "Domingo de la Divina Misericordia",
      ascension: "Ascensión del Señor",
      pentecost: "Pentecostés",
      trinity: "Santísima Trinidad",
      "corpus-christi": "Corpus Christi",
      "sacred-heart": "Sagrado Corazón de Jesús",
      "peter-paul": "San Pedro y San Pablo",
      assumption: "Asunción de la Virgen María",
      "all-saints": "Todos los Santos",
      "all-souls": "Fieles Difuntos",
      "christ-the-king": "Jesucristo, Rey del Universo",
      "immaculate-conception": "Inmaculada Concepción",
      gaudete: "Domingo Gaudete",
      laetare: "Domingo Laetare",
    },
  },
  pt: {
    mysteries: {
      joyful: {
        name: "Mistérios Gozosos",
        items: ["A Anunciação", "A Visitação", "O Nascimento de Jesus", "A Apresentação no Templo", "A Perda e o Encontro de Jesus no Templo"],
      },
      sorrowful: {
        name: "Mistérios Dolorosos",
        items: ["A Agonia no Horto", "A Flagelação", "A Coroação de Espinhos", "Jesus carrega a Cruz", "A Crucificação e Morte de Jesus"],
      },
      glorious: {
        name: "Mistérios Gloriosos",
        items: ["A Ressurreição", "A Ascensão", "A Vinda do Espírito Santo", "A Assunção de Maria", "A Coroação de Maria"],
      },
      luminous: {
        name: "Mistérios Luminosos",
        items: ["O Batismo no Jordão", "As Bodas de Caná", "O Anúncio do Reino de Deus", "A Transfiguração", "A Instituição da Eucaristia"],
      },
    },
    prayers: {
      creed: "Sinal da Cruz e Creio",
      "our-father": "Pai-Nosso",
      "hail-mary": "Ave-Maria",
      glory: "Glória",
      closing: "Salve-Rainha e oração final",
      fatima: "Glória e Oração de Fátima («Ó meu Jesus»)",
    },
    feasts: {
      lourdes: "Nossa Senhora de Lourdes",
      patrick: "São Patrício",
      joseph: "São José",
      annunciation: "A Anunciação",
      "divine-mercy": "Divina Misericórdia",
      fatima: "Nossa Senhora de Fátima",
      rita: "Santa Rita de Cássia",
      pentecost: "Pentecostes (Novena ao Espírito Santo)",
      anthony: "Santo Antônio",
      "sacred-heart": "Sagrado Coração de Jesus",
      "mount-carmel": "Nossa Senhora do Carmo",
      assumption: "Assunção de Nossa Senhora",
      "padre-pio": "São Pio de Pietrelcina (Padre Pio)",
      michael: "São Miguel Arcanjo",
      therese: "Santa Teresinha do Menino Jesus",
      francis: "São Francisco de Assis",
      rosary: "Nossa Senhora do Rosário",
      aparecida: "Nossa Senhora Aparecida",
      jude: "São Judas Tadeu",
      "all-souls": "Finados (pelas almas)",
      "immaculate-conception": "Imaculada Conceição",
      guadalupe: "Nossa Senhora de Guadalupe",
      christmas: "Natal",
    },
    seasons: {
      advent: "Advento",
      christmas: "Tempo do Natal",
      ordinary: "Tempo Comum",
      lent: "Quaresma",
      triduum: "Tríduo Pascal",
      easter: "Tempo Pascal",
    },
    colors: { violet: "Roxo", rose: "Rosa", white: "Branco", green: "Verde", red: "Vermelho" },
    celebrations: {
      christmas: "Natal do Senhor",
      "mary-mother-of-god": "Santa Maria, Mãe de Deus",
      epiphany: "Epifania do Senhor",
      baptism: "Batismo do Senhor",
      "ash-wednesday": "Quarta-feira de Cinzas",
      joseph: "São José, esposo da Virgem Maria",
      annunciation: "Anunciação do Senhor",
      "palm-sunday": "Domingo de Ramos",
      "holy-thursday": "Quinta-feira Santa",
      "good-friday": "Sexta-feira da Paixão",
      "holy-saturday": "Sábado Santo e Vigília Pascal",
      easter: "Domingo de Páscoa",
      "divine-mercy": "Domingo da Divina Misericórdia",
      ascension: "Ascensão do Senhor",
      pentecost: "Pentecostes",
      trinity: "Santíssima Trindade",
      "corpus-christi": "Corpus Christi",
      "sacred-heart": "Sagrado Coração de Jesus",
      "peter-paul": "São Pedro e São Paulo",
      assumption: "Assunção de Nossa Senhora",
      "all-saints": "Todos os Santos",
      "all-souls": "Finados",
      "christ-the-king": "Nosso Senhor Jesus Cristo, Rei do Universo",
      "immaculate-conception": "Imaculada Conceição",
      gaudete: "Domingo Gaudete",
      laetare: "Domingo Laetare",
    },
  },
  en: {
    mysteries: {
      joyful: { name: "Joyful Mysteries", items: [] },
      sorrowful: { name: "Sorrowful Mysteries", items: [] },
      glorious: { name: "Glorious Mysteries", items: [] },
      luminous: { name: "Luminous Mysteries", items: [] },
    },
    prayers: { creed: "", "our-father": "", "hail-mary": "", glory: "", closing: "", fatima: "" },
    feasts: {},
    seasons: {
      advent: "Advent",
      christmas: "Christmas Time",
      ordinary: "Ordinary Time",
      lent: "Lent",
      triduum: "Easter Triduum",
      easter: "Easter Time",
    },
    colors: { violet: "Violet", rose: "Rose", white: "White", green: "Green", red: "Red" },
    celebrations: {
      christmas: "The Nativity of the Lord",
      "mary-mother-of-god": "Mary, the Holy Mother of God",
      epiphany: "The Epiphany of the Lord",
      baptism: "The Baptism of the Lord",
      "ash-wednesday": "Ash Wednesday",
      joseph: "St. Joseph, Spouse of the Blessed Virgin Mary",
      annunciation: "The Annunciation of the Lord",
      "palm-sunday": "Palm Sunday of the Passion of the Lord",
      "holy-thursday": "Holy Thursday",
      "good-friday": "Good Friday of the Passion of the Lord",
      "holy-saturday": "Holy Saturday and the Easter Vigil",
      easter: "Easter Sunday of the Resurrection of the Lord",
      "divine-mercy": "Second Sunday of Easter (Divine Mercy Sunday)",
      ascension: "The Ascension of the Lord",
      pentecost: "Pentecost Sunday",
      trinity: "The Most Holy Trinity",
      "corpus-christi": "The Most Holy Body and Blood of Christ",
      "sacred-heart": "The Most Sacred Heart of Jesus",
      "peter-paul": "Sts. Peter and Paul, Apostles",
      assumption: "The Assumption of the Blessed Virgin Mary",
      "all-saints": "All Saints",
      "all-souls": "All Souls' Day",
      "christ-the-king": "Our Lord Jesus Christ, King of the Universe",
      "immaculate-conception": "The Immaculate Conception",
      gaudete: "Gaudete Sunday",
      laetare: "Laetare Sunday",
    },
  },
};

/** Names of the Easter-based feasts (ids of westernFeasts) for the Holy Week pages. */
export const EASTER_FEAST_NAMES: Record<"es" | "pt", Record<string, string>> = {
  es: {
    "shrove-tuesday": "Martes de Carnaval",
    "ash-wednesday": "Miércoles de Ceniza",
    "palm-sunday": "Domingo de Ramos",
    "maundy-thursday": "Jueves Santo",
    "good-friday": "Viernes Santo",
    "holy-saturday": "Sábado Santo",
    easter: "Domingo de Resurrección (Pascua)",
    "easter-monday": "Lunes de Pascua",
    "divine-mercy": "Domingo de la Divina Misericordia",
    ascension: "Ascensión (jueves)",
    pentecost: "Pentecostés",
    trinity: "Santísima Trinidad",
    "corpus-christi": "Corpus Christi (jueves)",
    advent: "Primer domingo de Adviento",
  },
  pt: {
    "shrove-tuesday": "Terça-feira de Carnaval",
    "ash-wednesday": "Quarta-feira de Cinzas",
    "palm-sunday": "Domingo de Ramos",
    "maundy-thursday": "Quinta-feira Santa",
    "good-friday": "Sexta-feira Santa (Paixão)",
    "holy-saturday": "Sábado de Aleluia",
    easter: "Domingo de Páscoa",
    "easter-monday": "Segunda-feira de Páscoa",
    "divine-mercy": "Domingo da Divina Misericórdia",
    ascension: "Ascensão (quinta-feira)",
    pentecost: "Pentecostes",
    trinity: "Santíssima Trindade",
    "corpus-christi": "Corpus Christi (quinta-feira)",
    advent: "Primeiro domingo do Advento",
  },
};
