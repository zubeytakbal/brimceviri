import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorMassUnitDefinitions,
  heatEnergyUnitDefinitions,
  specificHeatUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  calculatorMassUnitNamesUz,
  heatEnergyUnitNamesUz,
  specificHeatUnitNamesUz,
  temperatureDifferenceUnitNamesUz,
} from "../../converter/heatEnergyUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import HeatEnergyCalculatorUz from "./HeatEnergyCalculatorUz";

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
      id: "energy-units",
      heading: "Issiqlik energiyasi birliklari",
      siSymbol: "J",
      units: heatEnergyUnitDefinitions,
      names: heatEnergyUnitNamesUz,
    },
    {
      id: "mass-units",
      heading: "Massa birliklari",
      siSymbol: "kg",
      units: calculatorMassUnitDefinitions,
      names: calculatorMassUnitNamesUz,
    },
    {
      id: "specific-heat-units",
      heading: "Solishtirma issiqlik birliklari",
      siSymbol: "J/(kg·K)",
      units: specificHeatUnitDefinitions,
      names: specificHeatUnitNamesUz,
    },
    {
      id: "temperature-difference-units",
      heading: "Harorat farqi birliklari",
      siSymbol: "K",
      units: temperatureDifferenceUnitDefinitions,
      names: temperatureDifferenceUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Issiqlik Energiyasi Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Issiqlik Energiyasi Hisoblagichi",
  description:
    "Q = m × c × ΔT yordamida issiqlik energiyasini, massani, solishtirma issiqlikni yoki harorat farqini SI asosidagi aylantirishlar orqali hisoblang. Natija o'qish uchun qulay birlikda, SI ekvivalenti va o'rniga qo'yilgan formula bilan birga ko'rsatiladi.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  introHeading: "Bu issiqlik-energiyasi vositasi nima uchun ishlatiladi?",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilar va ma'nolari",
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
    "Bu vosita berilgan oraliqda material haroratini o'zgartirish uchun kerakli issiqlik energiyasini hisoblaydi yoki teskari o'zgaruvchini to'g'ridan-to'g'ri yechadi.",
    "Jarayonli isitish, suv tanklari, laboratoriya sozlamalari va dastlabki termal o'lchamlashda tezkor muhandislik baholari uchun foydali.",
  ],
  formulas: ["Q = m × c × ΔT", "m = Q / (c × ΔT)", "c = Q / (m × ΔT)", "ΔT = Q / (m × c)"],
  variables: [
    { term: "Q", explanation: "Uzatilgan yoki saqlangan issiqlik energiyasi." },
    { term: "m", explanation: "Isitilayotgan yoki sovutilayotgan massa." },
    { term: "c", explanation: "Materialning solishtirma issiqlik sig'imi." },
    {
      term: "ΔT",
      explanation: "Boshlang'ich va yakuniy holatlar orasidagi harorat farqi.",
    },
  ],
  examples: [
    {
      title: "2 kg suvni 20 °C ga isitish",
      body: "Taxminan 4186 J/(kg·K) qiymatidan foydalanilganda, 2 kg suvni 20 °C ga isitish uchun 167,44 kJ kerak bo'ladi.",
    },
    {
      title: "84 kJ 1 kg suvni qancha isitadi?",
      body: "1 kg suv va 4186 J/(kg·K) uchun harorat ko'tarilishi taxminan 20,07 °C bo'ladi.",
    },
  ],
  applications: [
    "Suv va jarayon suyuqliklari uchun dastlabki isitish yuki baholari",
    "Material issiqlik sig'imlarini solishtirish",
    "Partiya va saqlash tanki isitish tekshiruvlari",
    "Laboratoriya va ta'lim maqsadidagi termal balans misollari",
  ],
  limitations: [
    "Usul solishtirma issiqlikning harorat oralig'ida doimiy qolishini taxmin qiladi.",
    "Faza o'zgarishi, issiqlik yo'qotilishi, aralashma ta'sirlari va bosimga bog'liq xususiyat o'zgarishlari bu asosiy formulaga kiritilmagan.",
    "Teskari hisoblashlar fizik jihatdan ma'noli kirishlarni talab qiladi: musbat massa va solishtirma issiqlik, bo'lish amali bo'lgan joyda esa nolga teng bo'lmagan harorat farqi.",
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
      label: "Bosim, Kuch va Maydon Hisoblagichi",
      href: "/uz/bosim-kuch-maydon-hisoblash",
    },
    {
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
};

export default function HeatEnergyPageUz({
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

      <HeatEnergyCalculatorUz
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
