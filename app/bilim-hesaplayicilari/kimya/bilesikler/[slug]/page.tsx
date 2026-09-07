import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompoundMolCalculator from "../../../../components/CompoundMolCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import {
  findCompoundProfileById,
  findSimilarMolarMassCompounds,
  getAllCompoundProfiles,
} from "../../../../converter/compoundsHub";
import { slugifyElementName } from "../../../../converter/periodicTableData";
import { buildSiteUrl } from "../../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatMolarMass(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllCompoundProfiles().map((compound) => ({ slug: compound.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = findCompoundProfileById(slug);

  if (!compound) {
    return { title: "Bileşik bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${compound.nameTr} (${compound.formula}) Molar Kütlesi ve Mol Hesaplama`;
  const description = `${compound.nameTr} (${compound.formula}) molar kütlesi ${formatMolarMass(compound.molarMass)} g/mol. Atomik kompozisyonu gör, kendi kütle/mol miktarınla hesaplama yap.`;

  return {
    title,
    description,
    alternates: { canonical: `/bilim-hesaplayicilari/kimya/bilesikler/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/bilim-hesaplayicilari/kimya/bilesikler/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function CompoundPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = findCompoundProfileById(slug);

  if (!compound) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/bilim-hesaplayicilari/kimya/bilesikler/${slug}`);
  const similarCompounds = findSimilarMolarMassCompounds(slug, 5);

  const compositionLine = compound.composition
    .map((item) => `${item.count} × ${item.nameTr} (${item.symbol})`)
    .join(" + ");

  const faqItems: FaqItem[] = [
    {
      question: `${compound.nameTr} (${compound.formula}) molar kütlesi kaç?`,
      answer: `${compound.nameTr} molar kütlesi yaklaşık ${formatMolarMass(compound.molarMass)} g/mol'dür. Bu değer, ${compositionLine} atomlarının kütlelerinin toplamıdır.`,
    },
    {
      question: `${compound.nameTr}'nin kimyasal formülü nedir?`,
      answer: `${compound.nameTr}'nin kimyasal formülü ${compound.formula}'dir.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Kimya", item: buildSiteUrl("/bilim-hesaplayicilari/kimya") },
      { "@type": "ListItem", position: 4, name: "Bileşikler", item: buildSiteUrl("/bilim-hesaplayicilari/kimya/bilesikler") },
      { "@type": "ListItem", position: 5, name: compound.nameTr, item: pageUrl },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya/bilesikler">Bileşikler</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{compound.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{compound.formula}</p>
          <h1>
            {compound.nameTr} ({compound.formula}) Molar Kütlesi ve Mol Hesaplama
          </h1>
          <p>
            Atomik kompozisyonunu ve molar kütlesini gör, kendi kütle
            veya mol miktarınla anında hesapla.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{compound.nameTr} Molar Kütle Hesabı</h2>
          <dl className="unit-facts">
            <div>
              <dt>Kimyasal Formül</dt>
              <dd>{compound.formula}</dd>
            </div>
            <div>
              <dt>Molar Kütle</dt>
              <dd>{formatMolarMass(compound.molarMass)} g/mol</dd>
            </div>
          </dl>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Atomik Kompozisyon</caption>
              <thead>
                <tr>
                  <th scope="col">Element</th>
                  <th scope="col">Sayı</th>
                  <th scope="col">Katkı (g/mol)</th>
                </tr>
              </thead>
              <tbody>
                {compound.composition.map((item) => (
                  <tr key={item.symbol}>
                    <td>
                      <Link href={`/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(item.nameTr)}`}>
                        {item.nameTr} ({item.symbol})
                      </Link>
                    </td>
                    <td>{item.count}</td>
                    <td>
                      {formatMolarMass(
                        (compound.molarMass /
                          compound.composition.reduce((sum, c) => sum + c.count, 0)) *
                          item.count,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CompoundMolCalculator
          molarMass={compound.molarMass}
          compoundName={compound.nameTr}
        />

        {similarCompounds.length > 0 && (
          <section className="category-article-content">
            <h2>{compound.nameTr} ile Benzer Molar Kütleye Sahip Bileşikler</h2>
            <ul className="related-conversion-list">
              {similarCompounds.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/bilim-hesaplayicilari/kimya/bilesikler/${similar.id}`}>
                    {similar.nameTr} ({similar.formula})
                  </Link>{" "}
                  — {formatMolarMass(similar.molarMass)} g/mol
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Genel mol hesaplama için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/mol-hesaplama">Mol Hesaplama</Link>
            {" "}sayfasına, tüm bileşikler için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/bilesikler">Bileşikler</Link>
            {" "}sayfasına, periyodik tablo için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/periyodik-tablo">Periyodik Tablo</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Molar kütle, IUPAC&apos;ın standart atom ağırlıkları
            tablosuna dayanan atom kütlelerinin, bileşiğin kimyasal
            formülüne göre toplanmasıyla hesaplanır — bu saf bir
            aritmetik işlemdir, tahmini bir değer değildir.
          </p>
        </section>
      </div>
    </main>
  );
}
