import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { getAllAminoAcidProfiles } from "../../../converter/aminoAcidsHub";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Esansiyel amino asit ne demek?",
    answer:
      "Esansiyel amino asitler, vücudun kendisinin üretemediği, bu yüzden mutlaka besinlerle dışarıdan alınması gereken 9 amino asittir: histidin, izolösin, lösin, lizin, metionin, fenilalanin, treonin, triptofan ve valin.",
  },
  {
    question: "Amino asitlerin molar kütlesi nasıl hesaplanır?",
    answer:
      "Her amino asidin kendine özgü bir kimyasal formülü vardır (örn. glisin C2H5NO2). Molar kütle, formüldeki her elementin atom kütlesinin, formüldeki sayısıyla çarpılıp toplanmasıyla bulunur — tahmini değil, doğrudan aritmetik bir sonuçtur.",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Amino Asitler: Formülleri, Molar Kütleleri ve Esansiyel Olanlar",
  description:
    "20 standart amino asidin kimyasal formülünü, molar kütlesini ve esansiyel olup olmadığını gör — her biri için ayrı detay sayfası.",
  alternates: { canonical: "/bilim-hesaplayicilari/biyoloji/amino-asitler" },
  openGraph: {
    title: "Amino Asitler: Formülleri, Molar Kütleleri ve Esansiyel Olanlar",
    description: "20 standart amino asidin formülü, molar kütlesi ve esansiyellik durumu.",
    url: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/amino-asitler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function AminoAcidsHubPage() {
  const aminoAcids = getAllAminoAcidProfiles();
  const essential = aminoAcids
    .filter((a) => a.essential)
    .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));
  const nonEssential = aminoAcids
    .filter((a) => !a.essential)
    .sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Biyoloji", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji") },
      { "@type": "ListItem", position: 3, name: "Amino Asitler", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/amino-asitler") },
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
          <span>Amino Asitler</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Amino Asitler</h1>
          <p>
            {aminoAcids.length} standart amino asidin kimyasal formülünü,
            molar kütlesini ve esansiyel olup olmadığını gör — her birinin
            kendi sayfasında atomik kompozisyonu da bulunur.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Esansiyel Amino Asitler ({essential.length})</h2>
          <ul className="related-conversion-list">
            {essential.map((aminoAcid) => (
              <li key={aminoAcid.id}>
                <Link href={`/bilim-hesaplayicilari/biyoloji/amino-asitler/${aminoAcid.id}`}>
                  {aminoAcid.nameTr} ({aminoAcid.threeLetterCode})
                </Link>
              </li>
            ))}
          </ul>

          <h2>Esansiyel Olmayan Amino Asitler ({nonEssential.length})</h2>
          <ul className="related-conversion-list">
            {nonEssential.map((aminoAcid) => (
              <li key={aminoAcid.id}>
                <Link href={`/bilim-hesaplayicilari/biyoloji/amino-asitler/${aminoAcid.id}`}>
                  {aminoAcid.nameTr} ({aminoAcid.threeLetterCode})
                </Link>
              </li>
            ))}
          </ul>

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
            Bir peptit zincirinin molar kütlesini hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama">Peptit Molar Kütle Hesaplama</Link>,{" "}
            DNA/RNA dizisini amino asit dizisine çevirmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/kodon-tablosu">Kodon Tablosu</Link>
            {" "}sayfasına, diğer kimyasal bileşikler için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/bilesikler">Bileşikler</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
