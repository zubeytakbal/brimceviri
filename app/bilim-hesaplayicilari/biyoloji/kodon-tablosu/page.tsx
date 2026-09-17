import type { Metadata } from "next";
import Link from "next/link";
import DnaRnaTranslatorCalculator from "../../../components/DnaRnaTranslatorCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { codonTable } from "../../../converter/codonTable";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kaç tane kodon vardır?",
    answer:
      "4 farklı bazın (A, U, G, C) 3'lü gruplar (kodon) oluşturmasıyla 4³ = 64 farklı kodon oluşur. Bunların 61'i bir amino asidi kodlar, 3'ü (UAA, UAG, UGA) ise dur (stop) kodonudur ve hiçbir amino asit kodlamaz.",
  },
  {
    question: "Başlangıç kodonu hangisidir?",
    answer:
      "AUG, protein sentezini başlatan kodondur ve aynı zamanda metionin amino asidini kodlar. Bu yüzden neredeyse tüm proteinlerin sentezi metioninle başlar.",
  },
  {
    question: "Dur (stop) kodonları hangileridir?",
    answer:
      "UAA, UAG ve UGA — üçü de hiçbir amino asit kodlamaz, ribozoma proteinin bittiğini bildirir.",
  },
  {
    question: "Neden birden fazla kodon aynı amino asidi kodluyor?",
    answer:
      "Buna 'genetik kodun dejenerasyonu' (kodon dejenerasyonu) denir — 61 kodon sadece 20 amino asidi kodladığı için çoğu amino asidin birden fazla kodonu vardır (örn. lösin 6 farklı kodonla kodlanabilir). Bu fazlalık, DNA/RNA'daki bazı mutasyonların amino asit dizisini değiştirmemesini sağlar.",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Kodon Tablosu ve DNA/RNA Amino Asit Çevirici",
  description:
    "64 kodonun tam listesi (AUG başlangıç kodonu, UAA/UAG/UGA dur kodonları dahil) ve kendi DNA/RNA dizini yazıp anında amino asit dizisine çevirebileceğin canlı araç.",
  alternates: { canonical: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu" },
  openGraph: {
    title: "Kodon Tablosu ve DNA/RNA Amino Asit Çevirici",
    description: "64 kodonun tam listesi ve canlı DNA/RNA çevirici.",
    url: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/kodon-tablosu"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function CodonTablePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Biyoloji", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji") },
      { "@type": "ListItem", position: 3, name: "Kodon Tablosu", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/kodon-tablosu") },
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
          <span>Kodon Tablosu</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kodon Tablosu ve DNA/RNA Amino Asit Çevirici</h1>
          <p>
            64 kodonun tam listesi — hangi kodon hangi amino asidi
            kodluyor, başlangıç ve dur kodonları hangileri. Aşağıdaki
            araçla kendi DNA/RNA dizini yazıp anında çevirebilirsin.
          </p>
        </header>

        <DnaRnaTranslatorCalculator />

        <section className="category-article-content">
          <h2>Tam Kodon Tablosu (mRNA)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>64 kodon ve kodladıkları amino asitler</caption>
              <thead>
                <tr>
                  <th scope="col">Kodon</th>
                  <th scope="col">Amino Asit</th>
                  <th scope="col">Not</th>
                </tr>
              </thead>
              <tbody>
                {codonTable.map((entry) => (
                  <tr key={entry.codon}>
                    <td>{entry.codon}</td>
                    <td>
                      {entry.threeLetterCode
                        ? `${entry.nameTr} (${entry.threeLetterCode})`
                        : entry.nameTr}
                    </td>
                    <td>{entry.isStart ? "Başlangıç Kodonu" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
            Amino asitlerin formül ve molar kütlelerini görmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/amino-asitler">Amino Asitler</Link>
            {" "}sayfasına, bir peptit zincirinin molar kütlesini hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama">Peptit Molar Kütle Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Kodon tablosu, tüm canlılarda (bazı istisnalar dışında)
            ortak olan evrensel genetik koda dayanır — standart bir
            biyokimya/moleküler biyoloji referansıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
