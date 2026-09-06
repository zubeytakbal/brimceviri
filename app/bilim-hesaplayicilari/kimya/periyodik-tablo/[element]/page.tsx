import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ElementLewisDiagram from "../../../../components/ElementLewisDiagram";
import ElementMolWidget from "../../../../components/ElementMolWidget";
import ElementNeighborsMini from "../../../../components/ElementNeighborsMini";
import { convert } from "../../../../converter/convert";
import { findElementArticle } from "../../../../converter/elementArticles";
import {
  categoryLabels,
  findElementBySlug,
  periodicTable,
  slugifyElementName,
} from "../../../../converter/periodicTableData";
import { buildSiteUrl } from "../../../../siteConfig";

type PageProps = {
  params: Promise<{
    element: string;
  }>;
};

function formatMass(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const CLEAN_TEMPERATURE_PATTERN = /^(-?\d+(?:,\d+)?)(\s*\(.*\))?$/;

function formatTemperatureWithConversions(raw: string) {
  const match = raw.trim().match(CLEAN_TEMPERATURE_PATTERN);

  if (!match) {
    return `${raw} °C`;
  }

  const celsius = Number(match[1].replace(",", "."));

  if (!Number.isFinite(celsius)) {
    return `${raw} °C`;
  }

  const fahrenheit = convert("sicaklik", celsius, "C", "F");
  const kelvin = convert("sicaklik", celsius, "C", "K");
  const suffix = match[2] ? ` ${match[2].trim()}` : "";

  return `${match[1]} °C (${fahrenheit.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} °F · ${kelvin.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} K)${suffix}`;
}

export function generateStaticParams() {
  return periodicTable.map((el) => ({
    element: slugifyElementName(el.nameTr),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { element: slug } = await params;
  const element = findElementBySlug(slug);

  if (!element) {
    return {
      title: "Element bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const title = `${element.nameTr} (${element.symbol}) Elementi: Atom Numarası, Kütlesi ve Özellikleri`;
  const description = `${element.nameTr} elementinin sembolü ${element.symbol}, atom numarası ${element.atomicNumber}, atom kütlesi ${formatMass(element.atomicMass)} u. Tanımı, özellikleri ve kullanım alanlarını inceleyin.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/bilim-hesaplayicilari/kimya/periyodik-tablo/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/bilim-hesaplayicilari/kimya/periyodik-tablo/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function ElementPage({ params }: PageProps) {
  const { element: slug } = await params;
  const element = findElementBySlug(slug);

  if (!element) {
    notFound();
  }

  const article = findElementArticle(slug);
  const pageUrl = buildSiteUrl(
    `/bilim-hesaplayicilari/kimya/periyodik-tablo/${slug}`
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kimya",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Periyodik Tablo",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/periyodik-tablo"),
      },
      {
        "@type": "ListItem",
        position: 5,
        name: element.nameTr,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya/periyodik-tablo">
            Periyodik Tablo
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{element.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{element.symbol}</p>
          <h1>
            {element.nameTr} ({element.symbol})
          </h1>
          <p>
            Atom numarası {element.atomicNumber}, atom kütlesi{" "}
            {formatMass(element.atomicMass)} u.{" "}
            {categoryLabels[element.category]}.
          </p>
        </header>

        <ElementNeighborsMini element={element} />

        <ElementMolWidget
          elementName={element.nameTr}
          atomicMass={element.atomicMass}
        />

        <section className="category-article-content">
          <h2>{element.nameTr} temel bilgileri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Sembol</dt>
              <dd>{element.symbol}</dd>
            </div>
            <div>
              <dt>Atom numarası</dt>
              <dd>{element.atomicNumber}</dd>
            </div>
            <div>
              <dt>Atom kütlesi</dt>
              <dd>{formatMass(element.atomicMass)} u</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>{categoryLabels[element.category]}</dd>
            </div>
            <div>
              <dt>Periyot</dt>
              <dd>{element.period}</dd>
            </div>
            <div>
              <dt>Grup</dt>
              <dd>{element.group ?? "Lantanit/Aktinit serisi"}</dd>
            </div>
            {article && (
              <>
                <div>
                  <dt>Erime noktası</dt>
                  <dd>{formatTemperatureWithConversions(article.meltingPointC)}</dd>
                </div>
                <div>
                  <dt>Kaynama noktası</dt>
                  <dd>{formatTemperatureWithConversions(article.boilingPointC)}</dd>
                </div>
                <div>
                  <dt>Yoğunluk</dt>
                  <dd>{article.densityGCm3} g/cm³</dd>
                </div>
                <div>
                  <dt>Elektron dizilimi</dt>
                  <dd>{article.electronConfiguration}</dd>
                </div>
              </>
            )}
          </dl>

          <ElementLewisDiagram element={element} />

          {article ? (
            <>
              {article.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {article.sections ? (
                article.sections.map((section) => (
                  <div key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ))
              ) : (
                <>
                  <h2>{element.nameTr} nasıl keşfedildi?</h2>
                  <p>{article.discoverySummary}</p>
                </>
              )}

              <h2>{element.nameTr} nerelerde kullanılır?</h2>
              <ul>
                {article.uses.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>

              {article.timeline && (
                <>
                  <h2>{element.nameTr} tarih çizelgesi</h2>
                  <ol className="unit-timeline">
                    {article.timeline.map((item) => (
                      <li key={`${item.year}-${item.title}`}>
                        <time>{item.year}</time>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {article.relatedElements && article.relatedElements.length > 0 && (
                <>
                  <h2>İlgili elementler</h2>
                  <ul className="related-conversion-list">
                    {article.relatedElements.map((relatedSlug) => {
                      const relatedElement = findElementBySlug(relatedSlug);

                      if (!relatedElement) {
                        return null;
                      }

                      return (
                        <li key={relatedSlug}>
                          <Link
                            href={`/bilim-hesaplayicilari/kimya/periyodik-tablo/${relatedSlug}`}
                          >
                            {relatedElement.nameTr} ({relatedElement.symbol})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </>
          ) : (
            <p>
              {element.nameTr}, periyodik tabloda {element.atomicNumber}.
              sırada yer alan, {categoryLabels[element.category].toLowerCase()}{" "}
              kategorisindeki bir elementtir. Bu element için ayrıntılı
              makale içeriği yakında eklenecek.
            </p>
          )}

          <h2>Kaynaklar</h2>
          <p>
            Atom kütleleri IUPAC&apos;ın (Uluslararası Temel ve Uygulamalı
            Kimya Birliği) standart atom ağırlıkları tablosuna dayanır.
          </p>

          <Link
            className="text-link"
            href="/bilim-hesaplayicilari/kimya/periyodik-tablo"
          >
            ← Periyodik tabloya dön
          </Link>
        </section>
      </div>
    </main>
  );
}
