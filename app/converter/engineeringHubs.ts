export type EngineeringLocale = "tr" | "en" | "de";

type LocalizedString = Record<EngineeringLocale, string>;
type LocalizedStringList = Record<EngineeringLocale, string[]>;

type ElectricalCalculatorBlueprint = {
  sourceSlug: string;
  status: "live" | "planned";
  slugs: LocalizedString;
  titles: LocalizedString;
  descriptions: LocalizedString;
  formula: string;
  plannedInputs: LocalizedStringList;
  useCases: LocalizedStringList;
};

export const engineeringHubPaths = {
  tr: "/muhendislik-hesaplayicilari",
  en: "/en/engineering-calculators",
  de: "/de/ingenieurrechner",
} as const satisfies Record<EngineeringLocale, string>;

export const electricalHubPaths = {
  tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
  en: "/en/engineering-calculators/electrical-calculators",
  de: "/de/ingenieurrechner/elektrorechner",
} as const satisfies Record<EngineeringLocale, string>;

const electricalCalculatorBlueprints: ElectricalCalculatorBlueprint[] = [
  {
    sourceSlug: "kablo-kesiti-hesaplama",
    status: "live",
    slugs: {
      tr: "kablo-kesiti-hesaplama",
      en: "cable-size-calculator",
      de: "kabelquerschnitt-rechner",
    },
    titles: {
      tr: "Kablo Kesiti Hesaplama",
      en: "Cable Size Calculator",
      de: "Kabelquerschnitt Rechner",
    },
    descriptions: {
      tr: "Akim, mesafe, faz tipi ve izin verilen gerilim dusumune gore uygun iletken kesitini secmek icin hazirlanan elektrik hesap araci.",
      en: "Electrical sizing tool for choosing a practical conductor cross-section from current, run length, phase type and allowable voltage drop.",
      de: "Elektro-Werkzeug zur Auswahl eines praxisnahen Leiterquerschnitts aus Strom, Leitungslange, Phasentyp und zulassigem Spannungsfall.",
    },
    formula: "S ~= k x I x L / \u0394U",
    plannedInputs: {
      tr: [
        "Hat akimi veya yuk gucu",
        "Tek faz, uc faz veya DC secimi",
        "Kablo uzunlugu, malzeme ve izin verilen gerilim dusumu",
      ],
      en: [
        "Load current or load power",
        "Single-phase, three-phase or DC selection",
        "Cable length, conductor material and allowable voltage drop",
      ],
      de: [
        "Laststrom oder Lastleistung",
        "Auswahl fur Einphasen-, Dreiphasen- oder DC-Systeme",
        "Leitungslange, Leitermaterial und zulassiger Spannungsfall",
      ],
    },
    useCases: {
      tr: [
        "Pano besleme hatlari",
        "Motor ve surucu baglantilari",
        "Uzak saha ekipmani beslemeleri",
      ],
      en: [
        "Panel feeder circuits",
        "Motor and drive connections",
        "Remote field-equipment feeds",
      ],
      de: [
        "Zuleitungen zu Schaltschranken",
        "Motor- und Umrichteranschlusse",
        "Versorgung entfernter Feldgerate",
      ],
    },
  },
  {
    sourceSlug: "gerilim-dusumu-hesaplama",
    status: "live",
    slugs: {
      tr: "gerilim-dusumu-hesaplama",
      en: "voltage-drop-calculator",
      de: "spannungsfall-rechner",
    },
    titles: {
      tr: "Gerilim Dusumu Hesaplama",
      en: "Voltage Drop Calculator",
      de: "Spannungsfall Rechner",
    },
    descriptions: {
      tr: "Secili kablo kesitinde volt kaybini, yuzdesel dusumu ve hat sonu gerilimini gormek icin hazirlanan elektrik proje araci.",
      en: "Electrical project tool for checking voltage loss, percent drop and end-of-line voltage on a selected cable run.",
      de: "Projektwerkzeug zur Kontrolle von Spannungsverlust, prozentualem Spannungsfall und Endspannung auf einer ausgewahlten Leitung.",
    },
    formula: "\u0394U = I x R",
    plannedInputs: {
      tr: [
        "Kaynak gerilimi ve hat akimi",
        "Tek yon kablo uzunlugu ve iletken kesiti",
        "Bakir veya aluminyum secimi ile faz tipi",
      ],
      en: [
        "Source voltage and line current",
        "One-way cable length and conductor size",
        "Copper or aluminum with phase-type selection",
      ],
      de: [
        "Versorgungsspannung und Leitungsstrom",
        "Einfache Leitungslange und Leiterquerschnitt",
        "Kupfer- oder Aluminiumleiter mit Phasenauswahl",
      ],
    },
    useCases: {
      tr: [
        "Ic tesisat kontrolu",
        "Motor besleme hatlari",
        "Uzak sensor veya saha panolari",
      ],
      en: [
        "Internal wiring checks",
        "Motor feeder circuits",
        "Remote sensor or field-panel runs",
      ],
      de: [
        "Prufung interner Elektroinstallationen",
        "Motorzuleitungen",
        "Leitungen zu entfernten Sensoren oder Feldschranken",
      ],
    },
  },
  {
    sourceSlug: "kw-to-amper-hesaplama",
    status: "live",
    slugs: {
      tr: "kw-to-amper-hesaplama",
      en: "kw-to-ampere-calculator",
      de: "kw-zu-ampere-rechner",
    },
    titles: {
      tr: "kW to Amper Hesaplama",
      en: "kW to Ampere Calculator",
      de: "kW-zu-Ampere Rechner",
    },
    descriptions: {
      tr: "Gucu akima cevirmek icin faz tipi, gerilim, guc faktoru ve verimle calisacak elektrik secim araci.",
      en: "Electrical selection tool for converting power into current using phase type, voltage, power factor and efficiency.",
      de: "Auswahlwerkzeug zur Umrechnung von Leistung in Strom mit Phasentyp, Spannung, Leistungsfaktor und Wirkungsgrad.",
    },
    formula: "I = P / (V x cos \u03c6)",
    plannedInputs: {
      tr: [
        "kW veya W cinsinden yuk gucu",
        "Tek faz veya uc faz sistem tipi",
        "Gerilim, guc faktoru ve verim degeri",
      ],
      en: [
        "Load power in kW or W",
        "Single-phase or three-phase system type",
        "Voltage, power factor and efficiency",
      ],
      de: [
        "Lastleistung in kW oder W",
        "Einphasen- oder Dreiphasensystem",
        "Spannung, Leistungsfaktor und Wirkungsgrad",
      ],
    },
    useCases: {
      tr: [
        "Sigorta ve s alter secimi oncesi akim tahmini",
        "Kablo kesiti on hesabi",
        "Yuk dagilim tablolarinin hizli kontrolu",
      ],
      en: [
        "Current estimate before fuse and breaker selection",
        "Preliminary cable-sizing checks",
        "Quick validation of load schedules",
      ],
      de: [
        "Stromabschatzung vor Sicherungs- und Schutzschalterwahl",
        "Vorprufung fur Kabeldimensionierung",
        "Schnellkontrolle von Lastlisten",
      ],
    },
  },
  {
    sourceSlug: "amper-to-kw-hesaplama",
    status: "live",
    slugs: {
      tr: "amper-to-kw-hesaplama",
      en: "ampere-to-kw-calculator",
      de: "ampere-zu-kw-rechner",
    },
    titles: {
      tr: "Amper to kW Hesaplama",
      en: "Ampere to kW Calculator",
      de: "Ampere-zu-kW Rechner",
    },
    descriptions: {
      tr: "Hat akimindan yaklasik gucu bulmak icin gerilim, faz tipi, guc faktoru ve verimle calisacak proje araci.",
      en: "Project tool for estimating electrical power from line current together with voltage, phase type, power factor and efficiency.",
      de: "Projektwerkzeug zur Abschatzung elektrischer Leistung aus Leitungsstrom, Spannung, Phasentyp, Leistungsfaktor und Wirkungsgrad.",
    },
    formula: "P = V x I x cos \u03c6",
    plannedInputs: {
      tr: [
        "Hat akimi",
        "Gerilim seviyesi ve sistem tipi",
        "Guc faktoru ve istege bagli verim",
      ],
      en: [
        "Line current",
        "Voltage level and system type",
        "Power factor and optional efficiency",
      ],
      de: [
        "Leitungsstrom",
        "Spannungsniveau und Systemart",
        "Leistungsfaktor und optionaler Wirkungsgrad",
      ],
    },
    useCases: {
      tr: [
        "Sahada mevcut hattin guc tahmini",
        "Yuk dengeleme ve pano kontrolu",
        "Jenerator veya UPS planlamasi",
      ],
      en: [
        "Power estimate of an existing feeder in the field",
        "Load balancing and panel checks",
        "Generator or UPS planning",
      ],
      de: [
        "Leistungsabschatzung bestehender Leitungen vor Ort",
        "Lastverteilung und Schaltschrankkontrolle",
        "Planung von Generator oder USV",
      ],
    },
  },
  {
    sourceSlug: "motor-akimi-hesaplama",
    status: "live",
    slugs: {
      tr: "motor-akimi-hesaplama",
      en: "motor-current-calculator",
      de: "motorstrom-rechner",
    },
    titles: {
      tr: "Motor Akimi Hesaplama",
      en: "Motor Current Calculator",
      de: "Motorstrom Rechner",
    },
    descriptions: {
      tr: "Motor gucu, gerilim, guc faktoru ve verime gore yaklasik tam yuk akimini cikarmak icin hazirlanan secim araci.",
      en: "Selection tool for estimating approximate full-load motor current from motor power, voltage, power factor and efficiency.",
      de: "Auswahlwerkzeug zur Abschatzung des ungefahren Motor-Nennstroms aus Motorleistung, Spannung, Leistungsfaktor und Wirkungsgrad.",
    },
    formula: "I = P / (\u221a3 x V x cos \u03c6 x \u03b7)",
    plannedInputs: {
      tr: [
        "Motor gucu ve motor tipi",
        "Besleme gerilimi ve faz tipi",
        "Guc faktoru, verim ve emniyet payi",
      ],
      en: [
        "Motor power and motor type",
        "Supply voltage and phase type",
        "Power factor, efficiency and design margin",
      ],
      de: [
        "Motorleistung und Motortyp",
        "Versorgungsspannung und Phasentyp",
        "Leistungsfaktor, Wirkungsgrad und Reserve",
      ],
    },
    useCases: {
      tr: [
        "Kontakt or ve termik on secimi",
        "Motor kablo ve sigorta boyutlandirmasi",
        "Proje kesiflerinde hizli tam yuk akimi kontrolu",
      ],
      en: [
        "Preselection of contactors and overload relays",
        "Motor cable and fuse sizing",
        "Quick full-load current checks during project estimation",
      ],
      de: [
        "Vorauswahl von Schutzen und Motorschutz",
        "Motor-Kabel- und Sicherungsdimensionierung",
        "Schnelle Kontrolle des Nennstroms in der Projektphase",
      ],
    },
  },
];

