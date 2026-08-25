import Link from "next/link";
import type { ReactNode } from "react";
import {
  areaUnitDefinitions,
  forceUnitDefinitions,
  pressureUnitDefinitions,
  type EngineeringUnitDefinition,
} from "../../converter/engineeringUnits";
import {
  formatEngineeringValue,
  type CalculatorLocale,
} from "../../converter/pressureForceArea";
import PressureForceAreaCalculator from "./PressureForceAreaCalculator";

type Locale = CalculatorLocale;

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

type PageCopy = {
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  breadcrumbLabel: string;
  title: string;
  description: string;
  heroEyebrow: string;
  heroResultHeading: string;
  formulasHeading: string;
  variablesHeading: string;
  unitsHeading: string;
  examplesHeading: string;
  applicationsHeading: string;
  limitationsHeading: string;
  scientificNotesHeading: string;
  sourcesHeading: string;
  relatedHeading: string;
  relatedCalculatorsHeading: string;
  relatedConversionsHeading: string;
  relatedGuidesHeading: string;
  tableColumns: {
    unitName: string;
    symbol: string;
    siEquivalent: string;
    typicalUse: string;
  };
  formulas: string[];
  variables: Array<{
    term: string;
    explanation: string;
  }>;
  examples: Array<{
    title: string;
    body: string;
  }>;
  applications: string[];
  limitations: string[];
  scientificNotes: string[];
  sources: Array<{
    label: string;
    href: string;
  }>;
  relatedCalculators: Array<{
    label: string;
    href: string;
  }>;
  relatedConversions: Array<{
    label: string;
    href: string;
  }>;
  relatedGuides: Array<{
    label: string;
    href: string;
  }>;
};

const unitSectionHeadings = {
  tr: {
    pressure: "Basınç birimleri",
    force: "Kuvvet birimleri",
    area: "Alan birimleri",
  },
  en: {
    pressure: "Pressure units",
    force: "Force units",
    area: "Area units",
  },
  de: {
    pressure: "Druckeinheiten",
    force: "Krafteinheiten",
    area: "Flächeneinheiten",
  },
} as const;

function renderUnitTableSections(locale: Locale) {
  const headings = unitSectionHeadings[locale];

  return [
    {
      id: "pressure-units",
      heading: headings.pressure,
      siSymbol: "Pa",
      units: pressureUnitDefinitions,
    },
    {
      id: "force-units",
      heading: headings.force,
      siSymbol: "N",
      units: forceUnitDefinitions,
    },
    {
      id: "area-units",
      heading: headings.area,
      siSymbol: "m²",
      units: areaUnitDefinitions,
    },
  ] satisfies UnitTableSection[];
}

