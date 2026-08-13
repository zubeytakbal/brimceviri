import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorMassUnitDefinitions,
  heatEnergyUnitDefinitions,
  specificHeatUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
  type CalculatorLocale,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import HeatEnergyCalculator from "./HeatEnergyCalculator";

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
      id: "energy-units",
      heading: locale === "tr" ? "Enerji birimleri" : "Energy units",
      siSymbol: "J",
      units: heatEnergyUnitDefinitions,
    },
    {
      id: "mass-units",
      heading: locale === "tr" ? "Kütle birimleri" : "Mass units",
      siSymbol: "kg",
      units: calculatorMassUnitDefinitions,
    },
    {
      id: "specific-heat-units",
      heading:
        locale === "tr"
          ? "Özgül ısı birimleri"
          : "Specific-heat units",
      siSymbol: "J/(kg·K)",
      units: specificHeatUnitDefinitions,
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
      { label: "Isı Enerjisi Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Isı Enerjisi Hesaplayıcısı",
    description:
      "Q = m × c × ΔT bağıntısıyla ısı enerjisini, kütleyi, özgül ısıyı veya sıcaklık farkını SI temelli olarak hesaplayın. Sonuç okunabilir birimle, SI eşdeğeri ve yerine koyulmuş formülle birlikte gösterilir.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Isı enerjisi hesabı ne için kullanılır?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve anlamları",
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
      "Bu araç, bir malzemenin sıcaklığını belirli bir aralıkta değiştirmek için gereken ısı enerjisini veya ters yöndeki temel değişkenleri hesaplar.",
      "Özellikle proses ısıtması, su depoları, deney düzenekleri ve ilk tasarım kontrollerinde hızlı mühendislik yaklaşımı sunar.",
    ],
    formulas: [
      "Q = m × c × ΔT",
      "m = Q / (c × ΔT)",
      "c = Q / (m × ΔT)",
      "ΔT = Q / (m × c)",
    ],
    variables: [
      {
        term: "Q",
        explanation: "Aktarılan veya depolanan ısı enerjisidir.",
      },
      {
        term: "m",
        explanation: "Isınan ya da soğuyan kütledir.",
      },
      {
        term: "c",
        explanation:
          "Malzemenin özgül ısısıdır; malzeme türüne göre değişir.",
      },
      {
        term: "ΔT",
        explanation:
          "Başlangıç ve son durum arasındaki sıcaklık farkıdır.",
      },
    ],
    examples: [
      {
        title: "2 kg suyu 20 °C ısıtmak",
        body:
          "Yaklaşık 4186 J/(kg·K) özgül ısı için 2 kg suyu 20 °C yükseltmek 167.44 kJ enerji gerektirir.",
      },
      {
        title: "84 kJ ile 1 kg suyu ne kadar ısıtırsınız?",
        body:
          "1 kg su ve 4186 J/(kg·K) için sıcaklık farkı yaklaşık 20.07 °C bulunur.",
      },
    ],
    applications: [
      "Su ve proses akışkanlarını ısıtma ön boyutlandırmaları",
      "Malzeme ısı kapasitesi karşılaştırmaları",
      "Depolama tankı ve batch ısıtma hesapları",
      "Laboratuvar ve eğitim amaçlı termal denge örnekleri",
    ],
    limitations: [
      "Özgül ısının sıcaklık boyunca sabit kabul edildiği basitleştirilmiş bir yaklaşımdır.",
      "Faz değişimi, kayıp ısı, karışım etkisi ve basınca bağlı özellik değişimleri bu temel formülde yer almaz.",
      "Ters hesaplamalarda fiziksel olarak anlamlı sonuç için kütle ve özgül ısı pozitif, sıcaklık farkı ise sıfırdan farklı olmalıdır.",
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
        label: "Isı İletimi Hesaplayıcısı",
        href: "/hesaplayicilar/isi-iletimi",
      },
      {
        label: "Reynolds Sayısı Hesaplayıcısı",
        href: "/hesaplayicilar/reynolds-sayisi",
      },
    ],
    relatedConversions: [
      { label: "Kilogram → Gram", href: "/kilogram-gram" },
      { label: "Gram → Kilogram", href: "/gram-kilogram" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators" },
      { label: "Heat Energy Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Heat Energy Calculator",
    description:
      "Use Q = m × c × ΔT to calculate heat energy, mass, specific heat or temperature difference through SI-based conversions. The result is shown in a readable unit with its SI equivalent and substituted formula.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "What is this heat-energy tool for?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and meaning",
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
      "This tool calculates the thermal energy needed to change a material temperature over a given interval or solves the inverse variable directly.",
      "It is useful for quick engineering estimates in process heating, water tanks, lab setups and first-pass thermal sizing.",
    ],
    formulas: [
      "Q = m × c × ΔT",
      "m = Q / (c × ΔT)",
      "c = Q / (m × ΔT)",
      "ΔT = Q / (m × c)",
    ],
    variables: [
      {
        term: "Q",
        explanation: "Transferred or stored heat energy.",
      },
      {
        term: "m",
        explanation: "Mass being heated or cooled.",
      },
      {
        term: "c",
        explanation:
          "Specific heat capacity of the material.",
      },
      {
        term: "ΔT",
        explanation:
          "Temperature difference between the initial and final states.",
      },
    ],
    examples: [
      {
        title: "Heating 2 kg of water by 20 °C",
        body:
          "Using approximately 4186 J/(kg·K), heating 2 kg of water by 20 °C requires 167.44 kJ.",
      },
      {
        title: "How much can 84 kJ heat 1 kg of water?",
        body:
          "For 1 kg of water and 4186 J/(kg·K), the temperature rise is about 20.07 °C.",
      },
    ],
    applications: [
      "Preliminary heating-load estimates for water and process fluids",
      "Comparing material heat capacities",
      "Batch and storage-tank heating checks",
      "Laboratory and educational thermal-balance examples",
    ],
    limitations: [
      "The method assumes specific heat stays constant over the temperature interval.",
      "Phase change, heat loss, mixture effects and pressure-dependent property shifts are not included in this basic formula.",
      "Reverse calculations require physically meaningful inputs: positive mass and specific heat, and a non-zero temperature difference where division is involved.",
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
        label: "Heat Conduction Calculator",
        href: "/en/calculators/heat-conduction",
      },
      {
        label: "Reynolds Number Calculator",
        href: "/en/calculators/reynolds-number",
      },
    ],
    relatedConversions: [
      { label: "Kilograms to Grams", href: "/en/kilograms-to-grams" },
      { label: "Grams to Kilograms", href: "/en/grams-to-kilograms" },
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

export default function HeatEnergyPage({
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

      <HeatEnergyCalculator
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
          <h2>{copy.variablesHeading}</h2>
          <dl className="unit-facts">
            {copy.variables.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.explanation}</dd>
              </div>
            ))}
          </dl>
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
