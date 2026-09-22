// Pages de categorie francaises -- integrees au nouveau systeme i18n
// Fichier independant et nouveau (ne touche pas aux fichiers tr/en/de/ar/uz/bn existants).
//
// Portee volontairement limitee aux 17 elements qui forment l'identite
// du site (13 categories fondamentales + 4 outils universels sur la
// page d'accueil) -- pas de calculatrices scientifiques ni du quotidien.
// Contenu traduit avec la meme profondeur que les articles TR sources
// (app/converter/categoryArticles.ts et app/converter/articles/*/Article.ts).

export type LocalizedFrenchCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedFrenchCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedFrenchCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedFrenchCategoryPage = {
  locale: "fr";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedFrenchCategoryFact[];
  sections: LocalizedFrenchCategorySection[];
  unitTable: LocalizedFrenchCategoryUnitRow[];
};

export const frenchCategoryPages: LocalizedFrenchCategoryPage[] = [
  {
    locale: "fr",
    slug: "longueur",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversion des unités de longueur",
    description:
      "Convertissez gratuitement et rapidement les mètres, kilomètres, centimètres, miles et pieds ; consultez les formules et les tableaux utiles.",
    introduction: [
      "La longueur est l’une des grandeurs physiques fondamentales utilisées pour décrire la hauteur, la largeur, l’épaisseur d’un objet ou la distance entre deux points. Selon la direction mesurée, un même objet peut avoir plusieurs longueurs.",
      "En physique, la longueur est généralement représentée par le symbole dimensionnel L. Elle intervient dans la définition de nombreuses grandeurs dérivées, telles que la surface, le volume, la vitesse, l’accélération, la pression et la densité.",
      "Dans le Système international d’unités (SI), l’unité de base de la longueur est le mètre, noté m. Selon l’ampleur de la distance mesurée, on utilise le nanomètre, le micromètre, le millimètre, le centimètre, le mètre ou le kilomètre. Le pouce, le pied, le yard et le mile restent utilisés hors du système métrique, notamment aux États-Unis et au Royaume-Uni.",
    ],
    facts: [
      { label: "Unité de base SI", value: "Mètre" },
      { label: "Symbole de l’unité SI", value: "m" },
      { label: "Grandeur physique", value: "Longueur" },
      { label: "Symbole dimensionnel", value: "L" },
      { label: "Définition actuelle du mètre", value: "Distance parcourue par la lumière dans le vide en 1/299 792 458 de seconde" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la longueur ?",
        paragraphs: [
          "La longueur sert à décrire la hauteur, la largeur, la profondeur d’un objet ou la distance entre deux points ; c’est l’une des grandeurs physiques fondamentales. Selon la direction mesurée, un même objet peut présenter plusieurs longueurs.",
          "En physique, la longueur est généralement notée par le symbole dimensionnel L. De nombreuses grandeurs dérivées, telles que la surface, le volume, la vitesse, l’accélération, la pression et la densité, sont définies à partir de la dimension de longueur.",
        ],
      },
      {
        title: "L’unité SI de la longueur",
        paragraphs: [
          "Dans le Système international d’unités, l’unité de base de la longueur est le mètre, symbolisé par m. Le mètre sert de référence fondamentale pour définir toutes les autres unités de longueur.",
          "Les unités métriques comme le kilomètre, le centimètre, le millimètre, le micromètre et le nanomètre sont reliées au mètre par des multiples et des sous-multiples décimaux. Cette structure permet d’effectuer les conversions entre unités métriques à l’aide de puissances de dix.",
        ],
      },
      {
        title: "La définition scientifique du mètre",
        paragraphs: [
          "Le mètre a autrefois été défini à partir des dimensions de la Terre, puis à l’aide d’étalons physiques. Avec le progrès des technologies de mesure, une définition plus stable et reproductible partout dans le monde est devenue nécessaire.",
          "Aujourd’hui, un mètre est défini comme la longueur du trajet parcouru par la lumière dans le vide pendant un intervalle de 1/299 792 458 de seconde. Cette définition repose sur le fait que la vitesse de la lumière dans le vide est fixée à exactement 299 792 458 mètres par seconde.",
        ],
      },
      {
        title: "Les unités métriques de longueur",
        paragraphs: [
          "Dans le système métrique, les unités sont reliées au mètre par des puissances positives ou négatives de dix. Un kilomètre équivaut à 1 000 mètres, un centimètre à 0,01 mètre et un millimètre à 0,001 mètre.",
          "Pour les très petites longueurs, on utilise le micromètre, le nanomètre et le picomètre. Les cellules se mesurent le plus souvent en micromètres, les longueurs d’onde de la lumière en nanomètres et certaines distances à l’échelle atomique en picomètres.",
        ],
      },
      {
        title: "Les unités de longueur hors système métrique",
        paragraphs: [
          "Le pouce, le pied, le yard et le mile terrestre sont des unités de longueur courantes en dehors du système métrique. Elles restent utilisées notamment dans le système de mesure américain et dans certaines applications issues de la tradition britannique.",
          "Un pouce équivaut exactement à 2,54 centimètres, un pied à 12 pouces et un yard à 3 pieds. Un mile terrestre est défini exactement comme 1 609,344 mètres.",
        ],
      },
      {
        title: "La longueur en navigation maritime et aérienne",
        paragraphs: [
          "En navigation maritime et aérienne, les distances sont le plus souvent exprimées en milles marins. Un mille marin équivaut exactement à 1 852 mètres.",
          "Le mille marin a été développé à partir d’une approche historique liée aux coordonnées géographiques de la Terre. L’unité de vitesse appelée nœud désigne également un mille marin par heure.",
        ],
      },
      {
        title: "Comment mesure-t-on la longueur ?",
        paragraphs: [
          "Pour les mesures quotidiennes, on utilise des outils comme la règle, le mètre ruban, le pied à coulisse et le micromètre. La précision de l’instrument choisi dépend de la taille de l’objet à mesurer et du niveau de précision requis.",
          "En ingénierie et en recherche scientifique, on peut utiliser des télémètres laser, des machines à mesurer tridimensionnelles, des interféromètres et divers systèmes de mesure optique.",
        ],
      },
      {
        title: "Précision de mesure et incertitude",
        paragraphs: [
          "Aucune mesure physique n’est absolument parfaite. Son résultat comporte toujours une incertitude liée à la résolution de l’appareil, à son étalonnage, aux conditions environnementales et à la méthode appliquée.",
          "C’est pourquoi les résultats scientifiques doivent indiquer la valeur mesurée, son incertitude et l’unité utilisée. En ingénierie de précision, même une variation de température peut modifier la longueur d’un matériau.",
        ],
      },
      {
        title: "Comment convertir les unités de longueur ?",
        paragraphs: [
          "Pour les conversions au sein d’un même système de mesure, on utilise le rapport entre les unités. Par exemple, pour convertir des mètres en kilomètres, on divise la valeur par 1 000 ; pour convertir des kilomètres en mètres, on la multiplie par 1 000.",
          "Pour les conversions entre le système métrique et les unités britanniques ou américaines, il faut utiliser les coefficients de conversion exacts. Par exemple, pour convertir des pouces en centimètres, on multiplie la valeur par 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanomètre", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/métrique", commonUse: "Longueurs d’onde et nanotechnologie" },
      { name: "Micromètre", symbol: "µm", referenceValue: "0,000001 m", system: "SI/métrique", commonUse: "Cellules, particules et fabrication de précision" },
      { name: "Millimètre", symbol: "mm", referenceValue: "0,001 m", system: "SI/métrique", commonUse: "Dessin technique et petites mesures" },
      { name: "Centimètre", symbol: "cm", referenceValue: "0,01 m", system: "SI/métrique", commonUse: "Mesure des objets du quotidien" },
      { name: "Décimètre", symbol: "dm", referenceValue: "0,1 m", system: "SI/métrique", commonUse: "Enseignement et certains calculs de volume" },
      { name: "Mètre", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Mesures de longueur courantes" },
      { name: "Kilomètre", symbol: "km", referenceValue: "1 000 m", system: "SI/métrique", commonUse: "Distances routières et géographiques" },
      { name: "Pouce", symbol: "in", referenceValue: "0,0254 m", system: "Britannique/américain", commonUse: "Écrans, tuyaux et mesures techniques" },
      { name: "Pied", symbol: "ft", referenceValue: "0,3048 m", system: "Britannique/américain", commonUse: "Hauteur, construction et aviation" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britannique/américain", commonUse: "Terrains de sport et mesures de distance" },
      { name: "Mile", symbol: "mi", referenceValue: "1 609,344 m", system: "Britannique/américain", commonUse: "Distances routières" },
      { name: "Mille marin", symbol: "nmi", referenceValue: "1 852 m", system: "Navigation maritime", commonUse: "Navigation maritime et aérienne" },
    ],
  },
  {
    locale: "fr",
    slug: "surface",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversion des unités de surface",
    description:
      "Convertissez les surfaces entre mètres carrés, hectares et pieds carrés ; idéal pour les terrains, les bâtiments et la construction.",
    introduction: [
      "La surface est une grandeur physique dérivée qui exprime l’étendue d’une région bidimensionnelle. Comme elle résulte du produit d’une longueur par elle-même, sa dimension est toujours une longueur au carré (L²).",
      "Dans le Système international d’unités, l’unité dérivée de surface est le mètre carré (m²). En agriculture et pour les terrains, le dönüm, le dekar et l’hectare sont courants ; le système britannique ou américain utilise le pied carré et l’acre. En Asie du Sud, le bigha, le katha et le decimal restent également répandus.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Surface" },
      { label: "Symbole dimensionnel", value: "[L²]" },
      { label: "Unité dérivée SI", value: "Mètre carré" },
      { label: "Symbole de l’unité SI", value: "m²" },
      { label: "Formule de base (rectangle)", value: "Surface = Longueur × Largeur" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la surface ?",
        paragraphs: [
          "La surface exprime l’étendue d’une région plane. La superficie d’un terrain, le sol d’une pièce ou l’étendue d’une feuille de papier se mesurent en unités de surface.",
          "La surface est une grandeur dérivée : elle s’obtient en multipliant une unité de longueur par elle-même. Sa dimension SI est donc L² et elle est toujours une grandeur scalaire positive.",
        ],
      },
      {
        title: "L’unité SI de la surface : le mètre carré",
        paragraphs: [
          "Dans le Système international d’unités, l’unité dérivée de surface est le mètre carré (m²), soit la surface d’un carré dont le côté mesure exactement un mètre.",
          "Le mètre carré n’est pas une unité de base indépendante mais une unité dérivée, obtenue en élevant au carré l’unité de longueur. Toutes les autres unités métriques de surface se rattachent au mètre carré par des puissances de dix.",
        ],
      },
      {
        title: "Pourquoi les unités de surface se convertissent-elles selon un rapport au carré ?",
        paragraphs: [
          "Lors d’une conversion de surface, le rapport de longueur doit être élevé au carré. Par exemple, un kilomètre vaut 1 000 mètres, mais un kilomètre carré vaut 1 000² mètres carrés, soit 1 000 000 m².",
          "Cela s’explique parce que les deux dimensions d’une surface, longueur et largeur, varient dans la même proportion. Oublier cette relation au carré est l’erreur la plus fréquente : « 1 km² = 1 000 m² » est faux.",
        ],
      },
      {
        title: "Les unités métriques de surface",
        paragraphs: [
          "Dans le système métrique, on utilise le millimètre carré et le centimètre carré pour les petites surfaces, le mètre carré au quotidien et le kilomètre carré pour les grandes étendues. Un centimètre carré équivaut à 0,0001 m², tandis qu’un kilomètre carré équivaut à 1 000 000 m².",
          "Pour les terrains, on utilise l’are (100 m²) et son multiple cent fois plus grand, l’hectare (10 000 m²). L’hectare est l’unité métrique la plus courante dans le monde pour exprimer la superficie des terres agricoles.",
        ],
      },
      {
        title: "Le dönüm et le dekar en Turquie",
        paragraphs: [
          "En Turquie, les unités les plus utilisées pour mesurer les terres agricoles sont le dönüm et le dekar ; tous deux équivalent aujourd’hui à 1 000 m² et sont interchangeables. Le dekar est le terme officiel de la législation sur les poids et mesures, tandis que le dönüm est le terme traditionnel employé au quotidien.",
          "À l’époque ottomane, la taille du dönüm variait selon les régions, entre 900 et 1 600 m². La loi sur les poids et mesures de 1931 l’a aligné sur le dekar et standardisé à exactement 1 000 m².",
        ],
      },
      {
        title: "Les unités de surface du système britannique et américain",
        paragraphs: [
          "Le pied carré (ft²) et le pouce carré (in²) servent aux petites surfaces, tandis que l’acre est utilisé pour les grandes parcelles dans les systèmes britannique et américain. Un acre équivaut exactement à 4 046,856 422 4 m².",
          "L’origine historique de l’acre remonte à la surface qu’une paire de bœufs pouvait labourer en une journée. Cette unité reste très présente dans les annonces immobilières aux États-Unis, au Royaume-Uni et dans certains pays du Commonwealth.",
        ],
      },
      {
        title: "Les unités de terrain d’Asie du Sud",
        paragraphs: [
          "En Inde, au Bangladesh, au Pakistan et au Népal, des unités locales telles que le bigha, le katha, le killa, le kanal, le marla, le guntha, le biswa et le decimal restent largement utilisées. Leur valeur peut varier considérablement d’une région à l’autre, même lorsqu’elles portent le même nom.",
          "Par exemple, un bigha équivaut à environ 1 338 m² au Bengale-Occidental, mais peut représenter une autre valeur dans un autre État. Lors d’une transaction immobilière, il est donc important de vérifier le standard régional appliqué.",
        ],
      },
      {
        title: "Comment calcule-t-on une surface ?",
        paragraphs: [
          "Pour un rectangle, la formule est : surface = longueur × largeur. Pour un triangle, on utilise surface = (base × hauteur) / 2 ; pour un cercle, surface = π × rayon².",
          "Pour un terrain de forme irrégulière, on peut le découper en rectangles ou en triangles plus petits, calculer chaque partie puis les additionner. Les relevés cadastraux utilisent aussi des formules de polygones fondées sur des coordonnées.",
        ],
      },
      {
        title: "Points à surveiller lors de la mesure de surface",
        paragraphs: [
          "La surface indiquée dans une annonce immobilière ou un acte de propriété doit toujours être lue avec son unité (m², dönüm, acre, bigha, etc.) et le standard régional qui la définit.",
          "Dans les transactions internationales, s’appuyer sur l’équivalent exact en mètres carrés plutôt que sur la seule similitude de nom évite les malentendus. L’outil de cette page compare toutes les unités à partir d’une référence commune en mètres carrés.",
        ],
      },
    ],
    unitTable: [
      { name: "Millimètre carré", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/métrique", commonUse: "Dessin technique et petites surfaces" },
      { name: "Centimètre carré", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/métrique", commonUse: "Surface des petits objets" },
      { name: "Mètre carré", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Habitation, bureau et terrain" },
      { name: "Are", symbol: "a", referenceValue: "100 m²", system: "Métrique", commonUse: "Petites parcelles de terrain" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1 000 m²", system: "Turquie (métrique)", commonUse: "Mesure des terres agricoles" },
      { name: "Hectare", symbol: "ha", referenceValue: "10 000 m²", system: "Métrique", commonUse: "Grandes terres agricoles et forestières" },
      { name: "Kilomètre carré", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/métrique", commonUse: "Villes, pays et zones géographiques" },
      { name: "Pied carré", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britannique/américain", commonUse: "Surface d’habitation (US/UK)" },
      { name: "Yard carré", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britannique/américain", commonUse: "Terrains de sport et textile" },
      { name: "Acre", symbol: "ac", referenceValue: "4 046,856 422 4 m²", system: "Britannique/américain", commonUse: "Grandes parcelles de terrain" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1 337,8 m² (variable selon la région)", system: "Asie du Sud", commonUse: "Terres agricoles en Inde et au Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japon", commonUse: "Habitat et terrain au Japon" },
    ],
  },
  {
    locale: "fr",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversion des unités de volume",
    description:
      "Convertissez les volumes entre litres, millilitres et mètres cubes ; comparez les unités courantes pour les liquides et les récipients.",
    introduction: [
      "Le volume est une grandeur physique dérivée qui exprime l’espace occupé par un objet ou contenu dans un récipient tridimensionnel. Il résulte du produit d’une longueur dans les trois dimensions : longueur × largeur × hauteur ; sa dimension est donc L³.",
      "Dans le Système international d’unités, l’unité dérivée de volume est le mètre cube (m³). Au quotidien, le litre et le millilitre sont beaucoup plus utilisés. En cuisine, la tasse, la cuillère à soupe et la cuillère à café sont usuelles ; les systèmes américain et britannique emploient notamment le gallon, le quart, la pinte et l’once liquide.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Volume" },
      { label: "Symbole dimensionnel", value: "[L³]" },
      { label: "Unité dérivée SI", value: "Mètre cube" },
      { label: "Symbole de l’unité SI", value: "m³" },
      { label: "Unité la plus courante au quotidien", value: "Litre (L)" },
    ],
    sections: [
      {
        title: "Qu’est-ce que le volume ?",
        paragraphs: [
          "Le volume est l’étendue de l’espace tridimensionnel occupé par un objet ou pouvant être contenue dans un récipient. Pour un solide, il exprime son encombrement ; pour un récipient, la quantité de liquide ou de gaz qu’il peut contenir.",
          "Le volume est une grandeur dérivée, obtenue en multipliant une unité de longueur dans les trois dimensions. Sa dimension SI est donc L³.",
        ],
      },
      {
        title: "L’unité SI du volume : le mètre cube",
        paragraphs: [
          "Dans le Système international d’unités, l’unité dérivée de volume est le mètre cube (m³), soit le volume d’un cube dont chaque côté mesure exactement un mètre.",
          "Le mètre cube sert aux grands volumes, comme les réservoirs d’eau, le béton coulé ou les conteneurs, tandis que le litre est plus adapté au quotidien. Un mètre cube équivaut exactement à 1 000 litres.",
        ],
      },
      {
        title: "La relation entre le litre et le mètre cube",
        paragraphs: [
          "Le litre est une unité de volume pratique, admise pour un usage conjoint avec le SI sans être une unité SI. Il équivaut au volume d’un cube de 10 centimètres de côté, soit 1 000 cm³.",
          "Les sous-multiples du litre — décilitre, centilitre et millilitre — sont très utilisés pour l’alimentation, la médecine et le laboratoire. Un millilitre équivaut exactement à un centimètre cube (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Pourquoi les unités de volume se convertissent-elles selon un rapport cubique ?",
        paragraphs: [
          "Les unités de longueur se convertissent selon un rapport linéaire, les unités de surface selon un rapport au carré et les unités de volume selon un rapport cubique. Ainsi, un mètre vaut 100 centimètres, mais un mètre cube vaut 100³ centimètres cubes, soit 1 000 000 cm³.",
          "Cette relation cubique vient du fait que le volume varie simultanément dans trois dimensions. C’est l’erreur conceptuelle la plus fréquente dans les conversions de volume, notamment avec des unités non métriques comme le gallon ou le pied cube.",
        ],
      },
      {
        title: "Les mesures de cuisine",
        paragraphs: [
          "Les mesures de recette, comme la cuillère à soupe, la cuillère à café et la tasse, sont des unités de volume pratiques. Équivalences courantes : une cuillère à soupe ≈ 15 mL, une cuillère à café ≈ 5 mL et une tasse ≈ 250 mL.",
          "Ces mesures ne sont pas des normes scientifiques exactes mais des repères culinaires. Pour une recette exigeant de la précision, notamment en pâtisserie, une balance de cuisine numérique est plus fiable.",
        ],
      },
      {
        title: "Les unités de volume liquide américaines et britanniques",
        paragraphs: [
          "Les systèmes américain et britannique emploient le gallon, le quart, la pinte et l’once liquide, mais leurs valeurs diffèrent. Un gallon américain équivaut à 3,785 41 litres, contre 4,546 09 litres pour un gallon impérial britannique, soit environ 20 % de plus.",
          "Cette différence vient de références historiques distinctes. Il faut toujours vérifier à quel système correspond la mention « gallon » ou « once » sur une recette ou une étiquette de produit.",
        ],
      },
      {
        title: "Les unités de volume agricoles et historiques",
        paragraphs: [
          "Le boisseau (bushel) et le peck sont des unités historiquement utilisées pour mesurer des produits secs, comme les céréales, les fruits et les légumes. Elles restent présentes dans certains marchés agricoles, notamment aux États-Unis.",
          "À l’époque ottomane, le kile et le şinik étaient des unités traditionnelles utilisées pour les céréales ; un kile équivalait à 20 şinik. Malgré de légères variations régionales, elles restent utiles pour interpréter les textes et registres historiques.",
        ],
      },
      {
        title: "Comment calcule-t-on un volume ?",
        paragraphs: [
          "Pour un pavé droit, la formule est : volume = longueur × largeur × hauteur. Pour un cylindre, volume = π × rayon² × hauteur ; pour une sphère, volume = (4/3) × π × rayon³.",
          "Le volume d’un solide irrégulier peut être déterminé par déplacement d’eau, selon le principe d’Archimède : on immerge l’objet dans un récipient et on mesure le volume d’eau déplacé.",
        ],
      },
      {
        title: "Mesure du volume dans le pétrole et l’industrie",
        paragraphs: [
          "Dans l’industrie pétrolière, le volume s’exprime généralement en barils (bbl) : un baril équivaut à environ 158,987 litres, soit 42 gallons américains. Cette unité date du XIXe siècle, lorsque le pétrole était transporté dans des fûts en bois.",
          "Dans les procédés industriels, les grands volumes sont généralement exprimés en mètres cubes, tandis que les mesures de laboratoire le sont en millilitres. L’unité doit être choisie selon l’ampleur du volume mesuré.",
        ],
      },
    ],
    unitTable: [
      { name: "Millilitre", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/métrique", commonUse: "Doses médicales et petites mesures" },
      { name: "Cuillère à café", symbol: "cc", referenceValue: "0,000005 m³ (≈5 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Cuillère à soupe", symbol: "cs", referenceValue: "0,000015 m³ (≈15 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Tasse", symbol: "tasse", referenceValue: "0,00025 m³ (≈250 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Litre", symbol: "L", referenceValue: "0,001 m³", system: "Métrique", commonUse: "Boissons, carburant et volumes courants" },
      { name: "Once liquide (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "États-Unis", commonUse: "Boissons et emballages cosmétiques" },
      { name: "Pinte (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "États-Unis", commonUse: "Bière et lait" },
      { name: "Gallon (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "États-Unis", commonUse: "Carburant et grands volumes liquides" },
      { name: "Gallon impérial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britannique (impérial)", commonUse: "Carburant et liquides au Royaume-Uni" },
      { name: "Pied cube", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britannique/américain", commonUse: "Construction et débit d’air CVC" },
      { name: "Baril (pétrole)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industrie pétrolière", commonUse: "Mesure du pétrole brut" },
      { name: "Mètre cube", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Réservoirs d’eau, béton et grands volumes" },
    ],
  },
  {
    locale: "fr",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversion des unités de masse",
    description:
      "Convertissez rapidement et gratuitement entre kilogrammes, grammes, milligrammes, tonnes et livres.",
    introduction: [
      "La masse est une grandeur physique fondamentale liée à la quantité de matière d’un objet et à son inertie. Dans le Système international d’unités, son unité de base est le kilogramme, symbolisé par kg.",
      "Dans le langage courant, masse et poids sont souvent confondus, mais ils désignent deux grandeurs distinctes. La masse se mesure en kilogrammes ; le poids, qui est une force, se mesure en newtons.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Masse" },
      { label: "Symbole dimensionnel", value: "[M]" },
      { label: "Unité de base SI", value: "Kilogramme" },
      { label: "Symbole de l’unité SI", value: "kg" },
      { label: "Domaine de métrologie", value: "Métrologie de la masse" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la masse ?",
        paragraphs: [
          "La masse est liée à la résistance qu’un objet oppose à un changement de son état de mouvement, c’est-à-dire à son inertie. En mécanique classique, la relation entre la force nette et l’accélération produite s’écrit F = m·a.",
          "À force égale, un objet plus massif acquiert une accélération plus faible. La masse n’exprime donc pas seulement la quantité de matière : elle joue un rôle fondamental dans les équations du mouvement.",
          "La masse est une grandeur scalaire, sans direction. Son symbole dimensionnel de base dans le SI est M.",
        ],
      },
      {
        title: "La différence entre masse et poids",
        paragraphs: [
          "La masse et le poids ne sont pas la même grandeur physique. La masse est une propriété de l’objet et s’exprime en kilogrammes. Le poids est la force subie dans un champ gravitationnel et se mesure en newtons.",
          "La relation simplifiée du poids s’écrit W = m·g, où W représente le poids, m la masse et g l’accélération locale de la pesanteur.",
          "La masse d’un objet reste sensiblement la même sur Terre et sur la Lune ; son poids varie parce que l’accélération de la pesanteur est différente. En usage scientifique, le kilogramme est donc une unité de masse, non de poids.",
          "Dans le langage courant, les deux mots sont souvent employés l’un pour l’autre, car le résultat d’une pesée s’exprime en kilogrammes. L’appareil détecte pourtant une force, puis affiche une valeur étalonnée en unité de masse.",
        ],
      },
      {
        title: "Pourquoi le kilogramme est-il l’unité de base SI de la masse ?",
        paragraphs: [
          "Dans le Système international d’unités, l’unité de base de la masse est le kilogramme. C’est la seule unité de base du SI dont le nom comporte un préfixe.",
          "Le gramme a joué un rôle historique dans les premières définitions de masse du système métrique. Lors de l’établissement des étalons pratiques, le kilogramme est toutefois devenu la référence fondamentale.",
          "Depuis 2019, le kilogramme n’est plus défini par un cylindre métallique physique, mais par la valeur fixée de la constante de Planck. Cette définition est mise en pratique notamment avec la balance de Kibble et des mesures électriques de haute précision.",
        ],
      },
      {
        title: "Les unités métriques de masse",
        paragraphs: [
          "Les unités métriques de masse sont construites à partir du kilogramme, du gramme et de préfixes SI. Un gramme équivaut à 0,001 kilogramme, un milligramme à 0,001 gramme et un microgramme à 0,001 milligramme.",
          "Pour les grandes masses, on utilise la tonne métrique, qui équivaut exactement à 1 000 kilogrammes. Son symbole, admis avec le SI, est la lettre minuscule t.",
          "L’unité doit être choisie selon l’ampleur mesurée : kilogrammes pour une personne ou un produit, grammes pour un aliment, milligrammes ou microgrammes pour un principe actif, tonnes pour la charge d’un véhicule.",
        ],
      },
      {
        title: "La relation entre la livre, l’once et le kilogramme",
        paragraphs: [
          "La livre et l’once sont des unités de masse utilisées dans les systèmes de mesure traditionnels britannique et américain. La livre avoirdupois internationale équivaut exactement à 0,453 592 37 kilogramme.",
          "Une livre avoirdupois se divise en 16 onces. Une once équivaut donc exactement à 0,028 349 523 125 kilogramme, soit 28,349 523 125 grammes.",
          "La livre de masse et la livre-force (pound-force) désignent deux grandeurs différentes. La première exprime une masse, la seconde une force ; dans les calculs techniques, les symboles lb et lbf ne doivent pas être confondus.",
        ],
      },
      {
        title: "Comment mesure-t-on la masse ?",
        paragraphs: [
          "Pour mesurer la masse, on utilise notamment une balance à deux plateaux, une balance électronique, une balance analytique, une cellule de charge ou un système industriel de pesage.",
          "Les balances comparatives rapprochent une masse inconnue de masses étalons traçables. Les balances électroniques convertissent la force appliquée en signal électrique grâce à des cellules de charge.",
          "En haute précision, la poussée d’Archimède de l’air, la pesanteur locale, la température, l’humidité, les vibrations, les effets électrostatiques et la densité de l’étalon peuvent influencer le résultat.",
          "Le rattachement des étalons aux systèmes de mesure nationaux et internationaux s’appelle la traçabilité métrologique. La chaîne d’étalonnage permet de comparer les résultats entre laboratoires et entreprises.",
        ],
      },
      {
        title: "La relation entre densité, volume et masse",
        paragraphs: [
          "La masse, la densité et le volume sont liés par la relation m = ρ·V, où m représente la masse, ρ la densité et V le volume.",
          "À volume égal, la masse de deux matières peut être très différente selon leur densité. Ainsi, l’acier et l’eau n’ont pas la même masse pour un même volume.",
          "Dans le SI, l’unité dérivée de densité est le kilogramme par mètre cube. En laboratoire, le gramme par centimètre cube et le gramme par millilitre sont également courants.",
        ],
      },
      {
        title: "L’incertitude dans la mesure de la masse",
        paragraphs: [
          "Toute mesure réelle comporte une incertitude. Le fait qu’une balance affiche de nombreux chiffres ne signifie pas que tous sont connus avec la même précision.",
          "La résolution de l’appareil, la répétabilité, la non-linéarité, l’étalon de calibration, les conditions environnementales et la méthode de l’utilisateur contribuent à cette incertitude.",
          "Dans les travaux scientifiques et industriels, un résultat doit être présenté avec l’unité appropriée, le bon nombre de chiffres significatifs et une indication de son incertitude.",
        ],
      },
      {
        title: "Comment choisir l’unité de masse appropriée ?",
        paragraphs: [
          "Choisir une unité adaptée à l’ampleur mesurée rend le résultat plus lisible. La masse d’une personne peut s’exprimer en kilogrammes, le principe actif d’un comprimé en milligrammes et le chargement d’un camion en tonnes.",
          "Pour les très petites masses, on peut employer le microgramme, le nanogramme ou le picogramme. À l’échelle des atomes et des molécules, l’unité de masse atomique unifiée peut être plus pratique.",
          "Lors d’une conversion, il faut vérifier la valeur numérique, mais aussi déterminer si l’unité concernée exprime une masse ou une force.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogramme", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Très faibles quantités de matière" },
      { name: "Microgramme", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Mesures médicales et de laboratoire" },
      { name: "Milligramme", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doses médicamenteuses et substances chimiques" },
      { name: "Gramme", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentation et petits objets" },
      { name: "Kilogramme", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Mesures de masse de base" },
      { name: "Tonne", symbol: "t", referenceValue: "1 000 kg", system: "Métrique", commonUse: "Transport, fret et industrie" },
      { name: "Once", symbol: "oz", referenceValue: "0,028 349 523 125 kg", system: "Britannique/américain", commonUse: "Alimentation et petites masses" },
      { name: "Livre", symbol: "lb", referenceValue: "0,453 592 37 kg", system: "Britannique/américain", commonUse: "Masse corporelle et produits" },
    ],
  },
  {
    locale: "fr",
    slug: "temperature",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversion des unités de température",
    description:
      "Convertissez les températures entre Celsius, Fahrenheit et kelvins ; consultez les formules et des valeurs d’exemple.",
    introduction: [
      "La température est une grandeur physique fondamentale liée à l’énergie cinétique moyenne des particules d’une matière. Elle indique à quel point cette matière est chaude ou froide. Dans le Système international d’unités, son unité de base est le kelvin.",
      "Au quotidien, les échelles Celsius et Fahrenheit sont les plus utilisées ; le kelvin est employé dans les travaux scientifiques, le rankine dans certains calculs d’ingénierie et le Réaumur apparaît dans les textes historiques. Contrairement à de nombreuses grandeurs, la conversion de température nécessite souvent une addition ou une soustraction, en plus d’une multiplication.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Température thermodynamique" },
      { label: "Symbole dimensionnel", value: "[Θ]" },
      { label: "Unité de base SI", value: "Kelvin" },
      { label: "Symbole de l’unité SI", value: "K" },
      { label: "Zéro absolu", value: "0 K = −273,15 °C = −459,67 °F" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la température ?",
        paragraphs: [
          "La température est directement liée à l’énergie cinétique moyenne des atomes et des molécules qui composent une matière. Plus les particules se déplacent rapidement, plus la matière est considérée comme chaude.",
          "La température thermodynamique est l’une des sept grandeurs de base du SI et se note Θ (thêta). Elle n’est pas directement additive : mettre deux corps en contact n’additionne pas leurs températures, mais les conduit vers un équilibre thermique.",
        ],
      },
      {
        title: "L’unité SI de la température : le kelvin",
        paragraphs: [
          "Le kelvin est l’unité de base SI de la température, symbolisée par K, sans signe de degré. L’échelle Kelvin prend le zéro absolu, la température la plus basse théoriquement possible, comme point de départ.",
          "Depuis la révision du SI de 2019, le kelvin est défini à partir de la valeur fixée de la constante de Boltzmann (k), et non plus du point triple de l’eau. L’unité repose ainsi sur une constante universelle plutôt que sur une substance de référence.",
        ],
      },
      {
        title: "Pourquoi la conversion de température n’est-elle pas une simple multiplication ?",
        paragraphs: [
          "Pour une grandeur comme la longueur ou la masse, la conversion repose sur un facteur multiplicatif. Les échelles Celsius, Fahrenheit et Kelvin ayant des zéros différents, la conversion de température exige à la fois une multiplication et une addition ou une soustraction.",
          "Par exemple, pour passer de Celsius à Fahrenheit, on multiplie d’abord la valeur par 9/5, puis on ajoute 32 : °F = (°C × 9/5) + 32. La relation est dite affine : elle est linéaire, mais ne passe pas par l’origine.",
        ],
      },
      {
        title: "L’échelle Celsius",
        paragraphs: [
          "L’échelle Celsius a été proposée en 1742 par l’astronome suédois Anders Celsius. À la pression atmosphérique standard, l’eau y gèle à 0 °C et bout à 100 °C, ce qui en fait une référence intuitive au quotidien.",
          "Le Celsius est l’échelle la plus utilisée dans le monde, tant pour les bulletins météorologiques que pour de nombreux travaux scientifiques. Les États-Unis figurent parmi les rares pays qui emploient encore surtout le Fahrenheit au quotidien.",
        ],
      },
      {
        title: "L’échelle Fahrenheit",
        paragraphs: [
          "L’échelle Fahrenheit a été développée en 1724 par le physicien allemand Daniel Gabriel Fahrenheit. L’eau y gèle à 32 °F et bout à 212 °F, soit un intervalle de 180 degrés entre ces deux repères.",
          "Le Fahrenheit reste utilisé pour les températures quotidiennes dans un petit nombre de pays, principalement aux États-Unis. Dans les travaux scientifiques internationaux, il a largement cédé la place au Celsius et au kelvin.",
        ],
      },
      {
        title: "Rankine et Réaumur : des échelles moins connues",
        paragraphs: [
          "Le rankine est une échelle de température absolue dont les intervalles ont la même taille que le degré Fahrenheit et dont le zéro correspond au zéro absolu. Le point de congélation de l’eau y est de 491,67 °R. Elle intervient encore dans certains calculs d’ingénierie thermodynamique aux États-Unis.",
          "L’échelle Réaumur, développée au XVIIIe siècle par René-Antoine Ferchault de Réaumur, fixe le point de congélation de l’eau à 0 °Ré et son point d’ébullition à 80 °Ré. Elle est aujourd’hui historique, mais peut apparaître dans certains textes ou recettes traditionnelles.",
        ],
      },
      {
        title: "Que signifie le zéro absolu ?",
        paragraphs: [
          "Le zéro absolu (0 K, −273,15 °C, −459,67 °F) est la limite inférieure de l’échelle thermodynamique. Les particules y possèdent, au sens classique, la plus faible énergie cinétique possible. La mécanique quantique prévoit toutefois une énergie résiduelle de point zéro.",
          "En laboratoire, il est possible d’atteindre des températures extrêmement proches du zéro absolu, de l’ordre du microkelvin ou du nanokelvin. Selon le troisième principe de la thermodynamique, il est impossible d’atteindre exactement cette limite en un nombre fini d’étapes.",
        ],
      },
      {
        title: "Comment mesure-t-on la température ?",
        paragraphs: [
          "On mesure la température avec des thermomètres à liquide, numériques, à résistance (RTD), des thermocouples ou des thermomètres infrarouges sans contact. Chaque technologie convient à une plage de température et à une précision particulières.",
          "Les thermocouples sont très utilisés dans l’industrie, car ils fonctionnent sur une vaste plage de températures. Ils déterminent la température à partir de la différence de tension générée à la jonction de deux métaux différents.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unité de base", system: "SI", commonUse: "Calculs scientifiques et thermodynamiques" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Métrique (usage courant)", commonUse: "Météorologie, quotidien et sciences" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "États-Unis", commonUse: "Températures quotidiennes aux États-Unis" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "États-Unis (ingénierie)", commonUse: "Calculs d’ingénierie thermodynamique" },
      { name: "Réaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Historique (Europe)", commonUse: "Textes historiques et recettes traditionnelles" },
    ],
  },
  {
    locale: "fr",
    slug: "temps",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversion des unités de temps",
    description:
      "Utilisez sur une seule page les conversions de temps essentielles entre secondes, minutes et heures.",
    introduction: [
      "Le temps est une grandeur physique fondamentale qui exprime l’ordre des événements et la durée qui les sépare. Dans le Système international d’unités, son unité de base est la seconde ; la minute, l’heure et le jour sont très utilisés au quotidien.",
      "Le temps est l’un des concepts de mesure les plus anciens. La structure sexagésimale — base 60 — de l’heure, de la minute et de la seconde remonte à plusieurs millénaires, jusqu’à l’ancienne civilisation babylonienne.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Temps" },
      { label: "Symbole dimensionnel", value: "[T]" },
      { label: "Unité de base SI", value: "Seconde" },
      { label: "Symbole de l’unité SI", value: "s" },
      { label: "Définition actuelle de la seconde", value: "9 192 631 770 périodes de la radiation du césium-133" },
    ],
    sections: [
      {
        title: "Qu’est-ce que le temps ?",
        paragraphs: [
          "Le temps exprime l’ordre dans lequel se produisent les événements et la durée écoulée entre eux. En physique, il est représenté par le symbole dimensionnel T et intervient dans des grandeurs dérivées comme la vitesse, l’accélération et la fréquence.",
          "En physique classique, le temps était considéré comme absolu. La relativité d’Einstein a montré qu’il peut s’écouler différemment selon la vitesse de l’observateur et le champ gravitationnel : c’est la dilatation du temps.",
        ],
      },
      {
        title: "L’unité SI du temps : la seconde",
        paragraphs: [
          "La seconde est l’unité de base SI du temps, symbolisée par s. Historiquement, elle correspondait à 1/86 400 de jour, soit 24 heures × 60 minutes × 60 secondes.",
          "La rotation terrestre étant légèrement irrégulière, cette définition n’était pas assez stable. Depuis 1967, la seconde correspond exactement à 9 192 631 770 périodes de la radiation associée à la transition hyperfine de l’atome de césium-133. Cette définition permet aux horloges atomiques d’être cohérentes partout dans le monde.",
        ],
      },
      {
        title: "L’origine sexagésimale de l’heure, de la minute et de la seconde",
        paragraphs: [
          "La division d’une heure en 60 minutes et d’une minute en 60 secondes vient du système numérique sexagésimal, de base 60, utilisé par les Babyloniens. Ce système servait aussi à diviser les angles en 360 degrés.",
          "Le nombre 60 est divisible par de nombreux nombres — 2, 3, 4, 5, 6, 10, 12, 15, 20 et 30 — ce qui facilite les partages pratiques, par exemple diviser une heure en trois ou en quatre sans recourir à des fractions.",
        ],
      },
      {
        title: "La division du jour en 24 heures",
        paragraphs: [
          "La division du jour en 24 heures remonte à l’Égypte antique : douze parties pour le jour et douze autres pour la nuit, suivies à l’aide de cadrans solaires et d’observations stellaires.",
          "Cette division par douze s’inspire peut-être du comptage des phalanges — trois sur chacun des quatre doigts hors pouce — ou du nombre de cycles lunaires dans une année, environ douze.",
        ],
      },
      {
        title: "La relation entre les unités de temps",
        paragraphs: [
          "Les sous-multiples de la seconde — milliseconde (0,001 s), microseconde et nanoseconde — mesurent des événements très brefs, comme les opérations des processeurs, le chronométrage sportif ou les expériences scientifiques.",
          "La minute (60 secondes), l’heure (3 600 secondes) et le jour (86 400 secondes) structurent le temps quotidien. Leur conversion se fait uniquement par multiplication ou division, car ces unités partagent une même origine.",
        ],
      },
      {
        title: "Qu’est-ce qu’une seconde intercalaire ?",
        paragraphs: [
          "La vitesse de rotation de la Terre présente de légères irrégularités dues notamment aux marées et à sa structure interne. Il apparaît ainsi un petit décalage entre le temps atomique et la durée du jour liée à la rotation réelle de la Terre.",
          "Depuis 1972, une seconde intercalaire peut être ajoutée à l’UTC lorsque c’est nécessaire pour limiter ce décalage. À la différence du 29 février, son ajout ne suit pas de cycle fixe : il dépend de l’évolution observée de la rotation terrestre.",
        ],
      },
      {
        title: "Les fuseaux horaires et l’UTC",
        paragraphs: [
          "La Terre est divisée en environ 24 fuseaux horaires, car le Soleil atteint son point culminant à des heures différentes selon la longitude. Les heures locales se décrivent par un décalage par rapport au temps universel coordonné (UTC) ; la France métropolitaine est par exemple à UTC+1 en hiver.",
          "L’UTC est une échelle de temps maintenue par des horloges atomiques. Il a remplacé le Temps moyen de Greenwich (GMT) comme référence technique, même si GMT reste le nom courant du fuseau horaire d’hiver du Royaume-Uni.",
        ],
      },
      {
        title: "Comment mesure-t-on le temps ?",
        paragraphs: [
          "Au quotidien, on utilise des montres mécaniques ou numériques. Les applications scientifiques et technologiques, comme le GPS et les réseaux de télécommunication, reposent sur des horloges atomiques, dont la fréquence d’oscillation est extrêmement stable.",
          "Pour calculer une position précise, les horloges atomiques des satellites GPS doivent rester synchronisées avec une très grande précision. Un léger décalage peut déjà créer une erreur significative dans la position calculée au sol.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliseconde", symbol: "ms", referenceValue: "0,001 s", system: "SI/métrique", commonUse: "Opérations informatiques et chronométrage sportif" },
      { name: "Seconde", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Mesure de temps de base" },
      { name: "Minute", symbol: "min", referenceValue: "60 s", system: "Admise avec le SI", commonUse: "Temps au quotidien" },
      { name: "Heure", symbol: "h", referenceValue: "3 600 s", system: "Admise avec le SI", commonUse: "Temps de travail et de trajet" },
      { name: "Jour", symbol: "j", referenceValue: "86 400 s", system: "Admis avec le SI", commonUse: "Calendrier et calculs de durée" },
    ],
  },
  {
    locale: "fr",
    slug: "vitesse",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversion des unités de vitesse",
    description:
      "Convertissez les vitesses entre km/h, m/s et mph ; consultez les usages courants et scientifiques.",
    introduction: [
      "La vitesse est une grandeur physique dérivée qui exprime la distance parcourue par un objet par unité de temps. Elle résulte de la division d’une longueur par un temps et a donc pour dimension L/T.",
      "Au quotidien, le kilomètre par heure (km/h) et le mile par heure (mph) sont les plus utilisés. Le mètre par seconde (m/s) est privilégié en sciences et le nœud en navigation maritime ou aérienne. La vitesse de la lumière occupe une place particulière comme limite supérieure de propagation dans le vide.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Vitesse" },
      { label: "Symbole dimensionnel", value: "[L/T]" },
      { label: "Unité dérivée SI", value: "Mètre par seconde" },
      { label: "Symbole de l’unité SI", value: "m/s" },
      { label: "Limite de vitesse universelle", value: "Vitesse de la lumière = 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la vitesse ?",
        paragraphs: [
          "La vitesse exprime la distance parcourue par unité de temps : vitesse = distance / temps. La physique distingue la vitesse scalaire, sans direction, de la vitesse vectorielle, qui comporte une direction ; dans le langage courant, ces notions sont souvent confondues.",
          "C’est une grandeur dérivée obtenue en divisant une unité de longueur par une unité de temps. Sa dimension est donc L/T, ou L¹T⁻¹.",
        ],
      },
      {
        title: "L’unité SI de la vitesse : le mètre par seconde",
        paragraphs: [
          "Dans le Système international d’unités, l’unité dérivée de vitesse est le mètre par seconde (m/s), qui correspond à un mètre parcouru chaque seconde. Elle sert de référence dans les calculs scientifiques et les formules de physique.",
          "Au quotidien, le kilomètre par heure est plus intuitif pour les véhicules et les distances routières. Un mètre par seconde équivaut exactement à 3,6 km/h.",
        ],
      },
      {
        title: "Le kilomètre par heure et le mile par heure",
        paragraphs: [
          "Le kilomètre par heure (km/h) est l’unité routière standard dans les pays métriques, dont la France. Le mile par heure (mph) reste courant aux États-Unis et au Royaume-Uni.",
          "Un mph équivaut à environ 1,609 34 km/h. Cette différence peut entraîner une mauvaise lecture d’un compteur ou d’une limitation de vitesse à l’étranger.",
        ],
      },
      {
        title: "Le nœud : la vitesse en navigation maritime et aérienne",
        paragraphs: [
          "Le nœud, ou mille marin par heure, est l’unité standard de vitesse en navigation maritime et aérienne. Un nœud correspond exactement à 1 852 mètres parcourus en une heure.",
          "Son nom vient d’une méthode historique : une corde marquée de nœuds était jetée à l’eau et le nombre de nœuds déroulés pendant un temps donné permettait d’estimer la vitesse du navire.",
        ],
      },
      {
        title: "La vitesse de la lumière : la limite de vitesse de l’univers",
        paragraphs: [
          "La vitesse de la lumière dans le vide vaut exactement 299 792 458 m/s. Selon la relativité restreinte, elle constitue la limite supérieure de propagation d’une information ou de tout objet ayant une masse au repos.",
          "Cette valeur exacte permet de définir le mètre : un mètre est la distance parcourue par la lumière dans le vide pendant 1/299 792 458 de seconde.",
        ],
      },
      {
        title: "Le nombre de Mach : un rapport à la vitesse du son",
        paragraphs: [
          "En aviation, les grandes vitesses sont souvent exprimées par le nombre de Mach, rapport entre la vitesse d’un objet et celle du son dans le milieu considéré. Mach 1 correspond à la vitesse du son, qui varie notamment avec la température de l’air.",
          "Un même nombre de Mach peut donc correspondre à des vitesses différentes en km/h ou en m/s selon l’altitude et la température. À proximité du niveau de la mer, la vitesse du son est d’environ 343 m/s, soit 1 235 km/h.",
        ],
      },
      {
        title: "La différence entre vitesse moyenne et vitesse instantanée",
        paragraphs: [
          "La vitesse moyenne correspond à la distance totale divisée par la durée totale d’un trajet. La vitesse instantanée est la vitesse à un moment précis et peut varier continuellement avec les accélérations, les ralentissements ou les arrêts.",
          "Le compteur d’un véhicule indique la vitesse instantanée. La vitesse moyenne est calculée à partir de la distance et de la durée totales ; les deux ne coïncident que si la vitesse est restée constante.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimètre par seconde", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/métrique", commonUse: "Laboratoire et mouvements lents" },
      { name: "Mètre par minute", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/métrique", commonUse: "Vitesse de convoyeur industriel" },
      { name: "Mètre par seconde", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Calculs scientifiques et physiques" },
      { name: "Kilomètre par heure", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Métrique", commonUse: "Véhicules et limitations routières" },
      { name: "Mile par heure", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britannique/américain", commonUse: "Véhicules aux États-Unis et au Royaume-Uni" },
      { name: "Nœud", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navigation maritime/aérienne", commonUse: "Navires et avions" },
      { name: "Kilomètre par minute", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Métrique", commonUse: "Calculs sur courte distance" },
      { name: "Kilomètre par seconde", symbol: "km/s", referenceValue: "1 000 m/s", system: "Métrique", commonUse: "Engins spatiaux et corps célestes" },
      { name: "Vitesse de la lumière", symbol: "c", referenceValue: "299 792 458 m/s", system: "Constante universelle", commonUse: "Physique et astronomie" },
    ],
  },
  {
    locale: "fr",
    slug: "pression",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversion des unités de pression",
    description:
      "Convertissez les pressions entre pascal, kilopascal, bar et psi ; consultez les formules et les usages techniques.",
    introduction: [
      "La pression est la force perpendiculaire exercée sur une surface, rapportée à cette surface. Elle intervient aussi bien dans le contact entre solides que dans les conduites, les systèmes sous vide ou l’atmosphère. En ingénierie, elle est une variable essentielle de sécurité, d’étanchéité et de contrôle des procédés.",
      "Dans le Système international d’unités, l’unité dérivée de pression est le pascal, noté Pa. Un pascal correspond à une force d’un newton répartie uniformément sur un mètre carré. La pression est donc directement liée à la force et à la surface, tout comme la contrainte mécanique, sans pour autant désigner toujours le même phénomène physique.",
      "Au quotidien et dans l’industrie, le pascal est souvent remplacé par des unités plus pratiques : kilopascal ou psi pour les pneus, bar dans les procédés, atmosphère pour des conditions de référence et millibar en météorologie. Une conversion correcte suppose aussi de distinguer pression absolue, relative et différentielle.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Pression" },
      { label: "Unité dérivée SI", value: "Pascal" },
      { label: "Symbole SI", value: "Pa" },
      { label: "Relation de base", value: "P = F / A" },
      { label: "Équivalent SI", value: "1 Pa = 1 N/m²" },
      { label: "Formule dimensionnelle", value: "M L⁻¹ T⁻²" },
      { label: "Atmosphère standard", value: "101 325 Pa" },
      { label: "Référence du zéro absolu", value: "Vide total" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la pression ?",
        paragraphs: [
          "La pression dépend de la force appliquée, mais aussi de la surface sur laquelle elle se répartit. À force égale, une surface plus petite produit une pression plus élevée : c’est pourquoi un couteau affûté peut couper avec moins de force.",
          "En mécanique des fluides, elle correspond à la contrainte normale qu’un fluide exerce sur son environnement. Dans un fluide au repos, elle se transmet dans toutes les directions ; cette propriété est à la base des presses hydrauliques, des freins et de nombreux actionneurs.",
          "La pression ne concerne pas seulement les liquides et les gaz. Des forces normales exercées sur des surfaces de contact peuvent aussi créer un effet comparable. En ingénierie, le terme désigne toutefois le plus souvent des systèmes fluides : canalisations, réservoirs, compresseurs, gaines d’air, vide et atmosphère.",
        ],
      },
      {
        title: "La formule de la pression : P = F / A",
        paragraphs: [
          "La définition de base est P = F / A, où P est la pression, F la force perpendiculaire à la surface et A la surface concernée. L’unité obtenue est le newton par mètre carré, soit le pascal.",
          "Cette relation donne une pression moyenne si la force est répartie uniformément. Dans les situations réelles de contact ou d’écoulement, la pression peut varier localement ; les calculs doivent alors tenir compte de sa répartition et des conditions aux limites.",
          "Une erreur fréquente consiste à choisir une mauvaise direction de force ou une mauvaise surface effective. Pour calculer la force d’un piston, il faut par exemple utiliser la seule section soumise à la pression.",
        ],
      },
      {
        title: "Pourquoi le pascal est-il l’unité SI de pression ?",
        paragraphs: [
          "Le pascal découle naturellement du newton, unité SI de force, et du mètre carré, unité de surface. L’égalité 1 Pa = 1 N/m² exprime ainsi l’origine mécanique de la pression, sans nécessiter d’unité de base supplémentaire.",
          "Le SI relie les grandeurs dérivées à ses unités de base de manière cohérente. Exprimer une pression en pascals facilite son emploi avec les équations de mécanique des fluides, la contrainte ou le module d’élasticité.",
          "Le pascal est souvent trop petit au quotidien. L’ingénierie utilise donc fréquemment le kilopascal, le mégapascal ou le bar, qui restent tous rattachés au pascal.",
        ],
      },
      {
        title: "L’histoire de la mesure de la pression : Torricelli et le baromètre",
        paragraphs: [
          "La mesure systématique de la pression commence en 1643 avec le baromètre à mercure d’Evangelista Torricelli. Il observe qu’un tube rempli de mercure, retourné dans une cuve, conserve une colonne de liquide sous laquelle se forme un vide.",
          "Torricelli explique cette hauteur par le poids de l’air extérieur. Cette expérience établit que l’air possède une pression mesurable et marque le début de l’étude scientifique de la pression.",
          "En 1648, Florin Périer, suivant une suggestion de Blaise Pascal, mesure la pression à différentes altitudes du puy de Dôme et montre qu’elle diminue avec l’altitude. Le pascal devient ensuite l’unité SI de pression en 1971.",
        ],
      },
      {
        title: "Pression absolue, relative et différentielle",
        paragraphs: [
          "La pression absolue se mesure par rapport au vide total, référence où la pression est théoriquement nulle. Elle ne peut donc pas être négative et sert notamment aux lois des gaz et aux calculs thermodynamiques.",
          "La pression relative, ou manométrique, se mesure par rapport à la pression atmosphérique. La plupart des manomètres prennent l’air ambiant comme référence zéro. La relation est : P_abs = P_rel + P_atm.",
          "La pression différentielle est l’écart entre deux points. On la mesure par exemple pour suivre l’encrassement d’un filtre, le débit à travers une plaque à orifice, une salle en surpression ou un échangeur de chaleur. Elle ne se réfère ni au vide ni à la seule atmosphère, mais directement aux deux points comparés.",
        ],
      },
      {
        title: "La pression atmosphérique",
        paragraphs: [
          "La pression atmosphérique est exercée par le poids de la colonne d’air terrestre. Dans les conditions standard au niveau de la mer, elle vaut 101 325 Pa, soit 1 atm. Sa valeur réelle varie toutefois avec l’altitude, la météo et la température.",
          "Les baromètres mesurent cette pression. Les modèles à mercure ont longtemps servi de référence, tandis que les capteurs électroniques dominent aujourd’hui. La pression atmosphérique intervient en météorologie, dans les systèmes sous vide, la combustion et le passage entre pressions relative et absolue.",
          "Dans un système en pression relative, une même lecture de 2 bar ne correspond pas à la même pression absolue au niveau de la mer et en altitude. La distinction est importante pour les calculs de compression, de densité des gaz et de point d’ébullition.",
        ],
      },
      {
        title: "La pression hydrostatique et la relation P = ρgh",
        paragraphs: [
          "Dans un fluide au repos, la pression augmente avec la profondeur. Si la densité est constante, la pression hydrostatique relative s’écrit approximativement P = ρgh, où ρ est la densité, g l’accélération de la pesanteur et h la hauteur de fluide.",
          "Cette relation est utile pour les réservoirs, les cuves ouvertes, les barrages, la mesure de niveau et les manomètres à colonne liquide. À profondeur égale dans un même fluide, la pression est la même, quelle que soit la forme du récipient.",
          "La pression hydrostatique absolue inclut l’augmentation ρgh et la pression présente à la surface libre. Dans un récipient ouvert, cette pression initiale est généralement la pression atmosphérique.",
        ],
      },
      {
        title: "Pression statique, dynamique et totale",
        paragraphs: [
          "La pression statique décrit l’état thermodynamique local de l’écoulement. Dans les canalisations, réservoirs et conduits, la plupart des capteurs mesurent principalement cette grandeur.",
          "La pression dynamique exprime l’effet de la vitesse de l’écoulement et s’approche par q = 1/2 ρv². Elle intervient dans la relation de Bernoulli et dans des instruments comme le tube de Pitot : elle augmente lorsque la vitesse augmente.",
          "Dans un écoulement idéal, la pression totale est la somme des pressions statique et dynamique. Dans les systèmes réels, frottement, turbulence, compressibilité et pertes locales imposent une interprétation prudente. Cette distinction reste essentielle en ventilation, aérodynamique et contrôle de procédés.",
        ],
      },
      {
        title: "La hauteur de pression et la hauteur manométrique de pompe",
        paragraphs: [
          "La hauteur de pression exprime une pression comme une hauteur équivalente de colonne de fluide : h = P / (ρg). Une même pression correspond donc à une hauteur différente selon la densité du fluide.",
          "Dans les systèmes de pompage, on utilise souvent les mètres de colonne de fluide plutôt que les pascals ou les bars. Une pompe doit fournir l’énergie nécessaire pour la hauteur géométrique, les pertes de frottement et la vitesse du fluide ; la hauteur manométrique est donc un repère très pratique.",
          "La hauteur de pression ne doit pas être confondue avec la hauteur géométrique. Ignorer les pertes de charge, la vitesse ou les résistances locales peut fausser le choix d’une pompe et l’équilibrage d’un système.",
        ],
      },
      {
        title: "Pourquoi les unités de pression sont-elles différentes ?",
        paragraphs: [
          "La diversité des unités de pression vient de l’histoire et des usages sectoriels. Le SI emploie le pascal, mais l’industrie utilise largement le bar, la médecine le mmHg, la météorologie le millibar et l’automobile le psi.",
          "Certaines unités sont plus lisibles dans leur contexte : environ 35 psi pour un pneu ou 3,5 bar pour un procédé sont souvent plus parlants que 240 kPa ou 350 000 Pa. Le choix dépend aussi des instruments et des habitudes de terrain.",
          "Toutes ces unités expriment la même grandeur ; une conversion rigoureuse reste donc indispensable. Les erreurs courantes viennent de coefficients arrondis, d’une mauvaise lecture des symboles ou de la confusion entre pression relative et absolue.",
        ],
      },
      {
        title: "Comment mesure-t-on la pression ?",
        paragraphs: [
          "Pour mesurer la pression, il faut d’abord définir la référence nécessaire : absolue, relative ou différentielle. Il faut ensuite considérer la plage de mesure, le fluide, la température, la compatibilité chimique, les vibrations et la précision visée.",
          "Les transmetteurs différentiels à membrane conviennent aux faibles pressions et aux écarts de pression ; les capteurs à jauges de contrainte ou piézorésistifs aux hautes pressions de procédé ; les capteurs absolus aux applications sous vide. Les manomètres à colonne liquide restent utiles pour l’enseignement, tandis que l’industrie emploie surtout des appareils électroniques.",
          "La précision dépend aussi de l’installation : lignes d’impulsion, position du capteur, réglage du zéro et température. Dans une conduite, la condensation ou une différence de densité peut ajouter une charge hydrostatique sur le capteur.",
        ],
      },
      {
        title: "Capteurs de pression et manomètres",
        paragraphs: [
          "Les manomètres mécaniques, comme le tube de Bourdon, convertissent la pression en déplacement d’aiguille par déformation d’un élément élastique. Ils sont robustes et autonomes. Les capteurs électroniques sont toutefois plus adaptés lorsque précision, enregistrement ou automatisation sont nécessaires.",
          "Les capteurs électroniques peuvent être piézorésistifs, capacitifs, à jauges de contrainte ou résonants. Ils transforment la pression en signal électrique exploitable par des systèmes PLC, SCADA ou d’acquisition de données, pour la lecture, les alarmes et l’analyse des tendances.",
          "Un manomètre différentiel compare deux points, un capteur absolu se réfère au vide total et un appareil manométrique à l’atmosphère. Il faut toujours vérifier cette référence dans la fiche technique, au-delà de la simple valeur numérique.",
        ],
      },
      {
        title: "Domaines d’utilisation de la pression en ingénierie",
        paragraphs: [
          "La pression est une variable de conception essentielle dans les tuyauteries, le CVC, l’hydraulique, la pneumatique, les procédés chimiques, l’énergie, l’automobile et l’aéronautique. Épaisseur d’un réservoir, choix d’une vanne, sortie de compresseur ou performance d’un filtre : de nombreuses décisions en dépendent.",
          "En génie des procédés, les limites de pression assurent l’exploitation sûre des réacteurs, chaudières, échangeurs et séparateurs. Soupapes de sécurité, disques de rupture et boucles de contrôle sont donc critiques. La pression peut aussi servir à mesurer indirectement le débit ou le niveau.",
          "En génie mécanique, bâtiment, médecine et environnement, elle intervient respectivement dans les contraintes, la ventilation, la pression artérielle, le vide ou la météorologie.",
        ],
      },
      {
        title: "Température, altitude et incertitude dans la mesure de pression",
        paragraphs: [
          "La température influence les propriétés du fluide et le comportement du capteur. Pour les gaz, elle modifie notamment la densité ; les fiches techniques indiquent donc des paramètres tels que la dérive du zéro et du gain avec la température.",
          "La pression atmosphérique diminue avec l’altitude. Cela modifie le lien entre pression relative et absolue : une même condition de procédé peut donner une pression absolue différente selon l’altitude.",
          "Toute mesure comporte une incertitude. Étalonnage, résolution, hystérésis, température, orientation de montage, vibrations et dérive à long terme y contribuent. Les applications critiques doivent prendre en compte la classe de l’appareil autant que la valeur nominale.",
        ],
      },
      {
        title: "La relation et la différence entre pression et contrainte",
        paragraphs: [
          "La pression et la contrainte ont la même dimension et s’expriment toutes deux en pascals, car elles représentent une force par unité de surface. Elles ne décrivent cependant pas le même phénomène physique.",
          "La pression est une contrainte normale isotrope exercée par un fluide : au repos, elle a la même valeur dans toutes les directions en un point. La contrainte dans un solide peut au contraire comprendre des composantes normales et de cisaillement, varier selon la direction et avoir une structure tensorielle.",
          "Cette distinction compte pour les parois de réservoir, les joints et la résistance des matériaux. La pression interne d’un fluide crée des contraintes dans le réservoir, mais ces contraintes ne sont pas la pression elle-même.",
        ],
      },
      {
        title: "Erreurs fréquentes dans les calculs de pression",
        paragraphs: [
          "L’erreur la plus fréquente est de confondre pression relative et absolue. Les lois des gaz, les calculs de densité et les applications sous vide exigent souvent la pression absolue, alors que le manomètre affiche généralement une valeur relative.",
          "Les coefficients trop arrondis, le mauvais choix d’unité ou un nombre de décimales insuffisant causent aussi des erreurs entre psi, bar, atm, mmHg et kPa. Le niveau de précision doit correspondre à l’usage et à l’étalonnage de l’appareil.",
          "Enfin, effets hydrostatiques, hauteur de montage du capteur et température ne doivent pas être négligés. Dans les lignes remplies de liquide ou les applications différentielles, un détail d’installation apparemment mineur peut modifier fortement le résultat.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Calculs scientifiques et d’ingénierie" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1 000 Pa", system: "SI", commonUse: "Installations, pneus et pression de procédé" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Métrique, hors SI", commonUse: "Industrie, compresseurs et procédés" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Métrique, hors SI", commonUse: "Météorologie et mesures atmosphériques" },
      { name: "Atmosphère standard", symbol: "atm", referenceValue: "101 325 Pa", system: "Hors SI", commonUse: "Atmosphère et conditions de référence" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6 894,757293 Pa", system: "Britannique/américain", commonUse: "Pneus et systèmes hydrauliques ou pneumatiques" },
      { name: "Atmosphère technique", symbol: "at", referenceValue: "98 066,5 Pa", system: "Hors SI", commonUse: "Anciennes applications techniques" },
      { name: "Millimètre de mercure", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Hors SI", commonUse: "Médecine, vide et mesures de pression" },
      { name: "Millimètre de colonne d’eau", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Hors SI", commonUse: "Basse pression et ventilation" },
      { name: "Kilogramme-force par centimètre carré", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Métrique, hors SI", commonUse: "Anciens manomètres de pompes et chaudières" },
    ],
  },
  {
    locale: "fr",
    slug: "energie",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversion des unités d’énergie",
    description:
      "Comparez les conversions d’énergie fondées sur le joule, le kilowattheure, la calorie et le BTU.",
    introduction: [
      "L’énergie est la capacité d’un système à produire un travail. Dans le Système international d’unités, son unité dérivée est le joule, obtenu à partir du produit d’une force et d’un déplacement.",
      "Au quotidien, le kilowattheure (kWh) sert aux factures d’électricité, la calorie et la kilocalorie à la nutrition, le BTU au chauffage et à la climatisation, le therm au gaz naturel et l’électronvolt à la physique des particules.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Énergie (travail)" },
      { label: "Symbole dimensionnel", value: "[ML²T⁻²]" },
      { label: "Unité dérivée SI", value: "Joule" },
      { label: "Symbole de l’unité SI", value: "J" },
      { label: "Définition du joule", value: "1 J = travail d’une force de 1 newton sur 1 mètre (1 N·m)" },
    ],
    sections: [
      {
        title: "Qu’est-ce que l’énergie ?",
        paragraphs: [
          "L’énergie est la capacité d’un objet ou d’un système à produire un travail. Elle peut être cinétique, potentielle, thermique, chimique ou électrique. Selon le principe de conservation, elle se transforme d’une forme à l’autre sans être créée ni détruite.",
          "C’est une grandeur dérivée. Le travail correspond au produit d’une force et d’un déplacement, et la dimension SI de l’énergie est ML²T⁻².",
        ],
      },
      {
        title: "L’unité SI de l’énergie : le joule",
        paragraphs: [
          "Le joule est l’unité dérivée SI de l’énergie, symbolisée par J et nommée en l’honneur de James Prescott Joule. Il correspond au travail d’une force de un newton déplaçant un objet d’un mètre.",
          "Pour les quantités d’énergie courantes, le joule est souvent trop petit. Le kilojoule, soit mille joules, et le mégajoule, soit un million de joules, sont plus pratiques en ingénierie et au quotidien.",
        ],
      },
      {
        title: "Le kilowattheure : l’unité des factures d’électricité",
        paragraphs: [
          "Le kilowattheure (kWh) est l’énergie consommée par une puissance d’un kilowatt pendant une heure. C’est l’unité standard de facturation électrique ; 1 kWh équivaut exactement à 3 600 000 joules, soit 3,6 mégajoules.",
          "La consommation d’un appareil se calcule en multipliant sa puissance en kilowatts par sa durée d’utilisation en heures. Ainsi, un appareil de 2 000 W qui fonctionne trois heures consomme 6 kWh.",
        ],
      },
      {
        title: "La calorie et la kilocalorie : l’énergie en nutrition",
        paragraphs: [
          "La calorie a été définie à l’origine comme l’énergie nécessaire pour élever d’un degré Celsius la température d’un gramme d’eau. Une calorie thermochimique vaut exactement 4,184 joules.",
          "Sur les étiquettes alimentaires, le mot « calorie » désigne presque toujours une kilocalorie, soit 1 000 calories. Un aliment affiché à 200 calories apporte donc en réalité 200 kilocalories.",
        ],
      },
      {
        title: "Le BTU et le therm : l’énergie du chauffage et du gaz naturel",
        paragraphs: [
          "Le BTU (British Thermal Unit) désigne l’énergie nécessaire pour élever d’un degré Fahrenheit la température d’une livre d’eau. Cette unité d’origine américaine est largement utilisée pour la capacité des systèmes de chauffage et de climatisation. Un BTU vaut environ 1 055,06 joules.",
          "Le therm est une grande unité d’énergie employée pour facturer le gaz naturel. Il équivaut à 100 000 BTU et peut être utilisé à la place du mètre cube selon le pays.",
        ],
      },
      {
        title: "L’électronvolt : l’unité du monde subatomique",
        paragraphs: [
          "L’électronvolt (eV) est l’énergie acquise par un électron lorsqu’il traverse une différence de potentiel d’un volt. C’est une unité très petite : 1 eV vaut environ 1,602 176 634 × 10⁻¹⁹ joule.",
          "En physique atomique et des particules, les énergies s’expriment surtout en électronvolts et en multiples keV, MeV ou GeV. À cette échelle, le joule produirait des nombres trop petits pour être pratiques.",
        ],
      },
      {
        title: "Le principe de conservation de l’énergie",
        paragraphs: [
          "Selon le principe de conservation de l’énergie, ou premier principe de la thermodynamique, l’énergie totale d’un système fermé reste constante. Elle ne peut être ni créée ni détruite, seulement transformée.",
          "Dans le moteur d’une voiture, l’énergie chimique du carburant devient d’abord thermique, puis mécanique. Une partie est dissipée sous forme de chaleur par frottement et à l’échappement, mais la quantité totale d’énergie est conservée.",
        ],
      },
      {
        title: "Pourquoi la conversion entre unités d’énergie est-elle importante ?",
        paragraphs: [
          "Les secteurs utilisent traditionnellement des unités différentes : kWh en électricité, kilocalorie en nutrition, BTU en CVC et therm pour le gaz naturel. Savoir les convertir est essentiel pour comparer les coûts et l’efficacité énergétique.",
          "Par exemple, comparer une pompe à chaleur et une chaudière au gaz nécessite de ramener leur consommation à une unité commune, généralement le kWh ou le joule.",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Calculs scientifiques et physiques d’énergie" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1 000 J", system: "SI/métrique", commonUse: "Énergie alimentaire dans certains pays" },
      { name: "Mégajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/métrique", commonUse: "Carburant et grandes quantités d’énergie" },
      { name: "Calorie", symbol: "cal", referenceValue: "4,184 J", system: "Métrique traditionnel", commonUse: "Nutrition et chimie" },
      { name: "Kilocalorie", symbol: "kcal", referenceValue: "4 184 J", system: "Métrique traditionnel", commonUse: "Étiquettes alimentaires" },
      { name: "Wattheure", symbol: "Wh", referenceValue: "3 600 J", system: "Métrique (électricité)", commonUse: "Consommation des petits appareils" },
      { name: "Kilowattheure", symbol: "kWh", referenceValue: "3 600 000 J", system: "Métrique (électricité)", commonUse: "Facturation électrique" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1 055,06 J", system: "Britannique/américain", commonUse: "Chauffage et climatisation" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britannique/américain", commonUse: "Facturation du gaz naturel" },
      { name: "Électronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Physique atomique et des particules", commonUse: "Énergie atomique et nucléaire" },
    ],
  },
  {
    locale: "fr",
    slug: "stockage-de-donnees",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversion des unités de stockage de données",
    description:
      "Convertissez les octets, kilo-octets, mégaoctets, gigaoctets et téraoctets ; comparez les calculs fondés sur 1 000 et 1 024.",
    introduction: [
      "Une unité de stockage de données exprime la quantité d’information stockée ou traitée par un système informatique. Le bit est l’unité élémentaire ; huit bits forment un octet.",
      "Le stockage et les débits Internet utilisent des unités décimales, fondées sur 1 000, et binaires, fondées sur 1 024. La différence entre kilo-octet, mégaoctet, gigaoctet et leurs équivalents binaires explique pourquoi la capacité affichée d’un disque peut sembler inférieure à celle annoncée.",
    ],
    facts: [
      { label: "Plus petite unité", value: "Bit (0 ou 1)" },
      { label: "Unité de base", value: "Octet = 8 bits" },
      { label: "Système décimal (SI)", value: "1 Ko = 1 000 octets, 1 Mo = 1 000 Ko" },
      { label: "Système binaire (IEC)", value: "1 Kio = 1 024 octets, 1 Mio = 1 024 Kio" },
      { label: "Écart entre 1 000 et 1 024", value: "≈7,4 % entre 1 Go décimal et 1 Gio binaire" },
    ],
    sections: [
      {
        title: "Qu’est-ce qu’un bit et un octet ?",
        paragraphs: [
          "Le bit (binary digit) est la plus petite unité d’information traitable par un ordinateur ; il ne peut valoir que 0 ou 1. Huit bits forment un octet, qui peut représenter 256 valeurs différentes, assez pour encoder par exemple un caractère de texte.",
          "Le bit se note généralement b minuscule et l’octet o en français, ou B en anglais. Cette différence compte entre les débits Internet, comme Mbps, et les tailles de fichiers, comme Mo : une connexion de 100 Mbps atteint théoriquement environ 12,5 Mo/s, après division par huit.",
        ],
      },
      {
        title: "Pourquoi existe-t-il deux systèmes d’unités différents ?",
        paragraphs: [
          "Les ordinateurs fonctionnent en binaire : l’adressage mémoire est donc naturellement lié aux puissances de deux, comme 1 024 ou 1 048 576. C’est pourquoi le logiciel a longtemps employé « kilo-octet » pour 1 024 octets.",
          "Les fabricants de disques utilisent les préfixes décimaux, plus simples : un disque de 1 To contient exactement 1 000 000 000 000 octets. Si un système le divise en groupes de 1 024, la même capacité apparaît autour de 931 Gio, sans qu’aucun espace ne manque.",
        ],
      },
      {
        title: "La norme IEC : Kio, Mio et Gio",
        paragraphs: [
          "Pour résoudre cette ambiguïté, la Commission électrotechnique internationale a normalisé en 1998 les noms kibioctet, mébioctet, gibioctet et tébioctet, avec les symboles Kio, Mio, Gio et Tio, pour les unités binaires.",
          "La norme réserve Ko, Mo et Go au sens décimal, fondé sur 1 000, et emploie Kio, Mio et Gio pour la base 1 024. Dans l’usage courant et dans certains logiciels, cette distinction n’est toutefois pas toujours appliquée de manière cohérente.",
        ],
      },
      {
        title: "Pourquoi l’écart entre 1 000 et 1 024 s’accroît-il ?",
        paragraphs: [
          "L’écart entre 1 000 et 1 024 est de 2,4 % au niveau du kilo-octet, puis s’accumule : environ 4,9 % au mégaoctet, 7,4 % au gigaoctet et près de 10 % au téraoctet.",
          "Sur une grande capacité, comme un disque de 1 To, la différence entre les calculs décimal et binaire devient donc visible. Elle peut donner l’impression d’un espace manquant, alors que les deux affichages décrivent la même quantité d’octets.",
        ],
      },
      {
        title: "Les unités fondées sur le bit : kilobit, mégabit et gigabit",
        paragraphs: [
          "Les fournisseurs d’accès Internet expriment généralement le débit en bits par seconde : kilobits, mégabits ou gigabits par seconde. C’est l’usage historique des réseaux.",
          "Les fichiers sont quant à eux mesurés en octets. Une connexion de 100 Mbps permet donc au maximum un téléchargement d’environ 12,5 Mo/s avant prise en compte des surcharges du protocole ; ce n’est pas une connexion ralentie, mais un changement d’unité.",
        ],
      },
      {
        title: "Les tailles de données au quotidien",
        paragraphs: [
          "Un document texte d’une page représente souvent quelques kilo-octets, une photo JPEG quelques mégaoctets et un fichier MP3 environ 3 à 5 mégaoctets.",
          "Un film HD peut occuper environ 1 à 4 gigaoctets et un film 4K 15 à 25 gigaoctets, selon la résolution, la durée et la méthode de compression.",
        ],
      },
      {
        title: "L’histoire des unités de stockage de données",
        paragraphs: [
          "Le disque IBM RAMAC 305, introduit en 1956, offrait environ 3,75 mégaoctets et occupait l’espace d’une grande armoire. Aujourd’hui, une carte microSD tient dans la paume et peut contenir des millions de fois cette capacité.",
          "Cette progression vient des avancées du stockage, des disques magnétiques à la mémoire flash, et de la baisse continue du coût par unité de capacité.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 octet", system: "Binaire", commonUse: "Débit réseau (bps, Mbps)" },
      { name: "Octet", symbol: "o", referenceValue: "1 octet (8 bits)", system: "Unité de base", commonUse: "Taille des fichiers" },
      { name: "Kilo-octet", symbol: "Ko", referenceValue: "1 000 octets", system: "Décimal (SI)", commonUse: "Documents texte" },
      { name: "Kibioctet", symbol: "Kio", referenceValue: "1 024 octets", system: "Binaire (IEC)", commonUse: "Affichage mémoire du système" },
      { name: "Mégaoctet", symbol: "Mo", referenceValue: "1 000 000 octets", system: "Décimal (SI)", commonUse: "Photos et fichiers musicaux" },
      { name: "Mébioctet", symbol: "Mio", referenceValue: "1 048 576 octets", system: "Binaire (IEC)", commonUse: "Mémoire vive (RAM)" },
      { name: "Gigaoctet", symbol: "Go", referenceValue: "1 000 000 000 octets", system: "Décimal (SI)", commonUse: "Capacité de disque annoncée" },
      { name: "Gibioctet", symbol: "Gio", referenceValue: "1 073 741 824 octets", system: "Binaire (IEC)", commonUse: "Affichage de disque par le système" },
      { name: "Téraoctet", symbol: "To", referenceValue: "1 000 000 000 000 octets", system: "Décimal (SI)", commonUse: "Stockage de grand volume" },
      { name: "Pétaoctet", symbol: "Po", referenceValue: "1 000 000 000 000 000 octets", system: "Décimal (SI)", commonUse: "Centre de données et stockage en nuage" },
    ],
  },
  {
    locale: "fr",
    slug: "electricite",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversion des unités électriques",
    description:
      "Convertissez les grandeurs électriques de base entre volts, kilovolts, ampères et milliampères ; consultez les usages courants.",
    introduction: [
      "L’électricité réunit plusieurs grandeurs liées mais distinctes, comme la tension, ou différence de potentiel, et le courant, ou flux de charge. Cette catégorie traite les deux grandeurs les plus fréquentes : le volt pour la tension et l’ampère pour le courant.",
      "Tension et courant ne sont pas directement convertibles. Leur relation dépend de la résistance du circuit selon la loi d’Ohm, V = I × R. Les conversions de cette page restent donc dans une même grandeur, par exemple volt–kilovolt ou ampère–milliampère.",
    ],
    facts: [
      { label: "Unité de tension", value: "Volt, en l’honneur d’Alessandro Volta" },
      { label: "Unité de courant", value: "Ampère, en l’honneur d’André-Marie Ampère" },
      { label: "Unité de base SI du courant", value: "Ampère (A), l’une des sept unités de base" },
      { label: "Relation tension–courant–résistance", value: "Loi d’Ohm : V = I × R" },
      { label: "Tension secteur en France", value: "230 V monophasé, 400 V triphasé" },
    ],
    sections: [
      {
        title: "Qu’est-ce que la tension (volt) ?",
        paragraphs: [
          "La tension exprime la différence de potentiel électrique entre deux points d’un circuit. Elle fournit l’énergie par unité de charge qui peut mettre le courant en mouvement ; son unité est le volt (V).",
          "Le volt honore le physicien italien Alessandro Volta. Les indications 1,5 V ou 9 V sur une pile correspondent à la différence de potentiel qu’elle peut fournir.",
        ],
      },
      {
        title: "Qu’est-ce que le courant (ampère) ?",
        paragraphs: [
          "Le courant électrique exprime la quantité de charge qui traverse un conducteur par unité de temps. Son unité SI est l’ampère (A) ; un ampère correspond à un coulomb de charge par seconde.",
          "L’ampère est nommé en l’honneur d’André-Marie Ampère, pionnier de l’électromagnétisme. Il reste une unité de base du SI et est défini, depuis 2019, à partir de la valeur fixée de la charge élémentaire.",
        ],
      },
      {
        title: "Pourquoi la tension et le courant ne peuvent-ils pas être convertis l’un en l’autre ?",
        paragraphs: [
          "La tension et le courant sont deux grandeurs différentes : l’une exprime une différence de potentiel, l’autre un flux de charge. La question « combien d’ampères pour X volts ? » ne suffit donc pas sans connaître au moins la résistance ou la puissance du circuit.",
          "La loi d’Ohm les relie : V = I × R. Par exemple, 12 V appliqués à une résistance de 4 Ω produisent 3 A ; avec une autre résistance, les mêmes 12 V produisent un courant différent.",
        ],
      },
      {
        title: "La relation entre puissance, tension et courant",
        paragraphs: [
          "La puissance électrique en watts est égale au produit de la tension et du courant : P = V × I. À puissance égale, une tension plus élevée exige donc un courant plus faible.",
          "C’est pourquoi les réseaux de transport utilisent la haute tension : transporter une même puissance avec moins de courant réduit les pertes par effet Joule dans les lignes.",
        ],
      },
      {
        title: "La tension secteur en France et dans le monde",
        paragraphs: [
          "En France, le réseau résidentiel est généralement de 230 V en monophasé et les installations triphasées utilisent 400 V entre phases, à une fréquence de 50 Hz.",
          "La tension secteur varie selon les pays : les États-Unis et le Canada emploient couramment 120 V, alors que la plupart des pays européens utilisent 230 V. Un appareil importé peut donc nécessiter un transformateur ou ne pas être compatible ; vérifiez toujours sa plaque signalétique.",
        ],
      },
      {
        title: "Courant continu (DC) et courant alternatif (AC)",
        paragraphs: [
          "En courant continu (DC), la charge circule dans une direction ; les piles et les panneaux solaires en produisent. En courant alternatif (AC), le sens varie périodiquement : le réseau français fonctionne à 50 Hz.",
          "L’AC est pratique pour les réseaux car les transformateurs permettent d’élever ou d’abaisser facilement la tension, ce qui limite les pertes lors du transport sur longue distance.",
        ],
      },
      {
        title: "L’effet du courant électrique sur le corps humain",
        paragraphs: [
          "Le danger électrique dépend notamment du courant susceptible de traverser le corps, de son trajet, de sa durée, de la fréquence et des conditions de contact. Même un courant relativement faible peut devenir dangereux dans certaines situations.",
          "La tension n’est donc pas le seul facteur à considérer. L’humidité, l’état de la peau, l’isolement et le circuit influencent fortement le risque. Ne travaillez jamais sur une installation sous tension : en cas de doute, faites intervenir un professionnel qualifié.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/métrique", commonUse: "Capteurs et signaux bioélectriques" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Piles, réseau et circuits" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1 000 V", system: "SI/métrique", commonUse: "Lignes de transport haute tension" },
      { name: "Milliampère", symbol: "mA", referenceValue: "0,001 A", system: "SI/métrique", commonUse: "Courants de circuits électroniques" },
      { name: "Ampère", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Installations domestiques et appareils" },
      { name: "Kiloampère", symbol: "kA", referenceValue: "1 000 A", system: "SI/métrique", commonUse: "Courts-circuits et applications industrielles" },
    ],
  },
  {
    locale: "fr",
    slug: "carat-or",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversion des carats d’or",
    description:
      "Convertissez l’or 24, 22, 18 et 14 carats selon leur teneur en or pur ; découvrez la pureté et les usages de chaque titre.",
    introduction: [
      "L’or pur est très mou et se raye facilement ; pour la bijouterie, il est généralement allié à d’autres métaux, comme l’argent ou le cuivre. Le carat mesure la proportion d’or pur dans cet alliage.",
      "L’échelle est fondée sur 24 : l’or 24 carats est pratiquement pur, tandis que l’or 18 carats contient 18/24 d’or, soit environ 75 %. L’outil calcule l’équivalent en grammes d’un même alliage à un autre titre de pureté.",
    ],
    facts: [
      { label: "Système de mesure", value: "Standard de pureté en bijouterie" },
      { label: "Référence de base", value: "24 carats = or pratiquement pur" },
      { label: "Carat courant en Turquie", value: "22 carats, bracelets et bijouterie traditionnelle" },
      { label: "Usage quotidien international", value: "18 carats, bagues et colliers" },
      { label: "Logique de calcul", value: "Grammes × (carat source / 24) ÷ (carat cible / 24)" },
    ],
    sections: [
      {
        title: "Que mesure exactement le carat ?",
        paragraphs: [
          "Le carat indique quelle proportion de la masse d’une pièce est réellement constituée d’or. L’or 24 carats est pratiquement pur ; les titres 22, 18 et 14 carats contiennent davantage de métaux d’alliage et sont donc généralement plus résistants.",
          "Un bracelet de 22 carats contient légèrement moins d’or pur qu’un objet de 24 carats, mais il résiste mieux à l’usage. Les choix varient selon les traditions, le type de bijou et le niveau de résistance recherché.",
        ],
      },
      {
        title: "Comment calcule-t-on la teneur en or pur ?",
        paragraphs: [
          "Pour un bracelet de 10 g en 22 carats : 10 × (22 / 24) = 9,17 g d’or pur. Les 0,83 g restants correspondent aux métaux d’alliage ajoutés pour modifier la résistance ou la couleur.",
          "Si ces 9,17 g d’or pur sont transformés en alliage 18 carats, on obtient : 9,17 ÷ (18 / 24) = 12,22 g d’alliage. À titre inférieur, la même quantité d’or pur est répartie dans une masse totale plus élevée.",
        ],
      },
      {
        title: "À quoi sert chaque carat ?",
        paragraphs: [
          "En raison de sa souplesse, l’or 24 carats est surtout utilisé pour les lingots et certains produits d’investissement. Le 22 carats est courant dans la bijouterie traditionnelle en Turquie et au Moyen-Orient.",
          "L’or 18 carats est très répandu pour les bijoux du quotidien, notamment les bagues et colliers. L’or 14 carats, plus abordable et plus résistant, est fréquent sur les marchés américain et européen.",
        ],
      },
    ],
    unitTable: [
      { name: "Or 24 carats", symbol: "24K", referenceValue: "Or pratiquement pur", system: "Standard de bijouterie", commonUse: "Lingots et investissement" },
      { name: "Or 22 carats", symbol: "22K", referenceValue: "91,6 % d’or pur", system: "Standard de bijouterie", commonUse: "Bracelets et bijouterie traditionnelle" },
      { name: "Or 18 carats", symbol: "18K", referenceValue: "75 % d’or pur", system: "Standard de bijouterie", commonUse: "Bagues, colliers et bijoux quotidiens" },
      { name: "Or 14 carats", symbol: "14K", referenceValue: "58,3 % d’or pur", system: "Standard de bijouterie", commonUse: "Bijouterie abordable sur les marchés US et européens" },
    ],
  },
  {
    locale: "fr",
    slug: "carat-argent",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversion des titres d’argent",
    description:
      "Convertissez les titres 999, 925 (sterling), 900 et 800 en grammes d’argent pur ; découvrez le système des millièmes et ses usages en bijouterie.",
    introduction: [
      "Comme l’or, l’argent pur est tendre ; il est souvent allié à d’autres métaux, notamment au cuivre, pour fabriquer bijoux et objets. Le millième indique la proportion d’argent pur dans cet alliage.",
      "À la différence de l’or, dont le titre s’exprime sur une base de 24 carats, l’argent se mesure en millièmes. Le titre 999 correspond à un argent presque pur ; le 925 est le plus répandu et est connu sous le nom d’argent sterling.",
    ],
    facts: [
      { label: "Système de mesure", value: "Système des millièmes" },
      { label: "Référence principale", value: "999 = 99,9 % d’argent pur" },
      { label: "Titre de bijouterie le plus répandu", value: "925, argent sterling" },
      { label: "Argent d’investissement ou lingot", value: "Titre 999, argent fin" },
      { label: "Règle de calcul", value: "Grammes × (titre source / 1 000) ÷ (titre cible / 1 000)" },
    ],
    sections: [
      {
        title: "Que mesure vraiment le titre de l’argent (millième) ?",
        paragraphs: [
          "La pureté de l’argent s’exprime en millièmes, sur une base de 1 000. Un titre 999 signifie que l’alliage contient 999 parts pour mille, soit 99,9 %, d’argent pur.",
          "Le titre 925, ou argent sterling, contient 92,5 % d’argent pur. Les 7,5 % restants sont souvent du cuivre, qui améliore la résistance de l’argent pur, naturellement tendre.",
        ],
      },
      {
        title: "Pourquoi l’argent sterling (925) est-il la norme mondiale ?",
        paragraphs: [
          "Le standard sterling 925 remonte à l’Angleterre du XIIe siècle. Il est devenu une référence mondiale pour la bijouterie, l’orfèvrerie de table et de nombreux objets en argent.",
          "L’argent 999 se raye et se déforme plus facilement au quotidien. L’ajout de 7,5 % de cuivre donne au sterling une résistance suffisante tout en préservant largement son éclat et sa couleur.",
        ],
      },
      {
        title: "Différence entre les titres 999, 900 et 800",
        paragraphs: [
          "Le titre 999, ou argent fin, convient surtout aux lingots et produits d’investissement, où la pureté est le critère principal. Sa souplesse le rend moins adapté à la bijouterie quotidienne.",
          "Le titre 900 a été utilisé dans de nombreuses monnaies historiques. Le titre 800, courant notamment en Allemagne et en Autriche, contient moins d’argent que le sterling mais reste adapté à des objets durables.",
        ],
      },
      {
        title: "Comment calculer la quantité d’argent pur ?",
        paragraphs: [
          "Pour une bague de 10 g titrant 925 : 10 × (925 / 1 000) = 9,25 g d’argent pur. Les 0,75 g restants sont des métaux d’alliage, le plus souvent du cuivre.",
          "La même logique permet de passer d’un titre à l’autre. Une fois la masse d’argent pur connue, on la divise par le rapport de pureté du titre cible.",
        ],
      },
      {
        title: "Le lien entre le ternissement de l’argent et sa pureté",
        paragraphs: [
          "Le ternissement d’un bijou en argent provient surtout de réactions avec des composés soufrés présents dans l’air. La composition de l’alliage, l’environnement et l’entretien influencent tous ce phénomène ; un titre plus élevé peut ternir différemment.",
          "Certains fabricants proposent des alliages plus résistants au ternissement, par exemple avec du germanium. Un rangement sec et un entretien adapté contribuent également à préserver l’aspect de l’argent.",
        ],
      },
    ],
    unitTable: [
      { name: "Argent 999", symbol: "999", referenceValue: "99,9 % d’argent pur", system: "Standard de bijouterie", commonUse: "Lingots et investissement" },
      { name: "Argent 925", symbol: "925", referenceValue: "92,5 % d’argent pur, sterling", system: "Standard de bijouterie", commonUse: "Bijouterie et orfèvrerie de table" },
      { name: "Argent 900", symbol: "900", referenceValue: "90 % d’argent pur", system: "Standard de bijouterie", commonUse: "Pièces historiques" },
      { name: "Argent 800", symbol: "800", referenceValue: "80 % d’argent pur", system: "Standard de bijouterie européen", commonUse: "Bijouterie européenne" },
    ],
  },
];

export function findFrenchCategoryPage(slug: string) {
  return frenchCategoryPages.find((page) => page.slug === slug);
}

export function findFrenchCategoryPageByTurkishSlug(sourceSlug: string) {
  return frenchCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
