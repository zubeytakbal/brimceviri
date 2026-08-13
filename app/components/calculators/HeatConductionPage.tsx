import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorAreaUnitDefinitions,
  calculatorLengthUnitDefinitions,
  powerUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
  thermalConductivityUnitDefinitions,
  type CalculatorLocale,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import HeatConductionCalculator from "./HeatConductionCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

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
  presetHeading: string;
  unitsHeading: string;
  examplesHeading: string;
  applicationsHeading: string;
  limitationsHeading: string;
  sourcesHeading: string;
  relatedHeading: string;
  relatedCalculatorsHeading: string;
  relatedConversionsHeading: string;
  tableColumns: {
    unitName: string;
    symbol: string;
    siEquivalent: string;
    typicalUse: string;
  };
  intro: string[];
  formulas: string[];
  variables: Array<{ term: string; explanation: string }>;
  presetNotes: string[];
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedConversions: Array<{ label: string; href: string }>;
};

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  return [
    {
      id: "power-units",
      heading: locale === "tr" ? "Güç birimleri" : "Power units",
      siSymbol: "W",
      units: powerUnitDefinitions,
    },
    {
      id: "conductivity-units",
      heading:
        locale === "tr"
          ? "Isıl iletkenlik birimleri"
          : "Thermal-conductivity units",
      siSymbol: "W/(m·K)",
      units: thermalConductivityUnitDefinitions,
    },
    {
      id: "area-units",
      heading: locale === "tr" ? "Alan birimleri" : "Area units",
      siSymbol: "m²",
      units: calculatorAreaUnitDefinitions,
    },
    {
      id: "length-units",
      heading:
        locale === "tr" ? "Kalınlık birimleri" : "Thickness units",
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
    },
    {
      id: "temperature-difference-units",
      heading:
        locale === "tr"
          ? "Sıcaklık farkı birimleri"
          : "Temperature-difference units",
      siSymbol: "K",
      units: temperatureDifferenceUnitDefinitions,
    },
  ];
}

