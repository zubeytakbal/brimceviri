import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorLengthUnitDefinitions,
  currentUnitDefinitions,
  formatCalculatorUnitName,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { CalculatorLocale } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import { STANDARD_CROSS_SECTIONS_MM2 } from "../../converter/electricalConductor";
import CableSizeCalculator from "./CableSizeCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    voltage: "Gerilim birimleri",
    current: "Akim birimleri",
    length: "Uzunluk birimleri",
  },
  en: {
    voltage: "Voltage units",
    current: "Current units",
    length: "Length units",
  },
  de: {
    voltage: "Spannungseinheiten",
    current: "Stromeinheiten",
    length: "Langeneinheiten",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings = unitSectionHeadings[locale];

  return [
    {
      id: "voltage-units",
      heading: headings.voltage,
      siSymbol: "V",
      units: voltageUnitDefinitions,
    },
    {
      id: "current-units",
      heading: headings.current,
      siSymbol: "A",
      units: currentUnitDefinitions,
    },
    {
      id: "length-units",
      heading: headings.length,
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
    },
  ];
}

type PageCopy = {
  breadcrumbs: Array<{ label: string; href?: string }>;
  breadcrumbLabel: string;
  title: string;
  description: string;
  heroEyebrow: string;
  heroResultHeading: string;
  introHeading: string;
  formulasHeading: string;
  variablesHeading: string;
  unitsHeading: string;
  standardHeading: string;
  standardIntro: string;
  examplesHeading: string;
  applicationsHeading: string;
  limitationsHeading: string;
  sourcesHeading: string;
  relatedHeading: string;
  relatedCalculatorsHeading: string;
  relatedGuidesHeading: string;
  tableColumns: {
    unitName: string;
    symbol: string;
    siEquivalent: string;
    typicalUse: string;
  };
  intro: string[];
  formulas: string[];
  variables: Array<{ term: string; explanation: string }>;
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedGuides: Array<{ label: string; href: string }>;
};