const electricalHubCopy = {
  tr: {
    title: "Elektrik Hesaplari",
    description:
      "Kablo secimi, gerilim dusumu, guc-akim donusumu ve motor on boyutlandirma gibi elektrik proje hesaplarini tek bir muhendislik kumesinde toplayin.",
    overviewTitle: "Bu alt merkez ne icin acildi?",
    overviewBody:
      "Elektrik hesaplari genel bir hesaplayici listesinin icinde kaybolmasin diye bu alt merkez olusturuldu. Buradaki amac, ayni karar akisina ait araclari bir araya getirerek kullanicinin once kategoriyi, sonra dogru araci secmesini kolaylastirmak.",
    liveToolsTitle: "Canli araclar",
    plannedToolsTitle: "Siradaki arac rotalari",
    plannedToolsBody:
      "Asagidaki rotalar hesap motorlari tamamlanmadan once bilgi mimarisini sabitlemek icin acildi. Bu sayfalar indexlenmeyecek; gercek hesaplayici mantigi eklendiginde canli araca donecekler.",
    processTitle: "Bu cluster nasil buyuyecek?",
    processSteps: [
      "Once yuk akimi ve guc hesaplari acilacak.",
      "Ardindan kablo kesiti ve gerilim dusumu birbirine bagli sekilde tamamlanacak.",
      "Son asamada secim araclari sigorta, kontaktor ve termik katmanina genisleyecek.",
    ],
    relatedTitle: "Ust merkez",
    relatedLinkLabel: "Tum Muhendislik Hesaplayicilari",
    liveStatus: "Canli",
    plannedStatus: "Planli rota",
  },
  en: {
    title: "Electrical Calculators",
    description:
      "Group electrical project tools for cable sizing, voltage-drop checks, power-current conversion and preliminary motor sizing in one engineering cluster.",
    overviewTitle: "Why open this sub-hub?",
    overviewBody:
      "Electrical tools should not disappear inside a generic calculator list. This sub-hub keeps one decision flow together so people can choose the right category first and then move into the exact tool they need.",
    liveToolsTitle: "Live tools",
    plannedToolsTitle: "Planned calculator routes",
    plannedToolsBody:
      "The routes below are being opened to lock the information architecture before the full calculation engines are shipped. These pages stay out of the index until they become live calculators.",
    processTitle: "How this cluster will grow",
    processSteps: [
      "Power-to-current and current-to-power checks will come first.",
      "Cable size and voltage-drop tools will then be completed as a connected pair.",
      "Protection-device tools such as fuse and contactor selection will follow next.",
    ],
    relatedTitle: "Parent hub",
    relatedLinkLabel: "All Engineering Calculators",
    liveStatus: "Live",
    plannedStatus: "Planned route",
  },
  de: {
    title: "Elektrorechner",
    description:
      "Bundeln Sie Elektro-Projektwerkzeuge fur Kabeldimensionierung, Spannungsfall, Leistungs-Strom-Umrechnung und erste Motorauslegung in einem gemeinsamen Ingenieur-Cluster.",
    overviewTitle: "Warum gibt es dieses Teilzentrum?",
    overviewBody:
      "Elektro-Werkzeuge sollen nicht in einer allgemeinen Rechnerliste untergehen. Dieses Teilzentrum halt einen zusammenhangenden Entscheidungsfluss zusammen, damit Nutzer zuerst den richtigen Bereich und danach das passende Werkzeug wahlen konnen.",
    liveToolsTitle: "Live-Werkzeuge",
    plannedToolsTitle: "Geplante Rechner-Routen",
    plannedToolsBody:
      "Die folgenden Routen werden geoffnet, um die Informationsarchitektur vor dem Start der vollstandigen Rechenlogik festzulegen. Diese Seiten bleiben bis zum Live-Tool aus dem Index.",
    processTitle: "Wie wachst dieses Cluster?",
    processSteps: [
      "Zuerst folgen Leistung-Strom- und Strom-Leistung-Prufungen.",
      "Danach werden Kabelquerschnitt und Spannungsfall als verbundenes Werkzeugpaar ausgebaut.",
      "Im Anschluss folgen Auswahlhilfen fur Schutzorgane wie Sicherung und Schutz.",
    ],
    relatedTitle: "Ubergeordnetes Zentrum",
    relatedLinkLabel: "Alle Ingenieurrechner",
    liveStatus: "Live",
    plannedStatus: "Geplante Route",
  },
} as const;

