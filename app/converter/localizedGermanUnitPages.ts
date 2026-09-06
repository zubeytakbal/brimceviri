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
  metre: {
    name: "Meter",
    slug: "meter",
    categoryName: "Länge",
    shortDescription:
      "Der Meter ist die SI-Basiseinheit der Länge und die wichtigste Referenz für Abstände und Abmessungen.",
    historySummary:
      "Der Meter entstand im Zuge der metrischen Standardisierung und wird heute über die Lichtgeschwindigkeit im Vakuum definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Bauwesen, Wissenschaft, Fertigung und allgemeine Messungen",
  },
  kilometre: {
    name: "Kilometer",
    slug: "kilometer",
    categoryName: "Länge",
    shortDescription:
      "Der Kilometer ist eine Längeneinheit von 1000 Metern und wird vor allem für größere Entfernungen verwendet.",
    historySummary:
      "Als dezimales Vielfaches des Meters wurde der Kilometer zur praktischen Einheit für Straßen-, Reise- und Kartendistanzen.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Straßenentfernungen, Geographie, Kartographie und Infrastruktur",
  },
  santimetre: {
    name: "Zentimeter",
    slug: "zentimeter",
    categoryName: "Länge",
    shortDescription:
      "Der Zentimeter ist ein Hundertstel Meter und eignet sich für kürzere Alltags- und Objektmaße.",
    historySummary:
      "Der Zentimeter entwickelte sich als dezimale Untereinheit des Meters und wurde in Bildung, Handel und Alltag schnell verbreitet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Möbel, Kleidung, Anthropometrie und tägliche Messungen",
  },
  milimetre: {
    name: "Millimeter",
    slug: "millimeter",
    categoryName: "Länge",
    shortDescription:
      "Der Millimeter ist ein Tausendstel Meter und wird für präzise technische Maße eingesetzt.",
    historySummary:
      "Mit steigenden Anforderungen an Fertigung und Toleranzen gewann der Millimeter in Technik und Produktion stark an Bedeutung.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Technische Zeichnung, Bearbeitung, Mechanik und Toleranzen",
  },
  mil: {
    name: "Meile",
    slug: "meile",
    categoryName: "Länge",
    shortDescription:
      "Die Meile ist eine nichtmetrische Längeneinheit und entspricht international exakt 1609,344 Metern.",
    historySummary:
      "Die moderne internationale Meile geht auf ältere Wegmaße zurück und wurde 1959 mit einem festen Meterwert vereinheitlicht.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Straßenentfernungen, Navigation und großräumige Feldmessungen",
  },
  fit: {
    name: "Fuß",
    slug: "fuss",
    categoryName: "Länge",
    shortDescription:
      "Der Fuß ist eine imperiale Längeneinheit mit dem exakten Wert 0,3048 Meter.",
    historySummary:
      "Der Fuß stammt aus älteren körperbezogenen Maßtraditionen; sein moderner internationaler Wert wurde 1959 festgelegt.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Architektur, Höhenangaben, Luftfahrt und Baupraxis",
  },
  inc: {
    name: "Zoll",
    slug: "zoll",
    categoryName: "Länge",
    shortDescription:
      "Der Zoll ist eine kurze imperiale Längeneinheit; 1 Zoll entspricht exakt 2,54 Zentimetern.",
    historySummary:
      "Der moderne internationale Zoll wurde 1959 mit exakt 25,4 Millimetern definiert und ist heute technisch eindeutig festgelegt.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Bildschirmgrößen, Rohrleitungen, Verbindungselemente und Katalogmaße",
  },
  yarda: {
    name: "Yard",
    slug: "yard",
    categoryName: "Länge",
    shortDescription:
      "Das Yard ist eine imperiale Längeneinheit mit dem exakten Wert 0,9144 Meter.",
    historySummary:
      "Das Yard entwickelte sich aus älteren Land- und Körpermaßen und wurde später international auf einen festen Meterwert normiert.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Sportflächen, Textilien, Landschaftsbau und Geländeplanung",
  },
  kilogram: {
    name: "Kilogramm",
    slug: "kilogramm",
    categoryName: "Masse",
    shortDescription:
      "Das Kilogramm ist die SI-Basiseinheit der Masse und die zentrale Referenz in Technik, Handel und Wissenschaft.",
    historySummary:
      "Das Kilogramm war früher an ein physisches Normal gebunden und wird heute über den festgelegten Zahlenwert der Planck-Konstanten definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Handel, Logistik, Labor, Produktion und technische Berechnungen",
  },
  gram: {
    name: "Gramm",
    slug: "gramm",
    categoryName: "Masse",
    shortDescription:
      "Das Gramm ist ein Tausendstel Kilogramm und eignet sich für kleinere Stoffmengen.",
    historySummary:
      "Als praktische metrische Untereinheit des Kilogramms wurde das Gramm in Labor, Handel und Alltag weit verbreitet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Lebensmittel, Chemie, Pharmazie und Feinwägungen",
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
      "Das Pfund ist eine nichtmetrische Masseneinheit; 1 internationales Pfund entspricht exakt 0,45359237 Kilogramm.",
    historySummary:
      "Das moderne Avoirdupois-Pfund wurde international normiert und ist bis heute tief in vielen englischsprachigen Anwendungen verankert.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Einzelhandel, Versand, Nährwertangaben und technische Kataloge",
  },
  ton: {
    name: "Tonne",
    slug: "tonne",
    categoryName: "Masse",
    shortDescription:
      "Die metrische Tonne ist eine große Masseneinheit von 1000 Kilogramm.",
    historySummary:
      "Die Tonne wurde als kompakte metrische Einheit für große Stoffmengen in Industrie, Logistik und Rohstoffhandel etabliert.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Logistik, Schwerindustrie, Rohstoffe und Produktionsmengen",
  },
  ons: {
    name: "Unze",
    slug: "unze",
    categoryName: "Masse",
    shortDescription:
      "Die Unze ist eine kleine imperiale Masseneinheit; 1 Avoirdupois-Unze entspricht 28,349523125 Gramm.",
    historySummary:
      "Historisch gab es mehrere Unzen; in der modernen Technik und im Handel wird die standardisierte Avoirdupois-Unze verwendet.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Verpackung, Lebensmittel und leichte Handelsmengen",
  },
  pascal: {
    name: "Pascal",
    slug: "pascal",
    categoryName: "Druck",
    shortDescription:
      "Das Pascal ist die SI-Einheit des Drucks und direkt über 1 Pa = 1 N/m² definiert.",
    historySummary:
      "Benannt nach Blaise Pascal wurde diese Einheit zur wissenschaftlichen Standardreferenz für Druckangaben im SI.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Wissenschaftliche Berechnungen, Werkstofftechnik und Referenzumrechnungen",
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
      "Das Bar ist eine technische Druckeinheit von 100000 Pascal und in der Praxis sehr verbreitet.",
    historySummary:
      "Obwohl es keine SI-Einheit ist, blieb das Bar wegen seiner kompakten Darstellung praktischer Druckbereiche in Industrie und Service beliebt.",
    measurementSystem: "Technische Nicht-SI-Einheit",
    commonUses: "Hydraulik, Pneumatik, Kompressoren und Manometer",
  },
  psi: {
    name: "PSI",
    slug: "psi",
    categoryName: "Druck",
    shortDescription:
      "PSI steht für pound-force per square inch und ist eine verbreitete Druckeinheit in der angloamerikanischen Technik.",
    historySummary:
      "PSI blieb in Werkstatt-, Fahrzeug- und Hydraulikanwendungen verbreitet, auch nachdem SI-Einheiten in vielen Bereichen zunahmen.",
    measurementSystem: "Imperiale und US-technische Nutzung",
    commonUses: "Reifendruck, Hydraulik, Serviceunterlagen und Feldmessungen",
  },
  "milimetre-civa": {
    name: "Millimeter Quecksilbersäule",
    slug: "millimeter-quecksilbersaeule",
    categoryName: "Druck",
    shortDescription:
      "Millimeter Quecksilbersäule ist eine historische Druckeinheit auf Basis einer Quecksilbersäule.",
    historySummary:
      "Die Einheit wurde durch Quecksilbermanometer geprägt und ist besonders aus Medizin, Labor und Vakuumtechnik bekannt.",
    measurementSystem: "Historische Nicht-SI-Einheit",
    commonUses: "Blutdruckwerte, Laborreferenzen und Vakuummessungen",
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
      "Der Hektar ist eine große Flächeneinheit; 1 ha entspricht exakt 10000 Quadratmetern.",
    historySummary:
      "Der Hektar wurde zur praktischen metrischen Einheit für Landflächen, weil große Grundstücke damit kompakter beschrieben werden können.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Landwirtschaft, Flächennutzung und größere Grundstücke",
  },
  fitkare: {
    name: "Quadratfuß",
    slug: "quadratfuss",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratfuß ist eine imperiale Flächeneinheit und leitet sich direkt vom Fußmaß ab.",
    historySummary:
      "Mit der weiten Verbreitung des Fußes in Bau und Immobilien wurde auch der Quadratfuß zur üblichen Flächeneinheit.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Immobilien, Raumflächen und angloamerikanische Bauunterlagen",
  },
  litre: {
    name: "Liter",
    slug: "liter",
    categoryName: "Volumen",
    shortDescription:
      "Der Liter ist eine weit verbreitete Volumeneinheit für Flüssigkeiten und Behälterinhalte.",
    historySummary:
      "Als praktische metrische Volumeneinheit verbindet der Liter Alltagsgebrauch, Laborpraxis und technische Anwendungen.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Flüssigkeiten, Tankvolumen, Laborbehälter und Alltagsmaße",
  },
  metrekup: {
    name: "Kubikmeter",
    slug: "kubikmeter",
    categoryName: "Volumen",
    shortDescription:
      "Der Kubikmeter ist die SI-abgeleitete Einheit des Volumens und die Standardreferenz für größere Raum- und Flüssigkeitsmengen.",
    historySummary:
      "Als dreidimensionale Ableitung des Meters wurde der Kubikmeter zur wissenschaftlichen und technischen Standardgröße für Volumen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Raumvolumen, Behälter, Speicher und Prozessanlagen",
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
      "Celsius ist eine der gebräuchlichsten Temperaturskalen im Alltag und in der Technik.",
    historySummary:
      "Die Celsius-Skala verbreitete sich stark, weil ihre Bezugspunkte mit den Phasenwechseln von Wasser anschaulich verknüpft sind.",
    measurementSystem: "Temperaturskala, zusammen mit dem SI verwendet",
    commonUses: "Wetter, HLK, Prozessführung und alltägliche Temperaturen",
  },
  fahrenhayt: {
    name: "Fahrenheit",
    slug: "fahrenheit",
    categoryName: "Temperatur",
    shortDescription:
      "Fahrenheit ist eine Temperaturskala, die besonders in den Vereinigten Staaten noch häufig verwendet wird.",
    historySummary:
      "Die Fahrenheit-Skala blieb in Teilen der angloamerikanischen Welt in Wetter-, Haushalts- und Gebrauchsanwendungen fest verankert.",
    measurementSystem: "Imperiale und US-amerikanische Temperaturskala",
    commonUses: "US-Wetterdaten, Haushalt und ausgewählte technische Referenzen",
  },
  kelvin: {
    name: "Kelvin",
    slug: "kelvin",
    categoryName: "Temperatur",
    shortDescription:
      "Kelvin ist die SI-Basiseinheit der thermodynamischen Temperatur.",
    historySummary:
      "Die Kelvin-Skala wurde entwickelt, um absolute Temperaturen ab dem absoluten Nullpunkt konsistent zu beschreiben.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Thermodynamik, Wissenschaft und absolute Temperaturskalen",
  },
  saniye: {
    name: "Sekunde",
    slug: "sekunde",
    categoryName: "Zeit",
    shortDescription:
      "Die Sekunde ist die SI-Basiseinheit der Zeit und Grundlage zahlreicher abgeleiteter Größen.",
    historySummary:
      "Die moderne Sekunde wird über eine atomare Übergangsfrequenz definiert und dadurch hochpräzise reproduzierbar.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Experimente, Bewegungsanalyse, Datenaufzeichnung und Timing",
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
      "Das Joule ist die SI-abgeleitete Einheit der Energie und wird für Arbeit, Wärme und Energieinhalte verwendet.",
    historySummary:
      "Mit der modernen Vereinheitlichung von Mechanik und Thermodynamik wurde das Joule zur zentralen SI-Energieeinheit.",
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
      "Das Watt ist die SI-abgeleitete Einheit der Leistung und beschreibt eine Energieübertragungsrate.",
    historySummary:
      "Das Watt etablierte sich als Standardgröße für Leistungsangaben in elektrischen und mechanischen Systemen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Geräteleistung, elektrische Lasten und Maschinenangaben",
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
      "Das Volt ist die SI-abgeleitete Einheit der elektrischen Spannung.",
    historySummary:
      "Mit der Entwicklung elektrischer Messtechnik wurde das Volt zu einer Grundgröße der Elektrotechnik.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Elektronik, Stromversorgung und Netzspannungen",
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
      "Das Ampere ist die SI-Basiseinheit der elektrischen Stromstärke.",
    historySummary:
      "Als Grundgröße der Elektrotechnik wurde das Ampere zentral für die Beschreibung von Ladungsfluss und Stromkreisen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Strommessung, Schutztechnik und Gerätekennwerte",
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
  mikrometre: {
    name: "Mikrometer",
    slug: "mikrometer",
    categoryName: "Länge",
    shortDescription:
      "Das Mikrometer entspricht einem Millionstel Meter und wird für mikroskopisch kleine Längenmessungen verwendet.",
    historySummary:
      "In der Werkstoffkunde und Halbleitertechnik ist das Mikrometer die Standardeinheit für kleinste Abmessungen.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Werkstoffkunde, Halbleitertechnik und Mikrobiologie",
  },
  nanometre: {
    name: "Nanometer",
    slug: "nanometer",
    categoryName: "Länge",
    shortDescription:
      "Das Nanometer entspricht einem Milliardstel Meter und dient zur Messung von Atomen und Molekülen.",
    historySummary:
      "In Physik, Chemie und der modernen Nanotechnologie ist das Nanometer eine grundlegende Maßeinheit.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Nanotechnologie, Lichtwellenlängen und Halbleiterforschung",
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
  arsin: {
    name: "Arschin",
    slug: "arschin",
    categoryName: "Länge",
    shortDescription:
      "Das Arschin war eine traditionelle osmanische Längeneinheit, die im Alltag und Handel verwendet wurde.",
    historySummary:
      "Vor der Einführung des metrischen Systems im 20. Jahrhundert war das Arschin die gängige Maßeinheit für Stoffe und Baumaterialien im Osmanischen Reich.",
    measurementSystem: "Außerhalb des SI, historische osmanische Einheit",
    commonUses: "Historische Dokumente und Forschung zum Osmanischen Reich",
  },
  endaze: {
    name: "Endaze",
    slug: "endaze",
    categoryName: "Länge",
    shortDescription:
      "Das Endaze war eine osmanische Längeneinheit, die vor allem im Textilhandel verwendet wurde.",
    historySummary:
      "Sie diente im osmanischen Alltag hauptsächlich zur Messung von Stoffen und war etwas kürzer als das Arschin.",
    measurementSystem: "Außerhalb des SI, historische osmanische Einheit",
    commonUses: "Historischer Textilhandel und osmanische Forschung",
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
  cig: {
    name: "Çığ",
    slug: "cig",
    categoryName: "Länge",
    shortDescription:
      "Çığ war eine altürkische Längeneinheit, die in frühen türkischen Quellen belegt ist.",
    historySummary:
      "Der Wert wurde anhand des Werks Dîvânu Lugâti't-Türk von Kaşgarlı Mahmud rekonstruiert und liegt bei etwa 33,3 Zentimetern.",
    measurementSystem: "Außerhalb des SI, altürkische historische Einheit",
    commonUses: "Forschung zu altürkischen Maßeinheiten",
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
      "Die Gallone ist eine traditionelle Volumeneinheit, die vor allem in den USA und Großbritannien für Flüssigkeiten verwendet wird.",
    historySummary:
      "Die US-Gallone und die imperiale Gallone unterscheiden sich in ihrem Wert, beide stammen aus historischen englischen Maßsystemen.",
    measurementSystem: "Angloamerikanisches Maßsystem (außerhalb des SI)",
    commonUses: "Kraftstoffmengen und Flüssigkeitsmengen in den USA und Großbritannien",
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
      "Die Lichtgeschwindigkeit ist die Geschwindigkeit, mit der sich Licht im Vakuum ausbreitet, und eine fundamentale Naturkonstante.",
    historySummary:
      "Sie ist heute exakt definiert und bildet die Grundlage der modernen Definition des Meters.",
    measurementSystem: "Internationales Einheitensystem (SI, Naturkonstante)",
    commonUses: "Physik, Astronomie und die Definition des Meters",
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
      "Das Radiant ist die SI-Einheit für ebene Winkel und basiert auf dem Verhältnis von Bogenlänge zu Radius.",
    historySummary:
      "Es ist die im mathematischen und wissenschaftlichen Kontext bevorzugte Winkeleinheit gegenüber dem Grad.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Mathematik, Physik und technische Berechnungen",
  },
  derece: {
    name: "Grad",
    slug: "grad",
    categoryName: "Winkel",
    shortDescription:
      "Das Grad ist die im Alltag gebräuchlichste Einheit für ebene Winkel, wobei ein voller Kreis 360 Grad umfasst.",
    historySummary:
      "Die Einteilung in 360 Grad geht auf die babylonische Astronomie zurück und wird bis heute weltweit verwendet.",
    measurementSystem: "Außerhalb des SI, weltweit gebräuchliche Einheit",
    commonUses: "Geometrie, Navigation und Alltagsangaben von Winkeln",
  },
  gradyan: {
    name: "Gon",
    slug: "gon",
    categoryName: "Winkel",
    shortDescription:
      "Das Gon (auch Neugrad) teilt den vollen Kreis in 400 Einheiten und wird vor allem in der Geodäsie verwendet.",
    historySummary:
      "Es wurde im Zuge der Einführung des metrischen Systems entwickelt, um Winkel dezimal zu unterteilen.",
    measurementSystem: "Außerhalb des SI, geodätische Einheit",
    commonUses: "Vermessungswesen und geodätische Berechnungen",
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
      "Das Hertz ist die SI-Einheit der Frequenz und gibt die Anzahl der Schwingungen pro Sekunde an.",
    historySummary:
      "Benannt nach Heinrich Hertz, ist es die grundlegende Einheit für Frequenzangaben in Elektrotechnik und Akustik.",
    measurementSystem: "Internationales Einheitensystem (SI, Basiseinheit)",
    commonUses: "Elektrotechnik, Akustik und Signalverarbeitung",
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
      "Das Newton ist die SI-Einheit der Kraft, benannt nach Isaac Newton.",
    historySummary:
      "Es ist die grundlegende Einheit für Kraftangaben in Physik und Technik weltweit.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Physik, Maschinenbau und technische Berechnungen",
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
      "Kilogramm-Kraft-Meter ist eine traditionelle Drehmomenteinheit, die noch in älteren technischen Handbüchern vorkommt.",
    historySummary:
      "Sie wurde vor der vollständigen Umstellung auf das Newtonmeter in vielen Ländern verwendet.",
    measurementSystem: "Außerhalb des SI, traditionelle Einheit",
    commonUses: "Ältere technische Handbücher und Ingenieurwesen",
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
      "Die Atmosphäre ist eine Druckeinheit, die ungefähr dem durchschnittlichen Luftdruck auf Meereshöhe entspricht.",
    historySummary:
      "Sie wurde als praktische Referenzgröße für Druckangaben in Wissenschaft und Technik definiert.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Referenzeinheit",
    commonUses: "Meteorologie, Chemie und technische Druckangaben",
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
      "Die Pascalsekunde ist die SI-Einheit der dynamischen Viskosität und beschreibt den Fließwiderstand von Flüssigkeiten.",
    historySummary:
      "Sie wird in Chemie und Ingenieurwesen zur präzisen Charakterisierung von Flüssigkeiten verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Materialwissenschaft, Chemie und Flüssigkeitsanalyse",
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
      "Die Kalorie ist eine traditionelle Energieeinheit, die ursprünglich zur Angabe von Wärmemengen verwendet wurde.",
    historySummary:
      "Sie ist bis heute vor allem in der Ernährungswissenschaft in vielen Ländern gebräuchlich.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Einheit",
    commonUses: "Ernährungswissenschaft und Energiegehalt von Lebensmitteln",
  },
  kilokalori: {
    name: "Kilokalorie",
    slug: "kilokalorie",
    categoryName: "Energie",
    shortDescription:
      "Die Kilokalorie entspricht 1000 Kalorien und ist die auf Lebensmittelverpackungen gebräuchliche Energieeinheit.",
    historySummary:
      "Sie wird oft umgangssprachlich einfach als Kalorie bezeichnet und ist der Standard bei Nährwertangaben.",
    measurementSystem: "Außerhalb des SI, gebräuchliche Einheit",
    commonUses: "Nährwertangaben und Ernährungsplanung",
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
      "Das Ohm ist die SI-Einheit des elektrischen Widerstands, benannt nach Georg Simon Ohm.",
    historySummary:
      "Es ist die grundlegende Einheit für Widerstandsangaben in der Elektrotechnik weltweit.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Elektrotechnik, Schaltungsdesign und Widerstandsmessungen",
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
      "Das Farad ist die SI-Einheit der elektrischen Kapazität, benannt nach Michael Faraday.",
    historySummary:
      "Es ist die grundlegende Einheit für Kondensatorkapazitäten in der Elektrotechnik.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Kondensatordesign und Schaltungstechnik",
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
      "Das Henry ist die SI-Einheit der Induktivität, benannt nach Joseph Henry.",
    historySummary:
      "Es ist die grundlegende Einheit für Spuleninduktivität in der Elektrotechnik.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Spulendesign und Schaltungstechnik",
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
      "Das Coulomb ist die SI-Einheit der elektrischen Ladung, benannt nach Charles-Augustin de Coulomb.",
    historySummary:
      "Es ist die grundlegende Einheit für Ladungsangaben in Elektrotechnik und Physik.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Elektrotechnik und physikalische Ladungsberechnungen",
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
      "Ampere pro Meter ist die SI-Einheit der magnetischen Feldstärke.",
    historySummary:
      "Sie wird in der Elektrotechnik zur präzisen Beschreibung von Magnetfeldern verwendet.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Elektrotechnik und Magnetfeldberechnungen",
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
      "Das Weber ist die SI-Einheit des magnetischen Flusses, benannt nach Wilhelm Eduard Weber.",
    historySummary:
      "Es ist die grundlegende Einheit für Angaben des magnetischen Flusses in der Elektrotechnik.",
    measurementSystem: "Internationales Einheitensystem (SI, abgeleitete Einheit)",
    commonUses: "Elektrotechnik und Transformatorendesign",
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
      "Das Bit ist die kleinste Informationseinheit in der digitalen Datenverarbeitung und kann den Wert 0 oder 1 annehmen.",
    historySummary:
      "Es ist die grundlegende Einheit, auf der die gesamte moderne Computertechnik und Datenübertragung basiert.",
    measurementSystem: "Digitale Dateneinheit (Basiseinheit)",
    commonUses: "Datenübertragungsraten und digitale Informationsverarbeitung",
  },
  bayt: {
    name: "Byte",
    slug: "byte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Byte besteht aus 8 Bit und ist die grundlegende Einheit für Speicherkapazität in der Computertechnik.",
    historySummary:
      "Es wurde zum Standardbaustein für die Darstellung von Zeichen und Daten in Computersystemen.",
    measurementSystem: "Digitale Dateneinheit (Basiseinheit)",
    commonUses: "Dateigrößen und Speicherkapazitätsangaben",
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
      "Das Gibibyte ist eine exakte binäre Einheit, die genau 1024 Mebibyte entspricht.",
    historySummary:
      "Es ist der präzise IEC-Standard für Speicherkapazität und dient zur Unterscheidung vom kommerziellen dezimalen Gigabyte.",
    measurementSystem: "Binäre Dateneinheit (IEC-Standard)",
    commonUses: "Präzise Dokumentation von Speicher- und Arbeitsspeicherkapazität",
  },
  tebibayt: {
    name: "Tebibyte",
    slug: "tebibyte",
    categoryName: "Datenspeicher",
    shortDescription:
      "Das Tebibyte ist eine exakte binäre Einheit, die genau 1024 Gibibyte entspricht.",
    historySummary:
      "Es wird zur präzisen Bestimmung der Kapazität großer Speichersysteme verwendet.",
    measurementSystem: "Binäre Dateneinheit (IEC-Standard)",
    commonUses: "Große Speichersysteme und präzise Rechenzentrumsdokumentation",
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
