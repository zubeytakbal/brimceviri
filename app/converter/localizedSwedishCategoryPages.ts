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
    title: "Omvandla längdenheter",
    description:
      "Omvandla gratis och direkt mellan meter, kilometer, centimeter, mil och fot; se formler och tabeller.",
    introduction: [
      "Längd är en av de grundläggande fysikaliska storheterna som beskriver höjden, bredden eller tjockleken hos ett föremål, eller avståndet mellan två punkter. Beroende på vilken riktning som mäts kan samma föremål ha flera olika längdvärden.",
      "Inom fysiken representeras längd vanligtvis med dimensionssymbolen L. Många härledda storheter, som area, volym, hastighet, acceleration, tryck och densitet, definieras utifrån dimensionen längd.",
      "I det Internationella Enhetssystemet (SI) är längdens grundenhet metern (m). Beroende på storleken på det avstånd som mäts används nanometer, mikrometer, millimeter, centimeter, meter eller kilometer. Utanför det metriska systemet används fortfarande tum, fot, yard och engelsk mil, särskilt i USA och Storbritannien.",
    ],
    facts: [
      { label: "SI-grundenhet", value: "Meter" },
      { label: "Symbol för SI-enhet", value: "m" },
      { label: "Fysikalisk storhet", value: "Längd" },
      { label: "Dimensionssymbol", value: "L" },
      { label: "Nuvarande definition av metern", value: "Sträckan ljus färdas i vakuum på 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Vad är längd?",
        paragraphs: [
          "Längd beskriver höjden, bredden eller djupet hos ett föremål, eller avståndet mellan två punkter; det är en av de grundläggande fysikaliska storheterna. Beroende på vilken riktning som mäts kan samma föremål uppvisa flera längdvärden.",
          "Inom fysiken representeras längd vanligtvis med dimensionssymbolen L. Många härledda storheter, som area, volym, hastighet, acceleration, tryck och densitet, definieras utifrån dimensionen längd.",
        ],
      },
      {
        title: "SI-enheten för längd",
        paragraphs: [
          "I det Internationella Enhetssystemet är längdens grundenhet metern, med symbolen m. Metern fungerar som grundläggande referens för att definiera alla andra längdenheter.",
          "Metriska enheter som kilometer, centimeter, millimeter, mikrometer och nanometer är kopplade till metern via decimala multipler och delar. Denna struktur gör det möjligt att omvandla mellan metriska enheter med tiopotenser.",
        ],
      },
      {
        title: "Den vetenskapliga definitionen av metern",
        paragraphs: [
          "Tidigare definierades metern utifrån jordens dimensioner och fysiska prototyper. I takt med mätteknikens utveckling blev en mer stabil definition, som kan reproduceras överallt i världen, nödvändig.",
          "Idag definieras en meter som längden på den sträckan ljus tillryggalägger i vakuum under ett tidsintervall på 1/299 792 458 sekund. Denna definition bygger på att ljushastigheten i vakuum är exakt fastslagen till 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "De metriska längdenheterna",
        paragraphs: [
          "I det metriska systemet är enheterna kopplade till metern via positiva eller negativa tiopotenser. En kilometer motsvarar 1000 meter, en centimeter 0,01 meter och en millimeter 0,001 meter.",
          "För mycket små längder används mikrometer, nanometer och pikometer. Celler mäts ofta i mikrometer, ljusets våglängder i nanometer och vissa avstånd på atomskala i pikometer.",
        ],
      },
      {
        title: "Längdenheter utanför det metriska systemet",
        paragraphs: [
          "Tum, fot, yard och engelsk mil är vanliga längdenheter utanför det metriska systemet. De används främst i det amerikanska mätsystemet och i vissa tillämpningar kopplade till brittisk tradition.",
          "En tum motsvarar exakt 2,54 centimeter, en fot 12 tum och en yard 3 fot. En engelsk mil är exakt definierad som 1609,344 meter.",
        ],
      },
      {
        title: "Längd inom sjöfart och luftfart",
        paragraphs: [
          "Inom sjöfart och luftfart uttrycks avstånd vanligtvis i nautiska mil. En nautisk mil motsvarar exakt 1852 meter.",
          "Den nautiska milen har sitt ursprung i en historisk mätmetod kopplad till jordens geografiska koordinater. Hastighetsenheten knop betyder också en nautisk mil per timme.",
        ],
      },
      {
        title: "Hur mäts längd?",
        paragraphs: [
          "Vid vardagliga mätningar används verktyg som linjal, måttband, skjutmått och mikrometer. Precisionen hos det valda instrumentet beror på storleken på det föremål som ska mätas och den precisionsnivå som krävs.",
          "Inom teknik och vetenskaplig forskning kan laseravståndsmätare, koordinatmätmaskiner, interferometer och olika optiska mätsystem användas.",
        ],
      },
      {
        title: "Mätnoggrannhet och osäkerhet",
        paragraphs: [
          "Ingen fysisk mätning är helt perfekt. Resultatet av en mätning innebär alltid en viss osäkerhet på grund av instrumentets upplösning, dess kalibrering, omgivningsförhållanden och den använda metoden.",
          "Därför är det lämpligt att i vetenskapliga resultat inte bara ange det uppmätta värdet, utan även mätosäkerheten och den använda enheten. Särskilt inom precisionsteknik kan även en temperaturvariation påverka längden hos ett material.",
        ],
      },
      {
        title: "Hur omvandlas längdenheter?",
        paragraphs: [
          "Vid omvandlingar inom samma mätsystem används förhållandet mellan enheterna. För att till exempel omvandla meter till kilometer delar man värdet med 1000; för att omvandla kilometer till meter multiplicerar man värdet med 1000.",
          "Vid omvandlingar mellan det metriska systemet och brittiska eller amerikanska enheter måste de exakt definierade omvandlingsfaktorerna användas. För att till exempel omvandla tum till centimeter multiplicerar man värdet med 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metriskt", commonUse: "Våglängd för ljus och nanoteknik" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metriskt", commonUse: "Celler, partiklar och precisionstillverkning" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metriskt", commonUse: "Tekniska ritningar och små mått" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metriskt", commonUse: "Mätning av vardagliga föremål" },
      { name: "Decimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metriskt", commonUse: "Undervisning och vissa volymberäkningar" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grundläggande längdmätningar" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metriskt", commonUse: "Väg- och geografiska avstånd" },
      { name: "Tum", symbol: "in", referenceValue: "0,0254 m", system: "Brittiskt/amerikanskt", commonUse: "Skärmar, rörledningar och tekniska mått" },
      { name: "Fot", symbol: "ft", referenceValue: "0,3048 m", system: "Brittiskt/amerikanskt", commonUse: "Kroppslängd, byggnation och luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Brittiskt/amerikanskt", commonUse: "Idrottsplaner och avståndsmätning" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Brittiskt/amerikanskt", commonUse: "Vägavstånd" },
      { name: "Nautisk mil", symbol: "nmi", referenceValue: "1852 m", system: "Sjöfart", commonUse: "Sjöfart och luftfart" },
    ],
  },
  {
    locale: "sv",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Omvandla areaenheter",
    description:
      "Omvandla area mellan kvadratmeter, hektar och kvadratfot; för beräkningar av mark, byggnader och byggnation.",
    introduction: [
      "Area är en härledd fysikalisk storhet som uttrycker utsträckningen av ett tvådimensionellt område. Eftersom den är produkten av en längd med en annan längd i samma enhet, är areans dimension alltid 'längd i kvadrat' (L²).",
      "I det Internationella Enhetssystemet är areans härledda enhet kvadratmeter (m²). Inom jordbruket och för mark används hektar och lokala enheter i stor utsträckning; i det brittiska/amerikanska systemet kvadratfot och acre; i Sydasien är lokala enheter som bigha och katha också vanliga.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Area" },
      { label: "Dimensionssymbol", value: "[L²]" },
      { label: "Härledd SI-enhet", value: "Kvadratmeter" },
      { label: "Symbol för SI-enhet", value: "m²" },
      { label: "Grundformel (rektangel)", value: "Area = Längd × Bredd" },
    ],
    sections: [
      {
        title: "Vad är area?",
        paragraphs: [
          "Area uttrycker utsträckningen av ett plant eller projicerat område. Storleken på en markyta, golvet i ett rum eller ett pappersark mäts i area.",
          "Area är en härledd storhet: den fas genom att multiplicera en grundlängdenhet med sig själv. Därför är SI-dimensionen för area L² (längd i kvadrat), och area är alltid en positiv skalar storhet.",
        ],
      },
      {
        title: "SI-enheten för area: kvadratmetern",
        paragraphs: [
          "I det Internationella Enhetssystemet är areans härledda enhet kvadratmeter (m²), som representerar arean hos en kvadrat vars sida är exakt 1 meter.",
          "Kvadratmetern är inte en oberoende grundenhet, utan en härledd enhet som fas genom att kvadrera längdenheten (metern). Alla andra metriska areaenheter (kvadratcentimeter, kvadratkilometer, osv.) är kopplade till kvadratmetern via decimala potenser.",
        ],
      },
      {
        title: "Varför omvandlas areaenheter med ett kvadratiskt förhållande?",
        paragraphs: [
          "Vid omvandling av längdenheter måste det använda förhållandet kvadreras för areaenheter. Till exempel motsvarar 1 kilometer 1000 meter, men 1 kvadratkilometer motsvarar inte 1000 kvadratmeter, utan 1000², det vill säga 1 000 000 kvadratmeter.",
          "Detta beror på att både dimensionerna (längd och bredd) ökar eller minskar i samma proportion för en area. Att ignorera detta kvadratiska samband är det vanligaste rakenfelet vid areaomvandlingar -- antagandet att '1 km² = 1000 m²' är en vanlig missuppfattning.",
        ],
      },
      {
        title: "De metriska areaenheterna",
        paragraphs: [
          "I det metriska systemet används kvadratmillimeter och kvadratcentimeter för små ytor, kvadratmeter för vardagliga mätningar och kvadratkilometer för stora områden. En kvadratcentimeter motsvarar 0,0001 kvadratmeter, och en kvadratkilometer 1 000 000 kvadratmeter.",
          "För att mäta mark används ar (100 m²) och dess 100 gånger större multipel, hektar (10 000 m²). Hektar är den mest använda metriska markenheten i världen för att uttrycka arean på jordbruksmark.",
        ],
      },
      {
        title: "Traditionella markenheter i Turkiet",
        paragraphs: [
          "I Turkiet är dönüm och dekar de mest använda enheterna för att mäta jordbruksmark; båda motsvarar idag 1000 kvadratmeter och är utbytbara. Dekar är det officiella namnet i lagstiftningen om mått och vikt, medan dönüm är den traditionella motsvarigheten i vardagsspråk.",
          "Under den osmanska tiden varierade storleken på dönüm mellan 900 och 1600 m² beroende på region. Med 1931 års lag om mått och vikt jämställdes dönüm med dekar och standardiserades exakt till 1000 m².",
        ],
      },
      {
        title: "Areaenheterna i det brittiska/amerikanska systemet",
        paragraphs: [
          "Kvadratfot (ft²) och kvadrattum (in²) används för små ytor, medan acre används för stora markområden i det brittiska/amerikanska mätsystemet. En acre motsvarar exakt 4046,8564224 kvadratmeter.",
          "Acres historiska ursprung går tillbaka till den markyta ett par oxar kunde plöja på en dag. Den används fortfarande i stor utsträckning i fastighetsannonser i USA, Storbritannien och vissa länder inom Samväldet.",
        ],
      },
      {
        title: "Markenheterna i Sydasien",
        paragraphs: [
          "I länder som Indien, Bangladesh, Pakistan och Nepal används lokala markenheter som bigha, katha, killa, kanal, marla, guntha, biswa och decimal fortfarande i stor utsträckning. Storleken på dessa enheter kan variera betydligt från region till region, även med samma namn.",
          "En bigha motsvarar till exempel cirka 1338 m² i Västbengalen, men kan ha ett annat värde i en annan delstat. Därför är det viktigt vid fastighetstransaktioner med dessa enheter att bekräfta vilken regional standard som används.",
        ],
      },
      {
        title: "Hur beräknar man en area?",
        paragraphs: [
          "För en rektangulär yta är formeln Area = Längd × Bredd. För en triangel används Area = (Bas × Höjd) / 2, och för en cirkel, Area = π × Radie².",
          "För oregelbundet formad mark beräknas arean vanligtvis genom att dela upp formen i mindre rektanglar eller trianglar, beräkna arean för varje del separat och addera dem (eller, vid fastighetsmätningar, via areaformler för polygoner baserade på koordinater).",
        ],
      },
      {
        title: "Att tänka på vid arematning",
        paragraphs: [
          "Areavärdet i en fastighetsannons eller ett dokument måste tolkas utifrån den använda enheten (m², dönüm, acre, bigha, osv.) och den regionala standard som den enheten definieras med.",
          "Särskilt vid internationella fastighetstransaktioner minskar det missförstånd att beakta den exakta motsvarigheten i kvadratmeter istället för bara likheten i enhetens namn; omvandlingsverktyget på denna sida jämför alla enheter utifrån en gemensam referens i kvadratmeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metriskt", commonUse: "Tekniska ritningar och små ytor" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metriskt", commonUse: "Area för små föremål" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Area för bostäder, kontor och mark" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metriskt", commonUse: "Små markområden" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turkiet (metriskt)", commonUse: "Mätning av jordbruksmark" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metriskt", commonUse: "Stor jordbruks- och skogsmark" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metriskt", commonUse: "Städer, länder och geografiska områden" },
      { name: "Kvadratfot", symbol: "ft²", referenceValue: "0,092903 m²", system: "Brittiskt/amerikanskt", commonUse: "Bostadsarea (USA/UK)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Brittiskt/amerikanskt", commonUse: "Idrottsplaner och textil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Brittiskt/amerikanskt", commonUse: "Stora markområden" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierar per region)", system: "Sydasien", commonUse: "Jordbruksmark i Indien/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Mätning av bostäder och mark i Japan" },
    ],
  },
  {
    locale: "sv",
    slug: "volym",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Omvandla volymenheter",
    description:
      "Omvandla volym mellan liter, milliliter och kubikmeter; jämför vanliga enheter för vätskor och behållare.",
    introduction: [
      "Volym är en härledd fysikalisk storhet som uttrycker det utrymme som ett tredimensionellt föremål eller en behållare upptar eller rymmer. Eftersom den är produkten av en längdenhet i tre dimensioner (längd × bredd × höjd), är volymens dimension L³ (längd upphöjt till tre).",
      "I det Internationella Enhetssystemet är volymens härledda enhet kubikmeter (m³); i vardagslivet används liter och milliliter mycket mer. I köket är kopp, matsked och tesked vanliga, och i det amerikanska/brittiska systemet gallon, quart, pint och vätskeuns.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Volym" },
      { label: "Dimensionssymbol", value: "[L³]" },
      { label: "Härledd SI-enhet", value: "Kubikmeter" },
      { label: "Symbol för SI-enhet", value: "m³" },
      { label: "Vanligaste enheten i vardagsbruk", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Vad är volym?",
        paragraphs: [
          "Volym är storleken på det tredimensionella utrymme som ett föremål upptar eller som en behållare kan rymma. Volymen hos ett fast föremål uttrycker dess fysiska storlek, medan volymen hos en behållare uttrycker mängden vätska eller gas den kan innehålla.",
          "Volym är en härledd storhet, som fas genom att multiplicera en längdenhet i tre dimensioner (bredd, höjd, djup). Därför är dess SI-dimension L³.",
        ],
      },
      {
        title: "SI-enheten för volym: kubikmetern",
        paragraphs: [
          "I det Internationella Enhetssystemet är volymens härledda enhet kubikmeter (m³), som representerar innehållet i en kub vars sida är exakt 1 meter.",
          "Kubikmetern används för stora volymer (vattentankar, betonggjutningar, containervolym), medan man i vardagslivet föredrar den mycket mindre litern. En kubikmeter motsvarar exakt 1000 liter.",
        ],
      },
      {
        title: "Sambandet mellan liter och kubikmeter",
        paragraphs: [
          "Liter är en praktisk volymenhet vars användning tillsammans med SI är tillåten, även om den officiellt inte är en SI-enhet. En liter motsvarar volymen hos en kub med en sida på 10 centimeter (1000 kubikcentimeter).",
          "Literns underenheter -- deciliter, centiliter och milliliter -- används i stor utsträckning vid mätningar av mat, läkemedel och laboratoriearbete. En milliliter motsvarar exakt en kubikcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Varför omvandlas volymenheter med ett kubiskt förhållande?",
        paragraphs: [
          "Medan längdenheter omvandlas med ett linjärt förhållande och areaenheter med ett kvadratiskt förhållande, omvandlas volymenheter med ett kubiskt förhållande. Till exempel motsvarar 1 meter 100 centimeter, men 1 kubikmeter motsvarar inte 100 kubikcentimeter, utan 100³, det vill säga 1 000 000 kubikcentimeter.",
          "Detta kubiska samband uppstår eftersom volym varierar samtidigt i tre dimensioner och är det vanligaste konceptuella felet vid volymomvandlingar -- särskilt vid övergång till icke-metriska enheter som gallon eller kubikfot krävs en särskilt noggrann beräkning.",
        ],
      },
      {
        title: "Kokmått",
        paragraphs: [
          "De mått som används i recept, som matsked, tesked och kopp, är standardiserade volymenheter som möjliggör konsekventa resultat i olika kök. Allmänt accepterade motsvarigheter: 1 matsked ≈ 15 mL, 1 tesked ≈ 5 mL, 1 kopp ≈ 250 mL.",
          "Dessa mått är inte exakta vetenskapliga standarder, utan allmänt accepterade uppskattade värden i den kulinariska praktiken; för recept som kräver precision (särskilt bakning) är det mer tillförlitligt att använda en digital köksvåg.",
        ],
      },
      {
        title: "De amerikanska och brittiska vätskevolymenheterna",
        paragraphs: [
          "De amerikanska och brittiska systemen använder enheter som gallon, quart, pint och vätskeuns; men storleken på dessa enheter skiljer sig mellan de två systemen. En amerikansk gallon motsvarar 3,78541 liter, medan en brittisk imperial gallon motsvarar 4,54609 liter -- cirka 20 % mer.",
          "Denna skillnad beror på att de två länderna historiskt har antagit olika referensgalloner (vingallonen i USA, imperial gallon i Storbritannien). Det är alltid klokt att kontrollera vilket system värdet 'gallon' eller 'uns' på ett recept eller en produktetikett tillhör.",
        ],
      },
      {
        title: "Jordbruks- och historiska volymenheter",
        paragraphs: [
          "Bushel och peck är volymenheter som historiskt användes för att mäta torra varor som spannmål, frukt och grönsaker; idag används de fortfarande på vissa jordbruksmarknader, särskilt i USA.",
          "Under den osmanska tiden var kile och şinik traditionella volymenheter som användes för att mäta spannmål; 1 kile motsvarade 20 şinik. Även om dessa enheter uppvisar små regionala variationer, tjänar de idag som referens för att tolka historiska texter och dokument.",
        ],
      },
      {
        title: "Hur beräknar man en volym?",
        paragraphs: [
          "För ett rektangulärt prisma (låda) används formeln Volym = Längd × Bredd × Höjd. För en cylinder används Volym = π × Radie² × Höjd, och för ett klot, Volym = (4/3) × π × Radie³.",
          "Volymen hos oregelbundet formade fasta ämnen bestäms vanligtvis med förskjutningsmetoden (Arkimedes princip) -- genom att sänka ner föremålet i en vattenfylld behållare och mäta den förskjutna vattenvolymen.",
        ],
      },
      {
        title: "Volymmätning inom oljeindustrin",
        paragraphs: [
          "Inom oljeindustrin uttrycks volym vanligtvis i fat (bbl); 1 fat motsvarar exakt 158,987 liter (42 amerikanska galloner). Denna enhet är en tradition som går tillbaka till 1800-talet, då olja transporterades i träfat som ursprungligen var avsedda för vin.",
          "I industriella processer uttrycks stora volymer vanligtvis i kubikmeter, och små laboratoriemätningar i milliliter; rätt enhet väljs utifrån storleken på den volym som mäts.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metriskt", commonUse: "Medicinska doseringar och små mätningar" },
      { name: "Tesked", symbol: "tsk", referenceValue: "0,000005 m³ (≈5 mL)", system: "Kokmått", commonUse: "Recept" },
      { name: "Matsked", symbol: "msk", referenceValue: "0,000015 m³ (≈15 mL)", system: "Kokmått", commonUse: "Recept" },
      { name: "Kopp", symbol: "kopp", referenceValue: "0,00025 m³ (≈250 mL)", system: "Kokmått", commonUse: "Recept" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metriskt", commonUse: "Drycker, bränslen och vardagsvolym" },
      { name: "Vätskeuns (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drycker och kosmetikförpackningar" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Mätning av öl och mjölk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Bränsle och stora vätskevolymer" },
      { name: "Imperial gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Brittiskt (imperial)", commonUse: "Bränsle och vätskemätning i Storbritannien" },
      { name: "Kubikfot", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Brittiskt/amerikanskt", commonUse: "Byggnation och luftflöde i klimatanläggningar" },
      { name: "Fat (olja)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Oljeindustrin", commonUse: "Mätning av råolja" },
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
      "Massa är en grundläggande fysikalisk storhet kopplad till mängden materia i ett föremål och dess tröghetsegenskap. I det Internationella Enhetssystemet är massans grundenhet kilogram, med symbolen kg.",
      "Även om massa och vikt i vardagligt språk ofta används som synonymer, är de fysikaliskt sett olika storheter. Massa mäts i kilogram, medan vikt, som en kraft, mäts i newton.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Massa" },
      { label: "Dimensionssymbol", value: "[M]" },
      { label: "SI-grundenhet", value: "Kilogram" },
      { label: "Symbol för SI-enhet", value: "kg" },
      { label: "Metrologiområde", value: "Massametrologi" },
    ],
    sections: [
      {
        title: "Vad är massa?",
        paragraphs: [
          "Massa är den fysikaliska storhet som är kopplad till motståndet ett föremål ger mot förändring av sitt rörelsetillstånd, det vill säga trögheten. I klassisk mekanik uttrycks sambandet mellan den nettokraft som verkar på ett föremål och den producerade accelerationen med likheten F = m·a.",
          "Vid samma kraft får ett föremål med större massa en mindre acceleration. Därför uttrycker massa i vardaglig mening inte bara mängden materia i ett föremål, utan spelar också en grundläggande roll i rörelseekvationerna.",
          "Massa är en skalar storhet. Den har ingen riktning och grunddimensionssymbolen i SI-systemet är bokstaven M.",
        ],
      },
      {
        title: "Skillnaden mellan massa och vikt",
        paragraphs: [
          "Massa och vikt är inte samma fysikaliska storhet. Massa är en egenskap hos föremålet och uttrycks i kilogram. Vikt är däremot den kraft föremålet utsätts för i ett gravitationsfält och mäts i newton.",
          "Det förenklade viktsambandet skrivs W = m·g, där W representerar tyngdkraften, m massan och g den lokala tyngdaccelerationen.",
          "Massan hos ett föremål förblir ungefär densamma på jorden och månen; vikten varierar däremot eftersom den lokala tyngdaccelerationen är olika. Därför är kilogram i vetenskapligt bruk en massaenhet och inte en viktenhet.",
          "I vardagligt språk används orden 'vikt' och 'massa' ofta omväxlande, eftersom resultatet av att väga något uttrycks i kilogram. Mätinstrumentet registrerar egentligen effekten av en kraft, men är kalibrerat för att visa resultatet i massaenheter.",
        ],
      },
      {
        title: "Varför är kilogram SI:s grundenhet för massa?",
        paragraphs: [
          "I det Internationella Enhetssystemet är kilogram massans grundenhet. Av SI:s grundenheter är kilogram den enda vars namn innehåller ett prefix.",
          "Ordet gram spelade historiskt en viktig roll i de tidigaste massadefinitionerna i det metriska systemet. Men med framväxten av praktiska standarder blev kilogrammet den grundläggande referensen.",
          "Idag definieras kilogrammet inte längre av massan hos en fysisk metallcylinder, utan utifrån det fastslagna numeriska värdet för Plancks konstant. Sambandet mellan denna definition och kibblevågen och elektriska mätningar diskuteras i detalj på informationssidan om kilogrammet.",
        ],
      },
      {
        title: "De metriska massaenheterna",
        paragraphs: [
          "De metriska massaenheterna är uppbyggda av kilogram, gram och de SI-prefix som läggs till dem. Ett gram motsvarar 0,001 kilogram, ett milligram 0,001 gram och ett mikrogram 0,001 milligram.",
          "För stora massor används ton. Ett metriskt ton motsvarar exakt 1000 kilogram. Tonets symbol, vars användning tillsammans med SI är tillåten, är den lilla bokstaven t.",
          "Rätt enhet väljs utifrån storleken på den massa som mäts. En persons eller produkts massa kan uttryckas i kilogram, innehållet i ett livsmedel i gram, den aktiva substansen i ett läkemedel i milligram eller mikrogram, och lasten på ett fordon i ton.",
        ],
      },
      {
        title: "Sambandet mellan pund, uns och kilogram",
        paragraphs: [
          "Pund och uns är massaenheter som används i de traditionella brittiska och amerikanska mätsystemen. Det internationella avoirdupois-pundet motsvarar exakt 0,45359237 kilogram.",
          "Ett avoirdupois-pund delas in i 16 uns. Därför motsvarar ett uns exakt 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pundet som används för massa och pound-force, en kraftenhet, är olika storheter. Pundet uttrycker en massa, och pound-force en kraft. I tekniska beräkningar får symbolerna lb och lbf inte förväxlas.",
        ],
      },
      {
        title: "Hur mäts massa?",
        paragraphs: [
          "För att mäta massa kan balansvågar, elektroniska vågar, analysvågar, lastceller och olika industriella vågsystem med varierande kapacitet användas.",
          "Jämförande vågar jämför den okända massan med spårbara referensmassor. I elektroniska vågar omvandlar lastceller den utövade kraften till en elektrisk signal.",
          "Vid mycket noggranna mätningar kan faktorer som luftens lyftkraft, lokal tyngdacceleration, temperatur, fuktighet, vibrationer, elektrostatiska effekter och referensmassans densitet beaktas.",
          "Kopplingen av massareferenser till nationella och internationella mätsystem kallas metrologisk spårbarhet. Kalibreringskedjan gör det möjligt att jämföra mätningar utförda i olika laboratorier och företag.",
        ],
      },
      {
        title: "Sambandet mellan densitet, volym och massa",
        paragraphs: [
          "Mellan massa, densitet och volym finns sambandet m = ρ·V. Här representerar m massan, ρ densiteten och V volymen.",
          "Vid samma volym kan massan hos två olika material skilja sig åt utifrån deras densitet. Stål och vatten har till exempel inte samma massa vid samma volym.",
          "I SI-systemet är densitetens härledda grundenhet kilogram per kubikmeter. I laboratorietillämpningar används också regelbundet enheter som gram per kubikcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Osäkerhet vid massmätning",
        paragraphs: [
          "Varje verklig mätning innebär en viss osäkerhet. Att en våg visar många siffror på skärmen betyder inte att alla dessa siffror är kända med samma precision.",
          "Instrumentets upplösning, repeterbarhet, olinjäritet, kalibreringsstandard, omgivningsförhållanden och användarens metod kan alla bidra till osäkerheten i massmätningen.",
          "I vetenskapligt och industriellt arbete måste mätresultatet bedömas tillsammans med rätt enhet, antalet signifikanta siffror och information om osäkerheten.",
        ],
      },
      {
        title: "Hur väljer man rätt massaenhet?",
        paragraphs: [
          "Att välja en enhet som passar storleken på det mätta föremålet gör resultatet mer läsbart. En persons massa kan uttryckas i kilogram, den aktiva substansen i en tablett i milligram, och lasten på en lastbil i ton.",
          "För mycket små massor kan enheter med SI-prefix som mikrogram, nanogram och pikogram användas. På atom- och molekylnivå kan specifika enheter som den enhetliga atommassenheten vara mer praktiska.",
          "Vid utförande av en enhetsomvandling måste inte bara det numeriska värdet kontrolleras, utan även om den använda enheten uttrycker massa eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Mycket små mängder materia" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medicinska och laboratoriemätningar" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doseringar av läkemedel och kemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Livsmedel och små föremål" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grundläggande massmätningar" },
      { name: "Ton", symbol: "t", referenceValue: "1000 kg", system: "Metriskt", commonUse: "Transport, last och industri" },
      { name: "Uns", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Brittiskt/amerikanskt", commonUse: "Livsmedel och små massor" },
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
      "Omvandla temperaturer mellan Celsius, Fahrenheit och Kelvin; se formler och exempelvärden.",
    introduction: [
      "Temperatur är en grundläggande fysikalisk storhet kopplad till den genomsnittliga kinetiska energin hos partiklarna i ett ämne, och uttrycker hur 'varmt' eller 'kallt' det ämnet är. I det Internationella Enhetssystemet är temperaturens grundenhet kelvin.",
      "I vardagslivet är Celsius- och Fahrenheitskalorna mest använda; inom vetenskapligt arbete används kelvin, i vissa tekniska beräkningar Rankine, och i historiska texter kan Réaumur förekomma. Till skillnad från många andra fysikaliska storheter kräver temperaturomvandling mellan enheter inte bara multiplikation, utan även addition eller subtraktion.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensionssymbol", value: "[Θ]" },
      { label: "SI-grundenhet", value: "Kelvin" },
      { label: "Symbol för SI-enhet", value: "K" },
      { label: "Absoluta nollpunkten", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Vad är temperatur?",
        paragraphs: [
          "Temperatur är en storhet direkt kopplad till den genomsnittliga kinetiska (rörelse-)energin hos atomerna och molekylerna som utgör ett ämne. Ju snabbare partiklarna rör sig, desto 'varmare' anses ämnet vara.",
          "Temperatur är en av de sju grundstorheterna i det Internationella Enhetssystemet och representeras, som termodynamisk temperatur, med symbolen Θ (theta). Till skillnad från många andra storheter (som längd eller massa) är den inte en direkt additiv storhet -- att föra två kroppar i kontakt adderar inte deras temperaturer, utan för dem mot en jämvikt.",
        ],
      },
      {
        title: "SI-enheten för temperatur: kelvin",
        paragraphs: [
          "Kelvin är SI:s grundenhet för temperatur och representeras med symbolen K (utan gradtecken, skrivs helt enkelt 'K'). Kelvinskalan tar den absoluta nollpunkten (den teoretiskt lägsta möjliga temperaturen) som utgångspunkt (0 K).",
          "Sedan SI-revideringen 2019 definieras kelvin inte längre utifrån vattnets trippelpunkt, utan utifrån det fastslagna numeriska värdet för Boltzmanns konstant (k). Detta säkerställer att temperaturenheten bygger på en universell konstant och inte på ett fysiskt referensämne.",
        ],
      },
      {
        title: "Varför är temperaturomvandling inte en enkel multiplikation?",
        paragraphs: [
          "För storheter som längd eller massa sker enhetsomvandling bara med en multiplikationsfaktor (till exempel meter-centimeter). För temperatur kräver omvandlingen, eftersom Celsius-, Fahrenheit- och Kelvinskalorna har olika 'nollpunkter', både multiplikation och addition eller subtraktion.",
          "För att till exempel gå från Celsius till Fahrenheit multipliceras värdet först med 9/5 och sedan adderas 32: °F = (°C × 9/5) + 32. Därför är temperatur, matematiskt sett, den enda vanliga fysikaliska storheten med ett 'affint' (linjärt, men inte genom origo) omvandlingssamband.",
        ],
      },
      {
        title: "Celsiusskalan",
        paragraphs: [
          "Celsiusskalan utvecklades 1742 av den svenske astronomen Anders Celsius och definierar vattnets fryspunkt vid 0 °C och kokpunkt (vid ett tryck av en atmosfär) vid 100 °C. Det är ett praktiskt referenssystem som gör det lättare att första skalan i vardagslivet.",
          "Celsius är den mest använda temperaturskalan i världen, både inom vetenskapligt arbete och i den dagliga väderinformationen i de flesta länder; ett fåtal länder, som USA, föredrar fortfarande Fahrenheit i vardagsbruk.",
        ],
      },
      {
        title: "Fahrenheitskalan",
        paragraphs: [
          "Fahrenheitskalan utvecklades 1724 av den tyske fysikern Daniel Gabriel Fahrenheit. På denna skala är vattnets fryspunkt 32 °F och kokpunkt 212 °F -- ett exakt intervall på 180 grader mellan frysning och kokning.",
          "Fahrenheit används fortfarande idag för dagliga temperaturmätningar i ett fåtal länder, främst USA; inom vetenskapligt arbete världen över har den till stor del fått ge vika för Celsius och Kelvin.",
        ],
      },
      {
        title: "Rankine och Réaumur: mindre kända skalor",
        paragraphs: [
          "Rankine är en absolut temperaturskala som använder enheter av samma storlek som Fahrenheitgrader, men tar den absoluta nollpunkten som 0 °R; vattnets fryspunkt ligger vid 491,67 °R. Den föredras framför Kelvin i vissa termodynamiska tekniska beräkningar i USA.",
          "Réaumurskalan utvecklades på 1700-talet av den franske vetenskapsmannen Rene Réaumur; den fastställer vattnets fryspunkt till 0 °Ré och kokpunkt till 80 °Ré. Även om den idag praktiskt taget inte används, kan den fortfarande hittas som historisk referens i vissa europeiska länder (särskilt i vissa traditionella ryska recept).",
        ],
      },
      {
        title: "Vad betyder den absoluta nollpunkten?",
        paragraphs: [
          "Den absoluta nollpunkten (0 kelvin, -273,15 °C, -459,67 °F) är den teoretiska temperatur vid vilken partiklar, i klassisk mening, har den lägsta möjliga kinetiska energin. Enligt kvantmekaniken står partiklar inte helt stilla ens vid den absoluta nollpunkten (nollpunktsenergi), men i klassisk mening kan ingen lägre temperatur definieras.",
          "I laboratoriet har man uppnått temperaturer extremt nära den absoluta nollpunkten (i storleksordningen mikrokelvin, till och med nanokelvin), men enligt termodynamikens tredje huvudsats är det omöjligt att exakt nå den absoluta nollpunkten i ett ändligt antal steg.",
        ],
      },
      {
        title: "Hur mäts temperatur?",
        paragraphs: [
          "För att mäta temperatur används olika tekniker: kvicksilver- eller alkoholtermometrar, digitala termometrar, termoelement, motståndstermometrar (RTD) och infrarödtermometrar (beröringsfria). Var och en är lämpad för ett olika temperaturintervall och precisionsnivå.",
          "Termoelement används i stor utsträckning inom industrin eftersom de kan fungera över ett mycket brett temperaturintervall (ibland från -200 °C till +2000 °C); de beräknar temperaturen utifrån spänningsskillnaden som uppstår vid sammanfogningen av två olika metaller.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grundenhet", system: "SI", commonUse: "Vetenskapliga och termodynamiska beräkningar" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metriskt (vardagsbruk)", commonUse: "Meteorologi, vardagsliv, vetenskap" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig meteorologi i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (teknik)", commonUse: "Termodynamiska tekniska beräkningar" },
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
      "Använd på en sida de viktigaste tidsomvandlingarna mellan sekunder, minuter och timmar.",
    introduction: [
      "Tid är en grundläggande fysikalisk storhet som uttrycker ordningen i vilken händelser inträffar och den varaktighet som ligger mellan dem. I det Internationella Enhetssystemet är tidens grundenhet sekunden, som i vardagslivet används tillsammans med härledda enheter som minut, timme och dygn.",
      "Till skillnad från storheter som längd eller massa är tid ett av de äldsta mätbegreppen i mänsklighetens historia; den sexagesimala strukturen (bastal 60) hos timme, minut och sekund går tusentals år tillbaka till den gamla babyloniska civilisationen.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Tid" },
      { label: "Dimensionssymbol", value: "[T]" },
      { label: "SI-grundenhet", value: "Sekund" },
      { label: "Symbol för SI-enhet", value: "s" },
      { label: "Nuvarande definition av sekunden", value: "9 192 631 770 svängningsperioder hos cesium-133-atomen" },
    ],
    sections: [
      {
        title: "Vad är tid?",
        paragraphs: [
          "Tid är en grundläggande storhet som uttrycker ordningen i vilken händelser inträffar och den varaktighet som förflyter mellan två händelser. Inom fysiken representeras den med dimensionssymbolen T och spelar en roll i definitionen av många härledda storheter, som hastighet, acceleration och frekvens.",
          "I klassisk fysik betraktades tid som en absolut storhet som förflöt på samma sätt för alla observatörer; med Einsteins relativitetsteori förstod man att tid kan förflyta olika beroende på observatörns hastighet och gravitationsfältet (tidsdilation).",
        ],
      },
      {
        title: "SI-enheten för tid: sekunden",
        paragraphs: [
          "Sekunden är SI:s grundenhet för tid, med symbolen s. Historiskt definierades sekunden som 1/86 400 av ett dygn (24 timmar × 60 minuter × 60 sekunder).",
          "Eftersom denna definition visade sig vara otillräckligt stabil på grund av små oregelbundenheter i jordens rotationshastighet, definierades sekunden 1967 om till exakt 9 192 631 770 perioder av den strålning som hör samman med övergången mellan två grundläggande energinivå hos cesium-133-atomen. Denna definition gör det möjligt för atomklockor att fungera med samma precision överallt i världen.",
        ],
      },
      {
        title: "Det sexagesimala ursprunget till timme, minut och sekund",
        paragraphs: [
          "Uppdelningen av en timme i 60 minuter och en minut i 60 sekunder går tillbaka till det sexagesimala talsystemet (bastal 60) som användes av den gamla babyloniska civilisationen. Babylonierna delade både vinkeln (360 grader) och tiden enligt detta system.",
          "Talet 60 valdes eftersom det är exakt delbart med många tal -- 2, 3, 4, 5, 6, 10, 12, 15, 20 och 30 -- vilket underlättar praktiska uppdelningar i vardagliga beräkningar (till exempel att dela en timme i tre eller fyra delar) utan att behöva bråktal.",
        ],
      },
      {
        title: "Uppdelningen av dygnet i 24 timmar",
        paragraphs: [
          "Uppdelningen av dygnet i 24 timmar går tillbaka till det gamla Egypten; egyptierna delade dagen i 12 lika delar och natten i ytterligare 12, och följde tiden via solur och stjärnobservationer.",
          "Denna indelning i 12 inspirerades troligen av att räkna fingerlederna (tre leder på vart och ett av de fyra fingrarna utan tummen, totalt 12) eller antalet månfaser under ett år (cirka 12 fullmånar).",
        ],
      },
      {
        title: "Sambandet mellan de metriska tidsenheterna",
        paragraphs: [
          "Sekundens underenheter -- millisekund (0,001 sekund), mikrosekund och nanosekund -- används för att mäta mycket korta händelser, som datorprocessoroperationer, sporttidtagning och vetenskapliga experiment.",
          "Dess multiplar -- minuten (60 sekunder), timmen (3600 sekunder) och dygnet (86 400 sekunder) -- är de grundenheter som dagligen används för att hålla reda på tiden. Omvandling mellan dessa enheter sker, till skillnad från temperatur, bara genom multiplikation/division, eftersom de alla delar en gemensam nollpunkt (ursprung).",
        ],
      },
      {
        title: "Vad är en skottsekund?",
        paragraphs: [
          "Jordens rotationshastighet kring sin egen axel uppvisar över tid små oregelbundenheter på grund av tidvatteneffekter och förändringar i dess inre struktur; detta skapar en liten skillnad mellan den 'exakta' tid som mäts av atomklockor och dygnets längd baserat på jordens faktiska rotation.",
          "För att kompensera för denna skillnad läggs sedan 1972 en 'skottsekund' till den Koordinerade Universella Tiden (UTC) vid behov. Det är en korrigeringsmekanism som liknar skottårens extra dag (29 februari), men eftersom oregelbundenheten i jordens rotation är oförutsägbar läggs skottsekunder inte till i en fast cykel som kalendern, utan efter behov.",
        ],
      },
      {
        title: "Tidszoner och UTC",
        paragraphs: [
          "Jorden är indelad i cirka 24 tidszoner, eftersom solen när sin högsta punkt vid olika tidpunkter beroende på longitud. Alla tidszoner använder den Koordinerade Universella Tiden (UTC) som referenspunkt och uttrycks som en tidsskillnad i förhållande till denna referens beroende på deras region (Sverige är till exempel UTC+1 på vintern).",
          "UTC är en modern tidsstandard som har ersatt den gamla Greenwich Mean Time (GMT) och underhålls med atomklockor; GMT används idag främst som namnet på den tidszon som motsvarar vintertid i Storbritannien.",
        ],
      },
      {
        title: "Hur mäts tid?",
        paragraphs: [
          "I vardagslivet används mekaniska och digitala klockor, medan atomklockor används i vetenskapliga och tekniska tillämpningar (GPS-satelliter, telekommunikationsnät). Atomklockor fungerar med extremt hög precision, baserat på den stabila svängningsfrekvensen hos cesium- eller rubidiumatomer.",
          "För att GPS-systemet ska kunna fastställa en exakt position måste satelliternas atomklockor vara synkroniserade med nanosekundprecision; även en liten avvikelse i dessa klockor kan orsaka stora fel vid beräkning av positionen på marken.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metriskt", commonUse: "Databehandling och sporttidtagning" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grundläggande tidmätning" },
      { name: "Minut", symbol: "min", referenceValue: "60 s", system: "Tillåten tillsammans med SI", commonUse: "Daglig tidsregistrering" },
      { name: "Timme", symbol: "h", referenceValue: "3600 s", system: "Tillåten tillsammans med SI", commonUse: "Arbetstid, restid" },
      { name: "Dygn", symbol: "dygn", referenceValue: "86 400 s", system: "Tillåten tillsammans med SI", commonUse: "Kalender och varaktighetsberäkningar" },
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
      "Hastighet är en härledd fysikalisk storhet som uttrycker den sträckan ett föremål tillryggalägger per tidsenhet. Eftersom den fas genom att dela en längd med en tid, är hastighetens dimension L/T (längd delat med tid).",
      "I vardagslivet är kilometer i timmen (km/h) och engelska mil i timmen (mph) de mest använda hastighetsenheterna; meter per sekund (m/s) föredras inom vetenskapligt arbete, och knop inom sjöfart och luftfart. Ljushastigheten intar en särskild plats bland hastighetsenheterna, som en absolut övre gräns som kan uppnås i universum.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Hastighet" },
      { label: "Dimensionssymbol", value: "[L/T]" },
      { label: "Härledd SI-enhet", value: "Meter per sekund" },
      { label: "Symbol för SI-enhet", value: "m/s" },
      { label: "Universell hastighetsgräns", value: "Ljushastighet ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Vad är hastighet?",
        paragraphs: [
          "Hastighet uttrycker den sträckan ett föremål tillryggalägger per tidsenhet och beräknas med formeln Hastighet = Sträckan / Tid. Även om fysiken tekniskt gör skillnad mellan 'fart' (skalar, utan riktning) och 'hastighet' (vektoriell, med riktning), används de två termerna ofta omväxlande i vardagligt språk.",
          "Hastighet är en härledd storhet, som fas genom att dela en längdenhet med en tidsenhet. Därför anges dess SI-dimension som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheten för hastighet: meter per sekund",
        paragraphs: [
          "I det Internationella Enhetssystemet är hastighetens härledda enhet meter per sekund (m/s), som uttrycker att ett föremål tillryggalägger en meter varje sekund. Denna enhet används som standard i vetenskapliga beräkningar och fysikaliska formler.",
          "I vardagslivet föredras kilometer i timmen (km/h) framför meter per sekund, eftersom fordonshastigheter och vägavstånd på så sätt uttrycks med mer intuitiva tal på den skalan. 1 m/s motsvarar exakt 3,6 km/h.",
        ],
      },
      {
        title: "Kilometer i timmen och engelska mil i timmen",
        paragraphs: [
          "Kilometer i timmen (km/h) är standardenheten för vägfordonshastighet i länder som använder det metriska systemet, däribland Sverige. Engelska mil i timmen (mph) föredras i länder som använder det brittiska mätsystemet, som USA och Storbritannien.",
          "1 mph motsvarar cirka 1,60934 km/h. Denna skillnad är en praktisk källa till förvirring som kan leda till felaktig tolkning av hastighetsmätare på importerade fordon eller hastighetsgränser vid hyrbil utomlands.",
        ],
      },
      {
        title: "Knop: hastighet inom sjöfart och luftfart",
        paragraphs: [
          "Knop (nautisk mil per timme) är standardhastighetsenheten inom sjöfart och luftfart; 1 knop betyder exakt att tillryggalägga en nautisk mil (1852 meter) på en timme.",
          "Enhetens namn 'knop' härstammar historiskt från metoden som användes för att mäta fartygs hastighet: ett rep med knutar kastades i vattnet och man räknade hur många knutar som passerade under en bestämd tid. Denna metod användes i århundraden innan moderna hastighetsmätinstrument fanns tillgängliga.",
        ],
      },
      {
        title: "Ljushastigheten: universums hastighetsgräns",
        paragraphs: [
          "Ljushastigheten i vakuum är exakt definierad som 299 792 458 m/s och utgör, enligt Einsteins speciella relativitetsteori, den absoluta övre gräns som kan uppnås av information eller ett föremål med massa i universum.",
          "Att ljushastigheten är definierad som ett exakt tal (och redan före SI-revideringen 2019 betraktades som konstant) gör det möjligt att metern nuvarande definition också bygger på denna konstant -- metern definieras som den sträckan ljus tillryggalägger på 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Machtalet: ett samband med ljudhastigheten",
        paragraphs: [
          "Inom luftfarten uttrycks höga hastigheter ofta via Machtalet, som representerar förhållandet mellan ett föremåls hastighet och ljudhastigheten i det mediet (Mach 1 = ljudhastighet). Ljudhastigheten är inte ett fast värde; den varierar utifrån luftens temperatur och densitet (cirka 343 m/s, det vill säga 1235 km/h, vid havsnivå).",
          "Därför kan samma Machtal motsvara olika verkliga hastigheter (i km/h eller m/s) beroende på höjd och temperatur -- ett flygplans Mach 0,85-hastighet varierar i verkligt värde med höjden.",
        ],
      },
      {
        title: "Skillnaden mellan medelhastighet och momentanhastighet",
        paragraphs: [
          "Medelhastigheten fas genom att dela den totala tillryggalagda sträckan med den totala förflutna tiden och ger ett enda värde för hela resan. Momentanhastigheten är ett föremåls hastighet vid en specifik tidpunkt och kan variera kontinuerligt (acceleration, retardation, stillastående, osv.).",
          "Medan ett fordons hastighetsmätare visar momentanhastigheten, beräknas medelhastigheten för en resa vanligtvis i efterhand utifrån den totala sträckan och den totala varaktigheten -- de två värdena skiljer sig så länge hastigheten inte har varit konstant under resan.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metriskt", commonUse: "Laboratorium och mätning av långsam rörelse" },
      { name: "Meter per minut", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metriskt", commonUse: "Hastighet på industriella transportband" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Vetenskapliga och fysikaliska beräkningar" },
      { name: "Kilometer i timmen", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metriskt", commonUse: "Fordonshastighet och hastighetsgränser" },
      { name: "Engelsk mil i timmen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Brittiskt/amerikanskt", commonUse: "Fordonshastighet i USA och Storbritannien" },
      { name: "Knop", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Sjöfart/luftfart", commonUse: "Hastighet på fartyg och flygplan" },
      { name: "Kilometer per minut", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metriskt", commonUse: "Hastighetsberäkningar över korta avstånd" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metriskt", commonUse: "Hastighet på rymdfarkoster och himlakroppar" },
      { name: "Ljushastighet", symbol: "c", referenceValue: "299 792 458 m/s", system: "Universell konstant", commonUse: "Fysikaliska och astronomiska beräkningar" },
    ],
  },
  {
    locale: "sv",
    slug: "tryck",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Omvandla tryckenheter",
    description:
      "Omvandla tryck mellan pascal, kilopascal, bar och PSI; se formler och tekniska tillämpningar.",
    introduction: [
      "Tryck är den fysikaliska storhet som uttrycker mängden kraft som verkar vinkelrätt mot en yta, i förhållande till den ytan. Tillämpningsområdet är mycket brett, från kontaktspänningar mellan fasta ämnen till vätska i en ledning, från atmosfären till vakuumsystem. Inom teknik är tryck inte bara ett tal: det är en grundläggande designvariabel för säkerhet, tätning, strukturell hållfasthet, energiomvandling och processreglering.",
      "I det Internationella Enhetssystemet är tryckets härledda enhet pascal, med symbolen På. En pascal motsvarar det tryck som utövas av en kraft på en newton jämnt fördelad över en yta på en kvadratmeter. Därför är tryck direkt kopplat till begreppen kraft och yta; det delar samma dimensionella struktur som mekanisk spänning i material, även om den fysiska kontexten inte alltid är densamma.",
      "I vardagslivet och industrin uttrycks tryck oftast i mer praktiska enheter än pascal. Kilopascal och PSI används i stor utsträckning för däcktryck, bar i processystem, atm vid atmosfäriska förhållanden och millibar inom meteorologi. Att olika sektorer historiskt har antagit olika enheter gör det särskilt viktigt att första tryckomvandlingar väl och inte förväxla absolut, relativt eller differentiellt tryck.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Tryck" },
      { label: "Härledd SI-enhet", value: "Pascal" },
      { label: "SI-symbol", value: "På" },
      { label: "Grundsamband", value: "P = F / A" },
      { label: "SI-motsvarighet", value: "1 På = 1 N/m²" },
      { label: "Dimensionell formel", value: "M L⁻¹ T⁻²" },
      { label: "Standardatmosfär", value: "101 325 På" },
      { label: "Absolut nollreferens", value: "Fullständigt vakuum" },
    ],
    sections: [
      {
        title: "Vad är tryck?",
        paragraphs: [
          "Tryck beror inte bara på storleken på den kraft som verkar på en yta, utan även på den yta som kraften fördelas över. Om samma kraft verkar på en mindre yta ökar trycket; om den fördelas över en större yta minskar det. Därför kan en skarpt slipad kniv skära med liten kraft, medan samma kraft på en bred yta ger en mycket mindre ytpåverkan.",
          "Inom vätskemekaniken betraktas tryck som den normala spänningskomponent en vätska i vila eller rörelse utövar på sin omgivning. I en vätska i vila fortplantar sig trycket i alla riktningar och är kopplat till Pascals princip i slutna kärl. Denna egenskap ligger till grund för hydrauliska pressar, bromssystem och talrika industriella manöverdon.",
          "Begreppet tryck är inte begränsat till vätskor och gaser. Effekten av den genomsnittliga normalkraften på kontaktytor skapar också en tryckliknande fördelning. Men inom tekniken tänker man vid tryck främst på vätskesystem som ledningar, tankar, kompressorer, luftkanaler, vakuumkammare och den atmosfäriska omgivningen.",
        ],
      },
      {
        title: "Tryckformeln: P = F / A",
        paragraphs: [
          "Trycks grunddefinition ges av sambandet P = F / A. Här representerar P trycket, F kraftkomponenten vinkelrätt mot ytan, och A den yta som kraften fördelas över. Den dimensionella analysen ger newton delat med kvadratmeter, vilket motsvarar enheten pascal.",
          "Detta samband ger, under antagande av en jämn kraftfördelning, medeltrycket. Vid verkliga kontaktproblem eller komplexa fält inuti en vätska kan trycket variera över ytan. I sådana fall beaktas istället för ett enda medelvärde den lokala tryckfördelningen, differentialekvationer och randvillkor.",
          "Ett vanligt fel i praktiken är att välja fel riktning på kraften och den effektiva ytan. Vid beräkning av kraften hos en kolv måste till exempel bara den effektiva tvärsnittsyta som utsätts för trycket användas. Att ignorera geometriska detaljer som packningen, bulten eller stödytan kan leda till konstruktionsfel.",
        ],
      },
      {
        title: "Varför är pascal SI-enheten för tryck?",
        paragraphs: [
          "Pascal uppstår naturligt ur kombinationen av newton, SI:s kraftenhet, och kvadratmeter, SI:s areaenhet. Likheten 1 På = 1 N/m² är inte bara en definition, utan också ett dimensionellt uttryck som visar tryckets mekaniska ursprung. Därför behövs ingen oberoende grundenhet för tryck definieras.",
          "SI-systemet strävar efter att på ett konsekvent sätt koppla härledda storheter till grundenheter. Att uttrycka tryck i pascal ger ett ramverk som är kompatibelt med energitäthet, spänning, elasticitetsmodul och ekvationer från vätskemekaniken. Att samma enhet kan användas inom olika områden minskar omvandlingsfel i beräkningar.",
          "På vardaglig skala är pascal oftast en mycket liten enhet. Därför föredrar tekniken mer praktiska skalor som kilopascal, megapascal eller bar. Ändå är de alla i slutändan kopplade till pascal och således till SI-basen.",
        ],
      },
      {
        title: "Tryckmätningens historia: Torricelli och barometern",
        paragraphs: [
          "Den systematiska mätningen av tryck inleddes 1643 med utvecklingen av kvicksilverbarometern av den italienske vetenskapsmannen Evangelista Torricelli. Torricelli observerade att när ett i ena änden slutet glasrör fyllt med kvicksilver, med den öppna änden nedsänkt i ett kvicksilverkärl, så stannade kvicksilvret i röret på en viss höjd och lämnade ett vakuum ovanför.",
          "Torricelli föreslog att höjden på kvicksilverpelaren balanserades av den yttre luftens vikt. Denna idé lade den experimentella grunden för tanken att luft har en mätbar vikt och därmed ett tryck, och betraktas som utgångspunkten för studiet av tryck som en vetenskaplig storhet.",
          "1648 mätte Florin Périer, på förslag av Blaise Pascal, en barometer på olika höjder på Puy de Dôme och visade att det atmosfäriska trycket minskar med höjden. Det senare arbetet utifrån dessa grunder ledde till internationell samordning av mätenheter med Meterkonventionen 1875, den exakta definitionen av standardatmosfären 1954 och införandet av pascal i SI 1971.",
        ],
      },
      {
        title: "Absolut, relativt och differentiellt tryck",
        paragraphs: [
          "Absolut tryck mäts i förhållande till fullständigt vakuum. Denna referens är situationen där trycket teoretiskt är noll, och absolut tryck kan aldrig vara negativt. Gaslagar, termodynamiska beräkningar och vissa densitetsrelaterade samband fungerar med absolut tryck.",
          "Relativt (eller över-)tryck mäts i förhållande till det atmosfäriska trycket. De flesta manometrar i fält tar den omgivande atmosfären som nollreferens; därför är värdet som avläses på skärmen oftast det relativa trycket. Sambandet mellan absolut och relativt tryck uttrycks som P_abs = P_rel + P_atm.",
          "Differentiellt tryck är tryckskillnaden mellan två punkter. Vid tillämpningar som filterigensättning, flödesmätning via en mätplatta, rumstrycksreglering eller en värmeväxlares prestanda följs direkt tryckskillnaden mellan två ledningar eller två olika volymer. Denna storhet är varken definierad i förhållande till fullständigt vakuum eller enbart i förhållande till atmosfären; den är direkt skillnaden mellan två punkter.",
        ],
      },
      {
        title: "Atmosfäriskt tryck",
        paragraphs: [
          "Atmosfäriskt tryck är det tryck som utövas på ytor av vikten hos jordatmosfärens luftpelare. Under standardförhållanden nära havsnivå anses det vara cirka 101 325 På, det vill säga 1 atm. Detta är dock inget konstant värde; det varierar med höjd, väderförhållanden och temperatur.",
          "Barometrar används för att mäta det atmosfäriska trycket. Kvicksilverbarometrar var historiskt referensinstrument, medan elektroniska trycksensorer har blivit vanliga i moderna tillämpningar. Atmosfäriskt tryck är inte bara viktigt för meteorologin, utan även för vakuumteknik, förbränningssystem och omvandlingar mellan relativt och absolut tryck.",
          "I system som arbetar med relativt tryck kan variationer i det atmosfäriska trycket påverka tolkningen av mätningen. Ett relativt tryck på 2 bar vid havsnivå och ett relativt tryck på 2 bar på hög höjd ger till exempel inte samma absoluta värde. Denna distinktion kan vara avgörande, särskilt vid kompressionsberäkningar, gasdensitet och kokpunkt.",
        ],
      },
      {
        title: "Hydrostatiskt tryck och sambandet P = ρgh",
        paragraphs: [
          "I en vätska i vila ökar trycket med djupet. Under antagande av konstant densitet uttrycks det hydrostatiska relativa trycket ungefär med sambandet P = ρgh. Här representerar ρ densiteten, g tyngdaccelerationen och h höjden på vätskepelaren.",
          "Detta samband är särskilt användbart för vattentankar, öppna bassänger, dammar, nivåmätning och vätskepelarmanometrar. Vid samma höjd och i samma vätska anses trycket vara lika; kärlets form ändrar inte resultatet. Det som räknas är vätskans densitet och det vertikala djupet i förhållande till den fria ytan.",
          "Det absoluta hydrostatiska trycket omfattar inte bara ökningen ρgh, utan även begynnelsetrycket på den fria ytan. I ett öppet kärl är detta begynnelsevärde oftast det atmosfäriska trycket. Vid beräkning av absolut tryck måste därför inte bara ökningen från vätskepelaren adderas, utan även det yttre trycket på ytan.",
        ],
      },
      {
        title: "Statiskt, dynamiskt och totalt tryck",
        paragraphs: [
          "Statiskt tryck är den tryckkomponent som representerar flödets lokala termodynamiska tillstånd, ur perspektivet hos en observatör som rör sig med vätskan. De flesta mätpunkter i ledningar, tankar och kanaler följer i grunden det statiska trycket. De flesta trycktransmittrar är konstruerade för att mäta denna storhet.",
          "Dynamiskt tryck uttrycker den kinetiska effekten till följd av flödeshastigheten och den vanliga approximativa formeln är q = 1/2 ρv². Denna term spelar en viktig roll i Bernoullis approximation och används i hastighetsmätmetoder som pitotröret. Ju högre hastighet, desto högre dynamiskt tryck.",
          "I det ideala flödesantagandet tolkas det totala trycket som summan av statiskt och dynamiskt tryck. I verkliga system måste denna distinktion användas med försiktighet på grund av friktion, turbulens, komprimerbarhet och lokala förluster. Ändå förblir distinktionen statisk-total-dynamisk ett grundläggande tekniskt språk inom ventilation, aerodynamik och processmätningar.",
        ],
      },
      {
        title: "Tryckhöjd och en pumps uppfordringshöjd",
        paragraphs: [
          "Tryckhöjd uttrycker ett visst tryck i termer av den motsvarande höjden hos en vätskepelare. Grundsambandet skrivs h = P / (ρg). Så motsvarar samma tryck en annan höjd beroende på vätskans densitet.",
          "I pumpsystem tolkas tryck oftast inte direkt i pascal eller bar, utan i meter vätskepelare. Detta beror på att pumpens funktion inte bara är att ge vätskan tryck, utan också att förse den med den energi som krävs för att övervinna en viss höjd, friktionsförluster och en hastighetskomponent. Därför är begreppet uppfordringshöjd mycket praktiskt ur fältteknikens perspektiv.",
          "Tryckhöjd och geometrisk höjd är inte samma begrepp. Att bara lita på avläsningen från en manometer utan att beakta ledningsförluster, hastighetshöjd och lokala motstånd kan ge felaktiga resultat vid pumpval och systembalansering. Särskilt för vatten, olja och processvätskor kräver densitetsskillnader en noggrann omvandling.",
        ],
      },
      {
        title: "Varför finns det olika tryckenheter?",
        paragraphs: [
          "Mångfalden av tryckenheter förklaras till stor del av historiska och sektoriella skäl. Medan SI-systemet tar pascal som referens, fortsätter industrin att använda bar, medicinen mmHg, meteorologin millibar, fordonsbranschen PSI, och vissa gamla tekniska dokument den tekniska atmosfären. Denna situation beror på att de olika områdena behåller sina egna bruksvanor.",
          "Vissa enheter är mer intuitiva för användaren. Däcktrycket kan till exempel verka mer läsbart uttryckt i cirka 35 psi än i 240 kPa, och processtrycket i 3,5 bar istället för i 350 000 På. Valet av enhet beror inte bara på precision, utan även på förhållandekultur, instrumentens skala och bruksvanor i fält.",
          "Eftersom olika enheter dock uttrycker samma fysikaliska storhet är en noggrann omvandling oumbärlig vid kombinerade beräkningar. Att förväxla approximativa omvandlingsfaktorer med exakt definierade faktorer, ignorera distinktionen relativ-absolut, och läsa symboler fel är viktiga felkällor.",
        ],
      },
      {
        title: "Hur mäts tryck?",
        paragraphs: [
          "För att mäta tryck måste man först fastställa vilken trycktyp som krävs: absolut, relativt eller differentiellt. Därefter bedöms mätområdet, vätsketypen, temperaturen, den kemiska kompatibiliteten, vibrationer och den precisionsnivå som krävs. Samma sensor kanske inte passar för alla tillämpningar.",
          "För lågtrycks- och differentialmätningar kan membran-differentialtransmittrar användas; för höga processtryck, töjningsgivare eller piezoresistiva element; och för vakuumtillämpningar, specifika absoluta sensorer. Vätskepelarmanometrar är mycket användbara för att lära ut grundprincipen; men i modern industri är elektronisk utrustning vanligare.",
          "För en noggrann mätning måste hänsyn tas till impulsledningarnas placering, sensorns monteringsposition, nollställning och temperatureffekter. I gas- och vätskeledningar kan en densitetsskillnad eller kondensation skapa en extra hydrostatisk belastning på sensorn. Därför bestämmer installationsdetaljer resultatet lika mycket som valet av utrustning.",
        ],
      },
      {
        title: "Trycksensorer och manometrar",
        paragraphs: [
          "Mekaniska manometrar, som Bourdonrörsindikatorer, omvandlar tryck till en avläsbar visarrörelse genom deformationen av ett elastiskt element. Robusta, enkla och utan behov av energi, har de använts länge inom industrin. Vid tillämpningar som kräver precision och dataloggning är elektroniska sensorer dock mer flexibla.",
          "Elektroniska trycksensorer kan vara piezoresistiva, kapacitiva, töjningsgivarbaserade eller resonansbaserade. Dessa sensorer omvandlar tryckförändringen till en elektrisk signal, som skickas till PLC-, SCADA- eller datainsamlingssystem. Detta möjliggör inte bara direkt avläsning, utan även larm, reglering och trendanalys.",
          "Differentialmanometrar ger tryckskillnaden mellan två punkter, absoluta sensorer trycket i förhållande till fullständigt vakuum, och manometriska instrument trycket i förhållande till atmosfären. Att bara lita på det numeriska värdet utan att kontrollera referenstypen i ett instruments datablad kan leda till allvarliga tolkningsfel.",
        ],
      },
      {
        title: "Användningsområden för tryck inom teknik",
        paragraphs: [
          "Tryck är en grundläggande designvariabel inom talrika tekniska områden: ledningar, klimatanläggningar, hydraulik, pneumatik, kemiska processer, kraftverk, vattendistributionssystem, fordonsindustri och luftfart. Från väggtjockleken på en tank till val av ventiler, från en kompressors utloppsförhållanden till ett filters prestanda, baseras många beslut på tryckinformation.",
          "Inom processteknik övervakas tryckgränser för säker drift av reaktorer, pannor, värmeväxlare och separatorer. Tryck-säkerhetsventiler, sprängskivor och reglerkretsar är därför kritisk utrustning. Tryck används också för indirekt mätning av andra processvariabler, som flöde och nivå.",
          "Inom maskinteknik och byggnation kombineras tryck med kontaktytor och vätskekrafter i spänningsanalyser. Inom medicin och biomedicinsk utrustning framträder blodtryck, ventilationstryck och vakuumtillämpningar; inom miljö och meteorologi, atmosfäriska och differentiella tryckmätningar.",
        ],
      },
      {
        title: "Temperatur, höjd och osäkerhet vid tryckmätning",
        paragraphs: [
          "Temperatur kan påverka både egenskaperna hos den mätta vätskan och sensorelementets beteende. Särskilt för gaser måste, eftersom temperatur ändrar densiteten, tryck-volym-temperatursambandet omvärderas. Därför innehåller sensorers datablad parametrar som nolldrift och spanndrift som är temperaturberoende.",
          "Det atmosfäriska trycket tenderar att minska med höjden. Detta ändrar sambandet mellan relativt och absolut tryck, och kan också påverka referensbeteendet hos viss fältutrustning. Samma processförhållande kan ge olika absoluta tryckresultat på olika höjder.",
          "Varje mätning innebär en osäkerhet. Kalibreringsstandarden, upplösningen, hysteresen, temperatureffekten, monteringsorienteringen, vibrationer och långsiktig drift bidrar alla till den totala osäkerheten. Vid kritiska tillämpningar måste designbeslutet omfatta inte bara det nominella tryckvärdet, utan även utrustningens klass och mätningens tillförlitlighet.",
        ],
      },
      {
        title: "Sambandet och skillnaden mellan tryck och spänning",
        paragraphs: [
          "Tryck och spänning delar samma dimensionella struktur och kan båda uttryckas i pascal. Denna likhet beror på att båda representerar en krafteffekt per ytenhet. Detta betyder dock inte att de fysiskt är samma storhet.",
          "Tryck uppfattas i allmänhet som en isotrop normalspänning som utövas av vätskor; det vill säga, i en vätska i vila är trycket vid samma punkt identiskt i alla riktningar. Spänning inom mekaniken för fasta ämnen kan däremot ha normal- och skjuvkomponenter, vara riktningsberoende och ha en tensorstruktur.",
          "Att ignorera denna distinktion kan leda till felaktiga tolkningar, särskilt vid beräkningar av tankväggar, tätningsytor eller materialhållfasthet. En vätskas inre tryck skapar omkrets- och axialspänningar på tanken; men spänningsfältet i tankmaterialet är inte identiskt med vätskans eget tryck.",
        ],
      },
      {
        title: "Vanliga fel vid tryckberäkningar",
        paragraphs: [
          "Det vanligaste felet är att förväxla relativt med absolut tryck. Särskilt vid gaslagar, densitetsberäkningar och vakuumtillämpningar krävs absolut tryck, men ibland används direkt det relativa värdet från en manometer. Detta orsakar ett systematiskt fel i resultatet.",
          "Ett annat fel är att avrunda omvandlingsfaktorer eller använda en felaktig enhetsreferens. Vid omvandling mellan PSI, bar, atm, mmHg och kPa måste man avgöra vilken precisionsnivå som är tillräcklig för de approximerade värdena. Om utrustningens kalibrering kräver hög precision kan användning av otillräckligt antal decimaler orsaka problem.",
          "Också att ignorera hydrostatiska effekter, förbise sensorns monteringshöjd och inte beakta temperatureffekten förekommer ofta. Särskilt vid vätskefyllda impulsledningar, slutna tankar och differentiella trycktillämpningar kan till synes små installationsdetaljer avsevärt förändra mätresultatet.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 På", system: "SI", commonUse: "Vetenskapliga och tekniska beräkningar" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 På", system: "SI", commonUse: "Anläggningar, däck och processtryck" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 På", system: "Metriskt, utanför SI", commonUse: "Industri, kompressorer och processystem" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 På", system: "Metriskt, utanför SI", commonUse: "Meteorologi och atmosfäriska mätningar" },
      { name: "Standardatmosfär", symbol: "atm", referenceValue: "101 325 På", system: "Utanför SI", commonUse: "Atmosfär och referensförhållanden" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 På", system: "Brittiskt/amerikanskt", commonUse: "Däck, hydrauliska och pneumatiska system" },
      { name: "Teknisk atmosfär", symbol: "at", referenceValue: "98 066,5 På", system: "Utanför SI", commonUse: "Äldre tekniska tillämpningar" },
      { name: "Millimeter kvicksilverpelare", symbol: "mmHg", referenceValue: "≈133,322 På", system: "Utanför SI", commonUse: "Medicin, vakuum och tryckmätningar" },
      { name: "Millimeter vattenpelare", symbol: "mmH₂O", referenceValue: "≈9,80665 På", system: "Utanför SI", commonUse: "Lågtrycksmätningar och ventilation" },
      { name: "Kilogram-kraft per kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 På", system: "Metriskt, utanför SI", commonUse: "Äldre pump- och pannmanometrar" },
    ],
  },
  {
    locale: "sv",
    slug: "energi",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Omvandla energienheter",
    description:
      "Jämför i en kategori energiomvandlingar baserade på joule, kilowattimme, kalori och BTU.",
    introduction: [
      "Energi är den grundläggande fysikaliska storhet som uttrycker ett systems förmåga att utföra arbete. I det Internationella Enhetssystemet är energins härledda enhet joule, som fas ur produkten av en kraft och en förskjutning.",
      "I vardagslivet används kilowattimme (kWh) för elräkningar, kalori/kilokalori inom näring, BTU i klimatanläggningssystem, therm vid fakturering av naturgas, och elektronvolt inom partikelfysik.",
    ],
    facts: [
      { label: "Fysikalisk storhet", value: "Energi (arbete)" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "Härledd SI-enhet", value: "Joule" },
      { label: "Symbol för SI-enhet", value: "J" },
      { label: "Definition av joulen", value: "1 J = förskjutning av 1 meter under en kraft av 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "Vad är energi?",
        paragraphs: [
          "Energi är förmågan hos ett föremål eller system att utföra arbete. Den kan finnas i många former -- kinetisk energi (rörelse), potentiell energi (läge), termisk energi, kemisk energi och elektrisk energi -- och kan, enligt energiprincipen, omvandlas från en form till en annan utan att den totala mängden skapas eller förstörs.",
          "Energi är en härledd storhet, som fas via produkten av en kraft och en förskjutning (arbete), och dess SI-dimension anges som ML²T⁻² (massa × längd i kvadrat / tid i kvadrat).",
        ],
      },
      {
        title: "SI-enheten för energi: joulen",
        paragraphs: [
          "Joulen är SI:s härledda enhet för energi, med symbolen J; uppkallad efter den brittiske fysikern James Prescott Joule från 1800-talet. En joule motsvarar den energi som krävs för att flytta ett föremål 1 meter under påverkan av en kraft på 1 newton.",
          "Eftersom joulen fortfarande är en mycket liten enhet för att uttrycka många vardagliga energimängder, föredras inom teknik och vardagsbruk dess multiplar: kilojoule (tusen joule) och megajoule (en miljon joule).",
        ],
      },
      {
        title: "Kilowattimmen: elräkningarnas enhet",
        paragraphs: [
          "Kilowattimme (kWh) är den mängd energi som förbrukas av en effekt på en kilowatt under en timme, och utgör den globala standardenheten för elfakturering. 1 kWh motsvarar exakt 3 600 000 joule (3,6 megajoule).",
          "För att beräkna en elektrisk apparats energiförbrukning räcker det att multiplicera dess effekt (i watt) med användningstiden (i timmar); en apparat på 2000 watt som går i 3 timmar förbrukar till exempel 6 kWh energi.",
        ],
      },
      {
        title: "Kalorin och kilokalorin: energi inom näring",
        paragraphs: [
          "Kalorin definierades ursprungligen som den mängd energi som krävs för att höja temperaturen hos ett gram vatten med 1 °C, och 1 kalori motsvarar exakt 4,184 joule.",
          "Värdet 'kalorier' som står på livsmedelsetiketter är i vetenskaplig mening egentligen kilokalorier (1000 kalorier) -- denna namnkonvention inom näringslära skapar ofta förvirring; när man säger att ett livsmedel har '200 kalorier', rör det sig egentligen om 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU och therm: energi för klimatanläggningar och naturgas",
        paragraphs: [
          "BTU (British Thermal Unit) är den mängd energi som krävs för att höja temperaturen hos ett pund vatten med 1 °F; det är en enhet av amerikanskt ursprung, men används i stor utsträckning i världen för att uttrycka kapaciteten hos värme- och klimatanläggningssystem. 1 BTU motsvarar cirka 1055,06 joule.",
          "Therm är en stor energienhet som används vid fakturering av naturgas och motsvarar exakt 100 000 BTU. I vissa länder faktureras naturgasförbrukning direkt i therm istället för kubikmeter.",
        ],
      },
      {
        title: "Elektronvolten: den subatomära världens enhet",
        paragraphs: [
          "Elektronvolt (eV) uttrycker den kinetiska energi en elektron får genom att passera en potentialskillnad på en volt; det är en extremt liten energienhet (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "Inom partikel- och atomfysik uttrycks energier ofta i elektronvolt (och dess multiplar keV, MeV, GeV) istället för joule, eftersom joulen på den skalan ger extremt små och opraktiska tal.",
        ],
      },
      {
        title: "Energiprincipen",
        paragraphs: [
          "Enligt energiprincipen, även känd som termodynamikens första huvudsats, förblir den totala energin i ett slutet system konstant; energi varken skapas eller förstörs, den omvandlas bara från en form till en annan.",
          "I en bilmotor omvandlas till exempel kemisk energi (bränsle) först till termisk energi och sedan till mekanisk energi (rörelse); även om en del av energin i denna process omvandlas till onyttig värme genom friktion och avgaser, förändras inte den totala mängden energi.",
        ],
      },
      {
        title: "Varför är omvandling mellan energienheter viktigt?",
        paragraphs: [
          "Olika sektorer föredrar traditionellt olika energienheter: elteknik kilowattimme, näringslära kilokalori, klimatanläggningsbranschen BTU, och naturgasbranschen therm. Att kunna omvandla korrekt mellan dessa olika enheter är nödvändigt för att jämföra energieffektivitet och beräkna kostnader.",
          "För att till exempel jämföra effektiviteten hos en värmepump med en naturgaspanna måste båda systemens energiförbrukning omvandlas till en gemensam enhet (oftast kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Vetenskapliga och fysikaliska energiberäkningar" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metriskt", commonUse: "Livsmedelsenergi (i vissa länder)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metriskt", commonUse: "Bränsle och stora energimängder" },
      { name: "Kalori", symbol: "cal", referenceValue: "4,184 J", system: "Metriskt (traditionellt)", commonUse: "Näring och kemi" },
      { name: "Kilokalori", symbol: "kcal", referenceValue: "4184 J", system: "Metriskt (traditionellt)", commonUse: "Livsmedelsetiketter ('kalorier')" },
      { name: "Wattimme", symbol: "Wh", referenceValue: "3600 J", system: "Metriskt (elektricitet)", commonUse: "Förbrukning av små apparater" },
      { name: "Kilowattimme", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metriskt (elektricitet)", commonUse: "Elfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Brittiskt/amerikanskt", commonUse: "Kapacitet för klimatanläggning och uppvärmning" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Brittiskt/amerikanskt", commonUse: "Fakturering av naturgas" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikelfysik", commonUse: "Mätning av atomär och nukleärt energi" },
    ],
  },
  {
    locale: "sv",
    slug: "datalagring",
    sourceSlug: "veri",
    category: "veri",
    title: "Omvandla datalagringsenheter",
    description:
      "Omvandla mellan byte, kilobyte, megabyte, gigabyte och terabyte; jämför beräkningar baserade på 1000 och 1024.",
    introduction: [
      "Datalagringsenheten (information) uttrycker mängden information som lagras eller behandlas i ett datorsystem. Den mest grundläggande enheten är biten; åtta bitar tillsammans bildar en byte.",
      "Vid lagring och internethastighet förekommer både decimala enheter (bastal 1000) som kilobyte, megabyte, gigabyte och terabyte, och binära enheter (bastal 1024) som kibibyte, mebibyte och gibibyte som används av operativsystem -- skillnaden mellan dessa två system är den huvudsakliga anledningen till att en köpt disk verkar ha 'mindre' utrymme.",
    ],
    facts: [
      { label: "Minsta enhet", value: "Bit (0 eller 1)" },
      { label: "Grundenhet", value: "Byte = 8 bit" },
      { label: "Decimalt system (SI)", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binärt system (IEC)", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Skillnad mellan 1000 och 1024", value: "≈7,4 % skillnad mellan 1 GB (decimalt) och 1 GiB (binärt)" },
    ],
    sections: [
      {
        title: "Vad är bit och byte?",
        paragraphs: [
          "Biten (binär siffra) är den minsta informationsenhet en dator kan behandla och kan bara anta två värden: 0 eller 1. Åtta bitar tillsammans bildar en byte; en byte kan representera 256 (2⁸) olika värden -- tillräckligt för att till exempel koda ett textecken.",
          "Bit förkortas vanligtvis med ett litet 'b' och byte med ett stort 'B'; denna distinktion kan skapa förvirring, särskilt mellan internethastigheter (Mbps = megabit per sekund) och filstorlek (MB = megabyte) -- en internetanslutning på 100 Mbps motsvarar teoretiskt en nedladdningshastighet på cirka 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Varför finns det två olika enhetssystem?",
        paragraphs: [
          "Eftersom datorer arbetar i det binära systemet är minnesadressering naturligt kopplad till tvåpotenser (som 1024, 1 048 576). Därför har mjukvaruvärlden historiskt uppfattat 'kilobyte' som 1024 byte.",
          "Disktillverkare föredrar, av marknadsförings- och beräkningsskäl, det decimala SI-prefixet (bastal 1000) -- en disk som marknadsförs som '1 TB' av en tillverkare innehåller i verkligheten exakt 1 000 000 000 000 byte, men eftersom operativsystemet räknar i bastal 1024, visar skärmen ett mindre tal, som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "För att lösa denna förvirring standardiserade Internationella Elektrotekniska Kommissionen (IEC) 1998 separata namn (kibibyte, mebibyte, gibibyte, tebibyte) och symboler (KiB, MiB, GiB, TiB) för enheter på binär bas.",
          "Enligt denna standard bör de traditionella prefixen KB/MB/GB bara användas i decimal mening (bastal 1000), och för värden baserade på 1024 bör 'binära' prefix som KiB/MiB/GiB föredras. I vardagsbruk och i många program tillämpas dock denna distinktion ännu inte konsekvent.",
        ],
      },
      {
        title: "Varför växer skillnaden mellan 1000 och 1024?",
        paragraphs: [
          "Medan skillnaden på kilobytenivå (1000 mot 1024) bara är 2,4 %, ökar denna skillnad för varje högre enhet: på megabytenivå är den ≈4,9 %, på gigabytenivå ≈7,4 %, och på terabytenivå när den ≈10 %.",
          "Därför blir vid stora lagringskapaciteter (som en disk på 1 TB) skillnaden mellan den decimala och den binära beräkningen stor nog för att ge användaren den synliga känslan av att ha 'mindre utrymme' (en skillnad på cirka 90 GB).",
        ],
      },
      {
        title: "Bitbaserade lagringsenheter: kilobit, megabit, gigabit",
        paragraphs: [
          "Internetleverantörer uttrycker vanligtvis anslutningshastigheten i bitbaserade enheter (kilobit per sekund, megabit per sekund, gigabit per sekund); det är en historisk tradition inom nätverksteknik.",
          "Eftersom användare vanligtvis förväntar sig en fils nedladdningshastighet i byte (MB per sekund), kan det ge det falska intrycket att en anslutning på '100 Mbps' är 'långsam' om man inte vet att den har en verklig nedladdningshastighet på cirka 12,5 MB per sekund.",
        ],
      },
      {
        title: "Datastorlekar i vardagslivet",
        paragraphs: [
          "Ett textdokument (en sida) tar vanligtvis upp några kilobyte, ett komprimerat foto (JPEG) några megabyte, och en komprimerad musikfil (MP3) i genomsnitt 3 till 5 megabyte.",
          "En film i standarddefinition (HD) kan ta upp mellan 1 och 4 gigabyte, och en film i 4K-upplösning ungefär mellan 15 och 25 gigabyte; dessa skillnader varierar utifrån upplösning och komprimeringsmetod.",
        ],
      },
      {
        title: "Datalagringsenhetens historia",
        paragraphs: [
          "Den första hårddisken som IBM presenterade 1956 (RAMAC 305) hade en kapacitet på cirka 3,75 megabyte och tog upp platsen för ett helt rum. Idag kan ett microSD-kort rymma miljontals gånger den kapaciteten inom storleken av en handflata.",
          "Denna enorma kapacitetsökning är nära kopplad både till framstegen inom lagringsteknik (som övergången från magnetiska diskar till flashminne) och den konstanta minskningen av kostnaden per enhet.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binärt", commonUse: "Nätverkshastighet (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grundenhet", commonUse: "Grundenhet för filstorlek" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimalt (SI)", commonUse: "Textdokument" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binärt (IEC)", commonUse: "Operativsystemets minnesvisning" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Decimalt (SI)", commonUse: "Foto- och musikfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binärt (IEC)", commonUse: "RAM-minneskapacitet" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Decimalt (SI)", commonUse: "Diskkapacitet (tillverkaretikett)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binärt (IEC)", commonUse: "Operativsystemets diskvisning" },
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
      "Omvandla elektricitetens grundstorheter mellan volt, kilovolt, ampere och milliampere; se exempelvärden.",
    introduction: [
      "Elektricitet är ett brett område bestående av relaterade men olika fysikaliska storheter, som spänning (potentialskillnad) och ström (laddningsflöde). Denna kategori samlar de två vanligaste grundstorheterna i det dagliga elektrotekniska arbetet: volt (spänning) och ampere (ström).",
      "Spänning och ström är inte samma fysikaliska storhet och kan inte omvandlas direkt till varandra; deras samband fastställs av Ohms lag (V = I × R), beroende på kretsens resistans. Omvandlingarna på denna sida behandlar varje storhet separat (volt-kilovolt, ampere-milliampere, osv.).",
    ],
    facts: [
      { label: "Namn på spänningsenheten", value: "Volt (efter Alessandro Volta)" },
      { label: "Namn på strömenheten", value: "Ampere (efter André-Marie Ampère)" },
      { label: "SI-grundenhet (ström)", value: "Ampere (A) -- en av SI:s 7 grundenheter" },
      { label: "Samband spänning-ström-resistans", value: "Ohms lag: V = I × R" },
      { label: "Nätspänning i Sverige", value: "230 V (enfas), 400 V (trefas), 50 Hz" },
    ],
    sections: [
      {
        title: "Vad är spänning (volt)?",
        paragraphs: [
          "Spänning (voltage) uttrycker den elektriska potentialskillnaden mellan två punkter i en elektrisk krets och kan betraktas som den 'drivkraft' som får elektroner att flöda från en punkt till en annan. Dess SI-enhet är volt (V).",
          "Enheten volt är uppkallad efter den italienske fysikern Alessandro Volta, uppfinnaren av det elektriska batteriet. Värden som '1,5 V' eller '9 V' på ett batteri uttrycker den potentialskillnad det batteriet kan leverera.",
        ],
      },
      {
        title: "Vad är ström (ampere)?",
        paragraphs: [
          "Elektrisk ström uttrycker mängden elektrisk laddning som passerar genom en ledare per tidsenhet, och dess SI-enhet är ampere (A). En ampere motsvarar att cirka 6,242 × 10¹⁸ elektroner passerar en punkt varje sekund.",
          "Enheten ampere är uppkallad efter den franske fysikern André-Marie Ampère, en av grundarna av elektromagnetismen. Ampere var, före SI-revideringen 2019, en av SI:s grundenheter; idag betraktas den fortfarande som en grundläggande storhet, men definieras nu utifrån den elementära laddningskonstanten (e).",
        ],
      },
      {
        title: "Varför kan spänning och ström inte omvandlas till varandra?",
        paragraphs: [
          "Spänning (V) och ström (A) är olika fysikaliska storheter -- den ena uttrycker en potentialskillnad, den andra hastigheten hos ett laddningsflöde. Därför har frågan 'hur många ampere är X volt' inget svar i sig själv utan att känna till kretsens resistans (eller effekt).",
          "Sambandet mellan de två fastställs av Ohms lag: V = I × R (Spänning = Ström × Resistans). En spänning på 12 volt över en resistans på 4 ohm ger till exempel en ström på 3 ampere; men samma 12 volt applicerat på en annan resistans ger ett helt annat strömvärde.",
        ],
      },
      {
        title: "Sambandet mellan effekt, spänning och ström",
        paragraphs: [
          "Elektrisk effekt (watt) är lika med produkten av spänning och ström: P = V × I. Denna formel visar att en apparat med samma effekt kommer att förbruka mindre ström vid hög spänning och mer ström vid låg spänning.",
          "Detta samband förklarar varför elnät distribueras vid hög spänning: att transportera samma effekt med en lägre ström minskar avsevärt energiförlusterna på grund av transmissionsledningarnas resistans (Joule-uppvärmning).",
        ],
      },
      {
        title: "Nätspänningen i Sverige och världen",
        paragraphs: [
          "I Sverige är standardnätspänningen för bostadsinstallationer 230 volt enfas, och 400 volt för trefassystem som används i industriella och kommersiella installationer (med en frekvens på 50 Hz).",
          "Globalt varierar nätspänningen från land till land; USA och Kanada använder 120 volt, medan de flesta europeiska länder, däribland Sverige, föredrar 230 volt. Denna skillnad är den huvudsakliga anledningen till att elektriska apparater som tas med från utlandet inte kan användas direkt utan en omvandlare.",
        ],
      },
      {
        title: "Likström (DC) och växelström (AC)",
        paragraphs: [
          "Vid likström (DC) flödar elektroner konstant i en enda riktning -- batterier och solpaneler producerar DC. Vid växelström (AC) ändrar strömriktningen ett visst antal gånger per sekund (50 Hz i Sverige, det vill säga 50 gånger per sekund) -- nätel är AC.",
          "Den huvudsakliga anledningen till att AC föredras vid nätdistribution är att spänningen enkelt kan höjas eller sänkas med transformatorer; detta gör det möjligt att transportera elektricitet över långa avstånd med låga förluster.",
        ],
      },
      {
        title: "Effekten av elektrisk ström på den mänskliga kroppen",
        paragraphs: [
          "Styrkan hos den ström som passerar genom den mänskliga kroppen bestämmer den upplevda effekten: cirka 1 milliampere är knappt märkbart, mellan 10 och 20 milliampere kan orsaka muskelsammandragning (oförmåga att släppa taget), och över 100 milliampere kan orsaka hjärtrytmrubbningar (fibrillering) och död.",
          "Därför är det inte bara spänningen som räknas vid elsäkerhet, utan även den strömstyrka som kan bildas i kretsen -- även i en miljö med låg spänning men låg resistans (till exempel fuktig) kan en farlig ström uppstå.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metriskt", commonUse: "Sensorer och bioelektriska signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batterier, nät- och kretsspänning" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metriskt", commonUse: "Högspänningsledningar" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metriskt", commonUse: "Ström i elektroniska kretsar" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Husinstallationer och apparatström" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metriskt", commonUse: "Kortslutningsströmmar och industriell ström" },
    ],
  },
  {
    locale: "sv",
    slug: "guldkarat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Omvandla guldkarat",
    description:
      "Omvandla mellan 24, 22, 18 och 14 karat guld baserat på mängden rent guld; upptäck renheten och användningsområdena för varje karat.",
    introduction: [
      "Liksom silver används guld nästan aldrig rent vid tillverkning av smycken, eftersom det är en mycket mjuk metall som lätt repas -- därför legeras det med andra metaller som silver eller koppar. Karat är måttet som anger andelen rent guld i den legeringen.",
      "Skalan fungerar på bas 24: 24 karat betyder helt rent guld (100 %), 18 karat betyder att 18/24 av legeringen (cirka 75 %) är rent guld. Omvandlingen här består inte av att uttrycka samma fysikaliska storhet i en annan enhet, utan av att hitta motsvarigheten i gram för samma legering med en annan renhetsgrad.",
    ],
    facts: [
      { label: "Mätsystem", value: "Renhetsstandard för smycken (karat)" },
      { label: "Grundreferens", value: "24 karat = 100 % rent guld" },
      { label: "Vanligaste karat i Turkiet", value: "22 karat (armband, traditionella smycken)" },
      { label: "Internationellt vardagsbruk", value: "18 karat (ring, halsband)" },
      { label: "Beräkningslogik", value: "Gram × (ursprungskarat / 24) ÷ (målkarat / 24)" },
    ],
    sections: [
      {
        title: "Vad mäter karat exakt?",
        paragraphs: [
          "Karat anger vilken del av vikten hos ett guldsmycke som faktiskt är guld. 24 karat är rent guld; 18 och 14 karat är former av guld blandat med silver respektive koppar, och därmed hårdare och mindre rena.",
          "Därför kan man säga att ett armband på 22 karat har ett något 'lägre' rent guldinnehåll än 24 karat, men är starkare -- därför föredrar juvelerare oftast 22 karat för armband och 18 karat för ringar och halsband.",
        ],
      },
      {
        title: "Hur beräknar man innehållet av rent guld?",
        paragraphs: [
          "För att ta reda på mängden rent guld i ett armband på 10 gram med 22 karat: 10 × (22 / 24) = 9,17 gram rent guld (motsvarande 24 karat). De återstående 0,83 gram är annan metall som tillsatts för hållfasthet.",
          "Omvänt, om en juvelerare skulle smälta ner de 9,17 gram rent guld för att göra om det till 18 karat: 9,17 ÷ (18 / 24) = 12,22 gram total legering skulle fas -- eftersom andelen rent guld är lägre vid 18 karat, fördelas samma mängd rent guld över en större total vikt.",
        ],
      },
      {
        title: "Vad används varje karat till?",
        paragraphs: [
          "På grund av sin mjukhet används 24 karat guld nästan aldrig i vardagliga smycken; det föredras för tackor och investeringsprodukter. 22 karat är standarden för armband och traditionella smycken i Turkiet och Mellanöstern.",
          "18 karat är, på grund av sin höga hållfasthet, vanligt över hela världen för vardagliga smycken som ringar och halsband med diamanter. 14 karat, billigare och ännu starkare, förekommer särskilt på marknaderna i USA och Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat guld", symbol: "24K", referenceValue: "100 % rent guld", system: "Smyckesstandard", commonUse: "Tackor, investeringsguld" },
      { name: "22 karat guld", symbol: "22K", referenceValue: "91,6 % rent guld (22/24)", system: "Smyckesstandard", commonUse: "Armband, traditionella smycken" },
      { name: "18 karat guld", symbol: "18K", referenceValue: "75 % rent guld (18/24)", system: "Smyckesstandard", commonUse: "Ring, halsband, vardagliga smycken" },
      { name: "14 karat guld", symbol: "14K", referenceValue: "58,3 % rent guld (14/24)", system: "Smyckesstandard", commonUse: "Prisvärda smycken, USA/Europa-marknad" },
    ],
  },
  {
    locale: "sv",
    slug: "silverhalt",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omvandla silverhalt",
    description:
      "Omvandla halterna 999, 925 (sterling), 900 och 800 till gram rent silver; upptäck promillesystemet och dess användning inom smycken.",
    introduction: [
      "Liksom guld används även silver nästan aldrig rent för att göra smycken eller föremål, eftersom det är en mjuk metall som legeras med andra metaller som koppar. Promillehalten är måttet som anger andelen rent silver i den legeringen.",
      "Till skillnad från guldkarat, som uttrycks på bas 24, uttrycks silvrets renhet på bas 1000 (promille): 999 motsvarar nästan rent silver, medan 925 är den mest utbredda halten i världen, känd som 'sterlingsilver'.",
    ],
    facts: [
      { label: "Mätsystem", value: "Promillesystem" },
      { label: "Huvudreferens", value: "999 = 99,9 % rent silver" },
      { label: "Vanligaste smyckeshalten", value: "925 (sterlingsilver)" },
      { label: "Investerings-/tackssilver", value: "Halt 999 (finsilver)" },
      { label: "Beräkningsregel", value: "Gram × (ursprungshalt / 1000) ÷ (målhalt / 1000)" },
    ],
    sections: [
      {
        title: "Vad mäter silverhalten (promille) egentligen?",
        paragraphs: [
          "Till skillnad från guld uttrycks silvrets renhet inte i 24 delar, utan i promille (bas 1000). En halt på 999 betyder 999 delar per tusen (det vill säga 99,9 %) rent silver i legeringen; den återstående promillen motsvarar vanligtvis små spår av andra grundämnen.",
          "Halten 925 (sterlingsilver) betyder att legeringen innehåller 92,5 % rent silver, där resten (7,5 %) vanligtvis är koppar. Denna lilla mängd koppar ger stadga åt rent silver, som av naturen är mycket mjukt och lätt deformeras.",
        ],
      },
      {
        title: "Varför är sterlingsilver (925) världsstandarden?",
        paragraphs: [
          "Historien om sterlingsilverstandarden (925) går tillbaka till 1100-talets England och har med tiden blivit den mest allmänt accepterade standarden i världen för smycken, bestick och silverföremål.",
          "Rent silver (999) är för mjukt för vardagliga föremål och repas lätt; tillsatsen av 7,5 % koppar ger silvret tillräcklig hårdhet, samtidigt som den karakteristiska glansen och färgen till stor del bevaras.",
        ],
      },
      {
        title: "Skillnader mellan halterna 999, 900 och 800",
        paragraphs: [
          "Halten 999 (fin-/rent silver) föredras för tackor och investeringsprodukter eftersom renhetsgraden är det viktigaste kriteriet för investerare; men på grund av sin mjukhet används den sällan i vardagliga smycken.",
          "Halten 900 (myntsilver) användes historiskt i silvermynt från många länder. Halten 800, särskilt vanlig i Europa (Tyskland, Österrike), är en mindre ren smyckesstandard än sterlingsilver, men fortfarande stark.",
        ],
      },
      {
        title: "Hur beräknar man mängden rent silver?",
        paragraphs: [
          "För att fastställa mängden rent silver i en silverring på 10 gram med halt 925: 10 × (925 / 1000) = 9,25 gram rent silver. De återstående 0,75 gram är koppar eller annan metall som tillsatts för hållfasthet.",
          "Samma logik gäller för omvandling mellan olika halter: om till exempel mängden rent silver i en legering med halt 925 är känd, fas dess motsvarighet i halt 999 genom att dela den mängden med 999/1000.",
        ],
      },
      {
        title: "Sambandet mellan silvrets anlöpning och dess renhet",
        paragraphs: [
          "Att ett silversmycke anlöper (oxideras) över tid beror inte på silvret i sig, utan på att kopparen i legeringen reagerar med svavelföreningar i luften. Därför tenderar silver med högre renhet (som halt 999) att anlöpa mindre.",
          "Vissa tillverkare har utvecklat 'anlöpningsbeständiga' sterlingsilverlegeringar för att förbättra denna egenskap, genom att använda andra grundämnen, som germanium, istället för koppar.",
        ],
      },
    ],
    unitTable: [
      { name: "Silver 999", symbol: "999", referenceValue: "99,9 % rent silver", system: "Smyckesstandard", commonUse: "Tackor, investeringssilver" },
      { name: "Silver 925", symbol: "925", referenceValue: "92,5 % rent silver (sterling)", system: "Smyckesstandard", commonUse: "Smycken och bestick (världsstandard)" },
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
