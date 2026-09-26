import {
  getLocaleDefinition,
  SUPPORTED_LOCALES,
  type Locale,
} from "./config";
import { getLocalizedCategorySummaries } from "./contentRegistry";
import {
  getCollectionBasePath,
  getStaticPath,
  type StaticRouteKey,
} from "./routing";
import { englishCalculatorMenuLinks } from "./englishCalculatorHubs";
import { englishConversionMenuCategoryOrder } from "./englishCategoryPresentation";

type SiteHeaderCopy = {
  navAriaLabel: string;
  menuLabel: string;
  conversionsLabel: string;
};

type FooterCopy = {
  navAriaLabel: string;
  pagesHeading: string;
  languagesHeading: string;
  categoriesHeading: string;
  description: string;
  disclaimer: string;
  browserProcessingNote: string;
};

type LinkDefinition = {
  href: string;
  label: string;
};

const navCategoryOrder = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "veri",
  "elektrik",
  "yogunluk",
  "kuvvet",
  "debi",
  "tork",
  "momentum",
  "viskozite_dinamik",
  "elektrik_direnc",
  "kapasitans",
  "enduktans",
  "elektrik_yuk",
  "altin_ayar",
  "gumus_ayar",
] as const;

const categoryLabels: Record<
  Locale,
  Record<(typeof navCategoryOrder)[number], string> & Record<string, string>
