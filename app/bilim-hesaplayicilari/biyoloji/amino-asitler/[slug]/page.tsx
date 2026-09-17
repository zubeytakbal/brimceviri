import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PeptideMolarMassCalculator from "../../../../components/PeptideMolarMassCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import {
  findAminoAcidProfileById,
  getAllAminoAcidProfiles,
} from "../../../../converter/aminoAcidsHub";
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
  return getAllAminoAcidProfiles().map((aminoAcid) => ({ slug: aminoAcid.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const aminoAcid = findAminoAcidProfileById(slug);

  if (!aminoAcid) {
    return { title: "Amino asit bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${aminoAcid.nameTr} Nedir? Formülü, Molar Kütlesi ve Özellikleri`;
  const description = `${aminoAcid.nameTr} (${aminoAcid.formula}) molar kütlesi ${formatMolarMass(aminoAcid.molarMass)} g/mol. ${aminoAcid.essential ? "Esansiyel bir amino asittir" : "Esansiyel olmayan bir amino asittir"}, atomik kompozisyonunu gör.`;

  return {
    title,
    description,
    alternates: { canonical: `/bilim-hesaplayicilari/biyoloji/amino-asitler/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/bilim-hesaplayicilari/biyoloji/amino-asitler/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function AminoAcidPage({ params }: PageProps) {
  const { slug } = await params;
  const aminoAcid = findAminoAcidProfileById(slug);

  if (!aminoAcid) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/bilim-hesaplayicilari/biyoloji/amino-asitler/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${aminoAcid.nameTr} molar kütlesi kaç?`,
      answer: `${aminoAcid.nameTr}'in molar kütlesi ${formatMolarMass(aminoAcid.molarMass)} g/mol'dür.`,
    },
    {
      question: `${aminoAcid.nameTr} esansiyel bir amino asit mi?`,
      answer: aminoAcid.essential
        ? `Evet, ${aminoAcid.nameTr} esansiyel bir amino asittir — vücut tarafından sentezlenemez, mutlaka besinlerle dışarıdan alınması gerekir.`
        : `Hayır, ${aminoAcid.nameTr} esansiyel değildir — vücut kendi ihtiyacı olan miktarı sentezleyebilir.`,
    },
    {
      question: `${aminoAcid.nameTr}'in kimyasal formülü nedir?`,
      answer: `${aminoAcid.nameTr}'in kimyasal formülü ${aminoAcid.formula}, üç harfli kodu ${aminoAcid.threeLetterCode}, tek harfli kodu ${aminoAcid.oneLetterCode}'dir.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Biyoloji", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji") },
      { "@type": "ListItem", position: 3, name: "Amino Asitler", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/amino-asitler") },
      { "@type": "ListItem", position: 4, name: aminoAcid.nameTr, item: pageUrl },
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
          <Link href="/bilim-hesaplayicilari/biyoloji">Biyoloji</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/biyoloji/amino-asitler">Amino Asitler</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{aminoAcid.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{aminoAcid.formula}</p>
          <h1>{aminoAcid.nameTr} Nedir? Formülü, Molar Kütlesi ve Özellikleri</h1>
          <p>
            {aminoAcid.nameTr} ({aminoAcid.threeLetterCode}/{aminoAcid.oneLetterCode}) —
            atomik kompozisyonunu ve molar kütlesini gör, kendi peptit
            zincirini yazarak da hesapla.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{aminoAcid.nameTr} Temel Bilgileri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Kimyasal Formül</dt>
              <dd>{aminoAcid.formula}</dd>
            </div>
            <div>
              <dt>Molar Kütle</dt>
              <dd>{formatMolarMass(aminoAcid.molarMass)} g/mol</dd>
            </div>
            <div>
              <dt>Üç Harfli Kod</dt>
              <dd>{aminoAcid.threeLetterCode}</dd>
            </div>
            <div>
              <dt>Tek Harfli Kod</dt>
              <dd>{aminoAcid.oneLetterCode}</dd>
            </div>
            <div>
              <dt>Esansiyel mi?</dt>
              <dd>{aminoAcid.essential ? "Evet, esansiyel amino asittir" : "Hayır, esansiyel değildir"}</dd>
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
                {aminoAcid.composition.map((item) => (
                  <tr key={item.symbol}>
                    <td>
                      {item.nameTr} ({item.symbol})
                    </td>
                    <td>{item.count}</td>
                    <td>
                      {formatMolarMass(
                        (aminoAcid.molarMass /
                          aminoAcid.composition.reduce((sum, c) => sum + c.count, 0)) *
                          item.count,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <PeptideMolarMassCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlginizi Çekebilir</h2>
          <p>
            Tüm amino asitleri görmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/amino-asitler">Amino Asitler</Link>
            {" "}sayfasına, DNA/RNA dizisini amino asit dizisine çevirmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/kodon-tablosu">Kodon Tablosu</Link>
            {" "}sayfasına, diğer kimyasal bileşikler için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/bilesikler">Bileşikler</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Kimyasal formül ve molar kütle, standart biyokimya kaynaklarına
            dayanan doğrudan aritmetik hesaplamalardır — tahmini bir değer
            değildir.
          </p>
        </section>
      </div>
    </main>
  );
}