const plannedPreviewCopy = {
  tr: {
    breadcrumbLabel: "Sayfa yolu",
    homeLabel: "Ana Sayfa",
    hubLabel: "Muhendislik Hesaplayicilari",
    electricalHubLabel: "Elektrik Hesaplari",
    planningNote:
      "Bu rota su anda hesaplayici iskeleti olarak acik. Sayfa, kapsam ve ic link yapisini sabit tutarken hesap motoru tamamlandiginda canli araca donecek.",
    scopeTitle: "Bu arac neyi cozecek?",
    inputsTitle: "Planlanan girisler",
    useCasesTitle: "Tipik kullanimlar",
    nextTitle: "Sonraki adim",
    nextBody:
      "Bu sayfa su anda indexe acilmadi. Hesap motoru, birim secimleri ve test senaryolari eklendiginde indekslenebilir canli araca cevrilecek.",
    relatedTitle: "Ilgili sayfalar",
    electricalHubLink: "Elektrik Hesaplari merkezine don",
    liveToolLink: "Canli Ohm Yasasi aracini ac",
    liveToolHref: "/hesaplayicilar/ohm-yasasi",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    hubLabel: "Engineering Calculators",
    electricalHubLabel: "Electrical Calculators",
    planningNote:
      "This route is currently open as a calculator skeleton. It keeps the scope and internal-link structure stable while the calculation engine is being built.",
    scopeTitle: "What will this tool solve?",
    inputsTitle: "Planned inputs",
    useCasesTitle: "Typical use cases",
    nextTitle: "Next step",
    nextBody:
      "This page is intentionally kept out of the index for now. Once the calculation engine, unit options and validation cases are added, it will be promoted into a live indexable calculator.",
    relatedTitle: "Related pages",
    electricalHubLink: "Back to the Electrical Calculators hub",
    liveToolLink: "Open the live Ohm's Law tool",
    liveToolHref: "/en/calculators/ohms-law",
  },
  de: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Startseite",
    hubLabel: "Ingenieurrechner",
    electricalHubLabel: "Elektrorechner",
    planningNote:
      "Diese Route ist derzeit als Rechner-Grundgerust geoffnet. Sie stabilisiert Umfang und interne Verlinkung, wahrend die eigentliche Rechenlogik aufgebaut wird.",
    scopeTitle: "Was wird dieses Werkzeug losen?",
    inputsTitle: "Geplante Eingaben",
    useCasesTitle: "Typische Anwendungen",
    nextTitle: "Nachster Schritt",
    nextBody:
      "Diese Seite bleibt vorerst bewusst aus dem Index. Sobald Rechenlogik, Einheitenauswahl und Validierungsfalle vorliegen, wird sie in einen live indexierbaren Rechner umgewandelt.",
    relatedTitle: "Verwandte Seiten",
    electricalHubLink: "Zuruck zum Elektrorechner-Zentrum",
    liveToolLink: "Live-Tool fur das Ohmsche Gesetz offnen",
    liveToolHref: "/de/rechner/ohms-law",
  },
} as const;