const copy: Record<CalculatorLocale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      {
        label: "Elektrik Hesaplari",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
      { label: "Kablo Kesiti Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Kablo Kesiti Hesaplama",
    description:
      "Akim, mesafe, faz tipi ve izin verilen gerilim dusumune gore gerekli minimum iletken kesitini hesaplayin; sonuc en yakin standart keside de yuvarlanir.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Kesit sonucu",
    introHeading: "Bu kablo kesiti araci ne icin kullanilir?",
    formulasHeading: "Kullanilan formul",
    variablesHeading: "Degiskenler ve anlamlari",
    unitsHeading: "Birim tablolari",
    standardHeading: "Standart kesit tablosu",
    standardIntro:
      "Sonuc, asagidaki yaygin ticari kesit degerlerinden hesaplanan minimuma esit veya ondan buyuk olan ilk degere yuvarlanir (mm²):",
    examplesHeading: "Ornek kullanim",
    applicationsHeading: "Tipik kullanim alanlari",
    limitationsHeading: "Varsayimlar ve sinirlamalar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "Ilgili baglantilar",
    relatedCalculatorsHeading: "Ilgili hesaplayicilar",
    relatedGuidesHeading: "Ilgili birim rehberleri",
    tableColumns: {
      unitName: "Birim adi",
      symbol: "Sembol",
      siEquivalent: "SI karsiligi",
      typicalUse: "Yaygin kullanim",
    },
    intro: [
      "Bu arac, hat akimi, kablo uzunlugu, iletken malzemesi ve izin verilen gerilim dusumu yuzdesinden yola cikarak gerilim dusumu sinirini karsilayan minimum iletken kesitini hesaplar.",
      "Pano besleme hatlari, motor ve surucu baglantilari ve uzak saha ekipmani beslemeleri icin ilk kesit tahmini olarak kullanilabilir.",
    ],
    formulas: [
      "Genel: A = k x I x L x ρ / ΔU",
      "Bu, gerilim dusumu formulunun (ΔU = k x I x L x ρ / A) kesit icin cozulmus halidir.",
    ],
    variables: [
      { term: "I", explanation: "Hat akimidir." },
      { term: "L", explanation: "Kablonun tek yon uzunlugudur." },
      { term: "ρ", explanation: "Iletken malzemesinin ozgul direncidir (yaklasik 20°C icin bakir 0.0175, aluminyum 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Kaynak geriliminden ve izin verilen yuzdeden hesaplanan izin verilen volt dusumudur." },
      { term: "k", explanation: "Sistem tipine gore gidis-donus veya uc faz katsayisidir." },
      { term: "A", explanation: "Hesaplanan gerekli minimum kesittir." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, %3 izin verilen dusum, bakir, uc faz",
        body: "ΔU_izin = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 yaklasik 2.53 mm². En yakin standart kesit 4 mm² olur.",
      },
      {
        title: "230 V, 16 A, 25 m, %3 izin verilen dusum, bakir, tek faz",
        body: "ΔU_izin = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 yaklasik 2.03 mm². En yakin standart kesit 2.5 mm² olur.",
      },
    ],
    applications: [
      "Pano besleme hatlari",
      "Motor ve surucu baglantilari",
      "Uzak saha ekipmani beslemeleri",
      "Proje kesiflerinde hizli kesit on tahmini",
    ],
    limitations: [
      "Bu hesap yalnizca gerilim dusumu sinirina gore kesit onerir; akim tasima kapasitesi (ampacity), dosema yontemi, gruplama ve ortam sicakligi duzeltmeleri dahil degildir.",
      "Onerilen kesit, secilen elektrik tesisat yonetmeligine (orn. TS, IEC veya yerel yonetmelikler) gore ayrica ampacity tablolariyla dogrulanmalidir.",
      "Kullanilan ozgul direnc degerleri (bakir 0.0175, aluminyum 0.028 Ω·mm²/m) yaklasik 20°C referans degerleridir.",
      "Hesaplanan kesit 300 mm² standart tablosunun uzerindeyse arac bir standart deger onermez; ozel kesit veya paralel iletken cozumu degerlendirilmelidir.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Gerilim Dusumu Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/gerilim-dusumu-hesaplama",
      },
      {
        label: "kW to Amper Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
      },
      {
        label: "Elektrik Hesaplari merkezi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
    ],
    relatedGuides: [
      { label: "Amper (A) rehberi", href: "/birimler/amper" },
      { label: "Volt (V) rehberi", href: "/birimler/volt" },
      { label: "Metre (m) rehberi", href: "/birimler/metre" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      {
        label: "Electrical Calculators",
        href: "/en/engineering-calculators/electrical-calculators",
      },
      { label: "Cable Size Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Cable Size Calculator",
    description:
      "Calculate the minimum required conductor cross-section from current, distance, phase type and allowable voltage drop; the result is also rounded up to the nearest standard cross-section.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Cross-section result",
    introHeading: "What is this cable size tool used for?",
    formulasHeading: "Formula used",
    variablesHeading: "Variables and meaning",
    unitsHeading: "Unit reference tables",
    standardHeading: "Standard cross-section table",
    standardIntro:
      "The result is rounded up to the first value at or above the calculated minimum from these common commercial cross-sections (mm²):",
    examplesHeading: "Worked examples",
    applicationsHeading: "Typical applications",
    limitationsHeading: "Assumptions and limitations",
    sourcesHeading: "Sources",
    relatedHeading: "Related links",
    relatedCalculatorsHeading: "Related calculators",
    relatedGuidesHeading: "Related unit guides",
    tableColumns: {
      unitName: "Unit name",
      symbol: "Symbol",
      siEquivalent: "SI equivalent",
      typicalUse: "Typical use",
    },
    intro: [
      "This tool calculates the minimum conductor cross-section that satisfies a chosen voltage-drop limit, based on line current, cable length, conductor material and allowable voltage-drop percentage.",
      "It can be used as a first-pass cross-section estimate for panel feeder circuits, motor and drive connections and remote field-equipment feeds.",
    ],
    formulas: [
      "General: A = k x I x L x ρ / ΔU",
      "This is the voltage-drop formula (ΔU = k x I x L x ρ / A) solved for cross-section.",
    ],
    variables: [
      { term: "I", explanation: "Line current." },
      { term: "L", explanation: "One-way cable length." },
      { term: "ρ", explanation: "Conductor resistivity (approximate values at 20°C: copper 0.0175, aluminum 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Allowable voltage drop, computed from source voltage and the allowed percentage." },
      { term: "k", explanation: "Return-conductor or three-phase factor depending on system type." },
      { term: "A", explanation: "Calculated required minimum cross-section." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 3% allowable drop, copper, three-phase",
        body: "ΔU_allowed = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 which gives about 2.53 mm². The nearest standard cross-section is 4 mm².",
      },
      {
        title: "230 V, 16 A, 25 m, 3% allowable drop, copper, single-phase",
        body: "ΔU_allowed = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 which gives about 2.03 mm². The nearest standard cross-section is 2.5 mm².",
      },
    ],
    applications: [
      "Panel feeder circuits",
      "Motor and drive connections",
      "Remote field-equipment feeds",
      "Quick cross-section estimates during project estimation",
    ],
    limitations: [
      "This calculation recommends a cross-section based on the voltage-drop limit only; current-carrying capacity (ampacity), installation method, grouping and ambient-temperature corrections are not included.",
      "The recommended cross-section must be verified separately against ampacity tables in the applicable electrical code (e.g. IEC, national or local regulations).",
      "The resistivity values used (copper 0.0175, aluminum 0.028 Ω·mm²/m) are approximate 20°C reference values.",
      "If the calculated cross-section exceeds the 300 mm² standard table, the tool does not suggest a standard value; a custom cross-section or parallel conductors should be evaluated.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Voltage Drop Calculator",
        href: "/en/engineering-calculators/electrical-calculators/voltage-drop-calculator",
      },
      {
        label: "kW to Ampere Calculator",
        href: "/en/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
      },
      {
        label: "Electrical Calculators hub",
        href: "/en/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) guide", href: "/en/units/ampere" },
      { label: "Volt (V) guide", href: "/en/units/volt" },
      { label: "Meter (m) guide", href: "/en/units/meter" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      {
        label: "Elektrorechner",
        href: "/de/ingenieurrechner/elektrorechner",
      },
      { label: "Kabelquerschnitt Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Kabelquerschnitt Rechner",
    description:
      "Berechnen Sie den erforderlichen Mindestquerschnitt aus Strom, Entfernung, Phasentyp und zulassigem Spannungsfall; das Ergebnis wird zusatzlich auf den nachsten Normquerschnitt aufgerundet.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Querschnittsergebnis",
    introHeading: "Wofur wird dieses Kabelquerschnitt-Werkzeug verwendet?",
    formulasHeading: "Verwendete Formel",
    variablesHeading: "Variablen und Bedeutung",
    unitsHeading: "Einheitentabellen",
    standardHeading: "Normquerschnitt-Tabelle",
    standardIntro:
      "Das Ergebnis wird auf den ersten Wert aufgerundet, der grosser oder gleich dem berechneten Minimum ist, aus diesen gangigen Handelsquerschnitten (mm²):",
    examplesHeading: "Anwendungsbeispiele",
    applicationsHeading: "Typische Anwendungen",
    limitationsHeading: "Annahmen und Grenzen",
    sourcesHeading: "Quellen",
    relatedHeading: "Verwandte Links",
    relatedCalculatorsHeading: "Verwandte Rechner",
    relatedGuidesHeading: "Passende Einheitenleitfaden",
    tableColumns: {
      unitName: "Einheitenname",
      symbol: "Symbol",
      siEquivalent: "SI-Aquivalent",
      typicalUse: "Typische Verwendung",
    },
    intro: [
      "Dieses Werkzeug berechnet den Mindestquerschnitt, der eine gewahlte Spannungsfallgrenze einhalt, basierend auf Leitungsstrom, Kabellange, Leitermaterial und zulassigem Spannungsfall in Prozent.",
      "Es eignet sich als erste Querschnittsabschatzung fur Zuleitungen zu Schaltschranken, Motor- und Umrichteranschlusse sowie Versorgung entfernter Feldgerate.",
    ],
    formulas: [
      "Allgemein: A = k x I x L x ρ / ΔU",
      "Dies ist die nach dem Querschnitt aufgeloste Spannungsfallformel (ΔU = k x I x L x ρ / A).",
    ],
    variables: [
      { term: "I", explanation: "Leitungsstrom." },
      { term: "L", explanation: "Einfache Leitungslange." },
      { term: "ρ", explanation: "Spezifischer Widerstand des Leiters (Naherungswerte bei 20°C: Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Zulassiger Spannungsfall, berechnet aus Versorgungsspannung und zulassigem Prozentsatz." },
      { term: "k", explanation: "Ruckleiter- oder Dreiphasenfaktor je nach Systemtyp." },
      { term: "A", explanation: "Berechneter erforderlicher Mindestquerschnitt." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 3 % zulassiger Fall, Kupfer, dreiphasig",
        body: "ΔU_zulassig = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 und ergibt etwa 2.53 mm². Der nachste Normquerschnitt ist 4 mm².",
      },
      {
        title: "230 V, 16 A, 25 m, 3 % zulassiger Fall, Kupfer, einphasig",
        body: "ΔU_zulassig = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 und ergibt etwa 2.03 mm². Der nachste Normquerschnitt ist 2.5 mm².",
      },
    ],
    applications: [
      "Zuleitungen zu Schaltschranken",
      "Motor- und Umrichteranschlusse",
      "Versorgung entfernter Feldgerate",
      "Schnelle Querschnittsabschatzung in der Projektphase",
    ],
    limitations: [
      "Diese Berechnung empfiehlt einen Querschnitt nur anhand der Spannungsfallgrenze; Strombelastbarkeit (Ampacity), Verlegeart, Haufung und Temperaturkorrekturen sind nicht enthalten.",
      "Der empfohlene Querschnitt muss separat anhand von Ampacity-Tabellen der geltenden Elektrovorschrift (z. B. IEC, nationale oder lokale Vorschriften) bestatigt werden.",
      "Die verwendeten spezifischen Widerstande (Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m) sind Naherungswerte bei 20°C.",
      "Uberschreitet der berechnete Querschnitt die 300-mm²-Normtabelle, schlagt das Werkzeug keinen Normwert vor; ein Sonderquerschnitt oder parallele Leiter sollten geprueft werden.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Spannungsfall Rechner",
        href: "/de/ingenieurrechner/elektrorechner/spannungsfall-rechner",
      },
      {
        label: "kW-zu-Ampere Rechner",
        href: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
      },
      {
        label: "Elektrorechner-Zentrum",
        href: "/de/ingenieurrechner/elektrorechner",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) Leitfaden", href: "/de/einheiten/ampere" },
      { label: "Volt (V) Leitfaden", href: "/de/einheiten/volt" },
      { label: "Meter (m) Leitfaden", href: "/de/einheiten/meter" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function CableSizePage({
  locale = "tr",
  structuredData,
}: {
  locale?: CalculatorLocale;
  structuredData?: ReactNode;
}) {
  const unitSections = getUnitSections(locale);
  const strings = copy[locale];

  return (
    <main className="calculator-page">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label={strings.breadcrumbLabel}>
          {strings.breadcrumbs.map((breadcrumb, index) => (
            <span key={`${breadcrumb.label}-${index}`}>
              {index > 0 && <span aria-hidden="true">›</span>}
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <CableSizeCalculator
        locale={locale}
        eyebrow={strings.heroEyebrow}
        title={strings.title}
        description={strings.description}
        resultHeading={strings.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{strings.introHeading}</h2>
          {strings.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{strings.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.variablesHeading}</h2>
          <dl className="unit-facts">
            {strings.variables.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="conversion-section">
          <h2>{strings.standardHeading}</h2>
          <p>{strings.standardIntro}</p>
          <ul className="calculator-bullet-list">
            <li>{STANDARD_CROSS_SECTIONS_MM2.join(", ")}</li>
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.unitsHeading}</h2>
          <div className="calculator-unit-sections">
            {unitSections.map((section) => (
              <section
                className="calculator-unit-section"
                id={section.id}
                key={section.id}
              >
                <h3>{section.heading}</h3>

                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th>{strings.tableColumns.unitName}</th>
                        <th>{strings.tableColumns.symbol}</th>
                        <th>{strings.tableColumns.siEquivalent}</th>
                        <th>{strings.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{formatCalculatorUnitName(unit, locale)}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatEngineeringValue(unit.factorToSI, locale)}{" "}
                            {section.siSymbol}
                          </td>
                          <td>{renderTypicalUse(unit, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.examplesHeading}</h2>
          <div className="calculator-example-list">
            {strings.examples.map((example) => (
              <article key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.applicationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{strings.sourcesHeading}</h2>
          <ol>
            {strings.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="conversion-section">
          <h2>{strings.relatedHeading}</h2>

          <h3>{strings.relatedCalculatorsHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedCalculators.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{strings.relatedGuidesHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedGuides.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
