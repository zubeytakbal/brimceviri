import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { findEnglishPageByTurkishSlug } from "../../converter/localizedConversionPages";
import {
  findFrenchConversionPage,
  frenchConversionPages,
} from "../../converter/localizedFrenchConversionPages";
import { findFrenchUnitPage } from "../../converter/localizedFrenchUnitPages";
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

  return Number(value.toPrecision(12)).toLocaleString("fr-FR", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return frenchConversionPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findFrenchConversionPage(slug);

  if (!page) {
    return {
      title: "Conversion introuvable",
      robots: { index: false, follow: false },
    };
  }

  const oneUnitValue = formatNumber(1);
  const oneUnitResult = formatNumber(
    convert(page.category, 1, page.fromUnit, page.toUnit)
  );

  // Fransizca aramalarda oncu rakam (Turkce'deki "1 X kac Y" kalibinin
  // aksine) yaygin degil -- rakip siteler "X en Y" veya "Convertisseur de
  // X en Y" kalibini kullaniyor (arastirma: calculconversion.com,
  // the-converter.net, calculatrice.com basliklari).
  const title = `Convertisseur de ${page.fromName} en ${page.toName}`;
  const description = `${oneUnitValue} ${page.fromName} = ${oneUnitResult} ${page.toName}. Consultez gratuitement la formule, le tableau de conversion et le resultat instantane.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/fr/${page.slug}`,
      ...buildFullLanguageAlternates(`/fr/${page.slug}`),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/fr/${page.slug}`),
      siteName: "BirimCeviri.app",
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default async function FrenchConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findFrenchConversionPage(slug);

  if (!page) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(page.sourceSlug);
  const reversePage = findFrenchConversionPage(page.reverseSlug);
  const fromUnitInfo = findFrenchUnitPage(page.category, page.fromUnit);
  const toUnitInfo = findFrenchUnitPage(page.category, page.toUnit);
  const sources = getUnitSources(page.category);

  const relatedConversions = frenchConversionPages
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
      question: `Quelle est l'équivalence de 1 ${page.fromName} en ${page.toName} ?`,
      answer: `1 ${page.fromUnit} = ${formattedOneUnitResult} ${page.toUnit}.`,
    },
    {
      question: `Comment convertir ${page.fromName} en ${page.toName} ?`,
      answer: page.explanation,
    },
    {
      question: `Quelle est l'équivalence de 1 ${page.toName} en ${page.fromName} ?`,
      answer: `1 ${page.toUnit} = ${reverseOneUnitResult} ${page.fromUnit}.`,
    },
  ];

  return (
    <main className="conversion-page" lang="fr">
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
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
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
              Convertisseur {page.fromName} — {page.toName}
            </h1>

            <p className="conversion-hero-description">
              Saisissez une valeur pour obtenir un resultat instantane et gratuit.
            </p>

            <PairConverter
              category={page.category}
              fromUnit={page.fromUnit}
              toUnit={page.toUnit}
              fromName={page.fromName}
              toName={page.toName}
              locale="fr"
            />
          </div>

          <div className="conversion-hero-information">
            <h2>Résumé de la conversion</h2>

            <p>
              1 {page.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult} {page.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Formule</dt>
                <dd>{page.formula}</dd>
              </div>

              <div>
                <dt>Catégorie</dt>
                <dd>{page.categoryName}</dd>
              </div>

              <div>
                <dt>Unités</dt>
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
            Comment convertir {page.fromName} en {page.toName} ?
          </h2>

          <p>{page.explanation}</p>

          <div className="conversion-formula">
            <strong>Formule de conversion</strong>
            <p>{page.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            Tableau de conversion {page.fromName} — {page.toName}
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
            <h2>Qu&apos;est-ce que {fromUnitInfo.name} ?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/fr/unit-guides/${fromUnitInfo.slug}`}
            >
              Voir le guide de l&apos;unité {fromUnitInfo.name}
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>Qu&apos;est-ce que {toUnitInfo.name} ?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <Link
              className="text-link"
              href={`/fr/unit-guides/${toUnitInfo.slug}`}
            >
              Voir le guide de l&apos;unité {toUnitInfo.name}
            </Link>
          </section>
        )}

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Conversion inverse</h2>

            <Link className="text-link" href={`/fr/${reversePage.slug}`}>
              Convertisseur {reversePage.fromName} — {reversePage.toName}
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>Conversions liees</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/fr/${relatedPage.slug}`}>
                    {relatedPage.fromName} — {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="conversion-section conversion-faq">
          <h2>Questions fréquentes</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Sources</h2>

            <p>
              Les definitions et relations de conversion de cette page sont
              conformes aux normes metrologiques reconnues.
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
          <h2>Autres langues</h2>

          <Link
            className="text-link"
            href={`/${page.sourceSlug}`}
            hrefLang="tr"
          >
            Ouvrir la version turque
          </Link>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              Ouvrir la version anglaise
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}