> = {
  tr: {
    uzunluk: "Uzunluk",
    alan: "Alan",
    hacim: "Hacim",
    kutle: "Kutle",
    sicaklik: "Sicaklik",
    zaman: "Zaman",
    hiz: "Hiz",
    basinc: "Basinc",
    enerji: "Enerji ve Guc",
    veri: "Veri Depolama",
    elektrik: "Elektrik",
    yogunluk: "Yogunluk",
    kuvvet: "Kuvvet",
    debi: "Debi",
    tork: "Tork",
    momentum: "Momentum",
    viskozite_dinamik: "Viskozite",
    elektrik_direnc: "Direnc",
    kapasitans: "Kapasitans",
    enduktans: "Enduktans",
    elektrik_yuk: "Elektrik Yuku",
    altin_ayar: "Altin Ayar",
    gumus_ayar: "Gumus Ayar",
  },
  en: {
    uzunluk: "Length",
    alan: "Area",
    hacim: "Volume",
    kutle: "Mass",
    sicaklik: "Temperature",
    zaman: "Time",
    hiz: "Speed",
    basinc: "Pressure",
    enerji: "Energy and Power",
    veri: "Data Storage",
    elektrik: "Electricity",
    yogunluk: "Density",
    kuvvet: "Force",
    debi: "Flow Rate",
    tork: "Torque",
    momentum: "Momentum",
    viskozite_dinamik: "Viscosity",
    elektrik_direnc: "Resistance",
    kapasitans: "Capacitance",
    enduktans: "Inductance",
    elektrik_yuk: "Electric Charge",
    altin_ayar: "Gold Purity",
    gumus_ayar: "Silver Purity",
  },
  de: {
    uzunluk: "Lange",
    alan: "Flache",
    hacim: "Volumen",
    kutle: "Masse",
    sicaklik: "Temperatur",
    zaman: "Zeit",
    hiz: "Geschwindigkeit",
    basinc: "Druck",
    enerji: "Energie und Leistung",
    veri: "Datenspeicher",
    elektrik: "Elektrik",
    yogunluk: "Dichte",
    kuvvet: "Kraft",
    debi: "Volumenstrom",
    tork: "Drehmoment",
    momentum: "Impuls",
    viskozite_dinamik: "Viskositat",
    elektrik_direnc: "Widerstand",
    kapasitans: "Kapazitat",
    enduktans: "Induktivitat",
    elektrik_yuk: "Elektrische Ladung",
    altin_ayar: "Goldkarat",
    gumus_ayar: "Silberfeingehalt",
  },
  ar: {
    uzunluk: "الطول",
    alan: "المساحة",
    hacim: "الحجم",
    kutle: "الكتلة",
    sicaklik: "الحرارة",
    zaman: "الزمن",
    hiz: "السرعة",
    basinc: "الضغط",
    enerji: "الطاقة والقدرة",
    veri: "تخزين البيانات",
    elektrik: "الكهرباء",
    yogunluk: "الكثافة",
    kuvvet: "القوة",
    debi: "معدل التدفق",
    tork: "عزم الدوران",
    momentum: "الزخم",
    viskozite_dinamik: "اللزوجة",
    elektrik_direnc: "المقاومة",
    kapasitans: "السعة",
    enduktans: "المحاثة",
    elektrik_yuk: "الشحنة الكهربائية",
    altin_ayar: "عيار الذهب",
    gumus_ayar: "عيار الفضة",
  },
  uz: {
    uzunluk: "Uzunlik",
    alan: "Yuza",
    hacim: "Hajm",
    kutle: "Massa",
    sicaklik: "Harorat",
    zaman: "Vaqt",
    hiz: "Tezlik",
    basinc: "Bosim",
    enerji: "Energiya",
    veri: "Ma'lumot Hajmi",
    elektrik: "Elektr",
    yogunluk: "Zichlik",
    kuvvet: "Kuch",
    debi: "Sarf",
    tork: "Tork",
    momentum: "Impuls",
    viskozite_dinamik: "Qovushqoqlik",
    elektrik_direnc: "Qarshilik",
    kapasitans: "Sig'im",
    enduktans: "Induktivlik",
    elektrik_yuk: "Elektr Zaryadi",
    altin_ayar: "Oltin Karati",
    gumus_ayar: "Kumush Sofligi (Proba)",
  },
  bn: {
    uzunluk: "দৈর্ঘ্য",
    alan: "ক্ষেত্রফল",
    hacim: "আয়তন",
    kutle: "ভর",
    sicaklik: "তাপমাত্রা",
    zaman: "সময়",
    hiz: "গতি",
    basinc: "চাপ",
    enerji: "শক্তি",
    veri: "ডেটা স্টোরেজ",
    elektrik: "বিদ্যুৎ",
    yogunluk: "ঘনত্ব",
    kuvvet: "বল",
    debi: "প্রবাহ হার",
    tork: "টর্ক",
    momentum: "ভরবেগ",
    viskozite_dinamik: "সান্দ্রতা",
    elektrik_direnc: "রোধ",
    kapasitans: "ধারকত্ব",
    enduktans: "আবেশ",
    elektrik_yuk: "তড়িৎ আধান",
    altin_ayar: "স্বর্ণের ক্যারেট",
    gumus_ayar: "রূপার মান",
  },
  fr: {
    uzunluk: "Longueur",
    alan: "Aire",
    hacim: "Volume",
    kutle: "Masse",
    sicaklik: "Temperature",
    zaman: "Temps",
    hiz: "Vitesse",
    basinc: "Pression",
    enerji: "Energie et Puissance",
    veri: "Stockage de Donnees",
    elektrik: "Electricite",
    yogunluk: "Densite",
    kuvvet: "Force",
    debi: "Debit",
    tork: "Couple",
    momentum: "Quantite de Mouvement",
    viskozite_dinamik: "Viscosite",
    elektrik_direnc: "Resistance",
    kapasitans: "Capacite",
    enduktans: "Inductance",
    elektrik_yuk: "Charge Electrique",
    altin_ayar: "Carat d'Or",
    gumus_ayar: "Titre de l'Argent",
  },
  es: {
    uzunluk: "Longitud",
    alan: "Superficie",
    hacim: "Volumen",
    kutle: "Masa",
    sicaklik: "Temperatura",
    zaman: "Tiempo",
    hiz: "Velocidad",
    basinc: "Presion",
    enerji: "Energia y Potencia",
    veri: "Almacenamiento de Datos",
    elektrik: "Electricidad",
    yogunluk: "Densidad",
    kuvvet: "Fuerza",
    debi: "Caudal",
    tork: "Par",
    momentum: "Momento",
    viskozite_dinamik: "Viscosidad",
    elektrik_direnc: "Resistencia",
    kapasitans: "Capacitancia",
    enduktans: "Inductancia",
    elektrik_yuk: "Carga Electrica",
    altin_ayar: "Quilate de Oro",
    gumus_ayar: "Ley de la Plata",
  },
  "es-419": {
    uzunluk: "Longitud",
    alan: "Superficie",
    hacim: "Volumen",
    kutle: "Masa",
    sicaklik: "Temperatura",
    zaman: "Tiempo",
    hiz: "Velocidad",
    basinc: "Presion",
    enerji: "Energia y Potencia",
    veri: "Almacenamiento de Datos",
    elektrik: "Electricidad",
    yogunluk: "Densidad",
    kuvvet: "Fuerza",
    debi: "Caudal",
    tork: "Par",
    momentum: "Momento",
    viskozite_dinamik: "Viscosidad",
    elektrik_direnc: "Resistencia",
    kapasitans: "Capacitancia",
    enduktans: "Inductancia",
    elektrik_yuk: "Carga Electrica",
    altin_ayar: "Quilate de Oro",
    gumus_ayar: "Ley de la Plata",
  },
  pt: {
    uzunluk: "Comprimento",
    alan: "Area",
    hacim: "Volume",
    kutle: "Massa",
    sicaklik: "Temperatura",
    zaman: "Tempo",
    hiz: "Velocidade",
    basinc: "Pressao",
    enerji: "Energia e Potencia",
    veri: "Armazenamento de Dados",
    elektrik: "Eletricidade",
    yogunluk: "Densidade",
    kuvvet: "Forca",
    debi: "Vazao",
    tork: "Torque",
    momentum: "Momento",
    viskozite_dinamik: "Viscosidade",
    elektrik_direnc: "Resistencia",
    kapasitans: "Capacitancia",
    enduktans: "Indutancia",
    elektrik_yuk: "Carga Eletrica",
    altin_ayar: "Quilate de Ouro",
    gumus_ayar: "Teor de Prata",
  },
  it: {
    uzunluk: "Lunghezza",
    alan: "Area",
    hacim: "Volume",
    kutle: "Massa",
    sicaklik: "Temperatura",
    zaman: "Tempo",
    hiz: "Velocita",
    basinc: "Pressione",
    enerji: "Energia e Potenza",
    veri: "Archiviazione Dati",
    elektrik: "Elettricita",
    yogunluk: "Densita",
    kuvvet: "Forza",
    debi: "Portata",
    tork: "Coppia",
    momentum: "Quantita di Moto",
    viskozite_dinamik: "Viscosita",
    elektrik_direnc: "Resistenza",
    kapasitans: "Capacita",
    enduktans: "Induttanza",
    elektrik_yuk: "Carica Elettrica",
    altin_ayar: "Caratura dell'Oro",
    gumus_ayar: "Titolo dell'Argento",
  },
  nl: {
    uzunluk: "Lengte",
    alan: "Oppervlakte",
    hacim: "Volume",
    kutle: "Massa",
    sicaklik: "Temperatuur",
    zaman: "Tijd",
    hiz: "Snelheid",
    basinc: "Druk",
    enerji: "Energie en Vermogen",
    veri: "Data-opslag",
    elektrik: "Elektriciteit",
    yogunluk: "Dichtheid",
    kuvvet: "Kracht",
    debi: "Debiet",
    tork: "Koppel",
    momentum: "Impuls",
    viskozite_dinamik: "Viscositeit",
    elektrik_direnc: "Weerstand",
    kapasitans: "Capaciteit",
    enduktans: "Inductantie",
    elektrik_yuk: "Elektrische Lading",
    altin_ayar: "Goudkaraat",
    gumus_ayar: "Zilvergehalte",
  },
  ru: {
    uzunluk: "Длина", alan: "Площадь", hacim: "Объём", kutle: "Масса", sicaklik: "Температура", zaman: "Время", hiz: "Скорость", basinc: "Давление", enerji: "Энергия", veri: "Хранение данных", elektrik: "Электричество", yogunluk: "Плотность", kuvvet: "Сила", debi: "Расход", debi_hacimsel: "Объёмный расход", debi_kutlesel: "Массовый расход", tork: "Крутящий момент", aci: "Угол", ivme: "Ускорение", acisal_hiz: "Угловая скорость", frekans: "Частота", guc: "Мощность", momentum: "Импульс", viskozite_dinamik: "Вязкость", viskozite_kinematik: "Кинематическая вязкость", manyetik_alan: "Напряжённость магнитного поля", manyetik_aki: "Магнитный поток", elektrik_direnc: "Сопротивление", kapasitans: "Ёмкость", enduktans: "Индуктивность", elektrik_yuk: "Электрический заряд", altin_ayar: "Проба золота", gumus_ayar: "Проба серебра",
  },
  sv: {
    uzunluk: "Längd",
    alan: "Area",
    hacim: "Volym",
    kutle: "Massa",
    sicaklik: "Temperatur",
    zaman: "Tid",
    hiz: "Hastighet",
    basinc: "Tryck",
    enerji: "Energi och Effekt",
    veri: "Datalagring",
    elektrik: "Elektricitet",
    yogunluk: "Densitet",
    kuvvet: "Kraft",
    debi: "Flöde",
    tork: "Vridmoment",
    momentum: "Rörelsemängd",
    viskozite_dinamik: "Viskositet",
    elektrik_direnc: "Resistans",
    kapasitans: "Kapacitans",
    enduktans: "Induktans",
    elektrik_yuk: "Elektrisk Laddning",
    altin_ayar: "Guldkarat",
    gumus_ayar: "Silverhalt",
  },
  no: {
    uzunluk: "Lengde",
    alan: "Areal",
    hacim: "Volum",
    kutle: "Masse",
    sicaklik: "Temperatur",
    zaman: "Tid",
    hiz: "Hastighet",
    basinc: "Trykk",
    enerji: "Energi og Effekt",
    veri: "Datalagring",
    elektrik: "Elektrisitet",
    yogunluk: "Densitet",
    kuvvet: "Kraft",
    debi: "Stromning",
    tork: "Dreiemoment",
    momentum: "Bevegelsesmengde",
    viskozite_dinamik: "Viskositet",
    elektrik_direnc: "Resistans",
    kapasitans: "Kapasitans",
    enduktans: "Induktans",
    elektrik_yuk: "Elektrisk Ladning",
    altin_ayar: "Gullkarat",
    gumus_ayar: "Solvinnhold",
  },
  da: {
    uzunluk: "Laengde",
    alan: "Areal",
    hacim: "Rumfang",
    kutle: "Masse",
    sicaklik: "Temperatur",
    zaman: "Tid",
    hiz: "Hastighed",
    basinc: "Tryk",
    enerji: "Energi og Effekt",
    veri: "Datalagring",
    elektrik: "Elektricitet",
    yogunluk: "Densitet",
    kuvvet: "Kraft",
    debi: "Stromning",
    tork: "Moment",
    momentum: "Bevaegelsesmaengde",
    viskozite_dinamik: "Viskositet",
    elektrik_direnc: "Modstand",
    kapasitans: "Kapacitans",
    enduktans: "Induktans",
    elektrik_yuk: "Elektrisk Ladning",
    altin_ayar: "Guldkarat",
    gumus_ayar: "Solvindhold",
  },
};

