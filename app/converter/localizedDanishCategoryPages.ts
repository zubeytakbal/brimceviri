// Danske kategorisider -- integreret i det nye i18n-system.
// Selvstaendig, ny fil (aendrer ingen eksisterende tr/en/de/ar/uz/bn/fr/es/pt/it/nl/sv/no-filer).
//
// Bevidst begraenset til de 17 elementer, der udgor sidens identitet
// (13 karnekategorier + 4 universelle vaerktojer pa forsiden) -- ingen
// videnskabelige eller hverdagsagtige lommeregnere. Indhold oversat direkte
// fra TR-kildeartiklerne (app/converter/categoryArticles.ts og
// app/converter/articles/*/Article.ts), ikke fra et mellemsprog.

export type LocalizedDanishCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedDanishCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedDanishCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedDanishCategoryPage = {
  locale: "da";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedDanishCategoryFact[];
  sections: LocalizedDanishCategorySection[];
  unitTable: LocalizedDanishCategoryUnitRow[];
};

export const danishCategoryPages: LocalizedDanishCategoryPage[] = [
  {
    locale: "da",
    slug: "laengde",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Omregn laengdeenheder",
    description:
      "Omregn gratis og direkte mellem meter, kilometer, centimeter, mil og fod; se formler og tabeller.",
    introduction: [
      "Laengde er den fysiske storrelse, der beskriver afstanden mellem to punkter eller udstraekningen af et objekt i en bestemt retning. I videnskabelige malinger er meter grundenheden for laengde i Det Internationale Enhedssystem (SI).",
      "I dagligdagen og i videnskabeligt arbejde bruges forskellige laengdeenheder -- som nanometer, mikrometer, millimeter, centimeter, meter og kilometer -- afhaengigt af storrelsen af den afstand, der males.",
      "Enheder uden for det metriske system, som tommer, fod, yard og mil, bruges stadig, saerligt i forbindelse med USA og Storbritannien.",
    ],
    facts: [
      { label: "SI-grundenhed", value: "Meter" },
      { label: "SI-enhedssymbol", value: "m" },
      { label: "Fysisk storrelse", value: "Laengde" },
      { label: "Dimensionssymbol", value: "L" },
      { label: "Gaeldende meterdefinition", value: "Afstanden lyset tilbagelaegger i vakuum pa 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Hvad er laengde?",
        paragraphs: [
          "Laengde er en af de grundlaeggende fysiske storrelser, der bruges til at beskrive hojden, bredden, tykkelsen af et objekt eller afstanden mellem to punkter. Afhaengigt af maleretningen kan et og samme objekt have flere forskellige laengdevaerdier.",
          "I fysik betegnes laengde saedvanligvis med dimensionssymbolet L. Laengdedimensionen bruges til at definere mange afledte storrelser, som areal, rumfang, hastighed, acceleration, tryk og densitet.",
        ],
      },
      {
        title: "SI-enheden for laengde",
        paragraphs: [
          "I Det Internationale Enhedssystem er grundenheden for laengde meter, som betegnes med symbolet m. Meter er referencen, der bruges til at definere alle andre laengdeenheder.",
          "Metriske enheder som kilometer, centimeter, millimeter, mikrometer og nanometer er knyttet til meteren gennem decimale multipla og delenheder. Denne struktur gor, at omregning mellem metriske enheder kan foretages ved hjaelp af titalspotenser.",
        ],
      },
      {
        title: "Den videnskabelige definition af meteren",
        paragraphs: [
          "Meteren blev tidligere defineret ud fra jordens dimensioner og fysiske malestave. Efterhanden som maleteknologien udviklede sig, opstod behovet for en mere stabil definition, der kunne reproduceres overalt i verden.",
          "I dag defineres en meter som den laengde, lyset tilbagelaegger i vakuum i et tidsinterval pa 1/299 792 458 sekund. Denne definition bygger pa, at lysets hastighed i vakuum er fastsat til noejagtigt 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "Metriske laengdeenheder",
        paragraphs: [
          "I det metriske system er enhederne knyttet til meteren gennem positive eller negative potenser af tallet 10. En kilometer svarer til 1000 meter, en centimeter svarer til 0,01 meter, og en millimeter svarer til 0,001 meter.",
          "For meget sma laengder bruges mikrometer, nanometer og pikometer. Celler males ofte i mikrometer, lysbolgelaengder i nanometer, og visse afstande pa atomart niveau kan udtrykkes i pikometer.",
        ],
      },
      {
        title: "Laengdeenheder uden for det metriske system",
        paragraphs: [
          "Tommer, fod, yard og engelsk mil er almindelige laengdeenheder uden for det metriske system. Disse enheder bruges saerligt i det amerikanske malesystem og visse praksisser knyttet til britisk maletradition.",
          "En tomme svarer noejagtigt til 2,54 centimeter, en fod svarer til 12 tommer, og en yard svarer til 3 fod. En engelsk mil er defineret til noejagtigt 1609,344 meter.",
        ],
      },
      {
        title: "Laengde inden for sofart og luftfart",
        paragraphs: [
          "Inden for sofart og luftfart udtrykkes afstande saedvanligvis i sominil. En sommil svarer noejagtigt til 1852 meter.",
          "Sommilen er udviklet ud fra en historisk maletilgang knyttet til jordens geografiske koordinater. Fartsenheden knob betyder ogsa sominil per time.",
        ],
      },
      {
        title: "Hvordan males laengde?",
        paragraphs: [
          "I hverdagsmalinger bruges vaerktojer som lineal, maleband, skydelaere og mikrometer. Praecisionen af maleredskabet vaelges ud fra storrelsen af det objekt, der males, og det noejagtighedsniveau, der kraeves.",
          "I ingenior- og forskningssammenhaeng kan laserafstandsmalere, koordinatmalemaskiner, interferometre og forskellige optiske malesystemer anvendes.",
        ],
      },
      {
        title: "Malenoejagtighed og usikkerhed",
        paragraphs: [
          "Ingen fysisk maling er absolut fejlfri. Der er altid en vis usikkerhed i maleresultatet, som skyldes instrumentets oplosning, kalibrering, miljoforhold og den anvendte metode.",
          "Derfor bor ikke kun den malte vaerdi, men ogsa maleusikkerheden og den anvendte enhed angives i videnskabelige resultater. Saerligt i praecist ingeniorarbejde kan selv temperaturaendringer pavirke laengden af et materiale.",
        ],
      },
      {
        title: "Hvordan omregnes laengdeenheder?",
        paragraphs: [
          "Ved omregning inden for samme malesystem bruges forholdet mellem enhederne. For eksempel divideres vaerdien med 1000 for at omregne meter til kilometer, og ganges med 1000 for at omregne kilometer til meter.",
          "Ved omregning mellem det metriske system og britiske eller amerikanske enheder skal man bruge definerede, noejagtige omregningsfaktorer. For eksempel ganges vaerdien med 2,54 ved omregning fra tommer til centimeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrisk", commonUse: "Lysbolgelaengde og nanoteknologi" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrisk", commonUse: "Celler, partikler og praecisionsproduktion" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrisk", commonUse: "Tekniske tegninger og sma mal" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrisk", commonUse: "Maling af hverdagsgenstande" },
      { name: "Decimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrisk", commonUse: "Undervisning og enkelte rumfangsforhold" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grundlaeggende laengdemalinger" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metrisk", commonUse: "Vej- og geografiske afstande" },
      { name: "Tomme", symbol: "in", referenceValue: "0,0254 m", system: "Britisk/amerikansk", commonUse: "Skaerme, ror og tekniske mal" },
      { name: "Fod", symbol: "ft", referenceValue: "0,3048 m", system: "Britisk/amerikansk", commonUse: "Hojde, byggeri og luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britisk/amerikansk", commonUse: "Idraetsbaner og afstandsmalinger" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Britisk/amerikansk", commonUse: "Vejafstande" },
      { name: "Sommil", symbol: "nmi", referenceValue: "1852 m", system: "Sofart", commonUse: "Sofart og luftfart" },
    ],
  },
  {
    locale: "da",
    slug: "areal",
    sourceSlug: "alan",
    category: "alan",
    title: "Omregn arealenheder",
    description:
      "Omregn gratis og direkte mellem kvadratmeter, tonder land, hektar og kvadratfod; se formler og tabeller.",
    introduction: [
      "Areal er en afledt fysisk storrelse, der beskriver udstraekningen af en todimensional flade. Da det opstar ved at multiplicere en laengdeenhed med samme laengdeenhed, har areal altid dimensionen 'laengde i anden' (L²).",
      "I Det Internationale Enhedssystem er den afledte enhed for areal kvadratmeter (m²). I landbrug og ejendomsmaling bruges ogsa mal, tonder land og hektar; i det britiske/amerikanske system kvadratfod og acre; og i Sydasien lokale enheder som bigha, katha og decimal.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Areal" },
      { label: "Dimensionssymbol", value: "[L²]" },
      { label: "SI-afledt enhed", value: "Kvadratmeter" },
      { label: "SI-enhedssymbol", value: "m²" },
      { label: "Grundformel (rektangel)", value: "Areal = Laengde × Bredde" },
    ],
    sections: [
      {
        title: "Hvad er areal?",
        paragraphs: [
          "Areal beskriver storrelsen af en flade eller et plant omrade. Hvor meget plads et jordstykke, gulvet i et rum eller et ark papir optager, males i areal.",
          "Areal er en afledt storrelse; den fremkommer ved at multiplicere en grundlaeggende laengdeenhed med sig selv. Derfor angives SI-dimensionen for areal som L² (laengde i anden), og areal er altid en positiv skalar storrelse.",
        ],
      },
      {
        title: "SI-enheden for areal: kvadratmeter",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for areal kvadratmeter (m²), som beskriver arealet af et kvadrat med sidelaengde noejagtigt 1 meter.",
          "Kvadratmeter er ikke en selvstaendig grundenhed, men en afledt enhed, da den fremkommer ved at kvadrere laengdeenheden (meter). Alle andre metriske arealenheder (som kvadratcentimeter og kvadratkilometer) er knyttet til kvadratmeter gennem titalspotenser.",
        ],
      },
      {
        title: "Hvorfor omregnes arealenheder med et kvadratisk forhold?",
        paragraphs: [
          "Nar man omregner mellem laengdeenheder, bruges forholdet direkte, men mellem arealenheder skal dette forhold kvadreres. For eksempel svarer 1 kilometer til 1000 meter, men 1 kvadratkilometer svarer ikke til 1000 kvadratmeter, men til 1000², altsa 1 000 000 kvadratmeter.",
          "Dette skyldes, at begge dimensioner (laengde og bredde) i en arealenhed vokser eller skrumper i samme forhold. At overse dette kvadratiske forhold er den mest almindelige regnefejl ved arealomregning -- for eksempel at tro, at '1 km² = 1000 m²'.",
        ],
      },
      {
        title: "Metriske arealenheder",
        paragraphs: [
          "I det metriske system bruges kvadratmillimeter og kvadratcentimeter til sma arealer, kvadratmeter til hverdagsmalinger, og kvadratkilometer til store arealer. En kvadratcentimeter svarer til 0,0001 kvadratmeter, og en kvadratkilometer svarer til 1 000 000 kvadratmeter.",
          "Til ejendomsmaling bruges ar (100 m²) og hektar, som er 100 gange storre (10 000 m²). Hektar er den mest brugte metriske arealenhed i verden til at beskrive landbrugsarealer.",
        ],
      },
      {
        title: "Malenheden donum/dekar i Tyrkiet",
        paragraphs: [
          "I Tyrkiet er donum og dekar de mest brugte enheder til at male landbrugsareal; begge svarer i dag til 1000 kvadratmeter og kan bruges om hverandre. Dekar er det officielle navn i lovgivningen om mal og vaegt, mens donum er den traditionelle betegnelse i daglig tale.",
          "Under det osmanniske rige kunne storrelsen af en donum variere fra 900 til 1600 m² afhaengigt af region. Med maleloven af 1931 blev donum standardiseret til noejagtigt 1000 m² ved at knytte den til dekar.",
        ],
      },
      {
        title: "Arealenheder i det britiske/amerikanske system",
        paragraphs: [
          "Kvadratfod (ft²) og kvadrattomme (in²) bruges til sma flader, mens acre bruges til store jordstykker i det britiske/amerikanske malesystem. En acre svarer noejagtigt til 4046,8564224 kvadratmeter.",
          "Den historiske oprindelse af acre er storrelsen af det jorde, et par okser kunne plojne pa en dag. Den bruges stadig i ejendomsannoncer i USA, Storbritannien og enkelte samveldelande.",
        ],
      },
      {
        title: "Arealenheder i Sydasien",
        paragraphs: [
          "I lande som Indien, Bangladesh, Pakistan og Nepal bruges stadig lokale arealenheder som bigha, katha, killa, kanal, marla, guntha, biswa og decimal. Storrelsen af disse enheder kan variere betydeligt fra region til region, selv under samme navn.",
          "For eksempel svarer en bigha til omkring 1338 m² i Vestbengalen, mens den kan have en anden vaerdi i en anden delstat. Derfor er det vigtigt at bekraefte, hvilken regional standard der gaelder ved ejendomstransaktioner med disse enheder.",
        ],
      },
      {
        title: "Hvordan beregnes areal?",
        paragraphs: [
          "For et rektangulaert areal er formlen Areal = Laengde × Bredde. For en trekant bruges Areal = (Grundlinje × Hojde) / 2, og for en cirkel bruges Areal = π × Radius².",
          "For uregelmaessigt formede grunde finder man arealet ved at dele figuren op i mindre rektangler/trekanter og beregne arealet af hver del for sig (eller ved koordinatbaserede polygonformler i matrikelmalinger).",
        ],
      },
      {
        title: "Hvad skal man vaere opmaerksom pa ved arealmaling?",
        paragraphs: [
          "En arealvaerdi angivet i en ejendomsannonce eller et skode skal fortolkes ud fra den anvendte enhed (m², donum, acre, bigha) og hvilken regional standard denne enhed er defineret efter.",
          "Saerligt ved internationale ejendomstransaktioner undgar man misforstaelser ved at se pa den noejagtige kvadratmetervaerdi frem for navnelighed mellem enheder; omregningsvaerktojet pa denne side sammenligner alle enheder ud fra en faelles kvadratmeterreference.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrisk", commonUse: "Tekniske tegninger og sma flader" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrisk", commonUse: "Overfladeareal for sma genstande" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Bolig-, kontor- og grundareal" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metrisk", commonUse: "Sma grundstykker" },
      { name: "Donum/Dekar", symbol: "donum", referenceValue: "1000 m²", system: "Tyrkiet (metrisk)", commonUse: "Maling af landbrugsareal" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metrisk", commonUse: "Store landbrugs- og skovarealer" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrisk", commonUse: "By-, lande- og geografiske arealer" },
      { name: "Kvadratfod", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britisk/amerikansk", commonUse: "Boligareal (USA/Storbritannien)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britisk/amerikansk", commonUse: "Idraetsbaner og tekstil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britisk/amerikansk", commonUse: "Store jordstykker" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierer efter region)", system: "Sydasien", commonUse: "Landbrugsareal i Indien/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Japansk bolig- og grundmaling" },
    ],
  },
  {
    locale: "da",
    slug: "rumfang",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Omregn rumfangsenheder",
    description:
      "Omregn gratis og direkte mellem liter, milliliter, kubikmeter og kopper; se formler og tabeller.",
    introduction: [
      "Rumfang er en afledt fysisk storrelse, der beskriver storrelsen af det rum, et tredimensionelt objekt eller en beholder optager eller kan rumme. Da det fremkommer ved at multiplicere en laengdeenhed i tre dimensioner (laengde × bredde × hojde), har rumfang dimensionen L³ (laengde i tredje).",
      "I Det Internationale Enhedssystem er den afledte enhed for rumfang kubikmeter (m³); i dagligdagen er liter og milliliter langt mere almindeligt. I koekkenet bruges traditionelle mal som spiseske, teske og kop, mens det amerikanske/britiske system bruger gallon, quart, pint og fluid ounce.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Rumfang" },
      { label: "Dimensionssymbol", value: "[L³]" },
      { label: "SI-afledt enhed", value: "Kubikmeter" },
      { label: "SI-enhedssymbol", value: "m³" },
      { label: "Mest brugte enhed i dagligdagen", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Hvad er rumfang?",
        paragraphs: [
          "Rumfang er storrelsen af det tredimensionelle rum, et objekt optager, eller en beholder kan rumme. Rumfanget af et fast objekt beskriver dets fysiske storrelse, mens rumfanget af en beholder beskriver, hvor meget vaeske eller gas den kan indeholde.",
          "Rumfang er en afledt storrelse; den fremkommer ved at multiplicere en laengdeenhed i tre dimensioner (laengde, bredde, hojde). Derfor angives SI-dimensionen som L³.",
        ],
      },
      {
        title: "SI-enheden for rumfang: kubikmeter",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for rumfang kubikmeter (m³), som beskriver det indre rumfang af en kube, hvor hver side er noejagtigt 1 meter.",
          "Kubikmeter bruges til store rumfang (som vandtanke, betonstobning og containervolumen), mens liter, som er langt mindre, foretraekkes i dagligdagen. 1 kubikmeter svarer noejagtigt til 1000 liter.",
        ],
      },
      {
        title: "Forholdet mellem liter og kubikmeter",
        paragraphs: [
          "Liter er en praktisk rumfangsenhed, der er accepteret til brug sammen med SI, men som ikke er en officiel SI-enhed. En liter svarer til rumfanget af en kube med sidelaengde 10 centimeter (1000 kubikcentimeter).",
          "Delenhederne af liter -- deciliter, centiliter og milliliter -- bruges meget inden for mad, medicin og laboratoriemalinger. En milliliter svarer noejagtigt til en kubikcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Hvorfor omregnes rumfangsenheder med et kubisk forhold?",
        paragraphs: [
          "Mens laengdeenheder omregnes med et lineaert forhold, og arealenheder med et kvadratisk forhold, omregnes rumfangsenheder med et kubisk (tredje potens) forhold. For eksempel svarer 1 meter til 100 centimeter, men 1 kubikmeter svarer ikke til 100 kubikcentimeter, men til 100³, altsa 1 000 000 kubikcentimeter.",
          "Dette kubiske forhold skyldes, at rumfanget aendres i tre dimensioner samtidig, og det er den mest almindelige misforstaelse ved rumfangsomregning -- saerligt ved overgang til ikke-metriske enheder som gallon og kubikfod kraeves der omhyggelig beregning.",
        ],
      },
      {
        title: "Malenheder i koekkenet",
        paragraphs: [
          "Mal som spiseske, teske og kop, der bruges i opskrifter, er standardiserede rumfangsenheder, der sikrer, at opskrifter tilberedt i forskellige koekkener giver konsistente resultater. Almindeligt accepterede vaerdier i Tyrkiet er: 1 spiseske ≈ 15 mL, 1 teske ≈ 5 mL, 1 kop ≈ 200 mL.",
          "Disse mal er ikke eksakte videnskabelige standarder, men omtrentlige vaerdier, der er alment accepterede i koekkenpraksis; for opskrifter, der kraever praecis maling (saerligt ved bagning), er det mere palideligt at bruge en digital koekkenvaegt.",
        ],
      },
      {
        title: "Amerikanske og britiske vaeskemal",
        paragraphs: [
          "I det amerikanske og britiske system bruges enheder som gallon, quart, pint og fluid ounce, men enhedsstorrelserne i disse to systemer er forskellige. En amerikansk gallon svarer til 3,78541 liter, mens en britisk (imperial) gallon svarer til 4,54609 liter -- altsa omkring 20 % storre.",
          "Denne forskel skyldes, at de to lande historisk har accepteret forskellige referencegalloner som standard (vingallon i USA, imperial gallon i Storbritannien). Man bor altid tjekke, hvilket system en 'gallon'- eller 'ounce'-vaerdi pa en opskrift eller produktetiket tilhorer.",
        ],
      },
      {
        title: "Landbrugs- og historiske rumfangsenheder",
        paragraphs: [
          "Bushel og peck er historisk set rumfangsenheder, der er brugt til at male torre varer som korn, frugt og gronsager; de bruges stadig i enkelte landbrugsmarkeder, saerligt i USA.",
          "Under det osmanniske rige var kile og sinik traditionelle rumfangsenheder brugt til kornmaling; 1 kile svarede til 20 sinik. Selvom disse enheder varierede lidt fra region til region, bruges de stadig som reference ved fortolkning af historiske tekster og optegnelser.",
        ],
      },
      {
        title: "Hvordan beregnes rumfang?",
        paragraphs: [
          "For et rektangulaert prisme (en kasse) bruges formlen Rumfang = Laengde × Bredde × Hojde. For en cylinder gaelder Rumfang = π × Radius² × Hojde, og for en kugle Rumfang = (4/3) × π × Radius³.",
          "Rumfanget af uregelmaessigt formede faste objekter kan ofte findes ved fortraengningsmetoden (Arkimedes' princip) -- ved at saenke objektet i en vandfyldt beholder og male rumfanget af det vand, der loeber over.",
        ],
      },
      {
        title: "Rumfangsmaling inden for olie og industri",
        paragraphs: [
          "I olieindustrien udtrykkes rumfang saedvanligvis i tonder (barrel, bbl); 1 tonde svarer noejagtigt til 158,987 liter (42 amerikanske gallon). Denne enhed stammer fra en tradition fra 1800-tallet, hvor olie blev transporteret i traetonder til vin.",
          "I industrielle processer udtrykkes store rumfang saedvanligvis i kubikmeter, mens sma laboratoriemalinger udtrykkes i milliliter; korrekt enhedsvalg foretages ud fra storrelsen af det rumfang, der males.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrisk", commonUse: "Medicindoser og sma malinger" },
      { name: "Teske", symbol: "ts", referenceValue: "0,000005 m³ (≈5 mL)", system: "Koekkenmal", commonUse: "Opskrifter" },
      { name: "Spiseske", symbol: "ss", referenceValue: "0,000015 m³ (≈15 mL)", system: "Koekkenmal", commonUse: "Opskrifter" },
      { name: "Kop", symbol: "kop", referenceValue: "0,0002 m³ (≈200 mL)", system: "Tyrkiet (koekken)", commonUse: "Tyrkiske opskrifter" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metrisk", commonUse: "Drikke, braendstof og daglig rumfangsmaling" },
      { name: "Fluid ounce (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drikke- og kosmetikemballage" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Maling af ol og maelk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Braendstof og store vaeskemaengder" },
      { name: "Britisk gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britisk (imperial)", commonUse: "Braendstof- og vaeskemaling i Storbritannien" },
      { name: "Kubikfod", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britisk/amerikansk", commonUse: "Byggeri og HVAC-luftstrom" },
      { name: "Tonde (olie)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Olieindustri", commonUse: "Maling af raolie" },
      { name: "Kubikmeter", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Vandtanke, beton og store rumfang" },
    ],
  },
  {
    locale: "da",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Omregn masseenheder",
    description:
      "Omregn gratis og direkte mellem kilogram, gram, ton og pund; se formler og tabeller.",
    introduction: [
      "Masse er en grundlaeggende fysisk storrelse knyttet til maengden af stof i et legeme og dets inertiegenskab. I Det Internationale Enhedssystem er grundenheden for masse kilogram, og den betegnes med symbolet kg.",
      "Masse og vaegt bruges ofte i flaeng i dagligdagen, men de er fysisk set forskellige storrelser. Masse males i kilogram, mens vaegt -- som er en kraft -- males i newton.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Masse" },
      { label: "Dimensionssymbol", value: "[M]" },
      { label: "SI-grundenhed", value: "Kilogram" },
      { label: "SI-enhedssymbol", value: "kg" },
      { label: "Malevidenskabeligt felt", value: "Massemetrologi" },
    ],
    sections: [
      {
        title: "Hvad er masse?",
        paragraphs: [
          "Masse er den fysiske storrelse knyttet til den modstand, et legeme yder mod aendring i bevaegelsestilstand, altsa inerti. I klassisk mekanik udtrykkes forholdet mellem nettokraften, der virker pa et legeme, og den acceleration, den skaber, med F = m·a.",
          "Nar samme kraft pavirker to legemer, far det legeme med storst masse mindre acceleration. Derfor beskriver masse ikke kun maengden af stof i dagligdags forstand -- den spiller ogsa en central rolle i bevaegelsesligninger.",
          "Masse er en skalar storrelse. Den har ingen retning, og grunddimensionssymbolet i SI-systemet betegnes med bogstavet M.",
        ],
      },
      {
        title: "Forskellen mellem masse og vaegt",
        paragraphs: [
          "Masse og vaegt er ikke samme fysiske storrelse. Masse er en egenskab ved legemet og udtrykkes i kilogram. Vaegt er derimod den kraft, legemet udsaettes for i et gravitationsfelt, og males i newton.",
          "Den forenklede vaegtsammenhaeng er W = m·g. Her star W for vaegtkraften, m for massen og g for den lokale tyngdeacceleration.",
          "Massen af et legeme forbliver naesten den samme pa jorden og pa manen, men fordi den lokale tyngdeacceleration er forskellig, aendres vaegten. Derfor er kilogram i videnskabelig sammenhaeng en masseenhed, ikke en vaegtenhed.",
          "I dagligdagen udtrykkes vejeresultatet i kilogram, og ordene 'vaegt' og 'masse' bruges derfor ofte i flaeng. En vaegt registrerer i realiteten en kraftpavirkning, men kalibreres til at vise resultatet i masseenheder.",
        ],
      },
      {
        title: "Hvorfor er kilogram SI-grundenheden for masse?",
        paragraphs: [
          "I Det Internationale Enhedssystem er grundenheden for masse kilogram. Kilogram er den eneste SI-grundenhed, der har et praefiks i sit navn.",
          "Ordet gram spillede historisk en vigtig rolle i de forste massedefinitioner i det metriske system. Men da praktiske standarder skulle etableres, blev kilogram den grundlaeggende reference.",
          "I dag defineres kilogram ikke ud fra massen af en fysisk metalcylinder, men ud fra en fastsat talvaerdi for Plancks konstant. Sammenhaengen mellem denne definition, Kibble-vaegten og elektriske malinger er beskrevet detaljeret pa kilogram-informationssiden.",
        ],
      },
      {
        title: "Metriske masseenheder",
        paragraphs: [
          "Metriske masseenheder er bygget op af kilogram, gram og de SI-praefikser, der tilfojes disse. Et gram er 0,001 kilogram, et milligram er 0,001 gram, og et mikrogram er 0,001 milligram.",
          "Til store masser bruges ton. Et metrisk ton svarer noejagtigt til 1000 kilogram. Symbolet for ton, som er accepteret til brug sammen med SI, er lille t.",
          "Den rette enhed vaelges ud fra storrelsen af den masse, der males. Menneske- og produktmasser kan udtrykkes i kilogram, madindhold i gram, virksomme stoffer i medicin i milligram eller mikrogram, og koretojslaster i ton.",
        ],
      },
      {
        title: "Forholdet mellem pund, ounce og kilogram",
        paragraphs: [
          "Pund og ounce er masseenheder brugt i de britiske og amerikanske traditionelle malesystemer. Det internationale avoirdupois-pund svarer noejagtigt til 0,45359237 kilogram.",
          "Et avoirdupois-pund deles i 16 ounce. Dermed svarer en ounce noejagtigt til 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pund brugt i masseomregning ma ikke forveksles med kraftenheden pound-force. Pund udtrykker masse, mens pound-force udtrykker kraft. I tekniske beregninger ma symbolerne lb og lbf ikke blandes sammen.",
        ],
      },
      {
        title: "Hvordan males masse?",
        paragraphs: [
          "Ved massemaling bruges ligearmet vaegt, elektronisk vaegt, analysevaegt, lastceller og industrielle vejesystemer med forskellig kapacitet.",
          "Sammenlignende vaegte sammenligner en ukendt masse med sporbare standardmasser. I elektroniske vaegte kan lastceller omdanne den pafolgende kraft til et elektrisk signal.",
          "Ved hoejpraecisionsmalinger kan faktorer som luftens opdrift, lokal tyngdeacceleration, temperatur, fugtighed, vibration, elektrostatiske effekter og densiteten af standardmassen tages i betragtning.",
          "At massestandarder knyttes til nationale og internationale malesystemer, kaldes metrologisk sporbarhed. Kalibreringskaeden gor det muligt at sammenligne malinger udfort pa forskellige laboratorier og virksomheder.",
        ],
      },
      {
        title: "Forholdet mellem densitet, rumfang og masse",
        paragraphs: [
          "Mellem masse, densitet og rumfang gaelder sammenhaengen m = ρ·V. Her star m for masse, ρ for densitet og V for rumfang.",
          "To stoffer med samme rumfang kan have forskellig masse afhaengigt af densiteten. For eksempel har stal og vand med samme rumfang ikke samme masse.",
          "I SI-systemet er grundenheden for densitet kilogram per kubikmeter. I laboratoriesammenhaeng bruges ogsa enheder som gram per kubikcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Usikkerhed i massemaling",
        paragraphs: [
          "Enhver reel maling har en vis usikkerhed. At en vaegt viser mange cifre pa skaermen, betyder ikke, at alle cifrene er kendt med samme noejagtighed.",
          "Instrumentoploesning, gentagelighed, ikke-linearitet, kalibreringsstandard, miljoforhold og brugermetode kan alle bidrage til usikkerheden i en massemaling.",
          "I videnskabeligt og industrielt arbejde bor maleresultatet vurderes sammen med korrekt enhed, gaeldende cifre og usikkerhedsinformation.",
        ],
      },
      {
        title: "Hvordan vaelges den rette masseenhed?",
        paragraphs: [
          "At vaelge en enhed, der passer til storrelsen af det objekt, der males, gor resultatet mere laesbart. Massen af et menneske kan udtrykkes i kilogram, det virksomme stof i en tablet i milligram, og lasten pa en lastbil i ton.",
          "For meget sma masser kan SI-praefikserede enheder som mikrogram, nanogram og pikogram bruges. Pa atom- og molekylskala kan specielle enheder som den forenede atommasseenhed vaere mere praktiske.",
          "Ved enhedsomregning skal man ikke kun kontrollere den numeriske vaerdi, men ogsa om den anvendte enhed udtrykker masse eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Meget sma stofmaengder" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medicin- og laboratoriemalinger" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Medicindoser og kemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Mad og sma genstande" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grundlaeggende massemalinger" },
      { name: "Ton", symbol: "t", referenceValue: "1000 kg", system: "Metrisk", commonUse: "Koretojer, last og industri" },
      { name: "Ounce", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britisk/amerikansk", commonUse: "Mad og sma masser" },
      { name: "Pund", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britisk/amerikansk", commonUse: "Krops- og produktmasse" },
    ],
  },
  {
    locale: "da",
    slug: "temperatur",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Omregn temperaturenheder",
    description:
      "Omregn gratis og direkte mellem Celsius, Fahrenheit og Kelvin; se formler og tabeller.",
    introduction: [
      "Temperatur er en grundlaeggende fysisk storrelse knyttet til den gennemsnitlige kinetiske energi af partiklerne i et stof, som beskriver, hvor 'varmt' eller 'koldt' stoffet er. I Det Internationale Enhedssystem er grundenheden for temperatur kelvin.",
      "I dagligdagen er Celsius og Fahrenheit de mest brugte skalaer; i videnskabeligt arbejde bruges kelvin, i visse ingeniorberegninger Rankine, og i historiske tekster Reaumur. I modsaetning til de fleste andre fysiske storrelser kraever omregning mellem temperaturenheder bade multiplikation og addition/subtraktion.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensionssymbol", value: "[Θ]" },
      { label: "SI-grundenhed", value: "Kelvin" },
      { label: "SI-enhedssymbol", value: "K" },
      { label: "Absolut nulpunkt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Hvad er temperatur?",
        paragraphs: [
          "Temperatur er en storrelse direkte knyttet til den gennemsnitlige kinetiske (bevaegelses-)energi af de atomer og molekyler, der udgor et stof. Jo hurtigere partiklerne bevaeger sig, desto 'varmere' anses stoffet at vaere.",
          "Temperatur er en af de syv grundlaeggende storrelser i Det Internationale Enhedssystem og betegnes som termodynamisk temperatur med symbolet Θ (theta). I modsaetning til mange andre storrelser (som laengde og masse) er den ikke en direkte additiv storrelse -- at samle to legemer laegger ikke deres temperaturer sammen, men forer dem mod en ligevaegt.",
        ],
      },
      {
        title: "SI-enheden for temperatur: kelvin",
        paragraphs: [
          "Kelvin er SI-grundenheden for temperatur og betegnes med symbolet K (uden gradtegn, kun 'K' skrives). Kelvin-skalaen bruger det absolutte nulpunkt (den teoretisk lavest mulige temperatur) som udgangspunkt (0 K).",
          "Med SI-revisionen i 2019 defineres kelvin ikke laengere ud fra vandets trippelpunkt, men ud fra en fastsat talvaerdi for Boltzmann-konstanten (k). Dette sikrer, at temperaturenheden er knyttet til en universel konstant, ikke et fysisk referencestof.",
        ],
      },
      {
        title: "Hvorfor er temperaturomregning ikke bare multiplikation?",
        paragraphs: [
          "Ved enhedsomregning for storrelser som laengde eller masse bruges kun en multiplikationsfaktor (for eksempel meter-centimeter). For temperatur har Celsius-, Fahrenheit- og Kelvin-skalaerne forskellige 'nulpunkter', sa omregningen kraever bade multiplikation og addition/subtraktion.",
          "For eksempel ganges vaerdien forst med 9/5, og derefter laegges 32 til, nar man gar fra Celsius til Fahrenheit: °F = (°C × 9/5) + 32. Derfor er temperatur den eneste almindelige fysiske storrelse, der har et 'affint' (lineaert, men ikke gennem origo) omregningsforhold.",
        ],
      },
      {
        title: "Celsius-skalaen",
        paragraphs: [
          "Celsius-skalaen blev udviklet i 1742 af den svenske astronom Anders Celsius og definerer vandets frysepunkt til 0 °C og kogepunkt (ved 1 atmosfaeres tryk) til 100 °C. Dette er et praktisk referencesystem, der gor skalaen let at forsta i dagligdagen.",
          "Celsius er den mest brugte temperaturskala i videnskabeligt arbejde og i vejrudsigten i de fleste lande i verden; et fatal lande, som USA, foretraekker stadig Fahrenheit i dagligdagen.",
        ],
      },
      {
        title: "Fahrenheit-skalaen",
        paragraphs: [
          "Fahrenheit-skalaen blev udviklet i 1724 af den tyske fysiker Daniel Gabriel Fahrenheit. Pa denne skala er vandets frysepunkt 32 °F og kogepunkt 212 °F -- et interval pa hele 180 grader mellem frysning og kogning.",
          "Fahrenheit bruges i dag hovedsageligt i USA og et fatal andre lande til daglig temperaturmaling; i videnskabeligt arbejde er den i vid udstraekning blevet erstattet af Celsius og kelvin verden over.",
        ],
      },
      {
        title: "Rankine og Reaumur: mindre kendte skalaer",
        paragraphs: [
          "Rankine er en absolut temperaturskala, der bruger enheder pa storrelse med Fahrenheit-grader, men som saetter det absolutte nulpunkt til 0 °R; vandets frysepunkt er 491,67 °R. Den foretraekkes frem for kelvin i visse termodynamiske ingeniorberegninger, saerligt i USA.",
          "Reaumur-skalaen blev udviklet i 1700-tallet af den franske videnskabsmand Rene Reaumur; den saetter vandets frysepunkt til 0 °Re og kogepunkt til 80 °Re. Den bruges naesten slet ikke i dag, men kan stadig dukke op som en historisk reference i visse europaeiske lande (saerligt i nogle traditionelle russiske opskrifter).",
        ],
      },
      {
        title: "Hvad betyder absolut nulpunkt?",
        paragraphs: [
          "Absolut nulpunkt (0 kelvin, -273,15 °C, -459,67 °F) er den teoretiske temperatur, hvor partiklerne har den lavest mulige kinetiske energi i klassisk forstand. Ifolge kvantemekanikken star partikler ikke helt stille selv ved absolut nulpunkt (nulpunktsenergi), men i klassisk forstand kan ingen lavere temperatur defineres.",
          "Under laboratorieforhold har man opnaet temperaturer meget taet pa absolut nulpunkt (helt ned pa mikrokelvin- og endda nanokelvinniveau), men ifolge termodynamikkens tredje lov er det umuligt at na absolut nulpunkt fuldstaendigt i et endeligt antal trin.",
        ],
      },
      {
        title: "Hvordan males temperatur?",
        paragraphs: [
          "Ved temperaturmaling bruges forskellige teknologier som kviksolv-/alkoholtermometre, digitale termometre, termoelementer, modstandstermometre (RTD) og infrarode (kontaktloese) termometre. Hver af dem passer til forskellige temperaturomrader og praecisionsniveauer.",
          "Termoelementer bruges ofte i industrielle miljoer, fordi de kan fungere over et meget bredt temperaturomrade (nogle gange fra -200 °C til +2000 °C); de beregner temperaturen ud fra spaendingsforskellen, der opstar, hvor to forskellige metaller modes.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grundenhed", system: "SI", commonUse: "Videnskabelige og termodynamiske beregninger" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrisk (dagligbrug)", commonUse: "Vejr, dagligdag, videnskab" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig vejrmelding i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (ingenior)", commonUse: "Termodynamiske ingeniorberegninger" },
      { name: "Reaumur", symbol: "°Re", referenceValue: "°Re = °C × 4/5", system: "Historisk (Europa)", commonUse: "Historiske tekster, traditionelle opskrifter" },
    ],
  },
  {
    locale: "da",
    slug: "tid",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Omregn tidsenheder",
    description:
      "Omregn gratis og direkte mellem sekunder, minutter, timer og dage; se formler og tabeller.",
    introduction: [
      "Tid er en grundlaeggende fysisk storrelse, der beskriver raekkefolgen af haendelser og varigheden mellem dem. I Det Internationale Enhedssystem er grundenheden for tid sekund, og den bruges i dagligdagen sammen med afledte enheder som minut, time og dag.",
      "I modsaetning til storrelser som laengde eller masse er tid et af menneskehedens aeldste malebegreber; den 60-baserede struktur af time, minut og sekund gar tusinder af ar tilbage, til det gamle Babylon.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Tid" },
      { label: "Dimensionssymbol", value: "[T]" },
      { label: "SI-grundenhed", value: "Sekund" },
      { label: "SI-enhedssymbol", value: "s" },
      { label: "Gaeldende sekunddefinition", value: "9 192 631 770 svingningsperioder af et cesium-133-atom" },
    ],
    sections: [
      {
        title: "Hvad er tid?",
        paragraphs: [
          "Tid er en grundlaeggende storrelse, der beskriver den raekkefolge, haendelser sker i, og varigheden mellem to haendelser. I fysik betegnes den med dimensionssymbolet T og indgar i definitionen af mange afledte storrelser, som hastighed, acceleration og frekvens.",
          "Mens tid i klassisk fysik blev anset for en absolut storrelse, der flod ens for alle observatorer, har Einsteins relativitetsteori vist, at tiden kan flyde forskelligt afhaengigt af observatorens hastighed og gravitationsfelt (tidsdilatation).",
        ],
      },
      {
        title: "SI-enheden for tid: sekund",
        paragraphs: [
          "Sekund er SI-grundenheden for tid og betegnes med symbolet s. Historisk blev sekundet defineret som 1/86 400 af en dag (24 timer × 60 minutter × 60 sekunder).",
          "Pa grund af sma uregelmaessigheder i jordens rotationshastighed blev denne definition anset for ikke stabil nok; i 1967 blev sekundet omdefineret til noejagtigt 9 192 631 770 perioder af den straling, der svarer til overgangen mellem to grundenerginiveauer i cesium-133-atomet. Denne definition sikrede, at atomure fungerer med samme praecision overalt i verden.",
        ],
      },
      {
        title: "Den 60-baserede oprindelse af time, minut og sekund",
        paragraphs: [
          "At en time deles i 60 minutter, og et minut i 60 sekunder, bygger pa det 60-baserede (seksagesimale) taltalsystem, der blev brugt af det gamle Babylon. Babylonierne delte bade vinkler (360 grader) og tid efter dette system.",
          "Grunden til, at tallet 60 blev foretrukket, er, at det kan deles jaevnt pa mange tal, som 2, 3, 4, 5, 6, 10, 12, 15, 20 og 30 -- dette gjorde praktisk inddeling (for eksempel at dele en time i tre eller fire) mulig uden at skulle bruge brokdele.",
        ],
      },
      {
        title: "Hvorfor er dognet delt i 24 timer?",
        paragraphs: [
          "Inddelingen af dognet i 24 timer gar tilbage til det gamle Egypten; egypterne delte dagen i 12 og natten i 12 lige dele og fulgte tiden med solure og stjerneobservationer.",
          "Denne 12-deling er formentlig inspireret af at taelle leddene pa fingrene pa en hand (tre led pa hver af de fire fingre uden om tommelen, i alt 12), eller af antallet af manecykler i lobet af et ar (omkring 12 fuldmaner).",
        ],
      },
      {
        title: "Forholdet mellem metriske tidsenheder",
        paragraphs: [
          "Delenhederne af sekundet -- millisekund (0,001 sekund), mikrosekund og nanosekund -- bruges til at male meget korte haendelser, som computerprocesser, sporttidtagning og videnskabelige eksperimenter.",
          "Enhederne over sekundet -- minut (60 sekunder), time (3600 sekunder) og dogn (86 400 sekunder) -- er de grundlaeggende enheder, der bruges til at folge tiden i dagligdagen. I modsaetning til temperatur sker omregning mellem disse enheder kun ved multiplikation/division, fordi de alle deler et faelles nulpunkt (startpunkt).",
        ],
      },
      {
        title: "Hvad er et skudsekund?",
        paragraphs: [
          "Jordens rotationshastighed om sin egen akse viser sma uregelmaessigheder over tid pa grund af tidevandseffekter og aendringer i dens indre struktur; dette forer til en lille afvigelse mellem den 'noejagtige' tid malt med atomure og dognlaengden baseret pa jordens faktiske rotation.",
          "For at kompensere for denne afvigelse er der siden 1972 blevet tilfojet et 'skudsekund' til Koordineret Universaltid (UTC) ved behov. Dette er en korrektionsmekanisme, der ligner den ekstra dag i skudar (29. februar), men fordi uregelmaessigheden i jordens rotationshastighed er uforudsigelig, tilfojes skudsekunder efter behov og ikke efter en fast kalendercyklus.",
        ],
      },
      {
        title: "Tidszoner og UTC",
        paragraphs: [
          "Jorden er inddelt i omkring 24 tidszoner, fordi solen nar sit hojeste punkt pa forskellige tidspunkter afhaengigt af laengdegrad. Alle tidszoner bruger Koordineret Universaltid (UTC) som referencepunkt og udtrykkes som en tidsforskel fra denne reference for deres egen region (Danmark er for eksempel UTC+1 om vinteren).",
          "UTC er en moderne tidsstandard, der har erstattet den gamle Greenwich middeltid (GMT) og opretholdes med atomure; GMT bruges nu mest som navnet pa Storbritanniens vintertidszone.",
        ],
      },
      {
        title: "Hvordan males tid?",
        paragraphs: [
          "I dagligdagen bruges mekaniske og digitale ure, mens atomure bruges i videnskabelige og teknologiske anvendelser (som GPS-satellitter og telekommunikationsnet). Atomure fungerer med ekstremt hoj praecision baseret pa den stabile svingningsfrekvens af cesium- eller rubidiumatomer.",
          "For at GPS-systemet kan fastsla en position noejagtigt, skal atomurene i satellitterne vaere synkroniseret pa nanosekundniveau; selv en lille afvigelse i disse ure kan fore til store fejl i positionsberegningen pa jorden.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrisk", commonUse: "Databehandling og sporttidtagning" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grundlaeggende tidsmaling" },
      { name: "Minut", symbol: "min", referenceValue: "60 s", system: "Accepteret til brug sammen med SI", commonUse: "Daglig tidsfolgning" },
      { name: "Time", symbol: "t", referenceValue: "3600 s", system: "Accepteret til brug sammen med SI", commonUse: "Arbejdstid, rejsetid" },
      { name: "Dogn", symbol: "d", referenceValue: "86 400 s", system: "Accepteret til brug sammen med SI", commonUse: "Kalender- og varighedsberegninger" },
    ],
  },
  {
    locale: "da",
    slug: "hastighed",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Omregn hastighedsenheder",
    description:
      "Omregn gratis og direkte mellem km/t, m/s, mph og knob; se formler og tabeller.",
    introduction: [
      "Hastighed er en afledt fysisk storrelse, der beskriver den straekning, et legeme tilbagelaegger per tidsenhed. Da den fremkommer ved at dividere laengde med tid, har hastighed dimensionen L/T (laengde divideret med tid).",
      "I dagligdagen er kilometer i timen (km/t) og engelske mil i timen (mph) de mest brugte hastighedsenheder; i videnskabeligt arbejde foretraekkes meter per sekund (m/s), og i sofart og luftfart knob. Lysets hastighed har en saerlig plads blandt hastighedsenheder som en absolut ovre graense, der kan nas i universet.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Hastighed (fart)" },
      { label: "Dimensionssymbol", value: "[L/T]" },
      { label: "SI-afledt enhed", value: "Meter per sekund" },
      { label: "SI-enhedssymbol", value: "m/s" },
      { label: "Universel hastighedsgraense", value: "Lysets hastighed ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Hvad er hastighed?",
        paragraphs: [
          "Hastighed beskriver den straekning, et legeme tilbagelaegger per tidsenhed, og beregnes med formlen Hastighed = Straekning / Tid. I fysikken skelnes teknisk mellem 'fart' (skalar, uden retning) og 'hastighed' (vektor, med retning), men i dagligtale bruges de ofte i flaeng.",
          "Hastighed er en afledt storrelse; den fremkommer ved at dividere en laengdeenhed med en tidsenhed. Derfor angives SI-dimensionen som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheden for hastighed: meter per sekund",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for hastighed meter per sekund (m/s), som beskriver, at et legeme tilbagelaegger en meter hvert sekund. Denne enhed bruges som standard i videnskabelige beregninger og fysiske formler.",
          "I dagligdagen foretraekkes kilometer i timen (km/t) frem for meter per sekund, fordi koretojshastigheder og vejafstande udtrykkes med mere intuitive tal pa denne skala. 1 m/s svarer noejagtigt til 3,6 km/t.",
        ],
      },
      {
        title: "Kilometer i timen og engelske mil i timen",
        paragraphs: [
          "Kilometer i timen (km/t) er standard hastighedsenhed i vejtrafikken i lande, der bruger det metriske system, deriblandt Danmark. Engelske mil i timen (mph) foretraekkes i lande som USA og Storbritannien, der bruger det britiske malesystem.",
          "1 mph svarer til omkring 1,60934 km/t. Denne forskel er en praktisk kilde til forvirring, der kan fore til fejltolkning af fartmalere pa importerede koretojer eller fartgraenser ved lejebilkorsel i udlandet.",
        ],
      },
      {
        title: "Knob: hastighed i sofart og luftfart",
        paragraphs: [
          "Knob (sominil i timen) er standard hastighedsenhed i sofart og luftfart; 1 knob svarer noejagtigt til straekningen pa 1 sommil (1852 meter) tilbagelagt pa en time.",
          "Navnet knob kommer historisk fra at male et fartojs hastighed ved at kaste et reb med knuder ud i vandet og taelle, hvor mange knuder der passerede i lobet af et bestemt tidsrum. Denne metode blev brugt i arhundreder for de moderne hastighedsmaleinstrumenter.",
        ],
      },
      {
        title: "Lysets hastighed: universets fartgraense",
        paragraphs: [
          "Lysets hastighed er defineret til noejagtigt 299 792 458 m/s i vakuum, og ifolge Einsteins specielle relativitetsteori er den den absolutte ovre graense for, hvad information eller et legeme med masse kan opna i universet.",
          "At lysets hastighed er defineret som et eksakt tal (den blev anset for konstant ogsa for SI-revisionen i 2019), gor, at den gaeldende definition af meteren ogsa bygger pa denne konstant -- meteren er defineret som den straekning, lyset tilbagelaegger pa 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Mach-tal: forhold til lydens hastighed",
        paragraphs: [
          "Inden for luftfart udtrykkes hoje hastigheder ofte med Mach-tal; dette er forholdet mellem et legemes hastighed og lydens hastighed i det pagaeldende medie (Mach 1 = lydens hastighed). Lydens hastighed er ikke en fast vaerdi -- den varierer med luftens temperatur og densitet (omkring 343 m/s / 1235 km/t ved havoverfladen).",
          "Derfor kan samme Mach-tal svare til forskellige faktiske hastigheder (km/t eller m/s) ved forskellige hojder og temperaturer -- et flys hastighed pa Mach 0,85 vil variere i faktisk hastighedsvaerdi afhaengigt af hojde.",
        ],
      },
      {
        title: "Forskellen mellem gennemsnitsfart og momentanfart",
        paragraphs: [
          "Gennemsnitsfart findes ved at dividere den samlede tilbagelagte straekning med den samlede tid, der er gaet, og giver en enkelt vaerdi for en hel rejse. Momentanfart er derimod fartojets hastighed pa et bestemt ojeblik og kan aendre sig kontinuerligt (acceleration, opbremsning, stop).",
          "Mens en fartmaler i et koretoj viser momentanfarten, beregnes gennemsnitsfarten for en rejse saedvanligvis efterfolgende ud fra den samlede straekning og samlede tid -- disse to vaerdier er forskellige, sa laenge farten ikke er konstant gennem hele rejsen.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrisk", commonUse: "Laboratorie- og langsom bevaegelsesmaling" },
      { name: "Meter per minut", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrisk", commonUse: "Industriel bandhastighed" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Videnskabelige og fysiske beregninger" },
      { name: "Kilometer i timen", symbol: "km/t", referenceValue: "≈0,278 m/s", system: "Metrisk", commonUse: "Koretojshastighed og fartgraenser" },
      { name: "Engelske mil i timen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britisk/amerikansk", commonUse: "Koretojshastighed i USA og Storbritannien" },
      { name: "Knob", symbol: "knob", referenceValue: "≈0,514 m/s", system: "Sofart/luftfart", commonUse: "Skibs- og flyhastighed" },
      { name: "Kilometer per minut", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrisk", commonUse: "Kortdistancefartberegninger" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrisk", commonUse: "Rumfartojs- og himmellegemehastigheder" },
      { name: "Lyshastighed", symbol: "c", referenceValue: "299 792 458 m/s", system: "Universel konstant", commonUse: "Fysik- og astronomiberegninger" },
    ],
  },
  {
    locale: "da",
    slug: "tryk",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Omregn trykenheder",
    description:
      "Omregn gratis og direkte mellem pascal, bar, psi og atmosfaere; se formler og tabeller.",
    introduction: [
      "Tryk beskriver, hvor meget af den kraft, der virker vinkelret pa en flade, der falder pa hver arealenhed. Anvendelsesomradet straekker sig fra kontaktspaendinger mellem faste stoffer til vaesken i et ror, fra atmosfaeren til vakuumsystemer. I ingeniorfag er tryk ikke kun en talvaerdi, men en grundlaeggende designvariabel for sikkerhed, taethed, strukturel styrke, energiomdannelse og processtyring.",
      "I Det Internationale Enhedssystem er den afledte enhed for tryk pascal, som betegnes med symbolet Pa. En pascal svarer til det tryk, der opstar, nar en kraft pa en newton fordeler sig jaevnt over et areal pa en kvadratmeter. Derfor er trykenheden direkte knyttet til begreberne kraft og areal; samme dimensionsstruktur deles ogsa med materialespaending, men den fysiske sammenhaeng er ikke altid den samme.",
      "I dagligdagen og industrien udtrykkes tryk oftest med mere praktiske enheder end pascal. Kilopascal og PSI bruges til daektryk, bar i procesanlaeg, atm ved atmosfaeriske forhold, og millibar i meteorologi. At forskellige sektorer historisk har taget forskellige enheder i brug, gor det saerligt vigtigt at forsta trykomregning korrekt og ikke blande absolut, manometrisk og differenstryk sammen.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Tryk" },
      { label: "SI-afledt enhed", value: "Pascal" },
      { label: "SI-symbol", value: "Pa" },
      { label: "Grundsammenhaeng", value: "P = F / A" },
      { label: "SI-ekvivalent", value: "1 Pa = 1 N/m²" },
      { label: "Dimensionsformel", value: "M L⁻¹ T⁻²" },
      { label: "Standardatmosfaere", value: "101 325 Pa" },
      { label: "Absolut nulpunktsreference", value: "Fuldstaendigt vakuum" },
    ],
    sections: [
      {
        title: "Hvad er tryk?",
        paragraphs: [
          "Tryk afhaenger ikke kun af storrelsen af den kraft, der virker pa en flade, men ogsa af, hvilket areal denne kraft fordeler sig over. Nar samme kraft virker pa et mindre areal, oeges trykket; nar den fordeler sig over et storre areal, aftager det. Derfor kan en skarp kniv skaere med lille kraft, mens samme kraft over en bred flade giver en langt mindre overfladeeffekt.",
          "I stromningsmekanik betragtes tryk som normalspaendingskomponenten, en stillestaende eller bevaegelig vaeske udoever pa sine omgivelser. I en stillestaende vaeske overfores trykket i alle retninger og knyttes til Pascals princip i lukkede beholdere. Denne egenskab er grundlaget for hydrauliske presser, bremsesystemer og mange industrielle aktuatorer.",
          "Trykbegrebet er ikke begraenset til vaesker og gasser. Den gennemsnitlige normalkrafteffekt ved kontaktflader danner ogsa en trykkelignende fordeling. Men i ingeniorfag er det oftest stromningssystemer som ror, tanke, kompressorer, luftkanaler, vakuumkamre og atmosfaeriske omgivelser, der star i fokus, nar man taler om tryk.",
        ],
      },
      {
        title: "Trykformlen: P = F / A",
        paragraphs: [
          "Grunddefinitionen af tryk gives ved sammenhaengen P = F / A. Her star P for tryk, F for kraftkomponenten vinkelret pa fladen, og A for det areal, denne kraft fordeler sig over. Enhedsanalyse giver newton divideret med kvadratmeter, hvilket svarer til pascal.",
          "Denne sammenhaeng giver gennemsnitstrykket forudsat jaevn kraftfordeling. I virkelige kontaktproblemer eller komplekse felter i en vaeske kan trykket variere langs fladen. I sadanne tilfaelde tages lokal trykfordeling, differentialligninger og graensebetingelser i betragtning i stedet for en enkelt gennemsnitsvaerdi.",
          "En almindelig fejl i praksis er at vaelge forkert kraftretning eller effektivt areal. Ved beregning af for eksempel stempelkraft skal kun det effektive tvaersnitsareal, der er udsat for tryk, bruges. Nar geometriske detaljer som pakninger, bolte eller stotteflader overses, kan der opsta designfejl.",
        ],
      },
      {
        title: "Hvorfor er pascal SI-trykenheden?",
        paragraphs: [
          "Pascal fremkommer som en naturlig kombination af newton, SI-enheden for kraft, og kvadratmeter, SI-enheden for areal. Sammenhaengen 1 Pa = 1 N/m² er derfor ikke kun en definition, men ogsa et dimensionsudtryk, der viser den mekaniske oprindelse af tryk. Det er ikke nodvendigt at definere en separat grundenhed for tryk.",
          "SI-systemet sigter mod at knytte afledte storrelser konsekvent til grundenheder. At tryk udtrykkes i pascal, giver et rammevaerk, der er konsistent med ligninger for energitaethed, spaending, elasticitetsmodul og stromningsmekanik. At samme enhed kan bruges pa tvaers af forskellige fagomrader, reducerer omregningsfejl i beregninger.",
          "Pascal er ofte en lille enhed i dagligdagen. Derfor foretraekkes mere praktiske skalaer som kilopascal, megapascal eller bar i ingeniorfag. Alligevel er alle disse i sidste ende knyttet til pascal, og dermed til SI-grundlaget.",
        ],
      },
      {
        title: "Historien om trykmaling: Torricelli og barometeret",
        paragraphs: [
          "Den systematiske maling af tryk startede i 1643, da den italienske videnskabsmand Evangelista Torricelli udviklede kviksolvbarometeret. Torricelli fyldte et glasror lukket i den ene ende med kviksolv og saenkede den abne ende ned i en beholder med kviksolv, og observerede, at kviksolvet i roret blev staende pa en bestemt hojde og efterlod et tomrum over sig.",
          "Torricelli foreslog, at hojden af kviksolvsojlen blev balanceret af vaegten af luften udenfor. Denne idé dannede det eksperimentelle grundlag for opfattelsen af, at luft har en malbar vaegt, og dermed et tryk, og regnes som starten pa den videnskabelige undersogelse af tryk som storrelse.",
          "I 1648 viste Florin Périer, pa forslag fra Blaise Pascal, ved at male et barometer pa forskellige hojder pa bjerget Puy-de-Dôme, at atmosfaeretrykket aftager med hojden. I de folgende arhundreder byggede man videre pa dette grundlag; Meterkonventionen i 1875 samordnede maleenheder internationalt, i 1954 kom den eksakte definition af standardatmosfaere, og i 1971 blev pascal optaget som SI-enhed.",
        ],
      },
      {
        title: "Absolut, manometrisk og differenstryk",
        paragraphs: [
          "Absolut tryk males i forhold til fuldstaendigt vakuum. Denne reference er den teoretiske tilstand, hvor trykket er nul, og absolut tryk kan ikke vaere negativt. Saerligt gaslove, termodynamiske beregninger og enkelte taethedsrelaterede sammenhaenge arbejder med absolut tryk.",
          "Manometrisk tryk males derimod i forhold til atmosfaeretrykket. De fleste manometre pa anlaeg bruger den omgivende atmosfaere som nulreference; derfor er den vaerdi, der vises pa skaermen, oftest manometrisk tryk. Sammenhaengen mellem absolut og manometrisk tryk er P_abs = P_manometrisk + P_atm.",
          "Differenstryk er trykforskellen mellem to punkter. I anvendelsesomrader som filtertilstopning, debitmaling over en blaendeplade, rumtrykssaetning og varmevekslerydelse overvages direkte trykforskellen mellem to forskellige linjer eller rumfang. Denne storrelse defineres hverken i forhold til fuldstaendigt vakuum eller kun i forhold til atmosfaeren; den er direkte forskellen mellem to punkter.",
        ],
      },
      {
        title: "Atmosfaeretryk",
        paragraphs: [
          "Atmosfaeretryk er det tryk, luftsojlen i jordens atmosfaere udoever pa flader pa grund af sin vaegt. Under standardforhold naer havoverfladen regnes det for omkring 101 325 Pa, altsa 1 atm. Denne vaerdi er dog ikke konstant; den varierer med hojde, vejrforhold og temperaturaendringer.",
          "Barometre bruges til at male atmosfaeretrykket. Kviksolvbarometre har historisk vaeret referenceinstrumenter, mens elektroniske tryksensorer er blevet stadig mere udbredte i moderne anvendelser. Atmosfaeretryk er vigtigt ikke kun for meteorologi, men ogsa for vakuumteknologi, forbraendingssystemer og omregning mellem manometrisk og absolut tryk.",
          "I systemer, der arbejder med manometrisk tryk, kan aendringer i atmosfaeretrykket pavirke maletolkningen. For eksempel giver 2 bar manometrisk tryk ved havoverfladen og 2 bar manometrisk tryk i hojereliggende omrader ikke samme absolutte vaerdi. Denne sondring kan vaere afgorende saerligt i beregninger af kompression, gastaethed og kogepunkt.",
        ],
      },
      {
        title: "Hydrostatisk tryk og sammenhaengen P = ρgh",
        paragraphs: [
          "I en stillestaende vaeske oeges trykket med dybden. Under antagelse af konstant taethed udtrykkes det hydrostatiske manometriske tryk tilnaermelsesvist med sammenhaengen P = ρgh. Her repraesenterer ρ taethed, g tyngdeacceleration og h hojden af vaeskesojlen.",
          "Denne sammenhaeng er saerligt nyttig for vandtanke, abne tanke, damme, niveaumaling og vaeskefyldte manometre. Ved samme hojde og i samme vaeske regnes trykket for lige stort; formen pa beholderen aendrer ikke resultatet. Det afgorende er vaeskens taethed og den lodrette dybde i forhold til den frie overflade.",
          "Absolut hydrostatisk tryk omfatter ikke kun stigningen ρgh, men ogsa starttrykket ved den frie overflade. I en aben beholder er denne startvaerdi saedvanligvis atmosfaeretrykket. Derfor skal man ved beregning af absolut tryk ikke kun laegge stigningen fra vaeskesojlen til, men ogsa det ydre tryk ved overfladen.",
        ],
      },
      {
        title: "Statisk, dynamisk og totalt tryk",
        paragraphs: [
          "Statisk tryk er trykkomponenten, der repraesenterer den lokale termodynamiske tilstand af stromningen set fra en observator, der bevaeger sig med vaesken. De fleste malepunkter i rorledninger, tanke og kanaler folger hovedsageligt det statiske tryk. Storparten af tryktransmittere er designet til at male denne storrelse.",
          "Dynamisk tryk udtrykker den kinetiske effekt, der skyldes stromningshastigheden, og den ofte anvendte tilnaermede sammenhaeng er q = 1/2 ρv². Dette led spiller en vigtig rolle i Bernoulli-tilnaermelsen og bruges i hastighedsmalemetoder som pitotror. Nar hastigheden oeges, oeges ogsa det dynamiske tryk.",
          "Totalt tryk fortolkes i en ideel stromningstilnaermelse som summen af statisk og dynamisk tryk. I virkelige systemer skal denne sondring bruges med forsigtighed pa grund af friktion, turbulens, komprimerbarhed og lokale tab. Alligevel er sondringen mellem statisk, totalt og dynamisk tryk et grundlaeggende ingeniorsprog inden for ventilation, aerodynamik og procesmaling.",
        ],
      },
      {
        title: "Trykhojde og pumpelofthojde",
        paragraphs: [
          "Trykhojde er udtrykket for et bestemt tryk som den tilsvarende hojde af en vaeskesojle. Grundsammenhaengen er h = P / (ρg). Dermed svarer samme tryk til forskellige hojdevaerdier for vaesker med forskellig taethed.",
          "I pumpesystemer fortolkes tryk ofte direkte som meter vaeskesojle i stedet for pascal eller bar. Dette er fordi pumpens opgave ikke kun er at tilfore vaesken tryk, men ogsa at levere den energi, der kraeves for at daekke en bestemt hojde, friktionstab og hastighedskomponent. Derfor er begrebet lofthojde meget praktisk set fra feltingenioerens synspunkt.",
          "Trykhojde og geometrisk hojde er ikke samme begreb. Kun at se pa manometeraflaesningen uden at tage hensyn til rortab, hastighedshoved og lokale modstande kan give fejlagtige resultater ved pumpevalg og systembalancering. Saerligt for vand, olie og procesvaesker kraever taethedsforskelle, at omregningen foretages med omhu.",
        ],
      },
      {
        title: "Hvorfor er trykenhederne forskellige?",
        paragraphs: [
          "Mangfoldigheden af trykenheder skyldes i vid udstraekning historiske og brancherelaterede arsager. Mens SI-systemet laegger pascal til grund, bruges stadig bar i industrien, mmHg i medicin, millibar i meteorologi, PSI i bilindustrien, og enheder som at i enkelte aeldre tekniske dokumenter. Dette skyldes, at forskellige fagomrader har bevaret deres egne brugsvaner.",
          "Enkelte enheder opleves som mere intuitive for brugeren. For eksempel kan daektryk vaere mere laesbart som omkring 35 psi end som 240 kPa, og procestryk som 3,5 bar i stedet for 350 000 Pa. Valg af enhed handler ikke kun om noejagtighed, men ogsa om rapporteringskultur, instrumentskalering og feltvaner.",
          "Men fordi forskellige enheder udtrykker samme fysiske storrelse, er noejagtig omregning nodvendig i faelles beregninger. Saerligt at blande tilnaermede og eksakt definerede koefficienter sammen, overse sondringen mellem manometrisk og absolut tryk, og fejlaeslsning af symboler er vigtige fejlkilder.",
        ],
      },
      {
        title: "Hvordan males tryk?",
        paragraphs: [
          "Ved trykmaling skal man forst afgore, hvilken type tryk der kraeves: absolut, manometrisk eller differens. Derefter vurderes maleomrade, vaesketype, temperatur, kemisk kompatibilitet, vibration og pakraevet noejagtighedsniveau. Samme sensor passer ikke nodvendigvis til enhver anvendelse.",
          "Ved lavtryks- og differensmalinger kan membranbaserede differenstransmittere bruges, ved hoje procestryk straekmaaler- eller piezoresistive elementer, og i vakuumanvendelser specielle absolutte sensorer. Vaeskefyldte manometre er meget nyttige til at laere grundprincippet; men i moderne industri er elektroniske instrumenter langt mere almindelige.",
          "For korrekt maling skal placering af impulslinjer, sensormonteringsposition, nulpunktsjustering og temperatureffekter tages i betragtning. I gas- og vaeskelinjer kan taethedsforskelle eller kondensdannelse skabe ekstra hydrostatisk belastning pa sensoren. Derfor er installationsdetaljer lige sa afgorende for resultatet som selve instrumentvalget.",
        ],
      },
      {
        title: "Tryksensorer og manometre",
        paragraphs: [
          "Mekaniske manometre, som Bourdon-rormalere, omdanner tryk til en aflaselig visserbevaegelse via deformation af et elastisk element. Pa grund af deres robuste, enkle og energifri konstruktion har de vaeret i brug i industrien i lang tid. Men i anvendelser, der kraever hoj praecision og datalogning, er elektroniske sensorer mere fleksible.",
          "Elektroniske tryksensorer kan vaere piezoresistive, kapacitive, straekmaaler- eller resonansbaserede. Disse sensorer omdanner trykaendringer til elektriske signaler, der overfores til PLC-, SCADA- eller dataindsamlingssystemer. Dermed bliver ikke kun oejeblikkelig aflaesning mulig, men ogsa alarmering, styring og trendanalyse.",
          "Differensmanometre giver trykforskellen mellem to punkter, absolutte sensorer giver trykket i forhold til fuldstaendigt vakuum, og manometriske instrumenter giver trykket i forhold til atmosfaeren. Kun at se pa talvaerdien uden at bekraefte referencetypen i et instruments datablad kan fore til alvorlige fortolkningsfejl.",
        ],
      },
      {
        title: "Anvendelsesomrader for tryk i ingeniorfag",
        paragraphs: [
          "Tryk er en grundlaeggende designvariabel inden for mange ingeniorfelter, som rorlaegning, HVAC, hydraulik, pneumatik, kemisk procesindustri, kraftvaerker, vandforsyningssystemer, bilindustri og luftfart. Fra tankvaegtykkelse til ventilvalg, fra kompressorudlobsforhold til filterydelse, bygger mange beslutninger pa trykinformation.",
          "I procesteknik overvages trykgraenser for at sikre sikker drift af reaktorer, kedler, varmevekslere og separatorer. Tryksikkerhedsventiler, sprangskiver og kontrolsystemer er derfor kritisk udstyr. Tryk bruges ogsa til indirekte maling af andre procesvariabler, som debit og niveau.",
          "I maskin- og bygningsteknik knyttes tryk til spaendingsanalyser via kontaktflader og vaeskekraefter. I medicin og biomedicinsk udstyr er blodtryk, ventilationstryk og vakuumanvendelser centrale; i miljo og meteorologi er det atmosfaeriske og differenstrykmalinger, der star i fokus.",
        ],
      },
      {
        title: "Temperatur, hojde og usikkerhed i trykmaling",
        paragraphs: [
          "Temperatur kan pavirke bade egenskaberne af den vaeske, der males, og opforslen af selve sensorelementet. Saerligt for gasser aendrer temperaturaendringer taetheden, sa sammenhaengen mellem tryk, rumfang og temperatur skal revurderes. Datablade for sensorer indeholder derfor parametre som temperaturafhaengig nulpunktsforskydning og spaendforskydning.",
          "Nar hojden oeges, aftager atmosfaeretrykket saedvanligvis. Dette aendrer forholdet mellem manometrisk og absolut tryk og kan ogsa pavirke referenceopforslen af enkelte feltinstrumenter. Samme procesforhold kan give forskellige absolutte trykresultater ved forskellige hojder over havet.",
          "Enhver maling har en usikkerhed. Kalibreringsstandard, oploesning, hysterese, temperatureffekt, monteringsretning, vibration og langsigtet drift bidrager alle til den samlede usikkerhed. I kritiske anvendelser bor ikke kun den nominelle trykvaerdi, men ogsa instrumentklasse og malepalidelighed tages med i designbeslutningen.",
        ],
      },
      {
        title: "Forholdet og forskellen mellem tryk og spaending",
        paragraphs: [
          "Tryk og spaending har samme dimensionsstruktur, og begge kan udtrykkes i pascal. Denne lighed skyldes, at begge repraesenterer en krafteffekt per arealenhed. Men dette betyder ikke, at de fysisk set er helt samme storrelse.",
          "Tryk opfattes for det meste som en isotrop normalspaending pafort af vaesker; det vil sige, at trykket pa samme punkt i en stillestaende vaeske er ens i alle retninger. Spaending i fast-stof-mekanik kan derimod indeholde bade normal- og skaerkomponenter, er retningsafhaengig og har en tensorstruktur.",
          "At overse denne sondring kan fore til fejlfortolkning saerligt i beregninger af beholdervaeg, pakningsflade eller materialestyrke. Det indre tryk af en vaeske skaber ring- og aksialspaendinger i en beholder; men spaendingsfeltet i beholdermaterialet er ikke det samme som selve vaesketrykket.",
        ],
      },
      {
        title: "Almindelige fejl i trykberegning",
        paragraphs: [
          "Den mest almindelige fejl er at forveksle manometrisk tryk med absolut tryk. Saerligt i gaslove, taethedsberegninger og vakuumanvendelser kan den manometriske vaerdi pa et manometer bruges direkte, nar absolut tryk egentlig kraeves. Dette skaber en systematisk fejl i resultatet.",
          "En anden fejl er at afrunde omregningskoefficienter eller bruge forkert enhedsreference. Ved omregning mellem PSI, bar, atm, mmHg og kPa skal man afgore, hvilket praecisionsniveau de tilnaermede vaerdier er tilstraekkelige til. Hvis instrumentkalibreringen kraever hoj praecision, kan mangelfuld cifferbrug skabe problemer.",
          "At overse hydrostatiske effekter, ignorere sensorens monteringshojde og undlade at tage hojde for temperatureffekten er ogsa almindeligt. Saerligt i vaeskefyldte impulslinjer, lukkede tanke og differenstrykanvendelser kan tilsyneladende sma installationsdetaljer aendre maleresultatet betydeligt.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Videnskabelige og ingeniormaessige beregninger" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Rorsystemer, daek og procestryk" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Metrisk, uden for SI", commonUse: "Industri, kompressorer og procesanlaeg" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrisk, uden for SI", commonUse: "Meteorologi og atmosfaeriske malinger" },
      { name: "Standardatmosfaere", symbol: "atm", referenceValue: "101 325 Pa", system: "Uden for SI", commonUse: "Atmosfaere og referenceforhold" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6894,757293 Pa", system: "Britisk/amerikansk", commonUse: "Daek, hydraulik og pneumatiske systemer" },
      { name: "Teknisk atmosfaere", symbol: "at", referenceValue: "98 066,5 Pa", system: "Uden for SI", commonUse: "Aeldre tekniske og ingeniorfaglige anvendelser" },
      { name: "Millimeter kviksolv", symbol: "mmHg", referenceValue: "≈ 133,322 Pa", system: "Uden for SI", commonUse: "Medicin, vakuum og trykmalinger" },
      { name: "Millimeter vandsojle", symbol: "mmH₂O", referenceValue: "≈ 9,80665 Pa", system: "Uden for SI", commonUse: "Lavtryks- og ventilationsmalinger" },
      { name: "Kilogram-kraft/kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Metrisk, uden for SI", commonUse: "Aeldre pumpe- og kedelmalere, servicehandbøger" },
    ],
  },
  {
    locale: "da",
    slug: "energi",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Omregn energienheder",
    description:
      "Omregn gratis og direkte mellem joule, kilokalorie, kWh og BTU; se formler og tabeller.",
    introduction: [
      "Energi er en grundlaeggende fysisk storrelse, der beskriver et systems evne til at udfore arbejde. I Det Internationale Enhedssystem er den afledte enhed for energi joule, og den fremkommer ved at multiplicere kraft med forskydning.",
      "I dagligdagen bruges meget forskellige energienheder: kilowattimer (kWh) pa elregninger, kalorier/kilokalorier i ernaering, BTU i opvarmningssystemer, therm i naturgasfakturering, og elektronvolt i partikelfysik.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Energi (arbejde)" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "SI-afledt enhed", value: "Joule" },
      { label: "SI-enhedssymbol", value: "J" },
      { label: "Definition af joule", value: "1 J = 1 newtons kraft over 1 meters forskydning (1 N·m)" },
    ],
    sections: [
      {
        title: "Hvad er energi?",
        paragraphs: [
          "Energi er evnen, et legeme eller system har til at udfore arbejde. Den kan optraede i mange former, som kinetisk energi (bevaegelse), potentiel energi (position), varmeenergi, kemisk energi og elektrisk energi; ifolge loven om bevarelse af energi kan den omdannes fra en form til en anden, men den samlede maengde kan hverken opsta af intet eller forsvinde.",
          "Energi er en afledt storrelse; den fremkommer ved at multiplicere kraft med forskydning (arbejde), og SI-dimensionen angives som ML²T⁻² (masse × laengde i anden / tid i anden).",
        ],
      },
      {
        title: "SI-enheden for energi: joule",
        paragraphs: [
          "Joule er SI-enheden for energi og betegnes med symbolet J; den er opkaldt efter den britiske fysiker James Prescott Joule fra 1800-tallet. En joule svarer til den energi, der kraeves for at flytte et legeme 1 meter med en kraft pa 1 newton.",
          "Fordi joule er ret lille til at udtrykke mange energimaengder i dagligdagen, foretraekkes ofte multipla som kilojoule (tusind joule) og megajoule (en million joule) i ingenior- og dagligbrug.",
        ],
      },
      {
        title: "Kilowattime: enheden pa elregningen",
        paragraphs: [
          "Kilowattime (kWh) er den energimaengde, der forbruges, nar en effekt pa 1 kilowatt bruges i 1 time, og den er standardenheden for elfakturering verden over. 1 kWh svarer noejagtigt til 3 600 000 joule (3,6 megajoule).",
          "For at beregne energiforbruget af et elektrisk apparat er det nok at multiplicere effekten (watt) med brugstiden (timer); for eksempel forbruger et apparat pa 2000 watt 6 kWh energi, hvis det korer i 3 timer.",
        ],
      },
      {
        title: "Kalorie og kilokalorie: energi i ernaering",
        paragraphs: [
          "Kalorie blev oprindeligt defineret som den energimaengde, der kraeves for at haeve temperaturen af 1 gram vand med 1 °C, og 1 kalorie svarer noejagtigt til 4,184 joule.",
          "'Kalorie'-vaerdien, man ser pa madvareetiketter, er i videnskabelig forstand egentlig kilokalorie (1000 kalorier) -- denne konvention i ernaeringsvidenskaben (at skrive 'Kalorie' med stort forbogstav) skaber ofte forvirring; nar det star, at en fodevare indeholder '200 kalorier', menes der egentlig 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU og therm: energi i opvarmning og naturgas",
        paragraphs: [
          "BTU (British Thermal Unit) er den energimaengde, der kraeves for at haeve temperaturen af 1 pund vand med 1 °F, og den bruges -- oprindeligt fra USA, men nu udbredt over hele verden -- til at angive kapaciteten af opvarmnings-/kolesystemer (klimaanlaeg, varmtvandsbeholdere). 1 BTU svarer til omkring 1055,06 joule.",
          "Therm er en stor energienhed brugt i naturgasfakturering og svarer noejagtigt til 100 000 BTU. I enkelte lande faktureres naturgasforbrug direkte i therm i stedet for kubikmeter.",
        ],
      },
      {
        title: "Elektronvolt: enheden i den subatomaere verden",
        paragraphs: [
          "Elektronvolt (eV) beskriver den kinetiske energi, et elektron far, nar det bevaeger sig gennem en potentialforskel pa 1 volt, og det er en ekstremt lille energienhed (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "I partikelfysik og atomfysik udtrykkes energier saedvanligvis i elektronvolt (og dets multipla keV, MeV, GeV) i stedet for joule, fordi joule pa denne skala giver ekstremt sma og upraktiske tal.",
        ],
      },
      {
        title: "Princippet om bevarelse af energi",
        paragraphs: [
          "Ifolge princippet om bevarelse af energi, ogsa kendt som termodynamikkens forste lov, forbliver den samlede energi i et lukket system konstant; energi kan hverken skabes eller odelaegges, kun omdannes fra en form til en anden.",
          "For eksempel omdannes kemisk energi (braendstof) i en bilmotor forst til varmeenergi og derefter til mekanisk energi (bevaegelse); selvom noget af energien i denne proces gar tabt som ubrugelig varme via friktion og udstodning, forbliver den samlede energimaengde uaendret.",
        ],
      },
      {
        title: "Hvorfor er omregning mellem energienheder vigtig?",
        paragraphs: [
          "Forskellige brancher foretraekker traditionelt forskellige energienheder: elektroteknik bruger kilowattime, ernaeringsvidenskab kilokalorie, HVAC-branchen BTU, og naturgasbranchen therm. Korrekt omregning mellem disse forskellige enheder er afgorende for energieffektivitetssammenligninger og omkostningsberegninger.",
          "For at sammenligne effektiviteten af en varmepumpe med en naturgaskedel skal man for eksempel omregne begges energiforbrug til en faelles enhed (saedvanligvis kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Videnskabelige og fysiske energiberegninger" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrisk", commonUse: "Madenergi (i enkelte lande)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrisk", commonUse: "Braendstof og store energimaengder" },
      { name: "Kalorie", symbol: "cal", referenceValue: "4,184 J", system: "Metrisk (traditionel)", commonUse: "Ernaering og kemi" },
      { name: "Kilokalorie", symbol: "kcal", referenceValue: "4184 J", system: "Metrisk (traditionel)", commonUse: "Madvareetiketter ('kalorier')" },
      { name: "Wattime", symbol: "Wh", referenceValue: "3600 J", system: "Metrisk (elektrisk)", commonUse: "Energiforbrug for sma apparater" },
      { name: "Kilowattime", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrisk (elektrisk)", commonUse: "Elfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britisk/amerikansk", commonUse: "Klima- og opvarmningskapacitet" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britisk/amerikansk", commonUse: "Naturgasfakturering" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikelfysik", commonUse: "Atomaer og nuklear energimaling" },
    ],
  },
  {
    locale: "da",
    slug: "datalagring",
    sourceSlug: "veri",
    category: "veri",
    title: "Omregn datalagringsenheder",
    description:
      "Omregn gratis og direkte mellem byte, kilobyte, megabyte og gigabyte; se formler og tabeller.",
    introduction: [
      "Dataenheden beskriver maengden af information, der er lagret eller behandlet i et computersystem. Den mest grundlaeggende enhed er bitten; otte bit tilsammen udgor en byte.",
      "Nar man taler om lagring og internethastighed, bruges bade decimale (1000-baserede) enheder som kilobyte, megabyte, gigabyte og terabyte, samt binaere (1024-baserede) enheder, som styresystemer bruger, som kibibyte, mebibyte og gibibyte -- forskellen mellem disse to systemer er hovedgrunden til, at en kobt disk kan virke 'mindre' end forventet.",
    ],
    facts: [
      { label: "Mindste enhed", value: "Bit (0 eller 1)" },
      { label: "Grundenhed", value: "Byte = 8 bit" },
      { label: "Decimalt (SI) system", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binaert (IEC) system", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Forskellen mellem 1000 og 1024", value: "≈ 7,4 % forskel mellem 1 GB (decimal) og 1 GiB (binaer)" },
    ],
    sections: [
      {
        title: "Hvad er bit og byte?",
        paragraphs: [
          "Bit (binary digit) er den mindste informationsenhed, en computer kan behandle, og kan kun have to vaerdier: 0 eller 1. Otte bit udgor en byte; en byte kan repraesentere 256 (2⁸) forskellige vaerdier -- tilstraekkeligt til for eksempel at kode et tegn i en tekst.",
          "Bit forkortes saedvanligvis med lille 'b', og byte med stort 'B'; denne sondring kan saerligt skabe forvirring mellem internethastigheder (Mbps = megabit per sekund) og filstorrelser (MB = megabyte) -- en internetforbindelse pa 100 Mbps svarer i teorien til en downloadhastighed pa omkring 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Hvorfor findes der to forskellige enhedssystemer?",
        paragraphs: [
          "Fordi computere arbejder i det binaere system, er hukommelsesadressering naturligt knyttet til potenser af 2 (som 1024, 1048576). Derfor har softwareverdenen historisk ment 1024 byte, nar man har sagt 'kilobyte'.",
          "Diskproducenter foretraekker derimod det decimale (1000-baserede) SI-praefiks af markedsforings- og beregningshensyn -- en disk, en producent kalder '1 TB', er i realiteten noejagtigt 1 000 000 000 000 byte, men fordi styresystemet regner ud fra base 1024, viser skaermen et mindre tal som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "For at rydde op i denne forvirring standardiserede Den Internationale Elektrotekniske Kommission (IEC) i 1998 separate navne (kibibyte, mebibyte, gibibyte, tebibyte) og symboler (KiB, MiB, GiB, TiB) for binaerbaserede enheder.",
          "Ifolge denne standard bor traditionelle praefikser som KB/MB/GB kun bruges i 1000-baseret (decimal) betydning, mens 'binaere' praefikser som KiB/MiB/GiB bor bruges til 1024-baserede vaerdier. I dagligbrug og i meget software er denne sondring dog stadig ikke konsekvent anvendt.",
        ],
      },
      {
        title: "Hvorfor oeges forskellen mellem 1000 og 1024?",
        paragraphs: [
          "Pa kilobyte-niveau (1000 mod 1024) er forskellen kun 2,4 %, men denne forskel oeges for hver hoejere enhed: pa megabyte-niveau ≈ 4,9 %, pa gigabyte-niveau ≈ 7,4 %, og pa terabyte-niveau nar den 10 %.",
          "Derfor bliver forskellen mellem decimal og binaer beregning ved store lagringskapaciteter (som en disk pa 1 TB) sa stor, at brugeren maerkbart oplever at have 'mindre plads' end forventet (omkring 90 GB forskel).",
        ],
      },
      {
        title: "Bitbaserede dataenheder: kilobit, megabit, gigabit",
        paragraphs: [
          "Internetudbydere udtrykker saedvanligvis forbindelseshastighed med bitbaserede enheder (kilobit/sekund, megabit/sekund, gigabit/sekund); dette er en historisk tradition inden for netvaerksteknik.",
          "Da brugere ofte forventer downloadhastigheden i byte (MB/sekund), kan det at ikke vide, at en '100 Mbps'-forbindelse faktisk giver en downloadhastighed pa omkring 12,5 MB/sekund, fore til en fejlagtig opfattelse af, at forbindelsen er 'langsom'.",
        ],
      },
      {
        title: "Datastorrelser i dagligdagen",
        paragraphs: [
          "Et tekstdokument (en side) er typisk nogle fa kilobyte, et komprimeret fotografi (JPEG) nogle fa megabyte, og en komprimeret musikfil (MP3) i gennemsnit 3-5 megabyte.",
          "En film i standardoploesning (HD) kan fylde omkring 1-4 gigabyte, mens en film i 4K-oploesning kan fylde 15-25 gigabyte; disse forskelle varierer afhaengigt af oploesning og komprimeringsmetode.",
        ],
      },
      {
        title: "Historien om dataenheden",
        paragraphs: [
          "Den forste harddisk, IBM lancerede i 1956 (RAMAC 305), havde en kapacitet pa omkring 3,75 megabyte og var stor nok til at fylde et rum. I dag kan et microSD-kort rumme millioner gange denne kapacitet i handfladestorrelse.",
          "Denne enorme kapacitetsstigning haenger taet sammen bade med fremskridt inden for lagringsteknologi (som overgangen fra magnetiske diske til flashhukommelse) og med den kontinuerlige nedgang i omkostning per enhed.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binaer", commonUse: "Netvaerkshastighed (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grundenhed", commonUse: "Grundlaeggende enhed for filstorrelse" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimal (SI)", commonUse: "Tekstdokumenter" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binaer (IEC)", commonUse: "Hukommelsesvisning i styresystem" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Decimal (SI)", commonUse: "Billed- og musikfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binaer (IEC)", commonUse: "RAM-kapacitet (hukommelse)" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Decimal (SI)", commonUse: "Diskkapacitet (producentmaerkning)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binaer (IEC)", commonUse: "Diskvisning i styresystem" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1 000 000 000 000 byte", system: "Decimal (SI)", commonUse: "Storvolumenlagring" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1 000 000 000 000 000 byte", system: "Decimal (SI)", commonUse: "Datacenter- og skylagring" },
    ],
  },
  {
    locale: "da",
    slug: "elektricitet",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Omregn elektriske enheder",
    description:
      "Omregn gratis og direkte mellem volt, kilovolt, ampere og milliampere; se formler og tabeller.",
    introduction: [
      "Elektricitet er et bredt fagomrade bestaende af storrelser, der er beslaegtede, men alligevel forskellige: spaending (potentialforskel) og strom (ladningsstrom). Denne kategori samler de to grundlaeggende storrelser, man oftest moder i dagligt elektrisk arbejde -- volt (spaending) og ampere (strom).",
      "Spaending og strom er ikke samme fysiske storrelse, og de kan ikke omregnes direkte til hinanden; forholdet mellem dem etableres af Ohms lov (V = I × R), afhaengigt af modstanden i kredslobet. Omregningerne pa denne side behandler hver storrelse for sig (volt-kilovolt, ampere-milliampere).",
    ],
    facts: [
      { label: "Navnet pa spaendingsenheden", value: "Volt (efter Alessandro Volta)" },
      { label: "Navnet pa stromenheden", value: "Ampere (efter André-Marie Ampère)" },
      { label: "SI-grundenhed (strom)", value: "Ampere (A) -- en af SIs 7 grundenheder" },
      { label: "Forholdet mellem spaending, strom og modstand", value: "Ohms lov: V = I × R" },
      { label: "Netspaending i Danmark", value: "230 V (enfase), 400 V (trefase)" },
    ],
    sections: [
      {
        title: "Hvad er spaending (volt)?",
        paragraphs: [
          "Spaending beskriver den elektriske potentialforskel mellem to punkter i et elektrisk kredslob, og kan taenkes pa som den 'drivende kraft', der far elektroner til at stromme fra et punkt til et andet. SI-enheden er volt (V).",
          "Enheden volt er opkaldt efter den italienske fysiker Alessandro Volta, som opfandt det elektriske batteri. Vaerdier som '1,5 V' eller '9 V' pa et batteri angiver den potentialforskel, batteriet kan levere.",
        ],
      },
      {
        title: "Hvad er strom (ampere)?",
        paragraphs: [
          "Elektrisk strom beskriver maengden af elektrisk ladning, der passerer gennem en leder per tidsenhed, og SI-enheden er ampere (A). En ampere svarer til omkring 6,242 × 10¹⁸ elektroner, der passerer et punkt per sekund.",
          "Enheden ampere er opkaldt efter den franske fysiker André-Marie Ampère, en af grundlaeggerne af elektromagnetismen. Fore SI-revisionen i 2019 var ampere en af SIs grundenheder; den regnes stadig for en grundlaeggende storrelse, men defineres nu ud fra den elementaere elektriske ladningskonstant (e).",
        ],
      },
      {
        title: "Hvorfor kan spaending og strom ikke omregnes til hinanden?",
        paragraphs: [
          "Spaending (V) og strom (A) er forskellige fysiske storrelser -- den ene udtrykker potentialforskel, den anden ladningsstromningshastighed. Derfor har sporgsmalet 'hvor mange ampere svarer X volt til' alene ikke noget svar uden at kende modstanden (eller effekten) i kredslobet.",
          "Forholdet mellem de to etableres af Ohms lov: V = I × R (spaending = strom × modstand). For eksempel skaber en spaending pa 12 volt gennem en modstand pa 4 ohm en strom pa 3 ampere; men de samme 12 volt giver en helt anden strom ved en anden modstand.",
        ],
      },
      {
        title: "Sammenhaengen mellem effekt, spaending og strom",
        paragraphs: [
          "Elektrisk effekt (watt) er lig produktet af spaending og strom: P = V × I. Denne formel viser, at et apparat med samme effekt traekker lavere strom ved hoj spaending, og hoejere strom ved lav spaending.",
          "Dette forhold forklarer, hvorfor elektriske distributionsnet arbejder med hoej spaending: at overfore samme effekt med lavere strom reducerer betydeligt energitabet (Joule-opvarmning), der skyldes modstand i overforingslinjerne.",
        ],
      },
      {
        title: "Netspaending i Danmark og verden",
        paragraphs: [
          "I Danmark er standard netspaending i boliginstallationer 230 V, og for trefasesystemer, der bruges i industrielle og kommercielle installationer, 400 V, med en frekvens pa 50 Hz.",
          "Netspaendingen varierer fra land til land i verden; lande som USA og Canada bruger 120 volt, mens det meste af Europa, deriblandt Danmark, foretraekker 230 volt. Denne forskel er hovedgrunden til, at elektriske apparater medbragt fra udlandet ikke kan bruges direkte uden en omformer.",
        ],
      },
      {
        title: "Jaevnstrom (DC) og vekselstrom (AC)",
        paragraphs: [
          "I jaevnstrom (DC) stromer elektronerne konstant i en retning -- batterier og solceller producerer DC. I vekselstrom (AC) skifter derimod stromretningen med en bestemt frekvens per sekund (50 Hz i Danmark, altsa 50 gange per sekund) -- netstrommen er AC.",
          "Hovedgrunden til, at AC foretraekkes i netdistribution, er, at transformatorer nemt kan haeve og saenke spaendingen; dette gor det muligt at overfore elektricitet over lange afstande med lavt tab.",
        ],
      },
      {
        title: "Elektrisk stroms virkning pa menneskekroppen",
        paragraphs: [
          "Storrelsen af den strom, der gar gennem menneskekroppen, afgor, hvilken effekt man maerker: omkring 1 milliampere maerkes svagt, 10-20 milliampere kan give muskelsammentraekning (manglende evne til at slippe taget), og over 100 milliampere kan fore til hjerterytmeforstyrrelse (fibrillering) og dod.",
          "Derfor er det ikke kun spaendingen, men ogsa storrelsen af den strom, der kan opsta i kredslobet, der er afgorende for elektrisk sikkerhed -- selv i lavspaendte, men lavohmige (for eksempel fugtige) omgivelser kan der opsta farligt hoj strom.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrisk", commonUse: "Sensor- og bioelektriske signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batteri-, net- og kredslobsspaending" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrisk", commonUse: "Hoejspaendte overforingslinjer" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrisk", commonUse: "Elektroniske kredslobsstromme" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Boliginstallation og apparatstrom" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrisk", commonUse: "Kortslutnings- og industristromme" },
    ],
  },
  {
    locale: "da",
    slug: "guldkarat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Omregn guldkarat",
    description:
      "Omregn gratis og direkte mellem 24, 22, 18 og 14 karat guld; se formler og tabeller.",
    introduction: [
      "Guld bruges naesten aldrig i ren form til smykker og guldvarer -- fordi det er et meget blodt og let ridset metal, blandes det med metaller som solv og kobber til en legering. Karat (guldkarat) er malet, der viser andelen af rent guld i denne legering.",
      "Skalaen gar over 24: 24 karat betyder helt rent guld (100 %), mens 22 karat betyder, at 22/24 (omkring 91,6 %) af legeringen er rent guld. Omregningen her beregner gramaekvivalenten mellem guld af forskellig karat baseret pa indholdet af rent guld -- det vil sige, ikke 'at udtrykke samme fysiske storrelse med en anden enhed', men 'at finde den tilsvarende vaerdi af samme legering ved forskellig renhedsgrad'.",
    ],
    facts: [
      { label: "Malesystem", value: "Guldsmedstandard for renhed (karat)" },
      { label: "Grundreference", value: "24 karat = 100 % rent guld" },
      { label: "Mest almindelige karat i Tyrkiet", value: "22 karat (armbaand, traditionelle smykker)" },
      { label: "International dagligbrug", value: "18 karat (ring, kaede)" },
      { label: "Beregningslogik", value: "Gram × (kildekarat / 24) ÷ (malkarat / 24)" },
    ],
    sections: [
      {
        title: "Hvad maler karat egentlig?",
        paragraphs: [
          "Karat viser, hvor meget af vaegten af et guldstykke der faktisk er guld. 24 karat er rent guld; 22, 18 og 14 karat er guld, der er blandet med henholdsvis solv/kobber i stigende grad, og dermed hardere og mindre rent.",
          "Derfor kan vi sige, at et armbaand pa 22 karat har et lidt 'lettere' indhold af rent guld end 24 karat, men er mere holdbart -- dette er grunden til, at guldsmede ofte foretraekker 22 karat til armbaand, og gerne 18 karat til ringe/kaeder.",
        ],
      },
      {
        title: "Hvordan beregnes indholdet af rent guld?",
        paragraphs: [
          "For at finde maengden af rent guld i et armbaand pa 10 gram, 22 karat: 10 × (22 / 24) = 9,17 gram svarer til rent (24-karats ekvivalent) guld. De resterende omkring 0,83 gram er andre metaller tilfojet for holdbarhed.",
          "Omvendt: hvis en guldsmed skulle smelte disse 9,17 gram rent guld om til 18 karat, ville han fa: 9,17 ÷ (18 / 24) = 12,22 gram total legering -- fordi andelen af rent guld er lavere ved 18 karat, fordeler samme maengde rent guld sig over en storre totalvaegt.",
        ],
      },
      {
        title: "Hvilken karat bruges til hvad?",
        paragraphs: [
          "24 karat bruges naesten aldrig i dagligsmykker pa grund af blodheden; det foretraekkes hovedsageligt til guldbarrer og investeringsprodukter. 22 karat er standarden for armbaand og traditionelle smykker i Tyrkiet og Mellemosten.",
          "18 karat er udbredt over hele verden i dagligbrugssmykker som diamantringe og kaeder, da det har hoej holdbarhed. 14 karat er mere okonomisk og endnu mere holdbart, og er saerligt almindeligt pa det amerikanske og europaeiske marked.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat guld", symbol: "24K", referenceValue: "100 % rent guld", system: "Guldsmedstandard", commonUse: "Guldbarrer, investeringsguld" },
      { name: "22 karat guld", symbol: "22K", referenceValue: "91,6 % rent guld (22/24)", system: "Guldsmedstandard", commonUse: "Armbaand, traditionelle smykker" },
      { name: "18 karat guld", symbol: "18K", referenceValue: "75 % rent guld (18/24)", system: "Guldsmedstandard", commonUse: "Ring, kaede, dagligsmykker" },
      { name: "14 karat guld", symbol: "14K", referenceValue: "58,3 % rent guld (14/24)", system: "Guldsmedstandard", commonUse: "Okonomiske smykker, USA/Europa-markedet" },
    ],
  },
  {
    locale: "da",
    slug: "solvindhold",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omregn solvindhold",
    description:
      "Omregn gratis og direkte mellem 999, 925, 900 og 800 solv; se formler og tabeller.",
    introduction: [
      "Solv bruges, ligesom guld, naesten aldrig i ren form til smykker eller genstande -- fordi det er et blodt metal, blandes det med andre metaller som kobber til en legering. Millesimal (finhed i tusindedele) er malet, der viser andelen af rent solv i denne legering.",
      "I modsaetning til guldkarat udtrykkes solvrenhed ikke over 24, men over 1000 (i tusindedele): 999 er naesten fuldstaendig rent solv, mens 925 er den mest udbredte smykkestandard i verden, kendt som 'sterlingsolv'.",
    ],
    facts: [
      { label: "Malesystem", value: "Millesimalsystem (finhed i tusindedele)" },
      { label: "Grundreference", value: "999 = 99,9 % rent solv" },
      { label: "Mest udbredte smykkestandard i verden", value: "925 (sterlingsolv)" },
      { label: "Solv til barrer/investering", value: "999 finhed (fine silver)" },
      { label: "Beregningslogik", value: "Gram × (kildefinhed / 1000) ÷ (malfinhed / 1000)" },
    ],
    sections: [
      {
        title: "Hvad maler solvfinheden (millesimal) egentlig?",
        paragraphs: [
          "I modsaetning til guld udtrykkes solvrenhed ikke over 24 enheder, men i tusindedele (millesimal, over 1000). 999 finhed betyder, at 999 af 1000 dele (altsa 99,9 %) af legeringen er rent solv; den resterende ene del er som regel sporstoffer af andre grundstoffer.",
          "925 finhed (sterlingsolv) betyder, at 92,5 % af legeringen er rent solv, og de resterende 7,5 % som regel er kobber. Denne lille maengde kobber giver det rene solv, som ellers er meget blodt og let deformerbart, oeget holdbarhed.",
        ],
      },
      {
        title: "Hvorfor er sterlingsolv (925) verdensstandarden?",
        paragraphs: [
          "925 finhed sterlingsolv-standarden har rodder helt tilbage til 1100-tallet i England, og er over tid blevet den mest accepterede standard verden over til produktion af smykker, bestik og solvtoj.",
          "Rent solv (999) er for blodt og let at ridse til daglig brug; at tilfoje omkring 7,5 % kobber giver solvet tilstraekkelig hardhed, samtidig med at det i vid udstraekning bevarer solvets karakteristiske glans og farve.",
        ],
      },
      {
        title: "Forskellene mellem 999, 900 og 800 finhed solv",
        paragraphs: [
          "999 finhed (fine silver/rent solv) foretraekkes til barrer og investeringsprodukter i solv, fordi renhedsgraden er det vigtigste kriterium for investorer; men pa grund af blodheden bruges det sjaeldent i dagligsmykker.",
          "900 finhed (coin silver) er historisk brugt i solvmonter i mange lande. 800 finhed er en smykkestandard, der saerligt er udbredt i Europa (som Tyskland og Ostrig) og har lavere renhed end sterlingsolv, men er alligevel holdbar.",
        ],
      },
      {
        title: "Hvordan beregnes indholdet af rent solv?",
        paragraphs: [
          "For at finde maengden af rent solv i en solvring pa 10 gram, 925 finhed: 10 × (925 / 1000) = 9,25 gram rent solv. De resterende 0,75 gram er kobber eller andre metaller tilfojet for holdbarhed.",
          "Samme logik bruges ved omregning mellem forskellige finheder: hvis maengden af rent solv i en legering pa 925 finhed er kendt, finder man 999-finhedsekvivalenten ved at dividere maengden af rent solv med 999/1000.",
        ],
      },
      {
        title: "Sammenhaengen mellem anloebning og renhed i solv",
        paragraphs: [
          "At solvsmykker anloeber (mister glansen) over tid, skyldes ikke solvet selv, men at kobberet i legeringen reagerer med svovlforbindelser i luften. Derfor har solv med hoejere renhed (som 999) mindre tendens til at anloebe.",
          "Enkelte producenter har udviklet 'anloebningsbestandige' sterlingsolvlegeringer for at forbedre denne egenskab, ved at bruge andre tilsaetningsstoffer, som germanium, i stedet for kobber.",
        ],
      },
    ],
    unitTable: [
      { name: "999 finhed solv", symbol: "999", referenceValue: "99,9 % rent solv", system: "Guldsmedstandard", commonUse: "Barrer, investeringssolv" },
      { name: "925 finhed solv", symbol: "925", referenceValue: "92,5 % rent solv (sterling)", system: "Guldsmedstandard", commonUse: "Smykker og bestik (verdensstandard)" },
      { name: "900 finhed solv", symbol: "900", referenceValue: "90 % rent solv", system: "Guldsmedstandard", commonUse: "Historiske solvmonter" },
      { name: "800 finhed solv", symbol: "800", referenceValue: "80 % rent solv", system: "Guldsmedstandard (Europa)", commonUse: "Europaeisk smykkestandard" },
    ],
  },
];

export function findDanishCategoryPage(slug: string) {
  return danishCategoryPages.find((page) => page.slug === slug);
}

export function findDanishCategoryPageByTurkishSlug(sourceSlug: string) {
  return danishCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
