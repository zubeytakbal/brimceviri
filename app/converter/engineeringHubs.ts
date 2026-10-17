export type EngineeringLocale = "tr" | "en" | "de" | "ar";

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
  ar: "/ar/engineering-calculators",
} as const satisfies Record<EngineeringLocale, string>;

export const electricalHubPaths = {
  tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
  en: "/en/engineering-calculators/electrical-calculators",
  de: "/de/ingenieurrechner/elektrorechner",
  ar: "/ar/engineering-calculators/electrical-calculators",
} as const satisfies Record<EngineeringLocale, string>;

const electricalCalculatorBlueprints: ElectricalCalculatorBlueprint[] = [
  {
    sourceSlug: "kablo-kesiti-hesaplama",
    status: "live",
    slugs: {
      tr: "kablo-kesiti-hesaplama",
      en: "cable-size-calculator",
      de: "kabelquerschnitt-rechner",
      ar: "cable-size-calculator",
    },
    titles: {
      tr: "Kablo Kesiti Hesaplama",
      en: "Cable Size Calculator",
      de: "Kabelquerschnitt Rechner",
      ar: "حاسبة مقطع الكابل",
    },
    descriptions: {
      tr: "Akım, mesafe, faz tipi ve izin verilen gerilim düşümüne göre uygun iletken kesitini seçmek için hazırlanan elektrik hesap aracı.",
      en: "Electrical sizing tool for choosing a practical conductor cross-section from current, run length, phase type and allowable voltage drop.",
      de: "Elektro-Werkzeug zur Auswahl eines praxisnahen Leiterquerschnitts aus Strom, Leitungslange, Phasentyp und zulässigem Spannungsfall.",
      ar: "أداة كهربائية لاختيار مقطع موصل عملي بالاعتماد على التيار وطول المسار ونوع الطور وهبوط الجهد المسموح.",
    },
    formula: "S ~= k x I x L / \u0394U",
    plannedInputs: {
      tr: [
        "Hat akımı veya yük gücü",
        "Tek faz, üç faz veya DC seçimi",
        "Kablo uzunluğu, malzeme ve izin verilen gerilim düşümü",
      ],
      en: [
        "Load current or load power",
        "Single-phase, three-phase or DC selection",
        "Cable length, conductor material and allowable voltage drop",
      ],
      de: [
        "Laststrom oder Lastleistung",
        "Auswahl für Einphasen-, Dreiphasen- oder DC-Systeme",
        "Leitungslange, Leitermaterial und zulässiger Spannungsfall",
      ],
      ar: [
        "تيار الحمل أو قدرة الحمل",
        "اختيار نظام أحادي الطور أو ثلاثي الطور أو تيار مستمر",
        "طول الكابل ومادة الموصل وهبوط الجهد المسموح",
      ],
    },
    useCases: {
      tr: [
        "Pano besleme hatları",
        "Motor ve sürücü bağlantıları",
        "Uzak saha ekipmanı beslemeleri",
      ],
      en: [
        "Panel feeder circuits",
        "Motor and drive connections",
        "Remote field-equipment feeds",
      ],
      de: [
        "Zuleitungen zu Schaltschranken",
        "Motor- und Umrichteranschlüsse",
        "Versorgung entfernter Feldgerate",
      ],
      ar: [
        "مغذيات اللوحات",
        "توصيلات المحركات والمغيرات",
        "تغذية المعدات البعيدة في الموقع",
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
      ar: "voltage-drop-calculator",
    },
    titles: {
      tr: "Gerilim Düşümü Hesaplama",
      en: "Voltage Drop Calculator",
      de: "Spannungsfall Rechner",
      ar: "حاسبة هبوط الجهد",
    },
    descriptions: {
      tr: "Seçili kablo kesitinde volt kaybını, yüzdesel düşümü ve hat sonu gerilimini görmek için hazırlanan elektrik proje aracı.",
      en: "Electrical project tool for checking voltage loss, percent drop and end-of-line voltage on a selected cable run.",
      de: "Projektwerkzeug zur Kontrolle von Spannungsverlust, prozentualem Spannungsfall und Endspannung auf einer ausgewählten Leitung.",
      ar: "أداة مشروع كهربائي لفحص فقد الجهد ونسبة الهبوط والجهد عند نهاية الخط على مسار كابل محدد.",
    },
    formula: "\u0394U = I x R",
    plannedInputs: {
      tr: [
        "Kaynak gerilimi ve hat akımı",
        "Tek yön kablo uzunluğu ve iletken kesiti",
        "Bakır veya alüminyum seçimi ile faz tipi",
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
      ar: [
        "جهد المصدر وتيار الخط",
        "طول الكابل باتجاه واحد ومقطع الموصل",
        "اختيار النحاس أو الألومنيوم مع نوع الطور",
      ],
    },
    useCases: {
      tr: [
        "İç tesisat kontrolü",
        "Motor besleme hatları",
        "Uzak sensor veya saha panoları",
      ],
      en: [
        "Internal wiring checks",
        "Motor feeder circuits",
        "Remote sensor or field-panel runs",
      ],
      de: [
        "Prüfung interner Elektroinstallationen",
        "Motorzuleitungen",
        "Leitungen zu entfernten Sensoren oder Feldschranken",
      ],
      ar: [
        "فحص التمديدات الداخلية",
        "مغذيات المحركات",
        "خطوط الحساسات أو اللوحات البعيدة",
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
      ar: "kw-to-ampere-calculator",
    },
    titles: {
      tr: "kW to Amper Hesaplama",
      en: "kW to Ampere Calculator",
      de: "kW-zu-Ampere Rechner",
      ar: "تحويل kW إلى أمبير",
    },
    descriptions: {
      tr: "Gücü akıma çevirmek için faz tipi, gerilim, güç faktörü ve verimle çalışacak elektrik seçim aracı.",
      en: "Electrical selection tool for converting power into current using phase type, voltage, power factor and efficiency.",
      de: "Auswahlwerkzeug zur Umrechnung von Leistung in Strom mit Phasentyp, Spannung, Leistungsfaktor und Wirkungsgrad.",
      ar: "أداة كهربائية لتحويل القدرة إلى تيار باستخدام نوع الطور والجهد ومعامل القدرة والكفاءة.",
    },
    formula: "I = P / (V x cos \u03c6)",
    plannedInputs: {
      tr: [
        "kW veya W cinsinden yük gücü",
        "Tek faz veya üç faz sistem tipi",
        "Gerilim, güç faktörü ve verim değeri",
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
      ar: [
        "قدرة الحمل بالكيلوواط أو الواط",
        "نوع النظام: أحادي الطور أو ثلاثي الطور",
        "الجهد ومعامل القدرة والكفاءة",
      ],
    },
    useCases: {
      tr: [
        "Sigorta ve s alter seçimi öncesi akım tahmini",
        "Kablo kesiti ön hesabı",
        "Yük dağılım tablolarının hızlı kontrolü",
      ],
      en: [
        "Current estimate before fuse and breaker selection",
        "Preliminary cable-sizing checks",
        "Quick validation of load schedules",
      ],
      de: [
        "Stromabschätzung vor Sicherungs- und Schutzschalterwahl",
        "Vorprüfung für Kabeldimensionierung",
        "Schnellkontrolle von Lastlisten",
      ],
      ar: [
        "تقدير التيار قبل اختيار الفيوز أو القاطع",
        "فحص أولي لمقاطع الكابلات",
        "مراجعة سريعة لجداول الأحمال",
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
      ar: "ampere-to-kw-calculator",
    },
    titles: {
      tr: "Amper to kW Hesaplama",
      en: "Ampere to kW Calculator",
      de: "Ampere-zu-kW Rechner",
      ar: "تحويل أمبير إلى kW",
    },
    descriptions: {
      tr: "Hat akımından yaklaşık gücü bulmak için gerilim, faz tipi, güç faktörü ve verimle çalışacak proje aracı.",
      en: "Project tool for estimating electrical power from line current together with voltage, phase type, power factor and efficiency.",
      de: "Projektwerkzeug zur Abschätzung elektrischer Leistung aus Leitungsstrom, Spannung, Phasentyp, Leistungsfaktor und Wirkungsgrad.",
      ar: "أداة مشروع لتقدير القدرة الكهربائية من تيار الخط مع الجهد ونوع الطور ومعامل القدرة والكفاءة.",
    },
    formula: "P = V x I x cos \u03c6",
    plannedInputs: {
      tr: [
        "Hat akımı",
        "Gerilim seviyesi ve sistem tipi",
        "Güç faktörü ve isteğe bağlı verim",
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
      ar: [
        "تيار الخط",
        "مستوى الجهد ونوع النظام",
        "معامل القدرة وكفاءة اختيارية",
      ],
    },
    useCases: {
      tr: [
        "Sahada mevcut hattın güç tahmini",
        "Yük dengeleme ve pano kontrolü",
        "Jeneratör veya UPS planlaması",
      ],
      en: [
        "Power estimate of an existing feeder in the field",
        "Load balancing and panel checks",
        "Generator or UPS planning",
      ],
      de: [
        "Leistungsabschätzung bestehender Leitungen vor Ort",
        "Lastverteilung und Schaltschrankkontrolle",
        "Planung von Generator oder USV",
      ],
      ar: [
        "تقدير قدرة مغذ موجود في الموقع",
        "موازنة الأحمال وفحص اللوحات",
        "تخطيط المولد أو UPS",
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
      ar: "motor-current-calculator",
    },
    titles: {
      tr: "Motor Akımı Hesaplama",
      en: "Motor Current Calculator",
      de: "Motorstrom Rechner",
      ar: "حاسبة تيار المحرك",
    },
    descriptions: {
      tr: "Motor gücü, gerilim, güç faktörü ve verime göre yaklaşık tam yük akımını çıkarmak için hazırlanan seçim aracı.",
      en: "Selection tool for estimating approximate full-load motor current from motor power, voltage, power factor and efficiency.",
      de: "Auswahlwerkzeug zur Abschätzung des ungefähren Motor-Nennstroms aus Motorleistung, Spannung, Leistungsfaktor und Wirkungsgrad.",
      ar: "أداة تقدير لاستخراج تيار الحمل الكامل التقريبي للمحرك من القدرة والجهد ومعامل القدرة والكفاءة.",
    },
    formula: "I = P / (\u221a3 x V x cos \u03c6 x \u03b7)",
    plannedInputs: {
      tr: [
        "Motor gücü ve motor tipi",
        "Besleme gerilimi ve faz tipi",
        "Güç faktörü, verim ve emniyet payı",
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
      ar: [
        "قدرة المحرك ونوعه",
        "جهد التغذية ونوع الطور",
        "معامل القدرة والكفاءة وهامش التصميم",
      ],
    },
    useCases: {
      tr: [
        "Kontakt or ve termik on seçimi",
        "Motor kablo ve sigorta boyutlandırması",
        "Proje keşiflerinde hızlı tam yük akımı kontrolü",
      ],
      en: [
        "Preselection of contactors and overload relays",
        "Motor cable and fuse sizing",
        "Quick full-load current checks during project estimation",
      ],
      de: [
        "Vorauswahl von Schützen und Motorschutz",
        "Motor-Kabel- und Sicherungsdimensionierung",
        "Schnelle Kontrolle des Nennstroms in der Projektphase",
      ],
      ar: [
        "اختيار أولي للكونتاكتور والحماية الحرارية",
        "تحديد مقطع كابل المحرك والفيوز",
        "فحص سريع لتيار الحمل أثناء التقدير",
      ],
    },
  },
];

const electricalHubCopy = {
  tr: {
    title: "Elektrik Hesapları",
    description:
      "Kablo kesiti, gerilim düşümü, kW-amper ve amper-kW dönüşümü, motor akımı ve Ohm yasası hesapları; tek faz, üç faz ve DC için formülüyle birlikte.",
    liveToolsTitle: "Hesaplayıcılar",
    relatedTitle: "Diğer mühendislik hesapları",
    relatedLinkLabel: "Tüm Mühendislik Hesaplayıcıları",
  },
  en: {
    title: "Electrical Calculators",
    description:
      "Cable size, voltage drop, kW to amps, amps to kW, motor current and Ohm's law calculators for single-phase, three-phase and DC circuits, each with its formula.",
    liveToolsTitle: "Calculators",
    relatedTitle: "More engineering calculators",
    relatedLinkLabel: "All Engineering Calculators",
  },
  de: {
    title: "Elektrorechner",
    description:
      "Rechner für Kabelquerschnitt, Spannungsfall, kW in Ampere, Ampere in kW, Motorstrom und ohmsches Gesetz für Einphasen-, Drehstrom- und Gleichstromkreise, jeweils mit Formel.",
    liveToolsTitle: "Rechner",
    relatedTitle: "Weitere Ingenieurrechner",
    relatedLinkLabel: "Alle Ingenieurrechner",
  },
  ar: {
    title: "الحاسبات الكهربائية",
    description:
      "حاسبات مقطع الكابل وهبوط الجهد وتحويل الكيلوواط إلى أمبير والعكس وتيار المحرك وقانون أوم للدوائر أحادية الطور وثلاثية الطور والتيار المستمر مع المعادلة.",
    liveToolsTitle: "الحاسبات",
    relatedTitle: "حاسبات هندسية أخرى",
    relatedLinkLabel: "كل الحاسبات الهندسية",
  },
} as const;

const plannedPreviewCopy = {
  tr: {
    breadcrumbLabel: "Sayfa yolu",
    homeLabel: "Ana Sayfa",
    hubLabel: "Mühendislik Hesaplayıcıları",
    electricalHubLabel: "Elektrik Hesapları",
    planningNote:
      "Bu rota su anda hesaplayıcı iskeleti olarak açık. Sayfa, kapsam ve iç link yapısını sabit tutarken hesap motoru tamamlandığında canlı araca dönecek.",
    scopeTitle: "Bu araç neyi çözecek?",
    inputsTitle: "Planlanan girişler",
    useCasesTitle: "Tipik kullanımlar",
    nextTitle: "Sonraki adım",
    nextBody:
      "Bu sayfa su anda indexe açılmadı. Hesap motoru, birim seçimleri ve test senaryoları eklendiğinde indekslenebilir canlı araca çevrilecek.",
    relatedTitle: "İlgili sayfalar",
    electricalHubLink: "Elektrik Hesapları merkezine don",
    liveToolLink: "Canlı Ohm Yasası aracını ac",
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
      "Diese Route ist derzeit als Rechner-Grundgerüst geöffnet. Sie stabilisiert Umfang und interne Verlinkung, wahrend die eigentliche Rechenlogik aufgebaut wird.",
    scopeTitle: "Was wird dieses Werkzeug losen?",
    inputsTitle: "Geplante Eingaben",
    useCasesTitle: "Typische Anwendungen",
    nextTitle: "Nächster Schritt",
    nextBody:
      "Diese Seite bleibt vorerst bewusst aus dem Index. Sobald Rechenlogik, Einheitenauswahl und Validierungsfalle vorliegen, wird sie in einen live indexierbaren Rechner umgewandelt.",
    relatedTitle: "Verwandte Seiten",
    electricalHubLink: "Zurück zum Elektrorechner-Zentrum",
    liveToolLink: "Live-Tool für das Ohmsche Gesetz öffnen",
    liveToolHref: "/de/rechner/ohms-law",
  },
  ar: {
    breadcrumbLabel: "مسار التنقل",
    homeLabel: "الرئيسية",
    hubLabel: "الحاسبات الهندسية",
    electricalHubLabel: "الحاسبات الكهربائية",
    planningNote:
      "هذا المسار مفتوح حاليا كهيكل حاسبة. الهدف منه تثبيت النطاق والروابط الداخلية إلى أن يكتمل محرك الحساب الفعلي.",
    scopeTitle: "ما الذي ستحله هذه الأداة؟",
    inputsTitle: "المدخلات المخططة",
    useCasesTitle: "حالات الاستخدام المعتادة",
    nextTitle: "الخطوة التالية",
    nextBody:
      "هذه الصفحة غير مفتوحة للفهرسة حاليا. بعد إضافة منطق الحساب وخيارات الوحدات وحالات التحقق ستتحول إلى حاسبة حية قابلة للفهرسة.",
    relatedTitle: "صفحات مرتبطة",
    electricalHubLink: "العودة إلى مركز الحاسبات الكهربائية",
    liveToolLink: "افتح أداة قانون أوم المتاحة",
    liveToolHref: "/ar/calculators/ohms-law",
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
