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
    "ivme",
    "ivme",
    "Beschleunigungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Meter pro Sekundequadrat, Fuß pro Sekundequadrat und der Erdbeschleunigung (g) um und erfahren Sie mehr über Fahrzeugleistung und Physikberechnungen.",
    [
      "Beschleunigung beschreibt die Geschwindigkeitsänderung eines Körpers pro Zeiteinheit.",
      "Im SI ist Meter pro Sekundequadrat die Referenzeinheit. Die Erdbeschleunigung (g) dient häufig als praktischer Vergleichswert.",
    ],
    [
      { label: "Physikalische Größe", value: "Beschleunigung" },
      { label: "SI-Einheit", value: "Meter pro Sekundequadrat" },
      { label: "SI-Symbol", value: "m/s²" },
      { label: "Dimensionssymbol", value: "LT⁻²" },
    ],
    [
      {
        title: "Was beschreibt Beschleunigung?",
        paragraphs: [
          "Beschleunigung gibt an, wie schnell sich die Geschwindigkeit eines Körpers pro Zeiteinheit ändert.",
          "Sie ist grundlegend für Fahrzeugtechnik, Raumfahrt und die klassische Mechanik.",
        ],
      },
      {
        title: "Meter pro Sekundequadrat und Erdbeschleunigung",
        paragraphs: [
          "Meter pro Sekundequadrat ist die SI-Basiseinheit für Beschleunigung.",
          "Die Erdbeschleunigung g (9,80665 m/s²) dient als praktischer Referenzwert, um andere Beschleunigungen anschaulich zu vergleichen.",
        ],
      },
      {
        title: "Wofür werden Beschleunigungsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Bewertung von Fahrzeugbeschleunigung, Achterbahnkräften und Raumfahrtmanövern.",
          "Auch in der Physik und im Maschinenbau sind präzise Beschleunigungsangaben unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "acisal_hiz",
    "acisal_hiz",
    "Winkelgeschwindigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen U/min, Radiant pro Sekunde und Grad pro Sekunde um und erfahren Sie mehr über Motordrehzahl und Rotationsbewegungen.",
    [
      "Winkelgeschwindigkeit beschreibt, wie schnell sich ein Körper um eine Achse dreht.",
      "Im SI ist Radiant pro Sekunde die Referenzeinheit. Im Alltag wird häufig Umdrehungen pro Minute (U/min) verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Winkelgeschwindigkeit" },
      { label: "SI-Einheit", value: "Radiant pro Sekunde" },
      { label: "SI-Symbol", value: "rad/s" },
      { label: "Dimensionssymbol", value: "T⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Winkelgeschwindigkeit?",
        paragraphs: [
          "Winkelgeschwindigkeit gibt an, wie schnell sich der Drehwinkel eines rotierenden Körpers pro Zeiteinheit ändert.",
          "Sie ist zentral für Motoren, Turbinen und alle rotierenden Maschinenteile.",
        ],
      },
      {
        title: "U/min, Radiant pro Sekunde und Grad pro Sekunde",
        paragraphs: [
          "Umdrehungen pro Minute ist die im Alltag gebräuchlichste Einheit für Motor- und Maschinendrehzahlen.",
          "Radiant pro Sekunde wird in wissenschaftlichen Berechnungen bevorzugt, Grad pro Sekunde in Robotik und Sensortechnik.",
        ],
      },
      {
        title: "Wofür werden Winkelgeschwindigkeitsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend bei der Auslegung von Motoren, Getrieben und Festplattenlaufwerken.",
          "Auch in der Robotik und Automatisierungstechnik sind präzise Drehzahlangaben unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "guc",
    "guc",
    "Leistungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt, Kilowatt, Megawatt und PS um und erfahren Sie mehr über Motorleistung, Generatorkapazität und Elektrogeräte.",
    [
      "Leistung beschreibt, wie viel Energie pro Zeiteinheit umgesetzt oder übertragen wird.",
      "Im SI ist das Watt die Referenzeinheit. In der Fahrzeugtechnik wird traditionell auch die Pferdestärke (PS) verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Leistung" },
      { label: "SI-Einheit", value: "Watt" },
      { label: "SI-Symbol", value: "W" },
      { label: "Dimensionssymbol", value: "ML²T⁻³" },
    ],
    [
      {
        title: "Was beschreibt Leistung?",
        paragraphs: [
          "Leistung ist die pro Zeiteinheit verrichtete Arbeit oder übertragene Energie.",
          "Sie ist zentral für Motoren, Kraftwerke, Elektrogeräte und praktisch jede technische Anwendung.",
        ],
      },
      {
        title: "Watt, Kilowatt, Megawatt und PS",
        paragraphs: [
          "Watt ist die SI-Basiseinheit, Kilowatt und Megawatt werden für größere Leistungen wie Motoren und Kraftwerke verwendet.",
          "Die Pferdestärke (PS) ist eine traditionelle Einheit, die vor allem in der europäischen Fahrzeugtechnik neben Kilowatt verwendet wird.",
        ],
      },
      {
        title: "Wofür werden Leistungsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend beim Vergleich von Motorleistungen, Generatorkapazitäten und Elektrogeräten.",
          "Auch beim internationalen Vergleich von Fahrzeugspezifikationen sind sie unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "momentum",
    "momentum",
    "Impulseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm-Meter pro Sekunde und Newtonsekunde um und erfahren Sie mehr über Stoß- und Impulsberechnungen.",
    [
      "Impuls beschreibt die Bewegungsgröße eines Körpers, definiert als Produkt aus Masse und Geschwindigkeit.",
      "Im SI ist Kilogramm-Meter pro Sekunde die Referenzeinheit, äquivalent zur Newtonsekunde.",
    ],
    [
      { label: "Physikalische Größe", value: "Impuls" },
      { label: "SI-Einheit", value: "Kilogramm-Meter pro Sekunde" },
      { label: "SI-Symbol", value: "kg·m/s" },
      { label: "Dimensionssymbol", value: "MLT⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Impuls?",
        paragraphs: [
          "Impuls ist eine zentrale Größe der klassischen Mechanik und beschreibt die Bewegungsmenge eines Körpers.",
          "Der Impulserhaltungssatz ist grundlegend für die Analyse von Stößen und Kollisionen.",
        ],
      },
      {
        title: "Kilogramm-Meter pro Sekunde und Newtonsekunde",
        paragraphs: [
          "Kilogramm-Meter pro Sekunde ergibt sich direkt aus der Definition von Masse mal Geschwindigkeit.",
          "Newtonsekunde ist eine äquivalente Einheit, die den Zusammenhang zwischen Kraft, Zeit und Impulsänderung betont.",
        ],
      },
      {
        title: "Wofür werden Impulsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Analyse von Kollisionen, Raketentriebwerken und Stoßprozessen.",
          "Auch in der Fahrzeugsicherheitstechnik, etwa bei Airbag- und Crashberechnungen, spielen sie eine wichtige Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "viskozite_dinamik",
    "viskozite_dinamik",
    "Viskositätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Pascalsekunde und Centipoise um und erfahren Sie mehr über die Reynolds-Zahl und Strömungsmechanikberechnungen.",
    [
      "Dynamische Viskosität beschreibt den inneren Fließwiderstand einer Flüssigkeit.",
      "Im SI ist die Pascalsekunde die Referenzeinheit, in der Industrie wird häufig Centipoise verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Dynamische Viskosität" },
      { label: "SI-Einheit", value: "Pascalsekunde" },
      { label: "SI-Symbol", value: "Pa·s" },
      { label: "Dimensionssymbol", value: "ML⁻¹T⁻¹" },
    ],
    [
      {
        title: "Was beschreibt dynamische Viskosität?",
        paragraphs: [
          "Dynamische Viskosität misst den Widerstand einer Flüssigkeit gegen Scherbewegung.",
          "Sie ist entscheidend für das Verständnis, wie leicht oder schwer eine Flüssigkeit fließt.",
        ],
      },
      {
        title: "Pascalsekunde und Centipoise",
        paragraphs: [
          "Die Pascalsekunde ist die international vereinheitlichte SI-Einheit der dynamischen Viskosität.",
          "Centipoise entspricht der Viskosität von Wasser bei etwa 20 °C und ist deshalb ein anschaulicher industrieller Referenzwert.",
        ],
      },
      {
        title: "Wofür werden Viskositätsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind zentral für die Berechnung der Reynolds-Zahl und die Auslegung von Rohrleitungen und Pumpen.",
          "Auch bei der Formulierung von Ölen, Farben und chemischen Produkten sind sie unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "veri",
    "veri",
    "Datenspeicher-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Byte, Kilobyte, Megabyte, Gigabyte und Terabyte um und erfahren Sie mehr über den Unterschied zwischen dezimaler und binärer Basis.",
    [
      "Datenspeicher-Einheiten beschreiben die Menge digitaler Information, die ein Speichermedium fassen kann.",
      "Das Byte ist die Basiseinheit. Größere Einheiten wie Kilobyte, Megabyte, Gigabyte und Terabyte werden für moderne Speichergeräte verwendet.",
    ],
    [
      { label: "Größe", value: "Digitale Speicherkapazität" },
      { label: "Basiseinheit", value: "Byte" },
      { label: "Symbol", value: "B" },
      { label: "Verwandte Einheit", value: "Bit" },
    ],
    [
      {
        title: "Was beschreiben Datenspeicher-Einheiten?",
        paragraphs: [
          "Datenspeicher-Einheiten messen, wie viel digitale Information ein Speichermedium oder eine Datei enthält.",
          "Sie sind grundlegend für Computertechnik, Netzwerke und die gesamte digitale Infrastruktur.",
        ],
      },
      {
        title: "Byte, Kilobyte, Megabyte und Gigabyte",
        paragraphs: [
          "Das Byte besteht aus 8 Bit und ist die grundlegende Speichereinheit für Zeichen und Daten.",
          "Größere Einheiten werden traditionell dezimal (1000er-Basis) oder binär (1024er-Basis, Kibibyte usw.) definiert, was gelegentlich zu Verwirrung führt.",
        ],
      },
      {
        title: "Wofür werden Datenspeicherumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig beim Vergleich von Festplatten-, Arbeitsspeicher- und Cloud-Speicherkapazitäten.",
          "Auch bei der Bewertung von Internetgeschwindigkeiten und Dateigrößen spielen sie eine zentrale Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik_direnc",
    "elektrik_direnc",
    "Widerstandseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Ohm, Kiloohm und Megaohm um und erfahren Sie mehr über Schaltungsdesign und das Ohmsche Gesetz.",
    [
      "Elektrischer Widerstand beschreibt, wie stark ein Bauteil den Stromfluss behindert.",
      "Im SI ist das Ohm die Referenzeinheit für Widerstandsangaben in der Elektrotechnik.",
    ],
    [
      { label: "Physikalische Größe", value: "Elektrischer Widerstand" },
      { label: "SI-Einheit", value: "Ohm" },
      { label: "SI-Symbol", value: "Ω" },
      { label: "Dimensionssymbol", value: "ML²T⁻³I⁻²" },
    ],
    [
      {
        title: "Was beschreibt elektrischer Widerstand?",
        paragraphs: [
          "Elektrischer Widerstand bestimmt nach dem Ohmschen Gesetz das Verhältnis zwischen Spannung und Strom in einem Bauteil.",
          "Er ist grundlegend für praktisch jede elektrische und elektronische Schaltung.",
        ],
      },
      {
        title: "Ohm, Kiloohm und Megaohm",
        paragraphs: [
          "Ohm ist die SI-Basiseinheit für kleine bis mittlere Widerstände.",
          "Kiloohm und Megaohm werden für größere Widerstandswerte verwendet, etwa bei Isolationsmessungen und Präzisionsschaltungen.",
        ],
      },
      {
        title: "Wofür werden Widerstandsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend bei der Schaltungsentwicklung und Anwendung des Ohmschen Gesetzes.",
          "Auch bei der Fehlersuche in elektrischen Anlagen sind präzise Widerstandsangaben unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kapasitans",
    "kapasitans",
    "Kapazitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Farad, Millifarad, Mikrofarad, Nanofarad und Pikofarad um und erfahren Sie mehr über Kondensatorwerte im Schaltungsdesign.",
    [
      "Kapazität beschreibt die Fähigkeit eines Bauteils, elektrische Ladung zu speichern.",
      "Im SI ist das Farad die Referenzeinheit, wobei in der Praxis meist die kleineren Untereinheiten verwendet werden.",
    ],
    [
      { label: "Physikalische Größe", value: "Kapazität" },
      { label: "SI-Einheit", value: "Farad" },
      { label: "SI-Symbol", value: "F" },
      { label: "Dimensionssymbol", value: "M⁻¹L⁻²T⁴I²" },
    ],
    [
      {
        title: "Was beschreibt Kapazität?",
        paragraphs: [
          "Kapazität gibt an, wie viel elektrische Ladung ein Kondensator bei einer bestimmten Spannung speichern kann.",
          "Sie ist grundlegend für das Design von Filtern, Energiespeichern und elektronischen Schaltungen.",
        ],
      },
      {
        title: "Farad, Millifarad, Mikrofarad, Nanofarad und Pikofarad",
        paragraphs: [
          "Ein Farad ist eine sehr große Kapazität, weshalb in der Praxis fast immer die kleineren Untereinheiten verwendet werden.",
          "Mikrofarad ist bei alltäglichen Kondensatoren gebräuchlich, während Nanofarad und Pikofarad in Hochfrequenzschaltungen vorkommen.",
        ],
      },
      {
        title: "Wofür werden Kapazitätsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend beim Design von Filterschaltungen, Netzteilen und Kommunikationssystemen.",
          "Auch beim Lesen von Kondensator-Beschriftungen und Schaltplänen sind sie unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "enduktans",
    "enduktans",
    "Induktivitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Henry, Millihenry und Mikrohenry um und erfahren Sie mehr über Spulen- und Transformatorendesign.",
    [
      "Induktivität beschreibt die Fähigkeit einer Spule, bei Stromänderung eine Gegenspannung zu erzeugen.",
      "Im SI ist das Henry die Referenzeinheit für Induktivitätsangaben in der Elektrotechnik.",
    ],
    [
      { label: "Physikalische Größe", value: "Induktivität" },
      { label: "SI-Einheit", value: "Henry" },
      { label: "SI-Symbol", value: "H" },
      { label: "Dimensionssymbol", value: "ML²T⁻²I⁻²" },
    ],
    [
      {
        title: "Was beschreibt Induktivität?",
        paragraphs: [
          "Induktivität beschreibt, wie stark eine Spule einer Änderung des durch sie fließenden Stroms entgegenwirkt.",
          "Sie ist grundlegend für Transformatoren, Motoren und Filterschaltungen.",
        ],
      },
      {
        title: "Henry, Millihenry und Mikrohenry",
        paragraphs: [
          "Henry ist die SI-Basiseinheit und wird bei größeren Spulen und Transformatoren verwendet.",
          "Millihenry und Mikrohenry werden für kleinere Spulen in Netzteilen und Hochfrequenzschaltungen verwendet.",
        ],
      },
      {
        title: "Wofür werden Induktivitätsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend beim Design von Transformatoren, Motoren und Funkschaltungen.",
          "Auch bei der Filterauslegung in der Leistungselektronik spielen sie eine zentrale Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik_yuk",
    "elektrik_yuk",
    "Elektrische-Ladungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Coulomb, Millicoulomb, Mikrocoulomb und Nanocoulomb um und erfahren Sie mehr über Batteriekapazität und elektrostatische Berechnungen.",
    [
      "Elektrische Ladung beschreibt die grundlegende Eigenschaft von Materie, die elektrische und magnetische Effekte hervorruft.",
      "Im SI ist das Coulomb die Referenzeinheit für Ladungsangaben.",
    ],
    [
      { label: "Physikalische Größe", value: "Elektrische Ladung" },
      { label: "SI-Einheit", value: "Coulomb" },
      { label: "SI-Symbol", value: "C" },
      { label: "Dimensionssymbol", value: "TI" },
    ],
    [
      {
        title: "Was beschreibt elektrische Ladung?",
        paragraphs: [
          "Elektrische Ladung ist eine fundamentale physikalische Eigenschaft, die elektrische Kräfte und Felder erzeugt.",
          "Sie ist grundlegend für die gesamte Elektrotechnik und Elektrochemie.",
        ],
      },
      {
        title: "Coulomb, Millicoulomb, Mikrocoulomb und Nanocoulomb",
        paragraphs: [
          "Das Coulomb ist die SI-Basiseinheit und entspricht einer relativ großen Ladungsmenge.",
          "Millicoulomb, Mikrocoulomb und Nanocoulomb werden für kleinere Ladungswerte in Batterien, Kondensatoren und Elektronik verwendet.",
        ],
      },
      {
        title: "Wofür werden Ladungsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Berechnung von Batteriekapazitäten und Kondensatorladungen.",
          "Auch in der Physik bei der Analyse elektrostatischer Effekte spielen sie eine zentrale Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "altin_ayar",
    "altin_ayar",
    "Goldkarat-Umrechnungen",
    "Rechnen Sie zwischen 24, 22, 18 und 14 Karat Gold basierend auf dem reinen Goldgehalt um und erfahren Sie mehr über Reinheitsgrade in der Schmuckherstellung.",
    [
      "Das Karatsystem beschreibt den Feingehalt von Gold in einer Legierung, wobei 24 Karat reinem Gold entspricht.",
      "Niedrigere Karatwerte enthalten einen höheren Anteil anderer Metalle, was die Härte erhöht und den Preis senkt.",
    ],
    [
      { label: "Größe", value: "Goldreinheit" },
      { label: "Referenzsystem", value: "Karat" },
      { label: "Symbol", value: "K" },
      { label: "Reinstes Gold", value: "24 Karat (99,9 %)" },
    ],
    [
      {
        title: "Was beschreibt das Karatsystem?",
        paragraphs: [
          "Das Karatsystem gibt an, wie viele von 24 Teilen einer Legierung aus reinem Gold bestehen.",
          "24 Karat entspricht reinem Gold, während niedrigere Karatwerte Legierungen mit anderen Metallen wie Kupfer oder Silber sind.",
        ],
      },
      {
        title: "24, 22, 18 und 14 Karat Gold",
        paragraphs: [
          "24 Karat Gold ist am reinsten, aber auch am weichsten und wird vor allem für Barren verwendet.",
          "18 und 14 Karat Gold sind wegen ihrer höheren Härte bei Alltagsschmuck in westlichen Märkten beliebt.",
        ],
      },
      {
        title: "Wofür werden Karatumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig beim Kauf von Schmuck, um den tatsächlichen Goldgehalt und damit den Wert einzuschätzen.",
          "Auch in der Schmuckherstellung ist die richtige Karatwahl entscheidend für Haltbarkeit und Preis.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "yogunluk",
    "yogunluk",
    "Dichteeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm pro Kubikmeter und Gramm pro Kubikzentimeter um und vergleichen Sie die Dichte von Wasser und gängigen Materialien.",
    [
      "Dichte beschreibt das Verhältnis von Masse zu Volumen eines Stoffes und ist eine grundlegende Materialeigenschaft.",
      "Im SI ist Kilogramm pro Kubikmeter die Referenzeinheit. In Chemie und Labor wird häufig Gramm pro Kubikzentimeter verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Dichte" },
      { label: "SI-Einheit", value: "Kilogramm pro Kubikmeter" },
      { label: "SI-Symbol", value: "kg/m³" },
      { label: "Dimensionssymbol", value: "ML⁻³" },
    ],
    [
      {
        title: "Was beschreibt Dichte?",
        paragraphs: [
          "Dichte gibt an, wie viel Masse in einem bestimmten Volumen eines Stoffes enthalten ist.",
          "Sie ist entscheidend, um Materialien zu vergleichen, Auftrieb zu berechnen und Mischungen zu analysieren.",
        ],
      },
      {
        title: "Kilogramm pro Kubikmeter und Gramm pro Kubikzentimeter",
        paragraphs: [
          "Kilogramm pro Kubikmeter ist die SI-Referenzeinheit, während Gramm pro Kubikzentimeter für kleine Laborproben handlichere Zahlenwerte liefert.",
          "Wasser hat bei 4 °C eine Dichte von genau 1000 kg/m³ beziehungsweise 1 g/cm³, was als praktischer Vergleichswert dient.",
        ],
      },
      {
        title: "Wofür werden Dichteumrechnungen benötigt?",
        paragraphs: [
          "Sie helfen bei der Materialauswahl in Technik und Bauwesen sowie bei der Qualitätskontrolle von Flüssigkeiten.",
          "Auch in der Geologie, Metallurgie und Lebensmittelindustrie sind präzise Dichteangaben unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kuvvet",
    "kuvvet",
    "Krafteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Newton und Kilogramm-Kraft um und erfahren Sie mehr über die Kraftformel und ihre Anwendung in der Technik.",
    [
      "Kraft beschreibt eine Einwirkung, die die Bewegung oder Form eines Körpers verändern kann.",
      "Im SI ist das Newton die Referenzeinheit. In älteren technischen Angaben findet sich noch häufig Kilogramm-Kraft.",
    ],
    [
      { label: "Physikalische Größe", value: "Kraft" },
      { label: "SI-Einheit", value: "Newton" },
      { label: "SI-Symbol", value: "N" },
      { label: "Dimensionssymbol", value: "MLT⁻²" },
    ],
    [
      {
        title: "Was beschreibt Kraft?",
        paragraphs: [
          "Kraft ist nach Newtons zweitem Gesetz das Produkt aus Masse und Beschleunigung.",
          "Sie ist grundlegend für Statik, Dynamik und praktisch jede technische Berechnung.",
        ],
      },
      {
        title: "Newton und Kilogramm-Kraft",
        paragraphs: [
          "Das Newton ist die international vereinheitlichte SI-Einheit der Kraft.",
          "Kilogramm-Kraft entspricht der Gewichtskraft eines Kilogramms unter Standardschwerkraft und wird noch in älteren technischen Dokumenten verwendet.",
        ],
      },
      {
        title: "Wofür werden Kraftumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei Strukturberechnungen, Materialfestigkeitsprüfungen und Maschinenbaudesign.",
          "Auch beim Vergleich internationaler technischer Spezifikationen sind konsistente Krafteinheiten notwendig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "tork",
    "tork",
    "Drehmomenteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Newtonmeter und Pfund-Fuß um und erfahren Sie mehr über Motordrehmoment, Drehmomentschlüssel und Schraubwerte.",
    [
      "Drehmoment beschreibt die Wirkung einer Kraft, die einen Körper um eine Achse dreht.",
      "Im SI ist das Newtonmeter die Referenzeinheit. Im angloamerikanischen Raum wird häufig Pfund-Fuß verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Drehmoment" },
      { label: "SI-Einheit", value: "Newtonmeter" },
      { label: "SI-Symbol", value: "N·m" },
      { label: "Dimensionssymbol", value: "ML²T⁻²" },
    ],
    [
      {
        title: "Was beschreibt Drehmoment?",
        paragraphs: [
          "Drehmoment ist das Produkt aus Kraft und dem senkrechten Abstand zur Drehachse.",
          "Es ist zentral für Motorleistung, Schraubverbindungen und rotierende Maschinenteile.",
        ],
      },
      {
        title: "Newtonmeter und Pfund-Fuß",
        paragraphs: [
          "Das Newtonmeter ist die international vereinheitlichte Einheit für Drehmomentangaben.",
          "Pfund-Fuß ist die gebräuchliche Einheit in US-amerikanischen Fahrzeug- und Werkzeugspezifikationen.",
        ],
      },
      {
        title: "Wofür werden Drehmomentumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend beim korrekten Anziehen von Schraubverbindungen mit Drehmomentschlüsseln.",
          "Auch bei der Angabe von Motorleistungen und beim Vergleich internationaler Fahrzeugspezifikationen sind sie wichtig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "aci",
    "aci",
    "Winkeleinheiten und Umrechnungen",
    "Rechnen Sie zwischen Grad, Radiant und Gon um und erfahren Sie mehr über Trigonometrie, technisches Zeichnen und Navigation.",
    [
      "Winkel beschreiben die Drehung oder Neigung zwischen zwei Linien oder Flächen um einen gemeinsamen Punkt.",
      "Im SI ist das Radiant die Referenzeinheit, im Alltag wird jedoch überwiegend das Grad verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Ebener Winkel" },
      { label: "SI-Einheit", value: "Radiant" },
      { label: "SI-Symbol", value: "rad" },
      { label: "Gebräuchliche Einheit", value: "Grad" },
    ],
    [
      {
        title: "Was beschreiben Winkel?",
        paragraphs: [
          "Winkel messen die Drehung zwischen zwei Strahlen, die von einem gemeinsamen Punkt ausgehen.",
          "Sie sind grundlegend für Geometrie, Trigonometrie und die Beschreibung von Rotationsbewegungen.",
        ],
      },
      {
        title: "Grad, Radiant und Gon",
        paragraphs: [
          "Grad teilt den Vollkreis in 360 Einheiten und ist im Alltag am gebräuchlichsten.",
          "Radiant basiert auf dem Bogenmaß und wird in der Mathematik bevorzugt, während Gon vor allem in der Geodäsie verwendet wird.",
        ],
      },
      {
        title: "Wofür werden Winkelumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig in Trigonometrie, technischem Zeichnen, Navigation und Vermessungswesen.",
          "Programmiersprachen und wissenschaftliche Berechnungen arbeiten meist mit Radiant, während technische Zeichnungen oft Grad verwenden.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "frekans",
    "frekans",
    "Frequenzeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Hertz, Kilohertz, Megahertz und Gigahertz um und erfahren Sie mehr über Elektronik, Audio- und Funkfrequenzen.",
    [
      "Frequenz beschreibt die Anzahl der Schwingungen oder Wiederholungen eines Vorgangs pro Sekunde.",
      "Im SI ist das Hertz die Referenzeinheit für Frequenzangaben in Elektrotechnik, Akustik und Kommunikationstechnik.",
    ],
    [
      { label: "Physikalische Größe", value: "Frequenz" },
      { label: "SI-Einheit", value: "Hertz" },
      { label: "SI-Symbol", value: "Hz" },
      { label: "Dimensionssymbol", value: "T⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Frequenz?",
        paragraphs: [
          "Frequenz gibt an, wie oft sich ein periodischer Vorgang innerhalb einer Sekunde wiederholt.",
          "Sie ist grundlegend für Elektronik, Akustik, Funktechnik und Signalverarbeitung.",
        ],
      },
      {
        title: "Hertz, Kilohertz, Megahertz und Gigahertz",
        paragraphs: [
          "Hertz ist die Basiseinheit, während Kilohertz, Megahertz und Gigahertz für höhere Frequenzbereiche verwendet werden.",
          "Rundfunkfrequenzen liegen typischerweise im Kilohertz- bis Megahertzbereich, Prozessortakte im Gigahertzbereich.",
        ],
      },
      {
        title: "Wofür werden Frequenzumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Auslegung von Funkgeräten, Audiosystemen und elektronischen Schaltungen.",
          "Auch beim Vergleich von Prozessortakten und Netzwerkbandbreiten spielen Frequenzeinheiten eine zentrale Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi_hacimsel",
    "debi_hacimsel",
    "Volumenstromeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kubikmeter pro Sekunde, CFM und GPM um und erfahren Sie mehr über Lüftungs- und Pumpenkapazitätsberechnungen.",
    [
      "Volumenstrom beschreibt, welches Flüssigkeits- oder Gasvolumen pro Zeiteinheit durch einen Querschnitt fließt.",
      "Im SI ist Kubikmeter pro Sekunde die Referenzeinheit. In der Lüftungs- und Pumpentechnik werden häufig CFM und GPM verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumenstrom" },
      { label: "SI-Einheit", value: "Kubikmeter pro Sekunde" },
      { label: "SI-Symbol", value: "m³/s" },
      { label: "Dimensionssymbol", value: "L³T⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Volumenstrom?",
        paragraphs: [
          "Volumenstrom misst, wie viel Volumen einer Flüssigkeit oder eines Gases in einer bestimmten Zeit durch einen Querschnitt strömt.",
          "Er ist zentral für die Auslegung von Rohrleitungen, Pumpen und Lüftungsanlagen.",
        ],
      },
      {
        title: "Kubikmeter pro Sekunde, CFM und GPM",
        paragraphs: [
          "Kubikmeter pro Sekunde wird bei großen Durchflussmengen wie Flüssen oder Industrieanlagen verwendet.",
          "CFM (Kubikfuß pro Minute) und GPM (Gallonen pro Minute) sind die gebräuchlichen Einheiten in US-amerikanischer Klima- und Pumpentechnik.",
        ],
      },
      {
        title: "Wofür werden Volumenstromumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend bei der Auslegung von Lüftungs-, Klima- und Bewässerungsanlagen.",
          "Auch bei internationalen Gerätespezifikationen ist eine korrekte Umrechnung zwischen metrischen und angloamerikanischen Einheiten notwendig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi_kutlesel",
    "debi_kutlesel",
    "Massenstromeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm pro Sekunde und Kilogramm pro Stunde um und erfahren Sie mehr über industrielle Prozess- und Durchsatzberechnungen.",
    [
      "Massenstrom beschreibt, welche Masse eines Stoffes pro Zeiteinheit durch einen Querschnitt oder Prozess fließt.",
      "Im SI ist Kilogramm pro Sekunde die Referenzeinheit. In der Produktionstechnik wird häufig Kilogramm pro Stunde verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Massenstrom" },
      { label: "SI-Einheit", value: "Kilogramm pro Sekunde" },
      { label: "SI-Symbol", value: "kg/s" },
      { label: "Dimensionssymbol", value: "MT⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Massenstrom?",
        paragraphs: [
          "Massenstrom gibt an, wie viel Masse eines Stoffes in einer bestimmten Zeit einen Prozess durchläuft.",
          "Er ist zentral für die Verfahrenstechnik, wo Stoffbilanzen präzise Massenangaben benötigen.",
        ],
      },
      {
        title: "Kilogramm pro Sekunde und Kilogramm pro Stunde",
        paragraphs: [
          "Kilogramm pro Sekunde eignet sich für schnelle, kontinuierliche Prozesse in der Verfahrenstechnik.",
          "Kilogramm pro Stunde wird häufig in der Produktion verwendet, wo stündliche Durchsatzraten praktischer sind.",
        ],
      },
      {
        title: "Wofür werden Massenstromumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Auslegung von Fördersystemen, Produktionslinien und chemischen Prozessen.",
          "Auch beim Vergleich internationaler Anlagenspezifikationen ist eine konsistente Umrechnung notwendig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "manyetik_alan",
    "manyetik_alan",
    "Magnetfeldstärke-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Ampere pro Meter und Oersted um und erfahren Sie mehr über elektromagnetische Feldstärkeberechnungen.",
    [
      "Magnetfeldstärke beschreibt die Intensität eines magnetischen Feldes an einem bestimmten Punkt.",
      "Im SI ist Ampere pro Meter die Referenzeinheit, während Oersted eine traditionelle Einheit aus dem CGS-System ist.",
    ],
    [
      { label: "Physikalische Größe", value: "Magnetfeldstärke" },
      { label: "SI-Einheit", value: "Ampere pro Meter" },
      { label: "SI-Symbol", value: "A/m" },
      { label: "Dimensionssymbol", value: "L⁻¹I" },
    ],
    [
      {
        title: "Was beschreibt Magnetfeldstärke?",
        paragraphs: [
          "Magnetfeldstärke gibt an, wie intensiv ein Magnetfeld an einem bestimmten Ort ist, unabhängig vom durchdrungenen Material.",
          "Sie ist grundlegend für die Elektrotechnik, insbesondere bei Spulen, Motoren und Transformatoren.",
        ],
      },
      {
        title: "Ampere pro Meter und Oersted",
        paragraphs: [
          "Ampere pro Meter ist die international vereinheitlichte SI-Einheit der Magnetfeldstärke.",
          "Oersted stammt aus dem älteren CGS-System und wird noch in einigen älteren Fachtexten und in den USA verwendet.",
        ],
      },
      {
        title: "Wofür werden Magnetfeldstärkeumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig beim Design von Elektromotoren, Transformatoren und magnetischen Speichermedien.",
          "Auch in der physikalischen Forschung sind präzise Magnetfeldangaben unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "manyetik_aki",
    "manyetik_aki",
    "Magnetischer-Fluss-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Weber und Milliweber um und erfahren Sie mehr über Transformatoren- und elektromagnetische Induktionsberechnungen.",
    [
      "Magnetischer Fluss beschreibt die Gesamtmenge des Magnetfelds, die durch eine bestimmte Fläche hindurchtritt.",
      "Im SI ist das Weber die Referenzeinheit für Angaben des magnetischen Flusses.",
    ],
    [
      { label: "Physikalische Größe", value: "Magnetischer Fluss" },
      { label: "SI-Einheit", value: "Weber" },
      { label: "SI-Symbol", value: "Wb" },
      { label: "Dimensionssymbol", value: "ML²T⁻²I⁻¹" },
    ],
    [
      {
        title: "Was beschreibt magnetischer Fluss?",
        paragraphs: [
          "Magnetischer Fluss misst, wie viele Magnetfeldlinien eine bestimmte Fläche durchqueren.",
          "Er ist zentral für das Verständnis von elektromagnetischer Induktion in Transformatoren und Generatoren.",
        ],
      },
      {
        title: "Weber und Milliweber",
        paragraphs: [
          "Das Weber ist die SI-Basiseinheit für den magnetischen Fluss.",
          "Milliweber wird für kleinere magnetische Flusswerte verwendet, wie sie in Elektromotoren häufig vorkommen.",
        ],
      },
      {
        title: "Wofür werden Umrechnungen des magnetischen Flusses benötigt?",
        paragraphs: [
          "Sie sind entscheidend beim Design von Transformatoren, Generatoren und Elektromotoren.",
          "Auch in der physikalischen Forschung zu elektromagnetischer Induktion sind sie unverzichtbar.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "viskozite_kinematik",
    "viskozite_kinematik",
    "Kinematische-Viskositätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Quadratmeter pro Sekunde und Zentistokes um und erfahren Sie mehr über Motoröl- und Flüssigkeitsklassifizierung.",
    [
      "Kinematische Viskosität beschreibt den Fließwiderstand einer Flüssigkeit im Verhältnis zu ihrer Dichte.",
      "Im SI ist Quadratmeter pro Sekunde die Referenzeinheit, in der Praxis wird häufig Zentistokes verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Kinematische Viskosität" },
      { label: "SI-Einheit", value: "Quadratmeter pro Sekunde" },
      { label: "SI-Symbol", value: "m²/s" },
      { label: "Dimensionssymbol", value: "L²T⁻¹" },
    ],
    [
      {
        title: "Was beschreibt kinematische Viskosität?",
        paragraphs: [
          "Kinematische Viskosität ergibt sich aus der dynamischen Viskosität geteilt durch die Dichte einer Flüssigkeit.",
          "Sie beschreibt, wie leicht eine Flüssigkeit unter dem Einfluss der Schwerkraft fließt.",
        ],
      },
      {
        title: "Quadratmeter pro Sekunde und Zentistokes",
        paragraphs: [
          "Quadratmeter pro Sekunde ist die SI-Basiseinheit, liefert für gängige Flüssigkeiten aber sehr kleine Zahlenwerte.",
          "Zentistokes ist die in der Industrie bevorzugte praktische Einheit, besonders bei der Klassifizierung von Motorölen.",
        ],
      },
      {
        title: "Wofür werden Umrechnungen der kinematischen Viskosität benötigt?",
        paragraphs: [
          "Sie sind entscheidend bei der Auswahl von Motorölen und Schmierstoffen für verschiedene Betriebsbedingungen.",
          "Auch in der Strömungsmechanik und bei Kraftstoffanalysen spielen sie eine wichtige Rolle.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "isil_iletkenlik",
    "isil_iletkenlik",
    "Wärmeleitfähigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt pro Meter-Kelvin und BTU pro Stunde-Fuß-°F um und erfahren Sie mehr über Dämmstoffauswahl und Wärmeleitungsberechnungen.",
    [
      "Wärmeleitfähigkeit beschreibt, wie gut ein Material Wärme durch Leitung transportiert.",
      "Im SI ist Watt pro Meter-Kelvin die Referenzeinheit, in den USA wird häufig BTU pro Stunde-Fuß-°F verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Wärmeleitfähigkeit" },
      { label: "SI-Einheit", value: "Watt pro Meter-Kelvin" },
      { label: "SI-Symbol", value: "W/(m·K)" },
      { label: "Dimensionssymbol", value: "MLT⁻³Θ⁻¹" },
    ],
    [
      {
        title: "Was beschreibt Wärmeleitfähigkeit?",
        paragraphs: [
          "Wärmeleitfähigkeit gibt an, wie effizient ein Material Wärme von einer wärmeren zu einer kälteren Stelle transportiert.",
          "Materialien mit niedriger Wärmeleitfähigkeit eignen sich gut als Dämmstoffe, solche mit hoher Wärmeleitfähigkeit als Wärmeleiter.",
        ],
      },
      {
        title: "Watt pro Meter-Kelvin und BTU pro Stunde-Fuß-°F",
        paragraphs: [
          "Watt pro Meter-Kelvin ist die international vereinheitlichte SI-Einheit der Wärmeleitfähigkeit.",
          "BTU pro Stunde-Fuß-°F ist die in amerikanischen Baunormen gebräuchliche Einheit.",
        ],
      },
      {
        title: "Wofür werden Wärmeleitfähigkeitsumrechnungen benötigt?",
        paragraphs: [
          "Sie sind entscheidend bei der Auswahl von Dämmstoffen und der Berechnung von Wärmeverlusten in Gebäuden.",
          "Auch in der Materialwissenschaft und im Maschinenbau sind sie für die Bewertung von Bauteilen wichtig.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "isi_akisi",
    "isi_akisi",
    "Wärmestromdichteeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt pro Quadratmeter und Kilowatt pro Quadratmeter um und erfahren Sie mehr über Oberflächenwärmeübertragung und Dämmberechnungen.",
    [
      "Wärmestromdichte beschreibt die Wärmeleistung, die pro Flächeneinheit übertragen wird.",
      "Im SI ist Watt pro Quadratmeter die Referenzeinheit für Wärmestromdichteangaben.",
    ],
    [
      { label: "Physikalische Größe", value: "Wärmestromdichte" },
      { label: "SI-Einheit", value: "Watt pro Quadratmeter" },
      { label: "SI-Symbol", value: "W/m²" },
      { label: "Dimensionssymbol", value: "MT⁻³" },
    ],
    [
      {
        title: "Was beschreibt Wärmestromdichte?",
        paragraphs: [
          "Wärmestromdichte gibt an, wie viel Wärmeleistung pro Flächeneinheit durch eine Oberfläche fließt.",
          "Sie ist zentral für die Bewertung von Wärmeverlusten durch Gebäudehüllen und Solaranlagen.",
        ],
      },
      {
        title: "Watt pro Quadratmeter und Kilowatt pro Quadratmeter",
        paragraphs: [
          "Watt pro Quadratmeter wird für alltägliche Wärmeflussberechnungen in der Bauphysik verwendet.",
          "Kilowatt pro Quadratmeter eignet sich für intensivere industrielle Wärmeflüsse.",
        ],
      },
      {
        title: "Wofür werden Wärmestromdichteumrechnungen benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der energetischen Bewertung von Gebäuden und der Auslegung von Solaranlagen.",
          "Auch in der industriellen Wärmetechnik spielen sie eine zentrale Rolle bei Effizienzberechnungen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "ozgul_isi",
    "ozgul_isi",
    "Spezifische-Wärmekapazitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Joule pro Kilogramm-Kelvin und Kalorie pro Gramm-Kelvin um und erfahren Sie mehr über die Erwärmungskapazität von Materialien.",
    [
      "Spezifische Wärmekapazität beschreibt, wie viel Energie nötig ist, um die Temperatur eines Stoffes um ein Kelvin zu erhöhen.",
      "Im SI ist Joule pro Kilogramm-Kelvin die Referenzeinheit, traditionell wird auch Kalorie pro Gramm-Kelvin verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Spezifische Wärmekapazität" },
      { label: "SI-Einheit", value: "Joule pro Kilogramm-Kelvin" },
      { label: "SI-Symbol", value: "J/(kg·K)" },
      { label: "Dimensionssymbol", value: "L²T⁻²Θ⁻¹" },
    ],
    [
      {
        title: "Was beschreibt spezifische Wärmekapazität?",
        paragraphs: [
          "Spezifische Wärmekapazität gibt an, wie viel Energie ein Kilogramm eines Stoffes aufnehmen muss, um um ein Kelvin wärmer zu werden.",
          "Sie ist eine grundlegende Materialeigenschaft mit Bedeutung für Thermodynamik und Energietechnik.",
        ],
      },
      {
        title: "Joule pro Kilogramm-Kelvin und Kalorie pro Gramm-Kelvin",
        paragraphs: [
          "Joule pro Kilogramm-Kelvin ist die international vereinheitlichte SI-Einheit.",
          "Kalorie pro Gramm-Kelvin ist eine traditionelle Einheit, die in Chemie und älterer Fachliteratur noch vorkommt.",
        ],
      },
      {
        title: "Wofür werden Umrechnungen der spezifischen Wärmekapazität benötigt?",
        paragraphs: [
          "Sie sind wichtig bei der Materialauswahl für Wärmespeicher, Kühlsysteme und thermische Isolierungen.",
          "Auch in der chemischen Verfahrenstechnik sind präzise Werte für Energiebilanzen unverzichtbar.",
        ],
      },
    ]
  ),
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
        title: "Geschichte der Druckmessung: Torricelli und das Barometer",
        paragraphs: [
          "Die systematische Druckmessung begann 1643, als der italienische Wissenschaftler Evangelista Torricelli das erste Quecksilberbarometer baute. Er füllte ein einseitig geschlossenes Glasrohr mit Quecksilber und tauchte das offene Ende in ein Gefäß mit Quecksilber; die Säule blieb auf einer bestimmten Höhe stehen und ließ darüber einen leeren Raum entstehen.",
          "Torricelli folgerte, dass die Höhe der Quecksilbersäule durch das Gewicht der umgebenden Luft ausgeglichen wird. Dies war der erste experimentelle Beleg dafür, dass Luft ein messbares Gewicht und damit einen Druck besitzt.",
          "1648 trug Florin Périer auf Vorschlag von Blaise Pascal ein Barometer auf den Puy-de-Dôme und zeigte, dass der Luftdruck mit der Höhe abnimmt. Spätere Meilensteine bauten darauf auf, etwa die Meterkonvention von 1875, die exakte Definition der Standardatmosphäre 1954 und die Aufnahme des Pascal als SI-Einheit 1971.",
        ],
      },
      {
        title: "Absolutdruck, Überdruck und Differenzdruck",
        paragraphs: [
          "Absolutdruck wird gegenüber einem vollständigen Vakuum gemessen, dem theoretischen Nullpunkt des Drucks. Gasgesetze und thermodynamische Berechnungen benötigen in der Regel den Absolutdruck.",
          "Überdruck (Gauge-Druck) wird relativ zum umgebenden Atmosphärendruck gemessen. Die meisten Manometer im Feld sind auf die lokale Atmosphäre genullt, sodass der angezeigte Wert fast immer ein Überdruck ist: Absolutdruck = Überdruck + Atmosphärendruck.",
          "Differenzdruck ist die Differenz zwischen zwei Messpunkten, etwa vor und nach einem Filter oder einer Blende. Er bezieht sich weder auf ein Vakuum noch auf die Atmosphäre, sondern direkt auf einen zweiten Druckpunkt, was ihn für Durchflussmessungen besonders nützlich macht.",
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

export function findGermanCategoryPageByCategory(
  category: string
) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.category === category
  );
}

export function getGermanCategoryPathByCategory(
  category: string
) {
  const categoryPage =
    findGermanCategoryPageByCategory(category);

  return categoryPage
    ? `/de/kategorien/${categoryPage.slug}`
    : `/de/kategorien/${category}`;
}
