import Link from "next/link";
import type { ReactNode } from "react";
import {
  densityUnitDefinitions,
  depthUnitDefinitions,
  gravityUnitDefinitions,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
  pressureUnitDefinitions,
} from "../../converter/engineeringUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  densityUnitNamesUz,
  depthUnitNamesUz,
  gravityUnitNamesUz,
} from "../../converter/hydrostaticUnitNamesUz";
import { pressureUnitNamesUz } from "../../converter/pressureForceAreaUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import HydrostaticPressureCalculatorUz from "./HydrostaticPressureCalculatorUz";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
  names: Record<string, { name: string; use: string }>;
};

function getUnitSections(): UnitTableSection[] {
  return [
    {
      id: "pressure-units",
      heading: "Bosim birliklari",
      siSymbol: "Pa",
      units: pressureUnitDefinitions,
      names: pressureUnitNamesUz,
    },
    {
      id: "density-units",
      heading: "Zichlik birliklari",
      siSymbol: KILOGRAM_PER_CUBIC_METRE_UNIT,
      units: densityUnitDefinitions,
      names: densityUnitNamesUz,
    },
    {
      id: "depth-units",
      heading: "Chuqurlik birliklari",
      siSymbol: "m",
      units: depthUnitDefinitions,
      names: depthUnitNamesUz,
    },
    {
      id: "gravity-units",
      heading: "Tortishish tezlanishi birliklari",
      siSymbol: METRE_PER_SECOND_SQUARED_UNIT,
      units: gravityUnitDefinitions,
      names: gravityUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Gidrostatik Bosim Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Gidrostatik Bosim Hisoblagichi",
  description:
    "Gidrostatik bosim farqini, zichlikni, chuqurlikni yoki tortishish tezlanishini SI baza birliklari orqali hisoblang. Vosita tank, sho'ng'in va manometr tekshiruvlari uchun mos.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  introHeading: "Gidrostatik bosim nima?",
  formulasHeading: "ΔP = ρgh formulasi",
  variablesHeading: "O'zgaruvchilar va SI birliklari",
  absoluteHeading: "Bosim ko'tarilishi va mutlaq bosim orasidagi farq",
  densityHeading: "Harorat zichlikka qanday ta'sir qiladi",
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
    "Gidrostatik bosim — bu tinch turgan suyuqlik ichida chuqurlik ortishi bilan ortadigan bosim. Bosim farqi zichlik, tortishish tezlanishi va vertikal chuqurlik farqining ko'paytmasidan topiladi.",
    "Bu hisoblagich tank, to'g'on, sho'ng'in, p'ezometr va manometr o'qishlarida tezkor muhandislik tekshiruvlari uchun mos.",
  ],
  formulas: [
    "ΔP = ρ × g × h",
    "ρ = ΔP / (g × h)",
    "g = ΔP / (ρ × h)",
    "h = ΔP / (ρ × g)",
  ],
  variables: [
    {
      term: "ΔP",
      explanation: "Gidrostatik bosim farqi, SI da paskal (Pa) da ifodalanadi.",
    },
    {
      term: "ρ",
      explanation: `Suyuqlik zichligi. Bu yerda ishlatiladigan SI baza birligi kilogram/kub metr (${KILOGRAM_PER_CUBIC_METRE_UNIT}).`,
    },
    {
      term: "g",
      explanation: `Tortishish tezlanishi. SI baza birligi metr/soniyakvadrat (${METRE_PER_SECOND_SQUARED_UNIT}).`,
    },
    {
      term: "h",
      explanation: "Vertikal chuqurlik yoki suyuqlik ustuni balandligi. SI baza birligi metr (m).",
    },
  ],
  absolutePressure: [
    "Formulaning to'g'ridan-to'g'ri natijasi — mos yuza va qiziqtirgan nuqta orasidagi gidrostatik bosim farqidir.",
    "Agar mutlaq bosim kerak bo'lsa, sirt bosimini alohida qo'shing: P_mutlaq = P_sirt + ρgh.",
  ],
  densityNotes: [
    "Zichlik harorat, bosim, sho'rlik va suyuqlik tarkibiga qarab o'zgaradi. Suv yoki dengiz suvi uchun aniqroq hisob-kitoblar uchun haqiqiy sharoitlarga mos zichlikdan foydalaning.",
    "Katta balandlik o'zgarishlariga ega gazlar uchun doimiy zichlik taxmini zaiflashishi mumkin va qatlamli yoki integral yondashuv ko'proq mos bo'lishi mumkin.",
  ],
  examples: [
    {
      title: `1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9,80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 10 m = 98,0665 kPa`,
      body: "Yaxlitlangan muhandislik suvidan foydalanilganda, 10 metr chuqurlikdagi gidrostatik bosim ko'tarilishi 98066,5 Pa, ya'ni 98,0665 kPa bo'ladi.",
    },
    {
      title: `1 g/cm³ × 9,80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 100 cm = 9,80665 kPa`,
      body: `1 g/cm³ zichlik 1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} ga teng. 100 sm chuqurlik 1 m ga teng bo'lgani uchun natija 9806,65 Pa, ya'ni 9,80665 kPa bo'ladi.`,
    },
    {
      title: `98,0665 kPa / (1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9,80665 ${METRE_PER_SECOND_SQUARED_UNIT}) = 10 m`,
      body: "Suvdagi berilgan bosim farqi uchun vertikal suyuqlik balandligi 10 metrga teskari hisoblanadi.",
    },
  ],
  applications: [
    "Suv tanklari va suv omborlarida tub bosimini baholash",
    "To'g'on va shlyuz tizimlari uchun dastlabki bosim tekshiruvlari",
    "Sho'ng'in sharoitida chuqurlik bilan bosim ko'tarilishi",
    "Manometrlar va boshqa suyuqlik ustuni o'lchov qurilmalari",
  ],
  limitations: [
    "Formula taxminan doimiy zichlikka ega tinch suyuqlik uchun mo'ljallangan.",
    "h vertikal chuqurlik farqidir, qiya yo'l uzunligi emas.",
    "Zichlik chuqurlik bilan sezilarli o'zgarsa, integral yondashuv talab qilinadi.",
    "Katta balandlik o'zgarishlariga ega gazlar uchun doimiy zichlik taxmini mos bo'lmasligi mumkin.",
    "Asosiy natija bosim farqidir; mutlaq bosim kerak bo'lsa sirt bosimini qo'shing.",
  ],
  sources: [
    {
      label: "OpenStax University Physics, Fluids, Density and Pressure",
      href: "https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure",
    },
    {
      label: "BIPM SI Brochure",
      href: "https://www.bipm.org/en/publications/si-brochure",
    },
    {
      label: "NIST SI conversion factors",
      href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors",
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

export default function HydrostaticPressurePageUz({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitSections = getUnitSections();

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

      <HydrostaticPressureCalculatorUz
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
          <h2>{strings.absoluteHeading}</h2>
          {strings.absolutePressure.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{strings.densityHeading}</h2>
          {strings.densityNotes.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
            {strings.relatedCalculators.map((item) => (
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
