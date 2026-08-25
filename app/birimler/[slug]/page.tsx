import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import {
  findCategoryPageByCategory,
  getCategoryPathByCategory,
} from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import {
  findUnitArticle,
} from "../../converter/unitArticles";
import {
  findUnitScientificData,
} from "../../converter/unitScientificData";
import {
  getUnitSources,
} from "../../converter/unitSources";
import { findEnglishUnitPageByTurkishSlug } from "../../converter/localizedUnitPages";
import { findGermanUnitPageByTurkishSlug } from "../../converter/localizedGermanUnitPages";
import { unitPages } from "../../converter/unitPages";
import { SITE_URL, buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ConverterData = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
};

const categoryLabels: Record<string, string> = {
  uzunluk: "Uzunluk",
  kutle: "Kütle",
  basinc: "Basınç",
  yogunluk: "Yoğunluk",
  enerji: "Enerji ve Güç",
  kuvvet: "Kuvvet",
  tork: "Tork",
  momentum: "Momentum",
  viskozite_dinamik: "Viskozite",
  veri: "Veri Depolama",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return unitPages.map((unitPage) => ({
    slug: unitPage.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const unitPage = unitPages.find((page) => page.slug === slug);

  if (!unitPage) {
    return {
      title: "Birim bulunamadı",
    };
  }

  const englishPage = findEnglishUnitPageByTurkishSlug(
    unitPage.slug
  );
  const germanPage = findGermanUnitPageByTurkishSlug(
    unitPage.slug
  );

  return {
    title:
      `${unitPage.name} Nedir? Tanımı, Tarihçesi ve ` +
      `Bilimsel Bilgiler`,
    description:
      `${unitPage.name} biriminin sembolü ${unitPage.symbol}'dir. ` +
      `Tanımını, tarihçesini, bilimsel açıklamasını ve diğer birimlere ` +
      `dönüşümünü ücretsiz inceleyin.`,
    alternates: {
      canonical: `/birimler/${unitPage.slug}`,
      languages: englishPage
        ? {
            tr: `/birimler/${unitPage.slug}`,
            en: `/en/units/${englishPage.slug}`,
            ...(germanPage
              ? { de: `/de/einheiten/${germanPage.slug}` }
              : {}),
            "x-default": `/birimler/${unitPage.slug}`,
          }
        : undefined,
    },
    openGraph: {
      title:
        `${unitPage.name} Nedir? Tanımı, Tarihçesi ve ` +
        `Bilimsel Bilgiler`,
      description: unitPage.shortDescription,
      url: buildSiteUrl(`/birimler/${unitPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function UnitInformationPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const unitPage = unitPages.find((page) => page.slug === slug);

  if (!unitPage) {
    notFound();
  }

  const unitArticle = findUnitArticle(unitPage.slug);
  const scientificData = findUnitScientificData(unitPage.slug);
  const sources = getUnitSources(unitPage.category);

 const unitSpecificSectionTitles: Record<string, string[]> = {
  metre: [
    "Metre neden bir SI temel birimidir?",
    "Modern metre tanımının fiziksel anlamı",
    "Metre laboratuvarda nasıl gerçekleştirilir?",
    "Ölçüm belirsizliği neden önemlidir?",
  ],

  kilometre: [
    "Kilometrenin SI sistemindeki konumu",
    "Coğrafi mesafe ve yol mesafesi farkı",
    "Odometre ve kilometre ölçümü",
    "Harita ölçeği ve kilometre ilişkisi",
  ],

  pascal: [
    "Pascal neden bir SI türetilmiş birimidir?",
    "Pascal ilkesi ve hidrolik sistemler",
    "Basınç ile mekanik gerilme arasındaki ilişki",
    "Meteorolojide hektopascal kullanımı",
  ],

  atmosfer: [
    "Atmosfer neden SI dışı bir birimdir?",
    "Barometrik formül ve yükseklikle basınç azalması",
    "760 mmHg konvansiyonu ve atmosfer tanımı",
    "Kimyada standart basınç referansı olarak atmosfer",
  ],

  psi: [
    "1959 Uluslararası Yarda ve Pound Anlaşması ve PSI'nin kesin tanımı",
    "Malzeme mühendisliğinde ksi (kilopsi) kullanımı",
  ],

  "kilogram-kuvvet-santimetrekare": [
    "Kilogram-kuvvet ve standart yerçekiminin tanımı",
    "Teknik atmosfer ile standart atmosfer arasındaki küçük ama önemli fark",
  ],

  bar: [
    "Barın kökeni: William Napier Shaw ve meteorolojik basınç birimi",
    "Bar neden yuvarlak bir SI katı olduğu hâlde resmî SI birimi değildir?",
  ],

  "milimetre-civa": [
    "mmHg'nin kesin tanımı: konvansiyonel cıva yoğunluğu",
    "mmHg ile Torr arasındaki milyonda birkaçlık fark",
  ],

  kilopascal: [
    "SI ön ek sistemi ve kilo (10³) çarpanı",
    "Jeoteknik ve yapı mühendisliğinde kilopascal standardı",
  ],
};

const categoryGuideLinks: Record<
  string,
  { href: string; label: string }
> = {
  basinc: {
    href: "/kategoriler/basinc",
    label: "Basınç birimleri kategori sayfası",
  },
};

const historicalUnitSlugs = new Set([
  "arsin",
  "endaze",
  "okka",
  "dirhem",
  "bizans-ayagi",
  "bizans-kulaci",
  "bizans-litrasi",
  "bizans-onsu",
  "cig",
]);

const allowedScientificSections =
  unitSpecificSectionTitles[unitPage.slug] ?? [];

const specificScientificSections =
  scientificData?.scientificSections.filter((section) =>
    allowedScientificSections.includes(section.title)
  ) ?? [];
  const directConversion = conversionPages.find(
    (page) =>
      page.category === unitPage.category &&
      page.fromUnit === unitPage.unit
  );

  const incomingConversion = conversionPages.find(
    (page) =>
      page.category === unitPage.category &&
      page.toUnit === unitPage.unit
  );

  let converterData: ConverterData | null = null;

  if (directConversion) {
    converterData = {
      category: directConversion.category,
      fromUnit: directConversion.fromUnit,
      toUnit: directConversion.toUnit,
      fromName: directConversion.fromName,
      toName: directConversion.toName,
    };
  } else if (incomingConversion) {
    converterData = {
      category: incomingConversion.category,
      fromUnit: incomingConversion.toUnit,
      toUnit: incomingConversion.fromUnit,
      fromName: incomingConversion.toName,
      toName: incomingConversion.fromName,
    };
  }

  const relatedConversions = conversionPages.filter(
    (page) =>
      page.category === unitPage.category &&
      (page.fromUnit === unitPage.unit ||
        page.toUnit === unitPage.unit)
  );

  const pageUrl = buildSiteUrl(
    `/birimler/${unitPage.slug}`
  );
  const categoryPage = findCategoryPageByCategory(
    unitPage.category
  );

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
        name: "Birim Rehberi",
        item: buildSiteUrl("/birimler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: unitPage.name,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline:
      `${unitPage.name} Nedir? Tanımı, Tarihçesi ve ` +
      `Bilimsel Bilgiler`,
    description: unitPage.shortDescription,
    mainEntityOfPage: pageUrl,
    inLanguage: "tr-TR",
    author: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
  };

  const faqSchema = unitArticle
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: unitArticle.questions.map((question) => ({
          "@type": "Question",
          name: question.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: question.answer,
          },
        })),
      }
    : null;

  return (
    <main className="unit-information-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema),
          }}
        />
      )}

      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <Link href="/birimler">Birim Rehberi</Link>
          <span aria-hidden="true">›</span>
          <span>{unitPage.name}</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">{unitPage.symbol}</p>

          <h1>{unitPage.name} nedir?</h1>

          <p>{unitPage.shortDescription}</p>
        </header>

        <div className="unit-page-layout">
          <div className="unit-page-content">
            {unitArticle ? (
              <section className="unit-article-introduction">
                {unitArticle.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ) : (
              <section className="unit-article-introduction">
                <p>{unitPage.shortDescription}</p>
                <p>{unitPage.historySummary}</p>
                <p>
                  Ölçüm sistemi: {unitPage.measurementSystem}. SI
                  karşılığı: {unitPage.siEquivalent}.
                </p>
              </section>
            )}

            {categoryGuideLinks[unitPage.category] && (
              <p className="category-inline-link">
                {unitPage.name} birimi, {categoryLabels[
                  unitPage.category
                ]?.toLowerCase() ?? unitPage.category}{" "}
                birimlerinin ortak tarihçesini ve genel kavramlarını
                paylaşır. Torricelli barometresi, ISA modeli ve genel
                ölçüm yöntemleri gibi ortak arka plan bilgisi için{" "}
                <Link href={categoryGuideLinks[unitPage.category].href}>
                  {categoryGuideLinks[unitPage.category].label}
                </Link>{" "}
                sayfasını inceleyebilirsiniz.
              </p>
            )}

            {historicalUnitSlugs.has(unitPage.slug) && (
              <p className="category-inline-link">
                {unitPage.name}, Bizans, Osmanlı ve eski Türk
                dönemlerinden kalma diğer ölçü birimleriyle birlikte{" "}
                <Link href="/tarihi-olcu-birimleri">
                  Tarihi Ölçü Birimleri
                </Link>{" "}
                merkezinde bir arada listelenir.
              </p>
            )}

            <section className="conversion-section">
              <h2>{unitPage.name} temel bilgileri</h2>

              <dl className="unit-facts">
                <div>
                  <dt>Birim adı</dt>
                  <dd>{unitPage.name}</dd>
                </div>

                <div>
                  <dt>Sembolü</dt>
                  <dd>{unitPage.symbol}</dd>
                </div>

                <div>
                  <dt>Kategorisi</dt>
                  <dd>
                    {categoryPage?.title ??
                      categoryLabels[unitPage.category] ??
                      unitPage.category}
                  </dd>
                </div>

                <div>
                  <dt>Ölçüm sistemi</dt>
                  <dd>{unitPage.measurementSystem}</dd>
                </div>

                <div>
                  <dt>SI karşılığı</dt>
                  <dd>{unitPage.siEquivalent}</dd>
                </div>

                <div>
                  <dt>Yaygın kullanım</dt>
                  <dd>{unitPage.commonUses}</dd>
                </div>

                {unitArticle?.keyFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {unitArticle && (
              <nav
                className="unit-table-of-contents"
                aria-label="Sayfa içeriği"
              >
                <strong>Bu sayfada</strong>

                <ol>
                  {unitArticle.sections.map((section, index) => (
                    <li key={section.title}>
                      <a href={`#bolum-${index + 1}`}>
                        {section.title}
                      </a>
                    </li>
                  ))}

                  <li>
                    <a href="#metre-tarih-cizelgesi">
                      {unitPage.name} tarih çizelgesi
                    </a>
                  </li>

                  {scientificData && (
                    <>
                      <li>
                        <a href="#bilimsel-ozellikler">
                          Bilimsel özellikler
                        </a>
                      </li>

                      <li>
                        <a href="#denklemler">
                          Temel tanımlar ve denklemler
                        </a>
                      </li>
                    </>
                  )}

                  <li>
                    <a href="#donusum-araclari">
                      Dönüşüm araçları
                    </a>
                  </li>

                  <li>
                    <a href="#sik-sorulan-sorular">
                      Sık sorulan sorular
                    </a>
                  </li>

                  <li>
                    <a href="#kaynaklar">Kaynaklar</a>
                  </li>
                </ol>
              </nav>
            )}

            {unitArticle?.sections.map((section, index) => (
              <section
                className="conversion-section unit-long-section"
                id={`bolum-${index + 1}`}
                key={section.title}
              >
                <h2>{section.title}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.title ===
                  "Metre ve diğer uzunluk birimleri" && (
                  <p className="category-inline-link">
                    Bütün uzunluk birimlerinin karşılaştırması,
                    katları ve alt katları için{" "}
                    <Link href="/kategoriler/uzunluk">
                      uzunluk birimleri sayfasını
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>
                )}

                {section.title ===
                  "Pascal ve diğer basınç birimleri" && (
                  <p className="category-inline-link">
                    Bütün basınç birimlerinin karşılaştırması ve
                    dönüşüm tablosu için{" "}
                    <Link href="/kategoriler/basinc">
                      basınç birimleri sayfasını
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>
                )}

                {section.title ===
                  "Atmosfer ve diğer basınç birimleri" && (
                  <p className="category-inline-link">
                    Bütün basınç birimlerinin karşılaştırması ve
                    dönüşüm tablosu için{" "}
                    <Link href="/kategoriler/basinc">
                      basınç birimleri sayfasını
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>
                )}
              </section>
            ))}

            {!unitArticle && (
              <>
                <section className="conversion-section unit-long-section">
                  <h2>{unitPage.name} hangi sistemde kullanılır?</h2>
                  <p>{unitPage.measurementSystem}</p>
                  <p>SI karşılığı: {unitPage.siEquivalent}</p>
                </section>

                <section className="conversion-section unit-long-section">
                  <h2>{unitPage.name} nerelerde kullanılır?</h2>
                  <p>{unitPage.commonUses}</p>
                </section>
              </>
            )}

            {unitArticle && (
              <section
                className="conversion-section"
                id="metre-tarih-cizelgesi"
              >
                <h2>{unitPage.name} tarih çizelgesi</h2>

                <ol className="unit-timeline">
                  {unitArticle.timeline.map((item) => (
                    <li key={`${item.year}-${item.title}`}>
                      <time>{item.year}</time>

                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {scientificData && (
              <>
                <section
                  className="conversion-section"
                  id="bilimsel-ozellikler"
                >
                  <h2>{unitPage.name} bilimsel özellikleri</h2>

                  <dl className="scientific-property-list">
                    {scientificData.properties.map((property) => (
                      <div key={property.label}>
                        <dt>{property.label}</dt>

                        <dd>
                          <strong>{property.value}</strong>

                          {property.note && (
                            <small>{property.note}</small>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section
                  className="conversion-section"
                  id="denklemler"
                >
                  <h2>Temel tanımlar ve denklemler</h2>

                  <div className="scientific-equations">
                    {scientificData.equations.map((equation) => (
                      <article key={equation.title}>
                        <h3>{equation.title}</h3>

                        <p className="equation-display">
                          {equation.equation}
                        </p>

                        <p>{equation.explanation}</p>
                      </article>
                    ))}
                  </div>
                </section>

                {specificScientificSections.map((section) => (
                  <section
                    className="conversion-section unit-long-section"
                    key={section.title}
                  >
                    <h2>{section.title}</h2>

                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </>
            )}

            {relatedConversions.length > 0 && (
              <section
                className="conversion-section"
                id="donusum-araclari"
              >
                <h2>{unitPage.name} dönüşüm araçları</h2>

                <ul className="related-conversion-list">
                  {relatedConversions.map((conversion) => (
                    <li key={conversion.slug}>
                      <Link href={`/${conversion.slug}`}>
                        {conversion.fromName} →{" "}
                        {conversion.toName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {unitArticle && (
              <section
                className="conversion-section"
                id="sik-sorulan-sorular"
              >
                <h2>Sık sorulan sorular</h2>

                <div className="faq-list">
                  {unitArticle.questions.map((question) => (
                    <details key={question.question}>
                      <summary>{question.question}</summary>
                      <p>{question.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section
              className="conversion-section unit-sources"
              id="kaynaklar"
            >
              <h2>Kaynaklar</h2>

              <p>
                Bu sayfadaki tanımlar ve dönüşüm değerleri aşağıdaki
                resmî metroloji kaynakları temel alınarak hazırlanmıştır.
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
          </div>

          {converterData && (
            <aside className="unit-page-converter">
              <h2>Hızlı dönüştürme</h2>

              <PairConverter
                category={converterData.category}
                fromUnit={converterData.fromUnit}
                toUnit={converterData.toUnit}
                fromName={converterData.fromName}
                toName={converterData.toName}
              />

              {relatedConversions.length > 0 && (
                <nav className="unit-sidebar-links">
                  <h3>İlgili araçlar</h3>

                  {relatedConversions
                    .slice(0, 6)
                    .map((conversion) => (
                      <Link
                        href={`/${conversion.slug}`}
                        key={conversion.slug}
                      >
                        {conversion.fromName} →{" "}
                        {conversion.toName}
                      </Link>
                    ))}
                </nav>
              )}

              <nav className="unit-sidebar-links">
                <h3>Kategori</h3>

                <Link href={getCategoryPathByCategory(unitPage.category)}>
                  Tüm{" "}
                  {categoryLabels[unitPage.category] ??
                    unitPage.category}{" "}
                  birimleri
                </Link>
              </nav>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
