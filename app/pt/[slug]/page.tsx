import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { conversionPages } from "../../converter/conversionPages";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findPortugueseConversionPage,
  portugueseConversionPages,
} from "../../converter/localizedPortugueseConversionPages";
import { findPortugueseUnitPage } from "../../converter/localizedPortugueseUnitPages";
import { getUnitSources } from "../../converter/unitSources";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toLocaleString("pt-BR", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return portugueseConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPortugueseConversionPage(slug);

  if (!page) {
    return {
      title: "Conversão não encontrada",
      robots: { index: false, follow: false },
    };
  }

  const oneUnitValue = formatNumber(1);
  const oneUnitResult = formatNumber(
    convert(page.category, 1, page.fromUnit, page.toUnit)
  );

  // O padrao "1 X quantos Y" (equivalente ao turco) nao e comum nas buscas
  // em portugues -- os concorrentes reais (calculareconverter.com.br,
  // convertlive.com/pt, unidadesdemedida.org) usam "Conversor de X para Y",
  // sem numero inicial.
  const title = `Conversor de ${page.fromName} para ${page.toName}`;
  const description = `${oneUnitValue} ${page.fromName} = ${oneUnitResult} ${page.toName}. Consulte gratis a formula, a tabela de conversao e o resultado instantaneo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/pt/${page.slug}`,
      ...buildFullLanguageAlternates(`/pt/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/pt/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function PortugueseConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findPortugueseConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const hasTurkishPage = conversionPages.some((turkishPage) => turkishPage.slug === page.sourceSlug);
  const reversePage = findPortugueseConversionPage(page.reverseSlug);
  const fromUnitInfo = findPortugueseUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findPortugueseUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = portugueseConversionPages
    .filter(
      (relatedPage) =>
        relatedPage.slug !== page.slug &&
        relatedPage.slug !== page.reverseSlug &&
        relatedPage.category === page.category &&
        (relatedPage.fromUnit === page.fromUnit ||
          relatedPage.toUnit === page.fromUnit ||
          relatedPage.fromUnit === page.toUnit ||
          relatedPage.toUnit === page.toUnit)
    )
    .slice(0, 8);

  const tableRows = page.exampleValues.map((value) => ({
    input: value,
    result: convert(page.category, value, page.fromUnit, page.toUnit),
  }));

  const oneUnitResult = convert(page.category, 1, page.fromUnit, page.toUnit);
  const formattedOneUnitResult = formatNumber(oneUnitResult);
  const reverseOneUnitResult = formatNumber(
    convert(page.category, 1, page.toUnit, page.fromUnit)
  );
  const faqItems: FaqItem[] = [
    {
      question: `Quanto equivale 1 ${page.fromName} em ${page.toName}?`,
      answer: `1 ${page.fromUnit} = ${formattedOneUnitResult} ${page.toUnit}.`,
    },
    {
      question: `Como converter ${page.fromName} para ${page.toName}?`,
      answer: page.explanation,
    },
    {
      question: `Quanto equivale 1 ${page.toName} em ${page.fromName}?`,
      answer: `1 ${page.toUnit} = ${reverseOneUnitResult} ${page.fromUnit}.`,
    },
  ];

  return (
    <main className="conversion-page" lang="pt-BR">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(faqItems)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{page.categoryName}</span>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {page.fromName} — {page.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              Conversor de {page.fromName} para {page.toName}
            </h1>

            <p className="conversion-hero-description">
              Digite um valor para obter um resultado instantâneo e gratuito.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="pt"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Resumo da conversão</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formula</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Categoria</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Unidades</dt>
                <dd>
                  {page.fromUnit} → {page.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            Como converter {page.fromName} para {page.toName}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Fórmula de conversão</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Tabela de conversão de {page.fromName} para {page.toName}
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{page.fromName}</th>
                  <th>{page.toName}</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)} {page.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)} {page.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>O que e {fromUnitInfo.name}?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/pt/unit-guides/${fromUnitInfo.slug}`}
            >
              Ver o guia da unidade {fromUnitInfo.name}
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>O que e {toUnitInfo.name}?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/pt/unit-guides/${toUnitInfo.slug}`}
            >
              Ver o guia da unidade {toUnitInfo.name}
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Conversão inversa</h2>

            <Link className="text-link" href={`/pt/${reversePage.slug}`}>
              Conversor de {reversePage.fromName} para {reversePage.toName}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Conversões relacionadas</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/pt/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section conversion-faq">
          <h2>Perguntas frequentes</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Fontes</h2>

            <p>
              As definições e relações de conversão desta página seguem as
              normas metrológicas reconhecidas.
            </p>

            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.organization}: {source.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {(hasTurkishPage || englishPage) && (
          <section className="conversion-section language-alternatives">
            <h2>Outros idiomas</h2>
  
            {hasTurkishPage && (
              <Link
                className="text-link"
                href={`/${page.sourceSlug}`}
                hrefLang="tr"
              >
                Abrir a versão em turco
              </Link>
  
            )}
  
            {englishPage && (
              <Link
                className="text-link"
                href={`/en/${englishPage.slug}`}
                hrefLang="en"
              >
                Abrir a versão em inglês
              </Link>
            )}
          </section>
        )}
      </article>
    </main>
  );
}
