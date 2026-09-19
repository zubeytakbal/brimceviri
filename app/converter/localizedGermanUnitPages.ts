import type { UnitPage } from "./unitPages";
import { unitPages } from "./unitPages";
import { getGermanCategorySlug } from "../i18n/germanRoutes";

export type LocalizedGermanUnitPage = UnitPage & {
  locale: "de";
  sourceSlug: string;
  categoryName: string;
};

type GermanUnitContent = {
  name: string;
  slug: string;
  categoryName: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  commonUses: string;
};

const germanUnitContent: Record<string, GermanUnitContent> = {
  kilogram: {
    name: "Kilogramm",
    slug: "kilogramm",
    categoryName: "Masse",
    shortDescription:
      "Das Kilogramm ist die SI-Basiseinheit der Masse. Es wird umfassend in Handel, Labor und Technik verwendet.",
    historySummary:
      "Der Ursprung des Kilogramms geht ebenfalls auf die Französische Revolution zurück: 1795 wurde das Gramm als die Masse von 1 Kubikzentimeter Wasser am Schmelzpunkt von Eis (0 °C) definiert -- 1 Kilogramm entsprach also der Masse von 1 Liter Wasser unter diesen Bedingungen. Da man jedoch erkannte, dass sich die Dichte von Wasser mit der Temperatur ändert, wurde 1799 ein Platinprototyp namens 'Kilogramme des Archives' angefertigt; diesmal war die Referenz die Masse von 1 Kubikdezimeter Wasser bei etwa 4 °C, der Temperatur seiner höchsten Dichte. 1889 wurde dieser Prototyp durch einen neuen Zylinder aus einer Platin-Iridium-Legierung ersetzt, bekannt als 'Le Grand K', der 130 Jahre lang im Internationalen Büro für Maß und Gewicht in Frankreich als weltweites Referenzkilogramm aufbewahrt wurde. Mit der Zeit stellte man fest, dass dieser Zylinder im Vergleich zu seinen bei der Herstellung angefertigten Kopien um etwa 50 Mikrogramm abwich -- eine unvermeidliche Schwäche der Bindung an ein physisches Objekt. Am 16. November 2018 beschloss die Generalkonferenz für Maß und Gewicht, das Kilogramm neu auf Basis der Planck-Konstante zu definieren; diese neue Definition trat am 20. Mai 2019 in Kraft, wodurch das Kilogramm nun in jedem Labor der Welt reproduzierbar ist, ohne ein physisches Referenzobjekt zu benötigen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Handel, Transport, Labor und Prozessberechnungen",
  },
  gram: {
    name: "Gramm",
    slug: "gramm",
    categoryName: "Masse",
    shortDescription:
      "Das Gramm ist eine Masseneinheit, die einem Tausendstel eines Kilogramms entspricht. Es wird zur Angabe von Lebensmitteln, Labormengen und kleinen Stoffmengen verwendet.",
    historySummary:
      "Das Gramm war 1795 in der ersten Definition des französischen metrischen Systems die eigentliche Basiseinheit der Masse und wurde als die Masse von 1 Kubikzentimeter Wasser am Schmelzpunkt von Eis definiert. Da es jedoch in der Praxis schwierig war, eine so kleine Masse präzise und reproduzierbar in einen Standardprototyp umzusetzen, wählte man 1799 stattdessen das 1000-mal größere Kilogramm (die Masse von einem Kubikdezimeter Wasser) als Referenzprototyp. Diese historische Entscheidung führte dazu, dass unter den sieben SI-Basiseinheiten ausschließlich das Kilogramm eine Vorsilbe ('Kilo-') im Namen trägt -- das Gramm selbst, obwohl es der ursprüngliche Namensgeber ist, gilt heute als sekundäre Einheit, definiert als Untereinheit des Kilogramms.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Lebensmittel, Chemie, Pharmazie und Präzisionsmessungen",
  },
  miligram: {
    name: "Milligramm",
    slug: "milligramm",
    categoryName: "Masse",
    shortDescription:
      "Das Milligramm ist ein Tausendstel Gramm und wird für sehr kleine Massen verwendet.",
    historySummary:
      "Mit der Entwicklung präziser Analysen und Dosierungen wurde das Milligramm in Medizin und Labor unverzichtbar.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Arzneidosen, analytische Chemie und Präzisionsformulierungen",
  },
  pound: {
    name: "Pfund",
    slug: "pfund",
    categoryName: "Masse",
    shortDescription:
      "Pfund ist eine im britischen und amerikanischen Maßsystem verwendete Masseneinheit. Ein internationales Pfund entspricht genau 0,45359237 Kilogramm.",
    historySummary:
      "Pfund leitet sich von der römischen Einheit 'Libra' ab (etwa 328,9 Gramm, unterteilt in 12 'Unciae') -- daher stammt auch die Abkürzung 'lb'; das Wort 'Pound' selbst kommt vom Ausdruck 'libra pondo' (ein mit der Libra gewogenes Gewicht). Vor der normannischen Eroberung (1066) war in England unter König Offa (757-796) das auf Silber basierende 'sächsische Pfund' in Gebrauch, aus dem 240 Pennys geprägt wurden. Das um 1300 im Handel verbreitete 'Avoirdupois-Pfund' entsprach zunächst 6992 Troy-Grain, wurde aber unter Königin Elisabeth I. exakt auf 7000 Troy-Grain (unterteilt in 16 Unzen) festgelegt. Mit dem Gewichts- und Maßgesetz von 1878 wurde ein Platinzylinder zum offiziellen Standardprototyp erklärt. Das endgültige internationale Abkommen wurde am 1. Juli 1959 unterzeichnet: Seitdem gilt das Pfund als exakt 0,45359237 Kilogramm; Großbritannien übernahm diese Definition offiziell mit dem Gesetz von 1963.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Einzelhandel, Transport, Ernährung und industrielle Kataloge",
  },
  ton: {
    name: "Tonne",
    slug: "tonne",
    categoryName: "Masse",
    shortDescription:
      "Die metrische Tonne ist eine große Masseneinheit, die 1000 Kilogramm entspricht und zur Angabe schwerer Lasten und industrieller Mengen verwendet wird.",
    historySummary:
      "Das Wort 'Tonne' stammt vom mittelenglischen 'tun' (großes Weinfass); da ein voll gefülltes Tun-Fass ungefähr das Gewicht einer Long Ton hatte, wurde der Begriff auch als Masseneinheit übernommen. Heute können drei unterschiedliche 'Tonnen'-Definitionen zu Verwirrung führen: die metrische Tonne (exakt 1000 kg, weltweit und in der Türkei Standard), die in den USA gebräuchliche Short Ton (2000 Pfund ≈ 907,18 kg) und die historisch in Großbritannien verwendete Long Ton (2240 Pfund ≈ 1016,05 kg). Obwohl der Unterschied zwischen diesen drei Werten klein erscheint, ist es im internationalen Handel und in Logistikverträgen wichtig, eindeutig anzugeben, welche 'Tonnen'-Definition verwendet wird.",
    measurementSystem: "Metrisches System, mit dem SI kompatibel",
    commonUses: "Logistik, Produktion, Rohstoffhandel und Schwerindustrie",
  },
  ons: {
    name: "Unze",
    slug: "unze",
    categoryName: "Masse",
    shortDescription:
      "Unze ist eine kleine, im britischen und amerikanischen Maßsystem verwendete Masseneinheit. Eine Avoirdupois-Unze entspricht 28,349523125 Gramm.",
    historySummary:
      "Das Wort 'Unze' leitet sich von der römischen Einheit 'Uncia' ab, die die 'Libra' (Vorläufer des Pfunds) in zwölf gleiche Teile unterteilte. Die im Alltag verwendete Avoirdupois-Unze (28,349523125 g) entspricht einem Sechzehntel eines Pfunds; die im Edelmetallhandel verwendete Feinunze (Troy-Unze) ist dagegen anders und schwerer (31,1034768 g) -- deshalb bezieht sich der 'Preis pro Unze' bei Gold/Silber auf eine etwa 10 % schwerere Einheit als die Unze im alltäglichen Einkauf. Die Feinunze ist nach Troyes benannt, einer bedeutenden Handelsmessestadt im mittelalterlichen Frankreich.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Verpackung, Lebensmittel und leichte Handelsmaße außerhalb des Schmuckbereichs",
  },
  pascal: {
    name: "Pascal",
    slug: "pascal",
    categoryName: "Druck",
    shortDescription:
      "Pascal ist die abgeleitete SI-Einheit des Drucks und über die Beziehung 1 Pa = 1 N/m² definiert.",
    historySummary:
      "Die Einheit ist nach dem französischen Wissenschaftler Blaise Pascal aus dem 17. Jahrhundert benannt -- Pascal ist bekannt für seine Arbeiten zur Hydrodynamik und Hydrostatik sowie seine bahnbrechenden Druckexperimente mit dem Barometer. Seine Erkenntnis, dass der auf eine eingeschlossene Flüssigkeit ausgeübte Druck in alle Richtungen gleichmäßig übertragen wird (Pascalsches Prinzip), bildet die Grundlage hydraulischer Systeme. Die Einheit wurde 1971 auf der 14. Generalkonferenz für Maß und Gewicht offiziell als SI-Einheit anerkannt und als Newton pro Quadratmeter (N/m²) definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Wissenschaftliche Berechnungen, Werkstoffanalyse und Referenzumrechnungen",
  },
  kilopascal: {
    name: "Kilopascal",
    slug: "kilopascal",
    categoryName: "Druck",
    shortDescription:
      "Das Kilopascal ist eine Druckeinheit von 1000 Pascal und liefert für viele Anwendungen besser lesbare Zahlen.",
    historySummary:
      "In technischen Dokumenten setzte sich das Kilopascal durch, weil Einzel-Pascal-Werte für viele Praxisbereiche zu klein sind.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "HLK, Reifenfülldruck, Bautechnik und Prozessdaten",
  },
  bar: {
    name: "Bar",
    slug: "bar",
    categoryName: "Druck",
    shortDescription:
      "Bar ist eine Druckeinheit, die 100.000 Pascal entspricht. Sie ist eine in Industrie und an Geräteanzeigen sehr gebräuchliche praktische Darstellung.",
    historySummary:
      "Die Einheit Bar wurde vom norwegischen Meteorologen Vilhelm Bjerknes eingeführt, einem der Pioniere der modernen Wettervorhersage; ihr Name stammt vom altgriechischen 'baros' (Gewicht) (interessanterweise wurde das Wort 'Bar' zwischen 1793 und 1795 im frühen metrischen System auch für eine Masseneinheit verwendet, die der heutigen Tonne entsprach). 1 Bar entspricht genau 100.000 Pascal und liegt sehr nahe am mittleren Atmosphärendruck auf Meereshöhe (etwa 1,013 Bar). Obwohl Bar keine offizielle SI-Einheit ist, wird es dank der zahlenmäßigen Übereinstimmung mit Millibar/Hektopascal-Werten und seiner praktischen Handhabung von Meteorologen und in der Luftfahrtbranche bis heute häufig verwendet.",
    measurementSystem: "Technische Einheit außerhalb des SI",
    commonUses: "Kompressoren, Hydraulik, Pneumatik und Servicemanometer",
  },
  psi: {
    name: "PSI",
    slug: "psi",
    categoryName: "Druck",
    shortDescription:
      "PSI ist die Abkürzung für 'Pound-force per Square Inch'. Es ist eine in angloamerikanischen technischen Systemen gebräuchliche Druckeinheit.",
    historySummary:
      "Wie der Name schon sagt, ist PSI eine zusammengesetzte Einheit aus einer Krafteinheit (Pound-Force) geteilt durch eine Flächeneinheit (Quadratzoll); sie verbreitete sich im 19. Jahrhundert im Zeitalter der Dampfmaschine in der britischen Ingenieurtradition zur Angabe des Kesseldrucks. Obwohl sich das metrische System weltweit als Standard etabliert hat, bleibt PSI in der Automobilbranche (Reifendruck), bei Hydrauliksystemen und in aus den USA stammenden Industriegerätekatalogen faktisch der Branchenstandard.",
    measurementSystem: "Britische und US-amerikanische technische Verwendung",
    commonUses: "Reifendruck, Hydrauliksysteme und technischer Kundendienst",
  },
  "milimetre-civa": {
    name: "Millimeter Quecksilbersäule",
    slug: "millimeter-quecksilbersaeule",
    categoryName: "Druck",
    shortDescription:
      "Millimeter Quecksilbersäule ist eine Druckeinheit, die auf der Höhe einer Quecksilbersäule beruht. Sie besitzt historische Bedeutung in medizinischen und Labormessungen.",
    historySummary:
      "Der Ursprung von mmHg geht auf das 1643 vom italienischen Physiker Evangelista Torricelli erfundene Quecksilberbarometer zurück -- Torricelli füllte ein einseitig geschlossenes Glasrohr mit Quecksilber und drehte es um; dabei zeigte sich, dass der Atmosphärendruck das Quecksilber bis zu einer bestimmten Höhe (auf Meereshöhe etwa 760 mm) stützen konnte, wodurch die erste direkte Messung des Atmosphärendrucks gelang. Diese Entdeckung widerlegte auch die jahrhundertealte aristotelische Ansicht, dass 'die Natur ein Vakuum verabscheut', denn der leere Raum über dem Quecksilber im Rohr war ein echtes Vakuum (heute als 'Torricellisches Vakuum' bekannt). Aufgrund dieser historischen Verbindung wird die Einheit mmHg bis heute als Standardeinheit der Blutdruckmessung in der Medizin verwendet.",
    measurementSystem: "Historische technische und medizinische Einheit außerhalb des SI",
    commonUses: "Blutdruckmessungen, Labormanometer und Vakuumreferenzen",
  },
  metrekare: {
    name: "Quadratmeter",
    slug: "quadratmeter",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratmeter ist die SI-abgeleitete Einheit der Fläche.",
    historySummary:
      "Als zweidimensionale Ableitung des Meters wurde der Quadratmeter zum Standardmaß für Oberflächen und Grundflächen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Gebäude, Bodenflächen, Paneele und Querschnittsangaben",
  },
  hektar: {
    name: "Hektar",
    slug: "hektar",
    categoryName: "Fläche",
    shortDescription:
      "Hektar ist eine besonders bei Landflächen verwendete große Flächeneinheit. 1 Hektar entspricht genau 10.000 Quadratmetern.",
    historySummary:
      "Hektar wurde 1795 als Teil des durch die Französische Revolution eingeführten metrischen Systems als das Hundertfache der Einheit Ar (100 m²) definiert und mit der Vorsilbe 'Hekto-' (hundert) benannt. Da er sich für die Beschreibung großer landwirtschaftlicher und forstwirtschaftlicher Flächen als deutlich praktischer erwies als der Ar, wurde er mit der Zeit weltweit zur Standardeinheit für Landflächen. Zum anschaulichen Vergleich: Ein Standardfußballfeld ist etwa 0,7 Hektar groß -- das macht den Hektar im Alltag leicht greifbar.",
    measurementSystem: "Metrisches System, mit dem SI kompatibel",
    commonUses: "Landwirtschaftliche Flächen, Bebauungspläne und große Grundstückseinträge",
  },
  fitkare: {
    name: "Quadratfuß",
    slug: "quadratfuss",
    categoryName: "Fläche",
    shortDescription:
      "Quadratfuß ist eine im britischen und amerikanischen Maßsystem verwendete Flächeneinheit. Ein Quadratfuß entspricht etwa 0,092903 Quadratmetern.",
    historySummary:
      "Quadratfuß ergibt sich durch Quadrieren der Einheit Fuß und ist in der US-amerikanischen Immobilienbranche die Standardeinheit zur Angabe von Wohn-/Bürofläche -- in den USA wird die Größe eines Hauses fast immer in Quadratfuß (Square Feet) statt in Quadratmetern angegeben. Das führt bei US-Immobilienanzeigen im Vergleich zu Ländern mit metrischem System (m²) häufig zu Umrechnungsbedarf; eine Wohnung mit 1000 Quadratfuß entspricht etwa 93 Quadratmetern.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Immobilienanzeigen, Bodenflächen und manche Baukataloge",
  },
  litre: {
    name: "Liter",
    slug: "liter",
    categoryName: "Volumen",
    shortDescription:
      "Liter ist eine sehr gebräuchliche Volumeneinheit zur Angabe von Flüssigkeiten und Fassungsvermögen. 1 Liter entspricht 0,001 Kubikmetern.",
    historySummary:
      "Der Liter wurde 1795 in Frankreich als Teil des durch die Französische Revolution eingeführten neuen Maßsystems als 'ein Kubikdezimeter' definiert. 1901 definierte die Generalkonferenz für Maß und Gewicht den Liter neu als 'das Volumen von 1 kg reinem Wasser bei seiner Temperatur höchster Dichte (3,98 °C) und 1 Atmosphäre Druck' -- doch da der als Referenz dienende Platin-Iridium-Kilogrammprototyp um 28 Millionstel größer als erwartet ausfiel, machte diese Definition den Liter geringfügig größer (etwa um den Faktor 1,000028) als einen Kubikdezimeter. Diese 63 Jahre bestehende Abweichung wurde 1964 korrigiert, als die Generalkonferenz den Liter wieder exakt als 'ein Kubikdezimeter' definierte, direkt an den Meter gekoppelt.",
    measurementSystem: "Metrisches System, mit dem SI kompatibel",
    commonUses: "Flüssigkeiten, Tankvolumen, Laborgefäße und Alltagsmaße",
  },
  metrekup: {
    name: "Kubikmeter",
    slug: "kubikmeter",
    categoryName: "Volumen",
    shortDescription:
      "Kubikmeter ist die abgeleitete SI-Einheit des Volumens. Sie ist die grundlegende Referenz für große Volumina und technische Kapazitäten.",
    historySummary:
      "Ein Kubikmeter ist definiert als das Innenvolumen eines Würfels mit exakt 1 Meter Kantenlänge und ergibt sich direkt aus der Erweiterung des Meters auf drei Dimensionen. Da er 1000 Litern entspricht (1 m³ = 1000 L), wird er im Alltag weltweit als Standardeinheit für die Abrechnung von Erdgas- und Wasserverbrauch verwendet. In der Bauindustrie werden Beton- und Aushubmengen, in der Industrie Tank- und Lagerkapazitäten ebenfalls häufig in dieser Einheit angegeben.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Lagervolumen, Gebäudeinnenraum, Prozesstanks und Durchflussberechnungen",
  },
  mililitre: {
    name: "Milliliter",
    slug: "milliliter",
    categoryName: "Volumen",
    shortDescription:
      "Der Milliliter ist ein Tausendstel Liter und eignet sich für kleine, präzise Flüssigkeitsmengen.",
    historySummary:
      "Mit wachsender Bedeutung von Medizin, Labor und Dosiertechnik wurde der Milliliter zu einer zentralen Feineinheit.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Medizin, Labormuster und kleine Flüssigkeitsmengen",
  },
  santigrat: {
    name: "Celsius",
    slug: "celsius",
    categoryName: "Temperatur",
    shortDescription:
      "Celsius ist eine der im Alltag und in der Technik am häufigsten verwendeten Temperaturskalen.",
    historySummary:
      "Die Celsius-Skala wurde 1742 vom schwedischen Astronomen Anders Celsius erfunden -- interessanterweise war seine ursprüngliche Skala genau umgekehrt zur heutigen: 0 Grad bezeichnete den Siedepunkt, 100 Grad den Gefrierpunkt von Wasser. Der französische Physiker Jean-Pierre Christin kehrte diese Skala 1743 (in seinem 'Lyoner Thermometer') um, wodurch die heutige Ordnung mit 0 °C als Gefrierpunkt und 100 °C als Siedepunkt entstand; der schwedische Botaniker Carl von Linné nahm 1744 unabhängig davon dieselbe Umkehrung für sein Gewächshausthermometer vor. Lange wurde die Skala 'Centigrade' genannt; 1948 benannte das Internationale Komitee für Maß und Gewicht sie offiziell in 'Grad Celsius' um -- sowohl zu Ehren von Celsius als auch um eine Verwechslung des Begriffs 'Centigrade' mit einem Hundertstel einer Winkeleinheit in manchen Sprachen zu vermeiden.",
    measurementSystem: "Mit dem SI verwendete Temperaturskala",
    commonUses: "Wetter, HLK-Technik, Prozessüberwachung und alltägliche Temperaturangaben",
  },
  fahrenhayt: {
    name: "Fahrenheit",
    slug: "fahrenheit",
    categoryName: "Temperatur",
    shortDescription:
      "Fahrenheit ist eine Temperaturskala, die besonders in den USA weiterhin gebräuchlich ist.",
    historySummary:
      "Die Fahrenheit-Skala wurde 1724 vom in Polen geborenen niederländischen Physiker Daniel Gabriel Fahrenheit entwickelt. Er legte den Nullpunkt als die kälteste Temperatur fest, bei der sich eine Mischung aus Eis, Wasser und Ammoniumchlorid (oder Meersalz) im Gleichgewicht befand; 32 Grad entsprachen dem Gefrierpunkt von reinem Wasser und 96 Grad (nach seiner eigenen Messung) der menschlichen Körpertemperatur. Fahrenheit hatte die Werte der vor ihm entwickelten Rømer-Skala mit 4 multipliziert, um eine feinere, bruchfreie Unterteilung zu erhalten. 1776/77 standardisierte ein Komitee der Royal Society unter Vorsitz von Henry Cavendish die Skala und legte den Gefrierpunkt von Wasser exakt auf 32 °F und den Siedepunkt auf 212 °F fest -- durch diese Korrektur verschob sich auch die normale Körpertemperatur auf den heute bekannten Wert von 98,6 °F.",
    measurementSystem: "Britische und US-amerikanische Messtradition",
    commonUses: "US-Wetterdaten, Raumtemperaturen im Haushalt und manche technischen Kataloge",
  },
  kelvin: {
    name: "Kelvin",
    slug: "kelvin",
    categoryName: "Temperatur",
    shortDescription:
      "Kelvin ist die SI-Basiseinheit der Temperatur und repräsentiert die absolute Temperaturskala.",
    historySummary:
      "Die Grundlage der Kelvin-Skala legte 1848 der schottische Physiker William Thomson (später Lord Kelvin); in seiner Arbeit 'Über eine absolute thermometrische Skala' berechnete er anhand des thermischen Ausdehnungskoeffizienten idealer Gase, dass der absolute Nullpunkt bei etwa -273 °C liegt -- erstaunlich nahe am heutigen Wert von -273,15 °C. 1854 arbeitete er mit James Prescott Joule zusammen, um die Skala praktikabler und mit Gasthermometern kompatibel zu machen. Offiziell wurde die Einheit 1954 auf der 10. Generalkonferenz für Maß und Gewicht festgelegt, als der Tripelpunkt von Wasser exakt auf 273,16 K definiert wurde; 1967/68 gab die 13. Konferenz der Einheit den Namen 'Kelvin'. 2019 wurde die Definition noch grundlegender geändert: Kelvin beruht nun nicht mehr auf dem Tripelpunkt von Wasser, sondern direkt auf der Boltzmann-Konstante (festgelegt auf 1,380649×10⁻²³ J/K).",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Thermodynamik, wissenschaftliche Berechnungen und Analysen, die absolute Temperaturen erfordern",
  },
  saniye: {
    name: "Sekunde",
    slug: "sekunde",
    categoryName: "Zeit",
    shortDescription:
      "Die Sekunde ist die SI-Basiseinheit der Zeit und liegt zahlreichen abgeleiteten Größen zugrunde.",
    historySummary:
      "Historisch war die Sekunde als 1/86.400 eines Tages definiert; es zeigte sich jedoch, dass kleine Unregelmäßigkeiten in der Rotationsgeschwindigkeit der Erde diese Definition nicht stabil genug machten. 1967 wurde die Sekunde auf der 13. Tagung der Generalkonferenz für Maß und Gewicht grundlegend neu definiert: Sie entspricht seitdem exakt 9.192.631.770 Perioden der Strahlung, die dem Übergang zwischen den Grundenergiezuständen eines Cäsium-133-Atoms entspricht. Diese Definition ermöglichte es, dass Atomuhren weltweit mit derselben Präzision (im Bereich von einem Milliardstel) reproduzierbar sind, und band die Sekunde an eine universelle Referenz, unabhängig von der Bewegung von Himmelskörpern.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Experimentdauern, Bewegungsanalyse, Datenaufzeichnung und Zeitsteuerung",
  },
  dakika: {
    name: "Minute",
    slug: "minute",
    categoryName: "Zeit",
    shortDescription:
      "Die Minute ist eine praktische Zeiteinheit von 60 Sekunden.",
    historySummary:
      "Als bewährte Zwischenstufe zwischen Sekunde und Stunde blieb die Minute in Alltag, Planung und Technik unverzichtbar.",
    measurementSystem: "Nicht-SI-Einheit, mit dem SI verwendet",
    commonUses: "Kurzzeitangaben, Planung, Sport und Prozessschritte",
  },
  saat: {
    name: "Stunde",
    slug: "stunde",
    categoryName: "Zeit",
    shortDescription:
      "Die Stunde ist eine weit verbreitete Zeiteinheit von 3600 Sekunden.",
    historySummary:
      "Sie entstand aus zivilen und astronomischen Zeitordnungen und ist bis heute zentral für Alltag und Betriebsplanung.",
    measurementSystem: "Nicht-SI-Einheit, mit dem SI verwendet",
    commonUses: "Arbeitszeiten, Reisen, Energieverbrauch und Tagesplanung",
  },
  "metre-saniye": {
    name: "Meter pro Sekunde",
    slug: "meter-pro-sekunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Meter pro Sekunde ist die SI-abgeleitete Einheit der Geschwindigkeit.",
    historySummary:
      "Aus Meter und Sekunde zusammengesetzt wurde diese Einheit zur Standardsprache der Physik und Ingenieurwissenschaften.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Strömungen, Mechanik, Versuchstechnik und Wissenschaft",
  },
  "kilometre-saat": {
    name: "Kilometer pro Stunde",
    slug: "kilometer-pro-stunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Kilometer pro Stunde ist eine praktische Geschwindigkeitseinheit für Verkehr und Feldanwendungen.",
    historySummary:
      "Mit dem Ausbau metrischer Verkehrssysteme wurde km/h zur dominanten Straßengeschwindigkeitseinheit in vielen Ländern.",
    measurementSystem: "Metrische praktische Einheit",
    commonUses: "Fahrzeuggeschwindigkeiten, Verkehr und Feldmessungen",
  },
  "mil-saat": {
    name: "Meilen pro Stunde",
    slug: "meilen-pro-stunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Meilen pro Stunde ist eine nichtmetrische Geschwindigkeitseinheit, die vor allem in den USA verbreitet ist.",
    historySummary:
      "Die Einheit entwickelte sich aus dem Zusammenspiel von Meile und Stunde in angloamerikanischen Verkehrssystemen.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Straßenverkehr, Fahrzeugtechnik und Berichte im angloamerikanischen Raum",
  },
  joule: {
    name: "Joule",
    slug: "joule",
    categoryName: "Energie",
    shortDescription:
      "Joule ist die abgeleitete SI-Einheit der Energie. Sie wird zur Angabe von Arbeit, Wärme und Energiemengen verwendet.",
    historySummary:
      "Die Einheit ist nach dem britischen Physiker James Prescott Joule (1818-1889) benannt, der den Zusammenhang zwischen mechanischer Arbeit und Wärme aufzeigte. Der Name wurde erstmals am 23. August 1882 in der Präsidentschaftsrede von William Siemens vor der British Association for the Advancement of Science vorgeschlagen; Siemens schlug vor, die Einheit zu Ehren 'des Mannes, der so viel zur Entwicklung der dynamischen Wärmetheorie beigetragen hat', 'Joule' zu nennen. Offiziell wurde die Einheit am 31. August 1889 auf dem Zweiten Internationalen Elektrizitätskongress zusammen mit dem Watt angenommen -- durch einen bemerkenswerten Zufall verstarb Joule noch im selben Jahr (am 11. Oktober 1889). 1946 wurde die Definition im Rahmen des Giorgi-Systems aktualisiert und unabhängig von elektromagnetischen Einheiten direkt als 'die Arbeit, die eine Kraft entlang eines Weges von einem Meter verrichtet' neu gefasst.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Thermodynamik, Energiebilanzen und wissenschaftliche Berechnungen",
  },
  kilovatsaat: {
    name: "Kilowattstunde",
    slug: "kilowattstunde",
    categoryName: "Energie",
    shortDescription:
      "Die Kilowattstunde ist eine praktische Energieeinheit, die vor allem im Stromverbrauchswesen genutzt wird.",
    historySummary:
      "Sie wurde im Energiesektor wichtig, weil sie Leistung und Zeit direkt in eine gut abrechenbare Energiemenge verbindet.",
    measurementSystem: "Technische und kommerzielle Energieeinheit",
    commonUses: "Stromabrechnung, Speichertechnik und Energievergleiche",
  },
  watt: {
    name: "Watt",
    slug: "watt",
    categoryName: "Leistung",
    shortDescription:
      "Watt ist die abgeleitete SI-Einheit der Leistung. Sie gibt die Rate an, mit der Energie übertragen wird.",
    historySummary:
      "Die Einheit ist nach dem schottischen Erfinder James Watt (1736-1819) benannt -- Watt legte 1776 mit der Weiterentwicklung der bis dahin verwendeten Newcomen-Dampfmaschine einen der Grundsteine der Industriellen Revolution. Der Name Watt wurde erstmals im August 1882 von William Siemens auf einem Kongress der British Association for the Advancement of Science vorgeschlagen; Siemens definierte ihn als 'die Leistung, die ein Strom von 1 Ampere bei einer Potentialdifferenz von 1 Volt transportiert'. 1908 wurden auf der Internationalen Konferenz für elektrische Einheiten und Normen in London die praktischen elektrischen Einheiten offiziell festgelegt, und 1960 wurde das Watt auf der 11. Generalkonferenz für Maß und Gewicht offiziell als SI-Leistungseinheit anerkannt.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Geräteleistung, Motorenkennwerte und Energiesysteme",
  },
  kilowatt: {
    name: "Kilowatt",
    slug: "kilowatt",
    categoryName: "Leistung",
    shortDescription:
      "Das Kilowatt ist eine Leistungseinheit von 1000 Watt und eignet sich für größere Anlagen- und Geräteleistungen.",
    historySummary:
      "Viele praktische Leistungswerte liegen im Tausenderbereich, weshalb sich das Kilowatt in Technik und Versorgung stark etabliert hat.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "HLK-Anlagen, Generatoren, Maschinen und Netztechnik",
  },
  megawatt: {
    name: "Megawatt",
    slug: "megawatt",
    categoryName: "Leistung",
    shortDescription:
      "Das Megawatt (MW) ist eine große Leistungseinheit von 1.000.000 Watt und wird für Kraftwerke und Großanlagen verwendet.",
    historySummary:
      "Mit der Industrialisierung der Stromerzeugung wurde das Megawatt zur praktischen Standardeinheit für Kraftwerkskapazitäten.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Kraftwerkskapazität, Wind-/Solaranlagen und Großindustrie",
  },
  "metrekup-saat": {
    name: "Kubikmeter pro Stunde",
    slug: "kubikmeter-pro-stunde",
    categoryName: "Durchfluss",
    shortDescription:
      "Kubikmeter pro Stunde ist eine praktische Einheit des Volumenstroms für Gebäude- und Prozesssysteme.",
    historySummary:
      "In HLK-, Wasser- und Prozessanwendungen wurde m³/h zu einer gut lesbaren Standardgröße für stündliche Fördermengen.",
    measurementSystem: "Technische Volumenstrom-Einheit",
    commonUses: "Pumpenauswahl, HLK, Wassertechnik und Prozessströme",
  },
  "litre-dakika": {
    name: "Liter pro Minute",
    slug: "liter-pro-minute",
    categoryName: "Durchfluss",
    shortDescription:
      "Liter pro Minute ist eine anschauliche Volumenstrom-Einheit für kleinere Systeme.",
    historySummary:
      "Die Einheit wurde in Service-, Labor- und kleineren Verteilanlagen verbreitet, weil Minutenwerte dort leichter zu deuten sind.",
    measurementSystem: "Technische Volumenstrom-Einheit",
    commonUses: "Wasserleitungen, Geräteversorgung und kleinere Prozessströme",
  },
  volt: {
    name: "Volt",
    slug: "volt",
    categoryName: "Elektrizität",
    shortDescription:
      "Volt ist die abgeleitete SI-Einheit der elektrischen Spannung.",
    historySummary:
      "Die Einheit ist nach dem italienischen Physiker Alessandro Volta benannt -- Volta erfand 1800 im Zuge seiner Auseinandersetzung mit seinem Kollegen Luigi Galvani über 'tierische Elektrizität' die 'Voltasche Säule'; er entdeckte, dass Zink und Silber das wirksamste Metallpaar bilden, und schuf damit das weltweit erste Gerät, das kontinuierlichen elektrischen Strom erzeugte (den Vorläufer der Batterie). Der Name 'Volt' wurde erst viel später, 1861, von Latimer Clark und Charles Bright vorgeschlagen. 1873 definierte die British Association for the Advancement of Science offiziell die Einheiten Volt, Ohm und Farad; 1881 erkannte der Internationale Elektrikerkongress das Volt als offizielle Einheit der elektromotorischen Kraft (Spannung) an. Mit der SI-Revision 2019 wurde durch die Festlegung eines exakten Werts für die Elementarladung auch die Definition des Volt aktualisiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Elektronische Schaltungen, Stromversorgungen und Netzspannungen",
  },
  kilovolt: {
    name: "Kilovolt",
    slug: "kilovolt",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Kilovolt ist eine Spannungseinheit von 1000 Volt und wird für höhere Spannungsniveaus verwendet.",
    historySummary:
      "Mit zunehmenden Netz- und Übertragungsspannungen wurde das Kilovolt zur kompakten Standarddarstellung größerer Spannungswerte.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Mittelspannung, Transformatoren und Hochspannungstechnik",
  },
  amper: {
    name: "Ampere",
    slug: "ampere",
    categoryName: "Elektrizität",
    shortDescription:
      "Ampere ist die SI-Basiseinheit der elektrischen Stromstärke.",
    historySummary:
      "Die Einheit ist nach dem französischen Physiker und Mathematiker André-Marie Ampère (1775-1836) benannt, der mit seinen Arbeiten zum Elektromagnetismus die Grundlagen der Elektrodynamik legte; Ampère baute dabei auf den Erkenntnissen des dänischen Physikers Hans Christian Ørsted auf. Das Ampere wurde 1881 auf der Internationalen Elektrizitätsausstellung durch ein internationales Abkommen zur Standardeinheit des elektrischen Stroms erklärt; seine erste Definition war ein Zehntel der elektromagnetischen Stromeinheit des CGS-Systems. Bis zur SI-Revision 2019 war das Ampere als der Strom definiert, der zwischen zwei parallelen, 1 Meter voneinander entfernten Leitern eine magnetische Kraft von 2×10⁻⁷ Newton pro Meter erzeugt; seit 2019 wird es direkt über Vielfache der Elementarladung (festgelegt auf 1,602176634×10⁻¹⁹ Coulomb) definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Strommessungen, Schutzeinrichtungen und Gerätekennwerte",
  },
  miliamper: {
    name: "Milliampere",
    slug: "milliampere",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Milliampere ist ein Tausendstel Ampere und eignet sich für kleine Stromstärken.",
    historySummary:
      "Mit dem Aufkommen von Elektronik, Sensorik und Präzisionsinstrumenten wurde das Milliampere besonders wichtig.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektronik, Sensoren und Niedrigstrom-Messungen",
  },
  "deniz-mili": {
    name: "Seemeile",
    slug: "seemeile",
    categoryName: "Länge",
    shortDescription:
      "Die Seemeile ist eine Längeneinheit für die Schifffahrts- und Luftfahrtnavigation, basierend auf dem Erdumfang.",
    historySummary:
      "Sie entspricht genau einer Bogenminute auf einem Großkreis der Erde und ist eine internationale Navigationseinheit.",
    measurementSystem: "Außerhalb des SI, internationale Navigationseinheit",
    commonUses: "Schifffahrts- und Luftfahrtnavigation sowie Positionssysteme",
  },
  "bizans-ayagi": {
    name: "Byzantinischer Fuß",
    slug: "byzantinischer-fuss",
    categoryName: "Länge",
    shortDescription:
      "Der byzantinische Fuß war eine im Byzantinischen Reich verbreitete Längeneinheit für Bauwerke und Land.",
    historySummary:
      "Er wurde in der byzantinischen Architektur und Landvermessung verwendet, bevor moderne Maßsysteme eingeführt wurden.",
    measurementSystem: "Außerhalb des SI, byzantinische historische Einheit",
    commonUses: "Byzantinische Architektur und historische Forschung",
  },
  "bizans-kulaci": {
    name: "Byzantinische Klafter",
    slug: "byzantinische-klafter",
    categoryName: "Länge",
    shortDescription:
      "Die byzantinische Klafter war eine größere Längeneinheit, die etwa der Armspannweite eines Menschen entsprach.",
    historySummary:
      "Sie wurde vor allem bei der Vermessung größerer Distanzen und Grundstücke im Byzantinischen Reich eingesetzt.",
    measurementSystem: "Außerhalb des SI, byzantinische historische Einheit",
    commonUses: "Byzantinische Landvermessung und historische Dokumente",
  },
  santimetrekare: {
    name: "Quadratzentimeter",
    slug: "quadratzentimeter",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratzentimeter ist eine kleine Flächeneinheit für alltägliche und technische Messungen.",
    historySummary:
      "Als metrische Untereinheit wird er vor allem bei kleinen Flächen wie Papier, Textilien oder Bauteilen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Technische Zeichnungen, Textilien und kleine Flächenmaße",
  },
  milimetrekare: {
    name: "Quadratmillimeter",
    slug: "quadratmillimeter",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratmillimeter ist eine sehr kleine Flächeneinheit für die Präzisionstechnik.",
    historySummary:
      "Er wird vor allem in der Elektronik- und Feinwerktechnik zur Angabe von Querschnittsflächen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektroniktechnik und Präzisionsfertigung",
  },
  kilometrekare: {
    name: "Quadratkilometer",
    slug: "quadratkilometer",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratkilometer ist eine große Flächeneinheit für Länder, Städte und geografische Gebiete.",
    historySummary:
      "In Geografie, Kartografie und Statistik wird er verwendet, um große Landflächen übersichtlich anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Geografie, Kartografie und Flächenstatistiken",
  },
  incare: {
    name: "Quadratzoll",
    slug: "quadratzoll",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratzoll ist eine kleine imperiale Flächeneinheit, die vor allem in den USA gebräuchlich ist.",
    historySummary:
      "Er wird häufig bei der Angabe von Bildschirmgrößen und kleinen Bauteilen in amerikanischen Spezifikationen verwendet.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Industriespezifikationen und kleine Bildschirme",
  },
  akre: {
    name: "Acre",
    slug: "acre",
    categoryName: "Fläche",
    shortDescription:
      "Der Acre ist eine traditionelle große Flächeneinheit für landwirtschaftliche Flächen und Grundstücke in den USA und Großbritannien.",
    historySummary:
      "Er stammt aus dem Mittelalter und entsprach ursprünglich der Fläche, die ein Ochsengespann an einem Tag pflügen konnte.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "Immobilien und landwirtschaftliche Flächen in den USA und Großbritannien",
  },
  donum: {
    name: "Dönüm",
    slug: "doenuem",
    categoryName: "Fläche",
    shortDescription:
      "Das Dönüm ist eine regionale Flächeneinheit, die in der Türkei und im Nahen Osten für landwirtschaftliche Flächen verwendet wird.",
    historySummary:
      "Es stammt aus der osmanischen Zeit und wird bis heute in ländlichen Regionen der Türkei als praktisches Flächenmaß genutzt.",
    measurementSystem: "Außerhalb des SI, regionale Einheit",
    commonUses: "Landwirtschaftliche Flächen in der Türkei und im Nahen Osten",
  },
  dekar: {
    name: "Dekar",
    slug: "dekar",
    categoryName: "Fläche",
    shortDescription:
      "Der Dekar ist eine regionale Flächeneinheit von 1000 Quadratmetern, verbreitet auf dem Balkan und im östlichen Mittelmeerraum.",
    historySummary:
      "Er leitet sich vom metrischen System ab und dient als lokale Alternative zum Dönüm in mehreren Nachbarregionen.",
    measurementSystem: "Außerhalb des SI, regionale Einheit",
    commonUses: "Landwirtschaftliche Flächen auf dem Balkan",
  },
  santimetrekup: {
    name: "Kubikzentimeter",
    slug: "kubikzentimeter",
    categoryName: "Volumen",
    shortDescription:
      "Der Kubikzentimeter ist eine kleine Volumeneinheit, die genau einem Milliliter entspricht.",
    historySummary:
      "Er wird häufig in der Medizin, Chemie und beim Hubraum von Fahrzeugmotoren verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Motorhubraum, medizinische Dosierungen und Laborarbeiten",
  },
  fitkup: {
    name: "Kubikfuß",
    slug: "kubikfuss",
    categoryName: "Volumen",
    shortDescription:
      "Der Kubikfuß ist eine traditionelle Volumeneinheit, die im Bauwesen und bei US-amerikanischen Klimaanlagen verwendet wird.",
    historySummary:
      "Er ist ein gängiger Standard in Spezifikationen für Klima- und Lüftungsanlagen in den USA.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Klimatechnik und Bauwesenberechnungen",
  },
  inckup: {
    name: "Kubikzoll",
    slug: "kubikzoll",
    categoryName: "Volumen",
    shortDescription:
      "Der Kubikzoll ist eine kleine traditionelle Volumeneinheit, die zur Angabe des Hubraums alter US-Fahrzeugmotoren verwendet wird.",
    historySummary:
      "Er war historisch der Standard zur Klassifizierung klassischer amerikanischer Muscle-Car-Motoren.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "Klassifizierung klassischer US-amerikanischer Fahrzeugmotoren",
  },
  galon: {
    name: "Gallone",
    slug: "gallone",
    categoryName: "Volumen",
    shortDescription:
      "Gallone ist eine besonders in den Vereinigten Staaten zur Messung von Flüssigkeitsvolumen verwendete Einheit. Eine US-Gallone entspricht 3,78541 Litern.",
    historySummary:
      "Die von den USA verwendete Gallone beruht auf der mittelalterlichen englischen Handelstradition der 'Weingallone' und wurde 1706 unter Königin Anne exakt auf 231 Kubikzoll (3,785411784 L) festgelegt -- die USA übernahmen diese Definition offiziell 1836. Großbritannien schlug 1824 einen völlig anderen Weg ein und definierte seine eigene 'britische Gallone' (Imperial Gallon) neu als 'das Volumen, das dem Gewicht von 10 Pfund destilliertem Wasser entspricht' (etwa 4,546 L) und schaffte alle anderen Gallonendefinitionen ab. Aufgrund dieser unterschiedlichen historischen Entscheidungen ist die britische Gallone etwa 20 % größer als die US-Gallone.",
    measurementSystem: "US-amerikanisches Maßsystem (US Liquid Gallon)",
    commonUses: "Kraftstoffverbrauch, aus den USA stammende Flüssigproduktetiketten und Küchenmaße",
  },
  varil: {
    name: "Barrel",
    slug: "barrel",
    categoryName: "Volumen",
    shortDescription:
      "Das Barrel ist eine standardisierte Handelseinheit für Rohöl im internationalen Ölhandel.",
    historySummary:
      "Es wurde seit den Anfängen der amerikanischen Ölindustrie zum weltweiten Standard für den Rohölhandel.",
    measurementSystem: "Außerhalb des SI, internationale Handelseinheit",
    commonUses: "Weltweiter Rohölhandel und Energiemärkte",
  },
  okka: {
    name: "Okka",
    slug: "okka",
    categoryName: "Masse",
    shortDescription:
      "Die Okka war eine osmanische Masseeinheit, die im Alltag und Handel weit verbreitet war.",
    historySummary:
      "Bis zur Einführung des metrischen Systems im 20. Jahrhundert war die Okka die Standardeinheit für Gewicht im Osmanischen Reich.",
    measurementSystem: "Außerhalb des SI, historische osmanische Einheit",
    commonUses: "Historischer Handel und osmanische Marktforschung",
  },
  dirhem: {
    name: "Dirham",
    slug: "dirham",
    categoryName: "Masse",
    shortDescription:
      "Das Dirham war eine kleinere osmanische Masseeinheit, die vor allem für Edelmetalle und Gewürze verwendet wurde.",
    historySummary:
      "Es war eine Untereinheit der Okka und diente zur präzisen Angabe kleinerer Gewichte im osmanischen Handel.",
    measurementSystem: "Außerhalb des SI, historische osmanische Einheit",
    commonUses: "Historischer Edelmetall- und Gewürzhandel",
  },
  "bizans-litrasi": {
    name: "Byzantinische Litra",
    slug: "byzantinische-litra",
    categoryName: "Masse",
    shortDescription:
      "Die byzantinische Litra war eine Masseeinheit im Byzantinischen Reich, vergleichbar mit einem römischen Pfund.",
    historySummary:
      "Sie wurde im byzantinischen Handel und in der Goldschmiedekunst vor der osmanischen Eroberung verwendet.",
    measurementSystem: "Außerhalb des SI, byzantinische historische Einheit",
    commonUses: "Byzantinischer Handel und historische Forschung",
  },
  "bizans-onsu": {
    name: "Byzantinische Ounkia",
    slug: "byzantinische-ounkia",
    categoryName: "Masse",
    shortDescription:
      "Die Ounkia war eine kleine byzantinische Masseeinheit, ein Zwölftel einer byzantinischen Litra.",
    historySummary:
      "Sie diente im byzantinischen Alltagshandel zum Abwiegen kleinerer Mengen.",
    measurementSystem: "Außerhalb des SI, byzantinische historische Einheit",
    commonUses: "Byzantinischer Alltagshandel und historische Forschung",
  },
  "kilogram-metrekup": {
    name: "Kilogramm pro Kubikmeter",
    slug: "kilogramm-kubikmeter",
    categoryName: "Dichte",
    shortDescription:
      "Kilogramm pro Kubikmeter ist die SI-Basiseinheit der Dichte und gibt die Masse pro Volumen an.",
    historySummary:
      "Sie ist die international standardisierte Bezugsgröße für Dichteangaben in Wissenschaft und Technik.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Materialkunde, Physik und technische Berechnungen",
  },
  "gram-santimetrekup": {
    name: "Gramm pro Kubikzentimeter",
    slug: "gramm-kubikzentimeter",
    categoryName: "Dichte",
    shortDescription:
      "Gramm pro Kubikzentimeter ist eine gebräuchliche praktische Einheit zur Angabe der Dichte in Chemie und Labor.",
    historySummary:
      "Sie wird häufig verwendet, weil sie für die Dichte gängiger Materialien wie Wasser oder Metalle handliche Zahlenwerte liefert.",
    measurementSystem: "Metrisches System (SI-Untereinheiten)",
    commonUses: "Chemie, Materialkunde und Laborarbeiten",
  },
  knot: {
    name: "Knoten",
    slug: "knoten",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Der Knoten ist eine Geschwindigkeitseinheit für die Schifffahrts- und Luftfahrtnavigation, gleich einer Seemeile pro Stunde.",
    historySummary:
      "Der Name stammt von einer historischen Methode, die Schiffsgeschwindigkeit mit einem geknoteten Seil hinter dem Schiff zu messen.",
    measurementSystem: "Außerhalb des SI, internationale Navigationseinheit",
    commonUses: "Schifffahrts- und Luftfahrtnavigation sowie Windgeschwindigkeitsangaben",
  },
  "isik-hizi": {
    name: "Lichtgeschwindigkeit",
    slug: "lichtgeschwindigkeit",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Die Lichtgeschwindigkeit (c) ist die Ausbreitungsgeschwindigkeit elektromagnetischer Wellen (einschließlich Licht) im Vakuum und eine der grundlegendsten physikalischen Konstanten des Universums. Ihr Wert beträgt exakt 299.792.458 m/s.",
    historySummary:
      "Die ersten wissenschaftlichen Messungen der Lichtgeschwindigkeit reichen bis ins 17. Jahrhundert zu Ole Rømer zurück. Da die offizielle SI-Definition des Meters seit 1983 auf der Strecke beruht, die Licht im Vakuum in einer bestimmten Zeit zurücklegt, gilt der Wert der Lichtgeschwindigkeit heute per Definition als exakt (konstant) und nicht mehr als gemessener Wert.",
    measurementSystem: "Internationales Einheitensystem (SI, fundamentale physikalische Konstante)",
    commonUses: "Physikalische und astronomische Berechnungen, Relativitätstheorie, GPS- und Satellitenkommunikationssysteme",
  },
  "metre-saniyekare": {
    name: "Meter pro Sekundequadrat",
    slug: "meter-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Meter pro Sekundequadrat ist die SI-Basiseinheit der Beschleunigung.",
    historySummary:
      "Sie ist die international standardisierte Einheit für Beschleunigungsangaben in Physik und Technik.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Physik, Fahrzeugtechnik und wissenschaftliche Berechnungen",
  },
  "fit-saniyekare": {
    name: "Fuß pro Sekundequadrat",
    slug: "fuss-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Fuß pro Sekundequadrat ist eine imperiale Beschleunigungseinheit, die vor allem in den USA verwendet wird.",
    historySummary:
      "Sie wird in der US-amerikanischen Technik und Luftfahrt anstelle der metrischen Einheit genutzt.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Technik und Luftfahrtberechnungen",
  },
  "yercekimi-ivmesi": {
    name: "Erdbeschleunigung (g)",
    slug: "erdbeschleunigung",
    categoryName: "Beschleunigung",
    shortDescription:
      "Die Erdbeschleunigung ist die Standardbeschleunigung, die ein frei fallender Körper nahe der Erdoberfläche erfährt.",
    historySummary:
      "Der Standardwert 9,80665 m/s² wurde international festgelegt und wird häufig als praktische Vergleichseinheit für Beschleunigung genutzt.",
    measurementSystem: "Internationales Einheitensystem (SI, Standardkonstante)",
    commonUses: "Physik, Raumfahrt und technische Beschleunigungsvergleiche",
  },
  gun: {
    name: "Tag",
    slug: "tag",
    categoryName: "Zeit",
    shortDescription:
      "Der Tag ist eine gebräuchliche Zeiteinheit, die der Zeit einer vollständigen Erdrotation entspricht.",
    historySummary:
      "Er ist eine der ältesten von Menschen genutzten Zeiteinheiten und bildet die Grundlage von Kalendern weltweit.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Zeiteinheit",
    commonUses: "Kalender, Alltagsplanung und Zeitrechnung",
  },
  "radyan-saniye": {
    name: "Radiant pro Sekunde",
    slug: "radiant-pro-sekunde",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Radiant pro Sekunde ist die SI-Basiseinheit der Winkelgeschwindigkeit.",
    historySummary:
      "Sie wird in Physik und Maschinenbau zur präzisen Beschreibung von Rotationsbewegungen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Maschinenbau, Robotik und Rotationsphysik",
  },
  "devir-dakika": {
    name: "Umdrehungen pro Minute (U/min)",
    slug: "umdrehungen-pro-minute",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Umdrehungen pro Minute ist die im Alltag gebräuchliche Einheit für Motor- und Rotationsdrehzahlen.",
    historySummary:
      "Sie ist der Standard auf Drehzahlmessern von Motoren, Festplatten und Maschinen.",
    measurementSystem: "Außerhalb des SI, gebräuchliche technische Einheit",
    commonUses: "Motordrehzahlen, Maschinenbau und Festplattenspezifikationen",
  },
  "derece-saniye": {
    name: "Grad pro Sekunde",
    slug: "grad-pro-sekunde",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Grad pro Sekunde ist eine anschauliche Einheit der Winkelgeschwindigkeit, die auf dem Gradmaß basiert.",
    historySummary:
      "Sie wird häufig in Robotik, Sensorik und Animationen verwendet, da Gradangaben intuitiver sind als Radiant.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Einheit",
    commonUses: "Robotik, Sensortechnik und Animationsberechnungen",
  },
  radyan: {
    name: "Radiant",
    slug: "radiant",
    categoryName: "Winkel",
    shortDescription:
      "Radiant (rad) ist die SI-Einheit des Winkels. Es ist definiert als der Winkel, den ein Kreisbogen mit einer Länge gleich dem Radius im Mittelpunkt eines Kreises bildet.",
    historySummary:
      "Der Begriff 'Radiant' wurde erstmals 1873 vom schottischen Physiker James Thomson (Bruder des berühmten Lord Kelvin) in Prüfungsunterlagen des Queen's College Belfast verwendet; man vermutet, dass er sich aus der Verbindung der Wörter 'Radius' und 'Angle' (Winkel) ableitet. Der mathematische Vorteil des Radianten liegt darin, dass Ableitungen und Integrale trigonometrischer Funktionen (etwa die Ableitung von Sinus zu Kosinus) nur dann ohne zusätzliche Konstante einfach bleiben, wenn der Winkel in Radiant ausgedrückt wird -- deshalb wurde Radiant, trotz der Verbreitung des Grads, als abgeleitete SI-Winkeleinheit übernommen.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Trigonometrie, technische Berechnungen, Formeln für Winkelgeschwindigkeit und -beschleunigung",
  },
  derece: {
    name: "Grad",
    slug: "grad",
    categoryName: "Winkel",
    shortDescription:
      "Grad (°) ist die im Alltag gebräuchlichste Winkeleinheit und ergibt sich aus der Teilung eines Vollkreises in 360 gleiche Teile.",
    historySummary:
      "Der Vollkreis von 360 Grad geht auf das sexagesimale (60er-)Zahlensystem des antiken Babylon zurück; die Zahl 360 wurde vermutlich gewählt, weil sie durch viele Zahlen wie 2, 3, 4, 5, 6, 8, 9, 10 und 12 teilbar ist, was die Aufteilung von Winkeln in praktische Brüche erleichtert. Auch die Nähe von 360 zur babylonischen Kalenderjahreslänge von etwa 360 Tagen gilt als historischer Einfluss. Dieses System wurde über griechische Astronomen (besonders Hipparchos) an die westliche Wissenschaft weitergegeben und ist bis heute unverändert in Gebrauch.",
    measurementSystem: "Nicht-SI-Einheit, weltweit gebräuchlich",
    commonUses: "Navigation, Geografie (Breiten-/Längengrad), technisches Zeichnen, alltägliche Winkelmessungen",
  },
  gradyan: {
    name: "Gon",
    slug: "gon",
    categoryName: "Winkel",
    shortDescription:
      "Gon (auch Neugrad) ist eine mit dem Dezimalsystem kompatible Winkeleinheit, die einen Vollkreis in 400 gleiche Teile unterteilt.",
    historySummary:
      "Gon ist ein Ergebnis der nach der Französischen Revolution gemeinsam mit dem metrischen System vorgeschlagenen 'Dezimalisierungsbewegung', die darauf abzielte, alle Maßeinheiten auf Zehnerpotenzen zu stützen; es unterteilt einen rechten Winkel in genau 100 Gon und bietet damit ein 'dezimalfreundlicheres' System als Grad. Obwohl es sich nie so weit wie das Grad verbreitete, wird es aufgrund seiner rechnerischen Vorteile im Dezimalsystem bis heute in der Geodäsie und Landvermessung mancher europäischer Länder, allen voran Frankreich, verwendet.",
    measurementSystem: "Nicht-SI-Einheit, Dezimalsystemeinheit",
    commonUses: "Geodäsie, Landvermessung, manche europäische technische Anwendungen",
  },
  "tam-tur": {
    name: "Vollwinkel",
    slug: "vollwinkel",
    categoryName: "Winkel",
    shortDescription:
      "Der Vollwinkel entspricht einer vollständigen Umdrehung um einen Punkt, also genau 360 Grad.",
    historySummary:
      "Er ist eine anschauliche Winkeleinheit zur Beschreibung einer oder mehrerer vollständiger Umdrehungen um eine Achse.",
    measurementSystem: "Außerhalb des SI, praktische Einheit",
    commonUses: "Beschreibung vollständiger mechanischer Umdrehungen",
  },
  hertz: {
    name: "Hertz",
    slug: "hertz",
    categoryName: "Frequenz",
    shortDescription:
      "Hertz (Hz) ist die SI-Einheit der Frequenz. Sie gibt an, wie oft sich ein Ereignis pro Sekunde wiederholt.",
    historySummary:
      "Die Einheit ist nach dem deutschen Physiker Heinrich Rudolf Hertz (1857-1894) benannt, der als Erster die Existenz elektromagnetischer Wellen experimentell zweifelsfrei nachwies. Der Name 'Hertz' wurde erstmals 1935 von der Internationalen Elektrotechnischen Kommission (IEC) festgelegt; 1960 erkannte die Generalkonferenz für Maß und Gewicht ihn als offizielle SI-Einheit an. Zuvor wurde Frequenz als 'Zyklen pro Sekunde' (cycles per second, cps) und in Vielfachen (Kilocycles, Megacycles) angegeben -- der Übergang von dieser älteren Terminologie zu 'Hertz' setzte sich in der populären Presse erst Ende der 1960er-Jahre durch.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Schallwellen, Frequenz des elektrischen Stroms, Computerprozessorgeschwindigkeit, Radiowellen",
  },
  kilohertz: {
    name: "Kilohertz",
    slug: "kilohertz",
    categoryName: "Frequenz",
    shortDescription:
      "Das Kilohertz entspricht 1000 Hertz und wird für mittlere Frequenzbereiche wie Audiosignale verwendet.",
    historySummary:
      "Es ist die gebräuchliche Einheit zur Angabe von Radiofrequenzen und Audioabtastraten.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Radiofrequenzen und Audiotechnik",
  },
  megahertz: {
    name: "Megahertz",
    slug: "megahertz",
    categoryName: "Frequenz",
    shortDescription:
      "Das Megahertz entspricht einer Million Hertz und wird für Funk- und Prozessorfrequenzen verwendet.",
    historySummary:
      "Es ist der Standard zur Angabe von Rundfunkfrequenzen und älteren Computerprozessortakten.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Rundfunkfrequenzen und Prozessortechnik",
  },
  gigahertz: {
    name: "Gigahertz",
    slug: "gigahertz",
    categoryName: "Frequenz",
    shortDescription:
      "Das Gigahertz entspricht einer Milliarde Hertz und ist die gebräuchliche Einheit für moderne Prozessortakte.",
    historySummary:
      "Es ist der Standard zur Angabe der Taktfrequenz moderner Computerprozessoren und drahtloser Kommunikationssysteme.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Prozessortechnik und drahtlose Kommunikation",
  },
  newton: {
    name: "Newton",
    slug: "newton",
    categoryName: "Kraft",
    shortDescription:
      "Newton (N) ist die abgeleitete Einheit der Kraft im Internationalen Einheitensystem. Sie entspricht der Kraft, die einer Masse von 1 kg eine Beschleunigung von 1 m/s² verleiht.",
    historySummary:
      "Die Einheit Newton ist nach Isaac Newtons zweitem Bewegungsgesetz benannt, zusammengefasst als F=ma (Kraft = Masse × Beschleunigung). Die Standardisierung erfolgte in zwei Schritten: 1946 definierte die Generalkonferenz für Maß und Gewicht im MKS-System (Meter-Kilogramm-Sekunde) die Krafteinheit als 'die Kraft, die einer Masse von 1 Kilogramm eine Beschleunigung von 1 m/s² verleiht'; 1948 erhielt diese Einheit auf der 9. Tagung der Konferenz offiziell den Namen 'Newton'. Das MKS-System bildete später die Grundlage des heutigen SI-Systems.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Maschinenbau, statische und dynamische Berechnungen, Materialfestigkeitsprüfungen",
  },
  "kilogram-kuvvet": {
    name: "Kilogramm-Kraft",
    slug: "kilogramm-kraft",
    categoryName: "Kraft",
    shortDescription:
      "Kilogramm-Kraft ist eine traditionelle Krafteinheit, die der Gewichtskraft eines Kilogramms unter Standardschwerkraft entspricht.",
    historySummary:
      "Sie wurde vor der vollständigen Vereinheitlichung des SI-Systems verwendet und findet sich noch in älteren technischen Angaben.",
    measurementSystem: "Außerhalb des SI, traditionelle Einheit",
    commonUses: "Ältere technische Spezifikationen und Ingenieurwesen",
  },
  "newton-metre": {
    name: "Newtonmeter",
    slug: "newtonmeter",
    categoryName: "Drehmoment",
    shortDescription:
      "Das Newtonmeter ist die SI-Einheit des Drehmoments und wird bei Schraubverbindungen und Motoren verwendet.",
    historySummary:
      "Es ist der internationale Standard für Drehmomentangaben in Technik und Fahrzeugbau.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Fahrzeugtechnik, Schraubverbindungen und Maschinenbau",
  },
  "kilogram-kuvvet-metre": {
    name: "Kilogramm-Kraft-Meter",
    slug: "kilogramm-kraft-meter",
    categoryName: "Drehmoment",
    shortDescription:
      "Kilogramm-Kraft-Meter (kgf·m, gebräuchlich auch als 'kgm' abgekürzt) ist eine traditionelle Einheit außerhalb des SI zur Angabe von Drehmoment. Sie findet sich besonders in älteren technischen Motorunterlagen anstelle des Newtonmeters.",
    historySummary:
      "Kilogramm-Kraft-Meter war vor dem SI-System in der europäischen Ingenieurpraxis eine gebräuchliche Drehmomenteinheit; obwohl sie heute weitgehend durch das Newtonmeter abgelöst wurde, begegnet man ihr noch in alten Fahrzeugmotor-Spezifikationen und auf manchen Drehmomentschlüssel-Anzeigen.",
    measurementSystem: "Traditionelle, auf der Erdanziehung beruhende Einheit außerhalb des SI",
    commonUses: "Ältere Motordrehmoment-Spezifikationen, Drehmomentschlüssel, technische Altdokumente",
  },
  "pound-fit": {
    name: "Pfund-Fuß",
    slug: "pfund-fuss",
    categoryName: "Drehmoment",
    shortDescription:
      "Pfund-Fuß ist eine imperiale Drehmomenteinheit, die vor allem in den USA für Motoren und Werkzeuge verwendet wird.",
    historySummary:
      "Sie ist der Standard bei Drehmomentangaben in US-amerikanischen Fahrzeug- und Werkzeugspezifikationen.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Fahrzeugtechnik und Werkzeuge",
  },
  "kilogram-metre-saniye": {
    name: "Kilogramm-Meter/Sekunde",
    slug: "kilogramm-meter-sekunde",
    categoryName: "Impuls",
    shortDescription:
      "Kilogramm-Meter pro Sekunde ist die SI-Einheit des Impulses in der klassischen Mechanik.",
    historySummary:
      "Sie wird in physikalischen Berechnungen zur Beschreibung von Bewegungsgrößen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Physik und Mechanikberechnungen",
  },
  "newton-saniye": {
    name: "Newtonsekunde",
    slug: "newtonsekunde",
    categoryName: "Impuls",
    shortDescription:
      "Die Newtonsekunde ist eine alternative Einheit des Impulses, äquivalent zu Kilogramm-Meter pro Sekunde.",
    historySummary:
      "Sie wird verwendet, um den Zusammenhang zwischen Kraft, Zeit und Impulsänderung darzustellen.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Physik und Stoßprozessberechnungen",
  },
  milibar: {
    name: "Millibar",
    slug: "millibar",
    categoryName: "Druck",
    shortDescription:
      "Das Millibar ist eine in der Meteorologie gebräuchliche Druckeinheit zur Angabe des Luftdrucks.",
    historySummary:
      "Es ist die Standardeinheit in weltweiten Wetterberichten zur Beschreibung von Luftdrucksystemen.",
    measurementSystem: "Außerhalb des SI, gebräuchliche meteorologische Einheit",
    commonUses: "Wetterberichte und Wetterkarten",
  },
  atmosfer: {
    name: "Atmosphäre",
    slug: "atmosphaere",
    categoryName: "Druck",
    shortDescription:
      "Die Atmosphäre ist eine Druckeinheit, die auf einem Referenzwert nahe dem mittleren Luftdruck der Erdatmosphäre auf Meereshöhe beruht. Sie wird auch als Standardatmosphäre bezeichnet.",
    historySummary:
      "Die Einheit Atmosphäre verbreitete sich, da barometrische Messungen und der Referenzdruck auf Meereshöhe in Technik und Wissenschaft als Standardvergleichspunkt dienten. 1954 definierte die 10. Generalkonferenz für Maß und Gewicht (CGPM) die Standardatmosphäre exakt auf 101.325 Pa.",
    measurementSystem: "Referenzeinheit außerhalb des SI, in Meteorologie und Technik gebräuchlich",
    commonUses: "Referenzbedingungen, Meteorologie, Vakuum- und Druckmessungen",
  },
  "kilogram-kuvvet-santimetrekare": {
    name: "Kilogramm-Kraft pro Quadratzentimeter",
    slug: "kilogramm-kraft-pro-quadratzentimeter",
    categoryName: "Druck",
    shortDescription:
      "Kilogramm-Kraft pro Quadratzentimeter ist eine traditionelle Druckeinheit, die in älteren Reifendruck- und Geräteangaben vorkommt.",
    historySummary:
      "Sie wurde vor der vollständigen Vereinheitlichung des SI-Systems verwendet und ist noch in älteren Manometern zu finden.",
    measurementSystem: "Außerhalb des SI, traditionelle Einheit",
    commonUses: "Ältere Reifendruckmesser und Industriegeräte",
  },
  "pascal-saniye": {
    name: "Pascalsekunde",
    slug: "pascalsekunde",
    categoryName: "Viskosität",
    shortDescription:
      "Pascalsekunde (Pa·s) ist die abgeleitete SI-Einheit der dynamischen Viskosität. Sie beschreibt den Fließwiderstand eines Fluids.",
    historySummary:
      "Pascalsekunde ist eine kohärente abgeleitete Einheit des SI-Systems -- sie ergibt sich direkt aus der Multiplikation der Druckeinheit Pascal mit der Zeiteinheit Sekunde, ohne zusätzlichen Umrechnungsfaktor. Trotzdem bevorzugt die Industrie in der Praxis weiterhin die ältere, aus dem CGS-System stammende Einheit Poise beziehungsweise Centipoise -- vor allem, weil die Viskosität von Wasser bei Raumtemperatur in Centipoise einem leicht zu merkenden Wert (etwa 1 cP) entspricht, während derselbe Wert in Pascalsekunde mit 0,001 eine weniger anschauliche Zahl ergibt.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Strömungsmechanik, Berechnung der Reynolds-Zahl, Rohrleitungsauslegung und Fluidcharakterisierung",
  },
  santipoise: {
    name: "Centipoise",
    slug: "centipoise",
    categoryName: "Viskosität",
    shortDescription:
      "Das Centipoise ist die in der Industrie am häufigsten verwendete praktische Einheit der dynamischen Viskosität.",
    historySummary:
      "Es entspricht der Viskosität von Wasser bei etwa 20 °C und ist deshalb ein anschaulicher Referenzwert.",
    measurementSystem: "CGS-System (außerhalb des SI, Untereinheit)",
    commonUses: "Motorölklassifizierung und industrielle Flüssigkeiten",
  },
  "metrekare-saniye": {
    name: "Quadratmeter pro Sekunde",
    slug: "quadratmeter-pro-sekunde",
    categoryName: "Kinematische Viskosität",
    shortDescription:
      "Quadratmeter pro Sekunde ist die SI-Basiseinheit der kinematischen Viskosität.",
    historySummary:
      "Sie wird in wissenschaftlichen Berechnungen zur Beschreibung des Fließverhaltens von Flüssigkeiten verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Strömungsmechanik und wissenschaftliche Berechnungen",
  },
  santistok: {
    name: "Zentistokes",
    slug: "zentistokes",
    categoryName: "Kinematische Viskosität",
    shortDescription:
      "Das Zentistokes ist die in der Industrie gebräuchlichste praktische Einheit der kinematischen Viskosität.",
    historySummary:
      "Es entspricht 1 mm²/s und wurde zum Standard bei der Klassifizierung von Motorölen.",
    measurementSystem: "CGS-System (außerhalb des SI, Untereinheit)",
    commonUses: "Motorölklassifizierung, Kraftstoffeigenschaften und Industrieflüssigkeiten",
  },
  "metrekup-saniye": {
    name: "Kubikmeter pro Sekunde",
    slug: "kubikmeter-pro-sekunde",
    categoryName: "Volumenstrom",
    shortDescription:
      "Kubikmeter pro Sekunde ist die SI-Basiseinheit des Volumenstroms.",
    historySummary:
      "Sie wird in der Ingenieurtechnik zur Beschreibung großer Durchflussmengen verwendet, etwa bei Flüssen oder Rohrleitungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Wasserwirtschaft, Rohrleitungstechnik und Ingenieurwesen",
  },
  "fitkup-dakika": {
    name: "Kubikfuß pro Minute (CFM)",
    slug: "kubikfuss-pro-minute",
    categoryName: "Volumenstrom",
    shortDescription:
      "Kubikfuß pro Minute (CFM) ist die in den USA gebräuchliche Einheit für den Luftdurchsatz von Lüftungs- und Klimaanlagen.",
    historySummary:
      "Sie ist der Standard in amerikanischen Spezifikationen für Ventilatoren und Klimatechnik.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Lüftungs- und Klimatechnik",
  },
  "galon-dakika": {
    name: "Gallonen pro Minute (GPM)",
    slug: "gallonen-pro-minute",
    categoryName: "Volumenstrom",
    shortDescription:
      "Gallonen pro Minute (GPM) ist die in den USA gebräuchliche Einheit für den Durchfluss von Pumpen und Wasserleitungen.",
    historySummary:
      "Sie ist der Standard in amerikanischen Spezifikationen für Pumpen, Bewässerung und Sanitärtechnik.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Pumpen-, Bewässerungs- und Sanitärtechnik",
  },
  "kilogram-saniye": {
    name: "Kilogramm pro Sekunde",
    slug: "kilogramm-pro-sekunde",
    categoryName: "Massenstrom",
    shortDescription:
      "Kilogramm pro Sekunde ist die SI-Basiseinheit des Massenstroms.",
    historySummary:
      "Sie wird in der Verfahrenstechnik zur Beschreibung des Massendurchsatzes in Prozessen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Verfahrenstechnik und industrielle Prozessberechnungen",
  },
  "kilogram-saat": {
    name: "Kilogramm pro Stunde",
    slug: "kilogramm-pro-stunde",
    categoryName: "Massenstrom",
    shortDescription:
      "Kilogramm pro Stunde ist eine praktische Einheit des Massenstroms für industrielle Anwendungen.",
    historySummary:
      "Sie wird häufig in Produktionsprozessen verwendet, in denen stündliche Durchsatzraten relevant sind.",
    measurementSystem: "Metrisches System (SI-abgeleitete praktische Einheit)",
    commonUses: "Produktionsprozesse und industrielle Durchsatzangaben",
  },
  kilojoule: {
    name: "Kilojoule",
    slug: "kilojoule",
    categoryName: "Energie",
    shortDescription:
      "Das Kilojoule entspricht 1000 Joule und wird häufig zur Angabe des Energiegehalts von Lebensmitteln verwendet.",
    historySummary:
      "In vielen Ländern ist es die offizielle Einheit auf Nährwertkennzeichnungen anstelle der Kalorie.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Nährwertkennzeichnung und Energieberechnungen",
  },
  "watt-saat": {
    name: "Wattstunde",
    slug: "wattstunde",
    categoryName: "Energie",
    shortDescription:
      "Die Wattstunde ist eine praktische Energieeinheit, die die bei einer Leistung von einem Watt über eine Stunde verbrauchte Energie angibt.",
    historySummary:
      "Sie ist die Grundlage der größeren Kilowattstunde, die auf Stromrechnungen verwendet wird.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Handelseinheit",
    commonUses: "Kleine Batteriekapazitäten und tragbare elektronische Geräte",
  },
  kalori: {
    name: "Kalorie",
    slug: "kalorie",
    categoryName: "Energie",
    shortDescription:
      "Kalorie (cal) ist eine Energieeinheit außerhalb des SI, definiert als die Energiemenge, die nötig ist, um die Temperatur von 1 Gramm Wasser um 1 °C zu erhöhen. Nach der thermochemischen Definition entspricht 1 Kalorie 4,184 Joule.",
    historySummary:
      "Der Begriff Kalorie wurde im 19. Jahrhundert vom französischen Chemiker Nicolas Clément zur Messung von Wärmemengen eingeführt und verbreitete sich während der Entwicklung der Thermodynamik. Obwohl die SI-Einheit Joule sie heute weitgehend ersetzt hat, wird sie in der Ernährungswissenschaft (als Kilokalorie) weiterhin häufig verwendet.",
    measurementSystem: "Traditionelle Energieeinheit außerhalb des SI",
    commonUses: "Chemische und thermodynamische Berechnungen, Lebensmittelenergie (über die Kilokalorie)",
  },
  kilokalori: {
    name: "Kilokalorie",
    slug: "kilokalorie",
    categoryName: "Energie",
    shortDescription:
      "Kilokalorie (kcal) ist eine Energieeinheit, die 1000 Kalorien entspricht. Der auf Lebensmitteletiketten und in Ernährungsangaben angegebene Wert 'Kalorien' ist meist tatsächlich eine Kilokalorie (manchmal auch als 'große Kalorie', mit großem K, bezeichnet).",
    historySummary:
      "Mit der Entwicklung der Ernährungswissenschaft zeigte sich, dass die kleine Kalorie zur Angabe des Energiegehalts von Lebensmitteln unpraktisch war; stattdessen setzte sich die tausendfach größere Kilokalorie als Standard durch. Auch die heutigen Lebensmittelkennzeichnungsvorschriften beruhen auf dieser Einheit.",
    measurementSystem: "Traditionelle Energieeinheit außerhalb des SI",
    commonUses: "Lebensmitteletiketten, Diät- und Ernährungsberechnungen, täglicher Kalorienbedarf",
  },
  btu: {
    name: "BTU",
    slug: "btu",
    categoryName: "Energie",
    shortDescription:
      "Die British Thermal Unit (BTU) ist eine traditionelle Energieeinheit, die vor allem bei Heiz- und Klimageräten in den USA verwendet wird.",
    historySummary:
      "Sie ist der Standard in amerikanischen Spezifikationen für Klimaanlagen und Heizsysteme.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Klima- und Heizsystemspezifikationen",
  },
  beygirgucu: {
    name: "PS",
    slug: "ps",
    categoryName: "Leistung",
    shortDescription:
      "Die Pferdestärke (PS) ist eine traditionelle Leistungseinheit, die vor allem in der europäischen Fahrzeugtechnik verwendet wird.",
    historySummary:
      "Sie wurde ursprünglich entwickelt, um die Leistung von Dampfmaschinen mit der Zugkraft von Pferden zu vergleichen.",
    measurementSystem: "Metrisches System (außerhalb des SI)",
    commonUses: "Europäische Fahrzeug- und Motorspezifikationen",
  },
  "beygirgucu-mekanik": {
    name: "PS (mechanisch)",
    slug: "ps-mechanisch",
    categoryName: "Leistung",
    shortDescription:
      "Die mechanische PS ist eine britisch-amerikanische Leistungseinheit, die sich geringfügig von der metrischen PS unterscheidet.",
    historySummary:
      "Sie wurde ursprünglich von James Watt definiert und wird in der US-amerikanischen und britischen Fahrzeugtechnik anstelle der metrischen PS verwendet.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische und britische Fahrzeug- und Motorspezifikationen",
  },
  "watt-metre-kelvin": {
    name: "Watt pro Meter-Kelvin",
    slug: "watt-pro-meter-kelvin",
    categoryName: "Wärmeleitfähigkeit",
    shortDescription:
      "Watt pro Meter-Kelvin ist die SI-Einheit der Wärmeleitfähigkeit von Materialien.",
    historySummary:
      "Sie wird in der Bauphysik und Materialwissenschaft zur Bewertung der Dämmeigenschaften von Baustoffen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Bauphysik, Dämmstoffe und Materialwissenschaft",
  },
  "btu-saat-fit-f": {
    name: "BTU pro Stunde-Fuß-°F",
    slug: "btu-pro-stunde-fuss-f",
    categoryName: "Wärmeleitfähigkeit",
    shortDescription:
      "BTU pro Stunde-Fuß-Grad Fahrenheit ist die in den USA gebräuchliche Einheit der Wärmeleitfähigkeit.",
    historySummary:
      "Sie wird in amerikanischen Baunormen anstelle der metrischen Einheit verwendet.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "US-amerikanische Baunormen und Dämmstoffspezifikationen",
  },
  "watt-metrekare": {
    name: "Watt pro Quadratmeter",
    slug: "watt-pro-quadratmeter",
    categoryName: "Wärmestromdichte",
    shortDescription:
      "Watt pro Quadratmeter ist die SI-Einheit der Wärmestromdichte, also der Wärmeleistung pro Fläche.",
    historySummary:
      "Sie wird in der Bauphysik und Solartechnik zur Beschreibung von Energieflüssen durch Flächen verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Bauphysik, Solartechnik und Energieflussberechnungen",
  },
  "kilowatt-metrekare": {
    name: "Kilowatt pro Quadratmeter",
    slug: "kilowatt-pro-quadratmeter",
    categoryName: "Wärmestromdichte",
    shortDescription:
      "Kilowatt pro Quadratmeter ist eine größere Einheit der Wärmestromdichte für intensivere Energieflüsse.",
    historySummary:
      "Sie wird in industriellen Anwendungen verwendet, in denen hohe Wärmeleistungen pro Fläche auftreten.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Industrielle Wärmetechnik und Solaranlagen",
  },
  "joule-kilogram-kelvin": {
    name: "Joule pro Kilogramm-Kelvin",
    slug: "joule-pro-kilogramm-kelvin",
    categoryName: "Spezifische Wärmekapazität",
    shortDescription:
      "Joule pro Kilogramm-Kelvin ist die SI-Einheit der spezifischen Wärmekapazität von Materialien.",
    historySummary:
      "Sie gibt an, wie viel Energie nötig ist, um ein Kilogramm eines Stoffes um ein Kelvin zu erwärmen.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Materialwissenschaft und thermodynamische Berechnungen",
  },
  "kalori-gram-kelvin": {
    name: "Kalorie pro Gramm-Kelvin",
    slug: "kalorie-pro-gramm-kelvin",
    categoryName: "Spezifische Wärmekapazität",
    shortDescription:
      "Kalorie pro Gramm-Kelvin ist eine traditionelle Einheit der spezifischen Wärmekapazität.",
    historySummary:
      "Sie wurde vor der vollständigen Umstellung auf das SI-System in Chemie und Physik verwendet.",
    measurementSystem: "Außerhalb des SI, traditionelle Einheit",
    commonUses: "Chemie und ältere thermodynamische Berechnungen",
  },
  ohm: {
    name: "Ohm",
    slug: "ohm",
    categoryName: "Elektrischer Widerstand",
    shortDescription:
      "Ohm (Ω) ist die SI-Einheit des elektrischen Widerstands. Sie gibt an, wie stark ein Stromkreis dem Stromfluss entgegenwirkt.",
    historySummary:
      "Ohm ist nach dem deutschen Physiker Georg Simon Ohm (1789-1854) benannt, der mit dem Ohmschen Gesetz den Zusammenhang zwischen Spannung, Stromstärke und Widerstand beschrieb. In den 1860er-Jahren schlug Werner Siemens einen reproduzierbaren, auf einer Quecksilbersäule beruhenden Widerstandsstandard vor; 1861 schlugen Latimer Clark und Charles Bright in einem Vortrag vor der British Association for the Advancement of Science Einheitennamen vor, die von berühmten Wissenschaftlern abgeleitet waren, darunter 'Ohma', 'Farad' und 'Volt'. Die Einheit wurde 1864 als 'B.A.-Einheit' oder 'Ohmad' und ab 1867 einfach als 'Ohm' bezeichnet. Am 21. September 1881 wurde auf dem Internationalen Elektrizitätskongress das 'praktische Ohm' offiziell definiert, auf den Kongressen von 1884 (Paris) und 1893 (Chicago) weiterentwickelt, und die endgültige internationale Anerkennung erfolgte 1908 auf einer Konferenz in London. 1948 löste die heutige absolute (exakte) Definition den Quecksilbersäulenstandard ab.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Schaltungsentwicklung, Widerstandsangaben, Berechnungen nach dem Ohmschen Gesetz und Auswahl elektronischer Bauteile",
  },
  kiloohm: {
    name: "Kiloohm",
    slug: "kiloohm",
    categoryName: "Elektrischer Widerstand",
    shortDescription:
      "Das Kiloohm entspricht 1000 Ohm und wird für mittlere Widerstandswerte in Schaltungen verwendet.",
    historySummary:
      "Es ist in der Elektronik eine gebräuchliche Einheit für Widerstände in typischen Schaltkreisen.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Elektronik und Schaltkreisdesign",
  },
  megaohm: {
    name: "Megaohm",
    slug: "megaohm",
    categoryName: "Elektrischer Widerstand",
    shortDescription:
      "Das Megaohm entspricht einer Million Ohm und wird für sehr hohe Widerstandswerte verwendet.",
    historySummary:
      "Es wird bei der Isolationswiderstandsmessung und in Hochpräzisionsschaltungen eingesetzt.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Isolationsmessungen und Hochpräzisionselektronik",
  },
  milivolt: {
    name: "Millivolt",
    slug: "millivolt",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Millivolt entspricht einem Tausendstel Volt und eignet sich für kleine Spannungswerte.",
    historySummary:
      "Mit der Entwicklung von Elektronik, Sensorik und Präzisionsinstrumenten wurde das Millivolt besonders wichtig.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektronik, Sensoren und Niedrigspannungsmessungen",
  },
  kiloamper: {
    name: "Kiloampere",
    slug: "kiloampere",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Kiloampere entspricht 1000 Ampere und wird zur Messung sehr großer elektrischer Ströme wie Kurzschluss- und Blitzströme verwendet.",
    historySummary:
      "Es wurde zum praktischen Standard in Energieverteilungssystemen und großen industriellen Elektroanlagen.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Kurzschlussstromberechnungen, Stromverteilungsanlagen und Blitzstromanalysen",
  },
  farad: {
    name: "Farad",
    slug: "farad",
    categoryName: "Kapazität",
    shortDescription:
      "Farad (F) ist die SI-Einheit der elektrischen Kapazität. Sie gibt an, wie viel elektrische Ladung ein Kondensator speichern kann.",
    historySummary:
      "Farad ist nach dem britischen Wissenschaftler Michael Faraday benannt; seine Entdeckung der elektromagnetischen Induktion 1831 bildet eine der Grundlagen der modernen Elektrotechnik. Der Einheitenname wurde 1861 von Latimer Clark und Charles Bright vorgeschlagen und 1881 auf dem Internationalen Elektrizitätskongress zusammen mit Volt und Ohm offiziell festgelegt. Da 1 Farad für alltägliche elektronische Bauteile eine extrem große Kapazität darstellt (selbst die Kapazität eines menschlichen Körpers liegt nur bei einigen hundert Pikofarad), werden Kondensatoren in der Praxis fast immer in deutlich kleineren Vielfachen wie Mikrofarad, Nanofarad oder Pikofarad angegeben.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Kondensatorkapazitätswerte, Schaltungsentwicklung und Energiespeicherberechnungen",
  },
  milifarad: {
    name: "Millifarad",
    slug: "millifarad",
    categoryName: "Kapazität",
    shortDescription:
      "Das Millifarad entspricht einem Tausendstel Farad und wird für größere Kondensatoren in Energieanwendungen verwendet.",
    historySummary:
      "Es wird in Leistungselektronik und größeren Energiespeicherkondensatoren eingesetzt.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Leistungselektronik und Energiespeicherkondensatoren",
  },
  mikrofarad: {
    name: "Mikrofarad",
    slug: "mikrofarad",
    categoryName: "Kapazität",
    shortDescription:
      "Das Mikrofarad entspricht einem Millionstel Farad und ist die gebräuchlichste Einheit für Kondensatoren im Alltag.",
    historySummary:
      "Die meisten handelsüblichen Kondensatoren in Elektronikgeräten werden in Mikrofarad angegeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektronikgeräte und Schaltungsdesign",
  },
  nanofarad: {
    name: "Nanofarad",
    slug: "nanofarad",
    categoryName: "Kapazität",
    shortDescription:
      "Das Nanofarad entspricht einem Milliardstel Farad und wird für kleine Kondensatoren in Hochfrequenzschaltungen verwendet.",
    historySummary:
      "Es ist grundlegend für das Design von Filter- und Hochfrequenzkommunikationsschaltungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Filterschaltungen und Hochfrequenzkommunikation",
  },
  pikofarad: {
    name: "Pikofarad",
    slug: "pikofarad",
    categoryName: "Kapazität",
    shortDescription:
      "Das Pikofarad entspricht einem Billionstel Farad und wird für die kleinsten Kondensatorwerte in Präzisionsschaltungen verwendet.",
    historySummary:
      "Es ist grundlegend für das Design präziser Hochfrequenzschaltungen wie Radio- und Funkkommunikation.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Radioschaltungen und drahtlose Kommunikation",
  },
  henry: {
    name: "Henry",
    slug: "henry",
    categoryName: "Induktivität",
    shortDescription:
      "Henry (H) ist die SI-Einheit der elektrischen Induktivität. Sie gibt an, wie viel Energie eine Spule in einem Magnetfeld speichern kann.",
    historySummary:
      "Henry ist nach dem US-amerikanischen Wissenschaftler Joseph Henry benannt, der 1832 das Phänomen der Selbstinduktion entdeckte -- nur ein Jahr, nachdem Michael Faraday in England die elektromagnetische Induktion unabhängig davon bekannt gegeben hatte. Obwohl es historisch eine Prioritätsdebatte darüber gab, wer zuerst entdeckte, wird die 'Induktion' meist mit Faraday in Verbindung gebracht, da er seine Ergebnisse zuerst veröffentlichte, während der Name Henry als Einheit verewigt wurde. Henry trug zudem mit der Entwicklung leistungsstarker Elektromagnete zur frühen Telegrafentechnik bei.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Spulen- und Transformatorenentwicklung, Filterschaltungen und Leistungselektronik",
  },
  milihenry: {
    name: "Millihenry",
    slug: "millihenry",
    categoryName: "Induktivität",
    shortDescription:
      "Das Millihenry entspricht einem Tausendstel Henry und wird für mittlere Induktivitätswerte verwendet.",
    historySummary:
      "Es ist in der Leistungselektronik und bei Netzteildrosseln eine gebräuchliche Einheit.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Leistungselektronik und Netzteildesign",
  },
  mikrohenry: {
    name: "Mikrohenry",
    slug: "mikrohenry",
    categoryName: "Induktivität",
    shortDescription:
      "Das Mikrohenry entspricht einem Millionstel Henry und wird für kleine Spulen in Hochfrequenzschaltungen verwendet.",
    historySummary:
      "Es ist grundlegend für das Design von Radio- und Hochfrequenzschaltungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Radioschaltungen und Hochfrequenztechnik",
  },
  coulomb: {
    name: "Coulomb",
    slug: "coulomb",
    categoryName: "Elektrische Ladung",
    shortDescription:
      "Coulomb (C) ist die SI-Einheit der elektrischen Ladung. Sie gibt die Gesamtmenge elektrischer Ladung an, die durch einen Stromkreis fließt.",
    historySummary:
      "Coulomb ist nach dem französischen Physiker Charles-Augustin de Coulomb benannt; Coulomb zeigte 1785 mit einer von ihm entwickelten präzisen Torsionswaage experimentell, dass die Anziehungs- beziehungsweise Abstoßungskraft zwischen zwei elektrischen Ladungen umgekehrt proportional zum Quadrat ihres Abstands ist (Coulombsches Gesetz) -- damit legte er die quantitative Grundlage der Elektrostatik. Die Einheit selbst wurde erst viel später, auf dem Internationalen Elektrizitätskongress 1881, offiziell festgelegt. Mit der SI-Revision 2019 wird Coulomb nicht mehr über eine indirekte Messung definiert, sondern über den exakt festgelegten Zahlenwert der Elementarladung (der Ladung des Elektrons).",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Berechnungen der Batteriekapazität, Messung elektrostatischer Ladung und Kondensatorladeberechnungen",
  },
  milicoulomb: {
    name: "Millicoulomb",
    slug: "millicoulomb",
    categoryName: "Elektrische Ladung",
    shortDescription:
      "Das Millicoulomb entspricht einem Tausendstel Coulomb und wird für mittlere Ladungswerte verwendet.",
    historySummary:
      "Es wird in der Batterietechnik und bei Kondensatorladungsberechnungen eingesetzt.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Batterietechnik und Kondensatorladungsberechnungen",
  },
  mikrocoulomb: {
    name: "Mikrocoulomb",
    slug: "mikrocoulomb",
    categoryName: "Elektrische Ladung",
    shortDescription:
      "Das Mikrocoulomb entspricht einem Millionstel Coulomb und wird für kleinere Ladungswerte in der Elektronik verwendet.",
    historySummary:
      "Es ist in der Präzisionselektronik und bei elektrostatischen Berechnungen gebräuchlich.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Präzisionselektronik und elektrostatische Berechnungen",
  },
  nanocoulomb: {
    name: "Nanocoulomb",
    slug: "nanocoulomb",
    categoryName: "Elektrische Ladung",
    shortDescription:
      "Das Nanocoulomb entspricht einem Milliardstel Coulomb und wird für sehr kleine Ladungswerte verwendet.",
    historySummary:
      "Es ist in präzisen Physikexperimenten und bei der Analyse kleiner elektrostatischer Ladungen gebräuchlich.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Präzisionsphysik und elektrostatische Ladungsanalysen",
  },
  "amper-metre": {
    name: "Ampere pro Meter",
    slug: "ampere-pro-meter",
    categoryName: "Magnetfeldstärke",
    shortDescription:
      "Ampere pro Meter (A/m) ist die abgeleitete SI-Einheit der Magnetfeldstärke. Sie gibt das Verhältnis des die Magnetfeldstärke erzeugenden Stroms zur Länge an.",
    historySummary:
      "Mit der Integration der elektromagnetischen Theorie in das SI-Einheitensystem wurde diese Einheit zur Standardmethode, die Magnetfeldstärke aus den Basiseinheiten Strom und Länge abzuleiten.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Elektromagnetische Feldberechnungen, Spulen- und Elektromagnetkonstruktion, Prüfung magnetischer Werkstoffe",
  },
  oersted: {
    name: "Oersted",
    slug: "oersted",
    categoryName: "Magnetfeldstärke",
    shortDescription:
      "Das Oersted ist eine traditionelle Einheit der magnetischen Feldstärke aus dem CGS-System.",
    historySummary:
      "Benannt nach Hans Christian Ørsted, wird es noch in älteren Magnetismusangaben und in den USA verwendet.",
    measurementSystem: "CGS-System (außerhalb des SI)",
    commonUses: "Ältere Magnetismusangaben und US-amerikanische Fachliteratur",
  },
  weber: {
    name: "Weber",
    slug: "weber",
    categoryName: "Magnetischer Fluss",
    shortDescription:
      "Weber (Wb) ist die abgeleitete SI-Einheit des magnetischen Flusses. Sie gibt die Gesamtwirkung eines Magnetfelds an, die durch eine bestimmte Fläche tritt.",
    historySummary:
      "Die Einheit ist nach dem deutschen Physiker Wilhelm Eduard Weber benannt; Weber baute in den 1830er-Jahren an der Universität Göttingen gemeinsam mit dem Mathematiker Carl Friedrich Gauß eine der weltweit ersten elektromagnetischen Telegrafenleitungen auf und entwickelte ein präzises Magnetometer. Diese Zusammenarbeit war wegweisend für die wissenschaftliche Standardisierung magnetischer Einheiten und gab dem als 'Weber-Gauß-Einheitensystem' bekannten frühen elektromagnetischen CGS-System seinen Namen -- das heutige SI-Weber steht in direkter Verbindung zu diesem historischen Erbe.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Transformatorenentwicklung, Berechnungen der elektromagnetischen Induktion, Elektromotorentechnik",
  },
  miliweber: {
    name: "Milliweber",
    slug: "milliweber",
    categoryName: "Magnetischer Fluss",
    shortDescription:
      "Das Milliweber entspricht einem Tausendstel Weber und wird für kleinere magnetische Flusswerte verwendet.",
    historySummary:
      "Es wird in der Elektromotoren- und Transformatorentechnik für praktische Berechnungen genutzt.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektromotoren- und Transformatorenberechnungen",
  },
  bit: {
    name: "Bit",
    slug: "bit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Bit ist die kleinste Einheit digitaler Daten; es kann nur den Wert 0 oder 1 annehmen. Es bildet die Grundlage aller anderen Dateneinheiten, einschließlich des Byte.",
    historySummary:
      "Der Begriff 'Bit' (Abkürzung von 'Binary Digit') wurde 1947 von dem Mathematiker John W. Tukey bei den Bell Laboratories in einer internen Mitteilung vorgeschlagen; Tukey suchte eine kürzere, einprägsamere Alternative zum sperrigeren Ausdruck 'Binary Information Digit'. Der Begriff setzte sich in der Wissenschaft durch, als er in Claude Shannons bahnbrechendem Aufsatz 'A Mathematical Theory of Communication' von 1948 verwendet wurde, der die Grundlage der Informationstheorie legte.",
    measurementSystem: "Digitale Dateneinheit (Standard der Informatik)",
    commonUses: "Internetverbindungsgeschwindigkeit (Mbit/s, Gbit/s), Prozessorarchitektur (32-Bit, 64-Bit) und Datenübertragungsraten",
  },
  bayt: {
    name: "Byte",
    slug: "byte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Byte ist die grundlegende Maßeinheit digitaler Daten. Es besteht aus 8 Bit und wird zur Darstellung eines Zeichens (Buchstabe, Ziffer usw.) verwendet.",
    historySummary:
      "Der Begriff 'Byte' wurde 1956 von Werner Buchholz, einem bei IBM am Stretch-Computer arbeitenden Ingenieur, bewusst durch eine veränderte Schreibweise des Wortes 'Bite' (Bissen) geprägt, um eine Verwechslung mit dem Wort 'Bit' zu vermeiden. In den Anfangsjahren konnte ein Byte je nach Computerarchitektur zwischen 1 und 6 Bit lang sein; der 8-Bit-Byte-Standard wurde mit der 1964 von IBM eingeführten System/360-Reihe, einer der einflussreichsten Computerfamilien ihrer Zeit, faktisch zum Industriestandard.",
    measurementSystem: "Digitale Dateneinheit (Standard der Informatik)",
    commonUses: "Dateigröße, Speicherkapazität und Messung der Datenübertragung",
  },
  kilobayt: {
    name: "Kilobyte",
    slug: "kilobyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Kilobyte entspricht etwa 1000 Byte und wurde für kleinere Dateien und frühe Speichergeräte verwendet.",
    historySummary:
      "Es war in den Anfängen der Computertechnik die gebräuchliche Einheit für Textdateien und Programme.",
    measurementSystem: "Digitale Dateneinheit (Vielfaches)",
    commonUses: "Kleine Dateien und frühe Computertechnik",
  },
  megabayt: {
    name: "Megabyte",
    slug: "megabyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Megabyte entspricht etwa einer Million Byte und wird für mittelgroße Dateien wie Fotos oder Dokumente verwendet.",
    historySummary:
      "Es wurde mit dem Aufkommen von Multimediadateien und größeren Programmen zur gebräuchlichen Speichereinheit.",
    measurementSystem: "Digitale Dateneinheit (Vielfaches)",
    commonUses: "Fotos, Dokumente und mittelgroße Softwaredateien",
  },
  gigabayt: {
    name: "Gigabyte",
    slug: "gigabyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Gigabyte entspricht etwa einer Milliarde Byte und ist die gebräuchliche Einheit für moderne Speichergeräte und Datenvolumen.",
    historySummary:
      "Es ist heute die Standardeinheit für Angaben zu Arbeitsspeicher, Festplatten und mobilen Datenvolumen.",
    measurementSystem: "Digitale Dateneinheit (Vielfaches)",
    commonUses: "Arbeitsspeicher, Festplatten und mobile Datenvolumen",
  },
  terabayt: {
    name: "Terabyte",
    slug: "terabyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Terabyte entspricht etwa einer Billion Byte und ist die gebräuchliche Einheit für große Speichergeräte.",
    historySummary:
      "Mit dem Wachstum von Videoinhalten und Cloud-Speicherung wurde es zur Standardeinheit für große Datenmengen.",
    measurementSystem: "Digitale Dateneinheit (Vielfaches)",
    commonUses: "Große Festplatten, Videoinhalte und Cloud-Speicher",
  },
  petabayt: {
    name: "Petabyte",
    slug: "petabyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Petabyte entspricht etwa 1000 Terabyte und wird für sehr große Speicherkapazitäten in Rechenzentren verwendet.",
    historySummary:
      "Es wurde mit dem Wachstum großer Rechenzentren und Cloud-Computing-Dienste gebräuchlich.",
    measurementSystem: "Digitale Dateneinheit (Vielfaches)",
    commonUses: "Große Rechenzentren und Cloud-Computing",
  },
  kibibayt: {
    name: "Kibibyte",
    slug: "kibibyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Kibibyte ist eine exakte binäre Einheit von genau 1024 Byte, die Verwechslungen mit dem dezimalen Kilobyte vermeidet.",
    historySummary:
      "Es wurde von der IEC eingeführt, um die Mehrdeutigkeit zwischen den Basen 1000 und 1024 zu beseitigen.",
    measurementSystem: "Binäre Dateneinheit (IEC-Standard)",
    commonUses: "Präzise technische Dokumentation von Betriebssystemen und Speicher",
  },
  mebibayt: {
    name: "Mebibyte",
    slug: "mebibyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Mebibyte ist eine exakte binäre Einheit, die genau 1024 Kibibyte entspricht.",
    historySummary:
      "Es wird in präziser technischer Dokumentation verwendet, um Verwechslungen zwischen dezimalen und binären Speicherangaben zu vermeiden.",
    measurementSystem: "Binäre Dateneinheit (IEC-Standard)",
    commonUses: "Präzise Dokumentation von Arbeitsspeicherkapazität",
  },
  gibibayt: {
    name: "Gibibyte",
    slug: "gibibyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Gibibyte (GiB) ist eine binär basierte Dateneinheit, die 1.073.741.824 Byte (1024 MiB) entspricht. Sie ist die tatsächliche Recheneinheit, die Windows und macOS bei der Anzeige von Festplatten-/RAM-Größen verwenden.",
    historySummary:
      "Gibibyte wurde von der IEC standardisiert, um den Unterschied zwischen der dezimalen (auf 1000 basierenden) Marketing-Einheit 'GB' der Hersteller und der tatsächlichen, auf 1024 basierenden Berechnung der Betriebssysteme klarzustellen; dieser Unterschied ist der eigentliche Grund, warum eine neue Festplatte im Betriebssystem kleiner erscheint als vom Hersteller angegeben.",
    measurementSystem: "IEC-System binärer Vorsilben",
    commonUses: "Anzeige von Betriebssystem-Festplatten-/RAM-Kapazitäten, Servermessungen und Speichervergleiche",
  },
  tebibayt: {
    name: "Tebibyte",
    slug: "tebibyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Tebibyte (TiB) ist eine sehr große, binär basierte Dateneinheit, die 1.099.511.627.776 Byte (1024 GiB) entspricht. Sie gibt die tatsächliche Kapazität großer Speichersysteme an.",
    historySummary:
      "Tebibyte wird als Teil des binären Vorsilbenstandards der IEC verwendet, um die tatsächliche, auf 1024 basierende Kapazität großer Festplattenarrays und Serverspeichersysteme von der auf 1000 basierenden Marketing-Einheit zu unterscheiden.",
    measurementSystem: "IEC-System binärer Vorsilben",
    commonUses: "Server-Speicherarrays, Kapazitätsplanung in Rechenzentren und große RAID-Systeme",
  },
  "24-ayar-altin": {
    name: "24 Karat Gold",
    slug: "24-karat-gold",
    categoryName: "Goldkarat",
    shortDescription:
      "24 Karat bezeichnet reines Gold ohne Legierungszusätze, also 99,9 % Feingehalt.",
    historySummary:
      "Es gilt als reinste handelsübliche Goldform und wird vor allem für Barren und Anlagemünzen verwendet.",
    measurementSystem: "Karatsystem (außerhalb des SI)",
    commonUses: "Goldbarren, Anlagemünzen und Wertaufbewahrung",
  },
  "22-ayar-altin": {
    name: "22 Karat Gold",
    slug: "22-karat-gold",
    categoryName: "Goldkarat",
    shortDescription:
      "22 Karat bedeutet eine Legierung aus 91,7 % reinem Gold, was einem guten Kompromiss aus Reinheit und Härte entspricht.",
    historySummary:
      "Es ist in vielen asiatischen und nahöstlichen Ländern der bevorzugte Karatwert für traditionellen Goldschmuck.",
    measurementSystem: "Karatsystem (außerhalb des SI)",
    commonUses: "Traditioneller Goldschmuck in Asien und dem Nahen Osten",
  },
  "18-ayar-altin": {
    name: "18 Karat Gold",
    slug: "18-karat-gold",
    categoryName: "Goldkarat",
    shortDescription:
      "18 Karat bedeutet eine Legierung aus 75 % reinem Gold, was eine gute Balance zwischen Härte und Wert bietet.",
    historySummary:
      "Es ist in der westlichen Schmuckindustrie besonders wegen seiner Haltbarkeit und Farbvielfalt beliebt.",
    measurementSystem: "Karatsystem (außerhalb des SI)",
    commonUses: "Westlicher Schmuck und Verlobungsringe",
  },
  "14-ayar-altin": {
    name: "14 Karat Gold",
    slug: "14-karat-gold",
    categoryName: "Goldkarat",
    shortDescription:
      "14 Karat bedeutet eine Legierung aus 58,3 % reinem Gold und ist deutlich strapazierfähiger und günstiger als höhere Karatwerte.",
    historySummary:
      "Es ist in westlichen Märkten wegen seiner hohen Haltbarkeit und des vergleichsweise günstigen Preises für Alltagsschmuck verbreitet.",
    measurementSystem: "Karatsystem (außerhalb des SI)",
    commonUses: "Strapazierfähiger Alltagsschmuck in westlichen Märkten",
  },
  "999-ayar-gumus": {
    name: "Feinsilber (999)",
    slug: "feinsilber-999",
    categoryName: "Silberreinheit",
    shortDescription:
      "Feinsilber (999) besteht zu 99,9 % aus reinem Silber und ist damit nahezu vollständig rein. Es wird auch \"Feinsilber\" genannt und aufgrund seiner Weichheit eher für Barren und Anlagesilber als für Schmuck verwendet.",
    historySummary:
      "Im Gegensatz zu Gold wird die Silberreinheit direkt als Tausendstelanteil reinen Metalls angegeben; 999 bezeichnet eine praktisch legierungsfreie Reinheit und dient als Reinheitsmaßstab im Edelmetallhandel.",
    measurementSystem: "Feingehaltsstandard für Schmuck (Tausendstelanteil)",
    commonUses: "Silberbarren, Anlagesilber und als Reinheitsmaßstab",
  },
  "925-ayar-gumus": {
    name: "Sterlingsilber (925)",
    slug: "sterlingsilber-925",
    categoryName: "Silberreinheit",
    shortDescription:
      "925er Silber besteht zu 92,5 % aus reinem Silber, der Rest ist meist eine Kupferlegierung. Weltweit als \"Sterlingsilber\" bekannt und der gebräuchlichste Silberstandard in der Schmuckherstellung.",
    historySummary:
      "Der Sterlingsilber-Standard entstand in England, um die übermäßige Weichheit von reinem Silber auszugleichen, und wurde mit der Zeit zum weltweit üblichen Standard für Silberschmuck und Haushaltsgegenstände.",
    measurementSystem: "Feingehaltsstandard für Schmuck (Tausendstelanteil)",
    commonUses: "Silberschmuck, Ringe, Ketten und Silberbesteck",
  },
  "900-ayar-gumus": {
    name: "Münzsilber (900)",
    slug: "muenzsilber-900",
    categoryName: "Silberreinheit",
    shortDescription:
      "900er Silber besteht zu 90 % aus reinem Silber. Historisch als \"Münzsilber\" bekannt; bis 1965 wurde dieser Feingehalt in den Münzen vieler Länder verwendet.",
    historySummary:
      "Der 900er-Feingehalt setzte sich bei der Münzprägung als Kompromiss zwischen Haltbarkeit und Reinheit durch und wird noch heute für manche traditionellen Schmuck- und Silberwaren verwendet.",
    measurementSystem: "Feingehaltsstandard für Schmuck (Tausendstelanteil)",
    commonUses: "Historische Münzen, einige traditionelle Silberwaren",
  },
  "800-ayar-gumus": {
    name: "800er Silber",
    slug: "silber-800",
    categoryName: "Silberreinheit",
    shortDescription:
      "800er Silber besteht zu 80 % aus reinem Silber und ist damit eine Legierung mit vergleichsweise geringerer Reinheit.",
    historySummary:
      "Der 800er-Feingehalt war historisch in vielen Ländern, unter anderem in der ehemaligen Sowjetunion, für preisgünstigere und widerstandsfähigere Silberwaren gebräuchlich.",
    measurementSystem: "Feingehaltsstandard für Schmuck (Tausendstelanteil)",
    commonUses: "Traditioneller Silberschmuck, antike Silberwaren, preisgünstigere Produkte",
  },
  "milimol-litre": {
    name: "Millimol pro Liter",
    slug: "millimol-pro-liter",
    categoryName: "Blutzucker",
    shortDescription:
      "Millimol pro Liter (mmol/L) ist die weltweit (außer in den USA) gebräuchliche SI-Einheit zur Angabe des Blutzuckerspiegels (Glukose).",
    historySummary:
      "Mit der Verbreitung des SI-Einheitensystems in der klinischen Chemie wurde die molare Messung von Glukose in den meisten Ländern zum Standard; die USA behielten die massebasierte Einheit mg/dL bei.",
    measurementSystem: "SI (Internationales Einheitensystem), klinische Chemie",
    commonUses: "Angabe von Blutzuckerwerten (Nüchtern-/postprandiale Glukose) außerhalb der USA",
  },
  "miligram-desilitre": {
    name: "Milligramm pro Deziliter",
    slug: "milligramm-pro-deziliter",
    categoryName: "Blutzucker",
    shortDescription:
      "Milligramm pro Deziliter (mg/dL) ist die traditionelle Einheit zur Angabe des Blutzuckerspiegels (Glukose), die vor allem in den USA verwendet wird.",
    historySummary:
      "mg/dL ist eine massebasierte Maßeinheit, die seit den Anfängen der klinischen Chemie verwendet wird und im US-amerikanischen Gesundheitssystem bis heute Standard ist.",
    measurementSystem: "Traditionelle (massebasierte) Einheit der klinischen Chemie",
    commonUses: "Angabe von Blutzuckerwerten (Nüchtern-/postprandiale Glukose) in den USA",
  },
  "nanomol-litre": {
    name: "Nanomol pro Liter",
    slug: "nanomol-pro-liter",
    categoryName: "Vitamin D",
    shortDescription:
      "Nanomol pro Liter (nmol/L) ist die weltweit (außer in den USA) gebräuchliche SI-Einheit zur Angabe des Vitamin-D-Spiegels (25-Hydroxyvitamin D) im Blutserum.",
    historySummary:
      "Mit der Verbreitung des SI-Einheitensystems in der klinischen Chemie wurde die molare Messung von Vitamin D in den meisten Ländern zum Standard; die USA behielten die Einheit ng/mL bei.",
    measurementSystem: "SI (Internationales Einheitensystem), klinische Chemie",
    commonUses: "Angabe von Vitamin-D-Werten (25-OH) außerhalb der USA",
  },
  "nanogram-mililitre": {
    name: "Nanogramm pro Milliliter",
    slug: "nanogramm-pro-milliliter",
    categoryName: "Vitamin D",
    shortDescription:
      "Nanogramm pro Milliliter (ng/mL) ist die traditionelle Einheit zur Angabe des Vitamin-D-Spiegels (25-Hydroxyvitamin D) im Blutserum, die vor allem in den USA verwendet wird.",
    historySummary:
      "ng/mL ist eine massebasierte Maßeinheit, die seit den Anfängen der klinischen Chemie verwendet wird und im US-amerikanischen Gesundheitssystem als Standard gilt.",
    measurementSystem: "Traditionelle (massebasierte) Einheit der klinischen Chemie",
    commonUses: "Angabe von Vitamin-D-Werten (25-OH) in den USA",
  },
  "metre": {
    name: "Meter",
    slug: "meter",
    categoryName: "Länge",
    shortDescription:
      "Meter ist die Basiseinheit der Länge im Internationalen Einheitensystem. Es wird vom Alltag bis zur Technik zur Messung von Entfernungen und Abmessungen verwendet.",
    historySummary:
      "Der Meter entstand während der Französischen Revolution mit dem Ziel, die bis dahin von Region zu Region unterschiedlichen Maßeinheiten durch einen einzigen, universellen und auf der Natur beruhenden Standard zu ersetzen. Zunächst wurde eine Definition auf Basis der Pendelperiode erwogen, doch da ein Pendel von der lokalen Erdanziehung abhängt, wurde diese Idee verworfen. Stattdessen definierte die Französische Nationalversammlung 1791 den Meter als ein Zehnmillionstel der Entfernung vom Nordpol zum Äquator entlang des durch Paris verlaufenden Meridians -- diese Entfernung wurde von den Wissenschaftlern Delambre und Méchain durch jahrelange geodätische Messungen berechnet. 1799 wurde die Definition auf einen Platinstab namens 'Mètre des Archives' gestützt; 1889 ersetzte ein neuer Standard aus einer Platin-Iridium-Legierung, von dem weltweit 29 Kopien verteilt wurden, diesen Stab. 1960 wurde der Meter nicht mehr anhand eines physischen Objekts definiert, sondern anhand der Wellenlänge des von Krypton-86-Atomen ausgestrahlten Lichts. Seit 1983 ist der Meter definiert als die Strecke, die Licht im Vakuum in 1/299.792.458 Sekunde zurücklegt -- dadurch lässt sich der Meter in jedem Labor der Welt reproduzieren, ohne ein physisches Referenzobjekt zu benötigen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Bauwesen, Wissenschaft, Fertigung, Geometrie und allgemeine Messung",
  },
  "kilometre": {
    name: "Kilometer",
    slug: "kilometer",
    categoryName: "Länge",
    shortDescription:
      "Kilometer ist eine Längeneinheit, die 1000 Metern entspricht. Sie wird zur Angabe von Entfernungen zwischen Städten und geografischen Distanzen verwendet.",
    historySummary:
      "Der Kilometer etablierte sich im dezimalen Aufbau des metrischen Systems als Vielfaches des Meters. Er wurde zur Standardangabe für Straßenentfernungen und Kartenmaßstäbe.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Straßenentfernungen, Geografie, Kartografie und Infrastruktur",
  },
  "santimetre": {
    name: "Zentimeter",
    slug: "zentimeter",
    categoryName: "Länge",
    shortDescription:
      "Zentimeter ist eine Längeneinheit, die einem Hundertstel eines Meters entspricht. Sie ist bei der Angabe kleiner Objekte und alltäglicher Maße gebräuchlich.",
    historySummary:
      "Der Zentimeter entwickelte sich im metrischen System als dezimale Untereinheit. Er gewann breite Verwendung, da er Messungen praktisch und schnell berechenbar macht.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Möbel, Textilien, Anthropometrie und alltägliche Messungen",
  },
  "desimetre": {
    name: "Dezimeter",
    slug: "dezimeter",
    categoryName: "Länge",
    shortDescription:
      "Dezimeter ist eine Längeneinheit, die einem Zehntel eines Meters entspricht. Sie wird im Alltag zwar selten direkt verwendet, ist aber über den Liter unmittelbar mit dem Volumen verknüpft (1 Liter = 1 Kubikdezimeter).",
    historySummary:
      "Der Dezimeter wurde 1795 in Frankreich als eine der ersten dezimalen Untereinheiten des angenommenen metrischen Systems definiert. Auch die Einheit Liter wurde historisch über den Kubikdezimeter definiert.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Schulunterricht, Verknüpfung mit der Definition der Volumeneinheit Liter",
  },
  "milimetre": {
    name: "Millimeter",
    slug: "millimeter",
    categoryName: "Länge",
    shortDescription:
      "Millimeter ist eine Längeneinheit, die einem Tausendstel eines Meters entspricht. Sie wird häufig bei präzisen technischen Messungen verwendet.",
    historySummary:
      "Der Millimeter verbreitete sich mit dem Bedarf, in Industrie und Technik kleinere Toleranzen zu messen. Er wurde besonders in Fertigungs- und Zeichnungsstandards zu einer grundlegenden Untereinheit.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Mechanische Fertigung, technisches Zeichnen, Bearbeitungstoleranzen",
  },
  "mikrometre": {
    name: "Mikrometer",
    slug: "mikrometer",
    categoryName: "Länge",
    shortDescription:
      "Mikrometer ist eine sehr kleine Längeneinheit, die einem Millionstel eines Meters entspricht. Sie wird bei präzisen technischen Toleranzen und mikroskopischen Messungen verwendet.",
    historySummary:
      "Der Mikrometer verbreitete sich mit dem Bedarf, in Fertigung und Werkstofftechnik sehr kleine Abmessungen und Toleranzen anzugeben; er ist auch als Mikron bekannt.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Fertigungstoleranzen, Materialdicke, mikroskopische Messungen und Halbleiterfertigung",
  },
  "nanometre": {
    name: "Nanometer",
    slug: "nanometer",
    categoryName: "Länge",
    shortDescription:
      "Nanometer ist eine extrem kleine Längeneinheit, die einem Milliardstel eines Meters entspricht. Sie wird zur Angabe von Lichtwellenlängen und Abmessungen im atomaren Maßstab verwendet.",
    historySummary:
      "Mit der Entwicklung von Nanotechnologie und Halbleiterfertigung wurde der Nanometer zur Standardeinheit für extrem kleine Messungen wie Chipstrukturgrößen und Lichtwellenlängen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Lichtwellenlänge, Halbleiterchip-Fertigung, Nanotechnologie und optische Beschichtungen",
  },
  "pikometre": {
    name: "Pikometer",
    slug: "pikometer",
    categoryName: "Länge",
    shortDescription:
      "Pikometer ist eine extrem kleine Längeneinheit, die einem Billionstel eines Meters entspricht und zur Angabe atomarer und zwischenatomarer Abstände verwendet wird.",
    historySummary:
      "Der Pikometer verbreitete sich als Teil des 1960 angenommenen SI-Vorsilbensystems, um in Atomphysik und Chemie Atomradien und Länge kovalenter Bindungen präzise anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Atomradius, chemische Bindungslänge, Kristallografie",
  },
  "fit": {
    name: "Fuß",
    slug: "fuss",
    categoryName: "Länge",
    shortDescription:
      "Fuß (Foot) ist eine im britischen und amerikanischen Maßsystem verwendete Längeneinheit. Ein internationaler Fuß entspricht genau 0,3048 Metern.",
    historySummary:
      "Der Fuß beruhte historisch, wie der Name schon sagt, auf der ungefähren Länge eines menschlichen Fußes; seit der 'pes'-Einheit des Römischen Reiches wurden je nach Region und Epoche Dutzende unterschiedliche 'Fuß'-Definitionen zwischen 250 und 335 mm verwendet. Der sich in England durchsetzende Fuß wurde 1959 (im selben Jahr, in dem auch Zoll und Meile festgelegt wurden) durch ein internationales Abkommen zwischen den USA, Großbritannien und den Commonwealth-Staaten exakt auf 0,3048 Meter (genau 12 Zoll) festgelegt.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Architektur, Gebäudehöhen, Luftfahrt und Geländevermessung",
  },
  "inc": {
    name: "Zoll",
    slug: "zoll",
    categoryName: "Länge",
    shortDescription:
      "Zoll (Inch) ist eine kurze, im britischen und amerikanischen Maßsystem verwendete Längeneinheit. Ein Zoll entspricht genau 2,54 Zentimetern.",
    historySummary:
      "Das Wort Zoll (englisch inch) leitet sich vom lateinischen 'uncia' (ein Zwölftel) ab. Die früheste Definition stammt von 1324, als der englische König Edward II. ihn als 'drei hintereinander aufgereihte, trockene Gerstenkörner' festlegte -- eine Definition, die jahrhundertelang verwendet wurde. Überliefert ist auch, dass der schottische König David I. (12. Jahrhundert) den Zoll als Breite eines männlichen Daumens am Nagelansatz definierte. Ein Wendepunkt kam 1896, als der schwedische Ingenieur Carl Edvard Johansson bei der Herstellung präziser Endmaße den Zoll praktisch exakt auf 25,4 mm festlegte -- dieser 'Industriezoll' wurde 1930 von britischen und 1933 von amerikanischen Normungsgremien übernommen. Das endgültige internationale Abkommen trat 1959 in Kraft (in den USA am 1. Juli), seitdem ist der Zoll exakt als 25,4 Millimeter definiert.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Bildschirmgrößen, Rohrleitungsbau, Verbindungselemente und technische Kataloge",
  },
  "yarda": {
    name: "Yard",
    slug: "yard",
    categoryName: "Länge",
    shortDescription:
      "Yard ist eine im britischen und amerikanischen Maßsystem verwendete Längeneinheit. Ein Yard entspricht genau 0,9144 Metern.",
    historySummary:
      "Der Ursprung des Yards ist nicht genau geklärt, doch einer verbreiteten Überlieferung zufolge definierte der englische König Heinrich I. im 12. Jahrhundert das Yard als die Entfernung von seiner Nasenspitze bis zum Daumen seines ausgestreckten Arms. Besser dokumentiert ist, dass im 16. Jahrhundert im englischen Schatzamt offizielle bronzene 'Yardstäbe' als Standardreferenz hergestellt wurden. Wie Fuß und Zoll wurde auch das Yard durch das internationale Abkommen von 1959 exakt auf 0,9144 Meter (3 Fuß) festgelegt.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Sportplätze, Textilien, Landschaftsbau und Geländeplanung",
  },
  "mil": {
    name: "Meile",
    slug: "meile",
    categoryName: "Länge",
    shortDescription:
      "Meile ist eine besonders in den Vereinigten Staaten und im Vereinigten Königreich verwendete Längeneinheit. Eine internationale Meile entspricht 1609,344 Metern.",
    historySummary:
      "Das Wort 'Meile' stammt vom lateinischen 'mille passus' (tausend Schritte) -- ein 'Schritt' galt als die Strecke zwischen zwei Auftritten des rechten Fußes. Die römische Meile wurde 29 v. Chr. indirekt festgelegt, als Marcus Agrippa einen standardisierten römischen Fuß bestimmte (1 Schritt = 5 römische Fuß, 1 Meile = 5000 römische Fuß ≈ 1479 Meter). Im mittelalterlichen England war die 'alte englische Meile' ein unbestimmtes, von Region zu Region unterschiedliches Maß von etwa 2,1 km. Der entscheidende Wendepunkt kam 1593: Ein unter Königin Elisabeth I. erlassenes Parlamentsgesetz zu Gewichten und Maßen behielt die traditionelle Struktur von 8 Furlongs pro Meile bei, erhöhte aber die Anzahl der Fuß und legte die Meile exakt auf 5280 Fuß (1760 Yards) fest -- diese Definition verbreitete sich über das britische Empire und bildet die Grundlage der heutigen internationalen Meile. Die moderne internationale Meile wurde 1959 exakt auf 1609,344 Meter festgelegt.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Straßenentfernungen, Navigation und Geländemaßstäbe",
  },
  "furlong": {
    name: "Furlong",
    slug: "furlong",
    categoryName: "Länge",
    shortDescription:
      "Furlong ist eine Längeneinheit, die 201,168 Metern (660 Fuß) entspricht. Heute wird sie am häufigsten zur Angabe von Pferderennstrecken verwendet.",
    historySummary:
      "Der Name Furlong stammt aus dem Altenglischen von 'furh' (Furche) und 'lang' (lang) und beruht auf der im mittelalterlichen England üblichen Standardlänge eines mit einem Pflug bearbeiteten Feldstreifens; er wurde exakt auf ein Achtel einer Meile festgelegt. Obwohl er mit der Verbreitung des Meter-Kilogramm-Sekunde-Systems weitgehend aus dem Alltagsgebrauch verschwunden ist, hat er im Pferderennsport (besonders in Großbritannien, den USA, Australien und Irland) seine offizielle und universelle Verwendung als Streckeneinheit behalten.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Pferderennstrecken (weltweit standardisierte Einheit), historische englische Landvermessung",
  },
  "astronomik-birim": {
    name: "Astronomische Einheit",
    slug: "astronomische-einheit",
    categoryName: "Länge",
    shortDescription:
      "Die Astronomische Einheit (AE) ist eine Längeneinheit zur Angabe von Entfernungen innerhalb des Sonnensystems; sie entspricht ungefähr der mittleren Entfernung zwischen Erde und Sonne.",
    historySummary:
      "Seit den ersten (und weitgehend fehlerhaften) Schätzungen des antiken griechischen Astronomen Aristarch (um 280 v. Chr.), der den Mond-Erde-Sonne-Winkel maß, war die Erde-Sonne-Entfernung eine der wichtigsten Fragen der Astronomie. 1672 erzielten Jean Richer und Giovanni Cassini eine bessere Schätzung, indem sie die Parallaxe des Mars gleichzeitig von Paris und Französisch-Guayana aus maßen. Der eigentliche Durchbruch gelang durch die Beobachtung des Venustransits vor der Sonne -- diese von Edmond Halley vorgeschlagene Methode wurde bei den Transits von 1761 und 1769 im Rahmen einer der größten internationalen wissenschaftlichen Kooperationen ihrer Zeit angewandt. Nachdem die AE Jahrhunderte lang eine beobachtungsbasierte Messgröße blieb, legte die Internationale Astronomische Union sie 2012 exakt auf 149.597.870.700 Meter fest.",
    measurementSystem: "Spezielle Längeneinheit der Astronomie",
    commonUses: "Entfernungen innerhalb des Sonnensystems, Planetenbahnen, Astronomieunterricht",
  },
  "isik-yili": {
    name: "Lichtjahr",
    slug: "lichtjahr",
    categoryName: "Länge",
    shortDescription:
      "Ein Lichtjahr ist eine Längeneinheit, die die Strecke angibt, die Licht im Vakuum in einem vollen Jahr zurücklegt; sie wird zur Beschreibung von Entfernungen zwischen Sternen und Galaxien verwendet.",
    historySummary:
      "Das Lichtjahr ist eine in populärwissenschaftlicher Literatur und der Allgemeinbildung verwendete Einheit, um die gewaltigen Entfernungen zwischen Sternen fassbar zu machen -- professionelle Astronomen bevorzugen dagegen meist die Einheit Parsec. Seine Definition beruht auf der Strecke, die Licht bei seiner Vakuumgeschwindigkeit (299.792.458 Meter pro Sekunde) in einem julianischen Jahr (genau 365,25 Tage) zurücklegt, was exakt 9.460.730.472.580.800 Metern entspricht.",
    measurementSystem: "Spezielle Längeneinheit der Astronomie",
    commonUses: "Entfernungen zwischen Sternen, Galaxienmaßstäbe, populärwissenschaftliche Astronomiedarstellung",
  },
  "parsek": {
    name: "Parsec",
    slug: "parsec",
    categoryName: "Länge",
    shortDescription:
      "Parsec ist eine von professionellen Astronomen bevorzugte Längeneinheit zur Angabe von Entfernungen zwischen Sternen; sie entspricht etwa 3,26 Lichtjahren.",
    historySummary:
      "Der Name Parsec wurde 1913 vom britischen Astronomen Herbert Hall Turner als Abkürzung für 'die einer Parallaxe von einer Bogensekunde entsprechende Entfernung' vorgeschlagen (konkurrierende Vorschläge wie Frank Watson Dysons 'Astron' und Carl Charliers 'Siriometer' setzten sich nicht durch). Die Definition funktioniert so: Betrachtet man ein rechtwinkliges Dreieck mit einer Kathete von 1 Astronomischer Einheit und einem gegenüberliegenden Winkel von genau 1 Bogensekunde, entspricht die Länge der langen Kathete diesem Dreieck genau 1 Parsec. Astronomen bevorzugen diese Einheit, da sie sich natürlich mit der Parallaxenmethode von Bessel verbindet -- die Entfernung eines Sterns in Parsec ergibt sich einfach aus dem Kehrwert des Parallaxenwinkels (in Bogensekunden), ohne komplexe trigonometrische Berechnung.",
    measurementSystem: "Spezielle Längeneinheit der Astronomie",
    commonUses: "Professionelle Astronomie, Entfernungen zwischen Sternen und innerhalb von Galaxien",
  },
  "angstrom": {
    name: "Angström",
    slug: "angstroem",
    categoryName: "Länge",
    shortDescription:
      "Angström (Å) ist eine sehr kleine Längeneinheit zur Angabe von Entfernungen auf der Skala von Atomen und Molekülen.",
    historySummary:
      "Die Einheit wurde nach dem schwedischen Physiker Anders Jonas Ångström (1814-1874) benannt; Ångström gab 1868 bei der Kartierung des Sonnenlichtspektrums Wellenlängen in 'Zehnmillionstel Millimeter' an. 1892-95 bestimmten Albert Michelson und Jean-René Benoît die präzise Beziehung zwischen dem Meterstandard und Cadmium-Spektrallinien; 1907 legte die Internationale Union für Sonnenforschung darauf basierend die offizielle Definition fest. Mit der spektroskopischen Neudefinition des Meters 1960 wurde das Angström exakt auf 0,1 Nanometer festgelegt. Obwohl es keine SI-Einheit ist, wird es in Physik und Chemie (Atomdurchmesser, chemische Bindungslängen, Röntgenwellenlängen) weiterhin häufig verwendet.",
    measurementSystem: "Nicht-SI-Einheit, in Physik und Chemie verwendet",
    commonUses: "Atom- und Molekülgrößen, chemische Bindungslängen, Röntgenwellenlänge, Kristallografie",
  },
  "fathom": {
    name: "Faden",
    slug: "faden",
    categoryName: "Länge",
    shortDescription:
      "Der Faden (Fathom) ist eine besonders in der Seefahrt zur Messung der Wassertiefe verwendete Längeneinheit. 1 Faden entspricht 1,8288 Metern.",
    historySummary:
      "Der Faden ist eine der ältesten auf dem menschlichen Körper beruhenden Maßeinheiten -- der englische Name 'fathom' stammt vom altenglischen 'fæðm' (umarmende, ausgebreitete Arme) und bezeichnet die Spannweite der beiden seitlich ausgestreckten Arme eines Menschen; verwandt sind das dänische 'favn' und das althochdeutsche 'fadum', vergleichbar auch mit dem altgriechischen Begriff 'orguia' (ausgebreitete Arme). Vor der Standardisierung war der Faden ein unbestimmtes Maß, das auf Handelsschiffen 5,5 Fuß und auf Fischerbooten zwischen 5 und 7 Fuß betrug. Der von der britischen Marine verwendete 'Kriegsschiff-Faden' wurde auf genau 6 Fuß (1,8288 Meter) standardisiert, worauf die heutige internationale Definition beruht. In der Seefahrt wird er noch heute zur Wassertiefenmessung verwendet, etwa in Faden-Abständen markierten Lotleinen.",
    measurementSystem: "In der Seefahrt verwendete britische/US-amerikanische Maßeinheit",
    commonUses: "Messung der Meerestiefe, Seekarten, Loten",
  },
  "arsin": {
    name: "Arschin",
    slug: "arschin",
    categoryName: "Länge",
    shortDescription:
      "Arschin ist eine im Osmanischen Reich verwendete traditionelle Längeneinheit. Ihre gebräuchlichste Form, das Marktarschin, entspricht 68 Zentimetern.",
    historySummary:
      "Je nach Verwendungszweck gab es mehrere Arten des Arschin: Das im Handel verwendete Marktarschin entsprach 68 cm, während das im Bauwesen verwendete Architekturarschin über 24 Finger etwa 75,77 cm betrug. Im Zuge der metrischen Reformen von 1869 wurde ein dezimales Längenmaß namens 'Zira-i Aşari' eingeführt; mit dem 1931 in Kraft getretenen türkischen Maß- und Eichgesetz wurde das Arschin vollständig abgeschafft und durch den Meter ersetzt.",
    measurementSystem: "Traditionelle osmanische Längeneinheit (nicht mehr in Gebrauch)",
    commonUses: "Stoff-, Land- und Baumessungen im Osmanischen Reich; heute in der Geschichtsforschung und bei der Interpretation historischer Texte",
  },
  "endaze": {
    name: "Endaze",
    slug: "endaze",
    categoryName: "Länge",
    shortDescription:
      "Endaze ist eine im Osmanischen Reich besonders zur Stoffmessung verwendete Längeneinheit. Ihr metrisches Äquivalent beträgt 65 Zentimeter.",
    historySummary:
      "Das Endaze war ein aus vier je vier Finger breiten Handspannen bestehendes Maß und wurde, anders als das Arschin, vor allem im Textil- und Manufakturhandel bevorzugt. Wie andere osmanische Maße wurde es durch das Maß- und Eichgesetz von 1931 abgeschafft und durch den Meter ersetzt.",
    measurementSystem: "Traditionelle osmanische Längeneinheit (nicht mehr in Gebrauch)",
    commonUses: "Stoff- und Manufakturmessungen im Osmanischen Reich; heute in der Geschichtsforschung und bei der Interpretation historischer Texte",
  },
  "cig": {
    name: "Çığ",
    slug: "cig",
    categoryName: "Länge",
    shortDescription:
      "Çığ ist eine von den frühen Turkvölkern verwendete Längeneinheit. Laut dem Werk Dîvânu Lugâti't-Türk von Kaşgarlı Mahmud entspricht sie metrisch etwa 33,3 Zentimetern.",
    historySummary:
      "Çığ wurde im 11. Jahrhundert von Kaşgarlı Mahmud in seinem Werk Dîvânu Lugâti't-Türk als 'das Längenmaß der Turkvölker' beschrieben, das zwei Dritteln des damaligen arabischen Maßes entsprach. Man vermutet einen chinesischen Ursprung des Begriffs, der über Handelsbeziehungen mit China zur Zeit der Kök-Türken in die Sprache gelangte.",
    measurementSystem: "Traditionelle frühtürkische (Kök-Türken-Zeit) Längeneinheit (nicht mehr in Gebrauch)",
    commonUses: "Stoff- und Entfernungsmessungen bei den frühen Turkvölkern; heute in der türkischen Sprachgeschichte und der Dîvânu-Lugâti't-Türk-Forschung",
  },
  "gram-mililitre": {
    name: "Gramm pro Milliliter",
    slug: "gramm-pro-milliliter",
    categoryName: "Dichte",
    shortDescription:
      "Gramm pro Milliliter ist eine Dichteeinheit, die im Labormaßstab zur Angabe der Dichte von Flüssigkeiten und Feststoffen verwendet wird und zahlenmäßig genau Gramm pro Kubikzentimeter entspricht.",
    historySummary:
      "Die Einheit ergibt sich direkt aus dem Verhältnis der metrischen Basiseinheiten für Masse (Gramm) und Volumen (Milliliter); ihre breite Verwendung in Chemie- und Pharmalaboren geht auf die metrische Standardisierung des 19. Jahrhunderts zurück.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Chemielabormessungen, Pharmazie, Tabellen zur Flüssigkeitsdichte",
  },
  "kilogram-litre": {
    name: "Kilogramm pro Liter",
    slug: "kilogramm-pro-liter",
    categoryName: "Dichte",
    shortDescription:
      "Kilogramm pro Liter ist eine im Alltag und in der Industrie häufig verwendete Einheit zur Angabe der Dichte von Flüssigkeiten, die zahlenmäßig Gramm pro Milliliter entspricht.",
    historySummary:
      "Dass der Liter zwischen 1901 und 1964 als das Volumen definiert war, das ein Kilogramm reines Wasser einnimmt, führte dazu, dass die Einheit kg/L direkt mit der Dichte von Wasser (etwa 1) verknüpft wurde.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Kraftstoff- und Treibstoffdichte, Lebensmittelindustrie, Tank- und Lagerberechnungen",
  },
  "gram-litre": {
    name: "Gramm pro Liter",
    slug: "gramm-pro-liter",
    categoryName: "Dichte",
    shortDescription:
      "Gramm pro Liter ist eine Einheit, die besonders zur Angabe der Dichte verdünnter Lösungen und Gase verwendet wird und zahlenmäßig genau der SI-Basisdichteeinheit kg/m³ entspricht.",
    historySummary:
      "Die Einheit ergibt sich aus der direkten Kombination der metrischen Masse- und Volumeneinheiten und wird bereits seit früher Zeit in Standards zur Wasserqualität und Lösungskonzentration verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Lösungskonzentration, Gasdichte, Wasser- und Abwasseranalyse",
  },
  "miligram-litre": {
    name: "Milligramm pro Liter",
    slug: "milligramm-pro-liter",
    categoryName: "Dichte",
    shortDescription:
      "Milligramm pro Liter ist eine sehr kleine Dichte-/Konzentrationseinheit, die in der Wasserqualitäts- und Umweltanalytik zur Angabe von Schadstoff- oder Stoffkonzentrationen verwendet wird; in der Praxis gilt sie als nahezu gleichwertig mit ppm (Teile pro Million).",
    historySummary:
      "Die Einheit entstand aus dem Bedarf der Wasseraufbereitung und Umwelttechnik des 20. Jahrhunderts nach einer standardisierten Analyseeinheit; heute ist sie die universelle Referenzeinheit in Trinkwasser- und Abwasservorschriften.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Untereinheit)",
    commonUses: "Trinkwasser- und Abwasseranalyse, Umweltverschmutzungsmessung, medizinische Laboruntersuchungen",
  },
  "pound-fitkup": {
    name: "Pfund pro Kubikfuß",
    slug: "pfund-pro-kubikfuss",
    categoryName: "Dichte",
    shortDescription:
      "Pfund pro Kubikfuß ist eine im britischen und amerikanischen Maßsystem verwendete Einheit zur Angabe der Dichte von Feststoffen und Flüssigkeiten; sie ist besonders in den USA im Bauwesen und in der Werkstofftechnik gebräuchlich.",
    historySummary:
      "Die Einheit ergibt sich aus der Kombination der britischen Gewichts- (Pfund) und Volumeneinheit (Kubikfuß); da die USA nicht vollständig auf das metrische System umgestellt haben, wird sie in Normen der Werkstofftechnik weiterhin verwendet.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Dichte von Baumaterialien, Holz- und Betontechnik (US-Normen)",
  },
  "pound-inckup": {
    name: "Pfund pro Kubikzoll",
    slug: "pfund-pro-kubikzoll",
    categoryName: "Dichte",
    shortDescription:
      "Pfund pro Kubikzoll ist eine Einheit zur Angabe der Dichte von Metallen und dichten Werkstoffen im britischen Maßsystem und liefert deutlich höhere Zahlenwerte als Pfund pro Kubikfuß.",
    historySummary:
      "Die Einheit leitet sich von Pfund pro Kubikfuß ab und dient der praktischen Messung kleinvolumiger, dichter Materialien (Metallteile, Präzisionsbauteile); sie findet sich häufig in US-amerikanischen Maschinenbauzeichnungen.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Dichte von Metallen und Legierungen, Werkstoffberechnungen im Maschinenbau (US-Normen)",
  },
  "pound-galon": {
    name: "Pfund pro US-Gallone",
    slug: "pfund-pro-us-gallone",
    categoryName: "Dichte",
    shortDescription:
      "Pfund pro US-Gallone ist eine Einheit zur Angabe der Flüssigkeitsdichte (besonders von Kraftstoffen und chemischen Flüssigkeiten) im US-amerikanischen Maßsystem.",
    historySummary:
      "Die Einheit ergibt sich aus der Kombination von US-Gallone und Pfund und wird in der Erdöl- und Chemieindustrie in aus den USA stammenden technischen Dokumenten standardmäßig verwendet.",
    measurementSystem: "US-amerikanisches Maßsystem",
    commonUses: "Dichte von Kraftstoffen und chemischen Flüssigkeiten, Berechnungen in der Erdölindustrie (USA)",
  },
  "slug-fitkup": {
    name: "Slug pro Kubikfuß",
    slug: "slug-pro-kubikfuss",
    categoryName: "Dichte",
    shortDescription:
      "Slug pro Kubikfuß ist eine Einheit zur Angabe der Massendichte im britischen Ingenieur-Maßsystem; Slug ist die in diesem System dem Newton entsprechende Masseneinheit für Pound-Force.",
    historySummary:
      "Die Einheit Slug wurde Ende des 19. Jahrhunderts definiert, damit die Beziehung F=ma im britischen Ingenieursystem mit Pound-Force und Fuß pro Sekundequadrat konsistent funktioniert; sie wird in der Luftfahrttechnik und Strömungsmechanik (besonders in US-amerikanischer Fachliteratur) verwendet.",
    measurementSystem: "Britisches Ingenieur-Maßsystem",
    commonUses: "Luftfahrttechnik, Strömungsmechanik (US-amerikanische Fachliteratur)",
  },
  "kental": {
    name: "Doppelzentner",
    slug: "doppelzentner",
    categoryName: "Masse",
    shortDescription:
      "Der Doppelzentner (Kental) ist eine Masseneinheit, die 100 Kilogramm entspricht. In der Türkei wird er vor allem zur Angabe landwirtschaftlicher Erträge und Erntemengen verwendet.",
    historySummary:
      "Der Doppelzentner geht auf das lateinische 'centum' (hundert) zurück und gelangte über das Französische in den türkischen Sprachgebrauch; im metrischen System ist er fest auf 100 Kilogramm festgelegt. Dass das türkische Landwirtschaftsministerium und das Statistikamt TÜİK Ertragsstatistiken für Getreide, Baumwolle und andere Pflanzenprodukte in 'Doppelzentner pro Dekar' angeben, hat diese Einheit zu einem im türkischen Agrarsektor täglich gebräuchlichen Maß gemacht.",
    measurementSystem: "Metrisches System (französischen Ursprungs, im Agrarsektor gebräuchlich)",
    commonUses: "Landwirtschaftliche Ertragsberichte in der Türkei (Doppelzentner/Dekar), Getreide- und Erntemengenmessung",
  },
  "stone": {
    name: "Stone",
    slug: "stone",
    categoryName: "Masse",
    shortDescription:
      "Stone (st) ist eine besonders im Vereinigten Königreich und in Irland zur Angabe des Körpergewichts verwendete Masseneinheit. 1 Stone entspricht 14 Pfund (6,35029318 kg).",
    historySummary:
      "Stone entstand im mittelalterlichen England als Einheit, die auf Steingewichten zum Wiegen von Wolle und landwirtschaftlichen Produkten beruhte, und wurde durch das Gewichts- und Maßgesetz von 1835 offiziell auf 14 Pfund festgelegt. Obwohl heute auf das metrische System umgestellt, wird das menschliche Körpergewicht im Vereinigten Königreich und in Irland umgangssprachlich und im medizinischen Kontext weiterhin häufig in Stone angegeben (etwa '12 Stone 5 Pfund').",
    measurementSystem: "Britisches Maßsystem (Imperial)",
    commonUses: "Angabe des Körpergewichts im Vereinigten Königreich und in Irland, Gewichtsklassenangabe in Sportarten wie Boxen und Ringen",
  },
  "grain": {
    name: "Grain",
    slug: "grain",
    categoryName: "Masse",
    shortDescription:
      "Grain ist eine historische Masseneinheit, die heute vor allem zur Angabe des Gewichts von Geschossen/Pulverladungen sowie von Pfeilen im Bogensport verwendet wird. 1 Grain entspricht etwa 64,8 Milligramm.",
    historySummary:
      "Grain ist nach dem Durchschnittsgewicht eines Gerstenkorns benannt und wird seit dem Mittelalter als kleinste Masseneinheit des britischen Maßsystems verwendet. Trotz der Verbreitung des metrischen Systems hat sie sich in der Munitionsindustrie als internationaler Standard erhalten.",
    measurementSystem: "Britisches/US-amerikanisches Maßsystem (Imperial/US Customary)",
    commonUses: "Geschoss- und Pulvergewicht, Pfeilgewicht im Bogensport, manche Goldschmiedewaagen",
  },
  "dalton": {
    name: "Dalton",
    slug: "dalton",
    categoryName: "Masse",
    shortDescription:
      "Dalton (Da) ist eine extrem kleine Masseneinheit zur Angabe der Masse von Atomen und Molekülen; sie entspricht einem Zwölftel der Masse eines Kohlenstoff-12-Atoms.",
    historySummary:
      "1803 schlug John Dalton vor, zur Messung von Atommassen die Masse des Wasserstoffatoms als natürliche Referenz zu verwenden. 1898 schlugen Wilhelm Ostwald und Kollegen vor, die Referenz auf ein Sechzehntel der Masse des Sauerstoffatoms umzustellen, da diese experimentell leichter zu messen war; dies wurde 1903 offiziell übernommen. Auf Vorschlag des Physikers Alfred Nier wurde die Referenz 1957 auf Kohlenstoff-12 verschoben -- diese Änderung wurde 1960 (IUPAP) und 1961 (IUPAC) offiziell, und die Einheit erhielt den Namen 'vereinheitlichte atomare Masseneinheit' (Symbol: u), um sie von der alten sauerstoffbasierten Definition zu unterscheiden. 1993 schlug die IUPAC den kürzeren Namen 'Dalton' vor, der 2005 von der IUPAP bestätigt und 2006 offiziell in die SI-Referenzquellen der BIPM aufgenommen wurde.",
    measurementSystem: "Spezielle Masseneinheit in Chemie und Physik",
    commonUses: "Atom- und Molekülmasse, Protein-/Biomolekülmasse, Chemie und Biochemie",
  },
  "miskal": {
    name: "Miskal",
    slug: "miskal",
    categoryName: "Masse",
    shortDescription:
      "Miskal ist eine im Osmanischen Reich für präzisionsbedürftige Substanzen wie Gold, Silber und wertvolle Arzneimittel verwendete Masseneinheit. 1 Miskal entspricht genau 1,5 Dirhem (4,81104375 Gramm).",
    historySummary:
      "Miskal hat im islamischen Recht und im osmanischen Maßsystem eine lange Geschichte und wurde in 24 Karat oder 96 Weizenkörner unterteilt. Die osmanische Maß- und Eichverordnung vom 26. September 1869 legte 1 Miskal exakt auf 1,5 Dirhem (4,81104375 g) fest. In der Goldschmiedekunst wird das Goldgewicht gelegentlich noch heute in Miskal angegeben.",
    measurementSystem: "Traditionelle osmanische Masseneinheit (nicht mehr in Gebrauch)",
    commonUses: "Wiegen von Gold/Silber und wertvollen Arzneimitteln im Osmanischen Reich; heute bei manchen Goldschmieden als traditionelle Referenz für Goldgewicht",
  },
  "batman": {
    name: "Batman",
    slug: "batman",
    categoryName: "Masse",
    shortDescription:
      "Batman ist eine in Anatolien gebräuchliche traditionelle Gewichtseinheit. Nach dem in jüngerer Zeit im Handel verwendeten Standard entspricht 1 Batman 6 Okka (etwa 7,698 kg); regional konnte er jedoch stark zwischen 2 und 8 Okka variieren.",
    historySummary:
      "Der Name Batman wird mit einem in Dîvânü Lugâti't-Türk belegten anatolischen Volksbegriff in Verbindung gebracht, der 'groß, schwer; großer Krug/Gefäß' bedeutet. Im 16./17. Jahrhundert entsprach das in der Apothekerkunst verwendete Batman 266 Dirhem, während sich in jüngerer Zeit im anatolischen Handel der Standard von 6 Okka durchsetzte; mit einer Verordnung von 1881 wurde das 'neue Batman' exakt auf 10 Kilogramm festgelegt.",
    measurementSystem: "Regional unterschiedliche, traditionelle anatolische Masseneinheit (nicht mehr in Gebrauch)",
    commonUses: "Traditionelle Gewichtseinheit beim Handel mit landwirtschaftlichen Produkten (besonders Wolle, Baumwolle) in Anatolien",
  },
  "troy-ons": {
    name: "Feinunze",
    slug: "feinunze",
    categoryName: "Masse",
    shortDescription:
      "Die Feinunze (Troy-Unze) ist eine spezielle Masseneinheit, die auf internationalen Märkten zum Wiegen von Edelmetallen wie Gold, Silber und Platin verwendet wird. Sie darf nicht mit der im Alltag bekannten Unze (Avoirdupois-Unze, 28,35 g) verwechselt werden; die Feinunze entspricht genau 31,1034768 Gramm.",
    historySummary:
      "Das Troy-Gewichtssystem ist nach der französischen Stadt Troyes benannt, die im Mittelalter ein bedeutendes Handelsmessezentrum war. Dieses unter Edelmetall- und Schmuckhändlern verbreitete System wurde in England zum offiziellen Standard der königlichen Münzstätte und des Edelmetallhandels und ist bis heute die offizielle Einheit der weltweiten Gold- und Silbermärkte (einschließlich des Londoner Bullion Market).",
    measurementSystem: "Troy-Gewichtssystem (Standard des Edelmetallhandels)",
    commonUses: "Preisbildung für Gold, Silber und Platin, Barren- und Börsengeschäfte, internationaler Preisvergleich in der Schmuckbranche",
  },
  "karat": {
    name: "Karat",
    slug: "karat",
    categoryName: "Masse",
    shortDescription:
      "Karat ist eine Masseneinheit zur Angabe des Gewichts von Edelsteinen wie Diamanten, Rubinen und Smaragden. 1 Karat entspricht genau 0,2 Gramm (200 Milligramm). Es ist nicht mit dem Begriff 'Feingehalt' (Goldkarat) zu verwechseln, der die Goldreinheit angibt -- Karat ist hier ein Gewicht, Feingehalt dagegen ein Reinheitsverhältnis.",
    historySummary:
      "Karat ist nach den Samen des Johannisbrotbaums (Carob) benannt; da das Gewicht dieser Samen recht konstant ist, dienten sie in früheren Zeiten als natürliche Referenz zum Wiegen von Edelsteinen. 1907 wurde das 'metrische Karat' durch ein internationales Abkommen auf 0,2 Gramm standardisiert und weltweit übernommen.",
    measurementSystem: "Internationaler Schmuck-/Edelsteinstandard (metrisches Karat)",
    commonUses: "Gewicht von Diamanten und Farbedelsteinen, Schmuckzertifizierung und -bewertung",
  },
  "kibibit": {
    name: "Kibibit",
    slug: "kibibit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Kibibit (Kibit) ist eine auf dem binären Zahlensystem beruhende Dateneinheit; 1 Kibibit entspricht genau 1024 Bit -- im Unterschied zum dezimalen 'Kilobit' (1000 Bit).",
    historySummary:
      "Da Computerspeicher naturgemäß im binären System (Zweierpotenzen) arbeitet, wurde 'Kilobit' früher sowohl für 1000 Bit als auch in der Praxis häufig für 1024 Bit verwendet -- diese Mehrdeutigkeit führte besonders bei Streitigkeiten über Speicherkapazitäten (Hersteller rechnen dezimal, Betriebssysteme binär) zu Verwirrung. Die Internationale Elektrotechnische Kommission (IEC) verabschiedete 1998 zur Behebung dieser Mehrdeutigkeit den Standard der binären Vorsilben 'Kibi', 'Mebi', 'Gibi', 'Tebi' -- der Name 'Kibibit' ist die Abkürzung von 'kilobinary bit'. Dadurch konnte klar unterschieden werden: 'Kilobit' bedeutet nun ausschließlich dezimal (1000 Bit), 'Kibibit' ausschließlich binär (1024 Bit).",
    measurementSystem: "IEC-Standard für binäre Vorsilben",
    commonUses: "Netzwerkbandbreite, Berechnungen der Speicher-/Datenkapazität (bitbasiert)",
  },
  "mebibit": {
    name: "Mebibit",
    slug: "mebibit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Mebibit (Mibit) ist eine binär basierte Dateneinheit, die 1024 Kibibit (also 1.048.576 Bit) entspricht.",
    historySummary:
      "Mebibit ist Teil der 1998 von der IEC standardisierten Familie binärer Vorsilben ('mega' + Abkürzung von 'binary') und bezeichnet exakt 2²⁰ Bit, im Unterschied zum dezimalen 'Megabit' (1.000.000 Bit). Diese Unterscheidung ist besonders bei Diskussionen über Datenspeicherung und Netzwerkgeschwindigkeit wichtig, da der Unterschied zwischen beiden Definitionen mit steigender Größenordnung prozentual zunimmt.",
    measurementSystem: "IEC-Standard für binäre Vorsilben",
    commonUses: "Netzwerkbandbreite, Berechnungen der Speicherkapazität (bitbasiert)",
  },
  "gibibit": {
    name: "Gibibit",
    slug: "gibibit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Gibibit (Gibit) ist eine binär basierte Dateneinheit, die 1024 Mebibit (also 1.073.741.824 Bit) entspricht.",
    historySummary:
      "Gibibit wurde als Teil des IEC-Standards von 1998 definiert, um es vom dezimalen 'Gigabit' (1.000.000.000 Bit) abzugrenzen; es entspricht exakt 2³⁰ Bit. Netzwerkgerätehersteller (etwa bei 1-Gigabit-Ethernet) verwenden meist die dezimale Definition, während Betriebssysteme und manche Hardwareangaben die binäre Definition (Gibibit) bevorzugen -- das kann bei Nutzern zu der Verwunderung führen, warum die angezeigte Geschwindigkeit von der erwarteten abweicht.",
    measurementSystem: "IEC-Standard für binäre Vorsilben",
    commonUses: "Hochgeschwindigkeits-Netzwerkverbindungen, Berechnungen der Serverspeicherkapazität",
  },
  "tebibit": {
    name: "Tebibit",
    slug: "tebibit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Tebibit (Tibit) ist eine binär basierte Dateneinheit, die 1024 Gibibit (also etwa 1,1 Billionen Bit) entspricht.",
    historySummary:
      "Tebibit gehört zu den größten gebräuchlichen Einheiten mit binärer Vorsilbe des IEC-Standards von 1998; zur Abgrenzung vom dezimalen 'Terabit' ist es exakt als 2⁴⁰ Bit definiert. In Rechenzentren und großen Speichersystemen ist eine korrekte Unterscheidung besonders wichtig, da der Unterschied zwischen dezimaler und binärer Definition (etwa 10 %) einem erheblichen Kapazitätsunterschied entsprechen kann.",
    measurementSystem: "IEC-Standard für binäre Vorsilben",
    commonUses: "Kapazitätsplanung in Rechenzentren, große Speichersysteme",
  },
  "kilobit": {
    name: "Kilobit",
    slug: "kilobit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Kilobit (kbit) ist eine dezimal basierte Dateneinheit, die 1000 Bit entspricht; sie wird meist zur Angabe von Datenübertragungsraten verwendet.",
    historySummary:
      "Kilobit ist gemäß dem dezimalen SI-Vorsilbensystem definiert und gilt in Netzwerk-/Telekommunikationsstandards (IEEE, IEC) offiziell als 1000 Bit für die Messung von Datenübertragungsraten -- das unterscheidet sich von der historisch bei Speicherkapazitäten verwendeten binären (1024 Bit) Auslegung. In der Modem-Ära (1990er-Jahre) wurde 'kbit/s' (Kilobit pro Sekunde) zur Standardangabe der Verbindungsgeschwindigkeit, eine Verwendung, die bis heute anhält.",
    measurementSystem: "Dezimales SI-Vorsilbensystem",
    commonUses: "Internetverbindungsgeschwindigkeit (kbit/s), alte Modemgeschwindigkeiten, Audio-/Datenströme mit niedriger Bitrate",
  },
  "megabit": {
    name: "Megabit",
    slug: "megabit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Megabit (Mbit) ist eine dezimal basierte Dateneinheit, die 1.000.000 Bit entspricht; sie ist die Standardeinheit für Ergebnisse von Internetgeschwindigkeitstests (Mbit/s).",
    historySummary:
      "Megabit ist die Standardeinheit, mit der Internetanbieter ihre Verbindungsgeschwindigkeiten bewerben, und wird häufig mit dem für Dateigrößen verwendeten Megabyte (MB) verwechselt -- dabei gilt 1 Megabyte = 8 Megabit. Diese Verwechslung ist so verbreitet, dass Fragen wie 'ich habe 100 Mbit/s Internet, warum ist meine Downloadgeschwindigkeit nur 12,5 MB/s' zu den häufigsten Fragen in Internetforen zählen; die Unterscheidung besteht seit dem IEEE-802.3-Ethernet-Standard (1980er-Jahre).",
    measurementSystem: "Dezimales SI-Vorsilbensystem",
    commonUses: "Internetverbindungsgeschwindigkeit (Mbit/s), Glasfaser-/DSL-Geschwindigkeitstests, Bitraten beim Video-Streaming",
  },
  "gigabit": {
    name: "Gigabit",
    slug: "gigabit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Gigabit (Gbit) ist eine dezimal basierte Dateneinheit, die 1.000.000.000 Bit entspricht; sie ist das Standardmaß für Glasfaserinternet- und lokale Netzwerkgeschwindigkeiten (Ethernet).",
    historySummary:
      "Mit dem Gigabit-Ethernet-Standard (IEEE 802.3z, 1998) verbreitete sich der Begriff 'Gigabit' in der Vermarktung von Netzwerkhardware (Switches, Karten); ab den 2010er-Jahren wurde er auch zur Standardangabe bei der Bewerbung von Glasfaser-Internetinfrastruktur (GPON, Gigabit-Glasfaser).",
    measurementSystem: "Dezimales SI-Vorsilbensystem",
    commonUses: "Glasfaser-Internetgeschwindigkeit (Gbit/s), Gigabit-Ethernet-Netzwerkhardware, Verbindungsgeschwindigkeiten in Rechenzentren",
  },
  "terabit": {
    name: "Terabit",
    slug: "terabit",
    categoryName: "Datenspeicher",
    shortDescription:
      "Terabit (Tbit) ist eine dezimal basierte Dateneinheit, die 1.000.000.000.000 Bit entspricht; sie wird bei großen Netzwerk-Backbones und Rechenzentrumsverbindungen verwendet.",
    historySummary:
      "Die Einheit Terabit wird verwendet, um die gesamte Datenübertragungskapazität der Internet-Backbone-Infrastruktur anzugeben -- die Kapazität von Unterseeglasfaserkabeln wird beispielsweise meist in Terabit pro Sekunde (Tbit/s) angegeben; die ersten Unterseekabel mit Kapazitäten im Multi-Terabit-Bereich gingen Mitte der 2010er-Jahre in Betrieb.",
    measurementSystem: "Dezimales SI-Vorsilbensystem",
    commonUses: "Unterseekabel-/Backbone-Glasfaserkapazität, große Netzwerkinfrastruktur in Rechenzentren",
  },
  "santimetre-saniyekare": {
    name: "Zentimeter pro Sekundequadrat",
    slug: "zentimeter-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Zentimeter pro Sekundequadrat ist eine metrische Untereinheit, die Beschleunigung in Zentimetern ausdrückt; sie dient der praktischen Darstellung kleinerer Beschleunigungswerte als Meter pro Sekundequadrat.",
    historySummary:
      "Die Einheit leitet sich aus den metrischen Basiseinheiten Länge (Zentimeter) und Zeit (Sekunde) ab und steht in direktem Zusammenhang mit der CGS-basierten Beschleunigungseinheit Gal (1 Gal = 1 cm/s²).",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Seismologie (Erdbebenbeschleunigung), CGS-basierte physikalische Berechnungen",
  },
  "milimetre-saniyekare": {
    name: "Millimeter pro Sekundequadrat",
    slug: "millimeter-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Millimeter pro Sekundequadrat ist eine präzise metrische Untereinheit zur Angabe sehr kleiner Beschleunigungsänderungen.",
    historySummary:
      "Die Einheit entstand aus dem Bedarf der Schwingungsanalyse und hochpräziser Messgeräte, deutlich kleinere Beschleunigungswerte als Meter pro Sekundequadrat mit aussagekräftigen Zahlen darzustellen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Schwingungsanalyse, Kalibrierung präziser Sensoren",
  },
  "kilometre-saniyekare": {
    name: "Kilometer pro Sekundequadrat",
    slug: "kilometer-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Kilometer pro Sekundequadrat ist eine metrische Vielfacheinheit zur Angabe sehr hoher Beschleunigungen, etwa bei Raketen und Raumfahrzeugen.",
    historySummary:
      "Die Einheit leitet sich von der großräumigen metrischen Entfernungseinheit Kilometer ab und ermöglicht es, in der Raumfahrttechnik große Beschleunigungswerte mit kleineren Zahlen anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Beschleunigung von Raketen und Raumfahrzeugen, ballistische Berechnungen",
  },
  "inc-saniyekare": {
    name: "Zoll pro Sekundequadrat",
    slug: "zoll-pro-sekundequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Zoll pro Sekundequadrat ist eine im britischen und amerikanischen Maßsystem verwendete Beschleunigungseinheit, die besonders in US-amerikanischen maschinenbautechnischen Berechnungen vorkommt.",
    historySummary:
      "Die Einheit ergibt sich aus der Division der britischen Längeneinheit Zoll durch das Quadrat der Zeit; sie wird in industriellen Konstruktionsnormen der USA verwendet, die nicht vollständig auf das metrische System umgestellt haben.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Maschinenbau (US-Normen), Mechanismenkonstruktion",
  },
  "metre-dakikakare": {
    name: "Meter pro Minutequadrat",
    slug: "meter-pro-minutequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Meter pro Minutequadrat ist eine metrische Einheit zur Angabe der Beschleunigung langsam bewegter Systeme wie Aufzügen oder Förderbändern.",
    historySummary:
      "Die Einheit ergibt sich aus der Division der metrischen Basislängeneinheit durch das Quadrat der in Minuten gemessenen Zeit und ermöglicht eine praktische Darstellung niedriger Beschleunigungswerte.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Auslegung von Aufzugs- und Fördersystemen, industrielle Automatisierung",
  },
  "fit-dakikakare": {
    name: "Fuß pro Minutequadrat",
    slug: "fuss-pro-minutequadrat",
    categoryName: "Beschleunigung",
    shortDescription:
      "Fuß pro Minutequadrat ist eine im britischen Maßsystem verwendete Einheit zur Angabe der Beschleunigung langsam bewegter Systeme wie Aufzüge und Förderbänder.",
    historySummary:
      "Die Einheit ergibt sich aus der Division der britischen Längeneinheit Fuß durch das Quadrat der in Minuten gemessenen Zeit und liefert praktische Werte für die Konstruktion langsam laufender Industrieanlagen.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Auslegung von Aufzugs- und Fördersystemen (US-Normen)",
  },
  "gal-ivme": {
    name: "Gal (Beschleunigung)",
    slug: "gal-beschleunigung",
    categoryName: "Beschleunigung",
    shortDescription:
      "Gal ist eine Einheit des CGS-Systems zur Angabe von Beschleunigung, besonders bei Messungen der Erdbeschleunigung und Erdbebenbeschleunigung; benannt nach Galileo Galilei.",
    historySummary:
      "Die Einheit wurde in Anlehnung an Galileis Fallexperimente benannt und wird seit dem 19. Jahrhundert in Geophysik und Seismologie als Standard-CGS-Einheit für Messungen der Erdbeschleunigung verwendet.",
    measurementSystem: "CGS-System (Zentimeter-Gramm-Sekunde)",
    commonUses: "Seismologie (Erdbebenbeschleunigungsmessung), geophysikalische Schweremessungen",
  },
  "kilometre-saniye": {
    name: "Kilometer pro Sekunde",
    slug: "kilometer-pro-sekunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Kilometer pro Sekunde ist eine metrische Geschwindigkeitseinheit zur Angabe sehr hoher Geschwindigkeiten, etwa von Satelliten, Raketen oder Himmelskörpern.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der großen metrischen Entfernungseinheit Kilometer zur Sekunde; sie ermöglicht in Raumfahrt und Astronomie eine praktische Darstellung großer Werte wie Fluchtgeschwindigkeit oder Bahngeschwindigkeit.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Geschwindigkeit von Raumfahrzeugen und Satelliten, Astronomie, ballistische Berechnungen",
  },
  "fit-saniye": {
    name: "Fuß pro Sekunde",
    slug: "fuss-pro-sekunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Fuß pro Sekunde ist eine im britischen und amerikanischen Maßsystem verwendete Geschwindigkeitseinheit, die besonders in den USA bei Geschossgeschwindigkeit und Strömungsgeschwindigkeit verwendet wird.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der britischen Längeneinheit Fuß zur Sekunde und ist eine aus den USA stammende Standardgeschwindigkeitseinheit in Ballistik und Luftfahrttechnik.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Geschossgeschwindigkeit (Ballistik), Strömungsgeschwindigkeit, US-amerikanische Luftfahrttechnik",
  },
  "metre-dakika": {
    name: "Meter pro Minute",
    slug: "meter-pro-minute",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Meter pro Minute ist eine metrische Einheit zur Angabe der Geschwindigkeit langsam bewegter Systeme wie Förderbändern und Laufstegen.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der metrischen Basislängeneinheit zur in Minuten gemessenen Zeit und liefert in Katalogen industrieller Anlagen praktische Werte.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Förderbandgeschwindigkeit, Textilmaschinen, Geschwindigkeit von Laufstegen und Rolltreppen",
  },
  "kilometre-dakika": {
    name: "Kilometer pro Minute",
    slug: "kilometer-pro-minute",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Kilometer pro Minute ist eine im Alltag weniger gebräuchliche metrische Geschwindigkeitseinheit zur Angabe mittlerer bis hoher Geschwindigkeiten (etwa von Zügen oder Flugzeugen).",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der Einheit Kilometer zur in Minuten gemessenen Zeit und wird in manchen sportlichen und verkehrstechnischen Berechnungen als alternative Geschwindigkeitsangabe verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Berechnungen von Zug- und Flugzeuggeschwindigkeit, Sportwissenschaft (Tempoanalysen)",
  },
  "santimetre-saniye": {
    name: "Zentimeter pro Sekunde",
    slug: "zentimeter-pro-sekunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Zentimeter pro Sekunde ist eine metrische Einheit zur präzisen Angabe niedriger Geschwindigkeiten, etwa bei Laborströmungsversuchen oder kleinen Robotiksystemen.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der kleinskaligen metrischen Längeneinheit zur Sekunde und begegnet häufig auch in CGS-basierten wissenschaftlichen Messungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Laborströmungsversuche, Geschwindigkeit kleiner Robotik- und Mechanismensysteme",
  },
  "radyan-dakika": {
    name: "Radiant pro Minute",
    slug: "radiant-pro-minute",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Radiant pro Minute ist eine metrische Einheit der Winkelgeschwindigkeit (Drehgeschwindigkeit), die zur praktischen Darstellung langsamerer Drehbewegungen als Radiant pro Sekunde verwendet wird.",
    historySummary:
      "Die Einheit ist die minutenbezogene Ausdrucksform der grundlegenden SI-Winkelgeschwindigkeitseinheit Radiant pro Sekunde und erleichtert die Analyse langsam drehender Mechanismen wie Uhrwerke.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Analyse langsam drehender Mechanismen, Gelenkbewegungen in der Robotik",
  },
  "radyan-saat": {
    name: "Radiant pro Stunde",
    slug: "radiant-pro-stunde",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Radiant pro Stunde ist eine Einheit zur Angabe sehr langsamer Dreh- oder Winkelbewegungen, etwa bei Planetenrotationen oder geologischen Prozessen.",
    historySummary:
      "Die Einheit ist die stundenbezogene Ausdrucksform der grundlegenden SI-Winkelgeschwindigkeitseinheit und ermöglicht es, Winkelbewegungen auf sehr langen Zeitskalen wie in Astronomie und Geologie mit aussagekräftigen Zahlen darzustellen.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Astronomische Rotationsbewegungen, Analyse geologischer Prozesse",
  },
  "devir-saniye-acisal": {
    name: "Umdrehung pro Sekunde",
    slug: "umdrehung-pro-sekunde",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Umdrehung pro Sekunde ist eine Winkelgeschwindigkeitseinheit, die angibt, wie viele volle Umdrehungen eine Drehbewegung pro Sekunde vollzieht; sie ist das Sekunden-Äquivalent von U/min.",
    historySummary:
      "Obwohl die Einheit denselben Zahlenwert wie die Frequenzeinheit Hertz besitzt, wird sie im Kontext der Winkelgeschwindigkeit begrifflich eigenständig als 'Umdrehungen pro Sekunde' verwendet; in der Motoren- und Turbinentechnik dient sie als Alternative zu U/min.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Motor- und Turbinendrehzahl, Maschinenbau für rotierende Anlagen",
  },
  "derece-dakika": {
    name: "Grad pro Minute",
    slug: "grad-pro-minute",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Grad pro Minute ist eine praktische Einheit zur Angabe der Winkelgeschwindigkeit in Grad; sie ist bei Uhrwerken sowie Antennen- und Kameraschwenksystemen gebräuchlich.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis der im Alltag intuitiveren Winkeleinheit Grad zur in Minuten gemessenen Zeit und ist ein praktisches Maß in Navigation und optischer Systemverfolgung.",
    measurementSystem: "Nicht-SI-Einheit, in der Winkelmessung gebräuchlich",
    commonUses: "Antennen- und Kameraschwenksysteme, Radarverfolgungssysteme",
  },
  "derece-saat": {
    name: "Grad pro Stunde",
    slug: "grad-pro-stunde",
    categoryName: "Winkelgeschwindigkeit",
    shortDescription:
      "Grad pro Stunde ist eine Einheit zur Angabe sehr langsamer Winkelbewegungen (etwa der Schattenbewegung einer Sonnenuhr oder Planetenrotationen) in Grad.",
    historySummary:
      "Die Einheit ergibt sich aus dem Verhältnis von Grad zur in Stunden gemessenen Zeit und wird auch zur Beschreibung der scheinbaren Bewegung der Sonne am Himmel (etwa 15°/Stunde) verwendet.",
    measurementSystem: "Nicht-SI-Einheit, in der Winkelmessung gebräuchlich",
    commonUses: "Sonnenuhr- und Schattenbewegungsberechnungen, sehr langsame Drehsysteme",
  },
  "megapascal": {
    name: "Megapascal",
    slug: "megapascal",
    categoryName: "Druck",
    shortDescription:
      "Megapascal (MPa) ist eine Druckeinheit, die 1.000.000 Pascal entspricht und zu den in Materialfestigkeit und technischen Berechnungen am häufigsten verwendeten Druckeinheiten zählt.",
    historySummary:
      "Megapascal hat sich als SI-Standardeinheit zur Angabe von Betondruckfestigkeit (etwa C25-Beton = 25 MPa), Stahlstreckgrenze und anderen Materialfestigkeitswerten weltweit im Bauwesen und der Werkstoffkunde durchgesetzt; da 1 MPa genau 1 N/mm² entspricht, ist es zu einer praktischen Einheit für technische Berechnungen geworden.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Festigkeitswerte von Beton und Stahl, Werkstofftechnik, Auslegung von Druckbehältern",
  },
  "hektopascal": {
    name: "Hektopascal",
    slug: "hektopascal",
    categoryName: "Druck",
    shortDescription:
      "Hektopascal (hPa) ist eine Druckeinheit, die 100 Pascal entspricht, und der internationale Standard zur Angabe des Luftdrucks in der Meteorologie.",
    historySummary:
      "Hektopascal wurde von der Weltorganisation für Meteorologie als SI-konformes Äquivalent der alten Einheit 'Millibar' übernommen (1 hPa = 1 mbar) und wird heute standardmäßig in Wetterberichten, Druckkarten und an Barometern verwendet; der mittlere Luftdruck auf Meereshöhe beträgt etwa 1013,25 hPa.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Wetterberichte, meteorologische Druckmessung, Barometerablesungen",
  },
  "teknik-atmosfer": {
    name: "Technische Atmosphäre",
    slug: "technische-atmosphaere",
    categoryName: "Druck",
    shortDescription:
      "Die technische Atmosphäre ist eine besonders in europäischer und ehemals sowjetischer technischer Fachliteratur verwendete Druckeinheit, die Kilogramm-Kraft pro Quadratzentimeter entspricht.",
    historySummary:
      "Die Einheit wurde Anfang des 20. Jahrhunderts als praktische Druckreferenz für technische Berechnungen definiert und beruht, im Unterschied zur physikalischen Standardatmosphäre, auf einem runden Wert (1 kgf/cm²).",
    measurementSystem: "Technisches/ingenieurwissenschaftliches Einheitensystem (Nicht-SI)",
    commonUses: "Europäische und ehemals sowjetische technische Dokumente, Auslegung von Druckbehältern",
  },
  "milimetre-su-sutunu": {
    name: "Millimeter Wassersäule",
    slug: "millimeter-wassersaeule",
    categoryName: "Druck",
    shortDescription:
      "Millimeter Wassersäule ist eine Druckeinheit zur präzisen Angabe geringer Druckunterschiede, besonders in Lüftungskanälen.",
    historySummary:
      "Die Einheit stammt aus der traditionellen Druckmessung über die Höhe einer Flüssigkeitssäule (ähnlich der Quecksilbersäulenmessung); da Wasser deutlich leichter ist als Quecksilber, lassen sich damit niedrige Drücke präziser darstellen.",
    measurementSystem: "Nicht-SI-Einheit, gebräuchlich in HLK- und Lüftungstechnik",
    commonUses: "HLK- und Lüftungskanaldruck, Messung geringer Druckunterschiede",
  },
  "torr": {
    name: "Torr",
    slug: "torr",
    categoryName: "Druck",
    shortDescription:
      "Torr ist eine besonders in Vakuumtechnik und Laborumgebungen verwendete Druckeinheit, die praktisch nahezu identisch mit Millimeter Quecksilbersäule ist.",
    historySummary:
      "Die Einheit ist nach dem italienischen Physiker Evangelista Torricelli benannt, der das Barometerprinzip 1644 vorstellte (dokumentiert in einem Brief vom 11. Juni 1644 an Michelangelo Ricci). Ursprünglich war Torr als '1 Millimeter Quecksilbersäule bei 0 °C' definiert, doch da die Erdanziehung je nach Ort variiert, war diese Definition unscharf; deshalb wurde der Standardluftdruck auf '760 Millimeter Quecksilber bei 0 °C' festgelegt. 1954 definierte die 10. Generalkonferenz für Maß und Gewicht den Luftdruck exakt auf 101.325 Pascal neu, und Torr erhielt als 1/760 dieses Werts eine von Messungen unabhängige, exakte Definition. Der Unterschied zwischen Torr und Millimeter Quecksilbersäule liegt bei weniger als einem Millionstel (etwa 0,000015 %) und beide werden in der Praxis synonym verwendet.",
    measurementSystem: "Spezielle Druckeinheit in Vakuumtechnik und Laboren",
    commonUses: "Vakuumpumpen, Labordruckmessungen, Halbleiterfertigung",
  },
  "kilonewton": {
    name: "Kilonewton",
    slug: "kilonewton",
    categoryName: "Kraft",
    shortDescription:
      "Kilonewton ist eine SI-Einheit, die dem Tausendfachen des Newton entspricht und zur Angabe großer Kraftwerte (Baulasten, Triebwerksschub) verwendet wird.",
    historySummary:
      "Die Einheit leitet sich vom grundlegenden SI-Kraftmaß Newton ab (benannt nach Isaac Newton) und ermöglicht es, Lastberechnungen im Bau- und Ingenieurwesen mit praktischen Zahlenwerten auszudrücken.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Lastberechnungen im Bauwesen, Bauingenieurwesen, Triebwerksschubkraft",
  },
  "dyn": {
    name: "Dyn",
    slug: "dyn",
    categoryName: "Kraft",
    shortDescription:
      "Dyn ist die grundlegende Krafteinheit des CGS-Systems (Zentimeter-Gramm-Sekunde) und gibt im Vergleich zum Newton sehr kleine Kräfte an.",
    historySummary:
      "Die Einheit stammt aus der Zeit, als das CGS-System im 19. Jahrhundert vor dem SI-System als physikalischer Standard galt; heute findet man sie hauptsächlich in älterer wissenschaftlicher Literatur und bei manchen Labormessungen.",
    measurementSystem: "CGS-System (Zentimeter-Gramm-Sekunde)",
    commonUses: "Messungen der Oberflächenspannung, ältere physikalische Fachliteratur, Labormessungen kleinster Kräfte",
  },
  "pound-kuvvet": {
    name: "Pound-Force",
    slug: "pound-force",
    categoryName: "Kraft",
    shortDescription:
      "Pound-Force ist die im britischen und amerikanischen Maßsystem verwendete Krafteinheit; sie entspricht der Kraft, die eine Masse von einem Pfund bei der Standard-Erdbeschleunigung ausübt.",
    historySummary:
      "Die begriffliche Unterscheidung zwischen der Masseneinheit Pfund und der Krafteinheit Pound-Force wurde im 20. Jahrhundert klargestellt, um Verwechslungen bei technischen Berechnungen zu vermeiden.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Luft- und Raumfahrttechnik (Schubkraft), US-amerikanische Baustatikberechnungen",
  },
  "kilonewton-metre": {
    name: "Kilonewtonmeter",
    slug: "kilonewtonmeter",
    categoryName: "Drehmoment",
    shortDescription:
      "Kilonewtonmeter ist eine SI-Einheit, die dem Tausendfachen des Newtonmeters entspricht und zur Angabe großer Drehmomentwerte verwendet wird.",
    historySummary:
      "Die Einheit entstand aus dem praktischen Messbedarf großer Industriemaschinen (etwa Nutzfahrzeugmotoren, Windkraftanlagen) für die Einheit Newtonmeter.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Drehmoment schwerer Maschinen und Motoren, Berechnungen im Bauingenieurwesen",
  },
  "pound-fit-saniye": {
    name: "Pfund-Fuß pro Sekunde",
    slug: "pfund-fuss-pro-sekunde",
    categoryName: "Impuls",
    shortDescription:
      "Pfund-Fuß pro Sekunde ist eine im britischen Maßsystem verwendete Einheit zur Angabe des linearen Impulses (Masse × Geschwindigkeit).",
    historySummary:
      "Die Einheit ergibt sich aus dem Produkt der britischen Masseneinheit Pfund und der Geschwindigkeitseinheit Fuß pro Sekunde und wird in aus den USA stammenden Berechnungen des Maschinenbaus und der Ballistik verwendet.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Ballistische Berechnungen, US-amerikanischer Maschinenbau",
  },
  "milipaskal-saniye": {
    name: "Millipascalsekunde",
    slug: "millipascalsekunde",
    categoryName: "Viskosität",
    shortDescription:
      "Millipascalsekunde ist eine SI-Untereinheit zur Angabe der dynamischen Viskosität, die zahlenmäßig genau der Einheit Centipoise entspricht; sie wird zur Messung niedrigviskoser Flüssigkeiten wie Wasser verwendet.",
    historySummary:
      "Die Einheit ergibt sich als ein Tausendstel der grundlegenden SI-Einheit der dynamischen Viskosität, der Pascalsekunde, und hat sich in der wissenschaftlichen Literatur als SI-Entsprechung der CGS-Einheit Centipoise etabliert.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Messung der Flüssigkeitsviskosität, Chemie- und Lebensmitteltechnik, Rheologie",
  },
  "poise": {
    name: "Poise",
    slug: "poise",
    categoryName: "Viskosität",
    shortDescription:
      "Poise ist die grundlegende Einheit der dynamischen Viskosität im CGS-System (Zentimeter-Gramm-Sekunde), benannt nach dem französischen Physiologen Jean Léonard Marie Poiseuille.",
    historySummary:
      "Die Einheit entstand aus Poiseuilles Arbeiten zur Flüssigkeitsströmung in engen Röhren im 19. Jahrhundert und wird als der gegenüber dem SI älterer Viskositätsstandard des CGS-Systems in der Industrie weiterhin verwendet.",
    measurementSystem: "CGS-System (Zentimeter-Gramm-Sekunde)",
    commonUses: "Erdöl- und Polymerindustrie, Strömungsmechanik (CGS-basierte Fachliteratur)",
  },
  "milimetrekare-saniye": {
    name: "Quadratmillimeter pro Sekunde",
    slug: "quadratmillimeter-pro-sekunde",
    categoryName: "Kinematische Viskosität",
    shortDescription:
      "Quadratmillimeter pro Sekunde ist eine SI-Untereinheit zur Angabe der kinematischen Viskosität, die zahlenmäßig genau der Einheit Zentistokes entspricht.",
    historySummary:
      "Die Einheit ergibt sich als ein Millionstel der grundlegenden SI-Einheit der kinematischen Viskosität, Quadratmeter pro Sekunde, und wird in Normen zur Motoröl- und Flüssigkeitsklassifizierung als SI-Entsprechung von Zentistokes verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Viskositätsklassifizierung von Motoröl, Strömungsmechanik",
  },
  "kilowatt-metre-kelvin": {
    name: "Kilowatt pro Meter-Kelvin",
    slug: "kilowatt-pro-meter-kelvin",
    categoryName: "Wärmeleitfähigkeit",
    shortDescription:
      "Kilowatt pro Meter-Kelvin ist eine SI-Vielfacheinheit zur Angabe der Wärmeleitfähigkeit von Werkstoffen mit hoher Wärmeleitfähigkeit, etwa Metallen.",
    historySummary:
      "Die Einheit leitet sich von der grundlegenden SI-Einheit der Wärmeleitfähigkeit, Watt pro Meter-Kelvin, ab und ermöglicht es, die hohen Leitfähigkeitswerte von Metallen und Legierungen mit kleineren Zahlen anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Wärmeleitfähigkeit von Metallen und Legierungen, Wärmetauschertechnik",
  },
  "watt-santimetre-kelvin": {
    name: "Watt pro Zentimeter-Kelvin",
    slug: "watt-pro-zentimeter-kelvin",
    categoryName: "Wärmeleitfähigkeit",
    shortDescription:
      "Watt pro Zentimeter-Kelvin ist eine abgeleitete SI-Einheit, die Wärmeleitfähigkeit im Zentimetermaßstab angibt und in materialwissenschaftlichen Labormessungen verwendet wird.",
    historySummary:
      "Die Einheit ist die zentimeterbezogene Ausdrucksform der grundlegenden SI-Wärmeleitfähigkeitseinheit und bietet Praktikabilität bei Probenmessungen im Labormaßstab.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Materialwissenschaftliche Labormessungen, thermische Analyse von Halbleitern",
  },
  "kalori-santimetrekare-saniye": {
    name: "Kalorie pro Quadratzentimeter-Sekunde",
    slug: "kalorie-pro-quadratzentimeter-sekunde",
    categoryName: "Wärmestromdichte",
    shortDescription:
      "Kalorie pro Quadratzentimeter-Sekunde ist eine Einheit zur Angabe der Wärmestromdichte (der pro Flächen- und Zeiteinheit übertragenen Wärmeenergie) in einem älteren, auf CGS und Kalorien basierenden System.",
    historySummary:
      "Die Einheit stammt aus der Zeit, als die Kalorie die Standardenergieeinheit für wissenschaftliche Messungen war; heute findet man sie hauptsächlich in älterer meteorologischer Fachliteratur (Sonneneinstrahlung).",
    measurementSystem: "CGS-/kalorienbasiertes System",
    commonUses: "Messung der Sonneneinstrahlung (ältere meteorologische Fachliteratur), Wärmeübertragungsforschung",
  },
  "kilojoule-kilogram-kelvin": {
    name: "Kilojoule pro Kilogramm-Kelvin",
    slug: "kilojoule-pro-kilogramm-kelvin",
    categoryName: "Spezifische Wärmekapazität",
    shortDescription:
      "Kilojoule pro Kilogramm-Kelvin ist die in der Technik am häufigsten verwendete Einheit der spezifischen Wärmekapazität (der Energie, die nötig ist, um die Temperatur einer Masseeinheit eines Werkstoffs um ein Grad zu erhöhen).",
    historySummary:
      "Die Einheit leitet sich von der grundlegenden SI-Einheit der spezifischen Wärmekapazität, Joule pro Kilogramm-Kelvin, ab und liefert in Kilojoule ausgedrückt praktischere Zahlenwerte für technische Berechnungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Thermodynamische technische Berechnungen, Tabellen thermischer Materialeigenschaften",
  },
  "btu-pound-fahrenhayt": {
    name: "BTU pro Pfund-Fahrenheit",
    slug: "btu-pro-pfund-fahrenheit",
    categoryName: "Spezifische Wärmekapazität",
    shortDescription:
      "BTU pro Pfund-Fahrenheit ist eine im britischen und US-amerikanischen Maßsystem verwendete Einheit der spezifischen Wärmekapazität, die in US-amerikanischen thermodynamischen Tabellen gebräuchlich ist.",
    historySummary:
      "Die Einheit ergibt sich aus der Kombination der britischen Wärmeeinheit BTU (British Thermal Unit) mit Pfund und Grad Fahrenheit und wird in der noch nicht vollständig auf das metrische System umgestellten HLK- und Energiebranche der USA als Standard verwendet.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "HLK-Technik, US-amerikanische thermodynamische Berechnungen",
  },
  "kiloamper-metre": {
    name: "Kiloampere pro Meter",
    slug: "kiloampere-pro-meter",
    categoryName: "Magnetfeldstärke",
    shortDescription:
      "Kiloampere pro Meter ist eine SI-Einheit, die dem Tausendfachen von Ampere pro Meter entspricht und zur Angabe starker Magnetfeldstärken verwendet wird.",
    historySummary:
      "Die Einheit leitet sich von der grundlegenden SI-Einheit der Magnetfeldstärke, Ampere pro Meter, ab und liefert bei industriellen Elektromagneten und starken magnetischen Anwendungen praktische Zahlenwerte.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Industrielle Elektromagnete, Prüfung magnetischer Werkstoffe",
  },
  "mikroweber": {
    name: "Mikroweber",
    slug: "mikroweber",
    categoryName: "Magnetischer Fluss",
    shortDescription:
      "Mikroweber ist eine SI-Untereinheit, die einem Millionstel des Weber entspricht und zur Angabe kleiner magnetischer Flusswerte verwendet wird.",
    historySummary:
      "Die Einheit leitet sich von der grundlegenden SI-Einheit des magnetischen Flusses, dem Weber (benannt nach dem deutschen Physiker Wilhelm Eduard Weber), ab und wird bei der Messung des magnetischen Flusses kleiner elektronischer Bauteile (Spulen, Sensoren) verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Entwicklung elektronischer Sensoren und Spulen, Geräte zur Messung des magnetischen Flusses",
  },
  "nanoweber": {
    name: "Nanoweber",
    slug: "nanoweber",
    categoryName: "Magnetischer Fluss",
    shortDescription:
      "Nanoweber ist eine SI-Untereinheit, die einem Milliardstel des Weber entspricht und zur Angabe extrem kleiner magnetischer Flusswerte verwendet wird.",
    historySummary:
      "Die Einheit entstand aus dem Bedarf präziser Magnetsensoren und mikroelektronischer Bauteile, im Vergleich zum Mikroweber noch kleinere Flusswerte mit aussagekräftigen Zahlen darzustellen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Präzise Magnetsensoren, mikroelektronische Messungen",
  },
  "rankine": {
    name: "Rankine",
    slug: "rankine",
    categoryName: "Temperatur",
    shortDescription:
      "Rankine ist eine absolute Temperaturskala, die Grade in Fahrenheit-Größe verwendet und deren Nullpunkt dem absoluten Nullpunkt entspricht; sie wird besonders in US-amerikanischen technischen Berechnungen verwendet.",
    historySummary:
      "Die Rankine-Skala wurde 1859 von W. J. M. Rankine, Ingenieur und Physiker an der Universität Glasgow, vorgeschlagen -- etwa zehn Jahre nach der Einführung der Kelvin-Skala 1848. Das Besondere an der Rankine-Skala ist, dass sie im Gegensatz zu Kelvins Celsius-Gradgröße die Fahrenheit-Gradgröße verwendet: Eine Differenz von 1 Grad Rankine entspricht genau einer Differenz von 1 Grad Fahrenheit. Wie bei Kelvin entspricht der Nullpunkt dem absoluten Nullpunkt (0 K = 0 °R = -459,67 °F). Heute wird Rankine besonders in der US-amerikanischen Ingenieurwelt weiterhin verwendet, in Systemen, in denen Wärmeberechnungen in Fahrenheit erfolgen (Thermodynamik, Motorenkonstruktion).",
    measurementSystem: "In der US-amerikanischen Ingenieurwelt verwendete absolute Temperaturskala",
    commonUses: "US-amerikanische technische Berechnungen, Thermodynamik, Motoren-/Turbinenkonstruktion",
  },
  "reaumur": {
    name: "Réaumur",
    slug: "reaumur",
    categoryName: "Temperatur",
    shortDescription:
      "Réaumur ist eine historische Temperaturskala, die den Gefrierpunkt von Wasser als 0 und den Siedepunkt als 80 Grad definiert und einst in Europa weit verbreitet war.",
    historySummary:
      "Die Skala trägt den Namen des französischen Wissenschaftlers René Antoine Ferchault de Réaumur, der 1730 als Erster ein ähnliches System vorschlug. Réaumurs ursprüngliches Design verwendete verdünnten Alkohol, wobei jeder Grad einem Tausendstel des Volumens des Thermometergefäßes entsprach; Gefrier- und Siedepunkt von Wasser wurden als 0 beziehungsweise 80 Grad definiert. Die Skala war besonders in Frankreich, Deutschland und Russland verbreitet -- sie findet sich sogar in Werken von Schriftstellern wie Tolstoi und Dostojewski. Als Frankreich in den 1790er-Jahren im Zuge des metrischen Systems zur Celsius-Skala überging, wurde Réaumur aufgegeben, blieb aber in Teilen Europas bis Mitte des 19. Jahrhunderts und in Teilen Russlands bis Anfang des 20. Jahrhunderts in Gebrauch. Heute beschränkt sich ihre Verwendung weitgehend auf bestimmte Lebensmittelherstellungsprozesse (besonders Käse und Süßwaren) in Italien, der Schweiz und den Niederlanden.",
    measurementSystem: "Historische europäische Temperaturskala (heute sehr eingeschränkt verwendet)",
    commonUses: "Manche traditionellen Lebensmittelherstellungsprozesse (Käse, Süßwaren), historische Texte",
  },
  "milisaniye": {
    name: "Millisekunde",
    slug: "millisekunde",
    categoryName: "Zeit",
    shortDescription:
      "Millisekunde ist eine Zeiteinheit, die einem Tausendstel einer Sekunde entspricht und bei präzisen Zeitmessungen (Computerverarbeitungszeiten, Sportzeitmessung) verwendet wird.",
    historySummary:
      "Mit der Entwicklung der Informatik und präziser Zeitmesstechnologien verbreitete sich die Millisekunde aus dem Bedarf, deutlich kürzere Zeitintervalle als die Sekunde zu messen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Messung von Computer- und Netzwerklatenz (Ping), Sportzeitmessung, Audio-/Videosynchronisation",
  },
  "megajoule": {
    name: "Megajoule",
    slug: "megajoule",
    categoryName: "Energie",
    shortDescription:
      "Megajoule ist eine SI-Einheit, die dem Millionenfachen des Joule entspricht und zur Angabe großer Energiemengen (Kraftstoffenergiegehalt, Lebensmittelenergie) verwendet wird.",
    historySummary:
      "Die Einheit leitet sich von der grundlegenden SI-Energieeinheit Joule ab (benannt nach James Prescott Joule) und ermöglicht es, große Energieberechnungen mit kleineren, lesbaren Zahlen auszudrücken.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfaches)",
    commonUses: "Energiegehalt von Kraftstoff und Lebensmitteln, Berechnungen des industriellen Energieverbrauchs",
  },
  "therm": {
    name: "Therm",
    slug: "therm",
    categoryName: "Energie",
    shortDescription:
      "Therm ist eine traditionelle Energieeinheit, die bei der Erdgasabrechnung (besonders in den USA und Großbritannien) verwendet wird.",
    historySummary:
      "Die Einheit wurde Anfang des 20. Jahrhunderts in der britischen Gasindustrie als Standardabrechnungseinheit übernommen und so definiert, dass sie etwa 100.000 BTU entspricht.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem (Energieabrechnungseinheit)",
    commonUses: "Erdgasabrechnung (USA, Großbritannien)",
  },
  "quad-btu": {
    name: "Quad BTU",
    slug: "quad-btu",
    categoryName: "Energie",
    shortDescription:
      "Quad (Quadrillion BTU) ist eine Einheit zur Angabe extrem großer Energiemengen, die in nationalen und globalen Energiestatistiken verwendet wird.",
    historySummary:
      "Die Einheit wurde eingeführt, damit Institutionen wie die US-amerikanische Energy Information Administration (EIA) den jährlichen landesweiten Energieverbrauch statt mit hunderten Millionen BTU mit einstelligen Zahlen angeben können.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem (makroökonomische Energiestatistikeinheit)",
    commonUses: "Nationale/globale Energieverbrauchsstatistiken, energiepolitische Berichte",
  },
  "elektronvolt": {
    name: "Elektronenvolt",
    slug: "elektronenvolt",
    categoryName: "Energie",
    shortDescription:
      "Elektronenvolt (eV) ist eine in der subatomaren und Teilchenphysik verwendete Energieeinheit, die die kinetische Energie angibt, die ein Elektron beim Durchlaufen einer Potentialdifferenz von 1 Volt gewinnt.",
    historySummary:
      "Elektronenvolt wird bevorzugt, da es direkt mit den experimentellen Aufbauten von Teilchen- und Atomphysikern übereinstimmt -- durchläuft ein geladenes Teilchen eine Spannung von V Volt, gewinnt es die Energie E=qV, wodurch sich das Ergebnis praktisch direkt in Elektronenvolt ausdrücken lässt. Die Verwendung von Elektronenvolt statt Joule erspart in der Teilchenbeschleunigerphysik ständige Einheitenumrechnungen und hält die Zahlenwerte handhabbar (die Energie eines Teilchens in GeV anzugeben ist deutlich praktischer als in Joule). Seit der SI-Revision 2019 besitzt auch das Elektronenvolt dank der exakt festgelegten Elementarladungskonstante einen exakt definierten Wert.",
    measurementSystem: "Spezielle Energieeinheit in Atom- und Teilchenphysik",
    commonUses: "Teilchenphysik, Atomphysik, Beschleunigerexperimente, Bindungsenergien in Chemie und Materialwissenschaft",
  },
  "sogutma-tonu": {
    name: "Kältetonne",
    slug: "kaeltetonne",
    categoryName: "Leistung",
    shortDescription:
      "Die Kältetonne (TR) ist eine in der Klima- und Kältebranche verwendete Leistungseinheit, die angibt, wie viele Wärmeeinheiten ein Klima-/Kühlsystem der Umgebung entziehen kann.",
    historySummary:
      "Die Einheit entstand Ende des 19. Jahrhunderts beim Übergang von der natürlichen Eisernte zur mechanischen Kühlung -- ihre ursprüngliche Definition war 'die Wärmeübertragungsrate, die nötig ist, um innerhalb von 24 Stunden 1 US-Tonne (907 kg) reines Eis bei 0 °C zu schmelzen'. 1903 wurde unter Federführung von Thomas Shipley von der York Manufacturing Company die Ice Machine Builders Association gegründet und technische Standards festgelegt; diese Bemühungen führten 1904 zur Gründung der American Society of Refrigerating Engineers (ASRE), dem Vorläufer der heutigen ASHRAE. Ähnlich wie die Pferdestärke auch nach den Dampfmaschinen weiterverwendet wurde, blieb die Kältetonne nach der Ablösung der Eisernte durch mechanische Kühlung als Industriestandard bestehen -- besonders in Nordamerika wird die Kapazität von Klima-/Kühlgeräten noch immer in dieser Einheit angegeben.",
    measurementSystem: "Spezielle Leistungseinheit der HLK-/Kältebranche",
    commonUses: "Kapazität von Klima- und Kühlsystemen, HLK-Technik",
  },
  "btu-saat": {
    name: "BTU pro Stunde",
    slug: "btu-pro-stunde",
    categoryName: "Leistung",
    shortDescription:
      "BTU pro Stunde (BTU/h) ist eine Einheit zur Angabe von Heiz- und Kühlleistung; sie ist besonders im anglo-amerikanischen Raum und in der Türkei der marktübliche Standard für Klimaanlagenkapazitäten (etwa 9000, 12000 oder 18000 BTU), während in Deutschland die Angabe in Watt oder Kilowatt üblich ist.",
    historySummary:
      "BTU (British Thermal Unit) ist eine britische Energieeinheit, definiert als die Wärmemenge, die nötig ist, um die Temperatur von 1 Pfund Wasser um 1 °F zu erhöhen; BTU pro Stunde, die stündliche Übertragungsrate dieser Energie, wurde durch den globalen Einfluss der US-amerikanischen HLK-Branche (Heizung, Lüftung, Klimatechnik) weltweit -- und besonders auf dem türkischen Markt -- faktisch zum Standard für die Angabe von Klimaanlagenkapazitäten.",
    measurementSystem: "Britische/US-amerikanische Wärmeleistungseinheit, in der HLK-Branche faktisch weltweiter Standard",
    commonUses: "Klimaanlagenkapazität (Verkaufsstandard in Türkei, USA und UK), Leistungsangaben auf Heiz-/Kühlgeräten",
  },
  "litre-saniye": {
    name: "Liter pro Sekunde",
    slug: "liter-pro-sekunde",
    categoryName: "Volumenstrom",
    shortDescription:
      "Liter pro Sekunde ist eine praktische metrische Einheit zur Angabe des Volumenstroms (des pro Zeiteinheit durchfließenden Flüssigkeits-/Gasvolumens); sie ist bei Wasser- und Lüftungssystemen gebräuchlich.",
    historySummary:
      "Die Einheit ergibt sich aus dem direkten Verhältnis der metrischen Basiseinheiten Volumen (Liter) und Zeit (Sekunde) und wird in Europa bei Normen für Wassernetze und Pumpenkapazitäten häufig verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Durchfluss im Wassernetz, Lüftungssysteme, Pumpenkapazität",
  },
  "metrekup-saat-hacimsel": {
    name: "Kubikmeter pro Stunde (Volumenstrom)",
    slug: "kubikmeter-pro-stunde-volumenstrom",
    categoryName: "Volumenstrom",
    shortDescription:
      "Kubikmeter pro Stunde ist eine in Europa gebräuchliche Volumenstromeinheit zur Angabe der Kapazität von Industriepumpen und Lüftungssystemen.",
    historySummary:
      "Als praktisches Verhältnis der metrischen Volumen- und Zeiteinheiten im industriellen Maßstab hat sich diese Einheit in europäischen technischen Normen (besonders in aus Deutschland stammenden Gerätekatalogen) etabliert.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Kapazität von Industriepumpen, HLK-Systeme, Wasseraufbereitungsanlagen",
  },
  "litre-dakika-hacimsel": {
    name: "Liter pro Minute (Volumenstrom)",
    slug: "liter-pro-minute-volumenstrom",
    categoryName: "Volumenstrom",
    shortDescription:
      "Liter pro Minute ist eine praktische Einheit zur Angabe des Volumenstroms, besonders bei kleinen Pumpen, Wasserhähnen und medizinischen Geräten.",
    historySummary:
      "Die Einheit hat sich auf Kapazitätsangaben von Haus- und Industriewasserinstallationen als Standard etabliert und entstand aus dem Bedarf, kleine Durchflusswerte mit praktischen, lesbaren Zahlen anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Durchfluss von Wasserhähnen und Duschen, medizinische Infusionspumpen, Kapazität kleiner Pumpen",
  },
  "gram-saniye": {
    name: "Gramm pro Sekunde",
    slug: "gramm-pro-sekunde",
    categoryName: "Massenstrom",
    shortDescription:
      "Gramm pro Sekunde ist eine metrische Einheit zur Angabe kleiner Massenströme (der pro Zeiteinheit durchfließenden Masse); sie wird bei Labor- und kleinen industriellen Prozessmessungen verwendet.",
    historySummary:
      "Die Einheit ergibt sich aus dem direkten Verhältnis der metrischen Basiseinheiten Masse und Zeit und ermöglicht es, Massenströme mit kleineren, praktischeren Werten als Kilogramm pro Sekunde anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Labordosiersysteme, kleine Verfahrenstechnik",
  },
  "gram-saat": {
    name: "Gramm pro Stunde",
    slug: "gramm-pro-stunde",
    categoryName: "Massenstrom",
    shortDescription:
      "Gramm pro Stunde ist eine Einheit zur Angabe sehr kleiner Massenströme, etwa bei tropfenweiser Dosierung oder Leckraten.",
    historySummary:
      "Die Einheit entstand aus dem Bedarf industrieller Prozess- und Labordosiersysteme, sehr niedrige Durchflussraten mit lesbaren Zahlen anzugeben.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Präzisionsdosiersysteme, Messung von Leck-/Verdunstungsraten",
  },
  "ar": {
    name: "Ar",
    slug: "ar",
    categoryName: "Fläche",
    shortDescription:
      "Ar ist eine ältere metrische Flächeneinheit, die 100 Quadratmetern entspricht und zur Angabe alltäglicher Garten-/Grundstücksgrößen verwendet wird.",
    historySummary:
      "Ar wurde als Teil des von der Französischen Revolution eingeführten metrischen Systems am 7. April 1795 (dem 18. Germinal des Republikanischen Kalenders) gesetzlich exakt als '100 Quadratmeter' definiert. Der Hektar (100 Ar) setzte sich mit der Zeit durch, da er für die Messung großer Flächen praktischer war. Als das metrische System 1960 zum SI modernisiert wurde, erhielt Ar keine offizielle internationale Anerkennung -- während der Hektar eine mit dem SI verwendbare Einheit blieb, wird Ar weiterhin eher umgangssprachlich verwendet (besonders in Indonesien, Indien und manchen europäischen Ländern zur Angabe von Grundstücks-/Gartengrößen); auch das russische 'Sotka' (bedeutet 100 m²) wird nach derselben Logik zur Bezeichnung von Datschengrundstücken verwendet.",
    measurementSystem: "Ältere metrische Einheit (Nicht-SI)",
    commonUses: "Garten- und kleine Grundstücksgrößen, Immobilienanzeigen",
  },
  "yardakare": {
    name: "Quadratyard",
    slug: "quadratyard",
    categoryName: "Fläche",
    shortDescription:
      "Quadratyard ist eine im britischen und amerikanischen Maßsystem verwendete Einheit, die der Fläche eines Quadrats mit einer Seitenlänge von einem Yard (0,9144 m) entspricht.",
    historySummary:
      "Quadratyard entwickelte sich als Flächenentsprechung der britischen Längeneinheit Yard und wird heute vor allem in den USA, Großbritannien, Indien und Pakistan bei Immobilienanzeigen, im Teppich-/Bodenbelagsverkauf und bei der Messung von Gartenflächen häufig verwendet.",
    measurementSystem: "Britisches und US-amerikanisches Maßsystem",
    commonUses: "Immobilien- und Grundstücksanzeigen (besonders Indien/Pakistan), Teppich- und Bodenbelagsverkauf, Messung von Gartenflächen",
  },
  "decimal-arazi": {
    name: "Decimal (Grundstück)",
    slug: "decimal-grundstueck",
    categoryName: "Fläche",
    shortDescription:
      "Decimal (Shotangsho) ist eine in Bangladesch traditionell verwendete Flächeneinheit zur Landvermessung. 1 Decimal ist definiert als ein Hundertstel (1/100) eines Acre.",
    historySummary:
      "Die Einheit Decimal wurde während der britischen Kolonialzeit in der Region Bengalen als dezimale Unterteilung der Einheit Acre standardisiert und wird bis heute in den amtlichen Grundbucheintragungen Bangladeschs verwendet.",
    measurementSystem: "Traditionelle bangladeschische Einheit, an das britische Acre-System gekoppelt",
    commonUses: "Grundstückskauf und -verkauf in Bangladesch, Grundbucheinträge und Immobilienanzeigen",
  },
  "killa": {
    name: "Killa",
    slug: "killa",
    categoryName: "Fläche",
    shortDescription:
      "Killa ist eine traditionelle Flächeneinheit, die in den nordindischen Bundesstaaten Punjab und Haryana sowie in Pakistan zur Messung landwirtschaftlicher Flächen verwendet wird und wertmäßig genau einem Acre entspricht.",
    historySummary:
      "Killa etablierte sich während der britischen Kolonialzeit in den Grundbucheinträgen der Punjab-Region als wertgleich mit der Einheit Acre und wird bis heute in den amtlichen Grundbucheinträgen dieser Bundesstaaten (Fard/Jamabandi) verwendet. Obwohl ihr Wert vollständig dem Acre entspricht, bezeichnet die lokale Bevölkerung ihr Land aus historischer Gewohnheit weiterhin als 'Killa'; deshalb wird sie hier als eigenständige Einheit für Nutzer geführt, die gezielt nach 'Killa' statt nach 'Acre' suchen.",
    measurementSystem: "Traditionelle Einheit aus Punjab und Haryana (Indien-Pakistan), entspricht dem Acre",
    commonUses: "Grundbucheinträge und Kauf/Verkauf landwirtschaftlicher Flächen in Punjab, Haryana (Indien) und Pakistan",
  },
  "kanal": {
    name: "Kanal",
    slug: "kanal",
    categoryName: "Fläche",
    shortDescription:
      "Kanal ist eine in Punjab (Indien-Pakistan), Jammu und Kashmir sowie Himachal Pradesh zur Landvermessung verwendete Flächeneinheit. Nach dem offiziellen Punjab-Standard entspricht 1 Kanal 505,857 m².",
    historySummary:
      "Kanal wurde im Grundbuchsystem des kolonialzeitlichen Punjab standardisiert und offiziell auf 5445 Quadratfuß (505,857 m²) festgelegt; 1 Killa (Acre) entspricht genau 8 Kanal. Sie wird bis heute als grundlegende Flächeneinheit in den amtlichen Grundbucheinträgen (Fard/Jamabandi) von Punjab, Jammu und Kashmir sowie Himachal Pradesh verwendet.",
    measurementSystem: "Traditionelle Einheit aus Punjab, Jammu und Kashmir sowie Himachal Pradesh (Indien-Pakistan)",
    commonUses: "Kauf/Verkauf landwirtschaftlicher und Wohnflächen in Punjab, Jammu und Kashmir sowie Himachal Pradesh",
  },
  "marla": {
    name: "Marla",
    slug: "marla",
    categoryName: "Fläche",
    shortDescription:
      "Marla ist eine in Pakistan und Nordindien (besonders Punjab) zur Messung kleiner Grundstücke und Wohnparzellen verwendete Flächeneinheit. Nach dem offiziellen Standard entspricht 1 Marla 25,29 m².",
    historySummary:
      "Marla wurde historisch als 'Quadratrute' mit 16,5 Fuß Seitenlänge (272,25 Quadratfuß) definiert und offiziell als ein Zwanzigstel eines Kanal festgelegt. Heute werden in Pakistan (besonders in Städten wie Lahore und Islamabad) nahezu alle Wohngrundstücksanzeigen in Marla vermarktet, was sie zu einer der meistgesuchten Immobilieneinheiten der Region macht.",
    measurementSystem: "Traditionelle Einheit aus Pakistan und Nordindien",
    commonUses: "Wohngrundstücksanzeigen in Pakistan (Lahore, Islamabad, Rawalpindi) und Nordindien",
  },
  "guntha": {
    name: "Guntha",
    slug: "guntha",
    categoryName: "Fläche",
    shortDescription:
      "Guntha ist eine in den indischen Bundesstaaten Maharashtra und Karnataka zur Landvermessung verwendete Flächeneinheit. Nach amtlicher Definition entspricht 1 Guntha exakt einem Vierzigstel eines Acre (101,17 m²).",
    historySummary:
      "Guntha wurde im kolonialzeitlichen Bombay Survey System als standardisierte Untereinheit des Acre definiert und offiziell auf genau 1/40 Acre (1089 Quadratfuß) festgelegt. Sie wird bis heute in Maharashtra und Karnataka als Standardeinheit in den Grundbucheinträgen landwirtschaftlicher Flächen (amtliche Dokumente wie 7/12 Utara) verwendet.",
    measurementSystem: "Traditionelle Einheit aus Maharashtra und Karnataka (Indien), 1/40 Acre",
    commonUses: "Grundbucheinträge und Grundstückskauf/-verkauf in Maharashtra und Karnataka",
  },
  "cent-arazi": {
    name: "Cent (Grundstück)",
    slug: "cent-grundstueck",
    categoryName: "Fläche",
    shortDescription:
      "Cent ist eine in den indischen Bundesstaaten Kerala und Tamil Nadu zur Grundstücksmessung verwendete Flächeneinheit. Per Definition entspricht 1 Cent genau einem Hundertstel eines Acre (40,47 m²).",
    historySummary:
      "Cent leitet sich vom lateinischen 'centum' (hundert) ab und ist als ein Hundertstel eines Acre definiert -- wertmäßig identisch mit der in Bangladesch verwendeten Einheit 'Decimal', doch in Kerala und Tamil Nadu ist auf dem Wohngrundstücksmarkt der Begriff 'Cent' gebräuchlich. In Kerala werden nahezu alle kleinen Wohnparzellen in Cent ausgeschrieben.",
    measurementSystem: "Traditionelle Einheit aus Kerala und Tamil Nadu (Indien), 1/100 Acre",
    commonUses: "Wohngrundstücksanzeigen und Kauf/Verkauf kleiner Flächen in Kerala und Tamil Nadu",
  },
  "ground": {
    name: "Ground",
    slug: "ground",
    categoryName: "Fläche",
    shortDescription:
      "Ground ist eine im indischen Bundesstaat Tamil Nadu, besonders in Chennai, zur Grundstücksmessung verwendete Flächeneinheit. Nach gängigem Standard entspricht 1 Ground 2400 Quadratfuß (222,97 m²).",
    historySummary:
      "Ground etablierte sich während der britischen Kolonialzeit in der Stadtplanung von Madras (dem heutigen Chennai) als Standardgröße einer Wohnparzelle mit 2400 Quadratfuß (222,97 m²) und wird bis heute als Standardeinheit für Wohngrundstücksanzeigen in Chennai und Umgebung verwendet.",
    measurementSystem: "Traditionelle Einheit aus Tamil Nadu (Indien, besonders Chennai)",
    commonUses: "Wohngrundstücksanzeigen und Immobilienkauf/-verkauf in und um Chennai",
  },
  "biswa": {
    name: "Biswa",
    slug: "biswa",
    categoryName: "Fläche",
    shortDescription:
      "Biswa ist eine in Nordindien (besonders Uttar Pradesh) zur Landvermessung verwendete traditionelle Flächeneinheit, die eine Untereinheit des Bigha bildet. Diese Seite legt den Uttar-Pradesh-'Pucca'-Standard zugrunde (1/20 eines Bigha): 1 Biswa = 126,46 m².",
    historySummary:
      "Biswa ist, wie Bigha, eine Einheit, die von Region zu Region stark variiert -- sogar innerhalb Uttar Pradeshs gilt in Westteilen (Umgebung von Meerut, Muzaffarnagar) ein deutlich kleinerer 'Kachha'-Standard, während in Ostteilen (Umgebung von Lucknow, Gorakhpur, Varanasi) der hier zugrunde gelegte größere 'Pucca'-Standard gilt. Aufgrund dieser Uneindeutigkeit wird empfohlen, beim Grundstückskauf den regionalen Wert beim örtlichen Grundbuchamt zu bestätigen.",
    measurementSystem: "Traditionelle Einheit aus Nordindien, regional stark unterschiedlich",
    commonUses: "Kauf/Verkauf landwirtschaftlicher Flächen und Grundstücke in Uttar Pradesh und Nachbarstaaten",
  },
  "katha": {
    name: "Katha",
    slug: "katha",
    categoryName: "Fläche",
    shortDescription:
      "Katha ist eine in Bangladesch und Westbengalen zur Landvermessung verwendete traditionelle Flächeneinheit. Nach bangladeschischem Standard entspricht 1 Katha 720 Quadratfuß (66,89 m²).",
    historySummary:
      "Katha ist eine seit Jahrhunderten in der Region Bengalen verwendete lokale Flächeneinheit; ihre Größe kann je nach Region (Bangladesch, Westbengalen, Assam) variieren. Diese Seite legt den in den amtlichen Grundbucheinträgen Bangladeschs verwendeten Standardwert zugrunde.",
    measurementSystem: "Traditionelle Einheit aus Bangladesch",
    commonUses: "Grundstückskauf/-verkauf, Grundbucheinträge und Immobilienanzeigen in Bangladesch",
  },
  "bigha": {
    name: "Bigha",
    slug: "bigha",
    categoryName: "Fläche",
    shortDescription:
      "Bigha ist eine in Südasien (Bangladesch, Indien, Nepal) zur Landvermessung verwendete traditionelle Flächeneinheit. Nach bangladeschischem Standard entspricht 1 Bigha 20 Katha (1337,8 m²).",
    historySummary:
      "Bigha ist eine seit Jahrhunderten in Südasien verwendete lokale Flächeneinheit; ihre Größe variiert je nach Land und Region erheblich (verschiedene indische Bundesstaaten haben unterschiedliche Standards). Diese Seite legt den in den amtlichen Grundbucheinträgen Bangladeschs verwendeten Standardwert (20 Katha) zugrunde.",
    measurementSystem: "Traditionelle Einheit aus Südasien, regional unterschiedlich",
    commonUses: "Grundstückskauf/-verkauf und Grundbucheinträge in Bangladesch, Indien und Nepal",
  },
  "tsubo": {
    name: "Tsubo",
    slug: "tsubo",
    categoryName: "Fläche",
    shortDescription:
      "Tsubo ist eine in Japan zur Messung von Immobilien und Grundstücken verwendete traditionelle Flächeneinheit. 1 Tsubo entspricht 3,305785 Quadratmetern.",
    historySummary:
      "Tsubo ist eine historische Einheit, die auf der doppelten Fläche einer traditionellen japanischen Tatami-Matte (etwa 1 x 2 Shaku) beruht, und wird in Japan auch nach der offiziellen Umstellung auf das metrische System (1966) bei Immobilienanzeigen sowie in Architektur und Bauwesen weiterhin häufig verwendet -- besonders in Städten wie Tokio werden Wohnungspreise oft als 'Preis pro Tsubo' angegeben.",
    measurementSystem: "Traditionelle Einheit aus Japan",
    commonUses: "Immobilienanzeigen, Grundstückskauf/-verkauf, Architektur- und Bauprojekte in Japan",
  },
  "yemek-kasigi": {
    name: "Esslöffel",
    slug: "essloeffel",
    categoryName: "Volumen",
    shortDescription:
      "Der Esslöffel ist die in Rezepten am häufigsten verwendete Volumeneinheit für Küchenmaße. Ein standardmäßiger Esslöffel entspricht etwa 15 mL.",
    historySummary:
      "Der Esslöffel ist ein traditionelles Maß, das aus einer Zeit stammt, als Präzisionswaagen in Haushalten nicht verbreitet waren, und dem Bedarf nach einer praktischen, schnellen Küchenmessung entspringt. Dass in türkischen Kochbüchern und Rezeptportalen 1 Esslöffel mit 15 mL angesetzt wird, deckt sich fast genau mit dem US-amerikanischen Standardesslöffelmaß (14,7868 mL) und wird bis heute unverändert verwendet -- auch in Deutschland wird ein Esslöffel im Alltag üblicherweise mit etwa 15 mL gleichgesetzt.",
    measurementSystem: "Küchenmaß (international gebräuchlich)",
    commonUses: "Rezepte, Messung flüssiger und pulvriger Zutaten (Öl, Zucker, Mehl usw.)",
  },
  "cay-kasigi": {
    name: "Teelöffel",
    slug: "teeloeffel",
    categoryName: "Volumen",
    shortDescription:
      "Der Teelöffel ist eine Volumeneinheit zur Messung kleiner Zutatenmengen (Salz, Gewürze, Hefe usw.). Ein standardmäßiger Teelöffel entspricht etwa 5 mL.",
    historySummary:
      "Der Teelöffel ist nach dem kleinen Löffel benannt, der zum Teetrinken verwendet wird, und wurde mit der Zeit zur Standardmaßeinheit für kleine Mengen in der Küche; der in der Türkei übliche Wert von 5 mL stimmt mit dem international gebräuchlichen Teelöffelmaß (USA: 4,92892 mL, metrisch: 5 mL) überein.",
    measurementSystem: "Küchenmaß (international gebräuchlich)",
    commonUses: "Rezepte, Messung kleiner Mengen wie Salz, Gewürze oder Hefe",
  },
  "su-bardagi": {
    name: "Türkisches Wasserglas",
    slug: "tuerkisches-wasserglas",
    categoryName: "Volumen",
    shortDescription:
      "Das türkische Wasserglas ist ein in der türkischen Küche verwendetes Standardmaß für Zutaten wie Mehl, Zucker oder Milch. Das traditionelle türkische Wasserglas entspricht 200 mL.",
    historySummary:
      "Das Maß 'Wasserglas' geht auf das Volumen des in der türkischen Küchenkultur gebräuchlichen Standardglases zurück; in Kochbüchern und Rezeptportalen ist es üblich, 1 Wasserglas mit 200 mL anzusetzen -- dieser Wert unterscheidet sich deutlich vom nichtmetrischen US-amerikanischen 'Cup'-Maß (236,588 mL), weshalb eine direkte Übertragung ausländischer Rezepte zu fehlerhaften Ergebnissen führen kann. Ein direktes deutsches Äquivalent existiert nicht; bei türkischen Rezepten ist dieses Maß jedoch die Standardreferenz.",
    measurementSystem: "Küchenmaß (türkische Tradition)",
    commonUses: "Türkische Rezepte, volumetrische Messung von Mehl, Zucker, Milch und Ähnlichem",
  },
  "quart": {
    name: "Quart",
    slug: "quart",
    categoryName: "Volumen",
    shortDescription:
      "Quart (USA) ist eine Flüssigkeitsvolumeneinheit, die einem Viertel einer Gallone entspricht.",
    historySummary:
      "Der Name stammt vom lateinischen 'quartus' (ein Viertel) über das französische 'quart' -- die Einheit ist exakt ein Viertel einer Gallone, doch da die Gallone selbst im Laufe der Geschichte unterschiedliche Werte annahm, änderte sich auch die Größe des Quart mit der Zeit. Das US-amerikanische Flüssigquart wurde mit dem internationalen Yard-Pound-Abkommen von 1959 als exaktes Viertel der US-Gallone (genau 231 Kubikzoll) festgelegt.",
    measurementSystem: "US-amerikanisches Maßsystem (US Liquid Quart)",
    commonUses: "Kochrezepte, US-amerikanische Flüssigproduktetiketten, Motorölmengen",
  },
  "ingiliz-quart": {
    name: "Imperiale Quart",
    slug: "imperiale-quart",
    categoryName: "Volumen",
    shortDescription:
      "Die Imperiale Quart (Imperial Quart) ist eine im Vereinigten Königreich verwendete Volumeneinheit, die etwa 20 % größer ist als die US-amerikanische Quart.",
    historySummary:
      "Die imperiale Quart wurde als ein Viertel der 1824 definierten britischen Gallone (4,54609 L) auf genau 1,1365225 Liter festgelegt -- das entspricht 2 imperialen Pints oder 40 imperialen Flüssigunzen. Der Unterschied von rund 20 % zwischen US-amerikanischer und britischer Quart ergibt sich direkt aus den unterschiedlichen Gallonendefinitionen beider Länder (USA: Tradition der 'Weingallone', Großbritannien: neue, 1824 auf dem Gewicht von Wasser beruhende Definition).",
    measurementSystem: "Britisches Maßsystem (Imperial)",
    commonUses: "Traditionelle Flüssigkeitsmaße im Vereinigten Königreich",
  },
  "sivi-ons": {
    name: "Flüssigunze",
    slug: "fluessigunze",
    categoryName: "Volumen",
    shortDescription:
      "Die Flüssigunze (USA) ist eine Volumeneinheit zur Angabe kleiner Flüssigkeitsmengen wie Getränken, Arzneimitteln oder Parfüm.",
    historySummary:
      "Die Flüssigunze entstand historisch als 'das Volumen, das eine bestimmte Substanz von einer Unze Gewicht einnimmt' (in England Wein, in Schottland Wasser) -- die Standardisierung war jedoch komplex, da es unterschiedliche 'Unze'-Definitionen (Tower-, Troy- und Avoirdupois-Unze) gab. Die US-amerikanische Flüssigunze leitet sich von der vor 1824 in England verwendeten 'Weingallone' (231 Kubikzoll) ab; mit der Übernahme des internationalen Zolls wurde sie exakt auf 29,5735295625 mL festgelegt.",
    measurementSystem: "US-amerikanisches Maßsystem (US Fluid Ounce)",
    commonUses: "Getränkeportionen, Arzneimitteldosierungen, Parfüm-/Kosmetikmengen, Kochrezepte",
  },
  "ingiliz-sivi-ons": {
    name: "Imperiale Flüssigunze",
    slug: "imperiale-fluessigunze",
    categoryName: "Volumen",
    shortDescription:
      "Die Imperiale Flüssigunze (Imperial Fluid Ounce) ist eine im Vereinigten Königreich verwendete Volumeneinheit, die etwa 4 % kleiner ist als die US-amerikanische Flüssigunze.",
    historySummary:
      "1824 definierte das britische Parlament die britische Gallone als 'Gewicht von 10 Pfund Wasser' und teilte sie in 160 Flüssigunzen -- dadurch stimmt die britische Flüssigunze fast genau mit der Avoirdupois-Unze (einer Gewichtseinheit) von Wasser überein (diese Übereinstimmung gilt jedoch nur zufällig für Wasser und ist keine allgemeine Umrechnungsregel). Im Ergebnis ist die britische Flüssigunze etwa 4,084 % kleiner als die US-amerikanische Flüssigunze.",
    measurementSystem: "Britisches Maßsystem (Imperial)",
    commonUses: "Getränkeportionen im Vereinigten Königreich, traditionelle Rezepte",
  },
  "pint": {
    name: "Pint",
    slug: "pint",
    categoryName: "Volumen",
    shortDescription:
      "Pint (USA) ist eine bei Flüssigkeitsmessungen verwendete Volumeneinheit, die einem Achtel einer Gallone entspricht.",
    historySummary:
      "Der Name Pint stammt vom altfranzösischen 'pinte' und bezeichnete auf ein Gefäß gemalte Volumenmarkierungen; traditionell ist es als ein Achtel einer Gallone definiert (im Lateinischen mit dem Symbol 'octarius' -- ein Achtel -- bezeichnet). 1707 übernahmen die nordamerikanischen Kolonien Englands die 'Weingallone' (231 Kubikzoll) als Grundlage für Flüssigkeitsmaße; dies bildete die Basis der heutigen US-amerikanischen Flüssigpint. Die US-Pint entspricht exakt 473,176473 Millilitern.",
    measurementSystem: "US-amerikanisches Maßsystem (US Liquid Pint)",
    commonUses: "Getränkemaße, Kochrezepte, US-amerikanische Flüssigproduktetiketten",
  },
  "ingiliz-pint": {
    name: "Imperiale Pint",
    slug: "imperiale-pint",
    categoryName: "Volumen",
    shortDescription:
      "Die Imperiale Pint (Imperial Pint) ist eine im Vereinigten Königreich verwendete Volumeneinheit, die etwa 20 % größer ist als die US-amerikanische Pint, und hat in der britischen Bierkultur einen besonderen Stellenwert.",
    historySummary:
      "1824 ersetzte das britische Parlament alle alten Gallonendefinitionen durch eine neue 'britische Gallone' (Imperial Gallon), die auf 10 Pfund destilliertem Wasser bei 62 °F beruhte -- ein Achtel davon, die britische Pint, wurde exakt auf 568,26125 Milliliter festgelegt. Kanada übernahm dieses britische System 1873 nach der Konföderation von 1867 gesetzlich. Die britische Pint besitzt bis heute eine lebendige kulturelle Bedeutung in Großbritannien: Fassbier und Cider dürfen gesetzlich nur in Standardmaßen wie 'einer halben Pint' oder 'zwei Dritteln einer Pint' verkauft werden; auch Milch in Pfandflaschen darf weiterhin ohne metrisches Äquivalent in Pint verkauft werden.",
    measurementSystem: "Britisches Maßsystem (Imperial)",
    commonUses: "Bier-/Getränkeausschank im Vereinigten Königreich, Milchverkauf, traditionelle Maße",
  },
  "peck": {
    name: "Peck",
    slug: "peck",
    categoryName: "Volumen",
    shortDescription:
      "Peck ist eine bei landwirtschaftlichen Erzeugnissen (besonders Obst und Gemüse) verwendete Volumeneinheit, die einem Viertel eines Bushel entspricht.",
    historySummary:
      "Peck ist Teil des britischen Trockenmaßsystems und hat denselben historischen Ursprung wie der Bushel; traditionell ist er als ein Viertel eines Bushel definiert. Heute wird die Einheit hauptsächlich in den USA verwendet, besonders beim Verkauf von Obst wie Äpfeln auf Bauernmärkten.",
    measurementSystem: "US-amerikanisches Maßsystem (Trockenmaß)",
    commonUses: "Obst-/Gemüseverkauf (besonders Äpfel), Bauernmärkte",
  },
  "bushel": {
    name: "Bushel",
    slug: "bushel",
    categoryName: "Volumen",
    shortDescription:
      "Bushel ist eine im Handel mit landwirtschaftlichen Erzeugnissen (besonders Getreide) verwendete Volumen-/Gewichtseinheit, die auf Rohstoffmärkten heute faktisch als Gewichtseinheit fungiert.",
    historySummary:
      "Bushel gelangte nach der normannischen Eroberung nach England und wurde Teil des gesetzlichen Maßes für Wein, Bier und Getreide. Die Brot- und Bierverordnung Heinrichs III. von etwa 1266 definierte den Bushel über die Weingallone, während die Maß- und Gewichtsverordnung Edwards I. oder II. von etwa 1300 ihn anhand der Getreidegallone neu definierte. USA und Großbritannien entwickelten sich später auseinander: Der britische (Imperial) Bushel wurde 1824 als 'Volumen von 80 Pfund destilliertem Wasser bei 62 °F' definiert (8 britische Gallonen, ≈36,37 L), während sich der US-Bushel auf das 'Winchester-Maß' (einen Zylinder mit 18,5 Zoll Durchmesser und 8 Zoll Höhe) stützt und auf ≈35,24 Liter festgelegt wurde. An Rohstoffbörsen wird der Bushel heute faktisch nicht als Volumen-, sondern als Gewichtseinheit verwendet -- ein Bushel Weizen ist beispielsweise auf 60 Pfund, ein Bushel Mais auf 56 Pfund standardisiert.",
    measurementSystem: "US-amerikanisches Maßsystem (Winchester-Maß)",
    commonUses: "Getreide- und Agrarhandel, Rohstoffmärkte",
  },
  "ingiliz-galonu": {
    name: "Imperiale Gallone",
    slug: "imperiale-gallone",
    categoryName: "Volumen",
    shortDescription:
      "Die Imperiale Gallone (Imperial Gallon) ist eine im Vereinigten Königreich und einigen Commonwealth-Ländern verwendete Flüssigkeitsvolumeneinheit, die etwa 20 % größer ist als die US-Gallone.",
    historySummary:
      "Großbritannien schaffte mit dem Gewichts- und Maßgesetz von 1824 alle alten, uneinheitlichen Gallonendefinitionen ab und definierte eine eigene 'britische Gallone': das Volumen von 10 Pfund destilliertem Wasser, gewogen mit Messinggewichten unter bestimmten Luftbedingungen (etwa 4,546 Liter). Die USA folgten dieser Reform nicht, sondern übernahmen 1836 offiziell die ältere, 1706 definierte Tradition der 'Weingallone' und blieben bei ihrer eigenen (kleineren) Gallonendefinition. Diese unterschiedlichen historischen Entscheidungen führen dazu, dass beiderseits des Atlantiks mit 'Gallone' tatsächlich unterschiedliche Volumina gemeint sind.",
    measurementSystem: "Britisches Maßsystem (Imperial)",
    commonUses: "Kraftstoffverbrauch im Vereinigten Königreich, Flüssigkeitsmaße in manchen Commonwealth-Ländern",
  },
  "kile": {
    name: "Kile",
    slug: "kile",
    categoryName: "Volumen",
    shortDescription:
      "Kile ist eine im Osmanischen Reich zur Getreidemessung (Weizen, Gerste usw.) verwendete Volumeneinheit. Nach dem Istanbuler Kile-Standard zur Zeit Sultan Selims III. entsprach 1 Kile 37 Litern; regional und je nach Epoche variierte der Wert jedoch stark.",
    historySummary:
      "Kile war die grundlegende Maßeinheit des osmanischen Getreidehandels und wurde in 4 Şinik unterteilt (1 altes Kile = 4 Şinik = 8 Kutu = 16 Zarf = 37 Liter). Mit der Maß- und Eichverordnung von 1869 wurde das 'neue Kile' (Kîle-i Aşari) exakt auf 100 Liter (1 Hektoliter) neu definiert und an das Dezimalsystem angepasst. Wie andere osmanische Einheiten wurde es mit der Umstellung auf das metrische System 1931 aus dem amtlichen Gebrauch genommen.",
    measurementSystem: "Traditionelle osmanische Volumeneinheit (nicht mehr in Gebrauch), regional und zeitlich unterschiedlich",
    commonUses: "Getreidehandel (Weizen, Gerste) und Besteuerung im Osmanischen Reich; heute in der Geschichtsforschung und bei der Interpretation alter Grundbuch-/Stiftungsurkunden",
  },
  "sinik": {
    name: "Shinik",
    slug: "shinik",
    categoryName: "Volumen",
    shortDescription:
      "Shinik ist eine im Osmanischen Reich als Untereinheit des Kile zur Getreidemessung verwendete Volumeneinheit. Nach altem Standard entspricht sie einem Viertel eines Kile, also etwa 9,25 Litern.",
    historySummary:
      "Shinik war im alltäglichen Getreidehandel eine praktische Untereinheit des Kile für kleinere Mengen: definiert über das Verhältnis 1 altes Kile = 4 Shinik = 8 Kutu = 16 Zarf. Nach der Türkischen Enzyklopädie des Islam (TDV İslam Ansiklopedisi) ergibt dieses Verhältnis, bezogen auf das alte Istanbuler Kile von 37 Litern, einen Wert von 1 Shinik = 9,25 Liter. Mit der Maßreform von 1869 wurde das 'neue Shinik' dezimal neu definiert (1 neues Kile = 10 neue Shinik), 1931 wurde es vollständig aus dem Gebrauch genommen.",
    measurementSystem: "Traditionelle osmanische Volumeneinheit (nicht mehr in Gebrauch)",
    commonUses: "Alltäglicher Getreidehandel im Osmanischen Reich; heute in der Geschichtsforschung und bei der Interpretation historischer Texte",
  },
};

export const germanUnitPages: LocalizedGermanUnitPage[] = unitPages
  .map((page) => {
    const content = germanUnitContent[page.slug];

    if (!content) {
      return null;
    }

    return {
      ...page,
      locale: "de",
      sourceSlug: page.slug,
      slug: content.slug,
      name: content.name,
      categoryName: content.categoryName,
      shortDescription: content.shortDescription,
      historySummary: content.historySummary,
      measurementSystem: content.measurementSystem,
      commonUses: content.commonUses,
    };
  })
  .filter((page): page is LocalizedGermanUnitPage => page !== null);

export function findGermanUnitPage(
  category: string,
  unit: string
) {
  return germanUnitPages.find(
    (page) => page.category === category && page.unit === unit
  );
}

export function findGermanUnitPageBySlug(slug: string) {
  return germanUnitPages.find((page) => page.slug === slug);
}

export function findGermanUnitPageByTurkishSlug(
  sourceSlug: string
) {
  return germanUnitPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}

export function findGermanUnitPageByCategorySlug(
  category: string
) {
  const slug = getGermanCategorySlug(category);
  return germanUnitPages.filter(
    (page) => page.category === category || page.categoryName === slug
  );
}
