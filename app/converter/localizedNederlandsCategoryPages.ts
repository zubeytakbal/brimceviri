// Nederlandstalige categoriepagina's -- geintegreerd in het nieuwe i18n-systeem.
// Onafhankelijk, nieuw bestand (wijzigt geen bestaande tr/en/de/ar/uz/bn/fr/es/pt/it-bestanden).
//
// Bewust beperkt tot de 17 elementen die de identiteit van de site vormen
// (13 kerncategorieen + 4 universele tools op de homepage) -- geen
// wetenschappelijke of alledaagse rekentools. Inhoud vertaald met dezelfde
// diepgang als de TR-bronartikelen (app/converter/categoryArticles.ts en
// app/converter/articles/*/Article.ts).

export type LocalizedNederlandsCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedNederlandsCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedNederlandsCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedNederlandsCategoryPage = {
  locale: "nl";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedNederlandsCategoryFact[];
  sections: LocalizedNederlandsCategorySection[];
  unitTable: LocalizedNederlandsCategoryUnitRow[];
};

export const nederlandsCategoryPages: LocalizedNederlandsCategoryPage[] = [
  {
    locale: "nl",
    slug: "lengte",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Omrekenen van lengte-eenheden",
    description:
      "Reken gratis en direct om tussen meters, kilometers, centimeters, mijlen en voet; bekijk formules en tabellen.",
    introduction: [
      "Lengte is een van de fundamentele natuurkundige grootheden waarmee de hoogte, breedte of dikte van een object, of de afstand tussen twee punten, wordt beschreven. Afhankelijk van de gemeten richting kan hetzelfde object meerdere lengtewaarden hebben.",
      "In de natuurkunde wordt lengte doorgaans weergegeven met het dimensiesymbool L. Veel afgeleide grootheden, zoals oppervlakte, volume, snelheid, versnelling, druk en dichtheid, zijn gedefinieerd op basis van de dimensie lengte.",
      "In het Internationale Eenhedenstelsel (SI) is de basiseenheid van lengte de meter (m). Afhankelijk van de grootte van de gemeten afstand worden de nanometer, micrometer, millimeter, centimeter, meter of kilometer gebruikt. Buiten het metrieke stelsel worden de inch, voet, yard en mijl nog steeds gebruikt, vooral in de Verenigde Staten en het Verenigd Koninkrijk.",
    ],
    facts: [
      { label: "SI-basiseenheid", value: "Meter" },
      { label: "Symbool SI-eenheid", value: "m" },
      { label: "Natuurkundige grootheid", value: "Lengte" },
      { label: "Dimensiesymbool", value: "L" },
      { label: "Huidige definitie van de meter", value: "Afstand die licht in vacuum aflegt in 1/299.792.458 seconde" },
    ],
    sections: [
      {
        title: "Wat is lengte?",
        paragraphs: [
          "Lengte beschrijft de hoogte, breedte of diepte van een object, of de afstand tussen twee punten; het is een van de fundamentele natuurkundige grootheden. Afhankelijk van de gemeten richting kan hetzelfde object meerdere lengtewaarden vertonen.",
          "In de natuurkunde wordt lengte doorgaans weergegeven met het dimensiesymbool L. Talrijke afgeleide grootheden, zoals oppervlakte, volume, snelheid, versnelling, druk en dichtheid, zijn gedefinieerd op basis van de dimensie lengte.",
        ],
      },
      {
        title: "De SI-eenheid van lengte",
        paragraphs: [
          "In het Internationale Eenhedenstelsel is de basiseenheid van lengte de meter, met symbool m. De meter dient als fundamentele referentie voor het definieren van alle andere lengte-eenheden.",
          "Metrieke eenheden zoals kilometer, centimeter, millimeter, micrometer en nanometer zijn via decimale veelvouden en delen aan de meter gekoppeld. Deze structuur maakt het mogelijk om tussen metrieke eenheden om te rekenen met machten van tien.",
        ],
      },
      {
        title: "De wetenschappelijke definitie van de meter",
        paragraphs: [
          "Vroeger werd de meter gedefinieerd op basis van de afmetingen van de aarde en fysieke standaarden. Met de vooruitgang van meettechnologie werd een stabielere, overal ter wereld reproduceerbare definitie noodzakelijk.",
          "Tegenwoordig is een meter gedefinieerd als de lengte van het pad dat licht in vacuum aflegt in een tijdsinterval van 1/299.792.458 seconde. Deze definitie berust op het feit dat de lichtsnelheid in vacuum exact is vastgesteld op 299.792.458 meter per seconde.",
        ],
      },
      {
        title: "De metrieke lengte-eenheden",
        paragraphs: [
          "In het metrieke stelsel zijn eenheden via positieve of negatieve machten van 10 aan de meter gekoppeld. Een kilometer komt overeen met 1000 meter, een centimeter met 0,01 meter en een millimeter met 0,001 meter.",
          "Voor zeer kleine lengtes worden de micrometer, nanometer en picometer gebruikt. Cellen worden vaak in micrometers gemeten, golflengtes van licht in nanometers, en sommige afstanden op atomaire schaal in picometers.",
        ],
      },
      {
        title: "Lengte-eenheden buiten het metrieke stelsel",
        paragraphs: [
          "Inch, voet, yard en landmijl zijn veelgebruikte lengte-eenheden buiten het metrieke stelsel. Ze worden vooral gebruikt in het Amerikaanse maatsysteem en in sommige toepassingen die aan de Britse traditie zijn gebonden.",
          "Een inch komt exact overeen met 2,54 centimeter, een voet met 12 inch en een yard met 3 voet. Een landmijl is exact gedefinieerd als 1609,344 meter.",
        ],
      },
      {
        title: "Lengte in de scheepvaart en luchtvaart",
        paragraphs: [
          "In de scheepvaart en luchtvaart worden afstanden doorgaans uitgedrukt in zeemijlen. Een zeemijl komt exact overeen met 1852 meter.",
          "De zeemijl ontstond uit een historische meetbenadering die gekoppeld is aan de geografische coordinaten van de aarde. De snelheidseenheid knoop betekent eveneens een zeemijl per uur.",
        ],
      },
      {
        title: "Hoe wordt lengte gemeten?",
        paragraphs: [
          "Bij dagelijkse metingen worden instrumenten zoals de liniaal, meetlint, schuifmaat en micrometer gebruikt. De nauwkeurigheid van het gekozen instrument hangt af van de grootte van het te meten object en het vereiste precisieniveau.",
          "In de techniek en wetenschappelijk onderzoek kunnen laserafstandsmeters, coordinatenmeetmachines, interferometers en verschillende optische meetsystemen worden gebruikt.",
        ],
      },
      {
        title: "Meetnauwkeurigheid en onzekerheid",
        paragraphs: [
          "Geen enkele fysieke meting is absoluut perfect. Het resultaat van een meting brengt altijd een zekere onzekerheid met zich mee door de resolutie van het gebruikte instrument, de kalibratie ervan, omgevingsomstandigheden en de toegepaste methode.",
          "Daarom is het bij wetenschappelijke resultaten aan te raden niet alleen de gemeten waarde te vermelden, maar ook de meetonzekerheid en de gebruikte eenheid. Vooral bij precisietechniek kan zelfs een temperatuurschommeling de lengte van een materiaal beinvloeden.",
        ],
      },
      {
        title: "Hoe worden lengte-eenheden omgerekend?",
        paragraphs: [
          "Bij omrekeningen binnen hetzelfde maatsysteem wordt de verhouding tussen de eenheden gebruikt. Om bijvoorbeeld meters naar kilometers om te rekenen, deel je de waarde door 1000; om kilometers naar meters om te rekenen, vermenigvuldig je de waarde met 1000.",
          "Bij omrekeningen tussen het metrieke stelsel en Britse of Amerikaanse eenheden moeten de exact gedefinieerde omrekeningsfactoren worden gebruikt. Om bijvoorbeeld inches naar centimeters om te rekenen, vermenigvuldig je de waarde met 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metriek", commonUse: "Golflengte van licht en nanotechnologie" },
      { name: "Micrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metriek", commonUse: "Cellen, deeltjes en precisiefabricage" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metriek", commonUse: "Technische tekeningen en kleine afmetingen" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metriek", commonUse: "Meting van alledaagse objecten" },
      { name: "Decimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metriek", commonUse: "Onderwijs en sommige volumeberekeningen" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Basislengtematen" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metriek", commonUse: "Weg- en geografische afstanden" },
      { name: "Inch", symbol: "in", referenceValue: "0,0254 m", system: "Brits/Amerikaans", commonUse: "Schermen, leidingen en technische maten" },
      { name: "Voet", symbol: "ft", referenceValue: "0,3048 m", system: "Brits/Amerikaans", commonUse: "Lichaamslengte, bouw en luchtvaart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Brits/Amerikaans", commonUse: "Sportvelden en afstandsmeting" },
      { name: "Mijl", symbol: "mi", referenceValue: "1609,344 m", system: "Brits/Amerikaans", commonUse: "Wegafstanden" },
      { name: "Zeemijl", symbol: "nmi", referenceValue: "1852 m", system: "Scheepvaart", commonUse: "Scheepvaart en luchtvaart" },
    ],
  },
  {
    locale: "nl",
    slug: "oppervlakte",
    sourceSlug: "alan",
    category: "alan",
    title: "Omrekenen van oppervlakte-eenheden",
    description:
      "Reken oppervlaktes om tussen vierkante meters, hectare en vierkante voet; voor berekeningen van grond, gebouwen en bouw.",
    introduction: [
      "Oppervlakte is een afgeleide natuurkundige grootheid die de uitgestrektheid van een tweedimensionaal gebied uitdrukt. Omdat het het product is van een lengte met een andere lengte in dezelfde eenheid, is de dimensie van oppervlakte altijd 'lengte in het kwadraat' (L²).",
      "In het Internationale Eenhedenstelsel is de afgeleide eenheid van oppervlakte de vierkante meter (m²). In de landbouw en voor grond worden de hectare en lokale eenheden veel gebruikt; in het Brits/Amerikaanse stelsel de vierkante voet en de acre; in Zuid-Azie zijn lokale eenheden zoals bigha en katha eveneens gangbaar.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Oppervlakte" },
      { label: "Dimensiesymbool", value: "[L²]" },
      { label: "Afgeleide SI-eenheid", value: "Vierkante meter" },
      { label: "Symbool SI-eenheid", value: "m²" },
      { label: "Basisformule (rechthoek)", value: "Oppervlakte = Lengte × Breedte" },
    ],
    sections: [
      {
        title: "Wat is oppervlakte?",
        paragraphs: [
          "Oppervlakte drukt de uitgestrektheid van een plat of geprojecteerd gebied uit. De omvang van een stuk grond, de vloer van een kamer of een vel papier worden gemeten in oppervlakte.",
          "Oppervlakte is een afgeleide grootheid: ze wordt verkregen door een basislengte-eenheid met zichzelf te vermenigvuldigen. Daarom is de SI-dimensie van oppervlakte L² (lengte in het kwadraat), en oppervlakte is altijd een positieve scalaire grootheid.",
        ],
      },
      {
        title: "De SI-eenheid van oppervlakte: de vierkante meter",
        paragraphs: [
          "In het Internationale Eenhedenstelsel is de afgeleide eenheid van oppervlakte de vierkante meter (m²), die de oppervlakte voorstelt van een vierkant waarvan de zijde precies 1 meter meet.",
          "De vierkante meter is geen onafhankelijke basiseenheid, maar een afgeleide eenheid die wordt verkregen door de lengte-eenheid (de meter) te kwadrateren. Alle andere metrieke oppervlakte-eenheden (vierkante centimeter, vierkante kilometer, enz.) zijn via decimale machten aan de vierkante meter gekoppeld.",
        ],
      },
      {
        title: "Waarom worden oppervlakte-eenheden met een kwadratische verhouding omgerekend?",
        paragraphs: [
          "Bij het omrekenen van lengte-eenheden moet de gebruikte verhouding voor oppervlakte-eenheden worden gekwadrateerd. Zo komt 1 kilometer overeen met 1000 meter, maar 1 vierkante kilometer komt niet overeen met 1000 vierkante meter, maar met 1000², oftewel 1.000.000 vierkante meter.",
          "Dit gebeurt omdat bij een oppervlakte beide afmetingen (lengte en breedte) in dezelfde verhouding toe- of afnemen. Deze kwadratische relatie negeren is de meest voorkomende rekenfout bij oppervlakteomrekeningen -- de aanname dat '1 km² = 1000 m²' is een veelvoorkomende verwarring.",
        ],
      },
      {
        title: "De metrieke oppervlakte-eenheden",
        paragraphs: [
          "In het metrieke stelsel worden de vierkante millimeter en vierkante centimeter voor kleine oppervlaktes gebruikt, de vierkante meter voor alledaagse metingen en de vierkante kilometer voor grote gebieden. Een vierkante centimeter komt overeen met 0,0001 vierkante meter, en een vierkante kilometer met 1.000.000 vierkante meter.",
          "Voor het meten van grond worden de are (100 m²) en het 100 keer grotere veelvoud daarvan, de hectare (10.000 m²), gebruikt. De hectare is wereldwijd de meest gebruikte metrieke grondeenheid om de oppervlakte van landbouwgrond uit te drukken.",
        ],
      },
      {
        title: "Traditionele grondeenheden in Turkije",
        paragraphs: [
          "In Turkije zijn dönüm en dekar de meest gebruikte eenheden om landbouwgrond te meten; beide komen tegenwoordig overeen met 1000 vierkante meter en zijn onderling verwisselbaar. Dekar is de officiele naam in de wetgeving over maten en gewichten, terwijl dönüm het traditionele equivalent in het dagelijks taalgebruik is.",
          "In de Ottomaanse tijd varieerde de grootte van de dönüm per regio tussen 900 en 1600 m². Met de wet op maten en gewichten van 1931 werd de dönüm gelijkgesteld aan de dekar en exact gestandaardiseerd op 1000 m².",
        ],
      },
      {
        title: "De oppervlakte-eenheden van het Brits/Amerikaanse stelsel",
        paragraphs: [
          "De vierkante voet (ft²) en vierkante inch (in²) worden voor kleine oppervlaktes gebruikt, terwijl de acre wordt gebruikt voor grote percelen grond in het Brits/Amerikaanse maatsysteem. Een acre komt exact overeen met 4046,8564224 vierkante meter.",
          "De historische oorsprong van de acre gaat terug op de oppervlakte grond die een span ossen in een dag kon ploegen. Het wordt nog steeds veel gebruikt in vastgoedadvertenties in de Verenigde Staten, het Verenigd Koninkrijk en sommige Gemenebestlanden.",
        ],
      },
      {
        title: "De grondeenheden van Zuid-Azie",
        paragraphs: [
          "In landen zoals India, Bangladesh, Pakistan en Nepal worden lokale grondeenheden zoals bigha, katha, killa, kanal, marla, guntha, biswa en decimal nog steeds veel gebruikt. De grootte van deze eenheden kan aanzienlijk varieren van regio tot regio, zelfs bij dezelfde naam.",
          "Een bigha komt bijvoorbeeld overeen met ongeveer 1338 m² in West-Bengalen, maar kan in een andere deelstaat een andere waarde hebben. Daarom is het bij vastgoedtransacties met deze eenheden belangrijk om te bevestigen welke regionale standaard wordt gebruikt.",
        ],
      },
      {
        title: "Hoe bereken je een oppervlakte?",
        paragraphs: [
          "Voor een rechthoekige oppervlakte is de formule Oppervlakte = Lengte × Breedte. Voor een driehoek gebruik je Oppervlakte = (Basis × Hoogte) / 2, en voor een cirkel, Oppervlakte = π × Straal².",
          "Bij grond met een onregelmatige vorm wordt de oppervlakte doorgaans berekend door de vorm op te delen in kleinere rechthoeken of driehoeken, de oppervlakte van elk deel afzonderlijk te berekenen en deze op te tellen (of, bij kadastrale opmetingen, via oppervlakteformules voor veelhoeken op basis van coordinaten).",
        ],
      },
      {
        title: "Aandachtspunten bij het meten van oppervlaktes",
        paragraphs: [
          "De oppervlaktewaarde in een vastgoedadvertentie of akte moet worden geinterpreteerd op basis van de gebruikte eenheid (m², dönüm, acre, bigha, enz.) en de regionale standaard waarmee die eenheid is gedefinieerd.",
          "Vooral bij internationale vastgoedtransacties voorkomt het overwegen van het exacte equivalent in vierkante meters, in plaats van alleen de gelijkenis van de eenheidsnaam, misverstanden; de omrekentool op deze pagina vergelijkt alle eenheden vanuit een gemeenschappelijke referentie in vierkante meters.",
        ],
      },
    ],
    unitTable: [
      { name: "Vierkante millimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metriek", commonUse: "Technische tekeningen en kleine oppervlaktes" },
      { name: "Vierkante centimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metriek", commonUse: "Oppervlakte van kleine objecten" },
      { name: "Vierkante meter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Oppervlakte van woningen, kantoren en grond" },
      { name: "Are", symbol: "a", referenceValue: "100 m²", system: "Metriek", commonUse: "Kleine percelen grond" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turkije (metriek)", commonUse: "Meting van landbouwgrond" },
      { name: "Hectare", symbol: "ha", referenceValue: "10.000 m²", system: "Metriek", commonUse: "Grote landbouw- en bosgrond" },
      { name: "Vierkante kilometer", symbol: "km²", referenceValue: "1.000.000 m²", system: "SI/metriek", commonUse: "Steden, landen en geografische gebieden" },
      { name: "Vierkante voet", symbol: "ft²", referenceValue: "0,092903 m²", system: "Brits/Amerikaans", commonUse: "Oppervlakte van woningen (VS/VK)" },
      { name: "Vierkante yard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Brits/Amerikaans", commonUse: "Sportvelden en textiel" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Brits/Amerikaans", commonUse: "Grote percelen grond" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varieert per regio)", system: "Zuid-Azie", commonUse: "Landbouwgrond in India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Meting van woningen en grond in Japan" },
    ],
  },
  {
    locale: "nl",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Omrekenen van volume-eenheden",
    description:
      "Reken volumes om tussen liters, milliliters en kubieke meters; vergelijk veelgebruikte eenheden voor vloeistoffen en containers.",
    introduction: [
      "Volume is een afgeleide natuurkundige grootheid die de ruimte uitdrukt die door een driedimensionaal object of container wordt ingenomen of bevat. Omdat het het product is van een lengte-eenheid in drie dimensies (lengte × breedte × hoogte), is de dimensie van volume L³ (lengte tot de derde macht).",
      "In het Internationale Eenhedenstelsel is de afgeleide eenheid van volume de kubieke meter (m³); in het dagelijks leven worden de liter en milliliter veel meer gebruikt. In de keuken zijn de kop, eetlepel en theelepel gangbaar, en in het Amerikaans/Britse stelsel de gallon, quart, pint en vloeibare ounce.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Volume" },
      { label: "Dimensiesymbool", value: "[L³]" },
      { label: "Afgeleide SI-eenheid", value: "Kubieke meter" },
      { label: "Symbool SI-eenheid", value: "m³" },
      { label: "Meest gebruikte eenheid in dagelijks gebruik", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Wat is volume?",
        paragraphs: [
          "Volume is de omvang van de driedimensionale ruimte die door een object wordt ingenomen of die door een container kan worden bevat. Het volume van een vast object drukt zijn fysieke grootte uit, terwijl het volume van een container de hoeveelheid vloeistof of gas uitdrukt die het kan bevatten.",
          "Volume is een afgeleide grootheid, verkregen door een lengte-eenheid in drie dimensies (breedte, hoogte, diepte) te vermenigvuldigen. Daarom is de SI-dimensie ervan L³.",
        ],
      },
      {
        title: "De SI-eenheid van volume: de kubieke meter",
        paragraphs: [
          "In het Internationale Eenhedenstelsel is de afgeleide eenheid van volume de kubieke meter (m³), die de inhoud voorstelt van een kubus waarvan de zijde precies 1 meter meet.",
          "De kubieke meter wordt gebruikt voor grote volumes (watertanks, betonstortingen, containervolume), terwijl in het dagelijks leven de veel kleinere liter de voorkeur heeft. Een kubieke meter komt exact overeen met 1000 liter.",
        ],
      },
      {
        title: "De relatie tussen de liter en de kubieke meter",
        paragraphs: [
          "De liter is een praktische volume-eenheid waarvan het gebruik naast het SI is toegestaan, ook al is het officieel geen SI-eenheid. Een liter komt overeen met het volume van een kubus met een zijde van 10 centimeter (1000 kubieke centimeter).",
          "De onderverdelingen van de liter -- deciliter, centiliter en milliliter -- worden veel gebruikt bij metingen van voedsel, medicijnen en laboratoriumwerk. Een milliliter komt exact overeen met een kubieke centimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Waarom worden volume-eenheden met een kubische verhouding omgerekend?",
        paragraphs: [
          "Terwijl lengte-eenheden met een lineaire verhouding en oppervlakte-eenheden met een kwadratische verhouding worden omgerekend, worden volume-eenheden met een kubische verhouding omgerekend. Zo komt 1 meter overeen met 100 centimeter, maar 1 kubieke meter komt niet overeen met 100 kubieke centimeter, maar met 100³, oftewel 1.000.000 kubieke centimeter.",
          "Deze kubische relatie ontstaat omdat volume gelijktijdig in drie dimensies varieert en is de meest voorkomende conceptuele fout bij volumeomrekeningen -- vooral bij de overgang naar niet-metrieke eenheden zoals de gallon of de kubieke voet is een zorgvuldige berekening vereist.",
        ],
      },
      {
        title: "Keukenmaten",
        paragraphs: [
          "De maten die in recepten worden gebruikt, zoals de eetlepel, theelepel en kop, zijn gestandaardiseerde volume-eenheden waarmee consistente resultaten in verschillende keukens kunnen worden verkregen. Algemeen aanvaarde equivalenten: 1 eetlepel ≈ 15 mL, 1 theelepel ≈ 5 mL, 1 kop ≈ 250 mL.",
          "Deze maten zijn geen exacte wetenschappelijke standaarden, maar breed aanvaarde benaderende waarden in de culinaire praktijk; bij recepten die precisie vereisen (vooral gebak), is het gebruik van een digitale keukenweegschaal betrouwbaarder.",
        ],
      },
      {
        title: "De Amerikaanse en Britse vloeistofvolume-eenheden",
        paragraphs: [
          "De Amerikaanse en Britse stelsels gebruiken eenheden zoals de gallon, quart, pint en vloeibare ounce; maar de grootte van deze eenheden verschilt tussen de twee stelsels. Een Amerikaanse gallon komt overeen met 3,78541 liter, terwijl een Britse imperial gallon overeenkomt met 4,54609 liter -- ongeveer 20% meer.",
          "Dit verschil komt doordat de twee landen historisch verschillende referentiegallons hebben aangenomen (de wijngallon in de Verenigde Staten, de imperial gallon in het Verenigd Koninkrijk). Het is altijd verstandig om te controleren tot welk stelsel de waarde 'gallon' of 'ounce' op een recept of productetiket behoort.",
        ],
      },
      {
        title: "Landbouwkundige en historische volume-eenheden",
        paragraphs: [
          "De bushel en de peck zijn volume-eenheden die historisch werden gebruikt om droge producten zoals granen, fruit en groenten te meten; tegenwoordig worden ze nog steeds gebruikt op sommige landbouwmarkten, vooral in de Verenigde Staten.",
          "In de Ottomaanse tijd waren de kile en de şinik traditionele volume-eenheden die werden gebruikt om granen te meten; 1 kile kwam overeen met 20 şinik. Hoewel deze eenheden kleine regionale variaties vertonen, dienen ze tegenwoordig als referentie voor het interpreteren van historische teksten en documenten.",
        ],
      },
      {
        title: "Hoe bereken je een volume?",
        paragraphs: [
          "Voor een rechthoekig prisma (doos) gebruik je de formule Volume = Lengte × Breedte × Hoogte. Voor een cilinder pas je Volume = π × Straal² × Hoogte toe, en voor een bol, Volume = (4/3) × π × Straal³.",
          "Het volume van onregelmatig gevormde vaste stoffen wordt meestal bepaald met de verplaatsingsmethode (principe van Archimedes) -- door het object onder te dompelen in een met water gevuld vat en het verplaatste watervolume te meten.",
        ],
      },
      {
        title: "Volumemeting in de olie-industrie",
        paragraphs: [
          "In de olie-industrie wordt volume doorgaans uitgedrukt in vaten (bbl); 1 vat komt exact overeen met 158,987 liter (42 Amerikaanse gallons). Deze eenheid is een traditie die teruggaat tot de 19e eeuw, toen olie werd vervoerd in houten vaten die oorspronkelijk voor wijn bedoeld waren.",
          "In industriele processen worden grote volumes doorgaans uitgedrukt in kubieke meters, en kleine laboratoriummetingen in milliliters; de juiste eenheid wordt gekozen op basis van de grootte van het gemeten volume.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metriek", commonUse: "Medische doseringen en kleine metingen" },
      { name: "Theelepel", symbol: "tl", referenceValue: "0,000005 m³ (≈5 mL)", system: "Keukenmaat", commonUse: "Recepten" },
      { name: "Eetlepel", symbol: "el", referenceValue: "0,000015 m³ (≈15 mL)", system: "Keukenmaat", commonUse: "Recepten" },
      { name: "Kop", symbol: "kop", referenceValue: "0,00025 m³ (≈250 mL)", system: "Keukenmaat", commonUse: "Recepten" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metriek", commonUse: "Dranken, brandstof en dagelijks volume" },
      { name: "Vloeibare ounce (VS)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Verenigde Staten", commonUse: "Dranken en cosmeticaverpakkingen" },
      { name: "Pint (VS)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Verenigde Staten", commonUse: "Meting van bier en melk" },
      { name: "Gallon (VS)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Verenigde Staten", commonUse: "Brandstof en grote vloeistofvolumes" },
      { name: "Imperial gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Brits (imperial)", commonUse: "Brandstof en vloeistofmeting in het VK" },
      { name: "Kubieke voet", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Brits/Amerikaans", commonUse: "Bouw en luchtdebiet in klimaatregeling" },
      { name: "Vat (olie)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Olie-industrie", commonUse: "Meting van ruwe olie" },
      { name: "Kubieke meter", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Watertanks, beton en grote volumes" },
    ],
  },
  {
    locale: "nl",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Omrekenen van massa-eenheden",
    description:
      "Reken snel en gratis om tussen kilogram, gram, milligram, ton en pond.",
    introduction: [
      "Massa is een fundamentele natuurkundige grootheid die gerelateerd is aan de hoeveelheid materie van een object en zijn traagheidseigenschap. In het Internationale Eenhedenstelsel is de basiseenheid van massa het kilogram, met symbool kg.",
      "Hoewel massa en gewicht in het dagelijks taalgebruik vaak als synoniemen worden gebruikt, zijn het natuurkundig gezien verschillende grootheden. Massa wordt gemeten in kilogram, terwijl gewicht, als kracht, wordt gemeten in newton.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Massa" },
      { label: "Dimensiesymbool", value: "[M]" },
      { label: "SI-basiseenheid", value: "Kilogram" },
      { label: "Symbool SI-eenheid", value: "kg" },
      { label: "Vakgebied metrologie", value: "Massametrologie" },
    ],
    sections: [
      {
        title: "Wat is massa?",
        paragraphs: [
          "Massa is de natuurkundige grootheid die gerelateerd is aan de weerstand die een object biedt tegen verandering van zijn bewegingstoestand, oftewel traagheid. In de klassieke mechanica wordt de relatie tussen de netto kracht die op een object wordt uitgeoefend en de geproduceerde versnelling uitgedrukt met de gelijkheid F = m·a.",
          "Bij toepassing van dezelfde kracht krijgt een object met een grotere massa een kleinere versnelling. Daarom drukt massa in alledaagse zin niet alleen de hoeveelheid materie in een object uit, maar speelt het ook een fundamentele rol in de bewegingsvergelijkingen.",
          "Massa is een scalaire grootheid. Ze heeft geen richting en het basisdimensiesymbool in het SI-stelsel is de letter M.",
        ],
      },
      {
        title: "Het verschil tussen massa en gewicht",
        paragraphs: [
          "Massa en gewicht zijn niet dezelfde natuurkundige grootheid. Massa is een eigenschap van het object en wordt uitgedrukt in kilogram. Gewicht daarentegen is de kracht die het object ondervindt in een zwaartekrachtveld en wordt gemeten in newton.",
          "De vereenvoudigde gewichtsrelatie wordt geschreven als W = m·g, waarbij W de gewichtskracht voorstelt, m de massa en g de lokale zwaartekrachtversnelling.",
          "De massa van een object blijft ongeveer gelijk op de aarde en de maan; het gewicht varieert echter omdat de lokale zwaartekrachtversnelling verschilt. Daarom is het kilogram in wetenschappelijk gebruik een massa-eenheid en geen gewichtseenheid.",
          "In het dagelijks taalgebruik worden de woorden 'gewicht' en 'massa' vaak door elkaar gebruikt, omdat het resultaat van iets wegen wordt uitgedrukt in kilogram. Het meetinstrument registreert in werkelijkheid het effect van een kracht, maar is gekalibreerd om het resultaat in massa-eenheden weer te geven.",
        ],
      },
      {
        title: "Waarom is het kilogram de SI-basiseenheid voor massa?",
        paragraphs: [
          "In het Internationale Eenhedenstelsel is het kilogram de basiseenheid van massa. Van de SI-basiseenheden is het kilogram de enige waarvan de naam een voorvoegsel bevat.",
          "Het woord gram speelde historisch gezien een belangrijke rol in de vroegste massadefinities van het metrieke stelsel. Maar met de opkomst van praktische standaarden werd het kilogram de fundamentele referentie.",
          "Tegenwoordig wordt het kilogram niet meer gedefinieerd door de massa van een fysieke metalen cilinder, maar op basis van de vastgestelde numerieke waarde van de constante van Planck. De relatie van deze definitie met de kibbleweegschaal en elektrische metingen wordt in detail besproken op de informatiepagina over het kilogram.",
        ],
      },
      {
        title: "De metrieke massa-eenheden",
        paragraphs: [
          "De metrieke massa-eenheden zijn opgebouwd uit het kilogram, het gram en de SI-voorvoegsels die daaraan worden toegevoegd. Een gram komt overeen met 0,001 kilogram, een milligram met 0,001 gram en een microgram met 0,001 milligram.",
          "Voor grote massa's wordt de ton gebruikt. Een metrische ton komt exact overeen met 1000 kilogram. Het symbool van de ton, waarvan het gebruik naast het SI is toegestaan, is de kleine letter t.",
          "De juiste eenheid wordt gekozen op basis van de grootte van de gemeten massa. De massa van een persoon of product kan worden uitgedrukt in kilogram, de inhoud van een voedingsmiddel in gram, de werkzame stof van een medicijn in milligram of microgram, en de lading van een voertuig in ton.",
        ],
      },
      {
        title: "De relatie tussen pond, ounce en kilogram",
        paragraphs: [
          "Het pond en de ounce zijn massa-eenheden die worden gebruikt in de traditionele Britse en Amerikaanse maatsystemen. Het internationale avoirdupois-pond komt exact overeen met 0,45359237 kilogram.",
          "Een avoirdupois-pond is onderverdeeld in 16 ounces. Daarom komt een ounce exact overeen met 0,028349523125 kilogram, of 28,349523125 gram.",
          "Het pond dat voor massa wordt gebruikt en het pound-force, een krachteenheid, zijn verschillende grootheden. Het pond drukt een massa uit, en het pound-force een kracht. In technische berekeningen mogen de symbolen lb en lbf niet worden verward.",
        ],
      },
      {
        title: "Hoe wordt massa gemeten?",
        paragraphs: [
          "Voor het meten van massa kunnen balansweegschalen, elektronische weegschalen, analytische balansen, loadcellen en verschillende industriele weegsystemen met uiteenlopende capaciteiten worden gebruikt.",
          "Vergelijkende weegschalen vergelijken de onbekende massa met traceerbare referentiemassa's. Bij elektronische weegschalen zetten loadcellen de uitgeoefende kracht om in een elektrisch signaal.",
          "Bij zeer nauwkeurige metingen kunnen factoren zoals luchtopwaartse druk, lokale zwaartekrachtversnelling, temperatuur, vochtigheid, trillingen, elektrostatische effecten en de dichtheid van de referentiemassa in aanmerking worden genomen.",
          "De koppeling van massareferenties aan nationale en internationale meetsystemen wordt metrologische traceerbaarheid genoemd. De kalibratieketen maakt het mogelijk metingen die in verschillende laboratoria en bedrijven zijn uitgevoerd, te vergelijken.",
        ],
      },
      {
        title: "De relatie tussen dichtheid, volume en massa",
        paragraphs: [
          "Tussen massa, dichtheid en volume bestaat de relatie m = ρ·V. Hierbij stelt m de massa voor, ρ de dichtheid en V het volume.",
          "Bij hetzelfde volume kan de massa van twee verschillende materialen verschillen op basis van hun dichtheid. Staal en water hebben bijvoorbeeld bij hetzelfde volume niet dezelfde massa.",
          "In het SI-stelsel is de afgeleide basiseenheid van dichtheid het kilogram per kubieke meter. In laboratoriumtoepassingen worden ook regelmatig eenheden zoals gram per kubieke centimeter of gram per milliliter gebruikt.",
        ],
      },
      {
        title: "Onzekerheid bij massameting",
        paragraphs: [
          "Elke echte meting brengt een zekere onzekerheid met zich mee. Het feit dat een weegschaal veel cijfers op het scherm toont, betekent niet dat al die cijfers met dezelfde nauwkeurigheid bekend zijn.",
          "De resolutie van het instrument, de herhaalbaarheid, de niet-lineariteit, de kalibratiestandaard, omgevingsomstandigheden en de methode van de gebruiker kunnen allemaal bijdragen aan de onzekerheid van de massameting.",
          "Bij wetenschappelijk en industrieel werk moet het meetresultaat worden beoordeeld samen met de juiste eenheid, het aantal significante cijfers en informatie over de onzekerheid.",
        ],
      },
      {
        title: "Hoe kies je de juiste massa-eenheid?",
        paragraphs: [
          "Een eenheid kiezen die past bij de grootte van het gemeten object maakt het resultaat leesbaarder. De massa van een persoon kan worden uitgedrukt in kilogram, de werkzame stof van een tablet in milligram, en de lading van een vrachtwagen in ton.",
          "Voor zeer kleine massa's kunnen eenheden met SI-voorvoegsels zoals microgram, nanogram en picogram worden gebruikt. Op atomaire en moleculaire schaal kunnen specifieke eenheden zoals de unified atomic mass unit praktischer zijn.",
          "Bij het uitvoeren van een eenheidsomrekening moet niet alleen de numerieke waarde worden gecontroleerd, maar ook of de gebruikte eenheid massa of kracht uitdrukt.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Zeer kleine hoeveelheden materie" },
      { name: "Microgram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medische en laboratoriummetingen" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doseringen van medicijnen en chemicalien" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Voedsel en kleine objecten" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Basismassametingen" },
      { name: "Ton", symbol: "t", referenceValue: "1000 kg", system: "Metriek", commonUse: "Transport, lading en industrie" },
      { name: "Ounce", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Brits/Amerikaans", commonUse: "Voedsel en kleine massa's" },
      { name: "Pond", symbol: "lb", referenceValue: "0,45359237 kg", system: "Brits/Amerikaans", commonUse: "Lichaamsgewicht en productmassa" },
    ],
  },
  {
    locale: "nl",
    slug: "temperatuur",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Omrekenen van temperatuureenheden",
    description:
      "Reken temperaturen om tussen Celsius, Fahrenheit en Kelvin; bekijk formules en voorbeeldwaarden.",
    introduction: [
      "Temperatuur is een fundamentele natuurkundige grootheid die gerelateerd is aan de gemiddelde kinetische energie van de deeltjes van een materie en uitdrukt hoe 'warm' of 'koud' die materie is. In het Internationale Eenhedenstelsel is de basiseenheid van temperatuur de kelvin.",
      "In het dagelijks leven zijn de Celsius- en Fahrenheitschaal het meest gebruikt; in wetenschappelijk werk wordt de kelvin gebruikt, in sommige technische berekeningen de Rankine, en in historische teksten kan de Reaumur voorkomen. In tegenstelling tot veel andere natuurkundige grootheden vereist temperatuuromrekening tussen eenheden niet alleen vermenigvuldiging, maar ook optellen of aftrekken.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Temperatuur (thermodynamische temperatuur)" },
      { label: "Dimensiesymbool", value: "[Θ]" },
      { label: "SI-basiseenheid", value: "Kelvin" },
      { label: "Symbool SI-eenheid", value: "K" },
      { label: "Absolute nulpunt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Wat is temperatuur?",
        paragraphs: [
          "Temperatuur is een grootheid die rechtstreeks gerelateerd is aan de gemiddelde kinetische (beweging)energie van de atomen en moleculen waaruit een materie bestaat. Hoe sneller de deeltjes bewegen, hoe 'warmer' de materie wordt beschouwd.",
          "Temperatuur is een van de zeven basisgrootheden van het Internationale Eenhedenstelsel en wordt, als thermodynamische temperatuur, weergegeven met het symbool Θ (theta). In tegenstelling tot veel andere grootheden (zoals lengte of massa) is het geen direct optelbare grootheid -- twee lichamen met elkaar in contact brengen telt hun temperaturen niet op, maar brengt ze naar een evenwicht.",
        ],
      },
      {
        title: "De SI-eenheid van temperatuur: de kelvin",
        paragraphs: [
          "De kelvin is de SI-basiseenheid voor temperatuur en wordt weergegeven met het symbool K (zonder gradenteken, gewoon geschreven als 'K'). De Kelvinschaal neemt het absolute nulpunt (de theoretisch laagst mogelijke temperatuur) als uitgangspunt (0 K).",
          "Sinds de SI-herziening van 2019 wordt de kelvin niet meer gedefinieerd op basis van het tripelpunt van water, maar op basis van de vastgestelde numerieke waarde van de constante van Boltzmann (k). Dit zorgt ervoor dat de temperatuureenheid gebaseerd is op een universele constante en niet op een fysieke referentiestof.",
        ],
      },
      {
        title: "Waarom is temperatuuromrekening geen eenvoudige vermenigvuldiging?",
        paragraphs: [
          "Bij grootheden zoals lengte of massa vindt eenheidsomrekening alleen plaats met een vermenigvuldigingsfactor (bijvoorbeeld meter-centimeter). Bij temperatuur vereist de omrekening, omdat de Celsius-, Fahrenheit- en Kelvinschaal verschillende 'nulpunten' hebben, zowel vermenigvuldiging als optellen of aftrekken.",
          "Om bijvoorbeeld van Celsius naar Fahrenheit te gaan, wordt de waarde eerst met 9/5 vermenigvuldigd en wordt er dan 32 bij opgeteld: °F = (°C × 9/5) + 32. Daarom is temperatuur, wiskundig gezien, de enige veelvoorkomende natuurkundige grootheid met een 'affiene' (lineaire, maar niet door de oorsprong gaande) omrekenrelatie.",
        ],
      },
      {
        title: "De Celsiusschaal",
        paragraphs: [
          "De Celsiusschaal werd in 1742 ontwikkeld door de Zweedse astronoom Anders Celsius en definieert het vriespunt van water bij 0 °C en het kookpunt (bij een druk van een atmosfeer) bij 100 °C. Het is een praktisch referentiesysteem dat het begrip van de schaal in het dagelijks leven vergemakkelijkt.",
          "Celsius is wereldwijd de meest gebruikte temperatuurschaal, zowel in wetenschappelijk werk als in dagelijkse weerinformatie in de meeste landen, waaronder Nederland; een klein aantal landen, zoals de Verenigde Staten, geeft in het dagelijks gebruik nog steeds de voorkeur aan Fahrenheit.",
        ],
      },
      {
        title: "De Fahrenheitschaal",
        paragraphs: [
          "De Fahrenheitschaal werd in 1724 ontwikkeld door de Duitse natuurkundige Daniel Gabriel Fahrenheit. Op deze schaal ligt het vriespunt van water bij 32 °F en het kookpunt bij 212 °F -- een exact interval van 180 graden tussen vriezen en koken.",
          "Fahrenheit wordt tegenwoordig nog gebruikt voor dagelijkse temperatuurmetingen in een klein aantal landen, voornamelijk de Verenigde Staten; in wetenschappelijk werk wereldwijd heeft het grotendeels plaatsgemaakt voor Celsius en Kelvin.",
        ],
      },
      {
        title: "Rankine en Reaumur: minder bekende schalen",
        paragraphs: [
          "Rankine is een absolute temperatuurschaal die eenheden van dezelfde grootte als graden Fahrenheit gebruikt, maar het absolute nulpunt als 0 °R neemt; het vriespunt van water ligt bij 491,67 °R. Het wordt vooral verkozen boven Kelvin in sommige thermodynamische technische berekeningen in de Verenigde Staten.",
          "De Reaumurschaal werd in de 18e eeuw ontwikkeld door de Franse wetenschapper Rene Reaumur; deze legt het vriespunt van water vast op 0 °Ré en het kookpunt op 80 °Ré. Hoewel het tegenwoordig praktisch niet meer wordt gebruikt, is het nog terug te vinden als historische referentie in sommige Europese landen (vooral in bepaalde traditionele Russische recepten).",
        ],
      },
      {
        title: "Wat betekent het absolute nulpunt?",
        paragraphs: [
          "Het absolute nulpunt (0 kelvin, -273,15 °C, -459,67 °F) is de theoretische temperatuur waarbij deeltjes, in klassieke zin, de laagst mogelijke kinetische energie bezitten. Volgens de kwantummechanica staan deeltjes zelfs bij het absolute nulpunt niet volledig stil (nulpuntsenergie), maar in klassieke zin kan er geen lagere temperatuur worden gedefinieerd.",
          "In het laboratorium zijn temperaturen bereikt die extreem dicht bij het absolute nulpunt liggen (in de orde van microkelvin, zelfs nanokelvin), maar volgens de derde hoofdwet van de thermodynamica is het onmogelijk om het absolute nulpunt in een eindig aantal stappen exact te bereiken.",
        ],
      },
      {
        title: "Hoe wordt temperatuur gemeten?",
        paragraphs: [
          "Voor het meten van temperatuur worden verschillende technologieen gebruikt: kwik- of alcoholthermometers, digitale thermometers, thermokoppels, weerstandsthermometers (RTD) en infraroodthermometers (contactloos). Elk is geschikt voor een ander temperatuurbereik en precisieniveau.",
          "Thermokoppels worden veel gebruikt in de industrie omdat ze kunnen functioneren over een zeer breed temperatuurbereik (soms van -200 °C tot +2000 °C); ze berekenen de temperatuur op basis van het spanningsverschil dat ontstaat bij de verbinding van twee verschillende metalen.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Basiseenheid", system: "SI", commonUse: "Wetenschappelijke en thermodynamische berekeningen" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metriek (dagelijks gebruik)", commonUse: "Weerkunde, dagelijks leven, wetenschap" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Verenigde Staten", commonUse: "Dagelijkse weerkunde in de Verenigde Staten" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Verenigde Staten (techniek)", commonUse: "Thermodynamische technische berekeningen" },
      { name: "Reaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Historisch (Europa)", commonUse: "Historische teksten, traditionele recepten" },
    ],
  },
  {
    locale: "nl",
    slug: "tijd",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Omrekenen van tijdseenheden",
    description:
      "Gebruik op een pagina de essentiele tijdomrekeningen tussen seconden, minuten en uren.",
    introduction: [
      "Tijd is een fundamentele natuurkundige grootheid die de volgorde uitdrukt waarin gebeurtenissen plaatsvinden en de duur die daartussen ligt. In het Internationale Eenhedenstelsel is de basiseenheid van tijd de seconde, die in het dagelijks leven samen met afgeleide eenheden zoals minuut, uur en dag wordt gebruikt.",
      "In tegenstelling tot grootheden zoals lengte of massa is tijd een van de oudste meetconcepten in de menselijke geschiedenis; de sexagesimale structuur (grondtal 60) van uur, minuut en seconde gaat duizenden jaren terug naar de oude Babylonische beschaving.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Tijd" },
      { label: "Dimensiesymbool", value: "[T]" },
      { label: "SI-basiseenheid", value: "Seconde" },
      { label: "Symbool SI-eenheid", value: "s" },
      { label: "Huidige definitie van de seconde", value: "9.192.631.770 trillingsperioden van het cesium-133-atoom" },
    ],
    sections: [
      {
        title: "Wat is tijd?",
        paragraphs: [
          "Tijd is een fundamentele grootheid die de volgorde uitdrukt waarin gebeurtenissen plaatsvinden en de duur die tussen twee gebeurtenissen verstrijkt. In de natuurkunde wordt het weergegeven met het dimensiesymbool T en speelt het een rol bij de definitie van talrijke afgeleide grootheden, zoals snelheid, versnelling en frequentie.",
          "In de klassieke natuurkunde werd tijd beschouwd als een absolute grootheid die voor alle waarnemers op dezelfde manier verstreek; met Einsteins relativiteitstheorie werd begrepen dat tijd anders kan verstrijken afhankelijk van de snelheid van de waarnemer en het zwaartekrachtveld (tijddilatatie).",
        ],
      },
      {
        title: "De SI-eenheid van tijd: de seconde",
        paragraphs: [
          "De seconde is de SI-basiseenheid voor tijd, met symbool s. Historisch werd de seconde gedefinieerd als 1/86.400 van een dag (24 uur × 60 minuten × 60 seconden).",
          "Omdat deze definitie onvoldoende stabiel bleek door kleine onregelmatigheden in de rotatiesnelheid van de aarde, werd de seconde in 1967 opnieuw gedefinieerd als exact 9.192.631.770 perioden van de straling die hoort bij de overgang tussen twee fundamentele energieniveaus van het cesium-133-atoom. Deze definitie zorgt ervoor dat atoomklokken overal ter wereld met dezelfde precisie kunnen functioneren.",
        ],
      },
      {
        title: "De sexagesimale oorsprong van uur, minuut en seconde",
        paragraphs: [
          "De verdeling van een uur in 60 minuten en van een minuut in 60 seconden gaat terug op het sexagesimale getalsysteem (grondtal 60) dat door de oude Babylonische beschaving werd gebruikt. De Babyloniers verdeelden zowel de hoek (360 graden) als de tijd volgens dit systeem.",
          "Het getal 60 werd gekozen omdat het exact deelbaar is door veel getallen -- 2, 3, 4, 5, 6, 10, 12, 15, 20 en 30 -- wat praktische onderverdelingen in dagelijkse berekeningen (bijvoorbeeld het verdelen van een uur in drie of vier delen) vergemakkelijkt zonder gebroken getallen nodig te hebben.",
        ],
      },
      {
        title: "De verdeling van de dag in 24 uur",
        paragraphs: [
          "De verdeling van de dag in 24 uur gaat terug op het Oude Egypte; de Egyptenaren verdeelden de dag in 12 gelijke delen en de nacht in nog eens 12, waarbij ze de tijd volgden via zonnewijzers en sterobservaties.",
          "Deze indeling in 12 was waarschijnlijk geinspireerd op het tellen van de vingerkootjes (drie kootjes op elk van de vier vingers zonder de duim, in totaal 12) of op het aantal maancycli in een jaar (ongeveer 12 volle manen).",
        ],
      },
      {
        title: "De relatie tussen de metrieke tijdseenheden",
        paragraphs: [
          "De onderverdelingen van de seconde -- de millisecond (0,001 seconde), de microsecond en de nanosecond -- worden gebruikt om zeer korte gebeurtenissen te meten, zoals computerprocessorbewerkingen, sporttijdwaarneming en wetenschappelijke experimenten.",
          "De veelvouden ervan -- de minuut (60 seconden), het uur (3600 seconden) en de dag (86.400 seconden) -- zijn de basiseenheden die dagelijks worden gebruikt om de tijd bij te houden. Het omrekenen tussen deze eenheden gebeurt, in tegenstelling tot temperatuur, alleen door vermenigvuldiging/deling, omdat ze allemaal een gemeenschappelijk nulpunt (oorsprong) delen.",
        ],
      },
      {
        title: "Wat is een schrikkelseconde?",
        paragraphs: [
          "De rotatiesnelheid van de aarde om haar as vertoont in de loop van de tijd kleine onregelmatigheden door getijdeneffecten en veranderingen in haar interne structuur; dit creeert een klein verschil tussen de 'precieze' tijd gemeten door atoomklokken en de duur van de dag gebaseerd op de werkelijke rotatie van de aarde.",
          "Om dit verschil te compenseren, wordt sinds 1972 indien nodig een 'schrikkelseconde' toegevoegd aan de Gecoordineerde Universele Tijd (UTC). Het is een correctiemechanisme vergelijkbaar met de extra dag van schrikkeljaren (29 februari), maar omdat de onregelmatigheid van de aardrotatie onvoorspelbaar is, worden schrikkelseconden niet in een vaste cyclus toegevoegd zoals de kalender, maar naar behoefte.",
        ],
      },
      {
        title: "Tijdzones en UTC",
        paragraphs: [
          "De aarde is verdeeld in ongeveer 24 tijdzones, omdat de zon op verschillende tijdstippen zijn hoogste punt bereikt, afhankelijk van de lengtegraad. Alle tijdzones gebruiken de Gecoordineerde Universele Tijd (UTC) als referentiepunt en worden uitgedrukt als een tijdsverschil ten opzichte van deze referentie, afhankelijk van hun regio (Nederland is bijvoorbeeld UTC+1 in de winter).",
          "UTC is een moderne tijdstandaard die de oude Greenwich Mean Time (GMT) heeft vervangen en wordt onderhouden met atoomklokken; GMT wordt tegenwoordig vooral gebruikt als naam van de tijdzone die overeenkomt met de wintertijd in het Verenigd Koninkrijk.",
        ],
      },
      {
        title: "Hoe wordt tijd gemeten?",
        paragraphs: [
          "In het dagelijks leven worden mechanische en digitale klokken gebruikt, terwijl in wetenschappelijke en technologische toepassingen (GPS-satellieten, telecommunicatienetwerken) atoomklokken worden gebruikt. Atoomklokken werken met een extreem hoge precisie, gebaseerd op de stabiele trillingsfrequentie van cesium- of rubidiumatomen.",
          "Om nauwkeurige positiebepaling mogelijk te maken, moeten de atoomklokken van GPS-satellieten met een precisie van nanoseconden gesynchroniseerd zijn; zelfs een klein verschil in deze klokken kan grote fouten veroorzaken bij het berekenen van de positie op aarde.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisecond", symbol: "ms", referenceValue: "0,001 s", system: "SI/metriek", commonUse: "Computerbewerkingen en sporttijdwaarneming" },
      { name: "Seconde", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Basistijdmeting" },
      { name: "Minuut", symbol: "min", referenceValue: "60 s", system: "Naast het SI toegestaan", commonUse: "Dagelijkse tijdregistratie" },
      { name: "Uur", symbol: "h", referenceValue: "3600 s", system: "Naast het SI toegestaan", commonUse: "Werktijd, reistijd" },
      { name: "Dag", symbol: "dag", referenceValue: "86.400 s", system: "Naast het SI toegestaan", commonUse: "Kalender en duurberekeningen" },
    ],
  },
  {
    locale: "nl",
    slug: "snelheid",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Omrekenen van snelheidseenheden",
    description:
      "Reken snelheid om tussen km/u, m/s en mph; bekijk technische en alledaagse voorbeelden.",
    introduction: [
      "Snelheid is een afgeleide natuurkundige grootheid die de afgelegde afstand van een object per tijdseenheid uitdrukt. Omdat het wordt verkregen door een lengte door een tijd te delen, is de dimensie van snelheid L/T (lengte gedeeld door tijd).",
      "In het dagelijks leven zijn kilometer per uur (km/u) en mijl per uur (mph) de meest gebruikte snelheidseenheden; meter per seconde (m/s) heeft de voorkeur in wetenschappelijk werk, en de knoop in de scheepvaart en luchtvaart. De lichtsnelheid neemt een bijzondere plaats in onder de snelheidseenheden, als absolute bovengrens die in het heelal kan worden bereikt.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Snelheid" },
      { label: "Dimensiesymbool", value: "[L/T]" },
      { label: "Afgeleide SI-eenheid", value: "Meter per seconde" },
      { label: "Symbool SI-eenheid", value: "m/s" },
      { label: "Universele snelheidslimiet", value: "Lichtsnelheid ≈ 299.792.458 m/s" },
    ],
    sections: [
      {
        title: "Wat is snelheid?",
        paragraphs: [
          "Snelheid drukt de afgelegde afstand van een object per tijdseenheid uit en wordt berekend met de formule Snelheid = Afstand / Tijd. Hoewel de natuurkunde technisch onderscheid maakt tussen 'vaart' (scalair, zonder richting) en 'snelheid' (vectorieel, met richting), worden de twee termen in het dagelijks taalgebruik vaak door elkaar gebruikt.",
          "Snelheid is een afgeleide grootheid, verkregen door een lengte-eenheid door een tijdseenheid te delen. Daarom wordt de SI-dimensie ervan aangeduid als L/T (of L¹T⁻¹).",
        ],
      },
      {
        title: "De SI-eenheid van snelheid: meter per seconde",
        paragraphs: [
          "In het Internationale Eenhedenstelsel is de afgeleide eenheid van snelheid de meter per seconde (m/s), die uitdrukt dat een object elke seconde een meter aflegt. Deze eenheid wordt als standaard gebruikt in wetenschappelijke berekeningen en natuurkundige formules.",
          "In het dagelijks leven heeft kilometer per uur (km/u) de voorkeur boven meter per seconde, omdat voertuigsnelheden en wegafstanden zo worden uitgedrukt met intuitievere getallen op die schaal. 1 m/s komt exact overeen met 3,6 km/u.",
        ],
      },
      {
        title: "Kilometer per uur en mijl per uur",
        paragraphs: [
          "Kilometer per uur (km/u) is de standaard wegvoertuigsnelheidseenheid in landen die het metrieke stelsel gebruiken, waaronder Nederland. Mijl per uur (mph) heeft de voorkeur in landen die het Britse maatsysteem gebruiken, zoals de Verenigde Staten en het Verenigd Koninkrijk.",
          "1 mph komt overeen met ongeveer 1,60934 km/u. Dit verschil is een praktische bron van verwarring die kan leiden tot verkeerde interpretatie van snelheidsmeters van geimporteerde voertuigen of snelheidslimieten bij het huren van een auto in het buitenland.",
        ],
      },
      {
        title: "De knoop: snelheid in de scheepvaart en luchtvaart",
        paragraphs: [
          "De knoop (zeemijl per uur) is de standaardsnelheidseenheid in de scheepvaart en luchtvaart; 1 knoop betekent exact het afleggen van een zeemijl (1852 meter) in een uur.",
          "De naam van de eenheid 'knoop' is historisch afgeleid van de methode die werd gebruikt om de snelheid van schepen te meten: er werd een touw met knopen in het water gegooid en er werd geteld hoeveel knopen er in een bepaalde tijd voorbijgingen. Deze methode werd eeuwenlang gebruikt voordat moderne snelheidsmeetinstrumenten beschikbaar kwamen.",
        ],
      },
      {
        title: "De lichtsnelheid: de snelheidslimiet van het heelal",
        paragraphs: [
          "De lichtsnelheid in vacuum is exact gedefinieerd als 299.792.458 m/s en vormt, volgens Einsteins speciale relativiteitstheorie, de absolute bovengrens die door informatie of een object met massa in het heelal kan worden bereikt.",
          "Het feit dat de lichtsnelheid als een exact getal is gedefinieerd (en al voor de SI-herziening van 2019 als constant werd beschouwd) maakt het mogelijk dat de huidige definitie van de meter ook op deze constante is gebaseerd -- de meter is gedefinieerd als de afstand die licht aflegt in 1/299.792.458 seconde.",
        ],
      },
      {
        title: "Het Machgetal: een relatie met de geluidssnelheid",
        paragraphs: [
          "In de luchtvaart worden hoge snelheden vaak uitgedrukt via het Machgetal, dat de verhouding voorstelt tussen de snelheid van een object en de geluidssnelheid in dat medium (Mach 1 = geluidssnelheid). De geluidssnelheid is geen vaste waarde; ze varieert op basis van de temperatuur en dichtheid van de lucht (ongeveer 343 m/s, oftewel 1235 km/u, op zeeniveau).",
          "Daarom kan hetzelfde Machgetal overeenkomen met verschillende werkelijke snelheden (in km/u of m/s), afhankelijk van hoogte en temperatuur -- de Mach 0,85-snelheid van een vliegtuig varieert in werkelijke waarde met de hoogte.",
        ],
      },
      {
        title: "Het verschil tussen gemiddelde en momentane snelheid",
        paragraphs: [
          "De gemiddelde snelheid wordt verkregen door de totale afgelegde afstand te delen door de totale verstreken tijd en geeft een enkele waarde voor de hele reis. De momentane snelheid is de snelheid van een object op een specifiek moment en kan continu varieren (versnelling, vertraging, stilstand, enz.).",
          "Terwijl de snelheidsmeter van een voertuig de momentane snelheid toont, wordt de gemiddelde snelheid van een reis meestal achteraf berekend op basis van de totale afstand en de totale duur -- de twee waarden verschillen zolang de snelheid niet constant is gebleven tijdens de reis.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per seconde", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metriek", commonUse: "Laboratorium en meting van langzame beweging" },
      { name: "Meter per minuut", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metriek", commonUse: "Snelheid van industriele transportbanden" },
      { name: "Meter per seconde", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Wetenschappelijke en natuurkundige berekeningen" },
      { name: "Kilometer per uur", symbol: "km/u", referenceValue: "≈0,278 m/s", system: "Metriek", commonUse: "Voertuigsnelheid en snelheidslimieten" },
      { name: "Mijl per uur", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Brits/Amerikaans", commonUse: "Voertuigsnelheid in de VS en het VK" },
      { name: "Knoop", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Scheepvaart/luchtvaart", commonUse: "Snelheid van schepen en vliegtuigen" },
      { name: "Kilometer per minuut", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metriek", commonUse: "Snelheidsberekeningen over korte afstanden" },
      { name: "Kilometer per seconde", symbol: "km/s", referenceValue: "1000 m/s", system: "Metriek", commonUse: "Snelheid van ruimtevaartuigen en hemellichamen" },
      { name: "Lichtsnelheid", symbol: "c", referenceValue: "299.792.458 m/s", system: "Universele constante", commonUse: "Natuurkundige en astronomische berekeningen" },
    ],
  },
  {
    locale: "nl",
    slug: "druk",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Omrekenen van drukeenheden",
    description:
      "Reken druk om tussen pascal, kilopascal, bar en PSI; bekijk formules en technische toepassingen.",
    introduction: [
      "Druk is de natuurkundige grootheid die de hoeveelheid kracht uitdrukt die loodrecht op een oppervlak inwerkt, in verhouding tot dat oppervlak. Het toepassingsgebied is zeer breed, van contactspanningen tussen vaste stoffen tot vloeistof in een leiding, van de atmosfeer tot vacuumsystemen. In de techniek is druk niet alleen een getal: het is een fundamentele ontwerpvariabele voor veiligheid, afdichting, structurele sterkte, energieomzetting en procesregeling.",
      "In het Internationale Eenhedenstelsel is de afgeleide eenheid van druk de pascal, met symbool Pa. Een pascal komt overeen met de druk die wordt uitgeoefend door een kracht van een newton gelijkmatig verdeeld over een oppervlak van een vierkante meter. Daarom is druk rechtstreeks gekoppeld aan de concepten kracht en oppervlak; het deelt dezelfde dimensionale structuur met mechanische spanning in materialen, ook al is de fysieke context niet altijd hetzelfde.",
      "In het dagelijks leven en de industrie wordt druk meestal uitgedrukt in praktischer eenheden dan de pascal. De kilopascal en PSI worden veel gebruikt voor bandenspanning, de bar in procesystemen, atm in atmosferische omstandigheden en de millibar in de meteorologie. Het feit dat verschillende sectoren historisch verschillende eenheden hebben aangenomen, maakt het bijzonder belangrijk om drukomrekeningen goed te begrijpen en absolute, relatieve of differentiele druk niet te verwarren.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Druk" },
      { label: "Afgeleide SI-eenheid", value: "Pascal" },
      { label: "SI-symbool", value: "Pa" },
      { label: "Basisrelatie", value: "P = F / A" },
      { label: "SI-equivalent", value: "1 Pa = 1 N/m²" },
      { label: "Dimensionale formule", value: "M L⁻¹ T⁻²" },
      { label: "Standaardatmosfeer", value: "101.325 Pa" },
      { label: "Absolute nulreferentie", value: "Volledig vacuum" },
    ],
    sections: [
      {
        title: "Wat is druk?",
        paragraphs: [
          "Druk hangt niet alleen af van de grootte van de kracht die op een oppervlak wordt uitgeoefend, maar ook van het oppervlak waarover die kracht wordt verdeeld. Als dezelfde kracht op een kleiner oppervlak wordt uitgeoefend, neemt de druk toe; als deze over een groter oppervlak wordt verdeeld, neemt ze af. Daarom kan een scherp geslepen mes met weinig kracht snijden, terwijl dezelfde kracht op een breed vlak een veel kleiner oppervlakte-effect heeft.",
          "In de vloeistofmechanica wordt druk beschouwd als de normale spanningscomponent die een vloeistof in rust of in beweging op zijn omgeving uitoefent. In een vloeistof in rust plant de druk zich in alle richtingen voort en is dit gekoppeld aan het principe van Pascal in gesloten vaten. Deze eigenschap vormt de basis voor hydraulische persen, remsystemen en talrijke industriele actuatoren.",
          "Het begrip druk is niet beperkt tot vloeistoffen en gassen. Het effect van de gemiddelde normale kracht op contactoppervlakken creeert eveneens een drukachtige verdeling. Maar in de techniek denkt men bij druk vooral aan vloeistofsystemen zoals leidingen, tanks, compressoren, luchtkanalen, vacuumkamers en de atmosferische omgeving.",
        ],
      },
      {
        title: "De drukformule: P = F / A",
        paragraphs: [
          "De basisdefinitie van druk wordt gegeven door de relatie P = F / A. Hierbij stelt P de druk voor, F de krachtcomponent loodrecht op het oppervlak, en A het oppervlak waarover die kracht wordt verdeeld. De dimensionale analyse geeft newton gedeeld door vierkante meter, wat overeenkomt met de eenheid pascal.",
          "Deze relatie geeft, uitgaande van een gelijkmatige krachtverdeling, de gemiddelde druk. Bij echte contactproblemen of complexe velden binnen een vloeistof kan de druk over het oppervlak varieren. In dat geval wordt in plaats van een enkele gemiddelde waarde de lokale drukverdeling, differentiaalvergelijkingen en randvoorwaarden in aanmerking genomen.",
          "Een veelvoorkomende fout in de praktijk is het verkeerd kiezen van de richting van de kracht en het effectieve oppervlak. Bij het berekenen van de kracht van een zuiger moet bijvoorbeeld alleen het effectieve doorsnede-oppervlak dat aan de druk is blootgesteld, worden gebruikt. Geometrische details zoals de afdichting, de bout of het steunvlak negeren kan tot ontwerpfouten leiden.",
        ],
      },
      {
        title: "Waarom is de pascal de SI-eenheid van druk?",
        paragraphs: [
          "De pascal ontstaat op natuurlijke wijze uit de combinatie van de newton, de SI-krachteenheid, en de vierkante meter, de SI-oppervlakte-eenheid. De gelijkheid 1 Pa = 1 N/m² is niet alleen een definitie, maar ook een dimensionale uitdrukking die de mechanische oorsprong van druk toont. Daarom is het niet nodig een onafhankelijke basiseenheid voor druk te definieren.",
          "Het SI-stelsel probeert afgeleide grootheden op een consistente manier aan basiseenheden te koppelen. Druk uitdrukken in pascal levert een kader op dat compatibel is met energiedichtheid, spanning, elasticiteitsmodulus en vergelijkingen uit de vloeistofmechanica. Het feit dat dezelfde eenheid in verschillende vakgebieden kan worden gebruikt, vermindert omrekenfouten in berekeningen.",
          "Op alledaagse schaal is de pascal meestal een zeer kleine eenheid. Daarom heeft de techniek de voorkeur voor praktischer schalen zoals de kilopascal, megapascal of bar. Toch zijn ze allemaal uiteindelijk gekoppeld aan de pascal en dus aan de SI-basis.",
        ],
      },
      {
        title: "De geschiedenis van drukmeting: Torricelli en de barometer",
        paragraphs: [
          "De systematische meting van druk begon in 1643 met de ontwikkeling van de kwikbarometer door de Italiaanse wetenschapper Evangelista Torricelli. Torricelli merkte op dat wanneer een aan een uiteinde gesloten glazen buis gevuld met kwik, met het open uiteinde in een vat kwik werd ondergedompeld, het kwik in de buis op een bepaalde hoogte bleef staan en er een vacuum bovenin achterbleef.",
          "Torricelli stelde voor dat de hoogte van de kwikkolom in evenwicht werd gehouden door het gewicht van de buitenlucht. Dit idee legde de experimentele basis voor het idee dat lucht een meetbaar gewicht heeft en dus een druk, en wordt beschouwd als het uitgangspunt van de studie van druk als wetenschappelijke grootheid.",
          "In 1648 mat Florin Perier, op voorstel van Blaise Pascal, een barometer op verschillende hoogtes op de Puy de Dome en toonde aan dat de atmosferische druk afneemt met de hoogte. Het latere werk op basis van deze fundamenten leidde tot internationale coordinatie van meeteenheden met het Metrisch Verdrag van 1875, de precieze definitie van de standaardatmosfeer in 1954 en de invoering van de pascal in het SI in 1971.",
        ],
      },
      {
        title: "Absolute, relatieve en differentiele druk",
        paragraphs: [
          "Absolute druk wordt gemeten ten opzichte van volledig vacuum. Deze referentie is de situatie waarin de druk theoretisch nul is, en absolute druk kan nooit negatief zijn. Gaswetten, thermodynamische berekeningen en sommige dichtheidsgerelateerde relaties werken met absolute druk.",
          "Relatieve (of overdruk) wordt gemeten ten opzichte van de atmosferische druk. De meeste manometers in het veld nemen de omringende atmosfeer als nulreferentie; daarom is de waarde die op het scherm wordt afgelezen meestal de relatieve druk. De relatie tussen absolute en relatieve druk wordt uitgedrukt als P_abs = P_rel + P_atm.",
          "Differentiele druk is het drukverschil tussen twee punten. Bij toepassingen zoals filterverstopping, debietmeting via een meetplaat, kamerdrukregeling of de prestaties van een warmtewisselaar wordt rechtstreeks het drukverschil tussen twee leidingen of twee verschillende volumes gevolgd. Deze grootheid is noch ten opzichte van volledig vacuum, noch ten opzichte van alleen de atmosfeer gedefinieerd; het is rechtstreeks het verschil tussen twee punten.",
        ],
      },
      {
        title: "Atmosferische druk",
        paragraphs: [
          "Atmosferische druk is de druk die door het gewicht van de luchtkolom van de aardatmosfeer op oppervlakken wordt uitgeoefend. Onder standaardomstandigheden nabij zeeniveau wordt dit beschouwd als ongeveer 101.325 Pa, oftewel 1 atm. Dit is echter geen constante waarde; het varieert met hoogte, weersomstandigheden en temperatuur.",
          "Barometers worden gebruikt om de atmosferische druk te meten. Kwikbarometers waren historisch referentie-instrumenten, terwijl elektronische druksensoren gemeengoed zijn geworden in moderne toepassingen. Atmosferische druk is niet alleen belangrijk voor de meteorologie, maar ook voor vacuumtechnologie, verbrandingssystemen en omrekeningen tussen relatieve en absolute druk.",
          "In systemen die met relatieve druk werken, kunnen variaties in de atmosferische druk de interpretatie van de meting beinvloeden. Een relatieve druk van 2 bar op zeeniveau en een relatieve druk van 2 bar op grote hoogte leveren bijvoorbeeld niet dezelfde absolute waarde op. Dit onderscheid kan doorslaggevend zijn, vooral bij compressieberekeningen, gasdichtheid en kookpunt.",
        ],
      },
      {
        title: "Hydrostatische druk en de relatie P = ρgh",
        paragraphs: [
          "In een vloeistof in rust neemt de druk toe met de diepte. Uitgaande van een constante dichtheid wordt de hydrostatische relatieve druk bij benadering uitgedrukt met de relatie P = ρgh. Hierbij stelt ρ de dichtheid voor, g de zwaartekrachtversnelling en h de hoogte van de vloeistofkolom.",
          "Deze relatie is vooral nuttig voor watertanks, open bassins, dammen, niveaumeting en vloeistofkolommanometers. Op dezelfde hoogte en in dezelfde vloeistof wordt de druk als gelijk beschouwd; de vorm van het vat verandert het resultaat niet. Wat telt, is de dichtheid van de vloeistof en de verticale diepte ten opzichte van het vrije oppervlak.",
          "De absolute hydrostatische druk omvat niet alleen de toename ρgh, maar ook de beginddruk op het vrije oppervlak. In een open vat is deze beginwaarde meestal de atmosferische druk. Bij het berekenen van de absolute druk moet daarom niet alleen de toename door de vloeistofkolom worden opgeteld, maar ook de externe druk op het oppervlak.",
        ],
      },
      {
        title: "Statische, dynamische en totale druk",
        paragraphs: [
          "Statische druk is de drukcomponent die de lokale thermodynamische toestand van de stroming weergeeft, vanuit het perspectief van een waarnemer die met de vloeistof meebeweegt. De meeste meetpunten in leidingen, tanks en kanalen volgen fundamenteel de statische druk. De meeste druktransmitters zijn ontworpen om deze grootheid te meten.",
          "Dynamische druk drukt het kinetische effect uit als gevolg van de stromingssnelheid en de gebruikelijke benaderingsformule is q = 1/2 ρv². Deze term speelt een belangrijke rol in de benadering van Bernoulli en wordt gebruikt in snelheidsmeetmethoden zoals de Pitotbuis. Hoe hoger de snelheid, hoe hoger de dynamische druk.",
          "In de ideale stromingsbenadering wordt de totale druk geinterpreteerd als de som van statische en dynamische druk. In echte systemen moet dit onderscheid met voorzichtigheid worden gebruikt vanwege wrijving, turbulentie, samendrukbaarheid en lokale verliezen. Toch blijft het onderscheid statisch-totaal-dynamisch een fundamentele technische taal in ventilatie, aerodynamica en procesmetingen.",
        ],
      },
      {
        title: "Drukhoogte en de opvoerhoogte van een pomp",
        paragraphs: [
          "Drukhoogte drukt een bepaalde druk uit in termen van de equivalente hoogte van een vloeistofkolom. De basisrelatie wordt geschreven als h = P / (ρg). Zo komt dezelfde druk overeen met een andere hoogte, afhankelijk van de dichtheid van de vloeistof.",
          "In pompsystemen wordt druk meestal niet rechtstreeks in pascal of bar geinterpreteerd, maar in meters vloeistofkolom. Dit komt doordat de functie van de pomp niet alleen is om de vloeistof druk te geven, maar ook om de nodige energie te leveren om een bepaalde hoogte, wrijvingsverliezen en een snelheidscomponent te overwinnen. Daarom is het concept opvoerhoogte zeer praktisch vanuit het perspectief van de veldtechniek.",
          "Drukhoogte en geometrische hoogte zijn niet hetzelfde concept. Alleen vertrouwen op de aflezing van een manometer zonder rekening te houden met leidingverliezen, snelheidshoogte en lokale weerstanden kan leiden tot foutieve resultaten bij pompselectie en systeembalancering. Vooral bij water, olie en procesvloeistoffen vereisen dichtheidsverschillen een zorgvuldige omrekening.",
        ],
      },
      {
        title: "Waarom zijn er verschillende drukeenheden?",
        paragraphs: [
          "De diversiteit aan drukeenheden is grotendeels te verklaren door historische en sectorale redenen. Terwijl het SI-stelsel de pascal als referentie neemt, blijft de industrie de bar gebruiken, de geneeskunde mmHg, de meteorologie de millibar, de automotive-sector PSI, en sommige oude technische documenten de technische atmosfeer. Deze situatie is te wijten aan het feit dat de verschillende vakgebieden hun eigen gebruiksgewoonten behouden.",
          "Sommige eenheden zijn intuitiever voor de gebruiker. De bandenspanning kan bijvoorbeeld leesbaarder lijken uitgedrukt in ongeveer 35 psi dan in 240 kPa, en de procesdruk in 3,5 bar in plaats van in 350.000 Pa. De keuze van de eenheid hangt niet alleen af van precisie, maar ook van de cultuur van verhoudingen, de schaal van instrumenten en de gewoontes in het veld.",
          "Omdat verschillende eenheden echter dezelfde natuurkundige grootheid uitdrukken, is een nauwkeurige omrekening onmisbaar bij gecombineerde berekeningen. Benaderde omrekeningsfactoren verwarren met exact gedefinieerde factoren, het onderscheid relatief-absoluut negeren, en symbolen verkeerd lezen zijn belangrijke foutenbronnen.",
        ],
      },
      {
        title: "Hoe wordt druk gemeten?",
        paragraphs: [
          "Om druk te meten, moet eerst het vereiste druktype worden bepaald: absoluut, relatief of differentieel. Vervolgens wordt het meetbereik, het type vloeistof, de temperatuur, de chemische compatibiliteit, trillingen en het vereiste precisieniveau beoordeeld. Dezelfde sensor is mogelijk niet geschikt voor alle toepassingen.",
          "Voor lagedruk- en differentiele metingen kunnen membraan-differentietransmitters worden gebruikt; voor hoge procesdrukken, rekstrook- of piezoresistieve elementen; en voor vacuumtoepassingen, specifieke absolute sensoren. Vloeistofkolommanometers zijn zeer nuttig om het basisprincipe te onderwijzen; maar in de moderne industrie zijn elektronische apparatuur gebruikelijker.",
          "Voor een nauwkeurige meting moet rekening worden gehouden met de positie van de impulsleidingen, de montagepositie van de sensor, de nulinstelling en de temperatuureffecten. In gas- en vloeistofleidingen kan een dichtheidsverschil of condensatie een extra hydrostatische belasting op de sensor creeren. Daarom bepalen installatiedetails het resultaat evenzeer als de keuze van de apparatuur.",
        ],
      },
      {
        title: "Druksensoren en manometers",
        paragraphs: [
          "Mechanische manometers, zoals Bourdonbuisindicatoren, zetten druk om in een afleesbare wijzerbeweging door de vervorming van een elastisch element. Robuust, eenvoudig en zonder energie nodig, worden ze al lang in de industrie gebruikt. Bij toepassingen die precisie en gegevensregistratie vereisen, zijn elektronische sensoren echter flexibeler.",
          "Elektronische druksensoren kunnen piezoresistief, capacitief, rekstrook- of resonantiegebaseerd zijn. Deze sensoren zetten de drukverandering om in een elektrisch signaal, dat naar PLC-, SCADA- of dataverzamelingssystemen wordt gestuurd. Dit maakt niet alleen directe aflezing mogelijk, maar ook alarmen, regeling en trendanalyse.",
          "Differentiele manometers geven het drukverschil tussen twee punten, absolute sensoren de druk ten opzichte van volledig vacuum, en manometrische instrumenten de druk ten opzichte van de atmosfeer. Alleen vertrouwen op de numerieke waarde zonder het referentietype in het technische blad van een apparaat te controleren, kan tot ernstige interpretatiefouten leiden.",
        ],
      },
      {
        title: "Toepassingsgebieden van druk in de techniek",
        paragraphs: [
          "Druk is een fundamentele ontwerpvariabele in talrijke technische vakgebieden: leidingen, klimaatregeling, hydrauliek, pneumatiek, chemische processen, energiecentrales, waterdistributiesystemen, automotive en luchtvaart. Van de wanddikte van een tank tot de keuze van kleppen, van de uitlaatomstandigheden van een compressor tot de prestaties van een filter, veel beslissingen zijn gebaseerd op drukinformatie.",
          "In de procestechniek worden druklimieten gecontroleerd voor de veilige werking van reactoren, ketels, warmtewisselaars en separators. Drukveiligheidskleppen, breekplaten en regelkringen zijn daarom kritieke apparatuur. Druk wordt ook gebruikt voor de indirecte meting van andere procesvariabelen, zoals debiet en niveau.",
          "In de werktuigbouwkunde en de bouw wordt druk gecombineerd met contactoppervlakken en vloeistofkrachten in spanningsanalyses. In de geneeskunde en biomedische apparatuur vallen bloeddruk, beademingsdrukken en vacuumtoepassingen op; in het milieu en de meteorologie, atmosferische en differentiele drukmetingen.",
        ],
      },
      {
        title: "Temperatuur, hoogte en onzekerheid bij drukmeting",
        paragraphs: [
          "Temperatuur kan zowel de eigenschappen van de gemeten vloeistof als het gedrag van het sensorelement beinvloeden. Vooral bij gassen moet, omdat temperatuur de dichtheid verandert, de druk-volume-temperatuurrelatie opnieuw worden geevalueerd. Daarom bevatten technische bladen van sensoren parameters zoals nuldrift en spandrift die van temperatuur afhankelijk zijn.",
          "De atmosferische druk neemt doorgaans af met de hoogte. Dit verandert de relatie tussen relatieve en absolute druk, en kan ook het referentiegedrag van sommige veldapparatuur beinvloeden. Dezelfde procesomstandigheid kan op verschillende hoogtes verschillende absolute drukresultaten opleveren.",
          "Elke meting brengt onzekerheid met zich mee. De kalibratiestandaard, resolutie, hysterese, temperatuureffect, montageorientatie, trillingen en langetermijndrift dragen allemaal bij aan de totale onzekerheid. Bij kritieke toepassingen moet de ontwerpbeslissing niet alleen de nominale drukwaarde omvatten, maar ook de klasse van de apparatuur en de betrouwbaarheid van de meting.",
        ],
      },
      {
        title: "De relatie en het verschil tussen druk en spanning",
        paragraphs: [
          "Druk en spanning delen dezelfde dimensionale structuur en kunnen beide in pascal worden uitgedrukt. Deze gelijkenis komt doordat beide een krachteffect per oppervlakte-eenheid voorstellen. Dit betekent echter niet dat het fysiek dezelfde grootheid is.",
          "Druk wordt over het algemeen opgevat als een isotrope normale spanning die door vloeistoffen wordt uitgeoefend; dat wil zeggen, in een vloeistof in rust is de druk op hetzelfde punt in alle richtingen gelijk. Spanning in de mechanica van vaste stoffen kan daarentegen normale en schuifcomponenten hebben, richtingsafhankelijk zijn en een tensorstructuur hebben.",
          "Dit onderscheid negeren kan tot foutieve interpretaties leiden, vooral bij berekeningen van tankwanden, afdichtingsoppervlakken of materiaalsterkte. De interne druk van een vloeistof creeert omtreks- en axiale spanningen op de tank; maar het spanningsveld in het tankmateriaal is niet identiek aan de druk van de vloeistof zelf.",
        ],
      },
      {
        title: "Veelvoorkomende fouten bij drukberekeningen",
        paragraphs: [
          "De meest voorkomende fout is het verwarren van relatieve met absolute druk. Vooral bij gaswetten, dichtheidsberekeningen en vacuumtoepassingen is absolute druk vereist, maar soms wordt rechtstreeks de relatieve waarde van een manometer gebruikt. Dit veroorzaakt een systematische fout in het resultaat.",
          "Een andere fout is het afronden van omrekeningsfactoren of het gebruiken van een verkeerde eenheidsreferentie. Bij het omrekenen tussen PSI, bar, atm, mmHg en kPa moet worden besloten welk precisieniveau voldoende is voor de benaderde waarden. Als de kalibratie van de apparatuur hoge precisie vereist, kan het gebruik van onvoldoende decimalen problemen veroorzaken.",
          "Ook het negeren van hydrostatische effecten, het over het hoofd zien van de montagehoogte van de sensor en het niet in aanmerking nemen van het temperatuureffect komen vaak voor. Vooral bij met vloeistof gevulde impulsleidingen, gesloten tanks en differentiele druktoepassingen kunnen ogenschijnlijk kleine installatiedetails het meetresultaat aanzienlijk veranderen.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Wetenschappelijke en technische berekeningen" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Installaties, banden en procesdruk" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Metriek, buiten het SI", commonUse: "Industrie, compressoren en procesystemen" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metriek, buiten het SI", commonUse: "Meteorologie en atmosferische metingen" },
      { name: "Standaardatmosfeer", symbol: "atm", referenceValue: "101.325 Pa", system: "Buiten het SI", commonUse: "Atmosfeer en referentieomstandigheden" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Brits/Amerikaans", commonUse: "Banden, hydraulische en pneumatische systemen" },
      { name: "Technische atmosfeer", symbol: "at", referenceValue: "98.066,5 Pa", system: "Buiten het SI", commonUse: "Oude technische toepassingen" },
      { name: "Millimeter kwikkolom", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Buiten het SI", commonUse: "Geneeskunde, vacuum en drukmetingen" },
      { name: "Millimeter waterkolom", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Buiten het SI", commonUse: "Lagedrukmetingen en ventilatie" },
      { name: "Kilogram-kracht per vierkante centimeter", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Metriek, buiten het SI", commonUse: "Oude pomp- en ketelmanometers" },
    ],
  },
  {
    locale: "nl",
    slug: "energie",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Omrekenen van energie-eenheden",
    description:
      "Vergelijk in een categorie de energieomrekeningen op basis van joule, kilowattuur, calorie en BTU.",
    introduction: [
      "Energie is de fundamentele natuurkundige grootheid die het vermogen van een systeem om arbeid te verrichten uitdrukt. In het Internationale Eenhedenstelsel is de afgeleide eenheid van energie de joule, verkregen uit het product van een kracht en een verplaatsing.",
      "In het dagelijks leven worden de kilowattuur (kWh) voor elektriciteitsrekeningen gebruikt, de calorie/kilocalorie in voeding, de BTU in klimaatregelingssystemen, de therm in de facturering van aardgas, en de elektronvolt in de deeltjesnatuurkunde.",
    ],
    facts: [
      { label: "Natuurkundige grootheid", value: "Energie (arbeid)" },
      { label: "Dimensiesymbool", value: "[ML²T⁻²]" },
      { label: "Afgeleide SI-eenheid", value: "Joule" },
      { label: "Symbool SI-eenheid", value: "J" },
      { label: "Definitie van de joule", value: "1 J = verplaatsing van 1 meter onder een kracht van 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "Wat is energie?",
        paragraphs: [
          "Energie is het vermogen van een object of systeem om arbeid te verrichten. Ze kan in vele vormen bestaan -- kinetische energie (beweging), potentiele energie (positie), thermische energie, chemische energie en elektrische energie -- en kan, volgens het behoud van energie, van de ene vorm in de andere worden omgezet zonder dat de totale hoeveelheid wordt gecreeerd of vernietigd.",
          "Energie is een afgeleide grootheid, verkregen via het product van een kracht en een verplaatsing (arbeid), en de SI-dimensie ervan wordt aangeduid als ML²T⁻² (massa × lengte in het kwadraat / tijd in het kwadraat).",
        ],
      },
      {
        title: "De SI-eenheid van energie: de joule",
        paragraphs: [
          "De joule is de afgeleide SI-eenheid voor energie, met symbool J; genoemd naar de 19e-eeuwse Britse natuurkundige James Prescott Joule. Een joule komt overeen met de energie die nodig is om een object 1 meter te verplaatsen onder invloed van een kracht van 1 newton.",
          "Omdat de joule nog steeds een zeer kleine eenheid is om veel alledaagse energiehoeveelheden uit te drukken, hebben de veelvouden ervan in de techniek en het dagelijks gebruik de voorkeur: de kilojoule (duizend joule) en de megajoule (een miljoen joule).",
        ],
      },
      {
        title: "De kilowattuur: de eenheid van elektriciteitsrekeningen",
        paragraphs: [
          "De kilowattuur (kWh) is de hoeveelheid energie die door een vermogen van een kilowatt gedurende een uur wordt verbruikt, en vormt wereldwijd de standaardeenheid voor elektriciteitsfacturering. 1 kWh komt exact overeen met 3.600.000 joule (3,6 megajoule).",
          "Om het energieverbruik van een elektrisch apparaat te berekenen, hoef je alleen het vermogen ervan (in watt) te vermenigvuldigen met de gebruiksduur (in uren); een apparaat van 2000 watt dat 3 uur werkt, verbruikt bijvoorbeeld 6 kWh aan energie.",
        ],
      },
      {
        title: "De calorie en kilocalorie: energie in voeding",
        paragraphs: [
          "De calorie werd oorspronkelijk gedefinieerd als de hoeveelheid energie die nodig is om de temperatuur van een gram water met 1 °C te verhogen, en 1 calorie komt exact overeen met 4,184 joule.",
          "De waarde 'calorieen' die op voedingsetiketten staat, is in wetenschappelijke zin eigenlijk kilocalorieen (1000 calorieen) -- deze naamgevingsconventie in de voeding zorgt vaak voor verwarring; wanneer wordt gezegd dat een voedingsmiddel '200 calorieen' heeft, gaat het eigenlijk om 200 kilocalorieen (200.000 calorieen).",
        ],
      },
      {
        title: "De BTU en therm: energie van klimaatregeling en aardgas",
        paragraphs: [
          "De BTU (British Thermal Unit) is de hoeveelheid energie die nodig is om de temperatuur van een pond water met 1 °F te verhogen; het is een eenheid van Amerikaanse oorsprong, maar wordt wereldwijd veel gebruikt om de capaciteit van verwarmings- en klimaatregelingssystemen uit te drukken. 1 BTU komt overeen met ongeveer 1055,06 joule.",
          "De therm is een grote energie-eenheid die wordt gebruikt bij de facturering van aardgas en komt exact overeen met 100.000 BTU. In sommige landen wordt aardgasverbruik rechtstreeks in therm gefactureerd in plaats van in kubieke meters.",
        ],
      },
      {
        title: "De elektronvolt: de eenheid van de subatomaire wereld",
        paragraphs: [
          "De elektronvolt (eV) drukt de kinetische energie uit die een elektron verkrijgt door een potentiaalverschil van een volt te doorlopen; het is een uiterst kleine energie-eenheid (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "In de deeltjes- en atoomnatuurkunde worden energieen vaak uitgedrukt in elektronvolt (en de veelvouden ervan keV, MeV, GeV) in plaats van in joule, omdat de joule op die schaal extreem kleine en onpraktische getallen oplevert.",
        ],
      },
      {
        title: "Het behoud van energie",
        paragraphs: [
          "Volgens het behoud van energie, ook bekend als de eerste hoofdwet van de thermodynamica, blijft de totale energie van een gesloten systeem constant; energie wordt niet gecreeerd of vernietigd, ze wordt alleen van de ene vorm in de andere omgezet.",
          "In de motor van een auto wordt bijvoorbeeld chemische energie (brandstof) eerst omgezet in thermische energie en vervolgens in mechanische energie (beweging); hoewel in dit proces een deel van de energie door wrijving en uitlaatgassen wordt omgezet in onbruikbare warmte, verandert de totale hoeveelheid energie niet.",
        ],
      },
      {
        title: "Waarom is omrekening tussen energie-eenheden belangrijk?",
        paragraphs: [
          "Verschillende sectoren geven traditioneel de voorkeur aan verschillende energie-eenheden: de elektrotechniek de kilowattuur, de voedingswetenschap de kilocalorie, de klimaatregelingssector de BTU, en de aardgassector de therm. Correct kunnen omrekenen tussen deze verschillende eenheden is essentieel om energie-efficientie te vergelijken en kosten te berekenen.",
          "Om bijvoorbeeld de efficientie van een warmtepomp te vergelijken met die van een aardgasketel, moet het energieverbruik van beide systemen worden omgerekend naar een gemeenschappelijke eenheid (meestal kWh of joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Wetenschappelijke en natuurkundige energieberekeningen" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metriek", commonUse: "Voedingsenergie (in sommige landen)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/metriek", commonUse: "Brandstof en grote energiehoeveelheden" },
      { name: "Calorie", symbol: "cal", referenceValue: "4,184 J", system: "Metriek (traditioneel)", commonUse: "Voeding en scheikunde" },
      { name: "Kilocalorie", symbol: "kcal", referenceValue: "4184 J", system: "Metriek (traditioneel)", commonUse: "Voedingsetiketten ('calorieen')" },
      { name: "Wattuur", symbol: "Wh", referenceValue: "3600 J", system: "Metriek (elektriciteit)", commonUse: "Verbruik van kleine apparaten" },
      { name: "Kilowattuur", symbol: "kWh", referenceValue: "3.600.000 J", system: "Metriek (elektriciteit)", commonUse: "Elektriciteitsfacturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Brits/Amerikaans", commonUse: "Capaciteit van klimaatregeling en verwarming" },
      { name: "Therm", symbol: "th", referenceValue: "≈105.506.000 J", system: "Brits/Amerikaans", commonUse: "Facturering van aardgas" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atoom-/deeltjesnatuurkunde", commonUse: "Meting van atomaire en nucleaire energie" },
    ],
  },
  {
    locale: "nl",
    slug: "data-opslag",
    sourceSlug: "veri",
    category: "veri",
    title: "Omrekenen van data-opslageenheden",
    description:
      "Reken om tussen byte, kilobyte, megabyte, gigabyte en terabyte; vergelijk berekeningen op basis van 1000 en 1024.",
    introduction: [
      "De data-opslageenheid (informatie) drukt de hoeveelheid informatie uit die in een computersysteem wordt opgeslagen of verwerkt. De meest basale eenheid is het bit; acht bits samen vormen een byte.",
      "Bij opslag en internetsnelheid komen zowel decimale eenheden (grondtal 1000) zoals kilobyte, megabyte, gigabyte en terabyte, als binaire eenheden (grondtal 1024) zoals kibibyte, mebibyte en gibibyte gebruikt door besturingssystemen, voor -- het verschil tussen deze twee systemen is de belangrijkste reden waarom een gekochte schijf 'minder' ruimte lijkt te hebben.",
    ],
    facts: [
      { label: "Kleinste eenheid", value: "Bit (0 of 1)" },
      { label: "Basiseenheid", value: "Byte = 8 bit" },
      { label: "Decimaal systeem (SI)", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binair systeem (IEC)", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Verschil tussen 1000 en 1024", value: "≈7,4% verschil tussen 1 GB (decimaal) en 1 GiB (binair)" },
    ],
    sections: [
      {
        title: "Wat zijn bit en byte?",
        paragraphs: [
          "Het bit (binair cijfer) is de kleinste informatie-eenheid die een computer kan verwerken en kan slechts twee waarden aannemen: 0 of 1. Acht bits samen vormen een byte; een byte kan 256 (2⁸) verschillende waarden voorstellen -- voldoende om bijvoorbeeld een tekstteken te coderen.",
          "Bit wordt meestal afgekort met een kleine 'b' en byte met een hoofdletter 'B'; dit onderscheid kan verwarring veroorzaken, vooral tussen internetsnelheden (Mbps = megabit per seconde) en bestandsgrootte (MB = megabyte) -- een internetverbinding van 100 Mbps komt theoretisch overeen met een downloadsnelheid van ongeveer 12,5 MB per seconde (100 ÷ 8).",
        ],
      },
      {
        title: "Waarom bestaan er twee verschillende eenheidsystemen?",
        paragraphs: [
          "Omdat computers in het binaire stelsel werken, is geheugenadressering van nature gekoppeld aan machten van 2 (zoals 1024, 1.048.576). Daarom heeft de softwarewereld historisch 'kilobyte' opgevat als 1024 byte.",
          "Schijffabrikanten geven, om marketing- en rekenredenen, de voorkeur aan het decimale SI-voorvoegsel (grondtal 1000) -- een door een fabrikant als '1 TB' aangeprezen schijf bevat in werkelijkheid exact 1.000.000.000.000 byte, maar omdat het besturingssysteem in grondtal 1024 rekent, toont het scherm een kleiner getal, zoals '931 GB'.",
        ],
      },
      {
        title: "De IEC-standaard: KiB, MiB, GiB",
        paragraphs: [
          "Om deze verwarring op te lossen, heeft de Internationale Elektrotechnische Commissie (IEC) in 1998 aparte namen (kibibyte, mebibyte, gibibyte, tebibyte) en symbolen (KiB, MiB, GiB, TiB) gestandaardiseerd voor eenheden op binaire basis.",
          "Volgens deze standaard zouden de traditionele voorvoegsels KB/MB/GB alleen in decimale zin (grondtal 1000) moeten worden gebruikt, en zou voor waarden op basis van 1024 de voorkeur uitgaan naar 'binaire' voorvoegsels zoals KiB/MiB/GiB. In het dagelijks gebruik en in veel programma's wordt dit onderscheid echter nog niet consistent toegepast.",
        ],
      },
      {
        title: "Waarom groeit het verschil tussen 1000 en 1024?",
        paragraphs: [
          "Terwijl op kilobyteniveau (1000 tegen 1024) het verschil slechts 2,4% is, neemt dit verschil bij elke hogere eenheid toe: op megabyteniveau is het ≈4,9%, op gigabyteniveau ≈7,4%, en op terabyteniveau loopt het op tot ≈10%.",
          "Daarom wordt bij grote opslagcapaciteiten (zoals een schijf van 1 TB) het verschil tussen de decimale en binaire berekening groot genoeg om de gebruiker het zichtbare gevoel te geven 'minder ruimte' te hebben (een verschil van ongeveer 90 GB).",
        ],
      },
      {
        title: "Op bits gebaseerde opslageenheden: kilobit, megabit, gigabit",
        paragraphs: [
          "Internetproviders drukken de verbindingssnelheid meestal uit in op bits gebaseerde eenheden (kilobit per seconde, megabit per seconde, gigabit per seconde); dit is een historische traditie in netwerktechniek.",
          "Omdat gebruikers de downloadsnelheid van een bestand meestal in bytes verwachten (MB per seconde), kan het niet weten dat een verbinding van '100 Mbps' een werkelijke downloadsnelheid van ongeveer 12,5 MB per seconde heeft, de valse indruk wekken dat de verbinding 'traag' is.",
        ],
      },
      {
        title: "Gegevensgroottes in het dagelijks leven",
        paragraphs: [
          "Een tekstdocument (een pagina) neemt meestal enkele kilobytes in beslag, een gecomprimeerde foto (JPEG) enkele megabytes, en een gecomprimeerd muziekbestand (MP3) gemiddeld 3 tot 5 megabytes.",
          "Een film in standaarddefinitie (HD) kan tussen 1 en 4 gigabytes innemen, en een film in 4K-resolutie ongeveer tussen 15 en 25 gigabytes; deze verschillen varieren op basis van resolutie en compressiemethode.",
        ],
      },
      {
        title: "De geschiedenis van de data-opslageenheid",
        paragraphs: [
          "De eerste harde schijf die IBM in 1956 introduceerde (de RAMAC 305) had een capaciteit van ongeveer 3,75 megabyte en nam de ruimte van een hele kamer in beslag. Vandaag de dag kan een microSD-kaart miljoenen keren die capaciteit bevatten binnen de afmetingen van een handpalm.",
          "Deze enorme capaciteitstoename is nauw verbonden met zowel de vooruitgang in opslagtechnologie (zoals de overgang van magnetische schijven naar flashgeheugen) als de voortdurende daling van de kosten per eenheid.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binair", commonUse: "Netwerksnelheid (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Basiseenheid", commonUse: "Basiseenheid van bestandsgrootte" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimaal (SI)", commonUse: "Tekstdocumenten" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binair (IEC)", commonUse: "Geheugenweergave besturingssysteem" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 byte", system: "Decimaal (SI)", commonUse: "Foto- en muziekbestanden" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 byte", system: "Binair (IEC)", commonUse: "RAM-geheugencapaciteit" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 byte", system: "Decimaal (SI)", commonUse: "Schijfcapaciteit (fabrikantlabel)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 byte", system: "Binair (IEC)", commonUse: "Schijfweergave besturingssysteem" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 byte", system: "Decimaal (SI)", commonUse: "Grootschalige opslag" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1.000.000.000.000.000 byte", system: "Decimaal (SI)", commonUse: "Datacenters en cloudopslag" },
    ],
  },
  {
    locale: "nl",
    slug: "elektriciteit",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Omrekenen van elektrische eenheden",
    description:
      "Reken de basisgrootheden van elektriciteit om tussen volt, kilovolt, ampere en milliampere; bekijk voorbeeldwaarden.",
    introduction: [
      "Elektriciteit is een breed vakgebied dat bestaat uit gerelateerde maar verschillende natuurkundige grootheden, zoals spanning (potentiaalverschil) en stroom (ladingsstroom). Deze categorie brengt de twee meest voorkomende basisgrootheden in het dagelijkse elektrotechnische werk samen: de volt (spanning) en de ampere (stroom).",
      "Spanning en stroom zijn niet dezelfde natuurkundige grootheid en kunnen niet rechtstreeks in elkaar worden omgerekend; hun relatie wordt vastgelegd door de wet van Ohm (V = I × R), afhankelijk van de weerstand van het circuit. De omrekeningen op deze pagina behandelen elke grootheid afzonderlijk (volt-kilovolt, ampere-milliampere, enz.).",
    ],
    facts: [
      { label: "Naam van de spanningseenheid", value: "Volt (naar Alessandro Volta)" },
      { label: "Naam van de stroomeenheid", value: "Ampere (naar Andre-Marie Ampere)" },
      { label: "SI-basiseenheid (stroom)", value: "Ampere (A) -- een van de 7 SI-basiseenheden" },
      { label: "Relatie spanning-stroom-weerstand", value: "Wet van Ohm: V = I × R" },
      { label: "Netspanning in Nederland", value: "230 V (eenfase), 400 V (driefase), 50 Hz" },
    ],
    sections: [
      {
        title: "Wat is spanning (volt)?",
        paragraphs: [
          "Spanning (voltage) drukt het elektrische potentiaalverschil tussen twee punten van een elektrisch circuit uit en kan worden beschouwd als de 'drijvende kracht' die elektronen van het ene naar het andere punt laat stromen. De SI-eenheid ervan is de volt (V).",
          "De eenheid volt is genoemd naar de Italiaanse natuurkundige Alessandro Volta, uitvinder van de elektrische batterij. Waarden zoals '1,5 V' of '9 V' op een batterij drukken het potentiaalverschil uit dat die batterij kan leveren.",
        ],
      },
      {
        title: "Wat is stroom (ampere)?",
        paragraphs: [
          "Elektrische stroom drukt de hoeveelheid elektrische lading uit die per tijdseenheid door een geleider gaat, en de SI-eenheid ervan is de ampere (A). Een ampere komt overeen met het passeren van ongeveer 6,242 × 10¹⁸ elektronen door een punt per seconde.",
          "De eenheid ampere is genoemd naar de Franse natuurkundige Andre-Marie Ampere, een van de grondleggers van het elektromagnetisme. De ampere was, voor de SI-herziening van 2019, een van de SI-basiseenheden; tegenwoordig wordt het nog steeds als een fundamentele grootheid beschouwd, maar nu gedefinieerd op basis van de elementaire ladingsconstante (e).",
        ],
      },
      {
        title: "Waarom kunnen spanning en stroom niet in elkaar worden omgerekend?",
        paragraphs: [
          "Spanning (V) en stroom (A) zijn verschillende natuurkundige grootheden -- de ene drukt een potentiaalverschil uit, de andere de snelheid van een ladingsstroom. Daarom heeft de vraag 'hoeveel ampere is X volt' geen antwoord op zichzelf zonder de weerstand (of het vermogen) van het circuit te kennen.",
          "De relatie tussen beide wordt vastgelegd door de wet van Ohm: V = I × R (Spanning = Stroom × Weerstand). Een spanning van 12 volt over een weerstand van 4 ohm produceert bijvoorbeeld een stroom van 3 ampere; maar diezelfde 12 volt toegepast op een andere weerstand produceert een volledig andere stroomwaarde.",
        ],
      },
      {
        title: "De relatie tussen vermogen, spanning en stroom",
        paragraphs: [
          "Elektrisch vermogen (watt) is gelijk aan het product van spanning en stroom: P = V × I. Deze formule toont aan dat een apparaat met hetzelfde vermogen bij hoge spanning minder stroom en bij lage spanning meer stroom zal verbruiken.",
          "Deze relatie verklaart waarom elektriciteitsdistributienetten op hoge spanning werken: hetzelfde vermogen met een lagere stroom transporteren vermindert de energieverliezen door de weerstand van transmissielijnen (Joule-opwarming) aanzienlijk.",
        ],
      },
      {
        title: "De netspanning in Nederland en de wereld",
        paragraphs: [
          "In Nederland is de standaard netspanning voor woninginstallaties 230 volt eenfase, en 400 volt voor driefasesystemen die in industriele en commerciele installaties worden gebruikt (met een frequentie van 50 Hz).",
          "Wereldwijd varieert de netspanning per land; de Verenigde Staten en Canada gebruiken 120 volt, terwijl de meeste Europese landen, waaronder Nederland, de voorkeur geven aan 230 volt. Dit verschil is de belangrijkste reden waarom elektrische apparaten die uit het buitenland worden meegebracht, niet zonder omvormer rechtstreeks kunnen worden gebruikt.",
        ],
      },
      {
        title: "Gelijkstroom (DC) en wisselstroom (AC)",
        paragraphs: [
          "Bij gelijkstroom (DC) stromen elektronen constant in een enkele richting -- batterijen en zonnepanelen produceren DC. Bij wisselstroom (AC) keert de richting van de stroom een bepaald aantal keren per seconde om (50 Hz in Nederland, oftewel 50 keer per seconde) -- netelektriciteit is AC.",
          "De belangrijkste reden waarom AC de voorkeur heeft bij netdistributie, is dat de spanning met transformatoren gemakkelijk kan worden verhoogd of verlaagd; dit maakt het mogelijk elektriciteit over lange afstanden met lage verliezen te transporteren.",
        ],
      },
      {
        title: "Het effect van elektrische stroom op het menselijk lichaam",
        paragraphs: [
          "De sterkte van de stroom die door het menselijk lichaam gaat, bepaalt het waargenomen effect: ongeveer 1 milliampere is nauwelijks voelbaar, tussen 10 en 20 milliampere kan spiersamentrekking veroorzaken (onvermogen om los te laten), en meer dan 100 milliampere kan hartritmestoornissen (fibrillatie) en de dood veroorzaken.",
          "Daarom telt bij elektrische veiligheid niet alleen de spanning, maar ook de stroomsterkte die in het circuit kan ontstaan -- zelfs in een omgeving met lage spanning maar lage weerstand (bijvoorbeeld vochtig), kan een gevaarlijke stroom ontstaan.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metriek", commonUse: "Sensoren en biolektrische signalen" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batterijen, net- en circuitspanning" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metriek", commonUse: "Hoogspanningstransmissielijnen" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metriek", commonUse: "Stroom van elektronische circuits" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Huisinstallaties en apparaatstroom" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metriek", commonUse: "Kortsluitstromen en industriele stroom" },
    ],
  },
  {
    locale: "nl",
    slug: "goudkaraat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Omrekenen van goudkaraat",
    description:
      "Reken om tussen 24, 22, 18 en 14 karaat goud op basis van de hoeveelheid zuiver goud; ontdek de zuiverheid en toepassingen van elk karaat.",
    introduction: [
      "Zoals zilver wordt ook goud vrijwel nooit puur gebruikt bij de vervaardiging van sieraden, omdat het een zeer zacht metaal is dat gemakkelijk krast -- daarom wordt het gelegeerd met andere metalen zoals zilver of koper. Karaat is de maat die de verhouding van zuiver goud in die legering aangeeft.",
      "De schaal werkt op basis 24: 24 karaat betekent volledig zuiver goud (100%), 18 karaat betekent dat 18/24 van de legering (ongeveer 75%) zuiver goud is. De omrekening hier bestaat niet uit het uitdrukken van dezelfde natuurkundige grootheid in een andere eenheid, maar uit het vinden van het equivalent in gram van dezelfde legering met een andere zuiverheidsgraad.",
    ],
    facts: [
      { label: "Meetsysteem", value: "Zuiverheidsstandaard voor sieraden (karaat)" },
      { label: "Basisreferentie", value: "24 karaat = 100% zuiver goud" },
      { label: "Meest voorkomende karaat in Turkije", value: "22 karaat (armband, traditionele sieraden)" },
      { label: "Internationaal dagelijks gebruik", value: "18 karaat (ring, ketting)" },
      { label: "Berekeningslogica", value: "Gram × (oorspronkelijk karaat / 24) ÷ (doelkaraat / 24)" },
    ],
    sections: [
      {
        title: "Wat meet karaat precies?",
        paragraphs: [
          "Karaat geeft aan welk deel van het gewicht van een stuk goud daadwerkelijk goud is. 24 karaat is zuiver goud; 18 en 14 karaat zijn vormen van goud gemengd met respectievelijk zilver of koper, en dus harder en minder puur.",
          "Daarom kan gezegd worden dat een armband van 22 karaat een iets 'lager' zuiver-goudgehalte heeft dan 24 karaat, maar wel sterker is -- daarom geven juweliers meestal de voorkeur aan 22 karaat voor armbanden en 18 karaat voor ringen en kettingen.",
        ],
      },
      {
        title: "Hoe bereken je het zuiver-goudgehalte?",
        paragraphs: [
          "Om de hoeveelheid zuiver goud in een armband van 10 gram met 22 karaat te achterhalen: 10 × (22 / 24) = 9,17 gram zuiver goud (equivalent aan 24 karaat). De overige 0,83 gram is ander metaal dat is toegevoegd voor stevigheid.",
          "Omgekeerd, als een juwelier die 9,17 gram zuiver goud zou omsmelten om er 18 karaat van te maken: 9,17 ÷ (18 / 24) = 12,22 gram totale legering zou worden verkregen -- omdat het aandeel zuiver goud bij 18 karaat lager is, wordt dezelfde hoeveelheid zuiver goud over een groter totaalgewicht verdeeld.",
        ],
      },
      {
        title: "Waar wordt elk karaat voor gebruikt?",
        paragraphs: [
          "Vanwege de zachtheid wordt 24 karaat goud vrijwel nooit gebruikt in alledaagse sieraden; het heeft de voorkeur voor baren en beleggingsproducten. 22 karaat is de standaard voor armbanden en traditionele sieraden in Turkije en het Midden-Oosten.",
          "18 karaat is, vanwege zijn hoge sterkte, wereldwijd gangbaar voor alledaagse sieraden zoals ringen en kettingen met diamanten. 14 karaat, goedkoper en nog sterker, komt vooral voor op de markten van de Verenigde Staten en Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karaat goud", symbol: "24K", referenceValue: "100% zuiver goud", system: "Sieradenstandaard", commonUse: "Baren, beleggingsgoud" },
      { name: "22 karaat goud", symbol: "22K", referenceValue: "91,6% zuiver goud (22/24)", system: "Sieradenstandaard", commonUse: "Armband, traditionele sieraden" },
      { name: "18 karaat goud", symbol: "18K", referenceValue: "75% zuiver goud (18/24)", system: "Sieradenstandaard", commonUse: "Ring, ketting, alledaagse sieraden" },
      { name: "14 karaat goud", symbol: "14K", referenceValue: "58,3% zuiver goud (14/24)", system: "Sieradenstandaard", commonUse: "Betaalbare sieraden, VS-/Europese markt" },
    ],
  },
  {
    locale: "nl",
    slug: "zilvergehalte",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omrekenen van zilvergehalte",
    description:
      "Reken de gehaltes 999, 925 (sterling), 900 en 800 om naar grammen zuiver zilver; ontdek het promillesysteem en de toepassingen ervan in sieraden.",
    introduction: [
      "Zoals goud wordt ook zilver vrijwel nooit puur gebruikt om sieraden of voorwerpen te maken, omdat het een zacht metaal is dat wordt gelegeerd met andere metalen zoals koper. Het promillegehalte is de maat die de verhouding van zuiver zilver in die legering aangeeft.",
      "In tegenstelling tot goudkaraat, dat op basis 24 wordt uitgedrukt, wordt de zuiverheid van zilver op basis 1000 (promille) uitgedrukt: 999 komt overeen met bijna zuiver zilver, terwijl 925 het meest wijdverbreide gehalte ter wereld is, bekend als 'sterlingzilver'.",
    ],
    facts: [
      { label: "Meetsysteem", value: "Promillesysteem" },
      { label: "Hoofdreferentie", value: "999 = 99,9% zuiver zilver" },
      { label: "Meest voorkomend sieradengehalte", value: "925 (sterlingzilver)" },
      { label: "Beleggings-/baarzilver", value: "Gehalte 999 (fijnzilver)" },
      { label: "Berekeningsregel", value: "Gram × (oorspronkelijk gehalte / 1000) ÷ (doelgehalte / 1000)" },
    ],
    sections: [
      {
        title: "Wat meet het zilvergehalte (promille) werkelijk?",
        paragraphs: [
          "In tegenstelling tot goud wordt de zuiverheid van zilver niet in 24 delen uitgedrukt, maar in promille (basis 1000). Een gehalte van 999 betekent 999 delen per duizend (oftewel 99,9%) zuiver zilver in de legering; het resterende promille komt meestal overeen met kleine sporen van andere elementen.",
          "Het gehalte 925 (sterlingzilver) betekent dat de legering 92,5% zuiver zilver bevat, waarbij de rest (7,5%) meestal koper is. Deze kleine hoeveelheid koper geeft stevigheid aan zuiver zilver, dat van nature zeer zacht is en gemakkelijk vervormt.",
        ],
      },
      {
        title: "Waarom is sterlingzilver (925) de wereldstandaard?",
        paragraphs: [
          "De geschiedenis van de sterlingzilverstandaard (925) gaat terug op het 12e-eeuwse Engeland en is in de loop van de tijd de wereldwijd meest aanvaarde standaard geworden voor sieraden, bestek en zilveren voorwerpen.",
          "Zuiver zilver (999) is te zacht voor alledaagse voorwerpen en krast gemakkelijk; het toevoegen van 7,5% koper geeft zilver voldoende hardheid, terwijl de kenmerkende glans en kleur grotendeels behouden blijven.",
        ],
      },
      {
        title: "Verschillen tussen de gehaltes 999, 900 en 800",
        paragraphs: [
          "Gehalte 999 (fijn/zuiver zilver) heeft de voorkeur voor baren en beleggingsproducten omdat de zuiverheidsgraad het belangrijkste criterium is voor beleggers; maar door de zachtheid ervan wordt het zelden gebruikt in alledaagse sieraden.",
          "Gehalte 900 (muntzilver) werd historisch gebruikt in zilveren munten van veel landen. Gehalte 800, vooral gangbaar in Europa (Duitsland, Oostenrijk), is een minder pure sieradenstandaard dan sterlingzilver, maar nog steeds sterk.",
        ],
      },
      {
        title: "Hoe bereken je de hoeveelheid zuiver zilver?",
        paragraphs: [
          "Om de hoeveelheid zuiver zilver in een zilveren ring van 10 gram met gehalte 925 te bepalen: 10 × (925 / 1000) = 9,25 gram zuiver zilver. De overige 0,75 gram is koper of ander metaal dat is toegevoegd voor stevigheid.",
          "Dezelfde logica geldt voor het omrekenen tussen verschillende gehaltes: als bijvoorbeeld de hoeveelheid zuiver zilver van een legering met gehalte 925 bekend is, wordt het equivalent in gehalte 999 verkregen door die hoeveelheid te delen door 999/1000.",
        ],
      },
      {
        title: "De relatie tussen het aanslaan van zilver en de zuiverheid ervan",
        paragraphs: [
          "Het na verloop van tijd aanslaan (oxideren) van een zilveren sieraad komt niet door het zilver zelf, maar door de reactie van het koper in de legering met zwavelverbindingen in de lucht. Daarom heeft zilver met een hogere zuiverheid (zoals gehalte 999) de neiging minder snel aan te slaan.",
          "Sommige fabrikanten hebben 'aanslagbestendige' sterlingzilverlegeringen ontwikkeld om deze eigenschap te verbeteren, door andere elementen, zoals germanium, in plaats van koper te gebruiken.",
        ],
      },
    ],
    unitTable: [
      { name: "Zilver 999", symbol: "999", referenceValue: "99,9% zuiver zilver", system: "Sieradenstandaard", commonUse: "Baren, beleggingszilver" },
      { name: "Zilver 925", symbol: "925", referenceValue: "92,5% zuiver zilver (sterling)", system: "Sieradenstandaard", commonUse: "Sieraden en bestek (wereldstandaard)" },
      { name: "Zilver 900", symbol: "900", referenceValue: "90% zuiver zilver", system: "Sieradenstandaard", commonUse: "Historische zilveren munten" },
      { name: "Zilver 800", symbol: "800", referenceValue: "80% zuiver zilver", system: "Sieradenstandaard (Europa)", commonUse: "Europese sieradenstandaard" },
    ],
  },
];

export function findNederlandsCategoryPage(slug: string) {
  return nederlandsCategoryPages.find((page) => page.slug === slug);
}

export function findNederlandsCategoryPageByTurkishSlug(sourceSlug: string) {
  return nederlandsCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
