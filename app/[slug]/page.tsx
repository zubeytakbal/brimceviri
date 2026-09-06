import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConversionSeo from "../components/ConversionSeo";
import EmbedCodeBox from "../components/EmbedCodeBox";
import PairConverter from "../converter/PairConverter";
import { categoryPages } from "../converter/categoryPages";
import { convert } from "../converter/convert";
import { conversionPages } from "../converter/conversionPages";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { findEnglishPageByTurkishSlug } from "../converter/localizedConversionPages";
import { findGermanPageByTurkishSlug } from "../converter/localizedGermanConversionPages";
import { getUnitSources } from "../converter/unitSources";
import { findUnitPage } from "../converter/unitPages";
import { buildFullLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// En cok aranan, gercekten yuksek trafik potansiyeli olan donusum
// ciftleri -- embed kodu tesviki (baska sitelere gomulup geri link
// kazandirma) sadece bunlarda gosterilir, tum ~800 sayfada degil.
const popularEmbedSlugs = new Set([
  "kilogram-pound",
  "pound-kilogram",
  "santigrat-fahrenhayt",
  "fahrenhayt-santigrat",
  "kilometre-mil",
  "mil-kilometre",
  "santimetre-inc",
  "inc-santimetre",
  "metre-fit",
  "fit-metre",
  "kilogram-gram",
  "gram-kilogram",
  "litre-galon",
  "galon-litre",
]);

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

  return Number(value.toPrecision(12)).toLocaleString("tr-TR", {
    maximumFractionDigits: 12,
  });
}

