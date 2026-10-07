import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
  title: "Amino Asitler: Formülleri ve Molar Kütleleri",
  description:
    "20 standart amino asidin formülü, molar kütlesi, üç ve tek harfli kodu ve esansiyel olup olmadığı tek tabloda.",
  alternates: { canonical: "/bilim-hesaplayicilari/biyoloji/amino-asitler" },
  openGraph: {
    title: "Amino Asitler: Formülleri ve Molar Kütleleri",
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
  const byMass = [...aminoAcids].sort((a, b) => a.molarMass - b.molarMass);

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
            {aminoAcids.length} standart amino asidin formülü, molar kütlesi, kodları ve
            esansiyel olup olmadığı tek tabloda. Molar kütleler formülden atom kütleleriyle
            hesaplanır.
          </p>
        </header>

        <section className="category-article-content">
          <h2>20 standart amino asit tablosu</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Amino asit</th>
                  <th scope="col">Kod</th>
                  <th scope="col">Formül</th>
                  <th scope="col">Molar kütle (g/mol)</th>
                  <th scope="col">Esansiyel</th>
                </tr>
              </thead>
              <tbody>
                {byMass.map((a) => (
                  <tr key={a.id} id={a.id}>
                    <th scope="row">{a.nameTr}</th>
                    <td>
                      {a.threeLetterCode} / {a.oneLetterCode}
                    </td>
                    <td>{a.formula}</td>
                    <td>{a.molarMass.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</td>
                    <td>{a.essential ? "Evet" : "Hayır"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablo hafiften ağıra sıralıdır. En hafif amino asit {byMass[0].nameTr} (
            {byMass[0].formula}), en ağırı {byMass[byMass.length - 1].nameTr} (
            {byMass[byMass.length - 1].formula}). Lösin ile izolösin aynı formüle (C6H13NO2)
            ve aynı molar kütleye sahiptir; yalnızca yan zincirdeki dallanmanın yeri farklıdır.
          </p>

          <h2>Esansiyel amino asitler ({essential.length})</h2>
          <p>
            {essential.map((a) => a.nameTr).join(", ")}. Vücut bunları üretemez, besinlerle
            alınması gerekir.
          </p>

          <h2>Esansiyel olmayan amino asitler ({nonEssential.length})</h2>
          <p>{nonEssential.map((a) => a.nameTr).join(", ")}.</p>

          <h2>Peptit zincirinde neden su düşülür?</h2>
          <p>
            İki amino asit peptit bağıyla birleşirken bir su molekülü (H2O, yaklaşık 18,02 g/mol)
            açığa çıkar. Bu yüzden bir peptidin molar kütlesi, amino asitlerin molar kütleleri
            toplamından bağ sayısı kadar su kütlesi çıkarılarak bulunur. Örneğin glisin–glisin
            dipeptidi için 2 × 75,07 − 18,02 ≈ 132,12 g/mol çıkar.{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama">Peptit Molar Kütle Hesaplama</Link>{" "}
            aracı bunu istediğin dizi için yapar.
          </p>

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