const siteHeaderCopy: Record<Locale, SiteHeaderCopy> = {
  tr: {
    navAriaLabel: "Ana menu",
    menuLabel: "Menu",
    conversionsLabel: "Donusumler",
  },
  en: {
    navAriaLabel: "Main navigation",
    menuLabel: "Menu",
    conversionsLabel: "Conversions",
  },
  de: {
    navAriaLabel: "Hauptnavigation",
    menuLabel: "Menu",
    conversionsLabel: "Kategorien",
  },
  ar: {
    navAriaLabel: "التنقل الرئيسي",
    menuLabel: "القائمة",
    conversionsLabel: "الأدوات",
  },
  uz: {
    navAriaLabel: "Asosiy navigatsiya",
    menuLabel: "Menyu",
    conversionsLabel: "O'zgartirishlar",
  },
  bn: {
    navAriaLabel: "প্রধান নেভিগেশন",
    menuLabel: "মেনু",
    conversionsLabel: "রূপান্তর",
  },
  fr: {
    navAriaLabel: "Navigation principale",
    menuLabel: "Menu",
    conversionsLabel: "Conversions",
  },
  es: {
    navAriaLabel: "Navegacion principal",
    menuLabel: "Menu",
    conversionsLabel: "Conversiones",
  },
  "es-419": {
    navAriaLabel: "Navegacion principal",
    menuLabel: "Menu",
    conversionsLabel: "Conversiones",
  },
  pt: {
    navAriaLabel: "Navegacao principal",
    menuLabel: "Menu",
    conversionsLabel: "Conversoes",
  },
  it: {
    navAriaLabel: "Navigazione principale",
    menuLabel: "Menu",
    conversionsLabel: "Conversioni",
  },
  nl: {
    navAriaLabel: "Hoofdnavigatie",
    menuLabel: "Menu",
    conversionsLabel: "Omrekeningen",
  },
  ru: { navAriaLabel: "Основная навигация", menuLabel: "Меню", conversionsLabel: "Конвертеры" },
  sv: {
    navAriaLabel: "Huvudnavigering",
    menuLabel: "Meny",
    conversionsLabel: "Omvandlingar",
  },
  no: {
    navAriaLabel: "Hovednavigasjon",
    menuLabel: "Meny",
    conversionsLabel: "Omregninger",
  },
  da: {
    navAriaLabel: "Hovednavigation",
    menuLabel: "Menu",
    conversionsLabel: "Omregninger",
  },
};