const pageCopy: Record<CalculatorLocale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar" },
      { label: "Isı İletimi Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Isı İletimi Hesaplayıcısı",
    description:
      "Q̇ = k × A × ΔT / L bağıntısıyla ısı geçiş hızını, ısıl iletkenliği, alanı, sıcaklık farkını veya kalınlığı hesaplayın. Sonuç SI eşdeğeri ve yerine koyulmuş formülle birlikte aynı mavi-turkuaz hesaplayıcı düzeninde gösterilir.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Isı iletimi hesabı neyi temsil eder?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve SI birimleri",
    presetHeading: "Malzeme ön ayarları hakkında",
    unitsHeading: "Birim tabloları",
    examplesHeading: "Örnek kullanım",
    applicationsHeading: "Tipik kullanım alanları",
    limitationsHeading: "Varsayımlar ve sınırlamalar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "İlgili bağlantılar",
    relatedCalculatorsHeading: "İlgili hesaplayıcılar",
    relatedConversionsHeading: "İlgili dönüşümler",
    tableColumns: {
      unitName: "Birim adı",
      symbol: "Sembol",
      siEquivalent: "SI karşılığı",
      typicalUse: "Yaygın kullanım",
    },
    intro: [
      "Bu araç düzlemsel ve tek boyutlu iletim yaklaşımı altında ısı geçiş hızını ya da formüldeki ters değişkenleri çözer.",
      "Yalıtım kalınlığı, plaka ısı kaybı, malzeme karşılaştırması ve ilk tasarım değerlendirmelerinde hızlı kontrol sağlar.",
    ],
    formulas: [
      "Q̇ = k × A × ΔT / L",
      "k = Q̇ × L / (A × ΔT)",
      "A = Q̇ × L / (k × ΔT)",
      "ΔT = Q̇ × L / (k × A)",
      "L = k × A × ΔT / Q̇",
    ],
    variables: [
      {
        term: "Q̇",
        explanation: "Isı geçiş hızı veya ısı akısıdır. SI birimi W.",
      },
      {
        term: "k",
        explanation: "Malzemenin ısıl iletkenliğidir. SI birimi W/(m·K).",
      },
      {
        term: "A",
        explanation: "Isı transferine katılan kesit veya yüzey alanıdır. SI birimi m².",
      },
      {
        term: "ΔT",
        explanation: "İki yüzey veya iki taraf arasındaki sıcaklık farkıdır. SI birimi K.",
      },
      {
        term: "L",
        explanation: "Isı iletim yönündeki kalınlıktır. SI birimi m.",
      },
    ],
    presetNotes: [
      "Bakır, alüminyum, çelik, cam, beton, ahşap ve hava ön ayarları yaklaşık oda koşulu değerleriyle sunulur.",
      "Gerçek iletkenlik; sıcaklık, lif yönü, nem, alaşım oranı ve üretim yöntemine göre belirgin biçimde değişebilir.",
    ],
    examples: [
      {
        title: "Bakır levha ile ısı geçişi",
        body:
          "k = 401 W/(m·K), A = 0.02 m², ΔT = 15 °C ve L = 0.02 m için ısı geçiş hızı 6.015 kW olur.",
      },
      {
        title: "Bilinen yük için gerekli yalıtım kalınlığı",
        body:
          "Q̇ = 200 W, k = 0.04 W/(m·K), A = 4 m² ve ΔT = 25 °C için gerekli kalınlık yaklaşık 20 mm bulunur.",
      },
    ],
    applications: [
      "Duvar ve yalıtım katmanı ilk boyutlandırmaları",
      "Plaka veya levha üzerinden ısı kaybı tahminleri",
      "Malzeme değişiminin iletim üzerindeki etkisini hızlı karşılaştırma",
      "Basit bir boyutlu iletim varsayımıyla eğitim ve ön proje hesapları",
    ],
    limitations: [
      "Bu formül tek boyutlu, kararlı ve sabit özellikli iletim varsayar.",
      "Temas direnci, çok katmanlı yapı, radyasyon ve taşınım etkileri bu temel çözümde yer almaz.",
      "Malzeme ön ayarları yaklaşık değerlerdir; kesin tasarım için üretici veya deneysel veri kullanılmalıdır.",
    ],
    sources: [
      {
        label: "OpenStax University Physics - Temperature and Heat",
        href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Isı Enerjisi Hesaplayıcısı",
        href: "/hesaplayicilar/isi-enerjisi",
      },
      {
        label: "Reynolds Sayısı Hesaplayıcısı",
        href: "/hesaplayicilar/reynolds-sayisi",
      },
    ],
    relatedConversions: [
      { label: "Metre → Santimetre", href: "/metre-santimetre" },
      { label: "Santimetre → İnç", href: "/santimetre-inc" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators" },
      { label: "Heat Conduction Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Heat Conduction Calculator",
    description:
      "Use Q̇ = k × A × ΔT / L to solve heat-transfer rate, thermal conductivity, area, temperature difference or thickness. The result is shown with an SI equivalent and substituted formula in the existing blue-turquoise calculator layout.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "What does this conduction tool represent?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and SI units",
    presetHeading: "About the material presets",
    unitsHeading: "Unit reference tables",
    examplesHeading: "Worked examples",
    applicationsHeading: "Typical applications",
    limitationsHeading: "Assumptions and limitations",
    sourcesHeading: "Sources",
    relatedHeading: "Related links",
    relatedCalculatorsHeading: "Related calculators",
    relatedConversionsHeading: "Related conversions",
    tableColumns: {
      unitName: "Unit name",
      symbol: "Symbol",
      siEquivalent: "SI equivalent",
      typicalUse: "Typical use",
    },
    intro: [
      "This tool solves a steady one-dimensional conduction relationship for heat-transfer rate or any inverse variable in the formula.",
      "It is helpful for insulation thickness checks, wall heat-loss estimates, material comparisons and first-pass thermal sizing.",
    ],
    formulas: [
      "Q̇ = k × A × ΔT / L",
      "k = Q̇ × L / (A × ΔT)",
      "A = Q̇ × L / (k × ΔT)",
      "ΔT = Q̇ × L / (k × A)",
      "L = k × A × ΔT / Q̇",
    ],
    variables: [
      {
        term: "Q̇",
        explanation: "Heat-transfer rate. SI unit: W.",
      },
      {
        term: "k",
        explanation: "Thermal conductivity of the material. SI unit: W/(m·K).",
      },
      {
        term: "A",
        explanation: "Area participating in the heat transfer. SI unit: m².",
      },
      {
        term: "ΔT",
        explanation: "Temperature difference across the layer. SI unit: K.",
      },
      {
        term: "L",
        explanation: "Thickness in the direction of heat flow. SI unit: m.",
      },
    ],
    presetNotes: [
      "Copper, aluminum, steel, glass, concrete, wood and air presets are provided as approximate room-condition values.",
      "Real conductivity can change significantly with temperature, fiber direction, moisture, alloy content and manufacturing method.",
    ],
    examples: [
      {
        title: "Heat flow through a copper plate",
        body:
          "For k = 401 W/(m·K), A = 0.02 m², ΔT = 15 °C and L = 0.02 m, the heat-transfer rate is 6.015 kW.",
      },
      {
        title: "Required insulation thickness for a known load",
        body:
          "With Q̇ = 200 W, k = 0.04 W/(m·K), A = 4 m² and ΔT = 25 °C, the required thickness is about 20 mm.",
      },
    ],
    applications: [
      "Preliminary wall and insulation sizing",
      "Heat-loss estimates through plates and flat layers",
      "Quick comparison of material conductivity choices",
      "Educational and concept-stage one-dimensional conduction checks",
    ],
    limitations: [
      "The formula assumes steady one-dimensional conduction with constant properties.",
      "Contact resistance, multilayer walls, radiation and convection are not included in this basic solution.",
      "Preset material values are approximate; use supplier or test data for final design work.",
    ],
    sources: [
      {
        label: "OpenStax University Physics - Temperature and Heat",
        href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Heat Energy Calculator",
        href: "/en/calculators/heat-energy",
      },
      {
        label: "Reynolds Number Calculator",
        href: "/en/calculators/reynolds-number",
      },
    ],
    relatedConversions: [
      { label: "Meters to Centimeters", href: "/en/meters-to-centimeters" },
      { label: "Centimeters to Inches", href: "/en/centimeters-to-inches" },
    ],
  },
};

function renderUnitName(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.trName : unit.enName;
}

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function HeatConductionPage({
  locale,
  structuredData,
}: {
  locale: CalculatorLocale;
  structuredData?: ReactNode;
}) {
  const copy = pageCopy[locale];
  const unitSections = getUnitSections(locale);

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

      <HeatConductionCalculator
        locale={locale}
        eyebrow={copy.heroEyebrow}
        title={copy.title}
        description={copy.description}
        resultHeading={copy.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{copy.introHeading}</h2>
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{copy.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.presetHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {copy.presetNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.unitsHeading}</h2>
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
            {copy.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{copy.sourcesHeading}</h2>
          <ol>
            {copy.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
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
            {copy.relatedCalculators.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{copy.relatedConversionsHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedConversions.map((item) => (
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
