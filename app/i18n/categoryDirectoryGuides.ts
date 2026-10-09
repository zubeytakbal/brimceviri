import type { DirectoryGuideContent } from "../components/DirectoryGuide";

export type CategoryDirectoryLocale = "sv" | "no" | "da" | "fr" | "it" | "pt";

export const CATEGORY_DIRECTORY_GUIDES: Record<CategoryDirectoryLocale, DirectoryGuideContent> = {
  sv: {
    sections: [
      {
        heading: "Så är kategorierna ordnade",
        paragraphs: [
          "Omvandlarna är sorterade efter fysisk storhet, inte efter var de används. Alla enheter som mäter samma sak ligger därför på samma sida: under längd hittar du millimeter, tum, engelsk mil och svensk mil, under volym deciliter, kubikmeter och amerikanska gallon. Inom en kategori kan du räkna mellan vilka två enheter som helst, men inte mellan kategorier. Kilogram blir aldrig liter utan att man vet ämnets densitet.",
          "Längd, area, volym, massa och temperatur är vardagskategorierna: rumsmått, tomtyta, recept och väder. Tid och hastighet hör ihop när du planerar en resa eller jämför löptempo. Tryck, energi och elektricitet är de tekniska kategorierna som du behöver när du läser av en däckpump, en elräkning eller ett datablad. Datalagring gäller filstorlekar och diskutrymme, och guldkarat och silverhalt räknar om andelen ädelmetall i smycken och tackor.",
        ],
      },
      {
        heading: "Svenska mått som lätt blir fel",
        paragraphs: [
          "Den klassiska fällan är milen. I svenskt vardagsspråk är en mil 10 kilometer, medan en engelsk mil (mile) är 1,609 kilometer och en nautisk mil (sjömil) 1,852 kilometer. Står det miles i en amerikansk eller brittisk text är det alltså inte svenska mil. Bränsleförbrukning i liter per mil räknas om med samma faktor: 0,5 liter per mil är 5 liter per 100 kilometer.",
          "Tum dyker upp på tv-apparater, bildskärmar, cykeldäck och rördelar, och i en bildäcksbeteckning som 205/55 R16 är fälgdiametern 16 tum. En tum är exakt 2,54 centimeter. Däcktryck visas i bar på de flesta svenska bensinstationer men i psi på många cykelpumpar; 2,2 bar är ungefär 32 psi. Lufttrycket i väderprognosen anges i hektopascal. I amerikanska recept står ugnstemperaturen i Fahrenheit, och 350 °F motsvarar cirka 177 °C, i praktiken 175 grader.",
        ],
      },
      {
        heading: "Vilken omvandlare ska jag välja?",
        paragraphs: [
          "Utgå från frågan du vill besvara. Hur långt? Välj längd. Hur stor yta? Area. Hur mycket som ryms? Volym. Hur tungt? Massa. Energi omfattar både kWh på elräkningen och kcal eller kJ på näringsdeklarationen, och elektricitet samlar volt, ampere, ohm och närliggande enheter. Står det GB eller GiB väljer du datalagring. En disk som säljs som 1 TB visas som ungefär 931 GiB i datorn, eftersom tillverkaren räknar i tiopotenser och operativsystemet i tvåpotenser.",
          "Smycken stämplas oftast i tusendelar: 750 motsvarar 18 karat, 585 motsvarar 14 karat och 925 på silver betyder sterlingsilver. För matlagning finns egna verktyg, eftersom koppar, matskedar och deciliter är köksmått snarare än fysiska storheter, och den som räknar dagar eller veckor har nytta av datumverktygen.",
        ],
        items: [
          { href: "/sv/koksmatt-omvandlare", label: "Kokmåttskonverterare", text: "koppar, matskedar och deciliter till gram för vanliga ingredienser" },
          { href: "/sv/receptomvandlare", label: "Receptomvandlare", text: "räknar om ett helt recept till ett annat antal portioner" },
          { href: "/sv/dagar-mellan-datum", label: "Dagar mellan datum", text: "antal dagar mellan två datum" },
          { href: "/sv/veckonummer", label: "Veckonummer", text: "vilken vecka ett datum ligger i" },
        ],
      },
    ],
    faqHeading: "Vanliga frågor",
    faq: [
      {
        question: "Är en mil alltid 10 kilometer?",
        answer:
          "I Sverige och Norge ja, i dagligt tal. I engelska texter betyder mile 1,609 kilometer och till sjöss och i luftfarten används den nautiska milen på 1,852 kilometer. Kontrollera alltid vilket land texten kommer från.",
      },
      {
        question: "Varför kan jag inte omvandla gram till milliliter direkt?",
        answer:
          "Gram är massa och milliliter är volym. Sambandet beror på densiteten: en deciliter vatten väger 100 gram, men en deciliter vetemjöl väger ungefär 60 gram. Använd kokmåttsverktyget för ingredienser.",
      },
    ],
  },

  no: {
    sections: [
      {
        heading: "Hvordan kategoriene er bygd opp",
        paragraphs: [
          "Hver kategori samler enhetene for én fysisk størrelse. Under lengde ligger alt fra millimeter og tommer til norsk mil, engelsk mil og nautisk mil, og under volum finner du desiliter, liter, kubikkmeter og amerikanske gallon. Du kan regne fritt mellom enhetene i samme kategori, men ikke på tvers: kilo blir ikke liter uten at du kjenner tettheten til stoffet.",
          "Lengde, areal, volum, masse og temperatur dekker det meste i hverdagen, fra romstørrelse og tomteareal til oppskrifter og værmelding. Tid og hastighet bruker du når du planlegger en tur eller sammenligner løpstempo. Trykk, energi og elektrisitet er de tekniske kategoriene for dekkpumpa, strømregningen og produktdatabladet. Datalagring handler om filer og diskplass, mens gullkarat og sølvinnhold regner om innholdet av edelt metall i smykker og barrer.",
        ],
      },
      {
        heading: "Norske måleenheter å passe på",
        paragraphs: [
          "Mila er den vanligste kilden til feil. I norsk dagligtale er én mil 10 kilometer, mens den engelske milen er 1,609 kilometer. På sjøen regnes det i nautiske mil på 1,852 kilometer og fart i knop, altså nautiske mil per time. Tolv knop er dermed omtrent 22 km/t. Sier noen at bilen bruker en halv liter på mila, tilsvarer det 5 liter per 100 kilometer.",
          "Tommer møter du på TV-er, skjermer, sykkeldekk, rør og felger; i dekkbetegnelsen 205/55 R16 er felgdiameteren 16 tommer, og én tomme er nøyaktig 2,54 centimeter. Dekktrykk står i bar på de fleste norske bensinstasjoner, men mange sykkelpumper viser psi; 2,2 bar er omtrent 32 psi. Lufttrykket i værmeldingen oppgis i hektopascal, og amerikanske oppskrifter bruker Fahrenheit, der 350 °F er rundt 177 °C.",
        ],
      },
      {
        heading: "Hvilken omregner skal jeg velge?",
        paragraphs: [
          "Tenk på hva du faktisk måler. Avstand eller størrelse er lengde, flate er areal, innhold er volum og vekt er masse. Strømforbruk i kWh, kalorier og kilojoule på matvarer hører til energi. Volt, ampere og ohm ligger under elektrisitet. Lurer du på hvorfor en disk merket 1 TB bare viser rundt 931 GiB, bruker du datalagring: produsenten regner med tierpotenser, operativsystemet med totallspotenser.",
          "Gull og sølv stemples vanligvis i tusendeler. 585 tilsvarer 14 karat, 750 tilsvarer 18 karat og 925 er sterlingsølv. Kjøkkenmål som kopper, spiseskjeer og desiliter har egne verktøy fordi omregningen til gram avhenger av ingrediensen, og for dager og uker finnes det egne datoverktøy.",
        ],
        items: [
          { href: "/no/kjokkenmal-omregner", label: "Kjøkkenmålomregner", text: "kopper, spiseskjeer og desiliter til gram for vanlige råvarer" },
          { href: "/no/oppskriftomregner", label: "Oppskriftomregner", text: "skalerer en hel oppskrift til et annet antall porsjoner" },
          { href: "/no/dager-mellom-datoer", label: "Dager mellom datoer", text: "hvor mange dager det er mellom to datoer" },
          { href: "/no/ukenummer", label: "Ukenummer", text: "hvilken uke en dato tilhører" },
        ],
      },
    ],
    faqHeading: "Ofte stilte spørsmål",
    faq: [
      {
        question: "Hva er forskjellen på mil, engelsk mil og nautisk mil?",
        answer:
          "En norsk mil er 10 kilometer, en engelsk mil (mile) er 1,609 kilometer og en nautisk mil er 1,852 kilometer. Den nautiske milen brukes til sjøs og i luftfart, den engelske i amerikanske og britiske tekster.",
      },
      {
        question: "Hvorfor står det både bar og psi på dekkpumpa?",
        answer:
          "Bar er vanlig i Europa, mens psi kommer fra det amerikanske systemet. Én bar er omtrent 14,5 psi, så en anbefaling på 2,5 bar tilsvarer rundt 36 psi. Trykk-kategorien regner om begge veier.",
      },
    ],
  },

  da: {
    sections: [
      {
        heading: "Sådan er kategorierne opdelt",
        paragraphs: [
          "Kategorierne følger de fysiske størrelser. Under længde samles millimeter, tommer, engelske miles og sømil, under rumfang deciliter, liter, kubikmeter og amerikanske gallons. Inden for en kategori kan du omregne mellem alle enheder, men ikke på tværs af kategorier. Et kilo bliver ikke til liter, medmindre man kender stoffets massefylde.",
          "Længde, areal, rumfang, masse og temperatur er dem, de fleste bruger til daglig: boligmål, grundareal, opskrifter og vejrudsigt. Tid og hastighed hører sammen, når du planlægger en tur eller sammenligner løbetider. Tryk, energi og elektricitet er de tekniske kategorier til dækpumpen, elregningen og databladet. Datalagring handler om filstørrelser og diskplads, og guldkarat og sølvindhold omregner andelen af ædelmetal i smykker og barrer.",
        ],
      },
      {
        heading: "Danske mål og typiske misforståelser",
        paragraphs: [
          "Den gamle danske mil var cirka 7,5 kilometer, men i dag regner man stort set kun i kilometer. Når ordet mil dukker op i svenske eller norske tekster, betyder det 10 kilometer, og i engelske tekster er en mile 1,609 kilometer. Til søs bruges sømil på 1,852 kilometer og fart i knob. Omregneren har både den skandinaviske mil og den engelske mile, så vælg den, der passer til tekstens oprindelse.",
          "Tommer møder du på fjernsyn, skærme, cykeldæk og fælge; i dækbetegnelsen 205/55 R16 er fælgdiameteren 16 tommer, og en tomme er præcis 2,54 centimeter. Dæktryk angives i bar på de fleste danske tankstationer, mens mange cykelpumper viser psi; 2,2 bar svarer til cirka 32 psi. Fjernvarme afregnes ofte i MWh eller GJ, og her er 1 MWh lig med 3,6 GJ. Amerikanske opskrifter bruger Fahrenheit, hvor 350 °F er omkring 177 °C.",
        ],
      },
      {
        heading: "Hvilken omregner skal jeg vælge?",
        paragraphs: [
          "Spørg dig selv, hvad du måler. Afstand er længde, flade er areal, indhold er rumfang og vægt er masse. kWh på elregningen, kalorier og kilojoule på fødevarer hører under energi, og volt, ampere og ohm under elektricitet. Undrer du dig over, at en disk mærket 1 TB kun viser omkring 931 GiB, så brug datalagring: producenten regner i titalspotenser, styresystemet i totalspotenser.",
          "Guld og sølv stemples typisk i promille. 585 svarer til 14 karat, 750 til 18 karat, og 925 er sterlingsølv. Køkkenmål som kopper, spiseskeer og deciliter har deres egne værktøjer, fordi omregningen til gram afhænger af råvaren, og i Danmark, hvor ugenumre bruges flittigt i kalendere og på arbejdspladser, er ugenummerværktøjet ofte det hurtigste svar.",
        ],
        items: [
          { href: "/da/kokkenmal-omregner", label: "Køkkenmålomregner", text: "kopper, spiseskeer og deciliter til gram for almindelige råvarer" },
          { href: "/da/opskriftomregner", label: "Opskriftomregner", text: "skalerer en hel opskrift til et andet antal personer" },
          { href: "/da/dage-mellem-datoer", label: "Dage mellem datoer", text: "antal dage mellem to datoer" },
          { href: "/da/ugenummer", label: "Ugenummer", text: "hvilken uge en dato ligger i" },
        ],
      },
    ],
    faqHeading: "Ofte stillede spørgsmål",
    faq: [
      {
        question: "Hvor lang er en mil på dansk?",
        answer:
          "Den historiske danske mil var cirka 7,5 kilometer og bruges næsten ikke længere. I svensk og norsk er en mil 10 kilometer, og en engelsk mile er 1,609 kilometer. Se på tekstens oprindelse, før du omregner.",
      },
      {
        question: "Hvorfor kan jeg ikke omregne gram direkte til milliliter?",
        answer:
          "Gram er masse, og milliliter er rumfang. Forholdet afhænger af massefylden: en deciliter vand vejer 100 gram, mens en deciliter hvedemel vejer omkring 60 gram. Brug køkkenmålomregneren til ingredienser.",
      },
    ],
  },

  fr: {
    sections: [
      {
        heading: "Comment les catégories sont organisées",
        paragraphs: [
          "Chaque catégorie regroupe les unités d’une même grandeur physique. La longueur réunit le millimètre, le pouce, le mille terrestre anglais et le mille marin ; le volume, le décilitre, le mètre cube et le gallon américain. On peut convertir librement entre deux unités d’une même catégorie, jamais d’une catégorie à l’autre : des kilogrammes ne deviennent des litres que si l’on connaît la masse volumique de la substance.",
          "Longueur, surface, volume, masse et température couvrent l’essentiel de la vie courante : dimensions d’une pièce, superficie d’un terrain, recettes et météo. Temps et vitesse vont de pair pour préparer un trajet ou comparer des allures de course. Pression, énergie et électricité sont les catégories techniques, utiles devant un gonfleur, une facture d’électricité ou une fiche technique. Le stockage de données concerne la taille des fichiers et des disques, tandis que les carats d’or et les titres d’argent expriment la part de métal précieux d’un bijou ou d’un lingot.",
        ],
      },
      {
        heading: "Le système métrique et les unités venues d’ailleurs",
        paragraphs: [
          "Le mètre est né en France à la fin du XVIIIe siècle, et la vie quotidienne y est entièrement métrique. Les unités anglo-saxonnes reviennent pourtant par les produits importés et les écrans. La diagonale d’un téléviseur ou d’un smartphone s’exprime en pouces (exactement 2,54 cm), tout comme le diamètre de jante dans une cote de pneu telle que 205/55 R16. Les gonfleurs des stations affichent des bars, mais beaucoup de pompes à vélo indiquent des psi : 2,2 bar correspondent à environ 32 psi.",
          "Les recettes américaines mesurent en tasses et en onces, et donnent la température du four en degrés Fahrenheit : 350 °F font environ 177 °C, soit le thermostat 6. En navigation et en aviation, la vitesse se compte en nœuds, c’est-à-dire en milles marins de 1 852 m par heure. Côté informatique, les fabricants comptent en octets décimaux : un disque vendu 1 To apparaît comme environ 931 Gio dans le système d’exploitation.",
        ],
      },
      {
        heading: "Quel convertisseur choisir ?",
        paragraphs: [
          "Partez de la question posée. Une distance ou une dimension relève de la longueur, une superficie de la surface, une contenance du volume et un poids de la masse. Les kWh de la facture, les kcal et kJ des étiquettes alimentaires relèvent de l’énergie ; volts, ampères et ohms de l’électricité. Pour un bijou, le poinçon donne généralement le titre en millièmes : 750 correspond à l’or 18 carats, 585 à 14 carats, et 925 désigne l’argent sterling.",
          "Pour la cuisine, les tasses et cuillères ne sont pas des grandeurs physiques au sens strict : leur équivalent en grammes dépend de l’ingrédient, d’où des outils dédiés. Il en va de même pour les pointures, qui suivent des barèmes propres à chaque pays.",
        ],
        items: [
          { href: "/fr/convertisseur-mesures-cuisine", label: "Convertisseur de mesures de cuisine", text: "tasses et cuillères en grammes selon l’ingrédient" },
          { href: "/fr/convertisseur-de-recettes", label: "Convertisseur de recettes", text: "adapte une recette entière à un autre nombre de portions" },
          { href: "/fr/convertisseur-de-pointures", label: "Convertisseur de pointures", text: "correspondances entre pointures françaises, américaines et britanniques" },
        ],
      },
    ],
    faqHeading: "Questions fréquentes",
    faq: [
      {
        question: "Quelle différence entre un mille et un mille marin ?",
        answer:
          "Le mille terrestre anglais (mile) vaut 1 609,344 m et sert aux distances routières aux États-Unis et au Royaume-Uni. Le mille marin vaut 1 852 m et sert en mer et dans les airs. Les confondre fausse le résultat de près de 15 %.",
      },
      {
        question: "Pourquoi ne peut-on pas convertir des grammes en millilitres ?",
        answer:
          "Le gramme mesure une masse, le millilitre un volume. Le passage de l’un à l’autre dépend de la masse volumique : 100 ml d’eau pèsent 100 g, mais 100 ml de farine environ 50 à 60 g. Le convertisseur de cuisine tient compte de l’ingrédient.",
      },
    ],
  },

  it: {
    sections: [
      {
        heading: "Come sono organizzate le categorie",
        paragraphs: [
          "Ogni categoria raccoglie le unità di una stessa grandezza fisica. Nella lunghezza trovi millimetri, pollici, miglia terrestri e miglia nautiche; nel volume decilitri, metri cubi e galloni americani. All’interno di una categoria puoi convertire tra due unità qualsiasi, ma non da una categoria all’altra: i chilogrammi diventano litri solo se si conosce la densità della sostanza.",
          "Lunghezza, area, volume, massa e temperatura sono le categorie di tutti i giorni: misure di casa, superficie di un terreno, ricette e meteo. Tempo e velocità servono insieme per pianificare un viaggio o confrontare un ritmo di corsa. Pressione, energia ed elettricità sono quelle più tecniche, utili davanti a un compressore, a una bolletta o a una scheda tecnica. L’archiviazione dati riguarda file e dischi, mentre caratura dell’oro e titolo dell’argento esprimono la quota di metallo prezioso in gioielli e lingotti.",
        ],
      },
      {
        heading: "Sistema metrico e unità d’importazione",
        paragraphs: [
          "In Italia si misura tutto nel sistema metrico, ma le unità anglosassoni arrivano con i prodotti e le istruzioni d’oltreoceano. La diagonale di televisori e smartphone è in pollici (esattamente 2,54 cm), come il diametro del cerchio nella sigla di uno pneumatico tipo 205/55 R16. I gonfiatori dei distributori mostrano i bar, ma molti compressori e pompe da bici indicano i psi: 2,2 bar sono circa 32 psi. La pressione atmosferica delle previsioni è in ettopascal, equivalenti ai vecchi millibar.",
          "Le ricette americane usano tazze, once e gradi Fahrenheit: 350 °F corrispondono a circa 177 °C, in pratica il classico forno a 180 gradi. In barca e in aereo la velocità si esprime in nodi, ossia miglia nautiche di 1.852 m all’ora. Nell’informatica, un disco venduto come 1 TB compare nel sistema operativo come circa 931 GiB, perché il produttore conta in potenze di dieci e il computer in potenze di due.",
        ],
      },
      {
        heading: "Quale convertitore scegliere?",
        paragraphs: [
          "Parti dalla domanda. Una distanza o una dimensione è lunghezza, una superficie è area, una capienza è volume, un peso è massa. I kWh della bolletta elettrica e le kcal o i kJ delle etichette alimentari sono energia; volt, ampere e ohm stanno nell’elettricità. Per i gioielli il marchio indica il titolo in millesimi: 750 è l’oro 18 carati tipico dell’oreficeria italiana, 585 corrisponde a 14 carati e 925 all’argento sterling.",
          "Tazze e cucchiai non sono grandezze fisiche vere e proprie: il loro peso in grammi cambia con l’ingrediente, per questo esistono strumenti dedicati. Lo stesso vale per i numeri di scarpe, che seguono tabelle diverse da paese a paese.",
        ],
        items: [
          { href: "/it/convertitore-misure-cucina", label: "Convertitore di misure da cucina", text: "tazze e cucchiai in grammi in base all’ingrediente" },
          { href: "/it/convertitore-ricette", label: "Convertitore di ricette", text: "ricalcola un’intera ricetta per un numero diverso di porzioni" },
          { href: "/it/convertitore-taglie-scarpe", label: "Convertitore di numeri di scarpe", text: "corrispondenze tra numerazione italiana, americana e britannica" },
        ],
      },
    ],
    faqHeading: "Domande frequenti",
    faq: [
      {
        question: "Che differenza c’è tra miglio terrestre e miglio nautico?",
        answer:
          "Il miglio terrestre (mile) misura 1.609,344 m ed è usato per le distanze stradali negli Stati Uniti e nel Regno Unito. Il miglio nautico misura 1.852 m ed è l’unità della navigazione marittima e aerea. Confonderli sposta il risultato di quasi il 15%.",
      },
      {
        question: "Perché non posso convertire grammi in millilitri?",
        answer:
          "Il grammo misura la massa, il millilitro il volume. Il rapporto dipende dalla densità: 100 ml d’acqua pesano 100 g, ma 100 ml di farina ne pesano circa 50–60. Per gli ingredienti usa il convertitore di misure da cucina.",
      },
    ],
  },

  pt: {
    sections: [
      {
        heading: "Como as categorias estão organizadas",
        paragraphs: [
          "Cada categoria reúne as unidades de uma mesma grandeza física. Em comprimento estão milímetro, polegada, milha terrestre e milha náutica; em volume, decilitro, metro cúbico e galão americano. Dentro de uma categoria dá para converter entre quaisquer duas unidades, mas não de uma categoria para outra: quilos só viram litros quando se conhece a densidade da substância.",
          "Comprimento, área, volume, massa e temperatura resolvem a maior parte das contas do dia a dia, como metragem de apartamento, tamanho de terreno, receitas e previsão do tempo. Tempo e velocidade andam juntos para planejar uma viagem ou comparar o ritmo de corrida. Pressão, energia e eletricidade são as categorias técnicas, úteis no calibrador, na conta de luz ou na ficha técnica de um aparelho. Armazenamento de dados trata de arquivos e discos, e quilate de ouro e teor de prata indicam a proporção de metal precioso em joias e barras.",
        ],
      },
      {
        heading: "Sistema métrico e as unidades que aparecem no Brasil",
        paragraphs: [
          "O Brasil usa o sistema métrico, mas algumas unidades inglesas fazem parte da rotina. Pneus são calibrados em libras, que na verdade são psi: 32 libras equivalem a cerca de 2,2 bar. O aro do pneu, como em 205/55 R16, e a tela de TVs e celulares são medidos em polegadas, e uma polegada tem exatamente 2,54 cm. Canos e conexões também costumam vir em polegadas, e manômetros antigos ainda trazem kgf/cm², unidade que fica muito próxima de 1 bar.",
          "Receitas americanas usam xícaras, onças e graus Fahrenheit; 350 °F correspondem a cerca de 177 °C, o forno médio de 180 °C. No mar e na aviação a velocidade é medida em nós, ou seja, milhas náuticas de 1.852 m por hora. Já na informática, um HD vendido como 1 TB aparece no sistema operacional com cerca de 931 GiB, porque o fabricante conta em potências de dez e o computador em potências de dois.",
        ],
      },
      {
        heading: "Qual conversor escolher?",
        paragraphs: [
          "Comece pela pergunta. Distância ou dimensão é comprimento, superfície é área, capacidade é volume e peso é massa. Os kWh da conta de luz e as kcal ou kJ dos rótulos de alimentos ficam em energia; volt, ampère e ohm, em eletricidade. Em joias, a marcação costuma indicar o teor em milésimos: 750 é o ouro 18k mais comum nas joalherias brasileiras, 585 corresponde a 14k e 925 é a prata de lei.",
          "Xícaras e colheres não são grandezas físicas propriamente ditas: o peso em gramas muda conforme o ingrediente, por isso existem ferramentas próprias para a cozinha. O mesmo vale para numeração de calçados, que segue tabelas diferentes em cada país, e para o cálculo de ouro puro a partir do peso e do quilate de uma peça.",
        ],
        items: [
          { href: "/pt/conversor-de-medidas-de-cozinha", label: "Conversor de medidas de cozinha", text: "xícaras e colheres em gramas conforme o ingrediente" },
          { href: "/pt/conversor-de-receitas", label: "Conversor de receitas", text: "ajusta uma receita inteira para outro número de porções" },
          { href: "/pt/conversor-de-calcados", label: "Conversor de calçados", text: "equivalência entre numeração brasileira, americana e europeia" },
          { href: "/pt/calculadora-de-ouro", label: "Calculadora de ouro", text: "quantidade de ouro puro a partir do peso e do teor da peça" },
        ],
      },
    ],
    faqHeading: "Perguntas frequentes",
    faq: [
      {
        question: "Libra do pneu é a mesma libra de peso?",
        answer:
          "Não. A \u201Clibra\u201D do calibrador é a libra por polegada quadrada (psi), uma unidade de pressão. A libra de peso (lb) é uma unidade de massa, igual a 453,59 g. Para calibragem use a categoria de pressão; para peso, a de massa.",
      },
      {
        question: "Por que não dá para converter gramas em mililitros?",
        answer:
          "Grama é massa e mililitro é volume. A relação depende da densidade: 100 ml de água pesam 100 g, mas 100 ml de farinha de trigo pesam cerca de 50 a 60 g. Para ingredientes, use o conversor de medidas de cozinha.",
      },
    ],
  },
};