const footerCopy: Record<Locale, FooterCopy> = {
  tr: {
    navAriaLabel: "Alt menu",
    pagesHeading: "Sayfalar",
    languagesHeading: "Diller",
    categoriesHeading: "Kategoriler",
    description:
      "Teknik donusum araclari, muhendislik hesaplayicilari ve birim rehberleri pratik basvuru amaciyla hazirlanmistir.",
    disclaimer:
      "Kritik muhendislik, saglik veya guvenlik kararlarinda sonuclari profesyonel kaynaklarla dogrulayin.",
    browserProcessingNote:
      "Hesaplayici girisleri bu sitedeki hesaplama akislarinda tarayici icinde islenir.",
  },
  en: {
    navAriaLabel: "Footer navigation",
    pagesHeading: "Pages",
    languagesHeading: "Languages",
    categoriesHeading: "Categories",
    description:
      "Technical conversion tools, engineering calculators and unit guides prepared for practical reference.",
    disclaimer:
      "For engineering, health or safety decisions, verify critical values with professional sources.",
    browserProcessingNote:
      "Calculator inputs are processed in the browser for calculation flows on this site.",
  },
  de: {
    navAriaLabel: "Fussnavigation",
    pagesHeading: "Seiten",
    languagesHeading: "Sprachen",
    categoriesHeading: "Kategorien",
    description:
      "Technische Umrechnungstools und Einheitenleitfaden fur den schnellen praktischen Einsatz.",
    disclaimer:
      "Prufen Sie kritische Werte bei technischen, gesundheitlichen oder sicherheitsrelevanten Entscheidungen immer mit fachlichen Quellen.",
    browserProcessingNote:
      "Eingegebene Werte werden fur die Rechenablaufe direkt im Browser verarbeitet.",
  },
  ar: {
    navAriaLabel: "تنقل التذييل",
    pagesHeading: "الصفحات",
    languagesHeading: "اللغات",
    categoriesHeading: "الأدوات",
    description:
      "نسخة عربية تتوسع تدريجيًا لأدوات التحويل والحسابات العملية دون كسر بنية الموقع.",
    disclaimer:
      "في القرارات الهندسية أو الصحية أو المتعلقة بالسلامة، يُفضّل دائمًا التحقق من النتائج عبر مصادر متخصصة.",
    browserProcessingNote:
      "تُعالج مدخلات الحاسبات داخل المتصفح أثناء تنفيذ عمليات الحساب في هذا الموقع.",
  },
  uz: {
    navAriaLabel: "Pastki navigatsiya",
    pagesHeading: "Sahifalar",
    languagesHeading: "Tillar",
    categoriesHeading: "Turkumlar",
    description:
      "Amaliy foydalanish uchun tayyorlangan texnik o'zgartirish vositalari va birlik qo'llanmalari.",
    disclaimer:
      "Muhandislik, sog'liq yoki xavfsizlik bilan bog'liq muhim qarorlarda natijalarni professional manbalar bilan tekshiring.",
    browserProcessingNote:
      "Kalkulyator kiritmalari ushbu saytdagi hisoblash jarayonlarida brauzer ichida qayta ishlanadi.",
  },
  bn: {
    navAriaLabel: "ফুটার নেভিগেশন",
    pagesHeading: "পৃষ্ঠাসমূহ",
    languagesHeading: "ভাষাসমূহ",
    categoriesHeading: "বিভাগসমূহ",
    description:
      "ব্যবহারিক রেফারেন্সের জন্য তৈরি প্রযুক্তিগত রূপান্তর টুল এবং একক গাইড।",
    disclaimer:
      "গুরুত্বপূর্ণ প্রকৌশল, স্বাস্থ্য বা নিরাপত্তা সংক্রান্ত সিদ্ধান্তে ফলাফল পেশাদার সূত্র দিয়ে যাচাই করুন।",
    browserProcessingNote:
      "এই সাইটের হিসাব প্রবাহে ক্যালকুলেটরের ইনপুট ব্রাউজারেই প্রক্রিয়া করা হয়।",
  },
  fr: {
    navAriaLabel: "Navigation du pied de page",
    pagesHeading: "Pages",
    languagesHeading: "Langues",
    categoriesHeading: "Categories",
    description:
      "Outils de conversion technique et guides d'unites concus pour un usage pratique.",
    disclaimer:
      "Pour les decisions importantes en ingenierie, sante ou securite, verifiez les resultats avec des sources professionnelles.",
    browserProcessingNote:
      "Dans les flux de calcul de ce site, les entrees des calculatrices sont traitees directement dans le navigateur.",
  },
  es: {
    navAriaLabel: "Navegacion del pie de pagina",
    pagesHeading: "Paginas",
    languagesHeading: "Idiomas",
    categoriesHeading: "Categorias",
    description:
      "Herramientas de conversion tecnica y guias de unidades preparadas para un uso practico.",
    disclaimer:
      "Para decisiones importantes de ingenieria, salud o seguridad, verifique los resultados con fuentes profesionales.",
    browserProcessingNote:
      "En los flujos de calculo de este sitio, los datos introducidos en las calculadoras se procesan directamente en el navegador.",
  },
  "es-419": {
    navAriaLabel: "Navegacion del pie de pagina",
    pagesHeading: "Paginas",
    languagesHeading: "Idiomas",
    categoriesHeading: "Categorias",
    description:
      "Herramientas de conversion tecnica y guias de unidades preparadas para un uso practico.",
    disclaimer:
      "Para decisiones importantes de ingenieria, salud o seguridad, verifica los resultados con fuentes profesionales.",
    browserProcessingNote:
      "En los flujos de calculo de este sitio, los datos que ingresas en las calculadoras se procesan directamente en el navegador.",
  },
  pt: {
    navAriaLabel: "Navegacao do rodape",
    pagesHeading: "Paginas",
    languagesHeading: "Idiomas",
    categoriesHeading: "Categorias",
    description:
      "Ferramentas de conversao tecnica e guias de unidades preparados para uso pratico.",
    disclaimer:
      "Para decisoes importantes de engenharia, saude ou seguranca, verifique os resultados com fontes profissionais.",
    browserProcessingNote:
      "Nos fluxos de calculo deste site, os dados inseridos nas calculadoras sao processados diretamente no navegador.",
  },
  it: {
    navAriaLabel: "Navigazione del footer",
    pagesHeading: "Pagine",
    languagesHeading: "Lingue",
    categoriesHeading: "Categorie",
    description:
      "Strumenti di conversione tecnica e guide alle unita preparati per un uso pratico.",
    disclaimer:
      "Per decisioni importanti di ingegneria, salute o sicurezza, verifica i risultati con fonti professionali.",
    browserProcessingNote:
      "Nei flussi di calcolo di questo sito, i dati inseriti nelle calcolatrici vengono elaborati direttamente nel browser.",
  },
  nl: {
    navAriaLabel: "Footernavigatie",
    pagesHeading: "Pagina's",
    languagesHeading: "Talen",
    categoriesHeading: "Categorieën",
    description:
      "Technische omrekentools en eenhedengidsen voorbereid voor praktisch gebruik.",
    disclaimer:
      "Controleer resultaten voor belangrijke technische, medische of veiligheidsbeslissingen met professionele bronnen.",
    browserProcessingNote:
      "Bij de rekenfuncties op deze site worden de ingevoerde gegevens rechtstreeks in de browser verwerkt.",
  },
  ru: {
    navAriaLabel: "Навигация в подвале", pagesHeading: "Страницы", languagesHeading: "Языки", categoriesHeading: "Категории",
    description: "Точные конвертеры величин и справочные материалы для практических задач.",
    disclaimer: "Для важных инженерных, медицинских и безопасностных решений проверяйте критические значения по профессиональным источникам.",
    browserProcessingNote: "Введённые в калькуляторы данные обрабатываются в браузере.",
  },
  sv: {
    navAriaLabel: "Sidfotsnavigering",
    pagesHeading: "Sidor",
    languagesHeading: "Språk",
    categoriesHeading: "Kategorier",
    description:
      "Tekniska omvandlingsverktyg och enhetsguider förberedda för praktiskt bruk.",
    disclaimer:
      "För viktiga tekniska, medicinska eller säkerhetsrelaterade beslut, kontrollera resultaten med professionella källor.",
    browserProcessingNote:
      "I räknefunktionerna på denna sida behandlas inmatade uppgifter direkt i webbläsaren.",
  },
  no: {
    navAriaLabel: "Bunntekstnavigering",
    pagesHeading: "Sider",
    languagesHeading: "Sprak",
    categoriesHeading: "Kategorier",
    description:
      "Tekniske omregningsverktoy og enhetsguider forberedt for praktisk bruk.",
    disclaimer:
      "For viktige tekniske, medisinske eller sikkerhetsrelaterte beslutninger, kontroller resultatene med profesjonelle kilder.",
    browserProcessingNote:
      "I regnefunksjonene pa denne siden behandles innsendte data direkte i nettleseren.",
  },
  da: {
    navAriaLabel: "Bundtekstnavigation",
    pagesHeading: "Sider",
    languagesHeading: "Sprog",
    categoriesHeading: "Kategorier",
    description:
      "Tekniske omregningsvaerktojer og enhedsguider forberedt til praktisk brug.",
    disclaimer:
      "For vigtige tekniske, medicinske eller sikkerhedsrelaterede beslutninger bor resultaterne kontrolleres med professionelle kilder.",
    browserProcessingNote:
      "I beregningsfunktionerne pa denne side behandles indtastede data direkte i browseren.",
  },
};

