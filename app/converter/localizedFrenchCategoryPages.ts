// Pages de categorie francaises -- integrees au nouveau systeme i18n
// Fichier independant et nouveau (ne touche pas aux fichiers tr/en/de/ar/uz/bn existants).

export type LocalizedFrenchCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedFrenchCategorySection = {
  title: string;
  paragraphs: string[];
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
};

export const frenchCategoryPages: LocalizedFrenchCategoryPage[] = [
  {
    locale: "fr",
    slug: "longueur",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversion des unites de longueur",
    description:
      "Convertissez gratuitement et rapidement entre metres, kilometres, centimetres, miles et pieds ; consultez les formules et les tableaux.",
    introduction: [
      "La longueur est une grandeur physique fondamentale qui exprime la distance entre deux points. Elle est utilisee dans la construction, les voyages, le sport et de nombreux domaines scientifiques.",
      "Le metre est l'unite de base SI de la longueur, tandis que des unites comme le pied et le mile restent largement utilisees aux Etats-Unis et au Royaume-Uni.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Longueur" },
      { label: "Unite SI", value: "Metre" },
      { label: "Symbole SI", value: "m" },
      { label: "Usage courant", value: "Distance, mesure, construction" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la longueur ?",
        paragraphs: [
          "La longueur mesure la distance entre deux points. Elle est utilisee partout, de la taille d'une piece aux distances geographiques.",
          "Depuis 1983, le metre est defini avec precision a partir de la distance parcourue par la lumiere dans le vide en un temps donne.",
        ],
      },
      {
        title: "Metre, kilometre et pied",
        paragraphs: [
          "Le metre est l'unite SI de base. Un kilometre vaut 1000 metres, et un centimetre represente un centieme de metre.",
          "Aux Etats-Unis et au Royaume-Uni, le pied et le mile restent largement utilises pour la construction et les distances routieres.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "surface",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversion des unites de surface",
    description:
      "Convertissez les surfaces entre metres carres, hectares et pieds carres ; pour les calculs de terrain, de batiment et de construction.",
    introduction: [
      "La surface exprime la mesure bidimensionnelle d'une etendue. Elle est utilisee pour les terrains, les logements et les projets de construction.",
      "Le metre carre est l'unite SI de surface, tandis que l'hectare est une unite plus grande utilisee en agriculture et en gestion fonciere.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Surface" },
      { label: "Unite SI", value: "Metre carre" },
      { label: "Symbole SI", value: "m²" },
      { label: "Usage courant", value: "Terrain, batiment, planification" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la surface ?",
        paragraphs: [
          "La surface mesure l'etendue d'un plan ou d'une projection plane.",
          "Elle intervient dans de nombreuses formules techniques, comme la pression, qui est une force appliquee sur une surface.",
        ],
      },
      {
        title: "Metre carre, hectare et pied carre",
        paragraphs: [
          "Le metre carre est l'unite metrique centrale de surface. L'hectare convient aux grands terrains, tandis que le pied carre est surtout utilise dans la construction et l'immobilier des pays anglophones.",
          "Lors d'un changement d'unite de longueur, le facteur de surface doit etre eleve au carre, car la surface resulte du produit longueur x longueur.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversion des unites de volume",
    description:
      "Convertissez les volumes entre litres, millilitres et metres cubes ; comparez les unites courantes pour les liquides et les recipients.",
    introduction: [
      "Le volume designe l'espace tridimensionnel occupe par une matiere ou un objet.",
      "Le metre cube est l'unite de reference SI, mais le litre et le millilitre sont plus utilises dans la vie quotidienne, en laboratoire et en logistique.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Volume" },
      { label: "Unite SI", value: "Metre cube" },
      { label: "Unite courante", value: "Litre" },
      { label: "Usage courant", value: "Mesure de liquides, cuisine, industrie" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le volume ?",
        paragraphs: [
          "Le volume est la mesure de l'espace ou de la contenance.",
          "Il est utilise pour les reservoirs, les pieces, les bouteilles, les canalisations et les calculs de quantite de matiere.",
        ],
      },
      {
        title: "Litre, millilitre et metre cube",
        paragraphs: [
          "Le metre cube est l'unite SI. Un litre equivaut a 0,001 metre cube, et un millilitre represente un millieme de litre.",
          "Ces relations decimales rendent les conversions de volume metrique particulierement simples.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversion des unites de masse",
    description:
      "Convertissez rapidement et gratuitement entre kilogrammes, grammes, milligrammes, tonnes et livres.",
    introduction: [
      "La masse indique la quantite de matiere contenue dans un objet ; c'est une grandeur physique fondamentale.",
      "Le kilogramme est l'unite SI de base de la masse, tandis que la livre et l'once restent d'usage courant aux Etats-Unis et au Royaume-Uni.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Masse" },
      { label: "Unite SI", value: "Kilogramme" },
      { label: "Symbole SI", value: "kg" },
      { label: "Usage courant", value: "Poids, expedition, cuisine" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la masse ?",
        paragraphs: [
          "La masse indique l'inertie d'un objet et la quantite de matiere qu'il contient.",
          "Elle differe du poids, car le poids depend de la gravite, alors que la masse est une grandeur constante.",
        ],
      },
      {
        title: "Kilogramme, gramme et livre",
        paragraphs: [
          "Le kilogramme est l'unite SI de base, tandis que le gramme est utilise pour les petites quantites.",
          "La livre et l'once sont couramment utilisees aux Etats-Unis et au Royaume-Uni dans la vie quotidienne et le commerce.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "temperature",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversion des unites de temperature",
    description:
      "Convertissez les temperatures entre Celsius, Fahrenheit et Kelvin ; consultez les formules et des valeurs d'exemple.",
    introduction: [
      "La temperature indique l'etat thermique d'un objet, c'est-a-dire son degre de chaleur ou de froid.",
      "Le kelvin est l'unite SI de base de la temperature, mais le Celsius et le Fahrenheit sont plus utilises au quotidien.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Temperature" },
      { label: "Unite SI", value: "Kelvin" },
      { label: "Symbole SI", value: "K" },
      { label: "Usage courant", value: "Meteo, cuisine, sciences" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la temperature ?",
        paragraphs: [
          "La temperature indique l'energie cinetique moyenne des particules d'un objet.",
          "Les echelles Celsius, Fahrenheit et Kelvin utilisent des points de reference differents, donc leur conversion n'est pas une simple multiplication.",
        ],
      },
      {
        title: "Celsius, Fahrenheit et Kelvin",
        paragraphs: [
          "Sur l'echelle Celsius, l'eau gele a 0 degre et bout a 100 degres.",
          "Le Fahrenheit est utilise aux Etats-Unis, tandis que le Kelvin est employe en recherche scientifique car il ne comporte pas de valeurs negatives.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "temps",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversion des unites de temps",
    description:
      "Utilisez sur une seule page les conversions de temps essentielles entre secondes, minutes et heures.",
    introduction: [
      "Le temps est une grandeur physique fondamentale qui mesure l'ordre des evenements et leur duree.",
      "La seconde est l'unite SI de base du temps, tandis que la minute et l'heure sont les plus utilisees au quotidien.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Temps" },
      { label: "Unite SI", value: "Seconde" },
      { label: "Symbole SI", value: "s" },
      { label: "Usage courant", value: "Emplois du temps, sciences, sport" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le temps ?",
        paragraphs: [
          "Le temps mesure l'ordre des evenements et l'intervalle qui les separe.",
          "La seconde est aujourd'hui definie avec une extreme precision a partir des vibrations d'un atome de cesium.",
        ],
      },
      {
        title: "Seconde, minute et heure",
        paragraphs: [
          "Une minute vaut 60 secondes, et une heure vaut 60 minutes.",
          "Ce systeme base sur 60 provient de la numeration babylonienne antique et reste utilise dans le monde entier.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "vitesse",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversion des unites de vitesse",
    description:
      "Convertissez la vitesse entre km/h, m/s et mph ; consultez des exemples d'ingenierie et d'usage quotidien.",
    introduction: [
      "La vitesse designe la rapidite avec laquelle un objet change de position.",
      "Le metre par seconde est l'unite SI, mais le kilometre par heure et le mile par heure sont plus courants dans le transport routier.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Vitesse" },
      { label: "Unite SI", value: "Metre par seconde" },
      { label: "Symbole SI", value: "m/s" },
      { label: "Usage courant", value: "Vitesse des vehicules, sport, meteo" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la vitesse ?",
        paragraphs: [
          "La vitesse est le taux auquel un objet parcourt une distance dans un temps donne.",
          "C'est une notion fondamentale en physique, en transport et en meteorologie.",
        ],
      },
      {
        title: "Km/h, m/s et mph",
        paragraphs: [
          "Le kilometre par heure est l'unite standard du transport routier dans la plupart des pays.",
          "Le mile par heure est utilise aux Etats-Unis et au Royaume-Uni, tandis que le metre par seconde sert aux calculs scientifiques.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "pression",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversion des unites de pression",
    description:
      "Convertissez la pression entre pascal, kilopascal, bar et PSI ; consultez les formules et les usages en ingenierie.",
    introduction: [
      "La pression est la quantite de force appliquee perpendiculairement a une surface, rapportee a cette surface.",
      "Le pascal est l'unite SI de pression, mais le bar et le PSI sont plus utilises en meteorologie, pour les pneus et dans l'industrie.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Pression" },
      { label: "Unite SI", value: "Pascal" },
      { label: "Symbole SI", value: "Pa" },
      { label: "Usage courant", value: "Pression des pneus, meteo, industrie" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la pression ?",
        paragraphs: [
          "La pression est le rapport entre une force et la surface sur laquelle elle s'applique.",
          "Elle est largement utilisee en mecanique des fluides, en meteorologie et en ingenierie.",
        ],
      },
      {
        title: "Pascal, bar et PSI",
        paragraphs: [
          "Le pascal est une unite tres petite, c'est pourquoi le kilopascal et le bar sont plus utilises en pratique.",
          "Le PSI (livre-force par pouce carre) est courant aux Etats-Unis pour la pression des pneus et les specifications industrielles.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "energie",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversion des unites d'energie",
    description:
      "Comparez sur une seule categorie les conversions d'energie basees sur le joule, le kilowattheure, la calorie et le BTU.",
    introduction: [
      "L'energie est la capacite a produire un travail ; c'est une grandeur fondamentale de la physique.",
      "Le joule est l'unite SI de l'energie, mais le kilowattheure est plus utilise sur les factures d'electricite et la calorie pour l'alimentation.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Energie" },
      { label: "Unite SI", value: "Joule" },
      { label: "Symbole SI", value: "J" },
      { label: "Usage courant", value: "Facture d'electricite, alimentation, chaleur" },
    ],
    sections: [
      {
        title: "Qu'est-ce que l'energie ?",
        paragraphs: [
          "L'energie est la capacite a produire un travail et peut exister sous plusieurs formes, comme la chaleur, la lumiere ou l'energie cinetique.",
          "Selon le principe de conservation de l'energie, elle ne peut etre ni creee ni detruite, seulement transformee.",
        ],
      },
      {
        title: "Joule, kilowattheure et calorie",
        paragraphs: [
          "Le joule est l'unite SI, tandis que le kilowattheure mesure la consommation d'electricite.",
          "La calorie et la kilocalorie servent a exprimer la valeur energetique des aliments.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "stockage-de-donnees",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversion des unites de stockage de donnees",
    description:
      "Convertissez entre octets, kilooctets, megaoctets, gigaoctets et teraoctets ; comparez les calculs bases sur 1000 et 1024.",
    introduction: [
      "Les unites de stockage de donnees expriment la quantite d'information numerique qu'un support peut contenir.",
      "L'octet est l'unite de base, tandis que le kilooctet, le megaoctet, le gigaoctet et le teraoctet sont utilises dans les appareils de stockage modernes.",
    ],
    facts: [
      { label: "Grandeur", value: "Capacite de stockage numerique" },
      { label: "Unite de base", value: "Octet" },
      { label: "Symbole", value: "o" },
      { label: "Unite liee", value: "Bit" },
    ],
    sections: [
      {
        title: "Que representent les unites de stockage de donnees ?",
        paragraphs: [
          "Elles mesurent la quantite de donnees numeriques contenue dans un fichier ou un support de stockage.",
          "C'est un fondement de l'informatique, des reseaux et de toute l'infrastructure numerique.",
        ],
      },
      {
        title: "Octet, kilooctet, megaoctet et gigaoctet",
        paragraphs: [
          "Un octet vaut 8 bits et constitue l'unite de base pour representer les caracteres et les donnees.",
          "Les unites plus grandes sont traditionnellement definies en base decimale (1000) ou binaire (1024), ce qui cree parfois une confusion.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "electricite",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversion des unites electriques",
    description:
      "Convertissez les grandeurs electriques de base entre volt, kilovolt, ampere et milliampere ; consultez des valeurs d'exemple.",
    introduction: [
      "Les unites electriques expriment le courant, la difference de potentiel et la puissance.",
      "Le volt et l'ampere sont les deux unites les plus fondamentales du genie electrique.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Potentiel et courant electriques" },
      { label: "Unites SI", value: "Volt, ampere" },
      { label: "Symboles SI", value: "V, A" },
      { label: "Usage courant", value: "Electronique, electricite domestique" },
    ],
    sections: [
      {
        title: "Que sont le volt et l'ampere ?",
        paragraphs: [
          "Le volt est l'unite de difference de potentiel electrique, tandis que l'ampere est l'unite de courant electrique.",
          "Ces deux unites constituent ensemble la base de l'analyse de tout circuit electrique.",
        ],
      },
      {
        title: "Kilovolt et milliampere",
        paragraphs: [
          "Le kilovolt est utilise dans les grands reseaux de transport d'electricite necessitant un potentiel eleve.",
          "Le milliampere sert a mesurer de petits courants en electronique et dans les capteurs.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "carat-or",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversion des carats d'or",
    description:
      "Convertissez entre l'or 24, 22, 18 et 14 carats selon la quantite d'or pur ; decouvrez la purete et les usages de chaque carat.",
    introduction: [
      "Le systeme des carats exprime le degre de purete de l'or dans un alliage, 24 carats correspondant a l'or pur.",
      "Un or de carat inferieur contient une plus grande proportion d'autres metaux, ce qui augmente sa durete et reduit son prix.",
    ],
    facts: [
      { label: "Grandeur", value: "Purete de l'or" },
      { label: "Systeme", value: "Carat" },
      { label: "Symbole", value: "K" },
      { label: "Purete maximale", value: "24 carats (99,9 %)" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le systeme des carats ?",
        paragraphs: [
          "Le systeme des carats indique la proportion d'or pur sur 24 parts.",
          "24 carats correspond a l'or pur, tandis qu'un or de carat inferieur est melange a d'autres metaux comme le cuivre ou l'argent.",
        ],
      },
      {
        title: "24, 22, 18 et 14 carats",
        paragraphs: [
          "L'or 24 carats est le plus pur mais aussi le plus tendre, il est donc surtout utilise sous forme de lingots.",
          "En Asie du Sud, l'or 22 carats est plus populaire pour la bijouterie traditionnelle, car il equilibre purete et durete.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "debit",
    sourceSlug: "debi",
    category: "debi",
    title: "Conversion des unites de debit",
    description:
      "Convertissez le debit entre metres cubes par heure et litres par minute ; visualisez rapidement les quantites d'ecoulement.",
    introduction: [
      "Le debit exprime la quantite de liquide ou de gaz qui traverse une conduite ou un canal dans un temps donne.",
      "Le metre cube par heure et le litre par minute sont largement utilises comme unites pratiques de debit.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Debit" },
      { label: "Unite pratique", value: "Metre cube par heure" },
      { label: "Autre unite", value: "Litre par minute" },
      { label: "Usage", value: "Distribution d'eau, canalisations, industrie" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le debit ?",
        paragraphs: [
          "Le debit exprime le volume de liquide ou de gaz qui traverse une conduite ou un canal dans un temps donne.",
          "Il joue un role important dans la conception des systemes de pompage et de ventilation.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "densite",
    sourceSlug: "yogunluk",
    category: "yogunluk",
    title: "Conversion des unites de densite",
    description:
      "Convertissez la densite entre kilogrammes par metre cube et grammes par centimetre cube ; pour l'eau et d'autres materiaux.",
    introduction: [
      "La densite exprime le rapport entre la masse et le volume d'une matiere ; c'est une propriete importante des materiaux.",
      "Le kilogramme par metre cube est l'unite SI, tandis que le gramme par centimetre cube est une unite pratique pour les echantillons de laboratoire.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Densite" },
      { label: "Unite SI", value: "Kilogramme par metre cube" },
      { label: "Symbole SI", value: "kg/m³" },
      { label: "Usage", value: "Science des materiaux, ingenierie" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la densite ?",
        paragraphs: [
          "La densite exprime la quantite de masse contenue dans un volume donne de matiere.",
          "A 4 °C, la densite de l'eau est de 1000 kg/m³ (soit 1 g/cm³), une valeur de reference tres utilisee.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "force",
    sourceSlug: "kuvvet",
    category: "kuvvet",
    title: "Conversion des unites de force",
    description:
      "Convertissez la force entre newtons et kilogrammes-force ; consultez les formules et applications en ingenierie.",
    introduction: [
      "La force exprime une influence capable de modifier le mouvement ou la forme d'un objet.",
      "Le newton est l'unite SI de base, tandis que le kilogramme-force apparait encore dans d'anciens documents techniques.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Force" },
      { label: "Unite SI", value: "Newton" },
      { label: "Symbole SI", value: "N" },
      { label: "Usage", value: "Physique, ingenierie" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la force ?",
        paragraphs: [
          "Selon la deuxieme loi de Newton, la force est le produit de la masse par l'acceleration.",
          "C'est un concept fondamental en statique, en dynamique et dans presque tous les calculs d'ingenierie.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "couple",
    sourceSlug: "tork",
    category: "tork",
    title: "Conversion des unites de couple",
    description:
      "Convertissez le couple entre newton-metre et livre-pied ; consultez des exemples de couple moteur et de serrage de boulon.",
    introduction: [
      "Le couple exprime l'effet d'une force qui fait tourner un objet autour d'un axe.",
      "Le newton-metre est l'unite SI de base, tandis que le livre-pied est utilise dans le systeme anglo-americain.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Couple" },
      { label: "Unite SI", value: "Newton-metre" },
      { label: "Symbole SI", value: "N·m" },
      { label: "Usage", value: "Technique automobile, assemblage boulonne" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le couple ?",
        paragraphs: [
          "Le couple est le produit d'une force par la distance perpendiculaire a l'axe de rotation.",
          "Il joue un role essentiel dans la puissance des moteurs et le serrage correct des boulons.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "angle",
    sourceSlug: "aci",
    category: "aci",
    title: "Conversion des unites d'angle",
    description:
      "Convertissez l'angle entre degres, radians et grades ; consultez des exemples de trigonometrie et de navigation.",
    introduction: [
      "L'angle exprime la rotation entre deux lignes ou deux plans.",
      "Le radian est l'unite SI, mais le degre est plus utilise dans la vie quotidienne.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Angle plan" },
      { label: "Unite SI", value: "Radian" },
      { label: "Unite courante", value: "Degre" },
      { label: "Usage", value: "Geometrie, navigation" },
    ],
    sections: [
      {
        title: "Qu'est-ce qu'un angle ?",
        paragraphs: [
          "L'angle mesure la rotation entre deux rayons partant d'un point commun.",
          "Un cercle complet vaut 360 degres, soit 2π radians.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "frequence",
    sourceSlug: "frekans",
    category: "frekans",
    title: "Conversion des unites de frequence",
    description:
      "Convertissez la frequence entre hertz, kilohertz, megahertz et gigahertz ; consultez des exemples en electronique et en radio.",
    introduction: [
      "La frequence exprime le nombre de vibrations repetees en une seconde.",
      "Le hertz est l'unite SI de base ; pour les frequences plus elevees, on utilise le kilohertz, le megahertz et le gigahertz.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Frequence" },
      { label: "Unite SI", value: "Hertz" },
      { label: "Symbole SI", value: "Hz" },
      { label: "Usage", value: "Electronique, radio, processeurs" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la frequence ?",
        paragraphs: [
          "La frequence exprime le nombre de repetitions d'un phenomene periodique en une seconde.",
          "Les frequences radio se situent dans la plage kilohertz-megahertz, tandis que la vitesse des processeurs se mesure en gigahertz.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "debit-volumique",
    sourceSlug: "debi_hacimsel",
    category: "debi_hacimsel",
    title: "Conversion des unites de debit volumique",
    description:
      "Convertissez le debit volumique entre metres cubes par seconde, CFM et GPM ; exemples de ventilation et de pompage.",
    introduction: [
      "Le debit volumique exprime le volume de liquide ou de gaz traversant une section dans un temps donne.",
      "Le metre cube par seconde est l'unite SI, tandis que le CFM et le GPM sont largement utilises dans l'industrie americaine.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Debit volumique" },
      { label: "Unite SI", value: "Metre cube par seconde" },
      { label: "Symbole SI", value: "m³/s" },
      { label: "Usage", value: "Ventilation, systemes de pompage" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le debit volumique ?",
        paragraphs: [
          "Le debit volumique mesure le volume qui traverse une conduite ou un canal au fil du temps.",
          "Le CFM et le GPM sont des unites standard dans les technologies de ventilation et de pompage americaines.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "debit-massique",
    sourceSlug: "debi_kutlesel",
    category: "debi_kutlesel",
    title: "Conversion des unites de debit massique",
    description:
      "Convertissez le debit massique entre kilogrammes par seconde et kilogrammes par heure ; exemples de procedes industriels.",
    introduction: [
      "Le debit massique exprime la masse traversant un procede pendant un temps donne.",
      "Le kilogramme par seconde est l'unite SI, tandis que le kilogramme par heure est plus utilise en production.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Debit massique" },
      { label: "Unite SI", value: "Kilogramme par seconde" },
      { label: "Symbole SI", value: "kg/s" },
      { label: "Usage", value: "Genie chimique, production" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le debit massique ?",
        paragraphs: [
          "Le debit massique exprime la masse traversant un procede au fil du temps.",
          "Il joue un role important dans les bilans matiere.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "champ-magnetique",
    sourceSlug: "manyetik_alan",
    category: "manyetik_alan",
    title: "Conversion des unites de champ magnetique",
    description:
      "Convertissez l'intensite du champ magnetique entre ampere par metre et oersted ; pour les calculs electromagnetiques.",
    introduction: [
      "L'intensite du champ magnetique exprime la force du champ magnetique en un point donne.",
      "L'ampere par metre est l'unite SI, tandis que l'oersted provient de l'ancien systeme CGS.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Intensite du champ magnetique" },
      { label: "Unite SI", value: "Ampere par metre" },
      { label: "Symbole SI", value: "A/m" },
      { label: "Usage", value: "Genie electrique, moteurs" },
    ],
    sections: [
      {
        title: "Qu'est-ce que l'intensite du champ magnetique ?",
        paragraphs: [
          "Elle exprime l'intensite de l'effet magnetique en un endroit donne.",
          "Elle joue un role important dans la conception des moteurs electriques et des transformateurs.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "flux-magnetique",
    sourceSlug: "manyetik_aki",
    category: "manyetik_aki",
    title: "Conversion des unites de flux magnetique",
    description:
      "Convertissez le flux magnetique entre weber et milliweber ; pour les calculs de transformateurs.",
    introduction: [
      "Le flux magnetique exprime la quantite de champ magnetique traversant une surface donnee.",
      "Le weber est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Flux magnetique" },
      { label: "Unite SI", value: "Weber" },
      { label: "Symbole SI", value: "Wb" },
      { label: "Usage", value: "Transformateurs, induction electromagnetique" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le flux magnetique ?",
        paragraphs: [
          "Le flux magnetique exprime le nombre de lignes de champ magnetique traversant une surface donnee.",
          "C'est une notion essentielle pour comprendre les transformateurs et les generateurs.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "viscosite-cinematique",
    sourceSlug: "viskozite_kinematik",
    category: "viskozite_kinematik",
    title: "Conversion des unites de viscosite cinematique",
    description:
      "Convertissez la viscosite cinematique entre metre carre par seconde et centistokes ; pour la classification des huiles moteur.",
    introduction: [
      "La viscosite cinematique exprime la resistance a l'ecoulement d'un fluide rapportee a sa densite.",
      "Le metre carre par seconde est l'unite SI, tandis que le centistokes est plus utilise dans l'industrie.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Viscosite cinematique" },
      { label: "Unite SI", value: "Metre carre par seconde" },
      { label: "Symbole SI", value: "m²/s" },
      { label: "Usage", value: "Huile moteur, classification des fluides" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la viscosite cinematique ?",
        paragraphs: [
          "La viscosite cinematique s'obtient en divisant la viscosite dynamique d'un fluide par sa densite.",
          "Le centistokes est la norme industrielle pour la classification des huiles moteur.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "conductivite-thermique",
    sourceSlug: "isil_iletkenlik",
    category: "isil_iletkenlik",
    title: "Conversion des unites de conductivite thermique",
    description:
      "Convertissez la conductivite thermique entre watt par metre-kelvin et BTU par heure-pied-°F ; pour le choix des isolants.",
    introduction: [
      "La conductivite thermique exprime la capacite d'un materiau a conduire la chaleur.",
      "Le watt par metre-kelvin est l'unite SI, tandis que le BTU par heure-pied-°F est utilise aux Etats-Unis.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Conductivite thermique" },
      { label: "Unite SI", value: "Watt par metre-kelvin" },
      { label: "Symbole SI", value: "W/(m·K)" },
      { label: "Usage", value: "Construction, materiaux isolants" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la conductivite thermique ?",
        paragraphs: [
          "Cette valeur exprime l'efficacite avec laquelle la chaleur traverse un materiau.",
          "Elle joue un role important dans l'evaluation de l'efficacite energetique des batiments.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "flux-thermique",
    sourceSlug: "isi_akisi",
    category: "isi_akisi",
    title: "Conversion des unites de flux thermique",
    description:
      "Convertissez la densite de flux thermique entre watt par metre carre et kilowatt par metre carre ; pour le transfert de chaleur surfacique.",
    introduction: [
      "La densite de flux thermique exprime la puissance thermique transferee par unite de surface.",
      "Le watt par metre carre est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Densite de flux thermique" },
      { label: "Unite SI", value: "Watt par metre carre" },
      { label: "Symbole SI", value: "W/m²" },
      { label: "Usage", value: "Physique du batiment, panneaux solaires" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la densite de flux thermique ?",
        paragraphs: [
          "Cette valeur exprime la puissance thermique transferee a travers une surface donnee.",
          "Elle joue un role important dans l'evaluation de l'efficacite energetique des batiments.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "chaleur-specifique",
    sourceSlug: "ozgul_isi",
    category: "ozgul_isi",
    title: "Conversion des unites de chaleur specifique",
    description:
      "Convertissez la chaleur specifique entre joule par kilogramme-kelvin et calorie par gramme-kelvin ; pour les calculs de chauffe des materiaux.",
    introduction: [
      "La chaleur specifique exprime l'energie necessaire pour elever d'un kelvin la temperature d'un kilogramme de matiere.",
      "Le joule par kilogramme-kelvin est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Chaleur specifique" },
      { label: "Unite SI", value: "Joule par kilogramme-kelvin" },
      { label: "Symbole SI", value: "J/(kg·K)" },
      { label: "Usage", value: "Science des materiaux, thermodynamique" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la chaleur specifique ?",
        paragraphs: [
          "Cette valeur exprime la capacite d'un materiau a emmagasiner de la chaleur.",
          "Elle est importante pour la conception des systemes de stockage thermique et de refroidissement.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "acceleration",
    sourceSlug: "ivme",
    category: "ivme",
    title: "Conversion des unites d'acceleration",
    description:
      "Convertissez l'acceleration entre metre par seconde carree et l'acceleration de la pesanteur (g) ; pour les vehicules et la physique.",
    introduction: [
      "L'acceleration exprime la variation de la vitesse d'un objet au fil du temps.",
      "Le metre par seconde carree est l'unite SI, tandis que l'acceleration de la pesanteur (g) est une valeur de reference pratique.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Acceleration" },
      { label: "Unite SI", value: "Metre par seconde carree" },
      { label: "Symbole SI", value: "m/s²" },
      { label: "Usage", value: "Technique automobile, physique" },
    ],
    sections: [
      {
        title: "Qu'est-ce que l'acceleration ?",
        paragraphs: [
          "L'acceleration exprime comment la vitesse d'un objet varie au cours du temps.",
          "L'acceleration de la pesanteur (9,80665 m/s²) est une valeur de reference tres utilisee.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "vitesse-angulaire",
    sourceSlug: "acisal_hiz",
    category: "acisal_hiz",
    title: "Conversion des unites de vitesse angulaire",
    description:
      "Convertissez la vitesse angulaire entre tr/min, radian par seconde et degre par seconde ; exemples de vitesse moteur.",
    introduction: [
      "La vitesse angulaire exprime la rapidite avec laquelle un objet tourne autour d'un axe.",
      "Le radian par seconde est l'unite SI, tandis que le tour par minute est plus utilise au quotidien.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Vitesse angulaire" },
      { label: "Unite SI", value: "Radian par seconde" },
      { label: "Symbole SI", value: "rad/s" },
      { label: "Usage", value: "Moteurs, machines rotatives" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la vitesse angulaire ?",
        paragraphs: [
          "La vitesse angulaire exprime la variation de l'angle d'un objet en rotation au cours du temps.",
          "Le tour par minute est l'unite la plus utilisee pour exprimer la vitesse de rotation des moteurs et des disques.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "puissance",
    sourceSlug: "guc",
    category: "guc",
    title: "Conversion des unites de puissance",
    description:
      "Convertissez la puissance entre watt, kilowatt, megawatt et cheval-vapeur ; pour les calculs de moteurs et de generateurs.",
    introduction: [
      "La puissance exprime le travail effectue ou l'energie transferee par unite de temps.",
      "Le watt est l'unite SI de base, tandis que le cheval-vapeur est aussi utilise en technique automobile.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Puissance" },
      { label: "Unite SI", value: "Watt" },
      { label: "Symbole SI", value: "W" },
      { label: "Usage", value: "Moteurs, appareils electriques" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la puissance ?",
        paragraphs: [
          "La puissance exprime la quantite de travail effectue ou d'energie transferee par unite de temps.",
          "Dans l'industrie automobile europeenne, le cheval-vapeur est utilise aux cotes du kilowatt.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "quantite-de-mouvement",
    sourceSlug: "momentum",
    category: "momentum",
    title: "Conversion des unites de quantite de mouvement",
    description:
      "Convertissez la quantite de mouvement entre kilogramme-metre par seconde et newton-seconde ; pour les calculs de collision.",
    introduction: [
      "La quantite de mouvement est le produit de la masse et de la vitesse d'un objet ; elle exprime la quantite de mouvement.",
      "Le kilogramme-metre par seconde est l'unite SI, le newton-seconde en etant l'equivalent.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Quantite de mouvement" },
      { label: "Unite SI", value: "Kilogramme-metre par seconde" },
      { label: "Symbole SI", value: "kg·m/s" },
      { label: "Usage", value: "Calculs de collision et d'impact" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la quantite de mouvement ?",
        paragraphs: [
          "La quantite de mouvement est une notion fondamentale de la mecanique classique exprimant la quantite de mouvement d'un objet.",
          "La loi de conservation de la quantite de mouvement est la base de l'analyse des collisions et des impacts.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "viscosite-dynamique",
    sourceSlug: "viskozite_dinamik",
    category: "viskozite_dinamik",
    title: "Conversion des unites de viscosite",
    description:
      "Convertissez la viscosite dynamique entre pascal-seconde et centipoise ; pour les calculs du nombre de Reynolds.",
    introduction: [
      "La viscosite dynamique exprime la resistance interne a l'ecoulement d'un fluide.",
      "Le pascal-seconde est l'unite SI, tandis que le centipoise est plus utilise dans l'industrie.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Viscosite dynamique" },
      { label: "Unite SI", value: "Pascal-seconde" },
      { label: "Symbole SI", value: "Pa·s" },
      { label: "Usage", value: "Nombre de Reynolds, calculs de canalisations" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la viscosite dynamique ?",
        paragraphs: [
          "La viscosite dynamique mesure la resistance d'un fluide a l'ecoulement.",
          "Le centipoise correspond a la viscosite de l'eau a 20 °C, une valeur de reference tres utilisee.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "resistance-electrique",
    sourceSlug: "elektrik_direnc",
    category: "elektrik_direnc",
    title: "Conversion des unites de resistance electrique",
    description:
      "Convertissez la resistance electrique entre ohm, kilohm et megohm ; pour la conception de circuits.",
    introduction: [
      "La resistance electrique exprime la capacite d'un materiau a s'opposer au passage du courant electrique.",
      "L'ohm est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Resistance electrique" },
      { label: "Unite SI", value: "Ohm" },
      { label: "Symbole SI", value: "Ω" },
      { label: "Usage", value: "Conception de circuits, loi d'Ohm" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la resistance electrique ?",
        paragraphs: [
          "Selon la loi d'Ohm, la resistance determine le rapport entre la tension et le courant.",
          "Le kilohm et le megohm servent a exprimer de grandes valeurs de resistance.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "capacitance",
    sourceSlug: "kapasitans",
    category: "kapasitans",
    title: "Conversion des unites de capacite electrique",
    description:
      "Convertissez la capacite entre farad, millifarad, microfarad, nanofarad et picofarad ; pour les valeurs de condensateurs.",
    introduction: [
      "La capacite electrique exprime la capacite d'un composant a stocker une charge electrique.",
      "Le farad est l'unite SI de base, mais des unites plus petites sont plus utilisees en pratique.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Capacite electrique" },
      { label: "Unite SI", value: "Farad" },
      { label: "Symbole SI", value: "F" },
      { label: "Usage", value: "Condensateurs, conception de circuits" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la capacite electrique ?",
        paragraphs: [
          "La capacite exprime la quantite de charge qu'un condensateur peut stocker sous une tension donnee.",
          "Le microfarad est utilise pour les condensateurs courants, le nanofarad et le picofarad pour les circuits haute frequence.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "inductance",
    sourceSlug: "enduktans",
    category: "enduktans",
    title: "Conversion des unites d'inductance",
    description:
      "Convertissez l'inductance entre henry, millihenry et microhenry ; pour la conception de bobines et de transformateurs.",
    introduction: [
      "L'inductance exprime la capacite d'une bobine a generer une tension s'opposant a la variation du courant.",
      "Le henry est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Inductance" },
      { label: "Unite SI", value: "Henry" },
      { label: "Symbole SI", value: "H" },
      { label: "Usage", value: "Conception de bobines et de transformateurs" },
    ],
    sections: [
      {
        title: "Qu'est-ce que l'inductance ?",
        paragraphs: [
          "L'inductance exprime la resistance d'une bobine a la variation du courant qui la traverse.",
          "Elle joue un role essentiel dans la conception des transformateurs et des moteurs.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "charge-electrique",
    sourceSlug: "elektrik_yuk",
    category: "elektrik_yuk",
    title: "Conversion des unites de charge electrique",
    description:
      "Convertissez la charge electrique entre coulomb, millicoulomb, microcoulomb et nanocoulomb ; pour les calculs de capacite de batterie.",
    introduction: [
      "La charge electrique est une propriete fondamentale de la matiere a l'origine des effets electriques.",
      "Le coulomb est l'unite SI de base.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Charge electrique" },
      { label: "Unite SI", value: "Coulomb" },
      { label: "Symbole SI", value: "C" },
      { label: "Usage", value: "Capacite de batterie, electricite statique" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la charge electrique ?",
        paragraphs: [
          "La charge electrique est une propriete physique fondamentale a l'origine des forces et des champs electriques.",
          "Le millicoulomb et le microcoulomb servent a exprimer de petites valeurs de charge pour les batteries et les condensateurs.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "carat-argent",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversion des titres d'argent",
    description:
      "Convertissez en grammes d'argent pur les titres 999, 925 (sterling), 900 et 800 ; decouvrez le systeme des milliemes et ses usages en bijouterie.",
    introduction: [
      "Comme l'or, l'argent n'est presque jamais utilise pur pour fabriquer des bijoux ou des objets, car c'est un metal tendre que l'on allie a d'autres metaux comme le cuivre. Le millieme est la mesure indiquant la proportion d'argent pur dans cet alliage.",
      "Contrairement au titrage de l'or exprime sur une base de 24, la purete de l'argent est exprimee sur une base de 1000 (millieme) : 999 correspond a un argent quasiment pur, tandis que 925 est le titre le plus repandu au monde, connu sous le nom d'« argent sterling ».",
    ],
    facts: [
      { label: "Systeme de mesure", value: "Systeme des milliemes" },
      { label: "Reference principale", value: "999 = 99,9 % d'argent pur" },
      { label: "Titre de bijouterie le plus repandu", value: "925 (argent sterling)" },
      { label: "Argent d'investissement/lingot", value: "Titre 999 (argent fin)" },
      { label: "Regle de calcul", value: "Grammes x (millieme source / 1000) ÷ (millieme cible / 1000)" },
    ],
    sections: [
      {
        title: "Que mesure vraiment le titre de l'argent (millieme) ?",
        paragraphs: [
          "Contrairement a l'or, la purete de l'argent n'est pas exprimee sur 24 unites mais en milliemes (base 1000). Un titre de 999 signifie 999 parts pour mille (soit 99,9 %) d'argent pur dans l'alliage ; le millieme restant correspond generalement a de faibles traces d'autres elements.",
          "Le titre 925 (argent sterling) signifie que l'alliage contient 92,5 % d'argent pur, le reste (7,5 %) etant generalement du cuivre. Cette faible quantite de cuivre apporte de la solidite a l'argent pur, naturellement tres tendre et facilement deformable.",
        ],
      },
      {
        title: "Pourquoi l'argent sterling (925) est-il la norme mondiale ?",
        paragraphs: [
          "L'histoire du standard de l'argent sterling (925) remonte a l'Angleterre du XIIe siecle, et il est devenu au fil du temps la norme la plus largement acceptee dans le monde pour la bijouterie, l'orfevrerie de table et les objets en argent.",
          "L'argent pur (999) est trop tendre pour les objets d'usage quotidien et se raye facilement ; l'ajout de 7,5 % de cuivre confere a l'argent une durete suffisante tout en preservant en grande partie son eclat et sa couleur caracteristiques.",
        ],
      },
      {
        title: "Difference entre les titres 999, 900 et 800",
        paragraphs: [
          "Le titre 999 (argent fin/pur) est privilegie pour les lingots et les produits d'investissement, car le taux de purete est le critere le plus important pour les investisseurs ; mais sa tendrete le rend peu utilise pour la bijouterie quotidienne.",
          "Le titre 900 (argent de monnaie) a ete historiquement utilise dans les pieces d'argent de nombreux pays. Le titre 800, courant notamment en Europe (Allemagne, Autriche), est un standard de bijouterie moins pur que l'argent sterling mais tout de meme durable.",
        ],
      },
      {
        title: "Comment calculer la quantite d'argent pur ?",
        paragraphs: [
          "Pour determiner la quantite d'argent pur d'une bague en argent de 10 grammes titrant 925 : 10 x (925 / 1000) = 9,25 grammes d'argent pur. Les 0,75 gramme restants sont du cuivre ou d'autres metaux ajoutes pour la solidite.",
          "La meme logique s'applique pour convertir entre differents titres : connaissant la quantite d'argent pur d'un alliage a 925, on obtient son equivalent en titre 999 en divisant cette quantite par 999/1000.",
        ],
      },
      {
        title: "Le lien entre le ternissement de l'argent et sa purete",
        paragraphs: [
          "Le ternissement d'un bijou en argent avec le temps n'est pas du a l'argent lui-meme, mais a la reaction du cuivre de l'alliage avec les composes soufres de l'air. Un argent plus pur (comme le titre 999) a donc tendance a ternir moins facilement.",
          "Certains fabricants ont mis au point des alliages « anti-ternissement » pour ameliorer la resistance au ternissement de l'argent sterling, en utilisant d'autres elements comme le germanium a la place du cuivre.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "glycemie",
    sourceSlug: "kan-sekeri",
    category: "kan_sekeri",
    title: "Conversion des unites de glycemie",
    description:
      "Convertissez les valeurs de glycemie entre mg/dL et mmol/L ; decouvrez la relation entre l'unite courante aux Etats-Unis et l'unite SI utilisee dans le monde.",
    introduction: [
      "La glycemie designe la mesure du taux de glucose (sucre) dans le sang, un indicateur fondamental du suivi du diabete. Deux systemes d'unites differents sont utilises dans le monde : l'unite SI millimole par litre (mmol/L) et le milligramme par decilitre (mg/dL), utilise en particulier aux Etats-Unis.",
      "Cette difference d'unites cree souvent de la confusion pour les personnes qui suivent la litterature medicale internationale ou qui ont fait des analyses a l'etranger -- une meme valeur numerique (par exemple « 100 ») peut indiquer des niveaux de glycemie totalement differents selon l'unite utilisee.",
    ],
    facts: [
      { label: "Element mesure", value: "Glucose (glycemie)" },
      { label: "Unite SI (mondiale)", value: "Millimole par litre (mmol/L)" },
      { label: "Unite courante aux Etats-Unis", value: "Milligramme par decilitre (mg/dL)" },
      { label: "Facteur de conversion", value: "mg/dL = mmol/L x 18,016" },
      { label: "Masse molaire du glucose", value: "≈180,16 g/mol" },
    ],
    sections: [
      {
        title: "Pourquoi la glycemie est-elle mesuree dans deux unites differentes ?",
        paragraphs: [
          "L'Organisation mondiale de la sante et la plupart des pays expriment la glycemie en millimoles par litre (mmol/L), conformement au systeme d'unites SI. Les Etats-Unis continuent traditionnellement d'utiliser le milligramme par decilitre (mg/dL).",
          "Le facteur de conversion entre ces deux unites (18,016) derive de la masse molaire du glucose (environ 180,16 g/mol) -- cela signifie qu'une millimole de glucose pese 180,16 milligrammes, soit l'equivalent de 18,016 milligrammes pour un decilitre (0,1 litre).",
        ],
      },
      {
        title: "Comment convertir de mg/dL vers mmol/L ?",
        paragraphs: [
          "Pour passer de mg/dL a mmol/L, il faut diviser la valeur par 18,016 : mmol/L = mg/dL ÷ 18,016. Par exemple, une valeur de 100 mg/dL equivaut a environ 5,55 mmol/L.",
          "Dans l'autre sens, pour passer de mmol/L a mg/dL, il faut multiplier la valeur par 18,016 : mg/dL = mmol/L x 18,016. Cette relation simple de multiplication/division vient du fait que le glucose est une molecule unique avec une masse molaire fixe.",
        ],
      },
      {
        title: "Plages de reference courantes (a titre informatif)",
        paragraphs: [
          "Plages de reference generalement utilisees pour la glycemie a jeun : la plage normale se situe habituellement autour de 70-99 mg/dL (3,9-5,5 mmol/L) ; la plage 100-125 mg/dL (5,6-6,9 mmol/L) est consideree comme du « prediabete » ; et 126 mg/dL (7,0 mmol/L) ou plus (a des tests repetes) peut indiquer un diabete.",
          "Ces valeurs sont donnees a titre purement informatif et ne constituent pas des seuils medicaux definitifs ; elles peuvent varier selon la methode de test, le laboratoire et l'etat clinique de la personne. L'interpretation et le diagnostic des resultats de glycemie doivent toujours etre effectues par un medecin.",
        ],
      },
      {
        title: "Methodes de mesure de la glycemie",
        paragraphs: [
          "La glycemie peut etre mesuree a partir d'un echantillon de sang capillaire preleve au bout du doigt avec un glucometre (appareil de mesure a domicile), ou a partir d'un echantillon de sang veineux en laboratoire. De legeres differences peuvent exister entre ces deux methodes, c'est pourquoi la mesure en laboratoire est privilegiee pour un diagnostic precis.",
          "Les systemes de surveillance continue du glucose (CGM) utilisent un capteur place sous la peau pour suivre automatiquement le taux de glucose a tout moment de la journee ; cela aide en particulier les personnes diabetiques a surveiller plus etroitement les fluctuations de leur glycemie.",
        ],
      },
      {
        title: "Difference entre l'HbA1c et la glycemie instantanee",
        paragraphs: [
          "La mesure instantanee de la glycemie (en mg/dL ou mmol/L) ne montre que le niveau de glucose a cet instant precis, tandis que le test HbA1c (hemoglobine glyquee) reflete la moyenne de la glycemie sur les 2 a 3 derniers mois et est generalement exprime en pourcentage (%).",
          "Ces deux mesures sont complementaires : la mesure instantanee montre les fluctuations quotidiennes, tandis que l'HbA1c montre le niveau de controle a long terme ; les deux sont evaluees ensemble dans la gestion du diabete.",
        ],
      },
    ],
  },
  {
    locale: "fr",
    slug: "vitamine-d",
    sourceSlug: "vitamin-d",
    category: "vitamin_d",
    title: "Conversion des unites de vitamine D",
    description:
      "Convertissez les valeurs de vitamine D (25-OH) entre ng/mL et nmol/L ; decouvrez la relation entre l'unite courante aux Etats-Unis et l'unite SI utilisee dans le monde.",
    introduction: [
      "Le taux de vitamine D (25-hydroxyvitamine D, 25-OH D) est une mesure de laboratoire standard indiquant les reserves de vitamine D dans le sang. Deux unites differentes sont utilisees dans le monde : l'unite SI nanomole par litre (nmol/L) et le nanogramme par millilitre (ng/mL), utilise en particulier aux Etats-Unis.",
      "Cette difference d'unites peut preter a confusion lors de la lecture de resultats de laboratoires etrangers ou du suivi de sources de sante internationales -- une meme valeur numerique peut indiquer des taux de vitamine D totalement differents selon l'unite utilisee.",
    ],
    facts: [
      { label: "Element mesure", value: "25-hydroxyvitamine D (25-OH D)" },
      { label: "Unite SI (mondiale)", value: "Nanomole par litre (nmol/L)" },
      { label: "Unite courante aux Etats-Unis", value: "Nanogramme par millilitre (ng/mL)" },
      { label: "Facteur de conversion", value: "nmol/L = ng/mL x 2,496" },
      { label: "Masse molaire de la 25-OH vitamine D", value: "≈400,64 g/mol" },
    ],
    sections: [
      {
        title: "Pourquoi le taux de vitamine D est-il mesure dans deux unites differentes ?",
        paragraphs: [
          "Les pays suivant le systeme d'unites SI international (la plupart des pays europeens) expriment le taux de vitamine D en nanomoles par litre (nmol/L). Les Etats-Unis continuent traditionnellement d'utiliser l'unite massique nanogramme par millilitre (ng/mL).",
          "Le facteur de conversion (2,496) derive de la masse molaire de la molecule de 25-hydroxyvitamine D (environ 400,64 g/mol) ; cette relation explique pourquoi la conversion entre les unites peut se faire avec un facteur fixe.",
        ],
      },
      {
        title: "Comment convertir de ng/mL vers nmol/L ?",
        paragraphs: [
          "Pour passer de ng/mL a nmol/L, il faut multiplier la valeur par 2,496 : nmol/L = ng/mL x 2,496. Par exemple, une valeur de 30 ng/mL equivaut a environ 74,9 nmol/L.",
          "Dans l'autre sens, pour passer de nmol/L a ng/mL, il faut diviser la valeur par 2,496 : ng/mL = nmol/L ÷ 2,496. Cette relation de proportionnalite simple vient du fait que la molecule possede une masse molaire fixe.",
        ],
      },
      {
        title: "Plages de reference courantes (a titre informatif)",
        paragraphs: [
          "Certaines sources internationales (comme l'Endocrine Society) mentionnent generalement les plages suivantes : en dessous de 20 ng/mL (50 nmol/L), on parle d'« insuffisance/carence » ; la plage 20-29 ng/mL (50-72,5 nmol/L) correspond a une « insuffisance relative » ; et 30 ng/mL (75 nmol/L) ou plus est generalement considere comme « suffisant ».",
          "Ces valeurs de reference peuvent varier legerement selon les organismes de sante et doivent etre interpretees en fonction de l'age, de l'etat de sante et de la region geographique de la personne. Cette page est fournie a titre purement informatif ; toute evaluation specifique doit etre effectuee par un medecin.",
        ],
      },
      {
        title: "Pourquoi la vitamine D est-elle mesuree differemment des autres vitamines ?",
        paragraphs: [
          "La majeure partie de la vitamine D circulant dans le sang est la forme 25-hydroxyvitamine D, produite dans le foie et ayant une demi-vie relativement longue ; c'est pourquoi ce metabolite specifique est mesure pour evaluer le statut en vitamine D (et non la forme hormonale active, la 1,25-dihydroxyvitamine D).",
          "Ce choix s'explique par la presence longue et stable de la 25-OH D dans le sang -- la forme active varie beaucoup plus rapidement et est soumise a une regulation hormonale stricte, ce qui la rend peu fiable pour refleter les reserves de vitamine D a long terme.",
        ],
      },
      {
        title: "Sources de vitamine D",
        paragraphs: [
          "Le corps peut produire lui-meme de la vitamine D lorsque la peau est exposee au rayonnement UVB du soleil ; c'est la principale source de vitamine D pour la plupart des gens. Quelques aliments comme les poissons gras, le jaune d'oeuf et les produits laitiers enrichis en contiennent aussi naturellement.",
          "Les personnes vivant a des latitudes nordiques, peu exposees au soleil ou ayant une peau foncee peuvent avoir une synthese de vitamine D plus faible ; ces situations sont generalement prises en compte pour evaluer le besoin en complements de vitamine D.",
        ],
      },
    ],
  },
];

export function findFrenchCategoryPage(slug: string) {
  return frenchCategoryPages.find((page) => page.slug === slug);
}

export function findFrenchCategoryPageByTurkishSlug(sourceSlug: string) {
  return frenchCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
