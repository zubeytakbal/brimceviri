import { getGermanCategorySlug } from "../i18n/germanRoutes";

export type LocalizedGermanCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedGermanCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedGermanCategoryPage = {
  locale: "de";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedGermanCategoryFact[];
  sections: LocalizedGermanCategorySection[];
};

function createCategoryPage(
  sourceSlug: string,
  category: string,
  title: string,
  description: string,
  introduction: string[],
  facts: LocalizedGermanCategoryFact[],
  sections: LocalizedGermanCategorySection[]
): LocalizedGermanCategoryPage {
  const slug = getGermanCategorySlug(category);

  if (!slug) {
    throw new Error(`Missing German category slug for ${category}`);
  }

  return {
    locale: "de",
    slug,
    sourceSlug,
    category,
    title,
    description,
    introduction,
    facts,
    sections,
  };
}

export const germanCategoryPages: LocalizedGermanCategoryPage[] = [
  createCategoryPage(
    "alan",
    "alan",
    "Flächeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Quadratmeter, Quadratfuß und Hektar um und vergleichen Sie Flächeneinheiten für Grundstücke, Gebäude und Technik.",
    [
      "Fläche beschreibt die zweidimensionale Ausdehnung einer Oberfläche. Sie spielt in Bauwesen, Landvermessung, Wärmeübertragung und Druckberechnungen eine wichtige Rolle.",
      "Der Quadratmeter ist die SI-Referenzeinheit der Fläche. In der Praxis werden je nach Branche auch Hektar und Quadratfuß verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Fläche" },
      { label: "SI-Einheit", value: "Quadratmeter" },
      { label: "SI-Symbol", value: "m²" },
      { label: "Dimensionssymbol", value: "L²" },
    ],
    [
      {
        title: "Was beschreibt Fläche?",
        paragraphs: [
          "Fläche misst die Größe einer ebenen oder projizierten Oberfläche.",
          "Viele technische Formeln arbeiten mit Fläche, etwa Druck als Kraft pro Fläche oder Wärmeleitung über einen Querschnitt.",
        ],
      },
      {
        title: "Quadratmeter, Hektar und Quadratfuß",
        paragraphs: [
          "Der Quadratmeter ist die zentrale metrische Flächeneinheit. Der Hektar eignet sich für große Landflächen, während der Quadratfuß vor allem in angloamerikanischen Bau- und Immobilienkontexten vorkommt.",
          "Beim Wechsel zwischen Längeneinheiten müssen Flächenfaktoren quadriert werden, weil Fläche aus Länge mal Länge entsteht.",
        ],
      },
      {
        title: "Wie werden Flächen umgerechnet?",
        paragraphs: [
          "Eine Flächenumrechnung ändert nur Zahlenwert und Einheit, nicht die reale Fläche.",
          "Verlässliche Umrechnungen sind wichtig, damit Planwerte, Grundstücksangaben und technische Querschnitte konsistent bleiben.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "hacim",
    "hacim",
    "Volumeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Liter, Milliliter und Kubikmeter um und vergleichen Sie gebräuchliche Volumeneinheiten für Flüssigkeiten und Behälter.",
    [
      "Volumen beschreibt, wie viel dreidimensionalen Raum ein Stoff oder ein Körper einnimmt.",
      "Im SI ist der Kubikmeter die Referenzeinheit. In Alltag, Labor und Versorgungstechnik werden jedoch häufig Liter und Milliliter genutzt.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumen" },
      { label: "SI-Einheit", value: "Kubikmeter" },
      { label: "Gebräuchliche Einheit", value: "Liter" },
      { label: "Dimensionssymbol", value: "L³" },
    ],
    [
      {
        title: "Was ist Volumen?",
        paragraphs: [
          "Volumen ist das Maß für räumlichen Inhalt oder Fassungsvermögen.",
          "Es wird für Tanks, Räume, Flaschen, Leitungen und Stoffmengenbilanzen verwendet.",
        ],
      },
      {
        title: "Liter, Milliliter und Kubikmeter",
        paragraphs: [
          "Der Kubikmeter ist die SI-Einheit. Ein Liter entspricht 0,001 Kubikmetern, ein Milliliter wiederum einem Tausendstel Liter.",
          "Diese dezimalen Beziehungen machen metrische Volumenumrechnungen besonders übersichtlich.",
        ],
      },
      {
        title: "Wann sind Volumenumrechnungen wichtig?",
        paragraphs: [
          "Sie helfen dabei, Behältergrößen, Prozessmengen und Laborangaben konsistent miteinander zu vergleichen.",
          "Gerade beim Wechsel zwischen kleinen Proben und großen Behältern verhindert die richtige Einheit Fehleinschätzungen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "uzunluk",
    "uzunluk",
    "Längeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Meter, Kilometer, Zentimeter, Millimeter, Meilen, Fuß, Zoll und Yard um und vergleichen Sie metrische und nichtmetrische Längeneinheiten.",
    [
      "Länge beschreibt den Abstand zwischen zwei Punkten oder die Ausdehnung eines Objekts in einer Richtung.",
      "Der Meter ist die SI-Basiseinheit der Länge. In der Praxis werden häufig auch Zoll, Fuß, Yard oder Meile benötigt.",
    ],
    [
      { label: "Physikalische Größe", value: "Länge" },
      { label: "SI-Basiseinheit", value: "Meter" },
      { label: "SI-Symbol", value: "m" },
      { label: "Dimensionssymbol", value: "L" },
    ],
    [
      {
        title: "Was beschreibt Länge?",
        paragraphs: [
          "Länge ist eine grundlegende physikalische Größe und kann je nach Kontext Distanz, Höhe, Breite, Tiefe oder Dicke ausdrücken.",
          "Viele abgeleitete Größen wie Fläche, Volumen und Geschwindigkeit bauen direkt auf Längenmaßen auf.",
        ],
      },
      {
        title: "Metrische und imperiale Längeneinheiten",
        paragraphs: [
          "Im metrischen System sind Kilometer, Zentimeter und Millimeter über Zehnerpotenzen mit dem Meter verknüpft.",
          "Fuß, Zoll, Yard und Meile stammen aus angloamerikanischen Maßsystemen, ihre Beziehungen zum Meter sind heute exakt festgelegt.",
        ],
      },
      {
        title: "Wie funktionieren Längenumrechnungen?",
        paragraphs: [
          "Bei der Umrechnung bleibt die physikalische Strecke unverändert; nur Zahlenwert und Einheit ändern sich.",
          "Saubere Umrechnungen sind in Zeichnungen, Beschaffung, Fertigung und internationalen Spezifikationen besonders wichtig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kutle",
    "kutle",
    "Masseneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm, Gramm, Milligramm, Tonne, Pfund und Unze um und vergleichen Sie metrische und angloamerikanische Masseneinheiten.",
    [
      "Die Masse beschreibt, wie viel Materie ein Objekt enthält und wie träge es auf Beschleunigung reagiert.",
      "Im SI ist das Kilogramm die Basiseinheit. Im Handel und in internationalen Datenblättern treten zusätzlich Pfund, Unzen und Tonnen auf.",
    ],
    [
      { label: "Physikalische Größe", value: "Masse" },
      { label: "SI-Basiseinheit", value: "Kilogramm" },
      { label: "SI-Symbol", value: "kg" },
      { label: "Dimensionssymbol", value: "M" },
    ],
    [
      {
        title: "Was ist Masse?",
        paragraphs: [
          "Masse ist eine fundamentale Größe in Mechanik, Chemie, Logistik und Produktion.",
          "Im Alltag wird oft von Gewicht gesprochen, technisch ist damit jedoch häufig die Masse gemeint; Gewicht selbst ist eine Kraft.",
        ],
      },
      {
        title: "Kilogramm, Gramm und Pfund",
        paragraphs: [
          "Das Kilogramm ist die SI-Referenz, Gramm und Milligramm sind dezimale Untereinheiten.",
          "Pfund und Unze gehören zu nichtmetrischen Systemen und müssen mit fest definierten Faktoren umgerechnet werden.",
        ],
      },
      {
        title: "Warum sind saubere Masseumrechnungen wichtig?",
        paragraphs: [
          "Sie sichern konsistente Angaben in Einkauf, Versand, Labor, Rezeptur und Produktion.",
          "Schon kleine Verwechslungen zwischen Gramm, Milligramm oder Pfund können große praktische Folgen haben.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "sicaklik",
    "sicaklik",
    "Temperatureinheiten und Umrechnungen",
    "Rechnen Sie zwischen Celsius, Fahrenheit und Kelvin um und prüfen Sie die Formeln für Temperaturskalen mit unterschiedlichem Nullpunkt.",
    [
      "Temperatur beschreibt den thermischen Zustand eines Systems und gehört zu den wichtigsten Messgrößen in Alltag, Naturwissenschaft und Technik.",
      "Im Gegensatz zu vielen proportionalen Einheitfamilien enthalten Temperaturumrechnungen oft sowohl einen Faktor als auch einen Offset.",
    ],
    [
      { label: "Physikalische Größe", value: "Temperatur" },
      { label: "SI-Basiseinheit", value: "Kelvin" },
      { label: "Ingenieurpraxis", value: "Celsius" },
      { label: "Typischer Offset", value: "0 °C = 273,15 K" },
    ],
    [
      {
        title: "Celsius, Fahrenheit und Kelvin",
        paragraphs: [
          "Celsius ist im Alltag und in der Technik weit verbreitet, Fahrenheit vor allem in den USA und Kelvin in Thermodynamik und Wissenschaft.",
          "Kelvin und Celsius haben gleich große Intervalle, unterscheiden sich aber im Nullpunkt.",
        ],
      },
      {
        title: "Warum sind Temperaturumrechnungen besonders?",
        paragraphs: [
          "Viele Temperaturskalen haben nicht denselben Ursprung, deshalb reicht eine reine Multiplikation oft nicht aus.",
          "Das unterscheidet Temperatur klar von Länge oder Masse, wo Umrechnungen meistens rein proportional sind.",
        ],
      },
      {
        title: "Typische Einsatzbereiche",
        paragraphs: [
          "Temperaturumrechnungen werden für Wetterdaten, Laborwerte, Prozessführung, HLK und thermische Berechnungen benötigt.",
          "Ein korrekter Umgang mit Offsets verhindert systematische Fehler in Berichten und Berechnungen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "zaman",
    "zaman",
    "Zeiteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Sekunden, Minuten und Stunden um und vergleichen Sie die exakten Grundbeziehungen dieser Zeiteinheiten.",
    [
      "Zeit ist eine SI-Basisgröße und wesentlich für Physik, Planung, Datenaufzeichnung und technische Raten.",
      "Sekunden, Minuten und Stunden treten in vielen praktischen Berechnungen gemeinsam auf, etwa bei Geschwindigkeit, Verbrauch oder Prozessdauer.",
    ],
    [
      { label: "Physikalische Größe", value: "Zeit" },
      { label: "SI-Basiseinheit", value: "Sekunde" },
      { label: "SI-Symbol", value: "s" },
      { label: "Dimensionssymbol", value: "T" },
    ],
    [
      {
        title: "Sekunde, Minute und Stunde",
        paragraphs: [
          "Die Sekunde ist die SI-Referenz für Zeit. Minute und Stunde sind exakt definierte praktische Einheiten.",
          "Eine Minute entspricht 60 Sekunden, eine Stunde 3600 Sekunden.",
        ],
      },
      {
        title: "Wo werden Zeitumrechnungen gebraucht?",
        paragraphs: [
          "Zeitangaben stecken in Geschwindigkeit, Durchfluss, Energienutzung, Schichtplanung und Messprotokollen.",
          "Gerade bei Raten hilft eine saubere Umrechnung, damit Zeitbasis und Zahlenwert zusammenpassen.",
        ],
      },
      {
        title: "Warum sind die Faktoren exakt?",
        paragraphs: [
          "Zwischen Sekunden, Minuten und Stunden bestehen definierte ganzzahlige Beziehungen.",
          "Dadurch sind Zeitumrechnungen besonders robust und gut für Standardrechnungen geeignet.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "hiz",
    "hiz",
    "Geschwindigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilometer pro Stunde, Meter pro Sekunde und Meilen pro Stunde um und vergleichen Sie gebräuchliche Geschwindigkeitseinheiten.",
    [
      "Geschwindigkeit beschreibt, wie schnell eine Strecke pro Zeit zurückgelegt wird.",
      "Je nach Branche und Land werden unterschiedliche Einheiten verwendet, weshalb belastbare Umrechnungen wichtig sind.",
    ],
    [
      { label: "Physikalische Größe", value: "Geschwindigkeit" },
      { label: "SI-Referenzeinheit", value: "Meter pro Sekunde" },
      { label: "Straßenverkehr", value: "Kilometer pro Stunde" },
      { label: "Nichtmetrische Einheit", value: "Meilen pro Stunde" },
    ],
    [
      {
        title: "m/s, km/h und mph",
        paragraphs: [
          "Meter pro Sekunde ist in Physik und Technik besonders üblich, km/h im Straßenverkehr und mph in angloamerikanischen Verkehrssystemen.",
          "Alle drei Einheiten lassen sich exakt über ihre Definitionen in Länge und Zeit miteinander verknüpfen.",
        ],
      },
      {
        title: "Typische Einsatzfelder",
        paragraphs: [
          "Geschwindigkeitsumrechnungen werden für Fahrzeuge, Förderanlagen, Strömungen und Messberichte benötigt.",
          "Sie helfen dabei, internationale Angaben schneller zu vergleichen und korrekt einzuordnen.",
        ],
      },
      {
        title: "Was bleibt bei der Umrechnung gleich?",
        paragraphs: [
          "Die reale Bewegung bleibt identisch; nur Zahlenwert und Einheit ändern sich.",
          "Damit die Aussage physikalisch gleich bleibt, müssen immer Längen- und Zeitskala gemeinsam berücksichtigt werden.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "basinc",
    "basinc",
    "Druckeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Pascal, Kilopascal, Bar, PSI, Atmosphäre, mmHg und weiteren Druckeinheiten um und vergleichen Sie typische technische Anwendungen.",
    [
      "Druck beschreibt, wie stark eine Kraft auf eine bestimmte Fläche verteilt ist.",
      "Das Pascal ist die SI-Einheit des Drucks. In der Praxis werden häufig besser lesbare oder historisch etablierte Einheiten wie kPa, bar oder psi verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Druck" },
      { label: "SI-Einheit", value: "Pascal" },
      { label: "SI-Symbol", value: "Pa" },
      { label: "Definition", value: "1 Pa = 1 N/m²" },
    ],
    [
      {
        title: "Was ist Druck?",
        paragraphs: [
          "Druck ist Kraft pro Fläche. Gleiche Kräfte führen auf kleineren Flächen zu höheren Druckwerten.",
          "Druck tritt in Gasen, Flüssigkeiten, Hydraulik, Wetterdaten, Prozessanlagen und vielen anderen technischen Zusammenhängen auf.",
        ],
      },
      {
        title: "Pascal, bar und PSI",
        paragraphs: [
          "Das Pascal ist die wissenschaftliche SI-Referenz, während kPa und bar in technischen Anwendungen oft praktischer lesbar sind.",
          "PSI ist vor allem in Werkstatt- und Fahrzeugumgebungen verbreitet. Atmosphären- und mmHg-Werte bleiben in einzelnen Fachgebieten gebräuchlich.",
        ],
      },
      {
        title: "Warum sind genaue Druckumrechnungen wichtig?",
        paragraphs: [
          "Sie verhindern Missverständnisse zwischen internationalen Datenblättern, Messgeräten und Grenzwerten.",
          "Gerade in sicherheitsrelevanten Anwendungen sollte stets klar sein, auf welcher Einheit ein Druckwert basiert.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "enerji",
    "enerji",
    "Energie- und Leistungseinheiten",
    "Rechnen Sie zwischen Joule, Kilowattstunde, Watt und Kilowatt um und unterscheiden Sie gespeicherte Energie von Leistung als Rate.",
    [
      "Energie und Leistung sind eng verwandt, beschreiben aber nicht dieselbe Größe. Energie ist eine Menge, Leistung eine zeitliche Rate.",
      "In der Praxis werden beide oft zusammen betrachtet, etwa bei Stromverbrauch, Anlagengrößen oder thermischen Lasten.",
    ],
    [
      { label: "Größengruppe", value: "Energie und Leistung" },
      { label: "SI-Energieeinheit", value: "Joule" },
      { label: "SI-Leistungseinheit", value: "Watt" },
      { label: "Häufige Verbrauchseinheit", value: "Kilowattstunde" },
    ],
    [
      {
        title: "Energie gegenüber Leistung",
        paragraphs: [
          "Energie beschreibt eine insgesamt übertragene oder gespeicherte Menge.",
          "Leistung beschreibt, wie schnell Energie umgesetzt, übertragen oder verbraucht wird.",
        ],
      },
      {
        title: "Joule, Kilowattstunde, Watt und Kilowatt",
        paragraphs: [
          "Joule und Watt sind die SI-Referenzgrößen. Kilowattstunden werden häufig für Stromverbrauch, Kilowatt für Anlagen- und Geräteleistung verwendet.",
          "Die enge Beziehung zwischen beiden Größen erklärt, warum sie auf einer gemeinsamen Kategorieseite sinnvoll sind.",
        ],
      },
      {
        title: "Praktische Bedeutung",
        paragraphs: [
          "Die richtige Einheit erleichtert den Vergleich zwischen Energiemenge, Verbrauch und Leistungsbedarf.",
          "Fehler entstehen oft, wenn kWh und kW verwechselt werden, obwohl sie unterschiedliche physikalische Größen ausdrücken.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi",
    "debi",
    "Volumenstrom-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Kubikmeter pro Stunde und Liter pro Minute um und vergleichen Sie gebräuchliche Einheiten für Pumpen- und Versorgungssysteme.",
    [
      "Volumenstrom beschreibt, wie viel Fluid pro Zeiteinheit einen Querschnitt durchströmt.",
      "In Wasser-, HLK- und Prozesssystemen werden je nach Größenordnung häufig m³/h oder L/min verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumenstrom" },
      { label: "SI-Form", value: "Kubikmeter pro Sekunde" },
      { label: "Praxisgröße", value: "Kubikmeter pro Stunde" },
      { label: "Kleinere Systeme", value: "Liter pro Minute" },
    ],
    [
      {
        title: "Was ist Volumenstrom?",
        paragraphs: [
          "Volumenstrom misst die transportierte Flüssigkeits- oder Gasmenge pro Zeit.",
          "Er ist eine zentrale Größe bei Pumpenauswahl, Netzabgleich und Versorgungsauslegung.",
        ],
      },
      {
        title: "m³/h und L/min",
        paragraphs: [
          "m³/h ist für größere Anlagen besonders gut lesbar, L/min dagegen für kleinere Installationen und Geräte.",
          "Die Umrechnung kombiniert die Beziehung zwischen Kubikmeter und Liter mit der zwischen Stunde und Minute.",
        ],
      },
      {
        title: "Worauf sollte man achten?",
        paragraphs: [
          "Volumenstromwerte müssen immer mit ihrer Zeiteinheit gelesen werden.",
          "Schon die Verwechslung von Stunde und Minute verändert den Zahlenwert stark und führt leicht zu Fehlinterpretationen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik",
    "elektrik",
    "Elektrische Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Volt und Kilovolt oder zwischen Ampere und Milliampere um und vergleichen Sie gebräuchliche elektrische Einheiten.",
    [
      "Elektrische Berechnungen arbeiten mit unterschiedlichen Größen wie Spannung und Stromstärke.",
      "Diese Kategorie bündelt grundlegende elektrische Einheiten, die in Elektronik, Energietechnik und Messtechnik häufig umgerechnet werden.",
    ],
    [
      { label: "Größengruppe", value: "Elektrizität" },
      { label: "Spannungseinheit", value: "Volt" },
      { label: "Stromeinheit", value: "Ampere" },
      { label: "Typische Präfixe", value: "kilo und milli" },
    ],
    [
      {
        title: "Spannung und Stromstärke",
        paragraphs: [
          "Spannung beschreibt eine elektrische Potentialdifferenz, Stromstärke die Flussrate elektrischer Ladung.",
          "Beide Größen sind physikalisch verschieden, nutzen aber in der Praxis häufig metrische Präfixe für besser lesbare Zahlen.",
        ],
      },
      {
        title: "Volt, Kilovolt, Ampere und Milliampere",
        paragraphs: [
          "Volt und Ampere sind standardisierte SI-Einheiten, ihre Präfixformen dienen der kompakten Darstellung größerer oder kleinerer Werte.",
          "Ein Kilovolt entspricht 1000 Volt, ein Ampere entspricht 1000 Milliampere.",
        ],
      },
      {
        title: "Warum sind diese Umrechnungen nützlich?",
        paragraphs: [
          "Sie helfen bei Gerätekennwerten, Messprotokollen, Schutzkonzepten und technischen Datenblättern.",
          "Besonders in der Elektronik sind kleine Einheiten wie Milliampere unverzichtbar, während in Energienetzen oft Kilovolt genutzt werden.",
        ],
      },
    ]
  ),
];

export function findGermanCategoryPage(slug: string) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.slug === slug
  );
}

export function findGermanCategoryPageByTurkishSlug(
  sourceSlug: string
) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.sourceSlug === sourceSlug
  );
}