const topLevelLabelMap: Record<
  Locale,
  Record<
    "home" | "engineeringHub" | "units" | "allConversions" | "professions",
    string
  >
> = {
  tr: {
    home: "Ana Sayfa",
    engineeringHub: "Hesaplayicilar",
    units: "Birim Rehberi",
    allConversions: "Tum Donusumler",
    professions: "Mesleklere Gore",
  },
  en: {
    home: "Home",
    engineeringHub: "Calculators",
    units: "Unit Guide",
    allConversions: "All Conversions",
    professions: "Professions",
  },
  de: {
    home: "Startseite",
    engineeringHub: "Rechner",
    units: "Einheitenleitfaden",
    allConversions: "Alle Umrechnungen",
    professions: "Berufe",
  },
  ar: {
    home: "الرئيسية",
    engineeringHub: "الحاسبات",
    units: "دليل الوحدات",
    allConversions: "كل التحويلات",
    professions: "المهن",
  },
  uz: {
    home: "Bosh sahifa",
    engineeringHub: "Kalkulyatorlar",
    units: "Birliklar",
    allConversions: "Turkumlar",
    professions: "Kasblar",
  },
  bn: {
    home: "হোম",
    engineeringHub: "ক্যালকুলেটর",
    units: "একক গাইড",
    allConversions: "সব রূপান্তর",
    professions: "পেশা",
  },
  fr: {
    home: "Accueil",
    engineeringHub: "Calculatrices",
    units: "Guides d'unites",
    allConversions: "Toutes les conversions",
    professions: "Par profession",
  },
  es: {
    home: "Inicio",
    engineeringHub: "Calculadoras",
    units: "Guia de Unidades",
    allConversions: "Todas las Conversiones",
    professions: "Por Profesion",
  },
  "es-419": {
    home: "Inicio",
    engineeringHub: "Calculadoras",
    units: "Guia de Unidades",
    allConversions: "Todas las Conversiones",
    professions: "Por Profesion",
  },
  pt: {
    home: "Inicio",
    engineeringHub: "Calculadoras",
    units: "Guia de Unidades",
    allConversions: "Todas as Conversoes",
    professions: "Por Profissao",
  },
  it: {
    home: "Home",
    engineeringHub: "Calcolatrici",
    units: "Guida alle Unita",
    allConversions: "Tutte le Conversioni",
    professions: "Per Professione",
  },
  nl: {
    home: "Home",
    engineeringHub: "Rekentools",
    units: "Eenhedengids",
    allConversions: "Alle Omrekeningen",
    professions: "Op Beroep",
  },
  ru: { home: "Главная", engineeringHub: "Калькуляторы", units: "Единицы", allConversions: "Все переводы", professions: "По профессии" },
  sv: {
    home: "Hem",
    engineeringHub: "Räknare",
    units: "Enhetsguide",
    allConversions: "Alla Omvandlingar",
    professions: "Efter Yrke",
  },
  no: {
    home: "Hjem",
    engineeringHub: "Kalkulatorer",
    units: "Enhetsguide",
    allConversions: "Alle Omregninger",
    professions: "Etter Yrke",
  },
  da: {
    home: "Hjem",
    engineeringHub: "Beregnere",
    units: "Enhedsguide",
    allConversions: "Alle Omregninger",
    professions: "Efter Erhverv",
  },
};

