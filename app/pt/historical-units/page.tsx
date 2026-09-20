import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unidades de medida historicas",
  description:
    "Descubra as unidades de medida bizantinas, otomanas e turcas antigas, e converta para metros e gramas com breves explicacoes.",
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
    title: "Unidades de medida historicas",
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
  { value: "pus", label: "Pe bizantino (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Braca bizantina (Orgyia)", symbol: "orgyia" },
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
    name: "Pe bizantino (pous)",
    value: "≈ 0,3148 m",
    note: "Extensao do pe grego antigo, usada ate 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Braca bizantina (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distancia entre as pontas dos dedos com os bracos totalmente esticados.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra bizantina (litra)",
    value: "≈ 324 g",
    note: "Unidade de massa basica da tradicao bizantina, influenciada pela libra romana.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia bizantina (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Diferente da onca moderna dos sistemas britanico e norte-americano.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Tinha varios usos: o arşın de mercado, o mais conhecido, e o arşın de construcao, usado para comprimentos maiores.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Usada especialmente para medir tecidos e texteis, alem do comercio relacionado.",
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
    note: "Usada para pequenas quantidades, como metais preciosos, especiarias e alguns cosmeticos.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Uma antiga unidade de comprimento turca, encontrada em fontes linguisticas e historicas antigas.",
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
      breadcrumbAriaLabel="Trilha de navegacao"
      breadcrumbs={[
        { href: "/pt", label: "Inicio" },
        { label: "Unidades de medida historicas" },
      ]}
      title="Unidades de medida historicas"
      description="Descubra as unidades de medida bizantinas, otomanas e turcas antigas com seus equivalentes modernos em metros e gramas, e converta diretamente com duas ferramentas praticas."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Türkçe versiyonu aç",
      }}
      sections={[
        {
          heading: "Breve contexto historico",
          content: (
            <>
              <p>
                A historia da medicao na Anatolia e nessa regiao nao
                comecou com o sistema metrico moderno; passou por varias
                camadas de sistemas bizantino e depois otomano, alem de
                medidas turcas ainda mais antigas.
              </p>
              <p>
                Por isso nomes como arşın, okka e dirhem ainda aparecem
                hoje em documentos antigos, alem de alguns livros e
                pesquisas historicas.
              </p>
            </>
          ),
        },
        {
          heading: "Conversor de unidades de comprimento historicas",
          content: (
            <>
              <p>
                Converta diretamente entre arşın, endaze, pe bizantino,
                braca bizantina e çığ, com o equivalente moderno em
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
          heading: "Conversor de unidades de massa historicas",
          content: (
            <>
              <p>
                Converta entre a okka otomana, o dirhem, a litra bizantina
                e a ounkia bizantina, usando o grama moderno como
                referencia. Para unidades modernas como o quilograma e a
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
          heading: "Unidades da epoca bizantina",
          content: (
            <>
              <p>
                Bizancio herdou grande parte da tradicao de medicao grega
                e romana, e criou unidades de comprimento e massa
                praticas que se mantiveram em uso no comercio e na
                construcao por seculos.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unidades da epoca otomana",
          content: (
            <>
              <p>
                Antes de o Estado otomano passar completamente ao sistema
                metrico no seculo XX, unidades como arşın, endaze, okka e
                dirhem eram usadas no comercio, na construcao e na vida
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
                Algumas unidades antigas continuam conhecidas gracas a
                fontes linguisticas e historicas, e sao importantes para
                entender escritos antigos e relaciona-los as medidas
                modernas.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Por que essas unidades ainda sao importantes hoje?",
          content: (
            <>
              <p>
                Esses nomes ainda aparecem hoje em atas de waqf, registros
                antigos, pesquisa historica e trabalhos de traducao;
                converte-los para metros ou gramas ajuda a entende-los
                rapidamente.
              </p>
              <p>
                Esta pagina tambem e util para estudantes, criadores de
                conteudo e qualquer pessoa que queira ler numeros
                historicos com referencias modernas claras.
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
                <Link href="/pt/shoe-size-converter">Conversor de numeracao de calcados</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
