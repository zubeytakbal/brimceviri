import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findEs419ConversionPage,
  es419ConversionPages,
} from "../../converter/localizedEs419ConversionPages";
import { findEs419UnitPage } from "../../converter/localizedEs419UnitPages";
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

  return Number(value.toPrecision(12)).toLocaleString("es-419", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return es419ConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findEs419ConversionPage(slug);

  if (!page) {
    return {
      title: "Conversión no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const oneUnitValue = formatNumber(1);
  const oneUnitResult = formatNumber(
    convert(page.category, 1, page.fromUnit, page.toUnit)
  );

  // En español, «Convertidor de X a Y» describe esta intención de búsqueda
  // con más naturalidad que una fórmula basada en una cantidad inicial.
  const title = `Convertidor de ${page.fromName} a ${page.toName}`;
  const description = `${oneUnitValue} ${page.fromName} = ${oneUnitResult} ${page.toName}. Consulta gratis la fórmula, la tabla de conversión y el resultado instantáneo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/es-419/${page.slug}`,
      ...buildFullLanguageAlternates(`/es-419/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/es-419/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "es_LA",
      type: "website",
    },
  };
}

export default async function Es419ConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findEs419ConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const reversePage = findEs419ConversionPage(page.reverseSlug);
  const fromUnitInfo = findEs419UnitPage(page.category, page.fromUnit);
  const toUnitInfo = findEs419UnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = es419ConversionPages
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
      question: `¿Cuánto equivale 1 ${page.fromName} en ${page.toName}?`,
      answer: `1 ${page.fromUnit} = ${formattedOneUnitResult} ${page.toUnit}.`,
    },
    {
      question: `¿Cómo convierto ${page.fromName} a ${page.toName}?`,
      answer: page.explanation,
    },
    {
      question: `¿Cuánto equivale 1 ${page.toName} en ${page.fromName}?`,
      answer: `1 ${page.toUnit} = ${reverseOneUnitResult} ${page.fromUnit}.`,
    },
  ];

  return (
    <main className="conversion-page" lang="es-419">
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
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es-419">Inicio</Link>
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
              Convertidor de {page.fromName} a {page.toName}
            </h1>

            <p className="conversion-hero-description">
              Ingresa un valor para obtener un resultado instantáneo y gratuito.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="es-419"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Resumen de la conversión</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Fórmula</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Categoría</dt>
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
            ¿Cómo convertir {page.fromName} a {page.toName}?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Fórmula de conversión</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Tabla de conversión de {page.fromName} a {page.toName}
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
            <h2>¿Qué es {fromUnitInfo.name}?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/es-419/guias-de-unidades/${fromUnitInfo.slug}`}
            >
              Ver la guía de {fromUnitInfo.name}
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>¿Qué es {toUnitInfo.name}?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/es-419/guias-de-unidades/${toUnitInfo.slug}`}
            >
              Ver la guía de {toUnitInfo.name}
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Conversión inversa</h2>

            <Link className="text-link" href={`/es-419/${reversePage.slug}`}>
              Convertidor de {reversePage.fromName} a {reversePage.toName}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Conversiones relacionadas</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/es-419/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section conversion-faq">
          <h2>Preguntas frecuentes</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Fuentes</h2>

            <p>
              Las definiciones y relaciones de conversión de esta página se
              basan en fuentes metrológicas reconocidas.
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

        <section className="conversion-section language-alternatives">
          <h2>Otros idiomas</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Abrir la versión en turco
          </Link>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              Abrir la versión en inglés
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}