const footerLinksByLocale: Record<
  Locale,
  Array<{ key: StaticRouteKey; label: string }>
> = {
  tr: [
    { key: "home", label: "Ana Sayfa" },
    { key: "units", label: "Birim Rehberi" },
    { key: "allConversions", label: "Tum Donusumler" },
    { key: "professions", label: "Mesleklere Gore" },
    { key: "developerApi", label: "Gelistirici API'si" },
    { key: "about", label: "Hakkimizda" },
    { key: "contact", label: "Iletisim" },
    { key: "privacy", label: "Gizlilik" },
    { key: "terms", label: "Kullanim Kosullari" },
  ],
  en: [
    { key: "home", label: "Home" },
    { key: "units", label: "Unit Guide" },
    { key: "allConversions", label: "All Conversions" },
    { key: "engineeringHub", label: "Engineering Calculators" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
    { key: "privacy", label: "Privacy" },
    { key: "terms", label: "Terms" },
  ],
  de: [
    { key: "home", label: "Startseite" },
    { key: "units", label: "Einheitenleitfaden" },
    { key: "allConversions", label: "Alle Umrechnungen" },
    { key: "engineeringHub", label: "Ingenieurrechner" },
    { key: "about", label: "Uber uns" },
    { key: "contact", label: "Kontakt" },
    { key: "privacy", label: "Datenschutz" },
    { key: "terms", label: "Nutzungsbedingungen" },
  ],
  ar: [
    { key: "home", label: "الرئيسية" },
    { key: "units", label: "دليل الوحدات" },
    { key: "allConversions", label: "كل التحويلات" },
    { key: "engineeringHub", label: "الحاسبات" },
    { key: "about", label: "من نحن" },
    { key: "contact", label: "اتصل بنا" },
    { key: "privacy", label: "الخصوصية" },
    { key: "terms", label: "الشروط" },
  ],
  uz: [{ key: "home", label: "Bosh sahifa" }],
  bn: [{ key: "home", label: "হোম" }],
  fr: [{ key: "home", label: "Accueil" }],
  es: [{ key: "home", label: "Inicio" }],
  "es-419": [{ key: "home", label: "Inicio" }],
  pt: [{ key: "home", label: "Inicio" }],
  it: [{ key: "home", label: "Home" }],
  nl: [{ key: "home", label: "Home" }],
  ru: [{ key: "home", label: "Главная" }, { key: "allConversions", label: "Все переводы" }],
  sv: [{ key: "home", label: "Hem" }],
  no: [{ key: "home", label: "Hjem" }],
  da: [{ key: "home", label: "Hjem" }],
};

export function getSiteHeaderCopy(locale: Locale) {
  return siteHeaderCopy[locale];
}

export function getSiteFooterCopy(locale: Locale) {
  return footerCopy[locale];
}

export function getTopLevelLinks(locale: Locale): LinkDefinition[] {
  const labels = topLevelLabelMap[locale];

  // Ozbekcha kart kataloglari ana sayfada ve turkum indeksinde bulunur.
  // Menu bu mevcut UZ bolumlerine gider; Turkce arac sayfalarina yonlenmez.
  if (locale === "uz") {
    return [
      {
        href: getStaticPath(locale, "home"),
        label: labels.home,
      },
      {
        href: "/uz#engineering-calculators",
        label: labels.engineeringHub,
      },
      {
        href: getStaticPath(locale, "units"),
        label: labels.units,
      },
      {
        href: "/uz/turkumlar",
        label: labels.allConversions,
      },
      {
        href: "/uz/turkumlar#boshqa-kalkulyator-markazlari",
        label: labels.professions,
      },
    ];
  }

  if (locale === "en") {
    return [
      { href: getStaticPath(locale, "home"), label: labels.home },
      { href: getStaticPath(locale, "units"), label: labels.units },
      { href: getStaticPath(locale, "allConversions"), label: labels.allConversions },
      { href: getStaticPath(locale, "otherConversions"), label: "Other Tools" },
    ];
  }

  if (locale === "ru") {
    return [
      { href: "/ru", label: labels.home },
      { href: "/ru/unit-guides", label: labels.units },
      { href: "/ru/categories", label: labels.allConversions },
    ];
  }

  return [
    {
      href: getStaticPath(locale, "home"),
      label: labels.home,
    },
    {
      href: getStaticPath(locale, "engineeringHub"),
      label: labels.engineeringHub,
    },
    {
      href: getStaticPath(locale, "units"),
      label: labels.units,
    },
    {
      href: getStaticPath(locale, "allConversions"),
      label: labels.allConversions,
    },
    ...(locale === "tr"
      ? [
          {
            href: getStaticPath(locale, "professions"),
            label: labels.professions,
          },
        ]
      : []),
  ];
}

export function getCalculatorMenuLinks(locale: Locale): LinkDefinition[] {
  return locale === "en" ? englishCalculatorMenuLinks : [];
}

export function getCategoryMenuLinks(locale: Locale) {
  const categorySummaries = getLocalizedCategorySummaries(locale);
  const basePath = getCollectionBasePath(locale, "categories").slice(
    0,
    -1
  );

  const menuCategoryOrder = locale === "en" ? englishConversionMenuCategoryOrder : navCategoryOrder;

  const links = menuCategoryOrder.flatMap((category) => {
    const summary = categorySummaries.find(
      (item) => item.category === category
    );

    if (!summary) {
      return [];
    }

    return [
      {
        href: `${basePath}/${summary.slug}`,
        label: categoryLabels[locale][category],
      },
    ];
  });

  // Ozbekcha icin henuz yerellestirilmis sayfasi olmayan ayakkabi, mutfak
  // ve tarif araclarini Turkce URL'lere baglamiyoruz.
  if (locale === "uz" || locale === "ru") {
    return links;
  }

  links.push({
    href: getStaticPath(locale, "shoeSize"),
    label:
      locale === "en"
        ? "Shoe Size"
        : locale === "de"
          ? "Schuhgroessen"
          : locale === "ar"
            ? "مقاسات الأحذية"
            : locale === "bn"
              ? "জুতার মাপ"
              : locale === "fr"
                ? "Pointures"
                : locale === "es" || locale === "es-419"
                  ? "Tallas de Calzado"
                  : locale === "pt"
                    ? "Numeração de Calçados"
                    : locale === "it"
                      ? "Numeri di Scarpe"
                      : locale === "nl"
                        ? "Schoenmaten"
                        : locale === "sv"
                          ? "Skostorlekar"
                          : locale === "no"
                            ? "Skostørrelser"
                            : locale === "da"
                              ? "Skostørrelser"
                              : "Ayakkabi Numarasi",
  });
  links.push({
    href: getStaticPath(locale, "kitchenMeasures"),
    label:
      locale === "en"
        ? "Kitchen Measures"
        : locale === "de"
          ? "Kuechenmasse"
          : locale === "ar"
            ? "مقاييس المطبخ"
            : locale === "bn"
              ? "রান্নাঘর পরিমাপ"
              : locale === "fr"
                ? "Mesures de Cuisine"
                : locale === "es" || locale === "es-419"
                  ? "Medidas de Cocina"
                  : locale === "pt"
                    ? "Medidas de Cozinha"
                    : locale === "it"
                      ? "Misure di Cucina"
                      : locale === "nl"
                        ? "Keukenmaten"
                        : locale === "sv"
                          ? "Kokmått"
                          : locale === "no"
                            ? "Kjøkkenmål"
                            : locale === "da"
                              ? "Køkkenmål"
                              : "Mutfak Olculeri",
  });
  links.push({
    href: getStaticPath(locale, "recipeConverter"),
    label:
      locale === "en"
        ? "Recipe Converter"
        : locale === "de"
          ? "Rezept Umrechner"
          : locale === "ar"
            ? "محول الوصفات"
            : locale === "bn"
              ? "রেসিপি রূপান্তরকারী"
              : locale === "fr"
                ? "Convertisseur de Recettes"
                : locale === "es" || locale === "es-419"
                  ? "Conversor de Recetas"
                  : locale === "pt"
                    ? "Conversor de Receitas"
                    : locale === "it"
                      ? "Convertitore di Ricette"
                      : locale === "nl"
                        ? "Receptomrekenaar"
                        : locale === "sv"
                          ? "Receptomvandlare"
                          : locale === "no"
                            ? "Oppskriftomregner"
                            : locale === "da"
                              ? "Opskriftomregner"
                              : "Tarif Cevirici",
  });

  return links;
}

export function getCategoryFooterLinks(locale: Locale) {
  const basePath = getCollectionBasePath(locale, "categories").slice(
    0,
    -1
  );

  return getLocalizedCategorySummaries(locale).map((summary) => ({
    href: `${basePath}/${summary.slug}`,
    label:
      locale === "ar"
        ? categoryLabels.ar[
            summary.category as (typeof navCategoryOrder)[number]
          ] ?? summary.title
        : summary.title,
  }));
}

export function getFooterLinks(locale: Locale) {
  return footerLinksByLocale[locale].map((link) => ({
    href: getStaticPath(locale, link.key),
    label: link.label,
  }));
}

export function getFooterLanguageLinks() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    href: getLocaleDefinition(locale).homePath,
    label: getLocaleDefinition(locale).switcherLabel,
  }));
}
