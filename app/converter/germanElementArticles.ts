export type GermanElementArticle = {
  slug: string;
  introduction: string[];
  uses: string[];
};

// Only pages with a dedicated editorial article are eligible for indexing.
// This keeps the German periodic-table section useful while it is expanded in batches.
export const germanElementArticles: GermanElementArticle[] = [
  {
    slug: "wasserstoff",
    introduction: [
      "Wasserstoff ist das leichteste Element und kommt im Universum besonders häufig vor. Auf der Erde liegt er meist gebunden vor, etwa in Wasser oder in organischen Verbindungen.",
      "Seine sehr geringe Dichte ist für technische Anwendungen wichtig. Als Gas ist Wasserstoff leicht entzündlich; Lagerung, Belüftung und Zündquellen müssen deshalb immer mitgedacht werden.",
    ],
    uses: [
      "Ausgangsstoff für Ammoniak und weitere Grundchemikalien",
      "Raffinerie- und Syntheseprozesse",
      "Energieträger in ausgewählten Brennstoffzellen-Anwendungen",
    ],
  },
  {
    slug: "helium",
    introduction: [
      "Helium ist ein Edelgas und reagiert unter normalen Bedingungen kaum mit anderen Stoffen. Es ist nicht brennbar und besitzt einen sehr niedrigen Siedepunkt.",
      "Diese Kombination macht Helium für Tieftemperaturtechnik und kontrollierte Schutzatmosphären interessant. Es ist jedoch eine begrenzte Ressource und sollte dort eingesetzt werden, wo seine besonderen Eigenschaften nötig sind.",
    ],
    uses: [
      "Kühlmittel für supraleitende Magnete und Forschungstechnik",
      "Lecksuche in technischen Anlagen",
      "Schutzgas für spezielle Fertigungs- und Analyseverfahren",
    ],
  },
  {
    slug: "lithium",
    introduction: [
      "Lithium ist ein sehr leichtes Alkalimetall. Seine elektrochemischen Eigenschaften erklären seine große Bedeutung für wiederaufladbare Batterien.",
      "Elementares Lithium reagiert mit Wasser und Luftfeuchtigkeit. In Produkten wird es daher meist als Verbindung oder in kontrollierten Zellen eingesetzt, nicht als frei zugängliches Metall.",
    ],
    uses: [
      "Lithium-Ionen-Batterien",
      "Spezialgläser und Glaskeramiken",
      "Schmierfette auf Lithiumbasis",
    ],
  },
  {
    slug: "kohlenstoff",
    introduction: [
      "Kohlenstoff bildet die Grundlage sehr vieler organischer Verbindungen. Seine Eigenschaften hängen stark von der Struktur ab: Graphit, Diamant und amorpher Kohlenstoff verhalten sich deutlich unterschiedlich.",
      "In der Werkstofftechnik ist Kohlenstoff unter anderem wegen seines Einflusses auf Stahl wichtig. Bei jeder Anwendung ist deshalb entscheidend, welche Form oder Verbindung gemeint ist.",
    ],
    uses: [
      "Legierungsbestandteil von Stählen",
      "Graphit für Elektroden und Schmierstoffe",
      "Aktivkohle zur Filtration und Reinigung",
    ],
  },
  {
    slug: "stickstoff",
    introduction: [
      "Stickstoff ist der mengenmäßig größte Bestandteil der Erdatmosphäre. Als zweiatomiges Gas ist er bei Raumtemperatur vergleichsweise reaktionsträge.",
      "Flüssiger Stickstoff ist extrem kalt und wird für Kühlprozesse genutzt. Er verdrängt Sauerstoff aus der Luft; in engen oder schlecht belüfteten Bereichen kann dadurch eine Erstickungsgefahr entstehen.",
    ],
    uses: [
      "Schutzatmosphären bei Verpackung und Fertigung",
      "Ausgangsstoff für Ammoniak und Düngemittel",
      "Tieftemperatur-Kühlung mit flüssigem Stickstoff",
    ],
  },
  {
    slug: "sauerstoff",
    introduction: [
      "Sauerstoff macht rund ein Fünftel der Luft aus und ist für die Atmung vieler Lebewesen zentral. Er ist selbst nicht brennbar, kann Verbrennungen aber deutlich beschleunigen.",
      "Für technische und medizinische Anwendungen wird Sauerstoff in genau definierten Reinheiten und Mengen bereitgestellt. Bei sauerstoffangereicherter Umgebung gelten deshalb besondere Brandschutzregeln.",
    ],
    uses: [
      "Medizinische Sauerstoffversorgung unter fachlicher Aufsicht",
      "Stahlherstellung und Metallbearbeitung",
      "Oxidationsprozesse in Chemie und Umwelttechnik",
    ],
  },
  {
    slug: "natrium",
    introduction: [
      "Natrium ist ein reaktives Alkalimetall. In der Natur findet man es fast immer in Verbindungen, etwa als Bestandteil von Kochsalz, und nicht als elementares Metall.",
      "Reines Natrium reagiert heftig mit Wasser. Seine chemische Reaktivität ist einerseits technisch nutzbar, erfordert andererseits eine fachgerechte Handhabung und Lagerung.",
    ],
    uses: [
      "Wichtiger Baustein zahlreicher Natriumverbindungen",
      "Spezielle Wärmeträger- und Beleuchtungsanwendungen",
      "Chemische Synthesen unter kontrollierten Bedingungen",
    ],
  },
  {
    slug: "magnesium",
    introduction: [
      "Magnesium ist ein leichtes Erdalkalimetall und ein verbreiteter Bestandteil technischer Leichtmetalllegierungen. Seine geringe Dichte kann helfen, Bauteile leichter zu konstruieren.",
      "Massives Magnesium und feine Späne verhalten sich unterschiedlich. Feines Material kann leicht entzündlich sein; die Verarbeitung muss daher zum Materialzustand passen.",
    ],
    uses: [
      "Leichtbaulegierungen",
      "Druckguss und ausgewählte Fahrzeugbauteile",
      "Chemische Reduktions- und Pyrotechnikprozesse",
    ],
  },
  {
    slug: "aluminium",
    introduction: [
      "Aluminium verbindet eine geringe Dichte mit guter Formbarkeit. Eine dünne Oxidschicht schützt die Oberfläche in vielen Umgebungen vor weiterer Korrosion.",
      "Die tatsächlichen Eigenschaften eines Bauteils ergeben sich meist aus der Legierung und dem Verarbeitungszustand. Reinaluminium und hochfeste Aluminiumlegierungen sollten daher nicht gleichgesetzt werden.",
    ],
    uses: [
      "Bauprofile, Fenster und Fassaden",
      "Verpackungen und Folien",
      "Leitungen, Wärmetauscher und Leichtbau",
    ],
  },
  {
    slug: "silicium",
    introduction: [
      "Silicium ist ein Halbmetall und für moderne Elektronik besonders wichtig. Als hochreiner Kristall lässt sich seine elektrische Leitfähigkeit gezielt beeinflussen.",
      "In der Erdkruste kommt Silicium überwiegend gebunden vor, beispielsweise als Siliciumdioxid oder Silikat. Reines Silicium hat daher andere Eigenschaften als Sand, Glas oder Silikatgestein.",
    ],
    uses: [
      "Halbleiterbauelemente",
      "Solarzellen",
      "Grundstoff für Glas-, Keramik- und Silikatmaterialien",
    ],
  },
  {
    slug: "chlor",
    introduction: [
      "Chlor ist ein Halogen und als Element ein gelbgrünes, reaktives Gas. Es wird vor allem als Ausgangsstoff für Verbindungen und industrielle Prozesse genutzt.",
      "Elementares Chlorgas ist giftig und reizend. Anwendungen zur Desinfektion oder Materialherstellung beruhen auf kontrolliert hergestellten Chlorverbindungen und gehören in fachkundige Hände.",
    ],
    uses: [
      "Desinfektions- und Wasseraufbereitungschemikalien",
      "Herstellung chlorhaltiger Kunststoffe wie PVC",
      "Ausgangsstoff für viele Industriechemikalien",
    ],
  },
  {
    slug: "eisen",
    introduction: [
      "Eisen ist ein zentraler Werkstoff der Industrie und die Grundlage für Stahl. Seine mechanischen Eigenschaften lassen sich durch Kohlenstoff, andere Legierungselemente und Wärmebehandlung stark verändern.",
      "Unlegiertes Eisen und viele Stähle können korrodieren. Beschichtungen, Verzinkung oder rostbeständige Legierungen werden deshalb passend zur Einsatzumgebung gewählt.",
    ],
    uses: [
      "Tragwerke, Maschinen und Fahrzeuge",
      "Stähle für Werkzeuge und technische Bauteile",
      "Magnetische Komponenten",
    ],
  },
  {
    slug: "kupfer",
    introduction: [
      "Kupfer leitet elektrischen Strom und Wärme sehr gut. Es ist zudem gut formbar, weshalb es in Leitungen und Wärmetechnik weit verbreitet ist.",
      "An der Luft bildet Kupfer Oberflächenschichten, die Farbe und Korrosionsverhalten verändern können. Für eine Konstruktion sind deshalb Werkstoffzustand, Verbindungstechnik und Umgebung relevant.",
    ],
    uses: [
      "Elektrische Kabel, Leiterbahnen und Kontakte",
      "Rohre und Wärmetauscher",
      "Legierungen wie Messing und Bronze",
    ],
  },
  {
    slug: "zink",
    introduction: [
      "Zink wird häufig eingesetzt, um Stahl vor Korrosion zu schützen. In einer Zinkschicht kann das unedlere Zink den Stahl auch dann noch schützen, wenn die Beschichtung leicht beschädigt ist.",
      "Die Schutzwirkung hängt von Schichtdicke, Umgebung und Verarbeitung ab. Für Außenbauteile wird Zink deshalb zusammen mit dem passenden Beschichtungs- und Wartungskonzept beurteilt.",
    ],
    uses: [
      "Verzinken von Stahlteilen",
      "Messing und andere Zinklegierungen",
      "Batterien und Druckgussbauteile",
    ],
  },
  {
    slug: "beryllium",
    introduction: [
      "Beryllium ist ein leichtes Erdalkalimetall mit hoher Steifigkeit. In technischen Werkstoffen wird es meist legiert oder als Berylliumoxid verwendet, nicht als frei zugängliches Metall.",
      "Staub und Dämpfe berylliumhaltiger Materialien können gesundheitsschädlich sein. Bearbeitung und Entsorgung brauchen deshalb geeignete industrielle Schutzmaßnahmen.",
    ],
    uses: [
      "Speziallegierungen für federnartige und funkenarme Bauteile",
      "Röntgenfenster und ausgewählte Präzisionstechnik",
      "Berylliumoxid-Keramik für Wärmeableitung",
    ],
  },
  {
    slug: "bor",
    introduction: [
      "Bor ist ein Halbmetall, das selten elementar eingesetzt wird. Seine Verbindungen können die Härte, Temperaturbeständigkeit oder chemische Beständigkeit eines Materials gezielt verändern.",
      "Ob eine Anwendung zu elementarem Bor, Borcarbid oder Borosilikatglas gehört, macht einen wesentlichen Unterschied. Die Werkstoffe haben jeweils eigene Eigenschaften und Verarbeitungsanforderungen.",
    ],
    uses: [
      "Borosilikatglas für temperaturbeständige Glaswaren",
      "Borcarbid als sehr harter technischer Werkstoff",
      "Zusatz in Spezialstählen und Keramiken",
    ],
  },
  {
    slug: "fluor",
    introduction: [
      "Fluor ist das reaktivste Halogen. Elementares Fluor ist ein hochgefährliches Gas und wird nur in speziell ausgelegten Industrieanlagen gehandhabt.",
      "Im Alltag begegnet man meist Fluorverbindungen, nicht dem Element selbst. Ihre Wirkung und Sicherheit lassen sich nicht unmittelbar aus den Eigenschaften von Fluorgas ableiten.",
    ],
    uses: [
      "Herstellung ausgewählter Fluorchemikalien",
      "Oberflächen- und Materialbehandlung in kontrollierten Prozessen",
      "Ausgangsstoff für Spezialpolymere",
    ],
  },
  {
    slug: "neon",
    introduction: [
      "Neon ist ein Edelgas und reagiert chemisch kaum. Wird es elektrisch angeregt, erzeugt es ein charakteristisches rötlich-oranges Licht.",
      "Als Edelgas ist Neon nicht brennbar. In hohen Konzentrationen kann es jedoch Sauerstoff verdrängen; geschlossene Arbeitsbereiche benötigen deshalb eine passende Lüftung.",
    ],
    uses: [
      "Leuchtröhren und Werbebeleuchtung",
      "Gasentladungs- und Anzeigeelemente",
      "Ausgewählte Laser- und Messtechnik",
    ],
  },
  {
    slug: "phosphor",
    introduction: [
      "Phosphor ist ein Nichtmetall mit mehreren Formen, deren Reaktivität deutlich voneinander abweicht. Weißer, roter und schwarzer Phosphor dürfen daher nicht als derselbe Werkstoff behandelt werden.",
      "In der Industrie ist Phosphor vor allem über seine Verbindungen relevant. Diese spielen eine wichtige Rolle in Düngemitteln, Reinigungschemie und der Metallurgie.",
    ],
    uses: [
      "Phosphatdünger und Grundchemikalien",
      "Legierungs- und Oberflächenprozesse",
      "Spezialmaterialien und ausgewählte Zündsysteme",
    ],
  },
  {
    slug: "schwefel",
    introduction: [
      "Schwefel ist ein Nichtmetall, das in vielen Mineralien und Verbindungen vorkommt. Er ist ein wichtiger Ausgangsstoff der Grundstoffindustrie.",
      "Elementarer Schwefel ist brennbar. Bei Verbrennung können reizende Schwefeloxide entstehen; Lagerung und Verarbeitung richten sich deshalb nach dem jeweiligen Einsatzfall.",
    ],
    uses: [
      "Herstellung von Schwefelsäure",
      "Vulkanisation von Kautschuk",
      "Düngemittel und Pflanzennährstoffverbindungen",
    ],
  },
  {
    slug: "argon",
    introduction: [
      "Argon ist ein Edelgas und unter normalen Bedingungen sehr reaktionsträge. Es wird genutzt, wenn Sauerstoff, Feuchtigkeit oder andere Luftbestandteile von einem Prozess ferngehalten werden sollen.",
      "Argon ist nicht giftig und nicht brennbar, verdrängt aber die Atemluft. Bei Arbeiten in Gruben, Behältern oder schlecht gelüfteten Bereichen ist deshalb die Sauerstoffkonzentration entscheidend.",
    ],
    uses: [
      "Schutzgas beim Schweißen",
      "Schutzatmosphären in Metallurgie und Elektronik",
      "Füllgas für ausgewählte Leucht- und Isolierglasanwendungen",
    ],
  },
  {
    slug: "kalium",
    introduction: [
      "Kalium ist ein reaktives Alkalimetall und liegt in der Natur fast ausschließlich als Verbindung vor. Für Pflanzen und biologische Systeme sind Kaliumionen besonders wichtig.",
      "Elementares Kalium reagiert mit Wasser sehr heftig. Praktische Anwendungen betreffen daher meist Kaliumsalze oder andere Kaliumverbindungen, nicht das reine Metall.",
    ],
    uses: [
      "Kaliumdünger",
      "Glas-, Seifen- und Grundchemie",
      "Elektrolyte und Spezialchemikalien",
    ],
  },
  {
    slug: "calcium",
    introduction: [
      "Calcium ist ein Erdalkalimetall und kommt in der Natur vor allem gebunden vor, etwa in Kalkstein, Gips und vielen Mineralien. Es ist damit ein wichtiger Rohstoff für Bau- und Prozessindustrie.",
      "Reines Calcium ist deutlich reaktiver als seine bekannten Verbindungen. Bei der Bewertung eines Materials muss deshalb zwischen dem Element, Calciumcarbonat und anderen Calciumsalzen unterschieden werden.",
    ],
    uses: [
      "Kalk- und Zementrohstoffe über Calciumverbindungen",
      "Metallurgische Prozesse und Entschwefelung",
      "Glas, Keramik und technische Füllstoffe",
    ],
  },
  {
    slug: "titan",
    introduction: [
      "Titan ist ein leichtes, festes Übergangsmetall mit guter Korrosionsbeständigkeit. Seine passive Oxidschicht ist für viele Anwendungen in feuchten oder chemisch belasteten Umgebungen vorteilhaft.",
      "Titanbauteile sind keine Standardstähle: Legierung, Oberfläche und Fertigungsverfahren bestimmen ihre tatsächliche Leistungsfähigkeit und ihre Kosten.",
    ],
    uses: [
      "Luft- und Raumfahrtbauteile",
      "Chemische Apparate und korrosionsbeständige Komponenten",
      "Medizintechnik und Implantate mit geeigneter Zulassung",
    ],
  },
  {
    slug: "chrom",
    introduction: [
      "Chrom ist ein Übergangsmetall, das vor allem als Legierungsbestandteil bekannt ist. In Stahl fördert es die Bildung einer schützenden Oberflächenschicht und ist damit zentral für rostbeständige Stähle.",
      "Chromverbindungen haben sehr unterschiedliche Eigenschaften. Einige, insbesondere bestimmte sechswertige Chromverbindungen, sind gesundheitlich problematisch und unterliegen strengen Schutzvorgaben.",
    ],
    uses: [
      "Rostbeständige und hitzebeständige Stähle",
      "Oberflächenbeschichtungen",
      "Spezialpigmente und feuerfeste Werkstoffe",
    ],
  },
  {
    slug: "mangan",
    introduction: [
      "Mangan ist ein Übergangsmetall und ein wichtiger Zusatzstoff in vielen Stählen. Es kann die Festigkeit und Härtbarkeit beeinflussen und unterstützt metallurgische Reinigungsprozesse.",
      "Die erforderliche Menge ist an die jeweilige Stahlsorte gebunden. Mehr Mangan bedeutet nicht automatisch einen besseren Werkstoff; Zusammensetzung und Wärmebehandlung wirken zusammen.",
    ],
    uses: [
      "Stahl- und Gusslegierungen",
      "Batteriematerialien auf Manganbasis",
      "Spezialgläser und chemische Prozesse",
    ],
  },
  {
    slug: "kobalt",
    introduction: [
      "Kobalt ist ein Übergangsmetall, das in hitzebeständigen Legierungen und bestimmten Batteriematerialien eingesetzt wird. Seine magnetischen Eigenschaften sind für ausgewählte technische Anwendungen interessant.",
      "Beschaffung und Recycling spielen bei kobaltführenden Materialien eine wichtige Rolle. Welche Eigenschaften ein Bauteil erhält, hängt von der konkreten Legierung oder Verbindung ab.",
    ],
    uses: [
      "Hochtemperatur- und Verschleißlegierungen",
      "Magnete und magnetische Spezialwerkstoffe",
      "Bestimmte Kathodenmaterialien in Batterien",
    ],
  },
  {
    slug: "nickel",
    introduction: [
      "Nickel ist ein zähes Übergangsmetall und ein wichtiger Bestandteil vieler korrosions- und temperaturbeständiger Legierungen. Besonders bei Edelstahl bestimmt der Nickelanteil zusammen mit Chrom und weiteren Elementen das Eigenschaftsprofil.",
      "Nickel kann bei empfindlichen Personen Kontaktallergien auslösen. Bei Produkten mit dauerhaftem Hautkontakt sind deshalb Materialauswahl und einschlägige Anforderungen relevant.",
    ],
    uses: [
      "Rostbeständige Stähle und Superlegierungen",
      "Batterien und galvanische Beschichtungen",
      "Münzen, Speziallegierungen und Katalyse",
    ],
  },
  {
    slug: "gallium",
    introduction: [
      "Gallium ist ein weiches Metall mit einem ungewöhnlich niedrigen Schmelzpunkt. Deshalb kann es bereits bei vergleichsweise geringer Erwärmung flüssig werden, während es bei Raumtemperatur meist fest bleibt.",
      "Seine technische Bedeutung liegt vor allem in Halbleiterverbindungen. Elementares Gallium, Galliumarsenid und Galliumnitrid sind unterschiedliche Materialien mit jeweils eigenen Einsatzgrenzen.",
    ],
    uses: [
      "Halbleiterbauelemente auf Galliumbasis",
      "Leuchtdioden und Hochfrequenzelektronik",
      "Speziallegierungen und Messanwendungen",
    ],
  },
  {
    slug: "germanium",
    introduction: [
      "Germanium ist ein Halbmetall mit Halbleitereigenschaften. Seine elektrische Leitfähigkeit lässt sich durch Reinheit und gezielte Dotierung beeinflussen.",
      "Heute wird Germanium besonders dort verwendet, wo optische oder infrarote Eigenschaften gefragt sind. Es ist nicht mit dem Elementnamen eines Landes zu verwechseln, sondern ein eigener Werkstoff mit begrenzter Verfügbarkeit.",
    ],
    uses: [
      "Infrarotoptik und spezielle Linsen",
      "Glasfasern und optoelektronische Komponenten",
      "Halbleiter- und Detektortechnik",
    ],
  },
  {
    slug: "arsen",
    introduction: [
      "Arsen ist ein Halbmetall, das in Mineralien und einigen technischen Materialien vorkommt. Viele Arsenverbindungen sind giftig, weshalb ihre Verwendung streng kontrolliert wird.",
      "In der Elektronik ist vor allem Galliumarsenid relevant. Dieses Halbleitermaterial hat andere Eigenschaften und Sicherheitsanforderungen als elementares Arsen oder natürliche arsenhaltige Minerale.",
    ],
    uses: [
      "Galliumarsenid für Hochfrequenz- und Optoelektronik",
      "Spezielle Halbleiter- und Sensorkomponenten",
      "Materialforschung unter kontrollierten Bedingungen",
    ],
  },
  {
    slug: "selen",
    introduction: [
      "Selen ist ein Nichtmetall mit photoelektrischen und halbleitenden Eigenschaften. Seine elektrische Reaktion auf Licht wurde früh in der Sensor- und Kopiertechnik genutzt.",
      "Selen tritt in unterschiedlichen chemischen Formen auf. Die zulässige Exposition und die Einsatzweise richten sich nach der konkreten Verbindung, nicht allein nach dem Elementnamen.",
    ],
    uses: [
      "Glasfärbung und Spezialglas",
      "Lichtsensoren und historische Kopiertechnik",
      "Ausgewählte Halbleiter- und Legierungsanwendungen",
    ],
  },
  {
    slug: "brom",
    introduction: [
      "Brom ist bei Raumtemperatur eines der wenigen flüssigen Elemente. Es gehört zu den Halogenen und reagiert in elementarer Form stark mit vielen Stoffen.",
      "Bromdampf ist reizend und giftig. Industrielle Anwendungen beruhen auf geschlossenen Prozessen und geeigneten Schutzvorkehrungen; eine private Handhabung ist nicht angemessen.",
    ],
    uses: [
      "Spezialchemikalien und Zwischenprodukte",
      "Ausgewählte Flammschutz- und Fotochemikalien",
      "Bohr- und Wasserbehandlungschemie in kontrollierten Prozessen",
    ],
  },
  {
    slug: "krypton",
    introduction: [
      "Krypton ist ein Edelgas und chemisch sehr reaktionsträge. Es kommt in der Luft nur in sehr kleinen Mengen vor und wird durch technische Trennverfahren gewonnen.",
      "Seine Anwendungen nutzen vor allem die Eigenschaften von Gasentladungen und seine geringe Reaktivität. Wie andere Edelgase kann Krypton in hoher Konzentration Sauerstoff verdrängen.",
    ],
    uses: [
      "Spezielle Leuchtmittel und Blitzlampen",
      "Isolierglasfüllungen",
      "Laser- und Messtechnik",
    ],
  },
  {
    slug: "rubidium",
    introduction: [
      "Rubidium ist ein weiches, stark reaktives Alkalimetall. Es wird überwiegend für Forschung und hochspezialisierte Technik benötigt, nicht als Massenwerkstoff.",
      "Wie andere Alkalimetalle reagiert elementares Rubidium heftig mit Wasser und Luftfeuchtigkeit. Anwendungen erfolgen deshalb in abgeschirmten, fachgerecht kontrollierten Systemen.",
    ],
    uses: [
      "Atomuhren und Präzisionsmessung",
      "Forschung zu Atomen und Quantensystemen",
      "Spezielle photoelektrische Anwendungen",
    ],
  },
  {
    slug: "strontium",
    introduction: [
      "Strontium ist ein Erdalkalimetall und kommt natürlich meist in Mineralien gebunden vor. Seine Salze erzeugen in Flammen eine kräftig rote Farbe.",
      "Für technische Produkte ist die genaue Verbindung ausschlaggebend. Elementares Strontium ist deutlich reaktiver als Strontiumsalze und wird anders gelagert und verarbeitet.",
    ],
    uses: [
      "Rote Flammenfärbung in Pyrotechnik",
      "Spezialglas und Keramik",
      "Ausgewählte Ferrit- und Magnetwerkstoffe",
    ],
  },
  {
    slug: "yttrium",
    introduction: [
      "Yttrium ist ein Metall der seltenen Erden und wird meist zusammen mit verwandten Elementen aus Mineralien gewonnen. Kleine Mengen können die Eigenschaften von Keramiken, Leuchtstoffen und Legierungen gezielt verändern.",
      "Es ist kein Alltagswerkstoff; die Einsatzentscheidung hängt von Reinheit, Verbindung und Lieferkette ab. Besonders verbreitet sind yttriumhaltige Oxide und Granate.",
    ],
    uses: [
      "Leuchtstoffe und Laser-Kristalle",
      "Hochtemperaturkeramiken",
      "Speziallegierungen und Elektronik",
    ],
  },
  {
    slug: "zirconium",
    introduction: [
      "Zirconium ist ein korrosionsbeständiges Übergangsmetall. Es bildet eine stabile Oxidschicht und eignet sich deshalb für ausgewählte chemische und energietechnische Anwendungen.",
      "Nicht zu verwechseln ist das Metall mit Zirkon oder Zirkoniumoxid. Diese Materialien unterscheiden sich in Struktur, Härte und typischer Verwendung deutlich.",
    ],
    uses: [
      "Chemische Apparate und korrosionsbeständige Bauteile",
      "Kerntechnik in zugelassenen Anwendungen",
      "Zirkoniumoxid-Keramik für Medizin- und Präzisionstechnik",
    ],
  },
  {
    slug: "niob",
    introduction: [
      "Niob ist ein Übergangsmetall, das Legierungen bei hohen Temperaturen und mechanischer Belastung verbessern kann. Bereits geringe Zusätze werden in manchen Stählen gezielt eingesetzt.",
      "Ein weiterer wichtiger Bereich sind supraleitende Niobverbindungen. Dort hängt die Funktion stark von Materialreinheit, Temperatur und Magnetfeld ab.",
    ],
    uses: [
      "Mikrolegierte Stähle",
      "Hochtemperatur- und Luftfahrtlegierungen",
      "Supraleitende Magnete und Forschungstechnik",
    ],
  },
  {
    slug: "molybdaen",
    introduction: [
      "Molybdän ist ein Übergangsmetall mit hohem Schmelzpunkt und guter Festigkeit bei erhöhten Temperaturen. Als Legierungsbestandteil kann es die Beständigkeit von Stahl gegenüber Korrosion und Hitze verbessern.",
      "Welche Wirkung Molybdän hat, hängt von der gesamten Legierung ab. Reines Metall, Molybdänstahl und Molybdändisulfid erfüllen daher sehr unterschiedliche technische Aufgaben.",
    ],
    uses: [
      "Rostbeständige und hitzefeste Stähle",
      "Hochtemperaturbauteile",
      "Molybdändisulfid als Festschmierstoff",
    ],
  },
  {
    slug: "technetium",
    introduction: [
      "Technetium ist das leichteste Element ohne stabile Isotope. Es entsteht überwiegend künstlich und wird wegen seiner Radioaktivität nur in spezialisierten, kontrollierten Bereichen eingesetzt.",
      "In der Medizin ist vor allem Technetium-99m für diagnostische Bildgebung bedeutsam. Die Auswahl, Dosierung und Entsorgung radioaktiver Stoffe gehören ausschließlich in fachliche Verfahren.",
    ],
    uses: [
      "Nuklearmedizinische Diagnostik mit Technetium-99m",
      "Radiochemische Forschung",
      "Referenz- und Messverfahren in Speziallaboren",
    ],
  },
  {
    slug: "ruthenium",
    introduction: [
      "Ruthenium ist ein Platinmetall und wird in kleinen Mengen für besonders belastbare oder katalytisch aktive Materialien eingesetzt. Es ist kein Massenmetall, kann aber die Leistung spezieller Werkstoffe deutlich beeinflussen.",
      "Die Eignung richtet sich nach der konkreten Legierung oder Verbindung. Bei Katalysatoren ist zudem die verfügbare Oberfläche oft wichtiger als die reine Gesamtmasse des Elements.",
    ],
    uses: [
      "Katalysatoren für chemische Reaktionen",
      "Elektrische Kontakte und Widerstandsschichten",
      "Harte Speziallegierungen",
    ],
  },
  {
    slug: "rhodium",
    introduction: [
      "Rhodium ist ein seltenes Platinmetall mit hoher chemischer Beständigkeit. Es wird dort eingesetzt, wo eine sehr dünne, aber leistungsfähige Oberfläche oder ein wirksamer Katalysator benötigt wird.",
      "Der Materialwert und die begrenzte Verfügbarkeit machen Rückgewinnung besonders relevant. Viele Anwendungen verwenden nur geringe Mengen Rhodium, etwa als Beschichtung oder Katalysatorbestandteil.",
    ],
    uses: [
      "Abgaskatalysatoren",
      "Reflektierende und verschleißarme Beschichtungen",
      "Spezialkontakte und chemische Katalyse",
    ],
  },
  {
    slug: "palladium",
    introduction: [
      "Palladium ist ein Platinmetall und ein wirksamer Katalysator für verschiedene chemische Reaktionen. Es kann zudem Wasserstoff aufnehmen, was für bestimmte technische Prozesse genutzt wird.",
      "Wegen seiner begrenzten Verfügbarkeit wird Palladium meist gezielt und in kleinen Mengen verwendet. Recycling aus Katalysatoren und Elektronik ist deshalb ein wichtiger Teil der Versorgung.",
    ],
    uses: [
      "Abgas- und Chemiekatalysatoren",
      "Elektrische Kontakte und Beschichtungen",
      "Wasserstoffreinigung und Speziallegierungen",
    ],
  },
  {
    slug: "silber",
    introduction: [
      "Silber besitzt unter den Metallen eine besonders hohe elektrische und thermische Leitfähigkeit. Seine gut reflektierende Oberfläche ist ebenfalls für technische und optische Anwendungen relevant.",
      "An der Luft können Schwefelverbindungen eine dunkle Anlaufschicht bilden. Bei Kontakten, Spiegeln oder Schmuck hängt die Oberflächenqualität daher von Beschichtung, Umgebung und Pflege ab.",
    ],
    uses: [
      "Elektrische Kontakte und Leiterpasten",
      "Spiegel und reflektierende Beschichtungen",
      "Schmuck, Münzen und Speziallegierungen",
    ],
  },
  {
    slug: "cadmium",
    introduction: [
      "Cadmium ist ein weiches Schwermetall, dessen Einsatz wegen seiner Giftigkeit stark eingeschränkt ist. Bestehende Anwendungen werden häufig durch weniger problematische Materialien ersetzt.",
      "Bei cadmiumhaltigen Produkten sind Rücknahme, Recycling und Arbeitsschutz besonders wichtig. Staub oder Dämpfe dürfen nicht eingeatmet werden; die Verarbeitung gehört in kontrollierte Industrieprozesse.",
    ],
    uses: [
      "Historische und spezialisierte Nickel-Cadmium-Batterien",
      "Ausgewählte Beschichtungen und Pigmente",
      "Spezialanwendungen mit geregelter Entsorgung",
    ],
  },
  {
    slug: "indium",
    introduction: [
      "Indium ist ein weiches Metall, das vor allem in dünnen Funktionsschichten eingesetzt wird. Es haftet gut auf vielen Oberflächen und bildet mit Zinn elektrisch leitfähige, transparente Oxidschichten.",
      "Die Bedeutung von Indium in Flachbildschirmen und optoelektronischen Bauteilen macht Materialeffizienz und Recycling wichtig. Die konkrete Verbindung bestimmt die Eigenschaften des Endprodukts.",
    ],
    uses: [
      "Indium-Zinn-Oxid für transparente Elektroden",
      "Halbleiter und optoelektronische Bauteile",
      "Niedrigschmelzende Lote und Speziallegierungen",
    ],
  },
  {
    slug: "zinn",
    introduction: [
      "Zinn ist ein gut formbares Metall mit vergleichsweise niedrigem Schmelzpunkt. Es schützt andere Metalle als Beschichtung und ist ein wichtiger Bestandteil vieler Lote.",
      "Reines Zinn und Zinnlegierungen verhalten sich unterschiedlich. Bei elektronischen Lötstellen sind beispielsweise Temperaturwechsel, mechanische Belastung und die genaue Legierungszusammensetzung entscheidend.",
    ],
    uses: [
      "Lote für Elektronik und Metallverbindungen",
      "Verzinnte Stahlbleche für Verpackungen",
      "Bronze, Weißmetall und weitere Legierungen",
    ],
  },
  {
    slug: "antimon",
    introduction: [
      "Antimon ist ein Halbmetall, das in Legierungen und bestimmten chemischen Verbindungen genutzt wird. Es kann Metalle härter machen und ist deshalb in ausgewählten Blei- und Zinnlegierungen relevant.",
      "Viele Antimonverbindungen erfordern eine sorgfältige Gefährdungsbeurteilung. Die Eigenschaften einer Verbindung lassen sich nicht pauschal aus dem Element ableiten.",
    ],
    uses: [
      "Härtende Zusätze in Speziallegierungen",
      "Flammschutzsysteme in geeigneten Materialrezepturen",
      "Halbleiter und Spezialglas",
    ],
  },
  {
    slug: "tellur",
    introduction: [
      "Tellur ist ein seltenes Halbmetall mit Halbleitereigenschaften. Es wird vor allem als Zusatzstoff oder Bestandteil von Verbindungen verwendet, nicht als verbreiteter Konstruktionswerkstoff.",
      "Ein wichtiger Bereich sind thermische und photovoltaische Materialien. Die Leistung hängt dort stark von Kristallstruktur, Reinheit und der Kombination mit anderen Elementen ab.",
    ],
    uses: [
      "Cadmiumtellurid in ausgewählten Solarzellen",
      "Thermoelektrische Werkstoffe",
      "Zusatz in Spezialstählen und Kupferlegierungen",
    ],
  },
  {
    slug: "iod",
    introduction: [
      "Iod ist ein Halogen und liegt bei Raumtemperatur als dunkler Feststoff vor, der leicht violetten Dampf bilden kann. In der Chemie wird es hauptsächlich über Iodverbindungen eingesetzt.",
      "Iod ist für den menschlichen Organismus ein Spurenelement, doch die gesundheitliche Anwendung von Iodverbindungen braucht eine passende Dosierung. Technische, medizinische und ernährungsbezogene Fragen dürfen nicht gleichgesetzt werden.",
    ],
    uses: [
      "Diagnostische und pharmazeutische Iodverbindungen",
      "Desinfektionsmittel in geeigneten Rezepturen",
      "Speziallampen und chemische Synthesen",
    ],
  },
  {
    slug: "xenon",
    introduction: [
      "Xenon ist ein schweres Edelgas und kommt in der Atmosphäre nur in Spuren vor. Es ist chemisch weitgehend träge, kann aber unter speziellen Bedingungen Verbindungen bilden.",
      "Seine hohe Masse und seine Eigenschaften in Gasentladungen machen Xenon für besondere Licht- und Antriebssysteme interessant. Wegen der geringen Verfügbarkeit wird es gezielt eingesetzt.",
    ],
    uses: [
      "Hochintensive Blitz- und Entladungslampen",
      "Ionentriebwerke in der Raumfahrt",
      "Medizinische Bildgebung und Forschung in Spezialanwendungen",
    ],
  },
  {
    slug: "caesium",
    introduction: [
      "Caesium ist ein sehr reaktives Alkalimetall. Seine Atome liefern eine besonders präzise Frequenzreferenz, weshalb das Element für Zeitmessung große Bedeutung hat.",
      "Elementares Caesium reagiert heftig mit Wasser und Luft. Es wird daher nur unter streng kontrollierten Bedingungen gelagert und verarbeitet; technische Anwendungen nutzen oft geschlossene Systeme oder Caesiumverbindungen.",
    ],
    uses: [
      "Atomuhren und präzise Zeitnormale",
      "Spezialdetektoren und photoelektrische Systeme",
      "Bohr- und Prozesschemie mit Caesiumverbindungen",
    ],
  },
  {
    slug: "barium",
    introduction: [
      "Barium ist ein Erdalkalimetall, das wegen seiner Reaktivität in der Praxis fast nur als Verbindung verwendet wird. Besonders Bariumsulfat ist chemisch schwer löslich und technisch sowie medizinisch bedeutsam.",
      "Lösliche Bariumverbindungen können giftig sein. Zwischen Bariumsulfat, anderen Bariumsalzen und elementarem Barium bestehen daher erhebliche Unterschiede in Handhabung und Risiko.",
    ],
    uses: [
      "Bariumsulfat für Röntgenkontrastmittel unter medizinischer Aufsicht",
      "Spezialglas, Keramik und Bohrspülungen",
      "Elektronik- und Magnetwerkstoffe",
    ],
  },
  {
    slug: "lanthan",
    introduction: [
      "Lanthan ist ein Metall der seltenen Erden und wird überwiegend in Mischungen mit verwandten Elementen gewonnen. Seine Verbindungen können optische, katalytische und elektrochemische Eigenschaften von Materialien beeinflussen.",
      "Als reines Metall ist Lanthan reaktiv. In Produkten begegnet man häufiger Lanthanoxid oder Legierungen, deren Leistung von Zusammensetzung und Verarbeitung abhängt.",
    ],
    uses: [
      "Optische Spezialgläser",
      "Katalysatoren für Raffinerie- und Chemieprozesse",
      "Nickel-Metallhydrid-Batterien",
    ],
  },
  {
    slug: "cer",
    introduction: [
      "Cer ist eines der häufigeren Elemente der seltenen Erden. Ceroxid kann Sauerstoff speichern und wieder abgeben, was für Katalyse und Oberflächenbearbeitung nützlich ist.",
      "Die meisten technischen Anwendungen verwenden Cer als Oxid oder in Mischungen. Die Wirkung hängt daher von Korngröße, Reinheit und der jeweiligen Materialmatrix ab.",
    ],
    uses: [
      "Glaspolitur mit Ceroxid",
      "Abgaskatalysatoren und Sauerstoffspeicher",
      "Feuerzeugsteine und Speziallegierungen",
    ],
  },
  {
    slug: "praseodym",
    introduction: [
      "Praseodym ist ein Element der seltenen Erden und wird in kleinen Mengen zur gezielten Veränderung von Glas, Keramik und Magnetmaterialien eingesetzt. Seine Verbindungen können charakteristische gelbgrüne Farbtöne erzeugen.",
      "Die Nachfrage ergibt sich meist aus Spezialanwendungen, nicht aus großen Massenmärkten. Wie bei anderen seltenen Erden sind Trennung, Reinheit und Recycling wichtige Faktoren.",
    ],
    uses: [
      "Färbung von Spezialglas und Keramik",
      "Magnete und ausgewählte Legierungen",
      "Katalytische und optische Spezialmaterialien",
    ],
  },
  {
    slug: "neodym",
    introduction: [
      "Neodym ist ein Element der seltenen Erden, das besonders für starke Permanentmagnete bekannt ist. Neodym-Eisen-Bor-Magnete liefern bei geringem Volumen hohe magnetische Feldstärken.",
      "Die Eigenschaften eines Magneten hängen nicht nur von Neodym ab, sondern auch von Legierung, Beschichtung, Temperatur und Bauform. Starke Magnete können Geräte und Quetschrisiken verursachen.",
    ],
    uses: [
      "Elektromotoren und Generatoren",
      "Lautsprecher, Kopfhörer und Sensoren",
      "Laser und Spezialglas",
    ],
  },
  {
    slug: "promethium",
    introduction: [
      "Promethium ist ein radioaktives Element der seltenen Erden und besitzt keine stabilen Isotope. In der Natur kommt es nur in äußerst kleinen Mengen vor; technische Mengen werden künstlich erzeugt.",
      "Seine Nutzung ist wegen der Radioaktivität auf spezialisierte Forschung und geschlossene technische Systeme beschränkt. Auswahl, Abschirmung und Entsorgung folgen strengen Strahlenschutzvorgaben.",
    ],
    uses: [
      "Forschung zu radioaktiven seltenen Erden",
      "Historische Spezialbatterien und Messquellen",
      "Referenzmaterialien in Fachlaboren",
    ],
  },
  {
    slug: "samarium",
    introduction: [
      "Samarium ist ein Element der seltenen Erden und wird vor allem in magnetischen und neutronenabsorbierenden Materialien eingesetzt. Seine Besonderheiten werden meist über Legierungen oder Oxide genutzt.",
      "Samarium-Kobalt-Magnete behalten ihre Eigenschaften bei hohen Temperaturen besser als manche andere Permanentmagnete. Die konkrete Eignung hängt aber stets von Legierung und Einsatztemperatur ab.",
    ],
    uses: [
      "Samarium-Kobalt-Permanentmagnete",
      "Neutronenabsorption in spezialisierten Anwendungen",
      "Optische Gläser und katalytische Materialien",
    ],
  },
  {
    slug: "europium",
    introduction: [
      "Europium ist ein seltenes Erdelement, dessen Verbindungen intensive rote und blaue Lumineszenz erzeugen können. Dadurch hat es für Lichtquellen und Anzeigeelemente eine besondere Bedeutung.",
      "Schon kleine Mengen können die Farbe eines Leuchtstoffs stark beeinflussen. Die gewünschte Wirkung hängt von der chemischen Umgebung des Europiums und der Anregungsquelle ab.",
    ],
    uses: [
      "Rote und blaue Leuchtstoffe für Displays",
      "Energiesparlampen und Spezialbeleuchtung",
      "Sicherheitsmerkmale auf Dokumenten und Banknoten",
    ],
  },
  {
    slug: "gadolinium",
    introduction: [
      "Gadolinium ist ein seltenes Erdelement mit ausgeprägten magnetischen Eigenschaften. Es kann Neutronen besonders gut einfangen und wird deshalb in ausgewählten technischen und medizinischen Kontexten genutzt.",
      "Gadoliniumhaltige Kontrastmittel sind chemisch gebundene Arzneimittel und nur unter medizinischer Fachaufsicht einzusetzen. Das Element selbst ist nicht mit einer fertigen medizinischen Anwendung gleichzusetzen.",
    ],
    uses: [
      "Kontrastmittelverbindungen für Magnetresonanztomographie",
      "Neutronenabsorption und Kerntechnik",
      "Magnetische Kühlung und Speziallegierungen",
    ],
  },
  {
    slug: "terbium",
    introduction: [
      "Terbium ist ein seltenes Erdelement, das vor allem für grüne Leuchtstoffe und magnetische Spezialmaterialien gebraucht wird. Seine Verbindungen können Licht effizient in charakteristischen Farben emittieren.",
      "Die technische Nachfrage ist stark an bestimmte Elektronik- und Beleuchtungsanwendungen gekoppelt. Rohstoffgewinnung und Recycling sind bei diesen kleinen Materialströmen besonders relevant.",
    ],
    uses: [
      "Grüne Leuchtstoffe für Displays und Lampen",
      "Magnetostriktive Werkstoffe",
      "Spezialoptik und Lasermaterialien",
    ],
  },
  {
    slug: "dysprosium",
    introduction: [
      "Dysprosium ist ein seltenes Erdelement, das die Temperaturbeständigkeit bestimmter Permanentmagnete verbessern kann. Es wird daher oft nur als kleiner, aber wirkungsvoller Zusatz verwendet.",
      "Der Einsatz muss abgewogen werden: Dysprosium verbessert einige Eigenschaften, ist aber ein kritischer Rohstoff. Magnetdesign, Recycling und alternative Werkstoffe beeinflussen den tatsächlichen Bedarf.",
    ],
    uses: [
      "Hochtemperaturfeste Permanentmagnete",
      "Neutronenabsorption in Spezialtechnik",
      "Laser- und Beleuchtungsmaterialien",
    ],
  },
  {
    slug: "holmium",
    introduction: [
      "Holmium besitzt unter den Elementen ein sehr hohes magnetisches Moment. Es ist ein seltenes Erdelement und wird fast ausschließlich in speziellen optischen, magnetischen oder medizinischen Systemen eingesetzt.",
      "Die Eigenschaften kommen meist in Form von Holmiumverbindungen oder dotierten Kristallen zum Tragen. Reines Metall ist für die meisten Anwender nicht der relevante Werkstoff.",
    ],
    uses: [
      "Laser für medizinische und technische Spezialanwendungen",
      "Magnetische Forschung und Kalibrierstandards",
      "Dotierte optische Materialien",
    ],
  },
  {
    slug: "erbium",
    introduction: [
      "Erbium ist ein seltenes Erdelement, das Licht in einem für Glasfaserkommunikation besonders wichtigen Infrarotbereich verstärken kann. Diese Eigenschaft macht es für die optische Nachrichtentechnik wertvoll.",
      "Erbium wird in kleinen Mengen in Glasfasern oder Kristallen eingesetzt. Die Verstärkung hängt von Dotierung, Pumplicht und Aufbau des optischen Systems ab.",
    ],
    uses: [
      "Erbium-dotierte Faserverstärker",
      "Laser und optische Kommunikation",
      "Rosa Färbung von Spezialglas",
    ],
  },
  {
    slug: "thulium",
    introduction: [
      "Thulium ist eines der selteneren Elemente der seltenen Erden. Es wird in sehr kleinen Mengen für spezialisierte Lichtquellen, Laser und radiologische Anwendungen verwendet.",
      "Die besondere Eignung entsteht meist durch Thuliumionen in einem Wirtskristall oder Glas. Deshalb bestimmen die gesamte Materialarchitektur und nicht nur das Element die Funktion.",
    ],
    uses: [
      "Laser im nahen Infrarotbereich",
      "Mobile Röntgenquellen mit Thulium-170 in Spezialanwendungen",
      "Spezialkeramik und optische Materialien",
    ],
  },
  {
    slug: "ytterbium",
    introduction: [
      "Ytterbium ist ein seltenes Erdelement, das in Laser- und Fasertechnologien eingesetzt wird. Seine Ionen lassen sich in geeignete Kristalle und Glasfasern einbringen, um Licht gezielt zu verstärken oder umzuwandeln.",
      "In Metalllegierungen kann Ytterbium ebenfalls als gezielter Zusatz dienen. Die Mengen sind meist klein, die Anforderungen an Reinheit und Prozesskontrolle jedoch hoch.",
    ],
    uses: [
      "Ytterbium-dotierte Faserlaser",
      "Optische Verstärker und Präzisionsmesstechnik",
      "Speziallegierungen und Materialforschung",
    ],
  },
  {
    slug: "lutetium",
    introduction: [
      "Lutetium ist ein schweres Element der seltenen Erden und wird für hochspezialisierte optische und nuklearmedizinische Materialien verwendet. Seine Verbindungen sind insbesondere als Kristallmaterialien interessant.",
      "Aufgrund der geringen Verfügbarkeit und des hohen Preises wird Lutetium nur dort eingesetzt, wo seine Eigenschaften einen klaren Vorteil bieten. Recycling kann bei entsprechenden Anwendungen sinnvoll sein.",
    ],
    uses: [
      "Szintillationskristalle für Detektoren",
      "Nuklearmedizinische Radiopharmaka mit Lutetium-177",
      "Spezialkatalysatoren und optische Forschung",
    ],
  },
  {
    slug: "hafnium",
    introduction: [
      "Hafnium ist ein korrosionsbeständiges Übergangsmetall mit hoher Neutronenabsorption. Es tritt in natürlichen Rohstoffen oft zusammen mit Zirconium auf, lässt sich davon aber nur aufwendig trennen.",
      "In hochtemperatur- und kerntechnischen Anwendungen sind Reinheit und Werkstoffzustand entscheidend. Die Eigenschaften von Hafniummetall, Hafniumoxid und Legierungen unterscheiden sich deutlich.",
    ],
    uses: [
      "Steuerstäbe in kerntechnischen Anwendungen",
      "Hochtemperaturlegierungen",
      "Hafniumoxid in Mikroelektronik und Keramik",
    ],
  },
  {
    slug: "tantal",
    introduction: [
      "Tantal ist ein sehr korrosionsbeständiges Übergangsmetall. Es widersteht vielen chemischen Medien und wird dort gewählt, wo gewöhnliche Stähle oder Aluminium nicht dauerhaft ausreichen.",
      "Ein bekannter Einsatz sind kleine, volumenstarke Kondensatoren. Die verantwortungsvolle Beschaffung von Tantal ist wichtig, weil die Lieferketten regional konzentriert sein können.",
    ],
    uses: [
      "Tantal-Kondensatoren in Elektronik",
      "Korrosionsbeständige Apparate für Chemieprozesse",
      "Medizinische Implantate und Spezialwerkzeuge",
    ],
  },
  {
    slug: "wolfram",
    introduction: [
      "Wolfram besitzt den höchsten Schmelzpunkt aller reinen Metalle. Es ist daher für Werkzeuge, Verschleißteile und Bauteile interessant, die hohen Temperaturen oder mechanischer Beanspruchung standhalten müssen.",
      "In der Praxis wird Wolfram häufig als Hartmetall mit Kohlenstoff und Bindemetallen verwendet. Hartmetall und reines Wolfram haben unterschiedliche Bruch-, Bearbeitungs- und Temperaturverhalten.",
    ],
    uses: [
      "Hartmetallwerkzeuge und Verschleißteile",
      "Hochtemperaturbauteile und Elektroden",
      "Gewichte und Strahlenschutzanwendungen",
    ],
  },
  {
    slug: "rhenium",
    introduction: [
      "Rhenium ist ein sehr seltenes Übergangsmetall mit hoher Temperaturbeständigkeit. Es wird meist als kleiner Legierungszusatz verwendet, kann aber die Leistung von Nickelbasis-Superlegierungen deutlich verbessern.",
      "Wegen seiner Seltenheit und seines Preises ist Rhenium für Anwendungen reserviert, in denen hohe Zuverlässigkeit bei großer Hitze erforderlich ist. Rückgewinnung aus gebrauchten Bauteilen ist besonders wertvoll.",
    ],
    uses: [
      "Turbinenschaufeln aus Nickelbasis-Superlegierungen",
      "Katalysatoren für Raffinerieprozesse",
      "Thermoelemente und Hochtemperaturmessung",
    ],
  },
  {
    slug: "osmium",
    introduction: [
      "Osmium ist ein sehr dichtes Platinmetall. Als Metall ist es hart und verschleißbeständig, doch einige Osmiumverbindungen, besonders Osmiumtetroxid, sind stark giftig und flüchtig.",
      "Die technische Nutzung beschränkt sich auf kleine Mengen in Spezialanwendungen. Eine Bearbeitung oder chemische Umwandlung erfordert aufgrund der möglichen Gefahrstoffe fachliche Kontrolle.",
    ],
    uses: [
      "Verschleißarme Kontakte und Lager in Spezialtechnik",
      "Katalyse und Materialforschung",
      "Mikroskopische Färbung mit Osmiumtetroxid im Labor",
    ],
  },
  {
    slug: "iridium",
    introduction: [
      "Iridium ist ein sehr korrosions- und hitzebeständiges Platinmetall. Es eignet sich für Situationen, in denen aggressive Chemikalien oder hohe Temperaturen andere Metalle stark beanspruchen würden.",
      "Weil Iridium selten und teuer ist, wird es meist als dünne Beschichtung oder kleiner Legierungsanteil eingesetzt. Konstruktion und Recycling sind bei solchen Anwendungen besonders wichtig.",
    ],
    uses: [
      "Hochtemperaturtiegel und Zündkerzenbauteile",
      "Korrosionsbeständige Elektroden",
      "Spezialkatalysatoren und wissenschaftliche Geräte",
    ],
  },
  {
    slug: "platin",
    introduction: [
      "Platin ist ein Edelmetall mit hoher chemischer Beständigkeit und sehr guter katalytischer Wirkung. Es ist deshalb sowohl als Werkstoff als auch als aktive Oberfläche in chemischen Reaktionen gefragt.",
      "In vielen Produkten wird nur eine kleine Platinmenge benötigt. Die Wiedergewinnung aus Katalysatoren, Elektronik und Schmuck reduziert den Bedarf an neu gefördertem Material.",
    ],
    uses: [
      "Katalysatoren in Chemie und Abgasreinigung",
      "Laborausrüstung und korrosionsbeständige Elektroden",
      "Schmuck und medizinische Spezialtechnik",
    ],
  },
  {
    slug: "gold",
    introduction: [
      "Gold ist ein Edelmetall, das kaum korrodiert und sich sehr gut verformen lässt. Neben Schmuck ist seine zuverlässige elektrische Kontaktoberfläche ein wichtiger technischer Vorteil.",
      "Reines Gold ist relativ weich. Für belastete Bauteile oder Schmuck werden daher häufig Legierungen eingesetzt, deren Farbe, Härte und Beständigkeit von den Zusatzmetallen abhängen.",
    ],
    uses: [
      "Zuverlässige elektrische Kontakte",
      "Schmuck, Münzen und Wertaufbewahrung",
      "Dünne Beschichtungen in Optik und Elektronik",
    ],
  },
  {
    slug: "quecksilber",
    introduction: [
      "Quecksilber ist bei Raumtemperatur flüssig und bildet leicht Dampf. Es ist giftig; moderne Anwendungen wurden deshalb stark eingeschränkt und durch sicherere Alternativen ersetzt.",
      "Verschüttetes Quecksilber darf nicht mit Haushaltsmitteln oder einem Staubsauger entfernt werden, weil dadurch die Belastung steigen kann. Für Altgeräte gelten kommunale oder fachliche Entsorgungswege.",
    ],
    uses: [
      "Historische Messgeräte und Schalter",
      "Spezielle Labor- und Referenzanwendungen",
      "Rückbau und fachgerechtes Recycling älterer Geräte",
    ],
  },
  {
    slug: "thallium",
    introduction: [
      "Thallium ist ein weiches Schwermetall, dessen Verbindungen sehr giftig sein können. Seine Nutzung ist deshalb auf wenige kontrollierte technische und wissenschaftliche Anwendungen beschränkt.",
      "Die besondere elektrische und optische Wirkung bestimmter Thalliumverbindungen rechtfertigt keine allgemeine Handhabung. Arbeitsschutz und geregelte Entsorgung sind unverzichtbar.",
    ],
    uses: [
      "Spezielle optische und elektronische Detektoren",
      "Infrarotoptik und Spezialglas",
      "Forschung und kalibrierte Messanwendungen",
    ],
  },
  {
    slug: "blei",
    introduction: [
      "Blei ist ein sehr dichtes, weiches Metall und absorbiert Röntgen- und Gammastrahlung gut. Wegen seiner Toxizität ist der Einsatz in vielen Verbraucherprodukten eingeschränkt.",
      "Die Belastung durch Bleistaub oder Bleiverbindungen muss vermieden werden. Moderne Anwendungen setzen auf geschlossene Kreisläufe, geeigneten Arbeitsschutz und Rückgewinnung des Metalls.",
    ],
    uses: [
      "Blei-Säure-Batterien",
      "Strahlenschutz in fachgerecht geplanten Anlagen",
      "Spezialgewichte und historische Bauanwendungen",
    ],
  },
  {
    slug: "wismut",
    introduction: [
      "Wismut ist ein schweres Metall mit vergleichsweise geringer Toxizität gegenüber vielen anderen Schwermetallen. Es bildet auffällige Kristalle und besitzt eine geringe Wärmeleitfähigkeit.",
      "Wismut kann in niedrigschmelzenden Legierungen Eigenschaften liefern, die für Sicherheits- und Präzisionstechnik hilfreich sind. Die jeweilige Legierung bestimmt jedoch Schmelzpunkt und Festigkeit.",
    ],
    uses: [
      "Niedrigschmelzende Sicherheitslegierungen",
      "Pharmazeutische Wismutverbindungen unter fachlicher Anwendung",
      "Pigmente, Kosmetik und Spezialmetallurgie",
    ],
  },
  {
    slug: "polonium",
    introduction: [
      "Polonium ist ein stark radioaktives Element ohne stabile Isotope. Es kommt natürlich nur in sehr kleinen Mengen vor und wird für technische Zwecke künstlich erzeugt.",
      "Die Strahlung und Giftigkeit machen Polonium zu einem Stoff für streng kontrollierte Spezialanwendungen. Es gehört nicht in allgemeine Labor- oder Verbraucheranwendungen.",
    ],
    uses: [
      "Historische antistatische Quellen in geschlossenen Geräten",
      "Radioisotopenforschung",
      "Referenz- und Messmaterial in Speziallaboren",
    ],
  },
  {
    slug: "astat",
    introduction: [
      "Astat ist das seltenste natürlich vorkommende Halogen und stark radioaktiv. Von seinen Isotopen sind alle kurzlebig, weshalb nur winzige Mengen für Forschung hergestellt werden.",
      "Chemische Eigenschaften werden häufig aus Analogie zu Iod und anderen Halogenen untersucht. Praktische Anwendungen sind auf nuklearmedizinische Forschung und hochspezialisierte Labore begrenzt.",
    ],
    uses: [
      "Forschung zu Alpha-Emittern",
      "Erprobung gezielter Radiopharmaka mit Astat-211",
      "Grundlagenforschung zu schweren Halogenen",
    ],
  },
  {
    slug: "radon",
    introduction: [
      "Radon ist ein radioaktives Edelgas, das beim Zerfall von Uran und Radium im Boden entstehen kann. In Gebäuden kann es sich je nach Untergrund und Lüftung anreichern.",
      "Erhöhte Radonkonzentrationen lassen sich nur durch Messen feststellen. Bauliche Abdichtung und kontrollierte Lüftung sind typische Maßnahmen, wenn Fachmessungen einen Handlungsbedarf zeigen.",
    ],
    uses: [
      "Geologische und radiologische Messungen",
      "Kalibrierung von Radonmessgeräten",
      "Forschung zu Innenraumluft und Strahlenschutz",
    ],
  },
  {
    slug: "francium",
    introduction: [
      "Francium ist ein extrem seltenes, stark radioaktives Alkalimetall. Seine Isotope zerfallen so schnell, dass sich keine makroskopischen Mengen dauerhaft gewinnen oder lagern lassen.",
      "Daher gibt es keine industrielle Nutzung. Beobachtungen und Untersuchungen erfolgen ausschließlich in der Kern- und Atomphysik mit kurzfristig erzeugten oder nachgewiesenen Atomen.",
    ],
    uses: [
      "Atomphysikalische Grundlagenforschung",
      "Untersuchung radioaktiver Zerfallsreihen",
      "Theoretische und spektroskopische Forschung",
    ],
  },
  {
    slug: "radium",
    introduction: [
      "Radium ist ein radioaktives Erdalkalimetall, das beim Zerfall von Uran entsteht. Historische Leuchtfarben mit Radium haben zu langfristigen Gesundheits- und Entsorgungsproblemen geführt.",
      "Heute wird Radium nur noch in eng begrenzten Fachanwendungen behandelt. Verdächtige Altgegenstände oder historische Anzeigen sollten von Fachstellen bewertet und nicht geöffnet werden.",
    ],
    uses: [
      "Historische Leuchtfarben und ihre fachgerechte Sanierung",
      "Strahlenschutz- und Zerfallsforschung",
      "Spezialisierte medizinische Forschung",
    ],
  },
  {
    slug: "actinium",
    introduction: [
      "Actinium ist ein radioaktives Actinoid und kommt in der Natur nur in Spuren vor. Es wird künstlich erzeugt oder aus Zerfallsreihen gewonnen und ausschließlich in Spezialbereichen verwendet.",
      "Besonders Actinium-225 wird für die Erforschung gezielter Alpha-Therapien untersucht. Herstellung, Transport und Anwendung radioaktiver Isotope unterliegen dabei strenger Kontrolle.",
    ],
    uses: [
      "Forschung zu gezielten Alpha-Therapien",
      "Radiochemie und Isotopenforschung",
      "Referenz- und Messquellen in Speziallaboren",
    ],
  },
  {
    slug: "thorium",
    introduction: [
      "Thorium ist ein schwach radioaktives Actinoid, das in Mineralien vorkommt. Es besitzt als möglicher Kernbrennstoff und in bestimmten Hochtemperaturmaterialien wissenschaftliches Interesse.",
      "Radioaktive Stoffe und thoriumhaltige Altmaterialien dürfen nur nach den geltenden Schutz- und Entsorgungsregeln behandelt werden. Die Eignung für Energietechnik hängt von einem vollständigen Brennstoffkreislauf ab.",
    ],
    uses: [
      "Kernenergieforschung und Brennstoffkonzepte",
      "Hochtemperaturkeramik und Speziallegierungen",
      "Historische Gasglühstrümpfe und deren fachgerechte Entsorgung",
    ],
  },
  {
    slug: "protactinium",
    introduction: [
      "Protactinium ist ein seltenes, radioaktives Actinoid aus der Uran-Zerfallsreihe. Alle Isotope sind radioaktiv; für Forschung stehen nur sehr kleine Mengen zur Verfügung.",
      "Wegen seiner Seltenheit, Radioaktivität und chemischen Empfindlichkeit besitzt Protactinium keine breite technische Nutzung. Untersuchungen erfolgen in spezialisierten radiochemischen Laboren.",
    ],
    uses: [
      "Forschung zu Actinoiden und Zerfallsreihen",
      "Radiochemische Referenzmessungen",
      "Grundlagenforschung zur Kernstruktur",
    ],
  },
  {
    slug: "uran",
    introduction: [
      "Uran ist ein schweres, radioaktives Actinoid, das natürlich in Mineralien vorkommt. Seine Isotope und deren Anreicherung bestimmen, ob ein Material für Energie, Forschung oder andere regulierte Zwecke relevant ist.",
      "Gewinnung, Verarbeitung und Entsorgung von Uran unterliegen strengen internationalen und nationalen Regeln. Gesundheitsschutz betrifft dabei sowohl Radioaktivität als auch die chemische Toxizität von Uranverbindungen.",
    ],
    uses: [
      "Kernbrennstoff in zugelassenen Reaktorsystemen",
      "Forschung zu Kernenergie und Geologie",
      "Abgeschirmte Mess- und Referenzanwendungen",
    ],
  },
  {
    slug: "neptunium",
    introduction: [
      "Neptunium ist ein künstlich oder in Spuren aus Reaktorprozessen entstehendes Actinoid. Alle relevanten Isotope sind radioaktiv, und das Element wird nur in spezialisierten Einrichtungen gehandhabt.",
      "Es dient vor allem der Forschung zu Kernbrennstoffkreisläufen und Actinoiden. Transport, Lagerung und Analytik erfordern zugelassene Abschirmungs- und Kontrollverfahren.",
    ],
    uses: [
      "Forschung zu Kernbrennstoffkreisläufen",
      "Herstellung von Plutonium-238 in kontrollierten Prozessen",
      "Radiochemische Referenz- und Analytikarbeit",
    ],
  },
  {
    slug: "plutonium",
    introduction: [
      "Plutonium ist ein künstlich erzeugtes, radioaktives Actinoid mit mehreren Isotopen. Seine Eigenschaften, Gefährdung und rechtliche Behandlung unterscheiden sich stark je nach Isotop und chemischer Form.",
      "Es wird ausschließlich in streng regulierten Kerntechnik- und Forschungsprogrammen eingesetzt. Der Umgang erfordert Schutz gegen Strahlung, Kontamination und die chemische Toxizität feiner Partikel.",
    ],
    uses: [
      "Radioisotopenenergiequellen mit Plutonium-238 in Raumfahrtmissionen",
      "Forschung zu Kernmaterialien und Entsorgung",
      "Spezialisierte Referenz- und Sicherheitsanalytik",
    ],
  },
  {
    slug: "americium",
    introduction: [
      "Americium ist ein künstliches, radioaktives Actinoid. Besonders Americium-241 ist als Alpha-Strahler technisch bekannt, wird aber ausschließlich in gekapselter und regulierter Form verwendet.",
      "Ausgediente americiumhaltige Geräte gehören nicht in den Hausmüll. Sie müssen über die vorgesehenen Rücknahme- oder Entsorgungswege behandelt werden, damit keine Kontamination entsteht.",
    ],
    uses: [
      "Ionisationsrauchmelder in zugelassenen Bauformen",
      "Industrielle Mess- und Prüftechnik",
      "Actinoidforschung und Referenzquellen",
    ],
  },
  {
    slug: "curium",
    introduction: [
      "Curium ist ein künstlich erzeugtes, stark radioaktives Actinoid. Es entsteht in Kernreaktoren oder Beschleunigern und ist für die Grundlagenforschung zu schweren Elementen wichtig.",
      "Die starke Radioaktivität begrenzt den Einsatz auf abgeschirmte Fachlaboratorien. Schon die Probenmenge, das Isotop und die Zerfallswärme beeinflussen die erforderliche Handhabung.",
    ],
    uses: [
      "Forschung zu schweren Elementen und Kernreaktionen",
      "Herstellung schwererer Transurane in Speziallaboren",
      "Radiochemische Referenzmessungen",
    ],
  },
  {
    slug: "berkelium",
    introduction: [
      "Berkelium ist ein künstliches Actinoid, das nur in winzigen Mengen erzeugt wird. Es hat keine breite technische Nutzung, ist aber wissenschaftlich wichtig als Ausgangsstoff für die Synthese noch schwererer Elemente.",
      "Alle Arbeiten mit Berkelium erfolgen in hochspezialisierten Laboren. Radioaktivität, kurze Verfügbarkeit und die sehr geringe Menge bestimmen die Forschungspraxis.",
    ],
    uses: [
      "Synthese und Untersuchung superschwerer Elemente",
      "Actinoid- und Kernchemieforschung",
      "Referenzmaterial für Spezialanalytik",
    ],
  },
  {
    slug: "californium",
    introduction: [
      "Californium ist ein künstliches, stark radioaktives Actinoid. Bestimmte Isotope setzen viele Neutronen frei und können deshalb als kompakte Neutronenquelle dienen.",
      "Die Verwendung ist wegen Strahlung, Kosten und Verfügbarkeit streng spezialisiert. Abschirmung, Dosimetrie und Zugangsregeln sind dabei wesentliche Voraussetzungen.",
    ],
    uses: [
      "Neutronenquellen für Materialprüfung",
      "Aktivierungsanalyse und Forschung",
      "Spezialisierte Bohrlochmessungen",
    ],
  },
  {
    slug: "einsteinium",
    introduction: [
      "Einsteinium ist ein künstliches Element, das in extrem kleinen Mengen entsteht. Seine Isotope sind radioaktiv und kurzlebig, daher sind Untersuchungen auf wenige Forschungseinrichtungen beschränkt.",
      "Praktische Produkte mit Einsteinium gibt es nicht. Sein wissenschaftlicher Wert liegt vor allem im Verständnis der Chemie und Physik sehr schwerer Elemente.",
    ],
    uses: [
      "Grundlagenforschung zu schweren Actinoiden",
      "Spektroskopie und kernchemische Messungen",
      "Ausgangsmaterial für Experimente mit schwereren Elementen",
    ],
  },
  {
    slug: "fermium",
    introduction: [
      "Fermium ist ein künstliches, radioaktives Element, das nur in sehr kleinen Mengen hergestellt werden kann. Seine Isotope zerfallen relativ schnell und erlauben keine technische Nutzung außerhalb der Forschung.",
      "Das Element hilft Forschenden, die Grenzen der Kernstabilität und das chemische Verhalten der Actinoide besser zu verstehen. Jede Probe bleibt ein Spezialfall der Hochradiochemie.",
    ],
    uses: [
      "Kern- und Atomstrukturforschung",
      "Chemie der schweren Actinoide",
      "Hochspezialisierte Referenzmessungen",
    ],
  },
  {
    slug: "mendelevium",
    introduction: [
      "Mendelevium ist ein künstlich erzeugtes, radioaktives Element. Es wird Atom für Atom oder in geringsten Mengen in Beschleuniger- und Reaktorexperimenten untersucht.",
      "Seine kurze Lebensdauer und begrenzte Erzeugbarkeit schließen eine industrielle Anwendung aus. Die Forschung liefert jedoch Daten über Elektronenstruktur und Kernkräfte schwerer Elemente.",
    ],
    uses: [
      "Grundlagenforschung zu Transuranen",
      "Kernphysikalische Messungen",
      "Erprobung radiochemischer Trennverfahren",
    ],
  },
  {
    slug: "nobelium",
    introduction: [
      "Nobelium ist ein künstliches, radioaktives Actinoid mit kurzlebigen Isotopen. Es wird nur in wenigen Forschungslaboren erzeugt und chemisch charakterisiert.",
      "Die Untersuchung seines Oxidationsverhaltens unterstützt das Verständnis der Actinoid-Reihe. Außerhalb dieser Grundlagenforschung besteht keine praktische Nutzung.",
    ],
    uses: [
      "Actinoidchemie und Grundlagenforschung",
      "Kernphysikalische Spektroskopie",
      "Referenzexperimente in Beschleunigerlaboren",
    ],
  },
  {
    slug: "lawrencium",
    introduction: [
      "Lawrencium ist das letzte Element der Actinoid-Reihe und wird künstlich erzeugt. Seine Isotope sind radioaktiv und so kurzlebig, dass chemische Daten nur mit sehr wenigen Atomen gewonnen werden können.",
      "Das Element ist für die Einordnung des Periodensystems und die Erforschung relativistischer Effekte in schweren Atomen interessant. Eine technische Nutzung gibt es nicht.",
    ],
    uses: [
      "Grundlagenforschung zur Periodensystemstruktur",
      "Kern- und Atomphysik schwerer Elemente",
      "Experimentelle Chemie mit einzelnen Atomen",
    ],
  },
  {
    slug: "rutherfordium",
    introduction: [
      "Rutherfordium ist ein künstliches, radioaktives Übergangsmetall der 4. Gruppe. Es wird in Teilchenbeschleunigern atomweise erzeugt und zerfällt nach kurzer Zeit.",
      "Seine chemischen Eigenschaften werden mit denen von Hafnium und Zirconium verglichen. Solche Experimente helfen, die Rolle relativistischer Effekte bei superschweren Elementen zu verstehen.",
    ],
    uses: [
      "Forschung zu superschweren Elementen",
      "Chemische Experimente mit einzelnen Atomen",
      "Kernstruktur- und Zerfallsmessungen",
    ],
  },
  {
    slug: "dubnium",
    introduction: [
      "Dubnium ist ein künstliches, radioaktives Element der 5. Gruppe. Es existiert nur für kurze Zeit nach seiner Erzeugung in Beschleunigerexperimenten.",
      "Die Zuordnung seiner chemischen Eigenschaften zu den leichteren Gruppenhomologen ist Teil der Grundlagenforschung. Aufgrund der winzigen Mengen gibt es keine industrielle Verwendung.",
    ],
    uses: [
      "Forschung zu superschweren Elementen",
      "Radiochemische Einzelatomexperimente",
      "Messung von Kernzerfällen und Reaktionsketten",
    ],
  },
  {
    slug: "scandium",
    introduction: [
      "Scandium ist ein leichtes Übergangsmetall, das in kleinen Mengen die Eigenschaften von Aluminiumlegierungen verändern kann. Es trägt dazu bei, eine feine Gefügestruktur und hohe Festigkeit bei geringem Gewicht zu erreichen.",
      "Der Einsatz bleibt wegen begrenzter Verfügbarkeit und Kosten auf Spezialanwendungen konzentriert. Ob sich Scandium lohnt, hängt vom gesamten Bauteil, der Legierung und dem Fertigungsverfahren ab.",
    ],
    uses: [
      "Aluminium-Scandium-Legierungen für Leichtbau",
      "Hochintensive Metallhalogenidlampen",
      "Spezialkeramik und Materialforschung",
    ],
  },
  {
    slug: "vanadium",
    introduction: [
      "Vanadium ist ein Übergangsmetall, das besonders als Legierungszusatz zu Stahl bekannt ist. Es kann die Festigkeit, Verschleißbeständigkeit und Anlassbeständigkeit geeigneter Stähle verbessern.",
      "In neuen Energiespeichern werden Vanadiumverbindungen in flüssigen Elektrolyten untersucht und eingesetzt. Die Materialwahl richtet sich dabei nach Leistung, Kosten und Sicherheit des gesamten Systems.",
    ],
    uses: [
      "Werkzeug-, Bau- und hochfeste Stähle",
      "Vanadium-Redox-Flow-Batterien",
      "Katalysatoren und Spezialpigmente",
    ],
  },
  {
    slug: "seaborgium",
    introduction: [
      "Seaborgium ist ein künstliches, radioaktives Element der 6. Gruppe. Es wird in Teilchenbeschleunigern atomweise erzeugt und zerfällt innerhalb kurzer Zeit.",
      "Chemische Experimente vergleichen Seaborgium mit Wolfram und Molybdän. Dadurch lässt sich untersuchen, wie sich die Eigenschaften bei sehr schweren Atomen durch relativistische Effekte verändern.",
    ],
    uses: [
      "Forschung zu superschweren Elementen",
      "Einzelatomchemie in Beschleunigerlaboren",
      "Kernzerfalls- und Reaktionsmessungen",
    ],
  },
  {
    slug: "bohrium",
    introduction: [
      "Bohrium ist ein künstliches, radioaktives Element der 7. Gruppe. Es entsteht nur in Kernfusionsreaktionen und seine Isotope sind kurzlebig.",
      "Sein chemisches Verhalten wird mit Rhenium verglichen. Die wenigen möglichen Experimente liefern Grundlagenwissen über Bindungen und Elektronenstruktur superschwerer Atome.",
    ],
    uses: [
      "Grundlagenforschung zu superschweren Elementen",
      "Radiochemische Einzelatomexperimente",
      "Kernphysikalische Zerfallsmessungen",
    ],
  },
  {
    slug: "hassium",
    introduction: [
      "Hassium ist ein künstliches, radioaktives Element der 8. Gruppe. Es wird nur in äußerst kleinen Mengen erzeugt und besitzt keine technische Anwendung außerhalb der Forschung.",
      "Versuche mit flüchtigen Hassiumverbindungen helfen, seine Stellung neben Osmium zu prüfen. Die Untersuchung erfolgt mit einzelnen Atomen und speziell entwickelten Nachweismethoden.",
    ],
    uses: [
      "Chemie superschwerer Elemente",
      "Untersuchung flüchtiger Oxidverbindungen",
      "Kernstruktur- und Halbwertzeitforschung",
    ],
  },
  {
    slug: "meitnerium",
    introduction: [
      "Meitnerium ist ein künstliches, radioaktives Element der 9. Gruppe. Nur wenige Atome wurden erzeugt, und ihre Lebensdauer ist zu kurz für eine umfassende Stoffchemie.",
      "Seine Bedeutung liegt in der Kernphysik: Entstehung und Zerfall von Meitnerium prüfen Modelle der Stabilität sehr schwerer Atomkerne. Industrielle Anwendungen gibt es nicht.",
    ],
    uses: [
      "Forschung zu Kernstabilität superschwerer Elemente",
      "Teilchenbeschleunigerexperimente",
      "Auswertung von Zerfallsketten",
    ],
  },
  {
    slug: "darmstadtium",
    introduction: [
      "Darmstadtium ist ein künstliches, radioaktives Element der 10. Gruppe. Es wird in Beschleunigern durch die Verschmelzung leichterer Kerne erzeugt und zerfällt sehr schnell.",
      "Die wenigen beobachteten Atome liefern Informationen über die Grenzen des Periodensystems. Wegen der kurzen Halbwertszeiten und minimalen Mengen besteht keine Stoffanwendung.",
    ],
    uses: [
      "Forschung zu superschweren Atomkernen",
      "Messung von Zerfallsreihen",
      "Prüfung theoretischer Kernmodelle",
    ],
  },
  {
    slug: "roentgenium",
    introduction: [
      "Roentgenium ist ein künstliches, radioaktives Element der 11. Gruppe. Es wird als schweres Gruppenhomolog von Kupfer, Silber und Gold untersucht, ist aber nur für Sekunden oder kürzer nachweisbar.",
      "Vorhersagen zu seinen chemischen Eigenschaften beruhen auf wenigen Experimenten und theoretischen Modellen. Die Forschung untersucht dabei besonders den Einfluss hoher Kernladung auf Elektronen.",
    ],
    uses: [
      "Atom- und Kernphysik schwerster Elemente",
      "Theoretische und experimentelle Einzelatomchemie",
      "Validierung von Modellen relativistischer Effekte",
    ],
  },
  {
    slug: "copernicium",
    introduction: [
      "Copernicium ist ein künstliches, radioaktives Element der 12. Gruppe. Es wird in Beschleunigerexperimenten erzeugt und seine kurzlebigen Isotope werden über Zerfallssignale identifiziert.",
      "Seine Einordnung neben Zink, Cadmium und Quecksilber ist Gegenstand der Forschung. Theoretisch können relativistische Effekte seine Flüchtigkeit und Bindungen deutlich beeinflussen.",
    ],
    uses: [
      "Forschung zu Eigenschaften schwerster Metalle",
      "Kernzerfalls- und Massenspektrometrieexperimente",
      "Prüfung chemischer Periodizität",
    ],
  },
  {
    slug: "nihonium",
    introduction: [
      "Nihonium ist ein künstliches, radioaktives Element der 13. Gruppe. Es wird atomweise hergestellt und zerfällt, bevor sich makroskopische Mengen bilden können.",
      "Die Erforschung konzentriert sich auf Zerfallsreihen und die Frage, wie es sich im Vergleich zu Bor, Aluminium und Thallium verhält. Eine praktische Nutzung gibt es nicht.",
    ],
    uses: [
      "Forschung zu superschweren Elementen",
      "Kernphysikalische Nachweisexperimente",
      "Theoretische Chemie der 13. Gruppe",
    ],
  },
  {
    slug: "flerovium",
    introduction: [
      "Flerovium ist ein künstliches, radioaktives Element der 14. Gruppe. Es wird in Fusionsexperimenten erzeugt und kann nur über kurze Zerfallsketten beobachtet werden.",
      "Die Eigenschaften schwerer Kerne wie Flerovium sind wichtig für die Suche nach einer möglichen Insel erhöhter Kernstabilität. Stoffliche Anwendungen sind wegen der kurzen Lebensdauer ausgeschlossen.",
    ],
    uses: [
      "Forschung zu Kernstabilität und superschweren Elementen",
      "Messung von Alpha-Zerfallsketten",
      "Entwicklung theoretischer Kernmodelle",
    ],
  },
  {
    slug: "moscovium",
    introduction: [
      "Moscovium ist ein künstliches, radioaktives Element der 15. Gruppe. Es entsteht nur durch aufwendige Beschleunigerexperimente und seine Isotope zerfallen rasch.",
      "Die Erforschung erweitert das Wissen über die chemische Periodizität bei extrem hohen Ordnungszahlen. Angaben zu Stoffeigenschaften bleiben wegen der wenigen erzeugten Atome vorläufig.",
    ],
    uses: [
      "Grundlagenforschung zu superschweren Kernen",
      "Identifikation und Auswertung von Zerfallsketten",
      "Theoretische Untersuchungen der 15. Gruppe",
    ],
  },
  {
    slug: "livermorium",
    introduction: [
      "Livermorium ist ein künstliches, radioaktives Element der 16. Gruppe. Es wird in kleinsten Mengen erzeugt und nur für kurze Zeit über seine radioaktiven Zerfälle nachgewiesen.",
      "Vergleiche mit Sauerstoff, Schwefel und Polonium sind vor allem theoretisch und kernphysikalisch. Eine technische Anwendung ist aufgrund der kurzen Lebensdauer nicht möglich.",
    ],
    uses: [
      "Forschung zu superschweren Elementen",
      "Kernreaktions- und Zerfallsmessungen",
      "Tests von Vorhersagen zur Periodizität",
    ],
  },
  {
    slug: "tenness",
    introduction: [
      "Tenness ist ein künstliches, radioaktives Element der 17. Gruppe. Es ist das schwerste bekannte Halogen, doch seine chemischen Eigenschaften können wegen relativistischer Effekte von denen leichterer Halogene abweichen.",
      "Es werden nur wenige Atome in Beschleunigern erzeugt. Daher beruhen die meisten Angaben auf Zerfallsmessungen und theoretischen Berechnungen, nicht auf makroskopischen Proben.",
    ],
    uses: [
      "Forschung zu schweren Halogenen",
      "Kernphysikalische Zerfallskettenanalyse",
      "Theoretische Chemie superschwerer Atome",
    ],
  },
  {
    slug: "oganesson",
    introduction: [
      "Oganesson ist das Element mit der höchsten bisher bestätigten Ordnungszahl und gehört formal zur Edelgasgruppe. Seine radioaktiven Isotope sind sehr kurzlebig, und seine Eigenschaften können deutlich von denen leichterer Edelgase abweichen.",
      "Die Forschung prüft mit Oganesson die Grenzen von Periodensystem und Kernmodellen. Es gibt keine praktische Stoffanwendung; jede Beobachtung entsteht in hochspezialisierten Beschleunigerexperimenten.",
    ],
    uses: [
      "Forschung zu den Grenzen des Periodensystems",
      "Kernstruktur- und Zerfallsexperimente",
      "Theoretische Modellierung superschwerer Atome",
    ],
  },
];

export function findGermanElementArticle(slug: string) {
  return germanElementArticles.find((article) => article.slug === slug);
}
