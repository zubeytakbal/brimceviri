import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorAreaUnitDefinitions,
  calculatorLengthUnitDefinitions,
  powerUnitDefinitions,
  thermalConductivityUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { temperatureDifferenceUnitDefinitions } from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  calculatorAreaUnitNamesUz,
  calculatorLengthUnitNamesUz,
  powerUnitNamesUz,
  thermalConductivityUnitNamesUz,
} from "../../converter/heatConductionUnitNamesUz";
import { conductivityPresetsUz } from "../../converter/heatConductionUz";
import { temperatureDifferenceUnitNamesUz } from "../../converter/heatEnergyUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import HeatConductionCalculatorUz from "./HeatConductionCalculatorUz";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
  names: Record<string, { name: string; use: string }>;
};

function getUnitTableSections(): UnitTableSection[] {
  return [
    {
      id: "power-units",
      heading: "Issiqlik o'tish tezligi birliklari",
      siSymbol: "W",
      units: powerUnitDefinitions,
      names: powerUnitNamesUz,
    },
    {
      id: "conductivity-units",
      heading: "Issiqlik o'tkazuvchanligi birliklari",
      siSymbol: "W/(m·K)",
      units: thermalConductivityUnitDefinitions,
      names: thermalConductivityUnitNamesUz,
    },
    {
      id: "area-units",
      heading: "Maydon birliklari",
      siSymbol: "m²",
      units: calculatorAreaUnitDefinitions,
      names: calculatorAreaUnitNamesUz,
    },
    {
      id: "temperature-difference-units",
      heading: "Harorat farqi birliklari",
      siSymbol: "K",
      units: temperatureDifferenceUnitDefinitions,
      names: temperatureDifferenceUnitNamesUz,
    },
    {
      id: "length-units",
      heading: "Uzunlik birliklari",
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
      names: calculatorLengthUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Issiqlik O'tkazuvchanligi Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Issiqlik O'tkazuvchanligi Hisoblagichi",
  description:
    "Q̇ = k × A × ΔT / L yordamida issiqlik o'tish tezligini, issiqlik o'tkazuvchanligini, maydonni, harorat farqini yoki qalinlikni hisoblang. Natija SI ekvivalenti va o'rniga qo'yilgan formula bilan birga ko'rsatiladi.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  introHeading: "Bu o'tkazuvchanlik vositasi nimani ifodalaydi?",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilar va SI birliklari",
  presetHeading: "Material andozalari haqida",
  materialTableHeading: "Material Issiqlik O'tkazuvchanligi Jadvali",
  materialTableColumns: {
    material: "Material",
    conductivity: "Issiqlik O'tkazuvchanligi (W/(m·K))",
  },
  unitsHeading: "Birlik ma'lumotnoma jadvallari",
  examplesHeading: "Yechilgan misollar",
  applicationsHeading: "Odatiy qo'llanish sohalari",
  limitationsHeading: "Taxminlar va cheklovlar",
  sourcesHeading: "Manbalar",
  relatedHeading: "Tegishli havolalar",
  relatedCalculatorsHeading: "Tegishli hisoblagichlar",
  tableColumns: {
    unitName: "Birlik nomi",
    symbol: "Belgi",
    siEquivalent: "SI ekvivalenti",
    typicalUse: "Odatiy qo'llanish",
  },
  intro: [
    "Bu vosita bir o'lchamli barqaror o'tkazuvchanlik bog'lanishini issiqlik o'tish tezligi yoki formuladagi istalgan teskari o'zgaruvchi uchun yechadi.",
    "Izolyatsiya qalinligini tekshirish, devor issiqlik yo'qotishini baholash, material solishtirish va dastlabki termal o'lchamlash uchun foydali.",
  ],
  formulas: [
    "Q̇ = k × A × ΔT / L",
    "k = Q̇ × L / (A × ΔT)",
    "A = Q̇ × L / (k × ΔT)",
    "ΔT = Q̇ × L / (k × A)",
    "L = k × A × ΔT / Q̇",
  ],
  variables: [
    { term: "Q̇", explanation: "Issiqlik o'tish tezligi. SI birligi: W." },
    { term: "k", explanation: "Materialning issiqlik o'tkazuvchanligi. SI birligi: W/(m·K)." },
    { term: "A", explanation: "Issiqlik o'tishida ishtirok etadigan maydon. SI birligi: m²." },
    { term: "ΔT", explanation: "Qatlam bo'ylab harorat farqi. SI birligi: K." },
    { term: "L", explanation: "Issiqlik oqimi yo'nalishidagi qalinlik. SI birligi: m." },
  ],
  presetNotes: [
    "Mis, alyuminiy, po'lat, shisha, beton, yog'och va havo andozalari xona sharoitiga mos taxminiy qiymatlar sifatida berilgan.",
    "Haqiqiy o'tkazuvchanlik harorat, tola yo'nalishi, namlik, qotishma tarkibi va ishlab chiqarish usuliga qarab sezilarli o'zgarishi mumkin.",
    "Shisha jun, tosh jun, EPS, XPS va poliuretan ko'pik qiymatlari TS 825 standarti bo'yicha odatiy hisoblash qiymatlari; haqiqiy qiymatlar zichlik va ishlab chiqaruvchiga qarab farq qiladi.",
  ],
  examples: [
    {
      title: "Mis plastinka orqali issiqlik oqimi",
      body: "k = 401 W/(m·K), A = 0,02 m², ΔT = 15 °C va L = 0,02 m uchun issiqlik o'tish tezligi 6,015 kVt bo'ladi.",
    },
    {
      title: "Ma'lum yuk uchun kerakli izolyatsiya qalinligi",
      body: "Q̇ = 200 W, k = 0,04 W/(m·K), A = 4 m² va ΔT = 25 °C uchun kerakli qalinlik taxminan 20 mm bo'ladi.",
    },
  ],
  applications: [
    "Devor va izolyatsiyaning dastlabki o'lchamlashi",
    "Plastinka va yassi qatlamlar orqali issiqlik yo'qotilishini baholash",
    "Material o'tkazuvchanlik tanlovlarini tezkor solishtirish",
    "Ta'lim va konseptual bosqichdagi bir o'lchamli o'tkazuvchanlik tekshiruvlari",
  ],
  limitations: [
    "Formula doimiy xususiyatlarga ega barqaror bir o'lchamli o'tkazuvchanlikni taxmin qiladi.",
    "Kontakt qarshiligi, ko'p qatlamli devorlar, nurlanish va konveksiya bu asosiy yechimga kiritilmagan.",
    "Andoza material qiymatlari taxminiy; yakuniy loyihalash uchun ta'minotchi yoki sinov ma'lumotlaridan foydalaning.",
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
      label: "Issiqlik Energiyasi Hisoblagichi",
      href: "/uz/issiqlik-energiyasi-hisoblash",
    },
    {
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
};

export default function HeatConductionPageUz({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitTableSections = getUnitTableSections();

  return (
    <main className="calculator-page" lang="uz">
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

      <HeatConductionCalculatorUz
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
          <h2>{strings.presetHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {strings.presetNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>{strings.materialTableHeading}</caption>
              <thead>
                <tr>
                  <th scope="col">{strings.materialTableColumns.material}</th>
                  <th scope="col">{strings.materialTableColumns.conductivity}</th>
                </tr>
              </thead>
              <tbody>
                {conductivityPresetsUz
                  .filter((preset) => preset.id !== "custom")
                  .map((preset) => (
                    <tr key={preset.id}>
                      <td>{preset.label}</td>
                      <td>{preset.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.unitsHeading}</h2>
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
                        <th>{strings.tableColumns.unitName}</th>
                        <th>{strings.tableColumns.symbol}</th>
                        <th>{strings.tableColumns.siEquivalent}</th>
                        <th>{strings.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{section.names[unit.enName]?.name ?? unit.enName}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatUzValue(unit.factorToSI)} {section.siSymbol}
                          </td>
                          <td>{section.names[unit.enName]?.use ?? unit.typicalUseEn}</td>
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
            {strings.relatedCalculators.map((link) => (
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