export function getEngineeringHubPath(locale: EngineeringLocale) {
  return engineeringHubPaths[locale];
}

export function getElectricalHubPath(locale: EngineeringLocale) {
  return electricalHubPaths[locale];
}

export function getElectricalHubCopy(locale: EngineeringLocale) {
  return electricalHubCopy[locale];
}

export function getElectricalCalculatorItems(locale: EngineeringLocale) {
  return electricalCalculatorBlueprints.map((item) => ({
    sourceSlug: item.sourceSlug,
    status: item.status,
    slug: item.slugs[locale],
    href: `${electricalHubPaths[locale]}/${item.slugs[locale]}`,
    title: item.titles[locale],
    description: item.descriptions[locale],
    formula: item.formula,
    plannedInputs: item.plannedInputs[locale],
    useCases: item.useCases[locale],
  }));
}

export function getLiveElectricalCalculatorItems(
  locale: EngineeringLocale
) {
  return getElectricalCalculatorItems(locale).filter(
    (item) => item.status === "live"
  );
}

export function getPlannedElectricalCalculatorItems(
  locale: EngineeringLocale
) {
  return getElectricalCalculatorItems(locale).filter(
    (item) => item.status === "planned"
  );
}

export function getElectricalCalculatorPath(
  locale: EngineeringLocale,
  sourceSlug: string
) {
  const item = electricalCalculatorBlueprints.find(
    (entry) => entry.sourceSlug === sourceSlug
  );

  if (!item) {
    return null;
  }

  return `${electricalHubPaths[locale]}/${item.slugs[locale]}`;
}

