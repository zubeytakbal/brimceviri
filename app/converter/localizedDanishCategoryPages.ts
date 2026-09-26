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
    title: "Omregn længdeenheder",
    description:
      "Omregn gratis og direkte mellem meter, kilometer, centimeter, mil og fod; se formler og tabeller.",
    introduction: [
      "Længde er den fysiske størrelse, der beskriver afstanden mellem to punkter eller udstrækningen af et objekt i en bestemt retning. I videnskabelige målinger er meter grundenheden for længde i Det Internationale Enhedssystem (SI).",
      "I dagligdagen og i videnskabeligt arbejde bruges forskellige længdeenheder -- som nanometer, mikrometer, millimeter, centimeter, meter og kilometer -- afhængigt af størrelsen af den afstand, der måles.",
      "Enheder uden for det metriske system, som tommer, fod, yard og mil, bruges stadig, særligt i forbindelse med USA og Storbritannien.",
    ],
    facts: [
      { label: "SI-grundenhed", value: "Meter" },
      { label: "SI-enhedssymbol", value: "m" },
      { label: "Fysisk størrelse", value: "Længde" },
      { label: "Dimensionssymbol", value: "L" },
      { label: "Gældende meterdefinition", value: "Afstanden lyset tilbagelægger i vakuum på 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Hvad er længde?",
        paragraphs: [
          "Længde er en af de grundlæggende fysiske størrelser, der bruges til at beskrive højden, bredden, tykkelsen af et objekt eller afstanden mellem to punkter. Afhængigt af måleretningen kan et og samme objekt have flere forskellige længdeværdier.",
          "I fysik betegnes længde sædvanligvis med dimensionssymbolet L. Længdedimensionen bruges til at definere mange afledte størrelser, som areal, rumfang, hastighed, acceleration, tryk og densitet.",
        ],
      },
      {
        title: "SI-enheden for længde",
        paragraphs: [
          "I Det Internationale Enhedssystem er grundenheden for længde meter, som betegnes med symbolet m. Meter er referencen, der bruges til at definere alle andre længdeenheder.",
          "Metriske enheder som kilometer, centimeter, millimeter, mikrometer og nanometer er knyttet til meteren gennem decimale multipla og delenheder. Denne struktur gør, at omregning mellem metriske enheder kan foretages ved hjælp af titalspotenser.",
        ],
      },
      {
        title: "Den videnskabelige definition af meteren",
        paragraphs: [
          "Meteren blev tidligere defineret ud fra jordens dimensioner og fysiske målestave. Efterhånden som måleteknologien udviklede sig, opstod behovet for en mere stabil definition, der kunne reproduceres overalt i verden.",
          "I dag defineres en meter som den længde, lyset tilbagelægger i vakuum i et tidsinterval på 1/299 792 458 sekund. Denne definition bygger på, at lysets hastighed i vakuum er fastsat til nøjagtigt 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "Metriske længdeenheder",
        paragraphs: [
          "I det metriske system er enhederne knyttet til meteren gennem positive eller negative potenser af tallet 10. En kilometer svarer til 1000 meter, en centimeter svarer til 0,01 meter, og en millimeter svarer til 0,001 meter.",
          "For meget små længder bruges mikrometer, nanometer og pikometer. Celler måles ofte i mikrometer, lysbølgelængder i nanometer, og visse afstande på atomart niveau kan udtrykkes i pikometer.",
        ],
      },
      {
        title: "Længdeenheder uden for det metriske system",
        paragraphs: [
          "Tommer, fod, yard og engelsk mil er almindelige længdeenheder uden for det metriske system. Disse enheder bruges særligt i det amerikanske målesystem og visse praksisser knyttet til britisk måletradition.",
          "En tomme svarer nøjagtigt til 2,54 centimeter, en fod svarer til 12 tommer, og en yard svarer til 3 fod. En engelsk mil er defineret til nøjagtigt 1609,344 meter.",
        ],
      },
      {
        title: "Længde inden for søfart og luftfart",
        paragraphs: [
          "Inden for søfart og luftfart udtrykkes afstande sædvanligvis i sominil. En sømil svarer nøjagtigt til 1852 meter.",
          "Sømilen er udviklet ud fra en historisk måletilgang knyttet til jordens geografiske koordinater. Fartsenheden knob betyder også sominil per time.",
        ],
      },
      {
        title: "Hvordan måles længde?",
        paragraphs: [
          "I hverdagsmålinger bruges værktøjer som lineal, målebånd, skydelære og mikrometer. Præcisionen af måleredskabet vælges ud fra størrelsen af det objekt, der måles, og det nøjagtighedsniveau, der kræves.",
          "I ingeniør- og forskningssammenhæng kan laserafstandsmålere, koordinatmålemaskiner, interferometre og forskellige optiske målesystemer anvendes.",
        ],
      },
      {
        title: "Målenøjagtighed og usikkerhed",
        paragraphs: [
          "Ingen fysisk måling er absolut fejlfri. Der er altid en vis usikkerhed i måleresultatet, som skyldes instrumentets opløsning, kalibrering, miljøforhold og den anvendte metode.",
          "Derfor bør ikke kun den målte værdi, men også måleusikkerheden og den anvendte enhed angives i videnskabelige resultater. Særligt i præcist ingeniørarbejde kan selv temperaturændringer påvirke længden af et materiale.",
        ],
      },
      {
        title: "Hvordan omregnes længdeenheder?",
        paragraphs: [
          "Ved omregning inden for samme målesystem bruges forholdet mellem enhederne. For eksempel divideres værdien med 1000 for at omregne meter til kilometer, og ganges med 1000 for at omregne kilometer til meter.",
          "Ved omregning mellem det metriske system og britiske eller amerikanske enheder skal man bruge definerede, nøjagtige omregningsfaktorer. For eksempel ganges værdien med 2,54 ved omregning fra tommer til centimeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrisk", commonUse: "Lysbølgelængde og nanoteknologi" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrisk", commonUse: "Celler, partikler og præcisionsproduktion" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrisk", commonUse: "Tekniske tegninger og små mål" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrisk", commonUse: "Måling af hverdagsgenstande" },
      { name: "Decimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrisk", commonUse: "Undervisning og enkelte rumfangsforhold" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grundlæggende længdemålinger" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metrisk", commonUse: "Vej- og geografiske afstande" },
      { name: "Tomme", symbol: "in", referenceValue: "0,0254 m", system: "Britisk/amerikansk", commonUse: "Skærme, rør og tekniske mål" },
      { name: "Fod", symbol: "ft", referenceValue: "0,3048 m", system: "Britisk/amerikansk", commonUse: "Højde, byggeri og luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britisk/amerikansk", commonUse: "Idrætsbaner og afstandsmålinger" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Britisk/amerikansk", commonUse: "Vejafstande" },
      { name: "Sømil", symbol: "nmi", referenceValue: "1852 m", system: "Søfart", commonUse: "Søfart og luftfart" },
    ],
  },
  {
    locale: "da",
    slug: "areal",
    sourceSlug: "alan",
    category: "alan",
    title: "Omregn arealenheder",
    description:
      "Omregn gratis og direkte mellem kvadratmeter, tønder land, hektar og kvadratfod; se formler og tabeller.",
    introduction: [
      "Areal er en afledt fysisk størrelse, der beskriver udstrækningen af en todimensional flade. Da det opstår ved at multiplicere en længdeenhed med samme længdeenhed, har areal altid dimensionen 'længde i anden' (L²).",
      "I Det Internationale Enhedssystem er den afledte enhed for areal kvadratmeter (m²). I landbrug og ejendomsmåling bruges også mål, tønder land og hektar; i det britiske/amerikanske system kvadratfod og acre; og i Sydasien lokale enheder som bigha, katha og decimal.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Areal" },
      { label: "Dimensionssymbol", value: "[L²]" },
      { label: "SI-afledt enhed", value: "Kvadratmeter" },
      { label: "SI-enhedssymbol", value: "m²" },
      { label: "Grundformel (rektangel)", value: "Areal = Længde × Bredde" },
    ],
    sections: [
      {
        title: "Hvad er areal?",
        paragraphs: [
          "Areal beskriver størrelsen af en flade eller et plant område. Hvor meget plads et jordstykke, gulvet i et rum eller et ark papir optager, måles i areal.",
          "Areal er en afledt størrelse; den fremkommer ved at multiplicere en grundlæggende længdeenhed med sig selv. Derfor angives SI-dimensionen for areal som L² (længde i anden), og areal er altid en positiv skalar størrelse.",
        ],
      },
      {
        title: "SI-enheden for areal: kvadratmeter",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for areal kvadratmeter (m²), som beskriver arealet af et kvadrat med sidelængde nøjagtigt 1 meter.",
          "Kvadratmeter er ikke en selvstændig grundenhed, men en afledt enhed, da den fremkommer ved at kvadrere længdeenheden (meter). Alle andre metriske arealenheder (som kvadratcentimeter og kvadratkilometer) er knyttet til kvadratmeter gennem titalspotenser.",
        ],
      },
      {
        title: "Hvorfor omregnes arealenheder med et kvadratisk forhold?",
        paragraphs: [
          "Når man omregner mellem længdeenheder, bruges forholdet direkte, men mellem arealenheder skal dette forhold kvadreres. For eksempel svarer 1 kilometer til 1000 meter, men 1 kvadratkilometer svarer ikke til 1000 kvadratmeter, men til 1000², altså 1 000 000 kvadratmeter.",
          "Dette skyldes, at begge dimensioner (længde og bredde) i en arealenhed vokser eller skrumper i samme forhold. At overse dette kvadratiske forhold er den mest almindelige regnefejl ved arealomregning -- for eksempel at tro, at '1 km² = 1000 m²'.",
        ],
      },
      {
        title: "Metriske arealenheder",
        paragraphs: [
          "I det metriske system bruges kvadratmillimeter og kvadratcentimeter til små arealer, kvadratmeter til hverdagsmålinger, og kvadratkilometer til store arealer. En kvadratcentimeter svarer til 0,0001 kvadratmeter, og en kvadratkilometer svarer til 1 000 000 kvadratmeter.",
          "Til ejendomsmåling bruges ar (100 m²) og hektar, som er 100 gange større (10 000 m²). Hektar er den mest brugte metriske arealenhed i verden til at beskrive landbrugsarealer.",
        ],
      },
      {
        title: "Målenheden donum/dekar i Tyrkiet",
        paragraphs: [
          "I Tyrkiet er donum og dekar de mest brugte enheder til at måle landbrugsareal; begge svarer i dag til 1000 kvadratmeter og kan bruges om hverandre. Dekar er det officielle navn i lovgivningen om mål og vægt, mens donum er den traditionelle betegnelse i daglig tale.",
          "Under det osmanniske rige kunne størrelsen af en donum variere fra 900 til 1600 m² afhængigt af region. Med måleloven af 1931 blev donum standardiseret til nøjagtigt 1000 m² ved at knytte den til dekar.",
        ],
      },
      {
        title: "Arealenheder i det britiske/amerikanske system",
        paragraphs: [
          "Kvadratfod (ft²) og kvadrattomme (in²) bruges til små flader, mens acre bruges til store jordstykker i det britiske/amerikanske målesystem. En acre svarer nøjagtigt til 4046,8564224 kvadratmeter.",
          "Den historiske oprindelse af acre er størrelsen af det jorde, et par okser kunne plojne på en dag. Den bruges stadig i ejendomsannoncer i USA, Storbritannien og enkelte samveldelande.",
        ],
      },
      {
        title: "Arealenheder i Sydasien",
        paragraphs: [
          "I lande som Indien, Bangladesh, Pakistan og Nepal bruges stadig lokale arealenheder som bigha, katha, killa, kanal, marla, guntha, biswa og decimal. Størrelsen af disse enheder kan variere betydeligt fra region til region, selv under samme navn.",
          "For eksempel svarer en bigha til omkring 1338 m² i Vestbengalen, mens den kan have en anden værdi i en anden delstat. Derfor er det vigtigt at bekræfte, hvilken regional standard der gælder ved ejendomstransaktioner med disse enheder.",
        ],
      },
      {
        title: "Hvordan beregnes areal?",
        paragraphs: [
          "For et rektangulært areal er formlen Areal = Længde × Bredde. For en trekant bruges Areal = (Grundlinje × Højde) / 2, og for en cirkel bruges Areal = π × Radius².",
          "For uregelmæssigt formede grunde finder man arealet ved at dele figuren op i mindre rektangler/trekanter og beregne arealet af hver del for sig (eller ved koordinatbaserede polygonformler i matrikelmålinger).",
        ],
      },
      {
        title: "Hvad skal man være opmærksom på ved arealmåling?",
        paragraphs: [
          "En arealværdi angivet i en ejendomsannonce eller et skøde skal fortolkes ud fra den anvendte enhed (m², donum, acre, bigha) og hvilken regional standard denne enhed er defineret efter.",
          "Særligt ved internationale ejendomstransaktioner undgår man misforståelser ved at se på den nøjagtige kvadratmeterværdi frem for navnelighed mellem enheder; omregningsværktøjet på denne side sammenligner alle enheder ud fra en fælles kvadratmeterreference.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrisk", commonUse: "Tekniske tegninger og små flader" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrisk", commonUse: "Overfladeareal for små genstande" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Bolig-, kontor- og grundareal" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metrisk", commonUse: "Små grundstykker" },
      { name: "Donum/Dekar", symbol: "donum", referenceValue: "1000 m²", system: "Tyrkiet (metrisk)", commonUse: "Måling af landbrugsareal" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metrisk", commonUse: "Store landbrugs- og skovarealer" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrisk", commonUse: "By-, lande- og geografiske arealer" },
      { name: "Kvadratfod", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britisk/amerikansk", commonUse: "Boligareal (USA/Storbritannien)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britisk/amerikansk", commonUse: "Idrætsbaner og tekstil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britisk/amerikansk", commonUse: "Store jordstykker" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierer efter region)", system: "Sydasien", commonUse: "Landbrugsareal i Indien/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Japansk bolig- og grundmåling" },
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
      "Rumfang er en afledt fysisk størrelse, der beskriver størrelsen af det rum, et tredimensionelt objekt eller en beholder optager eller kan rumme. Da det fremkommer ved at multiplicere en længdeenhed i tre dimensioner (længde × bredde × højde), har rumfang dimensionen L³ (længde i tredje).",
      "I Det Internationale Enhedssystem er den afledte enhed for rumfang kubikmeter (m³); i dagligdagen er liter og milliliter langt mere almindeligt. I køkkenet bruges traditionelle mål som spiseske, teske og kop, mens det amerikanske/britiske system bruger gallon, quart, pint og fluid ounce.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Rumfang" },
      { label: "Dimensionssymbol", value: "[L³]" },
      { label: "SI-afledt enhed", value: "Kubikmeter" },
      { label: "SI-enhedssymbol", value: "m³" },
      { label: "Mest brugte enhed i dagligdagen", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Hvad er rumfang?",
        paragraphs: [
          "Rumfang er størrelsen af det tredimensionelle rum, et objekt optager, eller en beholder kan rumme. Rumfanget af et fast objekt beskriver dets fysiske størrelse, mens rumfanget af en beholder beskriver, hvor meget væske eller gas den kan indeholde.",
          "Rumfang er en afledt størrelse; den fremkommer ved at multiplicere en længdeenhed i tre dimensioner (længde, bredde, højde). Derfor angives SI-dimensionen som L³.",
        ],
      },
      {
        title: "SI-enheden for rumfang: kubikmeter",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for rumfang kubikmeter (m³), som beskriver det indre rumfang af en kube, hvor hver side er nøjagtigt 1 meter.",
          "Kubikmeter bruges til store rumfang (som vandtanke, betonstøbning og containervolumen), mens liter, som er langt mindre, foretrækkes i dagligdagen. 1 kubikmeter svarer nøjagtigt til 1000 liter.",
        ],
      },
      {
        title: "Forholdet mellem liter og kubikmeter",
        paragraphs: [
          "Liter er en praktisk rumfangsenhed, der er accepteret til brug sammen med SI, men som ikke er en officiel SI-enhed. En liter svarer til rumfanget af en kube med sidelængde 10 centimeter (1000 kubikcentimeter).",
          "Delenhederne af liter -- deciliter, centiliter og milliliter -- bruges meget inden for mad, medicin og laboratoriemålinger. En milliliter svarer nøjagtigt til en kubikcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Hvorfor omregnes rumfangsenheder med et kubisk forhold?",
        paragraphs: [
          "Mens længdeenheder omregnes med et lineært forhold, og arealenheder med et kvadratisk forhold, omregnes rumfangsenheder med et kubisk (tredje potens) forhold. For eksempel svarer 1 meter til 100 centimeter, men 1 kubikmeter svarer ikke til 100 kubikcentimeter, men til 100³, altså 1 000 000 kubikcentimeter.",
          "Dette kubiske forhold skyldes, at rumfanget ændres i tre dimensioner samtidig, og det er den mest almindelige misforståelse ved rumfangsomregning -- særligt ved overgang til ikke-metriske enheder som gallon og kubikfod kræves der omhyggelig beregning.",
        ],
      },
      {
        title: "Målenheder i køkkenet",
        paragraphs: [
          "Mål som spiseske, teske og kop, der bruges i opskrifter, er standardiserede rumfangsenheder, der sikrer, at opskrifter tilberedt i forskellige køkkener giver konsistente resultater. Almindeligt accepterede værdier i Tyrkiet er: 1 spiseske ≈ 15 mL, 1 teske ≈ 5 mL, 1 kop ≈ 200 mL.",
          "Disse mål er ikke eksakte videnskabelige standarder, men omtrentlige værdier, der er alment accepterede i køkkenpraksis; for opskrifter, der kræver præcis måling (særligt ved bagning), er det mere pålideligt at bruge en digital køkkenvægt.",
        ],
      },
      {
        title: "Amerikanske og britiske væskemål",
        paragraphs: [
          "I det amerikanske og britiske system bruges enheder som gallon, quart, pint og fluid ounce, men enhedsstørrelserne i disse to systemer er forskellige. En amerikansk gallon svarer til 3,78541 liter, mens en britisk (imperial) gallon svarer til 4,54609 liter -- altså omkring 20 % større.",
          "Denne forskel skyldes, at de to lande historisk har accepteret forskellige referencegalloner som standard (vingallon i USA, imperial gallon i Storbritannien). Man bør altid tjekke, hvilket system en 'gallon'- eller 'ounce'-værdi på en opskrift eller produktetiket tilhører.",
        ],
      },
      {
        title: "Landbrugs- og historiske rumfangsenheder",
        paragraphs: [
          "Bushel og peck er historisk set rumfangsenheder, der er brugt til at måle tørre varer som korn, frugt og grønsager; de bruges stadig i enkelte landbrugsmarkeder, særligt i USA.",
          "Under det osmanniske rige var kile og sinik traditionelle rumfangsenheder brugt til kornmåling; 1 kile svarede til 20 sinik. Selvom disse enheder varierede lidt fra region til region, bruges de stadig som reference ved fortolkning af historiske tekster og optegnelser.",
        ],
      },
      {
        title: "Hvordan beregnes rumfang?",
        paragraphs: [
          "For et rektangulært prisme (en kasse) bruges formlen Rumfang = Længde × Bredde × Højde. For en cylinder gælder Rumfang = π × Radius² × Højde, og for en kugle Rumfang = (4/3) × π × Radius³.",
          "Rumfanget af uregelmæssigt formede faste objekter kan ofte findes ved fortrængningsmetoden (Arkimedes' princip) -- ved at sænke objektet i en vandfyldt beholder og måle rumfanget af det vand, der løber over.",
        ],
      },
      {
        title: "Rumfangsmåling inden for olie og industri",
        paragraphs: [
          "I olieindustrien udtrykkes rumfang sædvanligvis i tønder (barrel, bbl); 1 tønde svarer nøjagtigt til 158,987 liter (42 amerikanske gallon). Denne enhed stammer fra en tradition fra 1800-tallet, hvor olie blev transporteret i trætønder til vin.",
          "I industrielle processer udtrykkes store rumfang sædvanligvis i kubikmeter, mens små laboratoriemålinger udtrykkes i milliliter; korrekt enhedsvalg foretages ud fra størrelsen af det rumfang, der måles.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrisk", commonUse: "Medicindoser og små målinger" },
      { name: "Teske", symbol: "ts", referenceValue: "0,000005 m³ (≈5 mL)", system: "Køkkenmål", commonUse: "Opskrifter" },
      { name: "Spiseske", symbol: "ss", referenceValue: "0,000015 m³ (≈15 mL)", system: "Køkkenmål", commonUse: "Opskrifter" },
      { name: "Kop", symbol: "kop", referenceValue: "0,0002 m³ (≈200 mL)", system: "Tyrkiet (køkken)", commonUse: "Tyrkiske opskrifter" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metrisk", commonUse: "Drikke, brændstof og daglig rumfangsmåling" },
      { name: "Fluid ounce (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drikke- og kosmetikemballage" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Måling af øl og mælk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Brændstof og store væskemængder" },
      { name: "Britisk gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britisk (imperial)", commonUse: "Brændstof- og væskemåling i Storbritannien" },
      { name: "Kubikfod", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britisk/amerikansk", commonUse: "Byggeri og HVAC-luftstrøm" },
      { name: "Tønde (olie)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Olieindustri", commonUse: "Måling af råolie" },
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
      "Masse er en grundlæggende fysisk størrelse knyttet til mængden af stof i et legeme og dets inertiegenskab. I Det Internationale Enhedssystem er grundenheden for masse kilogram, og den betegnes med symbolet kg.",
      "Masse og vægt bruges ofte i flæng i dagligdagen, men de er fysisk set forskellige størrelser. Masse måles i kilogram, mens vægt -- som er en kraft -- måles i newton.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Masse" },
      { label: "Dimensionssymbol", value: "[M]" },
      { label: "SI-grundenhed", value: "Kilogram" },
      { label: "SI-enhedssymbol", value: "kg" },
      { label: "Malevidenskabeligt felt", value: "Massemetrologi" },
    ],
    sections: [
      {
        title: "Hvad er masse?",
        paragraphs: [
          "Masse er den fysiske størrelse knyttet til den modstand, et legeme yder mod ændring i bevægelsestilstand, altså inerti. I klassisk mekanik udtrykkes forholdet mellem nettokraften, der virker på et legeme, og den acceleration, den skaber, med F = m·a.",
          "Når samme kraft påvirker to legemer, får det legeme med størst masse mindre acceleration. Derfor beskriver masse ikke kun mængden af stof i dagligdags forstand -- den spiller også en central rolle i bevægelsesligninger.",
          "Masse er en skalar størrelse. Den har ingen retning, og grunddimensionssymbolet i SI-systemet betegnes med bogstavet M.",
        ],
      },
      {
        title: "Forskellen mellem masse og vægt",
        paragraphs: [
          "Masse og vægt er ikke samme fysiske størrelse. Masse er en egenskab ved legemet og udtrykkes i kilogram. Vægt er derimod den kraft, legemet udsættes for i et gravitationsfelt, og måles i newton.",
          "Den forenklede vægtsammenhæng er W = m·g. Her står W for vægtkraften, m for massen og g for den lokale tyngdeacceleration.",
          "Massen af et legeme forbliver næsten den samme på jorden og på manen, men fordi den lokale tyngdeacceleration er forskellig, ændres vægten. Derfor er kilogram i videnskabelig sammenhæng en masseenhed, ikke en vægtenhed.",
          "I dagligdagen udtrykkes vejeresultatet i kilogram, og ordene 'vægt' og 'masse' bruges derfor ofte i flæng. En vægt registrerer i realiteten en kraftpåvirkning, men kalibreres til at vise resultatet i masseenheder.",
        ],
      },
      {
        title: "Hvorfor er kilogram SI-grundenheden for masse?",
        paragraphs: [
          "I Det Internationale Enhedssystem er grundenheden for masse kilogram. Kilogram er den eneste SI-grundenhed, der har et præfiks i sit navn.",
          "Ordet gram spillede historisk en vigtig rolle i de første massedefinitioner i det metriske system. Men da praktiske standarder skulle etableres, blev kilogram den grundlæggende reference.",
          "I dag defineres kilogram ikke ud fra massen af en fysisk metalcylinder, men ud fra en fastsat talværdi for Plancks konstant. Sammenhængen mellem denne definition, Kibble-vægten og elektriske målinger er beskrevet detaljeret på kilogram-informationssiden.",
        ],
      },
      {
        title: "Metriske masseenheder",
        paragraphs: [
          "Metriske masseenheder er bygget op af kilogram, gram og de SI-præfikser, der tilføjes disse. Et gram er 0,001 kilogram, et milligram er 0,001 gram, og et mikrogram er 0,001 milligram.",
          "Til store masser bruges ton. Et metrisk ton svarer nøjagtigt til 1000 kilogram. Symbolet for ton, som er accepteret til brug sammen med SI, er lille t.",
          "Den rette enhed vælges ud fra størrelsen af den masse, der måles. Menneske- og produktmasser kan udtrykkes i kilogram, madindhold i gram, virksomme stoffer i medicin i milligram eller mikrogram, og køretøjslaster i ton.",
        ],
      },
      {
        title: "Forholdet mellem pund, ounce og kilogram",
        paragraphs: [
          "Pund og ounce er masseenheder brugt i de britiske og amerikanske traditionelle målesystemer. Det internationale avoirdupois-pund svarer nøjagtigt til 0,45359237 kilogram.",
          "Et avoirdupois-pund deles i 16 ounce. Dermed svarer en ounce nøjagtigt til 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pund brugt i masseomregning må ikke forveksles med kraftenheden pound-force. Pund udtrykker masse, mens pound-force udtrykker kraft. I tekniske beregninger må symbolerne lb og lbf ikke blandes sammen.",
        ],
      },
      {
        title: "Hvordan måles masse?",
        paragraphs: [
          "Ved massemåling bruges ligearmet vægt, elektronisk vægt, analysevægt, lastceller og industrielle vejesystemer med forskellig kapacitet.",
          "Sammenlignende vægte sammenligner en ukendt masse med sporbare standardmasser. I elektroniske vægte kan lastceller omdanne den påfølgende kraft til et elektrisk signal.",
          "Ved højpræcisionsmålinger kan faktorer som luftens opdrift, lokal tyngdeacceleration, temperatur, fugtighed, vibration, elektrostatiske effekter og densiteten af standardmassen tages i betragtning.",
          "At massestandarder knyttes til nationale og internationale målesystemer, kaldes metrologisk sporbarhed. Kalibreringskæden gør det muligt at sammenligne målinger udført på forskellige laboratorier og virksomheder.",
        ],
      },
      {
        title: "Forholdet mellem densitet, rumfang og masse",
        paragraphs: [
          "Mellem masse, densitet og rumfang gælder sammenhængen m = ρ·V. Her står m for masse, ρ for densitet og V for rumfang.",
          "To stoffer med samme rumfang kan have forskellig masse afhængigt af densiteten. For eksempel har stål og vand med samme rumfang ikke samme masse.",
          "I SI-systemet er grundenheden for densitet kilogram per kubikmeter. I laboratoriesammenhæng bruges også enheder som gram per kubikcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Usikkerhed i massemåling",
        paragraphs: [
          "Enhver reel måling har en vis usikkerhed. At en vægt viser mange cifre på skærmen, betyder ikke, at alle cifrene er kendt med samme nøjagtighed.",
          "Instrumentopløsning, gentagelighed, ikke-linearitet, kalibreringsstandard, miljøforhold og brugermetode kan alle bidrage til usikkerheden i en massemåling.",
          "I videnskabeligt og industrielt arbejde bør måleresultatet vurderes sammen med korrekt enhed, gældende cifre og usikkerhedsinformation.",
        ],
      },
      {
        title: "Hvordan vælges den rette masseenhed?",
        paragraphs: [
          "At vælge en enhed, der passer til størrelsen af det objekt, der måles, gør resultatet mere læsbart. Massen af et menneske kan udtrykkes i kilogram, det virksomme stof i en tablet i milligram, og lasten på en lastbil i ton.",
          "For meget små masser kan SI-præfikserede enheder som mikrogram, nanogram og pikogram bruges. På atom- og molekylskala kan specielle enheder som den forenede atommasseenhed være mere praktiske.",
          "Ved enhedsomregning skal man ikke kun kontrollere den numeriske værdi, men også om den anvendte enhed udtrykker masse eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Meget små stofmængder" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medicin- og laboratoriemålinger" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Medicindoser og kemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Mad og små genstande" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grundlæggende massemålinger" },
      { name: "Ton", symbol: "t", referenceValue: "1000 kg", system: "Metrisk", commonUse: "Køretøjer, last og industri" },
      { name: "Ounce", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britisk/amerikansk", commonUse: "Mad og små masser" },
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
      "Temperatur er en grundlæggende fysisk størrelse knyttet til den gennemsnitlige kinetiske energi af partiklerne i et stof, som beskriver, hvor 'varmt' eller 'koldt' stoffet er. I Det Internationale Enhedssystem er grundenheden for temperatur kelvin.",
      "I dagligdagen er Celsius og Fahrenheit de mest brugte skalaer; i videnskabeligt arbejde bruges kelvin, i visse ingeniørberegninger Rankine, og i historiske tekster Reaumur. I modsætning til de fleste andre fysiske størrelser kræver omregning mellem temperaturenheder både multiplikation og addition/subtraktion.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensionssymbol", value: "[Θ]" },
      { label: "SI-grundenhed", value: "Kelvin" },
      { label: "SI-enhedssymbol", value: "K" },
      { label: "Absolut nulpunkt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Hvad er temperatur?",
        paragraphs: [
          "Temperatur er en størrelse direkte knyttet til den gennemsnitlige kinetiske (bevægelses-)energi af de atomer og molekyler, der udgør et stof. Jo hurtigere partiklerne bevæger sig, desto 'varmere' anses stoffet at være.",
          "Temperatur er en af de syv grundlæggende størrelser i Det Internationale Enhedssystem og betegnes som termodynamisk temperatur med symbolet Θ (theta). I modsætning til mange andre størrelser (som længde og masse) er den ikke en direkte additiv størrelse -- at samle to legemer lægger ikke deres temperaturer sammen, men fører dem mod en ligevægt.",
        ],
      },
      {
        title: "SI-enheden for temperatur: kelvin",
        paragraphs: [
          "Kelvin er SI-grundenheden for temperatur og betegnes med symbolet K (uden gradtegn, kun 'K' skrives). Kelvin-skalaen bruger det absolutte nulpunkt (den teoretisk lavest mulige temperatur) som udgangspunkt (0 K).",
          "Med SI-revisionen i 2019 defineres kelvin ikke længere ud fra vandets trippelpunkt, men ud fra en fastsat talværdi for Boltzmann-konstanten (k). Dette sikrer, at temperaturenheden er knyttet til en universel konstant, ikke et fysisk referencestof.",
        ],
      },
      {
        title: "Hvorfor er temperaturomregning ikke bare multiplikation?",
        paragraphs: [
          "Ved enhedsomregning for størrelser som længde eller masse bruges kun en multiplikationsfaktor (for eksempel meter-centimeter). For temperatur har Celsius-, Fahrenheit- og Kelvin-skalaerne forskellige 'nulpunkter', så omregningen kræver både multiplikation og addition/subtraktion.",
          "For eksempel ganges værdien først med 9/5, og derefter lægges 32 til, når man går fra Celsius til Fahrenheit: °F = (°C × 9/5) + 32. Derfor er temperatur den eneste almindelige fysiske størrelse, der har et 'affint' (lineært, men ikke gennem origo) omregningsforhold.",
        ],
      },
      {
        title: "Celsius-skalaen",
        paragraphs: [
          "Celsius-skalaen blev udviklet i 1742 af den svenske astronom Anders Celsius og definerer vandets frysepunkt til 0 °C og kogepunkt (ved 1 atmosfæres tryk) til 100 °C. Dette er et praktisk referencesystem, der gør skalaen let at forstå i dagligdagen.",
          "Celsius er den mest brugte temperaturskala i videnskabeligt arbejde og i vejrudsigten i de fleste lande i verden; et fåtal lande, som USA, foretrækker stadig Fahrenheit i dagligdagen.",
        ],
      },
      {
        title: "Fahrenheit-skalaen",
        paragraphs: [
          "Fahrenheit-skalaen blev udviklet i 1724 af den tyske fysiker Daniel Gabriel Fahrenheit. På denne skala er vandets frysepunkt 32 °F og kogepunkt 212 °F -- et interval på hele 180 grader mellem frysning og kogning.",
          "Fahrenheit bruges i dag hovedsageligt i USA og et fåtal andre lande til daglig temperaturmåling; i videnskabeligt arbejde er den i vid udstrækning blevet erstattet af Celsius og kelvin verden over.",
        ],
      },
      {
        title: "Rankine og Reaumur: mindre kendte skalaer",
        paragraphs: [
          "Rankine er en absolut temperaturskala, der bruger enheder på størrelse med Fahrenheit-grader, men som sætter det absolutte nulpunkt til 0 °R; vandets frysepunkt er 491,67 °R. Den foretrækkes frem for kelvin i visse termodynamiske ingeniørberegninger, særligt i USA.",
          "Reaumur-skalaen blev udviklet i 1700-tallet af den franske videnskabsmand Rene Reaumur; den sætter vandets frysepunkt til 0 °Re og kogepunkt til 80 °Re. Den bruges næsten slet ikke i dag, men kan stadig dukke op som en historisk reference i visse europæiske lande (særligt i nogle traditionelle russiske opskrifter).",
        ],
      },
      {
        title: "Hvad betyder absolut nulpunkt?",
        paragraphs: [
          "Absolut nulpunkt (0 kelvin, -273,15 °C, -459,67 °F) er den teoretiske temperatur, hvor partiklerne har den lavest mulige kinetiske energi i klassisk forstand. Ifølge kvantemekanikken står partikler ikke helt stille selv ved absolut nulpunkt (nulpunktsenergi), men i klassisk forstand kan ingen lavere temperatur defineres.",
          "Under laboratorieforhold har man opnået temperaturer meget tæt på absolut nulpunkt (helt ned på mikrokelvin- og endda nanokelvinniveau), men ifølge termodynamikkens tredje lov er det umuligt at nå absolut nulpunkt fuldstændigt i et endeligt antal trin.",
        ],
      },
      {
        title: "Hvordan måles temperatur?",
        paragraphs: [
          "Ved temperaturmåling bruges forskellige teknologier som kviksølv-/alkoholtermometre, digitale termometre, termoelementer, modstandstermometre (RTD) og infrarøde (kontaktløse) termometre. Hver af dem passer til forskellige temperaturområder og præcisionsniveauer.",
          "Termoelementer bruges ofte i industrielle miljøer, fordi de kan fungere over et meget bredt temperaturområde (nogle gange fra -200 °C til +2000 °C); de beregner temperaturen ud fra spændingsforskellen, der opstår, hvor to forskellige metaller mødes.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grundenhed", system: "SI", commonUse: "Videnskabelige og termodynamiske beregninger" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrisk (dagligbrug)", commonUse: "Vejr, dagligdag, videnskab" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig vejrmelding i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (ingeniør)", commonUse: "Termodynamiske ingeniørberegninger" },
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
      "Tid er en grundlæggende fysisk størrelse, der beskriver rækkefølgen af hændelser og varigheden mellem dem. I Det Internationale Enhedssystem er grundenheden for tid sekund, og den bruges i dagligdagen sammen med afledte enheder som minut, time og dag.",
      "I modsætning til størrelser som længde eller masse er tid et af menneskehedens ældste målebegreber; den 60-baserede struktur af time, minut og sekund går tusinder af ar tilbage, til det gamle Babylon.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Tid" },
      { label: "Dimensionssymbol", value: "[T]" },
      { label: "SI-grundenhed", value: "Sekund" },
      { label: "SI-enhedssymbol", value: "s" },
      { label: "Gældende sekunddefinition", value: "9 192 631 770 svingningsperioder af et cesium-133-atom" },
    ],
    sections: [
      {
        title: "Hvad er tid?",
        paragraphs: [
          "Tid er en grundlæggende størrelse, der beskriver den rækkefølge, hændelser sker i, og varigheden mellem to hændelser. I fysik betegnes den med dimensionssymbolet T og indgår i definitionen af mange afledte størrelser, som hastighed, acceleration og frekvens.",
          "Mens tid i klassisk fysik blev anset for en absolut størrelse, der flod ens for alle observatører, har Einsteins relativitetsteori vist, at tiden kan flyde forskelligt afhængigt af observatørens hastighed og gravitationsfelt (tidsdilatation).",
        ],
      },
      {
        title: "SI-enheden for tid: sekund",
        paragraphs: [
          "Sekund er SI-grundenheden for tid og betegnes med symbolet s. Historisk blev sekundet defineret som 1/86 400 af en dag (24 timer × 60 minutter × 60 sekunder).",
          "På grund af små uregelmæssigheder i jordens rotationshastighed blev denne definition anset for ikke stabil nok; i 1967 blev sekundet omdefineret til nøjagtigt 9 192 631 770 perioder af den stråling, der svarer til overgangen mellem to grundenerginiveauer i cesium-133-atomet. Denne definition sikrede, at atomure fungerer med samme præcision overalt i verden.",
        ],
      },
      {
        title: "Den 60-baserede oprindelse af time, minut og sekund",
        paragraphs: [
          "At en time deles i 60 minutter, og et minut i 60 sekunder, bygger på det 60-baserede (seksagesimale) taltalsystem, der blev brugt af det gamle Babylon. Babylonierne delte både vinkler (360 grader) og tid efter dette system.",
          "Grunden til, at tallet 60 blev foretrukket, er, at det kan deles jævnt på mange tal, som 2, 3, 4, 5, 6, 10, 12, 15, 20 og 30 -- dette gjorde praktisk inddeling (for eksempel at dele en time i tre eller fire) mulig uden at skulle bruge brøkdele.",
        ],
      },
      {
        title: "Hvorfor er døgnet delt i 24 timer?",
        paragraphs: [
          "Inddelingen af døgnet i 24 timer går tilbage til det gamle Egypten; egypterne delte dagen i 12 og natten i 12 lige dele og fulgte tiden med solure og stjerneobservationer.",
          "Denne 12-deling er formentlig inspireret af at tælle leddene på fingrene på en hånd (tre led på hver af de fire fingre uden om tommelen, i alt 12), eller af antallet af månecykler i løbet af et ar (omkring 12 fuldmåner).",
        ],
      },
      {
        title: "Forholdet mellem metriske tidsenheder",
        paragraphs: [
          "Delenhederne af sekundet -- millisekund (0,001 sekund), mikrosekund og nanosekund -- bruges til at måle meget korte hændelser, som computerprocesser, sporttidtagning og videnskabelige eksperimenter.",
          "Enhederne over sekundet -- minut (60 sekunder), time (3600 sekunder) og døgn (86 400 sekunder) -- er de grundlæggende enheder, der bruges til at følge tiden i dagligdagen. I modsætning til temperatur sker omregning mellem disse enheder kun ved multiplikation/division, fordi de alle deler et fælles nulpunkt (startpunkt).",
        ],
      },
      {
        title: "Hvad er et skudsekund?",
        paragraphs: [
          "Jordens rotationshastighed om sin egen akse viser små uregelmæssigheder over tid på grund af tidevandseffekter og ændringer i dens indre struktur; dette fører til en lille afvigelse mellem den 'nøjagtige' tid målt med atomure og døgnlængden baseret på jordens faktiske rotation.",
          "For at kompensere for denne afvigelse er der siden 1972 blevet tilføjet et 'skudsekund' til Koordineret Universaltid (UTC) ved behov. Dette er en korrektionsmekanisme, der ligner den ekstra dag i skudår (29. februar), men fordi uregelmæssigheden i jordens rotationshastighed er uforudsigelig, tilføjes skudsekunder efter behov og ikke efter en fast kalendercyklus.",
        ],
      },
      {
        title: "Tidszoner og UTC",
        paragraphs: [
          "Jorden er inddelt i omkring 24 tidszoner, fordi solen når sit højeste punkt på forskellige tidspunkter afhængigt af længdegrad. Alle tidszoner bruger Koordineret Universaltid (UTC) som referencepunkt og udtrykkes som en tidsforskel fra denne reference for deres egen region (Danmark er for eksempel UTC+1 om vinteren).",
          "UTC er en moderne tidsstandard, der har erstattet den gamle Greenwich middeltid (GMT) og opretholdes med atomure; GMT bruges nu mest som navnet på Storbritanniens vintertidszone.",
        ],
      },
      {
        title: "Hvordan måles tid?",
        paragraphs: [
          "I dagligdagen bruges mekaniske og digitale ure, mens atomure bruges i videnskabelige og teknologiske anvendelser (som GPS-satellitter og telekommunikationsnet). Atomure fungerer med ekstremt høj præcision baseret på den stabile svingningsfrekvens af cesium- eller rubidiumatomer.",
          "For at GPS-systemet kan fastslå en position nøjagtigt, skal atomurene i satellitterne være synkroniseret på nanosekundniveau; selv en lille afvigelse i disse ure kan føre til store fejl i positionsberegningen på jorden.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrisk", commonUse: "Databehandling og sporttidtagning" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grundlæggende tidsmåling" },
      { name: "Minut", symbol: "min", referenceValue: "60 s", system: "Accepteret til brug sammen med SI", commonUse: "Daglig tidsfølgning" },
      { name: "Time", symbol: "t", referenceValue: "3600 s", system: "Accepteret til brug sammen med SI", commonUse: "Arbejdstid, rejsetid" },
      { name: "Døgn", symbol: "d", referenceValue: "86 400 s", system: "Accepteret til brug sammen med SI", commonUse: "Kalender- og varighedsberegninger" },
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
      "Hastighed er en afledt fysisk størrelse, der beskriver den strækning, et legeme tilbagelægger per tidsenhed. Da den fremkommer ved at dividere længde med tid, har hastighed dimensionen L/T (længde divideret med tid).",
      "I dagligdagen er kilometer i timen (km/t) og engelske mil i timen (mph) de mest brugte hastighedsenheder; i videnskabeligt arbejde foretrækkes meter per sekund (m/s), og i søfart og luftfart knob. Lysets hastighed har en særlig plads blandt hastighedsenheder som en absolut øvre grænse, der kan nås i universet.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Hastighed (fart)" },
      { label: "Dimensionssymbol", value: "[L/T]" },
      { label: "SI-afledt enhed", value: "Meter per sekund" },
      { label: "SI-enhedssymbol", value: "m/s" },
      { label: "Universel hastighedsgrænse", value: "Lysets hastighed ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Hvad er hastighed?",
        paragraphs: [
          "Hastighed beskriver den strækning, et legeme tilbagelægger per tidsenhed, og beregnes med formlen Hastighed = Strækning / Tid. I fysikken skelnes teknisk mellem 'fart' (skalar, uden retning) og 'hastighed' (vektor, med retning), men i dagligtale bruges de ofte i flæng.",
          "Hastighed er en afledt størrelse; den fremkommer ved at dividere en længdeenhed med en tidsenhed. Derfor angives SI-dimensionen som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheden for hastighed: meter per sekund",
        paragraphs: [
          "I Det Internationale Enhedssystem er den afledte enhed for hastighed meter per sekund (m/s), som beskriver, at et legeme tilbagelægger en meter hvert sekund. Denne enhed bruges som standard i videnskabelige beregninger og fysiske formler.",
          "I dagligdagen foretrækkes kilometer i timen (km/t) frem for meter per sekund, fordi køretøjshastigheder og vejafstande udtrykkes med mere intuitive tal på denne skala. 1 m/s svarer nøjagtigt til 3,6 km/t.",
        ],
      },
      {
        title: "Kilometer i timen og engelske mil i timen",
        paragraphs: [
          "Kilometer i timen (km/t) er standard hastighedsenhed i vejtrafikken i lande, der bruger det metriske system, deriblandt Danmark. Engelske mil i timen (mph) foretrækkes i lande som USA og Storbritannien, der bruger det britiske målesystem.",
          "1 mph svarer til omkring 1,60934 km/t. Denne forskel er en praktisk kilde til forvirring, der kan føre til fejltolkning af fartmålere på importerede køretøjer eller fartgrænser ved lejebilkørsel i udlandet.",
        ],
      },
      {
        title: "Knob: hastighed i søfart og luftfart",
        paragraphs: [
          "Knob (sominil i timen) er standard hastighedsenhed i søfart og luftfart; 1 knob svarer nøjagtigt til strækningen på 1 sømil (1852 meter) tilbagelagt på en time.",
          "Navnet knob kommer historisk fra at måle et fartøjs hastighed ved at kaste et reb med knuder ud i vandet og tælle, hvor mange knuder der passerede i løbet af et bestemt tidsrum. Denne metode blev brugt i århundreder for de moderne hastighedsmåleinstrumenter.",
        ],
      },
      {
        title: "Lysets hastighed: universets fartgrænse",
        paragraphs: [
          "Lysets hastighed er defineret til nøjagtigt 299 792 458 m/s i vakuum, og ifølge Einsteins specielle relativitetsteori er den den absolutte øvre grænse for, hvad information eller et legeme med masse kan opnå i universet.",
          "At lysets hastighed er defineret som et eksakt tal (den blev anset for konstant også før SI-revisionen i 2019), gør, at den gældende definition af meteren også bygger på denne konstant -- meteren er defineret som den strækning, lyset tilbagelægger på 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Mach-tal: forhold til lydens hastighed",
        paragraphs: [
          "Inden for luftfart udtrykkes høje hastigheder ofte med Mach-tal; dette er forholdet mellem et legemes hastighed og lydens hastighed i det pågældende medie (Mach 1 = lydens hastighed). Lydens hastighed er ikke en fast værdi -- den varierer med luftens temperatur og densitet (omkring 343 m/s / 1235 km/t ved havoverfladen).",
          "Derfor kan samme Mach-tal svare til forskellige faktiske hastigheder (km/t eller m/s) ved forskellige højder og temperaturer -- et flys hastighed på Mach 0,85 vil variere i faktisk hastighedsværdi afhængigt af højde.",
        ],
      },
      {
        title: "Forskellen mellem gennemsnitsfart og momentanfart",
        paragraphs: [
          "Gennemsnitsfart findes ved at dividere den samlede tilbagelagte strækning med den samlede tid, der er gået, og giver en enkelt værdi for en hel rejse. Momentanfart er derimod fartøjets hastighed på et bestemt øjeblik og kan ændre sig kontinuerligt (acceleration, opbremsning, stop).",
          "Mens en fartmåler i et køretøj viser momentanfarten, beregnes gennemsnitsfarten for en rejse sædvanligvis efterfølgende ud fra den samlede strækning og samlede tid -- disse to værdier er forskellige, så længe farten ikke er konstant gennem hele rejsen.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrisk", commonUse: "Laboratorie- og langsom bevægelsesmåling" },
      { name: "Meter per minut", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrisk", commonUse: "Industriel båndhastighed" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Videnskabelige og fysiske beregninger" },
      { name: "Kilometer i timen", symbol: "km/t", referenceValue: "≈0,278 m/s", system: "Metrisk", commonUse: "Køretøjshastighed og fartgrænser" },
      { name: "Engelske mil i timen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britisk/amerikansk", commonUse: "Køretøjshastighed i USA og Storbritannien" },
      { name: "Knob", symbol: "knob", referenceValue: "≈0,514 m/s", system: "Søfart/luftfart", commonUse: "Skibs- og flyhastighed" },
      { name: "Kilometer per minut", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrisk", commonUse: "Kortdistancefartberegninger" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrisk", commonUse: "Rumfartøjs- og himmellegemehastigheder" },
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
      "Omregn gratis og direkte mellem pascal, bar, psi og atmosfære; se formler og tabeller.",
    introduction: [
      "Tryk beskriver, hvor meget af den kraft, der virker vinkelret på en flade, der falder på hver arealenhed. Anvendelsesområdet strækker sig fra kontaktspændinger mellem faste stoffer til væsken i et rør, fra atmosfæren til vakuumsystemer. I ingeniørfag er tryk ikke kun en talværdi, men en grundlæggende designvariabel for sikkerhed, tæthed, strukturel styrke, energiomdannelse og processtyring.",
      "I Det Internationale Enhedssystem er den afledte enhed for tryk pascal, som betegnes med symbolet På. En pascal svarer til det tryk, der opstår, når en kraft på en newton fordeler sig jævnt over et areal på en kvadratmeter. Derfor er trykenheden direkte knyttet til begreberne kraft og areal; samme dimensionsstruktur deles også med materialespænding, men den fysiske sammenhæng er ikke altid den samme.",
      "I dagligdagen og industrien udtrykkes tryk oftest med mere praktiske enheder end pascal. Kilopascal og PSI bruges til dæktryk, bar i procesanlæg, atm ved atmosfæriske forhold, og millibar i meteorologi. At forskellige sektorer historisk har taget forskellige enheder i brug, gør det særligt vigtigt at forstå trykomregning korrekt og ikke blande absolut, manometrisk og differenstryk sammen.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Tryk" },
      { label: "SI-afledt enhed", value: "Pascal" },
      { label: "SI-symbol", value: "På" },
      { label: "Grundsammenhæng", value: "P = F / A" },
      { label: "SI-ekvivalent", value: "1 På = 1 N/m²" },
      { label: "Dimensionsformel", value: "M L⁻¹ T⁻²" },
      { label: "Standardatmosfære", value: "101 325 På" },
      { label: "Absolut nulpunktsreference", value: "Fuldstændigt vakuum" },
    ],
    sections: [
      {
        title: "Hvad er tryk?",
        paragraphs: [
          "Tryk afhænger ikke kun af størrelsen af den kraft, der virker på en flade, men også af, hvilket areal denne kraft fordeler sig over. Når samme kraft virker på et mindre areal, øges trykket; når den fordeler sig over et større areal, aftager det. Derfor kan en skarp kniv skære med lille kraft, mens samme kraft over en bred flade giver en langt mindre overfladeeffekt.",
          "I strømningsmekanik betragtes tryk som normalspændingskomponenten, en stillestående eller bevægelig væske udøver på sine omgivelser. I en stillestående væske overføres trykket i alle retninger og knyttes til Pascals princip i lukkede beholdere. Denne egenskab er grundlaget for hydrauliske presser, bremsesystemer og mange industrielle aktuatorer.",
          "Trykbegrebet er ikke begrænset til væsker og gasser. Den gennemsnitlige normalkrafteffekt ved kontaktflader danner også en trykkelignende fordeling. Men i ingeniørfag er det oftest strømningssystemer som rør, tanke, kompressorer, luftkanaler, vakuumkamre og atmosfæriske omgivelser, der står i fokus, når man taler om tryk.",
        ],
      },
      {
        title: "Trykformlen: P = F / A",
        paragraphs: [
          "Grunddefinitionen af tryk gives ved sammenhængen P = F / A. Her står P for tryk, F for kraftkomponenten vinkelret på fladen, og A for det areal, denne kraft fordeler sig over. Enhedsanalyse giver newton divideret med kvadratmeter, hvilket svarer til pascal.",
          "Denne sammenhæng giver gennemsnitstrykket forudsat jævn kraftfordeling. I virkelige kontaktproblemer eller komplekse felter i en væske kan trykket variere langs fladen. I sådanne tilfælde tages lokal trykfordeling, differentialligninger og grænsebetingelser i betragtning i stedet for en enkelt gennemsnitsværdi.",
          "En almindelig fejl i praksis er at vælge forkert kraftretning eller effektivt areal. Ved beregning af for eksempel stempelkraft skal kun det effektive tværsnitsareal, der er udsat for tryk, bruges. Når geometriske detaljer som pakninger, bolte eller støtteflader overses, kan der opstå designfejl.",
        ],
      },
      {
        title: "Hvorfor er pascal SI-trykenheden?",
        paragraphs: [
          "Pascal fremkommer som en naturlig kombination af newton, SI-enheden for kraft, og kvadratmeter, SI-enheden for areal. Sammenhængen 1 På = 1 N/m² er derfor ikke kun en definition, men også et dimensionsudtryk, der viser den mekaniske oprindelse af tryk. Det er ikke nødvendigt at definere en separat grundenhed for tryk.",
          "SI-systemet sigter mod at knytte afledte størrelser konsekvent til grundenheder. At tryk udtrykkes i pascal, giver et rammeværk, der er konsistent med ligninger for energitæthed, spænding, elasticitetsmodul og strømningsmekanik. At samme enhed kan bruges på tværs af forskellige fagområder, reducerer omregningsfejl i beregninger.",
          "Pascal er ofte en lille enhed i dagligdagen. Derfor foretrækkes mere praktiske skalaer som kilopascal, megapascal eller bar i ingeniørfag. Alligevel er alle disse i sidste ende knyttet til pascal, og dermed til SI-grundlaget.",
        ],
      },
      {
        title: "Historien om trykmåling: Torricelli og barometeret",
        paragraphs: [
          "Den systematiske måling af tryk startede i 1643, da den italienske videnskabsmand Evangelista Torricelli udviklede kviksølvbarometeret. Torricelli fyldte et glasrør lukket i den ene ende med kviksølv og sænkede den åbne ende ned i en beholder med kviksølv, og observerede, at kviksølvet i røret blev stående på en bestemt højde og efterlod et tomrum over sig.",
          "Torricelli foreslog, at højden af kviksølvsøjlen blev balanceret af vægten af luften udenfor. Denne idé dannede det eksperimentelle grundlag for opfattelsen af, at luft har en målbar vægt, og dermed et tryk, og regnes som starten på den videnskabelige undersøgelse af tryk som størrelse.",
          "I 1648 viste Florin Périer, på forslag fra Blaise Pascal, ved at måle et barometer på forskellige højder på bjerget Puy-de-Dôme, at atmosfæretrykket aftager med højden. I de følgende århundreder byggede man videre på dette grundlag; Meterkonventionen i 1875 samordnede måleenheder internationalt, i 1954 kom den eksakte definition af standardatmosfære, og i 1971 blev pascal optaget som SI-enhed.",
        ],
      },
      {
        title: "Absolut, manometrisk og differenstryk",
        paragraphs: [
          "Absolut tryk måles i forhold til fuldstændigt vakuum. Denne reference er den teoretiske tilstand, hvor trykket er nul, og absolut tryk kan ikke være negativt. Særligt gaslove, termodynamiske beregninger og enkelte tæthedsrelaterede sammenhænge arbejder med absolut tryk.",
          "Manometrisk tryk måles derimod i forhold til atmosfæretrykket. De fleste manometre på anlæg bruger den omgivende atmosfære som nulreference; derfor er den værdi, der vises på skærmen, oftest manometrisk tryk. Sammenhængen mellem absolut og manometrisk tryk er P_abs = P_manometrisk + P_atm.",
          "Differenstryk er trykforskellen mellem to punkter. I anvendelsesområder som filtertilstopning, debitmåling over en blændeplade, rumtrykssætning og varmevekslerydelse overvåges direkte trykforskellen mellem to forskellige linjer eller rumfang. Denne størrelse defineres hverken i forhold til fuldstændigt vakuum eller kun i forhold til atmosfæren; den er direkte forskellen mellem to punkter.",
        ],
      },
      {
        title: "Atmosfæretryk",
        paragraphs: [
          "Atmosfæretryk er det tryk, luftsøjlen i jordens atmosfære udøver på flader på grund af sin vægt. Under standardforhold nær havoverfladen regnes det for omkring 101 325 På, altså 1 atm. Denne værdi er dog ikke konstant; den varierer med højde, vejrforhold og temperaturændringer.",
          "Barometre bruges til at måle atmosfæretrykket. Kviksølvbarometre har historisk været referenceinstrumenter, mens elektroniske tryksensorer er blevet stadig mere udbredte i moderne anvendelser. Atmosfæretryk er vigtigt ikke kun for meteorologi, men også for vakuumteknologi, forbrændingssystemer og omregning mellem manometrisk og absolut tryk.",
          "I systemer, der arbejder med manometrisk tryk, kan ændringer i atmosfæretrykket påvirke måletolkningen. For eksempel giver 2 bar manometrisk tryk ved havoverfladen og 2 bar manometrisk tryk i højereliggende områder ikke samme absolutte værdi. Denne sondring kan være afgørende særligt i beregninger af kompression, gastæthed og kogepunkt.",
        ],
      },
      {
        title: "Hydrostatisk tryk og sammenhængen P = ρgh",
        paragraphs: [
          "I en stillestående væske øges trykket med dybden. Under antagelse af konstant tæthed udtrykkes det hydrostatiske manometriske tryk tilnærmelsesvist med sammenhængen P = ρgh. Her repræsenterer ρ tæthed, g tyngdeacceleration og h højden af væskesøjlen.",
          "Denne sammenhæng er særligt nyttig for vandtanke, åbne tanke, damme, niveaumåling og væskefyldte manometre. Ved samme højde og i samme væske regnes trykket for lige stort; formen på beholderen ændrer ikke resultatet. Det afgørende er væskens tæthed og den lodrette dybde i forhold til den frie overflade.",
          "Absolut hydrostatisk tryk omfatter ikke kun stigningen ρgh, men også starttrykket ved den frie overflade. I en åben beholder er denne startværdi sædvanligvis atmosfæretrykket. Derfor skal man ved beregning af absolut tryk ikke kun lægge stigningen fra væskesøjlen til, men også det ydre tryk ved overfladen.",
        ],
      },
      {
        title: "Statisk, dynamisk og totalt tryk",
        paragraphs: [
          "Statisk tryk er trykkomponenten, der repræsenterer den lokale termodynamiske tilstand af strømningen set fra en observatør, der bevæger sig med væsken. De fleste målepunkter i rørledninger, tanke og kanaler følger hovedsageligt det statiske tryk. Storparten af tryktransmittere er designet til at måle denne størrelse.",
          "Dynamisk tryk udtrykker den kinetiske effekt, der skyldes strømningshastigheden, og den ofte anvendte tilnærmede sammenhæng er q = 1/2 ρv². Dette led spiller en vigtig rolle i Bernoulli-tilnærmelsen og bruges i hastighedsmålemetoder som pitotrør. Når hastigheden øges, øges også det dynamiske tryk.",
          "Totalt tryk fortolkes i en ideel strømningstilnærmelse som summen af statisk og dynamisk tryk. I virkelige systemer skal denne sondring bruges med forsigtighed på grund af friktion, turbulens, komprimerbarhed og lokale tab. Alligevel er sondringen mellem statisk, totalt og dynamisk tryk et grundlæggende ingeniørsprog inden for ventilation, aerodynamik og procesmåling.",
        ],
      },
      {
        title: "Trykhøjde og pumpelofthøjde",
        paragraphs: [
          "Trykhøjde er udtrykket for et bestemt tryk som den tilsvarende højde af en væskesøjle. Grundsammenhængen er h = P / (ρg). Dermed svarer samme tryk til forskellige højdeværdier for væsker med forskellig tæthed.",
          "I pumpesystemer fortolkes tryk ofte direkte som meter væskesøjle i stedet for pascal eller bar. Dette er fordi pumpens opgave ikke kun er at tilføre væsken tryk, men også at levere den energi, der kræves for at dække en bestemt højde, friktionstab og hastighedskomponent. Derfor er begrebet lofthøjde meget praktisk set fra feltingeniørens synspunkt.",
          "Trykhøjde og geometrisk højde er ikke samme begreb. Kun at se på manometeraflæsningen uden at tage hensyn til rørtab, hastighedshoved og lokale modstande kan give fejlagtige resultater ved pumpevalg og systembalancering. Særligt for vand, olie og procesvæsker kræver tæthedsforskelle, at omregningen foretages med omhu.",
        ],
      },
      {
        title: "Hvorfor er trykenhederne forskellige?",
        paragraphs: [
          "Mangfoldigheden af trykenheder skyldes i vid udstrækning historiske og brancherelaterede årsager. Mens SI-systemet lægger pascal til grund, bruges stadig bar i industrien, mmHg i medicin, millibar i meteorologi, PSI i bilindustrien, og enheder som at i enkelte ældre tekniske dokumenter. Dette skyldes, at forskellige fagområder har bevaret deres egne brugsvaner.",
          "Enkelte enheder opleves som mere intuitive for brugeren. For eksempel kan dæktryk være mere læsbart som omkring 35 psi end som 240 kPa, og procestryk som 3,5 bar i stedet for 350 000 På. Valg af enhed handler ikke kun om nøjagtighed, men også om rapporteringskultur, instrumentskalering og feltvaner.",
          "Men fordi forskellige enheder udtrykker samme fysiske størrelse, er nøjagtig omregning nødvendig i fælles beregninger. Særligt at blande tilnærmede og eksakt definerede koefficienter sammen, overse sondringen mellem manometrisk og absolut tryk, og fejlaeslsning af symboler er vigtige fejlkilder.",
        ],
      },
      {
        title: "Hvordan måles tryk?",
        paragraphs: [
          "Ved trykmåling skal man først afgøre, hvilken type tryk der kræves: absolut, manometrisk eller differens. Derefter vurderes måleområde, væsketype, temperatur, kemisk kompatibilitet, vibration og påkrævet nøjagtighedsniveau. Samme sensor passer ikke nødvendigvis til enhver anvendelse.",
          "Ved lavtryks- og differensmålinger kan membranbaserede differenstransmittere bruges, ved høje procestryk strækmåler- eller piezoresistive elementer, og i vakuumanvendelser specielle absolutte sensorer. Væskefyldte manometre er meget nyttige til at lære grundprincippet; men i moderne industri er elektroniske instrumenter langt mere almindelige.",
          "For korrekt måling skal placering af impulslinjer, sensormonteringsposition, nulpunktsjustering og temperatureffekter tages i betragtning. I gas- og væskelinjer kan tæthedsforskelle eller kondensdannelse skabe ekstra hydrostatisk belastning på sensoren. Derfor er installationsdetaljer lige så afgørende for resultatet som selve instrumentvalget.",
        ],
      },
      {
        title: "Tryksensorer og manometre",
        paragraphs: [
          "Mekaniske manometre, som Bourdon-rørmålere, omdanner tryk til en aflæselig visserbevægelse via deformation af et elastisk element. På grund af deres robuste, enkle og energifri konstruktion har de været i brug i industrien i lang tid. Men i anvendelser, der kræver høj præcision og datalogning, er elektroniske sensorer mere fleksible.",
          "Elektroniske tryksensorer kan være piezoresistive, kapacitive, strækmåler- eller resonansbaserede. Disse sensorer omdanner trykændringer til elektriske signaler, der overføres til PLC-, SCADA- eller dataindsamlingssystemer. Dermed bliver ikke kun øjeblikkelig aflæsning mulig, men også alarmering, styring og trendanalyse.",
          "Differensmanometre giver trykforskellen mellem to punkter, absolutte sensorer giver trykket i forhold til fuldstændigt vakuum, og manometriske instrumenter giver trykket i forhold til atmosfæren. Kun at se på talværdien uden at bekræfte referencetypen i et instruments datablad kan føre til alvorlige fortolkningsfejl.",
        ],
      },
      {
        title: "Anvendelsesområder for tryk i ingeniørfag",
        paragraphs: [
          "Tryk er en grundlæggende designvariabel inden for mange ingeniørfelter, som rørlægning, HVAC, hydraulik, pneumatik, kemisk procesindustri, kraftværker, vandforsyningssystemer, bilindustri og luftfart. Fra tankvægtykkelse til ventilvalg, fra kompressorudløbsforhold til filterydelse, bygger mange beslutninger på trykinformation.",
          "I procesteknik overvåges trykgrænser for at sikre sikker drift af reaktorer, kedler, varmevekslere og separatorer. Tryksikkerhedsventiler, sprængskiver og kontrolsystemer er derfor kritisk udstyr. Tryk bruges også til indirekte måling af andre procesvariabler, som debit og niveau.",
          "I maskin- og bygningsteknik knyttes tryk til spændingsanalyser via kontaktflader og væskekræfter. I medicin og biomedicinsk udstyr er blodtryk, ventilationstryk og vakuumanvendelser centrale; i miljø og meteorologi er det atmosfæriske og differenstrykmålinger, der står i fokus.",
        ],
      },
      {
        title: "Temperatur, højde og usikkerhed i trykmåling",
        paragraphs: [
          "Temperatur kan påvirke både egenskaberne af den væske, der måles, og opførslen af selve sensorelementet. Særligt for gasser ændrer temperaturændringer tætheden, så sammenhængen mellem tryk, rumfang og temperatur skal revurderes. Datablade for sensorer indeholder derfor parametre som temperaturafhængig nulpunktsforskydning og spændforskydning.",
          "Når højden øges, aftager atmosfæretrykket sædvanligvis. Dette ændrer forholdet mellem manometrisk og absolut tryk og kan også påvirke referenceopførslen af enkelte feltinstrumenter. Samme procesforhold kan give forskellige absolutte trykresultater ved forskellige højder over havet.",
          "Enhver måling har en usikkerhed. Kalibreringsstandard, opløsning, hysterese, temperatureffekt, monteringsretning, vibration og langsigtet drift bidrager alle til den samlede usikkerhed. I kritiske anvendelser bør ikke kun den nominelle trykværdi, men også instrumentklasse og målepålidelighed tages med i designbeslutningen.",
        ],
      },
      {
        title: "Forholdet og forskellen mellem tryk og spænding",
        paragraphs: [
          "Tryk og spænding har samme dimensionsstruktur, og begge kan udtrykkes i pascal. Denne lighed skyldes, at begge repræsenterer en krafteffekt per arealenhed. Men dette betyder ikke, at de fysisk set er helt samme størrelse.",
          "Tryk opfattes for det meste som en isotrop normalspænding påført af væsker; det vil sige, at trykket på samme punkt i en stillestående væske er ens i alle retninger. Spænding i fast-stof-mekanik kan derimod indeholde både normal- og skærkomponenter, er retningsafhængig og har en tensorstruktur.",
          "At overse denne sondring kan føre til fejlfortolkning særligt i beregninger af beholdervæg, pakningsflade eller materialestyrke. Det indre tryk af en væske skaber ring- og aksialspændinger i en beholder; men spændingsfeltet i beholdermaterialet er ikke det samme som selve væsketrykket.",
        ],
      },
      {
        title: "Almindelige fejl i trykberegning",
        paragraphs: [
          "Den mest almindelige fejl er at forveksle manometrisk tryk med absolut tryk. Særligt i gaslove, tæthedsberegninger og vakuumanvendelser kan den manometriske værdi på et manometer bruges direkte, når absolut tryk egentlig kræves. Dette skaber en systematisk fejl i resultatet.",
          "En anden fejl er at afrunde omregningskoefficienter eller bruge forkert enhedsreference. Ved omregning mellem PSI, bar, atm, mmHg og kPa skal man afgøre, hvilket præcisionsniveau de tilnærmede værdier er tilstrækkelige til. Hvis instrumentkalibreringen kræver høj præcision, kan mangelfuld cifferbrug skabe problemer.",
          "At overse hydrostatiske effekter, ignorere sensorens monteringshøjde og undlade at tage højde for temperatureffekten er også almindeligt. Særligt i væskefyldte impulslinjer, lukkede tanke og differenstrykanvendelser kan tilsyneladende små installationsdetaljer ændre måleresultatet betydeligt.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 På", system: "SI", commonUse: "Videnskabelige og ingeniørmæssige beregninger" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 På", system: "SI", commonUse: "Rørsystemer, dæk og procestryk" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 På", system: "Metrisk, uden for SI", commonUse: "Industri, kompressorer og procesanlæg" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 På", system: "Metrisk, uden for SI", commonUse: "Meteorologi og atmosfæriske målinger" },
      { name: "Standardatmosfære", symbol: "atm", referenceValue: "101 325 På", system: "Uden for SI", commonUse: "Atmosfære og referenceforhold" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6894,757293 På", system: "Britisk/amerikansk", commonUse: "Dæk, hydraulik og pneumatiske systemer" },
      { name: "Teknisk atmosfære", symbol: "at", referenceValue: "98 066,5 På", system: "Uden for SI", commonUse: "Ældre tekniske og ingeniørfaglige anvendelser" },
      { name: "Millimeter kviksølv", symbol: "mmHg", referenceValue: "≈ 133,322 På", system: "Uden for SI", commonUse: "Medicin, vakuum og trykmålinger" },
      { name: "Millimeter vandsøjle", symbol: "mmH₂O", referenceValue: "≈ 9,80665 På", system: "Uden for SI", commonUse: "Lavtryks- og ventilationsmålinger" },
      { name: "Kilogram-kraft/kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 På", system: "Metrisk, uden for SI", commonUse: "Ældre pumpe- og kedelmålere, servicehandbøger" },
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
      "Energi er en grundlæggende fysisk størrelse, der beskriver et systems evne til at udføre arbejde. I Det Internationale Enhedssystem er den afledte enhed for energi joule, og den fremkommer ved at multiplicere kraft med forskydning.",
      "I dagligdagen bruges meget forskellige energienheder: kilowattimer (kWh) på elregninger, kalorier/kilokalorier i ernæring, BTU i opvarmningssystemer, therm i naturgasfakturering, og elektronvolt i partikelfysik.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Energi (arbejde)" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "SI-afledt enhed", value: "Joule" },
      { label: "SI-enhedssymbol", value: "J" },
      { label: "Definition af joule", value: "1 J = 1 newtons kraft over 1 meters forskydning (1 N·m)" },
    ],
    sections: [
      {
        title: "Hvad er energi?",
        paragraphs: [
          "Energi er evnen, et legeme eller system har til at udføre arbejde. Den kan optræde i mange former, som kinetisk energi (bevægelse), potentiel energi (position), varmeenergi, kemisk energi og elektrisk energi; ifølge loven om bevarelse af energi kan den omdannes fra en form til en anden, men den samlede mængde kan hverken opstå af intet eller forsvinde.",
          "Energi er en afledt størrelse; den fremkommer ved at multiplicere kraft med forskydning (arbejde), og SI-dimensionen angives som ML²T⁻² (masse × længde i anden / tid i anden).",
        ],
      },
      {
        title: "SI-enheden for energi: joule",
        paragraphs: [
          "Joule er SI-enheden for energi og betegnes med symbolet J; den er opkaldt efter den britiske fysiker James Prescott Joule fra 1800-tallet. En joule svarer til den energi, der kræves for at flytte et legeme 1 meter med en kraft på 1 newton.",
          "Fordi joule er ret lille til at udtrykke mange energimængder i dagligdagen, foretrækkes ofte multipla som kilojoule (tusind joule) og megajoule (en million joule) i ingeniør- og dagligbrug.",
        ],
      },
      {
        title: "Kilowattime: enheden på elregningen",
        paragraphs: [
          "Kilowattime (kWh) er den energimængde, der forbruges, når en effekt på 1 kilowatt bruges i 1 time, og den er standardenheden for elfakturering verden over. 1 kWh svarer nøjagtigt til 3 600 000 joule (3,6 megajoule).",
          "For at beregne energiforbruget af et elektrisk apparat er det nok at multiplicere effekten (watt) med brugstiden (timer); for eksempel forbruger et apparat på 2000 watt 6 kWh energi, hvis det kører i 3 timer.",
        ],
      },
      {
        title: "Kalorie og kilokalorie: energi i ernæring",
        paragraphs: [
          "Kalorie blev oprindeligt defineret som den energimængde, der kræves for at hæve temperaturen af 1 gram vand med 1 °C, og 1 kalorie svarer nøjagtigt til 4,184 joule.",
          "'Kalorie'-værdien, man ser på madvareetiketter, er i videnskabelig forstand egentlig kilokalorie (1000 kalorier) -- denne konvention i ernæringsvidenskaben (at skrive 'Kalorie' med stort forbogstav) skaber ofte forvirring; når det står, at en fødevare indeholder '200 kalorier', menes der egentlig 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU og therm: energi i opvarmning og naturgas",
        paragraphs: [
          "BTU (British Thermal Unit) er den energimængde, der kræves for at hæve temperaturen af 1 pund vand med 1 °F, og den bruges -- oprindeligt fra USA, men nu udbredt over hele verden -- til at angive kapaciteten af opvarmnings-/kølesystemer (klimaanlæg, varmtvandsbeholdere). 1 BTU svarer til omkring 1055,06 joule.",
          "Therm er en stor energienhed brugt i naturgasfakturering og svarer nøjagtigt til 100 000 BTU. I enkelte lande faktureres naturgasforbrug direkte i therm i stedet for kubikmeter.",
        ],
      },
      {
        title: "Elektronvolt: enheden i den subatomære verden",
        paragraphs: [
          "Elektronvolt (eV) beskriver den kinetiske energi, et elektron får, når det bevæger sig gennem en potentialforskel på 1 volt, og det er en ekstremt lille energienhed (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "I partikelfysik og atomfysik udtrykkes energier sædvanligvis i elektronvolt (og dets multipla keV, MeV, GeV) i stedet for joule, fordi joule på denne skala giver ekstremt små og upraktiske tal.",
        ],
      },
      {
        title: "Princippet om bevarelse af energi",
        paragraphs: [
          "Ifølge princippet om bevarelse af energi, også kendt som termodynamikkens første lov, forbliver den samlede energi i et lukket system konstant; energi kan hverken skabes eller ødelægges, kun omdannes fra en form til en anden.",
          "For eksempel omdannes kemisk energi (brændstof) i en bilmotor først til varmeenergi og derefter til mekanisk energi (bevægelse); selvom noget af energien i denne proces går tabt som ubrugelig varme via friktion og udstødning, forbliver den samlede energimængde uændret.",
        ],
      },
      {
        title: "Hvorfor er omregning mellem energienheder vigtig?",
        paragraphs: [
          "Forskellige brancher foretrækker traditionelt forskellige energienheder: elektroteknik bruger kilowattime, ernæringsvidenskab kilokalorie, HVAC-branchen BTU, og naturgasbranchen therm. Korrekt omregning mellem disse forskellige enheder er afgørende for energieffektivitetssammenligninger og omkostningsberegninger.",
          "For at sammenligne effektiviteten af en varmepumpe med en naturgaskedel skal man for eksempel omregne begges energiforbrug til en fælles enhed (sædvanligvis kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Videnskabelige og fysiske energiberegninger" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrisk", commonUse: "Madenergi (i enkelte lande)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrisk", commonUse: "Brændstof og store energimængder" },
      { name: "Kalorie", symbol: "cal", referenceValue: "4,184 J", system: "Metrisk (traditionel)", commonUse: "Ernæring og kemi" },
      { name: "Kilokalorie", symbol: "kcal", referenceValue: "4184 J", system: "Metrisk (traditionel)", commonUse: "Madvareetiketter ('kalorier')" },
      { name: "Wattime", symbol: "Wh", referenceValue: "3600 J", system: "Metrisk (elektrisk)", commonUse: "Energiforbrug for små apparater" },
      { name: "Kilowattime", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrisk (elektrisk)", commonUse: "Elfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britisk/amerikansk", commonUse: "Klima- og opvarmningskapacitet" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britisk/amerikansk", commonUse: "Naturgasfakturering" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikelfysik", commonUse: "Atomaer og nuklear energimåling" },
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
      "Dataenheden beskriver mængden af information, der er lagret eller behandlet i et computersystem. Den mest grundlæggende enhed er bitten; otte bit tilsammen udgør en byte.",
      "Når man taler om lagring og internethastighed, bruges både decimale (1000-baserede) enheder som kilobyte, megabyte, gigabyte og terabyte, samt binære (1024-baserede) enheder, som styresystemer bruger, som kibibyte, mebibyte og gibibyte -- forskellen mellem disse to systemer er hovedgrunden til, at en købt disk kan virke 'mindre' end forventet.",
    ],
    facts: [
      { label: "Mindste enhed", value: "Bit (0 eller 1)" },
      { label: "Grundenhed", value: "Byte = 8 bit" },
      { label: "Decimalt (SI) system", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binært (IEC) system", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Forskellen mellem 1000 og 1024", value: "≈ 7,4 % forskel mellem 1 GB (decimal) og 1 GiB (binær)" },
    ],
    sections: [
      {
        title: "Hvad er bit og byte?",
        paragraphs: [
          "Bit (binary digit) er den mindste informationsenhed, en computer kan behandle, og kan kun have to værdier: 0 eller 1. Otte bit udgør en byte; en byte kan repræsentere 256 (2⁸) forskellige værdier -- tilstrækkeligt til for eksempel at kode et tegn i en tekst.",
          "Bit forkortes sædvanligvis med lille 'b', og byte med stort 'B'; denne sondring kan særligt skabe forvirring mellem internethastigheder (Mbps = megabit per sekund) og filstørrelser (MB = megabyte) -- en internetforbindelse på 100 Mbps svarer i teorien til en downloadhastighed på omkring 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Hvorfor findes der to forskellige enhedssystemer?",
        paragraphs: [
          "Fordi computere arbejder i det binære system, er hukommelsesadressering naturligt knyttet til potenser af 2 (som 1024, 1048576). Derfor har softwareverdenen historisk ment 1024 byte, når man har sagt 'kilobyte'.",
          "Diskproducenter foretrækker derimod det decimale (1000-baserede) SI-præfiks af markedsførings- og beregningshensyn -- en disk, en producent kalder '1 TB', er i realiteten nøjagtigt 1 000 000 000 000 byte, men fordi styresystemet regner ud fra base 1024, viser skærmen et mindre tal som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "For at rydde op i denne forvirring standardiserede Den Internationale Elektrotekniske Kommission (IEC) i 1998 separate navne (kibibyte, mebibyte, gibibyte, tebibyte) og symboler (KiB, MiB, GiB, TiB) for binærbaserede enheder.",
          "Ifølge denne standard bør traditionelle præfikser som KB/MB/GB kun bruges i 1000-baseret (decimal) betydning, mens 'binære' præfikser som KiB/MiB/GiB bør bruges til 1024-baserede værdier. I dagligbrug og i meget software er denne sondring dog stadig ikke konsekvent anvendt.",
        ],
      },
      {
        title: "Hvorfor øges forskellen mellem 1000 og 1024?",
        paragraphs: [
          "På kilobyte-niveau (1000 mod 1024) er forskellen kun 2,4 %, men denne forskel øges for hver højere enhed: på megabyte-niveau ≈ 4,9 %, på gigabyte-niveau ≈ 7,4 %, og på terabyte-niveau når den 10 %.",
          "Derfor bliver forskellen mellem decimal og binær beregning ved store lagringskapaciteter (som en disk på 1 TB) så stor, at brugeren mærkbart oplever at have 'mindre plads' end forventet (omkring 90 GB forskel).",
        ],
      },
      {
        title: "Bitbaserede dataenheder: kilobit, megabit, gigabit",
        paragraphs: [
          "Internetudbydere udtrykker sædvanligvis forbindelseshastighed med bitbaserede enheder (kilobit/sekund, megabit/sekund, gigabit/sekund); dette er en historisk tradition inden for netværksteknik.",
          "Da brugere ofte forventer downloadhastigheden i byte (MB/sekund), kan det at ikke vide, at en '100 Mbps'-forbindelse faktisk giver en downloadhastighed på omkring 12,5 MB/sekund, føre til en fejlagtig opfattelse af, at forbindelsen er 'langsom'.",
        ],
      },
      {
        title: "Datastørrelser i dagligdagen",
        paragraphs: [
          "Et tekstdokument (en side) er typisk nogle få kilobyte, et komprimeret fotografi (JPEG) nogle få megabyte, og en komprimeret musikfil (MP3) i gennemsnit 3-5 megabyte.",
          "En film i standardopløsning (HD) kan fylde omkring 1-4 gigabyte, mens en film i 4K-opløsning kan fylde 15-25 gigabyte; disse forskelle varierer afhængigt af opløsning og komprimeringsmetode.",
        ],
      },
      {
        title: "Historien om dataenheden",
        paragraphs: [
          "Den første harddisk, IBM lancerede i 1956 (RAMAC 305), havde en kapacitet på omkring 3,75 megabyte og var stor nok til at fylde et rum. I dag kan et microSD-kort rumme millioner gange denne kapacitet i håndfladestørrelse.",
          "Denne enorme kapacitetsstigning hænger tæt sammen både med fremskridt inden for lagringsteknologi (som overgangen fra magnetiske diske til flashhukommelse) og med den kontinuerlige nedgang i omkostning per enhed.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binær", commonUse: "Netværkshastighed (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grundenhed", commonUse: "Grundlæggende enhed for filstørrelse" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimal (SI)", commonUse: "Tekstdokumenter" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binær (IEC)", commonUse: "Hukommelsesvisning i styresystem" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Decimal (SI)", commonUse: "Billed- og musikfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binær (IEC)", commonUse: "RAM-kapacitet (hukommelse)" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Decimal (SI)", commonUse: "Diskkapacitet (producentmærkning)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binær (IEC)", commonUse: "Diskvisning i styresystem" },
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
      "Elektricitet er et bredt fagområde bestående af størrelser, der er beslægtede, men alligevel forskellige: spænding (potentialforskel) og strøm (ladningsstrøm). Denne kategori samler de to grundlæggende størrelser, man oftest møder i dagligt elektrisk arbejde -- volt (spænding) og ampere (strøm).",
      "Spænding og strøm er ikke samme fysiske størrelse, og de kan ikke omregnes direkte til hinanden; forholdet mellem dem etableres af Ohms lov (V = I × R), afhængigt af modstanden i kredsløbet. Omregningerne på denne side behandler hver størrelse for sig (volt-kilovolt, ampere-milliampere).",
    ],
    facts: [
      { label: "Navnet på spændingsenheden", value: "Volt (efter Alessandro Volta)" },
      { label: "Navnet på strømenheden", value: "Ampere (efter André-Marie Ampère)" },
      { label: "SI-grundenhed (strøm)", value: "Ampere (A) -- en af SIs 7 grundenheder" },
      { label: "Forholdet mellem spænding, strøm og modstand", value: "Ohms lov: V = I × R" },
      { label: "Netspænding i Danmark", value: "230 V (enfase), 400 V (trefase)" },
    ],
    sections: [
      {
        title: "Hvad er spænding (volt)?",
        paragraphs: [
          "Spænding beskriver den elektriske potentialforskel mellem to punkter i et elektrisk kredsløb, og kan tænkes på som den 'drivende kraft', der får elektroner til at strømme fra et punkt til et andet. SI-enheden er volt (V).",
          "Enheden volt er opkaldt efter den italienske fysiker Alessandro Volta, som opfandt det elektriske batteri. Værdier som '1,5 V' eller '9 V' på et batteri angiver den potentialforskel, batteriet kan levere.",
        ],
      },
      {
        title: "Hvad er strøm (ampere)?",
        paragraphs: [
          "Elektrisk strøm beskriver mængden af elektrisk ladning, der passerer gennem en leder per tidsenhed, og SI-enheden er ampere (A). En ampere svarer til omkring 6,242 × 10¹⁸ elektroner, der passerer et punkt per sekund.",
          "Enheden ampere er opkaldt efter den franske fysiker André-Marie Ampère, en af grundlæggerne af elektromagnetismen. Før SI-revisionen i 2019 var ampere en af SIs grundenheder; den regnes stadig for en grundlæggende størrelse, men defineres nu ud fra den elementære elektriske ladningskonstant (e).",
        ],
      },
      {
        title: "Hvorfor kan spænding og strøm ikke omregnes til hinanden?",
        paragraphs: [
          "Spænding (V) og strøm (A) er forskellige fysiske størrelser -- den ene udtrykker potentialforskel, den anden ladningsstrømningshastighed. Derfor har spørgsmålet 'hvor mange ampere svarer X volt til' alene ikke noget svar uden at kende modstanden (eller effekten) i kredsløbet.",
          "Forholdet mellem de to etableres af Ohms lov: V = I × R (spænding = strøm × modstand). For eksempel skaber en spænding på 12 volt gennem en modstand på 4 ohm en strøm på 3 ampere; men de samme 12 volt giver en helt anden strøm ved en anden modstand.",
        ],
      },
      {
        title: "Sammenhængen mellem effekt, spænding og strøm",
        paragraphs: [
          "Elektrisk effekt (watt) er lig produktet af spænding og strøm: P = V × I. Denne formel viser, at et apparat med samme effekt trækker lavere strøm ved høj spænding, og højere strøm ved lav spænding.",
          "Dette forhold forklarer, hvorfor elektriske distributionsnet arbejder med høj spænding: at overføre samme effekt med lavere strøm reducerer betydeligt energitabet (Joule-opvarmning), der skyldes modstand i overføringslinjerne.",
        ],
      },
      {
        title: "Netspænding i Danmark og verden",
        paragraphs: [
          "I Danmark er standard netspænding i boliginstallationer 230 V, og for trefasesystemer, der bruges i industrielle og kommercielle installationer, 400 V, med en frekvens på 50 Hz.",
          "Netspændingen varierer fra land til land i verden; lande som USA og Canada bruger 120 volt, mens det meste af Europa, deriblandt Danmark, foretrækker 230 volt. Denne forskel er hovedgrunden til, at elektriske apparater medbragt fra udlandet ikke kan bruges direkte uden en omformer.",
        ],
      },
      {
        title: "Jævnstrøm (DC) og vekselstrøm (AC)",
        paragraphs: [
          "I jævnstrøm (DC) strømmer elektronerne konstant i en retning -- batterier og solceller producerer DC. I vekselstrøm (AC) skifter derimod strømretningen med en bestemt frekvens per sekund (50 Hz i Danmark, altså 50 gange per sekund) -- netstrømmen er AC.",
          "Hovedgrunden til, at AC foretrækkes i netdistribution, er, at transformatorer nemt kan hæve og sænke spændingen; dette gør det muligt at overføre elektricitet over lange afstande med lavt tab.",
        ],
      },
      {
        title: "Elektrisk strøms virkning på menneskekroppen",
        paragraphs: [
          "Størrelsen af den strøm, der går gennem menneskekroppen, afgør, hvilken effekt man mærker: omkring 1 milliampere mærkes svagt, 10-20 milliampere kan give muskelsammentrækning (manglende evne til at slippe taget), og over 100 milliampere kan føre til hjerterytmeforstyrrelse (fibrillering) og død.",
          "Derfor er det ikke kun spændingen, men også størrelsen af den strøm, der kan opstå i kredsløbet, der er afgørende for elektrisk sikkerhed -- selv i lavspændte, men lavohmige (for eksempel fugtige) omgivelser kan der opstå farligt høj strøm.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrisk", commonUse: "Sensor- og bioelektriske signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batteri-, net- og kredsløbsspænding" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrisk", commonUse: "Højspændte overføringslinjer" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrisk", commonUse: "Elektroniske kredsløbsstrømme" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Boliginstallation og apparatstrøm" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrisk", commonUse: "Kortslutnings- og industristrømme" },
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
      "Guld bruges næsten aldrig i ren form til smykker og guldvarer -- fordi det er et meget blødt og let ridset metal, blandes det med metaller som sølv og kobber til en legering. Karat (guldkarat) er målet, der viser andelen af rent guld i denne legering.",
      "Skalaen går over 24: 24 karat betyder helt rent guld (100 %), mens 22 karat betyder, at 22/24 (omkring 91,6 %) af legeringen er rent guld. Omregningen her beregner gramækvivalenten mellem guld af forskellig karat baseret på indholdet af rent guld -- det vil sige, ikke 'at udtrykke samme fysiske størrelse med en anden enhed', men 'at finde den tilsvarende værdi af samme legering ved forskellig renhedsgrad'.",
    ],
    facts: [
      { label: "Målesystem", value: "Guldsmedstandard for renhed (karat)" },
      { label: "Grundreference", value: "24 karat = 100 % rent guld" },
      { label: "Mest almindelige karat i Tyrkiet", value: "22 karat (armbånd, traditionelle smykker)" },
      { label: "International dagligbrug", value: "18 karat (ring, kæde)" },
      { label: "Beregningslogik", value: "Gram × (kildekarat / 24) ÷ (målkarat / 24)" },
    ],
    sections: [
      {
        title: "Hvad måler karat egentlig?",
        paragraphs: [
          "Karat viser, hvor meget af vægten af et guldstykke der faktisk er guld. 24 karat er rent guld; 22, 18 og 14 karat er guld, der er blandet med henholdsvis sølv/kobber i stigende grad, og dermed hårdere og mindre rent.",
          "Derfor kan vi sige, at et armbånd på 22 karat har et lidt 'lettere' indhold af rent guld end 24 karat, men er mere holdbart -- dette er grunden til, at guldsmede ofte foretrækker 22 karat til armbånd, og gerne 18 karat til ringe/kæder.",
        ],
      },
      {
        title: "Hvordan beregnes indholdet af rent guld?",
        paragraphs: [
          "For at finde mængden af rent guld i et armbånd på 10 gram, 22 karat: 10 × (22 / 24) = 9,17 gram svarer til rent (24-karats ekvivalent) guld. De resterende omkring 0,83 gram er andre metaller tilføjet for holdbarhed.",
          "Omvendt: hvis en guldsmed skulle smelte disse 9,17 gram rent guld om til 18 karat, ville han få: 9,17 ÷ (18 / 24) = 12,22 gram total legering -- fordi andelen af rent guld er lavere ved 18 karat, fordeler samme mængde rent guld sig over en større totalvægt.",
        ],
      },
      {
        title: "Hvilken karat bruges til hvad?",
        paragraphs: [
          "24 karat bruges næsten aldrig i dagligsmykker på grund af blødheden; det foretrækkes hovedsageligt til guldbarrer og investeringsprodukter. 22 karat er standarden for armbånd og traditionelle smykker i Tyrkiet og Mellemøsten.",
          "18 karat er udbredt over hele verden i dagligbrugssmykker som diamantringe og kæder, da det har høj holdbarhed. 14 karat er mere økonomisk og endnu mere holdbart, og er særligt almindeligt på det amerikanske og europæiske marked.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat guld", symbol: "24K", referenceValue: "100 % rent guld", system: "Guldsmedstandard", commonUse: "Guldbarrer, investeringsguld" },
      { name: "22 karat guld", symbol: "22K", referenceValue: "91,6 % rent guld (22/24)", system: "Guldsmedstandard", commonUse: "Armbånd, traditionelle smykker" },
      { name: "18 karat guld", symbol: "18K", referenceValue: "75 % rent guld (18/24)", system: "Guldsmedstandard", commonUse: "Ring, kæde, dagligsmykker" },
      { name: "14 karat guld", symbol: "14K", referenceValue: "58,3 % rent guld (14/24)", system: "Guldsmedstandard", commonUse: "Økonomiske smykker, USA/Europa-markedet" },
    ],
  },
  {
    locale: "da",
    slug: "solvindhold",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omregn sølvindhold",
    description:
      "Omregn gratis og direkte mellem 999, 925, 900 og 800 sølv; se formler og tabeller.",
    introduction: [
      "Sølv bruges, ligesom guld, næsten aldrig i ren form til smykker eller genstande -- fordi det er et blødt metal, blandes det med andre metaller som kobber til en legering. Millesimal (finhed i tusindedele) er målet, der viser andelen af rent sølv i denne legering.",
      "I modsætning til guldkarat udtrykkes sølvrenhed ikke over 24, men over 1000 (i tusindedele): 999 er næsten fuldstændig rent sølv, mens 925 er den mest udbredte smykkestandard i verden, kendt som 'sterlingsølv'.",
    ],
    facts: [
      { label: "Målesystem", value: "Millesimalsystem (finhed i tusindedele)" },
      { label: "Grundreference", value: "999 = 99,9 % rent sølv" },
      { label: "Mest udbredte smykkestandard i verden", value: "925 (sterlingsølv)" },
      { label: "Sølv til barrer/investering", value: "999 finhed (fine silver)" },
      { label: "Beregningslogik", value: "Gram × (kildefinhed / 1000) ÷ (målfinhed / 1000)" },
    ],
    sections: [
      {
        title: "Hvad måler sølvfinheden (millesimal) egentlig?",
        paragraphs: [
          "I modsætning til guld udtrykkes sølvrenhed ikke over 24 enheder, men i tusindedele (millesimal, over 1000). 999 finhed betyder, at 999 af 1000 dele (altså 99,9 %) af legeringen er rent sølv; den resterende ene del er som regel sporstoffer af andre grundstoffer.",
          "925 finhed (sterlingsølv) betyder, at 92,5 % af legeringen er rent sølv, og de resterende 7,5 % som regel er kobber. Denne lille mængde kobber giver det rene sølv, som ellers er meget blødt og let deformerbart, øget holdbarhed.",
        ],
      },
      {
        title: "Hvorfor er sterlingsølv (925) verdensstandarden?",
        paragraphs: [
          "925 finhed sterlingsølv-standarden har rødder helt tilbage til 1100-tallet i England, og er over tid blevet den mest accepterede standard verden over til produktion af smykker, bestik og sølvtøj.",
          "Rent sølv (999) er for blødt og let at ridse til daglig brug; at tilføje omkring 7,5 % kobber giver sølvet tilstrækkelig hårdhed, samtidig med at det i vid udstrækning bevarer sølvets karakteristiske glans og farve.",
        ],
      },
      {
        title: "Forskellene mellem 999, 900 og 800 finhed sølv",
        paragraphs: [
          "999 finhed (fine silver/rent sølv) foretrækkes til barrer og investeringsprodukter i sølv, fordi renhedsgraden er det vigtigste kriterium for investorer; men på grund af blødheden bruges det sjældent i dagligsmykker.",
          "900 finhed (coin silver) er historisk brugt i sølvmønter i mange lande. 800 finhed er en smykkestandard, der særligt er udbredt i Europa (som Tyskland og Østrig) og har lavere renhed end sterlingsølv, men er alligevel holdbar.",
        ],
      },
      {
        title: "Hvordan beregnes indholdet af rent sølv?",
        paragraphs: [
          "For at finde mængden af rent sølv i en sølvring på 10 gram, 925 finhed: 10 × (925 / 1000) = 9,25 gram rent sølv. De resterende 0,75 gram er kobber eller andre metaller tilføjet for holdbarhed.",
          "Samme logik bruges ved omregning mellem forskellige finheder: hvis mængden af rent sølv i en legering på 925 finhed er kendt, finder man 999-finhedsekvivalenten ved at dividere mængden af rent sølv med 999/1000.",
        ],
      },
      {
        title: "Sammenhængen mellem anløbning og renhed i sølv",
        paragraphs: [
          "At sølvsmykker anløber (mister glansen) over tid, skyldes ikke sølvet selv, men at kobberet i legeringen reagerer med svovlforbindelser i luften. Derfor har sølv med højere renhed (som 999) mindre tendens til at anløbe.",
          "Enkelte producenter har udviklet 'anløbningsbestandige' sterlingsølvlegeringer for at forbedre denne egenskab, ved at bruge andre tilsætningsstoffer, som germanium, i stedet for kobber.",
        ],
      },
    ],
    unitTable: [
      { name: "999 finhed sølv", symbol: "999", referenceValue: "99,9 % rent sølv", system: "Guldsmedstandard", commonUse: "Barrer, investeringssølv" },
      { name: "925 finhed sølv", symbol: "925", referenceValue: "92,5 % rent sølv (sterling)", system: "Guldsmedstandard", commonUse: "Smykker og bestik (verdensstandard)" },
      { name: "900 finhed sølv", symbol: "900", referenceValue: "90 % rent sølv", system: "Guldsmedstandard", commonUse: "Historiske sølvmønter" },
      { name: "800 finhed sølv", symbol: "800", referenceValue: "80 % rent sølv", system: "Guldsmedstandard (Europa)", commonUse: "Europæisk smykkestandard" },
    ],
  },
];

export function findDanishCategoryPage(slug: string) {
  return danishCategoryPages.find((page) => page.slug === slug);
}

export function findDanishCategoryPageByTurkishSlug(sourceSlug: string) {
  return danishCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
