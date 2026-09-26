import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unidades de medida históricas",
  description:
    "Descubra as unidades de medida bizantinas, otomanas e turcas antigas e converta para metros e gramas com breves explicações.",
  alternates: {
    canonical: "/pt/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/historical-units",
      es: "/es/historical-units",
      "es-419": "/es-419/historical-units",
      pt: "/pt/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unidades de medida históricas",
    description: "Descubra as unidades de medida bizantinas, otomanas e turcas antigas.",
    url: buildSiteUrl("/pt/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metro (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Pé bizantino (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Braça bizantina (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Grama (g)", symbol: "g" },
  { value: "okka", label: "Okka otomana", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Litra bizantina", symbol: "litra" },
  { value: "ounkia", label: "Ounkia bizantina", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Pé bizantino (pous)",
    value: "≈ 0,3148 m",
    note: "Extensão do pé grego antigo, usada até 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Braça bizantina (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distância entre as pontas dos dedos com os braços totalmente esticados.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra bizantina (litra)",
    value: "≈ 324 g",
    note: "Unidade de massa básica da tradição bizantina, influenciada pela libra romana.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia bizantina (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Diferente da onça moderna dos sistemas britânico e norte-americano.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Tinha vários usos: o arşın de mercado, o mais conhecido, e o arşın de construção, usado para comprimentos maiores.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Usada especialmente para medir tecidos e têxteis, além do comércio relacionado.",
  },
  {
    href: "/birimler/okka",
    name: "Okka otomana (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "Uma das unidades de peso mais conhecidas dos mercados otomanos tradicionais.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Usada para pequenas quantidades, como metais preciosos, especiarias e alguns cosméticos.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Uma antiga unidade de comprimento turca, encontrada em fontes linguísticas e históricas antigas.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function PortugueseHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="pt"
      breadcrumbAriaLabel="Trilha de navegação"
      breadcrumbs={[
        { href: "/pt", label: "Início" },
        { label: "Unidades de medida históricas" },
      ]}
      title="Unidades de medida históricas"
      description="Descubra as unidades de medida bizantinas, otomanas e turcas antigas com seus equivalentes modernos em metros e gramas e converta diretamente com duas ferramentas práticas."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Abrir a versão em turco",
      }}
      sections={[
        {
          heading: "Breve contexto histórico",
          content: (
            <>
              <p>
                A história da medição na Anatólia e nessa região não
                começou com o sistema métrico moderno; passou por várias
                camadas de sistemas bizantino e depois otomano, além de
                medidas turcas ainda mais antigas.
              </p>
              <p>
                Por isso nomes como arşın, okka e dirhem ainda aparecem
                hoje em documentos antigos, além de alguns livros e
                pesquisas históricas.
              </p>
            </>
          ),
        },
        {
          heading: "Conversor de unidades de comprimento históricas",
          content: (
            <>
              <p>
                Converta diretamente entre arşın, endaze, pé bizantino,
                braça bizantina e çığ, com o equivalente moderno em
                metros. Para ver todas as unidades de comprimento
                modernas, abra a{" "}
                <Link href="/pt/categories/comprimento">biblioteca completa de comprimentos</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="pt"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Conversor de unidades de massa históricas",
          content: (
            <>
              <p>
                Converta entre a okka otomana, o dirhem, a litra bizantina
                e a ounkia bizantina, usando o grama moderno como
                referência. Para unidades modernas como o quilograma e a
                tonelada, abra a{" "}
                <Link href="/pt/categories/massa">biblioteca completa de massas</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="pt"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Unidades da época bizantina",
          content: (
            <>
              <p>
                Bizâncio herdou grande parte da tradição de medição grega
                e romana e criou unidades de comprimento e massa
                práticas que se mantiveram em uso no comércio e na
                construção por séculos.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unidades da época otomana",
          content: (
            <>
              <p>
                Antes de o Estado otomano passar completamente ao sistema
                métrico no século XX, unidades como arşın, endaze, okka e
                dirhem eram usadas no comércio, na construção e na vida
                cotidiana.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unidades turcas ainda mais antigas",
          content: (
            <>
              <p>
                Algumas unidades antigas continuam conhecidas graças a
                fontes linguísticas e históricas, e são importantes para
                entender escritos antigos e relaciona-los as medidas
                modernas.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Por que essas unidades ainda são importantes hoje?",
          content: (
            <>
              <p>
                Esses nomes ainda aparecem hoje em atas de waqf, registros
                antigos, pesquisa histórica e trabalhos de tradução;
                convertê-los para metros ou gramas ajuda a entendê-los
                rapidamente.
              </p>
              <p>
                Esta página também é útil para estudantes, criadores de
                conteúdo e qualquer pessoa que queira ler números
                históricos com referências modernas claras.
              </p>
            </>
          ),
        },
        {
          heading: "Ferramentas relacionadas",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/pt/kitchen-measurement-converter">Conversor de medidas de cozinha</Link>
              </li>
              <li>
                <Link href="/pt/recipe-converter">Conversor de receitas</Link>
              </li>
              <li>
                <Link href="/pt/shoe-size-converter">Conversor de numeração de calçados</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