export function getElectricalCalculatorByLocalizedSlug(
  locale: EngineeringLocale,
  slug: string
) {
  return electricalCalculatorBlueprints.find(
    (item) => item.slugs[locale] === slug
  );
}

export function getElectricalCalculatorBySourceSlug(sourceSlug: string) {
  return electricalCalculatorBlueprints.find(
    (item) => item.sourceSlug === sourceSlug
  );
}

export function isLiveElectricalCalculator(sourceSlug: string) {
  return (
    getElectricalCalculatorBySourceSlug(sourceSlug)?.status === "live"
  );
}

export function getElectricalStaticParams(locale: EngineeringLocale) {
  return electricalCalculatorBlueprints.map((item) => ({
    slug: item.slugs[locale],
  }));
}

export function getPlannedElectricalPreviewCopy(
  locale: EngineeringLocale,
  sourceSlug: string
) {
  const item = getElectricalCalculatorBySourceSlug(sourceSlug);

  if (!item) {
    return null;
  }

  return {
    ...plannedPreviewCopy[locale],
    title: item.titles[locale],
    description: item.descriptions[locale],
    formula: item.formula,
    plannedInputs: item.plannedInputs[locale],
    useCases: item.useCases[locale],
    currentPath: `${electricalHubPaths[locale]}/${item.slugs[locale]}`,
  };
}