const pageCopy: Record<Locale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar", href: "/muhendislik-hesaplayicilari" },
      { label: "Basınç, Kuvvet ve Alan Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Basınç, Kuvvet ve Alan Hesaplayıcısı",
    description:
      "Basıncı, kuvveti veya alanı SI taban birimlerine çevirerek hesaplayın. Hesaplayıcı; Pa, hPa, kPa, MPa, GPa, bar, atm, kgf/cm², psi, ksi, N, kN, kgf, lbf, kip, m², cm², mm², ft² ve daha birçok birimi destekler.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenlerin açıklaması",
    unitsHeading: "Birim tabloları",
    examplesHeading: "Çözülmüş örnekler",
    applicationsHeading: "Kullanım alanları",
    limitationsHeading: "Sınırlamalar ve ölçüm doğruluğu",
    scientificNotesHeading: "Bilimsel notlar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "İlgili bağlantılar",
    relatedCalculatorsHeading: "İlgili hesaplayıcılar",
    relatedConversionsHeading: "Basınç dönüşümleri",
    relatedGuidesHeading: "Birim rehberleri",
    tableColumns: {
      unitName: "Birim adı",
      symbol: "Sembol",
      siEquivalent: "SI karşılığı",
      typicalUse: "Yaygın kullanım",
    },
    formulas: [
      "P = F / A",
      "F = P × A",
      "A = F / P",
      "1 Pa = 1 N/m²",
    ],
    variables: [
      {
        term: "P",
        explanation:
          "Basınçtır. Yüzeye dik uygulanan kuvvetin alana oranını ifade eder.",
      },
      {
        term: "F",
        explanation:
          "Kuvvettir. Hesaplamada yüzeye dik bileşen esas alınır.",
      },
      {
        term: "A",
        explanation:
          "Temas veya etkime alanıdır. Alan küçüldükçe aynı kuvvet daha yüksek ortalama basınç oluşturur.",
      },
    ],
    examples: [
      {
        title: "1000 N / 0.01 m² = 100000 Pa",
        body:
          "1000 N kuvvet 0.01 m² alana düzgün dağıtıldığında basınç 100000 Pa olur. Bu aynı zamanda 100 kPa değerine eşittir.",
      },
      {
        title: "1 kgf / 1 cm² = 98066.5 Pa",
        body:
          "1 kgf, standart yerçekimi altında 9.80665 N kabul edilir. 1 cm² ise 0.0001 m² olduğundan basınç 9.80665 / 0.0001 = 98066.5 Pa olur.",
      },
      {
        title: "1 kN / 100 cm² = 100 kPa",
        body:
          "1 kN önce 1000 N'a, 100 cm² ise 0.01 m²'ye çevrilir. 1000 / 0.01 = 100000 Pa ve sonuç 100 kPa olarak gösterilir.",
      },
      {
        title: "1 bar × 10 cm² = 100 N",
        body:
          "1 bar = 100000 Pa ve 10 cm² = 0.001 m² alınır. F = P × A olduğundan 100000 × 0.001 = 100 N bulunur.",
      },
      {
        title: "1 MPa × 1 mm² = 1 N",
        body:
          "1 MPa, 1000000 Pa değerine eşittir. 1 mm² ise 0.000001 m² olduğundan 1000000 × 0.000001 = 1 N sonucu elde edilir.",
      },
      {
        title: "1 lbf / 1 in² ≈ 1 psi",
        body:
          "1 lbf yaklaşık 4.4482216152605 N ve 1 in² tam olarak 0.00064516 m² kabul edilirse sonuç yaklaşık 6894.757 Pa, yani yaklaşık 1 psi olur.",
      },
    ],
    applications: [
      "Temas basıncı tahminleri",
      "Pres, kalıp ve sıkıştırma kuvveti hesapları",
      "Hidrolik ve pnömatik sistemlerin ilk boyutlandırması",
      "Lastik, conta ve yüzey yükü karşılaştırmaları",
    ],
    limitations: [
      "Bu hesap ortalama ve düzgün dağılmış basıncı temsil eder.",
      "Yerel gerilme yığılmaları, eğik kuvvetler, dinamik yükler ve malzeme deformasyonu için tek başına yeterli değildir.",
      "Basınç ile mekanik gerilme aynı birime sahip olsa da kullanım bağlamları farklı olabilir.",
    ],
    scientificNotes: [
      "kgf, gf ve teknik atmosfer hesaplarında standart yerçekimi ivmesi g₀ = 9.80665 m/s² kullanılır.",
      "mmHg, mmH₂O, cmH₂O, inHg ve inH₂O gibi sıvı sütunu birimleri tanım sıcaklığına ve kullanılan konvansiyona bağlı olabilir; bu hesaplayıcı belirtilen konvansiyonel dönüşüm katsayılarını kullanır.",
      "Kütle ile kuvvet aynı şey değildir; bu yüzden kg bir kuvvet birimi olarak sunulmaz, yalnızca kgf kullanılır.",
    ],
    sources: [
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Appendix B.9 Conversion Factors",
        href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
      },
    ],
    relatedCalculators: [
      {
        label: "Hidrostatik Basınç Hesaplayıcısı",
        href: "/hesaplayicilar/hidrostatik-basinc",
      },
      {
        label: "Mühendislik Hesaplayıcıları merkezi",
        href: "/muhendislik-hesaplayicilari",
      },
    ],
    relatedConversions: [
      { label: "PSI → Bar", href: "/psi-bar" },
      { label: "Kilopascal → Bar", href: "/kilopascal-bar" },
      { label: "Pascal → Bar", href: "/pascal-bar" },
    ],
    relatedGuides: [
      { label: "Pascal nedir?", href: "/birimler/pascal" },
      {
        label: "Kilopascal nedir?",
        href: "/birimler/kilopascal",
      },
      { label: "Bar nedir?", href: "/birimler/bar" },
      { label: "PSI nedir?", href: "/birimler/psi" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators", href: "/en/engineering-calculators" },
      { label: "Pressure, Force and Area Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Pressure, Force and Area Calculator",
    description:
      "Solve for pressure, force or area through SI base units. The calculator supports Pa, hPa, kPa, MPa, GPa, bar, atm, kgf/cm², psi, ksi, N, kN, kgf, lbf, kip, m², cm², mm², ft² and many more units.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    formulasHeading: "Formulas used",
    variablesHeading: "Meaning of the variables",
    unitsHeading: "Unit reference tables",
    examplesHeading: "Worked examples",
    applicationsHeading: "Typical applications",
    limitationsHeading: "Limitations and measurement accuracy",
    scientificNotesHeading: "Scientific notes",
    sourcesHeading: "Sources",
    relatedHeading: "Related links",
    relatedCalculatorsHeading: "Related calculators",
    relatedConversionsHeading: "Pressure conversions",
    relatedGuidesHeading: "Unit guides",
    tableColumns: {
      unitName: "Unit name",
      symbol: "Symbol",
      siEquivalent: "SI equivalent",
      typicalUse: "Typical use",
    },
    formulas: [
      "P = F / A",
      "F = P × A",
      "A = F / P",
      "1 Pa = 1 N/m²",
    ],
    variables: [
      {
        term: "P",
        explanation:
          "Pressure, defined as the normal force acting over a given area.",
      },
      {
        term: "F",
        explanation:
          "Force. The equation uses the component acting perpendicular to the surface.",
      },
      {
        term: "A",
        explanation:
          "Area of contact or action. The same force produces higher average pressure on a smaller area.",
      },
    ],
    examples: [
      {
        title: "1000 N / 0.01 m² = 100000 Pa",
        body:
          "A force of 1000 N distributed over 0.01 m² produces a pressure of 100000 Pa, which is also 100 kPa.",
      },
      {
        title: "1 kgf / 1 cm² = 98066.5 Pa",
        body:
          "Under standard gravity, 1 kgf equals 9.80665 N. Since 1 cm² equals 0.0001 m², the pressure becomes 9.80665 / 0.0001 = 98066.5 Pa.",
      },
      {
        title: "1 kN / 100 cm² = 100 kPa",
        body:
          "1 kN becomes 1000 N and 100 cm² becomes 0.01 m². Dividing 1000 by 0.01 gives 100000 Pa, or 100 kPa.",
      },
      {
        title: "1 bar × 10 cm² = 100 N",
        body:
          "1 bar equals 100000 Pa and 10 cm² equals 0.001 m². Using F = P × A gives 100000 × 0.001 = 100 N.",
      },
      {
        title: "1 MPa × 1 mm² = 1 N",
        body:
          "1 MPa equals 1000000 Pa. Since 1 mm² equals 0.000001 m², multiplying them gives exactly 1 N.",
      },
      {
        title: "1 lbf / 1 in² ≈ 1 psi",
        body:
          "With 1 lbf ≈ 4.4482216152605 N and 1 in² = 0.00064516 m², the result is about 6894.757 Pa, which is approximately 1 psi.",
      },
    ],
    applications: [
      "Contact pressure estimates",
      "Pressing, clamping and tooling calculations",
      "Preliminary hydraulic and pneumatic sizing",
      "Comparisons of tire, seal and surface loads",
    ],
    limitations: [
      "The result represents an average and uniformly distributed pressure.",
      "It is not sufficient on its own for stress concentrations, inclined forces, dynamic loading or material deformation.",
      "Pressure and mechanical stress share the same unit, but they are not always used in the same engineering context.",
    ],
    scientificNotes: [
      "kgf, gf and technical-atmosphere calculations use the standard acceleration of gravity g₀ = 9.80665 m/s².",
      "Liquid-column units such as mmHg, mmH₂O, cmH₂O, inHg and inH₂O can vary with the defining temperature and convention; this calculator uses the stated conventional conversion factors.",
      "Mass and force are not the same quantity, so kg is not presented as a force unit; only kgf is included.",
    ],
    sources: [
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Appendix B.9 Conversion Factors",
        href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
      },
    ],
    relatedCalculators: [
      {
        label: "Hydrostatic Pressure Calculator",
        href: "/en/calculators/hydrostatic-pressure",
      },
      {
        label: "Engineering Calculators hub",
        href: "/en/engineering-calculators",
      },
    ],
    relatedConversions: [
      { label: "PSI to Bar", href: "/en/psi-to-bars" },
      {
        label: "Kilopascal to Bar",
        href: "/en/kilopascals-to-bars",
      },
      { label: "Pascal to Bar", href: "/en/pascals-to-bars" },
    ],
    relatedGuides: [
      {
        label: "What is Pascal?",
        href: "/en/units/pascal",
      },
      {
        label: "What is Kilopascal?",
        href: "/en/units/kilopascal",
      },
      { label: "What is Bar?", href: "/en/units/bar" },
      { label: "What is PSI?", href: "/en/units/psi" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Rechner", href: "/de/ingenieurrechner" },
      { label: "Druck-, Kraft- und Flächenrechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Druck-, Kraft- und Flächenrechner",
    description:
      "Berechnen Sie Druck, Kraft oder Fläche über SI-Basiseinheiten. Der Rechner unterstützt Pa, hPa, kPa, MPa, GPa, bar, atm, kgf/cm², psi, ksi, N, kN, kgf, lbf, kip, m², cm², mm², ft² und viele weitere Einheiten.",
    heroEyebrow: "INGENIEURRECHNER",
    heroResultHeading: "Berechnungsergebnis",
    formulasHeading: "Verwendete Formeln",
    variablesHeading: "Bedeutung der Variablen",
    unitsHeading: "Einheitentabellen",
    examplesHeading: "Berechnete Beispiele",
    applicationsHeading: "Typische Anwendungsbereiche",
    limitationsHeading: "Einschränkungen und Messgenauigkeit",
    scientificNotesHeading: "Wissenschaftliche Hinweise",
    sourcesHeading: "Quellen",
    relatedHeading: "Verwandte Links",
    relatedCalculatorsHeading: "Verwandte Rechner",
    relatedConversionsHeading: "Druckumrechnungen",
    relatedGuidesHeading: "Einheitenratgeber",
    tableColumns: {
      unitName: "Einheitenname",
      symbol: "Symbol",
      siEquivalent: "SI-Äquivalent",
      typicalUse: "Typische Verwendung",
    },
    formulas: [
      "P = F / A",
      "F = P × A",
      "A = F / P",
      "1 Pa = 1 N/m²",
    ],
    variables: [
      {
        term: "P",
        explanation:
          "Druck, definiert als die senkrecht auf eine Fläche wirkende Kraft geteilt durch diese Fläche.",
      },
      {
        term: "F",
        explanation:
          "Kraft. In der Gleichung wird die senkrecht zur Oberfläche wirkende Komponente verwendet.",
      },
      {
        term: "A",
        explanation:
          "Kontakt- oder Wirkfläche. Dieselbe Kraft erzeugt auf einer kleineren Fläche einen höheren mittleren Druck.",
      },
    ],
    examples: [
      {
        title: "1000 N / 0,01 m² = 100000 Pa",
        body:
          "Eine Kraft von 1000 N, gleichmäßig auf 0,01 m² verteilt, erzeugt einen Druck von 100000 Pa, also 100 kPa.",
      },
      {
        title: "1 kgf / 1 cm² = 98066,5 Pa",
        body:
          "Unter Standardschwerkraft entspricht 1 kgf 9,80665 N. Da 1 cm² gleich 0,0001 m² ist, ergibt sich ein Druck von 9,80665 / 0,0001 = 98066,5 Pa.",
      },
      {
        title: "1 kN / 100 cm² = 100 kPa",
        body:
          "1 kN wird zu 1000 N und 100 cm² zu 0,01 m². Aus 1000 / 0,01 ergibt sich 100000 Pa, also 100 kPa.",
      },
      {
        title: "1 bar × 10 cm² = 100 N",
        body:
          "1 bar entspricht 100000 Pa und 10 cm² entsprechen 0,001 m². Mit F = P × A ergibt sich 100000 × 0,001 = 100 N.",
      },
      {
        title: "1 MPa × 1 mm² = 1 N",
        body:
          "1 MPa entspricht 1000000 Pa. Da 1 mm² gleich 0,000001 m² ist, ergibt die Multiplikation genau 1 N.",
      },
      {
        title: "1 lbf / 1 in² ≈ 1 psi",
        body:
          "Mit 1 lbf ≈ 4,4482216152605 N und 1 in² = 0,00064516 m² ergibt sich ein Wert von etwa 6894,757 Pa, also näherungsweise 1 psi.",
      },
    ],
    applications: [
      "Abschätzungen des Kontaktdrucks",
      "Berechnungen für Pressen, Spannen und Werkzeugkräfte",
      "Erste Auslegung von Hydraulik- und Pneumatiksystemen",
      "Vergleiche von Reifen-, Dichtungs- und Flächenlasten",
    ],
    limitations: [
      "Das Ergebnis stellt einen mittleren, gleichmäßig verteilten Druck dar.",
      "Es reicht allein nicht aus für Spannungskonzentrationen, geneigte Kräfte, dynamische Belastungen oder Materialverformungen.",
      "Druck und mechanische Spannung haben dieselbe Einheit, werden aber nicht immer im gleichen technischen Zusammenhang verwendet.",
    ],
    scientificNotes: [
      "Bei Berechnungen mit kgf, gf und technischer Atmosphäre wird die Standard-Erdbeschleunigung g₀ = 9,80665 m/s² verwendet.",
      "Flüssigkeitssäulen-Einheiten wie mmHg, mmH₂O, cmH₂O, inHg und inH₂O können je nach Bezugstemperatur und Konvention variieren; dieser Rechner verwendet die angegebenen konventionellen Umrechnungsfaktoren.",
      "Masse und Kraft sind nicht dieselbe Größe, daher wird kg nicht als Krafteinheit angeboten; es wird nur kgf verwendet.",
    ],
    sources: [
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Appendix B.9 Conversion Factors",
        href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
      },
    ],
    relatedCalculators: [
      {
        label: "Hydrostatischer-Druck-Rechner",
        href: "/de/rechner/hydrostatischer-druck",
      },
      {
        label: "Ingenieurrechner-Zentrum",
        href: "/de/ingenieurrechner",
      },
    ],
    relatedConversions: [
      { label: "PSI → Bar", href: "/de/psi-bar" },
      {
        label: "Kilopascal → Bar",
        href: "/de/kilopascal-bar",
      },
      { label: "Pascal → Bar", href: "/de/pascal-bar" },
    ],
    relatedGuides: [
      {
        label: "Was ist Pascal?",
        href: "/de/einheiten/pascal",
      },
      {
        label: "Was ist Kilopascal?",
        href: "/de/einheiten/kilopascal",
      },
      { label: "Was ist Bar?", href: "/de/einheiten/bar" },
      { label: "Was ist PSI?", href: "/de/einheiten/psi" },
    ],
  },
};

function renderUnitName(
  unit: EngineeringUnitDefinition,
  locale: Locale
) {
  return locale === "tr" ? unit.trName : unit.enName;
}

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: Locale
) {
  return locale === "tr"
    ? unit.typicalUseTr
    : unit.typicalUseEn;
}

export default function PressureForceAreaPage({
  locale,
  structuredData,
}: {
  locale: Locale;
  structuredData?: ReactNode;
}) {
  const copy = pageCopy[locale];
  const unitTableSections = renderUnitTableSections(locale);

  return (
    <main className="calculator-page">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label={copy.breadcrumbLabel}
        >
          {copy.breadcrumbs.map((breadcrumb, index) => (
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

      <PressureForceAreaCalculator
        locale={locale}
        eyebrow={copy.heroEyebrow}
        title={copy.title}
        description={copy.description}
        resultHeading={copy.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{copy.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.variablesHeading}</h2>
          <dl className="unit-facts">
            {copy.variables.map((variable) => (
              <div key={variable.term}>
                <dt>{variable.term}</dt>
                <dd>{variable.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="conversion-section">
          <h2>{copy.unitsHeading}</h2>
          <div className="calculator-unit-sections">
            {unitTableSections.map((section) => (
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
                        <th>{copy.tableColumns.unitName}</th>
                        <th>{copy.tableColumns.symbol}</th>
                        <th>{copy.tableColumns.siEquivalent}</th>
                        <th>{copy.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{renderUnitName(unit, locale)}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatEngineeringValue(
                              unit.factorToSI,
                              locale
                            )}{" "}
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
          <h2>{copy.scientificNotesHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {copy.scientificNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.examplesHeading}</h2>
          <div className="calculator-example-list">
            {copy.examples.map((example) => (
              <article key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.applicationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{copy.sourcesHeading}</h2>
          <ol>
            {copy.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="conversion-section">
          <h2>{copy.relatedHeading}</h2>

          <h3>{copy.relatedCalculatorsHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedCalculators.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{copy.relatedConversionsHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedConversions.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{copy.relatedGuidesHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedGuides.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
