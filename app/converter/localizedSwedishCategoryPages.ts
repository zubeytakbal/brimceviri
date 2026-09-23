// Svenska kategorisidor -- integrerade i det nya i18n-systemet.
// Fristaende, nytt fil (andrar inga befintliga tr/en/de/ar/uz/bn/fr/es/pt/it/nl-filer).
//
// Medvetet begransat till de 17 element som utgor sidans identitet
// (13 karnkategorier + 4 universella verktyg pa startsidan) -- inga
// vetenskapliga eller vardagliga raknare. Innehall oversatt med samma
// djup som TR-kallartiklarna (app/converter/categoryArticles.ts och
// app/converter/articles/*/Article.ts).

export type LocalizedSwedishCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedSwedishCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedSwedishCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedSwedishCategoryPage = {
  locale: "sv";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedSwedishCategoryFact[];
  sections: LocalizedSwedishCategorySection[];
  unitTable: LocalizedSwedishCategoryUnitRow[];
};

export const swedishCategoryPages: LocalizedSwedishCategoryPage[] = [
  {
    locale: "sv",
    slug: "langd",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Omvandla langdenheter",
    description:
      "Omvandla gratis och direkt mellan meter, kilometer, centimeter, mil och fot; se formler och tabeller.",
    introduction: [
      "Langd ar en av de grundlaggande fysikaliska storheterna som beskriver hojden, bredden eller tjockleken hos ett foremal, eller avstandet mellan tva punkter. Beroende pa vilken riktning som mats kan samma foremal ha flera olika langdvarden.",
      "Inom fysiken representeras langd vanligtvis med dimensionssymbolen L. Manga harledda storheter, som area, volym, hastighet, acceleration, tryck och densitet, definieras utifran dimensionen langd.",
      "I det Internationella Enhetssystemet (SI) ar langdens grundenhet metern (m). Beroende pa storleken pa det avstand som mats anvands nanometer, mikrometer, millimeter, centimeter, meter eller kilometer. Utanfor det metriska systemet anvands fortfarande tum, fot, yard och engelsk mil, sarskilt i USA och Storbritannien.",
    ],
    facts: [
      { label: "SI-grundenhet", value: "Meter" },
      { label: "Symbol for SI-enhet", value: "m" },
      { label: "Fysikalisk storhet", value: "Langd" },
      { label: "Dimensionssymbol", value: "L" },
      { label: "Nuvarande definition av metern", value: "Strackan ljus fardas i vakuum pa 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Vad ar langd?",
        paragraphs: [
          "Langd beskriver hojden, bredden eller djupet hos ett foremal, eller avstandet mellan tva punkter; det ar en av de grundlaggande fysikaliska storheterna. Beroende pa vilken riktning som mats kan samma foremal uppvisa flera langdvarden.",
          "Inom fysiken representeras langd vanligtvis med dimensionssymbolen L. Manga harledda storheter, som area, volym, hastighet, acceleration, tryck och densitet, definieras utifran dimensionen langd.",
        ],
      },
      {
        title: "SI-enheten for langd",
        paragraphs: [
          "I det Internationella Enhetssystemet ar langdens grundenhet metern, med symbolen m. Metern fungerar som grundlaggande referens for att definiera alla andra langdenheter.",
          "Metriska enheter som kilometer, centimeter, millimeter, mikrometer och nanometer ar kopplade till metern via decimala multipler och delar. Denna struktur gor det mojligt att omvandla mellan metriska enheter med tiopotenser.",
        ],
      },
      {
        title: "Den vetenskapliga definitionen av metern",
        paragraphs: [
          "Tidigare definierades metern utifran jordens dimensioner och fysiska prototyper. I takt med matteknikens utveckling blev en mer stabil definition, som kan reproduceras overallt i varlden, nodvandig.",
          "Idag definieras en meter som langden pa den strackan ljus tillryggalagger i vakuum under ett tidsintervall pa 1/299 792 458 sekund. Denna definition bygger pa att ljushastigheten i vakuum ar exakt fastslagen till 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "De metriska langdenheterna",
        paragraphs: [
          "I det metriska systemet ar enheterna kopplade till metern via positiva eller negativa tiopotenser. En kilometer motsvarar 1000 meter, en centimeter 0,01 meter och en millimeter 0,001 meter.",
          "For mycket sma langder anvands mikrometer, nanometer och pikometer. Celler mats ofta i mikrometer, ljusets vaglangder i nanometer och vissa avstand pa atomskala i pikometer.",
        ],
      },
      {
        title: "Langdenheter utanfor det metriska systemet",
        paragraphs: [
          "Tum, fot, yard och engelsk mil ar vanliga langdenheter utanfor det metriska systemet. De anvands framst i det amerikanska matsystemet och i vissa tillampningar kopplade till brittisk tradition.",
          "En tum motsvarar exakt 2,54 centimeter, en fot 12 tum och en yard 3 fot. En engelsk mil ar exakt definierad som 1609,344 meter.",
        ],
      },
      {
        title: "Langd inom sjofart och luftfart",
        paragraphs: [
          "Inom sjofart och luftfart uttrycks avstand vanligtvis i nautiska mil. En nautisk mil motsvarar exakt 1852 meter.",
          "Den nautiska milen har sitt ursprung i en historisk matmetod kopplad till jordens geografiska koordinater. Hastighetsenheten knop betyder ocksa en nautisk mil per timme.",
        ],
      },
      {
        title: "Hur mats langd?",
        paragraphs: [
          "Vid vardagliga matningar anvands verktyg som linjal, mattband, skjutmatt och mikrometer. Precisionen hos det valda instrumentet beror pa storleken pa det foremal som ska matas och den precisionsniva som kravs.",
          "Inom teknik och vetenskaplig forskning kan laseravstandsmatare, koordinatmatmaskiner, interferometer och olika optiska matsystem anvandas.",
        ],
      },
      {
        title: "Matnoggrannhet och osakerhet",
        paragraphs: [
          "Ingen fysisk matning ar helt perfekt. Resultatet av en matning innebar alltid en viss osakerhet pa grund av instrumentets upplosning, dess kalibrering, omgivningsforhallanden och den anvanda metoden.",
          "Darfor ar det lampligt att i vetenskapliga resultat inte bara ange det uppmatta vardet, utan aven matosakerheten och den anvanda enheten. Sarskilt inom precisionsteknik kan aven en temperaturvariation paverka langden hos ett material.",
        ],
      },
      {
        title: "Hur omvandlas langdenheter?",
        paragraphs: [
          "Vid omvandlingar inom samma matsystem anvands forhallandet mellan enheterna. For att till exempel omvandla meter till kilometer delar man vardet med 1000; for att omvandla kilometer till meter multiplicerar man vardet med 1000.",
          "Vid omvandlingar mellan det metriska systemet och brittiska eller amerikanska enheter maste de exakt definierade omvandlingsfaktorerna anvandas. For att till exempel omvandla tum till centimeter multiplicerar man vardet med 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metriskt", commonUse: "Vaglangd for ljus och nanoteknik" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metriskt", commonUse: "Celler, partiklar och precisionstillverkning" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metriskt", commonUse: "Tekniska ritningar och sma matt" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metriskt", commonUse: "Matning av vardagliga foremal" },
      { name: "Decimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metriskt", commonUse: "Undervisning och vissa volymberakningar" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grundlaggande langdmatningar" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metriskt", commonUse: "Vag- och geografiska avstand" },
      { name: "Tum", symbol: "in", referenceValue: "0,0254 m", system: "Brittiskt/amerikanskt", commonUse: "Skarmar, rorledningar och tekniska matt" },
      { name: "Fot", symbol: "ft", referenceValue: "0,3048 m", system: "Brittiskt/amerikanskt", commonUse: "Kroppslangd, byggnation och luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Brittiskt/amerikanskt", commonUse: "Idrottsplaner och avstandsmatning" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Brittiskt/amerikanskt", commonUse: "Vagavstand" },
      { name: "Nautisk mil", symbol: "nmi", referenceValue: "1852 m", system: "Sjofart", commonUse: "Sjofart och luftfart" },
    ],
  },
  {
    locale: "sv",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Omvandla areaenheter",
    description:
      "Omvandla area mellan kvadratmeter, hektar och kvadratfot; for berakningar av mark, byggnader och byggnation.",
    introduction: [
      "Area ar en harledd fysikalisk storhet som uttrycker utstrackningen av ett tvadimensionellt omrade. Eftersom den ar produkten av en langd med en annan langd i samma enhet, ar areans dimension alltid 'langd i kvadrat' (L²).",
      "I det Internationella Enhetssystemet ar areans harledda enhet kvadratmeter (m²). Inom jordbruket och for mark anvands hektar och lokala enheter i stor utstrackning; i det brittiska/amerikanska systemet kvadratfot och acre; i Sydasien ar lokala enheter som bigha och katha ocksa vanliga.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Area" },
      { label: "Dimensionssymbol", value: "[L²]" },
      { label: "Harledd SI-enhet", value: "Kvadratmeter" },
      { label: "Symbol for SI-enhet", value: "m²" },
      { label: "Grundformel (rektangel)", value: "Area = Langd × Bredd" },
    ],
    sections: [
      {
        title: "Vad ar area?",
        paragraphs: [
          "Area uttrycker utstrackningen av ett plant eller projicerat omrade. Storleken pa en markyta, golvet i ett rum eller ett pappersark mats i area.",
          "Area ar en harledd storhet: den fas genom att multiplicera en grundlangdenhet med sig sjalv. Darfor ar SI-dimensionen for area L² (langd i kvadrat), och area ar alltid en positiv skalar storhet.",
        ],
      },
      {
        title: "SI-enheten for area: kvadratmetern",
        paragraphs: [
          "I det Internationella Enhetssystemet ar areans harledda enhet kvadratmeter (m²), som representerar arean hos en kvadrat vars sida ar exakt 1 meter.",
          "Kvadratmetern ar inte en oberoende grundenhet, utan en harledd enhet som fas genom att kvadrera langdenheten (metern). Alla andra metriska areaenheter (kvadratcentimeter, kvadratkilometer, osv.) ar kopplade till kvadratmetern via decimala potenser.",
        ],
      },
      {
        title: "Varfor omvandlas areaenheter med ett kvadratiskt forhallande?",
        paragraphs: [
          "Vid omvandling av langdenheter maste det anvanda forhallandet kvadreras for areaenheter. Till exempel motsvarar 1 kilometer 1000 meter, men 1 kvadratkilometer motsvarar inte 1000 kvadratmeter, utan 1000², det vill saga 1 000 000 kvadratmeter.",
          "Detta beror pa att bade dimensionerna (langd och bredd) okar eller minskar i samma proportion for en area. Att ignorera detta kvadratiska samband ar det vanligaste rakenfelet vid areaomvandlingar -- antagandet att '1 km² = 1000 m²' ar en vanlig missuppfattning.",
        ],
      },
      {
        title: "De metriska areaenheterna",
        paragraphs: [
          "I det metriska systemet anvands kvadratmillimeter och kvadratcentimeter for sma ytor, kvadratmeter for vardagliga matningar och kvadratkilometer for stora omraden. En kvadratcentimeter motsvarar 0,0001 kvadratmeter, och en kvadratkilometer 1 000 000 kvadratmeter.",
          "For att mata mark anvands ar (100 m²) och dess 100 ganger storre multipel, hektar (10 000 m²). Hektar ar den mest anvanda metriska markenheten i varlden for att uttrycka arean pa jordbruksmark.",
        ],
      },
      {
        title: "Traditionella markenheter i Turkiet",
        paragraphs: [
          "I Turkiet ar dönüm och dekar de mest anvanda enheterna for att mata jordbruksmark; bada motsvarar idag 1000 kvadratmeter och ar utbytbara. Dekar ar det officiella namnet i lagstiftningen om matt och vikt, medan dönüm ar den traditionella motsvarigheten i vardagssprak.",
          "Under den osmanska tiden varierade storleken pa dönüm mellan 900 och 1600 m² beroende pa region. Med 1931 ars lag om matt och vikt jamstalldes dönüm med dekar och standardiserades exakt till 1000 m².",
        ],
      },
      {
        title: "Areaenheterna i det brittiska/amerikanska systemet",
        paragraphs: [
          "Kvadratfot (ft²) och kvadrattum (in²) anvands for sma ytor, medan acre anvands for stora markomraden i det brittiska/amerikanska matsystemet. En acre motsvarar exakt 4046,8564224 kvadratmeter.",
          "Acres historiska ursprung gar tillbaka till den markyta ett par oxar kunde plojja pa en dag. Den anvands fortfarande i stor utstrackning i fastighetsannonser i USA, Storbritannien och vissa lander inom Samvaldet.",
        ],
      },
      {
        title: "Markenheterna i Sydasien",
        paragraphs: [
          "I lander som Indien, Bangladesh, Pakistan och Nepal anvands lokala markenheter som bigha, katha, killa, kanal, marla, guntha, biswa och decimal fortfarande i stor utstrackning. Storleken pa dessa enheter kan variera betydligt fran region till region, aven med samma namn.",
          "En bigha motsvarar till exempel cirka 1338 m² i Vastbengalen, men kan ha ett annat varde i en annan delstat. Darfor ar det viktigt vid fastighetstransaktioner med dessa enheter att bekrafta vilken regional standard som anvands.",
        ],
      },
      {
        title: "Hur beraknar man en area?",
        paragraphs: [
          "For en rektangular yta ar formeln Area = Langd × Bredd. For en triangel anvands Area = (Bas × Hojd) / 2, och for en cirkel, Area = π × Radie².",
          "For oregelbundet formad mark beraknas arean vanligtvis genom att dela upp formen i mindre rektanglar eller trianglar, berakna arean for varje del separat och addera dem (eller, vid fastighetsmatningar, via areaformler for polygoner baserade pa koordinater).",
        ],
      },
      {
        title: "Att tanka pa vid arematning",
        paragraphs: [
          "Areavardet i en fastighetsannons eller ett dokument maste tolkas utifran den anvanda enheten (m², dönüm, acre, bigha, osv.) och den regionala standard som den enheten definieras med.",
          "Sarskilt vid internationella fastighetstransaktioner minskar det missforstand att beakta den exakta motsvarigheten i kvadratmeter istallet for bara likheten i enhetens namn; omvandlingsverktyget pa denna sida jamfor alla enheter utifran en gemensam referens i kvadratmeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metriskt", commonUse: "Tekniska ritningar och sma ytor" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metriskt", commonUse: "Area for sma foremal" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Area for bostader, kontor och mark" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metriskt", commonUse: "Sma markomraden" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turkiet (metriskt)", commonUse: "Matning av jordbruksmark" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metriskt", commonUse: "Stor jordbruks- och skogsmark" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metriskt", commonUse: "Stader, lander och geografiska omraden" },
      { name: "Kvadratfot", symbol: "ft²", referenceValue: "0,092903 m²", system: "Brittiskt/amerikanskt", commonUse: "Bostadsarea (USA/UK)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Brittiskt/amerikanskt", commonUse: "Idrottsplaner och textil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Brittiskt/amerikanskt", commonUse: "Stora markomraden" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierar per region)", system: "Sydasien", commonUse: "Jordbruksmark i Indien/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Matning av bostader och mark i Japan" },
    ],
  },
  {
    locale: "sv",
    slug: "volym",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Omvandla volymenheter",
    description:
      "Omvandla volym mellan liter, milliliter och kubikmeter; jamfor vanliga enheter for vatskor och behallare.",
    introduction: [
      "Volym ar en harledd fysikalisk storhet som uttrycker det utrymme som ett tredimensionellt foremal eller en behallare upptar eller rymmer. Eftersom den ar produkten av en langdenhet i tre dimensioner (langd × bredd × hojd), ar volymens dimension L³ (langd upphojt till tre).",
      "I det Internationella Enhetssystemet ar volymens harledda enhet kubikmeter (m³); i vardagslivet anvands liter och milliliter mycket mer. I koket ar kopp, matsked och tesked vanliga, och i det amerikanska/brittiska systemet gallon, quart, pint och vatskeuns.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Volym" },
      { label: "Dimensionssymbol", value: "[L³]" },
      { label: "Harledd SI-enhet", value: "Kubikmeter" },
      { label: "Symbol for SI-enhet", value: "m³" },
      { label: "Vanligaste enheten i vardagsbruk", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Vad ar volym?",
        paragraphs: [
          "Volym ar storleken pa det tredimensionella utrymme som ett foremal upptar eller som en behallare kan rymma. Volymen hos ett fast foremal uttrycker dess fysiska storlek, medan volymen hos en behallare uttrycker mangden vatska eller gas den kan innehalla.",
          "Volym ar en harledd storhet, som fas genom att multiplicera en langdenhet i tre dimensioner (bredd, hojd, djup). Darfor ar dess SI-dimension L³.",
        ],
      },
      {
        title: "SI-enheten for volym: kubikmetern",
        paragraphs: [
          "I det Internationella Enhetssystemet ar volymens harledda enhet kubikmeter (m³), som representerar innehallet i en kub vars sida ar exakt 1 meter.",
          "Kubikmetern anvands for stora volymer (vattentankar, betonggjutningar, containervolym), medan man i vardagslivet foredrar den mycket mindre litern. En kubikmeter motsvarar exakt 1000 liter.",
        ],
      },
      {
        title: "Sambandet mellan liter och kubikmeter",
        paragraphs: [
          "Liter ar en praktisk volymenhet vars anvandning tillsammans med SI ar tillaten, aven om den officiellt inte ar en SI-enhet. En liter motsvarar volymen hos en kub med en sida pa 10 centimeter (1000 kubikcentimeter).",
          "Literns underenheter -- deciliter, centiliter och milliliter -- anvands i stor utstrackning vid matningar av mat, lakemedel och laboratoriearbete. En milliliter motsvarar exakt en kubikcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Varfor omvandlas volymenheter med ett kubiskt forhallande?",
        paragraphs: [
          "Medan langdenheter omvandlas med ett linjart forhallande och areaenheter med ett kvadratiskt forhallande, omvandlas volymenheter med ett kubiskt forhallande. Till exempel motsvarar 1 meter 100 centimeter, men 1 kubikmeter motsvarar inte 100 kubikcentimeter, utan 100³, det vill saga 1 000 000 kubikcentimeter.",
          "Detta kubiska samband uppstar eftersom volym varierar samtidigt i tre dimensioner och ar det vanligaste konceptuella felet vid volymomvandlingar -- sarskilt vid overgang till icke-metriska enheter som gallon eller kubikfot kravs en sarskilt noggrann berakning.",
        ],
      },
      {
        title: "Kokmatt",
        paragraphs: [
          "De matt som anvands i recept, som matsked, tesked och kopp, ar standardiserade volymenheter som mojliggor konsekventa resultat i olika kok. Allmant accepterade motsvarigheter: 1 matsked ≈ 15 mL, 1 tesked ≈ 5 mL, 1 kopp ≈ 250 mL.",
          "Dessa matt ar inte exakta vetenskapliga standarder, utan allmant accepterade uppskattade varden i den kulinariska praktiken; for recept som kraver precision (sarskilt bakning) ar det mer tillforlitligt att anvanda en digital koksvag.",
        ],
      },
      {
        title: "De amerikanska och brittiska vatskevolymenheterna",
        paragraphs: [
          "De amerikanska och brittiska systemen anvander enheter som gallon, quart, pint och vatskeuns; men storleken pa dessa enheter skiljer sig mellan de tva systemen. En amerikansk gallon motsvarar 3,78541 liter, medan en brittisk imperial gallon motsvarar 4,54609 liter -- cirka 20 % mer.",
          "Denna skillnad beror pa att de tva landerna historiskt har antagit olika referensgalloner (vingallonen i USA, imperial gallon i Storbritannien). Det ar alltid klokt att kontrollera vilket system vardet 'gallon' eller 'uns' pa ett recept eller en produktetikett tillhor.",
        ],
      },
      {
        title: "Jordbruks- och historiska volymenheter",
        paragraphs: [
          "Bushel och peck ar volymenheter som historiskt anvandes for att mata torra varor som spannmal, frukt och gronsaker; idag anvands de fortfarande pa vissa jordbruksmarknader, sarskilt i USA.",
          "Under den osmanska tiden var kile och şinik traditionella volymenheter som anvandes for att mata spannmal; 1 kile motsvarade 20 şinik. Aven om dessa enheter uppvisar sma regionala variationer, tjanar de idag som referens for att tolka historiska texter och dokument.",
        ],
      },
      {
        title: "Hur beraknar man en volym?",
        paragraphs: [
          "For ett rektangulart prisma (lada) anvands formeln Volym = Langd × Bredd × Hojd. For en cylinder anvands Volym = π × Radie² × Hojd, och for ett klot, Volym = (4/3) × π × Radie³.",
          "Volymen hos oregelbundet formade fasta amnen bestams vanligtvis med forskjutningsmetoden (Arkimedes princip) -- genom att sanka ner foremalet i en vattenfylld behallare och mata den forskjutna vattenvolymen.",
        ],
      },
      {
        title: "Volymmatning inom oljeindustrin",
        paragraphs: [
          "Inom oljeindustrin uttrycks volym vanligtvis i fat (bbl); 1 fat motsvarar exakt 158,987 liter (42 amerikanska galloner). Denna enhet ar en tradition som gar tillbaka till 1800-talet, da olja transporterades i trafat som ursprungligen var avsedda for vin.",
          "I industriella processer uttrycks stora volymer vanligtvis i kubikmeter, och sma laboratoriematningar i milliliter; ratt enhet valjs utifran storleken pa den volym som mats.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metriskt", commonUse: "Medicinska doseringar och sma matningar" },
      { name: "Tesked", symbol: "tsk", referenceValue: "0,000005 m³ (≈5 mL)", system: "Kokmatt", commonUse: "Recept" },
      { name: "Matsked", symbol: "msk", referenceValue: "0,000015 m³ (≈15 mL)", system: "Kokmatt", commonUse: "Recept" },
      { name: "Kopp", symbol: "kopp", referenceValue: "0,00025 m³ (≈250 mL)", system: "Kokmatt", commonUse: "Recept" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metriskt", commonUse: "Drycker, branslen och vardagsvolym" },
      { name: "Vatskeuns (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drycker och kosmetikforpackningar" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Matning av ol och mjolk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Bransle och stora vatskevolymer" },
      { name: "Imperial gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Brittiskt (imperial)", commonUse: "Bransle och vatskematning i Storbritannien" },
      { name: "Kubikfot", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Brittiskt/amerikanskt", commonUse: "Byggnation och luftflode i klimatanlaggningar" },
      { name: "Fat (olja)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Oljeindustrin", commonUse: "Matning av raolja" },
      { name: "Kubikmeter", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Vattentankar, betong och stora volymer" },
    ],
  },
  {
    locale: "sv",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Omvandla massaenheter",
    description:
      "Omvandla snabbt och gratis mellan kilogram, gram, milligram, ton och pund.",
    introduction: [
      "Massa ar en grundlaggande fysikalisk storhet kopplad till mangden materia i ett foremal och dess tröghetsegenskap. I det Internationella Enhetssystemet ar massans grundenhet kilogram, med symbolen kg.",
      "Aven om massa och vikt i vardagligt sprak ofta anvands som synonymer, ar de fysikaliskt sett olika storheter. Massa mats i kilogram, medan vikt, som en kraft, mats i newton.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Massa" },
      { label: "Dimensionssymbol", value: "[M]" },
      { label: "SI-grundenhet", value: "Kilogram" },
      { label: "Symbol for SI-enhet", value: "kg" },
      { label: "Metrologiomrade", value: "Massametrologi" },
    ],
    sections: [
      {
        title: "Vad ar massa?",
        paragraphs: [
          "Massa ar den fysikaliska storhet som ar kopplad till motstandet ett foremal ger mot forandring av sitt rorelsetillstand, det vill saga trögheten. I klassisk mekanik uttrycks sambandet mellan den nettokraft som verkar pa ett foremal och den producerade accelerationen med likheten F = m·a.",
          "Vid samma kraft far ett foremal med storre massa en mindre acceleration. Darfor uttrycker massa i vardaglig mening inte bara mangden materia i ett foremal, utan spelar ocksa en grundlaggande roll i rorelseekvationerna.",
          "Massa ar en skalar storhet. Den har ingen riktning och grunddimensionssymbolen i SI-systemet ar bokstaven M.",
        ],
      },
      {
        title: "Skillnaden mellan massa och vikt",
        paragraphs: [
          "Massa och vikt ar inte samma fysikaliska storhet. Massa ar en egenskap hos foremalet och uttrycks i kilogram. Vikt ar daremot den kraft foremalet utsatts for i ett gravitationsfalt och mats i newton.",
          "Det forenklade viktsambandet skrivs W = m·g, dar W representerar tyngdkraften, m massan och g den lokala tyngdaccelerationen.",
          "Massan hos ett foremal forblir ungefar densamma pa jorden och manen; vikten varierar daremot eftersom den lokala tyngdaccelerationen ar olika. Darfor ar kilogram i vetenskapligt bruk en massaenhet och inte en viktenhet.",
          "I vardagligt sprak anvands orden 'vikt' och 'massa' ofta omvaxlande, eftersom resultatet av att vaga nagot uttrycks i kilogram. Matinstrumentet registrerar egentligen effekten av en kraft, men ar kalibrerat for att visa resultatet i massaenheter.",
        ],
      },
      {
        title: "Varfor ar kilogram SI:s grundenhet for massa?",
        paragraphs: [
          "I det Internationella Enhetssystemet ar kilogram massans grundenhet. Av SI:s grundenheter ar kilogram den enda vars namn innehaller ett prefix.",
          "Ordet gram spelade historiskt en viktig roll i de tidigaste massadefinitionerna i det metriska systemet. Men med framvaxten av praktiska standarder blev kilogrammet den grundlaggande referensen.",
          "Idag definieras kilogrammet inte langre av massan hos en fysisk metallcylinder, utan utifran det fastslagna numeriska vardet for Plancks konstant. Sambandet mellan denna definition och kibblevagen och elektriska matningar diskuteras i detalj pa informationssidan om kilogrammet.",
        ],
      },
      {
        title: "De metriska massaenheterna",
        paragraphs: [
          "De metriska massaenheterna ar uppbyggda av kilogram, gram och de SI-prefix som laggs till dem. Ett gram motsvarar 0,001 kilogram, ett milligram 0,001 gram och ett mikrogram 0,001 milligram.",
          "For stora massor anvands ton. Ett metriskt ton motsvarar exakt 1000 kilogram. Tonets symbol, vars anvandning tillsammans med SI ar tillaten, ar den lilla bokstaven t.",
          "Ratt enhet valjs utifran storleken pa den massa som mats. En persons eller produkts massa kan uttryckas i kilogram, innehallet i ett livsmedel i gram, den aktiva substansen i ett lakemedel i milligram eller mikrogram, och lasten pa ett fordon i ton.",
        ],
      },
      {
        title: "Sambandet mellan pund, uns och kilogram",
        paragraphs: [
          "Pund och uns ar massaenheter som anvands i de traditionella brittiska och amerikanska matsystemen. Det internationella avoirdupois-pundet motsvarar exakt 0,45359237 kilogram.",
          "Ett avoirdupois-pund delas in i 16 uns. Darfor motsvarar ett uns exakt 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pundet som anvands for massa och pound-force, en kraftenhet, ar olika storheter. Pundet uttrycker en massa, och pound-force en kraft. I tekniska berakningar far symbolerna lb och lbf inte forvaxlas.",
        ],
      },
      {
        title: "Hur mats massa?",
        paragraphs: [
          "For att mata massa kan balansvagar, elektroniska vagar, analysvagar, lastceller och olika industriella vagsystem med varierande kapacitet anvandas.",
          "Jamforande vagar jamfor den okanda massan med sparbara referensmassor. I elektroniska vagar omvandlar lastceller den utovade kraften till en elektrisk signal.",
          "Vid mycket noggranna matningar kan faktorer som luftens lyftkraft, lokal tyngdacceleration, temperatur, fuktighet, vibrationer, elektrostatiska effekter och referensmassans densitet beaktas.",
          "Kopplingen av massareferenser till nationella och internationella matsystem kallas metrologisk sparbarhet. Kalibreringskedjan gor det mojligt att jamfora matningar utforda i olika laboratorier och foretag.",
        ],
      },
      {
        title: "Sambandet mellan densitet, volym och massa",
        paragraphs: [
          "Mellan massa, densitet och volym finns sambandet m = ρ·V. Har representerar m massan, ρ densiteten och V volymen.",
          "Vid samma volym kan massan hos tva olika material skilja sig at utifran deras densitet. Stal och vatten har till exempel inte samma massa vid samma volym.",
          "I SI-systemet ar densitetens harledda grundenhet kilogram per kubikmeter. I laboratorietillampningar anvands ocksa regelbundet enheter som gram per kubikcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Osakerhet vid massmatning",
        paragraphs: [
          "Varje verklig matning innebar en viss osakerhet. Att en vag visar manga siffror pa skarmen betyder inte att alla dessa siffror ar kanda med samma precision.",
          "Instrumentets upplosning, repeterbarhet, olinjaritet, kalibreringsstandard, omgivningsforhallanden och anvandarens metod kan alla bidra till osakerheten i massmatningen.",
          "I vetenskapligt och industriellt arbete maste matresultatet bedomas tillsammans med ratt enhet, antalet signifikanta siffror och information om osakerheten.",
        ],
      },
      {
        title: "Hur valjer man ratt massaenhet?",
        paragraphs: [
          "Att valja en enhet som passar storleken pa det matta foremalet gor resultatet mer lasbart. En persons massa kan uttryckas i kilogram, den aktiva substansen i en tablett i milligram, och lasten pa en lastbil i ton.",
          "For mycket sma massor kan enheter med SI-prefix som mikrogram, nanogram och pikogram anvandas. Pa atom- och molekylniva kan specifika enheter som den enhetliga atommassenheten vara mer praktiska.",
          "Vid utforande av en enhetsomvandling maste inte bara det numeriska vardet kontrolleras, utan aven om den anvanda enheten uttrycker massa eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Mycket sma mangder materia" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medicinska och laboratoriematningar" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doseringar av lakemedel och kemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Livsmedel och sma foremal" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grundlaggande massmatningar" },
      { name: "Ton", symbol: "t", referenceValue: "1000 kg", system: "Metriskt", commonUse: "Transport, last och industri" },
      { name: "Uns", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Brittiskt/amerikanskt", commonUse: "Livsmedel och sma massor" },
      { name: "Pund", symbol: "lb", referenceValue: "0,45359237 kg", system: "Brittiskt/amerikanskt", commonUse: "Kroppsvikt och produktmassa" },
    ],
  },
  {
    locale: "sv",
    slug: "temperatur",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Omvandla temperaturenheter",
    description:
      "Omvandla temperaturer mellan Celsius, Fahrenheit och Kelvin; se formler och exempelvarden.",
    introduction: [
      "Temperatur ar en grundlaggande fysikalisk storhet kopplad till den genomsnittliga kinetiska energin hos partiklarna i ett amne, och uttrycker hur 'varmt' eller 'kallt' det amnet ar. I det Internationella Enhetssystemet ar temperaturens grundenhet kelvin.",
      "I vardagslivet ar Celsius- och Fahrenheitskalorna mest anvanda; inom vetenskapligt arbete anvands kelvin, i vissa tekniska berakningar Rankine, och i historiska texter kan Réaumur forekomma. Till skillnad fran manga andra fysikaliska storheter kraver temperaturomvandling mellan enheter inte bara multiplikation, utan aven addition eller subtraktion.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensionssymbol", value: "[Θ]" },
      { label: "SI-grundenhet", value: "Kelvin" },
      { label: "Symbol for SI-enhet", value: "K" },
      { label: "Absoluta nollpunkten", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Vad ar temperatur?",
        paragraphs: [
          "Temperatur ar en storhet direkt kopplad till den genomsnittliga kinetiska (rorelse-)energin hos atomerna och molekylerna som utgor ett amne. Ju snabbare partiklarna rör sig, desto 'varmare' anses amnet vara.",
          "Temperatur ar en av de sju grundstorheterna i det Internationella Enhetssystemet och representeras, som termodynamisk temperatur, med symbolen Θ (theta). Till skillnad fran manga andra storheter (som langd eller massa) ar den inte en direkt additiv storhet -- att fora tva kroppar i kontakt adderar inte deras temperaturer, utan for dem mot en jamvikt.",
        ],
      },
      {
        title: "SI-enheten for temperatur: kelvin",
        paragraphs: [
          "Kelvin ar SI:s grundenhet for temperatur och representeras med symbolen K (utan gradtecken, skrivs helt enkelt 'K'). Kelvinskalan tar den absoluta nollpunkten (den teoretiskt lagsta mojliga temperaturen) som utgangspunkt (0 K).",
          "Sedan SI-revideringen 2019 definieras kelvin inte langre utifran vattnets trippelpunkt, utan utifran det fastslagna numeriska vardet for Boltzmanns konstant (k). Detta sakerstaller att temperaturenheten bygger pa en universell konstant och inte pa ett fysiskt referensamne.",
        ],
      },
      {
        title: "Varfor ar temperaturomvandling inte en enkel multiplikation?",
        paragraphs: [
          "For storheter som langd eller massa sker enhetsomvandling bara med en multiplikationsfaktor (till exempel meter-centimeter). For temperatur kraver omvandlingen, eftersom Celsius-, Fahrenheit- och Kelvinskalorna har olika 'nollpunkter', bade multiplikation och addition eller subtraktion.",
          "For att till exempel ga fran Celsius till Fahrenheit multipliceras vardet forst med 9/5 och sedan adderas 32: °F = (°C × 9/5) + 32. Darfor ar temperatur, matematiskt sett, den enda vanliga fysikaliska storheten med ett 'affint' (linjart, men inte genom origo) omvandlingssamband.",
        ],
      },
      {
        title: "Celsiusskalan",
        paragraphs: [
          "Celsiusskalan utvecklades 1742 av den svenske astronomen Anders Celsius och definierar vattnets fryspunkt vid 0 °C och kokpunkt (vid ett tryck av en atmosfar) vid 100 °C. Det ar ett praktiskt referenssystem som gor det lattare att forsta skalan i vardagslivet.",
          "Celsius ar den mest anvanda temperaturskalan i varlden, bade inom vetenskapligt arbete och i den dagliga vaderinformationen i de flesta lander; ett fatal lander, som USA, foredrar fortfarande Fahrenheit i vardagsbruk.",
        ],
      },
      {
        title: "Fahrenheitskalan",
        paragraphs: [
          "Fahrenheitskalan utvecklades 1724 av den tyske fysikern Daniel Gabriel Fahrenheit. Pa denna skala ar vattnets fryspunkt 32 °F och kokpunkt 212 °F -- ett exakt intervall pa 180 grader mellan frysning och kokning.",
          "Fahrenheit anvands fortfarande idag for dagliga temperaturmatningar i ett fatal lander, framst USA; inom vetenskapligt arbete varlden over har den till stor del fatt ge vika for Celsius och Kelvin.",
        ],
      },
      {
        title: "Rankine och Réaumur: mindre kanda skalor",
        paragraphs: [
          "Rankine ar en absolut temperaturskala som anvander enheter av samma storlek som Fahrenheitgrader, men tar den absoluta nollpunkten som 0 °R; vattnets fryspunkt ligger vid 491,67 °R. Den foredras framfor Kelvin i vissa termodynamiska tekniska berakningar i USA.",
          "Réaumurskalan utvecklades pa 1700-talet av den franske vetenskapsmannen Rene Réaumur; den faststaller vattnets fryspunkt till 0 °Ré och kokpunkt till 80 °Ré. Aven om den idag praktiskt taget inte anvands, kan den fortfarande hittas som historisk referens i vissa europeiska lander (sarskilt i vissa traditionella ryska recept).",
        ],
      },
      {
        title: "Vad betyder den absoluta nollpunkten?",
        paragraphs: [
          "Den absoluta nollpunkten (0 kelvin, -273,15 °C, -459,67 °F) ar den teoretiska temperatur vid vilken partiklar, i klassisk mening, har den lagsta mojliga kinetiska energin. Enligt kvantmekaniken star partiklar inte helt stilla ens vid den absoluta nollpunkten (nollpunktsenergi), men i klassisk mening kan ingen lagre temperatur definieras.",
          "I laboratoriet har man uppnatt temperaturer extremt nara den absoluta nollpunkten (i storleksordningen mikrokelvin, till och med nanokelvin), men enligt termodynamikens tredje huvudsats ar det omojligt att exakt na den absoluta nollpunkten i ett andligt antal steg.",
        ],
      },
      {
        title: "Hur mats temperatur?",
        paragraphs: [
          "For att mata temperatur anvands olika tekniker: kvicksilver- eller alkoholtermometrar, digitala termometrar, termoelement, motstandstermometrar (RTD) och infrarodtermometrar (beroringsfria). Var och en ar lampad for ett olika temperaturintervall och precisionsniva.",
          "Termoelement anvands i stor utstrackning inom industrin eftersom de kan fungera over ett mycket brett temperaturintervall (ibland fran -200 °C till +2000 °C); de beraknar temperaturen utifran spanningsskillnaden som uppstar vid sammanfogningen av tva olika metaller.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grundenhet", system: "SI", commonUse: "Vetenskapliga och termodynamiska berakningar" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metriskt (vardagsbruk)", commonUse: "Meteorologi, vardagsliv, vetenskap" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig meteorologi i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (teknik)", commonUse: "Termodynamiska tekniska berakningar" },
      { name: "Réaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Historiskt (Europa)", commonUse: "Historiska texter, traditionella recept" },
    ],
  },
  {
    locale: "sv",
    slug: "tid",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Omvandla tidsenheter",
    description:
      "Anvand pa en sida de viktigaste tidsomvandlingarna mellan sekunder, minuter och timmar.",
    introduction: [
      "Tid ar en grundlaggande fysikalisk storhet som uttrycker ordningen i vilken handelser intraffar och den varaktighet som ligger mellan dem. I det Internationella Enhetssystemet ar tidens grundenhet sekunden, som i vardagslivet anvands tillsammans med harledda enheter som minut, timme och dygn.",
      "Till skillnad fran storheter som langd eller massa ar tid ett av de aldsta matbegreppen i mansklighetens historia; den sexagesimala strukturen (bastal 60) hos timme, minut och sekund gar tusentals ar tillbaka till den gamla babyloniska civilisationen.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Tid" },
      { label: "Dimensionssymbol", value: "[T]" },
      { label: "SI-grundenhet", value: "Sekund" },
      { label: "Symbol for SI-enhet", value: "s" },
      { label: "Nuvarande definition av sekunden", value: "9 192 631 770 svangningsperioder hos cesium-133-atomen" },
    ],
    sections: [
      {
        title: "Vad ar tid?",
        paragraphs: [
          "Tid ar en grundlaggande storhet som uttrycker ordningen i vilken handelser intraffar och den varaktighet som forflyter mellan tva handelser. Inom fysiken representeras den med dimensionssymbolen T och spelar en roll i definitionen av manga harledda storheter, som hastighet, acceleration och frekvens.",
          "I klassisk fysik betraktades tid som en absolut storhet som forflot pa samma satt for alla observatorer; med Einsteins relativitetsteori forstod man att tid kan forflyta olika beroende pa observatorns hastighet och gravitationsfaltet (tidsdilation).",
        ],
      },
      {
        title: "SI-enheten for tid: sekunden",
        paragraphs: [
          "Sekunden ar SI:s grundenhet for tid, med symbolen s. Historiskt definierades sekunden som 1/86 400 av ett dygn (24 timmar × 60 minuter × 60 sekunder).",
          "Eftersom denna definition visade sig vara otillrackligt stabil pa grund av sma oregelbundenheter i jordens rotationshastighet, definierades sekunden 1967 om till exakt 9 192 631 770 perioder av den stralning som hor samman med overgangen mellan tva grundlaggande energiniva hos cesium-133-atomen. Denna definition gor det mojligt for atomklockor att fungera med samma precision overallt i varlden.",
        ],
      },
      {
        title: "Det sexagesimala ursprunget till timme, minut och sekund",
        paragraphs: [
          "Uppdelningen av en timme i 60 minuter och en minut i 60 sekunder gar tillbaka till det sexagesimala talsystemet (bastal 60) som anvandes av den gamla babyloniska civilisationen. Babylonierna delade bade vinkeln (360 grader) och tiden enligt detta system.",
          "Talet 60 valdes eftersom det ar exakt delbart med manga tal -- 2, 3, 4, 5, 6, 10, 12, 15, 20 och 30 -- vilket underlattar praktiska uppdelningar i vardagliga berakningar (till exempel att dela en timme i tre eller fyra delar) utan att behova bruktal.",
        ],
      },
      {
        title: "Uppdelningen av dygnet i 24 timmar",
        paragraphs: [
          "Uppdelningen av dygnet i 24 timmar gar tillbaka till det gamla Egypten; egyptierna delade dagen i 12 lika delar och natten i ytterligare 12, och foljde tiden via solur och stjarnobservationer.",
          "Denna indelning i 12 inspirerades troligen av att rakna fingerlederna (tre leder pa vart och ett av de fyra fingrarna utan tummen, totalt 12) eller antalet manfaser under ett ar (cirka 12 fullmanar).",
        ],
      },
      {
        title: "Sambandet mellan de metriska tidsenheterna",
        paragraphs: [
          "Sekundens underenheter -- millisekund (0,001 sekund), mikrosekund och nanosekund -- anvands for att mata mycket korta handelser, som datorprocessoroperationer, sporttidtagning och vetenskapliga experiment.",
          "Dess multiplar -- minuten (60 sekunder), timmen (3600 sekunder) och dygnet (86 400 sekunder) -- ar de grundenheter som dagligen anvands for att halla reda pa tiden. Omvandling mellan dessa enheter sker, till skillnad fran temperatur, bara genom multiplikation/division, eftersom de alla delar en gemensam nollpunkt (ursprung).",
        ],
      },
      {
        title: "Vad ar en skottsekund?",
        paragraphs: [
          "Jordens rotationshastighet kring sin egen axel uppvisar over tid sma oregelbundenheter pa grund av tidvatteneffekter och forandringar i dess inre struktur; detta skapar en liten skillnad mellan den 'exakta' tid som mats av atomklockor och dygnets langd baserat pa jordens faktiska rotation.",
          "For att kompensera for denna skillnad laggs sedan 1972 en 'skottsekund' till den Koordinerade Universella Tiden (UTC) vid behov. Det ar en korrigeringsmekanism som liknar skottarens extra dag (29 februari), men eftersom oregelbundenheten i jordens rotation ar oforutsagbar laggs skottsekunder inte till i en fast cykel som kalendern, utan efter behov.",
        ],
      },
      {
        title: "Tidszoner och UTC",
        paragraphs: [
          "Jorden ar indelad i cirka 24 tidszoner, eftersom solen nar sin hogsta punkt vid olika tidpunkter beroende pa longitud. Alla tidszoner anvander den Koordinerade Universella Tiden (UTC) som referenspunkt och uttrycks som en tidsskillnad i forhallande till denna referens beroende pa deras region (Sverige ar till exempel UTC+1 pa vintern).",
          "UTC ar en modern tidsstandard som har ersatt den gamla Greenwich Mean Time (GMT) och underhalls med atomklockor; GMT anvands idag framst som namnet pa den tidszon som motsvarar vintertid i Storbritannien.",
        ],
      },
      {
        title: "Hur mats tid?",
        paragraphs: [
          "I vardagslivet anvands mekaniska och digitala klockor, medan atomklockor anvands i vetenskapliga och tekniska tillampningar (GPS-satelliter, telekommunikationsnat). Atomklockor fungerar med extremt hog precision, baserat pa den stabila svangningsfrekvensen hos cesium- eller rubidiumatomer.",
          "For att GPS-systemet ska kunna faststalla en exakt position maste satelliternas atomklockor vara synkroniserade med nanosekundprecision; aven en liten avvikelse i dessa klockor kan orsaka stora fel vid berakning av positionen pa marken.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metriskt", commonUse: "Databehandling och sporttidtagning" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grundlaggande tidmatning" },
      { name: "Minut", symbol: "min", referenceValue: "60 s", system: "Tillaten tillsammans med SI", commonUse: "Daglig tidsregistrering" },
      { name: "Timme", symbol: "h", referenceValue: "3600 s", system: "Tillaten tillsammans med SI", commonUse: "Arbetstid, restid" },
      { name: "Dygn", symbol: "dygn", referenceValue: "86 400 s", system: "Tillaten tillsammans med SI", commonUse: "Kalender och varaktighetsberakningar" },
    ],
  },
  {
    locale: "sv",
    slug: "hastighet",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Omvandla hastighetsenheter",
    description:
      "Omvandla hastighet mellan km/h, m/s och mph; se tekniska och vardagliga exempel.",
    introduction: [
      "Hastighet ar en harledd fysikalisk storhet som uttrycker den strackan ett foremal tillryggalagger per tidsenhet. Eftersom den fas genom att dela en langd med en tid, ar hastighetens dimension L/T (langd delat med tid).",
      "I vardagslivet ar kilometer i timmen (km/h) och engelska mil i timmen (mph) de mest anvanda hastighetsenheterna; meter per sekund (m/s) foredras inom vetenskapligt arbete, och knop inom sjofart och luftfart. Ljushastigheten intar en sarskild plats bland hastighetsenheterna, som en absolut ovre grans som kan uppnas i universum.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Hastighet" },
      { label: "Dimensionssymbol", value: "[L/T]" },
      { label: "Harledd SI-enhet", value: "Meter per sekund" },
      { label: "Symbol for SI-enhet", value: "m/s" },
      { label: "Universell hastighetsgrans", value: "Ljushastighet ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Vad ar hastighet?",
        paragraphs: [
          "Hastighet uttrycker den strackan ett foremal tillryggalagger per tidsenhet och beraknas med formeln Hastighet = Strackan / Tid. Aven om fysiken tekniskt gor skillnad mellan 'fart' (skalar, utan riktning) och 'hastighet' (vektoriell, med riktning), anvands de tva termerna ofta omvaxlande i vardagligt sprak.",
          "Hastighet ar en harledd storhet, som fas genom att dela en langdenhet med en tidsenhet. Darfor anges dess SI-dimension som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheten for hastighet: meter per sekund",
        paragraphs: [
          "I det Internationella Enhetssystemet ar hastighetens harledda enhet meter per sekund (m/s), som uttrycker att ett foremal tillryggalagger en meter varje sekund. Denna enhet anvands som standard i vetenskapliga berakningar och fysikaliska formler.",
          "I vardagslivet foredras kilometer i timmen (km/h) framfor meter per sekund, eftersom fordonshastigheter och vagavstand pa sa satt uttrycks med mer intuitiva tal pa den skalan. 1 m/s motsvarar exakt 3,6 km/h.",
        ],
      },
      {
        title: "Kilometer i timmen och engelska mil i timmen",
        paragraphs: [
          "Kilometer i timmen (km/h) ar standardenheten for vagfordonshastighet i lander som anvander det metriska systemet, daribland Sverige. Engelska mil i timmen (mph) foredras i lander som anvander det brittiska matsystemet, som USA och Storbritannien.",
          "1 mph motsvarar cirka 1,60934 km/h. Denna skillnad ar en praktisk kalla till forvirring som kan leda till felaktig tolkning av hastighetsmatare pa importerade fordon eller hastighetsgranser vid hyrbil utomlands.",
        ],
      },
      {
        title: "Knop: hastighet inom sjofart och luftfart",
        paragraphs: [
          "Knop (nautisk mil per timme) ar standardhastighetsenheten inom sjofart och luftfart; 1 knop betyder exakt att tillryggalagga en nautisk mil (1852 meter) pa en timme.",
          "Enhetens namn 'knop' harstammar historiskt fran metoden som anvandes for att mata fartygs hastighet: ett rep med knutar kastades i vattnet och man raknade hur manga knutar som passerade under en bestamd tid. Denna metod anvandes i arhundraden innan moderna hastighetsmatinstrument fanns tillgangliga.",
        ],
      },
      {
        title: "Ljushastigheten: universums hastighetsgrans",
        paragraphs: [
          "Ljushastigheten i vakuum ar exakt definierad som 299 792 458 m/s och utgor, enligt Einsteins speciella relativitetsteori, den absoluta ovre grans som kan uppnas av information eller ett foremal med massa i universum.",
          "Att ljushastigheten ar definierad som ett exakt tal (och redan fore SI-revideringen 2019 betraktades som konstant) gor det mojligt att metern nuvarande definition ocksa bygger pa denna konstant -- metern definieras som den strackan ljus tillryggalagger pa 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Machtalet: ett samband med ljudhastigheten",
        paragraphs: [
          "Inom luftfarten uttrycks hoga hastigheter ofta via Machtalet, som representerar forhallandet mellan ett foremals hastighet och ljudhastigheten i det mediet (Mach 1 = ljudhastighet). Ljudhastigheten ar inte ett fast varde; den varierar utifran luftens temperatur och densitet (cirka 343 m/s, det vill saga 1235 km/h, vid havsniva).",
          "Darfor kan samma Machtal motsvara olika verkliga hastigheter (i km/h eller m/s) beroende pa hojd och temperatur -- ett flygplans Mach 0,85-hastighet varierar i verkligt varde med hojden.",
        ],
      },
      {
        title: "Skillnaden mellan medelhastighet och momentanhastighet",
        paragraphs: [
          "Medelhastigheten fas genom att dela den totala tillryggalagda strackan med den totala forflutna tiden och ger ett enda varde for hela resan. Momentanhastigheten ar ett foremals hastighet vid en specifik tidpunkt och kan variera kontinuerligt (acceleration, retardation, stillastaende, osv.).",
          "Medan ett fordons hastighetsmatare visar momentanhastigheten, beraknas medelhastigheten for en resa vanligtvis i efterhand utifran den totala strackan och den totala varaktigheten -- de tva vardena skiljer sig sa lange hastigheten inte har varit konstant under resan.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metriskt", commonUse: "Laboratorium och matning av langsam rorelse" },
      { name: "Meter per minut", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metriskt", commonUse: "Hastighet pa industriella transportband" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Vetenskapliga och fysikaliska berakningar" },
      { name: "Kilometer i timmen", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metriskt", commonUse: "Fordonshastighet och hastighetsgranser" },
      { name: "Engelsk mil i timmen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Brittiskt/amerikanskt", commonUse: "Fordonshastighet i USA och Storbritannien" },
      { name: "Knop", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Sjofart/luftfart", commonUse: "Hastighet pa fartyg och flygplan" },
      { name: "Kilometer per minut", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metriskt", commonUse: "Hastighetsberakningar over korta avstand" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metriskt", commonUse: "Hastighet pa rymdfarkoster och himlakroppar" },
      { name: "Ljushastighet", symbol: "c", referenceValue: "299 792 458 m/s", system: "Universell konstant", commonUse: "Fysikaliska och astronomiska berakningar" },
    ],
  },
  {
    locale: "sv",
    slug: "tryck",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Omvandla tryckenheter",
    description:
      "Omvandla tryck mellan pascal, kilopascal, bar och PSI; se formler och tekniska tillampningar.",
    introduction: [
      "Tryck ar den fysikaliska storhet som uttrycker mangden kraft som verkar vinkelratt mot en yta, i forhallande till den ytan. Tillampningsomradet ar mycket brett, fran kontaktspanningar mellan fasta amnen till vatska i en ledning, fran atmosfaren till vakuumsystem. Inom teknik ar tryck inte bara ett tal: det ar en grundlaggande designvariabel for sakerhet, tatning, strukturell hallfasthet, energiomvandling och processreglering.",
      "I det Internationella Enhetssystemet ar tryckets harledda enhet pascal, med symbolen Pa. En pascal motsvarar det tryck som utovas av en kraft pa en newton jamnt fordelad over en yta pa en kvadratmeter. Darfor ar tryck direkt kopplat till begreppen kraft och yta; det delar samma dimensionella struktur som mekanisk spanning i material, aven om den fysiska kontexten inte alltid ar densamma.",
      "I vardagslivet och industrin uttrycks tryck oftast i mer praktiska enheter an pascal. Kilopascal och PSI anvands i stor utstrackning for dacktryck, bar i processystem, atm vid atmosfariska forhallanden och millibar inom meteorologi. Att olika sektorer historiskt har antagit olika enheter gor det sarskilt viktigt att forsta tryckomvandlingar val och inte forvaxla absolut, relativt eller differentiellt tryck.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Tryck" },
      { label: "Harledd SI-enhet", value: "Pascal" },
      { label: "SI-symbol", value: "Pa" },
      { label: "Grundsamband", value: "P = F / A" },
      { label: "SI-motsvarighet", value: "1 Pa = 1 N/m²" },
      { label: "Dimensionell formel", value: "M L⁻¹ T⁻²" },
      { label: "Standardatmosfar", value: "101 325 Pa" },
      { label: "Absolut nollreferens", value: "Fullstandigt vakuum" },
    ],
    sections: [
      {
        title: "Vad ar tryck?",
        paragraphs: [
          "Tryck beror inte bara pa storleken pa den kraft som verkar pa en yta, utan aven pa den yta som kraften fordelas over. Om samma kraft verkar pa en mindre yta okar trycket; om den fordelas over en storre yta minskar det. Darfor kan en skarpt slipad kniv skara med liten kraft, medan samma kraft pa en bred yta ger en mycket mindre ytpaverkan.",
          "Inom vatskemekaniken betraktas tryck som den normala spanningskomponent en vatska i vila eller rorelse utovar pa sin omgivning. I en vatska i vila fortplantar sig trycket i alla riktningar och ar kopplat till Pascals princip i slutna karl. Denna egenskap ligger till grund for hydrauliska pressar, bromssystem och talrika industriella manoverdon.",
          "Begreppet tryck ar inte begransat till vatskor och gaser. Effekten av den genomsnittliga normalkraften pa kontaktytor skapar ocksa en tryckliknande fordelning. Men inom tekniken tanker man vid tryck framst pa vatskesystem som ledningar, tankar, kompressorer, luftkanaler, vakuumkammare och den atmosfariska omgivningen.",
        ],
      },
      {
        title: "Tryckformeln: P = F / A",
        paragraphs: [
          "Trycks grunddefinition ges av sambandet P = F / A. Har representerar P trycket, F kraftkomponenten vinkelratt mot ytan, och A den yta som kraften fordelas over. Den dimensionella analysen ger newton delat med kvadratmeter, vilket motsvarar enheten pascal.",
          "Detta samband ger, under antagande av en jamn kraftfordelning, medeltrycket. Vid verkliga kontaktproblem eller komplexa falt inuti en vatska kan trycket variera over ytan. I sadana fall beaktas istallet for ett enda medelvarde den lokala tryckfordelningen, differentialekvationer och randvillkor.",
          "Ett vanligt fel i praktiken ar att valja fel riktning pa kraften och den effektiva ytan. Vid berakning av kraften hos en kolv maste till exempel bara den effektiva tvarsnittsyta som utsatts for trycket anvandas. Att ignorera geometriska detaljer som packningen, bulten eller stodytan kan leda till konstruktionsfel.",
        ],
      },
      {
        title: "Varfor ar pascal SI-enheten for tryck?",
        paragraphs: [
          "Pascal uppstar naturligt ur kombinationen av newton, SI:s kraftenhet, och kvadratmeter, SI:s areaenhet. Likheten 1 Pa = 1 N/m² ar inte bara en definition, utan ocksa ett dimensionellt uttryck som visar tryckets mekaniska ursprung. Darfor behovs ingen oberoende grundenhet for tryck definieras.",
          "SI-systemet strävar efter att pa ett konsekvent satt koppla harledda storheter till grundenheter. Att uttrycka tryck i pascal ger ett ramverk som ar kompatibelt med energitathet, spanning, elasticitetsmodul och ekvationer fran vatskemekaniken. Att samma enhet kan anvandas inom olika omraden minskar omvandlingsfel i berakningar.",
          "Pa vardaglig skala ar pascal oftast en mycket liten enhet. Darfor foredrar tekniken mer praktiska skalor som kilopascal, megapascal eller bar. Anda ar de alla i slutandan kopplade till pascal och saledes till SI-basen.",
        ],
      },
      {
        title: "Tryckmatningens historia: Torricelli och barometern",
        paragraphs: [
          "Den systematiska matningen av tryck inleddes 1643 med utvecklingen av kvicksilverbarometern av den italienske vetenskapsmannen Evangelista Torricelli. Torricelli observerade att nar ett i ena anden slutet glasror fyllt med kvicksilver, med den oppna anden nedsankt i ett kvicksilverkarl, sa stannade kvicksilvret i roret pa en viss hojd och lamnade ett vakuum ovanfor.",
          "Torricelli foreslog att hojden pa kvicksilverpelaren balanserades av den yttre luftens vikt. Denna idé lade den experimentella grunden for tanken att luft har en matbar vikt och darmed ett tryck, och betraktas som utgangspunkten for studiet av tryck som en vetenskaplig storhet.",
          "1648 matte Florin Périer, pa forslag av Blaise Pascal, en barometer pa olika hojder pa Puy de Dôme och visade att det atmosfariska trycket minskar med hojden. Det senare arbetet utifran dessa grunder ledde till internationell samordning av matenheter med Meterkonventionen 1875, den exakta definitionen av standardatmosfaren 1954 och infoerandet av pascal i SI 1971.",
        ],
      },
      {
        title: "Absolut, relativt och differentiellt tryck",
        paragraphs: [
          "Absolut tryck mats i forhallande till fullstandigt vakuum. Denna referens ar situationen dar trycket teoretiskt ar noll, och absolut tryck kan aldrig vara negativt. Gaslagar, termodynamiska berakningar och vissa densitetsrelaterade samband fungerar med absolut tryck.",
          "Relativt (eller over-)tryck mats i forhallande till det atmosfariska trycket. De flesta manometrar i falt tar den omgivande atmosfaren som nollreferens; darfor ar vardet som avlases pa skarmen oftast det relativa trycket. Sambandet mellan absolut och relativt tryck uttrycks som P_abs = P_rel + P_atm.",
          "Differentiellt tryck ar tryckskillnaden mellan tva punkter. Vid tillampningar som filterigensattning, flodesmatning via en matplatta, rumstrycksreglering eller en varmevaxlares prestanda foljs direkt tryckskillnaden mellan tva ledningar eller tva olika volymer. Denna storhet ar varken definierad i forhallande till fullstandigt vakuum eller enbart i forhallande till atmosfaren; den ar direkt skillnaden mellan tva punkter.",
        ],
      },
      {
        title: "Atmosfariskt tryck",
        paragraphs: [
          "Atmosfariskt tryck ar det tryck som utovas pa ytor av vikten hos jordatmosfarens luftpelare. Under standardforhallanden nara havsniva anses det vara cirka 101 325 Pa, det vill saga 1 atm. Detta ar dock inget konstant varde; det varierar med hojd, vaderforhallanden och temperatur.",
          "Barometrar anvands for att mata det atmosfariska trycket. Kvicksilverbarometrar var historiskt referensinstrument, medan elektroniska trycksensorer har blivit vanliga i moderna tillampningar. Atmosfariskt tryck ar inte bara viktigt for meteorologin, utan aven for vakuumteknik, forbranningssystem och omvandlingar mellan relativt och absolut tryck.",
          "I system som arbetar med relativt tryck kan variationer i det atmosfariska trycket paverka tolkningen av matningen. Ett relativt tryck pa 2 bar vid havsniva och ett relativt tryck pa 2 bar pa hog hojd ger till exempel inte samma absoluta varde. Denna distinktion kan vara avgorande, sarskilt vid kompressionsberakningar, gasdensitet och kokpunkt.",
        ],
      },
      {
        title: "Hydrostatiskt tryck och sambandet P = ρgh",
        paragraphs: [
          "I en vatska i vila okar trycket med djupet. Under antagande av konstant densitet uttrycks det hydrostatiska relativa trycket ungefar med sambandet P = ρgh. Har representerar ρ densiteten, g tyngdaccelerationen och h hojden pa vatskepelaren.",
          "Detta samband ar sarskilt anvandbart for vattentankar, oppna bassanger, dammar, nivamatning och vatskepelarmanometrar. Vid samma hojd och i samma vatska anses trycket vara lika; karlets form andrar inte resultatet. Det som raknas ar vatskans densitet och det vertikala djupet i forhallande till den fria ytan.",
          "Det absoluta hydrostatiska trycket omfattar inte bara okningen ρgh, utan aven begynnelsetrycket pa den fria ytan. I ett oppet karl ar detta begynnelsevarde oftast det atmosfariska trycket. Vid berakning av absolut tryck maste darfor inte bara okningen fran vatskepelaren adderas, utan aven det yttre trycket pa ytan.",
        ],
      },
      {
        title: "Statiskt, dynamiskt och totalt tryck",
        paragraphs: [
          "Statiskt tryck ar den tryckkomponent som representerar flödets lokala termodynamiska tillstand, ur perspektivet hos en observator som ror sig med vatskan. De flesta matpunkter i ledningar, tankar och kanaler foljer i grunden det statiska trycket. De flesta trycktransmittrar ar konstruerade for att mata denna storhet.",
          "Dynamiskt tryck uttrycker den kinetiska effekten till foljd av flödeshastigheten och den vanliga approximativa formeln ar q = 1/2 ρv². Denna term spelar en viktig roll i Bernoullis approximation och anvands i hastighetsmatmetoder som pitotroret. Ju hogre hastighet, desto hogre dynamiskt tryck.",
          "I det ideala flödesantagandet tolkas det totala trycket som summan av statiskt och dynamiskt tryck. I verkliga system maste denna distinktion anvandas med forsiktighet pa grund av friktion, turbulens, komprimerbarhet och lokala forluster. Anda forblir distinktionen statisk-total-dynamisk ett grundlaggande tekniskt sprak inom ventilation, aerodynamik och processmatningar.",
        ],
      },
      {
        title: "Tryckhojd och en pumps uppfordringshojd",
        paragraphs: [
          "Tryckhojd uttrycker ett visst tryck i termer av den motsvarande hojden hos en vatskepelare. Grundsambandet skrivs h = P / (ρg). Sa motsvarar samma tryck en annan hojd beroende pa vatskans densitet.",
          "I pumpsystem tolkas tryck oftast inte direkt i pascal eller bar, utan i meter vatskepelare. Detta beror pa att pumpens funktion inte bara ar att ge vatskan tryck, utan ocksa att forse den med den energi som kravs for att overvinna en viss hojd, friktionsforluster och en hastighetskomponent. Darfor ar begreppet uppfordringshojd mycket praktiskt ur faltteknikens perspektiv.",
          "Tryckhojd och geometrisk hojd ar inte samma begrepp. Att bara lita pa avlasningen fran en manometer utan att beakta ledningsforluster, hastighetshojd och lokala motstand kan ge felaktiga resultat vid pumpval och systembalansering. Sarskilt for vatten, olja och processvatskor kraver densitetsskillnader en noggrann omvandling.",
        ],
      },
      {
        title: "Varfor finns det olika tryckenheter?",
        paragraphs: [
          "Mangfalden av tryckenheter forklaras till stor del av historiska och sektoriella skal. Medan SI-systemet tar pascal som referens, fortsatter industrin att anvanda bar, medicinen mmHg, meteorologin millibar, fordonsbranschen PSI, och vissa gamla tekniska dokument den tekniska atmosfaren. Denna situation beror pa att de olika omradena behaller sina egna bruksvanor.",
          "Vissa enheter ar mer intuitiva for anvandaren. Dacktrycket kan till exempel verka mer lasbart uttryckt i cirka 35 psi an i 240 kPa, och processtrycket i 3,5 bar istallet for i 350 000 Pa. Valet av enhet beror inte bara pa precision, utan aven pa forhallandekultur, instrumentens skala och bruksvanor i falt.",
          "Eftersom olika enheter dock uttrycker samma fysikaliska storhet ar en noggrann omvandling oumbarlig vid kombinerade berakningar. Att forvaxla approximativa omvandlingsfaktorer med exakt definierade faktorer, ignorera distinktionen relativ-absolut, och lasa symboler fel ar viktiga felkallor.",
        ],
      },
      {
        title: "Hur mats tryck?",
        paragraphs: [
          "For att mata tryck maste man forst faststalla vilken trycktyp som kravs: absolut, relativt eller differentiellt. Darefter bedoms matomradet, vatsketypen, temperaturen, den kemiska kompatibiliteten, vibrationer och den precisionsniva som kravs. Samma sensor kanske inte passar for alla tillampningar.",
          "For lagtrycks- och differentialmatningar kan membran-differentialtransmittrar anvandas; for hoga processtryck, tojningsgivare eller piezoresistiva element; och for vakuumtillampningar, specifika absoluta sensorer. Vatskepelarmanometrar ar mycket anvandbara for att lara ut grundprincipen; men i modern industri ar elektronisk utrustning vanligare.",
          "For en noggrann matning maste hansyn tas till impulsledningarnas placering, sensorns monteringsposition, nollstallning och temperatureffekter. I gas- och vatskeledningar kan en densitetsskillnad eller kondensation skapa en extra hydrostatisk belastning pa sensorn. Darfor bestammer installationsdetaljer resultatet lika mycket som valet av utrustning.",
        ],
      },
      {
        title: "Trycksensorer och manometrar",
        paragraphs: [
          "Mekaniska manometrar, som Bourdonrorsindikatorer, omvandlar tryck till en avlasbar visarrorelse genom deformationen av ett elastiskt element. Robusta, enkla och utan behov av energi, har de anvants lange inom industrin. Vid tillampningar som kraver precision och dataloggning ar elektroniska sensorer dock mer flexibla.",
          "Elektroniska trycksensorer kan vara piezoresistiva, kapacitiva, tojningsgivarbaserade eller resonansbaserade. Dessa sensorer omvandlar tryckforandringen till en elektrisk signal, som skickas till PLC-, SCADA- eller datainsamlingssystem. Detta mojliggor inte bara direkt avlasning, utan aven larm, reglering och trendanalys.",
          "Differentialmanometrar ger tryckskillnaden mellan tva punkter, absoluta sensorer trycket i forhallande till fullstandigt vakuum, och manometriska instrument trycket i forhallande till atmosfaren. Att bara lita pa det numeriska vardet utan att kontrollera referenstypen i ett instruments datablad kan leda till allvarliga tolkningsfel.",
        ],
      },
      {
        title: "Anvandningsomraden for tryck inom teknik",
        paragraphs: [
          "Tryck ar en grundlaggande designvariabel inom talrika tekniska omraden: ledningar, klimatanlaggningar, hydraulik, pneumatik, kemiska processer, kraftverk, vattendistributionssystem, fordonsindustri och luftfart. Fran vaggtjockleken pa en tank till val av ventiler, fran en kompressors utloppsforhallanden till ett filters prestanda, baseras manga beslut pa tryckinformation.",
          "Inom processteknik overvakas tryckgranser for saker drift av reaktorer, pannor, varmevaxlare och separatorer. Tryck-sakerhetsventiler, sprangskivor och reglerkretsar ar darfor kritisk utrustning. Tryck anvands ocksa for indirekt matning av andra processvariabler, som flode och niva.",
          "Inom maskinteknik och byggnation kombineras tryck med kontaktytor och vatskekrafter i spanningsanalyser. Inom medicin och biomedicinsk utrustning framtrader blodtryck, ventilationstryck och vakuumtillampningar; inom miljo och meteorologi, atmosfariska och differentiella tryckmatningar.",
        ],
      },
      {
        title: "Temperatur, hojd och osakerhet vid tryckmatning",
        paragraphs: [
          "Temperatur kan paverka bade egenskaperna hos den matta vatskan och sensorelementets beteende. Sarskilt for gaser maste, eftersom temperatur andrar densiteten, tryck-volym-temperatursambandet omvarderas. Darfor innehaller sensorers datablad parametrar som nolldrift och spanndrift som ar temperaturberoende.",
          "Det atmosfariska trycket tenderar att minska med hojden. Detta andrar sambandet mellan relativt och absolut tryck, och kan ocksa paverka referensbeteendet hos viss faltutrustning. Samma processforhallande kan ge olika absoluta tryckresultat pa olika hojder.",
          "Varje matning innebar en osakerhet. Kalibreringsstandarden, upplosningen, hysteresen, temperatureffekten, monteringsorienteringen, vibrationer och langsiktig drift bidrar alla till den totala osakerheten. Vid kritiska tillampningar maste designbeslutet omfatta inte bara det nominella tryckvardet, utan aven utrustningens klass och matningens tillforlitlighet.",
        ],
      },
      {
        title: "Sambandet och skillnaden mellan tryck och spanning",
        paragraphs: [
          "Tryck och spanning delar samma dimensionella struktur och kan bada uttryckas i pascal. Denna likhet beror pa att bada representerar en krafteffekt per ytenhet. Detta betyder dock inte att de fysiskt ar samma storhet.",
          "Tryck uppfattas i allmanhet som en isotrop normalspanning som utovas av vatskor; det vill saga, i en vatska i vila ar trycket vid samma punkt identiskt i alla riktningar. Spanning inom mekaniken for fasta amnen kan daremot ha normal- och skjuvkomponenter, vara riktningsberoende och ha en tensorstruktur.",
          "Att ignorera denna distinktion kan leda till felaktiga tolkningar, sarskilt vid berakningar av tankvaggar, tatningsytor eller materialhallfasthet. En vatskas inre tryck skapar omkrets- och axialspanningar pa tanken; men spanningsfaltet i tankmaterialet ar inte identiskt med vatskans eget tryck.",
        ],
      },
      {
        title: "Vanliga fel vid tryckberakningar",
        paragraphs: [
          "Det vanligaste felet ar att forvaxla relativt med absolut tryck. Sarskilt vid gaslagar, densitetsberakningar och vakuumtillampningar kravs absolut tryck, men ibland anvands direkt det relativa vardet fran en manometer. Detta orsakar ett systematiskt fel i resultatet.",
          "Ett annat fel ar att avrunda omvandlingsfaktorer eller anvanda en felaktig enhetsreferens. Vid omvandling mellan PSI, bar, atm, mmHg och kPa maste man avgora vilken precisionsniva som ar tillracklig for de approximerade vardena. Om utrustningens kalibrering kraver hog precision kan anvandning av otillrackligt antal decimaler orsaka problem.",
          "Ocksa att ignorera hydrostatiska effekter, forbise sensorns monteringshojd och inte beakta temperatureffekten forekommer ofta. Sarskilt vid vatskefyllda impulsledningar, slutna tankar och differentiella trycktillampningar kan till synes sma installationsdetaljer avsevart forandra matresultatet.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Vetenskapliga och tekniska berakningar" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Anlaggningar, dack och processtryck" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Metriskt, utanfor SI", commonUse: "Industri, kompressorer och processystem" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metriskt, utanfor SI", commonUse: "Meteorologi och atmosfariska matningar" },
      { name: "Standardatmosfar", symbol: "atm", referenceValue: "101 325 Pa", system: "Utanfor SI", commonUse: "Atmosfar och referensforhallanden" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Brittiskt/amerikanskt", commonUse: "Dack, hydrauliska och pneumatiska system" },
      { name: "Teknisk atmosfar", symbol: "at", referenceValue: "98 066,5 Pa", system: "Utanfor SI", commonUse: "Aldre tekniska tillampningar" },
      { name: "Millimeter kvicksilverpelare", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Utanfor SI", commonUse: "Medicin, vakuum och tryckmatningar" },
      { name: "Millimeter vattenpelare", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Utanfor SI", commonUse: "Lagtrycksmatningar och ventilation" },
      { name: "Kilogram-kraft per kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Metriskt, utanfor SI", commonUse: "Aldre pump- och pannmanometrar" },
    ],
  },
  {
    locale: "sv",
    slug: "energi",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Omvandla energienheter",
    description:
      "Jamfor i en kategori energiomvandlingar baserade pa joule, kilowattimme, kalori och BTU.",
    introduction: [
      "Energi ar den grundlaggande fysikaliska storhet som uttrycker ett systems formaga att utfora arbete. I det Internationella Enhetssystemet ar energins harledda enhet joule, som fas ur produkten av en kraft och en forskjutning.",
      "I vardagslivet anvands kilowattimme (kWh) for elrakningar, kalori/kilokalori inom naring, BTU i klimatanlaggningssystem, therm vid fakturering av naturgas, och elektronvolt inom partikelfysik.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Energi (arbete)" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "Harledd SI-enhet", value: "Joule" },
      { label: "Symbol for SI-enhet", value: "J" },
      { label: "Definition av joulen", value: "1 J = forskjutning av 1 meter under en kraft av 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "Vad ar energi?",
        paragraphs: [
          "Energi ar formagan hos ett foremal eller system att utfora arbete. Den kan finnas i manga former -- kinetisk energi (rorelse), potentiell energi (lage), termisk energi, kemisk energi och elektrisk energi -- och kan, enligt energiprincipen, omvandlas fran en form till en annan utan att den totala mangden skapas eller forstors.",
          "Energi ar en harledd storhet, som fas via produkten av en kraft och en forskjutning (arbete), och dess SI-dimension anges som ML²T⁻² (massa × langd i kvadrat / tid i kvadrat).",
        ],
      },
      {
        title: "SI-enheten for energi: joulen",
        paragraphs: [
          "Joulen ar SI:s harledda enhet for energi, med symbolen J; uppkallad efter den brittiske fysikern James Prescott Joule fran 1800-talet. En joule motsvarar den energi som kravs for att flytta ett foremal 1 meter under paverkan av en kraft pa 1 newton.",
          "Eftersom joulen fortfarande ar en mycket liten enhet for att uttrycka manga vardagliga energimangder, foredras inom teknik och vardagsbruk dess multiplar: kilojoule (tusen joule) och megajoule (en miljon joule).",
        ],
      },
      {
        title: "Kilowattimmen: elrakningarnas enhet",
        paragraphs: [
          "Kilowattimme (kWh) ar den mangd energi som forbrukas av en effekt pa en kilowatt under en timme, och utgor den globala standardenheten for elfakturering. 1 kWh motsvarar exakt 3 600 000 joule (3,6 megajoule).",
          "For att berakna en elektrisk apparats energiforbrukning racker det att multiplicera dess effekt (i watt) med anvandningstiden (i timmar); en apparat pa 2000 watt som gar i 3 timmar forbrukar till exempel 6 kWh energi.",
        ],
      },
      {
        title: "Kalorin och kilokalorin: energi inom naring",
        paragraphs: [
          "Kalorin definierades ursprungligen som den mangd energi som kravs for att hoja temperaturen hos ett gram vatten med 1 °C, och 1 kalori motsvarar exakt 4,184 joule.",
          "Vardet 'kalorier' som star pa livsmedelsetiketter ar i vetenskaplig mening egentligen kilokalorier (1000 kalorier) -- denna namnkonvention inom naringslara skapar ofta forvirring; nar man sager att ett livsmedel har '200 kalorier', ror det sig egentligen om 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU och therm: energi for klimatanlaggningar och naturgas",
        paragraphs: [
          "BTU (British Thermal Unit) ar den mangd energi som kravs for att hoja temperaturen hos ett pund vatten med 1 °F; det ar en enhet av amerikanskt ursprung, men anvands i stor utstrackning i varlden for att uttrycka kapaciteten hos varme- och klimatanlaggningssystem. 1 BTU motsvarar cirka 1055,06 joule.",
          "Therm ar en stor energienhet som anvands vid fakturering av naturgas och motsvarar exakt 100 000 BTU. I vissa lander faktureras naturgasforbrukning direkt i therm istallet for kubikmeter.",
        ],
      },
      {
        title: "Elektronvolten: den subatomara varldens enhet",
        paragraphs: [
          "Elektronvolt (eV) uttrycker den kinetiska energi en elektron far genom att passera en potentialskillnad pa en volt; det ar en extremt liten energienhet (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "Inom partikel- och atomfysik uttrycks energier ofta i elektronvolt (och dess multiplar keV, MeV, GeV) istallet for joule, eftersom joulen pa den skalan ger extremt sma och opraktiska tal.",
        ],
      },
      {
        title: "Energiprincipen",
        paragraphs: [
          "Enligt energiprincipen, aven kand som termodynamikens forsta huvudsats, forblir den totala energin i ett slutet system konstant; energi varken skapas eller forstors, den omvandlas bara fran en form till en annan.",
          "I en bilmotor omvandlas till exempel kemisk energi (bransle) forst till termisk energi och sedan till mekanisk energi (rorelse); aven om en del av energin i denna process omvandlas till onyttig varme genom friktion och avgaser, forandras inte den totala mangden energi.",
        ],
      },
      {
        title: "Varfor ar omvandling mellan energienheter viktigt?",
        paragraphs: [
          "Olika sektorer foredrar traditionellt olika energienheter: elteknik kilowattimme, naringslara kilokalori, klimatanlaggningsbranschen BTU, och naturgasbranschen therm. Att kunna omvandla korrekt mellan dessa olika enheter ar nodvandigt for att jamfora energieffektivitet och berakna kostnader.",
          "For att till exempel jamfora effektiviteten hos en varmepump med en naturgaspanna maste bada systemens energiforbrukning omvandlas till en gemensam enhet (oftast kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Vetenskapliga och fysikaliska energiberakningar" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metriskt", commonUse: "Livsmedelsenergi (i vissa lander)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metriskt", commonUse: "Bransle och stora energimangder" },
      { name: "Kalori", symbol: "cal", referenceValue: "4,184 J", system: "Metriskt (traditionellt)", commonUse: "Naring och kemi" },
      { name: "Kilokalori", symbol: "kcal", referenceValue: "4184 J", system: "Metriskt (traditionellt)", commonUse: "Livsmedelsetiketter ('kalorier')" },
      { name: "Wattimme", symbol: "Wh", referenceValue: "3600 J", system: "Metriskt (elektricitet)", commonUse: "Forbrukning av sma apparater" },
      { name: "Kilowattimme", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metriskt (elektricitet)", commonUse: "Elfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Brittiskt/amerikanskt", commonUse: "Kapacitet for klimatanlaggning och uppvarmning" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Brittiskt/amerikanskt", commonUse: "Fakturering av naturgas" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikelfysik", commonUse: "Matning av atomar och nukleart energi" },
    ],
  },
  {
    locale: "sv",
    slug: "datalagring",
    sourceSlug: "veri",
    category: "veri",
    title: "Omvandla datalagringsenheter",
    description:
      "Omvandla mellan byte, kilobyte, megabyte, gigabyte och terabyte; jamfor berakningar baserade pa 1000 och 1024.",
    introduction: [
      "Datalagringsenheten (information) uttrycker mangden information som lagras eller behandlas i ett datorsystem. Den mest grundlaggande enheten ar biten; atta bitar tillsammans bildar en byte.",
      "Vid lagring och internethastighet forekommer bade decimala enheter (bastal 1000) som kilobyte, megabyte, gigabyte och terabyte, och binara enheter (bastal 1024) som kibibyte, mebibyte och gibibyte som anvands av operativsystem -- skillnaden mellan dessa tva system ar den huvudsakliga anledningen till att en kopt disk verkar ha 'mindre' utrymme.",
    ],
    facts: [
      { label: "Minsta enhet", value: "Bit (0 eller 1)" },
      { label: "Grundenhet", value: "Byte = 8 bit" },
      { label: "Decimalt system (SI)", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binart system (IEC)", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Skillnad mellan 1000 och 1024", value: "≈7,4 % skillnad mellan 1 GB (decimalt) och 1 GiB (binart)" },
    ],
    sections: [
      {
        title: "Vad ar bit och byte?",
        paragraphs: [
          "Biten (binar siffra) ar den minsta informationsenhet en dator kan behandla och kan bara anta tva varden: 0 eller 1. Atta bitar tillsammans bildar en byte; en byte kan representera 256 (2⁸) olika varden -- tillrackligt for att till exempel koda ett textecken.",
          "Bit forkortas vanligtvis med ett litet 'b' och byte med ett stort 'B'; denna distinktion kan skapa forvirring, sarskilt mellan internethastigheter (Mbps = megabit per sekund) och filstorlek (MB = megabyte) -- en internetanslutning pa 100 Mbps motsvarar teoretiskt en nedladdningshastighet pa cirka 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Varfor finns det tva olika enhetssystem?",
        paragraphs: [
          "Eftersom datorer arbetar i det binara systemet ar minnesadressering naturligt kopplad till tvapotenser (som 1024, 1 048 576). Darfor har mjukvaruvarlden historiskt uppfattat 'kilobyte' som 1024 byte.",
          "Disktillverkare foredrar, av marknadsforings- och berakningsskal, det decimala SI-prefixet (bastal 1000) -- en disk som marknadsfors som '1 TB' av en tillverkare innehaller i verkligheten exakt 1 000 000 000 000 byte, men eftersom operativsystemet raknar i bastal 1024, visar skarmen ett mindre tal, som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "For att losa denna forvirring standardiserade Internationella Elektrotekniska Kommissionen (IEC) 1998 separata namn (kibibyte, mebibyte, gibibyte, tebibyte) och symboler (KiB, MiB, GiB, TiB) for enheter pa binar bas.",
          "Enligt denna standard bor de traditionella prefixen KB/MB/GB bara anvandas i decimal mening (bastal 1000), och for varden baserade pa 1024 bor 'binara' prefix som KiB/MiB/GiB foredras. I vardagsbruk och i manga program tillampas dock denna distinktion annu inte konsekvent.",
        ],
      },
      {
        title: "Varfor vaxer skillnaden mellan 1000 och 1024?",
        paragraphs: [
          "Medan skillnaden pa kilobyteniva (1000 mot 1024) bara ar 2,4 %, okar denna skillnad for varje hogre enhet: pa megabyteniva ar den ≈4,9 %, pa gigabyteniva ≈7,4 %, och pa terabyteniva nar den ≈10 %.",
          "Darfor blir vid stora lagringskapaciteter (som en disk pa 1 TB) skillnaden mellan den decimala och den binara berakningen stor nog for att ge anvandaren den synliga kanslan av att ha 'mindre utrymme' (en skillnad pa cirka 90 GB).",
        ],
      },
      {
        title: "Bitbaserade lagringsenheter: kilobit, megabit, gigabit",
        paragraphs: [
          "Internetleverantorer uttrycker vanligtvis anslutningshastigheten i bitbaserade enheter (kilobit per sekund, megabit per sekund, gigabit per sekund); det ar en historisk tradition inom natverksteknik.",
          "Eftersom anvandare vanligtvis forvantar sig en fils nedladdningshastighet i byte (MB per sekund), kan det ge det falska intrycket att en anslutning pa '100 Mbps' ar 'langsam' om man inte vet att den har en verklig nedladdningshastighet pa cirka 12,5 MB per sekund.",
        ],
      },
      {
        title: "Datastorlekar i vardagslivet",
        paragraphs: [
          "Ett textdokument (en sida) tar vanligtvis upp nagra kilobyte, ett komprimerat foto (JPEG) nagra megabyte, och en komprimerad musikfil (MP3) i genomsnitt 3 till 5 megabyte.",
          "En film i standarddefinition (HD) kan ta upp mellan 1 och 4 gigabyte, och en film i 4K-upplosning ungefar mellan 15 och 25 gigabyte; dessa skillnader varierar utifran upplosning och komprimeringsmetod.",
        ],
      },
      {
        title: "Datalagringsenhetens historia",
        paragraphs: [
          "Den forsta hardisken som IBM presenterade 1956 (RAMAC 305) hade en kapacitet pa cirka 3,75 megabyte och tog upp platsen for ett helt rum. Idag kan ett microSD-kort rymma miljontals ganger den kapaciteten inom storleken av en handflata.",
          "Denna enorma kapacitetsokning ar nara kopplad bade till framstegen inom lagringsteknik (som overgangen fran magnetiska diskar till flashminne) och den konstanta minskningen av kostnaden per enhet.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binart", commonUse: "Natverkshastighet (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grundenhet", commonUse: "Grundenhet for filstorlek" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimalt (SI)", commonUse: "Textdokument" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binart (IEC)", commonUse: "Operativsystemets minnesvisning" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Decimalt (SI)", commonUse: "Foto- och musikfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binart (IEC)", commonUse: "RAM-minneskapacitet" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Decimalt (SI)", commonUse: "Diskkapacitet (tillverkaretikett)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binart (IEC)", commonUse: "Operativsystemets diskvisning" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1 000 000 000 000 byte", system: "Decimalt (SI)", commonUse: "Storskalig lagring" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1 000 000 000 000 000 byte", system: "Decimalt (SI)", commonUse: "Datacenter och molnlagring" },
    ],
  },
  {
    locale: "sv",
    slug: "elektricitet",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Omvandla elektriska enheter",
    description:
      "Omvandla elektricitetens grundstorheter mellan volt, kilovolt, ampere och milliampere; se exempelvarden.",
    introduction: [
      "Elektricitet ar ett brett omrade bestaende av relaterade men olika fysikaliska storheter, som spanning (potentialskillnad) och strom (laddningsflode). Denna kategori samlar de tva vanligaste grundstorheterna i det dagliga elektrotekniska arbetet: volt (spanning) och ampere (strom).",
      "Spanning och strom ar inte samma fysikaliska storhet och kan inte omvandlas direkt till varandra; deras samband faststalls av Ohms lag (V = I × R), beroende pa kretsens resistans. Omvandlingarna pa denna sida behandlar varje storhet separat (volt-kilovolt, ampere-milliampere, osv.).",
    ],
    facts: [
      { label: "Namn pa spanningsenheten", value: "Volt (efter Alessandro Volta)" },
      { label: "Namn pa stromenheten", value: "Ampere (efter André-Marie Ampère)" },
      { label: "SI-grundenhet (strom)", value: "Ampere (A) -- en av SI:s 7 grundenheter" },
      { label: "Samband spanning-strom-resistans", value: "Ohms lag: V = I × R" },
      { label: "Natspanning i Sverige", value: "230 V (enfas), 400 V (trefas), 50 Hz" },
    ],
    sections: [
      {
        title: "Vad ar spanning (volt)?",
        paragraphs: [
          "Spanning (voltage) uttrycker den elektriska potentialskillnaden mellan tva punkter i en elektrisk krets och kan betraktas som den 'drivkraft' som far elektroner att flöda fran en punkt till en annan. Dess SI-enhet ar volt (V).",
          "Enheten volt ar uppkallad efter den italienske fysikern Alessandro Volta, uppfinnaren av det elektriska batteriet. Varden som '1,5 V' eller '9 V' pa ett batteri uttrycker den potentialskillnad det batteriet kan leverera.",
        ],
      },
      {
        title: "Vad ar strom (ampere)?",
        paragraphs: [
          "Elektrisk strom uttrycker mangden elektrisk laddning som passerar genom en ledare per tidsenhet, och dess SI-enhet ar ampere (A). En ampere motsvarar att cirka 6,242 × 10¹⁸ elektroner passerar en punkt varje sekund.",
          "Enheten ampere ar uppkallad efter den franske fysikern André-Marie Ampère, en av grundarna av elektromagnetismen. Ampere var, fore SI-revideringen 2019, en av SI:s grundenheter; idag betraktas den fortfarande som en grundlaggande storhet, men definieras nu utifran den elementara laddningskonstanten (e).",
        ],
      },
      {
        title: "Varfor kan spanning och strom inte omvandlas till varandra?",
        paragraphs: [
          "Spanning (V) och strom (A) ar olika fysikaliska storheter -- den ena uttrycker en potentialskillnad, den andra hastigheten hos ett laddningsflode. Darfor har fragan 'hur manga ampere ar X volt' inget svar i sig sjalv utan att kanna till kretsens resistans (eller effekt).",
          "Sambandet mellan de tva faststalls av Ohms lag: V = I × R (Spanning = Strom × Resistans). En spanning pa 12 volt over en resistans pa 4 ohm ger till exempel en strom pa 3 ampere; men samma 12 volt applicerat pa en annan resistans ger ett helt annat stromvarde.",
        ],
      },
      {
        title: "Sambandet mellan effekt, spanning och strom",
        paragraphs: [
          "Elektrisk effekt (watt) ar lika med produkten av spanning och strom: P = V × I. Denna formel visar att en apparat med samma effekt kommer att forbruka mindre strom vid hog spanning och mer strom vid lag spanning.",
          "Detta samband forklarar varfor elnat distribueras vid hog spanning: att transportera samma effekt med en lagre strom minskar avsevart energiforlusterna pa grund av transmissionsledningarnas resistans (Joule-uppvarmning).",
        ],
      },
      {
        title: "Natspanningen i Sverige och varlden",
        paragraphs: [
          "I Sverige ar standardnatspanningen for bostadsinstallationer 230 volt enfas, och 400 volt for trefassystem som anvands i industriella och kommersiella installationer (med en frekvens pa 50 Hz).",
          "Globalt varierar natspanningen fran land till land; USA och Kanada anvander 120 volt, medan de flesta europeiska lander, daribland Sverige, foredrar 230 volt. Denna skillnad ar den huvudsakliga anledningen till att elektriska apparater som tas med fran utlandet inte kan anvandas direkt utan en omvandlare.",
        ],
      },
      {
        title: "Likstrom (DC) och vaxelstrom (AC)",
        paragraphs: [
          "Vid likstrom (DC) flödar elektroner konstant i en enda riktning -- batterier och solpaneler producerar DC. Vid vaxelstrom (AC) andrar stromriktningen ett visst antal ganger per sekund (50 Hz i Sverige, det vill saga 50 ganger per sekund) -- natel ar AC.",
          "Den huvudsakliga anledningen till att AC foredras vid natdistribution ar att spanningen enkelt kan hojas eller sankas med transformatorer; detta gor det mojligt att transportera elektricitet over langa avstand med laga forluster.",
        ],
      },
      {
        title: "Effekten av elektrisk strom pa den mänskliga kroppen",
        paragraphs: [
          "Styrkan hos den strom som passerar genom den manskliga kroppen bestammer den upplevda effekten: cirka 1 milliampere ar knappt markbart, mellan 10 och 20 milliampere kan orsaka muskelsammandragning (oformaga att slappa taget), och over 100 milliampere kan orsaka hjartrytmrubbningar (fibrillering) och dod.",
          "Darfor ar det inte bara spanningen som raknas vid elsakerhet, utan aven den stromstyrka som kan bildas i kretsen -- aven i en miljo med lag spanning men lag resistans (till exempel fuktig) kan en farlig strom uppsta.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metriskt", commonUse: "Sensorer och bioelektriska signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batterier, nat- och kretsspanning" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metriskt", commonUse: "Hogspanningsledningar" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metriskt", commonUse: "Strom i elektroniska kretsar" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Husinstallationer och apparatstrom" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metriskt", commonUse: "Kortslutningsstrommar och industriell strom" },
    ],
  },
  {
    locale: "sv",
    slug: "guldkarat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Omvandla guldkarat",
    description:
      "Omvandla mellan 24, 22, 18 och 14 karat guld baserat pa mangden rent guld; upptack renheten och anvandningsomradena for varje karat.",
    introduction: [
      "Liksom silver anvands guld nastan aldrig rent vid tillverkning av smycken, eftersom det ar en mycket mjuk metall som latt repas -- darfor legeras det med andra metaller som silver eller koppar. Karat ar mattet som anger andelen rent guld i den legeringen.",
      "Skalan fungerar pa bas 24: 24 karat betyder helt rent guld (100 %), 18 karat betyder att 18/24 av legeringen (cirka 75 %) ar rent guld. Omvandlingen har bestar inte av att uttrycka samma fysikaliska storhet i en annan enhet, utan av att hitta motsvarigheten i gram for samma legering med en annan renhetsgrad.",
    ],
    facts: [
      { label: "Matsystem", value: "Renhetsstandard for smycken (karat)" },
      { label: "Grundreferens", value: "24 karat = 100 % rent guld" },
      { label: "Vanligaste karat i Turkiet", value: "22 karat (armband, traditionella smycken)" },
      { label: "Internationellt vardagsbruk", value: "18 karat (ring, halsband)" },
      { label: "Berakningslogik", value: "Gram × (ursprungskarat / 24) ÷ (malkarat / 24)" },
    ],
    sections: [
      {
        title: "Vad matar karat exakt?",
        paragraphs: [
          "Karat anger vilken del av vikten hos ett guldsmycke som faktiskt ar guld. 24 karat ar rent guld; 18 och 14 karat ar former av guld blandat med silver respektive koppar, och darmed hardare och mindre rena.",
          "Darfor kan man saga att ett armband pa 22 karat har ett nagot 'lagre' rent guldinnehall an 24 karat, men ar starkare -- darfor foredrar juvelerare oftast 22 karat for armband och 18 karat for ringar och halsband.",
        ],
      },
      {
        title: "Hur beraknar man innehallet av rent guld?",
        paragraphs: [
          "For att ta reda pa mangden rent guld i ett armband pa 10 gram med 22 karat: 10 × (22 / 24) = 9,17 gram rent guld (motsvarande 24 karat). De aterstaende 0,83 gram ar annan metall som tillsatts for hallfasthet.",
          "Omvant, om en juvelerare skulle smalta ner de 9,17 gram rent guld for att gora om det till 18 karat: 9,17 ÷ (18 / 24) = 12,22 gram total legering skulle fas -- eftersom andelen rent guld ar lagre vid 18 karat, fordelas samma mangd rent guld over en storre total vikt.",
        ],
      },
      {
        title: "Vad anvands varje karat till?",
        paragraphs: [
          "Pa grund av sin mjukhet anvands 24 karat guld nastan aldrig i vardagliga smycken; det foredras for tackor och investeringsprodukter. 22 karat ar standarden for armband och traditionella smycken i Turkiet och Mellanostern.",
          "18 karat ar, pa grund av sin hoga hallfasthet, vanligt over hela varlden for vardagliga smycken som ringar och halsband med diamanter. 14 karat, billigare och annu starkare, forekommer sarskilt pa marknaderna i USA och Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat guld", symbol: "24K", referenceValue: "100 % rent guld", system: "Smyckesstandard", commonUse: "Tackor, investeringsguld" },
      { name: "22 karat guld", symbol: "22K", referenceValue: "91,6 % rent guld (22/24)", system: "Smyckesstandard", commonUse: "Armband, traditionella smycken" },
      { name: "18 karat guld", symbol: "18K", referenceValue: "75 % rent guld (18/24)", system: "Smyckesstandard", commonUse: "Ring, halsband, vardagliga smycken" },
      { name: "14 karat guld", symbol: "14K", referenceValue: "58,3 % rent guld (14/24)", system: "Smyckesstandard", commonUse: "Prisvarda smycken, USA/Europa-marknad" },
    ],
  },
  {
    locale: "sv",
    slug: "silverhalt",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omvandla silverhalt",
    description:
      "Omvandla halterna 999, 925 (sterling), 900 och 800 till gram rent silver; upptack promillesystemet och dess anvandning inom smycken.",
    introduction: [
      "Liksom guld anvands aven silver nastan aldrig rent for att gora smycken eller foremal, eftersom det ar en mjuk metall som legeras med andra metaller som koppar. Promillehalten ar mattet som anger andelen rent silver i den legeringen.",
      "Till skillnad fran guldkarat, som uttrycks pa bas 24, uttrycks silvrets renhet pa bas 1000 (promille): 999 motsvarar nastan rent silver, medan 925 ar den mest utbredda halten i varlden, kand som 'sterlingsilver'.",
    ],
    facts: [
      { label: "Matsystem", value: "Promillesystem" },
      { label: "Huvudreferens", value: "999 = 99,9 % rent silver" },
      { label: "Vanligaste smyckeshalten", value: "925 (sterlingsilver)" },
      { label: "Investerings-/tackssilver", value: "Halt 999 (finsilver)" },
      { label: "Berakningsregel", value: "Gram × (ursprungshalt / 1000) ÷ (malhalt / 1000)" },
    ],
    sections: [
      {
        title: "Vad matar silverhalten (promille) egentligen?",
        paragraphs: [
          "Till skillnad fran guld uttrycks silvrets renhet inte i 24 delar, utan i promille (bas 1000). En halt pa 999 betyder 999 delar per tusen (det vill saga 99,9 %) rent silver i legeringen; den aterstaende promillen motsvarar vanligtvis sma spar av andra grundamnen.",
          "Halten 925 (sterlingsilver) betyder att legeringen innehaller 92,5 % rent silver, dar resten (7,5 %) vanligtvis ar koppar. Denna lilla mangd koppar ger stadga at rent silver, som av naturen ar mycket mjukt och latt deformeras.",
        ],
      },
      {
        title: "Varfor ar sterlingsilver (925) varldsstandarden?",
        paragraphs: [
          "Historien om sterlingsilverstandarden (925) gar tillbaka till 1100-talets England och har med tiden blivit den mest allmant accepterade standarden i varlden for smycken, bestick och silverforemal.",
          "Rent silver (999) ar for mjukt for vardagliga foremal och repas latt; tillsatsen av 7,5 % koppar ger silvret tillracklig hardhet, samtidigt som den karakteristiska glansen och fargen till stor del bevaras.",
        ],
      },
      {
        title: "Skillnader mellan halterna 999, 900 och 800",
        paragraphs: [
          "Halten 999 (fin-/rent silver) foredras for tackor och investeringsprodukter eftersom renhetsgraden ar det viktigaste kriteriet for investerare; men pa grund av sin mjukhet anvands den sallan i vardagliga smycken.",
          "Halten 900 (myntsilver) anvandes historiskt i silvermynt fran manga lander. Halten 800, sarskilt vanlig i Europa (Tyskland, Osterrike), ar en mindre ren smyckesstandard an sterlingsilver, men fortfarande stark.",
        ],
      },
      {
        title: "Hur beraknar man mangden rent silver?",
        paragraphs: [
          "For att faststalla mangden rent silver i en silverring pa 10 gram med halt 925: 10 × (925 / 1000) = 9,25 gram rent silver. De aterstaende 0,75 gram ar koppar eller annan metall som tillsatts for hallfasthet.",
          "Samma logik galler for omvandling mellan olika halter: om till exempel mangden rent silver i en legering med halt 925 ar kand, fas dess motsvarighet i halt 999 genom att dela den mangden med 999/1000.",
        ],
      },
      {
        title: "Sambandet mellan silvrets anlopning och dess renhet",
        paragraphs: [
          "Att ett silversmycke anlöper (oxideras) over tid beror inte pa silvret i sig, utan pa att kopparen i legeringen reagerar med svavelforeningar i luften. Darfor tenderar silver med hogre renhet (som halt 999) att anlöpa mindre.",
          "Vissa tillverkare har utvecklat 'anlopningsbestandiga' sterlingsilverlegeringar for att forbattra denna egenskap, genom att anvanda andra grundamnen, som germanium, istallet for koppar.",
        ],
      },
    ],
    unitTable: [
      { name: "Silver 999", symbol: "999", referenceValue: "99,9 % rent silver", system: "Smyckesstandard", commonUse: "Tackor, investeringssilver" },
      { name: "Silver 925", symbol: "925", referenceValue: "92,5 % rent silver (sterling)", system: "Smyckesstandard", commonUse: "Smycken och bestick (varldsstandard)" },
      { name: "Silver 900", symbol: "900", referenceValue: "90 % rent silver", system: "Smyckesstandard", commonUse: "Historiska silvermynt" },
      { name: "Silver 800", symbol: "800", referenceValue: "80 % rent silver", system: "Smyckesstandard (Europa)", commonUse: "Europeisk smyckesstandard" },
    ],
  },
];

export function findSwedishCategoryPage(slug: string) {
  return swedishCategoryPages.find((page) => page.slug === slug);
}

export function findSwedishCategoryPageByTurkishSlug(sourceSlug: string) {
  return swedishCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