export function generateStaticParams() {
  return conversionPages.map((conversionPage) => ({
    slug: conversionPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const conversionPage = conversionPages.find(
    (page) => page.slug === slug
  );

  if (!conversionPage) {
    return {
      title: "Dönüşüm bulunamadı",
    };
  }

  const directAnswer =
    conversionPage.explanation.split(". ")[1] ??
    conversionPage.explanation;

  return {
    title:
      `${conversionPage.fromName} – ` +
      `${conversionPage.toName} Çevirici`,
    description:
      `${conversionPage.fromName} kaç ${conversionPage.toName}? ` +
      `${directAnswer} Ücretsiz hesaplama aracı, formül ve hazır ` +
      `dönüşüm tablosu için tıklayın.`,
    alternates: {
      canonical: `/${conversionPage.slug}`,
      ...buildFullLanguageAlternates(`/${conversionPage.slug}`),
    },
    openGraph: {
      title:
        `${conversionPage.fromName} – ` +
        `${conversionPage.toName} Çevirici`,
      description:
        `${conversionPage.fromName} değerini ` +
        `${conversionPage.toName} birimine ücretsiz dönüştürün.`,
      url: buildSiteUrl(`/${conversionPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function ConversionPage({ params }: PageProps) {
  const { slug } = await params;

  const conversionPage = conversionPages.find(
    (page) => page.slug === slug
  );

  if (!conversionPage) {
    notFound();
  }

  const englishPage = findEnglishPageByTurkishSlug(
    conversionPage.slug
  );
  const germanPage = findGermanPageByTurkishSlug(
    conversionPage.slug
  );
  const reversePage = conversionPages.find(
    (page) => page.slug === conversionPage.reverseSlug
  );
  const categoryPage = categoryPages.find(
    (page) => page.category === conversionPage.category
  );

  const relatedConversions = conversionPages
    .filter(
      (page) =>
        page.slug !== conversionPage.slug &&
        page.slug !== conversionPage.reverseSlug &&
        page.category === conversionPage.category &&
        (page.fromUnit === conversionPage.fromUnit ||
          page.toUnit === conversionPage.fromUnit ||
          page.fromUnit === conversionPage.toUnit ||
          page.toUnit === conversionPage.toUnit)
    )
    .slice(0, 8);

  const fromUnitInfo = findUnitPage(
    conversionPage.category,
    conversionPage.fromUnit
  );

  const toUnitInfo = findUnitPage(
    conversionPage.category,
    conversionPage.toUnit
  );
  const sources = getUnitSources(conversionPage.category);

  const tableRows = conversionPage.exampleValues.map((value) => ({
    input: value,
    result: convert(
      conversionPage.category,
      value,
      conversionPage.fromUnit,
      conversionPage.toUnit
    ),
  }));

  const oneUnitResult = convert(
    conversionPage.category,
    1,
    conversionPage.fromUnit,
    conversionPage.toUnit
  );

  const formattedOneUnitResult = formatNumber(oneUnitResult);

  const reverseOneUnitResult = convert(
    conversionPage.category,
    1,
    conversionPage.toUnit,
    conversionPage.fromUnit
  );

  const formattedReverseOneUnitResult = formatNumber(reverseOneUnitResult);

  // SSS metni, sayfada zaten hesaplanmis gercek degerlerden (formattedOneUnitResult,
  // explanation) uretilir -- her sayfada farkli sayilar/aciklama oldugu icin
  // ayni kalip metin binlerce sayfada tekrar etmiyor, FAQPage semasinin
  // gorunur icerikle birebir eslesmesi kurali da boylece saglaniyor.
  const faqItems: FaqItem[] = [
    {
      question: `1 ${conversionPage.fromName} kaç ${conversionPage.toName} eder?`,
      answer: `1 ${conversionPage.fromUnit} = ${formattedOneUnitResult} ${conversionPage.toUnit}.`,
    },
    {
      question: `${conversionPage.fromName}, ${conversionPage.toName} birimine nasıl çevrilir?`,
      answer: conversionPage.explanation,
    },
    {
      question: `1 ${conversionPage.toName} kaç ${conversionPage.fromName} eder?`,
      answer: `1 ${conversionPage.toUnit} = ${formattedReverseOneUnitResult} ${conversionPage.fromUnit}.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage?.title ?? conversionPage.category,
        item: categoryPage
          ? buildSiteUrl(`/kategoriler/${categoryPage.slug}`)
          : buildSiteUrl("/tum-birimler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${conversionPage.fromName} – ${conversionPage.toName}`,
        item: buildSiteUrl(`/${conversionPage.slug}`),
      },
    ],
  };

  return (
    <main className="conversion-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>

          <Link
            href={
              categoryPage
                ? `/kategoriler/${categoryPage.slug}`
                : "/tum-birimler"
            }
          >
            {categoryPage?.title ?? conversionPage.category}
          </Link>

          <span aria-hidden="true">›</span>

          <span>
            {conversionPage.fromName} –{" "}
            {conversionPage.toName}
          </span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>
              {conversionPage.fromName} –{" "}
              {conversionPage.toName} Çevirici
            </h1>

            <p className="conversion-hero-description">
              Değeri girin, sonucu anında ve ücretsiz olarak hesaplayın.
            </p>

            <PairConverter
              category={conversionPage.category}
              fromUnit={conversionPage.fromUnit}
              toUnit={conversionPage.toUnit}
              fromName={conversionPage.fromName}
              toName={conversionPage.toName}
            />

            {popularEmbedSlugs.has(conversionPage.slug) && (
              <EmbedCodeBox
                embedPath={`/embed/${conversionPage.slug}`}
                title={`${conversionPage.fromName} – ${conversionPage.toName} Çevirici`}
              />
            )}
          </div>

          <div className="conversion-hero-information">
            <h2>Dönüşüm özeti</h2>

            <p>
              1 {conversionPage.fromUnit} ={" "}
              <strong>
                {formattedOneUnitResult}{" "}
                {conversionPage.toUnit}
              </strong>
            </p>

            <dl>
              <div>
                <dt>Dönüşüm</dt>
                <dd>{conversionPage.formula}</dd>
              </div>

              <div>
                <dt>Kategori</dt>
                <dd>{conversionPage.category}</dd>
              </div>

              <div>
                <dt>Birimler</dt>
                <dd>
                  {conversionPage.fromUnit} →{" "}
                  {conversionPage.toUnit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <article className="conversion-content">
        <section className="conversion-section">
          <h2>
            {conversionPage.fromName},{" "}
            {conversionPage.toName} birimine nasıl çevrilir?
          </h2>

          <p>{conversionPage.explanation}</p>

          <div className="conversion-formula">
            <strong>Dönüşüm formülü</strong>
            <p>{conversionPage.formula}</p>
          </div>
        </section>

        <section className="conversion-section">
          <h2>
            {conversionPage.fromName} –{" "}
            {conversionPage.toName} dönüşüm tablosu
          </h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{conversionPage.fromName}</th>
                  <th>{conversionPage.toName}</th>
                </tr>
              </thead>

              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.input}>
                    <td>
                      {formatNumber(row.input)}{" "}
                      {conversionPage.fromUnit}
                    </td>

                    <td>
                      {formatNumber(row.result)}{" "}
                      {conversionPage.toUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {fromUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{fromUnitInfo.name} nedir?</h2>

            <p>{fromUnitInfo.shortDescription}</p>

            <h3>{fromUnitInfo.name} biriminin kısa tarihçesi</h3>

            <p>{fromUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/birimler/${fromUnitInfo.slug}`}
            >
              {fromUnitInfo.name} hakkında ayrıntılı bilgi
            </Link>
          </section>
        )}

        {toUnitInfo && (
          <section className="conversion-section unit-information">
            <h2>{toUnitInfo.name} nedir?</h2>

            <p>{toUnitInfo.shortDescription}</p>

            <h3>{toUnitInfo.name} biriminin kısa tarihçesi</h3>

            <p>{toUnitInfo.historySummary}</p>

            <Link
              className="text-link"
              href={`/birimler/${toUnitInfo.slug}`}
            >
              {toUnitInfo.name} hakkında ayrıntılı bilgi
            </Link>
          </section>
        )}

        <ConversionSeo conversionPage={conversionPage} />

        {reversePage && (
          <section className="conversion-section related-conversions">
            <h2>Ters dönüşüm</h2>

            <Link
              className="text-link"
              href={`/${reversePage.slug}`}
            >
              {reversePage.fromName} →{" "}
              {reversePage.toName} çevirici
            </Link>
          </section>
        )}

        {relatedConversions.length > 0 && (
          <section className="conversion-section related-conversions">
            <h2>İlgili dönüşümler</h2>

            <ul className="related-conversion-list">
              {relatedConversions.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link href={`/${relatedPage.slug}`}>
                    {relatedPage.fromName} →{" "}
                    {relatedPage.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="conversion-section conversion-faq">
          <h2>Sık Sorulan Sorular</h2>

          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        {sources.length > 0 && (
          <section className="conversion-section unit-sources">
            <h2>Kaynaklar</h2>

            <p>
              Bu sayfadaki tanımlar ve dönüşüm
              ilişkileri, standart metroloji ve SI referanslarıyla
              uyumlu olacak şekilde düzenlenmiştir.
            </p>

            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.organization}: {source.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="conversion-section language-alternatives">
          <h2>Diğer diller</h2>

          {englishPage && (
            <Link
              className="text-link"
              href={`/en/${englishPage.slug}`}
              hrefLang="en"
            >
              İngilizce sürümü aç
            </Link>
          )}

          {germanPage && (
            <Link
              className="text-link"
              href={`/de/${germanPage.slug}`}
              hrefLang="de"
            >
              Almanca sürümü aç
            </Link>
          )}
        </section>
      </article>
    </main>
  );
}
